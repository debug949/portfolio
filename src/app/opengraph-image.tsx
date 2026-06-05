import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background: "#060a0f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#2f81f7",
            letterSpacing: "0.1em",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          veeresh-portfolio-dev.vercel.app
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#e6edf3",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          I build developer tools.
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#a0aab4",
            marginTop: "20px",
            lineHeight: 1.4,
          }}
        >
          Full-stack engineer · 15 · Telangana, India
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "36px",
          }}
        >
          {["ShipSafe", "Patchwork"].map((name) => (
            <div
              key={name}
              style={{
                fontSize: "15px",
                color: "#7d8590",
                background: "#161b22",
                border: "1px solid #21262d",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
