import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './VideoPlaceholder.css';

export default function VideoPlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
  videoSrc = null,
  coverSrc = null,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
  onClick,
}) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (!videoSrc) {
      setHasVideo(false);
      return;
    }

    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => setHasVideo(res.ok))
      .catch(() => setHasVideo(false));
  }, [videoSrc]);

  const displayLabel = label || t.works.comingSoon;

  if (hasVideo && videoSrc) {
    return (
      <div
        className={`video-placeholder video-placeholder--active ${className}`}
        style={{ aspectRatio }}
        onClick={onClick}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={coverSrc || undefined}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          className="video-placeholder__video"
        />
      </div>
    );
  }

  return (
    <div
      className={`video-placeholder ${className}`}
      style={{ aspectRatio }}
      onClick={onClick}
    >
      <div className="video-placeholder__inner">
        <div className="video-placeholder__frame">
          <span className="video-placeholder__corner video-placeholder__corner--tl" />
          <span className="video-placeholder__corner video-placeholder__corner--tr" />
          <span className="video-placeholder__corner video-placeholder__corner--bl" />
          <span className="video-placeholder__corner video-placeholder__corner--br" />
        </div>
        <span className="video-placeholder__label">{displayLabel}</span>
        <span className="video-placeholder__ratio">{aspectRatio.replace('/', ':')}</span>
      </div>
    </div>
  );
}
