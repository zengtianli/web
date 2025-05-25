import { projects } from "@/data/projects"

export type SearchResultType = "project" | "research" | "page"

export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: SearchResultType
  image?: string
  tags?: string[]
}

// 搜索数据源
const searchSources: Record<SearchResultType, { items: any[]; getSearchResult: (item: any) => SearchResult }> = {
  project: {
    items: projects,
    getSearchResult: (project): SearchResult => ({
      id: project.slug,
      title: project.title,
      description: project.brief,
      url: `/projects/${project.slug}`,
      type: "project",
      image: project.image,
      tags: project.tags,
    }),
  },
  research: {
    items: [], // 这里可以添加研究成果数据
    getSearchResult: (item): SearchResult => ({
      id: "",
      title: "",
      description: "",
      url: "",
      type: "research",
    }),
  },
  page: {
    items: [
      {
        id: "home",
        title: "首页",
        description: "曾田力个人作品集网站首页",
        url: "/",
      },
      {
        id: "about",
        title: "关于我",
        description: "了解曾田力的个人经历、技能和专业背景",
        url: "/about",
      },
      {
        id: "projects",
        title: "项目案例",
        description: "浏览曾田力参与的各类水利工程和数据分析项目",
        url: "/projects",
      },
      {
        id: "research",
        title: "学术与成果",
        description: "查看曾田力的学术研究和专业成果",
        url: "/research",
      },
      {
        id: "contact",
        title: "联系方式",
        description: "获取联系曾田力的各种方式",
        url: "/contact",
      },
    ],
    getSearchResult: (item): SearchResult => ({
      id: item.id,
      title: item.title,
      description: item.description,
      url: item.url,
      type: "page",
    }),
  },
}

// 搜索函数
export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  const results: SearchResult[] = []

  // 搜索所有数据源
  Object.entries(searchSources).forEach(([type, source]) => {
    const { items, getSearchResult } = source
    
    const matchedItems = items.filter((item) => {
      // 针对不同类型的数据源，实现不同的匹配逻辑
      if (type === "project") {
        return (
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.brief.toLowerCase().includes(normalizedQuery) ||
          item.background?.toLowerCase().includes(normalizedQuery) ||
          (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(normalizedQuery)))
        )
      }
      
      if (type === "page") {
        return (
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
        )
      }
      
      return false
    })
    
    results.push(...matchedItems.map(getSearchResult))
  })

  return results
}

// 调试搜索函数 - 用于debug-search API路由
export async function debugSearch(query: string) {
  const results = await searchContent(query)
  
  return {
    manualMatches: results.length,
    searchTerms: query.toLowerCase().split(/\s+/).filter(Boolean),
    results
  }
} 