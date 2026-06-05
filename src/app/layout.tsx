import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://veeresh-portfolio-site.vercel.app"),
  title: {
    default: "Veeresh — Full-Stack Engineer",
    template: "%s — Veeresh",
  },
  description:
    "15-year-old full-stack engineer from India. I build developer tools with Next.js, TypeScript, and PostgreSQL. Shipped ShipSafe and Patchwork.",
  openGraph: {
    type: "website",
    siteName: "Veeresh",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main style={{ paddingTop: "56px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
