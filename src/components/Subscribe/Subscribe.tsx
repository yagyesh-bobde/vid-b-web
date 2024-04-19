import React from 'react'
import Title, { SubTitle } from '../ui/Title'
import content from '~/config/content'
import Image from 'next/image'


const Subscribe = () => {
    const { subscribe } = content.home;
    
    
    return (
        <div className='relative w-responsive bg-[#F7F1FF] py-12 rounded-xl space-y-5 text-center'>
            {/* ICONS */}
            <Image src={"/icons/decorations/icon-1.svg"} alt="icon" width={60} height={60}  className="rounded-xl lg:left-10 absolute z-10" />
            <Image src={"/icons/decorations/icon-2.svg"} alt="icon" width={60} height={60}  className="rounded-xl lg:right-10 absolute z-10" />
            <Image src={"/icons/decorations/icon-3.svg"} alt="icon" width={60} height={60}  className="rounded-xl lg:bottom-10 lg:left-40 absolute z-10" />
            <Image src={"/icons/decorations/icon-4.svg"} alt="icon" width={60} height={60}  className="rounded-xl lg:bottom-10 lg:right-40 absolute z-10" />


            <h3 className='text-2xl font-bold '>
                {subscribe.title[0]}
                <br/>
                {subscribe.title[1]}
            </h3>
            <SubTitle subTitleClass='lg:w-1/2'>
                {subscribe.subtitle}
            </SubTitle>

            {/* form */}
            <div className="form-group lg:w-1/2 mx-auto flex-center gap-4">
                <input type="email" placeholder="Enter your email" className="p-3 rounded-xl w-[285px]" />
                <button className="bg-purple text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 duration-200">{subscribe.button}</button>
            </div>
        </div>
    )
}

export default Subscribe
