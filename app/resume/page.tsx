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

// 组件现在完全依赖外部内容文件，不再包含默认数据

export default async function ResumePage() {
  const resumeContent = await getNestedContent<ResumeIndexContent>('resume/_index')

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        {resumeContent ? (
          <>
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
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href="/zengtianli-cv.pdf" download={`${resume.filename}.pdf`}>
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
              <h3 className="text-lg font-semibold mb-2">使用说明</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• <strong>综合简历</strong>：适用于全面展示个人能力和经历的场合</p>
                <p>• <strong>工作简历</strong>：适用于求职和职业发展相关的申请</p>
                <p>• <strong>体育简历</strong>：适用于体育相关的申请或全面人才展示</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">简历内容正在加载中...</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
