'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Send,
    Zap,
    Smartphone,
    Settings,
    Save,
    CheckCircle2,
    Bell
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';

export default function NotificationsPage() {
    const { currentTenant } = useTenant();
    const [selectedTemplate, setSelectedTemplate] = useState('route');

    const templates = {
        route: "Olá {{customer_name}}, o técnico {{tech_name}} já está a caminho do seu endereço: {{address}}. Previsão de chegada em 20 min.",
        finished: "Obrigado {{customer_name}}! O serviço #{{os_id}} foi concluído com sucesso. O certificado de execução foi gerado e está disponível no seu portal.",
        welcome: "Bem-vindo à {{company_name}}! Estamos felizes em tê-lo conosco. Acesse seu painel em {{portal_link}}."
    };

    const [content, setContent] = useState(templates.route);

    const saveTemplate = () => {
        alert('Template salvo com sucesso para esta instância!');
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h2 className="text-3xl font-bold tracking-tight">Comunicação Automation</h2>
                <p className="text-text-muted mt-2">Configure templates de WhatsApp e Telegram vinculados ao n8n.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Template Selector */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted px-2">Gatilhos do Sistema</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => { setSelectedTemplate('route'); setContent(templates.route); }}
                            className={`w-full p-4 rounded-2xl border flex items-center gap-3 transition-all ${selectedTemplate === 'route' ? 'glass border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:bg-white/5'}`}
                        >
                            <div className={`p-2 rounded-lg ${selectedTemplate === 'route' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-text-muted'}`}>
                                <Smartphone size={18} />
                            </div>
                            <div className="text-left">
                                <p className={`font-bold text-sm ${selectedTemplate === 'route' ? 'text-white' : 'text-text-muted'}`}>Início de Rota</p>
                                <p className="text-[10px] opacity-50">Disparado via Mobile</p>
                            </div>
                        </button>
                        <button
                            onClick={() => { setSelectedTemplate('finished'); setContent(templates.finished); }}
                            className={`w-full p-4 rounded-2xl border flex items-center gap-3 transition-all ${selectedTemplate === 'finished' ? 'glass border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:bg-white/5'}`}
                        >
                            <div className={`p-2 rounded-lg ${selectedTemplate === 'finished' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-text-muted'}`}>
                                <CheckCircle2 size={18} />
                            </div>
                            <div className="text-left">
                                <p className={`font-bold text-sm ${selectedTemplate === 'finished' ? 'text-white' : 'text-text-muted'}`}>Serviço Concluído</p>
                                <p className="text-[10px] opacity-50">Gerador de PDF</p>
                            </div>
                        </button>
                    </div>

                    <div className="glass p-6 rounded-3xl mt-8">
                        <div className="flex items-center gap-2 text-amber-500 mb-4">
                            <Zap size={18} />
                            <h4 className="font-bold text-sm">Status da Integração</h4>
                        </div>
                        <div className="flex justify-between items-center text-xs mb-3">
                            <span className="text-text-muted">Webhook n8n:</span>
                            <span className="text-emerald-500 font-bold uppercase">Conectado</span>
                        </div>
                        <div className="text-[10px] text-text-muted leading-relaxed">
                            Dica: Use as tags <span className="text-indigo-400">{"{{customer_name}}"}</span> e <span className="text-indigo-400">{"{{tech_name}}"}</span> no seu texto para personalização dinâmica.
                        </div>
                    </div>
                </div>

                {/* Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                    <MessageSquare className="text-indigo-500" size={20} />
                                </div>
                                <h3 className="text-xl font-bold">Editor de Mensagem</h3>
                            </div>
                            <button
                                onClick={saveTemplate}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold active:scale-95 transition-all"
                            >
                                <Save size={16} /> Salvar Alterações
                            </button>
                        </div>

                        <textarea
                            className="w-full h-48 bg-slate-950/50 border border-white/5 rounded-2xl p-6 text-sm leading-relaxed focus:outline-none focus:border-indigo-500/50 transition-all font-mono"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="mt-6 flex flex-wrap gap-2">
                            {['customer_name', 'tech_name', 'address', 'os_id', 'company_name'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setContent(prev => prev + ` {{${tag}}}`)}
                                    className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-text-muted hover:bg-white/10 transition-all hover:text-white"
                                >
                                    + {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted px-2">Visualização Mobile</h3>
                        <div className="max-w-md mx-auto relative p-6 bg-slate-950 rounded-[40px] border-[8px] border-slate-900 shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl"></div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl mt-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <Send size={12} className="text-slate-900" />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">FieldFlow Bot</span>
                                </div>
                                <p className="text-xs leading-relaxed text-emerald-100">
                                    {content
                                        .replace(/{{customer_name}}/g, 'João Silva')
                                        .replace(/{{tech_name}}/g, 'Carlos Mendes')
                                        .replace(/{{address}}/g, 'Rua Augusta, 500')
                                        .replace(/{{os_id}}/g, '1024')
                                        .replace(/{{company_name}}/g, currentTenant?.name || 'FieldFlow')
                                    }
                                </p>
                                <span className="text-[8px] opacity-30 mt-2 block text-right">14:32</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
