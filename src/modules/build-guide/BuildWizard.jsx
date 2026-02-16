import React, { useState } from 'react';
import { CheckCircle, Circle, Wrench } from 'lucide-react';

const steps = [
    { title: "Frame Assembly", desc: "Mount the arms to the main plate. Use Loctite on screws." },
    { title: "Motor Mounting", desc: "Install 4 motors. Ensure wires point towards the center." },
    { title: "ESC Wiring", desc: "Solder motor wires to the 4-in-1 ESC. Check for bridges." },
    { title: "Flight Controller", desc: "Mount FC on top of ESC. Connect the ribbon cable." },
    { title: "Receiver Bind", desc: "Power via USB and bind your radio receiver." },
    { title: "Video System", desc: "Install Camera and VTX. Ensure antenna is secure." },
    { title: "Betaflight Config", desc: "Connect to PC. Set motor direction and UART ports." },
    { title: "Maiden Flight", desc: "Test in an open field. Keep distance." }
];

const BuildWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
                    <Wrench className="text-white" size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Interactive Build Guide</h1>
                    <p className="text-slate-500">Track your progress from parts to sky.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Steps List */}
                <div className="space-y-0 relative">
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentStep(idx)}
                            className={`relative pl-10 py-3 cursor-pointer group transition-all ${currentStep === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white border-2 z-10 transition-colors ${idx < currentStep ? 'border-green-500 text-green-500' :
                                    idx === currentStep ? 'border-indigo-600 text-indigo-600' : 'border-slate-300 text-slate-300'
                                }`}>
                                {idx < currentStep ? <CheckCircle size={18} /> :
                                    idx === currentStep ? <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" /> :
                                        <Circle size={18} />}
                            </div>
                            <h3 className={`font-semibold ${idx === currentStep ? 'text-indigo-700' : 'text-slate-700'}`}>{step.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Content Card */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 h-full flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-[100px] -z-0 opacity-50"></div>

                        <div className="relative z-10 flex-1">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">{steps[currentStep].title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{steps[currentStep].desc}</p>

                            <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                <h4 className="text-sm font-bold text-indigo-800 uppercase mb-2">Pro Tip</h4>
                                <p className="text-sm text-indigo-700">
                                    Take your time. A rushed build is a crashed build. Double check every solder joint with a multimeter before plugging in a battery.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8 relative z-10">
                            <button
                                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                disabled={currentStep === 0}
                                className="px-6 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-100 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-600/30 transition-all"
                            >
                                {currentStep === steps.length - 1 ? 'Finish!' : 'Next Step'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildWizard;
