'use client';
import React from "react";
import { FiHelpCircle } from "react-icons/fi";

export default function FAQ() {
    return (
        <section className="py-20 px-6 max-w-4xl mx-auto relative z-10 border-b border-slate-200/60">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">FAQ</span>
                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">Common EV Infrastructure Questions</h2>
            </div>
            <div className="space-y-4">
                {[
                    { q: "Is VoltNet compatible with all electric vehicle models?", a: "Yes, our charging systems natively support all major standards including CCS1, CCS2, CHAdeMO, and NACS/Tesla adapters." },
                    { q: "How long does it typically take to charge from 20% to 80%?", a: "Using our 350kW DC Fast Stations, typical passenger or commercial EVs reach 80% battery capacity in under 15–20 minutes." },
                    { q: "Can we integrate this station firmware with our company's billing system?", a: "Absolutely. Our chargers support full OCPP 2.0.1 compliance, providing rich REST APIs for custom company software integration." }
                ].map((faq, i) => (
                    <div key={i} className="p-5 bg-white border border-slate-200/60 rounded-xl shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <FiHelpCircle className="text-blue-500 shrink-0" size={16} /> {faq.q}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 ml-6 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}