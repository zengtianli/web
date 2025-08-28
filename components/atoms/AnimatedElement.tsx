/**
 * AnimatedElement - 带动画的基础元素组件
 * 
 * 封装所有现有组件中重复的 useInView 动画逻辑，提供统一的入场动画解决方案
 * 基于现有组件中 30+ 处重复的动画代码模式提取
 */

"use client"

import React from "react"
import { useInView } from "react-intersection-observer"
import { getAnimationWithStagger, type AnimationType } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: React.ReactNode
  
  // 动画配置
  animation?: AnimationType
  index?: number // 用于交错动画，从 0 开始
  baseDelay?: number // 基础延迟 (ms)
  maxDelay?: number // 最大延迟 (ms)
  duration?: string // 动画持续时间
  easing?: string // 缓动函数
  
  // useInView 配置
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
  
  // HTML 属性
  as?: keyof JSX.IntrinsicElements // 渲染为什么元素
  className?: string
  
  // 其他属性透传
  [key: string]: any
}

/**
 * AnimatedElement 组件
 * 
 * @example
 * // 基础用法 (最常用的 fadeInUp 动画)
 * <AnimatedElement>
 *   <Card>内容</Card>
 * </AnimatedElement>
 * 
 * @example  
 * // 交错动画 (用于列表项)
 * {items.map((item, index) => (
 *   <AnimatedElement key={item.id} index={index} baseDelay={100}>
 *     <Card>{item.content}</Card>
 *   </AnimatedElement>
 * ))}
 * 
 * @example
 * // 自定义动画类型
 * <AnimatedElement animation="slideInLeft" duration="duration-500">
 *   <div>从左滑入的内容</div>
 * </AnimatedElement>
 * 
 * @example
 * // 渲染为特定元素
 * <AnimatedElement as="section" className="my-8">
 *   <h2>章节标题</h2>
 * </AnimatedElement>
 */
export default function AnimatedElement({
  children,
  animation = "fadeInUp",
  index = 0,
  baseDelay = 100,
  maxDelay = 800,
  duration = "duration-700",
  easing = "ease-out",
  threshold = 0.1,
  triggerOnce = true,
  rootMargin,
  as: Element = "div",
  className,
  ...props
}: AnimatedElementProps) {
  
  // useInView hook - 基于现有组件的配置提取
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  })
  
  // 生成动画类名 - 使用设计系统的工具函数
  const animationClasses = getAnimationWithStagger(
    inView,
    index,
    {
      animationType: animation,
      baseDelay,
      maxDelay,
      duration,
      easing,
    }
  )
  
  return (
    <Element
      ref={ref}
      className={cn(animationClasses, className)}
      {...props}
    >
      {children}
    </Element>
  )
}

/**
 * 预定义的动画组件变体
 * 为常用场景提供更便捷的使用方式
 */

/**
 * FadeInUp - 最常用的从下方淡入动画
 */
export function FadeInUp({ 
  children, 
  index = 0, 
  className, 
  ...props 
}: Omit<AnimatedElementProps, 'animation'>) {
  return (
    <AnimatedElement 
      animation="fadeInUp" 
      index={index}
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  )
}

/**
 * SlideInLeft - 从左侧滑入动画
 */
export function SlideInLeft({ 
  children, 
  index = 0, 
  className, 
  ...props 
}: Omit<AnimatedElementProps, 'animation'>) {
  return (
    <AnimatedElement 
      animation="slideInLeft" 
      index={index}
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  )
}

/**
 * SlideInRight - 从右侧滑入动画
 */
export function SlideInRight({ 
  children, 
  index = 0, 
  className, 
  ...props 
}: Omit<AnimatedElementProps, 'animation'>) {
  return (
    <AnimatedElement 
      animation="slideInRight" 
      index={index}
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  )
}

/**
 * ScaleIn - 缩放淡入动画
 */
export function ScaleIn({ 
  children, 
  index = 0, 
  className, 
  ...props 
}: Omit<AnimatedElementProps, 'animation'>) {
  return (
    <AnimatedElement 
      animation="scaleIn" 
      index={index}
      duration="duration-500" // scaleIn 使用较快的动画
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  )
}

/**
 * StaggeredList - 交错动画列表容器
 * 为列表项提供自动的交错动画效果
 */
interface StaggeredListProps {
  children: React.ReactNode[]
  animation?: AnimationType
  baseDelay?: number
  maxDelay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  [key: string]: any
}

export function StaggeredList({
  children,
  animation = "fadeInUp",
  baseDelay = 100,
  maxDelay = 800,
  className,
  as: Element = "div",
  ...props
}: StaggeredListProps) {
  return (
    <Element className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <AnimatedElement
          key={index}
          animation={animation}
          index={index}
          baseDelay={baseDelay}
          maxDelay={maxDelay}
        >
          {child}
        </AnimatedElement>
      ))}
    </Element>
  )
}
