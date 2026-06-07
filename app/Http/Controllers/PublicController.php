<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use App\Models\Faq;
use App\Models\Kategori;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        $favoriteMenus = Menu::with('kategori')
            ->where('stok', '>', 0)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('Public/Home', [
            'favoriteMenus' => $favoriteMenus
        ]);
    }

    public function menu()
    {
        $kategori = Kategori::all();
        $menus = Menu::with('kategori')
            ->where('stok', '>', 0)
            ->get();

        return Inertia::render('Public/Menu', [
            'kategori' => $kategori,
            'menus' => $menus
        ]);
    }

    public function about()
    {
        $contact = ContactUs::first();

        return Inertia::render('Public/About', [
            'contact' => $contact
        ]);
    }

    public function faq()
    {
        $faq = Faq::all();

        return Inertia::render('Public/Faq', [
            'faq' => $faq
        ]);
    }
}
