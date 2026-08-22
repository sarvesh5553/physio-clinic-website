"use client";

import { useEffect, useState, useRef } from "react";
import { X, Upload, Star, Loader2, Image as ImageIcon, Check } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  condition: string;
  review: string;
  rating: number;
  image: {
    url: string;
    publicId: string;
  };
  isPublished: boolean;
}

interface AddEditModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  testimonial?: Testimonial | null;
}

export default function AddEditTestimonialModal({
  open,
  onClose,
  onSuccess,
  testimonial,
}: AddEditModalProps) {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name || "");
      setCondition(testimonial.condition || "");
      setReview(testimonial.review || "");
      setRating(testimonial.rating || 5);
      setIsPublished(testimonial.isPublished ?? true);
      setImagePreview(testimonial.image?.url || "");
      setImageFile(null);
    } else {
      resetForm();
    }
  }, [testimonial, open]);

  const resetForm = () => {
    setName("");
    setCondition("");
    setReview("");
    setRating(5);
    setIsPublished(true);
    setImageFile(null);
    setImagePreview("");
  };

  if (!open) return null;

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !condition.trim() || !review.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("condition", condition);
      formData.append("review", review);
      formData.append("rating", rating.toString());
      formData.append("isPublished", isPublished.toString());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = testimonial
        ? `/api/admin/testimonial/${testimonial._id}`
        : "/api/admin/testimonial";

      const method = testimonial ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
        onClose();
        resetForm();
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              {testimonial ? "Update patient feedback details" : "Fill in patient feedback and photo"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Patient Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Patient Photo <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? "border-teal-500 bg-teal-50/50"
                  : imagePreview
                  ? "border-teal-200 bg-slate-50"
                  : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageChange(e.target.files[0]);
                  }
                }}
              />

              {imagePreview ? (
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-sm"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">
                      {imageFile ? imageFile.name : "Current Photo"}
                    </p>
                    <p className="text-[11px] text-teal-600 font-semibold mt-0.5">
                      Click or drag to replace
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-teal-50 rounded-full text-teal-600">
                    <Upload size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      SVG, PNG, JPG or WEBP (Max 5MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Patient Name & Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Condition Treated <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ACL Rehab"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
              />
            </div>
          </div>

          {/* Interactive Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-2.5 w-max">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={22}
                    className={`transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Patient Feedback <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {review.length} / 500 chars
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={500}
              placeholder="Write the patient's full testimonial here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition leading-relaxed resize-none"
            />
          </div>

          {/* Publishing Status Toggle */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div>
              <p className="text-xs font-bold text-slate-800">Publish Immediately</p>
              <p className="text-[11px] text-slate-500">
                Visible on public website right after saving
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                isPublished ? "bg-teal-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isPublished ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check size={16} />
                  {testimonial ? "Update Testimonial" : "Create Testimonial"}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}