import { generateId } from '../lib/utils'

export type VerificationStatus = 'approved' | 'declined' | 'review' | 'pending' | 'processing'

export interface VerificationSession {
  id: string
  applicant: string
  email: string
  country: string
  flag: string
  document: string
  status: VerificationStatus
  riskScore: number
  createdAt: string
  channel: 'web' | 'mobile' | 'api'
  amlHit: boolean
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed: string
  env: 'live' | 'test'
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  status: 'active' | 'disabled'
  successRate: number
}

export const sessions: VerificationSession[] = [
  { id: 'vs_9k2m1a', applicant: 'Chinedu Okafor', email: 'chinedu.o@example.com', country: 'Nigeria', flag: '🇳🇬', document: 'NIN', status: 'approved', riskScore: 8, createdAt: new Date(Date.now() - 12 * 60000).toISOString(), channel: 'web', amlHit: false },
  { id: 'vs_8h3n2b', applicant: 'Amina Yusuf', email: 'amina.y@example.com', country: 'Nigeria', flag: '🇳🇬', document: 'BVN', status: 'approved', riskScore: 12, createdAt: new Date(Date.now() - 45 * 60000).toISOString(), channel: 'api', amlHit: false },
  { id: 'vs_7g4p3c', applicant: 'Kwame Mensah', email: 'kwame.m@example.com', country: 'Ghana', flag: '🇬🇭', document: 'Passport', status: 'review', riskScore: 61, createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), channel: 'mobile', amlHit: false },
  { id: 'vs_6f5q4d', applicant: 'Fatima Bello', email: 'fatima.b@example.com', country: 'Nigeria', flag: '🇳🇬', document: "Driver's License", status: 'declined', riskScore: 88, createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), channel: 'web', amlHit: true },
  { id: 'vs_5e6r5e', applicant: 'James Okoro', email: 'james.o@example.com', country: 'Nigeria', flag: '🇳🇬', document: 'Passport', status: 'processing', riskScore: 0, createdAt: new Date(Date.now() - 8 * 60000).toISOString(), channel: 'api', amlHit: false },
  { id: 'vs_4d7s6f', applicant: 'Ngozi Eze', email: 'ngozi.e@example.com', country: 'Nigeria', flag: '🇳🇬', document: "Voter's Card", status: 'approved', riskScore: 15, createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), channel: 'web', amlHit: false },
  { id: 'vs_3c8t7g', applicant: 'David Kamau', email: 'david.k@example.com', country: 'Kenya', flag: '🇰🇪', document: 'National ID', status: 'approved', riskScore: 22, createdAt: new Date(Date.now() - 30 * 3600000).toISOString(), channel: 'mobile', amlHit: false },
  { id: 'vs_2b9u8h', applicant: 'Sarah Adeyemi', email: 'sarah.a@example.com', country: 'Nigeria', flag: '🇳🇬', document: 'NIN', status: 'pending', riskScore: 0, createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), channel: 'web', amlHit: false },
]

export const apiKeys: ApiKey[] = [
  { id: generateId('key'), name: 'Production Backend', prefix: 'afy_live_sk_8x2…', createdAt: '2026-01-12', lastUsed: '2 min ago', env: 'live' },
  { id: generateId('key'), name: 'Staging Mobile', prefix: 'afy_test_sk_3m9…', createdAt: '2026-03-04', lastUsed: '1 hour ago', env: 'test' },
]

export const webhooks: WebhookEndpoint[] = [
  { id: 'wh_1', url: 'https://api.yourapp.ng/webhooks/authentify', events: ['verification.completed', 'verification.review'], status: 'active', successRate: 99.4 },
  { id: 'wh_2', url: 'https://hooks.slack.com/services/T…', events: ['verification.declined'], status: 'active', successRate: 100 },
]

export const dashboardStats = {
  totalVerifications: 12847,
  approvalRate: 91.2,
  avgLatencyMs: 1840,
  nigeriaShare: 68,
  todayCount: 342,
  reviewQueue: 17,
  amlFlags: 4,
  activeApiKeys: 2,
}

export const chartData = [
  { day: 'Mon', approved: 420, declined: 28, review: 18 },
  { day: 'Tue', approved: 510, declined: 31, review: 22 },
  { day: 'Wed', approved: 480, declined: 25, review: 15 },
  { day: 'Thu', approved: 560, declined: 34, review: 20 },
  { day: 'Fri', approved: 620, declined: 40, review: 28 },
  { day: 'Sat', approved: 380, declined: 18, review: 12 },
  { day: 'Sun', approved: 310, declined: 14, review: 9 },
]

export const countryBreakdown = [
  { country: 'Nigeria', flag: '🇳🇬', count: 8740, pct: 68 },
  { country: 'Ghana', flag: '🇬🇭', count: 1280, pct: 10 },
  { country: 'Kenya', flag: '🇰🇪', count: 960, pct: 7.5 },
  { country: 'South Africa', flag: '🇿🇦', count: 640, pct: 5 },
  { country: 'Others', flag: '🌍', count: 1227, pct: 9.5 },
]

export const adminUsers = [
  { id: 'u1', name: 'Adaeze Nwosu', role: 'Super Admin', email: 'adaeze@authentify.io', lastActive: 'Online' },
  { id: 'u2', name: 'Ibrahim Musa', role: 'Compliance', email: 'ibrahim@authentify.io', lastActive: '12m ago' },
  { id: 'u3', name: 'Tunde Bakare', role: 'Support', email: 'tunde@authentify.io', lastActive: '1h ago' },
]

export const tenants = [
  { id: 't1', name: 'PayStack NG Demo', plan: 'Growth', verifications: 4200, status: 'active' },
  { id: 't2', name: 'Flutterwave Sandbox', plan: 'Scale', verifications: 8900, status: 'active' },
  { id: 't3', name: 'Kuda Bank Trial', plan: 'Starter', verifications: 340, status: 'trial' },
  { id: 't4', name: 'Opay Onboarding', plan: 'Enterprise', verifications: 15200, status: 'active' },
]
