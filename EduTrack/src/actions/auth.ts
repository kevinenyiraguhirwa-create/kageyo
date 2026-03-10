'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { z } from 'zod'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
)

// Validation schemas
export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  educationLevel: z.string().min(1, 'Education level is required'),
  school: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
})

// JWT Functions
async function createAccessToken(
  payload: { userId: string; email: string; fullName: string; role: string },
  remember: boolean = false
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(remember ? '30d' : '7d')
    .sign(JWT_SECRET)
}

async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

// Cookie functions
async function setAuthCookie(token: string, remember: boolean = false) {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: remember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    path: '/',
  })
}

async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('auth-token')?.value
}

// Server Actions
export async function register(formData: FormData) {
  const rawData = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
    address: formData.get('address') || '',
    educationLevel: formData.get('educationLevel'),
    school: formData.get('school') || '',
    password: formData.get('password'),
  }

  const validation = registerSchema.safeParse(rawData)
  if (!validation.success) {
    return { error: validation.error.errors[0].message }
  }

  const { fullName, email, phone, address, educationLevel, school, password } = validation.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return { error: 'An account with this email already exists' }
    }

    const passwordHash = hashPassword(password)

    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        fullName,
        phone: phone || null,
        address: address || null,
        educationLevel,
        school: school || null,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'An error occurred during registration' }
  }
}

export async function login(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    remember: formData.get('remember') === 'on',
  }

  const validation = loginSchema.safeParse(rawData)
  if (!validation.success) {
    return { error: validation.error.errors[0].message }
  }

  const { email, password, remember } = validation.data

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return { error: 'Invalid email or password' }
    }

    if (!user.isActive) {
      return { error: 'Your account has been deactivated' }
    }

    const isValid = verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return { error: 'Invalid email or password' }
    }

    const token = await createAccessToken(
      {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      remember
    )

    await setAuthCookie(token, remember)

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An error occurred during login' }
  }
}

export async function logout() {
  await removeAuthCookie()
  redirect('/login')
}

export async function getSession() {
  const token = await getAuthCookie()
  if (!token) return null

  const payload = await verifyAccessToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId as string },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      address: true,
      educationLevel: true,
      school: true,
      role: true,
      createdAt: true,
    },
  })

  return user
}

export async function requireAuth() {
  const user = await getSession()
  if (!user) {
    redirect('/login')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'ADMIN') {
    redirect('/dashboard')
  }
  return user
}
