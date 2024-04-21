import React from 'react'
import Chat from '~/components/Chat/Chat'
import Transcript from '~/components/Transcript/Transcript'

const page = () => {
    return (
        <div className='flex min-h-screen w-screen overflow-hidden bg-black text-white'>
            <div className="video w-3/4 flex flex-col p-8 space-y-4">
                <h2 className='text-xl font-semibold'>Video Title: A Sample Video Title</h2>
                <iframe width="420" height="315" className='w-full h-1/2'
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                <Transcript />
            </div>
            
            <Chat />
        </div>
    )
}

export default page
