import './Hero.css';

/**
 * Hero — 极简单层纸面海报灰底
 *
 * 本次修改（用户指令）：
 *   · 删除 loaded state 与 hero--loaded 动画（不需要载入淡入）
 *   · Hero 与 Works 之间的粉色 editorial strip 作为视觉分节过渡（独立组件 WorksPinkStrip，不在这里）
 *   · 保留：灰 paper 质感（grain + halftone）、中央底部 SCROLL 指示
 */
export default function Hero() {
  return (
    <section className="hero">
      {/* 纸面噪点 + 半色网点（保留海报质感） */}
      <div className="hero__paper-grain" aria-hidden="true" />
      <div className="hero__halftone" aria-hidden="true" />

      {/* SCROLL 中央底部指示 */}
      <div className="hero__scroll">
        <span className="hero__scroll-label">SCROLL</span>
        <div className="hero__scroll-line" aria-hidden="true">
          <svg viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
