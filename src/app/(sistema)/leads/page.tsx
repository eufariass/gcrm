'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Users,
    MapPin,
    Phone,
    MoreHorizontal,
    Calendar,
    DollarSign
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const columns = [
    { id: 'new', title: 'Novos Leads', color: 'blue' },
    { id: 'contacted', title: 'Em Atendimento', color: 'violet' },
    { id: 'visit', title: 'Visita Agendada', color: 'orange' },
    { id: 'proposal', title: 'Proposta', color: 'purple' },
    { id: 'closed', title: 'Fechado', color: 'green' }
]

const initialLeads = [
    {
        id: 1,
        name: 'Ricardo Oliveira',
        phone: '(11) 99999-9999',
        interest: 'Apartamento Jardins',
        budget: 'R$ 1.5M',
        status: 'new',
        avatar: 'RO',
        date: '2h atrás'
    },
    {
        id: 2,
        name: 'Fernanda Costa',
        phone: '(11) 98888-8888',
        interest: 'Casa Condomínio',
        budget: 'R$ 2.2M',
        status: 'contacted',
        avatar: 'FC',
        date: '1d atrás'
    },
    {
        id: 3,
        name: 'Marcelo Santos',
        phone: '(11) 97777-7777',
        interest: 'Cobertura Pinheiros',
        budget: 'R$ 3.5M',
        status: 'visit',
        avatar: 'MS',
        date: '3d atrás'
    }
]

export default function LeadsPage() {
    const [leads, setLeads] = useState(initialLeads)

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pipeline de Vendas</h1>
                    <p className="text-gray-500 mt-2">Gerencie e acompanhe seus leads pelo funil</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700">
                    <Users className="w-4 h-4 mr-2" />
                    Novo Lead
                </Button>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex gap-6 h-full min-w-[1200px]">
                    {columns.map((column) => (
                        <div key={column.id} className="flex-1 flex flex-col min-w-[280px] bg-gray-50/50 rounded-xl border border-gray-200 h-full">
                            <div className={`p-4 border-b border-gray-100 bg-white rounded-t-xl flex items-center justify-between sticky top-0`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full bg-${column.color}-500`} />
                                    <h3 className="font-semibold text-gray-700">{column.title}</h3>
                                </div>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                    {leads.filter(lead => lead.status === column.id).length}
                                </Badge>
                            </div>

                            <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                                {leads.filter(lead => lead.status === column.id).map((lead) => (
                                    <Card key={lead.id} className="bg-white hover:shadow-md transition-all cursor-move border-gray-200 group relative">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-xs font-bold text-violet-700">
                                                        {lead.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{lead.name}</p>
                                                        <p className="text-xs text-gray-500">{lead.date}</p>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Editar Lead</DropdownMenuItem>
                                                        <DropdownMenuItem>Agendar Visita</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">Arquivar</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-1.5 rounded-md">
                                                    <MapPin className="w-3 h-3 text-gray-400" />
                                                    <span className="truncate">{lead.interest}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-1.5 rounded-md font-medium">
                                                    <DollarSign className="w-3 h-3" />
                                                    {lead.budget}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-violet-600 transition-colors">
                                                    <Phone className="w-3 h-3" />
                                                    Ligar
                                                </a>
                                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-violet-600 transition-colors">
                                                    <Calendar className="w-3 h-3" />
                                                    Agendar
                                                </button>
                                            </div>
                                        </CardContent>

                                        {/* Visual drag handle */}
                                        <div className="absolute top-1/2 -right-1 w-1 h-8 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 cursor-grab" />
                                    </Card>
                                ))}

                                {leads.filter(lead => lead.status === column.id).length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                        Arraste um lead para cá
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
