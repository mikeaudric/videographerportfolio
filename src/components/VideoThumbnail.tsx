"use client"

import { useState } from "react"
import { getThumbnailUrl } from "@/lib/video-utils"
import { cn } from "@/lib/utils"

interface VideoThumbnailProps {
  youtubeId: string
  alt: string
  className?: string
}

export default function VideoThumbnail({ youtubeId, alt, className }: VideoThumbnailProps) {
  const [src, setSrc] = useState(getThumbnailUrl(youtubeId))

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("w-full h-full object-cover", className)}
      onLoad={(e) => {
        // YouTube renvoie une image grise de 120x90 quand maxresdefault n'existe pas
        if (e.currentTarget.naturalWidth <= 120) setSrc(getThumbnailUrl(youtubeId, "hqdefault"))
      }}
      onError={() => setSrc(getThumbnailUrl(youtubeId, "hqdefault"))}
    />
  )
}
