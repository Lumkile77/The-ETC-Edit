import { useState, FormEvent, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { SITE_NAME } from '../../lib/config'

const QUICK_USER = 'themiej@gmail.com'
const QUICK_PASS = 'SweetNothingsAdmin!2026'

export default function AdminLogin() {
  const { signIn, session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [quickHint, setQuickHint] = useState(false)
  const pwRef = useRef<HTMLInputElement>(null)

  if (session) {
    navigate('/admin')
  }

  async function doSignIn(em: string, pw: string) {
    setLoading(true)
    setError('')
    const { error } = await signIn(em, pw)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setEmail(val)
    if (val.toUpperCase() === 'T') {
      setQuickHint(true)
      setEmail(QUICK_USER)
      setPassword(QUICK_PASS)
      pwRef.current?.focus()
    } else {
      setQuickHint(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    doSignIn(email, password)
  }

  async function handleQuickLogin() {
    setEmail(QUICK_USER)
    setPassword(QUICK_PASS)
    doSignIn(QUICK_USER, QUICK_PASS)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link to="/" className="font-serif text-3xl font-semibold text-cream-800">
            {SITE_NAME}
          </Link>
          <p className="mt-2 text-sm text-ink-500">Admin sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-white p-8 shadow-md">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="input-field"
              placeholder="you@example.com"
            />
            {quickHint && (
              <p className="mt-1 text-xs text-cream-600">Quick fill enabled — just press Sign In.</p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-700">Password</label>
            <input
              ref={pwRef}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-wine-300 bg-wine-50 p-3 text-sm text-wine-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={loading}
              className="text-sm font-medium text-cream-700 underline-offset-4 transition-colors hover:text-cream-900 hover:underline disabled:opacity-60"
            >
              Quick sign in (T)
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-ink-400 hover:text-cream-700">
            &larr; Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}
