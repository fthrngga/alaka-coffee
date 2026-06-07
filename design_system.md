# Design System: Alaka Coffee
**Version:** 1.0
**Brand Concept:** Modern, Calm, Cozy, Artisanal, and Instagrammable.
**Technical Target:** Laravel Inertia + React + shadcn UI

## 1. Design Philosophy & Vibe
Hindari desain yang terlihat seperti "default admin dashboard" atau "template Bootstrap". 
Sistem ini harus terasa hangat, organik, dan premium. 
- **NO Pure White (#FFFFFF) & NO Pure Black (#000000):** Gunakan warna *off-white* (warna oat/krim) untuk *background* dan cokelat sangat gelap untuk teks agar lebih nyaman di mata.
- **Soft Geometry:** Gunakan sudut yang agak membulat (*rounded*) pada elemen UI untuk memberikan kesan *friendly* dan *modern*.
- **Subtle Depth:** Gunakan bayangan (*shadow*) yang sangat lembut dan menyebar, bukan bayangan yang tajam.

## 2. Color Palette (Design Tokens)
Warna harus merepresentasikan elemen kopi: hangat, *earthy*, dan *inviting*.

* **Background Colors:**
    * `bg-base`: `#FAF8F5` (Oat/Cream) - Warna *background* utama untuk seluruh halaman publik.
    * `bg-surface`: `#FFFFFF` - Untuk *Card* menu atau form agar sedikit menonjol dari `bg-base`.
* **Primary Colors (Brand):**
    * `primary-light`: `#8C6A50` (Latte) - Untuk *hover state* pada tombol utama.
    * `primary-base`: `#5C3D2E` (Roasted Coffee) - Warna tombol utama, *header*, dan aksi (*Call to Action*).
    * `primary-dark`: `#3A2318` (Espresso) - Untuk elemen yang butuh penekanan ekstra atau *active state*.
* **Accent/Promo Colors:**
    * `accent-promo`: `#D97757` (Terracotta/Warm Rust) - Khusus untuk *badge* promo, diskon, atau notifikasi keranjang agar *eye-catching* tapi tidak norak.
* **Text Colors:**
    * `text-main`: `#2C1E16` (Very Dark Brown) - Pengganti warna hitam untuk teks utama/paragraf.
    * `text-muted`: `#7E6A5E` (Taupe) - Untuk *placeholder*, teks sekunder, atau keterangan waktu (*order history*).
* **Semantic Colors:**
    * `success`: `#4A7C59` (Matcha Green) - Untuk status pesanan "Selesai" atau "Pembayaran Berhasil".
    * `warning`: `#E2A03F` (Caramel) - Untuk status "Diproses" atau "Pending".

## 3. Typography
Kombinasi *font* ini krusial untuk menghilangkan kesan "template default".

* **Heading Font (Serif):** `Playfair Display`, `Merriweather`, atau `Lora`.
    * *Usage:* Digunakan KHUSUS untuk teks besar: H1, H2, Nama Menu Kopi, dan Judul Halaman.
    * *Styling:* Berikan *letter-spacing* yang sedikit lebih rapat untuk kesan premium.
* **Body Font (Sans-Serif):** `Plus Jakarta Sans`, `Inter`, atau `DM Sans`.
    * *Usage:* Digunakan untuk paragraf, navigasi, deskripsi menu, label form, dan tabel admin.
    * *Styling:* Bersih, modern, dan mudah dibaca dalam ukuran kecil.

## 4. UI Components (React Ecosystem)
Karena stack menggunakan React + Inertia.js, SEMUA elemen UI harus dibangun sebagai Reusable Functional Components yang menerima `props` (bukan hardcoded HTML). Gunakan Tailwind CSS untuk styling.

### A. Buttons (`<Button />`)
Buat komponen Button utama yang menerima props `variant` (primary/secondary), `size`, `className`, dan `processing` (untuk loading state Inertia).
- **Primary:** `bg-primary-base text-white rounded-xl transition-all duration-300 hover:bg-primary-light hover:-translate-y-[1px] hover:shadow-md`
- **Secondary:** `bg-transparent border-[1.5px] border-primary-base text-primary-base rounded-xl hover:bg-primary-base hover:text-white`
- **Disabled/Loading State:** Opacity 50%, non-clickable.

### B. Cards (`<MenuCard />` & `<OrderCard />`)
Buat abstraksi komponen Card agar seragam di seluruh halaman.
- **Base Container:** `bg-surface rounded-2xl border border-[#EAE3DB] overflow-hidden group`
- **Image Section:** Gambar harus proporsional (aspect-ratio), gunakan `object-cover`.
- **Hover Effect:** Saat card di-hover (gunakan class `group-hover`), munculkan shadow cokelat lembut: `shadow-[0_10px_20px_rgba(92,61,46,0.08)]`.

### C. Forms & Inputs (`<TextInput />`, `<SelectInput />`)
Semua input form wajib dibuatkan komponen terpisah untuk menjaga konsistensi state management (onChange, value).
- **Base Style:** `border border-text-muted/30 rounded-lg bg-[#FDFBFA] w-full px-4 py-2`
- **Focus State:** `focus:border-primary-base focus:ring-1 focus:ring-primary-light outline-none transition-colors`
- **Error State:** Jika ada validasi error dari Inertia (`props.errors`), ubah border menjadi merah bata dan tampilkan pesan error mikro di bawah input.

### D. Badges (`<Badge />`)
Komponen kecil untuk status pesanan atau promo.
- **Props:** `type` (promo, success, warning).
- **Base Style:** `rounded-full px-3 py-1 uppercase font-semibold text-xs inline-block`
- **Promo Type:** `bg-accent-promo text-white`

## 5. Layout & Spacing (White Space is King)
- Pastikan jarak antar seksi (seperti dari *Hero Section* ke *Favorite Menu*) terasa sangat lega. Gunakan `py-16` atau `py-24`.
- Jangan buat elemen terlalu berdempetan. Elemen yang bernafas memberikan ilusi kemewahan.
- **Container:** Gunakan maksimal lebar layar `max-w-7xl` untuk *website* utama agar terpusat dan rapi di layar lebar.

## 6. Admin Dashboard Specifics
Meskipun untuk Admin, estetika merek harus tetap dipertahankan.
- **Sidebar:** Gunakan warna `bg-base` dengan *active state* menu menggunakan *background* `primary-light` (opacity 10%) dan teks `primary-base` tebal.
- **Tabel (Manage Orders, dll):** - Header tabel menggunakan *font* Body tebal, *text-muted*, dan *uppercase*.
  - Hilangkan garis vertikal pada tabel, gunakan hanya pembatas garis horizontal tipis antar baris (*row*) agar terlihat modern dan lapang.