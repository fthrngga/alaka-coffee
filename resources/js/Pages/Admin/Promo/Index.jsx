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

export default function Index({ promo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        kode_promo: '',
        tipe_diskon: 'nominal',
        nilai_diskon: '',
        minimal_belanja: '0',
        status: true,
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
        setData({ 
            kode_promo: item.kode_promo,
            tipe_diskon: item.tipe_diskon,
            nilai_diskon: item.nilai_diskon,
            minimal_belanja: item.minimal_belanja,
            status: item.status == 1 ? true : false,
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
        
        // Ensure uppercase promo code before submitting (just in case)
        data.kode_promo = data.kode_promo.toUpperCase();

        if (isEdit) {
            put(route('admin.promo.update', editingId), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.promo.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus promo ini?')) {
            destroy(route('admin.promo.destroy', id));
        }
    };

    const renderNilaiDiskon = (item) => {
        if (item.tipe_diskon === 'persen') {
            return `${item.nilai_diskon}%`;
        }
        return formatRupiah(item.nilai_diskon);
    };

    return (
        <AdminLayout>
            <Head title="Manage Promo" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-text-main">Voucher & Promo</h1>
                    <p className="text-text-muted mt-1">Kelola kode diskon belanja pelanggan.</p>
                </div>
                <PrimaryButton onClick={openAddModal}>
                    + Tambah Promo
                </PrimaryButton>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAE3DB] bg-[#FAF8F5]">
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Kode Promo</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Nilai Diskon</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Min. Belanja</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-sans text-sm font-semibold text-text-muted uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB] bg-surface">
                            {promo.map((item) => (
                                <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-primary-base font-sans">{item.kode_promo}</td>
                                    <td className="px-6 py-4 text-sm text-text-main font-medium">{renderNilaiDiskon(item)}</td>
                                    <td className="px-6 py-4 text-sm text-text-main">{formatRupiah(item.minimal_belanja)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            item.status ? 'bg-[#EDF2EC] text-success' : 'bg-gray-100 text-text-muted'
                                        }`}>
                                            {item.status ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => openEditModal(item)} className="text-primary-base hover:underline text-sm font-medium">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-accent-promo hover:underline text-sm font-medium">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {promo.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada data promo.
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
                        {isEdit ? 'Edit Promo' : 'Tambah Promo'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="kode_promo" value="Kode Promo" />
                            <TextInput
                                id="kode_promo"
                                className="mt-1 block w-full uppercase"
                                value={data.kode_promo}
                                onChange={(e) => setData('kode_promo', e.target.value.toUpperCase())}
                                hasError={!!errors.kode_promo}
                            />
                            <InputError message={errors.kode_promo} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="tipe_diskon" value="Tipe Diskon" />
                                <SelectInput
                                    id="tipe_diskon"
                                    value={data.tipe_diskon}
                                    onChange={(e) => setData('tipe_diskon', e.target.value)}
                                    hasError={!!errors.tipe_diskon}
                                >
                                    <option value="nominal">Nominal (Rp)</option>
                                    <option value="persen">Persentase (%)</option>
                                </SelectInput>
                                <InputError message={errors.tipe_diskon} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="nilai_diskon" value="Nilai Diskon" />
                                <TextInput
                                    id="nilai_diskon"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full"
                                    value={data.nilai_diskon}
                                    onChange={(e) => setData('nilai_diskon', e.target.value)}
                                    hasError={!!errors.nilai_diskon}
                                />
                                <InputError message={errors.nilai_diskon} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="minimal_belanja" value="Minimal Belanja (Rp)" />
                            <TextInput
                                id="minimal_belanja"
                                type="number"
                                min="0"
                                className="mt-1 block w-full"
                                value={data.minimal_belanja}
                                onChange={(e) => setData('minimal_belanja', e.target.value)}
                                hasError={!!errors.minimal_belanja}
                            />
                            <InputError message={errors.minimal_belanja} className="mt-2" />
                        </div>

                        <div className="flex items-center mt-4">
                            <input
                                id="status"
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) => setData('status', e.target.checked)}
                                className="rounded border-text-muted/40 text-primary-base shadow-sm focus:ring-primary-light"
                            />
                            <label htmlFor="status" className="ms-2 text-sm text-text-main font-medium">
                                Promo Aktif
                            </label>
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
