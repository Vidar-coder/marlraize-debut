"use client"

import localFont from "next/font/local"
import { motion } from "motion/react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { sectionType, welcomeTitleSize } from "@/lib/section-typography"
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const IVORY = "#FDECE6"
const ROSE = "#E6A39B"
const COCOA = "#976C58"
const SAGE = "#A5B29A"

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

function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, #976C58 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-[#976C58]/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, #976C58 38%, transparent))",
        }}
      />
    </div>
  )
}

function LayeredWelcomeTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--welcome-size": welcomeTitleSize.main,
          "--script-size": welcomeTitleSize.script,
          "--script-overlap": welcomeTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--welcome-size)",
          color: COCOA,
        }}
      >
        Welcome
      </span>

      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          fontSize: "var(--script-size)",
          color: ROSE,
          textShadow:
            "0 1px 0 color-mix(in srgb, #FDECE6 95%, white), 0 0 10px color-mix(in srgb, #FDECE6 65%, white)",
        }}
      >
        to her debut
      </span>

      <span className="sr-only"> to her debut</span>
    </h2>
  )
}

export function Welcome() {
  const siteConfig = useSiteConfig()
  const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut

  return (
    <section
      id="welcome"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative px-3 py-5 sm:px-5 sm:py-7 md:px-6 md:py-9`}
    >
      <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative min-w-0 overflow-visible rounded-lg border px-4 pt-6 pb-10 @container/welcome sm:rounded-xl sm:px-7 sm:pt-7 sm:pb-12 md:rounded-2xl md:px-8 md:pt-8 md:pb-14"
          style={{
            background: IVORY,
            borderColor: "color-mix(in srgb, #976C58 14%, transparent)",
            boxShadow:
              "0 8px 28px color-mix(in srgb, #976C58 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
          }}
        >
          <div className="wedding-frame-inner hidden min-[400px]:block" aria-hidden />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #E6A39B, transparent)",
            }}
          />

          <header className="relative overflow-visible space-y-3 px-1 pt-4 pb-6 sm:space-y-3.5 sm:px-2 sm:pt-5 sm:pb-7 md:space-y-4 md:pt-6 md:pb-8">
            <LayeredWelcomeTitle />
            <div className="pt-2 sm:pt-2.5">
              <OrnamentalDivider compact />
            </div>
          </header>

          <div className="relative mx-4 space-y-5 text-center sm:mx-6 sm:space-y-6 md:mx-7 md:space-y-7">
            <figure className="px-1 py-1 sm:px-2">
              <blockquote>
                <p
                  className={`font-goudy-italic ${sectionType.textSnug}`}
                  style={{ color: COCOA }}
                >
                  &ldquo;He has made everything beautiful in His time.&rdquo;
                </p>
                <figcaption className="mt-2 sm:mt-2.5">
                  <cite
                    className={`${cinzel.className} ${sectionType.label} not-italic uppercase tracking-[0.2em] sm:tracking-[0.24em]`}
                    style={{ color: SAGE }}
                  >
                    Ecclesiastes 3:11
                  </cite>
                </figcaption>
              </blockquote>
            </figure>

            <div
              className={`font-goudy-italic space-y-3 px-1 text-center sm:space-y-3.5 sm:px-2 md:space-y-4 ${sectionType.textRelaxed}`}
              style={{ color: COCOA }}
            >
              <p>
                Dear family and friends, I am overjoyed to begin this new chapter and grateful to
                God for every step that led me here. Growing up has been a story of grace, and I
                cannot imagine celebrating my eighteenth without you.
              </p>
              <p>
                This invitation holds everything you may need for my debut: the schedule, venue
                details, and a few gentle reminders along the way. Whether near or far, your
                presence, prayers, and warm wishes will mean more to me than words can say.
              </p>
              <p>
                Thank you for being part of my journey. I look forward to sharing this beautiful
                day with the people who have shaped my life and my heart.
              </p>
            </div>

            <div className="space-y-5 pt-1 sm:space-y-6 sm:pt-2 md:space-y-7">
              <footer className="space-y-2 px-1 pt-4 pb-2 sm:space-y-2.5 sm:px-2 sm:pt-5 sm:pb-3 md:pt-6 md:pb-4">
                <p
                  className={`${aboveTheBeyond.className} ${sectionType.script}`}
                  style={{
                    color: ROSE,
                    textShadow:
                      "0 1px 0 color-mix(in srgb, #FDECE6 90%, white)",
                  }}
                >
                  With all my love,
                </p>
                <p
                  className={`${cinzel.className} ${sectionType.subheader} mb-3 font-semibold tracking-[0.12em] sm:mb-4 sm:tracking-[0.16em] md:mb-5 md:tracking-[0.18em]`}
                  style={{ color: COCOA }}
                >
                  {debutName}
                </p>
              </footer>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
