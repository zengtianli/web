/**
 * FeatureCard - 通用功能卡片组件
 * 
 * 灵活的卡片组件，可以替代现有组件中重复的卡片实现
 * 基于 awards.tsx, software-copyrights.tsx 等组件的卡片模式提取
 */

"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cardVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import IconWrapper from "@/components/atoms/IconWrapper"
import type { VariantProps } from "class-variance-authority"

interface FeatureCardProps extends VariantProps<typeof cardVariants> {
  // 内容配置
  icon?: React.ReactNode
  title: string
  subtitle?: string
  description?: string | React.ReactNode
  
  // 图标配置
  iconVariant?: 'default' | 'muted' | 'primary' | 'secondary' | 'outline'
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  showIcon?: boolean
  
  // 链接和操作
  href?: string
  target?: string
  onClick?: () => void
  
  // 按钮配置
  primaryAction?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: "default" | "outline" | "secondary" | "ghost"
    disabled?: boolean
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: "outline" | "ghost" | "secondary"
    disabled?: boolean
  }
  
  // 布局配置
  layout?: 'horizontal' | 'vertical' | 'minimal' // 不同的布局模式
  headerless?: boolean // 是否隐藏 CardHeader
  
  // 样式配置
  className?: string
  contentClassName?: string
  
  // 其他内容
  children?: React.ReactNode // 额外的内容，会显示在描述之后
  footer?: React.ReactNode // 自定义底部内容
  
  // HTML 属性
  [key: string]: any
}

/**
 * FeatureCard 组件
 * 
 * @example
 * // 简单卡片 (类似 awards.tsx 的使用)
 * <FeatureCard
 *   icon={<Award />}
 *   title="国家留学基金委公派留学奖学金"
 *   subtitle="2016 · 国家留学基金管理委员会"
 *   variant="hover"
 * />
 * 
 * @example
 * // 带按钮的卡片 (类似 software-copyrights.tsx 的使用)
 * <FeatureCard
 *   icon={<FileText />}
 *   title="水资源优化调度模型软件"
 *   description="软件登记号：2023SR1234567"
 *   primaryAction={{
 *     label: "查看证书",
 *     href: "/path/to/certificate.pdf"
 *   }}
 *   variant="hover"
 * />
 * 
 * @example
 * // 垂直布局卡片
 * <FeatureCard
 *   icon={<Code />}
 *   title="项目标题"
 *   description="项目描述内容"
 *   layout="vertical"
 *   primaryAction={{
 *     label: "查看详情",
 *     onClick: () => console.log('clicked')
 *   }}
 * />
 * 
 * @example
 * // 最小化卡片 (无图标，紧凑布局)
 * <FeatureCard
 *   title="简单标题"
 *   description="简单描述"
 *   layout="minimal"
 *   variant="flat"
 * />
 */
export default function FeatureCard({
  // 内容
  icon,
  title,
  subtitle,
  description,
  
  // 图标
  iconVariant = "default",
  iconSize = "md",
  showIcon = true,
  
  // 链接
  href,
  target,
  onClick,
  
  // 按钮
  primaryAction,
  secondaryAction,
  
  // 布局
  layout = "horizontal",
  headerless = false,
  
  // 样式
  variant = "hover",
  padding = "md",
  shadow = "none",
  className,
  contentClassName,
  
  // 其他
  children,
  footer,
  
  ...props
}: FeatureCardProps) {
  
  // 构建卡片样式
  const cardClasses = cn(
    cardVariants({ variant, padding, shadow }),
    onClick && "cursor-pointer",
    className
  )
  
  // 处理点击事件
  const handleClick = () => {
    if (href) {
      window.open(href, target || '_self')
    } else if (onClick) {
      onClick()
    }
  }
  
  // 渲染图标
  const renderIcon = () => {
    if (!showIcon || !icon) return null
    
    // 对于水平布局，图标显示在移动端隐藏
    const iconClasses = layout === 'horizontal' ? 'hidden sm:block' : ''
    
    return (
      <div className={cn("flex-shrink-0", iconClasses)}>
        <IconWrapper variant={iconVariant} size={iconSize}>
          {icon}
        </IconWrapper>
      </div>
    )
  }
  
  // 渲染内容区域
  const renderContent = () => {
    const contentLayout = {
      horizontal: "flex items-start gap-3",
      vertical: "flex flex-col items-center text-center gap-3",
      minimal: "space-y-2"
    }
    
    return (
      <div className={cn(contentLayout[layout], contentClassName)}>
        {/* 图标 - 只在非垂直布局时显示，因为垂直布局的图标在 CardHeader 中 */}
        {layout !== 'vertical' && renderIcon()}
        
        {/* 文本内容 */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-bold leading-tight",
            layout === 'vertical' ? 'text-center' : '',
            layout === 'minimal' ? 'text-base' : 'text-lg'
          )}>
            {title}
          </h3>
          
          {subtitle && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1",
              layout === 'vertical' ? 'text-center' : ''
            )}>
              {subtitle}
            </p>
          )}
          
          {description && (
            <div className={cn(
              "mt-2",
              typeof description === 'string' ? 'text-sm text-muted-foreground' : '',
              layout === 'vertical' ? 'text-center' : ''
            )}>
              {description}
            </div>
          )}
          
          {/* 额外内容 */}
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // 渲染操作按钮
  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null
    
    return (
      <div className={cn(
        "flex gap-2 mt-4",
        layout === 'vertical' ? 'justify-center' : 'justify-start'
      )}>
        {primaryAction && (
          <Button
            variant={primaryAction.variant || "default"}
            size="sm"
            disabled={primaryAction.disabled}
            onClick={primaryAction.onClick}
            asChild={!!primaryAction.href}
          >
            {primaryAction.href ? (
              <a href={primaryAction.href} target={target}>
                {primaryAction.label}
              </a>
            ) : (
              primaryAction.label
            )}
          </Button>
        )}
        
        {secondaryAction && (
          <Button
            variant={secondaryAction.variant || "outline"}
            size="sm"
            disabled={secondaryAction.disabled}
            onClick={secondaryAction.onClick}
            asChild={!!secondaryAction.href}
          >
            {secondaryAction.href ? (
              <a href={secondaryAction.href} target={target}>
                {secondaryAction.label}
              </a>
            ) : (
              secondaryAction.label
            )}
          </Button>
        )}
      </div>
    )
  }
  
  return (
    <Card 
      className={cardClasses}
      onClick={onClick || href ? handleClick : undefined}
      {...props}
    >
      {!headerless && (layout === 'vertical' || layout === 'minimal') && (
        <CardHeader className={cn(
          layout === 'minimal' ? 'pb-2' : 'pb-4',
          layout === 'vertical' ? 'text-center' : ''
        )}>
          {layout === 'vertical' && renderIcon()}
        </CardHeader>
      )}
      
      <CardContent className={cn(
        headerless || layout === 'horizontal' ? 'pt-0' : '',
        layout === 'minimal' ? 'p-4' : ''
      )}>
        {renderContent()}
        {renderActions()}
        
        {/* 自定义底部内容 */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-secondary">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * 预定义的卡片变体
 * 为特定使用场景提供更便捷的使用方式
 */

/**
 * AwardCard - 奖项卡片 (awards.tsx 的使用模式)
 */
interface AwardCardProps {
  icon: React.ReactNode
  title: string
  year?: string
  organization?: string
  note?: string
  className?: string
}

export function AwardCard({
  icon,
  title,
  year,
  organization,
  note,
  className
}: AwardCardProps) {
  const subtitle = [year, organization].filter(Boolean).join(' · ') +
    (note ? ` (${note})` : '')
  
  return (
    <FeatureCard
      icon={icon}
      title={title}
      subtitle={subtitle}
      layout="horizontal"
      variant="hover"
      padding="sm"
      className={className}
    />
  )
}

/**
 * SoftwareCard - 软件著作权卡片 (software-copyrights.tsx 的使用模式)
 */
interface SoftwareCardProps {
  title: string
  registrationNumber: string
  certificateUrl?: string
  className?: string
}

export function SoftwareCard({
  title,
  registrationNumber,
  certificateUrl,
  className
}: SoftwareCardProps) {
  return (
    <FeatureCard
      icon={<div>📄</div>} // 可以替换为具体的图标
      title={title}
      description={`软件登记号：${registrationNumber}`}
      primaryAction={certificateUrl ? {
        label: "查看证书",
        href: certificateUrl,
        variant: "outline"
      } : undefined}
      layout="horizontal"
      variant="hover"
      className={className}
    />
  )
}

/**
 * ProjectCard - 项目卡片
 */
interface ProjectCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  tags?: string[]
  href?: string
  onClick?: () => void
  className?: string
}

export function ProjectCard({
  icon,
  title,
  description,
  tags = [],
  href,
  onClick,
  className
}: ProjectCardProps) {
  return (
    <FeatureCard
      icon={icon}
      title={title}
      description={description}
      href={href}
      onClick={onClick}
      layout="vertical"
      variant="hover"
      className={className}
    >
      {/* 标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </FeatureCard>
  )
}
