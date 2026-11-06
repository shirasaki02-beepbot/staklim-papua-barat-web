/* konten.js — Stasiun Klimatologi Papua Barat
   Buka file ini dengan Notepad untuk menambah publikasi dan berita.
   Perhatikan tanda koma di akhir setiap blok { ... }, dan jangan menghapus tanda [ ] ; */

/* =====================================================================
   KONTEN YANG BISA DIUBAH SENDIRI
   Setelah mengubah, simpan file lalu unggah ulang folder web ke Cloudflare.
   Format tanggal berita: "TTTT-BB-HH", contoh "2026-11-02".
   ===================================================================== */

/* ---- 1. PUBLIKASI ----
   Tambahkan blok baru di PALING ATAS. Isi salah satu:
   - file : PDF di folder "publikasi" pada hosting, contoh "publikasi/Buletin_November_2026.pdf"
            (nama file sebaiknya tanpa spasi, maksimal 25 MB per file)
   - url  : link luar, contoh Google Drive (atur akses "Siapa saja yang memiliki link")
   Jika file dan url kosong, tombol tampil "Segera tersedia". */
const PUBLIKASI=[
 {kategori:"Prakiraan Musim",judul:"Press Release Prediksi Musim Hujan 2026/2027",tanggal:"Oktober 2026",
  ringkas:"Awal, perbandingan terhadap normal, sifat, dan puncak musim hujan 2026/2027 per ZOM di Papua Barat dan Papua Barat Daya, lengkap dengan peta.",
  file:"publikasi/Press_Release_PMH_2026_2027.pdf",url:"",ukuran:"0,6 MB",
  gambar:"img/sampul/pmh-2026-awal.jpg"},
 {kategori:"Prakiraan Musim",judul:"Paparan FGD Prediksi Musim Hujan 2026/2027",tanggal:"15 Oktober 2026",
  ringkas:"Materi Focus Group Discussion: analisis musim, dinamika atmosfer, El Niño, prediksi musim hujan, dan rekomendasi per sektor.",
  file:"publikasi/Paparan_FGD_PMH_2026_2027.pdf",url:"",ukuran:"22 MB",
  gambar:"img/sampul/fgd-pmh-2026.jpg"}
];

/* ---- 2. BERITA RILIS KAMI ----
   Tambahkan blok baru di PALING ATAS.
   id      : nama singkat tanpa spasi, unik (huruf kecil dan tanda -)
   ringkas : 1–2 kalimat untuk daftar berita
   isi     : isi berita; setiap paragraf diapit <p> dan </p>
   gambar  : (opsional) foto di folder "foto" pada hosting, contoh "foto/sli-2026.jpg" */
const BERITA_KAMI=[
 // Contoh: salin blok di bawah ini, hapus tanda // di awal setiap baris, lalu ganti isinya.
 // {id:"sekolah-lapang-iklim-2026",tanggal:"2026-11-20",judul:"Judul berita kami",
 //  ringkas:"Ringkasan satu-dua kalimat.",
 //  isi:"<p>Paragraf pertama.</p><p>Paragraf kedua.</p>",
 //  gambar:"foto/sli-2026.jpg"},
];

/* ---- 3. BERITA DARI MEDIA (LINK LUAR) ----
   Robot sudah mencari berita otomatis tiap 2 jam. Bagian ini untuk berita yang tidak ditemukan robot.
   Salin satu baris, tempel di PALING ATAS, lalu ganti tanggal, judul, nama media, dan link beritanya.
   gambar (opsional): link gambar; jika kosong, gambar diambil otomatis dari halaman berita.
   Saat diklik, pengunjung dibawa ke situs berita tersebut. */
const BERITA_MEDIA=[
 {tanggal:"2026-10-15",judul:"BMKG Prediksi Musim Hujan Papua Barat Mulai Oktober 2026, Warga Diminta Waspada",media:"Papua Dalam Berita",url:"https://papuadalamberita.com/bmkg-prediksi-musim-hujan-papua-barat-mulai-oktober-2026-warga-diminta-waspada/"},
 {tanggal:"2026-10-15",judul:"Satu Ton NaCl untuk Setiap Misi Penaburan di Awan",media:"Papua Dalam Berita",url:"https://papuadalamberita.com/satu-ton-nacl-untuk-setiap-misi-penaburan-di-awan/"},
 {tanggal:"2026-10-15",judul:"BMKG Prediksi Musim Hujan Konsisten di Papua Barat Akhir Oktober, Arah Angin Berbelok ke Timika",media:"Fajar Papua",url:"https://fajarpapua.com/2026/10/15/bmkg-prediksi-musim-hujan-konsisten-di-papua-barat-akhir-oktober-arah-angin-berbelok-ke-timika/"},
 {tanggal:"2026-10-14",judul:"BMKG prediksi musim hujan konsisten di Papua Barat terjadi akhir Oktober",media:"ANTARA",url:"https://papuatengah.antaranews.com/berita/90421/bmkg-prediksi-musim-hujan-konsisten-di-papua-barat-terjadi-akhir-oktober"},
 {tanggal:"2026-10-14",judul:"BMKG Prediksi Musim Hujan Papua Barat Mulai Akhir Oktober 2026",media:"Metro TV",url:"https://www.metrotvnews.com/read/kWDCmLvz-bmkg-prediksi-musim-hujan-papua-barat-mulai-akhir-oktober-2026"},
 {tanggal:"2026-08-27",judul:"BMKG: Sebaran titik panas di Papua Barat alami penurunan",media:"ANTARA",url:"https://papuatengah.antaranews.com/berita/88056/bmkg-sebaran-titik-panas-di-papua-barat-alami-penurunan"},
 {tanggal:"2026-07-14",judul:"BMKG Catat Suhu di Papua Barat Tembus 39,2 Derajat Celsius, Tertinggi Se-Indonesia",media:"iNews",url:"https://www.rctiplus.com/news/detail/inews/5428417/bmkg-catat-suhu-di-papua-barat-tembus-39-2-derajat-celsius--tertinggi-se-indonesia-"}
];

/* ---- 4. SEMBUNYIKAN BERITA ----
   Jika robot menampilkan berita yang tidak sesuai, tempel link-nya di sini (di antara tanda kutip, dipisah koma).
   Contoh: const BERITA_SEMBUNYI=["https://contoh.com/berita-salah"]; */
const BERITA_SEMBUNYI=[];

/* ---- 5. BANNER BERANDA (gambar besar yang berganti otomatis) ----
   judul, teks : tulisan di banner
   label       : tulisan kecil di atas judul
   tombol, link: tombol ajakan, link ke halaman (contoh "#prakiraan-musim") atau situs lain
   gambar      : (opsional) foto di folder "foto", contoh "foto/banner-kantor.jpg" (ukuran lebar ±1600 px).
                 Jika kosong dipakai ilustrasi bawaan: seni:"panas", "hujan", atau "alat". */
const BANNER=[
 {label:"Prediksi Musim Hujan 2026/2027",judul:"Musim hujan mulai akhir Oktober 2026",teks:"6 dari 11 Zona Musim di Papua Barat dan Papua Barat Daya memasuki musim hujan pada Oktober 2026. Simak peta awal, sifat, dan puncak musim hujan.",tombol:"Lihat prakiraan musim",link:"#prakiraan-musim",seni:"hujan",
  gambar:"img/sampul/pmh-2026-awal.jpg",keterangan:"Peta prediksi awal musim hujan 2026/2027"},
 {label:"Pemantauan ENSO",judul:"El Niño sangat kuat bertahan hingga awal 2027",teks:"Indeks Niño 3.4 Agustus–Oktober 2026 mencapai +3,08. Pantau dampaknya terhadap hujan dan kekeringan di wilayah kami.",tombol:"ENSO & IOD",link:"#enso-iod",seni:"enso"},
 {label:"Data Langsung",judul:"13 AWS dan ARG mengirim data langsung",teks:"Suhu, kelembapan, angin, tekanan, radiasi, dan hujan dari lapangan, diperbarui tiap menit beserta grafik 24 jam.",tombol:"Buka data peralatan",link:"#peralatan",seni:"alat"}
];

/* ---- 6. PETA KANTOR ----
   Agar titik peta tepat: buka Google Maps, cari kantor kami, klik Bagikan > Sematkan peta,
   salin alamat di dalam src="..." lalu tempel di embed. link = alamat dari tombol Bagikan > Salin link. */
const PETA_KANTOR={cari:"BMKG Stasiun Klimatologi Manokwari",embed:"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3989.2949151004364!2d134.0247903!3d-0.9280788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d53f32e74dc2bd9%3A0xa88e1119eab665a7!2sBMKG%20Stasiun%20Klimatologi%20Manokwari!5e0!3m2!1sen!2sid!4v1793631253045!5m2!1sen!2sid",link:"https://maps.app.goo.gl/jtLQwLc9pa2eT2RFA"};

/* ---- 7. PEGAWAI (bawaan) ----
   Dipakai bila daftar di halaman Admin > Profil masih kosong. Lebih mudah diubah lewat Admin > Profil:
   jabatan diketik bebas; yang jabatannya berisi "Kepala Stasiun" tampil sebagai pimpinan. */
const PEGAWAI=[
 {nama:"Sony Hartono, S.Si",jabatan:"Kepala Stasiun Klimatologi Kelas III Papua Barat",foto:"img/pegawai/sony.jpg"},
 {nama:"Uci Sanusi, S.E., M.Si",jabatan:"PMG Madya",foto:""},
 {nama:"Agustina Rumbiak, A.Md",jabatan:"Pengolah Data dan Informasi",foto:""},
 {nama:"Femmy Marsitha B., S.Tr, M.Si",jabatan:"PMG Muda",foto:"img/pegawai/femmy.jpg"},
 {nama:"Wendel Jan Pattipeilohy, S.Tr, M.P",jabatan:"PMG Muda",foto:"img/pegawai/wendel.jpg"},
 {nama:"Rosita Rakhim",jabatan:"PMG Pertama",foto:""},
 {nama:"Roy Janro Narumata Rajagukguk",jabatan:"PMG Pertama",foto:"img/pegawai/roy.jpg"},
 {nama:"Arga Ihza Prayoga",jabatan:"PMG Pertama",foto:"img/pegawai/arga.jpg"},
 {nama:"Muhammad Naufal Satria, S.Tr.Klim",jabatan:"PMG Pertama",foto:"img/pegawai/naufal.jpg"},
 {nama:"Afi Fatzi Fathur Wijanarko, S.Tr.Inst",jabatan:"PMG Pertama",foto:"img/pegawai/afi.jpg"},
 {nama:"Muhammad Ichwan Srimulia, S.Tr.Klim",jabatan:"PMG Pertama",foto:"img/pegawai/ichwan.jpg"},
 {nama:"Ryan Fajar Sulistyanto",jabatan:"PMG Pertama",foto:""},
 {nama:"Rohmat Triantoro, S.Tr.Klim",jabatan:"PMG Pertama",foto:""},
 {nama:"M. Fatahilah Raymon, S.Tr.Klim",jabatan:"PMG Pertama",foto:"img/pegawai/fatahilah.jpg"},
 {nama:"Edi Ferdiana Rumbrapuk, S.Tr.Klim",jabatan:"PMG Pertama",foto:"img/pegawai/edi.jpg"},
 {nama:"Dewi",jabatan:"PPNPN",foto:"img/pegawai/dewi.jpg"}];

/* ---- 8. TUKAR DATA DUA AWS ----
   Penamaan di server pusat tertukar: data logger STA2288 berasal dari AWS di kantor kami (Arfai, Manokwari),
   sedangkan data 160009 berasal dari AWS di Ransiki (Manokwari Selatan). Baris ini menukarnya agar tampil benar.
   Bila server pusat sudah diperbaiki, ganti menjadi:  const TUKAR_DATA={};  */
const TUKAR_DATA={"160009":"STA2288","STA2288":"160009"};
