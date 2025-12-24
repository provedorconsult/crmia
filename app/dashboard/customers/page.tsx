'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    Plus,
    Search,
    Mail,
    Phone,
    MapPin,
    MoreVertical,
    UserPlus
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';
import { Customer } from '@/services/tenantDataService';

export default function CustomersPage() {
    const { tenantData } = useTenant();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const loadCustomers = async () => {
        if (!tenantData) return;
        try {
            const data = await tenantData.getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, [tenantData]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantData) return;
        try {
            await tenantData.addCustomer(newCustomer);
            setIsModalOpen(false);
            setNewCustomer({ name: '', email: '', phone: '', address: '' });
            loadCustomers();
        } catch (error) {
            alert('Error adding customer. Ensure the "customers" table exists in this tenant instance.');
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                    <p className="text-text-muted mt-2">Manage your client database and contact information.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all"
                >
                    <Plus size={20} />
                    Add Customer
                </button>
            </header>

            <div className="glass p-4 rounded-xl flex items-center gap-3">
                <Search className="text-text-muted" size={20} />
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="bg-transparent border-none outline-none w-full p-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-text-muted">Loading customer records...</div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass rounded-2xl">
                        <UserPlus className="mx-auto text-emerald-500 mb-4 opacity-20" size={64} />
                        <p className="text-xl font-medium">No results found</p>
                        <p className="text-text-muted mt-1">Try a different search or add a new customer.</p>
                    </div>
                ) : (
                    filteredCustomers.map(customer => (
                        <div key={customer.id} className="glass p-6 rounded-2xl group hover:border-emerald-500/30 transition-all relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center font-bold text-emerald-500 text-lg">
                                    {customer.name.charAt(0)}
                                </div>
                                <button className="text-text-muted hover:text-white p-1 rounded-lg">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold truncate">{customer.name}</h3>

                            <div className="mt-4 space-y-2">
                                {customer.email && (
                                    <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <Mail size={14} className="shrink-0" />
                                        <span className="truncate">{customer.email}</span>
                                    </div>
                                )}
                                {customer.phone && (
                                    <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <Phone size={14} className="shrink-0" />
                                        <span>{customer.phone}</span>
                                    </div>
                                )}
                                {customer.address && (
                                    <div className="flex items-center gap-2 text-sm text-text-muted">
                                        <MapPin size={14} className="shrink-0" />
                                        <span className="truncate">{customer.address}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                                <button className="flex-1 py-2 text-xs font-semibold glass hover:bg-white/10 rounded-lg transition-all">
                                    History
                                </button>
                                <button className="flex-1 py-2 text-xs font-semibold bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 rounded-lg transition-all">
                                    Create OS
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
                        <h3 className="text-2xl font-bold mb-6">Add New Customer</h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full"
                                    placeholder="John Doe"
                                    value={newCustomer.name}
                                    onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full"
                                        placeholder="john@example.com"
                                        value={newCustomer.email}
                                        onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full"
                                        placeholder="+55 11 9..."
                                        value={newCustomer.phone}
                                        onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full"
                                    placeholder="Street, Number, Neighborhood"
                                    value={newCustomer.address}
                                    onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
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
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all"
                                >
                                    Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
