import functions from "~/lib/helpers";

interface RequestBody {
    accessToken: string,
    jobId: string
}


export async function POST(request: Request) {
    // get accessToken from request body
    const { accessToken, jobId }: RequestBody = await request.json() as RequestBody;

    const response = await functions.isJobDone(accessToken, jobId);

    return Response.json({ status: response })
}