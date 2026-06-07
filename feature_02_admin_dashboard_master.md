# Feature 02: Admin Seeder, Layout & Master Data
**Context:** Mengunci akses Admin dan membuat panel pengelolaan data dasar.
**Dependencies:** Baca `design_system.md` untuk styling Admin Panel dan `overview.md` untuk hak akses.

## 1. Admin Seeder (Krusial)
Halaman `/register` HANYA membuat user dengan role `pembeli`. Oleh karena itu, wajib membuat seeder untuk akun Admin.
- Buat `AdminSeeder` (atau jalankan di `DatabaseSeeder`).
- **Data Admin:**
  - Name: Administrator
  - Email: `admin@alaka.coffee`
  - Password: `admin1234` (gunakan `Hash::make`)
  - Role: `admin`

## 2. Admin Layout Component (`<AdminLayout />`)
Buat komponen Layout khusus untuk Admin (`resources/js/Layouts/AdminLayout.jsx`).
- **Sidebar:** Gunakan warna `bg-base`. Tampilkan menu navigasi (Dashboard, Manage Products, Manage Orders, Manage FAQ, Manage Users, Manage Promo, Profile, Logout).
- **Active State:** Menu yang sedang aktif harus memiliki background `primary-light` (dengan opacity 10-20%) dan teks `primary-base` yang ditebalkan (bold), sesuai `design_system.md`.
- **Topbar/Header:** Berisi nama admin yang sedang login dan tombol Logout.

## 3. Dashboard Overview (`/admin/dashboard`)
Buat halaman Dashboard yang menampilkan metrik dasar (statis sementara atau hitung dari model jika memungkinkan):
- Total Orders
- Total Products
- Total Users
- Gunakan komponen `<Card />` untuk membungkus metrik ini dengan border tipis dan shadow lembut saat di-hover.

## 4. Master Data CRUD (Kategori & FAQ)
Buat Controller dan Halaman React (Inertia) untuk mengelola data master.
### A. Kategori (`/admin/kategori`)
- Fitur: Menampilkan tabel daftar kategori, Form Tambah Kategori, Edit, dan Hapus.
- Gunakan komponen form (`<TextInput />`, `<Button />`) sesuai `design_system.md`.
### B. FAQ (`/admin/faq`)
- Fitur: Menampilkan tabel daftar FAQ (Pertanyaan & Jawaban), Tambah FAQ, Edit, dan Hapus.
- Pastikan tampilan tabel terlihat modern: hilangkan garis vertikal, gunakan padding yang lega, dan header teks `text-muted` uppercase.