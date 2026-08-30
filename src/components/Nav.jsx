import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollNav } from '../hooks/useScrollNav';
import LanguageSwitch from './LanguageSwitch';
import './Nav.css';

export default function Nav() {
  const { t, lang } = useLanguage();
  const scrolled = useScrollNav();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, section) => {
    if (section === 'work') {
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        e.preventDefault();
        navigate('/#works');
      }
    }
    if (section === 'contact') {
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        e.preventDefault();
        navigate('/#contact');
      }
    }
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo" data-cursor-hover>
          <span className="nav__logo-script">eve</span>
        </Link>

        <nav className="nav__links">
          <Link
            to="/#works"
            className="nav__link"
            onClick={(e) => handleNavClick(e, 'work')}
            data-cursor-hover
          >
            <span className="nav__link-dot">✦</span>
            {t.nav.work}
          </Link>
          <Link to="/about" className="nav__link" data-cursor-hover>
            <span className="nav__link-dot">✦</span>
            {t.nav.about}
          </Link>
          <Link
            to="/#contact"
            className="nav__link"
            onClick={(e) => handleNavClick(e, 'contact')}
            data-cursor-hover
          >
            <span className="nav__link-dot">✦</span>
            {t.nav.contact}
          </Link>
        </nav>

        <div className="nav__right">
          <span className="nav__year">2026</span>
          <LanguageSwitch />
        </div>
      </div>

      <div className="nav__scribble nav__scribble--left" aria-hidden="true">
        <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 12 Q 20 4, 40 10 T 80 8 T 98 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="nav__scribble nav__scribble--right" aria-hidden="true">
        <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 8 Q 20 16, 40 10 T 80 12 T 98 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </header>
  );
}
