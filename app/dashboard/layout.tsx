'use client';

import React from 'react';
import TenantSidebar from '@/components/TenantSidebar';
import { useTenant } from '@/context/TenantContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TenantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentTenant, loading } = useTenant();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
                <p className="text-text-muted font-medium">Loading instance...</p>
            </div>
        );
    }

    if (!currentTenant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <div className="glass p-8 rounded-3xl max-w-md space-y-6">
                    <AlertCircle className="mx-auto text-amber-500" size={64} />
                    <div>
                        <h2 className="text-2xl font-bold">No Active Instance</h2>
                        <p className="text-text-muted mt-2">
                            You need to select a tenant from the Master Dashboard to view this operational area.
                        </p>
                    </div>
                    <Link
                        href="/master/tenants"
                        className="block w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all"
                    >
                        Go to Tenant Selection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <TenantSidebar />
            <main className="flex-1 lg:ml-64 p-4 md:p-8 relative overflow-hidden">
                {/* Background Decorative Blob */}
                <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full -z-10"></div>
                <div className="fixed bottom-[-5%] left-[20%] w-[30%] h-[30%] bg-indigo-600/5 blur-[120px] rounded-full -z-10"></div>

                {children}
            </main>
        </div>
    );
}
