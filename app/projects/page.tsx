import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectGrid from "@/components/project-grid"
import { getProjectIndex, getAllProjects, ProjectContent, ProjectIndexContent } from "@/lib/content"

export const metadata = {
  title: "项目案例 | 曾田力",
  description: "探索曾田力的水利工程项目案例，包括数字孪生浙东引水、水资源承载力评价、钱塘江岸线规划等创新项目。",
}

// 组件现在完全依赖外部内容文件，不再包含默认数据

export default async function ProjectsPage() {
  // 从内容文件中加载数据
  const indexContent = await getProjectIndex();
  const projects = await getAllProjects();
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        {indexContent ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center">{indexContent.title}</h1>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              {indexContent.description}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center">项目案例</h1>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              我参与的部分重点项目展示
            </p>
          </>
        )}
        <ProjectGrid projects={projects} />
      </div>
      <Footer />
    </main>
  )
}
