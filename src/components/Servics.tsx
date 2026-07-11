'use client';
import React from "react";
import { Button, Card } from "@heroui/react";
import { FiLayers, FiActivity } from "react-icons/fi";

export default function Services() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-slate-200/60">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Charging Solutions</span>
                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">Flexible EV Solutions For Everyone</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { icon: <FiLayers size={22} className="text-blue-600" />, title: "Commercial Fleet Hubs", points: ["Centralized depot management system", "Scheduled pre-conditioning & overnight queues", "Detailed energy tracking & carbon reporting", "Multi-vehicle simultaneous power distribution"] },
                    { icon: <FiActivity size={22} className="text-orange-600" />, title: "Public Highway Corridors", points: ["High-traffic DC Fast Charger deployment", "Integrated POS terminal & mobile app payment", "Live bay availability & queue telemetry", "Weatherproof robust outdoor enclosures"] }
                ].map((service, i) => (
                    <Card key={i} className="p-8 bg-white/90 border border-slate-200/80 shadow-xl rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">{service.icon}</div>
                                <h3 className="text-xl font-bold">{service.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {service.points.map((p, idx) => (
                                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" /> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button className="mt-8 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs h-10 rounded-xl transition-colors">Explore Solution</Button>
                    </Card>
                ))}
            </div>
        </section>
    );
}