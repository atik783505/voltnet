import React from 'react';
import { Building2, Users, MapPin, ShieldCheck } from 'lucide-react';

export default function CompanyOverview() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header section */}
            <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <Building2 size={24} className="text-blue-600" /> Company Overview
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                    General organizational stats, active station footprint, and user base summary.
                </p>
            </div>

            {/* Overview Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Card 1: Active Users */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Users</p>
                        <h3 className="text-xl font-black text-slate-800">
                            0 <span className="text-xs font-medium text-slate-400">Users</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100/50 rounded-xl text-blue-600">
                        <Users size={20} />
                    </div>
                </div>

                {/* Card 2: Operating Stations */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operating Stations</p>
                        <h3 className="text-xl font-black text-slate-800">
                            0 <span className="text-xs font-medium text-slate-400">Locations</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-100/50 rounded-xl text-purple-600">
                        <MapPin size={20} />
                    </div>
                </div>

                {/* Card 3: Network Status */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Status</p>
                        <h3 className="text-xl font-black text-emerald-600">
                            Operational
                        </h3>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100/50 rounded-xl text-emerald-600">
                        <ShieldCheck size={20} />
                    </div>
                </div>

            </div>
        </div>
    );
}