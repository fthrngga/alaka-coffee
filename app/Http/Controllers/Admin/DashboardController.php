<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Pesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Pesanan::count();
        $totalProducts = Menu::count();
        $totalUsers = User::where('role', 'pembeli')->count();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'totalOrders' => $totalOrders,
                'totalProducts' => $totalProducts,
                'totalUsers' => $totalUsers,
            ]
        ]);
    }
}
