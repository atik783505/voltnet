"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client"; 
import { motion, AnimatePresence } from "framer-motion";

import { Calendar, Clock, Zap, ShieldAlert, Loader2, CheckCircle2, CreditCard, ArrowLeft } from "lucide-react";
import { createBookingAction } from "@/lib/actions/booking";

interface BookingFormProps {
    stationId: string;
    basePricing: number | string;
    connectorType: string;
}

export default function BookingForm({ stationId, basePricing, connectorType }: BookingFormProps) {
    const { data: session, isPending } = useSession();
    
    const [dateTime, setDateTime] = useState("");
    const [connector, setConnector] = useState(connectorType || "CCS 2");
    const [duration, setDuration] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // ডামি চেকআউট স্ক্রিন হ্যান্ডেল করার স্টেট
    const [showCheckout, setShowCheckout] = useState(false);

    const pricePerUnit = Number(basePricing) || 0;
    const totalAmount = pricePerUnit * duration;

    // ফর্ম সাবমিট হলে ডাটাবেজে না পাঠিয়ে আগে চেকআউট স্ক্রিন দেখাবে
    const handleProceedToCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            alert("Please log in first!");
            return;
        }

        if (!dateTime) {
            alert("Please select a date and time for your booking.");
            return;
        }

        // সরাসরি চেকআউট স্ক্রিনে নিয়ে যাওয়া হচ্ছে (ডাটাবেজে এখনো ডাটা যায়নি)
        setShowCheckout(true);
    };

    // আসল বুকিং ও পেমেন্ট কনফার্মেশন (এখানে ডাটাবেজে ডাটা যাবে)
    const handleConfirmPayment = async (method: string) => {
        setIsSubmitting(true);
        try {
            const result = await createBookingAction({
                userEmail: session?.user?.email || "",
                stationId,
                duration,
                bookingDate: dateTime,
                connectorType: connector,
                totalAmount,
            });

            if (result.success) {
                alert(`🎉 Payment via ${method} Successful! Your booking is secured in the database.`);
                
                // ফর্ম স্টেট রিসেট করা
                setDateTime("");
                setConnector(connectorType || "CCS 2");
                setDuration(1);
                setShowCheckout(false);
            } else {
                alert("❌ Booking Failed on Server! Please try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred during payment processing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-slate-400 gap-2">
                <Loader2 className="animate-spin text-blue-600" size={24} />
                <p className="text-xs font-medium">Loading session...</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden w-full">
            <AnimatePresence mode="wait">
                {!showCheckout ? (
                    /* --- বুকিং ফর্ম ভিউ --- */
                    <motion.form 
                        key="booking-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleProceedToCheckout} 
                        className="mt-4 space-y-4"
                    >
                        {/* ১. কানেক্টর সিলেকশন */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                                <Zap size={12} /> Select Connector
                            </label>
                            <select
                                value={connector}
                                onChange={(e) => setConnector(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                            >
                                <option value={connectorType} className="cursor-pointer">{connectorType || "CCS 2 (Primary)"}</option>
                                <option value="AC Type 2" className="cursor-pointer">AC Type 2 (Secondary)</option>
                            </select>
                        </div>

                        {/* ২. তারিখ ও সময় ইনপুট */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                                <Calendar size={12} /> Arrival Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                            />
                        </div>

                        {/* ৩. ডিউরেশন ইনপুট */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                                <Clock size={12} /> Estimated Charging Duration
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="24"
                                    value={duration}
                                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                />
                                <span className="bg-slate-100 text-slate-600 px-3 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-200/60">
                                    Hour(s)
                                </span>
                            </div>
                        </div>

                        {/* ৪. প্রাইসিং ব্রেকডাউন */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2 mt-2">
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Base Rate</span>
                                <span>{pricePerUnit} BDT / hr</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Duration</span>
                                <span>× {duration} Hour(s)</span>
                            </div>
                            <div className="h-px bg-slate-200/60 my-1" />
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-700">Total Est. Amount</span>
                                <span className="font-black text-blue-600 text-base">{totalAmount} BDT</span>
                            </div>
                        </div>

                        {/* ৫. পরবর্তী ধাপে যাওয়ার বাটন */}
                        <button
                            type="submit"
                            disabled={!session?.user?.email}
                            className={`w-full text-white p-3 rounded-xl font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                                !session?.user?.email
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
                            }`}
                        >
                            {!session?.user?.email ? (
                                <>
                                    <ShieldAlert size={16} />
                                    Login Required
                                </>
                            ) : (
                                "Proceed to Checkout"
                            )}
                        </button>
                    </motion.form>
                ) : (
                    /* --- ডামী চেকআউট ভিউ (Framer Motion Animated) --- */
                    <motion.div 
                        key="checkout-page"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="mt-4 border border-blue-100 bg-blue-50/20 rounded-2xl p-4 space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-xs">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Review Your Slot</h3>
                                <p className="text-[11px] font-medium text-slate-400">Please pay to confirm database entry</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-2.5 shadow-xs">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Order Summary
                            </div>
                            <div className="space-y-1.5 text-xs font-semibold text-slate-600">
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-medium">Connector:</span>
                                    <span className="text-slate-800">{connector}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-medium">Time Slot:</span>
                                    <span className="text-slate-800">{dateTime ? new Date(dateTime).toLocaleString() : ""}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-medium">Duration:</span>
                                    <span className="text-slate-800">{duration} Hour(s)</span>
                                </div>
                                <div className="h-px bg-slate-100 my-1" />
                                <div className="flex justify-between items-center text-sm pt-0.5">
                                    <span className="font-bold text-slate-700">Payable Amount</span>
                                    <span className="font-extrabold text-blue-600 text-base">{totalAmount} BDT</span>
                                </div>
                            </div>
                        </div>

                        {/* পেমেন্ট গেটওয়ে অপশন - এখানে ক্লিক করলে db তে ডাটা যাবে */}
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => handleConfirmPayment("bKash")}
                                disabled={isSubmitting}
                                className="bg-pink-500 hover:bg-pink-600 disabled:bg-slate-400 text-white font-bold text-xs p-2.5 rounded-xl cursor-pointer transition active:scale-95 shadow-xs text-center flex items-center justify-center"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : "Pay with bKash"}
                            </button>
                            <button 
                                onClick={() => handleConfirmPayment("Card")}
                                disabled={isSubmitting}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-xs p-2.5 rounded-xl cursor-pointer transition active:scale-95 shadow-xs text-center flex items-center justify-center"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : "Pay with Card"}
                            </button>
                        </div>

                        {/* ব্যাক বাটন */}
                        <button
                            onClick={() => setShowCheckout(false)}
                            disabled={isSubmitting}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs p-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            <ArrowLeft size={14} /> Back & Edit Form
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}