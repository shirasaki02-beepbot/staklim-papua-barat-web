# Website Stasiun Klimatologi Kelas III Papua Barat

Situs informasi iklim resmi Stasiun Klimatologi Kelas III Papua Barat (BMKG) untuk Provinsi Papua Barat dan Papua Barat Daya.
Alamat saat ini: https://staklim-pabar.pages.dev · Halaman admin: https://staklim-pabar.pages.dev/admin

## Arsitektur
| Bagian | Teknologi | Lokasi kode |
|---|---|---|
| Web (halaman publik + panel admin) | HTML, CSS, JavaScript murni (tanpa framework/CMS), dihosting di Cloudflare Pages | `sumber/staklim-papua-barat.html` → dibangun menjadi `situs/` |
| Penerus API `/api/*` dan `sitemap.xml` | Cloudflare Pages advanced mode (`_worker.js`), service binding `DATA` & `ADMIN` | `worker/_worker.js` |
| Robot konten & admin (`staklim-admin`) | Cloudflare Workers, penyimpanan Workers KV (opsional R2) | `worker/staklim-admin-worker.js` |
| Robot data AWS/ARG & info gempa (`staklim-data`) | Cloudflare Workers + MQTT (cloudflare:sockets), cron `*/3 * * * *` | `worker/staklim-data-worker.js` |

Tidak ada server/VM sendiri, tidak ada database SQL, tidak ada akun pengguna umum (pengunjung tanpa login). Hanya satu akun admin.

## Rahasia (tidak disimpan di repositori)
Disimpan sebagai *Secret / Environment variable* di Cloudflare:
- `staklim-admin`: `ADMIN_PASS`
- `staklim-data`: `MQTT_USER`, `MQTT_PASS`, `MQTT_AKUN`, `NEWSDATA_KEY`, `KUNCI`

## Kontrol keamanan yang sudah diterapkan
- Login admin: password dibandingkan dengan waktu tetap; setelah benar diberi token sesi HMAC 12 jam (password tidak disimpan di browser); maks 10 kali salah per 15 menit per IP.
- Unggah file admin: hanya PDF, DOCX, PPTX, JPG, PNG, WebP, GIF; batas ukuran; file disajikan dengan `X-Content-Type-Options: nosniff`, tipe tak dikenal dipaksa unduh.
- Konten dari sumber luar (berita otomatis, BMKG Pusat) di-escape; hanya alamat http(s) yang diterima; pengambil gambar berita (`/og`) dibatasi ke daftar berita yang dikenal.
- Header keamanan untuk semua halaman: CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy, nosniff (`situs/_headers`).
- Pembatas laju per IP (admin 120/menit, data 1.200/menit) di penerus `/api` dan di kedua robot.
- Fitur AI (ringkasan berita & PDF) diperlakukan sebagai data tak tepercaya: teks sumber dibungkus sebagai data, hasil AI dibuang bila berisi instruksi, tautan, kontak, atau pola spam judi online.
- Isi bernada spam judi online ditolak saat disimpan lewat admin (penjagaan bila token admin dicuri); berita otomatis bernada spam tidak ditampilkan.
- CORS API admin hanya untuk asal web sendiri; data publik tetap terbuka.
- Skrip pihak ketiga (pdf.js, jszip) dimuat dengan Subresource Integrity; pdf.js dijalankan dengan `isEvalSupported:false` (mitigasi CVE-2024-4367).
- `/.well-known/security.txt` tersedia untuk pelaporan celah keamanan.
- Endpoint teknis robot data (`/temukan`, `/jalankan`, `/hapus-topik`, `/cari-berita`) memerlukan kunci.

## Membangun ulang situs
```
python3 sumber/build_hosting.py
```
Hasilnya di folder `situs/` lalu diunggah ke Cloudflare Pages. (Dokumen PDF publikasi dan foto pegawai tidak disertakan di repositori.)

Pengelola: Stasiun Klimatologi Kelas III Papua Barat, Manokwari.
