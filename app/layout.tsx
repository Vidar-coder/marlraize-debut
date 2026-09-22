import type React from "react"
import type { Metadata, Viewport } from "next"
import { Great_Vibes, Inter, Imperial_Script, Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { siteConfig } from "@/content/site"
import { ClientLayout } from "@/components/client-layout"
import { LOADING_BG_PHOTOS } from "@/lib/loading-bg-photos"
import { anastasiaScript } from "@/lib/fonts"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marlraize-debut.vercel.app/"
const canonicalUrl = siteUrl.replace(/\/$/, "")
  const desktopHero = "/Details/LinkPreview.png"
const mobileHero = "/Details/LinkPreview.png"
const eventImageUrl = `${canonicalUrl}${desktopHero}`
const OG_IMAGE_FALLBACK = `${canonicalUrl}${desktopHero}`

const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`
const eventTitle = `${coupleNames} - Debut Invitation`
const eventDescription = `Celebrate the debut of ${siteConfig.couple.debutNickname} on ${siteConfig.wedding.date} at ${siteConfig.ceremony.venue}. RSVP, explore their story, and find everything you need to join the celebration.`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${siteConfig.couple.debutNickname} Debut`,
  startDate: "2026-10-10T16:00:00+08:00",
  endDate: "2026-10-10T21:00:00+08:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: siteConfig.ceremony.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.ceremony.venue,
        addressLocality: siteConfig.ceremony.location,
        addressRegion: siteConfig.ceremony.location,
        addressCountry: "PH",
      },
    },
    {
      "@type": "Place",
      name: siteConfig.reception.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.reception.location,
        addressLocality: siteConfig.reception.location,
        addressRegion: siteConfig.reception.location,
        addressCountry: "PH",
      },
    },
  ],
  image: [OG_IMAGE_FALLBACK],
  description:
    `You're invited to celebrate the debut of ${siteConfig.couple.debutNickname}. Discover ceremony and reception details, RSVP, and explore their story.`,
  organizer: {
    "@type": "Person",
    name: coupleNames,
  },
  eventHashtag: `#${siteConfig.couple.debutNickname}Debut`,
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cinzel" })
const brittany = localFont({
  src: "../Font/brittany-signature-script/BrittanySignatureScript.ttf",
  variable: "--font-brittany",
  display: "swap",
})

const playlistScript = localFont({
  src: "../Font/playlist-script/Playlist Script.otf",
  variable: "--font-playlist-script",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: eventTitle,
    template: `%s | ${coupleNames}`,
  },
  description: eventDescription,
  keywords:
    `${siteConfig.couple.debutNickname} debut, ${siteConfig.ceremony.venue} debut, ${siteConfig.reception.venue} debut, debut invitation, RSVP, debut gallery, message wall, love story, #${siteConfig.couple.debutNickname}Debut`,
  applicationName: `${coupleNames} Debut Invitation`,
  authors: [
    { name: siteConfig.couple.debutNickname },
  ],
  creator: siteConfig.couple.debutNickname,
  publisher: siteConfig.couple.debutNickname,
  category: "Event",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: canonicalUrl,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/favicon_io/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon_io/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: `${siteConfig.couple.debutNickname} | ${siteConfig.wedding.date}`,
    description:
      `Celebrate the debut of ${siteConfig.couple.debutNickname} on ${siteConfig.wedding.date}. Discover their story, RSVP, and find important details for the ceremony and reception.`,
    url: canonicalUrl,
    siteName: `${siteConfig.couple.debutNickname} Debut`,
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: OG_IMAGE_FALLBACK,
        secureUrl: OG_IMAGE_FALLBACK,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${siteConfig.couple.debutNickname} Debut Invitation - ${siteConfig.wedding.date}`,
      },
      {
        url: OG_IMAGE_FALLBACK,
        secureUrl: OG_IMAGE_FALLBACK,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${siteConfig.couple.debutNickname} Debut Invitation - ${siteConfig.wedding.date}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.couple.debutNickname} Debut Invitation`,
    description:
      `You're invited to the debut of ${siteConfig.couple.debutNickname} on ${siteConfig.wedding.date}. RSVP, explore their story, and get all the details for the big day! #${siteConfig.couple.debutNickname}Debut`,
    images: [OG_IMAGE_FALLBACK, eventImageUrl ],
    creator: `@${siteConfig.couple.debutNickname}`,
    site: `@${siteConfig.couple.debutNickname}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: siteConfig.couple.debutNickname,
    statusBarStyle: "default",
    capable: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#D2A4A4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#D2A4A4" />
        <meta name="format-detection" content="telephone=yes,email=no,address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <link
          rel="preload"
          href="/fonts/AnastasiaScript.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AnastasiaScript Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {LOADING_BG_PHOTOS.slice(0, 3).map((href, index) => (
          <link
            key={href}
            rel="preload"
            as="image"
            href={href}
            type="image/webp"
            {...(index === 0 ? { fetchPriority: "high" as const } : {})}
          />
        ))}
        <link rel="preload" as="image" href={mobileHero} media="(max-width: 767px)" />
        <link rel="preload" as="image" href={desktopHero} media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/Details/venue.png" />
        <link rel="preload" as="image" href="/Details/venue2.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} ${cinzel.variable} ${brittany.variable} ${playlistScript.variable} ${anastasiaScript.variable} font-inter antialiased text-foreground`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}