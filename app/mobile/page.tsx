'use client';

import React, { useState } from 'react';
import {
    Clock,
    MapPin,
    ChevronRight,
    Play,
    CheckCircle2,
    Truck,
    FileText,
    Camera,
    AlertTriangle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function TechnicianMobileDashboard() {
    const [currentStatus, setCurrentStatus] = useState<'idle' | 'in_route' | 'servicing'>('idle');
    const [activeJob, setActiveJob] = useState<any>(null);

    const jobs = [
        { id: '1024', customer: 'ACME Corp', address: 'Av. Paulista, 1000', service: 'Manutenção Mensal', priority: 'high' },
        { id: '1025', customer: 'Mercado Silva', address: 'Rua das Flores, 45', service: 'Reparo Elétrico', priority: 'medium' },
    ];

    const handleStatusChange = (status: any) => {
        setCurrentStatus(status);
    };

    const generatePDF = (job: any) => {
        const doc = new jsPDF() as any;

        // Header
        doc.setFontSize(22);
        doc.setTextColor(99, 102, 241);
        doc.text('FieldFlow', 20, 20);
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('Certificado de Execução de Serviço', 20, 30);

        // Job Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Ordem de Serviço: #${job.id}`, 20, 50);
        doc.text(`Cliente: ${job.customer}`, 20, 60);
        doc.text(`Endereço: ${job.address}`, 20, 70);
        doc.text(`Técnico: João Silva`, 20, 80);
        doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 90);

        // Table
        doc.autoTable({
            startY: 100,
            head: [['Serviço Realizado', 'Status', 'Observações']],
            body: [
                [job.service, 'Concluído', 'Equipamento testado e operando normalmente.'],
            ],
            headStyles: { fillStyle: [99, 102, 241] }
        });

        // Signature Placeholder
        doc.text('__________________________', 20, 160);
        doc.text('Assinatura do Cliente', 20, 165);

        doc.save(`OS-${job.id}-FieldFlow.pdf`);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Current Status Control */}
            <section className="glass p-6 rounded-3xl border-emerald-500/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 text-center">Status Atual</h3>

                <div className="flex justify-between items-center gap-2">
                    <StatusButton
                        active={currentStatus === 'in_route'}
                        onClick={() => handleStatusChange('in_route')}
                        icon={Truck}
                        label="Em Rota"
                        color="indigo"
                    />
                    <StatusButton
                        active={currentStatus === 'servicing'}
                        onClick={() => handleStatusChange('servicing')}
                        icon={Play}
                        label="Servindo"
                        color="emerald"
                    />
                    <StatusButton
                        active={currentStatus === 'idle'}
                        onClick={() => handleStatusChange('idle')}
                        icon={Clock}
                        label="Pausa"
                        color="slate"
                    />
                </div>
            </section>

            {/* Active Work (If any) */}
            {currentStatus !== 'idle' && (
                <section className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-500/30 animate-pulse-slow">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Serviço em curso</span>
                        <MapPin size={18} className="text-white/50" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">ACME Corporation</h2>
                    <p className="text-white/80 text-sm mt-1">Av. Paulista, 1000 - Bela Vista</p>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => generatePDF({ id: '1024', customer: 'ACME Corp', address: 'Av. Paulista, 1000', service: 'Manutenção Mensal' })}
                            className="flex-1 bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                        >
                            <CheckCircle2 size={18} /> Finalizar
                        </button>
                        <button className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center">
                            <Camera size={20} />
                        </button>
                    </div>
                </section>
            )}

            {/* Daily Agenda */}
            <section>
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="font-bold text-lg">Agenda do Dia</h3>
                    <span className="text-xs text-text-muted font-medium">2 ordens pendentes</span>
                </div>

                <div className="space-y-3">
                    {jobs.map(job => (
                        <div key={job.id} className="glass p-5 rounded-2xl flex items-center justify-between group active:scale-95 transition-all">
                            <div className="flex gap-4 items-center">
                                <div className={`w-2 h-12 rounded-full ${job.priority === 'high' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                                <div>
                                    <h4 className="font-bold text-sm">{job.customer}</h4>
                                    <p className="text-xs text-text-muted mt-1">{job.service}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-text-muted mt-2">
                                        <MapPin size={10} />
                                        <span>{job.address.split(',')[0]}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-slate-700" />
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Assistant Hook (Placeholder) */}
            <section className="glass p-5 rounded-3xl border-indigo-500/10 bg-indigo-500/5">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M12 2a10 10 0 1 0 10 10H12V2Z" /><path d="M12 12 2.1 12.3" /><path d="M12 12c.4 5.2 2.5 9.1 5.4 10.3" /><path d="m14 2 2 4M20 12l-4 4" /></svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold">Assistente de Relatórios</h4>
                        <p className="text-xs text-text-muted mt-1">Gere descritivos técnicos instantâneos usando IA.</p>
                        <button className="mt-3 text-indigo-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            Testar Agora <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StatusButton({ icon: Icon, label, active, color, onClick }: any) {
    const colorClasses: any = {
        indigo: active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900 text-slate-500',
        emerald: active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-500',
        slate: active ? 'bg-slate-700 text-white shadow-lg' : 'bg-slate-900 text-slate-500'
    };

    return (
        <button
            onClick={onClick}
            className={`flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all ${colorClasses[color]}`}
        >
            <Icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}
