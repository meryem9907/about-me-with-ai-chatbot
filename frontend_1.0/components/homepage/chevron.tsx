"use client";

export default function Chevron({
  clickHandler,
  label = "Show next line",
}: {
  clickHandler?: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={clickHandler}
      aria-label={label}
      className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center align-middle hover:animate-bounce"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
        aria-hidden
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
