/**
 * Hero 区域组件 - 简化版
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { heroConfig } from "@/lib/profile-config"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10"></div>

      <div className="container mx-auto px-4 z-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {heroConfig.name}
        </h1>

        <p className="text-xl md:text-2xl text-accent mb-8">
          {heroConfig.tagline}
        </p>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          {heroConfig.description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const keyword = part.slice(2, -2)
              return (
                <span key={index} className="text-accent font-medium">
                  {keyword}
                </span>
              )
            }
            return part
          })}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {heroConfig.buttons.map((button, index) => (
            <Link key={index} href={button.href}>
              <Button variant={button.variant} size="lg" className="group">
                {button.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
