"use client";

import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Loader2,
  Star,
} from "lucide-react";

interface Testimonial {
  _id?: string;
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

interface Props {
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
}: Props) {
  const editing = !!testimonial;

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] =
    useState<Testimonial>({
      name: "",
      condition: "",
      review: "",
      rating: 5,
      image: {
        url: "",
        publicId: "",
      },
      isPublished: true,
    });

  useEffect(() => {
    if (testimonial) {
      setForm(testimonial);
    } else {
      setForm({
        name: "",
        condition: "",
        review: "",
        rating: 5,
        image: {
          url: "",
          publicId: "",
        },
        isPublished: true,
      });
    }
  }, [testimonial]);

  if (!open) return null;

  const uploadImage = async (
    file: File
  ) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setForm((prev) => ({
          ...prev,
          image: data.image,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };
    return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">

     <div
  className="
    bg-white
    rounded-2xl
    w-full
    max-w-3xl
    max-h-[90vh]
    overflow-y-auto
    shadow-xl
  "
>

        <div className="flex justify-between items-center border-b p-5">

          <div>

           <h2 className="text-2xl font-bold text-slate-900">

              {editing
                ? "Edit Testimonial"
                : "Add Testimonial"}

            </h2>

            <p className="text-sm mt-1 text-slate-500">

              Fill patient testimonial details

            </p>

          </div>

          <button
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

           <label className="block mb-2 text-sm font-semibold text-slate-700">
              Patient Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
             className="
w-full
border
border-slate-300
rounded-xl
px-4
py-3
text-slate-900
placeholder:text-slate-400
focus:border-[#0EA5A4]
focus:ring-2
focus:ring-[#0EA5A4]/20
outline-none
"
            />

          </div>

          <div>

            <label className="font-medium">
              Condition
            </label>

            <input
              type="text"
              value={form.condition}
              onChange={(e) =>
                setForm({
                  ...form,
                  condition:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl mt-2 px-4 py-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Review
            </label>

            <textarea
              rows={5}
              value={form.review}
              onChange={(e) =>
                setForm({
                  ...form,
                  review:
                    e.target.value,
                })
              }
              className="
w-full
border
border-slate-300
rounded-xl
px-4
py-3
resize-none
text-slate-900
placeholder:text-slate-400
focus:border-[#0EA5A4]
focus:ring-2
focus:ring-[#0EA5A4]/20
outline-none
"
            />

          </div>

          <div>

            <label className="font-medium">
              Rating
            </label>

            <div className="flex gap-2 mt-3">

              {[1,2,3,4,5].map((star)=>(
                <button
                  key={star}
                  type="button"
                  onClick={()=>
                    setForm({
                      ...form,
                      rating:star,
                    })
                  }
                >
                  <Star
                    size={26}
                    className={
                      star<=form.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                    }
                  />
                </button>
              ))}

            </div>

          </div>

          <div>

            <label className="font-medium">
              Patient Photo
            </label>

            <div className="mt-3">

<input
  type="file"
  accept="image/*"
  className="
  mt-3
  block
  w-full
  text-sm
  text-slate-600
  file:mr-4
  file:rounded-lg
  file:border-0
  file:bg-[#0EA5A4]
  file:px-4
  file:py-2
  file:text-white
  file:cursor-pointer
  hover:file:bg-[#08918f]
  "
/>

            </div>

            {uploading && (

              <div className="flex gap-2 mt-3 items-center text-sm text-slate-500">

                <Loader2
                  className="animate-spin"
                  size={18}
                />

                Uploading...

              </div>

            )}

            {form.image.url && (

              <img
                src={form.image.url}
                className="mt-4 w-24 h-24 rounded-xl object-cover border"
              />

            )}
            

          </div>
                    <div className="flex items-center justify-between border rounded-xl p-4">

            <div>

              <h4 className="font-medium">
                Publish Testimonial
              </h4>

              <p className="text-sm text-slate-500">
                Show this testimonial on the website.
              </p>

            </div>

            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({
                  ...form,
                  isPublished: e.target.checked,
                })
              }
              className="w-5 h-5"
            />

          </div>

        </div>

        <div className="sticky bottom-0 bg-white border-t p-5 flex justify-end gap-3 rounded-b-2xl">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading || uploading}
            onClick={async () => {
              if (
                !form.name ||
                !form.condition ||
                !form.review
              ) {
                alert(
                  "Please fill all required fields."
                );
                return;
              }

              if (!form.image.url) {
                alert(
                  "Please upload an image."
                );
                return;
              }

              try {
                setLoading(true);

                const url = editing
                  ? `/api/admin/testimonial/${testimonial?._id}`
                  : "/api/admin/testimonial";

                const method = editing
                  ? "PATCH"
                  : "POST";

                const response = await fetch(url, {
                  method,
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify(form),
                });

                const data =
                  await response.json();

                if (!data.success) {
                  alert(data.message);
                  return;
                }

                onSuccess();

                onClose();
              } catch (error) {
                console.error(error);
                alert(
                  "Something went wrong."
                );
              } finally {
                setLoading(false);
              }
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </span>
            ) : editing ? (
              "Update Testimonial"
            ) : (
              "Create Testimonial"
            )}
          </button>

        </div>

      </div>

    </div>
  );
}