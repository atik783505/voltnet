import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Zap, CreditCard, Calendar, ShieldAlert, TrendingUp } from "lucide-react";
import { getChargingHistory, getTransactionHistory } from "@/lib/api/bookings";
import DriverOverviewCharts from "@/components/dashboard/DriverRecharts";


export const getSessionData = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    });
    return data?.user;
};

export default async function DriverOverviewPage() {
    const user = await getSessionData();

    if (!user || !user.email) {
        return (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 max-w-md mx-auto mt-10">
                <ShieldAlert size={36} className="text-amber-500 mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Authentication Required</h3>
                <p className="text-xs text-slate-400 mt-1">Please log in to view your dashboard.</p>
            </div>
        );
    }

    const [bookingsRes, transactionsRes] = await Promise.all([
        getChargingHistory(user.email),
        getTransactionHistory(user.email)
    ]);

    const bookings = bookingsRes?.success ? bookingsRes.data : [];
    const transactions = transactionsRes?.success ? transactionsRes.data : [];

    const totalBookings = bookings.length;
    const totalSpend = transactions.reduce((acc: number, item: any) => acc + (item.amount || item.totalAmount || 0), 0);
    const totalEnergy = bookings.reduce((acc: number, item: any) => acc + (item.energyDelivered || 0), 0);

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-5">
            <div>
                <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" /> Driver Dashboard
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Welcome back! Here is a summary of your charging activities and expenses.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 
                <div className="bg-white border border-slate-200/70 rounded-xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
                        <h3 className="text-xl font-black text-slate-800">{totalBookings} <span className="text-xs font-medium text-slate-400">Times</span></h3>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100/50 rounded-lg text-blue-600">
                        <Calendar size={18} />
                    </div>
                </div>

                <div className="bg-white border border-slate-200/70 rounded-xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spend</p>
                        <h3 className="text-xl font-black text-emerald-600">{totalSpend} <span className="text-xs font-medium text-slate-400">BDT</span></h3>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100/50 rounded-lg text-emerald-600">
                        <CreditCard size={18} />
                    </div>
                </div>

                <div className="bg-white border border-slate-200/70 rounded-xl p-5 flex items-center justify-between shadow-xs">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Energy Consumed</p>
                        <h3 className="text-xl font-black text-amber-600">{totalEnergy ? totalEnergy.toFixed(1) : "0.0"} <span className="text-xs font-medium text-slate-400">kWh</span></h3>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100/50 rounded-lg text-amber-600">
                        <Zap size={18} />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-xl p-5 shadow-xs">
                <div className="mb-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Analytics Overview</h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">Visual representation of your expenses vs energy consumption.</p>
                </div>
                <DriverOverviewCharts bookings={bookings} transactions={transactions} />
            </div>
        </div>
    );
}