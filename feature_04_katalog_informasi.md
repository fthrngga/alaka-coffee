# Feature 04: Katalog & Informasi Kedai (Public Area)
**Context:** Membangun antarmuka publik (Guest & Pembeli) untuk menampilkan informasi dan produk.
**Dependencies:** Baca `design_system.md` untuk *vibe* desain, dan gunakan data Menu, Kategori, dan FAQ yang sudah dibuat di Feature 02 & 03.

## 1. Public Layout Component (`<PublicLayout />`)
Buat komponen Layout untuk halaman depan (`resources/js/Layouts/PublicLayout.jsx`).
- **Navbar:** Tampilkan logo/teks "Alaka Coffee" dan menu navigasi (Home, About Us, Menu, FAQ).
  - **Kondisi Login:** Jika *user* belum login (Guest), tampilkan tombol "Login" dan "Register". Jika sudah login (Pembeli), tampilkan ikon Keranjang dan "My Profile".
  - Gunakan komponen `<Link>` dari Inertia agar navigasi berjalan tanpa *reload* halaman.
- **Footer:** Tampilkan ringkasan singkat, informasi kontak, dan tautan sosial media.

## 2. Halaman Home (`/`)
Buat `HomeController` dan halaman React.
- **Hero Section:** Buat tampilan banner penyambutan ("Welcome to Alaka Coffee") dengan tombol "Order Now" yang mengarah ke halaman Menu.
- **Favorite Menu Section:** Ambil 4 data menu dari *database* (misalnya 4 menu terbaru atau diacak) dan tampilkan menggunakan komponen `<MenuCard />`. 
- **About Preview:** Sekilas tentang kedai dengan tombol "Learn More" yang mengarah ke halaman About Us.

## 3. Halaman Our Menu (`/menu`)
Buat `MenuPublicController` dan halaman React.
- **Daftar Menu:** Tampilkan seluruh produk yang status stoknya > 0. Gunakan desain *grid* yang rapi.
- **Kategori Filter:** Buat tombol navigasi (tab) berdasarkan data tabel `kategori` untuk memfilter menu (Kopi, Non-Kopi, dsb) secara *real-time* menggunakan *state* React tanpa memuat ulang halaman.
- **Tombol Add to Cart:** Saat ini biarkan hanya mengarah ke halaman *login* jika *user* belum *login*, atau memicu *alert* "Dalam pengembangan" jika sudah *login* (Logika keranjang akan dikerjakan di Feature 05).

## 4. Halaman About Us & Contact (`/about`)
Buat halaman informatif yang estetik.
- **Our Story:** Tampilkan paragraf tentang sejarah dan konsep Alaka Coffee.
- **Contact Information:** Tampilkan data dari tabel `contact_us` (Alamat, Telepon, Email, Instagram). Tambahkan *placeholder* untuk peta visual lokasi.

## 5. Halaman FAQ (`/faq`)
Buat halaman untuk menjawab pertanyaan umum.
- Ambil data dari tabel `faq` dan render menggunakan komponen *Accordion* (judul bisa diklik untuk memunculkan jawaban di bawahnya).