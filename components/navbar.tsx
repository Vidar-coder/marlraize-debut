"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import StaggeredMenu from "./StaggeredMenu"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

// Debut palette: #FCE7E1 #F4CFC8 #E6A39B #C89E8C #976C58 #A5B29A #FDECE6


const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#wedding-timeline", label: "Timeline" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "#entourage", label: "Entourage" },
  { href: "#messages", label: "Messages" },
  { href: "#faq", label: "FAQ" },
  { href: "#registry", label: "Registry" },
  { href: "#snap-share", label: "Snap Share" },
  { href: "#see-you-there", label: "See You There" },
]

export function Navbar() {
  const siteConfig = useSiteConfig()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? "shadow-[0_12px_32px_rgba(151,108,88,0.22)]"
          : "shadow-[0_6px_18px_rgba(151,108,88,0.12)]"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #E6A39B 0%, #C89E8C 42%, #976C58 100%)",
        borderBottom: "1px solid color-mix(in srgb, #976C58 45%, transparent)",
      }}
    >
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-[color-mix(in_srgb,#976C58_12%,transparent)] pointer-events-none" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[color-mix(in_srgb,#976C58_16%,transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image
                src={siteConfig.couple.monogram}
                alt={`${siteConfig.couple.debutNickname} Monogram`}
                fill
                className="object-contain group-hover:scale-110 group-active:scale-105 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(151,108,88,0.35)] group-hover:drop-shadow-[0_4px_14px_rgba(253,236,230,0.45)]"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          </Link>

          <div className="hidden xl:flex gap-0.5 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-2 py-2 text-xs lg:px-2.5 lg:text-sm ${cormorant.className} font-medium rounded-lg transition-all duration-500 relative group ${
                    isActive
                      ? "text-[#976C58] bg-[#FDECE6]/95 backdrop-blur-md shadow-[0_6px_18px_rgba(151,108,88,0.16)] border border-[#FCE7E1]/80"
                      : "text-[#FDECE6] hover:text-white hover:bg-white/16 hover:border hover:border-white/35 hover:shadow-[0_6px_18px_rgba(151,108,88,0.12)] hover:scale-105 active:scale-95 bg-transparent border border-transparent"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#FDECE6] transition-all duration-500 rounded-full ${
                      isActive
                        ? "w-full shadow-[0_0_10px_rgba(253,236,230,0.7)]"
                        : "w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(253,236,230,0.55)]"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E6A39B] animate-pulse shadow-[0_0_6px_#E6A39B]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="xl:hidden flex items-center justify-end h-full">
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              menuButtonColor="#FDECE6"
              openMenuButtonColor="#976C58"
              changeMenuColorOnOpen={true}
              colors={[
                "#F4CFC8",
                "#E6A39B",
                "#FCE7E1",
                "#FDECE6",
              ]}
              accentColor="#E6A39B"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>

      </div>
    </nav>
  )
}
