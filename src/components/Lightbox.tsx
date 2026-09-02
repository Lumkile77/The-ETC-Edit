import { useEffect } from 'react'
import type { Creation } from '../lib/types'

export default function Lightbox({
  creation,
  onClose,
}: {
  creation: Creation | null
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (creation) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [creation, onClose])

  if (!creation) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/80 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-cream-50 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-cream-50/80 p-2 text-ink-700 backdrop-blur transition-colors hover:bg-cream-100"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={creation.image_url}
          alt={creation.title}
          className="w-full object-contain"
        />
        <div className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-ink-800">{creation.title}</h2>
          {creation.description && (
            <p className="mt-2 text-ink-600">{creation.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
