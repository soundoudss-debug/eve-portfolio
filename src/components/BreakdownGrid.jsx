import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './BreakdownGrid.css';

export default function BreakdownGrid({ items }) {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="breakdown-grid reveal">
      {items.map((item) => (
        <div key={item} className="breakdown-grid__item">
          <div className="breakdown-grid__media">
            <VideoPlaceholder
              label={t.project.comingSoon}
              aspectRatio="16/9"
              className="breakdown-grid__placeholder"
            />
          </div>
          <h4 className="breakdown-grid__label">{t.breakdown[item]}</h4>
        </div>
      ))}
    </div>
  );
}
