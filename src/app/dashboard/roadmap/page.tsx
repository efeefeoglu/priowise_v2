'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, AlertCircle, Loader2, Upload } from 'lucide-react';
import RoadmapFormModal from '@/components/roadmap/RoadmapFormModal';
import RoadmapUploadModal from '@/components/roadmap/RoadmapUploadModal';

interface RoadmapRecord {
  id: string;
  fields: {
    Name: string;
    Description: string;
    Tag?: string;
    Status?: string;
    Priority?: string;
    'Priowise Score'?: number;
    Source?: string;
    Email?: string;
    'Feature ID'?: number;
    [key: string]: any;
  };
}

export default function RoadmapPage() {
  const [records, setRecords] = useState<RoadmapRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RoadmapRecord | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/roadmap');
      if (!res.ok) throw new Error('Failed to fetch records');
      const data = await res.json();
      setRecords(data.records || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCreate = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: RoadmapRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feature?')) return;

    try {
      const res = await fetch(`/api/roadmap/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete record');

      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(`Error deleting record: ${err.message}`);
    }
  };

  const handleSubmit = async (data: { Name: string; Description: string; Tag: string }) => {
    try {
      setIsSubmitting(true);
      if (editingRecord) {
        // Update
        const res = await fetch(`/api/roadmap/${editingRecord.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update record');

        // Optimistic update or refetch
        fetchRecords();
      } else {
        // Create
        const res = await fetch('/api/roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create record');

        fetchRecords();
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Error saving record: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && records.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-rubik text-gray-900">Feature Roadmap</h1>
          <p className="text-gray-500 mt-1">Manage and track your feature requests.</p>
        </div>
        <div className="flex gap-2">
            <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
            <Upload size={20} />
            Upload CSV
            </button>
            <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors shadow-sm"
            >
            <Plus size={20} />
            Add Feature
            </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 w-1/4">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 w-1/3">Description</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Score</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Tags</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No features found. Start by adding one!
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {record.fields.Name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <p className="line-clamp-2">{record.fields.Description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {record.fields.Status || 'Created'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.fields.Priority || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.fields['Priowise Score'] || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {record.fields.Tag ? (
                          record.fields.Tag.split(',').map((tag: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {tag.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RoadmapFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          editingRecord
            ? {
                Name: editingRecord.fields.Name,
                Description: editingRecord.fields.Description,
                Tag: editingRecord.fields.Tag || '',
              }
            : null
        }
        isSubmitting={isSubmitting}
      />

      <RoadmapUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
            fetchRecords();
        }}
      />
    </div>
  );
}
