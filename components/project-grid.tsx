"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"

export default function ProjectGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <Card
          key={project.slug}
          className={cn(
            "card-hover overflow-hidden border-secondary",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-700 ease-out",
            `delay-${index * 100}`,
          )}
        >
          <div className="relative h-48">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-3">{project.brief}</p>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">我的角色</p>
              <p className="font-medium">{project.role}</p>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && <span className="skill-tag">+{project.tags.length - 3}</span>}
            </div>

            <Link href={`/projects/${project.slug}`}>
              <Button variant="link" className="p-0 h-auto text-accent group">
                查看详情
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
