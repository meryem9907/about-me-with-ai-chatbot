

import ChatContainer from "@/components/chat-container"



export default  function ChatbotPage() {

  /* useEffect(  () => {
    async function fetchMessages() {
      const response = await fetch("http://localhost:8000/stream?prompt=Tell me about Meryem's background?");
      const data = await response.json();
      setMessages(data);
    }
    fetchMessages();
  }, []) */
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center pl-100 pr-100 "> 
     <ChatContainer />
     </div>
     
  )
}


