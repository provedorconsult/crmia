'use client';

import React, { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Plus,
    Search,
    Tag,
    Box,
    Zap,
    MoreVertical,
    Layers
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';
import { ServiceItem } from '@/services/tenantDataService';

export default function CatalogPage() {
    const { tenantData } = useTenant();
    const [catalog, setCatalog] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: 0,
        type: 'service' as 'product' | 'service'
    });

    const loadCatalog = async () => {
        if (!tenantData) return;
        try {
            const data = await tenantData.getCatalog();
            setCatalog(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCatalog();
    }, [tenantData]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantData) return;
        try {
            await tenantData.addCatalogItem(newItem);
            setIsModalOpen(false);
            setNewItem({ name: '', description: '', price: 0, type: 'service' });
            loadCatalog();
        } catch (error) {
            alert('Error adding item. Ensure the "catalog" table exists.');
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Catalog</h2>
                    <p className="text-text-muted mt-2">Manage products and services offered by your company.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/20 transition-all"
                >
                    <Plus size={20} />
                    Add Item
                </button>
            </header>

            <div className="glass p-4 rounded-xl flex items-center gap-3">
                <Search className="text-text-muted" size={20} />
                <input
                    type="text"
                    placeholder="Search components or services..."
                    className="bg-transparent border-none outline-none w-full p-0"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-text-muted">Loading catalog...</div>
                ) : catalog.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass rounded-2xl">
                        <ShoppingBag className="mx-auto text-teal-500 mb-4 opacity-20" size={64} />
                        <p className="text-xl font-medium">Catalog is empty</p>
                        <p className="text-text-muted mt-1">Populate your catalog to speed up OS creation.</p>
                    </div>
                ) : (
                    catalog.map(item => (
                        <div key={item.id} className="glass p-6 rounded-2xl group hover:border-teal-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${item.type === 'service' ? 'bg-teal-500/10' : 'bg-amber-500/10'}`}>
                                    {item.type === 'service' ? <Zap className="text-teal-500" size={20} /> : <Box className="text-amber-500" size={20} />}
                                </div>
                                <div className="text-xl font-bold">
                                    ${item.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === 'service' ? 'bg-teal-500/20 text-teal-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {item.type}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="text-sm text-text-muted mt-2 line-clamp-2 min-h-[40px]">{item.description || 'No description provided.'}</p>

                            <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                                <button className="flex-1 py-2 text-xs font-semibold glass hover:bg-white/10 rounded-lg transition-all">
                                    Edit
                                </button>
                                <button className="p-2 glass hover:bg-white/10 rounded-lg transition-all">
                                    <MoreVertical size={16} className="text-text-muted" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="glass p-8 rounded-3xl w-full max-w-lg relative animate-fade-in">
                        <h3 className="text-2xl font-bold mb-6">Add to Catalog</h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Item Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full"
                                    placeholder="Ex: Technical Maintenance"
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
                                <textarea
                                    className="w-full h-24"
                                    placeholder="Details about the service or product..."
                                    value={newItem.description}
                                    onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Type</label>
                                    <select
                                        className="w-full"
                                        value={newItem.type}
                                        onChange={e => setNewItem({ ...newItem, type: e.target.value as any })}
                                    >
                                        <option value="service" className='bg-slate-900'>Service</option>
                                        <option value="product" className='bg-slate-900'>Product</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Standard Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full pl-8"
                                            placeholder="0.00"
                                            value={newItem.price}
                                            onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                                        />
                                    </div>
                                </div>
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
                                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow-lg shadow-teal-500/25 transition-all"
                                >
                                    Create Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
