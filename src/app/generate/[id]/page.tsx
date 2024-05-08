// import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { transcriptRows, transcriptions } from "~/server/db/schema";
// import { type TranscriptResponse } from "youtube-transcript";
import fetchTranscript, { fetchMetaData, fetchTranscriptionRows } from "~/lib/helpers/transcript";
import { redirect } from 'next/navigation'
import { auth } from "~/auth";
import { Session } from "next-auth";

export default async function  Page({ params } : { params: { id: string } }) {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const session: {
      userId: string
    } = await auth();
    if (!session.userId ?? !session) {
      return redirect("/api/auth/signin?callbackUrl=/generate");
    }
    
    const getTranscripts: {
      transcriptText: string;
      duration: string;
      offset: string;
      videoId: string;
    }[]
     = await fetchTranscriptionRows(params.id);
    if (getTranscripts.length == 0) {
      // fetch transcript
      const res = await fetchTranscript(params.id);

      const metaData = await fetchMetaData(params.id);

      const copyRes: {
        transcriptText: string;
        duration: string;
        offset: string;
        videoId: string;
      }[] = [];

      res.forEach((item) => {
        copyRes.push({
          transcriptText: item.text,
          duration: item.duration.toString(),
          offset: item.offset.toString(),
          videoId: params.id,
        });
      });



      await db
        .insert(transcriptions)
        .values({
          title: metaData.title ?? "",
          thumbnail: metaData.thumbnailUrl ?? "",
          channelTitle: metaData.channelTitle ?? "",
          userId: session.userId,
          videoId: params.id,
        })
        .onConflictDoNothing();

      await db.insert(transcriptRows).values(copyRes);

      
    }
    // setTimeout(() => {
    redirect("/video/" + params.id);
      
    // }, 2000);
    
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