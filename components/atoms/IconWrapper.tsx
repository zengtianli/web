/**
 * IconWrapper - 统一的图标容器组件
 * 
 * 提供统一的图标样式、尺寸和容器，解决现有组件中图标样式不一致的问题
 * 基于现有组件中的图标使用模式提取
 */

"use client"

import React from "react"
import { iconVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

interface IconWrapperProps extends VariantProps<typeof iconVariants> {
  children: React.ReactNode // 图标元素 (如 <FileText />)
  className?: string
  
  // 容器属性
  as?: keyof JSX.IntrinsicElements
  
  // 其他属性透传 (如 onClick, aria-label 等)
  [key: string]: any
}

/**
 * IconWrapper 组件
 * 
 * @example
 * // 基础用法 (默认样式)
 * <IconWrapper>
 *   <FileText />
 * </IconWrapper>
 * 
 * @example
 * // 不同变体和尺寸
 * <IconWrapper variant="primary" size="lg">
 *   <Award />
 * </IconWrapper>
 * 
 * @example
 * // 边框样式
 * <IconWrapper variant="outline" size="xl">
 *   <Github />
 * </IconWrapper>
 * 
 * @example
 * // 可点击的图标
 * <IconWrapper 
 *   variant="primary" 
 *   className="cursor-pointer hover:scale-105 transition-transform"
 *   onClick={handleClick}
 *   aria-label="点击查看详情"
 * >
 *   <ExternalLink />
 * </IconWrapper>
 */
export default function IconWrapper({
  children,
  variant = "default",
  size = "md",
  className,
  as: Element = "div",
  ...props
}: IconWrapperProps) {
  return (
    <Element
      className={cn(iconVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Element>
  )
}

/**
 * 预定义的图标容器变体
 * 为常用场景提供更便捷的使用方式
 */

/**
 * AccentIcon - 强调色图标 (最常用)
 * 对应现有组件中 text-accent 的使用模式
 */
export function AccentIcon({ 
  children, 
  size = "md", 
  className, 
  ...props 
}: Omit<IconWrapperProps, 'variant'>) {
  return (
    <IconWrapper 
      variant="default" 
      size={size}
      className={className}
      {...props}
    >
      {children}
    </IconWrapper>
  )
}

/**
 * MutedIcon - 次要图标
 * 用于不需要突出显示的图标
 */
export function MutedIcon({ 
  children, 
  size = "md", 
  className, 
  ...props 
}: Omit<IconWrapperProps, 'variant'>) {
  return (
    <IconWrapper 
      variant="muted" 
      size={size}
      className={className}
      {...props}
    >
      {children}
    </IconWrapper>
  )
}

/**
 * OutlineIcon - 边框图标
 * 带边框的圆形图标容器
 */
export function OutlineIcon({ 
  children, 
  size = "md", 
  className, 
  ...props 
}: Omit<IconWrapperProps, 'variant'>) {
  return (
    <IconWrapper 
      variant="outline" 
      size={size}
      className={className}
      {...props}
    >
      {children}
    </IconWrapper>
  )
}

/**
 * PrimaryIcon - 主要图标
 * 使用主题色的图标容器
 */
export function PrimaryIcon({ 
  children, 
  size = "md", 
  className, 
  ...props 
}: Omit<IconWrapperProps, 'variant'>) {
  return (
    <IconWrapper 
      variant="primary" 
      size={size}
      className={className}
      {...props}
    >
      {children}
    </IconWrapper>
  )
}

/**
 * PlainIcon - 纯图标 (无容器)
 * 当只需要统一图标尺寸而不需要背景容器时使用
 */
interface PlainIconProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  [key: string]: any
}

export function PlainIcon({ 
  children, 
  size = 'md', 
  className,
  ...props 
}: PlainIconProps) {
  
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }
  
  // 为图标元素添加尺寸类名
  const iconWithSize = React.cloneElement(
    children as React.ReactElement,
    {
      className: cn(sizeClasses[size], 'text-current', className),
      ...props
    }
  )
  
  return iconWithSize
}

/**
 * ClickableIcon - 可点击的图标
 * 带有点击态和悬浮效果的图标
 */
interface ClickableIconProps extends IconWrapperProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export function ClickableIcon({
  children,
  variant = "default",
  size = "md", 
  className,
  onClick,
  disabled = false,
  loading = false,
  ...props
}: ClickableIconProps) {
  
  const clickableClasses = cn(
    "cursor-pointer transition-all duration-200",
    "hover:scale-105 active:scale-95",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    disabled && "cursor-not-allowed opacity-50",
    loading && "animate-pulse cursor-wait"
  )
  
  return (
    <IconWrapper
      variant={variant}
      size={size}
      className={cn(clickableClasses, className)}
      onClick={disabled || loading ? undefined : onClick}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
      {...props}
    >
      {loading ? (
        // 加载状态显示旋转图标
        <div className="animate-spin w-full h-full flex items-center justify-center">
          ⟳
        </div>
      ) : (
        children
      )}
    </IconWrapper>
  )
}

/**
 * StatusIcon - 状态图标
 * 带状态指示的图标 (成功、警告、错误等)
 */
interface StatusIconProps extends Omit<IconWrapperProps, 'variant'> {
  status: 'success' | 'warning' | 'error' | 'info'
}

export function StatusIcon({
  children,
  status,
  size = "md",
  className,
  ...props
}: StatusIconProps) {
  
  const statusVariants = {
    success: "bg-green-100 text-green-600 border-green-200",
    warning: "bg-yellow-100 text-yellow-600 border-yellow-200", 
    error: "bg-red-100 text-red-600 border-red-200",
    info: "bg-blue-100 text-blue-600 border-blue-200",
  }
  
  return (
    <IconWrapper
      variant="secondary" // 使用 secondary 作为基础
      size={size}
      className={cn(statusVariants[status], "border", className)}
      {...props}
    >
      {children}
    </IconWrapper>
  )
}
