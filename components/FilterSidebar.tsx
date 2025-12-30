import React from 'react';
import { FaCheck } from 'react-icons/fa6';

//Props interface for the filter sidebar
interface Props {
    minPrice: number | ''; //Minimum price value
    maxPrice: number | ''; //Maximum price value
    setMinPrice: (val: number | '') => void; //Set minimum price value
    setMaxPrice: (val: number | '') => void; //Set maximum price value
    selectedTypes: string[]; //Selected property types
    toggleType: (type: string) => void; //Toggle property type
    availableTypes: string[]; //Available property types
    onReset: () => void;
    isOpen?: boolean; // Mobile toggle state
    onClose?: () => void; // Mobile close handler
}

export const FilterSidebar = ({
    minPrice, maxPrice, setMinPrice, setMaxPrice,
    selectedTypes, toggleType, availableTypes, onReset, isOpen = true
}: Props) => {
    return (
        <aside className={`w-full lg:w-64 shrink-0 bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/10 h-fit lg:sticky lg:top-24 ${isOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg text-white">Filter</h2>
                <button
                    onClick={onReset}
                    aria-label="Reset all filters"
                    className="text-sm text-secondary hover:text-red-500 font-medium transition-colors"
                >
                    Reset
                </button>
            </div>

            {/* Price Range */}
            <div className="mb-8" role="group" aria-labelledby="price-range-label">
                <h3 id="price-range-label" className="text-sm font-semibold text-gray-200 mb-3">Price Range (MYR)</h3>
                <div className="flex flex-col gap-3">
                    <input
                        type="number"
                        placeholder="Min Price"
                        aria-label="Minimum Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-3 py-2 bg-[#434E78]/20 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none placeholder-gray-500"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        aria-label="Maximum Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-3 py-2 bg-[#434E78]/20 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Property Type */}
            <div role="group" aria-labelledby="property-type-label">
                <h3 id="property-type-label" className="text-sm font-semibold text-gray-200 mb-3">Property Type</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                    {availableTypes.length === 0 ? (
                        <p className="text-xs text-gray-400">Loading types...</p>
                    ) : (
                        availableTypes.map((type) => {
                            const isSelected = selectedTypes.includes(type);
                            return (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group select-none py-1">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-200 ${isSelected
                                        ? 'bg-primary border-primary shadow-[0_0_10px_rgba(233,127,74,0.4)]'
                                        : 'bg-[#434E78]/40 border-white/20 group-hover:border-white/40 group-hover:bg-white/5'
                                        }`}>
                                        <FaCheck className={`text-[10px] text-black transform transition-all duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                                            }`} />
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleType(type)}
                                        className="hidden"
                                    />
                                    <span className={`text-sm transition-colors duration-200 ${isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'
                                        } capitalize truncate`}>
                                        {type}
                                    </span>
                                </label>
                            );
                        })
                    )}
                </div>
            </div>
        </aside>
    );
};
