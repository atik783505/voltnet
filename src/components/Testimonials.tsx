'use client';
import React from "react";
import { Card } from "@heroui/react";
import { FiMessageSquare } from "react-icons/fi";

export default function Testimonials() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-slate-200/60">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Driver Feedback</span>
                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">What Fleet Operators Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { quote: "Switching our logistics delivery vans to VoltNet stations eliminated our fleet's charging anxiety entirely. The Plug & Charge system works instantly.", author: "Rahat Khan", role: "Fleet Director, E-Drop Logistics" },
                    { quote: "The dynamic load management software saved us thousands of dollars in commercial peak-demand electricity surcharges this quarter alone.", author: "Tasnim Ahmed", role: "Operations Lead, GreenTransit Corp" },
                    { quote: "The station's liquid-cooled cables are remarkably lightweight and easy to handle compared to older bulky 150kW high-voltage systems.", author: "Imran Chowdhury", role: "EV Driver, Urban Delivery Services" }
                ].map((t, i) => (
                    <Card key={i} className="p-6 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-sm flex flex-col justify-between">
                        <p className="text-xs italic text-slate-500 leading-relaxed mb-6">"{t.quote}"</p>
                        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                            <FiMessageSquare className="text-slate-400 shrink-0" size={14} />
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                                <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}