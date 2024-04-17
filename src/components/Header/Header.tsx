/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'
import content from '~/config/content'


const Header = () => {
   const { header } = content.home; 
    
    return (
        <nav className='absolute-h-center mt-3 md:md-5 lg:mt-8 w-responsive rounded-full p-2 flex-center-between'>
            <div className="flex-center gap-4 font-semibold text-lg">
                <Image src={"/logo.svg"} alt='logo' width={40} height={40} />
                {header.title}
            </div>
            <ul className='max-md:hidden flex-center gap-8'>
                {header.links.map((link, index) => (
                    <li key={link.id}>
                        <Link href={link.url} target="_blank" rel="noreferrer">{link.title}</Link>
                    </li>
                ))}
            </ul>
            <Button className='flex-center gap-5'>
                {header.button.title}
            </Button>
        </nav>
    )
}

export default Header
