'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold">Agendamento Policial</h1>
              <p className="text-xs text-blue-200 hidden sm:block">Sistema de Atendimento</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-4">
            <Link 
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                !isAdmin 
                  ? 'bg-white/20 text-white' 
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              Agendar
            </Link>
            <Link 
              href="/admin"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isAdmin 
                  ? 'bg-white/20 text-white' 
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              Administração
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="sm:hidden mt-3 pt-3 border-t border-white/20 flex flex-col gap-2">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg transition-colors text-center ${
                !isAdmin 
                  ? 'bg-white/20 text-white' 
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              Agendar
            </Link>
            <Link 
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg transition-colors text-center ${
                isAdmin 
                  ? 'bg-white/20 text-white' 
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              Administração
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
