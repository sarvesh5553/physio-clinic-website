'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Edit2,
  Trash2,
  Activity,
  Dumbbell,
  Brain,
  HeartPulse,
  Zap,
  Building2,
  Layers,
  Syringe,
  BriefcaseMedical,
  CheckCircle2,
  X,
  AlertTriangle,
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react';

// Types
interface Condition {
  id: string;
  title: string;
  image: string;
  status: 'published' | 'draft';
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'published' | 'draft';
}

interface ModalState {
  type: null | 'condition' | 'service';
  isOpen: boolean;
  editingId: null | string;
}

interface DeleteState {
  isOpen: boolean;
  type: null | 'condition' | 'service';
  itemId: null | string;
}

// Demo Data - Updated with illustration-style images
const DEMO_CONDITIONS: Condition[] = [
  {
    id: '1',
    title: 'Back Pain',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
  {
    id: '2',
    title: 'Neck Pain',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
  {
    id: '3',
    title: 'Sciatica',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'draft',
  },
  {
    id: '4',
    title: 'Frozen Shoulder',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
  {
    id: '5',
    title: 'Arthritis',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
  {
    id: '6',
    title: 'Knee Pain',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
  {
    id: '7',
    title: 'Shoulder Pain',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'draft',
  },
  {
    id: '8',
    title: 'Tennis Elbow',
    image: 'https://images.unsplash.com/photo-1609618667171-a1af3f7d3a2e?w=400&h=300&fit=crop&bg=white',
    status: 'published',
  },
];

const DEMO_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Physical Therapy',
    description: 'One-on-one personalized therapy sessions',
    icon: 'Activity',
    status: 'published',
  },
  {
    id: '2',
    title: 'Strength Training',
    description: 'Build muscle and improve endurance',
    icon: 'Dumbbell',
    status: 'published',
  },
  {
    id: '3',
    title: 'Cognitive Therapy',
    description: 'Mental health and wellness support',
    icon: 'Brain',
    status: 'draft',
  },
  {
    id: '4',
    title: 'Cardiac Rehabilitation',
    description: 'Heart health recovery programs',
    icon: 'HeartPulse',
    status: 'published',
  },
  {
    id: '5',
    title: 'Energy Boost',
    description: 'Intensive energy restoration therapy',
    icon: 'Zap',
    status: 'published',
  },
  {
    id: '6',
    title: 'Corporate Wellness',
    description: 'Workplace health and wellness programs',
    icon: 'Building2',
    status: 'published',
  },
];

const ICON_OPTIONS = [
  { name: 'Activity', icon: Activity },
  { name: 'Dumbbell', icon: Dumbbell },
  { name: 'Brain', icon: Brain },
  { name: 'HeartPulse', icon: HeartPulse },
  { name: 'Zap', icon: Zap },
  { name: 'Building2', icon: Building2 },
  { name: 'Layers', icon: Layers },
  { name: 'Syringe', icon: Syringe },
  { name: 'BriefcaseMedical', icon: BriefcaseMedical },
  { name: 'CheckCircle2', icon: CheckCircle2 },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: 'published' | 'draft' }> = ({ status }) => {
  const isPublished = status === 'published';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        isPublished
          ? 'bg-teal-50 text-teal-700'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isPublished ? 'bg-teal-600' : 'bg-gray-400'
        }`}
      />
      {isPublished ? 'Published' : 'Draft'}
    </span>
  );
};

// Stat Card Component
const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

// Add/Edit Condition Modal
const ConditionModal: React.FC<{
  isOpen: boolean;
  editingId: string | null;
  onClose: () => void;
  onSave: (data: Omit<Condition, 'id'>) => void;
  initialData?: Condition;
}> = ({ isOpen, editingId, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialData?.status || 'draft'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setImage(initialData.image);
      setImagePreview(initialData.image);
      setStatus(initialData.status);
    } else {
      setTitle('');
      setImage('');
      setImagePreview('');
      setStatus('draft');
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (title.trim() && imagePreview) {
      onSave({
        title,
        image: imagePreview,
        status,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {editingId ? 'Edit Condition' : 'Add Condition'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Condition Image (PNG)
            </label>
            {imagePreview && (
              <div className="mb-3 relative bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-contain p-4"
                />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-teal-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload PNG Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Condition Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Back Pain"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
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
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!imagePreview || !title.trim()}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Service Modal
const ServiceModal: React.FC<{
  isOpen: boolean;
  editingId: string | null;
  onClose: () => void;
  onSave: (data: Omit<Service, 'id'>) => void;
  initialData?: Service;
}> = ({ isOpen, editingId, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || 'Activity');
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialData?.status || 'draft'
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setSelectedIcon(initialData.icon);
      setStatus(initialData.status);
    } else {
      setTitle('');
      setDescription('');
      setSelectedIcon('Activity');
      setStatus('draft');
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onSave({
        title,
        description,
        icon: selectedIcon,
        status,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="text-lg font-bold text-gray-900">
            {editingId ? 'Edit Service' : 'Add Service'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Service Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map(({ name, icon: IconComponent }) => (
                <button
                  key={name}
                  onClick={() => setSelectedIcon(name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedIcon === name
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mx-auto text-gray-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Physical Therapy"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this service..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none h-24"
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
            disabled={!title.trim() || !description.trim()}
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
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, itemName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl">
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Item</h3>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
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

// Horizontal Scrolling Conditions Cards
const ConditionsTab: React.FC<{
  conditions: Condition[];
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
}> = ({ conditions, onEdit, onDelete }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 100);
    }
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronLeft className="w-5 h-5 text-teal-600" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-4 pb-4 px-4">
          {conditions.map((condition) => (
            <div
              key={condition.id}
              className="flex-shrink-0 w-64 group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
                {/* Image Container */}
                <div className="relative h-40 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={condition.image}
                    alt={condition.title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                    {condition.title}
                  </h4>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <StatusBadge status={condition.status} />
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(condition.id)}
                        className="p-1.5 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                      <button
                        onClick={() => onDelete(condition.id, condition.title)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronRight className="w-5 h-5 text-teal-600" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// Horizontal Scrolling Services Cards
const ServicesTab: React.FC<{
  services: Service[];
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
}> = ({ services, onEdit, onDelete }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 100);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icon = ICON_OPTIONS.find((i) => i.name === iconName);
    return icon?.icon || Activity;
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronLeft className="w-5 h-5 text-teal-600" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-4 pb-4 px-4">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <div
                key={service.id}
                className="flex-shrink-0 w-64 group"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 h-full flex flex-col border border-gray-100">
                  {/* Icon */}
                  <div className="p-3 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl w-fit mb-4 group-hover:shadow-md transition-shadow">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-gray-900 text-sm mb-2">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-4 flex-1">
                    {service.description}
                  </p>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <StatusBadge status={service.status} />
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(service.id)}
                        className="p-1.5 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600 hover:text-teal-600" />
                      </button>
                      <button
                        onClick={() => onDelete(service.id, service.title)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronRight className="w-5 h-5 text-teal-600" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// Main Component
export default function AdminServices() {
  const [conditions, setConditions] = useState<Condition[]>(DEMO_CONDITIONS);
  const [services, setServices] = useState<Service[]>(DEMO_SERVICES);
  const [activeTab, setActiveTab] = useState<'conditions' | 'services'>('conditions');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<ModalState>({
    type: null,
    isOpen: false,
    editingId: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    isOpen: false,
    type: null,
    itemId: null,
  });
  const [deleteItemName, setDeleteItemName] = useState('');

  // Filter data based on search query
  const filteredConditions = conditions.filter((condition) =>
    condition.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get modal data
  const getConditionData = () => {
    if (modal.editingId) {
      return conditions.find((c) => c.id === modal.editingId);
    }
    return undefined;
  };

  const getServiceData = () => {
    if (modal.editingId) {
      return services.find((s) => s.id === modal.editingId);
    }
    return undefined;
  };

  // Handle condition save
  const handleSaveCondition = (data: Omit<Condition, 'id'>) => {
    if (modal.editingId) {
      // TODO: Connect Supabase
      setConditions(
        conditions.map((c) =>
          c.id === modal.editingId
            ? { ...c, ...data }
            : c
        )
      );
    } else {
      // TODO: Connect Supabase
      setConditions([
        ...conditions,
        {
          id: Date.now().toString(),
          ...data,
        },
      ]);
    }
    setModal({ type: null, isOpen: false, editingId: null });
  };

  // Handle service save
  const handleSaveService = (data: Omit<Service, 'id'>) => {
    if (modal.editingId) {
      // TODO: Connect Supabase
      setServices(
        services.map((s) =>
          s.id === modal.editingId
            ? { ...s, ...data }
            : s
        )
      );
    } else {
      // TODO: Connect Supabase
      setServices([
        ...services,
        {
          id: Date.now().toString(),
          ...data,
        },
      ]);
    }
    setModal({ type: null, isOpen: false, editingId: null });
  };

  // Handle edit
  const handleEdit = (id: string, type: 'condition' | 'service') => {
    setModal({
      type,
      isOpen: true,
      editingId: id,
    });
  };

  // Handle delete
  const handleDeleteClick = (id: string, type: 'condition' | 'service', name: string) => {
    setDeleteDialog({
      isOpen: true,
      type,
      itemId: id,
    });
    setDeleteItemName(name);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteDialog.type === 'condition' && deleteDialog.itemId) {
      // TODO: Connect Supabase
      setConditions(conditions.filter((c) => c.id !== deleteDialog.itemId));
    } else if (deleteDialog.type === 'service' && deleteDialog.itemId) {
      // TODO: Connect Supabase
      setServices(services.filter((s) => s.id !== deleteDialog.itemId));
    }
    setDeleteDialog({ isOpen: false, type: null, itemId: null });
  };

  const totalPublished =
    conditions.filter((c) => c.status === 'published').length +
    services.filter((s) => s.status === 'published').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Services & Conditions</h1>
          <p className="text-teal-100">Manage website services and conditions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Conditions"
            value={conditions.length}
            icon={<Brain className="w-6 h-6 text-teal-600" />}
          />
          <StatCard
            label="Total Services"
            value={services.length}
            icon={<Layers className="w-6 h-6 text-teal-600" />}
          />
          <StatCard
            label="Published Items"
            value={totalPublished}
            icon={<CheckCircle2 className="w-6 h-6 text-teal-600" />}
          />
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conditions and services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setModal({ type: 'condition', isOpen: true, editingId: null })
                }
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>Condition</span>
              </button>
              <button
                onClick={() =>
                  setModal({ type: 'service', isOpen: true, editingId: null })
                }
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('conditions')}
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                activeTab === 'conditions'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conditions ({filteredConditions.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                activeTab === 'services'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Services ({filteredServices.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'conditions' && (
              <ConditionsTab
                conditions={filteredConditions}
                onEdit={(id) => handleEdit(id, 'condition')}
                onDelete={(id, title) => handleDeleteClick(id, 'condition', title)}
              />
            )}
            {activeTab === 'services' && (
              <ServicesTab
                services={filteredServices}
                onEdit={(id) => handleEdit(id, 'service')}
                onDelete={(id, title) => handleDeleteClick(id, 'service', title)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConditionModal
        isOpen={modal.isOpen && modal.type === 'condition'}
        editingId={modal.editingId}
        onClose={() => setModal({ type: null, isOpen: false, editingId: null })}
        onSave={handleSaveCondition}
        initialData={getConditionData()}
      />

      <ServiceModal
        isOpen={modal.isOpen && modal.type === 'service'}
        editingId={modal.editingId}
        onClose={() => setModal({ type: null, isOpen: false, editingId: null })}
        onSave={handleSaveService}
        initialData={getServiceData()}
      />

      <DeleteConfirmation
        isOpen={deleteDialog.isOpen}
        itemName={deleteItemName}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteDialog({ isOpen: false, type: null, itemId: null })
        }
      />
    </div>
  );
}