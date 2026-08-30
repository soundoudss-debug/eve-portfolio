import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { personalEdits } from '../data/personalEdits';
import PersonalEditItem from '../components/PersonalEditItem';
import VideoLightbox from '../components/VideoLightbox';
import ContactSection from '../components/ContactSection';
import './PersonalEdits.css';

export default function PersonalEdits() {
  const { t, lang } = useLanguage();
  const headerRef = useScrollReveal();
  const [activeEdit, setActiveEdit] = useState(null);

  return (
    <div className="page personal-edits">
      <div className="container">
        <header ref={headerRef} className="personal-edits__header reveal page-header">
          <h1 className="section-title">{t.personal.title}</h1>
          <p className="personal-edits__subtitle">{t.personal.subtitle}</p>
        </header>

        <div className="personal-edits__grid">
          {personalEdits.map((edit, index) => (
            <PersonalEditItem
              key={edit.id}
              edit={edit}
              onOpen={setActiveEdit}
              comingSoonLabel={t.personal.comingSoon}
            />
          ))}
        </div>
      </div>

      <VideoLightbox
        edit={activeEdit}
        onClose={() => setActiveEdit(null)}
        comingSoonLabel={t.personal.comingSoon}
      />

      <ContactSection />
    </div>
  );
}
