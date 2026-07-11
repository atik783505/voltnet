'use client';
import React from "react";
import { Card } from "@heroui/react";
import { FiFileText } from "react-icons/fi";

export default function Blogs() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-b border-slate-200/60">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Resources</span>
                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">Latest EV Infrastructure Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { category: "Guide", title: "Preparing Commercial Buildings for Megawatt Charging Standards", read: "6 min read" },
                    { category: "Technical", title: "How V2G (Vehicle-to-Grid) Tech Can Monetize Idle Electric Fleet Batteries", read: "8 min read" },
                    { category: "Trends", title: "The Expansion Strategy for Ultra-Fast EV Corridors in Metro Areas", read: "4 min read" }
                ].map((blog, i) => (
                    <Card key={i} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group p-5 flex flex-col justify-between h-48">
                        <div>
                            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">{blog.category}</span>
                            <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mt-4">
                            <span className="flex items-center gap-1"><FiFileText size={12} /> Read Full Post</span>
                            <span>{blog.read}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}