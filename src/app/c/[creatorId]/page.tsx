import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import VidGallery from "~/components/Gallery/VidGallery";
import { getUser } from "~/lib/helpers/transcript";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/schema";

export default async function Page({
  params,
}: {
  params: {
    creatorId: string;
  };
}) {
  // channel of creator
  const user = await getUser(params.creatorId);
 
  if(!user) {
    return redirect("/")
  }
  console.log(user)
  const allVids = await db
    .select()
    .from(transcriptions)
    .where(eq(transcriptions.userId, params.creatorId));
  return (
    <main className="min-h-screen bg-black py-5">
      <div className="mx-auto w-[90%] max-w-6xl pt-5 space-y-4">
        <div className="border-b-2 flex gap-4 items-center pb-4">
            <div>
                {
                    user.image ? 
                    <Image
                    src={user.image}
                    alt="Creator Image"
                    width={100}
                    height={100}
                    className="rounded-full"
                    /> : 
                    <MdAccountCircle className="text-6xl text-white" />
                }
            </div>
            <div className="text-white">
                <h1>{user.name}</h1>
                {/* <p>{user.}</p> */}
            </div>
        </div>
        <VidGallery videos={allVids} creator={params.creatorId} className="xl:grid-cols-4" />
      </div>
    </main>
  );
}