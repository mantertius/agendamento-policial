'use client';

import Link from 'next/link';
import Image from 'next/image';
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
          <Link href="/" className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity">
            <div className="w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Polícia Civil AL"
                width={56}
                height={56}
                className="w-full h-full object-contain drop-shadow-lg"
                priority
              />
            </div>
            <div className="border-l border-blue-600 pl-3 sm:pl-4">
              <h1 className="text-sm sm:text-lg font-bold leading-tight">Polícia Civil</h1>
              <p className="text-xs sm:text-sm text-blue-200 font-medium">Alagoas</p>
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
