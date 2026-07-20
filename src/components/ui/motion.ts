/*
 * ONE interaction language for every control, shared with the app.
 *
 * Press (identical on tap and click): scale down + a slight dim on :active,
 * springing back. Hover is desktop-only (Tailwind's `hover` compiles to
 * @media (hover:hover)) and brightens the surface one rung rather than growing
 * it — on the dark palette "closer to you is lighter" is how elevation is
 * expressed, so hover feedback borrows the same vocabulary as hierarchy.
 *
 * These live outside controls.tsx so that server components (Card, Bento) can
 * use them without pulling in a client boundary.
 */
export const PRESS_BASE =
  "tap cursor-pointer select-none touch-manipulation " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "ease-[cubic-bezier(0.34,1.25,0.64,1)] active:scale-[0.96] active:opacity-90";

export const CTRL = PRESS_BASE;
