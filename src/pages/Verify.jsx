import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { formatDate } from '../utility/formatters';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - VERIFY PAGE (PROTECTED)
 * Blackbird IT Style: Dark Black + Neon Green
 * Verify document integrity and detect tampering
 * ═══════════════════════════════════════════════════════════════════
 */

const Verify = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentText, setDocumentText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const token = localStorage.getItem('eminent_token');

      let response;

      if (uploadedFile) {
        // Send multipart/form-data when a file is present
        const form = new FormData();
        form.append('file', uploadedFile, uploadedFileName || uploadedFile.name);

        response = await fetch(`http://localhost:3000/document/verify/${documentId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: form
        });
      } else {
        // Fallback to JSON text submission
        response = await fetch(`http://localhost:3000/document/verify/${documentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ documentText })
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify document');
      }

      // Normalize response to expected shape used by this component
      const normalized = {
        ...data,
        auditTrail: data.auditTrail || {},
      };

      setResult(normalized);
    } catch (err) {
      setError(err.message || 'An error occurred while verifying the document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-green-500 mb-4">
            VERIFY DOCUMENT
          </h1>
          <p className="text-gray-400 text-lg uppercase tracking-wider">
            Detect tampering with mathematical certainty
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Verify Form */}
          <form onSubmit={handleVerifyDocument} className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-12 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                DOCUMENT ID
              </label>
              <input
                type="text"
                required
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors font-mono text-sm"
                placeholder="Enter the Document ID from storage"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                DOCUMENT CONTENT
              </label>
              <textarea
                rows="12"
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors resize-none font-mono text-sm"
                placeholder="Paste the document content you want to verify..."
              ></textarea>
              <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">
                Characters: {documentText.length}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                  OR UPLOAD A FILE
                </label>
                <input
                  type="file"
                  accept="*/*"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    setUploadedFile(f || null);
                    setUploadedFileName(f ? f.name : '');
                  }}
                  className="w-full text-sm text-gray-300 file:bg-black file:border-2 file:border-green-500/30 file:px-3 file:py-2 file:rounded-lg"
                />
                {uploadedFile && (
                  <p className="text-gray-400 text-xs mt-2">Selected: {uploadedFileName || uploadedFile.name} — {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg">
                <p className="text-red-500 font-black uppercase tracking-wider">❌ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !documentId.trim() || (!documentText.trim() && !uploadedFile)}
              className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'VERIFYING...' : 'VERIFY DOCUMENT'}
            </button>
          </form>

          {/* Result Display - Verified */}
          {result && result.match && (
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-lg p-12 animate-pulse">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-green-500 mb-2">
                  DOCUMENT VERIFIED
                </h2>
                <p className="text-gray-400 uppercase tracking-wider text-sm">
                  No tampering detected - Document is authentic
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    VERIFICATION STATUS
                  </label>
                  <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                    <p className="text-green-500 font-black text-xl uppercase">AUTHENTIC</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    COMPUTED HASH
                  </label>
                  <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                    <code className="text-white font-mono text-sm break-all">{result.auditTrail?.submittedHash || result.auditTrail?.computedHash || '—'}</code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    STORED HASH
                  </label>
                  <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                    <code className="text-white font-mono text-sm break-all">{result.auditTrail?.originalHash || result.originalHash || '—'}</code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                      MATCH STATUS
                    </label>
                    <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                      <p className="text-green-500 font-black">✓ HASHES MATCH</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                      VERIFIED AT
                    </label>
                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                      <p className="text-white text-sm">
                        {result.auditTrail?.timestamp ? formatDate(result.auditTrail.timestamp) : (result.verifiedAt ? formatDate(result.verifiedAt) : formatDate(new Date().toISOString()))}
                      </p>
                    </div>
                  </div>
                </div>

                {result.auditTrail?.storedAt && (
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                      ORIGINAL STORAGE DATE
                    </label>
                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                      <p className="text-white text-sm">
                        {result.auditTrail?.originalCreatedAt ? formatDate(result.auditTrail.originalCreatedAt) : (result.createdAt ? formatDate(result.createdAt) : '—')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 p-4 bg-green-500/10 border-2 border-green-500 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <span className="text-green-500 font-black">✓ VERIFICATION COMPLETE:</span> This document has not been modified since it was originally stored. The cryptographic hash matches perfectly.
                </p>
              </div>
            </div>
          )}

          {/* Result Display - Tampered */}
          {result && !result.match && (
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-lg p-12">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-red-500 mb-2">
                  TAMPERING DETECTED
                </h2>
                <p className="text-gray-400 uppercase tracking-wider text-sm">
                  Document has been modified - Verification failed
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-red-500 mb-2">
                    VERIFICATION STATUS
                  </label>
                  <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                    <p className="text-red-500 font-black text-xl uppercase">TAMPERED</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-red-500 mb-2">
                    COMPUTED HASH (CURRENT)
                  </label>
                  <div className="bg-black border-2 border-red-500/30 rounded-lg p-4">
                    <code className="text-white font-mono text-sm break-all">{result.auditTrail?.submittedHash || result.auditTrail?.computedHash || '—'}</code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-red-500 mb-2">
                    STORED HASH (ORIGINAL)
                  </label>
                  <div className="bg-black border-2 border-red-500/30 rounded-lg p-4">
                    <code className="text-white font-mono text-sm break-all">{result.auditTrail?.originalHash || result.originalHash || '—'}</code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-red-500 mb-2">
                      MATCH STATUS
                    </label>
                    <div className="bg-black border-2 border-red-500 rounded-lg p-4">
                      <p className="text-red-500 font-black">✗ HASHES MISMATCH</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-red-500 mb-2">
                      VERIFIED AT
                    </label>
                    <div className="bg-black border-2 border-red-500/30 rounded-lg p-4">
                      <p className="text-white text-sm">
                        {result.auditTrail?.timestamp ? formatDate(result.auditTrail.timestamp) : (result.verifiedAt ? formatDate(result.verifiedAt) : formatDate(new Date().toISOString()))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <span className="text-red-500 font-black">⚠️ WARNING:</span> The document content does not match the stored cryptographic hash. This indicates unauthorized modifications have been made since the original storage.
                </p>
              </div>
            </div>
          )}

          {/* Info Cards */}
          {!result && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">DETECT CHANGES</h4>
                <p className="text-gray-400 text-sm">Even 1 character modification</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">INSTANT</h4>
                <p className="text-gray-400 text-sm">Real-time verification</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">SECURE</h4>
                <p className="text-gray-400 text-sm">Military-grade security</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
