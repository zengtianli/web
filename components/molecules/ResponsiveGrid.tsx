/**
 * ResponsiveGrid - 响应式网格容器组件
 * 
 * 封装所有现有组件中重复的网格布局逻辑和交错动画
 * 基于 academic-papers.tsx, awards.tsx, patents.tsx, software-copyrights.tsx 的模式提取
 */

"use client"

import React from "react"
import { getGridLayout, type GridStrategy, type AnimationType } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import AnimatedElement from "@/components/atoms/AnimatedElement"

interface ResponsiveGridProps {
  children: React.ReactNode[]
  
  // 网格配置
  strategy?: GridStrategy // 网格策略，对应原来的 getGridCols 逻辑
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  baseColumns?: string // 基础列数 (移动端)
  
  // 动画配置
  enableAnimation?: boolean
  animation?: AnimationType
  baseDelay?: number // 交错动画的基础延迟
  maxDelay?: number // 最大延迟
  staggerMultiplier?: number // 交错倍数，对应原来的 index * 100/200
  
  // useInView 配置 
  threshold?: number
  triggerOnce?: boolean
  
  // 样式配置
  className?: string
  itemClassName?: string // 应用到每个网格项的类名
  
  // HTML 属性
  as?: keyof JSX.IntrinsicElements
  [key: string]: any
}

/**
 * ResponsiveGrid 组件
 * 
 * @example
 * // 基础用法 (替换原有的 getGridCols + 手动网格)
 * <ResponsiveGrid items={awards}>
 *   {awards.map((award, index) => (
 *     <AwardCard key={index} {...award} />
 *   ))}
 * </ResponsiveGrid>
 * 
 * @example
 * // 自定义策略和动画
 * <ResponsiveGrid 
 *   strategy="compact" 
 *   animation="slideInLeft"
 *   baseDelay={150}
 *   staggerMultiplier={200}
 * >
 *   {items.map((item, index) => (
 *     <ItemCard key={index} {...item} />
 *   ))}
 * </ResponsiveGrid>
 * 
 * @example
 * // 禁用动画的网格
 * <ResponsiveGrid enableAnimation={false} strategy="two-column">
 *   {items.map((item, index) => (
 *     <StaticCard key={index} {...item} />
 *   ))}
 * </ResponsiveGrid>
 */
export default function ResponsiveGrid({
  children,
  
  // 网格配置
  strategy = "optimal", // 对应原来的 getGridCols 逻辑
  gap = "md",
  baseColumns = "grid-cols-1",
  
  // 动画配置
  enableAnimation = true,
  animation = "fadeInUp",
  baseDelay = 100,
  maxDelay = 800,
  staggerMultiplier, // 自动根据策略确定
  
  // useInView 配置
  threshold = 0.1,
  triggerOnce = true,
  
  // 样式配置
  className,
  itemClassName,
  
  // HTML 属性
  as: Element = "div",
  ...props
}: ResponsiveGridProps) {
  
  const itemCount = React.Children.count(children)
  
  // 自动确定交错倍数 (基于现有组件的模式)
  const finalStaggerMultiplier = staggerMultiplier ?? (() => {
    switch (strategy) {
      case 'optimal':
      case 'responsive':
        return itemCount <= 6 ? 100 : 200 // 项目少用100ms，多用200ms
      case 'compact':
      case 'three-column':
        return 200 // 紧密布局用更大的延迟
      case 'two-column':
        return 150 // 两列布局用中等延迟
      default:
        return 100
    }
  })()
  
  // 生成网格布局类名
  const gridClasses = getGridLayout(itemCount, {
    strategy,
    gap,
    baseColumns,
  })
  
  return (
    <Element 
      className={cn(gridClasses, className)}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        
        // 如果启用动画，包装每个子元素
        if (enableAnimation) {
          return (
            <AnimatedElement
              key={child.key || index}
              animation={animation}
              index={index}
              baseDelay={finalStaggerMultiplier} // 使用计算出的倍数
              maxDelay={maxDelay}
              threshold={threshold}
              triggerOnce={triggerOnce}
              className={itemClassName}
            >
              {child}
            </AnimatedElement>
          )
        }
        
        // 不启用动画时，直接应用样式类名
        if (itemClassName) {
          return React.cloneElement(child, {
            className: cn(child.props.className, itemClassName)
          })
        }
        
        return child
      })}
    </Element>
  )
}

/**
 * 预定义的网格变体
 * 为特定使用场景提供更便捷的使用方式
 */

/**
 * OptimalGrid - 智能网格 (最常用，对应原来的 getGridCols 逻辑)
 * 根据项目数量自动优化列数
 */
interface OptimalGridProps extends Omit<ResponsiveGridProps, 'strategy'> {}

export function OptimalGrid({ children, ...props }: OptimalGridProps) {
  return (
    <ResponsiveGrid strategy="optimal" {...props}>
      {children}
    </ResponsiveGrid>
  )
}

/**
 * CompactGrid - 紧密网格 (1/3列)
 * 适用于内容较多的场景
 */
export function CompactGrid({ children, ...props }: OptimalGridProps) {
  return (
    <ResponsiveGrid 
      strategy="compact" 
      staggerMultiplier={200}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

/**
 * TwoColumnGrid - 两列网格
 * 适用于内容较长的卡片
 */
export function TwoColumnGrid({ children, ...props }: OptimalGridProps) {
  return (
    <ResponsiveGrid 
      strategy="two-column"
      staggerMultiplier={150}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

/**
 * ThreeColumnGrid - 三列网格
 * 固定三列布局
 */
export function ThreeColumnGrid({ children, ...props }: OptimalGridProps) {
  return (
    <ResponsiveGrid 
      strategy="three-column"
      staggerMultiplier={200}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

/**
 * StaticGrid - 无动画网格
 * 当不需要动画效果时使用
 */
export function StaticGrid({ children, ...props }: OptimalGridProps) {
  return (
    <ResponsiveGrid 
      enableAnimation={false}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

/**
 * StaggeredGrid - 自定义交错动画网格
 * 提供更多动画控制选项
 */
interface StaggeredGridProps extends Omit<ResponsiveGridProps, 'enableAnimation'> {
  staggerDelay: number // 必须指定交错延迟
}

export function StaggeredGrid({ 
  children, 
  staggerDelay, 
  ...props 
}: StaggeredGridProps) {
  return (
    <ResponsiveGrid 
      enableAnimation={true}
      staggerMultiplier={staggerDelay}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

/**
 * MasonryGrid - 瀑布流网格 (实验性)
 * 使用 CSS Grid 的 masonry 布局 (需要浏览器支持)
 */
interface MasonryGridProps extends Omit<ResponsiveGridProps, 'strategy'> {
  columns?: number
}

export function MasonryGrid({ 
  children, 
  columns = 3,
  className,
  ...props 
}: MasonryGridProps) {
  
  const masonryClasses = cn(
    `columns-1 md:columns-${Math.min(columns, 3)} gap-4`,
    className
  )
  
  return (
    <ResponsiveGrid 
      strategy="optimal"
      className={masonryClasses}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          {child}
        </div>
      ))}
    </ResponsiveGrid>
  )
}

/**
 * AutoFitGrid - 自适应网格
 * 根据内容宽度自动调整列数
 */
interface AutoFitGridProps extends Omit<ResponsiveGridProps, 'strategy'> {
  minItemWidth?: string // 最小项目宽度
}

export function AutoFitGrid({ 
  children, 
  minItemWidth = "300px",
  className,
  gap = "md",
  ...props 
}: AutoFitGridProps) {
  
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4', 
    lg: 'gap-6',
    xl: 'gap-8',
  }
  
  const autoFitClasses = cn(
    `grid grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`,
    gapClasses[gap],
    className
  )
  
  return (
    <ResponsiveGrid 
      strategy="optimal"
      enableAnimation={props.enableAnimation}
      className={autoFitClasses}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}
