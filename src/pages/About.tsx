import { Link } from 'react-router-dom'
import { SITE_NAME, PINTEREST_URL } from '../lib/config'

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">
          The Maker
        </p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink-800">
          About {SITE_NAME}
        </h1>
      </div>

      <div className="mt-12 space-y-6 text-lg leading-relaxed text-ink-600">
        <p>
          {SITE_NAME} began as a passion for creating beautiful, personalized
          candles for weddings and celebrations, and grew to include homemade
          treats and recipes that anyone can enjoy, including those watching
          their sugar intake.
        </p>
        <p>
          Every candle is hand-poured and can be personalized with names, dates,
          or a short message, making each one a unique keepsake. The recipes
          shared here are tried, tested, and written with clear instructions so
          that anyone can recreate them at home.
        </p>
        <p>
          The work you see here is also shared on Pinterest, where you can
          follow along for new creations, recipe ideas, and inspiration.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="card p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream-200">
            <svg className="h-6 w-6 text-cream-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-semibold text-ink-800">Hand-Poured Candles</h3>
          <p className="mt-2 text-sm text-ink-500">
            Personalized for your special occasion with names and dates.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wine-100">
            <svg className="h-6 w-6 text-wine-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-semibold text-ink-800">Homemade Treats</h3>
          <p className="mt-2 text-sm text-ink-500">
            Including sugar-free and no-added-sugar indulgences.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-100">
            <svg className="h-6 w-6 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-serif text-lg font-semibold text-ink-800">Tested Recipes</h3>
          <p className="mt-2 text-sm text-ink-500">
            Clear instructions with tips and helpful advice on request.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-cream-100 p-8 text-center">
        <h3 className="font-serif text-2xl font-semibold text-ink-800">
          Follow on Pinterest
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
          See the latest creations and recipe pins as they're posted.
        </p>
        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Visit Pinterest Profile
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link to="/contact" className="btn-ghost">
          Contact &rarr;
        </Link>
      </div>
    </div>
  )
}
