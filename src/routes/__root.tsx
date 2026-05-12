import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
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
      { property: "og:title", content: "MindQuest" },
      { property: "og:description", content: "Your daily ritual for a quieter mind." },
      { property: "og:type", content: "website" },
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
  const items: Array<{ to: "/" | "/library" | "/relief"; label: string }> = [
    { to: "/", label: "Home" },
    { to: "/library", label: "Library" },
    { to: "/relief", label: "Relief" },
  ];
  return (
    <div className="fixed bottom-0 z-50 w-full border-t border-sage-900/5 bg-white/90 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-between px-12">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-sand-100 text-sage-900">
        <TopNav />
        <main className="mx-auto max-w-md px-6 pb-32 pt-24">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
