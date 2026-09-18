"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import { motion } from "motion/react"
import localFont from "next/font/local"
import { Instagram, Twitter, Facebook, Music2 } from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType } from "@/lib/section-typography"
import { Cinzel } from "next/font/google"
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

const IVORY = "#FDECE6"
const ROSE = "#E6A39B"
const COCOA = "#976C58"
const SAGE = "#A5B29A"

const palette = {
  body: COCOA,
  heading: COCOA,
  label: ROSE,
  accent: ROSE,
} as const

const dividerLineStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px] select-none"

const sectionBackground = `
  radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, #F4CFC8 42%, transparent) 0%, transparent 55%),
  radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${SAGE} 14%, transparent) 0%, transparent 58%),
  radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${ROSE} 16%, transparent) 0%, transparent 55%),
  linear-gradient(180deg, ${IVORY} 0%, #FCE7E1 48%, ${IVORY} 100%)
`.trim()

const ct = {
  label: sectionType.label,
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  title: `${sectionType.subheader} lg:text-3xl`,
  cardTitle: sectionType.subheader,
} as const

const cardStyle = {
  background: IVORY,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, #E6A39B 38%, transparent)",
  boxShadow:
    "0 10px 28px color-mix(in srgb, #E6A39B 12%, transparent), inset 0 1px 0 rgb(253 236 230 / 70%)",
} as const

const socialLinkStyle = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, #E6A39B 38%, transparent)",
  backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${ROSE})`,
  color: ROSE,
  boxShadow: "0 4px 12px color-mix(in srgb, #E6A39B 12%, transparent)",
} as const

const FOOTER_QUOTES = [
  `"She is clothed with strength and dignity, and she laughs without fear of the future." – Proverbs 31:25`,
  "Welcome to her debut. This evening is a blessing, and we give thanks for every guest who walks with her into eighteen.",
  "Thank you for your love, prayers, and presence. We can't wait to celebrate her eighteenth with you.",
] as const

const LONGEST_FOOTER_QUOTE = FOOTER_QUOTES.reduce((longest, quote) =>
  quote.length > longest.length ? quote : longest
)

function FooterDebutName({ name }: { name: string }) {
  return (
    <h2
      className={`${cinzel.className} mx-auto whitespace-nowrap text-center ${sectionType.subheader} font-semibold tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.18em]`}
      style={{ color: COCOA }}
    >
      {name}
    </h2>
  )
}

function FooterCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full min-w-0 rounded-xl sm:rounded-2xl backdrop-blur-xl sm:backdrop-blur-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
        aria-hidden
      />
      <div className="relative z-[1] min-w-0">{children}</div>
    </div>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="space-y-0.5">
      <p
        className={`${cinzel.className} ${ct.label} uppercase tracking-[0.14em] font-semibold`}
        style={{ color: palette.label }}
      >
        {label}
      </p>
      <p className={`font-goudy-italic ${ct.body}`} style={{ color: palette.body }}>
        {value}
      </p>
    </div>
  )
}

export function Footer() {
  const siteConfig = useSiteConfig()
  const year = new Date().getFullYear()
  const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut
  const debutDate = siteConfig.wedding.date
  const debutVenue = siteConfig.wedding.venue || "Smallville"

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => setIsPaused(false), 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      }
      setIsDeleting(false)
      setCurrentQuoteIndex((prev) => (prev + 1) % FOOTER_QUOTES.length)
      return
    }

    const currentQuote = FOOTER_QUOTES[currentQuoteIndex]
    if (displayedText.length < currentQuote.length) {
      const typeTimeout = setTimeout(() => {
        setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(typeTimeout)
    }

    setIsPaused(true)
    setIsDeleting(true)
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.15 } },
  }

  const nav = useMemo(
    () =>
      [
        { label: "Home", href: "#home" },
        { label: "Details", href: "#details" },
        { label: "Gallery", href: "#gallery" },
        { label: "RSVP", href: "#guest-list" },
        { label: "Messages", href: "#messages" },
      ] as const,
    []
  )

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full overflow-hidden`}
      style={{ background: sectionBackground }}
    >
      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/deco/top-left-corner.png"
          alt=""
          aria-hidden="true"
          className={CORNER_DECO_CLASS}
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/deco/top-right-corner.png"
          alt=""
          aria-hidden="true"
          className={CORNER_DECO_CLASS}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/deco/bottom-left-corner.png"
          alt=""
          aria-hidden="true"
          className={CORNER_DECO_CLASS}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/deco/bottom-right-corner.png"
          alt=""
          aria-hidden="true"
          className={CORNER_DECO_CLASS}
        />
      </div>

      <footer className="relative z-20 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14">
        {/* Monogram + couple header */}
        <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8 md:mb-10 px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <Image
                src={siteConfig.couple.monogram}
                alt={`${debutName} monogram`}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="mt-4 max-w-md text-center sm:mt-5 md:mt-6">
            <FooterDebutName name={debutName} />
            <p
              className={`font-goudy-italic mt-2 sm:mt-3 ${sectionType.text}`}
              style={{ color: COCOA }}
            >
              {debutDate}
            </p>
          </div>

          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 @container/footer sm:px-6 md:px-8 pb-4 sm:pb-6 min-w-0">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10 items-start"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Debut info + quote */}
            <motion.div className="lg:col-span-2 min-w-0" variants={fadeInUp}>
              <div className="mb-5 sm:mb-6">
                <h3
                  className={`${cinzel.className} ${ct.title} font-semibold leading-tight mb-4`}
                  style={{ color: palette.heading }}
                >
                  {debutName}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <DetailRow label="Debut Date" value={debutDate} />
                  <DetailRow label="Venue" value={debutVenue} />
                </div>
              </div>

              <FooterCard>
                <p
                  className={`${cinzel.className} ${ct.label} uppercase tracking-[0.14em] font-semibold mb-3`}
                  style={{ color: palette.label }}
                >
                  A Note for Her Evening
                </p>
                <blockquote className={`relative font-goudy-italic ${ct.bodyLg}`}>
                  <span className="invisible block select-none" aria-hidden="true">
                    &ldquo;{LONGEST_FOOTER_QUOTE}&rdquo;
                  </span>
                  <span
                    className="absolute inset-0"
                    style={{ color: palette.body }}
                    aria-live="polite"
                  >
                    &ldquo;{displayedText}
                    <span
                      className="ml-1 inline-block h-4 w-0.5 animate-pulse align-middle sm:h-5"
                      style={{ backgroundColor: ROSE }}
                    />
                    &rdquo;
                  </span>
                </blockquote>
                <div className="flex items-center gap-1.5 mt-3 sm:mt-4">
                  {FOOTER_QUOTES.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-opacity"
                      style={{
                        backgroundColor: palette.accent,
                        opacity: i === currentQuoteIndex ? 1 : 0.35,
                      }}
                    />
                  ))}
                </div>
              </FooterCard>
            </motion.div>

            {/* RSVP + event info */}
            <motion.div className="space-y-4 sm:space-y-5 min-w-0" variants={fadeInUp}>
              <FooterCard>
                <h4 className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3`} style={{ color: palette.heading }}>
                  RSVP Deadline
                </h4>
                <div className="space-y-2">
                  <DetailRow label="Please respond by" value={siteConfig.details.rsvp.deadline} />
                  <p className={`font-goudy-italic ${ct.body} opacity-90`} style={{ color: palette.body }}>
                    Please confirm if you will be at her debut.
                  </p>
                </div>
              </FooterCard>
            </motion.div>

            {/* Social + links */}
            <motion.div className="space-y-5 sm:space-y-6 min-w-0" variants={fadeInUp}>
              <div>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3 sm:mb-4 flex items-center gap-2`}
                  style={{ color: palette.heading }}
                >
                  <span
                    className="h-6 w-1.5 flex-shrink-0 rounded-full sm:h-7"
                    style={{ backgroundColor: ROSE }}
                  />
                  Follow Along
                </h4>
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  {(
                    [
                      { href: "https://www.facebook.com", Icon: Facebook, label: "Facebook" },
                      { href: "https://www.instagram.com/", Icon: Instagram, label: "Instagram" },
                      { href: "https://www.youtube.com", Icon: Music2, label: "YouTube" },
                      { href: "https://x.com/", Icon: Twitter, label: "Twitter" },
                    ] as const
                  ).map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 sm:h-11 sm:w-11"
                      style={socialLinkStyle}
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h5
                  className={`${cinzel.className} ${ct.label} font-semibold mb-2.5 sm:mb-3 uppercase tracking-[0.14em]`}
                  style={{ color: palette.label }}
                >
                  Quick Links
                </h5>
                <div className="space-y-1.5 sm:space-y-2">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`font-goudy-italic block ${ct.body} transition-colors duration-200 hover:opacity-80`}
                      style={{ color: palette.body }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="pt-6 sm:pt-8 border-t"
            style={{
              borderColor: "color-mix(in srgb, #E6A39B 38%, transparent)",
            }}
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-center md:text-left min-w-0">
                <p className={`font-goudy-italic ${ct.body}`} style={{ color: palette.body }}>
                  © {year} {debutName} — crafted with love and gratitude for her eighteenth.
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} mt-1 opacity-90`}
                  style={{ color: palette.body }}
                >
                  This invitation was designed to share her debut with you.
                </p>
              </div>
              <div className="min-w-0 space-y-1 text-center md:text-right">
                <p className={`font-goudy-italic ${ct.body} opacity-90`} style={{ color: palette.body }}>
                  Developed by{" "}
                  <a
                    href="https://lance28-beep.github.io/portfolio-website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline transition-colors hover:opacity-80"
                    style={{ color: palette.accent }}
                  >
                    Lance Valle
                  </a>
                </p>
                <p className={`font-goudy-italic ${ct.body} opacity-90`} style={{ color: palette.body }}>
                  Want a website like this? Visit{" "}
                  <a
                    href="https://www.facebook.com/WeddingInvitationNaga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold transition-colors hover:opacity-80"
                    style={{ color: palette.accent }}
                  >
                    Wedding Invitation Naga
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
