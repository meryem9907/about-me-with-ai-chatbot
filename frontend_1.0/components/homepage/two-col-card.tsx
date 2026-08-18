import { Link } from "@/i18n/navigation";

export default function TwoColCard({
  leftHref,
  rightHref,
  leftContent,
  rightContent,
}: {
  leftHref: "/chat-assistant" | "/projects";
  rightHref: "/chat-assistant" | "/projects";
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  gap-4 pt-2 animate-fade-in sm:flex-row">
      <Link
        href={leftHref}
        className="min-h-11 flex-1 rounded bg-accent-soft p-4 text-accent transition-opacity hover:opacity-90"
      >
        {leftContent}
      </Link>
      <Link
        href={rightHref}
        className="flex items-center justify-center min-h-11 flex-1 rounded bg-accent-soft p-4 text-accent  transition-opacity hover:opacity-90"
      >
        {rightContent}
      </Link>
    </div>
  );
}
