import { NextResponse } from 'next/server'
import { removeSession } from '@/lib/auth'

export async function POST() {
  try {
    await removeSession()
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
