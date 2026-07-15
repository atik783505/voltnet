import { getAllUsers } from '@/lib/api/user';
import React from 'react';
import { Shield, Mail } from 'lucide-react';
import { UserInput } from '@/types';
import { UserBlockButton } from '@/components/dashboard/UserBlockButton';
import { Avatar } from "@heroui/react"; 
const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
};

const ManageUser = async () => {
    const response = await getAllUsers();
    const users: UserInput[] = Array.isArray(response) 
        ? response 
        : (response?.users || response?.data || []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <Shield className="text-blue-600 w-6 h-6" />
                        Manage Users
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Total Registered Users: {users.length}
                    </p>
                </div>
            </div>

            {/* Table Container - Clean White Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Email Address</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {users.length > 0 ? (
                                users.map((user: UserInput) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition">
                                        
                                        {/* HeroUI Avatar & Name */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border border-slate-200 shrink-0">
                                                    {user.image ? (
                                                        <Avatar.Image 
                                                            src={user.image} 
                                                            alt={user.name || "User Avatar"} 
                                                        />
                                                    ) : null}
                                                    <Avatar.Fallback className="bg-slate-100 text-slate-600 font-semibold text-xs">
                                                        {getInitials(user.name)}
                                                    </Avatar.Fallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{user.name || "N/A"}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                                                        ID: {user._id.slice(-6)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Mail size={14} className="text-slate-400 shrink-0" />
                                                <span>{user.email}</span>
                                            </div>
                                        </td>

                                        {/* Role - Light Badges */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                                user.role === 'admin'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : user.role === 'driver'
                                                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Block Status - Light Badges */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                user.isBlocked 
                                                    ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            }`}>
                                                ● {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end">
                                                <UserBlockButton
                                                    userId={user._id}
                                                    isBlocked={user.isBlocked}
                                                />
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;