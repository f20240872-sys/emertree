"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Plus, 
  MapPin, 
  Check, 
  FolderHeart, 
  Briefcase, 
  TrendingUp, 
  ShieldAlert,
  Loader2,
  CheckCircle2
} from "lucide-react";

interface NGOProject {
  id: string;
  name: string;
  nurseryStatus: string;
  plantingStatus: string;
  verificationStatus: string;
  budgetAllocated: string;
  targetTrees: number;
}

const initialProjects: NGOProject[] = [
  {
    id: "ngo-1",
    name: "Western Ghats Corridor Block A",
    nurseryStatus: "Complete (12,500 saplings ready)",
    plantingStatus: "In Progress (10,200 planted)",
    verificationStatus: "Biometric Geotagging active",
    budgetAllocated: "₹15,00,000",
    targetTrees: 12500
  },
  {
    id: "ngo-2",
    name: "Sundarbans Coastal Belt Grid C",
    nurseryStatus: "Complete (10,000 ready)",
    plantingStatus: "Completed (8,500 planted)",
    verificationStatus: "Audit certified",
    budgetAllocated: "₹12,75,000",
    targetTrees: 8500
  }
];

export default function NGODashboard() {
  const [projects, setProjects] = useState<NGOProject[]>(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states
  const [projectName, setProjectName] = useState("");
  const [speciesMix, setSpeciesMix] = useState("Teak, Rosewood");
  const [targetTrees, setTargetTrees] = useState("5000");
  const [budget, setBudget] = useState("600000");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newProj: NGOProject = {
        id: `ngo-${projects.length + 1}`,
        name: projectName,
        nurseryStatus: "Nursery Setup (Seeds dispatched)",
        plantingStatus: "Not Started",
        verificationStatus: "Awaiting plantation launch",
        budgetAllocated: `₹${(parseInt(budget) || 0).toLocaleString("en-IN")}`,
        targetTrees: parseInt(targetTrees) || 0
      };
      setProjects([newProj, ...projects]);
      setLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setShowAddForm(false);
        setProjectName("");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">NGO Projects & Nurseries</h2>
          <p className="text-xs text-slate-500">Plan ecosystems, allocate regional budgets, and supervise local nurseries</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Plantation Project
        </button>
      </div>

      {/* Dynamic Project Creation Drawer */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl border border-slate-205 shadow-md">
          {successMsg ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Plantation Project Created</h4>
                <p className="text-xs text-slate-550 mt-1">Boundaries locked and nursery saplings prepared for germination.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateProject} className="space-y-4 max-w-xl">
              <h3 className="font-bold text-slate-900 text-sm">New Project Specifications</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-750 block">Project Title Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Western Ghats Corridor Block B"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-750 block">Target Saplings Count</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={targetTrees}
                    onChange={(e) => setTargetTrees(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-750 block">Allocated Budget (INR)</label>
                  <input
                    type="number"
                    min="1000"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-755 block">Ecosystem Species Mix</label>
                <input
                  type="text"
                  required
                  value={speciesMix}
                  onChange={(e) => setSpeciesMix(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-650 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Creating...
                    </>
                  ) : (
                    "Authorize & Sync Ledger"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Active Project Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xxs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">
                  Budget: {project.budgetAllocated}
                </span>
                <h3 className="text-lg font-extrabold text-slate-950 mt-2">{project.name}</h3>
              </div>
              <Briefcase className="h-5 w-5 text-slate-400" />
            </div>

            {/* Steps status matrix */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Nursery Preparation:</span>
                <span className="font-bold text-emerald-750 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5"></span>
                  {project.nurseryStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Field Planting stage:</span>
                <span className="font-bold text-slate-800 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5 animate-pulse"></span>
                  {project.plantingStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Verification Status:</span>
                <span className="font-bold text-slate-800 font-mono">
                  {project.verificationStatus}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-2 font-semibold">
                <span className="text-slate-700">Total Tree Target:</span>
                <span className="text-slate-900 font-bold">{project.targetTrees.toLocaleString()} Saplings</span>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <span className="text-[10px] font-bold text-emerald-700 flex items-center">
                ✓ Public escrow verified
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
