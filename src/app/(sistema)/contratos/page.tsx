import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
    Search, Plus, FileText, Download, Eye, MoreHorizontal,
    DollarSign, Calendar, CheckCircle, Clock, XCircle
} from "lucide-react"

export default function ContratosPage() {
    const contracts = [
        {
            id: 'CTR-001',
            property: 'Apartamento Jardins',
            client: 'João Silva',
            type: 'VENDA',
            value: 1200000,
            status: 'ACTIVE',
            date: '2024-01-15'
        },
        {
            id: 'CTR-002',
            property: 'Casa Alphaville',
            client: 'Maria Santos',
            type: 'ALUGUEL',
            value: 8500,
            status: 'DRAFT',
            date: '2024-01-14'
        },
        {
            id: 'CTR-003',
            property: 'Cobertura Pinheiros',
            client: 'Carlos Oliveira',
            type: 'VENDA',
            value: 3500000,
            status: 'COMPLETED',
            date: '2024-01-10'
        },
        {
            id: 'CTR-004',
            property: 'Studio Vila Mariana',
            client: 'Ana Costa',
            type: 'ALUGUEL',
            value: 2800,
            status: 'CANCELLED',
            date: '2024-01-08'
        },
    ]

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const getStatusBadge = (status: string) => {
        const configs: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'destructive'; icon: any }> = {
            DRAFT: { label: 'Rascunho', variant: 'secondary', icon: Clock },
            ACTIVE: { label: 'Ativo', variant: 'default', icon: CheckCircle },
            COMPLETED: { label: 'Concluído', variant: 'success', icon: CheckCircle },
            CANCELLED: { label: 'Cancelado', variant: 'destructive', icon: XCircle },
        }
        const config = configs[status] || configs.DRAFT
        const Icon = config.icon

        return (
            <Badge variant={config.variant} className="gap-1">
                <Icon className="w-3 h-3" />
                {config.label}
            </Badge>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
                    <p className="text-gray-500 mt-2">Gerencie todos os contratos de venda e aluguel</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Contrato
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total de Contratos', value: '156', icon: FileText, color: 'violet' },
                    { label: 'Contratos Ativos', value: '42', icon: CheckCircle, color: 'green' },
                    { label: 'Valor Total (Mês)', value: 'R$ 4.2M', icon: DollarSign, color: 'blue' },
                    { label: 'Pendentes', value: '8', icon: Clock, color: 'orange' },
                ].map((stat, i) => (
                    <Card key={i} className="border-0 shadow-md">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Buscar por cliente, imóvel ou código..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Todos</Button>
                    <Button variant="outline">Vendas</Button>
                    <Button variant="outline">Aluguéis</Button>
                </div>
            </div>

            {/* Table */}
            <Card className="border-0 shadow-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Imóvel</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contracts.map((contract) => (
                            <TableRow key={contract.id}>
                                <TableCell className="font-mono text-sm">{contract.id}</TableCell>
                                <TableCell className="font-medium">{contract.property}</TableCell>
                                <TableCell>{contract.client}</TableCell>
                                <TableCell>
                                    <Badge variant={contract.type === 'VENDA' ? 'default' : 'secondary'}>
                                        {contract.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{formatCurrency(contract.value)}</TableCell>
                                <TableCell>{getStatusBadge(contract.status)}</TableCell>
                                <TableCell className="text-gray-500">
                                    {new Date(contract.date).toLocaleDateString('pt-BR')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
