'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface RoadmapUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RoadmapUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: RoadmapUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/roadmap/upload', {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        // If response is not JSON (e.g. fatal server error html)
        data = null;
      }

      if (!res.ok) {
        const errorDetails = data?.details ? ` (${data.details})` : '';
        const errorMessage = data?.error || 'Failed to upload file';
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      if (data && data.success) {
        onSuccess();
        onClose();
        setFile(null); // Reset
      } else {
        throw new Error('Upload failed');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold font-rubik text-gray-900">
            Upload CSV
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500">
            Upload a CSV, Excel, or PDF file containing your feature requests. Our AI will extract the features and add them to your roadmap.
          </p>

          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              file ? 'border-brand-yellow bg-yellow-50/20' : 'border-gray-200 hover:border-brand-yellow hover:bg-gray-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.pdf,.docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/csv,application/vnd.ms-excel"
            />

            {file ? (
              <>
                <FileText className="w-10 h-10 text-brand-yellow mb-2" />
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                <button
                    className="mt-4 text-xs text-red-500 hover:underline"
                    onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                    }}
                >
                    Remove
                </button>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-900">Click to upload</p>
                <p className="text-xs text-gray-500 mt-1">CSV, PDF, DOCX (Max 5MB)</p>
              </>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="break-all">{error}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-brand-yellow rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Upload & Process'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
