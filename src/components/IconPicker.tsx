"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { Search, Circle } from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const AVAILABLE_ICONS = [
  "HeartPulse",
  "Activity",
  "Zap",
  "Hand",
  "Bone",
  "Brain",
  "ShieldPlus",
  "Stethoscope",
  "Dumbbell",
  "Footprints",
  "Move",
  "Accessibility",
  "Cross",
  "Target",
  "StretchHorizontal",
  "Syringe",
  "Pill",
  "Scan",
  "Waveform",
  "Flame",
  "Snowflake",
  "Timer",
  "CircleDot",
  "Sparkles",
  "Droplets",
];

export default function IconPicker({
  value,
  onChange,
}: IconPickerProps) {
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return AVAILABLE_ICONS.filter((icon) =>
      icon.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const SelectedIcon =
    (Icons[value as keyof typeof Icons] as React.ComponentType<any>) ||
    Circle;

  return (
    <div className="space-y-5">
      {/* Selected Icon */}
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-100">
          <SelectedIcon
            size={32}
            className="text-cyan-600"
          />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Selected Icon
          </p>

          <h3 className="text-lg font-semibold text-slate-800">
            {value || "Circle"}
          </h3>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search icon..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </div>

      {/* Icons */}
      <div className="grid max-h-96 grid-cols-3 gap-3 overflow-y-auto rounded-xl border border-slate-200 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {filteredIcons.length > 0 ? (
          filteredIcons.map((iconName) => {
            const Icon =
              (Icons[
                iconName as keyof typeof Icons
              ] as React.ComponentType<any>) ||
              Circle;

            const selected =
              value === iconName;

            return (
              <button
                key={iconName}
                type="button"
                onClick={() =>
                  onChange(iconName)
                }
                className={`flex flex-col items-center justify-center rounded-xl border p-3 transition ${
                  selected
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300 hover:bg-cyan-50"
                }`}
              >
                <Icon
                  size={26}
                  className={
                    selected
                      ? "text-cyan-600"
                      : "text-slate-700"
                  }
                />

                <span className="mt-2 text-center text-[11px] font-medium leading-tight">
                  {iconName}
                </span>
              </button>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-slate-500">
            No icons found.
          </div>
        )}
      </div>
    </div>
  );
}