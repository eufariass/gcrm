import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'A senha deve ter pelo menos 6 caracteres' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Este email já está cadastrado' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create verification token
        const verificationToken = crypto.randomUUID()
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

        // Create user (without emailVerified)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        // Create verification token
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: verificationToken,
                expires,
            }
        })

        // Send verification email
        const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verificationToken}&email=${email}`

        try {
            await resend.emails.send({
                from: 'G-CRM <noreply@gcrm.com.br>',
                to: email,
                subject: 'Verifique seu email - G-CRM',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">Bem-vindo ao G-CRM!</h1>
            <p>Olá ${name},</p>
            <p>Clique no botão abaixo para verificar seu email e ativar sua conta:</p>
            <a href="${verificationUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
              Verificar Email
            </a>
            <p style="color: #666; font-size: 14px;">Este link expira em 24 horas.</p>
            <p style="color: #666; font-size: 14px;">Se você não criou esta conta, ignore este email.</p>
          </div>
        `,
            })
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError)
            // Continue anyway - user can request new verification email later
        }

        return NextResponse.json(
            { message: 'Conta criada! Verifique seu email.' },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
