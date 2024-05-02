"use client";
import React, { useState } from "react";
import Button from "~/components/ui/Button";

const Page = () => {
  const [loading, setloading] = useState({
    isLoading: false,
    message: "",
  });

  const [videoUrl, setvideoUrl] = useState("");

  const handleSubmit = async () => {
    setloading({ isLoading: true, message: "Converting to audio..." });
    try {
      // getting transcription

      // make a entry in database

    }catch (error) {
      setloading({ isLoading: false, message: "Something went wrong. Please try again." });
      setvideoUrl("");
    }
  }

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
