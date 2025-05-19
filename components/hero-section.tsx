"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

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
          曾田力
        </h1>

        <p className={cn(
          "text-xl md:text-2xl text-accent mb-8 inline-block",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-200"
        )}>
          数据驱动水利创新 | AI赋能未来水务
        </p>

        <p className={cn(
          "text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-400"
        )}>
          融合<span className="text-accent font-medium">水利工程</span>专业智慧与<span className="text-accent font-medium">前沿信息技术</span>，致力于通过<span className="text-accent font-medium">数据分析</span>、<span className="text-accent font-medium">智能模型</span>及<span className="text-accent font-medium">软件系统</span>研发，解决复杂水资源挑战，驱动行业变革。
        </p>

        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-700 ease-out delay-600"
        )}>
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
