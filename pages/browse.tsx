import React, { useState, useEffect, useMemo } from 'react';
import { FaArrowLeft, FaXmark } from 'react-icons/fa6';
import Swal from 'sweetalert2';
// Property Listing Page
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layout';
import { PropertyCard } from '@/components/PropertyCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SortSearchHeader } from '@/components/SortSearchHeader';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { fetchProperties } from '@/lib/api';
import { Property } from '@/types/property';

interface Props {
    initialProperties: Property[];
    error?: string;
}

export default function Browse({ initialProperties, error }: Props) {
    // Data State
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filter & Sort State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Modal State
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Saved Search State
    const [savedSearches, setSavedSearches] = useState<{ name: string, query: string, types: string[], min: number | '', max: number | '', sort: string }[]>([]);
    const [showSavedSearches, setShowSavedSearches] = useState(false);

    // Error State
    const [errorMessage, setErrorMessage] = useState(error || '');

    // Initialize Available Types from initial data
    useEffect(() => {
        const types = Array.from(new Set(properties.map(p => p.type)));
        setAvailableTypes(prev => Array.from(new Set([...prev, ...types])).sort());
    }, [properties]);

    // Load Saved Searches
    useEffect(() => {
        const saved = localStorage.getItem('propertyGenie_savedSearches');
        if (saved) {
            try {
                setSavedSearches(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved searches", e);
            }
        }
    }, []);

    // Fetch Logic on Page Change
    const loadPage = async (newPage: number) => {
        setLoading(true);
        setErrorMessage('');
        try {
            const data = await fetchProperties(newPage);
            if (data.items && data.items.length > 0) {
                setProperties(data.items);
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setHasMore(false);
            }
        } catch (e) {
            console.error(e);
            setErrorMessage("Failed to load properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Filtering & Sorting Logic
    const filteredProperties = useMemo(() => {
        let result = [...properties];

        // 1. Search
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.city.toLowerCase().includes(lowerQ) ||
                p.state.toLowerCase().includes(lowerQ) ||
                p.name.toLowerCase().includes(lowerQ)
            );
        }

        // 2. Price Range
        if (minPrice !== '') {
            result = result.filter(p => p.price >= minPrice);
        }
        if (maxPrice !== '') {
            result = result.filter(p => p.price <= maxPrice);
        }

        // 3. Property Type
        if (selectedTypes.length > 0) {
            result = result.filter(p => selectedTypes.includes(p.type));
        }

        // 4. Sort
        result.sort((a, b) => {
            if (sortOption === 'price_asc') {
                return a.price - b.price;
            } else if (sortOption === 'price_desc') {
                return b.price - a.price;
            } else if (sortOption === 'created_desc') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        return result;
    }, [properties, searchQuery, minPrice, maxPrice, selectedTypes, sortOption]);

    // Handlers
    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSaveSearch = () => {
        const name = `${searchQuery || 'All'} - ${selectedTypes.join(', ') || 'Any Type'} (${minPrice || 0}-${maxPrice || 'Max'})`;
        const newSave = {
            name,
            query: searchQuery,
            types: selectedTypes,
            min: minPrice,
            max: maxPrice,
            sort: sortOption
        };
        const updated = [...savedSearches, newSave];
        setSavedSearches(updated);
        localStorage.setItem('propertyGenie_savedSearches', JSON.stringify(updated));
        //Use swal.fire for showing the success message
        Swal.fire({
            title: 'Search Saved!',
            text: 'Your search criteria have been saved successfully.',
            icon: 'success',
            confirmButtonText: 'Okay'
        });
    };

    const clearSavedSearches = () => {
        setSavedSearches([]);
        localStorage.removeItem('propertyGenie_savedSearches');
        //Swal.fire for showing the success message
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Saved searches cleared',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const loadSavedSearch = (search: typeof savedSearches[0]) => {
        setSearchQuery(search.query);
        setSelectedTypes(search.types);
        setMinPrice(search.min);
        setMaxPrice(search.max);
        setSortOption(search.sort);
        setShowSavedSearches(false);
    };

    return (
        <Layout
            title="Browse Properties | Atsen Property"
            navAction={{
                label: "Back to Home",
                href: "/",
                icon: <FaArrowLeft />
            }}
        >

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full py-2 bg-white/10 border border-white/20 rounded-lg font-semibold text-white flex items-center justify-center gap-2 shadow-sm backdrop-blur-md hover:bg-white/20 transition-all"
                >
                    <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
                    <span className="bg-primary/20 text-white px-2 py-0.5 rounded-full text-xs">
                        {(minPrice !== '' || maxPrice !== '' || selectedTypes.length > 0) ? 'Active' : '0'}
                    </span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <FilterSidebar
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    selectedTypes={selectedTypes}
                    toggleType={toggleType}
                    availableTypes={availableTypes}
                    isOpen={isMobileFilterOpen}
                    onReset={() => {
                        setMinPrice(''); setMaxPrice(''); setSelectedTypes([]); setSearchQuery('');
                    }}
                />

                {/* Main Content */}
                <div className="grow">
                    <SortSearchHeader
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        onSaveSearch={handleSaveSearch}
                        savedSearchesCount={savedSearches.length}
                        openSavedSearches={() => setShowSavedSearches(!showSavedSearches)}
                    />

                    {/* Saved Searches Dropdown */}
                    {showSavedSearches && (
                        <div className="mb-6 p-4 bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 animate-in fade-in slide-in-from-top-2">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-gray-200">Saved Searches</h3>
                                <div className="flex items-center gap-3">
                                    <button onClick={clearSavedSearches} className="text-xs text-red-400 hover:text-red-500 transition-colors font-medium">Clear All</button>
                                    <button
                                        onClick={() => setShowSavedSearches(false)}
                                        className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-charcoal-gray transition-colors"
                                        aria-label="Close"
                                    >
                                        <FaXmark className="text-lg" />
                                    </button>
                                </div>
                            </div>
                            {savedSearches.length === 0 ? <p className="text-sm text-gray-400">No saved searches.</p> : (
                                <ul className="space-y-2">
                                    {savedSearches.map((s, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-2 hover:bg-white/10 rounded-lg cursor-pointer" onClick={() => loadSavedSearch(s)}>
                                            <span className="text-sm text-gray-300 truncate">{s.name}</span>
                                            <span className="text-xs text-primary font-bold">Load</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Error Banner */}
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
                            <span>{errorMessage}</span>
                            <button onClick={() => window.location.reload()} className="text-sm font-semibold hover:underline bg-white/20 px-3 py-1 rounded-lg">Retry</button>
                        </div>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white/5 rounded-xl flex flex-col h-104 border border-white/5">
                                    <div className="h-48 bg-white/10 w-full"></div>
                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="h-4 bg-white/10 w-3/4 rounded"></div>
                                        <div className="h-6 bg-white/10 w-1/3 rounded"></div>
                                        <div className="h-4 bg-white/10 w-1/2 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No properties found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onClick={() => {
                                        setSelectedProperty(property);
                                        setIsModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <div className="mt-12 flex justify-center gap-4">
                        <button
                            //Disabled the button if the page is the first page 
                            disabled={page === 1 || loading}
                            onClick={() => loadPage(page - 1)}
                            className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 hover:bg-white/20 font-medium shadow-sm transition-colors"
                        >
                            Previous
                        </button>
                        <span className="flex items-center px-4 font-bold text-white">
                            Page {page}
                        </span>
                        <button
                            //Disabled the next button if it is the last page
                            disabled={!hasMore || loading}
                            onClick={() => loadPage(page + 1)}
                            className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 hover:bg-white/20 font-medium shadow-sm transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <PropertyDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={selectedProperty}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetchProperties(1);
    return {
        props: {
            initialProperties: data.items || [],
        }
    };
};
