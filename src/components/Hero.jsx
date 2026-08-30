import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { t, lang } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__paper-grain" aria-hidden="true" />

      <div className="hero__editorial-text hero__editorial-text--top-left">
        <span className="hero__editorial-label">ISSUE N°01</span>
        <span className="hero__editorial-line" />
        <span className="hero__editorial-label">2026</span>
      </div>

      <div className="hero__editorial-text hero__editorial-text--top-right">
        <span className="hero__editorial-label">MOTION DESIGN</span>
        <span className="hero__editorial-label">VIDEO EDITING</span>
      </div>

      <div className="hero__editorial-text hero__editorial-text--bottom-left">
        <span className="hero__editorial-label">VISUAL EXPERIMENTS</span>
        <span className="hero__editorial-label">DIGITAL MEDIA</span>
      </div>

      <div className="hero__editorial-text hero__editorial-text--bottom-right">
        <span className="hero__editorial-label">SELECTED WORKS</span>
        <span className="hero__editorial-line" />
        <span className="hero__editorial-label">VOL.1</span>
      </div>

      <div className={`hero__content ${loaded ? 'hero__content--loaded' : ''}`}>
        <div className="hero__name-wrap">
          <h1 className="hero__name">eve</h1>
          <div className="hero__flourish" aria-hidden="true">
            <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 22 Q 60 10, 120 18 T 240 12 T 340 20 T 390 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <p className="hero__tagline">
          MOTION <span className="hero__tagline-sep">/</span> IMAGE <span className="hero__tagline-sep">/</span> RHYTHM
        </p>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-label">{lang === 'en' ? 'SCROLL' : '向下滚动'}</span>
        <div className="hero__scroll-line">
          <svg viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="80"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
