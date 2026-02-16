import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Battery, Zap, AlertTriangle } from 'lucide-react';

const BatterySimulator = () => {
    const [capacity, setCapacity] = useState(1300); // mAh
    const [cRating, setCRating] = useState(100);
    const [avgAmpDraw, setAvgAmpDraw] = useState(40); // Amps

    // Simulation Logic
    const generateData = () => {
        const data = [];
        const flightTimeMinutes = (capacity / 1000) / avgAmpDraw * 60;
        const totalSeconds = Math.floor(flightTimeMinutes * 60);

        // Voltage Sag Model (Simplified)
        // V_sag = Current * InternalResistance
        // IR approximates inversely with C-rating
        const internalResistance = 0.02 + (100 / cRating) * 0.01;
        const sag = avgAmpDraw * internalResistance;

        let voltage = 4.2; // Per cell start

        for (let t = 0; t <= totalSeconds; t += 10) { // 10s intervals
            // Non-linear discharge curve approximation
            const dischargedPercent = t / totalSeconds;
            let openCircuitVoltage = 4.2 - (0.5 * dischargedPercent) - (0.2 * Math.pow(dischargedPercent, 3));

            if (dischargedPercent > 0.85) openCircuitVoltage -= 0.1 * Math.pow((dischargedPercent - 0.85) * 10, 2); // Knee drop

            data.push({
                time: t,
                voltage: Math.max(3.0, (openCircuitVoltage - (sag * 0.1))).toFixed(2), // 0.1 factor for per-cell scaling
                sag: (sag * 0.1).toFixed(2)
            });
        }
        return data;
    };

    const data = generateData();

    return (
        <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex items-center space-x-3 mb-6">
                        <Battery className="text-green-500" size={24} />
                        <h2 className="text-xl font-bold text-white">Battery Config</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Capacity: {capacity}mAh</label>
                            <input type="range" min="300" max="5000" step="50" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg accent-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">C-Rating: {cRating}C</label>
                            <input type="range" min="10" max="150" value={cRating} onChange={(e) => setCRating(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg accent-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Avg Load: {avgAmpDraw}A</label>
                            <input type="range" min="5" max="100" value={avgAmpDraw} onChange={(e) => setAvgAmpDraw(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg accent-red-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/10 p-6 rounded-xl border border-indigo-500/20 text-sm space-y-3">
                    <h3 className="font-bold text-indigo-300 flex items-center"><Zap size={16} className="mr-2" /> Performance Insight</h3>
                    <p className="text-slate-300">
                        At <span className="text-white font-bold">{avgAmpDraw}A</span> load, your <span className="text-white font-bold">{cRating}C</span> battery will experience approx <span className="text-red-300 font-bold">{data[0].sag}v</span> per-cell voltage sag immediately.
                    </p>
                    {data[0].sag > 0.3 && (
                        <div className="flex items-start text-orange-400 bg-orange-400/10 p-2 rounded">
                            <AlertTriangle size={16} className="mr-2 mt-0.5 shrink-0" />
                            <span>Warning: High Sag! Battery may overheat or trigger low-voltage alarms early.</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 min-h-[400px]">
                <h3 className="text-lg font-bold text-white mb-4">Discharge Curve (Per Cell)</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            label={{ value: 'Seconds', position: 'insideBottomRight', offset: -5 }}
                            tickFormatter={(val) => `${Math.floor(val / 60)}:${(val % 60).toString().padStart(2, '0')}`}
                        />
                        <YAxis domain={[3.0, 4.3]} stroke="#64748b" label={{ value: 'Volts', angle: -90, position: 'insideLeft' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                        <ReferenceLine y={3.5} stroke="#eab308" strokeDasharray="3 3" label={{ value: "Land Now (3.5v)", fill: "#eab308", fontSize: 12 }} />
                        <ReferenceLine y={3.2} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Critical (3.2v)", fill: "#ef4444", fontSize: 12 }} />
                        <Line type="monotone" dataKey="voltage" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BatterySimulator;
