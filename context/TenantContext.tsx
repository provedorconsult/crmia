'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TenantConfig } from '@/lib/supabase';
import { TenantService } from '@/services/tenantService';
import { TenantDataService } from '@/services/tenantDataService';

interface TenantContextType {
    currentTenant: TenantConfig | null;
    tenantData: TenantDataService | null;
    loading: boolean;
    switchTenant: (id: string) => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [currentTenant, setCurrentTenant] = useState<TenantConfig | null>(null);
    const [tenantData, setTenantData] = useState<TenantDataService | null>(null);
    const [loading, setLoading] = useState(false);

    // For demo/dev purposes, we can try to load a default tenant or from local storage
    useEffect(() => {
        const savedTenantId = localStorage.getItem('active_tenant_id');
        if (savedTenantId) {
            switchTenant(savedTenantId);
        }
    }, []);

    const switchTenant = async (id: string) => {
        setLoading(true);
        try {
            const tenant = await TenantService.getTenantById(id);
            if (tenant) {
                setCurrentTenant(tenant);
                setTenantData(new TenantDataService(tenant.supabase_url, tenant.supabase_key));
                localStorage.setItem('active_tenant_id', id);
            }
        } catch (error) {
            console.error('Error switching tenant:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TenantContext.Provider value={{ currentTenant, tenantData, loading, switchTenant }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}
