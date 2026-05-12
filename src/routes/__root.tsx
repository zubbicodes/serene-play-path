import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This path hasn't grown here yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-sage-900 px-6 py-3 text-sm text-primary-foreground transition hover:bg-sage-600"
        >
          Return to garden
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something rustled in the leaves.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-sage-900 px-6 py-3 text-sm text-primary-foreground transition hover:bg-sage-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "MindQuest — A quiet daily practice" },
      {
        name: "description",
        content:
          "A solo, gamified mental health practice. One short ritual a day to grow your inner garden.",
      },
      { name: "theme-color", content: "#f9f8f6" },
      { property: "og:title", content: "MindQuest — A quiet daily practice" },
      { property: "og:description", content: "Daily Bloom is a gamified mobile app for mental wellness, offering daily tasks and mini-games for habit building." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "MindQuest — A quiet daily practice" },
      { name: "description", content: "Daily Bloom is a gamified mobile app for mental wellness, offering daily tasks and mini-games for habit building." },
      { name: "twitter:description", content: "Daily Bloom is a gamified mobile app for mental wellness, offering daily tasks and mini-games for habit building." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80cfd921-02f6-4d5d-8295-a6338bd2ce39/id-preview-35517fac--8b7b6564-4ef0-4ece-b210-90efdd038d8e.lovable.app-1778595282301.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80cfd921-02f6-4d5d-8295-a6338bd2ce39/id-preview-35517fac--8b7b6564-4ef0-4ece-b210-90efdd038d8e.lovable.app-1778595282301.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-512.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function TopNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-sage-900/5 bg-sand-100/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-6">
        <Link to="/" className="font-display text-xl italic tracking-tight">
          MindQuest
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-widest text-sage-600">
              Daily Streak
            </span>
            <span className="text-sm font-semibold">12 Days</span>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full border border-sage-900/5 bg-sage-600/10">
            <div className="size-2 rounded-full bg-ochre" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function BottomNav() {
  const items: Array<{ to: "/" | "/library" | "/relief" | "/reflection"; label: string }> = [
    { to: "/", label: "Home" },
    { to: "/library", label: "Library" },
    { to: "/relief", label: "Relief" },
    { to: "/reflection", label: "Mirror" },
  ];
  return (
    <div className="fixed bottom-0 z-50 w-full border-t border-sage-900/5 bg-white/90 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-between px-10">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: true }}
            className="group flex flex-col items-center gap-1.5"
            activeProps={{ className: "text-sage-900" }}
            inactiveProps={{ className: "text-sage-400" }}
          >
            {({ isActive }) => (
              <>
                <div
                  className={
                    "size-1.5 rounded-full transition-transform " +
                    (isActive ? "scale-125 bg-sage-900" : "bg-sage-400 group-hover:scale-110")
                  }
                />
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SosButton() {
  const location = useLocation();
  if (location.pathname === "/sos") return null;
  return (
    <Link
      to="/sos"
      aria-label="Instant grounding — 60 second breathing exercise"
      className="group fixed bottom-24 right-[max(env(safe-area-inset-right),1.25rem)] z-50 flex items-center gap-2 rounded-full bg-ochre px-5 py-3 text-white shadow-lg shadow-ochre/30 transition hover:scale-105 active:scale-95"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex size-2.5 rounded-full bg-white" />
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">Breathe</span>
    </Link>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-sand-100 text-sage-900">
        <TopNav />
        <main className="mx-auto max-w-md px-6 pb-32 pt-24">
          <Outlet />
        </main>
        <SosButton />
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
