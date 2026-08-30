import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__logo">eve</span>
        </div>
        <div className="footer__center">
          <span className="footer__script">✦</span>
        </div>
        <div className="footer__right">
          <span className="footer__copy">
            © {year} · {lang === 'en' ? 'all rights reserved' : '保留所有权利'}
          </span>
        </div>
        <div className="footer__line" aria-hidden="true" />
        <div className="footer__scribble" aria-hidden="true">
          <svg viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 7 Q 50 2, 100 6 T 195 5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
