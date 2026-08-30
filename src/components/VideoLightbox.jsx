import { useEffect, useRef, useState } from 'react';
import { useLanguage, useLocalizedText } from '../context/LanguageContext';
import './VideoLightbox.css';

export default function VideoLightbox({ videoSrc, coverSrc, title, onClose }) {
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);
  const { t } = useLanguage();
  const displayTitle = useLocalizedText(title || { en: '', zh: '' });

  useEffect(() => {
    if (!videoSrc) {
      setHasVideo(false);
      return;
    }
    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => setHasVideo(res.ok))
      .catch(() => setHasVideo(false));
  }, [videoSrc]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__bg-decor" aria-hidden="true">
        <div className="lightbox__star lightbox__star--1">✦</div>
        <div className="lightbox__star lightbox__star--2">✧</div>
        <div className="lightbox__scribble">
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
      </div>

      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose}>
          <span className="lightbox__close-icon">×</span>
          <span className="lightbox__close-label">close</span>
        </button>

        <div className="lightbox__header">
          <span className="lightbox__label">— VIDEO PREVIEW —</span>
          {displayTitle && (
            <h3 className="lightbox__title">
              <span className="lightbox__title-script">{displayTitle}</span>
            </h3>
          )}
        </div>

        <div className="lightbox__video-container">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={coverSrc || undefined}
              controls
              autoPlay
              playsInline
              className="lightbox__video"
            />
          ) : (
            <div className="lightbox__placeholder">
              <span className="lightbox__placeholder-icon">✦</span>
              <span className="lightbox__placeholder-text">{t.works.comingSoon}</span>
            </div>
          )}
        </div>

        <div className="lightbox__footer">
          <span className="lightbox__footer-script">enjoy the show</span>
          <div className="lightbox__footer-line">
            <svg viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 5 Q 50 2, 100 5 T 195 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
