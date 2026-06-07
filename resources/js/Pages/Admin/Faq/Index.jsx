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

export default function Index({ faq }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        pertanyaan: '',
        jawaban: '',
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
        setData({ pertanyaan: item.pertanyaan, jawaban: item.jawaban });
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
            put(route('admin.faq.update', editingId), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.faq.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
            destroy(route('admin.faq.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage FAQ" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-text-main">Frequently Asked Questions</h1>
                    <p className="text-text-muted mt-1">Kelola pertanyaan dan jawaban untuk pelanggan.</p>
                </div>
                <PrimaryButton onClick={openAddModal}>
                    + Tambah FAQ
                </PrimaryButton>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAE3DB] bg-[#FAF8F5]">
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider w-1/3">Pertanyaan</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider w-1/2">Jawaban</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB] bg-surface">
                            {faq.map((item) => (
                                <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-text-main">{item.pertanyaan}</td>
                                    <td className="px-6 py-4 text-sm text-text-muted truncate max-w-xs" title={item.jawaban}>{item.jawaban}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openEditModal(item)} className="text-primary-base hover:underline text-sm font-medium">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-accent-promo hover:underline text-sm font-medium">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {faq.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada data FAQ.
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
                        {isEdit ? 'Edit FAQ' : 'Tambah FAQ'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="pertanyaan" value="Pertanyaan" />
                            <TextInput
                                id="pertanyaan"
                                className="mt-1 block w-full"
                                value={data.pertanyaan}
                                onChange={(e) => setData('pertanyaan', e.target.value)}
                                isFocused
                                hasError={!!errors.pertanyaan}
                            />
                            <InputError message={errors.pertanyaan} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jawaban" value="Jawaban" />
                            <textarea
                                id="jawaban"
                                className={`border rounded-lg bg-[#FDFBFA] w-full px-4 py-3 outline-none transition-colors mt-1 block ${
                                    errors.jawaban ? 'border-accent-promo focus:border-accent-promo focus:ring-1 focus:ring-accent-promo text-accent-promo' : 'border-text-muted/30 focus:border-primary-base focus:ring-1 focus:ring-primary-light text-text-main'
                                }`}
                                rows="4"
                                value={data.jawaban}
                                onChange={(e) => setData('jawaban', e.target.value)}
                            ></textarea>
                            <InputError message={errors.jawaban} className="mt-2" />
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
