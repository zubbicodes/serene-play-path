import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/practice/thought-shredder")({
  head: () => ({
    meta: [
      { title: "Thought Shredder — MindQuest" },
      {
        name: "description",
        content:
          "Type a worry, shred it, and rewrite it as something kinder.",
      },
    ],
  }),
  component: ShredderPage,
});

type Phase = "write" | "shredding" | "reframe" | "done";

function ShredderPage() {
  const [phase, setPhase] = useState<Phase>("write");
  const [thought, setThought] = useState("");
  const [reframe, setReframe] = useState("");

  function shred() {
    if (!thought.trim()) return;
    setPhase("shredding");
    setTimeout(() => setPhase("reframe"), 1400);
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
        <h1 className="mt-3 font-display text-3xl">The shredder.</h1>
        <p className="mt-2 max-w-[34ch] text-sm text-sage-600">
          Name the worry. Watch it dissolve. Then write something kinder in
          its place.
        </p>
      </header>

      {phase === "write" && (
        <section className="space-y-4">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-sage-400">
            The thought
          </label>
          <textarea
            autoFocus
            value={thought}
            onChange={(e) => setThought(e.target.value.slice(0, 300))}
            rows={5}
            placeholder="I'm not good enough to…"
            className="w-full resize-none rounded-2xl border border-sage-900/10 bg-white p-5 font-display text-lg leading-relaxed placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />
          <button
            onClick={shred}
            disabled={!thought.trim()}
            className="w-full rounded-xl bg-sage-900 py-4 text-sm font-medium text-primary-foreground transition hover:bg-sage-600 disabled:opacity-40"
          >
            Shred it
          </button>
        </section>
      )}

      {phase === "shredding" && (
        <section className="grid min-h-[280px] place-items-center rounded-3xl bg-gradient-to-b from-sage-50 to-sand-200 p-8">
          <div className="w-full max-w-xs animate-shred overflow-hidden rounded-2xl border border-sage-900/5 bg-white p-6 shadow-sm">
            <p className="font-display text-lg text-balance text-center">
              "{thought}"
            </p>
          </div>
        </section>
      )}

      {phase === "reframe" && (
        <section className="space-y-4 animate-fade-up">
          <div className="rounded-2xl bg-sage-50 p-4 text-center text-xs text-sage-600">
            Gone. Now write something kinder, even if you don't fully believe
            it yet.
          </div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-sage-400">
            A kinder reframe
          </label>
          <textarea
            autoFocus
            value={reframe}
            onChange={(e) => setReframe(e.target.value.slice(0, 300))}
            rows={5}
            placeholder="I am learning. I am allowed to begin again."
            className="w-full resize-none rounded-2xl border border-sage-900/10 bg-white p-5 font-display text-lg leading-relaxed placeholder:text-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-600/30"
          />
          <button
            onClick={() => setPhase("done")}
            disabled={!reframe.trim()}
            className="w-full rounded-xl bg-sage-900 py-4 text-sm font-medium text-primary-foreground transition hover:bg-sage-600 disabled:opacity-40"
          >
            Keep it
          </button>
        </section>
      )}

      {phase === "done" && (
        <section className="space-y-6 text-center animate-fade-up">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-ochre/15">
            <div className="size-2 rounded-full bg-ochre" />
          </div>
          <blockquote className="rounded-3xl border border-sage-900/5 bg-white p-8 font-display text-xl text-balance shadow-xs">
            "{reframe}"
          </blockquote>
          <p className="text-sm text-sage-600">
            Take this with you for the rest of the day.
          </p>
          <Link
            to="/"
            className="inline-flex rounded-full bg-sage-900 px-6 py-3 text-sm text-primary-foreground transition hover:bg-sage-600"
          >
            Close the practice
          </Link>
        </section>
      )}
    </div>
  );
}
