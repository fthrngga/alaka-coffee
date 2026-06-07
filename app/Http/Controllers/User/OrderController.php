<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Pesanan::with('detail_pesanan.menu', 'pembayaran')
                         ->where('id_user', auth()->id())
                         ->orderBy('created_at', 'desc')
                         ->get();

        return Inertia::render('User/OrderHistory', [
            'orders' => $orders
        ]);
    }
}
