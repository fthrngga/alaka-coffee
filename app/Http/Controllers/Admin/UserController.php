<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'pembeli')
                     ->orderBy('created_at', 'desc')
                     ->get();

        return Inertia::render('Admin/ManageUsers', [
            'users' => $users
        ]);
    }
}
