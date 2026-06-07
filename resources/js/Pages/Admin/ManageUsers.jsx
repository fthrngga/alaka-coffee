import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Card';

export default function ManageUsers({ users }) {
    return (
        <AdminLayout>
            <Head title="Manage Customers" />
            
            <div className="mb-6">
                <h1 className="text-2xl font-serif font-bold text-text-main">Manage Customers</h1>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#FAF8F5] border-b border-[#EAE3DB] text-text-muted">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Joined At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3DB]">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-text-muted">
                                        Belum ada pelanggan terdaftar.
                                    </td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                                    <td className="px-6 py-4">#{user.id}</td>
                                    <td className="px-6 py-4 font-medium text-text-main">{user.name}</td>
                                    <td className="px-6 py-4 text-text-muted">{user.email}</td>
                                    <td className="px-6 py-4 text-text-muted">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
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
