'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Button, Drawer } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import {
    LuLayoutDashboard, LuMenu, LuMapPin, LuHistory,
    LuZap, LuUsers, LuShieldAlert, LuLogOut,
} from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import type { IconType } from "react-icons";
import toast from 'react-hot-toast';
import { MdAddTask } from 'react-icons/md';
import { IoIosHelpCircle } from 'react-icons/io';

interface NavItem {
    name: string;
    href: string;
    icon: IconType;
}

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [drawerKey, setDrawerKey] = useState<number>(0);

    useEffect(() => {
        setIsOpen(false);
        setDrawerKey(prev => prev + 1);
    }, [pathname]);

    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("Signed out successfully");
        window.location.href = "/";
    };

    const getFallbackText = (name: string | undefined | null): string => {
        if (!name) return "VN";
        const words = name.trim().split(" ");
        if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
    };

    const navLinkMap: Record<'driver' | 'admin', NavItem[]> = {
        driver: [
            { name: "Overview", href: "/dashboard/driver", icon: LuLayoutDashboard },
            { name: "Find Stations", href: "/stations", icon: LuMapPin },
            { name: "Charging Sessions", href: "/dashboard/driver/my-bookings", icon: LuZap },
            { name: "Payment History", href: "/dashboard/driver/transection", icon: LuHistory },
        ],
        admin: [
            { name: "Overview", href: "/dashboard/admin", icon: LuLayoutDashboard },
            { name: "Manage Stations", href: "/dashboard/admin/manage-stations", icon: LuShieldAlert },
            { name: "Add Station", href: "/dashboard/admin/manage-stations/new", icon: MdAddTask },
            { name: "Users & Fleets", href: "/dashboard/admin/manage-users", icon: LuUsers },
        ]
    };

    const userRole = (user as any)?.role === 'admin' ? 'admin' : 'driver';
    const menuItems = navLinkMap[userRole];

    const renderNavLinks = () => (
        <nav className="flex-1 space-y-1 w-full">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-slate-800/80 text-white font-semibold border-l-3 border-blue-500 pl-3.5"
                                : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                            }`}
                    >
                        <Icon className={`text-lg shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );

    const renderBottomSection = () => (
        <div className="mt-auto pt-6 border-t border-slate-900/80 space-y-4">
            {/* Added dynamic Action Button as shown in reference design */}
            {userRole === 'admin' && (
                <Link href="/dashboard/admin/manage-stations/new" className="block w-full">
                    <Button
                        variant="primary"
                        className="w-full font-bold text-sm h-11 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20"
                    >
                        <span className="text-lg mr-1">+</span> New Station
                    </Button>
                </Link>
            )}

            {/* Support and Help links matches reference UI */}
            <div className="space-y-1">
                <Link href="/contact" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-colors">
                    <BiSupport className="text-base" /> Support
                </Link>
                <Link href="/about" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 transition-colors">
                    <IoIosHelpCircle className="text-base" /> Help
                </Link>
            </div>

            {/* User Info & Sign out */}
            <div className="flex items-center justify-between gap-2 px-2 pt-2 border-t border-slate-900/40">
                <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar className="w-9 h-9 border border-blue-500/30 bg-slate-900 text-blue-400 font-bold overflow-hidden shrink-0">
                        <Avatar.Image
                            alt={user?.name || "User Avatar"}
                            src={user?.image || undefined}
                        />
                        <Avatar.Fallback>
                            {getFallbackText(user?.name)}
                        </Avatar.Fallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <h3 className="text-xs font-bold text-slate-200 truncate">{user?.name || "Atikur Rahman"}</h3>
                        <p className="text-[10px] text-slate-500 capitalize">{userRole} Fleet</p>
                    </div>
                </div>
                <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    isIconOnly
                    className="text-red-400 hover:bg-red-500/10 rounded-lg min-w-8 w-8 h-8"
                >
                    <LuLogOut className="text-base" />
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Header (Remains sticky on mobile screens) */}
            <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-slate-950 border-b border-slate-900 px-4 flex items-center justify-between z-40">
                <Link href='/' className="flex items-center gap-2">
                    <LuZap className="fill-blue-500 text-blue-500" size={20} />
                    <span className="text-lg font-bold text-white">VoltNet</span>
                </Link>
                <Button onPress={() => setIsOpen(true)} variant="ghost" isIconOnly className="text-slate-400"><LuMenu className="size-6" /></Button>
                <Drawer key={drawerKey} isOpen={isOpen} onOpenChange={setIsOpen}>
                    <Drawer.Backdrop />
                    <Drawer.Content placement="left" className="bg-slate-950 max-w-[270px] border-r border-slate-900 p-5 text-white flex flex-col h-full">
                        <Drawer.Dialog className="flex flex-col h-full">
                            <Link href='/' className="mb-8 font-bold text-xl text-white flex items-center gap-2">
                                <LuZap className="fill-blue-500 text-blue-500" size={22} /> VoltNet
                            </Link>
                            {renderNavLinks()}
                            {renderBottomSection()}
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer>
            </div>

            {/* Desktop Aside (Styled after references with dark-slate gradient glass effects) */}
            <aside className="hidden md:flex w-64 bg-slate-950/95 border-r border-slate-900/60 flex-col h-screen sticky top-0 px-4 py-6 shrink-0 z-20 backdrop-blur-md">
                {/* Header/Logo */}
                <div className="mb-8 px-3">
                    <Link href='/' className="flex items-center gap-2.5">
                        <div className="p-1 bg-blue-600/10 rounded-lg border border-blue-500/20">
                            <LuZap className="fill-blue-500 text-blue-500" size={20} />
                        </div>
                        <div>
                            <span className="text-md font-bold text-white tracking-tight block">VoltNet Admin</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block -mt-1">Enterprise Fleet</span>
                        </div>
                    </Link>
                </div>

                {/* Main Nav Links */}
                {renderNavLinks()}

                {/* Lower Action & User Profiles */}
                {renderBottomSection()}
            </aside>
            <div className="md:hidden h-14 w-full" />
        </>
    );
}