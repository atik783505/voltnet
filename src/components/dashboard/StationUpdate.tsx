"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { Edit2, Zap } from "lucide-react";
import { StationInput } from "@/types";

interface StationUpdateModalProps {
    station: StationInput;
    onEdit: (id: string, data: Partial<StationInput>) => Promise<{ success: boolean; message?: string }>;
}

// ২. কম্পোনেন্টে টাইপ যুক্ত করা হলো
export function StationUpdateModal({ station, onEdit }: StationUpdateModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateModal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!onEdit || !station._id) return;
        setIsUpdating(true);

        const formData = new FormData(e.currentTarget);
        const updatedStationData = Object.fromEntries(formData.entries());

        const loadingToast = toast.loading('Updating station...');

        try {
            const res = await onEdit(station._id, updatedStationData);
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
                    <Modal.Dialog className="sm:max-w-xl bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl shadow-2xl p-6">
                        <Modal.CloseTrigger className="text-slate-500 hover:text-slate-300 transition-colors" />

                        <Modal.Header className="border-b border-slate-900 pb-4">
                            <div className="flex items-center gap-3">
                                <Modal.Icon className="bg-blue-500/10 text-blue-400 p-2 rounded-xl border border-blue-500/20">
                                    <Zap className="size-5" />
                                </Modal.Icon>
                                <div>
                                    <Modal.Heading className="text-lg font-bold text-slate-100 tracking-tight">Update Station</Modal.Heading>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Modify the fields below to update station details, pricing, or locations.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="py-4">
                            <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                                <form className="flex flex-col gap-4" onSubmit={handleUpdateModal}>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Station Title */}
                                        <TextField defaultValue={station?.title} name="title" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Station Title</Label>
                                            <Input className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. Dhaka Charging Hub" />
                                        </TextField>

                                        {/* Station Name */}
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

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Pricing */}
                                        <TextField defaultValue={station?.pricing !== undefined ? String(station.pricing) : undefined} name="pricing" isRequired className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pricing (BDT / kWh)</Label>
                                            <Input type="number" className="rounded-xl border border-slate-900 bg-slate-900/50 text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 transition-all h-11" placeholder="e.g. 15" />
                                        </TextField>

                                        {/* Status */}
                                        <div className="w-full flex flex-col gap-1.5">
                                            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</Label>
                                            <select 
                                                defaultValue={station?.status || 'active'} 
                                                name="status"
                                                className="rounded-xl border border-slate-900 bg-slate-950 text-slate-200 focus:border-blue-500/50 transition-all h-11 px-3 text-sm outline-none"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Modal.Footer className="border-t border-slate-900 pt-4 mt-2">
                                        <Button
                                            type="submit"
                                            slot="close"
                                            className='w-full font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2'
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