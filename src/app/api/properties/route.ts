import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createPropertySchema, propertyFiltersSchema } from '@/lib/validations/property'
import { slugify } from '@/lib/utils'

// ==========================================
// GET /api/properties - Listar imóveis
// ==========================================

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // Parse e validar filtros
        const filters = propertyFiltersSchema.parse({
            type: searchParams.get('type') || undefined,
            transactionType: searchParams.get('transactionType') || undefined,
            status: searchParams.get('status') || undefined,
            city: searchParams.get('city') || undefined,
            neighborhood: searchParams.get('neighborhood') || undefined,
            minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
            maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
            minBedrooms: searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : undefined,
            minArea: searchParams.get('minArea') ? Number(searchParams.get('minArea')) : undefined,
            maxArea: searchParams.get('maxArea') ? Number(searchParams.get('maxArea')) : undefined,
            page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
            limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
        })

        // Construir where clause
        const where: Record<string, unknown> = {}

        if (filters.type) where.type = filters.type
        if (filters.transactionType) where.transactionType = filters.transactionType
        if (filters.status) {
            where.status = filters.status
        } else {
            where.status = 'AVAILABLE' // Default: apenas disponíveis
        }
        if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' }
        if (filters.neighborhood) where.neighborhood = { contains: filters.neighborhood, mode: 'insensitive' }
        if (filters.minBedrooms) where.bedrooms = { gte: filters.minBedrooms }
        if (filters.minArea || filters.maxArea) {
            where.area = {}
            if (filters.minArea) (where.area as Record<string, number>).gte = filters.minArea
            if (filters.maxArea) (where.area as Record<string, number>).lte = filters.maxArea
        }

        // Filtro de preço (considerando tipo de transação)
        if (filters.minPrice || filters.maxPrice) {
            if (filters.transactionType === 'RENT') {
                where.rentPrice = {}
                if (filters.minPrice) (where.rentPrice as Record<string, number>).gte = filters.minPrice
                if (filters.maxPrice) (where.rentPrice as Record<string, number>).lte = filters.maxPrice
            } else {
                where.salePrice = {}
                if (filters.minPrice) (where.salePrice as Record<string, number>).gte = filters.minPrice
                if (filters.maxPrice) (where.salePrice as Record<string, number>).lte = filters.maxPrice
            }
        }

        // Paginação
        const skip = (filters.page - 1) * filters.limit

        // Query
        const [properties, total] = await Promise.all([
            prisma.property.findMany({
                where,
                include: {
                    images: {
                        orderBy: { order: 'asc' },
                        take: 5,
                    },
                    broker: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: filters.limit,
            }),
            prisma.property.count({ where }),
        ])

        return NextResponse.json({
            success: true,
            data: properties,
            meta: {
                total,
                page: filters.page,
                limit: filters.limit,
                totalPages: Math.ceil(total / filters.limit),
            },
        })
    } catch (error) {
        console.error('Error fetching properties:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'Parâmetros de filtro inválidos', details: error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Erro ao buscar imóveis' },
            { status: 500 }
        )
    }
}

// ==========================================
// POST /api/properties - Cadastrar imóvel
// ==========================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validar dados com Zod
        const validatedData = createPropertySchema.parse(body)

        // Gerar slug único
        const baseSlug = slugify(`${validatedData.title}-${validatedData.neighborhood}-${validatedData.city}`)
        let slug = baseSlug
        let slugCounter = 1

        // Verificar se slug já existe
        while (await prisma.property.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${slugCounter}`
            slugCounter++
        }

        // Verificar se código já existe
        const existingCode = await prisma.property.findUnique({
            where: { code: validatedData.code },
        })

        if (existingCode) {
            return NextResponse.json(
                { success: false, error: 'Código do imóvel já existe' },
                { status: 400 }
            )
        }

        // Verificar se corretor existe
        const broker = await prisma.user.findUnique({
            where: { id: validatedData.brokerId },
        })

        if (!broker) {
            return NextResponse.json(
                { success: false, error: 'Corretor não encontrado' },
                { status: 400 }
            )
        }

        // Extrair imagens para criar separadamente
        const { images, ...propertyData } = validatedData

        // Criar imóvel
        const property = await prisma.property.create({
            data: {
                ...propertyData,
                slug,
                images: images && images.length > 0 ? {
                    create: images.map((img, index) => ({
                        url: img.url,
                        alt: img.alt || validatedData.title,
                        order: img.order ?? index,
                    })),
                } : undefined,
            },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
                broker: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                    },
                },
            },
        })

        return NextResponse.json(
            { success: true, data: property },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating property:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'Dados inválidos', details: error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Erro ao cadastrar imóvel' },
            { status: 500 }
        )
    }
}
