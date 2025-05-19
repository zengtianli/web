import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectGrid from "@/components/project-grid"

export const metadata = {
  title: "项目案例 | 曾田力",
  description: "探索曾田力的水利工程项目案例，包括数字孪生浙东引水、水资源承载力评价、钱塘江岸线规划等创新项目。",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">项目案例</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          以下是我参与的部分重点项目，展示了我在水利工程与信息技术融合领域的专业能力与创新思维。
        </p>
        <ProjectGrid />
      </div>
      <Footer />
    </main>
  )
}
