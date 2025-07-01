import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.DIB_KURAN_API_BASE_URL
const API_TOKEN = process.env.DIB_KURAN_API_TOKEN

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!API_BASE_URL || !API_TOKEN) {
    return NextResponse.json(
      { error: 'API configuration missing' },
      { status: 500 }
    )
  }

  const resolvedParams = await params
  const surahId = resolvedParams.id

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chapters/${surahId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.message || `HTTP error! status: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API request failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 