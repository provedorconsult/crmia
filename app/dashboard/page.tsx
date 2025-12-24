'use client';

import React from 'react';
import {
    ClipboardList,
    Users,
    TrendingUp,
    Clock,
    AlertCircle,
    ChevronRight,
    UserCheck
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';

const DashboardStat = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="glass p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                <Icon className={`text-${color}-500`} size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">+12%</span>
        </div>
        <h3 className="text-text-muted text-xs font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-[10px] text-text-muted mt-1">{sub}</p>
    </div>
);

export default function TenantOverview() {
    const { currentTenant } = useTenant();

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Operational View</h2>
                    <p className="text-text-muted mt-1">Status overview for {currentTenant?.name}.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 glass rounded-xl text-sm font-semibold">Reports</button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20">New OS</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStat
                    title="Open Orders"
                    value="24"
                    sub="8 urgent today"
                    icon={ClipboardList}
                    color="emerald"
                />
                <DashboardStat
                    title="Technicians"
                    value="6"
                    sub="4 active in field"
                    icon={UserCheck}
                    color="blue"
                />
                <DashboardStat
                    title="New Customers"
                    value="12"
                    sub="This month"
                    icon={Users}
                    color="purple"
                />
                <DashboardStat
                    title="Avg. Resolve Time"
                    value="2.4h"
                    sub="-15% from last week"
                    icon={Clock}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold">Priority Orders</h3>
                        <button className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                            View All <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold">
                                        #{1024 + i}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Technical Maintenance - ACME Corp</h4>
                                        <p className="text-xs text-text-muted mt-1 flex items-center gap-2">
                                            <Clock size={12} /> Pending for 3 hours • Technician: Carlos M.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full uppercase">Urgent</span>
                                    <ChevronRight size={16} className="text-text-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-8">Field Activity</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500"></div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">Carlos Mendes <span className="text-xs text-text-muted font-normal ml-2">5m ago</span></p>
                                <p className="text-xs text-emerald-400 mt-0.5">Started service at Client #88</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500"></div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">Julia Silva <span className="text-xs text-text-muted font-normal ml-2">12m ago</span></p>
                                <p className="text-xs text-blue-400 mt-0.5">In route to Osasco Centro</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700"></div>
                            <div className="flex-1 opacity-50">
                                <p className="text-sm font-bold text-text-muted">Roberto J.</p>
                                <p className="text-xs mt-0.5">Last active: 2h ago</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-3 glass hover:bg-white/10 rounded-xl text-sm font-bold transition-all">
                        Live Map View
                    </button>
                </div>
            </div>
        </div>
    );
}
