"use client"

import React from "react"
import { cn } from "@/lib/utils"
import AnimatedElement from "@/components/atoms/AnimatedElement"
import { useInView } from "react-intersection-observer"

// 简化的类型定义
type GridStrategy = "optimal" | "responsive" | "compact" | "auto"
type AnimationType = "fadeInUp" | "slideInLeft" | "slideInRight" | "none"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  strategy?: GridStrategy
  gap?: "sm" | "md" | "lg"
  animation?: AnimationType
  baseDelay?: number
  staggerDelay?: number
  enableInView?: boolean
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

// 简化的网格布局函数
function getGridLayout(itemCount: number, strategy: GridStrategy, gap: string): string {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4", 
    lg: "gap-6"
  }[gap] || "gap-4"
  
  switch (strategy) {
    case "optimal":
      if (itemCount <= 2) return `grid grid-cols-1 md:grid-cols-2 ${gapClasses}`
      if (itemCount === 3) return `grid grid-cols-1 md:grid-cols-3 ${gapClasses}`
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClasses}`
    case "responsive":
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClasses}`
    case "compact":
      return `grid grid-cols-1 md:grid-cols-2 ${gapClasses}`
    case "auto":
      return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gapClasses}`
    default:
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClasses}`
  }
}

export default function ResponsiveGrid({
  children,
  strategy = "optimal",
  gap = "md",
  animation = "fadeInUp",
  baseDelay = 100,
  staggerDelay = 200,
  enableInView = true,
  threshold = 0.1,
  triggerOnce = true,
  className,
  ...props
}: ResponsiveGridProps) {
  const items = React.Children.toArray(children)
  
  // 网格布局类
  const gridClasses = getGridLayout(items.length, strategy, gap)
  
  // 使用 inView 动画（可选）
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    skip: !enableInView, // 如果不启用 inView，跳过
  })

  return (
    <div ref={enableInView ? ref : undefined} className={cn(gridClasses, className)} {...props}>
      {items.map((child, index) => {
        // 如果启用了 inView，使用 inView 状态；否则总是显示
        const shouldAnimate = enableInView ? inView : true
        const staggerIndex = shouldAnimate ? index : 0
        const delay = shouldAnimate ? index * staggerDelay : 0

        return (
          <AnimatedElement
            key={index}
            animation={animation}
            staggerIndex={staggerIndex}
            staggerBaseDelay={baseDelay}
            delay={delay}
            className={cn(
              enableInView && (
                shouldAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              ),
              enableInView && "transition-all duration-700 ease-out"
            )}
          >
            {child}
          </AnimatedElement>
        )
      })}
    </div>
  )
}