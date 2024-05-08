import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const VidGallery = ({
  videos,
  className="",
  hideDetails = false,
  creator=""
}: {
  videos: {
    id: number | string | undefined;
    title: string | undefined;
    thumbnail: string | undefined;
    channelTitle: string | undefined;
    videoId: string | undefined;
  }[];
  className?: string;
  hideDetails?: boolean;
  creator?: string;
}) => {
  const blankImageUrl =
    "https://cdn.britannica.com/16/254816-050-41C9577A/Google-logo-Googleplex-headquarters-Mountain-View-California.jpg";

  return (
    <div
      className={`grid w-full grid-cols-1 gap-8 overflow-scroll sm:grid-cols-2 md:grid-cols-3 lg:max-h-[80vh] xl:grid-cols-4 ${className}`}
    >
      {[...videos, ...videos, ...videos, ...videos, ...videos, ...videos].map(
        (video, index) => (
          <VideoCard
            key={index}
            video={video}
            hideDetails={hideDetails}
            creator={creator}
          />
        ),
      )}
    </div>
  );
};


const VideoCard = ({
  video,
  hideDetails=false,
creator=""
}: {
  video: {
    id: number | string | undefined;
    title: string | undefined;
    thumbnail: string | undefined;
    channelTitle: string | undefined;
    videoId: string | undefined;
  };
  hideDetails?: boolean;
    creator?: string;
}) => {
  const blankImageUrl =
    "https://cdn.britannica.com/16/254816-050-41C9577A/Google-logo-Googleplex-headquarters-Mountain-View-California.jpg";

  return (
    <Link href={`/c/${creator}/vid/${video.videoId}`} className="relative flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-200 cursor-pointer hover:scale-105 duration-300">
      <Image
        src={blankImageUrl}
        alt={video.title ?? "na"}
        width={240}
        height={200}
        className={`w-full rounded-xl ${hideDetails ? "h-[180px]" : ""}`}
      />
      <div className={`${hideDetails ? "absolute bottom-0 left-0 p-2 w-full bg-white/50" : ""}`}>
        <h3 className='font-bold'>{video.title ?? "Video Title"}</h3>
        <p className='text-gray-600'>@{video.channelTitle ?? "Video Title"}</p>
      </div>
    </Link>
  );
};


export default VidGallery
