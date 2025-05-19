"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const papers = [
  {
    title: "基于主要驱动因子筛选法和深度学习算法的浙江省动态需水量预测",
    journal: "水科学进展",
    year: "2022",
    authors: "曾田力, 张三, 李四",
    abstract:
      "本研究提出了一种基于主要驱动因子筛选和深度学习的水资源需求预测方法，通过分析气候、社会经济等多维因素对需水量的影响，构建了高精度预测模型，为浙江省水资源规划与管理提供科学依据。",
    doi: "https://doi.org/10.xxxx/xxxxx",
    expanded: false,
  },
  {
    title: "考虑侧向出沙的河网非均匀沙输移",
    journal: "水利学报",
    year: "2020",
    authors: "王五, 曾田力, 赵六",
    abstract:
      "针对复杂河网中泥沙输移问题，本文建立了考虑侧向出沙的非均匀沙数学模型，通过实测数据验证了模型的适用性，为河网治理与管理提供了技术支持。",
    doi: "https://doi.org/10.xxxx/xxxxx",
    expanded: false,
  },
  {
    title: "A Depth-Averaged 2D Physically-Based Model for Flow and Sediment Transport in Open Channels",
    journal: "ASCE环境水资源大会论文集",
    year: "2019",
    authors: "Zeng T., Zhang S., Wang W.",
    abstract:
      "This paper presents a novel depth-averaged two-dimensional model for simulating flow and sediment transport in open channels. The model incorporates physically-based parameters and has been validated using field measurements from various river systems.",
    doi: "https://doi.org/10.xxxx/xxxxx",
    expanded: false,
  },
]

export default function AcademicPapers() {
  const [papersList, setPapersList] = useState(papers)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleExpand = (index: number) => {
    setPapersList(papersList.map((paper, i) => (i === index ? { ...paper, expanded: !paper.expanded } : paper)))
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">学术论文</h2>

      <div ref={ref} className="space-y-4">
        {papersList.map((paper, index) => (
          <Card
            key={index}
            className={cn(
              "border-secondary",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${index * 200}`,
            )}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {paper.journal}, {paper.year}
                  </p>
                  <p className="text-sm mb-2">
                    作者:{" "}
                    {paper.authors.split(", ").map((author, i, arr) => (
                      <span key={i}>
                        {author.includes("曾田力") || author.includes("Zeng T.") ? <strong>{author}</strong> : author}
                        {i < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>
                <a
                  href={paper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              <div
                className={cn("overflow-hidden transition-all duration-300", paper.expanded ? "max-h-96" : "max-h-0")}
              >
                <div className="pt-3 border-t mt-3">
                  <p className="font-medium mb-1">摘要:</p>
                  <p className="text-sm text-muted-foreground">{paper.abstract}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="mt-2 text-accent" onClick={() => toggleExpand(index)}>
                {paper.expanded ? (
                  <>
                    收起摘要 <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    展开摘要 <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
