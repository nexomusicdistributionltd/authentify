import { Link } from 'react-router-dom'
import { Fingerprint, FileSearch, ScanFace, Globe2, Zap, Lock, Building2, ArrowRight, CheckCircle2, Smartphone, Server } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { LandingHero } from '../components/LandingHero'
import { countries, nigeriaDocs } from '../data/countries'

const products = [
  { icon: FileSearch, title: 'Document + ID Verification', desc: 'OCR, MRZ, hologram, and database checks for passports, national IDs, NIN slips, and licenses.' },
  { icon: ScanFace, title: 'Biometric Liveness', desc: 'Passive and active liveness to block deepfakes, printouts, and replay attacks in real time.' },
  { icon: Fingerprint, title: 'NIN & BVN Lookup', desc: 'Nigeria-first identity rails — match names, DOB, and biometrics against authoritative sources.' },
  { icon: Globe2, title: 'Global AML Screening', desc: 'Sanctions, PEPs, and adverse media screening with continuous monitoring hooks.' },
]
const plans = [
  { name: 'Starter', price: '₦0', period: 'to start', features: ['500 free verifications', 'NIN + BVN test mode', 'Sandbox API keys'], cta: 'Start free', highlight: false },
  { name: 'Growth', price: '₦45', period: 'per verification', features: ['Nigeria full stack', 'Live + test keys', 'Webhooks', 'AML basic'], cta: 'Go live', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: 'volume pricing', features: ['Dedicated SLA', 'Custom workflows', '24/7 desk'], cta: 'Talk to sales', highlight: false },
]

export function Home() {
  return (
    <div className="overflow-x-hidden">
      <LandingHero />
      <section id="products" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Products</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Everything you need for KYC</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40 hover:bg-surface-2">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary"><p.icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-bg-elevated py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Nigeria first 🇳🇬</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Deep coverage where it matters most</h2>
              <ul className="mt-6 space-y-3">
                {['NIMC NIN verification', 'BVN for banking KYC', 'FRSC driver license OCR', 'INEC PVC checks', 'Passport MRZ + chip'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{item}</li>
                ))}
              </ul>
            </ScrollReveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {nigeriaDocs.map((d, i) => (
                <ScrollReveal key={d.id} delay={i * 60}>
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">{d.title}</h3><span className="text-[11px] text-primary">{d.latency}</span></div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{d.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="coverage" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Coverage</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">All countries. Nigeria majorly.</h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {countries.map((c, i) => (
              <ScrollReveal key={c.code} delay={Math.min(i * 40, 320)}>
                <div className={`rounded-2xl border p-4 ${c.featured ? 'border-primary/50 bg-primary/10' : 'border-border bg-surface'}`}>
                  <div className="text-2xl">{c.flag}</div>
                  <div className="mt-2 text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted">{c.region}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-bg-elevated py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <ScrollReveal>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Developers</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Ship KYC in an afternoon</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm"><Server className="h-4 w-4 text-accent" /> REST API</div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm"><Smartphone className="h-4 w-4 text-accent" /> Hosted UI</div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm"><Zap className="h-4 w-4 text-accent" /> Webhooks</div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm"><Lock className="h-4 w-4 text-accent" /> Signed payloads</div>
              </div>
              <Link to="/docs" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Read API docs <ArrowRight className="h-4 w-4" /></Link>
            </ScrollReveal>
            <ScrollReveal delay={100} direction="left">
              <pre className="overflow-x-auto rounded-2xl border border-border bg-bg p-5 text-xs text-muted"><code>{`POST /v1/verifications
Authorization: Bearer afy_live_sk_…

{ "country": "NG", "document_type": "nin" }`}</code></pre>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section id="pricing" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Pricing</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Commercial plans that scale</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 90}>
                <div className={`flex h-full flex-col rounded-2xl border p-6 ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border bg-surface'}`}>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-3xl font-bold">{plan.price}</span><span className="text-sm text-muted">{plan.period}</span></div>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>))}
                  </ul>
                  <Link to={plan.name === 'Enterprise' ? '/docs' : '/dashboard'} className={`mt-8 block rounded-xl py-2.5 text-center text-sm font-semibold ${plan.highlight ? 'bg-primary text-bg' : 'border border-border bg-bg'}`}>{plan.cta}</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-10 text-center md:p-16">
              <Building2 className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Ready to verify your first user?</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/verify" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg">Start verification demo</Link>
                <Link to="/admin" className="rounded-xl border border-border px-5 py-3 text-sm font-semibold">Open admin panel</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
