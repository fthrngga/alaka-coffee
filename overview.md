# System Overview: Alaka Coffee
**Project Type:** Full-Stack Web Application (Media Promosi & Pemesanan Online)
**Tech Stack:** Laravel (Backend), React + Inertia.js (Frontend), Tailwind CSS (Styling), MySQL (Database).

## 1. Global Business Rules (CRITICAL)
Sistem ini dirancang dengan aturan bisnis spesifik yang TIDAK BOLEH dilanggar oleh AI:
- **TANPA Payment Gateway:** Pembayaran dilakukan secara manual via transfer bank. Pembeli wajib mengunggah bukti transfer, dan Admin memverifikasinya.
- **TANPA Sistem Pengiriman (Delivery):** Sistem ini murni hanya untuk pemesanan (Pick-up/Dine-in). Tidak ada perhitungan ongkos kirim, pemilihan kurir, atau resi pengiriman.
- **WAJIB Ada Sistem Promo:** Terdapat fitur diskon/promo yang dapat dikelola oleh Admin dan dapat memotong total harga di keranjang belanja.

## 2. Actor & Access Control
Sistem ini menggunakan 3 jenis peran pengguna:
1. **Admin:** Memiliki akses penuh ke Dashboard untuk mengelola Master Data (Menu, Kategori, Promo, FAQ), mengelola data Pengguna, dan memverifikasi Pesanan.
2. **Pembeli (Registered User):** Harus login untuk melihat profil, memasukkan item ke keranjang, melakukan checkout, dan melihat riwayat pesanan.
3. **Guest:** Hanya dapat melihat halaman publik (Home, About Us, Contact, Menu, FAQ) dan akan diarahkan ke halaman Login jika mencoba bertransaksi.

## 3. Database Architecture (11 Tables)
Gunakan penamaan tabel dan relasi standar Eloquent Laravel:
1. `users`: Menyimpan data Admin dan Pembeli (gunakan kolom `role`).
2. `kategori`: Kategori produk (Kopi, Non-Kopi, dsb).
3. `menu`: Data produk (berelasi dengan `kategori`).
4. `promo`: Data diskon (kode promo, persentase diskon).
5. `keranjang`: Sesi belanja pengguna (berelasi dengan `users`).
6. `detail_keranjang`: Item dalam keranjang (berelasi dengan `keranjang` dan `menu`).
7. `pesanan`: Header transaksi final (total harga, status pesanan).
8. `detail_pesanan`: Item yang dibeli pada transaksi tersebut.
9. `pembayaran`: Menyimpan metode bayar, nama file bukti transfer, dan status pembayaran.
10. `faq`: Data pertanyaan umum.
11. `contact_us`: Data statis profil kontak kedai.

## 4. Development Principles
- **Component-Driven:** Bangun UI menggunakan Reusable React Components sesuai dengan `design_system.md`.
- **Inertia Routing:** Gunakan `Inertia::render()` pada Controller Laravel dan tangkap datanya sebagai `props` di React. Hindari pembuatan REST API/JSON endpoints standar kecuali benar-benar diperlukan untuk fungsi asinkron minor.
- **Form Handling:** Gunakan `useForm` dari Inertia.js untuk semua *submission* data (Login, Checkout, CRUD Admin).