import React from 'react'
import Title, { SubTitle } from '../ui/Title'
import content from '~/config/content'
import Image from 'next/image';
import Button from '../ui/Button';

const Hero = () => {
    const { hero } = content.home;
    
    return (
        <section className='relative min-h-screen pt-40 text-white space-y-5'>
            <Image
                src={"/images/hero/bg.png"} 
                alt='hero' 
                fill
                className='absolute top-0 left-0 w-full h-full -z-10'
            />
            
            
            <Title variant='xl' className=''>
                {hero.title[0]}
                <br/>
                {hero.title[1]}
            </Title>

            <SubTitle subTitleClass='xl:w-1/3 xl:mx-auto'>
                {hero.subtitle}
            </SubTitle>

            <div className="space-y-8">
                <Button variant='dark' className='mx-auto rounded-xl py-4 px-8'>
                {hero.button}
                </Button>

               <div className='space-y-20'>
                 <div className='grid place-content-center '>
                    <div className='relative flex-col-center-center gap-4'>
                    <Image 
                        src={"/icons/hero/arrow.svg"}
                        alt='arrow'
                        width={24}
                        height={30}
                        className='absolute max-lg:hidden top-0 left-2'
                    />
                    <Image 
                        src={"/images/hero/users.png"}
                        alt="users"
                        width={190}
                        height={20}
                        className=''
                    />
                    <p>
                        {hero.more}
                    </p>
                    </div>
                </div>
                <div className='w-responsive shadow-gray bg-white min-h-[50vh] rounded-xl shadow-t-xl'> </div>
               </div>
            </div>

        </section>
    )
}

export default Hero
