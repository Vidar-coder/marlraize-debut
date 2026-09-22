"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import localFont from "next/font/local"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { Cinzel } from "next/font/google"
import { Section } from "@/components/section"
import { sectionType } from "@/lib/section-typography"

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
const NAV_ROSE =
  "linear-gradient(180deg, #E6A39B 0%, #C89E8C 52%, #976C58 100%)"
const ROSE_BORDER = "color-mix(in srgb, #E6A39B 38%, transparent)"

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

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={roseDividerStyle} />
      <span className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1" style={{ background: ROSE }} aria-hidden />
      <span className="h-px w-6 sm:w-10" style={roseDividerStyleLeft} />
    </div>
  )
}

const galleryTitleSize = {
  main: "clamp(1.65rem, 8.5vw, 4.5rem)",
  script: "clamp(0.95rem, 4.8vw, 2.7rem)",
} as const

function GalleryTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": galleryTitleSize.main,
          "--script-size": galleryTitleSize.script,
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
    </h2>
  )
}

const galleryItems = [
  { image: "/mobile-background/new-debut (1).webp", text: " " },
  { image: "/mobile-background/new-debut (2).webp", text: " " },
  { image: "/mobile-background/new-debut (3).webp", text: " " },
  { image: "/mobile-background/new-debut (4).webp", text: " " },
  { image: "/mobile-background/new-debut (5).webp", text: " " },
  { image: "/mobile-background/new-debut (6).webp", text: " " },
  { image: "/mobile-background/new-debut (7).webp", text: " " },
  { image: "/mobile-background/new-debut (8).webp", text: " " },
  { image: "/mobile-background/new-debut (9).webp", text: " " },
  { image: "/mobile-background/new-debut (10).webp", text: " " },

]

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val))
}

function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: typeof galleryItems
  index: number
  onClose: () => void
  onNavigate: (direction: "prev" | "next") => void
}) {
  const item = items[index]
  const stageRef = useRef<HTMLDivElement>(null)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{
    x: number
    y: number
    panX: number
    panY: number
  } | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)

  const resetZoom = useCallback(() => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }, [])

  useEffect(() => {
    resetZoom()
  }, [index, resetZoom])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate("prev")
      if (e.key === "ArrowRight") onNavigate("next")
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onClose, onNavigate])

  useEffect(() => {
    const html = document.documentElement
    const previousHtml = html.style.overflow
    const previousBody = document.body.style.overflow
    html.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    return () => {
      html.style.overflow = previousHtml
      document.body.style.overflow = previousBody
    }
  }, [])

  useEffect(() => {
    const next = new window.Image()
    next.src = items[(index + 1) % items.length].image
    const prev = new window.Image()
    prev.src = items[(index - 1 + items.length) % items.length].image
  }, [index, items])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.18 : -0.18
      setZoomScale((scale) => {
        const next = clamp(scale + delta, 1, 4)
        if (next === 1) setPan({ x: 0, y: 0 })
        return next
      })
    }

    stage.addEventListener("wheel", onWheel, { passive: false })
    return () => stage.removeEventListener("wheel", onWheel)
  }, [])

  const zoomAtPoint = (clientX: number, clientY: number, nextScale: number) => {
    const stage = stageRef.current
    if (!stage) {
      setZoomScale(nextScale)
      if (nextScale === 1) setPan({ x: 0, y: 0 })
      return
    }
    const rect = stage.getBoundingClientRect()
    const cx = clientX - rect.left - rect.width / 2
    const cy = clientY - rect.top - rect.height / 2
    const ratio = nextScale / zoomScale
    setPan({
      x: nextScale === 1 ? 0 : cx - (cx - pan.x) * ratio,
      y: nextScale === 1 ? 0 : cy - (cy - pan.y) * ratio,
    })
    setZoomScale(nextScale)
  }

  if (!item) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(18, 11, 9, 0.94)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery photo"
    >
      <div
        ref={stageRef}
        className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
        onDoubleClick={(e) => {
          if (zoomScale > 1) {
            resetZoom()
            return
          }
          zoomAtPoint(e.clientX, e.clientY, 2.2)
        }}
        onMouseDown={(e) => {
          if (zoomScale <= 1 || e.button !== 0) return
          setPanStart({ x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y })
        }}
        onMouseMove={(e) => {
          if (!panStart) return
          setPan({
            x: panStart.panX + (e.clientX - panStart.x),
            y: panStart.panY + (e.clientY - panStart.y),
          })
        }}
        onMouseUp={() => setPanStart(null)}
        onMouseLeave={() => setPanStart(null)}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            const now = Date.now()
            const t = e.touches[0]
            if (now - lastTap < 300) {
              if (zoomScale > 1) resetZoom()
              else zoomAtPoint(t.clientX, t.clientY, 2.2)
            }
            setLastTap(now)
            setTouchStartX(t.clientX)
            setTouchDeltaX(0)
            if (zoomScale > 1) {
              setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
            }
          }
          if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX
            const dy = e.touches[0].clientY - e.touches[1].clientY
            setPinchStartDist(Math.hypot(dx, dy))
            setPinchStartScale(zoomScale)
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 2 && pinchStartDist) {
            const dx = e.touches[0].clientX - e.touches[1].clientX
            const dy = e.touches[0].clientY - e.touches[1].clientY
            const dist = Math.hypot(dx, dy)
            setZoomScale(clamp((dist / pinchStartDist) * pinchStartScale, 1, 4))
          } else if (e.touches.length === 1) {
            const t = e.touches[0]
            if (zoomScale > 1 && panStart) {
              setPan({
                x: panStart.panX + (t.clientX - panStart.x),
                y: panStart.panY + (t.clientY - panStart.y),
              })
            } else if (touchStartX !== null) {
              setTouchDeltaX(t.clientX - touchStartX)
            }
          }
        }}
        onTouchEnd={() => {
          setPinchStartDist(null)
          setPanStart(null)
          if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
            onNavigate(touchDeltaX > 0 ? "prev" : "next")
          }
          setTouchStartX(null)
          setTouchDeltaX(0)
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,163,155,0.12),transparent_62%)]" />

        <div className="relative z-10 flex h-[calc(100dvh-5.5rem)] w-[min(100%,96vw)] items-center justify-center sm:h-[calc(100dvh-6.5rem)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={item.image}
            src={item.image}
            alt={item.text?.trim() || `Gallery image ${index + 1}`}
            draggable={false}
            className={`max-h-full max-w-full select-none object-contain shadow-[0_24px_80px_rgba(0,0,0,0.5)] ${
              zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
              transition: pinchStartDist || panStart ? "none" : "transform 220ms ease-out",
              transformOrigin: "center center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 py-3 sm:px-6 sm:py-5">
          <div
            className={`${cinzel.className} rounded-full border px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs`}
            style={{
              backgroundColor: "color-mix(in srgb, #976C58 55%, transparent)",
              borderColor: ROSE_BORDER,
              color: IVORY,
            }}
          >
            {index + 1} / {items.length}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border p-2 backdrop-blur-md transition-transform duration-200 hover:scale-105 sm:p-2.5"
            style={{
              backgroundColor: "color-mix(in srgb, #976C58 70%, transparent)",
              borderColor: ROSE_BORDER,
              color: IVORY,
            }}
            aria-label="Close photo"
          >
            <X size={20} className="sm:h-6 sm:w-6" />
          </button>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate("prev")}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2.5 backdrop-blur-md transition-transform duration-200 hover:scale-105 sm:left-5 sm:p-3.5"
              style={{
                background: NAV_ROSE,
                borderColor: ROSE_BORDER,
                color: IVORY,
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} className="sm:h-7 sm:w-7" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("next")}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2.5 backdrop-blur-md transition-transform duration-200 hover:scale-105 sm:right-5 sm:p-3.5"
              style={{
                background: NAV_ROSE,
                borderColor: ROSE_BORDER,
                color: IVORY,
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={24} className="sm:h-7 sm:w-7" />
            </button>
          </>
        )}

        {zoomScale > 1 && (
          <button
            type="button"
            onClick={resetZoom}
            className={`${cinzel.className} absolute bottom-14 right-3 z-20 rounded-full border px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-md sm:bottom-6 sm:right-6`}
            style={{
              backgroundColor: "color-mix(in srgb, #976C58 70%, transparent)",
              borderColor: ROSE_BORDER,
              color: IVORY,
            }}
          >
            Reset Zoom
          </button>
        )}

        {items.length > 1 && (
          <p
            className={`${cinzel.className} absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] sm:hidden`}
            style={{
              backgroundColor: "color-mix(in srgb, #976C58 55%, transparent)",
              borderColor: ROSE_BORDER,
              color: IVORY,
            }}
          >
            Swipe or pinch
          </p>
        )}
      </div>
    </div>,
    document.body,
  )
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 1) % galleryItems.length
          : (prevIndex - 1 + galleryItems.length) % galleryItems.length
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  const openImage = (item: (typeof galleryItems)[0], index: number) => {
    setSelectedImage(item)
    setCurrentIndex(index)
  }

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: galleryBackground }}
    >
      <Section
        id="gallery"
        className="relative z-10 overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
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

      {/* Header */}
      <div className="relative z-20 mx-auto mb-8 max-w-5xl px-3 text-center sm:mb-10 sm:px-4 md:mb-12">
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

      {/* Gallery content — images outside container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-12 pb-2 sm:pb-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
            <div
              className="h-12 w-12 animate-spin rounded-full border-[3px]"
              style={{
                borderColor: "color-mix(in srgb, #E6A39B 30%, transparent)",
                borderTopColor: ROSE,
              }}
            />
          </div>
        ) : (
          <>
            {/* Mobile: swipeable sliding gallery (scroll-snap carousel) */}
            <div className="sm:hidden">
              <div
                className="flex gap-3 overflow-x-auto px-1 pb-3 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Gallery carousel"
              >
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative snap-center shrink-0 w-[82%] overflow-hidden rounded-lg transition-all duration-300"
                    onClick={() => openImage(item, index)}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div
                      className="absolute -inset-0.5 rounded-lg opacity-0 blur-sm transition-opacity duration-300 group-active:opacity-100"
                      style={{
                        background:
                          "color-mix(in srgb, #E6A39B 32%, transparent)",
                      }}
                    />

                    <div className="relative h-[22rem] overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        fill
                        sizes="82vw"
                        className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div
                      className="absolute top-2 right-2 rounded-full px-2 py-1 backdrop-blur-sm"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, #976C58 65%, transparent)",
                      }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: IVORY }}
                      >
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <p
                className={`${cinzel.className} mt-2 text-center tracking-[0.16em] uppercase ${sectionType.label}`}
                style={{ color: ROSE }}
              >
                Swipe to explore
              </p>
            </div>

            {/* Tablet/Desktop: grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
              {galleryItems.map((item, index) => (
                <button
                  key={item.image + index}
                  type="button"
                  className="group relative w-full overflow-hidden rounded-xl transition-all duration-300"
                  onClick={() => openImage(item, index)}
                  aria-label={`Open image ${index + 1}`}
                >
                  <div
                    className="absolute -inset-0.5 rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "color-mix(in srgb, #E6A39B 28%, transparent)",
                    }}
                  />

                  <div className="relative h-[22rem] overflow-hidden rounded-xl md:h-[24rem] lg:h-[26rem]">
                    <Image
                      src={item.image}
                      alt={item.text || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div
                    className="absolute top-2 right-2 rounded-full px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, #976C58 65%, transparent)",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ color: IVORY }}
                    >
                      {index + 1}/{galleryItems.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 md:mt-14 flex justify-center">
              <Link
                href="/gallery"
                className={`${cinzel.className} inline-flex items-center justify-center rounded-full border px-8 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.18em] shadow-[0_8px_18px_color-mix(in_srgb,#E6A39B_22%,transparent)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:text-[0.6875rem] sm:tracking-[0.22em]`}
                style={{
                  background: NAV_ROSE,
                  borderColor: ROSE_BORDER,
                  color: IVORY,
                }}
              >
                View Full Gallery
              </Link>
            </div>
          </>
        )}
      </div>

      {selectedImage && (
        <GalleryLightbox
          items={galleryItems}
          index={currentIndex}
          onClose={() => setSelectedImage(null)}
          onNavigate={navigateImage}
        />
      )}
      </Section>
    </div>
  )
}