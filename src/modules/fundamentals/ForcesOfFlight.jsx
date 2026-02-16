import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Info } from 'lucide-react';

const ForcesOfFlight = () => {
    // State for forces (0-100 scale)
    const [thrust, setThrust] = useState(50);
    const [weight, setWeight] = useState(50);
    const [pitch, setPitch] = useState(0); // -45 to 45 degrees

    // Derived states for visual feedback
    const verticalNet = thrust * Math.cos(pitch * (Math.PI / 180)) - weight;
    const horizontalNet = thrust * Math.sin(pitch * (Math.PI / 180));

    // Status text
    let status = "Hovering";
    if (verticalNet > 5) status = "Ascending";
    if (verticalNet < -5) status = "Descending";

    let movement = "Stationary";
    if (horizontalNet > 5) movement = "Moving Forward";
    if (horizontalNet < -5) movement = "Moving Backward";

    return (
        <div className="space-y-8">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-2">Forces of Flight</h2>
                <p className="text-slate-400">
                    Mastering physics is the first step to mastering flight.
                    Adjust the throttle (Thrust) and angle (Pitch) to see how vectors change.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls Area */}
                <div className="lg:col-span-1 space-y-6 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                    <h3 className="text-lg font-semibold text-indigo-400 flex items-center">
                        <Info className="mr-2" size={18} /> Flight Controls
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Throttle (Thrust) {thrust}%</label>
                            <input
                                type="range" min="0" max="100" value={thrust}
                                onChange={(e) => setThrust(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Payload (Weight) {weight}g</label>
                            <input
                                type="range" min="20" max="80" value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Pitch Angle {pitch}°</label>
                            <input
                                type="range" min="-45" max="45" value={pitch}
                                onChange={(e) => setPitch(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-sm text-slate-400">Net Vertical Force:</div>
                        <div className={`text-xl font-mono font-bold ${verticalNet > 0 ? 'text-green-400' : verticalNet < 0 ? 'text-red-400' : 'text-slate-200'}`}>
                            {verticalNet.toFixed(1)} N
                        </div>
                        <div className="text-sm text-slate-400 mt-2">Status:</div>
                        <div className="text-lg font-semibold text-white">{status}, {movement}</div>
                    </div>
                </div>

                {/* Visual Simulation Area */}
                <div className="lg:col-span-2 bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900 rounded-xl relative overflow-hidden h-[400px] border border-slate-700 flex items-center justify-center">

                    {/* Drone Body (Simplified Representation) */}
                    <div
                        className="relative transition-all duration-300 ease-out"
                        style={{
                            transform: `rotate(${pitch}deg) translateY(${-verticalNet * 1.5}px) translateX(${horizontalNet * 1.5}px)`
                        }}
                    >
                        {/* The Drone Icon/Shape */}
                        <div className="w-32 h-8 bg-slate-200 rounded-full relative z-10 shadow-xl flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute right-2 animate-pulse" /> {/* LED */}
                            <span className="text-xs font-bold text-slate-900 tracking-widest">DRONE-1</span>
                        </div>
                        <div className="absolute -top-4 -left-4 w-12 h-1 bg-slate-400 animate-spin-slow"></div> {/* Prop LF */}
                        <div className="absolute -top-4 -right-4 w-12 h-1 bg-slate-400 animate-spin-slow"></div> {/* Prop RF */}

                        {/* Force Vectors */}

                        {/* Thrust Vector (Always perpendicular to drone body) */}
                        <div
                            className="absolute bottom-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent to-green-400 origin-bottom transform -translate-x-1/2"
                            style={{ height: `${thrust * 2}px` }}
                        >
                            <ArrowUp className="absolute -top-4 -left-2 text-green-400" size={20} />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-green-400 drop-shadow-md">Thrust</span>
                        </div>

                        {/* Weight Vector (Always points down, regardless of pitch) */}
                        <div
                            className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-b from-transparent to-red-500 origin-top transform -translate-x-1/2"
                            style={{
                                height: `${weight * 2}px`,
                                transform: `translate(-50%, 0) rotate(${-pitch}deg)` // Counter-rotate to stay vertical
                            }}
                        >
                            <ArrowDown className="absolute -bottom-4 -left-2 text-red-500" size={20} />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500 drop-shadow-md">Gravity</span>
                        </div>

                    </div>

                    {/* Ground Plane */}
                    <div className="absolute bottom-0 w-full h-1 bg-slate-500/30"></div>
                </div>
            </div>

            {/* Educational Context */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h4 className="text-indigo-400 font-bold mb-2">Newton's Third Law</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        "For every action, there is an equal and opposite reaction."
                        The propellers push air downwards (Action), and the air pushes the drone upwards (Reaction/Thrust).
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h4 className="text-indigo-400 font-bold mb-2">Vector Decomposition</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        When you tilt (Pitch), the Thrust vector splits into two components:
                        <br />• <strong>Vertical Component</strong>: Fights gravity to keep you airborne.
                        <br />• <strong>Horizontal Component</strong>: Pushes you forward.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForcesOfFlight;
