'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const [mode, setMode] = useState<'technical' | 'creative'>('technical');
  const pathname = usePathname();

  const technicalLinks = [
    { href: '/tech/about', label: 'About' },
    { href: '/tech/projects', label: 'Projects' },
    { href: '/tech/skills', label: 'Skills' },
    { href: '/tech/resume', label: 'Resume' },
  ];

  const creativeLinks = [
    { href: '/creative/about', label: 'About' },
    { href: '/creative/gallery', label: 'Gallery' },
    { href: '/creative/achievements', label: 'Achievements' },
    { href: '/creative/social', label: 'Social' },
  ];

  const links = mode === 'technical' ? technicalLinks : creativeLinks;
  const gradientClass = mode === 'technical' 
    ? 'from-blue-500 to-purple-600' 
    : 'from-orange-500 to-pink-600';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className={`text-xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}
          >
            Aaditya Negi
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-4">
              <AnimatePresence mode="wait">
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === link.href
                          ? 'text-white bg-gradient-to-r ' + gradientClass
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMode(mode === 'technical' ? 'creative' : 'technical')}
              className={`px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r ${gradientClass} text-white`}
            >
              Switch to {mode === 'technical' ? 'Creative' : 'Technical'} Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}