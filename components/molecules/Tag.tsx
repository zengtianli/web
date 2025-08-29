/**
 * Tag - 统一标签组件
 * 
 * 替代现有的 skill-tag CSS 类，提供统一的标签样式和交互效果
 * 基于现有组件中的标签使用模式提取
 */

"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-md transition-colors duration-200 cursor-default",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
        primary: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        secondary: "bg-secondary/70 text-secondary-foreground border border-border hover:bg-secondary",
        accent: "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20",
        outline: "border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent",
        muted: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs font-medium",
        sm: "px-2 py-1 text-xs font-medium", 
        md: "px-2.5 py-1.5 text-sm font-medium",
        lg: "px-3 py-2 text-sm font-semibold",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  children: React.ReactNode
  // 可点击标签相关属性
  clickable?: boolean
  onRemove?: () => void
  // HTML 属性
  as?: keyof JSX.IntrinsicElements
}

/**
 * Tag 组件
 * 
 * @example
 * // 基础标签 (替代 skill-tag)
 * <Tag>JavaScript</Tag>
 * 
 * @example
 * // 不同变体和尺寸
 * <Tag variant="accent" size="md">React</Tag>
 * 
 * @example
 * // 可点击标签
 * <Tag 
 *   variant="outline" 
 *   clickable
 *   onClick={() => console.log('clicked')}
 * >
 *   Click me
 * </Tag>
 * 
 * @example
 * // 可移除标签
 * <Tag 
 *   variant="primary"
 *   onRemove={() => console.log('remove')}
 * >
 *   Removable
 * </Tag>
 */
export default function Tag({
  children,
  className,
  variant = "default",
  size = "sm",
  clickable = false,
  onRemove,
  onClick,
  as: Element = "span",
  ...props
}: TagProps) {
  
  const tagClasses = cn(
    tagVariants({ variant, size }),
    (clickable || onClick) && "cursor-pointer hover:scale-105 active:scale-95",
    className
  )
  
  return (
    <Element
      className={tagClasses}
      onClick={onClick}
      role={clickable || onClick ? "button" : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-current/20 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label="移除标签"
        >
          <span className="text-xs">×</span>
        </button>
      )}
    </Element>
  )
}

/**
 * 预定义的标签变体
 */

/**
 * SkillTag - 技能标签 (替代原来的 skill-tag CSS 类)
 */
interface SkillTagProps extends Omit<TagProps, 'children'> {
  skill: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export function SkillTag({ 
  skill, 
  level, 
  size = "sm", 
  className, 
  variant: propVariant,
  ...props 
}: SkillTagProps) {
  
  const levelVariants = {
    beginner: "secondary" as const,
    intermediate: "default" as const, 
    advanced: "accent" as const,
    expert: "primary" as const,
  }
  
  const variant = propVariant || (level ? levelVariants[level] : "default")
  
  return (
    <Tag 
      variant={variant}
      size={size}
      className={className}
      title={level ? `${skill} (${level})` : skill}
      {...props}
    >
      {skill}
    </Tag>
  )
}

/**
 * CategoryTag - 分类标签
 */
interface CategoryTagProps extends Omit<TagProps, 'variant'> {
  category: string
  count?: number
}

export function CategoryTag({ 
  category, 
  count, 
  size = "sm", 
  className, 
  ...props 
}: CategoryTagProps) {
  return (
    <Tag 
      variant="outline"
      size={size}
      className={className}
      {...props}
    >
      {category}
      {count !== undefined && (
        <span className="ml-1 opacity-70">({count})</span>
      )}
    </Tag>
  )
}

/**
 * StatusTag - 状态标签
 */
interface StatusTagProps extends Omit<TagProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'completed'
  children: React.ReactNode
}

export function StatusTag({ 
  status, 
  children, 
  size = "sm", 
  className, 
  ...props 
}: StatusTagProps) {
  
  const statusVariants = {
    active: "accent" as const,
    inactive: "muted" as const,
    pending: "secondary" as const, 
    completed: "primary" as const,
  }
  
  return (
    <Tag 
      variant={statusVariants[status]}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * TagGroup - 标签组容器
 */
interface TagGroupProps {
  children: React.ReactNode
  className?: string
  gap?: 'sm' | 'md' | 'lg'
  wrap?: boolean
}

export function TagGroup({ 
  children, 
  className,
  gap = 'sm',
  wrap = true 
}: TagGroupProps) {
  
  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-1.5', 
    lg: 'gap-2',
  }
  
  return (
    <div className={cn(
      "flex items-center",
      wrap && "flex-wrap",
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}
