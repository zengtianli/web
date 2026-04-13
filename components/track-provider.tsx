'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { type Track, DEFAULT_TRACK, TRACK_COOKIE, TRACKS, isValidTrack } from '@/lib/track'

interface TrackContextValue {
  track: Track
  setTrack: (t: Track) => void
}

const TrackContext = createContext<TrackContextValue>({
  track: DEFAULT_TRACK,
  setTrack: () => {},
})

/** 从 document.cookie 读取 track（纯客户端，避免服务端 cookies() 的 ByteString 崩溃） */
function getInitialTrack(): Track {
  if (typeof window === 'undefined') return DEFAULT_TRACK

  // URL query 优先
  const params = new URLSearchParams(window.location.search)
  const fromQuery = params.get('track')
  if (fromQuery && isValidTrack(fromQuery)) return fromQuery

  // 然后读 cookie
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${TRACK_COOKIE}=([^;]*)`))
  const fromCookie = match?.[1]
  if (fromCookie && isValidTrack(fromCookie)) return fromCookie

  return DEFAULT_TRACK
}

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrackState] = useState<Track>(DEFAULT_TRACK)
  const router = useRouter()

  // 客户端初始化
  useEffect(() => {
    const initial = getInitialTrack()
    setTrackState(initial)
    document.body.setAttribute('data-track', initial)
  }, [])

  const setTrack = useCallback(
    (t: Track) => {
      setTrackState(t)
      // 写 cookie
      document.cookie = `${TRACK_COOKIE}=${t};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
      // 立即更新 body data-track（CSS 变量即时生效）
      document.body.setAttribute('data-track', t)
      // 更新 URL query（hydro 默认不带参数）
      const url = new URL(window.location.href)
      if (t === DEFAULT_TRACK) {
        url.searchParams.delete('track')
      } else {
        url.searchParams.set('track', t)
      }
      window.history.replaceState({}, '', url.toString())
      // 触发服务端组件重新渲染
      router.refresh()
    },
    [router]
  )

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  )
}

export function useTrack() {
  return useContext(TrackContext)
}
