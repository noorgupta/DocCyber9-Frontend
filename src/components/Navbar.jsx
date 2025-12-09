import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../utility/api';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - NAVBAR (PROTECTED ROUTES ONLY)
 * Blackbird IT Style: Dark Black + Neon Green + Bold All-Caps
 * High-Contrast, Sharp, Prominent Typography
 * Only appears after successful login
 * ═══════════════════════════════════════════════════════════════════
 */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user info from localStorage
  const user = auth.getUser() || {};
  const userName = user.name || 'User';

  // Logout handler - now uses auth utility
  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Scroll to section (for anchor links)
  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileMenuOpen(false);
    };

    // If we're not on the dashboard route where the sections live, navigate there first
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
      // Wait briefly for the dashboard to render, then scroll
      setTimeout(doScroll, 200);
    } else {
      doScroll();
    }
  };

  // Navigation links - Mix of routes and anchor links
  const navLinks = [
    { name: 'HOME', path: '/dashboard', type: 'route' },
    { name: 'STORE', path: '/store', type: 'route' },
    { name: 'VERIFY', path: '/verify', type: 'route' },
    { name: 'ABOUT US', anchor: 'about-section', type: 'anchor' },
    { name: 'CONTACT US', anchor: 'contact-section', type: 'anchor' },
  ];

  return (
    <nav className="bg-black border-b-2 border-green-500 sticky top-0 z-50 shadow-[0_4px_20px_rgba(34,197,94,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            {/* Tiger Icon/Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <span className="text-3xl">🐯</span>
            </div>
            
            {/* Brand Name - Blackbird IT Style */}
            <Link to="/dashboard" className="flex items-center">
              <span className="text-3xl font-black text-white tracking-tighter uppercase">
                EMINENT
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Blackbird IT Style */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={index} className="flex items-center">
                {link.type === 'route' ? (
                  <Link
                    to={link.path}
                    className={`
                      relative px-6 py-3 text-sm font-black uppercase tracking-widest transition-all duration-300
                      ${isActive(link.path)
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-gray-300 hover:text-green-500 hover:bg-green-500/5'
                      }
                    `}
                  >
                    {link.name}
                    {/* Active indicator */}
                    {isActive(link.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.anchor)}
                    className="relative px-6 py-3 text-sm font-black text-gray-300 uppercase tracking-widest transition-all duration-300 hover:text-green-500 hover:bg-green-500/5"
                  >
                    {link.name}
                  </button>
                )}
                
                {/* Visual Separator - Blackbird IT Style */}
                {index < navLinks.length - 1 && (
                  <div className="h-6 w-px bg-green-500/30"></div>
                )}
              </div>
            ))}
          </div>

          {/* User Profile & Logout - Blackbird IT Style */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-900 to-black border-2 border-green-500/50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-black font-black text-lg shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-green-500 uppercase tracking-wider">{userName}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">AUTHENTICATED</span>
              </div>
            </div>

            {/* Logout Button - Blackbird IT Style */}
            <button
              onClick={handleLogout}
              className="px-6 py-3 text-sm font-black text-black bg-green-500 rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            >
              LOGOUT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-green-500 hover:text-green-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Blackbird IT Style */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-green-500/30 bg-gradient-to-b from-gray-900 to-black">
          <div className="px-4 py-6 space-y-3">
            {/* User Info Mobile */}
            <div className="flex items-center space-x-3 px-4 py-3 bg-black border-2 border-green-500/50 rounded-lg mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-black font-black text-xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-green-500 uppercase tracking-wider">{userName}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">AUTHENTICATED</span>
              </div>
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.type === 'route' ? (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between px-6 py-4 rounded-lg text-base font-black uppercase tracking-widest transition-all duration-300
                      ${isActive(link.path)
                        ? 'bg-green-500 text-black'
                        : 'bg-black text-gray-300 hover:bg-gray-800 hover:text-green-500 border-2 border-green-500/30'
                      }
                    `}
                  >
                    <span>{link.name}</span>
                    {isActive(link.path) && <span>▶</span>}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.anchor)}
                    className="w-full flex items-center justify-between px-6 py-4 rounded-lg text-base font-black uppercase tracking-widest transition-all duration-300 bg-black text-gray-300 hover:bg-gray-800 hover:text-green-500 border-2 border-green-500/30"
                  >
                    <span>{link.name}</span>
                  </button>
                )}
              </div>
            ))}

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full px-6 py-4 text-base font-black text-black bg-green-500 rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-green-400 flex items-center justify-center space-x-2 mt-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
