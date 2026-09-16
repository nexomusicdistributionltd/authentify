import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShieldCheck } from 'lucide-react'
import { cn } from '../lib/utils'

const links = [
  { to: '/#products', label: 'Products' },
  { to: '/#coverage', label: 'Coverage' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/docs', label: 'API Docs' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isApp = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')

  if (isApp) return null

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg shadow-black/20">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              Authentify
              <span className="ml-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                NG
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/verify"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-bg transition hover:bg-primary-glow"
            >
              Try verification
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-fg',
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/verify"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-semibold text-bg"
            >
              Try verification
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
