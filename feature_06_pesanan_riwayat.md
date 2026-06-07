# Feature 06: Validasi Pesanan, Riwayat Transaksi & UX Refactor
**Context:** Menyelesaikan siklus transaksi di sisi Admin, membangun Order History untuk User, dan merapikan alur navigasi (UX).
**Dependencies:** Membutuhkan data dari tabel `pesanan` dan `pembayaran` (Feature 05).

## 1. UX Refactor (Perbaikan Alur Pembeli)
- **Hapus User Dashboard:** Pembeli TIDAK memiliki halaman `/dashboard`. 
- **Redirect Logic (Controller):** - Setelah *Login* berhasil (jika role pembeli), redirect kembali ke `/` (Home) atau `/menu`.
  - Setelah *Checkout* berhasil, redirect langsung ke halaman `/user/orders` (Order History).
- **Navbar Dropdown (React Component):** - Ubah tombol statis "My Profile" di `PublicLayout` menjadi tombol dinamis yang menampilkan nama depan user yang sedang login (Contoh: "Hi, Budi").
  - Ubah elemen ini menjadi *Dropdown Menu* yang berisi 3 opsi:
    1. `Riwayat Pesanan` (Link ke `/user/orders`)
    2. `Pengaturan Profil` (Link ke edit profil bawaan Breeze)
    3. `Logout` (Action POST ke `/logout`)

## 2. Order History (User Area)
Buat Controller dan Halaman React `resources/js/Pages/User/OrderHistory.jsx`.
- **Daftar Transaksi:** Tampilkan riwayat pesanan milik user yang sedang login.
- **Data yang ditampilkan:** ID Pesanan, Tanggal, Total Harga, dan Status Pesanan (Gunakan komponen `<Badge />` dengan warna sesuai status: kuning untuk *pending*, biru untuk *diproses*, hijau untuk *selesai*).
- **Detail Pesanan:** Sediakan tombol/modal untuk melihat item apa saja yang dibeli pada pesanan tersebut.

## 3. Manage Orders (Admin Area)
Buat Controller dan Halaman React `resources/js/Pages/Admin/ManageOrders.jsx`.
- **Tabel Daftar Pesanan:** Tampilkan semua pesanan yang masuk. Urutkan berdasarkan tanggal terbaru atau status 'pending' di posisi teratas.
- **Informasi Tabel:** Order ID, Nama Customer, Total Harga, Metode Pembayaran, dan Status Pesanan.
- **Aksi Admin (Validasi):**
  - Sediakan tombol "View Bukti" untuk melihat gambar yang diunggah pembeli di modal atau tab baru.
  - Sediakan tombol *Action* (dropdown/select) untuk mengubah `status_pesanan`:
    - `Pending` -> `Diproses` (Tandanya pembayaran valid dan kopi sedang dibuat).
    - `Diproses` -> `Selesai` (Tandanya pesanan sudah diambil/selesai).

## 4. Manage Users (Admin Area - Opsional/Pelengkap)
- Buat halaman sederhana `/admin/users` untuk melihat daftar pelanggan yang terdaftar (Nama, Email, Tanggal Daftar). Admin tidak perlu bisa menambah *user* secara manual, cukup fungsi *Read* (Lihat) atau *Delete* (Hapus jika perlu).