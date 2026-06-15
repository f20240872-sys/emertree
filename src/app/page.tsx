"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TreePine, 
  Users, 
  Building2, 
  Coins, 
  Map, 
  TrendingUp, 
  FileCheck, 
  Check, 
  ArrowRight, 
  Download, 
  MapPin, 
  Globe, 
  Layers, 
  Zap, 
  Sparkles,
  ChevronRight,
  Database,
  ArrowUpRight,
  FileSpreadsheet,
  Terminal,
  Key,
  Play,
  Copy
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data for India Plantation Network Map
interface ProjectCluster {
  id: string;
  name: string;
  region: string;
  x: number; // SVG X percentage
  y: number; // SVG Y percentage
  treesPlanted: string;
  farmersCount: number;
  carbonOffset: string;
  species: string[];
  ecosystem: string;
}

interface ApiEndpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  auth: string;
  fields: string[];
  response: string;
}

const projectClusters: ProjectCluster[] = [
  {
    id: "himalayas",
    name: "Himalayan Foothills Initiative",
    region: "Uttarakhand & Himachal Pradesh",
    x: 45,
    y: 18,
    treesPlanted: "624,800",
    farmersCount: 2180,
    carbonOffset: "14,990 tCO2e/yr",
    species: ["Himalayan Cedar", "Oak", "Deodar Pine"],
    ecosystem: "Post-Wildfire & Soil Stabilization"
  },
  {
    id: "aravali",
    name: "Aravali Green Wall Project",
    region: "Rajasthan & Haryana",
    x: 35,
    y: 32,
    treesPlanted: "412,400",
    farmersCount: 1650,
    carbonOffset: "9,890 tCO2e/yr",
    species: ["Khejri", "Babul", "Dhok"],
    ecosystem: "Urban Forestry & Anti-Desertification"
  },
  {
    id: "western-ghats",
    name: "Western Ghats Biodiversity Corridor",
    region: "Karnataka & Kerala",
    x: 39,
    y: 72,
    treesPlanted: "910,220",
    farmersCount: 5200,
    carbonOffset: "22,800 tCO2e/yr",
    species: ["Teak", "Rosewood", "Wild Jack", "Malabar Kino"],
    ecosystem: "Agroforestry & Rainforest Conservation"
  },
  {
    id: "sundarbans",
    name: "Sundarbans Coastal Safeguard",
    region: "West Bengal Delta",
    x: 75,
    y: 46,
    treesPlanted: "534,500",
    farmersCount: 3420,
    carbonOffset: "11,260 tCO2e/yr",
    species: ["Sundari Mangrove", "Gewa", "Kankra"],
    ecosystem: "Mangrove Restoration & Coastal Defense"
  },
  {
    id: "kelp-coast",
    name: "Arabian Sea Kelp Meadows",
    region: "Offshore Maharashtra & Gujarat",
    x: 24,
    y: 52,
    treesPlanted: "310,000",
    farmersCount: 890,
    carbonOffset: "16,400 tCO2e/yr",
    species: ["Brown Kelp", "Sea Grass", "Sargassum"],
    ecosystem: "Kelp Ecosystems & Marine Carbon Capture"
  }
];

const apiEndpoints: ApiEndpoint[] = [
  {
    id: "donations",
    method: "POST",
    path: "/v1/donations",
    description: "Create a corporate sponsorship allocation and lock the Schedule VII compliance tag.",
    auth: "Bearer Corporate API Key",
    fields: ["corporateId", "projectId", "amount", "targetTreeCount"],
    response: "donationId, escrowStatus, blockchainTx, complianceCode"
  },
  {
    id: "trees",
    method: "POST",
    path: "/v1/trees",
    description: "Register a planted sapling with geotags, species metadata, farmer assignment, and photo proof.",
    auth: "Bearer NGO Partner Key",
    fields: ["donationId", "farmerId", "latitude", "longitude", "speciesName"],
    response: "treeId, ipfsHash, ledgerIndex, verified"
  },
  {
    id: "impact-report",
    method: "GET",
    path: "/v1/impact-report",
    description: "Retrieve verified totals, survival rates, active farmers, and carbon offset registers.",
    auth: "Bearer Reader Key",
    fields: ["corporateId", "includeAuditTrail"],
    response: "totalTreesPlanted, verifiedSurvivalRate, carbonOffsetTotal"
  },
  {
    id: "certificate",
    method: "GET",
    path: "/v1/certificate",
    description: "Fetch signed impact certificates for board decks, audits, and public verification URLs.",
    auth: "Bearer Corporate API Key",
    fields: ["donationId", "format"],
    response: "certificateId, signatureHash, publicVerificationUrl"
  }
];

export default function LandingPage() {
  const [selectedCluster, setSelectedCluster] = useState<ProjectCluster>(projectClusters[2]); // Western Ghats default
  const [treeGrowthStage, setTreeGrowthStage] = useState(0); // 0: Seed, 1: Sprout, 2: Sapling, 3: Mature, 4: Canopy
  const [activeStep, setActiveStep] = useState(0);
  const [activeApi, setActiveApi] = useState<ApiEndpoint>(apiEndpoints[0]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [mapLayer, setMapLayer] = useState<"clusters" | "heatmap" | "satellite">("clusters");

  // Growth Simulator Data
  const growthStages = [
    { name: "Seedling Stage", age: "0-3 Months", height: "5-10 cm", co2: "0.2 kg/yr", image: "🌱", desc: "Monitored in a regional NGO nursery. Farmer prepared with soil enhancements." },
    { name: "Sapling Stage", age: "6-12 Months", height: "1-1.5 m", co2: "4.5 kg/yr", image: "🌿", desc: "Transplanted to agroforestry farm. Geo-tag registered on IPFS ledger." },
    { name: "Young Tree", age: "2-4 Years", height: "3-5 m", co2: "12.8 kg/yr", image: "🌴", desc: "Strong root systems established. Drone-based satellite survival checks active." },
    { name: "Mature Tree", age: "5-10 Years", height: "10-15 m", co2: "22.0 kg/yr", image: "🌳", desc: "Fully contributing to regional water tables and carbon carbon sequestration assets." },
    { name: "Forest Canopy", age: "15+ Years", height: "20m+", co2: "35.5 kg/yr", image: "🌲", desc: "Forming high-density forest canopies, maximizing bio-diverse habitats." }
  ];

  // Lifecycle steps
  const steps = [
    { title: "Corporate Donation", desc: "Corporates define carbon offset targets and transfer funds transparently.", icon: Coins },
    { title: "Project Created", desc: "NGO sponsors receive funds and verify plantation boundaries and species mix.", icon: Building2 },
    { title: "Farmer Assigned", desc: "Local marginal farmers are hired, trained, and provided trees to plant.", icon: Users },
    { title: "Trees Planted", desc: "Saplings are planted in agroforestry plots during local monsoon seasons.", icon: TreePine },
    { title: "Geo-tagged", desc: "Every sapling is mapped with absolute latitude/longitude and high-res photos.", icon: MapPin },
    { title: "Monitored", desc: "NGOs and satellite passes track survival and canopy density bi-annually.", icon: Map },
    { title: "Carbon Generated", desc: "Validated growth data computes verified carbon offset certificates.", icon: TrendingUp },
    { title: "ESG Report Produced", desc: "Immutable reports sync directly into corporate compliance dashboards.", icon: FileCheck },
  ];

  // Report download generator trigger
  const handleGenerateReport = (type: string) => {
    setSelectedReport(type);
    setGeneratingReport(true);
    setReportSuccess(false);
    setGenerationProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generatingReport) {
      interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setGeneratingReport(false);
            setReportSuccess(true);
            return 100;
          }
          return prev + 25;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [generatingReport]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-28 pb-20 overflow-hidden bg-grid-pattern scroll-mt-24">
        {/* Ambient Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-150/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>India's Leading Enterprise ESG Afforestation Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Plant. Track. Verify. <br />
                <span className="text-gradient">Create Measurable</span> <br />
                Environmental Impact.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-650 leading-relaxed max-w-xl">
                Connect corporates, NGOs, and farmers through a transparent tree plantation ecosystem with real-time monitoring, ESG reporting, and blockchain-backed traceability.
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/dashboard/corporate?action=new"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start a CSR Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Explore Impact
                </a>
              </div>

              {/* Dynamic Hero Live Counters */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200">
                <div>
                  <p className="text-2xl font-bold text-emerald-700">2.48M+</p>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Trees Planted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-700">12,450+</p>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Farmers Supported</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-700">140+</p>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Brands Offset</p>
                </div>
              </div>
            </div>

            {/* Right Hero Content: India Plantation Network Map Interactive Preview */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-slate-150">
                <div>
                  <h3 className="font-bold text-slate-900">National Plantation Network Map</h3>
                  <p className="text-xs text-slate-500">Click markers to check regional project statistics</p>
                </div>
                <div className="bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-1.5"></span>
                  Active Monitoring
                </div>
              </div>

              {/* India SVG map with markers */}
              <div className="relative h-96 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
                {/* SVG Outline Map of India (Simplified representation) */}
                <svg viewBox="0 0 100 100" className="h-full w-auto text-slate-200 fill-slate-100 stroke-slate-300 stroke-1">
                  {/* Simplified India Path representation */}
                  <path d="M45,5 L48,10 L50,8 L55,10 L58,15 L52,18 L50,22 L54,26 L48,30 L45,35 L42,30 L40,32 L38,35 L33,35 L30,40 L28,45 L25,48 L22,42 L20,45 L15,48 L23,53 L24,58 L28,62 L32,68 L36,75 L38,82 L39,88 L40,94 L42,88 L43,80 L44,72 L46,65 L48,58 L54,58 L58,62 L64,68 L66,60 L70,55 L74,52 L76,46 L78,40 L72,40 L68,36 L65,33 L62,28 L58,25 L54,22 L50,18 L48,15 L45,5 Z" />
                </svg>

                {/* Plot Cluster Markers */}
                {projectClusters.map((cluster) => (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster)}
                    style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-305 focus:outline-hidden ${
                      selectedCluster.id === cluster.id 
                        ? "bg-emerald-650 text-white scale-125 z-20 shadow-md ring-4 ring-emerald-500/20" 
                        : "bg-white text-emerald-600 border border-emerald-350 scale-100 z-10 hover:scale-110 hover:z-20 shadow-xs"
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                  </button>
                ))}

                {/* Floating Map Legend */}
                <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xxs font-medium shadow-xs">
                  <div className="flex items-center space-x-1.5 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                    <span>Afforestation Assets</span>
                  </div>
                </div>
              </div>

              {/* Cluster Detail Overlay */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xxs font-bold uppercase tracking-wider text-emerald-700">Selected Hub</span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{selectedCluster.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                    {selectedCluster.region}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:text-right">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Planted Assets</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{selectedCluster.treesPlanted} Trees</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Carbon Sequestration</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-655">{selectedCluster.carbonOffset}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / METRICS SECTION */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Measurable, Auditable, and Scalable Ecological Assets
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xxs">
              <div className="inline-flex p-2 bg-emerald-50 text-emerald-600 rounded-lg mb-2">
                <TreePine className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-slate-950">2,481,920</p>
              <p className="text-xs font-semibold text-slate-500">Trees Planted</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xxs">
              <div className="inline-flex p-2 bg-emerald-50 text-emerald-600 rounded-lg mb-2">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-slate-950">12,450</p>
              <p className="text-xs font-semibold text-slate-500">Farmers Supported</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xxs">
              <div className="inline-flex p-2 bg-emerald-50 text-emerald-600 rounded-lg mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-slate-950">142</p>
              <p className="text-xs font-semibold text-slate-500">Corporate Partners</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xxs">
              <div className="inline-flex p-2 bg-emerald-50 text-emerald-600 rounded-lg mb-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-slate-950">58,940</p>
              <p className="text-xs font-semibold text-slate-500">tCO2e Sequestered</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xxs col-span-2 md:col-span-1">
              <div className="inline-flex p-2 bg-emerald-50 text-emerald-600 rounded-lg mb-2">
                <Map className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-slate-950">87</p>
              <p className="text-xs font-semibold text-slate-500">Active Projects</p>
            </div>

          </div>
        </div>
      </section>

      {/* TREE GROWTH SIMULATOR INTERACTIVE PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Interactive Tree Growth Simulator
            </h2>
            <p className="text-slate-650">
              Understand the carbon sequestration potential of native species from seedling stage to mature forest canopy assets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 rounded-3xl border border-slate-200">
            
            {/* Visualizer Window */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center h-80 bg-white rounded-2xl border border-slate-200/80 p-6 relative overflow-hidden shadow-xs">
              <div className="absolute top-4 left-4 bg-slate-100 px-3 py-1 rounded-full text-xxs font-bold text-slate-600 uppercase tracking-wider">
                Ecosystem Health Check
              </div>
              
              <motion.div 
                key={treeGrowthStage}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-8xl mb-6 filter drop-shadow-md select-none"
              >
                {growthStages[treeGrowthStage].image}
              </motion.div>
              
              <div className="text-center">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-100">
                  {growthStages[treeGrowthStage].age}
                </span>
                <h4 className="font-extrabold text-slate-900 mt-2 text-lg">{growthStages[treeGrowthStage].name}</h4>
              </div>
            </div>

            {/* Information Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Afforestation Lifecycle Metric</h3>
                <p className="text-sm text-slate-600">Select development phases to view height measurements, carbon absorption, and monitoring logistics:</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {growthStages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTreeGrowthStage(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      treeGrowthStage === idx
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Phase {idx + 1}: {stage.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-250 pt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Height Asset</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">{growthStages[treeGrowthStage].height}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Carbon Sequestration</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-650">{growthStages[treeGrowthStage].co2}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Verification Status</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">Drone / Satellite</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/60">
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  <strong>Operations Log:</strong> {growthStages[treeGrowthStage].desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION (Interactive Process Flow) */}
      <section id="lifecycle" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              End-to-End Plantation Workflow
            </h2>
            <p className="text-slate-650">
              How Emertrees connects corporate sponsors, NGOs, farmers, and validation protocols in a seamless environmental asset framework.
            </p>
          </div>

          {/* Interactive Step Navigator */}
          <div className="grid grid-cols-2 md:grid-cols-8 gap-2 mb-12">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all focus:outline-hidden ${
                    activeStep === idx
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <StepIcon className="h-5 w-5 mb-1.5" />
                  <span className="text-[10px] font-bold block leading-tight">Step {idx + 1}</span>
                  <span className="text-[9px] opacity-80 truncate max-w-full">{step.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Phase {activeStep + 1} of 8
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {steps[activeStep].desc}
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <Link
                  href="#lifecycle"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center"
                >
                  Explore Detailed Lifecycle Trace
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full md:w-80 flex flex-col space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-xxs font-bold text-slate-500 uppercase">Verification Registry</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Status: Completed
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Record Schema:</span>
                  <span className="font-mono text-slate-800">EMER-ST-{activeStep + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Node Sync:</span>
                  <span className="font-bold text-slate-850">Validated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Audit Trail:</span>
                  <span className="font-mono text-emerald-700 truncate w-32 text-right">ipfs://QmXyT...4vB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM MODULES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Modern Enterprise Platform Modules
            </h2>
            <p className="text-slate-650">
              Robust tools engineered for compliance managers, forestry auditors, field coordinators, and audit committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* CSR Management */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-605 p-3 rounded-xl inline-block mb-4">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">CSR Management</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Seamless project planning, multi-ngo budget allocation, and Schedule VII compliance tracking tailored to Indian legal standards.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Project allocation & milestone logs</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Section 135 compliance checks</li>
              </ul>
            </div>

            {/* Farmer Network */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-605 p-3 rounded-xl inline-block mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Farmer Network</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Marginal farmer onboarding, site ownership verification, coordinate mapping, and verified digital payment tracking.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> End-to-end regional onboarding</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Direct-to-farmer bank tracking</li>
              </ul>
            </div>

            {/* Tree Monitoring */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-650 p-3 rounded-xl inline-block mb-4">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tree Monitoring</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                High-precision GPS tagging of individual trees, survival tracking checklists, and canopy density inspection tools.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Individual coordinates ledger</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Drone & satellite audit reviews</li>
              </ul>
            </div>

            {/* Blockchain Verification */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-650 p-3 rounded-xl inline-block mb-4">
                <Database className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Blockchain Verification</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Decentralized audit records preventing impact double-counting. Tree history, photos, and updates are committed to immutable blocks.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Double-counting protection</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Public IPFS verification hash log</li>
              </ul>
            </div>

            {/* Impact Analytics */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-650 p-3 rounded-xl inline-block mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Impact Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Accurate carbon calculations based on tree height/species, custom ESG dashboards, and audit-ready sustainability graphs.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Dynamic carbon sequestration model</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Board-ready PDF generation</li>
              </ul>
            </div>

            {/* Certificates */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xxs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="bg-emerald-50 text-emerald-650 p-3 rounded-xl inline-block mb-4">
                <FileCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certificates</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Secure digital certificates with cryptographically signed verification records, ideal for corporate stakeholders and donors.
              </p>
              <ul className="text-xs space-y-2 text-slate-650">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Signed environmental assets</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-emerald-600" /> Unique QR-code validation</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. EMERTREES FEATURE MATRIX */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Emertrees Feature Matrix
            </h2>
            <p className="text-slate-650">
              A single view of the operational modules built into the Emertrees afforestation platform.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xxs">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-slate-550 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100">Capability</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50/50">Emertrees Module</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50">Operational Detail</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="p-4 font-bold text-slate-850">End-to-End Farmer Onboarding</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">Farmer Registry</td>
                  <td className="p-4 text-slate-600">Identity checks, plot assignment, bank payment tracking, and regional NGO handoff.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Active</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">India-First CSR Workflow</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">CSR Compliance Engine</td>
                  <td className="p-4 text-slate-600">Schedule VII tagging, Section 135 checks, escrow allocation, and milestone logs.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Built in</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">Blockchain Audit Trail</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">IPFS Ledger Records</td>
                  <td className="p-4 text-slate-600">Tree history, coordinates, media proofs, and updates committed to immutable records.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Verifiable</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">ESG Compliance Reporting</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">Report Generator</td>
                  <td className="p-4 text-slate-600">CSR-2 sheets, BRSR statements, carbon ledgers, and signed audit exports.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Export ready</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">Carbon Credit Readiness</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">Biomass Model v2.1</td>
                  <td className="p-4 text-slate-600">Species, age, canopy, survival, and regional sequestration calculations.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Modelled</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">Plantation & Marine Assets</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">Asset Portfolio</td>
                  <td className="p-4 text-slate-600">Agroforestry, mangrove, urban forest, wildfire restoration, and kelp programs.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Multi-asset</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-850">Corporate API Integrations</td>
                  <td className="p-4 text-emerald-650 bg-emerald-50/20 font-semibold">OpenAPI Suite</td>
                  <td className="p-4 text-slate-600">Donation triggers, tree registration, impact reports, and certificate retrieval.</td>
                  <td className="p-4 text-emerald-650 font-semibold"><Check className="h-5 w-5 text-emerald-650 inline mr-1" /> Documented</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PROJECTS / INTERACTIVE IMPACT MAP SECTION */}
      <section id="projects" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Live Asset Registry</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Interactive Impact Map</h2>
              <p className="text-slate-650">Verify coordinates, species density, and health parameters across selected hubs.</p>
            </div>
            
            {/* Map Layer Controller */}
            <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-205">
              <button
                onClick={() => setMapLayer("clusters")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mapLayer === "clusters" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="h-3.5 w-3.5 inline mr-1.5" />
                3D Clusters
              </button>
              <button
                onClick={() => setMapLayer("heatmap")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mapLayer === "heatmap" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Zap className="h-3.5 w-3.5 inline mr-1.5" />
                Heat Map
              </button>
              <button
                onClick={() => setMapLayer("satellite")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mapLayer === "satellite" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe className="h-3.5 w-3.5 inline mr-1.5" />
                Satellite Overlay
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Large Interactive Map Visualizer */}
            <div className="lg:col-span-8 bg-slate-50 h-[450px] rounded-3xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
              
              {/* Layer Simulation Overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
              
              {mapLayer === "clusters" && (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300">
                  {/* Custom Graphic Grid of India Projects */}
                  <svg className="w-full h-full p-8 text-slate-200 stroke-slate-350 stroke-1 stroke-dasharray-2 fill-emerald-50/5" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-slate-300 fill-slate-50/10" />
                    <circle cx="39" cy="72" r="6" className="fill-emerald-100/30 stroke-emerald-600 stroke-2" />
                    <circle cx="39" cy="72" r="2" className="fill-emerald-650" />
                    <circle cx="75" cy="46" r="4" className="fill-emerald-100/30 stroke-emerald-600 stroke-2" />
                    <circle cx="75" cy="46" r="2" className="fill-emerald-650" />
                    <circle cx="45" cy="18" r="5" className="fill-emerald-100/30 stroke-emerald-600 stroke-2" />
                    <circle cx="45" cy="18" r="2" className="fill-emerald-650" />
                    <line x1="39" y1="72" x2="75" y2="46" className="stroke-emerald-450 stroke-dashed" />
                    <line x1="45" y1="18" x2="39" y2="72" className="stroke-emerald-450 stroke-dashed" />
                  </svg>
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 rounded-xl border border-slate-200 text-center shadow-md">
                    <span className="text-xxs font-bold text-emerald-800 uppercase block tracking-wider">Himalayan Corridor</span>
                    <span className="text-xs font-bold text-slate-800">45 Active GPS Logs</span>
                  </div>
                </div>
              )}

              {mapLayer === "heatmap" && (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300 bg-emerald-50/10">
                  {/* Heatmap overlay representation */}
                  <div className="w-48 h-48 rounded-full bg-emerald-500/25 absolute top-1/3 left-1/3 blur-xl"></div>
                  <div className="w-64 h-64 rounded-full bg-teal-500/20 absolute bottom-1/4 right-1/4 blur-2xl"></div>
                  <div className="w-32 h-32 rounded-full bg-emerald-650/30 absolute top-1/2 left-1/2 blur-lg"></div>
                  <div className="absolute bottom-4 right-4 bg-white/95 p-3 rounded-lg border border-slate-200 text-xxs shadow-xs">
                    <span className="font-bold text-slate-900 block mb-1">Carbon Density Index</span>
                    <div className="w-32 h-2 bg-gradient-to-right from-emerald-100 via-emerald-500 to-emerald-800 rounded-full"></div>
                    <div className="flex justify-between mt-1 text-slate-500">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              )}

              {mapLayer === "satellite" && (
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300 bg-slate-900">
                  {/* Dark-satellite visual simulation */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80"></div>
                  <svg className="w-full h-full p-12 text-slate-800 stroke-emerald-700/60 fill-none" viewBox="0 0 100 100">
                    <path d="M10,10 H90 V90 H10 Z" className="stroke-slate-700" />
                    <circle cx="50" cy="50" r="30" className="stroke-emerald-600/30" />
                    <line x1="10" y1="50" x2="90" y2="50" className="stroke-slate-800" />
                    <line x1="50" y1="10" x2="50" y2="90" className="stroke-slate-800" />
                    {/* Simulated coordinates scanner crosshair */}
                    <circle cx="39" cy="72" r="1.5" className="fill-emerald-400 animate-ping" />
                    <circle cx="39" cy="72" r="0.5" className="fill-emerald-400" />
                  </svg>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xxs font-mono text-emerald-400">
                    LAT: 12.9716° N / LON: 77.5946° E
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xxs font-mono text-slate-300">
                    Orbital Pass: LANDSAT-9 • Resolution: 15m
                  </div>
                </div>
              )}

              {/* Floating Layer Tag */}
              <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full border border-slate-200 text-xxs font-bold text-slate-750 shadow-xs uppercase tracking-wider">
                {mapLayer === "clusters" && "Plot clusters View"}
                {mapLayer === "heatmap" && "Eco-density Heatmap"}
                {mapLayer === "satellite" && "Satellite Pass Overlay"}
              </div>

            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-950 text-base">Afforestation Regions</h3>
                <p className="text-xs text-slate-500">Verify direct compliance statistics for key Indian operational hubs:</p>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {projectClusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      onClick={() => setSelectedCluster(cluster)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedCluster.id === cluster.id
                          ? "bg-white border-emerald-500 shadow-xs"
                          : "bg-slate-100/50 hover:bg-white border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-slate-900">{cluster.name}</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                          {cluster.treesPlanted}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">{cluster.region}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Cluster Details card */}
              <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100 space-y-3">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Audit Parameters</span>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Ecosystem</span>
                    <span className="font-bold text-slate-900">{selectedCluster.ecosystem}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Farmers Logged</span>
                    <span className="font-bold text-slate-900">{selectedCluster.farmersCount} Active</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block mb-1">Target Species Array</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCluster.species.map((sp) => (
                        <span key={sp} className="bg-white px-2 py-0.5 rounded-md border border-emerald-100 text-[10px] font-medium text-emerald-900">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. ESG REPORTING SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Generator App */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Stakeholder Transparency</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Downloadable Audit & ESG Reports</h2>
              <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
                Generate and download Board-Ready CSR-2 compliance sheets, BRSR format reports, and carbon asset statements synced with our blockchain ledger records.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleGenerateReport("CSR Report (Schedule VII)")}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all hover:shadow-xs group focus:outline-hidden"
                >
                  <FileSpreadsheet className="h-6 w-6 text-slate-500 group-hover:text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm">CSR Audit Sheets</h4>
                  <p className="text-[10px] text-slate-550 mt-1">Schedule VII CSR-2 Compliant</p>
                </button>

                <button
                  onClick={() => handleGenerateReport("ESG Performance Statement")}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all hover:shadow-xs group focus:outline-hidden"
                >
                  <Building2 className="h-6 w-6 text-slate-500 group-hover:text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm">BRSR Core Matrix</h4>
                  <p className="text-[10px] text-slate-550 mt-1">Corporate SEBI disclosure ready</p>
                </button>

                <button
                  onClick={() => handleGenerateReport("Carbon Mitigation Register")}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all hover:shadow-xs group focus:outline-hidden"
                >
                  <TrendingUp className="h-6 w-6 text-slate-500 group-hover:text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm">Carbon Ledgers</h4>
                  <p className="text-[10px] text-slate-550 mt-1">Co2 Sequestration models</p>
                </button>

                <button
                  onClick={() => handleGenerateReport("IPFS Audit Ledger Hash")}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all hover:shadow-xs group focus:outline-hidden"
                >
                  <Database className="h-6 w-6 text-slate-500 group-hover:text-emerald-600 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm">Audit Reports</h4>
                  <p className="text-[10px] text-slate-550 mt-1">Signed IPFS hashes</p>
                </button>
              </div>
            </div>

            {/* Right Column: Loading progress simulator / Visual output */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col justify-between h-[360px]">
              <div className="border-b border-slate-150 pb-4 flex justify-between items-center">
                <span className="text-xxs font-bold text-slate-550 uppercase">Emertrees Compliance Engine</span>
                <span className="text-xxs font-mono text-slate-400">BUILD: v2.4.1</span>
              </div>

              <AnimatePresence mode="wait">
                {generatingReport ? (
                  <motion.div 
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 my-auto"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                    <div className="text-center">
                      <h4 className="font-bold text-slate-800 text-sm">Compiling Ledger Data...</h4>
                      <p className="text-xs text-slate-500 mt-1">Generating verified report for: {selectedReport}</p>
                    </div>
                    <div className="w-64 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full transition-all duration-300" style={{ width: `${generationProgress}%` }} />
                    </div>
                  </motion.div>
                ) : reportSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 my-auto text-center"
                  >
                    <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 border border-emerald-100">
                      <FileCheck className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">Report Generated Successfully</h4>
                      <p className="text-xs text-slate-500 mt-1">Cryptographic checksum verified and compiled.</p>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <a
                        href="/dashboard/corporate"
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download PDF
                      </a>
                      <Link
                        href="/dashboard/blockchain"
                        className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Database className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        View Verification Record
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 my-auto text-center py-6"
                  >
                    <div className="bg-slate-50 p-4 rounded-full border border-slate-100 text-slate-400">
                      <FileSpreadsheet className="h-8 w-8 text-slate-400" />
                    </div>
                    <div className="max-w-md">
                      <h4 className="font-bold text-slate-900 text-sm">Ready to Export</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Select a report on the left panel. The compiler will aggregate farmer logs, coordinate sets, and carbon parameters, producing a signed compliance export.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] text-slate-400 font-mono">
                <span>SEBI BRSR Compliant</span>
                <span>SHA-256 Secured Ledger</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CASE STUDIES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Corporate Impact Stories
            </h2>
            <p className="text-slate-650">
              How leading organizations achieve Schedule VII compliance and ESG board alignment using the Emertrees platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Case Study 1 */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xxs">
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xxs font-bold text-emerald-800 uppercase tracking-wider">
                    Agroforestry Focus
                  </span>
                  <span className="text-xxs font-mono text-slate-400">ID: E-CS-422</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  Western Ghats Rural Agroforestry Hub
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Infosys partnered to sponsor 500,000 native fruit-bearing trees over 2,000 marginal farms. The project generated sustained micro-income for farming households while offsetting 11,000 tCO2e of operational emissions.
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-xs">
                  <div>
                    <span className="text-slate-500 block">Trees Planted</span>
                    <span className="font-extrabold text-slate-900">500,000</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Farmers Active</span>
                    <span className="font-extrabold text-slate-900">2,150</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Audit Score</span>
                    <span className="font-extrabold text-emerald-705">99.4% Survival</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Supported by: Infosys CSR division</span>
                <Link href="#lifecycle" className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center">
                  Verify Blockchain Ledger
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xxs">
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xxs font-bold text-emerald-800 uppercase tracking-wider">
                    Coastal Restoration
                  </span>
                  <span className="text-xxs font-mono text-slate-400">ID: E-CS-108</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  Sundarbans Delta Mangrove Safeguard
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  TCS sponsored the planting of 300,000 mangrove saplings to restore degraded delta corridors. The local community was onboarded for geo-tagging and bi-annual growth verification, buffering storm impacts.
                </p>
                <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-xs">
                  <div>
                    <span className="text-slate-500 block">Trees Planted</span>
                    <span className="font-extrabold text-slate-900">300,000</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Farmers Active</span>
                    <span className="font-extrabold text-slate-900">1,420</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Mitigation Rate</span>
                    <span className="font-extrabold text-emerald-705">6,800 tCO2e/yr</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Supported by: TCS Foundation</span>
                <Link href="#lifecycle" className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center">
                  Verify Blockchain Ledger
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. SPONSORSHIP & PROGRAMS SECTION (No Pricing) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Impact Sponsorship & Programs
            </h2>
            <p className="text-slate-650">
              Tailored ecological solutions to align corporate Schedule VII requirements with rigorous board-level ESG auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: CSR Programs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xxs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Compliance First</span>
                <h3 className="text-lg font-bold text-slate-950">CSR Programs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered specifically for Schedule VII under Sec 135 of the Indian Companies Act. 100% auditable spending, local NGO partner mapping, and automated CSR-2 tax reporting modules.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/dashboard/corporate?action=csr"
                  className="w-full text-center inline-block px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Configure CSR Target
                </Link>
              </div>
            </div>

            {/* Card 2: Enterprise ESG */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xxs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Board Aligned</span>
                <h3 className="text-lg font-bold text-slate-950">Enterprise ESG Programs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real-time carbon offset ledgers, SEBI BRSR Core compliance mappings, API integrations for scope 1-3 tracking, and continuous satellite canopy verification streams.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/dashboard/corporate?action=esg"
                  className="w-full text-center inline-block px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Initiate ESG Audit
                </Link>
              </div>
            </div>

            {/* Card 3: Custom Impact */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xxs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Ecosystem Specific</span>
                <h3 className="text-lg font-bold text-slate-950">Custom Impact Initiatives</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sponsor unique environmental assets including mangrove buffers for coastal areas, marine kelp restoration corridors, post-wildfire tree stabilization, and urban forest planting blocks.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="#projects"
                  className="w-full text-center inline-block px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Browse Projects
                </Link>
              </div>
            </div>

            {/* Card 4: Contact Sales */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xxs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">Custom Setup</span>
                <h3 className="text-lg font-bold text-slate-950">Contact Compliance Sales</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need custom audit structures, dedicated block nodes, custom drone reporting schedules, or multi-tenant NGO permission schemes? Talk to our compliance engineering team directly.
                </p>
              </div>
              <div className="pt-6">
                <a
                  href="mailto:sales@emertrees.co"
                  className="w-full text-center inline-block px-4 py-2.5 rounded-lg border border-emerald-600 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition-colors"
                >
                  Email Compliance Team
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. API DOCS SECTION */}
      <section id="api-docs" className="py-20 bg-slate-950 text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-emerald-350 uppercase tracking-widest">Developer Portal</span>
              <h2 className="text-3xl font-extrabold tracking-tight">Emertrees API Docs</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Integrate sponsorship triggers, tree registration, impact reporting, and certificate verification directly into enterprise ESG systems.
              </p>
            </div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-emerald-300">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sandbox endpoints available
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
              <span className="block px-3 pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                API References
              </span>
              <div className="space-y-2">
                {apiEndpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveApi(endpoint)}
                    className={`w-full rounded-xl border p-3 text-left transition-all ${
                      activeApi.id === endpoint.id
                        ? "border-emerald-400/50 bg-emerald-400/10 text-white"
                        : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-xs font-bold">{endpoint.path}</span>
                      <span className={`rounded-md px-2 py-0.5 text-[9px] font-extrabold ${
                        endpoint.method === "POST"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-sky-400/15 text-sky-300"
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-normal text-slate-400">
                      {endpoint.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Terminal className="h-5 w-5 text-emerald-300" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-1 text-[10px] font-extrabold ${
                      activeApi.method === "POST"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-sky-400/15 text-sky-300"
                    }`}>
                      {activeApi.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">{activeApi.path}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{activeApi.description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center font-bold text-slate-200">
                      <Key className="mr-2 h-4 w-4 text-emerald-300" />
                      Authentication
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{activeApi.auth}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-400">
                    Use scoped keys from the Admin dashboard. Write keys are restricted by tenant and partner role.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Payload Fields</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeApi.fields.map((field) => (
                      <span key={field} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-200">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Response Includes</h3>
                  <p className="rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-xs leading-relaxed text-emerald-250">
                    {activeApi.response}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-zinc-950 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Shell Preview</span>
                <button
                  onClick={() => navigator.clipboard.writeText(`curl -X ${activeApi.method} https://api.emertrees.co${activeApi.path}`)}
                  className="inline-flex items-center rounded-lg border border-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Copy className="mr-1.5 h-3 w-3" />
                  Copy
                </button>
              </div>
              <pre className="min-h-48 overflow-x-auto whitespace-pre-wrap rounded-xl bg-black/50 p-4 font-mono text-xs leading-relaxed text-slate-300">
{`curl -X ${activeApi.method} https://api.emertrees.co${activeApi.path} \\
  -H "Authorization: ${activeApi.auth}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "${activeApi.fields[0]}": "example_value",
    "${activeApi.fields[1]}": "example_value"
  }'`}
              </pre>
              <button
                onClick={() => setSelectedReport(`Sandbox ${activeApi.path}`)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Execute Sandbox Call
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
