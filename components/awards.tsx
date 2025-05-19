"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const awards = [
  {
    title: "国家留学基金委公派留学奖学金",
    year: "2019",
    organization: "国家留学基金管理委员会",
  },
  {
    title: "三好研究生",
    year: "2015-2019",
    organization: "浙江大学",
    note: "多次获得",
  },
  {
    title: "优秀研究生",
    year: "2014-2018",
    organization: "浙江大学",
    note: "多次获得",
  },
  {
    title: "优秀团干部",
    year: "2016",
    organization: "浙江大学",
  },
  {
    title: "坤和奖学金二等奖",
    year: "2012",
    organization: "浙江大学",
  },
  {
    title: "优秀学生一等奖学金",
    year: "2010-2012",
    organization: "浙江大学",
    note: "连续三年获得",
  },
]

export default function Awards() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">荣誉奖项</h2>

      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards.map((award, index) => (
          <Card
            key={index}
            className={cn(
              "card-hover border-secondary",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${index * 100}`,
            )}
          >
            <CardContent className="p-4 flex items-start">
              <div className="mr-3 mt-1">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold">{award.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {award.year} · {award.organization}
                  {award.note && <span className="italic"> ({award.note})</span>}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
