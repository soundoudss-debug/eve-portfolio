import { useEffect, useRef, useState } from "react";
import "./Works.css";
import ReelSection from "./ReelSection.jsx";

/* =====================================================================
   作品数据集中定义：poster / src 只在这里维护一次
   name / tagline 双语；视频交互逻辑与独立 Demo 完全一致，未重写
   ===================================================================== */
const projects = [
  {
    id: 1,
    num: "01",
    name: { en: "Fashion Film", zh: "时尚影像" },
    tagline: {
      en: "Fashion film re-edit & visual packaging",
      zh: "时尚影片重剪与视觉包装",
    },
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
    name: { en: "Game CG PV", zh: "游戏 CG 宣传片" },
    tagline: {
      en: "Game CG re-edit & promotional video",
      zh: "游戏 CG 重剪与宣传短片",
    },
    year: "2026",
    layout: "side-a",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "cinematic game CG promotional trailer still, epic stylized game character with glowing dusty pink magical energy, dark charcoal fantasy environment, volumetric light, high-end game cinematics render, film grain, no text no logo"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-02.mp4",
  },
  {
    id: 3,
    num: "03",
    name: { en: "Vlog", zh: "生活 Vlog" },
    tagline: {
      en: "Lifestyle vlog & visual storytelling",
      zh: "生活方式 Vlog 与视觉叙事",
    },
    year: "2026",
    layout: "side-b",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "lifestyle vlog film still, young creator holding a small camera on a sunlit cafe street, candid warm documentary moment, soft golden light, dusty pink and warm cream tones, analog film grain, storytelling mood, no text"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-03.mp4",
  },
  {
    id: 4,
    num: "04",
    name: { en: "Music Visual / Mograph", zh: "音乐视觉 / 动态图形" },
    tagline: {
      en: "Motion graphics, typography & visual composition",
      zh: "动态图形、字体排版与视觉构成",
    },
    year: "2026",
    layout: "wide",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "motion graphics still frame, kinetic typography and abstract geometric shapes in motion, dusty pink forms on dark charcoal background, bold editorial graphic composition, music visual energy, film grain, no readable text"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-04.mp4",
  },
  {
    id: 5,
    num: "05",
    name: { en: "Music Visual / Mograph", zh: "音乐视觉 / 动态图形" },
    tagline: {
      en: "Motion graphics, typography & visual composition",
      zh: "动态图形、字体排版与视觉构成",
    },
    year: "2026",
    layout: "wide-b",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "motion design still frame, glossy 3D chrome and glass abstract shapes floating, soft dusty pink lighting on dark charcoal, typographic composition fragments, premium mograph aesthetic, subtle film grain, no readable text"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-05.mp4",
  },
  {
    id: 6,
    num: "06",
    name: { en: "Art & Movement", zh: "艺术与律动" },
    tagline: {
      en: "Educational short film & motion design",
      zh: "科普短片与动态设计",
    },
    year: "2026",
    layout: "side-c",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "educational short film still, dancer in flowing movement captured with graceful motion blur, art studio with warm light, dusty pink fabric trails, charcoal shadows, cinematic motion design mood, analog film grain, no text"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-06.mp4",
  },
  {
    id: 7,
    num: "07",
    name: { en: "Solar System", zh: "太阳系" },
    tagline: {
      en: "Educational video & visual packaging",
      zh: "科普视频与视觉包装",
    },
    year: "2026",
    layout: "finale",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
      encodeURIComponent(
        "cinematic solar system educational film still, planets aligned in deep charcoal space, soft dusty pink glowing sun and nebula clouds, stars, clean documentary aesthetic, subtle film grain, no text"
      ) +
      "&image_size=landscape_16_9",
    src: "/videos/video-07.mp4",
  },
];

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
  const [lang, setLang] = useState("en");
  const [modal, setModal] = useState(null); // 'resume' | 'contact' | null
  const tr = t[lang];

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
          <h2 className="works__title">WORKS</h2>
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
                    alt={p.name.en}
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
                  <span className="work__name">{p.name[lang]}</span>
                  <span className="work__detail">
                    {p.year}&nbsp;—&nbsp;{p.tagline[lang]}
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

      {/* ————— 底部剪辑集锦播放器（章节节点进度条） ————— */}
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
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-row__label">LinkedIn</span>
                <span className="contact-row__value">↗</span>
              </a>
              <div className="contact-row">
                <span className="contact-row__label">WeChat</span>
                <span className="contact-row__value contact-row__value--mono">
                  {WECHAT_ID}
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
