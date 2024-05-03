import { YoutubeTranscript } from "youtube-transcript";

const fetchTranscript = async (id: string) => {
    const res = await YoutubeTranscript.fetchTranscript(id);
    console.log(res)
    // const json = await res.json();
    // console.log(json)
    return res
}

export default fetchTranscript;