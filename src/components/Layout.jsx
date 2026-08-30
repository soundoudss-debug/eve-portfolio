import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children }) {
  const { fading } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div className="paper-texture" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <main className={`lang-fade ${fading ? 'lang-fade--active' : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
