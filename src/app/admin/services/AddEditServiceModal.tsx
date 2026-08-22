"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import IconPicker from "@/components/IconPicker";

interface Service {
  _id?: string;
  title: string;
  description: string;
  type: "condition" | "service";
  icon: string;
  image: {
    url: string;
    publicId: string;
  };
  order: number;
  isPublished: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service: Service | null;
}

const initialForm: Service = {
  title: "",
  description: "",
  type: "condition",
  icon: "",
  image: {
    url: "",
    publicId: "",
  },
  order: 0,
  isPublished: true,
};

export default function AddEditServiceModal({
  open,
  onClose,
  onSuccess,
  service,
}: Props) {
  const [form, setForm] =
    useState<Service>(initialForm);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    if (!open) return;

    if (service) {
      setForm(service);
    } else {
      setForm(initialForm);
    }
  }, [service, open]);

  if (!open) return null;

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  const uploadImage = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const body = new FormData();

      body.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const result = await res.json();

      if (!result.success) {
        alert("Image upload failed.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        image: result.image,
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (
      form.type === "condition" &&
      !form.image.url
    ) {
      alert("Please upload a condition image.");
      return;
    }

    if (
      form.type === "service" &&
      !form.icon
    ) {
      alert("Please select an icon.");
      return;
    }

    try {
      setSaving(true);

      const endpoint = service
        ? `/api/admin/services/${service._id}`
        : "/api/admin/services";

      const method = service
        ? "PATCH"
        : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!result.success) {
        alert(result.message || "Failed to save.");
        return;
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {service
                ? "Edit Service"
                : "Add New Service"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {service
                ? "Update service information."
                : "Create a new condition or service."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl leading-none text-slate-400 hover:text-red-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
                        {/* Type */}
            <div>
              <label className="mb-2 block font-semibold">
                Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="condition">
                  Condition
                </option>

                <option value="service">
                  Service
                </option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block font-semibold">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write description..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="mb-2 block font-semibold">
                Display Order
              </label>

              <input
                type="number"
                min={0}
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-40 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Condition Image */}
            {form.type === "condition" && (
              <div>
                <label className="mb-2 block font-semibold">
                  Condition Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  className="w-full rounded-xl border border-slate-300 p-3"
                />

                {uploading && (
                  <p className="mt-3 text-sm text-cyan-600">
                    Uploading image...
                  </p>
                )}

                {form.image.url && (
                  <div className="mt-4">
                    <Image
                      src={form.image.url}
                      alt="Preview"
                      width={280}
                      height={180}
                      className="rounded-xl border object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Service Icon */}
            {form.type === "service" && (
              <div>
                <label className="mb-2 block font-semibold">
                  Service Icon
                </label>

                <IconPicker
                  value={form.icon}
                  onChange={(icon) =>
                    setForm((prev) => ({
                      ...prev,
                      icon,
                    }))
                  }
                />
              </div>
            )}

            {/* Publish */}
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <h3 className="font-semibold">
                  Publish Item
                </h3>

                <p className="text-sm text-slate-500">
                  Show this item on the website.
                </p>
              </div>

              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isPublished: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
            </div>
          </div>
                    {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? service
                  ? "Updating..."
                  : "Creating..."
                : service
                ? "Update Service"
                : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}