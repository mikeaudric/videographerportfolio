"use client"

import { useState } from "react"
import type { Video } from "@/data/videos"
import { durationToSeconds, formatTimecode } from "@/lib/video-utils"
import { cn } from "@/lib/utils"
import VideoThumbnail from "./VideoThumbnail"

interface TimelineProps {
  videos: Video[] // ordre chronologique
  onSelect: (video: Video) => void
}

// Séquence de montage : chaque vidéo est un clip dont la largeur suit la durée
export default function Timeline({ videos, onSelect }: TimelineProps) {
  const [active, setActive] = useState(videos.length - 1)

  const durations = videos.map((video) => durationToSeconds(video.duration))
  const total = durations.reduce((sum, d) => sum + d, 0)
  const starts = durations.map((_, i) => durations.slice(0, i).reduce((sum, d) => sum + d, 0))
  const toPercent = (seconds: number) => (seconds / total) * 100

  const playhead = toPercent(starts[active] + durations[active] / 2)
  const years = videos
    .map((video, i) => ({ year: video.publishedAt.slice(0, 4), left: toPercent(starts[i]) }))
    .filter((mark, i, all) => i === 0 || mark.year !== all[i - 1].year)

  return (
    <div className="border border-line bg-panel">
      <div className="flex justify-between gap-4 border-b border-line px-3 py-2 font-mono text-xs text-mute">
        <span className="truncate">SÉQUENCE — PORTFOLIO · {videos[active].label.toUpperCase()}</span>
        <span className="text-hot tabular-nums">{formatTimecode(starts[active])}:00</span>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[720px] grid-cols-[44px_1fr]">
          <div className="border-r border-line font-mono text-xs text-mute">
            <div className="h-6 border-b border-line" />
            <div className="flex h-[123px] items-start border-b border-line p-2.5">V1</div>
            <div className="flex h-[42px] items-start p-2.5">A1</div>
          </div>

          <div className="relative">
            <div className="relative h-6 border-b border-line font-mono text-[11px] text-mute">
              {years.map((mark) => (
                <span key={mark.year} className="absolute top-1 border-l border-line pl-1.5" style={{ left: `${mark.left}%` }}>
                  {mark.year}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px] border-b border-line px-1 py-1.5">
              {videos.map((video, i) => (
                <button
                  key={video.youtubeId}
                  onClick={() => onSelect(video)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${video.title} (${video.duration})`}
                  className={cn(
                    "group relative h-[110px] min-w-0 overflow-hidden bg-black focus-visible:outline-none",
                    i === active && "outline-2 -outline-offset-2 outline-hot"
                  )}
                  style={{ flex: `${durations[i]} 1 0` }}
                >
                  <VideoThumbnail
                    youtubeId={video.youtubeId}
                    alt=""
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-black/70 px-1.5 py-0.5 text-left font-mono text-[10px]">
                    {video.label} · {video.duration}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-[3px] px-1 py-1.5" aria-hidden>
              {videos.map((video, i) => (
                <div key={video.youtubeId} className="waveform relative h-[30px] min-w-0 bg-[#1f2a24]" style={{ flex: `${durations[i]} 1 0` }} />
              ))}
            </div>

            <div
              className="playhead pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-hot transition-[left] duration-300 ease-out"
              style={{ left: `${playhead}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
