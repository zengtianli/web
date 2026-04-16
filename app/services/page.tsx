import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { ExternalLink, Activity, Server, Droplets, Code2, BookOpen, Shield, Globe, TrendingUp } from "lucide-react"

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
      { name: "Hydro Toolkit", subdomain: "hydro", description: "水利计算工具集主平台，插件式集成多个计算模块" },
      { name: "水资源年报", subdomain: "hydro-annual", description: "浙江省水资源年报查询，按地区年份筛选导出" },
      { name: "纳污能力", subdomain: "hydro-capacity", description: "河流/水库纳污能力计算，支持分段与多方案对比" },
      { name: "河区调度", subdomain: "hydro-district", description: "浙东河区调度模型，水平衡与分水枢纽计算" },
      { name: "水效评估", subdomain: "hydro-efficiency", description: "工业集聚区水效评估（AHP+CRITIC+TOPSIS）" },
      { name: "地理编码", subdomain: "hydro-geocode", description: "经纬度/地址互转与企业搜索（高德 API）" },
      { name: "灌溉需水", subdomain: "hydro-irrigation", description: "灌溉需水量计算，上传数据计算并导出" },
      { name: "降雨径流", subdomain: "hydro-rainfall", description: "概湖灌溉需水量计算（降雨径流 ETL 管线）" },
      { name: "水库群调度", subdomain: "hydro-reservoir", description: "梯级水库群发电调度，参数配置与结果可视化" },
      { name: "风险图数据", subdomain: "hydro-risk", description: "洪水风险图数据表填充（GeoJSON 三阶段 ETL）" },
    ],
  },
  {
    title: "开发与 AI",
    icon: <Code2 className="h-5 w-5" />,
    color: "text-purple-600",
    services: [
      { name: "Repo Dashboard", subdomain: "dashboard", description: "项目控制台 — VPS 服务/任务/Git 提交总览" },
      { name: "CC 会话日志", subdomain: "cclog", description: "CC 会话历史仪表盘，按项目/日期/关键词筛选" },
      { name: "CC Changelog", subdomain: "changelog", description: "CC 自我进化系统变更日志，按阶段展示演进记录" },
      { name: "Dockit", subdomain: "dockit", description: "文档处理工具箱 — Word/PPT/Excel 多格式处理" },
      { name: "三省六部", subdomain: "board", description: "AI Agent 管理看板 — 模型切换与状态监控" },
    ],
  },
  {
    title: "投资工具",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-green-600",
    services: [
      { name: "QQQ CC Dashboard", subdomain: "cc", description: "QQQ Covered Call 期权交易仪表盘" },
    ],
  },
  {
    title: "内容与媒体",
    icon: <BookOpen className="h-5 w-5" />,
    color: "text-amber-600",
    services: [
      { name: "知识库", subdomain: "docs", description: "Knowledge Dashboard — 文档/指南/知识检索" },
      { name: "有声书", subdomain: "audiobook", description: "Markdown 转有声书，多音色选择与句级同步" },
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
