"use client"

import { useState, type ReactNode } from "react"
import type { Video } from "@/data/videos"
import ContactSheet from "./ContactSheet"
import ShortsStrip from "./ShortsStrip"
import Timeline from "./Timeline"
import VideoDialog from "./VideoDialog"

interface PortfolioProps {
  videos: Video[] // du plus récent au plus ancien
}

function SectionHeader({ title, aside }: { title: string; aside: ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-line pb-2.5">
      <h2 className="font-cond text-4xl font-bold uppercase leading-[.9] md:text-5xl">{title}</h2>
      <span className="font-mono text-xs text-mute">{aside}</span>
    </div>
  )
}

export default function Portfolio({ videos }: PortfolioProps) {
  const [selected, setSelected] = useState<Video | null>(null)

  const longVideos = videos.filter((video) => video.format === "long")
  const shortVideos = videos.filter((video) => video.format === "short")

  return (
    <>
      <Timeline videos={[...longVideos].reverse()} onSelect={setSelected} />

      <section id="travaux" className="scroll-mt-20 pt-20 md:pt-24">
        <SectionHeader title="Travaux" aside={`Long format · ${longVideos.length}`} />
        <ContactSheet videos={longVideos} circledId={longVideos[0]?.youtubeId} onSelect={setSelected} />
      </section>

      <section id="shorts" className="scroll-mt-20 pt-20 md:pt-24">
        <SectionHeader title="Shorts" aside={`9:16 · ${shortVideos.length}`} />
        <ShortsStrip videos={shortVideos} onSelect={setSelected} />
      </section>

      <VideoDialog video={selected} videos={videos} onSelect={setSelected} onClose={() => setSelected(null)} />
    </>
  )
}
