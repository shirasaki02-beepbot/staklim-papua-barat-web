// Cloudflare Pages (mode lanjutan): meneruskan /api/data/* dan /api/admin/* ke robot staklim-data & staklim-admin,
// supaya web tetap bisa mengambil data di jaringan yang memblokir alamat *.workers.dev.
// Paling baik memakai Service binding DATA -> staklim-data dan ADMIN -> staklim-admin (Pages > Settings > Bindings).
const ALAMAT = { data: "https://staklim-data.afifatzi02.workers.dev", admin: "https://staklim-admin.afifatzi02.workers.dev" };
// pembatas laju sederhana per alamat IP (di memori server Cloudflare): menahan bot/AI yang membanjiri permintaan
const LAJU = new Map();
function kenaBatas(ip, kunci, maks, detik) {
  if (!ip) return false;
  const k = kunci + "|" + ip, now = Date.now();
  let x = LAJU.get(k); if (!x || x.mulai + detik * 1000 < now) x = { mulai: now, n: 0 };
  x.n++; LAJU.set(k, x); if (LAJU.size > 20000) LAJU.clear();
  return x.n > maks;
}
export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    const m = u.pathname.match(/^\/api\/(data|admin)(\/.*)?$/);
    if (u.pathname === "/sitemap.xml") {
      // halaman yang isinya berubah setiap hari (data alat, info gempa, iklim per kabupaten) diberi tanggal hari ini
      const r = await env.ASSETS.fetch(req); if (!r.ok) return r;
      const hari = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
      const x = (await r.text()).replace(/<lastmod>[^<]*<\/lastmod>(<changefreq>(?:daily|hourly)<\/changefreq>)/g, "<lastmod>" + hari + "</lastmod>$1");
      return new Response(x, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    let jalurAsli = u.pathname; try { jalurAsli = decodeURIComponent(u.pathname); } catch (e) {}
    if (/^\/publikasi\/.*[^/]\.[^/]*$/i.test(jalurAsli) && !/\.(png|jpe?g|webp|gif|svg|avif|html?)$/i.test(jalurAsli.replace(/[\s.]+$/, ""))) {
      // dokumen bawaan di folder publikasi ikut dikunci bila Admin > Privasi Tampilan menyembunyikan unduhan dokumen
      let pv = {};
      try { const t = new Request(ALAMAT.admin + "/privasi"); const r = env.ADMIN && env.ADMIN.fetch ? await env.ADMIN.fetch(t) : await fetch(t); if (r.ok) pv = await r.json(); } catch (e) {}
      if (pv && pv.sembunyi_dok) return new Response("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><title>Dokumen tidak tersedia</title><body style='font-family:system-ui,sans-serif;max-width:520px;margin:15vh auto;padding:0 16px;color:#0f172a'><h1 style='font-size:22px'>Dokumen tidak dibuka untuk umum</h1><p>Silakan hubungi Stasiun Klimatologi Papua Barat untuk mendapatkan dokumen ini.</p><p><a href='/publikasi'>← Kembali ke Publikasi</a></p>", { status: 403, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
      return env.ASSETS.fetch(req);
    }
    if (!m) return env.ASSETS.fetch(req);
    // maks 120 permintaan/menit ke admin dan 1200/menit ke data per IP (longgar, karena banyak pengguna HP berbagi satu IP operator)
    const ipK = req.headers.get("cf-connecting-ip") || "";
    if (kenaBatas(ipK, m[1], m[1] === "admin" ? 120 : 1200, 60)) return new Response(JSON.stringify({ galat: "Terlalu banyak permintaan. Coba lagi sebentar lagi." }), { status: 429, headers: { "content-type": "application/json", "retry-after": "60", "x-content-type-options": "nosniff" } });
    const svc = m[1] === "data" ? env.DATA : env.ADMIN;
    const tujuan = ALAMAT[m[1]] + (m[2] || "/") + u.search;
    const h = new Headers(req.headers);
    const ipAsli = req.headers.get("cf-connecting-ip") || "";
    ["host", "cf-connecting-ip", "x-forwarded-for", "x-real-ip", "x-klien-ip"].forEach(k => h.delete(k));
    if (ipAsli) h.set("X-Klien-IP", ipAsli); // untuk pembatas percobaan password di robot admin
    const init = { method: req.method, headers: h, redirect: "manual" };
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) init.body = await req.arrayBuffer();
    try {
      const r = svc && svc.fetch ? await svc.fetch(new Request(tujuan, init)) : await fetch(tujuan, init);
      const ct = r.headers.get("content-type") || "";
      const rh = new Headers(r.headers);
      rh.set("X-Content-Type-Options", "nosniff");
      // galat dari Cloudflare sendiri (mis. 1042) bukan JSON dari robot kita: tandai supaya web mencoba alamat langsung
      if (r.status >= 400 && !ct.includes("json")) rh.set("x-proxy-galat", String(r.status));
      return new Response(r.body, { status: r.status, headers: rh });
    } catch (e) {
      return new Response(JSON.stringify({ galat: "Robot tidak terjangkau" }), { status: 502, headers: { "content-type": "application/json", "x-proxy-galat": "1" } });
    }
  }
};
