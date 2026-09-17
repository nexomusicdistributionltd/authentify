import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from './db.mjs'

const JWT_SECRET = () => {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is not configured')
  return s
}

export const REALM = {
  ADMIN: 'admin',
  COMMERCIAL: 'commercial',
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hash) {
  if (!hash) return false
  return bcrypt.compare(password, hash)
}

export function signToken(user, realm) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      org_id: user.org_id || null,
      realm,
    },
    JWT_SECRET(),
    { expiresIn: '12h', issuer: 'authentify' },
  )
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET(), { issuer: 'authentify' })
}

export function getBearer(event) {
  const h = event.headers?.authorization || event.headers?.Authorization || ''
  if (h.startsWith('Bearer ')) return h.slice(7)
  return null
}

export async function requireAuth(event, expectedRealm) {
  const token = getBearer(event)
  if (!token) {
    const err = new Error('Unauthorized')
    err.statusCode = 401
    throw err
  }
  let payload
  try {
    payload = verifyToken(token)
  } catch {
    const err = new Error('Invalid or expired session')
    err.statusCode = 401
    throw err
  }

  if (payload.realm !== expectedRealm) {
    const err = new Error(
      expectedRealm === REALM.ADMIN
        ? 'Commercial accounts cannot access the admin panel'
        : 'Admin accounts cannot access the commercial panel',
    )
    err.statusCode = 403
    throw err
  }

  if (expectedRealm === REALM.ADMIN && payload.role !== 'platform_admin') {
    const err = new Error('Admin access required')
    err.statusCode = 403
    throw err
  }
  if (expectedRealm === REALM.COMMERCIAL && payload.role !== 'org_user') {
    const err = new Error('Commercial access required')
    err.statusCode = 403
    throw err
  }

  const { rows } = await query(
    `SELECT id, email, full_name, role, org_id, is_active FROM users WHERE id = $1`,
    [payload.sub],
  )
  const user = rows[0]
  if (!user || !user.is_active) {
    const err = new Error('Account inactive or not found')
    err.statusCode = 401
    throw err
  }
  return { user, payload }
}

export async function ensureBootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD
  if (!email || !password) return { created: false, reason: 'env_not_set' }

  const existing = await query(
    `SELECT id FROM users WHERE role = 'platform_admin' LIMIT 1`,
  )
  if (existing.rows.length > 0) return { created: false, reason: 'admin_exists' }

  const password_hash = await hashPassword(password)
  const { rows } = await query(
    `INSERT INTO users (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, 'platform_admin')
     ON CONFLICT (email) DO NOTHING
     RETURNING id, email, role`,
    [email.toLowerCase().trim(), password_hash, 'Platform Admin'],
  )
  return { created: rows.length > 0, admin: rows[0] || null }
}

export async function audit(actor, action, resourceType, resourceId, meta = {}) {
  try {
    await query(
      `INSERT INTO audit_logs (actor_user_id, actor_role, action, resource_type, resource_id, meta)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        actor?.id || null,
        actor?.role || null,
        action,
        resourceType || null,
        resourceId || null,
        JSON.stringify(meta),
      ],
    )
  } catch {
    // audit must not break primary flow
  }
}
