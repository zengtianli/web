/**
 * 通用内容卡片组件
 * 用于项目展示、博客列表、工具展示等场景
 * 
 * 设计原则：简单、复用、一致
 */

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface ContentCardProps {
  /** 标题 */
  title: string
  /** 描述（可选） */
  description?: string
  /** 标签列表（可选） */
  tags?: string[]
  /** 链接（可选，有链接时整个卡片可点击） */
  href?: string
  /** 图标（emoji 或 React 节点） */
  icon?: React.ReactNode
  /** 右上角元数据（如日期、时长等） */
  meta?: string
  /** 额外的 className */
  className?: string
  /** 子内容（可选） */
  children?: React.ReactNode
  /** 卡片变体 */
  variant?: 'default' | 'compact' | 'featured'
}

export default function ContentCard({
  title,
  description,
  tags,
  href,
  icon,
  meta,
  className,
  children,
  variant = 'default',
}: ContentCardProps) {
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  const cardContent = (
    <Card 
      className={cn(
        'transition-all duration-200',
        href && 'hover:shadow-md hover:border-primary/30 cursor-pointer',
        isFeatured && 'border-primary/20 bg-primary/5',
        className
      )}
    >
      <CardHeader className={cn(isCompact && 'pb-2')}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon && (
              <span className={cn(
                'flex-shrink-0',
                isCompact ? 'text-lg' : 'text-2xl'
              )}>
                {icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className={cn(
                'line-clamp-2',
                isCompact ? 'text-base' : 'text-lg'
              )}>
                {title}
              </CardTitle>
              {description && (
                <CardDescription className={cn(
                  'mt-1 line-clamp-2',
                  isCompact ? 'text-xs' : 'text-sm'
                )}>
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {meta && (
            <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {meta}
            </span>
          )}
        </div>
      </CardHeader>

      {(tags?.length || children) && (
        <CardContent className={cn(isCompact && 'pt-0')}>
          {/* 标签 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, isCompact ? 3 : 6).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className={cn(
                    'font-normal',
                    isCompact ? 'text-[10px] px-1.5 py-0' : 'text-xs'
                  )}
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > (isCompact ? 3 : 6) && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{tags.length - (isCompact ? 3 : 6)}
                </Badge>
              )}
            </div>
          )}

          {/* 自定义内容 */}
          {children}
        </CardContent>
      )}
    </Card>
  )

  // 如果有链接，包裹 Link
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

/**
 * 内容卡片网格布局
 * 用于展示多个卡片
 */
interface ContentCardGridProps {
  children: React.ReactNode
  /** 列数配置 */
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function ContentCardGrid({ 
  children, 
  columns = 2,
  className 
}: ContentCardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {children}
    </div>
  )
}

/**
 * 统一的 Section 标题
 */
interface SectionHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ 
  title, 
  description, 
  action,
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between mb-6', className)}>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

