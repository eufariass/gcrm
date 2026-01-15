import Link from 'next/link'
import {
    Building2,
    ArrowRight,
    Users,
    BarChart3,
    Calendar,
    MessageSquare,
    Target,
    Zap,
    Shield,
    CheckCircle2,
    ChevronRight,
    Play,
    Star
} from 'lucide-react'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">G-CRM</span>
                        </div>

                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#funcionalidades" className="text-gray-600 hover:text-violet-600 transition-colors">Funcionalidades</a>
                            <a href="#beneficios" className="text-gray-600 hover:text-violet-600 transition-colors">Benefícios</a>
                            <a href="#depoimentos" className="text-gray-600 hover:text-violet-600 transition-colors">Depoimentos</a>
                            <a href="#planos" className="text-gray-600 hover:text-violet-600 transition-colors">Planos</a>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
                                Entrar
                            </Link>
                            <Link
                                href="/demo"
                                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                            >
                                Testar Grátis
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-violet-50 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 font-medium text-sm">
                                <Zap className="w-4 h-4" />
                                CRM #1 para Imobiliárias
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                O CRM que
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700"> transforma </span>
                                sua imobiliária
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Gerencie leads, automatize processos e aumente suas vendas com a plataforma mais completa para o mercado imobiliário.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/demo"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-violet-500/30 transition-all text-lg"
                                >
                                    Começar Agora
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-violet-300 hover:text-violet-700 transition-all text-lg">
                                    <Play className="w-5 h-5" />
                                    Ver Demo
                                </button>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white" />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">+2.000 imobiliárias confiam no G-CRM</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-violet-500/10 p-6 border border-gray-100">
                                <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center">
                                            <BarChart3 className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="text-gray-500">Dashboard Preview</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating cards */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">+34% Conversão</p>
                                        <p className="text-sm text-gray-500">Este mês</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">847 Leads</p>
                                        <p className="text-sm text-gray-500">Ativos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logos Section */}
            <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-500 mb-8">Imobiliárias de todo Brasil confiam no G-CRM</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                        {['Imobiliária Premium', 'Casa Nova', 'Lar Ideal', 'Imóveis Plus', 'Morada'].map(name => (
                            <div key={name} className="text-2xl font-bold text-gray-400">{name}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="funcionalidades" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-violet-600 font-semibold">FUNCIONALIDADES</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                            Tudo que sua imobiliária precisa em um só lugar
                        </h2>
                        <p className="text-xl text-gray-600">
                            Ferramentas poderosas para gestão de leads, automação de marketing e análise de resultados.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: 'Pipeline de Vendas',
                                description: 'Visualize todo o funil de vendas em um quadro Kanban intuitivo.',
                                color: 'violet'
                            },
                            {
                                icon: Users,
                                title: 'Gestão de Leads',
                                description: 'Capture, organize e converta mais leads com automações inteligentes.',
                                color: 'blue'
                            },
                            {
                                icon: BarChart3,
                                title: 'Relatórios Avançados',
                                description: 'Dashboards em tempo real com métricas de conversão e performance.',
                                color: 'green'
                            },
                            {
                                icon: Calendar,
                                title: 'Agenda Integrada',
                                description: 'Agende visitas e compromissos sincronizados com Google Calendar.',
                                color: 'orange'
                            },
                            {
                                icon: MessageSquare,
                                title: 'WhatsApp Integrado',
                                description: 'Comunique-se com clientes diretamente pelo WhatsApp Business.',
                                color: 'emerald'
                            },
                            {
                                icon: Shield,
                                title: 'Matching Automático',
                                description: 'IA que cruza preferências do lead com imóveis disponíveis.',
                                color: 'purple'
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="beneficios" className="py-24 bg-gradient-to-br from-violet-900 via-purple-900 to-violet-800">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="text-violet-300 font-semibold">POR QUE ESCOLHER O G-CRM?</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                Aumente sua produtividade e venda mais imóveis
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { title: 'Aumento de 40%', desc: 'na taxa de conversão de leads' },
                                    { title: '3x mais rápido', desc: 'no tempo de resposta aos clientes' },
                                    { title: '60% menos tempo', desc: 'em tarefas administrativas' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-violet-300" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                            <p className="text-violet-200">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/demo"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-semibold rounded-xl hover:shadow-xl transition-all text-lg"
                            >
                                Começar Gratuitamente
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { value: '2.000+', label: 'Imobiliárias' },
                                        { value: '50.000+', label: 'Usuários' },
                                        { value: '1M+', label: 'Leads Gerenciados' },
                                        { value: '98%', label: 'Satisfação' },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center p-6 rounded-xl bg-white/5">
                                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                            <p className="text-violet-200">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="depoimentos" className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-violet-600 font-semibold">DEPOIMENTOS</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                            O que nossos clientes dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Carlos Silva',
                                role: 'Diretor, Imobiliária Premium',
                                text: 'O G-CRM transformou nossa operação. Aumentamos as vendas em 45% no primeiro trimestre.',
                            },
                            {
                                name: 'Ana Paula Santos',
                                role: 'Gerente Comercial, Casa Nova',
                                text: 'A integração com WhatsApp foi um divisor de águas. Nosso tempo de resposta caiu drasticamente.',
                            },
                            {
                                name: 'Roberto Mendes',
                                role: 'CEO, Lar Ideal',
                                text: 'Finalmente um CRM feito para imobiliárias. A curva de aprendizado é mínima e os resultados são imediatos.',
                            },
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-violet-600 to-purple-700">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Pronto para transformar sua imobiliária?
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                        Comece gratuitamente e veja os resultados em poucos dias. Sem cartão de crédito.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 font-semibold rounded-xl hover:shadow-xl transition-all text-lg"
                        >
                            Testar Grátis por 14 Dias
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contato"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
                        >
                            Falar com Especialista
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">G-CRM</span>
                            </div>
                            <p className="text-gray-400">
                                O CRM imobiliário mais completo do Brasil. Transforme sua operação.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Produto</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Empresa</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Suporte</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} G-CRM. Todos os direitos reservados.</p>
                        <div className="flex gap-6 text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
