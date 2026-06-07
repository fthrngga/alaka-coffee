import { Link } from '@inertiajs/react';
import { formatRupiah } from '@/utils/formatters';

export default function MenuCard({ item }) {
    return (
        <div className="bg-surface rounded-2xl border border-[#EAE3DB] overflow-hidden group hover:shadow-[0_10px_20px_rgba(92,61,46,0.08)] transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                    src={`/storage/${item.gambar}`} 
                    alt={item.nama_menu} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF8F5]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-base">
                        {item.kategori?.nama_kategori}
                    </span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-text-main mb-2 line-clamp-1">{item.nama_menu}</h3>
                <p className="text-text-muted text-sm line-clamp-2 mb-4 flex-1">
                    {item.deskripsi}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-sans font-bold text-lg text-primary-base">
                        {formatRupiah(item.harga)}
                    </span>
                    <button 
                        onClick={() => alert('Fitur Keranjang dalam pengembangan')}
                        className="w-10 h-10 rounded-full bg-primary-base text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
