"use client";

import { useEffect, useState } from "react";
import { BiHome, BiQuestionMark, BiSolidShareAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Chat from "~/components/Chat/Chat";
import Transcript from "~/components/Transcript/Transcript";
// import { YoutubeTranscript } from "youtube-transcript";
import {
  fetchTranscriptionRows,
  fetchVideoTranscrptDB,
} from "~/lib/helpers/transcript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";

import { TiArrowBack } from "react-icons/ti";

export interface TranscriptProps {
  videoId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  transcriptText: string;
  duration: string;
  offset: string;
}

interface Transcription {
  id: number;
  videoId: string;
  summary: string | null;
}

const Page = () => {
  // const location
  const router = useRouter();
  const [showMobileChat, setshowMobileChat] = useState(false);
  const [res, setres] = useState<TranscriptProps[] | []>([]);
  const [vidId, setvidId] = useState("");
  const [para, setpara] = useState("")
  
  const [transcript, settranscript] = useState<Transcription>({
    id: 0,
    videoId: "",
    summary: "" 
  })

  useEffect(() => {
    // get the video id from the url
    const fetchAll = async (id: string, creator : string) => {
      const transcripts = await fetchTranscriptionRows(id, creator); // Await the result of the fetchTranscriptionRows function
      setres(transcripts);
    
      if (transcripts.length == 0) {
        const path: string = window.location.pathname;
        const parts: string[] = path.split("/vid");

        router.push(parts[0] ?? "/generate");
      }

      let text = "";
      transcripts.forEach((item) => {
        text += item.transcriptText;
      });

      setpara(text);

      const res = await fetchVideoTranscrptDB(id);
      if(res) {
        settranscript({
          id: res.id,
          videoId: res.videoId,
          summary: res.summary,
        });
      }

      
    };

    

    const path: string = window.location.pathname;
    const parts: string[] = path.split("/");
    const lastPart = parts[parts.length - 1];

    
    setvidId(lastPart ?? "");
    fetchAll(lastPart ?? "", parts[4] ?? "").catch((err) => console.log(err));
  }, [setvidId, router]);

  return (
    <div className="flex h-full w-screen bg-black  text-white max-md:h-screen">
      <div className="video flex h-full w-full flex-col space-y-4  p-8 md:w-3/4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Video Title: A Sample Video Title
          </h2>
          <div className="flex gap-8">
            <div
              onClick={() => {
                const path: string = window.location.pathname;
                const parts: string[] = path.split("/vid");

                router.push(parts[0] ?? "/generate");
              }}
              className="cursor-pointer"
            >
              <TiArrowBack className="text-xl" />
            </div>
            <Link href="/">
              <BiHome className="text-xl" />
            </Link>
          </div>
        </div>
        {vidId && (
          <iframe
            width="420"
            height="315"
            className="h-1/2 min-h-[50vh] w-full"
            src={`https://www.youtube.com/embed/${vidId}`}
          ></iframe>
        )}
        {/* {vidId.length == 11 && <Transcript transcripts={res} />} */}

        <Tabs defaultValue="transcript" className="">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-5">
              <BiSolidShareAlt className="cursor-pointer text-xl" />
              <h2 className="text-md cursor-pointer font-semibold opacity-50 lg:text-lg">
                Resources
              </h2>
            </div>
          </div>
          <TabsContent value="transcript">
            <Transcript transcripts={res} />
          </TabsContent>
          <TabsContent value="summary">
            {transcript.summary ?? "No summary available for this video."}
          </TabsContent>
        </Tabs>
      </div>

      <Chat
        showMobileChat={showMobileChat}
        setshowMobileChat={setshowMobileChat}
        transcripts={res}
      />

      {!showMobileChat && (
        <div
          onClick={() => setshowMobileChat(!showMobileChat)}
          className="flex-center fixed bottom-5 right-5 h-[67px] w-[67px] cursor-pointer rounded-full bg-white/90 md:hidden"
        >
          <BiQuestionMark className="animate-bounce text-4xl text-black" />
        </div>
      )}
    </div>
  );
};

export default Page;
