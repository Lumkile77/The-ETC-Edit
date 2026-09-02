import { useState } from 'react'
import type { Message } from '../lib/types'
import { TOPIC_LABELS } from '../lib/types'
import { INSTAGRAM_URL, FACEBOOK_URL, PINTEREST_URL, CONTACT_EMAIL } from '../lib/config'

const socials = [
  {
    name: 'Instagram',
    handle: '@themijoseph',
    url: INSTAGRAM_URL,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-[#f09433] via-[#e6683c] to-[#bc2A8D]',
    hoverBg: 'hover:bg-[#f09433]',
    hoverText: 'group-hover:text-white',
    description: 'Follow along for daily creations, behind-the-scenes, and new recipes',
    actionLabel: 'Follow on Instagram',
    actionVerb: 'Follow',
    feature: 'Photos & Stories',
    featureIcon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'thememi.joseph.2025',
    url: FACEBOOK_URL,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    gradient: 'from-[#1877F2] to-[#0a5dc7]',
    hoverBg: 'hover:bg-[#1877F2]',
    hoverText: 'group-hover:text-white',
    description: 'Stay connected for updates, events, and community posts',
    actionLabel: 'Connect on Facebook',
    actionVerb: 'Connect',
    feature: 'Posts & Events',
    featureIcon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    handle: 'themiej',
    url: PINTEREST_URL,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.491 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.739.098.119.112.224.083.345l-.333 1.36c-.053.223-.174.271-.402.165-1.495-.696-2.43-2.881-2.43-4.638 0-3.776 2.744-7.252 7.913-7.252 4.162 0 7.397 2.965 7.397 6.929 0 4.133-2.605 7.459-6.22 7.459-1.214 0-2.357-.631-2.748-1.378l-.747 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
    gradient: 'from-[#E60023] to-[#b3001b]',
    hoverBg: 'hover:bg-[#E60023]',
    hoverText: 'group-hover:text-white',
    description: 'Discover curated boards of candles, treats, and recipe inspiration',
    actionLabel: 'Explore on Pinterest',
    actionVerb: 'Explore',
    feature: 'Boards & Pins',
    featureIcon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [topic, setTopic] = useState<Message['topic']>('recipe')
  const [message, setMessage] = useState('')

  function buildMailtoLink() {
    const subject = `${TOPIC_LABELS[topic]} — from The ETC edit website`
    const body = message || ''
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cream-600">
          Get in Touch
        </p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink-800">
          Let's Connect
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-500">
          Whether you need help with a recipe, want to enquire about a candle, or
          have a custom request — reach out through any of the platforms below or
          send a message directly.
        </p>
      </div>

      {/* Social Media Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${social.gradient}`} />

            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-cream-100 text-ink-700 transition-colors duration-300 ${social.hoverBg} ${social.hoverText}`}>
                {social.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-ink-300 transition-colors duration-300 group-hover:text-cream-500">
                {social.actionVerb}
              </span>
            </div>

            <h3 className="mt-4 font-serif text-xl font-semibold text-ink-800">
              {social.name}
            </h3>
            <p className="text-sm text-cream-600">{social.handle}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              {social.description}
            </p>

            <div className="mt-5 flex items-center gap-2 border-t border-cream-100 pt-4">
              <span className="text-cream-500">{social.featureIcon}</span>
              <span className="text-xs font-medium text-ink-400">{social.feature}</span>
            </div>

            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-cream-700 opacity-0 transition-all duration-300 group-hover:opacity-100">
              {social.actionLabel}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="my-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-cream-200" />
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-cream-500">
          Or send an email
        </span>
        <div className="h-px flex-1 bg-cream-200" />
      </div>

      {/* Email Section */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-cream-700">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink-800">
              Send an email directly
            </h2>
            <p className="text-sm text-ink-500">
              Pick a topic, write your message, and your email app will open with everything ready to send.
            </p>
          </div>
        </div>

        {/* Topic selector */}
        <div className="mt-6">
          <label className="mb-3 block text-sm font-medium text-ink-700">
            What is this about?
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TOPIC_LABELS) as Message['topic'][]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  topic === t
                    ? 'bg-cream-700 text-cream-50 shadow-md'
                    : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
                }`}
              >
                {TOPIC_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Message draft */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-ink-700">
            Your message <span className="text-ink-400">(optional)</span>
          </label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field resize-none"
            placeholder="Draft your message here — it will be pre-filled in your email app..."
          />
        </div>

        {/* Email button */}
        <a
          href={buildMailtoLink()}
          className="btn-primary mt-6 w-full"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Open in Email App
        </a>

        <p className="mt-4 text-center text-xs text-ink-400">
          This will open your default email app with the subject and message pre-filled,
          addressed to {CONTACT_EMAIL}. Recipe advice is general guidance and not a
          replacement for professional medical or dietary advice.
        </p>
      </div>
    </div>
  )
}
