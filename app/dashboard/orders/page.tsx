'use client';

import React, { useState } from 'react';
import {
    ClipboardList,
    Plus,
    Search,
    Filter,
    Clock,
    MoreVertical,
    ChevronDown,
    User,
    CalendarDays,
    CheckCircle2,
    AlertCircle,
    FileDown,
    Download
} from 'lucide-react';
import { ExportService } from '@/services/exportService';
import { useTenant } from '@/context/TenantContext';

const statusMap = {
    pending: { label: 'Pending', color: 'bg-amber-500/10 text-amber-500' },
    in_progress: { label: 'In Progress', color: 'bg-blue-500/10 text-blue-500' },
    completed: { label: 'Completed', color: 'bg-emerald-500/10 text-emerald-500' },
    canceled: { label: 'Canceled', color: 'bg-red-500/10 text-red-500' }
};

export default function ServiceOrdersPage() {
    const { currentTenant } = useTenant();
    const [filter, setFilter] = useState('all');

    const orders = [
        { id: 'OS-1024', customer: 'ACME Corp', service: 'HVAC Maintenance', technician: 'Carlos Mendes', status: 'in_progress', priority: 'high', date: '2025-12-24' },
        { id: 'OS-1025', customer: 'Private Client: Maria S.', service: 'Electrical Repair', technician: 'Julia Silva', status: 'pending', priority: 'medium', date: '2025-12-24' },
        { id: 'OS-1026', customer: 'Local Market', service: 'Security Cam Install', technician: 'Carlos Mendes', status: 'completed', priority: 'low', date: '2025-12-23' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Service Orders</h2>
                    <p className="text-text-muted mt-2">Create and track field service deployments.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => ExportService.exportOrdersToPDF(orders, currentTenant?.name || 'FieldFlow')}
                        className="flex items-center gap-2 px-4 py-3 glass hover:bg-white/5 rounded-xl font-semibold transition-all"
                    >
                        <FileDown size={18} /> PDF
                    </button>
                    <button
                        onClick={() => ExportService.exportToCSV(orders, `OS-${currentTenant?.name}`)}
                        className="flex items-center gap-2 px-4 py-3 glass hover:bg-white/5 rounded-xl font-semibold transition-all"
                    >
                        <Download size={18} /> CSV
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all">
                        <Plus size={20} />
                        Create New OS
                    </button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="glass p-3 rounded-xl flex items-center gap-3 flex-1">
                    <Search className="text-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search by OS#, client or tech..."
                        className="bg-transparent border-none outline-none w-full p-0 text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </button>
                    <div className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 cursor-pointer">
                        <CalendarDays size={16} /> Today <ChevronDown size={14} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="hidden lg:grid grid-cols-6 px-6 text-xs font-bold text-text-muted uppercase tracking-widest">
                    <div className="col-span-1">ID / Status</div>
                    <div className="col-span-2">Customer / Service</div>
                    <div className="col-span-1">Technician</div>
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {orders.map(order => (
                    <div key={order.id} className="glass p-6 rounded-2xl group hover:border-emerald-500/30 transition-all cursor-pointer">
                        <div className="grid grid-cols-1 lg:grid-cols-6 items-center gap-4">
                            <div className="col-span-1 flex flex-col gap-2">
                                <span className="font-bold text-lg">{order.id}</span>
                                <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusMap[order.status as keyof typeof statusMap].color}`}>
                                    {statusMap[order.status as keyof typeof statusMap].label}
                                </span>
                                {order.priority === 'high' && (
                                    <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold uppercase">
                                        <AlertCircle size={10} /> Priority
                                    </span>
                                )}
                            </div>

                            <div className="col-span-1 lg:col-span-2">
                                <h4 className="font-bold group-hover:text-emerald-400 transition-colors">{order.customer}</h4>
                                <p className="text-sm text-text-muted mt-1">{order.service}</p>
                            </div>

                            <div className="col-span-1 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <User size={14} className="text-text-muted" />
                                </div>
                                <span className="text-sm font-medium">{order.technician}</span>
                            </div>

                            <div className="col-span-1 text-sm text-text-muted flex items-center gap-2">
                                <Clock size={14} />
                                {order.date}
                            </div>

                            <div className="col-span-1 flex justify-end gap-2">
                                <button className="p-2 glass hover:bg-white/10 rounded-lg text-emerald-500 transition-all" title="View PDF">
                                    <CheckCircle2 size={18} />
                                </button>
                                <button className="p-2 glass hover:bg-white/10 rounded-lg text-text-muted transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 flex justify-center">
                <nav className="flex gap-2">
                    <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-emerald-500 font-bold">1</button>
                    <button className="w-10 h-10 glass hover:bg-white/5 rounded-lg flex items-center justify-center font-bold">2</button>
                    <button className="w-10 h-10 glass hover:bg-white/5 rounded-lg flex items-center justify-center font-bold">3</button>
                </nav>
            </div>
        </div>
    );
}
