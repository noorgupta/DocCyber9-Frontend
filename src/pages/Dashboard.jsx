import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { apiCall } from '../utility/api';
import { formatDate } from '../utility/formatters';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - DASHBOARD (PROTECTED)
 * Blackbird IT Style: Dark Black + Neon Green
 * Three Sections: Dashboard, About Us, Contact Us
 * ═══════════════════════════════════════════════════════════════════
 */

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('eminent_user') || '{}');
  const [recentDocs, setRecentDocs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      try {
        const res = await apiCall('/documents', 'GET', null, true);
        if (mounted && res && res.success && Array.isArray(res.documents)) {
          setRecentDocs(res.documents);
        }
      } catch (err) {
        // silently ignore — recent activity optional
        console.warn('Failed to fetch recent documents:', err.message || err);
      }
    };

    fetchRecent();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* DASHBOARD SECTION */}
      <section id="dashboard-section" className="min-h-screen py-20 px-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-4">
              DASHBOARD
            </h1>
            <p className="text-gray-400 text-lg uppercase tracking-wider mb-2">
              Welcome Back, <span className="text-green-500 font-black">{user.name}</span>
            </p>
            <p className="text-gray-500 uppercase tracking-wider text-sm">
              Manage your document integrity verification
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Store Hash Card */}
            <Link to="/store" className="block bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-8 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-105">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-black uppercase tracking-wider text-green-500 mb-3">
                STORE HASH
              </h3>
              <p className="text-gray-400 mb-6">
                Upload and cryptographically secure your documents
              </p>
              <div className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300 text-center">
                UPLOAD
              </div>
            </Link>

            {/* Verify Card */}
            <Link to="/verify" className="block bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-8 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-105">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black uppercase tracking-wider text-green-500 mb-3">
                VERIFY
              </h3>
              <p className="text-gray-400 mb-6">
                Check document integrity and detect tampering
              </p>
              <div className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300 text-center">
                VERIFY NOW
              </div>
            </Link>

            {/* Quick links + Recent Activity */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 md:col-span-2">
              {/* Quick Links */}
              <div className="space-y-4">
                <Link to="/docs" className="block bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all duration-300">
                  <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">DOCS</h4>
                  <p className="text-gray-400 text-sm">Developer docs and API reference</p>
                </Link>

                <a href="mailto:support@eminent.io" className="block bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all duration-300">
                  <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">SUPPORT</h4>
                  <p className="text-gray-400 text-sm">Contact security team (support@eminent.io)</p>
                </a>

                <Link to="/account" className="block bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 hover:border-green-500 transition-all duration-300">
                  <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">ACCOUNT</h4>
                  <p className="text-gray-400 text-sm">Manage your profile and tokens</p>
                </Link>
              </div>

              {/* Recent Activity Feed */}
              <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6">
                <h3 className="text-2xl font-black uppercase tracking-wider text-green-500 mb-4">RECENT ACTIVITY</h3>
                {recentDocs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-gray-400 uppercase tracking-wider">No recent activity found. Store or verify documents to populate this feed.</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {recentDocs.map((d) => (
                      <li key={d.id} className="flex items-center justify-between bg-black border-2 border-green-500/10 rounded-lg p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-green-500">ID: <span className="text-gray-200 font-mono">{d.id}</span></span>
                          <span className="text-xs text-gray-400">Stored: {formatDate(d.createdAt)}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-2">Hash</div>
                          <code className="text-white font-mono text-sm break-all">{(d.hash || '').slice(0, 16)}…{(d.hash || '').slice(-8)}</code>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about-section" className="min-h-screen py-20 px-6 border-t-2 border-green-500/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black uppercase tracking-tighter text-green-500 mb-4">
              ABOUT US
            </h2>
            <p className="text-gray-400 text-lg uppercase tracking-wider">
              Military-Grade Document Integrity Verification
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-12">
            <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-6">
              OUR MISSION
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              EMINENT provides <span className="text-green-500 font-bold">military-grade cryptographic hashing</span> to ensure your documents remain tamper-proof. We detect unauthorized changes with mathematical certainty, giving you <span className="text-green-500 font-bold">verifiable truth</span> you can trust.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our platform leverages <span className="text-green-500 font-bold">SHA-256 encryption</span>, blockchain-ready architecture, and real-time verification to protect your most critical documents from fraud, manipulation, and unauthorized alterations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300">
              <div className="text-5xl mb-4">🔐</div>
              <h4 className="text-xl font-black uppercase tracking-wider text-green-500 mb-2">SHA-256</h4>
              <p className="text-gray-400 text-sm">Military-grade hashing algorithm</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300">
              <div className="text-5xl mb-4">⛓️</div>
              <h4 className="text-xl font-black uppercase tracking-wider text-green-500 mb-2">BLOCKCHAIN</h4>
              <p className="text-gray-400 text-sm">Ready for distributed ledger</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300">
              <div className="text-5xl mb-4">📋</div>
              <h4 className="text-xl font-black uppercase tracking-wider text-green-500 mb-2">AUDIT TRAIL</h4>
              <p className="text-gray-400 text-sm">Complete verification history</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-black uppercase tracking-wider text-green-500 mb-2">REAL-TIME</h4>
              <p className="text-gray-400 text-sm">Instant verification results</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-12">
            <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-8 text-center">
              TECHNOLOGY STACK
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-3">BACKEND</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Node.js + Express</li>
                  <li>• MongoDB Database</li>
                  <li>• JWT Authentication</li>
                  <li>• Bcrypt Encryption</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-3">FRONTEND</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• React 18</li>
                  <li>• Tailwind CSS</li>
                  <li>• Vite Build Tool</li>
                  <li>• React Router</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-3">SECURITY</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• SHA-256 Hashing</li>
                  <li>• UUID Salt Generation</li>
                  <li>• Base64 Encoding</li>
                  <li>• AI Tamper Detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact-section" className="min-h-screen py-20 px-6 border-t-2 border-green-500/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black uppercase tracking-tighter text-green-500 mb-4">
              CONTACT US
            </h2>
            <p className="text-gray-400 text-lg uppercase tracking-wider">
              Get in touch with our security team
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-12">
              <div className="mb-6">
                <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]"
              >
                SEND MESSAGE
              </button>
            </form>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📧</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">EMAIL</h4>
                <p className="text-gray-300">support@eminent.io</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🌐</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">SUPPORT</h4>
                <p className="text-gray-300">24/7 Security Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
