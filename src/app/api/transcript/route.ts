import { type NextRequest } from "next/server";
import { TranscriptResponse, YoutubeTranscript } from "youtube-transcript";

export async function GET(req: NextRequest)  {
    const searchParams = req.nextUrl.searchParams;
    const id= searchParams.get("id");
    if (!id) {
        return Response.json({
            status: false,
            data: [],
            message: "No video ID provided",
        })      
    }
    const res = await YoutubeTranscript.fetchTranscript(id);
    
    console.log(res)
    return Response.json({
        status: true, 
        message: "Success",
        data: res
    })
    
}