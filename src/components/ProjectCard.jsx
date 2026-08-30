import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useLocalizedText } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VideoPlaceholder from './VideoPlaceholder';
import './ProjectCard.css';

export default function ProjectCard({ project, index, layoutIndex, onVideoClick }) {
  const { t } = useLanguage();
  const title = useLocalizedText(project.title);
  const category = useLocalizedText(project.category);
  const role = useLocalizedText(project.role);
  const revealRef = useScrollReveal();
  const [isHovered, setIsHovered] = useState(false);

  const linkTo = project.linkToPersonal ? '/personal' : `/work/${project.slug}`;

  const layoutClasses = [
    'project-card--layout-0',
    'project-card--layout-1',
    'project-card--layout-2',
    'project-card--layout-3',
    'project-card--layout-4',
  ];

  const handleVideoClick = (e) => {
    if (onVideoClick && project.video) {
      e.preventDefault();
      onVideoClick(project);
    }
  };

  return (
    <article
      ref={revealRef}
      className={`project-card ${layoutClasses[layoutIndex]} reveal ${isHovered ? 'project-card--hovered' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={linkTo} className="project-card__link">
        <div className="project-card__media-wrap">
          <div className="project-card__media" onClick={handleVideoClick}>
            <VideoPlaceholder
              videoSrc={project.video}
              coverSrc={project.cover}
              className="project-card__video"
              autoPlay={isHovered}
              muted={true}
              loop={true}
              playsInline={true}
            />
            <div className="project-card__video-overlay">
              <span className="project-card__expand-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h6v2H6v4H4V4zM20 4h-6v2h4v4h2V4zM4 20h6v-2H6v-4H4v6zM20 20h-6v-2h4v-4h2v6z" fill="currentColor" />
                </svg>
              </span>
              <span className="project-card__expand-text">click to enlarge</span>
            </div>
          </div>

          <div className="project-card__number project-card__number--side">
            <span>{project.id}</span>
          </div>

          <div className="project-card__annotation project-card__annotation--circle" aria-hidden="true">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
            <span className="project-card__annotation-text">view</span>
          </div>

          <div className="project-card__scribble project-card__scribble--1" aria-hidden="true">
            <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 10 Q 25 2, 50 8 T 95 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="project-card__scribble project-card__scribble--2" aria-hidden="true">
            <svg viewBox="0 0 80 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 8 Q 20 2, 40 6 T 75 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="project-card__star project-card__star--1" aria-hidden="true">✦</div>
        </div>

        <div className="project-card__info">
          <div className="project-card__meta-top">
            <span className="project-card__category">{category}</span>
            <span className="project-card__year">2026</span>
          </div>

          <h3 className="project-card__title">
            <span className="project-card__title-text">{title}</span>
            <span className="project-card__title-underline" aria-hidden="true">
              <svg viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 8 Q 40 2, 80 7 T 160 4 T 195 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h3>

          <div className="project-card__meta-bottom">
            <span className="project-card__role">{role}</span>
            <span className="project-card__arrow">
              →
            </span>
          </div>
        </div>

        <div className="project-card__sticker" aria-hidden="true">
          <span className="project-card__sticker-text">{project.isMotion ? 'MOTION' : 'VIDEO'}</span>
        </div>
      </Link>
    </article>
  );
}
