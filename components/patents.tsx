"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PatentsContent, Patent } from "@/lib/content"

// 默认专利数据
interface PatentWithState extends Patent {
  expanded: boolean;
}

// 默认专利数据
const defaultPatentsData: PatentsContent = {
  title: "专利发明",
  items: [
    {
      title: "一种可调节深度的取水曝气装置",
      inventors: "史毅超，曾田力，张瑶兰，陈跃青",
      description: "本实用新型公开了一种可调节深度的取水曝气装置，包括能源模块、抽水泵、出流管路、浮台、伸缩结构、三通进水管路。所述出流管路、三通进水管路分别连接抽水泵的出水口和进水口，所述能源模块置于所述浮台上，所述浮台与所述出流管路集成为一体，所述浮台是由轻质材料浇筑而成的立方体型平台，所述出流管路被所述浮台包络。本实用新型所述装置结构简单，能有效地促进不同深度水体的循环与混合，装置可以漂浮于水体上，并配有能源模块，一定程度上保证了装置的可循环利用，有效地提高了取水曝气的效果。",
      year: "2022"
    },
    {
      title: "一种基于多模型融合的降雨数据分析与可视化系统及方法",
      inventors: "周衍银，曾田力，严雷，何震洲，左晓霞，朱韫泽，官宇，潘晓，杨彧，俞铁铭，周芬，李军，戴欢，孙宗洋，史毅超",
      description: "本发明公开了一种基于多模型融合的降雨数据分析与可视化系统及方法，包括以下步骤：S1，数据准备与预处理：收集整合降雨观测数据，进行质量控制与标准化处理；S2，多模型分析：应用Mann-Kendall、Sen斜率法及滑动窗口分析等多种算法，揭示降雨数据的趋势、幅度与多尺度特征；S3，区域间关联性分析：计算不同区域、多尺度下的降雨相关性，并可识别相似模式区域；S4，可视化与交互展示：通过多样化的图表直观呈现分析结果，并提供交互界面支持探索。本发明通过集成多种分析模型与可视化技术，解决了现有技术在降雨数据分析中综合性不足、多尺度分析欠缺及可视化单一等问题，能提供更全面、深入、多维度的降雨特征洞察，并提升了结果呈现的直观性与分析效率。",
      year: "2023"
    }
  ]
};

// 组件接口定义
interface PatentsProps {
  data?: PatentsContent;
}

export default function Patents({ data = defaultPatentsData }: PatentsProps) {
  // 将专利数据项转换为包含展开状态的数据项
  const initialPatents = data.items.map(patent => ({ ...patent, expanded: false }) as PatentWithState);
  const [patentsList, setPatentsList] = useState<PatentWithState[]>(initialPatents);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // 根据items数量确定每行显示的卡片数
  const getGridCols = (itemCount: number) => {
    if (itemCount % 3 === 0) return "md:grid-cols-3"
    if (itemCount % 2 === 0) return "md:grid-cols-2"
    return "md:grid-cols-3" // 默认为3列
  }

  const toggleExpand = (index: number) => {
    setPatentsList(patentsList.map((patent, i) => (i === index ? { ...patent, expanded: !patent.expanded } : patent)))
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>

      <div ref={ref} className={`grid grid-cols-1 ${getGridCols(data.items.length)} gap-4`}>
        {patentsList.map((patent: PatentWithState, index: number) => (
          <Card
            key={index}
            className={cn(
              "card-hover border-secondary",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${index * 200}`,
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{patent.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">发明年份: {patent.year}</p>
                  <p className="text-sm mb-3">
                    发明人:{" "}
                    {patent.inventors.split("，").map((inventor: string, i: number, arr: string[]) => (
                      <span key={i}>
                        {inventor.includes("曾田力") ? <strong>{inventor}</strong> : inventor}
                        {i < arr.length - 1 ? "，" : ""}
                      </span>
                    ))}
                  </p>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      patent.expanded ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="pt-2 border-t mt-2">
                      <p className="font-medium mb-1">专利描述:</p>
                      <p className="text-sm text-muted-foreground">{patent.description}</p>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="mt-2 text-accent" onClick={() => toggleExpand(index)}>
                    {patent.expanded ? (
                      <>
                        收起详情 <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        展开详情 <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 