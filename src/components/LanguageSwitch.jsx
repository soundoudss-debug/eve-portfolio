import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitch.css';

export default function LanguageSwitch() {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="lang-switch">
      <button
        className={`lang-switch__btn ${lang === 'en' ? 'lang-switch__btn--active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-switch__sep">/</span>
      <button
        className={`lang-switch__btn ${lang === 'zh' ? 'lang-switch__btn--active' : ''}`}
        onClick={() => setLanguage('zh')}
        aria-label="切换中文"
      >
        中
      </button>
    </div>
  );
}
