"use client";

import { access } from "fs";

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const getAndStoreAudio = async(vid: string): Promise<string> => {
            if(!vid) {
                // TODO: TOAST INVALID YOUTUBE URL
                return "error"
            }

            const url = 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/?url=%3CREQUIRED%3E';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5be64915c7mshabd0016d04022d8p114e85jsn81b59b6abb85',
                    'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const json = await response.json();
                console.log(json);

                return json.dlink;
            } catch (error) {
                console.error(error);
                // random url
                return "error"
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
        "appId": process.env.NEXT_PUBLIC_SYMBL_ID!,
        "appSecret": process.env.NEXT_PUBLIC_SYMBL_SECRET!
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
    if (responseBody.message){
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
    console.log(data); // data - id, status(completed, failed, in_progress)
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
        console.log(json);
        return json.transcript.payload;
    
    // const response = await fetch(`https://api.symbl.ai/v1/conversation/${conversationId}/transcript`,{
    //     method: "POST",
    //     headers: {
    //         "x-api-key" : token,
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         "contentType": "text/markdown",
    //         "showSpeakerSeparation": true
    //     })
    // })

    // const data = await response.json();

    // console.log(data);
    // return data.transcript.payload;




}
const functions = {
    getAndStoreAudio,
    getAuthToken, 
    getConversationId,
    isJobDone,
    getTranscription,
}

export default functions;