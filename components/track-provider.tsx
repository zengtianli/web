'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { type Track, DEFAULT_TRACK, TRACK_COOKIE } from '@/lib/track'

interface TrackContextValue {
  track: Track
  setTrack: (t: Track) => void
}

const TrackContext = createContext<TrackContextValue>({
  track: DEFAULT_TRACK,
  setTrack: () => {},
})

export function TrackProvider({
  initialTrack,
  children,
}: {
  initialTrack: Track
  children: React.ReactNode
}) {
  const [track, setTrackState] = useState<Track>(initialTrack)
  const router = useRouter()

  const setTrack = useCallback(
    (t: Track) => {
      setTrackState(t)
      // 写 cookie
      document.cookie = `${TRACK_COOKIE}=${t};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
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
