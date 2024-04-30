/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "~/components/ui/Button";
import functions from "~/lib/helpers";

const Page = () => {
  const [loading, setloading] = useState({
    isLoading: false,
    message: "",
  });

  const router = useRouter();

  const [videoUrl, setvideoUrl] = useState("");

  const getJobStatus = async (
    accessToken: string,
    jobId: string,
  ): Promise<string> => {
    const isJobDone = await fetch("/api/transcript/job/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        jobId,
      }),
    });

    const res: {
      status: string;
    } = await isJobDone.json();

    return res.status;
  };

  const handleSubmit = async () => {
    setloading({
      isLoading: true,
      message: "Converting to audio...",
    });
    try {
      // convert to audio
      const res = await fetch("/api/transcript/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      });
      // get url
      const data: {
        message: string;
        path: string;
        id: string;
      } = await res.json();
      setloading({
        isLoading: false,
        message: "",
      });
      setloading({
        isLoading: true,
        message: "Generating transcription...",
      });

      

      const response = await fetch("/api/transcript/job/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: data.path, // audio url file name
          id: data.id // video id
        }),
      });

      const { accessToken, conversationId, jobId } = await response.json();

      if (!accessToken || !conversationId || !jobId) {
        setloading({
          isLoading: false,
          message: "Something went wrong. Please try again.",
        });
        return;
      }

      console.log("conv", conversationId);
      console.log("job", jobId);

      let status = await functions.isJobDone(
        accessToken as string,
        jobId as string,
      );

      while (status === "in_progress") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        status = await getJobStatus(accessToken as string, jobId as string);
      }

      if (status !== "completed") {
        setloading({
          isLoading: false,
          message: "Something went wrong. Please try again.",
        });
        return;
      }

      const transcription = await functions.getTranscription(
        accessToken as string,
        conversationId as string,
      );

      // TODO: CREATE DB ENTRY FOR THE VIDEO,CONVERSATION AND TRANSCRIPTION
      setloading({
        isLoading: true,
        message: "Navigating to Video page...",
      });

      // navigation
      setTimeout(() => {
        router.push("/video/" + data.id);
      }, 1000);
    } catch (error) {
        
        setloading({
            isLoading: false,
            message: "Something went wrong. Please try again.",
        })
        setvideoUrl("");
    }
  };

  return (
    <div className="relative grid h-screen place-content-center bg-black">
      {/* <div className='h-[60vh] w-screen bg-red-500 absolute grid grid-cols-3'>
            <div>
                
            </div>
        </div> */}

      {loading.isLoading && (
        <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50">
          {<p className="text-center text-white">{loading.message}</p>}
        </div>
      )}

      <div className="flex-col-center-center z-10 gap-5">
        <input
          type="text"
          placeholder="YouTube Video Url"
          value={videoUrl}
          className="w-[450px] rounded-full px-4 py-3"
          onChange={(e) => setvideoUrl(e.target.value)}
        />
        <Button className="bg-white" onClick={handleSubmit}>
          {/* <Button className='bg-white'  onClick={handleSubmit}> */}
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Page;
