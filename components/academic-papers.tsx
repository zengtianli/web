"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const papers = [
  {
    title: "浙东引水工程受水区降雨趋势与多尺度变异性",
    journal: "水电能源科学",
    year: "2025",
    authors: "曾田力，左晓霞，杨彧，戴欢，吴木红，钟吕斌，陈舒阳",
    abstract:
      "为揭示浙东引水工程受水区的降雨变化规律以优化工程调度，本研究分析了工程影响下15个典型子区域1961年至2022年的长序列日降雨数据。采用Mann-Kendall趋势检验、Sen's斜率估计和多尺度滑动窗口分析等方法，系统考察了降雨的时空分布、长期趋势、多尺度变异性及区域相关性。研究发现：所有子区域年降雨量均呈显著上升趋势（p<0.05），Hurst指数分析（H>0.5）表明该上升趋势具有持续性，但增幅空间分异明显（沿海>河流域>丘陵），且2010年后年际波动加剧；降雨特征具有显著的尺度依赖性，短时间尺度（3个月）表现出高变异性和强空间异质性，长尺度（12个月）则更稳定且区域协同性更高；区域间降雨相关性普遍随分析时间尺度的增加而增强，但Sen's斜率估计的趋势量值存在不确定性。本研究精细刻画了研究区降雨的长期及多尺度变化特征，为浙东引水工程适应性调度和区域水资源优化管理提供了重要的科学依据。",
    link: "",
    expanded: false,
  },

  {
    title: "基于主要驱动因子筛选法和深度学习算法的浙江省动态需水量预测",
    journal: "水科学进展",
    year: "2024",
    authors: "许月萍 曾田力 周欣磊 章鲁琪 王贝 王冬",
    abstract:
      "收集了浙江省2000—2020年各用水行业需水量数据，采用基于Spearman秩相关分析的主要驱动因子筛选法筛选了影响各行业需水量的主要驱动因子，进而构造了改进的长短时记忆(LSTM)神经网络需水量预测模型，对各行业需水量进行动态滚动预测，并将改进LSTM模型的预测结果与传统单变量LSTM预测模型、卷积神经网络模型、支持向量回归模型的预测结果进行了对比。结果表明，基于主要驱动因子筛选法改进的LSTM模型能实时动态滚动预测各行业每年需水量，且预测结果精度高于其他3种模型。",
    link: "https://kns.cnki.net/kcms2/article/abstract?v=_uHp55J8LtC_mPiTawHQ9mpKIlwshslTSNShnIcGRsxqthitU7rSE04BPCT3mDcFidsQ2wKfaTjQ--9xh1DwHprtPjOFrjH1jnjBoMJU2Ijhfje8MjHIYKz5QxTUZv2jJcMAR1MHz_90iwhpIOwP_YQnMkjelU1_giF4MKNQWlhxqgEAllptmw==&uniplatform=NZKPT&language=CHS",
    expanded: false,
  },
  {
    title: "考虑侧向出沙的河网非均匀沙输移",
    journal: "水利学报",
    year: "2016",
    authors: "孙志林 杨恩尚 曾田力 祝丽丽",
    abstract:
      "引水进入河网可快速地改善水质，同时也会造成泥沙淤积问题。水流在主干河道行进时将挟带泥沙向连通支流扩散，因而计算河网泥沙输移时应考虑侧向出沙问题。根据作者在杭州西部河网若干测站进行的全年实时水位-流量和逐日泥沙实测资料，建立了适用河网的对数型非均匀沙挟沙能力公式，进而结合侧问出流首次导出了考虑时变侧向出沙的河网非均匀沙输移计算方法，据此改进了一维河网输沙微分方程和离散计算模式。经实测资料验证，计算与实测值符合良好。对杭州西部河网进行的输沙计算显示，侧向出沙约占淤积总量的11%，这意味者河网模型不考虑侧向出沙会造成较大的误差。",
    link: "https://kns.cnki.net/kcms2/article/abstract?v=_uHp55J8LtB5eEDlmNyi_reK8VnRnJKjnkK7cPVS-t3k2JBcTuZe57BBOTit3pKCCpDGAndcBsXBiOPHa-SvFB6dc_WukJ31v-K5TkB1LudqOwDOPgfykoPcprUrkj4zxRzYuEDwat_K1WOm-lyxIWsR9LV_dTqjXPbOQ0vfyVYjpkhRiT0-LQ==&uniplatform=NZKPT&language=CHS",
    expanded: false,
  },
  {
    title: "A Depth-Averaged 2D Physically-Based Model for Flow and Sediment Transport in Open Channels",
    journal: "ASCE环境水资源大会论文集",
    year: "2019",
    authors: "Zeng T., Wu W.",
    abstract:
      "This paper presents a novel depth-averaged two-dimensional model for simulating flow and sediment transport in open channels. The model incorporates physically-based parameters and has been validated using field measurements from various river systems.",
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
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
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
