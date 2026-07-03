"use client";

import Link from "next/link";
import { useState, type ReactNode, type Ref } from "react";
import { useLiquidGlass } from "./useLiquidGlass";

/*
 * ONE coherent, touch-first interaction language for every control (design.md §5).
 *
 * Press (works identically on tap + click): scale down + slight dim on :active,
 * with a gentle spring-back curve. Hover (desktop only, gated by Tailwind's
 * hover = @media (hover:hover)) makes the glass "swell" — scaling up grows its
 * backdrop sampling so the refraction intensifies. Drop GLASS_HOVER for pure press.
 */
export const PRESS_BASE =
  "tap cursor-pointer select-none touch-manipulation " +
  "transition-transform duration-200 " +
  "ease-[cubic-bezier(0.34,1.25,0.64,1)] active:scale-[0.96] active:opacity-90";

export const GLASS_HOVER = "hover:scale-[1.03]";

export const CTRL = `${PRESS_BASE} ${GLASS_HOVER}`;

/* ---------------------------------------------------------------- buttons */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

/**
 * Renders the right element for a control: a Next <Link> for internal hrefs, an
 * <a> for external hrefs, otherwise a <button>. Forwards ref + style so glass
 * controls can measure themselves.
 */
function Pressable({
  href,
  onClick,
  type = "button",
  disabled,
  className,
  target,
  rel,
  style,
  innerRef,
  children,
  ...rest
}: ButtonProps & {
  style?: React.CSSProperties;
  innerRef?: Ref<HTMLElement>;
}) {
  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          ref={innerRef as Ref<HTMLAnchorElement>}
          style={style}
          className={className}
          onClick={onClick}
          {...rest}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        ref={innerRef as Ref<HTMLAnchorElement>}
        style={style}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      ref={innerRef as Ref<HTMLButtonElement>}
      style={style}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

// Primary CTA stays solid ink (hierarchy) — not glass — but shares press/hover.
export function SolidButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} inline-flex items-center justify-center rounded-full bg-[#0d0d16] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1.5px_rgba(255,255,255,0.25),0_14px_30px_-12px_rgba(20,15,50,0.4)] ${className}`}
    >
      {children}
    </Pressable>
  );
}

// Refracting liquid glass (secondary action).
export function GlassButton({ className = "", children, ...props }: ButtonProps) {
  const { ref, style, filter } = useLiquidGlass<HTMLElement>();
  return (
    <>
      <Pressable
        {...props}
        innerRef={ref}
        style={style}
        className={`${CTRL} lg-surface inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-[#0d0d16] ${className}`}
      >
        {children}
      </Pressable>
      {filter}
    </>
  );
}

// Clean outline secondary (design.md §3 "Clean"): frosted fill + an ink border.
export function OutlineButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} inline-flex items-center justify-center rounded-full border border-[#0d0d16]/20 bg-white/35 px-5 py-2.5 text-sm font-medium text-[#0d0d16] backdrop-blur-md ${className}`}
    >
      {children}
    </Pressable>
  );
}

// Invisible until hover, where a faint fill appears (low-emphasis / dismiss).
export function GhostButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-[#0d0d16]/70 hover:bg-white/25 ${className}`}
    >
      {children}
    </Pressable>
  );
}

/* ------------------------------------------------------------------ cards */

export function GlassCard({
  children,
  className = "",
  scale = 0.28,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>(scale);
  return (
    <>
      <div
        ref={ref}
        style={style}
        className={"lg-surface rounded-3xl p-6 " + className}
      >
        {children}
      </div>
      {filter}
    </>
  );
}

export function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, style, filter } = useLiquidGlass<HTMLSpanElement>();
  return (
    <>
      <span
        ref={ref}
        style={style}
        className={`${CTRL} lg-surface inline-block rounded-full px-3 py-1 text-xs font-medium text-[#0d0d16]/80 ${className}`}
      >
        {children}
      </span>
      {filter}
    </>
  );
}

/**
 * A bare liquid-glass surface (no padding/press) — compose your own content on
 * top (form fields, custom panels). `radiusClass` must match the visual radius
 * so the bevel map lines up.
 */
export function GlassSurface({
  children,
  className = "",
  radiusClass = "rounded-full",
  scale = 0.32,
}: {
  children: ReactNode;
  className?: string;
  radiusClass?: string;
  scale?: number;
}) {
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>(scale);
  return (
    <>
      <div
        ref={ref}
        style={style}
        className={`lg-surface ${radiusClass} ${className}`}
      >
        {children}
      </div>
      {filter}
    </>
  );
}

/* -------------------------------------------------------------- type bits */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.2em] text-[#0d0d16]/45 ${className}`}
    >
      {children}
    </p>
  );
}

/** Small corner label, matching the gradient sections. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-8 top-8 z-10 text-sm font-medium tracking-wide text-[#0d0d16]/55">
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- avatars */

export function Avatar({ i }: { i: number }) {
  const hues = [
    "linear-gradient(135deg,#f6a08c,#f4b3a0)",
    "linear-gradient(135deg,#96c8f5,#b6d8f8)",
    "linear-gradient(135deg,#b294f0,#cbb7f5)",
    "linear-gradient(135deg,#96e0c4,#c6eee0)",
  ];
  return (
    <div
      className="h-9 w-9 rounded-full border-2 border-white/80 shadow-sm"
      style={{ background: hues[i % hues.length] }}
    />
  );
}

export function AvatarStack() {
  return (
    <div className="flex -space-x-2.5">
      {[0, 1, 2, 3].map((i) => (
        <Avatar key={i} i={i} />
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- toggle */

/** Segmented control with a sliding highlight. */
export function Toggle({
  options = ["Monthly", "Yearly"],
  value,
  onChange,
}: {
  options?: string[];
  value?: number;
  onChange?: (i: number) => void;
}) {
  const [internal, setInternal] = useState(0);
  const active = value ?? internal;
  const set = (i: number) => {
    onChange?.(i);
    if (value === undefined) setInternal(i);
  };
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>();
  return (
    <>
      <div
        ref={ref}
        style={style}
        className="lg-surface relative flex rounded-full p-1"
      >
        <div
          aria-hidden
          className="absolute inset-y-1 rounded-full bg-white/85 shadow-[0_2px_8px_-2px_rgba(20,15,50,0.35)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `calc(${100 / options.length}% - 0.25rem)`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => set(i)}
            className={`${CTRL} relative z-10 w-24 rounded-full py-1.5 text-xs font-medium ${
              active === i ? "text-[#0d0d16]" : "text-[#0d0d16]/55"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {filter}
    </>
  );
}
