"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useTrack } from "@/components/track-provider"
import { navigationConfig } from "@/lib/profile-config"
import { SHARED_BRAND, SHARED_LINKS } from "@/lib/shared-navbar.generated"
import { type Track } from "@/lib/track"

// 第二行（主站内导航）跟 Track 主题色
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

/** 主站 Navbar：两行
 * 第一行（44px）— 与子站 site-navbar.html 视觉一致的玻璃 navbar，6 个站群链接 + brand
 * 第二行（44px）— 主站独有 5 项内导航 + 搜索，跟 Track 主题色
 * 移动端：仅第一行可见，hamburger 展开两组合并菜单
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { activeDirection } = useTrack()

  const showTrackLine = pathname !== '/' && activeDirection
  const internalBg = activeDirection ? NAV_BG[activeDirection] : 'bg-[#fbfbfd]/80'

  // 顶行 active key — 与 site-navbar.html 的 JS 逻辑一致
  // 主站只能 active services（其他站群链接打开新站点，不在主站 active）
  const sharedCurrent = pathname.startsWith('/services') ? 'services' : 'home'

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* === 第一行：玻璃 navbar，与子站完全一致 === */}
      <nav
        className="h-11 flex items-center border-b border-black/[0.08]"
        style={{
          background: 'rgba(255,255,255,0.85)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          backdropFilter: 'saturate(180%) blur(20px)',
        }}
        aria-label="站群导航"
      >
        <div className="max-w-[1500px] w-full mx-auto px-5 flex items-center gap-1
          font-medium text-[13px] leading-none">
          <a
            href={SHARED_BRAND.url}
            className="font-bold text-[#1f2328] hover:text-[#0071E3] transition-colors duration-100"
          >
            {SHARED_BRAND.label}
          </a>
          <span className="hidden sm:inline-block w-px h-[18px] bg-black/[0.12] mx-2" />
          <div className="hidden md:flex items-center gap-1">
            {SHARED_LINKS.map((l) => (
              <a
                key={l.key}
                href={l.url}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-all duration-100",
                  sharedCurrent === l.key
                    ? "bg-[#1f2328] text-white"
                    : "text-[#6b7280] hover:bg-black/[0.05] hover:text-[#1f2328]",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden ml-auto p-1.5 text-[#6b7280] hover:text-[#1f2328]"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* === 第二行：主站内导航 + 搜索（跟 Track 主题色），移动端隐藏 === */}
      <nav
        className={cn(
          "hidden md:flex h-11 items-center border-b border-black/[0.05]",
          "backdrop-blur-md transition-colors",
          internalBg,
        )}
        aria-label="主站导航"
      >
        <div className="max-w-[1500px] w-full mx-auto px-5 flex items-center gap-6
          text-[13px] font-medium">
          {navigationConfig.map((it) => {
            const isExternal = (it as any).external === true
            const isActive = pathname === it.path
            const cls = cn(
              "py-1.5 transition-colors duration-100",
              isActive
                ? "text-[#1d1d1f] font-semibold"
                : "text-[#6b7280] hover:text-[#1f2328]",
            )
            return isExternal ? (
              <a key={it.path} href={it.path} target="_blank" rel="noopener" className={cls}>
                {it.name}
              </a>
            ) : (
              <Link key={it.path} href={it.path} className={cls}>
                {it.name}
              </Link>
            )
          })}
          <Link
            href="/search"
            className={cn(
              "ml-auto py-1.5 transition-colors duration-100",
              pathname === '/search'
                ? "text-[#1d1d1f]"
                : "text-[#6b7280] hover:text-[#1f2328]",
            )}
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Track 颜色线 */}
      {showTrackLine && (
        <div className={cn(
          "h-[2px] w-full transition-all duration-500",
          TRACK_LINE_COLORS[activeDirection] || 'bg-gray-200'
        )} />
      )}

      {/* === 移动端展开菜单（覆盖第一行下方）=== */}
      {isMenuOpen && isMobile && (
        <div
          className={cn(
            "fixed inset-x-0 top-11 bottom-0 z-40 backdrop-blur-xl flex flex-col pt-2 pb-12 overflow-y-auto",
            activeDirection ? NAV_BG[activeDirection].replace('/80', '/95') : "bg-[#fbfbfd]/95"
          )}
          role="navigation"
          aria-label="移动端导航"
        >
          <div className="px-5 py-2 text-[11px] uppercase tracking-wider text-[#86868b]">站群</div>
          {SHARED_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.url}
              className={cn(
                "block w-full px-5 py-3 text-[15px]",
                sharedCurrent === l.key
                  ? "bg-[#1f2328] text-white font-medium"
                  : "text-[#1f2328] hover:bg-black/[0.05]",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}

          <div className="px-5 py-2 mt-3 text-[11px] uppercase tracking-wider text-[#86868b]">主站</div>
          {navigationConfig.map((it) => {
            const isExternal = (it as any).external === true
            const cls = cn(
              "block w-full px-5 py-3 text-[15px]",
              pathname === it.path
                ? "text-[#1d1d1f] font-semibold"
                : "text-[#1f2328] hover:bg-black/[0.05]",
            )
            return isExternal ? (
              <a key={it.path} href={it.path} target="_blank" rel="noopener"
                 className={cls} onClick={() => setIsMenuOpen(false)}>
                {it.name}
              </a>
            ) : (
              <Link key={it.path} href={it.path} className={cls}
                    onClick={() => setIsMenuOpen(false)}>
                {it.name}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="block w-full px-5 py-3 text-[15px] text-[#1f2328] hover:bg-black/[0.05]"
            onClick={() => setIsMenuOpen(false)}
          >
            搜索
          </Link>
        </div>
      )}
    </header>
  )
}
