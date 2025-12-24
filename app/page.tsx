import Link from 'next/link';
import { Layers, Zap, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[130px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-emerald-600/10 blur-[130px] rounded-full -z-10"></div>

      <header className="space-y-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
          <Zap size={14} />
          <span>v1.0.0 Alpha</span>
        </div>
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          Field<span className="text-indigo-500">Flow</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          The decentralized Field Service CRM. High performance, mobile-first,
          and your data stays in your Supabase.
        </p>
      </header>

      <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Link
          href="/master"
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-1"
        >
          Master Dashboard
        </Link>
        <button className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold transition-all">
          Client Portal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <FeatureCard
          icon={Shield}
          title="Data Sovereignty"
          description="Each tenant connects to their own Supabase instance. Your data, your rules."
        />
        <FeatureCard
          icon={Smartphone}
          title="Mobile First"
          description="Designed specifically for technicians in the field. One-hand operation optimized."
        />
        <FeatureCard
          icon={Zap}
          title="Automation Ready"
          description="Native n8n webhooks and LLM-powered OCR for instant service reporting."
        />
      </div>

      <footer className="text-sm text-text-muted opacity-50 pt-12">
        &copy; 2025 FieldFlow SaaS. Build for modern field teams.
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="glass p-8 rounded-2xl text-left hover:border-indigo-500/30 transition-colors">
      <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
        <Icon className="text-indigo-500" size={24} />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
