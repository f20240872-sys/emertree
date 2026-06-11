"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Key, 
  Check, 
  Copy, 
  Plus, 
  Building2, 
  UserCheck, 
  AlertCircle,
  Database
} from "lucide-react";

interface APIKeyRecord {
  id: string;
  name: string;
  token: string;
  scope: "Write (All)" | "Read (Public)" | "Write (Donations)";
  created: string;
}

const initialKeys: APIKeyRecord[] = [
  { id: "key_1", name: "Corporate ESG Webhook", token: "em_live_tcs_99827...", scope: "Write (Donations)", created: "2026-06-01" },
  { id: "key_2", name: "NGO Field App Sync", token: "em_ngo_wg_8709a...", scope: "Write (All)", created: "2026-06-03" }
];

export default function AdminDashboard() {
  const [keys, setKeys] = useState<APIKeyRecord[]>(initialKeys);
  const [keyName, setKeyName] = useState("");
  const [keyScope, setKeyScope] = useState<"Write (All)" | "Read (Public)" | "Write (Donations)">("Write (Donations)");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;

    const newKey: APIKeyRecord = {
      id: `key_${keys.length + 1}`,
      name: keyName,
      token: `em_live_${keyName.toLowerCase().replace(/\s+/g, "_")}_${Math.floor(Math.random() * 9000 + 1000)}...`,
      scope: keyScope,
      created: new Date().toISOString().split("T")[0]
    };
    setKeys([...keys, newKey]);
    setKeyName("");
  };

  const handleCopy = (token: string, idx: number) => {
    navigator.clipboard.writeText(token);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-950">System Administration</h2>
        <p className="text-xs text-slate-500">Configure developer access tokens, manage credentials, and audit security layers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: API Key generator */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-205 shadow-xxs space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <Key className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-sm">Developer Access Tokens</h3>
            </div>

            <form onSubmit={handleGenerateKey} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-650 block uppercase">Key Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSR Payout Sync"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-655 block uppercase">Key Scope</label>
                <select
                  value={keyScope}
                  onChange={(e) => setKeyScope(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-350 bg-white rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 font-semibold text-slate-700"
                >
                  <option value="Write (Donations)">Write (Donations)</option>
                  <option value="Write (All)">Write (All)</option>
                  <option value="Read (Public)">Read (Public)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Generate Key
              </button>
            </form>

            <div className="border-t border-slate-150 pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                      <th className="p-3">Key Name</th>
                      <th className="p-3">Access Token</th>
                      <th className="p-3">Scope</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {keys.map((key, idx) => (
                      <tr key={key.id}>
                        <td className="p-3 font-semibold text-slate-905">{key.name}</td>
                        <td className="p-3 font-mono text-slate-500">{key.token}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-medium">
                            {key.scope}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{key.created}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleCopy(key.token, idx)}
                            className="text-slate-400 hover:text-slate-900 flex items-center space-x-0.5"
                          >
                            {copiedIndex === idx ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: System Audits / Pending approvals */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <UserCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-sm">NGO Verification Pipeline</h3>
            </div>

            <p className="text-xs text-slate-605 leading-relaxed">
              Verify legal audit credentials of regional NGOs applying to execute local afforestation projects:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Himalaya Green Guild</span>
                  <span className="text-[10px] text-slate-500">FCRA compliant • Sec 8 Registered</span>
                </div>
                <button className="px-2.5 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-[10px] font-bold">
                  Approve Partner
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Kelp Coastal Alliance</span>
                  <span className="text-[10px] text-slate-500">SEBI ESG accredited • Maharashtra Coast</span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md text-[10px] font-bold border border-emerald-100">
                  <Check className="h-3.5 w-3.5" />
                  <span>Approved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <Database className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-sm">System Health State</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-155">
                <span className="text-slate-500 text-[9px] uppercase block">Blockchain Node Status</span>
                <span className="text-emerald-700 block mt-0.5 font-bold">12 Active Nodes Sync</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-155">
                <span className="text-slate-500 text-[9px] uppercase block">Audit Ledger Sync</span>
                <span className="text-emerald-700 block mt-0.5 font-bold">100% Up to Date</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
