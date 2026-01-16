'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Building2, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
    Calendar, FileText, Plus, Eye, Phone
} from "lucide-react"

// Simple bar chart component
function SimpleBarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
    const maxValue = Math.max(...data.map(d => d.value))

    return (
        <div className="flex items-end justify-between h-48 gap-2 pt-4">
            {data.map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                    <div
                        className={`w-full rounded-t-lg ${item.color} transition-all duration-500`}
                        style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: '8px' }}
                    />
                    <span className="text-xs text-gray-500 mt-2 text-center">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
            ))}
        </div>
    )
}

// Donut chart component
function DonutChart({ value, total, label }: { value: number; total: number; label: string }) {
    const percentage = (value / total) * 100
    const circumference = 2 * Math.PI * 40
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="40" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle
                    cx="64" cy="64" r="40"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(1)}%</span>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const pipelineData = [
        { label: 'Novos', value: 45, color: 'bg-blue-500' },
        { label: 'Contato', value: 32, color: 'bg-cyan-500' },
        { label: 'Visita', value: 28, color: 'bg-violet-500' },
        { label: 'Proposta', value: 15, color: 'bg-orange-500' },
        { label: 'Fechado', value: 8, color: 'bg-green-500' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Bem-vindo de volta! Aqui está sua performance.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Último mês
                    </Button>
                    <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Lead
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Total de Leads",
                        value: "847",
                        change: "+12%",
                        trend: "up",
                        icon: Users,
                        gradient: "from-blue-500 to-blue-600"
                    },
                    {
                        title: "Imóveis Ativos",
                        value: "124",
                        change: "+4",
                        trend: "up",
                        icon: Building2,
                        gradient: "from-violet-500 to-violet-600"
                    },
                    {
                        title: "Vendas (Mês)",
                        value: "R$ 2.4M",
                        change: "+18%",
                        trend: "up",
                        icon: DollarSign,
                        gradient: "from-green-500 to-green-600"
                    },
                    {
                        title: "Taxa de Conversão",
                        value: "3.2%",
                        change: "-0.4%",
                        trend: "down",
                        icon: TrendingUp,
                        gradient: "from-orange-500 to-orange-600"
                    }
                ].map((stat, i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <p className={`text-sm flex items-center mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                                        {stat.change} vs mês anterior
                                    </p>
                                </div>
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Pipeline Chart */}
                <Card className="lg:col-span-2 shadow-md border-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Pipeline de Vendas</CardTitle>
                        <Button variant="ghost" size="sm" className="text-violet-600">
                            Ver detalhes
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <SimpleBarChart data={pipelineData} />
                    </CardContent>
                </Card>

                {/* Conversion Rate */}
                <Card className="shadow-md border-0">
                    <CardHeader>
                        <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <DonutChart value={27} total={847} label="Convertidos" />
                        <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">27</p>
                                <p className="text-xs text-gray-500">Vendas fechadas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">820</p>
                                <p className="text-xs text-gray-500">Em negociação</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="shadow-md border-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { icon: Users, text: 'Novo lead: João Silva', time: '2 min', color: 'bg-blue-500' },
                                { icon: DollarSign, text: 'Venda: Apt Jardins', time: '2h', color: 'bg-green-500' },
                                { icon: Eye, text: 'Visita agendada: Carla', time: '4h', color: 'bg-violet-500' },
                                { icon: Building2, text: 'Imóvel atualizado', time: 'Ontem', color: 'bg-orange-500' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className={`p-2 rounded-lg ${activity.color}`}>
                                        <activity.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Properties */}
                <Card className="shadow-md border-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Imóveis em Destaque</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: 'Apartamento Jardins', price: 'R$ 1.2M', views: 234 },
                                { title: 'Casa Alphaville', price: 'R$ 2.8M', views: 189 },
                                { title: 'Cobertura Pinheiros', price: 'R$ 3.5M', views: 156 },
                                { title: 'Studio Vila Mariana', price: 'R$ 450K', views: 142 },
                            ].map((property, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{property.title}</p>
                                        <p className="text-xs text-gray-500">{property.price}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Eye className="w-3 h-3" />
                                        {property.views}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-md border-0">
                    <CardHeader>
                        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Button className="w-full justify-start gap-3 bg-violet-600 hover:bg-violet-700">
                                <Plus className="w-4 h-4" />
                                Cadastrar Imóvel
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Users className="w-4 h-4" />
                                Novo Lead
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <FileText className="w-4 h-4" />
                                Gerar Contrato
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Phone className="w-4 h-4" />
                                Agendar Visita
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
