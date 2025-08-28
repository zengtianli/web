/**
 * AnimatedSection - 带动画的章节容器组件
 * 
 * 统一章节标题样式和内容区域动画，提供一致的章节布局
 * 基于现有组件中重复的章节标题和动画模式提取
 */

"use client"

import React from "react"
import { textVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import AnimatedElement from "@/components/atoms/AnimatedElement"
import type { AnimationType } from "@/lib/design-system"

interface AnimatedSectionProps {
  // 标题配置
  title?: string
  subtitle?: string
  description?: string
  
  // 标题样式
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' // HTML 标题级别
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' // 视觉样式变体
  titleClassName?: string
  titleAlign?: 'left' | 'center' | 'right'
  
  // 内容
  children: React.ReactNode
  
  // 动画配置
  enableAnimation?: boolean
  titleAnimation?: AnimationType
  contentAnimation?: AnimationType
  titleDelay?: number
  contentDelay?: number
  
  // 布局配置
  spacing?: 'sm' | 'md' | 'lg' | 'xl' // 章节间距
  contentSpacing?: 'sm' | 'md' | 'lg' // 标题与内容间距
  
  // HTML 属性
  as?: 'section' | 'div' | 'article' | 'aside'
  id?: string // 锚点支持
  className?: string
  contentClassName?: string
  
  [key: string]: any
}

/**
 * AnimatedSection 组件
 * 
 * @example
 * // 基础用法 (替换重复的 h2 + section 模式)
 * <AnimatedSection title="学术论文">
 *   <ResponsiveGrid>
 *     {papers.map(paper => <PaperCard key={paper.id} {...paper} />)}
 *   </ResponsiveGrid>
 * </AnimatedSection>
 * 
 * @example
 * // 页面级标题 (h1 样式)
 * <AnimatedSection 
 *   title="关于我" 
 *   titleVariant="h1"
 *   titleAlign="center"
 *   description="这是页面的描述信息"
 *   spacing="xl"
 * >
 *   <IntroContent />
 * </AnimatedSection>
 * 
 * @example
 * // 带锚点和自定义动画
 * <AnimatedSection 
 *   title="项目经验"
 *   id="projects"
 *   titleAnimation="slideInLeft"
 *   contentAnimation="slideInRight"
 *   contentDelay={300}
 * >
 *   <ProjectList />
 * </AnimatedSection>
 * 
 * @example
 * // 无动画的静态章节
 * <AnimatedSection 
 *   title="联系信息"
 *   enableAnimation={false}
 *   spacing="sm"
 * >
 *   <ContactInfo />
 * </AnimatedSection>
 */
export default function AnimatedSection({
  // 标题
  title,
  subtitle,
  description,
  
  // 标题样式
  titleLevel = 'h2',
  titleVariant = 'h2',
  titleClassName,
  titleAlign = 'left',
  
  // 内容
  children,
  
  // 动画
  enableAnimation = true,
  titleAnimation = "fadeInUp",
  contentAnimation = "fadeInUp", 
  titleDelay = 0,
  contentDelay = 100,
  
  // 布局
  spacing = "lg",
  contentSpacing = "md",
  
  // HTML 属性
  as: Element = "section",
  id,
  className,
  contentClassName,
  
  ...props
}: AnimatedSectionProps) {
  
  // 章节间距样式
  const spacingClasses = {
    sm: 'mb-8',
    md: 'mb-12', 
    lg: 'mb-16', // 默认，对应现有组件的 mb-16
    xl: 'mb-20',
  }
  
  // 标题与内容间距
  const contentSpacingClasses = {
    sm: 'mt-4',
    md: 'mt-6', // 默认，对应现有组件的 mb-6
    lg: 'mt-8',
  }
  
  // 标题对齐样式
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  
  // 渲染标题
  const renderTitle = () => {
    if (!title) return null
    
    const TitleElement = titleLevel
    const titleClasses = cn(
      textVariants({ variant: titleVariant }),
      alignClasses[titleAlign],
      titleClassName
    )
    
    const titleContent = (
      <div>
        <TitleElement className={titleClasses}>
          {title}
        </TitleElement>
        
        {subtitle && (
          <p className={cn(
            "text-lg text-muted-foreground mt-2",
            alignClasses[titleAlign]
          )}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className={cn(
            "text-base text-muted-foreground mt-3 max-w-3xl",
            titleAlign === 'center' && "mx-auto",
            alignClasses[titleAlign]
          )}>
            {description}
          </p>
        )}
      </div>
    )
    
    if (enableAnimation) {
      return (
        <AnimatedElement 
          animation={titleAnimation}
          baseDelay={titleDelay}
        >
          {titleContent}
        </AnimatedElement>
      )
    }
    
    return titleContent
  }
  
  // 渲染内容
  const renderContent = () => {
    const content = (
      <div className={cn(
        title && contentSpacingClasses[contentSpacing],
        contentClassName
      )}>
        {children}
      </div>
    )
    
    if (enableAnimation && title) {
      // 只有在有标题时才对内容添加动画（避免重复动画）
      return (
        <AnimatedElement 
          animation={contentAnimation}
          baseDelay={contentDelay}
        >
          {content}
        </AnimatedElement>
      )
    }
    
    return content
  }
  
  return (
    <Element 
      id={id}
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {renderTitle()}
      {renderContent()}
    </Element>
  )
}

/**
 * 预定义的章节变体
 */

/**
 * PageSection - 页面章节 (最常用)
 * 对应现有组件中的 section + h2 模式
 */
interface PageSectionProps extends Omit<AnimatedSectionProps, 'titleLevel' | 'titleVariant'> {}

export function PageSection({ title, ...props }: PageSectionProps) {
  return (
    <AnimatedSection
      title={title}
      titleLevel="h2"
      titleVariant="h2"
      spacing="lg"
      {...props}
    />
  )
}

/**
 * HeroSection - 主要标题章节
 * 用于页面顶部的主标题区域
 */
export function HeroSection({ 
  title, 
  titleAlign = "center", 
  spacing = "xl",
  ...props 
}: PageSectionProps) {
  return (
    <AnimatedSection
      title={title}
      titleLevel="h1"
      titleVariant="h1"
      titleAlign={titleAlign}
      spacing={spacing}
      titleAnimation="fadeInUp"
      contentAnimation="fadeInUp"
      contentDelay={300}
      {...props}
    />
  )
}

/**
 * SubSection - 子章节
 * 用于页面内的次级章节
 */
export function SubSection({ title, ...props }: PageSectionProps) {
  return (
    <AnimatedSection
      title={title}
      titleLevel="h3"
      titleVariant="h3"
      spacing="md"
      contentSpacing="sm"
      {...props}
    />
  )
}

/**
 * CompactSection - 紧凑章节
 * 用于内容较少或需要紧凑布局的场景
 */
export function CompactSection({ title, ...props }: PageSectionProps) {
  return (
    <AnimatedSection
      title={title}
      titleLevel="h3"
      titleVariant="h3"
      spacing="sm"
      contentSpacing="sm"
      {...props}
    />
  )
}

/**
 * IntroSection - 介绍章节
 * 带描述的章节，适用于页面开头的介绍内容
 */
interface IntroSectionProps extends PageSectionProps {
  description: string
}

export function IntroSection({ 
  title, 
  description,
  titleAlign = "center",
  ...props 
}: IntroSectionProps) {
  return (
    <AnimatedSection
      title={title}
      description={description}
      titleLevel="h1"
      titleVariant="h1" 
      titleAlign={titleAlign}
      spacing="xl"
      contentSpacing="lg"
      {...props}
    />
  )
}

/**
 * StaticSection - 静态章节
 * 无动画的章节，用于不需要动画效果的内容
 */
export function StaticSection({ title, ...props }: PageSectionProps) {
  return (
    <AnimatedSection
      title={title}
      enableAnimation={false}
      titleLevel="h2"
      titleVariant="h2"
      {...props}
    />
  )
}

/**
 * AnchoredSection - 带锚点的章节
 * 自动生成锚点 ID，用于页面导航
 */
interface AnchoredSectionProps extends PageSectionProps {
  title: string // 必须有标题才能生成锚点
}

export function AnchoredSection({ 
  title, 
  id,
  ...props 
}: AnchoredSectionProps) {
  
  // 自动生成锚点 ID (如果未提供)
  const anchorId = id || title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .trim()
  
  return (
    <AnimatedSection
      title={title}
      id={anchorId}
      titleLevel="h2"
      titleVariant="h2"
      {...props}
    />
  )
}
