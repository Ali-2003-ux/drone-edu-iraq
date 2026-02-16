import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Terminal } from 'lucide-react';
import { cn } from '../../utils/cn';

const PidCopilot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! I\'m your PID Copilot. Describe your flight issue (e.g., "prop wash on descent" or "bouncy turns") and I\'ll suggest Betaflight adjustments.' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simple Regex Logic for now (Mock AI)
        setTimeout(() => {
            let response = "I'm not sure about that one. Try describing the oscillation speed (fast/slow) and when it happens.";
            const lowerInput = newMsg.text.toLowerCase();

            if (lowerInput.includes('prop wash') || lowerInput.includes('descent') || lowerInput.includes('wobble')) {
                response = "For prop wash handling: \n\n1. Increase D-Term Damping on Pitch/Roll.\n2. Move the Master Multiplier slider right (+0.1).\n3. CLI Attempt: `set d_min_roll = 30`";
            } else if (lowerInput.includes('bounce') || lowerInput.includes('land') || lowerInput.includes('stop')) {
                response = "Bounce back after flips/rolls usually means D-Term is too low or P-Term is too high. \n\nTry increasing D-Term by 5 clicks.";
            } else if (lowerInput.includes('hot') || lowerInput.includes('motor')) {
                response = "⚠️ HOT MOTORS WARNING! \n\nExcessive D-Term is the #1 cause. \n\n1. Drop D-Term significantly.\n2. Check your filtering settings (slide filter slider left).";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response }]);
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center space-x-3">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <Bot className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-white">PID Copilot</h2>
                    <p className="text-xs text-slate-400">Betaflight 4.5 Tuning Assistant</p>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map(msg => (
                    <div key={msg.id} className={cn("flex", msg.type === 'user' ? "justify-end" : "justify-start")}>
                        <div className={cn(
                            "max-w-[80%] rounded-2xl p-4 text-sm whitespace-pre-wrap",
                            msg.type === 'user'
                                ? "bg-indigo-600 text-white rounded-tr-none"
                                : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                        )}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-800/30 border-t border-slate-800">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Describe your flight issue..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PidCopilot;
