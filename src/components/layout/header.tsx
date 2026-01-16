'use client'

import { Bell, Search, Menu, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const { data: session } = useSession()

    const userName = session?.user?.name || 'Usuário'
    const userEmail = session?.user?.email || ''
    const userImage = session?.user?.image
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 w-96">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar imóveis, leads ou contratos..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                <div className="h-8 w-[1px] bg-gray-200" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3 pl-2 outline-none">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{userEmail}</p>
                        </div>
                        {userImage ? (
                            <img
                                src={userImage}
                                alt={userName}
                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                                {initials}
                            </div>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                            <p className="text-sm font-medium">{userName}</p>
                            <p className="text-xs text-gray-500">{userEmail}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 cursor-pointer">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair do Sistema
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
