"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  UserPlus, 
  Coins, 
  MapPin, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle
} from "lucide-react";

interface FarmerRecord {
  id: string;
  name: string;
  location: string;
  landSize: string;
  targetTrees: number;
  payoutAmount: string;
  dbtStatus: "Paid" | "Pending" | "Escrow Locked";
  txHash: string;
}

const initialFarmers: FarmerRecord[] = [
  {
    id: "farm_1",
    name: "Rajesh Gowda",
    location: "Chikmagalur, Karnataka",
    landSize: "3.2 Acres",
    targetTrees: 1250,
    payoutAmount: "₹1,50,000",
    dbtStatus: "Paid",
    txHash: "0xf882a...19ba"
  },
  {
    id: "farm_2",
    name: "Devendra Patil",
    location: "Gurugram, Haryana",
    landSize: "2.4 Acres",
    targetTrees: 800,
    payoutAmount: "₹96,000",
    dbtStatus: "Escrow Locked",
    txHash: "0x39a1c...ff42"
  },
  {
    id: "farm_3",
    name: "Sujatha Sen",
    location: "Sundarbans Delta, WB",
    landSize: "1.8 Acres",
    targetTrees: 600,
    payoutAmount: "₹72,000",
    dbtStatus: "Paid",
    txHash: "0xcc29b...3a88"
  }
];

export default function FarmersDashboard() {
  const [farmers, setFarmers] = useState<FarmerRecord[]>(initialFarmers);
  const [showOnboardForm, setShowOnboardForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Chikmagalur, Karnataka");
  const [landSize, setLandSize] = useState("2.5 Acres");
  const [aadhaar, setAadhaar] = useState("");
  const [targetTrees, setTargetTrees] = useState("500");

  const handleOnboardFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !aadhaar) return;

    setLoading(true);
    setTimeout(() => {
      const newFarmer: FarmerRecord = {
        id: `farm_${farmers.length + 1}`,
        name: name,
        location: location,
        landSize: landSize,
        targetTrees: parseInt(targetTrees) || 0,
        payoutAmount: `₹${((parseInt(targetTrees) || 0) * 120).toLocaleString("en-IN")}`,
        dbtStatus: "Escrow Locked",
        txHash: `0x${Math.floor(Math.random() * 9000000 + 1000000).toString(16)}...mock`
      };
      setFarmers([newFarmer, ...farmers]);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowOnboardForm(false);
        setName("");
        setAadhaar("");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">Farmer Registry & Onboarding</h2>
          <p className="text-xs text-slate-500">Onboard marginal farmers, audit land files, and verify Direct Benefit Transfers (DBT)</p>
        </div>
        <button
          onClick={() => setShowOnboardForm(!showOnboardForm)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
        >
          <UserPlus className="h-4 w-4 mr-1.5" />
          Onboard New Farmer
        </button>
      </div>

      {/* Onboarding Form */}
      {showOnboardForm && (
        <div className="bg-white p-6 rounded-2xl border border-slate-205 shadow-md">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Farmer Onboarded successfully</h4>
                <p className="text-xs text-slate-550 mt-1">Aadhaar verification synced and escrow funds locked for target plantings.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOnboardFarmer} className="space-y-4 max-w-xl">
              <h3 className="font-bold text-slate-900 text-sm">Farmer Profile & Aadhaar Verify</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Aadhaar Number (UIDAI)</label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    placeholder="12-digit biometric code"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Plot Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-lg text-xs focus:ring-2"
                  >
                    <option value="Chikmagalur, Karnataka">Chikmagalur, KA</option>
                    <option value="Gurugram, Haryana">Gurugram, HR</option>
                    <option value="Sundarbans Delta, WB">Sundarbans, WB</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Cultivable Acres</label>
                  <input
                    type="text"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Target Tree Allocation</label>
                  <input
                    type="number"
                    min="10"
                    value={targetTrees}
                    onChange={(e) => setTargetTrees(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardForm(false)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-650 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-xs"
                >
                  Verify Aadhaar & Register
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Active Farmers List table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xxs overflow-hidden">
        <div className="p-4 border-b border-slate-150">
          <span className="font-extrabold text-slate-900 text-sm">Active Farmer Registry</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <th className="p-4">Farmer ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Location Grid</th>
                <th className="p-4">Plot Size</th>
                <th className="p-4">Tree Target</th>
                <th className="p-4">DBT Budget</th>
                <th className="p-4">Direct Benefit Transfer</th>
                <th className="p-4">Ledger Tx</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {farmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td className="p-4 font-mono font-bold text-slate-900">{farmer.id.toUpperCase()}</td>
                  <td className="p-4 font-bold">{farmer.name}</td>
                  <td className="p-4 text-slate-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                    {farmer.location}
                  </td>
                  <td className="p-4 text-slate-600">{farmer.landSize}</td>
                  <td className="p-4 font-semibold text-slate-900">{farmer.targetTrees} Trees</td>
                  <td className="p-4 font-semibold text-slate-900">{farmer.payoutAmount}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      farmer.dbtStatus === "Paid" 
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                        : farmer.dbtStatus === "Pending"
                        ? "bg-amber-50 text-amber-800 border border-amber-100"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {farmer.dbtStatus}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-emerald-700 flex items-center">
                    {farmer.txHash}
                    <Link href="/dashboard/blockchain" className="ml-1 text-slate-400 hover:text-emerald-600">
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
