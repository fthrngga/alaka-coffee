import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
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
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${current.bg} ${current.text}`}>
            {current.label}
        </span>
    );
};

export default function ManageOrders({ orders }) {
    const handleStatusChange = (id, newStatus) => {
        router.patch(route('admin.orders.update', id), { status_pesanan: newStatus }, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Orders" />
            
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold text-text-main">Manage Orders</h1>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#FAF8F5] border-b border-[#EAE3DB] text-text-muted">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Order ID & Date</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Total & Items</th>
                                <th className="px-6 py-4 font-semibold">Metode & Bukti</th>
                                <th className="px-6 py-4 font-semibold">Status Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB]">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada pesanan masuk.
                                    </td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4 align-top">
                                        <div className="font-bold text-text-main">#{order.id}</div>
                                        <div className="text-xs text-text-muted mt-1">
                                            {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="font-semibold text-text-main">{order.user.name}</div>
                                        <div className="text-xs text-text-muted">{order.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="font-bold text-primary-base">{formatRupiah(order.total_harga)}</div>
                                        <div className="text-xs text-text-muted mt-1">{order.detail_pesanan.length} items</div>
                                        {order.catatan && (
                                            <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 p-2 rounded max-w-[200px]">
                                                Note: {order.catatan}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        {/* Handle both hasOne and hasMany array access for safety */}
                                        <div className="text-sm font-medium">
                                            {Array.isArray(order.pembayaran) ? order.pembayaran[0]?.metode_pembayaran : order.pembayaran?.metode_pembayaran || '-'}
                                        </div>
                                        {(Array.isArray(order.pembayaran) ? order.pembayaran[0]?.bukti_pembayaran : order.pembayaran?.bukti_pembayaran) && (
                                            <a 
                                                href={`/storage/${Array.isArray(order.pembayaran) ? order.pembayaran[0].bukti_pembayaran : order.pembayaran.bukti_pembayaran}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                Lihat Bukti ↗
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top space-y-2">
                                        <Badge status={order.status_pesanan} />
                                        <div className="mt-2">
                                            <select 
                                                className="text-xs border-[#EAE3DB] rounded focus:ring-primary-base focus:border-primary-base py-1 px-2 pr-6"
                                                value={order.status_pesanan}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="diproses">Diproses</option>
                                                <option value="selesai">Selesai</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminLayout>
    );
}
