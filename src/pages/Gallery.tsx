import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Creation } from '../lib/types'
import CreationCard from '../components/CreationCard'
import Lightbox from '../components/Lightbox'

type Filter = 'all' | 'candle' | 'treat' | 'recipe'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'candle', label: 'Candles' },
  { key: 'treat', label: 'Treats' },
  { key: 'recipe', label: 'Recipes' },
]

export default function Gallery() {
  const [creations, setCreations] = useState<Creation[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Creation | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    let q = supabase
      .from('creations')
      .select('*')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      q = q.eq('category', filter)
    }

    const { data } = await q
    setCreations(data ?? [])
    setLoading(false)
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const channel = supabase
      .channel('creations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'creations' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load])

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">
          The Collection
        </p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink-800">
          Gallery
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          Browse candles, treats, and recipes. Click any piece to see it up close.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? 'bg-cream-700 text-cream-50 shadow-md'
                : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-cream-700" />
        </div>
      ) : creations.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <p className="text-lg text-ink-400">No items in this category yet.</p>
          <p className="mt-2 text-sm text-ink-300">Check back soon for new creations.</p>
        </div>
      ) : (
        <div className="masonry">
          {creations.map((c) => (
            <CreationCard key={c.id} creation={c} onOpen={setSelected} />
          ))}
        </div>
      )}

      <Lightbox creation={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
