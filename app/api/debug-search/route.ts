import { NextResponse } from 'next/server'
import { debugSearch } from '@/lib/search'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const query = url.searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ error: '请提供搜索查询参数 q' }, { status: 400 })
  }
  
  // 调用调试搜索函数
  const results = await debugSearch(query)
  
  return NextResponse.json({
    query,
    resultsCount: results ? (results.manualMatches || 0) : 0,
    results
  })
} 