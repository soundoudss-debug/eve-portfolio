import WorksPinkStrip from '../components/WorksPinkStrip';
import WorksSection from '../components/WorksSection';
import ContactSection from '../components/ContactSection';

/**
 * Home 首页（§13：已完全删除作品点击浮窗功能）
 *
 *   删除：
 *     · useState(lightboxProject)
 *     · handleProjectClick / handleCloseLightbox
 *     · import VideoLightbox 与 JSX 中的 <VideoLightbox ... /> 挂载
 *     · WorksSection onProjectClick prop 传递
 *
 *   保留：
 *     · Hero 已经在前面几轮移走；首页从 Nav 直接衔接 WorksPinkStrip
 *     · WorksSection（里面现在只挂 hover preview 交互，无点击弹窗）
 *     · ContactSection（用户明确禁止改动）
 */
export default function Home() {
  return (
    <>
      {/* ============= 独立 PINK EDITORIAL BLOCK（nav 底下无缝对齐） ============= */}
      <WorksPinkStrip />

      {/* ============= WORKS HEADER + PROJECTS（保持 #works 锚点不变） ============= */}
      <WorksSection />

      {/* ============= CONTACT（用户明确禁止改动） ============= */}
      <ContactSection />
    </>
  );
}
