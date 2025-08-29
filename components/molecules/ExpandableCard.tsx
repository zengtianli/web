/**
 * ExpandableCard - 可展开卡片组件
 * 
 * 统一展开/收起逻辑，提供平滑的展开动画和可配置的展开内容
 * 基于 academic-papers.tsx 和 patents.tsx 中的展开模式提取
 */

"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cardVariants } from "@/lib/design-system"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

interface ExpandableCardProps extends VariantProps<typeof cardVariants> {
  // 基础内容
  children: React.ReactNode // 始终显示的内容
  
  // 可展开内容  
  expandedContent: React.ReactNode // 展开时显示的内容
  
  // 按钮配置
  expandText?: string // 展开按钮文本
  collapseText?: string // 收起按钮文本
  showIcons?: boolean // 是否显示 chevron 图标
  buttonVariant?: "default" | "ghost" | "outline" | "secondary"
  buttonSize?: "sm" | "md" | "lg"
  
  // 动画配置
  animationDuration?: string // 展开动画持续时间
  maxHeight?: string // 展开时的最大高度
  
  // 初始状态
  defaultExpanded?: boolean
  
  // 受控模式
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  
  // 样式配置
  className?: string
  contentClassName?: string
  expandedClassName?: string
  buttonClassName?: string
  
  // 可访问性
  expandedContentId?: string
  buttonAriaLabel?: string
  
  // HTML 属性
  [key: string]: any
}

/**
 * ExpandableCard 组件
 * 
 * @example
 * // 基础用法 (类似 academic-papers.tsx)
 * <ExpandableCard
 *   expandedContent={
 *     <div>
 *       <p className="font-medium mb-1">摘要:</p>
 *       <p className="text-sm text-muted-foreground">{paper.abstract}</p>
 *     </div>
 *   }
 *   expandText="展开摘要"
 *   collapseText="收起摘要"
 * >
 *   <div className="flex justify-between items-start">
 *     <div>
 *       <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
 *       <p className="text-sm text-muted-foreground mb-2">
 *         {paper.journal}, {paper.year}
 *       </p>
 *     </div>
 *   </div>
 * </ExpandableCard>
 * 
 * @example
 * // 受控模式 (外部控制展开状态)
 * <ExpandableCard
 *   expanded={isExpanded}
 *   onExpandedChange={setIsExpanded}
 *   expandedContent={<DetailedContent />}
 * >
 *   <SummaryContent />
 * </ExpandableCard>
 * 
 * @example  
 * // 自定义样式和动画
 * <ExpandableCard
 *   expandedContent={<FullDescription />}
 *   maxHeight="max-h-[500px]"
 *   animationDuration="duration-500"
 *   buttonVariant="outline"
 *   variant="elevated"
 * >
 *   <ShortDescription />
 * </ExpandableCard>
 */
export default function ExpandableCard({
  // 内容
  children,
  expandedContent,
  
  // 按钮配置
  expandText = "展开详情",
  collapseText = "收起详情", 
  showIcons = true,
  buttonVariant = "ghost",
  buttonSize = "sm",
  
  // 动画配置
  animationDuration = "duration-300",
  maxHeight = "max-h-96",
  
  // 状态控制
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  
  // 卡片样式
  variant = "hover",
  padding = "md", 
  shadow = "none",
  className,
  contentClassName,
  expandedClassName,
  buttonClassName,
  
  // 可访问性
  expandedContentId,
  buttonAriaLabel,
  
  ...props
}: ExpandableCardProps) {
  
  // 状态管理 (支持受控和非受控模式)
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  
  const handleToggle = () => {
    const newExpanded = !isExpanded
    
    if (onExpandedChange) {
      onExpandedChange(newExpanded)
    } else {
      setInternalExpanded(newExpanded)
    }
  }
  
  // 生成唯一 ID
  const contentId = expandedContentId || `expandable-content-${React.useId()}`
  
  return (
    <Card 
      className={cn(cardVariants({ variant, padding, shadow }), className, "h-full flex flex-col")} // 🎨 高度拉伸支持
      {...props}
    >
      <CardContent className={cn(padding === 'md' ? 'pt-0' : '', contentClassName, "h-full flex flex-col")}>
        {/* 基础内容 */}
        <div className="flex-1">{children}</div>
        
        {/* 可展开内容 */}
        <div
          id={contentId}
          className={cn(
            "overflow-hidden transition-all",
            animationDuration,
            isExpanded ? maxHeight : "max-h-0",
            expandedClassName
          )}
          aria-hidden={!isExpanded}
        >
          <div className="pt-3 border-t mt-3">
            {expandedContent}
          </div>
        </div>
        
        {/* 展开/收起按钮 - 固定在底部 */}
        <Button
          variant={buttonVariant}
          size={buttonSize}
          onClick={handleToggle}
          className={cn(
            "mt-auto text-accent", // mt-auto 推到底部
            buttonClassName
          )}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-label={buttonAriaLabel || (isExpanded ? collapseText : expandText)}
        >
          {isExpanded ? collapseText : expandText}
          {showIcons && (
            isExpanded ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * 预定义的展开卡片变体
 */

/**
 * PaperCard - 论文卡片 (academic-papers.tsx 的使用模式)
 */
interface PaperCardProps {
  title: string
  journal: string
  year: string
  authors: string
  abstract: string
  link?: string
  className?: string
}

export function PaperCard({
  title,
  journal, 
  year,
  authors,
  abstract,
  link,
  className
}: PaperCardProps) {
  return (
    <ExpandableCard
      expandText="展开摘要"
      collapseText="收起摘要"
      expandedContent={
        <div>
          <p className="font-medium mb-1">摘要:</p>
          <p className="text-sm text-muted-foreground">{abstract}</p>
        </div>
      }
      className={className}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="mr-4 mt-1 hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent">📄</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {journal}, {year}
            </p>
            <p className="text-sm mb-2">
              作者: {authors.split(", ").map((author, i, arr) => (
                <span key={i}>
                  {author.includes("曾田力") ? <strong>{author}</strong> : author}
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
        {link && (
          <a
            href={link}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 ml-4 flex-shrink-0"
          >
            🔗
          </a>
        )}
      </div>
    </ExpandableCard>
  )
}

/**
 * PatentCard - 专利卡片 (patents.tsx 的使用模式)
 */
interface PatentCardProps {
  title: string
  patentNumber: string
  applicant: string
  description: string
  className?: string
}

export function PatentCard({
  title,
  patentNumber,
  applicant, 
  description,
  className
}: PatentCardProps) {
  return (
    <ExpandableCard
      expandText="展开详情"
      collapseText="收起详情"
      expandedContent={
        <div>
          <p className="font-medium mb-1">详细描述:</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      }
      className={className}
    >
      <div className="flex items-start">
        <div className="mr-4 mt-1 hidden sm:block">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-accent">⚖️</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            专利号: {patentNumber}
          </p>
          <p className="text-sm">
            申请人: {applicant}
          </p>
        </div>
      </div>
    </ExpandableCard>
  )
}

/**
 * DetailCard - 通用详情卡片
 * 用于任何需要展开详细信息的场景
 */
interface DetailCardProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  summary: string
  details: React.ReactNode
  expandText?: string
  collapseText?: string
  className?: string
}

export function DetailCard({
  icon,
  title,
  subtitle,
  summary,
  details,
  expandText = "查看详情",
  collapseText = "收起详情",
  className
}: DetailCardProps) {
  return (
    <ExpandableCard
      expandText={expandText}
      collapseText={collapseText}
      expandedContent={details}
      className={className}
    >
      <div className="flex items-start">
        {icon && (
          <div className="mr-4 mt-1 hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
          )}
          <p className="text-sm">{summary}</p>
        </div>
      </div>
    </ExpandableCard>
  )
}

/**
 * AccordionCard - 手风琴式卡片
 * 当需要多个项目形成手风琴效果时使用
 */
interface AccordionCardProps {
  items: Array<{
    id: string
    title: string
    content: React.ReactNode
    defaultExpanded?: boolean
  }>
  allowMultiple?: boolean // 是否允许同时展开多个
  className?: string
}

export function AccordionCard({ 
  items, 
  allowMultiple = false,
  className 
}: AccordionCardProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    () => new Set(items.filter(item => item.defaultExpanded).map(item => item.id))
  )
  
  const handleItemToggle = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(itemId)
      }
      
      return newSet
    })
  }
  
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <ExpandableCard
          key={item.id}
          expanded={expandedItems.has(item.id)}
          onExpandedChange={() => handleItemToggle(item.id)}
          expandedContent={item.content}
          variant="outline"
        >
          <h3 className="font-medium">{item.title}</h3>
        </ExpandableCard>
      ))}
    </div>
  )
}
