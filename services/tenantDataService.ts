import { createTenantClient } from '../lib/supabase';

export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: string;
}

export interface ServiceItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    type: 'product' | 'service';
}

export class TenantDataService {
    private supabase;

    constructor(url: string, key: string) {
        this.supabase = createTenantClient(url, key);
    }

    // --- Customer Management ---
    async getCustomers() {
        const { data, error } = await this.supabase
            .from('customers')
            .select('*')
            .order('name');
        if (error) throw error;
        return data as Customer[];
    }

    async addCustomer(customer: Omit<Customer, 'id' | 'created_at'>) {
        const { data, error } = await this.supabase
            .from('customers')
            .insert([customer])
            .select()
            .single();
        if (error) throw error;
        return data as Customer;
    }

    // --- Catalog Management ---
    async getCatalog() {
        const { data, error } = await this.supabase
            .from('catalog')
            .select('*')
            .order('name');
        if (error) throw error;
        return data as ServiceItem[];
    }

    async addCatalogItem(item: Omit<ServiceItem, 'id'>) {
        const { data, error } = await this.supabase
            .from('catalog')
            .insert([item])
            .select()
            .single();
        if (error) throw error;
        return data as ServiceItem;
    }
}
