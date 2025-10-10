"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { BlogPost } from "@/lib/content"
import { FeatureCard, SkillTag, TagGroup } from "@/components/molecules"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <FeatureCard
      title={post.title}
      description={post.excerpt}
      variant="hover"
      layout="vertical"
      className="overflow-hidden h-full"
      primaryAction={{
        label: "阅读全文",
        href: `/blog/${post.slug}`,
        variant: "ghost"
      }}
    >
      {/* 文章封面图 */}
      {post.image && (
        <div className="relative h-48 mb-4 -mx-6 -mt-6">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* 元信息 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.date)}</span>
        </div>
        
        {post.readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        )}

        {post.author && (
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        )}
      </div>

      {/* 标签 */}
      {post.tags && post.tags.length > 0 && (
        <TagGroup gap="sm" className="justify-start">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
              <SkillTag skill={tag} size="xs" />
            </Link>
          ))}
          {post.tags.length > 3 && (
            <SkillTag skill={`+${post.tags.length - 3}`} size="xs" variant="muted" />
          )}
        </TagGroup>
      )}
    </FeatureCard>
  )
}

