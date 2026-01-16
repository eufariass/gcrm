'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft, Upload, Plus, X, Save, Building2,
    MapPin, Bed, Bath, Car, Ruler, DollarSign
} from "lucide-react"

export default function NovoImovelPage() {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>(['Piscina', 'Churrasqueira'])
    const [newFeature, setNewFeature] = useState('')

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()])
            setNewFeature('')
        }
    }

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Novo Imóvel</h1>
                    <p className="text-gray-500 mt-1">Preencha os dados do imóvel para cadastro</p>
                </div>
            </div>

            <form className="space-y-6">
                {/* Basic Info */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-violet-600" />
                            Informações Básicas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="title">Título do Anúncio *</Label>
                                <Input id="title" placeholder="Ex: Apartamento 3 quartos no Jardins" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipo de Imóvel *</Label>
                                <select id="type" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                    <option value="">Selecione...</option>
                                    <option value="APARTMENT">Apartamento</option>
                                    <option value="HOUSE">Casa</option>
                                    <option value="COMMERCIAL">Comercial</option>
                                    <option value="LAND">Terreno</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transaction">Finalidade *</Label>
                                <select id="transaction" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                    <option value="">Selecione...</option>
                                    <option value="SALE">Venda</option>
                                    <option value="RENT">Aluguel</option>
                                    <option value="SALE_RENT">Venda e Aluguel</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="description">Descrição</Label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                                    placeholder="Descreva os detalhes do imóvel..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-violet-600" />
                            Localização
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cep">CEP</Label>
                                <Input id="cep" placeholder="00000-000" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input id="address" placeholder="Rua, Avenida..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="number">Número</Label>
                                <Input id="number" placeholder="123" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="complement">Complemento</Label>
                                <Input id="complement" placeholder="Apto 101" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="neighborhood">Bairro</Label>
                                <Input id="neighborhood" placeholder="Centro" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">Cidade</Label>
                                <Input id="city" placeholder="São Paulo" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">Estado</Label>
                                <select id="state" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                    <option value="">Selecione...</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="MG">Minas Gerais</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Characteristics */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ruler className="w-5 h-5 text-violet-600" />
                            Características
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Ruler className="w-4 h-4" /> Área (m²)
                                </Label>
                                <Input type="number" placeholder="120" />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Bed className="w-4 h-4" /> Quartos
                                </Label>
                                <Input type="number" placeholder="3" />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Bath className="w-4 h-4" /> Banheiros
                                </Label>
                                <Input type="number" placeholder="2" />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Car className="w-4 h-4" /> Vagas
                                </Label>
                                <Input type="number" placeholder="2" />
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                            <Label>Diferenciais</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {features.map((feature, i) => (
                                    <span key={i} className="flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
                                        {feature}
                                        <button type="button" onClick={() => removeFeature(i)}>
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ex: Ar condicionado"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                />
                                <Button type="button" variant="outline" onClick={addFeature}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-violet-600" />
                            Valores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="salePrice">Preço de Venda</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                    <Input id="salePrice" className="pl-10" placeholder="1.200.000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rentPrice">Valor do Aluguel</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                    <Input id="rentPrice" className="pl-10" placeholder="4.500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="condoFee">Condomínio</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                    <Input id="condoFee" className="pl-10" placeholder="800" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="iptu">IPTU (anual)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                    <Input id="iptu" className="pl-10" placeholder="3.600" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Images */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5 text-violet-600" />
                            Fotos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Arraste as imagens ou clique para selecionar</p>
                            <p className="text-sm text-gray-400">PNG, JPG até 10MB cada</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-violet-600 hover:bg-violet-700 gap-2">
                        <Save className="w-4 h-4" />
                        Salvar Imóvel
                    </Button>
                </div>
            </form>
        </div>
    )
}
