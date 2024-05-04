/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react'
import { TranscriptResponse } from 'youtube-transcript';

const page = async () => {
  
    const response = await fetch("/api/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "S_F_c9e2bz4",
      }),
    });
    
    const data = await response.json() as Promise<{
      status: boolean;
      message: string;
      data: TranscriptResponse[] | [];
    }>;

    console.log(data)
    const res = (await data).data;
    console.log(res)
    if(res.length == 0) {
      // TODO : TOAST
      return ;
    }
    
    return (
        <div>
            {
                res.map((item, index) => {
                    return (
                      <div key={index}>
                        <span>
                          {formatTime(item.offset)} -{" "}
                          {formatTime(item.offset + item.duration)}
                        </span>
                        : <span className='leading-relaxed tracking-wider'>{item.text}</span>
                      </div>
                    );
                })
            }
        </div>
    )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default page;
