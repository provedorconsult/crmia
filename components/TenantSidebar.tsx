'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/context/TenantContext';
import {
    Home,
    Users,
    ShoppingBag,
    ClipboardList,
    Calendar,
    Settings,
    ShieldAlert,
    Menu,
    X
} from 'lucide-react';

const tenantMenu = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ClipboardList, label: 'Service Orders', href: '/dashboard/orders' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
    { icon: Users, label: 'Customers', href: '/dashboard/customers' },
    { icon: ShoppingBag, label: 'Catalog', href: '/dashboard/catalog' },
    { icon: ShieldAlert, label: 'Security/Staff', href: '/dashboard/staff' },
];

export default function TenantSidebar() {
    const pathname = usePathname();
    const { currentTenant } = useTenant();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <>
            <button
                className="fixed top-4 left-4 z-[60] lg:hidden glass p-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside className={`glass glass-dark w-64 h-screen fixed left-0 top-0 flex flex-col p-6 z-50 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                        <ClipboardList className="text-white" size={24} />
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="text-lg font-bold truncate">
                            {currentTenant?.name || 'FieldFlow'}
                        </h1>
                        <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Operational</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {tenantMenu.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive
                                        ? 'bg-emerald-600/20 text-emerald-400 border-r-4 border-emerald-500'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link
                        href="/master"
                        className="flex items-center gap-3 text-gray-500 hover:text-indigo-400 p-3 transition-colors text-sm"
                    >
                        <Settings size={18} />
                        <span>Master Console</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
