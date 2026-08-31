import { forwardRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './VideoPlaceholder.css';

const VideoPlaceholder = forwardRef(function VideoPlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
  coverSrc = null,
  /* ===== 新增：预览视频相关 props ===== */
  previewVideoSrc = null,  // 预览短视频地址
  previewAudio = false,     // 是否有声，默认 false（静音）
  isPreviewPlaying = false, // 是否正在预览（控制淡入淡出）
}, ref) {
  const { t } = useLanguage();
  const displayLabel = label || t.works.comingSoon;

  return (
    <div
      className={`video-placeholder ${coverSrc ? 'video-placeholder--has-cover' : 'video-placeholder--is-placeholder'} ${isPreviewPlaying ? 'video-placeholder--preview-playing' : ''} ${className}`}
      style={{ aspectRatio }}
    >
      {coverSrc && (
        <img
          src={coverSrc}
          alt=""
          className="video-placeholder__cover"
        />
      )}

      {/* ===== 新增：预览 video 层（绝对定位叠放，默认隐藏） ===== */}
      {previewVideoSrc && coverSrc && (
        <video
          ref={ref}
          src={previewVideoSrc}
          className={`video-placeholder__preview ${isPreviewPlaying ? 'video-placeholder__preview--visible' : ''}`}
          muted={!previewAudio}
          playsInline
          controlsList="nodownload"
          preload="metadata"
          aria-hidden="true"
        />
      )}

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
});

export default VideoPlaceholder;
