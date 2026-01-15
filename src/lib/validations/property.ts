import { z } from 'zod'

// ==========================================
// Property Schemas
// ==========================================

export const PropertyTypeEnum = z.enum([
    'APARTMENT',
    'HOUSE',
    'COMMERCIAL',
    'LAND',
    'RURAL',
])

export const PropertyStatusEnum = z.enum([
    'AVAILABLE',
    'RESERVED',
    'SOLD',
    'RENTED',
])

export const TransactionTypeEnum = z.enum([
    'SALE',
    'RENT',
    'SALE_RENT',
])

// Base schema without refine (allows .partial())
const basePropertySchema = z.object({
    // Identificação
    code: z.string().min(1, 'Código é obrigatório'),
    title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
    description: z.string().optional(),

    // Tipo e Transação
    type: PropertyTypeEnum,
    transactionType: TransactionTypeEnum,

    // Valores
    salePrice: z.number().positive('Valor de venda deve ser positivo').optional().nullable(),
    rentPrice: z.number().positive('Valor de aluguel deve ser positivo').optional().nullable(),
    condoFee: z.number().min(0, 'Condomínio não pode ser negativo').optional().nullable(),
    iptu: z.number().min(0, 'IPTU não pode ser negativo').optional().nullable(),

    // Características
    area: z.number().positive('Área deve ser positiva'),
    builtArea: z.number().positive().optional().nullable(),
    bedrooms: z.number().int().min(0).optional().nullable(),
    bathrooms: z.number().int().min(0).optional().nullable(),
    suites: z.number().int().min(0).optional().nullable(),
    parkingSpaces: z.number().int().min(0).optional().nullable(),

    // Localização
    address: z.string().min(1, 'Endereço é obrigatório'),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),

    // Mídia
    images: z.array(z.object({
        url: z.string().url('URL da imagem inválida'),
        alt: z.string().optional(),
        order: z.number().int().min(0).optional(),
    })).optional().default([]),
    featuredImage: z.string().url().optional().nullable(),
    videoUrl: z.string().url().optional().nullable(),
    virtualTour: z.string().url().optional().nullable(),

    // Características adicionais
    features: z.array(z.string()).optional().default([]),

    // SEO
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),

    // Corretor responsável
    brokerId: z.string().cuid('ID do corretor inválido'),
})

// Create schema with validation
export const createPropertySchema = basePropertySchema.refine((data) => {
    // Validação: Venda requer salePrice, Aluguel requer rentPrice
    if (data.transactionType === 'SALE' && !data.salePrice) {
        return false
    }
    if (data.transactionType === 'RENT' && !data.rentPrice) {
        return false
    }
    if (data.transactionType === 'SALE_RENT' && (!data.salePrice || !data.rentPrice)) {
        return false
    }
    return true
}, {
    message: 'Informe o valor correspondente ao tipo de transação',
    path: ['salePrice'],
})

// Update schema (partial, no refine needed for updates)
export const updatePropertySchema = basePropertySchema.partial().extend({
    status: PropertyStatusEnum.optional(),
})

export const propertyFiltersSchema = z.object({
    type: PropertyTypeEnum.optional(),
    transactionType: TransactionTypeEnum.optional(),
    status: PropertyStatusEnum.optional(),
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    minBedrooms: z.number().int().min(0).optional(),
    minArea: z.number().positive().optional(),
    maxArea: z.number().positive().optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(50).default(12),
})

// Type exports
export type CreatePropertyInput = z.infer<typeof createPropertySchema>
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>
export type PropertyFilters = z.infer<typeof propertyFiltersSchema>

