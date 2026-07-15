import React from 'react';
import { Target, Eye, Users, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { Avatar } from "@heroui/react";

export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-800">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Leaf className="w-3.5 h-3.5" /> Powering Green Mobility
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Smart Charging Infrastructure for Next-Gen Drivers
                </h1>
                <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
                    We are building a smart, secure, and highly reliable EV charging network management platform. Our solution bridges the gap between station operators (Admins) and electric vehicle users (Drivers) to make zero-emission travel effortless.
                </p>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* Mission */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        To simplify electric vehicle ownership by providing real-time charger statuses, frictionless payment models, and intelligent power management systems that optimize electricity grid loads.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                        <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        To accelerate global transition to sustainable energy by empowering cities with reliable and accessible smart-grid EV charging nodes powered entirely by renewable energy.
                    </p>
                </div>
            </div>

            {/* Platform Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
                <div className="text-center p-6 bg-slate-50/50 border border-slate-100 rounded-2xl">
                    <div className="mx-auto w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900">Real-time Telemetry</h4>
                    <p className="text-xs text-slate-500 mt-1">Track voltage, active charging, and session states instantly.</p>
                </div>
                <div className="text-center p-6 bg-slate-50/50 border border-slate-100 rounded-2xl">
                    <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                        <Users className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900">Role Management</h4>
                    <p className="text-xs text-slate-500 mt-1">Dedicated flows for Drivers, Station Owners, and Network Admins.</p>
                </div>
                <div className="text-center p-6 bg-slate-50/50 border border-slate-100 rounded-2xl">
                    <div className="mx-auto w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900">Secure Billing</h4>
                    <p className="text-xs text-slate-500 mt-1">PCI-compliant secure invoice system matching energy consumption.</p>
                </div>
            </div>

            {/* Team/Founder Section */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                        <Users className="text-emerald-600 w-6 h-6" />
                        Behind the Platform
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Meet the developer pioneering smart IoT solutions for green energy grids.
                    </p>
                </div>

                <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
                    {/* HeroUI Avatar */}
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-20 h-20 border-2 border-slate-100">
                            <Avatar.Fallback className="bg-emerald-50 text-emerald-600 font-bold text-xl">
                                AR
                            </Avatar.Fallback>
                        </Avatar>
                    </div>
                    <h3 className="font-bold text-slate-950 text-lg">Atikur Rahman</h3>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">
                        Founder & Lead Architect
                    </p>
                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                        Computer Science and Technology specialist designing scalable, real-time architectures. Passionate about green technology, full-stack web development, and optimizing load systems.
                    </p>
                </div>
            </div>
        </div>
    );
}