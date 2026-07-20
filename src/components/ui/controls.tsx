"use client";

import Link from "next/link";
import { useState, type ReactNode, type Ref } from "react";
import { CTRL } from "./motion";

export { PRESS_BASE, CTRL } from "./motion";

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
 * Renders the right element for a control: a Next <Link> for internal hrefs,
 * an <a> for external ones, otherwise a <button>.
 */
function Pressable({
  href,
  onClick,
  type = "button",
  disabled,
  className,
  target,
  rel,
  innerRef,
  children,
  ...rest
}: ButtonProps & { innerRef?: Ref<HTMLElement> }) {
  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          ref={innerRef as Ref<HTMLAnchorElement>}
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
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

const BTN =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium";

/**
 * Primary CTA. Brand purple, not the near-black of the light theme — on
 * `#0b0b0f` an ink button all but disappears, and purple is what the app uses.
 */
export function SolidButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} ${BTN} bg-primary text-white hover:bg-primary-ink disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </Pressable>
  );
}

/** Secondary: a card-coloured surface with a rim, brightening on hover. */
export function OutlineButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} ${BTN} border border-rim-2 bg-surface text-ink hover:bg-surface-2 ${className}`}
    >
      {children}
    </Pressable>
  );
}

/** Low emphasis: no surface until hover. */
export function GhostButton({ className = "", children, ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      className={`${CTRL} ${BTN} text-muted hover:bg-surface hover:text-ink ${className}`}
    >
      {children}
    </Pressable>
  );
}

/* ------------------------------------------------------------------ bits */

/** Small static label: player counts, tags. Not interactive. */
export function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full border border-rim-2 bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- avatars */

export function Avatar({ i }: { i: number }) {
  // Mid-tone fills, not the light theme's pastels: a pale avatar on a dark
  // card reads as a hole punched in the surface.
  const hues = [
    "linear-gradient(135deg,#c4644f,#d98a72)",
    "linear-gradient(135deg,#3f6ea8,#5b93c9)",
    "linear-gradient(135deg,#6260ff,#8583ff)",
    "linear-gradient(135deg,#2f8f6d,#4bb58c)",
  ];
  return (
    <div
      className="h-9 w-9 rounded-full border-2 border-rim-2"
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
  return (
    <div className="relative flex rounded-full border border-rim-2 bg-surface-2 p-1">
      <div
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-surface-3 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
            active === i ? "text-ink" : "text-muted"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
