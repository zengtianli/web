"use client"

import Image from "next/image"
import { ProjectContent } from "@/lib/content"
import { FeatureCard, ResponsiveGrid, SkillTag, TagGroup } from "@/components/molecules"

interface ProjectGridProps {
  projects: ProjectContent[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ResponsiveGrid 
      strategy="optimal" // 使用自适应布局
      gap="lg"
      animation="fadeInUp"
      staggerDelay={100}
      alignItems="stretch"     // 🎨 关键：让卡片高度一致！
      minItemHeight="350px"    // 🎨 设置最小高度确保美观
    >
      {projects.map((project: ProjectContent, index: number) => (
        <FeatureCard
          key={project.slug}
          title={project.title}
          subtitle={`我的角色: ${project.role}`}
          description={project.brief}
          variant="hover"
          layout="vertical"
          className="overflow-hidden"
          primaryAction={{
            label: "查看详情",
            href: `/projects/${project.slug}`,
            variant: "ghost"
          }}
        >
          {/* 项目图片 */}
          <div className="relative h-48 mb-4 -mx-6 -mt-6">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* 标签组 */}
          <TagGroup gap="sm" className="justify-center">
            {project.tags.slice(0, 3).map((tag: string) => (
              <SkillTag key={tag} skill={tag} size="xs" />
            ))}
            {project.tags.length > 3 && (
              <SkillTag skill={`+${project.tags.length - 3}`} size="xs" variant="muted" />
            )}
          </TagGroup>
        </FeatureCard>
      ))}
    </ResponsiveGrid>
  )
}
