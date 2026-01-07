"use client"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "motion/react";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk, useUser } from '@clerk/nextjs'

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Pricing', href: "/pricing" },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
] as const;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { openSignIn } = useClerk();
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    const pendingRedirectRef = useRef<string | null>(null);

    const getCookieValue = (name: string) => {
        const cookie = `; ${document.cookie}`;
        const parts = cookie.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() ?? null;
        }
        return null;
    };

    const clearCookie = (name: string) => {
        document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
    };

    const handleProtectedNav = (e: React.MouseEvent, href: string, closeMobileMenu?: boolean) => {
        const isProtected = href.startsWith('/tools') || href.startsWith('/user-dashboard') || href.startsWith('/account');
        if (!isProtected) {
            if (closeMobileMenu) {
                setIsOpen(false);
            }
            return;
        }

        if (!isLoaded) {
            e.preventDefault();
            return;
        }

        if (!isSignedIn) {
            e.preventDefault();

            try {
                sessionStorage.setItem('postLoginRedirect', href);
            } catch {
                // ignore
            }

            openSignIn({
                afterSignInUrl: href,
                afterSignUpUrl: href,
            });

            if (closeMobileMenu) {
                setIsOpen(false);
            }
            return;
        }

        if (closeMobileMenu) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const showLoginCookie = getCookieValue("showLogin") === "true";
        const redirectCookie = getCookieValue("postLoginRedirect");

        const urlParams = new URLSearchParams(window.location.search);
        const showLoginQuery = urlParams.get("login") === "true";
        const redirectQuery = urlParams.get("redirect");

        if (!showLoginCookie && !showLoginQuery) {
            return;
        }

        const destination = (() => {
            if (redirectCookie) {
                return decodeURIComponent(redirectCookie);
            }
            if (redirectQuery) {
                return redirectQuery;
            }
            return "/";
        })();

        // Clean URL immediately.
        router.replace("/");

        // Clear cookies ASAP so refreshes don't retrigger.
        clearCookie("showLogin");
        clearCookie("postLoginRedirect");

        try {
            sessionStorage.setItem("postLoginRedirect", destination);
        } catch {
            // ignore
        }

        if (!isSignedIn) {
            pendingRedirectRef.current = destination;
            openSignIn({
                afterSignInUrl: destination,
                afterSignUpUrl: destination,
            });
            return;
        }

        router.replace(destination);
        router.refresh();
    }, [isLoaded, isSignedIn, openSignIn, router]);

    useEffect(() => {
        if (!isLoaded || !isSignedIn) {
            return;
        }

        try {
            const stored = sessionStorage.getItem("postLoginRedirect");
            if (stored) {
                sessionStorage.removeItem("postLoginRedirect");
                router.replace(stored);
                router.refresh();
                return;
            }
        } catch {
            // ignore
        }

        if (pendingRedirectRef.current) {
            const destination = pendingRedirectRef.current;
            pendingRedirectRef.current = null;
            router.replace(destination);
            router.refresh();
        }
    }, [isLoaded, isSignedIn, router]);

    const pillRef = useRef<HTMLDivElement | null>(null);
    const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const [isCompact, setIsCompact] = useState(false);
    const lastScrollY = useRef(0);

    const activeHref = (() => {
        if (!pathname) {
            return '/';
        }

        if (pathname === '/') {
            return '/';
        }

        // Match nested routes (e.g. /tools/qr-generator -> /tools)
        const prefixMatch = NAV_LINKS.find(link => link.href !== '/' && pathname.startsWith(link.href));
        return prefixMatch?.href ?? pathname;
    })();

    // Scroll Logic
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

    // Pill Animation Logic
    useEffect(() => {
        const activeIndex = NAV_LINKS.findIndex(link => link.href === activeHref);
        const element = linkRefs.current[activeIndex] ?? null;
        const pill = pillRef.current;
        if (!pill) {
            return;
        }

        if (activeIndex !== -1 && element) {
            pill.style.left = `${element.offsetLeft}px`;
            pill.style.width = `${element.offsetWidth}px`;
            pill.style.opacity = '1';
        } else {
            pill.style.opacity = '0';
        }
    }, [activeHref, isCompact]);

    return (
        <div className="fixed top-0 w-full z-50 transition-all duration-300">
            <nav className={`bg-gray-900 h-14 flex items-center px-6 shadow-md rounded-3xl mx-auto mt-5 justify-between transition-all duration-500 ease-in-out ${isCompact ? 'w-11/12 md:w-112.5' : 'w-11/12'}`}>
                
                {/* Logo */}
                <div>
                    <Image src="/logo.png" alt="OmniTools Logo" width={80} height={30} className='w-8' />
                </div>

                {/* Desktop Navigation */}
                <div className={`hidden md:flex relative items-center transition-all duration-300 ease-in-out ${isCompact ? 'w-0 opacity-0 overflow-hidden scale-95' : 'w-auto opacity-100 scale-100'}`}>
                    <div 
                        ref={pillRef}
                        className='absolute bg-[#02D67D] rounded-2xl transition-all duration-300 ease-in-out'
                        style={{ height: '32px', opacity: 0 }}
                    />
                    {NAV_LINKS.map((link, index) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            ref={el => { linkRefs.current[index] = el }}
                            onClick={(e) => handleProtectedNav(e, link.href)}
                            className={`mx-4 px-3 py-1.5 relative z-10 transition-colors duration-200 hover:cursor-pointer ${activeHref === link.href ? 'text-black font-bold' : 'text-gray-300 hover:text-[#079258]'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth Buttons */}
                <div className='hidden md:flex'>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-(--text-color) hover:bg-[#0B3A1E] hover:cursor-pointer text-black hover:text-white transition-all duration-200 px-4 py-2 rounded-full font-bold">
                            Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <div className='flex items-center space-x-4'>
                            <Link href="/user-dashboard" className="text-(--text-color) hover:text-(--para-color) font-semibold transition-all duration-200">
                                Dashboard
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>

                {/* Hamburger Icon */}
                <div className='block md:hidden'>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <RxCross1 size={28} className='text-white hover:cursor-pointer' onClick={() => setIsOpen(false)} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <RxHamburgerMenu size={28} className='text-white hover:cursor-pointer' onClick={() => setIsOpen(true)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu */}
                <div className={`absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden rounded-3xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            onClick={(e) => handleProtectedNav(e, link.href, true)}
                            className={`w-full text-center py-3 border-b border-gray-200 transition-all duration-200 hover:cursor-pointer ${activeHref === link.href ? 'bg-[#02D67D] text-black font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="w-full flex flex-col items-center py-4 gap-2">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className='w-11/12 px-4 py-2 bg-black text-white font-bold hover:bg-gray-800 rounded-full transition-all duration-200'>
                                    Log In / Sign Up
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <Link href="/user-dashboard" onClick={() => setIsOpen(false)} className='w-11/12 text-center px-4 py-2 bg-gray-100 text-black font-bold hover:bg-gray-200 rounded-full mb-2'>
                                Go to Dashboard
                            </Link>
                            <div className="mt-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar