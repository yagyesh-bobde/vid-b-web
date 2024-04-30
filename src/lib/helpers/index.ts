/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { env } from "~/env";


const getFullPath = (path: string) => {
    return env.SUPABASE_URL + "/storage/v1/object/public/" + env.SUPABASE_AUDIO_BUCKET_NAME + "/" + path;
}

function extractYouTubeVideoId(url: string) {
    // Regular expression to match YouTube video URL patterns
    try {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    
        // Execute the regular expression on the URL
        const match = url.match(regExp);

        // If there's a match, return the video ID, otherwise return string
        return match ? match[1] : url;
    } catch (error) {
        return url;
    }
}



const getAuthToken = async (): Promise<string> => {
  const response = await fetch("https://api.symbl.ai/oauth2/token:generate", {
    method: "POST",
    headers: {
        "content-type": "application/json",
    }, 
    body: JSON.stringify({
        "type": "application",
        "appId": env.SYMBL_ID,
        "appSecret": env.SYMBL_SECRET
    })
  });

  const data = await response.json();

  console.log(data); 
  return data.accessToken;
};


const getConversationId = async (url: string) : Promise<{
    accessToken: string,
    conversationId: string,
    jobId: string
}> => {
    const accessToken = await getAuthToken();
    if(!accessToken) {
        // TODO: TOAST TRY AGAIN
        console.log('no token')
        return {
            accessToken: '',
            conversationId: '',
            jobId: ''
        }
    }
    const response = await fetch("https://api.symbl.ai/v1/process/audio/url", {
        method: "POST",
        headers: {
            "x-api-key" : accessToken,
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            "name": "transcription_" + new Date().getTime(),
            "url": url,
            "confidenceThreshold": 0.6,
            "timezoneOffset": 0,
            "enableSpeakerDiarization": false,
            "features": {
                "featureList": [
                    "insights",
                    "callScore"
                ]
            },
        })
    })
    const responseBody = await response.json();
    
    // In case failed return empty object
    console.log(responseBody)
    if (responseBody.message){
        console.log("failed")
        console.log(response)
        return ({
            accessToken: '',
            conversationId: '',
            jobId: ''
        })
    }

    return {
        accessToken,
        conversationId: responseBody.conversationId,
        jobId: responseBody.jobId
    } 
}

const isJobDone = async(token: string, jobId: string) : Promise<string> => {
    const response = await fetch(`https://api.symbl.ai/v1/job/${jobId}`,{
        method: "GET",
        headers: {
            "x-api-key" : token,
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json();
    // console.log(data); // data - id, status(completed, failed, in_progress)
    return data.status;
}

const getTranscription = async(token: string, conversationId: string) : Promise<string> => {
        // const myHeaders = new Headers();
        // myHeaders.append("x-api-key", token);


        const requestOptions = {
            method: "POST",
            headers: {
                "x-api-key" : token,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                contentType: "text/markdown",
                showSpeakerSeparation: false
            }),
        };

        const data = await fetch(`https://api.symbl.ai/v1/conversations/${conversationId}/transcript`, requestOptions)
        
        const json = await data.json();
        return json.transcript.payload;
}



const functions = {
    getAuthToken, 
    getConversationId,
    isJobDone,
    getTranscription,
    extractYouTubeVideoId,
    getFullPath
}

export default functions;