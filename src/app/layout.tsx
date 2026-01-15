import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'G-CRM | CRM Imobiliário #1 do Brasil',
        template: '%s | G-CRM',
    },
    description: 'O CRM imobiliário mais completo do Brasil. Gerencie leads, automatize processos e aumente suas vendas. Teste grátis por 14 dias.',
    keywords: ['CRM imobiliário', 'CRM para imobiliárias', 'gestão de leads', 'software imobiliário', 'pipeline de vendas'],
    authors: [{ name: 'G-CRM' }],
    creator: 'G-CRM',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://gcrm.com.br',
        siteName: 'G-CRM',
        title: 'G-CRM | CRM Imobiliário #1 do Brasil',
        description: 'O CRM imobiliário mais completo do Brasil. Gerencie leads e aumente suas vendas.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'G-CRM - CRM Imobiliário',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'G-CRM | CRM Imobiliário #1 do Brasil',
        description: 'O CRM imobiliário mais completo do Brasil. Gerencie leads e aumente suas vendas.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={inter.variable}>
            <body className="min-h-screen font-sans">
                {children}
            </body>
        </html>
    )
}
