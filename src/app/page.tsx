import Image from "next/image"
import ContactDialog from "@/components/ContactDialog"
import VideoGallery from "@/components/VideoGallery"
import VideoThumbnail from "@/components/VideoThumbnail"
import WaveText from "@/components/WaveText"
import { videos } from "@/data/videos"
import { SITE_INFO } from "@/lib/constants"
import { durationToSeconds } from "@/lib/video-utils"

const longVideos = videos.filter((video) => video.format === "long")
const shortVideos = videos.filter((video) => video.format === "short")
const totalHours = Math.round(videos.reduce((sum, video) => sum + durationToSeconds(video.duration), 0) / 3600)
const featured = longVideos[0]

const STATS = [
  { value: longVideos.length, label: "interviews longues" },
  { value: shortVideos.length, label: "formats courts" },
  { value: `${totalHours} h+`, label: "de contenu monté" },
]

const SERVICES = [
  { title: "Interviews & podcasts", text: "Montage multicaméra, rythme, habillage et sous-titres pour YouTube." },
  { title: "Shorts & Reels", text: "Extraits verticaux percutants pour TikTok, Instagram et YouTube Shorts." },
  { title: "Portraits & documentaires", text: "Raconter un parcours, une équipe, un projet, jusqu'à la 4K." },
]

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Grille de fond avec fondu */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 0%, transparent 90%, black 100%),
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 1px, transparent 1px)
          `,
          backgroundColor: "#000000",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="bg-[#1C2331] p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <a href={`mailto:${SITE_INFO.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {SITE_INFO.email}
                </a>
                <div className="text-2xl font-bold">
                  <WaveText text={SITE_INFO.name} />
                </div>
              </div>
              <nav className="flex gap-4" aria-label="Réseaux sociaux">
                <a href={SITE_INFO.instagram} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/icons/Instagram_Glyph_Gradient.png"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </a>
                <a href={SITE_INFO.x} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/icons/X-white.png"
                    alt="X (Twitter)"
                    width={20}
                    height={20}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 space-y-20">
          {/* Accroche */}
          <section className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-blue-400 font-semibold tracking-wide uppercase text-sm">{SITE_INFO.role}</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Je transforme vos rushs en vidéos qui{" "}
                <span className="bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">
                  captivent jusqu&apos;à la fin
                </span>
                .
              </h1>
              <p className="text-lg text-gray-300">
                Interviews, portraits de joueurs, formats courts : je monte des contenus YouTube et réseaux sociaux,
                notamment pour la scène esport au Bénin et au Togo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition-colors"
                >
                  Me confier un projet
                </a>
                <a
                  href="#realisations"
                  className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 font-semibold transition-colors"
                >
                  Voir mes réalisations
                </a>
              </div>
              <dl className="grid grid-cols-3 gap-4 pt-4 max-w-md">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-3xl font-bold">{stat.value}</dd>
                    <dd className="text-sm text-gray-400">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href="#realisations"
              className="relative block group"
              aria-label={`Dernière réalisation : ${featured.title}`}
            >
              <div className="absolute -inset-2 bg-blue-500/20 blur-2xl rounded-xl" />
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <VideoThumbnail
                  youtubeId={featured.youtubeId}
                  alt={featured.title}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <p className="text-xs uppercase tracking-wide text-blue-300">Dernière réalisation</p>
                  <p className="font-semibold">{featured.title}</p>
                </div>
              </div>
            </a>
          </section>

          <VideoGallery videos={videos} />

          {/* Services */}
          <section className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Ce que je propose</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <div key={service.title} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-2">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-gray-400">{service.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* À propos */}
          <section className="relative">
            <div className="absolute -inset-0.5 bg-blue-500/20 blur-2xl rounded-lg" />
            <div className="absolute -inset-1 bg-white/10 blur-xl rounded-lg" />

            <div className="relative bg-gradient-to-b from-[#1C2331]/80 to-black/60 backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-[0_0_50px_0_rgba(28,35,49,0.6)]">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-100 to-blue-900 bg-clip-text text-transparent">
                En ce qui me concerne...
              </h2>

              <p className="text-xl leading-relaxed text-gray-200">
                Je suis monteur vidéo avec un peu plus de deux ans d&apos;expérience. J&apos;ai commencé par passion, pour
                développer ma créativité, et j&apos;ai travaillé sur plusieurs types de contenus pour les réseaux sociaux
                (YouTube, Instagram, TikTok) dans des univers variés : gaming et esport, soirées, robotique,
                développement personnel. J&apos;apporte créativité et professionnalisme pour sublimer vos vidéos, et je
                cherche toujours à faire mieux.
              </p>
              <a
                href="#contact"
                className="inline-block mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition-colors"
              >
                Travaillons ensemble
              </a>
            </div>
          </section>
        </main>

        <footer className="w-full bg-black border-t border-white/10 mt-20">
          <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <a href={`mailto:${SITE_INFO.email}`} className="text-xl font-semibold hover:text-blue-400 transition-colors">
                {SITE_INFO.email}
              </a>
              <p className="text-sm text-gray-400">
                © {SITE_INFO.currentYear} {SITE_INFO.name} — {SITE_INFO.role}
              </p>
            </div>
          </div>
        </footer>
      </div>

      <ContactDialog />
    </div>
  )
}
