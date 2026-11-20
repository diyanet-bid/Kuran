import { NextRequest } from 'next/server'
import {
  QURAN_LIMITS,
  badRequest,
  parseBoundedInt,
  proxyDib,
} from '@/lib/api/dib-proxy'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const surahId = parseBoundedInt(id, QURAN_LIMITS.surahs)

  if (surahId === null) {
    return badRequest(`Surah id must be between 1 and ${QURAN_LIMITS.surahs}`)
  }

  return proxyDib(`/api/v1/chapters/${surahId}`)
}
