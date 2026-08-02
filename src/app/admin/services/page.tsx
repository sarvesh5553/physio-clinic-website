'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Layers3,
  Activity,
  CheckCircle2,
  X,
  AlertTriangle,
  Loader,
  Brain,
  Dumbbell,
  HeartPulse,
  Zap,
  Building2,
  Syringe,
  BriefcaseMedical,
  CheckCircle,
  Image as ImageIcon,
} from 'lucide-react';

// ============ TYPES ============
interface Service {
  _id: string;
  title: string;
  description: string;
  type: 'condition' | 'service';
  icon: string;
  image?: {
    url: string;
    publicId?: string;
  };
  order: number;
  isPublished: boolean;
  createdAt?: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ============ INITIAL DATA FALLBACK ============
const INITIAL_SEED_DATA: Service[] = [
  { _id: 'c1', title: 'Back Pain', description: 'Comprehensive relief for acute and chronic back pain.', type: 'condition', icon: 'Brain', order: 1, isPublished: true },
  { _id: 'c2', title: 'Neck Pain', description: 'Targeted therapy to alleviate neck stiffness and tension.', type: 'condition', icon: 'Brain', order: 2, isPublished: true },
  { _id: 'c3', title: 'Sciatica', description: 'Treatment for sciatic nerve pain and lumbar discomfort.', type: 'condition', icon: 'Brain', order: 3, isPublished: true },
  { _id: 'c4', title: 'Frozen Shoulder', description: 'Restoring mobility and reducing pain in shoulder joint.', type: 'condition', icon: 'Brain', order: 4, isPublished: true },
  { _id: 'c5', title: 'Arthritis', description: 'Managing joint inflammation and improving movement.', type: 'condition', icon: 'Brain', order: 5, isPublished: true },
  { _id: 'c6', title: 'Knee Pain', description: 'Rehabilitation for knee injuries and osteoarthritis.', type: 'condition', icon: 'Brain', order: 6, isPublished: true },
  { _id: 's1', title: 'Electrotherapy', description: 'Advanced technological modalities used to suppress pain and accelerate cellular repair.', type: 'service', icon: 'Zap', order: 1, isPublished: true },
  { _id: 's2', title: 'Pain Management', description: 'Evidence-based clinical approaches for acute and chronic pain relief.', type: 'service', icon: 'HeartPulse', order: 2, isPublished: true },
  { _id: 's3', title: 'Manual Therapy', description: 'Hands-on techniques to reduce pain, improve mobility and restore function.', type: 'service', icon: 'Activity', order: 3, isPublished: true },
  { _id: 's4', title: 'Exercise Therapy', description: 'Customized exercise programs to strengthen muscles and improve movement.', type: 'service', icon: 'CheckCircle', order: 4, isPublished: true },
  { _id: 's5', title: 'Neuro Rehabilitation', description: 'Specialized recovery framework designed for neurological conditions.', type: 'service', icon: 'Brain', order: 5, isPublished: true },
  { _id: 's6', title: 'Sports Rehabilitation', description: 'Helping athletes recover safely and return to peak performance.', type: 'service', icon: 'Dumbbell', order: 6, isPublished: true },
];

// ============ ICON MAPPER ============
const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  Dumbbell: <Dumbbell className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Syringe: <Syringe className="w-6 h-6" />,
  BriefcaseMedical: <BriefcaseMedical className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
};

const ICON_OPTIONS = [
  { name: 'Brain' },
  { name: 'Dumbbell' },
  { name: 'HeartPulse' },
  { name: 'Zap' },
  { name: 'Building2' },
  { name: 'Syringe' },
  { name: 'BriefcaseMedical' },
  { name: 'CheckCircle' },
  { name: 'Activity' },
];

// ============ TOAST CONTAINER ============
const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all ${
          toast.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : toast.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-200'
            : 'bg-sky-50 text-sky-800 border-sky-200'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
        {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
        <span className="text-sm font-medium flex-1">{toast.message}</span>
        <button onClick={() => onRemove(toast.id)} className="ml-auto text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
);

// ============ DELETE MODAL ============
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  title: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, isLoading, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Delete {title}?</h3>
          <p className="text-slate-500 text-sm">Are you sure you want to delete this item? Action cannot be undone.</p>
        </div>

        <div className="flex gap-3 p-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-white text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-rose-600 rounded-xl text-white font-medium hover:bg-rose-700 flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ DEDICATED ADD/EDIT FORM MODAL ============
const DedicatedItemModal: React.FC<{
  isOpen: boolean;
  type: 'condition' | 'service';
  service: Service | null;
  onClose: () => void;
  onSave: (data: Omit<Service, '_id' | 'createdAt'>) => Promise<void>;
}> = ({ isOpen, type, service, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || 'Brain',
    order: service?.order || 1,
    isPublished: service?.isPublished ?? true,
    imageUrl: service?.image?.url || '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || 'Brain',
        order: service.order,
        isPublished: service.isPublished,
        imageUrl: service.image?.url || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'Brain',
        order: 1,
        isPublished: true,
        imageUrl: '',
      });
    }
  }, [service, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload: Omit<Service, '_id' | 'createdAt'> = {
        title: formData.title,
        description: formData.description,
        type: type,
        icon: formData.icon,
        order: formData.order,
        isPublished: formData.isPublished,
        ...(type === 'condition' && formData.imageUrl ? { image: { url: formData.imageUrl, publicId: '' } } : {}),
      };

      await onSave(payload);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#0f969c]/10 text-[#0f969c]">
              {type === 'condition' ? <Layers3 className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              {service ? `Edit ${type === 'condition' ? 'Condition' : 'Service'}` : `Add New ${type === 'condition' ? 'Condition' : 'Service'}`}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {type === 'condition' ? 'Condition Name' : 'Service Title'}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={type === 'condition' ? 'e.g., Back Pain, Sciatica' : 'e.g., Electrotherapy, Dry Needling'}
              required
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f969c]/20 focus:border-[#0f969c] outline-none text-slate-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              placeholder="Enter details..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f969c]/20 focus:border-[#0f969c] outline-none text-slate-800 text-sm resize-none"
            />
          </div>

          {type === 'condition' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#0f969c]" /> Condition Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/condition-image.png"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f969c]/20 focus:border-[#0f969c] outline-none text-slate-800 text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Service Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {ICON_OPTIONS.map(({ name }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: name })}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                      formData.icon === name
                        ? 'border-[#0f969c] bg-[#0f969c]/10 text-[#0f969c]'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {ICON_MAP[name]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f969c]/20 focus:border-[#0f969c] outline-none text-slate-800 text-sm"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center cursor-pointer gap-2.5">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#0f969c] focus:ring-[#0f969c]"
                />
                <span className="text-sm font-semibold text-slate-700">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-[#0f969c] hover:bg-[#0c7c82] rounded-xl text-white font-medium shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Saving...' : `Save ${type === 'condition' ? 'Condition' : 'Service'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============ MAIN DASHBOARD PAGE ============
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'condition' | 'service'>('service');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'condition' | 'service'>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, itemId: '', title: '' });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services', { cache: 'no-store' });
      const result = await res.json();

      const items = result.data || result;
      if (Array.isArray(items) && items.length > 0) {
        setServices(items);
      } else {
        setServices(INITIAL_SEED_DATA);
      }
    } catch {
      setServices(INITIAL_SEED_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteItem = async (id: string) => {
    setDeleteLoading(true);
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      setServices((prev) => prev.filter((s) => s._id !== id));
      addToast('Item deleted successfully', 'success');
    } catch {
      setServices((prev) => prev.filter((s) => s._id !== id));
      addToast('Item removed', 'info');
    } finally {
      setDeleteLoading(false);
      setDeleteConfirm({ isOpen: false, itemId: '', title: '' });
    }
  };

  const togglePublish = async (item: Service) => {
    const updatedStatus = !item.isPublished;
    
    // Optimistic UI update
    setServices((prev) =>
      prev.map((s) => (s._id === item._id ? { ...s, isPublished: updatedStatus } : s))
    );

    try {
      await fetch(`/api/admin/services/${item._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: updatedStatus }),
      });
      addToast(`Item ${updatedStatus ? 'published' : 'unpublished'}`, 'success');
    } catch {
      addToast('Updated visibility', 'info');
    }
  };

  const handleSaveService = async (data: Omit<Service, '_id' | 'createdAt'>) => {
    try {
      const isEditing = Boolean(selectedService);
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/admin/services/${selectedService?._id}` : '/api/admin/services';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const updatedItem = result.data || result;

      if (isEditing && selectedService) {
        setServices((prev) =>
          prev.map((s) => (s._id === selectedService._id ? { ...s, ...data, ...(updatedItem._id ? updatedItem : {}) } : s))
        );
      } else {
        const newItem: Service = {
          ...data,
          _id: updatedItem._id || Date.now().toString(),
        };
        setServices((prev) => [...prev, newItem]);
      }

      setOpenModal(false);
      setSelectedService(null);
      addToast(isEditing ? 'Updated successfully' : 'Created successfully', 'success');
      
      // Sync fresh state from backend
      fetchServices();
    } catch {
      if (selectedService) {
        setServices((prev) => prev.map((s) => (s._id === selectedService._id ? { ...s, ...data } : s)));
      } else {
        setServices((prev) => [...prev, { ...data, _id: Date.now().toString() } as Service]);
      }
      setOpenModal(false);
      setSelectedService(null);
      addToast('Saved locally', 'info');
    }
  };

  const filteredItems = useMemo(() => {
    return services
      .filter((item) => item.type === activeTab)
      .filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.order - b.order);
  }, [services, activeTab, search]);

  const conditionCount = services.filter((i) => i.type === 'condition').length;
  const serviceCount = services.filter((i) => i.type === 'service').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      <div className="bg-[#0f969c] px-6 sm:px-10 py-10 rounded-b-3xl shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">PhysioCare Management</h1>
            <p className="mt-2 text-[#e6f4f5] font-medium text-sm sm:text-base">
              Separately manage treatments, clinical services, and health conditions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedService(null);
                setModalType('service');
                setOpenModal(true);
              }}
              className="flex items-center gap-2 bg-white text-[#0f969c] hover:bg-slate-50 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>

            <button
              onClick={() => {
                setSelectedService(null);
                setModalType('condition');
                setOpenModal(true);
              }}
              className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Add New Condition
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 -mt-6">
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1.5 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('service')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'service'
                  ? 'bg-white text-[#0f969c] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              Services ({serviceCount})
            </button>

            <button
              onClick={() => setActiveTab('condition')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'condition'
                  ? 'bg-white text-[#0f969c] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers3 className="w-4 h-4" />
              Conditions ({conditionCount})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'service' ? 'services' : 'conditions'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-4 text-xs outline-none focus:border-[#0f969c]"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {loading ? (
            <div className="col-span-full rounded-2xl bg-white p-12 text-center border border-slate-100">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-3 text-[#0f969c]" />
              <p className="text-slate-500 font-medium text-sm">Loading items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full rounded-2xl bg-white p-12 text-center border border-slate-100">
              <p className="text-slate-500 font-medium text-sm">No {activeTab}s found matching your search.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {item.type === 'condition' ? (
                      item.image?.url ? (
                        <Image
                          src={item.image.url}
                          alt={item.title}
                          width={64}
                          height={64}
                          unoptimized
                          className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                          <Layers3 className="w-6 h-6" />
                        </div>
                      )
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0f969c]/10 text-[#0f969c]">
                        {ICON_MAP[item.icon] || <Brain className="w-6 h-6" />}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-slate-800 truncate">{item.title}</h3>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => togglePublish(item)}
                          className={`rounded-lg p-1.5 transition ${
                            item.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.isPublished ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>

                        <button
                          onClick={() => {
                            setSelectedService(item);
                            setModalType(item.type);
                            setOpenModal(true);
                          }}
                          className="rounded-lg bg-slate-100 p-1.5 text-slate-600 hover:bg-slate-200 transition"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              itemId: item._id,
                              title: item.title,
                            })
                          }
                          className="rounded-lg bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100 transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</p>

                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                        Order: {item.order}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          item.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <DedicatedItemModal
          key={selectedService ? selectedService._id : 'new-item-modal'}
          isOpen={openModal}
          type={modalType}
          service={selectedService}
          onClose={() => {
            setOpenModal(false);
            setSelectedService(null);
          }}
          onSave={handleSaveService}
        />

        <DeleteConfirmationModal
          isOpen={deleteConfirm.isOpen}
          title={deleteConfirm.title}
          isLoading={deleteLoading}
          onConfirm={() => deleteItem(deleteConfirm.itemId)}
          onCancel={() => setDeleteConfirm({ isOpen: false, itemId: '', title: '' })}
        />

        <ToastContainer toasts={toasts} onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
      </div>
    </div>
  );
}