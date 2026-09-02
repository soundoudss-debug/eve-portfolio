import { useEffect, useMemo, useRef, useState } from "react";
import "./ReelSection.css";

/* =====================================================================
   REEL —— 底部「剪辑集锦」播放器
   - 视频：替换 public/videos/reel.mp4 即换成你上传的 edit 集锦
   - 章节节点：public/reel/chapters.json（改 t 秒数 + 标题即可调整节点；
     之后接入后端时把 CHAPTERS_URL 换成接口地址，返回 { chapters: [...] } 即可）
   - 时间以 <video> 元素为唯一事实来源，节点按 left = t/duration 绝对定位
   ===================================================================== */

const REEL_VIDEO = `${import.meta.env.BASE_URL}videos/reel.mp4`;
const CHAPTERS_URL = `${import.meta.env.BASE_URL}reel/chapters.json`;

const REEL_POSTER =
  "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" +
  encodeURIComponent(
    "professional video editing timeline interface on a monitor, stacked colorful edit clips and cut markers on tracks, dark charcoal interface with dusty pink accents, editing suite atmosphere, subtle film grain, no readable text"
  ) +
  "&image_size=landscape_16_9";

/* JSON 取不到时的兜底节点 */
const DEFAULT_CHAPTERS = [
  { t: 0.0, en: "Intro", zh: "开场" },
  { t: 8.5, en: "Fast Cuts", zh: "快剪" },
  { t: 18.0, en: "Transitions", zh: "转场" },
  { t: 27.5, en: "Color", zh: "调色" },
  { t: 38.0, en: "Finale", zh: "收尾" },
];

const copy = {
  en: {
    kicker: "Edit Reel — 2026",
    title: "Reel",
    chapters: "Clips",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    fullscreen: "Fullscreen",
    hint: "Click a node to jump to a clip",
  },
  zh: {
    kicker: "剪辑集锦 — 2026",
    title: "集锦",
    chapters: "片段节点",
    play: "播放",
    pause: "暂停",
    mute: "静音",
    unmute: "取消静音",
    fullscreen: "全屏",
    hint: "点击进度条上的节点，跳转到对应片段",
  },
};

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ReelSection({ lang }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const barRef = useRef(null);
  const draggingRef = useRef(false);

  const [chapters, setChapters] = useState(DEFAULT_CHAPTERS);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [tipIndex, setTipIndex] = useState(null);

  /* 加载章节数据（未来换成后端接口） */
  useEffect(() => {
    let alive = true;
    fetch(CHAPTERS_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("no chapters"))))
      .then((data) => {
        if (alive && Array.isArray(data?.chapters) && data.chapters.length) {
          setChapters(data.chapters);
        }
      })
      .catch(() => {
        /* 保留 DEFAULT_CHAPTERS */
      });
    return () => {
      alive = false;
    };
  }, []);

  /* 当前章节：以 video.currentTime 为准 */
  const activeIndex = useMemo(() => {
    let idx = 0;
    chapters.forEach((c, i) => {
      if (current + 0.08 >= c.t) idx = i;
    });
    return idx;
  }, [chapters, current]);

  const playedPct = duration ? (current / duration) * 100 : 0;

  const seekTo = (time) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    const t = Math.max(0, Math.min(time, v.duration));
    try {
      v.currentTime = t;
    } catch {
      return;
    }
    setCurrent(t);
  };

  const timeAtClientX = (clientX) => {
    const bar = barRef.current;
    const v = videoRef.current;
    if (!bar || !v || !v.duration) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return ratio * v.duration;
  };

  /* 进度条点击 + 拖拽 scrub */
  const handleBarPointerDown = (e) => {
    e.preventDefault();
    draggingRef.current = true;
    seekTo(timeAtClientX(e.clientX));
    const onMove = (ev) => {
      if (draggingRef.current) seekTo(timeAtClientX(ev.clientX));
    };
    const onUp = () => {
      draggingRef.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) {
      v.volume = 0.6;
      setVolume(0.6);
    }
    setMuted(v.muted);
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    const v = videoRef.current;
    if (!v) return;
    v.volume = val;
    v.muted = val === 0;
    setVolume(val);
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const L = copy[lang];

  return (
    <section className="reel" id="reel">
      <div className="reel__inner">
        <header className="reel__header">
          <p className="reel__kicker">{L.kicker}</p>
          <h2 className="reel__title">{L.title}</h2>
        </header>

        <div className="reel__frame" ref={frameRef}>
          <video
            ref={videoRef}
            className="reel__video"
            src={REEL_VIDEO}
            poster={REEL_POSTER}
            preload="metadata"
            playsInline
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
            onEnded={() => setPlaying(false)}
          />

          {/* 自定义控件：带章节节点的进度条 */}
          <div className="reel__controls">
            <div
              className="reel-bar"
              ref={barRef}
              onPointerDown={handleBarPointerDown}
              role="slider"
              aria-label="Reel progress"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(current)}
            >
              <div className="reel-bar__track" />
              <div
                className="reel-bar__played"
                style={{ width: `${playedPct}%` }}
              />

              {chapters.map((c, i) => {
                const left = duration ? (c.t / duration) * 100 : 0;
                return (
                  <button
                    key={i}
                    type="button"
                    className={[
                      "reel-bar__node",
                      i === activeIndex ? "is-active" : "",
                      i < activeIndex ? "is-past" : "",
                    ].join(" ")}
                    style={{ left: `${left}%` }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      seekTo(c.t);
                    }}
                    onMouseEnter={() => setTipIndex(i)}
                    onMouseLeave={() => setTipIndex(null)}
                    aria-label={`${formatTime(c.t)} — ${c[lang]}`}
                  >
                    <span className="reel-bar__dot" />
                  </button>
                );
              })}

              {tipIndex !== null && chapters[tipIndex] && (
                <span
                  className="reel-bar__tip"
                  style={{
                    left: `${duration ? (chapters[tipIndex].t / duration) * 100 : 0}%`,
                  }}
                >
                  {formatTime(chapters[tipIndex].t)} · {chapters[tipIndex][lang]}
                </span>
              )}
            </div>

            <div className="reel-controls__row">
              <button
                type="button"
                className="reel-btn"
                onClick={togglePlay}
                aria-label={playing ? L.pause : L.play}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                )}
              </button>

              <span className="reel-time">
                {formatTime(current)}
                <span className="reel-time__sep"> / </span>
                {formatTime(duration)}
              </span>

              <span className="reel-hint">{L.hint}</span>

              <div className="reel-controls__right">
                <button
                  type="button"
                  className="reel-btn"
                  onClick={toggleMute}
                  aria-label={muted ? L.unmute : L.mute}
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                      <path
                        d="M16 9l5 6M21 9l-5 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                      <path
                        d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  className="reel-volume"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                />
                <button
                  type="button"
                  className="reel-btn"
                  onClick={toggleFullscreen}
                  aria-label={L.fullscreen}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 章节列表：点击跳转 */}
        <div className="reel-chapters">
          <p className="reel-chapters__label">{L.chapters}</p>
          <div className="reel-chapters__list">
            {chapters.map((c, i) => (
              <button
                key={i}
                type="button"
                className={[
                  "reel-chip",
                  i === activeIndex ? "is-active" : "",
                  i < activeIndex ? "is-past" : "",
                ].join(" ")}
                onClick={() => seekTo(c.t)}
              >
                <span className="reel-chip__time">{formatTime(c.t)}</span>
                <span className="reel-chip__title">{c[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
