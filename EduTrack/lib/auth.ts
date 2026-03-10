import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { User, UserRole } from '@prisma/client'

const secretKey = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
const encodedKey = new TextEncoder().encode(secretKey)

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  exp?: number
}

export async function createToken(user: {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
}): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)

  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey)
    return payload as JWTPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  return verifyToken(token)
}

export async function setSession(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function removeSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

export function hashPassword(password: string): string {
  const bcrypt = require('bcryptjs')
  return bcrypt.hashSync(password, 12)
}

export function verifyPassword(password: string, hash: string): boolean {
  const bcrypt = require('bcryptjs')
  return bcrypt.compareSync(password, hash)
}
