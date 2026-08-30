import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills } from '../data/skills';
import './SkillsSection.css';

export default function SkillsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const categories = [
    { key: 'video', items: skills.video },
    { key: 'motion', items: skills.motion },
    { key: 'vfx', items: skills.vfx },
    { key: 'digital', items: skills.digital },
    { key: 'tools', items: skills.tools },
    { key: 'office', items: skills.office },
  ];

  return (
    <section className="skills">
      <div ref={revealRef} className="skills__inner reveal">
        <div className="skills__header">
          <span className="skills__label">— 03 —</span>
          <h3 className="skills__title">
            <span className="skills__title-script">skills</span>
            <span className="skills__title-editorial">& tools</span>
          </h3>
        </div>
        <div className="skills__grid">
          {categories.map(({ key, items }) => (
            <div key={key} className="skills__category">
              <h4 className="skills__category-title">
                {t.about.skillCategories[key]}
              </h4>
              <div className="skills__divider" />
              <ul className="skills__list">
                {items.map((item) => (
                  <li key={item} className="skills__item">
                    <span className="skills__item-dot">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="skills__decor" aria-hidden="true">
          <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 10 Q 30 3, 60 8 T 115 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
