import { type NextRequest } from "next/server";
import { TranscriptResponse, YoutubeTranscript } from "youtube-transcript";

interface RequestBody {
    id: string;
}


export async function POST(req: Request)  {
    const reqBody: RequestBody = await req.json() as RequestBody;
    
    const res = await YoutubeTranscript.fetchTranscript(reqBody.id);
    
    console.log(res)
    return Response.json({
        status: true, 
        message: "Success",
        data: res
    })
    
}