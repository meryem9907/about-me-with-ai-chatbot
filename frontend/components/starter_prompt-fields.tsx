import { PixelChip} from "@pxlkit/ui-kit";
import { starterPrompts } from "./data/starter_prompts";

export default function StarterPrompts({onMessage}:{onMessage: (text: string) => Promise<void>;}  ){

    const starterPromptsView = starterPrompts.map((prompt)=> 
        (<PixelChip className="md:w-auto w-full mb-2 md:mb-0" key={prompt.id} label={prompt.content} tone="purple" onClick={()=>onMessage(prompt.content)}/>)

    )
    return (
        <div >
          
            <ul className="md:flex md:flex-row gap-5  ">{starterPromptsView}</ul>
        </div>
    )
}