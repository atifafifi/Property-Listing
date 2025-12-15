import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { FaXmark, FaBed, FaBath, FaRulerCombined, FaLocationDot, FaEnvelope } from 'react-icons/fa6';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    property: Property | null;
}

// Helper component to handle image state isolation
const PropertyImage = ({ property }: { property: Property }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative h-64 md:h-80 w-full bg-white/5">
            {hasError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-sm">Image Unavailable</span>
                </div>
            ) : (
                <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    unoptimized
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                />
            )}
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                {property.type}
            </div>
        </div>
    );
};

export const PropertyDetailsModal = ({ isOpen, onClose, property }: Props) => {
    if (!property) return null;

    const formattedPrice = new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#434E78]/25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#434E78]/90 backdrop-blur-xl border border-white/10 text-left align-middle shadow-xl transition-all">
                                {/* Use key to force remount on property change, resetting state */}
                                <PropertyImage key={property.id} property={property} />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-[#434E78]/40 backdrop-blur-sm rounded-full hover:bg-[#434E78]/60 text-white transition-colors shadow-sm z-10"
                                >
                                    <FaXmark className="text-xl" />
                                </button>

                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                        <div>
                                            <Dialog.Title as="h3" className="text-2xl font-bold text-white leading-tight mb-2">
                                                {property.name}
                                            </Dialog.Title>
                                            <div className="flex items-center text-gray-400">
                                                <FaLocationDot className="mr-2 text-secondary" />
                                                <span>{property.city}, {property.state}</span>
                                            </div>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
                                        </div>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10 mb-8">
                                        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl">
                                            <FaBed className="text-2xl text-gray-400 mb-2" />
                                            <span className="font-bold text-lg text-white">{property.bedRooms}</span>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide">Bedrooms</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl">
                                            <FaBath className="text-2xl text-gray-400 mb-2" />
                                            <span className="font-bold text-lg text-white">{property.bathRooms}</span>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide">Bathrooms</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl">
                                            <FaRulerCombined className="text-2xl text-gray-400 mb-2" />
                                            <span className="font-bold text-lg text-white">{property.floorSize}</span>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide">Sqft</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={onClose}
                                            className="px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-sm text-gray-300 font-bold rounded-full hover:bg-white/10 transition-colors hover:text-white"
                                        >
                                            Close
                                        </button>
                                        <a
                                            href={`mailto:atifafifi16@gmail.com?subject=Inquiry about ${property.name}&body=Hi, I am interested in ${property.name} located in ${property.city}.`}
                                            className="px-8 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 shadow-lg"
                                        >
                                            <FaEnvelope />
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
