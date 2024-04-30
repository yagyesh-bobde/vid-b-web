import { eq } from "drizzle-orm";
import functions from "~/lib/helpers";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/dist/schema";

interface RequestBody {
    accessToken: string,
    conversationId: string
}


export async function POST(request: Request) {
    // get accessToken from request body
    const reqBody : RequestBody = await request.json() as RequestBody;

    const response = await functions.getTranscription(reqBody.accessToken, reqBody.conversationId);

    // store transcript in database
    await db.update(transcriptions).set({
        transcription: response
    })
    .where(eq(transcriptions.conversationId, reqBody.conversationId))

    return Response.json({ status: true, message: "ok"})
    
}