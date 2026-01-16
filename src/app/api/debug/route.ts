import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const checks = {
        database: false,
        userTable: false,
        verificationTokenTable: false,
        envVars: {
            DATABASE_URL: !!process.env.DATABASE_URL,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
            NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
            RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        },
        errors: [] as string[],
    }

    // Test database connection
    try {
        await prisma.$queryRaw`SELECT 1`
        checks.database = true
    } catch (e: any) {
        checks.errors.push(`Database: ${e.message}`)
    }

    // Test user table
    try {
        await prisma.user.count()
        checks.userTable = true
    } catch (e: any) {
        checks.errors.push(`User table: ${e.message}`)
    }

    // Test verificationToken table
    try {
        await prisma.verificationToken.count()
        checks.verificationTokenTable = true
    } catch (e: any) {
        checks.errors.push(`VerificationToken table: ${e.message}`)
    }

    return NextResponse.json(checks)
}
