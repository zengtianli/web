"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { heroConfig } from "@/lib/profile-config"

export default function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10"></div>

      <div className="container mx-auto px-4 z-20 text-center" ref={ref}>
        <h1 className={cn(
          "text-5xl md:text-7xl font-bold mb-4 inline-block",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out"
        )}>
          {heroConfig.name}
        </h1>

        <p className={cn(
          "text-xl md:text-2xl text-accent mb-8 inline-block",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-200"
        )}>
          {heroConfig.tagline}
        </p>

        <p className={cn(
          "text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-400"
        )}>
          {/* 处理高亮关键词 */}
          {heroConfig.description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const keyword = part.slice(2, -2);
              return (
                <span key={index} className="text-accent font-medium">
                  {keyword}
                </span>
              );
            }
            return part;
          })}
        </p>

        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-600"
        )}>
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
