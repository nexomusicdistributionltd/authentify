import { Link } from 'react-router-dom'
import { ShieldCheck, ScanFace, ArrowRight, CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

export function LandingHero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Built for Nigeria · Live in 150+ countries
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Identity verification that <span className="text-gradient">trusts Africa first</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Authentify is the full KYC platform for fintechs, banks, and marketplaces — NIN, BVN, document AI, face match, and AML in one stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/verify" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg glow-primary transition hover:bg-primary-glow">
                Run a live demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:bg-surface-2">
                Open commercial panel
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> NDPR-aligned</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> &lt;2s avg decision</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 99.9% uptime SLA</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} direction="left">
            <div className="relative mx-auto max-w-md">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4 text-primary" /> Verification session</div>
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">Nigeria · NIN</span>
                </div>
                <div className="relative aspect-[4/5] bg-bg-elevated p-6">
                  <div className="relative mx-auto flex h-full max-w-[220px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-primary/40 bg-surface-2 p-4">
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-primary" />
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20"><ScanFace className="h-12 w-12 text-primary" /></div>
                    </div>
                    <p className="text-center text-xs text-muted">Liveness check in progress…</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl border border-border bg-surface p-3"><div className="text-subtle">Face match</div><div className="mt-1 font-semibold text-primary">98.4%</div></div>
                    <div className="rounded-xl border border-border bg-surface p-3"><div className="text-subtle">Risk score</div><div className="mt-1 font-semibold">Low · 11</div></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
