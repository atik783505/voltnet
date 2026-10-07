'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Button, 
    Form, 
    Input, 
    Radio, 
    RadioGroup,
    Label,
    TextField,
    FieldError 
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiZap, FiCamera } from "react-icons/fi";

export default function Signup() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [role, setRole] = useState<string>("driver");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const imageFile = formData.get("image") as File;
        
        const companyName = (formData.get("companyName") as string) || "";
        const registrationNo = (formData.get("registrationNo") as string) || "";

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        let imageUrl = "";

        if (imageFile && imageFile.size > 0) {
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
                    imageUrl = imgData.data.url;
                } else {
                    throw new Error(imgData.error?.message || "Image upload failed");
                }
            } catch (err: any) {
                console.error("ImgBB Error:", err);
                toast.error(`Image upload failed: ${err.message}`);
                setIsLoading(false);
                return;
            }
        }

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                image: imageUrl || undefined,
                role,
                ...(role === 'company' && {
                    companyName,
                    registrationNo,
                }),
                callbackURL: "/"
            } as any);

            if (data) {
                toast.success('Account created successfully!');
                window.location.assign('/');
            }
            if (error) {
                toast.error(error.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Signup Process Failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            });
        } catch (err) {
            console.error(err);
            toast.error('Google Authentication Failed');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Main Container */}
            <div className="w-full max-w-[960px] bg-white rounded-3xl shadow-2xl shadow-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100">
                
                {/* ─── LEFT SIDE: DARK BRANDING PANEL ─── */}
                <div className="md:col-span-5 bg-[#0f172a] p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Brand Logo */}
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                            <FiZap size={22} className="text-blue-500 fill-blue-500" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">VoltNet</span>
                    </div>

                    {/* Brand Text Content */}
                    <div className="relative z-10 my-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                            Join the next-gen EV charging network.
                        </h2>
                        <p className="mt-4 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                            Create an account to manage your EV fleets, schedule smart charging sessions, and seamlessly track energy metrics.
                        </p>
                    </div>

                    {/* Left Footer Info */}
                    <div className="relative z-10 text-[11px] text-slate-500 font-medium">
                        © 2026 VoltNet Inc. All rights reserved.
                    </div>
                </div>

                {/* ─── RIGHT SIDE: FORM PANEL ─── */}
                <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white overflow-y-auto max-h-[85vh] md:max-h-none">
                    
                    {/* Header Tabs */}
                    <div className="flex items-center gap-6 mb-6 border-b border-slate-100 pb-3">
                        <Link href="/auth/signin" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                            Login
                        </Link>
                        <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 -mb-3 pb-3">
                            Register
                        </button>
                    </div>

                    <Form className="flex flex-col gap-3.5" onSubmit={onSubmit}>
                        
                        {/* Profile Image Avatar Upload */}
                        <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
                            <label className="relative group cursor-pointer w-12 h-12 bg-white border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center hover:border-blue-500 transition-all shrink-0">
                                {imagePreview ? (
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                                ) : (
                                    <FiCamera size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                )}
                                <input type="file" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <div>
                                <span className="text-xs font-semibold text-slate-700 block">Profile Picture</span>
                                <span className="text-[10px] text-slate-400 block">PNG, JPG or WEBP (Optional)</span>
                            </div>
                        </div>

                        {/* Account Role Radio Group with Sub-components */}
                        <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <Label className="text-xs font-semibold text-slate-700">Account Type</Label>
                            <RadioGroup 
                                value={role} 
                                onChange={(val: any) => setRole(typeof val === 'string' ? val : val.target.value)} 
                                orientation="horizontal"
                                className="flex gap-6 items-center pt-1"
                            >
                                <Radio value="driver" className="cursor-pointer">
                                    <Radio.Content className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        EV Driver
                                    </Radio.Content>
                                </Radio>

                                <Radio value="company" className="cursor-pointer">
                                    <Radio.Content className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Fleet Company
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div>

                        {/* Full Name */}
                        <TextField isRequired name="name" type="text">
                            <span className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</span>
                            <Input 
                                placeholder="John Doe" 
                                className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                            />
                            <FieldError className="text-xs text-rose-500 mt-1" />
                        </TextField>

                        {/* Conditional Company Fields */}
                        {role === "company" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl">
                                <TextField isRequired name="companyName" type="text">
                                    <span className="text-xs font-semibold text-slate-700 mb-1 block">Company Name</span>
                                    <Input placeholder="EcoCharge Ltd." className="bg-white border border-slate-200 rounded-xl text-sm py-1.5 px-3" />
                                </TextField>
                                <TextField isRequired name="registrationNo" type="text">
                                    <span className="text-xs font-semibold text-slate-700 mb-1 block">Reg. Number</span>
                                    <Input placeholder="REG-10928" className="bg-white border border-slate-200 rounded-xl text-sm py-1.5 px-3" />
                                </TextField>
                            </div>
                        )}

                        {/* Email Address */}
                        <TextField isRequired name="email" type="email">
                            <span className="text-xs font-semibold text-slate-700 mb-1 block">E-mail Address</span>
                            <Input 
                                placeholder="user@voltnet.com" 
                                className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                            />
                            <FieldError className="text-xs text-rose-500 mt-1" />
                        </TextField>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <TextField isRequired name="password" type="password">
                                <span className="text-xs font-semibold text-slate-700 mb-1 block">Password</span>
                                <Input 
                                    placeholder="••••••••" 
                                    className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                                />
                                <FieldError className="text-xs text-rose-500 mt-1" />
                            </TextField>

                            <TextField isRequired name="confirmPassword" type="password">
                                <span className="text-xs font-semibold text-slate-700 mb-1 block">Confirm Password</span>
                                <Input 
                                    placeholder="••••••••" 
                                    className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                                />
                                <FieldError className="text-xs text-rose-500 mt-1" />
                            </TextField>
                        </div>

                        {/* Submit Button */}
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm mt-2"
                            type="submit"
                            isDisabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>

                        {/* Social Separator */}
                        <div className="relative flex py-2 items-center mt-1">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Or register with
                            </span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="flex items-center justify-start gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-xs"
                                title="Sign up with Google"
                            >
                                <FcGoogle size={20} />
                            </button>
                        </div>
                    </Form>
                </div>

            </div>
        </div>
    );
}