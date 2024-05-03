import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import content from '~/config/content';
import Button from '../ui/Button';

const Footer = () => {
    const { header } = content.home;
    
    return (
        <footer className='absolute-h-center z-10 bg-white mt-3 md:md-5 lg:mt-8 w-responsive rounded-full p-2 flex-center-between pb-14'>
            <div className="flex-center gap-4 font-semibold text-lg">
                <Image src={"/logo.svg"} alt='logo' width={40} height={40} />
                {header.title}
            </div>
            <ul className='max-md:hidden flex-center gap-8'>
                {header.links.map((link, index) => (
                    <Link key={link.id} className={`text-black/40 hover:cursor-pointer font-semibold`} href={link.url} rel="noreferrer">{link.title}</Link>
                ))}
            </ul>
        </footer>
    )
}

export default Footer
