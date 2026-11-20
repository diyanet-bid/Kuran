import { proxyDib } from '@/lib/api/dib-proxy'

export async function GET() {
  return proxyDib('/api/v1/chapters')
}
