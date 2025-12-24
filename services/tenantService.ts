import { getMasterClient, TenantConfig } from '../lib/supabase';

/**
 * Service to manage tenant data in the Master database.
 * 
 * Table structure expected in Master Supabase:
 * table name: tenants
 * - id (uuid, primary key)
 * - name (text)
 * - supabase_url (text)
 * - supabase_key (text)
 * - n8n_webhook_url (text, nullable)
 * - openai_key (text, nullable)
 * - is_active (boolean, default true)
 * - created_at (timestamptz)
 */

export class TenantService {
    /**
     * Fetches all active tenants for the Master Dashboard.
     */
    static async getAllTenants(): Promise<TenantConfig[]> {
        const supabase = getMasterClient();
        const { data, error } = await supabase
            .from('tenants')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching tenants:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Fetches a single tenant by ID.
     */
    static async getTenantById(id: string): Promise<TenantConfig | null> {
        const supabase = getMasterClient();
        const { data, error } = await supabase
            .from('tenants')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching tenant ${id}:`, error);
            return null;
        }

        return data;
    }

    /**
     * Registers a new tenant in the platform.
     */
    static async registerTenant(tenant: Omit<TenantConfig, 'id' | 'is_active'>): Promise<TenantConfig> {
        const supabase = getMasterClient();
        const { data, error } = await supabase
            .from('tenants')
            .insert([tenant])
            .select()
            .single();

        if (error) {
            console.error('Error registering tenant:', error);
            throw error;
        }

        return data;
    }
}
