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



export default function LandingPage() {
  const [treeGrowthStage, setTreeGrowthStage] = useState(0); // 0: Seed, 1: Sprout, 2: Sapling, 3: Mature, 4: Canopy
  const [activeStep, setActiveStep] = useState(0);

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
            {/* Right Hero Content: Premium National Plantation Network Map Image Container */}
            <div className="lg:col-span-6 relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-950/5 p-2 shadow-xl group aspect-4/3 flex items-center justify-center">
              <img
                src="/india-map.png"
                alt="National Plantation Network Map"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Afforestation Ledger</span>
                  <h3 className="text-lg font-bold text-white">National Plantation Network</h3>
                  <p className="text-xxs text-slate-300 mt-0.5">Real-time GPS nodes & satellite verification mapping</p>
                </div>
                <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 text-xxs font-bold text-emerald-300 flex items-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                  Active Hubs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEED FOR OUR SOLUTION SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              The Accountability Challenge
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Why Existing Afforestation Solutions Fall Short
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Corporates invest billions in CSR and environmental offsets, yet traditional programs fail to deliver the transparency, compliance, and survival rates required for true ESG impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xxs hover:shadow-xs transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  !
                </div>
                <h3 className="text-lg font-bold text-slate-900">Untraceable Survival Rates</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Traditional afforestation ends at planting. Without continuous monitoring, sponsors are left in the dark about sapling mortality, canopy development, and actual carbon capture efficacy.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xxs font-semibold text-emerald-600 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2"></span>
                Waste of CSR Budgets
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xxs hover:shadow-xs transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  ✕
                </div>
                <h3 className="text-lg font-bold text-slate-900">Double-Counting & Greenwashing</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Fragmented reporting makes it easy for the same ecological assets to be claimed multiple times. Lack of a single shared registry leads to auditing discrepancies and public greenwashing allegations.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xxs font-semibold text-emerald-600 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2"></span>
                Audit & Reputation Risks
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xxs hover:shadow-xs transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  ⚑
                </div>
                <h3 className="text-lg font-bold text-slate-900">Compliance & Regulatory Pressure</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under India's Section 135 and SEBI's BRSR framework, carbon claims and Schedule VII spending require meticulous, direct-to-source proof-of-work. Static PDF reports are no longer sufficient.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-xxs font-semibold text-emerald-600 uppercase tracking-wider flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2"></span>
                Tighter SEBI & CSR Audits
              </div>
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
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${treeGrowthStage === idx
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
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all focus:outline-hidden ${activeStep === idx
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
      {/* 5. PLATFORM CAPABILITIES & BLOCKCHAIN TRUST */}
      <section id="features" className="py-20 bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              High-Integrity Platform Features
            </h2>
            <p className="text-slate-650 text-sm sm:text-base">
              A comprehensive suite of tools designed to onboard smallholder farmers, audit biomass growth, and issue transparent ESG offset claims.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-xxs hover:shadow-xs group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Farmer Onboarding</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Site boundary verification, direct bank integration checks, and localized socio-economic support tracking for smallholder farmers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-xxs hover:shadow-xs group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Building2 className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">CSR Compliance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Automated Schedule VII tagging, Section 135 compliance checks, and escrow distribution registers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-xxs hover:shadow-xs group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Biomass Modeling</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Species-specific carbon offset calculations matching native vegetation biomass growth and age indexes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-xxs hover:shadow-xs group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Layers className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Satellite Audits</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Periodic satellite canopy passes combined with direct field drone captures to calculate actual survival rates.
              </p>
            </div>

          </div>

          {/* Why the Need for Blockchain Showcase */}
          <div className="mt-12 bg-slate-950 text-white rounded-3xl border border-emerald-500/25 p-8 sm:p-12 relative overflow-hidden shadow-xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  Trust Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Why the Need for Blockchain?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Traditional afforestation databases are centralized, making them vulnerable to deletion, manual alterations, and double-counting of carbon offset claims. By anchoring every environmental asset to a decentralized ledger, we establish a single source of truth for global stakeholders.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Anti-Double Counting</h4>
                      <p className="text-xxs text-slate-400">Each tree geotag is mapped to a unique cryptographic token ID, ensuring it cannot be sold or claimed twice.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Immutable Audit Trail</h4>
                      <p className="text-xxs text-slate-400">Field photos and coordinates are saved to IPFS, hashing records permanently to prevent post-facto editing.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-xxs font-mono text-emerald-400 font-bold">BLOCKCHAIN REGISTRY</span>
                  <span className="text-xxs font-mono text-slate-400">Sync: OK</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="font-mono text-slate-200">Hyperledger / IPFS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verification Hash:</span>
                    <span className="font-mono text-emerald-300 truncate w-36 text-right font-medium">0x8a92f...d5b8c</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consensus Status:</span>
                    <span className="text-emerald-400 font-semibold">100% Validated</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 py-2 rounded-lg text-center font-mono text-[10px] tracking-wider">
                    DECENTRALIZED COMPLIANCE ACTIVE
                  </div>
                </div>
              </div>
            </div>
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
          </div>

          <div className="w-full bg-slate-50 rounded-3xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-2 shadow-xs group">
            <img
              src="/india-map.png"
              alt="Interactive Impact Map"
              className="w-full h-auto object-contain rounded-2xl max-h-[600px] transition-transform duration-500 group-hover:scale-[1.002]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Interactive Audit Hub</span>
                <h3 className="text-xl font-extrabold">Active Plantation Density</h3>
              </div>
              <span className="text-xxs font-mono bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
                Lat/Lon Regional Compliance Markers Verified
              </span>
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

      <Footer />
    </div>
  );
}
