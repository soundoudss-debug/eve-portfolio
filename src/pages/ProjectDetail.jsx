import { Link, useParams } from 'react-router-dom';
import { useLanguage, useLocalizedText } from '../context/LanguageContext';
import { getProjectBySlug } from '../data/projects';
import VideoPlaceholder from '../components/VideoPlaceholder';
import ProcessGrid from '../components/ProcessGrid';
import BreakdownGrid from '../components/BreakdownGrid';
import MotionBreakdown from '../components/MotionBreakdown';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const project = getProjectBySlug(slug);

  const title = useLocalizedText(project?.title ?? { en: '', zh: '' });
  const category = useLocalizedText(project?.category ?? { en: '', zh: '' });
  const about = useLocalizedText(project?.about ?? { en: '', zh: '' });
  const role = useLocalizedText(project?.role ?? { en: '', zh: '' });

  if (!project) {
    return (
      <div className="page project-detail">
        <div className="project-detail__not-found">
          <p>Project not found</p>
          <Link to="/">{t.project.back}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page project-detail">
      <div className="project-detail__hero">
        <div className="project-detail__hero-overlay">
          <div className="project-detail__hero-top">
            <Link to="/#works" className="project-detail__back" data-cursor-hover>
              <span className="project-detail__back-arrow">←</span>
              <span>{t.project.back}</span>
            </Link>
            <span className="project-detail__issue">ISSUE N°{project.id}</span>
          </div>

          <div className="project-detail__hero-content">
            <div className="project-detail__hero-meta">
              <span className="project-detail__hero-category">{category}</span>
              <span className="project-detail__hero-year">2026</span>
            </div>

            <h1 className="project-detail__hero-title">
              <span className="project-detail__hero-title-script">
                {title.split(' ')[0]?.toLowerCase() || title.toLowerCase()}
              </span>
              <span className="project-detail__hero-title-main">
                {title.split(' ').slice(1).join(' ') || title}
              </span>
            </h1>

            <div className="project-detail__hero-info">
              <div className="project-detail__hero-info-item">
                <span className="project-detail__hero-info-label">{t.project.role}</span>
                <span className="project-detail__hero-info-value">{role}</span>
              </div>
              <div className="project-detail__hero-info-item">
                <span className="project-detail__hero-info-label">{t.project.tools}</span>
                <span className="project-detail__hero-info-value">{project.tools.join(' · ')}</span>
              </div>
            </div>
          </div>

          <div className="project-detail__hero-decor project-detail__hero-decor--1" aria-hidden="true">
            <span className="project-detail__decor-star">✦</span>
          </div>
          <div className="project-detail__hero-decor project-detail__hero-decor--2" aria-hidden="true">
            <svg viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 15 Q 30 5, 60 12 T 120 8 T 145 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <div className="project-detail__hero-video">
          <VideoPlaceholder
            label={t.works.comingSoon}
            videoSrc={project.video}
            coverSrc={project.cover}
            aspectRatio="16/9"
            controls
          />
        </div>
      </div>

      <div className="project-detail__content">
        <section className="project-detail__section project-detail__section--about">
          <div className="project-detail__section-header">
            <span className="project-detail__section-number">— 01 —</span>
            <h2 className="project-detail__section-title">
              <span className="project-detail__section-title-script">about</span>
              <br />
              <span className="project-detail__section-title-editorial">the project</span>
            </h2>
          </div>
          <div className="project-detail__about-content">
            <p className="project-detail__about-text">{about}</p>
            <div className="project-detail__about-note" aria-hidden="true">
              <span className="project-detail__note-script">note</span>
              <svg viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 8 Q 25 2, 50 6 T 95 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </section>

        <div className="project-detail__divider" aria-hidden="true">
          <span className="project-detail__divider-star">✦ ✦ ✦</span>
        </div>

        {project.isMotion && project.motionBreakdown && (
          <section className="project-detail__section project-detail__section--breakdown">
            <div className="project-detail__section-header">
              <span className="project-detail__section-number">— 02 —</span>
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-title-editorial">breakdown</span>
                <br />
                <span className="project-detail__section-title-script">of magic</span>
              </h2>
            </div>
            <MotionBreakdown items={project.motionBreakdown} />
          </section>
        )}

        {!project.isMotion && project.processSteps && (
          <section className="project-detail__section project-detail__section--process">
            <div className="project-detail__section-header">
              <span className="project-detail__section-number">— 02 —</span>
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-title-script">creative</span>
                <br />
                <span className="project-detail__section-title-editorial">process</span>
              </h2>
            </div>
            <ProcessGrid steps={project.processSteps} />
          </section>
        )}

        <div className="project-detail__callout" aria-hidden="true">
          <span className="project-detail__callout-text">
            {lang === 'en' ? 'visual storytelling at its finest' : '视觉叙事的极致'}
          </span>
        </div>

        {!project.isMotion && project.breakdownItems && (
          <section className="project-detail__section project-detail__section--breakdown">
            <div className="project-detail__section-header">
              <span className="project-detail__section-number">— 03 —</span>
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-title-editorial">technical</span>
                <br />
                <span className="project-detail__section-title-script">breakdown</span>
              </h2>
            </div>
            <BreakdownGrid items={project.breakdownItems} />
          </section>
        )}

        {project.isMotion && project.processSteps && (
          <section className="project-detail__section project-detail__section--process">
            <div className="project-detail__section-header">
              <span className="project-detail__section-number">— 03 —</span>
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-title-script">behind</span>
                <br />
                <span className="project-detail__section-title-editorial">the scenes</span>
              </h2>
            </div>
            <ProcessGrid steps={project.processSteps} />
          </section>
        )}

        <div className="project-detail__ending">
          <span className="project-detail__ending-script">fin.</span>
          <div className="project-detail__ending-line" />
        </div>
      </div>
    </div>
  );
}
