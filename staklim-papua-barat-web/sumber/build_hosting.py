"""Membuat folder hosting web-staklim/ dari file sumber staklim-papua-barat.html.

Hasil:
  web-staklim/index.html      halaman utama
  web-staklim/konten.js       publikasi dan berita (bisa diubah sendiri)
  web-staklim/img/            logo, peta cadangan BMKG, peta PMH
  web-staklim/publikasi/      PDF yang bisa diunduh
"""
import base64, os, re, shutil, zipfile

SRC = "sumber/staklim-papua-barat.html"
OUT = "situs"
PDF = {
    "Press_Release_PMH_2026_2027.pdf": "/mnt/user-data/attachments/c66a32c8-ed7d-560f-8e84-29ddbd64050d/98af82f9-Ringkasan_Press_Release_PMH_2026_2027.pdf",
    "Paparan_FGD_PMH_2026_2027.pdf": "/mnt/user-data/attachments/c66a32c8-ed7d-560f-8e84-29ddbd64050d/ee510d0f-PAPARAN_PMH.pdf",
}

s = open(SRC, encoding="utf-8").read()
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT + "/img"); os.makedirs(OUT + "/publikasi")


def simpan_datauri(uri, nama):
    kepala, isi = uri.split(",", 1)
    ext = "png" if "png" in kepala else "jpg"
    path = f"img/{nama}.{ext}"
    open(f"{OUT}/{path}", "wb").write(base64.b64decode(isi))
    return path


# 1. logo
m = re.search(r'<img class="logo" src="(data:image/[^"]+)"', s)
s = s.replace(m.group(1), simpan_datauri(m.group(1), "bmkg-logo"))

# 2. objek gambar SNAP dan GBR
for obj, awalan in (("SNAP", "cadangan-"), ("GBR", "")):
    m = re.search(r"const %s=\{(.*?)\};" % obj, s, re.S)
    pasangan = re.findall(r'"?([\w-]+)"?:"(data:image/[^"]+)"', m.group(1))
    baru = ",".join('"%s":"%s"' % (k, simpan_datauri(v, awalan + k)) for k, v in pasangan)
    s = s[:m.start()] + "const %s={%s};" % (obj, baru) + s[m.end():]

# 3. konten.js
a = s.index("/*KONTEN-MULAI*/"); b = s.index("/*KONTEN-SELESAI*/") + len("/*KONTEN-SELESAI*/")
konten = s[a:b].replace("/*KONTEN-MULAI*/", "").replace("/*KONTEN-SELESAI*/", "").strip() + "\n"
open(OUT + "/konten.js", "w", encoding="utf-8").write(
    "/* konten.js — Stasiun Klimatologi Papua Barat\n"
    "   Buka file ini dengan Notepad untuk menambah publikasi dan berita.\n"
    "   Perhatikan tanda koma di akhir setiap blok { ... }, dan jangan menghapus tanda [ ] ; */\n\n" + konten)
s = s[:a] + s[b:]
i = s.rindex("<script>")
import time as _t
s = s[:i] + '<script src="konten.js?v=%d"></script>\n' % int(_t.time()) + s[i:]

# 4. kerangka halaman lengkap
i = s.index("<style>")
headpart, rest = s[:i], s[i:]
j = rest.index("</style>") + len("</style>")
style, body = rest[:j], rest[j:]
reset = ('<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
         'body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}'
         '[hidden]{display:none!important}</style>\n')
html = ('<!doctype html>\n<html lang="id">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="description" content="Informasi klimatologi Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat, BMKG.">\n'
        '<link rel="icon" href="img/bmkg-logo.png">\n'
        '<link rel="canonical" href="https://staklim-pabar.pages.dev/">\n'
        '<meta name="theme-color" content="#0f172a">\n'
        '<meta property="og:type" content="website">\n'
        '<meta property="og:title" content="Stasiun Klimatologi Papua Barat">\n'
        '<meta property="og:description" content="Informasi iklim, prakiraan musim, peringatan dini, dan data AWS/ARG langsung untuk Papua Barat dan Papua Barat Daya.">\n'
        '<meta property="og:url" content="https://staklim-pabar.pages.dev/">\n'
        '<meta property="og:image" content="https://staklim-pabar.pages.dev/img/bmkg-logo.png">\n'
        '<meta property="og:site_name" content="Stasiun Klimatologi Kelas III Papua Barat">\n'
        '<meta name="application-name" content="Stasiun Klimatologi Kelas III Papua Barat">\n'
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"Stasiun Klimatologi Kelas III Papua Barat","alternateName":["Staklim Papua Barat","BMKG Stasiun Klimatologi Papua Barat"],"url":"https://staklim-pabar.pages.dev/"}</script>\n'
        '<script type="application/ld+json">{"@context":"https://schema.org","@type":"GovernmentOrganization","name":"Stasiun Klimatologi Papua Barat","parentOrganization":{"@type":"GovernmentOrganization","name":"BMKG"},"url":"https://staklim-pabar.pages.dev/","logo":"https://staklim-pabar.pages.dev/img/bmkg-logo.png","email":"staklim.papuabarat@bmkg.go.id","telephone":"+6285244851969","sameAs":["https://www.instagram.com/staklim_papbar/"],"address":{"@type":"PostalAddress","streetAddress":"Kompleks Perkantoran Gubernur Papua Barat, Jl. Brigjen Marinir Abraham O. Atururi, Arfai","addressLocality":"Manokwari","addressRegion":"Papua Barat","postalCode":"98315","addressCountry":"ID"}}</script>\n'
        + headpart.replace("<title>Staklim Papua Barat</title>", "<title>Stasiun Klimatologi Papua Barat</title>")
        + reset + style + "\n</head>\n<body>\n" + body + "\n</body>\n</html>\n")
# 4a. SEO: skrip & gaya dipisah (app.js / app.css), lalu satu file HTML per halaman
import json as _js, hashlib as _hl, datetime as _dt
html = html.replace('alternateName":["Staklim Papua Barat","BMKG Stasiun Klimatologi Papua Barat"]',
    'alternateName":["Staklim Papua Barat","Staklim Pabar","Staklim Papbar","Stasiun Klimatologi Papua Barat","Stasiun Klimatologi Manokwari","BMKG Papua Barat","BMKG Stasiun Klimatologi Papua Barat"]')
_i = html.index("<style>", html.index("</style>"))  # gaya utama (yang kedua)
_j = html.index("</style>", _i)
css = html[_i + 7:_j]
_k = html.rindex("<script>"); _l = html.index("</script>", _k)
js = html[_k + 8:_l]
_v = lambda t: _hl.md5(t.encode()).hexdigest()[:10]
open(OUT + "/app.css", "w", encoding="utf-8").write(css)
open(OUT + "/app.js", "w", encoding="utf-8").write(js)
html = html[:_k] + '<script src="/app.js?v=%s"></script>' % _v(js) + html[_l + 9:]
html = html[:_i] + '<link rel="stylesheet" href="/app.css?v=%s">' % _v(css) + html[_j + 8:]
html = html.replace('<script src="konten.js?', '<script src="/konten.js?').replace('href="img/bmkg-logo.png"', 'href="/img/bmkg-logo.png"')
html = html.replace("<head>\n", '<head>\n<script>window.RUTE_PATH=1</script>\n', 1)
_rute = set(_js.loads(re.search(r"const META_HAL=(\{.*?\});\n", s).group(1)).keys()) | {"kontak"}
html = re.sub(r'href="#([a-z0-9-]+)"', lambda m: 'href="%s"' % ("/" if m.group(1) == "beranda" else "/" + m.group(1)) if (m.group(1) in _rute or m.group(1).startswith("iklim-")) and "<script" not in m.group(0) else m.group(0), html.split("<script src=\"/app.js")[0]) + ("<script src=\"/app.js" + html.split("<script src=\"/app.js",1)[1] if "<script src=\"/app.js" in html else "")
META = _js.loads(re.search(r"const META_HAL=(\{.*?\});\n", s).group(1))
KW = _js.loads(re.search(r"const META_KW=(\".*?\");\n", s).group(1))
html = html.replace('<meta name="theme-color"', '<meta name="keywords" content="%s">\n<meta name="robots" content="index,follow">\n<meta name="theme-color"' % KW, 1)
ALAT_SEO = re.findall(r'\{nama:"([^"]+)",id:"([^"]+)",jenis:"(AWS|ARG)",logger:"[^"]*",wil:"([^"]*)"', s)
from html import escape as _e
BASE = "https://staklim-pabar.pages.dev"
def halaman(k, judul, desk, noindex=False):
    u = BASE + ("/" if k == "beranda" else "/" + k)
    h = html
    h = re.sub(r"<title>.*?</title>", "<title>%s</title>" % _e(judul), h, 1)
    h = h.replace(re.search(r'<meta name="description" content="[^"]*">', h).group(0), '<meta name="description" content="%s">' % _e(desk), 1)
    h = h.replace('<link rel="canonical" href="https://staklim-pabar.pages.dev/">', '<link rel="canonical" href="%s">' % u, 1)
    h = h.replace('<meta property="og:url" content="https://staklim-pabar.pages.dev/">', '<meta property="og:url" content="%s">' % u, 1)
    h = re.sub(r'<meta property="og:title" content="[^"]*">', '<meta property="og:title" content="%s">' % _e(judul), h, 1)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="%s">' % _e(desk), h, 1)
    if noindex: h = h.replace('<meta name="robots" content="index,follow">', '<meta name="robots" content="noindex">', 1)
    # isi awal untuk mesin pencari (diganti tampilan lengkap begitu skrip berjalan)
    h = h.replace('<div class="wrap" id="app"></div>', '<div class="wrap" id="app"><h1>%s</h1><p>%s</p></div>' % (_e(judul), _e(desk)), 1)
    return h
SITEMAP = []
for k, (judul, desk) in META.items():
    if k == "admin": continue
    nama = "index.html" if k == "beranda" else k + ".html"
    open(f"{OUT}/{nama}", "w", encoding="utf-8").write(halaman(k, judul, desk))
    SITEMAP.append(("/" if k == "beranda" else "/" + k, "daily" if k in ("beranda", "peralatan", "berita") else "weekly", "1.0" if k == "beranda" else "0.8"))
for nama, aid, jenis, wil in ALAT_SEO:
    judul = nama + " – Data Cuaca Langsung" + (" " + wil if wil else "") + " | BMKG Papua Barat"
    desk = "Data langsung " + nama + (" (" + wil + ")" if wil else "") + ": " + ("suhu, kelembapan, angin, tekanan, dan " if jenis == "AWS" else "") + "curah hujan hari ini, grafik 24 jam, dan rekap harian. Stasiun Klimatologi Papua Barat, BMKG."
    open(f"{OUT}/alat-{aid}.html", "w", encoding="utf-8").write(halaman("alat-" + aid, judul, desk))
    SITEMAP.append(("/alat-" + aid, "hourly", "0.6"))
# halaman iklim per kabupaten/kota
KABS = [(k, "pb") for k in ["Manokwari","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana"]] + [(k, "pbd") for k in ["Kota Sorong","Kab. Sorong","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw"]]
for kab, p in KABS:
    sl = "iklim-" + kab.lower().replace("kab. ", "kabupaten-").replace(" ", "-")
    n = kab.replace("Kab. ", "Kabupaten "); prov = "Papua Barat Daya" if p == "pbd" else "Papua Barat"
    judul = "Prakiraan Hujan & Iklim " + n + " – BMKG " + prov
    desk = "Info iklim dan cuaca " + n + ", " + prov + ": curah hujan bulan lalu, prakiraan hujan 3 bulan ke depan, hari tanpa hujan, peringatan kekeringan, zona musim, dan data hujan langsung dari BMKG Stasiun Klimatologi Papua Barat."
    open(f"{OUT}/{sl}.html", "w", encoding="utf-8").write(halaman(sl, judul, desk))
    SITEMAP.append(("/" + sl, "daily", "0.9"))
# halaman lain (admin, detail berita) dilayani 404.html yang tetap menjalankan web
open(f"{OUT}/404.html", "w", encoding="utf-8").write(halaman("beranda", META["beranda"][0], META["beranda"][1], noindex=True))
TGL = _dt.date.today().isoformat()

# 4b. foto pegawai
if os.path.isdir('img/pegawai'):
    shutil.copytree('img/pegawai', OUT + '/img/pegawai')
# 4c. sampul publikasi (gambar dari dokumen PDF)
if os.path.isdir('img/sampul'):
    shutil.copytree('img/sampul', OUT + '/img/sampul')

# 5. PDF
for nama, sumber in PDF.items():
    shutil.copy(sumber, f"{OUT}/publikasi/{nama}")

# 5b. verifikasi Google, robots.txt, sitemap.xml
shutil.copy("/mnt/user-data/attachments/c66a32c8-ed7d-560f-8e84-29ddbd64050d/bb45d964-google4bd3e4cdcd42b0d6.html", OUT + "/google4bd3e4cdcd42b0d6.html")
import shutil as _sh
_sh.copy("worker/_worker.js", OUT + "/_worker.js")
# kontak pelaporan celah keamanan (standar RFC 9116)
os.makedirs(OUT + "/.well-known", exist_ok=True)
_exp = (_dt.date.today() + _dt.timedelta(days=365)).isoformat()
open(OUT + "/.well-known/security.txt", "w").write(f"""Contact: mailto:staklim.papuabarat@bmkg.go.id
Expires: {_exp}T00:00:00.000Z
Preferred-Languages: id, en
Canonical: https://staklim-pabar.pages.dev/.well-known/security.txt
""")
# header keamanan untuk semua halaman statis (CSP, anti-clickjacking, HSTS, dll.)
open(OUT + "/_headers", "w").write("""/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Cross-Origin-Opener-Policy: same-origin-allow-popups
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' https:; connect-src 'self' https:; frame-src https://www.google.com https://maps.google.com; worker-src 'self' blob: https://cdnjs.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests
""")
open(OUT + "/_routes.json", "w").write('{"version":1,"include":["/api/*","/sitemap.xml"],"exclude":[]}\n')
open(OUT + "/robots.txt", "w").write("User-agent: *\nAllow: /\n\nSitemap: https://staklim-pabar.pages.dev/sitemap.xml\n")
open(OUT + "/sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f'  <url><loc>https://staklim-pabar.pages.dev{p}</loc><lastmod>{TGL}</lastmod><changefreq>{c}</changefreq><priority>{pr}</priority></url>\n' for p, c, pr in SITEMAP)
    + "".join(f'  <url><loc>https://staklim-pabar.pages.dev/publikasi/{n}</loc><changefreq>monthly</changefreq></url>\n' for n in PDF)
    + '</urlset>\n')

# 6. zip
zp = "/home/claude/web-staklim.zip"
with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(OUT):
        for f in files:
            full = os.path.join(root, f)
            z.write(full, os.path.relpath(full, os.path.dirname(OUT)))
for root, _, files in os.walk(OUT):
    for f in files:
        full = os.path.join(root, f)
        print(f"{os.path.getsize(full)//1024:>7} KB  {os.path.relpath(full, OUT)}")
print("zip", os.path.getsize(zp) // 1024, "KB")
