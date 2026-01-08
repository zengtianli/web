/**
 * 卡片类组件集合
 * 包含：博客卡片、项目网格、最新动态
 */

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost, ProjectContent, LatestUpdatesContent, LatestUpdate } from "@/lib/content"

// ============== 博客卡片 ==============
interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden border-secondary hover:shadow-lg transition-shadow h-full">
        {post.image && (
          <div className="relative h-48">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4 line-clamp-2">{post.excerpt}</CardDescription>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} 分钟</span>
              </div>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

// ============== 项目网格 ==============
interface ProjectGridProps {
  projects: ProjectContent[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: ProjectContent) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <Card className="overflow-hidden border-secondary hover:shadow-lg transition-shadow h-full">
            <div className="relative h-48">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription>我的角色: {project.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.brief}</p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

// ============== 最新动态 ==============
interface LatestUpdatesProps {
  data: LatestUpdatesContent
}

export function LatestUpdates({ data }: LatestUpdatesProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((update: LatestUpdate, index: number) => (
            <Card key={index} className="overflow-hidden border-secondary hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" priority={index === 0} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{update.description}</CardDescription>
                <Link href={update.link} className="text-accent hover:underline text-sm">阅读更多 →</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

