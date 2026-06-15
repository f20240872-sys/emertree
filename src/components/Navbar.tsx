"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trees, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Projects", href: "/#projects" },
    { name: "Lifecycle", href: "/#lifecycle" },
  ];

  const isActive = (path: string) => {
    if (path === "/#home") {
      return pathname === "/";
    }
    if (path.startsWith("/#")) {
      return false;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm py-3"
          : "bg-white/50 backdrop-blur-xs py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-emerald-550 p-2 rounded-xl text-emerald-600 transition-transform group-hover:scale-105">
              <Trees className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Emer<span className="text-emerald-600">trees</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive(link.href)
                    ? "text-emerald-650 font-semibold border-b-2 border-emerald-600 pb-1"
                    : "text-slate-650"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA & Dashboard Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard/corporate"
              className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Enterprise Sign In
            </Link>
            <Link
              href="/dashboard/corporate?action=new-project"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Start CSR Project
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-200 mt-2 absolute left-0 right-0 p-4 shadow-lg flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold px-3 py-2 rounded-lg transition-colors ${
                isActive(link.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-emerald-650"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-slate-100 pt-4 flex flex-col space-y-3">
            <Link
              href="/dashboard/corporate"
              onClick={() => setIsOpen(false)}
              className="text-center font-semibold text-slate-700 hover:text-emerald-600 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Enterprise Sign In
            </Link>
            <Link
              href="/dashboard/corporate?action=new-project"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-center shadow-xs"
            >
              Start CSR Project
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
