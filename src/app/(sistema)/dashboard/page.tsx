import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Visão geral da sua performance hoje, {new Date().toLocaleDateString('pt-BR')}</p>
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
                        color: "blue"
                    },
                    {
                        title: "Imóveis Ativos",
                        value: "124",
                        change: "+4",
                        trend: "up",
                        icon: Building2,
                        color: "violet"
                    },
                    {
                        title: "Vendas (Mês)",
                        value: "R$ 2.4M",
                        change: "+18%",
                        trend: "up",
                        icon: DollarSign,
                        color: "green"
                    },
                    {
                        title: "Taxa de Conversão",
                        value: "3.2%",
                        change: "-0.4%",
                        trend: "down",
                        icon: TrendingUp,
                        color: "orange"
                    }
                ].map((stat, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <p className={`text-xs flex items-center mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {stat.change} em relação ao mês anterior
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Pipeline de Vendas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p className="text-gray-400 text-sm">Gráfico de Pipeline será implementado aqui (Recharts)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { type: 'lead', text: 'Novo lead cadastrado: João Silva', time: '2 min atrás' },
                                { type: 'sale', text: 'Venda fechada: Apt Jardins', time: '2 horas atrás' },
                                { type: 'visit', text: 'Visita agendada: Carla Diaz', time: '4 horas atrás' },
                                { type: 'property', text: 'Imóvel atualizado: Casa Barra', time: 'Ontem' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-violet-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
