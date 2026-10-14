"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { SITE_INFO } from "@/lib/constants"

const fieldClass =
  "w-full border border-line bg-ink px-3 py-2.5 text-paper placeholder:text-mute focus:border-hot focus:outline-none transition-colors"

// S'ouvre depuis n'importe quel lien vers "#contact"
export default function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") setIsOpen(true)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open && window.location.hash === "#contact") {
      history.replaceState(null, "", window.location.pathname)
    }
  }

  // Pas de backend : on prépare l'email dans la messagerie du visiteur
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name"))
    const subject = `Projet vidéo — ${name}`
    const body = `${data.get("message")}\n\n${name}\n${data.get("email")}`
    window.location.href = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95vw] max-w-xl gap-6 rounded-none border-line bg-panel p-6 sm:rounded-none md:p-8">
        <div className="space-y-2">
          <DialogTitle className="font-cond text-4xl font-bold uppercase leading-none">Un projet ?</DialogTitle>
          <DialogDescription className="font-mono text-xs text-mute">
            Format, durée, délai. Ou directement :{" "}
            <a href={`mailto:${SITE_INFO.email}`} className="text-hot hover:underline">
              {SITE_INFO.email}
            </a>
          </DialogDescription>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input name="name" required autoComplete="name" className={fieldClass} placeholder="Nom" aria-label="Nom" />
          <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="Email" aria-label="Email" />
          <textarea name="message" required rows={5} className={`${fieldClass} min-h-[120px]`} placeholder="Votre projet" aria-label="Votre projet" />
          <button
            type="submit"
            className="w-full bg-hot py-3 font-cond text-lg font-bold uppercase tracking-wide text-ink transition-colors hover:bg-paper"
          >
            Envoyer
          </button>
          <p className="text-center font-mono text-[11px] text-mute">Votre messagerie s&apos;ouvre avec le message pré-rempli.</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
