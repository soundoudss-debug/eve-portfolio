import { useState } from 'react';
import WorksPinkStrip from '../components/WorksPinkStrip';
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
      {/* ============= 独立 PINK EDITORIAL BLOCK（nav 底下无缝对齐） ============= */}
      <WorksPinkStrip />

      {/* ============= WORKS HEADER + PROJECTS（保持 #works 锚点不变） ============= */}
      <WorksSection onProjectClick={handleProjectClick} />

      {/* ============= CONTACT（用户明确禁止改动） ============= */}
      <ContactSection />

      <VideoLightbox project={lightboxProject} onClose={handleCloseLightbox} />
    </>
  );
}
