"use client"

import React from "react"
import { cn } from "@/lib/utils"
import AnimatedElement from "@/components/atoms/AnimatedElement"

// 简化的类型定义
type GridStrategy = "optimal" | "responsive" | "compact" | "auto"
type AnimationType = "fadeInUp" | "slideInLeft" | "slideInRight" | "none"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  strategy?: GridStrategy
  gap?: "sm" | "md" | "lg"
  animation?: AnimationType
  baseDelay?: number
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
  className,
  ...props
}: ResponsiveGridProps) {
  const items = React.Children.toArray(children)
  
  // 网格布局类
  const gridClasses = getGridLayout(items.length, strategy, gap)

  return (
    <div className={cn(gridClasses, className)} {...props}>
      {items.map((child, index) => (
        <AnimatedElement
          key={index}
          animation={animation}
          staggerIndex={index}
          staggerBaseDelay={baseDelay}
        >
          {child}
        </AnimatedElement>
      ))}
    </div>
  )
}