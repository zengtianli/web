/**
 * 研究成果页面组件集合
 * 包含：荣誉奖项、专利、学术论文、软件著作权
 */

import { Award, Lightbulb, FileText, ExternalLink, Database, BarChart, FileSpreadsheet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  AwardsContent, 
  PatentsContent, 
  Patent, 
  PapersContent, 
  Paper, 
  SoftwareCopyrightsContent 
} from "@/lib/content"

// ============== 荣誉奖项 ==============
interface AwardsProps {
  data: AwardsContent
}

export function Awards({ data }: AwardsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((award, index) => (
          <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{award.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {award.year} · {award.organization}
                  {award.note && ` (${award.note})`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ============== 专利 ==============
interface PatentsProps {
  data: PatentsContent
}

export function Patents({ data }: PatentsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((patent: Patent, index: number) => (
          <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-accent/10 shrink-0">
                  <Lightbulb className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{patent.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">发明年份: {patent.year}</p>
                  <p className="text-sm mb-2">
                    发明人:{" "}
                    {patent.inventors.split("，").map((inventor: string, i: number, arr: string[]) => (
                      <span key={i}>
                        {inventor.includes("曾田力") ? <strong>{inventor}</strong> : inventor}
                        {i < arr.length - 1 ? "，" : ""}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-muted-foreground">{patent.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ============== 学术论文 ==============
interface AcademicPapersProps {
  data: PapersContent
}

export function AcademicPapers({ data }: AcademicPapersProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>
      <div className="space-y-4">
        {data.items.map((paper: Paper, index: number) => (
          <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-accent/10 shrink-0 hidden sm:flex">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{paper.journal}, {paper.year}</p>
                    <p className="text-sm mb-2">
                      作者:{" "}
                      {paper.authors.split(", ").map((author: string, i: number, arr: string[]) => (
                        <span key={i}>
                          {author.includes("曾田力") || author.includes("Zeng T.") ? <strong>{author}</strong> : author}
                          {i < arr.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    {paper.abstract && <p className="text-sm text-muted-foreground line-clamp-2">{paper.abstract}</p>}
                  </div>
                </div>
                {paper.link && (
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 ml-4 shrink-0">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ============== 软件著作权 ==============
const softwareIconMap = { Database, BarChart, FileSpreadsheet, FileText }

interface SoftwareCopyrightsProps {
  data: SoftwareCopyrightsContent
}

export function SoftwareCopyrights({ data }: SoftwareCopyrightsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.items.map((software, index) => {
          const Icon = softwareIconMap[software.icon as keyof typeof softwareIconMap] || FileText
          return (
            <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{software.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{software.description}</CardDescription>
                {software.pdfLink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={software.pdfLink} target="_blank" rel="noopener noreferrer">查看说明书</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

