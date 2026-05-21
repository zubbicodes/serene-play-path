import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Check,
  ChevronRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account - MindQuest" },
      {
        name: "description",
        content: "Login, signup, and profile UI for the MindQuest mobile app.",
      },
    ],
  }),
  component: AccountPage,
});

type AuthMode = "login" | "signup";

const profileStats = [
  { label: "Streak", value: "12 days" },
  { label: "Rituals", value: "34" },
  { label: "Mood", value: "Stable" },
];

const preferences = [
  "Daily ritual reminder",
  "Gentle check-in notifications",
  "Private progress journal",
];

const AUTH_STORAGE_KEY = "mindquest-demo-auth";

function AccountPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
  }, []);

  function completeAuth() {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setSignedIn(true);
  }

  function signOut() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSignedIn(false);
  }

  if (signedIn) {
    return <ProfileView onSignOut={signOut} />;
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
          Account
        </span>
        <h1 className="mt-2 font-display text-3xl">
          {mode === "login" ? "Welcome back." : "Create your garden."}
        </h1>
        <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-sage-600">
          {mode === "login"
            ? "Sign in to keep your rituals, reflections, and progress close."
            : "Start a private wellness profile for daily rituals and calm progress tracking."}
        </p>
      </header>

      <div className="grid grid-cols-2 rounded-2xl bg-sage-50 p-1">
        {(["login", "signup"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={
              "rounded-xl px-4 py-3 text-sm font-semibold capitalize transition " +
              (mode === item
                ? "bg-white text-sage-900 shadow-xs"
                : "text-sage-500 hover:text-sage-900")
            }
          >
            {item === "login" ? "Log in" : "Sign up"}
          </button>
        ))}
      </div>

      <form
        className="space-y-4 rounded-3xl border border-sage-900/5 bg-white p-5 shadow-xs"
        onSubmit={(event) => {
          event.preventDefault();
          completeAuth();
        }}
      >
        {mode === "signup" ? (
          <Field
            id="name"
            label="Name"
            icon={UserRound}
            placeholder="Your name"
            autoComplete="name"
          />
        ) : null}
        <Field
          id="email"
          label="Email"
          icon={Mail}
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
        />
        <Field
          id="password"
          label="Password"
          icon={LockKeyhole}
          placeholder={mode === "login" ? "Enter password" : "Create password"}
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {mode === "signup" ? (
          <label className="flex items-start gap-3 rounded-2xl bg-sage-50 p-4 text-sm text-sage-700">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-sage-900/20 accent-sage-900"
              defaultChecked
            />
            <span>
              Send gentle reminders for daily rituals and reflection prompts.
            </span>
          </label>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-sage-600">
              <input
                type="checkbox"
                className="size-4 rounded border-sage-900/20 accent-sage-900"
                defaultChecked
              />
              Remember me
            </label>
            <button type="button" className="font-medium text-sage-900">
              Forgot?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sage-900 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-sage-600 active:scale-[0.99]"
        >
          {mode === "login" ? "Log in" : "Create account"}
          <ChevronRight className="size-4" />
        </button>
      </form>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-2xl border border-sage-900/10 bg-white py-3 text-sm font-semibold text-sage-700 shadow-xs">
          Google
        </button>
        <button className="rounded-2xl border border-sage-900/10 bg-white py-3 text-sm font-semibold text-sage-700 shadow-xs">
          Apple
        </button>
      </div>

      <section className="rounded-3xl bg-sage-50 p-5">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-sage-700">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Private by design</h2>
            <p className="mt-1 text-sm leading-relaxed text-sage-600">
              This is a demo UI. No account data is sent or saved from this screen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  icon: typeof UserRound;
  type?: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-sage-400">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-2xl border border-sage-900/10 bg-sand-100 px-4 py-3 transition focus-within:ring-2 focus-within:ring-sage-600/20">
        <Icon className="size-4 shrink-0 text-sage-500" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-sage-900 outline-none placeholder:text-sage-400"
        />
      </span>
    </label>
  );
}

function ProfileView({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="space-y-8 animate-fade-up">
      <section className="rounded-3xl border border-sage-900/5 bg-white p-6 text-center shadow-xs">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-sage-100 text-sage-800">
          <UserRound className="size-9" />
        </div>
        <h1 className="mt-4 font-display text-3xl">Maya Reed</h1>
        <p className="mt-1 text-sm text-sage-600">maya@example.com</p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {profileStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-sage-50 p-3">
              <div className="text-[10px] uppercase tracking-widest text-sage-400">
                {stat.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage-400">
          Account settings
        </h2>
        <div className="overflow-hidden rounded-3xl border border-sage-900/5 bg-white shadow-xs">
          {preferences.map((item) => (
            <button
              key={item}
              type="button"
              className="flex w-full items-center justify-between border-b border-sage-900/5 px-5 py-4 text-left last:border-b-0"
            >
              <span className="flex items-center gap-3 text-sm font-medium text-sage-800">
                <span className="grid size-7 place-items-center rounded-full bg-sage-50 text-sage-700">
                  {item.includes("notification") || item.includes("reminder") ? (
                    <Bell className="size-3.5" />
                  ) : (
                    <Check className="size-3.5" />
                  )}
                </span>
                {item}
              </span>
              <ChevronRight className="size-4 text-sage-400" />
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/"
          className="rounded-2xl bg-sage-900 py-4 text-center text-sm font-semibold text-primary-foreground transition hover:bg-sage-600"
        >
          Home
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-2xl border border-sage-900/10 bg-white py-4 text-sm font-semibold text-sage-700 shadow-xs"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
