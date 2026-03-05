import React from 'react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkUser } from '@/api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, updateUser, setVerified, clearUser } from '@/redux/userSlice';
import { logoutUser } from '@/api/auth';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [isDark, setIsDark] = useState(() => {
        try {
            return localStorage.getItem('theme') === 'dark'
        } catch {
            return false
        }
    })

    const handleLogout = async () => {
      try {
        await logoutUser();
        dispatch(clearUser());
        window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    useEffect(() => {
        const verify = async () => {
            const userData = await checkUser() || null;
            const full = userData?.user || userData;
            if (full) {
                dispatch(setUser(full));
                dispatch(setVerified(full.isVerified));
            } else {
                dispatch(clearUser());
            }
        };

        verify();
    }, [dispatch]);

    useEffect(() => {
        const root = document.documentElement
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light')
        } catch { }
    }, [isDark])

    return (
        <nav className='bg-secondary border-b border-border shadow-sm w-screen overflow-x-hidden '>
            <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden'>
                <div className='flex justify-between items-center h-16'>
                    <div className='shrink-0 font-bold text-2xl text-foreground'>
                        <Link to="/" className='hover:text-primary transition-colors'>
                            Auth-Sys
                        </Link>
                    </div>

                    <ul className='hidden md:flex gap-8'>
                        <li><Link to="/" className='text-foreground hover:text-primary transition-colors'>Home</Link></li>
                        <li><Link to="/about" className='text-foreground hover:text-primary transition-colors'>About</Link></li>
                        <li><Link to="/contact" className='text-foreground hover:text-primary transition-colors'>Contact</Link></li>
                    </ul>


                    <div className='flex items-center gap-4'>
                        <div className="register-btns hidden md:flex gap-3.5">
                            {user ? (
                                <div className='flex items-center justify-center gap-8'>
                                    <span className='text-foreground'>Welcome, {user.username}</span>
                                    <Button onClick={handleLogout} variant="outline">
                                        Logout
                                    </Button>
                                </div>
                            ) :
                                <>
                                    <Link to="/signup">
                                        <Button variant="outline">
                                            Signup
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="outline">
                                            Login
                                        </Button>
                                    </Link>
                                </>
                            }
                        </div>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className='cursor-pointer p-2 rounded-md hover:bg-accent transition-colors'
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='md:hidden p-2 rounded-md hover:bg-accent'
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-3">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        {/* 🔥 Mobile Auth Buttons */}
                        <div className="flex flex-col gap-2 px-3">
                            {user ? (
                                <>
                                    <Button onClick={handleLogout} className="w-full" variant="outline">
                                        Logout
                                    </Button>
                                    <span className="text-foreground font-medium">
                                        Welcome, {user.username}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full" variant="outline">
                                            Signup
                                        </Button>
                                    </Link>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full" variant="outline">
                                            Login
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav >
    )
}

export default Navbar;