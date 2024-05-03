import React from 'react'
import ReactMarkdown from 'react-markdown';



const Transcript = (
    { transcript }: { transcript: string }
) => {

    const removeBrtags = (text: string) => {
        return text.replace(/<br>/g, "\n");
    }
    return (
        <div className='transcript h-1/4 space-y-5'>
            <div className='flex-center-between'>
                <h2 className='text-xl lg:text-2xl font-semibold cursor-pointer'>
                    Transcript
                </h2>
                <h2 className='text-md lg:text-lg opacity-50 font-semibold cursor-pointer'>
                    Resources
                </h2>
            </div>
            <div className='pb-5 text-xl leading-10'>
               {
                   removeBrtags(transcript)
               } 
            </div>
        </div>
    )
}

export default Transcript
