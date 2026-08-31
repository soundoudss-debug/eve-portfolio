import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectCard from './ProjectCard';
import { projects, ROLE_MODES, normalizeRole, sortProjectsByRole } from '../data/projects';
import './WorksSection.css';

const ROLE_OPTIONS = [
  { value: ROLE_MODES.DEFAULT, labelKey: 'default' },
  { value: ROLE_MODES.GAME, labelKey: 'game' },
  { value: ROLE_MODES.COMMERCIAL, labelKey: 'commercial' },
  { value: ROLE_MODES.MCN, labelKey: 'mcn' },
];

export default function WorksSection({ onProjectClick }) {
  const { t, lang } = useLanguage();
  const titleRef = useScrollReveal();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionRef = useRef(null);

  const currentRole = useMemo(() => {
    const roleParam = searchParams.get('role');
    return normalizeRole(roleParam);
  }, [searchParams]);

  const sortedProjects = useMemo(() => {
    return sortProjectsByRole(projects, currentRole);
  }, [currentRole]);

  const handleRoleChange = (newRole) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newRole === ROLE_MODES.DEFAULT) {
      nextParams.delete('role');
    } else {
      nextParams.set('role', newRole.toLowerCase());
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleProjectClick = (project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <section id="works" className="works" ref={sectionRef}>
      <div className="works__grain" aria-hidden="true" />
      <div className="works__scanlines" aria-hidden="true" />

      <div className="works__pink-panel works__pink-panel--left" aria-hidden="true" />
      <div className="works__pink-panel works__pink-panel--right" aria-hidden="true" />

      <div className="works__big-script works__big-script--selected" aria-hidden="true">
        <span>selected</span>
      </div>

      <div className="works__big-script works__big-script--motion" aria-hidden="true">
        <span>MOTION</span>
      </div>

      <div className="works__micro-text works__micro-text--1" aria-hidden="true">
        <span>MOTION DESIGN</span>
        <span>VIDEO EDITING</span>
        <span>VISUAL EXPERIMENTS</span>
      </div>

      <div className="works__micro-text works__micro-text--2" aria-hidden="true">
        <span>EVE — 2026</span>
        <span>SELECTED WORKS</span>
      </div>

      <div className="works__micro-text works__micro-text--3" aria-hidden="true">
        <span>PLAY</span>
        <span>EDIT</span>
        <span>VISUAL</span>
      </div>

      <div className="works__star works__star--1" aria-hidden="true">★</div>
      <div className="works__star works__star--2" aria-hidden="true">★</div>
      <div className="works__star works__star--3" aria-hidden="true">✦</div>
      <div className="works__star works__star--4" aria-hidden="true">★</div>
      <div className="works__star works__star--5" aria-hidden="true">✧</div>
      <div className="works__star works__star--6" aria-hidden="true">★</div>

      <div className="works__hand-line works__hand-line--1" aria-hidden="true">
        <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M10 100 Q 80 30, 180 80 T 380 60 T 590 120"
            stroke="#E99AAF"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="works__hand-line works__hand-line--2" aria-hidden="true">
        <svg viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M490 50 Q 400 120, 280 70 T 10 100"
            stroke="#F29DB5"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="2 6"
          />
        </svg>
      </div>

      <div className="works__header">
        <div ref={titleRef} className="works__title-wrap">
          <span className="works__section-num">— 01 —</span>
          <span className="works__title-script">selected</span>
          <h2 className="works__title-editorial">WORKS</h2>
          <span className="works__title-sub">
            {lang === 'en' ? 'SELECTED WORKS · 2026' : '精选作品 · 2026'}
          </span>
        </div>
      </div>

      <div className="works__role-selector" role="tablist" aria-label="Portfolio version">
        <div className="works__role-buttons">
          {ROLE_OPTIONS.map((option) => {
            const isActive = currentRole === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                className={`works__role-btn ${isActive ? 'works__role-btn--active' : ''}`}
                onClick={() => handleRoleChange(option.value)}
              >
                {t.works.roles[option.labelKey]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="works__layout">
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            layoutIndex={index % 6}
            onClick={() => handleProjectClick(project)}
            previewVideoSrc={project.video}
          />
        ))}
      </div>

      <div className="works__footer">
        <span className="works__footer-text">more coming soon</span>
        <span className="works__footer-star">✦</span>
      </div>
    </section>
  );
}
