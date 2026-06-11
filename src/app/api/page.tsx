"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  Send, 
  Key, 
  Code,
  ArrowRight,
  Database
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface APIEndpoint {
  id: string;
  method: "POST" | "GET";
  path: string;
  description: string;
  authentication: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  sampleRequest: string;
  sampleResponse: Record<string, any>;
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: "donations",
    method: "POST",
    path: "/donations",
    description: "Initialize a corporate sponsorship project allocation. This routes the funds to the NGO project escrow and locks the Schedule VII tag in our compliance tracking engine.",
    authentication: "Bearer Corporate API Key (Write)",
    parameters: [
      { name: "corporateId", type: "string", required: true, description: "Your registered enterprise tenant ID." },
      { name: "projectId", type: "string", required: true, description: "Target ecosystem project ID (e.g. 'sundarbans-mangrove')." },
      { name: "amount", type: "integer", required: true, description: "Budget sponsorship amount in INR (Schedule VII threshold)." },
      { name: "targetTreeCount", type: "integer", required: true, description: "Number of saplings requested for planting." }
    ],
    sampleRequest: `curl -X POST https://api.emertrees.co/v1/donations \\
  -H "Authorization: Bearer em_live_tcs_9982" \\
  -H "Content-Type: application/json" \\
  -d '{
    "corporateId": "corp_tcs_092a",
    "projectId": "proj_sundarbans_001",
    "amount": 2500000,
    "targetTreeCount": 12500
  }'`,
    sampleResponse: {
      success: true,
      donationId: "don_tcs_99827",
      escrowStatus: "funds_locked",
      blockchainTx: "0x39a17fd28b883010ef198082a901ff42",
      complianceCode: "SCH-VII-SEC135",
      createdAt: "2026-06-10T17:12:00Z"
    }
  },
  {
    id: "trees",
    method: "POST",
    path: "/trees",
    description: "Register a newly planted sapling. Used by certified field NGOs and automated farmer coordinator apps to upload geotags, plantation time, soil profile, and initial sapling photographs.",
    authentication: "Bearer NGO Partner Key (Write)",
    parameters: [
      { name: "donationId", type: "string", required: true, description: "Sponsorship allocation ID associated with this planting." },
      { name: "farmerId", type: "string", required: true, description: "Target farmer ID performing the planting." },
      { name: "latitude", type: "float", required: true, description: "Plantation latitude coordinate (up to 6 decimal precision)." },
      { name: "longitude", type: "float", required: true, description: "Plantation longitude coordinate (up to 6 decimal precision)." },
      { name: "speciesName", type: "string", required: true, description: "Scientific or local cataloged species name." }
    ],
    sampleRequest: `curl -X POST https://api.emertrees.co/v1/trees \\
  -H "Authorization: Bearer em_ngo_wg_870" \\
  -H "Content-Type: application/json" \\
  -d '{
    "donationId": "don_tcs_99827",
    "farmerId": "farm_rajesh_5120",
    "latitude": 12.971644,
    "longitude": 75.594612,
    "speciesName": "Teak (Tectona grandis)"
  }'`,
    sampleResponse: {
      success: true,
      treeId: "tree_wgb_12098",
      ipfsHash: "QmXyT83f9sK1d2A3d4e5f6g7h8i9j0k1l2m3n4vB",
      ledgerIndex: 198602,
      farmerPaymentStatus: "escrow_payout_triggered",
      verified: true
    }
  },
  {
    id: "impact-report",
    method: "GET",
    path: "/impact-report",
    description: "Retrieve real-time environmental asset impact metrics, aggregated totals, active farmer allocations, and verified carbon offsets.",
    authentication: "Bearer Corporate / Public Reader Key",
    parameters: [
      { name: "corporateId", type: "string", required: true, description: "Your registered enterprise tenant ID." },
      { name: "includeAuditTrail", type: "boolean", required: false, description: "If true, appends raw IPFS verification hashes for each registered tree plot." }
    ],
    sampleRequest: `curl -X GET https://api.emertrees.co/v1/impact-report?corporateId=corp_tcs_092a \\
  -H "Authorization: Bearer em_live_tcs_9982"`,
    sampleResponse: {
      corporateId: "corp_tcs_092a",
      totalTreesPlanted: 12500,
      verifiedSurvivalRate: "98.4%",
      activeSponsorships: 2,
      carbonOffsetTotal: "285.5 tCO2e/yr",
      activeFarmersSupported: 142,
      complianceState: "Schedule VII Compliant",
      auditTrailIndex: "ipfs://QmYx...core"
    }
  },
  {
    id: "certificate",
    method: "GET",
    path: "/certificate",
    description: "Fetch cryptographically signed digital certificates for marketing, stakeholder auditing, and investor verification decks.",
    authentication: "Bearer Corporate Key",
    parameters: [
      { name: "donationId", type: "string", required: true, description: "Target sponsorship ID to pull certificate proof for." },
      { name: "format", type: "string", required: false, description: "Export format ('json' or 'pdf_stream'). Defaults to 'json'." }
    ],
    sampleRequest: `curl -X GET https://api.emertrees.co/v1/certificate?donationId=don_tcs_99827 \\
  -H "Authorization: Bearer em_live_tcs_9982"`,
    sampleResponse: {
      certificateId: "CERT-2026-WGB-9982",
      issuedTo: "TCS CSR Division",
      sponsorshipScope: "12,500 Trees (Western Ghats Corridor)",
      ledgerVerificationStamp: "SEBI BRSR Core Compliant",
      carbonOffsetRegistered: "12.8 tCO2e/yr",
      signatureHash: "0xff129a7be8197068b5a7b198082ab82a",
      publicVerificationUrl: "https://emertrees.co/verify/CERT-2026-WGB-9982"
    }
  }
];

export default function APIDocPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(apiEndpoints[0]);
  const [copiedText, setCopiedText] = useState(false);
  const [loadingPlayground, setLoadingPlayground] = useState(false);
  const [playgroundResponse, setPlaygroundResponse] = useState<any>(null);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleRunPlayground = () => {
    setLoadingPlayground(true);
    setPlaygroundResponse(null);
    setTimeout(() => {
      setLoadingPlayground(false);
      setPlaygroundResponse(selectedEndpoint.sampleResponse);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
      <Navbar />

      <section className="pt-28 pb-20 bg-slate-50 border-b border-slate-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-800">
              Developer Portal
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              Emertrees OpenAPI Docs
            </h1>
            <p className="text-lg text-slate-650">
              Integrate automated ecological asset verification and donation triggers directly into your HR programs, commerce checkouts, and corporate ESG reporting portals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Sidebar Endpoint Index */}
            <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shrink-0 h-fit">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-3">API References</span>
              {apiEndpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => {
                    setSelectedEndpoint(endpoint);
                    setPlaygroundResponse(null);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition-all focus:outline-hidden ${
                    selectedEndpoint.id === endpoint.id
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span className="truncate mr-2">{endpoint.path}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold font-mono ${
                    endpoint.method === "POST" ? "bg-emerald-100 text-emerald-800" : "bg-blue-105 text-blue-800"
                  }`}>
                    {endpoint.method}
                  </span>
                </button>
              ))}
              <div className="border-t border-slate-150 pt-4 mt-6 px-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Auth Headers</span>
                <p className="text-[10px] text-slate-600 leading-normal">
                  All requests must supply bearer API keys matching write/read privileges. Generate keys in the Admin dashboard portal.
                </p>
              </div>
            </div>

            {/* Central Panel: Detailed Endpoint Specification */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                    selectedEndpoint.method === "POST" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-850"
                  }`}>
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-slate-900">{selectedEndpoint.path}</span>
                </div>
                <p className="text-xs text-slate-600 mt-4 leading-relaxed">
                  {selectedEndpoint.description}
                </p>
              </div>

              {/* Authentication Detail */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Key className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold text-slate-700">Authentication</span>
                </div>
                <span className="font-mono text-slate-600 font-medium">{selectedEndpoint.authentication}</span>
              </div>

              {/* Parameters Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payload Parameters</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-750">
                        <th className="p-3">Field</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Required</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700">
                      {selectedEndpoint.parameters.map((param) => (
                        <tr key={param.name}>
                          <td className="p-3 font-mono font-bold text-slate-900">{param.name}</td>
                          <td className="p-3 font-mono text-slate-650">{param.type}</td>
                          <td className="p-3 font-semibold text-center">
                            {param.required ? (
                              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">true</span>
                            ) : (
                              <span className="text-slate-400">false</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-600 leading-normal">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Code sample & Try it out Playground */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Shell Request Example */}
              <div className="bg-slate-900 text-slate-300 p-5 rounded-3xl font-mono text-xs flex flex-col justify-between h-[280px]">
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>Shell Command Preview</span>
                    <button
                      onClick={() => handleCopyCode(selectedEndpoint.sampleRequest)}
                      className="hover:text-white flex items-center space-x-1 focus:outline-hidden"
                    >
                      {copiedText ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-450 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy API command</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[190px]">
                    {selectedEndpoint.sampleRequest}
                  </pre>
                </div>
              </div>

              {/* Try It Out Playground */}
              <div className="bg-white p-5 rounded-3xl border border-slate-205 flex-1 flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-150 mb-3">
                    <span className="text-xxs font-bold text-slate-700 uppercase tracking-wider">Interactive Playground</span>
                    <span className="text-xxs font-mono text-slate-400">Sandbox Environment</span>
                  </div>
                  
                  {loadingPlayground ? (
                    <div className="flex flex-col items-center justify-center space-y-3 py-12">
                      <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin"></div>
                      <span className="text-xs text-slate-500 font-bold">Calling Mock Endpoint...</span>
                    </div>
                  ) : playgroundResponse ? (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Response JSON (200 OK)</span>
                      <pre className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-[10px] font-mono text-slate-800 overflow-x-auto leading-relaxed max-h-[220px]">
                        {JSON.stringify(playgroundResponse, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 space-y-2">
                      <Database className="h-8 w-8 text-slate-350 mx-auto" />
                      <p className="text-xs font-semibold">Test the request payload locally</p>
                      <p className="text-[10px] text-slate-400">Clicking run will execute a mock request against the sandbox nodes.</p>
                    </div>
                  )}
                </div>

                {!loadingPlayground && (
                  <button
                    onClick={handleRunPlayground}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Play className="h-3.5 w-3.5 mr-1.5" />
                    Execute Sandbox Call
                  </button>
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
