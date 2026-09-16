import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export function Footer() {
  const location = useLocation()
  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/verify')) {
    return null
  }

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Authentify
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Identity verification built for Nigeria and the world. NIN, BVN, documents, biometrics, and AML — one API.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/#products" className="hover:text-fg">ID Verification</Link></li>
            <li><Link to="/#products" className="hover:text-fg">Biometric Liveness</Link></li>
            <li><Link to="/#products" className="hover:text-fg">AML Screening</Link></li>
            <li><Link to="/verify" className="hover:text-fg">Live demo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Developers</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/docs" className="hover:text-fg">API Reference</Link></li>
            <li><Link to="/dashboard" className="hover:text-fg">Dashboard</Link></li>
            <li><Link to="/admin" className="hover:text-fg">Admin Panel</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Coverage</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>🇳🇬 Nigeria (NIN, BVN, PVC…)</li>
            <li>🌍 150+ countries</li>
            <li>SOC 2 · NDPR · GDPR ready</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-subtle">
        © {new Date().getFullYear()} Authentify · Identity infrastructure for Africa & beyond
      </div>
    </footer>
  )
}
