"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/loader";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <Loader size="sm" label="Loading" />,
});

export default function ChatMarkdown({ text }: { text: string }) {
  return <ReactMarkdown>{text}</ReactMarkdown>;
}
