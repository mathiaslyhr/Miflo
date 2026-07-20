import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded social share card (used for Open Graph + Twitter).
export const alt = "Miflo — the football game for your group chat";
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
          backgroundColor: "#0b0b0f",
          backgroundImage:
            "radial-gradient(760px circle at 18% 8%, rgba(98,96,255,0.38), transparent 55%), radial-gradient(680px circle at 92% 96%, rgba(133,131,255,0.24), transparent 55%)",
          color: "#f5f5f5",
          fontFamily: "Satoshi",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8583ff",
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
            The football game for your group chat.
          </div>
          {/* Names come from the shipping catalog. This card used to advertise
              "Tenball" and "Heatmap", both renamed a while back. */}
          <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
            {["Hattrick", "Red Card", "Scout", "Top Bins", "Offside"].map(
              (g, i) => (
                <div
                  key={g}
                  style={{
                    display: "flex",
                    fontSize: 28,
                    padding: "12px 24px",
                    borderRadius: 999,
                    backgroundColor: i === 0 ? "#6260ff" : "#17171c",
                    border: i === 0 ? "1px solid #6260ff" : "1px solid #33333d",
                    color: i === 0 ? "#ffffff" : "#a3a3a3",
                  }}
                >
                  {g}
                </div>
              ),
            )}
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
          <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>
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
