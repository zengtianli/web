"use client"

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react"
import {
  SHARED_BRAND,
  MEGA_CATEGORIES,
  SHARED_NO_CURRENT_HOSTS,
  SHARED_CURRENT_HOST_MAP,
  type MegaCategory,
  type MegaItem,
} from "@/lib/shared-navbar.generated"
import { cn } from "@/lib/utils"

type MegaNavbarProps = {
  /** Force a specific current category key (otherwise derived from window.location). */
  currentKey?: string
  /** Extra content rendered at the right of the top bar (before hamburger), e.g. search icon. */
  rightSlot?: ReactNode
  /** Additional class for the outer stack wrapper. */
  className?: string
}

function resolveCurrentKey(host: string): string | null {
  if (SHARED_NO_CURRENT_HOSTS.indexOf(host) !== -1) return null
  const mapped = SHARED_CURRENT_HOST_MAP[host]
  if (mapped) return mapped
  if (host === "hydro.tianlizeng.cloud" || host.indexOf("hydro-") === 0) return "hydro"
  if (host === "tianlizeng.cloud") return "home"
  return null
}

function MegaItemLink({ item }: { item: MegaItem }) {
  return (
    <a
      href={item.url}
      role="menuitem"
      className="flex items-center justify-between py-1.5 text-[13.5px] text-[#1f2328] hover:text-[#0071E3] transition-colors"
    >
      <span>{item.label}</span>
      {item.access === "cf-access" && (
        <span className="ml-2 shrink-0 text-[9px] font-medium uppercase tracking-wider text-[#86868b] border border-black/15 rounded px-[5px] py-[2px]">
          CF
        </span>
      )}
    </a>
  )
}

function MegaPanelBody({ category }: { category: MegaCategory }) {
  return (
    <div className="max-w-[1500px] mx-auto px-5 py-7 md:pb-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-7 md:gap-x-9">
      {category.sections.map((sec) => (
        <div key={sec.title}>
          <h3 className="font-semibold text-[11px] leading-tight uppercase tracking-wider text-[#86868b] mb-2.5">
            {sec.title}
          </h3>
          <ul className="list-none p-0 m-0">
            {sec.items.map((it) => (
              <li key={it.url}>
                <MegaItemLink item={it} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function MegaNavbar({ currentKey, rightSlot, className }: MegaNavbarProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resolvedCurrent, setResolvedCurrent] = useState<string | null>(currentKey ?? null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (currentKey) return
    if (typeof window === "undefined") return
    setResolvedCurrent(resolveCurrentKey(window.location.hostname))
  }, [currentKey])

  const clearHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  const scheduleHide = useCallback(() => {
    clearHide()
    hideTimer.current = setTimeout(() => setActiveKey(null), 160)
  }, [clearHide])

  const openPanel = useCallback(
    (key: string) => {
      clearHide()
      setActiveKey(key)
    },
    [clearHide],
  )

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (stackRef.current && !stackRef.current.contains(e.target as Node)) {
        setActiveKey(null)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveKey(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener("click", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  return (
    <div
      ref={stackRef}
      data-mobile-open={mobileOpen ? "true" : "false"}
      className={cn("fixed top-0 inset-x-0 z-[9999] font-medium text-[13px]", className)}
    >
      <nav
        className="h-11 flex items-center border-b border-black/[0.08]"
        style={{
          background: "rgba(255,255,255,0.85)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          backdropFilter: "saturate(180%) blur(20px)",
        }}
        aria-label="站群导航"
      >
        <div className="max-w-[1500px] w-full mx-auto px-3 md:px-5 flex items-center gap-3 md:gap-5">
          <a
            href={SHARED_BRAND.url}
            className="font-bold text-[#1f2328] hover:text-[#0071E3] transition-colors shrink-0"
          >
            {SHARED_BRAND.label}
          </a>
          <span className="hidden md:inline-block w-px h-[18px] bg-black/[0.12]" aria-hidden="true" />
          <div className="hidden md:flex items-center gap-1 flex-1" role="menubar">
            {MEGA_CATEGORIES.map((cat) => {
              const isActive = activeKey === cat.key
              const isCurrent = resolvedCurrent === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={isActive}
                  aria-controls={`mega-panel-${cat.key}`}
                  onMouseEnter={() => openPanel(cat.key)}
                  onMouseLeave={scheduleHide}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveKey(isActive ? null : cat.key)
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors",
                    isCurrent ? "text-[#1d1d1f] font-semibold" : "text-[#6b7280]",
                    "hover:bg-black/[0.05] hover:text-[#1f2328]",
                    isActive && "bg-black/[0.05] text-[#1f2328]",
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn("text-[9px] opacity-55 transition-transform", isActive && "rotate-180")}
                  >
                    ▾
                  </span>
                </button>
              )
            })}
          </div>
          <div className="hidden md:flex items-center gap-1 ml-auto shrink-0">{rightSlot}</div>
          <button
            type="button"
            className="md:hidden ml-auto p-1.5 text-[#6b7280] hover:text-[#1f2328]"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v)
              setActiveKey(null)
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Desktop mega panels */}
      {MEGA_CATEGORIES.map((cat) => {
        const isOpen = activeKey === cat.key
        return (
          <div
            key={cat.key}
            id={`mega-panel-${cat.key}`}
            role="menu"
            aria-label={cat.label}
            hidden={!isOpen}
            onMouseEnter={clearHide}
            onMouseLeave={scheduleHide}
            className="hidden md:block fixed top-11 inset-x-0 border-b border-black/[0.08] shadow-[0_14px_40px_rgba(0,0,0,0.08)] max-h-[calc(100vh-44px)] overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.96)",
              WebkitBackdropFilter: "saturate(180%) blur(24px)",
              backdropFilter: "saturate(180%) blur(24px)",
            }}
          >
            <MegaPanelBody category={cat} />
          </div>
        )
      })}

      {/* Mobile full-screen accordion */}
      {mobileOpen && (
        <div
          className="md:hidden fixed top-11 inset-x-0 bottom-0 overflow-y-auto border-t border-black/[0.05]"
          style={{
            background: "rgba(255,255,255,0.98)",
            WebkitBackdropFilter: "saturate(180%) blur(24px)",
            backdropFilter: "saturate(180%) blur(24px)",
          }}
        >
          {MEGA_CATEGORIES.map((cat) => {
            const isOpen = activeKey === cat.key
            return (
              <div key={cat.key} className="border-b border-black/[0.05]">
                <button
                  type="button"
                  onClick={() => setActiveKey(isOpen ? null : cat.key)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-[15px] text-[#1f2328]"
                  aria-expanded={isOpen}
                >
                  <span className={cn("font-medium", resolvedCurrent === cat.key && "font-semibold")}>
                    {cat.label}
                  </span>
                  <span className={cn("text-[11px] opacity-55 transition-transform", isOpen && "rotate-180")}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-8 pb-3">
                    {cat.sections.map((sec) => (
                      <div key={sec.title} className="mb-4">
                        <h3 className="font-semibold text-[11px] uppercase tracking-wider text-[#86868b] mb-1.5">
                          {sec.title}
                        </h3>
                        <ul className="list-none p-0 m-0">
                          {sec.items.map((it) => (
                            <li key={it.url}>
                              <MegaItemLink item={it} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <div className="px-5 py-6 text-center text-[13px] text-[#86868b]">
            {rightSlot}
          </div>
        </div>
      )}
    </div>
  )
}
