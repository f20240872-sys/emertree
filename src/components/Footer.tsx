import React from "react";
import Link from "next/link";
import { Trees, Mail, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: "About Us", href: "/#" },
      { name: "Contact Support", href: "/#" },
      { name: "Careers", href: "/#" },
      { name: "Press Kit", href: "/#" },
    ],
    platform: [
      { name: "Plantation Projects", href: "/#projects" },
      { name: "Lifecycle Tracking", href: "/#lifecycle" },
      { name: "Farmer Network", href: "/dashboard/farmers" },
      { name: "Monitoring Ledger", href: "/dashboard/monitoring" },
    ],
    resources: [
      { name: "Developer API", href: "/#features" },
      { name: "Platform Features", href: "/#features" },
      { name: "ESG Reporting Docs", href: "/#" },
      { name: "Carbon Guidelines", href: "/#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/#" },
      { name: "Terms of Service", href: "/#" },
      { name: "CSR Audit Code", href: "/#" },
      { name: "Cookie Settings", href: "/#" },
    ],
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-200">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                <Trees className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Emer<span className="text-emerald-600">trees</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Empowering global corporations, dedicated NGOs, and local farmers through a transparent, high-integrity tree plantation ecosystem. Track tree health, prove carbon compliance, and verify impact on the blockchain.
            </p>
            {/* Newsletter Sign up */}
            <div className="space-y-3 max-w-xs">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Subscribe to ESG Insights
              </h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  aria-label="Submit Email"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-650 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {links.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-650 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-650 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {currentYear} Emertrees Technologies. All rights reserved.</p>
          <p className="flex items-center">
            Designed for high environmental impact & corporate transparency
            <Heart className="h-3 w-3 text-emerald-500 fill-emerald-500 ml-1.5" />
          </p>
        </div>
      </div>
    </footer>
  );
}
