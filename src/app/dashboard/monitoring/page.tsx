"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Layers, 
  Database, 
  Map, 
  TrendingUp, 
  Calendar, 
  RefreshCw,
  Video,
  ScanFace,
  CheckCircle2
} from "lucide-react";

interface TelemetryRecord {
  id: string;
  farmer: string;
  coordinates: string;
  species: string;
  ndvxHealth: string;
  inspected: string;
}

const recentUploads: TelemetryRecord[] = [
  { id: "EMER-WGB-1209", farmer: "Rajesh Gowda", coordinates: "12.971644, 75.594612", species: "Teak (Tectona grandis)", ndvxHealth: "0.74 (Healthy)", inspected: "2026-06-05" },
  { id: "EMER-WGB-1210", farmer: "Rajesh Gowda", coordinates: "12.971690, 75.594680", species: "Teak (Tectona grandis)", ndvxHealth: "0.72 (Healthy)", inspected: "2026-06-05" },
  { id: "EMER-SND-8802", farmer: "Sujatha Sen", coordinates: "22.468201, 88.751220", species: "Sundari Mangrove", ndvxHealth: "0.68 (Normal)", inspected: "2026-06-03" }
];

export default function MonitoringDashboard() {
  const [activeTab, setActiveTab] = useState<"satellite" | "ndvi" | "thermal">("satellite");
  const [records, setRecords] = useState<TelemetryRecord[]>(recentUploads);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-205">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">Real-Time Geotagged Monitoring</h2>
          <p className="text-xs text-slate-500">Track tree coordinates, audit field growth patterns, and verify drone canopy data</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`h-4 w-4 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Registry Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-8 bg-slate-100 rounded-3xl border border-slate-200 p-6 flex flex-col justify-between h-[500px] relative overflow-hidden">
          
          {/* Background Map Simulation grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

          <div className="z-10 flex justify-between items-start">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xxs font-mono text-emerald-400">
              ORBITAL TRACKING FEED (ACTIVE)
            </span>

            {/* Map tab controllers */}
            <div className="flex space-x-1.5 bg-white/90 p-1 rounded-xl border border-slate-200/80 shadow-xs">
              <button
                onClick={() => setActiveTab("satellite")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  activeTab === "satellite" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setActiveTab("ndvi")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  activeTab === "ndvi" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                NDVI (Canopy)
              </button>
              <button
                onClick={() => setActiveTab("thermal")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  activeTab === "thermal" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Thermal
              </button>
            </div>
          </div>

          {/* Visual Overlay Simulations */}
          {activeTab === "satellite" && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-200">
              {/* Map grid representation */}
              <svg className="w-full h-full p-12 text-slate-300 stroke-slate-400 stroke-1 stroke-dasharray-1" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" className="stroke-slate-400/30" />
                <path d="M20,70 L50,50 L80,30" className="stroke-emerald-600/40" />
                <circle cx="50" cy="50" r="1" className="fill-slate-600" />
                {/* Specific tree marker tags */}
                <circle cx="48" cy="46" r="1.5" className="fill-emerald-500 hover:scale-125 transition-transform cursor-pointer" />
                <circle cx="52" cy="54" r="1.5" className="fill-emerald-500 hover:scale-125 transition-transform cursor-pointer" />
              </svg>
              <div className="absolute top-1/3 left-1/3 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 text-xxs shadow-sm">
                <span className="font-bold text-slate-900 block">Tree ID: EMER-WGB-1209</span>
                <span className="text-[10px] text-slate-500">Lat: 12.971644 N / Lon: 75.594612 E</span>
              </div>
            </div>
          )}

          {activeTab === "ndvi" && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-200 bg-emerald-50/15">
              <div className="w-48 h-48 rounded-full bg-emerald-500/20 absolute blur-2xl top-1/4 left-1/4"></div>
              <div className="w-32 h-32 rounded-full bg-emerald-705/25 absolute blur-xl top-1/2 left-1/2"></div>
              <div className="absolute bottom-4 right-4 bg-white/95 p-3 rounded-lg border border-slate-200 text-xxs shadow-xs font-semibold">
                <span className="text-slate-900 block mb-1">Normalized Difference Vegetation Index</span>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-emerald-200 rounded-full inline-block"></span>
                  <span className="text-slate-600">NDVI &lt; 0.2 (Soil)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block"></span>
                  <span className="text-slate-600">NDVI 0.6 - 0.8 (Dense Canopy)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "thermal" && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-200 bg-orange-50/10">
              <div className="w-64 h-64 rounded-full bg-orange-500/15 absolute blur-3xl top-1/3 left-1/3"></div>
              <div className="w-48 h-48 rounded-full bg-red-500/10 absolute blur-2xl bottom-1/4 left-1/4"></div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xxs font-mono text-orange-400">
                SENSOR LEVEL: LWIR THERMAL MATRIX
              </div>
            </div>
          )}

          <div className="z-10 flex justify-between text-xxs font-mono text-slate-400 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs max-w-sm">
            <span>Coordinates Target: Chikmagalur Grid C2</span>
          </div>

        </div>

        {/* Right Column: Telemetry Log uploads */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xxs space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-150">
            <Video className="h-5 w-5 text-emerald-600" />
            <span className="font-extrabold text-slate-950 text-sm">Biometric Field Logs</span>
          </div>

          <p className="text-xxs text-slate-600 leading-normal">
            Recent verified tree uploads synced directly from regional NGO field inspectors using coordinate registers:
          </p>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {records.map((rec) => (
              <div key={rec.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-slate-900">{rec.id}</span>
                  <span className="text-[10px] text-slate-500">{rec.inspected}</span>
                </div>
                <div className="space-y-1 text-slate-600 leading-normal">
                  <div>
                    <span className="text-slate-450 text-[10px] block">Species Target</span>
                    <span className="font-bold text-slate-800">{rec.species}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                    <div>
                      <span className="text-slate-450 block">Coordinates</span>
                      <span className="font-semibold text-slate-700 font-mono truncate block w-24">{rec.coordinates}</span>
                    </div>
                    <div>
                      <span className="text-slate-450 block">NDVI Health</span>
                      <span className="font-semibold text-emerald-700">{rec.ndvxHealth}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Planter: {rec.farmer}</span>
                  <span className="text-emerald-700 font-bold flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-0.5" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
