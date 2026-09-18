"use client"

import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { ChevronDown } from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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

const IVORY = "#FDECE6"
const ROSE = "#E6A39B"
const COCOA = "#976C58"
const SAGE = "#A5B29A"
const GOLD = ROSE
const NAVY = COCOA
const SCRIPT = ROSE
const BODY = COCOA
const GOLD_BORDER = "color-mix(in srgb, #E6A39B 38%, transparent)"
const GOLD_BORDER_SOFT = "color-mix(in srgb, #E6A39B 22%, transparent)"

const goldDividerStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const goldDividerStyleLeft = {
  background: "linear-gradient(to left, transparent, #E6A39B, transparent)",
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
  body: sectionType.textRelaxed,
  bodyLg: sectionType.textRelaxed,
  question: sectionType.text,
} as const

const linkClass = "underline font-semibold transition-colors hover:opacity-80"

const cardStyle = {
  background: IVORY,
  borderColor: GOLD_BORDER,
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 10px 28px color-mix(in srgb, #E6A39B 12%, transparent), inset 0 1px 0 rgb(253 236 230 / 70%)",
} as const

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={goldDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: GOLD }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={goldDividerStyleLeft} />
    </div>
  )
}

function FaqTitle() {
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
      <span className="sr-only">A Few Notes — for her debut</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: NAVY,
        }}
      >
        A Few Notes
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto mt-1.5 block w-fit max-w-full px-1 leading-[0.88] sm:mt-2 sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: SCRIPT,
        }}
      >
        for her debut
      </span>
    </h2>
  )
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut
  const venueName = siteConfig.wedding.venue || "Smallville"
  const attireTheme = siteConfig.dressCode.theme || "Enchanted FairyTale"

  return [
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={linkClass}
            style={{ color: GOLD }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm if you will be at {debutName}&apos;s debut.
          {"\n\n"}
          Kindly respond by {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
        </>
      ),
    },
    {
      question: "Do I still need to RSVP if I already said yes?",
      answer:
        "Yes, please. A formal RSVP helps the family finalize the headcount for catering and seating for her debut.",
    },
    {
      question: "May I bring a plus one or my children?",
      answer:
        "This celebration is strictly by invitation. Please come only with the names listed on your invitation. If your child is included, they are warmly welcome — RSVP with the correct number in your party.",
    },
    {
      question: `What should I wear?`,
      answer: (
        <>
          Kindly dress in the spirit of her {attireTheme} debut. Ladies: a floor-length gown in peach, yellow, pink,
          lavender, or light blue. Gentlemen: a black formal suit.
          {"\n\n"}
          See the{" "}
          <a
            href="#details"
            className={linkClass}
            style={{ color: GOLD }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            attire guide
          </a>{" "}
          for the full look.
        </>
      ),
    },
    {
      question: `Is there parking at ${venueName}?`,
      answer: `Yes. Parking is available at ${venueName}. Please arrive a little early so you have time to park comfortably and be seated for her program.`,
    },
    {
      question: "May I take photos during the program?",
      answer:
        "Please keep phones away during the program so every moment of her eighteenth may be captured with care. Photos and well-wishes are most welcome after.",
    },
    {
      question: "What if my plans change?",
      answer:
        "Please let the family know as soon as you can so a seat may be reallocated. If you earlier declined and can now attend, check first — this evening is by invitation, and we may not have an extra place.",
    },
  ]
}

function FaqAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer !== "string") {
    return (
      <div
        className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
        style={{ color: BODY }}
      >
        {answer}
      </div>
    )
  }

  return (
    <p
      className={`font-goudy-italic ${ct.body} whitespace-pre-line`}
      style={{ color: BODY }}
    >
      {answer}
    </p>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
      <section
        id="faq"
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

        <div className="relative z-20 mx-auto mb-8 max-w-5xl px-3 text-center @container/faq sm:mb-10 sm:px-4 md:mb-12">
          <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
            <OutsideDivider />
          </div>
          <p
            className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
            style={{ color: GOLD }}
          >
            Kindly Note
          </p>
          <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
            <FaqTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
            style={{ color: BODY }}
          >
            A handful of notes so you can arrive, celebrate, and enjoy her eighteenth with her.
          </p>
          <div className="mt-4 flex items-center justify-center sm:mt-5">
            <span className="h-px w-16 sm:w-24 md:w-32" style={goldDividerStyle} />
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-3xl px-4 pb-8 sm:px-6 md:px-8 md:pb-12">
          <div
            className="relative overflow-hidden rounded-xl border sm:rounded-2xl"
            style={cardStyle}
          >
            <div className="relative z-20 space-y-2 p-3 sm:space-y-2.5 sm:p-4 md:p-5">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="relative z-20 rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? GOLD_BORDER : GOLD_BORDER_SOFT,
                      backgroundColor: isOpen
                        ? "color-mix(in srgb, #E6A39B 10%, #FDECE6)"
                        : "color-mix(in srgb, #E6A39B 4%, #FDECE6)",
                      boxShadow: isOpen
                        ? "0 8px 20px color-mix(in srgb, #E6A39B 14%, transparent)"
                        : "none",
                    }}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group flex w-full items-center justify-between px-3 py-2.5 text-left outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:py-3 md:px-5"
                      style={{ outlineColor: GOLD }}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${cinzel.className} ${ct.question} pr-3 font-semibold leading-snug transition-colors duration-200`}
                        style={{ color: isOpen ? GOLD : NAVY }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 sm:h-5 sm:w-5 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: GOLD }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="border-t px-3 pb-3 pt-0 sm:px-4 sm:pb-4 md:px-5"
                          style={{ borderColor: GOLD_BORDER_SOFT }}
                        >
                          <FaqAnswer answer={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
