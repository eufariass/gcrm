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
        default: 'Geum Imobiliária | Imóveis de Alto Padrão',
        template: '%s | Geum Imobiliária',
    },
    description: 'Encontre o imóvel dos seus sonhos com a Geum Imobiliária. Apartamentos, casas e imóveis comerciais de alto padrão.',
    keywords: ['imobiliária', 'imóveis', 'apartamentos', 'casas', 'aluguel', 'venda', 'alto padrão'],
    authors: [{ name: 'Geum Imobiliária' }],
    creator: 'Geum Imobiliária',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://geum.com.br',
        siteName: 'Geum Imobiliária',
        title: 'Geum Imobiliária | Imóveis de Alto Padrão',
        description: 'Encontre o imóvel dos seus sonhos com a Geum Imobiliária.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Geum Imobiliária',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Geum Imobiliária | Imóveis de Alto Padrão',
        description: 'Encontre o imóvel dos seus sonhos com a Geum Imobiliária.',
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
