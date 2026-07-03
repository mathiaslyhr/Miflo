"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  MeshGradient,
  GRADIENTS,
  palette,
  CTRL,
  SolidButton,
  GlassButton,
  OutlineButton,
  GhostButton,
  GlassCard,
  Chip,
  Eyebrow,
  Avatar,
  AvatarStack,
  Toggle,
  SectionLabel,
  useLiquidGlass,
} from "@/components/glass";

/*
 * /hover — the live reference implementation for design.md. Full-screen
 * mesh-gradient sections (scroll-snap). Section 1 keeps the liquid-glass
 * droplet: a glass drop follows the cursor and MAGNIFIES + REFRACTS the scene
 * beneath it (real magnification via a scaled copy — not just blur), with an
 * organic melt, chromatic fringing, a wet specular highlight and a soft shadow.
 * The reusable primitives now live in @/components/glass; this page composes them.
 */

const SIZE = 140; // lens diameter in px (magnifier math uses this constant)
const ZOOM = 1.55; // how much the world is magnified inside the lens

/** Section 1 content — the refractable world (rendered real + inside the lens). */
function Scene() {
  return (
    <>
      <MeshGradient palette={GRADIENTS[0]} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="font-medium leading-[0.92] tracking-tight text-[#0d0d16]"
          style={{ fontSize: "clamp(3.5rem,15vw,13rem)" }}
        >
          Liquid
          <br />
          glass
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[#0d0d16]/55 sm:text-lg">
          A droplet that refracts, magnifies and reflects whatever sits beneath
          it — move your cursor across the letters.
        </p>
      </div>
    </>
  );
}

/* -------- demo-only controls (Field + Slider) used by the Glass section -------- */

function Field() {
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>();
  return (
    <>
      <div
        ref={ref}
        style={style}
        className="lg-surface flex items-center gap-2 rounded-full p-1.5 pl-4"
      >
        <input
          type="email"
          placeholder="you@studio.com"
          className="w-40 bg-transparent text-sm text-[#0d0d16] placeholder:text-[#0d0d16]/45 focus:outline-none sm:w-52"
        />
        <button
          className={`${CTRL} rounded-full bg-[#0d0d16] px-4 py-1.5 text-xs font-medium text-white`}
        >
          Notify me
        </button>
      </div>
      {filter}
    </>
  );
}

/** Compact glass slider — same press language on the thumb (grab = press). */
function Slider() {
  const [val, setVal] = useState(42); // 0..100
  const [grabbing, setGrabbing] = useState(false);
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>(0.5);

  const setFromX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setVal(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <>
      <div
        ref={ref}
        style={style}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setGrabbing(true);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => grabbing && setFromX(e.clientX)}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          setGrabbing(false);
        }}
        className="lg-surface tap relative h-2.5 w-[180px] cursor-pointer touch-none select-none rounded-full"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#0d0d16]/55"
          style={{ width: `${val}%` }}
        />
        <div
          aria-hidden
          className={`absolute top-1/2 h-5 w-5 rounded-full bg-white transition-[box-shadow] duration-150 ease-out ${
            grabbing
              ? "shadow-[0_0_0_1.5px_rgba(255,255,255,0.7),0_6px_18px_-4px_rgba(20,15,50,0.4)]"
              : "shadow-[0_0_0_1.5px_rgba(255,255,255,0.55),0_2px_8px_-2px_rgba(20,15,50,0.4)]"
          }`}
          style={{
            left: `${val}%`,
            transform: `translate(-50%,-50%) scale(${grabbing ? 0.9 : 1})`,
          }}
        />
      </div>
      {filter}
    </>
  );
}

/* --------------------------------------------------------- showcase sections */

/** Clean / editorial: solid buttons + type on a warm gradient. */
function CleanSection() {
  return (
    <section className="relative h-full w-full snap-start overflow-hidden">
      <MeshGradient palette={palette("Sand")} />
      <SectionLabel>Clean</SectionLabel>
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <Eyebrow>Design engineering · studio</Eyebrow>
        <h2
          className="mt-5 max-w-3xl font-medium leading-[1.02] tracking-tight text-[#0d0d16]"
          style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}
        >
          Interfaces that feel
          <br />
          effortless.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#0d0d16]/55 sm:text-lg">
          The same soft gradient, now carrying real product UI — type, buttons
          and depth that stay out of the way.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <SolidButton>Get started</SolidButton>
          <OutlineButton>Learn more</OutlineButton>
        </div>
      </div>
    </section>
  );
}

/** Frosted liquid-glass component sampler on the Lilac gradient. */
function GlassSection() {
  return (
    <section className="relative h-full w-full snap-start overflow-hidden">
      <MeshGradient palette={palette("Lilac")} />
      <SectionLabel>Glass</SectionLabel>

      {/* floating toast accent */}
      <div className="animate-float pointer-events-none absolute right-[10%] top-[16%] hidden sm:block">
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/55 bg-white/45 px-4 py-3 shadow-[0_20px_40px_-18px_rgba(40,30,90,0.35)] backdrop-blur-xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#32c36c] text-xs text-white">
            ✓
          </span>
          <div className="text-left">
            <p className="text-xs font-medium text-[#0d0d16]">Payment received</p>
            <p className="text-[11px] text-[#0d0d16]/50">2 seconds ago</p>
          </div>
        </div>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <Eyebrow>Components</Eyebrow>

        {/* centrepiece card */}
        <GlassCard className="mt-5 w-full max-w-sm text-left">
          <div className="flex items-center gap-3">
            <Avatar i={2} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-[#0d0d16]">Studio Pro</p>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#6260f6] text-[9px] text-white">
                  ✓
                </span>
              </div>
              <p className="text-xs text-[#0d0d16]/50">Team of 4 · Copenhagen</p>
            </div>
            <Chip>New</Chip>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#0d0d16]/70">
            Everything you need to ship polished, glassy interfaces — on a
            background that does the heavy lifting.
          </p>

          <div className="mt-5 flex gap-6">
            <div>
              <p className="text-2xl font-medium text-[#0d0d16]">128</p>
              <p className="text-xs text-[#0d0d16]/50">components</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-[#0d0d16]">9</p>
              <p className="text-xs text-[#0d0d16]/50">gradients</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <AvatarStack />
            <div className="flex gap-2">
              <GhostButton>Skip</GhostButton>
              <GlassButton>Open</GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* controls row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Chip>Design</Chip>
          <Chip>Motion</Chip>
          <Chip>Glass</Chip>
          <Toggle />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Slider />
          <Field />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- page */

export default function HoverPage() {
  const scrollRef = useRef<HTMLDivElement>(null); // the scroll-snap container
  const sec1Ref = useRef<HTMLElement>(null); // section 1 (droplet lives here)
  const wrapRef = useRef<HTMLDivElement>(null); // moving frame (position + grow)
  const innerRef = useRef<HTMLDivElement>(null); // magnified world copy (zoom)
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", true);

  // Latest values live in refs so the rAF loop never restarts.
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const grow = useRef(0.9);
  const active = useRef(false);
  const started = useRef(false);
  const s1Visible = useRef(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return; // not rendered (touch / no-hover device)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const follow = reduce ? 1 : 0.18; // 1 = snap to cursor, lower = more lag

    let raf = 0;

    const show = () => {
      if (active.current) return;
      active.current = true;
      wrap.style.opacity = "1";
    };
    const hide = () => {
      active.current = false;
      wrap.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      if (!s1Visible.current) {
        hide();
        return;
      }
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!started.current) {
        started.current = true;
        cur.current.x = e.clientX;
        cur.current.y = e.clientY;
        grow.current = 0.9;
      }
      show();
    };
    const onLeave = () => hide();

    const frame = () => {
      const dx = target.current.x - cur.current.x;
      const dy = target.current.y - cur.current.y;
      cur.current.x += dx * follow;
      cur.current.y += dy * follow;

      const speed = Math.hypot(dx, dy);
      const growTarget = reduce ? 1 : 1 + Math.min(speed * 0.006, 0.1);
      grow.current += (growTarget - grow.current) * 0.2;

      const cx = cur.current.x;
      const cy = cur.current.y;

      wrap.style.transform =
        `translate3d(${cx - SIZE / 2}px, ${cy - SIZE / 2}px, 0)` +
        ` scale(${grow.current})`;

      inner.style.transform =
        `translate3d(${SIZE / 2 - cx * ZOOM}px, ${SIZE / 2 - cy * ZOOM}px, 0)` +
        ` scale(${ZOOM})`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    let io: IntersectionObserver | undefined;
    if (sec1Ref.current && scrollRef.current) {
      io = new IntersectionObserver(
        ([entry]) => {
          s1Visible.current = entry.intersectionRatio >= 0.6;
          if (!s1Visible.current) hide();
        },
        { root: scrollRef.current, threshold: [0, 0.6, 1] },
      );
      io.observe(sec1Ref.current);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [canHover]);

  return (
    <main
      ref={scrollRef}
      className="fixed inset-0 snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-white"
    >
      {/* ---- Section 1: droplet over the Lilac scene ---- */}
      <section
        ref={sec1Ref}
        className="relative h-full w-full snap-start overflow-hidden [cursor:none]"
      >
        <Scene />

        <span className="pointer-events-none absolute left-8 top-8 text-sm font-medium tracking-wide text-[#0d0d16]/55">
          {GRADIENTS[0].name}
        </span>

        {!canHover && (
          <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white [cursor:auto]">
            Open on a device with a mouse to feel the droplet ✨
          </p>
        )}

        <div className="scroll-hint pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-[#0d0d16]/45">
          scroll ↓
        </div>
      </section>

      {/* ---- Sections 2–4: gradient showcases ---- */}
      {GRADIENTS.slice(1).map((p) => (
        <section
          key={p.name}
          className="relative h-full w-full snap-start overflow-hidden"
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "100vw 100vh",
          }}
        >
          <MeshGradient palette={p} />
          <span className="pointer-events-none absolute left-8 top-8 text-sm font-medium tracking-wide text-[#0d0d16]/55">
            {p.name}
          </span>
        </section>
      ))}

      {/* ---- UI showcase: UI built on top of the gradients ---- */}
      <CleanSection />
      <GlassSection />

      {/* the droplet (fixed to the viewport, only active over section 1) */}
      {canHover && (
        <div
          ref={wrapRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30"
          style={{
            width: SIZE,
            height: SIZE,
            opacity: 0,
            transition: "opacity 240ms var(--ease-out-quint)",
            willChange: "transform, opacity",
          }}
        >
          {/* soft contact shadow beneath the drop */}
          <div
            className="absolute inset-[10%] rounded-full"
            style={{ boxShadow: "0 12px 24px -8px rgba(40,30,90,0.42)" }}
          />

          {/* refracting lens */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              filter: "url(#liquid-refraction)",
              WebkitBackdropFilter: "blur(0.5px)",
              backdropFilter: "blur(0.5px)",
              maskImage: "radial-gradient(circle, #000 97%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle, #000 97%, transparent 100%)",
            }}
          >
            <div
              ref={innerRef}
              className="absolute left-0 top-0"
              style={{
                width: "100vw",
                height: "100vh",
                transformOrigin: "0 0",
                willChange: "transform",
              }}
            >
              <Scene />
            </div>
          </div>

          {/* glass-marble shading */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(24% 18% at 33% 26%,rgba(255,255,255,0.95),transparent 60%)," +
                "radial-gradient(75% 55% at 40% 30%,rgba(255,255,255,0.12),transparent 55%)," +
                "radial-gradient(70% 45% at 50% 14%,rgba(150,140,255,0.28),transparent 60%)," +
                "radial-gradient(circle,transparent 72%,rgba(20,15,45,0.16) 90%,transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 64%,transparent 66%,rgba(255,255,255,0.42) 86%,transparent 96%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full mix-blend-screen"
            style={{
              background:
                "radial-gradient(closest-side circle at 42% 66%,transparent 62%,rgba(90,255,170,0.5) 78%,transparent 86%)," +
                "radial-gradient(closest-side circle at 58% 66%,transparent 62%,rgba(200,120,255,0.5) 78%,transparent 86%)",
            }}
          />
        </div>
      )}

      {/* SVG filter: organic liquid melt via turbulence displacement */}
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <filter
          id="liquid-refraction"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.016"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.7" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={22}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.6" />
        </filter>
      </svg>
    </main>
  );
}
