import React, { useState, useMemo } from 'react';
import partsData from '../../data/parts_db.json';
import CompareTool from './CompareTool';
import TechNewsHub from './TechNewsHub';
import { Search, Filter, Cpu, CheckCircle, AlertTriangle, Zap, Box, Tag, ShoppingBag, Info, Plus, BrainCircuit, Globe, Camera, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';

const GlobalCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedPart, setSelectedPart] = useState(null);
    const [compareList, setCompareList] = useState([]);
    const [stockRequested, setStockRequested] = useState([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

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

    const toggleCompare = (e, part) => {
        e.stopPropagation();
        if (compareList.find(p => p.id === part.id)) {
            setCompareList(prev => prev.filter(p => p.id !== part.id));
        } else {
            if (compareList.length < 3) {
                setCompareList(prev => [...prev, part]);
            } else {
                alert("You can only compare up to 3 items.");
            }
        }
    };

    const handleRequestStock = (id) => {
        setStockRequested(prev => [...prev, id]);
        // Mock API call to backend
        setTimeout(() => alert("Request sent to Iraqi suppliers! 🇮🇶"), 500);
    };

    const openDetail = (part) => {
        setSelectedPart(part);
        setActiveImageIndex(0);
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex gap-6 animate-in fade-in duration-500 relative">
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
                            <div className="space-y-1 h-48 overflow-y-auto pr-2 custom-scrollbar">
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
                    <h3 className="text-indigo-400 font-bold text-sm mb-1">Stock Request</h3>
                    <p className="text-xs text-slate-400">
                        Can't find it in Battery St? Use the "Request Stock" button to alert local importers.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn("flex-1 flex flex-col transition-all", compareList.length > 0 ? "mb-[40vh]" : "")}>
                {/* Search Bar */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 sticky top-0 z-10 shadow-xl flex items-center justify-between">
                    <div className="relative flex-1 mr-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search 500+ parts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                    <div className="text-slate-400 text-sm font-mono">
                        {filteredParts.length} Parts Loaded
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-2 pb-24 h-full relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-[250px]">
                        {filteredParts.slice(0, 50).map(part => ( // Limited render for stability
                            <div
                                key={part.id}
                                onClick={() => openDetail(part)}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-lg group relative overflow-hidden flex flex-col"
                            >
                                <div className="absolute top-4 left-4 z-10 flex gap-1">
                                    <button
                                        onClick={(e) => toggleCompare(e, part)}
                                        className={cn(
                                            "p-1.5 rounded-lg border transition-all text-xs font-bold flex items-center",
                                            compareList.find(p => p.id === part.id)
                                                ? "bg-indigo-600 border-indigo-500 text-white"
                                                : "bg-slate-950/50 border-slate-700 text-slate-400 opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <Zap size={12} className="mr-1" /> Compare
                                    </button>
                                    {(part.availability_status === 'In Baghdad' || part.availability_status === 'In Erbil') && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); alert("Mock: Opening Map to Al-Sina'a Street..."); }}
                                            className="p-1.5 rounded-lg border bg-slate-950/50 border-slate-700 text-slate-400 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold flex items-center"
                                            title="View local stock location"
                                        >
                                            <MapPin size={12} className="mr-1" /> Local
                                        </button>
                                    )}
                                </div>

                                <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group/image">
                                    {/* Real Image Rendering */}
                                    <div className="w-full h-full relative">
                                        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                                        <img
                                            src={part.image}
                                            alt={part.name}
                                            loading="lazy"
                                            onLoad={(e) => e.target.previousSibling.style.display = 'none'}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                // Category-Specific Fallback Engine
                                                const fallbacks = {
                                                    'Motor': 'https://images.unsplash.com/photo-1591485423049-7a1b4fe7e32d?q=80&w=600&auto=format&fit=crop',
                                                    'Flight Controller': 'https://images.unsplash.com/photo-1605218427335-3a4dd8845219?q=80&w=600&auto=format&fit=crop',
                                                    'ESC': 'https://images.unsplash.com/photo-1555664424-778a69fba372?q=80&w=600&auto=format&fit=crop',
                                                    'Video Transmitter': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop',
                                                    'Frame': 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=600&auto=format&fit=crop'
                                                };
                                                e.target.src = fallbacks[part.category] || 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop';
                                            }}
                                            className="w-full h-full object-cover opacity-90 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-500 relative z-10"
                                        />
                                    </div>

                                    {/* Real Stock Photo Badge for Local Availability */}
                                    {(part.availability_status === 'In Baghdad' || part.availability_status === 'In Erbil') && (
                                        <div className="absolute bottom-2 left-2 z-20 bg-emerald-500/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center shadow-lg border border-emerald-400/30">
                                            <Camera size={10} className="mr-1" /> Real Stock Photo
                                        </div>
                                    )}

                                    <div className={cn(
                                        "absolute top-2 right-2 z-20 text-[10px] font-bold px-2 py-1 rounded-full border backdrop-blur-md",
                                        part.availability_status === 'In Baghdad' ? "bg-green-500/20 text-green-400 border-green-500/20" :
                                            part.availability_status === 'In Erbil' ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20" :
                                                "bg-red-500/20 text-red-400 border-red-500/20"
                                    )}>
                                        {part.availability_status?.toUpperCase() || 'IMPORT'}
                                    </div>
                                </div>
                                <div className="space-y-2 shrink-0">
                                    <div className="flex justify-between items-start">
                                        <div className="min-w-0 pr-2">
                                            <div className="text-xs text-indigo-400 font-bold uppercase truncate">{part.brand}</div>
                                            <h3 className="text-white font-bold truncate">{part.name}</h3>
                                        </div>
                                        {part.specs?.voltage && (
                                            <span className="shrink-0 text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                                                {part.specs.voltage}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 h-6 overflow-hidden">
                                        {part.tags && part.tags.map(tag => (
                                            tag !== 'Real Photo' && (
                                                <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded whitespace-nowrap">
                                                    {tag}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Tech News Hub */}
            <TechNewsHub />

            {/* Compare Tool Dock */}
            {compareList.length > 0 && (
                <CompareTool
                    parts={compareList}
                    onClose={() => setCompareList([])}
                    onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
                />
            )}

            {/* Detail Modal */}
            {selectedPart && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPart(null)}></div>
                    <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 relative z-10 flex flex-col h-full animate-in slide-in-from-right-full duration-300">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                            <div className="flex-1 mr-4">
                                <h2 className="text-2xl font-bold text-white leading-tight">{selectedPart.name}</h2>
                                {['In Baghdad', 'In Erbil'].includes(selectedPart.availability_status) && (
                                    <div className="flex items-center text-emerald-400 text-xs font-bold mt-1 cursor-pointer hover:underline" onClick={() => alert("Mock: Opening Map to Al-Sina'a Street...")}>
                                        <MapPin size={12} className="mr-1" /> Available in Al-Sina'a St.
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setSelectedPart(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white shrink-0">
                                <XCircleIcon />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Gallery View */}
                            <div className="space-y-4">
                                <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 relative group">
                                    <img
                                        src={selectedPart.gallery && selectedPart.gallery.length > 0 ? (selectedPart.gallery[activeImageIndex] || selectedPart.image) : selectedPart.image}
                                        alt="Main"
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-125 cursor-zoom-in"
                                    />
                                    {(selectedPart.availability_status === 'In Baghdad' || selectedPart.availability_status === 'In Erbil') && (
                                        <div className="absolute top-2 left-2 bg-emerald-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center shadow-lg">
                                            <CheckCircle size={10} className="text-white mr-1" /> Real Stock Photo
                                        </div>
                                    )}
                                </div>
                                {selectedPart.gallery && selectedPart.gallery.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                        {[selectedPart.image, ...selectedPart.gallery].map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx - 1)}
                                                className={cn(
                                                    "w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all",
                                                    (activeImageIndex === idx - 1)
                                                        ? "border-indigo-500 opacity-100"
                                                        : "border-transparent opacity-60 hover:opacity-100"
                                                )}
                                            >
                                                <img src={img} alt={`View ${idx} `} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm flex items-center justify-center transition-colors">
                                    <BrainCircuit size={16} className="mr-2" /> AI Opinion
                                </button>
                                <button
                                    onClick={() => handleRequestStock(selectedPart.id)}
                                    disabled={stockRequested.includes(selectedPart.id)}
                                    className="p-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-lg font-bold text-sm flex items-center justify-center transition-colors"
                                >
                                    <Globe size={16} className="mr-2" />
                                    {stockRequested.includes(selectedPart.id) ? "Requested" : "Request Stock"}
                                </button>
                            </div>

                            {/* Specs */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                                    <Zap className="mr-2 text-yellow-500" size={20} /> Specifications
                                </h3>
                                <div className="space-y-2">
                                    {selectedPart.specs && Object.entries(selectedPart.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-slate-800 text-sm">
                                            <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span className="text-indigo-300 font-mono">{value}</span>
                                        </div>
                                    ))}
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
