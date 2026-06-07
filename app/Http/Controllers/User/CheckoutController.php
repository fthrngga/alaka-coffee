<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Keranjang;
use App\Models\DetailKeranjang;
use App\Models\Pesanan;
use App\Models\DetailPesanan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $keranjang = Keranjang::where('id_user', auth()->id())->first();
        if (!$keranjang) {
            return redirect()->route('cart.index');
        }

        $details = DetailKeranjang::with('menu')->where('id_keranjang', $keranjang->id)->get();
        if ($details->isEmpty()) {
            return redirect()->route('cart.index');
        }
        
        $subtotal = $details->sum('subtotal');
        $promoSession = $request->session()->get('applied_promo');
        $diskon = 0;
        
        if ($promoSession) {
            if ($promoSession['tipe_diskon'] === 'persen') {
                $diskon = ($subtotal * $promoSession['nilai_diskon']) / 100;
            } else {
                $diskon = $promoSession['nilai_diskon'];
            }
            if ($diskon > $subtotal) $diskon = $subtotal;
        }

        return Inertia::render('User/Checkout', [
            'cartItems' => $details,
            'subtotal' => $subtotal,
            'diskon' => $diskon,
            'total' => $subtotal - $diskon,
            'appliedPromo' => $promoSession ? $promoSession['kode_promo'] : null
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'catatan' => 'nullable|string|max:1000',
            'metode_pembayaran' => 'required|string',
            'bukti_pembayaran' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $keranjang = Keranjang::where('id_user', auth()->id())->first();
        if (!$keranjang) {
            return redirect()->route('menu')->with('error', 'Keranjang kosong.');
        }

        $details = DetailKeranjang::with('menu')->where('id_keranjang', $keranjang->id)->get();
        if ($details->isEmpty()) {
            return redirect()->route('menu')->with('error', 'Keranjang kosong.');
        }

        try {
            DB::beginTransaction();

            $subtotal = $details->sum('subtotal');
            $promoSession = $request->session()->get('applied_promo');
            $diskon = 0;
            
            if ($promoSession) {
                if ($promoSession['tipe_diskon'] === 'persen') {
                    $diskon = ($subtotal * $promoSession['nilai_diskon']) / 100;
                } else {
                    $diskon = $promoSession['nilai_diskon'];
                }
                if ($diskon > $subtotal) $diskon = $subtotal;
            }

            $total_harga = $subtotal - $diskon;

            // 1. Buat Pesanan
            $pesanan = Pesanan::create([
                'id_user' => auth()->id(),
                'tanggal_pesanan' => now(),
                'total_harga' => $total_harga,
                'catatan' => $request->catatan,
                'status_pesanan' => 'pending',
            ]);

            // 2. Buat Detail Pesanan (sambil kurangi stok menu)
            foreach ($details as $detail) {
                // Kurangi stok
                $menu = $detail->menu;
                if ($menu->stok < $detail->qty) {
                    throw new \Exception("Stok {$menu->nama_menu} tidak mencukupi.");
                }
                $menu->decrement('stok', $detail->qty);

                DetailPesanan::create([
                    'id_pesanan' => $pesanan->id,
                    'id_menu' => $detail->id_menu,
                    'qty' => $detail->qty,
                    'harga' => $menu->harga,
                    'subtotal' => $detail->subtotal,
                ]);
            }

            // 3. Simpan Bukti Pembayaran
            $buktiPath = null;
            if ($request->hasFile('bukti_pembayaran')) {
                $buktiPath = $request->file('bukti_pembayaran')->store('bukti_pembayaran', 'public');
            }

            // 4. Buat Pembayaran
            Pembayaran::create([
                'id_pesanan' => $pesanan->id,
                'metode_pembayaran' => $request->metode_pembayaran,
                'bukti_pembayaran' => $buktiPath,
                'status_pembayaran' => 'pending',
                'tanggal_pembayaran' => now(),
            ]);

            // 5. Kosongkan Keranjang
            $keranjang->delete(); // This cascades and deletes detail_keranjang
            $request->session()->forget('applied_promo');

            DB::commit();

            return redirect()->route('dashboard.user')->with('success', 'Pesanan berhasil dibuat. Menunggu konfirmasi pembayaran.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memproses pesanan: ' . $e->getMessage());
        }
    }
}
