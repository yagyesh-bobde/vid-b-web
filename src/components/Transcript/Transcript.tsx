import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { db } from '~/server/db';
import { transcriptRows, transcriptions } from '~/server/db/schema';



const Transcript = ({ videoId }: { videoId: string }) => {

    const [res, setres] = useState([]) 
    const fetchTranscript = async (id: string) => {
            const transcript = await db
                .select()
                .from(transcriptRows)
                .where(eq(transcriptions.videoId, id));
            
            // setres(transcript);
            console.log(transcript)
            return transcript;
    }
    
    
  useEffect(() => {
         fetchTranscript(videoId)
         .then(res => {
            // setres(res)
         })
         .catch(err => {
            console.log(err)
         })
  }, [])


  return (
    <div className="transcript h-1/4 space-y-5">
      <div className="flex-center-between">
        <h2 className="cursor-pointer text-xl font-semibold lg:text-2xl">
          Transcript
        </h2>
        <h2 className="text-md cursor-pointer font-semibold opacity-50 lg:text-lg">
          Resources
        </h2>
      </div>
      <div className="pb-5 text-xl leading-10">
        {res.map((item: typeof transcriptRows, index: number) => {
            console.log("res", res)
            
            
        return (
            <div key={index}>
                00:00 -{" "} - alksdjflask;jdf
                
                {/* <span>
                    {formatTime(parseFloat(item.offset))} -{" "}
                    {formatTime(
                        parseFloat(item.offset.toString()) + parseFloat(item.duration.toString()),
                    )}
                </span>
                :{" "}
                <span className="leading-relaxed tracking-wider">
                    {item.transcriptText}
                </span> */}
            </div>
        );
        })}
      </div>
    </div>
  );
};


function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
export default Transcript
