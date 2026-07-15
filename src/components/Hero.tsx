'use client';
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiZap, FiArrowRight, FiShield, FiCpu, FiTrendingUp } from "react-icons/fi";

// ফিচার ইন্টারফেস টাইপ ডিফিনিশন
interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
    badge: string;
}

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const features: FeatureItem[] = [
        {
            icon: <FiCpu className="text-blue-500" size={20} />,
            title: "Smart Grid AI",
            desc: "Dynamically balances fleet charging nodes to prevent peak-load grid overcharges.",
            badge: "Live Telemetry"
        },
        {
            icon: <FiShield className="text-indigo-500" size={20} />,
            title: "Enterprise Security",
            desc: "Military-grade encryption for charging stations and secure infrastructure tokens.",
            badge: "ISO 27001"
        },
        {
            icon: <FiTrendingUp className="text-orange-500" size={20} />,
            title: "Cost Optimization",
            desc: "Reduces overall enterprise energy expenditure by up to 32% utilizing off-peak windows.",
            badge: "ROI Optimized"
        }
    ];

    const scrollToNext = () => {
        const nextSection = document.getElementById("next-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-[65vh] min-h-[500px] max-h-[650px] w-full bg-[#f4f7fa] flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-slate-200/60">
            
            {/* ─── BACKGROUND GLOW EFFECTS ─── */}
            <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600 via-indigo-500/30 to-transparent blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-25%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-orange-500 via-amber-500/25 to-transparent blur-[90px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            {/* ─── MAIN HERO CONTENT GRID ─── */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto max-w-7xl w-full mx-auto">
                
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 font-semibold text-xs tracking-wide uppercase shadow-sm">
                        <FiZap className="fill-blue-600" size={12} />
                        VoltNet OS v2.0 Live
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                        Powering the Future of <br />
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Enterprise EV Fleets
                        </span>
                    </h1>
                    
                    <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
                        Next-generation orchestration platform for mission-critical EV charging infrastructure. Monitor, scale, and optimize grid distribution in real-time.
                    </p>

                    <div className="flex items-center gap-4 pt-2 w-full sm:w-auto">
                        <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all text-sm group"
                            onClick={() => window.location.assign('/dashboard')}
                        >
                            Launch Console 
                            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                            variant="outline"
                            className="border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold h-11 px-6 rounded-xl text-sm transition-colors"
                            onClick={scrollToNext}
                        >
                            View Architecture
                        </Button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 w-full hidden md:block">
                    <div className="bg-white/90 backdrop-blur-lg border border-slate-200/80 rounded-2xl p-5 shadow-xl shadow-slate-900/5 relative overflow-hidden">
                        
                        {/* Interactive Tab Headers */}
                        <div className="flex gap-2 border-b border-slate-100 pb-3 mb-4">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                        activeTab === idx ? "bg-blue-600 w-6" : "bg-slate-200 hover:bg-slate-300"
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Slide Content */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl inline-block shadow-sm">
                                    {features[activeTab].icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                                    {features[activeTab].badge}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                {features[activeTab].title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed min-h-[40px]">
                                {features[activeTab].desc}
                            </p>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                    System Optimal
                                </span>
                                <span>Response: 14ms</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ─── BOTTOM VISUAL FLOW INDICATOR ─── */}
            <div className="relative z-10 flex flex-col items-center justify-center cursor-pointer group mt-4 select-none" onClick={scrollToNext}>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                    Explore Ecosystem
                </span>
                <svg 
                    className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all mt-1" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            
            <div id="next-section" className="absolute bottom-0" />
        </section>
    );
}