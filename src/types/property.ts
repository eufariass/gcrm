// Types for Property entities

export interface PropertyImage {
    id: string
    url: string
    alt?: string
    order: number
}

export interface Broker {
    id: string
    name: string
    email?: string
    phone?: string
    avatar?: string
    creci?: string
}

export type PropertyType = 'APARTMENT' | 'HOUSE' | 'COMMERCIAL' | 'LAND' | 'RURAL'
export type PropertyStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'RENTED'
export type TransactionType = 'SALE' | 'RENT' | 'SALE_RENT'

export interface Property {
    id: string
    code: string
    title: string
    description?: string

    type: PropertyType
    status: PropertyStatus
    transactionType: TransactionType

    salePrice?: number | null
    rentPrice?: number | null
    condoFee?: number | null
    iptu?: number | null

    area: number
    builtArea?: number | null
    bedrooms?: number | null
    bathrooms?: number | null
    suites?: number | null
    parkingSpaces?: number | null

    address: string
    number?: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    latitude?: number | null
    longitude?: number | null

    images: PropertyImage[]
    featuredImage?: string | null
    videoUrl?: string | null
    virtualTour?: string | null

    features: string[]

    slug: string
    metaTitle?: string
    metaDescription?: string

    broker: Broker
    brokerId: string

    publishedAt?: Date | null
    createdAt: Date
    updatedAt: Date
}

export interface PropertyListResponse {
    success: boolean
    data: Property[]
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export const propertyTypeLabels: Record<PropertyType, string> = {
    APARTMENT: 'Apartamento',
    HOUSE: 'Casa',
    COMMERCIAL: 'Comercial',
    LAND: 'Terreno',
    RURAL: 'Rural',
}

export const transactionTypeLabels: Record<TransactionType, string> = {
    SALE: 'Venda',
    RENT: 'Aluguel',
    SALE_RENT: 'Venda ou Aluguel',
}

export const statusLabels: Record<PropertyStatus, string> = {
    AVAILABLE: 'Disponível',
    RESERVED: 'Reservado',
    SOLD: 'Vendido',
    RENTED: 'Alugado',
}
