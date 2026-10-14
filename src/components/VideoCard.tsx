"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import type { Video } from "@/data/videos"
import { getEmbedUrl } from "@/lib/video-utils"
import { cn } from "@/lib/utils"
import VideoThumbnail from "./VideoThumbnail"

interface VideoCardProps {
  video: Video
  onReadMore?: (video: Video) => void
  isCarousel?: boolean // Affichage compact dans le carousel des vidéos similaires
}

export default function VideoCard({ video, onReadMore, isCarousel = false }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isShort = video.format === "short"

  return (
    <div className={cn("relative group/card", isShort && !isCarousel && "max-w-[360px] w-full mx-auto", !isCarousel && "space-y-3")}>
      <div className={cn("relative overflow-hidden rounded-lg bg-white/5", isShort ? "aspect-[9/16]" : "aspect-video")}>
        {!isPlaying ? (
          <div className="relative w-full h-full group">
            <VideoThumbnail
              youtubeId={video.youtubeId}
              alt={video.title}
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <button
              // Dans le carousel, on ouvre la vidéo dans le lecteur principal plutôt qu'en miniature
              onClick={() => (isCarousel && onReadMore ? onReadMore(video) : setIsPlaying(true))}
              aria-label={`Lire la vidéo : ${video.title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/30 group-hover:bg-blue-600/80 transition-colors">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </button>
            <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
              {video.duration}
            </div>
            {isCarousel && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent px-2 py-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white truncate">{video.title}</p>
              </div>
            )}
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`${getEmbedUrl(video.youtubeId)}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {!isCarousel && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold leading-tight text-white/95">{video.title}</h3>
          {video.description && (
            <button
              onClick={() => onReadMore?.(video)}
              className="block text-left text-sm text-gray-400 group/desc"
            >
              <span className="line-clamp-2">{video.description}</span>
              <span className="text-blue-500 group-hover/desc:underline">en lire plus</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
