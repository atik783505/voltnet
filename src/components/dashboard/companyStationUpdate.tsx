"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField, Textarea } from "@heroui/react";
import toast from "react-hot-toast";
import { Edit2, Zap, Plus, X } from "lucide-react";
import { StationInput } from "@/types";

interface CompanyStationUpdateModalProps {
    station: StationInput;
    onEdit: (id: string, data: Partial<StationInput>) => Promise<{ success: boolean; message?: string }>;
}

export function CompanyStationUpdateModal({ station, onEdit }: CompanyStationUpdateModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    
    // Images এবং Amenities-এর জন্য Dynamic State management
    const [images, setImages] = useState<string[]>(station?.images?.length ? station.images : [""]);
    const [amenities, setAmenities] = useState<string[]>(station?.amenities?.length ? station.amenities : [""]);

    // Dynamic Images Handlers
    const handleImageChange = (index: number, value: string) => {
        const updated = [...images];
        updated[index] = value;
        setImages(updated);
    };

    const addImageField = () => setImages([...images, ""]);
    const removeImageField = (index: number) => {
        if (images.length > 1) {
            setImages(images.filter((_, i) => i !== index));
        }
    };

    // Dynamic Amenities Handlers
    const handleAmenityChange = (index: number, value: string) => {
        const updated = [...amenities];
        updated[index] = value;
        setAmenities(updated);
    };

    const addAmenityField = () => setAmenities([...amenities, ""]);
    const removeAmenityField = (index: number) => {
        if (amenities.length > 1) {
            setAmenities(amenities.filter((_, i) => i !== index));
        }
    };

    const handleUpdateModal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!onEdit || !station._id) return;
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);

        const stationData: Partial<StationInput> = {
            name: formData.get('name') as string,
            title: formData.get('title') as string,
            location: formData.get('location') as string,
            pricing: Number(formData.get('pricing')),
            description: formData.get('description') as string,
            shortDescription: formData.get('shortDescription') as string,
            powerOutput: Number(formData.get('powerOutput')),
            connectorType: formData.get('connectorType') as string,
            accessType: formData.get('accessType') as 'Public' | 'Private',
            images: images.filter(img => img.trim() !== ''),
            amenities: amenities.filter(am => am.trim() !== ''),
        };

        const loadingToast = toast.loading('Updating station...');

        try {
            const res = await onEdit(station._id, stationData);
            toast.dismiss(loadingToast);

            if (res?.success) {
                toast.success('Station updated successfully');
            } else {
                toast.error(res?.message || 'Error updating station');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Modal>
            <Modal.Trigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    aria-label="Edit Station"
                >
                    <Edit2 className="w-4 h-4" />
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop className="backdrop-blur-sm bg-black/50">
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl shadow-2xl p-6 custom-scrollbar">
                        <Modal.CloseTrigger className="text-slate-500 hover:text-slate-300 transition-colors" />

                        <Modal.Header className="border-b border-slate-900 pb-4">
                            <div className="flex items-center gap-3">
                                <Modal.Icon className="bg-blue-500/10 text-blue-400 p-2 rounded-xl border border-blue-500/20">
                                    <Zap className="size-5" />
                                </Modal.Icon>
                                <div>
                                    <Modal.Heading className="text-lg font-bold text-slate-100 tracking-tight">Update Station</Modal.Heading>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Modify the fields below to update station details, pricing, connectors, or amenities.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="py-4">
                            <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                                <form className="flex flex-col gap-4" onSubmit={handleUpdateModal}>

                                    {/* Title & Name */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={station?.title} name="title" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Station Title</Label>
                                            <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. Dhaka Charging Hub" />
                                        </TextField>

                                        <TextField defaultValue={station?.name} name="name" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Station Name / Code</Label>
                                            <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. DH-01" />
                                        </TextField>
                                    </div>

                                    {/* Location */}
                                    <TextField defaultValue={station?.location} name="location" isRequired className="w-full flex flex-col gap-1.5">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location Address</Label>
                                        <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="Full address" />
                                    </TextField>

                                    {/* Pricing & Power Output */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={station?.pricing !== undefined ? String(station.pricing) : undefined} name="pricing" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pricing (BDT / kWh)</Label>
                                            <Input type="number" step="any" className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. 15" />
                                        </TextField>

                                        <TextField defaultValue={station?.powerOutput !== undefined ? String(station.powerOutput) : undefined} name="powerOutput" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Power Output (kW)</Label>
                                            <Input type="number" step="any" className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. 50" />
                                        </TextField>
                                    </div>

                                    {/* Connector Type & Access Type */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField defaultValue={station?.connectorType} name="connectorType" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Connector Type</Label>
                                            <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. CCS2, Type 2" />
                                        </TextField>

                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Access Type</Label>
                                            <select 
                                                defaultValue={station?.accessType || 'Public'} 
                                                name="accessType"
                                                className="rounded-xl border border-slate-900 bg-slate-950 text-slate-200 focus:border-blue-500/50 transition-all h-11 px-3 text-sm outline-none"
                                            >
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Short Description */}
                                    <TextField defaultValue={station?.shortDescription} name="shortDescription" className="w-full flex flex-col gap-1.5">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Description</Label>
                                        <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="Brief summary of the station" />
                                    </TextField>

                                    {/* Full Description */}
                                    <div className="w-full flex flex-col gap-1.5">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</Label>
                                        <textarea 
                                            name="description" 
                                            defaultValue={station?.description} 
                                            rows={3} 
                                            className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all p-3 text-sm outline-none resize-none"
                                            placeholder="Detailed description..." 
                                        />
                                    </div>

                                    {/* Image URLs (Dynamic Input) */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Image URLs</Label>
                                        {images.map((img, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={img}
                                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11 flex-1"
                                                />
                                                {images.length > 1 && (
                                                    <Button type="button" isIconOnly size="sm" variant="ghost" onClick={() => removeImageField(index)} className="text-red-400 hover:bg-red-500/10 rounded-lg">
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button type="button" size="sm" variant="flat" onClick={addImageField} className="self-start text-xs text-blue-400 hover:bg-blue-500/10 mt-1 flex items-center gap-1">
                                            <Plus className="w-3.5 h-3.5" /> Add Image URL
                                        </Button>
                                    </div>

                                    {/* Amenities (Dynamic Input) */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Amenities</Label>
                                        {amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={amenity}
                                                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                                                    placeholder="e.g. WiFi, Restroom, Coffee Shop"
                                                    className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11 flex-1"
                                                />
                                                {amenities.length > 1 && (
                                                    <Button type="button" isIconOnly size="sm" variant="ghost" onClick={() => removeAmenityField(index)} className="text-red-400 hover:bg-red-500/10 rounded-lg">
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button type="button" size="sm" variant="flat" onClick={addAmenityField} className="self-start text-xs text-blue-400 hover:bg-blue-500/10 mt-1 flex items-center gap-1">
                                            <Plus className="w-3.5 h-3.5" /> Add Amenity
                                        </Button>
                                    </div>

                                    {/* Submit Button */}
                                    <Modal.Footer className="border-t border-slate-900 pt-4 mt-2">
                                        <Button
                                            type="submit"
                                            slot="close"
                                            className="w-full font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                                            isDisabled={isUpdating}
                                        >
                                            {isUpdating ? "Updating..." : "Update Station"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}