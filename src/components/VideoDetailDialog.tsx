// VideoDetailDialog.tsx
"use client"

import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog"
import type { Video } from "@/data/videos"
import VideoDetailContent from "./VideoDetailContent"

interface VideoDetailDialogProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onSelect: (video: Video) => void
  allVideos: Video[]
}

export default function VideoDetailDialog({ 
  video, 
  isOpen, 
  onClose, 
  onSelect,
  allVideos 
}: VideoDetailDialogProps) {
  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-[85vw] w-[1600px] h-[85vh] p-0 bg-black/95 shadow-2xl overflow-y-auto">
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        
        <VideoDetailContent
          video={video}
          onClose={onClose}
          onSelect={onSelect}
          relatedVideos={allVideos}
          variant="dialog"
          className="h-full"
        />
      </DialogContent>
    </Dialog>
  )
}

