"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TreePine, 
  MapPin, 
  TrendingUp, 
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Coins,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProjectType {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  sequestrationMultiplier: string;
  activeFarmers: number;
  plantedCount: string;
  targetCount: string;
  species: string[];
  biodiversityFocus: string;
  costPerTree: string;
}

const projectsList: ProjectType[] = [
  {
    id: "mangrove",
    name: "Sundarbans Coastal Mangrove Restoration",
    category: "Mangrove Restoration",
    location: "Sajnekhali, West Bengal",
    description: "Replanting critical coastal mangrove buffers to defend against rising cyclonic impact, stabilize delta soil beds, and establish high-integrity blue carbon assets.",
    sequestrationMultiplier: "35.2 kg CO2e/tree/year",
    activeFarmers: 3420,
    plantedCount: "534,500",
    targetCount: "1,000,000",
    species: ["Sundari (Heritiera fomes)", "Gewa (Excoecaria agallocha)", "Kankra (Bruguiera gymnorhiza)"],
    biodiversityFocus: "Royal Bengal Tiger habitat preservation & coastal estuarine fish breeding grounds",
    costPerTree: "₹150"
  },
  {
    id: "agroforestry",
    name: "Western Ghats Agroforestry Corridor",
    category: "Agroforestry",
    location: "Chikmagalur & Wayanad",
    description: "Integrating high-value, native fruit-bearing trees into marginal agricultural farms. Enhances soil moisture retention, provides sustainable farmer income, and offsets corporate footprint.",
    sequestrationMultiplier: "22.8 kg CO2e/tree/year",
    activeFarmers: 5200,
    plantedCount: "910,220",
    targetCount: "1,500,000",
    species: ["Teak (Tectona grandis)", "Wild Jack (Artocarpus hirsutus)", "Malabar Kino (Pterocarpus marsupium)"],
    biodiversityFocus: "Avian corridors, elephant corridor buffering, and local soil fertility restoration",
    costPerTree: "₹120"
  },
  {
    id: "urban-forestry",
    name: "Aravali Green Wall & Urban Micro-Forests",
    category: "Urban Forestry",
    location: "Gurugram & Faridabad",
    description: "Developing dense Miyawaki-style micro-forests along metropolitan lines to reduce heat island effects, filter particulate dust (PM2.5), and create green urban biodiversity islands.",
    sequestrationMultiplier: "14.5 kg CO2e/tree/year",
    activeFarmers: 1650,
    plantedCount: "412,400",
    targetCount: "800,000",
    species: ["Khejri (Prosopis cineraria)", "Babul (Acacia nilotica)", "Dhok (Anogeissus pendula)"],
    biodiversityFocus: "Local temperature buffering, dust filtration corridors, and urban water recharge",
    costPerTree: "₹180"
  },
  {
    id: "wildfire",
    name: "Himalayan Post-Wildfire Regeneration",
    category: "Post-Wildfire Restoration",
    location: "Garhwal Foothills, Uttarakhand",
    description: "Revegetating mountainsides scorched by forest fires. Restoring oak and mixed native broadleaf canopies to suppress invasive pine dominance and stabilize steep landslides.",
    sequestrationMultiplier: "18.9 kg CO2e/tree/year",
    activeFarmers: 2180,
    plantedCount: "624,800",
    targetCount: "1,200,000",
    species: ["Himalayan Oak (Quercus leucotrichophora)", "Deodar Pine (Cedrus deodara)", "Rhododendron"],
    biodiversityFocus: "Invasive weed suppression, landslide control, and fresh mountain spring recharging",
    costPerTree: "₹140"
  },
  {
    id: "kelp",
    name: "Arabian Sea Offshore Kelp Meadows",
    category: "Kelp Ecosystems",
    location: "Offshore Ratnagiri, Maharashtra",
    description: "Marine carbon capture through coastal macro-algae restoration. Kelp meadows capture carbon up to 20x faster than terrestrial forests, providing marine biodiversity buffers.",
    sequestrationMultiplier: "48.2 kg CO2e/equivalent/year",
    activeFarmers: 890,
    plantedCount: "310,000",
    targetCount: "600,000",
    species: ["Brown Kelp (Ecklonia)", "Sargassum weed", "Eelgrass (Zostera)"],
    biodiversityFocus: "Ocean acidification buffering, fish nursery ecosystems, and blue carbon asset registry",
    costPerTree: "₹200"
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [sponsorTrees, setSponsorTrees] = useState("1000");
  const [corporateName, setCorporateName] = useState("");
  const [sponsorshipSubmitted, setSponsorshipSubmitted] = useState(false);

  const handleOpenSponsorModal = (project: ProjectType) => {
    setSelectedProject(project);
    setSponsorshipSubmitted(false);
  };

  const handleSubmitSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateName) return;
    setSponsorshipSubmitted(true);
  };

  const calculateCost = (trees: string, costPerTree: string) => {
    const count = parseInt(trees) || 0;
    const cost = parseInt(costPerTree.replace("₹", "")) || 0;
    return (count * cost).toLocaleString("en-IN");
  };

  const calculateCarbon = (trees: string, multiplier: string) => {
    const count = parseInt(trees) || 0;
    const rate = parseFloat(multiplier.split(" ")[0]) || 0;
    return ((count * rate) / 1000).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      <section className="pt-28 pb-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-800">
              Active Environmental Asset Portfolios
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              Specialized Plantation Ecosystems
            </h1>
            <p className="text-lg text-slate-650">
              Sponsor specific afforestation assets to align with Schedule VII goals, carbon footprint offsets, and local bio-corridor restoration.
            </p>
          </div>

          {/* Projects List Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projectsList.map((project) => {
              const percentage = Math.round(
                (parseInt(project.plantedCount.replace(/,/g, "")) / 
                 parseInt(project.targetCount.replace(/,/g, ""))) * 100
              );

              return (
                <div 
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all hover:border-emerald-450"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-850 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mt-2">
                          {project.name}
                        </h3>
                        <p className="text-xs text-slate-550 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Planted Assets: {project.plantedCount}</span>
                        <span>Goal: {project.targetCount}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Progress: {percentage}% Completed</span>
                        <span>Active Farmers Onboarded: {project.activeFarmers}</span>
                      </div>
                    </div>

                    {/* Meta info tags */}
                    <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-4 text-xs">
                      <div>
                        <span className="text-slate-500 block">Carbon Multiplier</span>
                        <span className="font-bold text-emerald-705 flex items-center gap-1 mt-0.5">
                          <TrendingUp className="h-4 w-4" />
                          {project.sequestrationMultiplier}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Biodiversity Target</span>
                        <span className="font-bold text-slate-900 line-clamp-2 mt-0.5">
                          {project.biodiversityFocus}
                        </span>
                      </div>
                    </div>

                    {/* Target Species List */}
                    <div className="space-y-2">
                      <span className="text-xxs font-bold text-slate-500 uppercase tracking-widest block">Core Species Mix</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.species.map((sp) => (
                          <span 
                            key={sp}
                            className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fund Trigger Button */}
                  <div className="pt-6 mt-6 border-t border-slate-150 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Afforestation cost</span>
                      <span className="text-lg font-bold text-slate-900">{project.costPerTree} / tree</span>
                    </div>
                    <button
                      onClick={() => handleOpenSponsorModal(project)}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-650 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      Sponsor Project
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Modal Drawer for Sponsorship */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-205 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {!sponsorshipSubmitted ? (
              <form onSubmit={handleSubmitSponsorship} className="space-y-6">
                <div>
                  <span className="text-xxs font-bold text-emerald-800 uppercase tracking-wider block">CSR Impact Allocation</span>
                  <h3 className="text-xl font-extrabold text-slate-950 mt-1">{selectedProject.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Sponsor local tree planting and generate auditable carbon assets.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Sponsoring Corporation Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Infosys Ltd."
                      value={corporateName}
                      onChange={(e) => setCorporateName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Trees Sponsorship Quantity</label>
                      <input
                        type="number"
                        min="10"
                        required
                        value={sponsorTrees}
                        onChange={(e) => setSponsorTrees(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-750 block">Compliance Category</span>
                      <span className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg text-slate-700 block text-center mt-0.5">
                        Schedule VII Compliant
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Ledger Cost Preview */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-550">Cost Per Tree:</span>
                    <span className="font-bold text-slate-900">{selectedProject.costPerTree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-550">Sponsorship Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{calculateCost(sponsorTrees, selectedProject.costPerTree)}</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-150 pt-2 text-emerald-850">
                    <span className="font-bold">Est. Carbon Offset Rate:</span>
                    <span className="font-extrabold">{calculateCarbon(sponsorTrees, selectedProject.sequestrationMultiplier)} tCO2e / year</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <Coins className="h-4.5 w-4.5 mr-1.5" />
                    Authorize Escrow Allocation
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-center py-6">
                <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100 inline-block">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Escrow Authorized Successfully</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    Corporate sponsorship of <strong>{sponsorTrees} trees</strong> for the <strong>{selectedProject.category}</strong> is committed under:
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    Sponsor: {corporateName} <br />
                    Registry ID: EMER-TX-MOCK-{Math.floor(Math.random() * 90000) + 10000}
                  </p>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <Link
                    href="/dashboard/corporate"
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    View Corporate Portfolio
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
