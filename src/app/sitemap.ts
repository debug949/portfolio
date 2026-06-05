import { MetadataRoute } from "next"
import { PORTFOLIO_URL } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: PORTFOLIO_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${PORTFOLIO_URL}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${PORTFOLIO_URL}/projects`, lastModified: new Date(), priority: 0.9 },
    { url: `${PORTFOLIO_URL}/projects/shipsafe`, lastModified: new Date(), priority: 0.8 },
    { url: `${PORTFOLIO_URL}/projects/patchwork`, lastModified: new Date(), priority: 0.8 },
    { url: `${PORTFOLIO_URL}/resume`, lastModified: new Date(), priority: 0.7 },
  ]
}
