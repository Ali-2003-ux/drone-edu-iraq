import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useTexture } from '@react-three/drei';
import { X, Ruler, Rotate3d, Box, Maximize, ArrowLeftRight } from 'lucide-react';
import { cn } from '../../utils/cn';

// Simple 3D Box Representation with Image Texture
const BoxModel = ({ imageUrl }) => {
    const texture = useTexture(imageUrl);
    return (
        <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[2, 2, 0.2]} /> {/* Flat-ish box to resemble a component */}
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const ThreeDView = ({ imageUrl }) => {
    return (
        <div className="w-full h-full bg-slate-900 relative">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6}>
                        <BoxModel imageUrl={imageUrl} />
                    </Stage>
                    <OrbitControls autoRotate />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur">
                Interactive 3D Preview
            </div>
        </div>
    );
};

const VisualCompare = ({ partA, partB, onClose }) => {
    const [mode3D, setMode3D] = useState(false);

    if (!partA || !partB) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <ArrowLeftRight className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Cinematic Comparison</h2>
                        <p className="text-slate-400 text-sm">Visual Scale & Dimension Analysis</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMode3D(!mode3D)}
                        className={cn(
                            "px-4 py-2 rounded-lg font-bold flex items-center transition-all",
                            mode3D ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        )}
                    >
                        <Rotate3d size={18} className="mr-2" />
                        {mode3D ? "2D Flat View" : "3D Interactive"}
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X size={28} />
                    </button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden">
                {/* Part A */}
                <div className="flex-1 relative group bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-white font-mono text-xs">
                        ITEM A
                    </div>
                    <div className="flex-1 relative flex items-center justify-center p-12">
                        {mode3D ? (
                            <ThreeDView imageUrl={partA.image} />
                        ) : (
                            <div className="relative w-full max-w-md aspect-square">
                                <img src={partA.image} alt={partA.name} className="w-full h-full object-contain drop-shadow-2xl" />
                                {/* Mock Dimension Lines */}
                                <div className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-lg pointer-events-none">
                                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-indigo-400 text-xs font-mono whitespace-nowrap">
                                        HEIGHT: {partA.specs?.mounting || '30mm'}
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-indigo-400 text-xs font-mono whitespace-nowrap">
                                        WIDTH: {partA.specs?.size ? `${partA.specs.size}mm` : 'Standard'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-slate-900/50 border-t border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-1">{partA.name}</h3>
                        <div className="text-indigo-400 text-sm font-bold">{partA.brand}</div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {Object.entries(partA.specs || {}).slice(0, 4).map(([k, v]) => (
                                <div key={k}>
                                    <div className="text-xs text-slate-500 uppercase">{k}</div>
                                    <div className="text-white font-mono text-sm">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Part B */}
                <div className="flex-1 relative group bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-white font-mono text-xs">
                        ITEM B
                    </div>
                    <div className="flex-1 relative flex items-center justify-center p-12">
                        {mode3D ? (
                            <ThreeDView imageUrl={partB.image} />
                        ) : (
                            <div className="relative w-full max-w-md aspect-square">
                                <img src={partB.image} alt={partB.name} className="w-full h-full object-contain drop-shadow-2xl" />
                                {/* Mock Dimension Lines */}
                                <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-lg pointer-events-none">
                                    <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-emerald-400 text-xs font-mono whitespace-nowrap">
                                        HEIGHT: {partB.specs?.mounting || '30mm'}
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-emerald-400 text-xs font-mono whitespace-nowrap">
                                        WIDTH: {partB.specs?.size ? `${partB.specs.size}mm` : 'Standard'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-slate-900/50 border-t border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-1">{partB.name}</h3>
                        <div className="text-emerald-400 text-sm font-bold">{partB.brand}</div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {Object.entries(partB.specs || {}).slice(0, 4).map(([k, v]) => (
                                <div key={k}>
                                    <div className="text-xs text-slate-500 uppercase">{k}</div>
                                    <div className="text-white font-mono text-sm">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Footer */}
            <div className="bg-slate-900 p-4 border-t border-slate-800 text-center text-slate-500 text-xs">
                Rendering 3D Interactive Models • Scale 1:1 Approximation
            </div>
        </div>
    );
};

export default VisualCompare;
