"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Particles from "@/components/particles"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current

    if (title) {
      title.classList.add("typing-effect")

      const titleAnimationDuration = 1500 // ms

      setTimeout(() => {
        if (subtitle) {
          subtitle.classList.add("typing-effect")
        }
      }, titleAnimationDuration)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <Particles className="absolute inset-0 z-0" />

      <div className="hero-gradient absolute inset-0 z-10"></div>

      <div className="container mx-auto px-4 z-20 text-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-4 inline-block">
          曾田力
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-accent mb-8 inline-block">
          数据驱动的水利创新者 | AI赋能未来水务
        </p>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          融合水利工程专业智慧与前沿信息技术，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战，驱动行业变革。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/about">
            <Button className="group" size="lg">
              深入了解
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="/projects">
            <Button variant="outline" size="lg" className="group">
              查看项目
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
