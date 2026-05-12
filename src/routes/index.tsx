import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import gardenImg from "@/assets/garden.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — MindQuest" },
      {
        name: "description",
        content:
          "Your daily ritual: one short, calming practice to tend your inner garden.",
      },
    ],
  }),
  component: HomePage,
});

type Energy = "low" | "even" | "high" | null;

const RITUAL_BY_ENERGY: Record<
  Exclude<Energy, null>,
  { kind: string; minutes: string; title: string; blurb: string; to: "/practice/thought-sorting" | "/practice/thought-shredder" | "/relief" }
> = {
  low: {
    kind: "Gentle audio",
    minutes: "2 min",
    title: "A small kindness",
    blurb:
      "A two-minute audio story. Lie down. You don't have to do anything else today.",
    to: "/relief",
  },
  even: {
    kind: "Mini-game",
    minutes: "4 min",
    title: "Thought Sorting",
    blurb:
      "Move drifting clouds into helpful or unhelpful and clear your sky.",
    to: "/practice/thought-sorting",
  },
  high: {
    kind: "Release",
    minutes: "5 min",
    title: "Thought Shredder",
    blurb:
      "Name the worry. Watch it dissolve. Replace it with something kinder.",
    to: "/practice/thought-shredder",
  },
};

const SMALL_WINS_SEED = [
  "Drink a glass of water",
  "Step outside for one minute",
  "Stretch your arms overhead",
];

function HomePage() {
  const [energy, setEnergy] = useState<Energy>(null);
  const [wins, setWins] = useState<boolean[]>([false, false, false]);

  const completedWins = wins.filter(Boolean).length;
  const totemStage = useMemo(() => {
    if (completedWins === 0) return { label: "Seedling", glyph: "·" };
    if (completedWins === 1) return { label: "Sprout", glyph: "✿" };
    if (completedWins === 2) return { label: "Sapling", glyph: "❀" };
    return { label: "In bloom", glyph: "❋" };
  }, [completedWins]);

  return (
    <div className="space-y-12">
      {/* Garden / Dashboard */}
      <section className="animate-fade-up text-center">
        <h1 className="mb-2 font-display text-3xl">Welcome back, friend.</h1>
        <p className="mb-8 text-sm text-sage-600">
          Your inner garden is thriving today.
        </p>

        <div className="group relative">
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-sage-100 outline outline-1 -outline-offset-1 outline-sage-900/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img
              src={gardenImg}
              alt="A small green sprout in a soft ceramic pot"
              width={1024}
              height={1024}
              className="h-full w-full object-cover animate-breathe"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-6 rounded-full border border-sage-900/5 bg-white px-6 py-3 shadow-sm">
            <div className="text-center">
              <div className="text-[10px] uppercase text-sage-400">Totem</div>
              <div className="text-sm font-semibold">{totemStage.label}</div>
            </div>
            <div className="h-8 w-px bg-sage-900/10" />
            <div className="text-center">
              <div className="text-[10px] uppercase text-sage-400">Spirit</div>
              <div className="text-sm font-semibold">Stable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Sync */}
      <section className="animate-fade-up [animation-delay:60ms]">
        <h2 className="mb-1 font-display text-xl">How is your energy?</h2>
        <p className="mb-4 text-xs text-sage-600">
          We'll meet you where you are. No guilt, no pressure.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "low", label: "Low", sub: "Heavy" },
              { id: "even", label: "Even", sub: "Neutral" },
              { id: "high", label: "High", sub: "Wired" },
            ] as const
          ).map((opt) => {
            const active = energy === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setEnergy(opt.id)}
                className={
                  "rounded-2xl border px-3 py-4 text-center transition " +
                  (active
                    ? "border-sage-900 bg-sage-900 text-primary-foreground"
                    : "border-sage-900/10 bg-white text-sage-900 hover:border-sage-900/30")
                }
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div
                  className={
                    "mt-0.5 text-[10px] uppercase tracking-widest " +
                    (active ? "text-sand-200/80" : "text-sage-400")
                  }
                >
                  {opt.sub}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Daily Ritual */}
      <section className="animate-fade-up [animation-delay:120ms]">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl">Today's Ritual</h2>
          <span className="text-xs text-sage-600">
            {energy ? "tuned to you" : "select your energy"}
          </span>
        </div>

        {energy ? (
          <article className="rounded-2xl border border-sage-900/5 bg-white p-6 shadow-xs">
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded bg-ochre/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ochre">
                {RITUAL_BY_ENERGY[energy].kind}
              </span>
              <span className="text-xs italic text-sage-400">
                {RITUAL_BY_ENERGY[energy].minutes}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-medium">
              {RITUAL_BY_ENERGY[energy].title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-sage-600">
              {RITUAL_BY_ENERGY[energy].blurb}
            </p>
            <Link
              to={RITUAL_BY_ENERGY[energy].to}
              className="block w-full rounded-xl bg-sage-900 py-4 text-center text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-sage-600"
            >
              Begin
            </Link>
          </article>
        ) : (
          <div className="rounded-2xl border border-dashed border-sage-900/10 bg-sage-50 p-6 text-center text-sm text-sage-600">
            Pick an energy above and we'll choose a ritual that fits.
          </div>
        )}
      </section>

      {/* Small Wins quest log */}
      <section className="animate-fade-up [animation-delay:180ms]">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl">Small wins</h2>
          <span className="text-xs text-sage-600">
            {completedWins} / {wins.length} · {totemStage.glyph}
          </span>
        </div>
        <ul className="space-y-2">
          {SMALL_WINS_SEED.map((task, i) => {
            const done = wins[i];
            return (
              <li key={task}>
                <button
                  onClick={() =>
                    setWins((w) => w.map((v, j) => (j === i ? !v : v)))
                  }
                  className={
                    "flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition " +
                    (done
                      ? "border-sage-900/5 opacity-60"
                      : "border-sage-900/10 hover:border-sage-900/30")
                  }
                >
                  <span
                    className={
                      "grid size-6 shrink-0 place-items-center rounded-full border transition " +
                      (done
                        ? "border-sage-900 bg-sage-900 text-primary-foreground"
                        : "border-sage-900/30")
                    }
                  >
                    {done && (
                      <svg viewBox="0 0 12 12" className="size-3" fill="none">
                        <path
                          d="M2 6.5l2.5 2.5L10 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={
                      "text-sm " + (done ? "line-through text-sage-400" : "")
                    }
                  >
                    {task}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {completedWins === wins.length && (
          <p className="mt-4 rounded-2xl bg-ochre/10 p-4 text-center text-sm text-sage-900 animate-fade-up">
            Three small wins. Your totem is <strong>in bloom</strong>. That's
            enough for today.
          </p>
        )}
      </section>

      {/* Boundary footer */}
      <footer className="animate-fade-up border-t border-sage-900/5 py-8 text-center [animation-delay:240ms]">
        <p className="text-xs leading-relaxed text-sage-400">
          Once your ritual is complete, we encourage you to
          <br />
          <span className="font-medium text-sage-600">
            put down your device and breathe.
          </span>
        </p>
      </footer>
    </div>
  );
}
