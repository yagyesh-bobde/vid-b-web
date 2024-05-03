import React from 'react'
import fetchTranscript from '~/lib/helpers/transcript';

const page = async () => {
    const res = await fetchTranscript("WIeJF3kL5ng");
    console.log(res)
    
    return (
        <div>
            {
                res.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.text}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default page;
