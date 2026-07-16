import React from 'react';
import StationCardSkeleton from '@/components/ui/StationCardSkeleton';

export default function StationsLoading() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header skeleton */}
            <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="h-9 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse" />
            </div>

            {/* Filter Section Skeleton */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="h-10 bg-slate-100 rounded-xl w-full md:w-1/3 animate-pulse" />
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="h-10 bg-slate-100 rounded-xl w-32 animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded-xl w-32 animate-pulse" />
                    <div className="h-10 bg-slate-100 rounded-xl w-32 animate-pulse" />
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <StationCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
