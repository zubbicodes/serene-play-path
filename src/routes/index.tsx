import { createFileRoute, Link } from "@tanstack/react-router";
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

function HomePage() {
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
              <div className="text-[10px] uppercase text-sage-400">Growth</div>
              <div className="text-sm font-semibold">84%</div>
            </div>
            <div className="h-8 w-px bg-sage-900/10" />
            <div className="text-center">
              <div className="text-[10px] uppercase text-sage-400">Spirit</div>
              <div className="text-sm font-semibold">Stable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Ritual */}
      <section className="animate-fade-up [animation-delay:120ms]">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl">Today's Ritual</h2>
          <span className="text-xs text-sage-600">1 of 3 complete</span>
        </div>

        <div className="space-y-4">
          <article className="rounded-2xl border border-sage-900/5 bg-white p-6 shadow-xs">
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded bg-ochre/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ochre">
                Mini-Game
              </span>
              <span className="text-xs italic text-sage-400">4 mins</span>
            </div>
            <h3 className="mb-1 text-lg font-medium">Thought Sorting</h3>
            <p className="mb-6 text-sm leading-relaxed text-sage-600">
              Gently move drifting clouds into <em>helpful</em> or{" "}
              <em>unhelpful</em> to clear your sky.
            </p>
            <Link
              to="/practice/thought-sorting"
              className="block w-full rounded-xl bg-sage-900 py-4 text-center text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-sage-600"
            >
              Begin Exercise
            </Link>
          </article>

          <article className="rounded-2xl border border-dashed border-sage-900/10 bg-sage-50 p-6 opacity-70">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Gratitude Reflection</h3>
                <p className="text-xs text-sage-400">
                  Unlocks after Thought Sorting
                </p>
              </div>
              <div className="grid size-8 place-items-center rounded-full border border-sage-900/10">
                <div className="size-1.5 rounded-full bg-sage-400" />
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-dashed border-sage-900/10 bg-sage-50 p-6 opacity-70">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Evening Breath</h3>
                <p className="text-xs text-sage-400">Available after sundown</p>
              </div>
              <div className="grid size-8 place-items-center rounded-full border border-sage-900/10">
                <div className="size-1.5 rounded-full bg-sage-400" />
              </div>
            </div>
          </article>
        </div>
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
