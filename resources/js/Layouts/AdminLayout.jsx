import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
    const user = usePage().props.auth.user;
    const currentRoute = route().current();
    const flash = usePage().props.flash;
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), active: currentRoute === 'admin.dashboard' },
        { name: 'Manage Kategori', href: route('admin.kategori.index'), active: currentRoute?.startsWith('admin.kategori') },
        { name: 'Manage Products', href: route('admin.menu.index'), active: currentRoute?.startsWith('admin.menu') },
        { name: 'Manage Promo', href: route('admin.promo.index'), active: currentRoute?.startsWith('admin.promo') },
        { name: 'Manage Orders', href: '#', active: false },
        { name: 'Manage FAQ', href: route('admin.faq.index'), active: currentRoute?.startsWith('admin.faq') },
        { name: 'Manage Users', href: '#', active: false },
    ];

    return (
        <div className="min-h-screen bg-base flex font-sans relative">
            {/* Flash Message Toast */}
            {showFlash && (flash.success || flash.error) && (
                <div className={`fixed top-4 right-8 z-50 px-6 py-3 rounded-xl shadow-lg border text-sm font-medium transition-opacity duration-300 ${
                    flash.success ? 'bg-[#EDF2EC] text-success border-success/20' : 'bg-[#FBEBE7] text-accent-promo border-accent-promo/20'
                }`}>
                    {flash.success || flash.error}
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-base border-r border-[#EAE3DB] flex flex-col hidden md:flex">
                <div className="p-6">
                    <Link href="/">
                        <h1 className="font-serif text-2xl text-primary-base font-bold tracking-tight">Alaka Admin</h1>
                    </Link>
                </div>
                
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm rounded-xl transition-colors ${
                                item.active 
                                    ? 'bg-primary-light/15 text-primary-base font-bold' 
                                    : 'text-text-muted hover:bg-primary-light/5 hover:text-primary-base font-medium'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#EAE3DB]">
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center px-4 py-3 text-sm text-text-muted hover:bg-primary-light/5 hover:text-primary-base font-medium rounded-xl transition-colors"
                    >
                        Profile
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex text-left items-center px-4 py-3 text-sm text-accent-promo hover:bg-accent-promo/10 font-medium rounded-xl transition-colors mt-1"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#FAF8F5]">
                {/* Topbar */}
                <header className="h-16 border-b border-[#EAE3DB] bg-surface flex items-center justify-between px-8">
                    <h2 className="text-xl font-serif text-text-main font-semibold">Admin Panel</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-text-main">{user.name}</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-semibold text-primary-base hover:text-primary-dark transition-colors"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
