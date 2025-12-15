import { Property } from '../types/property';
import Image from 'next/image';
import { useState } from 'react';
import { FaLocationDot, FaBed, FaBath, FaRulerCombined } from "react-icons/fa6";

interface Props {
    property: Property;
    onClick?: () => void;
}

export const PropertyCard = ({ property, onClick }: Props) => {
    // Format price to MYR currency
    const formattedPrice = new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        maximumFractionDigits: 0,
    }).format(property.price);

    const imgSrc = property.image;
    const [isLoadingBuffer, setIsLoadingBuffer] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div
            onClick={onClick}
            className={`bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white/10 flex flex-col h-full group hover:-translate-y-2 hover:shadow-primary/20 relative z-0 hover:z-10 ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="relative h-48 w-full bg-white/5 overflow-hidden">
                {hasError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-sm">Image Unavailable</span>
                    </div>
                ) : (
                    <Image
                        src={imgSrc}
                        alt={property.name}
                        fill
                        unoptimized
                        className={`object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${isLoadingBuffer ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onLoad={() => setIsLoadingBuffer(false)}
                        onError={() => {
                            setHasError(true);
                            setIsLoadingBuffer(false);
                        }}
                    />
                )}
                {isLoadingBuffer && !hasError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-white border border-white/10 shadow-sm z-10">
                    {property.type}
                </div>
            </div>
            <div className="p-4 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white line-clamp-1" title={property.name}>{property.name}</h3>
                </div>
                <p className="text-xl font-bold text-primary mb-1">{formattedPrice}</p>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                    <FaLocationDot className="mr-1 text-secondary" />
                    <span className="truncate">{property.city}, {property.state}</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-1 text-sm text-gray-500 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1">
                        <FaBed className="text-gray-400" />
                        <span className="font-medium whitespace-nowrap">{property.bedRooms} Beds</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <FaBath className="text-gray-400" />
                        <span className="font-medium whitespace-nowrap">{property.bathRooms} Baths</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <FaRulerCombined className="text-gray-400" />
                        <span className="font-medium whitespace-nowrap">{property.floorSize} sqft</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
