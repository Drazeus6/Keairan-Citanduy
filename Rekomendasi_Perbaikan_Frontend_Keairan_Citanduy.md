# Rekomendasi Perbaikan Frontend — Keairan Citanduy
### Fokus: Frontend-only (backend/data BBWS belum tersedia) · Prioritas Mobile

Dokumen ini merangkum hasil audit terhadap `keairan-citanduy.vercel.app` (Beranda, Dashboard, AquaAlert, Hydro-AMDAL, Metodologi). Semua rekomendasi di bawah **tidak membutuhkan backend atau data BBWS** — murni perbaikan markup, CSS, dan komponen frontend.

---

## Prioritas 1 — Bug Tipografi & Spasi (cepat, dampak besar, makin parah di layar kecil)

| Lokasi | Masalah Ditemukan | Rekomendasi Perbaikan |
|---|---|---|
| Kartu harga (AquaAlert & Hydro-AMDAL) | `✓1 nomor WhatsApp`, `✓Pengguna tidak terbatas` — ikon centang menempel ke teks di **semua** paket harga | Tambahkan `gap` (mis. 8px) antara ikon dan label di komponen list-item fitur yang dipakai bersama oleh kedua halaman |
| Bubble contoh notifikasi WhatsApp (AquaAlert) | `**Keairan Citanduy**· 14:22 WIB`, `**PERINGATAN DINI · WASPADA**Pos Banjar: TMA 312 cm...`, `**PEMUTAKHIRAN · 18:45 WIB**Salinitas terpantau...` — heading tebal menyatu ke paragraf berikutnya | Tambahkan baris baru / `margin-bottom` antara elemen header dan body di komponen bubble |
| Kartu "Layanan 3-in-1" (Beranda) | `Gratisselamanya` — dua kata menyatu | Tambahkan spasi: "Gratis selamanya" |
| Daftar fitur pilar (Beranda) | `- —Notifikasi 12–24 jam...` — bullet dari list dan em dash manual berdempetan jadi dua penanda | Hapus em dash manual, biarkan bullet bawaan komponen list saja |
| Judul H1/H2 semua halaman | `<br/>` di-hardcode per beberapa kata menghasilkan spasi ganda dan berisiko patah aneh di lebar layar sempit (contoh: "Sungai yang  bicara,  kini punya  penerjemah.") | Hapus `<br/>` manual, gunakan CSS `text-wrap: balance` agar line-break menyesuaikan lebar layar secara otomatis |
| Badge "Pilar · Komersial**DEMO**" (AquaAlert & Hydro-AMDAL) | Ribbon/flag staging tertinggal di production | Hapus, atau sembunyikan di balik environment flag yang benar |
| Tombol pratinjau laporan (`/hydro-amdal`) | Teks literal **"Unduh Draf .docx (Placeholder)"** terekspos ke pengunjung | Ganti dengan teks final, atau nonaktifkan tombol dengan label yang jelas (mis. "Segera Hadir") |
| Mini-peta status sungai (Beranda) | `CiamisNORMALTasikWASPADABanjarSIAGACilacapNORMALN` — nama kota, status, dan sisa karakter menyatu tanpa spasi | Bungkus tiap kota+status sebagai chip terpisah dengan `flex-wrap` + `gap`; hapus sisa karakter "N" yang tertinggal |
| Grafik Kurva IDF (`/hydro-amdal`) | Label sumbu dan legenda numpuk jadi satu string tanpa spasi: `Durasi (menit)Intensitas (mm/jam)515306012024048...` | Periksa komponen chart — kemungkinan gagal render dan menyisakan fallback teks aksesibilitas yang tidak disembunyikan (`sr-only`/`display:none`) dengan benar |

---

## Prioritas 2 — Komponen yang Berisiko Pecah Khusus di Mobile

- **Tabel lebar** (tabel parameter SIH3, "Sebelum & Sesudah AquaAlert", tabel analisis frekuensi Hydro-AMDAL): di layar HP ini penyebab paling umum halaman bisa geser horizontal tanpa sengaja.
  - Perbaikan: bungkus dengan container `overflow-x-auto`, atau — lebih baik — ubah jadi tampilan kartu bertumpuk (stacked card) khusus breakpoint mobile; tabel asli hanya tampil dari tablet ke atas.
- **Grafik Kurva IDF**: pastikan pakai container/`viewBox` responsif, bukan lebar piksel tetap, agar tidak overflow atau tulisan jadi terlalu kecil di layar 360px. Pertimbangkan lazy-load chart ini (muat hanya saat masuk viewport) agar tidak memperlambat mobile.
- **Legenda status peta di Beranda**: pastikan `flex-wrap` aktif agar chip status turun ke baris baru dengan rapi di layar sempit, bukan terpotong atau menyempit paksa.
- **Navigasi ganda**: tombol "Buka Dashboard →" muncul dua kali berurutan pada tiap halaman. Uji ulang khusus di breakpoint 768–1024px (tablet) — sering di titik ini versi desktop-nav dan tombol mobile-menu sama-sama tampil karena breakpoint CSS tidak presisi.
- **Target sentuh (tap target)**: pastikan seluruh tombol, ikon centang pada daftar fitur, dan tombol paket harga punya area tap minimal ±44×44px — mudah terlewat kalau desain awal dibuat dari mockup desktop.

---

## Prioritas 3 — Tampilan Sementara Selagi Backend Belum Ada

Karena backend/data BBWS belum terintegrasi, dua bagian ini berisiko terlihat seperti "rusak" oleh pengunjung — padahal ini murni soal presentasi frontend, bukan butuh backend:

- **Halaman `/dashboard`** saat ini hanya menampilkan teks "Memuat dashboard..." tanpa akhir. Ganti dengan **data contoh/mock statis** (misalnya peta dengan status dummy beberapa pos duga air) plus catatan kecil: *"Data real-time akan aktif setelah integrasi dengan BBWS Citanduy."* Ini penting khususnya untuk pengguna mobile dengan koneksi lambat yang akan menunggu lebih lama melihat layar kosong.
- **Tombol yang belum bisa berfungsi penuh** — "Mulai Berlangganan", "Hubungi Sales", "Minta Penawaran", "Coba Bayar-per-Proyek", "Jalankan Analisis →" — daripada diam saat ditekan (berisiko di-tap berkali-kali oleh pengguna mobile), arahkan sementara ke WhatsApp/email pendaftaran minat, mengikuti pola tombol "Daftar Pilot" yang sudah benar menggunakan tautan `mailto:`.

---

## Prioritas 4 — Checklist Performa Mobile Umum

- [ ] Semua `<img>` punya `width` dan `height` eksplisit agar tidak terjadi layout shift saat gambar dimuat (memengaruhi skor Core Web Vitals di HP).
- [ ] Dua gambar artikel yang masih hotlink ke Unsplash dipindahkan menjadi aset sendiri dan diproses lewat pipeline `next/image` yang sama seperti gambar lain, agar ikut teroptimasi otomatis untuk layar kecil.
- [ ] Uji ulang tampilan di lebar layar sungguhan: 360px (Android kecil), 390px (iPhone standar), dan 768px (tablet) — bukan hanya resize jendela browser desktop, karena rendering font dan line-break bisa berbeda hasilnya.
- [ ] Format harga (Rp) disatukan lewat satu fungsi util agar konsisten di semua halaman (saat ini beda gaya spasi/singkatan antara Beranda, AquaAlert, dan Hydro-AMDAL, padahal footer situs sendiri menyatakan mengikuti "Format Numerik: Standar Indonesia").
- [ ] Pastikan Popup di peta ukurannya di sesuaikan ketika web dibuka di mobile agar tetap rapih

---
