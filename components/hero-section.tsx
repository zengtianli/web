/**
 * Hero 区域组件
 * 根据 track 渲染完全不同的布局
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { HeroConfig } from "@/lib/profile-config"

interface HeroSectionProps {
  config: HeroConfig
}

/** 解析 **bold** 为 accent 色 span */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={index} className="text-accent font-medium">
              {part.slice(2, -2)}
            </span>
          )
        }
        return part
      })}
    </>
  )
}

function HeroButtons({ buttons }: { buttons: HeroConfig['buttons'] }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {buttons.map((button, index) => (
        <Link key={index} href={button.href}>
          <Button variant={button.variant} size="lg" className="group">
            {button.text}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      ))}
    </div>
  )
}

// ============== Hydro: 全屏渐变 + 居中大标题 ==============
function HeroHydro({ config }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10" />
      <div className="container mx-auto px-4 z-20 text-center animate-[fadeIn_0.3s_ease]">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{config.name}</h1>
        <p className="text-xl md:text-2xl text-accent mb-8">{config.tagline}</p>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          <RichText text={config.description} />
        </p>
        <div className="flex justify-center">
          <HeroButtons buttons={config.buttons} />
        </div>
      </div>
    </section>
  )
}

// ============== AI: 左文右终端 ==============
function HeroAI({ config }: HeroSectionProps) {
  const terminalLines = [
    { prompt: '~', cmd: 'claude', dim: false },
    { prompt: '', cmd: '> Loading 43 commands, 14 skills...', dim: true },
    { prompt: '', cmd: '> MCP: auggie, cclog, gmail connected', dim: true },
    { prompt: '', cmd: '> Memory: 25 entries loaded', dim: true },
    { prompt: '', cmd: '> Ready. What shall we build?', dim: false },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10" />
      <div className="container mx-auto px-4 z-20 animate-[fadeIn_0.3s_ease]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-sm font-mono text-accent/70 mb-3 tracking-wider uppercase">AI Engineering</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{config.name}</h1>
            <p className="text-xl md:text-2xl text-accent mb-6">{config.tagline}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              <RichText text={config.description} />
            </p>
            <HeroButtons buttons={config.buttons} />
          </div>
          {/* Right: terminal */}
          <div className="hidden lg:block">
            <div className="bg-[hsl(var(--background))]/80 border border-accent/20 rounded-lg shadow-[0_0_40px_hsl(var(--track-glow)/0.1)] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-accent/10 bg-accent/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">claude-code — zsh</span>
              </div>
              {/* Terminal content */}
              <div className="p-5 font-mono text-sm space-y-1.5">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="animate-[fadeInUp_0.3s_ease_both]"
                    style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
                  >
                    {line.prompt && (
                      <span className="text-accent">{line.prompt} $ </span>
                    )}
                    <span className={line.dim ? 'text-muted-foreground' : 'text-foreground'}>
                      {line.cmd}
                    </span>
                  </div>
                ))}
                <div
                  className="animate-[fadeInUp_0.3s_ease_both] mt-2"
                  style={{ animationDelay: '0.8s' }}
                >
                  <span className="text-accent">~ $ </span>
                  <span className="inline-block w-2 h-4 bg-accent/80 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============== DevTools: 代码背景 + 工具图标矩阵 ==============
function HeroDevtools({ config }: HeroSectionProps) {
  const tools = [
    'doctools', 'devtools', 'mactools', 'clashx',
    'Raycast', 'Neovim', 'Zsh', 'Git',
    'Docker', 'Nginx', 'systemd', 'CF API',
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10" />
      <div className="container mx-auto px-4 z-20 animate-[fadeIn_0.3s_ease]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-sm font-mono text-accent/70 mb-3 tracking-wider uppercase">Developer Tools</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{config.name}</h1>
            <p className="text-xl md:text-2xl text-accent mb-6">{config.tagline}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              <RichText text={config.description} />
            </p>
            <HeroButtons buttons={config.buttons} />
          </div>
          {/* Right: tool grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-3">
              {tools.map((tool, i) => (
                <div
                  key={tool}
                  className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center hover:bg-accent/10 hover:border-accent/40 transition-all duration-200 animate-[fadeInUp_0.3s_ease_both]"
                  style={{ animationDelay: `${i * 0.05 + 0.2}s` }}
                >
                  <span className="text-sm font-mono text-accent">{tool}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
              44 scripts · 58 raycast wrappers · 4 repos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============== Indie: 指标墙 ==============
function HeroIndie({ config }: HeroSectionProps) {
  const metrics = [
    { value: '29', label: 'GitHub Repos' },
    { value: '24', label: 'systemd 服务' },
    { value: '4', label: 'Docker 容器' },
    { value: '58', label: 'Raycast Wrappers' },
    { value: '43', label: 'CC Commands' },
    { value: '12', label: 'Hydro 工具' },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-10" />
      <div className="container mx-auto px-4 z-20 animate-[fadeIn_0.3s_ease]">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-accent/70 mb-3 tracking-wider uppercase">Independent Developer</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{config.name}</h1>
          <p className="text-xl md:text-2xl text-accent mb-6">{config.tagline}</p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            <RichText text={config.description} />
          </p>
        </div>
        {/* Metrics wall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-10">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center hover:bg-accent/10 hover:border-accent/40 transition-all duration-200 animate-[fadeInUp_0.3s_ease_both]"
              style={{ animationDelay: `${i * 0.08 + 0.2}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <HeroButtons buttons={config.buttons} />
        </div>
      </div>
    </section>
  )
}

// ============== 主入口：按 track 分发 ==============
export default function HeroSection({ config }: HeroSectionProps) {
  switch (config.track) {
    case 'ai':
      return <HeroAI config={config} />
    case 'devtools':
      return <HeroDevtools config={config} />
    case 'indie':
      return <HeroIndie config={config} />
    default:
      return <HeroHydro config={config} />
  }
}
