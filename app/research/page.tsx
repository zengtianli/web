import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Awards, Patents, AcademicPapers, SoftwareCopyrights } from "@/components/research-sections"
import { getResearchIndex, getAcademicPapers, getAwards, getPatents, getSoftwareCopyrights } from "@/lib/content"

export const metadata = {
  title: "学术与成果 | 曾田力",
  description: "曾田力的学术成果、专利发明、软件著作权和荣誉奖项展示。",
}

export default async function ResearchPage() {
  const indexContent = await getResearchIndex()
  const softwareCopyrights = await getSoftwareCopyrights()
  const patents = await getPatents()
  const papers = await getAcademicPapers()
  const awards = await getAwards()
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <PageHeader 
          title={indexContent?.title || "学术与成果"} 
          description={indexContent?.description || "我的学术研究和知识产权成果展示"} 
        />
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
