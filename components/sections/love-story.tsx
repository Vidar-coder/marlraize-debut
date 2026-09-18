"use client"

import React from "react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { StorySection } from "@/components/StorySection"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import { useSiteConfig } from "@/hooks/use-site-config"

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

const roseDividerStyle = {
  background: "linear-gradient(to right, transparent, #E6A39B, transparent)",
} as const

const roseDividerStyleLeft = {
  background: "linear-gradient(to left, transparent, #E6A39B, transparent)",
} as const

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px] select-none"

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={roseDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: ROSE }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={roseDividerStyleLeft} />
    </div>
  )
}

function LoveStoryTitle() {
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
      <span className="sr-only">With Gratitude — you are invited</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: COCOA,
        }}
      >
        With Gratitude
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
        you are invited
      </span>
    </h2>
  )
}

export function LoveStory() {
  const siteConfig = useSiteConfig()
  const debutName = siteConfig.couple.debutNickname || siteConfig.couple.debut

  return (
    <div
      id="gratitude"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative overflow-x-hidden`}
      style={{ background: IVORY }}
    >
      <div
        className="relative px-4 pb-2 pt-8 text-center sm:pt-10 md:pt-12"
        style={{ background: IVORY }}
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
        <div className="relative z-20 mx-auto max-w-5xl px-3 @container/love-story sm:px-4">
          <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
            <OrnamentalDivider />
          </div>
          <p
            className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
            style={{ color: ROSE }}
          >
            A Letter From the Heart
          </p>
          <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
            <LoveStoryTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{ color: COCOA }}
          >
            With a grateful heart, I thank everyone who has walked with me to this season of
            eighteen — and I invite you, with all my love, to celebrate my debut.
          </p>
        </div>
      </div>

      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="To My Family"
        imageSrc="/mobile-background/debut (12).webp"
        alt={`${debutName} with family`}
        text={
          <>
            <p className="mb-4">
              To Mama, Papa, and every relative who prayed over me, waited up for me, and loved me
              through every season of growing up — thank you. This day is as much yours as it is
              mine. Your sacrifices, patience, and quiet faith made this eighteenth possible.
            </p>
          </>
        }
      />

      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/debut (17).webp"
        alt={`${debutName} with friends`}
        title="To My Friends"
        text={
          <>
            <p className="mb-4">
              To the friends who grew with me, laughed with me, and stayed — thank you for every
              memory that made childhood feel like a gift. I would be so glad to celebrate this new
              chapter with you beside me.
            </p>
          </>
        }
      />

      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/mobile-background/debut (24).webp"
        alt={`${debutName} with those who guided her`}
        title="To Those Who Guided Me"
        text={
          <>
            <p>
              To my godparents, mentors, and every kind soul who offered wisdom, prayers, and a
              steady hand — thank you for helping shape the woman I am becoming. Your presence on
              this day would mean the world.
            </p>
          </>
        }
      />

      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/debut (30).webp"
        alt={`${debutName} honoring her ninongs and ninangs`}
        title="To My Ninongs and Ninangs"
        text={
          <>
            <p className="mb-4">
              To my ninongs and ninangs, whose blessings have followed me since childhood — thank
              you for every prayer, every word of counsel, and every quiet act of love. I would be
              honored to have you with me as I step into eighteen.
            </p>
          </>
        }
      />

      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/mobile-background/debut (20).webp"
        alt={`${debutName} thinking of loved ones near and far`}
        title="To Those Near and Far"
        text={
          <>
            <p>
              To everyone who cannot always be beside me, yet has never been far from my heart —
              thank you. Whether you travel to celebrate or send your love from afar, you are part
              of this day, and you are so warmly invited.
            </p>
          </>
        }
      />

      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/debut (35).webp"
        alt={`${debutName} grateful for every kindness`}
        title="For Every Kindness"
        text={
          <>
            <p className="mb-4">
              To neighbors, teachers, cousins, and every person who offered a kindness I may never
              fully name — thank you. Growing up has been a story of grace, and so much of that
              grace came through you. Please come and share in this joy with me.
            </p>
          </>
        }
      />

      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/debut (4).webp"
        alt={`${debutName} inviting guests to her debut`}
        title="Come Celebrate With Me"
        text={
          <>
            <p className="mb-4">
              Whether you have known me all my life or walked with me only a little while, you are
              warmly invited. Please come and celebrate my debut — your love, your prayers, and your
              company are the greatest gift I could ask for.
            </p>
            <p>With all my heart, {debutName}.</p>
          </>
        }
      />

      <div
        className="relative px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ background: IVORY }}
      >
        <div className="pointer-events-none absolute bottom-0 left-0 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/bottom-left-corner.png"
            alt=""
            aria-hidden="true"
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/bottom-right-corner.png"
            alt=""
            aria-hidden="true"
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="relative z-20">
          <div className="mx-auto mb-5 sm:mb-6">
            <OrnamentalDivider />
          </div>
          <blockquote className="mx-auto max-w-xl px-2">
            <p
              className={`font-goudy-italic ${sectionType.textRelaxed} italic leading-relaxed`}
              style={{ color: COCOA }}
            >
              &ldquo;I thank my God every time I remember you.&rdquo;
            </p>
            <footer
              className={`${cinzel.className} mt-2 not-italic uppercase tracking-[0.2em] sm:mt-3 sm:tracking-[0.24em] ${sectionType.label}`}
              style={{ color: SAGE }}
            >
              Philippians 1:3
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
