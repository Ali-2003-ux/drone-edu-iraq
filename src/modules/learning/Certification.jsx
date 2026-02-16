import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const quizzes = {
    fundamentals: {
        title: "Aerodynamics & Physics",
        questions: [
            {
                q: "What component is responsible for changing the drone's yaw significantly?",
                options: ["Increasing thrust on all motors", "Slowing down diagonal motor pairs", "Tilting the camera", "Changing battery voltage"],
                correct: 1
            },
            {
                q: "If you double the propeller RPM, theoretically how much does thrust increase?",
                options: ["2x", "4x (Squared)", "8x", "It stays the same"],
                correct: 1
            }
        ]
    },
    hardware: {
        title: "Hardware Engineering",
        questions: [
            {
                q: "Which material is best for high-frequency vibration damping but breaks easily?",
                options: ["Carbon Fiber", "TPU (Thermoplastic Polyurethane)", "Aluminum", "Glass"],
                correct: 1 // Trick question - TPU is for damping, but doesn't break. Actually none fit perfectly, let's fix.
                // Re-phrase: "What is Carbon Fiber known for?" -> Stiffness/Conductivity.
            },
            {
                q: "A 2306 1750KV motor is best suited for which battery voltage?",
                options: ["4S (16.8V)", "6S (25.2V)", "1S (4.2V)", "12S"],
                correct: 1
            }
        ]
    }
};

// Fixing the quiz content for display
const quizData = [
    {
        q: "What defines a '6S' battery?",
        options: ["6000mAh Capacity", "6 Cells in Parallel", "6 Cells in Series", "60C Discharge Rate"],
        correct: 2
    },
    {
        q: "Which frame material conducts electricity and can short your components?",
        options: ["Carbon Fiber", "Plastic", "Wood", "Fiberglass"],
        correct: 0
    },
    {
        q: "In Betaflight, what does 'D-Term' primarily do?",
        options: ["Increases speed", "Dampens measurement noise and overshoot", "Controls rotation speed", "Filters video"],
        correct: 1
    }
];

const Certification = () => {
    const [started, setStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (idx) => {
        if (idx === quizData[currentQ].correct) {
            setScore(prev => prev + 1);
        }

        if (currentQ < quizData.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            setFinished(true);
        }
    };

    const reset = () => {
        setStarted(false);
        setCurrentQ(0);
        setScore(0);
        setFinished(false);
    };

    if (!started) {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-500 py-12">
                <div className="inline-flex p-6 bg-yellow-500/10 rounded-full border border-yellow-500/30">
                    <Award className="text-yellow-500" size={64} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white mb-4">Certified Drone Hobbyist</h1>
                    <p className="text-slate-400 text-lg">
                        Prove your knowledge in Aerodynamics, Electronics, and Safety.
                        Pass the exam to earn your digital badge.
                    </p>
                </div>
                <button
                    onClick={() => setStarted(true)}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105"
                >
                    Start Certification Exam
                </button>
            </div>
        );
    }

    if (finished) {
        const passed = score >= 2;
        return (
            <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center animate-in zoom-in-95">
                <div className={cn("inline-flex p-4 rounded-full mb-6", passed ? "bg-green-500/20" : "bg-red-500/20")}>
                    {passed ? <Award className="text-green-500" size={48} /> : <XCircle className="text-red-500" size={48} />}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{passed ? "Certification Granted!" : "Exam Failed"}</h2>
                <p className="text-slate-400 mb-6">
                    You scored {score} out of {quizData.length}.
                    {passed ? " You have demonstrated core competency." : " Review the modules and try again."}
                </p>
                {passed && (
                    <div className="p-4 bg-slate-800 rounded-lg mb-6 border border-slate-700">
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Badge ID</div>
                        <div className="font-mono text-indigo-400 select-all">IRQ-EDU-{Math.floor(Math.random() * 10000)}</div>
                    </div>
                )}
                <button onClick={reset} className="text-indigo-400 hover:text-white font-medium">
                    {passed ? "Return Home" : "Try Again"}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center text-sm text-slate-500 font-mono uppercase tracking-wider">
                <span>Question {currentQ + 1} of {quizData.length}</span>
                <span>DroneEdu Exam</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-8 leading-relaxed">
                    {quizData[currentQ].q}
                </h3>

                <div className="space-y-3">
                    {quizData[currentQ].options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full text-left p-4 rounded-xl border border-slate-700 hover:bg-slate-800 hover:border-indigo-500 transition-all group"
                        >
                            <span className="inline-block w-6 h-6 rounded-full border border-slate-600 mr-3 text-center leading-5 text-slate-500 text-xs group-hover:border-indigo-500 group-hover:text-indigo-500">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-slate-300 group-hover:text-white">{opt}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Certification;
