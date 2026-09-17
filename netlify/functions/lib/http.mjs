const CORS = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS },
    body: JSON.stringify(body),
  }
}

export function ok(body) {
  return json(200, body)
}

export function created(body) {
  return json(201, body)
}

export function err(statusCode, message, extra = {}) {
  return json(statusCode, { error: message, ...extra })
}

export function parseBody(event) {
  if (!event.body) return {}
  try {
    return JSON.parse(event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body)
  } catch {
    return {}
  }
}

export function pathParts(event) {
  const raw =
    event.path ||
    event.rawPath ||
    event.requestContext?.http?.path ||
    ''
  const cleaned = raw
    .replace(/^\/\.netlify\/functions\/api/, '')
    .replace(/^\/api/, '')
    .replace(/^\//, '')
  return cleaned.split('/').filter(Boolean)
}
