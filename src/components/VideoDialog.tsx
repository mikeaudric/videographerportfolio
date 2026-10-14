"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { Video } from "@/data/videos"
import { formatMonth, getEmbedUrl, getWatchUrl } from "@/lib/video-utils"
import { cn } from "@/lib/utils"
import VideoThumbnail from "./VideoThumbnail"

interface VideoDialogProps {
  video: Video | null
  videos: Video[]
  onSelect: (video: Video) => void
  onClose: () => void
}

export default function VideoDialog({ video, videos, onSelect, onClose }: VideoDialogProps) {
  if (!video) return null

  const isShort = video.format === "short"
  const related = videos.filter((v) => v.format === video.format && v.youtubeId !== video.youtubeId).slice(0, isShort ? 6 : 4)

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-5xl gap-0 overflow-y-auto rounded-none border-line bg-panel p-0 sm:rounded-none">
        <div className={cn("grid gap-0", isShort ? "md:grid-cols-[minmax(0,340px)_1fr]" : "grid-cols-1")}>
          <div className={cn("bg-black", isShort ? "mx-auto aspect-[9/16] w-full max-w-[340px]" : "aspect-video")}>
            <iframe
              key={video.youtubeId}
              className="h-full w-full"
              src={`${getEmbedUrl(video.youtubeId)}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-4 p-5 md:p-6">
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-mute">
              <span className="text-amber tabular-nums">{video.duration}</span>
              <span>{video.resolution}</span>
              <span>{formatMonth(video.publishedAt)}</span>
              <a href={getWatchUrl(video)} target="_blank" rel="noopener noreferrer" className="text-hot hover:underline">
                Voir sur YouTube ↗
              </a>
            </div>
            <DialogTitle className="font-cond text-2xl font-bold uppercase leading-none md:text-3xl">{video.title}</DialogTitle>
            {video.description ? (
              <DialogDescription className="max-w-3xl text-sm leading-relaxed text-[#c9c5bc]">{video.description}</DialogDescription>
            ) : (
              <DialogDescription className="sr-only">{video.title}</DialogDescription>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="border-t border-line p-5 md:p-6">
            <p className="mb-3 font-mono text-xs text-mute">ENCHAÎNER AVEC</p>
            <div className={cn("grid gap-2", isShort ? "grid-cols-3 md:grid-cols-6" : "grid-cols-2 md:grid-cols-4")}>
              {related.map((v) => (
                <button key={v.youtubeId} onClick={() => onSelect(v)} className="group text-left">
                  <div className={cn("overflow-hidden border-4 border-black bg-black", isShort ? "aspect-[9/16]" : "aspect-video")}>
                    <VideoThumbnail youtubeId={v.youtubeId} alt="" className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  {!isShort && <p className="truncate pt-1 font-mono text-[11px] text-mute group-hover:text-paper">{v.label}</p>}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
