"use client"

import { Section } from "@/components/section"
import { useEffect, useState, type ReactNode } from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType } from "@/lib/section-typography"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { QRCodeSVG } from "qrcode.react"
import {
  Shirt,
  MapPin,
  Heart,
  Navigation,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

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

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px] select-none"

const IVORY = "#FDECE6"
const ROSE = "#E6A39B"
const COCOA = "#976C58"
const SAGE = "#A5B29A"
const ROSE_BORDER = "color-mix(in srgb, #E6A39B 38%, transparent)"
const ROSE_BORDER_SOFT = "color-mix(in srgb, #E6A39B 22%, transparent)"
const NAV_ROSE = "linear-gradient(180deg, #E6A39B 0%, #C89E8C 52%, #976C58 100%)"
const WHITE = "#FFFFFF"
const QR_FG = COCOA
const QR_BG = IVORY

const VENUE = {
  name: "Smallville 21 Hotel",
  address: "Smallville Complex G. T, Glicerio Pison Ave, Mandurriao, Iloilo City",
  mapsLink: "https://maps.app.goo.gl/Z1LCEXWvzHVdGjgF9",
  images: ["/Details/venue.png", "/Details/venue2.png"],
} as const

const sectionBackground = `
  radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, #F4CFC8 42%, transparent) 0%, transparent 55%),
  radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${SAGE} 14%, transparent) 0%, transparent 58%),
  radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${ROSE} 16%, transparent) 0%, transparent 55%),
  linear-gradient(180deg, ${IVORY} 0%, #FCE7E1 48%, ${IVORY} 100%)
`.trim()

const roseDividerStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const roseDividerStyleLeft = {
  background: "linear-gradient(to left, transparent, #E6A39B, transparent)",
} as const

const cardStyle = {
  background: IVORY,
  borderColor: ROSE_BORDER,
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 10px 28px color-mix(in srgb, #E6A39B 12%, transparent), inset 0 1px 0 rgb(253 236 230 / 70%)",
} as const

const softPanelStyle = {
  borderColor: ROSE_BORDER_SOFT,
  backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${ROSE})`,
} as const

function SectionIconDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-1 sm:pt-2">
      <span className="h-px w-6 sm:w-10" style={roseDividerStyle} />
      {icon}
      <span className="h-px w-6 sm:w-10" style={roseDividerStyleLeft} />
    </div>
  )
}

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={roseDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: ROSE }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={roseDividerStyleLeft} />
    </div>
  )
}

const detailsTitleSize = {
  main: "clamp(1.65rem, 8.5vw, 4.5rem)",
  script: "clamp(0.95rem, 4.8vw, 2.7rem)",
} as const

function DetailsTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": detailsTitleSize.main,
          "--script-size": detailsTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Event Details — her debut day</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: COCOA,
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: ROSE,
          textShadow:
            "0 1px 0 color-mix(in srgb, #FDECE6 95%, white), 0 0 10px color-mix(in srgb, #FDECE6 65%, white)",
        }}
      >
        her debut day
      </span>
    </h2>
  )
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-sm sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  sectionTitle: "text-base sm:text-lg md:text-xl lg:text-2xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-sm sm:text-base md:text-base lg:text-lg",
  btn: "text-[11px] sm:text-xs md:text-sm",
} as const

function VenueDisplay({ date, time }: { date: string; time: string }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const imageCount = VENUE.images.length

  useEffect(() => {
    const id = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % imageCount)
    }, 4500)
    return () => window.clearInterval(id)
  }, [imageCount])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${VENUE.name}, ${VENUE.address}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const openDirections = () => {
    window.open(VENUE.mapsLink, "_blank", "noopener,noreferrer")
  }

  const showPrevious = () => {
    setImageIndex((current) => (current - 1 + imageCount) % imageCount)
  }

  const showNext = () => {
    setImageIndex((current) => (current + 1) % imageCount)
  }

  return (
    <div className="relative z-20 mx-auto mb-8 max-w-4xl px-4 sm:mb-10 sm:px-6 md:mb-12">
      <div className="relative overflow-hidden rounded-xl border sm:rounded-2xl" style={cardStyle}>
        <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80 lg:h-96">
          {VENUE.images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={
                index === 0
                  ? "Dining hall at Smallville 21 Hotel"
                  : "Exterior of Smallville 21 Hotel"
              }
              fill
              className={`object-cover object-center transition-opacity duration-700 ${
                index === imageIndex ? "z-[1] opacity-100" : "z-0 pointer-events-none opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              priority={index === 0}
            />
          ))}

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-[color-mix(in_srgb,#FDECE6_88%,white)] shadow-sm transition-transform hover:scale-105 sm:h-10 sm:w-10"
            style={{ borderColor: ROSE_BORDER, color: COCOA }}
            aria-label="Previous venue photo"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-[color-mix(in_srgb,#FDECE6_88%,white)] shadow-sm transition-transform hover:scale-105 sm:h-10 sm:w-10"
            style={{ borderColor: ROSE_BORDER, color: COCOA }}
            aria-label="Next venue photo"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {VENUE.images.map((src, index) => (
              <button
                key={`dot-${src}`}
                type="button"
                onClick={() => setImageIndex(index)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === imageIndex ? "1.15rem" : "0.4rem",
                  background: index === imageIndex ? ROSE : "rgb(253 236 230 / 80%)",
                }}
                aria-label={`Show venue photo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <SectionIconDivider
            icon={
              <MapPin
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: ROSE }}
                aria-hidden
              />
            }
          />
          <p
            className={`${cinzel.className} ${ct.label} mt-3 text-center font-semibold uppercase tracking-[0.22em] sm:mt-4`}
            style={{ color: ROSE }}
          >
            Venue
          </p>
          <h3
            className={`${theSeasons.className} mt-2 text-center text-2xl font-semibold uppercase leading-tight tracking-[0.12em] sm:text-3xl sm:tracking-[0.16em] md:text-4xl`}
            style={{ color: COCOA }}
          >
            {VENUE.name}
          </h3>
          <p
            className={`${cinzel.className} mt-3 text-center text-sm font-semibold uppercase tracking-[0.16em] sm:mt-4 sm:text-base`}
            style={{ color: COCOA }}
          >
            {date}
            {time ? ` · ${time}` : ""}
          </p>

          <div className="mt-5 rounded-xl border p-3 sm:mt-6 sm:p-4 md:p-5" style={softPanelStyle}>
            <div className="flex items-start gap-3 sm:gap-4">
              <MapPin
                className="mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                style={{ color: ROSE }}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`${cinzel.className} ${ct.label} mb-1.5 font-semibold uppercase tracking-wide`}
                  style={{ color: ROSE }}
                >
                  Location
                </p>
                <p
                  className={`${theSeasons.className} ${ct.body} leading-relaxed tracking-[0.03em]`}
                  style={{ color: COCOA }}
                >
                  {VENUE.address}
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
                <a
                  href={VENUE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border p-1.5 shadow-sm sm:p-2"
                  style={{
                    backgroundColor: IVORY,
                    borderColor: ROSE_BORDER,
                  }}
                  aria-label="Open venue in Google Maps"
                >
                  <QRCodeSVG
                    value={VENUE.mapsLink}
                    size={80}
                    level="M"
                    includeMargin={false}
                    fgColor={QR_FG}
                    bgColor={QR_BG}
                  />
                </a>
                <p
                  className={`font-goudy-italic ${ct.label} max-w-[90px] text-center`}
                  style={{ color: COCOA }}
                >
                  Scan for directions
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={openDirections}
              className={`${cinzel.className} ${ct.btn} flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-4 py-2.5 font-semibold uppercase tracking-[0.18em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:px-5 sm:py-3`}
              style={{
                background: NAV_ROSE,
                borderColor: "transparent",
                color: WHITE,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COCOA
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = NAV_ROSE
              }}
              aria-label="Get directions to Smallville 21 Hotel"
            >
              <Navigation className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={copyAddress}
              className={`${cinzel.className} ${ct.btn} flex flex-1 items-center justify-center gap-1.5 rounded-sm border px-4 py-2.5 font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:px-5 sm:py-3`}
              style={{
                color: COCOA,
                backgroundColor: `color-mix(in srgb, ${IVORY} 82%, ${ROSE})`,
                borderColor: ROSE_BORDER,
              }}
              aria-label="Copy venue address"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" style={{ color: ROSE }} />
              ) : (
                <Copy className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
              )}
              <span>{copied ? "Copied!" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReminderCard({
  title,
  children,
  variant = "soft",
}: {
  title: string
  children: ReactNode
  variant?: "soft" | "accent"
}) {
  const panelStyle =
    variant === "accent"
      ? {
          borderColor: ROSE_BORDER,
          backgroundColor: `color-mix(in srgb, ${IVORY} 88%, ${ROSE})`,
        }
      : softPanelStyle

  return (
    <div
      className="rounded-xl border p-4 shadow-sm sm:rounded-2xl sm:p-5"
      style={panelStyle}
    >
      <h4
        className={`${cinzel.className} ${ct.reminderHead} mb-2 font-semibold uppercase tracking-[0.08em] sm:mb-2.5`}
        style={{ color: COCOA }}
      >
        {title}
      </h4>
      <div
        className={`font-goudy-italic ${ct.reminderBody} leading-relaxed`}
        style={{ color: COCOA }}
      >
        {children}
      </div>
    </div>
  )
}

function EnchantedFairytaleGuide() {
  return (
    <div
      className="relative mx-auto mb-8 max-w-4xl overflow-hidden rounded-2xl border shadow-sm sm:mb-10 md:rounded-3xl"
      style={cardStyle}
    >
      <div className="px-5 pb-4 pt-6 text-center sm:px-8 sm:pb-5 sm:pt-8">
        <p
          className={`${cinzel.className} text-[0.625rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.6rem] sm:tracking-[0.36em]`}
          style={{ color: ROSE }}
        >
          Attire Guide
        </p>
        <h3
          className={`${aboveTheBeyond.className} mt-1 block px-1 text-[1.5rem] leading-tight sm:text-[1.95rem]`}
          style={{ color: ROSE }}
        >
          Enchanted FairyTale
        </h3>

        <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
          <span className="h-px flex-1" style={roseDividerStyle} />
          <Heart
            className="h-2 w-2 sm:h-2.5 sm:w-2.5"
            style={{ color: ROSE, fill: "currentColor" }}
            aria-hidden
          />
          <span className="h-px flex-1" style={roseDividerStyleLeft} />
        </div>
      </div>

      <div className="px-3 pb-6 sm:px-6 sm:pb-8">
        <Image
          src="/Details/Attire-guide.png"
          alt="Enchanted FairyTale debut attire guide"
          width={1600}
          height={1000}
          className="mx-auto h-auto w-full object-contain"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
    </div>
  )
}

export function Details() {
  const siteConfig = useSiteConfig()
  const debutDate = siteConfig.wedding.date
  const debutTime = siteConfig.wedding.time

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
      <Section
        id="details"
        className="relative z-10 overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
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

        <div className="relative z-20 mb-8 px-3 text-center sm:mb-10 sm:px-4 md:mb-12">
          <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
            <OutsideDivider />
          </div>
          <p
            className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
            style={{ color: ROSE }}
          >
            Her Celebration
          </p>
          <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
            <DetailsTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{ color: COCOA }}
          >
            Everything you may need for her debut.
          </p>
          <div className="mt-4 flex items-center justify-center sm:mt-5">
            <span className="h-px w-16 sm:w-24 md:w-32" style={roseDividerStyle} />
          </div>
        </div>

        <VenueDisplay date={debutDate} time={debutTime} />

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <SectionIconDivider
              icon={
                <Shirt
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  style={{ color: ROSE }}
                  aria-hidden
                />
              }
            />
            <h3
              className={`${theSeasons.className} ${ct.sectionTitle} mt-3 font-semibold uppercase leading-tight tracking-[0.12em] sm:mt-4 md:tracking-[0.15em]`}
              style={{ color: COCOA }}
            >
              Attire Guide
            </h3>
            <p
              className={`font-goudy-italic ${ct.bodyLg} mt-3 leading-relaxed sm:mt-4`}
              style={{ color: COCOA }}
            >
              Kindly dress in the spirit of her Enchanted FairyTale debut.
            </p>
          </div>

          <EnchantedFairytaleGuide />

          <div className="relative mx-auto mt-6 max-w-4xl px-3 sm:mt-8 sm:px-5">
            <div
              className="relative overflow-hidden rounded-xl border sm:rounded-2xl"
              style={cardStyle}
            >
              <div className="relative z-10 px-4 py-5 text-center sm:px-6 sm:py-6">
                <h3
                  className={`${theSeasons.className} ${ct.sectionTitle} font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em]`}
                  style={{ color: COCOA }}
                >
                  Gentle Reminders
                </h3>
                <p
                  className={`font-goudy-italic ${ct.body} mx-auto mt-2 max-w-lg leading-relaxed`}
                  style={{ color: COCOA }}
                >
                  A few notes for her debut day.
                </p>

                <div className="mx-auto mt-4 max-w-2xl space-y-3 sm:mt-5 sm:space-y-4">
                  <ReminderCard title="Arrival" variant="accent">
                    <p>
                      Kindly arrive by {debutTime} so we may begin her debut in time.
                    </p>
                  </ReminderCard>

                  <ReminderCard title="Unplugged Program">
                    <p>
                      Please keep phones away during the program so every moment of her eighteenth
                      may be captured with care. Photos will be shared after.
                    </p>
                  </ReminderCard>

                  <ReminderCard title="Enchanted FairyTale" variant="accent">
                    <p>
                      Ladies: a floor-length gown in peach, yellow, pink, lavender, or light blue.
                      Gentlemen: a black formal suit.
                    </p>
                  </ReminderCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
