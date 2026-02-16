import React, { useState, useEffect } from 'react';
import { Scale, Gauge } from 'lucide-react';

const ThrustToWeightCalculator = () => {
    const [droneWeight, setDroneWeight] = useState(500); // grams
    const [motorCount, setMotorCount] = useState(4); // Quadcopter default
    const [maxThrustPerMotor, setMaxThrustPerMotor] = useState(800); // grams
    const [twr, setTwr] = useState(0);

    useEffect(() => {
        const totalThrust = motorCount * maxThrustPerMotor;
        const ratio = totalThrust / droneWeight;
        setTwr(isFinite(ratio) ? ratio.toFixed(1) : 0);
    }, [droneWeight, motorCount, maxThrustPerMotor]);

    const getRecommendation = (ratio) => {
        if (ratio < 1.5) return { text: "Too Low (Unflyable/Dangerous)", color: "text-red-500", bg: "bg-red-100" };
        if (ratio < 2.5) return { text: "Cinematic / Hover (Stable)", color: "text-blue-500", bg: "bg-blue-100" };
        if (ratio < 4.0) return { text: "Freestyle (Agile)", color: "text-green-500", bg: "bg-green-100" };
        if (ratio < 7.0) return { text: "Racing (High Performance)", color: "text-orange-500", bg: "bg-orange-100" };
        return { text: "Rocket Ship (Expert Only)", color: "text-purple-500", bg: "bg-purple-100" };
    };

    const recommendation = getRecommendation(Number(twr));

    return (
        <div className="max-w-2xl mx-auto space-y-8 p-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Scale className="text-indigo-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Thrust-to-Weight Ratio Calculator</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Total Drone Weight (AUW) in grams</label>
                            <input
                                type="number"
                                value={droneWeight}
                                onChange={(e) => setDroneWeight(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <p className="text-xs text-slate-400 mt-1">Include battery, GoPro, and props.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Number of Motors</label>
                            <div className="flex space-x-2">
                                {[4, 6, 8].map(count => (
                                    <button
                                        key={count}
                                        onClick={() => setMotorCount(count)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${motorCount === count
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {count} (X{count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Max Thrust per Motor (grams)</label>
                            <input
                                type="number"
                                value={maxThrustPerMotor}
                                onChange={(e) => setMaxThrustPerMotor(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <p className="text-xs text-slate-400 mt-1">Check your motor's data sheet.</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Calculated Ratio</div>
                        <div className="text-6xl font-black text-slate-800 my-2">{twr} : 1</div>

                        <div className={`mt-4 px-4 py-2 rounded-full text-sm font-bold ${recommendation.color} ${recommendation.bg}`}>
                            {recommendation.text}
                        </div>

                        <div className="mt-6 w-full bg-slate-200 rounded-full h-2">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((twr / 10) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between w-full text-xs text-slate-400 mt-1">
                            <span>1:1</span>
                            <span>5:1</span>
                            <span>10:1</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 text-slate-300 p-6 rounded-xl border border-slate-800">
                <h3 className="text-white font-bold text-lg mb-2 flex items-center">
                    <Gauge className="mr-2" size={20} /> Why TWR Matters?
                </h3>
                <p className="mb-4">
                    Thrust-to-Weight Ratio dictates the agility of your aircraft.
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                    <li><strong>2:1</strong> is the absolute minimum for safe flight. Below this, you lack control authority to recover from wind or descent.</li>
                    <li><strong>Hover Throttle:</strong> A 2:1 ratio hovers at 50% stick. A 4:1 ratio hovers at ~25% stick.</li>
                    <li><strong>Racing:</strong> High TWR allows for sharp cornering (high 'G' turns) and rapid ascent.</li>
                </ul>
            </div>
        </div>
    );
};

export default ThrustToWeightCalculator;
