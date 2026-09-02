import { Link } from 'react-router-dom'
import type { Creation } from '../lib/types'

const categoryStyles: Record<string, string> = {
  candle: 'bg-cream-200 text-cream-800',
  treat: 'bg-wine-100 text-wine-700',
  recipe: 'bg-ink-100 text-ink-600',
}

const categoryLabels: Record<string, string> = {
  candle: 'Candle',
  treat: 'Treat',
  recipe: 'Recipe',
}

export default function CreationCard({
  creation,
  onOpen,
}: {
  creation: Creation
  onOpen?: (c: Creation) => void
}) {
  return (
    <div className="masonry-item group cursor-pointer" onClick={() => onOpen?.(creation)}>
      <div className="card overflow-hidden hover:shadow-xl">
        <div className="relative overflow-hidden">
          <img
            src={creation.image_url}
            alt={creation.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[creation.category]}`}>
              {categoryLabels[creation.category]}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-ink-800 group-hover:text-cream-700">
            {creation.title}
          </h3>
          {creation.description && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-500">{creation.description}</p>
          )}
          {creation.recipe_id && (
            <Link
              to={`/recipe/${creation.recipe_id}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-block text-xs font-medium text-cream-700 hover:text-cream-800 hover:underline"
            >
              View recipe &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
