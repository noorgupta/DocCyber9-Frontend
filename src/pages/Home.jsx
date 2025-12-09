import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - HOME PAGE (HERO SECTION + FEATURE SHOWCASE)
 * Blackbird IT Style: Dark Black + Neon Green
 * ═══════════════════════════════════════════════════════════════════
 */

// Feature Showcase Component - Horizontal Scrolling Slider
const FeatureShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      id: 1,
      title: 'AI TAMPER PINPOINTING',
      subtitle: 'Machine Learning Detection',
      description: 'Advanced AI algorithms analyze document changes at the character level, pinpointing exact locations of unauthorized modifications with 99.9% accuracy.',
      icon: '🤖',
      stats: ['Character-Level Analysis', 'ML-Powered Detection', 'Real-time Processing']
    },
    {
      id: 2,
      title: 'BATCH VERIFICATION',
      subtitle: 'Massive Scale Processing',
      description: 'Verify up to 100 documents simultaneously with parallel processing. Enterprise-grade throughput for compliance audits and bulk document validation.',
      icon: '📦',
      stats: ['100 Documents/Batch', 'Parallel Processing', 'Instant Results']
    },
    {
      id: 3,
      title: 'PROOF OF CUSTODY',
      subtitle: 'Immutable Audit Trail',
      description: 'Complete chain of custody tracking with cryptographic timestamps. Every access, verification, and modification is permanently recorded for legal compliance.',
      icon: '🔗',
      stats: ['Blockchain-Ready', 'Legal Compliance', 'Immutable Records']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-950 to-black py-20 border-t-2 border-green-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">
            ADVANCED <span className="text-green-500">FEATURES</span>
          </h2>
          <p className="text-gray-400 text-lg uppercase tracking-wider">
            Enterprise-Grade Document Security
          </p>
        </div>

        {/* Showcase Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Feature Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-12">
              
              {/* Left Side - Visual Block (Placeholder) */}
              <div className="relative">
                {/* DATA BLOCK PLACEHOLDER - NO IMG TAG */}
                <div className="h-64 md:h-full bg-gray-800 border-2 border-green-500/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Grid Pattern Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* Central Icon */}
                  <div className="relative z-10 text-center">
                    <div className="text-8xl mb-4 animate-pulse">{features[currentSlide].icon}</div>
                    <div className="font-mono text-green-500 text-xl font-black uppercase tracking-widest">
                      DATA BLOCK
                    </div>
                    <div className="font-mono text-gray-600 text-xs uppercase tracking-wider mt-2">
                      [{features[currentSlide].id}/3]
                    </div>
                  </div>

                  {/* Animated Corner Brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-green-500 animate-pulse"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>

                {/* Feature Number Badge */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                  <span className="text-black font-black text-2xl">{features[currentSlide].id}</span>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex flex-col justify-center space-y-6">
                {/* Subtitle */}
                <div className="inline-block">
                  <span className="px-4 py-2 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-xs font-black uppercase tracking-widest">
                    {features[currentSlide].subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-4xl font-black uppercase tracking-tight text-white">
                  {features[currentSlide].title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {features[currentSlide].description}
                </p>

                {/* Stats */}
                <div className="space-y-3 pt-4">
                  {features[currentSlide].stats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400 uppercase tracking-wider">{stat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-black text-black bg-green-500 rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                  >
                    Enable Feature
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Blackbird IT Style */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-14 h-14 bg-black border-2 border-green-500 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 bg-green-500' 
                      : 'w-2 bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-14 h-14 bg-black border-2 border-green-500 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Feature Counter */}
          <div className="text-center mt-6">
            <span className="text-gray-500 text-sm font-mono uppercase tracking-wider">
              Feature {currentSlide + 1} of {features.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Animated Green Glow Effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Copy */}
          <div className="space-y-8">
            {/* Logo & Brand Name */}
            <div className="flex items-center space-x-6">
              {/* Animated Tiger Logo */}
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/assets/tiger-poster.jpg"
                >
                  <source src="/assets/tiger.mp4" type="video/mp4" />
                  {/* Fallback Image */}
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <span className="text-4xl">🐯</span>
                  </div>
                </video>
                {/* Rotating Border Effect */}
                <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-spin-slow opacity-50"></div>
              </div>

              {/* Brand Name */}
              <div>
                <h1 className="text-7xl font-black tracking-tighter text-white">
                  EMINENT
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-transparent mt-2"></div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-green-500 tracking-tight uppercase">
                Verifiable Truth. Zero Doubt.
              </h2>
              
              {/* Marketing Copy */}
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Military-grade cryptographic hashing ensures your documents remain tamper-proof. 
                Detect unauthorized changes with mathematical certainty.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400 uppercase tracking-wider">SHA-256 Hashing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Blockchain Ready</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Audit Trail</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className="text-sm text-gray-400 uppercase tracking-wider">Real-time Verify</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 pt-6">
              {/* Primary CTA - Get Started */}
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black bg-green-500 rounded-lg overflow-hidden transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
              >
                <span className="relative z-10 uppercase tracking-wider">Get Started</span>
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shine"></div>
              </Link>

              {/* Secondary CTA - Login */}
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-green-500 bg-transparent border-2 border-green-500 rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black hover:scale-105 uppercase tracking-wider"
              >
                Login
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-400">Military-Grade Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-400">Zero Trust Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual/Stats */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Card with Stats */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div>
                      <div className="text-4xl font-black text-green-500">256-bit</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">SHA-256 Algorithm</div>
                    </div>
                    <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div>
                      <div className="text-4xl font-black text-green-500">99.99%</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Detection Accuracy</div>
                    </div>
                    <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-black text-green-500">&lt;10ms</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Verification Speed</div>
                    </div>
                    <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Animated Hash Example */}
                <div className="mt-8 p-4 bg-black/50 rounded-lg border border-green-500/20">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Example Hash</div>
                  <div className="font-mono text-xs text-green-500 break-all animate-pulse">
                    5c88fe93aedb063187f1c90e3b73258bcb57ffa82c29f4954adfdb4c4a438d9f
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-green-500 rounded-lg opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-green-500 rounded-lg opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

        </div>

        {/* Bottom Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll to Explore</span>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>

      {/* Feature Showcase Section */}
      <FeatureShowcase />
    </>
  );
};

export default Home;
