import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { sonner } from "sonner";

export const Route = createFileRoute("/panic")({
  head: () => ({
    meta: [
      { title: "Emergency SOS — MindQuest" },
      {
        name: "description",
        content: "Send an immediate distress signal to your emergency contacts.",
      },
    ],
  }),
  component: PanicPage,
});

function PanicPage() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSending && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSending && countdown === 0) {
      setIsSent(true);
      setIsSending(false);
      // In a real app, this is where the API call to send SMS/notifications would go
    }
    return () => clearTimeout(timer);
  }, [isSending, countdown]);

  const handlePanic = () => {
    setIsSending(true);
    setCountdown(3);
  };

  const cancelPanic = () => {
    setIsSending(false);
    setCountdown(3);
  };

  return (
    <div className="-mx-6 -mt-24 -mb-32 grid min-h-screen place-items-center bg-red-50 px-6 py-24 text-center">
      <div className="w-full max-w-sm">
        {!isSending && !isSent ? (
          <div className="animate-fade-up">
            <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl">🚨</span>
            </div>
            <h1 className="font-display text-4xl text-red-900">Emergency SOS</h1>
            <p className="mx-auto mt-4 max-w-[28ch] text-balance text-sage-600">
              Tap the button below to immediately notify your emergency contacts that you need help.
            </p>
            
            <div className="mt-12 grid place-items-center">
              <button
                onClick={handlePanic}
                className="group relative flex size-64 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/40 transition hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-20" />
                <div className="absolute inset-[-20px] animate-pulse rounded-full border-2 border-red-600/20" />
                <span className="font-display text-6xl font-bold tracking-tighter">SOS</span>
              </button>
            </div>

            <Link
              to="/"
              className="mt-16 inline-block text-xs font-bold uppercase tracking-[0.2em] text-sage-400 hover:text-sage-600"
            >
              Cancel — I'm safe
            </Link>
          </div>
        ) : isSending ? (
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl text-red-900">Sending Signal...</h1>
            <p className="mt-2 text-sage-600">Notifying emergency contacts in</p>
            
            <div className="my-12 grid place-items-center">
              <div className="flex size-48 items-center justify-center rounded-full border-8 border-red-600 border-t-transparent animate-spin">
                <span className="font-display text-7xl font-bold text-red-600 animate-none rotate-[-45deg]">{countdown}</span>
              </div>
            </div>

            <button
              onClick={cancelPanic}
              className="mt-8 rounded-full border-2 border-red-200 px-8 py-3 font-bold text-red-600 transition hover:bg-red-50"
            >
              STOP SENDING
            </button>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="font-display text-3xl text-green-900">Signal Sent</h1>
            <p className="mx-auto mt-4 max-w-[30ch] text-sage-600">
              Your location and distress signal have been shared with your emergency contacts. Help is on the way.
            </p>
            
            <div className="mt-12 rounded-2xl bg-white p-6 text-left shadow-sm border border-sage-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sage-400">Contacts Notified</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">Mom (Primary)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">Police Dispatch</span>
                </li>
              </ul>
            </div>

            <Link
              to="/"
              className="mt-12 inline-flex rounded-full bg-sage-900 px-10 py-4 font-bold text-white transition hover:bg-sage-600"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
