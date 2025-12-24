'use client';

import React, { useEffect, useState } from 'react';
import { Layers, Activity, Server, AlertCircle } from 'lucide-react';
import { TenantService } from '@/services/tenantService';
import { TenantConfig } from '@/lib/supabase';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="glass p-6 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${color}-500/10`}>
                <Icon className={`text-${color}-500`} size={24} />
            </div>
        </div>
        <h3 className="text-text-muted text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
);

export default function MasterDashboard() {
    const [tenants, setTenants] = useState<TenantConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await TenantService.getAllTenants();
                setTenants(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load system data');
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    const activeTenants = tenants.filter(t => t.is_active).length;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
                <p className="text-text-muted mt-2">Monitor system health and tenant activity across the platform.</p>
            </header>

            {error ? (
                <div className="glass bg-red-500/10 border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500">
                    <AlertCircle size={20} />
                    <p>{error}. Ensure Master Supabase environment variables are set.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Tenants"
                        value={loading ? '...' : tenants.length}
                        icon={Layers}
                        color="indigo"
                    />
                    <StatCard
                        title="Active Instances"
                        value={loading ? '...' : activeTenants}
                        icon={Activity}
                        color="emerald"
                    />
                    <StatCard
                        title="Master Health"
                        value="Optimal"
                        icon={Server}
                        color="amber"
                    />
                    <StatCard
                        title="System Version"
                        value="1.0.0-beta"
                        icon={Activity}
                        color="slate"
                    />
                </div>
            )}

            <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6">Recent Tenant Activity</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-text-muted text-sm">
                                <th className="pb-4 font-medium">Tenant Name</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 font-medium">Supabase URL</th>
                                <th className="pb-4 font-medium">Region</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={4} className="py-8 text-center text-text-muted">Loading data...</td></tr>
                            ) : tenants.length === 0 ? (
                                <tr><td colSpan={4} className="py-8 text-center text-text-muted">No tenants registered yet.</td></tr>
                            ) : (
                                tenants.map((tenant) => (
                                    <tr key={tenant.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-medium">{tenant.name}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${tenant.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {tenant.is_active ? 'Active' : 'Suspended'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm text-text-muted font-mono">{tenant.supabase_url.split('.')[0]}...</td>
                                        <td className="py-4 text-sm text-text-muted">US-East-1</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
