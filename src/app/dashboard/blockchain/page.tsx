"use client";

import React, { useState } from "react";
import { 
  Database, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  QrCode,
  Link as LinkIcon,
  ShieldCheck,
  Server
} from "lucide-react";

interface LedgerBlock {
  blockNumber: number;
  timestamp: string;
  txCount: number;
  hash: string;
  previousHash: string;
}

const recentBlocks: LedgerBlock[] = [
  { blockNumber: 199340, timestamp: "2026-06-10 17:00:00", txCount: 8, hash: "0xff129a7be8197068b5a7b198082ab82a", previousHash: "0xcc29bc3a8868f8fafc25b1" },
  { blockNumber: 199120, timestamp: "2026-06-08 14:05:15", txCount: 12, hash: "0xcc29bc3a8868f8fafc25b1e901ff42ab", previousHash: "0xe8197068b5a7b198082a90" },
  { blockNumber: 199042, timestamp: "2026-06-05 16:10:00", txCount: 15, hash: "0xe8197068b5a7b198082a901ff42abc7e", previousHash: "0xd909c112ab8209822a" }
];

export default function BlockchainDashboard() {
  const [searchQuery, setSearchQuery] = useState("EMER-WGB-1209");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError("");
    setSearchResult(null);

    setTimeout(() => {
      setLoading(false);
      // Mock lookup matching searchQuery
      const query = searchQuery.trim().toUpperCase();
      if (query.startsWith("EMER-WGB-") || query.startsWith("EMER-SND-")) {
        setSearchResult({
          treeId: query,
          status: "Verified & Locked",
          ipfsHash: "QmXyT83f9sK1d2A3d4e5f6g7h8i9j0k1l2m3n4vB",
          planter: "Rajesh Gowda (Aadhaar DBT Verified)",
          project: "Western Ghats Agroforestry Corridor",
          donationSource: "TCS CSR Fund #9982",
          gpsCoordinates: "12.971644 N / 75.594612 E",
          soilPH: "6.4",
          plantedAt: "2026-05-20 17:45:00",
          sequestrationRate: "22.8 kg CO2e/yr",
          blockIndex: 198450
        });
      } else {
        setError(`No record found matching Tree ID: "${query}". Ensure the prefix is correct (e.g. EMER-WGB-1209).`);
      }
    }, 600);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-205">
        <h2 className="text-xl font-extrabold text-slate-950">Environmental Ledger Explorer</h2>
        <p className="text-xs text-slate-500">Query direct IPFS hashes, verify cryptographic signatures, and audit block immutability logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Search & Registry result */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Query Console */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <h3 className="font-extrabold text-slate-950 text-sm">Query Tree-Level Metadata</h3>
            <p className="text-xs text-slate-605 leading-relaxed">
              Retrieve direct plantation proofs, coordinates uploads, farmer benefits records, and signed certification records by querying tree block identifiers:
            </p>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter Tree ID (e.g. EMER-WGB-1209)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-350 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono font-bold"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-650 text-white rounded-lg hover:bg-emerald-700 text-xs font-bold transition-colors shadow-xs disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Ledger"}
              </button>
            </form>

            {error && (
              <div className="p-3 bg-red-50 text-red-800 rounded-xl text-xs flex items-center space-x-2 border border-red-100">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Search Result details card */}
          {searchResult && (
            <div className="bg-white p-6 rounded-2xl border border-slate-205 shadow-md space-y-6 animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-slate-150">
                <div className="flex items-center space-x-2">
                  <Database className="h-4.5 w-4.5 text-emerald-600" />
                  <span className="font-bold text-xs text-slate-900 font-mono">{searchResult.treeId}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] font-bold">
                  {searchResult.status}
                </span>
              </div>

              {/* Specs array */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs leading-normal">
                <div>
                  <span className="text-slate-450 block">Target Ecosystem</span>
                  <span className="font-bold text-slate-900">{searchResult.project}</span>
                </div>
                <div>
                  <span className="text-slate-450 block">Direct Planter Partner</span>
                  <span className="font-bold text-slate-900">{searchResult.planter}</span>
                </div>
                <div>
                  <span className="text-slate-450 block">Biometric Location Coordinates</span>
                  <span className="font-bold text-slate-900 font-mono">{searchResult.gpsCoordinates}</span>
                </div>
                <div>
                  <span className="text-slate-450 block">Plantation Timestamp</span>
                  <span className="font-bold text-slate-900">{searchResult.plantedAt}</span>
                </div>
                <div>
                  <span className="text-slate-450 block">Carbon Sequestration Asset</span>
                  <span className="font-bold text-emerald-705">{searchResult.sequestrationRate}</span>
                </div>
                <div>
                  <span className="text-slate-450 block">Ledger Block Index</span>
                  <span className="font-bold text-slate-900 font-mono">#{searchResult.blockIndex}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 font-mono text-[10px] text-slate-600">
                <div className="flex justify-between">
                  <span>Sponsorship Target:</span>
                  <span className="font-bold text-slate-905">{searchResult.donationSource}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Soil Chemistry pH:</span>
                  <span className="font-bold text-slate-805">{searchResult.soilPH} (Optimal)</span>
                </div>
                <div className="border-t border-slate-200 pt-2 mt-2 flex flex-col sm:flex-row justify-between gap-1">
                  <span>IPFS Document Hash:</span>
                  <span className="text-emerald-700 font-bold break-all">{searchResult.ipfsHash}</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Recent Blocks log */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <Server className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-sm">Environmental Ledger Blocks</h3>
            </div>

            <p className="text-xxs text-slate-650 leading-relaxed">
              Recent verified environmental state changes committed to the decentralized registry:
            </p>

            <div className="space-y-4">
              {recentBlocks.map((block) => (
                <div key={block.blockNumber} className="border-l-2 border-emerald-500 pl-4 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Block #{block.blockNumber}</span>
                    <span className="text-[10px] text-slate-500">{block.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono space-y-0.5">
                    <div className="flex justify-between">
                      <span>Sync Transactions:</span>
                      <span className="font-bold">{block.txCount} Actions verified</span>
                    </div>
                    <div className="truncate w-full">
                      <span>Hash: </span>
                      <span className="text-emerald-700 font-bold">{block.hash}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 flex items-start space-x-3 text-xs">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block">Ledger Immutability Proof</span>
              <p className="text-xxs text-emerald-950 leading-relaxed font-medium">
                The database registers all coordinates and payouts on IPFS nodes. This architecture protects corporate ESG sponsors against double-counting hazards.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
