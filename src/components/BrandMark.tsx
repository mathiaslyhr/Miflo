/*
 * The Miflo "m." mark, rendered white.
 *
 * The source asset (src/app/icon.png, reused as public/logo-mark.png) is a
 * black m with a purple dot, drawn for a light app-icon tile. Both colours fail
 * here: black vanishes into the dark end of the gradient, and a purple dot on a
 * purple page is invisible.
 *
 * So the PNG is used as a CSS mask rather than an image — only its alpha
 * silhouette is kept, and the fill comes from `background-color`. That gives a
 * clean monochrome mark that holds up anywhere on the ramp, and it re-colours
 * by changing one property instead of shipping a second asset.
 */
export function BrandMark({
  size = 30,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block bg-white ${className}`}
      style={{
        width: size,
        height: size,
        maskImage: "url(/logo-mark.png)",
        WebkitMaskImage: "url(/logo-mark.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
