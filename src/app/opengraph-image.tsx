import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MIFLO_PALETTE } from "@/lib/palette";

// Social share card (used for Open Graph + Twitter). It mirrors the homepage:
// the same gradient, the same three nested circles, the same one line of copy —
// so a shared link previews as the page it opens.
export const alt = "Miflo — football games for you and your friends";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Satori (which renders this) supports linear-gradient and border-radius but
 * not `box-shadow`, so the circles can't carry the white Fresnel rim the live
 * hero uses. A 3px semi-transparent white border stands in for it — same read
 * at this size, and it survives the renderer.
 *
 * Positions are the desktop geometry from CirclesHero, converted from vw/vh to
 * this 1200×630 frame.
 */
const CIRCLES = [
  { size: 1740, cx: 960, cy: 252 },
  { size: 936, cx: 876, cy: 315 },
  { size: 660, cx: 864, cy: 315 },
];

export default async function OpengraphImage() {
  const satoshi = await readFile(
    join(process.cwd(), "src/fonts/Satoshi-Medium.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage: MIFLO_PALETTE.bg,
          fontFamily: "Satoshi",
        }}
      >
        {CIRCLES.map((c) => (
          <div
            key={c.size}
            style={{
              position: "absolute",
              left: c.cx - c.size / 2,
              top: c.cy - c.size / 2,
              width: c.size,
              height: c.size,
              borderRadius: c.size,
              backgroundImage: MIFLO_PALETTE.circle,
              border: "3px solid rgba(255,255,255,0.55)",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 80,
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", fontSize: 40, letterSpacing: "-0.02em" }}>
            Miflo
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: 820,
              }}
            >
              Football games for you and your friends.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Free on iPhone · miflo.dk
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Satoshi", data: satoshi, weight: 500, style: "normal" }],
    },
  );
}
