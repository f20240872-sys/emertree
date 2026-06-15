"use client";

import React, { useState } from "react";
import {
  MapPin,
  Layers,
  Database,
  Map,
  TrendingUp,
  RefreshCw,
  Video,
  CheckCircle2
} from "lucide-react";

type HealthStatus = "healthy" | "stressed" | "risk";
type MapLayer = "satellite" | "ndvi" | "thermal";

interface TreeMarker {
  id: string;
  farmer: string;
  coordinates: string;
  lat: string;
  lon: string;
  species: string;
  status: HealthStatus;
  statusLabel: string;
  ndvi: number;
  moisture: number;
  canopy: number;
  inspected: string;
  x: number;
  y: number;
}

const treeMarkers: TreeMarker[] = [
  {
    id: "EMER-WGB-1209",
    farmer: "Rajesh Gowda",
    coordinates: "12.971644, 75.594612",
    lat: "12.971644 N",
    lon: "75.594612 E",
    species: "Teak (Tectona grandis)",
    status: "healthy",
    statusLabel: "Healthy",
    ndvi: 0.74,
    moisture: 68,
    canopy: 82,
    inspected: "2026-06-05",
    x: 50,
    y: 50
  },
  {
    id: "EMER-WGB-1210",
    farmer: "Rajesh Gowda",
    coordinates: "12.971690, 75.594680",
    lat: "12.971690 N",
    lon: "75.594680 E",
    species: "Teak (Tectona grandis)",
    status: "healthy",
    statusLabel: "Healthy",
    ndvi: 0.72,
    moisture: 64,
    canopy: 79,
    inspected: "2026-06-05",
    x: 57,
    y: 44
  },
  {
    id: "EMER-WGB-1211",
    farmer: "Meera K.",
    coordinates: "12.971588, 75.594530",
    lat: "12.971588 N",
    lon: "75.594530 E",
    species: "Wild Jack (Artocarpus hirsutus)",
    status: "stressed",
    statusLabel: "Stressed",
    ndvi: 0.51,
    moisture: 39,
    canopy: 61,
    inspected: "2026-06-04",
    x: 43,
    y: 57
  },
  {
    id: "EMER-WGB-1212",
    farmer: "Anil Hegde",
    coordinates: "12.971760, 75.594470",
    lat: "12.971760 N",
    lon: "75.594470 E",
    species: "Malabar Kino",
    status: "risk",
    statusLabel: "High Risk",
    ndvi: 0.28,
    moisture: 24,
    canopy: 36,
    inspected: "2026-06-03",
    x: 37,
    y: 38
  },
  {
    id: "EMER-WGB-1213",
    farmer: "Sahana Rao",
    coordinates: "12.971522, 75.594740",
    lat: "12.971522 N",
    lon: "75.594740 E",
    species: "Rosewood",
    status: "stressed",
    statusLabel: "Dehydrated",
    ndvi: 0.46,
    moisture: 34,
    canopy: 54,
    inspected: "2026-06-04",
    x: 64,
    y: 62
  },
  {
    id: "EMER-WGB-1214",
    farmer: "Ramesh K.",
    coordinates: "12.971836, 75.594610",
    lat: "12.971836 N",
    lon: "75.594610 E",
    species: "Teak (Tectona grandis)",
    status: "healthy",
    statusLabel: "Healthy",
    ndvi: 0.78,
    moisture: 71,
    canopy: 86,
    inspected: "2026-06-05",
    x: 52,
    y: 31
  }
];

const layerLabels: Record<MapLayer, string> = {
  satellite: "Satellite",
  ndvi: "NDVI (Canopy)",
  thermal: "Thermal"
};

const statusStyles: Record<HealthStatus, { dot: string; text: string; glow: string; bar: string }> = {
  healthy: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    glow: "shadow-[0_0_18px_rgba(52,211,153,0.85)] ring-emerald-300/40",
    bar: "bg-emerald-400"
  },
  stressed: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    glow: "shadow-[0_0_18px_rgba(251,191,36,0.85)] ring-amber-300/40",
    bar: "bg-amber-400"
  },
  risk: {
    dot: "bg-rose-500",
    text: "text-rose-300",
    glow: "shadow-[0_0_18px_rgba(244,63,94,0.85)] ring-rose-300/40",
    bar: "bg-rose-500"
  }
};

export default function MonitoringDashboard() {
  const [activeLayer, setActiveLayer] = useState<MapLayer>("satellite");
  const [selectedTree, setSelectedTree] = useState<TreeMarker>(treeMarkers[0]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-4 text-white shadow-2xl sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">Real-Time Geotagged Monitoring</h2>
          <p className="text-xs text-slate-400">
            Chikmagalur Grid C2 centered at Lat 12.971644 N / Lon 75.594612 E
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex w-fit items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 shadow-xs transition-colors hover:bg-white/10 disabled:opacity-70"
        >
          <RefreshCw className={`mr-1.5 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Registry Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="relative min-h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 xl:col-span-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.22),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.35),rgba(9,9,11,0.95))]" />
          <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(34deg,transparent_0_40%,rgba(148,163,184,0.12)_40%_42%,transparent_42%_100%),linear-gradient(126deg,transparent_0_48%,rgba(20,184,166,0.14)_48%_50%,transparent_50%_100%)]" />

          {activeLayer === "ndvi" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_55%,rgba(16,185,129,0.42),transparent_22%),radial-gradient(circle_at_61%_38%,rgba(132,204,22,0.26),transparent_18%),radial-gradient(circle_at_65%_65%,rgba(245,158,11,0.18),transparent_16%)] mix-blend-screen" />
          )}

          {activeLayer === "thermal" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_37%_38%,rgba(244,63,94,0.36),transparent_18%),radial-gradient(circle_at_64%_62%,rgba(251,191,36,0.26),transparent_22%),linear-gradient(135deg,rgba(249,115,22,0.08),rgba(2,6,23,0.4))] mix-blend-screen" />
          )}

          <div className="relative z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div className="inline-flex w-fit items-center rounded-full border border-emerald-300/20 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200 backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ORBITAL TRACKING FEED (ACTIVE)
            </div>

            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-md">
              {(Object.keys(layerLabels) as MapLayer[]).map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide transition-all sm:px-4 ${
                    activeLayer === layer
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {layerLabels[layer]}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10" />
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10" />
          <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-emerald-300/10" />
          <div className="absolute left-1/2 top-1/2 h-full w-px -translate-y-1/2 bg-emerald-300/10" />

          {treeMarkers.map((tree) => {
            const isSelected = selectedTree.id === tree.id;
            const styles = statusStyles[tree.status];

            return (
              <button
                key={tree.id}
                onClick={() => setSelectedTree(tree)}
                style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
                className={`absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 transition-transform hover:scale-125 focus:outline-hidden ${styles.dot} ${styles.glow} ${
                  isSelected ? "scale-125" : "scale-100"
                }`}
                aria-label={`Select tree ${tree.id}`}
              >
                {isSelected && <span className={`absolute inset-0 rounded-full ${styles.dot} animate-ping opacity-70`}></span>}
              </button>
            );
          })}

          <div
            style={{ left: `min(${selectedTree.x + 3}%, 66%)`, top: `max(${selectedTree.y - 19}%, 14%)` }}
            className="absolute z-30 w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Selected Tree</span>
                <h3 className="mt-1 font-mono text-sm font-extrabold text-white">{selectedTree.id}</h3>
              </div>
              <span className={`rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold ${statusStyles[selectedTree.status].text}`}>
                {selectedTree.statusLabel}
              </span>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-2 text-[11px] text-slate-300 sm:grid-cols-2">
              <span className="font-mono">Lat: {selectedTree.lat}</span>
              <span className="font-mono">Lon: {selectedTree.lon}</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>NDVI health score</span>
                  <span>{selectedTree.ndvi.toFixed(2)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${statusStyles[selectedTree.status].bar}`} style={{ width: `${selectedTree.ndvi * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Moisture</span>
                  <p className="mt-1 text-lg font-extrabold text-white">{selectedTree.moisture}%</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Canopy</span>
                  <p className="mt-1 text-lg font-extrabold text-white">{selectedTree.canopy}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-[10px] font-mono text-slate-300 backdrop-blur-md">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>Coordinates Target: Chikmagalur Grid C2</span>
              <span>Center: 12.971644 N / 75.594612 E</span>
              <span>Grid: C2-WGB / 6 active trees / 15m orbital pass</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-300" />
                <span className="text-sm font-extrabold text-white">Layer Telemetry</span>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-slate-300">
                {layerLabels[activeLayer]}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <Map className="mx-auto mb-2 h-4 w-4 text-slate-400" />
                <p className="text-lg font-extrabold">15m</p>
                <p className="text-[10px] text-slate-400">Resolution</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <TrendingUp className="mx-auto mb-2 h-4 w-4 text-emerald-300" />
                <p className="text-lg font-extrabold">0.62</p>
                <p className="text-[10px] text-slate-400">Avg NDVI</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <Database className="mx-auto mb-2 h-4 w-4 text-sky-300" />
                <p className="text-lg font-extrabold">6</p>
                <p className="text-[10px] text-slate-400">Tree Logs</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Video className="h-5 w-5 text-emerald-300" />
              <span className="text-sm font-extrabold text-white">Biometric Field Logs</span>
            </div>

            <div className="space-y-3 pr-1 xl:max-h-[420px] xl:overflow-y-auto">
              {treeMarkers.map((rec) => {
                const styles = statusStyles[rec.status];
                return (
                  <button
                    key={rec.id}
                    onClick={() => setSelectedTree(rec)}
                    className={`w-full rounded-2xl border p-3 text-left transition-all ${
                      selectedTree.id === rec.id
                        ? "border-emerald-300/40 bg-emerald-300/10"
                        : "border-white/10 bg-black/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-bold text-white">{rec.id}</span>
                      <span className={`text-[10px] font-bold ${styles.text}`}>{rec.statusLabel}</span>
                    </div>
                    <div className="space-y-2 text-[11px] leading-normal text-slate-300">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500">Species Target</span>
                        <span className="font-bold text-slate-100">{rec.species}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-500">Coordinates</span>
                          <span className="block truncate font-mono text-slate-300">{rec.coordinates}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-500">NDVI</span>
                          <span className={`font-semibold ${styles.text}`}>{rec.ndvi.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-400">
                      <span>Planter: {rec.farmer}</span>
                      <span className="flex items-center font-bold text-emerald-300">
                        <CheckCircle2 className="mr-0.5 h-3 w-3" />
                        Verified
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-white">
              <MapPin className="h-5 w-5 text-emerald-300" />
              Chikmagalur Grid C2
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Marker colors represent current tree health: emerald for healthy canopy response, amber for moisture stress, and crimson for high-risk disease or canopy loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
