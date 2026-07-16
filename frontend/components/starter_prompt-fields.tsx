import { PixelChip, PixelPulse } from "@pxlkit/ui-kit";
import { starterPrompts } from "./data/starter_prompts";

export default function StarterPrompts({onMessage}:{onMessage: (text: string) => Promise<void>;}  ){

    const starterPromptsView = starterPrompts.map((prompt,i)=> 
        (<PixelChip key={i} label={prompt.content} tone="purple" onClick={()=>onMessage(prompt.content)}/>)

    )
    return (
        <div >
          
            <ul className="flex flex-row gap-5 ">{starterPromptsView}</ul>
        </div>
    )
}