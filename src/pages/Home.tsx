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
        supabase.from('creations').select('*').eq('is_featured', true).eq('is_hidden', false).order('created_at', { ascending: false }).limit(4),
        supabase.from('creations').select('*').eq('is_hidden', false).order('created_at', { ascending: false }).limit(8),
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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'creations' }, () => reloadCreations(setFeatured, setRecent))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => reloadCreations(setFeatured, setRecent))
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cream-300 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-wine-200 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cream-600 animate-fade-in">Candles &middot; Treats &middot; Recipes</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-ink-800 sm:text-6xl lg:text-7xl animate-fade-up">{SITE_NAME}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500 animate-fade-up">A showcase of personalized candles, homemade indulgences, and recipes crafted with care. Browse the collection, try a recipe, and ask if you need a hand.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
            <Link to="/gallery" className="btn-primary">Explore the Work</Link>
            <Link to="/contact" className="btn-secondary">Contact</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cream-200 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-14">
            <img src="/images/image%20copy.png" alt="The founder of The ETC Edit" className="float-right mb-6 ml-6 h-40 w-40 rounded-2xl object-cover shadow-md sm:h-52 sm:w-52" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">The story behind {SITE_NAME}</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-ink-800">My Lifestyle Audit</h2>
            <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-500">Sometimes life changes your routine and sometimes it changes you.</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
              <p className="font-serif text-2xl font-semibold text-ink-800">Retirement.</p>
              <p>After 40 years of having a structured routine, retirement brought a huge change to my life. The routine I had known for so long suddenly came to an end, and I had to find a new way of living.</p>
              <p>As I soon discovered, major lifestyle changes can affect not only your mental and emotional wellbeing, but my physical health too.</p>
              <p>I had always considered myself reasonably healthy. I exercised regularly, ate fairly well, enjoyed the occasional sweet treat and, of course, a glass or two of red wine socially.</p>
              <p>That sounds quite healthy, don't you think?</p>
              <p>Then came my routine six-monthly blood test.</p>
              <p>My <strong className="text-ink-800">HbA1c came back at 6.2%.</strong></p>
              <p>I asked my doctor whether this could be improved. His response wasn't particularly encouraging. He told me it would be very difficult.</p>
              <p>The doctor prescribed Glucophage.</p>
              <p>I was devastated. This was the last health condition I wanted to face.</p>
              <p>After a pep talk and some convincing from my husband, I reluctantly went to the pharmacy. I took one tablet the following day and didn't feel quite myself. That night, I found myself reading about the medication, what it does and its possible side effects.</p>
              <p>I'm not going to dwell on medication there is plenty of information available about that.</p>
              <p className="font-serif text-xl font-semibold text-ink-800">Instead, this was where I drew the line.</p>
              <p>I wanted to be the one in a thousand.</p>
              <p>So I decided to take a serious look at my lifestyle.</p>
              <p className="font-serif text-xl font-semibold text-ink-800">I made some big changes.</p>
              <p>I reduced my carbohydrate intake and cut out processed foods, fizzy drinks and sweets. I created a simple eating plan that suited my lifestyle.</p>
              <p>I also committed to exercising for an hour a day, five days a week.</p>
              <p>Over the next three months, I lost 10 kg and, more importantly, watched my blood sugar readings steadily improve.</p>
              <p>I monitored my blood sugar regularly and recorded my results. When my doctor saw the readings on my app, he wanted to confirm them with another blood test.</p>
              <p>And then came the moment I had been hoping for.</p>
              <p>My <strong className="text-ink-800">HbA1c was 5.2%.</strong></p>
              <p>I was thrilled.</p>
              <p>That experience taught me something I will never forget:</p>
              <p className="font-serif text-xl font-semibold text-ink-800">A lifestyle change can make a positive difference.</p>
              <p>My experience doesn't mean that lifestyle changes will have the same result for everyone. We are all different, and medical advice and treatment are important.</p>
              <p>But it showed me that making positive changes to the way we eat, move and live can be incredibly empowering.</p>
              <p className="font-serif text-xl font-semibold text-ink-800">And that is where {SITE_NAME} was born.</p>
              <p>I wanted to create a space where healthier choices don't mean giving up all the little things we enjoy.</p>
              <p>A place for simple recipes, healthier alternatives, lifestyle ideas and, yes, the occasional little indulgence.</p>
              <p>Because I believe life is about balance.</p>
              <p>You don't have to give up everything you love.</p>
              <p>Sometimes you just need to find a better way to enjoy it.</p>
              <p>And that's what {SITE_NAME} is all about.</p>
              <p className="font-serif text-xl font-semibold text-ink-800">Because life is too short to give up the sweet nothings. <span className="text-wine-600">&#10084;</span></p>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center"><p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">Curated Highlights</p><h2 className="mt-2 font-serif text-4xl font-semibold text-ink-800">Featured Creations</h2></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map((c) => <CreationCard key={c.id} creation={c} onOpen={setSelected} />)}</div>
        </section>
      )}

      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row"><div><p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">The Collection</p><h2 className="mt-2 font-serif text-4xl font-semibold text-ink-800">Recent Work</h2></div><Link to="/gallery" className="btn-ghost">View all &rarr;</Link></div>
          {loading ? <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-cream-700" /></div> : <div className="masonry">{recent.map((c) => <CreationCard key={c.id} creation={c} onOpen={setSelected} />)}</div>}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6"><h2 className="font-serif text-4xl font-semibold text-ink-800">Have a question about a recipe?</h2><p className="mx-auto mt-4 max-w-xl text-ink-500">If something didn't turn out quite right or you need advice on substitutions, send a message. Every question gets a personal reply.</p><Link to="/contact" className="btn-primary mt-8">Get in Touch</Link></section>
      <Lightbox creation={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

async function reloadCreations(setFeatured: (items: Creation[]) => void, setRecent: (items: Creation[]) => void) {
  const [{ data: feat }, { data: rec }] = await Promise.all([
    supabase.from('creations').select('*').eq('is_featured', true).eq('is_hidden', false).order('created_at', { ascending: false }).limit(4),
    supabase.from('creations').select('*').eq('is_hidden', false).order('created_at', { ascending: false }).limit(8),
  ])
  setFeatured(feat ?? [])
  setRecent(rec ?? [])
}
