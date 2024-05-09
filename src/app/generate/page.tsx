"use client";

import { useRouter } from "next/navigation";
import React, {useState } from "react";
import VidGallery from "~/components/Gallery/VidGallery";
import Button from "~/components/ui/Button";
import { getVideoId } from "~/lib/helpers/other";
import themeVideos from "./data";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [videoUrl, setvideoUrl] = useState("");
  const [vidId, setvidId] = useState("")

  const handleSubmit = async () => {
    // router 
    if(!videoUrl){
      // TODO : TOAST ENTER VALID VIDEO URL OR ID
      return;
    } 
    if(videoUrl.length > 11){
      const id = getVideoId(videoUrl);
      console.log(id)
      setvidId(id);
    } else {
      setvidId(videoUrl);
    }
    
    router.push("/generate/" + vidId);
  }




  return (
    <div className="relative grid h-screen place-content-center gap-12 bg-black">
      {/* <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50"> */}
      {/* </div> */}
      <Image
        src={"/images/hero/bg.png"}
        alt="hero"
        fill
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
      <VidGallery
        videos={themeVideos}
        className="z-20 gap-x-32"
        hideDetails={true}
      />

      <div className="flex-col-center-center z-10 gap-5">
        <input
          type="text"
          placeholder="YouTube Video Id"
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
