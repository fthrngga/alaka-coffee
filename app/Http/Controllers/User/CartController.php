<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Keranjang;
use App\Models\DetailKeranjang;
use App\Models\Menu;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $keranjang = Keranjang::firstOrCreate(['id_user' => auth()->id()]);
        $details = DetailKeranjang::with('menu')->where('id_keranjang', $keranjang->id)->get();
        
        $subtotal = $details->sum('subtotal');
        
        $promoSession = $request->session()->get('applied_promo');
        $diskon = 0;
        
        if ($promoSession) {
            if ($promoSession['tipe_diskon'] === 'persen') {
                $diskon = ($subtotal * $promoSession['nilai_diskon']) / 100;
            } else {
                $diskon = $promoSession['nilai_diskon'];
            }
            
            if ($diskon > $subtotal) {
                $diskon = $subtotal;
            }
            
            if ($subtotal < $promoSession['minimal_belanja']) {
                $request->session()->forget('applied_promo');
                $diskon = 0;
                $promoSession = null;
            }
        }

        return Inertia::render('User/Cart', [
            'cartItems' => $details,
            'subtotal' => $subtotal,
            'diskon' => $diskon,
            'total' => $subtotal - $diskon,
            'appliedPromo' => $promoSession ? $promoSession['kode_promo'] : null
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'id_menu' => 'required|exists:menu,id',
            'qty' => 'required|integer|min:1'
        ]);

        $menu = Menu::findOrFail($request->id_menu);
        
        if ($menu->stok < $request->qty) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi.');
        }

        $keranjang = Keranjang::firstOrCreate(['id_user' => auth()->id()]);
        
        $detail = DetailKeranjang::where('id_keranjang', $keranjang->id)
                                ->where('id_menu', $menu->id)
                                ->first();

        if ($detail) {
            $newQty = $detail->qty + $request->qty;
            if ($menu->stok < $newQty) {
                return redirect()->back()->with('error', 'Stok tidak mencukupi untuk penambahan ini.');
            }
            $detail->update([
                'qty' => $newQty,
                'subtotal' => $newQty * $menu->harga
            ]);
        } else {
            DetailKeranjang::create([
                'id_keranjang' => $keranjang->id,
                'id_menu' => $menu->id,
                'qty' => $request->qty,
                'subtotal' => $request->qty * $menu->harga
            ]);
        }

        return redirect()->back()->with('success', 'Menu ditambahkan ke keranjang.');
    }

    public function update(Request $request, $id)
    {
        $request->validate(['qty' => 'required|integer|min:1']);
        
        $detail = DetailKeranjang::findOrFail($id);
        $menu = Menu::findOrFail($detail->id_menu);

        if ($menu->stok < $request->qty) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi.');
        }

        $detail->update([
            'qty' => $request->qty,
            'subtotal' => $request->qty * $menu->harga
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        DetailKeranjang::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Item dihapus dari keranjang.');
    }

    public function applyPromo(Request $request)
    {
        $request->validate(['kode_promo' => 'required|string']);
        
        $promo = Promo::where('kode_promo', strtoupper($request->kode_promo))
                      ->where('status', true)
                      ->first();

        if (!$promo) {
            return redirect()->back()->with('error', 'Kode promo tidak valid atau tidak aktif.');
        }

        $keranjang = Keranjang::where('id_user', auth()->id())->first();
        if (!$keranjang) {
            return redirect()->back()->with('error', 'Keranjang kosong.');
        }

        $subtotal = DetailKeranjang::where('id_keranjang', $keranjang->id)->sum('subtotal');
        
        if ($subtotal < $promo->minimal_belanja) {
            return redirect()->back()->with('error', 'Belum mencapai minimal belanja untuk promo ini.');
        }

        $request->session()->put('applied_promo', [
            'id' => $promo->id,
            'kode_promo' => $promo->kode_promo,
            'tipe_diskon' => $promo->tipe_diskon,
            'nilai_diskon' => $promo->nilai_diskon,
            'minimal_belanja' => $promo->minimal_belanja
        ]);

        return redirect()->back()->with('success', 'Promo berhasil diaplikasikan.');
    }

    public function removePromo(Request $request)
    {
        $request->session()->forget('applied_promo');
        return redirect()->back()->with('success', 'Promo dihapus.');
    }
}
