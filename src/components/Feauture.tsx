'use client';
import React from "react";
import { Card } from "@heroui/react";
import { FiCpu, FiShield, FiZap } from "react-icons/fi";

export default function Features() {
    return (
        <section id="next-section" className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-slate-200/60">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Smart Infrastructure</span>
                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">Advanced EV Charging Infrastructure</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: <FiZap className="text-orange-500" size={24} />, title: "Ultra-Fast 350kW Charging", desc: "Next-gen liquid-cooled DC fast chargers capable of powering up long-haul commercial EVs in under 20 minutes." },
                    { icon: <FiCpu className="text-blue-600" size={24} />, title: "Dynamic Load Management", desc: "Smart AI algorithms distribute available station power efficiently without overloading the local utility grid." },
                    { icon: <FiShield className="text-indigo-600" size={24} />, title: "Secure Plug & Charge", desc: "ISO 15118 protocol integration allows automatic vehicle recognition and encrypted automated billing upon plugin." }
                ].map((item, i) => (
                    <Card key={i} className="p-6 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-xl shadow-slate-900/5 rounded-2xl">
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl w-fit mb-4 shadow-sm">{item.icon}</div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}