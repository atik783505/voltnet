import React from 'react';
import { Truck, BarChart3, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const fleetFeatures = [
    {
        icon: <Zap className="w-5 h-5 text-emerald-600" />,
        title: "Priority High-Power Charging",
        description: "Get dedicated access to high-speed DC fast chargers for your commercial vehicles to minimize downtime and keep your drivers moving."
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
        title: "Real-time Telemetry & Analytics",
        description: "Track live energy consumption, monitor session states, and see exactly which vehicle is charging at which station from a unified central dashboard."
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
        title: "Automated Corporate Billing",
        description: "Eliminate the hassle of individual driver receipts. Receive a single, consolidated corporate invoice based on monthly energy usage."
    }
];

export default function FleetSection() {
    return (
        <section className="bg-white border-y border-slate-100 py-16 sm:py-24 text-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column - Content & Branding */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                            <Truck className="w-3.5 h-3.5" /> Fleet Management
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Smart Charging Solutions for Corporate EV Fleets
                        </h2>
                        
                        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                            Keep your logistics, delivery, or ride-sharing EV fleet moving seamlessly. Our intelligent charging network provides central control for administrators and hassle-free charging sessions for active drivers.
                        </p>
                        
                        <div className="pt-2">
                            <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-xl transition shadow-sm">
                                Register Your Fleet
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Features Cards List */}
                    <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                        {fleetFeatures.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className="flex gap-4 p-5 bg-slate-50/60 border border-slate-150 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 transition duration-300 group"
                            >
                                {/* Icon Wrapper */}
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                    {feature.icon}
                                </div>
                                
                                {/* Text Details */}
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base mb-1">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Trust Indicators / Stats Banner */}
                <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.9%</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Uptime Guarantee</p>
                    </div>
                    <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">15 mins</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Avg. DC Fast Charge</p>
                    </div>
                    <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-purple-600">10k+</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Connected Commercial EVs</p>
                    </div>
                    <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">0%</p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Hidden Fuel Surcharges</p>
                    </div>
                </div>

            </div>
        </section>
    );
}