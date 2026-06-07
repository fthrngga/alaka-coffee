# Feature 05: Keranjang & Checkout (Pembeli)
**Context:** Mengelola siklus pemesanan pembeli mulai dari memilih produk hingga mengunggah bukti pembayaran manual.
**Dependencies:** Membutuhkan relasi tabel `keranjang`, `detail_keranjang`, `pesanan`, `detail_pesanan`, `pembayaran`, dan `promo`. Route ini WAJIB diproteksi dengan `CheckRole:pembeli`.

## 1. Fitur Keranjang Belanja (`/cart`)
Buat `CartController` dan halaman React `resources/js/Pages/User/Cart.jsx`.
- **Add to Cart:** Tombol pada `MenuCard` sekarang harus berfungsi untuk memasukkan item ke tabel `keranjang` dan `detail_keranjang`. Jika produk sudah ada di keranjang, tambahkan `qty`-nya.
- **Cart Page:** - Tampilkan daftar item di keranjang beserta `qty` dan `subtotal` per item.
  - Sediakan tombol untuk menambah/mengurangi `qty` dan tombol hapus (tong sampah) untuk menghapus item.
- **Promo Logic:** - Sediakan input teks "Kode Promo" dan tombol "Apply".
  - Lakukan pengecekan ke tabel `promo` via backend: Apakah kode valid? Apakah status aktif? Apakah `subtotal` keranjang memenuhi `minimal_belanja`?
  - Hitung total akhir: `Total = Subtotal - Nilai Diskon`.

## 2. Fitur Checkout & Upload Bukti (`/checkout`)
Buat `CheckoutController` dan halaman React `resources/js/Pages/User/Checkout.jsx`.
- **Order Summary:** Tampilkan kembali ringkasan pesanan dan total akhir yang harus dibayar.
- **Form Checkout (TANPA Pengiriman):**
  - **Catatan (Opsional):** Textarea untuk instruksi khusus pesanan.
  - **Metode Pembayaran:** Dropdown atau Radio Button (misal: Transfer BCA, Mandiri, GoPay, OVO). Tampilkan nomor rekening/nomor e-wallet statis sesuai pilihan.
  - **Bukti Pembayaran:** Input file upload (`mimes:jpg,jpeg,png,webp|max:2048`). Wajib diisi untuk menyelesaikan pesanan.
- **Proses Finalisasi (Backend Logic):**
  1. Validasi input dan file gambar.
  2. Simpan path gambar bukti pembayaran menggunakan `Storage`.
  3. *Insert* data ke tabel `pesanan` dengan status `pending`.
  4. Pindahkan semua data dari `detail_keranjang` ke tabel `detail_pesanan`.
  5. *Insert* data ke tabel `pembayaran` dengan status `pending` dan sertakan path gambar bukti.
  6. Hapus data di `keranjang` dan `detail_keranjang` milik user tersebut.
  7. Redirect user ke halaman *Order History* (Feature 06) dengan *flash message* sukses.

## 3. UI/UX Considerations
- Gunakan komponen `<Button processing={true}>` dari Inertia saat tombol *Checkout* ditekan untuk mencegah *double-submit*.
- Tampilkan struktur "Order Summary" dalam `<Card />` dengan *background* `bg-surface` di sebelah kanan/bawah agar strukturnya rapi sesuai `design_system.md`.