"use client";

import { useState } from "react";
import {
  useLocationClassifications,
  useLocationSubclassifications,
  useTimeClassifications,
  usePersonClassifications,
  useBatchUpdateTransactions,
} from "@/lib/hooks";
import type { TransactionBatchUpdate } from "@/lib/api";

const NO_CHANGE = "__no_change__";
const CLEAR = "__clear__";

interface BatchUpdateBarProps {
  selectedIds: Set<number>;
  onClear: () => void;
}

export default function BatchUpdateBar({ selectedIds, onClear }: BatchUpdateBarProps) {
  const [locationClassification, setLocationClassification] = useState(NO_CHANGE);
  const [locationSubclassification, setLocationSubclassification] = useState(NO_CHANGE);
  const [timeClassification, setTimeClassification] = useState(NO_CHANGE);
  const [personClassification, setPersonClassification] = useState(NO_CHANGE);

  const { data: locationClassificationsData } = useLocationClassifications();
  const { data: locationSubclassificationsData } = useLocationSubclassifications();
  const { data: timeClassificationsData } = useTimeClassifications();
  const { data: personClassificationsData } = usePersonClassifications();

  const locationClassifications = locationClassificationsData ?? [];
  const locationSubclassifications = locationSubclassificationsData ?? [];
  const timeClassifications = timeClassificationsData ?? [];
  const personClassifications = personClassificationsData ?? [];

  const filteredSubclassifications =
    locationClassification !== NO_CHANGE && locationClassification !== CLEAR && locationClassification !== ""
      ? locationSubclassifications.filter(
          (s) => String(s.location_classification.id) === locationClassification
        )
      : locationSubclassifications;

  const batchUpdate = useBatchUpdateTransactions();

  function resolveValue(val: string): number | null | undefined {
    if (val === NO_CHANGE) return undefined;
    if (val === CLEAR) return null;
    return Number(val);
  }

  async function handleApply() {
    const payload: TransactionBatchUpdate = {
      ids: Array.from(selectedIds),
    };

    const loc = resolveValue(locationClassification);
    if (loc !== undefined) payload.location_classification = loc;

    const sub = resolveValue(locationSubclassification);
    if (sub !== undefined) payload.location_subclassification = sub;

    const time = resolveValue(timeClassification);
    if (time !== undefined) payload.time_classification = time;

    const person = resolveValue(personClassification);
    if (person !== undefined) payload.person_classification = person;

    await batchUpdate.mutateAsync(payload);
    onClear();
  }

  const count = selectedIds.size;
  const hasChange =
    locationClassification !== NO_CHANGE ||
    locationSubclassification !== NO_CHANGE ||
    timeClassification !== NO_CHANGE ||
    personClassification !== NO_CHANGE;

  const selectClass =
    "text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 min-w-36";

  return (
    <div className="flex flex-col gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
      {/* Controls row: dropdowns + buttons, all bottom-aligned */}
      <div className="flex flex-wrap gap-3 items-end">
        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Location
          </label>
          <select
            value={locationClassification}
            onChange={(e) => {
              setLocationClassification(e.target.value);
              setLocationSubclassification(NO_CHANGE);
            }}
            className={selectClass}
          >
            <option value={NO_CHANGE}>No change</option>
            <option value={CLEAR}>— Clear —</option>
            {locationClassifications.map((lc) => (
              <option key={lc.id} value={String(lc.id)}>
                {lc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sublocation */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Sublocation
          </label>
          <select
            value={locationSubclassification}
            onChange={(e) => setLocationSubclassification(e.target.value)}
            className={selectClass}
          >
            <option value={NO_CHANGE}>No change</option>
            <option value={CLEAR}>— Clear —</option>
            {filteredSubclassifications.map((s) => (
              <option key={s.id} value={String(s.id)}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Time */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Time
          </label>
          <select
            value={timeClassification}
            onChange={(e) => setTimeClassification(e.target.value)}
            className={selectClass}
          >
            <option value={NO_CHANGE}>No change</option>
            <option value={CLEAR}>— Clear —</option>
            {timeClassifications.map((tc) => (
              <option key={tc.id} value={String(tc.id)}>
                {tc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Person */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Person
          </label>
          <select
            value={personClassification}
            onChange={(e) => setPersonClassification(e.target.value)}
            className={selectClass}
          >
            <option value={NO_CHANGE}>No change</option>
            <option value={CLEAR}>— Clear —</option>
            {personClassifications.map((pc) => (
              <option key={pc.id} value={String(pc.id)}>
                {pc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Apply + Cancel — bottom-aligned, immediately after last dropdown */}
        {batchUpdate.isError && (
          <span className="text-xs text-red-600 dark:text-red-400 self-end pb-1.5">Failed to update.</span>
        )}
        <button
          onClick={handleApply}
          disabled={!hasChange || batchUpdate.isPending}
          className="text-sm px-3 py-1.5 rounded bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-40 self-end"
        >
          {batchUpdate.isPending ? "Applying…" : "Apply"}
        </button>
        <button
          onClick={onClear}
          className="text-sm px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 self-end"
        >
          Cancel
        </button>
      </div>

      {/* Selected count — below controls, like "x results" in the filters bar */}
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {count} transaction{count !== 1 ? "s" : ""} selected
      </p>
    </div>
  );
}
