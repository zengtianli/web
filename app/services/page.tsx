import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { ExternalLink, Activity, Server, Droplets, Code2, BookOpen, Shield, Globe } from "lucide-react"

export const metadata = {
  title: "服务总览 | 曾田力",
  description: "所有在线服务与子域名一览——水利工具、开发平台、内容站点、基础设施监控。",
}

interface Service {
  name: string
  subdomain: string
  description: string
  url?: string // override for non-subdomain services
}

interface ServiceGroup {
  title: string
  icon: React.ReactNode
  color: string
  services: Service[]
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "主站",
    icon: <Globe className="h-5 w-5" />,
    color: "text-[#1d1d1f]",
    services: [
      { name: "曾田力", subdomain: "tianlizeng.cloud", description: "个人网站 — 水利工程师 / AI 工程师 / 独立开发者", url: `https://tianlizeng.cloud` },
    ],
  },
  {
    title: "水利工具",
    icon: <Droplets className="h-5 w-5" />,
    color: "text-blue-600",
    services: [
      { name: "Hydro Toolkit", subdomain: "hydro", description: "水利计算工具箱入口" },
      { name: "年度水资源", subdomain: "hydro-annual", description: "年度水资源统计分析" },
      { name: "库容分析", subdomain: "hydro-capacity", description: "水库库容曲线与调度" },
      { name: "区域水资源", subdomain: "hydro-district", description: "行政区划水资源概况" },
      { name: "水效评估", subdomain: "hydro-efficiency", description: "用水效率评价体系" },
      { name: "水利地理编码", subdomain: "hydro-geocode", description: "水利设施地理编码检索" },
      { name: "灌溉管理", subdomain: "hydro-irrigation", description: "灌区需水与灌溉制度" },
      { name: "降雨分析", subdomain: "hydro-rainfall", description: "雨量频率与暴雨计算" },
      { name: "水库监测", subdomain: "hydro-reservoir", description: "水库基础信息与监测" },
      { name: "风险评估", subdomain: "hydro-risk", description: "洪水风险与预警分析" },
    ],
  },
  {
    title: "开发与 AI",
    icon: <Code2 className="h-5 w-5" />,
    color: "text-purple-600",
    services: [
      { name: "Repo Dashboard", subdomain: "dashboard", description: "GitHub 仓库状态看板" },
      { name: "CC 会话日志", subdomain: "cclog", description: "Claude Code 会话历史与知识检索" },
      { name: "CC Chat", subdomain: "cc", description: "Claude Code 对话界面" },
      { name: "Changelog", subdomain: "changelog", description: "配置生态变更日志" },
      { name: "Auggie", subdomain: "auggie", description: "代码库语义搜索引擎" },
      { name: "Dockit", subdomain: "dockit", description: "文档处理 API 服务" },
    ],
  },
  {
    title: "内容与媒体",
    icon: <BookOpen className="h-5 w-5" />,
    color: "text-amber-600",
    services: [
      { name: "文档站", subdomain: "docs", description: "技术文档与手册" },
      { name: "有声书", subdomain: "audiobook", description: "Markdown 转有声书播放器" },
      { name: "公示板", subdomain: "board", description: "水利公示与信息发布" },
      { name: "图床", subdomain: "img", description: "图片托管服务 (Vercel)" },
    ],
  },
  {
    title: "基础设施",
    icon: <Shield className="h-5 w-5" />,
    color: "text-gray-600",
    services: [
      { name: "Uptime Kuma", subdomain: "status", description: "服务可用性监控" },
      { name: "n8n", subdomain: "n8n", description: "工作流自动化引擎" },
      { name: "Marzban", subdomain: "panel", description: "代理面板管理" },
      { name: "Marzban 订阅", subdomain: "sub", description: "代理客户端订阅端点" },
      { name: "OAuth Proxy", subdomain: "proxy", description: "Cloudflare Access 认证代理" },
      { name: "Webhook", subdomain: "webhook", description: "GitHub Webhook 接收器" },
    ],
  },
]

const DOMAIN = "tianlizeng.cloud"

function ServiceCard({ service }: { service: Service }) {
  const url = service.url || `https://${service.subdomain}.${DOMAIN}`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 bg-white/50 backdrop-blur-xl border border-white/60
        rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-md hover:bg-white/70"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1d1d1f] truncate">{service.name}</span>
          <span className="text-[10px] text-[#86868b] font-mono shrink-0">{service.subdomain}</span>
        </div>
        <p className="text-xs text-[#86868b] mt-0.5 truncate">{service.description}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-[#86868b] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

export default function ServicesPage() {
  const totalServices = SERVICE_GROUPS.reduce((sum, g) => sum + g.services.length, 0)

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <Navbar />
      <div className="flex-grow max-w-5xl mx-auto px-6 md:px-8 w-full">
        <PageHeader
          title="服务总览"
          description={`${totalServices} 个在线服务，统一部署在 ${DOMAIN}`}
        />

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 mb-12 text-sm text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <Server className="h-4 w-4" />
            1 台 VPS
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="h-4 w-4" />
            <a href={`https://status.${DOMAIN}`} target="_blank" rel="noopener noreferrer"
              className="text-[#0071e3] hover:underline">
              实时状态
            </a>
          </span>
        </div>

        {/* Service groups */}
        <div className="space-y-10 pb-24">
          {SERVICE_GROUPS.map((group) => (
            <section key={group.title}>
              <div className="flex items-center gap-2 mb-4">
                <span className={group.color}>{group.icon}</span>
                <h2 className="text-lg font-semibold text-[#1d1d1f]">{group.title}</h2>
                <span className="text-xs text-[#86868b] ml-1">{group.services.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {group.services.map((service) => (
                  <ServiceCard key={service.subdomain} service={service} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
