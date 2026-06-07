# Feature 03: Manajemen Produk & Promo
**Context:** Membangun fungsionalitas CRUD untuk katalog Menu dan sistem Promo kedai.
**Dependencies:** Baca `design_system.md` untuk panduan visual komponen form/tabel, dan pastikan relasi Kategori sudah ada (dari Feature 02).

## 1. Manajemen Menu (Produk)
Buat Controller (`MenuController`), Routes (proteksi dengan `CheckRole:admin`), dan halaman React (`resources/js/Pages/Admin/Menu/`).

### A. Fitur CRUD Menu
- **Index:** Tampilkan daftar menu dalam bentuk tabel modern. Tampilkan *thumbnail* gambar produk, Nama, Kategori (ambil relasi nama_kategori), Harga, dan Stok.
- **Create & Edit Form:** Gunakan form Inertia untuk input `nama_menu`, `id_kategori` (dropdown `SelectInput`), `deskripsi` (textarea), `harga` (number), `stok` (number), dan `gambar` (file upload).

### B. Penanganan Upload Gambar (Krusial)
- **Backend (Laravel):** Validasi file gambar (`mimes:jpg,jpeg,png,webp|max:2048`). Simpan gambar menggunakan *facade* Storage Laravel ke folder `public/menu` dan simpan path-nya ke *database*.
- **Frontend (Inertia/React):** Saat *submit* form yang mengandung file, pastikan menggunakan *method* POST (meskipun saat proses Edit/Update) dan paksa Inertia menggunakan form data (`forceFormData: true` atau menggunakan trik `_method: 'put'`).

## 2. Manajemen Promo
Buat Controller (`PromoController`), Routes (proteksi `CheckRole:admin`), dan halaman React (`resources/js/Pages/Admin/Promo/`).

### A. Fitur CRUD Promo
- **Index:** Tabel daftar promo yang menampilkan Kode Promo, Tipe Diskon, Nilai, Minimal Belanja, dan Status (Aktif/Tidak Aktif menggunakan badge UI).
- **Create & Edit Form:** - `kode_promo`: Teks (Otomatis *uppercase* di *frontend* atau divalidasi *uppercase* di *backend*).
  - `tipe_diskon`: Dropdown (Persen / Nominal).
  - `nilai_diskon`: Angka (Jika persen, maksimal 100).
  - `minimal_belanja`: Angka (Default 0).
  - `status`: Toggle / Checkbox / Select (Aktif/Tidak).

## 3. Ketentuan UI & Komponen (React)
- Gunakan komponen *reusable* dari `design_system.md` (`<TextInput />`, `<SelectInput />`, `<Button />`).
- **Format Mata Uang:** Buat *helper utility function* di React (misal: `formatRupiah()`) untuk merender angka nominal harga dan diskon dengan rapi (contoh: Rp 25.000).
- **Notifikasi:** Implementasikan *Flash Messages* (toast notification) hijau/merah saat data berhasil atau gagal disimpan.