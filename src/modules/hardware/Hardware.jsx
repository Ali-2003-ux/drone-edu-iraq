import React from 'react';
import { Cpu, Scale, Ruler, Zap } from 'lucide-react';

const Hardware = () => {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex p-3 bg-indigo-900/30 rounded-full mb-4">
                    <Cpu className="text-indigo-400" size={32} />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Drone Hardware Principles</h1>
                <p className="text-lg text-slate-400">
                    Understanding the core components: Frames, Propulsion, and Materials.
                </p>
            </div>

            {/* Section 1: Frame Size */}
            <section className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                <div className="flex items-center space-x-3 mb-6">
                    <Ruler className="text-indigo-500" size={24} />
                    <h2 className="text-2xl font-bold text-white">1. Frame Size & Prop Selection</h2>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                    The "Wheelbase" (diagonal motor-to-motor distance) defines your drone's character.
                    It dictates the maximum prop size, which is the most critical factor in performance.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-800 text-slate-200 uppercase font-bold">
                            <tr>
                                <th className="p-4 rounded-tl-lg">Wheelbase</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">Prop Size</th>
                                <th className="p-4 rounded-tr-lg">Application</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-mono text-indigo-400">65-85mm</td>
                                <td className="p-4 text-white">Tiny Whoop</td>
                                <td className="p-4">31-40mm</td>
                                <td className="p-4">Indoor flying, micro FPV</td>
                            </tr>
                            <tr className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-mono text-indigo-400">100-150mm</td>
                                <td className="p-4 text-white">Toothpick / Micro</td>
                                <td className="p-4">2" - 3"</td>
                                <td className="p-4">Park flying, quiet racing</td>
                            </tr>
                            <tr className="hover:bg-slate-800/50 transition-colors bg-indigo-900/10">
                                <td className="p-4 font-mono text-indigo-400 font-bold">200-250mm</td>
                                <td className="p-4 text-white font-bold">5-Inch Standard</td>
                                <td className="p-4 font-bold">5" - 5.1"</td>
                                <td className="p-4 text-indigo-200">Freestyle, FPV Racing (Standard)</td>
                            </tr>
                            <tr className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-mono text-indigo-400">280-350mm</td>
                                <td className="p-4 text-white">7-Inch Long Range</td>
                                <td className="p-4">7"</td>
                                <td className="p-4">Mountain surfing, Cinematic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-4 bg-indigo-900/20 text-indigo-300 rounded-lg text-sm border border-indigo-500/20">
                    <strong>Rule of Thumb:</strong> Larger props are more efficient (g/W) but react slower. Smaller props are less efficient but offer snappy, responsive control.
                </div>
            </section>

            {/* Section 2: Materials */}
            <section className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                <div className="flex items-center space-x-3 mb-6">
                    <Scale className="text-indigo-500" size={24} />
                    <h2 className="text-2xl font-bold text-white">2. Frame Materials</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-2 flex justify-between">
                            Carbon Fiber
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">The Standard</span>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Highest strength-to-weight ratio</li>
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Extremely stiff (good for PID tuning)</li>
                            <li className="flex"><span className="text-red-400 mr-2">✗</span> Expensive & blocks RF signals</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-2">Injection Molded Plastic</div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Extremely durable (elastic)</li>
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Cheap for mass production</li>
                            <li className="flex"><span className="text-red-400 mr-2">✗</span> Flexes under high power (oscillations)</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-2">Aluminum</div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Cheap & acts as heatsink</li>
                            <li className="flex"><span className="text-red-400 mr-2">✗</span> Bends permanently in crashes</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-2">3D Printed (PLA/PETG)</div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex"><span className="text-green-400 mr-2">✓</span> Rapid prototyping</li>
                            <li className="flex"><span className="text-red-400 mr-2">✗</span> Heavy for its strength</li>
                            <li className="flex"><span className="text-red-400 mr-2">✗</span> "Jello" vibrations in video</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 3: TWR Teaser */}
            <section className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 border border-indigo-500/30">
                <div className="flex items-center space-x-3 mb-4">
                    <Zap className="text-yellow-400" size={24} />
                    <h2 className="text-xl font-bold text-white">Thrust-to-Weight Ratio (TWR)</h2>
                </div>
                <p className="text-slate-300 mb-6">
                    A ratio of <strong>2:1</strong> is needed for safe hover. Racing drones often hit <strong>10:1</strong>.
                    Want to check your build?
                </p>
                <a href="/tools" className="inline-block px-6 py-2 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                    Open Calculator
                </a>
            </section>

        </div>
    );
};

export default Hardware;
