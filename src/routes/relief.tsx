import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/relief")({
  head: () => ({
    meta: [
      { title: "Relief — MindQuest" },
      {
        name: "description",
        content:
          "On-demand grounding tools for moments of stress, anxiety, or overwhelm.",
      },
    ],
  }),
  component: ReliefPage,
});

const tools = [
  { name: "5-4-3-2-1 Grounding", blurb: "Return to the senses." },
  { name: "Box Breathing", blurb: "A four-second square for a steady pulse." },
  { name: "Body Scan", blurb: "A slow inventory of tension." },
  { name: "Cold Reset", blurb: "A short, intentional shock to the system." },
];

function ReliefPage() {
  return (
    <div className="space-y-10 animate-fade-up">
      <header>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
          On-Demand Toolkit
        </span>
        <h1 className="mt-2 font-display text-3xl">When the moment is loud.</h1>
        <p className="mt-2 max-w-[36ch] text-sm text-sage-600">
          Tap a practice. Stay as long as you need. Leave when you're ready.
        </p>
      </header>

      <BreathingPractice />

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage-400">
          Other practices
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {tools.map((t) => (
            <li
              key={t.name}
              className="rounded-2xl border border-sage-900/5 bg-white p-5 shadow-xs"
            >
              <h3 className="text-sm font-medium">{t.name}</h3>
              <p className="mt-1 text-xs text-sage-600">{t.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

type Phase = { label: string; seconds: number };
const PHASES: Phase[] = [
  { label: "Inhale", seconds: 4 },
  { label: "Hold", seconds: 7 },
  { label: "Exhale", seconds: 8 },
];

function BreathingPractice() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].seconds);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setPhaseIndex((i) => {
          const next = (i + 1) % PHASES.length;
          setSecondsLeft(PHASES[next].seconds);
          return next;
        });
        return PHASES[(phaseIndex + 1) % PHASES.length].seconds;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phaseIndex]);

  const phase = PHASES[phaseIndex];
  const scale =
    phase.label === "Inhale"
      ? 1.15
      : phase.label === "Exhale"
        ? 0.85
        : 1;

  return (
    <section className="rounded-3xl border border-sage-900/5 bg-white p-8 text-center shadow-xs">
      <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
        Featured · 4-7-8 Breath
      </span>
      <div className="my-8 grid place-items-center">
        <div
          className="grid size-48 place-items-center rounded-full bg-sage-100 transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${running ? scale : 1})` }}
        >
          <div className="grid size-32 place-items-center rounded-full bg-sand-100">
            <div className="font-display text-2xl">
              {running ? phase.label : "Ready"}
            </div>
          </div>
        </div>
      </div>
      <p className="mb-6 text-sm text-sage-600">
        {running
          ? `${secondsLeft}s · follow the circle`
          : "Inhale for four, hold for seven, exhale for eight."}
      </p>
      <button
        onClick={() => {
          if (running) {
            setRunning(false);
            setPhaseIndex(0);
            setSecondsLeft(PHASES[0].seconds);
          } else {
            setRunning(true);
          }
        }}
        className="rounded-full bg-sage-900 px-8 py-3 text-sm font-medium text-primary-foreground transition hover:bg-sage-600"
      >
        {running ? "End Practice" : "Begin"}
      </button>
    </section>
  );
}
