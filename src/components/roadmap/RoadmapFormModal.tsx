'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import TagInput from './TagInput';

interface RoadmapFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { Name: string; Description: string; Tag: string }) => Promise<void>;
  initialData?: { Name: string; Description: string; Tag: string } | null;
  isSubmitting: boolean;
}

export default function RoadmapFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: RoadmapFormModalProps) {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Tag: '',
  });

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ Name: '', Description: '', Tag: '' });
        }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold font-rubik text-gray-900">
            {initialData ? 'Edit Feature' : 'Add New Feature'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-shadow"
              placeholder="e.g. Dark Mode"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.Description}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-shadow"
              placeholder="Describe the feature..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <TagInput
              value={formData.Tag}
              onChange={(value) => setFormData({ ...formData, Tag: value })}
              placeholder="Type and press Enter to add tags"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-black bg-brand-yellow rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Feature'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
