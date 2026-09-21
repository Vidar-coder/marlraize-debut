"use client"

import { useEffect, useState } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import Image from "next/image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const WHITE = "#FFFFFF"
const IVORY = "#FDECE6"
const ROSE = "#E6A39B"
const COCOA = "#976C58"
const NAV_GOLD =
  "linear-gradient(180deg, #E6A39B 0%, #C89E8C 52%, #976C58 100%)"
const ROSE_BORDER = "color-mix(in srgb, #E6A39B 38%, transparent)"
const ROSE_BORDER_SOFT = "color-mix(in srgb, #E6A39B 22%, transparent)"

const OUTSIDE_TEXT = WHITE
const OUTSIDE_TEXT_MUTED = "rgb(255 255 255 / 88%)"
const OUTSIDE_TITLE_SHADOW =
  "0 1px 0 rgb(42 34 28 / 42%), 0 2px 10px rgb(42 34 28 / 38%), 0 8px 28px rgb(42 34 28 / 28%)"
const READABLE_SHADOW =
  "0 1px 1px rgb(42 34 28 / 45%), 0 2px 10px rgb(42 34 28 / 32%)"

const palette = {
  body: COCOA,
  heading: COCOA,
  label: ROSE,
  accent: ROSE,
} as const

const outsideDividerLineStyle = {
  background: "linear-gradient(to right, transparent, rgb(255 255 255 / 70%), transparent)",
} as const

const insideDividerLineStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  label: sectionType.label,
  cardTitle: `${sectionType.subheader} lg:text-xl`,
  btn: sectionType.label,
} as const

const cardStyle = {
  background: IVORY,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: ROSE_BORDER,
  boxShadow:
    "0 10px 28px color-mix(in srgb, #E6A39B 12%, transparent), inset 0 1px 0 rgb(253 236 230 / 70%)",
} as const

const QR_FG = COCOA

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-white/50 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(255, 255, 255, 0.55), transparent)",
        }}
      />
    </div>
  )
}

function InsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={insideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: ROSE }} aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background: "linear-gradient(to left, transparent, #E6A39B, transparent)",
        }}
      />
    </div>
  )
}

function SnapShareTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
          "--script-overlap": layeredSectionTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: OUTSIDE_TEXT,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        Snap and Share
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: OUTSIDE_TEXT_MUTED,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        for her debut
      </span>
      <span className="sr-only">for her debut</span>
    </h2>
  )
}

function ContentCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
        aria-hidden
      />
      <div className="relative z-20 flex flex-col gap-3 px-4 py-5 sm:gap-4 sm:px-5 sm:py-6 md:px-6 md:py-7">
        {children}
      </div>
    </div>
  )
}

function PrimaryButton({
  onClick,
  children,
  className = "",
  active = false,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cinzel.className} group relative inline-flex items-center justify-center gap-1.5 rounded-sm border px-5 py-2.5 font-semibold uppercase tracking-[0.18em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn} ${className}`}
      style={
        active
          ? {
              background: COCOA,
              borderColor: "transparent",
              color: WHITE,
            }
          : {
              background: NAV_GOLD,
              borderColor: "transparent",
              color: WHITE,
            }
      }
      onMouseEnter={(e) => {
        if (active) return
        e.currentTarget.style.background = COCOA
      }}
      onMouseLeave={(e) => {
        if (active) return
        e.currentTarget.style.background = NAV_GOLD
      }}
    >
      {children}
    </button>
  )
}

export function SnapShare() {
  const siteConfig = useSiteConfig()
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const debutNickname = siteConfig.couple.debutNickname || siteConfig.couple.debut
  const debutDisplayName = debutNickname
  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const uploadLink = siteConfig.snapShare.googleDriveLink
  const hashtags = siteConfig.snapShare.hashtag
  const allHashtagsText = hashtags.join(" ")
  const sanitizedDebutName = debutNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${debutDisplayName}'s eighteenth. Open her debut invitation and share your memories: ${websiteUrl} ${allHashtagsText}`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: "https://www.instagram.com/",
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: "https://www.tiktok.com/",
    }

    const target = urls[platform]
    if (target) window.open(target, "_blank", "width=600,height=400")
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedDebutName.toLowerCase()}-debut-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadAlbumQRCode = () => {
    const canvas = document.getElementById("album-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "album-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyUploadLink = async () => {
    if (!uploadLink) return
    try {
      await navigator.clipboard.writeText(uploadLink)
      setCopiedDriveLink(true)
      setTimeout(() => setCopiedDriveLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <section
      id="snap-share"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
    >
      <div className="relative z-20 mx-auto max-w-6xl px-4 @container/snap-share sm:px-6 md:px-8">
        <div className="relative z-20 px-6 text-center sm:px-10 md:px-12">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <SnapShareTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
            style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
          >
            Capture the little moments of {debutDisplayName}&apos;s debut — every smile, embrace,
            and candid laugh. Your photos help keep this eighteenth.
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-2 lg:gap-8 md:mt-10">
          <ContentCard className="lg:order-1">
            <h4
              className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
              style={{ color: palette.heading }}
            >
              Favorite Moments
            </h4>
            <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3">
              <div className="relative aspect-square overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: ROSE_BORDER_SOFT }}>
                <Image
                  src="/envelope/box (1).jpeg"
                  alt="Debut moment 1"
                  fill
                  className="object-cover"
                  style={{ imageOrientation: "from-image" }}
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: ROSE_BORDER_SOFT }}>
                <Image
                  src="/envelope/box (5).jpeg"
                  alt="Debut moment 2"
                  fill
                  className="object-cover"
                  style={{ imageOrientation: "from-image" }}
                />
              </div>
              <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: ROSE_BORDER_SOFT }}>
                <Image
                  src="/desktop-background/new-debut (1).webp"
                  alt="Debut moment 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p
              className={`font-goudy-italic ${ct.body} text-center`}
              style={{ color: palette.body }}
            >
              Share your snapshots to be featured in her keepsake gallery.
            </p>
          </ContentCard>

          <div className="w-full min-w-0 space-y-5 sm:space-y-6 lg:order-2">
           <ContentCard>
              <h4
                className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share Her Debut Website
              </h4>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Spread the word about {debutDisplayName}&apos;s debut. Share this QR so friends
                and family may open her invitation.
              </p>
              <div className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-xl border bg-white p-3 shadow-sm sm:p-4" style={{ borderColor: ROSE_BORDER_SOFT }}>
                <div className="flex w-full max-w-full justify-center overflow-visible">
                  <QRCodeCanvas
                    id="snapshare-qr"
                    value={websiteUrl}
                    size={isMobile ? 160 : 200}
                    includeMargin
                    className="h-auto max-w-full bg-white"
                    fgColor={QR_FG}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <PrimaryButton onClick={downloadQRCode}>
                  <Download className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                  Download QR
                </PrimaryButton>
              </div>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Scan with any camera app to open her invitation.
              </p>
            </ContentCard> 

            <ContentCard>
              <h5
                className={`${cinzel.className} ${ct.body} text-center font-semibold uppercase tracking-[0.1em]`}
                style={{ color: palette.heading }}
              >
                Debut Hashtags
              </h5>
              <div className="w-full min-w-0 space-y-2">
                {hashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => copyHashtag(hashtag, index)}
                    className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2.5 transition-all duration-200 active:scale-[0.98]"
                    style={
                      copiedHashtagIndex === index
                        ? {
                            borderColor: ROSE,
                            backgroundColor: "color-mix(in srgb, #E6A39B 12%, white)",
                          }
                        : {
                            borderColor: ROSE_BORDER_SOFT,
                            backgroundColor: IVORY,
                          }
                    }
                  >
                    <span
                      className={`font-goudy-italic ${ct.body} min-w-0 flex-1 break-all text-left font-semibold`}
                      style={{
                        color: copiedHashtagIndex === index ? palette.accent : palette.body,
                      }}
                    >
                      {hashtag}
                    </span>
                    <span
                      className={`${cinzel.className} flex flex-shrink-0 items-center gap-1 whitespace-nowrap ${sectionType.label} font-semibold uppercase tracking-wider`}
                      style={{
                        color: copiedHashtagIndex === index ? palette.accent : palette.label,
                      }}
                    >
                      {copiedHashtagIndex === index ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copyAllHashtags}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border py-2.5 transition-all duration-200 active:scale-[0.98]"
                style={
                  copiedAllHashtags
                    ? {
                        borderColor: ROSE,
                        backgroundColor: "color-mix(in srgb, #E6A39B 12%, white)",
                        color: ROSE,
                      }
                    : {
                        borderColor: ROSE_BORDER,
                        backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${ROSE})`,
                        color: COCOA,
                      }
                }
              >
                {copiedAllHashtags ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className={`${cinzel.className} ${ct.btn} font-semibold uppercase tracking-[0.1em]`}>
                  {copiedAllHashtags ? "All Copied!" : "Copy All"}
                </span>
              </button>
            </ContentCard> 

            <ContentCard>
              <h5
                className={`${cinzel.className} ${ct.cardTitle} text-center font-semibold uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share on Social Media
              </h5>
              <p
                className={`font-goudy-italic ${ct.body} text-center`}
                style={{ color: palette.body }}
              >
                Share a glimpse of {debutDisplayName}&apos;s debut on your favorite platforms.
              </p>
              <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {(
                  [
                    { platform: "instagram" as const, Icon: Instagram, label: "Instagram" },
                    { platform: "facebook" as const, Icon: Facebook, label: "Facebook" },
                    { platform: "tiktok" as const, Icon: Share2, label: "TikTok" },
                    { platform: "twitter" as const, Icon: Twitter, label: "Twitter" },
                  ] as const
                ).map(({ platform, Icon, label }) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => shareOnSocial(platform)}
                    className="group flex w-full min-w-0 items-center justify-center gap-2 rounded-lg border bg-white px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
                    style={{ borderColor: ROSE_BORDER_SOFT }}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" style={{ color: palette.accent }} />
                    <span
                      className={`${cinzel.className} ${ct.btn} truncate font-semibold uppercase tracking-[0.08em]`}
                      style={{ color: palette.heading }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </ContentCard> 

            {uploadLink && (
              <ContentCard>
                <p
                  className={`${cinzel.className} ${ct.label} w-full rounded-full border px-3 py-1.5 text-center uppercase leading-snug tracking-[0.14em] sm:tracking-[0.18em] break-words`}
                  style={{
                    color: palette.label,
                    borderColor: ROSE_BORDER,
                    backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${ROSE})`,
                  }}
                >
                  Upload Your Photos &amp; Videos
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} break-words text-center`}
                  style={{ color: palette.body }}
                >
                  {siteConfig.snapShare.instructions}
                </p>
                <div className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-xl border bg-white p-3 shadow-sm sm:p-4" style={{ borderColor: ROSE_BORDER_SOFT }}>
                  <div className="flex w-full max-w-full justify-center overflow-visible">
                    <QRCodeCanvas
                      id="album-qr"
                      value={uploadLink}
                      size={isMobile ? 160 : 200}
                      level="H"
                      includeMargin
                      className="h-auto max-w-full bg-white"
                      fgColor={QR_FG}
                    />
                  </div>
                  <p
                    className={`font-goudy-italic ${ct.body} mt-2 text-center sm:mt-3`}
                    style={{ color: palette.label }}
                  >
                    Scan with your camera app
                  </p>
                </div>
                <div className="mx-auto flex items-center justify-center pt-1 sm:pt-2">
                  <InsideDivider />
                </div>
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <PrimaryButton onClick={copyUploadLink} active={copiedDriveLink}>
                    {copiedDriveLink ? (
                      <Check className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    )}
                    {copiedDriveLink ? "Copied!" : "Copy Link"}
                  </PrimaryButton>
                  <PrimaryButton onClick={downloadAlbumQRCode}>
                    <Download className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Download QR
                  </PrimaryButton>
                  <a
                    href={uploadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cinzel.className} group relative inline-flex items-center justify-center gap-1.5 rounded-sm border px-5 py-2.5 font-semibold uppercase tracking-[0.18em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn}`}
                    style={{
                      backgroundColor: IVORY,
                      borderColor: ROSE_BORDER,
                      color: palette.heading,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "color-mix(in srgb, #E6A39B 12%, white)"
                      e.currentTarget.style.borderColor = ROSE
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = IVORY
                      e.currentTarget.style.borderColor = ROSE_BORDER
                    }}
                  >
                    <Share2 className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Upload Photos
                  </a>
                </div>
              </ContentCard>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2 text-center sm:mt-8 md:mt-10">
          <p
            className={`font-goudy-italic ${ct.bodyLg}`}
            style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
          >
            Thank you for helping make {debutDisplayName}&apos;s debut memorable.
            Your photos become part of her eighteenth.
          </p>
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] sm:tracking-[0.2em]`}
            style={{ color: OUTSIDE_TEXT, textShadow: READABLE_SHADOW }}
          >
            Thank you for sharing her joy
          </p>
        </div>
      </div>
    </section>
  )
}
