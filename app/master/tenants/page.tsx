'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Layers, ExternalLink, MoreVertical, ShieldCheck, Database, Zap } from 'lucide-react';
import { TenantService } from '@/services/tenantService';
import { TenantConfig } from '@/lib/supabase';

export default function TenantsPage() {
    const [tenants, setTenants] = useState<TenantConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTenant, setNewTenant] = useState({
        name: '',
        supabase_url: '',
        supabase_key: '',
        n8n_webhook_url: '',
        openai_key: ''
    });

    const loadTenants = async () => {
        try {
            const data = await TenantService.getAllTenants();
            setTenants(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTenants();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await TenantService.registerTenant(newTenant);
            setIsModalOpen(false);
            setNewTenant({ name: '', supabase_url: '', supabase_key: '', n8n_webhook_url: '', openai_key: '' });
            loadTenants();
        } catch (error) {
            alert('Error registering tenant. Check console.');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tenants</h2>
                    <p className="text-text-muted mt-2">Manage client instances and their decentralized connections.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all"
                >
                    <Plus size={20} />
                    Register New Tenant
                </button>
            </header>

            <div className="glass p-4 rounded-xl flex items-center gap-3">
                <Search className="text-text-muted" size={20} />
                <input
                    type="text"
                    placeholder="Search by name or URL..."
                    className="bg-transparent border-none outline-none w-full p-0"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-text-muted">Loading tenants...</div>
                ) : tenants.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass rounded-2xl">
                        <Layers className="mx-auto text-indigo-500 mb-4 opacity-20" size={64} />
                        <p className="text-xl font-medium">No tenants registered</p>
                        <p className="text-text-muted mt-1">Start by adding your first client instance.</p>
                    </div>
                ) : (
                    tenants.map(tenant => (
                        <div key={tenant.id} className="glass p-6 rounded-2xl group hover:border-indigo-500/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                        <Database className="text-indigo-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{tenant.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                                            <span className={`w-2 h-2 rounded-full ${tenant.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                            {tenant.is_active ? 'Connected' : 'Disconnected'}
                                        </div>
                                    </div>
                                </div>
                                <button className="text-text-muted hover:text-white p-2 rounded-lg hover:bg-white/5">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <ShieldCheck size={16} />
                                        <span>Supabase Public Key</span>
                                    </div>
                                    <span className="font-mono text-xs opacity-50">••••••••••••••••</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2 text-text-muted">
                                        <ExternalLink size={16} />
                                        <span>Instance URL</span>
                                    </div>
                                    <span className="font-mono text-xs text-indigo-400">{tenant.supabase_url.replace('https://', '')}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                                <button className="flex-1 py-2 glass hover:bg-white/10 rounded-lg text-sm font-medium transition-all">
                                    Settings
                                </button>
                                <button className="flex-1 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg text-sm font-medium transition-all">
                                    Open Console
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Register Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="glass p-8 rounded-3xl w-full max-w-lg relative animate-fade-in">
                        <h3 className="text-2xl font-bold mb-6">Register New Tenant</h3>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Company Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full"
                                    placeholder="Ex: ACME Field Services"
                                    value={newTenant.name}
                                    onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Supabase URL</label>
                                    <input
                                        required
                                        type="url"
                                        className="w-full"
                                        placeholder="https://xyz.supabase.co"
                                        value={newTenant.supabase_url}
                                        onChange={e => setNewTenant({ ...newTenant, supabase_url: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Anon/Public Key</label>
                                    <input
                                        required
                                        type="password"
                                        className="w-full"
                                        placeholder="eyJhbG..."
                                        value={newTenant.supabase_key}
                                        onChange={e => setNewTenant({ ...newTenant, supabase_key: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1 flex items-center gap-2">
                                    <Zap size={14} className="text-amber-500" />
                                    n8n Webhook URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    className="w-full"
                                    placeholder="https://n8n.yourdom.com/..."
                                    value={newTenant.n8n_webhook_url}
                                    onChange={e => setNewTenant({ ...newTenant, n8n_webhook_url: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-indigo-400" />
                                    OpenAI API Key (Optional)
                                </label>
                                <input
                                    type="password"
                                    className="w-full"
                                    placeholder="sk-..."
                                    value={newTenant.openai_key}
                                    onChange={e => setNewTenant({ ...newTenant, openai_key: e.target.value })}
                                />
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 glass hover:bg-white/10 rounded-xl font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all"
                                >
                                    Register Instance
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
