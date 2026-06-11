"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  TreePine, 
  TrendingUp, 
  Users, 
  Download, 
  Database,
  Award,
  ArrowRight,
  Calculator,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface OffsetProject {
  id: string;
  name: string;
  location: string;
  treesPlanted: number;
  carbonOffset: string;
  status: string;
}

const activeSponsorships: OffsetProject[] = [
  {
    id: "proj_1",
    name: "Western Ghats Agroforestry Corridor",
    location: "Chikmagalur, Karnataka",
    treesPlanted: 12500,
    carbonOffset: "285.5 tCO2e/yr",
    status: "Active monitoring"
  },
  {
    id: "proj_2",
    name: "Sundarbans Delta Mangrove Safeguard",
    location: "Sundarbans, West Bengal",
    treesPlanted: 8500,
    carbonOffset: "299.2 tCO2e/yr",
    status: "Sapling stage verified"
  }
];

export default function CorporateDashboard() {
  // Carbon Calculator states
  const [flightHours, setFlightHours] = useState("10");
  const [officePower, setOfficePower] = useState("1500"); // kWh
  const [serverCompute, setServerCompute] = useState("200"); // instances hours

  // Certificate generator states
  const [selectedDonation, setSelectedDonation] = useState<string>("Western Ghats Hub");
  const [certificateSuccess, setCertificateSuccess] = useState(false);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);

  // Cost calculation helpers
  const handleCalculateOffset = () => {
    const flights = parseFloat(flightHours) || 0;
    const power = parseFloat(officePower) || 0;
    const compute = parseFloat(serverCompute) || 0;

    // Carbon computation rules:
    // Flight: 0.25 tCO2 per hour
    // Power: 0.0008 tCO2 per kWh
    // Server: 0.0005 tCO2 per instance hour
    const totalCO2 = (flights * 0.25) + (power * 0.0008) + (compute * 0.0005);
    // Tree absorb avg: 22kg CO2 per year = 0.022 tCO2
    const treesNeeded = Math.ceil(totalCO2 / 0.022);
    return {
      co2: totalCO2.toFixed(2),
      trees: treesNeeded,
      cost: (treesNeeded * 120).toLocaleString("en-IN")
    };
  };

  const calcResult = handleCalculateOffset();

  const handleGenerateCertificate = () => {
    setGeneratingCertificate(true);
    setCertificateSuccess(false);
    setTimeout(() => {
      setGeneratingCertificate(false);
      setCertificateSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xxs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Trees Planted</span>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <TreePine className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-950 mt-2">21,000</p>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Geotagged on IPFS Ledger</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xxs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Active Carbon Offset</span>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-950 mt-2">584.7 t</p>
          <span className="text-[10px] text-slate-550 block mt-1">CO2 equivalent / year</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xxs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Farmers Employed</span>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-950 mt-2">142</p>
          <span className="text-[10px] text-emerald-705 font-bold block mt-1">Direct benefit transfer active</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xxs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Schedule VII Compliance</span>
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <Building2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-950 mt-2">100%</p>
          <span className="text-[10px] text-emerald-705 font-bold block mt-1">CSR-2 Audit sheets ready</span>
        </div>

      </div>

      {/* Main dashboard columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Projects & Carbon offset calculator */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Active Projects Registry */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-150">
              <h3 className="font-extrabold text-slate-950 text-base">Your Active Plantation Projects</h3>
              <Link
                href="/projects"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-755 inline-flex items-center"
              >
                Browse Projects
                <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {activeSponsorships.map((project) => (
                <div key={project.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{project.name}</h4>
                    <span className="text-xxs text-slate-500 flex items-center">
                      <LocationPin className="h-3 w-3 mr-1 text-slate-400" />
                      {project.location}
                    </span>
                  </div>
                  <div className="flex sm:text-right gap-6 text-xs">
                    <div>
                      <span className="text-slate-500 block">Sponsored Asset</span>
                      <span className="font-bold text-slate-800">{project.treesPlanted.toLocaleString()} Trees</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">CO2 Sequestration</span>
                      <span className="font-bold text-emerald-705">{project.carbonOffset}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carbon offset calculator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <Calculator className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-base font-sans">Scope 1-3 Carbon Footprint Calculator</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Estimate operational emissions and immediately determine the required afforestation sponsorship to achieve carbon neutrality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-600 block uppercase">Flight Hours</label>
                <input
                  type="number"
                  min="0"
                  value={flightHours}
                  onChange={(e) => setFlightHours(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-600 block uppercase">Office Power (kWh)</label>
                <input
                  type="number"
                  min="0"
                  value={officePower}
                  onChange={(e) => setOfficePower(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xxs font-bold text-slate-600 block uppercase">Compute Server (Hrs)</label>
                <input
                  type="number"
                  min="0"
                  value={serverCompute}
                  onChange={(e) => setServerCompute(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Calculations Result */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Total Carbon</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900">{calcResult.co2} tCO2e</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Plantation Required</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-705">{calcResult.trees} Trees</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Est. Sponsorship</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{calcResult.cost}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
              >
                Allocate Sponsorship
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* Right Column: Cryptographic Certificate generator */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
              <Award className="h-5 w-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-950 text-base font-sans">Digital Impact Certificate</h3>
            </div>

            {!certificateSuccess ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select an active plantation sponsorship to generate a secure, verifiable impact certificate for stakeholders.
                </p>

                <div className="space-y-1">
                  <label className="text-xxs font-bold text-slate-600 block uppercase">Select Project Asset</label>
                  <select
                    value={selectedDonation}
                    onChange={(e) => setSelectedDonation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-350 bg-white rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                  >
                    <option value="Western Ghats Hub">Western Ghats Agroforestry Corridor (12,500 Trees)</option>
                    <option value="Sundarbans Delta">Sundarbans Delta Mangrove Safeguard (8,500 Trees)</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateCertificate}
                  disabled={generatingCertificate}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50"
                >
                  {generatingCertificate ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-white animate-spin mr-2"></span>
                      Generating Certificate...
                    </>
                  ) : (
                    "Compile Verification Certificate"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-center py-4 animate-in fade-in duration-200">
                <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100 inline-block">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Certificate Generated Successfully</h3>
                  <p className="text-xxs text-slate-500 mt-1">Verifiable stamp CERT-2026-TCS-MOCK verified by SHA-256 ledger node.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issued To:</span>
                    <span className="font-bold text-slate-900">TCS Foundation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Asset Base:</span>
                    <span className="font-bold text-slate-900">{selectedDonation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Audit Status:</span>
                    <span className="font-bold text-emerald-700">Ledger Verified</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setCertificateSuccess(false)}
                    className="w-full inline-flex items-center justify-center px-3 py-2 rounded-lg bg-emerald-650 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Download PDF
                  </button>
                  <Link
                    href="/dashboard/blockchain"
                    className="w-full inline-flex items-center justify-center px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Database className="h-3.5 w-3.5 mr-1.5 text-slate-450" />
                    View Verification Record
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block tracking-wider">Auditing Compliance Notice</span>
              <p className="text-xxs text-emerald-950 leading-relaxed font-medium">
                The financial contributions, direct benefits transfer payouts to Rajesh Gowda, and biometric coordinates uploads are locked into the public IPFS blockchain block index. Private ledger double-entry protection is fully operational.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

// Mini Icon Helper
function LocationPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
