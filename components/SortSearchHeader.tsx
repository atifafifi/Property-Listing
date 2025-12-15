import { Fragment } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react';
import { FaMagnifyingGlass, FaHeart, FaChevronDown, FaCheck } from "react-icons/fa6";

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
    onSaveSearch: () => void;
    savedSearchesCount: number;
    openSavedSearches: () => void;
}

const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];

export const SortSearchHeader = ({
    searchQuery, setSearchQuery, sortOption, setSortOption, onSaveSearch, savedSearchesCount, openSavedSearches
}: Props) => {
    const selectedSortLabel = sortOptions.find(opt => opt.value === sortOption)?.label || 'Sort By';

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-20 z-40 bg-[#434E78]/60 backdrop-blur-md shadow-sm p-4 rounded-xl border border-white/10 items-center justify-between">

            {/* Search */}
            <div className="relative w-full md:max-w-md">
                <input
                    type="text"
                    placeholder="Search items by city or state..."
                    aria-label="Search items by city or state"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#434E78]/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-300 transition-shadow"
                />
                <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto md:overflow-visible p-1 pb-2 md:p-0 md:pb-0 scrollbar-hide">
                <div className="w-48 relative">
                    <Listbox value={sortOption} onChange={setSortOption}>
                        <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-[#434E78]/40 py-2.5 pl-4 pr-10 text-left text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-white/10 transition-colors">
                            <span className="block truncate">{selectedSortLabel}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <FaChevronDown
                                    className="h-3 w-3 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </ListboxButton>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions
                                anchor="bottom start"
                                className="w-(--button-width) rounded-lg bg-[#434E78]/90 backdrop-blur-xl border border-white/10 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 mt-1"
                            >
                                {sortOptions.map((option) => (
                                    <ListboxOption
                                        key={option.value}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-white/10 text-white' : 'text-gray-300'
                                            }`
                                        }
                                        value={option.value}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium text-primary' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                        <FaCheck className="h-3 w-3" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </Listbox>
                </div>

                <button
                    onClick={onSaveSearch}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 rounded-full transition-colors text-sm font-semibold whitespace-nowrap"
                >
                    <FaHeart className="text-primary" />
                    Save
                </button>

                <button
                    onClick={openSavedSearches}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-full transition-colors text-sm font-semibold whitespace-nowrap relative"
                >
                    Saved
                    {savedSearchesCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex min-w-[16px] h-4 px-1 items-center justify-center rounded-full bg-primary text-[10px] text-black font-bold shadow-sm">
                            {savedSearchesCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};
