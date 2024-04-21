import React from 'react'
import { IoMdSend } from "react-icons/io";



const Chat = () => {
    const response = ["Have a doubt in this video?", "What does this word mean?", "How do I use this?", "I don't understand this", "What is video about?", "Explain this to me", "I don't this concept", "Summary of video?"]
    
    return (
        <div className="chat w-1/4 flex flex-col bg-white/10 p-8">
            <h2 className='text-xl font-semibold'>Ask Expert</h2>
            <div className='space-y-4 flex-1 py-10'>
                {
                    response.map((item, index) => {
                        return(
                            <p key={index} className='italic text-gray-400'>{item}</p>
                        )
                    })
                }
            </div>
            <div className='flex-center-between border-2 border-gray-400 w-full rounded-full py-2 px-4'>
                <input type="text" className='bg-transparent focus:outline-none active:outline-none' placeholder="Ask a question..." />

                <IoMdSend />
            </div>
        </div>
    )
}

export default Chat
