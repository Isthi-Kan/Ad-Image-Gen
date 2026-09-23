import { DollarSignIcon, FolderEditIcon, GalleryHorizontalEnd, MenuIcon, SparkleIcon, XIcon } from 'lucide-react';
import { GhostButton, PrimaryButton } from './Buttons';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton, useAuth } from '@clerk/react';
import api from '../configs/axios';
import { toast } from 'react-hot-toast';

export default function Navbar() {

    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn, openSignUp } = useClerk();

    const [isOpen, setIsOpen] = useState(false);

    const [credits, setCredits] = useState(0);
    const { pathname } = useLocation();
    const { getToken } = useAuth();

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Create', href: '/generate' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    const getUserCredits = async () => {
        try {
            const token = await getToken();
            const {data} = await api.get('/api/user/credits', {
                headers: {
                    Authorization: `Bearer ${token}`}});
            setCredits(data.credits);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message)
            console.log(error);
            
        }
    };

    useEffect(() => {
        if (user) {
            (async () => await getUserCredits())();
        }
    }, [user, pathname]);

    return (
        <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between backdrop-blur-xl border rounded-2xl p-3.5 bg-emerald-950/35 border-emerald-400/10">
                <Link to='/' onClick={() => scrollTo(0, 0)}>
                    <img src={assets.logo1} alt="logo" className="h-10" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-100/80">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            onClick={() => scrollTo(0, 0)}
                            to={link.href}
                            className="hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className='flex items-center gap-3 sm:gap-4'>
                    {!user ? (
                        <div className='hidden md:flex items-center gap-3'>
                            <button onClick={() => openSignIn()} className="text-sm font-medium transition-colors max-sm:hidden text-emerald-100/80 hover:text-white">
                                Sign in
                            </button>
                            <PrimaryButton onClick={() => openSignUp()} className='max-sm:text-xs hidden sm:inline-block'>Get Started</PrimaryButton>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 sm:gap-3'>
                            <GhostButton
                                onClick={() => navigate('/plans')}
                                className='border-none text-emerald-100 hover:text-white bg-emerald-950/20 hover:bg-emerald-900/30 text-xs sm:text-sm px-2.5 py-1.5 flex items-center gap-1.5 transition-all'
                            >
                                <SparkleIcon size={13} className="text-emerald-400 fill-emerald-400/10 animate-pulse" />
                                <span>Credits: {credits}</span>
                            </GhostButton>
                            <div className="flex items-center">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "size-8 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-200"
                                        }
                                    }}
                                >
                                    <UserButton.MenuItems>
                                        <UserButton.Action label='Generate' labelIcon={<SparkleIcon size={14} />} onClick={() => navigate('/generate')} />

                                        <UserButton.Action label='My Generations' labelIcon={<FolderEditIcon size={14} />} onClick={() => navigate('/my-generations')} />

                                        <UserButton.Action label='Community' labelIcon={<GalleryHorizontalEnd size={14} />} onClick={() => navigate('/community')} />

                                        <UserButton.Action label='Plans' labelIcon={<DollarSignIcon size={14} />} onClick={() => navigate('/plans')} />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </div>
                        </div>
                    )}

                    {!user && <div className="flex items-center md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className='text-emerald-100 hover:text-white transition-colors p-1'>
                            <MenuIcon className='size-6' />
                        </button>
                    </div>}
                </div>
            </div>
            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 backdrop-blur-md z-50 transition-all duration-300 bg-[#020403]/75 text-emerald-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </a>
                ))}

                <button onClick={() => {setIsOpen(false); openSignIn()}} className="font-medium transition-colors text-emerald-100/80 hover:text-white">
                    Sign in
                </button>
                <PrimaryButton onClick={() => {setIsOpen(false); openSignUp()}}>Get Started</PrimaryButton>

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-[#7CFF4D] p-2 text-black ring-[#7CFF4D] active:ring-2"
                >
                    <XIcon />
                </button>
            </div>
        </motion.nav>
    );
};