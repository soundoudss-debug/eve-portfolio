import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalizedText } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './ProjectCard.css';

/* ========== Hover 预览交互常量 ========== */
const HOVER_DELAY = 200; // 200ms 防抖：避免鼠标扫过就播放

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export default function ProjectCard({
  project,
  index,
  layoutIndex,
  onClick,
  /* ========== Props 扩展：hover 预览短视频 ========== */
  previewVideoSrc,   // 预览短视频地址；不传 → VideoPlaceholder 不渲染 <video>，保持旧卡片行为
  previewAudio = false, // 预览是否有声；默认 false（静音）
}) {
  const category = useLocalizedText(project.category);
  const revealRef = useScrollReveal();

  /* ========== Video 元素 ref（通过 forwardRef 指向 VideoPlaceholder 内部的 <video>） ========== */
  const previewVideoRef = useRef(null);
  /* ========== mouseenter 防抖定时器 ref ========== */
  const hoverTimerRef = useRef(null);

  /* ========== 原有卡片交互状态（保留） ========== */
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  /* ========== Hover 预览显示状态 ==========
     - 唯一真信号 → <video> 触发原生 'playing' 事件后 = true
     - mouseleave / 视频 error / play Promise reject / 卸载 → 重置 false
     - **绝对不因为 waiting buffering 变 false**（避免闪烁），poster 永远在下面兜底
  */
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  /* ========== 是否具备预览能力（必须有 videoSrc + 非触屏） ========== */
  const canPreview = !!previewVideoSrc && !isTouchDevice();

  /* ========== 规格 #4：只监听 'playing' 事件；禁止使用 'waiting' ==========
     · playing = 视频真正开始出帧 → 此时将 video opacity 从 0 → 1 淡入，覆盖 poster
     · error   = 加载失败 → 维持 poster，不淡出任何东西
     · waiting = buffering，**故意不监听**：poster 全程保持在 video 底下不会消失
  */
  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      setIsPreviewPlaying(true);
    };

    const handleError = () => {
      setIsPreviewPlaying(false);
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const layoutClasses = [
    'project-card--layout-0',
    'project-card--layout-1',
    'project-card--layout-2',
    'project-card--layout-3',
    'project-card--layout-4',
    'project-card--layout-5',
  ];

  const handleClick = () => {
    if (onClick) onClick(project);
  };

  /* ========== 规格 #5：startPreview() ==========
     1) currentTime = 0
     2) video.play()
     3) **不在 play Promise resolve 时立即 setIsPreviewPlaying(true)**
     4) 只在 catch 里把 isPreviewPlaying 打回 false（浏览器中断 play 时兜底）
     5) 真正显示必须等 → playing event
  */
  const startPreview = useCallback(() => {
    if (!canPreview) return;
    const video = previewVideoRef.current;
    if (!video) return;

    try { video.currentTime = 0; } catch (e) {}
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPreviewPlaying(false);
      });
    }
  }, [canPreview]);

  /* ========== 规格 #6：stopPreview() ==========
     顺序：先 isPreviewPlaying=false（video opacity→0 淡出，poster 仍可见）
           → pause → currentTime=0 重置
  */
  const stopPreview = useCallback(() => {
    const video = previewVideoRef.current;
    if (!video) return;

    setIsPreviewPlaying(false);

    video.pause();

    try {
      video.currentTime = 0;
    } catch (e) {}
  }, []);

  /* ========== mouseenter：200ms 防抖后 startPreview ========== */
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true); // 保留原有卡片 hover 视觉（上浮 / tint / play 按钮等）
    if (!canPreview) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    hoverTimerRef.current = setTimeout(() => {
      startPreview();
    }, HOVER_DELAY);
  }, [canPreview, startPreview]);

  /* ========== mouseleave：立刻清防抖、stopPreview、重置 pressed ========== */
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    if (!canPreview) return;
    stopPreview();
  }, [canPreview, stopPreview]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  /* ========== 卸载清理：保证不再后台持续解码 ========== */
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      const v = previewVideoRef.current;
      if (v) {
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      }
    };
  }, []);

  return (
    <article
      ref={revealRef}
      className={`project-card ${layoutClasses[layoutIndex]} reveal ${isHovered ? 'project-card--hovered' : ''} ${isPressed ? 'project-card--pressed' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      data-cursor-hover
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <div className="project-card__media">
        {/* ========== media 容器中唯一的视频/封面单元：VideoPlaceholder ==========
            - 封面图 + 预览视频，全部在 VideoPlaceholder 内部叠加
            - 封面永远 opacity:1；video 叠在它上面，由 isPreviewPlaying 控制淡入淡出
            - forwardRef 拿到 <video> 元素给 startPreview / stopPreview 和事件监听器使用
        */}
        <VideoPlaceholder
          ref={previewVideoRef}
          coverSrc={project.cover}
          className="project-card__video"
          previewVideoSrc={previewVideoSrc}
          previewAudio={previewAudio}
          isPreviewPlaying={isPreviewPlaying}
        />

        {/* ========== 原有装饰层（全部保留） ========== */}
        <div className="project-card__grain" aria-hidden="true" />
        <div className="project-card__vignette" aria-hidden="true" />
        <div className="project-card__tint" aria-hidden="true" />
        <div className="project-card__play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* ========== 原有 meta（全部保留） ========== */}
      <div className="project-card__meta">
        <span className="project-card__num">PROJECT {project.id}</span>
        <span className="project-card__year">2026</span>
        <span className="project-card__category">{category.toUpperCase()}</span>
      </div>
    </article>
  );
}
