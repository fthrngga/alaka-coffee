import Card from '@/Components/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ metrics }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="mb-6">
                <h1 className="text-2xl font-serif font-bold text-text-main">Dashboard Overview</h1>
                <p className="text-text-muted mt-1">Ringkasan performa Alaka Coffee.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-text-muted">Total Orders</h3>
                    <p className="text-3xl font-serif font-bold text-primary-base mt-2">{metrics.totalOrders}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-text-muted">Total Products</h3>
                    <p className="text-3xl font-serif font-bold text-primary-base mt-2">{metrics.totalProducts}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-text-muted">Total Users</h3>
                    <p className="text-3xl font-serif font-bold text-primary-base mt-2">{metrics.totalUsers}</p>
                </Card>
            </div>
        </AdminLayout>
    );
}
