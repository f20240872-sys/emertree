"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Check,
  ArrowRight,
  Trees,
  Send,
  Sparkles,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "csr",
    scale: "10k-50k",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 bg-grid-pattern relative overflow-hidden">
        {/* Ambient Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            {/* <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200/30 rounded-full text-xs font-semibold text-emerald-850">
              <Sparkles className="h-3 w-3 text-emerald-600 animate-pulse" />
              <span>Partner with Emertrees</span>
            </span> */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Enterprise Partnership & Compliance
            </h1>
            <p className="text-base sm:text-lg text-slate-650 max-w-2xl mx-auto">
              Ready to verify your environmental impact? Speak with our compliance sales team to establish custom audit trails and CSR project templates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 mt-12 bg-emerald-50/40 border border-emerald-500/20 text-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              {/* Background gradient lines */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* <div className="mt-12 bg-emerald-50/40 text-slate-900 rounded-3xl border border-emerald-500/20 p-8 sm:p-12 relative overflow-hidden shadow-xl">
            {/* Ambient Background Glows */}
            {/* <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" /> */}

              <div className="space-y-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold">Why Partner with Us?</h2>
                  <p className="text-sm text-emerald-600 mt-2">
                    Establish high-integrity CSR and environmental programs designed to meet board-level compliance standards.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500/20 text-emerald-600 p-1.5 rounded-lg border border-emerald-500/20 mt-0.5 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-650">CSR Section 135 Compliant</h4>
                      <p className="text-xs text-emerald-600 mt-0.5">Automated reports tag spend according to Schedule VII metrics, complete with localized NGO and farmer audits.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500/20 text-emerald-600 p-1.5 rounded-lg border border-emerald-500/20 mt-0.5 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-650">Continuous Satellite/Drone Audits</h4>
                      <p className="text-xs text-emerald-600 mt-0.5">We don't just plant. Drone passes verify canopy density, tree growth stages, and exact carbon sequestration calculations.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-500/20 text-emerald-600 p-1.5 rounded-lg border border-emerald-500/20 mt-0.5 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-650">Blockchain-Backed Transparency</h4>
                      <p className="text-xs text-emerald-600 mt-0.5">All geotags, photos, and growth logs are anchored immutably to IPFS, ensuring zero risk of greenwashing audits.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Info */}
              <div className="pt-8 border-t border-emerald-800/80 space-y-3 text-xs text-emerald-600 relative z-10">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-emerald-800" />
                  <span>sales@emertrees.co</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-emerald-800" />
                  <span>+91 (80) 4920-3388</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-emerald-800" />
                  <span>Embassy GolfLinks, Bengaluru, India</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Aditya Sharma"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-350 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Work Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="aditya@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-350 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Company / NGO Name</label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          placeholder="Infosys CSR Foundation"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-355 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="interest" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Area of Interest</label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-350 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                        >
                          <option value="csr">CSR Afforestation (Schedule VII)</option>
                          <option value="esg">Enterprise ESG Carbon Ledger</option>
                          <option value="partnership">NGO / Farmer Network Onboarding</option>
                          <option value="other">General Inquiry / Others</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="scale" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Target Plantation Scale (Annual)</label>
                      <select
                        id="scale"
                        name="scale"
                        value={formData.scale}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-350 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                      >
                        <option value="under-10k">Under 10,000 Trees</option>
                        <option value="10k-50k">10,000 - 50,000 Trees</option>
                        <option value="50k-200k">50,000 - 200,000 Trees</option>
                        <option value="above-200k">Above 200,000 Trees</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Project Scope & Details</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your carbon offset goals, desired geographical region in India, or custom compliance auditing requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-350 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none text-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-white" />
                          <span>Submit Partnership Request</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100 shadow-xxs">
                      <Check className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-slate-900">Request Submitted!</h3>
                      <p className="text-sm text-slate-650 max-w-md mx-auto leading-relaxed">
                        Thank you for your interest in partnering with Emertrees. Our compliance engineering and sales division has received your inquiry and will contact you at <strong className="text-slate-900">{formData.email}</strong> within one business day.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
