"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { MIFLO_PALETTE as P } from "@/lib/palette";

/*
 * The background for every page: a horizontal gradient with three nested
 * circles on top, each with its own diagonal gradient, a white Fresnel rim and
 * an inner glow.
 *
 * The mouse effect is two layers stacked:
 *
 *  1. Tilt — the whole stack rotates on X and Y, so the plane leans toward the
 *     cursor.
 *  2. De-synced parallax — each circle shifts on its own spring. The back one
 *     is slow and moves *against* the pointer; the front one is snappy and
 *     moves furthest with it. The mismatch is the whole point: give all three
 *     the same spring and the depth collapses into a flat sliding sheet.
 *
 * Transforms only, so it stays off the layout/paint path. It renders static
 * until mounted (SSR and the first client render agree → no hydration
 * mismatch) and switches off entirely under prefers-reduced-motion.
 */

type Geo = {
  size: string;
  cx: string;
  cy: string;
  shadow: string;
};

type CircleSpec = {
  desktop: Geo;
  mobile: Geo;
  /** Parallax direction + relative strength. Negative = against the pointer. */
  pdir: { x: number; y: number };
  /** Its own spring, which is what makes the circles trail each other. */
  spring: { stiffness: number; damping: number; mass: number };
};

// Each circle carries separate desktop and mobile geometry. Phones are portrait
// and much narrower, so the same vw/vh sizes would push the two smaller circles
// off-screen entirely.
const CIRCLES: CircleSpec[] = [
  {
    desktop: {
      size: "min(220vh, 145vw)",
      cx: "80%",
      cy: "40%",
      shadow: `inset 0 0 30px 3px rgba(255,255,255,0.85), inset 0 0 120px 30px rgba(${P.glow},0.4)`,
    },
    mobile: {
      size: "min(205vw, 112vh)",
      cx: "40%",
      cy: "37%",
      shadow: `inset 0 0 18px 2px rgba(255,255,255,0.85), inset 0 0 70px 20px rgba(${P.glow},0.4)`,
    },
    pdir: { x: -0.5, y: -0.45 }, // furthest back: against the pointer, and least
    spring: { stiffness: 55, damping: 22, mass: 0.9 }, // slow, laggy
  },
  {
    desktop: {
      size: "min(118vh, 78vw)",
      cx: "73%",
      cy: "50%",
      shadow: `inset 0 0 26px 3px rgba(255,255,255,0.9), inset 0 0 100px 26px rgba(${P.glow},0.42)`,
    },
    mobile: {
      size: "min(150vw, 82vh)",
      cx: "45%",
      cy: "44%",
      shadow: `inset 0 0 16px 2px rgba(255,255,255,0.9), inset 0 0 58px 18px rgba(${P.glow},0.42)`,
    },
    pdir: { x: 0.55, y: 0.65 },
    spring: { stiffness: 95, damping: 18, mass: 0.5 },
  },
  {
    desktop: {
      size: "min(86vh, 55vw)",
      cx: "72%",
      cy: "50%",
      shadow: `inset 0 0 24px 3px rgba(255,255,255,0.95), inset 0 0 90px 24px rgba(${P.glow},0.44)`,
    },
    mobile: {
      size: "min(104vw, 56vh)",
      cx: "52%",
      cy: "52%",
      shadow: `inset 0 0 14px 2px rgba(255,255,255,0.95), inset 0 0 50px 16px rgba(${P.glow},0.44)`,
    },
    pdir: { x: 1, y: 0.8 }, // frontmost: follows the pointer most
    spring: { stiffness: 140, damping: 15, mass: 0.32 }, // snappy
  },
];

const MAX_SHIFT = 38; // px of parallax at full deflection
const MAX_TILT = 11; // degrees of tilt at full deflection

function centered(geo: Geo): React.CSSProperties {
  return {
    width: geo.size,
    height: geo.size,
    left: `calc(${geo.cx} - ${geo.size} * 0.5)`,
    top: `calc(${geo.cy} - ${geo.size} * 0.5)`,
    boxShadow: geo.shadow,
  };
}

function Circle({
  spec,
  isMobile,
  active,
  rawX,
  rawY,
}: {
  spec: CircleSpec;
  isMobile: boolean;
  active: boolean;
  rawX: MotionValue<number>;
  rawY: MotionValue<number>;
}) {
  const sx = useSpring(rawX, spec.spring);
  const sy = useSpring(rawY, spec.spring);

  // `active` is applied inside the transform rather than by adding/removing
  // `x`/`y` from the style object. Server-side `active` is true, so a
  // reduced-motion client that dropped the keys would hydrate against a
  // different style shape. Keeping the shape constant and pinning the output to
  // 0 avoids that, and matches how rotateX/rotateY below already work.
  const x = useTransform(sx, (v) => (active ? v * spec.pdir.x * MAX_SHIFT : 0));
  const y = useTransform(sy, (v) => (active ? v * spec.pdir.y * MAX_SHIFT : 0));

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        ...centered(isMobile ? spec.mobile : spec.desktop),
        background: P.circle,
        willChange: "transform",
        x,
        y,
      }}
    />
  );
}

/*
 * Which geometry to use is a client-only fact that must not leak into the
 * server render. useSyncExternalStore is the right primitive: it takes an
 * explicit server snapshot (`false` → desktop), so SSR and the first client
 * render agree and there's no hydration mismatch — and no useEffect+setState
 * mount gate, which is both a cascading render and, as it turns out, easy to
 * get subtly wrong.
 *
 * Note there is deliberately no separate "have we mounted yet" gate around the
 * pointer effect. It isn't needed: the listeners are only ever attached in an
 * effect (client-only by definition) and the motion values start at 0, so the
 * server HTML and the first client render both show the resting position.
 */
const MOBILE_QUERY = "(max-width: 640px)";
const serverFalse = () => false;

function useIsMobile() {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    serverFalse,
  );
}

export function CirclesHero() {
  const reduce = useReducedMotion();

  const isMobile = useIsMobile();

  const active = !reduce;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  useEffect(() => {
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    // Normalise the pointer to -1…1 across the viewport, so every circle works
    // from the same signal and only its own pdir/spring shapes the response.
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const recentre = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", recentre);
    document.addEventListener("mouseleave", recentre);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", recentre);
      document.removeEventListener("mouseleave", recentre);
    };
  }, [active, rawX, rawY]);

  // The tilt runs on its own, softer spring than any of the circles.
  const tx = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.5 });
  const ty = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 });
  const rotateY = useTransform(tx, (v) => (active ? v * MAX_TILT : 0));
  const rotateX = useTransform(ty, (v) => (active ? -v * MAX_TILT : 0));

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ background: P.bg }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        {CIRCLES.map((spec, i) => (
          <Circle
            key={i}
            spec={spec}
            isMobile={isMobile}
            active={active}
            rawX={rawX}
            rawY={rawY}
          />
        ))}
      </motion.div>
    </div>
  );
}
