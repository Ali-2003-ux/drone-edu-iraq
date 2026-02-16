import React, { useState } from 'react';
import { Eye, Upload, AlertTriangle, CheckCircle, Cpu } from 'lucide-react';

const VisualInspector = () => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                analyzeImage(); // Trigger simulation
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setAnalyzing(true);
        setResult(null);
        // Simulate Gemini Vision API latency
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                status: 'warning',
                issues: [
                    'Potential solder bridge detection on ESC Motor 2 pad.',
                    'Wire exposure length exceeds recommended 2mm on VBAT.',
                    'Flux residue detected - recommend cleaning with Isopropyl Alcohol.'
                ],
                confidence: 89
            });
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
                <div className="inline-flex p-3 bg-indigo-900/30 rounded-full mb-4">
                    <Eye className="text-indigo-400" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-white">AI Mechanic: Visual Inspector</h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Upload a macro photo of your Flight Controller soldering.
                    Our AI models (based on Gemini Vision) scan for shorts, cold joints, and wiring errors.
                </p>
            </div>

            <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-800 transition-colors relative overflow-hidden group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {!image ? (
                    <div className="space-y-4 pointer-events-none">
                        <div className="inline-flex p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                            <Upload className="text-slate-400" size={32} />
                        </div>
                        <div>
                            <p className="text-white font-medium">Click to upload or drag photo</p>
                            <p className="text-sm text-slate-500">Supports JPG, PNG (Max 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <img src={image} alt="Uploaded wiring" className="max-h-[400px] mx-auto rounded-lg shadow-2xl" />
                        {analyzing && (
                            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
                                <Cpu className="text-indigo-500 animate-pulse mb-4" size={48} />
                                <p className="text-indigo-300 font-medium animate-pulse">Analyzing connections...</p>
                                <p className="text-slate-500 text-xs mt-2">Processing via Gemini Vision v1.5</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {result && !analyzing && (
                <div className={`p-6 rounded-xl border animate-in slide-in-from-bottom-4 ${result.status === 'warning' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <div className="flex items-start space-x-4">
                        {result.status === 'warning' ? <AlertTriangle className="text-orange-500 shrink-0" size={24} /> : <CheckCircle className="text-green-500 shrink-0" size={24} />}
                        <div>
                            <h3 className={`text-lg font-bold mb-2 ${result.status === 'warning' ? 'text-orange-400' : 'text-green-400'}`}>
                                Analysis Report ({result.confidence}% Confidence)
                            </h3>
                            <ul className="space-y-2 text-slate-300">
                                {result.issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="mr-2 opacity-50">•</span>
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualInspector;
