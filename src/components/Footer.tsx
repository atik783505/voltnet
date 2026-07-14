'use client';
import { usePathname } from "next/navigation";
import React from "react";
import { FiZap, FiGithub, FiTwitter, FiLinkedin, FiGlobe } from "react-icons/fi";

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();
    if (pathname.includes('/dashboard')) return null;

    return (
        <footer className="w-full bg-slate-950 text-slate-400 relative overflow-hidden border-t border-slate-900 pt-16 pb-8 px-6">

            {/* ─── BACKGROUND DECORATIONS ─── */}
            {/* Subtle blue ambient glow at the bottom center */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-900">

                {/* Brand Identity Column (4 Columns) */}
                <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <FiZap size={24} className="fill-blue-500 text-blue-500" />
                        <span className="text-xl font-bold tracking-tight">VoltNet</span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                        Next-generation orchestration platform for mission-critical EV charging infrastructure. Powering commercial fleets and public highway corridors globally.
                    </p>
                    {/* Social Handles */}
                    <div className="flex items-center gap-4 pt-2">
                        <a href="#" className="hover:text-blue-500 transition-colors"><FiTwitter size={16} /></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><FiLinkedin size={16} /></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><FiGithub size={16} /></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><FiGlobe size={16} /></a>
                    </div>
                </div>

                {/* Infrastructure Column (2 Columns) */}
                <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Infrastructure</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:text-white transition-colors">350kW Fast Chargers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Fleet Hub Depots</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Load Management</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Station Firmware</a></li>
                    </ul>
                </div>

                {/* Software Ecosystem Column (2 Columns) */}
                <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ecosystem</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:text-white transition-colors">VoltNet SaaS Portal</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">OCPP 2.0.1 APIs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Driver Mobile App</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Carbon Reporting</a></li>
                    </ul>
                </div>

                {/* Compliance & Resources Column (2 Columns) */}
                <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:text-white transition-colors">ISO 15118 Standard</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Network Status</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Support Desk</a></li>
                    </ul>
                </div>

                {/* Corporate Column (2 Columns) */}
                <div className="md:col-span-2 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

            </div>

            {/* ─── BOTTOM UTILITY BAR ─── */}
            <div className="max-w-7xl mx-auto relative z-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
                <p>© {currentYear} VoltNet Infrastructure Inc. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Security Compliance</a>
                </div>
            </div>

        </footer>
    );
}