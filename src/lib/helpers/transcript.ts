'use server'


import { eq } from "drizzle-orm";
import { YoutubeTranscript } from "youtube-transcript";
import { db } from "~/server/db";
import { transcriptRows, transcriptions } from "~/server/db/schema";

// fetch transcription rows from database
 export const fetchTranscriptionRows = async (id: string) => {
    const transcript = await db
      .select()
      .from(transcriptRows)
      .where(eq(transcriptRows.videoId, id));
    
    // setres(transcript);
    console.log(transcript)
    return transcript;
  }

export const fetchTranscript = async (id: string) => {
    const res = await YoutubeTranscript.fetchTranscript(id);
    console.log(res[1])
    // const json = await res.json();
    // console.log(json)
    return res
}




export default fetchTranscript;