/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY! ;

const genAI = new GoogleGenerativeAI("AIzaSyCs3ewwjg6HfeereBUBrWsqfNnH9_a6NPA");

export const textTotext =async (inp: string) =>{
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(inp);
  const response =result.response;
  const text: string = response.text();

//   setresponse(text);
  return text
}