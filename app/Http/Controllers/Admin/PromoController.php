<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    public function index()
    {
        $promo = Promo::latest()->get();
        return Inertia::render('Admin/Promo/Index', [
            'promo' => $promo
        ]);
    }

    public function store(Request $request)
    {
        // Pastikan kode_promo uppercase
        $request->merge(['kode_promo' => strtoupper($request->kode_promo)]);

        $request->validate([
            'kode_promo' => 'required|string|max:255|unique:promo,kode_promo',
            'tipe_diskon' => 'required|in:persen,nominal',
            'nilai_diskon' => [
                'required',
                'numeric',
                'min:0',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->tipe_diskon === 'persen' && $value > 100) {
                        $fail('Diskon persen tidak boleh lebih dari 100.');
                    }
                },
            ],
            'minimal_belanja' => 'nullable|numeric|min:0',
            'status' => 'boolean',
        ]);

        Promo::create($request->all());

        return redirect()->back()->with('success', 'Promo berhasil ditambahkan.');
    }

    public function update(Request $request, Promo $promo)
    {
        $request->merge(['kode_promo' => strtoupper($request->kode_promo)]);

        $request->validate([
            'kode_promo' => 'required|string|max:255|unique:promo,kode_promo,' . $promo->id,
            'tipe_diskon' => 'required|in:persen,nominal',
            'nilai_diskon' => [
                'required',
                'numeric',
                'min:0',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->tipe_diskon === 'persen' && $value > 100) {
                        $fail('Diskon persen tidak boleh lebih dari 100.');
                    }
                },
            ],
            'minimal_belanja' => 'nullable|numeric|min:0',
            'status' => 'boolean',
        ]);

        $promo->update($request->all());

        return redirect()->back()->with('success', 'Promo berhasil diperbarui.');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->back()->with('success', 'Promo berhasil dihapus.');
    }
}
