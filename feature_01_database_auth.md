# Feature 01: Database Architecture & Authentication
**Context:** Menginisialisasi fondasi database dan sistem otentikasi.
**Dependencies:** Baca `overview.md` untuk memahami relasi tabel dan aturan sistem.

## 1. Database Migrations (Tabel & Skema)
Buat file migration untuk 11 tabel berikut secara berurutan agar tidak terjadi error pada Foreign Key. Terapkan tipe data yang tepat dan pastikan relasi (Cascade/Restrict) dikonfigurasi dengan aman.

### A. Tabel Pengguna & Master Data
1. `users`: 
   - `id` (PK), `name` (string), `email` (string, unique), `password` (string).
   - `no_hp` (string, nullable), `alamat` (text, nullable).
   - `role` (enum: 'admin', 'pembeli') -> default 'pembeli'.
   - `timestamps`.
2. `kategori`: 
   - `id` (PK), `nama_kategori` (string).
   - `timestamps`.
3. `faq`: 
   - `id` (PK), `pertanyaan` (text), `jawaban` (text).
   - `timestamps`.
4. `contact_us`: 
   - `id` (PK), `alamat` (text), `no_hp` (string), `email` (string), `instagram` (string).
   - `timestamps`.

### B. Tabel Produk & Promo
5. `menu`: 
   - `id` (PK), `id_kategori` (FK ke `kategori`), `nama_menu` (string), `deskripsi` (text).
   - `harga` (decimal/integer), `gambar` (string/path), `stok` (integer).
   - `timestamps`.
6. `promo`: 
   - `id` (PK), `kode_promo` (string, unique), `tipe_diskon` (enum: 'persen', 'nominal').
   - `nilai_diskon` (integer), `minimal_belanja` (integer, default 0).
   - `status` (boolean, default true).
   - `timestamps`.

### C. Tabel Transaksi (Hapus logika pengiriman)
7. `keranjang`: 
   - `id` (PK), `id_user` (FK ke `users`).
   - `timestamps`.
8. `detail_keranjang`: 
   - `id` (PK), `id_keranjang` (FK ke `keranjang`), `id_menu` (FK ke `menu`).
   - `qty` (integer), `subtotal` (integer).
   - `timestamps`.
9. `pesanan`: 
   - `id` (PK), `id_user` (FK ke `users`), `tanggal_pesanan` (datetime).
   - `total_harga` (integer), `catatan` (text, nullable) -> *Pengganti alamat pengiriman karena sistem pick-up/dine-in*.
   - `status_pesanan` (enum: 'pending', 'diproses', 'selesai') -> default 'pending'.
   - `timestamps`.
10. `detail_pesanan`: 
    - `id` (PK), `id_pesanan` (FK ke `pesanan`), `id_menu` (FK ke `menu`).
    - `qty` (integer), `harga` (integer), `subtotal` (integer).
    - `timestamps`.
11. `pembayaran`: 
    - `id` (PK), `id_pesanan` (FK ke `pesanan`).
    - `metode_pembayaran` (string).
    - `bukti_pembayaran` (string, nullable) -> *Path file gambar*.
    - `status_pembayaran` (enum: 'pending', 'berhasil', 'gagal') -> default 'pending'.
    - `tanggal_pembayaran` (datetime, nullable).
    - `timestamps`.

## 2. Eloquent Models & Relationships
Buat Model untuk setiap tabel di atas. Deklarasikan relasi `hasMany`, `belongsTo`, `hasOne` secara eksplisit di dalam file Model.
- Contoh: `User` hasMany `Pesanan`.
- Contoh: `Pesanan` hasMany `DetailPesanan`, `Pesanan` hasOne `Pembayaran`.
- Pastikan property `$fillable` diisi dengan benar untuk mencegah *Mass Assignment Vulnerability*.

## 3. Authentication & Middleware (Inertia + React)
- Gunakan Laravel Breeze (stack React/Inertia) sebagai basis autentikasi.
- Modifikasi halaman Login dan Register Breeze menggunakan panduan UI dari `design_system.md`.
- Buat dan daftarkan **Middleware Role** (`CheckRole.php`) untuk membatasi akses routing:
  - Route `/admin/*` hanya bisa diakses jika `role == 'admin'`.
  - Route `/user/*` atau checkout hanya bisa diakses jika `role == 'pembeli'`.