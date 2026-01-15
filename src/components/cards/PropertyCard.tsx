'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
    Bed,
    Bath,
    Car,
    Maximize,
    MapPin,
    Heart,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { cn, formatCurrency, formatArea } from '@/lib/utils'
import type { Property, transactionTypeLabels, propertyTypeLabels } from '@/types/property'

interface PropertyCardProps {
    property: Property
    priority?: boolean
    className?: string
    onContactClick?: (property: Property) => void
}

export function PropertyCard({
    property,
    priority = false,
    className,
    onContactClick,
}: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const images = property.images.length > 0
        ? property.images
        : [{ id: '0', url: '/placeholder-property.jpg', alt: property.title, order: 0 }]

    const currentImage = images[currentImageIndex]

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    const handleContact = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onContactClick?.(property)
    }

    const displayPrice = property.transactionType === 'RENT'
        ? property.rentPrice
        : property.salePrice

    const priceLabel = property.transactionType === 'RENT' ? '/mês' : ''

    // Schema.org structured data for SEO
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: property.title,
        description: property.description,
        image: currentImage.url,
        address: {
            '@type': 'PostalAddress',
            streetAddress: `${property.address}${property.number ? `, ${property.number}` : ''}`,
            addressLocality: property.city,
            addressRegion: property.state,
            postalCode: property.zipCode,
            addressCountry: 'BR',
        },
        geo: property.latitude && property.longitude ? {
            '@type': 'GeoCoordinates',
            latitude: property.latitude,
            longitude: property.longitude,
        } : undefined,
        offers: {
            '@type': 'Offer',
            price: displayPrice,
            priceCurrency: 'BRL',
        },
    }

    return (
        <>
            {/* Schema.org JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <article
                className={cn(
                    'group relative bg-white rounded-2xl overflow-hidden shadow-lg',
                    'transition-all duration-300 ease-out',
                    'hover:shadow-2xl hover:-translate-y-1',
                    'border border-gray-100',
                    className
                )}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <span className={cn(
                            'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                            'backdrop-blur-sm shadow-md',
                            property.transactionType === 'RENT'
                                ? 'bg-blue-500/90 text-white'
                                : 'bg-geum-gold/90 text-geum-dark'
                        )}>
                            {property.transactionType === 'RENT' ? 'Aluguel' : 'Venda'}
                        </span>

                        {property.status === 'RESERVED' && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/90 text-white backdrop-blur-sm">
                                Reservado
                            </span>
                        )}
                    </div>

                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        aria-label={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        className={cn(
                            'absolute top-3 right-3 z-10 p-2 rounded-full',
                            'backdrop-blur-sm transition-all duration-200',
                            'hover:scale-110 active:scale-95',
                            isLiked
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                        )}
                    >
                        <Heart
                            className={cn('w-5 h-5', isLiked && 'fill-current')}
                        />
                    </button>

                    {/* Image */}
                    <Link href={`/imoveis/${property.slug}`} className="block w-full h-full">
                        <Image
                            src={currentImage.url}
                            alt={currentImage.alt || property.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={priority}
                            className={cn(
                                'object-cover transition-all duration-500',
                                'group-hover:scale-105',
                                !imageLoaded && 'blur-sm'
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </Link>

                    {/* Image Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                aria-label="Imagem anterior"
                                className={cn(
                                    'absolute left-2 top-1/2 -translate-y-1/2 z-10',
                                    'p-2 rounded-full bg-white/80 backdrop-blur-sm',
                                    'opacity-0 group-hover:opacity-100 transition-opacity',
                                    'hover:bg-white active:scale-95'
                                )}
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                aria-label="Próxima imagem"
                                className={cn(
                                    'absolute right-2 top-1/2 -translate-y-1/2 z-10',
                                    'p-2 rounded-full bg-white/80 backdrop-blur-sm',
                                    'opacity-0 group-hover:opacity-100 transition-opacity',
                                    'hover:bg-white active:scale-95'
                                )}
                            >
                                <ChevronRight className="w-4 h-4 text-gray-700" />
                            </button>

                            {/* Image Dots */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                                {images.slice(0, 5).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setCurrentImageIndex(index)
                                        }}
                                        aria-label={`Ver imagem ${index + 1}`}
                                        className={cn(
                                            'w-2 h-2 rounded-full transition-all duration-200',
                                            index === currentImageIndex
                                                ? 'bg-white w-4'
                                                : 'bg-white/60 hover:bg-white/80'
                                        )}
                                    />
                                ))}
                                {images.length > 5 && (
                                    <span className="text-white text-xs">+{images.length - 5}</span>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-geum-dark">
                            {displayPrice ? formatCurrency(displayPrice) : 'Consulte'}
                        </span>
                        {priceLabel && (
                            <span className="text-sm text-gray-500">{priceLabel}</span>
                        )}
                    </div>

                    {/* Title & Location */}
                    <div className="space-y-1">
                        <Link href={`/imoveis/${property.slug}`}>
                            <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-geum-gold transition-colors">
                                {property.title}
                            </h3>
                        </Link>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">
                                {property.neighborhood}, {property.city}
                            </span>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 py-2 border-t border-gray-100">
                        {property.bedrooms && property.bedrooms > 0 && (
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Bed className="w-4 h-4" />
                                <span className="text-sm">{property.bedrooms}</span>
                            </div>
                        )}
                        {property.bathrooms && property.bathrooms > 0 && (
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Bath className="w-4 h-4" />
                                <span className="text-sm">{property.bathrooms}</span>
                            </div>
                        )}
                        {property.parkingSpaces && property.parkingSpaces > 0 && (
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Car className="w-4 h-4" />
                                <span className="text-sm">{property.parkingSpaces}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-gray-600 ml-auto">
                            <Maximize className="w-4 h-4" />
                            <span className="text-sm">{formatArea(property.area)}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleContact}
                        className={cn(
                            'w-full py-3 px-4 rounded-xl font-semibold text-sm',
                            'bg-geum-gold text-geum-dark',
                            'transition-all duration-200',
                            'hover:bg-geum-gold/90 hover:shadow-lg',
                            'active:scale-[0.98]',
                            'focus:outline-none focus:ring-2 focus:ring-geum-gold focus:ring-offset-2'
                        )}
                    >
                        Tenho interesse
                    </button>
                </div>
            </article>
        </>
    )
}
