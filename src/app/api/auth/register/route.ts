import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateVerificationCode(): string {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

function getEmailTemplate(name: string, code: string, verificationUrl: string): string {
  const year = new Date().getFullYear()
  const userName = name ? `, ${name}` : ''

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Confirme seu e-mail</title>
    <style>
      html, body { margin: 0 !important; padding: 0 !important; height: 100% !important; width: 100% !important; }
      * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      table { border-collapse: collapse !important; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      a { text-decoration: none; }
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .px { padding-left: 20px !important; padding-right: 20px !important; }
        .title { font-size: 22px !important; line-height: 28px !important; }
      }
    </style>
  </head>

  <body style="margin:0; padding:0; background:#f6f7f9;">
    <div style="display:none; font-size:1px; color:#f6f7f9; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      Use este código para confirmar a criação da sua conta.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f7f9;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px;">
            
            <tr>
              <td align="left" class="px" style="padding: 0 28px 14px 28px;">
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 14px; color:#111827; letter-spacing: 0.2px;">
                  <strong>G-CRM</strong>
                </div>
              </td>
            </tr>

            <tr>
              <td style="background:#ffffff; border:1px solid #e5e7eb; border-radius: 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="px" style="padding: 28px;">
                      <div class="title" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 24px; line-height: 32px; color:#111827; font-weight: 700; margin:0;">
                        Confirme seu e-mail
                      </div>

                      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 14px; line-height: 22px; color:#374151; margin-top: 10px;">
                        Olá${userName},<br/>
                        Para concluir a criação da sua conta, use o código abaixo. Ele expira em <strong>30 minutos</strong>.
                      </div>

                      <div style="margin-top: 18px; background:#f9fafb; border:1px solid #e5e7eb; border-radius: 14px; padding: 18px; text-align:center;">
                        <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 34px; letter-spacing: 10px; color:#111827; font-weight: 700;">
                          ${code}
                        </div>
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 12px; line-height: 18px; color:#6b7280; margin-top: 8px;">
                          Se você não solicitou este código, pode ignorar este e-mail.
                        </div>
                      </div>

                      <div style="margin-top: 18px;">
                        <a href="${verificationUrl}" style="display:inline-block; background:#111827; color:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 14px; font-weight: 700; padding: 12px 16px; border-radius: 12px;">
                          Confirmar e-mail
                        </a>
                      </div>

                      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 12px; line-height: 18px; color:#6b7280; margin-top: 18px;">
                        Se o botão não funcionar, copie e cole este link no navegador:<br/>
                        <span style="word-break: break-all; color:#111827;">${verificationUrl}</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="left" class="px" style="padding: 14px 28px 0 28px;">
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 12px; line-height: 18px; color:#9ca3af;">
                  © ${year} G-CRM. Todos os direitos reservados.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

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

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    // Generate verification data
    const verificationCode = generateVerificationCode()
    const verificationToken = crypto.randomUUID()
    const expires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires,
      }
    })

    // Build verification URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://gcrm-wheat.vercel.app'
    const verificationUrl = `${baseUrl}/api/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`

    // Send email (don't fail registration if email fails)
    try {
      await resend.emails.send({
        from: 'G-CRM <onboarding@resend.dev>',
        to: email,
        subject: 'Confirme seu e-mail - G-CRM',
        html: getEmailTemplate(name, verificationCode, verificationUrl),
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue - user was created, they can request resend later
    }

    return NextResponse.json(
      { message: 'Conta criada! Verifique seu email.' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error?.message || error)

    // Return more specific error for debugging
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
