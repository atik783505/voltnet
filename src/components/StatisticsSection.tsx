'use client';
import React from "react";

export default function Statistics() {
    return (
        <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full translate-x-1/2 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                {[
                    { val: "12,450+", label: "Active Charging Stations" },
                    { val: "99.98%", label: "Station Network Uptime" },
                    { val: "45M+", label: "EV Miles Powered" },
                    { val: "250K吨", label: "CO2 Emissions Reduced" }
                ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                        <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">{stat.val}</h3>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}