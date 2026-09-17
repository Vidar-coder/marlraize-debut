"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import Counter from "@/components/Counter"
import Image from "next/image"
import { parseWeddingDate } from "@/lib/wedding-date"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownUnitProps {
  value: number
  label: string
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
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
const PETAL = "#FCE7E1"

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, #976C58 38%, transparent), transparent)",
} as const

const dividerLineStyleLeft = {
  background:
    "linear-gradient(to left, transparent, color-mix(in srgb, #976C58 38%, transparent), transparent)",
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-[#976C58]/45 sm:h-1 sm:w-1" aria-hidden />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyleLeft} />
    </div>
  )
}

function CountdownTitle() {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: COCOA,
        }}
      >
        Counting Down
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto mt-2 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2.5 sm:leading-[0.9] md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: ROSE,
          textShadow:
            "0 1px 0 color-mix(in srgb, #FDECE6 95%, white), 0 0 10px color-mix(in srgb, #FDECE6 65%, white)",
        }}
      >
        To her debut
      </span>
      <span className="sr-only">To her debut</span>
    </h2>
  )
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const places = value >= 100 ? [100, 10, 1] : [10, 1]

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-full max-w-[88px] sm:max-w-[96px] md:max-w-[110px] lg:max-w-[120px]">
        <div
          className="relative rounded-xl border px-2.5 py-2.5 shadow-sm sm:rounded-2xl sm:px-3.5 sm:py-3.5 md:px-4 md:py-4"
          style={{
            background: PETAL,
            borderColor: "color-mix(in srgb, #976C58 20%, transparent)",
          }}
        >
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={places}
              fontSize={26}
              padding={4}
              gap={2}
              textColor={COCOA}
              fontWeight={800}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={0}
              gradientFrom="transparent"
              gradientTo="transparent"
              counterStyle={{
                backgroundColor: "transparent",
              }}
              digitStyle={{
                minWidth: "1.15ch",
                fontFamily: "Arial, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: COCOA,
              }}
            />
          </div>
        </div>
      </div>

      <span
        className="text-[10px] font-inter font-semibold uppercase tracking-[0.16em] sm:text-xs md:text-sm"
        style={{ color: SAGE }}
      >
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const siteConfig = useSiteConfig()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const parsedDate = parseWeddingDate(ceremonyDate)
  const ceremonyMonth = parsedDate.month
  const ceremonyDayNumber = parsedDate.day
  const ceremonyYear = parsedDate.year
  const { debutNickname } = siteConfig.couple
  const ceremonyDay = siteConfig.ceremony.day || parsedDate.dayOfWeek
  const ceremonyDayShort = ceremonyDay.slice(0, 3).toUpperCase()
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim()

  const monthMap: { [key: string]: string } = {
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
  const monthNum =
    monthMap[ceremonyMonth.charAt(0) + ceremonyMonth.slice(1).toLowerCase()] || "12"
  const dayNum = ceremonyDayNumber

  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15
  let minutes = 0

  if (timeMatch) {
    hour = parseInt(timeMatch[1])
    minutes = parseInt(timeMatch[2])
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }

  const parsedTargetDate = new Date(
    Date.UTC(
      parseInt(ceremonyYear),
      parseInt(monthNum) - 1,
      parseInt(dayNum),
      hour - 8,
      minutes,
      0
    )
  )

  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2026, 1, 8, 8, 0, 0)).getTime()
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = targetTimestamp
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  return (
    <section
      id="countdown"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-9`}
    >
      <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative min-w-0 overflow-hidden rounded-lg border px-4 pt-6 pb-8 sm:rounded-xl sm:px-7 sm:pt-7 sm:pb-10 md:rounded-2xl md:px-8 md:pt-8 md:pb-12"
          style={{
            background: IVORY,
            borderColor: "color-mix(in srgb, #976C58 14%, transparent)",
            boxShadow:
              "0 8px 28px color-mix(in srgb, #976C58 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
            style={{
              background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
              <Image
                src={siteConfig.couple.monogram}
                alt=""
                fill
                className="object-contain"
                priority={false}
              />
            </div>
          </div>

          <div className="relative z-10 flex justify-center pt-2 sm:pt-3">
            <div className="relative h-20 w-20 opacity-90 sm:h-24 sm:w-24 md:h-28 md:w-28">
              <Image
                src={siteConfig.couple.monogram}
                alt={`${debutNickname} Monogram`}
                fill
                className="object-contain"
                priority={false}
              />
            </div>
          </div>

          <div className="relative z-10 mb-6 px-1 pt-4 text-center sm:mb-8 sm:pt-5 md:mb-10">
            <div className="mx-auto mb-4 sm:mb-5">
              <OutsideDivider />
            </div>
            <CountdownTitle />
            <div className="mt-3 flex items-center justify-center sm:mt-4">
              <span className="h-px w-16 bg-[#976C58]/35 sm:w-24 md:w-32" />
            </div>
          </div>

          <div className="relative z-10 font-inter">
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          <div className="relative z-10 mt-6 sm:mt-8 md:mt-10">
            <div
              className={`${cinzel.className} flex flex-col items-center gap-1.5 font-bold sm:gap-2.5 md:gap-3`}
              style={{ color: COCOA }}
            >
              <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                {ceremonyMonth}
              </span>

              <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                  <span className="h-[0.5px] flex-1 bg-[#976C58]/35" />
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                    {ceremonyDayShort}
                  </span>
                  <span className="h-[0.5px] w-6 bg-[#976C58]/35 sm:w-8 md:w-10" />
                </div>

                <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                  <span
                    className={`${cinzel.className} relative text-[3rem] font-bold leading-none tracking-wider sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]`}
                  >
                    {ceremonyDayNumber}
                  </span>
                </div>

                <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                  <span className="h-[0.5px] w-6 bg-[#976C58]/35 sm:w-8 md:w-10" />
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] sm:text-[0.7rem] sm:tracking-[0.4em] md:text-xs">
                    {ceremonyTimeDisplay.split(",")[0]}
                  </span>
                  <span className="h-[0.5px] flex-1 bg-[#976C58]/35" />
                </div>
              </div>

              <span className="text-[0.65rem] uppercase tracking-[0.4em] sm:text-xs sm:tracking-[0.5em] md:text-sm">
                {ceremonyYear}
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
