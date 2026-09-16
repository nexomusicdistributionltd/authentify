import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, LayoutDashboard, Key, Webhook, Settings, FileSearch, ArrowLeft, Plus, Search, Bell, CheckCircle2, AlertTriangle, Clock, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { sessions, dashboardStats, chartData, countryBreakdown, apiKeys, webhooks } from '../data/mockData'
import { formatNumber, timeAgo, cn } from '../lib/utils'

type Tab = 'overview' | 'sessions' | 'keys' | 'webhooks' | 'settings'
const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'sessions', label: 'Verifications', icon: FileSearch },
  { id: 'keys', label: 'API Keys', icon: Key },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: 'bg-primary/15 text-primary', declined: 'bg-danger/15 text-danger',
    review: 'bg-warning/15 text-warning', pending: 'bg-subtle/20 text-muted', processing: 'bg-accent/15 text-accent',
  }
  return <span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize', map[status] || map.pending)}>{status}</span>
}

export function Dashboard() {
  const [tab, setTab] = useState<Tab>('overview')
  const [query, setQuery] = useState('')
  const filtered = sessions.filter((s) => s.applicant.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase()) || s.document.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-bg-elevated md:flex md:flex-col">
        <div className="flex items-center gap-2 border-b border-border px-5 py-5 font-semibold"><ShieldCheck className="h-5 w-5 text-primary" /> Authentify</div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => setTab(item.id)}
              className={cn('flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition', tab === item.id ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-surface hover:text-fg')}>
              <item.icon className="h-4 w-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface"><ArrowLeft className="h-4 w-4" /> Marketing site</Link>
          <Link to="/admin" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface"><Users className="h-4 w-4" /> Admin panel</Link>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-bg-elevated px-4 py-3 md:px-6">
          <div>
            <h1 className="text-lg font-semibold">Commercial dashboard</h1>
            <p className="text-xs text-muted">PayStack NG Demo · Growth plan</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-xl border border-border p-2 text-muted hover:bg-surface"><Bell className="h-4 w-4" /></button>
            <Link to="/verify" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-bg"><Plus className="h-3.5 w-3.5" /> New session</Link>
          </div>
        </header>
        <div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 md:hidden">
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => setTab(item.id)}
              className={cn('shrink-0 rounded-lg px-3 py-1.5 text-xs', tab === item.id ? 'bg-primary/15 text-primary' : 'text-muted')}>{item.label}</button>
          ))}
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total verifications', value: formatNumber(dashboardStats.totalVerifications), icon: FileSearch },
                  { label: 'Approval rate', value: `${dashboardStats.approvalRate}%`, icon: CheckCircle2 },
                  { label: 'Avg latency', value: `${dashboardStats.avgLatencyMs} ms`, icon: Clock },
                  { label: 'Nigeria share', value: `${dashboardStats.nigeriaShare}%`, icon: ShieldCheck },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between"><span className="text-xs text-muted">{s.label}</span><s.icon className="h-4 w-4 text-primary" /></div>
                    <div className="mt-2 text-2xl font-bold">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface p-4 lg:col-span-2">
                  <h3 className="mb-4 text-sm font-semibold">Weekly volume</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#243044" />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ background: '#121826', border: '1px solid #243044', borderRadius: 12 }} />
                        <Bar dataKey="approved" stackId="a" fill="#00c853" />
                        <Bar dataKey="review" stackId="a" fill="#f59e0b" />
                        <Bar dataKey="declined" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <h3 className="mb-4 text-sm font-semibold">By country</h3>
                  <div className="space-y-3">
                    {countryBreakdown.map((c) => (
                      <div key={c.country}>
                        <div className="mb-1 flex justify-between text-xs"><span>{c.flag} {c.country}</span><span className="text-muted">{c.pct}%</span></div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{ width: `${c.pct}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-subtle"><tr className="border-b border-border">
                    <th className="px-4 py-2.5 font-medium">Applicant</th><th className="px-4 py-2.5 font-medium">Document</th>
                    <th className="px-4 py-2.5 font-medium">Status</th><th className="px-4 py-2.5 font-medium">When</th>
                  </tr></thead>
                  <tbody>
                    {sessions.slice(0, 5).map((s) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3"><div className="font-medium">{s.applicant}</div><div className="text-xs text-subtle">{s.flag} {s.country}</div></td>
                        <td className="px-4 py-3 text-muted">{s.document}</td>
                        <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                        <td className="px-4 py-3 text-xs text-subtle">{timeAgo(s.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 'sessions' && (
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applicant, ID, document…"
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary" />
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-subtle"><tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">ID</th><th className="px-4 py-3 font-medium">Applicant</th>
                    <th className="px-4 py-3 font-medium">Country</th><th className="px-4 py-3 font-medium">Document</th>
                    <th className="px-4 py-3 font-medium">Risk</th><th className="px-4 py-3 font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0 hover:bg-surface-2/50">
                        <td className="px-4 py-3 font-mono text-xs text-subtle">{s.id}</td>
                        <td className="px-4 py-3"><div className="font-medium">{s.applicant}</div></td>
                        <td className="px-4 py-3">{s.flag} {s.country}</td>
                        <td className="px-4 py-3 text-muted">{s.document}</td>
                        <td className="px-4 py-3"><span className={cn('font-medium', s.riskScore > 70 ? 'text-danger' : s.riskScore > 40 ? 'text-warning' : 'text-primary')}>{s.riskScore || '—'}</span>
                          {s.amlHit && <AlertTriangle className="ml-1 inline h-3 w-3 text-danger" />}</td>
                        <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 'keys' && (
            <div className="space-y-3">
              {apiKeys.map((k) => (
                <div key={k.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4">
                  <div>
                    <div className="font-medium">{k.name}</div>
                    <div className="mt-1 font-mono text-xs text-muted">{k.prefix}</div>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase', k.env === 'live' ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent')}>{k.env}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'webhooks' && (
            <div className="space-y-3">
              {webhooks.map((w) => (
                <div key={w.id} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="font-mono text-sm">{w.url}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">{w.events.map((e) => <span key={e} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-muted">{e}</span>)}</div>
                  <div className="mt-2 text-xs text-muted">{w.successRate}% delivery</div>
                </div>
              ))}
            </div>
          )}
          {tab === 'settings' && (
            <div className="max-w-xl rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold">Organization</h3>
              <label className="mt-4 block text-sm"><span className="text-xs text-muted">Display name</span>
                <input defaultValue="PayStack NG Demo" className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:border-primary" /></label>
              <label className="mt-3 block text-sm"><span className="text-xs text-muted">Default country</span>
                <select defaultValue="NG" className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:border-primary">
                  <option value="NG">Nigeria</option><option value="GH">Ghana</option><option value="KE">Kenya</option>
                </select></label>
              <button type="button" className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-bg">Save changes</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
