import React from 'react';
import { Newspaper, Bell, ArrowRight, Rss, ScanEye } from 'lucide-react';

const newsItems = [
    { id: 1, title: 'Betaflight 4.5.3 Released', category: 'Firmware', date: '2h ago', highlight: true },
    { id: 2, title: 'DJI O4 Air Unit Leaks', category: 'Hardware', date: '5h ago', highlight: false },
    { id: 3, title: 'ELRS v3.4 Update Guide', category: 'Radio', date: '1d ago', highlight: false },
    { id: 4, title: 'New T-Motor F7 Stack Verified', category: 'Local Stock', date: '2d ago', highlight: false },
];

const TechNewsHub = () => {
    return (
        <div className="w-64 bg-slate-900 border-l border-slate-800 hidden xl:flex flex-col h-[calc(100vh-6rem)]">
            <div className="p-4 border-b border-slate-800">
                <h2 className="text-white font-bold flex items-center">
                    <Rss className="text-indigo-500 mr-2" size={18} /> Tech Feed
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {newsItems.map(item => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.highlight ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                                {item.category.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-slate-500">{item.date}</span>
                        </div>
                        <h3 className="text-slate-300 text-sm font-medium leading-tight group-hover:text-indigo-400 transition-colors">
                            {item.title}
                        </h3>
                    </div>
                ))}

                <div className="pt-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                        <h4 className="text-white text-xs font-bold mb-2 flex items-center">
                            <Bell size={12} className="mr-1 text-yellow-500" /> Notifications
                        </h4>
                        <p className="text-xs text-slate-400 mb-2">
                            Get alerted when "T-Motor F7" arrives in Baghdad.
                        </p>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-1.5 rounded transition-colors">
                            Enable Alerts
                        </button>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3 border border-indigo-500/30">
                        <h4 className="text-white text-xs font-bold mb-2 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                            My Certifications
                        </h4>
                        <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-700">
                            <div className="p-1.5 bg-indigo-500/20 rounded">
                                <ScanEye size={16} className="text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-white leading-none mb-0.5">Visual Parts Mastery</div>
                                <div className="text-[8px] text-emerald-400 font-mono">VERIFIED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechNewsHub;
