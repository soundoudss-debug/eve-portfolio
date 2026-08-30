import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import './About.css';

export default function About() {
  const { t, lang } = useLanguage();
  const headerRef = useScrollReveal();
  const bioRef = useScrollReveal();
  const eduRef = useScrollReveal();

  return (
    <div className="page about">
      <div className="about__hero">
        <div ref={headerRef} className="about__hero-content reveal">
          <span className="about__hero-label">— ABOUT —</span>
          <h1 className="about__hero-title">
            <span className="about__hero-title-script">hi, i'm</span>
            <br />
            <span className="about__hero-name">eve</span>
          </h1>
          <p className="about__hero-tagline">
            {lang === 'en' 
              ? 'Motion designer & video editor exploring the intersection of music, fashion and visual storytelling.'
              : '动态设计师 & 视频剪辑师，探索音乐、时尚与视觉叙事的交汇点。'}
          </p>
        </div>

        <div className="about__hero-decor about__hero-decor--1" aria-hidden="true">
          <span className="about__decor-star">✦</span>
        </div>
        <div className="about__hero-decor about__hero-decor--2" aria-hidden="true">
          <svg viewBox="0 0 120 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12 Q 25 4, 50 10 T 100 6 T 115 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="about__hero-decor about__hero-decor--3" aria-hidden="true">
          <span className="about__decor-circle" />
        </div>
      </div>

      <div className="about__content">
        <div ref={bioRef} className="about__bio reveal">
          <div className="about__bio-header">
            <span className="about__section-number">01</span>
            <h2 className="about__section-title">
              <span className="about__section-title-script">the</span>
              <span className="about__section-title-editorial">story</span>
            </h2>
          </div>
          <div className="about__bio-text-wrap">
            <p className="about__bio-text">{t.about.bio}</p>
            <div className="about__bio-scribble" aria-hidden="true">
              <svg viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 10 Q 20 3, 40 8 T 75 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="about__themes">
          <div className="about__theme about__theme--1">
            <span className="about__theme-script">motion</span>
          </div>
          <div className="about__theme about__theme--2">
            <span className="about__theme-script">music</span>
          </div>
          <div className="about__theme about__theme--3">
            <span className="about__theme-script">fashion</span>
          </div>
          <div className="about__theme about__theme--4">
            <span className="about__theme-script">visuals</span>
          </div>
        </div>

        <div ref={eduRef} className="about__education reveal">
          <div className="about__education-header">
            <span className="about__section-number">02</span>
            <h2 className="about__section-title">
              <span className="about__section-title-editorial">education</span>
              <span className="about__section-title-script">& skills</span>
            </h2>
          </div>
          
          <div className="about__edu-card">
            <div className="about__edu-year">
              <span className="about__edu-year-text">2023 — 2027</span>
            </div>
            <div className="about__edu-info">
              <h3 className="about__degree">{t.about.degree}</h3>
              <p className="about__school">{t.about.school}</p>
              <div className="about__courses">
                <span className="about__courses-label">{t.about.courses}</span>
                <div className="about__courses-list">
                  {t.about.courseList.map((course) => (
                    <span key={course} className="about__course-item">{course}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="about__edu-decoration" aria-hidden="true">
              <span className="about__edu-star">✧</span>
            </div>
          </div>
        </div>

        <SkillsSection />
      </div>

      <ContactSection />
    </div>
  );
}
