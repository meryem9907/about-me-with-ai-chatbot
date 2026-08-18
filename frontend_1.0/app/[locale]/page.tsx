import TypewriterText from "@/components/homepage/typewriter-text";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  const welcome = t.raw("welcome") as string[];

  return <TypewriterText text={welcome} />;
}
