import { useEffect, useRef, useState } from 'react';
import { canHover, prefersReducedMotion } from '../lib/site';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const MAX_FRAMES = 120;
const CAPTURE_WIDTH = 800;

type FrameMeta = { mediaTime: number };
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback: (cb: (now: number, meta: FrameMeta) => void) => number;
};

/**
 * Cinematic background with pointer scrubbing on desktop.
 *
 * The visible <video> plays its first pass normally while frames are captured
 * from it (one download; sequential decode yields every frame, so no keyframe
 * jank). When the pass ends the canvas takes over and the pointer scrubs
 * through the captured frames with eased interpolation. Frame count and
 * resolution are capped to keep memory bounded. Touch, low-memory, save-data
 * and reduced-motion visitors simply get the looping video.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video) return;

    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const capable =
      !!canvas &&
      canHover() &&
      !prefersReducedMotion() &&
      !nav.connection?.saveData &&
      (nav.deviceMemory ?? 8) >= 4 &&
      'requestVideoFrameCallback' in HTMLVideoElement.prototype;

    const loopForever = () => {
      video.loop = true;
      video.play().catch(() => {});
    };

    const ctx = capable ? canvas.getContext('2d', { alpha: false }) : null;
    if (!capable || !ctx) {
      loopForever();
      return;
    }

    const v = video as VideoWithRVFC;
    const frames: HTMLCanvasElement[] = [];
    let destroyed = false;
    let raf = 0;
    let target = 0;
    let current = 0;
    let lastCaptured = -Infinity;
    let lastDrawn = -1;
    let minGap = 0;
    let w = 0;
    let h = 0;

    const capture = (_now: number, meta: FrameMeta) => {
      if (destroyed) return;
      if (frames.length < MAX_FRAMES && meta.mediaTime - lastCaptured >= minGap) {
        const fc = document.createElement('canvas');
        fc.width = w;
        fc.height = h;
        fc.getContext('2d', { alpha: false })?.drawImage(video, 0, 0, w, h);
        frames.push(fc);
        lastCaptured = meta.mediaTime;
      }
      if (!video.ended) v.requestVideoFrameCallback(capture);
    };

    const onMeta = () => {
      const vw = video.videoWidth || CAPTURE_WIDTH;
      const vh = video.videoHeight || 450;
      const scale = Math.min(1, CAPTURE_WIDTH / vw);
      w = Math.round(vw * scale);
      h = Math.round(vh * scale);
      canvas.width = w;
      canvas.height = h;
      minGap = (video.duration || 10) / MAX_FRAMES;
      v.requestVideoFrameCallback(capture);
    };

    const onPointer = (e: PointerEvent) => {
      if (frames.length) target = (e.clientX / window.innerWidth) * (frames.length - 1);
    };

    const render = () => {
      if (destroyed) return;
      const diff = target - current;
      if (Math.abs(diff) > 0.02) current += diff * 0.075;
      const idx = Math.round(Math.max(0, Math.min(current, frames.length - 1)));
      if (idx !== lastDrawn && frames[idx]) {
        ctx.drawImage(frames[idx], 0, 0, w, h);
        lastDrawn = idx;
      }
      raf = requestAnimationFrame(render);
    };

    const onEnded = () => {
      if (destroyed) return;
      if (frames.length < 8) {
        loopForever();
        return;
      }
      current = frames.length - 1;
      target = current;
      ctx.drawImage(frames[current], 0, 0, w, h);
      setScrub(true);
      raf = requestAnimationFrame(render);
    };

    video.loop = false;
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta, { once: true });
    video.addEventListener('ended', onEnded, { once: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    video.play().catch(() => loopForever());

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('ended', onEnded);
      window.removeEventListener('pointermove', onPointer);
      frames.length = 0;
    };
  }, []);

  const layer = 'pointer-events-none fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-700';

  return (
    <div aria-hidden="true">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        className={layer}
        style={{ objectPosition: '70% center', opacity: scrub ? 0 : 1 }}
      />
      <canvas ref={canvasRef} className={layer} style={{ objectPosition: '70% center', opacity: scrub ? 1 : 0 }} />
    </div>
  );
}
