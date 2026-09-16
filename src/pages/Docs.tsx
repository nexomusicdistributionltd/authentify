import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, Copy } from 'lucide-react'
import { useState } from 'react'

const endpoints = [
  {
    method: 'POST',
    path: '/v1/verifications',
    desc: 'Create a verification session for an applicant.',
    body: `{
  "country": "NG",
  "document_type": "nin",
  "callback_url": "https://api.yourapp.ng/webhooks/authentify",
  "applicant": {
    "first_name": "Chinedu",
    "last_name": "Okafor",
    "email": "chinedu@example.com"
  }
}`,
  },
  {
    method: 'GET',
    path: '/v1/verifications/{id}',
    desc: 'Retrieve session status, risk score, and extracted fields.',
    body: null,
  },
  {
    method: 'POST',
    path: '/v1/verifications/{id}/documents',
    desc: 'Upload document images (multipart) for OCR and authenticity checks.',
    body: null,
  },
  {
    method: 'POST',
    path: '/v1/lookups/nin',
    desc: 'Nigeria NIN database lookup with optional biometric match.',
    body: `{
  "nin": "12345678901",
  "match_selfie": true
}`,
  },
  {
    method: 'POST',
    path: '/v1/lookups/bvn',
    desc: 'Nigeria BVN verification for financial KYC.',
    body: `{
  "bvn": "22123456789"
}`,
  },
  {
    method: 'POST',
    path: '/v1/aml/screen',
    desc: 'Screen an individual against sanctions, PEPs, and adverse media.',
    body: `{
  "full_name": "Chinedu Okafor",
  "country": "NG",
  "date_of_birth": "1990-04-12"
}`,
  },
]

export function Docs() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, key: string) => {
    void navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">API Reference</h1>
        </div>
        <p className="mt-3 text-muted">
          Base URL: <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-primary">https://api.authentify.io</code>
          · Auth via Bearer API key from the commercial dashboard.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-semibold">Authentication</h2>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-bg p-4 text-xs text-muted">
            <code>{`Authorization: Bearer afy_live_sk_…`}</code>
          </pre>
        </div>

        <div className="mt-10 space-y-6">
          {endpoints.map((ep) => (
            <div key={ep.path + ep.method} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                    ep.method === 'POST' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                  }`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-medium">{ep.path}</code>
              </div>
              <p className="mt-2 text-sm text-muted">{ep.desc}</p>
              {ep.body && (
                <div className="relative mt-4">
                  <button
                    type="button"
                    onClick={() => copy(ep.body!, ep.path)}
                    className="absolute right-3 top-3 rounded-lg border border-border bg-surface p-1.5 text-muted hover:text-fg"
                    aria-label="Copy"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <pre className="overflow-x-auto rounded-xl bg-bg p-4 text-xs leading-relaxed text-muted">
                    <code>{ep.body}</code>
                  </pre>
                  {copied === ep.path && (
                    <span className="absolute right-12 top-3 text-[11px] text-primary">Copied</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="font-semibold">Webhooks</h2>
          <p className="mt-2 text-sm text-muted">
            Events: <code>verification.completed</code>, <code>verification.review</code>,{' '}
            <code>verification.declined</code>. Payloads are HMAC-signed with your webhook secret.
          </p>
          <Link to="/dashboard" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Configure webhooks in dashboard →
          </Link>
        </div>
      </div>
    </div>
  )
}
