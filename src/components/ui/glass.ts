/*
 * The frosted material, defined once so the nav pill and the content sheets
 * can't drift apart — and so the whole site's surface can be re-tinted from a
 * single place.
 *
 * Why it isn't black: the first pass used `neutral-950`, a pure neutral. Against
 * a saturated purple gradient a neutral black doesn't read as a dark surface —
 * it reads as a hole punched through the page, because it shares no hue with
 * anything around it. #191046 is the dark end of the gradient itself, so the
 * panels sit *in* the palette instead of on top of it.
 *
 * Why 85%: two constraints meet here. The nav is fixed and long pages scroll
 * underneath it, so anything thinner lets body text smear through the glass.
 * And `text-muted` (#a3a3a3) has to stay readable where the gradient is
 * lightest — over #efedff, 85% lands it at 4.73:1, just clear of 4.5:1. Going
 * more transparent breaks body copy on the privacy page.
 */

const TINT = "bg-[#191046]/85";

/** The floating nav pill. */
export const GLASS_PILL =
  `${TINT} border border-white/18 backdrop-blur-xl ` +
  "shadow-[0_8px_30px_rgba(0,0,0,0.35)]";

/** Content panels on the subpages. */
export const GLASS_SHEET =
  `${TINT} border border-white/15 backdrop-blur-xl ` +
  "shadow-[0_8px_40px_rgba(0,0,0,0.35)]";

/**
 * A rimmed inset block *inside* a sheet — form fields, the party-code plate,
 * the "at a glance" cells. Deliberately not another opaque layer: stacking a
 * second solid surface inside frosted glass reads as a box in a box.
 */
export const GLASS_INSET = "border border-white/12 bg-white/5";
