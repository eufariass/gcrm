import Link from 'next/link'
import { Building2, ArrowRight, Search, Shield, Users } from 'lucide-react'

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-geum-dark via-geum-gray to-geum-dark overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`
                    }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="p-3 bg-geum-gold rounded-xl">
                            <Building2 className="w-10 h-10 text-geum-dark" />
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            Geum <span className="text-geum-gold">Imobiliária</span>
                        </h1>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6">
                        Encontre o imóvel <br />
                        <span className="text-geum-gold">perfeito para você</span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Imóveis exclusivos de alto padrão com atendimento personalizado.
                        Sua nova história começa aqui.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Busque por bairro, cidade ou tipo de imóvel..."
                                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-geum-gold"
                                />
                            </div>
                            <Link
                                href="/imoveis"
                                className="px-8 py-4 bg-geum-gold text-geum-dark font-semibold rounded-xl hover:bg-geum-gold/90 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Buscar
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-geum-gold mb-1">500+</div>
                            <div className="text-gray-400">Imóveis disponíveis</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-geum-gold mb-1">1.200+</div>
                            <div className="text-gray-400">Clientes satisfeitos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-geum-gold mb-1">15+</div>
                            <div className="text-gray-400">Anos de experiência</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Por que escolher a <span className="text-geum-gold">Geum</span>?
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="w-16 h-16 bg-geum-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-geum-gold" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Busca Inteligente</h4>
                            <p className="text-gray-600">
                                Encontre imóveis que combinam com seu perfil através do nosso sistema de matching.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="w-16 h-16 bg-geum-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-geum-gold" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Atendimento Premium</h4>
                            <p className="text-gray-600">
                                Corretores especializados dedicados a encontrar o imóvel ideal para você.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="w-16 h-16 bg-geum-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-geum-gold" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Segurança Garantida</h4>
                            <p className="text-gray-600">
                                Toda documentação verificada e processos transparentes do início ao fim.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-geum-dark">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Pronto para encontrar seu novo lar?
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Entre em contato conosco e deixe nossos especialistas ajudarem você a realizar o sonho do imóvel próprio.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/imoveis"
                            className="px-8 py-4 bg-geum-gold text-geum-dark font-semibold rounded-xl hover:bg-geum-gold/90 transition-all hover:shadow-lg"
                        >
                            Ver imóveis disponíveis
                        </Link>
                        <Link
                            href="/contato"
                            className="px-8 py-4 bg-transparent border-2 border-geum-gold text-geum-gold font-semibold rounded-xl hover:bg-geum-gold/10 transition-all"
                        >
                            Falar com um corretor
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-geum-gray border-t border-gray-800">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Geum Imobiliária. Todos os direitos reservados.</p>
                </div>
            </footer>
        </main>
    )
}
