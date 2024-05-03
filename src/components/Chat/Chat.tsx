'use client'

import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { IoMdSend } from "react-icons/io";
import { textTotext } from '~/lib/helpers/gemini';



const Chat = ({
    showMobileChat = false
}: {
    showMobileChat: boolean
}) => {
    const response = ["Have a doubt in this video?", "What does this word mean?", "How do I use this?", "I don't understand this", "What is video about?", "Explain this to me", "I don't this concept", "Summary of video?"]
    
    const [input, setinput] = useState("")
    const [chatResponse, setchatResponse] = useState("")
    const [isLoading, setisLoading] = useState(false)    


    const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
           const text = await textTotext(input)
        
            setchatResponse(text + "\n") 
            setinput("")
        }
    }

    const handleButtonClick = async() => {
        const text = await textTotext(input)
        
        setchatResponse(text + "\n")
        setinput("")
    }
    
    
    return (
        <div className={`max-md:fixed top-0 left-0 right-0 bottom-0 chat md:w-1/4 flex flex-col bg-black md:bg-white/10 p-8 ${showMobileChat ? "z-10" : ""}`}>
            <div className='flex flex-col h-[95vh] sticky top-5'>
                <CgClose className='md:hidden' />
                <h2 className='text-xl font-semibold '>Ask Expert</h2>
                {
                    !chatResponse && 

                    <div className='space-y-4 flex-1 py-10'>
                        {
                            response.map((item, index) => {
                                return(
                                    <p key={index} className='italic text-gray-400'>{item}</p>
                                )
                            })
                        }
                    </div>
                }
                <div className='space-y-4 flex-1 py-10'>
                    {chatResponse}
                </div>
                <div className=' flex-center-between border-2 border-gray-400 w-full rounded-full py-2 px-4'>
                    <input value={input} onChange={
                        (e) => setinput(e.target.value)
                    } onKeyDown={handleEnter} type="text" className='bg-transparent focus:outline-none active:outline-none' placeholder="Ask a question..." />

                    <IoMdSend onClick={handleButtonClick} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Chat
