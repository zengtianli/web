import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects, ProjectContent } from "@/lib/content"

// 导入项目内容样式
import "./project-content.css"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Next.js 15中需要特殊处理params对象
  const safeParams = await Promise.resolve(params);
  const slug = safeParams.slug;
  const projectResult = await getProjectBySlug(slug);

  if (!projectResult) {
    return {
      title: "项目不存在",
    }
  }

  const project = projectResult.metadata;
  
  return {
    title: `${project.title} | 曾田力项目案例`,
    description: project.brief,
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project: ProjectContent) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Next.js 15中需要特殊处理params对象
  const safeParams = await Promise.resolve(params);
  const slug = safeParams.slug;
  const projectResult = await getProjectBySlug(slug);

  if (!projectResult) {
    notFound()
  }

  // 获取项目元数据和内容
  const project = projectResult.metadata;
  const content = projectResult.content; // HTML格式的内容

  // 从内容中提取背景、贡献和成果部分
  // 注意：这里我们使用项目元数据中的背景、贡献和成果信息
  // 这些信息已经存在于MD文件中并被加载到HTML内容中

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
          {project.tags.map((tag: string) => (
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

        {/* 使用从项目 Markdown 内容加载的HTML */}
        <div className="project-content space-y-6" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <Footer />
    </main>
  )
}
