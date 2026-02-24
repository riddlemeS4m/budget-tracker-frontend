"use client";

import { useState, useRef, useEffect } from "react";

interface ClassificationSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: number; name: string }[];
  loading?: boolean;
  placeholder?: string;
  addLabel?: string;
  onSaveNew: (name: string) => Promise<{ id: number }>;
  renderExtraFields?: () => React.ReactNode;
  onStartAdding?: () => void;
}

export default function ClassificationSelect({
  value,
  onChange,
  options,
  loading = false,
  placeholder = "None",
  addLabel = "Add category",
  onSaveNew,
  renderExtraFields,
  onStartAdding,
}: ClassificationSelectProps) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingOption, setPendingOption] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) nameInputRef.current?.focus();
  }, [adding]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeAll();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function closeAll() {
    setOpen(false);
    setAdding(false);
    setNewName("");
    setError(null);
  }

  function selectOption(val: string) {
    onChange(val);
    closeAll();
  }

  async function handleSave() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setSaving(true);
    setError(null);
    try {
      const result = await onSaveNew(trimmed);
      setPendingOption({ id: result.id, name: trimmed });
      onChange(String(result.id));
      closeAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancelAdd() {
    setAdding(false);
    setNewName("");
    setError(null);
  }

  function startAdding() {
    setAdding(true);
    onStartAdding?.();
  }

  const selectedOption =
    options.find((o) => String(o.id) === value) ??
    (pendingOption && String(pendingOption.id) === value
      ? pendingOption
      : null);

  const miniInputClass =
    "border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          if (!loading) {
            open ? closeAll() : setOpen(true);
          }
        }}
        disabled={loading}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-left flex items-center justify-between disabled:opacity-50"
      >
        <span
          className={
            selectedOption ? "" : "text-gray-500 dark:text-gray-400"
          }
        >
          {loading ? "Loading…" : (selectedOption?.name ?? placeholder)}
        </span>
        <svg
          className="w-4 h-4 shrink-0 ml-2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg overflow-hidden">
          <div className="max-h-52 overflow-auto">
            <button
              type="button"
              onClick={() => selectOption("")}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                value === ""
                  ? "bg-gray-50 dark:bg-gray-700/50 font-medium"
                  : ""
              }`}
            >
              {placeholder}
            </button>
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => selectOption(String(opt.id))}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  String(opt.id) === value
                    ? "bg-gray-50 dark:bg-gray-700/50 font-medium"
                    : ""
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600" />

          {!adding ? (
            <button
              type="button"
              onClick={startAdding}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
            >
              {addLabel}
            </button>
          ) : (
            <div className="p-3 space-y-2">
              <input
                ref={nameInputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className={miniInputClass}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSave();
                  }
                  if (e.key === "Escape") handleCancelAdd();
                }}
              />
              {renderExtraFields?.()}
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !newName.trim()}
                  className="px-3 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-600 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-500 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
