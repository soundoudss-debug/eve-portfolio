import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { contactLinks } from '../data/contact';
import './ContactSection.css';

export default function ContactSection() {
  const { t, lang } = useLanguage();
  const revealRef = useScrollReveal();
  const [showResumeModal, setShowResumeModal] = useState(false);

  const links = [
    { key: 'email', label: t.contact.email, href: contactLinks.email ? `mailto:${contactLinks.email}` : null },
    { key: 'behance', label: t.contact.links.behance, href: contactLinks.behance },
    { key: 'instagram', label: t.contact.links.instagram, href: contactLinks.instagram },
    { key: 'tiktok', label: t.contact.links.tiktok, href: contactLinks.tiktok },
    { key: 'linkedin', label: t.contact.links.linkedin, href: contactLinks.linkedin },
  ];

  const handleResumeClick = (e) => {
    e.preventDefault();
    if (contactLinks.resume) {
      window.open(contactLinks.resume, '_blank');
    } else {
      setShowResumeModal(true);
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div ref={revealRef} className="contact__inner reveal">
          <div className="contact__header">
            <span className="contact__label">— CONTACT —</span>
            <h2 className="contact__title">
              <span className="contact__title-script">get in</span>
              <br />
              <span className="contact__title-editorial">touch.</span>
            </h2>
            <p className="contact__subtitle">
              {lang === 'en'
                ? 'Open for collaborations, creative projects and weird ideas.'
                : '欢迎合作、创意项目和各种奇怪的想法。'}
            </p>
          </div>

          <div className="contact__links">
            {links.map(({ key, label, href }) => (
              href ? (
                <a
                  key={key}
                  href={href}
                  className="contact__link"
                  target={key !== 'email' ? '_blank' : undefined}
                  rel={key !== 'email' ? 'noopener noreferrer' : undefined}
                  data-cursor-hover
                >
                  <span className="contact__link-text">{label}</span>
                  <span className="contact__link-arrow">→</span>
                </a>
              ) : (
                <span key={key} className="contact__link contact__link--placeholder">
                  <span className="contact__link-text">{label}</span>
                  <span className="contact__placeholder-tag">{t.contact.placeholder}</span>
                </span>
              )
            ))}
          </div>

          <button className="contact__resume" onClick={handleResumeClick} data-cursor-hover>
            <span className="contact__resume-text">{t.contact.resume}</span>
            <span className="contact__resume-underline" />
          </button>

          <div className="contact__decor contact__decor--1" aria-hidden="true">
            <span className="contact__decor-star">✦</span>
          </div>
          <div className="contact__decor contact__decor--2" aria-hidden="true">
            <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 15 Q 25 5, 50 12 T 95 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div className="contact__decor contact__decor--3" aria-hidden="true">
            <span className="contact__decor-circle" />
          </div>
        </div>
      </section>

      {showResumeModal && (
        <div className="contact__modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="contact__modal" onClick={(e) => e.stopPropagation()}>
            <span className="contact__modal-script">✦</span>
            <p className="contact__modal-text">{t.contact.resumeComingSoon}</p>
            <button className="contact__modal-close" onClick={() => setShowResumeModal(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
