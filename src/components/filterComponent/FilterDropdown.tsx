
"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Option {
  uuid: string;
  name: string;
  logo?: string;
}

interface FilterDropdownProps {
  label: string;
  options: Option[];
  selectedUuid?: string;
  onSelect: (uuid: string | undefined) => void;
}

export default function FilterDropdown({
  label,
  options,
  selectedUuid,
  onSelect,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.uuid === selectedUuid)?.name;

  // close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-48">
      {/* Trigger Box */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-xl bg-white shadow-sm hover:border-blue-500 transition"
      >
        <span className="text-sm text-gray-700 truncate">
          {selectedLabel ?? label}
        </span>
        <span className="text-xs text-gray-400 ml-2">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {/* Clear option */}
          <li
            onClick={() => { onSelect(undefined); setOpen(false); }}
            className="px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer border-b"
          >
            All {label}
          </li>

          {options.map((opt) => (
            <li
              key={opt.uuid}
              onClick={() => { onSelect(opt.uuid); setOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition
                ${selectedUuid === opt.uuid ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"}`}
            >
              {opt.logo && (
                <Image
                  src={opt.logo}
                  alt={opt.name}
                  height={100}
                  width={100}
                  className="w-6 h-6 object-contain rounded"
                />
              )}
              <span>{opt.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}