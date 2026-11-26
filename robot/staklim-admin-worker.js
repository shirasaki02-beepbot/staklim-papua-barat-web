// =====================================================================
//  Robot konten Stasiun Klimatologi Papua Barat (Cloudflare Worker)
//  - Halaman admin web (berpassword) menyimpan: info kantor, publikasi,
//    berita kegiatan, dan peringatan dini. File PDF/gambar disimpan di KV.
//  - Tiap 8 jam mengambil rilisan resmi BMKG pusat (content.bmkg.go.id)
//    untuk banner beranda, berita, dan publikasi nasional.
//  Pengaturan di Cloudflare:
//    KV binding  DATA        -> namespace STAKLIM_DATA (sama dengan robot data)
//    Secret      ADMIN_PASS  -> password halaman admin
//    (opsional) Workers AI binding bernama AI untuk "Isi ringkasan dari PDF"
//    (disarankan) R2 bucket binding BERKAS -> bucket staklim-berkas (gratis 10 GB).
//      Bila ada, file baru disimpan di R2; file lama di KV tetap bisa dibuka.
//    Cadangan isi web dibuat otomatis tiap minggu (disimpan 8 minggu terakhir).
//    Cron        0 */8 * * *   (cukup 3 kali sehari; lebih sering membuat server BMKG menolak/429)
// =====================================================================
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Admin, X-Nama-File, X-Lanjut, X-Ke", "Access-Control-Max-Age": "86400" };
// pembatas laju sederhana per alamat IP (di memori server Cloudflare): menahan bot/AI yang membanjiri permintaan
const LAJU = new Map();
function kenaBatas(ip, kunci, maks, detik) {
  if (!ip) return false;
  const k = kunci + "|" + ip, now = Date.now();
  let x = LAJU.get(k); if (!x || x.mulai + detik * 1000 < now) x = { mulai: now, n: 0 };
  x.n++; LAJU.set(k, x); if (LAJU.size > 20000) LAJU.clear();
  return x.n > maks;
}
// permintaan admin hanya diterima browser bila berasal dari web kita sendiri (bukan situs lain)
const ASAL_BOLEH = /^(https:\/\/([a-z0-9-]+\.)?staklim-pabar\.pages\.dev|https:\/\/[a-z0-9-]+\.bmkg\.go\.id|https:\/\/staklim-papua-barat\.devbmkg\.my\.id|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/i;
function corsAdmin(req, res) {
  const asal = req.headers.get("Origin") || "", h = new Headers(res.headers);
  if (ASAL_BOLEH.test(asal)) h.set("Access-Control-Allow-Origin", asal); else h.delete("Access-Control-Allow-Origin");
  h.set("Vary", "Origin"); h.set("Cache-Control", "no-store");
  return new Response(res.body, { status: res.status, headers: h });
}
const json = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS, ...h } });
const K_KONTEN = "konten_admin", K_RIWAYAT = "konten_riwayat", K_BMKG = "bmkg_pusat";
const MAKS_FILE = 25 * 1024 * 1024, MAKS_GAMBAR = 5 * 1024 * 1024;
const JENIS = ["Buletin Iklim", "Prediksi Musim Hujan", "Prediksi Musim Kemarau", "Peringatan Dini", "Informasi Iklim", "Berita Kegiatan", "Akuntabilitas Kinerja", "Lainnya"];
const kosong = () => ({ info: {}, publikasi: [], peringatan: null, sembunyi_bmkg: [], diubah: null });
const teks = (v, n) => String(v == null ? "" : v).replace(/\r/g, "").trim().slice(0, n);
const tglValid = v => /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const httpsAtauKosong = v => { v = teks(v, 2000); return /^https:\/\//.test(v) ? v : ""; };
const buatId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
// ---- penyimpanan file: R2 (BERKAS) bila dipasang, KV (DATA) sebagai cadangan/file lama ----
async function simpanBerkas(env, kunci, badan, meta) {
  if (env.BERKAS) { await env.BERKAS.put(kunci, badan, { customMetadata: meta ? Object.fromEntries(Object.entries(meta).map(([k, v]) => [k, String(v)])) : undefined }); return; }
  await env.DATA.put(kunci, badan, meta ? { metadata: meta } : undefined);
}
async function ambilBerkas(env, kunci) {
  if (env.BERKAS) { const o = await env.BERKAS.get(kunci); if (o) { const m = o.customMetadata || {}; if (m.ukuran) m.ukuran = Number(m.ukuran); return { value: o.body, metadata: m }; } }
  return env.DATA.getWithMetadata(kunci, "stream");
}
async function daftarSemua(env, prefix, r2) {
  const out = []; let cursor;
  do {
    if (r2) { const l = await env.BERKAS.list({ prefix, cursor, include: ["customMetadata"] }); l.objects.forEach(o => out.push({ name: o.key, size: o.size, metadata: o.customMetadata || {} })); cursor = l.truncated ? l.cursor : null; }
    else { const l = await env.DATA.list({ prefix, cursor }); l.keys.forEach(k => out.push({ name: k.name, metadata: k.metadata || {} })); cursor = l.list_complete ? null : l.cursor; }
  } while (cursor);
  return out;
}
const pekanIni = () => { const d = new Date(); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
async function cadanganMingguan(env) {
  const kunci = "cadangan:" + pekanIni();
  if (await env.DATA.get(kunci)) return;
  const isi = await env.DATA.get(K_KONTEN); if (!isi) return;
  await env.DATA.put(kunci, isi, { metadata: { dibuat: new Date().toISOString(), ukuran: isi.length } });
  if (env.BERKAS) await env.BERKAS.put(kunci + ".json", isi).catch(() => {});
  const semua = (await daftarSemua(env, "cadangan:", false)).map(x => x.name).sort().reverse();
  for (const k of semua.slice(8)) await env.DATA.delete(k);
}
// pesan galat AI yang mudah dipahami (kuota gratis Workers AI 10.000 neuron/hari, pulih 00.00 UTC = 09.00 WIT)
const KUOTA_AI = "Kuota AI gratis Cloudflare hari ini sudah habis (pulih pukul 09.00 WIT). Untuk Buletin Iklim tidak perlu AI; untuk dokumen lain isi ringkasan secara manual atau coba lagi besok.";
const galatAI = e => /4006|neuron|daily free|allocation|quota|rate limit|429/i.test(String(e && e.message || e)) ? KUOTA_AI : "";
const ukuranTeks = n => n >= 1048576 ? (n / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";

// kartu Kondisi Iklim Terkini (dari dokumen yang diunggah, bisa dikoreksi lewat admin)
const KUNCI_KONDISI = ["hujan", "prakiraan", "musim", "hth", "spi", "lain"], TOPIK_TEKS = ["hujan", "prakiraan", "musim", "hth", "spi", "enso"];
const angkaAtauNull = v => { const n = v === "" || v == null ? NaN : Number(String(v).replace(",", ".")); return Number.isFinite(n) ? n : null; };
const kartuBersih = a => (Array.isArray(a) ? a : []).slice(0, 12).map(x => ({ kunci: KUNCI_KONDISI.includes(x && x.kunci) ? x.kunci : "lain", judul: teks(x && x.judul, 60), nilai: teks(x && x.nilai, 60), ket: teks(x && x.ket, 160), angka: angkaAtauNull(x && x.angka), src: teks(x && x.src, 120) })).filter(x => x.judul && x.nilai);
const teksBersih = o => { const t = {}; TOPIK_TEKS.forEach(k => { const v = teks(o && o[k], 400); if (v) t[k] = v; }); return t; };
const teksSrcBersih = o => { const t = {}; TOPIK_TEKS.forEach(k => { const v = teks(o && o[k], 160); if (v) t[k] = v; }); return t; };
// isi halaman Iklim (tabel, peta, ZOM) hasil baca dokumen; bisa dibetulkan lewat admin
const BAGIAN_IKLIM = ["analisis", "prakiraan", "ekstrem", "hth", "spi", "musim_hujan", "musim_kemarau"];
function bersihDalam(v, d) {
  if (d > 6) return null;
  if (typeof v === "string") return v.replace(/[<>]/g, "").replace(/\r/g, "").trim().slice(0, 2500);
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "boolean") return v;
  if (Array.isArray(v)) return v.slice(0, 250).map(x => bersihDalam(x, d + 1)).filter(x => x !== null && x !== "");
  if (v && typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v).slice(0, 60)) { const kk = String(k).replace(/[^\w\- ]/g, "").slice(0, 40); const y = bersihDalam(x, d + 1); if (kk && y !== null && y !== "") o[kk] = y; } return o; }
  return null;
}
// isi cadangan yang dipulihkan diperiksa ulang dengan aturan yang sama seperti saat petugas mengisi lewat admin
function bersihCadangan(c) {
  const g = v => /^[a-z0-9]+-g$/.test(v || "") ? v : "";
  const pub = (Array.isArray(c.publikasi) ? c.publikasi : []).slice(0, 500).map(b => ({ id: /^[a-z0-9]{4,24}$/.test(b && b.id || "") ? b.id : buatId(), jenis: JENIS.includes(b && b.jenis) ? b.jenis : "Lainnya", judul: teks(b && b.judul, 200), tanggal: tglValid(b && b.tanggal), ringkas: teks(b && b.ringkas, 600), isi: teks(b && b.isi, 20000),
    banner: !!(b && b.banner), file: /^[a-z0-9]+-d$/.test(b && b.file || "") ? b.file : "", ukuran: teks(b && b.ukuran, 20), nama_file: teks(b && b.nama_file, 120), gambar: g(b && b.gambar), link: httpsAtauKosong(b && b.link), dibuat: teks(b && b.dibuat, 40) })).filter(x => x.judul);
  const i = c.info || {}, wa = String(i.wa || "").replace(/\D/g, "");
  const info = { wa: wa.length >= 10 ? wa : "", email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email || "") ? teks(i.email, 120) : "", alamat: teks(i.alamat, 300), jam: teks(i.jam, 120), ig: teks(String(i.ig || "").replace(/[^\w.]/g, ""), 60), linktree: httpsAtauKosong(i.linktree),
    peta_embed: /^https:\/\/www\.google\.com\/maps\/embed\?[^"'<>\s]*$/.test(i.peta_embed || "") ? teks(i.peta_embed, 2000) : "", peta_link: httpsAtauKosong(i.peta_link) };
  const pr = c.profil && typeof c.profil === "object" ? c.profil : null;
  const profil = pr ? { kepala: teks(pr.kepala, 120), kepala_foto: g(pr.kepala_foto), sambutan: teks(pr.sambutan, 3000), sejarah: teks(pr.sejarah, 8000), visi: teks(pr.visi, 1500), misi: teks(pr.misi, 3000), struktur: g(pr.struktur), foto: (Array.isArray(pr.foto) ? pr.foto : []).map(g).filter(Boolean).slice(0, 12),
    pegawai: (Array.isArray(pr.pegawai) ? pr.pegawai : []).slice(0, 80).map(p => ({ nama: teks(p && p.nama, 120), jabatan: teks(p && p.jabatan, 160), foto: g(p && p.foto) })).filter(p => p.nama) } : null;
  const kd = c.kondisi && typeof c.kondisi === "object" ? c.kondisi : null;
  const pg = c.pengaturan && typeof c.pengaturan === "object" ? Object.fromEntries(KUNCI_PENGATURAN.filter(k => k in c.pengaturan).map(k => [k, PENGATURAN_BERSIH[k] ? PENGATURAN_BERSIH[k](c.pengaturan[k]) : bersihDalam(c.pengaturan[k], 0)])) : null;
  return { ...kosong(), info, publikasi: pub, peringatan: c.peringatan ? bersihDalam(c.peringatan, 0) : null, sembunyi_bmkg: (Array.isArray(c.sembunyi_bmkg) ? c.sembunyi_bmkg : []).map(Number).filter(Number.isFinite).slice(-200),
    profil, kondisi: kd ? { sumber: teks(kd.sumber, 120), ringkasan: teks(kd.ringkasan, 400), kartu: kartuBersih(kd.kartu), teks: teksBersih(kd.teks), teks_src: teksSrcBersih(kd.teks_src), otomatis: teks(kd.otomatis, 160), diubah: teks(kd.diubah, 40) } : null,
    isi_iklim: c.isi_iklim && typeof c.isi_iklim === "object" ? isiIklimBersih(c.isi_iklim) : null, pengaturan: pg, diubah: teks(c.diubah, 40) || null };
}
function isiIklimBersih(b) {
  const o = { sumber: polos(b && b.sumber, 160), diubah: new Date().toISOString() };
  if (b && /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(String(b.dipasang || ""))) o.dipasang = String(b.dipasang).slice(0, 40);
  BAGIAN_IKLIM.forEach(k => { if (b && b[k] && typeof b[k] === "object") o[k] = bersihDalam(b[k], 0); });
  if (b && b.teks_hal && typeof b.teks_hal === "object") { const t = {}; for (const [k, v] of Object.entries(b.teks_hal).slice(0, 40)) { const kk = String(k).replace(/[^\w]/g, "").slice(0, 40); const vv = teks(v, 6000); if (kk && vv) t[kk] = vv; } o.teks_hal = t; }
  o.peta = (Array.isArray(b && b.peta) ? b.peta : []).slice(0, 60).map(x => ({ k: teks(x && x.k, 30), sub: teks(x && x.sub, 20), prov: teks(x && x.prov, 6), bulan: teks(x && x.bulan, 40), judul: teks(x && x.judul, 220), file: /^[a-z0-9]+-g$/.test((x && x.file) || "") ? x.file : "", sumber: teks(x && x.sumber, 160), manual: !!(x && x.manual), tgl: /^\d{4}-\d{2}-\d{2}$/.test((x && x.tgl) || "") ? x.tgl : "" })).filter(x => x.k && x.file);
  return o;
}
const KAB_PB = "Manokwari, Manokwari Selatan, Pegunungan Arfak, Teluk Bintuni, Teluk Wondama, Fakfak, Kaimana";
const KAB_PBD = "Kota Sorong, Kab. Sorong, Raja Ampat, Sorong Selatan, Maybrat, Tambrauw";
const ATURAN = "Anda analis iklim Stasiun Klimatologi Papua Barat (BMKG). Ambil HANYA yang tertulis di teks. Jangan mengarang; bila tidak ada, isi kosong. Teks berasal dari PDF sehingga isi tabel bisa terpotong dan urutannya acak: cocokkan kategori dengan kabupaten berdasarkan kalimat penjelasan bila ada. Balas HANYA JSON tanpa penjelasan.";
const PROMPT_IKLIM = {
  analisis: "Bagian ANALISIS curah hujan dan sifat hujan BULAN LALU (bukan prakiraan). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". Kategori curah hujan: Rendah, Menengah, Tinggi, Sangat Tinggi. Sifat: Bawah Normal, Normal, Atas Normal (boleh rentang mis. 'Normal – Atas Normal'). Format: " +
    '{"bulan":"September 2026","pb":[{"kab":"","ch":"","sh":"","ket":""}],"pbd":[{"kab":"","ch":"","sh":"","ket":""}],"teks_pb":"","teks_pbd":""}. ket = catatan singkat mis. \"Sebagian wilayah Tinggi\". teks_* = 1-2 kalimat ringkasan. Bila dokumen merinci per DISTRIK/kecamatan (tabel atau kalimat), tambahkan juga satu baris per distrik dengan field \"dis\" berisi nama distrik, mis. {\"kab\":\"Manokwari\",\"dis\":\"Masni\",\"ch\":\"Menengah\",\"sh\":\"Normal\",\"ket\":\"\"}; baris kabupaten (tanpa dis) tetap diisi bila ada. Jangan menebak distrik yang tidak tertulis.',
  prakiraan: "Bagian PRAKIRAAN curah hujan dan sifat hujan bulan-bulan mendatang (maks 3 bulan). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". Format: " +
    '{"bulan":[{"bulan":"November 2026","pb":[{"kab":"","ch":"","sh":"","ket":""}],"pbd":[{"kab":"","ch":"","sh":"","ket":""}],"teks":""}]}. Bila dokumen merinci per DISTRIK, tambahkan baris per distrik dengan field \"dis\" (nama distrik) di samping \"kab\"; baris kabupaten tanpa dis tetap diisi bila ada. Jangan menebak distrik yang tidak tertulis.',
  ekstrem: "Bagian curah hujan EKSTREM harian (hujan lebat >=50 mm/hari, sangat lebat >=100 mm/hari). Format: " +
    '{"bulan":"","jumlah_pos":0,"lebat":[{"pos":"","mm":0}],"sangat_lebat":[{"pos":"","mm":0}],"teks":""}',
  hth: "Bagian monitoring HARI TANPA HUJAN (HTH) berturut-turut per dasarian. Kategori: Sangat Pendek 1-5, Pendek 6-10, Menengah 11-20, Panjang 21-30, Sangat Panjang 31-60, Kekeringan Ekstrem >60 hari. Isi JUMLAH POS per kategori. Format: " +
    '{"bulan":"","dasarian":[{"das":"I","sangat_pendek":0,"pendek":0,"menengah":0,"panjang":0,"sangat_panjang":0,"ekstrem":0,"teks":""}],"teks":""}',
  spi: "Bagian Indeks Presipitasi Terstandarisasi (SPI). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". kat contoh: Sangat Kering, Kering, Agak Kering, Normal, Agak Basah, Basah, Sangat Basah, atau rentang 'Kering – Sangat Kering'. Format: " +
    '{"bulan":"","pb":[{"kab":"","kat":"","ket":""}],"pbd":[{"kab":"","kat":"","ket":""}],"teks":""}',
  musim: "Dokumen PREDIKSI MUSIM (hujan atau kemarau). Untuk setiap nomor ZOM (Zona Musim) Papua Barat & Papua Barat Daya isi awal musim (bulan dan tahun, boleh dasarian), perbandingan terhadap normal (Maju/Sama/Mundur), sifat musim (Atas Normal/Normal/Bawah Normal), puncak musim (bulan tahun), dan wilayah (kabupaten beserta distrik dalam kurung). Bila dokumen adalah UPDATE/pemutakhiran prediksi yang menulis \"Sebelum Update ... Setelah Update ...\", isi awal dengan nilai SETELAH update, semula dengan nilai SEBELUM update untuk ZOM itu, dan update = true; selain itu kosongkan semula dan update = false. Format: " +
    '{"jenis":"hujan atau kemarau","periode":"2026/2027","update":false,"zom":[{"no":636,"wil":"","awal":"","semula":"","banding":"","sifat":"","puncak":""}],"teks":""}. teks = 2-3 kalimat ringkasan untuk masyarakat.'
};
const TIPE_GAMBAR = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TIPE_DOK = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

async function bacaKonten(env) { return { ...kosong(), ...((await env.DATA.get(K_KONTEN, "json")) || {}) }; }
// hasil AI diperlakukan sebagai teks biasa: tanpa tautan, tanpa kode, dan ditolak bila berisi instruksi/spam (antisipasi "prompt injection")
const POLA_SPAM = /(slot\s*(gacor|online|88|777|maxwin|demo|thailand)|situs\s*(slot|judi|togel)|judi\s*(online|bola|slot)|\btogel\b|toto\s*(macau|sgp|hk|slot)|\bmaxwin\b|rtp\s*live|scatter\s*hitam|bandar\s*(judi|togel|bola|slot)|mahjong\s*ways|zeus\s*(slot|olympus)|gacor\s*hari\s*ini|agen\s*(slot|judi|togel)|\bjudol\b|casino\s*online|poker\s*online|\bsbobet\b)/i;
const POLA_INSTRUKSI = /(abaikan|lupakan)\s+(semua\s+)?(instruksi|perintah|aturan)|ignore\s+(all\s+|the\s+)?(previous|above|prior)|system\s*prompt|you\s+are\s+now|as\s+an\s+ai|<\/?(script|iframe|a|img)\b/i;
function bersihAI(t, maks) {
  t = String(t || "").replace(/<[^>]*>/g, " ").replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "").replace(/https?:\/\/\S+|www\.\S+|\b[\w.-]+\.(com|net|org|xyz|io|id|co|me|vip|top|site|online)\b\S*/gi, "").replace(/(\+?62|0)8\d[\d\s-]{7,}/g, "").replace(/[`*_#>{}\[\]|]/g, "").replace(/\s+/g, " ").trim();
  if (!t || POLA_SPAM.test(t) || POLA_INSTRUKSI.test(t)) return "";
  return t.slice(0, maks || 400);
}
// penjagaan bila token admin sampai dicuri: isi bernada judi online / tautan spam tidak bisa disimpan
function cekSpam(k) {
  const t = JSON.stringify(k).replace(/\\n/g, " ");
  if (POLA_SPAM.test(t)) { const e = new Error("Isi mengandung kata yang biasa dipakai spam judi online, jadi tidak disimpan. Bila ini keliru, ubah kalimatnya."); e.kode = 400; throw e; }
}
async function simpanKonten(env, k, aksi, req) {
  cekSpam(k);
  const lama = await env.DATA.get(K_KONTEN);
  if (lama) {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    r.unshift({ waktu: new Date().toISOString(), aksi, isi: lama });
    await env.DATA.put(K_RIWAYAT, JSON.stringify(r.slice(0, 20)));
  }
  k.diubah = new Date().toISOString();
  await env.DATA.put(K_KONTEN, JSON.stringify(k));
  await samakanPrivasi(env, lama, k);
  await hapusCache(req);
}
// salin pengaturan privasi ke kunci kecil hanya bila berubah (hemat kuota tulis KV)
async function samakanPrivasi(env, lamaTeks, baru) {
  const ambil = x => { try { const o = typeof x === "string" ? JSON.parse(x || "{}") : (x || {}); return JSON.stringify(privasiBersih(((o && o.pengaturan) || {}).privasi || {})); } catch (e) { return ""; } };
  const a = ambil(lamaTeks), b = ambil(baru);
  if (a !== b) { await env.DATA.put(K_PRIVASI, b); PRIV_MEM = null; }
}
async function hapusCache(req) { try { await caches.default.delete(new Request(new URL(req.url).origin + "/konten")); } catch (e) {} }

// ---- keamanan login admin ----
// Setelah password benar, browser menerima "token sesi" (berlaku 12 jam) sehingga password tidak perlu disimpan di browser.
// Token ditandatangani HMAC dengan ADMIN_PASS, jadi otomatis batal bila password diganti.
const SESI_JAM = 12;
const hexDari = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
async function tandaTangan(kunci, pesan) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(kunci), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hexDari(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(pesan)));
}
async function samaAman(x, y) {
  const e = new TextEncoder();
  const [a, b] = await Promise.all([crypto.subtle.digest("SHA-256", e.encode(x)), crypto.subtle.digest("SHA-256", e.encode(y))]);
  return crypto.subtle.timingSafeEqual(a, b);
}
async function buatToken(env) { const exp = Date.now() + SESI_JAM * 3600e3; return "t1." + exp + "." + await tandaTangan(env.ADMIN_PASS, "sesi:" + exp); }
async function bolehAdmin(req, env) {
  const p = req.headers.get("X-Admin") || "";
  if (!env.ADMIN_PASS || !p) return false;
  const m = /^t1\.(\d{13})\.([0-9a-f]{64})$/.exec(p);
  if (m) return Number(m[1]) > Date.now() && await samaAman(m[2], await tandaTangan(env.ADMIN_PASS, "sesi:" + m[1]));
  return samaAman(p, env.ADMIN_PASS);
}
// pembatas percobaan password: maks 10 kali salah per 15 menit per alamat IP (disimpan di memori & cache, tanpa tulis KV)
const GAGAL = new Map(), BATAS_GAGAL = 10, JEDA_KUNCI = 15 * 60e3;
const ipKlien = req => req.headers.get("CF-Connecting-IP") || req.headers.get("X-Klien-IP") || "tanpa-ip";
async function hitungGagal(req) {
  const ip = ipKlien(req), now = Date.now();
  let g = GAGAL.get(ip); if (g && g.sampai < now) g = null;
  try { const r = await caches.default.match(new Request("https://kunci-admin.local/" + encodeURIComponent(ip))); if (r) { const c = await r.json(); if (c.sampai > now && (!g || c.n > g.n)) g = c; } } catch (e) {}
  return g ? g.n : 0;
}
async function catatGagal(req, ctx) {
  const ip = ipKlien(req), now = Date.now();
  let g = GAGAL.get(ip); if (!g || g.sampai < now) g = { n: 0, sampai: now + JEDA_KUNCI };
  g.n++; GAGAL.set(ip, g); if (GAGAL.size > 5000) GAGAL.clear();
  try { const put = caches.default.put(new Request("https://kunci-admin.local/" + encodeURIComponent(ip)), new Response(JSON.stringify(g), { headers: { "Cache-Control": "max-age=" + Math.ceil(JEDA_KUNCI / 1000) } })); ctx && ctx.waitUntil ? ctx.waitUntil(put) : await put; } catch (e) {}
}

// ---------------------------------------------------------------------
//  Privasi tampilan (Admin > Privasi Tampilan): dokumen & jenis sensor yang tidak dibuka untuk umum.
//  Disalin ke kunci kecil "privasi_publik" (KV yang sama dengan robot data) supaya robot data bisa ikut menyaring.
// ---------------------------------------------------------------------
const K_PRIVASI = "privasi_publik", GRUP_SENSOR = ["suhu", "rh", "angin", "tekanan", "hujan", "radiasi", "baterai"];
let PRIV_MEM = null;
const grupBersih = a => [...new Set((Array.isArray(a) ? a : []).map(String).filter(x => GRUP_SENSOR.includes(x)))];
const perAlatBersih = o => Object.fromEntries(Object.entries(o && typeof o === "object" ? o : {}).filter(([id]) => /^[A-Za-z0-9_-]{2,24}$/.test(id)).slice(0, 60).map(([id, g]) => [id, grupBersih(g)]).filter(([, g]) => g.length));
const BAGIAN_WEB = ["hero", "quick", "peringatan", "kondisi", "gempa", "aws", "produk", "publikasi", "berita", "kontak"], KARTU_WEB = ["enso", "iod", "peringatan", "prediksi", "gelombang", "hujan", "prakiraan", "musim", "hth", "spi"];
const pilih = (a, ok) => [...new Set((Array.isArray(a) ? a : []).map(String).filter(x => ok.includes(x)))];
const PENGATURAN_BERSIH = {
  privasi: v => privasiBersih(v),
  tampilan: v => ({ bagian: pilih(v && v.bagian, BAGIAN_WEB), kartu: pilih(v && v.kartu, KARTU_WEB) }),
  pusat_mode: v => ["otomatis", "pusat", "buletin"].includes(v) ? v : "otomatis",
  // data pos hujan: batas bulan yang boleh dilihat publik ("" = semua) dan tampilan per dasarian
  // tabel kesepakatan UPDATE prakiraan musim hujan (diunggah petugas sebagai Excel); publik hanya mendapat isinya bila tampil = true
  pmh_update: v => { const B = /^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES) 20\d\d$/, b = x => { x = String(x || "").toUpperCase().trim(); return B.test(x) ? x : ""; }, D = /^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES) (I|II|III)$/, d = x => { x = String(x || "").toUpperCase().replace("AGU", "AGT").replace(/\s+/g, " ").trim(); return D.test(x) ? x : ""; };
    const w = String((v && v.diunggah) || "");
    return { tampil: !!(v && v.tampil), sumber: polos(v && v.sumber, 160), label: polos(v && v.label, 60), diunggah: /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(w) ? w.slice(0, 40) : new Date().toISOString(),
      zom: daftarObj(v && v.zom, 30, x => ({ no: /^PAPBAR_\d{2}$/.test(x.no || "") ? x.no : "", tipe: polos(x.tipe, 30), kondisi: polos(x.kondisi, 30), semula: d(x.semula), baru: d(x.baru), puncak: b(x.puncak), prilis: b(x.prilis), normal: d(x.normal), srilis: /^[NAB]$/.test(x.srilis || "") ? x.srilis : "", supd: /^[NAB]$/.test(x.supd || "") ? x.supd : "", web: Number.isInteger(+x.web) && +x.web >= 600 && +x.web <= 700 ? +x.web : 0 }), x => x.no), jenis: v && v.jenis === "kemarau" ? "kemarau" : "hujan", tahun: Number.isInteger(+(v && v.tahun)) && +v.tahun >= 2020 && +v.tahun <= 2100 ? +v.tahun : 0 }; },
  pmk_update: v => ({ ...PENGATURAN_BERSIH.pmh_update(v), jenis: "kemarau" }),
  permohonan: v => ({ aktif: !(v && v.aktif === false), sla: Math.max(1, Math.min(30, Math.round(+(v && v.sla) || 5))), simponi: httpsAtauKosong(v && v.simponi) || "https://www.simponi.kemenkeu.go.id/", wa: polos(v && v.wa, 30).replace(/[^\d+ -]/g, ""),
    simponi_gangguan: !!(v && v.simponi_gangguan), template: daftarObj(v && v.template, 12, x => ({ judul: polos(x.judul, 120), file: /^[a-z0-9]+-d$/.test(x.file || "") ? x.file : "" }), x => x.file && x.judul), turnstile_key: polos(v && v.turnstile_key, 100).replace(/[^\w-]/g, ""), catatan: teks(v && v.catatan, 600) }),
  // Informasi Dasarian buatan kantor (Excel + peta diunggah petugas); publik hanya mendapat "terbaru" bila tampil = true
  info_das: v => {
    const ROM = x => ["I", "II", "III"].includes(x) ? x : "", kat = x => { x = polos(x, 20); return /^(rendah|menengah|tinggi|sangat tinggi)$/i.test(x) ? x.replace(/\b\w/g, c => c.toUpperCase()) : ""; },
      sif = x => { x = polos(x, 20); return /^(bawah normal|normal|atas normal)$/i.test(x) ? x.replace(/\b\w/g, c => c.toUpperCase()) : ""; },
      mm = x => { const n = Number(String(x == null ? "" : x).replace(",", ".")); return x === "" || x == null || !isFinite(n) || n < 0 || n > 3000 ? null : Math.round(n * 10) / 10; },
      JP = ["an_ch", "an_sh", "pr_ch", "pr_sh", "pr_pel", "lain"],
      peta = a => daftarObj(a, 12, x => ({ k: JP.includes(x.k) ? x.k : "lain", file: /^[a-z0-9]+-g$/.test(x.file || "") ? x.file : "", judul: polos(x.judul, 160) }), x => x.file),
      satu = (x, rows) => { if (!x || typeof x !== "object") return null; const das = ROM(x.das), bln = Number.isInteger(+x.bln) && +x.bln >= 1 && +x.bln <= 12 ? +x.bln : 0, thn = Number.isInteger(+x.thn) && +x.thn >= 2020 && +x.thn <= 2100 ? +x.thn : 0; if (!das || !bln || !thn) return null;
        const w = String(x.diunggah || "");
        const o = { id: thn + "-" + String(bln).padStart(2, "0") + "-" + das, das, bln, thn, judul: polos(x.judul, 80), pr_periode: polos(x.pr_periode, 80), teks: teks(x.teks, 800), an_teks: teks(x.an_teks, 1200), pr_teks: teks(x.pr_teks, 1200),
          diunggah: /^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(w) ? w.slice(0, 40) : new Date().toISOString(), peta: peta(x.peta) };
        // edisi dari PDF: highlight, halaman (gambar + uraian), dan PDF asli
        const hl = (Array.isArray(x.hl) ? x.hl : []).slice(0, 6).map(h => teks(h, 400)).filter(Boolean); if (hl.length) o.hl = hl;
        const hal = daftarObj(x.hal, 14, h => ({ k: ["sampul", "an", "pr", "hth", "enso", "musim", "lain"].includes(h.k) ? h.k : "lain", judul: polos(h.judul, 120), sub: polos(h.sub, 160), teks: teks(h.teks, 2000), file: /^[a-z0-9]+-g$/.test(h.file || "") ? h.file : "" }), h => h.file); if (hal.length) o.hal = hal;
        if (x.pdf && /^[a-z0-9]+-d$/.test(x.pdf.file || "")) o.pdf = { file: x.pdf.file, nama: polos(x.pdf.nama, 120), ukuran: Math.max(0, Math.min(1e9, Math.round(+x.pdf.ukuran || 0))) };
        if (x.rilis) o.rilis = polos(x.rilis, 40);
        if (rows) o.rows = daftarObj(x.rows, 500, r => ({ kab: polos(r.kab, 40), dis: polos(r.dis, 50), an_mm: mm(r.an_mm), an_kat: kat(r.an_kat), an_sh: sif(r.an_sh), pr_kat: kat(r.pr_kat), pr_sh: sif(r.pr_sh), ket: polos(r.ket, 160) }), r => r.kab);
        return o; };
    const t = satu(v && v.terbaru, true), ar = (Array.isArray(v && v.arsip) ? v.arsip : []).slice(0, 36).map(x => satu(x, false)).filter(Boolean).filter(x => !t || x.id !== t.id);
    return { tampil: !!(v && v.tampil), terbaru: t, arsip: ar };
  },

  poshujan: v => ({ sampai: /^(20\d\d)-(0[1-9]|1[0-2])$/.test((v && v.sampai) || "") ? v.sampai : "", dasarian: !!(v && v.dasarian) }),
  // tautan Survei Kepuasan Masyarakat: hanya alamat e-SKM BMKG yang diterima
  skm: v => { const u = String((v && v.url) || "").trim(); return { url: u.length <= 300 && /^https:\/\/eskm\.bmkg\.go\.id\/survey\/[A-Za-z0-9\/_.-]+$/.test(u) ? u : "" }; },
  // isi web yang dulu tertulis di kode, sekarang bisa diubah petugas (Admin > Banner & Pintasan, Admin > Teks Halaman)
  banner: v => daftarObj(v, 8, x => ({ label: polos(x.label, 80), judul: polos(x.judul, 160), teks: polos(x.teks, 400), tombol: polos(x.tombol, 40), link: tautanAman(x.link), gambar: gambarAman(x.gambar), keterangan: polos(x.keterangan, 160),
    seni: ["hujan", "panas", "alat", "enso"].includes(x.seni) ? x.seni : "hujan", sampai: /^\d{4}-\d{2}-\d{2}$/.test(x.sampai || "") ? x.sampai : "", aktif: x.aktif !== false, enso: !!x.enso }), x => x.judul),
  pintasan: v => daftarObj(v, 8, x => ({ link: tautanAman(x.link), judul: polos(x.judul, 40), sub: polos(x.sub, 60), ikon: ["cal", "cloud", "alert", "map", "drop", "doc"].includes(x.ikon) ? x.ikon : "map" }), x => x.judul && x.link),
  media: v => daftarObj(v, 60, x => ({ tanggal: /^\d{4}-\d{2}-\d{2}$/.test(x.tanggal || "") ? x.tanggal : "", judul: polos(x.judul, 200), media: polos(x.media, 60), url: /^https:\/\//.test(x.url || "") ? tautanAman(x.url) : "", gambar: /^https:\/\//.test(x.gambar || "") ? tautanAman(x.gambar) : "", ringkas: polos(x.ringkas, 300) }), x => x.judul && x.url && x.tanggal),
  layanan: v => ({ data: (Array.isArray(v && v.data) ? v.data : []).slice(0, 30).map(y => teks(y, 200)).filter(Boolean), tarif: teks(v && v.tarif, 1500), alur: (Array.isArray(v && v.alur) ? v.alur : []).slice(0, 15).map(y => teks(y, 300)).filter(Boolean),
    kalender: daftarObj(v && v.kalender, 10, x => ({ judul: polos(x.judul, 60), isi: polos(x.isi, 300), link: tautanAman(x.link) }), x => x.judul) }),
  teks_baru: v => { const o = {}, L = { clx_kep: 200, clx_promo: 400, clx_judul: 160, clx_isi: 2500, clx_untuk: 600, alur: 1500, aduan_judul: 200, aduan_isi: 600, wbs_judul: 200, wbs_isi: 600, pusat_judul: 200, pusat_isi: 600 };
    for (const [k, n] of Object.entries(L)) { const t = teks(v && v[k], n); if (t) o[k] = t; } return o; },
  teks_web: v => { const a = v && v.awam && typeof v.awam === "object" ? v.awam : {}, aw = {};
    Object.entries(a).slice(0, 60).forEach(([k, x]) => { const kk = String(k).replace(/[^\p{L}\p{N}_\-| .,:?()&;/]/gu, "").slice(0, 140); const l = (Array.isArray(x) ? x : []).slice(0, 15).map(y => teks(y, 600)).filter(Boolean); if (kk && l.length) aw[kk] = l; });
    // teks panjang tidak dibuang tanda < > (mis. "<50 mm"); web selalu meng-escape saat menampilkan
    const tt = v && v.tautan && typeof v.tautan === "object" ? v.tautan : {}, tautan = {};
    ["lapor", "wbs", "ptsp"].forEach(k => { const u = tautanAman(tt[k]); if (u && /^https:/.test(u)) tautan[k] = u; });
    return { awam: aw, privasi: teks(v && v.privasi, 12000), footer_desk: polos(v && v.footer_desk, 400), footer_aka: polos(v && v.footer_aka, 300),
      akses: teks(v && v.akses, 12000), akuntabilitas: teks(v && v.akuntabilitas, 3000), skm_ajak: polos(v && v.skm_ajak, 300), kantor: daftarTeks(v && v.kantor, 2, 200), tautan }; },
};
// teks polos dari petugas: tanda < > dibuang, web tetap meng-escape saat menampilkan
function polos(v, n) { return teks(v, n).replace(/[<>]/g, ""); }
function tautanAman(u) { u = String(u || "").trim(); return u.length <= 500 && (/^https:\/\/[^\s"'<>]+$/.test(u) || /^#[a-z0-9-]{1,60}$/.test(u)) ? u : ""; }
function gambarAman(g) { g = String(g || "").trim(); return /^[a-z0-9]{6,}-g$/.test(g) || /^(img|foto)\/[\w\/.-]{1,120}\.(jpe?g|png|webp)$/i.test(g) && !g.includes("..") ? g : ""; }
function daftarTeks(a, n, m) { return (Array.isArray(a) ? a : []).slice(0, n).map(x => polos(x, m)).filter(Boolean); }
function daftarObj(a, n, f, sah) { return (Array.isArray(a) ? a : []).slice(0, n).filter(x => x && typeof x === "object").map(f).filter(sah); }
const KUNCI_PENGATURAN = ["teks_baru", "sembunyi_pub", "alat", "wilayah", "privasi", "tampilan", "pusat_mode", "skm", "banner", "pintasan", "media", "layanan", "teks_web", "poshujan", "pmh_update", "pmk_update", "info_das", "permohonan"];
const privasiBersih = v => ({ sembunyi_dok: !!(v && v.sembunyi_dok), sembunyi_csv: !!(v && v.sembunyi_csv), sensor: grupBersih(v && v.sensor), alat: perAlatBersih(v && v.alat), alat_logger: perAlatBersih(v && v.alat_logger) });
async function bacaPrivasi(env) {
  if (PRIV_MEM && PRIV_MEM.t > Date.now() - 30000) return PRIV_MEM.v;
  let v = null; try { v = await env.DATA.get(K_PRIVASI, { type: "json", cacheTtl: 60 }); } catch (e) {}
  PRIV_MEM = { t: Date.now(), v: privasiBersih(v || {}) }; return PRIV_MEM.v;
}

// ---------------------------------------------------------------------
//  Rilisan BMKG pusat
// ---------------------------------------------------------------------
const KAT = { 2: "Siaran Pers", 1: "Berita", 59: "Klimatologi", 233: "Buletin Iklim", 60: "Informasi Hujan Bulanan", 208: "SPI", 825: "Prakiraan Hujan", 8: "Outlook El Niño", 725: "Potensi Banjir", 899: "Index El Niño", 1638: "Anomali Suhu Udara", 1639: "Fakta Perubahan Iklim" };
const KAT_IKLIM = [59, 233, 60, 208, 825, 8, 725, 899, 1638, 1639];
const POLA_IKLIM = /iklim|musim|el ?ni[ñn]o|la ?ni[ñn]a|kemarau|kekeringan|hujan|siklon|karhutla|kabut asap|banjir|cuaca ekstrem|suhu|panas|modifikasi cuaca|dipole|\biod\b|hidrometeorologi/i;
const POLA_PAPUA = /papua barat|manokwari|sorong|raja ampat|fakfak|kaimana|bintuni|wondama|tambrauw|maybrat|pegunungan arfak/i;
// berita yang hanya tentang daerah lain (mis. "Kota Baubau") tidak ditampilkan; nasional dan Papua tetap
const POLA_NASIONAL = /indonesia|nasional|nusantara|seluruh wilayah|tanah air|\bri\b|dunia|global/i, POLA_DAERAH_LAIN = /\b(kota|kabupaten|kab\.)\s+[a-z]|aceh|sumatera|sumut|sumbar|riau|jambi|bengkulu|lampung|bangka|belitung|banten|jakarta|jabodetabek|jawa|jabar|jateng|jatim|yogyakarta|diy|bali|nusa tenggara|\bntt\b|\bntb\b|kalimantan|kalbar|kalteng|kalsel|kaltim|kaltara|sulawesi|sulsel|sulteng|sultra|sulut|sulbar|gorontalo|maluku|ambon|ternate|baubau|kendari|makassar|manado|palu|mataram|kupang/i;
const daerahLain = (judul, papua) => !papua && POLA_DAERAH_LAIN.test(judul) && !POLA_NASIONAL.test(judul);
const dekode = t => String(t || "").replace(/<[^>]+>/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\[&hellip;\]|&hellip;/g, "…").replace(/\s+/g, " ").trim();
function alamatBmkg(p) {
  const c = p.categories || [];
  if (c.includes(2)) return "https://www.bmkg.go.id/siaran-pers/" + p.slug;
  if (c.some(x => KAT_IKLIM.includes(x))) return "https://www.bmkg.go.id/iklim/" + p.slug;
  return "https://www.bmkg.go.id/berita/utama/" + p.slug;
}
const DASAR_BMKG = "https://content.bmkg.go.id/wp-json/wp/v2/posts?_fields=id,date,slug,title,categories,excerpt,jetpack_featured_media_url&per_page=40";
const SUMBER_BMKG = [DASAR_BMKG + "&categories=2,59,233,60,208,825,8,725", DASAR_BMKG + "&search=" + encodeURIComponent("Papua Barat"), DASAR_BMKG.replace("per_page=40", "per_page=60") + "&categories=" + KAT_IKLIM.join(","), DASAR_BMKG.replace("per_page=40", "per_page=30") + "&categories=1"];
// kategori "Berita" BMKG berisi banyak kegiatan umum; hanya yang judulnya jelas tentang iklim yang ditampilkan
const BERITA_IKLIM = /iklim|el ?ni[ñn]o|la ?ni[ñn]a|musim|kemarau|kekeringan|hujan|siklon|karhutla|kabut asap|banjir|modifikasi cuaca|\bomc\b|dipole|hidrometeorologi|cuaca ekstrem/i,
  BERITA_BUKAN = /siswa|mahasiswa|sekolah|\bsd\b|smp|sma|wisuda|taruna|stmkg|lantik|pajak|hari pahlawan|seleksi|belajar|bermain|kunjungan|kunjungi|gempa|tsunami/i;
const tidur = ms => new Promise(r => setTimeout(r, ms));
// posting kiriman browser petugas (Admin > Ambil rilisan) diperiksa ketat sebelum dipakai
function postSah(p) {
  if (!p || typeof p !== "object" || !Number.isInteger(p.id) || p.id <= 0) return null;
  const t = v => (v && typeof v.rendered === "string" ? { rendered: v.rendered.slice(0, 3000) } : { rendered: "" });
  const g = String(p.jetpack_featured_media_url || "");
  return { id: p.id, date: /^\d{4}-\d{2}-\d{2}T[\d:]+$/.test(String(p.date || "")) ? p.date : "", slug: /^[a-z0-9%_-]{1,200}$/i.test(String(p.slug || "")) ? p.slug : String(p.id),
    title: t(p.title), excerpt: t(p.excerpt), categories: (Array.isArray(p.categories) ? p.categories : []).filter(Number.isInteger).slice(0, 20),
    jetpack_featured_media_url: /^https:\/\/(content\.bmkg\.go\.id|i[0-3]\.wp\.com)\/[^\s"'<>]{1,400}$/.test(g) ? g : "" };
}
// server BMKG kadang membalas 429 (terlalu banyak permintaan dari jaringan Cloudflare): ambil satu per satu, coba ulang dengan jeda
async function ambilSatu(u) {
  let akhir = "";
  for (let i = 0; i < 3; i++) {
    if (i) await tidur(i === 1 ? 2500 : 6000);
    try {
      const r = await fetch(u, { headers: { "User-Agent": "StaklimPapbarBot/1.0 (+https://staklim-pabar.pages.dev)", Accept: "application/json" } });
      if (r.ok) return { data: await r.json() };
      akhir = "HTTP " + r.status;
      if (r.status !== 429 && r.status < 500) break;
      const ra = +r.headers.get("Retry-After"); if (ra > 0 && ra <= 10) await tidur(ra * 1000);
    } catch (e) { akhir = String(e).slice(0, 80); }
  }
  return { galat: akhir };
}
// Salinan rilisan iklim BMKG Pusat (dinamika atmosfer, peringatan dini, peta hujan, SPI, gelombang) untuk pengunjung
// yang browsernya tidak bisa menghubungi server BMKG langsung. Disimpan apa adanya; web yang menguraikannya.
const K_PUSAT = "bmkg_pusat_mentah";
const PUSAT_Q = { a: "categories=59&search=" + encodeURIComponent("Dinamika Atmosfer Dasarian") + "&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=6",
  b: "categories=60&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1", s: "categories=208&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1", w: "categories=1768&_fields=id,date,slug,title,content&per_page=1" };
function postPusat(x) { if (!x || typeof x !== "object" || !x.id) return null; const r = v => ({ rendered: String((v && v.rendered) || "").slice(0, 60000) });
  return { id: +x.id || 0, date: String(x.date || "").slice(0, 25), slug: String(x.slug || "").replace(/[^a-z0-9-]/gi, "").slice(0, 200), title: r(x.title), content: r(x.content), jetpack_featured_media_url: /^https:\/\//.test(x.jetpack_featured_media_url || "") ? String(x.jetpack_featured_media_url).slice(0, 500) : "" }; }
async function simpanPusat(env, masuk) { const lama = (await env.DATA.get(K_PUSAT, "json")) || {}; let ada = false; const out = { ...lama };
  for (const k of Object.keys(PUSAT_Q)) { const a = (Array.isArray(masuk && masuk[k]) ? masuk[k] : []).slice(0, 6).map(postPusat).filter(Boolean); if (a.length) { out[k] = a; ada = true; } }
  if (!ada) return false; out.t = Date.now(); const isi = JSON.stringify(out); if (isi.length > 900000) return false; await env.DATA.put(K_PUSAT, isi); return true; }
async function ambilPusatMentah(env) { const masuk = {}; for (const [k, q] of Object.entries(PUSAT_Q)) { await tidur(1200); const h = await ambilSatu("https://content.bmkg.go.id/wp-json/wp/v2/posts?" + q); if (!h.galat) masuk[k] = h.data; } return simpanPusat(env, masuk); }
// ---------------------------------------------------------------------
//  Rincian wilayah peringatan dini IKLIM (dasarian) dari halaman BMKG Pusat:
//  curah hujan tinggi & kekeringan meteorologis, baris Papua Barat dan Papua Barat Daya (kabupaten + distrik).
//  Bila tampilan BMKG berubah dan tabel tak terbaca, data lama TIDAK ditimpa (kartu tetap tampil tanpa rincian).
// ---------------------------------------------------------------------
const K_WILPER = "bmkg_wilayah_per";
const URL_WILPER = { hujan: "https://www.bmkg.go.id/peringatan-dini/curah-hujan/dasarian", kering: "https://www.bmkg.go.id/peringatan-dini/kekeringan-meteorologis" };
const PROV_WILPER = { "papua barat": "pb", "papua barat daya": "pbd" };
const teksPer = (x, n) => String(x || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;|&gt;|&quot;|&#0?39;/g, "").replace(/[<>"]/g, "").replace(/\s+/g, " ").trim().slice(0, n || 200);
function bacaTabelPer(html) {
  html = String(html || "");
  const j = /Peringatan Dini [^<]{0,60}?(Dasarian\s+(I{1,3})\s+([A-Za-z]+)\s+(\d{4})\s*\(([^)<]{3,60})\))/.exec(html);
  if (!j || html.indexOf("<table") < 0) return null;
  const isiSel = sel => /^\s*(<!--[^>]*-->\s*)*-?\s*(<!--[^>]*-->\s*)*$/.test(sel) ? [] :
    [...sel.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].slice(0, 40).map(m => { const b = /<span[^>]*>([\s\S]*?)<\/span>([\s\S]*)/.exec(m[1]);
      return b ? { kab: teksPer(b[1], 80), dis: teksPer(b[2], 600).split(/\s*,\s*/).filter(Boolean).slice(0, 60) } : { kab: teksPer(m[1], 80), dis: [] }; }).filter(x => x.kab);
  const out = { berlaku: teksPer(j[1], 90), das: j[2], bulan: j[3], tahun: j[4], pb: null, pbd: null, nprov: 0 };
  for (const m of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const td = [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(x => x[1]); if (td.length < 5) continue; out.nprov++;
    const kode = PROV_WILPER[teksPer(td[1], 60).toLowerCase()]; if (!kode) continue;
    out[kode] = { waspada: isiSel(td[2]), siaga: isiSel(td[3]), awas: isiSel(td[4]) };
  }
  for (const k of ["pb", "pbd"]) if (!out[k]) out[k] = { waspada: [], siaga: [], awas: [] };
  return out;
}
async function ambilWilayahPer(env) {
  const lama = (await env.DATA.get(K_WILPER, "json")) || {}, baru = { ...lama }; let berubah = false;
  for (const [jenis, u] of Object.entries(URL_WILPER)) {
    try {
      const r = await fetch(u, { headers: { "User-Agent": "StaklimPapbarBot/1.0 (+https://staklim-pabar.pages.dev)", Accept: "text/html" } });
      if (!r.ok) { baru[jenis] = { ...(lama[jenis] || {}), galat: "HTTP " + r.status, dicoba: Date.now() }; berubah = true; continue; }
      const t = await r.text(), h = bacaTabelPer(t.slice(0, 2e6));
      if (!h) { baru[jenis] = { ...(lama[jenis] || {}), galat: "Tabel di halaman BMKG tidak terbaca (tampilan mungkin berubah)", dicoba: Date.now() }; berubah = true; continue; }
      baru[jenis] = { ...h, url: u, diambil: Date.now() }; berubah = true;
    } catch (e) { baru[jenis] = { ...(lama[jenis] || {}), galat: String(e).slice(0, 80), dicoba: Date.now() }; berubah = true; }
    await tidur(800);
  }
  if (berubah) await env.DATA.put(K_WILPER, JSON.stringify(baru));
  return baru;
}
async function ambilBmkg(env, kiriman) {
  const peta = new Map(), galat = [];
  if (Array.isArray(kiriman)) {
    for (const p0 of kiriman.slice(0, 300)) { const p = postSah(p0); if (p && !peta.has(p.id)) peta.set(p.id, p); }
  } else {
    for (const [i, u] of SUMBER_BMKG.entries()) {
      if (i) await tidur(1200);
      const h = await ambilSatu(u);
      if (h.galat) { galat.push((u.includes("search") ? "pencarian Papua: " : "kategori: ") + h.galat); continue; }
      for (const p of Array.isArray(h.data) ? h.data : []) if (p && p.id && !peta.has(p.id)) peta.set(p.id, p);
    }
  }
  if (!peta.size) {
    const lama = (await env.DATA.get(K_BMKG, "json")) || {};
    lama.galat = galat.join("; ") || "Tidak ada data";
    lama.dicoba = new Date().toISOString();
    await env.DATA.put(K_BMKG, JSON.stringify(lama));
    return lama;
  }
  const sekarang = Date.now();
  const semua = [...peta.values()].map(p => {
    const judul = dekode(p.title && p.title.rendered), ringkas = dekode(p.excerpt && p.excerpt.rendered).slice(0, 280);
    const c = p.categories || [], t = judul + " " + ringkas;
    return { id: p.id, tanggal: String(p.date || "").slice(0, 10), judul, ringkas, url: alamatBmkg(p), gambar: p.jetpack_featured_media_url || "",
      kategori: c.map(x => KAT[x]).filter(Boolean), kat: c, papua: POLA_PAPUA.test(t), iklim: POLA_IKLIM.test(t) && !/gempa|tsunami/i.test(judul),
      beritaIklim: c.includes(1) && BERITA_IKLIM.test(judul) && !BERITA_BUKAN.test(judul), lain: daerahLain(judul, POLA_PAPUA.test(t)) };
  }).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  const umur = x => (sekarang - Date.parse(x.tanggal)) / 864e5;
  const besar = semua.filter(x => x.iklim && (x.kat.includes(2) || x.papua) && umur(x) <= 14).slice(0, 4);
  const berita = semua.filter(x => (x.iklim && (x.kat.includes(2) || x.papua) || x.beritaIklim) && umur(x) <= 180).slice(0, 15).map(({ beritaIklim, lain, ...x }) => x);
  const produk = [233, 60, 825, 208, 8].map(k => semua.find(x => x.kat.includes(k))).filter(Boolean);
  const dinat = semua.find(x => /dinamika atmosfer/i.test(x.judul));
  if (dinat && !produk.includes(dinat)) produk.push(dinat);
  // untuk halaman-halaman Iklim: produk iklim terbaru BMKG pusat (dipilah per halaman di web)
  const iklim = semua.filter(x => x.kat.some(c => KAT_IKLIM.includes(c)) || (x.iklim && x.kat.includes(2))).slice(0, 60)
    .map(x => ({ id: x.id, tanggal: x.tanggal, judul: x.judul, ringkas: x.ringkas.slice(0, 200), url: x.url, gambar: x.gambar, kat: x.kat, papua: x.papua }));
  semua.forEach(x => { delete x.beritaIklim; delete x.lain; });
  const hasil = { diambil: new Date().toISOString(), galat: galat.join("; ") || null, besar, berita, produk, iklim };
  if (galat.length) {
    // sebagian sumber gagal: rilisan lama yang tidak terambil kali ini tetap dipertahankan
    const lama = (await env.DATA.get(K_BMKG, "json")) || {}, gabung = (a, b, n) => { const s = new Set(); return [...(a || []), ...(b || [])].filter(x => x && !s.has(x.id) && s.add(x.id)).sort((x, y) => String(y.tanggal).localeCompare(String(x.tanggal))).slice(0, n); };
    hasil.besar = gabung(besar, (lama.besar || []).filter(x => umur(x) <= 14), 4); hasil.berita = gabung(berita, lama.berita, 15); hasil.iklim = gabung(iklim, lama.iklim, 60);
    if (lama.produk) { const sm = gabung(produk, lama.produk, 30), pr = [233, 60, 825, 208, 8].map(k => sm.find(x => (x.kat || []).includes(k))).filter(Boolean), dn = sm.find(x => /dinamika atmosfer/i.test(x.judul)); if (dn && !pr.includes(dn)) pr.push(dn); hasil.produk = pr; }
    hasil.galat = "Sebagian rilisan belum terambil (" + galat.join("; ") + "). Rilisan sebelumnya tetap dipakai.";
  }
  await env.DATA.put(K_BMKG, JSON.stringify(hasil));
  return hasil;
}

// ---------------------------------------------------------------------
//  Ringkasan otomatis dari PDF (opsional, butuh binding AI)
// ---------------------------------------------------------------------
async function ringkasPdf(env, blob, nama) {
  if (!env.AI) return { galat: "Fitur AI belum dipasang (binding AI). Isi ringkasan secara manual." };
  try {
    const md = await env.AI.toMarkdown([{ name: nama || "dokumen.pdf", blob }]);
    const isi = String((md && md[0] && md[0].data) || "").replace(/\s+/g, " ").slice(0, 6000);
    if (!isi) return { galat: "Isi PDF tidak terbaca (mungkin berupa gambar hasil pindai)." };
    const r = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { max_tokens: 220, messages: [
      { role: "system", content: "Anda staf humas Stasiun Klimatologi Papua Barat (BMKG). Dari isi dokumen, tulis JSON {\"judul\":\"...\",\"ringkas\":\"...\"}. judul maksimal 12 kata. ringkas 1-2 kalimat bahasa Indonesia baku untuk masyarakat, memakai sudut pandang 'kami', tanpa menambah fakta. Hanya JSON." },
      { role: "user", content: isi }] });
    const t = String(r.response || ""), m = t.match(/\{[\s\S]*\}/);
    let o = {}; try { o = JSON.parse(m ? m[0] : t); } catch (e) { o = { ringkas: t.trim() }; }
    return { judul: bersihAI(o.judul, 200), ringkas: bersihAI(o.ringkas, 600) };
  } catch (e) { return { galat: galatAI(e) || "AI gagal membaca: " + (e && e.message ? e.message : e) }; }
}

// ---------------------------------------------------------------------
//  Kirim Masukan dari pengunjung (formulir di bagian bawah web)
//  Disimpan di kunci "masukan" (tidak ikut /konten publik). Alamat IP TIDAK disimpan; hanya dipakai sesaat untuk membatasi kiriman.
//  Status: baru -> ditangani (nama petugas) -> selesai (wajib catatan). Otomatis terhapus setelah 6 bulan.
// ---------------------------------------------------------------------
const K_MASUKAN = "masukan", JENIS_MASUKAN = ["kesalahan", "saran", "pertanyaan", "kritik", "pengaduan"], UMUR_MASUKAN = 183 * 864e5, MAKS_MASUKAN = 300, MAKS_BARU = 100;
const LAJU_MASUKAN = new Map();
async function bolehKirimMasukan(ip, ctx) {
  // maks 3 kiriman per 10 menit dan 10 per hari per alamat IP (memori + cache, tanpa tulis KV)
  const now = Date.now(), k = "https://masukan.local/" + encodeURIComponent(ip || "tanpa-ip");
  let g = LAJU_MASUKAN.get(k);
  try { const r = await caches.default.match(new Request(k)); if (r) { const c = await r.json(); if (!g || (c.hari || []).length > (g.hari || []).length) g = c; } } catch (e) {}
  g = g || { hari: [] }; g.hari = (g.hari || []).filter(t => now - t < 864e5);
  if (g.hari.length >= 10 || g.hari.filter(t => now - t < 600e3).length >= 3) return false;
  g.hari.push(now); LAJU_MASUKAN.set(k, g); if (LAJU_MASUKAN.size > 5000) LAJU_MASUKAN.clear();
  try { const p = caches.default.put(new Request(k), new Response(JSON.stringify(g), { headers: { "Cache-Control": "max-age=86400" } })); ctx && ctx.waitUntil ? ctx.waitUntil(p) : await p; } catch (e) {}
  return true;
}
const rapikanMasukan = a => (Array.isArray(a) ? a : []).filter(x => x && x.id && Date.now() - Date.parse(x.waktu || 0) < UMUR_MASUKAN);
async function terimaMasukan(req, env, ctx) {
  const asal = req.headers.get("Origin") || "";
  if (!ASAL_BOLEH.test(asal)) return json({ galat: "Kiriman hanya diterima dari web resmi." }, 403);
  const mentah = await req.text().catch(() => "");
  if (mentah.length > 6000) return json({ galat: "Pesan terlalu panjang." }, 413);
  let d = null; try { d = JSON.parse(mentah); } catch (e) { d = null; }
  if (!d || typeof d !== "object") return json({ galat: "Isi kiriman tidak terbaca." }, 400);
  // jebakan robot: kolom tersembunyi harus kosong dan formulir tidak diisi secepat kilat
  if (d.situs || !(Number(d.lama) >= 3000)) return json({ ok: true });
  const jenis = JENIS_MASUKAN.includes(d.jenis) ? d.jenis : "", isi = teks(d.isi, 1500), kontak = teks(d.kontak, 120), halaman = /^[a-z0-9-]{0,80}$/.test(d.halaman || "") ? (d.halaman || "beranda") : "beranda";
  if (!jenis) return json({ galat: "Pilih jenis masukan." }, 400);
  if (isi.length < 10) return json({ galat: "Tulis masukan minimal 10 huruf." }, 400);
  if (/(https?:\/\/[^\s]+.*){3,}/i.test(isi)) return json({ galat: "Masukan berisi terlalu banyak tautan." }, 400);
  if (!(await bolehKirimMasukan(ipKlien(req), ctx))) return json({ galat: "Anda sudah mengirim beberapa masukan. Coba lagi nanti." }, 429);
  const daftar = rapikanMasukan(await env.DATA.get(K_MASUKAN, "json"));
  if (daftar.filter(x => x.status === "baru").length >= MAKS_BARU) return json({ galat: "Kotak masukan sedang penuh. Silakan hubungi kami lewat WhatsApp atau email." }, 503);
  const wit = new Date(Date.now() + 9 * 3600e3), awal = "AD-" + String(wit.getUTCFullYear()).slice(2) + String(wit.getUTCMonth() + 1).padStart(2, "0") + "-";
  const no = ((await env.DATA.get("aduan:no:" + awal, "json")) || 0) + 1; await env.DATA.put("aduan:no:" + awal, JSON.stringify(no));
  const tiket = awal + String(no).padStart(4, "0");
  daftar.unshift({ id: buatId(), tiket, waktu: new Date().toISOString(), jenis, isi, kontak, halaman, status: "baru", petugas: "", catatan: "", balasan: "", diubah: "" });
  // simpan maks 300: yang sudah selesai dan paling lama dibuang lebih dulu
  while (daftar.length > MAKS_MASUKAN) { const i = daftar.map(x => x.status).lastIndexOf("selesai"); daftar.splice(i >= 0 ? i : daftar.length - 1, 1); }
  await env.DATA.put(K_MASUKAN, JSON.stringify(daftar));
  if (["pengaduan", "kritik"].includes(jenis) && ctx && ctx.waitUntil) ctx.waitUntil(kirimPush(env, { judul: (jenis === "pengaduan" ? "Pengaduan baru" : "Kritik baru") + " · " + tiket, isi: isi.slice(0, 120), tiket: "" }).catch(() => null));
  // v12: semua jenis masukan juga diteruskan ke bot Telegram dan email petugas (grup hanya berisi admin, jadi kontak ikut dikirim)
  if (ctx && ctx.waitUntil) ctx.waitUntil(beritahuMasukan(env, { tiket, jenis, isi, kontak, halaman }).catch(() => null));
  return json({ ok: true, tiket });
}
const NAMA_MASUKAN = { kesalahan: "Laporan kesalahan", saran: "Saran", pertanyaan: "Pertanyaan", kritik: "Kritik", pengaduan: "Pengaduan" };
async function beritahuMasukan(env, m) {
  const nm = NAMA_MASUKAN[m.jenis] || "Masukan", ikon = m.jenis === "pengaduan" ? "🚨" : m.jenis === "kritik" ? "⚠️" : "💬";
  const tele = await kirimTele(env, `${ikon} <b>${nm} baru</b>\nTiket: <b>${escH(m.tiket)}</b>\nHalaman: ${escH(m.halaman)}\nKontak: ${escH(m.kontak || "-")}\n\n${escH(m.isi.slice(0, 700))}${m.isi.length > 700 ? "…" : ""}\n\nTanggapi di Admin › Masukan.`);
  const c = await pdNotifCfg(env); let email = { ok: false, galat: "Email petugas belum diisi" };
  if ((c.email_admin || []).length) email = await kirimEmail(env, c.email_admin, `[${m.tiket}] ${nm} baru dari web`, bungkusEmail(nm + " baru", `<p>Tiket <b>${escH(m.tiket)}</b> · halaman <b>${escH(m.halaman)}</b></p><p>Kontak pengirim: <b>${escH(m.kontak || "-")}</b></p><blockquote style="border-left:4px solid #0133cc;margin:12px 0;padding:8px 12px;background:#f1f5f9;white-space:pre-wrap">${escH(m.isi)}</blockquote><p><a href="${SITUS}/admin">Buka Admin › Masukan</a> untuk menanggapi.</p>`));
  return { tele, email };
}
async function ubahMasukan(env, b) {
  const daftar = rapikanMasukan(await env.DATA.get(K_MASUKAN, "json")), i = daftar.findIndex(x => x.id === String(b.id || ""));
  if (i < 0) return json({ galat: "Masukan tidak ditemukan (mungkin sudah dihapus petugas lain)." }, 404);
  if (b.hapus) daftar.splice(i, 1);
  else {
    const x = daftar[i], status = ["baru", "ditangani", "selesai"].includes(b.status) ? b.status : x.status;
    const petugas = polos(b.petugas, 60) || x.petugas, catatan = polos(b.catatan, 600);
    if (status === "ditangani" && petugas.length < 2) return json({ galat: "Tulis nama petugas yang menangani." }, 400);
    if (status === "selesai" && catatan.length < 3) return json({ galat: "Tulis catatan singkat apa yang sudah dilakukan." }, 400);
    if (status === "selesai" && x.tiket && polos(b.balasan, 800).length < 3) return json({ galat: "Tulis tanggapan untuk pelapor. Pelapor perlu tahu apa yang sudah dilakukan." }, 400);
    Object.assign(x, { status, petugas: status === "baru" ? "" : petugas, catatan: status === "selesai" ? catatan : (status === "baru" ? "" : x.catatan), diubah: new Date().toISOString() });
    if (b.balasan !== undefined) x.balasan = polos(b.balasan, 800);
  }
  await env.DATA.put(K_MASUKAN, JSON.stringify(daftar));
  return json({ ok: true, masukan: daftar });
}


// ---------------------------------------------------------------------
//  Data pos hujan (unggahan Excel dari Admin; data bawaan ada di /data/pos-hujan/ web)
// ---------------------------------------------------------------------
const K_PH_INDEKS = "poshujan:indeks", RE_ID_POS = /^[a-z0-9][a-z0-9-]{0,59}$/;
const angkaAman = (v, min, maks, desimal) => { const x = Number(v); return Number.isFinite(x) && x >= min && x <= maks ? Math.round(x * 10 ** desimal) / 10 ** desimal : null; };
function posHujanBersih(b) {
  const tahun = Math.trunc(Number(b && b.tahun));
  if (!(tahun >= 2000 && tahun <= 2100)) throw Object.assign(new Error("Tahun data tidak valid"), { kode: 400 });
  const bulan = {}, lengkap = {};
  for (const [m, isi] of Object.entries((b && b.bulan) || {})) {
    const nm = Math.trunc(Number(m)); if (!(nm >= 1 && nm <= 12) || !isi || typeof isi !== "object") continue;
    const B = {}; let l = 0, n = 0;
    for (const [id, v] of Object.entries(isi).slice(0, 200)) {
      if (!RE_ID_POS.test(id) || !Array.isArray(v) || v.length < 28 || v.length > 31) continue;
      const a = v.map(x => x == null || x === "" ? null : angkaAman(x, 0, 600, 1));
      if (!a.some(x => x != null)) continue;
      B[id] = a; n++;
      let akhir = 0; a.forEach((x, i) => { if (x != null) akhir = i + 1; }); if (akhir >= a.length - 5) l++;
    }
    if (n) { bulan[nm] = B; lengkap[nm] = [l, n]; }
  }
  if (!Object.keys(bulan).length) throw Object.assign(new Error("Tidak ada data pos hujan yang terbaca di file ini"), { kode: 400 });
  const pos_baru = (Array.isArray(b.pos_baru) ? b.pos_baru : []).slice(0, 100).filter(p => p && RE_ID_POS.test(String(p.id || ""))).map(p => ({
    id: String(p.id), n: polos(p.n, 80) || String(p.id), kab: polos(p.kab, 60), kec: polos(p.kec, 60), prov: ["pb", "pbd"].includes(p.prov) ? p.prov : "",
    lon: angkaAman(p.lon, 120, 140, 4), lat: angkaAman(p.lat, -10, 5, 4),
    nor: Array.isArray(p.nor) && p.nor.length === 12 && p.nor.every(x => angkaAman(x, 0, 3000, 0) != null) ? p.nor.map(x => Math.round(Number(x))) : null }));
  const pakai = new Set(Object.values(bulan).flatMap(B => Object.keys(B)));
  return { v: 1, tahun, sumber: polos(b.sumber, 160) || "Unggahan Admin", diubah: new Date().toISOString(), bulan, lengkap, pos_baru: pos_baru.filter(p => pakai.has(p.id)) };
}
async function hapusCachePH(req, tahun) { const o = new URL(req.url).origin; try { await caches.default.delete(new Request(o + "/poshujan")); if (tahun) await caches.default.delete(new Request(o + "/poshujan/" + tahun)); } catch (e) {} }
async function simpanPosHujan(env, req, b) {
  const d = posHujanBersih(b), s = JSON.stringify(d);
  if (s.length > 3000000) return json({ galat: "Data terlalu besar" }, 413);
  await env.DATA.put("poshujan:" + d.tahun, s);
  const ix = (await env.DATA.get(K_PH_INDEKS, "json")) || {};
  ix[d.tahun] = { diubah: d.diubah, sumber: d.sumber, bulan: Object.keys(d.bulan).map(Number).sort((a, c) => a - c), lengkap: d.lengkap, pos: new Set(Object.values(d.bulan).flatMap(B => Object.keys(B))).size };
  await env.DATA.put(K_PH_INDEKS, JSON.stringify(ix));
  await hapusCachePH(req, d.tahun);
  return json({ ok: true, tahun: d.tahun, indeks: ix });
}
async function hapusPosHujan(env, req, b) {
  const tahun = Math.trunc(Number(b && b.tahun)); if (!(tahun >= 2000 && tahun <= 2100)) return json({ galat: "Tahun tidak valid" }, 400);
  await env.DATA.delete("poshujan:" + tahun);
  const ix = (await env.DATA.get(K_PH_INDEKS, "json")) || {}; delete ix[tahun];
  await env.DATA.put(K_PH_INDEKS, JSON.stringify(ix));
  await hapusCachePH(req, tahun);
  return json({ ok: true, indeks: ix });
}

// ---------------------------------------------------------------------
//  Laporan galat dari perangkat pengunjung (tanpa data pribadi) & ringkasan status untuk Admin
// ---------------------------------------------------------------------
const K_GALAT = "galat_web", UMUR_GALAT = 30 * 864e5;
let GALAT_TULIS = 0;
async function terimaGalat(req, env) {
  const kosong = new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST" || kenaBatas(ipKlien(req), "galat", 20, 3600)) return kosong;
  const t = await req.text().catch(() => ""); if (!t || t.length > 2000) return kosong;
  let b = {}; try { b = JSON.parse(t); } catch (e) { return kosong; }
  const pesan = polos(b.pesan, 200), sumber = polos(b.sumber, 160);
  if (pesan.length < 3 || POLA_SPAM.test(pesan + " " + sumber) || /https?:\/\/(?!staklim)/i.test(pesan)) return kosong;
  const now = Date.now(); if (now - GALAT_TULIS < 5000) return kosong; // hemat kuota tulis KV
  const daftar = ((await env.DATA.get(K_GALAT, "json")) || []).filter(x => now - Date.parse(x.terakhir || 0) < UMUR_GALAT);
  const kunci = pesan + "|" + sumber, ada = daftar.find(x => x.kunci === kunci);
  if (ada) { if (now - Date.parse(ada.terakhir) < 600e3) return kosong; ada.jumlah = (ada.jumlah || 1) + 1; ada.terakhir = new Date(now).toISOString(); ada.hal = polos(b.hal, 60); }
  else daftar.unshift({ kunci, pesan, sumber, hal: polos(b.hal, 60), ua: polos(b.ua, 60), jumlah: 1, pertama: new Date(now).toISOString(), terakhir: new Date(now).toISOString() });
  GALAT_TULIS = now;
  await env.DATA.put(K_GALAT, JSON.stringify(daftar.slice(0, 50)));
  return kosong;
}
// ---------------------------------------------------------------------
//  Statistik kunjungan: hanya HITUNGAN (per hari & per halaman). Tidak menyimpan IP, perangkat, atau jejak perorangan.
//  Satu kunci KV per bulan. Bila sehari sudah sangat ramai, sebagian kiriman dihitung berbobot agar kuota tulis gratis tidak habis.
// ---------------------------------------------------------------------
const K_STAT = "statistik:", RE_HAL = /^[a-z0-9-]{1,60}$/;
const tglWIT = (ms) => new Date((ms || Date.now()) + 9 * 3600e3).toISOString().slice(0, 10);
async function terimaKunjung(req, env) {
  const kosong = new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST" || !ASAL_BOLEH.test(req.headers.get("Origin") || "")) return kosong;
  if (/bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python|scrapy/i.test(req.headers.get("User-Agent") || "")) return kosong;
  if (kenaBatas(ipKlien(req), "kunjung", 40, 3600)) return kosong;
  const t = await req.text().catch(() => ""); if (!t || t.length > 1500) return kosong;
  let b = {}; try { b = JSON.parse(t); } catch (e) { return kosong; }
  const hal = [...new Set((Array.isArray(b.hal) ? b.hal : []).map(x => String(x || "").toLowerCase()).filter(x => RE_HAL.test(x)))].slice(0, 25);
  const baru = b.baru === true; if (!hal.length && !baru) return kosong;
  // kunjungan petugas dihitung terpisah; hanya bila membawa tanda sesi Admin yang sah (bukan password)
  let petugas = false;
  if (b.petugas) { const tk = String(b.petugas); if (!/^t1\.\d{13}\.[0-9a-f]{64}$/.test(tk) || !(await bolehAdmin({ headers: new Headers({ "X-Admin": tk }) }, env))) return kosong; petugas = true; }
  const hari = tglWIT(), kunci = K_STAT + hari.slice(0, 7), dd = hari.slice(8);
  const d = (await env.DATA.get(kunci, "json")) || { h: {}, hal: {} }; d.h = d.h || {}; d.hal = d.hal || {};
  const x = d.h[dd] || (d.h[dd] = { v: 0, p: 0 });
  if (petugas) { if (baru) x.sv = (x.sv || 0) + 1; x.sp = (x.sp || 0) + hal.length; await env.DATA.put(kunci, JSON.stringify(d)); return kosong; }
  let bobot = 1; if (x.p >= 1500) { if (Math.random() >= 0.2) return kosong; bobot = 5; }
  if (baru) x.v += bobot; x.p += hal.length * bobot;
  for (const h of hal) d.hal[h] = (d.hal[h] || 0) + bobot;
  const kh = Object.keys(d.hal); if (kh.length > 150) for (const h of kh.sort((a, c) => d.hal[a] - d.hal[c]).slice(0, kh.length - 150)) delete d.hal[h];
  await env.DATA.put(kunci, JSON.stringify(d));
  return kosong;
}
async function bacaStatistik(env) {
  const now = Date.now(), bl = [tglWIT(now).slice(0, 7), tglWIT(now - 31 * 864e5).slice(0, 7)], data = {};
  for (const m of [...new Set(bl)]) data[m] = (await env.DATA.get(K_STAT + m, "json")) || { h: {}, hal: {} };
  const hari = []; for (let i = 29; i >= 0; i--) { const t = tglWIT(now - i * 864e5), x = ((data[t.slice(0, 7)] || {}).h || {})[t.slice(8)] || {}; hari.push({ t, v: +x.v || 0, p: +x.p || 0, sv: +x.sv || 0, sp: +x.sp || 0 }); }
  const hb = (data[bl[0]] || {}).hal || {};
  return { hari, bulan: bl[0], halaman: Object.entries(hb).sort((a, c) => c[1] - a[1]).slice(0, 12).map(([h, n]) => ({ h, n })) };
}
async function statusAdmin(env, k) {
  const bm = (await env.DATA.get(K_BMKG, "json")) || {};
  const cad = (await daftarSemua(env, "cadangan:", false)).map(x => x.name.slice(9)).sort().reverse();
  const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
  const galat = ((await env.DATA.get(K_GALAT, "json")) || []).filter(x => Date.now() - Date.parse(x.terakhir || 0) < UMUR_GALAT).map(({ kunci, ...x }) => x);
  return json({ waktu: new Date().toISOString(), ai: !!env.AI, r2: !!env.BERKAS,
    bmkg: { diambil: bm.diambil || null, dicoba: bm.dicoba || null, galat: bm.galat || "", jumlah: (bm.besar || []).length + (bm.berita || []).length + (bm.produk || []).length },
    cadangan: { terakhir: cad[0] || "", jumlah: cad.length }, perubahan: r.slice(0, 5).map(x => ({ waktu: x.waktu, aksi: x.aksi })),
    konten_diubah: k.diubah || null, kondisi_diubah: (k.kondisi && k.kondisi.diubah) || null,
    poshujan: (await env.DATA.get(K_PH_INDEKS, "json")) || {}, pmh_update: (k.pengaturan && k.pengaturan.pmh_update) || null, pmk_update: (k.pengaturan && k.pengaturan.pmk_update) || null, info_das: (k.pengaturan && k.pengaturan.info_das) || null, wilayah_per: (await env.DATA.get(K_WILPER, "json")) || null, galat_web: galat, statistik: await bacaStatistik(env), keamanan: { batas_gagal: BATAS_GAGAL, kunci_menit: JEDA_KUNCI / 60e3, sesi_jam: SESI_JAM } });
}
// ---------------------------------------------------------------------
//  Permintaan admin
// ---------------------------------------------------------------------
async function admin(req, env, jalur, ctx) {
  if ((await hitungGagal(req)) >= BATAS_GAGAL) return json({ galat: "Terlalu banyak percobaan password salah. Coba lagi 15 menit lagi." }, 429, { "Retry-After": "900" });
  if (!(await bolehAdmin(req, env))) { await catatGagal(req, ctx); await new Promise(r => setTimeout(r, 1000)); return json({ galat: env.ADMIN_PASS ? (/^t1\./.test(req.headers.get("X-Admin") || "") ? "Sesi admin sudah berakhir. Silakan masuk lagi." : "Password salah") : "Password admin (ADMIN_PASS) belum diisi di Cloudflare" }, 401); }
  if (jalur === "/admin/cek") return json({ ok: true, token: await buatToken(env), berlaku_jam: SESI_JAM });
  if (jalur.startsWith("/admin/permohonan")) return adminPermohonan(req, env, jalur, new URL(req.url), ctx);
  if (jalur.startsWith("/admin/wbs")) return adminWbs(req, env, jalur);

  // unggah file mentah: body = isi file, header X-Nama-File
  if (jalur === "/admin/unggah") {
    const tipe = (req.headers.get("Content-Type") || "application/octet-stream").split(";")[0];
    let nama = "file"; try { nama = teks(decodeURIComponent(req.headers.get("X-Nama-File") || "file"), 120).replace(/[\x00-\x1f<>"]/g, ""); } catch (e) {}
    const gambar = TIPE_GAMBAR.includes(tipe);
    if (/^image\//.test(tipe) && !gambar) return json({ galat: "Gambar hanya boleh JPG, PNG, WebP, atau GIF" }, 400);
    if (!gambar && !TIPE_DOK.includes(tipe)) return json({ galat: "Hanya PDF, PowerPoint (.pptx), Word (.docx), atau gambar (JPG/PNG/WebP)" }, 400);
    const ukuran = Number(req.headers.get("Content-Length") || 0);
    if (!ukuran) return json({ galat: "File kosong" }, 400);
    if (ukuran > (gambar ? MAKS_GAMBAR : MAKS_FILE)) return json({ galat: gambar ? "Gambar maksimal 5 MB" : "Dokumen maksimal 25 MB. Kecilkan dulu ukurannya." }, 400);
    // dokumen besar dikirim beberapa bagian (maks 20 MB per bagian, total maks 75 MB)
    const lanjut = req.headers.get("X-Lanjut") || "", ke = Number(req.headers.get("X-Ke") || 0);
    if (lanjut) {
      if (!/^[a-z0-9]+-d$/.test(lanjut) || !(ke >= 1 && ke <= 3)) return json({ galat: "Bagian file tidak valid" }, 400);
      const m = await ambilBerkas(env, "file:" + lanjut);
      if (!m.value) return json({ galat: "Bagian pertama tidak ditemukan" }, 404);
      try { await m.value.cancel(); } catch (e) {}
      const meta = { ...(m.metadata || {}), ...((await env.DATA.get("meta:" + lanjut, "json")) || {}) };
      if (env.BERKAS) await env.BERKAS.put("file:" + lanjut + "#" + ke, req.body); else await env.DATA.put("file:" + lanjut + "#" + ke, req.body);
      meta.bagian = Math.max(meta.bagian || 1, ke + 1); meta.ukuran = (meta.ukuran || 0) + ukuran;
      await env.DATA.put("meta:" + lanjut, JSON.stringify(meta));
      return json({ kunci: lanjut, ukuran: ukuranTeks(meta.ukuran), nama: meta.nama });
    }
    // isi file harus cocok dengan jenisnya (bukan hanya labelnya): PDF diawali %PDF-, Word/PowerPoint berupa arsip PK, gambar sesuai tandanya
    const seluruh = await req.arrayBuffer(), awal = new Uint8Array(seluruh, 0, Math.min(16, seluruh.byteLength));
    const hx = [...awal.slice(0, 12)].map(x => x.toString(16).padStart(2, "0")).join(""), as = String.fromCharCode(...awal.slice(0, 12));
    const cocok = tipe === "application/pdf" ? as.startsWith("%PDF-") : TIPE_DOK.includes(tipe) ? hx.startsWith("504b0304") : tipe === "image/jpeg" ? hx.startsWith("ffd8ff") : tipe === "image/png" ? hx.startsWith("89504e470d0a1a0a") : tipe === "image/gif" ? as.startsWith("GIF8") : tipe === "image/webp" ? as.startsWith("RIFF") && as.slice(8, 12) === "WEBP" : false;
    if (!cocok) return json({ galat: "Isi file tidak sesuai dengan jenisnya. Pastikan file benar-benar " + (gambar ? "gambar JPG/PNG/WebP" : "PDF, PowerPoint, atau Word") + " dan tidak rusak." }, 400);
    const kunci = buatId() + (gambar ? "-g" : "-d");
    await simpanBerkas(env, "file:" + kunci, seluruh, { tipe, nama, ukuran: seluruh.byteLength || ukuran });
    return json({ kunci, ukuran: ukuranTeks(ukuran), nama });
  }
  if (jalur === "/admin/ringkas") {
    const blob = await req.blob();
    return json(await ringkasPdf(env, blob, req.headers.get("X-Nama-File") || "dokumen.pdf"));
  }
  if (jalur === "/admin/ekstrak") {
    // membaca isi dokumen (teks diambil di browser) lalu menyusun kartu Kondisi Iklim
    if (!env.AI) return json({ galat: "Fitur AI belum dipasang (binding AI)." });
    const d = await req.json().catch(() => ({}));
    const isi = teks(d.teks, 14000);
    if (isi.length < 150) return json({ galat: "Isi dokumen tidak terbaca (mungkin berupa gambar hasil pindai)." });
    if (d.mode === "iklim") {
      const pr = PROMPT_IKLIM[d.bagian];
      if (!pr) return json({ galat: "Bagian tidak dikenal" }, 400);
      let out = "", galat1 = "";
      for (const model of ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/meta/llama-3.1-8b-instruct"]) {
        try {
          const r = await env.AI.run(model, { max_tokens: 2400, temperature: 0.05, messages: [{ role: "system", content: ATURAN + " " + pr }, { role: "user", content: "Judul dokumen: " + teks(d.judul, 200) + "\n\nTeks:\n" + isi }] });
          const v = r && r.response; out = typeof v === "object" && v ? JSON.stringify(v) : String(v || ""); if (out) break;
        } catch (e) { out = ""; galat1 = galatAI(e) || galat1; if (galat1) break; }
      }
      if (!out && galat1) return json({ galat: galat1 });
      const m2 = out.match(/\{[\s\S]*\}/); let o2 = null; try { o2 = JSON.parse(m2 ? m2[0] : ""); } catch (e) { o2 = null; }
      if (!o2) return json({ galat: "AI belum bisa membaca bagian " + d.bagian });
      return json({ bagian: d.bagian, data: bersihDalam(o2, 0) });
    }
    const sys = "Anda analis iklim Stasiun Klimatologi Papua Barat (BMKG). Baca dokumen (buletin iklim, press release, atau paparan FGD). Ambil HANYA informasi yang tertulis jelas untuk Provinsi Papua Barat dan/atau Papua Barat Daya. Jangan mengarang; bila tidak ada, jangan buat kartunya. Balas HANYA JSON: " +
      '{"judul":"","ringkas":"","ringkasan":"","kartu":[{"kunci":"","judul":"","nilai":"","ket":"","angka":null}],"teks":{"hujan":"","prakiraan":"","musim":"","hth":"","spi":"","enso":""}}. ' +
      "kunci kartu: hujan = analisis curah hujan bulan lalu (judul 'Hujan <Bulan Tahun>', nilai kategori curah hujan yang dominan: Rendah/Menengah/Tinggi/Sangat Tinggi, ket = sifat hujan); " +
      "prakiraan = prakiraan hujan bulan berikutnya (judul 'Prakiraan <Bulan Tahun>', nilai kategori, ket = sifat hujan); " +
      "musim = awal musim hujan/kemarau (judul 'Awal Musim Hujan' atau 'Awal Musim Kemarau', nilai bulan dan tahun yang dominan, ket jumlah ZOM dan persen luas, angka = persen luas tanpa tanda %); " +
      "hth = hari tanpa hujan berturut-turut (judul 'Hari Tanpa Hujan', nilai mis. '10 pos Panjang', ket = dasarian, angka = jumlah pos); " +
      "spi = indeks kekeringan SPI (judul 'SPI <Bulan Tahun>', nilai kategori dominan, ket = rentang kategori). nilai maksimal 3 kata. " +
      "judul = judul dokumen maks 12 kata; ringkas = 1-2 kalimat; ringkasan = 1-2 kalimat kondisi iklim terkini; teks = 1-2 kalimat per topik, memakai sudut pandang 'kami', bahasa Indonesia baku.";
    let keluar = "", galat2 = "";
    for (const model of ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/meta/llama-3.1-8b-instruct"]) {
      try {
        const r = await env.AI.run(model, { max_tokens: 1400, temperature: 0.1, messages: [{ role: "system", content: sys }, { role: "user", content: "Jenis dokumen: " + teks(d.jenis, 60) + "\nJudul: " + teks(d.judul, 200) + "\n\nIsi dokumen:\n" + isi }] });
        const v = r && r.response;
        keluar = typeof v === "object" && v ? JSON.stringify(v) : String(v || "");
        if (keluar) break;
      } catch (e) { keluar = ""; galat2 = galatAI(e) || galat2; if (galat2) break; }
    }
    if (!keluar && galat2) return json({ galat: galat2 });
    const m = keluar.match(/\{[\s\S]*\}/);
    let o = null; try { o = JSON.parse(m ? m[0] : ""); } catch (e) { o = null; }
    if (!o) return json({ galat: "AI belum bisa membaca dokumen ini. Isi Kondisi Iklim secara manual." });
    return json({ judul: teks(o.judul, 200), ringkas: teks(o.ringkas, 600), ringkasan: teks(o.ringkasan, 400), kartu: kartuBersih(o.kartu), teks: teksBersih(o.teks) });
  }
  if (jalur === "/admin/peringatan-dok") {
    // dokumen yang sebagian tidak terbaca / formatnya berubah: tetap tampil di Admin sampai ditandai "sudah dicek"
    const K = "peringatan_dok", b = await req.json().catch(() => ({})); let L = (await env.DATA.get(K, "json")) || [];
    const t = b && b.tambah;
    if (t && typeof t === "object") { const it = { id: buatId(), t: new Date().toISOString(), sumber: polos(t.sumber, 120) || "Dokumen", isi: teks(t.isi, 900) };
      if (it.isi) { L = [it, ...L.filter(x => !(x.sumber === it.sumber && x.isi === it.isi))].slice(0, 40); await env.DATA.put(K, JSON.stringify(L)); if (ctx && ctx.waitUntil) ctx.waitUntil(kirimPush(env, { judul: "Dokumen perlu dicek", isi: it.sumber + ": " + it.isi.slice(0, 120), tiket: "" }).catch(() => null)); } }
    if (b && b.hapus) { L = b.hapus === "semua" ? [] : L.filter(x => x.id !== b.hapus); await env.DATA.put(K, JSON.stringify(L)); }
    return json({ daftar: L });
  }
  // v10: isi otomatis judul, media, tanggal, dan gambar dari alamat berita (dipakai di Admin › Liputan media)
  if (jalur === "/admin/ambil-tautan") {
    const b = await req.json().catch(() => ({}));
    let u; try { u = new URL(String(b.url || "").trim()); } catch (e) { return json({ galat: "Alamat berita tidak dikenali." }, 400); }
    if (u.protocol !== "https:" || /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[|0\.)/i.test(u.hostname) || /^\d+\.\d+\.\d+\.\d+$/.test(u.hostname)) return json({ galat: "Alamat harus diawali https:// dan berupa situs berita." }, 400);
    let html = "", akhir = u.href;
    try {
      const r = await fetch(u.href, { headers: { "User-Agent": "Mozilla/5.0 (compatible; StaklimPapbarBot/1.0; +https://staklim-pabar.pages.dev)", "Accept": "text/html" }, redirect: "follow" });
      if (!r.ok) return json({ galat: "Situs berita menolak dibuka robot (kode " + r.status + "). Isi kolomnya secara manual." }, 400);
      akhir = r.url || u.href; html = (await r.text()).slice(0, 400000);
    } catch (e) { return json({ galat: "Situs berita tidak bisa dibuka. Isi kolomnya secara manual." }, 400); }
    const meta = n => { const re1 = new RegExp('<meta[^>]+(?:property|name|itemprop)=["\']' + n + '["\'][^>]*content=["\']([^"\']*)["\']', "i"), re2 = new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:property|name|itemprop)=["\']' + n + '["\']', "i"); const m = html.match(re1) || html.match(re2); return m ? m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").trim() : ""; };
    const judul = meta("og:title") || meta("twitter:title") || ((html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "").trim();
    let tgl = meta("article:published_time") || meta("datePublished") || meta("pubdate") || ((html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1] || "");
    const t = Date.parse(tgl); tgl = isNaN(t) ? "" : new Date(t + 9 * 3600e3).toISOString().slice(0, 10);
    let gambar = meta("og:image") || meta("twitter:image"); try { gambar = gambar ? new URL(gambar, akhir).href : ""; } catch (e) { gambar = ""; }
    const media = meta("og:site_name") || new URL(akhir).hostname.replace(/^www\./, "");
    return json({ ok: true, url: tautanAman(akhir) || tautanAman(u.href), judul: polos(judul.replace(/\s*[|\-–]\s*[^|\-–]{2,40}$/, m => /rri|antara|tribun|radar|kompas|detik|jawapos|news|com|id\b/i.test(m) ? "" : m), 200), media: polos(media, 60), tanggal: tgl, gambar: /^https:\/\//.test(gambar) ? tautanAman(gambar) : "", ringkas: polos(meta("og:description") || meta("description"), 300) });
  }
  if (jalur === "/admin/periksa-ejaan") {
    // Periksa web: AI mencari salah ketik / ejaan / tanda baca pada teks isi web (yang bisa diubah dari Admin)
    if (!env.AI) return json({ galat: "Fitur AI belum dipasang (binding AI)." });
    const b = await req.json().catch(() => ({})); // rute ini dijalankan sebelum isi permintaan dibaca bersama di bawah
    const L = (Array.isArray(b.item) ? b.item : []).slice(0, 80).map(x => ({ id: polos(x && x.id, 12), t: teks(x && x.t, 700) })).filter(x => x.id && x.t);
    if (!L.length) return json({ temuan: [] });
    const daftar = teks(b.distrik, 6000), konteks = teks(b.konteks, 600);
    const sys = "Anda penyunting bahasa Indonesia untuk situs resmi Stasiun Klimatologi Papua Barat (BMKG). Periksa setiap teks dan temukan HANYA kesalahan yang jelas: salah ketik, ejaan tidak baku, huruf kapital keliru di tengah kalimat, spasi hilang/ganda di sekitar tanda baca, dan nama kabupaten/distrik yang salah eja. " +
      "Nama distrik resmi: " + (daftar || "(tidak ada)") + ". " + (konteks ? "Konteks: " + konteks + ". " : "") +
      "Papua Barat dan Papua Barat Daya adalah DUA provinsi berbeda yang sama-sama benar: jangan pernah mengganti, memendekkan, atau menggabungkannya. Jangan menghapus kata. " +
      "JANGAN mengubah angka, satuan, tanggal, nama orang, istilah teknis (ENSO, IOD, MJO, ZOM, SPI, HTH, dasarian, Atas Normal, Bawah Normal), atau gaya bahasa yang sudah benar. Jangan menulis ulang kalimat. " +
      'Balas HANYA JSON: {"temuan":[{"id":"","salah":"","benar":"","alasan":"","yakin":0.0}]}. salah = potongan teks PERSIS seperti tertulis (1-6 kata), benar = penggantinya, alasan maks 8 kata, yakin 0-1. Bila tidak ada kesalahan, kembalikan {"temuan":[]}.';
    const isi = L.map(x => "[" + x.id + "] " + x.t).join("\n");
    let out = "", galat1 = "";
    for (const model of ["@cf/meta/llama-3.3-70b-instruct-fp8-fast", "@cf/meta/llama-3.1-8b-instruct"]) {
      try { const r = await env.AI.run(model, { max_tokens: 1800, temperature: 0, messages: [{ role: "system", content: sys }, { role: "user", content: isi }] }); const v = r && r.response; out = typeof v === "object" && v ? JSON.stringify(v) : String(v || ""); if (out) break; }
      catch (e) { out = ""; galat1 = galatAI(e) || galat1; if (galat1) break; }
    }
    if (!out) return json({ galat: galat1 || "AI belum bisa memeriksa ejaan saat ini." });
    const m = out.match(/\{[\s\S]*\}/); let o = null; try { o = JSON.parse(m ? m[0] : ""); } catch (e) { o = null; }
    const peta = new Map(L.map(x => [x.id, x.t])), angka = t => (String(t).match(/\d+/g) || []).join(",");
    const temuan = (o && Array.isArray(o.temuan) ? o.temuan : []).slice(0, 120).map(x => ({ id: polos(x && x.id, 12), salah: String((x && x.salah) || "").slice(0, 80), benar: String((x && x.benar) || "").slice(0, 80), alasan: polos(x && x.alasan, 80), yakin: Math.max(0, Math.min(1, Number(x && x.yakin) || 0)) }))
      .filter(x => { const t = peta.get(x.id); if (!t || !x.salah || !x.benar || x.salah === x.benar || !t.includes(x.salah)) return false; if (/[<>]/.test(x.benar) || angka(x.salah) !== angka(x.benar)) return false;
        const pj = Math.max(x.salah.length, x.benar.length); if (!(pj <= 80 && Math.abs(x.salah.length - x.benar.length) <= Math.max(4, pj * 0.5))) return false;
        // saran yang menghapus kata atau mengubah nama provinsi/kabupaten dibuang (mis. "Papua Barat Daya" -> "Papua Barat")
        const polosK = t => t.replace(/[\s.,;:]/g, ""); if (polosK(x.salah).length - polosK(x.benar).length >= 3) return false;
        const hit = (t, re) => (t.match(re) || []).length;
        // nama provinsi tidak boleh berubah ke arah mana pun; nama kabupaten tidak boleh hilang (membetulkan salah ketik nama tetap boleh)
        if ([/papua\s+barat\s+daya/gi, /papua\s+barat/gi].some(re => hit(x.salah, re) !== hit(x.benar, re))) return false;
        return ![/manokwari/gi, /sorong/gi, /fak\s*fak/gi, /kaimana/gi, /bintuni/gi, /wondama/gi, /raja\s+ampat/gi, /tambrauw/gi, /maybrat/gi, /arfak/gi].some(re => hit(x.benar, re) < hit(x.salah, re)); });
    return json({ temuan });
  }
  if (jalur === "/admin/riwayat") {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    return json({ riwayat: r.map((x, i) => ({ i, waktu: x.waktu, aksi: x.aksi })) });
  }
  if (jalur === "/admin/pusat-simpan") {
    // browser petugas yang berhasil membaca rilisan BMKG Pusat menitipkan salinannya untuk pengunjung lain
    const tk = await req.text(); if (tk.length > 900000) return json({ galat: "Kiriman terlalu besar" }, 413);
    let kp = null; try { kp = JSON.parse(tk || "{}").pusat; } catch (e) {}
    const ok = await simpanPusat(env, kp); if (ok) { try { await caches.default.delete(new Request(new URL(req.url).origin + "/pusat")); } catch (e) {} }
    return json({ ok });
  }
  if (jalur === "/admin/ambil-bmkg") {
    // v12: sekaligus minta robot data mencari berita media (dijalankan robot data dalam 3 menit)
    await env.DATA.put("berita_minta", new Date().toISOString(), { expirationTtl: 3600 }).catch(() => {});
    // bila browser petugas sudah mengambil rilisan (tidak terkena batas 429 server BMKG), pakai kirimannya
    let posts = null;
    if (req.method === "POST") { const t = await req.text(); if (t.length > 900000) return json({ galat: "Kiriman terlalu besar" }, 413); try { const b = JSON.parse(t || "{}"); if (Array.isArray(b.posts) && b.posts.length) posts = b.posts; } catch (e) {} }
    ctx.waitUntil(ambilPusatMentah(env).then(() => caches.default.delete(new Request(new URL(req.url).origin + "/pusat"))).catch(() => {})
      .then(() => ambilWilayahPer(env)).then(() => caches.default.delete(new Request(new URL(req.url).origin + "/konten"))).catch(() => {}));
    const h = await ambilBmkg(env, posts); await hapusCache(req); return json({ ...h, lewat: posts ? "browser" : "server" });
  }

  const b = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  const k = await bacaKonten(env);

  if (jalur === "/admin/terbit") {
    const jenis = JENIS.includes(b.jenis) ? b.jenis : "Lainnya";
    const judul = teks(b.judul, 200);
    if (!judul) return json({ galat: "Judul wajib diisi" }, 400);
    const item = { id: b.id && k.publikasi.some(p => p.id === b.id) ? b.id : buatId(), jenis, judul, tanggal: tglValid(b.tanggal), ringkas: teks(b.ringkas, 600), isi: teks(b.isi, 20000),
      banner: !!b.banner, file: /^[a-z0-9]+-d$/.test(b.file || "") ? b.file : "", ukuran: teks(b.ukuran, 20), nama_file: teks(b.nama_file, 120),
      gambar: /^[a-z0-9]+-g$/.test(b.gambar || "") ? b.gambar : "", link: httpsAtauKosong(b.link) };
    const ada = k.publikasi.findIndex(p => p.id === item.id);
    if (ada >= 0) { const lama = k.publikasi[ada]; if (!item.file) { item.file = lama.file; item.ukuran = lama.ukuran; item.nama_file = lama.nama_file; } if (!item.gambar) item.gambar = lama.gambar; item.dibuat = lama.dibuat; k.publikasi[ada] = item; }
    else { item.dibuat = new Date().toISOString(); k.publikasi.unshift(item); }
    k.publikasi.sort((x, y) => y.tanggal.localeCompare(x.tanggal) || String(y.dibuat).localeCompare(String(x.dibuat)));
    await simpanKonten(env, k, (ada >= 0 ? "Ubah " : "Terbitkan ") + jenis + ": " + judul, req);
    return json({ ok: true, item });
  }
  if (jalur === "/admin/ubah-massal") {
    /* ubah banyak terbitan sekaligus (judul, ringkasan, gambar sampul) dengan SATU kali simpan, agar hemat kuota tulis KV */
    const L = Array.isArray(b.item) ? b.item.slice(0, 300) : [];
    const gantiSumber = (o, lama, baru, d) => { if (!o || typeof o !== "object" || d > 5) return; for (const key of Object.keys(o)) { const v = o[key]; if ((key === "sumber" || key === "_sumber") && typeof v === "string" && lama && v.includes(lama)) o[key] = v.split(lama).join(baru); else if (v && typeof v === "object") gantiSumber(v, lama, baru, d + 1); } };
    let n = 0;
    for (const x of L) {
      const p = k.publikasi.find(q => q.id === (x && x.id));
      if (!p) continue;
      const j = teks(x.judul, 200);
      if (j && j !== p.judul) { gantiSumber(k.isi_iklim, p.judul, j, 0); gantiSumber(k.kondisi, p.judul, j, 0); p.judul = j; }
      if (typeof x.ringkas === "string") p.ringkas = teks(x.ringkas, 600);
      if (/^[a-z0-9]+-g$/.test(x.gambar || "")) p.gambar = x.gambar;
      n++;
    }
    if (!n) return json({ galat: "Tidak ada terbitan yang cocok untuk diubah" }, 400);
    await simpanKonten(env, k, teks(b.aksi, 120) || ("Ubah " + n + " terbitan sekaligus"), req);
    return json({ ok: true, jumlah: n });
  }
  if (jalur === "/admin/hapus") {
    const p = k.publikasi.find(x => x.id === b.id);
    if (!p) return json({ galat: "Tidak ditemukan" }, 404);
    k.publikasi = k.publikasi.filter(x => x.id !== b.id);
    await simpanKonten(env, k, "Hapus " + p.jenis + ": " + p.judul, req);
    // file tidak langsung dihapus agar bisa dikembalikan lewat Riwayat
    return json({ ok: true });
  }
  if (jalur === "/admin/peringatan") {
    // beberapa peringatan sekaligus: tiap wilayah boleh berbeda status dan jenis
    const LV = ["nihil", "waspada", "siaga", "awas"];
    const tgl = v => /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : "";
    const satu = x => ({ status: LV.includes(x && x.status) ? x.status : "nihil", jenis: x && x.jenis === "hujan" ? "hujan" : "kekeringan", berlaku: teks(x && x.berlaku, 120), wilayah: teks(x && x.wilayah, 1500), catatan: teks(x && x.catatan, 600), sampai: tgl(x && x.sampai), kab: (Array.isArray(x && x.kab) ? x.kab : []).slice(0, 13).map(v => teks(v, 40)).filter(Boolean), distrik: teks(x && x.distrik, 400), prov: teks(x && x.prov, 60) });
    const daftar = (Array.isArray(b.daftar) ? b.daftar.slice(0, 30) : [b]).map(satu).filter(x => x.status !== "nihil" && x.wilayah);
    daftar.sort((x, y) => LV.indexOf(y.status) - LV.indexOf(x.status));
    const atas = daftar[0];
    k.peringatan = { status: atas ? atas.status : "nihil", jenis: atas ? atas.jenis : "kekeringan", berlaku: teks(b.berlaku, 120) || (atas ? atas.berlaku : ""), wilayah: atas ? atas.wilayah : "", catatan: teks(b.catatan, 600), imbauan_hujan: teks(b.imbauan_hujan, 600), imbauan_kekeringan: teks(b.imbauan_kekeringan, 600), sampai: "", daftar, diubah: new Date().toISOString() };
    const status = daftar.length ? daftar.map(x => x.status + " " + x.wilayah).join(", ") : "nihil";
    await simpanKonten(env, k, "Peringatan dini: " + teks(status, 150) + (k.peringatan.berlaku ? " (" + k.peringatan.berlaku + ")" : ""), req);
    return json({ ok: true, peringatan: k.peringatan });
  }
  if (jalur === "/admin/info") {
    const wa = String(b.wa || "").replace(/\D/g, "").replace(/^0/, "62");
    k.info = { wa: wa.length >= 10 ? wa : "", email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email || "") ? teks(b.email, 120) : "", alamat: teks(b.alamat, 300), jam: teks(b.jam, 120),
      ig: teks(String(b.ig || "").replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/.*$/, ""), 60), linktree: httpsAtauKosong(b.linktree),
      peta_embed: /^https:\/\/www\.google\.com\/maps\/embed\?/.test(b.peta_embed || "") ? teks(b.peta_embed, 2000) : "", peta_link: httpsAtauKosong(b.peta_link) };
    await simpanKonten(env, k, "Ubah info kantor", req);
    return json({ ok: true, info: k.info });
  }
  if (jalur === "/admin/sembunyi-bmkg") {
    const id = Number(b.id), s = new Set(k.sembunyi_bmkg || []);
    s.has(id) ? s.delete(id) : s.add(id);
    k.sembunyi_bmkg = [...s].slice(-200);
    await simpanKonten(env, k, (s.has(id) ? "Sembunyikan" : "Tampilkan") + " rilisan BMKG #" + id, req);
    return json({ ok: true, sembunyi_bmkg: k.sembunyi_bmkg });
  }
  if (jalur === "/admin/profil") {
    const g = v => /^[a-z0-9]+-g$/.test(v || "") ? v : "";
    const pg = (Array.isArray(b.pegawai) ? b.pegawai : []).slice(0, 80).map(p => ({ nama: teks(p.nama, 120), jabatan: teks(p.jabatan, 160), foto: g(p.foto) })).filter(p => p.nama);
    k.profil = { kepala: teks(b.kepala, 120), kepala_foto: g(b.kepala_foto), sambutan: teks(b.sambutan, 3000), sejarah: teks(b.sejarah, 8000), visi: teks(b.visi, 1500), misi: teks(b.misi, 3000), struktur: g(b.struktur), foto: (Array.isArray(b.foto) ? b.foto : []).map(g).filter(Boolean).slice(0, 12), pegawai: pg };
    await simpanKonten(env, k, "Ubah profil", req);
    return json({ ok: true, profil: k.profil });
  }
  if (jalur === "/admin/kondisi") {
    // kartu Kondisi Iklim Terkini (diisi otomatis dari dokumen atau diketik lewat halaman admin)
    k.kondisi = { sumber: teks(b.sumber, 120), ringkasan: teks(b.ringkasan, 400), kartu: kartuBersih(b.kartu), teks: teksBersih(b.teks), teks_src: teksSrcBersih(b.teks_src), otomatis: teks(b.otomatis, 160), diubah: new Date().toISOString() };
    await simpanKonten(env, k, "Ubah kondisi iklim (" + (k.kondisi.sumber || "tanpa sumber") + ")", req);
    return json({ ok: true, kondisi: k.kondisi });
  }
  if (jalur === "/admin/iklim") {
    // isi halaman Iklim (tabel, peta, ZOM) dari dokumen yang diunggah atau dibetulkan petugas
    const o = isiIklimBersih(b);
    if (JSON.stringify(o).length > 300000) return json({ galat: "Isi terlalu besar" }, 400);
    if (!o.teks_hal && k.isi_iklim && k.isi_iklim.teks_hal) o.teks_hal = k.isi_iklim.teks_hal;
    o.dipasang = (k.isi_iklim && k.isi_iklim.sumber === o.sumber && k.isi_iklim.dipasang) || new Date().toISOString();
    k.isi_iklim = o;
    await simpanKonten(env, k, "Ubah isi halaman Iklim (" + (o.sumber || "tanpa sumber") + ")", req);
    return json({ ok: true, isi_iklim: o });
  }
  if (jalur === "/admin/cek-tautan") {
    // Periksa web: cek tautan luar (maks 60, hanya https ke nama domain publik); browser tidak bisa mengecek situs lain sendiri
    const daftar = [...new Set((Array.isArray(b.url) ? b.url : []).map(String))].filter(u => /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(u) && !/^https:\/\/(localhost|[\d.]+)(\/|:|$)/i.test(u)).slice(0, 60);
    const satu = async u => { const t = new AbortController(), w = setTimeout(() => t.abort(), 9000);
      try { let r = await fetch(u, { method: "HEAD", redirect: "follow", signal: t.signal, headers: { "User-Agent": "Mozilla/5.0 (Staklim Papua Barat pemeriksa tautan)" } });
        if (r.status === 405 || r.status === 403 || r.status === 400) r = await fetch(u, { method: "GET", redirect: "follow", signal: t.signal, headers: { "Range": "bytes=0-1023", "User-Agent": "Mozilla/5.0 (Staklim Papua Barat pemeriksa tautan)" } });
        try { r.body && r.body.cancel(); } catch (e) {}
        return { url: u, status: r.status, ok: r.status < 400 || r.status === 403 || r.status === 429 };
      } catch (e) { return { url: u, status: 0, ok: false, galat: t.signal.aborted ? "terlalu lama" : "tidak terjangkau" }; } finally { clearTimeout(w); } };
    const hasil = []; for (let i = 0; i < daftar.length; i += 6) hasil.push(...await Promise.all(daftar.slice(i, i + 6).map(satu)));
    return json({ hasil });
  }
  if (jalur === "/admin/masukan") return json({ masukan: rapikanMasukan(await env.DATA.get(K_MASUKAN, "json")) });
  if (jalur === "/admin/masukan-ubah") return ubahMasukan(env, b);
  if (jalur === "/admin/poshujan") return simpanPosHujan(env, req, b);
  if (jalur === "/admin/status") return statusAdmin(env, k);
  if (jalur === "/admin/galat-hapus") { await env.DATA.delete(K_GALAT); return json({ ok: true }); }
  if (jalur === "/admin/poshujan-hapus") return hapusPosHujan(env, req, b);
  if (jalur === "/admin/pengaturan") {
    // pengaturan tampilan yang bisa diubah petugas: publikasi bawaan yang disembunyikan, data alat, info wilayah
    const BAG = { teks_baru: "Ubah teks ClimaX, Pengaduan & WBS", sembunyi_pub: "Ubah publikasi bawaan", alat: "Ubah data peralatan", wilayah: "Ubah info wilayah", privasi: "Ubah privasi tampilan", tampilan: "Ubah tampilan web", pusat_mode: "Ubah pilihan rilisan BMKG Pusat", skm: "Ubah tautan Survei Kepuasan", banner: "Ubah banner bawaan", pintasan: "Ubah tombol pintasan", media: "Ubah daftar liputan media", layanan: "Ubah isi Layanan Data", teks_web: "Ubah teks halaman", pmh_update: "Ubah update prakiraan musim hujan", pmk_update: "Ubah update prakiraan musim kemarau", poshujan: "Ubah tampilan data pos hujan", info_das: "Ubah Informasi Dasarian", permohonan: "Ubah pengaturan permohonan data" };
    const kunci = String(b.kunci || "");
    if (!BAG[kunci]) return json({ galat: "Pengaturan tidak dikenal" }, 400);
    const nilai = PENGATURAN_BERSIH[kunci] ? PENGATURAN_BERSIH[kunci](b.nilai) : bersihDalam(b.nilai, 0);
    if (JSON.stringify(nilai || "").length > 200000) return json({ galat: "Isi terlalu besar" }, 400);
    k.pengaturan = { ...(k.pengaturan || {}), [kunci]: nilai };
    await simpanKonten(env, k, BAG[kunci], req);
    if (kunci === "poshujan") { try { const ix = (await env.DATA.get(K_PH_INDEKS, "json")) || {}; await hapusCachePH(req); for (const t of Object.keys(ix)) await hapusCachePH(req, t); } catch (e) {} }
    return json({ ok: true, pengaturan: k.pengaturan });
  }
  if (jalur === "/admin/kapasitas") {
    // hitung pemakaian penyimpanan file
    const hitung = async r2 => { const a = await daftarSemua(env, "file:", r2); let total = 0, jml = 0;
      a.forEach(x => { const sz = r2 ? x.size : Number((x.metadata || {}).ukuran || 0); if (!x.name.includes("#")) jml++; total += sz; });
      return { total, jml, kunci: a.map(x => x.name), ukur: Object.fromEntries(a.map(x => [x.name, Number((x.metadata || {}).ukuran || 0)])) }; };
    const kv = await hitung(false), r2 = env.BERKAS ? await hitung(true) : null;
    // bagian tambahan file besar di KV tidak punya metadata ukuran: ambil dari meta:
    const metas = await daftarSemua(env, "meta:", false);
    for (const m of metas) { const v = await env.DATA.get(m.name, "json"); const kk = m.name.slice(5); if (v && v.ukuran && kv.kunci.includes("file:" + kk + "#1")) { kv.total += Math.max(0, v.ukuran - (kv.ukur["file:" + kk] || 0)); } }
    const k = await bacaKonten(env), r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    const dipakai = new Set(); const kumpul = t => { (String(t).match(/[a-z0-9]{8,}-[dg]/g) || []).forEach(x => dipakai.add(x)); };
    kumpul(JSON.stringify(k)); r.forEach(x => kumpul(x.isi));
    const yatim = [...new Set([...kv.kunci, ...(r2 ? r2.kunci : [])].map(n => n.slice(5).split("#")[0]))].filter(x => !dipakai.has(x));
    const cad = (await daftarSemua(env, "cadangan:", false)).map(x => ({ tanggal: x.name.slice(9), dibuat: (x.metadata || {}).dibuat || "", ukuran: ukuranTeks(Number((x.metadata || {}).ukuran || 0)) })).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
    return json({ r2: !!env.BERKAS, kv: { total: kv.total, jml: kv.jml, teks: ukuranTeks(kv.total) }, r2isi: r2 ? { total: r2.total, jml: r2.jml, teks: ukuranTeks(r2.total) } : null, batas_kv: 1073741824, batas_r2: 10737418240, tak_terpakai: yatim.length, cadangan: cad });
  }
  if (jalur === "/admin/bersihkan") {
    // hapus file yang tidak dipakai lagi oleh isi web maupun 20 riwayat terakhir
    const k = await bacaKonten(env), r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    const dipakai = new Set(); const kumpul = t => { (String(t).match(/[a-z0-9]{8,}-[dg]/g) || []).forEach(x => dipakai.add(x)); };
    kumpul(JSON.stringify(k)); r.forEach(x => kumpul(x.isi));
    let n = 0;
    for (const r2 of env.BERKAS ? [false, true] : [false]) {
      for (const x of await daftarSemua(env, "file:", r2)) { const id = x.name.slice(5).split("#")[0]; if (dipakai.has(id)) continue; const umur = Date.now() - parseInt(id.slice(0, -7), 36); if (!(umur > 2 * 86400e3)) continue; /* file baru (< 2 hari) dibiarkan */ if (r2) await env.BERKAS.delete(x.name); else { await env.DATA.delete(x.name); await env.DATA.delete("meta:" + id); } if (!x.name.includes("#")) n++; }
    }
    return json({ ok: true, dihapus: n });
  }
  if (jalur === "/admin/cadangan") {
    // unduh cadangan isi web (teks & daftar; file PDF/gambar tetap di penyimpanan)
    const tgl = b && b.tanggal;
    const isi = tgl ? await env.DATA.get("cadangan:" + String(tgl).slice(0, 10)) : await env.DATA.get(K_KONTEN);
    if (!isi) return json({ galat: "Cadangan tidak ditemukan" }, 404);
    return json({ jenis: "cadangan-staklim-pabar", versi: 1, dibuat: new Date().toISOString(), dari: tgl || "sekarang", konten: JSON.parse(isi), riwayat: tgl ? [] : ((await env.DATA.get(K_RIWAYAT, "json")) || []).map(x => ({ waktu: x.waktu, aksi: x.aksi })) });
  }
  if (jalur === "/admin/pulihkan") {
    const c = b && (b.konten || (b.tanggal ? JSON.parse((await env.DATA.get("cadangan:" + String(b.tanggal).slice(0, 10))) || "null") : null));
    if (!c || typeof c !== "object" || !Array.isArray(c.publikasi)) return json({ galat: "Isi cadangan tidak dikenali" }, 400);
    const s = JSON.stringify(c); if (s.length > 2000000) return json({ galat: "Cadangan terlalu besar" }, 400);
    await simpanKonten(env, bersihCadangan(c), "Pulihkan dari cadangan " + (b.tanggal || teks(b.nama, 80) || "file"), req);
    return json({ ok: true });
  }
  if (jalur === "/admin/kembalikan-iklim") {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    const x = r[Number(b.i)];
    if (!x) return json({ galat: "Riwayat tidak ditemukan" }, 404);
    let dulu = {}; try { dulu = JSON.parse(x.isi) || {}; } catch (e) {}
    const k = await bacaKonten(env);
    const th = k.isi_iklim && k.isi_iklim.teks_hal;
    k.isi_iklim = dulu.isi_iklim || {};
    if (th) k.isi_iklim.teks_hal = th;
    k.kondisi = dulu.kondisi || {};
    await simpanKonten(env, k, "Kembalikan isi halaman Iklim & Kondisi Iklim ke " + x.waktu, req);
    return json({ ok: true });
  }
  if (jalur === "/admin/kembalikan") {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    const x = r[Number(b.i)];
    if (!x) return json({ galat: "Riwayat tidak ditemukan" }, 404);
    const lama = await env.DATA.get(K_KONTEN);
    if (lama) r.unshift({ waktu: new Date().toISOString(), aksi: "Sebelum dikembalikan ke versi " + x.waktu, isi: lama });
    await env.DATA.put(K_RIWAYAT, JSON.stringify(r.slice(0, 20)));
    await env.DATA.put(K_KONTEN, x.isi);
    await samakanPrivasi(env, lama, x.isi);
    await hapusCache(req);
    return json({ ok: true });
  }
  return json({ galat: "Perintah admin tidak dikenal" }, 404);
}

// =====================================================================
// PERMINTAAN PELAYANAN DATA (permohonan data, tiket, cek status, notifikasi)
//  - publik: POST /layanan/permohonan (FormData + surat PDF), GET /layanan/status?q=tiket|hp,
//            POST /layanan/lengkapi (tiket + hp + surat baru), GET /layanan/hasil?t=TIKET&i=0
//  - admin : /admin/permohonan/*  (daftar, detail, ubah status, unggah hasil, surat, arsip, hapus data pribadi, notifikasi)
//  - rahasia (Settings > Variables and Secrets): TELEGRAM_TOKEN (bot Telegram), BREVO_KEY (email Brevo), TURNSTILE_SECRET (opsional)
//    Token Telegram & kunci Brevo juga bisa ditempel di Admin › Notifikasi Petugas (disimpan di KV rahasia:notif).
// =====================================================================
const K_PD_IDX = "pd:indeks", K_PD_NOTIF = "pd:notif", SITUS = "https://staklim-pabar.pages.dev";
const PD_KAT = { A: "Kegiatan penanggulangan bencana", B: "Kegiatan keagamaan", C: "Kegiatan sosial dan kemanusiaan", D: "Kegiatan pertahanan dan keamanan", E: "Pendidikan dan penelitian non-komersial", F: "Kegiatan pemerintahan pusat atau daerah", G: "Pelayanan informasi dengan tarif PNBP" };
const PD_STATUS = { diterima: "Diterima", antre: "Antre diproses", bayar: "Menunggu pembayaran", diproses: "Sedang diproses", lengkapi: "Perlu dilengkapi", cekbayar: "Bukti pembayaran diterima", selesai: "Selesai", ditolak: "Ditolak" };
const PD_DOK = { ktp: "KTP", kartu: "Kartu mahasiswa", lain: "Dokumen pendukung" }, PD_NOL = ["A", "B", "C", "D", "E", "F"];
const PD_MAKS_SURAT = 5 * 1024 * 1024, PD_MAKS_HASIL = 25 * 1024 * 1024, PD_HASIL_HARI = 30;
const hpNorm = v => { let d = String(v || "").replace(/[^\d+]/g, ""); d = d.replace(/^\+?62/, "0").replace(/\D/g, ""); if (/^8\d{8,12}$/.test(d)) d = "0" + d; return /^08\d{7,12}$/.test(d) ? d : ""; };
const hpSamar = h => h ? h.slice(0, 4) + "****" + h.slice(-4) : "";
const tiketNorm = v => { const m = String(v || "").toUpperCase().replace(/\s+/g, "").match(/^PB-?(\d{4})-?(\d{1,5})$/); return m ? "PB-" + m[1] + "-" + m[2].padStart(4, "0") : ""; };
const emailOk = v => /^[^\s@<>"]{1,64}@[^\s@<>"]{2,190}\.[a-z]{2,}$/i.test(String(v || "")) ? String(v).trim().slice(0, 200) : "";
const escH = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function tambahHariKerja(iso, n) { const d = new Date(Date.parse(iso) + 9 * 3600e3); let k = 0; while (k < n) { d.setUTCDate(d.getUTCDate() + 1); const w = d.getUTCDay(); if (w !== 0 && w !== 6) k++; } return d.toISOString().slice(0, 10); }
async function pdPengaturan(env) { const k = await bacaKonten(env); const l = (k.pengaturan && k.pengaturan.permohonan) || {}; return { aktif: l.aktif !== false, sla: Math.max(1, Math.min(30, +l.sla || 5)), simponi: l.simponi || "https://www.simponi.kemenkeu.go.id/", wa: l.wa || "", gangguan: !!l.simponi_gangguan }; }
async function pdIndeks(env) { return (await env.DATA.get(K_PD_IDX, "json")) || []; }
async function pdSimpanIndeks(env, ix) { await env.DATA.put(K_PD_IDX, JSON.stringify(ix.slice(0, 5000))); }
const pdRingkas = r => ({ tiket: r.tiket, waktu: r.waktu, nama: r.nama, instansi: r.instansi, hp: r.hp, kat: r.kat, status: r.status, ringkas: String(r.kebutuhan || "").slice(0, 90), diubah: r.diubah || r.waktu, selesai: r.selesai || "", diarsip: r.diarsip || "", dihapus: r.dihapus || "", hasil: (r.hasil || []).length, email: !!r.email });
async function pdBaca(env, t) { return env.DATA.get("pd:" + t, "json"); }
async function pdTulis(env, r, ix) {
  r.diubah = new Date().toISOString();
  await env.DATA.put("pd:" + r.tiket, JSON.stringify(r));
  ix = ix || await pdIndeks(env); const i = ix.findIndex(x => x.tiket === r.tiket); const s = pdRingkas(r);
  if (i >= 0) ix[i] = s; else ix.unshift(s); await pdSimpanIndeks(env, ix); return ix;
}
function pdPublik(r, set) {
  const hasilBoleh = r.status === "selesai" && r.selesai && Date.now() - Date.parse(r.selesai) < PD_HASIL_HARI * 864e5;
  return { tiket: r.tiket, waktu: r.waktu, kat: r.kat, kat_nama: PD_KAT[r.kat] || "", kebutuhan: String(r.kebutuhan || "").slice(0, 300), lokasi: r.lokasi || "", periode: r.periode || "", status: r.status, status_nama: PD_STATUS[r.status] || r.status,
    riwayat: (r.riwayat || []).map(x => ({ s: x.s, t: x.t, ket: x.ket || "" })), alasan: r.alasan || "", perkiraan: r.perkiraan || "",
    hasil: hasilBoleh ? (r.hasil || []).map((h, i) => ({ nama: h.nama, ukuran: h.ukuran, i })) : [], hasil_kedaluwarsa: r.status === "selesai" && !hasilBoleh && (r.hasil || []).length > 0, hasil_sampai: hasilBoleh ? new Date(Date.parse(r.selesai) + PD_HASIL_HARI * 864e5).toISOString().slice(0, 10) : "",
    hp: hpSamar(r.hp), email_ada: !!r.email, minta: r.status === "lengkapi" ? (r.minta || []) : [], dihapus: !!r.dihapus, dok: [...new Set((r.dok || []).map(d => d.jenis))],
    bayar: ["bayar", "cekbayar"].includes(r.status) || (r.bayar && r.bayar.kode) ? { simponi: set.simponi, wa: set.wa, gangguan: !!set.gangguan, kode: (r.bayar || {}).kode || "", nominal: (r.bayar || {}).nominal || 0, batas: (r.bayar || {}).batas || "", bukti: ((r.bayar || {}).bukti || []).length, lunas: !!(r.bayar || {}).ntpn } : null };
}
// ---------- notifikasi: Telegram (petugas) + email Brevo (petugas & pemohon)
// v9: token Telegram & kunci Brevo boleh ditempel di Admin (disimpan di KV, tidak pernah dikirim balik ke browser).
// Isian Admin diutamakan; Secret Cloudflare (TELEGRAM_TOKEN / BREVO_KEY) tetap dipakai bila Admin kosong.
const K_RAHASIA = "rahasia:notif";
let _rh = null, _rhT = 0;
async function rahasiaNotif(env) { if (_rh && Date.now() - _rhT < 30000) return _rh; _rh = (await env.DATA.get(K_RAHASIA, "json")) || {}; _rhT = Date.now(); return _rh; }
async function kunciTele(env) { return (await rahasiaNotif(env)).tele || env.TELEGRAM_TOKEN || ""; }
async function kunciBrevo(env) { return (await rahasiaNotif(env)).brevo || env.BREVO_KEY || ""; }
async function statusRahasia(env) { const R = await rahasiaNotif(env); return { tele: !!(R.tele || env.TELEGRAM_TOKEN), tele_sumber: R.tele ? "admin" : env.TELEGRAM_TOKEN ? "cloudflare" : "", tele_bot: R.tele ? (R.tele_bot || "") : "", brevo: !!(R.brevo || env.BREVO_KEY), brevo_sumber: R.brevo ? "admin" : env.BREVO_KEY ? "cloudflare" : "", brevo_ujung: R.brevo ? "…" + String(R.brevo).slice(-4) : "" }; }
async function pdNotifCfg(env) { return (await env.DATA.get(K_PD_NOTIF, "json")) || { penerima: [], email_admin: [], pengirim: { email: "", nama: "Stasiun Klimatologi Papua Barat" } }; }
async function kirimTele(env, teksPesan) {
  const TT = await kunciTele(env); if (!TT) return { ok: false, galat: "Token bot Telegram belum dipasang" };
  const c = await pdNotifCfg(env), ke = (c.penerima || []).filter(x => x.aktif !== false); let n = 0, g = "";
  for (const p of ke) { try { const r = await fetch("https://api.telegram.org/bot" + TT + "/sendMessage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: p.id, text: teksPesan, parse_mode: "HTML", disable_web_page_preview: true }) }); const j = await r.json().catch(() => ({})); if (j.ok) n++; else g = j.description || ("HTTP " + r.status); } catch (e) { g = String(e && e.message || e); } }
  return { ok: n > 0, n, dari: ke.length, galat: g };
}
async function kirimEmail(env, ke, subjek, html) {
  const c = await pdNotifCfg(env), daftar = (Array.isArray(ke) ? ke : [ke]).map(emailOk).filter(Boolean);
  const BK = await kunciBrevo(env); if (!BK) return { ok: false, galat: "Kunci Brevo belum dipasang" }; if (!c.pengirim || !emailOk(c.pengirim.email)) return { ok: false, galat: "Email pengirim belum diisi di Admin" }; if (!daftar.length) return { ok: false, galat: "Tidak ada alamat tujuan" };
  try { const r = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { "api-key": BK, "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify({ sender: { email: c.pengirim.email, name: c.pengirim.nama || "Stasiun Klimatologi Papua Barat" }, to: daftar.map(e => ({ email: e })), subject: subjek, htmlContent: html }) });
    if (r.ok) return { ok: true, n: daftar.length }; const j = await r.json().catch(() => ({})); return { ok: false, galat: j.message || ("HTTP " + r.status) }; } catch (e) { return { ok: false, galat: String(e && e.message || e) }; }
}
const bungkusEmail = (judul, isi) => `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0f172a"><div style="background:#0133cc;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0"><b>Stasiun Klimatologi Papua Barat</b><br><small>BMKG · Permintaan Pelayanan Data</small></div><div style="border:1px solid #e2e8f0;border-top:0;padding:20px;border-radius:0 0 12px 12px"><h2 style="margin:0 0 12px;font-size:18px">${escH(judul)}</h2>${isi}<p style="color:#64748b;font-size:12px;margin-top:20px">Email ini dikirim otomatis. Jangan dibalas; hubungi kami lewat WhatsApp atau email kantor bila perlu.</p></div></div>`;

// ---------- notifikasi HP petugas (web push, VAPID). Isi pesan diambil service worker lewat /layanan/push-pesan.
const K_PD_PUSH = "pd:push", K_PD_PUSH_MSG = "pd:push:pesan";
const b64u = buf => { let s = ""; new Uint8Array(buf).forEach(c => s += String.fromCharCode(c)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const dariB64u = s => { s = String(s).replace(/-/g, "+").replace(/_/g, "/"); s += "=".repeat((4 - s.length % 4) % 4); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); };
let VAPID_MEM = null;
async function vapidJwk(env) {
  try { const j = JSON.parse(env.VAPID_JWK || ""); if (j && j.d && j.x && j.y) return j; } catch (e) {}
  if (VAPID_MEM) return VAPID_MEM;
  let j = await env.DATA.get("pd:vapid", "json");
  if (!(j && j.d && j.x && j.y)) { const k = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]); const e = await crypto.subtle.exportKey("jwk", k.privateKey); j = { kty: "EC", crv: "P-256", x: e.x, y: e.y, d: e.d }; await env.DATA.put("pd:vapid", JSON.stringify(j)); }
  return (VAPID_MEM = j);
}
function vapidPublik(j) { const o = new Uint8Array(65); o[0] = 4; o.set(dariB64u(j.x), 1); o.set(dariB64u(j.y), 33); return b64u(o); }
async function vapidHeader(env, endpoint) {
  const j = await vapidJwk(env); if (!j) return "";
  const key = await crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", x: j.x, y: j.y, d: j.d, ext: true }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const enc = o => b64u(new TextEncoder().encode(JSON.stringify(o)));
  const isi = enc({ typ: "JWT", alg: "ES256" }) + "." + enc({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: SITUS });
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(isi));
  return "vapid t=" + isi + "." + b64u(sig) + ", k=" + vapidPublik(j);
}
async function kirimPush(env, pesan) {
  if (!(await vapidJwk(env))) return { ok: false, galat: "Kunci notifikasi belum tersedia" };
  const L = (await env.DATA.get(K_PD_PUSH, "json")) || []; if (!L.length) return { ok: false, galat: "Belum ada HP yang didaftarkan" };
  const ps = (await env.DATA.get(K_PD_PUSH_MSG, "json")) || []; ps.unshift({ ...pesan, t: new Date().toISOString() }); await env.DATA.put(K_PD_PUSH_MSG, JSON.stringify(ps.slice(0, 20)));
  let n = 0; const mati = [];
  for (const p of L) { try { const r = await fetch(p.endpoint, { method: "POST", headers: { Authorization: await vapidHeader(env, p.endpoint), TTL: "86400", Urgency: "high", "Content-Length": "0" } }); if (r.status === 404 || r.status === 410) mati.push(p.endpoint); else if (r.ok) n++; } catch (e) {} }
  if (mati.length) await env.DATA.put(K_PD_PUSH, JSON.stringify(L.filter(p => !mati.includes(p.endpoint))));
  return { ok: n > 0, n, dari: L.length };
}
async function pdBeriTahu(env, r, jenis) {
  const link = SITUS + "/layanan-data?tiket=" + r.tiket, set = await pdPengaturan(env), c = await pdNotifCfg(env), hasil = {};
  if (jenis === "baru" || jenis === "lengkapi" || jenis === "bukti") {
    const jd = jenis === "baru" ? "Permohonan data baru" : jenis === "bukti" ? "Bukti bayar masuk" : "Berkas permohonan dilengkapi";
    hasil.push = await kirimPush(env, { judul: jd + " · " + r.tiket, isi: (PD_KAT[r.kat] || "") + " · " + String(r.instansi || "") + " · " + String(r.kebutuhan || "").slice(0, 80), tiket: r.tiket }).catch(e => ({ ok: false, galat: String(e && e.message || e) }));
    hasil.tele = await kirimTele(env, `${jenis === "baru" ? "📥 <b>Permohonan data baru</b>" : jenis === "bukti" ? "💳 <b>Bukti bayar masuk</b> (periksa lalu catat NTPN)" : "📎 <b>Berkas permohonan dilengkapi</b>"}\nTiket: <b>${r.tiket}</b>\nPemohon: ${escH(r.nama)} (${escH(r.instansi)})\nKategori: ${escH(r.kat + ". " + (PD_KAT[r.kat] || ""))}\nData: ${escH(String(r.kebutuhan).slice(0, 200))}\nStatus: ${PD_STATUS[r.status]}\n\nKelola: ${SITUS}/admin`);
    if ((c.email_admin || []).length) hasil.email_admin = await kirimEmail(env, c.email_admin, `[${r.tiket}] ${jd} – ${r.nama}`, bungkusEmail(jd, `<p>Tiket <b>${r.tiket}</b> dari <b>${escH(r.nama)}</b> (${escH(r.instansi)}).</p><p><b>Kategori:</b> ${escH(PD_KAT[r.kat] || "")}<br><b>Data:</b> ${escH(r.kebutuhan)}<br><b>Lokasi:</b> ${escH(r.lokasi)}<br><b>Periode:</b> ${escH(r.periode)}</p><p><a href="${SITUS}/admin">Buka Admin › Permohonan Data</a></p>`));
  }
  if (r.email && jenis !== "bukti" && jenis !== "lengkapi") {
    const st = PD_STATUS[r.status] || r.status, by = r.bayar || {};
    if (jenis === "billing") { hasil.email = await kirimEmail(env, r.email, `[${r.tiket}] Kode billing pembayaran`, bungkusEmail("Kode billing pembayaran", `<p>Kode billing untuk permohonan <b>${r.tiket}</b>:</p><p style="font-size:22px"><b>${escH(by.kode)}</b></p><p>Nominal: <b>Rp${(+by.nominal || 0).toLocaleString("id-ID")}</b>${by.batas ? `<br>Bayar sebelum: <b>${by.batas}</b>` : ""}</p><p>Bayar lewat <a href="${escH(set.simponi)}">SIMPONI</a>, teller bank, ATM, atau m-banking (menu penerimaan negara/MPN). Tidak bisa membayar lewat SIMPONI? Hubungi WhatsApp kantor untuk pembayaran mandiri. Setelah membayar, unggah bukti bayar di halaman status.</p><p><a href="${link}" style="display:inline-block;background:#0133cc;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Buka halaman status</a></p>`)); return hasil; }
    const isi = jenis === "baru" ? `<p>Terima kasih, permohonan Anda sudah kami terima.</p><p style="font-size:20px;margin:16px 0"><b>Nomor tiket: ${r.tiket}</b></p><p>Status: <b>${st}</b>${r.perkiraan ? `<br>Perkiraan selesai: <b>${r.perkiraan}</b> (${set.sla} hari kerja)` : ""}</p>${r.status === "bayar" ? `<p>Kategori Anda dikenai tarif PNBP. Lakukan pembayaran lewat <a href="${escH(set.simponi)}">SIMPONI</a>${set.wa ? ` atau hubungi kami lewat <a href="https://wa.me/${escH(set.wa.replace(/\D/g, "").replace(/^0/, "62"))}">WhatsApp</a>` : ""} untuk kode billing.</p>` : ""}`
      : `<p>Status permohonan <b>${r.tiket}</b> berubah menjadi <b>${st}</b>.</p>${r.alasan ? `<p><b>${r.status === "ditolak" ? "Alasan" : r.status === "lengkapi" ? "Yang perlu dilengkapi" : "Pesan petugas"}:</b> ${escH(r.alasan)}</p>` : ""}${r.status === "selesai" && (r.hasil || []).length ? `<p>Data sudah bisa diunduh selama ${PD_HASIL_HARI} hari.</p>` : ""}`;
    hasil.email = await kirimEmail(env, r.email, `[${r.tiket}] ${jenis === "baru" ? "Permohonan data diterima" : "Status: " + st}`, bungkusEmail(jenis === "baru" ? "Permohonan data diterima" : "Status permohonan diperbarui", isi + `<p><a href="${link}" style="display:inline-block;background:#0133cc;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Cek status permohonan</a></p>`));
  }
  return hasil;
}
// ---------- baca kiriman FormData
async function pdBacaFile(form, nama, hanyaPdf) {
  const f = form.get(nama); if (!f || typeof f === "string" || !f.size) return null;
  if (f.size > PD_MAKS_SURAT) return { galat: "Ukuran file maksimal 5 MB." };
  const buf = await f.arrayBuffer(), a = new Uint8Array(buf.slice(0, 8));
  const tipe = String.fromCharCode(...a.slice(0, 5)) === "%PDF-" ? "application/pdf" : a[0] === 0xff && a[1] === 0xd8 && a[2] === 0xff ? "image/jpeg" : a[0] === 0x89 && a[1] === 0x50 && a[2] === 0x4e && a[3] === 0x47 ? "image/png" : "";
  if (!tipe || (hanyaPdf && tipe !== "application/pdf")) return { galat: hanyaPdf ? "Surat harus berupa file PDF." : "File harus berupa PDF, JPG, atau PNG." };
  return { buf, tipe, nama: teks(f.name || nama, 120).replace(/[\x00-\x1f<>"]/g, ""), ukuran: f.size };
}
async function pdSimpanDok(env, r, jenis, x) { const kunci = "pds:" + r.tiket + ":" + jenis + ":" + buatId(); await simpanBerkas(env, kunci, x.buf, { tipe: x.tipe, nama: x.nama, ukuran: x.ukuran }); r.dok = [...(r.dok || []), { jenis, kunci, nama: x.nama, ukuran: x.ukuran, tipe: x.tipe, waktu: new Date().toISOString() }]; }
async function pdBacaSurat(form) {
  const f = form.get("surat"); if (!f || typeof f === "string") return { galat: "Unggah surat permohonan (PDF)." };
  if (f.size > PD_MAKS_SURAT) return { galat: "Ukuran surat maksimal 5 MB." };
  const buf = await f.arrayBuffer(), awal = new Uint8Array(buf.slice(0, 5)); if (String.fromCharCode(...awal) !== "%PDF-") return { galat: "Surat harus berupa file PDF." };
  return { buf, nama: teks(f.name || "surat.pdf", 120).replace(/[\x00-\x1f<>"]/g, ""), ukuran: f.size };
}
async function pdTurnstile(env, form, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  const t = String(form.get("cf-turnstile-response") || ""); if (!t) return false;
  try { const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: t, remoteip: ip || "" }) }); const j = await r.json(); return !!j.success; } catch (e) { return false; }
}
const LAJU_PD = new Map();
async function bolehKirimPD(env, ip) {
  // maks 5 permohonan per hari per alamat IP (KV, berlaku 2 hari)
  const k = "pd:ip:" + (await tandaTangan("pd", ip || "tanpa")).slice(0, 16) + ":" + new Date().toISOString().slice(0, 10);
  const n = +(await env.DATA.get(k)) || 0; if (n >= 5) return false; await env.DATA.put(k, String(n + 1), { expirationTtl: 172800 }); return true;
}
// ---------------------------------------------------------------------
//  Whistle Blowing System (WBS) internal.
//  Isi laporan dienkripsi di browser pelapor dengan kunci publik kotak WBS; robot dan petugas Admin biasa
//  tidak bisa membacanya. Kunci rahasia tersimpan terkunci kata sandi WBS yang hanya dipegang penerima laporan.
//  Robot hanya menyimpan sidik (hash) dari pembuktian kata sandi, bukan kata sandinya.
//  Lupa kata sandi = laporan lama tidak bisa dibuka; atur ulang hanya lewat Cloudflare (hapus kunci KV "wbs:kunci").
// ---------------------------------------------------------------------
const K_WBS = "wbs:kunci", K_WBS_IX = "wbs:indeks", WBS_STATUS = { diterima: "Diterima", ditelaah: "Sedang ditelaah", ditindaklanjuti: "Ditindaklanjuti", selesai: "Selesai", tidak: "Tidak dapat ditindaklanjuti" };
const wbsTiketNorm = v => { const m = String(v || "").toUpperCase().replace(/\s+/g, "").match(/^WB-?(\d{4})-?(\d{1,5})$/); return m ? "WB-" + m[1] + "-" + m[2].padStart(4, "0") : ""; };
async function sha256hex(t) { const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(h)].map(x => x.toString(16).padStart(2, "0")).join(""); }
const b64ok = (v, n) => typeof v === "string" && v.length <= n && /^[A-Za-z0-9+/=_-]*$/.test(v);
async function wbsPublik(req, env, ctx, jalur) {
  const K = await env.DATA.get(K_WBS, "json");
  if (jalur === "/layanan/wbs-kunci") return json({ ada: !!(K && K.pub), pub: K && K.pub || null });
  if (jalur === "/layanan/wbs-konfirmasi") {
    const tk = new URL(req.url).searchParams.get("t") || "", w = K && K.email_tunggu && K.email_tunggu.token === tk ? K.email_tunggu : null, hal = (j, isi) => new Response(`<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${j}</title><style>body{font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:0 20px;color:#0f172a}h1{font-size:22px}</style></head><body><h1>${j}</h1><p>${isi}</p><p><a href="${SITUS}/admin">Buka Admin</a></p></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
    if (!K || !/^[a-f0-9]{32}$/.test(tk)) return hal("Tautan tidak berlaku", "Tautan konfirmasi ini sudah dipakai, sudah diganti, atau salah.");
    const basi = x => Date.now() - Date.parse(x.t) > 3 * 864e5, BASI = () => hal("Tautan kedaluwarsa", "Tautan konfirmasi berlaku 3 hari. Kirim ulang dari Admin › Kotak WBS.");
    // v12: penerima tambahan
    const pn = (K.penerima || []).find(x => !x.ok && x.token === tk);
    if (pn) { if (basi(pn)) return BASI(); pn.ok = true; delete pn.token; await env.DATA.put(K_WBS, JSON.stringify(K)); if (ctx && ctx.waitUntil) ctx.waitUntil(wbsKabari(env, K, "Penerima WBS tambahan aktif", `Alamat ${pn.email} sudah mengonfirmasi dan sekarang ikut menerima pemberitahuan laporan WBS.`)); return hal("Email terkonfirmasi ✓", `Alamat <b>${escH(pn.email)}</b> sekarang ikut menerima pemberitahuan laporan WBS.`); }
    // v12: email kode pemulihan
    if (K.pulih_tunggu && K.pulih_tunggu.token === tk) { const x = K.pulih_tunggu; if (basi(x)) return BASI(); K.email_pulih = x.alamat; delete K.pulih_tunggu; await env.DATA.put(K_WBS, JSON.stringify(K)); if (ctx && ctx.waitUntil) ctx.waitUntil(wbsKabari(env, K, "Email kode pemulihan WBS diganti", `Kode pemulihan Kotak WBS sekarang dikirim ke ${x.alamat}. Buat ulang kode pemulihan di Admin supaya kode baru terkirim ke alamat ini.`)); return hal("Email terkonfirmasi ✓", `Alamat <b>${escH(x.alamat)}</b> sekarang menerima kode pemulihan Kotak WBS. Buat ulang kode pemulihan di Admin › Kotak WBS.`); }
    // v12: pemilik menyetujui penggantian email pemilik
    if (K.ganti_tunggu && K.ganti_tunggu.token === tk) { const x = K.ganti_tunggu; if (basi(x)) return BASI(); delete K.ganti_tunggu; const ok = await wbsTautan(env, K, x.alamat); await env.DATA.put(K_WBS, JSON.stringify(K)); if (ctx && ctx.waitUntil) ctx.waitUntil(kirimTele(env, `🔐 <b>Kotak WBS</b>: pemilik menyetujui penggantian email pemilik ke ${escH(x.alamat)}. Alamat baru aktif setelah tautan di emailnya diklik.`).catch(() => null)); return hal("Penggantian disetujui", ok ? `Tautan konfirmasi dikirim ke <b>${escH(x.alamat)}</b>. Email pemilik berganti setelah tautan itu diklik.` : "Disetujui, tetapi email konfirmasi ke alamat baru gagal dikirim. Periksa pengaturan Brevo."); }
    if (!w) return hal("Tautan tidak berlaku", "Tautan konfirmasi ini sudah dipakai, sudah diganti, atau salah.");
    if (basi(w)) return BASI();
    const lama = K.email; K.email = w.alamat; delete K.email_tunggu; await env.DATA.put(K_WBS, JSON.stringify(K));
    if (lama && lama !== K.email && ctx && ctx.waitUntil) ctx.waitUntil(kirimEmail(env, [lama], "Email penerima Kotak WBS diganti", `<p>Email penerima pemberitahuan Kotak WBS Stasiun Klimatologi Papua Barat telah diganti ke alamat lain pada ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC.</p><p>Bila Anda tidak mengetahui perubahan ini, segera hubungi pimpinan.</p>`).catch(() => null));
    return hal("Email terkonfirmasi ✓", `Alamat <b>${escH(K.email)}</b> sekarang menerima pemberitahuan laporan WBS dan kode pemulihan.`);
  }
  let b = {}; try { b = await req.json(); } catch (e) {}
  if (jalur === "/layanan/wbs-lapor") {
    if (!K || !K.pub) return json({ galat: "Kotak laporan belum disiapkan petugas. Sementara gunakan SP4N-LAPOR!." }, 503);
    const asal = req.headers.get("Origin") || ""; if (!ASAL_BOLEH.test(asal)) return json({ galat: "Laporan hanya diterima dari web resmi." }, 403);
    const p = b && b.paket; if (!p || !b64ok(p.ek, 1200) || !b64ok(p.iv, 40) || !b64ok(p.ct, 40000) || !b64ok(b.salt_k, 64)) return json({ galat: "Isi laporan tidak terbaca. Muat ulang halaman lalu coba lagi." }, 400);
    const pin = String(b.pin || ""); if (!/^\d{6}$/.test(pin)) return json({ galat: "PIN harus 6 angka." }, 400);
    if (kenaBatas(ipKlien(req), "wbs-lapor", 5, 86400)) return json({ galat: "Batas laporan dari jaringan ini tercapai. Coba lagi besok." }, 429);
    const now = new Date(), wit = new Date(now.getTime() + 9 * 3600e3), awal = "WB-" + String(wit.getUTCFullYear()).slice(2) + String(wit.getUTCMonth() + 1).padStart(2, "0") + "-";
    let no = ((await env.DATA.get("wbs:no:" + awal, "json")) || 0) + 1, tiket = awal + String(no).padStart(4, "0");
    while (await env.DATA.get("wbs:lap:" + tiket)) { no++; tiket = awal + String(no).padStart(4, "0"); }
    await env.DATA.put("wbs:no:" + awal, JSON.stringify(no));
    const garam = buatId() + buatId(), iso = now.toISOString();
    const r = { tiket, waktu: iso, status: "diterima", paket: { ek: p.ek, iv: p.iv, ct: p.ct }, salt_k: b.salt_k, pin: { garam, h: await sha256hex(garam + "|" + pin) }, balasan: null, riwayat: [{ s: "diterima", t: iso }] };
    await env.DATA.put("wbs:lap:" + tiket, JSON.stringify(r));
    const ix = (await env.DATA.get(K_WBS_IX, "json")) || []; ix.unshift({ tiket, waktu: iso, status: "diterima" }); await env.DATA.put(K_WBS_IX, JSON.stringify(ix.slice(0, 2000)));
    if (wbsSemua(K).length && ctx && ctx.waitUntil) ctx.waitUntil(kirimEmail(env, wbsSemua(K), "Laporan WBS baru " + tiket, `<p>Ada laporan Whistle Blowing baru dengan tiket <b>${tiket}</b>.</p><p>Isi laporan terenkripsi. Buka Admin web › Kotak WBS dan masukkan kata sandi WBS untuk membacanya.</p>`).catch(() => null));
    return json({ ok: true, tiket });
  }
  if (jalur === "/layanan/wbs-status") {
    const t = wbsTiketNorm(b.tiket), pin = String(b.pin || "");
    if (!t || !/^\d{6}$/.test(pin)) return json({ galat: "Masukkan nomor tiket (WB-…) dan PIN 6 angka." }, 400);
    if (kenaBatas(ipKlien(req), "wbs-cek", 10, 900)) return json({ galat: "Terlalu banyak percobaan. Coba lagi 15 menit lagi." }, 429);
    const r = await env.DATA.get("wbs:lap:" + t, "json");
    if (!r || await sha256hex(r.pin.garam + "|" + pin) !== r.pin.h) return json({ galat: "Nomor tiket atau PIN tidak cocok." }, 404);
    return json({ ok: true, hasil: { tiket: r.tiket, waktu: r.waktu, status: r.status, status_nama: WBS_STATUS[r.status] || r.status, riwayat: r.riwayat.map(x => ({ s: x.s, t: x.t })), salt_k: r.salt_k, balasan: r.balasan } });
  }
  return json({ galat: "Tidak ditemukan" }, 404);
}
// v12: penerima pemberitahuan WBS = email pemilik + penerima tambahan yang sudah konfirmasi; kode pemulihan ke email yang ditunjuk
const wbsSemua = K => [...new Set([K && K.email, ...((K && K.penerima) || []).filter(x => x.ok).map(x => x.email)].filter(Boolean))];
const wbsPulihKe = K => (K && (K.email_pulih || K.email)) || "";
const tokenAcak = () => [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, "0")).join("");
const tautanKonf = t => `${SITUS}/api/admin/layanan/wbs-konfirmasi?t=${t}`;
async function wbsKabari(env, K, judul, teks) {
  const ke = [...new Set([...wbsSemua(K), wbsPulihKe(K)].filter(Boolean))];
  const e = ke.length ? await kirimEmail(env, ke, judul, `<p>${escH(teks)}</p><p>Bila Anda tidak mengetahui perubahan ini, segera hubungi pemilik web dan pimpinan.</p>`).catch(() => null) : null;
  const t = await kirimTele(env, `🔐 <b>Kotak WBS</b>: ${escH(teks)}`).catch(() => null);
  return { e, t };
}
async function wbsKirimKonf(env, em, token, judul, isi) {
  const r = await kirimEmail(env, [em], judul, `<p>${isi}</p><p><a href="${tautanKonf(token)}" style="display:inline-block;padding:10px 16px;background:#0133cc;color:#fff;border-radius:8px;text-decoration:none">Konfirmasi</a></p><p>Tautan berlaku 3 hari. Bila Anda tidak merasa mendaftar, abaikan email ini.</p>`).catch(() => null);
  return !!(r && r.ok !== false);
}
async function wbsTautan(env, K, em) {
  const token = [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, "0")).join("");
  K.email_tunggu = { alamat: em, token, t: new Date().toISOString() };
  const r = await kirimEmail(env, [em], "Konfirmasi email penerima Kotak WBS", `<p>Alamat ini didaftarkan sebagai penerima pemberitahuan laporan Whistle Blowing Stasiun Klimatologi Papua Barat.</p><p><a href="${SITUS}/api/admin/layanan/wbs-konfirmasi?t=${token}" style="display:inline-block;padding:10px 16px;background:#0133cc;color:#fff;border-radius:8px;text-decoration:none">Konfirmasi email ini</a></p><p>Tautan berlaku 3 hari. Bila Anda tidak merasa mendaftar, abaikan email ini.</p>`).catch(() => null);
  return !!(r && r.ok !== false);
}
async function adminWbs(req, env, jalur) {
  let b = {}; try { b = await req.json(); } catch (e) {}
  const K = await env.DATA.get(K_WBS, "json");
  if (jalur === "/admin/wbs/info") { const ix = (await env.DATA.get(K_WBS_IX, "json")) || []; return json({ ada: !!(K && K.pub), dibuat: K && K.dibuat || "", email_ada: !!(K && K.email), email_ok: K && K.email || "", email_tunggu: K && K.email_tunggu && K.email_tunggu.alamat || "", penerima: ((K && K.penerima) || []).map(x => ({ email: x.email, ok: !!x.ok })), pulih_ok: wbsPulihKe(K), pulih_tunggu: K && K.pulih_tunggu && K.pulih_tunggu.alamat || "", ganti_tunggu: K && K.ganti_tunggu && K.ganti_tunggu.alamat || "", rec: !!(K && K.rec), rec_t: K && K.rec && K.rec.t || "", baru: ix.filter(x => x.status === "diterima").length, jumlah: ix.length }); }
  if (jalur === "/admin/wbs/siapkan") {
    if (K && K.pub) return json({ galat: "Kotak WBS sudah disiapkan. Untuk mengganti, hapus kunci lama lewat Cloudflare." }, 409);
    if (!b.pub || !b.priv || !b64ok(b.verif, 120) || !b64ok(b.salt_v, 64)) return json({ galat: "Data kunci tidak lengkap." }, 400);
    const k = { pub: b.pub, priv: b.priv, salt_v: b.salt_v, vh: await sha256hex("wbs|" + b.verif), email: "", dibuat: new Date().toISOString() };
    if (b.priv_r && b64ok(b.rverif, 120) && b64ok(b.salt_rv, 64)) k.rec = { priv_r: b.priv_r, salt_rv: b.salt_rv, rh: await sha256hex("wbsr|" + b.rverif), t: k.dibuat };
    const em = emailOk(b.email); let kirim = null; if (em) kirim = await wbsTautan(env, k, em);
    await env.DATA.put(K_WBS, JSON.stringify(k)); return json({ ok: true, konfirmasi: kirim });
  }
  if (!K || !K.pub) return json({ galat: "Kotak WBS belum disiapkan." }, 404);
  if (jalur === "/admin/wbs/garam") return json({ salt_v: K.salt_v });
  if (jalur === "/admin/wbs/pulih-data") return K.rec ? json({ priv_r: K.rec.priv_r, salt_rv: K.rec.salt_rv }) : json({ galat: "Kode pemulihan belum pernah dibuat untuk kotak ini." }, 404);
  if (jalur === "/admin/wbs/pulihkan") {
    if (!K.rec || !b64ok(b.rverif, 120) || await sha256hex("wbsr|" + b.rverif) !== K.rec.rh) return json({ galat: "Kode pemulihan salah." }, 403);
    if (!b.priv || !b64ok(b.verif_baru, 120) || !b64ok(b.salt_v, 64)) return json({ galat: "Data kunci tidak lengkap." }, 400);
    K.priv = b.priv; K.salt_v = b.salt_v; K.vh = await sha256hex("wbs|" + b.verif_baru); await env.DATA.put(K_WBS, JSON.stringify(K));
    if (wbsSemua(K).length) await kirimEmail(env, [...new Set([...wbsSemua(K), wbsPulihKe(K)])], "Kata sandi Kotak WBS diatur ulang", `<p>Kata sandi Kotak WBS Stasiun Klimatologi Papua Barat baru saja diatur ulang memakai kode pemulihan.</p><p>Bila bukan Anda yang melakukannya, segera buat kode pemulihan baru dan ganti kata sandi, lalu laporkan ke pimpinan.</p>`).catch(() => null);
    return json({ ok: true });
  }
  if (!b64ok(b.verif, 120) || await sha256hex("wbs|" + b.verif) !== K.vh) return json({ galat: "Kata sandi WBS salah." }, 403);
  if (jalur === "/admin/wbs/buka") {
    const ix = (await env.DATA.get(K_WBS_IX, "json")) || [], L = [];
    for (const x of ix.slice(0, 300)) { const r = await env.DATA.get("wbs:lap:" + x.tiket, "json"); if (r) L.push({ tiket: r.tiket, waktu: r.waktu, status: r.status, paket: r.paket, balasan: r.balasan, riwayat: r.riwayat, catatan: r.catatan || null }); }
    return json({ priv: K.priv, email: K.email || "", laporan: L, log: (await env.DATA.get("wbs:log", "json")) || [] });
  }
  if (jalur === "/admin/wbs/ubah") {
    const t = wbsTiketNorm(b.tiket), r = t && await env.DATA.get("wbs:lap:" + t, "json"); if (!r) return json({ galat: "Laporan tidak ditemukan." }, 404);
    const st = WBS_STATUS[b.status] ? b.status : r.status, iso = new Date().toISOString();
    const adaBalas = !!(r.balasan || (b.balasan && b.balasan.ct));
    if (["selesai", "tidak"].includes(st) && st !== r.status && !adaBalas) return json({ galat: "Tulis tanggapan untuk pelapor dulu sebelum menyelesaikan atau menolak laporan." }, 400);
    if (st !== r.status) { r.status = st; r.riwayat.push({ s: st, t: iso }); }
    if (b.balasan && b64ok(b.balasan.iv, 40) && b64ok(b.balasan.ct, 8000)) r.balasan = { iv: b.balasan.iv, ct: b.balasan.ct, t: iso };
    if (b.catatan && b64ok(b.catatan.ek, 1200) && b64ok(b.catatan.iv, 40) && b64ok(b.catatan.ct, 8000)) r.catatan = { ek: b.catatan.ek, iv: b.catatan.iv, ct: b.catatan.ct };
    await env.DATA.put("wbs:lap:" + t, JSON.stringify(r));
    const ix = (await env.DATA.get(K_WBS_IX, "json")) || []; const it = ix.find(x => x.tiket === t); if (it) it.status = r.status; await env.DATA.put(K_WBS_IX, JSON.stringify(ix));
    return json({ ok: true });
  }
  if (jalur === "/admin/wbs/hapus") {
    // hanya pemegang kata sandi WBS; jejak (tiket + tanggal) tetap disimpan agar tidak ada laporan yang hilang diam-diam
    const t = wbsTiketNorm(b.tiket), r = t && await env.DATA.get("wbs:lap:" + t, "json"); if (!r) return json({ galat: "Laporan tidak ditemukan." }, 404);
    await env.DATA.delete("wbs:lap:" + t);
    const ix = ((await env.DATA.get(K_WBS_IX, "json")) || []).filter(x => x.tiket !== t); await env.DATA.put(K_WBS_IX, JSON.stringify(ix));
    const log = (await env.DATA.get("wbs:log", "json")) || []; log.unshift({ tiket: t, waktu: r.waktu, dihapus: new Date().toISOString() }); await env.DATA.put("wbs:log", JSON.stringify(log.slice(0, 500)));
    return json({ ok: true });
  }
  if (jalur === "/admin/wbs/email" && K.email && emailOk(b.email) && emailOk(b.email) !== K.email) {
    // v12: email pemilik tidak bisa diganti/dihapus tanpa persetujuan dari email pemilik sendiri
    const em = emailOk(b.email), token = tokenAcak(); K.ganti_tunggu = { alamat: em, token, t: new Date().toISOString() };
    const ok = await wbsKirimKonf(env, K.email, token, "Persetujuan penggantian email pemilik Kotak WBS", `Ada permintaan mengganti email pemilik Kotak WBS Stasiun Klimatologi Papua Barat dari <b>${escH(K.email)}</b> ke <b>${escH(em)}</b>. Klik tombol di bawah hanya bila Anda menyetujuinya.`);
    await env.DATA.put(K_WBS, JSON.stringify(K)); await kirimTele(env, `🔐 <b>Kotak WBS</b>: ada permintaan mengganti email pemilik ke ${escH(em)}. Menunggu persetujuan dari email pemilik.`).catch(() => null);
    if (!ok) return json({ galat: "Email persetujuan ke pemilik gagal dikirim. Periksa pengaturan Brevo." }, 502);
    return json({ ok: true, setuju_ke: K.email });
  }
  if (jalur === "/admin/wbs/penerima") {
    const em = emailOk(b.email), aksi = String(b.aksi || ""); if (!em) return json({ galat: "Alamat email tidak valid." }, 400);
    K.penerima = K.penerima || []; const ada = K.penerima.find(x => x.email === em);
    if (aksi === "tambah") {
      if (em === K.email || em === (K.email_tunggu && K.email_tunggu.alamat)) return json({ galat: "Alamat itu sudah menjadi email pemilik." }, 400);
      if (ada && ada.ok) return json({ galat: "Alamat itu sudah terdaftar." }, 400);
      if (!ada && K.penerima.length >= 4) return json({ galat: "Penerima tambahan maksimal 4 alamat." }, 400);
      const token = tokenAcak(); if (ada) { ada.token = token; ada.t = new Date().toISOString(); } else K.penerima.push({ email: em, ok: false, token, t: new Date().toISOString() });
      const ok = await wbsKirimKonf(env, em, token, "Konfirmasi penerima pemberitahuan Kotak WBS", "Alamat ini didaftarkan sebagai penerima tambahan pemberitahuan laporan Whistle Blowing Stasiun Klimatologi Papua Barat.");
      await env.DATA.put(K_WBS, JSON.stringify(K)); await wbsKabari(env, K, "Penerima WBS ditambahkan", `Alamat ${em} didaftarkan sebagai penerima tambahan dan menunggu konfirmasi.`);
      if (!ok) return json({ galat: "Email konfirmasi gagal dikirim. Periksa pengaturan Brevo." }, 502);
      return json({ ok: true });
    }
    if (aksi === "hapus") { if (!ada) return json({ galat: "Alamat tidak ditemukan." }, 404); K.penerima = K.penerima.filter(x => x.email !== em); await env.DATA.put(K_WBS, JSON.stringify(K)); await wbsKabari(env, K, "Penerima WBS dihapus", `Alamat ${em} tidak lagi menerima pemberitahuan laporan WBS.`); return json({ ok: true }); }
    return json({ galat: "Aksi tidak dikenal." }, 400);
  }
  if (jalur === "/admin/wbs/pulih-email") {
    const em = emailOk(b.email); if (!em) return json({ galat: "Alamat email tidak valid." }, 400);
    if (em === wbsPulihKe(K)) return json({ galat: "Kode pemulihan sudah dikirim ke alamat itu." }, 400);
    const token = tokenAcak(); K.pulih_tunggu = { alamat: em, token, t: new Date().toISOString() };
    const ok = await wbsKirimKonf(env, em, token, "Konfirmasi email kode pemulihan Kotak WBS", "Alamat ini ditunjuk untuk menerima <b>kode pemulihan</b> Kotak WBS Stasiun Klimatologi Papua Barat. Kode pemulihan dapat membuka semua laporan bila kata sandi WBS lupa, jadi simpan baik-baik.");
    await env.DATA.put(K_WBS, JSON.stringify(K)); await wbsKabari(env, K, "Email kode pemulihan WBS akan diganti", `Ada permintaan mengirim kode pemulihan Kotak WBS ke ${em}. Berlaku setelah alamat itu mengonfirmasi.`);
    if (!ok) return json({ galat: "Email konfirmasi gagal dikirim. Periksa pengaturan Brevo." }, 502);
    return json({ ok: true, tunggu: em });
  }
  if (jalur === "/admin/wbs/email") { const em = emailOk(b.email); if (!em) return json({ galat: "Alamat email tidak valid." }, 400); if (K.email && em === K.email) return json({ galat: "Alamat itu sudah menjadi email pemilik." }, 400); const r = await wbsTautan(env, K, em); await env.DATA.put(K_WBS, JSON.stringify(K)); if (!r) return json({ galat: "Email konfirmasi gagal dikirim. Periksa pengaturan Brevo di Admin › Permohonan Data › Notifikasi." }, 502); return json({ ok: true, tunggu: em }); }
  if (jalur === "/admin/wbs/ganti-sandi") {
    if (!b.priv || !b64ok(b.verif_baru, 120) || !b64ok(b.salt_v, 64)) return json({ galat: "Data kunci tidak lengkap." }, 400);
    K.priv = b.priv; K.salt_v = b.salt_v; K.vh = await sha256hex("wbs|" + b.verif_baru); await env.DATA.put(K_WBS, JSON.stringify(K));
    if (wbsSemua(K).length) await kirimEmail(env, [...new Set([...wbsSemua(K), wbsPulihKe(K)])], "Kata sandi Kotak WBS diganti", `<p>Kata sandi Kotak WBS Stasiun Klimatologi Papua Barat baru saja diganti oleh pemegang kata sandi lama.</p><p>Bila bukan Anda yang melakukannya, segera pakai kode pemulihan untuk mengatur ulang kata sandi.</p>`).catch(() => null);
    return json({ ok: true });
  }
  if (jalur === "/admin/wbs/kode-pulih") {
    if (!wbsPulihKe(K)) return json({ galat: "Konfirmasi email pemilik dulu, supaya kode pemulihan bisa dikirim." }, 400);
    if (!b.priv_r || !b64ok(b.rverif, 120) || !b64ok(b.salt_rv, 64) || !/^[A-Z0-9]{4}(-[A-Z0-9]{4}){5}$/.test(String(b.kode || ""))) return json({ galat: "Data kode pemulihan tidak lengkap." }, 400);
    // kode hanya diteruskan ke email terkonfirmasi, tidak disimpan
    const ok = await kirimEmail(env, [...new Set([K.email, wbsPulihKe(K)].filter(Boolean))], "Kode pemulihan Kotak WBS", `<p>Kode pemulihan Kotak WBS Stasiun Klimatologi Papua Barat:</p><p style="font-size:20px;font-family:monospace;letter-spacing:2px"><b>${b.kode}</b></p><p>Simpan kode ini di tempat aman dan jangan diberikan kepada siapa pun. Kode ini dipakai bila kata sandi WBS lupa (Admin › Kotak WBS › Lupa kata sandi). Kode lama tidak berlaku lagi.</p>`).then(r => r && r.ok !== false).catch(() => false);
    if (!ok) return json({ galat: "Email gagal dikirim, kode pemulihan tidak diganti. Periksa pengaturan Brevo." }, 502);
    K.rec = { priv_r: b.priv_r, salt_rv: b.salt_rv, rh: await sha256hex("wbsr|" + b.rverif), t: new Date().toISOString() }; await env.DATA.put(K_WBS, JSON.stringify(K));
    return json({ ok: true });
  }
  return json({ galat: "Tidak ditemukan" }, 404);
}
async function layananPublik(req, env, ctx, jalur, url) {
  if (jalur === "/layanan/aduan-status") {
    const m = String(url.searchParams.get("t") || "").toUpperCase().replace(/\s+/g, "").match(/^AD-?(\d{4})-?(\d{1,5})$/); if (!m) return json({ galat: "Nomor tiket pengaduan tidak dikenali (contoh AD-2611-0001)." }, 400);
    if (kenaBatas(ipKlien(req), "aduan-cek", 30, 600)) return json({ galat: "Terlalu banyak pencarian. Coba lagi 10 menit lagi." }, 429);
    const t = "AD-" + m[1] + "-" + m[2].padStart(4, "0"), x = rapikanMasukan(await env.DATA.get(K_MASUKAN, "json")).find(y => y.tiket === t);
    if (!x) return json({ ok: true, hasil: null, pesan: "Tiket " + t + " tidak ditemukan. Pengaduan disimpan 6 bulan." });
    return json({ ok: true, hasil: { tiket: x.tiket, jenis: x.jenis, waktu: x.waktu, status: x.status, diubah: x.diubah || "", balasan: x.balasan || "" } });
  }
  if (jalur.startsWith("/layanan/wbs")) return wbsPublik(req, env, ctx, jalur);
  const set = await pdPengaturan(env);
  if (jalur === "/layanan/status") {
    const q = String(url.searchParams.get("q") || "").trim(), t = tiketNorm(q), hp = t ? "" : hpNorm(q);
    if (!t && !hp) return json({ galat: "Masukkan nomor tiket (mis. PB-2611-0012) atau nomor HP yang dipakai saat mengajukan." }, 400);
    if (hp && kenaBatas(ipKlien(req), "pd-hp", 20, 600)) return json({ galat: "Terlalu banyak pencarian. Coba lagi 10 menit lagi." }, 429);
    let daftar = [];
    if (t) { const r = await pdBaca(env, t); if (r) daftar = [r]; }
    else { const ix = (await pdIndeks(env)).filter(x => x.hp === hp).slice(0, 10); for (const x of ix) { const r = await pdBaca(env, x.tiket); if (r) daftar.push(r); } }
    if (!daftar.length) return json({ ok: true, hasil: [], pesan: t ? "Nomor tiket " + t + " tidak ditemukan." : "Belum ada permohonan dengan nomor HP itu." });
    return json({ ok: true, hasil: daftar.map(r => pdPublik(r, set)) });
  }
  if (jalur === "/layanan/push-pesan") {
    let b = {}; try { b = await req.json(); } catch (e) {}
    const L = (await env.DATA.get(K_PD_PUSH, "json")) || []; if (!b || !L.some(p => p.endpoint === b.endpoint)) return json({ galat: "Perangkat tidak terdaftar." }, 403);
    const ps = (await env.DATA.get(K_PD_PUSH_MSG, "json")) || []; return json({ ok: true, pesan: ps[0] || null });
  }
  if (jalur === "/layanan/hasil") {
    const t = tiketNorm(url.searchParams.get("t")), i = +url.searchParams.get("i") || 0, r = t && await pdBaca(env, t);
    if (!r || r.status !== "selesai" || !(r.hasil || [])[i]) return json({ galat: "File tidak ditemukan." }, 404);
    if (!r.selesai || Date.now() - Date.parse(r.selesai) > PD_HASIL_HARI * 864e5) return json({ galat: "Masa unduh sudah lewat. Silakan hubungi kami untuk meminta ulang." }, 410);
    const h = r.hasil[i], o = await ambilBerkas(env, h.kunci); if (!o || !o.value) return json({ galat: "File tidak ditemukan." }, 404);
    return new Response(o.value, { headers: { "Content-Type": h.tipe || "application/octet-stream", "Content-Disposition": "attachment; filename*=UTF-8''" + encodeURIComponent(h.nama), "Cache-Control": "no-store", ...CORS } });
  }
  if (req.method !== "POST") return json({ galat: "Metode tidak dikenal." }, 405);
  const asal = req.headers.get("Origin") || ""; if (!ASAL_BOLEH.test(asal)) return json({ galat: "Kiriman hanya diterima dari web resmi." }, 403);
  if (Number(req.headers.get("Content-Length") || 0) > PD_MAKS_SURAT * 4 + 500000) return json({ galat: "Ukuran semua file terlalu besar (maksimal 5 MB per file)." }, 413);
  let form; try { form = await req.formData(); } catch (e) { return json({ galat: "Kiriman tidak terbaca. Coba lagi." }, 400); }
  const g = k => String(form.get(k) || "");
  if (jalur === "/layanan/lengkapi") {
    const t = tiketNorm(g("tiket")), hp = hpNorm(g("hp")), r = t && await pdBaca(env, t);
    if (!r || !hp || r.hp !== hp) return json({ galat: "Nomor tiket dan nomor HP tidak cocok." }, 403);
    if (r.status !== "lengkapi") return json({ galat: "Permohonan ini tidak sedang menunggu kelengkapan." }, 400);
    const s = await pdBacaFile(form, "surat", true); if (s && s.galat) return json({ galat: s.galat }, 400);
    const dk = {}; for (const j of Object.keys(PD_DOK)) { const x = await pdBacaFile(form, j, false); if (x && x.galat) return json({ galat: PD_DOK[j] + ": " + x.galat }, 400); if (x) dk[j] = x; }
    if (!s && !Object.keys(dk).length) return json({ galat: "Pilih minimal satu file untuk dikirim." }, 400);
    const kurang = (r.minta || []).filter(j => j === "surat" ? !s : !dk[j]); if (kurang.length) return json({ galat: "Masih perlu diunggah: " + kurang.map(j => j === "surat" ? "surat permohonan" : PD_DOK[j]).join(", ") + "." }, 400);
    if (s) { const n = (r.surat || []).length + 1, kunci = "pds:" + r.tiket + ":" + n; await simpanBerkas(env, kunci, s.buf, { tipe: "application/pdf", nama: s.nama, ukuran: s.ukuran }); r.surat = [...(r.surat || []), { kunci, nama: s.nama, ukuran: s.ukuran, waktu: new Date().toISOString() }]; }
    for (const [j, x] of Object.entries(dk)) await pdSimpanDok(env, r, j, x);
    const now = new Date().toISOString(); r.status = r.kat === "G" ? (r.bayar && r.bayar.ntpn ? "diproses" : "bayar") : "antre"; r.alasan = "";
    r.riwayat.push({ s: "diterima", t: now, ket: "Berkas baru diunggah pemohon: " + [s ? "surat" : "", ...Object.keys(dk).map(j => PD_DOK[j])].filter(Boolean).join(", ") }, { s: r.status, t: now, ket: "Berkas diverifikasi otomatis oleh sistem" });
    await pdTulis(env, r); ctx.waitUntil(pdBeriTahu(env, r, "lengkapi").catch(() => {}));
    return json({ ok: true, hasil: [pdPublik(r, set)] });
  }
  if (jalur === "/layanan/bukti") {
    const t = tiketNorm(g("tiket")), hp = hpNorm(g("hp")), r = t && await pdBaca(env, t);
    if (!r || !hp || r.hp !== hp) return json({ galat: "Nomor tiket dan nomor HP tidak cocok." }, 403);
    if (!["bayar", "cekbayar"].includes(r.status)) return json({ galat: "Permohonan ini tidak sedang menunggu pembayaran." }, 400);
    const x = await pdBacaFile(form, "bukti", false); if (!x) return json({ galat: "Pilih file bukti bayar (foto atau PDF)." }, 400); if (x.galat) return json({ galat: x.galat }, 400);
    const kunci = "pdb:" + r.tiket + ":" + buatId(); await simpanBerkas(env, kunci, x.buf, { tipe: x.tipe, nama: x.nama, ukuran: x.ukuran });
    r.bayar = r.bayar || {}; r.bayar.bukti = [...(r.bayar.bukti || []), { kunci, nama: x.nama, ukuran: x.ukuran, tipe: x.tipe, waktu: new Date().toISOString() }].slice(-5);
    r.status = "cekbayar"; r.alasan = ""; r.riwayat.push({ s: "cekbayar", t: new Date().toISOString(), ket: "Bukti pembayaran diunggah pemohon, menunggu diperiksa petugas" });
    await pdTulis(env, r); ctx.waitUntil(pdBeriTahu(env, r, "bukti").catch(() => {}));
    return json({ ok: true, hasil: [pdPublik(r, set)] });
  }
  if (jalur !== "/layanan/permohonan") return json({ galat: "Alamat tidak dikenal." }, 404);
  if (!set.aktif) return json({ galat: "Permohonan lewat web sedang ditutup. Silakan hubungi kami lewat WhatsApp atau email." }, 503);
  if (g("situs") || !(Number(g("lama")) >= 4000)) return json({ ok: true, tiket: "" });
  const ip = ipKlien(req);
  if (!(await pdTurnstile(env, form, ip))) return json({ galat: "Verifikasi anti-robot gagal. Muat ulang halaman lalu coba lagi." }, 400);
  const d = { nama: polos(g("nama"), 100), instansi: polos(g("instansi"), 140), email: emailOk(g("email")), hp: hpNorm(g("hp")), kat: PD_KAT[g("kat")] ? g("kat") : "", kebutuhan: teks(g("kebutuhan"), 1500), lokasi: polos(g("lokasi"), 200), periode: polos(g("periode"), 120), tujuan: teks(g("tujuan"), 800) };
  const salah = !d.nama || d.nama.length < 3 ? "Tulis nama lengkap." : !d.hp ? "Nomor HP/WhatsApp tidak valid (contoh 081234567890)." : g("email") && !d.email ? "Alamat email tidak valid." : !d.instansi ? "Tulis instansi atau asal Anda." : !d.kat ? "Pilih kegiatan pemanfaatan data." : d.kebutuhan.length < 10 ? "Jelaskan data yang dibutuhkan (minimal 10 huruf)." : !d.lokasi ? "Tulis lokasi data." : !d.periode ? "Tulis periode data." : d.tujuan.length < 5 ? "Tulis tujuan penggunaan data." : g("setuju") !== "1" ? "Centang pernyataan penggunaan data." : "";
  if (salah) return json({ galat: salah }, 400);
  const s = await pdBacaSurat(form); if (s.galat) return json({ galat: s.galat }, 400);
  const dk = {}; for (const j of Object.keys(PD_DOK)) { const x = await pdBacaFile(form, j, false); if (x && x.galat) return json({ galat: PD_DOK[j] + ": " + x.galat }, 400); if (x) dk[j] = x; }
  if (PD_NOL.includes(d.kat) && !dk.ktp) return json({ galat: "Kegiatan tarif Rp0 wajib melampirkan KTP." }, 400);
  if (d.kat === "E" && !dk.kartu) return json({ galat: "Kegiatan pendidikan dan penelitian wajib melampirkan kartu mahasiswa." }, 400);
  if (!(await bolehKirimPD(env, ip))) return json({ galat: "Batas 5 permohonan per hari dari jaringan ini tercapai. Coba lagi besok atau hubungi kami." }, 429);
  const now = new Date(), wit = new Date(now.getTime() + 9 * 3600e3), awal = "PB-" + String(wit.getUTCFullYear()).slice(2) + String(wit.getUTCMonth() + 1).padStart(2, "0") + "-";
  let ix = await pdIndeks(env); let no = ix.filter(x => x.tiket.startsWith(awal)).reduce((m, x) => Math.max(m, +x.tiket.slice(-4) || 0), 0) + 1, tiket = awal + String(no).padStart(4, "0");
  while (await env.DATA.get("pd:" + tiket)) { no++; tiket = awal + String(no).padStart(4, "0"); }
  const kunci = "pds:" + tiket + ":1"; await simpanBerkas(env, kunci, s.buf, { tipe: "application/pdf", nama: s.nama, ukuran: s.ukuran });
  const iso = now.toISOString(), st = d.kat === "G" ? "bayar" : "antre";
  const r = { tiket, waktu: iso, ...d, surat: [{ kunci, nama: s.nama, ukuran: s.ukuran, waktu: iso }], status: st, perkiraan: tambahHariKerja(iso, set.sla), alasan: "", catatan: "", petugas: "", hasil: [],
    riwayat: [{ s: "diterima", t: iso, ket: "Permohonan masuk lewat web" }, { s: st, t: iso, ket: st === "bayar" ? "Berkas lengkap. Kategori bertarif PNBP: menunggu pembayaran" : "Berkas lengkap, diverifikasi otomatis oleh sistem" }] };
  for (const [j, x] of Object.entries(dk)) await pdSimpanDok(env, r, j, x);
  await pdTulis(env, r, ix);
  ctx.waitUntil(pdBeriTahu(env, r, "baru").catch(() => {}));
  return json({ ok: true, tiket, status: st, perkiraan: r.perkiraan, data: pdPublik(r, set) });
}
async function adminPermohonan(req, env, jalur, url, ctx) {
  if (jalur === "/admin/permohonan/surat" || jalur === "/admin/permohonan/hasil-lihat") {
    const t = tiketNorm(url.searchParams.get("t")), i = +url.searchParams.get("i") || 0, r = t && await pdBaca(env, t), jn = url.searchParams.get("jenis") || "surat";
    const f = r && (jalur.endsWith("hasil-lihat") ? r.hasil || [] : jn === "dok" ? r.dok || [] : jn === "bukti" ? (r.bayar || {}).bukti || [] : r.surat || [])[i]; if (!f) return json({ galat: "File tidak ditemukan (mungkin sudah dihapus)." }, 404);
    const o = await ambilBerkas(env, f.kunci); if (!o || !o.value) return json({ galat: "File tidak ditemukan." }, 404);
    return new Response(o.value, { headers: { "Content-Type": f.tipe || "application/pdf", "Content-Disposition": "inline; filename*=UTF-8''" + encodeURIComponent(f.nama) } });
  }
  if (jalur === "/admin/permohonan/hasil") {
    const t = tiketNorm(url.searchParams.get("t")), r = t && await pdBaca(env, t); if (!r) return json({ galat: "Tiket tidak ditemukan." }, 404);
    const ukuran = Number(req.headers.get("Content-Length") || 0); if (!ukuran) return json({ galat: "File kosong" }, 400); if (ukuran > PD_MAKS_HASIL) return json({ galat: "File hasil maksimal 25 MB. Kompres (zip) atau bagi menjadi beberapa file." }, 400);
    let nama = "data"; try { nama = teks(decodeURIComponent(req.headers.get("X-Nama-File") || "data"), 120).replace(/[\x00-\x1f<>"/\\]/g, ""); } catch (e) {}
    const tipe = (req.headers.get("Content-Type") || "application/octet-stream").split(";")[0].slice(0, 100), kunci = "pdh:" + r.tiket + ":" + buatId();
    await simpanBerkas(env, kunci, await req.arrayBuffer(), { tipe, nama, ukuran }); r.hasil = [...(r.hasil || []), { kunci, nama, ukuran, tipe, waktu: new Date().toISOString() }].slice(0, 10);
    await pdTulis(env, r); return json({ ok: true, data: r });
  }
  const b = (req.method === "POST" ? await req.json().catch(() => ({})) : {}) || {};
  if (jalur === "/admin/permohonan") return json({ ok: true, daftar: await pdIndeks(env), notif: { tele: !!(await kunciTele(env)), brevo: !!(await kunciBrevo(env)), turnstile: !!env.TURNSTILE_SECRET } });
  if (jalur === "/admin/permohonan/detail") { const r = await pdBaca(env, tiketNorm(b.tiket)); return r ? json({ ok: true, data: r }) : json({ galat: "Tiket tidak ditemukan." }, 404); }
  if (jalur === "/admin/permohonan/ubah") {
    const r = await pdBaca(env, tiketNorm(b.tiket)); if (!r) return json({ galat: "Tiket tidak ditemukan." }, 404);
    const st = PD_STATUS[b.status] ? b.status : r.status, ket = teks(b.ket, 300), alasanLama = r.alasan || "";
    let alasan = teks(b.alasan, 600); if (st !== r.status && alasan === alasanLama) alasan = ""; // pesan lama milik status sebelumnya
    if (["ditolak", "lengkapi"].includes(st) && alasan.length < 5) return json({ galat: st === "ditolak" ? "Tulis alasan penolakan di kolom Pesan untuk pemohon (minimal 5 huruf)." : "Tulis apa yang perlu dilengkapi di kolom Pesan untuk pemohon (minimal 5 huruf)." }, 400);
    if (st === "lengkapi" && !(Array.isArray(b.minta) && b.minta.length)) return json({ galat: "Centang dokumen yang perlu dilengkapi pemohon." }, 400);
    if (st === "selesai" && !(r.hasil || []).length && !b.tanpa_file) return json({ galat: "Unggah file data hasil dulu, atau centang \"Selesai tanpa file\"." }, 400);
    let billingBaru = false;
    if (b.bayar && typeof b.bayar === "object") { const lama = r.bayar || {}, kode = String(b.bayar.kode || "").replace(/\D/g, "").slice(0, 20), nominal = Math.max(0, Math.min(1e10, Math.round(+b.bayar.nominal || 0))), batas = /^\d{4}-\d{2}-\d{2}$/.test(b.bayar.batas || "") ? b.bayar.batas : "", ntpn = polos(b.bayar.ntpn, 32).replace(/[^\w-]/g, ""), metode = b.bayar.metode === "mandiri" ? "mandiri" : "simponi";
      billingBaru = !!kode && kode !== (lama.kode || ""); r.bayar = { ...lama, kode, nominal, batas, ntpn, metode };
      if (billingBaru) r.riwayat.push({ s: r.status, t: new Date().toISOString(), ket: "Kode billing SIMPONI diterbitkan" + (nominal ? ": Rp" + nominal.toLocaleString("id-ID") : "") });
      if (ntpn && ntpn !== (lama.ntpn || "")) r.riwayat.push({ s: r.status, t: new Date().toISOString(), ket: "Pembayaran terverifikasi (NTPN dicatat)" }); }
    const pnbp = r.kat === "G" || !!(r.bayar && (r.bayar.kode || r.bayar.nominal > 0));
    if (st === "selesai" && pnbp && !(r.bayar || {}).ntpn) return json({ galat: "Permohonan berbayar belum bisa Selesai: isi NTPN dulu di bagian Pembayaran PNBP." }, 400);
    const berubah = st !== r.status, catLama = r.catatan || "", ptgLama = r.petugas || ""; r.catatan = teks(b.catatan, 1500); r.petugas = polos(b.petugas, 80) || r.petugas || "";
    const simpan = []; if (r.petugas !== ptgLama) simpan.push("petugas"); if (r.catatan !== catLama) simpan.push("catatan internal");
    if (st === "lengkapi") r.minta = (Array.isArray(b.minta) ? b.minta : []).filter(x => ["surat", ...Object.keys(PD_DOK)].includes(x)).slice(0, 4);
    const kini = new Date().toISOString(), p = r.petugas || undefined;
    if (berubah) { r.status = st; r.alasan = alasan; if (st === "selesai") r.selesai = kini; r.riwayat.push({ s: st, t: kini, ket: ket || alasan || (st === "selesai" ? "Data selesai disiapkan petugas" : st === "diproses" ? "Petugas mulai menyiapkan data" : ""), p }); simpan.unshift("status"); if (alasan) simpan.push("pesan untuk pemohon"); if (ket) simpan.push("keterangan riwayat"); }
    else { const pesanBaru = alasan !== alasanLama; r.alasan = alasan; if (pesanBaru) simpan.push("pesan untuk pemohon"); const cat = ket || (pesanBaru && alasan ? alasan : ""); if (cat) { r.riwayat.push({ s: st, t: kini, ket: cat, p }); if (ket) simpan.push("keterangan riwayat"); } }
    if (billingBaru) simpan.push("kode billing");
    const ix = await pdTulis(env, r); let notif = null; if (berubah || billingBaru) notif = await pdBeriTahu(env, r, berubah ? "status" : "billing").catch(() => null);
    return json({ ok: true, data: r, daftar: ix, notif, simpan });
  }
  if (jalur === "/admin/permohonan/hasil-hapus") { const r = await pdBaca(env, tiketNorm(b.tiket)); if (!r) return json({ galat: "Tiket tidak ditemukan." }, 404); const h = (r.hasil || [])[+b.i]; if (h) { await hapusBerkas(env, h.kunci); r.hasil.splice(+b.i, 1); await pdTulis(env, r); } return json({ ok: true, data: r }); }
  if (jalur === "/admin/permohonan/arsip-tandai") {
    const set = new Set((b.tiket || []).map(tiketNorm)), now = new Date().toISOString(); let ix = await pdIndeks(env);
    for (const t of set) { const r = await pdBaca(env, t); if (r) { r.diarsip = now; await env.DATA.put("pd:" + t, JSON.stringify(r)); const i = ix.findIndex(x => x.tiket === t); if (i >= 0) ix[i].diarsip = now; } }
    await pdSimpanIndeks(env, ix); return json({ ok: true, daftar: ix });
  }
  if (jalur === "/admin/permohonan/hapus-pribadi") {
    let ix = await pdIndeks(env), n = 0, tolak = [];
    for (const t of (b.tiket || []).map(tiketNorm).filter(Boolean)) {
      const r = await pdBaca(env, t); if (!r) continue; if (!r.diarsip) { tolak.push(t); continue; }
      for (const f of [...(r.surat || []), ...(r.hasil || []), ...(r.dok || []), ...((r.bayar || {}).bukti || [])]) await hapusBerkas(env, f.kunci).catch(() => {});
      if (r.bayar) r.bayar.bukti = [];
      Object.assign(r, { nama: "(dihapus)", email: "", hp: "", surat: [], hasil: [], dok: [], tujuan: "", dihapus: new Date().toISOString() });
      r.riwayat.push({ s: r.status, t: r.dihapus, ket: "Data pribadi dihapus petugas setelah diarsipkan" }); ix = await pdTulis(env, r, ix); n++;
    }
    return json({ ok: true, n, tolak, daftar: ix });
  }
  if (jalur === "/admin/permohonan/notif") {
    const c = await pdNotifCfg(env);
    if (b.simpan) {
      c.penerima = (Array.isArray(b.penerima) ? b.penerima : []).slice(0, 30).map(p => ({ id: String(p.id || "").replace(/[^\d-]/g, "").slice(0, 20), nama: polos(p.nama, 60), aktif: p.aktif !== false })).filter(p => p.id);
      c.email_admin = (Array.isArray(b.email_admin) ? b.email_admin : []).map(emailOk).filter(Boolean).slice(0, 10);
      c.pengirim = { email: emailOk(b.pengirim && b.pengirim.email), nama: polos(b.pengirim && b.pengirim.nama, 80) || "Stasiun Klimatologi Papua Barat" };
      await env.DATA.put(K_PD_NOTIF, JSON.stringify(c));
      const R = { ...(await rahasiaNotif(env)) }; let ubahR = false;
      if (b.hapus_tele) { delete R.tele; delete R.tele_bot; ubahR = true; }
      if (b.hapus_brevo) { delete R.brevo; ubahR = true; }
      const tt = String(b.tele_token || "").trim(), bk = String(b.brevo_key || "").trim();
      if (tt) {
        if (!/^\d{5,15}:[A-Za-z0-9_-]{30,60}$/.test(tt)) return json({ galat: "Token Telegram tidak dikenali. Salin lagi utuh dari @BotFather (bentuknya angka, titik dua, lalu huruf)." }, 400);
        const g = await fetch("https://api.telegram.org/bot" + tt + "/getMe").then(x => x.json()).catch(() => ({}));
        if (!g.ok) return json({ galat: "Telegram menolak token itu. Pastikan disalin utuh dari @BotFather." }, 400);
        R.tele = tt; R.tele_bot = polos((g.result || {}).username, 60); ubahR = true;
      }
      if (bk) {
        if (!/^xkeysib-[A-Za-z0-9-]{20,200}$/.test(bk)) return json({ galat: "Kunci Brevo tidak dikenali. Kunci API Brevo selalu diawali xkeysib-." }, 400);
        R.brevo = bk; ubahR = true;
      }
      if (ubahR) { await env.DATA.put(K_RAHASIA, JSON.stringify(R)); _rh = R; _rhT = Date.now(); }
    }
    const pj = await vapidJwk(env), L = (await env.DATA.get(K_PD_PUSH, "json")) || [];
    return json({ ok: true, notif: c, ...(await statusRahasia(env)), vapid: pj ? vapidPublik(pj) : "", perangkat: L.map(p => ({ nama: p.nama, dibuat: p.dibuat, endpoint: p.endpoint })) });
  }
  if (jalur === "/admin/permohonan/push-daftar" || jalur === "/admin/permohonan/push-hapus") {
    let L = (await env.DATA.get(K_PD_PUSH, "json")) || []; const ep = String((b.sub && b.sub.endpoint) || b.endpoint || "");
    if (!/^https:\/\/[^\s]{10,1000}$/.test(ep)) return json({ galat: "Alamat notifikasi tidak valid." }, 400);
    L = L.filter(p => p.endpoint !== ep); if (jalur.endsWith("daftar")) L.unshift({ endpoint: ep, nama: polos(b.nama, 60) || "HP petugas", dibuat: new Date().toISOString() });
    await env.DATA.put(K_PD_PUSH, JSON.stringify(L.slice(0, 20))); return json({ ok: true, perangkat: L.map(p => ({ nama: p.nama, dibuat: p.dibuat, endpoint: p.endpoint })) });
  }
  if (jalur === "/admin/permohonan/tele-cari") {
    const TT = await kunciTele(env); if (!TT) return json({ galat: "Token bot Telegram belum dipasang. Tempel token di Admin › Notifikasi Petugas." }, 400);
    const r = await fetch("https://api.telegram.org/bot" + TT + "/getUpdates?limit=100").then(x => x.json()).catch(() => ({}));
    if (!r.ok) return json({ galat: "Telegram menolak: " + (r.description || "token salah?") }, 400);
    const m = new Map(); (r.result || []).forEach(u => { const c = (u.message || u.my_chat_member || u.edited_message || {}).chat; if (c && c.id) m.set(String(c.id), { id: String(c.id), nama: polos(c.title || [c.first_name, c.last_name].filter(Boolean).join(" ") + (c.username ? " (@" + c.username + ")" : ""), 60), jenis: c.type }); });
    return json({ ok: true, chat: [...m.values()] });
  }
  if (jalur === "/admin/permohonan/tes") {
    const c = await pdNotifCfg(env);
    const tele = await kirimTele(env, "✅ Tes notifikasi Permintaan Pelayanan Data dari web Stasiun Klimatologi Papua Barat.");
    const push = await kirimPush(env, { judul: "Tes notifikasi", isi: "Notifikasi HP untuk Permintaan Pelayanan Data sudah berfungsi.", tiket: "" });
    const email = (c.email_admin || []).length ? await kirimEmail(env, c.email_admin, "Tes notifikasi Permintaan Pelayanan Data", bungkusEmail("Tes notifikasi", "<p>Notifikasi email permohonan data sudah berfungsi.</p>")) : { ok: false, galat: "Email petugas belum diisi" };
    return json({ ok: true, tele, email, push });
  }
  return json({ galat: "Alamat admin permohonan tidak dikenal." }, 404);
}

async function hapusBerkas(env, k) { if (env.BERKAS) await env.BERKAS.delete(k).catch(() => {}); await env.DATA.delete(k).catch(() => {}); }

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(ambilBmkg(env).catch(() => {}).then(() => ambilPusatMentah(env)).catch(() => {}).then(() => ambilWilayahPer(env)).catch(() => {})); ctx.waitUntil(cadanganMingguan(env).catch(() => {})); },
  async fetch(req, env, ctx) {
    const url = new URL(req.url), jalur = url.pathname;
    if (req.method === "OPTIONS") return jalur.startsWith("/admin/") ? corsAdmin(req, new Response(null, { headers: CORS })) : new Response(null, { headers: CORS });
    if (kenaBatas(ipKlien(req), jalur.startsWith("/admin/") ? "admin" : "publik", jalur.startsWith("/admin/") ? 120 : 1200, 60)) return json({ galat: "Terlalu banyak permintaan. Coba lagi sebentar lagi." }, 429, { "Retry-After": "60" });
    if (jalur.startsWith("/admin/")) {
      let res;
      try { res = await admin(req, env, jalur, ctx); }
      catch (e) { res = json({ galat: e && e.kode ? e.message : "Terjadi kesalahan di robot admin. Coba lagi." }, e && e.kode ? e.kode : 500); }
      return corsAdmin(req, res);
    }

    if (jalur.startsWith("/layanan/")) {
      let res; try { res = await layananPublik(req, env, ctx, jalur, url); } catch (e) { res = json({ galat: "Robot sedang bermasalah. Permohonan belum tersimpan, silakan coba lagi." }, 500); }
      return corsAdmin(req, res);
    }
    if (jalur === "/masukan") {
      if (req.method !== "POST") return json({ galat: "Gunakan formulir Kirim Masukan di web." }, 405);
      let res; try { res = await terimaMasukan(req, env, ctx); } catch (e) { res = json({ galat: "Masukan belum terkirim. Coba lagi." }, 500); }
      return corsAdmin(req, res);
    }
    if (jalur === "/privasi") return json(await bacaPrivasi(env), 200, { "Cache-Control": "public, max-age=30" });
    if (jalur === "/kunjung") { try { return await terimaKunjung(req, env); } catch (e) { return new Response(null, { status: 204, headers: CORS }); } }
    if (jalur === "/galat") { try { return await terimaGalat(req, env); } catch (e) { return new Response(null, { status: 204, headers: CORS }); } }
    if (jalur === "/pusat") {
      const kc = new Request(url.origin + "/pusat"); let res = await caches.default.match(kc);
      if (!res) { const isi = (await env.DATA.get(K_PUSAT)) || "{}"; res = new Response(isi, { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300", ...CORS } }); ctx.waitUntil(caches.default.put(kc, res.clone())); }
      return res;
    }
    if (jalur === "/poshujan" || /^\/poshujan\/\d{4}$/.test(jalur)) {
      // Petugas (dengan sandi Admin) melihat semua bulan; publik hanya sampai batas "sampai" di pengaturan.
      const admin = !!req.headers.get("X-Admin") && (await bolehAdmin(req, env));
      const kc = new Request(url.origin + jalur);
      let res = admin ? null : await caches.default.match(kc);
      if (!res) {
        const batas = admin ? "" : String((((await bacaKonten(env)).pengaturan || {}).poshujan || {}).sampai || "");
        const bt = batas ? +batas.slice(0, 4) : 0, bm = batas ? +batas.slice(5) : 0;
        const boleh = (t, m) => !batas || +t < bt || (+t === bt && +m <= bm);
        const kepala = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": admin ? "no-store" : "public, max-age=60", ...CORS };
        if (jalur === "/poshujan") {
          const ix = (await env.DATA.get(K_PH_INDEKS, "json")) || {}, out = {};
          for (const [t, x] of Object.entries(ix)) {
            const bl = (x.bulan || []).filter(m => boleh(t, m)); if (!bl.length && batas) { if (+t > bt) continue; }
            out[t] = batas ? { ...x, bulan: bl, lengkap: Object.fromEntries(Object.entries(x.lengkap || {}).filter(([m]) => boleh(t, m))) } : x;
          }
          res = new Response(JSON.stringify({ tahun: out }), { headers: kepala });
        } else {
          const t = jalur.slice(10); let isi = await env.DATA.get("poshujan:" + t); if (!isi) return json({ galat: "Tidak ada unggahan untuk tahun ini" }, 404);
          if (batas) { try { const d = JSON.parse(isi); if (d && d.bulan) { for (const m of Object.keys(d.bulan)) if (!boleh(t, m)) delete d.bulan[m]; } isi = JSON.stringify(d); } catch (e) {} }
          res = new Response(isi, { headers: kepala });
        }
        if (!admin) ctx.waitUntil(caches.default.put(kc, res.clone()));
      }
      return res;
    }
    if (jalur === "/bmkg-mentah") {
      // v11: daftar rilisan BMKG Pusat untuk tab Admin "BMKG Pusat" (termasuk yang disembunyikan, supaya bisa ditampilkan lagi).
      // Isinya rilisan publik BMKG Pusat; tidak ada data pribadi.
      const k = await bacaKonten(env), bm = (await env.DATA.get(K_BMKG, "json")) || {};
      const rapi = a => (a || []).map(({ kat, ...x }) => x);
      return json({ diambil: bm.diambil || null, galat: bm.galat || "", besar: rapi(bm.besar), berita: rapi(bm.berita), produk: rapi(bm.produk), sembunyi_bmkg: k.sembunyi_bmkg || [] }, 200, { "Cache-Control": "no-store" });
    }
    if (jalur === "/konten") {
      const kc = new Request(url.origin + "/konten");
      let res = await caches.default.match(kc);
      if (!res) {
        const k = await bacaKonten(env);
        const bm = (await env.DATA.get(K_BMKG, "json")) || {}, wp = (await env.DATA.get(K_WILPER, "json")) || null;
        const sembunyi = new Set(k.sembunyi_bmkg || []);
        const saring = a => (a || []).filter(x => !sembunyi.has(x.id)).map(({ kat, ...x }) => x);
        // update prakiraan musim yang belum boleh dilihat publik: isinya tidak dikirim
        const pgp = k.pengaturan ? { ...k.pengaturan } : null;
        if (pgp && pgp.pmh_update && !pgp.pmh_update.tampil) pgp.pmh_update = { tampil: false, diunggah: pgp.pmh_update.diunggah || "" };
        if (pgp && pgp.pmk_update && !pgp.pmk_update.tampil) pgp.pmk_update = { tampil: false, diunggah: pgp.pmk_update.diunggah || "" };
        if (pgp && pgp.info_das && !pgp.info_das.tampil) pgp.info_das = { tampil: false, terbaru: null, arsip: pgp.info_das.arsip || [] };
        res = json({ info: k.info, publikasi: k.publikasi, peringatan: k.peringatan, profil: k.profil || null, kondisi: k.kondisi || null, isi_iklim: k.isi_iklim || null, pengaturan: pgp, diubah: k.diubah,
          bmkg: { diambil: bm.diambil || null, besar: saring(bm.besar), berita: saring(bm.berita), produk: saring(bm.produk), iklim: (bm.iklim || []).filter(x => !sembunyi.has(x.id)), wilayah: wp } }, 200, { "Cache-Control": "public, max-age=60" });
        ctx.waitUntil(caches.default.put(kc, res.clone()));
      }
      return res;
    }
    if (jalur.startsWith("/file/")) {
      const kunci = jalur.slice(6);
      if (!/^[a-z0-9]+-[dg]$/.test(kunci)) return json({ galat: "Alamat file salah" }, 404);
      const dokKunci = kunci.endsWith("-d") && (await bacaPrivasi(env)).sembunyi_dok;
      if (dokKunci && !(await bolehAdmin(req, env))) return json({ galat: "Dokumen ini tidak dibuka untuk umum. Silakan hubungi Stasiun Klimatologi Papua Barat." }, 403);
      const kc = new Request(url.origin + "/file/" + kunci);
      let res = await caches.default.match(kc);
      if (!res) {
        const { value, metadata } = await ambilBerkas(env, "file:" + kunci);
        if (!value) return json({ galat: "File tidak ditemukan" }, 404);
        let m = metadata || {}, badan = value;
        const ex = kunci.endsWith("-d") ? await env.DATA.get("meta:" + kunci, "json") : null;
        if (ex && ex.bagian > 1) {
          m = { ...m, ...ex };
          const { readable, writable } = new TransformStream();
          ctx.waitUntil((async () => { await value.pipeTo(writable, { preventClose: true }); for (let i = 1; i < ex.bagian; i++) { const b = (await ambilBerkas(env, "file:" + kunci + "#" + i)).value; if (b) await b.pipeTo(writable, { preventClose: true }); } await writable.close(); })().catch(() => {}));
          badan = readable;
        }
        const aman = TIPE_GAMBAR.includes(m.tipe) || m.tipe === "application/pdf", tampil = aman || TIPE_DOK.includes(m.tipe);
        res = new Response(badan, { headers: { "Content-Type": tampil ? m.tipe : "application/octet-stream", "Content-Disposition": (aman ? "inline" : "attachment") + "; filename*=UTF-8''" + encodeURIComponent(m.nama || kunci), "Cache-Control": "public, max-age=604800", "X-Content-Type-Options": "nosniff", ...CORS } });
        ctx.waitUntil(caches.default.put(kc, res.clone()));
      }
      // dokumen yang dikunci untuk umum: salinan petugas tidak boleh disimpan cache bersama
      if (dokKunci) { res = new Response(res.body, res); res.headers.set("Cache-Control", "private, no-store"); }
      return res;
    }
    return json({ galat: "Alamat tidak dikenal. Gunakan /konten" }, 404);
  },
};
