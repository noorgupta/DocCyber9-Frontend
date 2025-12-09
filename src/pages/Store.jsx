import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { apiCall } from '../utility/api';
import { formatDate } from '../utility/formatters';

/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - STORE PAGE (PROTECTED)
 * Blackbird IT Style: Dark Black + Neon Green
 * Store document hashes with military-grade security
 * ═══════════════════════════════════════════════════════════════════
 */

const Store = () => {
  const [documentText, setDocumentText] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [fileBase64, setFileBase64] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleStoreDocument = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

  try {
      // Use the centralized API utility with automatic JWT authentication
      // Use Base64 content for files. If fileBase64 is present, send it (without data:*;base64, prefix).
      const payloadText = fileBase64 || documentText;

      if (!payloadText) throw new Error('No file or document content to store. Please upload a file or paste content.');

      let data;
      // If we have an uploadedFile, send multipart/form-data
      if (uploadedFile) {
        const form = new FormData();
        form.append('file', uploadedFile, uploadedFile.name);
        form.append('fileName', documentName || uploadedFileName || uploadedFile.name);
        // apiCall understands FormData
        data = await apiCall('/document/store', 'POST', form, true);
      } else {
        data = await apiCall(
          '/document/store',
          'POST',
          {
            documentText: payloadText,
            fileName: documentName || uploadedFileName || 'Unnamed Document'
          },
          true // requiresAuth = true
        );
      }

  // (no raw debug response stored in UI)

  // Check if successful
  if (data.success) {
        // Robustly search the response for common keys (id, hash, salt, timestamp)
        function findValue(obj, candidates) {
          if (!obj || typeof obj !== 'object') return undefined;
          const queue = [obj];
          const seen = new WeakSet();
          while (queue.length) {
            const cur = queue.shift();
            if (!cur || typeof cur !== 'object' || seen.has(cur)) continue;
            seen.add(cur);
            for (const k of candidates) {
              if (Object.prototype.hasOwnProperty.call(cur, k) && cur[k] != null) return cur[k];
            }
            for (const v of Object.values(cur)) {
              if (v && typeof v === 'object') queue.push(v);
            }
          }
          return undefined;
        }

        const idCandidates = ['id', '_id', 'documentId', 'document_id', 'docId', 'documentId'];
        const hashCandidates = ['sha256Hash', 'sha256', 'hash', 'fileHash', 'sha256_hash'];
        const saltCandidates = ['salt', 'saltValue', 'uuid', 'salt_uuid', 'saltId'];
        const tsCandidates = ['timestamp', 'createdAt', 'created_at', 'created', 'date', 'time'];

        const idVal = data.id || findValue(data, idCandidates) || null;
        const hashVal = data.hash || findValue(data, hashCandidates) || null;
        const saltVal = data.salt || findValue(data, saltCandidates) || null;
        const tsVal = data.timestamp || findValue(data, tsCandidates) || null;

        const normalized = {
          id: idVal ? (typeof idVal === 'object' && idVal._id ? String(idVal._id) : String(idVal)) : '—',
          hash: hashVal || '—',
          salt: saltVal || '—',
          timestamp: tsVal || null,
        };

        // If backend returned only an id (minimal response), try to fetch full details
        if ((normalized.hash === '—' || normalized.salt === '—' || !normalized.timestamp) && normalized.id && normalized.id !== '—') {
          try {
            const details = await apiCall(`/document/${normalized.id}`, 'GET', null, true);
            // no debug response saved
            if (details && details.success) {
              // try to find values in details
              const dv = details.document || details.data || details;
              const detHash = findValue(dv, hashCandidates) || details.hash || null;
              const detSalt = findValue(dv, saltCandidates) || details.salt || null;
              const detTs = findValue(dv, tsCandidates) || details.timestamp || details.createdAt || null;

              if (detHash) normalized.hash = detHash;
              if (detSalt) normalized.salt = detSalt;
              if (detTs) normalized.timestamp = detTs;
            }
          } catch (fetchErr) {
            // ignore, we'll show what's available
          }
        } else {
          // nothing extra to save
        }

  // Store the normalized result and clear form + uploaded file state
  setResult(normalized);
  setDocumentText('');
  setDocumentName('');
  setFileBase64(null);
  setUploadedFileName('');
  setUploadedFileSize(0);
  setError('');
      } else {
        throw new Error(data.message || 'Failed to store document');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while storing the document');
      setResult(null);
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
            STORE HASH
          </h1>
          <p className="text-gray-400 text-lg uppercase tracking-wider">
            Cryptographically secure your documents
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Store Form */}
          <form onSubmit={handleStoreDocument} className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-12 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                DOCUMENT NAME
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                placeholder="e.g., Contract_2024.pdf (optional)"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-3">
                UPLOAD FILE
              </label>
              <input
                type="file"
                accept="*/*"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (!f) {
                    setFileBase64(null);
                    setUploadedFileName('');
                    setUploadedFileSize(0);
                    setUploadedFile(null);
                    return;
                  }

                  // Keep native file reference so we can send it via FormData
                  setUploadedFile(f);
                  setUploadedFileName(f.name);
                  setUploadedFileSize(f.size);

                  // Still compute a Base64 preview optionally (not required for upload)
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const res = reader.result || '';
                      const parts = res.split(',');
                      const b64 = parts.length > 1 ? parts[1] : parts[0];
                      setFileBase64(b64);
                    } catch (err) {
                      console.error('Failed to read file as base64', err);
                      setFileBase64(null);
                    }
                  };
                  reader.onerror = (err) => {
                    console.error('FileReader error', err);
                    setFileBase64(null);
                  };
                  reader.readAsDataURL(f);
                }}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-black file:bg-green-500 file:text-black"
              />

              <div className="mt-3 text-xs text-gray-400">
                {uploadedFileName ? (
                  <div>
                    <strong className="text-white">{uploadedFileName}</strong> <span className="text-gray-500">({Math.round(uploadedFileSize/1024)} KB)</span>
                  </div>
                ) : (
                  <div className="text-gray-500">No file uploaded — the file will be converted to Base64 and securely hashed.</div>
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
              disabled={loading || (!documentText.trim() && !fileBase64)}
              className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'STORING...' : 'STORE DOCUMENT'}
            </button>
          </form>

          {/* Result Display */}
          {result && (
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-lg p-12 animate-pulse">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-green-500 mb-2">
                  DOCUMENT STORED
                </h2>
                <p className="text-gray-400 uppercase tracking-wider text-sm">
                  Your document has been cryptographically secured
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    DOCUMENT ID
                  </label>
                  <div className="bg-black border-2 border-green-500/30 rounded-lg p-4 flex items-center justify-between">
                    <code className="text-white font-mono text-sm break-all">{result.id}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.id)}
                      className="ml-4 px-4 py-2 bg-green-500 text-black font-black uppercase tracking-wider text-xs rounded hover:bg-green-400 transition-colors"
                    >
                      COPY
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    SHA-256 HASH
                  </label>
                  <div className="bg-black border-2 border-green-500/30 rounded-lg p-4 flex items-start justify-between">
                    <code className="text-white font-mono text-sm break-all mr-4">{result.hash || '—'}</code>
                    {result.hash && result.hash !== '—' && (
                      <button
                        onClick={() => navigator.clipboard.writeText(result.hash)}
                        className="ml-4 px-3 py-2 bg-green-500 text-black font-black uppercase tracking-wider text-xs rounded hover:bg-green-400 transition-colors"
                      >
                        COPY
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                    SALT (UUID)
                  </label>
                  <div className="bg-black border-2 border-green-500/30 rounded-lg p-4 flex items-start justify-between">
                    <code className="text-white font-mono text-sm break-all mr-4">{result.salt || '—'}</code>
                    {result.salt && result.salt !== '—' && (
                      <button
                        onClick={() => navigator.clipboard.writeText(result.salt)}
                        className="ml-4 px-3 py-2 bg-green-500 text-black font-black uppercase tracking-wider text-xs rounded hover:bg-green-400 transition-colors"
                      >
                        COPY
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                      STORED AT
                    </label>
                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                      <p className="text-white text-sm">
                        {result.timestamp ? formatDate(result.timestamp) : '—'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-green-500 mb-2">
                      ALGORITHM
                    </label>
                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                      <p className="text-white text-sm font-black">SHA-256</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <span className="text-green-500 font-black">⚠️ IMPORTANT:</span> Save your <span className="text-green-500">Document ID</span> and <span className="text-green-500">Salt</span>. You'll need them to verify this document later.
                </p>
              </div>

              {/* Debug panel removed */}
            </div>
          )}

          {/* Info Cards */}
          {!result && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🔐</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">SHA-256</h4>
                <p className="text-gray-400 text-sm">Military-grade hashing</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🔑</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">UNIQUE SALT</h4>
                <p className="text-gray-400 text-sm">UUID v4 generation</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📋</div>
                <h4 className="text-lg font-black uppercase tracking-wider text-green-500 mb-2">AUDIT TRAIL</h4>
                <p className="text-gray-400 text-sm">Complete history</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
