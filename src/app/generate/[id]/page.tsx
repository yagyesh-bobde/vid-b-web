import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/schema";
import { useParams, useRouter } from "next/navigation";
import fetchTranscript, { isYouTubeVideoId } from "~/lib/helpers/transcript";
import { type TranscriptResponse } from "youtube-transcript";


export default async function  Page() {
    const { id } = useParams();
    // const transcript = await db.select().from(transcriptions).where(eq(transcriptions.videoId,id));
    // const isVideoId = isYouTubeVideoId(id);
    
    // const router = useRouter();
    // if(transcript.length > 0){
    //     // navigate to the video page
    //     router.push(`/video/${id}`);
    // } else if (isVideoId) {
    //     // generate the video transcription
    //     const res: TranscriptResponse[] = await fetchTranscript(id);
    //     const copyRes: {
    //         transcriptText: string;
    //         duration: string;
    //         offset: number;
    //         videoId: string;
    //     }[] = [];

    //     res.forEach((item) => {
    //         copyRes.push({
    //             transcriptText: item.text,
    //             duration: item.duration.toString(),
    //             offset: item.offset,
    //             videoId: id,
    //         });
    //     }); 

        
        
    //     await db.insert(transcriptions).values(copyRes)
        
    // } else{ 
    //     // navigate to the generate page
    //     await router.push(`/generate`);
    // }
    // search in db if the video exists
    // if it does, return the video
    // otherwise fetch the transcript and store in db
    
    
    return(
        <div className="h-screen grid place-content-center bg-black text-white">
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="w-[150px] h-[150px] rounded-full border-t-2 border-white animate-spin">
                    
                </div>
                <div className="text-2xl animate-pulse">
                    Generating website for your video
                </div>
            </div>
        </div>
    )
}