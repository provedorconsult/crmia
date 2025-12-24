import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TenantProvider } from "@/context/TenantContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FieldFlow | Modern Field Service SaaS",
  description: "Decentralized data management for field teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="dark">
      <body className={`${inter.className}`}>
        <TenantProvider>
          {children}
        </TenantProvider>
      </body>
    </html>
  );
}
