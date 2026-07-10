import { PixelSectionHeader } from "@pxlkit/ui-kit"
import ChatbotPage from "../chatbot/page"

export default function Homepage() {
  return ( 
  <>
  <div className="justify-center items-center p-6" >  
  <h1 className="text-3xl font-bold text-retro-cyan text-center p-4">Welcome to My Portfolio!</h1>
  <h2 className="text-xl text-retro-text text-center">Hi, I'm Meryem! I'm so excited you are here!</h2>
   </div> 
   <ChatbotPage />
  </>
  )
}