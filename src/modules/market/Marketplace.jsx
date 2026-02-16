import React, { useState } from 'react';
import { ShoppingCart, Truck, Globe } from 'lucide-react';

const Marketplace = () => {
    const [exchangeRate] = useState(1310); // 1 USD = 1310 IQD

    // Mock Data - In a real app, this would fetch from an API
    const products = [
        { id: 1, name: 'T-Motor F60 PRO V', price: 26.99, vendor: 'GetFPV' },
        { id: 2, name: 'SpeedyBee F405 V3 Stack', price: 69.99, vendor: 'AliExpress' },
        { id: 3, name: 'CNHL Black Series 1300mAh 6S', price: 22.90, vendor: 'RDQ' },
        { id: 4, name: 'Radiomaster Boxer (ELRS)', price: 139.99, vendor: 'Banggood' },
        { id: 5, name: 'HQProp 5x4.3x3 (Set)', price: 3.50, vendor: 'Local Shop (Baghdad)' },
    ];

    const convertToIQD = (usd) => {
        return new Intl.NumberFormat('ar-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(usd * exchangeRate);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Global Marketplace (Iraq Focus)</h2>
                    <p className="text-slate-400">Live Rate: $1.00 = {exchangeRate} IQD</p>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <Globe size={24} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors">
                        <div className="h-32 bg-slate-800 flex items-center justify-center text-slate-600">
                            <ShoppingCart size={32} />
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="text-xs text-indigo-400 font-bold uppercase tracking-wide">{product.vendor}</div>
                            <h3 className="text-white font-medium truncate">{product.name}</h3>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <div className="text-slate-500 text-xs">${product.price} USD</div>
                                    <div className="text-green-400 font-bold font-mono">{convertToIQD(product.price)}</div>
                                </div>
                                <button className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-colors">
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                    <Truck className="text-yellow-500" size={24} />
                    <h3 className="text-xl font-bold text-white">Logistics & Customs Estimator</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="font-semibold text-slate-300 mb-1">DDP (Shared Cargo)</div>
                        <div className="text-2xl font-bold text-white">$12<span className="text-sm font-normal text-slate-500">/kg</span></div>
                        <p className="text-slate-500 mt-2">Best for batteries/bulk. 15-20 days via Dubai hub.</p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="font-semibold text-slate-300 mb-1">DHL / FedEx Express</div>
                        <div className="text-2xl font-bold text-white">$45+</div>
                        <p className="text-slate-500 mt-2">Fastest (3-5 days). Expect 10-20% customs duty.</p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="font-semibold text-slate-300 mb-1">Al-Sina'a St. Pickup</div>
                        <div className="text-2xl font-bold text-green-400">Free</div>
                        <p className="text-slate-500 mt-2">Check local stock in Baghdad. No shipping time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
