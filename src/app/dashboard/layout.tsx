"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  Map,
  Database,
  ShieldCheck,
  Trees,
  Menu,
  X,
  Home,
  ChevronRight,
  TrendingUp,
  FolderDot
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Corporate ESG", href: "/dashboard/corporate", icon: Building2, desc: "Sponsorships & Offsets" },
    { name: "NGO Projects", href: "/dashboard/ngo", icon: FolderDot, desc: "Nursery & Budgets" },
    { name: "Farmer Registry", href: "/dashboard/farmers", icon: Users, desc: "Onboarding & Payments" },
    { name: "Geo-Monitoring", href: "/dashboard/monitoring", icon: Map, desc: "Canopy & GPS Health" },
    { name: "Blockchain Ledger", href: "/dashboard/blockchain", icon: Database, desc: "IPFS Proof Auditing" },
    { name: "System Admin", href: "/dashboard/admin", icon: ShieldCheck, desc: "Approval & API Settings" }
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-900">

      {/* Mobile Header Top Bar */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-40 shadow-xs">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
            <Trees className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="font-bold text-base text-slate-900">
            Emer<span className="text-emerald-650">trees</span>
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-650 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Toggle Navigation Sidebar"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-250 lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Sidebar Header (Hidden in Mobile since mobile header is active) */}
        <div className="hidden lg:flex items-center space-x-2 px-6 py-5 border-b border-slate-100">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
              <Trees className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              Emer<span className="text-emerald-600">trees</span>
            </span>
          </Link>
        </div>

        {/* Tenant Profile Banner */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Active Workspace</span>
          <span className="font-bold text-xs text-slate-800 block truncate mt-0.5">TCS ESG Audit Portal</span>
          <span className="text-[10px] text-slate-500 font-mono">TATA Group Corp Node</span>
        </div>

        {/* Navigation Sidebar Link list */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.id || link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center p-3 rounded-xl border text-left transition-all ${isActive(link.href)
                  ? "bg-emerald-550/10 text-emerald-900 border-emerald-200 font-semibold"
                  : "bg-transparent border-transparent text-slate-650 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <LinkIcon className={`h-5 w-5 mr-3 shrink-0 ${isActive(link.href) ? "text-emerald-650" : "text-slate-450"
                  }`} />
                <div className="truncate">
                  <span className="text-xs sm:text-sm block leading-tight">{link.name}</span>
                  <span className="text-[9px] text-slate-400 font-normal leading-normal">{link.desc}</span>
                </div>
                {isActive(link.href) && <ChevronRight className="ml-auto h-4 w-4 text-emerald-600" />}
              </Link>
            );
          })}
        </nav>

        {/* Back to main site trigger */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Top Header Bar */}
        <div className="hidden lg:flex justify-between items-center pb-6 border-b border-slate-200 mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-slate-950">Compliance Operations Center</h1>
            <p className="text-xs text-slate-500">Real-time ecological impact reporting and double-counting checks</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="font-bold text-xs text-slate-850 block">Rajesh Mehta</span>
              <span className="text-[10px] text-slate-500">CSR Compliance Director</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-250">
              RM
            </div>
          </div>
        </div>

        {/* Dynamic page content */}
        <div className="animate-in fade-in duration-300">
          {children}
        </div>
      </main>

    </div>
  );
}
