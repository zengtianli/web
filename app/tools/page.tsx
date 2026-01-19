import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import ToolCard from "@/components/tool-card"

export const metadata = {
  title: "开发工具 | 曾田力",
  description: "曾田力的开源开发工具集合，包括Execute macOS效率工具集、现代化Neovim配置、ZSH配置等实用工具，提升开发效率。",
}

const tools = [
  {
    id: "irrigation",
    name: "农田灌溉需水计算",
    description: "浙东河网平原农田灌溉需水量在线计算系统，支持多作物类型、灌溉保证率配置，可视化展示需水量趋势和分布。",
    techs: ["Next.js", "TypeScript", "Recharts", "Python API"],
    link: "/tools/irrigation",
  },
  {
    id: "execute",
    name: "Execute - macOS 效率工具集",
    description: "一套完整的 macOS 自动化工具集合，通过 Raycast 集成提供强大的文件处理、窗口管理、宏录制等功能。",
    techs: ["macOS", "Raycast", "Python", "Shell", "AppleScript"],
    github: "https://github.com/zengtianli/execute",
    gitee: "https://gitee.com/zengtianli/execute",
  },
  {
    id: "neovim",
    name: "现代化 Neovim 配置",
    description: "高度优化、模块化、功能完整的 Neovim 配置，提供现代 IDE 级开发体验。",
    techs: ["Neovim", "Lua", "LSP", "TreeSitter"],
    github: "https://github.com/zengtianli/nvim",
    gitee: "https://gitee.com/zengtianli/nvim",
  },
  {
    id: "zsh",
    name: "ZSH 配置",
    description: "基于 Zim 框架的 ZSH 配置，集成现代命令行工具和 FZF 增强功能。",
    techs: ["ZSH", "Zim", "FZF", "现代CLI工具"],
    github: "https://github.com/zengtianli/zsh",
    gitee: "https://gitee.com/zengtianli/zsh",
  }
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <PageHeader 
          title="开发工具" 
          description="精心打磨的开源工具集，涵盖 macOS 自动化、编辑器配置、命令行环境等各个方面" 
        />
        <div className="space-y-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
