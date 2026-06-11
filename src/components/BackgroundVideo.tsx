import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/**
 * BackgroundVideo — Play-through frame extraction for smooth mouse scrubbing.
 *
 * Why previous approaches were rough:
 * - Setting video.currentTime = X forces the browser to seek.
 *   Seeking jumps to the nearest keyframe (I-frame), then decodes forward.
 *   This is ALWAYS janky — no amount of lerp fixes it.
 * - Extracting frames VIA seeking just captures the same keyframes.
 *
 * This approach:
 * 1. Plays the video at 2x speed (hidden) to trigger SEQUENTIAL decode.
 *    Sequential decode produces EVERY frame — not just keyframes.
 * 2. Captures each decoded frame to a small off-screen canvas.
 * 3. Stores all frames in an array.
 * 4. Renders via <canvas> at 60fps with lerp — zero seeking, zero jank.
 */
export default function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frames: HTMLCanvasElement[] = [];
    let targetFrame = 0;
    let currentFrame = 0;
    let animId: number;
    let destroyed = false;
    const LERP = 0.07;

    // ── Frame extraction via playback ────────────────────────
    const extractor = document.createElement('video');
    extractor.muted = true;
    extractor.playsInline = true;
    extractor.preload = 'auto';
    // Do NOT set crossOrigin — avoids CORS requirement.
    // canvas.drawImage(video) works cross-origin (taints canvas, which is fine).
    extractor.src = VIDEO_URL;

    // Capture one frame to a small off-screen canvas
    const captureFrame = (w: number, h: number) => {
      const fc = document.createElement('canvas');
      fc.width = w;
      fc.height = h;
      const fctx = fc.getContext('2d', { alpha: false });
      if (fctx) {
        fctx.drawImage(extractor, 0, 0, w, h);
      }
      return fc;
    };

    const extractFrames = async () => {
      // Wait until playable
      await new Promise<void>((resolve) => {
        if (extractor.readyState >= 3) return resolve();
        extractor.addEventListener('canplay', () => resolve(), { once: true });
      });
      if (destroyed) return;

      // Determine capture resolution (cap at 960px wide for memory)
      const vw = extractor.videoWidth;
      const vh = extractor.videoHeight;
      const scale = Math.min(1, 960 / vw);
      const w = Math.round(vw * scale);
      const h = Math.round(vh * scale);

      canvas.width = w;
      canvas.height = h;

      // Play at 2x to extract faster
      extractor.playbackRate = 2;

      // Set up frame capture — use requestVideoFrameCallback if available
      const hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;

      if (hasRVFC) {
        const rvfcCapture = () => {
          if (destroyed || extractor.ended || extractor.paused) return;
          frames.push(captureFrame(w, h));
          (extractor as any).requestVideoFrameCallback(rvfcCapture);
        };
        (extractor as any).requestVideoFrameCallback(rvfcCapture);
      } else {
        // Fallback: capture at ~30fps via setInterval
        const interval = setInterval(() => {
          if (destroyed || extractor.ended || extractor.paused) {
            clearInterval(interval);
            return;
          }
          frames.push(captureFrame(w, h));
        }, 1000 / 30);
        extractor.addEventListener('ended', () => clearInterval(interval), { once: true });
      }

      // Start playback
      try {
        await extractor.play();
      } catch {
        return; // autoplay blocked — fallback to video element
      }

      // Wait for video to finish playing
      await new Promise<void>((resolve) => {
        extractor.addEventListener('ended', () => resolve(), { once: true });
      });

      if (destroyed || frames.length < 5) return;

      // Draw initial middle frame
      const mid = Math.floor(frames.length / 2);
      currentFrame = mid;
      targetFrame = mid;
      ctx.drawImage(frames[mid], 0, 0, canvas.width, canvas.height);

      setFramesReady(true);
      startRenderLoop();
    };

    // ── Mouse tracking ───────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      if (frames.length === 0) return;
      const normalized = e.clientX / window.innerWidth;
      targetFrame = normalized * (frames.length - 1);
    };

    // ── 60fps render loop with lerp ──────────────────────────
    const startRenderLoop = () => {
      let lastIdx = -1;
      const render = () => {
        if (destroyed) return;

        const diff = targetFrame - currentFrame;
        if (Math.abs(diff) > 0.05) {
          currentFrame += diff * LERP;
        }

        const idx = Math.round(
          Math.max(0, Math.min(currentFrame, frames.length - 1))
        );

        // Only redraw if frame actually changed
        if (idx !== lastIdx && frames[idx]) {
          ctx.drawImage(frames[idx], 0, 0, canvas.width, canvas.height);
          lastIdx = idx;
        }

        animId = requestAnimationFrame(render);
      };
      animId = requestAnimationFrame(render);
    };

    // ── Fallback mouse tracking for the video element ────────
    const handleMouseMoveFallback = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || framesReady) return;
      if (!video.duration || isNaN(video.duration)) return;
      const normalized = e.clientX / window.innerWidth;
      video.currentTime = normalized * video.duration;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleMouseMoveFallback);
    extractFrames();

    return () => {
      destroyed = true;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMoveFallback);
      cancelAnimationFrame(animId);
      extractor.pause();
      extractor.src = '';
      // Release frame canvases
      frames.length = 0;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Fallback video — visible while frames are being extracted */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
          width: '100%',
          height: '100%',
          opacity: framesReady ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Canvas — takes over once frames are captured */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
          width: '100%',
          height: '100%',
          opacity: framesReady ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
