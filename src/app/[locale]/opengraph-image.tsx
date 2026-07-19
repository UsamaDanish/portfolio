import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Usama Danish — Senior Full-Stack Engineer";

// Brand social card. Locale-independent content (Latin script) so it renders
// reliably without loading a script-specific font.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background:
            "radial-gradient(120% 90% at 82% 10%, rgba(11,92,255,0.35), transparent 55%), linear-gradient(160deg, #0A0B0D, #0E1117 55%, #0A0B0D)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "rgba(185,189,196,0.95)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#4D8DFF",
            }}
          />
          Senior Full-Stack Engineer · Berlin · 8+ years
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          I build products that stay fast when the data doesn&apos;t slow down.
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Usama Danish
        </div>
      </div>
    ),
    size,
  );
}
