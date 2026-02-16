import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Wind, Activity } from 'lucide-react';

const PropellerModel = ({ rpm, size }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Visual Rotation Speed
            meshRef.current.rotation.y += (rpm / 100) * delta;
        }
    });

    // Scale: 5 inch prop = 1 unit roughly
    const scale = size / 5;

    return (
        <group>
            {/* Hub */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2 * scale, 0.2 * scale, 0.2, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Blade 1 */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[scale * 2.5, 0.05, 0.3 * scale]} />
                <meshStandardMaterial color="#6366f1" transparent opacity={rpm > 1000 ? 0.6 : 0.9} />
            </mesh>
        </group>
    );
};

const ThrustDynamics = () => {
    const [propSize, setPropSize] = useState(5); // Inches
    const [kv, setKv] = useState(1750);
    const [voltage, setVoltage] = useState(25.2); // 6S
    const [throttle, setThrottle] = useState(20); // %

    // Simplified Physics Math for Demo
    const maxRpm = kv * voltage;
    const currentRpm = maxRpm * (throttle / 100);
    // Force ~ RPM^2 * D^4 (Approximation)
    const forceN = (2 * Math.pow(propSize, 3.5) * Math.pow(currentRpm, 2)) / 10000000000; // Fake constant for demo scaling
    const forceKg = forceN; // Keeping numbers readable

    return (
        <div className="grid lg:grid-cols-5 gap-8 h-[calc(100vh-140px)] animate-in fade-in duration-500">
            {/* 3D Viewport */}
            <div className="lg:col-span-3 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur p-3 rounded-lg border border-white/10 text-white shadow-lg">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Telemetery</div>
                    <div className="text-lg font-mono">{Math.round(currentRpm).toLocaleString()} RPM</div>
                </div>

                <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
                    <color attach="background" args={['#0f172a']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <PropellerModel rpm={currentRpm} size={propSize} />
                    <Grid args={[10, 10]} cellSize={0.5} cellThickness={0.5} sectionSize={3} sectionThickness={1} fadeDistance={10} sectionColor="#4f46e5" cellColor="#1e293b" />
                    <OrbitControls autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Controls & Data */}
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="flex items-center space-x-3 mb-6">
                        <Activity className="text-indigo-500" size={24} />
                        <h2 className="text-2xl font-bold text-white">Thrust Simulation</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Throttle</span>
                                <span className="text-indigo-400 font-bold">{throttle}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={throttle} onChange={e => setThrottle(Number(e.target.value))} className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer" />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Prop Size</span>
                                <span className="text-white">{propSize}"</span>
                            </div>
                            <input type="range" min="3" max="10" step="1" value={propSize} onChange={e => setPropSize(Number(e.target.value))} className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer" />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Motor KV</span>
                                <span className="text-white">{kv} KV</span>
                            </div>
                            <input type="range" min="1000" max="3000" step="50" value={kv} onChange={e => setKv(Number(e.target.value))} className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl">
                        <div className="text-indigo-300 text-sm font-medium mb-1">Est. Thrust</div>
                        <div className="text-2xl font-bold text-white">{(forceKg * 4).toFixed(1)} <span className="text-lg font-normal text-slate-400">kg (Total)</span></div>
                    </div>
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
                        <div className="text-slate-400 text-sm font-medium mb-1">Power Draw</div>
                        <div className="text-2xl font-bold text-white">{Math.round(throttle * 0.8)} <span className="text-lg font-normal text-slate-400">Amps</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThrustDynamics;
