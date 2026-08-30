import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './MotionBreakdown.css';

export default function MotionBreakdown({ items }) {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="motion-breakdown reveal">
      {items.map((item) => (
        <div key={item} className="motion-breakdown__item">
          <div className="motion-breakdown__media">
            <VideoPlaceholder
              label={t.project.comingSoon}
              aspectRatio="16/9"
              className="motion-breakdown__placeholder"
            />
          </div>
          <h4 className="motion-breakdown__label">{t.motionBreakdown[item]}</h4>
        </div>
      ))}
    </div>
  );
}
