import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useLanguage, useLocalizedText } from '../context/LanguageContext';
import { getProjectBySlug, getAdjacentProjects, normalizeRole } from '../data/projects';
import VideoPlaceholder from '../components/VideoPlaceholder';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const project = getProjectBySlug(slug);

  const currentRole = normalizeRole(searchParams.get('role'));
  const { prev, next } = getAdjacentProjects(slug, currentRole);

  const title = useLocalizedText(project?.title ?? { en: '', zh: '' });
  const category = useLocalizedText(project?.category ?? { en: '', zh: '' });
  const description = useLocalizedText(project?.description ?? { en: '', zh: '' });
  const role = useLocalizedText(project?.role ?? { en: '', zh: '' });
  const tags = useLocalizedText(project?.tags ?? { en: [], zh: [] });
  const prevTitle = prev ? useLocalizedText(prev.title) : '';
  const nextTitle = next ? useLocalizedText(next.title) : '';

  const worksPath = currentRole === 'DEFAULT'
    ? '/#works'
    : `/?role=${currentRole.toLowerCase()}#works`;

  if (!project) {
    return (
      <div className="page project-detail">
        <div className="project-detail__not-found">
          <p>Project not found</p>
          <Link to={worksPath}>{t.project.back}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page project-detail">
      <div className="project-detail__inner">
        <div className="project-detail__top-bar">
          <Link to={worksPath} className="project-detail__back" data-cursor-hover>
            <span className="project-detail__back-arrow">←</span>
            <span>{t.project.back}</span>
          </Link>
          <span className="project-detail__issue">N°{project.id} / 2026</span>
        </div>

        <header className="project-detail__header">
          <div className="project-detail__meta-row">
            <span className="project-detail__category">{category}</span>
            <span className="project-detail__divider-dot">✦</span>
            <span className="project-detail__tags">
              {Array.isArray(tags) ? tags.join(' · ') : ''}
            </span>
          </div>

          <h1 className="project-detail__title">
            <span className="project-detail__title-script">
              {title.split(' ')[0]?.toLowerCase() || title.toLowerCase()}
            </span>
            <span className="project-detail__title-main">
              {title.split(' ').slice(1).join(' ') || title}
            </span>
          </h1>

          <p className="project-detail__description">{description}</p>
        </header>

        <div className="project-detail__video-wrap" data-cursor-hover>
          <VideoPlaceholder
            videoSrc={project.video}
            coverSrc={project.cover}
            aspectRatio="16/9"
            controls
            className="project-detail__video"
          />
          <div className="project-detail__video-decor" aria-hidden="true">
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
        </div>

        <div className="project-detail__info">
          <div className="project-detail__info-item">
            <span className="project-detail__info-label">{t.project.role}</span>
            <span className="project-detail__info-value">{role}</span>
          </div>
          <div className="project-detail__info-divider" />
          <div className="project-detail__info-item">
            <span className="project-detail__info-label">{t.project.tools}</span>
            <span className="project-detail__info-value">{project.tools.join(' · ')}</span>
          </div>
        </div>

        <div className="project-detail__nav">
          <div className="project-detail__nav-col">
            {prev ? (
              <Link
                to={`/work/${prev.slug}${currentRole !== 'DEFAULT' ? `?role=${currentRole.toLowerCase()}` : ''}`}
                className="project-detail__nav-link project-detail__nav-link--prev"
                data-cursor-hover
              >
                <span className="project-detail__nav-arrow">←</span>
                <div className="project-detail__nav-text">
                  <span className="project-detail__nav-label">{lang === 'en' ? 'Previous' : '上一个'}</span>
                  <span className="project-detail__nav-title">{prevTitle}</span>
                </div>
              </Link>
            ) : (
              <div className="project-detail__nav-link project-detail__nav-link--disabled">
                <span className="project-detail__nav-arrow">←</span>
                <div className="project-detail__nav-text">
                  <span className="project-detail__nav-label">{lang === 'en' ? 'Previous' : '上一个'}</span>
                  <span className="project-detail__nav-title">{lang === 'en' ? 'First project' : '已是第一个'}</span>
                </div>
              </div>
            )}
          </div>

          <Link to={worksPath} className="project-detail__nav-back" data-cursor-hover>
            <span className="project-detail__nav-back-icon">✦</span>
            <span>{t.project.back}</span>
          </Link>

          <div className="project-detail__nav-col">
            {next ? (
              <Link
                to={`/work/${next.slug}${currentRole !== 'DEFAULT' ? `?role=${currentRole.toLowerCase()}` : ''}`}
                className="project-detail__nav-link project-detail__nav-link--next"
                data-cursor-hover
              >
                <div className="project-detail__nav-text">
                  <span className="project-detail__nav-label">{lang === 'en' ? 'Next' : '下一个'}</span>
                  <span className="project-detail__nav-title">{nextTitle}</span>
                </div>
                <span className="project-detail__nav-arrow">→</span>
              </Link>
            ) : (
              <div className="project-detail__nav-link project-detail__nav-link--disabled">
                <div className="project-detail__nav-text">
                  <span className="project-detail__nav-label">{lang === 'en' ? 'Next' : '下一个'}</span>
                  <span className="project-detail__nav-title">{lang === 'en' ? 'Last project' : '已是最后一个'}</span>
                </div>
                <span className="project-detail__nav-arrow">→</span>
              </div>
            )}
          </div>
        </div>

        <div className="project-detail__ending" aria-hidden="true">
          <span className="project-detail__ending-script">fin.</span>
        </div>
      </div>
    </div>
  );
}
