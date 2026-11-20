import { NextResponse } from 'next/server'

const API_BASE_URL = process.env.DIB_KURAN_API_BASE_URL?.replace(/\/+$/, '')
const API_TOKEN = process.env.DIB_KURAN_API_TOKEN
const UPSTREAM_TIMEOUT_MS = 10_000

export const QURAN_LIMITS = {
  pages: 604,
  surahs: 114,
} as const

/**
 * Parses a strictly numeric route segment and checks it is within 1..max.
 * Returns null for anything else so the value never reaches the upstream URL.
 */
export function parseBoundedInt(value: string, max: number): number | null {
  if (!/^[0-9]{1,3}$/.test(value)) return null
  const parsed = Number(value)
  return parsed >= 1 && parsed <= max ? parsed : null
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function upstreamError(status: number) {
  if (status === 403 || status === 429) {
    return NextResponse.json(
      { error: 'API access limit reached' },
      { status }
    )
  }
  if (status === 404) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ error: 'Upstream service error' }, { status: 502 })
}

/**
 * Forwards a GET request to the DIB Quran API.
 * `path` must be built only from constants and validated values.
 */
export async function proxyDib(path: string) {
  if (!API_BASE_URL || !API_TOKEN) {
    return NextResponse.json(
      { error: 'Service is not configured' },
      { status: 503 }
    )
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })

    if (!response.ok) {
      console.error(`[dib-proxy] upstream ${response.status} for ${path}`)
      return upstreamError(response.status)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    const reason = error instanceof Error ? error.name : 'UnknownError'
    console.error(`[dib-proxy] request failed (${reason}) for ${path}`)
    return NextResponse.json(
      { error: 'Upstream service unavailable' },
      { status: 504 }
    )
  }
}
