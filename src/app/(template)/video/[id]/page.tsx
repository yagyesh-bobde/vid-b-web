
"use client";

import { useEffect, useState } from "react";
import { BiQuestionMark } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import Chat from "~/components/Chat/Chat";
import Transcript from "~/components/Transcript/Transcript";
import { YoutubeTranscript } from "youtube-transcript";
import fetchTranscript from "~/lib/helpers/transcript";


const Page = ( ) => {
  // const location
  const [showMobileChat, setshowMobileChat] = useState(false);
  const router = useRouter();
  
  const [vidId, setvidId] = useState("")

  useEffect(() => {
    // get the video id from the url
    const path: string = window.location.pathname;
    const parts: string[] = path.split("/");
    const lastPart = parts[parts.length - 1];
    
    setvidId(lastPart ?? "");

  }, [setvidId])

  
  return (
    <div className="flex h-full w-screen  bg-black text-white">
      <div className="video flex h-full flex-col space-y-4  p-8 md:w-3/4">
        <h2 className="text-xl font-semibold">
          Video Title: A Sample Video Title
        </h2>
        {vidId && (
          <iframe
            width="420"
            height="315"
            className="h-1/2 min-h-[50vh] w-full"
            src={`https://www.youtube.com/embed/${vidId}`}
          ></iframe>
        )}
        <Transcript videoId={vidId} />
      </div>

      <Chat showMobileChat={showMobileChat} />

      <div
        onClick={() => setshowMobileChat(!showMobileChat)}
        className="flex-center fixed bottom-5 right-5 h-[67px] w-[67px] cursor-pointer rounded-full bg-white/90 md:hidden"
      >
        <BiQuestionMark className="animate-bounce text-4xl text-black" />
      </div>
    </div>
  );
};

export default Page;
