# Website Stasiun Klimatologi Kelas III Papua Barat — v15

Kode sumber untuk keperluan Penetration Testing (ITSA) BMKG.

- Alamat uji: https://staklim-papua-barat.devbmkg.my.id (IP lokal 10.21.224.31)
- Admin: https://staklim-papua-barat.devbmkg.my.id/admin

## Susunan

| Folder | Isi | Berjalan di |
|---|---|---|
| `web/` | Tampilan web: HTML, CSS, JavaScript statis (tanpa PHP, tanpa database) | VM BMKG (Nginx 1.24, aaPanel) |
| `robot/staklim-admin-worker.js` | Layanan Admin, konten, permohonan data, masukan, pengaduan, WBS, notifikasi Telegram/Brevo | Cloudflare Workers (KV, R2, Workers AI) |
| `robot/staklim-data-worker.js` | Data AWS/ARG (MQTT), berita, info gempa | Cloudflare Workers (KV) |
| `robot/_worker.js`, `_headers`, `_routes.json` | Penerus `/api` dan header keamanan untuk versi Cloudflare Pages (cadangan) | Cloudflare Pages |
| `server/` | Tambahan konfigurasi Nginx di VM: header keamanan (CSP, HSTS, dll.) dan aturan alamat bersih | VM BMKG |

## Catatan keamanan

- Tidak ada kata sandi, token, atau kunci API di repositori ini. Semua rahasia disimpan sebagai *Secret* di Cloudflare (ADM_PASS, TELEGRAM_TOKEN, BREVO_KEY, KUNCI, NEWSDATA_KEY, MQTT).
- Admin memakai satu sandi (header `X-Admin`), dengan pembatas percobaan login per IP.
- Robot admin hanya menerima kiriman dari asal yang diizinkan (`ASAL_BOLEH`): staklim-pabar.pages.dev, *.bmkg.go.id, staklim-papua-barat.devbmkg.my.id.
- Inline script dibatasi CSP dengan sidik jari sha256 (tanpa `unsafe-inline` untuk skrip).
