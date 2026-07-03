import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded social share card (used for Open Graph + Twitter).
export const alt = "Miflo — football games to play with your mates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#f5f2fc",
          backgroundImage:
            "radial-gradient(760px circle at 18% 8%, rgba(98,96,246,0.30), transparent 55%), radial-gradient(680px circle at 92% 96%, rgba(150,140,250,0.28), transparent 55%)",
          color: "#0d0d16",
          fontFamily: "Satoshi",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4a48d6",
          }}
        >
          Multiplayer football party game · iOS
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Football games you play with your mates.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
            {["Football Quiz", "Odd One Out", "Missing XI"].map((g, i) => (
              <div
                key={g}
                style={{
                  display: "flex",
                  fontSize: 28,
                  padding: "12px 24px",
                  borderRadius: 999,
                  backgroundColor: i === 0 ? "#6260f6" : "rgba(255,255,255,0.55)",
                  color: i === 0 ? "#ffffff" : "#5b5b6b",
                }}
              >
                {g}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 34,
          }}
        >
          <div style={{ display: "flex", letterSpacing: "-0.02em" }}>Miflo</div>
          <div style={{ display: "flex", fontSize: 26, color: "#5b5b6b" }}>
            miflo.dk
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
