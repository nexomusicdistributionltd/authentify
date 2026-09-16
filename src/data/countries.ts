export type DocType =
  | 'nin'
  | 'bvn'
  | 'national_id'
  | 'drivers_license'
  | 'passport'
  | 'voters_card'
  | 'residence_permit'
  | 'tax_id'

export interface Country {
  code: string
  name: string
  flag: string
  region: string
  documents: DocType[]
  featured?: boolean
}

export const DOC_LABELS: Record<DocType, string> = {
  nin: 'National Identification Number (NIN)',
  bvn: 'Bank Verification Number (BVN)',
  national_id: 'National ID Card',
  drivers_license: "Driver's License",
  passport: 'International Passport',
  voters_card: "Voter's Card",
  residence_permit: 'Residence Permit',
  tax_id: 'Tax Identification Number',
}

export const countries: Country[] = [
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'West Africa',
    featured: true,
    documents: ['nin', 'bvn', 'national_id', 'drivers_license', 'passport', 'voters_card'],
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    region: 'West Africa',
    documents: ['national_id', 'passport', 'drivers_license'],
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    region: 'East Africa',
    documents: ['national_id', 'passport', 'drivers_license'],
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    region: 'Southern Africa',
    documents: ['national_id', 'passport', 'drivers_license'],
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    region: 'North Africa',
    documents: ['national_id', 'passport'],
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    documents: ['drivers_license', 'passport', 'national_id'],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    documents: ['passport', 'drivers_license', 'residence_permit'],
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    documents: ['national_id', 'passport', 'drivers_license', 'tax_id'],
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    documents: ['passport', 'drivers_license'],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Middle East',
    documents: ['passport', 'national_id', 'residence_permit'],
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    documents: ['passport', 'national_id', 'drivers_license'],
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    documents: ['passport', 'national_id', 'drivers_license'],
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'South America',
    documents: ['national_id', 'passport', 'drivers_license', 'tax_id'],
  },
  {
    code: 'RW',
    name: 'Rwanda',
    flag: '🇷🇼',
    region: 'East Africa',
    documents: ['national_id', 'passport'],
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    flag: '🇨🇮',
    region: 'West Africa',
    documents: ['national_id', 'passport'],
  },
  {
    code: 'SN',
    name: 'Senegal',
    flag: '🇸🇳',
    region: 'West Africa',
    documents: ['national_id', 'passport'],
  },
]

export const nigeriaDocs = [
  {
    id: 'nin' as DocType,
    title: 'NIN Verification',
    description: 'Verify National Identification Number against NIMC database with biometric match.',
    latency: '~2s',
  },
  {
    id: 'bvn' as DocType,
    title: 'BVN Verification',
    description: 'Bank Verification Number checks for financial KYC and account opening.',
    latency: '~1.5s',
  },
  {
    id: 'drivers_license' as DocType,
    title: "Driver's License",
    description: 'FRSC-issued license OCR + face match for mobility and logistics platforms.',
    latency: '~4s',
  },
  {
    id: 'passport' as DocType,
    title: 'International Passport',
    description: 'Machine-readable zone + chip data extraction with liveness.',
    latency: '~5s',
  },
  {
    id: 'voters_card' as DocType,
    title: "Voter's Card (PVC)",
    description: 'INEC permanent voter card validation for civic and onboarding flows.',
    latency: '~3s',
  },
  {
    id: 'national_id' as DocType,
    title: 'National ID Card',
    description: 'Physical national ID document capture with hologram and security checks.',
    latency: '~4s',
  },
]
