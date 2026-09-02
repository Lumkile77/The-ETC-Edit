import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Creation } from '../lib/types'
import { SITE_NAME } from '../lib/config'
import CreationCard from '../components/CreationCard'
import Lightbox from '../components/Lightbox'

export default function Home() {
  const [featured, setFeatured] = useState<Creation[]>([])
  const [recent, setRecent] = useState<Creation[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Creation | null>(null)

  useEffect(() => {
    async function load() {
      const [{ data: feat }, { data: rec }] = await Promise.all([
        supabase
          .from('creations')
          .select('*')
          .eq('is_featured', true)
          .eq('is_hidden', false)
          .order('created_at', { ascending: false })
          .limit(4),
        supabase
          .from('creations')
          .select('*')
          .eq('is_hidden', false)
          .order('created_at', { ascending: false })
          .limit(8),
      ])
      setFeatured(feat ?? [])
      setRecent(rec ?? [])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('home-creations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'creations' }, () => {
        async function reload() {
          const [{ data: feat }, { data: rec }] = await Promise.all([
            supabase.from('creations').select('*').eq('is_featured', true).eq('is_hidden', false).order('created_at', { ascending: false }).limit(4),
            supabase.from('creations').select('*').eq('is_hidden', false).order('created_at', { ascending: false }).limit(8),
          ])
          setFeatured(feat ?? [])
          setRecent(rec ?? [])
        }
        reload()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => {
        async function reload() {
          const [{ data: feat }, { data: rec }] = await Promise.all([
            supabase.from('creations').select('*').eq('is_featured', true).eq('is_hidden', false).order('created_at', { ascending: false }).limit(4),
            supabase.from('creations').select('*').eq('is_hidden', false).order('created_at', { ascending: false }).limit(8),
          ])
          setFeatured(feat ?? [])
          setRecent(rec ?? [])
        }
        reload()
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cream-300 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-wine-200 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cream-600 animate-fade-in">
            Candles &middot; Treats &middot; Recipes
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-ink-800 sm:text-6xl lg:text-7xl animate-fade-up">
            {SITE_NAME}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500 animate-fade-up">
            A showcase of personalized candles, homemade indulgences, and recipes
            crafted with care. Browse the collection, try a recipe, and ask if you
            need a hand.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
            <Link to="/gallery" className="btn-primary">
              Explore the Work
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">
              Curated Highlights
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-ink-800">
              Featured Creations
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <CreationCard key={c.id} creation={c} onOpen={setSelected} />
            ))}
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">
                The Collection
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-ink-800">
                Recent Work
              </h2>
            </div>
            <Link to="/gallery" className="btn-ghost">
              View all &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-cream-700" />
            </div>
          ) : (
            <div className="masonry">
              {recent.map((c) => (
                <CreationCard key={c.id} creation={c} onOpen={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-ink-800">
          Have a question about a recipe?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          If something didn't turn out quite right or you need advice on
          substitutions, send a message. Every question gets a personal reply.
        </p>
        <Link to="/contact" className="btn-primary mt-8">
          Get in Touch
        </Link>
      </section>

      <Lightbox creation={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
