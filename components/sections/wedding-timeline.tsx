"use client"

import type React from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import type { SiteConfig } from "@/lib/site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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

const OUTSIDE_TEXT = "#FFFFFF"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"
const READABLE_SHADOW = "0 1px 3px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)"
const ICON_WHITE_GLOW =
  "brightness(0) saturate(100%) invert(100%) drop-shadow(0 0 2px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.45))"

const TIMELINE_TEXT = OUTSIDE_TEXT
const TIMELINE_SPINE = "rgba(255, 255, 255, 0.65)"
const TIMELINE_DOT = OUTSIDE_TEXT

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  imageSrc: string
}

function TimelineTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: OUTSIDE_TEXT,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        Debut Program
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: OUTSIDE_TEXT,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        Her Day, Her Moment, Her Forever
      </span>
      <span className="sr-only">Her Day, Her Moment, Her Forever</span>
    </h2>
  )
}

function buildTimelineEvents(siteConfig: SiteConfig): TimelineEvent[] {
  const venue = `${siteConfig.ceremony.location}, ${siteConfig.ceremony.venue}`

  return [
    {
      time: "5:30 PM",
      title: "Assembly",
      description: "Guests Arrival",
      location: venue,
      imageSrc: "/debut-timeline/assembly.png",
    },
    {
      time: "6:00 PM",
      title: "Processional",
      description: "18 Roses & Debutante Entrance",
      location: venue,
      imageSrc: "/debut-timeline/Processional.png",
    },
    {
      time: "6:30 PM",
      title: "Invocation",
      description: "Opening Prayer",
      location: venue,
      imageSrc: "/debut-timeline/Invocation.png",
    },
    {
      time: "6:45 PM",
      title: "Welcome Remarks",
      description: "Message from the Host",
      location: venue,
      imageSrc: "/debut-timeline/welcome-remarks.png",
    },
    {
      time: "7:00 PM",
      title: "Dinner",
      description: "Let's Dine!",
      location: venue,
      imageSrc: "/debut-timeline/dinner.png",
    },
    {
      time: "7:30 PM",
      title: "18 Roses & Candle Lighting",
      description: "A Moment of Gratitude",
      location: venue,
      imageSrc: "/debut-timeline/18roses-candle-lighting.png",
    },
    {
      time: "8:00 PM",
      title: "Message",
      description: "From Family & Friends",
      location: venue,
      imageSrc: "/debut-timeline/message.png",
    },
    {
      time: "8:30 PM",
      title: "Debutante's Speech",
      description: "Words from the Heart",
      location: venue,
      imageSrc: "/debut-timeline/debutant-speech.png",
    },
    {
      time: "9:00 PM",
      title: "Dance & Party",
      description: "Let's Celebrate!",
      location: venue,
      imageSrc: "/debut-timeline/dance-party.png",
    },
    {
      time: "10:00 PM",
      title: "Thank You & End of Program",
      description: "Until We Meet Again",
      location: venue,
      imageSrc: "/debut-timeline/end-program.png",
    },
  ]
}

export function WeddingTimeline() {
  const siteConfig = useSiteConfig()
  const timelineEvents = buildTimelineEvents(siteConfig)

  return (
    <section
      id="wedding-timeline"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 overflow-hidden bg-transparent py-10 sm:py-12 md:py-16 lg:py-20`}
    >
      {/* Header */}
      <div className="relative z-10 mx-auto mb-8 max-w-5xl px-3 text-center @container/timeline sm:mb-10 sm:px-4 md:mb-12">
        <TimelineTitle />

        <p
          className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          A timeline of the key moments of this once-in-a-lifetime celebration.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-5 lg:px-8">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2 opacity-80"
          style={{ background: TIMELINE_SPINE }}
        />

        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={`${event.title}-${event.time}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative z-10"
    >
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 lg:gap-x-12">
        <div className={isEven ? "" : "text-right"}>
          <div className={`flex items-center gap-4 ${isEven ? "justify-end" : "justify-end"}`}>
            {!isEven ? (
              <TimelineText event={event} align="right" />
            ) : (
              <IconMark imageSrc={event.imageSrc} />
            )}
            <div
              className="hidden h-px w-8 opacity-80 lg:block xl:w-12"
              style={{ backgroundColor: TIMELINE_SPINE }}
            />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: TIMELINE_DOT }}
          />
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div
              className="hidden h-px w-8 opacity-80 lg:block xl:w-12"
              style={{ backgroundColor: TIMELINE_SPINE }}
            />
            {isEven ? (
              <TimelineText event={event} align="left" />
            ) : (
              <IconMark imageSrc={event.imageSrc} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile: compact alternating layout */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 sm:gap-x-5 md:hidden">
        <div className={isEven ? "" : "text-right"}>
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {!isEven ? (
              <TimelineText event={event} align="right" mobile />
            ) : (
              <IconMark imageSrc={event.imageSrc} mobile />
            )}
            <div className="h-px w-4 opacity-80 sm:w-6" style={{ backgroundColor: TIMELINE_SPINE }} />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: TIMELINE_DOT }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-px w-4 opacity-80 sm:w-6" style={{ backgroundColor: TIMELINE_SPINE }} />
            {isEven ? (
              <TimelineText event={event} align="left" mobile />
            ) : (
              <IconMark imageSrc={event.imageSrc} mobile />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineText({
  event,
  align,
  mobile,
}: {
  event: TimelineEvent
  align: "left" | "right"
  mobile?: boolean
}) {
  const textAlign = align === "right" ? "text-right" : "text-left"

  return (
    <div className={`max-w-xs sm:max-w-sm ${textAlign} ${align === "right" ? "ml-auto" : "mr-auto"}`}>
      <p
        className={`${cinzel.className} ${mobile ? "text-sm" : sectionType.text} font-medium tracking-wide`}
        style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
      >
        {event.time}
      </p>
      <p
        className={`${theSeasons.className} ${mobile ? "text-base mt-0.5" : `${sectionType.subheader} mt-1`} font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em]`}
        style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
      >
        {event.title}
      </p>
      {event.description && (
        <p
          className={`font-goudy-italic ${mobile ? "text-xs mt-0.5" : `${sectionType.textSnug} mt-1`}`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          {event.description}
        </p>
      )}
      {event.location && (
        <p
          className={`font-goudy-italic ${mobile ? "text-[10px] mt-1 leading-snug" : `${sectionType.text} mt-1.5 leading-relaxed`} opacity-90`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          {event.location}
        </p>
      )}
    </div>
  )
}

function IconMark({ mobile, imageSrc }: { mobile?: boolean; imageSrc: string }) {
  const sizeClass = mobile
    ? "h-20 w-20 sm:h-24 sm:w-24"
    : "h-32 w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40"

  return (
    <div className={`relative shrink-0 ${sizeClass}`}>
      <div
        className="pointer-events-none absolute inset-[18%] rounded-full bg-white/15 blur-lg"
        aria-hidden
      />
      <Image
        src={imageSrc}
        alt=""
        width={mobile ? 96 : 160}
        height={mobile ? 96 : 160}
        className="relative h-full w-full object-contain"
        style={{ filter: ICON_WHITE_GLOW }}
      />
    </div>
  )
}
