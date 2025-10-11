import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, User, Briefcase, Trophy, GraduationCap } from "lucide-react"
import { getAllTemplates } from "@/lib/resume-builder"
import Link from "next/link"

export const metadata = {
  title: "简历中心 | 曾田力",
  description: "在线查看和下载曾田力的不同版本简历，包含综合简历、工作简历、学术简历和体育简历。支持在线预览和PDF导出。",
}

const iconMap = {
  comprehensive: User,
  work: Briefcase,
  academic: GraduationCap,
  sports: Trophy,
}

const colorMap = {
  comprehensive: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
  work: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
  academic: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
  sports: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20",
}

const badgeColorMap = {
  comprehensive: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  work: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  academic: "bg-green-500/20 text-green-300 border-green-500/30",
  sports: "bg-orange-500/20 text-orange-300 border-orange-500/30",
}

const highlightsMap = {
  comprehensive: ["全面展示", "完整经历", "适合综合评估"],
  work: ["工作经历", "项目经验", "适合求职"],
  academic: ["学术成果", "详细课程", "适合学术申请"],
  sports: ["体育成就", "综合素质", "特色展示"],
}

export default function ResumePage() {
  const templates = getAllTemplates()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4">
            在线简历中心
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            根据不同场景需求，提供多种简历版本。支持在线预览和PDF导出。
          </p>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => {
            const IconComponent = iconMap[template.id as keyof typeof iconMap]
            const cardColorClass = colorMap[template.id as keyof typeof colorMap]
            const badgeColorClass = badgeColorMap[template.id as keyof typeof badgeColorMap]
            const highlights = highlightsMap[template.id as keyof typeof highlightsMap]

            return (
              <Card key={template.id} className={`card-hover border-secondary bg-secondary/20 ${cardColorClass}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-background/50">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{template.name.zh}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {template.description.zh}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">亮点特色</h4>
                      <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={`text-xs ${badgeColorClass}`}
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 pt-2">
                      <Button variant="default" size="sm" className="w-full" asChild>
                        <Link href={`/resume/${template.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          在线预览
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/zengtianli-cv.pdf" download={`zengtianli-${template.id}.pdf`}>
                          <Download className="h-4 w-4 mr-2" />
                          下载PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center p-6 border border-border/50 rounded-lg bg-card/50">
          <h3 className="text-lg font-semibold mb-3">📋 简历版本说明</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground text-left max-w-3xl mx-auto">
            <div>
              <p className="font-medium mb-1">✨ 综合简历</p>
              <p className="text-xs">全面展示个人能力、经历和成就，适合综合性展示场合</p>
            </div>
            <div>
              <p className="font-medium mb-1">💼 工作简历</p>
              <p className="text-xs">侧重工作经历和项目经验，适合求职和职业发展申请</p>
            </div>
            <div>
              <p className="font-medium mb-1">🎓 学术简历</p>
              <p className="text-xs">侧重教育背景和学术成果，适合申请博士后、学术职位</p>
            </div>
            <div>
              <p className="font-medium mb-1">🏆 体育简历</p>
              <p className="text-xs">突出体育成就和综合素质，适合特殊场合展示</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            💡 提示：在线预览页面支持打印功能，可直接打印或导出为PDF
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
