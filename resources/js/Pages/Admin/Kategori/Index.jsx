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

export default function Index({ kategori }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama_kategori: '',
    });

    const openAddModal = () => {
        setIsEdit(false);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setIsEdit(true);
        setEditingId(item.id);
        setData({ nama_kategori: item.nama_kategori });
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
            put(route('admin.kategori.update', editingId), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.kategori.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            destroy(route('admin.kategori.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Kategori" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-text-main">Kategori Menu</h1>
                    <p className="text-text-muted mt-1">Kelola jenis-jenis produk yang dijual.</p>
                </div>
                <PrimaryButton onClick={openAddModal}>
                    + Tambah Kategori
                </PrimaryButton>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAE3DB] bg-[#FAF8F5]">
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Nama Kategori</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB] bg-surface">
                            {kategori.map((item) => (
                                <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-text-main">{item.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-main">{item.nama_kategori}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openEditModal(item)} className="text-primary-base hover:underline text-sm font-medium">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-accent-promo hover:underline text-sm font-medium">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {kategori.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada data kategori.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal show={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-serif font-semibold text-text-main mb-4">
                        {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="nama_kategori" value="Nama Kategori" />
                            <TextInput
                                id="nama_kategori"
                                className="mt-1 block w-full"
                                value={data.nama_kategori}
                                onChange={(e) => setData('nama_kategori', e.target.value)}
                                isFocused
                                hasError={!!errors.nama_kategori}
                            />
                            <InputError message={errors.nama_kategori} className="mt-2" />
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
