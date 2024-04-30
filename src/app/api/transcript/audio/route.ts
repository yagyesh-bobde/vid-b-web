/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { eq } from "drizzle-orm";
import ytdl from "ytdl-core";
import { env } from "~/env";
import functions from "~/lib/helpers";
import { supabaseClient } from "~/lib/supabase";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/schema";

interface RequestBody {
    url: string,
}
interface StorageError {
    code: string;
    message : string;
}

export async function POST(request: Request) {
        try {
        // Parse request body
        const reqBody: RequestBody = await request.json() as RequestBody;
        const url = reqBody.url;

        // Download audio
        const audioStream = ytdl(url, {
            filter: "audioonly",
            quality: "highestaudio",
        });

        // Buffer to store audio data
        const buffers: Buffer[] = [];

        // Promisify the audioStream
        const downloadPromise = new Promise((resolve, reject) => {
            audioStream.on("data", (data: Buffer) => {
                buffers.push(data);
            });
            audioStream.on("end", () => {
                console.log("Audio download complete");
                resolve(1);
            });
            audioStream.on("error", (error) => {
                reject(error);
            });
        });

        // Wait for the audio download to complete
        const result = await downloadPromise;

        // If an error occurred during the download, reject the promise
        if (result instanceof Error) {
            return Response.json({ error: "Error downloading audio" }, { status: 500 });
        }
        
        // Concatenate buffers into a single Buffer
        const audioBuffer = Buffer.concat(buffers);
        // Upload audio to Supabase
        const videoId: string | undefined = functions.extractYouTubeVideoId(url);
        const { data, error } = await supabaseClient.storage.from(env.SUPABASE_AUDIO_BUCKET_NAME).upload(`${videoId}.mp3`, audioBuffer);

        if (error) {
            console.error('Error uploading audio to Supabase:', error.message);
            // return Response.json({ error: 'Error uploading audio to Supabase' }, { status: 500 });
            const res = await db.select().from(transcriptions).where(eq(transcriptions.videoId, videoId ?? url))
            // const { data } = supabaseClient.storage.from('vid-b-web').getPublicUrl(`${videoId}.mp3`)

            // console.log("public url", data)
            return new Response(JSON.stringify({ message: "ok", path: res[0]?.audioUrl , id: res[0]?.videoId }), {
                headers: { "Content-Type": "application/json" },
            }); 
        } 

        console.log('Audio uploaded successfully!');
        console.log(data)
        // save videoid and audio path to database
        try {
            await db.insert(transcriptions).values({
            audioUrl: data.path,
            videoId: videoId ?? url,
        })
        } catch (error) {
            console.log("already entry exists")
        }

        return new Response(JSON.stringify({ message: "ok", path: data.path , id: videoId ?? url }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}