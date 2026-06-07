<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Pesanan::with('user', 'detail_pesanan.menu', 'pembayaran')
            ->orderByRaw("CASE WHEN status_pesanan = 'pending' THEN 1 ELSE 2 END")
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/ManageOrders', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status_pesanan' => 'required|in:pending,diproses,selesai'
        ]);

        $order = Pesanan::findOrFail($id);
        $order->status_pesanan = $request->status_pesanan;
        $order->save();

        if ($request->status_pesanan === 'diproses') {
            $pembayaran = Pembayaran::where('id_pesanan', $order->id)->first();
            if ($pembayaran && $pembayaran->status_pembayaran === 'pending') {
                $pembayaran->status_pembayaran = 'berhasil';
                $pembayaran->save();
            }
        }

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui.');
    }
}
