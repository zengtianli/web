/**
 * 首页 Track 专属展示区块
 * 每个方向展示不同的内容：
 * - hydro: 最新动态（复用现有 LatestUpdates）
 * - ai: 技术栈徽章墙
 * - devtools: 工具仓库列表
 * - indie: 运营指标卡片
 */

import type { Track } from "@/lib/track"
import { Card, CardContent } from "@/components/ui/card"

// ============== AI: 技术栈徽章墙 ==============
const aiTechStack = [
  { category: 'LLM & Agent', items: ['Claude Code', 'MCP Protocol', 'Prompt Engineering', 'RAG', 'Tool Use', 'Memory System'] },
  { category: 'Languages', items: ['Python', 'TypeScript', 'Rust', 'Fortran', 'Shell', 'SQL'] },
  { category: 'ML & Data', items: ['LSTM', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'AHP/TOPSIS'] },
  { category: 'Infra', items: ['VPS', 'Docker', 'Nginx', 'Cloudflare', 'systemd', 'GitHub Actions'] },
]

function AIShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">技术栈</h2>
        <p className="text-center text-muted-foreground mb-10">从 LLM 工程到基础设施的完整能力图谱</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {aiTechStack.map((group, gi) => (
            <Card key={group.category} className="border-accent/10 bg-accent/5 animate-[fadeInUp_0.3s_ease_both]" style={{ animationDelay: `${gi * 0.1}s` }}>
              <CardContent className="p-5">
                <h3 className="text-sm font-mono text-accent mb-3 tracking-wider uppercase">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============== DevTools: 工具仓库列表 ==============
const toolRepos = [
  { name: 'doctools', scripts: 17, wrappers: 27, desc: '文档处理与数据转换' },
  { name: 'devtools', scripts: 10, wrappers: 12, desc: '开发工具、Git 管理、CF API' },
  { name: 'mactools', scripts: 11, wrappers: 13, desc: 'macOS 日常效率工具' },
  { name: 'clashx', scripts: 6, wrappers: 6, desc: 'ClashX 代理管理' },
]

function DevtoolsShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">工具仓库</h2>
        <p className="text-center text-muted-foreground mb-10">4 个独立 repo，44 个脚本，58 个 Raycast wrappers</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {toolRepos.map((repo, i) => (
            <Card
              key={repo.name}
              className="border-accent/10 bg-accent/5 hover:border-accent/30 transition-all animate-[fadeInUp_0.3s_ease_both]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardContent className="p-5">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-mono text-accent font-bold">{repo.name}</h3>
                  <div className="text-xs text-muted-foreground">
                    {repo.scripts} scripts · {repo.wrappers} wrappers
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{repo.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============== Indie: 运营指标卡片 ==============
const indieMetrics = [
  { label: '月均运维成本', value: '$31', sub: 'VPS $30 + 域名 $1' },
  { label: '线上服务', value: '28', sub: '24 systemd + 4 Docker' },
  { label: '代码仓库', value: '29', sub: '全部 GitHub 托管' },
  { label: '子域名服务', value: '10+', sub: 'CF 统一管理' },
  { label: '自动化工作流', value: '43', sub: 'Claude Code commands' },
  { label: '软件著作权', value: '6', sub: '已登记/申请中' },
]

function IndieShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">运营数据</h2>
        <p className="text-center text-muted-foreground mb-10">一个人的全栈基础设施</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {indieMetrics.map((metric, i) => (
            <Card
              key={metric.label}
              className="border-accent/10 bg-accent/5 text-center animate-[fadeInUp_0.3s_ease_both]"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <CardContent className="p-5">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{metric.value}</div>
                <div className="text-sm font-medium mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============== 主入口 ==============
export function TrackShowcase({ track }: { track: Track }) {
  switch (track) {
    case 'ai':
      return <AIShowcase />
    case 'devtools':
      return <DevtoolsShowcase />
    case 'indie':
      return <IndieShowcase />
    default:
      return null // hydro 使用 LatestUpdates
  }
}
