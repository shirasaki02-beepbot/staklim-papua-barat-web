/* Notifikasi HP petugas — Permintaan Pelayanan Data, Stasiun Klimatologi Papua Barat.
   Pesan dikirim tanpa isi; isi notifikasi diambil dari robot (hanya untuk HP yang terdaftar). */
const API = /\.pages\.dev$/.test(self.location.hostname) ? self.location.origin + "/api/admin" : "https://staklim-admin.afifatzi02.workers.dev";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  e.waitUntil((async () => {
    let p = { judul: "Permintaan Pelayanan Data", isi: "Ada pembaruan permohonan data. Buka Admin untuk melihat.", tiket: "" };
    try {
      const s = await self.registration.pushManager.getSubscription();
      const r = await fetch(API + "/layanan/push-pesan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: s && s.endpoint }) });
      const j = await r.json(); if (j && j.pesan) p = j.pesan;
    } catch (er) {}
    return self.registration.showNotification(p.judul, { body: p.isi, tag: p.tiket || "pd", renotify: true, icon: "/img/bmkg-logo.png", badge: "/img/bmkg-logo.png", data: { url: "/admin" } });
  })());
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(L => {
    for (const c of L) if (c.url.includes("/admin") && "focus" in c) return c.focus();
    return self.clients.openWindow("/admin");
  }));
});
