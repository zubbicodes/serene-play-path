import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "Breathe — MindQuest" },
      {
        name: "description",
        content:
          "A 60-second 5-4-3-2-1 grounding exercise for moments of overwhelm.",
      },
    ],
  }),
  component: SosPage,
});

const STEPS = [
  { count: 5, sense: "things you can see", hint: "Let your eyes wander. Name them softly." },
  { count: 4, sense: "things you can feel", hint: "Notice texture, temperature, weight." },
  { count: 3, sense: "things you can hear", hint: "Near sounds. Far sounds. Your breath." },
  { count: 2, sense: "things you can smell", hint: "Or two scents you remember well." },
  { count: 1, sense: "thing you can taste", hint: "Or one good thing about right now." },
];

const STEP_SECONDS = 12; // 5 × 12 = 60s

function SosPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(STEP_SECONDS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setStepIdx((i) => {
          if (i >= STEPS.length - 1) {
            setDone(true);
            return i;
          }
          return i + 1;
        });
        return STEP_SECONDS;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [done]);

  const step = STEPS[stepIdx];
  const totalLeft =
    (STEPS.length - stepIdx - 1) * STEP_SECONDS + secondsLeft;

  return (
    <div className="-mx-6 -mt-24 -mb-32 grid min-h-screen place-items-center bg-gradient-to-b from-sage-100 to-sand-100 px-6 py-24 text-center">
      <div className="w-full max-w-sm">
        {!done ? (
          <>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ochre">
              Grounding · {totalLeft}s
            </span>
            <div className="my-10 grid place-items-center">
              <div className="grid size-56 place-items-center rounded-full bg-white shadow-sm animate-breathe">
                <div className="font-display text-6xl text-sage-900">
                  {step.count}
                </div>
              </div>
            </div>
            <h1 className="font-display text-2xl text-balance">
              Name {step.count} {step.sense}.
            </h1>
            <p className="mx-auto mt-3 max-w-[28ch] text-sm text-sage-600">
              {step.hint}
            </p>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-sage-100">
              <div
                className="h-full bg-sage-900 transition-all duration-1000 ease-linear"
                style={{
                  width: `${((STEP_SECONDS - secondsLeft) / STEP_SECONDS) * 100}%`,
                }}
              />
            </div>
            <Link
              to="/"
              className="mt-8 inline-block text-xs uppercase tracking-widest text-sage-400 hover:text-sage-600"
            >
              I'm okay — exit
            </Link>
          </>
        ) : (
          <div className="animate-fade-up">
            <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-ochre/15">
              <div className="size-3 rounded-full bg-ochre" />
            </div>
            <h1 className="font-display text-3xl">You're here.</h1>
            <p className="mx-auto mt-3 max-w-[30ch] text-sm text-sage-600">
              That took 60 seconds. Notice your breath. The moment has already
              softened.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-sage-900 px-8 py-3 text-sm text-primary-foreground transition hover:bg-sage-600"
            >
              Return home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
