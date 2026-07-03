"use client";

import { useState } from "react";
import { ALL_COUNT, formatNumber, QUESTION_COUNTS, TOPICS } from "@/lib/topics";
import { CountTab, PrimaryButton, RoomCodeChip, TopicChip } from "./parts";

/**
 * The interactive Football Quiz setup — the one live component in the gallery.
 * Question count is a segmented control. Topics use an "All" master chip:
 * while "All" is on the individual topics are disabled; unpress it to pick your
 * own, and the "N questions match" line updates live. Clearing every topic
 * snaps back to "All".
 */
export function QuizConfig() {
  const [count, setCount] = useState<number>(10);
  const [all, setAll] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggleAll() {
    if (all) {
      // turning All off → start picking individually
      setAll(false);
      setSelected(new Set());
    } else {
      setAll(true);
      setSelected(new Set());
    }
  }

  function toggleTopic(id: string) {
    if (all) return; // disabled while All is on
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    if (next.size === 0) {
      // cleared everything → back to All
      setAll(true);
      setSelected(new Set());
    } else {
      setSelected(next);
    }
  }

  const matching = all
    ? ALL_COUNT
    : TOPICS.filter((t) => selected.has(t.id)).reduce(
        (sum, t) => sum + t.count,
        0,
      );
  const notEnough = matching < count;

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted">New game</p>
          <p className="text-sm font-medium text-ink">Football Quiz</p>
        </div>
        <RoomCodeChip code="ABCD" size="sm" />
      </div>

      {/* question count */}
      <p className="mt-6 text-[11px] font-medium text-muted">Questions</p>
      <div className="mt-2 flex gap-1.5">
        {QUESTION_COUNTS.map((n) => (
          <CountTab
            key={n}
            label={n}
            selected={count === n}
            onClick={() => setCount(n)}
          />
        ))}
      </div>

      {/* topics */}
      <p className="mt-6 text-[11px] font-medium text-muted">Topics</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <TopicChip label="All" selected={all} onClick={toggleAll} />
        {TOPICS.map((t) => (
          <TopicChip
            key={t.id}
            label={t.label}
            selected={!all && selected.has(t.id)}
            disabled={all}
            onClick={() => toggleTopic(t.id)}
          />
        ))}
      </div>

      {/* live match count + start */}
      <div className="mt-auto pt-6">
        <p className="text-center text-xs text-muted">
          <span
            className="font-mono font-medium"
            style={{ color: notEnough ? "var(--color-error)" : "var(--color-ink)" }}
          >
            {formatNumber(matching)}
          </span>{" "}
          questions match
          {notEnough && (
            <span className="text-error"> · fewer than {count} available</span>
          )}
        </p>
        <div className="mt-3">
          <PrimaryButton>Start {count} questions</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
