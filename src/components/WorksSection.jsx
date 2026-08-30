import { useLanguage, useLocalizedText } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import './WorksSection.css';

export default function WorksSection() {
  const { t, lang } = useLanguage();
  const titleRef = useScrollReveal();

  return (
    <section id="works" className="works">
      <div className="works__bg-panels" aria-hidden="true">
        <div className="works__panel works__panel--pink" />
        <div className="works__panel works__panel--soft" />
      </div>

      <div className="works__bg-decor" aria-hidden="true">
        <div className="works__big-word works__big-word--work">
          <span>WORK</span>
        </div>
        <div className="works__big-script works__big-script--selected">
          <span>selected</span>
        </div>
        <div className="works__star works__star--1">✦</div>
        <div className="works__star works__star--2">✧</div>
        <div className="works__star works__star--3">✦</div>
        <div className="works__circle works__circle--1" />
        <div className="works__circle works__circle--2" />
        <div className="works__scribble works__scribble--1">
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
        <div className="works__scribble works__scribble--2">
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
      </div>

      <div className="works__header">
        <div ref={titleRef} className="works__title-wrap reveal">
          <span className="works__section-number">— 01 —</span>
          <h2 className="works__title">
            <span className="works__title-script">selected</span>
            <br />
            <span className="works__title-editorial">works</span>
          </h2>
          <span className="works__title-sub">
            {lang === 'en' ? '精选作品 · 2026' : 'SELECTED WORKS · 2026'}
          </span>
        </div>

        <div className="works__header-scribble" aria-hidden="true">
          <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 20 Q 30 5, 60 18 T 120 12 T 180 22 T 195 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="works__header-annotation" aria-hidden="true">
          <span className="works__annotation-text">— scroll —</span>
        </div>
      </div>

      <div className="works__grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            layoutIndex={index % 5}
          />
        ))}
      </div>

      <div className="works__footer-note">
        <span className="works__note-script">more coming soon...</span>
        <span className="works__note-star">✦</span>
      </div>
    </section>
  );
}
