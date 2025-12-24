'use client';

import React, { useState } from 'react';
import { Camera, RefreshCcw, CheckCircle2, FileSearch, Zap, AlertCircle } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { useTenant } from '@/context/TenantContext';

export default function MobileScanPage() {
    const { currentTenant } = useTenant();
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const startScan = async () => {
        setIsScanning(true);
        setResult(null);
        setFeedback('Analisando documento via IA...');

        try {
            // simulate capturing a real document
            const data = await AIService.processOCRDocument('mock-b64', currentTenant?.openai_key || 'fake-key');
            setResult(data);
            setFeedback('Extração concluída com sucesso.');
        } catch (error) {
            setFeedback('Falha na extração. Verifique sua chave de API.');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header>
                <h2 className="text-2xl font-bold">Scanner IA</h2>
                <p className="text-sm text-text-muted mt-1">Aponte a câmera para o documento técnico para extração automática.</p>
            </header>

            {/* Mock Camera Viewfinder */}
            <div className="relative aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                {isScanning ? (
                    <div className="flex flex-col items-center gap-4">
                        <RefreshCcw className="animate-spin text-emerald-500" size={48} />
                        <div className="h-1 bg-emerald-500/20 w-48 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 animate-[progress_1.5s_infinite]"></div>
                        </div>
                    </div>
                ) : result ? (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-emerald-500/5">
                        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
                        <p className="text-lg font-bold">Documento Processado</p>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 border-[60px] border-slate-950/80"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12">
                            <Camera size={64} className="text-white/20" />
                        </div>
                        {/* Corners */}
                        <div className="absolute top-16 left-16 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                        <div className="absolute top-16 right-16 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                        <div className="absolute bottom-16 left-16 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                        <div className="absolute bottom-16 right-16 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
                    </>
                )}
            </div>

            {feedback && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider ${result ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-900 text-text-muted'}`}>
                    <Zap size={14} />
                    {feedback}
                </div>
            )}

            {result && (
                <section className="glass p-6 rounded-3xl space-y-4 animate-fade-in">
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase">Cliente Identificado</label>
                        <p className="font-bold text-lg">{result.customer_name}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase">Serviço Solicitado</label>
                        <p className="text-sm font-medium">{result.service_required}</p>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20">Criar OS Auto</button>
                        <button onClick={() => setResult(null)} className="px-4 py-3 glass rounded-xl"><RefreshCcw size={18} /></button>
                    </div>
                </section>
            )}

            {!result && !isScanning && (
                <button
                    onClick={startScan}
                    className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                    <Camera size={24} /> Escanear Agora
                </button>
            )}

            <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
