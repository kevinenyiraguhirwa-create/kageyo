import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Fetch all access requests (for admin) or user's own requests
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let accessRequests

    if (session.user.role === 'ADMIN') {
      // Admin sees all requests
      accessRequests = await prisma.accessRequest.findMany({
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      // Regular users see only their requests
      accessRequests = await prisma.accessRequest.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          book: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    return NextResponse.json({ accessRequests })
  } catch (error) {
    console.error('Error fetching access requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new access request
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { bookId, bookTitle, subject, educationLevel, purpose, additionalNotes } = body

    // Validate required fields
    if (!bookTitle || !subject || !educationLevel || !purpose || purpose.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create access request
    const accessRequest = await prisma.accessRequest.create({
      data: {
        userId: session.user.id,
        bookId: bookId || null,
        bookTitle,
        subject,
        educationLevel,
        purpose: JSON.stringify(purpose),
        additionalNotes,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ accessRequest }, { status: 201 })
  } catch (error) {
    console.error('Error creating access request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update access request status (admin only)
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { requestId, status, adminNotes } = body

    if (!requestId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate status
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const accessRequest = await prisma.accessRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status,
        adminNotes,
        processedAt: new Date(),
        processedBy: session.user.id,
      },
    })

    return NextResponse.json({ accessRequest })
  } catch (error) {
    console.error('Error updating access request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
