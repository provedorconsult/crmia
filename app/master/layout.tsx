import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function MasterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 relative overflow-hidden">
                {/* Background Decorative Blob */}
                <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
                <div className="fixed bottom-[-5%] left-[20%] w-[30%] h-[30%] bg-emerald-600/5 blur-[120px] rounded-full -z-10"></div>

                {children}
            </main>

            <style jsx global>{`
        main {
          background-attachment: fixed;
        }
      `}</style>
        </div>
    );
}
