import { getStation } from '@/lib/api/station';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Zap,
    MapPin,
    Star,
    Wifi,
    ShieldCheck,
    Coffee,
    Layers,
    TrendingUp,
    TrendingDown,
    Calendar,
    CheckCircle2
} from 'lucide-react';
import BookingForm from '@/components/dashboard/BookingsForm';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const StationDetails = async ({ params }: PageProps) => {
    const { id } = await params;
    const stationData = await getStation(id);

    // 🛑 BETTER AUTH ROLE CHECK (আপাতত টেস্ট করার জন্য true রাখা হলো)
    const isDriver = true;

    if (!stationData || stationData.message) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
                <p className="text-sm font-medium text-red-500 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
                    Station not found or failed to load.
                </p>
            </div>
        );
    }

    const isInactive = stationData.status === 'inactive';

    // ইমেজের অ্যারে ডাটাবেজ থেকে নেওয়া হলো
    const imageList: string[] = stationData.images || [];
    const hasMultipleImages = imageList.length > 1;

    return (
        <div className="bg-[#f8fafc] min-h-screen antialiased text-slate-900 pb-12">

            {/* ব্রেডক্রাম্ব নেভিগেশন */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
                <nav className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Link href="/explore" className="hover:text-slate-600 transition">Explore</Link>
                    <span>/</span>
                    <Link href="/explore" className="hover:text-slate-600 transition">Stations Gallery</Link>
                    <span>/</span>
                    <span className="text-slate-600 font-semibold">{stationData.name}</span>
                </nav>
            </div>

            {/* 📸 ১. ইমেজ গ্যালারি লেআউট (শুধুমাত্র অ্যারেতে থাকা ইমেজগুলো দেখাবে) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* মেইন ফার্স্ট ইমেজ (সবসময় দেখাবে যদি অন্তত ১টি ইমেজ থাকে) */}
                    <div className={`${hasMultipleImages ? 'md:col-span-8' : 'md:col-span-12'} relative h-[260px] sm:h-[350px] md:h-[480px] overflow-hidden rounded-2xl shadow-xs group bg-slate-100`}>
                        {imageList[0] ? (
                            <Image
                                src={imageList[0]}
                                alt={stationData.name}
                                fill
                                priority
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No Image Available</div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
                            <Zap size={14} className="fill-white" /> VoltNet Hub
                        </div>
                    </div>

                    {/* ডান পাশের সাব-ইমেজেস কলাম (শুধুমাত্র ২য় বা তার পরের ইমেজগুলো থাকলে রেন্ডার হবে) */}
                    {hasMultipleImages && (
                        <div className="md:col-span-4 flex flex-col gap-3 h-[480px]">
                            {imageList.slice(1, 4).map((imgUrl: string, idx: number) => (
                                <div key={idx} className="relative flex-1 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 group">
                                    <Image
                                        src={imgUrl}
                                        alt={`Gallery grid ${idx + 2}`}
                                        fill
                                        sizes="25vw"
                                        className="object-cover hover:brightness-95 transition duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 🏢 ২. মেইন কন্টেন্ট সেকশন (২ কলাম স্প্লিট) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* বাম কলাম: ডিটেইলস প্যানেল */}
                    <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">

                        {/* শিরোনাম, স্ট্যাটাস ও রিভিউ */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stationData.name}</h1>
                                <span className="bg-[#e2fbe8] text-[#15803d] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide flex items-center gap-1">
                                    <CheckCircle2 size={12} /> Verified
                                </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {stationData.location}</span>
                                <span className="flex items-center gap-1 text-[#eab308]"><Star size={14} className="fill-[#eab308]" /> <strong className="text-slate-700">4.9</strong> (124 reviewed)</span>
                            </div>
                        </div>

                        {/* About this station */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About this station</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-normal">
                                {stationData.description}
                            </p>
                        </div>

                        {/* Available Connectors (ছবির মতো প্রোগ্রেস বার সহ কার্ড) */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Available Connectors</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* ডায়নামিক কানেক্টর কার্ড */}
                                <div className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs flex flex-col justify-between h-[135px]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-sm">{stationData.connectorType || "CCS 2"}</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">Ultra-fast DC Charging</p>
                                        </div>
                                        <span className="text-blue-600 bg-blue-50 p-2 rounded-xl"><Zap size={16} /></span>
                                    </div>
                                    <div className="mt-4 space-y-1">
                                        <div className="flex justify-between text-[11px] font-semibold">
                                            <span className="text-emerald-600">Available</span>
                                            <span className="text-slate-400">4/4 units</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-1.5 w-full rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* ব্যাকআপ বা ডেমো সেকেণ্ডারি কানেক্টর */}
                                <div className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs flex flex-col justify-between h-[135px]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-sm">AC Type 2</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">Standard Destination Charger</p>
                                        </div>
                                        <span className="text-purple-600 bg-purple-50 p-2 rounded-xl"><Layers size={16} /></span>
                                    </div>
                                    <div className="mt-4 space-y-1">
                                        <div className="flex justify-between text-[11px] font-semibold">
                                            <span className="text-emerald-600">Available</span>
                                            <span className="text-slate-400">{stationData.powerOutput || 330} kW</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-purple-500 h-1.5 w-[70%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Amenities (গোল বৃত্তাকার মিনিমাল আইকন বাটন স্টাইল) */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Amenities</h3>
                            <div className="flex flex-wrap gap-5">
                                {stationData.amenities && stationData.amenities.map((amenity: string, idx: number) => {
                                    // অ্যামেনিটিজ অনুযায়ী পারফেক্ট রিঅ্যাক্ট আইকন ম্যাচিং লজিক
                                    let IconComponent = Coffee;
                                    if (amenity.toLowerCase().includes('wifi')) IconComponent = Wifi;
                                    if (amenity.toLowerCase().includes('restroom') || amenity.toLowerCase().includes('hall')) IconComponent = Layers;
                                    if (amenity.toLowerCase().includes('security') || amenity.toLowerCase().includes('gate')) IconComponent = ShieldCheck;

                                    return (
                                        <div key={idx} className="flex flex-col items-center gap-1.5">
                                            <div className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600 shadow-xs cursor-pointer border border-slate-200/40">
                                                <IconComponent size={16} />
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-500">{amenity}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pricing & Rates */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pricing & Rates</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-slate-100 bg-slate-50/70 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp size={18} /></div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-slate-400 uppercase">Peak Hours</p>
                                        <p className="text-lg font-black text-slate-900">{stationData.pricing} BDT <span className="text-xs font-normal text-slate-400">/ kWh</span></p>
                                    </div>
                                </div>
                                <div className="border border-slate-100 bg-slate-50/70 p-4 rounded-xl flex items-center gap-3">
                                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><TrendingDown size={18} /></div>
                                    <div>
                                        <p className="text-[11px] font-semibold text-slate-400 uppercase">Off-Peak Hours</p>
                                        <p className="text-lg font-black text-slate-900">{Math.round(Number(stationData.pricing) * 0.85)} BDT <span className="text-xs font-normal text-slate-400">/ kWh</span></p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 italic mt-1">💡 Prices vary location-wise. 10 BDT/min fine applies after 15 mins of full charge.</p>
                        </div>

                    </div>

                    {/* ডান কলাম: বুকিং সেশন ও ম্যাপ প্যানেল */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">

                        {isDriver ? (
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
                                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Book a Session</h3>

                                <BookingForm
                                    stationId={stationData._id}
                                    basePricing={stationData.pricing}
                                    connectorType={stationData.connectorType}
                                />
                                <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">You won't be charged until you start your actual session.</p>
                            </div>
                        ) : (
                            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-6 text-center shadow-xs">
                                <p className="text-xs font-bold text-slate-700">Driver access required to lock slots.</p>
                            </div>
                        )}

                        {/* লোকেশন ও মিনি ম্যাপ প্লেসহোল্ডার */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Location Map</h4>
                                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"><MapPin size={10} /> Open Maps</span>
                            </div>

                            <div className="relative h-36 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center">
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold shadow-xs text-slate-600 flex items-center gap-1">
                                        <MapPin size={12} className="text-blue-600" /> {stationData.name}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] font-medium text-slate-500 leading-normal">
                                {stationData.location}
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default StationDetails;