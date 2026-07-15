import { headers } from "next/headers";
import { auth } from "@/lib/auth"; 
import { Calendar, Clock, MapPin, Zap, ShieldAlert } from "lucide-react";
import { getChargingHistory } from "@/lib/api/bookings";

export const getSessionData = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    });
    return data?.user;
};

export default async function BookingHistoryPage() {
    const user = await getSessionData();

    if (!user || !user.email) {
        return (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 max-w-md mx-auto mt-10">
                <ShieldAlert size={36} className="text-amber-500 mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Authentication Required</h3>
                <p className="text-xs text-slate-400 mt-1">Please log in to view your charging bookings.</p>
            </div>
        );
    }

    const res = await getChargingHistory(user.email);
    const chargingData = res?.success ? res.data : [];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-5">
            <div>
                <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <Zap size={20} className="text-blue-600" /> Booking History
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Track your reserved charging slots and past stations activity.</p>
            </div>

            {chargingData.length === 0 ? (
                <div className="text-center py-12 bg-white border border-slate-200/60 rounded-xl">
                    <p className="text-xs font-medium text-slate-400">No recent charging bookings found.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-5">Station Name</th>
                                    <th className="py-4 px-5">Location</th>
                                    <th className="py-4 px-5">Date & Time</th>
                                    <th className="py-4 px-5">Connector</th>
                                    <th className="py-4 px-5">Duration</th>
                                    <th className="py-4 px-5 text-right">Energy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {chargingData.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 px-5 font-bold text-slate-900">{item.stationDetails?.name}</td>
                                        <td className="py-4 px-5 text-slate-500">
                                            <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> {item.stationDetails?.location}</span>
                                        </td>
                                        <td className="py-4 px-5 text-slate-500">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="flex items-center gap-1"><Calendar size={12} className="text-slate-400" /> {new Date(item.bookingDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1 text-[10px] text-slate-400"><Clock size={12} /> {new Date(item.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="bg-blue-50 text-blue-700 border border-blue-100/70 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                                {item.connectorType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-slate-600">{item.duration} Hour(s)</td>
                                        <td className="py-4 px-5 text-right font-bold text-blue-600">
                                            {item.energyDelivered ? `${item.energyDelivered} kWh` : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}