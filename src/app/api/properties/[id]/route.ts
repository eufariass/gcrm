import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updatePropertySchema } from '@/lib/validations/property'
import { slugify } from '@/lib/utils'

interface RouteParams {
    params: Promise<{ id: string }>
}

// ==========================================
// GET /api/properties/[id] - Buscar imóvel por ID
// ==========================================

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
                broker: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        avatar: true,
                        creci: true,
                    },
                },
            },
        })

        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Imóvel não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: property })
    } catch (error) {
        console.error('Error fetching property:', error)
        return NextResponse.json(
            { success: false, error: 'Erro ao buscar imóvel' },
            { status: 500 }
        )
    }
}

// ==========================================
// PUT /api/properties/[id] - Atualizar imóvel
// ==========================================

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

        // Verificar se imóvel existe
        const existingProperty = await prisma.property.findUnique({
            where: { id },
        })

        if (!existingProperty) {
            return NextResponse.json(
                { success: false, error: 'Imóvel não encontrado' },
                { status: 404 }
            )
        }

        // Validar dados
        const validatedData = updatePropertySchema.parse(body)

        // Atualizar slug se título mudar
        let slug = existingProperty.slug
        if (validatedData.title && validatedData.title !== existingProperty.title) {
            const neighborhood = validatedData.neighborhood || existingProperty.neighborhood
            const city = validatedData.city || existingProperty.city
            const baseSlug = slugify(`${validatedData.title}-${neighborhood}-${city}`)
            slug = baseSlug
            let slugCounter = 1

            while (await prisma.property.findFirst({
                where: { slug, id: { not: id } }
            })) {
                slug = `${baseSlug}-${slugCounter}`
                slugCounter++
            }
        }

        // Extrair imagens para atualizar separadamente
        const { images, ...propertyData } = validatedData

        // Atualizar imóvel
        const property = await prisma.property.update({
            where: { id },
            data: {
                ...propertyData,
                slug,
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

        // Atualizar imagens se fornecidas
        if (images && images.length > 0) {
            // Deletar imagens existentes e criar novas
            await prisma.propertyImage.deleteMany({
                where: { propertyId: id },
            })

            await prisma.propertyImage.createMany({
                data: images.map((img: { url: string; alt?: string; order?: number }, index: number) => ({
                    propertyId: id,
                    url: img.url,
                    alt: img.alt || property.title,
                    order: img.order ?? index,
                })),
            })
        }

        return NextResponse.json({ success: true, data: property })
    } catch (error) {
        console.error('Error updating property:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'Dados inválidos', details: error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Erro ao atualizar imóvel' },
            { status: 500 }
        )
    }
}

// ==========================================
// DELETE /api/properties/[id] - Remover imóvel
// ==========================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        // Verificar se imóvel existe
        const existingProperty = await prisma.property.findUnique({
            where: { id },
        })

        if (!existingProperty) {
            return NextResponse.json(
                { success: false, error: 'Imóvel não encontrado' },
                { status: 404 }
            )
        }

        // Verificar se há contratos ativos
        const activeContracts = await prisma.contract.count({
            where: {
                propertyId: id,
                status: { in: ['DRAFT', 'ACTIVE'] },
            },
        })

        if (activeContracts > 0) {
            return NextResponse.json(
                { success: false, error: 'Não é possível remover imóvel com contratos ativos' },
                { status: 400 }
            )
        }

        // Deletar imóvel (imagens são deletadas por cascade)
        await prisma.property.delete({
            where: { id },
        })

        return NextResponse.json({ success: true, message: 'Imóvel removido com sucesso' })
    } catch (error) {
        console.error('Error deleting property:', error)
        return NextResponse.json(
            { success: false, error: 'Erro ao remover imóvel' },
            { status: 500 }
        )
    }
}
