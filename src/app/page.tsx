import ContactDialog from "@/components/ContactDialog"
import Portfolio from "@/components/Portfolio"
import { videos } from "@/data/videos"
import { SITE_INFO } from "@/lib/constants"
import { durationToSeconds, formatTimecode } from "@/lib/video-utils"

const longCount = videos.filter((video) => video.format === "long").length
const shortCount = videos.length - longCount
const totalEdited = formatTimecode(videos.reduce((sum, video) => sum + durationToSeconds(video.duration), 0))

const SERVICES = ["Interviews", "Shorts & Reels", "Portraits"]

export default function Page() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-7">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-ink/95 py-4 font-mono text-xs backdrop-blur-sm">
        <a href="#" className="uppercase">{SITE_INFO.name}</a>
        <nav className="hidden gap-6 text-mute sm:flex" aria-label="Sections">
          <a href="#travaux" className="hover:text-paper">Travaux</a>
          <a href="#shorts" className="hover:text-paper">Shorts</a>
          <a href="#services" className="hover:text-paper">Services</a>
        </nav>
        <a href="#contact" className="text-hot hover:underline">● Contact</a>
      </header>

      <main>
        <div className="flex flex-wrap items-end justify-between gap-6 pb-7 pt-10 md:pt-12">
          <h1 className="font-cond text-[clamp(52px,9vw,128px)] font-bold uppercase leading-[.82] tracking-tight">
            {SITE_INFO.name}
            <br />
            <span className="text-mute">{SITE_INFO.role}</span>
          </h1>
          <p className="font-mono text-xs leading-relaxed text-mute sm:text-right">
            <span className="text-paper">Interviews · Portraits · Shorts</span>
            <br />
            {longCount} films — {shortCount} shorts — {totalEdited}
          </p>
        </div>

        <Portfolio videos={videos} />

        <section id="services" className="scroll-mt-20 pt-20 md:pt-24">
          <h2 className="sr-only">Services</h2>
          <ul className="grid gap-2.5 md:grid-cols-3">
            {SERVICES.map((service, i) => (
              <li key={service} className="flex items-baseline justify-between bg-panel p-5">
                <span className="font-cond text-2xl font-bold uppercase">{service}</span>
                <span className="font-mono text-xs text-mute">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mt-28 flex flex-wrap items-end justify-between gap-6 border-t border-line pb-6 pt-10">
        <div>
          <p className="mb-4 font-mono text-xs text-mute">Un projet ?</p>
          <a
            href="#contact"
            className="border-b-[3px] border-hot font-cond text-[clamp(30px,5vw,64px)] font-bold uppercase leading-[.95] hover:text-hot"
          >
            {SITE_INFO.email}
          </a>
        </div>
        <p className="font-mono text-xs text-mute">
          <a href={SITE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
          {" · "}
          <a href={SITE_INFO.x} target="_blank" rel="noopener noreferrer" className="hover:text-paper">X</a>
          {` — © ${SITE_INFO.currentYear}`}
        </p>
      </footer>

      <ContactDialog />
    </div>
  )
}
