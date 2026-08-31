import { forwardRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './VideoPlaceholder.css';

/**
 * VideoPlaceholder — 封面图 / Coming Soon 占位 + hover 预览视频层
 *
 * Props:
 *  - label / aspectRatio / className / coverSrc       （原占位图职责，保留）
 *  - previewVideoSrc?: string   预览短视频地址；有值就渲染 <video> 预览层（常驻，只由 opacity 控制显示）
 *  - previewAudio?: boolean     预览是否出声，默认 false（静音）
 *  - isPreviewPlaying?: boolean 是否显示预览视频（由父组件 ProjectCard 通过 playing event 精确控制）
 *
 * 设计（严格对应修复规格#1 #2 #3 #9）：
 *  · cover poster 永远 opacity:1（作为 video preview 的 fallback，不随 isPreviewPlaying 隐藏）
 *  · <video> 只在 previewVideoSrc 有值 + coverSrc 有值时渲染 → 加载 metadata 成本受控
 *  · <video> 渲染后常驻在 DOM，**不做 isPreviewPlaying 条件挂/卸** → 只由 opacity 控制淡入淡出
 *  · preload="auto" → hover preview 专用，减少移入等待
 *  · 只监听 'playing' 事件 → 不监听 'waiting'（避免 buffering 反复显隐造成闪烁）
 */
const VideoPlaceholder = forwardRef(function VideoPlaceholder(
  {
    label,
    aspectRatio = '16/9',
    className = '',
    coverSrc = null,
    previewVideoSrc,
    previewAudio = false,
    isPreviewPlaying = false,
  },
  ref,
) {
  const { t } = useLanguage();
  const displayLabel = label || t.works.comingSoon;

  /* ========== 规格 #4：只监听 'playing'，不监听 'waiting' ==========
     真正的 show 时机由父组件 ProjectCard 控制 ——
     父组件通过 ref 拿到 <video>，监听 playing 并 setState 写入 isPreviewPlaying。
     这里只做一层保险：若是视频内部报错，通过 ref 对应的 video 触发 error 时父组件自己处理。
     此处不再订阅事件，避免与父组件事件重复订阅产生竞态。*/
  useEffect(() => {
    // 占位：预留扩展点。当前 playing/error 的订阅统一放在 ProjectCard useEffect 内处理。
  }, []);

  return (
    <div
      className={`video-placeholder ${coverSrc ? 'video-placeholder--has-cover' : 'video-placeholder--is-placeholder'} ${className}`}
      style={{ aspectRatio }}
    >
      {/* ========== Poster / 封面图：永远可见（Fallback 用） ========== */}
      {coverSrc && (
        <img
          src={coverSrc}
          alt=""
          className="video-placeholder__cover"
        />
      )}

      {/* ========== 预览视频层：叠加在 poster 上，默认透明
          条件渲染 = 有 previewVideoSrc AND 有 coverSrc（只有有封面图的卡片才需要预览层）。
          一旦渲染，**不因 isPreviewPlaying 卸载**。
      */}
      {previewVideoSrc && coverSrc && (
        <video
          ref={ref}
          src={previewVideoSrc}
          className={`video-placeholder__preview ${
            isPreviewPlaying ? 'video-placeholder__preview--visible' : ''
          }`}
          muted={!previewAudio}
          loop
          playsInline
          controlsList="nodownload"
          preload="auto"
          aria-hidden="true"
        />
      )}

      {/* ========== Coming Soon 占位图案（仅当 coverSrc 为空时渲染） ========== */}
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
