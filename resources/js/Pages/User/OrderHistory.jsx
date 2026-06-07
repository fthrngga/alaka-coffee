import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';
import { formatRupiah } from '@/utils/formatters';

const Badge = ({ status }) => {
    const statusConfig = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
        diproses: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Diproses' },
        selesai: { bg: 'bg-green-100', text: 'text-green-800', label: 'Selesai' }
    };
    const current = statusConfig[status] || statusConfig.pending;
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${current.bg} ${current.text}`}>
            {current.label}
        </span>
    );
};

export default function OrderHistory({ orders }) {
    return (
        <PublicLayout>
            <Head title="Riwayat Pesanan" />
            
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-text-main">Riwayat Pesanan</h1>
                    <p className="text-text-muted mt-2">Daftar semua transaksi yang pernah Anda lakukan.</p>
                </div>

                {orders.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-text-muted mb-4">Anda belum pernah melakukan pesanan.</p>
                        <Link href={route('menu')} className="px-6 py-2 bg-primary-base text-white rounded-full font-semibold hover:bg-primary-dark transition-colors">
                            Mulai Belanja
                        </Link>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id} className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#EAE3DB] pb-4 mb-4 gap-4">
                                    <div>
                                        <p className="text-sm text-text-muted mb-1">
                                            {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <h3 className="font-bold text-text-main text-lg">Order #{order.id}</h3>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-2">
                                        <Badge status={order.status_pesanan} />
                                        <p className="font-serif font-bold text-primary-base text-xl">
                                            {formatRupiah(order.total_harga)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm text-text-main">Item Pesanan:</h4>
                                    {order.detail_pesanan.map((detail) => (
                                        <div key={detail.id} className="flex justify-between items-center bg-[#FAF8F5] p-3 rounded-lg">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden">
                                                    <img src={`/storage/${detail.menu.gambar}`} alt={detail.menu.nama_menu} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-text-main">{detail.menu.nama_menu}</p>
                                                    <p className="text-xs text-text-muted">{detail.qty} x {formatRupiah(detail.harga)}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-sm text-text-main">{formatRupiah(detail.subtotal)}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {order.catatan && (
                                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm border border-yellow-100">
                                        <span className="font-bold">Catatan:</span> {order.catatan}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
