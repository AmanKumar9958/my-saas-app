"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools'},
        { name: 'Pricing', href: "/pricing"},
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [isCompact, setIsCompact] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 20) {
                setIsCompact(false);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsCompact(true);
            } else if (currentScrollY < lastScrollY.current) {
                setIsCompact(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const activeIndex = navLinks.findIndex(link => link.href === pathname);
        if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
            const element = linkRefs.current[activeIndex];
            setPillStyle({
                left: element.offsetLeft,
                width: element.offsetWidth,
                opacity: 1
            });
        } else {
            setPillStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [pathname, isCompact]);

    return (
        <div className="fixed top-0 w-full z-50 transition-all duration-300">
            <nav className={`bg-gray-900 h-14 flex items-center px-6 shadow-md rounded-3xl mx-auto mt-5 justify-between transition-all duration-500 ease-in-out ${isCompact ? 'w-11/12 md:w-[450px]' : 'w-11/12'}`}>
                {/* logo */}
                <div>
                    <h1 className='text-2xl font-bold text-(--text-color)'>OmniTools</h1>
                </div>
                {/* desktop navigation links */}
                <div className={`hidden md:flex relative items-center transition-all duration-300 ease-in-out ${isCompact ? 'w-0 opacity-0 overflow-hidden scale-95' : 'w-auto opacity-100 scale-100'}`}>
                    <div 
                        className='absolute bg-[#02D67D] rounded-2xl transition-all duration-300 ease-in-out'
                        style={{ 
                            left: pillStyle.left, 
                            width: pillStyle.width, 
                            opacity: pillStyle.opacity,
                            height: '32px'
                        }}
                    />
                    {navLinks.map((link, index) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            ref={el => { linkRefs.current[index] = el }}
                            className={`mx-4 px-3 py-1.5 relative z-10 transition-colors duration-200 hover:cursor-pointer ${pathname === link.href ? 'text-black font-bold' : 'text-(--text-color) hover:text-[#079258]'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                {/* Buttons */}
                <div className='hidden md:flex'>
                    <button className='mx-2 px-4 py-2 bg-[#02DF82] text-[#063128] font-bold hover:bg-[#063128] hover:text-[#02DF82] rounded-4xl transition-all duration-200 hover:cursor-pointer'>Login</button>
                    <button className='mx-2 px-4 py-2 text-[#02DF82] rounded-4xl font-bold hover:bg-[#02df82] hover:text-[#063128] transition-all duration-200 hover:cursor-pointer'>Sign Up</button>
                </div>

                {/* hamburger icon */}
                <div className='block md:hidden'>
                    <RxHamburgerMenu 
                        className='text-(--text-color) hover:text-gray-900 transition-all duration-200 hover:cursor-pointer font-extrabold text-2xl'
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>

                {/* mobile menu */}
                <div className={`absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden rounded-3xl overflow-hidden transition-all duration-300 ease-in-out z-999 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                    <Link href='/' className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${pathname === '/' ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>Home</Link>
                    <Link href='/tools' className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${pathname === '/tools' ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>Tools</Link>
                    <Link href='/tools' className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${pathname === '/pricing' ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>Pricing</Link>
                    <Link href='/about' className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${pathname === '/about' ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>About</Link>
                    <Link href='/contact' className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${pathname === '/contact' ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>Contact</Link>
                    <button className='w-11/12 my-2 px-4 py-2 bg-black text-white font-bold hover:bg-gray-800 rounded-4xl transition-all duration-200 hover:cursor-pointer'>Login</button>
                    <button className='w-11/12 my-2 px-4 py-2 text-black rounded-4xl font-bold hover:bg-gray-200 transition-all duration-200 hover:cursor-pointer'>Sign Up</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar