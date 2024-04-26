/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from 'react'
import Button from '~/components/ui/Button'
import functions from '~/lib/helpers';

const Page = () => {

     
   const [loading, setloading] = useState({
      isLoading: false,
      message: ""
   })

   const [videoUrl, setvideoUrl] = useState("") 
   
    const handleSubmit = async () => {
    //    setloading({
    //         isLoading: true,
    //         message: "Analyzing Video..."
    //     })

    //     const url = await functions.getAndStoreAudio(videoUrl)
    //     console.log(url)
        
    //     if(url === "error") {
    //         setloading({
    //             isLoading: false,
    //             message: "Invalid URL"
    //         })
    //         return;
    //     }
        setloading({
            isLoading: true,
            message: "Generating transcription..."
        })

        const { accessToken, conversationId, jobId } = await functions.getConversationId(videoUrl)
       
        if( !accessToken || !conversationId || !jobId) {
            setloading({
                isLoading: false,
                message: "Something went wrong. Please try again."
            })
            return;
        }

        console.log("conv", conversationId)
        console.log("job", jobId)

        let status = await functions.isJobDone(accessToken, jobId)

        while(status === "in_progress") {
            await new Promise(resolve => setTimeout(resolve, 1500));
            status = await functions.isJobDone(accessToken, jobId)
        }   

        if(status !== 'completed') {
            setloading({
                isLoading: false,
                message: "Something went wrong. Please try again."
            })
            return;
        }

        const transcription = await functions.getTranscription(accessToken, conversationId)

        setloading({
            isLoading: false,
            message: ""
        })

        

        console.log(transcription)
    }


   
    return (
        <div className='relative bg-black h-screen grid place-content-center'>
          
        {/* <div className='h-[60vh] w-screen bg-red-500 absolute grid grid-cols-3'>
            <div>
                
            </div>
        </div> */}

         {
            loading.isLoading && <div className='absolute top-0 left-0 w-screen h-screen bg-black opacity-50'>
                {
                    <p className='text-white text-center'>{loading.message}</p>
                }
            </div>
         }


          <div className='flex-col-center-center gap-5 z-10'>
            <input type="text" 
            placeholder='YouTube Video Url'
            value={videoUrl}
            className='py-3 px-4 w-[450px] rounded-full'
            onChange={(e) => setvideoUrl(e.target.value)}
            />   
            <Button className='bg-white'  onClick={handleSubmit}>
                Generate
            </Button>
          </div>
        </div>
    )
}

export default Page;
