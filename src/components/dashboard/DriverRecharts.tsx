"use client";

import React from "react";
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid,
    Legend
} from "recharts";

interface ChartsProps {
    bookings: any[];
    transactions: any[];
}

export default function DriverOverviewCharts({ bookings, transactions }: ChartsProps) {
    const chartData = transactions.slice(-6).map((tx, index) => {
        const correspondingBooking = bookings[index] || {};
        return {
            name: new Date(tx.createdAt || tx.bookingDate).toLocaleDateString([], { month: 'short', day: 'numeric' }),
            Cost: tx.amount || tx.totalAmount || 0,
            Energy: correspondingBooking.energyDelivered || 0,
        };
    });

    if (chartData.length === 0) {
        return (
            <div className="h-48 flex items-center justify-center text-xs font-medium text-slate-400">
                Not enough activity data to render charts.
            </div>
        );
    }

    return (
        <div className="w-full h-64 text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={8} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px',
                            fontSize: '11px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                        }} 
                    />
     
                    <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconSize={8}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} 
                    />

                    {/* Cost (BDT) Area */}
                    <Area 
                        type="monotone" 
                        dataKey="Cost" 
                        name="Cost (BDT)" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorCost)" 
                    />
                    
                    {/* Energy (kWh) Area */}
                    <Area 
                        type="monotone" 
                        dataKey="Energy" 
                        name="Energy (kWh)" 
                        stroke="#f59e0b" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorEnergy)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}