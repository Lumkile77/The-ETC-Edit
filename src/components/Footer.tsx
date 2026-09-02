import { Link } from 'react-router-dom'
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PINTEREST_URL,
  SITE_NAME,
} from '../lib/config'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cream-200 bg-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-cream-800">
              {SITE_NAME}
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Personalized candles, homemade indulgences, and recipes made with care.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/admin/login"
                className="inline-flex text-sm font-medium text-cream-700 underline-offset-4 transition-colors hover:text-cream-900 hover:underline"
              >
                Admin view
              </Link>
              <Link
                to="/admin/manual"
                className="inline-flex text-sm font-medium text-cream-700 underline-offset-4 transition-colors hover:text-cream-900 hover:underline"
              >
                Admin manual
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
              Explore
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/gallery" className="text-ink-600 hover:text-cream-700">Gallery</Link></li>
              <li><Link to="/about" className="text-ink-600 hover:text-cream-700">About</Link></li>
              <li><Link to="/contact" className="text-ink-600 hover:text-cream-700">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
              Follow
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-600 hover:text-cream-700"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-600 hover:text-cream-700"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={PINTEREST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-600 hover:text-cream-700"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.491 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.739.098.119.112.224.083.345l-.333 1.36c-.053.223-.174.271-.402.165-1.495-.696-2.43-2.881-2.43-4.638 0-3.776 2.744-7.252 7.913-7.252 4.162 0 7.397 2.965 7.397 6.929 0 4.133-2.605 7.459-6.22 7.459-1.214 0-2.357-.631-2.748-1.378l-.747 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                  Pinterest
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-600 hover:text-cream-700">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-cream-200 pt-6 text-center text-xs text-ink-400">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
