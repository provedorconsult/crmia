'use client';

import React from 'react';
import { useTenant } from '@/context/TenantContext';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentTenant, loading } = useTenant();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 space-y-4">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    if (!currentTenant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-950">
                <div className="glass p-8 rounded-3xl max-w-sm space-y-6">
                    <AlertCircle className="mx-auto text-amber-500" size={48} />
                    <h2 className="text-xl font-bold">Acesso Restrito</h2>
                    <p className="text-sm text-text-muted">Selecione uma instância para continuar.</p>
                    <Link href="/master" className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Voltar</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-emerald-500/30">
            {/* Mobile Optimized Header */}
            <header className="sticky top-0 z-40 glass border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <span className="font-bold text-slate-900">F</span>
                    </div>
                    <span className="font-bold tracking-tight">{currentTenant.name.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Online</span>
                </div>
            </header>

            <main className="flex-1 p-4 pb-24 max-w-md mx-auto w-full">
                {children}
            </main>

            {/* Bottom Navigation Tab Bar (Mobile Standard) */}
            <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
                <NavIcon icon="home" active />
                <NavIcon icon="list" />
                <NavIcon icon="scan" />
                <NavIcon icon="user" />
            </nav>

            <style jsx global>{`
        body {
          overscroll-behavior-y: contain;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
        </div>
    );
}

function NavIcon({ icon, active }: { icon: string, active?: boolean }) {
    const icons: any = {
        home: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
        list: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
        scan: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="12" y1="7" x2="12" y2="17" /></svg>,
        user: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    };

    return (
        <button className={`p-2 rounded-2xl transition-all ${active ? 'bg-emerald-500 text-slate-900 scale-110 shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
            {icons[icon]}
        </button>
    );
}
