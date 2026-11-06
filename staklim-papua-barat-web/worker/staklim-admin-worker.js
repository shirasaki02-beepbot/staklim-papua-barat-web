// =====================================================================
//  Robot konten Stasiun Klimatologi Papua Barat (Cloudflare Worker)
//  - Halaman admin web (berpassword) menyimpan: info kantor, publikasi,
//    berita kegiatan, dan peringatan dini. File PDF/gambar disimpan di KV.
//  - Tiap 3 jam mengambil rilisan resmi BMKG pusat (content.bmkg.go.id)
//    untuk banner beranda, berita, dan publikasi nasional.
//  Pengaturan di Cloudflare:
//    KV binding  DATA        -> namespace STAKLIM_DATA (sama dengan robot data)
//    Secret      ADMIN_PASS  -> password halaman admin
//    (opsional) Workers AI binding bernama AI untuk "Isi ringkasan dari PDF"
//    (disarankan) R2 bucket binding BERKAS -> bucket staklim-berkas (gratis 10 GB).
//      Bila ada, file baru disimpan di R2; file lama di KV tetap bisa dibuka.
//    Cadangan isi web dibuat otomatis tiap minggu (disimpan 8 minggu terakhir).
//    Cron        0 */3 * * *
// =====================================================================
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Admin, X-Nama-File, X-Lanjut, X-Ke", "Access-Control-Max-Age": "86400" };
const json = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS, ...h } });
const K_KONTEN = "konten_admin", K_RIWAYAT = "konten_riwayat", K_BMKG = "bmkg_pusat";
const MAKS_FILE = 25 * 1024 * 1024, MAKS_GAMBAR = 5 * 1024 * 1024;
const JENIS = ["Buletin Iklim", "Prediksi Musim Hujan", "Prediksi Musim Kemarau", "Peringatan Dini", "Informasi Iklim", "Berita Kegiatan", "Lainnya"];
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
function isiIklimBersih(b) {
  const o = { sumber: teks(b && b.sumber, 160), diubah: new Date().toISOString() };
  BAGIAN_IKLIM.forEach(k => { if (b && b[k] && typeof b[k] === "object") o[k] = bersihDalam(b[k], 0); });
  if (b && b.teks_hal && typeof b.teks_hal === "object") { const t = {}; for (const [k, v] of Object.entries(b.teks_hal).slice(0, 40)) { const kk = String(k).replace(/[^\w]/g, "").slice(0, 40); const vv = teks(v, 3000); if (kk && vv) t[kk] = vv; } o.teks_hal = t; }
  o.peta = (Array.isArray(b && b.peta) ? b.peta : []).slice(0, 60).map(x => ({ k: teks(x && x.k, 30), sub: teks(x && x.sub, 20), prov: teks(x && x.prov, 6), bulan: teks(x && x.bulan, 40), judul: teks(x && x.judul, 220), file: /^[a-z0-9]+-g$/.test((x && x.file) || "") ? x.file : "", sumber: teks(x && x.sumber, 160) })).filter(x => x.k && x.file);
  return o;
}
const KAB_PB = "Manokwari, Manokwari Selatan, Pegunungan Arfak, Teluk Bintuni, Teluk Wondama, Fakfak, Kaimana";
const KAB_PBD = "Kota Sorong, Kab. Sorong, Raja Ampat, Sorong Selatan, Maybrat, Tambrauw";
const ATURAN = "Anda analis iklim Stasiun Klimatologi Papua Barat (BMKG). Ambil HANYA yang tertulis di teks. Jangan mengarang; bila tidak ada, isi kosong. Teks berasal dari PDF sehingga isi tabel bisa terpotong dan urutannya acak: cocokkan kategori dengan kabupaten berdasarkan kalimat penjelasan bila ada. Balas HANYA JSON tanpa penjelasan.";
const PROMPT_IKLIM = {
  analisis: "Bagian ANALISIS curah hujan dan sifat hujan BULAN LALU (bukan prakiraan). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". Kategori curah hujan: Rendah, Menengah, Tinggi, Sangat Tinggi. Sifat: Bawah Normal, Normal, Atas Normal (boleh rentang mis. 'Normal – Atas Normal'). Format: " +
    '{"bulan":"September 2026","pb":[{"kab":"","ch":"","sh":"","ket":""}],"pbd":[{"kab":"","ch":"","sh":"","ket":""}],"teks_pb":"","teks_pbd":""}. ket = catatan singkat mis. \"Sebagian wilayah Tinggi\". teks_* = 1-2 kalimat ringkasan.',
  prakiraan: "Bagian PRAKIRAAN curah hujan dan sifat hujan bulan-bulan mendatang (maks 3 bulan). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". Format: " +
    '{"bulan":[{"bulan":"November 2026","pb":[{"kab":"","ch":"","sh":"","ket":""}],"pbd":[{"kab":"","ch":"","sh":"","ket":""}],"teks":""}]}',
  ekstrem: "Bagian curah hujan EKSTREM harian (hujan lebat >=50 mm/hari, sangat lebat >=100 mm/hari). Format: " +
    '{"bulan":"","jumlah_pos":0,"lebat":[{"pos":"","mm":0}],"sangat_lebat":[{"pos":"","mm":0}],"teks":""}',
  hth: "Bagian monitoring HARI TANPA HUJAN (HTH) berturut-turut per dasarian. Kategori: Sangat Pendek 1-5, Pendek 6-10, Menengah 11-20, Panjang 21-30, Sangat Panjang 31-60, Kekeringan Ekstrem >60 hari. Isi JUMLAH POS per kategori. Format: " +
    '{"bulan":"","dasarian":[{"das":"I","sangat_pendek":0,"pendek":0,"menengah":0,"panjang":0,"sangat_panjang":0,"ekstrem":0,"teks":""}],"teks":""}',
  spi: "Bagian Indeks Presipitasi Terstandarisasi (SPI). Kabupaten Papua Barat: " + KAB_PB + ". Papua Barat Daya: " + KAB_PBD + ". kat contoh: Sangat Kering, Kering, Agak Kering, Normal, Agak Basah, Basah, Sangat Basah, atau rentang 'Kering – Sangat Kering'. Format: " +
    '{"bulan":"","pb":[{"kab":"","kat":"","ket":""}],"pbd":[{"kab":"","kat":"","ket":""}],"teks":""}',
  musim: "Dokumen PREDIKSI MUSIM (hujan atau kemarau). Untuk setiap nomor ZOM (Zona Musim) Papua Barat & Papua Barat Daya isi awal musim (bulan dan tahun, boleh dasarian), perbandingan terhadap normal (Maju/Sama/Mundur), sifat musim (Atas Normal/Normal/Bawah Normal), puncak musim (bulan tahun), dan wilayah (kabupaten beserta distrik dalam kurung). Format: " +
    '{"jenis":"hujan atau kemarau","periode":"2026/2027","zom":[{"no":636,"wil":"","awal":"","banding":"","sifat":"","puncak":""}],"teks":""}. teks = 2-3 kalimat ringkasan untuk masyarakat.'
};
const TIPE_GAMBAR = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TIPE_DOK = ["application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

async function bacaKonten(env) { return { ...kosong(), ...((await env.DATA.get(K_KONTEN, "json")) || {}) }; }
async function simpanKonten(env, k, aksi, req) {
  const lama = await env.DATA.get(K_KONTEN);
  if (lama) {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    r.unshift({ waktu: new Date().toISOString(), aksi, isi: lama });
    await env.DATA.put(K_RIWAYAT, JSON.stringify(r.slice(0, 20)));
  }
  k.diubah = new Date().toISOString();
  await env.DATA.put(K_KONTEN, JSON.stringify(k));
  await hapusCache(req);
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
//  Rilisan BMKG pusat
// ---------------------------------------------------------------------
const KAT = { 2: "Siaran Pers", 1: "Berita", 59: "Klimatologi", 233: "Buletin Iklim", 60: "Informasi Hujan Bulanan", 208: "SPI", 825: "Prakiraan Hujan", 8: "Outlook El Niño", 725: "Potensi Banjir", 899: "Index El Niño", 1638: "Anomali Suhu Udara", 1639: "Fakta Perubahan Iklim" };
const KAT_IKLIM = [59, 233, 60, 208, 825, 8, 725, 899, 1638, 1639];
const POLA_IKLIM = /iklim|musim|el ?ni[ñn]o|la ?ni[ñn]a|kemarau|kekeringan|hujan|siklon|karhutla|kabut asap|banjir|cuaca ekstrem|suhu|panas|modifikasi cuaca|dipole|\biod\b|hidrometeorologi/i;
const POLA_PAPUA = /papua barat|manokwari|sorong|raja ampat|fakfak|kaimana|bintuni|wondama|tambrauw|maybrat|pegunungan arfak/i;
const dekode = t => String(t || "").replace(/<[^>]+>/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\[&hellip;\]|&hellip;/g, "…").replace(/\s+/g, " ").trim();
function alamatBmkg(p) {
  const c = p.categories || [];
  if (c.includes(2)) return "https://www.bmkg.go.id/siaran-pers/" + p.slug;
  if (c.some(x => KAT_IKLIM.includes(x))) return "https://www.bmkg.go.id/iklim/" + p.slug;
  return "https://www.bmkg.go.id/berita/utama/" + p.slug;
}
async function ambilBmkg(env) {
  const dasar = "https://content.bmkg.go.id/wp-json/wp/v2/posts?_fields=id,date,slug,title,categories,excerpt,jetpack_featured_media_url&per_page=40";
  const sumber = [dasar + "&categories=2,59,233,60,208,825,8,725", dasar + "&search=" + encodeURIComponent("Papua Barat"), dasar.replace("per_page=40", "per_page=60") + "&categories=" + KAT_IKLIM.join(",")];
  const peta = new Map(), galat = [];
  for (const u of sumber) {
    try {
      const r = await fetch(u, { headers: { "User-Agent": "StaklimPapbarBot/1.0 (+https://staklim-pabar.pages.dev)", Accept: "application/json" } });
      if (!r.ok) { galat.push(u.includes("search") ? "pencarian Papua: HTTP " + r.status : "kategori: HTTP " + r.status); continue; }
      for (const p of await r.json()) if (p && p.id && !peta.has(p.id)) peta.set(p.id, p);
    } catch (e) { galat.push(String(e)); }
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
      kategori: c.map(x => KAT[x]).filter(Boolean), kat: c, papua: POLA_PAPUA.test(t), iklim: POLA_IKLIM.test(t) && !/gempa|tsunami/i.test(judul) };
  }).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  const umur = x => (sekarang - Date.parse(x.tanggal)) / 864e5;
  const besar = semua.filter(x => x.iklim && (x.kat.includes(2) || x.papua) && umur(x) <= 14).slice(0, 4);
  const berita = semua.filter(x => x.iklim && (x.kat.includes(2) || x.papua) && umur(x) <= 180).slice(0, 15);
  const produk = [233, 60, 825, 208, 8].map(k => semua.find(x => x.kat.includes(k))).filter(Boolean);
  const dinat = semua.find(x => /dinamika atmosfer/i.test(x.judul));
  if (dinat && !produk.includes(dinat)) produk.push(dinat);
  // untuk halaman-halaman Iklim: produk iklim terbaru BMKG pusat (dipilah per halaman di web)
  const iklim = semua.filter(x => x.kat.some(c => KAT_IKLIM.includes(c)) || (x.iklim && x.kat.includes(2))).slice(0, 60)
    .map(x => ({ id: x.id, tanggal: x.tanggal, judul: x.judul, ringkas: x.ringkas.slice(0, 200), url: x.url, gambar: x.gambar, kat: x.kat, papua: x.papua }));
  const hasil = { diambil: new Date().toISOString(), galat: galat.join("; ") || null, besar, berita, produk, iklim };
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
    return { judul: teks(o.judul, 200), ringkas: teks(o.ringkas, 600) };
  } catch (e) { return { galat: galatAI(e) || "AI gagal membaca: " + (e && e.message ? e.message : e) }; }
}

// ---------------------------------------------------------------------
//  Permintaan admin
// ---------------------------------------------------------------------
async function admin(req, env, jalur, ctx) {
  if ((await hitungGagal(req)) >= BATAS_GAGAL) return json({ galat: "Terlalu banyak percobaan password salah. Coba lagi 15 menit lagi." }, 429, { "Retry-After": "900" });
  if (!(await bolehAdmin(req, env))) { await catatGagal(req, ctx); await new Promise(r => setTimeout(r, 1000)); return json({ galat: env.ADMIN_PASS ? (/^t1\./.test(req.headers.get("X-Admin") || "") ? "Sesi admin sudah berakhir. Silakan masuk lagi." : "Password salah") : "Password admin (ADMIN_PASS) belum diisi di Cloudflare" }, 401); }
  if (jalur === "/admin/cek") return json({ ok: true, token: await buatToken(env), berlaku_jam: SESI_JAM });

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
    const kunci = buatId() + (gambar ? "-g" : "-d");
    await simpanBerkas(env, "file:" + kunci, req.body, { tipe, nama, ukuran });
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
  if (jalur === "/admin/riwayat") {
    const r = (await env.DATA.get(K_RIWAYAT, "json")) || [];
    return json({ riwayat: r.map((x, i) => ({ i, waktu: x.waktu, aksi: x.aksi })) });
  }
  if (jalur === "/admin/ambil-bmkg") { const h = await ambilBmkg(env); await hapusCache(req); return json(h); }

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
    const satu = x => ({ status: LV.includes(x && x.status) ? x.status : "nihil", jenis: x && x.jenis === "hujan" ? "hujan" : "kekeringan", berlaku: teks(x && x.berlaku, 120), wilayah: teks(x && x.wilayah, 1500), catatan: teks(x && x.catatan, 600), sampai: tgl(x && x.sampai) });
    const daftar = (Array.isArray(b.daftar) ? b.daftar.slice(0, 30) : [b]).map(satu).filter(x => x.status !== "nihil" && x.wilayah);
    daftar.sort((x, y) => LV.indexOf(y.status) - LV.indexOf(x.status));
    const atas = daftar[0];
    k.peringatan = { status: atas ? atas.status : "nihil", jenis: atas ? atas.jenis : "kekeringan", berlaku: teks(b.berlaku, 120) || (atas ? atas.berlaku : ""), wilayah: atas ? atas.wilayah : "", catatan: teks(b.catatan, 600), sampai: "", daftar, diubah: new Date().toISOString() };
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
    k.kondisi = { sumber: teks(b.sumber, 120), ringkasan: teks(b.ringkasan, 400), kartu: kartuBersih(b.kartu), teks: teksBersih(b.teks), otomatis: teks(b.otomatis, 160), diubah: new Date().toISOString() };
    await simpanKonten(env, k, "Ubah kondisi iklim (" + (k.kondisi.sumber || "tanpa sumber") + ")", req);
    return json({ ok: true, kondisi: k.kondisi });
  }
  if (jalur === "/admin/iklim") {
    // isi halaman Iklim (tabel, peta, ZOM) dari dokumen yang diunggah atau dibetulkan petugas
    const o = isiIklimBersih(b);
    if (JSON.stringify(o).length > 300000) return json({ galat: "Isi terlalu besar" }, 400);
    if (!o.teks_hal && k.isi_iklim && k.isi_iklim.teks_hal) o.teks_hal = k.isi_iklim.teks_hal;
    k.isi_iklim = o;
    await simpanKonten(env, k, "Ubah isi halaman Iklim (" + (o.sumber || "tanpa sumber") + ")", req);
    return json({ ok: true, isi_iklim: o });
  }
  if (jalur === "/admin/pengaturan") {
    // pengaturan tampilan yang bisa diubah petugas: publikasi bawaan yang disembunyikan, data alat, info wilayah
    const BAG = { sembunyi_pub: "Ubah publikasi bawaan", alat: "Ubah data peralatan", wilayah: "Ubah info wilayah" };
    const kunci = String(b.kunci || "");
    if (!BAG[kunci]) return json({ galat: "Pengaturan tidak dikenal" }, 400);
    const nilai = bersihDalam(b.nilai, 0);
    if (JSON.stringify(nilai || "").length > 200000) return json({ galat: "Isi terlalu besar" }, 400);
    k.pengaturan = { ...(k.pengaturan || {}), [kunci]: nilai };
    await simpanKonten(env, k, BAG[kunci], req);
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
    await simpanKonten(env, { ...kosong(), ...c }, "Pulihkan dari cadangan " + (b.tanggal || teks(b.nama, 80) || "file"), req);
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
    await hapusCache(req);
    return json({ ok: true });
  }
  return json({ galat: "Perintah admin tidak dikenal" }, 404);
}

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(ambilBmkg(env).catch(() => {})); ctx.waitUntil(cadanganMingguan(env).catch(() => {})); },
  async fetch(req, env, ctx) {
    const url = new URL(req.url), jalur = url.pathname;
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (jalur.startsWith("/admin/")) return admin(req, env, jalur, ctx);

    if (jalur === "/konten") {
      const kc = new Request(url.origin + "/konten");
      let res = await caches.default.match(kc);
      if (!res) {
        const k = await bacaKonten(env);
        const bm = (await env.DATA.get(K_BMKG, "json")) || {};
        const sembunyi = new Set(k.sembunyi_bmkg || []);
        const saring = a => (a || []).filter(x => !sembunyi.has(x.id)).map(({ kat, ...x }) => x);
        res = json({ info: k.info, publikasi: k.publikasi, peringatan: k.peringatan, profil: k.profil || null, kondisi: k.kondisi || null, isi_iklim: k.isi_iklim || null, pengaturan: k.pengaturan || null, diubah: k.diubah,
          bmkg: { diambil: bm.diambil || null, besar: saring(bm.besar), berita: saring(bm.berita), produk: saring(bm.produk), iklim: (bm.iklim || []).filter(x => !sembunyi.has(x.id)) } }, 200, { "Cache-Control": "public, max-age=60" });
        ctx.waitUntil(caches.default.put(kc, res.clone()));
      }
      return res;
    }
    if (jalur === "/bmkg-mentah") { // untuk halaman admin: semua rilisan termasuk yang disembunyikan
      const k = await bacaKonten(env);
      return json({ ...((await env.DATA.get(K_BMKG, "json")) || {}), sembunyi_bmkg: k.sembunyi_bmkg || [] });
    }
    if (jalur.startsWith("/file/")) {
      const kunci = jalur.slice(6);
      if (!/^[a-z0-9]+-[dg]$/.test(kunci)) return json({ galat: "Alamat file salah" }, 404);
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
      return res;
    }
    return json({ galat: "Alamat tidak dikenal. Gunakan /konten" }, 404);
  },
};
