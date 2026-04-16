"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useTrack } from "@/components/track-provider"
import { navigationConfig, brandConfig } from "@/lib/profile-config"
import { TRACK_META, type Track } from "@/lib/track"

const NAV_BG: Record<Track, string> = {
  hydro:    'bg-[#E3F0FF]/80',
  ai:       'bg-[#F0E8FF]/80',
  devtools: 'bg-[#DFFBE9]/80',
  indie:    'bg-[#FFF3D6]/80',
}

const TRACK_LINE_COLORS: Record<string, string> = {
  hydro: 'bg-blue-400',
  ai: 'bg-purple-400',
  devtools: 'bg-emerald-400',
  indie: 'bg-amber-400',
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { activeDirection } = useTrack()

  const isHomepage = pathname === '/'
  const showTrackLine = !isHomepage && activeDirection

  // Brand text: 首页只显示名字，其他页面带方向
  const brandText = isHomepage || !activeDirection
    ? brandConfig.name
    : `${brandConfig.name} · ${TRACK_META[activeDirection].label}`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? `${activeDirection ? NAV_BG[activeDirection] : 'bg-[#fbfbfd]/80'} backdrop-blur-xl`
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#1d1d1f]" aria-label="返回首页">
          {brandText}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="主导航">
          {navigationConfig.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm transition-colors duration-200",
                pathname === item.path
                  ? "text-[#1d1d1f]"
                  : "text-[#86868b] hover:text-[#1d1d1f]",
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/search"
            className={cn(
              "transition-colors duration-200",
              pathname === "/search" ? "text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]",
            )}
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isMenuOpen}
            className="text-[#86868b] hover:text-[#1d1d1f]"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Track color line */}
      {showTrackLine && (
        <div className={cn("h-[2px] w-full transition-all duration-500", TRACK_LINE_COLORS[activeDirection] || 'bg-gray-200')} />
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && isMobile && (
        <nav
          className={`fixed inset-0 top-16 ${activeDirection ? NAV_BG[activeDirection].replace('/80', '/95') : 'bg-[#fbfbfd]/95'} backdrop-blur-xl z-40 flex flex-col items-center pt-12`}
          aria-label="移动端导航"
        >
          {navigationConfig.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-full py-4 text-center text-lg transition-colors duration-200",
                pathname === item.path ? "text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/search"
            className="w-full py-4 text-center text-lg text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            搜索
          </Link>
        </nav>
      )}
    </header>
  )
}
