"use client";

import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    PieChart,
    Pie,
    Cell
} from "recharts";

interface AdminRechartsProps {
    users: any[];
    stations: any[];
}

export default function AdminRecharts({ users, stations }: AdminRechartsProps) {
    // 1. Station Pricing and Power Capacity Data
    const stationData = stations.map(s => ({
        name: s.title || s.name || "Station",
        Pricing: s.pricing || 0,
        Power: s.powerOutput || 0,
    })).slice(0, 8); // Take top 8 for readability

    // 2. User Roles Data
    const roleCounts = users.reduce((acc: any, u) => {
        const role = u.role === 'admin' ? 'Admin' : 'Driver/User';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const roleData = Object.keys(roleCounts).map(role => ({
        name: role,
        value: roleCounts[role]
    }));

    // 3. Station Status Data
    const statusCounts = stations.reduce((acc: any, s) => {
        const status = s.status === 'active' ? 'Active' : 'Inactive';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));

    const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Station Power vs Pricing */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                <div className="mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Stations Analytics</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Comparing Pricing (BDT/kWh) and Power Output (kW) for key stations.</p>
                </div>
                <div className="w-full h-72 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                }}
                            />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconSize={8}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
                            />
                            <Bar yAxisId="left" dataKey="Power" name="Power Output (kW)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="Pricing" name="Pricing (BDT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: User Roles & Station Status */}
            <div className="flex flex-col gap-6">
                {/* Pie Chart: User Roles */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex-1">
                    <div className="mb-2">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">User Distribution</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Ratio of admins to drivers.</p>
                    </div>
                    <div className="w-full h-44 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={roleData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-lg font-black text-slate-800">{users.length}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-semibold text-slate-600 mt-2">
                        {roleData.map((d, index) => (
                            <div key={d.name} className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span>{d.name}: {d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart: Station Status */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex-1">
                    <div className="mb-2">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Station Status</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Active vs Inactive stations.</p>
                    </div>
                    <div className="w-full h-44 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Active' ? '#10b981' : '#ef4444'} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-lg font-black text-slate-800">{stations.length}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Stations</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-semibold text-slate-600 mt-2">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>Active: {statusCounts['Active'] || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span>Inactive: {statusCounts['Inactive'] || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
