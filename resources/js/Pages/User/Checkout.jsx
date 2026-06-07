import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { formatRupiah } from '@/utils/formatters';

export default function Checkout({ cartItems, subtotal, diskon, total, appliedPromo }) {
    const { data, setData, post, processing, errors } = useForm({
        catatan: '',
        metode_pembayaran: 'Transfer BCA',
        bukti_pembayaran: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store'), {
            forceFormData: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Checkout Pesanan" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-text-main">Checkout</h1>
                    <p className="text-text-muted mt-2">Selesaikan pembayaran untuk memproses pesanan Anda.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 mb-8">
                            <h2 className="text-xl font-serif font-bold text-text-main mb-6">Detail Pembayaran</h2>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="catatan" value="Catatan Pesanan (Opsional)" />
                                    <textarea
                                        id="catatan"
                                        className="border-text-muted/30 focus:border-primary-base focus:ring-1 focus:ring-primary-light text-text-main rounded-lg bg-[#FDFBFA] w-full px-4 py-3 outline-none transition-colors mt-1 block"
                                        rows="3"
                                        placeholder="Contoh: Kopi less sugar, es dipisah..."
                                        value={data.catatan}
                                        onChange={(e) => setData('catatan', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.catatan} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="metode_pembayaran" value="Metode Pembayaran" />
                                    <SelectInput
                                        id="metode_pembayaran"
                                        className="mt-1 block w-full"
                                        value={data.metode_pembayaran}
                                        onChange={(e) => setData('metode_pembayaran', e.target.value)}
                                    >
                                        <option value="Transfer BCA">Transfer BCA</option>
                                        <option value="Transfer Mandiri">Transfer Mandiri</option>
                                        <option value="GoPay">GoPay</option>
                                        <option value="OVO">OVO</option>
                                    </SelectInput>
                                    <InputError message={errors.metode_pembayaran} className="mt-2" />
                                    
                                    {/* Dummy Account Info */}
                                    <div className="mt-3 p-4 bg-primary-light/10 border border-primary-light/20 rounded-xl">
                                        <p className="text-sm text-text-muted mb-1">Silakan transfer ke rekening berikut:</p>
                                        {data.metode_pembayaran === 'Transfer BCA' && <p className="font-bold text-text-main">BCA 1234567890 a.n. Alaka Coffee</p>}
                                        {data.metode_pembayaran === 'Transfer Mandiri' && <p className="font-bold text-text-main">Mandiri 0987654321 a.n. Alaka Coffee</p>}
                                        {data.metode_pembayaran === 'GoPay' && <p className="font-bold text-text-main">GoPay 081234567890 a.n. Alaka Coffee</p>}
                                        {data.metode_pembayaran === 'OVO' && <p className="font-bold text-text-main">OVO 081234567890 a.n. Alaka Coffee</p>}
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="bukti_pembayaran" value="Upload Bukti Pembayaran" />
                                    <input
                                        id="bukti_pembayaran"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('bukti_pembayaran', e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light/10 file:text-primary-base hover:file:bg-primary-light/20 cursor-pointer"
                                    />
                                    <InputError message={errors.bukti_pembayaran} className="mt-2" />
                                    <p className="text-xs text-text-muted mt-2">Format: JPG, PNG, WEBP (Max 2MB)</p>
                                </div>

                                <div className="pt-4 border-t border-[#EAE3DB] flex justify-end">
                                    <PrimaryButton processing={processing} className="w-full sm:w-auto px-8 py-3 text-base">
                                        Proses Pesanan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-xl font-serif font-bold text-text-main mb-6">Ringkasan Pesanan</h2>
                            
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={`/storage/${item.menu.gambar}`} alt={item.menu.nama_menu} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-text-main line-clamp-1">{item.menu.nama_menu}</h4>
                                            <p className="text-xs text-text-muted">{item.qty} x {formatRupiah(item.menu.harga)}</p>
                                        </div>
                                        <div className="font-semibold text-sm text-text-main text-right">
                                            {formatRupiah(item.subtotal)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm border-t border-[#EAE3DB] pt-4 pb-4 mb-4 border-b">
                                <div className="flex justify-between text-text-muted">
                                    <span>Subtotal</span>
                                    <span>{formatRupiah(subtotal)}</span>
                                </div>
                                {diskon > 0 && (
                                    <div className="flex justify-between text-success font-medium">
                                        <span>Diskon ({appliedPromo})</span>
                                        <span>-{formatRupiah(diskon)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-text-main text-lg">Total Pembayaran</span>
                                <span className="font-serif text-2xl font-bold text-primary-base">{formatRupiah(total)}</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
