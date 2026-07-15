import React from 'react';
import { StationInput } from '@/types';

import Image from 'next/image';
import { Chip } from '@heroui/react';
import Link from 'next/link';

interface StationCardProps {
    station: StationInput;
}

export default function StationCard({ station }: StationCardProps) {
    const displayImage = station.images && station.images.length > 0 && station.images[0].trim() !== ''
        ? station.images[0]
        : 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop';

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">

            {/* Image Section (Hover Animation) */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden group">
                <Image
                    src={displayImage}
                    alt={station.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Status Chip (Top Right) */}
                <div className="absolute top-3 right-3 z-10">
                    {station.status === 'active' ? (
                        <Chip color="success" variant="soft" className="font-semibold text-xs shadow-sm">
                            Active
                        </Chip>
                    ) : (
                        <Chip color="danger" variant="soft" className="font-semibold text-xs shadow-sm">
                            Maintenance
                        </Chip>
                    )}
                </div>

                {/* Power Output Badge (Bottom Left) */}
                <div className="absolute bottom-3 left-3 z-10">
                    <Chip color="accent" className="font-bold text-xs shadow-sm text-white bg-indigo-600">
                        {station.powerOutput} kW
                    </Chip>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title & Price */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {station.name}
                    </h3>
                    <span className="text-base font-extrabold text-blue-600 shrink-0">
                        ${station.pricing}<span className="text-xs text-slate-400 font-medium">/kWh</span>
                    </span>
                </div>

                {/* Tagline / Subtitle */}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    {station.title}
                </p>

                {/* Short Description */}
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-medium flex-grow">
                    {station.shortDescription || station.description}
                </p>
                <div className="pt-3 border-t border-slate-50 mt-auto space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span className="line-clamp-1">{station.location}</span>
                    </div>

                    {/* View Details Button (with Hover & Tap Animation) */}
                    <Link href={`/stations/${station._id}`}>
                        <button
                            type="button"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs tracking-wide transition-all duration-200 active:scale-[0.98] hover:shadow-lg hover:shadow-slate-900/10 flex items-center justify-center gap-1 cursor-pointer"
                        >
                            <span>View Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transition-transform group-hover:translate-x-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}