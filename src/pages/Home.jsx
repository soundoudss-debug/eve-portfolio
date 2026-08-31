import { useState } from 'react';
import Hero from '../components/Hero';
import WorksSection from '../components/WorksSection';
import ContactSection from '../components/ContactSection';
import VideoLightbox from '../components/VideoLightbox';

export default function Home() {
  const [lightboxProject, setLightboxProject] = useState(null);

  const handleProjectClick = (project) => {
    setLightboxProject(project);
  };

  const handleCloseLightbox = () => {
    setLightboxProject(null);
  };

  return (
    <>
      <Hero />
      <WorksSection onProjectClick={handleProjectClick} />
      <ContactSection />
      <VideoLightbox project={lightboxProject} onClose={handleCloseLightbox} />
    </>
  );
}
