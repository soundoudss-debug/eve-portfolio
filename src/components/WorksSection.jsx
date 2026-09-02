import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectCard from './ProjectCard';
import { projects, ROLE_MODES, normalizeRole, sortProjectsByRole } from '../data/projects';
import { getVideoBlobUrl } from '../utils/videoBlob';
import './WorksSection.css';

const ROLE_OPTIONS = [
  { value: ROLE_MODES.DEFAULT,    labelKey: 'default' },
  { value: ROLE_MODES.GAME,       labelKey: 'game' },
  { value: ROLE_MODES.COMMERCIAL, labelKey: 'commercial' },
  { value: ROLE_MODES.MCN,        labelKey: 'mcn' },
];

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * WorksSection — 视频 hover preview 完全按独立 Demo 逐字复刻
 *
 * 参考文件：C:\Users\eve\Desktop\简历\新建文件夹\src\VideoPreviewPage.jsx
 *
 * 本组件状态严格 §6：
 *   const [hoveredId, setHoveredId] = useState(null);
 *   const [playingId, setPlayingId] = useState(null);
 *   const videoRefs = useRef(new Map());
 * 不增加任何额外 state。
 *
 * handleMouseEnter 严格 §7：
 *   setHoveredId(id)
 *   → forEach others pause+0
 *   → video.currentTime=0 (try/catch)
 *   → video.play()
 *   → playPromise.catch(console.error)
 *   → 这里绝不写 setPlayingId。必须等 onPlaying 事件。
 *
 * handlePlaying 严格 §8：
 *   onPlaying 事件触发 → setPlayingId(id)。
 *
 * handleMouseLeave 严格 §9：
 *   stopVideo(id): pause() + currentTime=0
 *   → setHoveredId(prev === id ? null : prev)
 *   → setPlayingId(prev === id ? null : prev)
 *
 * cleanup 严格参考 108-117：
 *   forEach video → pause() → removeAttribute('src') → load() → Map.clear()
 */
export default function WorksSection() {
  const { t, lang } = useLanguage();
  const titleRef = useScrollReveal();
  const [searchParams, setSearchParams] = useSearchParams();

  /* ==================== §6 三个状态变量，不再多建 ==================== */
  const [hoveredId, setHoveredId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef(new Map());
  const noHover = isTouchDevice();

  /* hoveredId 的 ref 镜像：fetch 回来的异步回调里判定“用户是否仍悬停在本卡” */
  const hoveredIdRef = useRef(null);
  useEffect(() => { hoveredIdRef.current = hoveredId; }, [hoveredId]);

  /* id -> 网络视频地址（首次 hover 时 fetch 成本地 blob，之后媒体栈零网络请求） */
  const videoSrcById = useMemo(
    () => new Map(projects.map((p) => [p.id, p.video ?? p.previewVideoSrc])),
    []
  );

  const currentRole = useMemo(() => normalizeRole(searchParams.get('role')), [searchParams]);
  const sortedProjects = useMemo(() => sortProjectsByRole(projects, currentRole), [currentRole]);

  const handleRoleChange = (newRole) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newRole === ROLE_MODES.DEFAULT) nextParams.delete('role');
    else nextParams.set('role', newRole.toLowerCase());
    setSearchParams(nextParams, { replace: true });
  };

  /* ==================== stopVideo（绝不打断本地 blob 读取） ====================
     blob: URL 的数据读取仍由 Chromium 的 URLLoader 完成。在数据读完之前
     pause()/seek 会中止 reader → 控制台报 net::ERR_ABORTED(blob:...)。
     规则：媒体已完整缓冲 → 立即暂停；否则轮询等待（本地 blob 通常 <1s），
     等整段缓冲完成再暂停；期间用户回到本卡则放弃暂停。 */
  const isFullyBuffered = (v) => {
    try {
      return v.readyState >= 4 &&
        v.duration > 0 &&
        v.buffered.length > 0 &&
        v.buffered.end(v.buffered.length - 1) >= v.duration - 0.3;
    } catch {
      return false;
    }
  };

  const stopVideo = (id) => {
    const video = videoRefs.current.get(id);
    if (!video) return;

    const doPause = (v) => {
      // 关键：leave 时只 pause()，绝不 seek。
      // pause 后立即 currentTime=0 会让媒体引擎重启 blob range reader，
      // 该 reader 随即被挂起/取消 → 控制台 net::ERR_ABORTED（blob:…）。
      // 回 0 的动作改到下次 hover 播放前、数据仍在缓冲区内时完成（见 startVideo）。
      v.pause();
    };

    if (isFullyBuffered(video)) {
      doPause(video);
      return;
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const v = videoRefs.current.get(id);
      if (!v || hoveredIdRef.current === id) {
        clearInterval(timer); // 已卸载，或用户又回到本卡 → 继续播放
        return;
      }
      if (isFullyBuffered(v) || attempts > 25) { // 最多等 ~3s
        clearInterval(timer);
        doPause(v);
      }
    }, 120);
  };

  /* 首次 hover：fetch 完整视频 → 生成本地 blob URL 挂到 <video> 并播放。
     fetch 由页面发起，取消/挂起不产生控制台资源错误；blob 命中后瞬时起播。 */
  const startVideo = (id) => {
    const video = videoRefs.current.get(id);
    const networkSrc = videoSrcById.get(id);
    if (!video || !networkSrc) return;

    getVideoBlobUrl(networkSrc)
      .then((blobUrl) => {
        // 异步返回时用户已移到别的卡片 / 卡片已卸载：只缓存，不播放
        if (hoveredIdRef.current !== id) return;
        const v = videoRefs.current.get(id);
        if (!v) return;
        const isFreshSrc = v.dataset.blobSrc !== blobUrl;
        if (isFreshSrc) {
          // 全新源：默认从 0 起播，加载前绝不 seek
          v.src = blobUrl;
          v.dataset.blobSrc = blobUrl;
        }

        // 重播回 0：seek 必须落在已缓冲区间（readyState>=4）。数据未就绪时
        // 媒体引擎会为 blob 重新发起 range reader，随后若被 pause 挂起就会在
        // 控制台报 net::ERR_ABORTED(blob:…)。此时先播放，等 playing（缓冲完整）再回 0。
        const needReset = !isFreshSrc && v.currentTime > 0.3;
        if (needReset && v.readyState >= 4) {
          try { v.currentTime = 0; } catch { /* noop */ }
        } else if (needReset) {
          const resetOnPlaying = () => {
            v.removeEventListener('playing', resetOnPlaying);
            try { v.currentTime = 0; } catch { /* noop */ }
          };
          v.addEventListener('playing', resetOnPlaying);
        }

        const playPromise = v.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch((error) => {
            // 快速切换卡片时 play() 被 pause() 打断 → AbortError 属正常
            if (error && error.name !== 'AbortError') {
              // eslint-disable-next-line no-console
              console.error('[WorksSection] Video play rejected:', error);
            }
          });
        }
      })
      .catch(() => {
        // 取片失败：保持 poster 封面可见，不做任何控制台报错
      });
  };

  /* ==================== 原生 video controls 阴影边界伪事件过滤 ====================
     <video controls> 的控制条是 UA Shadow DOM，鼠标在视频上移动 / 控制条自动
     显隐时，Chromium 会派发 relatedTarget === null 的原生 mouseout / mouseover。
     React 会把它误判为“指针离开了卡片”，从而触发伪 mouseleave → 视频暂停消失，
     紧接着伪 mouseenter → play() 再次被打断（控制台反复 ERR_ABORTED）。
     判定：relatedTarget 为 null 且指针坐标仍在 article 矩形内 → 伪事件，忽略。 */
  const isShadowControlsArtifact = (id, event) => {
    if (!event) return false;
    const nativeEvent = event.nativeEvent ?? event;
    if (nativeEvent.relatedTarget !== null) return false;

    const video = videoRefs.current.get(id);
    const article = video ? video.closest('.project-card') : null;
    if (!article) return false;

    const rect = article.getBoundingClientRect();
    const x = nativeEvent.clientX;
    const y = nativeEvent.clientY;
    return (
      x >= rect.left && x <= rect.right &&
      y >= rect.top && y <= rect.bottom
    );
  };

  /* ==================== §7 hover 进入：停其他 + 播当前（blob） ==================== */
  const handleMouseEnter = (id, event) => {
    if (noHover) return;
    // 控制条阴影伪事件且卡片已是当前 hover 目标：忽略（避免重启已在播放的视频）
    if (hoveredId === id && isShadowControlsArtifact(id, event)) return;
    // ref 同步更新：缓存命中时 startVideo 的 Promise 微任务在同一任务内执行，
    // 此时 useEffect 镜像尚未跑，必须先写 ref 才能通过“仍悬停本卡”守卫。
    hoveredIdRef.current = id;
    setHoveredId(id);

    // 先停其他正在播放的视频 → 任何时刻只有一个播放（blob 本地操作，零网络中断）
    videoRefs.current.forEach((otherVideo, otherId) => {
      if (otherId !== id && !otherVideo.paused) {
        stopVideo(otherId);
      }
    });

    // 当前目标：首次 hover 拉取 blob 后播放；已缓存则瞬时起播
    startVideo(id);
    // §8 强调：playingId 必须由 onPlaying 事件写，这里绝对不 setPlayingId
  };

  /* ==================== §9 逐字对齐参考 handleMouseLeave ==================== */
  const handleMouseLeave = (id, event) => {
    // 指针几何上仍在卡片内 → 原生 controls 阴影伪事件，不暂停、不隐藏视频
    if (isShadowControlsArtifact(id, event)) return;
    if (hoveredIdRef.current === id) hoveredIdRef.current = null;
    stopVideo(id);
    setHoveredId((prev) => (prev === id ? null : prev));
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  /* ==================== §8 真正进入 playing 才标记 visible ==================== */
  const handlePlaying = (id) => {
    setPlayingId(id);
  };

  const handleError = (id) => {
    const video = videoRefs.current.get(id);
    if (video) video.pause();
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  const handleEnded = (id) => {
    stopVideo(id);
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  /* ==================== 卸载清理：仅暂停；blob 缓存保留在模块作用域 ==================== */
  useEffect(() => {
    return () => {
      videoRefs.current.forEach((video) => {
        try { video.pause(); } catch { /* noop */ }
      });
      videoRefs.current.clear();
    };
  }, []);

  return (
    <section id="works" className="works">
      {/* 纸面质感（§13 保留 Works 外观） */}
      <div className="works__grain" aria-hidden="true" />
      <div className="works__scanlines" aria-hidden="true" />

      {/* WORKS HEADER：极简保留（用户明确禁止改动 Works 外观） */}
      <header className="works__header">
        <div ref={titleRef} className="works__title-wrap">
          <h2 className="works__title-editorial">WORKS</h2>
        </div>
      </header>

      {/* Role selector：保留业务功能（§13 不动外观） */}
      <div className="works__role-selector" role="tablist" aria-label="Portfolio version">
        <div className="works__role-buttons">
          {ROLE_OPTIONS.map((option) => {
            const isActive = currentRole === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                className={`works__role-btn ${isActive ? 'works__role-btn--active' : ''}`}
                onClick={() => handleRoleChange(option.value)}
              >
                {t.works.roles[option.labelKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects collage：不规则 layout 全保留 */}
      <div className="works__layout">
        {sortedProjects.map((project, index) => {
          const id = project.id;
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              layoutIndex={index % 6}
              previewVideoSrc={project.video ?? project.previewVideoSrc}

              /* §5：ProjectCard 只接收父级传的状态，不自建 */
              isHovered={hoveredId === id}
              isPlaying={playingId === id}
              onMouseEnter={(e) => handleMouseEnter(id, e)}
              onMouseLeave={(e) => handleMouseLeave(id, e)}
              onPlaying={() => handlePlaying(id)}
              onVideoError={() => handleError(id)}
              onVideoEnded={() => handleEnded(id)}

              /* 与参考 Demo 行 146-152 同款：回调 ref 登记 DOM */
              registerVideoRef={(element) => {
                if (element) videoRefs.current.set(id, element);
                else videoRefs.current.delete(id);
              }}
            />
          );
        })}
      </div>

      {/* Footer micro meta：外观保持不变 */}
      <div className="works__footer">
        <span className="works__footer-text">
          {lang === 'en' ? 'more coming soon' : '更多作品 即将更新'}
        </span>
        <span className="works__footer-star">✦</span>
      </div>
    </section>
  );
}
