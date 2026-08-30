import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [fading, setFading] = useState(false);

  const toggleLanguage = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
      setTimeout(() => setFading(false), 50);
    }, 200);
  }, []);

  const setLanguage = useCallback((newLang) => {
    if (newLang === lang) return;
    setFading(true);
    setTimeout(() => {
      setLang(newLang);
      setTimeout(() => setFading(false), 50);
    }, 200);
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, setLanguage, fading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export function useLocalizedText(textObj) {
  const { lang } = useLanguage();
  if (typeof textObj === 'string') return textObj;
  return textObj[lang] || textObj.en;
}
