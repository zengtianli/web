import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ToolsOverview from "@/components/tools-overview"
import ToolCard from "@/components/tool-card"

export const metadata = {
  title: "开发工具 | 曾田力",
  description: "曾田力的开源开发工具集合，包括Execute macOS效率工具集、现代化Neovim配置、ZSH配置等实用工具，提升开发效率。",
}

export default function ToolsPage() {
  const tools = [
    {
      id: "execute",
      name: "Execute - macOS 效率工具集",
      description: "一套完整的 macOS 自动化工具集合，通过 Raycast 集成提供强大的文件处理、窗口管理、宏录制等功能。",
      techs: ["macOS", "Raycast", "Python", "Shell", "AppleScript"],
      github: "https://github.com/zengtianli/execute",
      gitee: "https://gitee.com/zengtianli/execute",
      contentFile: "/content/tools/execute.md"
    },
    {
      id: "neovim",
      name: "现代化 Neovim 配置",
      description: "高度优化、模块化、功能完整的 Neovim 配置，提供现代 IDE 级开发体验。",
      techs: ["Neovim", "Lua", "LSP", "TreeSitter"],
      github: "https://github.com/zengtianli/nvim",
      gitee: "https://gitee.com/zengtianli/nvim",
      contentFile: "/content/tools/neovim.md"
    },
    {
      id: "zsh",
      name: "ZSH 配置",
      description: "基于 Zim 框架的 ZSH 配置，集成现代命令行工具和 FZF 增强功能。",
      techs: ["ZSH", "Zim", "FZF", "现代CLI工具"],
      github: "https://github.com/zengtianli/zsh",
      gitee: "https://gitee.com/zengtianli/zsh",
      contentFile: "/content/tools/zsh.md"
    }
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-20">
          <div className="space-y-16">
            <ToolsOverview totalTools={tools.length} />
            <div className="space-y-8">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
