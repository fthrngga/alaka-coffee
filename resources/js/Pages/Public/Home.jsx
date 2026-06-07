import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import MenuCard from '@/Components/MenuCard';

export default function Home({ favoriteMenus }) {
    return (
        <PublicLayout>
            <Head title="Welcome to Alaka Coffee" />
            
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-primary-base overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* Background image placeholder or pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                
                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Awaken Your Senses with <span className="text-accent-promo">Premium Coffee</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-sans mb-10 max-w-2xl mx-auto">
                        Nikmati racikan kopi artisanal terbaik yang dibuat dengan penuh gairah untuk menemani setiap momen berharga Anda.
                    </p>
                    <Link 
                        href={route('menu')} 
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary-base bg-white rounded-full hover:bg-surface hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Order Now
                    </Link>
                </div>
            </section>

            {/* Favorite Menu Section */}
            <section className="py-24 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-4">Our Favorites</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">Pilihan menu terfavorit yang selalu menjadi andalan pelanggan setia Alaka Coffee.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {favoriteMenus.map((menu) => (
                            <MenuCard key={menu.id} item={menu} />
                        ))}
                        {favoriteMenus.length === 0 && (
                            <div className="col-span-full text-center text-text-muted py-12">
                                Menu favorit belum tersedia.
                            </div>
                        )}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link href={route('menu')} className="inline-flex items-center font-bold text-primary-base hover:text-primary-dark transition-colors">
                            Lihat Semua Menu
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-24 bg-surface border-t border-[#EAE3DB]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="aspect-square rounded-3xl overflow-hidden bg-primary-light/20 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-primary-base/40 font-serif text-2xl font-bold">
                                    [Store Image Placeholder]
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-6">Cerita di Balik Secangkir Kopi</h2>
                            <p className="text-text-muted leading-relaxed mb-8">
                                Bermula dari kecintaan kami terhadap aroma biji kopi pilihan, Alaka Coffee didirikan dengan satu tujuan: menyajikan pengalaman menikmati kopi yang tak terlupakan. Setiap cangkir yang kami sajikan adalah hasil dedikasi dan keterampilan barista terbaik kami.
                            </p>
                            <Link 
                                href={route('about')} 
                                className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-primary-base rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
