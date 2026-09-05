'use client';
import React, { useState } from "react";
import Image from "next/image"; 
import { 
    Button, 
    Card, 
    Form, 
    Input, 
    TextField, 
    FieldError, 
    Description, 
    Label, 
    Radio, 
    RadioGroup 
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiZap, FiCamera } from "react-icons/fi";

export default function Signup() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [role, setRole] = useState<string>("driver");

    // ইমেজ সিলেক্ট করলে প্রিভিউ দেখানোর ফাংশন
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
        
        // Company specific fields
        const companyName = formData.get("companyName") as string || "";
        const registrationNo = formData.get("registrationNo") as string || "";

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        let imageUrl = "";

        // ─── IMGBB IMAGE UPLOAD LOGIC ───
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

        // ─── BETTER AUTH SIGN UP ───
        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                image: imageUrl || undefined,
                role: role, // Selected role ('driver' or 'company')
                // additional fields if required by your auth schema
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
        <div className="relative min-h-screen w-full bg-[#f4f7fa] flex flex-col items-center justify-between p-6 overflow-hidden">

            {/* BACKGROUND GLOW EFFECTS */}
            <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600 via-indigo-500/40 to-transparent blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-orange-600 via-amber-500/35 to-transparent blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            {/* TOP BRAND LOGO & HEADER */}
            <div className="relative z-10 flex flex-col items-center text-center mt-4 mb-2">
                <div className="flex items-center gap-2 text-blue-600">
                    <FiZap size={28} className="fill-blue-600" />
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">VoltNet</span>
                </div>
                <p className="text-xs font-medium text-slate-500 max-w-xs mt-2 leading-relaxed">
                    The next generation of enterprise EV fleet management and charging infrastructure.
                </p>
            </div>

            {/* CONTENT CARD */}
            <Card className="relative z-10 p-6 md:p-8 bg-white/95 backdrop-blur-lg border border-slate-200/80 shadow-2xl shadow-slate-900/10 rounded-2xl w-full max-w-[500px] my-auto">
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create an Account</h2>
                    <p className="text-xs text-slate-400 mt-1">Get started with managing your charging fleet or driving EV today.</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    
                    {/* ─── NEXT IMAGE UPLOAD ─── */}
                    <div className="flex flex-col items-center justify-center mb-2">
                        <label className="relative group cursor-pointer w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden flex flex-col items-center justify-center hover:border-blue-500 hover:bg-slate-100/50 transition-all shadow-sm">
                            
                            {imagePreview ? (
                                <Image 
                                    src={imagePreview}
                                    alt="Profile Preview" 
                                    fill
                                    className="object-cover rounded-2xl"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex flex-col items-center text-center p-2 z-10">
                                    <FiCamera size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <span className="text-[10px] font-semibold text-slate-400 mt-1 group-hover:text-blue-500">Upload</span>
                                </div>
                            )}
                            
                            <input 
                                type="file" 
                                name="image"
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange}
                            />

                            {imagePreview && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl z-20">
                                    <FiCamera size={18} className="text-white" />
                                </div>
                            )}
                        </label>
                        <span className="text-[11px] font-medium text-slate-400 mt-1.5">Profile Photo</span>
                    </div>

                    {/* ─── ACCOUNT TYPE / ROLE SELECTION ─── */}
                    <div className="flex flex-col gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                        <Label className="text-xs font-semibold text-slate-700">Account Type</Label>
                        <RadioGroup 
                            value={role} 
                            onChange={(val: any) => setRole(typeof val === 'string' ? val : val.target.value)} 
                            name="role" 
                            orientation="horizontal"
                            className="flex gap-3"
                        >
                            <Radio value="driver" className="flex-1 cursor-pointer">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <span className="text-xs font-bold text-slate-800">EV Driver</span>
                                </Radio.Content>
                                <Description className="text-[10px] text-slate-400">Personal EV User</Description>
                            </Radio>

                            <Radio value="company" className="flex-1 cursor-pointer">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <span className="text-xs font-bold text-slate-800">Fleet Company</span>
                                </Radio.Content>
                                <Description className="text-[10px] text-slate-400">Enterprise / Operator</Description>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Full Name Field */}
                    <TextField isRequired name="name" type="text">
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Full Name</span>
                        <Input placeholder="John Doe" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* DYNAMIC COMPANY FIELDS */}
                    {role === "company" && (
                        <div className="flex flex-col gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                            <TextField isRequired name="companyName" type="text">
                                <span className="text-xs font-semibold text-slate-700 mb-1 block">Company / Fleet Name</span>
                                <Input placeholder="EcoCharge Fleet Ltd." className="bg-white border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-rose-500 mt-1" />
                            </TextField>

                            <TextField isRequired name="registrationNo" type="text">
                                <span className="text-xs font-semibold text-slate-700 mb-1 block">Business Registration No.</span>
                                <Input placeholder="REG-892341" className="bg-white border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-rose-500 mt-1" />
                            </TextField>
                        </div>
                    )}

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email">
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Email Address</span>
                        <Input placeholder="user@domain.com" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" type="password">
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Password</span>
                        <Input placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Confirm Password Field */}
                    <TextField isRequired name="confirmPassword" type="password">
                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Confirm Password</span>
                        <Input placeholder="••••••••" className="bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Submit Button */}
                    <Button
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2"
                        type="submit"
                        isDisabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Get Started"}
                    </Button>

                    {/* Visual Separator Divider */}
                    <div className="flex items-center my-1 w-full">
                        <hr className="flex-1 border-slate-200" />
                        <span className="px-3 text-[10px] font-bold uppercase text-slate-400 tracking-wider shrink-0">
                            Or Sign Up With
                        </span>
                        <hr className="flex-1 border-slate-200" />
                    </div>

                    {/* Social Google & Signin Redirect */}
                    <div className="flex flex-col gap-3 w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11 border-slate-200 rounded-xl font-semibold text-slate-600 text-sm bg-white hover:bg-slate-50 transition-colors flex items-center justify-center"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle size={20} className="mr-2" /> Google
                        </Button>

                        <p className="text-center text-xs text-slate-500 mt-1">
                            Already have an account?{" "}
                            <a href="/signin" className="text-blue-600 font-semibold hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </Form>
            </Card>

            {/* FOOTER SECTION */}
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