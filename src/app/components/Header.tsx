'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-100 hover:text-green-400 transition-colors">
          ArtShoes
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className={`
          ${isMenuOpen ? 'block' : 'hidden'} 
          md:block 
          absolute md:relative 
          top-16 md:top-0 
          left-0 md:left-auto 
          w-full md:w-auto 
          bg-gray-800 md:bg-transparent 
          z-20
        `}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li>
              <Link 
                href="/" 
                className="block py-2 md:py-0 hover:text-green-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/#" 
                className="block py-2 md:py-0 hover:text-green-500 transition-colors"
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link 
                href="/#" 
                className="block py-2 md:py-0 hover:text-green-500 transition-colors"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link 
                href="/#" 
                className="block py-2 md:py-0 hover:text-green-500 transition-colors"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart and User Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="hover:text-green-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button className="hover:text-green-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
