/**
 * videoBlob — 视频预取与本地 Blob URL 缓存
 *
 * 为什么需要它：
 *   <video src="http...mp4"> 由浏览器媒体栈直接发起网络请求。Chromium 的媒体栈
 *   会先发一个 `Range: bytes=0-` 全量流探测，缓冲足够（preload=metadata 挂起、
 *   hover 切换暂停等）后主动 ABORT 连接 → 控制台刷 net::ERR_ABORTED；静态服务器
 *   （sirv / GitHub Pages）对开放区间返回整个文件，无法从服务端避免。
 *
 *   改成由页面用 fetch() 完整取回视频（fetch 取消/挂起不产生控制台资源错误），
 *   再用 URL.createObjectURL 生成本地 blob: URL 交给 <video>。媒体栈只读本地
 *   内存，零网络请求、零 ERR_ABORTED、hover 播放瞬时起播。
 *
 * 缓存位于模块作用域：React StrictMode 双挂载、组件重挂载后仍然命中。
 */

const blobUrlCache = new Map(); // networkSrc -> blob: URL
const inFlight = new Map();    // networkSrc -> Promise

export function getVideoBlobUrl(src) {
  if (!src) return Promise.reject(new Error('getVideoBlobUrl: empty src'));
  if (blobUrlCache.has(src)) return Promise.resolve(blobUrlCache.get(src));
  if (inFlight.has(src)) return inFlight.get(src);

  const promise = fetch(src, { credentials: 'same-origin' })
    .then((res) => {
      if (!res.ok) throw new Error(`video fetch ${res.status}: ${src}`);
      return res.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      blobUrlCache.set(src, url);
      inFlight.delete(src);
      return url;
    })
    .catch((err) => {
      inFlight.delete(src);
      throw err;
    });

  inFlight.set(src, promise);
  return promise;
}

export function hasVideoBlob(src) {
  return blobUrlCache.has(src);
}
