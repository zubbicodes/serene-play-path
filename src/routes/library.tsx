import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — MindQuest" },
      {
        name: "description",
        content:
          "Bite-sized lessons on the science of a calmer, more resilient mind.",
      },
    ],
  }),
  component: LibraryPage,
});

const lessons = [
  {
    chapter: "Chapter 01",
    title: "Neuroplasticity",
    blurb: "How the brain quietly reshapes itself.",
    duration: "5 min",
  },
  {
    chapter: "Chapter 02",
    title: "The Vagus Nerve",
    blurb: "Tapping into your body's calm circuit.",
    duration: "6 min",
  },
  {
    chapter: "Chapter 03",
    title: "Cognitive Distortions",
    blurb: "Spotting the small lies the mind tells.",
    duration: "7 min",
  },
  {
    chapter: "Chapter 04",
    title: "The Window of Tolerance",
    blurb: "Knowing when to push and when to rest.",
    duration: "5 min",
  },
];

function LibraryPage() {
  return (
    <div className="space-y-10 animate-fade-up">
      <header>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
          The Learning Hub
        </span>
        <h1 className="mt-2 font-display text-3xl">A quiet curriculum.</h1>
        <p className="mt-2 max-w-[36ch] text-sm text-sage-600">
          Short readings, written by clinicians. Take one when you have a
          moment.
        </p>
      </header>

      <ol className="space-y-3">
        {lessons.map((l, i) => (
          <li
            key={l.title}
            className="group rounded-2xl border border-sage-900/5 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-50 font-display text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-sage-400">
                    {l.chapter}
                  </span>
                  <span className="text-[10px] text-sage-400">{l.duration}</span>
                </div>
                <h3 className="mt-1 text-base font-medium">{l.title}</h3>
                <p className="mt-1 text-sm text-sage-600">{l.blurb}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
