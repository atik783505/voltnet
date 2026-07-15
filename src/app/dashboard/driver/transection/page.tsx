import { Calendar, CreditCard, ShieldAlert } from "lucide-react";
import { getTransactionHistory } from "@/lib/api/bookings";
import { getSessionData } from "../my-bookings/page";

export default async function TransactionHistoryPage() {
    const user = await getSessionData();

    if (!user || !user.email) {
        return (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 max-w-md mx-auto mt-10">
                <ShieldAlert size={36} className="text-amber-500 mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Authentication Required</h3>
                <p className="text-xs text-slate-400 mt-1">Please log in to view your payment transactions.</p>
            </div>
        );
    }

    const res = await getTransactionHistory(user.email);
    const paymentData = res?.success ? res.data : [];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-5">
            <div>
                <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <CreditCard size={20} className="text-emerald-600" /> Transaction History
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Review your detailed payment receipts and digital invoices.</p>
            </div>

            {paymentData.length === 0 ? (
                <div className="text-center py-12 bg-white border border-slate-200/60 rounded-xl">
                    <p className="text-xs font-medium text-slate-400">No transaction receipts available.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200/70 rounded-xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-5">Transaction ID</th>
                                    <th className="py-4 px-5">Station Name</th>
                                    <th className="py-4 px-5">Date</th>
                                    <th className="py-4 px-5">Payment Method</th>
                                    <th className="py-4 px-5">Status</th>
                                    <th className="py-4 px-5 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {paymentData.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-slate-50/60 transition">
                                        <td className="py-4 px-5 font-mono text-slate-600 tracking-tight text-[10px]">
                                            {item.transactionId || item._id.substring(0, 10).toUpperCase()}
                                        </td>
                                        <td className="py-4 px-5 font-bold text-slate-900">{item.stationDetails?.name}</td>
                                        <td className="py-4 px-5 text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} className="text-slate-400" /> 
                                                {new Date(item.createdAt || item.bookingDate).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 font-bold text-slate-600">{item.paymentMethod || "bKash"}</td>
                                        <td className="py-4 px-5">
                                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide border ${
                                                item.paymentStatus === 'Paid' || item.paymentStatus === 'Successful'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                                {item.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-right font-black text-emerald-600">
                                            +{item.amount || item.totalAmount} BDT
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