import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/CustomCursor"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://veeresh-portfolio-dev.vercel.app"),
  title: {
    default: "Veeresh — Full-Stack Engineer",
    template: "%s — Veeresh",
  },
  description:
    "15-year-old full-stack engineer from India. I build developer tools with Next.js, TypeScript, and PostgreSQL. Shipped ShipSafe and Patchwork.",
  openGraph: { type: "website", siteName: "Veeresh" },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <CustomCursor />
        <Nav />
        <main style={{ paddingTop: "56px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
