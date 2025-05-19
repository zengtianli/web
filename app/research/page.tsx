import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SoftwareCopyrights from "@/components/software-copyrights"
import AcademicPapers from "@/components/academic-papers"
import Awards from "@/components/awards"

export const metadata = {
  title: "学术与成果 | 曾田力",
  description:
    "曾田力的学术成果、软件著作权和荣誉奖项展示，包括水资源优化调度模型软件、学术论文和国家留学基金委公派留学奖学金等。",
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">学术与成果</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          我的学术研究和知识产权成果，展示了我在水利工程领域的专业贡献和创新能力。
        </p>

        <div className="space-y-16">
          <SoftwareCopyrights />
          <AcademicPapers />
          <Awards />
        </div>
      </div>
      <Footer />
    </main>
  )
}
