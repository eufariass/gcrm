export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-between bg-[#1a0b3c] p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/dashboard-preview.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-purple-900/90" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-violet-600 rounded-sm" />
                        </div>
                        <span className="text-xl font-bold">G-CRM</span>
                    </div>

                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Gerencie sua imobiliária com inteligência e precisão.
                    </h1>
                    <p className="text-violet-200 text-lg">
                        A plataforma mais completa para corretores de alta performance.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 text-violet-200 text-sm">
                        <span>&copy; {new Date().getFullYear()} G-CRM</span>
                        <span className="w-1 h-1 bg-violet-500 rounded-full" />
                        <span>Termos</span>
                        <span className="w-1 h-1 bg-violet-500 rounded-full" />
                        <span>Privacidade</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-[400px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
