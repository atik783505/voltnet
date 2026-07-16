import React from 'react';
import { Zap } from 'lucide-react';

export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4f7fa]/80 backdrop-blur-md">
            <div className="relative flex flex-col items-center gap-4">
                {/* Glowing charging bolt animation */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-100 shadow-lg shadow-blue-500/10">
                    <Zap className="text-blue-600 fill-blue-600 animate-pulse" size={28} />
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-600 animate-spin" />
                </div>
                
                {/* Loading text with subtext */}
                <div className="text-center">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight">VoltNet is charging</h3>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Connecting to infrastructure...</p>
                </div>
            </div>
        </div>
    );
}
