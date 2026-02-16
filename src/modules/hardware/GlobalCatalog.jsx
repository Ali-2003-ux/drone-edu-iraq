import React, { useState, useMemo } from 'react';
import partsData from '../../data/parts_db.json';
import { Search, Filter, Cpu, CheckCircle, AlertTriangle, Zap, Box, Tag, ShoppingBag, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const GlobalCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedPart, setSelectedPart] = useState(null);

    const categories = ['All', ...new Set(partsData.map(p => p.category))];
    const brands = ['All', ...new Set(partsData.map(p => p.brand))];

    const filteredParts = useMemo(() => {
        return partsData.filter(part => {
            const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.brand.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
            const matchesBrand = selectedBrand === 'All' || part.brand === selectedBrand;
            return matchesSearch && matchesCategory && matchesBrand;
        });
    }, [searchTerm, selectedCategory, selectedBrand]);

    return (
        <div className="h-[calc(100vh-6rem)] flex gap-6 animate-in fade-in duration-500">
            {/* Sidebar Filters */}
            <div className="w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col hidden lg:flex">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center mb-4">
                        <Filter className="mr-2 text-indigo-500" size={20} />
                        Filters
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Category</label>
                            <div className="space-y-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                            selectedCategory === cat
                                                ? "bg-indigo-600 text-white"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Brand</label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                            >
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 bg-indigo-900/10 rounded-xl border border-indigo-500/20">
                    <h3 className="text-indigo-400 font-bold text-sm mb-1">Did you know?</h3>
                    <p className="text-xs text-slate-400">
                        Checking "Iraqi Availability" helps you find parts stocking in Al-Sina'a Street vs Global Import.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Search Bar */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 sticky top-0 z-10 shadow-xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search for motors, frames, electronics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredParts.map(part => (
                            <div
                                key={part.id}
                                onClick={() => setSelectedPart(part)}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-lg group"
                            >
                                <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                    <Cpu size={48} className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
                                    {part.iraq_availability && (
                                        <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-full border border-green-500/20">
                                            IN BAGHDAD
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-xs text-indigo-400 font-bold uppercase">{part.brand}</div>
                                            <h3 className="text-white font-bold truncate">{part.name}</h3>
                                        </div>
                                        {part.specs.voltage && (
                                            <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                                                {part.specs.voltage}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {part.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Modal / Slide-over */}
            {selectedPart && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPart(null)}></div>
                    <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 relative z-10 flex flex-col h-full animate-in slide-in-from-right-full duration-300">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-white">{selectedPart.name}</h2>
                            <button onClick={() => setSelectedPart(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white">
                                <XCircleIcon />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Image Placeholder */}
                            <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                                <Cpu size={64} className="text-slate-600" />
                            </div>

                            {/* Key Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <div className="text-xs text-slate-400 uppercase">Category</div>
                                    <div className="text-white font-medium">{selectedPart.category}</div>
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <div className="text-xs text-slate-400 uppercase">Brand</div>
                                    <div className="text-white font-medium">{selectedPart.brand}</div>
                                </div>
                            </div>

                            {/* Specs */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                    <Zap className="mr-2 text-yellow-500" size={20} /> Specifications
                                </h3>
                                <div className="space-y-2">
                                    {Object.entries(selectedPart.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-slate-800 text-sm">
                                            <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span className="text-indigo-300 font-mono">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-indigo-900/10 p-4 rounded-xl border border-indigo-500/20">
                                <h3 className="text-sm font-bold text-indigo-400 mb-2 flex items-center">
                                    <Info className="mr-2" size={16} /> AI Analysis
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {selectedPart.description}
                                    <br /><br />
                                    <strong>Pros:</strong> Excellent build quality, highly available parts.<br />
                                    <strong>Cons:</strong> Slightly heavier than competitors in this class.
                                </p>
                            </div>

                            {/* Availability */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                    <ShoppingBag className="mr-2 text-green-500" size={20} /> Availability
                                </h3>
                                <div className={cn(
                                    "p-4 rounded-xl border flex items-center",
                                    selectedPart.iraq_availability
                                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                                        : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                )}>
                                    {selectedPart.iraq_availability ? (
                                        <>
                                            <CheckCircle className="mr-3" size={24} />
                                            <div>
                                                <div className="font-bold">Available Locally</div>
                                                <div className="text-xs opacity-80">Al-Sina'a Street, Baghdad</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle className="mr-3" size={24} />
                                            <div>
                                                <div className="font-bold">Import Required</div>
                                                <div className="text-xs opacity-80">Est. Shipping: 15-20 Days</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
)

export default GlobalCatalog;
