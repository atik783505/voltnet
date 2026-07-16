import React from 'react';
import { getAllUsers } from '@/lib/api/user';
import { getAllStations } from '@/lib/api/station';
import AdminRecharts from '@/components/dashboard/AdminRecharts';
import { Users, MapPin, Zap, DollarSign, Award } from 'lucide-react';
import { UserInput, StationInput } from '@/types';

export default async function Adminhome() {
    // Fetch users and stations concurrently on the server
    const [usersRes, stationsRes] = await Promise.all([
        getAllUsers(),
        getAllStations('?limit=100')
    ]);

    const users: UserInput[] = Array.isArray(usersRes) 
        ? usersRes 
        : (usersRes?.users || usersRes?.data || []);

    const stations: StationInput[] = Array.isArray(stationsRes)
        ? stationsRes
        : (stationsRes?.stations || stationsRes?.data || []);

    // Metric calculations
    const totalUsers = users.length;
    const totalStations = stations.length;
    
    const totalCapacity = stations.reduce((acc, s) => acc + (s.powerOutput || 0), 0);
    const avgPrice = totalStations > 0 
        ? (stations.reduce((acc, s) => acc + (s.pricing || 0), 0) / totalStations).toFixed(1)
        : "0.0";

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header section */}
            <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <Award size={24} className="text-blue-600" /> Admin Console Overview
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                    VoltNet system-wide analytics, infrastructure status, and fleet metrics.
                </p>
            </div>

            {/* Overview Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Registered Users */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                        <h3 className="text-xl font-black text-slate-800">
                            {totalUsers} <span className="text-xs font-medium text-slate-400">Members</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100/50 rounded-xl text-blue-600">
                        <Users size={20} />
                    </div>
                </div>

                {/* Card 2: Total Stations */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Stations</p>
                        <h3 className="text-xl font-black text-slate-800">
                            {totalStations} <span className="text-xs font-medium text-slate-400">Hubs</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-100/50 rounded-xl text-purple-600">
                        <MapPin size={20} />
                    </div>
                </div>

                {/* Card 3: Capacity (kW) */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Charging Capacity</p>
                        <h3 className="text-xl font-black text-amber-600">
                            {totalCapacity} <span className="text-xs font-medium text-slate-400">kW</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100/50 rounded-xl text-amber-500">
                        <Zap size={20} />
                    </div>
                </div>

                {/* Card 4: Avg Pricing */}
                <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Charging Cost</p>
                        <h3 className="text-xl font-black text-emerald-600">
                            {avgPrice} <span className="text-xs font-medium text-slate-400">BDT/kWh</span>
                        </h3>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100/50 rounded-xl text-emerald-600">
                        <DollarSign size={20} />
                    </div>
                </div>

            </div>

            {/* Recharts Analytics Panel */}
            <AdminRecharts users={users} stations={stations} />
        </div>
    );
}