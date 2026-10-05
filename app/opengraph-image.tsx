import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/seo"

export const runtime = "edge"
export const alt = "Maza Finance - Financial Freedom for New Generation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a3d2a 0%, #2E8B57 55%, #236B43 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "rgba(255,255,255,0.12)",
            fontSize: 40,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 28,
          }}
        >
          Rp
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, textAlign: "center" }}>
          MAZA FINANCE
        </div>
        <div style={{ fontSize: 34, fontWeight: 500, color: "#d3e8dc", marginTop: 12, textAlign: "center" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  )
}