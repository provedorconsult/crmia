import { createClient } from '@supabase/supabase-js';

export interface TenantConfig {
  id: string;
  name: string;
  supabase_url: string;
  supabase_key: string;
  n8n_webhook_url?: string;
  openai_key?: string;
  is_active: boolean;
}

/**
 * Creates a Supabase client for a specific tenant.
 * @param url The tenant's Supabase URL
 * @param key The tenant's Supabase Anon/Public Key
 */
export const createTenantClient = (url: string, key: string) => {
  return createClient(url, key);
};

/**
 * Master client for system-wide operations (Managing tenants) in the primary Supabase instance.
 */
export const getMasterClient = () => {
  const url = process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Master Supabase credentials are not configured in environment variables.');
  }

  return createClient(url, key);
};

/**
 * Admin client for sensitive master platform operations using the service role key.
 * Only to be used in Server Components or API Routes.
 */
export const getMasterAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_MASTER_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Master Supabase admin credentials are not configured.');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
