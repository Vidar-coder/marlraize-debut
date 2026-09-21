import type { Metadata } from "next"
import { siteConfig } from "@/content/site"
import { TABLE_FINDER_PATH } from "@/lib/table-finder"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://paul-and-ana.weddinginvitationrsvp.com/"
const canonicalUrl = `${siteUrl.replace(/\/$/, "")}${TABLE_FINDER_PATH}`
const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut

export const metadata: Metadata = {
  title: "Find Your Table",
  description: `Search your name to find your table at ${debutName}'s debut.`,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: `Find Your Table | ${debutName}`,
    description: `Search your name to find your table at ${debutName}'s debut.`,
    url: canonicalUrl,
    siteName: `${debutName} Debut`,
    locale: "en_PH",
    type: "website",
  },
}

export default function TableFinderLayout({ children }: { children: React.ReactNode }) {
  return children
}
