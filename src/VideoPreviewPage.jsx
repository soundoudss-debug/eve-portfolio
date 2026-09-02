import { useEffect, useRef, useState } from "react";
import "./VideoPreviewPage.css";

// 视频数据集中定义：poster + src 只在这里维护一次，不在 JSX 多处硬编码
const videos = [
  {
    id: 1,
    title: "Project 01",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20film%20still%20of%20a%20cartoon%20rabbit%20character%20in%20a%20sunny%20forest%20meadow%2C%20soft%20cinematic%20lighting&image_size=landscape_16_9",
    src: "/videos/video-01.mp4",
  },
  {
    id: 2,
    title: "Project 02",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20film%20still%20of%20surreal%20fantasy%20landscape%20with%20strange%20floating%20structures%20at%20dusk&image_size=landscape_16_9",
    src: "/videos/video-02.mp4",
  },
  {
    id: 3,
    title: "Project 03",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20film%20still%20of%20glowing%20fire%20embers%20and%20sparks%20against%20a%20dark%20background&image_size=landscape_16_9",
    src: "/videos/video-03.mp4",
  },
  {
    id: 4,
    title: "Project 04",
    poster:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20film%20still%20of%20colorful%20abstract%20liquid%20ink%20swirls%20with%20vibrant%20tones&image_size=landscape_16_9",
    src: "/videos/video-04.mp4",
  },
];

export default function VideoPreviewPage() {
  // 只允许存在简单状态：当前鼠标悬停的卡片 / 当前真正开始播放的卡片
  const [hoveredId, setHoveredId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  // 所有 video DOM 用 ref 集中管理
  const videoRefs = useRef(new Map());

  const stopVideo = (id) => {
    const video = videoRefs.current.get(id);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  // 鼠标进入：停止其他视频 → 当前视频从头播放
  const handleMouseEnter = (id) => {
    setHoveredId(id);

    // 先停止其他所有视频，保证任何时候只有一个 preview 在播放
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
      // currentTime 设置在尚未 ready 时可能抛错，忽略即可
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch((error) => {
        // 浏览器拒绝 autoplay 或播放失败：不设置 playingId，poster 继续显示
        console.error("Video autoplay rejected:", error);
      });
    }
    // playing 状态由 onPlaying 事件设置，
    // 保证 video 真正进入 playing 后才淡入覆盖 poster
  };

  // 鼠标离开：pause + currentTime 归零 + 恢复 poster + 隐藏 controls
  const handleMouseLeave = (id) => {
    stopVideo(id);
    setHoveredId((prev) => (prev === id ? null : prev));
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  // 真正进入 playing：当前 video 标记为播放中（淡入覆盖 poster）
  const handlePlaying = (id) => {
    setPlayingId(id);
  };

  // 加载失败：恢复 poster
  const handleError = (id) => {
    const video = videoRefs.current.get(id);
    if (video) video.pause();
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  // 播放结束：currentTime 归零 + 恢复 poster（loop 下通常不会触发，作为兜底）
  const handleEnded = (id) => {
    stopVideo(id);
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  // 卸载时清理所有 video
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
    <main className="video-preview-page">
      <section className="video-grid">
        {videos.map((videoData) => {
          const isHovered = hoveredId === videoData.id;
          const isPlaying = playingId === videoData.id;

          return (
            <article
              key={videoData.id}
              className={`video-card${isHovered ? " is-hovered" : ""}${
                isPlaying ? " is-playing" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(videoData.id)}
              onMouseLeave={() => handleMouseLeave(videoData.id)}
            >
              <div className="video-card__media">
                {/* 静态封面：永远存在于 DOM，底层 fallback，opacity 永远为 1 */}
                <img
                  src={videoData.poster}
                  alt={videoData.title}
                  className="video-card__poster"
                  loading="lazy"
                />

                {/* 视频：永远存在于 DOM，在上层，仅通过 opacity 控制 */}
                <video
                  ref={(element) => {
                    if (element) {
                      videoRefs.current.set(videoData.id, element);
                    } else {
                      videoRefs.current.delete(videoData.id);
                    }
                  }}
                  className="video-card__video"
                  src={videoData.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={isHovered}
                  onPlaying={() => handlePlaying(videoData.id)}
                  onError={() => handleError(videoData.id)}
                  onEnded={() => handleEnded(videoData.id)}
                />
              </div>

              <div className="video-card__title">{videoData.title}</div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
