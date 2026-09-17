import MasonryGallery from "@/components/masonry-gallery"
import { fetchGalleryImages } from "@/lib/fetch-gallery-images"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { Camera } from "lucide-react"

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

const galleryBackground = `
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

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px] select-none"

export const dynamic = "force-static"

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={roseDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: ROSE }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={roseDividerStyleLeft} />
    </div>
  )
}

function GalleryTitle() {
  return (
    <h1
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span className="sr-only">Gallery — her favorite moments</span>
      <span
        aria-hidden
        className={`${theSeasons.className} block uppercase leading-[0.9] tracking-[0.04em] min-[400px]:tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: COCOA,
        }}
      >
        Gallery
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
        her favorite moments
      </span>
    </h1>
  )
}

export default async function GalleryPage() {
  const { desktop, mobile } = await fetchGalleryImages()
  const images = [
    ...desktop.map((image) => ({
      ...image,
      category: "desktop" as const,
      orientation: (image.width >= image.height ? "landscape" : "portrait") as "portrait" | "landscape",
    })),
    ...mobile.map((image) => ({
      ...image,
      category: "mobile" as const,
      orientation: (image.width >= image.height ? "landscape" : "portrait") as "portrait" | "landscape",
    })),
  ]

  return (
    <main
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-x-hidden`}
      style={{ background: galleryBackground }}
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

      <section className="relative z-20 mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="relative z-20 mb-8 px-3 text-center sm:mb-10 sm:px-4 md:mb-12">
          <div className="mx-auto mb-4 sm:mb-5 md:mb-6">
            <OutsideDivider />
          </div>
          <p
            className={`${cinzel.className} mx-auto mt-4 max-w-[20rem] px-2 text-[0.6875rem] font-semibold leading-snug tracking-[0.12em] min-[400px]:max-w-none min-[400px]:text-[0.75rem] min-[400px]:tracking-[0.16em] sm:mt-6 sm:text-[0.9375rem] sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]`}
            style={{ color: ROSE }}
          >
            Her Moments
          </p>
          <div className="mx-auto mt-3 sm:mt-4 md:mt-5">
            <GalleryTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{ color: COCOA }}
          >
            From her first chapter to this season of eighteen — every moment has been a testament to
            love, faith, and grace.
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 sm:mt-5">
            <span className="h-px w-8 sm:w-12 md:w-16" style={roseDividerStyle} />
            <Camera
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              style={{ color: ROSE }}
              aria-hidden
            />
            <span className="h-px w-8 sm:w-12 md:w-16" style={roseDividerStyleLeft} />
          </div>
        </div>

        {images.length > 0 ? (
          <MasonryGallery images={images} />
        ) : (
          <p
            className={`text-center font-goudy-italic ${sectionType.text}`}
            style={{ color: COCOA }}
          >
            No images to display.
          </p>
        )}
      </section>
    </main>
  )
}
