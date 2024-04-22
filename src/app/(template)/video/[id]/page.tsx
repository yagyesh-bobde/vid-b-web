import { headers } from 'next/headers'
import React from 'react'
import Chat from '~/components/Chat/Chat'
import Transcript from '~/components/Transcript/Transcript'

const page = () => {
    
    return (
        <div className='flex h-full w-screen  bg-black text-white'>
            <div className="video h-full w-3/4 flex flex-col  space-y-4 p-8">
                <h2 className='text-xl font-semibold'>Video Title: A Sample Video Title</h2>
                <iframe width="420" height="315" className='w-full h-1/2 min-h-[50vh]'
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                <Transcript />
                
            </div>
            
            <Chat />
        </div>
    )
}

export default page
