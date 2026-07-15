'use client';
import React, { useState } from "react";
import { Button, Card, Form, Input, TextField, FieldError } from "@heroui/react";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiZap } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";

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
                const userRole = (data.user as any).role || 'user';
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
        <div className="relative min-h-screen w-full bg-[#f4f7fa] flex flex-col items-center justify-between p-6 overflow-hidden">

            {/* ─── BACKGROUND GLOW EFFECTS ─── */}
            {/* Top Right Heavy Blue Glow */}
            <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600 via-indigo-500/40 to-transparent blur-[90px] pointer-events-none" />

            {/* Bottom Left Heavy Orange/Amber Glow */}
            <div className="absolute bottom-[-20%] left-[-15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-orange-600 via-amber-500/35 to-transparent blur-[100px] pointer-events-none" />

            {/* Grid Dot Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            {/* ─── TOP BRAND LOGO & HEADER ─── */}
            <div className="relative z-10 flex flex-col items-center text-center mt-4 mb-2">
                <div className="flex items-center gap-2 text-blue-600">
                    <FiZap size={28} className="fill-blue-600" />
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">VoltNet</span>
                </div>
                <p className="text-xs font-medium text-slate-500 max-w-xs mt-2 leading-relaxed">
                    The next generation of enterprise EV fleet management and charging infrastructure.
                </p>
            </div>

            {/* ─── CONTENT CARD ─── */}
            <Card className="relative z-10 p-6 md:p-8 bg-white/95 backdrop-blur-lg border border-slate-200/80 shadow-2xl shadow-slate-900/10 rounded-2xl w-full max-w-[480px] my-auto">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
                    <p className="text-xs text-slate-400 mt-1">Sign in to manage your charging fleet.</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    {/* Email Field */}
                    <TextField isRequired name="email" type="email">
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Email Address</span>
                        <Input placeholder="admin@voltnet.com" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" type="password">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-semibold text-slate-700">Password</span>
                            <span className="text-[10px] text-blue-600 font-semibold hover:underline cursor-pointer">Forgot password?</span>
                        </div>
                        <Input placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Standard Sign In Button */}
                    <Button
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl shadow-sm transition-colors text-sm"
                        type="submit"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Visual Separator Divider */}
                    <div className="flex items-center my-2 w-full">
                        <hr className="flex-1 border-slate-200" />
                        <span className="px-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider shrink-0">
                            Or Continue With
                        </span>
                        <hr className="flex-1 border-slate-200" />
                    </div>

                    {/* Social Google & Demo Action Elements */}
                    <div className="flex gap-4 w-full">
                        <Button
                            type="button"
                            variant="bordered"
                            className="w-1/2 h-11 border-slate-200 rounded-xl font-semibold text-slate-600 text-xs bg-white hover:bg-slate-50 transition-colors"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle size={18} className="mr-1" /> Google
                        </Button>

                        <Button
                            type="button"
                            className="w-1/2 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                            onClick={handleDemoLogin}
                        >
                            <HiOutlineLightningBolt size={16} className="mr-0.5" /> Demo Login
                        </Button>
                    </div>
                </Form>
            </Card>

            {/* ─── FOOTER SECTION ─── */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 mt-6 mb-2 select-none">
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                    <span className="hover:text-slate-600 cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-slate-600 cursor-pointer transition-colors">Security</span>
                    <span className="hover:text-slate-600 cursor-pointer transition-colors">Support</span>
                </div>
                <p className="text-[10px] text-slate-400/80">
                    © 2026 VoltNet Infrastructure Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}