import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectCard from './ProjectCard';
import { projects, ROLE_MODES, normalizeRole, sortProjectsByRole } from '../data/projects';
import './WorksSection.css';

const ROLE_OPTIONS = [
  { value: ROLE_MODES.DEFAULT,    labelKey: 'default' },
  { value: ROLE_MODES.GAME,       labelKey: 'game' },
  { value: ROLE_MODES.COMMERCIAL, labelKey: 'commercial' },
  { value: ROLE_MODES.MCN,        labelKey: 'mcn' },
];

/**
 * WorksSection — 极简杂志感 Works 章节
 *
 * 严格按用户规格 "LESS TEXT / LESS DECORATION / MORE NEGATIVE SPACE" 重构：
 *
 *   WORKS HEADER   →   WORKS (大 · editorial font 唯一视觉主字)
 *                       SELECTED MOTION / VISUAL WORKS  (一行 condensed 小字)
 *                       01 — 06   (右上 micro meta)
 *                   →   大量留白
 *
 *   ROLE SELECTOR  →   维持原有按钮（数据切换需要，保留）
 *
 *   PROJECTS       →   保留原 editorial collage 布局（不规则尺寸/横纵混排）
 *
 * 用户 §10 禁止项：
 *   - 粉色块已移到外层独立组件 WorksPinkStrip → 此处完全没有粉色块
 *   - 删除所有装饰：works__pink-panel / big-script / micro-text 1~3 / stars / hand-line
 *   - 不引入新渐变、不添加新 doodle，不增加大量 script 字体
 */
export default function WorksSection({ onProjectClick }) {
  const { t, lang } = useLanguage();
  const titleRef = useScrollReveal();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionRef = useRef(null);

  const currentRole = useMemo(() => {
    const roleParam = searchParams.get('role');
    return normalizeRole(roleParam);
  }, [searchParams]);

  const sortedProjects = useMemo(() => {
    return sortProjectsByRole(projects, currentRole);
  }, [currentRole]);

  const handleRoleChange = (newRole) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newRole === ROLE_MODES.DEFAULT) nextParams.delete('role');
    else nextParams.set('role', newRole.toLowerCase());
    setSearchParams(nextParams, { replace: true });
  };

  const handleProjectClick = (project) => {
    if (onProjectClick) onProjectClick(project);
  };

  return (
    <section id="works" className="works" ref={sectionRef}>
      {/* 保留轻量纸面质感：grain + 扫描线（不抢视觉，只是 paper 背景） */}
      <div className="works__grain" aria-hidden="true" />
      <div className="works__scanlines" aria-hidden="true" />

      {/* ========== 极简 WORKS HEADER ==========
          用户指令：
           · 01 — 06（micro meta）已删除
           · SELECTED MOTION / VISUAL WORKS 行已删除
           · 只保留 WORKS 主字（唯一视觉主字）
      */}
      <header className="works__header">
        <div ref={titleRef} className="works__title-wrap">
          {/* 唯一视觉主字：WORKS */}
          <h2 className="works__title-editorial">WORKS</h2>
        </div>
      </header>

      {/* Role selector（保留：业务功能需要） */}
      <div className="works__role-selector" role="tablist" aria-label="Portfolio version">
        <div className="works__role-buttons">
          {ROLE_OPTIONS.map((option) => {
            const isActive = currentRole === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                className={`works__role-btn ${isActive ? 'works__role-btn--active' : ''}`}
                onClick={() => handleRoleChange(option.value)}
              >
                {t.works.roles[option.labelKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects collage（保留不规则尺寸、横纵混排——规格 §8） */}
      <div className="works__layout">
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            layoutIndex={index % 6}
            onClick={() => handleProjectClick(project)}
            previewVideoSrc={project.video}
          />
        ))}
      </div>

      {/* Footer：仅保留 "more coming soon" 一个字 + 一个小星（规格 §10 允许的 micro meta） */}
      <div className="works__footer">
        <span className="works__footer-text">
          {lang === 'en' ? 'more coming soon' : '更多作品 即将更新'}
        </span>
        <span className="works__footer-star">✦</span>
      </div>
    </section>
  );
}
