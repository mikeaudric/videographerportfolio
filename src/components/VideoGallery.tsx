"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/VideoCard"
import VideoDetailDialog from "@/components/VideoDetailDialog"
import type { Video, VideoFormat } from "@/data/videos"

const PAGE_SIZE = { long: 6, short: 8 } as const

const FILTERS: { format: VideoFormat; label: string }[] = [
  { format: "long", label: "Long format" },
  { format: "short", label: "Shorts & Reels" },
]

export default function VideoGallery({ videos }: { videos: Video[] }) {
  const [activeFilter, setActiveFilter] = useState<VideoFormat>("long")
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE.long)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const filteredVideos = videos.filter((video) => video.format === activeFilter)
  const hasMoreVideos = displayCount < filteredVideos.length

  const changeFilter = (format: VideoFormat) => {
    setActiveFilter(format)
    setDisplayCount(PAGE_SIZE[format])
  }

  return (
    <section id="realisations" className="space-y-8 scroll-mt-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold">Mes réalisations</h2>
        <p className="text-gray-400">Interviews, portraits de joueurs et formats courts pour les réseaux sociaux.</p>
      </div>

      <div className="flex justify-center gap-4">
        {FILTERS.map(({ format, label }) => (
          <Button
            key={format}
            onClick={() => changeFilter(format)}
            variant="filter"
            data-state={activeFilter === format ? "active" : "inactive"}
            aria-pressed={activeFilter === format}
            className="rounded-full transition-all duration-300 ease-in-out"
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        className={
          activeFilter === "short"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        }
      >
        {filteredVideos.slice(0, displayCount).map((video) => (
          <VideoCard key={video.youtubeId} video={video} onReadMore={setSelectedVideo} />
        ))}
      </div>

      {hasMoreVideos && (
        <div className="flex justify-center">
          <Button
            onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE[activeFilter])}
            variant="outline"
            className="bg-transparent text-white border border-white/20 hover:bg-blue-600 hover:text-white backdrop-blur-sm transition-colors"
          >
            En voir plus
          </Button>
        </div>
      )}

      <VideoDetailDialog
        video={selectedVideo}
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        onSelect={setSelectedVideo}
        allVideos={videos}
      />
    </section>
  )
}
