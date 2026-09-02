import { useState } from 'react';
import { useLocalizedText } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ProjectCard.css';

/**
 * ProjectCard — 按独立 Demo 逐字重建媒体区
 * 参考：C:\Users\eve\Desktop\简历\新建文件夹\src\VideoPreviewPage.jsx 行 126-164
 *
 * ============ 严格对齐用户 §3 的 DOM 结构（media 内只两层 + 必要装饰） ============
 *
 *   <div class="project-card__media">
 *
 *     // 层 1：poster（永远存在 / 永远 opacity 1 / z=1）
 *     {project.cover && <img class="project-card__poster">}
 *
 *     // 层 2：preview video（previewVideoSrc 存在就常驻 DOM，不条件挂卸 / z=2）
 *     //      className 必须是 project-card__preview-video / 以及 --visible（当 isPlaying）
 *     //      回调 ref 登记到 WorksSection.videoRefs Map（等价 Demo 146-152）
 *     //      属性完全匹配 Demo 行 155-163：
 *     //        muted loop playsInline preload="metadata" controls={isHovered}
 *     //        onPlaying / onError / onEnded
 *     {previewVideoSrc && <video ...>}
 *
 *     // 层 3：原有装饰（grain / vignette / tint / play-btn）
 *     //     全部 pointer-events:none + 不使用不透明背景
 *     //     不会阻挡 <video controls> 的原生交互
 *   </div>
 *
 * ============ 严格遵守 §5 内部不自建 preview state ============
 *   不使用：
 *     · isPreviewPlaying / preview state / hover timer / preview ref / playback state
 *   只接收 WorksSection 传入的 9 个 props：
 *     project / index / layoutIndex / previewVideoSrc
 *     isHovered / isPlaying / registerVideoRef
 *     onMouseEnter / onMouseLeave / onPlaying / onVideoError / onVideoEnded
 *
 * ============ §14 删除点击浮窗 ============
 *   不监听 onClick 不触发 lightbox / modal / detail。
 */
export default function ProjectCard({
  project,
  index,
  layoutIndex,
  previewVideoSrc,
  isHovered = false,
  isPlaying = false,
  registerVideoRef,
  onMouseEnter,
  onMouseLeave,
  onPlaying,
  onVideoError,
  onVideoEnded,
}) {
  const category = useLocalizedText(project.category);
  const revealRef = useScrollReveal();
  const [isPressed, setIsPressed] = useState(false); // 仅做按下视觉反馈

  const layoutClasses = [
    'project-card--layout-0',
    'project-card--layout-1',
    'project-card--layout-2',
    'project-card--layout-3',
    'project-card--layout-4',
    'project-card--layout-5',
  ];

  return (
    <article
      ref={revealRef}
      className={[
        'project-card',
        layoutClasses[layoutIndex],
        'reveal',
        isHovered ? 'project-card--hovered' : '',
        isPlaying ? 'project-card--playing' : '',
        isPressed ? 'project-card--pressed' : '',
      ].filter(Boolean).join(' ')}
      style={{ transitionDelay: `${index * 120}ms` }}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="project-card__media">

        {/* ========== 层 1：Poster（严格对齐参考 Demo 行 137-142） ========== */}
        {project.cover && (
          <img
            src={project.cover}
            alt=""
            className="project-card__poster"
            loading="lazy"
          />
        )}

        {/* ========== 层 2：Preview Video ==========
            初始不挂 src：挂载时零网络请求，彻底消除媒体栈探测流被中止导致的
            net::ERR_ABORTED。首次 hover 时由 WorksSection 用 fetch 取回视频、
            生成本地 blob: URL 后再赋给 src（见 utils/videoBlob.js）。 */}
        {previewVideoSrc && (
          <video
            ref={registerVideoRef}
            className={`project-card__preview-video ${isPlaying ? 'project-card__preview-video--visible' : ''}`}
            muted
            loop
            playsInline
            controls={isHovered}
            controlsList="nodownload"
            onPlaying={onPlaying}
            onError={onVideoError}
            onEnded={onVideoEnded}
          />
        )}

        {/* ========== 原有装饰层（§13 不动外观） ==========
            pointer-events: none → 不会阻挡 <video controls> 的点击
            z-index 顺序：
              poster: 1
              video:  2
              grain / vignette: 3（paper 质感，无不透明背景）
              tint: 4（30% 半透明粉色遮罩，用户要求保留 hover 设计）
              play-btn: 5（圆形 play 图标，半透明粉色，视觉保留）
        */}
        <div className="project-card__grain" aria-hidden="true" />
        <div className="project-card__vignette" aria-hidden="true" />
        <div className="project-card__tint" aria-hidden="true" />
        <div className="project-card__play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* ========== 原有 meta（§13 不动外观） ========== */}
      <div className="project-card__meta">
        <span className="project-card__num">PROJECT {project.id}</span>
        <span className="project-card__year">2026</span>
        <span className="project-card__category">{category.toUpperCase()}</span>
      </div>
    </article>
  );
}
