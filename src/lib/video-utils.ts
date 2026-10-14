import type { Video } from "@/data/videos"

export type ThumbnailQuality = "maxresdefault" | "hqdefault"

// maxresdefault n'existe pas pour toutes les vidéos : prévoir hqdefault en repli (toujours disponible)
export const getThumbnailUrl = (youtubeId: string, quality: ThumbnailQuality = "maxresdefault"): string =>
  `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`

export const getEmbedUrl = (youtubeId: string): string => `https://www.youtube.com/embed/${youtubeId}`

export const getWatchUrl = (video: Video): string =>
  video.format === "short"
    ? `https://www.youtube.com/shorts/${video.youtubeId}`
    : `https://www.youtube.com/watch?v=${video.youtubeId}`

// "1:03:34" ou "7:54" -> secondes
export const durationToSeconds = (duration: string): number =>
  duration.split(":").reduce((total, part) => total * 60 + Number(part), 0)

// 16240 -> "04:31:00" (tronqué, jamais arrondi au-dessus)
export const formatTimecode = (seconds: number): string => {
  const total = Math.floor(seconds)
  const parts = [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60]
  return parts.map((part) => String(part).padStart(2, "0")).join(":")
}

// "2025-04-01" -> "avril 2025"
export const formatMonth = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
