"use client"

import { Lightbulb } from "lucide-react"
import { PatentsContent, Patent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { ExpandableCard } from "@/components/molecules"

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
        {data.items.map((patent: Patent, index: number) => (
          <ExpandableCard
            key={index}
            variant="hover" // 对应原来的 card-hover
            expandText="展开详情"
            collapseText="收起详情"
            expandedContent={
              <div>
                <p className="font-medium mb-1">专利描述:</p>
                <p className="text-sm text-muted-foreground">{patent.description}</p>
              </div>
            }
          >
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
              </div>
            </div>
          </ExpandableCard>
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
} 