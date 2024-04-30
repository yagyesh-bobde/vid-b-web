/* eslint-disable @typescript-eslint/no-unsafe-call */
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import functions from "~/lib/helpers";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/schema";

interface ResponseBody{ 
    url: string,
    id: string
}

export async function POST(request: Request) {
    // get accessToken from request body
    const body: ResponseBody = await request.json() as ResponseBody;
    const getFullPath = functions.getFullPath(body.url);

    console.log(getFullPath);
    
    const response = await functions.getConversationId(getFullPath);
    console.log(response);

    if(!response.accessToken || !response.conversationId || !response.jobId || !body.id) {
        return Response.json({ message: "Something went wrong. Please try again." }, { status: 500 });
    }

    const id = await db.update(transcriptions)
    .set({
        conversationId: response.conversationId,
        jobId: response.jobId
    })
    .where(eq(transcriptions.videoId, body.id))
    .returning({ id : transcriptions.id })

    if(!id) {
        return redirect('/generate');
    }

    return Response.json(response)
}