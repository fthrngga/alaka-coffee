import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About({ contact }) {
    return (
        <PublicLayout>
            <Head title="About Us" />
            
            <div className="bg-surface py-20 border-b border-[#EAE3DB]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-main mb-6">About Alaka Coffee</h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Mendedikasikan setiap proses dari biji hingga ke cangkir Anda, demi menciptakan rasa yang otentik dan momen yang berharga.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary-base mb-6">Our Story</h2>
                        <div className="space-y-4 text-text-muted leading-relaxed">
                            <p>
                                Berdiri sejak tahun 2023, Alaka Coffee lahir dari passion sederhana sekumpulan pecinta kopi yang bermimpi memiliki ruang hangat untuk semua orang. Nama "Alaka" diambil dari filosofi tentang kualitas tertinggi dan dedikasi penuh.
                            </p>
                            <p>
                                Kami percaya bahwa secangkir kopi bukan hanya sekadar minuman, melainkan media penghubung antar manusia, peneman saat bekerja, dan penghangat saat berkumpul bersama orang tersayang.
                            </p>
                            <p>
                                Biji kopi kami bersumber langsung dari petani lokal terbaik, dipanggang dengan tingkat ketelitian tinggi, dan disajikan oleh barista profesional kami yang siap memberikan senyuman di setiap cangkirnya.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop" alt="Coffee Making" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden mt-8">
                            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" alt="Cafe Interior" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {contact && (
                    <div className="mt-32 pt-16 border-t border-[#EAE3DB]">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-text-main mb-4">Contact & Location</h2>
                            <p className="text-text-muted">Kunjungi kedai kami atau hubungi kami untuk informasi lebih lanjut.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-surface p-8 rounded-2xl text-center border border-[#EAE3DB]">
                                <h3 className="font-bold text-primary-base mb-2">Address</h3>
                                <p className="text-text-muted text-sm">{contact.alamat}</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl text-center border border-[#EAE3DB]">
                                <h3 className="font-bold text-primary-base mb-2">Phone</h3>
                                <p className="text-text-muted text-sm">{contact.no_hp}</p>
                            </div>
                            <div className="bg-surface p-8 rounded-2xl text-center border border-[#EAE3DB]">
                                <h3 className="font-bold text-primary-base mb-2">Connect</h3>
                                <p className="text-text-muted text-sm">Email: {contact.email}</p>
                                <p className="text-text-muted text-sm">IG: {contact.instagram}</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary-light/10"></div>
                            <p className="text-primary-base font-bold font-serif text-xl">[Interactive Map Placeholder]</p>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
