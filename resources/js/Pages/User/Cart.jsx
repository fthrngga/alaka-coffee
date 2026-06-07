import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { formatRupiah } from '@/utils/formatters';

export default function Cart({ cartItems, subtotal, diskon, total, appliedPromo }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_promo: appliedPromo || '',
    });

    const updateQty = (id, currentQty, amount) => {
        const newQty = currentQty + amount;
        if (newQty < 1) return;
        
        router.put(route('cart.update', id), { qty: newQty }, {
            preserveScroll: true,
        });
    };

    const removeItem = (id) => {
        if (confirm('Hapus item ini dari keranjang?')) {
            router.delete(route('cart.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const applyPromo = (e) => {
        e.preventDefault();
        post(route('cart.promo.apply'), {
            preserveScroll: true,
        });
    };

    const removePromo = () => {
        router.delete(route('cart.promo.remove'), {
            preserveScroll: true,
            onSuccess: () => reset('kode_promo'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Keranjang Belanja" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-text-main">Keranjang Belanja</h1>
                    <p className="text-text-muted mt-2">Selesaikan pesanan Anda sebelum kehabisan.</p>
                </div>

                {cartItems.length === 0 ? (
                    <Card className="p-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-text-muted mb-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                        </svg>
                        <h2 className="text-xl font-serif font-bold text-text-main mb-2">Keranjang Anda masih kosong</h2>
                        <p className="text-text-muted mb-6">Yuk, lihat menu kami dan temukan kopi favorit Anda.</p>
                        <Link href={route('menu')} className="inline-block px-6 py-3 bg-primary-base text-white font-semibold rounded-full hover:bg-primary-dark transition-colors">
                            Lihat Menu
                        </Link>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                        <img src={`/storage/${item.menu.gambar}`} alt={item.menu.nama_menu} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 w-full text-center sm:text-left">
                                        <h3 className="font-serif font-bold text-lg text-text-main">{item.menu.nama_menu}</h3>
                                        <p className="text-sm text-text-muted">{formatRupiah(item.menu.harga)}</p>
                                        <p className="text-sm font-semibold text-primary-base mt-2">{formatRupiah(item.subtotal)}</p>
                                    </div>
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                                        <div className="flex items-center border border-[#EAE3DB] rounded-lg">
                                            <button 
                                                onClick={() => updateQty(item.id, item.qty, -1)}
                                                className="px-3 py-1 text-text-muted hover:text-primary-base disabled:opacity-50"
                                                disabled={item.qty <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 font-medium text-text-main border-x border-[#EAE3DB]">
                                                {item.qty}
                                            </span>
                                            <button 
                                                onClick={() => updateQty(item.id, item.qty, 1)}
                                                className="px-3 py-1 text-text-muted hover:text-primary-base disabled:opacity-50"
                                                disabled={item.qty >= item.menu.stok}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-accent-promo hover:bg-accent-promo/10 rounded-full transition-colors"
                                            title="Hapus item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary & Promo */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24">
                                <h2 className="text-xl font-serif font-bold text-text-main mb-6">Ringkasan Pesanan</h2>
                                
                                <form onSubmit={applyPromo} className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <TextInput
                                                id="kode_promo"
                                                className="w-full text-sm uppercase"
                                                placeholder="Kode Promo"
                                                value={data.kode_promo}
                                                onChange={(e) => setData('kode_promo', e.target.value.toUpperCase())}
                                                disabled={appliedPromo !== null}
                                            />
                                        </div>
                                        {appliedPromo ? (
                                            <button type="button" onClick={removePromo} className="px-4 py-2 bg-accent-promo/10 text-accent-promo text-sm font-semibold rounded-lg hover:bg-accent-promo/20 transition-colors">
                                                Hapus
                                            </button>
                                        ) : (
                                            <button type="submit" disabled={processing || !data.kode_promo} className="px-4 py-2 bg-text-main text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors disabled:opacity-50">
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                    <InputError message={errors.kode_promo} className="mt-2" />
                                </form>

                                <div className="space-y-3 text-sm border-b border-[#EAE3DB] pb-4 mb-4">
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
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-bold text-text-main">Total Akhir</span>
                                    <span className="font-serif text-2xl font-bold text-primary-base">{formatRupiah(total)}</span>
                                </div>

                                <Link href={route('checkout.index')} className="w-full block text-center px-6 py-3 bg-primary-base text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                                    Lanjut ke Pembayaran
                                </Link>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
