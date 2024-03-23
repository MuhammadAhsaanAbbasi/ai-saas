"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import lensalogo from "../../../../public/lensa-app-icon.png"
import Link from 'next/link'
import Image from 'next/image'
const MobileNav = () => {
    const pathname = usePathname()
    return (
        <header className='header'>
        <Link href={"/"}
                className='flex items-center gap-2 md:py-2'>
                    <Image
                    src={lensalogo}
                    alt='lensa logo'
                    width={60}
                    height={60}
                    />
                    <span className='text-3xl font-semibold font-["poppins"]'>Lensa A.I</span>
                </Link>
                <nav>
                    
                </nav>
        </header>
    )
}

export default MobileNav