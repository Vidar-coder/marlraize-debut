"use client"

import { Fragment, type CSSProperties, type ReactNode } from "react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

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
const NAVY = COCOA
const BODY = COCOA
const ROSE_BORDER_SOFT = "color-mix(in srgb, #E6A39B 22%, transparent)"

const goldDividerStyle = {
  background: "linear-gradient(to right, transparent, rgb(255 255 255 / 70%), transparent)",
} as const

const goldDividerStyleLeft = {
  background: "linear-gradient(to left, transparent, rgb(255 255 255 / 70%), transparent)",
} as const

const silkTitleShadow =
  "0 1px 0 rgb(42 34 28 / 42%), 0 2px 10px rgb(42 34 28 / 38%), 0 8px 28px rgb(42 34 28 / 28%)"
const silkScriptShadow =
  "0 1px 0 rgb(42 34 28 / 35%), 0 2px 12px rgb(42 34 28 / 32%), 0 0 18px rgb(230 163 155 / 35%)"

const silkGlowStyle = {
  background:
    "radial-gradient(ellipse at center, color-mix(in srgb, #E6A39B 22%, transparent) 0%, color-mix(in srgb, #F4CFC8 12%, transparent) 46%, transparent 72%)",
} as const

function SilkTextGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={silkGlowStyle}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const cardStyle = {
  background: IVORY,
  borderColor: "color-mix(in srgb, #E6A39B 38%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 10px 28px color-mix(in srgb, #E6A39B 12%, transparent), inset 0 1px 0 rgb(253 236 230 / 70%)",
} as const

const innerDividerStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const GIFT_LIST = [
  { numeral: "I", label: "Clothing" },
  { numeral: "II", label: "Oil-based perfumes" },
  { numeral: "III", label: "Makeup" },
  { numeral: "IV", label: "Personalized items" },
  { numeral: "V", label: "Soft pink pieces" },
] as const

const SPECIAL_GLYPH = /^(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|&|\+|[.’'`´-]|—|–)$/i
const SPECIAL_SPLIT = /(\b(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV)\b|&|\+|[.’'`´-]|—|–)/g
const DASH_GLYPH = /^[-—–]$/

function MixedFontText({
  text,
  specialClassName,
}: {
  text: string
  specialClassName: string
}) {
  const parts = text.split(new RegExp(SPECIAL_SPLIT.source, "g"))
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        if (DASH_GLYPH.test(part)) {
          return (
            <span
              key={`${part}-${index}`}
              className="font-normal not-italic tracking-normal"
              style={{ fontFamily: '"SortsMillGoudy", Georgia, "Times New Roman", serif' }}
            >
              {part}
            </span>
          )
        }
        if (SPECIAL_GLYPH.test(part)) {
          return (
            <span key={`${part}-${index}`} className={specialClassName}>
              {part}
            </span>
          )
        }
        return <Fragment key={`${part}-${index}`}>{part}</Fragment>
      })}
    </>
  )
}

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={goldDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: WHITE }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={goldDividerStyleLeft} />
    </div>
  )
}

function RegistryTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as CSSProperties
      }
    >
      <span className="sr-only">Gift Note — for her debut</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: WHITE,
          textShadow: silkTitleShadow,
        }}
      >
        Gift Note
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: WHITE,
          textShadow: silkScriptShadow,
        }}
      >
        for her debut
      </span>
    </h2>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()
  const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut

  return (
    <div className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}>
      <section
        id="registry"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-3 text-center @container/registry sm:px-4 md:px-6">
          <SilkTextGlow className="mb-6 sm:mb-8 md:mb-10">
            <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
              <OutsideDivider />
            </div>
            <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
              <RegistryTitle />
            </div>
            <div className="mt-4 flex items-center justify-center sm:mt-5">
              <span className="h-px w-16 sm:w-24 md:w-32" style={goldDividerStyle} />
            </div>
          </SilkTextGlow>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-8 sm:px-6 md:px-8 md:pb-12">
          <div
            className="relative overflow-hidden rounded-xl border px-6 py-8 sm:rounded-2xl sm:px-10 sm:py-10 md:px-12 md:py-12"
            style={cardStyle}
          >
            <p
              className={`font-goudy-italic mx-auto max-w-xl text-center ${sectionType.textRelaxed}`}
              style={{ color: BODY }}
            >
              Your presence would be a delight beyond measure. Should you wish to bring a gift,
              here are a few of the things {debutName} loves — chosen simply, and received with
              gratitude.
            </p>

            <div className="mx-auto my-5 h-px w-16 sm:my-6 sm:w-24" style={innerDividerStyle} />

            <div
              className="mx-auto max-w-md overflow-hidden rounded-xl border sm:rounded-2xl"
              style={{
                borderColor: ROSE_BORDER_SOFT,
                backgroundColor: `color-mix(in srgb, ${IVORY} 86%, ${ROSE})`,
              }}
            >
              <div className="px-5 pt-5 text-center sm:px-7 sm:pt-6">
                <p
                  className={`${cinzel.className} font-semibold uppercase tracking-[0.2em] ${sectionType.label}`}
                  style={{ color: ROSE }}
                >
                  She is fond of
                </p>
              </div>

              <ul className="mt-3 px-5 pb-2 sm:mt-4 sm:px-7">
                {GIFT_LIST.map((item, index) => (
                  <li
                    key={item.label}
                    className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3 py-2.5 sm:grid-cols-[2.75rem_1fr] sm:py-3"
                    style={{
                      borderTop:
                        index === 0
                          ? `1px solid ${ROSE_BORDER_SOFT}`
                          : undefined,
                      borderBottom: `1px solid ${ROSE_BORDER_SOFT}`,
                    }}
                  >
                    <span
                      className={`${cinzel.className} text-[0.7rem] font-semibold tracking-[0.18em] sm:text-xs`}
                      style={{ color: ROSE }}
                    >
                      {item.numeral}
                    </span>
                    <span
                      className={`${theSeasons.className} text-[1.05rem] leading-snug tracking-[0.04em] sm:text-[1.15rem]`}
                      style={{ color: NAVY }}
                    >
                      <MixedFontText
                        text={item.label}
                        specialClassName={`${cinzel.className} font-normal not-italic tracking-normal`}
                      />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="px-5 py-5 text-center sm:px-7 sm:py-6">
                <p
                  className={`${cinzel.className} mb-1.5 font-semibold uppercase tracking-[0.18em] ${sectionType.label}`}
                  style={{ color: ROSE }}
                >
                  Or a monetary gift
                </p>
                <p
                  className={`font-goudy-italic mx-auto max-w-sm ${sectionType.text}`}
                  style={{ color: BODY }}
                >
                  Should you prefer to give in this way, your generosity would be greatly appreciated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
