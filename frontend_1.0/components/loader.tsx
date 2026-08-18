type LoaderProps = {
  size?: "sm" | "md";
  label?: string;
  className?: string;
};

const sizeClass = {
  sm: "size-5 border-2",
  md: "size-8 border-[3px]",
} as const;

export default function Loader({
  size = "md",
  label = "Loading",
  className = "",
}: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`.trim()}
    >
      <span
        className={`${sizeClass[size]} animate-spin rounded-full border-border border-t-accent`}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
