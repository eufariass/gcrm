'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Plus, Search, Phone, Calendar, Mail, MoreHorizontal,
    DollarSign, Building2, Clock, ChevronDown, Filter, SlidersHorizontal
} from "lucide-react"

type Lead = {
    id: string
    name: string
    email: string
    phone: string
    interest: string
    budget: string
    source: string
    createdAt: string
}

type Column = {
    id: string
    title: string
    color: string
    leads: Lead[]
}

export default function LeadsPage() {
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'new',
            title: 'Novos Leads',
            color: 'bg-blue-500',
            leads: [
                { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-1111', interest: 'Apartamento 3 quartos', budget: 'R$ 800K - 1.2M', source: 'Portal', createdAt: '2 min atrás' },
                { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 99999-2222', interest: 'Casa em condomínio', budget: 'R$ 1.5M - 2M', source: 'Google', createdAt: '15 min atrás' },
                { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 99999-3333', interest: 'Studio', budget: 'Até R$ 500K', source: 'Indicação', createdAt: '1h atrás' },
            ]
        },
        {
            id: 'contacted',
            title: 'Contato Realizado',
            color: 'bg-cyan-500',
            leads: [
                { id: '4', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 99999-4444', interest: 'Cobertura', budget: 'R$ 2M - 3M', source: 'Instagram', createdAt: '2h atrás' },
                { id: '5', name: 'Carlos Ferreira', email: 'carlos@email.com', phone: '(11) 99999-5555', interest: 'Apartamento 2 quartos', budget: 'R$ 600K - 800K', source: 'Portal', createdAt: '3h atrás' },
            ]
        },
        {
            id: 'visit',
            title: 'Visita Agendada',
            color: 'bg-violet-500',
            leads: [
                { id: '6', name: 'Fernanda Lima', email: 'fernanda@email.com', phone: '(11) 99999-6666', interest: 'Casa térrea', budget: 'R$ 900K - 1.1M', source: 'Facebook', createdAt: 'Ontem' },
            ]
        },
        {
            id: 'proposal',
            title: 'Proposta Enviada',
            color: 'bg-orange-500',
            leads: [
                { id: '7', name: 'Roberto Alves', email: 'roberto@email.com', phone: '(11) 99999-7777', interest: 'Apartamento 4 quartos', budget: 'R$ 1.8M - 2.2M', source: 'Indicação', createdAt: '2 dias atrás' },
            ]
        },
        {
            id: 'closed',
            title: 'Fechado',
            color: 'bg-green-500',
            leads: [
                { id: '8', name: 'Lucia Mendes', email: 'lucia@email.com', phone: '(11) 99999-8888', interest: 'Apartamento Jardins', budget: 'R$ 1.2M', source: 'Portal', createdAt: '3 dias atrás' },
            ]
        },
    ])

    const [draggedLead, setDraggedLead] = useState<{ lead: Lead; columnId: string } | null>(null)

    const handleDragStart = (lead: Lead, columnId: string) => {
        setDraggedLead({ lead, columnId })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (targetColumnId: string) => {
        if (!draggedLead || draggedLead.columnId === targetColumnId) return

        setColumns(columns.map(col => {
            if (col.id === draggedLead.columnId) {
                return { ...col, leads: col.leads.filter(l => l.id !== draggedLead.lead.id) }
            }
            if (col.id === targetColumnId) {
                return { ...col, leads: [...col.leads, draggedLead.lead] }
            }
            return col
        }))
        setDraggedLead(null)
    }

    const totalLeads = columns.reduce((acc, col) => acc + col.leads.length, 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                    <p className="text-gray-500 mt-1">{totalLeads} leads ativos no pipeline</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Lead
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Buscar por nome, email ou interesse..." className="pl-10" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar
                </Button>
                <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Ordenar
                </Button>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className="flex-shrink-0 w-80"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(column.id)}
                    >
                        <div className="bg-gray-100 rounded-xl p-4 min-h-[600px]">
                            {/* Column Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                                    <Badge variant="secondary" className="ml-1">{column.leads.length}</Badge>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Lead Cards */}
                            <div className="space-y-3">
                                {column.leads.map((lead) => (
                                    <Card
                                        key={lead.id}
                                        draggable
                                        onDragStart={() => handleDragStart(lead, column.id)}
                                        className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-0 shadow-sm bg-white"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm">
                                                        {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate">{lead.name}</h4>
                                                    <p className="text-sm text-gray-500 truncate">{lead.email}</p>
                                                </div>
                                            </div>

                                            <div className="mt-3 space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Building2 className="w-4 h-4 text-gray-400" />
                                                    <span className="truncate">{lead.interest}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                                    <span>{lead.budget}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    {lead.createdAt}
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-green-50 hover:text-green-600">
                                                        <Phone className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-blue-50 hover:text-blue-600">
                                                        <Mail className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-violet-50 hover:text-violet-600">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Add Lead Button */}
                                <Button variant="ghost" className="w-full justify-start gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200/50">
                                    <Plus className="w-4 h-4" />
                                    Adicionar lead
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
