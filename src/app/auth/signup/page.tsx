'use client';
import React, { useState } from "react";
import { Button, Card, Form, Input, TextField, FieldError } from "@heroui/react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { FiZap } from "react-icons/fi"; // VoltNet লোগোর জন্য ইলেকট্রিক বোল্ট আইকন

export default function Signup() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const fullName = `${firstName} ${lastName}`.trim();

        try {
            const { data, error } = await signUp.email({
                name: fullName,
                email: email,
                password: password,
            });

            if (data) {
                toast.success('Account Created Successfully!');
                window.location.assign('/');
            }
            if (error) {
                toast.error(error.message || 'Registration Failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
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

            {/* ─── TOP BRAND LOGO & HEADER (AS SEEN IN IMAGE) ─── */}
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
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h2>
                    <p className="text-xs text-slate-400 mt-1">Join the VoltNet network today.</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    {/* First Name & Last Name Inline Row */}
                    <div className="flex gap-4 w-full">
                        <TextField isRequired name="firstName" type="text" className="w-1/2">
                            <span className="text-xs font-semibold text-slate-700 mb-1.5 block">First Name</span>
                            <Input placeholder="John" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        </TextField>

                        <TextField isRequired name="lastName" type="text" className="w-1/2">
                            <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Last Name</span>
                            <Input placeholder="Doe" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        </TextField>
                    </div>

                    {/* Email Address */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Work Email</span>
                        <Input placeholder="j.doe@enterprise.com" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Must include at least one uppercase letter";
                            if (!/[a-z]/.test(value)) return "Must include at least one lowercase letter";
                            return null;
                        }}
                    >
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Password</span>
                        <Input placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Terms and Privacy Checkbox */}
                    <div className="flex items-start gap-2 mt-1 select-none">
                        <input type="checkbox" id="terms" required className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                            I agree to the <span className="text-blue-600 font-medium hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 font-medium hover:underline cursor-pointer">Privacy Policy</span>.
                        </label>
                    </div>

                    {/* Submit Action Button */}
                    <Button 
                        className="w-full mt-2 bg-[#4A5568] hover:bg-[#3A4454] text-white font-semibold h-11 rounded-xl shadow-sm transition-colors text-sm" 
                        type="submit"
                        isLoading={isLoading}
                    >
                        Complete Registration
                    </Button>
                </Form>
            </Card>

            {/* ─── FOOTER SECTION (AS SEEN IN IMAGE) ─── */}
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