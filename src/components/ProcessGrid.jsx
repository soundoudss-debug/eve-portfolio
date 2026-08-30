import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './ProcessGrid.css';

export default function ProcessGrid({ steps }) {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="process-grid reveal">
      {steps.map((step) => (
        <div key={step} className="process-grid__item">
          <div className="process-grid__media">
            <VideoPlaceholder
              label={t.project.comingSoon}
              aspectRatio="4/3"
              className="process-grid__placeholder"
            />
          </div>
          <h4 className="process-grid__label">{t.process[step]}</h4>
        </div>
      ))}
    </div>
  );
}
