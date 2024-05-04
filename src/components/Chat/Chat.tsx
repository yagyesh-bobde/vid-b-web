'use client'

import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { IoMdSend } from "react-icons/io";
import { textTotext } from '~/lib/helpers/gemini';



const Chat = ({
  showMobileChat,
  setshowMobileChat,
}: {
  showMobileChat: boolean;
  setshowMobileChat : (showMobileChat: boolean) => void
}) => {
  const response = [
    "Have a doubt in this video?",
    "What does this word mean?",
    "How do I use this?",
    "I don't understand this",
    "What is video about?",
    "Explain this to me",
    "I don't this concept",
    "Summary of video?",
  ];

  const [input, setinput] = useState("");
  const [chatResponse, setchatResponse] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const text = await textTotext(input);

      setchatResponse(text + "\n");
      setinput("");
    }
  };

  const handleButtonClick = async () => {
    const text = await textTotext(input);

    setchatResponse(text + "\n");
    setinput("");
  };

  return (
    <>
      {
      !showMobileChat ? 
        <div
          className={`p-8 max-md:hidden md:w-1/4 md:bg-white/10 ${showMobileChat ? "z-10" : ""}`}
        >
          <div className="sticky top-5  flex h-[95vh] flex-col">
            <CgClose
              className="absolute right-5 z-50 cursor-pointer text-xl md:hidden"
              onClick={() => setshowMobileChat(!showMobileChat)}
            />
            <h2 className="text-xl font-semibold ">Ask Expert</h2>
            {!chatResponse && (
              <div className="flex-1 space-y-4 py-10">
                {response.map((item, index) => {
                  return (
                    <p key={index} className="italic text-gray-400">
                      {item}
                    </p>
                  );
                })}
              </div>
            )}
            <div className="flex-1 space-y-4 py-10">{chatResponse}</div>
            <div className=" flex-center-between w-full rounded-full border-2 border-gray-400 px-4 py-2">
              <input
                value={input}
                onChange={(e) => setinput(e.target.value)}
                onKeyDown={handleEnter}
                type="text"
                className="bg-transparent focus:outline-none active:outline-none"
                placeholder="Ask a question..."
              />

              <IoMdSend
                onClick={handleButtonClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div> : 
        <div
          className={`chat bottom-0 left-0 right-0 top-0 flex flex-col bg-black p-8 max-md:fixed md:hidden ${showMobileChat ? "z-10" : ""}`}
        >
          <div className="sticky top-5  flex h-[95vh] flex-col">
            <CgClose
              className="absolute right-5 z-50 cursor-pointer text-xl md:hidden"
              onClick={() => setshowMobileChat(!showMobileChat)}
            />
            <h2 className="text-xl font-semibold ">Ask Expert</h2>
            {!chatResponse && (
              <div className="flex-1 space-y-4 py-10">
                {response.map((item, index) => {
                  return (
                    <p key={index} className="italic text-gray-400">
                      {item}
                    </p>
                  );
                })}
              </div>
            )}
            <div className="flex-1 space-y-4 py-10">{chatResponse}</div>
            <div className=" flex-center-between w-full rounded-full border-2 border-gray-400 px-4 py-2">
              <input
                value={input}
                onChange={(e) => setinput(e.target.value)}
                onKeyDown={handleEnter}
                type="text"
                className="bg-transparent focus:outline-none active:outline-none"
                placeholder="Ask a question..."
              />

              <IoMdSend
                onClick={handleButtonClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Chat
