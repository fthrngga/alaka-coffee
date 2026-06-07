import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: route('home') },
        { name: 'About Us', href: route('about') },
        { name: 'Our Menu', href: route('menu') },
        { name: 'FAQ', href: route('faq') },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#FAF8F5]">
            {/* Navbar */}
            <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link href={route('home')} className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-bold text-primary-base tracking-tight">Alaka Coffee.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="text-sm font-medium text-text-main hover:text-primary-base transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth/Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link href="#" onClick={(e) => { e.preventDefault(); alert('Keranjang dalam pengembangan'); }} className="p-2 text-text-main hover:text-primary-base transition-colors relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent-promo rounded-full"></span>
                                </Link>
                                <Link 
                                    href={user.role === 'admin' ? route('admin.dashboard') : route('dashboard.user')}
                                    className="px-5 py-2.5 bg-primary-base text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
                                >
                                    My Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-semibold text-primary-base hover:text-primary-dark transition-colors px-4 py-2">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="px-5 py-2.5 bg-primary-base text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-text-main"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-surface border-t border-[#EAE3DB] shadow-lg py-4 px-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="text-base font-medium text-text-main py-2 border-b border-[#EAE3DB]/50"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link href={user.role === 'admin' ? route('admin.dashboard') : route('dashboard.user')} className="text-base font-medium text-primary-base py-2">
                                        My Profile
                                    </Link>
                                    <Link href="#" onClick={(e) => { e.preventDefault(); alert('Keranjang dalam pengembangan'); }} className="text-base font-medium text-text-main py-2">
                                        Cart
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-base font-medium text-primary-base py-2">Log in</Link>
                                    <Link href={route('register')} className="text-base font-medium text-text-main py-2">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 mt-[88px]">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-primary-dark text-white pt-16 pb-8 px-6 md:px-12 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-serif text-3xl font-bold mb-4">Alaka Coffee.</h3>
                        <p className="text-white/80 max-w-sm font-sans leading-relaxed text-sm">
                            Menyajikan kopi kualitas premium dengan sentuhan artisanal untuk menemani setiap momen terbaik Anda.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-serif font-semibold text-lg mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white/80 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
                    <p>&copy; {new Date().getFullYear()} Alaka Coffee. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
