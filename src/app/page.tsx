'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import {
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
    Star,
    Menu,
    X,
    Building2
} from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-violet-100 selection:text-violet-900">
            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <Logo size="md" />
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            {['Funcionalidades', 'Benefícios', 'Depoimentos', 'Planos'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-600 hover:text-violet-600 font-medium transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/login" className="text-gray-600 hover:text-violet-600 transition-colors font-medium px-4 py-2">
                                Entrar
                            </Link>
                            <Link
                                href="/demo"
                                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all transform hover:-translate-y-0.5"
                            >
                                Testar Grátis
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:hidden border-t border-gray-100 bg-white"
                    >
                        <div className="container px-4 py-4 flex flex-col gap-4">
                            {['Funcionalidades', 'Benefícios', 'Depoimentos', 'Planos'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-600 font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/login"
                                    className="w-full text-center py-2.5 text-gray-600 font-medium bg-gray-50 rounded-lg"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/demo"
                                    className="w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-lg"
                                >
                                    Testar Grátis
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-violet-50/50 via-white to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="space-y-8"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100/80 backdrop-blur-sm rounded-full text-violet-700 font-medium text-sm border border-violet-200">
                                <Zap className="w-4 h-4" />
                                CRM #1 para Imobiliárias
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                                O CRM que
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600"> transforma </span>
                                sua imobiliária
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Gerencie leads, automatize processos e aumente suas vendas com a plataforma mais completa para o mercado imobiliário.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/demo"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-violet-500/30 transition-all text-lg hover:-translate-y-1"
                                >
                                    Começar Agora
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all text-lg">
                                    <Play className="w-5 h-5" />
                                    Ver Demo
                                </button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white flex items-center justify-center overflow-hidden relative">
                                            {/* Placeholder avatars since we don't have real user images */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-purple-200 opacity-50" />
                                            <Users className="w-5 h-5 text-gray-400 relative z-10" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">+2.000 imobiliárias confiam</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative lg:h-[600px] flex items-center"
                        >
                            <div className="relative z-10 w-full">
                                <div className="relative rounded-2xl shadow-2xl shadow-violet-500/20 border border-gray-100 bg-white overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 pointer-events-none" />
                                    <Image
                                        src="/dashboard-preview.png"
                                        alt="G-CRM Dashboard Preview"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>

                                {/* Floating cards */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="absolute -top-6 -right-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">+34%</p>
                                            <p className="text-sm text-gray-500 font-medium">Conversão este mês</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                            <Users className="w-6 h-6 text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">847 Leads</p>
                                            <p className="text-sm text-gray-500 font-medium">Ativos no pipeline</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Background decorative elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-violet-100/50 to-purple-100/50 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Logos Section */}
            <section className="py-12 bg-white border-y border-gray-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
                        TRUSTED BY THE BEST REAL ESTATE COMPANIES
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Using text for logos to keep it simple but styled properly */}
                        {['RE/MAX Select', 'Century 21', 'Keller Williams', 'Sotheby\'s', 'Coldwell Banker'].map(name => (
                            <h3 key={name} className="text-xl md:text-2xl font-bold font-serif text-gray-800">{name}</h3>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="funcionalidades" className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold tracking-wide"
                        >
                            FUNCIONALIDADES
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-6"
                        >
                            Tudo que sua imobiliária precisa em um só lugar
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600"
                        >
                            Ferramentas poderosas para gestão de leads, automação de marketing e análise de resultados.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: 'Pipeline de Vendas',
                                description: 'Visualize todo o funil de vendas em um quadro Kanban intuitivo e arraste leads entre etapas.',
                                color: 'violet',
                                delay: 0
                            },
                            {
                                icon: Users,
                                title: 'Gestão de Leads',
                                description: 'Capture, organize e converta mais leads com automações inteligentes e distribuição automática.',
                                color: 'blue',
                                delay: 0.1
                            },
                            {
                                icon: BarChart3,
                                title: 'Relatórios Avançados',
                                description: 'Dashboards em tempo real com métricas detalhadas de conversão, performance de equipe e ROI.',
                                color: 'purple',
                                delay: 0.2
                            },
                            {
                                icon: Calendar,
                                title: 'Agenda Integrada',
                                description: 'Agende visitas e compromissos sincronizados com Google Calendar e notificações automáticas.',
                                color: 'fuchsia',
                                delay: 0.3
                            },
                            {
                                icon: MessageSquare,
                                title: 'WhatsApp Integrado',
                                description: 'Comunique-se com clientes diretamente pelo WhatsApp Business sem sair da plataforma.',
                                color: 'emerald',
                                delay: 0.4
                            },
                            {
                                icon: Shield,
                                title: 'Matching Automático',
                                description: 'IA que cruza preferências do lead com imóveis disponíveis para sugerir as melhores opções.',
                                color: 'indigo',
                                delay: 0.5
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: feature.delay }}
                                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <feature.icon className={`w-24 h-24 text-${feature.color}-500 transform rotate-12 group-hover:scale-110 transition-transform`} />
                                </div>

                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-sm`}>
                                    <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{feature.title}</h3>
                                <p className="text-gray-600 relative z-10 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="beneficios" className="py-24 bg-[#1a0b3c] relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                                <span className="text-violet-200 font-semibold text-sm">POR QUE ESCOLHER O G-CRM?</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                Aumente sua produtividade e venda mais imóveis
                            </h2>
                            <p className="text-violet-200 text-lg leading-relaxed">
                                Nossa plataforma foi desenhada por corretores para corretores. Elimine a burocracia e foque no que realmente importa: vender.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Aumento de 40%', desc: 'na taxa de conversão de leads qualificados' },
                                    { title: '3x mais rápido', desc: 'no tempo de resposta aos clientes interessados' },
                                    { title: '60% menos tempo', desc: 'gasto em tarefas administrativas manuais' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-900/50">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-violet-300">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link
                                href="/demo"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-900 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all text-lg group"
                            >
                                Começar Gratuitamente
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { value: '2.000+', label: 'Imobiliárias', icon: Building2 },
                                        { value: '50.000+', label: 'Usuários', icon: Users },
                                        { value: '1M+', label: 'Leads Gerenciados', icon: Target },
                                        { value: '98%', label: 'Satisfação', icon: Star },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                                            <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                            <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                            <p className="text-violet-300 font-medium">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="depoimentos" className="py-24 bg-white text-center">
                {/* ... (Kept similar but enhanced with motion) ... */}
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-violet-600 font-semibold tracking-wide">DEPOIMENTOS</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
                            O que nossos clientes dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Carlos Silva',
                                role: 'Diretor, Imobiliária Premium',
                                text: 'O G-CRM transformou nossa operação. Aumentamos as vendas em 45% no primeiro trimestre de uso.',
                                company: 'Premium Real Estate'
                            },
                            {
                                name: 'Ana Paula Santos',
                                role: 'Gerente Comercial, Casa Nova',
                                text: 'A integração com WhatsApp foi um divisor de águas. Nosso tempo de resposta caiu drasticamente.',
                                company: 'Casa Nova Imóveis'
                            },
                            {
                                name: 'Roberto Mendes',
                                role: 'CEO, Lar Ideal',
                                text: 'Finalmente um CRM feito para imobiliárias. A curva de aprendizado é mínima e os resultados são imediatos.',
                                company: 'Lar Ideal'
                            },
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all text-left"
                            >
                                <div className="flex items-center gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-8 leading-relaxed font-medium text-lg">&ldquo;{testimonial.text}&rdquo;</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-200 to-purple-300 rounded-full flex items-center justify-center text-violet-700 font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-violet-600 to-purple-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Pronto para transformar a gestão <br /> da sua imobiliária?
                        </h2>
                        <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
                            Comece gratuitamente agora mesmo e veja os resultados em poucos dias. Sem cartão de crédito necessário para o teste.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/demo"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all text-lg"
                            >
                                Testar Grátis por 14 Dias
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contato"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg backdrop-blur-sm"
                            >
                                Falar com Especialista
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-white py-16 border-t border-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-6">
                            <Link href="/" className="inline-block">
                                <Logo size="lg" className="text-white" />
                            </Link>
                            <p className="text-gray-400 leading-relaxed">
                                O CRM imobiliário mais completo do Brasil. Desenvolvido para acelerar vendas e gestão de imóveis.
                            </p>
                            <div className="flex gap-4">
                                {/* Social placeholders */}
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-violet-600 transition-colors flex items-center justify-center cursor-pointer">
                                        <div className="w-5 h-5 bg-gray-400 rounded-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Produto</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Funcionalidades</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Integrações</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Preços</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Atualizações</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Empresa</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Sobre Nós</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Carreiras</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Contato</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Suporte</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Central de Ajuda</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Documentação</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">Status do Sistema</a></li>
                                <li><a href="#" className="hover:text-violet-400 transition-colors">API Developers</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} G-CRM Tecnologia. Todos os direitos reservados.</p>
                        <div className="flex gap-8 text-gray-500 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
