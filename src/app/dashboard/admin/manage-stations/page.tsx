import { getAllStations } from '@/lib/api/station';
import React from 'react';
import { MapPin, Zap, CircleDollarSign, Eye } from 'lucide-react';
import { StationInput } from '@/types';
import PaginationBasic from '@/components/pagination/Pagination';
import Link from 'next/link';
import { deleteStationAction, updateStationAction } from '@/lib/actions/station';
import { StationUpdateModal } from '@/components/dashboard/StationUpdate';
import { StationDeleteAlert } from '@/components/dashboard/DelelteAlert';

interface PaginationInfo {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

interface StationsResponse {
    stations: StationInput[];
    pagination: PaginationInfo;
}

interface ManageStationsProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

const ManageStations = async ({ searchParams }: ManageStationsProps) => {
    const resolvedParams = await searchParams;
    const currentPage = resolvedParams.page || '1';

    const response = (await getAllStations(`?page=${currentPage}`)) as StationsResponse; 

    const stations = response?.stations || [];
    const pagination = response?.pagination || { totalPages: 1, totalItems: 0 };

    // Server Action wrappers passed down to client components
    const handleDelete = async (id: string) => {
        'use server';
        return await deleteStationAction(id);
    };

    const handleUpdate = async (id: string, data: Partial<StationInput>) => {
        'use server';
        return await updateStationAction(id, data);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Manage Stations</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Total Stations: {pagination.totalItems || stations.length}
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Station Title & Name</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Pricing</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {stations.length > 0 ? (
                                stations.map((station: StationInput) => (
                                    <tr key={station._id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5">
                                                    <Zap size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{station.title || "No Title Available"}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{station.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm">
                                                <MapPin size={14} className="text-slate-400 shrink-0" />
                                                <span className="truncate max-w-[200px]">{station.location}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                                                <CircleDollarSign size={15} className="text-emerald-500" />
                                                <span>{station.pricing || "0"} BDT <span className="text-[10px] text-slate-400">/ kWh</span></span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                station.status === 'inactive' 
                                                    ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            }`}>
                                                ● {station.status || 'Active'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/stations/${station._id}`}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="View Station"
                                                >
                                                    <Eye size={16} />
                                                </Link>

                                                {/* Update Modal */}
                                                <StationUpdateModal 
                                                    station={station} 
                                                    onEdit={handleUpdate} 
                                                />

                                                {/* Delete Modal Trigger */}
                                                <StationDeleteAlert 
                                                    station={station} 
                                                    onDelete={handleDelete} 
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                                        No stations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8">
                <PaginationBasic 
                    pages={currentPage} 
                    totalPages={pagination.totalPages || 1} 
                    baseRoute="" 
                />
            </div>
        </div>
    );
};

export default ManageStations;