import { DashboardSidebar } from '@/components/dashboard/DashboardSidbar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row h-screen max-h-screen w-full bg-slate-50 text-slate-800 overflow-hidden relative">
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply"
                style={{
                    backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="relative z-20 flex-shrink-0">
                <DashboardSidebar />
            </div>
            <main className="flex-1 h-full max-h-full overflow-y-auto relative z-10 px-4 py-6 md:px-8 md:py-8">
                <div className="max-w-7xl mx-auto w-full pb-12"> 
                    {children}
                </div>
            </main>
            
        </div>
    );
};

export default DashboardLayout;