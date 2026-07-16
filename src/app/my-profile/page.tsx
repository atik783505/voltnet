"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Card, Avatar } from "@heroui/react";
import toast from "react-hot-toast";
import { User, Mail, Shield, Camera, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MyProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const currentUser = session?.user;

    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Populate state once user loads
    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || "");
            setImagePreview(currentUser.image || "");
        }
    }, [currentUser]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        setIsUpdating(true);
        let finalImageUrl = currentUser.image || "";

        // 1. Upload to ImgBB if a new image was selected
        if (imageFile) {
            try {
                const imgbbFormData = new FormData();
                imgbbFormData.append("image", imageFile);

                const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                if (!apiKey) {
                    throw new Error("ImgBB API key is missing.");
                }

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: imgbbFormData,
                });

                const imgData = await response.json();
                if (imgData.success) {
                    finalImageUrl = imgData.data.url;
                } else {
                    throw new Error(imgData.error?.message || "Image upload failed");
                }
            } catch (err: any) {
                console.error("ImgBB Error:", err);
                toast.error(`Image upload failed: ${err.message}`);
                setIsUpdating(false);
                return;
            }
        }

        // 2. Update user profile in Better Auth
        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
                image: finalImageUrl || undefined,
            });

            if (error) {
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile updated successfully!");
                // Force a reload or session update to sync with Navbar
                window.location.reload();
            }
        } catch (err: any) {
            console.error("Profile Update Error:", err);
            toast.error("Profile update failed");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <div className="max-w-xl mx-auto px-4 py-12">
                <Card className="p-6 md:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-24 h-24 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-5 bg-slate-200 rounded w-1/3 animate-pulse" />
                        <div className="h-4 bg-slate-100 rounded w-1/4 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-10 bg-slate-50 rounded-xl w-full animate-pulse" />
                        <div className="h-10 bg-slate-50 rounded-xl w-full animate-pulse" />
                        <div className="h-10 bg-slate-200 rounded-xl w-full animate-pulse" />
                    </div>
                </Card>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-full">
                    <Shield size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Authentication Required</h3>
                <p className="text-sm text-slate-500">Please sign in to access and update your profile details.</p>
                <Link href="/auth/signin" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm text-sm">
                    Go to Sign In
                </Link>
            </div>
        );
    }

    const userRole = (currentUser as any)?.role || "driver";
    const dashboardHref = `/dashboard/${userRole}`;

    return (
        <div className="max-w-xl mx-auto px-4 py-12 relative">
            {/* Back button */}
            <Link href={dashboardHref} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 group transition-colors">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> Back to Dashboard
            </Link>

            <Card className="p-6 md:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/5 relative overflow-hidden">
                {/* Background glow accents */}
                <div className="absolute top-[-30%] right-[-20%] w-64 h-64 rounded-full bg-blue-400/5 blur-[50px] pointer-events-none" />
                <div className="absolute bottom-[-30%] left-[-20%] w-64 h-64 rounded-full bg-orange-400/5 blur-[50px] pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Profile Settings</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage and update your VoltNet account details.</p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Avatar Image Upload Section */}
                        <div className="flex flex-col items-center space-y-3">
                            <div className="relative group">
                                <Avatar className="w-24 h-24 border-2 border-blue-500/20 bg-slate-950 text-white font-black text-xl shadow-md">
                                    {imagePreview ? (
                                        <Avatar.Image
                                            src={imagePreview}
                                            alt={currentUser.name || "User Photo"}
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : null}
                                    <Avatar.Fallback className="bg-slate-900 text-blue-400 font-bold">
                                        {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "VN"}
                                    </Avatar.Fallback>
                                </Avatar>
                                <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg cursor-pointer transition-colors border border-white">
                                    <Camera size={14} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile Picture</span>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 block">Full Name</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                                        <User size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Address (Read-only) */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 block">Email Address (Read-Only)</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                                        <Mail size={16} />
                                    </span>
                                    <input
                                        type="email"
                                        value={currentUser.email}
                                        disabled
                                        className="w-full bg-slate-100/60 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed opacity-80"
                                    />
                                </div>
                            </div>

                            {/* System Role (Read-only) */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 block">System Role</label>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <Shield size={16} className="text-blue-500" />
                                    <span className="text-sm font-semibold text-slate-700 capitalize">{userRole} Fleet Member</span>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-600/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} /> Save Changes
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}