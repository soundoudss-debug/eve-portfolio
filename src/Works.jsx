import { useEffect, useRef, useState } from "react";
import "./Works.css";

/* =====================================================================
   作品数据集中定义：poster / src 只在这里维护一次
   视频交互逻辑与独立 Demo（VideoPreviewPage）完全一致，未重写、未复杂化
   ===================================================================== */
const projects = [
  {
    id: 1,
    num: "01",
    name: "Bloom",
    category: "Fashion Film",
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
    category: "Motion Design",
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
    category: "Game PV / VFX",
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
    category: "Editing / Visual",
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

export default function Works() {
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

  /* ==================== 页面结构：粉色编辑色块 → WORKS 标题 → 作品拼贴 ==================== */
  return (
    <main className="works-page">
      {/* ————— 粉色 EDITORIAL 色块（开场，独立视觉板块，非普通 banner） ————— */}
      <section className="pink-plate" aria-label="Editorial color plate">
        <div className="pink-plate__grain" aria-hidden="true" />
        <div className="pink-plate__halftone" aria-hidden="true" />

        <span className="pink-plate__meta pink-plate__meta--tl">
          Issue&nbsp;Nº01
        </span>
        <span className="pink-plate__meta pink-plate__meta--tr">
          Selected&nbsp;Works
        </span>

        <div className="pink-plate__center">
          <h1 className="pink-plate__script">Eve</h1>
          {/* 手绘环形笔触 */}
          <svg
            className="pink-plate__loop"
            viewBox="0 0 320 200"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M52 104 C 40 44, 148 22, 214 44 C 286 68, 300 140, 226 162 C 140 188, 58 168, 62 120"
              stroke="#2b2929"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="pink-plate__meta pink-plate__meta--bl">
          2026
        </span>
        <span className="pink-plate__meta pink-plate__meta--br">
          Motion&nbsp;/&nbsp;Video&nbsp;/&nbsp;Visual
        </span>
      </section>

      {/* ————— 炭灰 WORKS 区 ————— */}
      <section className="works">
        <div className="works__grain" aria-hidden="true" />

        {/* WORKS 标题：简洁三层字体角色 */}
        <header className="works__header">
          <p className="works__kicker">Selected&nbsp;Works&nbsp;—&nbsp;2026</p>
          <h2 className="works__title">WORKS</h2>
          {/* 手绘下划线笔触 */}
          <svg
            className="works__underline"
            viewBox="0 0 240 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 14 C 60 5, 120 18, 178 9 C 206 5, 226 9, 236 7"
              stroke="#e99aaf"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p className="works__sub">Motion&nbsp;/&nbsp;Video&nbsp;/&nbsp;Visual</p>
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
                    {p.year}&nbsp;—&nbsp;{p.category}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="works__foot">
          <span className="works__foot-text">More works coming soon</span>
          <span className="works__foot-star" aria-hidden="true">
            ✦
          </span>
        </footer>
      </section>
    </main>
  );
}
