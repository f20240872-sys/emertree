"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Coins, 
  Building2, 
  Users, 
  TreePine, 
  MapPin, 
  Map, 
  TrendingUp, 
  FileCheck,
  CheckCircle,
  Database,
  ArrowRight,
  ExternalLink,
  QrCode,
  Download
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LifecycleStage {
  step: number;
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  details: {
    status: string;
    timestamp: string;
    registryId: string;
    parameters: { label: string; value: string }[];
    ledgerHash: string;
  };
}

const lifecycleStages: LifecycleStage[] = [
  {
    step: 1,
    id: "donation",
    title: "Corporate Donation",
    icon: Coins,
    description: "Corporates define impact goals and dispatch funding through auditable Escrow channels.",
    details: {
      status: "Verified & Audited",
      timestamp: "2026-05-10 10:14:22",
      registryId: "EMER-TX-9982",
      parameters: [
        { label: "Sponsor Brand", value: "TCS Foundation" },
        { label: "Fund Amount", value: "₹25,00,000 (INR)" },
        { label: "Target Afforestation", value: "Western Ghats Corridor" },
        { label: "Compliance Tag", value: "Schedule VII Compliant (Sec 135)" }
      ],
      ledgerHash: "0x39a1...ff42 (Block #198082)"
    }
  },
  {
    step: 2,
    id: "project",
    title: "Project Created",
    icon: Building2,
    description: "Regional NGO creates project parameters, species selection list, and site boundaries.",
    details: {
      status: "Approved & Bounds Active",
      timestamp: "2026-05-12 14:30:10",
      registryId: "EMER-PROJ-870",
      parameters: [
        { label: "Executing NGO", value: "Western Ghats Eco-Society" },
        { label: "Ecosystem Type", value: "Tropical Agroforestry corridor" },
        { label: "Area Grid Coordinates", value: "12.97° N, 75.59° E" },
        { label: "Target Species", value: "Teak, Rosewood, Jackfruit" }
      ],
      ledgerHash: "0xab82...e901 (Block #198144)"
    }
  },
  {
    step: 3,
    id: "farmer",
    title: "Farmer Assigned",
    icon: Users,
    description: "Marginal farmers are onboarded, verified, and mapped to specific plantation plots.",
    details: {
      status: "Farmer Identity Verified",
      timestamp: "2026-05-15 09:12:00",
      registryId: "EMER-FARM-5120",
      parameters: [
        { label: "Onboarded Farmer", value: "Rajesh Gowda" },
        { label: "Farm Location", value: "Chikmagalur Grid C2" },
        { label: "Direct Benefit Transfer", value: "Aadhaar Linked (Active)" },
        { label: "Land Registry Verified", value: "RTC Record 104/A" }
      ],
      ledgerHash: "0xf882...19ba (Block #198288)"
    }
  },
  {
    step: 4,
    id: "planted",
    title: "Trees Planted",
    icon: TreePine,
    description: "Verified native tree saplings are planted on the farmer's plots with organic soil enhancements.",
    details: {
      status: "Planted & Verified",
      timestamp: "2026-05-20 17:45:00",
      registryId: "EMER-PLNT-0091",
      parameters: [
        { label: "Sapling Count", value: "1,250 Trees" },
        { label: "Nursery Origin", value: "Chikmagalur Forestry Nursery" },
        { label: "Organic Soil Substrate", value: "Mycorrhizae & Biochar mix" },
        { label: "Soil pH Level", value: "6.4 (Optimal)" }
      ],
      ledgerHash: "0x66c8...5a7b (Block #198450)"
    }
  },
  {
    step: 5,
    id: "geotagged",
    title: "Geo-tagged",
    icon: MapPin,
    description: "Saplings are photographed and geotagged with high-resolution GPS coordinates.",
    details: {
      status: "Coordinates Registered",
      timestamp: "2026-05-22 11:22:40",
      registryId: "EMER-TAG-22901",
      parameters: [
        { label: "Geotag Lat/Long", value: "12.971644 N / 75.594612 E" },
        { label: "Tree ID Ledger Block", value: "EMER-WGB-1209 to EMER-WGB-2459" },
        { label: "Capture Metadata", value: "Exif GPS sync • Sony IMX sensor" },
        { label: "IPFS CID Hash", value: "QmXyT...4vB (Photo Verified)" }
      ],
      ledgerHash: "0xd909...c112 (Block #198602)"
    }
  },
  {
    step: 6,
    id: "monitored",
    title: "Monitored",
    icon: Map,
    description: "NGO field supervisors and satellite passes conduct bi-annual health reviews.",
    details: {
      status: "Telemetry Active",
      timestamp: "2026-06-05 16:10:00",
      registryId: "EMER-MON-0822",
      parameters: [
        { label: "Canopy Density Index", value: "NDVI: 0.72 (Healthy)" },
        { label: "Inspected Survival Rate", value: "98.4% Health Index" },
        { label: "Supervisor Review", value: "Completed by Ramesh K. (NGO)" },
        { label: "Telemetry Origin", value: "Sentinel-2 Satellite Pass B" }
      ],
      ledgerHash: "0xe819...7068 (Block #199042)"
    }
  },
  {
    step: 7,
    id: "carbon",
    title: "Carbon Generated",
    icon: TrendingUp,
    description: "Calculated carbon sequestration index updates the corporate offset registry.",
    details: {
      status: "Credits Computed",
      timestamp: "2026-06-08 14:05:15",
      registryId: "EMER-CARB-990",
      parameters: [
        { label: "Total CO2 Sequestered", value: "12.8 tCO2e/yr (Active)" },
        { label: "Computation Engine", value: "Emertrees Biomass Model v2.1" },
        { label: "Offset Verification", value: "Gold Standard Methodology ready" },
        { label: "Ledger Update", value: "Linked to ESG compliance registry" }
      ],
      ledgerHash: "0xcc29...3a88 (Block #199120)"
    }
  },
  {
    step: 8,
    id: "esg",
    title: "ESG Report Produced",
    icon: FileCheck,
    description: "Cryptographically signed compliance and SEBI BRSR reports are pushed to dashboards.",
    details: {
      status: "Published & Ready",
      timestamp: "2026-06-10 17:00:00",
      registryId: "EMER-CERT-2026",
      parameters: [
        { label: "Recipient Brand", value: "TCS CSR Division" },
        { label: "ESG Verification Stamp", value: "SEBI BRSR Core Compliant" },
        { label: "Public Ledger Check", value: "Decentralized Audit Hash Validated" },
        { label: "Issued Certificate ID", value: "CERT-2026-WGB-9982" }
      ],
      ledgerHash: "0xff12...9a7b (Block #199340)"
    }
  }
];

export default function LifecyclePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const activeStage = lifecycleStages[currentStep];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      <section className="pt-28 pb-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-800">
              Ecological Asset Traceability Pipeline
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              The Afforestation Lifecycle
            </h1>
            <p className="text-lg text-slate-600">
              Verify how a single corporate donation translates into local livelihoods, GPS-tagged saplings, verified carbon offsets, and board-ready ESG compliance exports.
            </p>
          </div>

          {/* Interactive Steps Grid Flow */}
          <div className="relative mb-16">
            {/* Horizontal progress bar for desktop */}
            <div className="hidden lg:block absolute top-10 left-8 right-8 h-1 bg-slate-100 -z-10">
              <div 
                className="bg-emerald-600 h-full transition-all duration-350"
                style={{ width: `${(currentStep / (lifecycleStages.length - 1)) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {lifecycleStages.map((stage, idx) => {
                const StageIcon = stage.icon;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`flex flex-col items-center p-4 rounded-2xl border text-center transition-all duration-300 relative focus:outline-hidden ${
                      currentStep === idx
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105 z-10"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl mb-3 transition-colors ${
                      currentStep === idx ? "bg-white/20 text-white" : "bg-slate-100 text-slate-650"
                    }`}>
                      <StageIcon className="h-5 w-5" />
                    </div>
                    <span className="text-xxs font-bold uppercase tracking-wider block mb-1">
                      Step {stage.step}
                    </span>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {stage.title}
                    </span>

                    {/* Step Connect Checkmark Indicator */}
                    {idx < currentStep && (
                      <span className="absolute top-2 right-2 bg-emerald-100 text-emerald-800 p-0.5 rounded-full text-[8px] font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Window Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Descriptive info & flow control */}
            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl">
                    <ActiveIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xxs font-bold text-emerald-800 uppercase tracking-widest block">
                      Stage {activeStage.step} of 8 Verification Registry
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">{activeStage.title}</h2>
                  </div>
                </div>

                <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
                  {activeStage.description}
                </p>

                {/* Next Step Assistant CTA */}
                {currentStep < lifecycleStages.length - 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    Simulate Step {activeStage.step + 1}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Platform Verification Engine</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Emertrees utilizes zero-double-counting ledger protocols to tie every micro-funding step to actual ecological assets. Our records are open, downloadable, and synchronized in real-time.
                </p>
              </div>
            </div>

            {/* Right Column: Ledger Proof Console */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden">
              {/* Background watermark */}
              <div className="absolute right-4 bottom-4 text-slate-100 pointer-events-none select-none -z-10">
                <QrCode className="h-32 w-32 stroke-slate-100" />
              </div>

              <div>
                {/* Console header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-150 mb-6">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-emerald-600" />
                    <span className="text-xxs font-bold text-slate-700 uppercase tracking-wider">Blockchain Ledger Node State</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] font-bold">
                    {activeStage.details.status}
                  </span>
                </div>

                {/* Parameters list */}
                <div className="space-y-4">
                  {activeStage.details.parameters.map((param, pIdx) => (
                    <div key={pIdx} className="grid grid-cols-3 gap-2 py-1 text-xs">
                      <span className="text-slate-500 font-medium">{param.label}</span>
                      <span className="col-span-2 font-bold text-slate-900 text-right">{param.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-150 pt-6 mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xxs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block">IPFS / Ledger Sync Hash:</span>
                    <span className="text-emerald-700 font-bold break-all">{activeStage.details.ledgerHash}</span>
                  </div>
                  <a
                    href="/dashboard/blockchain"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-750 font-bold shrink-0 self-end sm:self-center"
                  >
                    Explore Node
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>

                {activeStage.id === "esg" && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Link
                      href="/dashboard/corporate"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs w-full text-center"
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Download PDF
                    </Link>
                    <Link
                      href="/dashboard/blockchain"
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors w-full text-center"
                    >
                      View Verification Record
                    </Link>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
