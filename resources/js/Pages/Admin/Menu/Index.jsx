import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { formatRupiah } from '@/utils/formatters';

export default function Index({ menu, kategori }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        id_kategori: '',
        nama_menu: '',
        deskripsi: '',
        harga: '',
        stok: '',
        gambar: null,
        _method: 'post', // Default to post
    });

    const openAddModal = () => {
        setIsEdit(false);
        reset();
        clearErrors();
        setData('_method', 'post');
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setIsEdit(true);
        setEditingId(item.id);
        setData({ 
            id_kategori: item.id_kategori,
            nama_menu: item.nama_menu,
            deskripsi: item.deskripsi,
            harga: item.harga,
            stok: item.stok,
            gambar: null,
            _method: 'put' // Trick for Laravel file upload via PUT
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            // Kita tetap menggunakan post() untuk mensupport file upload dengan method spoofing
            post(route('admin.menu.update', editingId), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.menu.store'), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
            destroy(route('admin.menu.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-text-main">Katalog Menu</h1>
                    <p className="text-text-muted mt-1">Kelola daftar produk kopi dan non-kopi.</p>
                </div>
                <PrimaryButton onClick={openAddModal}>
                    + Tambah Menu
                </PrimaryButton>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAE3DB] bg-[#FAF8F5]">
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Gambar</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Menu</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Harga</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Stok</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB] bg-surface">
                            {menu.map((item) => (
                                <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img src={`/storage/${item.gambar}`} alt={item.nama_menu} className="w-16 h-16 object-cover rounded-lg border border-[#EAE3DB]" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-text-main font-serif">{item.nama_menu}</p>
                                        <p className="text-xs text-text-muted truncate max-w-xs">{item.deskripsi}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-main">{item.kategori?.nama_kategori}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-main">{formatRupiah(item.harga)}</td>
                                    <td className="px-6 py-4 text-sm text-text-main">{item.stok}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openEditModal(item)} className="text-primary-base hover:underline text-sm font-medium">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-accent-promo hover:underline text-sm font-medium">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {menu.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada data menu.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-lg font-serif font-semibold text-text-main mb-4">
                        {isEdit ? 'Edit Menu' : 'Tambah Menu'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="id_kategori" value="Kategori" />
                            <SelectInput
                                id="id_kategori"
                                value={data.id_kategori}
                                onChange={(e) => setData('id_kategori', e.target.value)}
                                hasError={!!errors.id_kategori}
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((kat) => (
                                    <option key={kat.id} value={kat.id}>{kat.nama_kategori}</option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.id_kategori} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="nama_menu" value="Nama Menu" />
                            <TextInput
                                id="nama_menu"
                                className="mt-1 block w-full"
                                value={data.nama_menu}
                                onChange={(e) => setData('nama_menu', e.target.value)}
                                hasError={!!errors.nama_menu}
                            />
                            <InputError message={errors.nama_menu} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                            <textarea
                                id="deskripsi"
                                className={`border rounded-lg bg-[#FDFBFA] w-full px-4 py-3 outline-none transition-colors mt-1 block ${
                                    errors.deskripsi ? 'border-accent-promo focus:border-accent-promo focus:ring-1 focus:ring-accent-promo text-accent-promo' : 'border-text-muted/30 focus:border-primary-base focus:ring-1 focus:ring-primary-light text-text-main'
                                }`}
                                rows="3"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                            ></textarea>
                            <InputError message={errors.deskripsi} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="harga" value="Harga (Rp)" />
                                <TextInput
                                    id="harga"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full"
                                    value={data.harga}
                                    onChange={(e) => setData('harga', e.target.value)}
                                    hasError={!!errors.harga}
                                />
                                <InputError message={errors.harga} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="stok" value="Stok" />
                                <TextInput
                                    id="stok"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full"
                                    value={data.stok}
                                    onChange={(e) => setData('stok', e.target.value)}
                                    hasError={!!errors.stok}
                                />
                                <InputError message={errors.stok} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="gambar" value={`Gambar Menu ${isEdit ? '(Biarkan kosong jika tidak diganti)' : ''}`} />
                            <input
                                id="gambar"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('gambar', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light/10 file:text-primary-base hover:file:bg-primary-light/20 cursor-pointer"
                            />
                            <InputError message={errors.gambar} className="mt-2" />
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                            <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AdminLayout>
    );
}
