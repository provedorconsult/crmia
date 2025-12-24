'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Settings,
    Layers,
    LogOut,
    ChevronRight
} from 'lucide-react';

const menuItems = [
    { icon: BarChart3, label: 'Overview', href: '/master' },
    { icon: Layers, label: 'Tenants', href: '/master/tenants' },
    { icon: Users, label: 'Masters', href: '/master/users' },
    { icon: Settings, label: 'Config', href: '/master/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="glass glass-dark w-64 h-screen fixed left-0 top-0 flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Layers className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    FieldFlow
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive
                                    ? 'bg-indigo-600/20 text-white border-l-4 border-indigo-500 translate-x-1'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} />}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 w-full p-3 transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Sair</span>
                </button>
            </div>

            <style jsx>{`
        aside {
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
        </aside>
    );
}
