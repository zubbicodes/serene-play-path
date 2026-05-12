import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/practice/thought-sorting")({
  head: () => ({
    meta: [
      { title: "Thought Sorting — MindQuest" },
      {
        name: "description",
        content:
          "A short cognitive exercise: gently sort drifting thoughts into helpful and unhelpful.",
      },
    ],
  }),
  component: ThoughtSortingPage,
});

const SEED_THOUGHTS = [
  "I always mess things up.",
  "I can take this one step at a time.",
  "Nobody actually likes me.",
  "It's okay to rest right now.",
  "I'll never get this right.",
  "I have done hard things before.",
  "Everyone is judging me.",
  "I am allowed to be a beginner.",
];

type Bucket = "helpful" | "unhelpful";

function ThoughtSortingPage() {
  const [queue, setQueue] = useState<string[]>(() =>
    [...SEED_THOUGHTS].sort(() => Math.random() - 0.5),
  );
  const [sorted, setSorted] = useState<Record<Bucket, string[]>>({
    helpful: [],
    unhelpful: [],
  });

  const current = queue[0];
  const done = !current;

  const progress = useMemo(
    () => Math.round(((SEED_THOUGHTS.length - queue.length) / SEED_THOUGHTS.length) * 100),
    [queue.length],
  );

  function place(bucket: Bucket) {
    if (!current) return;
    setSorted((s) => ({ ...s, [bucket]: [...s[bucket], current] }));
    setQueue((q) => q.slice(1));
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <Link
          to="/"
          className="text-xs uppercase tracking-widest text-sage-400 hover:text-sage-600"
        >
          ← Today
        </Link>
        <h1 className="mt-3 font-display text-3xl">Sort the clouds.</h1>
        <p className="mt-2 max-w-[34ch] text-sm text-sage-600">
          Read each drifting thought. Place it where it belongs. There is no
          wrong answer — only practice.
        </p>
      </header>

      {/* Progress */}
      <div className="h-1 overflow-hidden rounded-full bg-sage-100">
        <div
          className="h-full rounded-full bg-sage-900 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sky */}
      <div className="relative grid min-h-[260px] place-items-center rounded-3xl bg-gradient-to-b from-sage-50 to-sand-200 p-8">
        {done ? (
          <CompleteState sorted={sorted} />
        ) : (
          <div
            key={current}
            className="animate-drift rounded-3xl border border-sage-900/5 bg-white px-8 py-6 text-center shadow-sm"
          >
            <span className="block text-[10px] uppercase tracking-widest text-sage-400">
              Thought
            </span>
            <p className="mt-2 font-display text-xl text-balance">"{current}"</p>
          </div>
        )}
      </div>

      {!done && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => place("unhelpful")}
            className="rounded-2xl border border-sage-900/5 bg-white py-5 text-sm font-medium text-sage-900 transition hover:bg-sage-50"
          >
            Unhelpful
            <span className="mt-1 block text-[10px] font-normal uppercase tracking-widest text-sage-400">
              Let it pass
            </span>
          </button>
          <button
            onClick={() => place("helpful")}
            className="rounded-2xl bg-sage-900 py-5 text-sm font-medium text-primary-foreground transition hover:bg-sage-600"
          >
            Helpful
            <span className="mt-1 block text-[10px] font-normal uppercase tracking-widest text-sage-200/70">
              Keep close
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function CompleteState({ sorted }: { sorted: Record<Bucket, string[]> }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-ochre/15">
        <div className="size-2 rounded-full bg-ochre" />
      </div>
      <h2 className="font-display text-2xl">The sky is clear.</h2>
      <p className="mx-auto mt-2 max-w-[32ch] text-sm text-sage-600">
        You sorted {sorted.helpful.length + sorted.unhelpful.length} thoughts
        today. Your garden grew a little.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-sage-900 px-6 py-3 text-sm text-primary-foreground transition hover:bg-sage-600"
      >
        Close the practice
      </Link>
    </div>
  );
}
