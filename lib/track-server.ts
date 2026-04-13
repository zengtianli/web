/**
 * 服务端 track 读取
 * 优先级：URL ?track= → cookie → DEFAULT_TRACK
 */

import { cookies } from 'next/headers'
import { DEFAULT_TRACK, TRACK_COOKIE, isValidTrack, type Track } from './track'

export async function getServerTrack(
  searchParams?: Record<string, string | string[] | undefined>
): Promise<Track> {
  // URL query 优先
  const fromQuery = searchParams?.track
  if (typeof fromQuery === 'string' && isValidTrack(fromQuery)) return fromQuery

  // 然后读 cookie（try-catch 防止非 ASCII cookie 导致 ByteString 崩溃）
  try {
    const cookieStore = await cookies()
    const fromCookie = cookieStore.get(TRACK_COOKIE)?.value
    if (fromCookie && isValidTrack(fromCookie)) return fromCookie
  } catch {
    // cookie 解析失败，用默认值
  }

  return DEFAULT_TRACK
}
