import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 拦截包含非 ASCII cookie 的请求，清理有问题的 cookie
 * 防止 Next.js 内部 cookies() 触发 ByteString 崩溃
 */
export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return NextResponse.next()

  // 检查是否有非 ASCII 字符
  let hasNonAscii = false
  for (let i = 0; i < cookieHeader.length; i++) {
    if (cookieHeader.charCodeAt(i) > 127) {
      hasNonAscii = true
      break
    }
  }

  if (!hasNonAscii) return NextResponse.next()

  // 过滤掉包含非 ASCII 字符的 cookie，只保留安全的
  const safeCookies = cookieHeader
    .split(';')
    .map(c => c.trim())
    .filter(c => {
      for (let i = 0; i < c.length; i++) {
        if (c.charCodeAt(i) > 127) return false
      }
      return true
    })
    .join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('cookie', safeCookies)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // 匹配所有路由，排除静态资源
    '/((?!_next/static|_next/image|favicon|images|archives).*)',
  ],
}
