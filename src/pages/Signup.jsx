import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utility/api';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - SIGNUP PAGE
 * Blackbird IT Style: Dark Black + Neon Green
 * ═══════════════════════════════════════════════════════════════════
 */

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Use the auth utility for signup
      const data = await auth.signup(formData.email, formData.password, formData.name);

      if (data.success) {
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden py-12">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Animated Green Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm uppercase tracking-wider">Back to Home</span>
        </Link>

        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
              <span className="text-3xl">🐯</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Create Account</h2>
            <p className="text-gray-400 mt-2">Join Eminent's secure platform</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                placeholder="Min. 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                placeholder="Re-enter password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-500 text-black font-bold text-lg uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-green-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="px-4 text-sm text-gray-600">OR</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-500 font-bold hover:text-green-400 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="uppercase tracking-wider">Secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
