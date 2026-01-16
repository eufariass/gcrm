'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        }

        if (data.password !== data.confirmPassword) {
            setError('As senhas não coincidem')
            setIsLoading(false)
            return
        }

        if (data.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres')
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Erro ao criar conta')
            }

            setSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar conta')
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Verifique seu email</h1>
                    <p className="text-gray-500">
                        Enviamos um link de verificação para seu email. Clique no link para ativar sua conta.
                    </p>
                </div>
                <Link href="/login">
                    <Button className="w-full bg-violet-600 hover:bg-violet-700">
                        Ir para Login
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Criar conta</h1>
                <p className="text-gray-500">
                    Preencha os dados para criar sua conta
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="nome@empresa.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Digite a senha novamente"
                        disabled={isLoading}
                        required
                    />
                </div>
                <Button
                    className="w-full bg-violet-600 hover:bg-violet-700 h-11"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        'Criar conta'
                    )}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="font-semibold text-violet-600 hover:text-violet-500">
                    Fazer login
                </Link>
            </p>
        </div>
    )
}
