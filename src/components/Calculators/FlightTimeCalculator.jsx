import React, { useState, useEffect } from 'react';

const FlightTimeCalculator = () => {
    const [batteryCapacity, setBatteryCapacity] = useState(1500); // mAh
    const [dischargeRule, setDischargeRule] = useState(80); // %
    const [avgAmpDraw, setAvgAmpDraw] = useState(20); // Amps
    const [flightTime, setFlightTime] = useState(0);

    useEffect(() => {
        // Formula: (Capacity * (Discharge/100) / 1000) / Amps * 60
        // We divide by 1000 to convert mAh to Ah
        const safeCapacityAh = (batteryCapacity * (dischargeRule / 100)) / 1000;
        const timeInHours = safeCapacityAh / avgAmpDraw;
        const timeInMinutes = timeInHours * 60;

        setFlightTime(timeInMinutes > 0 && isFinite(timeInMinutes) ? timeInMinutes.toFixed(1) : 0);
    }, [batteryCapacity, dischargeRule, avgAmpDraw]);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 border border-gray-100">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
                        Drone Flight Time Calculator
                    </div>

                    <div className="space-y-4">
                        {/* Battery Capacity Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                                Battery Capacity (mAh)
                            </label>
                            <input
                                id="capacity"
                                type="number"
                                value={batteryCapacity}
                                onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="e.g. 1500"
                            />
                        </div>

                        {/* Discharge Rule Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discharge">
                                Battery Discharge Safety (%) ({dischargeRule}%)
                            </label>
                            <input
                                id="discharge"
                                type="range"
                                min="50"
                                max="100"
                                value={dischargeRule}
                                onChange={(e) => setDischargeRule(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Recommended: 80% to prolong LiPo life.
                            </div>
                        </div>

                        {/* Average Amp Draw Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amps">
                                Average Amp Draw (A)
                            </label>
                            <input
                                id="amps"
                                type="number"
                                value={avgAmpDraw}
                                onChange={(e) => setAvgAmpDraw(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="e.g. 20"
                            />
                        </div>
                    </div>

                    {/* Result Display */}
                    <div className="mt-8 bg-indigo-50 rounded-lg p-6 text-center">
                        <p className="text-gray-600 font-medium">Estimated Flight Time</p>
                        <div className="text-4xl font-extrabold text-indigo-600 mt-2">
                            {flightTime} <span className="text-xl text-indigo-400">min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightTimeCalculator;
