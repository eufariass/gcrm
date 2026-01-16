import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, MoreHorizontal, MapPin, Bed, Bath, Square } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Force dynamic rendering - prevents database calls at build time
export const dynamic = 'force-dynamic'


function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

export default async function ImoveisPage() {
    const properties = await prisma.property.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
            broker: true
        }
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Imóveis</h1>
                    <p className="text-gray-500 mt-2"> </p>
                </div>
                <Link href="/imoveis/novo">
                    <Button className="bg-violet-600 hover:bg-violet-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Imóvel
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Buscar por código, título ou endereço..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Filtros</Button>
                    <Button variant="outline">Exportar</Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Imóvel</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Características</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Corretor</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                    Nenhum imóvel encontrado. Cadastre o primeiro!
                                </TableCell>
                            </TableRow>
                        ) : (
                            properties.map((property) => (
                                <TableRow key={property.id}>
                                    <TableCell>
                                        <div className="flex gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-md object-cover overflow-hidden">
                                                {/* Placeholder for image */}
                                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs text-gray-400">
                                                    Sem foto
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{property.title}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {property.city}, {property.state}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">Cód: {property.code}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{formatCurrency(Number(property.salePrice || property.rentPrice || 0))}</div>
                                        <div className="text-xs text-gray-500">Cond: {formatCurrency(Number(property.condoFee || 0))}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1" title="Quartos">
                                                <Bed className="w-4 h-4 text-gray-400" />
                                                {property.bedrooms}
                                            </div>
                                            <div className="flex items-center gap-1" title="Banheiros">
                                                <Bath className="w-4 h-4 text-gray-400" />
                                                {property.bathrooms}
                                            </div>
                                            <div className="flex items-center gap-1" title="Área Útil">
                                                <Square className="w-4 h-4 text-gray-400" />
                                                {property.area}m²
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={property.status === 'AVAILABLE' ? 'success' : 'secondary'}>
                                            {property.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs text-violet-700 font-bold">
                                                {property.broker?.name?.charAt(0) || 'U'}
                                            </div>
                                            <span className="text-sm text-gray-600">{property.broker?.name || 'Sistema'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center">
                {/* Pagination placeholders */}
            </div>
        </div>
    )
}
