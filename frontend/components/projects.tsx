"use client";

import { PxlKitIcon } from "@pxlkit/core";
import { PixelButton, PixelCard, PixelTooltip } from "@pxlkit/ui-kit";
import { Heart } from "@pxlkit/social";
import { Staff } from "@pxlkit/gamification";
import { SparkleSmall } from "@pxlkit/ui";
import { Globe } from "@pxlkit/social";
import { Lightning } from "@pxlkit/gamification";
import { projects } from "./data/projects";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

function Cell({
  children,
  icon,
  desc,
}: {
  children: string;
  icon: any;
  desc: string;
}) {
  return (
    <div className="embla_slide">
      <PixelCard
        className="bg-retro-gold/80 p-20 mb-6 pxl-corner-md  text-xs 
       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg focus-visible:ring-retro-gold/40 
       hover:bg-retro-gold/10  font-mono   
       "
        tone="gold"
        icon={icon}
        title={children}
        footer={
<PixelTooltip content="Currently not available" position="bottom">
          <PixelButton
          disabled
            tone="red"
            iconLeft={<PxlKitIcon icon={Lightning} size={32} />}
            className="whitespace-nowrap w-full min-w-0"
          >
            Visit Live-Demo
          </PixelButton>
          </PixelTooltip>

        }
      >
        {desc}
      </PixelCard>
    </div>
  );
}

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const projectElements = projects.map((project) => (
    <div key={project.id}>
      <Cell icon={<PxlKitIcon icon={Staff} size={32} />} desc={project.content}>
        {project.label}
      </Cell>
    </div>
  ));

  return (
    <div className="embla relative mx-auto  ">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y gap-4">
          {projectElements}
        </div>
      </div>
<div className="flex justify-center gap-4">
      <PixelButton className="embla__prev" tone="gold" onClick={scrollPrev}>
        Prev
      </PixelButton>
      <PixelButton className="embla__next" tone="gold" onClick={scrollNext}>
        Next
      </PixelButton></div>
    </div>
  );
}
/* inline-flex items-center justify-center font-medium outline-none disabled:opacity-50 
disabled:cursor-not-allowed font-mono pxl-corner-sm transition-all duration-150 h-10 px-4
 text-sm gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 
focus-visible:ring-offset-retro-bg focus-visible:ring-retro-cyan/40 text-retro-cyan border
 border-transparent bg-transparent hover:bg-retro-cyan/25 active:scale-[0.97] */

/*  flex items-center justify-center relative min-h-[350px] overflow-hidden bg-clip-text bg-transparent  */
