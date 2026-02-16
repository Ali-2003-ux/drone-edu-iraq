import React, { useState } from 'react';
import { X, Check, Star, AlertTriangle, Zap, Minus, ScanEye } from 'lucide-react';
import { cn } from '../../utils/cn';
import VisualCompare from './VisualCompare';

const CompareTool = ({ parts, onClose, onRemove }) => {
    const [visualMode, setVisualMode] = useState(false);

    if (!parts || parts.length === 0) return null;

    // Helper to find "best" specs (Naive implementation for demo)
    const bestSpecs = {
        weight: Math.min(...parts.map(p => parseFloat(p.specs.weight) || 999)),
        current: Math.max(...parts.map(p => parseFloat(p.specs.current) || 0)),
        kv: Math.max(...parts.map(p => p.specs.kv || 0)),
    };

    const isBest = (part, key) => {
        const val = parseFloat(part.specs[key]) || part.specs[key];
        if (key === 'weight' && val === bestSpecs.weight) return true;
        if (key === 'current' && val === bestSpecs.current) return true;
        if (key === 'kv' && val === bestSpecs.kv) return true;
        return false;
    };

    return (
        <>
            {visualMode && parts.length === 2 && (
                <VisualCompare partA={parts[0]} partB={parts[1]} onClose={() => setVisualMode(false)} />
            )}

            <div className="fixed inset-x-0 bottom-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[60vh]">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Zap size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Compare Components ({parts.length}/3)</h3>
                            <p className="text-xs text-slate-400">Side-by-side technical analysis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {parts.length === 2 && (
                            <button
                                onClick={() => setVisualMode(true)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                <ScanEye size={16} className="mr-2" /> Visual Compare
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]">
                        {parts.map((part, idx) => (
                            <div key={part.id} className="relative bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                <button
                                    onClick={() => onRemove(part.id)}
                                    className="absolute top-2 right-2 p-1 bg-slate-700 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
                                >
                                    <Minus size={16} />
                                </button>

                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                                        <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-indigo-400 font-bold uppercase">{part.brand}</div>
                                        <h4 className="font-bold text-white text-sm line-clamp-2">{part.name}</h4>
                                        <div className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1",
                                            part.availability_status === 'In Baghdad' ? "bg-green-500/20 text-green-400" :
                                                part.availability_status === 'In Erbil' ? "bg-yellow-500/20 text-yellow-400" :
                                                    "bg-red-500/20 text-red-400"
                                        )}>
                                            {part.availability_status}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(part.specs).map(([specKey, specVal]) => (
                                        <div key={specKey} className={cn(
                                            "flex justify-between items-center p-2 rounded",
                                            isBest(part, specKey) ? "bg-green-500/10 border border-green-500/20" : "border border-transparent"
                                        )}>
                                            <span className="text-xs text-slate-400 uppercase">{specKey}</span>
                                            <div className="flex items-center">
                                                <span className={cn(
                                                    "font-mono text-sm",
                                                    isBest(part, specKey) ? "text-green-400 font-bold" : "text-white"
                                                )}>
                                                    {specVal}
                                                </span>
                                                {isBest(part, specKey) && <Star size={12} className="ml-1 text-green-400 fill-green-400" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Empty Slots */}
                        {Array.from({ length: 3 - parts.length }).map((_, i) => (
                            <div key={i} className="border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center p-8 text-slate-600">
                                <span className="text-sm">Select spec to compare</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompareTool;
