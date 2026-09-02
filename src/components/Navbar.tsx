import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGO_URL, SITE_NAME } from '../lib/config'
import { useAuth } from '../lib/auth'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { session, signOut } = useAuth()
  const isAdmin = !!session

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (isAdmin) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-md shadow-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="flex items-center gap-3" aria-label={`${SITE_NAME} admin`}>
            <img src={LOGO_URL} alt="The ETC edit logo" className="h-12 w-12 rounded-full object-contain" />
            <span className="font-serif text-xl font-semibold tracking-tight text-cream-800 sm:text-2xl">
              {SITE_NAME} <span className="text-sm font-normal text-cream-600">Admin</span>
            </span>
          </Link>
          <button onClick={handleSignOut} className="btn-ghost">Sign out</button>
        </nav>
      </header>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label={`${SITE_NAME} home`}>
          <img src={LOGO_URL} alt="The ETC edit logo" className="h-12 w-12 rounded-full object-contain" />
          <span className="font-serif text-xl font-semibold tracking-tight text-cream-800 sm:text-2xl">
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-cream-200 text-cream-800'
                  : 'text-ink-600 hover:bg-cream-100 hover:text-cream-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="rounded-lg p-2 text-ink-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-cream-200 bg-cream-50 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-cream-200 text-cream-800'
                    : 'text-ink-600 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
