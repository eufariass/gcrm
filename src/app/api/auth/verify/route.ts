import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const token = searchParams.get('token')
        const email = searchParams.get('email')

        if (!token || !email) {
            return NextResponse.redirect(new URL('/login?error=invalid_token', request.url))
        }

        // Find verification token
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                identifier: email,
                token: token,
            }
        })

        if (!verificationToken) {
            return NextResponse.redirect(new URL('/login?error=invalid_token', request.url))
        }

        // Check if token is expired
        if (verificationToken.expires < new Date()) {
            await prisma.verificationToken.delete({
                where: {
                    identifier_token: {
                        identifier: email,
                        token: token,
                    }
                }
            })
            return NextResponse.redirect(new URL('/login?error=expired_token', request.url))
        }

        // Update user as verified
        await prisma.user.update({
            where: { email },
            data: { emailVerified: new Date() }
        })

        // Delete used token
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: email,
                    token: token,
                }
            }
        })

        return NextResponse.redirect(new URL('/login?verified=true', request.url))
    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.redirect(new URL('/login?error=verification_failed', request.url))
    }
}
