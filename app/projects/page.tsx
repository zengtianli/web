import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { ProjectGrid } from "@/components/card-components"
import { getProjectIndex, getAllProjects } from "@/lib/content"

export const metadata = {
  title: "项目案例 | 曾田力",
  description: "探索曾田力的水利工程项目案例，包括数字孪生浙东引水、水资源承载力评价、钱塘江岸线规划等创新项目。",
}

export default async function ProjectsPage() {
  const indexContent = await getProjectIndex()
  const projects = await getAllProjects()
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <PageHeader 
          title={indexContent?.title || "项目案例"} 
          description={indexContent?.description || "我参与的部分重点项目展示"} 
        />
        <ProjectGrid projects={projects} />
      </div>
      <Footer />
    </main>
  )
}
