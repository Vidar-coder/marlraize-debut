"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import Image from "next/image"
import { useSiteConfig } from "@/hooks/use-site-config"
import { parseWeddingDate } from "@/lib/wedding-date"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
const entryEase = [0.22, 1, 0.36, 1] as const
const heroTitleSize = {
  main: "clamp(3.35rem, min(16vw, 18cqi), 8.25rem)",
  script: "clamp(2.55rem, min(12vw, 14cqi), 5.6rem)",
  overlap: "clamp(-0.95rem, min(-3.8vw, -3.2cqi), -1.85rem)",
} as const
const SLIDE_MS = 5600

const MOBILE_HERO_PHOTOS = [
  encodeURI("/mobile-background/new-debut (1).webp"),
  encodeURI("/mobile-background/new-debut (3).webp"),
  encodeURI("/mobile-background/new-debut (5).webp"),
  encodeURI("/mobile-background/new-debut (8).webp"),
  encodeURI("/mobile-background/new-debut (9).webp"),
  encodeURI("/mobile-background/new-debut (10).webp"),
  encodeURI("/mobile-background/new-debut (11).webp"),
]

const DESKTOP_HERO_PHOTOS = [
  encodeURI("/desktop-background/new-debut (1).webp"),
  encodeURI("/desktop-background/new-debut (2).webp"),
  encodeURI("/desktop-background/new-debut (1).webp"),
  encodeURI("/desktop-background/new-debut (2).webp"),
  encodeURI("/desktop-background/new-debut (1).webp"),
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function useCeremonyCountdown() {
  const siteConfig = useSiteConfig()

  const targetTimestamp = useMemo(() => {
    const parsedDate = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date)
    const monthMap: Record<string, string> = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    }
    const monthKey =
      parsedDate.month.charAt(0) + parsedDate.month.slice(1).toLowerCase()
    const monthNum = monthMap[monthKey] ?? "11"
    const timeRaw = siteConfig.ceremony.time ?? siteConfig.wedding.time
    const timeMatch = timeRaw.match(/(\d+):(\d+)\s*(AM|PM)/i)

    let hour = 9
    let minutes = 0
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10)
      minutes = parseInt(timeMatch[2], 10)
      const ampm = timeMatch[3].toUpperCase()
      if (ampm === "PM" && hour !== 12) hour += 12
      if (ampm === "AM" && hour === 12) hour = 0
    }

    return new Date(
      Date.UTC(
        parseInt(parsedDate.year, 10),
        parseInt(monthNum, 10) - 1,
        parseInt(parsedDate.day, 10),
        hour - 8,
        minutes,
        0,
      ),
    ).getTime()
  }, [
    siteConfig.ceremony.date,
    siteConfig.ceremony.time,
    siteConfig.wedding.date,
    siteConfig.wedding.time,
  ])

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const tick = () => {
      const difference = targetTimestamp - Date.now()
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [targetTimestamp])

  return timeLeft
}

function HeroSlideshow() {
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(true)
  const [index, setIndex] = useState(0)
  const photos = isMobile ? MOBILE_HERO_PHOTOS : DESKTOP_HERO_PHOTOS

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => {
      setIsMobile(media.matches)
      setIndex(0)
    }
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (reduceMotion || photos.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length)
    }, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [photos.length, reduceMotion])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {photos.map((src, photoIndex) => {
        const isActive = photoIndex === index
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: reduceMotion ? 1 : isActive ? 1.06 : 1.02,
            }}
            transition={{
              opacity: { duration: reduceMotion ? 0.01 : 1.45, ease: "easeInOut" },
              scale: {
                duration: reduceMotion ? 0.01 : isActive ? 8.5 : 1.45,
                ease: isActive ? "linear" : "easeOut",
              },
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={photoIndex === 0}
              className="object-cover object-[center_28%] md:object-center"
              sizes="100vw"
            />
          </motion.div>
        )
      })}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgb(151 108 88 / 46%) 0%, rgb(151 108 88 / 22%) 26%, rgb(151 108 88 / 28%) 48%, rgb(151 108 88 / 52%) 100%),
            radial-gradient(ellipse 88% 62% at 50% 42%, rgb(151 108 88 / 28%) 0%, transparent 72%)
          `,
        }}
      />
    </div>
  )
}

function CountdownUnit({
  value,
  label,
  pad = false,
}: {
  value: number
  label: string
  pad?: boolean
}) {
  const display = pad ? pad2(value) : String(value)

  return (
    <div className="flex min-w-[3rem] flex-1 flex-col items-center sm:min-w-[3.5rem]">
      <span
        className={`${cinzel.className} text-[clamp(1.2rem,5.4vw,1.75rem)] font-semibold leading-none tabular-nums tracking-[0.04em] text-[#FDECE6]`}
      >
        {display}
      </span>
      <span
        className={`${cinzel.className} mt-1.5 text-[0.48rem] font-medium uppercase tracking-[0.16em] text-[#FDECE6]/80 sm:mt-2 sm:text-[0.54rem]`}
      >
        {label}
      </span>
    </div>
  )
}

function HeroCountdown() {
  const timeLeft = useCeremonyCountdown()
  const colonClass = `${cinzel.className} shrink-0 self-start px-0.5 text-[clamp(1.2rem,5.4vw,1.75rem)] font-semibold leading-none tabular-nums text-[#FDECE6] sm:px-1`

  return (
    <div className="relative z-10 w-full px-4 py-4 sm:px-6 sm:py-5">
      <p
        className={`${cinzel.className} text-center text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#FDECE6] sm:text-[0.64rem] sm:tracking-[0.26em]`}
      >
        Time left til her debut
      </p>
      <div
        className="mx-auto mt-2 flex max-w-md items-start justify-center sm:mt-2.5 sm:max-w-lg"
        aria-live="polite"
        aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <span className={colonClass} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.hours} label="Hours" pad />
        <span className={colonClass} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.minutes} label="Minutes" pad />
        <span className={colonClass} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.seconds} label="Seconds" pad />
      </div>
    </div>
  )
}

export function Hero() {
  const siteConfig = useSiteConfig()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 40)
    return () => window.clearTimeout(id)
  }, [])

  const parsedDate = useMemo(
    () => parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date),
    [siteConfig.ceremony.date, siteConfig.wedding.date],
  )

  const weddingDate = new Date(`${parsedDate.month} ${parsedDate.day}, ${parsedDate.year}`)
  const numericDate = Number.isNaN(weddingDate.getTime())
    ? `${parsedDate.month} ${parsedDate.day}, ${parsedDate.year}`
    : `${pad2(weddingDate.getMonth() + 1)}.${pad2(weddingDate.getDate())}.${parsedDate.year}`

  const ceremonyName =
    siteConfig.ceremony.location || siteConfig.wedding.venue

  const fadeUp = (delay: number) => {
    if (reduceMotion) {
      return { initial: false as const, animate: { opacity: 1, y: 0 } }
    }
    return {
      initial: { opacity: 0, y: 18 },
      animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
      transition: { duration: 0.9, delay, ease: entryEase },
    }
  }

  return (
    <section
      id="home"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative -mt-12 flex min-h-[100dvh] w-full flex-col overflow-hidden sm:-mt-14 md:-mt-16`}
    >
      <HeroSlideshow />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-6 pt-[clamp(4.25rem,12vw,7rem)] text-center sm:px-8">
        <motion.h1
          className="relative mx-auto w-full max-w-full @container text-center"
          style={
            {
              "--hero-title-size": heroTitleSize.main,
              "--hero-script-size": heroTitleSize.script,
              "--hero-script-overlap": heroTitleSize.overlap,
            } as React.CSSProperties
          }
          {...fadeUp(0.08)}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[min(18rem,58vw)] w-[min(36rem,96%)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgb(151 108 88 / 46%) 0%, rgb(151 108 88 / 18%) 46%, transparent 72%)",
            }}
          />
          <span className="sr-only">You&apos;re Invited to her debut</span>
          <span
            aria-hidden
            className={`${theSeasons.className} relative block uppercase leading-[0.78] tracking-[0.06em] min-[400px]:tracking-[0.09em] sm:tracking-[0.11em] md:tracking-[0.12em]`}
            style={{
              fontSize: "var(--hero-title-size)",
              color: IVORY,
              textShadow:
                "0 1px 0 rgb(253 236 230 / 35%), 0 2px 18px rgb(151 108 88 / 55%), 0 12px 36px rgb(151 108 88 / 40%)",
            }}
          >
            You
            <span
              className={`${cinzel.className} relative -top-[0.04em] mx-[0.02em] inline-block font-normal tracking-normal`}
            >
              &rsquo;
            </span>
            re
          </span>
          <span
            aria-hidden
            className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.82] sm:leading-[0.84]`}
            style={{
              marginTop: "var(--hero-script-overlap)",
              fontSize: "var(--hero-script-size)",
              color: ROSE,
              textShadow:
                "0 1px 0 rgb(253 236 230 / 28%), 0 4px 18px rgb(151 108 88 / 50%), 0 0 28px rgb(230 163 155 / 45%)",
            }}
          >
            Invited
            <span
              className={`${cinzel.className} relative -top-[0.08em] ml-[0.05em] inline-block font-normal`}
              style={{ color: ROSE }}
            >
              !
            </span>
          </span>
        </motion.h1>

        <motion.p
          className={`${cinzel.className} mt-4 max-w-[22rem] text-[clamp(0.68rem,2.8vw,0.86rem)] font-medium uppercase leading-[1.7] tracking-[0.18em] text-[#FDECE6]/92 sm:mt-5 sm:max-w-none sm:tracking-[0.22em]`}
          style={{ textShadow: "0 1px 12px rgb(151 108 88 / 40%)" }}
          {...fadeUp(0.2)}
        >
          Save the date — she turns eighteen
        </motion.p>

        <motion.p
          className={`${theSeasons.className} mt-4 text-[clamp(1.85rem,8.5vw,3.65rem)] font-normal leading-none tracking-[0.08em] text-[#FDECE6] sm:mt-5`}
          style={{ textShadow: "0 2px 18px rgb(151 108 88 / 45%)" }}
          {...fadeUp(0.28)}
        >
          {numericDate}
        </motion.p>

        <motion.p
          className={`${cinzel.className} mt-4 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#FDECE6]/88 sm:text-[0.7rem] sm:tracking-[0.2em]`}
          style={{ textShadow: "0 1px 10px rgb(151 108 88 / 40%)" }}
          {...fadeUp(0.36)}
        >
          {ceremonyName}
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 mt-auto w-full"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgb(151 108 88 / 28%) 28%, color-mix(in srgb, #E6A39B 72%, #976C58) 100%)",
        }}
        {...fadeUp(0.42)}
      >
        <HeroCountdown />
      </motion.div>
    </section>
  )
}
