/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../ui/Button'
import content from '~/config/content'
import { auth } from '~/auth'



const Header = async () => {
  const session = await auth();
  if (session) {
    console.log(session)
  }
  const { header } = content.home;
  return (
    <nav className="absolute-h-center md:md-5 w-responsive flex-center-between z-10 mt-3 rounded-full bg-white p-2 lg:mt-8">
      <div className="flex-center gap-4 text-lg font-semibold">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        {header.title}
      </div>
      <ul className="flex-center gap-8 max-md:hidden">
        {header.links.map((link, index) => (
          <Link
            key={link.id}
            className={`${link.active ? "text-black" : "text-black/40"} font-semibold hover:cursor-pointer`}
            href={link.url}
            rel="noreferrer"
          >
            {link.title}
          </Link>
        ))}
      </ul>
      <Button className="flex-center gap-5">
        <Link href="/video/1">
          {true ? <span>{header.button.title}</span> : <span>Sign in</span>}
        </Link>
      </Button>
    </nav>
  );
};

export default Header;
