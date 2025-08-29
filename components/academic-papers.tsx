"use client"

import { ExternalLink, FileText } from "lucide-react"
import { PapersContent, Paper } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { ExpandableCard } from "@/components/molecules"

// 组件接口定义
interface AcademicPapersProps {
  data: PapersContent;
}

// 组件现在完全依赖外部数据源，不再包含默认数据

export default function AcademicPapers({ data }: AcademicPapersProps) {
  return (
    <AnimatedSection 
      title={data.title}
      titleLevel="h2"
      titleVariant="h2"
      spacing="lg"
    >
      <ResponsiveGrid 
        strategy="optimal" // 使用智能网格策略，对应原来的 getGridCols 逻辑
        animation="fadeInUp"
        baseDelay={200} // 对应原来的 index * 200
      >
        {data.items.map((paper: Paper, index: number) => (
          <ExpandableCard
            key={index}
            variant="hover" // 对应原来的 card-hover
            expandText="展开摘要"
            collapseText="收起摘要"
            expandedContent={
              <div>
                <p className="font-medium mb-1">摘要:</p>
                <p className="text-sm text-muted-foreground">{paper.abstract}</p>
              </div>
            }
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="mr-4 mt-1 hidden sm:block">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {paper.journal}, {paper.year}
                  </p>
                  <p className="text-sm mb-2">
                    作者:{" "}
                    {paper.authors.split(", ").map((author: string, i: number, arr: string[]) => (
                      <span key={i}>
                        {author.includes("曾田力") || author.includes("Zeng T.") ? <strong>{author}</strong> : author}
                        {i < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 ml-4 flex-shrink-0"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </ExpandableCard>
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
