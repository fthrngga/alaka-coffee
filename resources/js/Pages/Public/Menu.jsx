import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import MenuCard from '@/Components/MenuCard';

export default function Menu({ kategori, menus }) {
    const [activeKat, setActiveKat] = useState('all');

    const filteredMenus = activeKat === 'all' 
        ? menus 
        : menus.filter(m => m.id_kategori === activeKat);

    return (
        <PublicLayout>
            <Head title="Our Menu" />
            
            <div className="bg-primary-base py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Menu</h1>
                    <p className="text-white/80 max-w-2xl mx-auto">Jelajahi berbagai pilihan kopi premium dan camilan lezat yang kami sajikan khusus untuk Anda.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveKat('all')}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            activeKat === 'all' 
                                ? 'bg-primary-base text-white shadow-md' 
                                : 'bg-white border border-[#EAE3DB] text-text-muted hover:border-primary-base hover:text-primary-base'
                        }`}
                    >
                        Semua Menu
                    </button>
                    {kategori.map((kat) => (
                        <button
                            key={kat.id}
                            onClick={() => setActiveKat(kat.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                activeKat === kat.id 
                                    ? 'bg-primary-base text-white shadow-md' 
                                    : 'bg-white border border-[#EAE3DB] text-text-muted hover:border-primary-base hover:text-primary-base'
                            }`}
                        >
                            {kat.nama_kategori}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredMenus.map((menu) => (
                        <MenuCard key={menu.id} item={menu} />
                    ))}
                </div>
                
                {filteredMenus.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg text-text-muted">Tidak ada menu yang tersedia untuk kategori ini.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
