"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[var(--background,#fff)] px-4 text-center text-[var(--foreground,#171717)]">
        <div>
          <h1 className="text-3xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-[var(--muted,#71717a)]">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[var(--accent-soft,#dbeafe)] px-4 text-[var(--accent,#1d4ed8)]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
