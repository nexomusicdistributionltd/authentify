import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, ArrowRight, Camera, Upload, ScanFace, CheckCircle2, XCircle, Loader2, FileText } from 'lucide-react'
import { countries, DOC_LABELS, type DocType } from '../data/countries'
import { generateId } from '../lib/utils'

type Step = 'country' | 'document' | 'capture' | 'selfie' | 'processing' | 'result'
const nigeria = countries.find((c) => c.code === 'NG')!

export function Verify() {
  const [step, setStep] = useState<Step>('country')
  const [country, setCountry] = useState(nigeria)
  const [doc, setDoc] = useState<DocType | null>(null)
  const [hasFront, setHasFront] = useState(false)
  const [hasSelfie, setHasSelfie] = useState(false)
  const [result, setResult] = useState<'approved' | 'declined' | null>(null)
  const [sessionId] = useState(() => generateId('vs'))
  const [progress, setProgress] = useState(0)

  const runProcessing = () => {
    setStep('processing')
    setProgress(0)
    const stages = [15, 35, 55, 75, 90, 100]
    let i = 0
    const tick = () => {
      if (i < stages.length) {
        setProgress(stages[i++])
        setTimeout(tick, 450)
      } else {
        setResult(Math.random() > 0.15 ? 'approved' : 'declined')
        setStep('result')
      }
    }
    setTimeout(tick, 400)
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" /> Back</Link>
          <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-primary" /> Authentify</div>
          <span className="text-xs text-subtle">{sessionId}</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 flex gap-1.5">
          {(['country', 'document', 'capture', 'selfie', 'result'] as const).map((s, idx) => {
            const order = ['country', 'document', 'capture', 'selfie', 'processing', 'result']
            const current = order.indexOf(step)
            const active = idx <= (step === 'processing' ? 3 : current)
            return <div key={s} className={`h-1.5 flex-1 rounded-full transition ${active ? 'bg-primary' : 'bg-border'}`} />
          })}
        </div>

        {step === 'country' && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Select country</h1>
            <p className="mt-2 text-sm text-muted">Nigeria is featured first. Verification is available worldwide.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {countries.map((c) => (
                <button key={c.code} type="button" onClick={() => { setCountry(c); setDoc(null) }}
                  className={`rounded-2xl border p-4 text-left transition ${country.code === c.code ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-border-bright'}`}>
                  <span className="text-2xl">{c.flag}</span>
                  <div className="mt-2 text-sm font-semibold">{c.name}</div>
                  {c.featured && <span className="mt-1 inline-block text-[10px] font-medium uppercase tracking-wide text-primary">Primary market</span>}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep('document')} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg hover:bg-primary-glow">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 'document' && (
          <div>
            <button type="button" onClick={() => setStep('country')} className="mb-4 text-sm text-muted hover:text-fg">← {country.flag} {country.name}</button>
            <h1 className="text-2xl font-bold tracking-tight">Choose document</h1>
            <div className="mt-6 space-y-2">
              {country.documents.map((d) => (
                <button key={d} type="button" onClick={() => setDoc(d)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${doc === d ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-border-bright'}`}>
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{DOC_LABELS[d]}</span>
                </button>
              ))}
            </div>
            <button type="button" disabled={!doc} onClick={() => setStep('capture')}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg enabled:hover:bg-primary-glow disabled:opacity-40">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 'capture' && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Capture document</h1>
            <div className="mt-6 rounded-2xl border border-dashed border-border-bright bg-surface p-8 text-center">
              {hasFront ? (
                <div className="space-y-3">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <p className="font-medium">Document captured</p>
                  <button type="button" onClick={() => setHasFront(false)} className="text-xs text-subtle underline">Retake</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto h-10 w-10 text-subtle" />
                  <button type="button" onClick={() => setHasFront(true)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-bg">
                    <Camera className="h-4 w-4" /> Simulate capture
                  </button>
                </div>
              )}
            </div>
            <button type="button" disabled={!hasFront} onClick={() => setStep('selfie')}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg enabled:hover:bg-primary-glow disabled:opacity-40">
              Continue to selfie <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 'selfie' && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Selfie & liveness</h1>
            <div className="relative mx-auto mt-8 aspect-square max-w-xs overflow-hidden rounded-full border-4 border-primary/40 bg-surface-2">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <ScanFace className={`h-16 w-16 ${hasSelfie ? 'text-primary' : 'text-muted'}`} />
                <p className="text-xs text-muted">{hasSelfie ? 'Liveness passed' : 'Position face in the circle'}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              {!hasSelfie ? (
                <button type="button" onClick={() => setHasSelfie(true)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg">
                  <Camera className="h-4 w-4" /> Capture selfie
                </button>
              ) : (
                <button type="button" onClick={runProcessing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg">
                  Submit verification <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-16 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h1 className="mt-6 text-2xl font-bold">Analyzing identity…</h1>
            <div className="mx-auto mt-8 h-2 max-w-xs overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-xs text-subtle">{progress}%</p>
          </div>
        )}

        {step === 'result' && result && (
          <div className="py-10 text-center">
            {result === 'approved' ? <CheckCircle2 className="mx-auto h-16 w-16 text-primary" /> : <XCircle className="mx-auto h-16 w-16 text-danger" />}
            <h1 className="mt-6 text-2xl font-bold">{result === 'approved' ? 'Verification approved' : 'Verification declined'}</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              {result === 'approved' ? `Identity confirmed for ${country.name}. Session ${sessionId}.` : 'Risk signals exceeded policy. Review in dashboard.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/dashboard" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg">View in dashboard</Link>
              <button type="button" onClick={() => { setStep('country'); setDoc(null); setHasFront(false); setHasSelfie(false); setResult(null) }}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold">New verification</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
