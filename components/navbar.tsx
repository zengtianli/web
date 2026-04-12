"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

import { navigationConfig, brandConfig } from "@/lib/profile-config"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-orbitron font-bold text-accent" aria-label="返回首页">
          {brandConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="主导航">
          {navigationConfig.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative py-2 text-sm font-medium transition-colors hover:text-accent",
                pathname === item.path
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                  : "text-foreground/70",
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/search"
            className={cn(
              "relative py-2 transition-colors hover:text-accent",
              pathname === "/search" ? "text-accent" : "text-foreground/70",
            )}
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isMobile && (
        <nav 
          id="mobile-navigation"
          className="fixed inset-0 top-16 bg-background z-40 flex flex-col items-center pt-12"
          aria-label="移动端导航"
        >
          {navigationConfig.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-full py-4 text-center text-lg font-medium transition-colors",
                pathname === item.path ? "text-accent" : "text-foreground/70 hover:text-accent",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/search"
            className={cn(
              "w-full py-4 text-center text-lg font-medium transition-colors",
              pathname === "/search" ? "text-accent" : "text-foreground/70 hover:text-accent",
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            搜索
          </Link>
        </nav>
      )}
    </header>
  )
}
