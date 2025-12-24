'use client';

import { useTenant } from '@/context/TenantContext';

export interface NotificationTemplate {
    id: string;
    name: string;
    channel: 'whatsapp' | 'telegram' | 'email';
    content: string; // e.g. "Hello {{customer_name}}, técnico {{tech_name}} is in route."
}

export class NotificationService {
    /**
     * Sends a notification using a webhook (n8n standard).
     * Templates are parsed with dynamic variables.
     */
    static async sendNotification(
        webhookUrl: string,
        template: string,
        variables: Record<string, string>
    ) {
        if (!webhookUrl) {
            console.warn('Webhook URL not configured for this tenant.');
            return false;
        }

        let parsedContent = template;
        Object.entries(variables).forEach(([key, value]) => {
            parsedContent = parsedContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: parsedContent,
                    timestamp: new Date().toISOString(),
                    ...variables
                })
            });
            return response.ok;
        } catch (error) {
            console.error('Failed to send notification:', error);
            return false;
        }
    }
}
