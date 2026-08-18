"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import BlinkingEffect from "./blinking-effect";
import Chevron from "./chevron";
import TwoColCard from "./two-col-card";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function TypewriterText({ text }: { text: string | string[] }) {
  const t = useTranslations("Home");
  const lines = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );
  const [reducedMotion] = useState(prefersReducedMotion);
  const [lineIndex, setLineIndex] = useState(0);
  const current = lines[lineIndex] ?? "";
  const isLastLine = lineIndex >= lines.length - 1;

  return (
    <TypewriterLineView
      key={`${lineIndex}-${current}`}
      current={current}
      reducedMotion={reducedMotion}
      isLastLine={isLastLine}
      brandTitle={t("brandTitle")}
      lineProgress={t("lineProgress", {
        current: lineIndex + 1,
        total: lines.length,
      })}
      labels={{
        nextLine: t("nextLine"),
        chatCta: t("chatCta"),
        projectsCta: t("projectsCta"),
        goToEnd: t("goToEnd"),
      }}
      onNext={() => setLineIndex((i) => i + 1)}
      onSkipToEnd={() => setLineIndex(lines.length - 1)}
    />
  );
}

function TypewriterLineView({
  current,
  reducedMotion,
  isLastLine,
  brandTitle,
  lineProgress,
  labels,
  onNext,
  onSkipToEnd,
}: {
  current: string;
  reducedMotion: boolean;
  isLastLine: boolean;
  brandTitle: string;
  lineProgress: string;
  labels: {
    nextLine: string;
    chatCta: string;
    projectsCta: string;
    goToEnd: string;
  };
  onNext: () => void;
  onSkipToEnd: () => void;
}) {
  const speed = 40;
  const [typedLength, setTypedLength] = useState(
    reducedMotion ? current.length : 0,
  );
  const displayedText = current.slice(0, typedLength);
  const isLineDone = typedLength >= current.length;

  useEffect(() => {
    if (reducedMotion) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedLength(i);
      if (i >= current.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [current, reducedMotion]);

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center px-4 py-10 text-2xl md:px-10 md:text-4xl">
      <h1 className="sr-only">{brandTitle}</h1>
      <div>
        {displayedText}{" "}
        {isLineDone && <BlinkingEffect>|</BlinkingEffect>}
        {isLineDone && !isLastLine && (
          <Chevron clickHandler={onNext} label={labels.nextLine} />
        )}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLineDone ? current : ""}
      </div>
      {isLineDone && isLastLine && (
        <TwoColCard
          leftHref="/chat-assistant"
          rightHref="/projects"
          leftContent={
            <p className="text-center text-xl md:text-2xl">{labels.chatCta}</p>
          }
          rightContent={
            <p className="text-center text-xl md:text-2xl">
              {labels.projectsCta}
            </p>
          }
        />
      )}
      {!isLastLine && (
        <button
          type="button"
          className="mt-4 min-h-11 cursor-pointer rounded-md border border-border bg-surface px-3 text-sm text-foreground"
          onClick={onSkipToEnd}
        >
          {labels.goToEnd}
        </button>
      )}
      {process.env.NODE_ENV === "development" && (
        <p className="mt-2 text-sm text-muted">{lineProgress}</p>
      )}
    </div>
  );
}
