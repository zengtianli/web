import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, User, Briefcase, Trophy } from "lucide-react"
import { getContent, getNestedContent } from "@/lib/content"
import Link from "next/link"

export const metadata = {
  title: "简历中心 | 曾田力",
  description: "查看和下载曾田力的不同版本简历，包含综合简历、工作简历和体育简历。",
}

interface ResumeItem {
  id: string
  title: string
  description: string
  filename: string
  color: string
  icon: string
  highlights: string[]
}

interface ResumeIndexContent {
  title: string
  description: string
  resumes: ResumeItem[]
}

const iconMap = {
  User,
  Briefcase,
  Trophy,
}

const colorMap = {
  blue: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
  green: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
  orange: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20",
}

const badgeColorMap = {
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  green: "bg-green-500/20 text-green-300 border-green-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
}

// 默认简历内容
const defaultResumeContent: ResumeIndexContent = {
  title: "简历中心",
  description: "查看和下载曾田力的不同版本简历",
  resumes: [
    {
      id: "comprehensive",
      title: "综合简历",
      description: "包含学术背景、工作经历、项目经验、体育成就等全面信息",
      filename: "曾田力-综合简历",
      color: "blue",
      icon: "User",
      highlights: ["完整学术背景", "详细项目经验", "全面技能展示", "体育特长展示"]
    },
    {
      id: "work",
      title: "工作简历",
      description: "专注于职业经历、项目成果、技术技能和知识产权成果",
      filename: "曾田力-工作简历",
      color: "green",
      icon: "Briefcase",
      highlights: ["详细工作职责", "具体项目贡献", "技术成果展示", "知识产权成果"]
    },
    {
      id: "sports",
      title: "体育简历",
      description: "展示体育竞技成就、运动技能和团队合作精神",
      filename: "曾田力-体育简历",
      color: "orange",
      icon: "Trophy",
      highlights: ["运动之星荣誉", "多项竞技冠军", "全面运动技能", "体育精神品质"]
    }
  ]
}

export default async function ResumePage() {
  const resumeContentResult = await getNestedContent<ResumeIndexContent>('resume/_index')
  const resumeContent = resumeContentResult || defaultResumeContent

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4">
            {resumeContent.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {resumeContent.description}
          </p>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {resumeContent.resumes.map((resume) => {
            const IconComponent = iconMap[resume.icon as keyof typeof iconMap] || User
            const cardColorClass = colorMap[resume.color as keyof typeof colorMap] || colorMap.blue
            const badgeColorClass = badgeColorMap[resume.color as keyof typeof badgeColorMap] || badgeColorMap.blue

            return (
              <Card key={resume.id} className={`transition-all duration-300 ${cardColorClass}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-background/50">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{resume.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {resume.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">亮点特色</h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.highlights.map((highlight, index) => (
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
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/resume/view/${resume.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          在线预览
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        下载PDF
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
          <h3 className="text-lg font-semibold mb-2">使用说明</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• <strong>综合简历</strong>：适用于全面展示个人能力和经历的场合</p>
            <p>• <strong>工作简历</strong>：适用于求职和职业发展相关的申请</p>
            <p>• <strong>体育简历</strong>：适用于体育相关的申请或全面人才展示</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
