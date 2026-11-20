import { NextRequest } from 'next/server'
import {
  QURAN_LIMITS,
  badRequest,
  parseBoundedInt,
  proxyDib,
} from '@/lib/api/dib-proxy'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params
  const page = parseBoundedInt(number, QURAN_LIMITS.pages)

  if (page === null) {
    return badRequest(`Page number must be between 1 and ${QURAN_LIMITS.pages}`)
  }

  return proxyDib(`/api/v1/verses/page/${page}`)
}
