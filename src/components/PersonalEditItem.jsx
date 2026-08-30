import { useState, useRef, useEffect } from 'react';
import VideoPlaceholder from './VideoPlaceholder';
import './PersonalEditItem.css';

export default function PersonalEditItem({ edit, onOpen, comingSoonLabel }) {
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!edit.video) return;
    fetch(edit.video, { method: 'HEAD' })
      .then((res) => setHasVideo(res.ok))
      .catch(() => setHasVideo(false));
  }, [edit.video]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hasVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`personal-item personal-item--${edit.size}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(edit)}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          src={edit.video}
          muted
          loop
          playsInline
          className="personal-item__video"
        />
      ) : (
        <VideoPlaceholder
          label={comingSoonLabel}
          aspectRatio={edit.aspectRatio}
          className="personal-item__placeholder"
        />
      )}
      <div className={`personal-item__overlay ${isHovering ? 'personal-item__overlay--visible' : ''}`}>
        <span className="personal-item__play">▶</span>
      </div>
    </div>
  );
}
