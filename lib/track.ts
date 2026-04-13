/**
 * Track 类型定义 + 元数据
 * 4 个就业方向：水利数字化、AI 工程、开发工具、独立开发
 */

export const TRACKS = ['hydro', 'ai', 'devtools', 'indie'] as const
export type Track = (typeof TRACKS)[number]
export const DEFAULT_TRACK: Track = 'hydro'
export const TRACK_COOKIE = 'career-track'

export const TRACK_META: Record<Track, { label: string; labelEn: string; color: string }> = {
  hydro:    { label: '水利数字化', labelEn: 'Water Resources', color: 'blue' },
  ai:       { label: 'AI 工程',   labelEn: 'AI Engineering',  color: 'purple' },
  devtools: { label: '开发工具',  labelEn: 'DevTools',        color: 'green' },
  indie:    { label: '独立开发',  labelEn: 'Indie Dev',       color: 'orange' },
}

export function isValidTrack(v: unknown): v is Track {
  return typeof v === 'string' && TRACKS.includes(v as Track)
}

/** 博客 tag 到 track 的映射，用于按 track 过滤博客 */
export const TRACK_BLOG_TAGS: Record<Track, string[]> = {
  hydro:    ['水利工程', '数字孪生', '智慧水利', '水资源', '生态流量', '水文'],
  ai:       ['AI', 'LLM', 'Claude', '提示工程', 'RAG', '机器学习', 'Agent'],
  devtools: ['开发工具', 'Neovim', 'CLI', 'Tauri', 'DevOps', '自动化'],
  indie:    ['独立开发', '产品', 'SaaS', '创业', '全栈'],
}
