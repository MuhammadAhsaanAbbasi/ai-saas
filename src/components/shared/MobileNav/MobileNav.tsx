"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import lensalogo from "../../../../public/lensa-app-icon.png"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { navLinks } from '@/constants'
import { Button } from '@/components/ui/button'

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
            <nav className='flex gap-2'>
                <SignedIn>
                    <UserButton afterSignOutUrl='/' />
                    <Sheet>
                        <SheetTrigger>
                            <Menu width={32} height={32} className='cursor-pointer' />
                        </SheetTrigger>
                        <SheetContent className='sheet-content sm:w-64'>
                            <Image
                            src={lensalogo}
                            alt='lensa'
                            width={40}
                            height={40}
                            />
                            <ul className='header-nav_elements'>
                            {navLinks.map((link) =>{
                            const isActive = link.route == pathname
                            return(
                                <li key={link.route} className={`
                                ${isActive && "gradient-text"} p-18 flex whitespace-nowrap text-dark-700`}>
                                    <Link href={link.route}
                                    className="sidebar-link">
                                    <Image
                                    src={link.icon}
                                    alt='lensa route icons'
                                    width={22}
                                    height={22}
                                    className={`${isActive && "brightness-125"}`}
                                    />
                                        {link.label}
                                    </Link>
                                </li>
                            )
                            })}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
                <SignedOut>
                <Button asChild className='button bg-black-gradient bg-cover'>
                        <SignInButton/>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    )
}

export default MobileNav