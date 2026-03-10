import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const accessRequestSchema = z.object({
  bookTitle: z.string().min(1, 'Book title is required'),
  subject: z.string().min(1, 'Subject is required'),
  educationLevel: z.string().min(1, 'Education level is required'),
  purpose: z.array(z.string()).min(1, 'At least one purpose is required'),
  purposeOther: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // If admin, return all requests
    if (session.role === 'ADMIN') {
      const requests = await prisma.accessRequest.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              educationLevel: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json({ requests })
    }

    // Otherwise return user's own requests
    const requests = await prisma.accessRequest.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ requests })
  } catch (error) {
    console.error('Get access requests error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = accessRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { bookTitle, subject, educationLevel, purpose, purposeOther } = validation.data

    // Create access request
    const accessRequest = await prisma.accessRequest.create({
      data: {
        userId: session.userId,
        bookTitle,
        subject,
        educationLevel,
        purpose,
        purposeOther,
        status: 'APPROVED', // Auto-approve for demo
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    // Log the access
    await prisma.accessLog.create({
      data: {
        userId: session.userId,
        bookId: '', // Will be linked if book exists
        actionType: 'REQUEST_ACCESS',
      },
    })

    return NextResponse.json({
      message: 'Access request submitted successfully',
      request: accessRequest,
    })
  } catch (error) {
    console.error('Create access request error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
