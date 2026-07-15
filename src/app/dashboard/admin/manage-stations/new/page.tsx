'use client';

import { createStationAction } from '@/lib/actions/station';
import { StationInput } from '@/types';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddStation() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    const [images, setImages] = useState<string[]>(['']);
    const [amenities, setAmenities] = useState<string[]>(['']);

    const handleAddImageField = () => setImages([...images, '']);
    const handleAddAmenityField = () => setAmenities([...amenities, '']);

    const handleRemoveImageField = (index: number) => {
        if (images.length === 1) return setImages(['']);
        setImages(images.filter((_, i) => i !== index));
    };

    const handleRemoveAmenityField = (index: number) => {
        if (amenities.length === 1) return setAmenities(['']);
        setAmenities(amenities.filter((_, i) => i !== index));
    };

    const handleImageChange = (index: number, value: string) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    const handleAmenityChange = (index: number, value: string) => {
        const updated = [...amenities];
        updated[index] = value;
        setAmenities(updated);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData(e.currentTarget);
        const stationData: StationInput = {
            name: formData.get('name') as string,
            title: formData.get('title') as string,
            location: formData.get('location') as string,
            pricing: Number(formData.get('pricing')),
            description: formData.get('description') as string,
            shortDescription: formData.get('shortDescription') as string, // এখানে formData থেকে রিড করা হচ্ছে
            powerOutput: Number(formData.get('powerOutput')),
            connectorType: formData.get('connectorType') as string,
            accessType: formData.get('accessType') as 'Public' | 'Private',
            status: formData.get('status') as 'active' | 'inactive',
            images: images.filter(img => img.trim() !== ''), 
            amenities: amenities.filter(am => am.trim() !== '')
        };

        const response = await createStationAction(stationData);

        setLoading(false);
        if (response.success) {
            setMessage({ type: 'success', text: 'Station created successfully with all specifications!' });
            (e.target as HTMLFormElement).reset();
            setImages(['']);
            setAmenities(['']);
        } else {
            setMessage({ type: 'error', text: response.message || 'Something went wrong.' });
        }
    };

    const inputStyles = "w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400 font-medium";
    const labelStyles = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider";
    
    // Minimalist Animation Variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    } as const;

    const fieldVariants = {
        hidden: { opacity: 0, height: 0, scale: 0.95 },
        visible: { opacity: 1, height: 'auto', scale: 1, transition: { type: 'spring', duration: 0.3 } },
        exit: { opacity: 0, height: 0, scale: 0.95, transition: { duration: 0.2 } }
    } as const;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto my-6 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
            {/* Header section with gradient line */}
            <div className="relative p-6 md:p-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Charging Station</h2>
                <p className="text-sm text-slate-500 mt-1">Provide detailed information and technical specifications for the new station.</p>
            </div>

            <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {message.text && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`p-4 rounded-xl text-sm mb-8 font-medium border flex items-center gap-3 ${
                                message.type === 'success' 
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60' 
                                    : 'bg-rose-50 text-rose-800 border-rose-200/60'
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* --- Section 1: Basic Information --- */}
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-slate-50/40 p-5 rounded-xl border border-slate-100/80 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Basic Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelStyles}>Station Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Banani Charging Hub"
                                    className={inputStyles}
                                />
                            </div>
                            <div>
                                <label className={labelStyles}>Display Title / Tagline</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="e.g. Ultra Fast EV Charging Station"
                                    className={inputStyles}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelStyles}>Location Address</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="e.g. Road 11, Banani, Dhaka"
                                    className={inputStyles}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Section 2: Specifications & Pricing --- */}
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-slate-50/40 p-5 rounded-xl border border-slate-100/80 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">2</span>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Specifications & Pricing</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelStyles}>Price (per kWh)</label>
                                <input
                                    type="number"
                                    name="pricing"
                                    required
                                    placeholder="e.g. 15"
                                    className={inputStyles}
                                />
                            </div>
                            <div>
                                <label className={labelStyles}>Charging Power (kW)</label>
                                <input
                                    type="number"
                                    name="powerOutput"
                                    required
                                    placeholder="e.g. 150"
                                    className={inputStyles}
                                />
                            </div>
                            <div>
                                <label className={labelStyles}>Connector / Plug Type</label>
                                <input
                                    type="text"
                                    name="connectorType"
                                    required
                                    placeholder="e.g. CCS2 / CHAdeMO / Type 2"
                                    className={inputStyles}
                                />
                            </div>
                            <div>
                                <label className={labelStyles}>Access Level</label>
                                <select name="accessType" className={`${inputStyles} cursor-pointer`}>
                                    <option value="Public">Publicly Accessible</option>
                                    <option value="Private">Private / Restricted</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelStyles}>Operational Status</label>
                                <select name="status" className={`${inputStyles} cursor-pointer`}>
                                    <option value="active">Active / Operational</option>
                                    <option value="inactive">Inactive / Under Maintenance</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- Section 3: Descriptions (Short & Full) --- */}
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-slate-50/40 p-5 rounded-xl border border-slate-100/80 space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">3</span>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Descriptions & Overview</h3>
                        </div>
                        
                        {/* Short Description Fields */}
                        <div>
                            <label className={labelStyles}>Short Description</label>
                            <input
                                type="text"
                                name="shortDescription"
                                required
                                maxLength={150}
                                placeholder="A brief 1-sentence summary for previews and cards (Max 150 characters)..."
                                className={inputStyles}
                            />
                        </div>

                        {/* Full Description Fields */}
                        <div>
                            <label className={labelStyles}>Full Station Overview</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                placeholder="Detailed overview describing the station's environment, safety instructions, or amenities..."
                                className={`${inputStyles} resize-none`}
                            />
                        </div>
                    </motion.div>

                    {/* --- Section 4: Media & Images --- */}
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-slate-50/40 p-5 rounded-xl border border-slate-100/80 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">4</span>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Media & Images</h3>
                        </div>
                        <div className="space-y-3">
                            <label className={labelStyles}>Image URLs</label>
                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {images.map((image, index) => (
                                        <motion.div 
                                            key={index}
                                            variants={fieldVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="flex gap-2 items-center origin-top overflow-hidden"
                                        >
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                                placeholder={`https://example.com/image-${index + 1}.jpg`}
                                                className={inputStyles}
                                            />
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleRemoveImageField(index)}
                                                className="p-2.5 text-slate-400 hover:text-rose-500 bg-white border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                                                title="Remove field"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddImageField}
                                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3 py-2 rounded-lg transition-colors mt-1 cursor-pointer select-none"
                            >
                                + Add Another Image URL
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* --- Section 5: Nearby Amenities --- */}
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="bg-slate-50/40 p-5 rounded-xl border border-slate-100/80 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">5</span>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Nearby Amenities</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {amenities.map((amenity, index) => (
                                        <motion.div 
                                            key={index}
                                            variants={fieldVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="flex gap-2 items-center origin-top overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                value={amenity}
                                                onChange={(e) => handleAmenityChange(index, e.target.value)}
                                                placeholder="e.g. Coffee Shop, Restroom, WiFi, Parking"
                                                className={inputStyles}
                                            />
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleRemoveAmenityField(index)}
                                                className="p-2.5 text-slate-400 hover:text-rose-500 bg-white border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                                                title="Remove field"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddAmenityField}
                                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3 py-2 rounded-lg transition-colors mt-1 cursor-pointer select-none"
                            >
                                + Add Nearby Amenity
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Submit Button Section */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all shadow-sm shadow-blue-500/10 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Publishing Station...
                                </>
                            ) : (
                                'Publish Charging Station'
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}