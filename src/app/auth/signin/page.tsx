'use client';
import React, { useState } from "react";
import { Button, Form, Input, TextField, FieldError } from "@heroui/react";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiZap } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import Link from "next/link";

export default function Signin() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (data) {
                toast.success('Welcome Back!');
                const userRole = (data.user as any).role || 'driver';
                window.location.assign(`/dashboard/${userRole}`);
            }
            if (error) {
                toast.error(error.message || 'Invalid Credentials');
            }
        } catch (err) {
            console.error(err);
            toast.error('Login Process Failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });
        } catch (err) {
            console.error(err);
            toast.error('Google Authentication Failed');
        }
    };

    const handleDemoLogin = () => {
        toast.success("Logging in as Demo Driver...");
    };

    return (
        <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Main Container */}
            <div className="w-full max-w-[960px] min-h-[580px] bg-white rounded-3xl shadow-2xl shadow-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100">
                
                {/* ─── LEFT SIDE: DARK BRANDING PANEL ─── */}
                <div className="md:col-span-5 bg-[#0f172a] p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    {/* Background Subtle Pattern */}
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
                            Power your journey with seamless EV charging.
                        </h2>
                        <p className="mt-4 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                            Access the smartest charging network. Reserve slots in advance, locate nearby hubs, and power up without waiting.
                        </p>
                    </div>

                    {/* Left Footer Info */}
                    <div className="relative z-10 text-[11px] text-slate-500 font-medium">
                        © 2026 VoltNet Inc. All rights reserved.
                    </div>
                </div>

                {/* ─── RIGHT SIDE: FORM PANEL ─── */}
                <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
                    
                    {/* Header Tabs (Login / Register style) */}
                    <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-3">
                        <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 -mb-3 pb-3">
                            Login
                        </button>
                        <Link href="/auth/signup" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                            Register
                        </Link>
                    </div>

                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        {/* Email Field */}
                        <TextField isRequired name="email" type="email">
                            <span className="text-xs font-semibold text-slate-700 mb-1.5 block">E-mail Address</span>
                            <Input 
                                placeholder="driver@voltnet.com" 
                                className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                            />
                            <FieldError className="text-xs text-rose-500 mt-1" />
                        </TextField>

                        {/* Password Field */}
                        <TextField isRequired name="password" type="password">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs font-semibold text-slate-700">Password</span>
                                <span className="text-[11px] text-blue-600 font-medium hover:underline cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>
                            <Input 
                                placeholder="••••••••" 
                                className="bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm py-2 px-3 transition-all" 
                            />
                            <FieldError className="text-xs text-rose-500 mt-1" />
                        </TextField>

                        {/* Submit Button */}
                        <div className="flex items-center gap-3 mt-2">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm"
                                type="submit"
                                isDisabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>

                            <Button
                                type="button"
                                className="h-11 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                                onClick={handleDemoLogin}
                            >
                                Demo Driver
                            </Button>
                        </div>

                        {/* Social Login Separator */}
                        <div className="relative flex py-3 items-center mt-4">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Or login with
                            </span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="flex items-center justify-start gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-xs"
                                title="Login with Google"
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