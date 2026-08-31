import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './VideoLightbox.css';

export default function VideoLightbox({ project, onClose }) {
  const { t, lang } = useLanguage();
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = project.title?.[lang] || project.title?.en || '';
  const category = project.category?.[lang] || project.category?.en || '';

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="video-lightbox" onClick={handleOverlayClick}>
      <div className="video-lightbox__grain" aria-hidden="true" />
      
      <div className="video-lightbox__inner">
        <button
          className="video-lightbox__close"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="video-lightbox__close-text">CLOSE</span>
          <span className="video-lightbox__close-icon">×</span>
        </button>

        <div className="video-lightbox__info">
          <span className="video-lightbox__project-num">PROJECT {project.id}</span>
          <span className="video-lightbox__category">{category}</span>
          <span className="video-lightbox__year">2026</span>
        </div>

        <div className="video-lightbox__player">
          {!isLoaded && project.cover && (
            <img
              src={project.cover}
              alt=""
              className="video-lightbox__poster"
            />
          )}
          <video
            ref={videoRef}
            src={project.video}
            controls
            playsInline
            className="video-lightbox__video"
            onLoadedData={() => setIsLoaded(true)}
          />
        </div>

        <div className="video-lightbox__title">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
}
