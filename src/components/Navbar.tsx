'use client';
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { FiLogOut,} from "react-icons/fi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

interface NavLink {
    name: string;
    href: string;
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoggedIn = !!user;
    const handleSignOut = async (): Promise<void> => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.assign('/'); 
                    },
                },
            });
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    const dashboardHref = user?.role ? `/dashboard/${user.role}` : '/dashboard';
    const links: NavLink[] = isLoggedIn 
        ? [
            { name: "Dashboard", href: dashboardHref },
            { name: "All Stations", href: "/stations" },
            { name: "Reservations", href: "/reservations" },
            { name: "Fleet", href: "/fleet" },
          ]
        : [
            { name: "All Stations", href: "/stations" },
            { name: "Fleet", href: "/fleet" },
          ];
    if (isPending) return <div className="h-16 w-full border-b border-slate-100 bg-white" />;
    
    if (pathname.includes('/dashboard')) return null;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
            <header className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
                
                {/* Left Side: Brand Logo & Search Bar */}
                <div className="flex items-center gap-6 max-w-xl">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <p className="font-bold text-xl text-blue-600 tracking-tight">VoltNet</p>
                    </Link>

                    {/* Search Bar */}
                    {/* <div className="hidden md:flex items-center relative w-full max-w-xs">
                        <FiSearch className="absolute left-4 text-slate-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Search by city, station..." 
                            className="w-full h-10 pl-11 pr-11 bg-slate-50 border border-slate-200/80 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                        <BiTargetLock className="absolute right-4 text-slate-400 text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                    </div> */}
                </div>

                {/* Center: Dynamic Navigation Links */}
                <ul className="hidden items-center gap-6 lg:gap-8 md:flex shrink-0">
                    {links.map((link: NavLink) => {
                        const isActive = pathname === link.href || (link.name === "Explore" && pathname === "/stations");
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-sm font-medium relative py-5 transition-colors ${
                                        isActive 
                                            ? "text-blue-600 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600" 
                                            : "text-slate-500 hover:text-slate-900"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side: Conditional Action Section */}
                <div className="items-center gap-4 flex shrink-0">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3 lg:gap-4">
                            <button type="button" className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors">
                                <IoNotificationsOutline size={22} />
                            </button>
                            <button type="button" className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors">
                                <IoSettingsOutline size={22} />
                            </button>

                            {/* Avatar Component with Live User Data */}
                            <Link href="/my-profile" className="shrink-0">
                                <Avatar size="sm" isBordered className="cursor-pointer border-slate-200 transition-transform hover:scale-105">
                                    <Avatar.Image 
                                        referrerPolicy="no-referrer" 
                                        alt={user?.name || "User"} 
                                        src={user?.image || undefined} 
                                    />
                                    <Avatar.Fallback>
                                        {user?.name ? user.name.substring(0, 2).toUpperCase() : "VN"}
                                    </Avatar.Fallback>
                                </Avatar>
                            </Link>

                            {/* Sign Out Button */}
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={handleSignOut}
                                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-9 text-xs rounded-lg shadow-sm transition-all"
                            >
                                <FiLogOut className="text-sm shrink-0 mr-1" />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link href="/auth/signin" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                Login
                            </Link>
                            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
                                Get Started
                            </Link>
                        </div>
                    )}
                    
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 ml-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Responsive Overlay Container */}
            {isMenuOpen && (
                <div className="border-t border-slate-100 bg-white p-4 md:hidden flex flex-col gap-4 shadow-lg animate-in fade-in duration-200">
                    {links.map((link: NavLink) => (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-blue-600 font-semibold" : "text-slate-600"}`} 
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    {isLoggedIn ? (
                        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Avatar size="sm" src={user?.image || undefined} />
                                <div className="text-sm font-medium text-slate-700">{user?.name}</div>
                            </div>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={handleSignOut}
                                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold h-10 rounded-lg transition-colors"
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                            <Link 
                                href="/auth/signin" 
                                className="w-full text-center text-sm font-medium text-slate-600 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link 
                                href="/auth/signup" 
                                className="w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}