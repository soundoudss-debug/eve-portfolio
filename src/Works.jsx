import { useEffect, useRef, useState } from "react";
import "./Works.css";

/* =====================================================================
   作品数据集中定义：poster / src 只在这里维护一次
   category 双语；视频交互逻辑与独立 Demo 完全一致，未重写
   ===================================================================== */
const projects = [
  {
    id: 1,
    num: "01",
    name: "Bloom",
    category: { en: "Fashion Film", zh: "时尚影像" },
    year: "2026",
    layout: "feature",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "high fashion editorial film still, a model in soft pink tulle against a charcoal studio backdrop, dramatic rim light, analog 35mm film grain, muted dusty pink and dark charcoal tones, magazine campaign, motion blur of fabric"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-01.mp4",
  },
  {
    id: 2,
    num: "02",
    name: "Drift",
    category: { en: "Motion Design", zh: "动态设计" },
    year: "2025",
    layout: "portrait-a",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "abstract motion design still, flowing liquid metallic forms and light trails on a dark charcoal background, soft dusty pink highlights, experimental typographic energy, cinematic, grainy"
      ) +
      "&image_size=portrait_4_3",
    src: "/videos/video-02.mp4",
  },
  {
    id: 3,
    num: "03",
    name: "Ember",
    category: { en: "Game PV / VFX", zh: "游戏PV / 特效" },
    year: "2025",
    layout: "portrait-b",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "cinematic game trailer vfx still, glowing pink embers and energy sparks in a dark charcoal void, volumetric light, high contrast, dramatic action mood, film grain, no text"
      ) +
      "&image_size=portrait_4_3",
    src: "/videos/video-03.mp4",
  },
  {
    id: 4,
    num: "04",
    name: "Pulse",
    category: { en: "Editing / Visual", zh: "剪辑 / 视觉" },
    year: "2024",
    layout: "wide",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "wide cinematic film editing montage still, overlapping analog film strips and light leaks on warm paper and dusty pink, charcoal shadows, experimental magazine collage feel, grain texture, letterbox mood"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-04.mp4",
  },
];

/* ==================== 中英文案 ==================== */
const t = {
  en: {
    navWork: "Work",
    navContact: "Contact",
    resume: "Resume",
    kicker: "Selected Works — 2026",
    sub: "Motion / Video / Visual",
    footer: "More works coming soon",
    close: "Close",
    resumeTitle: "Résumé",
    resumeRole: "Video Editor & Motion Designer",
    resumeFocus: "Fashion film · Motion graphics · Post-production",
    expertiseLabel: "Expertise",
    experienceLabel: "Experience",
    resumeContact: "Contact",
    contactTitle: "Contact",
    contactHead: "Let’s make something",
    contactLine:
      "Open for collaborations, freelance & commissions.",
    contactLocation: "Shanghai — Remote worldwide",
  },
  zh: {
    navWork: "作品",
    navContact: "联系",
    resume: "简历",
    kicker: "精选作品 — 2026",
    sub: "动态 / 影像 / 视觉",
    footer: "更多作品 即将更新",
    close: "关闭",
    resumeTitle: "简历",
    resumeRole: "视频剪辑 · 动态设计师",
    resumeFocus: "时尚影像 · 动态图形 · 后期制作",
    expertiseLabel: "擅长领域",
    experienceLabel: "经历",
    resumeContact: "联系方式",
    contactTitle: "联系",
    contactHead: "一起创作吧",
    contactLine: "欢迎洽谈合作 / 自由职业 / 委托项目。",
    contactLocation: "上海 — 可远程协作",
  },
};

/* 简历内容：占位信息，可直接替换为真实经历 */
const CONTACT_EMAIL = "hello@eve.studio"; // TODO: 替换为真实邮箱
const resumeData = {
  en: {
    expertise: [
      "Video Editing",
      "Motion Design",
      "Color Grading",
      "VFX & Compositing",
      "Sound Design",
    ],
    experience: [
      {
        time: "2024 — Now",
        title: "Freelance Motion Designer",
        org: "MCN · Brand campaigns",
        desc: "Short-form edits, title sequences and campaign promos.",
      },
      {
        time: "2023 — 2024",
        title: "Video Editor",
        org: "Game PV · Social content",
        desc: "Game trailers and social-first video production.",
      },
      {
        time: "2022 — 2023",
        title: "Junior Editor",
        org: "Production Studio",
        desc: "Footage assembly, sync and finishing.",
      },
    ],
  },
  zh: {
    expertise: ["视频剪辑", "动态设计", "调色", "特效合成", "声音设计"],
    experience: [
      {
        time: "2024 — 至今",
        title: "自由职业动态设计师",
        org: "MCN · 品牌广告",
        desc: "短视频剪辑、片头设计与品牌宣传物料。",
      },
      {
        time: "2023 — 2024",
        title: "视频剪辑师",
        org: "游戏PV · 社交媒体内容",
        desc: "游戏预告片与社媒优先的视频制作。",
      },
      {
        time: "2022 — 2023",
        title: "剪辑助理",
        org: "制作工作室",
        desc: "素材整理、对位与成片收尾。",
      },
    ],
  },
};

export default function Works() {
  /* ==================== 语言 / 弹窗 ==================== */
  const [lang, setLang] = useState("en");
  const [modal, setModal] = useState(null); // 'resume' | 'contact' | null
  const tr = t[lang];
  const rd = resumeData[lang];

  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  /* ==================== 视频引擎（与独立 Demo 逐字一致，不改动） ==================== */
  const [hoveredId, setHoveredId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef(new Map());

  const stopVideo = (id) => {
    const video = videoRefs.current.get(id);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  // 鼠标进入：停止其他视频 → 当前视频从头播放（playing 状态由 onPlaying 决定）
  const handleMouseEnter = (id) => {
    setHoveredId(id);

    videoRefs.current.forEach((otherVideo, otherId) => {
      if (otherId !== id) {
        otherVideo.pause();
        otherVideo.currentTime = 0;
      }
    });

    const video = videoRefs.current.get(id);
    if (!video) return;

    try {
      video.currentTime = 0;
    } catch {
      // 尚未 ready 时设置 currentTime 可能抛错，忽略
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch((error) => {
        // 浏览器拒绝 autoplay 或播放失败：不设置 playingId，poster 继续显示
        console.error("Video autoplay rejected:", error);
      });
    }
    // 绝不在此处 setPlayingId —— 必须等 onPlaying 真正触发
  };

  // 鼠标离开：pause + currentTime 归零 + 恢复 poster + 隐藏 controls
  const handleMouseLeave = (id) => {
    stopVideo(id);
    setHoveredId((prev) => (prev === id ? null : prev));
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  // 真正进入 playing：当前 video 淡入覆盖 poster
  const handlePlaying = (id) => {
    setPlayingId(id);
  };

  // 加载失败：恢复 poster
  const handleError = (id) => {
    const video = videoRefs.current.get(id);
    if (video) video.pause();
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  // 播放结束兜底：currentTime 归零 + 恢复 poster
  const handleEnded = (id) => {
    stopVideo(id);
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  useEffect(() => {
    return () => {
      videoRefs.current.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      videoRefs.current.clear();
    };
  }, []);

  return (
    <main className="works-page" id="top">
      {/* ————— NAV（暖纸底：eve 左 / Work·Contact 中 / 2026 + EN中 右） ————— */}
      <nav className="nav" aria-label="Primary">
        <a className="nav__logo" href="#top">
          eve
        </a>

        <div className="nav__links">
          <a href="#works">{tr.navWork}</a>
          <button
            type="button"
            className="nav__link-btn"
            onClick={() => setModal("contact")}
          >
            {tr.navContact}
          </button>
        </div>

        <div className="nav__right">
          <span className="nav__year">2026</span>
          <div className="nav__lang" aria-label="Language switch">
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <span className="nav__lang-sep" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className={lang === "zh" ? "is-active" : ""}
              onClick={() => setLang("zh")}
            >
              中
            </button>
          </div>
        </div>
      </nav>

      {/* ————— 粉色窄条：居中 RESUME / 简历（点击打开简历弹窗） ————— */}
      <section className="resume-strip" aria-label="Resume">
        <div className="resume-strip__halftone" aria-hidden="true" />
        <button
          type="button"
          className="resume-strip__btn"
          onClick={() => setModal("resume")}
        >
          <span className="resume-strip__btn-text">{tr.resume}</span>
          <span className="resume-strip__underline" aria-hidden="true" />
        </button>
      </section>

      {/* ————— 炭灰 WORKS 区 ————— */}
      <section className="works" id="works">
        <div className="works__grain" aria-hidden="true" />

        <header className="works__header">
          <p className="works__kicker">{tr.kicker}</p>
          <h2 className="works__title">WORKS</h2>
          <p className="works__sub">{tr.sub}</p>
        </header>

        {/* 作品拼贴：不对称 12 栏，横竖混排 */}
        <div className="works__grid">
          {projects.map((p) => {
            const isHovered = hoveredId === p.id;
            const isPlaying = playingId === p.id;

            return (
              <article
                key={p.id}
                className={`work work--${p.layout}${
                  isHovered ? " is-hovered" : ""
                }${isPlaying ? " is-playing" : ""}`}
                onMouseEnter={() => handleMouseEnter(p.id)}
                onMouseLeave={() => handleMouseLeave(p.id)}
              >
                <div className="work__media">
                  {/* 静态封面：常驻 DOM，z-index:1，永远是 fallback */}
                  <img
                    src={p.poster}
                    alt={p.name}
                    className="work__poster"
                    loading="lazy"
                  />
                  {/* 视频：常驻 DOM，z-index:2，仅通过 opacity 控制 */}
                  <video
                    ref={(element) => {
                      if (element) {
                        videoRefs.current.set(p.id, element);
                      } else {
                        videoRefs.current.delete(p.id);
                      }
                    }}
                    className="work__video"
                    src={p.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={isHovered}
                    onPlaying={() => handlePlaying(p.id)}
                    onError={() => handleError(p.id)}
                    onEnded={() => handleEnded(p.id)}
                  />
                </div>

                {/* 极小 editorial metadata：编号 / 名称 / 年份·类别 */}
                <div className="work__meta">
                  <span className="work__num">{p.num}</span>
                  <span className="work__name">{p.name}</span>
                  <span className="work__detail">
                    {p.year}&nbsp;—&nbsp;{p.category[lang]}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="works__foot">
          <span className="works__foot-text">{tr.footer}</span>
          <span className="works__foot-star" aria-hidden="true">
            ✦
          </span>
        </footer>
      </section>

      {/* ————— 简历弹窗 ————— */}
      {modal === "resume" && (
        <div
          className="modal-overlay"
          onClick={() => setModal(null)}
          role="presentation"
        >
          <div
            className="modal modal--resume"
            role="dialog"
            aria-modal="true"
            aria-label={tr.resumeTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setModal(null)}
            >
              {tr.close} ✕
            </button>

            <p className="modal__kicker">{tr.resumeTitle}</p>
            <h3 className="modal__script">eve</h3>
            <p className="modal__role">{tr.resumeRole}</p>
            <p className="modal__focus">{tr.resumeFocus}</p>

            <div className="modal__section">
              <h4 className="modal__label">{tr.expertiseLabel}</h4>
              <ul className="modal__chips">
                {rd.expertise.map((item) => (
                  <li key={item} className="modal__chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal__section">
              <h4 className="modal__label">{tr.experienceLabel}</h4>
              <ul className="modal__timeline">
                {rd.experience.map((job) => (
                  <li key={job.time} className="modal__job">
                    <span className="modal__job-time">{job.time}</span>
                    <div className="modal__job-body">
                      <span className="modal__job-title">{job.title}</span>
                      <span className="modal__job-org">{job.org}</span>
                      <span className="modal__job-desc">{job.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal__section modal__section--contact">
              <a className="modal__email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ————— 联系弹窗 ————— */}
      {modal === "contact" && (
        <div
          className="modal-overlay"
          onClick={() => setModal(null)}
          role="presentation"
        >
          <div
            className="modal modal--contact"
            role="dialog"
            aria-modal="true"
            aria-label={tr.contactTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setModal(null)}
            >
              {tr.close} ✕
            </button>

            <p className="modal__kicker">{tr.contactTitle}</p>
            <h3 className="modal__head-serif">{tr.contactHead}</h3>
            <p className="modal__line">{tr.contactLine}</p>
            <a className="modal__email modal__email--big" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <p className="modal__location">{tr.contactLocation}</p>
          </div>
        </div>
      )}
    </main>
  );
}
