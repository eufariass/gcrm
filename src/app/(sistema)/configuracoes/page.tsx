'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    User, Building, Bell, Shield, Palette, Globe,
    Save, Camera, Mail, Phone, MapPin
} from "lucide-react"

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const tabs = [
        { id: 'profile', label: 'Perfil', icon: User },
        { id: 'company', label: 'Empresa', icon: Building },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Shield },
        { id: 'appearance', label: 'Aparência', icon: Palette },
        { id: 'integrations', label: 'Integrações', icon: Globe },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                <p className="text-gray-500 mt-2">Gerencie suas preferências e configurações do sistema</p>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                    ? 'bg-violet-100 text-violet-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'profile' && (
                        <>
                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle>Informações Pessoais</CardTitle>
                                    <CardDescription>Atualize suas informações de perfil</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Avatar */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                                FF
                                            </div>
                                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                                                <Camera className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Felipe Farias</h3>
                                            <p className="text-sm text-gray-500">felipefarias3629@gmail.com</p>
                                            <Badge className="mt-2 bg-violet-100 text-violet-700">Administrador</Badge>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nome Completo</Label>
                                            <Input id="name" defaultValue="Felipe Farias" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input id="email" defaultValue="felipefarias3629@gmail.com" className="pl-10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Telefone</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input id="phone" placeholder="(11) 99999-9999" className="pl-10" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="creci">CRECI</Label>
                                            <Input id="creci" placeholder="CRECI-SP 123456" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                                            <Save className="w-4 h-4" />
                                            Salvar Alterações
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {activeTab === 'company' && (
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Dados da Empresa</CardTitle>
                                <CardDescription>Configure as informações da sua imobiliária</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Nome da Empresa</Label>
                                        <Input defaultValue="G-CRM Imobiliária" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CNPJ</Label>
                                        <Input placeholder="00.000.000/0001-00" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Endereço</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input placeholder="Rua, número, bairro, cidade - UF" className="pl-10" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                                        <Save className="w-4 h-4" />
                                        Salvar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Preferências de Notificação</CardTitle>
                                <CardDescription>Configure como deseja receber notificações</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: 'Novos leads', description: 'Receber notificação quando um novo lead for cadastrado', enabled: true },
                                    { label: 'Visitas agendadas', description: 'Lembrete de visitas programadas', enabled: true },
                                    { label: 'Propostas', description: 'Quando uma proposta for enviada ou recebida', enabled: false },
                                    { label: 'Contratos', description: 'Atualizações sobre status de contratos', enabled: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.label}</p>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <button
                                            className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-violet-600' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Segurança</CardTitle>
                                <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Senha Atual</Label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nova Senha</Label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Confirmar Nova Senha</Label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                                        <Shield className="w-4 h-4" />
                                        Atualizar Senha
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'appearance' && (
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Aparência</CardTitle>
                                <CardDescription>Personalize a aparência do sistema</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Label>Tema</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: 'light', label: 'Claro', color: 'bg-white border-2 border-violet-500' },
                                            { id: 'dark', label: 'Escuro', color: 'bg-gray-900' },
                                            { id: 'system', label: 'Sistema', color: 'bg-gradient-to-r from-white to-gray-900' },
                                        ].map((theme) => (
                                            <button key={theme.id} className="p-4 rounded-lg border-2 border-gray-200 hover:border-violet-500 transition-colors">
                                                <div className={`w-full h-20 rounded ${theme.color} mb-2`} />
                                                <p className="text-sm font-medium text-center">{theme.label}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'integrations' && (
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle>Integrações</CardTitle>
                                <CardDescription>Conecte o G-CRM com outras ferramentas</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: 'WhatsApp Business', description: 'Envie mensagens automáticas para leads', connected: true },
                                    { name: 'Google Calendar', description: 'Sincronize visitas com seu calendário', connected: false },
                                    { name: 'Portais Imobiliários', description: 'Publique imóveis automaticamente', connected: false },
                                    { name: 'Meta Ads', description: 'Rastreie leads de campanhas', connected: true },
                                ].map((integration, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{integration.name}</p>
                                            <p className="text-sm text-gray-500">{integration.description}</p>
                                        </div>
                                        <Button variant={integration.connected ? 'outline' : 'default'} size="sm">
                                            {integration.connected ? 'Conectado' : 'Conectar'}
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
