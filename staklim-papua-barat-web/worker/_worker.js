// Cloudflare Pages (mode lanjutan): meneruskan /api/data/* dan /api/admin/* ke robot staklim-data & staklim-admin,
// supaya web tetap bisa mengambil data di jaringan yang memblokir alamat *.workers.dev.
// Paling baik memakai Service binding DATA -> staklim-data dan ADMIN -> staklim-admin (Pages > Settings > Bindings).
const ALAMAT = { data: "https://staklim-data.afifatzi02.workers.dev", admin: "https://staklim-admin.afifatzi02.workers.dev" };
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
    if (!m) return env.ASSETS.fetch(req);
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
