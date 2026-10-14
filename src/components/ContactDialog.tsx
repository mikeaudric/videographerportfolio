"use client"

import { useEffect, useState, type FormEvent } from "react"
import { MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { SITE_INFO } from "@/lib/constants"

const inputClass =
  "w-full p-3 rounded bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"

// S'ouvre via le bouton flottant ou n'importe quel lien vers "#contact"
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Contactez-moi"
        className="fixed bottom-4 right-4 flex items-center gap-2 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 z-50"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Contactez-moi</span>
      </button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-[#1C2331] border-white/10 text-white max-w-[95vw] sm:max-w-2xl p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold text-white">Parlons de votre projet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Décrivez votre vidéo (format, durée, délai) et je vous réponds rapidement. Vous pouvez aussi m&apos;écrire
                directement à{" "}
                <a href={`mailto:${SITE_INFO.email}`} className="text-blue-400 hover:underline">
                  {SITE_INFO.email}
                </a>
                .
              </DialogDescription>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="name" required autoComplete="name" className={inputClass} placeholder="Votre nom" aria-label="Votre nom" />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="Votre email"
                aria-label="Votre email"
              />
              <textarea
                name="message"
                required
                rows={5}
                className={`${inputClass} min-h-[120px]`}
                placeholder="Votre message"
                aria-label="Votre message"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1C2331]"
              >
                Envoyer le message
              </button>
              <p className="text-xs text-gray-500 text-center">Votre messagerie s&apos;ouvrira avec le message pré-rempli.</p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
