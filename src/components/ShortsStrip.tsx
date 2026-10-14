"use client"

import type { Video } from "@/data/videos"
import VideoThumbnail from "./VideoThumbnail"

interface ShortsStripProps {
  videos: Video[]
  onSelect: (video: Video) => void
}

export default function ShortsStrip({ videos, onSelect }: ShortsStripProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-9">
      {videos.map((video) => (
        <button
          key={video.youtubeId}
          onClick={() => onSelect(video)}
          aria-label={`${video.title} (${video.duration})`}
          className="group relative aspect-[9/16] overflow-hidden border-4 border-black bg-black"
        >
          <VideoThumbnail
            youtubeId={video.youtubeId}
            alt=""
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-1.5 top-1.5 bg-black/70 px-1.5 font-mono text-[10px] tabular-nums">
            {video.duration}
          </span>
        </button>
      ))}
    </div>
  )
}
