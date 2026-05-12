import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reflection")({
  head: () => ({
    meta: [
      { title: "Mirror — MindQuest" },
      {
        name: "description",
        content:
          "A weekly mood landscape — visual proof of your quiet progress.",
      },
    ],
  }),
  component: ReflectionPage,
});

// Mock weekly data: 0 (rough) → 4 (bright). One value per day.
const WEEK = [
  { day: "Mon", mood: 1, note: "Heavy morning." },
  { day: "Tue", mood: 2, note: "Walked. Steady." },
  { day: "Wed", mood: 3, note: "Stable. Slept well." },
  { day: "Thu", mood: 2, note: "Mixed." },
  { day: "Fri", mood: 3, note: "Stable." },
  { day: "Sat", mood: 4, note: "Bright. Saw a friend." },
  { day: "Sun", mood: 3, note: "Soft and quiet." },
];

const MOOD_LABEL = ["Storm", "Rough", "Steady", "Stable", "Bright"];
const HILL_COLORS = [
  "oklch(0.55 0.02 150)",
  "oklch(0.65 0.03 150)",
  "oklch(0.75 0.04 150)",
  "oklch(0.85 0.05 80)",
  "oklch(0.92 0.07 80)",
];

function ReflectionPage() {
  const stable = WEEK.filter((d) => d.mood >= 2).length;
  const bright = WEEK.filter((d) => d.mood >= 3).length;
  const avg = WEEK.reduce((s, d) => s + d.mood, 0) / WEEK.length;

  return (
    <div className="space-y-10 animate-fade-up">
      <header>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
          Reflection · This Week
        </span>
        <h1 className="mt-2 font-display text-3xl">Your landscape.</h1>
        <p className="mt-2 max-w-[36ch] text-sm text-sage-600">
          Each hill is a day. The land is brighter where you tended it.
        </p>
      </header>

      {/* Mood Landscape */}
      <section className="overflow-hidden rounded-3xl border border-sage-900/5 bg-gradient-to-b from-sand-100 to-sage-50 p-6">
        <svg
          viewBox="0 0 280 140"
          className="h-44 w-full"
          aria-label="Weekly mood landscape"
        >
          {WEEK.map((d, i) => {
            const x = (i / WEEK.length) * 280;
            const w = 280 / WEEK.length;
            const h = 30 + d.mood * 22;
            return (
              <path
                key={d.day}
                d={`M ${x} 140 Q ${x + w / 2} ${140 - h * 1.4} ${x + w} 140 Z`}
                fill={HILL_COLORS[d.mood]}
                opacity={0.85}
              />
            );
          })}
          {/* sun */}
          <circle
            cx={230}
            cy={28}
            r={10 + bright}
            fill="oklch(0.85 0.1 70)"
            opacity={0.6}
          />
        </svg>
        <ol className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEK.map((d) => (
            <li key={d.day} className="text-[10px] uppercase tracking-wider text-sage-400">
              {d.day}
            </li>
          ))}
        </ol>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { label: "Stable days", value: stable },
          { label: "Bright days", value: bright },
          { label: "Avg.", value: MOOD_LABEL[Math.round(avg)] },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-sage-900/5 bg-white p-4 text-center shadow-xs"
          >
            <div className="font-display text-2xl">{s.value}</div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-sage-400">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Notes */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage-400">
          Quiet notes
        </h2>
        <ul className="space-y-2">
          {WEEK.map((d) => (
            <li
              key={d.day}
              className="flex items-center gap-4 rounded-2xl border border-sage-900/5 bg-white p-4"
            >
              <div
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: HILL_COLORS[d.mood] }}
              />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-sage-400">
                  {d.day} · {MOOD_LABEL[d.mood]}
                </div>
                <div className="text-sm text-sage-900">{d.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="rounded-3xl bg-sage-50 p-6 text-center text-sm leading-relaxed text-sage-600">
        You showed up <strong className="font-semibold text-sage-900">{stable}</strong>{" "}
        days this week. That is not nothing. That is the work.
      </p>
    </div>
  );
}
