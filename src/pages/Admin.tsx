import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  ArrowLeft,
  Users,
  Building2,
  Activity,
  Flag,
  Server,
  Search,
} from 'lucide-react'
import { adminUsers, tenants, sessions, dashboardStats } from '../data/mockData'
import { formatNumber, cn } from '../lib/utils'

type Tab = 'tenants' | 'users' | 'flags' | 'system'

export function Admin() {
  const [tab, setTab] = useState<Tab>('tenants')
  const [q, setQ] = useState('')

  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted hover:text-fg">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Authentify Admin
            </div>
          </div>
          <Link to="/dashboard" className="text-sm text-muted hover:text-fg">
            Commercial panel →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { label: 'Platform verifications', value: formatNumber(dashboardStats.totalVerifications), icon: Activity },
            { label: 'Active tenants', value: String(tenants.filter((t) => t.status === 'active').length), icon: Building2 },
            { label: 'Review queue', value: String(dashboardStats.reviewQueue), icon: Flag },
            { label: 'AML flags today', value: String(dashboardStats.amlFlags), icon: Server },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between text-xs text-muted">
                {s.label}
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-3">
          {(
            [
              { id: 'tenants' as Tab, label: 'Tenants', icon: Building2 },
              { id: 'users' as Tab, label: 'Team', icon: Users },
              { id: 'flags' as Tab, label: 'Risk flags', icon: Flag },
              { id: 'system' as Tab, label: 'System', icon: Server },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition',
                tab === t.id ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-surface hover:text-fg',
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === 'tenants' && (
            <div className="space-y-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search tenants…"
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-subtle">
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 font-medium">Tenant</th>
                      <th className="px-4 py-3 font-medium">Plan</th>
                      <th className="px-4 py-3 font-medium">Verifications</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTenants.map((t) => (
                      <tr key={t.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium">{t.name}</td>
                        <td className="px-4 py-3 text-muted">{t.plan}</td>
                        <td className="px-4 py-3">{formatNumber(t.verifications)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize',
                              t.status === 'active'
                                ? 'bg-primary/15 text-primary'
                                : 'bg-warning/15 text-warning',
                            )}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="space-y-3">
              {adminUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
                >
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-muted">{u.email}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-muted">{u.role}</div>
                    <div className="text-xs text-subtle">{u.lastActive}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'flags' && (
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-subtle">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">Session</th>
                    <th className="px-4 py-3 font-medium">Applicant</th>
                    <th className="px-4 py-3 font-medium">Risk</th>
                    <th className="px-4 py-3 font-medium">AML</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions
                    .filter((s) => s.riskScore > 40 || s.amlHit || s.status === 'review')
                    .map((s) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
                        <td className="px-4 py-3">
                          {s.flag} {s.applicant}
                        </td>
                        <td className="px-4 py-3 font-medium text-warning">{s.riskScore}</td>
                        <td className="px-4 py-3">{s.amlHit ? 'Hit' : 'Clear'}</td>
                        <td className="px-4 py-3 capitalize text-muted">{s.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'system' && (
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'NIN provider', status: 'Operational', latency: '1.2s' },
                { name: 'BVN provider', status: 'Operational', latency: '0.9s' },
                { name: 'Document AI', status: 'Operational', latency: '2.4s' },
                { name: 'Liveness engine', status: 'Operational', latency: '1.1s' },
                { name: 'AML screening', status: 'Degraded', latency: '3.8s' },
                { name: 'Webhook delivery', status: 'Operational', latency: '120ms' },
              ].map((svc) => (
                <div key={svc.name} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{svc.name}</span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                        svc.status === 'Operational'
                          ? 'bg-primary/15 text-primary'
                          : 'bg-warning/15 text-warning',
                      )}
                    >
                      {svc.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted">p50 latency {svc.latency}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
