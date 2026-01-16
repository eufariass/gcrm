'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    TrendingUp, TrendingDown, DollarSign, Users, Building2,
    FileText, Calendar, Download, BarChart3, PieChart
} from "lucide-react"

// Simple line chart visualization
function SimpleTrendLine({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
        <div className="flex items-end h-16 gap-1">
            {data.map((value, i) => (
                <div
                    key={i}
                    className={`flex-1 ${color} rounded-t opacity-80 hover:opacity-100 transition-opacity`}
                    style={{ height: `${((value - min) / range) * 100}%`, minHeight: '4px' }}
                />
            ))}
        </div>
    )
}

export default function RelatoriosPage() {
    const monthlyData = [45, 52, 38, 65, 72, 58, 80, 75, 90, 85, 95, 88]
    const leadsData = [120, 145, 132, 168, 155, 180, 195, 210, 188, 225, 240, 255]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
                    <p className="text-gray-500 mt-2">Análise de performance e métricas do negócio</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Janeiro 2024
                    </Button>
                    <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                        <Download className="w-4 h-4" />
                        Exportar PDF
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: 'Receita Total',
                        value: 'R$ 4.2M',
                        change: '+23%',
                        trend: 'up',
                        icon: DollarSign,
                        data: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90]
                    },
                    {
                        title: 'Novos Leads',
                        value: '847',
                        change: '+12%',
                        trend: 'up',
                        icon: Users,
                        data: leadsData
                    },
                    {
                        title: 'Imóveis Vendidos',
                        value: '27',
                        change: '+8%',
                        trend: 'up',
                        icon: Building2,
                        data: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8]
                    },
                    {
                        title: 'Taxa Conversão',
                        value: '3.2%',
                        change: '-0.4%',
                        trend: 'down',
                        icon: TrendingUp,
                        data: [3.5, 3.4, 3.6, 3.3, 3.5, 3.2, 3.4, 3.1, 3.3, 3.0, 3.2, 3.2]
                    },
                ].map((kpi, i) => (
                    <Card key={i} className="border-0 shadow-md overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-violet-100 rounded-lg">
                                    <kpi.icon className="w-5 h-5 text-violet-600" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    {kpi.change}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{kpi.title}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                            <div className="mt-4">
                                <SimpleTrendLine data={kpi.data.map(d => typeof d === 'number' ? d : 0)} color={kpi.trend === 'up' ? 'bg-green-400' : 'bg-red-400'} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-violet-600" />
                                Vendas por Mês
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between h-48 gap-2">
                            {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((month, i) => (
                                <div key={i} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg transition-all hover:from-violet-700 hover:to-violet-500"
                                        style={{ height: `${monthlyData[i]}%` }}
                                    />
                                    <span className="text-xs text-gray-500 mt-2">{month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-violet-600" />
                                Origem dos Leads
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center gap-8">
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20"
                                        strokeDasharray="125.6 251.2" strokeLinecap="round" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                                        strokeDasharray="62.8 251.2" strokeDashoffset="-125.6" strokeLinecap="round" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20"
                                        strokeDasharray="37.68 251.2" strokeDashoffset="-188.4" strokeLinecap="round" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20"
                                        strokeDasharray="25.12 251.2" strokeDashoffset="-226.08" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Portal Imobiliário', value: '50%', color: 'bg-violet-500' },
                                    { label: 'Google Ads', value: '25%', color: 'bg-blue-500' },
                                    { label: 'Indicação', value: '15%', color: 'bg-green-500' },
                                    { label: 'Redes Sociais', value: '10%', color: 'bg-orange-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm text-gray-600">{item.label}</span>
                                        <span className="text-sm font-semibold text-gray-900 ml-auto">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performers */}
            <Card className="border-0 shadow-md">
                <CardHeader>
                    <CardTitle>Top Corretores do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: 'Carlos Silva', sales: 8, revenue: 'R$ 1.2M', rank: 1 },
                            { name: 'Ana Costa', sales: 6, revenue: 'R$ 980K', rank: 2 },
                            { name: 'Pedro Santos', sales: 5, revenue: 'R$ 750K', rank: 3 },
                        ].map((broker, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                  ${broker.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                        broker.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                            'bg-gradient-to-br from-orange-300 to-orange-500'}`}>
                                    {broker.rank}º
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{broker.name}</p>
                                    <p className="text-sm text-gray-500">{broker.sales} vendas · {broker.revenue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
