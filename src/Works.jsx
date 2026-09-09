import { useEffect, useRef, useState } from "react";
import "./Works.css";
import ReelSection from "./ReelSection.jsx";

/* =====================================================================
   作品数据集中定义：poster / src 只在这里维护一次
   title / tags 双语；视频交互逻辑与独立 Demo 完全一致，未重写
   分类：game 游戏PV / brand 品牌商业 / newmedia 新媒体内容 / reel 风格速览
   ===================================================================== */
const sections = [
  {
    id: "game",
    title: { en: "Game PV", zh: "游戏PV" },
    works: [
      {
        id: 1,
        title: {
          en: "VALORANT · Kuronami collection PV Re-edit",
          zh: "无畏契约 · 塑水宗系列皮肤 PV 再创作",
        },
        tags: {
          en: "Game Promo | PR + AE | Shot restructuring · Beat sync · Visual packaging",
          zh: "游戏宣传向 | PR + AE | 镜头重组 · 节奏卡点 · 视觉包装",
        },
        year: "2026",
        poster:
          "/covers/valorant.jpe",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945989/video-02.mp4",
      },
      {
        id: 2,
        title: {
          en: "PinkPantheress · Illegal Motion Visual",
          zh: "PinkPantheress · Illegal 动效视觉",
        },
        tags: {
          en: "Music Visual / Mograph | AE | 3D camera · Kinetic type · Retro visual · Motion Design",
          zh: "Music Visual / Mograph | AE | 3D运镜 · 动态排版 · 复古视觉 · Motion Design",
        },
        year: "2026",
        poster:
          "/covers/pp.jpg",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945987/video-04.mp4",
      },
    ],
  },
  {
    id: "brand",
    title: { en: "Brand & Commercial", zh: "品牌商业" },
    works: [
      {
        id: 3,
        title: {
          en: "Vivienne Westwood Bridal 2022 Fashion Promo",
          zh: "Vivienne Westwood Bridal 2022 时尚宣传片",
        },
        tags: {
          en: "Fashion Commercial | PR + AE | Music cut · Rhythm design · Stylized visual · Mood",
          zh: "时尚商业向 | PR + AE | 音乐剪辑 · 节奏设计 · 风格化视觉 · 氛围塑造",
        },
        year: "2026",
        poster:
          "/covers/vv.png",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945965/video-01.mp4",
      },
      {
        id: 4,
        title: {
          en: "Notta AI Product Concept Promo",
          zh: "Notta AI 产品概念宣传片(制作中...)",
        },
        tags: {
          en: "SaaS / Brand Commercial | PR + AE + AI | Ad concept · Live-action comp · Motion design · Product visual",
          zh: "SaaS / 品牌商业向 | PR + AE + AI | 广告策划 · 实景合成 · 动效设计 · 产品视觉",
        },
        year: "2026",
        poster:
          "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
          encodeURIComponent(
            "modern SaaS product commercial film still, AI transcription software interface floating above a clean desk, soft natural light, dusty pink and charcoal tech aesthetic, premium brand advertising mood, cinematic, subtle film grain, no readable text"
          ) +
          "&image_size=landscape_16_9",
        src: "/videos/video-05.mp4",
      },
    ],
  },
  {
    id: "newmedia",
    title: { en: "New Media", zh: "新媒体内容" },
    works: [
      {
        id: 5,
        title: {
          en: "Art Deco English Educational Visual",
          zh: "Art Deco 英文科普视觉",
        },
        tags: {
          en: "Knowledge / New Media | CapCut | Info visualization · Dynamic subtitles · AI-assisted · Rhythm cut",
          zh: "知识类内容 / 新媒体向 | CapCut | 信息可视化 · 动态字幕 · AI辅助 · 节奏剪辑",
        },
        year: "2026",
        poster:
          "/covers/artdeco.jpe",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945980/video-06.mp4",
      },
      {
        id: 6,
        title: {
          en: "Solar System Educational Video",
          zh: "Solar System 太阳系科普视频",
        },
        tags: {
          en: "New Media Content | PR + CapCut | Info integration · Visual storytelling · Dynamic packaging · Long-form cut",
          zh: "新媒体内容向 | PR + CapCut | 信息整合 · 视觉叙事 · 动态包装 · 长视频剪辑",
        },
        year: "2026",
        poster:
          "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
          encodeURIComponent(
            "cinematic solar system educational film still, planets aligned in deep charcoal space, soft dusty pink glowing sun and nebula clouds, stars, clean documentary aesthetic, subtle film grain, no text"
          ) +
          "&image_size=landscape_16_9",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945995/video-07.mp4",
      },
      {
        id: 7,
        title: {
          en: "fashion Vlog Design",
          zh: "Vlog 开头设计",
        },
        tags: {
          en: "Vlog / Self-media | CapCut | Opening design · Rhythm cut · Fashion visual · Content packaging",
          zh: "Vlog / 自媒体向 | CapCut | 开场设计 · 节奏剪辑 · 时尚视觉 · 内容包装",
        },
        year: "2026",
        poster:
          "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
          encodeURIComponent(
            "korean lifestyle vlog opening still, soft pastel korean aesthetic, young woman in cozy cafe with camera, warm natural light, dusty pink and cream tones, trendy vlog visual mood, analog film grain, no text"
          ) +
          "&image_size=landscape_16_9",
        src: "https://res.cloudinary.com/jzfj58ji/video/upload/v1788945977/video-03.mp4",
      },
    ],
  },
];

/* 第 4 个分类「风格速览」由底部 ReelSection 承载 */
const reelLabel = {
  en: "Style Reel",
  zh: "风格速览",
};

/* ==================== 联系方式（替换为真实信息） ==================== */
const LINKEDIN_URL = "https://www.linkedin.com/in/your-profile"; // TODO: 替换为真实领英主页
const WECHAT_ID = "your-wechat-id"; // TODO: 替换为真实微信号
// 简历 PDF：把文件命名为 resume.pdf 放到 public/ 目录后，
// 把简历弹窗里的占位区替换为 <iframe src="/resume.pdf" /> 或下载链接即可
// const RESUME_PDF = "/resume.pdf";

/* ==================== 中英文案 ==================== */
const t = {
  en: {
    navWork: "Work",
    navContact: "Contact",
    resume: "Resume",
    footer: "More works coming soon",
    close: "Close",
    resumeTitle: "Résumé",
    resumePdfNote: "Résumé PDF — coming soon",
    contactTitle: "Contact",
    contactLocation: "Remote worldwide",
  },
  zh: {
    navWork: "作品",
    navContact: "联系",
    resume: "简历",
    footer: "更多作品 即将更新",
    close: "关闭",
    resumeTitle: "简历",
    resumePdfNote: "简历 PDF 即将上传",
    contactTitle: "联系",
    contactLocation: "可远程协作",
  },
};

export default function Works() {
  /* ==================== 语言 / 弹窗 ==================== */
  const [lang, setLang] = useState("zh");
  const [modal, setModal] = useState(null); // 'resume' | 'contact' | null
  const tr = t[lang];

  /* ==================== 分类导航：滚动高亮 + 吸顶 ==================== */
  const [activeCat, setActiveCat] = useState("game");
  const sectionIds = ["game", "brand", "newmedia", "reel"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 取当前最靠近视口顶部且可见的 section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveCat(visible[0].target.dataset.cat);
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = id === "reel" ? document.getElementById("reel") : document.getElementById(`sec-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* 首屏自动停在「游戏PV」区块顶部（仅一次） */
  const scrolledRef = useRef(false);
  useEffect(() => {
    if (scrolledRef.current) return;
    const el = document.getElementById("sec-game");
    if (el) {
      scrolledRef.current = true;
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  const scrollToCat = (id) => {
    const el = id === "reel" ? document.getElementById("reel") : document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    try {
      video.pause();
    } catch {
      // 忽略 pause 异常
    }
    try {
      // readyState 不足或加载被中止时赋值可能抛错，忽略后 poster 仍会恢复
      video.currentTime = 0;
    } catch {
      // 忽略：未 ready 时无需重置进度
    }
  };

  // 鼠标进入：停止其他视频 → 当前视频从头播放（playing 状态由 onPlaying 决定）
  const handleMouseEnter = (id) => {
    setHoveredId(id);

    videoRefs.current.forEach((_otherVideo, otherId) => {
      if (otherId !== id) {
        stopVideo(otherId);
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
        // AbortError：快速切换时 play() 被随后的 pause() 中断，属正常行为；
        // 其他失败也由 onError 恢复 poster，无需向控制台输出
        if (error?.name !== "AbortError") {
          // 静默失败：poster 常驻，永远是 fallback
        }
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

  const renderWork = (p) => {
    const isHovered = hoveredId === p.id;
    const isPlaying = playingId === p.id;
    return (
      <article
        key={p.id}
        className={`work${isHovered ? " is-hovered" : ""}${isPlaying ? " is-playing" : ""}`}
        onMouseEnter={() => handleMouseEnter(p.id)}
        onMouseLeave={() => handleMouseLeave(p.id)}
      >
        <div className="work__media">
          {/* 静态封面：常驻 DOM，z-index:1，永远是 fallback */}
          <img
            src={p.poster}
            alt={p.title.en}
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

        {/* 标题（1行） + 能力标签（1行） */}
        <div className="work__meta">
          <span className="work__name">{p.title[lang]}</span>
          <span className="work__tags">{p.tags[lang]}</span>
        </div>
      </article>
    );
  };

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
          <h2 className="works__title">WORKS</h2>
        </header>

        {/* 分类导航：吸顶，滚动高亮，点击平滑跳转 */}
        <div className="works-catnav" role="tablist" aria-label="Works categories">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeCat === s.id}
              className={`works-catnav__btn ${activeCat === s.id ? "is-active" : ""}`}
              onClick={() => scrollToCat(s.id)}
            >
              {s.title[lang]}
            </button>
          ))}
          <button
            type="button"
            role="tab"
            aria-selected={activeCat === "reel"}
            className={`works-catnav__btn ${activeCat === "reel" ? "is-active" : ""}`}
            onClick={() => scrollToCat("reel")}
          >
            {reelLabel[lang]}
          </button>
        </div>

        {/* 作品分区：单列大尺寸 */}
        {sections.map((s) => (
          <section key={s.id} id={`sec-${s.id}`} data-cat={s.id} className="works-section">
            <h3 className="works-section__title">
              <span className="works-section__index">{s.title.en}</span>
              {s.title[lang]}
            </h3>
            <div className="works-section__list">{s.works.map(renderWork)}</div>
          </section>
        ))}

        <footer className="works__foot">
          <span className="works__foot-text">{tr.footer}</span>
          <span className="works__foot-star" aria-hidden="true">
            ✦
          </span>
        </footer>
      </section>

      {/* ————— 底部剪辑集锦播放器（章节节点进度条）——— 第 4 分类「风格速览」 ————— */}
      <ReelSection lang={lang} />

      {/* ————— 简历弹窗：PDF 占位区（上传 resume.pdf 后替换） ————— */}
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

            {/* PDF 上传占位区：把 resume.pdf 放进 public/ 后，
                可将下方区块替换为 <iframe src="/resume.pdf" title="resume" /> */}
            <div className="modal__pdf-slot">
              <span className="modal__pdf-tag">PDF</span>
              <p className="modal__pdf-note">{tr.resumePdfNote}</p>
            </div>
          </div>
        </div>
      )}

    {/* ————— 联系弹窗：领英 + 微信 + 可远程协作 ————— */}
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

      <div className="contact-rows">
        <a
          className="contact-row"
          href="https://www.linkedin.com/in/evy-s-30a204433"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-row__label">LinkedIn</span>
          <span className="contact-row__value">↗</span>
        </a>

        <div className="contact-row">
          <span className="contact-row__label">WeChat</span>
          <span className="contact-row__value contact-row__value--mono">
            sangchokuu
          </span>
        </div>
      </div>

      <p className="modal__location">{tr.contactLocation}</p>
    </div>
  </div>
)}
</main>
);
}
