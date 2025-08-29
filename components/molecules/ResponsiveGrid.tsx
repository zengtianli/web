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
  // 🎨 新增：高度对齐选项
  alignItems?: "start" | "stretch" | "center" | "end"
  // 🎨 新增：最小高度选项
  minItemHeight?: string | number
}

// 🎨 增强的网格布局函数 - 支持对齐方式
function getGridLayout(
  itemCount: number, 
  strategy: GridStrategy, 
  gap: string, 
  alignItems: string = "start"
): string {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4", 
    lg: "gap-6"
  }[gap] || "gap-4"
  
  // 🎨 高度对齐类
  const alignClasses = {
    start: "items-start",
    stretch: "items-stretch", // 🔥 这是关键！让同行卡片高度一致
    center: "items-center", 
    end: "items-end"
  }[alignItems] || "items-start"
  
  const baseGridClass = `grid ${gapClasses} ${alignClasses}`
  
  switch (strategy) {
    case "optimal":
      if (itemCount <= 2) return `${baseGridClass} grid-cols-1 md:grid-cols-2`
      if (itemCount === 3) return `${baseGridClass} grid-cols-1 md:grid-cols-3`
      return `${baseGridClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    case "responsive":
      return `${baseGridClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    case "compact":
      return `${baseGridClass} grid-cols-1 md:grid-cols-2`
    case "auto":
      return `${baseGridClass} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
    default:
      return `${baseGridClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
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
  // 🎨 新参数：高度对齐
  alignItems = "start",
  minItemHeight,
  ...props
}: ResponsiveGridProps) {
  const items = React.Children.toArray(children)
  
  // 🎨 增强的网格布局类 - 包含对齐方式
  const gridClasses = getGridLayout(items.length, strategy, gap, alignItems)
  
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
              enableInView && "transition-all duration-700 ease-out",
              // 🎨 支持最小高度
              alignItems === "stretch" && "h-full",
              minItemHeight && `min-h-[${minItemHeight}]`
            )}
            // 🎨 传递 style 支持最小高度
            style={minItemHeight ? { minHeight: minItemHeight } : undefined}
          >
            {child}
          </AnimatedElement>
        )
      })}
    </div>
  )
}