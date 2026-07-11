import {
  PixelCard,
  PixelFlicker,
  PixelHeroMedia,
  PixelScrollArea,
  PixelSidebar,
  PixelTabs,
  PixelTwoColumn,
  TabItem,
} from "@pxlkit/ui-kit";
import { quickViewData } from "./data/quick-view-data";
import { useState } from "react";
type ActiveSection = "1" | "2" | "3";

export default function QuickViewContainer() {


  const infos = quickViewData.map((info) => (
    <PixelCard
      key={info.id}
      title={info.label}
      className="mb-4 pxl-corner-md font-pixel bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-xs font-mono text-retro-muted"
      tone="cyan"
    >
      {info.content}
    </PixelCard>
  ));

  const [active, setActive] = useState<ActiveSection>("1");

  const sections = quickViewData.map((info) => ({
   
    items: [
      {
        id: info.id,
        label: info.label,
        content: <div className="p-4">{info.content}</div>,
        active: active === info.id,
        onSelect: () => setActive(info.id as ActiveSection),
      },
    ],
  }));

  return (
    /* <PixelHeroMedia ratio="16/10">
      <ul>{infos}</ul>
    </PixelHeroMedia> */

    <div className="flex flex-row gap-4 w-full">
      <PixelSidebar sections={sections} className="w-[240px] shrink-0"></PixelSidebar>

      <PixelScrollArea aria-label="Quick views" maxHeight={160}>
        {quickViewData.find((info) => info.id === active)?.content}
        /* later give a article as a component with the id */
      </PixelScrollArea>
    </div>
  );
}
