import React from 'react';

export default function StationCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Image Section Skeleton */}
            <div className="relative h-48 w-full bg-slate-200 animate-pulse" />

            {/* Content Section Skeleton */}
            <div className="p-5 flex flex-col flex-grow space-y-4">
                {/* Title & Price Skeleton */}
                <div className="flex justify-between items-start gap-2">
                    <div className="h-6 bg-slate-200 rounded-lg w-2/3 animate-pulse" />
                    <div className="h-6 bg-slate-200 rounded-lg w-1/4 animate-pulse" />
                </div>

                {/* Tagline / Subtitle Skeleton */}
                <div className="h-4 bg-slate-100 rounded-md w-1/3 animate-pulse" />

                {/* Short Description Skeleton */}
                <div className="space-y-2 flex-grow">
                    <div className="h-3.5 bg-slate-100 rounded w-full animate-pulse" />
                    <div className="h-3.5 bg-slate-100 rounded w-5/6 animate-pulse" />
                </div>

                {/* Location & Button Skeleton */}
                <div className="pt-3 border-t border-slate-50 mt-auto space-y-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
                    </div>
                    <div className="w-full h-9 bg-slate-200 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
