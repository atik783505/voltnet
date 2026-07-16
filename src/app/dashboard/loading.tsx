import React from 'react';

export default function DashboardLoading() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-7 bg-slate-200 rounded-lg w-1/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse" />
            </div>

            {/* Overview Stats Cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-xs">
                        <div className="space-y-2 flex-1 mr-4">
                            <div className="h-3.5 bg-slate-100 rounded w-1/2 animate-pulse" />
                            <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Large Charts/Analytics Section Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs h-80 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse" />
                    </div>
                    <div className="w-full h-52 bg-slate-50 rounded-xl animate-pulse" />
                </div>
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs h-36 flex flex-col justify-between flex-grow">
                        <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                        <div className="w-full h-16 bg-slate-50 rounded-lg animate-pulse" />
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs h-36 flex flex-col justify-between flex-grow">
                        <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                        <div className="w-full h-16 bg-slate-50 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
