import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SoftwareCopyrights from "@/components/software-copyrights"
import AcademicPapers from "@/components/academic-papers"
import Awards from "@/components/awards"
import Patents from "@/components/patents"
import { getResearchIndex, getAcademicPapers, getAwards, getPatents, getSoftwareCopyrights } from "@/lib/content"

export const metadata = {
  title: "学术与成果 | 曾田力",
  description:
    "曾田力的学术成果、专利发明、软件著作权和荣誉奖项展示，包括水资源优化调度模型软件、学术论文和国家留学基金委公派留学奖学金等。",
}

// 组件现在完全依赖外部内容文件，不再包含默认数据

export default async function ResearchPage() {
  // 从内容文件中加载数据
  const indexContent = await getResearchIndex();
  const softwareCopyrights = await getSoftwareCopyrights();
  const patents = await getPatents();
  const papers = await getAcademicPapers();
  const awards = await getAwards();
  
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
            <h1 className="text-4xl font-bold mb-8 text-center">学术与成果</h1>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              我的学术研究和知识产权成果展示
            </p>
          </>
        )}

        <div className="space-y-16">
          {softwareCopyrights && <SoftwareCopyrights data={softwareCopyrights} />}
          {patents && <Patents data={patents} />}
          {papers && <AcademicPapers data={papers} />}
          {awards && <Awards data={awards} />}
        </div>
      </div>
      <Footer />
    </main>
  )
}
