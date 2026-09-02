import { useLanguage } from '../context/LanguageContext';
import './VideoPlaceholder.css';

/**
 * VideoPlaceholder（已删除所有旧 hover preview 功能，只保留：Cover / Coming Soon 占位）
 *
 *   旧版本这里承担过：
 *     · forwardRef -> previewVideoRef
 *     · previewVideoSrc / previewAudio / isPreviewPlaying 三合一预览层
 *     · preload="auto" + opacity isPreviewPlaying 切换
 *   按用户 §1 / §2 / §15 要求：以上所有 preview 代码和功能已彻底删除。
 *
 *   现在此组件仅用于：
 *     1) coverSrc 非空 → 显示一张静态 <img>（纯封面）
 *     2) coverSrc 为空 → 显示 Coming Soon 占位图案（装饰 + 文案 + 占位）
 *
 *   hover 视频预览新实现已经搬到 ProjectCard.jsx 内的 2 层结构：
 *     <img class="project-card__poster"> (z=1)
 *     <video class="project-card__preview-video"> (z=2)
 *   不再通过本组件间接传递。
 */
export default function VideoPlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
  coverSrc = null,
}) {
  const { t } = useLanguage();
  const displayLabel = label || t.works.comingSoon;

  return (
    <div
      className={`video-placeholder ${coverSrc ? 'video-placeholder--has-cover' : 'video-placeholder--is-placeholder'} ${className}`}
      style={{ aspectRatio }}
    >
      {/* 静态封面图（如果有）：纯展示，不接交互 */}
      {coverSrc && (
        <img
          src={coverSrc}
          alt=""
          className="video-placeholder__cover"
        />
      )}

      {/* Coming Soon 占位图案（仅当 coverSrc 为空时） */}
      {!coverSrc && (
        <div className="video-placeholder__inner">
          <span className="video-placeholder__decor-star video-placeholder__decor-star--1">✦</span>
          <span className="video-placeholder__decor-star video-placeholder__decor-star--2">✧</span>

          <div className="video-placeholder__decor-scribble video-placeholder__decor-scribble--1">
            <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 15 Q 25 5, 50 12 T 95 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div className="video-placeholder__decor-scribble video-placeholder__decor-scribble--2">
            <svg viewBox="0 0 80 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12 Q 20 20, 40 10 T 75 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="video-placeholder__frame">
            <span className="video-placeholder__corner video-placeholder__corner--tl" />
            <span className="video-placeholder__corner video-placeholder__corner--tr" />
            <span className="video-placeholder__corner video-placeholder__corner--bl" />
            <span className="video-placeholder__corner video-placeholder__corner--br" />
          </div>

          <div className="video-placeholder__play-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <span className="video-placeholder__label-sub">coming soon</span>
          <span className="video-placeholder__label">{displayLabel}</span>

          <span className="video-placeholder__ratio">{aspectRatio.replace('/', ':')}</span>
        </div>
      )}
    </div>
  );
}
