import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { projects } from "@/data/projects"
import { notFound } from "next/navigation"

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "项目不存在",
    }
  }

  return {
    title: `${project.title} | 曾田力项目案例`,
    description: project.brief,
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/projects">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground mb-2">我的角色</p>
          <p className="text-lg font-medium">{project.role}</p>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={450}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">项目背景与挑战</h2>
            <p className="text-lg">{project.background}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">技术方案与我的贡献</h2>
            <ul className="list-disc pl-5 space-y-2">
              {project.contributions.map((item, index) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">创新点与成果</h2>
            <ul className="list-disc pl-5 space-y-2">
              {project.outcomes.map((item, index) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
