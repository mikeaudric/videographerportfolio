"use client"

import type { Video } from "@/data/videos"
import VideoThumbnail from "./VideoThumbnail"

interface ContactSheetProps {
  videos: Video[]
  circledId?: string // la prise « entourée au crayon »
  onSelect: (video: Video) => void
}

export default function ContactSheet({ videos, circledId, onSelect }: ContactSheetProps) {
  return (
    <div className="bg-panel px-3.5 pb-4 pt-3">
      <div className="film-perfs mb-2" />
      <div className="grid grid-cols-1 gap-x-2.5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <button key={video.youtubeId} onClick={() => onSelect(video)} className="group relative text-left">
            <div className="aspect-video overflow-hidden border-[5px] border-black bg-black">
              <VideoThumbnail
                youtubeId={video.youtubeId}
                alt={video.title}
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex justify-between gap-3 px-0.5 pt-1.5 font-mono text-[11px] text-[#c9c5bc]">
              <span className="truncate group-hover:text-paper">
                {video.label}
                {video.subtitle && ` — ${video.subtitle}`}
              </span>
              <span className="flex-none text-amber tabular-nums">{video.duration}</span>
            </div>

            {video.youtubeId === circledId && (
              <>
                <svg
                  aria-hidden
                  viewBox="0 0 100 70"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -left-3.5 -top-3.5 h-[calc(100%+10px)] w-[calc(100%+28px)] overflow-visible"
                >
                  <path
                    d="M8,38 C6,14 40,3 66,6 C90,9 99,28 95,46 C91,64 58,70 32,66 C10,62 2,48 9,30 C12,22 20,15 30,11"
                    fill="none"
                    stroke="var(--color-hot)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="absolute -right-1 -top-6 hidden -rotate-[4deg] font-mono text-[13px] text-hot sm:block">
                  {video.resolution} ✓
                </span>
              </>
            )}
          </button>
        ))}
      </div>
      <div className="film-perfs mt-3" />
    </div>
  )
}
