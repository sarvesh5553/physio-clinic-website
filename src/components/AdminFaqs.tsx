'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

// Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  status: 'published' | 'draft';
  createdAt: string;
}

interface ModalState {
  isOpen: boolean;
  editingId: string | null;
}

interface DeleteState {
  isOpen: boolean;
  itemId: string | null;
}

// Demo Data
const DEMO_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What is physiotherapy and how can it help me?',
    answer: 'Physiotherapy is a healthcare profession that helps restore movement and function to people affected by injury, illness or disability. It uses manual therapy, exercises, and other techniques to improve mobility and reduce pain.',
    status: 'published',
    createdAt: '2024-06-20',
  },
  {
    id: '2',
    question: 'How long does a typical physiotherapy session last?',
    answer: 'A standard physiotherapy session typically lasts between 45 minutes to 1 hour. The duration may vary depending on your specific condition and treatment plan. We recommend booking appointments in advance.',
    status: 'published',
    createdAt: '2024-06-19',
  },
  {
    id: '3',
    question: 'Do I need a referral from my doctor?',
    answer: 'In many cases, you can see a physiotherapist without a doctor referral, though some insurance plans may require one. We recommend checking with your insurance provider or contacting us directly for more information.',
    status: 'published',
    createdAt: '2024-06-18',
  },
  {
    id: '4',
    question: 'What conditions do you treat?',
    answer: 'We treat a wide range of conditions including back pain, neck pain, sports injuries, post-surgical rehabilitation, arthritis, and many other musculoskeletal conditions. Contact us to discuss your specific condition.',
    status: 'draft',
    createdAt: '2024-06-17',
  },
  {
    id: '5',
    question: 'How many sessions will I need?',
    answer: 'The number of sessions required varies depending on your condition, severity, and recovery goals. During your initial assessment, we will provide an estimate of the expected treatment duration.',
    status: 'published',
    createdAt: '2024-06-16',
  },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: 'published' | 'draft' }> = ({ status }) => {
  const isPublished = status === 'published';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isPublished
          ? 'bg-teal-50 text-teal-700 border border-teal-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isPublished ? 'bg-teal-600' : 'bg-gray-400'
        }`}
      />
      {isPublished ? 'Published' : 'Draft'}
    </span>
  );
};

// Compact Stat Card Component
const StatCard: React.FC<{ label: string; value: number | string; icon: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-2.5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl group-hover:shadow-md transition-shadow">
        {icon}
      </div>
    </div>
  </div>
);

// Add/Edit FAQ Modal
const FAQModal: React.FC<{
  isOpen: boolean;
  editingId: string | null;
  onClose: () => void;
  onSave: (data: Omit<FAQ, 'id' | 'createdAt'>) => void;
  initialData?: FAQ;
}> = ({ isOpen, editingId, onClose, onSave, initialData }) => {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialData?.status || 'draft'
  );

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSave({
        question,
        answer,
        status,
      });
      setQuestion('');
      setAnswer('');
      setStatus('draft');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="text-lg font-bold text-gray-900">
            {editingId ? 'Edit FAQ' : 'Add FAQ'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter FAQ question"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter detailed answer"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none h-32"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-100 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!question.trim() || !answer.trim()}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmation: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl">
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete FAQ?</h3>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete this FAQ? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// FAQ Admin Card Component
const FAQAdminCard: React.FC<{
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ faq, isExpanded, onToggle, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
    <div
      onClick={onToggle}
      className="flex items-start justify-between gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {faq.question}
        </h3>
        {!isExpanded && (
          <p className="text-gray-600 text-xs line-clamp-1">
            {faq.answer}
          </p>
        )}
      </div>
      <div className="flex gap-2 flex-shrink-0 ml-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(faq.id);
          }}
          className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4 text-gray-600 hover:text-teal-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(faq.id);
          }}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>

    {isExpanded && (
      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
        <div className="space-y-3">
          <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
          <div className="pt-2">
            <StatusBadge status={faq.status} />
          </div>
        </div>
      </div>
    )}
  </div>
);

// Main Component
export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<FAQ[]>(DEMO_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    editingId: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    isOpen: false,
    itemId: null,
  });

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get stats
  const totalFaqs = faqs.length;
  const publishedFaqs = faqs.filter((f) => f.status === 'published').length;
  const draftFaqs = faqs.filter((f) => f.status === 'draft').length;
  const lastUpdated = faqs.length > 0
    ? new Date(faqs[0].createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  // Get modal data
  const getModalData = () => {
    if (modal.editingId) {
      return faqs.find((f) => f.id === modal.editingId);
    }
    return undefined;
  };

  // Handle save FAQ
  const handleSaveFAQ = (data: Omit<FAQ, 'id' | 'createdAt'>) => {
    if (modal.editingId) {
      // TODO: Update FAQ
      setFaqs(
        faqs.map((f) =>
          f.id === modal.editingId
            ? { ...f, ...data }
            : f
        )
      );
    } else {
      // TODO: Add FAQ
      setFaqs([
        {
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
          ...data,
        },
        ...faqs,
      ]);
    }
    setModal({ isOpen: false, editingId: null });
  };

  // Handle edit
  const handleEdit = (id: string) => {
    setModal({
      isOpen: true,
      editingId: id,
    });
  };

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setDeleteDialog({
      isOpen: true,
      itemId: id,
    });
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteDialog.itemId) {
      // TODO: Delete FAQ
      setFaqs(faqs.filter((f) => f.id !== deleteDialog.itemId));
    }
    setDeleteDialog({ isOpen: false, itemId: null });
  };

  return (
    <div className="min-h-screen text-gray-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">FAQs</h1>
          <p className="text-teal-100">Manage website frequently asked questions.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
        {/* Stats - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            label="Total FAQs"
            value={totalFaqs}
            icon={<FileText className="w-5 h-5 text-teal-600" />}
          />
          <StatCard
            label="Published"
            value={publishedFaqs}
            icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
          />
          <StatCard
            label="Drafts"
            value={draftFaqs}
            icon={<Clock className="w-5 h-5 text-teal-600" />}
          />
          <StatCard
            label="Last Updated"
            value={lastUpdated}
            icon={<Zap className="w-5 h-5 text-teal-600" />}
          />
        </div>

        {/* Search and Action */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by question or answer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => setModal({ isOpen: true, editingId: null })}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* FAQ Management Cards */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FAQAdminCard
                key={faq.id}
                faq={faq}
                isExpanded={expandedId === faq.id}
                onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No FAQs found</p>
              <p className="text-gray-400 text-sm">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Create your first FAQ by clicking the Add FAQ button'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FAQModal
        isOpen={modal.isOpen}
        editingId={modal.editingId}
        onClose={() => setModal({ isOpen: false, editingId: null })}
        onSave={handleSaveFAQ}
        initialData={getModalData()}
      />

      <DeleteConfirmation
        isOpen={deleteDialog.isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, itemId: null })}
      />
    </div>
  );
}