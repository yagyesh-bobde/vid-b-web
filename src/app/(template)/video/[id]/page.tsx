
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
  const transcript =
    "Oh this music go.<br><br>Hello.<br><br>Hello, Miss. Richardson.<br><br>Yeah.<br><br>Oh man, this is Paul.<br><br>I am a realtor.<br><br>Hey, we just helped the neighbor out over on Amanda Michelle sell their property for 287,000 dollars.<br><br>It was a 2200 square foot home.<br><br>We had multiple offers.<br><br>So I was reaching out to all the neighbors see who else you might know looking to move into this part of town.<br><br>Oh gosh, I really appreciate you thinking about it.<br><br>You still over on Palomino Farm weigh yourself?<br><br>You have been there.<br><br>Yeah, yeah, that's okay.<br><br>Yeah.<br><br>No.<br><br>Listen.<br><br>We're just trying to help enable outside totally.<br><br>Appreciate it.<br><br>Just by chance any what plans maybe you had to consider moving this year?<br><br>All right.<br><br>Well, hey Miss. Richardson.<br><br>Thank you so much for your time.<br><br>You have a great day.<br><br>Thank you.<br><br>Bye.<br><br>Fine, though.<br><br>You see how I recovered it.<br><br>She was happy when the call was over.<br><br>She was fine.<br><br>Yeah.<br><br>When you get weird, they're weird when they get weird, and you're weird, it's weird like when they're weird, you got to get not weird.<br><br>Did that make sense?<br><br>You gotta have to be cool like you're the cool person.<br><br>Remember, I just want to have a good conversation.<br><br>That's the only thing that I want to do.<br><br>Have a good conversation.<br><br>That's all I care about.<br><br>Where's Tony, Tony?<br><br>He's been around.<br><br>Fall off the wagon what happened to him?<br><br>Hello.<br><br>This is Paul.<br><br>I am a real estate agent.<br><br>I was calling all the Neighbors in the area.<br><br>We'd helped the neighbor out sell the property just recently but, you know live off of palomino Farm weigh yourself by chance.<br><br>Okay, y'all good.<br><br>Yeah, this was over on Amanda Michelle.<br><br>We sold the property 2200 square feet for 287 and we had multiple offers.<br><br>So I was calling all the neighbors to see maybe who you knew that like to move into the area.<br><br>I the only is not here.<br><br>Okay, no worries.<br><br>You don't know anybody either looking to move into this part of town.<br><br>Oh you don't live here.<br><br>You said you're looking for a house right now?<br><br>Oh, okay.<br><br>Well, hey, you never know.<br><br>When did you look into it already, or you were you're wanting to do that?<br><br>No, cuz I just move to Vegas.<br><br>Oh, yeah.<br><br>Nice.<br><br>Oh, cool.<br><br>Where did you move from?<br><br>Here.<br><br>Oh, I am from New York.<br><br>What part?<br><br>Let me guess Bronx.<br><br>You know how I know that.<br><br>Because I am from Queen's.<br><br>For real so I know my people so, and I know exactly where that I can take up.<br><br>Even the little one even the little bit to tell where they're from Long Island Bronx, whatever.<br><br>So how you like it out here?<br><br>Yeah, it's not yet.<br><br>I know it's A persistent.<br><br>Yeah you did you just move out here like you have been here a little bit already?<br><br>Oh, okay.<br><br>So you went through the summer and everything?<br><br>So that's cool.<br><br>You working out.<br><br>Are you looking for work or what's going on?<br><br>Good.<br><br>So you plan on staying here longer term or you going to test it out?<br><br>Yeah, well a lot more affordable than New York.<br><br>That's for sure.<br><br>Yeah, well, that I am sorry.<br><br>My name is Paul.<br><br>What's your name?<br><br>Taisha okay Taisha.<br><br>So what do you think has to happen for you to consider getting your own home?<br><br>Because you could have a mortgage payment for less than your paying rent.<br><br>Did you know that?<br><br>Yeah, I know that.<br><br>Right Yeah, well, hey, you never know.<br><br>Maybe I will just stay in touch every now and again and see if there's some way to maybe help you in the future.<br><br>You never know.<br><br>Okay, cool.<br><br>What how do you spell Taisha?<br><br>And why?<br><br>C an i c s h a got it.<br><br>Okay.<br><br>All right, cool.<br><br>All right.<br><br>Listen, my name is Paul.<br><br>I am with Keller Williams.<br><br>I appreciate your time and I will touch base every now and again, maybe there's something we can do for you in the future.<br><br>You guys ask New York people we got to look out for each other.<br><br>Yeah.<br><br>All right.<br><br>All right.<br><br>Take care, girl.<br><br>Have a good day.<br><br>Was that I am 41?<br><br>How old are you?<br><br>Too young for me.<br><br>Oh Hi girl.<br><br>Take care.<br><br>All right.<br><br>Bye.<br><br>Was that was she checking me out?<br><br>Okay, wrong number into the database.<br><br>I didn't get a reaction.<br><br>I got her email.<br><br>I will text you back for her and email.<br><br>Because I What?<br><br>The selfie right with a New York Hat on.<br><br>Hello.<br><br>This is prior Ms. Prior.<br><br>Yeah, yeah almost prior.<br><br>This is Paul.<br><br>I am a real estate agent.<br><br>I was helping one of your neighbor's out over on Amanda, Michelle.<br><br>And we had multiple offers on that property so for $287,000 dollars.<br><br>The we had a few different people still looking.<br><br>Hey by chance, I was talking all the neighbors who do you know looking at moving into this part of town?<br><br>Sorry.<br><br>What are you calling from?<br><br>I am a real estate agent, and we sold a house in the area.<br><br>And we still had buyers.<br><br>Okay.<br><br>Yeah.<br><br>All good.<br><br>No, I wasn't calling for that.<br><br>I was wondering who you might know looking to buy in this part of town because we still had buyers looking.<br><br>But I don't know.<br><br>Oh 10 minutes.<br><br>Okay, that's okay.<br><br>I appreciate it.<br><br>You still you're in the area though, right Peyton Stewart Court.<br><br>You have been in that part of town.<br><br>Yeah.<br><br>Oh nice.<br><br>How long you been there?<br><br>And since 2011, okay, so not too long.<br><br>You guys were already in Las Vegas, or did you come from another part?<br><br>Of the country I don't think I am supposed to tell you.<br><br>Oh, no.<br><br>Listen.<br><br>We're just trying to help a neighbor.<br><br>I totally appreciate it.<br><br>Thank you so much doll.<br><br>So no plans on you guys considering moving this year, or it's coming up.<br><br>So with the Bronx girl, like that's why I just have to keep looking for inches to continue a good conversation and then see what falls out.<br><br>She's not a good candidate.<br><br>But I mean if she's in my database I touch base with her recorder.<br><br>I send her my information.<br><br>I have a good conversation like I have Hello.<br><br>Hello, Ron.<br><br>Yeah, Oh Hey Ron, this is Paul.<br><br>My real estate agent.<br><br>Hey, I was helping out a neighbor over on Amanda Michelle.<br><br>We just sold their property a few days ago 2200 square feet for 280 that interested.<br><br>Oh, no, no good.<br><br>I wasn't calling to see if you were interested.<br><br>I was wondering who you might know looking to move into the area?<br><br>We still have a few buyers looking.<br><br>Oh.<br><br>God all right, Hey.<br><br>Listen, we're on I really appreciate it.<br><br>You still over on Peyton Stewart yourself?<br><br>Okay.<br><br>Good been there well.<br><br>Hey, Ron, have a great day, buddy.<br><br>Just yep.<br><br>You just put daisy.<br><br>You want to get back to them, or you can Yeah, it's complicated to explain, but you can there are multiple ways to follow up with them.<br><br>So yeah, I use it as a CRM for prospecting.<br><br>Hello.<br><br>Hello, Mr. Draper.<br><br>No, I think you're the wrong number.<br><br>Oh, I am so sorry.<br><br>Yeah, we were trying to help a neighbor sell a property over on Amanda Michelle.<br><br>Did you have to live in eight nine zero eight one?<br><br>No.<br><br>Oh gosh.<br><br>Hey, I am real.<br><br>Sorry about that.<br><br>All right, great.<br><br>Hey, just by chance what plans did you have to consider hanging up on me today?<br><br>Thank you.<br><br>What's coming?<br><br>Let us try to sneak it in force you.<br><br>Hello.<br><br>Hello miss Robin bush.<br><br>Yeah.<br><br>Oh man, this is Paul.<br><br>I am a real estate agent.<br><br>Okay, I always checking in.<br><br>I just helped the neighbor in the area over on Amanda Michelle sell their property 2,200 square feet for 20087 thousand.<br><br>We had multiple offers and buyers still looking around.<br><br>I was calling all the neighbors who do you know by chance looking to move into this part of town?<br><br>How much most people that are just you know moved down?<br><br>I don't think that'd be so much.<br><br>Oh really?<br><br>Just move.<br><br>You're still over on Sagebrush Ranch.<br><br>Is that right?<br><br>Yeah.<br><br>Oh good.<br><br>How long you have been there?<br><br>Oh, okay.<br><br>So long time we already in Las Vegas.<br><br>Did you come from someplace else?<br><br>No kidding.<br><br>I am from the East Coast.<br><br>What part of Pennsylvania?<br><br>Oh, yeah.<br><br>Yeah.<br><br>Yeah a Little League World Series.<br><br>Yeah.<br><br>Yeah.<br><br>No, that's good.<br><br>Nice.<br><br>I like it out in Las Vegas.<br><br>We never Could move though where would you want to go next?<br><br>I don't think he know I don't blame me son.<br><br>No tax.<br><br>God bless you good for you.<br><br>All right.<br><br>Well, hey, you never know when you can help, so I just reach out and say hello.<br><br>I really appreciate your time, man.<br><br>No, okay.<br><br>All right.<br><br>You have a good day.<br><br>Let us go.";
  const [showMobileChat, setshowMobileChat] = useState(false);
  const [searchParams] = useSearchParams();
 
  
  const [id, setId] = useState("");

  useEffect(() => {
    // Get the URL path
    const path: string = window.location.pathname;
    // Split the path into parts using '/'
    const parts: string[] = path.split("/");
    // Get the last part which should be the id
    const lastPart = parts[parts.length - 1];
    // Set the id state
    setId(lastPart ?? "");

    submit()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);


  const submit = async () => {
    const res = await fetchTranscript("WIeJF3kL5ng");
    console.log(res)
  }
  return (
    <div className="flex h-full w-screen  bg-black text-white">
      <div className="video flex h-full flex-col space-y-4  p-8 md:w-3/4">
        <h2 className="text-xl font-semibold">
          Video Title: A Sample Video Title
        </h2>
        {id && (
          <iframe
            width="420"
            height="315"
            className="h-1/2 min-h-[50vh] w-full"
            src={`https://www.youtube.com/embed/${id}`}
          ></iframe>
        )}
        <Transcript transcript={transcript} />
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
