'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Building2,
    Users,
    FileText,
    Settings,
    PieChart,
    LogOut
} from 'lucide-react'

const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/imoveis', label: 'Imóveis', icon: Building2 },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/contratos', label: 'Contratos', icon: FileText },
    { href: '/relatorios', label: 'Relatórios', icon: PieChart },
    { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Logo size="md" />
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Menu Principal
                </p>

                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-violet-50 text-violet-700 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-violet-600" : "text-gray-400 group-hover:text-gray-600"
                            )} />
                            {item.label}
                        </Link>
                    )
                })}
            </div>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sair do Sistema
                </button>
            </div>
        </aside>
    )
}
