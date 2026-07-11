'use client';
import React from "react";
import { Button, Input } from "@heroui/react";
import { FiZap, FiMail } from "react-icons/fi";

export default function Newsletter() {
    return (
        <section className="py-20 px-6 max-w-5xl mx-auto relative z-10 text-center w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 blur-[90px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="p-3 bg-blue-600 text-white rounded-2xl w-fit mx-auto shadow-md shadow-blue-600/20">
                    <FiZap size={24} className="fill-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to Electrify Your Fleet Network?</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Subscribe to receive tailored infrastructure installation guides and live station pricing discount updates.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center max-w-md mx-auto pt-4">
                    <Input 
                        type="email" 
                        placeholder="Enter your enterprise email" 
                        className="bg-white border border-slate-200 rounded-xl text-sm"
                        startContent={<FiMail className="text-slate-400 mr-1" size={16} />}
                    />
                    <Button className="w-full sm:w-auto px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 rounded-xl transition-colors shadow-sm text-xs whitespace-nowrap">
                        Get Infrastructure Plan
                    </Button>
                </div>
            </div>
        </section>
    );
}