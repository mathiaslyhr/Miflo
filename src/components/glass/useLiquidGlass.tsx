"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

/*
 * Real "liquid glass": an SVG displacement map bends the backdrop through the
 * surface. The map is a rounded-rect BEVEL — neutral/flat in the centre (so text
 * stays sharp) and curving only near the edges, generated to match each element's
 * exact size and corner radius. Works for circles, pills and cards. Chromium only
 * (Safari gracefully keeps the blur fallback).
 *
 * See design.md §5b.
 */
export function buildBevelMap(
  w: number,
  h: number,
  radius: number,
  band: number,
): string {
  const k = Math.min(1, 200 / Math.max(w, h)); // cap resolution for perf
  const W = Math.max(8, Math.round(w * k));
  const H = Math.max(8, Math.round(h * k));
  const rr = Math.min(radius * k, W / 2, H / 2);
  const bandPx = Math.max(2, band * k);
  const cx = W / 2;
  const cy = H / 2;

  // distance from the rounded-rect edge, inward-positive
  const edgeDist = (x: number, y: number) => {
    const qx = Math.abs(x - cx) - (W / 2 - rr);
    const qy = Math.abs(y - cy) - (H / 2 - rr);
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
    const inside = Math.min(Math.max(qx, qy), 0);
    return -(outside + inside - rr);
  };
  // quarter-circle bevel: 0 at the edge → 1 across the band, then flat
  const height = (x: number, y: number) => {
    const d = edgeDist(x, y);
    if (d <= 0) return 0;
    const t = Math.min(1, d / bandPx);
    return Math.sqrt(1 - (1 - t) * (1 - t));
  };

  const gx = new Float32Array(W * H);
  const gy = new Float32Array(W * H);
  let max = 1e-6;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = height(x + 1, y) - height(x - 1, y);
      const dy = height(x, y + 1) - height(x, y - 1);
      gx[y * W + x] = dx;
      gy[y * W + x] = dy;
      if (Math.abs(dx) > max) max = Math.abs(dx);
      if (Math.abs(dy) > max) max = Math.abs(dy);
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(W, H);
  const d = img.data;
  const amp = 120 / max; // normalise so the rim reaches a strong offset
  let p = 0;
  for (let i = 0; i < W * H; i++) {
    d[p++] = Math.max(0, Math.min(255, Math.round(128 - gx[i] * amp)));
    d[p++] = Math.max(0, Math.min(255, Math.round(128 - gy[i] * amp)));
    d[p++] = 128;
    d[p++] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

/**
 * Measures the element (size + corner radius) and returns a ref, a style with
 * the backdrop-filter (refraction, blur fallback), and the <filter> to render.
 */
export function useLiquidGlass<T extends HTMLElement>(scale = 0.32) {
  const ref = useRef<T | null>(null);
  const filterId = "lg-" + useId().replace(/[:ε]/g, "");
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const rebuild = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 4 || h < 4) return;
      let radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      radius = Math.min(radius, Math.min(w, h) / 2);
      const band = Math.min(Math.min(w, h) * 0.3, 14);
      setHref(buildBevelMap(w, h, radius, band));
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(rebuild);
    });
    ro.observe(el);
    rebuild();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const style: CSSProperties = {
    // fallback first (Safari keeps the blur), refraction second (Chromium)
    backdropFilter: href ? `blur(1px) url(#${filterId})` : "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  };
  const filter = href ? (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <filter
        id={filterId}
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={href}
          preserveAspectRatio="none"
          x="0"
          y="0"
          width="1"
          height="1"
          result="map"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur" />
        <feDisplacementMap
          in="blur"
          in2="map"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  ) : null;

  return { ref, style, filter };
}
