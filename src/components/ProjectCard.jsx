import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocalizedText } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './ProjectCard.css';

/* ===== 新增：hover 预览视频配置 ===== */
const HOVER_DELAY = 200; // 200ms 防抖延时

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export default function ProjectCard({
  project,
  index,
  layoutIndex,
  onClick,
  /* ===== 新增 props ===== */
  previewVideoSrc,   // 预览短视频地址，不传则不渲染 video 层
  previewAudio = false, // 预览是否有声，默认 false（静音）
}) {
  const category = useLocalizedText(project.category);
  const revealRef = useScrollReveal();
  /* ===== 新增：视频引用与防抖定时器 ===== */
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  /* ===== 原有状态（保留） ===== */
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  /* ===== 新增：视频预览显示状态 ===== */
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  /* ===== 新增：监听视频 playing/waiting 事件 ===== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      setIsPreviewPlaying(true);
    };

    const handleWaiting = () => {
      setIsPreviewPlaying(false);
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('waiting', handleWaiting);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, []);

  /* ===== 新增：是否启用预览（有视频源 + 非触屏） ===== */
  const hasPreview = !!previewVideoSrc && !isTouchDevice();

  const layoutClasses = [
    'project-card--layout-0',
    'project-card--layout-1',
    'project-card--layout-2',
    'project-card--layout-3',
    'project-card--layout-4',
    'project-card--layout-5',
  ];

  /* ===== 原有点击逻辑（保留） ===== */
  const handleClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  /* ===== 新增：开始预览 ===== */
  const startPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // 先重置到 0 秒，再播放
    try {
      video.currentTime = 0;
    } catch (e) {}

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPreviewPlaying(false);
      });
    }
  }, []);

  /* ===== 新增：停止预览 ===== */
  const stopPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPreviewPlaying(false);

    video.pause();

    try {
      video.currentTime = 0;
    } catch (e) {}
  }, []);

  /* ===== 修改：mouseenter 加入防抖 + 预览逻辑 ===== */
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true); // 原有 hover 状态保留

    if (!hasPreview) return; // 无预览或触屏，跳过

    // 清除已有定时器（防快速反复进出）
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      startPreview();
    }, HOVER_DELAY);
  }, [hasPreview, startPreview]);

  /* ===== 修改：mouseleave 清除定时器 + 停止预览 ===== */
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false); // 原有
    setIsPressed(false); // 原有

    // 清除防抖定时器
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    // 停止视频预览并重置
    if (hasPreview) {
      stopPreview();
    }
  }, [hasPreview, stopPreview]);

  /* ===== 原有按压逻辑（保留） ===== */
  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  /* ===== 新增：卸载时清理（防内存泄漏） ===== */
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      const video = videoRef.current;
      if (video) {
        video.pause();
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
      {/* ===== 原有媒体容器（保留全部层级） ===== */}
      <div className="project-card__media">
        {/* ===== 修改：VideoPlaceholder 新增 preview 相关 props ===== */}
        <VideoPlaceholder
          ref={videoRef}
          coverSrc={project.cover}
          className="project-card__video"
          previewVideoSrc={previewVideoSrc}
          previewAudio={previewAudio}
          isPreviewPlaying={isPreviewPlaying}
        />
        {/* ===== 原有装饰层（全部保留） ===== */}
        <div className="project-card__grain" aria-hidden="true" />
        <div className="project-card__vignette" aria-hidden="true" />
        <div className="project-card__tint" aria-hidden="true" />
        <div className="project-card__play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* ===== 原有 meta（全部保留） ===== */}
      <div className="project-card__meta">
        <span className="project-card__num">PROJECT {project.id}</span>
        <span className="project-card__year">2026</span>
        <span className="project-card__category">{category.toUpperCase()}</span>
      </div>
    </article>
  );
}
