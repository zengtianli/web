"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { SearchDialog } from "@/components/search-dialog"
import { navigationConfig, brandConfig } from "@/lib/profile-config"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // 添加淡入效果
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-orbitron font-bold text-accent">
          {brandConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationConfig.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative py-2 text-sm font-medium transition-colors hover:text-accent",
                pathname === item.path
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                  : "text-foreground/70",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
                "transition-all duration-500",
                `delay-${index * 100}`,
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className={cn(
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
            "transition-all duration-500",
            `delay-${navigationConfig.length * 100}`,
          )}>
            <SearchDialog />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <SearchDialog />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 top-16 bg-background z-40 flex flex-col items-center pt-12 animate-slide-down">
          {navigationConfig.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-full py-4 text-center text-lg font-medium transition-colors",
                pathname === item.path ? "text-accent" : "text-foreground/70 hover:text-accent",
                "animate-fade-in",
                `animate-delay-${index * 100}`,
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-full flex justify-center py-4 animate-fade-in animate-delay-500">
            <SearchDialog />
          </div>
        </div>
      )}
    </header>
  )
}
