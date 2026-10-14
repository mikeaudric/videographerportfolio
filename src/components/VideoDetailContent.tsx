"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Video } from "@/data/videos"
import { getEmbedUrl, getWatchUrl } from "@/lib/video-utils"
import VideoCard from "./VideoCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface VideoDetailContentProps {
  video: Video
  onClose: () => void
  onSelect?: (video: Video) => void
  relatedVideos: Video[]
  variant: "dialog" | "modal"
  className?: string
}

export default function VideoDetailContent({ 
  video, 
  onClose, 
  onSelect,
  relatedVideos,
  variant,
  className 
}: VideoDetailContentProps) {
  const isShort = video.format === "short"
  const filteredRelatedVideos = relatedVideos
    .filter((v) => v.format === video.format && v.youtubeId !== video.youtubeId)
    .slice(0, 6)

  return (
    <div className={cn("w-full px-4 md:px-10", className)}>
      {/* Header avec bouton de fermeture */}
      <div className={cn(
        "flex items-center justify-end",
        variant === "dialog" ? "sticky top-2 z-50 p-2 bg-gradient-to-b from-black/80 to-transparent" :
        "mb-4 flex items-center justify-between"
      )}>
        {variant === "modal" && (
          <h2 className="text-2xl font-bold text-white">{video.title}</h2>
        )}
        <button
          onClick={onClose}
          className={cn(
            variant === "dialog" 
              ? "rounded-full p-2 bg-blue-600 hover:bg-red-600 transition-colors w-8 h-8 flex items-center justify-center shadow-lg hover:-translate-y-2"
              : "rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          )}
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Video Container */}
        <div className={cn(
          "relative bg-black rounded-lg overflow-hidden",
          isShort ? "aspect-[9/16] w-full max-w-[360px] mx-auto md:mx-0 md:w-[30%]" : "aspect-video md:w-[55%]",
          "" // Cette classe contrôle la largeur du bloc vidéo
        )}>
          <iframe
            className="absolute inset-0 w-full h-full"// Ces classes contrôlent les dimensions de l'iframe
            src={getEmbedUrl(video.youtubeId)}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        </div>

        {/* Description Container */}
        <div className={cn(
          isShort ? "md:flex-1" : "md:w-[40%]",
          "flex items-center justify-center md:ml-4" // [] Cette classe contrôle la largeur du bloc description md:ml-4
        )}>
          <div className="relative w-full h-[80%] space-y-4 bg-white/5 p-5 rounded-lg backdrop-blur-md border border-white/10">
            <div className="absolute -inset-1 blur-lg bg-blue-600/20 rounded-lg" />
            <h2 className="text-xl font-bold text-white relative">{video.title}</h2>
            <div className="flex items-center gap-2 text-white/95 relative">
              <span className="text-sm">{video.duration}</span>
              <span>•</span>
              <a href={getWatchUrl(video)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                Voir sur YouTube
              </a>
            </div>
            <div className="overflow-y-auto max-h-[calc(100%-7rem)] relative">
              <p className="text-white/80 leading-relaxed">{video.description}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Related Videos Section */}
      {filteredRelatedVideos.length > 0 && (
      <div className={cn(
        "space-y-2 mt-8", // Réduit l'espace entre la vidéo principale et la section
        variant === "dialog" ? "mb-4" : "mt-8"
      )}>
        <div className="flex justify-start mb-4"> {/* Réduit l'espace sous le titre */}
          <div className={cn("relative")}>
            {variant === "dialog" && (
              <div className="absolute -inset-1 bg-blue-600/50 blur-xl rounded-lg" />
            )}
            <h3 className={cn(
              variant === "dialog" 
                ? "relative text-lg font-bold text-white/95 pr-4" 
                : "text-xl font-semibold text-white"
            )}>
              {variant === "dialog" ? "Vidéos similaires" : "Autres vidéos"}
            </h3>
          </div>
        </div>

        <div className="relative py-2"> {/* Ajout de padding vertical pour l'espacement */}
          <div className="absolute -inset-1 bg-blue-500/5 blur-2xl rounded-lg" />
          <div className="relative bg-black/10 backdrop-blur-sm rounded-lg border border-white/5">
            <div className="px-3 py-2"> {/* Ajustement des marges intérieures */}
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                  containScroll: "trimSnaps"
                }}
                className="w-full relative"
              >
                <CarouselContent className="-ml-3"> {/* Ajustement de la marge négative */}
                  {filteredRelatedVideos.map((relatedVideo) => (
                    <CarouselItem
                      key={relatedVideo.youtubeId}
                      className={cn("pl-3 h-auto", isShort ? "basis-1/3 md:basis-[15%]" : "basis-2/3 md:basis-[25%]")} // Ajustement de la taille et de l'espacement
                    >
                      <div className="scale-100"> {/* Réduction de la taille des cartes de 10% */}
                        <VideoCard
                          video={relatedVideo}
                          onReadMore={onSelect}
                          isCarousel={true}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20">
                  <CarouselPrevious className="h-8 w-8 bg-blue-600 border-none hover:bg-blue-700" />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <CarouselNext className="h-8 w-8 bg-blue-600 border-none hover:bg-blue-700" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}