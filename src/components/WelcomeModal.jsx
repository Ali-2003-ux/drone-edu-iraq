import React, { useState, useEffect } from 'react';
import { X, Cpu, Calculator, Folder, ArrowRight } from 'lucide-react';

const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('drone_edu_welcome_seen');
        if (!hasVisited) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('drone_edu_welcome_seen', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none"></div>

                <div className="p-1">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                                Beta Launch 🚀
                            </span>
                            <h2 className="text-3xl font-bold text-white">Welcome to DroneEdu Iraq</h2>
                            <p className="text-slate-400">
                                Your comprehensive platform for learning, building, and fixing FPV drones.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="p-3 bg-slate-800 rounded-lg mr-4 shrink-0">
                                    <Folder className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Project Vault</h3>
                                    <p className="text-sm text-slate-400">Save your builds, track costs, and manage parts lists locally.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-slate-800 rounded-lg mr-4 shrink-0">
                                    <Cpu className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">AI Mechanic</h3>
                                    <p className="text-sm text-slate-400">Upload photos of your wiring to check for errors automatically.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-slate-800 rounded-lg mr-4 shrink-0">
                                    <Calculator className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Engineering Tools</h3>
                                    <p className="text-sm text-slate-400">Simulate battery sag, thrust dynamics, and verify flight times.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg flex items-center justify-center transition-all hover:scale-[1.02] shadow-xl shadow-indigo-900/20"
                        >
                            Get Started <ArrowRight className="ml-2" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
