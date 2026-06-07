<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\KategoriController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\PromoController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\CheckoutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/menu', [PublicController::class, 'menu'])->name('menu');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');

Route::get('/dashboard', function () {
    if (auth()->user()->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('dashboard.user');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('kategori', KategoriController::class)->except(['create', 'show', 'edit']);
    Route::resource('faq', FaqController::class)->except(['create', 'show', 'edit']);
    Route::resource('menu', MenuController::class)->except(['create', 'show', 'edit']);
    Route::resource('promo', PromoController::class)->except(['create', 'show', 'edit']);
});

Route::middleware(['auth', 'role:pembeli'])->group(function () {
    Route::get('/user/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard.user');

    // Keranjang
    Route::get('/keranjang', [CartController::class, 'index'])->name('cart.index');
    Route::post('/keranjang/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/keranjang/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/keranjang/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/keranjang/promo', [CartController::class, 'applyPromo'])->name('cart.promo.apply');
    Route::delete('/keranjang/promo', [CartController::class, 'removePromo'])->name('cart.promo.remove');

    // Checkout
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
