import React from 'react'
import fetchTranscript from '~/lib/helpers/transcript';

const page = async () => {
    const res = await fetchTranscript("WIeJF3kL5ng");
    console.log(res[0])
    
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
