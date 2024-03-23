"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import lensalogo from "../../../public/lensa-app-icon.png"
import { SignedIn, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
const Sidebar = () => {
    const pathname = usePathname()
    return (
        <aside className='sidebar'>
            <div className='flex size-full flex-col gap-4'>
                <Link href={"/"}
                className='sidebar-logo'>
                    <Image
                    src={lensalogo}
                    alt='lensa logo'
                    width={50}
                    height={50}
                    />
                    <span className='text-3xl font-semibold font-["poppins"]'>Lensa A.I</span>
                </Link>
                <nav className='sidebar-nav'>
                    <SignedIn>
                        <ul className='sidebar-nav_elements'>
                            {navLinks.slice(0, 6).map((link) =>{
                            const isActive = link.route == pathname
                            return(
                                <li key={link.route} className={`sidebar-nav_element group 
                                ${isActive ? "bg-black-gradient text-white" : "text-gray-700"}`}>
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
                        <ul className='sidebar-nav_elements'>
                            {navLinks.slice(6).map((link) =>{
                            const isActive = link.route == pathname
                            return(
                                <li key={link.route} className={`sidebar-nav_element group
                                ${isActive ? "bg-black-gradient text-white" : "text-gray-700"}`}>
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
                            <li className='flex-center cursor-pointer gap-2 p-4'>
                                <UserButton afterSignOutUrl='/' showName/>
                            </li>
                        </ul>
                    </SignedIn>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
