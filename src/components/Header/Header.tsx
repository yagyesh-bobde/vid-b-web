/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'
import content from '~/config/content'


const Header = () => {
   const { header } = content.home; 
    
    return (
        <nav className='absolute-h-center z-10 bg-white mt-3 md:md-5 lg:mt-8 w-responsive rounded-full p-2 flex-center-between'>
            <div className="flex-center gap-4 font-semibold text-lg">
                <Image src={"/logo.svg"} alt='logo' width={40} height={40} />
                {header.title}
            </div>
            <ul className='max-md:hidden flex-center gap-8'>
                {header.links.map((link, index) => (
                    <Link key={link.id} className={`${link.active ? 'text-black' : 'text-black/40'} hover:cursor-pointer font-semibold`} href={link.url} rel="noreferrer">{link.title}</Link>
                ))}
            </ul>
            <Button className='flex-center gap-5'>
                <Link href="/video/1">
                {header.button.title}
                </Link>
            </Button>
        </nav>
    )
}

export default Header;
