'use client'

import { TRACKS, TRACK_META } from '@/lib/track'
import { useTrack } from '@/components/track-provider'
import { cn } from '@/lib/utils'

const TRACK_COLORS: Record<string, string> = {
  hydro: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  ai: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  devtools: 'bg-green-500/20 text-green-400 border-green-500/40',
  indie: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
}

const TRACK_ACTIVE_COLORS: Record<string, string> = {
  hydro: 'bg-blue-500 text-white border-blue-500',
  ai: 'bg-purple-500 text-white border-purple-500',
  devtools: 'bg-green-500 text-white border-green-500',
  indie: 'bg-orange-500 text-white border-orange-500',
}

export function TrackSwitcher({ className }: { className?: string }) {
  const { track, setTrack } = useTrack()

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {TRACKS.map((t) => (
        <button
          key={t}
          onClick={() => setTrack(t)}
          className={cn(
            'px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-200',
            track === t
              ? TRACK_ACTIVE_COLORS[t]
              : cn(TRACK_COLORS[t], 'hover:opacity-80')
          )}
        >
          {TRACK_META[t].label}
        </button>
      ))}
    </div>
  )
}
