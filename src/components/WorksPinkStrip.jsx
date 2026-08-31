import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './WorksPinkStrip.css';

/**
 * WorksPinkStrip — Hero 与 WorksHeader 之间的独立粉色 editorial strip（nav 高度）
 *   · 高度 ≈ nav（56px）
 *   · 只放一个居中的 résumé 按钮 + modal
 *   · 按钮 / 弹窗文案已接入双语（useLanguage），解决「中文版本网站没有翻译」
 */
export default function WorksPinkStrip() {
  const { t, lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const resumeLabel = t.hero?.resume ?? t.nav?.resume ?? t.contact?.resume ?? (lang === 'en' ? 'Résumé' : '简历');
  const modalTitle = t.contact?.resumeComingSoon ?? (lang === 'en' ? 'Résumé coming soon.' : '简历即将上线。');
  const modalBodyExtra = lang === 'en'
    ? 'Thank you for your patience.'
    : '感谢您的耐心等待。';
  const closeLabel = lang === 'en' ? 'Close' : '关闭';

  return (
    <section className="works-pink-strip" aria-label="Editorial color field between Hero and Works">
      <div className="works-pink-strip__grain" aria-hidden="true" />
      <div className="works-pink-strip__halftone" aria-hidden="true" />

      <button
        type="button"
        className="works-pink-strip__resume"
        onClick={() => setShowModal(true)}
        aria-label={resumeLabel}
      >
        <span className="works-pink-strip__resume-text">{resumeLabel}</span>
        <span className="works-pink-strip__resume-underline" aria-hidden="true" />
      </button>

      {showModal && (
        <div
          className="works-pink-strip__modal-overlay"
          onClick={() => setShowModal(false)}
          role="presentation"
        >
          <div
            className="works-pink-strip__modal"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="works-pink-strip__modal-script">✦</span>
            <p className="works-pink-strip__modal-text">
              {modalTitle}
              <br />
              {modalBodyExtra}
            </p>
            <button
              type="button"
              className="works-pink-strip__modal-close"
              onClick={() => setShowModal(false)}
            >
              {closeLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
