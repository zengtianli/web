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

  // 然后读 cookie
  const cookieStore = await cookies()
  const fromCookie = cookieStore.get(TRACK_COOKIE)?.value
  if (fromCookie && isValidTrack(fromCookie)) return fromCookie

  return DEFAULT_TRACK
}
