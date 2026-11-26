
/* Data & konten diambil lewat alamat web sendiri (/api/...) agar tetap terbuka di jaringan yang memblokir *.workers.dev.
   Bila jalur itu bermasalah, otomatis kembali ke alamat robot langsung. */
const LANGSUNG={"/api/data":"https://staklim-data.afifatzi02.workers.dev","/api/admin":"https://staklim-admin.afifatzi02.workers.dev"};
const LEWAT_API=location.protocol==="https:"&&/\.pages\.dev$/.test(location.hostname);
if(LEWAT_API){const f0=window.fetch.bind(window),awal=location.origin+"/api/";
 const ke=u=>{const m=u.slice(location.origin.length).match(/^(\/api\/(?:data|admin))(.*)$/);return m?LANGSUNG[m[1]]+m[2]:u};
 window.fetch=(u,o)=>{const s=typeof u==="string"?u:u&&u.url;if(!s||!s.startsWith(awal)||typeof u!=="string")return f0(u,o);
  return f0(u,o).then(r=>{if(r.headers.get("x-proxy-galat"))throw new Error("proxy");return r}).catch(()=>f0(ke(u),o))}}

const SNAP={"zom":"img/cadangan-zom.jpg","hth":"img/cadangan-hth.jpg","pdkm":"img/cadangan-pdkm.jpg","pdcht":"img/cadangan-pdcht.jpg"};
const GBR={"zom-tipe-hujan":"img/zom-tipe-hujan.jpg","pmh-awal-pb":"img/pmh-awal-pb.jpg","pmh-banding-pb":"img/pmh-banding-pb.jpg","pmh-banding-pbd":"img/pmh-banding-pbd.jpg","pmh-sifat-pb":"img/pmh-sifat-pb.jpg","pmh-sifat-pbd":"img/pmh-sifat-pbd.jpg","pmh-puncak-pb":"img/pmh-puncak-pb.jpg","pmh-puncak-pbd":"img/pmh-puncak-pbd.jpg"};
const KAB=["Manokwari","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana"];
const BLN=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const S='<span class="sample">Data contoh</span>';
const ic=(p)=>`<span class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg></span>`;
const I={drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',wave:'<path d="M2 12c3-4 5-4 8 0s5 4 8 0 3-2 4-2"/><path d="M2 18c3-4 5-4 8 0s5 4 8 0"/>',leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17v.5"/>',map:'<path d="M9 4l-6 3v13l6-3 6 3 6-3V4l-6 3z"/><path d="M9 4v13M15 7v13"/>',cloud:'<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1 0 8z"/>'};

function head(crumb,title,desc){return `<div class="page-hero"><div class="crumb"><a href="#beranda">Beranda</a> &gt;&gt; ${crumb}</div><h1>${title}</h1><p>${desc}</p></div>`}

function bars(vals,max,labels,unit,color){
  const W=640,H=240,L=44,B=28,T=14,cw=(W-L-10)/vals.length;
  const ticks=[0,max*.25,max*.5,max*.75,max];
  let g=ticks.map(t=>{const y=H-B-(t/max)*(H-B-T);return `<line x1="${L}" x2="${W-6}" y1="${y}" y2="${y}" stroke="var(--line)"/><text x="${L-6}" y="${y+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(t)}</text>`}).join("");
  let b=vals.map((v,i)=>{const h=(v/max)*(H-B-T),x=L+i*cw+cw*.18;return `<rect x="${x}" y="${H-B-h}" width="${cw*.64}" height="${h}" rx="3" fill="${typeof color==='function'?color(v):color}"><title>${labels[i]}: ${v} ${unit}</title></rect><text x="${x+cw*.32}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${labels[i]}</text>`}).join("");
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik batang">${g}${b}<text x="4" y="12" font-size="11" fill="var(--muted)">${unit}</text></svg></div>`;
}
function catColor(v){return v<100?"#c8a15a":v<300?"#7fbf6a":v<500?"#2f8fd1":"#1f3f7a"}

const P={};
/* ---- Data Prediksi Musim Hujan 2026/2027 (Press Release & Paparan FGD, Oktober 2026) ---- */
const ZOM11=[
 {no:636,wil:"Kab. Manokwari (Manokwari Utara, Manokwari Barat, Manokwari Timur)",okt:1,banding:"Maju",sifat:"Normal"},
 {no:637,wil:"Kab. Manokwari (Manokwari Selatan, Masni, Warmare)",okt:1,banding:"Maju",sifat:"Normal"},
 {no:638,wil:"Kab. Manokwari Selatan (Oransbari, Ransiki)",okt:0,banding:"Sama",sifat:"Normal"},
 {no:639,wil:"Kab. Manokwari (Tanah Rubuh, Manokwari Selatan); Kab. Manokwari Selatan (Dataran Isim, Momiwaren, Neney, Oransbari, Ransiki, Tahota); Kab. Pegunungan Arfak (Anggi Gida, Membey, Sururey); Kab. Teluk Bintuni (Dataran Beimes, Menimeri); Kab. Teluk Wondama (Soug Jaya)",okt:0,banding:"Maju",sifat:"Atas Normal"},
 {no:640,wil:"Kab. Manokwari (Manokwari Selatan, Masni, Prafi, Sidey, Tanah Rubuh, Warmare); Kab. Manokwari Selatan (Dataran Isim, Neney); Kab. Pegunungan Arfak (Anggi, Anggi Gida, Catubouw, Didohu, Hingk, Membey, Minyambouw, Sururey, Taige, Testega); Kab. Teluk Bintuni (Biscoop, Dataran Beimes); Kab. Tambrauw (Ambarbaken, Kebar, Mubrani)",okt:0,banding:"Maju",sifat:"Normal"},
 {no:646,wil:"Kab. Fakfak (Bomberay, Karas, Mbahamdandara, Tomage); Kab. Kaimana (Buruway, Kambrau); Kab. Teluk Bintuni (Aroba, Babo, Fafurwar, Kaitaro, Sumuri)",okt:1,banding:"Mundur",sifat:"Normal"},
 {no:649,wil:"Kab. Manokwari (Sidey); Kab. Pegunungan Arfak (Testega); Kab. Teluk Bintuni (Masyeta, Moskona Timur); Kab. Tambrauw (Ambarbaken, Kebar)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:650,wil:"Kab. Tambrauw (Abun, Ambarbaken, Kwoor, Sausapor)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:651,wil:"Kab. Teluk Bintuni (Moskona Utara); Kab. Tambrauw (Abun, Fef, Kwoor, Miyah, Sausapor, Senopi, Yembun)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:655,wil:"Kab. Raja Ampat (Ayau, Kofiau, Kota Waisai, Meos Mansar, Supnin, Teluk Mayalibit, Tiplol Mayalibit, Waigeo Barat, Waigeo Barat Daratan, Waigeo Barat Kepulauan, Waigeo Selatan, Waigeo Timur, Waigeo Utara, Warwarbomi)",okt:0,banding:"Sama",sifat:"Atas Normal"},
 {no:656,wil:"Kab. Raja Ampat (Kepulauan Sembilan, Kofiau, Misool Barat, Misool Selatan, Misool Timur, Misool Utara)",okt:0,banding:"Mundur",sifat:"Atas Normal"}];
const NONZOM=[641,642,643,644,645,647,648,652,653,654];
const SIFAT_NONZOM={641:"Normal",642:"Normal",643:"Normal",644:"Normal",653:"Normal",645:"Bawah Normal",647:"Bawah Normal",648:"Bawah Normal",652:"Bawah Normal",654:"Bawah Normal"};
const PILL_B={Maju:"ok",Sama:"",Mundur:"warn"},PILL_S={"Atas Normal":"ok",Normal:"","Bawah Normal":"warn"};
function petaTab(grup,isi){return `<div class="panel"><div class="panel-head"><span>Peta Prediksi Musim Hujan 2026/2027</span><div class="tabs" data-grup="${grup}">${isi.map((t,i)=>`<button type="button" class="${i?"":"on"}" data-t="${i}">${t.lab}</button>`).join("")}</div></div>
<div class="panel-body">${isi.map((t,i)=>`<div data-pgrup="${grup}" data-p="${i}"${i?" hidden":""}><div class="petas${t.g.length>1?" dua":""}">${t.g.map(g=>`<figure class="map"><img src="${GBR[g[0]]}" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join("")}</div>${t.ket?`<p class="note">${t.ket}</p>`:""}</div>`).join("")}</div></div>`}
/* rincian tiap ZOM Prediksi Musim Hujan 2026/2027 (Press Release & peta paparan FGD Oktober 2026) */
const ZOM_PMH={636:["Oktober III 2026","Maju","Normal","Januari 2027","Lebih panjang (≥ 3 dasarian)"],637:["Oktober III 2026","Maju","Normal","Maret 2027","Lebih pendek (1 dasarian)"],
 638:["Desember III 2026","Sama","Normal","Maret 2027","Lebih pendek (≥ 3 dasarian)"],639:["Maret I 2027","Maju","Atas Normal","April 2027","Lebih pendek (2 dasarian)"],
 640:["November II 2026","Maju","Normal","Maret 2027","Lebih panjang (≥ 3 dasarian)"],646:["Oktober III 2026","Mundur","Normal","Februari 2027","Lebih panjang (1 dasarian)"],
 649:["Oktober II 2026","Mundur","Atas Normal","Oktober 2026","Lebih pendek (≥ 3 dasarian)"],650:["Oktober III 2026","Mundur","Atas Normal","Januari 2027","Lebih pendek (≥ 3 dasarian)"],
 651:["Oktober III 2026","Mundur","Atas Normal","Januari 2027","Lebih pendek (≥ 3 dasarian)"],655:["November I 2026","Sama","Atas Normal","Januari 2027","Lebih pendek (1 dasarian)"],
 656:["Desember II 2026","Mundur","Atas Normal","Juni 2027","Lebih pendek (≥ 3 dasarian)"],
 641:["","","Normal","Desember 2026",""],642:["","","Normal","Februari 2027",""],643:["","","Normal","Februari 2027",""],644:["","","Normal","Januari 2027",""],645:["","","Bawah Normal","Januari 2027",""],
 647:["","","Bawah Normal","Januari 2027",""],648:["","","Bawah Normal","Desember 2026",""],652:["","","Bawah Normal","November 2026",""],653:["","","Normal","Februari 2027",""],654:["","","Bawah Normal","Desember 2026",""]};
/* wilayah Non-ZOM (Tipe 1 Musim): Buletin PMH 2026/2027 Stasiun Klimatologi Papua Barat (Tabel 1 dan daftar kecamatan Tabel 2) */
const WIL_NONZOM={641:"Kab. Teluk Bintuni (Biscoop, Dataran Beimes, Menimeri, Tuhiba); Kab. Teluk Wondama (Rumberpon, Soug Jaya)",
 642:"Kab. Teluk Bintuni (Merdey, Moskona Selatan)",
 643:"Kab. Teluk Bintuni (Aranday, Bintuni, Kamundan, Tembuni, Tomu, Weriagar); Kab. Sorong Selatan (Inanwatan)",
 644:"Kab. Teluk Wondama (Kuriwamesa, Naikere, Nikiwar, Roon, Roswar, Teluk Duairi, Wamesa, Wasior, Windesi, Wondiboy); Kab. Kaimana (Kaimana, Teluk Arguni Atas, Teluk Arguni Bawah); Kab. Teluk Bintuni (Kuri, Wamesa)",
 645:"Kab. Kaimana (Teluk Etna, Yamor)",
 647:"Kab. Fakfak (Arguni, Fakfak, Fakfak Barat, Fakfak Tengah, Fakfak Timur, Fakfak Timur Tengah, Furwagi, Kayauni, Kokas, Kramongmongga, Pariwari, Teluk Patipi, Wartutin)",
 648:"Kab. Fakfak, sebagian bagian selatan; Kab. Kaimana, sebagian kecil bagian barat",
 652:"Kab. Maybrat (Aifat, Aifat Timur, Aifat Utara, Aitinyo, Ayamaru, Ayamaru Utara, Mare); Kab. Sorong (Beraur, Klabot, Klamono, Sayosa, Segun); Kab. Sorong Selatan (Moswaren, Sawiat, Seremuk, Teminabuan, Wayer); Kab. Teluk Bintuni (Moskona Barat)",
 653:"Kab. Sorong Selatan (Kais, Kokoda); Kab. Teluk Bintuni (Meyado)",
 654:"Kota Sorong (Sorong, Sorong Barat, Sorong Kepulauan, Sorong Manoi, Sorong Timur, Sorong Utara); Kab. Sorong (Aimas, Makbon, Mayamuk, Moisegen, Salawati, Salawati Selatan, Seget); Kab. Raja Ampat (Salawati Utara, Selat Sagawin); Kab. Tambrauw (Moraid)"};
const pmhGrup=(i,f)=>Object.keys(ZOM_PMH).map(Number).filter(n=>f(ZOM_PMH[n][i]||"")).sort((a,b)=>a-b);
const GRUP_PMH={awal:[["Okt 2026",/^oktober/i],["Nov 2026",/^november/i],["Des 2026",/^desember/i],["Mar 2027",/^maret/i]],sifat:[["Normal",/^normal$/i],["Atas Normal",/^atas/i],["Bawah Normal",/^bawah/i]],
 puncak:[["Jan 2027",/^januari 2027/i],["Feb 2027",/^februari 2027/i],["Mar 2027",/^maret 2027/i],["Bulan lain",/^(oktober|november|desember) 2026|^(april|juni|juli) 2027/i]],banding:[["Mundur",/^mundur/i],["Sama",/^sama/i],["Maju",/^maju/i]],durasi:[["Lebih pendek",/^lebih pendek/i],["Lebih panjang",/^lebih panjang/i]]};
const KOL_PMH={awal:0,banding:1,sifat:2,puncak:3,durasi:4},JUDUL_PMH={awal:"Awal musim hujan",sifat:"Sifat musim hujan",puncak:"Puncak musim hujan",banding:"Awal musim dibanding normal",durasi:"Durasi musim hujan"};
function ringkasPMH(){if(PMHU_TERPASANG)return ringkasPMHDinamis();const ket={"Jan 2027":"37,23% luas","Feb 2027":"23,11% luas","Mar 2027":"5,39% luas"};
 const bar=(k,c)=>{const arr=GRUP_PMH[k].map(([l,re])=>[l,pmhGrup(KOL_PMH[k],v=>re.test(v))]).filter(x=>x[1].length),mx=Math.max(...arr.map(x=>x[1].length));
  return `<div class="mbar klik">${arr.map(([l,nos])=>`<button type="button" class="mrow" data-zom="${nos.join(",")}" data-judul="${esc(JUDUL_PMH[k]+": "+(l==="Bulan lain"?"bulan lain":l))}" title="Lihat ZOM dan wilayahnya"><span>${l}</span><i style="width:${nos.length/mx*100}%;background:${c}"></i><b>${nos.length}</b>${ket[l]&&k==="puncak"?`<small>${ket[l]}</small>`:""}</button>`).join("")}</div>`};
 const kepala=(k,re,teks)=>{const nos=pmhGrup(KOL_PMH[k],v=>re.test(v));return `<button type="button" class="pkh" data-zom="${nos.join(",")}" data-judul="${esc(JUDUL_PMH[k]+": "+teks)}"><b>${teks}</b><em>`};
 return `<div class="pmh">
 <div class="pk" style="--c:#15803d"><span>Prediksi awal musim hujan</span>${kepala("awal",/^oktober/i,"Oktober 2026")}6 ZOM · 30,02% luas daratan</em></button>${bar("awal","#15803d")}</div>
 <div class="pk" style="--c:#a16207"><span>Sifat musim hujan</span>${kepala("sifat",/^normal$/i,"Normal")}10 ZOM · 48,07% luas daratan</em></button>${bar("sifat","#ca8a04")}</div>
 <div class="pk" style="--c:#1d4ed8"><span>Prediksi puncak musim hujan</span>${kepala("puncak",/^(januari|februari|maret) 2027/i,"Januari–Maret 2027")}14 ZOM · 65,74% luas daratan</em></button>${bar("puncak","#1d4ed8")}</div>
 <div class="pk" style="--c:#b45309"><span>Dibanding normal</span>${kepala("banding",/^mundur/i,"Mundur")}5 ZOM · 30,95% luas daratan</em></button>${bar("banding","#b45309")}</div>
 <div class="pk" style="--c:#c2410c"><span>Durasi musim hujan</span>${kepala("durasi",/^lebih pendek/i,"Lebih pendek")}8 dari 11 ZOM · 23,42% luas daratan</em></button>${bar("durasi","#c2410c")}</div>
 </div><p class="note ketukzom">👆 Ketuk angka atau baris mana pun untuk melihat ZOM dan wilayahnya.</p><p class="note">Persentase luas dari seluruh daratan Papua Barat dan Papua Barat Daya. Awal musim, perbandingan, dan durasi dihitung dari 11 ZOM; 10 Non-ZOM (Tipe 1 Musim, 57,49% daratan) dipisahkan. Sifat dan puncak dihitung dari seluruh 21 ZOM.</p>`}
function rincianZom(nos,judul,jenis){const dok=zomNorm(IK()["musim_"+(jenis||"hujan")]),dariD=jenis&&dok.length;
 const isi=nos.map(n=>{const d=dariD?dok.find(z=>+z.no===+n):null,z=ZOM11.find(x=>x.no===+n),info=ZOM_PMH[n]||[],nz=NONZOM.includes(+n);
  const wil=(d&&d.wil)||(z&&z.wil)||WIL_NONZOM[n]||"";const v=d?[d.awal,d.banding,d.sifat,d.puncak,""]:info;
  const chip=(lab,val,cls)=>val?`<span class="pill ${cls||""}">${lab}${esc(val)}</span>`:"";
  return `<li><div class="zh"><b>ZOM ${esc(n)}</b>${nz?'<span class="pill">Tipe 1 Musim</span>':""}</div><p>${esc(wil)||"–"}</p><div class="zc">${chip("Awal ",v[0])}${chip("",v[1],pillBanding(v[1]||""))}${chip("Sifat ",v[2],pillSifat(v[2]||""))}${chip("Puncak ",v[3])}${chip("Durasi ",v[4])}</div></li>`}).join("");
 bukaDialog(`<h3>${esc(judul)} · ${nos.length} ZOM</h3><ul class="zomlist">${isi}</ul><p class="note" style="margin:10px 0 0">${nos.some(n=>NONZOM.includes(+n))&&!dariD?"Wilayah Tipe 1 Musim (Non-ZOM) menurut daftar kecamatan Buletin PMH 2026/2027. ":""}Cari distrik Anda di <a href="#wilayah" data-tutup>Info Wilayah Saya</a>.</p>`)}
function bukaDialog(html){let d=document.getElementById("dlgUmum");if(d)d.remove();d=document.createElement("div");d.id="dlgUmum";d.className="dlgbg";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");
 d.innerHTML=`<div class="dlg lebar"><button type="button" class="dlgx" aria-label="Tutup" data-tutup>×</button>${html}</div>`;document.body.appendChild(d);
 const tutup=b=>{if(!d.isConnected)return;d.remove();document.removeEventListener("keydown",esk);if(b!==1&&history.state&&history.state.dlg)history.back()},esk=e=>{if(e.key==="Escape")tutup()};d._tutup=tutup;document.addEventListener("keydown",esk);
 try{if(!(history.state&&history.state.dlg))history.pushState({...(history.state||{}),dlg:1},"")}catch(e){}
 d.addEventListener("click",e=>{if(e.target===d||e.target.closest("[data-tutup]"))tutup()});const x=d.querySelector(".dlgx");if(x)x.focus()}
document.addEventListener("click",e=>{let b=e.target.closest&&e.target.closest("[data-zom]");if(!b){const k=e.target.closest&&e.target.closest(".pmh .pk");b=k&&k.querySelector(".pkh[data-zom]")}if(!b)return;const nos=b.dataset.zom.split(",").filter(Boolean);if(nos.length)rincianZom(nos,b.dataset.judul||"Zona Musim",b.dataset.jenis||"")});
function srcPMH(){const pb=((KA&&KA.publikasi)||[]).find(p=>/buletin/i.test(p.judul||"")&&/musim hujan|\bpmh\b/i.test(p.judul||"")&&/2026\s*\/\s*2027|2026-2027/.test(p.judul||"")),u=typeof pmhuAktif==="function"&&pmhuAktif()?(KA.pengaturan.pmh_update):null; const L=["Press Release dan Paparan FGD Prediksi Musim Hujan 2026/2027 (Oktober 2026)"];if(pb)L.push(escH(pb.judul));else L.push("Buletin Prediksi Musim Hujan 2026/2027");if(u)L.push("pembaruan prediksi BMKG"+(u.label?" data "+escH(u.label):" "+tglPMHU(u.diunggah))); return `<p class="note">Sumber: ${L.slice(0,-1).join(", ")}${L.length>1?", dan ":""}${L[L.length-1]}, Stasiun Klimatologi Papua Barat. Dokumen lengkap dapat diunduh di halaman <a href="#publikasi">Publikasi</a>.</p>`}

const LIVE={zom:"https://content.bmkg.go.id/wp-content/uploads/prediksi-awal-musim-hujan.png",hth:"https://dataweb.bmkg.go.id/iklim/hari-tanpa-hujan.png",pdkm:"https://dataweb.bmkg.go.id/iklim/peringatan-kekeringan-meteorologis/PDKM_latest.jpg",pdcht:"https://dataweb.bmkg.go.id/iklim/peringatan-hujan-tinggi/PDCHT_latest.jpg"};
// Gambar diambil langsung dari BMKG (selalu terbaru saat web di hosting); bila gagal, pakai salinan tersimpan.
function bmkgImg(k,alt,cap){return `<figure class="map"><img src="${LIVE[k]}" alt="${alt}" loading="lazy" data-galat="snap:${k}"><figcaption>${cap} Sumber: BMKG Pusat.</figcaption></figure>`}
function warnTable(jenis){const d=typeof daftarPeringatan==="function"?daftarPeringatan().filter(x=>x.jenis===jenis):[];
 const pbd=x=>x.pkode?x.pkode==="pbd":/sorong|raja ampat|maybrat|tambrauw/i.test(x.wilayah);
 const sel=(prov,st)=>{const n=d.filter(x=>x.status===st&&(prov?pbd(x):!pbd(x))).map(x=>escH(x.wilayah));return n.length?n.join("; "):"–"};
 return tbl(["Provinsi","Waspada","Siaga","Awas"],[0,1].map(v=>[v?"Papua Barat Daya":"Papua Barat",sel(v,"waspada"),sel(v,"siaga"),sel(v,"awas")]))}

const COL={Rendah:"#b7873e",Menengah:"#5fb14e",Tinggi:"#2f8fd1","Sangat Tinggi":"#1f3f9a","Bawah Normal":"#d0782c",Normal:"#5fb14e","Atas Normal":"#2f8fd1","Normal – Atas Normal":"#47a3a0","Kering – Sangat Kering":"#d9452b","Normal – Agak Kering":"#b9cf3c","Agak Kering":"#efd23a"};
function chip(v){return `<span class="c"><i style="background:${COL[v]||"#999"}"></i>${v}</span>`}
// rows: [nama, [nilai...], catatan]
function kgrid(prov,rows){return `<div class="prov">${prov}</div><div class="kgrid">${rows.map(r=>`<div class="kab"><b>${r[0]}</b>${r[1].map(chip).join("")}${r[2]?`<small>${r[2]}</small>`:""}</div>`).join("")}</div>`}
function legend(keys){return `<div class="legend">${keys.map(k=>`<span><i style="background:${COL[k]}"></i>${k}</span>`).join("")}</div>`}
const PB7=["Manokwari","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana"];
const PBD6=["Kota Sorong","Kab. Sorong","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw"];
const D={
 sepPB:PB7.map(k=>[k,[["Manokwari","Pegunungan Arfak"].includes(k)?"Menengah":"Rendah"]]),
 sepPBD:PBD6.map(k=>[k,["Rendah","Bawah Normal"]]),
 novPB:PB7.map(k=>[k,["Menengah","Atas Normal"],k==="Kaimana"||k==="Teluk Bintuni"?"Sebagian kecil wilayah Tinggi (301–500 mm)":""]),
 novPBD:PBD6.map(k=>[k,["Menengah"],""]),
 desPB:PB7.map(k=>[k,["Menengah","Normal – Atas Normal"],k==="Kaimana"?"Sebagian wilayah Tinggi (301–500 mm)":""]),
 desPBD:PBD6.map(k=>[k,["Menengah",["Kota Sorong","Kab. Sorong","Raja Ampat"].includes(k)?"Normal":"Normal – Atas Normal"],["Kota Sorong","Kab. Sorong","Raja Ampat"].includes(k)?"Sifat Normal di sebagian wilayah":""]),
 spiPB:[["Manokwari",["Normal – Agak Kering"]],["Pegunungan Arfak",["Normal – Agak Kering"]],["Teluk Wondama",["Normal – Agak Kering"],"Sebagian wilayah"],["Manokwari Selatan",["Kering – Sangat Kering"],"Sebagian wilayah"],["Teluk Bintuni",["Kering – Sangat Kering"],"Sebagian besar wilayah"],["Fakfak",["Kering – Sangat Kering"],"Sebagian besar wilayah"],["Kaimana",["Kering – Sangat Kering"],"Sebagian besar wilayah"]],
 spiPBD:[["Kota Sorong",["Kering – Sangat Kering"]],["Kab. Sorong",["Kering – Sangat Kering"]],["Raja Ampat",["Kering – Sangat Kering"],"Sebagian wilayah"],["Maybrat",["Kering – Sangat Kering"]],["Sorong Selatan",["Kering – Sangat Kering"]],["Tambrauw",["Agak Kering"]]]
};
/* grafik yang digambar ulang mengikuti lebar wadah (bukan diperbesar/diperkecil seperti gambar) */
const RC={};let RC_N=0;
function rc(fn,maks){const id="rc"+(++RC_N);RC[id]=[fn,maks||760];return `<div class="rchart" id="${id}"></div>`}
function gambarRc(akar){(akar||document).querySelectorAll(".rchart").forEach(el=>{const f=RC[el.id];if(!f)return;const w=Math.round(Math.max(280,Math.min(f[1],el.clientWidth||f[1])));if(el._w===w&&el.firstChild)return;el._w=w;el.innerHTML=f[0](w)})}
{let tr=0;addEventListener("resize",()=>{clearTimeout(tr);tr=setTimeout(()=>gambarRc(),150)})}
const svgUk=(W,H,lab)=>`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab}">`;
function hthChart(){
 const cats=[["Sangat Pendek","#5fb14e"],["Pendek","#a8d36a"],["Menengah","#efd23a"],["Panjang","#f08c2e"],["Sangat Panjang","#d9452b"],["Kekeringan Ekstrem","#8e1b1b"]];
 const data=[["Dasarian I",[24,0,1,0,0,0]],["Dasarian II",[2,3,13,2,0,0]],["Dasarian III",[7,3,2,10,0,1]]];
 const W=640,L=96,R=40,bh=30,gap=22,T=10,H=T+data.length*(bh+gap)+28,sc=(W-L-R)/25;
 let g="";[0,5,10,15,20,25].forEach(t=>{const x=L+t*sc;g+=`<line x1="${x}" x2="${x}" y1="${T-4}" y2="${H-24}" stroke="var(--line)"/><text x="${x}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${t}</text>`});
 data.forEach(([lab,v],i)=>{const y=T+i*(bh+gap);let x=L;g+=`<text x="${L-10}" y="${y+bh/2+4}" text-anchor="end" font-size="12.5" fill="var(--fg)">${lab}</text>`;
  v.forEach((n,j)=>{if(!n)return;const w=n*sc;g+=`<rect x="${x}" y="${y}" width="${w}" height="${bh}" fill="${cats[j][1]}"><title>${cats[j][0]}: ${n} pos</title></rect>`;if(w>16)g+=`<text x="${x+w/2}" y="${y+bh/2+4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#10213f">${n}</text>`;x+=w});
  g+=`<text x="${x+6}" y="${y+bh/2+4}" font-size="11.5" fill="var(--muted)">${v.reduce((a,b)=>a+b)} pos</text>`});
 return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Jumlah pos hujan per kategori HTH September 2026">${g}</svg></div><div class="legend">${cats.map(c=>`<span><i style="background:${c[1]}"></i>${c[0]}</span>`).join("")}</div>`}
/* ===== ISI OTOMATIS DARI BMKG PUSAT =====
   Dibaca langsung dari content.bmkg.go.id (disimpan sementara 6 jam di browser pengunjung):
   - "Analisis Dinamika Atmosfer Dasarian": angka ENSO/IOD, peringatan dini nasional, prediksi hujan dasarian
   - "Analisis Curah Hujan dan Sifat Hujan Bulan ...": peta curah hujan & sifat hujan
   - "The Standardized Precipitation Index ...": peta SPI 1 & 3 bulan
   Bila gagal dimuat, halaman memakai angka dari Buletin Iklim kami. */
const BMKG_API="https://content.bmkg.go.id/wp-json/wp/v2/posts";
const PUSAT_HAL=["enso-iod","hujan-bulanan","hari-tanpa-hujan","peringatan-kekeringan","peringatan-hujan-tinggi"];
const BLN3={januari:"Jan",februari:"Feb",maret:"Mar",april:"Apr",mei:"Mei",juni:"Jun",juli:"Jul",agustus:"Agu",september:"Sep",oktober:"Okt",november:"Nov",desember:"Des"};
let PUSAT=null,PUSAT_MUAT=false,PUSAT_T=0;
function bersihHtml(h){try{return new DOMParser().parseFromString(String(h||""),"text/html").body.textContent.replace(/\s+/g," ").trim()}catch(e){return String(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ")}}
const angkaB=s=>parseFloat(String(s).replace("−","-").replace(",","."));
const adaPB=s=>/papua barat(?!\s*daya)/i.test(s),adaPBD=s=>/papua barat daya/i.test(s);
function bacaDinat(p){const t=bersihHtml(p.content&&p.content.rendered),j=bersihHtml(p.title&&p.title.rendered);
 const m=j.match(/Dasarian\s+(I{1,3})\s+([A-Za-z]+)\s+(\d{4})/i);if(!m)return null;
 const per={das:m[1].toUpperCase(),bln:m[2].charAt(0).toUpperCase()+m[2].slice(1).toLowerCase(),thn:m[3]};
 const iod=t.match(/indeks IOD dasarian[^+\-−\d]{0,40}([+\-−]?\d+[.,]\d+)/i),iodb=t.match(/indeks IOD dasarian[\s\S]{0,90}?\(\s*([A-Za-z]+)\s*:\s*([+\-−]?\d+[.,]\d+)\s*\)/i),
  nino=t.match(/Nino ?3[.,]4[^+\-−\d]{0,40}([+\-−]?\d+[.,]\d+)/i),
  enso=t.match(/Indeks ENSO\s*\(3 bulanan\)\s*untuk\s*([A-Z]{3})\s*(?:\(([^)]*)\))?[^+\-−\d]{0,40}([+\-−]?\d+[.,]\d+)\s*,?\s*(?:menunjukkan\s+([^.]+))?/i);
 const sek=(a,b)=>{const i=t.search(new RegExp(a,"i"));if(i<0)return "";const r=t.slice(i+a.length),k=r.search(new RegExp(b,"i"));return k<0?r:r.slice(0,k)};
 const war=s=>{if(!s)return {ada:false};const ber=(s.match(/berlaku untuk\s*[“"]?\s*([^”";:]*?\d{4})/i)||[])[1]||"",lv={};
  ["Waspada","Siaga","Awas"].forEach(k=>{const x=s.match(new RegExp(k+"\\s*:\\s*([\\s\\S]*?)(?=(?:Waspada|Siaga|Awas)\\s*:|$)","i"));lv[k.toLowerCase()]=x?x[1]:""});
  const cek=f=>["awas","siaga","waspada"].find(k=>f(lv[k]))||"";return {ada:true,berlaku:ber.trim(),pb:cek(adaPB),pbd:cek(adaPBD)}};
 const rendah=[...sek("hujan kategori Rendah","Prediksi Curah Hujan Lebih").matchAll(/([A-Z]{3})\s*(I{1,3})\s*(\d{4})\s*:\s*meliputi([^•]*)/g)].map(x=>({das:x[1]+" "+x[2]+" "+x[3],pb:adaPB(x[4]),pbd:adaPBD(x[4])}));
 const tinggi=[...sek("Lebih Dari 300 mm/Bulan","Analisis|Peringatan Dini").matchAll(/•\s*([A-Za-z ,]+?\d{4})\s*:\s*curah hujan([^•]*)/g)].map(x=>({bln:x[1].trim(),pb:adaPB(x[2]),pbd:adaPBD(x[2])}));
 return {id:p.id,tanggal:String(p.date||"").slice(0,10),judul:j,url:"https://www.bmkg.go.id/iklim/"+p.slug,per,gambar:String(p.jetpack_featured_media_url||"").replace(/&#0?38;|&amp;/g,"&").replace(/^http:/,"https:"),
  iod:iod?angkaB(iod[1]):null,iodBulan:iodb?{bln:iodb[1].charAt(0).toUpperCase()+iodb[1].slice(1).toLowerCase(),v:angkaB(iodb[2])}:null,nino:nino?angkaB(nino[1]):null,
  enso:enso?{per:enso[1].toUpperCase(),nama:(enso[2]||"").trim(),v:angkaB(enso[3]),status:(enso[4]||"").trim()}:null,
  gel:(()=>{const i=t.search(/Analisis dan Prediksi MJO|Prediksi MJO|MJO\s*:/i);if(i<0)return null;try{const g=bacaGelTeks(t.slice(i,i+1600),t.slice(i,i+1600));return g?{...g,tanggal:String(p.date||"").slice(0,10),judul:j,url:"https://www.bmkg.go.id/iklim/"+p.slug,jenis:"dinat"}:null}catch(e){return null}})(),
  kering:war(sek("Peringatan Dini Kekeringan Meteorologis","Peringatan Dini|Analisis|Prediksi")),hujan:war(sek("Peringatan Dini Curah Hujan Tinggi","Peringatan Dini|Analisis|Prediksi")),rendah,tinggi}}
/* ===== DINAMIKA ATMOSFER: MJO, gelombang ekuatorial (Kelvin, Rossby, MRG), siklon tropis =====
   Sumber: rilisan BMKG Pusat "Prakiraan Cuaca Indonesia Sepekan" (kategori 1768, terbit ±2 kali sepekan)
   dan bagian MJO pada "Analisis Dinamika Atmosfer Dasarian" bila ada. Ini INFORMASI, bukan peringatan:
   warnanya netral, tidak memakai tingkat Waspada/Siaga/Awas. Skala wilayah (Papua, Indonesia timur), bukan kabupaten. */
const WIL_GEL=/Papua Barat Daya|Papua Barat|Papua Selatan|Papua Tengah|Papua Pegunungan|Papua|Maluku Utara|Maluku|Indonesia bagian (?:timur|barat|tengah|selatan|utara)|Sulawesi|Kalimantan|Sumatera|Sumatra|Jawa|Nusa Tenggara|Bali|Aceh|Samudra Pasifik|Pasifik barat|Laut Arafura|Laut Banda|Halmahera/gi;
const TIMUR_RE=/Papua|Maluku|Indonesia bagian timur|Pasifik|Arafura|Banda|Halmahera/i,DEKAT_SIKLON=/Papua|Arafura|Banda|Maluku|Halmahera|Seram|Pasifik|Carpentaria|Cendrawasih|Cenderawasih/i;
const FASE_MJO={1:"Belahan Bumi Barat dan Afrika",2:"Samudra Hindia",3:"Samudra Hindia",4:"Benua Maritim (Indonesia) bagian barat",5:"Benua Maritim (Indonesia) bagian timur",6:"Pasifik barat",7:"Pasifik barat",8:"Belahan Bumi Barat"};
const kalimatGel=t=>String(t||"").replace(/([.!?])\s+(?=[A-Z“"])/g,"$1\n").split("\n").map(s=>s.trim()).filter(Boolean);
function wilDari(s){const a=[];(String(s).match(WIL_GEL)||[]).forEach(w=>{w=w.replace(/^Sumatra$/i,"Sumatera").replace(/^Pasifik barat$/i,"Samudra Pasifik");w=w.charAt(0).toUpperCase()+w.slice(1);if(!a.some(x=>x.toLowerCase()===w.toLowerCase()))a.push(w)});
 /* "Papua" tidak perlu bila sudah ada "Papua Barat" dsb. */
 return a.filter(w=>!(w==="Papua"&&a.some(x=>/^Papua /.test(x))))}
/* t = teks bagian prakiraan (ke depan); semua = seluruh teks (untuk siklon/bibit yang sedang terpantau) */
function bacaGelTeks(t,semua){t=String(t||"");semua=String(semua||t);if(!/MJO|Madden|Kelvin|Rossby|MRG|gelombang atmosfer/i.test(t+semua))return null;
 const K=kalimatGel(t),gel=new Set(),wil=[];let mjo=null;
 const fm=t.match(/(?:MJO|Madden[- ]Julian Oscillation)\)?[^.]{0,160}?fase\s*(\d)/i);
 if(fm){const f=+fm[1],lok=(t.slice(fm.index,fm.index+fm[0].length+90).match(/fase\s*\d[^.]{0,80}?(Samudra Hindia|Benua Maritim|Maritime Continent|Pasifik(?: barat| Barat)?|Afrika|Belahan Bumi Barat|wilayah Indonesia)/i)||[])[1];
  if(f>=1&&f<=8)mjo={fase:f,lokasi:lok?lok.replace(/Maritime Continent/i,"Benua Maritim"):FASE_MJO[f]}}
 else if(/MJO|Madden/i.test(t)&&!/MJO[^.]{0,60}(tidak aktif|inaktif|lemah)/i.test(t))mjo={fase:null,lokasi:""};
 K.forEach((s,i)=>{const gelS=/Kelvin|Rossby|MRG|Mixed Rossby|gelombang atmosfer|MJO|Madden/i.test(s)&&!/gelombang (?:tinggi|laut)/i.test(s.replace(/gelombang atmosfer/ig,""));if(!gelS)return;
  if(/Kelvin/i.test(s))gel.add("Kelvin");if(/Mixed Rossby|MRG/i.test(s))gel.add("MRG");if(/(?:Equatorial|Ekuatorial)\s+Rossby|Rossby\s+(?:Equatorial|Ekuatorial)|\bER\b|Rossby(?!-Gravity)/i.test(s.replace(/Mixed Rossby[- ]Gravity/ig,"")))gel.add("Rossby");
  if(/Low Frequency|frekuensi rendah/i.test(s))gel.add("Low Frequency");
  let w=wilDari(s);const n=K[i+1];if(!w.length&&n&&/^(yang|di wilayah|wilayah|terutama|khususnya|meliputi|antara lain)/i.test(n))w=wilDari(n);
  w.forEach(x=>{if(!wil.includes(x))wil.push(x)})});
 const SK=kalimatGel(semua),siklon=[],bibit=[],sirk=[];
 SK.forEach(s=>{for(const m of s.matchAll(/(Bibit\s+)?Siklon Tropis\s+[“"]?([A-Z][A-Za-z]{2,})/g)){const nm=m[2];if(m[1]||/^(Warning|Jakarta|TCWC|Center|Centre|Yang|Dan|Di|Ini|Tersebut|Aktif|Terbentuk)$/i.test(nm))continue;
   if(!siklon.some(x=>x.nama.toLowerCase()===nm.toLowerCase()))siklon.push({nama:nm.charAt(0)+nm.slice(1).toLowerCase(),dekat:DEKAT_SIKLON.test(s),habis:/punah|meluruh|melemah menjadi|tidak lagi/i.test(s),kal:s.slice(0,260)})}
  for(const m of s.matchAll(/Bibit Siklon(?: Tropis)?\s+(\d{2}[A-Z])\b[^.]{0,120}?(?:berada |terpantau |terbentuk )?di\s+([A-Z][^,.;]{2,60})/g))if(!bibit.some(x=>x.kode===m[1]))bibit.push({kode:m[1],lokasi:m[2].replace(/\s+(dengan|yang|dan bergerak)\b.*$/i,"").trim(),dekat:DEKAT_SIKLON.test(s)});
});
 K.forEach(s=>{const sm=s.match(/sirkulasi siklonik[^.]{0,30}?\s(?:di|terpantau di|berada di)\s+([^.]{3,160})/i);if(sm)sirk.push(sm[1].replace(/\s+(?:yang|berpotensi|sehingga|dapat)\b.*$/i,"").trim())});
 const dekatMjo=!!(mjo&&mjo.fase>=5&&mjo.fase<=6);
 return {mjo,gel:[...gel],wil,timur:wil.some(w=>TIMUR_RE.test(w)),dekatMjo,siklon,bibit,sirk:[...new Set(sirk)].slice(0,4)}}
/* rilisan sepekan: hanya bagian "Dinamika Atmosfer Sepekan ke Depan" yang dibaca untuk gelombang (bukan analisis hari-hari lalu) */
function bacaGelombang(p){if(!p)return null;const t=bersihHtml(p.content&&p.content.rendered),j=bersihHtml(p.title&&p.title.rendered);
 let a=t.search(/Dinamika Atmosfer (?:Sepekan|Seminggu) ke ?depan/i);if(a<0)a=t.search(/(?:sepekan|seminggu) (?:ke ?depan|mendatang)/i);if(a<0)a=0;
 const r=t.slice(a+20),b=r.search(/Prospek Cuaca|Potensi Hujan (?:Indonesia )?Sepekan|Periode\s+\d{1,2}\s*[–-]/i),dep=t.slice(a,b<0?t.length:a+20+b);
 const g=bacaGelTeks(dep,t);if(!g)return null;
 return {...g,id:p.id,tanggal:String(p.date||"").slice(0,10),judul:j.replace(/\s+/g," ").trim(),url:"https://www.bmkg.go.id/cuaca/potensi-hujan-sepekan/"+p.slug,jenis:"sepekan"}}
/* data gelombang terbaru yang masih segar (<=10 hari): rilisan sepekan, atau bagian MJO dinat bila lebih baru */
function gelTerkini(){const c=[PUSAT&&PUSAT.gel,PUSAT&&PUSAT.dinat&&PUSAT.dinat[0]&&PUSAT.dinat[0].gel].filter(x=>x&&x.tanggal).sort((a,b)=>b.tanggal.localeCompare(a.tanggal))[0];
 return c&&umurHari(c.tanggal)<=10?c:null}
const gelDekat=g=>!!(g&&(g.timur&&g.gel.length||g.dekatMjo));
const daftarJ=a=>a.length>1?a.slice(0,-1).join(", ")+" dan "+a[a.length-1]:a[0]||"";
function namaGel(g){return daftarJ(g.gel.map(x=>x==="Rossby"?"Rossby Ekuatorial":x==="MRG"?"Mixed Rossby-Gravity (MRG)":x))}
function teksMjo(g){if(!g||!g.mjo)return "MJO tidak aktif";return g.mjo.fase?`MJO fase ${g.mjo.fase}${g.mjo.lokasi?" ("+g.mjo.lokasi.replace(/^wilayah /i,"")+")":""}`:"MJO aktif"}
function wilTimur(g){const w=g.wil.filter(x=>TIMUR_RE.test(x));return w.length?daftarJ(w.slice(0,4)):g.dekatMjo?"Indonesia bagian timur":""}
/* siklon tropis resmi (bukan bibit) di dekat Papua: dari rilisan sepekan atau siaran pers BMKG <=4 hari */
function siklonDekat(){const out=[],g=gelTerkini();
 if(g&&umurHari(g.tanggal)<=4)(g.siklon||[]).filter(x=>x.dekat&&!x.habis).forEach(x=>out.push({nama:x.nama,teks:x.kal,url:g.url,tanggal:g.tanggal}));
 ((KA&&KA.bmkg&&KA.bmkg.besar)||[]).filter(x=>umurHari(x.tanggal)<=4&&/Siklon Tropis\s+[A-Z][a-z]/.test(x.judul)&&!/bibit/i.test(x.judul)&&DEKAT_SIKLON.test(x.judul+" "+(x.ringkas||""))).forEach(x=>{const nm=(x.judul.match(/Siklon Tropis\s+[“"]?([A-Z][A-Za-z]+)/)||[])[1]||"";
  if(!out.some(y=>y.nama.toLowerCase()===nm.toLowerCase()))out.push({nama:nm.charAt(0)+nm.slice(1).toLowerCase(),teks:x.judul,url:x.url,tanggal:x.tanggal})});
 return out}
function pitaSiklon(){const s=siklonDekat();if(!s.length)return "";const x=s[0];
 return `<div class="pitasiklon" role="status"><div class="wrap"><span class="psik-ic" aria-hidden="true">🌀</span><div><b>Informasi BMKG: Siklon Tropis ${escH(x.nama)} terpantau di sekitar wilayah timur Indonesia.</b> <span>${escH(potong(x.teks,200))}</span> <a href="${escH(x.url)}" target="_blank" rel="noopener">Rilisan BMKG (${tglPendek(x.tanggal)})</a> · <a href="https://tropicalcyclone.bmkg.go.id" target="_blank" rel="noopener">Peringatan dini siklon tropis resmi (TCWC Jakarta)</a></div></div></div>`}
/* satu baris dinamika atmosfer di kotak ENSO beranda (selalu tampil) */
function barisDinamika(){const e=EN(),g=gelTerkini(),vi=e.iod!=null?e.iod:e.iodB,b=[`IOD ${statusIod(vi)}`];
 if(g){b.push(teksMjo(g));if(g.gel.length)b.push(`${daftarJ(g.gel.map(x=>x==="Low Frequency"?"gelombang frekuensi rendah":x))} aktif${g.wil.length?" di "+(wilTimur(g)||daftarJ(g.wil.slice(0,3))):""}`)}else b.push("MJO & gelombang atmosfer: menunggu rilisan BMKG terbaru");
 return `<p class="kdin"><b>Dinamika atmosfer:</b> ${b.map(escH).join(" · ")}${g?` <small>(BMKG, ${tglPendek(g.tanggal)})</small>`:""}</p>`}
function bacaPeta(p){if(!p)return null;const imgs=[p.jetpack_featured_media_url,...(String(p.content&&p.content.rendered||"").match(/<img[^>]+src="[^"]+"/g)||[]).map(x=>x.match(/src="([^"]+)"/)[1])]
  .filter(Boolean).map(u=>u.replace(/&#0?38;|&amp;/g,"&")).filter(u=>/^https:\/\//.test(u));
 const unik=[];imgs.forEach(u=>{const b=u.split("?")[0];if(!unik.some(x=>x.split("?")[0]===b))unik.push(u)});
 return {id:p.id,tanggal:String(p.date||"").slice(0,10),judul:bersihHtml(p.title&&p.title.rendered),url:"https://www.bmkg.go.id/iklim/"+p.slug,gambar:unik.slice(0,4)}}
/* "Ambil rilisan sekarang" di admin (atau jadwal robot) memperbarui waktu bmkg.diambil;
   bila lebih baru dari salinan di browser, isi otomatis diambil ulang saat itu juga */
const pusatBasi=()=>{const dm=Date.parse((KA&&KA.bmkg&&KA.bmkg.diambil)||"");return !!dm&&dm>PUSAT_T};
function muatPusat(paksa){if(PUSAT_MUAT&&!paksa)return;PUSAT_MUAT=true;let c=null;
 try{c=JSON.parse(localStorage.getItem("pusat_v2")||"null")}catch(e){}
 if(c&&c.d&&!paksa){PUSAT=c.d;PUSAT_T=c.t||0;simpanEnso();if(Date.now()-c.t<6*3600e3&&!pusatBasi()&&c.d.dinat&&c.d.dinat.length)return}
 PUSAT_T=Date.now();
 const f=q=>fetch(BMKG_API+"?"+q,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
 const KN0=["a","b","s","w"],lewatRobot=()=>KONTEN_URL?fetch(KONTEN_URL+"/pusat",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(c=>c?KN0.map(k=>Array.isArray(c[k])&&c[k].length?{status:"fulfilled",value:c[k]}:{status:"rejected",reason:"kosong"}):null).catch(()=>null):Promise.resolve(null);
 const langsung=()=>Promise.allSettled([f("categories=59&search="+encodeURIComponent("Dinamika Atmosfer Dasarian")+"&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=6"),
  f("categories=60&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1"),
  f("categories=208&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1"),
  f("categories=1768&_fields=id,date,slug,title,content&per_page=1")]);
 /* petugas yang login tetap mengambil langsung (lalu menyimpannya ke robot); pengunjung memakai salinan robot, dan baru mencoba langsung bila robot kosong sama sekali */
 (typeof ADM_PASS!=="undefined"&&ADM_PASS?langsung():lewatRobot().then(R=>R&&R.some(x=>x.status==="fulfilled")?R:langsung())).then(async R=>{
  /* Browser yang tidak bisa menghubungi server BMKG (diblokir, dibatasi, jaringan kantor) memakai salinan yang disimpan robot kita */
  const KN=["a","b","s","w"],gagal=R.some(x=>x.status!=="fulfilled");
  if(gagal&&KONTEN_URL){try{const c=await fetch(KONTEN_URL+"/pusat",{cache:"no-cache"}).then(r=>r.ok?r.json():null);if(c)R=R.map((x,i)=>x.status==="fulfilled"||!Array.isArray(c[KN[i]])||!c[KN[i]].length?x:{status:"fulfilled",value:c[KN[i]]})}catch(e){}}
  else if(!gagal&&KONTEN_URL&&typeof ADM_PASS!=="undefined"&&ADM_PASS){try{const o={};R.forEach((x,i)=>o[KN[i]]=x.value);admJSON("/admin/pusat-simpan",{pusat:o}).catch(()=>{})}catch(e){}}
  const [a,b,s,w]=R;
  const lama=PUSAT||{},d={
   dinat:a.status==="fulfilled"?a.value.filter(p=>/Dinamika Atmosfer Dasarian/i.test(bersihHtml(p.title&&p.title.rendered))).map(bacaDinat).filter(x=>x&&(x.nino!=null||x.iod!=null||x.enso)).sort((x,y)=>y.tanggal.localeCompare(x.tanggal)):(lama.dinat||[]),
   hujan:b.status==="fulfilled"?bacaPeta(b.value[0]):(lama.hujan||null),spi:s.status==="fulfilled"?bacaPeta(s.value[0]):(lama.spi||null),
   gel:(()=>{try{return w.status==="fulfilled"&&bacaGelombang(w.value[0])||lama.gel||null}catch(e){return lama.gel||null}})()};
  if(!d.dinat.length&&lama.dinat&&lama.dinat.length)d.dinat=lama.dinat;
  /* tanpa data dinamika atmosfer (sumber peringatan dini nasional) hasilnya tidak dianggap segar: dicoba lagi sebentar kemudian dan saat halaman dibuka berikutnya */
  if(!d.dinat.length&&!muatPusat.ulang){muatPusat.ulang=1;setTimeout(()=>muatPusat(1),20000)}
  if(!d.dinat.length&&!d.hujan&&!d.spi)return;PUSAT=d;PUSAT_T=Date.now();try{localStorage.setItem("pusat_v2",JSON.stringify({t:d.dinat.length?PUSAT_T:0,d}))}catch(e){}simpanEnso();
  segarPusat()})}
/* akhir masa berlaku dari teks pusat, mis. "Dasarian I November (1 – 10 November) 2026" -> 2026-11-10 */
function akhirBerlaku(s){const m=String(s||"").match(/Dasarian\s+(I{1,3})\s+([A-Za-z]+)[\s\S]*?(\d{4})/i);if(!m)return "";
 const b=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"].indexOf(m[2].toLowerCase());if(b<0)return "";
 const y=+m[3],h=m[1].toUpperCase()==="I"?10:m[1].toUpperCase()==="II"?20:new Date(y,b+1,0).getDate();return y+"-"+String(b+1).padStart(2,"0")+"-"+String(h).padStart(2,"0")}
/* Rincian wilayah dari tabel peringatan dini dasarian BMKG (dibaca robot): kabupaten + distrik per tingkat */
const PROV_NAMA={pb:"Papua Barat",pbd:"Papua Barat Daya"};
function tabelPer(k){const w=typeof KA!=="undefined"&&KA&&KA.bmkg&&KA.bmkg.wilayah&&KA.bmkg.wilayah[k];if(!w||!w.berlaku||!w.pb||!w.pbd)return null;
 const akhir=akhirBerlaku(w.berlaku),hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);return akhir&&akhir>=hari?{...w,akhir}:null}
function escTeks(x){return String(x||"").replace(/[<>"]/g,"")}
const teksWil=rows=>(rows||[]).map(r=>escTeks(r.kab)+(r.dis&&r.dis.length?` (distrik ${r.dis.map(escTeks).join(", ")})`:"")).join("; ");
function peringatanPusat(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0],hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10),out=[];
 [["kering","kekeringan"],["hujan","hujan"]].forEach(([k,j])=>{const w=d&&d[k],tb=tabelPer(k),akhirW=w&&w.ada?akhirBerlaku(w.berlaku):"";
  const wSah=!!(w&&w.ada&&(akhirW?akhirW>=hari:umurHari(d.tanggal)<=12));
  if(tb&&(!wSah||!akhirW||tb.akhir>=akhirW)){["pb","pbd"].forEach(p=>{["awas","siaga","waspada"].forEach(st=>{const rows=(tb[p]||{})[st]||[];if(!rows.length)return;
    out.push({status:st,jenis:j,prov:PROV_NAMA[p],pkode:p,rinci:rows,wilayah:teksWil(rows)+", "+PROV_NAMA[p],berlaku:tb.berlaku,sampai:tb.akhir,catatan:"Peringatan dini dasarian BMKG",pusat:1,url:tb.url})})});return}
  if(!wSah)return;[["pb","Papua Barat"],["pbd","Papua Barat Daya"]].forEach(([p,n])=>{if(w[p])out.push({status:w[p],jenis:j,prov:n,pkode:p,wilayah:"Beberapa kabupaten/kota di "+n,berlaku:w.berlaku||"",sampai:akhirW,catatan:"Peringatan dini nasional BMKG Pusat",pusat:1})})});return out}
/* perubahan dibanding dasarian sebelumnya (dari rilis dinamika atmosfer dasarian sebelumnya) */
function perubahanPer(x){try{if(!x.pusat||!x.pkode||!x.sampai||!PUSAT||!PUSAT.dinat)return null;const k=x.jenis==="hujan"?"hujan":"kering";
 const lalu=PUSAT.dinat.map(e=>e&&e[k]).filter(w=>w&&w.berlaku&&akhirBerlaku(w.berlaku)&&akhirBerlaku(w.berlaku)<x.sampai).sort((a,b)=>akhirBerlaku(b.berlaku)<akhirBerlaku(a.berlaku)?-1:1)[0];
 if(!lalu)return null;const sb=lalu.ada?(lalu[x.pkode]||""):"",a=LV_URUT[x.status]||0,b=LV_URUT[sb]||0;
 if(!b)return {k:"baru",t:"Baru dasarian ini"};if(a>b)return {k:"naik",t:"Naik dari "+NAMA_STATUS[sb]};if(a<b)return {k:"turun",t:"Turun dari "+NAMA_STATUS[sb]};return {k:"lanjut",t:"Berlanjut dari dasarian sebelumnya"}}catch(e){return null}}
function sumberResmi(d){const u=(d.find(x=>x.url)||{}).url;if(u)return {url:u,nama:"tabel peringatan dini dasarian"};const sp=sumberDinat();return sp&&sp.url?{url:sp.url,nama:sp.judul||"rilis BMKG Pusat"}:null}
function segarPusat(){if(cur==="beranda"&&(peringatanPusat().length||siklonDekat().length)||/^iklim-(?!papua-barat$)/.test(cur)&&gelDekat(gelTerkini())){const y=scrollY;render();scrollTo({top:y});return}if(PUSAT_HAL.includes(cur)){const y=scrollY;render();scrollTo({top:y});return}
 if(cur==="beranda"){const kb=document.getElementById("kondisiBox");if(kb){kb.innerHTML=kondisiHTML();pasangReveal()}const pb=document.getElementById("produkBox");if(pb){pb.innerHTML=produkHTML();pasangReveal()}}}
/* angka ENSO/IOD terbaru (BMKG Pusat bila ada, bila tidak dari Buletin Iklim kami) */
const fmtV=v=>v==null||isNaN(v)?"–":(v>0?"+":v<0?"−":"")+String(Math.abs(v)).replace(".",",");
function statusEnso(d){const s=(d&&d.enso&&d.enso.status)||"",v=d&&d.enso?d.enso.v:d&&d.nino;
 const f=/la ?ni[ñn]a/i.test(s)?"La Niña":/el ?ni[ñn]o/i.test(s)?"El Niño":/netral/i.test(s)?"Netral":v>=.5?"El Niño":v<=-.5?"La Niña":"Netral";
 const it=(s.match(/intensitas\s+([a-z]+(?:\s+(?:kuat|lemah|sedang|moderat))?)/i)||[])[1];return f+(it&&f!=="Netral"?" · "+it.replace(/\b\w/g,c=>c.toUpperCase()):"")}
const statusIod=v=>v==null?"–":v>=.4?"Positif":v<=-.4?"Negatif":"Netral";
const pillEnso=s=>/El Niño/.test(s)?"bad":/La Niña/.test(s)?"warn":"ok";
function EN(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];
 /* belum ada rilisan Pusat di browser ini: pakai angka baik terakhir yang pernah tersimpan (tanpa kedaluwarsa), bila tidak ada pakai angka bawaan; keduanya ditandai basi */
 if(!d){let c=null;try{c=JSON.parse(localStorage.getItem("enso_baik")||"null")}catch(e){}
  return c&&c.e&&typeof c.e.enso==="number"?{...c.e,src:null,basi:true}:{...ENSO_BAWAAN,src:null,basi:true}}
 const p=d.per,b3=BLN3[p.bln.toLowerCase()]||p.bln,ens=d.enso||(((PUSAT.dinat||[]).find(x=>x&&x.enso&&typeof x.enso.v==="number")||{}).enso);
 return {enso:ens?ens.v:d.nino,ensoLab:ens?ens.per+" "+p.thn:"Das "+p.das+" "+b3+" "+p.thn,ensoNama:ens&&ens.nama&&(ens.nama.match(/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/gi)||[]).length>1?(b=>b[0]+"–"+b[b.length-1])(ens.nama.match(/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/gi))+" "+p.thn:(ens?ens.per+" "+p.thn:"Dasarian "+p.das+" "+p.bln+" "+p.thn),
  nino:d.nino,ninoLab:"Dasarian "+p.das+" "+p.bln+" "+p.thn,ninoS:"Das "+p.das+" "+b3,status:statusEnso(d),
  iod:d.iod,iodLab:"Dasarian "+p.das+" "+p.bln+" "+p.thn,iodS:"Das "+p.das+" "+b3,iodB:d.iodBulan?d.iodBulan.v:null,iodBLab:d.iodBulan?d.iodBulan.bln+" "+p.thn:"",iodBS:d.iodBulan?(BLN3[d.iodBulan.bln.toLowerCase()]||d.iodBulan.bln)+" "+p.thn:"",
  kalimat:ens&&ens.status||"",src:d,tglData:d.tanggal,basi:umurHari(d.tanggal)>25}}
/* singkatan sulit → mudah: "SON 2026" → "Sep–Nov 2026", "Das I Nov" → "1–10 Nov" */
const TRI={DJF:"Des–Feb",JFM:"Jan–Mar",FMA:"Feb–Apr",MAM:"Mar–Mei",AMJ:"Apr–Jun",MJJ:"Mei–Jul",JJA:"Jun–Agu",JAS:"Jul–Sep",ASO:"Agu–Okt",SON:"Sep–Nov",OND:"Okt–Des",NDJ:"Nov–Jan"};
const singkatTri=t=>String(t||"").replace(/\b(DJF|JFM|FMA|MAM|AMJ|MJJ|JJA|JAS|ASO|SON|OND|NDJ)(?=\s+20\d\d)/g,m=>TRI[m]);
const AKHIR_BLN={Jan:31,Feb:28,Mar:31,Apr:30,Mei:31,Jun:30,Jul:31,Agu:31,Agt:31,Sep:30,Okt:31,Nov:30,Des:31};
const singkatDas=t=>String(t||"").replace(/\bDas(?:arian)?\s+(III|II|I)\s+(\w{3})\w*/,(m,d,b)=>(d==="I"?"1–10 ":d==="II"?"11–20 ":"21–"+(AKHIR_BLN[b]||30)+" ")+b);
const ENSO_BAWAAN={enso:3.08,ensoLab:"ASO 2026",ensoNama:"Agustus–Oktober 2026",nino:3.07,ninoLab:"September 2026",ninoS:"Sep 2026",status:"El Niño · Sangat Kuat",iod:.703,iodLab:"Dasarian I Oktober 2026",iodS:"Das I Okt",iodB:.782,iodBLab:"September 2026",iodBS:"Sep 2026",kalimat:"",tglData:"2026-10-13"};
function simpanEnso(){try{const e=EN();if(!e.src||typeof e.enso!=="number")return;const {src,basi,...x}=e;localStorage.setItem("enso_baik",JSON.stringify({t:Date.now(),e:x}))}catch(e){}}
/* catatan bila angka ENSO/IOD yang tampil bukan rilisan terbaru */
function catatanBasi(e,gelap){e=e||EN();if(!e.basi)return "";return `<p class="kbasi${gelap?" gelap":""}" role="note">Menampilkan data tersimpan per ${escH(tglPendek(e.tglData||""))||"rilisan terakhir"}. Rilisan terbaru BMKG Pusat belum dapat dimuat; angka akan diperbarui otomatis.</p>`}
function sumberPusat(x,teks){return x?`<p class="note">${teks||"Diambil dari"} <a href="${escH(x.url)}" target="_blank" rel="noopener">${escH(x.judul)} ↗</a> (BMKG Pusat, ${tglPendek(x.tanggal)}).</p>`:""}
function kbigEnso(){const e=EN();return `<span class="pill ${pillEnso(e.status)}">${e.status.replace(" · "," ")}</span><div class="kangka" data-v="${e.enso}">${fmtV(e.enso)}</div><p>Indeks ENSO periode ${e.ensoNama}${e.src?" menurut analisis BMKG Pusat "+e.src.per.bln+" "+e.src.per.thn:", termasuk yang terkuat dalam pencatatan"}.${/El Niño|La Niña/.test(e.status)&&TH("enso_prediksi")?" Diprediksi "+esc(TH("enso_prediksi").replace(/^\w/,c=>c.toLowerCase())).replace(/\.$/,"")+".":""}</p>`}
function tileIod(){const e=EN(),v=e.iod!=null?e.iod:e.iodB;return `<span>Status IOD</span><b>${statusIod(v)}</b><small>DMI ${e.iod!=null?e.iodS:e.iodBS} ${fmtV(v)}</small>`}
function idxChart(){return rc(W=>idxSvg(W),760)+idxCatatan()}
function idxSvg(W){const e=EN(),rows=[];
 if(e.nino!=null)rows.push(["Niño 3.4 · "+singkatDas(e.ninoS),e.nino,.5,"enso"]);if(e.enso!=null)rows.push(["Indeks ENSO · "+singkatTri(e.ensoLab),e.enso,.5,"enso"]);
 if(e.iodB!=null)rows.push(["DMI (angka IOD) · "+e.iodBS,e.iodB,.4,"iod"]);if(e.iod!=null)rows.push(["DMI (angka IOD) · "+singkatDas(e.iodS),e.iod,.4,"iod"]);
 const vs=rows.map(r=>r[1]),lo=Math.min(0,Math.floor(Math.min(...vs)*2)/2-(Math.min(...vs)<0?.5:0)),hi=Math.max(1,Math.ceil(Math.max(...vs)*2)/2);
 const sempit=W<520,L=sempit?8:170,R=58,bh=sempit?20:26,gap=sempit?34:16,T=sempit?24:8,H=T+rows.length*(bh+gap)-(sempit?6:0)+26,sc=(W-L-R)/(hi-lo),X=v=>L+(v-lo)*sc,st=hi-lo>4?1:.5;
 let g="";for(let t=lo;t<=hi+1e-9;t+=st){const x=X(t);g+=`<line x1="${x}" x2="${x}" y1="${T-4}" y2="${H-22}" stroke="var(--line)"${Math.abs(t)<1e-9?' stroke-width="2"':""}/><text x="${x}" y="${H-6}" text-anchor="middle" font-size="11.5" fill="var(--muted)">${String(+t.toFixed(1)).replace(".",",").replace("-","−")}</text>`}
 rows.forEach(([lab,v,th,j],i)=>{const y=T+i*(bh+gap),x0=X(0),xv=X(v),c=j==="enso"?(v>=0?"#d9452b":"#2563eb"):(v>=0?"#f08c2e":"#0d9488"),tx=X(v>=0?th:-th);
  g+=`${sempit?`<text x="${L}" y="${y-7}" font-size="12.5" font-weight="600" fill="var(--fg)">${lab}</text>`:`<text x="${L-10}" y="${y+bh/2+4}" text-anchor="end" font-size="13" fill="var(--fg)">${lab}</text>`}<rect x="${Math.min(x0,xv)}" y="${y}" width="${Math.abs(xv-x0)}" height="${bh}" rx="3" fill="${c}"/><text x="${v>=0?xv+6:x0+6}" y="${y+bh/2+4}" font-size="13" font-weight="700" fill="var(--fg)">${fmtV(v)}</text><line x1="${tx}" x2="${tx}" y1="${y-4}" y2="${y+bh+4}" stroke="var(--fg)" stroke-width="2" stroke-dasharray="3 2"/>`});
 return svgUk(W,H,"Indeks ENSO dan IOD")+g+`</svg>`}
function idxCatatan(){const e=EN();return `<p class="note">Garis putus-putus adalah batas fenomena: ±0,5 untuk El Niño/La Niña dan ±0,4 untuk IOD positif/negatif. Batang yang melewati garis berarti fenomena sedang terjadi.</p>${e.src?sumberPusat(e.src,"Angka diambil dari"):'<p class="note">Sumber: Buletin Iklim kami, Edisi Oktober 2026.</p>'}`}
function kesimpulanEnso(){const e=EN(),vi=e.iod!=null?e.iod:e.iodB,si=statusIod(vi),st=String(e.status||"").replace(" · "," ");
 const efek=/El Niño/.test(st)?"cenderung mengurangi hujan di Papua Barat dan Papua Barat Daya":/La Niña/.test(st)?"cenderung menambah hujan di Papua Barat dan Papua Barat Daya":"tidak banyak memengaruhi hujan di wilayah kita";
 return `<p class="kesimpulan"><span>Saat ini</span> <b>${esc(st)}</b> dan <b>IOD ${esc(si)}</b>. ${/El Niño|La Niña/.test(st)?"Kondisi ini "+efek+".":"ENSO netral "+efek+"."}</p>`}
function trenDinat(){const a=((PUSAT&&PUSAT.dinat)||[]).slice(0,6).reverse();if(a.length<2)return "";
 const S=[["Niño 3.4",x=>x.nino,"#d9452b"],["DMI (angka IOD)",x=>x.iod,"#f08c2e"]];const vs=a.flatMap(x=>S.map(s=>s[1](x))).filter(v=>v!=null);if(!vs.length)return "";
 const svgT=W=>{const lo=Math.min(0,Math.floor(Math.min(...vs)*2)/2),hi=Math.max(1,Math.ceil(Math.max(...vs)*2)/2),sempit=W<520,H=Math.round(Math.min(270,Math.max(210,W*.38))),L=40,R=sempit?28:44,T=22,B=sempit?44:34,X=i=>L+i*(W-L-R)/(a.length-1),Y=v=>T+(hi-v)/(hi-lo)*(H-T-B),st=hi-lo>4?1:.5;
 let g="";for(let t=lo;t<=hi+1e-9;t+=st)g+=`<line x1="${L}" x2="${W-R}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--line)"${Math.abs(t)<1e-9?' stroke-width="2"':""}/><text x="${L-6}" y="${Y(t)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${String(+t.toFixed(1)).replace(".",",").replace("-","−")}</text>`;
 a.forEach((x,i)=>{const an=i===0?"start":i===a.length-1?"end":"middle",bl=BLN3[x.per.bln.toLowerCase()]||x.per.bln;g+=sempit?`<text x="${X(i)}" y="${H-24}" text-anchor="${an}" font-size="11.5" fill="var(--muted)">${({I:"1–10",II:"11–20",III:"21–"+(AKHIR_BLN[String(bl).slice(0,3)]||30)})[x.per.das]||"Das "+x.per.das}<tspan x="${X(i)}" dy="14">${bl}</tspan></text>`:`<text x="${X(i)}" y="${H-10}" text-anchor="${an}" font-size="11.5" fill="var(--muted)">${({I:"1–10",II:"11–20",III:"21–"+(AKHIR_BLN[String(bl).slice(0,3)]||30)})[x.per.das]||"Das "+x.per.das} ${bl}</text>`});
 S.forEach(([n,f,c])=>{const pts=a.map((x,i)=>[X(i),f(x)]).filter(p=>p[1]!=null);if(!pts.length)return;g+=`<polyline points="${pts.map(p=>p[0]+","+Y(p[1])).join(" ")}" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>`+pts.map(p=>`<circle cx="${p[0]}" cy="${Y(p[1])}" r="4.5" fill="${c}"/>`).join("");const l=pts[pts.length-1];g+=`<text x="${l[0]-6}" y="${Y(l[1])-10}" text-anchor="end" font-size="13" font-weight="700" fill="${c}">${fmtV(l[1])}</text>`});
 return svgUk(W,H,"Perkembangan Niño 3.4 dan DMI per dasarian")+g+`</svg>`};
 return `<div class="panel"><div class="panel-head"><span>Perkembangan per Dasarian (BMKG Pusat)</span></div><div class="panel-body">${rc(svgT,760)}<div class="legend">${S.map(([n,,c])=>`<span class="c"><i style="background:${c}"></i>${n}</span>`).join("")}</div><p class="note">Anomali suhu muka laut Niño 3.4 dan indeks IOD per dasarian dari ${a.length} analisis dinamika atmosfer terakhir BMKG Pusat.</p></div></div>`}
function kartuEnsoIod(){const e=EN(),vi=e.iod!=null?e.iod:e.iodB,si=statusIod(vi);
 return `<div class="grid2" style="margin-bottom:22px"><div class="card"><span class="pill ${pillEnso(e.status)}">${e.status}</span>
<dl class="kv" style="margin-top:12px">${e.nino!=null?`<dt>Niño 3.4 ${e.ninoLab}</dt><dd class="n">${fmtV(e.nino)}</dd>`:""}<dt>Indeks ENSO ${singkatTri(e.ensoLab)}</dt><dd class="n">${fmtV(e.enso)}</dd><dt>Prediksi (Buletin Iklim kami)</dt><dd>${esc(TH("enso_prediksi"))}</dd></dl>
<p style="color:var(--muted);font-size:14px;margin:12px 0 0">${e.kalimat?"BMKG Pusat: indeks ENSO "+escH(e.ensoLab)+" menunjukkan "+escH(e.kalimat)+".":esc(TH("enso_catatan"))}</p></div>
<div class="card"><span class="pill ${si==="Netral"?"ok":"warn"}">IOD · ${si}</span>
<dl class="kv" style="margin-top:12px">${e.iodB!=null?`<dt>DMI (angka IOD) ${e.iodBLab}</dt><dd class="n">${fmtV(e.iodB)}</dd>`:""}${e.iod!=null?`<dt>DMI (angka IOD) ${e.iodLab}</dt><dd class="n">${fmtV(e.iod)}</dd>`:""}<dt>Prediksi (Buletin Iklim kami)</dt><dd>${esc(TH("iod_prediksi"))}</dd></dl></div></div>`}
function awamEnso(){const e=EN(),v=e.enso;return `Angka <b>${fmtV(v)}</b> ${v>=.5?"berada di atas batas El Niño (+0,5)":v<=-.5?"berada di bawah batas La Niña (−0,5)":"masih di antara −0,5 dan +0,5"}, sehingga statusnya <b>${e.status}</b>.`}
/* peringatan dini nasional & prediksi dari BMKG Pusat untuk provinsi kami */
function statusPusat(jenis){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];const tb=tabelPer(jenis==="hujan"?"hujan":"kering");let w=d&&d[jenis==="hujan"?"hujan":"kering"];
 if(tb){const top=p=>["awas","siaga","waspada"].find(st=>((tb[p]||{})[st]||[]).length)||"";w={ada:1,berlaku:tb.berlaku,pb:top("pb"),pbd:top("pbd"),tabel:tb}}
 if(!w||!w.ada)return "";const rinc=p=>w.tabel?["awas","siaga","waspada"].filter(st=>(w.tabel[p][st]||[]).length).map(st=>`<div class="pstatrinci"><span class="pa-tk sk-${st}">${NAMA_STATUS[st]}</span> ${escH(teksWil(w.tabel[p][st]))}</div>`).join(""):"";
 const lab=v=>`<span class="skala">${[["","Tidak ada"],["waspada","Waspada"],["siaga","Siaga"],["awas","Awas"]].map(([k,n])=>`<span class="sk lv-${k||"aman"}${k===v?" on":""}">${n}</span>`).join("")}</span>`;
 return `<div class="pstat"><div class="pstathead"><span class="livedot hijau"></span><b>${jenis==="hujan"?"Peringatan dini curah hujan tinggi":"Peringatan dini kekeringan (hari tanpa hujan &amp; SPI)"} dari BMKG Pusat</b>${w.berlaku?`<small>berlaku ${escH(w.berlaku)}</small>`:""}</div>
 <div class="pstatrow"><span>Papua Barat</span>${lab(w.pb)}</div>${rinc("pb")}<div class="pstatrow"><span>Papua Barat Daya</span>${lab(w.pbd)}</div>${rinc("pbd")}
 <small>Makin ke kanan makin tinggi tingkat bahayanya: Tidak ada, Waspada, Siaga, lalu Awas. ${w.tabel?`Rincian kabupaten dan distrik dari <a href="${escH(w.tabel.url)}" target="_blank" rel="noopener">tabel peringatan dini dasarian di situs BMKG Pusat ↗</a>.`:`BMKG Pusat menyebut tingkat provinsi ("beberapa kabupaten/kota"); rincian wilayah ada pada peta. ${d?sumberPusat(d,"Diambil dari").replace(/^<p class="note">|<\/p>$/g,""):""}`}</small>${perLain(jenis)}</div>`}
/* di halaman kekeringan/HTH/SPI: bila yang sedang berlaku justru peringatan hujan tinggi (atau sebaliknya), sebutkan agar tidak membingungkan */
function perLain(jenis){const lain=daftarPeringatan().filter(x=>x.jenis!==jenis);if(!lain.length)return "";const t=lain[0];
 return `<p class="perlain"><b>Peringatan lain yang sedang berlaku:</b> ${NAMA_STATUS[t.status]} ${t.jenis==="hujan"?"curah hujan tinggi":"kekeringan"} untuk ${escH(t.wilayah)}${t.berlaku?` (${escH(t.berlaku)})`:""}. <a href="${linkJenis(t.jenis)}">Lihat rinciannya →</a></p>`}
/* "Februari, Maret 2027" → "Februari 2027, Maret 2027" */
const lengkapTahun=a=>{const o=a.flatMap(x=>String(x).split(/\s*,\s*/)).filter(Boolean);let th="";for(let i=o.length-1;i>=0;i--){const m=String(o[i]).match(/\d{4}/);if(m)th=m[0];else if(th)o[i]=o[i]+" "+th}return o};
function prediksiPusat(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];if(!d)return "";const out=[];
 const r=(d.rendah||[]).filter(x=>x.pb||x.pbd);if(r.length)out.push(`Hujan kategori <b>Rendah</b> (&lt;50 mm/dasarian) diprediksi di sebagian ${r.some(x=>x.pb)&&r.some(x=>x.pbd)?"Papua Barat dan Papua Barat Daya":r.some(x=>x.pb)?"Papua Barat":"Papua Barat Daya"} pada <b>${r.map(x=>dasTeks(x.das)).join(", ")}</b>. Artinya hujan sedikit, kurang dari 50 mm dalam 10 hari, sehingga deret hari tanpa hujan bisa bertambah.`);
 const t=d.tinggi||[],pb=lengkapTahun(t.filter(x=>x.pb).map(x=>escH(x.bln))),pbd=lengkapTahun(t.filter(x=>x.pbd).map(x=>escH(x.bln)));
 if(pb.length||pbd.length)out.push(`Peluang tinggi hujan <b>lebih dari 300 mm/bulan</b>${pb.length?` di sebagian Papua Barat: <b>${pb.join(", ")}</b>`:""}${pb.length&&pbd.length?";":""}${pbd.length?` di sebagian Papua Barat Daya: <b>${pbd.join(", ")}</b>`:""}.`);
 if(!out.length)return "";return `<div class="panel"><div class="panel-head"><span>Prediksi Hujan dari BMKG Pusat</span></div><div class="panel-body"><ul class="cekl">${out.map(x=>`<li>${x}</li>`).join("")}</ul><p class="note"><b>Skala:</b> prediksi ini berskala provinsi (peta nasional BMKG Pusat), jadi "sebagian Papua Barat" belum tentu mencakup kabupaten Anda. Rincian per kabupaten ada di <a href="#hujan-bulanan">Buletin Iklim kami</a> dan halaman <a href="#wilayah">Info Wilayah Saya</a>.</p><p class="note"><b>Cara membaca:</b> satu bulan dibagi tiga periode 10 harian (dasarian): tanggal 1–10, 11–20, dan 21 sampai akhir bulan. Hujan di bawah 50 mm dalam 10 hari tergolong sedikit; lebih dari 300 mm dalam sebulan tergolong banyak.</p>${sumberPusat(d)}</div></div>`}
function petaPusat(x,judul,label){if(!x||!x.gambar||!x.gambar.length)return "";
 return `<div class="panel"><div class="panel-head"><span>${judul} · ${escH(x.judul)}</span><span class="pill ok">BMKG Pusat</span></div><div class="panel-body"><div class="petapusat">${x.gambar.slice(0,2).map(u=>`<figure class="map"><a href="${escH(u)}" target="_blank" rel="noopener"><img src="${escH(u)}" alt="${escH(x.judul)}" loading="lazy" referrerpolicy="no-referrer" data-galat="figure"></a><figcaption>${label(u)}</figcaption></figure>`).join("")}</div><p class="note">Peta seluruh Indonesia; wilayah kami ada di bagian timur (kepala burung Papua). Klik peta untuk memperbesar.</p>${sumberPusat(x,"Diambil dari")}</div></div>`}
/* ===== masa tahan buletin kami (14 hari) =====
   Sejak buletin dipasang, isinya diutamakan selama 14 hari. Rilisan BMKG Pusat (peta hujan bulanan & SPI) yang bulan datanya
   lebih baru dari buletin ditahan dulu; lewat 14 hari otomatis menggantikan kartu & peta itu.
   Tabel per kabupaten tetap dari buletin, karena BMKG Pusat tidak merilis rincian per kabupaten. */
const TAHAN_HARI=14,NM_BLN=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
const urutBln=t=>{const m=String(t||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);return m?+m[2]*12+NM_BLN.indexOf(m[1]):null};
const teksBln=t=>{const m=String(t||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/i);return m?m[1].charAt(0).toUpperCase()+m[1].slice(1).toLowerCase()+" "+m[2]:""};
const tglWIT=ms=>new Date(ms+9*3600e3).toISOString().slice(0,10);
/* pratinjau untuk petugas: buka web dengan ?pratinjau=pusat untuk melihat tampilan rilisan Pusat tanpa menunggu masa tahan (hanya di browser itu; ?pratinjau=0 mematikan) */
const PRATINJAU=(()=>{try{const q=new URLSearchParams(location.search).get("pratinjau");if(q==="pusat")sessionStorage.setItem("pratinjau","pusat");else if(q==="0")sessionStorage.removeItem("pratinjau");return sessionStorage.getItem("pratinjau")==="pusat"}catch(e){return false}})();
if(PRATINJAU){const pasangPr=()=>{const d=document.createElement("div");d.setAttribute("style","position:fixed;left:12px;bottom:12px;z-index:9999;max-width:calc(100% - 24px);background:#7c3aed;color:#fff;padding:10px 14px;border-radius:12px;font:600 13px/1.4 system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25)");d.innerHTML='Mode pratinjau: rilisan BMKG Pusat ditampilkan tanpa menunggu masa tahan 14 hari. Hanya terlihat di browser ini. <a href="?pratinjau=0" style="color:#fff;text-decoration:underline">Matikan</a>';document.body.appendChild(d)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",pasangPr):pasangPr()}
function buletinTerpasang(){const ik=IK()||{},kd=kondisiData()||{};let j=ik.sumber||kd.otomatis||"",pakaiPub=false;
 if(j&&typeof docMusim==="function"&&docMusim(j,"")){const ed=x=>{const m=String(x||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/i);return m?+m[2]*12+BLN_ID.map(b=>b.toLowerCase()).indexOf(m[1].toLowerCase()):-1};
  const bs=((KA&&KA.publikasi)||[]).filter(x=>/^buletin/i.test(x.jenis||"")),kdS=kd.sumber&&!docMusim(kd.sumber,"")?kd.sumber:"";
  const bp=(kdS&&bs.find(x=>ed(x.judul)===ed(kdS)))||bs.sort((a,b)=>ed(b.judul)-ed(a.judul))[0];j=bp?bp.judul:kdS;pakaiPub=true}if(!j)return null;
 const p=((KA&&KA.publikasi)||[]).find(x=>x.judul===j),t=(!pakaiPub&&ik.dipasang)||(p&&(p.dibuat||(p.tanggal?p.tanggal+"T00:00:00+09:00":"")))||kd.diubah||"",ms=Date.parse(t);
 return isFinite(ms)?{judul:j,ms,sampai:ms+TAHAN_HARI*864e5}:null}
/* status rilisan Pusat untuk "hujan" (analisis hujan bulanan) atau "spi": aktif (tampil), ditahan, atau lama (tidak lebih baru) */
function pusatGanti(jenis){const x=PUSAT&&PUSAT[jenis];if(!x||!x.gambar||!x.gambar.length)return null;
 const ik=IK()||{},bb0=jenis==="spi"?(ik.spi&&ik.spi.bulan):(ik.analisis&&ik.analisis.bulan),bp=urutBln(x.judul),bb=urutBln(bb0),b=buletinTerpasang(),g={x,jenis,bulan:teksBln(x.judul),bulanKami:teksBln(bb0),buletin:b};
 const mode=(KA&&KA.pengaturan&&KA.pengaturan.pusat_mode)||"otomatis";
 if(!b)return {...g,status:"aktif"};
 if(mode==="buletin")return {...g,status:"nonaktif"};
 /* yang dibandingkan bulan datanya; tanggal rilis hanya dipakai bila bulan tidak terbaca */
 if(bp!=null&&bb!=null?bp<=bb:!(String(x.tanggal)>tglWIT(b.ms)))return {...g,status:"lama"};
 return Date.now()<b.sampai&&!PRATINJAU&&mode!=="pusat"?{...g,status:"ditahan"}:{...g,status:"aktif",pratinjau:Date.now()<b.sampai}}
function kartuPusatGanti(jenis){const g=pusatGanti(jenis);if(!g||g.status!=="aktif")return null;const x=g.x,hj=jenis==="hujan";
 return {kunci:jenis,lab:(hj?"Curah hujan ":"Indeks kekeringan (SPI) ")+escH(g.bulan),val:"Peta terbaru",ket:(hj?"Curah &amp; sifat hujan":"Peta SPI")+" · rilis "+tglPendek(x.tanggal),
  arti:`BMKG Pusat sudah merilis ${hj?"peta curah hujan dan sifat hujan":"peta indeks kekeringan (SPI)"} ${escH(g.bulan)} untuk seluruh Indonesia, termasuk wilayah kita. Buka untuk melihat petanya.`,
  viz:`<img class="ktpeta" src="${escH(String(x.gambar[0]).replace(/([?&])(?:fit|resize)=[^&]*/,"$1w=200"))}" width="168" height="120" alt="" loading="lazy" referrerpolicy="no-referrer" data-galat="hapus">`,c:hj?"#2f8fd1":"#b45309",link:hj?"#hujan-bulanan":"#peringatan-kekeringan",pusat:true}}
/* kartu Kondisi Iklim: kartu buletin kami, diganti rilisan Pusat bila masa tahan sudah lewat */
function kartuGabung(kd){const a=[...kartuPusat(),...kartuAdmin(kd)];["hujan","spi"].forEach(j=>{const g=kartuPusatGanti(j);if(!g)return;const i=a.findIndex(x=>x.kunci===j);if(i>=0)a[i]=g;else a.push(g)});return a.filter(x=>tampilKartu(x.kunci))}
function petaGanti(jenis,judul,label){const g=pusatGanti(jenis);if(!g||g.status!=="aktif")return "";const b=g.buletin;
 return petaPusat(g.x,judul,label)+(b?`<p class="note">Peta di atas adalah rilisan terbaru BMKG Pusat (${escH(g.bulan)}). Tabel per kabupaten di halaman ini tetap dari ${escH(b.judul)}${g.bulanKami?" (data "+escH(g.bulanKami)+")":""}, karena BMKG Pusat tidak merilis rincian per kabupaten.</p>`:"")}
function kontenPusat(k){if(!PUSAT)return "";
 if(k==="hujan-bulanan")return petaGanti("hujan","Data Terbaru BMKG Pusat",u=>/_SH_|sifat/i.test(u)?"Sifat hujan":/_CH_|curah/i.test(u)?"Curah hujan":"Peta")+prediksiPusat();
 if(k==="hari-tanpa-hujan")return statusPusat("kekeringan")+prediksiPusat();
 if(k==="peringatan-kekeringan")return statusPusat("kekeringan")+petaGanti("spi","Peta SPI Terbaru BMKG Pusat",u=>/SPI3M/i.test(u)?"SPI 3 bulan":/SPI1M/i.test(u)?"SPI 1 bulan":"SPI");
 if(k==="peringatan-hujan-tinggi")return statusPusat("hujan");
 return ""}
/* ===== KONDISI IKLIM TERKINI =====
   Gabungan: angka otomatis BMKG Pusat (ENSO, IOD, peringatan dini, prediksi hujan dasarian)
   + kartu dari Buletin Iklim kami yang diisi lewat Admin > Kondisi Iklim. */
const KONDISI_BAWAAN={sumber:"Buletin Iklim Oktober 2026",ringkasan:"September 2026 didominasi hujan Rendah dengan sifat Bawah Normal. November 2026 – Januari 2027 diprakirakan hujan Menengah dengan sifat Atas Normal.",kartu:[
 {kunci:"hujan",judul:"Hujan September 2026",nilai:"Rendah",ket:"Sifat Bawah Normal di kedua provinsi"},
 {kunci:"prakiraan",judul:"Prakiraan November 2026",nilai:"Menengah",ket:"Papua Barat: Atas Normal"},
 {kunci:"musim",judul:"Awal Musim Hujan",nilai:"Oktober 2026",ket:"6 ZOM · 30,02% luas daratan",angka:30.02},
 {kunci:"hth",judul:"Hari Tanpa Hujan",nilai:"10 pos Panjang",ket:"Dasarian III September 2026",angka:10},
 {kunci:"spi",judul:"SPI September 2026",nilai:"Kering",ket:"Agak Kering s.d. Sangat Kering"}]};
const KUNCI_KARTU=[["hujan","Hujan bulan lalu","#0284c7","#hujan-bulanan"],["prakiraan","Prakiraan bulan depan","#7c3aed","/hujan-bulanan?bagian=prakiraan"],["musim","Awal musim","#15803d","#prakiraan-musim"],["hth","Hari tanpa hujan","#ea580c","#hari-tanpa-hujan"],["spi","Indeks kekeringan (SPI)","#b45309","#peringatan-kekeringan"]];
function kondisiData(){const k=KA&&KA.kondisi;return k&&Array.isArray(k.kartu)&&k.kartu.length?k:KONDISI_BAWAAN}
/* --- visual mini per kartu (SVG beranimasi, warna mengikuti --c) --- */
const LV_HUJAN=n=>/sangat tinggi/i.test(n)?4:/tinggi/i.test(n)?3:/menengah|sedang/i.test(n)?2:/rendah/i.test(n)?1:2;
const SPI_NILAI=n=>/ekstrem|sangat kering/i.test(n)?-2.2:/agak kering/i.test(n)?-1.1:/kering/i.test(n)?-1.6:/sangat basah/i.test(n)?2.2:/agak basah/i.test(n)?1.1:/basah/i.test(n)?1.6:0;
const VIZ={
 gelombang:()=>`<svg viewBox="0 0 80 64"><path class="a-geser" d="M4 34 q9 -16 18 0 t18 0 t18 0 t18 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M4 48 q9 -10 18 0 t18 0 t18 0 t18 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".45"/><ellipse cx="54" cy="16" rx="14" ry="8" fill="currentColor" opacity=".3"/><ellipse cx="44" cy="18" rx="10" ry="6" fill="currentColor" opacity=".4"/></svg>`,
 hujan:(x)=>{const n=LV_HUJAN(x.nilai);return `<svg viewBox="0 0 80 64"><g class="a-geser"><ellipse cx="34" cy="20" rx="20" ry="12" fill="currentColor" opacity=".28"/><ellipse cx="50" cy="22" rx="16" ry="10" fill="currentColor" opacity=".4"/></g>${Array.from({length:n*2},(_,i)=>`<line class="a-jatuh" style="animation-delay:${(i*.27).toFixed(2)}s" x1="${22+i*(36/(n*2))}" y1="34" x2="${19+i*(36/(n*2))}" y2="44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`).join("")}${[0,1,2,3].map(i=>`<rect x="${12+i*15}" y="${62-(i<n?6+i*3:3)}" width="10" height="${i<n?6+i*3:3}" rx="2" fill="currentColor" opacity="${i<n?.85:.2}"/>`).join("")}</svg>`},
 prakiraan:(x)=>{const n=LV_HUJAN(x.nilai);return `<svg viewBox="0 0 80 64"><rect x="10" y="10" width="44" height="44" rx="8" fill="currentColor" opacity=".14"/><rect x="10" y="10" width="44" height="12" rx="6" fill="currentColor" opacity=".55"/><line x1="22" y1="6" x2="22" y2="14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="42" y1="6" x2="42" y2="14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>${[0,1,2].map(i=>`<rect class="a-batang" style="transform-origin:${20+i*12}px 50px;animation-delay:${i*.3}s" x="${16+i*12}" y="${50-(8+Math.min(n,3)*4+i*2)}" width="8" height="${8+Math.min(n,3)*4+i*2}" rx="2" fill="currentColor"/>`).join("")}${(()=>{const t=String((x.ket||"")+" "+(x.nilai||""));const d=/atas normal/i.test(t)?"M60 40 l8 -10 l8 10":/bawah normal/i.test(t)?"M60 30 l8 10 l8 -10":"";return d?`<path class="a-lompat" d="${d}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`:`<path d="M60 31 h16 M60 39 h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`})()}</svg>`},
 musim:(x)=>{const p=Math.max(0,Math.min(100,+x.angka||0)),C=138.2;return `<svg viewBox="0 0 80 64"><circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="8"/><circle class="ring" style="--off:${(C*(1-p/100)).toFixed(1)}" cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" transform="rotate(-90 32 32)"/><text x="32" y="36" text-anchor="middle" font-size="${x.teks?11:12}" font-weight="800" fill="currentColor">${x.teks?escH(String(x.teks)):p?Math.round(p)+"%":""}</text><g class="a-jatuh"><path d="M66 22 q6 9 0 13 q-6 -4 0 -13z" fill="currentColor" opacity=".7"/></g></svg>`},
 hth:(x)=>`<svg viewBox="0 0 80 64"><g class="a-putar" style="transform-origin:34px 30px">${Array.from({length:10},(_,i)=>`<line x1="34" y1="8" x2="34" y2="13" stroke="currentColor" stroke-width="3" stroke-linecap="round" transform="rotate(${i*36} 34 30)"/>`).join("")}</g><circle class="a-denyut" style="transform-origin:34px 30px" cx="34" cy="30" r="12" fill="currentColor" opacity=".85"/><path d="M8 58 h56" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/><path d="M20 58 l4 -5 l4 5 M44 58 l4 -6 l4 6" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/>${x.angka?`<text x="66" y="22" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">${escH(String(x.angka))}</text>`:""}</svg>`,
 spi:(x)=>{const v=x.angka!=null&&x.angka!==""&&!isNaN(+x.angka)?+x.angka:SPI_NILAI(x.nilai),c=Math.max(-2.5,Math.min(2.5,v)),px=6+(c+2.5)/5*68;const W=["#b91c1c","#f97316","#facc15","#22c55e","#0ea5e9"];
  return `<svg viewBox="0 0 80 64">${W.map((w,i)=>`<rect x="${6+i*13.6}" y="34" width="13.6" height="10" fill="${w}" ${i===0?'rx="3"':i===4?'rx="3"':""}/>`).join("")}<g class="spimk" style="--x:${(px-40).toFixed(1)}px"><path d="M40 30 l-6 -10 h12 z" fill="currentColor"/><line x1="40" y1="30" x2="40" y2="48" stroke="currentColor" stroke-width="2"/></g><text x="6" y="58" font-size="8" fill="currentColor" opacity=".7">kering</text><text x="74" y="58" font-size="8" text-anchor="end" fill="currentColor" opacity=".7">basah</text></svg>`},
 iod:(v)=>{const c=Math.max(-1.5,Math.min(1.5,v||0)),px=6+(c+1.5)/3*68;return `<svg viewBox="0 0 80 64"><rect x="6" y="30" width="22" height="8" rx="4" fill="#0d9488" opacity=".75"/><rect x="28" y="30" width="24" height="8" fill="#94a3b8" opacity=".5"/><rect x="52" y="30" width="22" height="8" rx="4" fill="#f08c2e" opacity=".85"/><g class="spimk" style="--x:${(px-40).toFixed(1)}px"><circle cx="40" cy="34" r="8" fill="#fff" stroke="currentColor" stroke-width="4"/></g><path class="a-ombak" d="M-20 54 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><text x="6" y="22" font-size="8" fill="currentColor" opacity=".7">negatif</text><text x="74" y="22" font-size="8" text-anchor="end" fill="currentColor" opacity=".7">positif</text></svg>`},
 peringatan:(st)=>st?`<svg viewBox="0 0 80 64" style="--wc:${st==="awas"?"#ef4444":st==="siaga"?"#f97316":"#eab308"}"><g transform="translate(40 34) scale(.5) translate(-50 -56)">${IKON_BAHAYA.replace(/^<svg[^>]*>|<\/svg>$/g,"")}</g></svg>`:`<svg viewBox="0 0 80 64"><circle class="cincin lambat" cx="40" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 12 l18 7 v13 c0 11 -8 18 -18 21 c-10 -3 -18 -10 -18 -21 v-13z" fill="currentColor" opacity=".16" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path class="centang" d="M32 33 l6 6 l11 -12" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 prediksi:(r)=>`<svg viewBox="0 0 80 64"><g class="a-geser"><ellipse cx="30" cy="18" rx="18" ry="10" fill="currentColor" opacity=".3"/><ellipse cx="46" cy="20" rx="15" ry="9" fill="currentColor" opacity=".45"/></g>${[0,1,2].map(i=>{const on=r&&r[i];return `<rect x="${10+i*22}" y="40" width="18" height="16" rx="5" fill="currentColor" opacity="${on?.85:.18}"/><text x="${19+i*22}" y="52" text-anchor="middle" font-size="9" font-weight="800" fill="${on?"#fff":"currentColor"}">${["I","II","III"][i]}</text>${on?`<line class="a-jatuh" style="animation-delay:${i*.35}s" x1="${19+i*22}" y1="28" x2="${17+i*22}" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`:""}`}).join("")}</svg>`};
/* --- penjelasan bahasa sehari-hari untuk tiap kartu (orang awam) --- */
const BLN_PENUH={jan:"Januari",feb:"Februari",mar:"Maret",apr:"April",mei:"Mei",jun:"Juni",jul:"Juli",agu:"Agustus",agt:"Agustus",sep:"September",okt:"Oktober",nov:"November",des:"Desember"};
const BLN_RE=/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(\s+\d{4})?/i;
const besarAwal=t=>t?t.charAt(0).toUpperCase()+t.slice(1):t;
/* "NOV I 2026" -> "1–10 November 2026" */
function dasTeks(d){const m=String(d||"").match(/^(\w{3})\w*\s+(I{1,3})\s*(\d{4})?$/i);if(!m)return escH(d);const b=BLN_PENUH[m[1].toLowerCase()]||m[1];return ({I:"1–10",II:"11–20",III:"21–akhir"}[m[2].toUpperCase()])+" "+b+(m[3]?" "+m[3]:"")}
const HUJAN_ARTI=n=>/sangat tinggi/i.test(n)?"hujan sangat banyak (lebih dari 500 mm sebulan)":/tinggi/i.test(n)?"hujan banyak (301–500 mm sebulan)":/menengah|sedang/i.test(n)?"hujan cukup (101–300 mm sebulan)":/rendah/i.test(n)?"hujan sedikit (0–100 mm sebulan)":"";
const SIFAT_ARTI=t=>/bawah normal/i.test(t)?"lebih kering dari biasanya":/atas normal/i.test(t)?"lebih basah dari biasanya":/normal/i.test(t)?"seperti biasanya":"";
const HTH_KAT=[["kekeringan ekstrem","lebih dari 60"],["sangat panjang","31–60"],["sangat pendek","1–5"],["panjang","21–30"],["menengah","11–20"],["pendek","6–10"]];
function artiKartu(x){const k=x.kunci,n=String(x.nilai||""),t=String(x.ket||""),j=String(x.judul||""),b=besarAwal(((j+" "+t).match(BLN_RE)||[])[0]||""),reg=((t.match(/(Papua Barat Daya|Papua Barat)\s*:/)||[])[1]);
 if(k==="hujan"){const a=HUJAN_ARTI(n);if(!a)return "";const bag=[...t.matchAll(/(Papua Barat Daya|Papua Barat)\s*:\s*([^·;]+)/g)].map(m=>{const sf=SIFAT_ARTI(m[2]);return sf?`di ${m[1]} ${sf}`:""}).filter(Boolean);
  const sf=bag.length?bag.join(", "):SIFAT_ARTI(t+" "+n);return `Selama ${b||"bulan lalu"} turun ${a}${sf?`, ${sf}`:""}.`}
 if(k==="prakiraan"){const a=HUJAN_ARTI(n);if(!a)return "";const bag=[...t.matchAll(/(Papua Barat Daya|Papua Barat)\s*:\s*([^·;]+)/g)].map(m=>{const sf=SIFAT_ARTI(m[2]);return sf?`di ${m[1]} ${sf}`:""}).filter(Boolean);
  const sf=bag.length?bag.join(", "):SIFAT_ARTI(t);return `${b||"Bulan depan"} diprakirakan turun ${a}${sf?"; "+sf:""}.`}
 if(k==="musim"){const z=(t.match(/(\d+)\s*ZOM/i)||[])[1],km=/kemarau/i.test(j);return n?`Di ${z?z+" Zona Musim":"sebagian wilayah"}, musim ${km?"kemarau":"hujan"} diprediksi dimulai ${escH(n)}, yaitu saat hujan ${km?"kurang dari":"mencapai"} 50 mm${km?"":" atau lebih"} per dasarian (10 hari) selama tiga dasarian berturut-turut.`:""}
 if(k==="hth"){const c=(n.match(/(\d+)\s*pos/i)||[])[1],kt=HTH_KAT.find(([w])=>new RegExp(w,"i").test(n));return kt?`${c?c+" pos hujan":"Sebagian pos hujan"} sudah ${kt[1]} hari berturut-turut tidak kena hujan.`:"Jumlah hari berturut-turut tanpa hujan di pos-pos hujan kami."}
 if(k==="spi"){const a=/ekstrem|sangat kering/i.test(n)?"hujan jauh lebih sedikit dari biasanya; wilayah sangat kering":/agak kering/i.test(n)?"hujan sedikit di bawah biasanya":/kering/i.test(n)?"hujan lebih sedikit dari biasanya; wilayah sedang kering":/sangat basah|ekstrem basah/i.test(n)?"hujan jauh lebih banyak dari biasanya":/basah/i.test(n)?"hujan lebih banyak dari biasanya":/normal/i.test(n)?"hujan sesuai kebiasaan":"";return a?`Dibanding catatan puluhan tahun, ${a}.`:""}
 return ""}
function artiIod(v){return v>=.4?"Laut Samudra Hindia barat lebih hangat dari bagian timurnya. Biasanya mengurangi hujan di Indonesia bagian barat; pengaruhnya di Papua kecil.":v<=-.4?"Laut Samudra Hindia timur lebih hangat. Biasanya menambah hujan di Indonesia bagian barat; pengaruhnya di Papua kecil.":"IOD sedang netral, tidak banyak memengaruhi hujan."}
/* daftar dasarian dikelompokkan per bulan: "1–10, 11–20, dan 21–akhir November" */
function dasDaftar(arr){const g=[];arr.map(x=>dasTeks(x.das).replace(/ \d{4}$/,"")).forEach(t=>{const m=t.match(/^(\S+)\s+(.+)$/);if(!m)return;let e=g.find(y=>y.b===m[2]);if(!e)g.push(e={b:m[2],p:[]});e.p.push(m[1])});
 const gab=a=>a.length>1?a.slice(0,-1).join(", ")+" dan "+a[a.length-1]:a[0]||"";return gab(g.map(e=>gab(e.p)+" "+e.b))}
function artiEnso(e){return /El Niño/.test(e.status)?`Laut Pasifik bagian tengah ${e.enso>=2?"jauh ":""}lebih hangat dari biasanya. Bagi Papua Barat dan Papua Barat Daya, hujan cenderung berkurang dan musim kering bisa lebih panjang.`:/La Niña/.test(e.status)?"Laut Pasifik bagian tengah lebih dingin dari biasanya. Hujan cenderung bertambah; waspadai banjir dan longsor.":"Suhu laut Pasifik sedang normal, sehingga ENSO tidak banyak memengaruhi hujan."}
/* warna titik berkedip menurut sumber: biru = Buletin Iklim kami, hijau = BMKG Pusat, ungu = gabungan keduanya, oranye = alat AWS/ARG kami */
const OTO='<i class="livedot dotalat otodot" aria-hidden="true"></i>',OTO_K='<i class="livedot kami otodot" aria-hidden="true"></i>',OTO_P='<i class="livedot hijau otodot" aria-hidden="true"></i>',OTO_C='<i class="livedot campur otodot" aria-hidden="true"></i>';
const LEGENDA_SUMBER=(alat)=>`<p class="lgsumber"><span><i class="livedot kami"></i>Buletin Iklim kami</span><span><i class="livedot hijau"></i>BMKG Pusat</span><span><i class="livedot campur"></i>Gabungan keduanya</span>${alat?'<span><i class="livedot dotalat"></i>Alat AWS/ARG kami</span>':""}</p>`;
function tandaiOto(root){if(!root)return;
 root.querySelectorAll("[data-oto]").forEach(n=>{const box=n.closest(".panel,.card,.wilk,.pusatbar")||n.parentElement;const h=box&&box.querySelector(".panel-head>span,h3,.eyebrow,h2");if(h&&!h.querySelector(".otodot"))h.insertAdjacentHTML("beforeend",OTO_K)});
 root.querySelectorAll("[data-otogrup] .panel-head>span:first-child,[data-otogrup] h3,[data-otogrup] .sec-title").forEach(h=>{if(!h.querySelector(".otodot"))h.insertAdjacentHTML("beforeend",OTO_P)})}
function kartuK(o,i){return `<a class="kt reveal" href="${o.link}" style="--c:${o.c};--i:${i}"><div class="ktviz">${o.viz}</div><span class="ktlab">${o.lab}</span><b class="ktval">${o.val}</b><small>${o.ket}</small>${o.arti?`<span class="ktarti">${o.arti}</span>`:""}<em class="ktsrc${o.pusat?" pusat":""}">${o.pusat?'<i class="livedot hijau"></i>BMKG Pusat'+(o.tgl?" · rilisan "+o.tgl:""):(o.oto?'<i class="livedot kami"></i>':"")+o.src}</em></a>`}
function kartuPusat(){const e=EN(),out=[],pt=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];
 const vi=e.iod!=null?e.iod:e.iodB;out.push({kunci:"iod",lab:"Status IOD (Samudra Hindia)",val:statusIod(vi),ket:"DMI (angka IOD) "+singkatDas(e.iod!=null?e.iodS:e.iodBS)+" "+fmtV(vi),arti:artiIod(vi),viz:VIZ.iod(vi),c:"#f08c2e",link:"/enso-iod?bagian=iod",pusat:!!e.src,src:"Buletin Iklim kami"});
 const d=daftarPeringatan(),t=d[0];out.push({kunci:"peringatan",lab:"Peringatan dini",val:t?NAMA_STATUS[t.status]+` <small class="ktjenis">${t.jenis==="hujan"?"hujan tinggi":"kekeringan"}</small>`:"Tidak ada",arti:t?`${NAMA_STATUS[t.status]} adalah tingkat ${t.status==="awas"?"tertinggi":t.status==="siaga"?"kedua":"terendah"} dari tiga tingkat peringatan (Waspada, Siaga, Awas). Buka untuk melihat wilayahnya.`:"Saat ini tidak ada wilayah kita yang mendapat peringatan dini kekeringan maupun hujan tinggi.",ket:t?`${d.length} wilayah · ${escH(potong([...new Set(d.map(x=>x.prov||x.wilayah))].join(" & "),60))}${new Set(d.map(x=>x.jenis)).size>1?" · "+[...new Set(d.map(x=>JENIS_PENDEK[x.jenis]))].join(" & "):""}`:"Tidak ada Waspada, Siaga, Awas",viz:VIZ.peringatan(t&&t.status),c:t?(t.status==="awas"?"#dc2626":t.status==="siaga"?"#ea580c":"#ca8a04"):"#16a34a",link:t?linkJenis(t.jenis):"#peringatan-kekeringan",pusat:t?!!t.pusat:!!pt,src:t?"Admin kami":"Pantauan kami"});
 if(pt){const r=(pt.rendah||[]).filter(x=>x.pb||x.pbd),tg=(pt.tinggi||[]).filter(x=>x.pb||x.pbd);
  const provP=a=>{const pb=a.some(x=>x.pb),pd=a.some(x=>x.pbd);return pb&&pd?"Papua Barat & Papua Barat Daya":pb?"Papua Barat":pd?"Papua Barat Daya":""},rilisP=pt.tanggal?tglPendek(pt.tanggal):"";
  const tglDas=s=>{const m=String(s).match(/^(\w{3}) (I{1,3}) (\d{4})$/);if(!m)return escH(s);const b=BLN_PMH.indexOf(m[1].toUpperCase().replace("AGU","AGT").replace("AUG","AGT").replace("MAY","MEI").replace("OCT","OKT").replace("DEC","DES"));if(b<0)return escH(s);const akhir=new Date(+m[3],b+1,0).getDate(),r0=m[2]==="I"?"1–10":m[2]==="II"?"11–20":"21–"+akhir;return `${r0} ${NM_BLN_PMH[b].slice(0,3)}`};
  out.push({kunci:"prediksi",lab:r.length||!tg.length?"Prediksi hujan 10 harian":"Prediksi hujan bulanan",tgl:rilisP,arti:r.length?`Hujan diprakirakan sedikit (kurang dari 50 mm per 10 hari) pada ${dasDaftar(r)}.`:tg.length?`Ada peluang hujan banyak, lebih dari 300 mm sebulan, pada ${lengkapTahun(tg.map(x=>escH(x.bln))).slice(0,2).join(", ")}. Waspadai banjir dan longsor.`:"Hujan diprakirakan lebih dari 50 mm tiap 10 hari (tidak tergolong sedikit).",val:r.length?"Rendah":tg.length?"Berpeluang tinggi":"Tidak rendah",ket:r.length?"&lt;50 mm · "+r.map(x=>tglDas(x.das)).join(", ")+(provP(r)?" · "+escH(provP(r)):""):tg.length?"&gt;300 mm/bulan: "+lengkapTahun(tg.map(x=>escH(x.bln))).slice(0,2).join(", ")+(provP(tg)?" · "+escH(provP(tg)):""):"Di atas 50 mm per dasarian",viz:r.length||!tg.length?VIZ.prediksi(r.length?[0,1,2].map(i=>!!r[i]):null):VIZ.prakiraan({}),c:"#0369a1",link:"#hari-tanpa-hujan",pusat:true})}
 {const g=gelTerkini();if(gelDekat(g)){const w=wilTimur(g);out.push({kunci:"gelombang",lab:"Gelombang atmosfer aktif",val:g.gel.length?escH(daftarJ(g.gel.map(x=>x==="Low Frequency"?"Frekuensi rendah":x))):escH(teksMjo(g)),ket:escH((w?"Di "+w:"Indonesia bagian timur")+" · "+tglPendek(g.tanggal)),
  arti:"Gangguan di atmosfer yang bergerak dan bisa menambah awan serta hujan selama beberapa hari. Ini informasi, bukan peringatan; berlaku untuk wilayah luas, bukan per kabupaten.",viz:VIZ.gelombang(),c:"#0e7490",link:"#enso-iod",pusat:true,src:"BMKG Pusat"})}}
 return out}
const BLNTH=/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+\d{4}/i;
function kartuAdmin(kd){const mA=(String(((kd.kartu||[]).find(x=>x.kunci==="hujan")||{}).judul||"").match(BLNTH)||[""])[0].toLowerCase();
 return (kd.kartu||[]).filter(x=>{if(!mA||!["hth","spi"].includes(x.kunci))return true;const m=(String(x.judul||"")+" "+String(x.ket||"")).match(BLNTH);return !m||m[0].toLowerCase()===mA}).map(x=>{const m=KUNCI_KARTU.find(k=>k[0]===x.kunci)||["lain","",'#0133cc',"#publikasi"];
  const j0=String(x.judul||""),lab=x.kunci==="prakiraan"&&!/hujan/i.test(j0)?j0.replace(/^prakiraan/i,"Prakiraan hujan"):x.kunci==="hujan"&&/^hujan\s/i.test(j0)?j0.replace(/^hujan/i,"Curah hujan"):x.kunci==="spi"&&!/kering/i.test(j0)?j0.replace(/^SPI/i,"Indeks kekeringan (SPI)"):j0;
  if(x.kunci==="musim"&&/kemarau/i.test(j0)&&musimLewat(j0+" "+(x.nilai||"")+" "+(x.ket||"")+" "+(kd.otomatis||kd.sumber||""))){const b=KONDISI_BAWAAN.kartu.find(q=>q.kunci==="musim");if(b)x=b}
  if(x.kunci==="musim"){const j0=String(x.judul||""),jn=/kemarau/i.test(j0)?"kemarau":"hujan",lkM=jn==="kemarau"?"#prakiraan-musim-kemarau":m[3],i=jn==="hujan"&&typeof infoMusimTerkini==="function"?infoMusimTerkini():null,ms=IK()["musim_"+jn]||{},labM="Prediksi Awal Musim "+(jn==="hujan"?"Hujan":"Kemarau");
   if(i)return {kunci:x.kunci,lab:labM,val:escH(i.val),ket:escH(i.ket),arti:escH(i.arti),viz:VIZ.musim({angka:i.angka,teks:i.rasio}),c:m[2],link:lkM,oto:true,src:escH(i.src)};
   return {kunci:x.kunci,lab:labM,val:escH(x.nilai),ket:escH(x.ket||""),arti:artiKartu(x),viz:VIZ.musim(x),c:m[2],link:lkM,oto:true,src:escH(ms._sumber||"Press Release Prediksi Musim "+(jn==="hujan"?"Hujan 2026/2027":"Kemarau"))}}
  return {kunci:x.kunci,lab:escH(lab),val:escH(x.nilai),ket:escH(x.ket||""),arti:artiKartu(x),viz:(VIZ[x.kunci]||VIZ.prakiraan)(x),c:m[2],link:m[3],oto:!!(kd.otomatis||x.src),src:escH(x.src||kd.sumber||"Buletin Iklim kami")}})}
function gaugeEnso(v){const cx=110,cy=112,r=88,A=x=>Math.max(-3,Math.min(3,x))/3*90*Math.PI/180,P=x=>[cx+r*Math.sin(A(x)),cy-r*Math.cos(A(x))];
 const seg=[[-3,-1.5,"#1d4ed8"],[-1.5,-.5,"#60a5fa"],[-.5,.5,"#cbd5e1"],[.5,1.5,"#fb923c"],[1.5,3,"#ef4444"]];
 const s=seg.map(([a,b,c])=>{const p=P(a),q=P(b);return `<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)} A${r} ${r} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}" stroke="${c}" stroke-width="16" fill="none"/>`}).join("");
 const ang=(Math.max(-3,Math.min(3,v||0))/3*90).toFixed(1);
 return `<svg class="gauge" viewBox="0 0 220 128" role="img" aria-label="Posisi indeks ENSO">${s}${[-3,-1.5,-.5,.5,1.5,3].map(t=>{const p=P(t),o=[cx+(r+16)*Math.sin(A(t)),cy-(r+16)*Math.cos(A(t))];return `<text x="${o[0].toFixed(1)}" y="${(o[1]+3).toFixed(1)}" text-anchor="middle" font-size="9" fill="#c7d2fe">${String(t).replace(".",",").replace("-","−")}</text>`}).join("")}
 <text x="22" y="124" font-size="10" fill="#93c5fd" font-weight="700">La Niña</text><text x="110" y="10" text-anchor="middle" font-size="10" fill="#e2e8f0" font-weight="700">Netral</text><text x="198" y="124" text-anchor="end" font-size="10" fill="#fdba74" font-weight="700">El Niño</text>
 <g class="jarum" style="--sudut:${ang}deg"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-r+14}" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="4" fill="#0133cc"/></g></svg>`}
function kartuEnso(){const e=EN(),kd=kondisiData(),panas=e.enso>=.5,dingin=e.enso<=-.5;
 return `<div class="kenso reveal ${panas?"panas":dingin?"dingin":""}"><div class="kensobg" aria-hidden="true"><svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="kensoW"><stop offset="0" stop-color="${dingin?"#38bdf8":panas?"#fb923c":"#94a3b8"}" stop-opacity=".7"/><stop offset="1" stop-color="${dingin?"#38bdf8":panas?"#fb923c":"#94a3b8"}" stop-opacity="0"/></radialGradient></defs><circle class="halo" cx="320" cy="250" r="170" fill="url(#kensoW)"/>${[0,1,2].map(i=>`<path class="banjir${i%2?" b2":""}" d="M-200 ${240+i*24} q50 -14 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V320 H-200Z" fill="#fff" fill-opacity="${.05+i*.03}"/>`).join("")}</svg></div>
 <div class="kensoin"><span class="eyebrow">ENSO · Suhu Muka Laut Pasifik${e.src?(kd.ringkasan?OTO_C:OTO_P):""}</span>${gaugeEnso(e.enso)}<div class="kensonum"><div class="kangka" data-v="${e.enso}">${fmtV(e.enso)}</div><span class="pill ${pillEnso(e.status)}">${e.status.replace(" · "," ")}</span></div>
 <p>Indeks ENSO periode ${e.ensoNama}${e.src?" · BMKG Pusat, analisis Dasarian "+escH(e.src.per.das)+" "+escH(e.src.per.bln)+" "+escH(e.src.per.thn):""}.${/El Niño|La Niña/.test(e.status)&&TH("enso_prediksi")?" Diprediksi "+esc(TH("enso_prediksi").replace(/^\w/,c=>c.toLowerCase())).replace(/\.$/,"")+".":""}</p>
 <p class="karti"><b>Artinya:</b> ${artiEnso(e)}</p>${barisDinamika()}${catatanBasi(e,1)}${kd.ringkasan?`<p class="kring">${escH(kd.ringkasan)}</p>`:""}<a class="kmore" href="#enso-iod">Lihat ENSO, IOD &amp; dinamika atmosfer →</a></div></div>`}
function kondisiHTML(){const kd=kondisiData(),t=kartuGabung(kd);
 return `<div class="kondisi2${tampilKartu("enso")?"":" tanpaenso"}">${tampilKartu("enso")?kartuEnso():""}<div class="ktgrid">${t.map(kartuK).join("")}</div></div><p class="note ksumber">Titik berkedip menandakan isi yang diperbarui otomatis. Kartu bertanda BMKG Pusat diambil dari rilisan BMKG Pusat; kartu lain dari ${escH(kd.sumber||"Buletin Iklim kami")}.</p>${LEGENDA_SUMBER(1)}`}
/* ringkasan kartu & dokumen terbaru kami pada halaman Iklim */
const KARTU_HAL={"hujan-bulanan":["hujan","prakiraan","prediksi"],"hari-tanpa-hujan":["hth","prediksi","peringatan"],"peringatan-kekeringan":["spi","peringatan","hth"],"peringatan-hujan-tinggi":["peringatan","prediksi","prakiraan"],"prakiraan-musim":["musim","prakiraan"],"zona-musim":["musim"],"iklim-papua-barat":["hujan","prakiraan","spi","iod"],"enso-iod":["iod"]};
const TEKS_HAL={"hujan-bulanan":["hujan","prakiraan"],"hari-tanpa-hujan":["hth"],"peringatan-kekeringan":["spi","hth"],"peringatan-hujan-tinggi":["prakiraan"],"prakiraan-musim":["musim"],"zona-musim":["musim"],"enso-iod":["enso"],"iklim-papua-barat":["hujan","prakiraan","spi"]};
/* dokumen/teks musim yang periodenya sudah lewat (mis. PMK 2026 setelah Oktober 2026) tidak dipakai sebagai ringkasan terbaru */
/* musim yang "lewat" = sudah ada prediksi musim sejenis yang lebih baru (PMK 2027 menggantikan PMK 2026,
   PMH 2027/2028 menggantikan PMH 2026/2027). Selama belum ada, keduanya tetap berlaku (masa peralihan). */
function tahunMusim(t){t=String(t||"");let m=t.match(/(?:pmk|kemarau)\D{0,15}?(?:20)?(\d{2})(?!\d)/i);if(m)return {j:"kemarau",th:2000+ +m[1]};
 m=t.match(/(?:pmh|musim hujan)\D{0,15}?(?:20)?(\d{2})(?!\d)/i);if(m)return {j:"hujan",th:2000+ +m[1]};return null}
function tahunTerbaru(j){let mx=0;const cek=t=>{const x=tahunMusim(t);if(x&&x.j===j&&x.th>mx)mx=x.th};
 ((KA&&KA.publikasi)||[]).forEach(p=>cek(p.jenis+" "+p.judul));(typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).forEach(p=>cek(p.kategori+" "+p.judul));
 const m=IK()["musim_"+j];if(m&&m.periode){const y=+(String(m.periode).match(/20\d\d/)||[0])[0];if(y>mx)mx=y}
 const u=KA&&KA.pengaturan&&KA.pengaturan[j==="kemarau"?"pmk_update":"pmh_update"];if(u&&+u.tahun>mx)mx=+u.tahun;return mx}
function musimLewat(t){const x=tahunMusim(t);return !!x&&x.th<tahunTerbaru(x.j)}
/* urutan mulai musim (bulan ke-) untuk menentukan kartu musim mana yang lebih baru: kemarau X ≈ Maret X, hujan X/X+1 ≈ Oktober X */
function mulaiMusim(t){const x=tahunMusim(t);if(x)return x.th*12+(x.j==="kemarau"?2:9);const m=String(t||"").match(/(kemarau|hujan)[^0-9]{0,40}(20\d\d)/i);return m?+m[2]*12+(/kemarau/i.test(m[1])?2:9):null}
/* musim terbaru (dipakai tab ZOM): yang mulainya paling akhir di antara PMH dan PMK yang tersedia */
function musimTerbaru(){const h=tahunTerbaru("hujan"),k=tahunTerbaru("kemarau");if(!h&&!k)return "hujan";return (k?k*12+2:-1)>(h?h*12+9:-1)?"kemarau":"hujan"}
const jenisDok=t=>{const x=tahunMusim(t);return x?x.j:/kemarau/i.test(t)?"kemarau":/musim hujan|pmh/i.test(t)?"hujan":""};
function okTeksMusim(k,src,txt){const kem=/kemarau|\bpmk/i.test(src+" "+txt);if(k==="prakiraan-musim")return !kem;if(k==="zona-musim"){const j=jenisDok(txt)||jenisDok(src);return !musimLewat(src+" "+txt)&&(!j||j===musimTerbaru())}return true}
function teksKami(k){const kd=kondisiData(),t=kd.teks||{},ts=kd.teks_src||{},srcT=judulSumber(kd.otomatis||kd.sumber)||"",w=(TEKS_HAL[k]||[]).filter(x=>t[x]&&(x!=="musim"||okTeksMusim(k,ts[x]||srcT,t[x])));if(!w.length)return ""; const sb=x=>judulSumber(ts[x])||(x==="musim"?"dokumen prediksi musim terbaru kami":srcT||"dokumen terbaru kami"),beda=new Set(w.map(sb)).size>1; return `<div class="tekskami reveal"><div class="tkico">${ic('<path d="M7 7h10M7 11h10M7 15h6"/><rect x="3" y="3" width="18" height="18" rx="3"/>')}</div><div><span class="eyebrow">Ringkasan dari ${escH(beda?"dokumen terbaru kami":sb(w[0]))}${kd.otomatis?OTO_K:""}</span>${w.map(x=>`<p>${escH(t[x])}${beda?` <small class="tksrc">(${escH(sb(x))})</small>`:""}</p>`).join("")}</div></div>`}
const JENIS_HAL={"hari-tanpa-hujan":"kekeringan","peringatan-kekeringan":"kekeringan","peringatan-hujan-tinggi":"hujan"};
function kartuPerJenis(j){const d=daftarPeringatan().filter(x=>x.jenis===j),t=d[0],nm=j==="hujan"?"curah hujan tinggi":"kekeringan";
 return {kunci:"peringatan",lab:"Peringatan dini "+nm,val:t?NAMA_STATUS[t.status]:"Tidak ada",ket:t?`${d.length} wilayah · ${escH(potong([...new Set(d.map(x=>x.prov||x.wilayah))].join(" & "),60))}`:"Papua Barat &amp; Papua Barat Daya",
  arti:t?`${NAMA_STATUS[t.status]} ${nm}: tingkat ${t.status==="awas"?"tertinggi":t.status==="siaga"?"kedua":"terendah"} dari tiga tingkat (Waspada, Siaga, Awas). Buka untuk melihat wilayahnya.`:`Saat ini tidak ada peringatan dini ${j==="hujan"?"curah hujan tinggi":"kekeringan meteorologis"} untuk wilayah kita.`,
  viz:VIZ.peringatan(t&&t.status),c:t?(t.status==="awas"?"#dc2626":t.status==="siaga"?"#ea580c":"#ca8a04"):"#16a34a",link:linkJenis(j),pusat:t?!!t.pusat:false,oto:true,src:t?(t.pusat?"BMKG Pusat":"Stasiun Klimatologi Papua Barat"):"Pantauan kami"}}
function ringkasKami(k){const w=KARTU_HAL[k];if(!w)return teksKami(k);const all=kartuGabung(kondisiData()).map(a=>a.kunci==="peringatan"&&JENIS_HAL[k]?kartuPerJenis(JENIS_HAL[k]):a),t=w.map(x=>all.find(a=>a.kunci===x)).filter(Boolean);if(!t.length)return teksKami(k);
 return `<div class="ktgrid mini">${t.map(kartuK).join("")}</div>`+teksKami(k)}
const DOK_HAL={"prakiraan-musim-kemarau":/kemarau/i,"prakiraan-musim":/musim hujan|fgd|press/i,"zona-musim":/musim|zom/i,"hujan-bulanan":/buletin|informasi iklim/i,"hari-tanpa-hujan":/buletin|peringatan/i,"peringatan-kekeringan":/buletin|peringatan|kekeringan/i,"peringatan-hujan-tinggi":/peringatan|hujan tinggi/i,"enso-iod":/buletin|enso|el ni/i,"iklim-papua-barat":/buletin|informasi iklim/i};
function dokKami(k){const re=DOK_HAL[k];if(!re)return "";
 const a=((KA&&KA.publikasi)||[]).filter(p=>p.jenis!=="Berita Kegiatan"&&(p.file||p.link)&&re.test(p.jenis+" "+p.judul)).map(p=>({jenis:escH(p.jenis),judul:escH(p.judul),tgl:tglPendek(p.tanggal),ringkas:escH(potong(p.ringkas,140)),url:p.file?(unduhDok()?fileURL(p.file):"#publikasi"):urlAman(p.link),lokal:!!p.file&&!unduhDok(),gambar:fileURL(p.gambar),seni:SENI_JENIS[p.jenis]||"hujan",lewat:musimLewat(p.jenis+" "+p.judul)}));
 const s=(typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).filter(p=>(p.file||p.url)&&re.test(p.kategori+" "+p.judul)).map(p=>({jenis:p.kategori,judul:p.judul,tgl:p.tanggal,ringkas:potong(p.ringkas,140),url:p.file&&!unduhDok()?(p.url||"#publikasi"):(p.file||p.url),lokal:!!p.file&&!unduhDok()&&!p.url,gambar:p.gambar||"",seni:/kemarau/i.test(p.judul)?"panas":"hujan",lewat:musimLewat(p.kategori+" "+p.judul)}));
 const mt=k==="zona-musim"?musimTerbaru():"";
 const d=[...a,...s].filter(x=>!(x.lewat&&(k==="zona-musim"||k==="prakiraan-musim"))&&(!mt||(()=>{const j=jenisDok(x.jenis+" "+x.judul);return !j||j===mt})())).slice(0,2);if(!d.length)return "";
 return `<div class="dokkami">${d.map((x,i)=>`<a class="dok reveal" style="--d:${i*80}ms" href="${x.url}"${x.lokal?"":` target="_blank" rel="noopener"`}>${sampulDok("dokimg",x.gambar,x.seni,"")}<div class="dokisi"><span class="eyebrow">${x.jenis} · ${x.lewat?"arsip":"dari kami"}</span><b>${x.judul}</b><small>${x.tgl}</small>${x.ringkas?`<p>${x.ringkas}</p>`:""}<i>${x.lokal?"Lihat di Publikasi →":"Unduh dokumen ↗"}</i></div></a>`).join("")}</div>`}



const PBD=["Kota Sorong","Sorong","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw"];
const SRC_BAWAAN='<p class="note">Sumber: Buletin Iklim Oktober 2026 (Vol. 99, ISSN 2622-9798).</p>';
function srcBul(){const ik=IK()||{},kd=kondisiData()||{};let j=ik.sumber||kd.otomatis||"";if(j&&docMusim(j,"")){const b=buletinTerpasang();j=b?b.judul:""}return j?`<p class="note">Sumber: ${escH(j)} (Buletin Iklim kami).</p>`:SRC_BAWAAN}
/* ===== ISI WEB YANG BISA DIUBAH DARI ADMIN (dulu tertulis di kode) =====
   Bila petugas belum pernah menyimpan, web memakai isi bawaan di bawah ini. Semua isian petugas
   ditampilkan sebagai teks biasa (di-escape). Format sederhana yang didukung:
   **tebal**, [teks tautan](https://... atau #halaman), baris "## Judul", "### Subjudul", "- butir". */
const PG=k=>{const p=KA&&KA.pengaturan;return p&&p[k]!=null?p[k]:null};
const lnkAman=u=>{u=String(u||"").trim();return /^https:\/\/[^\s"'<>`]+$/.test(u)||/^#[a-z0-9-]{1,60}$/.test(u)?u:""};
function tebal(t){return escH(t).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\[([^\]]{1,120})\]\((https:\/\/[^\s)"'<>]+|#[a-z0-9-]{1,60})\)/g,(m,a,u)=>`<a href="${u}"${u[0]==="#"?"":' target="_blank" rel="noopener"'}>${a}</a>`)}
function markahHTML(t,ganti){t=String(t||"");if(ganti)Object.entries(ganti).forEach(([k,v])=>t=t.split("{"+k+"}").join(v));
 const out=[];let ul=null;const tutup=()=>{if(ul){out.push("<ul>"+ul.join("")+"</ul>");ul=null}};
 t.split(/\n/).forEach(l=>{const x=l.trim();if(!x){tutup();return}
  if(/^###\s+/.test(x)){tutup();out.push("<h3>"+tebal(x.replace(/^###\s+/,""))+"</h3>")}else if(/^##\s+/.test(x)){tutup();out.push("<h2>"+tebal(x.replace(/^##\s+/,""))+"</h2>")}
  else if(/^[-•]\s+/.test(x)){(ul=ul||[]).push("<li>"+tebal(x.replace(/^[-•]\s+/,""))+"</li>")}else{tutup();out.push("<p>"+tebal(x)+"</p>")}});
 tutup();return out.join("\n")}
/* HTML bawaan -> format sederhana, untuk ditampilkan di kotak isian Admin */
function keMarkah(h){h=String(h||"").replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,(m,u,a)=>"["+a.replace(/<[^>]+>/g,"")+"]("+u.replace(/&amp;/g,"&")+")").replace(/<\/?b>/gi,"**").replace(/<\/?strong>/gi,"**");
 try{return new DOMParser().parseFromString(h,"text/html").body.textContent.replace(/\s+/g," ").trim()}catch(e){return h.replace(/<[^>]+>/g,"").trim()}}
/* --- tombol pintasan beranda --- */
const PINTASAN_BAWAAN=[{link:"#prakiraan-musim",ikon:"cal",judul:"Prediksi Musim",sub:""},{link:"#peralatan",ikon:"cloud",judul:"Data Alat Langsung",sub:"AWS & ARG terkini"},{link:"#peringatan-kekeringan",ikon:"alert",judul:"Peringatan Dini",sub:"Kekeringan & hujan tinggi"},{link:"#wilayah",ikon:"map",judul:"Info Wilayah Saya",sub:"Iklim di distrik Anda"},{link:"#publikasi",ikon:"map",judul:"Publikasi",sub:"Buletin & prediksi musim"},{link:"#layanan-data",ikon:"drop",judul:"Permintaan Pelayanan Data",sub:"Permintaan data & kontak"}];
/* judul rilisan BMKG Pusat berbahasa Inggris → Indonesia (judul asli tetap di tautan) */
const judulID=j=>String(j||"").replace(/^The\s+Standardized Precipitation Index\b/i,"Indeks Presipitasi Terstandardisasi (SPI)").replace(/^Standardized Precipitation Index\b/i,"Indeks Presipitasi Terstandardisasi (SPI)");
function pintasanData(){const a=PG("pintasan");const d=Array.isArray(a)&&a.length?a:PINTASAN_BAWAAN;
 const per=(()=>{try{return daftarPeringatan()}catch(e){return []}})();
 return d.map(x=>({link:x.link==="#peringatan-kekeringan"&&x.ikon==="alert"&&per.length?linkJenis(per[0].jenis):(lnkAman(x.link)||"#beranda"),ikon:I[x.ikon]?x.ikon:"map",judul:escH(x.judul),sub:x.sub?escH(x.sub):x.link==="#prakiraan-musim"?((IK().musim_hujan&&IK().musim_hujan.periode)?"Musim hujan "+escH(IK().musim_hujan.periode):"Musim hujan 2026/2027"):""}))}
/* --- banner bawaan (slide tetap) --- */
function bannerBawaan(){const a=PG("banner");if(!Array.isArray(a))return typeof BANNER!=="undefined"?BANNER:[];
 return a.filter(x=>x&&x.aktif!==false&&x.judul).map(x=>({label:escH(x.label),judul:escH(x.judul),teks:escH(x.teks),tombol:escH(x.tombol),link:lnkAman(x.link)||"#beranda",luar:/^https:/.test(x.link||"")?1:0,seni:x.seni||"hujan",enso:!!x.enso,sampai:x.sampai||"",
  ...(x.gambar?{gambar:fileURL(x.gambar),keterangan:x.keterangan||""}:{})}))}
/* --- liputan media --- */
function mediaDaftar(){const a=PG("media");if(!Array.isArray(a))return typeof BERITA_MEDIA!=="undefined"?BERITA_MEDIA:[];
 return a.map(x=>({tanggal:x.tanggal,judul:escH(x.judul),media:escH(x.media),url:urlAman(x.url),gambar:urlAman(x.gambar),ringkas:escH(x.ringkas||""),otomatis:!!x.ringkas})).filter(x=>x.judul&&x.url)}
/* --- keterangan kantor di bagian bawah web --- */
const FOOTER_BAWAAN={desk:"Unit Pelaksana Teknis BMKG yang melayani informasi klimatologi untuk Provinsi Papua Barat dan Papua Barat Daya.",aka:"Dikenal juga sebagai Staklim Papua Barat, Staklim Pabar, Stasiun Klimatologi Kelas III Papua Barat, atau BMKG Klimatologi Manokwari."};
const TW=()=>PG("teks_web")||{};
/* --- Permintaan Pelayanan Data --- */
const LAYANAN_BAWAAN={data:["Analisis curah hujan dan sifat hujan bulanan","Curah hujan ekstrem harian dari jaringan pos hujan","Suhu udara ekstrem bulanan","Monitoring hari tanpa hujan per dasarian","Indeks kekeringan (SPI)","Analisis dinamika atmosfer dan laut: ENSO, IOD, angin lapisan 850 mb","Prakiraan curah hujan dan sifat hujan tiga bulan ke depan","Prediksi musim hujan dan musim kemarau"],
 tarif:"Data dikenakan tarif PNBP sesuai peraturan yang berlaku. Tarif nol rupiah berlaku untuk keperluan tertentu, misalnya penanggulangan bencana dan pendidikan, dengan surat pengantar.",
 alur:["Kirim surat permohonan ke {email}, ajukan lewat PTSP BMKG, atau datang ke kantor kami di Arfai.","Sertakan jenis data, lokasi, periode, dan keperluan.","Petugas kami memeriksa ketersediaan data.","Bayar PNBP bila dikenakan tarif.","Data dikirim dalam format digital."],
 kalender:[{judul:"Setiap dasarian",isi:"Monitoring hari tanpa hujan dan peringatan dini kekeringan serta curah hujan tinggi.",link:"#hari-tanpa-hujan"},{judul:"Setiap bulan",isi:"Buletin Iklim: analisis hujan bulan lalu, indeks kekeringan (SPI), dinamika atmosfer, dan prakiraan tiga bulan ke depan.",link:"#publikasi"},{judul:"Menjelang musim kemarau",isi:"Prediksi Musim Kemarau: awal, sifat, dan puncak musim kemarau per Zona Musim.",link:"#prakiraan-musim-kemarau"},{judul:"Menjelang musim hujan",isi:"Prediksi Musim Hujan dan FGD bersama pemangku kepentingan daerah.",link:"#prakiraan-musim"},{judul:"Sepanjang tahun",isi:"Layanan permintaan data, konsultasi iklim, dan data AWS/ARG langsung.",link:"#peralatan"}]};
function layananData(){const a=PG("layanan")||{};const pakai=(k)=>Array.isArray(a[k])&&a[k].length?a[k]:LAYANAN_BAWAAN[k];return {data:pakai("data"),alur:pakai("alur"),kalender:pakai("kalender"),tarif:a.tarif||LAYANAN_BAWAAN.tarif}}
const WARNA_KAL=["#ea580c","#0284c7","#b45309","#15803d","#7c3aed","#0e7490","#be123c","#4d7c0f","#6d28d9","#0369a1"];
/* --- penjelasan "Cara membaca ..." di halaman Iklim: bisa diganti per kotak --- */
let AWAM_REKAM=null;
const halKunci=()=>/^iklim-(?!papua-barat$)/.test(cur)?"kabupaten":/^alat-/.test(cur)?"alat":cur;
function awam(title,items){const key=halKunci()+"|"+keMarkah(title),ov=((TW().awam)||{})[key],sunting=` data-sunting="tekshal|awam:${escH(key)}"`;
 if(AWAM_REKAM)AWAM_REKAM.push({key,hal:halKunci(),judul:keMarkah(title),butir:items.map(keMarkah)});
 if(Array.isArray(ov)&&ov.length)items=ov.map(tebal);
 return `<div${sunting} class="card prose awam" style="margin-top:22px"><h3 style="margin-top:0">${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></div>`}
function tbl(h,rows){return `<div class="tbl-wrap"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}

/* ---- Beranda (gaya portal modern) ---- */
const IKON_WA='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3z"/></svg>';
const IKON_IG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
function tombolSosial(){const I=INFO();return `<div class="sosbtn"><a class="sb wa" href="${waURL()}" target="_blank" rel="noopener">${IKON_WA}WhatsApp ${escH(waTeks(I.wa))}</a><a class="sb ig" href="${igURL()}" target="_blank" rel="noopener">${IKON_IG}Instagram @${escH(I.ig)}</a>${I.linktree?`<a class="sb lt" href="${escH(I.linktree)}" target="_blank" rel="noopener">${IKON_LT}Linktree</a>`:""}</div>`}
function petaKantor(){const p={...((typeof PETA_KANTOR!=="undefined"?PETA_KANTOR:{})||{})};const I=INFO();if(/^https:\/\/www\.google\.com\/maps\/embed\?/.test(I.peta_embed||""))p.embed=I.peta_embed;if(/^https:\/\//.test(I.peta_link||""))p.link=I.peta_link;const q=p.cari||"Kantor Gubernur Papua Barat, Arfai, Manokwari";
 const embed=p.embed||("https://www.google.com/maps?q="+encodeURIComponent(q)+"&output=embed");const buka=p.link||("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q));
 return `<div class="peta"><iframe src="${escH(embed)}" title="Peta lokasi kantor Stasiun Klimatologi Papua Barat" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="petabtn" href="${escH(buka)}" target="_blank" rel="noopener">Buka di Google Maps ↗</a></div>`}
function ajakWilayah(){return `<section class="ajakwil" aria-label="Info Wilayah Saya"><div class="ajakbg" aria-hidden="true"><i></i><i></i><i></i></div>
 <span class="ctapin" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 24 24"><path d="M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z"/><circle cx="12" cy="10" r="2.6"/></svg></span>
 <div class="ajakteks"><h2>Bagaimana iklim di tempat Anda?</h2><p>Pilih kabupaten/kota Anda: hujan bulan ini, normalnya, prakiraan, musim, dan peringatan dini dalam satu halaman.</p></div>
 <div class="ajakpilih"><label class="sr-only" for="ajakKab">Pilih kabupaten/kota</label><select id="ajakKab"><option value="">Pilih kabupaten/kota…</option><optgroup label="Papua Barat">${PB7.map(k=>`<option value="${slugKab(k)}">${esc(namaKab(k))}</option>`).join("")}</optgroup><optgroup label="Papua Barat Daya">${PBD6.map(k=>`<option value="${slugKab(k)}">${esc(namaKab(k))}</option>`).join("")}</optgroup></select>
 <a class="ajakdis" href="#wilayah">atau cari per distrik →</a></div></section>`}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="ajakKab"&&e.target.value)go(e.target.value)});
function skmBintang(){return `<span class="skmwajah" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><circle class="mata" cx="17" cy="20" r="2.3"/><circle class="mata" cx="31" cy="20" r="2.3"/><path class="mulut" d="M15 29 Q24 29 33 29"><animate attributeName="d" dur="4s" repeatCount="indefinite" keyTimes="0;.25;.45;.85;1" values="M15 29 Q24 29 33 29;M15 29 Q24 29 33 29;M14 27 Q24 39 34 27;M14 27 Q24 39 34 27;M15 29 Q24 29 33 29"/></path></svg></span>`}
function skmMini(){const s=skmInfo();if(!s.aktif)return "";return `<a class="skmpanel mini" href="${escH(s.url)}" target="_blank" rel="noopener" aria-label="Isi Survei Kepuasan Masyarakat (membuka tab baru)"><span class="skmbg" aria-hidden="true"><i></i><i></i></span>${skmBintang()}<span class="skmtanya"><b>Bagaimana layanan kami?</b><small>Isi Survei Kepuasan Masyarakat. Beberapa menit, tanpa login.</small></span><em>Isi survei <span aria-hidden="true">→</span></em></a>`}
function kartuKontak(){const I=INFO();return `<div class="kontakbox"><span class="eyebrow">Kantor Pelayanan</span><h3>Stasiun Klimatologi Papua Barat</h3>
 <dl class="kv"><dt>Alamat</dt><dd>${escH(I.alamat)}</dd>
 <dt>Telepon / WA</dt><dd><a href="${waURL()}" target="_blank" rel="noopener">${escH(waTeks(I.wa))}</a></dd>
 <dt>Email</dt><dd><span id="mail">${escH(I.email)}</span> <button type="button" id="copyMail" class="mini">Salin</button></dd>
 <dt>Instagram</dt><dd><a href="${igURL()}" target="_blank" rel="noopener">@${escH(I.ig)}</a></dd>
 <dt>Jam Layanan</dt><dd>${escH(I.jam)}</dd></dl>${tombolSosial()}${skmMini()}${typeof aduanMini==="function"?aduanMini():""}</div>`}
/* ilustrasi latar banner bila tidak ada foto */
const SENI={
 panas:`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="sg" cx="78%" cy="30%" r="45%"><stop offset="0" stop-color="#ffd166" stop-opacity=".95"/><stop offset=".35" stop-color="#f4a261" stop-opacity=".55"/><stop offset="1" stop-color="#f4a261" stop-opacity="0"/></radialGradient><linearGradient id="sb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c2d12"/><stop offset=".55" stop-color="#b45309"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs><rect width="1200" height="520" fill="url(#sb)"/><rect width="1200" height="520" fill="url(#sg)"/><circle cx="936" cy="156" r="70" fill="#ffe8a3"/>${[0,1,2,3].map(i=>`<path d="M0 ${380+i*34} C 200 ${350+i*34}, 400 ${410+i*34}, 600 ${380+i*34} S 1000 ${350+i*34}, 1200 ${380+i*34}" fill="none" stroke="#fde68a" stroke-opacity="${.28-i*.05}" stroke-width="3"/>`).join("")}<path d="M0 470 L180 430 L320 452 L470 405 L640 440 L820 400 L1000 445 L1200 420 L1200 520 L0 520 Z" fill="#0b1f4d" opacity=".75"/></svg>`,
 hujan:`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2a6f"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><rect width="1200" height="520" fill="url(#hb)"/>${(g=>`<g class="hujan-turun">${g}<g transform="translate(0 -420)">${g}</g></g>`)(Array.from({length:70},(_,i)=>{const x=(i*97)%1200,y=(i*53)%420;return `<line x1="${x}" y1="${y}" x2="${x-14}" y2="${y+46}" stroke="#bae6fd" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>`}).join(""))}<ellipse cx="880" cy="120" rx="260" ry="70" fill="#e0f2fe" opacity=".18"/><ellipse cx="1010" cy="95" rx="170" ry="55" fill="#e0f2fe" opacity=".22"/><path d="M0 455 L150 380 L260 420 L420 330 L560 410 L700 360 L860 430 L1000 370 L1200 420 L1200 520 L0 520 Z" fill="#052e2b" opacity=".7"/></svg>`,
 alat:`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#001a66"/><stop offset="1" stop-color="#0133cc"/></linearGradient></defs><rect width="1200" height="520" fill="url(#ab)"/>${Array.from({length:13},(_,i)=>`<line x1="0" y1="${i*40}" x2="1200" y2="${i*40}" stroke="#93c5fd" stroke-opacity=".08"/>`).join("")}${Array.from({length:31},(_,i)=>`<line x1="${i*40}" y1="0" x2="${i*40}" y2="520" stroke="#93c5fd" stroke-opacity=".08"/>`).join("")}<g transform="translate(930 120)" stroke="#bfdbfe" fill="none" stroke-width="4" opacity=".8"><line x1="0" y1="0" x2="0" y2="330"/><line x1="-60" y1="330" x2="60" y2="330"/><line x1="0" y1="40" x2="70" y2="40"/><circle cx="80" cy="40" r="12"/><path d="M-10 70 h-60 v26 h60"/>${[1,2,3].map(r=>`<path d="M ${-30*r} ${-20*r} A ${36*r} ${36*r} 0 0 1 ${30*r} ${-20*r}" stroke-opacity="${.9-r*.2}"/>`).join("")}</g><polyline points="0,430 120,410 240,425 360,380 480,400 600,350 720,372 840,330 960,350 1080,300 1200,320" fill="none" stroke="#34d399" stroke-width="3" opacity=".7"/></svg>`};
/* ===== ilustrasi banner berlapis & beranimasi ===== */
(()=>{const awan=(x,y,s,o,c)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="90" ry="34"/><ellipse cx="-50" cy="10" rx="60" ry="26"/><ellipse cx="55" cy="8" rx="70" ry="28"/><ellipse cx="10" cy="-22" rx="55" ry="30"/></g>`;
 const gunung=(c1,c2,c3)=>`<path d="M0 410 L120 340 L230 372 L360 300 L480 360 L610 310 L760 372 L900 318 L1040 366 L1200 330 L1200 520 L0 520Z" fill="${c1}"/><path d="M0 450 L150 392 L300 430 L440 380 L600 428 L740 392 L900 440 L1060 398 L1200 432 L1200 520 L0 520Z" fill="${c2}"/><path d="M0 488 Q300 450 600 482 T1200 470 V520 H0Z" fill="${c3}"/>`;
 const hujanG=Array.from({length:90},(_,i)=>{const x=(i*83)%1240,y=(i*47)%420;return `<line x1="${x}" y1="${y}" x2="${x-12}" y2="${y+40}"/>`}).join("");
 SENI.hujan=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="s2h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071a44"/><stop offset=".55" stop-color="#123c8c"/><stop offset="1" stop-color="#0e6b78"/></linearGradient><radialGradient id="s2hg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(880 150) scale(420 260)"><stop offset="0" stop-color="#7dd3fc" stop-opacity=".32"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></radialGradient></defs>
 <rect width="1200" height="520" fill="url(#s2h)"/><rect class="aurora" width="1200" height="520" fill="url(#s2hg)"/>
 <g class="awan1">${awan(780,110,1.5,.16,"#e0f2fe")}${awan(1120,70,1.1,.12,"#e0f2fe")}</g><g class="awan2">${awan(560,170,1,.2,"#bae6fd")}${awan(980,200,1.3,.18,"#bae6fd")}</g>
 <g stroke="#bae6fd" stroke-opacity=".32" stroke-width="2" stroke-linecap="round"><g class="hujan-turun">${hujanG}<g transform="translate(0 -420)">${hujanG}</g></g></g>
 ${gunung("#0b3b5c","#082f49","#052e2b")}<g class="kabut"><ellipse cx="400" cy="420" rx="420" ry="26" fill="#e0f2fe" opacity=".08"/><ellipse cx="980" cy="440" rx="360" ry="22" fill="#e0f2fe" opacity=".07"/></g></svg>`;
 SENI.panas=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="s2p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".45" stop-color="#9a3412"/><stop offset=".8" stop-color="#f59e0b"/><stop offset="1" stop-color="#fcd34d"/></linearGradient><radialGradient id="s2ps" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(930 210) scale(300)"><stop offset="0" stop-color="#fff7d6" stop-opacity=".95"/><stop offset=".3" stop-color="#fde68a" stop-opacity=".55"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient></defs>
 <rect width="1200" height="520" fill="url(#s2p)"/><circle class="halo" cx="930" cy="210" r="300" fill="url(#s2ps)"/>
 <g class="sinar" stroke="#fff1c2" stroke-width="6" stroke-linecap="round" opacity=".55">${Array.from({length:18},(_,i)=>`<line x1="930" y1="80" x2="930" y2="40" transform="rotate(${i*20} 930 210)"/>`).join("")}</g><circle cx="930" cy="210" r="86" fill="#fff4cc"/>
 <g class="awan1">${awan(420,120,1.2,.14,"#fde68a")}</g><g class="awan2">${awan(1150,300,.9,.12,"#fed7aa")}</g>
 <g class="burung" fill="none" stroke="#2a0a02" stroke-width="3" stroke-linecap="round"><path d="M0 0 q8 -8 16 0 q8 -8 16 0"/><path d="M40 -18 q6 -6 12 0 q6 -6 12 0"/><path d="M70 10 q5 -5 10 0 q5 -5 10 0"/></g>
 ${[0,1,2,3,4].map(i=>`<path class="fatamorgana" style="animation-delay:${i*.8}s" d="M${140+i*220} 440 q18 -16 0 -32 t0 -32 t0 -32" fill="none" stroke="#fff1c2" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>`).join("")}
 ${gunung("#7c2d12","#5b1d0a","#3b0f05")}</svg>`;
 SENI.alat=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="s2a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#020b2e"/><stop offset=".6" stop-color="#0133cc"/><stop offset="1" stop-color="#0e7490"/></linearGradient><linearGradient id="s2as" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c5fd" stop-opacity="0"/><stop offset=".5" stop-color="#93c5fd" stop-opacity=".25"/><stop offset="1" stop-color="#93c5fd" stop-opacity="0"/></linearGradient></defs>
 <rect width="1200" height="520" fill="url(#s2a)"/>${Array.from({length:14},(_,i)=>`<line x1="0" y1="${i*40}" x2="1200" y2="${i*40}" stroke="#93c5fd" stroke-opacity=".07"/>`).join("")}${Array.from({length:31},(_,i)=>`<line x1="${i*40}" y1="0" x2="${i*40}" y2="520" stroke="#93c5fd" stroke-opacity=".07"/>`).join("")}
 <rect class="pindai" x="0" y="-80" width="1200" height="80" fill="url(#s2as)"/>
 <polyline class="garisdata" points="0,430 100,412 200,424 300,380 400,398 500,352 600,372 700,330 800,348 900,300 1000,318 1100,276 1200,290" fill="none" stroke="#34d399" stroke-width="3.5" stroke-linejoin="round"/>
 ${[[300,380],[500,352],[700,330],[900,300],[1100,276]].map(([x,y],i)=>`<circle class="a-kedip" style="animation-delay:${i*.4}s" cx="${x}" cy="${y}" r="6" fill="#34d399"/>`).join("")}
 <g transform="translate(940 110)" stroke="#dbeafe" fill="none" stroke-width="5" stroke-linecap="round"><line x1="0" y1="20" x2="0" y2="330"/><line x1="-70" y1="330" x2="70" y2="330"/><line x1="-34" y1="330" x2="0" y2="230"/><line x1="34" y1="330" x2="0" y2="230"/>
  <g class="a-putar" style="transform-origin:0px 20px">${[0,120,240].map(d=>`<g transform="rotate(${d} 0 20)"><line x1="0" y1="20" x2="0" y2="-12"/><circle cx="0" cy="-18" r="8" fill="#dbeafe"/></g>`).join("")}</g>
  <g class="a-ayun" style="transform-origin:0px 70px"><line x1="0" y1="70" x2="70" y2="70"/><path d="M70 58 l22 12 l-22 12z" fill="#dbeafe"/></g>
  <rect x="-60" y="140" width="48" height="34" rx="5" fill="#dbeafe" fill-opacity=".2"/>${[1,2,3].map(r=>`<path class="a-sinyal" style="animation-delay:${r*.3}s" d="M ${-26*r} ${-60-14*r} A ${30*r} ${30*r} 0 0 1 ${26*r} ${-60-14*r}" stroke-opacity=".8"/>`).join("")}</g></svg>`;
})();

/* ===== ilustrasi banner generasi 3: berlapis, parallax, cahaya, partikel =====
   Dipakai bila sumber tidak punya foto/gambar. Semua gerak memakai CSS (kelas s3-*) sehingga berhenti
   saat slide tidak tampil dan saat pengguna memilih "kurangi animasi". */
(()=>{const ac=n=>{const x=Math.sin(n*12.9898+78.233)*43758.5453;return x-Math.floor(x)};
 const ulang=(isi,lebar)=>`${isi}<g transform="translate(${lebar} 0)">${isi}</g>`;
 const awan=(x,y,s,f,o)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${f}" opacity="${o}"><circle cx="-62" cy="12" r="32"/><circle cx="-22" cy="-12" r="44"/><circle cx="28" cy="-24" r="54"/><circle cx="80" cy="-6" r="42"/><circle cx="118" cy="12" r="30"/><rect x="-94" y="10" width="244" height="38" rx="19"/></g>`;
 const hujanLapis=(n,pj,tb,op,seed)=>{const g=Array.from({length:n},(_,i)=>{const x=Math.round(-150+ac(seed+i)*1500),y=Math.round(ac(seed+i+500)*520);return `<line x1="${x}" y1="${y}" x2="${(x-pj*.28).toFixed(1)}" y2="${y+pj}"/>`}).join("");
  return `<g stroke="#cfe8ff" stroke-opacity="${op}" stroke-width="${tb}" stroke-linecap="round">${g}<g transform="translate(145.6 -520)">${g}</g></g>`};

 /* ---------- HUJAN: malam berhujan di atas Pegunungan Arfak ---------- */
 SENI.hujan=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
 <linearGradient id="h3l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040b26"/><stop offset=".45" stop-color="#0c2a68"/><stop offset=".78" stop-color="#11517c"/><stop offset="1" stop-color="#0f6b74"/></linearGradient>
 <radialGradient id="h3g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 120) scale(520 300)"><stop offset="0" stop-color="#93c5fd" stop-opacity=".42"/><stop offset="1" stop-color="#93c5fd" stop-opacity="0"/></radialGradient>
 <linearGradient id="h3c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#6d8fc4"/></linearGradient>
 <linearGradient id="h3m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f4b7a"/><stop offset="1" stop-color="#123358"/></linearGradient>
 <linearGradient id="h3m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f2f52"/><stop offset="1" stop-color="#0a2340"/></linearGradient>
 <linearGradient id="h3w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d4a63"/><stop offset="1" stop-color="#041c2b"/></linearGradient>
 <radialGradient id="h3k"><stop offset="0" stop-color="#e0f2fe" stop-opacity=".5"/><stop offset="1" stop-color="#e0f2fe" stop-opacity="0"/></radialGradient></defs>
 <rect width="1200" height="520" fill="url(#h3l)"/><rect class="s3-napas" width="1200" height="520" fill="url(#h3g)"/>
 <rect class="s3-kilat" width="1200" height="520" fill="#dbeafe"/>
 <g class="s3-petir" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M905 70 l-34 78 h26 l-40 92 l14 -4" stroke="#bfdbfe" stroke-width="10" stroke-opacity=".25"/><path d="M905 70 l-34 78 h26 l-40 92 l14 -4" stroke="#f8fafc" stroke-width="3"/></g>
 <g class="s3-geser" style="--d:90s">${ulang(awan(160,70,1.2,"url(#h3c)",.1)+awan(560,40,1,"url(#h3c)",.09)+awan(960,90,1.4,"url(#h3c)",.1),1200)}</g>
 <g class="s3-geser" style="--d:55s">${ulang(awan(80,150,1,"url(#h3c)",.16)+awan(470,130,1.3,"url(#h3c)",.14)+awan(860,165,1.1,"url(#h3c)",.18),1200)}</g>
 <g class="s3-geser" style="--d:34s">${ulang(awan(300,215,1.5,"#1e3a6b",.55)+awan(820,200,1.7,"#1a3461",.6),1200)}</g>
 <g class="s3-jatuh" style="--d:1.3s">${hujanLapis(80,20,1.1,.2,1)}</g>
 <path d="M0 360 L90 330 L170 344 L260 296 L360 322 L450 284 L560 318 L660 270 L760 312 L870 280 L980 318 L1090 290 L1200 312 L1200 520 L0 520Z" fill="url(#h3m1)" opacity=".85"/>
 <g class="s3-geser" style="--d:70s">${ulang(`<ellipse cx="300" cy="340" rx="330" ry="26" fill="url(#h3k)"/><ellipse cx="900" cy="350" rx="300" ry="22" fill="url(#h3k)"/>`,1200)}</g>
 <g class="s3-jatuh" style="--d:.95s">${hujanLapis(55,34,1.7,.3,200)}</g>
 <path d="M0 418 L120 380 L230 402 L350 360 L470 398 L600 368 L720 404 L850 372 L980 410 L1100 382 L1200 400 L1200 520 L0 520Z" fill="url(#h3m2)"/>
 <rect y="458" width="1200" height="62" fill="url(#h3w)"/>
 ${Array.from({length:7},(_,i)=>`<line x1="${80+i*170}" y1="${470+(i%3)*14}" x2="${150+i*170}" y2="${470+(i%3)*14}" stroke="#7dd3fc" stroke-opacity=".18" stroke-width="2"/>`).join("")}
 ${Array.from({length:10},(_,i)=>`<ellipse class="s3-riak" style="animation-delay:${(i*.37).toFixed(2)}s" cx="${Math.round(60+ac(i+900)*1080)}" cy="${Math.round(472+ac(i+950)*40)}" rx="16" ry="3.5" fill="none" stroke="#bae6fd" stroke-width="1.6"/>`).join("")}
 <g class="s3-jatuh" style="--d:.6s">${hujanLapis(22,62,2.6,.42,400)}</g></svg>`;

 /* ---------- PANAS / KERING: matahari terik, fatamorgana, tanah retak ---------- */
 const retak="M40 488 l60 -8 l40 14 l70 -6 M140 494 l20 18 M210 488 l50 10 l60 -12 l50 8 M320 486 l10 24 M370 494 l80 -4 l40 12 l90 -10 M460 490 l-12 22 M580 492 l70 6 l50 -12 l80 4 M700 486 l14 26 M780 490 l70 -8 l60 14 l80 -6 M920 488 l-10 24 M990 496 l90 -10 l80 8 M1080 486 l16 26";
 SENI.panas=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
 <linearGradient id="p3l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c30"/><stop offset=".36" stop-color="#5a1a33"/><stop offset=".62" stop-color="#b3401b"/><stop offset=".82" stop-color="#ee8a22"/><stop offset="1" stop-color="#fcd34d"/></linearGradient>
 <radialGradient id="p3k" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 250) scale(330)"><stop offset="0" stop-color="#fff7d6" stop-opacity=".95"/><stop offset=".28" stop-color="#fde68a" stop-opacity=".6"/><stop offset=".6" stop-color="#fb923c" stop-opacity=".22"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
 <radialGradient id="p3m"><stop offset="0" stop-color="#fffdf2"/><stop offset=".7" stop-color="#fff1b8"/><stop offset="1" stop-color="#fde68a"/></radialGradient>
 <linearGradient id="p3t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c210b"/><stop offset="1" stop-color="#260b03"/></linearGradient></defs>
 <rect width="1200" height="520" fill="url(#p3l)"/>
 <circle class="s3-denyut" cx="900" cy="250" r="330" fill="url(#p3k)"/>
 <g class="s3-putar" style="--d:150s;transform-origin:900px 250px" fill="#fff4c9" opacity=".13">${Array.from({length:18},(_,i)=>`<path d="M900 250 L${(900+Math.sin((i*20-2.2)*Math.PI/180)*360).toFixed(1)} ${(250-Math.cos((i*20-2.2)*Math.PI/180)*360).toFixed(1)} L${(900+Math.sin((i*20+2.2)*Math.PI/180)*360).toFixed(1)} ${(250-Math.cos((i*20+2.2)*Math.PI/180)*360).toFixed(1)}Z"/>`).join("")}</g>
 <circle cx="900" cy="250" r="86" fill="url(#p3m)"/><circle class="s3-cincin" cx="900" cy="250" r="96" fill="none" stroke="#fff7d6" stroke-width="2"/>
 <g class="s3-geser" style="--d:80s">${ulang(`<ellipse cx="200" cy="150" rx="210" ry="9" fill="#fed7aa" opacity=".16"/><ellipse cx="640" cy="118" rx="260" ry="7" fill="#fdba74" opacity=".14"/><ellipse cx="1020" cy="170" rx="180" ry="8" fill="#fed7aa" opacity=".12"/>`,1200)}</g>
 <g class="s3-terbang"><g fill="none" stroke="#2a0a02" stroke-width="3" stroke-linecap="round"><path class="s3-kepak" d="M0 0 q10 -10 20 0 q10 -10 20 0"/><path class="s3-kepak" style="animation-delay:.25s" d="M48 -20 q8 -8 16 0 q8 -8 16 0"/><path class="s3-kepak" style="animation-delay:.5s" d="M86 6 q6 -6 12 0 q6 -6 12 0"/></g></g>
 <path d="M0 380 L110 340 L210 360 L330 318 L440 350 L560 312 L690 352 L800 322 L930 356 L1050 330 L1200 352 L1200 520 L0 520Z" fill="#8a3414" opacity=".55"/>
 <path d="M0 430 L140 396 L270 418 L400 384 L540 414 L680 390 L820 420 L960 392 L1100 416 L1200 404 L1200 520 L0 520Z" fill="#5e200d"/>
 ${[0,1,2,3,4].map(i=>`<path class="s3-fatamorgana" style="animation-delay:${i*1.1}s" d="M${-40+i*40} ${436+i*7} q60 -8 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" fill="none" stroke="#fde68a" stroke-opacity=".28" stroke-width="2"/>`).join("")}
 <rect y="468" width="1200" height="52" fill="url(#p3t)"/>
 <path class="s3-retak" d="${retak}" fill="none" stroke="#f59e0b" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>
 ${Array.from({length:9},(_,i)=>{const x=60+i*135+Math.round(ac(i+70)*40);return `<g class="s3-ayun" style="animation-delay:${(i*.4).toFixed(1)}s" stroke="#a16207" stroke-width="2" stroke-linecap="round" fill="none"><path d="M${x} 470 q-4 -14 -10 -20 M${x} 470 q0 -16 2 -24 M${x} 470 q5 -12 12 -16"/></g>`}).join("")}
 ${Array.from({length:22},(_,i)=>`<circle class="s3-debu" style="animation-delay:${(ac(i+30)*8).toFixed(2)}s;--dx:${Math.round(40+ac(i+60)*90)}px" cx="${Math.round(ac(i+10)*1200)}" cy="${Math.round(380+ac(i+20)*110)}" r="${(1.2+ac(i+40)*2).toFixed(1)}" fill="#fde68a"/>`).join("")}</svg>`;

 /* ---------- ALAT: jaringan AWS/ARG mengirim data ke kantor ---------- */
 const simpul=[[120,250],[210,330],[300,220],[380,300],[450,380],[520,250],[600,330],[640,200],[700,410],[760,280],[820,360],[540,430],[300,420]];
 const T=[1000,326];
 SENI.alat=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
 <linearGradient id="a3l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".5" stop-color="#071d4f"/><stop offset="1" stop-color="#0b4a6a"/></linearGradient>
 <radialGradient id="a3g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1000 260) scale(420 320)"><stop offset="0" stop-color="#38bdf8" stop-opacity=".35"/><stop offset="1" stop-color="#38bdf8" stop-opacity="0"/></radialGradient>
 <linearGradient id="a3d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34d399" stop-opacity=".35"/><stop offset="1" stop-color="#34d399" stop-opacity="0"/></linearGradient>
 <linearGradient id="a3s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c5fd" stop-opacity="0"/><stop offset=".5" stop-color="#93c5fd" stop-opacity=".18"/><stop offset="1" stop-color="#93c5fd" stop-opacity="0"/></linearGradient></defs>
 <rect width="1200" height="520" fill="url(#a3l)"/><rect class="s3-napas" width="1200" height="520" fill="url(#a3g)"/>
 <g class="s3-geser" style="--d:60s" fill="none" stroke="#60a5fa" stroke-opacity=".09" stroke-width="1.5">${ulang(Array.from({length:6},(_,i)=>`<path d="M0 ${60+i*34} q150 ${-20+i*4} 300 0 t300 0 t300 0 t300 0"/>`).join(""),1200)}</g>
 <g stroke="#60a5fa" stroke-opacity=".12">${Array.from({length:23},(_,i)=>`<line x1="${820}" y1="300" x2="${-1400+i*190}" y2="520"/>`).join("")}${[306,316,330,350,376,410,456,514].map((y,i)=>`<line class="s3-lantai" style="animation-delay:${i*.28}s" x1="0" y1="${y}" x2="1200" y2="${y}"/>`).join("")}</g>
 <rect class="s3-pindai" x="0" y="-90" width="1200" height="90" fill="url(#a3s)"/>
 <path d="M0 210 L100 196 L200 214 L300 176 L400 190 L500 150 L600 168 L700 128 L800 146 L900 110 L1000 124 L1100 92 L1200 104 L1200 520 L0 520Z" fill="url(#a3d)" opacity=".35"/>
 <polyline class="s3-garis" points="0,210 100,196 200,214 300,176 400,190 500,150 600,168 700,128 800,146 900,110 1000,124 1100,92 1200,104" fill="none" stroke="#34d399" stroke-width="3" stroke-linejoin="round"/>
 ${simpul.map(([x,y],i)=>`<path class="s3-alir" style="animation-delay:${(i*.17).toFixed(2)}s" d="M${x} ${y} Q${Math.round((x+T[0])/2)} ${Math.min(y,T[1])-60} ${T[0]} ${T[1]}" fill="none" stroke="#7dd3fc" stroke-opacity=".45" stroke-width="1.6" stroke-dasharray="5 11"/>`).join("")}
 ${simpul.map(([x,y],i)=>`<g><circle class="s3-ping" style="animation-delay:${(i*.31).toFixed(2)}s" cx="${x}" cy="${y}" r="6" fill="none" stroke="#34d399" stroke-width="2"/><circle cx="${x}" cy="${y}" r="5" fill="#34d399"/><circle cx="${x}" cy="${y}" r="2" fill="#ecfdf5"/></g>`).join("")}
 <g transform="translate(1000 26)" stroke="#e0ecff" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="0" y1="110" x2="0" y2="470"/><line x1="-70" y1="470" x2="70" y2="470"/><line x1="-40" y1="470" x2="0" y2="380"/><line x1="40" y1="470" x2="0" y2="380"/>
  <g class="s3-putar" style="--d:3.2s;transform-origin:0px 104px">${[0,120,240].map(d=>`<g transform="rotate(${d} 0 104)"><line x1="0" y1="104" x2="0" y2="74"/><circle cx="0" cy="66" r="9" fill="#e0ecff"/></g>`).join("")}</g>
  <g class="s3-baling" style="transform-origin:0px 160px"><line x1="0" y1="160" x2="78" y2="160"/><path d="M78 146 l26 14 l-26 14z" fill="#e0ecff"/></g>
  <g transform="rotate(-22 -60 250)"><rect x="-110" y="236" width="76" height="44" rx="4" fill="#1e3a8a" fill-opacity=".85" stroke-width="3"/><path d="M-91 236 v44 M-72 236 v44 M-53 236 v44 M-110 258 h76" stroke-width="1.5" stroke-opacity=".6"/></g>
  <rect x="-34" y="300" width="68" height="52" rx="7" fill="#0f2a5f" stroke-width="3.5"/><circle class="s3-led" cx="-16" cy="318" r="5" fill="#34d399" stroke="none"/><circle class="s3-led" style="animation-delay:.6s" cx="0" cy="318" r="5" fill="#38bdf8" stroke="none"/><path d="M-20 336 h40" stroke-width="2.5" stroke-opacity=".6"/>
  ${[1,2,3].map(r=>`<path class="s3-sinyal" style="animation-delay:${r*.35}s" d="M${-26*r} ${40-14*r} A${30*r} ${30*r} 0 0 1 ${26*r} ${40-14*r}" stroke-width="4"/>`).join("")}</g></svg>`;

 /* ---------- ENSO: Samudra Pasifik menghangat di timur (El Niño) ---------- */
 const ombak=(y,a,op,cls,d)=>`<g class="${cls}" style="--d:${d}"><path d="M0 ${y} ${Array.from({length:20},(_,i)=>`q60 ${i%2?a:-a} 120 0`).join(" ")} V520 H0Z" fill="#fff" fill-opacity="${op}"/></g>`;
 SENI.enso=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
 <linearGradient id="e3l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1238"/><stop offset=".45" stop-color="#2d1f5e"/><stop offset=".75" stop-color="#8a3b3b"/><stop offset=".9" stop-color="#e2832d"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
 <radialGradient id="e3k" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(930 318) scale(320 220)"><stop offset="0" stop-color="#fff1c2" stop-opacity=".9"/><stop offset=".35" stop-color="#fdba74" stop-opacity=".45"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
 <linearGradient id="e3o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b4f74"/><stop offset=".4" stop-color="#1e3a8a"/><stop offset=".62" stop-color="#7f1d1d"/><stop offset=".85" stop-color="#c2410c"/><stop offset="1" stop-color="#f97316"/></linearGradient>
 <linearGradient id="e3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617" stop-opacity="0"/><stop offset="1" stop-color="#020617" stop-opacity=".65"/></linearGradient>
 <radialGradient id="e3n"><stop offset="0" stop-color="#ef4444" stop-opacity=".75"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></radialGradient></defs>
 <rect width="1200" height="520" fill="url(#e3l)"/>
 ${Array.from({length:40},(_,i)=>`<circle class="s3-bintang" style="animation-delay:${(ac(i+5)*4).toFixed(2)}s" cx="${Math.round(ac(i+1)*1200)}" cy="${Math.round(ac(i+2)*170)}" r="${(.6+ac(i+3)*1.3).toFixed(1)}" fill="#fff"/>`).join("")}
 <g class="s3-geser" style="--d:110s">${ulang(`<ellipse cx="260" cy="210" rx="240" ry="12" fill="#f9a8d4" opacity=".14"/><ellipse cx="760" cy="240" rx="300" ry="10" fill="#fdba74" opacity=".16"/><ellipse cx="1080" cy="190" rx="160" ry="9" fill="#f9a8d4" opacity=".12"/>`,1200)}</g>
 <circle class="s3-denyut" cx="930" cy="318" r="300" fill="url(#e3k)"/><circle cx="930" cy="322" r="70" fill="#ffe8a3"/>
 <rect y="322" width="1200" height="198" fill="url(#e3o)"/>
 ${ombak(338,5,.05,"s3-geser","26s")}${ombak(372,7,.06,"s3-geser","19s")}${ombak(420,9,.07,"s3-geser","14s")}
 ${Array.from({length:9},(_,i)=>`<rect class="s3-kilau" style="animation-delay:${(i*.3).toFixed(1)}s" x="${930-60+((i*37)%50)-(i%2?20:0)}" y="${334+i*18}" width="${120-i*8}" height="3" rx="1.5" fill="#fde68a"/>`).join("")}
 <circle class="s3-denyut" style="--d:4s" cx="830" cy="384" r="150" fill="url(#e3n)"/>
 <rect x="650" y="356" width="360" height="58" rx="4" fill="none" stroke="#fde68a" stroke-width="2.5" stroke-dasharray="10 7" class="s3-kotak"/>
 <text x="656" y="347" font-family="DM Sans,system-ui,sans-serif" font-size="16" font-weight="800" fill="#fde68a" letter-spacing="1">NIÑO 3.4</text>
 ${Array.from({length:8},(_,i)=>`<text class="s3-plus" style="animation-delay:${(i*.55).toFixed(2)}s" x="${676+i*42}" y="${404-(i%3)*10}" font-family="DM Sans,system-ui,sans-serif" font-size="18" font-weight="800" fill="#fecaca">+</text>`).join("")}
 <rect y="322" width="1200" height="198" fill="url(#e3g)"/>
 ${ombak(470,10,.08,"s3-geser","10s")}</svg>`;
})();

let SLIDE=0,SLIDE_T=null;
/* WCAG 2.2.2: animasi yang berjalan lebih dari 5 detik harus bisa dihentikan. Pilihan disimpan di perangkat. */
function tombolDiam(){return ""}
try{localStorage.removeItem("diam")}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-diam]");if(!b)return;const d=document.documentElement.classList.toggle("diam");try{localStorage.setItem("diam",d?"1":"0")}catch(x){}
 document.querySelectorAll("[data-diam]").forEach(x=>{x.setAttribute("aria-pressed",String(d));x.textContent=d?"▶ Jalankan animasi":"⏸ Hentikan animasi"})});
const PK_IKON=`<div class="pk-suar" aria-hidden="true"><svg class="c-luar" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="12 8 3 8"/><circle cx="100" cy="6" r="4" fill="var(--lv)"/><circle cx="100" cy="194" r="4" fill="var(--lv)"/><circle cx="6" cy="100" r="2.5" fill="currentColor" fill-opacity=".5"/><circle cx="194" cy="100" r="2.5" fill="currentColor" fill-opacity=".5"/></svg><svg class="c-dalam" viewBox="0 0 160 160"><circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" stroke-opacity=".22"/><circle cx="80" cy="80" r="74" fill="none" stroke="var(--lv)" stroke-width="3" stroke-dasharray="70 395" stroke-linecap="round"/></svg><span class="radar"></span><span class="gel"></span><span class="gel"></span><div class="inti"><svg viewBox="0 0 100 90"><defs><linearGradient id="pkSeg" x1="50" y1="4" x2="50" y2="82" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:var(--lv2)"/><stop offset="1" style="stop-color:var(--lv)"/></linearGradient></defs><path d="M44.8 6.5C47.1 2.5 52.9 2.5 55.2 6.5L93.5 73C95.8 77 92.9 82 88.3 82H11.7C7.1 82 4.2 77 6.5 73Z" fill="url(#pkSeg)" stroke="#090d16" stroke-width="4.5"/><rect x="46.5" y="28" width="7" height="28" rx="3.5" fill="#090d16"/><circle cx="50" cy="66" r="4.5" fill="#090d16"/></svg></div></div>`;
function heroSlider(){const B=daftarBanner().map(b=>!b.gambar&&b.luar&&/^https?:\/\//.test(b.link||"")&&!/\.pdf($|\?)/i.test(b.link)&&!/bmkg\.go\.id|workers\.dev\/file/.test(b.link)?{...b,og:b.link}:b);
 /* gambar dari sumber: foto (berita) dipasang penuh; gambar data/peta/dokumen dipasang sebagai "figur" berbingkai dengan latar buram dari gambar yang sama */
 const latar=(b,i)=>{const sn=b.seni||"hujan";if(!b.gambar&&b.status&&sn==="awasHujan")return `<div class="hsbg"><canvas class="pkanvas" aria-hidden="true"></canvas></div><div class="hsshade"></div>`;if(!b.gambar)return `<div class="hsbg">${SENI[sn]||SENI.alat}</div><div class="hsshade"></div>`;const g=escH(b.gambar),ld=i?"lazy":"eager";
  if(!b.figur)return `<div class="hsbg"><img src="${g}" alt="" loading="${ld}" referrerpolicy="no-referrer" data-galat="banner"></div><div class="hsshade"></div>`;
  return `<div class="hsbg"><img class="figbg" src="${g}" alt="" loading="${ld}" referrerpolicy="no-referrer" data-galat="banner"></div><div class="hsshade"></div><figure class="hsfig"><div class="fgin"><img src="${g}" alt="${b.keterangan?"":escH(b.judul||"")}" loading="${ld}" referrerpolicy="no-referrer" data-galat="banner">${b.keterangan?`<figcaption>${escH(b.keterangan)}</figcaption>`:""}</div></figure>`};
 const adaAwas=B.some(b=>b.status);return `<section data-sunting="isiberanda|#ldBanner" class="hslider bleed awal" aria-roledescription="carousel" aria-label="Sorotan">${adaAwas?tombolDiam():""}${B.map((b,i)=>`<div class="hs${i===0?" on":""}${b.status?" st-"+b.status+" perbaru"+(!b.gambar&&(b.seni||"")==="awasHujan"?" perkanvas":""):""}${b.gambar&&b.figur?" adafig":""}${b.gambar&&!b.figur?" adafoto":""}" data-i="${i}" data-seni="${escH(b.seni||"hujan")}"${b.og?` data-og="${escH(b.og)}"`:""} aria-hidden="${i?"true":"false"}"${i?" inert":""}>
  ${latar(b,i)}${b.status?PK_IKON:""}${b.sumber?`<span class="hssumber">${b.sumber}</span>`:""}
  <div class="wrap hscontent"><span class="hslabel">${b.label||""}</span><h2 class="hsj${String(b.judul||"").replace(/<[^>]+>/g,"").length>52?" hjp":""}">${b.judul}</h2><p>${b.teks||""}</p>${b.tingkat?`<div class="pkbar" aria-label="Tingkat peringatan ${b.tingkat} dari 3"><span>Tingkat peringatan (${b.tingkat}/3):</span>${[1,2,3].map(n=>`<i${n<=b.tingkat?' class="on"':""}></i>`).join("")}</div>`:""}${b.tombol?`<a class="hsbtn" href="${escH(b.link||"#beranda")}"${b.luar?' target="_blank" rel="noopener"':""}>${b.tombol} ${b.luar?"↗":"→"}</a>`:""}</div></div>`).join("")}
  ${B.length>1?`<div class="wrap hsnav"><div class="hsdots">${B.map((_,i)=>`<button type="button" class="${i?"":"on"}" data-go="${i}" aria-label="Sorotan ${i+1}"></button>`).join("")}</div><div class="hsarr"><button type="button" data-step="-1" aria-label="Sebelumnya">‹</button><button type="button" data-step="1" aria-label="Berikutnya">›</button></div></div>`:""}</section>`}
/* gambar gagal dimuat: kembali ke ilustrasi animasi */
function gagalBanner(im){const hs=im.closest(".hs");if(!hs||hs.dataset.gagal)return;hs.dataset.gagal=1;const bg=hs.querySelector(".hsbg");if(bg)bg.innerHTML=SENI[hs.dataset.seni]||SENI.hujan;const f=hs.querySelector(".hsfig");if(f)f.remove();hs.classList.remove("adafig","adafoto")}
function geserSlide(n){{const sl=document.querySelector(".hslider.awal");if(sl&&n!==SLIDE)sl.classList.remove("awal")}const s=[...document.querySelectorAll(".hs")];if(!s.length)return;SLIDE=(n+s.length)%s.length;
 s.forEach((el,i)=>{el.classList.toggle("on",i===SLIDE);el.setAttribute("aria-hidden",i===SLIDE?"false":"true");el.inert=i!==SLIDE});
 document.querySelectorAll(".hsdots button").forEach((d,i)=>d.classList.toggle("on",i===SLIDE))}
const OG_CACHE={};
function ambilOG(u){if(!DATA_URL||!u)return Promise.resolve("");if(OG_CACHE[u])return OG_CACHE[u];
 let simpan={};try{simpan=JSON.parse(localStorage.getItem("og_v2")||"{}")}catch(e){}
 const c=simpan[u];if(c&&(c.g||Date.now()-c.t<864e5))return OG_CACHE[u]=Promise.resolve(c.g);
 const base=DATA_URL.replace(/\/terkini$/,"");
 return OG_CACHE[u]=fetch(base+"/og?url="+encodeURIComponent(u)).then(r=>r.ok?r.json():Promise.reject(r.status)).then(j=>{const g=(j&&j.gambar)||"";
  try{const s2=JSON.parse(localStorage.getItem("og_v2")||"{}");s2[u]={g,t:Date.now()};const ks=Object.keys(s2);if(ks.length>150)ks.slice(0,ks.length-150).forEach(k=>delete s2[k]);localStorage.setItem("og_v2",JSON.stringify(s2))}catch(e){}return g})
  .catch(()=>{delete OG_CACHE[u];return ""})}
function isiGambarBanner(){document.querySelectorAll(".hs[data-og]").forEach(el=>{const u=el.dataset.og;el.removeAttribute("data-og");
  ambilOG(u).then(g=>{if(!g)return;const im=new Image();im.alt="";im.referrerPolicy="no-referrer";im.className="ogimg";im.onload=()=>{const bg=el.querySelector(".hsbg");if(!bg)return;bg.appendChild(im);el.classList.add("adafoto");requestAnimationFrame(()=>im.classList.add("tampil"))};im.src=g})})}
function mulaiSlider(){clearInterval(SLIDE_T);SLIDE=0;const el=document.querySelector(".hslider");if(!el)return;isiGambarBanner();
 el.onclick=e=>{const b=e.target.closest("[data-go],[data-step]");if(!b)return;geserSlide(b.dataset.go!==undefined?+b.dataset.go:SLIDE+ +b.dataset.step);mulaiOtomatis()};
 const mulaiOtomatis=()=>{clearInterval(SLIDE_T);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)SLIDE_T=setInterval(()=>{if(cur==="beranda")geserSlide(SLIDE+1);else clearInterval(SLIDE_T)},7000)};
 el.onmouseenter=()=>clearInterval(SLIDE_T);el.onmouseleave=mulaiOtomatis;
 /* geser jari di ponsel */
 let x0=null,y0=0;el.ontouchstart=e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY;clearInterval(SLIDE_T)};
 el.ontouchend=e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)geserSlide(SLIDE+(dx<0?1:-1));mulaiOtomatis()};
 mulaiOtomatis()}
/* ===== Beranda: kartu Produk Iklim bergaya fitur (ilustrasi data beranimasi + fakta terkini) ===== */
const AWAL_MH=[["Okt 2026",6],["Nov 2026",2],["Des 2026",2],["Mar 2027",1]];
const PF_SC=isi=>`<svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${isi}</svg>`;
const pfAwan=(x,y,s,o)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity="${o}"><circle cx="-14" cy="4" r="11"/><circle cx="2" cy="-4" r="15"/><circle cx="20" cy="2" r="12"/><rect x="-25" y="2" width="56" height="13" rx="6.5"/></g>`;
const PF_VIZ={
 musim(){try{terapkanPMHU()}catch(e){}const S=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],NMB=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
  const ks=Object.values(ZOM_PMH).map(v=>{const m=String(v[0]||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(?:\s+I{1,3})?\s+(\d{4})/i);return m?+m[2]*12+NMB.indexOf(m[1].toLowerCase()):null}).filter(x=>x!=null);
  const k0=ks.length?Math.min(...ks):2026*12+9,bln=[0,1,2,3,4,5].map(i=>S[(k0+i)%12]),n=[0,0,0,0,0,0];let lebih=false;ks.forEach(k=>{const i=k-k0;if(i<5)n[i]++;else{n[5]++;if(i>5)lebih=true}});if(lebih)bln[5]+="+";const mx=Math.max(...n,1),im=n.indexOf(mx);
  return PF_SC(`<path d="M0 122 Q80 108 160 120 T320 116 V150 H0Z" fill="#fff" opacity=".08"/>
  <g class="pf-awan" style="--d:9s">${pfAwan(250,34,1,.22)}</g>
  ${n.map((v,i)=>{const h=10+v/mx*78,x=38+i*46;return `<rect class="pf-batang" style="--i:${i}" x="${x}" y="${122-h}" width="28" height="${h}" rx="6" fill="#fff" fill-opacity="${v?(i===im?.95:.6):.18}"/><text x="${x+14}" y="140" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" fill-opacity=".8">${bln[i]}</text>${v?`<text class="pf-muncul" style="--i:${i}" x="${x+14}" y="${114-h}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">${v}</text>`:""}`}).join("")}
  <g class="pf-awan" style="--d:9s">${[0,1,2].map(i=>`<line class="pf-tetes" style="animation-delay:${i*.45}s" x1="${240+i*9}" y1="52" x2="${237+i*9}" y2="60" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`).join("")}</g>`)},
 hujan(){const p=(typeof POLA_HUJAN!=="undefined"&&POLA_HUJAN[0])||{v:[295,275,290,285,240,215,212,175,190,240,272,312]},b=new Date(Date.now()+9*3600e3).getUTCMonth();
  return PF_SC(`${[40,70,100].map(y=>`<line x1="16" y1="${y}" x2="304" y2="${y}" stroke="#fff" stroke-opacity=".1"/>`).join("")}
  ${p.v.map((v,i)=>{const h=v/400*92,x=18+i*24;return `<rect class="pf-batang" style="--i:${i}" x="${x}" y="${128-h}" width="16" height="${h}" rx="4" fill="${i===b?"#fde68a":"#fff"}" fill-opacity="${i===b?1:.55}"/>`}).join("")}
  <g class="pf-awan" style="--d:7s">${pfAwan(70,26,1.05,.85)}${[0,1,2,3].map(i=>`<line class="pf-tetes" style="animation-delay:${i*.32}s" x1="${58+i*9}" y1="44" x2="${55+i*9}" y2="52" stroke="#e0f2fe" stroke-width="2.5" stroke-linecap="round"/>`).join("")}</g>
  <text x="304" y="144" text-anchor="end" font-size="10" font-weight="700" fill="#fff" fill-opacity=".75">rata-rata bulanan (mm)</text>`)},
 hth(){return PF_SC(`<circle class="s3-denyut" style="--d:4s" cx="262" cy="46" r="40" fill="#fde68a" opacity=".25"/>
  <g class="s3-putar" style="--d:24s;transform-origin:262px 46px">${Array.from({length:12},(_,i)=>`<line x1="262" y1="10" x2="262" y2="18" stroke="#fff7d6" stroke-width="3" stroke-linecap="round" transform="rotate(${i*30} 262 46)"/>`).join("")}</g><circle cx="262" cy="46" r="20" fill="#fff7d6"/>
  ${Array.from({length:10},(_,i)=>`<rect class="pf-hari" style="animation-delay:${(i*.22).toFixed(2)}s" x="${18+i*24}" y="86" width="19" height="19" rx="5" fill="#fff"/>`).join("")}
  <text x="18" y="76" font-size="11" font-weight="800" fill="#fff" fill-opacity=".85">hari berturut-turut tanpa hujan</text>
  <path d="M0 128 h320" stroke="#fff" stroke-opacity=".25" stroke-width="2"/><path class="pf-retak" d="M30 128 l10 10 l12 -4 M110 128 l-6 12 l10 6 M190 128 l8 9 l14 -3 M262 128 l-8 11" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>`)},
 enso(){const e=EN(),v=Math.max(-3,Math.min(3,e.enso||0)),cx=160,cy=118,r=74,A=x=>x/3*90*Math.PI/180,P=x=>[cx+r*Math.sin(A(x)),cy-r*Math.cos(A(x))];
  const seg=[[-3,-1.5,"#93c5fd"],[-1.5,-.5,"#bfdbfe"],[-.5,.5,"#e2e8f0"],[.5,1.5,"#fed7aa"],[1.5,3,"#fca5a5"]].map(([a,b,c])=>{const p=P(a),q=P(b);return `<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)} A${r} ${r} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}" stroke="${c}" stroke-width="12" fill="none"/>`}).join("");
  return PF_SC(`<g class="pf-ombak">${[0,1].map(k=>`<path d="M${-80+k*0} ${136-k*8} ${Array.from({length:6},(_,i)=>`q20 ${i%2?5:-5} 40 0 q20 ${i%2?-5:5} 40 0`).join(" ")} V150 H-80Z" fill="#fff" opacity="${.07+k*.05}"/>`).join("")}</g>${seg}
  <g class="pf-jarum" style="--sudut:${(v/3*90).toFixed(1)}deg;transform-origin:${cx}px ${cy}px"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-r+12}" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g><circle cx="${cx}" cy="${cy}" r="8" fill="#fff"/>
  <text x="${cx-r-6}" y="${cy+16}" font-size="10" font-weight="800" fill="#fff" fill-opacity=".8" text-anchor="middle">La Niña</text><text x="${cx+r+6}" y="${cy+16}" font-size="10" font-weight="800" fill="#fff" fill-opacity=".8" text-anchor="middle">El Niño</text>
  <text x="${cx}" y="${cy-28}" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">${fmtV(e.enso)}</text>`)},
 spi(x){const v=x.angka!=null&&x.angka!==""&&!isNaN(+x.angka)?+x.angka:SPI_NILAI(x.nilai||""),c=Math.max(-2.5,Math.min(2.5,v)),px=26+(c+2.5)/5*268;const W=["#ef4444","#fb923c","#fde047","#4ade80","#38bdf8"];
  return PF_SC(`<circle class="s3-denyut" style="--d:5s" cx="276" cy="30" r="16" fill="#fde68a" opacity=".85"/>
  ${W.map((w,i)=>`<rect x="${26+i*53.6}" y="66" width="53.6" height="16" fill="${w}"${i===0?' rx="5"':i===4?' rx="5"':""}/>`).join("")}
  <g class="pf-penanda" style="--x:${(px-26).toFixed(1)}px"><path d="M26 60 l-8 -13 h16z" fill="#fff"/><line x1="26" y1="60" x2="26" y2="88" stroke="#fff" stroke-width="2.5"/></g>
  <text x="26" y="104" font-size="10.5" font-weight="800" fill="#fff" fill-opacity=".85">sangat kering</text><text x="294" y="104" text-anchor="end" font-size="10.5" font-weight="800" fill="#fff" fill-opacity=".85">sangat basah</text>
  <path class="pf-retak" d="M0 136 h60 l10 -6 l16 8 h40 l8 -5 l14 7 h60 l12 -6 l12 6 h88" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`)},
 zona(){const n=typeof ZOM11!=="undefined"?ZOM11.length:11;return PF_SC(`${Array.from({length:21},(_,i)=>{const c=i%7,r=Math.floor(i/7),x=58+c*34,y=34+r*30,z=i<n;return `<circle class="pf-pop" style="--i:${i}" cx="${x}" cy="${y}" r="10" fill="${z?"#fff":"none"}" fill-opacity=".92" stroke="#fff" stroke-opacity="${z?0:.75}" stroke-width="2.5"/>`}).join("")}
  <g class="pf-lompat"><path d="M286 24 c-10 0 -16 7 -16 15 c0 11 16 25 16 25 s16 -14 16 -25 c0 -8 -6 -15 -16 -15z" fill="#fde68a"/><circle cx="286" cy="39" r="5" fill="#6d28d9"/></g>
  <circle cx="58" cy="132" r="5" fill="#fff"/><text x="68" y="136" font-size="11" font-weight="800" fill="#fff">${n} ZOM</text><circle cx="140" cy="132" r="5" fill="none" stroke="#fff" stroke-width="2"/><text x="150" y="136" font-size="11" font-weight="800" fill="#fff" fill-opacity=".85">${21-n} Non ZOM</text>`)},
 wilayah(){const P3=(typeof POLA_HUJAN!=="undefined"?[POLA_HUJAN[0],POLA_HUJAN[2],POLA_HUJAN[5]]:[]).filter(Boolean),col=["#fff","#fde68a","#a7f3d0"],nama=["Monsunal","Ekuatorial","Lokal"];
  return PF_SC(`${[34,68,102].map(y=>`<line x1="16" y1="${y}" x2="304" y2="${y}" stroke="#fff" stroke-opacity=".1"/>`).join("")}
  ${P3.map((p,k)=>{const pts=p.v.map((v,i)=>`${(20+i*24).toFixed(0)},${(120-v/400*100).toFixed(1)}`).join(" ");return `<polyline class="pf-garis" style="--i:${k}" points="${pts}" fill="none" stroke="${col[k]}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`}).join("")}
  ${nama.map((t,k)=>`<circle cx="${22+k*96}" cy="138" r="4" fill="${col[k]}"/><text x="${30+k*96}" y="142" font-size="10.5" font-weight="800" fill="#fff" fill-opacity=".9">${t}</text>`).join("")}`)},
 poshujan(){const pos=[[188,44],[206,58],[224,40],[240,66],[262,50],[282,72],[198,92],[230,104],[256,96],[276,118],[214,122],[292,40]],tinggi=[30,52,38,64,46,22,58,34,48,26,40,56];
  return PF_SC(`${[44,78,112].map(y=>`<line x1="168" y1="${y}" x2="304" y2="${y}" stroke="#fff" stroke-opacity=".1"/>`).join("")}
  ${pos.map(([x,y],i)=>`${i%4===0?`<circle class="s3-ping" style="animation-delay:${(i*.35).toFixed(2)}s" cx="${x}" cy="${y}" r="5" fill="none" stroke="#bae6fd" stroke-width="1.5"/>`:""}<circle cx="${x}" cy="${y}" r="5" fill="#fff" fill-opacity="${(.45+tinggi[i]/64*.55).toFixed(2)}" stroke="#0c4a6e" stroke-opacity=".35"/>`).join("")}
  <g transform="translate(70 0)"><g class="pf-awan" style="--d:8s">${pfAwan(0,22,.9,.85)}${[0,1,2].map(i=>`<line class="pf-tetes" style="animation-delay:${i*.38}s" x1="${-10+i*10}" y1="40" x2="${-13+i*10}" y2="48" stroke="#e0f2fe" stroke-width="2.5" stroke-linecap="round"/>`).join("")}</g>
  <path d="M-26 64 h52 l-12 16 h-28z" fill="#fff" fill-opacity=".9"/><rect x="-16" y="80" width="32" height="50" rx="5" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-width="2.5"/>
  <rect class="pf-batang" style="--i:2" x="-12" y="104" width="24" height="22" rx="3" fill="#7dd3fc"/>${[92,104,116].map(y=>`<line x1="10" y1="${y}" x2="16" y2="${y}" stroke="#fff" stroke-width="2"/>`).join("")}</g>
  <text x="304" y="144" text-anchor="end" font-size="10" font-weight="700" fill="#fff" fill-opacity=".75">pos hujan & curah hujan harian</text>`)},
 alat(){const st=ALAT.map(a=>statusOf(LAST[a.id])[1]),pos=[[198,40],[236,30],[268,52],[214,78],[250,88],[284,96],[196,106],[226,118],[262,124],[174,66],[292,70],[180,90],[240,60]];
  return PF_SC(`<g fill="none" stroke="#fff" stroke-opacity=".22"><circle cx="234" cy="76" r="22"/><circle cx="234" cy="76" r="44"/><circle cx="234" cy="76" r="66"/><line x1="168" y1="76" x2="300" y2="76"/><line x1="234" y1="10" x2="234" y2="142"/></g>
  <g class="s3-putar" style="--d:4s;transform-origin:234px 76px"><path d="M234 76 L234 10 A66 66 0 0 1 291 43 Z" fill="#fff" opacity=".16"/><line x1="234" y1="76" x2="234" y2="10" stroke="#fff" stroke-width="2" stroke-opacity=".7"/></g>
  ${pos.slice(0,ALAT.length).map(([x,y],i)=>{const ok=st[i]==="ok";return `${ok?`<circle class="s3-ping" style="animation-delay:${(i*.27).toFixed(2)}s" cx="${x}" cy="${y}" r="4" fill="none" stroke="#86efac" stroke-width="1.5"/>`:""}<circle cx="${x}" cy="${y}" r="4" fill="${ok?"#86efac":"#fff"}" fill-opacity="${ok?1:.4}"/>`}).join("")}
  <g transform="translate(46 30)" stroke="#fff" fill="none" stroke-width="3" stroke-linecap="round"><line x1="0" y1="10" x2="0" y2="100"/><line x1="-22" y1="100" x2="22" y2="100"/><g class="s3-putar" style="--d:2.4s;transform-origin:0px 6px">${[0,120,240].map(d=>`<g transform="rotate(${d} 0 6)"><line x1="0" y1="6" x2="0" y2="-6"/><circle cx="0" cy="-9" r="4" fill="#fff"/></g>`).join("")}</g><rect x="-12" y="52" width="24" height="18" rx="3"/><circle class="s3-led" cx="-4" cy="61" r="2.5" fill="#86efac" stroke="none"/></g>`)}};
function produkHTML(){const kd=kondisiData(),kk=k=>(kd.kartu||[]).find(x=>x.kunci===k)||{},e=EN();
 const on=ALAT.filter(a=>statusOf(LAST[a.id])[1]==="ok").length,ada=Object.keys(LAST).length;
 const f=(x,alt)=>x&&x.nilai?`${escH(x.judul||"")}: <b>${escH(x.nilai)}</b>`:alt;
 const D=[
  ["#prakiraan-musim","#15803d","#064e3b","Prediksi","Prediksi Musim","Awal, sifat, dan puncak musim hujan per Zona Musim.",PF_VIZ.musim(),(()=>{const i=typeof infoMusimTerkini==="function"?infoMusimTerkini():null;if(i)return `Awal musim hujan <b>${escH(i.val)}</b> · ${escH(String(i.ket||"").split("·")[0].trim())}`;return kk("musim").nilai?`Awal musim hujan <b>${escH(kk("musim").nilai)}</b>${kk("musim").ket?" · "+escH(kk("musim").ket.split("·")[0].trim()):""}`:"Prediksi Musim Hujan 2026/2027"})()],
  ["#hujan-bulanan","#0284c7","#0c4a6e","Analisis","Hujan Bulanan","Analisis dan prakiraan curah hujan bulanan.",PF_VIZ.hujan(),f(kk("hujan"),"Analisis &amp; prakiraan tiap bulan")],
  ["#hari-tanpa-hujan","#ea580c","#7c2d12","Monitoring","Hari Tanpa Hujan","Deret hari kering di setiap pos hujan, tiap dasarian.",PF_VIZ.hth(),kk("hth").nilai?`<b>${escH(kk("hth").nilai)}</b>${kk("hth").ket?" · "+escH(kk("hth").ket):""}`:"Monitoring per dasarian"],
  ["#enso-iod","#0f766e","#134e4a","Dinamika atmosfer","ENSO, IOD &amp; MJO","Pemantauan El Niño, La Niña, IOD, MJO, dan gelombang atmosfer.",PF_VIZ.enso(),`Indeks ENSO <b>${fmtV(e.enso)}</b> · ${escH(e.status.replace(" · "," "))}`],
  ["#peringatan-kekeringan","#b45309","#78350f","Kekeringan","Kekeringan &amp; SPI","Indeks presipitasi terstandardisasi untuk menilai kekeringan.",PF_VIZ.spi(kk("spi")),f(kk("spi"),"Indeks SPI bulanan")],
  ["#zona-musim","#7c3aed","#4c1d95","Wilayah","Zona Musim","Pembagian wilayah berdasarkan pola hujan 1991–2020.",PF_VIZ.zona(),`<b>21 wilayah</b> · ${typeof ZOM11!=="undefined"?ZOM11.length:11} Zona Musim`],
  ["#iklim-papua-barat","#059669","#064e3b","Informasi iklim","Iklim Wilayah","Pengendali iklim dan pola hujan Papua Barat &amp; Papua Barat Daya.",PF_VIZ.wilayah(),"<b>3 pola hujan</b> · monsunal, ekuatorial, lokal"],
  ["#pos-hujan","#1d4ed8","#172554","Data pengamatan","Data Pos Hujan","Curah hujan harian dan bulanan setiap pos hujan, dibandingkan dengan normalnya.",PF_VIZ.poshujan(),PH.reg?`<b>${(PH.reg.pos||[]).length} pos hujan</b> · data sejak ${Object.keys(PH.reg.tahun||{}).sort()[0]||2018}`:"<b>Peta, tabel, dan grafik</b> · data sejak 2018"]];
 return `<div class="produk2">${D.map(([h,c,c2,kat,t,s,viz,fakta],i)=>`<a class="pf reveal" style="--c:${c};--c2:${c2};--d:${(i%4)*70}ms" href="${h}"><div class="pfviz">${viz}</div><div class="pfbody"><span class="pfkat">${kat}</span><b>${t}</b><span class="pfdesc">${s}</span><span class="pffakta"${h==="#peralatan"?' id="pfAlat"':""}>${fakta}</span><i class="pfgo">Buka <em>→</em></i></div></a>`).join("")}</div>${tandaGeser(D.length)}`}

/* ===== Beranda: Data Langsung — kartu stasiun bergaya aplikasi cuaca ===== */
function lamaLalu(r){if(!r||!r.diterima)return "";const m=Math.round((Date.now()-new Date(r.diterima).getTime())/60000);if(isNaN(m))return "";return m<1?"baru saja":m<60?m+" menit lalu":m<1440?Math.round(m/60)+" jam lalu":Math.round(m/1440)+" hari lalu"}
function adeganAWS(siang,ada){if(!ada)return "";
 const benda=siang?`<span class="awcbenda siang" aria-hidden="true"><svg viewBox="0 0 60 60"><circle class="s3-denyut" style="--d:5s" cx="30" cy="30" r="28" fill="#fde68a" opacity=".3"/><g class="s3-putar" style="--d:30s;transform-origin:30px 30px">${Array.from({length:10},(_,k)=>`<line x1="30" y1="4" x2="30" y2="9" stroke="#fef3c7" stroke-width="2.5" stroke-linecap="round" transform="rotate(${k*36} 30 30)"/>`).join("")}</g><circle cx="30" cy="30" r="14" fill="#fef3c7"/></svg></span>`
  :`<span class="awcbenda malam" aria-hidden="true"><svg viewBox="0 0 60 60"><defs><mask id="awBulan"><circle cx="30" cy="30" r="15" fill="#fff"/><circle cx="38" cy="24" r="13" fill="#000"/></mask></defs><circle class="s3-denyut" style="--d:6s" cx="30" cy="30" r="27" fill="#fef9c3" opacity=".12"/><circle cx="30" cy="30" r="15" fill="#fef9c3" mask="url(#awBulan)"/></svg></span>`;
 return `<svg viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${siang?`<g class="pf-awan" style="--d:12s">${pfAwan(120,52,1.3,.16)}</g><g class="pf-awan" style="--d:16s">${pfAwan(40,96,1,.1)}</g>`:`${Array.from({length:18},(_,i)=>`<circle class="s3-bintang" style="animation-delay:${(i*.37%3).toFixed(2)}s" cx="${(i*67)%300}" cy="${(i*41)%150}" r="${i%3?1:1.6}" fill="#fff"/>`).join("")}<g class="pf-awan" style="--d:18s">${pfAwan(110,70,1.2,.08)}</g>`}</svg>${benda}`}
function liveStrip(){const aws=ALAT.filter(a=>a.jenis==="AWS");if(!DATA_URL)return "";
 const jam=new Date(Date.now()+9*3600e3).getUTCHours(),siang=jam>=6&&jam<18,on=aws.filter(a=>statusOf(LAST[a.id])[1]==="ok").length;
 const ring=(v,mx,lab)=>{const C=81.7,p=typeof v==="number"?Math.max(0,Math.min(1,v/mx)):0;return `<svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="13" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="4"/><circle class="aw-ring" style="--off:${(C*(1-p)).toFixed(1)}" cx="17" cy="17" r="13" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="${C}" transform="rotate(-90 17 17)"/></svg>`};
 const kompas=d=>`<svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="14" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/><text x="17" y="7.5" text-anchor="middle" font-size="5.5" font-weight="800" fill="currentColor" fill-opacity=".8">U</text>${typeof d==="number"?`<g transform="rotate(${(d+180)%360} 17 17)"><g class="aw-goyang" style="transform-origin:17px 17px"><path d="M17 6 l5 9 h-3.5 v10 h-3 v-10 h-3.5z" fill="currentColor"/></g></g>`:""}</svg>`;
 const tetes=v=>{const p=typeof v==="number"?Math.max(.06,Math.min(1,v/50)):0,y=6+24*(1-p);return `<svg viewBox="0 0 34 34" aria-hidden="true"><defs><clipPath id="awTetes"><path d="M17 4 C17 4 7 16 7 22 a10 10 0 0 0 20 0 C27 16 17 4 17 4z"/></clipPath></defs><path d="M17 4 C17 4 7 16 7 22 a10 10 0 0 0 20 0 C27 16 17 4 17 4z" fill="none" stroke="currentColor" stroke-width="2"/>${p?`<rect class="aw-isi" clip-path="url(#awTetes)" x="0" y="${y.toFixed(1)}" width="34" height="34" fill="currentColor" fill-opacity=".75"/>`:""}</svg>`};
 const tekan=v=>{const t=typeof v==="number"?Math.max(-1,Math.min(1,(v-1010)/20)):0,ang=(t*100).toFixed(0);return `<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M6 24 A12 12 0 1 1 28 24" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="3.5" stroke-linecap="round"/>${typeof v==="number"?`<g class="aw-jarum" style="--a:${ang}deg;transform-origin:17px 19px"><line x1="17" y1="19" x2="17" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></g><circle cx="17" cy="19" r="2.6" fill="currentColor"/>`:""}</svg>`};
 return `<div class="live2">${aws.map(a=>{const r=LAST[a.id],n=(r&&r.nilai)||{},st=statusOf(r),ada=!!r,su=nv(n,"suhu"),rh=nv(n,"rh"),ws=nv(n,"ws"),wd=nv(n,"wd"),hj=nv(n,"hujan"),pr=nv(n,"tekanan");
  const h=typeof su==="number"?Math.max(6,Math.min(100,(su-18)/(36-18)*100)):0;
  return `<a class="awc ${ada?(siang?"siang":"malam"):"kosong"}" href="#alat-${a.id}"><div class="awcbg">${adeganAWS(siang,ada)}</div><div class="awcin">
  <div class="awchead"><div><b>${escH(a.nama.replace("AWS ",""))}</b><small>${escH(a.wil||"")}</small></div><span class="awcst ${st[1]}">${st[1]==="ok"?"<i></i>":""}${st[0]}</span></div>
  ${sensorTampil("suhu",a.id)?`<div class="awcmain"><div class="awcsuhu"><span class="awcnum">${ada?fmt(su,1):"--"}</span><span class="awcu">°C</span></div></div>
  <span class="awcket">${ada?(sensorCek(n,"suhu")?"Sensor suhu sedang diperiksa":`Suhu udara · ${siang?"siang":"malam"} hari`):"Menunggu data pertama dari alat"}</span>`:sensorTampil("hujan",a.id)?`<div class="awcmain"><div class="awcsuhu"><span class="awcnum">${ada&&typeof hj==="number"?fmt(hj,1):"--"}</span><span class="awcu">mm</span></div></div>
  <span class="awcket">${ada?(sensorCek(n,"hujan")?"Sensor hujan sedang diperiksa":"Hujan hari ini · sejak 09.00 WIT"):"Menunggu data pertama dari alat"}</span>`:`<span class="awcket">${ada?"":"Menunggu data pertama dari alat"}</span>`}
  <div class="awcgrid">
   ${sensorTampil("rh",a.id)?`<div class="awm">${ring(rh,100)}<span>Kelembapan${sensorCek(n,"rh")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof rh==="number"?fmt(rh,0)+" %":"–"}</b></div>`:""}
   ${sensorTampil("ws",a.id)?`<div class="awm">${kompas(wd)}<span>Angin${typeof wd==="number"?" · dari "+arahMata(wd):""}${sensorCek(n,"ws")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof ws==="number"?fmt(ws,1)+" m/s":"–"}</b></div>`:""}
   ${sensorTampil("hujan",a.id)&&sensorTampil("suhu",a.id)?`<div class="awm">${tetes(hj)}<span>Hujan hari ini${sensorCek(n,"hujan")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof hj==="number"?fmt(hj,1)+" mm":"–"}</b></div>`:""}
   ${sensorTampil("tekanan",a.id)?`<div class="awm">${tekan(pr)}<span>Tekanan udara${sensorCek(n,"tekanan")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof pr==="number"?fmt(pr,0)+" mb":"–"}</b></div>`:""}</div>
  <div class="awcfoot"><span>${ada?"Diperbarui "+lamaLalu(r):dataState==="loading"?"Memuat…":"Belum ada data"}</span><em>Detail →</em></div></div></a>`}).join("")}</div>${tandaGeser(aws.length)}`}
/* titik penanda geser (ponsel) */
function tandaGeser(n){return `<div class="gesertanda" aria-hidden="true">${Array.from({length:n},(_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`}
document.addEventListener("scroll",e=>{const t=e.target;if(!t||!t.classList||!(t.classList.contains("produk2")||t.classList.contains("live2")))return;const k=t.children[0];if(!k)return;
 const i=Math.round(t.scrollLeft/(k.getBoundingClientRect().width+14)),d=t.nextElementSibling;if(d&&d.classList.contains("gesertanda"))d.querySelectorAll("i").forEach((x,j)=>x.classList.toggle("on",j===i))},true);

P.beranda=()=>`<h1 class="sr-only">Stasiun Klimatologi Papua Barat – BMKG Manokwari</h1>
${tampilB("hero")?heroSlider():""}
${tampilB("quick")?`<div class="quick" data-sunting="isiberanda|#ldPintas">${pintasanData().map(({link,ikon,judul,sub},i)=>`<a class="qk" style="--i:${i}" href="${link}">${ic(I[ikon])}<b>${judul}</b><span>${sub}</span></a>`).join("")}</div>`:""}
${tampilB("climax")?climaxPromo():""}
${tampilB("peringatan")?pitaSiklon():""}
${peringatanAktif()||(GEMPA&&GEMPA.tsunami)?(peringatanAktif()&&tampilB("peringatan")?bandPeringatan():"")+(tampilB("gempa")?gempaSlot():""):""}

${ajakWilayah()}
${tampilB("kondisi")?`<section class="sec" data-sunting="kondisi|">
 <div class="sechead"><div><span class="eyebrow">Kondisi Iklim Terkini${OTO_C}</span><h2>Papua Barat &amp; Papua Barat Daya</h2></div></div>
 <div id="kondisiBox">${kondisiHTML()}</div>
</section>`:""}

${peringatanAktif()||!tampilB("peringatan")?"":bandPeringatan()}${peringatanAktif()||(GEMPA&&GEMPA.tsunami)||!tampilB("gempa")?"":gempaSlot()}

${DATA_URL&&tampilB("aws")?`<section class="sec" data-lipat><div class="sechead"><div><span class="eyebrow">Data Langsung${OTO}</span><h2>Pengamatan AWS Terkini</h2></div><a class="more" href="#peralatan">Semua peralatan →</a></div><div id="liveBox">${liveStrip()}</div></section>`:""}


${tampilB("produk")?`<section class="sec" data-lipat>
 <div class="sechead"><div><span class="eyebrow">Produk Iklim</span><h2>Informasi untuk Perencanaan</h2></div></div>
 <div id="produkBox">${produkHTML()}</div>
</section>`:""}

${tampilB("publikasi")?`<section class="sec" data-lipat>
 <div class="sechead"><div><span class="eyebrow">Publikasi</span><h2>Dokumen Terbaru</h2></div><a class="more" href="#publikasi">Semua publikasi →</a></div>
 <div class="grid3">${pubs().slice(0,3).join("")}</div>
</section>`:""}

${tampilB("berita")?`<section class="sec" data-lipat>
 <div class="sechead"><div><span class="eyebrow">Berita</span><h2>Kabar Staklim Papua Barat</h2></div><a class="more" href="#berita">Semua berita →</a></div>
 <div class="featwrap">${newsList(5)}</div>
</section>`:""}

${tampilB("kontak")?`<section class="sec" data-lipat>
 <div class="sechead"><div><span class="eyebrow">Hubungi Kami</span><h2>Kantor &amp; Lokasi</h2></div></div>
 <div class="kontakgrid">${kartuKontak()}${petaKantor()}</div>
</section>`:""}`;

/* ---- Info gempa BMKG khusus Papua Barat & Papua Barat Daya (pelengkap; peringatan resmi tetap lewat BMKG/BPBD) ---- */
const GEMPA_PETA={o:"M183.4 336.3 177.4 341.3 174 339.3 173.8 335 165.6 344.6 152.6 346.7 148.7 342.6 141.3 342.5 127.3 338.2 111.5 328.1 143.1 314.4 153.7 312.5 163.2 313.4 174.3 307.7 175.2 314.1 180.6 317.9 184 323.6 181.2 328.2 174.4 332.8ZM135.3 259 123.1 263.7 127.9 260.3 114.4 260 116.7 257.2 127.9 254.2 135.4 256.3ZM243.7 262.6 238.3 274.9 234.8 274.8 232.1 272 226.3 273.7 215.8 263.8 212.9 255.1 208.8 250.7 211 249.3 210.2 244.5 205 237.4 229.2 229 234 233.2 243.5 231.5 247.6 237.4 245.7 240.1 247.3 247.8ZM232.5 218.1 227.3 220.9 229 223.3 221.9 227 191 232.2 192.4 230.9 188.7 230.4 186.9 232.2 185.3 231.1 180 232.9 184.1 229.3 184.8 221.9 187.9 220 190.3 220.5 189.5 222.8 191.9 224 195.1 223.4 196.5 220.5 198.6 223.3 203.1 220.6 205.4 222.4 208.1 221.3 213.3 222.6 220 220.1 221.8 221.9 220.4 215.7ZM204.1 192.8 197.2 193.2 199.7 186.5 194.8 190.5 186.2 192.5 189.6 189 186.9 189 185.5 186.4 187.6 187.7 190.5 184.1 193.5 186.9 203.2 181.1 207.8 183.6 208.8 186.3ZM131.6 182.7 127.8 190.2 125.1 188.2 124.4 184.4 130.2 180.8ZM274.5 168.8 263.8 178.9 255.8 173.3 249.8 172.3 242.3 176.7 241.6 175 237 175.8 227.9 165.4 219.7 163.9 219.2 159 211.6 149.3 205 148 201.3 149.3 205.4 151.4 203.6 151.3 202.9 154.1 208.2 157 215.1 168.8 221.1 171.9 222.8 169.1 228.7 169.6 234.8 176.7 231.7 180.6 226.5 182.9 213.3 184.2 208.1 174 208.8 169.1 197.9 173.4 196.5 177.4 198.2 176.6 197.9 178.4 194.7 183.6 195.8 178.7 194.1 178.3 194.4 172.6 191.6 169.1 192.4 165.8 188.6 165.5 184.1 168.5 179.3 166.4 177.6 167.5 161.7 160.1 179.9 161.4 182.4 159.9 183 158.6 178.6 157.5 181.2 155.7 180.6 152.7 178.5 155.7 177.2 153.4 173.8 154 174.5 158.9 169.7 156.5 168.1 150.5 171.8 150.7 173.8 148 175.9 152.7 175.9 148 178.1 147.4 182.8 150.7 182.1 148 183.4 149.3 191 144.5 194.4 147.3 197.2 144.5 198.6 145.8 211.6 143.3 212.2 145.2 216.5 145 218.4 144.5 215 143.1 216.1 141.8 222.5 140.4 237.4 145.7 245.6 144.1 244.4 146.5 255.4 148.6 261.2 153.8 269.7 155.9 271.8 160.3 269.8 163.7ZM495.5 565.2 486 564.4 478.8 560.5 473.1 556.5 472.4 550.8 485.6 560.2 494.1 562.1 502.8 570 500.4 570.1ZM410.3 491.9 406.6 485.3 402 482.4 404.4 480.9 408.1 482.3 411 486.9 411.3 490.4ZM305.5 401.3 299.8 405.4 297.3 405.1ZM498.5 391.3 492.3 388.8 489 383.1 500.5 386.8ZM593.7 384.6 594.6 382.3 592.4 379.2 595.4 376.7 596.7 369.3 598.1 370.8 598.4 383.8ZM622 565.9 613.3 559.8 612.4 554.3 604.8 551.9 609.7 545.3 607.6 542.6 607.9 536.1 612.4 533.8 626.4 535.3 631.6 537.9 636.8 533.7 634.4 535.1 631.6 532.3 607.6 530.8 602 535.5 600.2 540.1 592.5 542.6 586.4 537.9 587.8 536.2 583 530.8 577.5 529.9 573.4 526.9 576 532.6 574.9 534.3 570.6 534.5 574 539.6 571.5 542 567.2 537.1 559.1 534.4 557 528.8 554.1 530.3 554.4 527.5 559.3 523.6 556.2 517.2 552.7 514.5 551 521.8 549.2 522.4 543.9 519.3 538.8 525.5 535.9 523.8 531.3 512.9 524.4 503.8 523.8 499 520.4 500.2 519.5 503.2 522.9 512.2 521 512 516.3 506 510.3 507.3 510.8 501 504.1 488.4 505.3 484.4 509.7 482.7 510.2 480.4 508.3 463.3 509.1 461.6 511 463.2 512.2 458.3 515.8 459 518.4 453.1 524.6 448.7 526.4 448 531.4 452.7 532.9 451.5 526.4 444.2 528.2 436.4 526.1 432.3 521.8 433.5 523 435.4 520.2 441.8 512 446.4 506.8 452.2 506.3 476.2 502.8 481.6 495.1 483.2 491.4 477.8 491.9 483.1 489.1 484.4 496.9 488.2 499.2 494.5 497.6 498 490.6 502.2 480.9 512.2 479.7 515.6 480.9 520.1 485.6 524.7 485.3 526.5 481.2 528.6 465.1 546.7 461.1 547.8 445.2 546.1 439 551.4 430.8 548.8 429.1 543.7 419.6 534.1 419.6 531.8 422.6 533.8 422.5 531.6 413.1 508.2 413 504.9 415.6 502.8 428.1 504.3 429.6 498.6 433.2 495.4 428.1 487.5 423.2 486.1 422.1 483.7 421.2 468.2 414.1 467.7 413.3 473.1 407.1 472.9 400.3 464.2 402.7 459.7 398.2 457 395.3 450.7 374 437.8 372.6 434.7 358.8 431.7 356.9 434.6 350.6 433.7 350.1 436 347.5 435.8 345.8 431.7 337.6 433 342.4 425.5 339 424.1 344.4 420.3 335.8 418.8 346.5 414.5 348.2 415.8 348.8 413.6 358.1 412.5 351.1 411.9 356.2 408.3 371.2 407.6 382.8 409.7 382.1 414.5 387.6 413.1 386.9 410.8 388.5 409.9 398.6 411.7 407.9 420.2 412.8 421.3 425.3 411.7 443.4 387.9 457.3 382.2 464 381.7 471.2 384.3 472.6 390.5 475.4 389.6 479 392.7 478.1 407.6 480.3 407.5 480.5 399.1 484.6 389.5 485.9 390.7 485 404.2 487.3 401.6 487.3 392.2 489.3 392.4 491.9 399 500.7 393.2 503.4 393.9 507.3 397.5 508.2 411.7 511.3 391.2 514.7 392.9 519.9 404.2 521.7 404.9 522.8 395 520.4 390.7 522 387.7 516.7 387.2 514.7 383.8 525 382.4 530.8 387.7 526.6 381.1 538.7 380.6 540.5 378.8 529.9 377.8 529.5 376.3 536.4 372.6 526.7 374.1 535 369.3 535 360.4 532.9 367.4 530.2 365.9 524 370 519.2 366 528.2 359 530.1 359.8 535 356.9 529.8 357.5 529.5 356.3 532.9 354.9 534 350.8 525.8 350.7 523.3 354.2 511 357.6 504.6 363.6 499.4 363.8 499.4 358.3 494.9 364.5 490.4 360.4 491.5 362.6 484.6 363.8 478.8 361.7 471.7 362.3 469.6 360.4 456.9 361.7 434.4 368.3 421.6 364.5 408.9 370.7 403.7 367.7 401.4 361.1 396 358.6 374.8 367 370.6 366.6 361.5 356.6 344.8 348.3 344.4 346 352.7 339.8 342.7 341.8 337.3 336.5 337.2 331.2 334.2 329.5 332.8 320.6 341.8 312.1 342.4 307.6 331.7 310.7 328.7 305.2 329.7 300.1 338.2 293.9 328 297.3 328.9 295.7 327.1 295.3 320.5 300.8 321.1 292 319.1 289.8 317.2 296.3 312.3 297.2 310.7 293.5 312.3 291.8 310.4 291.1 304.7 292.6 297.3 288 290 287 285.7 290.3 282.8 289.8 279 285.7 280.2 282.7 278.4 280.2 272.2 280.1 267.7 277.4 267.5 279.2 273.7 285.3 260.6 292.4 258.7 288.5 252.6 285.3 240.4 285.6 235.1 283.4 235.3 280.5 240.4 277.2 243 267.6 247.4 263.8 258.2 261.7 265.4 248 267.1 240.4 266.4 232.9 269.2 231.5 263.5 224.6 264.3 221.9 290.3 213.3 294.5 213.7 291.7 218.5 327.6 209 335.2 198.9 346.9 193.2 350 187 355.1 183.6 367 178.5 383.7 174.7 410.9 176 430.5 185.3 437.5 184.5 438.3 187 444.8 190.8 455.5 193.2 479.2 212.3 497.3 215.1 500.5 212.6 514.5 215.1 517.4 211.7 523 214.4 537.7 212.3 545.6 219.5 557.2 226.4 547.4 229.5 545.9 234.8 543.6 235.8 552.7 254.8 560.4 261.3 568.2 275 563 283.6 561.6 296 548.7 308.3 554.5 333.9 555.5 344.6 553.5 345 552 351.4 555.2 357.5 556.2 371 560.4 379.5 573 392.2 580.2 414.5 586.4 426.2 593.3 423.4 587.8 403.5 588.4 393.9 595.4 389.1 593.5 387.9 594.6 386.3 603.8 391.1 605.8 396.3 607 423.8 584.8 441.3 585.1 447.8 570.6 462.1 563.4 478.4 666.5 516 627.3 565.5ZM582.6 344 579 353.1 576 355.3 573.2 351.1 575.1 343.3 578.5 340.4ZM560.8 322.7 562.4 324.9 557.5 334.3 556.9 323 563.6 313.9 564.5 319.6ZM570.5 66.7 571 64.4 574.3 63.5 573.9 66.2Z",l:"M133.3 596.3 129.9 596.8 125.9 595.5 134.1 590.9ZM270.5 551.5 268.8 546.3 279.2 555.3 278.5 555.6ZM265 543.2 262.6 543.8 260.9 537.9 264.5 539.7ZM19.7 509.4 14.9 508.4 15.8 504.4 19.6 504.3ZM6.9 496.9 5.6 501.2 2.7 501.8 0 497.8 0 489.3 7.3 494 10.6 490.3 12.8 501.5ZM227.6 498.6 223.2 509.4 224.2 526.5 221.8 526.9 201.6 518.6 181.9 503.7 140.2 487.3 136.4 482.8 136.1 478.2 129 473.3 91 470.3 90.2 473.4 96.3 484 88.6 486.3 48.4 474.1 36.1 475.6 33.8 472 38.2 465.2 35.3 462 27.7 460.3 9.3 474.9 7.8 483.2 0 483.5 0 425.5 26.5 426.2 45.3 420.4 46.4 429.6 50.5 434.8 57.7 435.8 57.9 432.6 61.9 434.1 62.8 431.5 75.8 425.6 80 419.2 94.1 418 116.6 426.9 121.1 431.7 126.2 430.3 136.5 437.4 144.7 439.2 174.5 437.8 188.9 448.7 198.8 452.9 206.7 480.4 216.1 480.6 223.2 485.8 221.1 488.5ZM97.2 159.2 91.7 160.9 85.8 151.4 77.3 148 77.2 143.7 69.3 135.2 93.7 153.4ZM6.7 83.5 8.4 85.8 9 105.3 22.4 108.9 30 119.2 24.8 115 0 108.5 0 82.9ZM14.7 7.9 11.6 11.3 10.4 32.5 0 37.1 0 0 14.3 0ZM312.9 615.5 312.6 610.8 313.3 609.3 315.4 613.7 314.9 615.9ZM303.3 583 308 592.4 306.1 593.4 300.6 583ZM280.1 544.7 277.8 535.7 281.6 535.9 285.3 545.6ZM735 590.6 705.6 588.6 683 583 662.8 586.1 627.3 565.5 666.5 516 563.4 478.4 570.6 462.1 585.1 447.8 585.7 440.3 607 423.8 612.7 438.6 617.2 437.8 625.1 430 626.1 434 621.9 453.6 625.4 454.8 629.9 466.3 636.4 463.8 635.7 468 640.2 473.6 676.2 478.6 690.5 474.8 696.9 468.2 700.2 460.4 715.2 452.8 715.7 445.6 719.9 445.3 731 438.6 733.7 434.3 732.7 427.9 736 423.8 736.5 417.6 740 414.5 740 595.3ZM740 321.5 711.8 310.3 689.8 308.3 682.2 301.1 687.7 299 725.6 304.4 740 304.3ZM671.2 291 658.7 292.6 649.7 290.9 650.9 287.4 673.4 288.4ZM632.6 253.6 626.4 252.1 620 242.8 626.3 233.8 634.4 236.7 635.6 240.9 632.8 247.2 636.2 247.1 639.8 241.9 639.1 248.3ZM730.6 258.9 723.4 252.9 723.4 244.9 716.5 223.9 711.9 222.5 706.1 228.7 688.5 215.7 689.2 220.5 685.9 219.3 679.4 212.3 677 203.6 689.9 207.2 698.3 206.7 700.2 209.6 707.7 208.6 709.5 213 712.5 211.6 717.8 214.9 724.7 209.6 740 222 740 257Z"};
const GP_L0=128.6,GP_T0=1.4,GP_K=100,GP_W=740,GP_H=670,GP_VB=[30,110,690,500];
const GP_KOTA=[["Manokwari",-0.86,134.06,1],["Sorong",-0.88,131.26,1],["Fakfak",-2.92,132.3,1],["Kaimana",-3.66,133.77,1],["Bintuni",-2.11,133.53],["Wasior",-2.7,134.5],["Waisai",-0.43,130.82],["Teminabuan",-1.44,132.02]];
const gpXY=(lat,lon)=>[(lon-GP_L0)*GP_K,(GP_T0-lat)*GP_K];
/* nama tempat BMKG kadang tergabung tanpa spasi: "Kebarmanokwari" -> "Kebar, Manokwari" */
const TEMPAT_GEMPA=["Manokwari Selatan","Manokwari","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana","Sorong Selatan","Sorong","Raja Ampat","Tambrauw","Maybrat","Nabire","Kepulauan Yapen","Biak Numfor","Supiori","Mimika","Waropen","Mamberamo Raya","Jayapura","Keerom","Sarmi","Merauke","Asmat","Mappi","Boven Digoel","Dogiyai","Deiyai","Paniai","Intan Jaya","Puncak Jaya","Seram Bagian Timur","Seram Bagian Barat","Maluku Tengah","Maluku Tenggara","Maluku Barat Daya","Kepulauan Tanimbar","Kepulauan Aru","Kepulauan Sula","Halmahera Selatan","Halmahera Tengah","Halmahera Timur","Halmahera Utara","Halmahera Barat","Pulau Taliabu","Pulau Morotai","Buru Selatan","Tidore Kepulauan","Banggai Kepulauan","Banggai Laut","Papua Barat Daya","Papua Barat","Papua Tengah","Papua Selatan","Papua Pegunungan","Maluku Utara"].sort((a,b)=>b.length-a.length);
function rapiTempat(t){return String(t||"").replace(/[A-Za-z]{7,}/g,w=>{const lw=w.toLowerCase();for(const n of TEMPAT_GEMPA){const nk=n.replace(/\s+/g,"").toLowerCase();if(lw===nk)return n;if(lw.length-nk.length>=3&&lw.endsWith(nk)){const d=lw.slice(0,-nk.length),D=d.charAt(0).toUpperCase()+d.slice(1);return /^(kota|kab|kep|pulau|teluk)$/.test(d)?D+" "+n:D+", "+n}}return w})}
let GEMPA=null,GEMPA_PILIH=0,GEMPA_T=0;
const gempaURL=()=>DATA_URL?DATA_URL.replace(/\/terkini$/,"/gempa"):"";
function kelasGempa(m){return m>=6?["m4","Gempa kuat","#b91c1c"]:m>=5?["m3","Gempa cukup kuat","#c2410c"]:m>=4?["m2","Gempa sedang","#a16207"]:["m1","Gempa kecil","#0369a1"]}
function waktuGempa(t){const d=Date.parse(t);if(!d)return {teks:"",lalu:"",baru:false};const sel=(Date.now()-d)/6e4;
 const teks=new Date(d).toLocaleString("id-ID",{timeZone:"Asia/Jayapura",weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(/\./g,".")+" WIT";
 const lalu=sel<1?"baru saja":sel<60?Math.round(sel)+" menit lalu":sel<1440?Math.round(sel/60)+" jam lalu":Math.round(sel/1440)+" hari lalu";return {teks,lalu,baru:sel<60,hariIni:sel<1440}}
const MMI_WARNA=["#e5e7eb","#e5e7eb","#bfe3f7","#7cc7ec","#7ed493","#f7e463","#f6a93b","#ef5a3c","#c9252c","#9b1c22","#6d1218","#4a0c10","#2b0609"];
const MMI_KET={1:"Tidak dirasakan, hanya tercatat alat",2:"Dirasakan beberapa orang, benda ringan bergoyang",3:"Dirasakan nyata di dalam rumah, seakan ada truk lewat",4:"Dirasakan banyak orang, jendela dan pintu berderik",5:"Dirasakan hampir semua orang, barang kecil berjatuhan",6:"Kerusakan ringan, plester dinding retak",7:"Kerusakan ringan–sedang pada bangunan",8:"Kerusakan berat pada bangunan"};
const ROMAWI={I:1,II:2,III:3,IV:4,V:5,VI:6,VII:7,VIII:8,IX:9,X:10,XI:11,XII:12};
function rasaGempa(t){return String(t||"").split(",").map(x=>x.trim()).filter(Boolean).map(x=>{const m=x.match(/^((?:[IVX]+)(?:\s*-\s*[IVX]+)?)\s+(.+)$/);if(!m)return {skala:"",tempat:x,n:0};const ns=m[1].split("-").map(v=>ROMAWI[v.trim()]||0);return {skala:m[1].replace(/\s+/g,""),tempat:m[2],n:Math.max(...ns)}})}
function petaGempa(g,kls){const lat=g?g.lat:0,lon=g?g.lon:0;let [x,y]=g?gpXY(lat,lon):[0,0];const luar=g&&(x<GP_VB[0]+10||x>GP_VB[0]+GP_VB[2]-10||y<GP_VB[1]+10||y>GP_VB[1]+GP_VB[3]-10);
 const [vx,vy,vw,vh]=GP_VB,cx=Math.max(vx+26,Math.min(vx+vw-26,x)),cy=Math.max(vy+26,Math.min(vy+vh-26,y));
 const nring=kls?{m1:1,m2:2,m3:3,m4:3}[kls[0]]:0;
 return `<svg class="gpeta" viewBox="${GP_VB.join(" ")}" role="img" aria-label="Peta lokasi pusat gempa">
 <rect width="${GP_W}" height="${GP_H}" class="gp-laut"/>
 ${[...Array(7)].map((_,i)=>`<line x1="${(129+i)*GP_K-GP_L0*GP_K}" x2="${(129+i)*GP_K-GP_L0*GP_K}" y1="0" y2="${GP_H}" class="gp-grid"/>`).join("")}${[1,0,-1,-2,-3,-4,-5].map(la=>`<line y1="${(GP_T0-la)*GP_K}" y2="${(GP_T0-la)*GP_K}" x1="0" x2="${GP_W}" class="gp-grid"/>`).join("")}
 <path d="${GEMPA_PETA.l}" class="gp-darat"/><path d="${GEMPA_PETA.o}" class="gp-kita"/>
 ${GP_KOTA.map(([n,la,lo,b])=>{const [a,c]=gpXY(la,lo);return `<g class="gp-kota${b?" utama":""}"><circle cx="${a}" cy="${c}" r="${b?5:3.6}"/><text x="${a+9}" y="${c+5}">${n}</text></g>`}).join("")}
 ${g?`<g class="gp-pusat ${kls[0]}" style="--gc:${kls[2]}">${[...Array(nring)].map((_,i)=>`<circle class="riak" cx="${cx}" cy="${cy}" r="${kls[0]==="m4"?34:kls[0]==="m3"?28:22}" style="animation-delay:${i*({m1:3,m2:1.2,m3:.6,m4:.43}[kls[0]])}s"/>`).join("")}
  <circle class="inti" cx="${cx}" cy="${cy}" r="${7+Math.max(0,(g.m||3)-3)*2.2}"/>
  <path class="bintang" transform="translate(${cx} ${cy})" d="M0-7 2-2 7-2 3 1.2 4.6 6.5 0 3.4-4.6 6.5-3 1.2-7-2-2-2z"/>
  ${luar?`<text class="gp-luar" x="${Math.max(GP_VB[0]+110,Math.min(GP_VB[0]+GP_VB[2]-110,cx))}" y="${cy+(cy>GP_VB[1]+GP_VB[3]/2?-30:42)}" text-anchor="middle">Pusat gempa di luar peta</text>`:""}</g>`:""}
 <text x="${GP_VB[0]+GP_VB[2]-12}" y="${GP_VB[1]+GP_VB[3]-12}" text-anchor="end" class="gp-sumber">Peta: Natural Earth · Data: BMKG</text></svg>`}
function gempaInfo(g){const k=kelasGempa(g.m),w=waktuGempa(g.t),rasa=rasaGempa(g.rasa),maks=Math.max(0,...rasa.map(r=>r.n));
 const mag=String((g.m||0).toFixed(1)).replace(".",",");
 return `<div class="gp-info">
 <div class="gp-atas"><span class="gp-mag ${k[0]}" style="--gc:${k[2]}"><small>Magnitudo</small><b>${mag}</b></span>
 <div><span class="gp-kls" style="--gc:${k[2]}">${k[1]}${w.baru?'<em class="gp-baru">BARU</em>':""}</span><h3>${escH(g.wil||"Lokasi belum tersedia")}</h3><p class="gp-waktu">${escH(w.teks)} · ${w.lalu}</p></div></div>
 <dl class="gp-dl"><div><dt>Kedalaman</dt><dd>${escH(g.dalam||"–")}</dd></div><div><dt>Koordinat</dt><dd>${Math.abs(g.lat).toFixed(2)}° ${g.lat<0?"LS":"LU"} · ${g.lon.toFixed(2)}° BT</dd></div><div><dt>Jarak</dt><dd>±${g.km} km dari ${escH(g.dekat)}</dd></div></dl>
 <div class="gp-tsu ${g.tsunami?"ya":"tidak"}">${g.tsunami?"⚠ "+escH(g.potensi||"Berpotensi tsunami"):g.potensi?escH(g.potensi):"Tidak ada peringatan tsunami untuk gempa ini"}${!g.tsunami?`<small>${g.potensi?"":"Gempa ini tergolong "+k[1].toLowerCase().replace("gempa ","")+". "}Jika ada gempa yang berpotensi tsunami, BMKG akan segera mengumumkannya dan web ini langsung menampilkan tanda peringatan merah.</small>`:""}</div>
 <p class="gp-app">📱 Untuk info gempa dan tsunami paling cepat, unduh aplikasi <b>InfoBMKG</b> di <a href="https://play.google.com/store/apps/details?id=com.Info_BMKG" target="_blank" rel="noopener">Play Store</a> atau <a href="https://apps.apple.com/id/app/info-bmkg/id1114372539" target="_blank" rel="noopener">App Store</a>.</p>
 ${rasa.length?`<div class="gp-rasa"><span>Dirasakan (skala MMI):</span>${rasa.map(r=>`<i style="--mc:${MMI_WARNA[r.n]||"#e5e7eb"}" title="${escH(MMI_KET[r.n]||"")}"><b>${escH(r.skala)}</b> ${escH(r.tempat)}</i>`).join("")}${maks?`<p>${escH(MMI_KET[maks]||"")}${maks>1?" (skala tertinggi "+rasa.find(r=>r.n===maks).skala+")":""}.</p>`:""}</div>`:`<p class="gp-catat">Tidak ada laporan dirasakan dari BMKG untuk gempa ini.</p>`}
 ${g.peta?`<a class="gp-shake" href="${escH(g.peta)}" target="_blank" rel="noopener">Lihat peta guncangan (shakemap) BMKG →</a>`:""}
 </div>`}
function gempaHTML(){
 if(!GEMPA)return `<div class="gp-kartu kosong"><div class="gp-petawrap">${petaGempa(null)}</div><div class="gp-info"><p class="gp-catat">${gempaURL()?"Memuat info gempa dari BMKG…":"Info gempa belum tersedia."}</p></div></div>`;
 if(GEMPA.galat&&!(GEMPA.daftar||[]).length)return `<div class="gp-kartu kosong"><div class="gp-petawrap">${petaGempa(null)}</div><div class="gp-info"><p class="gp-catat">Info gempa BMKG sedang tidak dapat diambil. Cek <a href="https://www.bmkg.go.id/gempabumi" target="_blank" rel="noopener">bmkg.go.id</a> atau aplikasi InfoBMKG.</p></div></div>`;
 const L=GEMPA.daftar||[];
 if(!L.length)return `<div class="gp-kartu aman"><div class="gp-petawrap">${petaGempa(null)}</div><div class="gp-info"><div class="gp-tenang"><b>Tidak ada gempa tercatat di sekitar wilayah kita</b><p>Daftar terbaru BMKG (gempa M 5+ dan gempa dirasakan) tidak memuat gempa di Papua Barat dan Papua Barat Daya.</p></div></div></div>`;
 const i=Math.min(GEMPA_PILIH,L.length-1),g=L[i],k=kelasGempa(g.m),w=waktuGempa(g.t),goyang=w.baru&&g.m>=5;
 return `<div class="gp-kartu ${k[0]}${goyang?" goyang":""}" style="--gc:${k[2]}"><div class="gp-petawrap">${petaGempa(g,k)}</div>${gempaInfo(g)}</div>
 ${L.length>1?`<div class="gp-daftar"><span class="gp-dj">Gempa terbaru di sekitar wilayah kita</span>${L.slice(0,6).map((x,j)=>{const kx=kelasGempa(x.m),wx=waktuGempa(x.t);return `<button type="button" class="gp-row${j===i?" on":""}" data-gempa="${j}" style="--gc:${kx[2]}"><b>${String(x.m.toFixed(1)).replace(".",",")}</b><span>${escH(x.wil)}<small>${escH(wx.teks)}${x.dirasakanKita?" · dirasakan di wilayah kita":""}</small></span></button>`}).join("")}</div>`:""}`}
function bannerTsunami(){const t=GEMPA&&GEMPA.tsunami;if(!t)return "";
 return `<div class="gp-tsunami" role="alert"><svg class="gp-ombak" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25 Q25 5 50 25 T100 25 T150 25 T200 25 T250 25 T300 25 T350 25 T400 25 T450 25 T500 25 T550 25 T600 25 V40 H0Z"/></svg>
 <b>PERINGATAN: ${escH(t.potensi||"Gempa berpotensi tsunami")}</b><p>M ${String(t.m.toFixed(1)).replace(".",",")} · ${escH(t.wil)} · ${escH(waktuGempa(t.t).teks)}. Bila Anda di pantai, segera menjauh ke tempat tinggi. Ikuti arahan resmi BMKG dan BPBD.</p></div>`}
function gempaSlot(){return `<section class="sec gempasec" id="gempaSec" data-lipat><div class="sechead"><div><span class="eyebrow"><i class="livedot hijau" aria-hidden="true"></i>Info Gempabumi</span><h2>Gempa di Sekitar Papua Barat &amp; Papua Barat Daya</h2></div><a class="more" href="https://www.bmkg.go.id/gempabumi" target="_blank" rel="noopener">Semua gempa di BMKG →</a></div>
 <div id="gempaTsu">${bannerTsunami()}</div><div id="gempaBox">${gempaHTML()}</div>
 <div class="gp-panduan"><div class="gp-ph"><b>Apa yang harus dilakukan?</b><div class="tabs" data-grup="gempa"><button type="button" class="on" data-t="saat">Saat gempa</button><button type="button" data-t="setelah">Setelah gempa</button><button type="button" data-t="pantai">Di pantai / tsunami</button></div></div>
 <ol data-pgrup="gempa" data-p="saat"><li><b>Merunduk, berlindung, berpegangan.</b> Lindungi kepala dan leher, berlindung di bawah meja yang kokoh.</li><li>Jauhi kaca, lemari, dan benda yang bisa jatuh. Jangan berlari keluar saat lantai masih berguncang.</li><li>Bila di luar, menjauh dari bangunan, tiang listrik, dan pohon menuju tempat terbuka.</li><li>Bila berkendara, menepi dan berhenti; jauhi jembatan dan lereng.</li></ol>
 <ol data-pgrup="gempa" data-p="setelah" hidden><li>Keluar dengan tertib setelah guncangan berhenti; pakai tangga, bukan lift.</li><li>Periksa luka, kebocoran gas, dan kabel listrik yang rusak.</li><li>Waspadai gempa susulan dan jauhi bangunan yang retak.</li><li>Hanya percaya info resmi BMKG (aplikasi InfoBMKG, bmkg.go.id) dan BPBD; jangan sebarkan kabar yang belum jelas.</li></ol>
 <ol data-pgrup="gempa" data-p="pantai" hidden><li><b>Guncangan kuat atau lama sampai sulit berdiri, atau air laut surut tiba-tiba: segera lari ke tempat tinggi</b> atau jauh dari pantai. Jangan menunggu peringatan.</li><li>Ikuti jalur evakuasi dan arahan BPBD; ajak keluarga dan tetangga.</li><li>Tetap di tempat aman sampai BMKG/BPBD menyatakan peringatan berakhir. Gelombang tsunami bisa datang lebih dari sekali.</li><li>Darurat: hubungi 112 atau BPBD setempat.</li></ol>
 <p class="gp-sumberket">Sumber data: <b>BMKG</b> – Data Terbuka Gempabumi (<a href="https://data.bmkg.go.id/" target="_blank" rel="noopener">data.bmkg.go.id</a>), daftar gempa terbaru, gempa M 5,0+, dan gempa dirasakan${GEMPA&&GEMPA.diambil?" · diperbarui "+escH(waktuGempa(GEMPA.diambil).lalu):""}. Ditampilkan gempa M 5+ dan gempa dirasakan yang pusatnya ±150 km dari kota di Papua Barat/Papua Barat Daya atau dirasakan di wilayah ini. Informasi ini <b>pelengkap</b>; peringatan dini tsunami resmi disampaikan BMKG melalui aplikasi InfoBMKG, WRS di media dan BPBD, serta sirene. Gempa dan tsunami ditangani Stasiun Geofisika BMKG.</p></div></section>`}
function isiGempa(){const b=document.getElementById("gempaBox");if(b)b.innerHTML=gempaHTML();const t=document.getElementById("gempaTsu");if(t)t.innerHTML=bannerTsunami();
 const s=document.querySelector(".gp-sumberket");if(s&&GEMPA&&GEMPA.diambil){}}
function muatGempa(paksa){if(!gempaURL()||(!paksa&&Date.now()-GEMPA_T<55000))return;GEMPA_T=Date.now();
 fetch(gempaURL(),{cache:"no-store"}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{if(!j||!("daftar" in j||"galat" in j))throw 0;const lama=JSON.stringify(GEMPA),tsuLama=!!(GEMPA&&GEMPA.tsunami);(j.daftar||[]).forEach(x=>{if(x&&x.wil)x.wil=rapiTempat(x.wil)});if(j.tsunami&&j.tsunami.wil)j.tsunami.wil=rapiTempat(j.tsunami.wil);GEMPA=j;if(JSON.stringify(j)!==lama&&cur==="beranda"){if(!!j.tsunami!==tsuLama){const y=scrollY;render();scrollTo({top:y})}else isiGempa()}}).catch(()=>{if(!GEMPA){GEMPA={galat:1,daftar:[]};if(cur==="beranda")isiGempa()}})}
document.addEventListener("click",e=>{const im=e.target.closest&&e.target.closest("figure.map>img");if(!im)return;const d=document.createElement("div");d.className="lightbox";d.innerHTML=`<img src="${im.currentSrc||im.src}" alt="${escH(im.alt||"")}"><b>Tutup ✕</b>`;const tt=()=>{d.remove();removeEventListener("keydown",ek)},ek=ev=>{if(ev.key==="Escape")tt()};d.onclick=tt;addEventListener("keydown",ek);document.body.appendChild(d)});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-gempa]");if(!b)return;GEMPA_PILIH=+b.dataset.gempa;isiGempa();const k=document.querySelector("#gempaBox .gp-kartu");if(k&&innerWidth<800)k.scrollIntoView({behavior:"smooth",block:"start"})});
setInterval(()=>{if(cur==="beranda"&&!document.hidden)muatGempa(1)},120000);

function stCard(tag,name,txt){return `<div class="card station"><span class="tag">${tag}</span><b style="font-size:18px">${name}</b><span style="color:var(--muted);font-size:14px">${txt}</span></div>`}
/* sampul dokumen: gambar dari dokumen (peta, sampul, foto) ditampilkan berbingkai di atas latar buram gambar itu sendiri;
   bila dokumen tidak punya gambar, dipakai ilustrasi animasi */
function sampulDok(cls,g,seni,ekstra){if(!g)return `<div class="${cls}" aria-hidden="true">${SENI[seni]||SENI.hujan}${ekstra||""}</div>`;const u=escH(g);
 return `<div class="${cls} ada" data-seni="${seni}" aria-hidden="true"><img class="pubbg" src="${u}" alt="" loading="lazy" referrerpolicy="no-referrer" data-galat="sampul"><span class="pubfig"><img src="${u}" alt="" loading="lazy" referrerpolicy="no-referrer" data-galat="sampul"></span>${ekstra||""}</div>`}
function gagalSampul(im){const w=im.closest(".ada");if(!w)return;w.classList.remove("ada");w.querySelectorAll(".pubbg,.pubfig").forEach(x=>x.remove());w.insertAdjacentHTML("afterbegin",SENI[w.dataset.seni]||SENI.hujan)}
function pubKartu(p){
 const aksi=p.file&&unduhDok()?`<a class="pbtn" href="${p.file}" target="_blank" rel="noopener" download>Unduh ${/\.pptx?$/i.test(p.nama_file||p.file)?"PowerPoint":/\.docx?$/i.test(p.nama_file||p.file)?"dokumen":"PDF"}${p.ukuran?" · "+p.ukuran:""}</a>`:p.url?`<a class="pbtn" href="${p.url}" target="_blank" rel="noopener">Buka dokumen ↗</a>`:`<span class="pbtn off">Segera tersedia</span>`;
 const tag=/dasarian/i.test(p.kategori)?"Dasarian":/akuntabilitas|lkjip|lakip/i.test(p.kategori+" "+p.judul)?"LKjIP":/fgd|paparan/i.test(p.judul)?"FGD":/press|rilis/i.test(p.judul)?"Press Release":/buletin/i.test(p.kategori+" "+p.judul)?"Buletin":"Dokumen";
 return `<div class="card pubc"${/akuntabilitas|lkjip|lakip/i.test(p.kategori+" "+p.judul)?" data-bebas-skm":""}>${sampulDok("pubimg t-"+tag.split(" ")[0].toLowerCase(),p.gambar,/kemarau|kekeringan|peringatan/i.test(p.kategori+" "+p.judul)?"panas":"hujan",`<span class="pubtag">${tag}</span>`)}<span class="pill">${p.kategori}</span><h3>${p.judul}</h3><small>${p.tanggal||""}</small><p>${p.ringkas||""}</p>${aksi}${p.lihat?` <a class="pbtn sek" href="${p.lihat}">Lihat di web</a>`:""}</div>`}


function pmhTabelZom(){const W=no=>(ZOM11.find(z=>z.no==no)||{}).wil||WIL_NONZOM[no]||"–",nos=Object.keys(ZOM_PMH).map(Number).sort((a,b)=>a-b);if(!nos.length)return "";
 return `<div class="panel"><div class="panel-head"><span>Prediksi per Zona Musim (${nos.length} ZOM)</span></div><div class="panel-body">${tbl(["ZOM","Wilayah","Awal","Dibanding normal","Sifat","Puncak"],nos.map(no=>{const r=ZOM_PMH[no]||[],non=NONZOM.includes(no);return [`<b>${no}</b>`,esc(W(no)),non?'<span class="muted">Non-ZOM (Tipe 1)</span>':esc(r[0]||"–"),r[1]?`<span class="pill ${PILL_B[r[1]]||""}">${esc(r[1])}</span>`:"–",(r[2]||SIFAT_NONZOM[no])?`<span class="pill ${PILL_S[r[2]||SIFAT_NONZOM[no]]||""}">${esc(r[2]||SIFAT_NONZOM[no])}</span>`:"–",esc(r[3]||"–")]}))}
 <p class="note">Non-ZOM (Tipe 1) adalah wilayah yang hujannya hampir sama sepanjang tahun, sehingga tidak punya awal musim. Cari distrik Anda di kolom Wilayah, atau buka <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>`}
P["prakiraan-musim"]=()=>head("Iklim >> Prediksi Musim","Prediksi Musim Hujan 2026/2027","Hasil analisis kami untuk Provinsi Papua Barat dan Papua Barat Daya: kapan musim hujan dimulai, seberapa banyak hujannya dibanding biasa, dan kapan puncaknya.")+`
<h2 class="sec-title">Ringkasan</h2>${ringkasPMH()}
${petaTab("pmh",[
 {lab:"Awal musim",g:[["pmh-awal-pb","Prediksi awal musim hujan 2026/2027, Provinsi Papua Barat"]],ket:"Warna menunjukkan dasarian awal musim hujan tiap ZOM. Wilayah berarsir adalah Tipe 1 Musim (Non-ZOM)."},
 {lab:"Dibanding normal",g:[["pmh-banding-pb","Perbandingan awal musim hujan terhadap normal, Papua Barat"],["pmh-banding-pbd","Perbandingan awal musim hujan terhadap normal, Papua Barat Daya"]],ket:"Hijau berarti datang lebih cepat (maju), kuning sama, cokelat lebih lambat (mundur) dibanding rata-rata 1991–2020."},
 {lab:"Sifat",g:[["pmh-sifat-pb","Prediksi sifat musim hujan 2026/2027, Papua Barat"],["pmh-sifat-pbd","Prediksi sifat musim hujan 2026/2027, Papua Barat Daya"]],ket:"Hijau Atas Normal (lebih basah), kuning Normal, cokelat Bawah Normal (lebih kering)."},
 {lab:"Puncak",g:[["pmh-puncak-pb","Prediksi puncak musim hujan 2026/2027, Papua Barat"],["pmh-puncak-pbd","Prediksi puncak musim hujan 2026/2027, Papua Barat Daya"]],ket:"Warna menunjukkan bulan puncak musim hujan tiap ZOM."}])}
${(()=>{const bl=v=>{const m=String(v||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(?:\s+I{1,3})?\s+(\d{4})/i);return m?{k:+m[2]*12+NM_BLN_PMH.map(x=>x.toLowerCase()).indexOf(m[1].toLowerCase()),t:besarAwal(m[1].toLowerCase())+" "+m[2]}:null};
 const L=ZOM11.map(z=>({...z,b:bl((ZOM_PMH[z.no]||[])[0])})).filter(z=>z.b),mn=Math.min(...L.map(z=>z.b.k)),Z=L.filter(z=>z.b.k===mn);if(!Z.length)return "";
 return `<div class="panel"><div class="panel-head"><span>Awal Musim Hujan Paling Dekat: ${esc(Z[0].b.t)} (${Z.length} ZOM)</span></div><div class="panel-body">${tbl(["ZOM","Wilayah"],Z.map(z=>[`<b>${z.no}</b>`,z.wil]))}</div></div>`})()}
<div class="panel"><div class="panel-head"><span>Perbandingan Awal Musim Hujan terhadap Normal</span></div><div class="panel-body">
<div class="grid3 bd">${["Maju","Sama","Mundur"].map(b=>{const z=ZOM11.filter(x=>x.banding===b);return `<div class="card"><span class="pill ${PILL_B[b]}">${b} · ${z.length} ZOM</span><p style="margin:10px 0 0;font-size:14px">${b==="Maju"?"Hujan datang lebih cepat dari biasanya.":b==="Sama"?"Hujan datang seperti biasanya.":"Hujan datang lebih lambat dari biasanya."}</p>${chipZom(z.map(x=>x.no))}</div>`}).join("")}</div><p class="note ketukzom">👆 Ketuk nomor ZOM untuk melihat daftar distriknya.</p></div></div>
<div class="panel"><div class="panel-head"><span>Sifat Musim Hujan 2026/2027 (21 ZOM)</span></div><div class="panel-body">
<div class="grid3 bd">${["Atas Normal","Normal","Bawah Normal"].map(k=>{const z=[...ZOM11.filter(x=>x.sifat===k).map(x=>x.no),...NONZOM.filter(n=>((ZOM_PMH[n]||[])[2]||SIFAT_NONZOM[n])===k)].sort();return `<div class="card"><span class="pill ${PILL_S[k]}">${k} · ${z.length} ZOM</span><p style="margin:10px 0 0;font-size:14px">${k==="Atas Normal"?"Hujan selama musim hujan lebih banyak dari biasanya (lebih dari 115%).":k==="Normal"?"Hujan selama musim hujan seperti biasanya (85–115%).":"Hujan selama musim hujan lebih sedikit dari biasanya (kurang dari 85%)."}</p>${chipZom(z)}</div>`}).join("")}</div><p class="note ketukzom">👆 Ketuk nomor ZOM untuk melihat daftar distriknya.</p></div></div>
${pmhTabelZom()}
<h2 class="sec-title" style="margin-top:26px">Rekomendasi per Sektor</h2>
<div class="grid3 reko">${[["Pangan (pertanian dan perkebunan)","Sesuaikan jadwal tanam dengan kondisi hujan dan ketersediaan air. Jaga saluran air di lahan, kendalikan hama, serta siapkan pengeringan dan penyimpanan hasil panen yang terlindung."],
 ["Pariwisata","Sesuaikan jadwal wisata alam dan bahari dengan informasi cuaca. Utamakan keselamatan pengunjung, siapkan kegiatan pengganti, dan tunda perjalanan saat cuaca buruk."],
 ["Sumber daya air","Manfaatkan hujan untuk menambah cadangan air. Jaga kebersihan sumber dan penampungan air, serta atur pemakaian agar kebutuhan rumah tangga dan pertanian tetap terpenuhi."],
 ["Kesehatan","Jaga kebersihan lingkungan dan air minum. Cegah gigitan nyamuk dan perkuat kesiapan layanan kesehatan menghadapi malaria, demam berdarah, dan diare selama musim hujan."],
 ["Kebencanaan","Bersihkan saluran air dan siapkan jalur evakuasi. Tingkatkan kewaspadaan terhadap banjir, longsor, dan angin kencang, terutama saat hujan lebat."],
 ["Energi","Pastikan jaringan listrik dan pasokan bahan bakar siap menghadapi cuaca buruk. Siapkan listrik cadangan untuk rumah sakit, layanan air bersih, dan fasilitas penting lainnya."]].map(([j,t])=>`<div class="card"><b>${j}</b><p style="margin:6px 0 0;color:var(--muted);font-size:14px">${t}</p></div>`).join("")}</div>
<div class="card prose" style="margin-top:16px"><b>Imbauan</b><p style="margin:6px 0 0">Waspadai masa peralihan musim yang dapat memicu cuaca ekstrem: hujan lebat dalam waktu singkat disertai angin kencang dan petir. Jangan mudah terpengaruh isu yang tidak bertanggung jawab, dan cari informasi dari instansi berwenang.</p></div>
${awam("Cara membaca prediksi musim",[
 "<b>ZOM (Zona Musim)</b> adalah wilayah yang pola hujannya punya perbedaan jelas antara musim hujan dan kemarau. Satu ZOM bisa mencakup beberapa distrik dari beberapa kabupaten. Cari distrik Anda di tabel pada halaman <a href=\"#zona-musim\">Zona Musim</a>.",
 "<b>Awal musim hujan</b> adalah saat hujan mulai turun rutin: dalam 10 hari hujan mencapai 50 mm atau lebih, dan kondisi itu berlanjut pada dua periode 10 hari berikutnya.",
 "<b>Maju</b> berarti musim hujan datang lebih cepat dari biasanya, <b>Mundur</b> lebih lambat, <b>Sama</b> seperti biasanya. Pembandingnya adalah rata-rata 1991–2020.",
 "<b>Atas Normal</b> berarti hujan lebih banyak dari rata-rata 1991–2020 (lebih dari 115%), <b>Normal</b> 85–115% dari rata-rata, <b>Bawah Normal</b> kurang dari 85% dari rata-rata.",
 "<b>Puncak musim hujan</b> adalah bulan dengan hujan paling banyak, saat risiko banjir dan longsor paling tinggi."])}
${srcPMH()}`;

P["hujan-bulanan"]=()=>head("Iklim >> Hujan Bulanan","Analisis &amp; Prakiraan Hujan Bulanan","Analisis curah hujan dan sifat hujan September 2026 serta prakiraan November–Desember 2026 untuk Papua Barat dan Papua Barat Daya.")+`
<div class="panel"><div class="panel-head"><span>Analisis September 2026</span><div class="tabs" id="tabsA"><button class="on" data-t="pb">Papua Barat</button><button data-t="pbd">Papua Barat Daya</button></div></div>
<div class="panel-body" id="bodyA"></div></div>
<div class="panel"><div class="panel-head"><span>Prakiraan Curah Hujan &amp; Sifat Hujan</span><div class="tabs" id="tabsF"><button class="on" data-t="nov">November 2026</button><button data-t="des">Desember 2026</button></div></div>
<div class="panel-body" id="bodyF"></div></div>
<div class="panel"><div class="panel-head"><span>Curah Hujan Ekstrem Harian · September 2026</span></div><div class="panel-body">
<p style="margin-top:0">Dari pemantauan 30 pos hujan, tercatat 4 kejadian hujan lebat (≥ 50 mm/hari). Hujan sangat lebat (≥ 100 mm/hari) tidak tercatat di kedua provinsi.</p>${tbl(["Pos Hujan","Kategori"],[["Prafi","Lebat"],["Tisai SP 5","Lebat"],["Klamalu","Lebat"],["Masni VII","Lebat"]])}
<div class="legend"><span><i style="background:#c8a15a"></i>Rendah 0–100 mm</span><span><i style="background:#7fbf6a"></i>Menengah 101–300 mm</span><span><i style="background:#2f8fd1"></i>Tinggi 301–500 mm</span><span><i style="background:#1f3f7a"></i>Sangat Tinggi &gt; 500 mm</span></div>
${srcBul()}</div></div>
${awam("Cara membaca data hujan bulanan",[
 "<b>Analisis</b> menjelaskan hujan yang <i>sudah</i> turun (bulan lalu). <b>Prakiraan</b> adalah perkiraan hujan untuk bulan-bulan berikutnya.",
 "<b>Curah hujan</b> diukur dalam milimeter (mm). Hujan 1 mm berarti air setinggi 1 mm menggenang di permukaan datar, atau 1 liter air pada setiap 1 meter persegi.",
 "<b>Rendah</b> (0–100 mm sebulan): hujan jarang, tanah cepat kering. <b>Menengah</b> (101–300 mm): hujan cukup. <b>Tinggi</b> (301–500 mm) dan <b>Sangat Tinggi</b> (lebih dari 500 mm): hujan sangat sering, waspada banjir dan longsor.",
 "<b>Sifat hujan</b> membandingkan jumlah hujan dengan rata-rata 30 tahun (1991–2020) bulan yang sama di tempat itu: <b>Bawah Normal</b> kurang dari 85% rata-rata, <b>Normal</b> 85–115%, <b>Atas Normal</b> lebih dari 115%. Contoh: bila normal September di suatu wilayah 250 mm, hujan 180 mm tergolong <b>Menengah</b> (jumlahnya cukup) tetapi <b>Bawah Normal</b> (kurang dari 213 mm, lebih kering dari biasanya di sana). Angka normal tiap kabupaten ada di <a href=\"#wilayah\">Info Wilayah Saya</a>.",
 "<b>Hujan lebat</b> adalah hujan 50 mm atau lebih dalam sehari. Hujan seperti ini bisa menyebabkan genangan dan banjir lokal.",
 "Pada <b>peta</b>, warna cokelat dan kuning berarti hujan sedikit, hijau cukup, dan biru banyak. Wilayah kita ada di kepala burung Papua."])}`;
const HB={
 pb:kgrid("Papua Barat · Curah hujan",D.sepPB)+legend(["Rendah","Menengah","Tinggi","Sangat Tinggi"])+'<p>Sifat hujan September di Papua Barat didominasi <b>Bawah Normal</b>, lebih kering dari biasanya. Tidak ada wilayah dengan curah hujan Tinggi atau Sangat Tinggi.</p>',
 pbd:kgrid("Papua Barat Daya · Curah hujan dan sifat hujan",D.sepPBD)+legend(["Rendah","Bawah Normal"])+'<p>Seluruh Papua Barat Daya mendapat curah hujan Rendah (0–100 mm) dengan sifat Bawah Normal.</p>',
 nov:kgrid("Papua Barat",D.novPB)+kgrid("Papua Barat Daya",D.novPBD)+legend(["Menengah","Tinggi","Atas Normal"])+'<p>Sifat hujan November di Papua Barat Daya didominasi <b>Normal</b>.</p>',
 des:kgrid("Papua Barat",D.desPB)+kgrid("Papua Barat Daya",D.desPBD)+legend(["Menengah","Normal","Normal – Atas Normal"])
};

P["hari-tanpa-hujan"]=()=>head("Iklim >> Hari Tanpa Hujan","Monitoring Hari Tanpa Hujan (HTH)","Jumlah hari berturut-turut tanpa hujan (curah hujan &lt; 1 mm) di pos pengamatan hujan Papua Barat dan Papua Barat Daya, dihitung tiap akhir dasarian.")+`
<div class="panel"><div class="panel-head"><span>Peta Hari Tanpa Hujan Terbaru</span></div><div class="panel-body">${bmkgImg("hth","Peta monitoring hari tanpa hujan berturut-turut di Indonesia","Setiap titik adalah satu pos hujan. Hijau berarti masih sering hujan, kuning hingga cokelat makin lama tidak hujan, merah berarti lebih dari 60 hari tanpa hujan. Lihat wilayah Papua Barat dan Papua Barat Daya di bagian kanan atas peta (Kepala Burung).")}</div></div>
<div class="panel"><div class="panel-head"><span>Jumlah Pos Hujan per Kategori HTH · September 2026</span></div><div class="panel-body">${hthChart()}
<p>Deret hari kering memanjang sepanjang September. Pada Dasarian III, 10 pos masuk kategori Panjang dan 1 pos mencapai Kekeringan Ekstrem.</p>
${srcBul()}</div></div>
${awam("Cara membaca hari tanpa hujan",[
 "<b>Hari tanpa hujan</b> adalah jumlah hari berturut-turut tanpa hujan berarti (kurang dari 1 mm) di satu pos pengamatan.",
 "<b>Dasarian</b> adalah periode 10 harian: Dasarian I tanggal 1–10, Dasarian II tanggal 11–20, Dasarian III tanggal 21 sampai akhir bulan.",
 "Angka di tabel menunjukkan <b>berapa pos hujan</b> yang masuk tiap kategori. Makin banyak pos di kategori Panjang ke bawah, makin luas wilayah yang kering.",
 "Kategori menurut lamanya tidak hujan: <b>Sangat Pendek</b> 1–5 hari, <b>Pendek</b> 6–10 hari, <b>Menengah</b> 11–20 hari, <b>Panjang</b> 21–30 hari, <b>Sangat Panjang</b> 31–60 hari, dan <b>Kekeringan Ekstrem</b> lebih dari 60 hari.",
 "Kategori <b>Panjang</b> (21–30 hari) ke atas perlu diwaspadai: tanaman mulai kekurangan air, sumur dan sumber air bisa menyusut, dan risiko kebakaran lahan meningkat."])}`;

P["peringatan-kekeringan"]=()=>head("Iklim >> Kekeringan","Kekeringan Meteorologis &amp; SPI","Indeks Presipitasi Terstandardisasi (SPI) membandingkan curah hujan dengan kondisi klimatologisnya untuk menilai tingkat kekeringan.")+`
<div class="panel"><div class="panel-head"><span>Peringatan Dini Kekeringan Meteorologis · ${escH(periodePer("kekeringan"))}</span></div><div class="panel-body">${kotakPer("kekeringan")||`<div class="okbox"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" style="flex-shrink:0"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg><div><b>Tidak ada kabupaten/kota di Papua Barat dan Papua Barat Daya yang berstatus Waspada, Siaga, maupun Awas.</b><span style="color:var(--muted);font-size:14px">Tidak ada peringatan dini kekeringan. ${escH(periodePer("kekeringan"))}.</span></div></div>${statusPusat("kekeringan")?"":perLain("kekeringan")}`}${warnTable("kekeringan")}<div style="margin-top:16px">${bmkgImg("pdkm","Peta peringatan dini kekeringan meteorologis Indonesia","Peta peringatan dini kekeringan meteorologis seluruh Indonesia.")}</div></div></div>
<div class="panel"><div class="panel-head"><span>SPI September 2026 per Kabupaten/Kota</span></div><div class="panel-body">${kgrid("Papua Barat",D.spiPB)}${kgrid("Papua Barat Daya",D.spiPBD)}${legend(["Normal – Agak Kering","Agak Kering","Kering – Sangat Kering"])}</div></div>
<div class="card prose"><h3 style="margin-top:0">Kesimpulan</h3>
${TH("kekeringan_kesimpulan","")?`<p>${esc(TH("kekeringan_kesimpulan",""))}</p>`:`<p>Kondisi kekeringan meteorologis mendominasi kedua provinsi pada September 2026. Defisit curah hujan ini perlu diwaspadai bila berlanjut, apalagi El Niño sangat kuat diprediksi bertahan hingga awal 2027.</p>`}
<h3>Tingkat Peringatan Dini Kekeringan BMKG</h3><ul>
<li><span class="pill warn">Waspada</span> Sudah 31 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit (kurang dari 20 mm dalam 10 hari ke depan) minimal 70%.</li>
<li><span class="pill siaga">Siaga</span> Sudah 61 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit minimal 70%.</li>
<li><span class="pill bad">Awas</span> Sudah 61 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit minimal 90%.</li></ul><p class="note">Sumber: kriteria peringatan dini kekeringan meteorologis BMKG.</p></div>
${awam("Cara membaca SPI",[
 "<b>SPI</b> membandingkan hujan yang turun dengan hujan yang biasa turun di tempat yang sama, berdasarkan catatan puluhan tahun.",
 "<b>Normal</b> berarti hujan sesuai kebiasaan. <b>Agak Kering</b>, <b>Kering</b>, dan <b>Sangat Kering</b> berarti hujan makin jauh di bawah kebiasaan. Sebaliknya <b>Agak Basah</b> hingga <b>Sangat Basah</b> berarti hujan lebih banyak dari biasanya.",
 "Pada peta SPI, warna merah dan oranye berarti kering, hijau normal, biru basah. <b>SPI 1 bulan</b> melihat hujan sebulan terakhir, <b>SPI 3 bulan</b> melihat tiga bulan terakhir (menggambarkan kekeringan yang lebih lama).",
 "Wilayah <b>Kering</b> hingga <b>Sangat Kering</b> perlu menghemat air, menunda tanam tanaman yang butuh banyak air, dan mewaspadai kebakaran hutan dan lahan."])}`;

P["peringatan-hujan-tinggi"]=()=>head("Iklim >> Peringatan Hujan Tinggi","Peringatan Dini Curah Hujan Tinggi","Peringatan berbasis prakiraan curah hujan dasarian untuk antisipasi banjir dan longsor, sampai tingkat kecamatan.")+`
<div class="panel"><div class="panel-head"><span>Status ${escH(periodePer("hujan"))}</span></div><div class="panel-body">
${kotakPer("hujan")||`<div class="okbox"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" style="flex-shrink:0"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg><div><b>Tidak ada kabupaten/kota maupun kecamatan di Papua Barat dan Papua Barat Daya yang berstatus Waspada, Siaga, maupun Awas.</b><span style="color:var(--muted);font-size:14px">${esc(TH("hujan_tinggi_nihil"))}</span></div></div>`}
${warnTable("hujan")}<div class="petadua"><figure class="map petazoom"><div class="pzkotak"><img src="${LIVE.pdcht}" alt="Peta peringatan dini curah hujan tinggi, diperbesar pada Papua Barat dan Papua Barat Daya" loading="lazy" data-galat="sembunyi:.petazoom"><span class="pzlogo">Sumber: BMKG</span></div><figcaption><b>Diperbesar: Papua Barat &amp; Papua Barat Daya.</b> Hijau = tidak ada peringatan, kuning = Waspada, oranye = Siaga, merah = Awas. Garis tipis = batas kabupaten. Potongan dari peta BMKG Pusat.</figcaption></figure>
<div>${bmkgImg("pdcht","Peta peringatan dini curah hujan tinggi Indonesia","Peta peringatan dini curah hujan tinggi seluruh Indonesia.")}</div></div></div></div>
${awam("Cara membaca status peringatan",[
 "<b>Waspada</b>: hujan dalam 10 hari ke depan diprakirakan lebih dari 150 mm. Mulai bersihkan saluran air dan pantau informasi.",
 "<b>Siaga</b>: diprakirakan lebih dari 200 mm. Siapkan rencana evakuasi bila tinggal di dekat sungai atau lereng.",
 "<b>Awas</b>: diprakirakan lebih dari 300 mm. Risiko banjir dan longsor tinggi, ikuti arahan BPBD setempat.",
 "Tanda <b>–</b> pada tabel berarti tidak ada wilayah dengan status tersebut."])}
${(()=>{const c=TH("hujan_tinggi_catatan","").split(/\n+/).filter(Boolean),ek=bagIK("ekstrem");const j=c.length?c[0]:"Catatan "+(ek.bulan||""),t=c.length?c.slice(1).join(" "):ek.teks||"";return t?`<div class="card prose" style="margin-top:22px"><h3 style="margin-top:0">${esc(j)}</h3><p>${esc(t)}</p>${c.length?"":srcIK("ekstrem")}</div>`:""})()}`;

/* ---- halaman ENSO, IOD & Dinamika Atmosfer: bagian MJO, gelombang, siklon ---- */
function dinamikaHTML(){const g=gelTerkini(),e=EN();
 const fase=g&&g.mjo&&g.mjo.fase,bar=`<div class="mjofase" aria-label="Fase MJO 1 sampai 8${fase?", saat ini fase "+fase:""}">${[1,2,3,4,5,6,7,8].map(n=>`<span class="${n===fase?"on":""}${n===5||n===6?" kita":""}">${n}</span>`).join("")}</div><p class="note" style="margin:2px 0 0">Fase 2–3 Samudra Hindia · 4–5 wilayah Indonesia (Benua Maritim) · 6–7 Pasifik barat. Garis kuning: fase yang paling berpengaruh ke Papua.</p>`;
 let isi;
 if(!g)isi=`<p>Rilisan BMKG Pusat terbaru tentang MJO dan gelombang atmosfer belum tersedia atau belum dapat dimuat di perangkat ini. Lihat langsung di <a href="https://www.bmkg.go.id/cuaca/potensi-hujan-sepekan" target="_blank" rel="noopener">Potensi Hujan Sepekan ke Depan (BMKG)</a>.</p>${bar}`;
 else{const w=wilTimur(g),sk=(g.siklon||[]).filter(x=>!x.habis),bb=g.bibit||[];
  isi=`<p class="kesimpulan"><span>Sepekan ke depan</span>${gelDekat(g)?`<b>Gelombang atmosfer aktif di ${escH(w||"Indonesia bagian timur")}</b>. Awan hujan lebih mudah terbentuk, sehingga hujan bisa lebih sering atau lebih deras selama beberapa hari.`:`<b>Gelombang atmosfer tidak diprediksi aktif di wilayah kita</b>${g.wil.length?" (aktif di "+escH(daftarJ(g.wil.slice(0,4)))+")":""}. Pengaruhnya ke Papua Barat dan Papua Barat Daya kecil.`}</p>
  <div class="dingrid">
   <div class="dinitem"><b>MJO (Madden-Julian Oscillation)</b><p>${escH(teksMjo(g))}.${fase?(g.dekatMjo?" Fase ini berada dekat wilayah kita dan cenderung menambah hujan.":" Fase ini jauh dari Papua, pengaruhnya ke wilayah kita kecil."):""}</p>${bar}</div>
   <div class="dinitem"><b>Gelombang ekuatorial</b><p>${g.gel.length?escH(namaGel(g))+" aktif"+(g.wil.length?" di "+escH(daftarJ(g.wil.slice(0,6))):"")+".":"Tidak disebutkan aktif dalam rilisan ini."}</p></div>
   <div class="dinitem"><b>Siklon &amp; bibit siklon tropis</b><p>${sk.length?sk.map(x=>"Siklon Tropis "+escH(x.nama)+(x.dekat?" (dekat wilayah timur Indonesia)":"")).join("; ")+". ":""}${bb.length?"Bibit siklon "+bb.map(x=>escH(x.kode)+" di "+escH(x.lokasi)).join("; ")+". Bibit siklon belum tentu menjadi siklon.":sk.length?"":"Tidak ada siklon atau bibit siklon yang disebutkan."}</p></div>
   ${g.sirk.length?`<div class="dinitem"><b>Sirkulasi siklonik</b><p>Terpantau di ${g.sirk.map(escH).join("; ")}. Pusaran angin ini mengumpulkan uap air dan bisa memicu hujan di sekitarnya.</p></div>`:""}
  </div>
  <p class="note">Sumber: BMKG Pusat, <a href="${escH(g.url)}" target="_blank" rel="noopener">${escH(potong(g.judul,140))}</a> (${tglPendek(g.tanggal)}). Informasi ini berlaku untuk wilayah luas, bukan per kabupaten, dan bukan peringatan dini.</p>`}
 return `<div class="panel dinamika" id="dinamika"><div class="panel-head"><span>Dinamika Atmosfer: MJO, Gelombang Kelvin &amp; Rossby</span>${g?'<span class="pill ok">BMKG Pusat</span>':""}</div><div class="panel-body">${isi}
 <p class="note">Peringatan resmi siklon tropis: <a href="https://tropicalcyclone.bmkg.go.id" target="_blank" rel="noopener">TCWC Jakarta (tropicalcyclone.bmkg.go.id)</a>. Prakiraan cuaca harian: <a href="https://www.bmkg.go.id" target="_blank" rel="noopener">bmkg.go.id</a> dan aplikasi InfoBMKG.</p></div></div>
 ${penjelasanHujan(e)}`}
function penjelasanHujan(e){const st=String(e.status||"");
 const judul=/El Niño/.test(st)?"Kenapa hujan bisa deras padahal sedang El Niño?":/La Niña/.test(st)?"Kenapa tetap ada hari kering padahal sedang La Niña?":"Apa yang mengatur hujan saat ENSO netral?";
 return awam(judul,[
  "<b>ENSO dan IOD bekerja dalam hitungan bulan</b>. Keduanya menggeser peluang hujan sebulan atau semusim, tetapi tidak menentukan hujan hari per hari.",
  "<b>MJO</b> adalah gugus awan besar yang bergerak dari Samudra Hindia ke timur melewati Indonesia hingga Pasifik dalam 30–60 hari. Saat melintas di dekat Papua (fase 5–6), hujan bisa meningkat selama 1–2 pekan.",
  "<b>Gelombang Kelvin</b> bergerak ke timur dan <b>gelombang Rossby Ekuatorial</b> bergerak ke barat di sepanjang khatulistiwa. Saat lewat, awan hujan lebih mudah tumbuh selama beberapa hari.",
  "<b>Siklon tropis dan sirkulasi siklonik</b> menarik uap air, sehingga bisa memicu hujan deras dan angin kencang di wilayah sekitarnya walau pusatnya jauh.",
  /El Niño/.test(st)?"Jadi, walau El Niño membuat hujan <b>secara rata-rata</b> berkurang, hujan deras tetap bisa terjadi saat MJO, gelombang atmosfer, atau sirkulasi siklonik sedang aktif, apalagi saat peralihan ke musim hujan.":/La Niña/.test(st)?"Jadi, walau La Niña membuat hujan secara rata-rata bertambah, beberapa hari kering tetap bisa terjadi saat MJO atau gelombang atmosfer sedang tidak aktif di wilayah kita.":"Saat ENSO netral, naik-turunnya hujan dari pekan ke pekan banyak ditentukan oleh MJO, gelombang atmosfer, dan kondisi lokal.",
  "<b>OLR</b> (radiasi gelombang panjang ke luar angkasa) dipakai BMKG untuk melihat awan: nilai OLR rendah berarti banyak awan tebal dan hujan.",
  "Untuk keputusan harian (melaut, bepergian, kegiatan luar ruang), pakai prakiraan cuaca dan peringatan dini cuaca BMKG, bukan informasi iklim ini."])}
P["enso-iod"]=()=>head("Iklim >> ENSO, IOD &amp; Dinamika Atmosfer","ENSO, IOD &amp; Dinamika Atmosfer","El Niño, La Niña, Indian Ocean Dipole, MJO, dan gelombang atmosfer yang memengaruhi curah hujan Papua Barat dan Papua Barat Daya.")+`
<div class="panel"><div class="panel-head"><span>Indeks ENSO dan IOD Terkini</span></div><div class="panel-body">${kesimpulanEnso()}${catatanBasi()}${idxChart()}</div></div>${trenDinat()}
${kartuEnsoIod()}
${panelElNino()}
${dinamikaHTML()}
<div class="grid3">
<div class="card"><b>El Niño</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">${esc(TH("def_elnino"))}</p></div>
<div class="card"><b>La Niña</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">${esc(TH("def_lanina"))}</p></div>
<div class="card"><b>IOD</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">${esc(TH("def_iod"))}</p></div>
</div><p class="note">Sumber: BMKG.</p>
${awam("Apa artinya bagi masyarakat?",[
 "<b>El Niño</b> adalah pemanasan laut di Samudra Pasifik. Bagi Papua Barat dan Papua Barat Daya, dampaknya biasanya hujan berkurang dan musim kering lebih panjang.",
 awamEnso(),
 "Kekuatannya dilihat dari angka indeks: <b>0,5–1,0</b> lemah, <b>1,0–1,5</b> moderat, <b>1,5–2,0</b> kuat, dan <b>lebih dari 2,0</b> sangat kuat. Angka minus dengan ukuran yang sama berarti La Niña.",
 "Pada grafik, batang yang melewati <b>garis putus-putus</b> berarti fenomena itu sedang terjadi.",
 "<b>IOD</b> dilihat dari indeks DMI: di atas +0,4 berarti IOD positif, di bawah −0,4 berarti IOD negatif. Pengaruh IOD terhadap hujan di Papua umumnya lebih kecil daripada El Niño atau La Niña.",
 "Yang perlu dilakukan: hemat air, tampung air hujan saat turun, atur jadwal tanam, dan jangan membakar lahan."])}`;

/* ---- Iklim Papua Barat & PBD ---- */
const CATATAN_BAWAAN=[
 ["14 Juli 2026","Suhu 39,2 °C, tertinggi se-Indonesia","BMKG mencatat suhu maksimum di Papua Barat menembus 39,2 °C saat El Niño menguat.","https://www.rctiplus.com/news/detail/inews/5428417/bmkg-catat-suhu-di-papua-barat-tembus-39-2-derajat-celsius--tertinggi-se-indonesia-"],
 ["27 Agustus 2026","Titik panas mulai menurun","Sebaran titik panas (hotspot) di Papua Barat berkurang setelah sempat meningkat di puncak kemarau.","https://papuatengah.antaranews.com/berita/88056/bmkg-sebaran-titik-panas-di-papua-barat-alami-penurunan"],
 ["September 2026","Hujan Rendah, Bawah Normal","Indeks SPI menunjukkan Kering hingga Sangat Kering di Teluk Bintuni, Fakfak, Kaimana, dan sebagian besar Papua Barat Daya. 10 pos hujan berstatus HTH Panjang pada dasarian III.","#peringatan-kekeringan"],
 ["Oktober 2026","Penaburan awan","Operasi modifikasi cuaca dengan bahan semai NaCl dilakukan untuk menambah hujan.","https://papuadalamberita.com/satu-ton-nacl-untuk-setiap-misi-penaburan-di-awan/"],
 ["14 Oktober 2026","Musim hujan akhir Oktober","Kami merilis Prediksi Musim Hujan 2026/2027: 6 ZOM memasuki musim hujan pada Oktober 2026.","#prakiraan-musim"],
 ["Nov 2026 – Jan 2027","Hujan Menengah, Atas Normal","Prakiraan kami untuk Papua Barat. El Niño diprediksi bertahan hingga awal 2027.","#hujan-bulanan"]
];
const POLA_HUJAN=[
 {k:"Monsunal-1",grup:"Monsunal",c:"#b45309",v:[295,275,290,285,240,215,212,175,190,240,272,312]},
 {k:"Monsunal-2",grup:"Monsunal",c:"#d97706",v:[312,290,268,225,150,110,82,58,70,133,228,292]},
 {k:"Ekuatorial-1",grup:"Ekuatorial",c:"#15803d",v:[268,220,245,270,235,210,210,205,225,278,315,318]},
 {k:"Ekuatorial-2",grup:"Ekuatorial",c:"#16a34a",v:[262,180,230,260,200,143,135,172,215,250,318,318]},
 {k:"Lokal-1",grup:"Lokal",c:"#c2410c",v:[242,238,245,265,278,368,368,268,262,230,207,240]},
 {k:"Lokal-2",grup:"Lokal",c:"#ea580c",v:[148,138,180,222,290,375,388,255,183,128,110,150]},
 {k:"Lokal-4",grup:"Lokal",c:"#9a3412",v:[150,128,162,190,225,310,250,180,130,118,160,155]}];
function grafikPola(i){const p=POLA_HUJAN[i],tot=p.v.reduce((a,b)=>a+b,0),pk=p.v.indexOf(Math.max(...p.v)),lo=p.v.indexOf(Math.min(...p.v)),kering=p.v.filter(v=>v<150).length;
 return `<div class="pgraf">${rc(W=>polaSvg(i,W),860)}
 <div class="pinfo"><div><span>Puncak hujan</span><b>${BLN_ID[pk]}</b></div><div><span>Paling kering</span><b>${BLN_ID[lo]}</b></div><div><span>Total setahun</span><b>±${tot.toLocaleString("id-ID")} mm</b></div><div><span>Bulan &lt; 150 mm</span><b>${kering?kering+" bulan":"Tidak ada"}</b></div></div></div>`}
function polaSvg(i,W){const p=POLA_HUJAN[i],H=Math.round(Math.min(280,Math.max(220,W*.36))),L=38,B=26,T=16,mx=400,bw=(W-L-10)/12,angka=bw>=24;
 const y=v=>T+(H-T-B)*(1-v/mx);
 return `${svgUk(W,H,"Grafik curah hujan bulanan pola "+p.k)}
 ${[0,100,200,300,400].map(g=>`<line x1="${L}" x2="${W-6}" y1="${y(g)}" y2="${y(g)}" stroke="var(--line)"/><text x="${L-6}" y="${y(g)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${g}</text>`).join("")}
 ${p.v.map((v,j)=>`<g class="pbar"><rect x="${L+Math.min(4,bw*.15)+j*bw}" y="${y(v)}" width="${bw-2*Math.min(4,bw*.15)}" height="${y(0)-y(v)}" rx="3" fill="${v<150?"#94a3b8":p.c}"/>${angka?`<text x="${L+j*bw+bw/2}" y="${y(v)-5}" text-anchor="middle" font-size="11" fill="var(--fg)">${v}</text>`:""}<text x="${L+j*bw+bw/2}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${W<480?BLN[j].slice(0,1):BLN[j]}</text><title>${BLN_ID[j]}: ${v} mm</title></g>`).join("")}
 <line x1="${L}" x2="${W-6}" y1="${y(150)}" y2="${y(150)}" stroke="#b91c1c" stroke-dasharray="5 4" stroke-width="1.5"/><text x="${W-8}" y="${y(150)-5}" text-anchor="end" font-size="11.5" fill="#b91c1c" font-weight="700" paint-order="stroke" stroke="var(--surface)" stroke-width="4">150 mm</text></svg>`}
function zomPerKab(){const m={};ZOM11.forEach(z=>{(z.wil.match(/Kab\. [^(;]+/g)||[]).forEach(k=>{k=k.trim();(m[k]=m[k]||[]).push(z.no)})});
 return Object.entries(m).sort((a,b)=>a[0].localeCompare(b[0]))}
P["iklim-papua-barat"]=()=>head("Iklim >> Iklim Papua Barat","Iklim Papua Barat &amp; Papua Barat Daya","Gambaran iklim wilayah layanan kami: pengendali iklim, pola hujan, pembagian zona musim, dan catatan iklim sepanjang 2026.")+`
<div class="istat" data-sunting="ik-iklimpb|[name=th_iklim_angka]">${barisTH("iklim_angka").map(([v,k,d])=>`<div><b>${esc(v)}</b><span>${esc(k||"")}</span><small>${esc(d||"")}</small></div>`).join("")}</div>

<section class="sec" style="margin-top:34px"><div class="sechead"><div><span class="eyebrow">Pengendali Iklim</span><h2>Apa yang Mengatur Hujan di Wilayah Kami</h2></div></div>
<div class="driver">${[
 [I.wave,"Monsun Asia–Australia","Monsun barat (Desember–Februari) membawa udara basah dan hujan ke wilayah berpola monsunal. Monsun timur (Juni–Agustus) membawa udara kering dari Australia."],
 [I.cloud,"ITCZ","Daerah pertemuan angin pasat bergeser mengikuti matahari dan melintasi wilayah kami dua kali setahun. Inilah sebab pola ekuatorial punya dua puncak hujan."],
 [I.sun,"ENSO (El Niño / La Niña)","Pesisir utara berhadapan langsung dengan Samudra Pasifik. El Niño mengurangi hujan, La Niña menambah hujan. El Niño 2026 termasuk yang terkuat dalam pencatatan."],
 [I.drop,"IOD","Suhu muka laut Samudra Hindia. IOD positif cenderung mengurangi hujan, terutama di wilayah barat dan selatan."],
 [I.cal,"MJO","Gelombang awan dan hujan yang bergerak dari barat ke timur dengan siklus 30–60 hari. Saat aktif di sekitar Papua, peluang hujan lebat meningkat."],
 [I.map,"Topografi Pegunungan Arfak","Pegunungan memaksa udara naik sehingga terbentuk awan dan hujan lokal. Lereng yang menghadap angin lebih basah dari lereng di baliknya."],
 [I.leaf,"Suhu Muka Laut Lokal","Laut di sekitar Raja Ampat, Teluk Cenderawasih, dan Laut Arafura yang hangat menambah uap air dan memperkuat hujan pesisir."]
].map(([ico,t,d])=>`<div class="drv">${ic(ico)}<b>${t}</b><p>${d}</p></div>`).join("")}</div></section>

${panelNormalKab()}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Pola Hujan</span><h2>Hujan Rata-rata Bulanan per Pola</h2></div></div>
<div class="panel"><div class="panel-head"><span>Pilih pola hujan</span><div class="tabs" id="tabsPola">${POLA_HUJAN.map((p,i)=>`<button type="button" class="${i?"":"on"}" data-i="${i}">${p.k}</button>`).join("")}</div></div>
<div class="panel-body"><div id="polaBox">${grafikPola(0)}</div>
<p class="note">Nilai dibaca kira-kira dari grafik tipe hujan ZOM periode 1991–2020 pada Paparan FGD Prediksi Musim Hujan 2026/2027, sehingga bersifat perkiraan. Batang abu-abu menandai bulan dengan hujan di bawah 150 mm, batas yang kami pakai untuk musim kemarau.</p></div></div>
<div class="grid3">
 <div class="card"><span class="pill" style="background:#fef9c3;color:#854d0e">Monsunal</span><p style="margin:10px 0 0;font-size:14px">Satu puncak sekitar Desember–Februari, paling kering Juli–September. Musim hujan dan kemarau jelas.</p></div>
 <div class="card"><span class="pill" style="background:#dcfce7;color:#166534">Ekuatorial</span><p style="margin:10px 0 0;font-size:14px">Dua puncak, sekitar April dan November–Desember. Hujan cukup banyak hampir sepanjang tahun.</p></div>
 <div class="card"><span class="pill" style="background:#ffedd5;color:#9a3412">Lokal</span><p style="margin:10px 0 0;font-size:14px">Puncak di Juni–Juli, kebalikan dari monsunal. Dipengaruhi pegunungan dan laut setempat.</p></div></div>
</section>

<section class="sec"><div class="sechead"><div><span class="eyebrow">Zona Musim per Kabupaten</span><h2>Di ZOM Mana Wilayah Anda?</h2></div><a class="more" href="#zona-musim">Peta &amp; daftar ZOM →</a></div>
<div class="panel"><div class="panel-body">${tbl(["Kabupaten","Daerah Zona Musim (ZOM)"],zomPerKab().map(([k,z])=>[`<b>${k}</b>`,z.map(n=>`<a class="zchip" href="#zona-musim">ZOM ${n}</a>`).join(" ")]))}
<p class="note">Kabupaten yang tidak tercantum (misalnya Kota Sorong, Kab. Sorong, Sorong Selatan, Maybrat) seluruhnya atau sebagian besar berada di Daerah Non Zona Musim (ZOM 641–645, 647, 648, 652–654) dengan hujan hampir sepanjang tahun.</p></div></div></section>

<section class="sec"><div class="sechead"><div><span class="eyebrow">Catatan Iklim</span><h2>${esc(TH("iklim_catatan_judul"))}</h2></div><a class="more" href="#berita">Berita terkait →</a></div>
<ol class="tline" data-sunting="ik-iklimpb|[name=th_iklim_catatan]">${(barisTH("iklim_catatan","").length?barisTH("iklim_catatan","").map(x=>[esc(x[0]),esc(x[1]||""),esc(x[2]||""),/^(https:\/\/|#)/.test(x[3]||"")?escH(x[3]):"#iklim-papua-barat"]):CATATAN_BAWAAN).map(([t,j,d,u])=>`<li><time>${t}</time><b>${j}</b><p>${d} <a href="${u}"${u.startsWith("http")?' target="_blank" rel="noopener"':""}>${u.startsWith("http")?"Sumber ↗":"Lihat →"}</a></p></li>`).join("")}</ol></section>

<section class="sec"><div class="sechead"><div><span class="eyebrow">Pengamatan</span><h2>Sumber Data Iklim</h2></div></div>
<div class="grid2"><div class="card prose"><h3 style="margin-top:0">Stasiun Pengamatan Suhu</h3><ul>
<li>Stasiun Meteorologi Domine Eduard Osok, Sorong</li><li>Stasiun Meteorologi Rendani, Manokwari</li><li>Stasiun Meteorologi Utarom, Kaimana</li><li>Stasiun Meteorologi Siboru, Fakfak</li></ul></div>
<div class="card prose"><h3 style="margin-top:0">Jaringan Kami</h3><p>Pos hujan kerja sama di seluruh kabupaten, ditambah ${ALAT.filter(a=>a.jenis==="AWS").length} AWS dan ${ALAT.filter(a=>a.jenis==="ARG").length} ARG yang mengirim data langsung dari lapangan.</p><p><a href="#peralatan">Lihat data alat terkini →</a></p></div></div></section>
${awam("Cara membaca grafik pola hujan",[
 "Pilih nama pola di atas grafik. Cari pola wilayah Anda di tabel ZOM per kabupaten atau di peta <a href=\"#zona-musim\">Zona Musim</a>.",
 "Tinggi batang adalah rata-rata curah hujan bulan itu selama 1991–2020. Angka di atas batang dalam milimeter.",
 "Garis merah putus-putus adalah 150 mm. Bulan di bawah garis (batang abu-abu) biasanya termasuk musim kemarau.",
 "Rata-rata bukan ramalan. Pada tahun El Niño seperti 2026, hujan bisa jauh di bawah angka ini."])}
<p class="note">Sumber: data normal curah hujan 1991–2020, Stasiun Klimatologi Papua Barat.</p>`;

P["zona-musim"]=()=>head("Iklim >> Zona Musim","Zona Musim (ZOM) Papua Barat & Papua Barat Daya","Pembagian wilayah berdasarkan pola hujan rata-rata periode 1991–2020. Dipakai sebagai dasar prediksi musim hujan dan musim kemarau.")+`
<div class="grid3" style="margin-bottom:22px">
 <div class="card"><div class="prov" style="margin:0">Total</div><div style="font-size:30px;font-weight:800">21 ZOM</div><div style="color:var(--muted);font-size:13.5px">ZOM 636 – 656</div></div>
 <div class="card"><div class="prov" style="margin:0">Daerah Zona Musim</div><div style="font-size:30px;font-weight:800">11 ZOM</div><div style="color:var(--muted);font-size:13.5px">Musim hujan dan kemarau jelas berbeda</div></div>
 <div class="card"><div class="prov" style="margin:0">Daerah Non Zona Musim</div><div style="font-size:30px;font-weight:800">10 ZOM</div><div style="color:var(--muted);font-size:13.5px">Tipe 1 Musim: hujan hampir sepanjang tahun</div></div>
</div>
<div class="panel"><div class="panel-head"><span>Peta Tipe Hujan Zona Musim 1991–2020</span></div><div class="panel-body">
<figure class="map"><img src="${GBR["zom-tipe-hujan"]}" alt="Peta tipe hujan zona musim periode 1991-2020 Papua Barat dan Papua Barat Daya, dengan grafik curah hujan bulanan tiap pola" loading="lazy"><figcaption>Peta tipe hujan dan grafik curah hujan bulanan rata-rata tiap pola. Garis mendatar di grafik adalah batas 150 mm/bulan. Sumber: Stasiun Klimatologi Papua Barat.</figcaption></figure></div></div>
<div class="grid3" style="margin-bottom:22px">
 <div class="card"><span class="pill" style="background:#fef9c3;color:#854d0e">Pola Monsunal</span><p style="margin:10px 0 0;font-size:14px">Satu puncak hujan sekitar Desember–Februari dan hujan paling sedikit sekitar Juli–September. Musim hujan dan kemarau terlihat jelas.</p></div>
 <div class="card"><span class="pill" style="background:#dcfce7;color:#166534">Pola Ekuatorial</span><p style="margin:10px 0 0;font-size:14px">Dua puncak hujan, sekitar April dan November–Desember. Hujan cukup banyak hampir sepanjang tahun.</p></div>
 <div class="card"><span class="pill" style="background:#ffedd5;color:#9a3412">Pola Lokal</span><p style="margin:10px 0 0;font-size:14px">Puncak hujan di pertengahan tahun, sekitar Juni–Juli, kebalikan dari pola monsunal. Dipengaruhi kondisi setempat seperti pegunungan dan laut.</p></div>
</div>
<div class="panel"><div class="panel-head"><span>Daftar 11 Daerah Zona Musim</span></div><div class="panel-body">
${(()=>{const t=zomTerbaru(),nz=new Set(NONZOM);const z=t.zom.filter(x=>!nz.has(+x.no));return catPMHU()+tbl(["ZOM","Wilayah (kabupaten dan distrik)","Awal "+esc(t.judul),"Dibanding normal","Sifat"],z.map(x=>[`<b>${esc(x.no)}</b>`,esc(x.wil),(esc(x.awal)||"–")+semulaHTML(x),x.banding?`<span class="pill ${pillBanding(x.banding)}">${esc(x.banding)}</span>`:"–",x.sifat?`<span class="pill ${pillSifat(x.sifat)}">${esc(x.sifat)}</span>`:"–"]))})()}
<p class="note">Rincian awal, sifat, dan puncak musim ada di halaman <a href="#prakiraan-musim">Prediksi Musim Hujan</a>. Cari wilayah Anda lebih cepat lewat <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>
<div class="panel"><div class="panel-head"><span>10 Daerah Non Zona Musim (Tipe 1 Musim)</span></div><div class="panel-body">
<p style="margin-top:0">Wilayah ini tidak memiliki perbedaan jelas antara musim hujan dan kemarau, sehingga awal musim tidak ditentukan. Sifat hujannya tetap diprediksi.</p>
${(()=>{const t=zomTerbaru(),sf=n=>{const z=t.zom.find(x=>+x.no===n);return (z&&z.sifat)||(ZOM_PMH[n]||[])[2]||SIFAT_NONZOM[n]||"–"};return tbl(["ZOM","Wilayah (kabupaten dan distrik)","Sifat "+esc(t.judul)],NONZOM.map(n=>[`<b>${n}</b>`,esc(WIL_NONZOM[n]||"–"),`<span class="pill ${pillSifat(sf(n))}">${esc(sf(n))}</span>`+(SIFAT_NONZOM[n]&&sf(n)!==SIFAT_NONZOM[n]?`<br><small class="semula" title="Prakiraan sebelum diperbarui">semula ${esc(SIFAT_NONZOM[n])}</small>`:"")]))})()}
${TH("zom_catatan")?`<p class="note">${esc(TH("zom_catatan"))}</p>`:""}</div></div>
${awam("Cara membaca zona musim",[
 "Cari distrik tempat Anda tinggal di tabel, lalu lihat nomor ZOM-nya. Nomor itu dipakai di semua peta prediksi musim.",
 "Satu distrik bisa masuk lebih dari satu ZOM karena batas ZOM mengikuti pola hujan, bukan batas administrasi.",
 "<b>Tipe 1 Musim</b> berarti hujan turun hampir sepanjang tahun tanpa musim kemarau yang jelas."])}
${srcPMH()}`;

/* ===================================================================== PERMINTAAN PELAYANAN DATA (publik)
   Formulir permohonan + surat PDF -> nomor tiket; cek status dengan nomor tiket atau nomor HP.
   Isian disimpan di memori (PD), jadi tidak hilang bila halaman digambar ulang otomatis. ===================================================================== */
const PD_KAT={A:"Kegiatan penanggulangan bencana",B:"Kegiatan keagamaan",C:"Kegiatan sosial dan kemanusiaan",D:"Kegiatan pertahanan dan keamanan",E:"Pendidikan dan penelitian non-komersial",F:"Kegiatan pemerintahan pusat atau daerah",G:"Pelayanan informasi dengan tarif PNBP (berbayar)"};
const PD_ST={diterima:"Diterima",antre:"Antre diproses",bayar:"Menunggu pembayaran",diproses:"Sedang diproses",lengkapi:"Perlu dilengkapi",cekbayar:"Bukti pembayaran diterima",selesai:"Selesai",ditolak:"Ditolak"};
const PD_JENIS=["Curah hujan harian","Curah hujan bulanan","Suhu udara","Kelembapan udara","Angin","Hari tanpa hujan","Analisis / prakiraan hujan","Prediksi musim"];
const PD={tab:"baru",isi:{},files:{},kirim:false,galat:"",baru:null,q:"",hasil:null,cari:false,pesan:"",lengkapi:{hp:"",files:{}},bayar:{hp:"",file:null},t0:0};
const PD_DOK={surat:"Surat permohonan / pengantar",ktp:"KTP",kartu:"Kartu mahasiswa",lain:"Dokumen pendukung"},PD_NOL=["A","B","C","D","E","F"];
const rpTeks=n=>"Rp"+Math.round(+n||0).toLocaleString("id-ID");
/* baca file ke memori (aman walau input dibuang/digambar ulang); surat harus PDF, lainnya PDF/JPG/PNG */
async function pdBacaPilihan(x,hanyaPdf){if(!x)return {galat:""};let a=new Uint8Array(0);try{a=new Uint8Array(await x.slice(0,8).arrayBuffer())}catch(e){}
 const pdf=String.fromCharCode(...a.slice(0,5))==="%PDF-",jpg=a[0]===0xff&&a[1]===0xd8&&a[2]===0xff,png=a[0]===0x89&&a[1]===0x50&&a[2]===0x4e&&a[3]===0x47;
 if(hanyaPdf&&!pdf)return {galat:"Surat harus berupa file PDF (hasil pindai atau ekspor ke PDF)."};if(!pdf&&!jpg&&!png)return {galat:"File harus berupa PDF, JPG, atau PNG."};
 if(x.size>5*1048576)return {galat:"Ukuran "+x.name+" "+pdUkuran(x.size)+". Maksimal 5 MB, kecilkan dulu."};
 try{return {file:new File([await x.arrayBuffer()],x.name,{type:pdf?"application/pdf":jpg?"image/jpeg":"image/png"})}}catch(e){return {galat:"File tidak bisa dibaca. Pilih ulang filenya."}}}
const LAY=()=>(KA&&KA.pengaturan&&KA.pengaturan.permohonan)||{};
const pdSla=()=>Math.max(1,Math.min(30,+LAY().sla||5));
const pdWa=()=>{const w=String(LAY().wa||INFO().wa||"").replace(/\D/g,"").replace(/^0/,"62");return w?"https://wa.me/"+w:waURL()};
const pdSimponi=()=>LAY().simponi||"https://www.simponi.kemenkeu.go.id/";
const pdTgl=iso=>{if(!iso)return "";const d=new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso)?iso+"T00:00:00+09:00":iso);return d.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Jayapura"})};
const pdJam=iso=>new Date(iso).toLocaleString("id-ID",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Jayapura"})+" WIT";
const pdUkuran=n=>n>1048576?(n/1048576).toFixed(1).replace(".",",")+" MB":Math.max(1,Math.round(n/1024))+" KB";
function pdSimpanLokal(d){try{const L=JSON.parse(localStorage.getItem("pd_tiket")||"[]").filter(x=>x.tiket!==d.tiket);L.unshift({tiket:d.tiket,waktu:d.waktu||new Date().toISOString(),data:d});localStorage.setItem("pd_tiket",JSON.stringify(L.slice(0,10)))}catch(e){}}
const pdLokal=()=>{try{return JSON.parse(localStorage.getItem("pd_tiket")||"[]")}catch(e){return []}};
/* tahapan untuk garis kemajuan */
function pdLangkah(d){const L=[["diterima","Diterima"],["antre","Diverifikasi"]];if(d.kat==="G")L.push(["bayar","Pembayaran"]);L.push(["diproses","Diproses"],["selesai","Selesai"]);return L}
function pdPosisi(d){const urut=pdLangkah(d).map(x=>x[0]);if(d.status==="ditolak"||d.status==="lengkapi"){const r=(d.riwayat||[]).filter(x=>urut.includes(x.s)).pop();return r?urut.indexOf(r.s):0}return Math.max(0,urut.indexOf(d.status==="cekbayar"?"bayar":d.status))}
function pdStepper(d){const L=pdLangkah(d),p=pdPosisi(d),masalah=d.status==="ditolak"||d.status==="lengkapi";
 return `<ol class="pd-step" aria-label="Tahapan permohonan">${L.map(([k,n],i)=>{let st=i<p||(i===p&&k==="selesai"&&d.status==="selesai")?"lewat":i===p?(masalah?"masalah":"kini"):"nanti";const tolak=st==="masalah"&&d.status==="ditolak";if(tolak)st="masalah tolak";if(d.status==="ditolak"&&i>p)st="nanti batal";
  const w=(st.startsWith("masalah")?(d.riwayat||[]).filter(x=>x.s===d.status):(d.riwayat||[]).filter(x=>x.s===k)).pop();
  return `<li class="${st}"${st==="kini"||st.startsWith("masalah")?' aria-current="step"':""}><span class="pd-dot" aria-hidden="true">${st==="lewat"?"✓":tolak?"✕":st==="masalah"?"!":i+1}</span><span class="pd-stn">${st.startsWith("masalah")?esc(PD_ST[d.status]):n}</span>${w?`<small>${esc(pdTgl(w.t))}</small>`:""}</li>`}).join("")}</ol>`}
function pdKartuStatus(d){const st=d.status,cls=st==="selesai"?"ok":st==="ditolak"?"bad":st==="lengkapi"||st==="bayar"||st==="cekbayar"?"warn":"info";
 let aksi="";
 if(st==="bayar"||st==="cekbayar"){const by=d.bayar||{};aksi=`<div class="pd-aksi pd-bayar">${st==="cekbayar"?`<p><b>Bukti bayar sudah kami terima</b> dan sedang diperiksa petugas. Status berubah menjadi Diproses setelah pembayaran terverifikasi.</p>`:""}
 ${by.kode?`<dl class="pd-billing"><dt>Kode billing</dt><dd><b class="pd-kode">${esc(by.kode)}</b> <button type="button" class="mini" data-pd-salin="${esc(by.kode)}">Salin</button></dd>${by.nominal?`<dt>Nominal</dt><dd><b>${esc(rpTeks(by.nominal))}</b></dd>`:""}${by.batas?`<dt>Bayar sebelum</dt><dd><b>${esc(pdTgl(by.batas))}</b></dd>`:""}</dl>
 ${by.gangguan?`<p class="pd-gangguan">Pembayaran lewat SIMPONI sedang terganggu.</p>`:`<p class="pd-tombol"><a class="pbtn" href="${esc(pdSimponi())}" target="_blank" rel="noopener">Bayar lewat SIMPONI ↗</a></p><p class="pd-kecil">Bisa juga dibayar di teller bank, ATM, atau m-banking (menu penerimaan negara / MPN) dengan kode billing di atas.</p>`}`
 :`<p>Kegiatan Anda dikenai tarif PNBP. Petugas sedang menyiapkan <b>kode billing</b>; kode akan tampil di halaman ini${d.email_ada?" dan dikirim ke email Anda":""}.</p>`}
 <p class="pd-wa-bayar"><b>Tidak bisa membayar lewat SIMPONI?</b> Silakan hubungi WhatsApp kantor untuk melakukan pembayaran secara mandiri.</p><p><a class="pbtn sek" href="${pdWa()}?text=${encodeURIComponent("Halo Stasiun Klimatologi Papua Barat, saya ingin melakukan pembayaran mandiri untuk tiket "+d.tiket)}" target="_blank" rel="noopener">Hubungi WhatsApp kantor ↗</a></p>
 <details class="pd-bukti"${st==="bayar"&&by.kode?" open":""}><summary>${st==="cekbayar"?"Kirim ulang bukti bayar":"Sudah membayar? Unggah bukti bayar"}</summary><form class="pd-bukti-f" data-tiket="${esc(d.tiket)}"><label>Nomor HP yang dipakai saat mengajukan<input name="hp" inputmode="tel" autocomplete="tel" required placeholder="08xxxxxxxxxx" value="${esc(PD.bayar.hp||"")}"></label><label>Bukti bayar (foto atau PDF, maks 5 MB)<input type="file" name="bukti" accept="application/pdf,.pdf,image/jpeg,image/png"></label><button class="pbtn" type="submit">Kirim bukti bayar</button><p class="pd-galat" role="alert"></p></form></details></div>`}
 if(st==="lengkapi")aksi=`<div class="pd-aksi"><p><b>Yang perlu dilengkapi:</b> ${esc(d.alasan||"")}</p><form class="pd-lengkapi" data-tiket="${esc(d.tiket)}"><label>Nomor HP yang dipakai saat mengajukan<input name="hp" inputmode="tel" autocomplete="tel" required placeholder="08xxxxxxxxxx" value="${esc(PD.lengkapi.hp||"")}"></label>${(()=>{const M=(d.minta||[]).length?d.minta:["surat"],lain=Object.keys(PD_DOK).filter(k=>!M.includes(k)),fld=(k,w)=>`<label>${esc(PD_DOK[k])}${k==="surat"?" (PDF)":" (foto atau PDF)"}${w?' <span class="w" aria-hidden="true">*</span>':""}<input type="file" name="${k}" accept="${k==="surat"?"application/pdf,.pdf":"application/pdf,.pdf,image/jpeg,image/png"}"></label>`;return M.map(k=>fld(k,(d.minta||[]).length>0)).join("")+(lain.length?`<details class="pd-lain"><summary>Unggah dokumen lain (bila perlu)</summary>${lain.map(k=>fld(k,false)).join("")}</details>`:"")})()}<button class="pbtn" type="submit">Kirim berkas</button><p class="pd-galat" role="alert"></p></form></div>`;
 if(st==="ditolak")aksi=`<div class="pd-aksi pd-tolak"><p><b>Permohonan ditolak.</b> Alasan: ${esc(d.alasan||"-")}</p><p>Anda bisa mengajukan permohonan baru setelah memperbaiki kekurangannya, atau <a href="${pdWa()}" target="_blank" rel="noopener">tanya kami lewat WhatsApp</a>.</p></div>`;
 if(st==="selesai")aksi=(d.hasil||[]).length?`<div class="pd-aksi"><p><b>Data siap diunduh</b> sampai ${esc(pdTgl(d.hasil_sampai))}.</p><ul class="pd-file">${d.hasil.map(h=>`<li><a class="pbtn" href="${KONTEN_URL}/layanan/hasil?t=${encodeURIComponent(d.tiket)}&i=${h.i}" download="${esc(h.nama)}">⬇️ ${esc(h.nama)}</a> <small>${pdUkuran(h.ukuran)}</small></li>`).join("")}</ul></div>`:d.hasil_kedaluwarsa?`<div class="pd-aksi"><p>Masa unduh 30 hari sudah lewat. <a href="${pdWa()}?text=${encodeURIComponent("Halo, saya ingin meminta ulang data tiket "+d.tiket)}" target="_blank" rel="noopener">Minta kirim ulang lewat WhatsApp</a>.</p></div>`:`<div class="pd-aksi"><p>Permohonan selesai. Data dikirim petugas lewat jalur lain; hubungi kami bila belum menerima.</p></div>`;
 const kini=st==="antre"?`Berkas Anda lengkap dan sedang menunggu giliran. Perkiraan selesai <b>${esc(pdTgl(d.perkiraan))}</b>.`:st==="diproses"?`Petugas sedang menyiapkan data Anda. Perkiraan selesai <b>${esc(pdTgl(d.perkiraan))}</b>.`:st==="diterima"?"Permohonan diterima dan sedang diperiksa sistem.":"";
 return `<article class="pd-hasil"><header class="pd-hasil-h"><div><span class="pd-tiket">${esc(d.tiket)}</span><small>Diajukan ${esc(pdJam(d.waktu))}${d.hp?" · HP "+esc(d.hp):""}</small></div><span class="pd-pill ${cls}">${esc(PD_ST[st]||st)}</span></header>
 ${pdStepper(d)}${kini?`<p class="pd-kini">${kini}</p>`:""}${d.alasan&&!["ditolak","lengkapi"].includes(st)?`<div class="pd-pesan"><b>Pesan petugas:</b> ${esc(d.alasan)}</div>`:""}${aksi}
 <details class="pd-rinci"><summary>Rincian dan riwayat</summary><dl class="kv"><dt>Kegiatan</dt><dd>${esc(d.kat+". "+(PD_KAT[d.kat]||d.kat_nama||""))}</dd><dt>Data</dt><dd>${esc(d.kebutuhan)}</dd>${d.lokasi?`<dt>Lokasi</dt><dd>${esc(d.lokasi)}</dd>`:""}${d.periode?`<dt>Periode</dt><dd>${esc(d.periode)}</dd>`:""}</dl>
 <ol class="pd-riwayat">${(d.riwayat||[]).slice().reverse().map(x=>`<li><b>${esc(PD_ST[x.s]||x.s)}</b> <time>${esc(pdJam(x.t))}</time>${x.ket?`<br><span>${esc(x.ket)}</span>`:""}</li>`).join("")}</ol></details></article>`}
function pdTemplate(){const T=(LAY().template||[]).filter(x=>x.file&&x.judul);return T.length?`<aside class="card pd-samping"><h3>Template dokumen</h3><ol class="pd-tpl">${T.map(x=>`<li><a href="${fileURL(x.file)}" target="_blank" rel="noopener">${esc(x.judul)}</a></li>`).join("")}</ol></aside>`:""}
function pdFormulir(){const v=PD.isi,lay=LAY(),tutup=lay.aktif===false;
 if(PD.baru)return pdSukses(PD.baru);
 if(tutup)return `<div class="pd-tutup"><p><b>Permohonan lewat web sedang ditutup.</b> Silakan hubungi kami lewat <a href="${pdWa()}" target="_blank" rel="noopener">WhatsApp</a> atau email ${esc(INFO().email||"")}.</p></div>`;
 const opt=Object.entries(PD_KAT).map(([k,n])=>`<option value="${k}"${v.kat===k?" selected":""}>${k}. ${esc(n)}</option>`).join("");
 return `<form id="pdForm" class="pd-form" novalidate>
 <p class="pd-wajib">Kolom bertanda <span aria-hidden="true">*</span> wajib diisi.</p>
 <fieldset><legend>1. Data pemohon</legend><div class="pd-grid">
 <label><span class="pd-lbl">Nama lengkap <span class="w" aria-hidden="true">*</span></span><input name="nama" required autocomplete="name" value="${esc(v.nama||"")}"></label>
 <label><span class="pd-lbl">Instansi / asal <span class="w" aria-hidden="true">*</span></span><input name="instansi" required autocomplete="organization" placeholder="mis. Universitas Papua, BPBD Manokwari, pribadi" value="${esc(v.instansi||"")}"></label>
 <label><span class="pd-lbl">Nomor HP / WhatsApp <span class="w" aria-hidden="true">*</span></span><input name="hp" required inputmode="tel" autocomplete="tel" placeholder="08xxxxxxxxxx" value="${esc(v.hp||"")}" aria-describedby="pdHpKet"><small id="pdHpKet">Nomor ini juga dipakai untuk <b>mengecek status</b> permohonan.</small></label>
 <label><span class="pd-lbl">Email <small class="opsi">(boleh kosong)</small></span><input name="email" type="email" autocomplete="email" placeholder="nama@contoh.com" value="${esc(v.email||"")}" aria-describedby="pdEmKet"><small id="pdEmKet">Untuk menerima pemberitahuan setiap status berubah.</small></label>
 </div></fieldset>
 <fieldset><legend>2. Data yang diminta</legend>
 <label><span class="pd-lbl">Kegiatan pemanfaatan data <span class="w" aria-hidden="true">*</span></span><select name="kat" required><option value="">Pilih kegiatan…</option>${opt}</select><small>Kegiatan A–F tanpa biaya (tarif nol rupiah) sesuai ketentuan PNBP BMKG. Kegiatan G dikenai tarif.</small></label>
 <div class="pd-chip" role="group" aria-label="Pilih cepat jenis data">${PD_JENIS.map(j=>`<button type="button" data-pd-jenis="${esc(j)}" aria-pressed="${String(v.kebutuhan||"").includes(j)}">${esc(j)}</button>`).join("")}</div>
 <label><span class="pd-lbl">Data yang dibutuhkan <span class="w" aria-hidden="true">*</span></span><textarea name="kebutuhan" rows="3" required placeholder="mis. Curah hujan harian, suhu udara harian">${esc(v.kebutuhan||"")}</textarea></label>
 <div class="pd-grid"><label><span class="pd-lbl">Lokasi <span class="w" aria-hidden="true">*</span></span><input name="lokasi" required list="pdLokL" placeholder="mis. Kabupaten Manokwari / Pos Hujan Warmare" value="${esc(v.lokasi||"")}"><datalist id="pdLokL">${KAB_SEMUA.map(k=>`<option value="${esc(normKab(k[0]))}">`).join("")}</datalist></label>
 <label><span class="pd-lbl">Periode data <span class="w" aria-hidden="true">*</span></span><input name="periode" required placeholder="mis. Januari 2015 – Desember 2025" value="${esc(v.periode||"")}"></label></div>
 <label><span class="pd-lbl">Tujuan penggunaan <span class="w" aria-hidden="true">*</span></span><textarea name="tujuan" rows="2" required placeholder="mis. Skripsi: pengaruh curah hujan terhadap produksi kakao di Ransiki">${esc(v.tujuan||"")}</textarea></label>
 </fieldset>
 <fieldset><legend>3. Dokumen</legend>${v.kat?`<p class="pd-dok-ket">${PD_NOL.includes(v.kat)?"Kegiatan tarif Rp0 wajib melampirkan surat pengantar dan KTP"+(v.kat==="E"?" serta kartu mahasiswa":"")+".":"Kegiatan bertarif PNBP cukup melampirkan surat pengantar."}</p>`:`<p class="pd-dok-ket">Pilih kegiatan di atas untuk melihat dokumen yang diperlukan.</p>`}
 ${pdDrop("surat","Surat permohonan / pengantar","PDF, maksimal 5 MB. Ditandatangani pimpinan instansi atau dosen pembimbing.",true)}
 ${PD_NOL.includes(v.kat)?pdDrop("ktp","KTP","Foto atau PDF, maksimal 5 MB.",true):""}
 ${v.kat==="E"?pdDrop("kartu","Kartu mahasiswa","Foto atau PDF, maksimal 5 MB.",true):""}
 ${pdDrop("lain","Dokumen pendukung lain","Boleh kosong, mis. proposal penelitian. Foto atau PDF.",false)}
 </fieldset>
 <label class="cek pd-setuju"><input type="checkbox" name="setuju"${v.setuju?" checked":""}> Saya menyatakan data hanya dipakai untuk tujuan di atas, tidak diperjualbelikan, dan mencantumkan BMKG sebagai sumber.</label>
 <input name="situs" tabindex="-1" autocomplete="off" class="pd-hp-jebak" aria-hidden="true">
 ${lay.turnstile_key?`<div class="cf-turnstile" data-sitekey="${esc(lay.turnstile_key)}" data-language="id"></div>`:""}
 <p class="pd-galat" id="pdGalat" role="alert">${esc(PD.galat)}</p>
 <button class="pbtn pd-kirim" type="submit"${PD.kirim?" disabled":""}>${PD.kirim?"Mengirim…":"Kirim permohonan"}</button>
 </form>`}
function pdDrop(k,judul,ket,wajib){const f=PD.files[k];return `<label class="pd-drop${f?" pd-terisi":""}"><input type="file" id="pdF_${k}" data-pdfile="${k}" accept="${k==="surat"?"application/pdf,.pdf":"application/pdf,.pdf,image/jpeg,image/png"}"><span class="pd-drop-i" aria-hidden="true">${k==="surat"?"📄":k==="lain"?"📎":"🪪"}</span><span>${f?`<b>${esc(judul)}:</b> ${esc(f.name)} · ${pdUkuran(f.size)}<br><small>Klik untuk mengganti</small>`:`<b>${esc(judul)}${wajib?' <span class="w" aria-hidden="true">*</span>':""}</b><br><small>${esc(ket)}</small>`}</span></label>`}
function pdSukses(d){return `<div class="pd-sukses" role="status"><div class="pd-ok-i" aria-hidden="true">✓</div><h3>Permohonan terkirim</h3><p>Simpan nomor tiket ini untuk mengecek status. Anda juga bisa mengecek dengan nomor HP.</p>
 <div class="pd-tiket-besar"><span id="pdTiketBaru">${esc(d.tiket)}</span><button type="button" class="mini" data-pd-salin="${esc(d.tiket)}">Salin</button></div>
 <p class="pd-pill ${d.status==="bayar"?"warn":"info"}">${esc(PD_ST[d.status]||d.status)}</p>
 <p>${d.status==="bayar"?"Kategori Anda dikenai tarif PNBP. Langkah pembayaran ada di halaman status.":`Perkiraan selesai <b>${esc(pdTgl(d.perkiraan))}</b> (${pdSla()} hari kerja).`}</p>
 <p class="pd-tombol"><button type="button" class="pbtn" data-pd-lihat="${esc(d.tiket)}">Lihat status</button> <button type="button" class="pbtn sek" data-pd-bukti>Simpan bukti (gambar)</button> <button type="button" class="pbtn sek" data-pd-lagi>Ajukan permohonan lain</button></p></div>`}
function pdCek(){const L=pdLokal();
 return `<form id="pdCari" class="pd-cari" role="search"><label for="pdQ">Nomor tiket atau nomor HP</label><div class="pd-cari-b"><input id="pdQ" name="q" required placeholder="PB-2611-0012 atau 0812xxxxxxx" value="${esc(PD.q)}" autocomplete="off"><button class="pbtn" type="submit"${PD.cari?" disabled":""}>${PD.cari?"Mencari…":"Cek status"}</button></div>
 ${L.length?`<p class="pd-lokal">Tiket di perangkat ini: ${L.slice(0,5).map(x=>`<button type="button" class="mini" data-pd-lihat="${esc(x.tiket)}">${esc(x.tiket)}</button>`).join(" ")}</p>`:""}</form>
 <div id="pdHasil" aria-live="polite">${PD.pesan?`<p class="pd-kosong">${PD.pesan}</p>`:""}${(PD.hasil||[]).map(pdKartuStatus).join("")}</div>`}
const PD_IKON={ajukan:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',cek:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',bayar:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',proses:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',unduh:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'};
function pdAlurVisual(){const IK=["ajukan","cek","bayar","proses","unduh"],L=TBb("alur").slice(0,6).map((r,i)=>{const j=r[0],x=(r[1]||"").replace(/\{sla\}/g,pdSla()),k=/bayar|pnbp|billing/i.test(j)?"bayar":/unduh/i.test(j)?"unduh":/proses/i.test(j)?"proses":/verifik|periksa/i.test(j)?"cek":/ajukan|isi/i.test(j)?"ajukan":IK[i%5];return [k,j,x,k==="bayar"?1:0]});
 return `<section class="sec" id="alur-layanan"><div class="sechead"><div><span class="eyebrow">Alur Layanan</span><h2>Lima Langkah Mendapatkan Data</h2></div></div><figure class="pd-ilu" aria-hidden="true"><svg viewBox="0 0 900 230" preserveAspectRatio="xMidYMid meet">
 <defs><linearGradient id="pdIluLangit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6eeff"/><stop offset="1" stop-color="#f7faff"/></linearGradient></defs>
 <rect x="0" y="0" width="900" height="230" rx="22" fill="url(#pdIluLangit)" class="ilu-bg"/>
 <path d="M0 196 C150 178 300 206 450 192 S750 178 900 196 V230 H0Z" fill="#d5e3fb" class="ilu-tanah"/>
 <path id="pdJalur1" d="M200 120 C270 60 330 60 390 112" fill="none" stroke="#0133cc" stroke-width="2.5" stroke-dasharray="6 8" opacity=".45"/>
 <path id="pdJalur2" d="M520 112 C580 60 640 60 705 120" fill="none" stroke="#15803d" stroke-width="2.5" stroke-dasharray="6 8" opacity=".45"/>
 <g class="ilu-hp"><rect x="120" y="70" width="78" height="128" rx="14" fill="#0b1f4d"/><rect x="127" y="82" width="64" height="104" rx="6" fill="#fff"/>
  <rect x="135" y="92" width="40" height="6" rx="3" fill="#0133cc"/><rect x="135" y="106" width="48" height="5" rx="2.5" fill="#cbd5e1"/><rect x="135" y="118" width="48" height="5" rx="2.5" fill="#cbd5e1"/><rect x="135" y="130" width="30" height="5" rx="2.5" fill="#cbd5e1"/>
  <rect x="135" y="160" width="48" height="14" rx="7" fill="#0133cc"/><circle cx="159" cy="191" r="3" fill="#475569"/></g>
 <g class="ilu-kantor"><rect x="392" y="96" width="126" height="102" rx="6" fill="#fff" stroke="#0b1f4d" stroke-width="3"/><rect x="380" y="86" width="150" height="16" rx="5" fill="#0133cc"/>
  ${[0,1,2].map(i=>`<rect x="${408+i*36}" y="116" width="22" height="20" rx="3" fill="#bcd0f7"/><rect x="${408+i*36}" y="146" width="22" height="20" rx="3" fill="#bcd0f7"/>`).join("")}
  <rect x="444" y="172" width="22" height="26" rx="3" fill="#0b1f4d"/><line x1="500" y1="86" x2="500" y2="54" stroke="#0b1f4d" stroke-width="3"/><path d="M500 56 l16 6 -16 6z" fill="#15803d"/>
  <g class="ilu-awan"><circle cx="430" cy="40" r="16" fill="#fff"/><circle cx="452" cy="32" r="20" fill="#fff"/><circle cx="474" cy="42" r="14" fill="#fff"/><rect x="416" y="40" width="70" height="16" rx="8" fill="#fff"/>
   <g class="ilu-hujan" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"><line x1="430" y1="62" x2="427" y2="72"/><line x1="452" y1="64" x2="449" y2="74"/><line x1="474" y1="62" x2="471" y2="72"/></g></g>
  <circle cx="372" cy="54" r="12" fill="#fbbf24" class="ilu-matahari"/></g>
 <g class="ilu-laptop"><rect x="712" y="96" width="120" height="80" rx="8" fill="#0b1f4d"/><rect x="720" y="104" width="104" height="64" rx="4" fill="#fff"/>
  <rect x="732" y="146" width="12" height="16" fill="#93c5fd"/><rect x="750" y="134" width="12" height="28" fill="#3b82f6"/><rect x="768" y="124" width="12" height="38" fill="#0133cc"/><rect x="786" y="140" width="12" height="22" fill="#60a5fa"/>
  <path d="M732 128 L756 118 L774 112 L800 120" fill="none" stroke="#15803d" stroke-width="2.5"/><rect x="700" y="176" width="144" height="10" rx="5" fill="#334155"/></g>
 <g class="ilu-berkas"><rect x="-13" y="-16" width="26" height="32" rx="3" fill="#fff" stroke="#0133cc" stroke-width="2.5"/><path d="M-7 -6h14M-7 0h14M-7 6h9" stroke="#0133cc" stroke-width="2"/>
  <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.7;1" calcMode="linear"><mpath href="#pdJalur1"/></animateMotion></g>
 <g class="ilu-data"><circle r="15" fill="#15803d"/><path d="M0 -7v10M-5 0l5 5 5-5M-6 8h12" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.7;1" calcMode="linear"><mpath href="#pdJalur2"/></animateMotion></g>
</svg><figcaption class="pd-ilu-cap"><span>Anda mengajukan dari HP atau laptop</span><span>Kami memeriksa dan menyiapkan data</span><span>Data iklim siap diunduh</span></figcaption></figure><ol class="pd-alurv">${L.map(([k,j,t,opsi])=>`<li${opsi?' class="opsi"':""}><span class="pd-alurv-i" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PD_IKON[k]}</svg></span><b>${j}${opsi?' <small>bila berbayar</small>':""}</b><p>${t}</p></li>`).join("")}</ol></section>`}
function layananPanel(){return pdAlurVisual()+`<section class="sec" id="permohonan"><div class="sechead"><div><span class="eyebrow">Layanan online</span><h2><span class="clx">Clima<b>X</b> Dulu</span></h2><p class="pd-lead">Ajukan dan pantau permohonan data iklim dari HP, cukup dengan nomor tiket atau nomor HP Anda.</p></div></div>
 <div class="pd-wrap"><div class="card pd-utama"><div class="pd-tabs" role="tablist"><button role="tab" type="button" data-pd-tab="baru" aria-selected="${PD.tab==="baru"}">Permohonan baru</button><button role="tab" type="button" data-pd-tab="cek" aria-selected="${PD.tab==="cek"}">Cek status</button></div>
 <div id="pdIsi" role="tabpanel">${PD.tab==="baru"?pdFormulir():pdCek()}</div></div>
 <div class="pd-sisi"><aside class="card pd-samping pd-bantu"><div class="pd-bantu-atas"><span class="pd-bantu-ava" aria-hidden="true"><svg viewBox="0 0 48 48" width="48" height="48"><path d="M8 12a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H20l-8 7v-7.5A8 8 0 0 1 8 24z" fill="#0133cc"/><circle class="dt" cx="17" cy="18" r="2.6" fill="#fff"/><circle class="dt" cx="24" cy="18" r="2.6" fill="#fff"/><circle class="dt" cx="31" cy="18" r="2.6" fill="#fff"/></svg></span><div><h3>Butuh bantuan?</h3><p>Petugas kami siap membantu, ${esc(INFO().jam||"pada jam kerja")}.</p></div></div>
 <a class="pd-wa" href="${pdWa()}" target="_blank" rel="noopener"><span class="pd-wa-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z"/><path d="M9 10.5c.5 2 2 3.5 4.5 4.5l1.2-1.2 2 .8-.4 1.8c-3.6.2-7.6-3.6-7.4-7.3l1.8-.4.8 2z" fill="#fff" stroke="none"/></svg></span><span class="pd-wa-tx"><b>Tanya lewat WhatsApp</b><small>${esc(waTeks(String(LAY().wa||INFO().wa||"").replace(/\D/g,"").replace(/^0/,"62")))}</small></span><span class="pd-wa-ar" aria-hidden="true">→</span></a>
 <p class="pd-bantu-kecil">Nomor tiket keluar begitu permohonan terkirim. Simpan nomornya, atau cek status cukup dengan nomor HP Anda.</p>${LAY().catatan?`<p class="pd-cat">${esc(LAY().catatan)}</p>`:""}</aside>${pdTemplate()}</div></div></section>`}
function pdSimpanIsian(){const f=document.getElementById("pdForm");if(!f)return;f.querySelectorAll("input[name],select[name],textarea[name]").forEach(el=>{if(el.type==="file"||el.name==="situs")return;PD.isi[el.name]=el.type==="checkbox"?el.checked:el.value})}
function pdGambarUlang(){const box=document.getElementById("pdIsi");if(!box)return;pdSimpanIsian();box.innerHTML=PD.tab==="baru"?pdFormulir():pdCek();document.querySelectorAll("[data-pd-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.pdTab===PD.tab)));pdPasangIsi()}
function pdTurnstileMuat(){if(!LAY().turnstile_key||PD.tab!=="baru")return;if(window.turnstile){try{document.querySelectorAll(".cf-turnstile:not([data-pd])").forEach(el=>{el.dataset.pd=1;turnstile.render(el)})}catch(e){}return}if(document.getElementById("cfTs"))return;const s=document.createElement("script");s.id="cfTs";s.src="https://challenges.cloudflare.com/turnstile/v0/api.js";s.async=true;s.defer=true;document.head.appendChild(s)}
function pdPasangIsi(){const f=document.getElementById("pdForm");if(f){if(!PD.t0)PD.t0=Date.now();f.addEventListener("input",e=>{const el=e.target;if(el.name&&el.type!=="file")PD.isi[el.name]=el.type==="checkbox"?el.checked:el.value;if(el.getAttribute("aria-invalid")){el.removeAttribute("aria-invalid");PD.galat="";const g=document.getElementById("pdGalat");if(g)g.textContent=""}});
  f.querySelectorAll("[data-pdfile]").forEach(inp=>inp.addEventListener("change",async()=>{const k=inp.dataset.pdfile,x=inp.files[0];if(!x)return;const h=await pdBacaPilihan(x,k==="surat");if(h.file){PD.files[k]=h.file;PD.galat=""}else{delete PD.files[k];PD.galat=PD_DOK[k]+": "+h.galat}pdGambarUlang()}));
  f.kat.addEventListener("change",()=>{PD.isi.kat=f.kat.value;pdGambarUlang();const s=document.querySelector('#pdForm [name=kat]');if(s)s.focus()});
  f.addEventListener("submit",e=>{e.preventDefault();pdKirim(f)});pdTurnstileMuat()}
 const c=document.getElementById("pdCari");if(c)c.addEventListener("submit",e=>{e.preventDefault();pdCari(c.q.value)});
 document.querySelectorAll(".pd-lengkapi").forEach(fl=>{fl.addEventListener("submit",e=>{e.preventDefault();pdLengkapi(fl)});fl.querySelectorAll("input[type=file]").forEach(inp=>inp.addEventListener("change",async()=>{const g=fl.querySelector(".pd-galat"),k=inp.name,x=inp.files[0];delete PD.lengkapi.files[k];g.textContent="";if(!x)return;const h=await pdBacaPilihan(x,k==="surat");if(h.file)PD.lengkapi.files[k]=h.file;else{g.textContent=PD_DOK[k]+": "+h.galat;inp.value=""}}))});
 document.querySelectorAll(".pd-bukti-f").forEach(fb=>{fb.addEventListener("submit",e=>{e.preventDefault();pdKirimBukti(fb)});fb.bukti.addEventListener("change",async()=>{const g=fb.querySelector(".pd-galat"),x=fb.bukti.files[0];PD.bayar.file=null;g.textContent="";if(!x)return;const h=await pdBacaPilihan(x,false);if(h.file)PD.bayar.file=h.file;else{g.textContent=h.galat;fb.bukti.value=""}})})}
function pasangPD(){const sec=document.getElementById("permohonan");if(!sec)return;setTimeout(pdGulirKeForm,0);
 sec.addEventListener("click",e=>{const t=e.target.closest("[data-pd-tab],[data-pd-jenis],[data-pd-lihat],[data-pd-salin],[data-pd-bukti],[data-pd-lagi]");if(!t)return;
  if(t.dataset.pdTab){PD.tab=t.dataset.pdTab;pdGambarUlang();return}
  if(t.dataset.pdJenis){const j=t.dataset.pdJenis,k=String(PD.isi.kebutuhan||"").trim(),ada=k.split(/\s*,\s*/).includes(j);PD.isi.kebutuhan=ada?k.split(/\s*,\s*/).filter(x=>x&&x!==j).join(", "):(k?k.replace(/[,\s]+$/,"")+", ":"")+j;const ta=document.querySelector('#pdForm [name=kebutuhan]');if(ta)ta.value=PD.isi.kebutuhan;t.setAttribute("aria-pressed",String(!ada));return}
  if(t.dataset.pdLihat){PD.tab="cek";PD.q=t.dataset.pdLihat;pdGambarUlang();pdCari(PD.q);return}
  if(t.dataset.pdSalin){const s=t.dataset.pdSalin;(navigator.clipboard?navigator.clipboard.writeText(s):Promise.reject()).then(()=>{t.textContent="Tersalin ✓"}).catch(()=>{const r=document.createRange(),el=document.getElementById("pdTiketBaru");if(el){r.selectNodeContents(el);const sl=getSelection();sl.removeAllRanges();sl.addRange(r)}t.textContent="Tekan Ctrl+C"});return}
  if(t.dataset.pdBukti!==undefined){pdBukti(PD.baru);return}
  if(t.dataset.pdLagi!==undefined){PD.baru=null;PD.isi={...PD.isi,kebutuhan:"",lokasi:"",periode:"",tujuan:"",setuju:false};PD.files={};PD.t0=0;pdGambarUlang()}});
 pdPasangIsi();
 const q=new URLSearchParams(location.search).get("tiket")||(location.hash.match(/tiket=([\w-]+)/)||[])[1];if(q&&!PD.q){PD.tab="cek";PD.q=q;pdGambarUlang();pdCari(q);setTimeout(()=>sec.scrollIntoView({behavior:"smooth"}),300)}}
async function pdKirim(f){if(PD.kirim)return;const v=k=>(f[k]&&f[k].value||"").trim();
 let hp=v("hp").replace(/[^\d+]/g,"").replace(/^\+?62/,"0");if(/^8\d{8,12}$/.test(hp))hp="0"+hp;
 const cek=[["nama",v("nama").length>=3,"Tulis nama lengkap."],["instansi",v("instansi").length>=2,"Tulis instansi atau asal Anda."],["hp",/^08\d{7,12}$/.test(hp),"Nomor HP/WhatsApp tidak valid (contoh 081234567890)."],["email",!v("email")||/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v("email")),"Alamat email tidak valid."],["kat",!!v("kat"),"Pilih kegiatan pemanfaatan data."],["kebutuhan",v("kebutuhan").length>=10,"Jelaskan data yang dibutuhkan (minimal 10 huruf)."],["lokasi",!!v("lokasi"),"Tulis lokasi data."],["periode",!!v("periode"),"Tulis periode data."],["tujuan",v("tujuan").length>=5,"Tulis tujuan penggunaan data."],["pdF_surat",!!PD.files.surat,"Unggah surat permohonan / pengantar (PDF)."],["pdF_ktp",!PD_NOL.includes(v("kat"))||!!PD.files.ktp,"Kegiatan tarif Rp0 wajib melampirkan KTP."],["pdF_kartu",v("kat")!=="E"||!!PD.files.kartu,"Kegiatan pendidikan dan penelitian wajib melampirkan kartu mahasiswa."],["setuju",f.setuju.checked,"Centang pernyataan penggunaan data."]];
 f.querySelectorAll("[aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));const salah=cek.find(c=>!c[1]);
 if(salah){PD.galat=salah[2];document.getElementById("pdGalat").textContent=salah[2];const el=/^pdF_/.test(salah[0])?document.getElementById(salah[0]):f[salah[0]];if(el){el.setAttribute("aria-invalid","true");try{el.focus()}catch(e){}}return}
 const fd=new FormData();["nama","instansi","email","kat","kebutuhan","lokasi","periode","tujuan","situs"].forEach(k=>fd.append(k,v(k)));fd.append("hp",hp);fd.append("setuju","1");fd.append("lama",String(Date.now()-(PD.t0||Date.now())));const kat=v("kat");Object.entries(PD.files).forEach(([k,x])=>{if(k==="ktp"&&!PD_NOL.includes(kat)||k==="kartu"&&kat!=="E")return;fd.append(k,x,x.name)});
 const ts=f.querySelector('[name="cf-turnstile-response"]');if(ts)fd.append("cf-turnstile-response",ts.value);
 PD.kirim=true;PD.galat="";const b=f.querySelector(".pd-kirim");b.disabled=true;b.textContent="Mengirim…";
 try{const r=await fetch(KONTEN_URL+"/layanan/permohonan",{method:"POST",body:fd});const j=await r.json().catch(()=>({}));if(!r.ok||!j.ok)throw new Error(j.galat||"Permohonan belum terkirim. Periksa sambungan internet lalu coba lagi.");
  if(!j.tiket)throw new Error("Permohonan belum terkirim. Coba lagi.");
  PD.baru={...(j.data||{}),tiket:j.tiket,status:j.status,perkiraan:j.perkiraan,nama:v("nama"),waktu:(j.data&&j.data.waktu)||new Date().toISOString()};pdSimpanLokal(j.data||PD.baru);PD.files={};PD.isi={nama:PD.isi.nama,instansi:PD.isi.instansi,hp:PD.isi.hp,email:PD.isi.email}}
 catch(e){PD.galat=e.message||"Permohonan belum terkirim. Coba lagi.";if(window.turnstile)try{turnstile.reset()}catch(er){}}
 PD.kirim=false;pdGambarUlang();const s=document.querySelector(".pd-sukses,#pdGalat");if(s&&s.scrollIntoView)s.scrollIntoView({block:"center",behavior:"smooth"})}
async function pdCari(q){q=String(q||"").trim();if(!q)return;PD.q=q;PD.cari=true;PD.pesan="";const box=document.getElementById("pdHasil");if(box)box.innerHTML='<p class="pd-kosong">Mencari…</p>';
 try{const r=await fetch(KONTEN_URL+"/layanan/status?q="+encodeURIComponent(q),{cache:"no-store"});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.galat||"Status belum bisa dicek. Coba lagi sebentar lagi.");
  PD.hasil=j.hasil||[];PD.hasil.forEach(pdSimpanLokal);
  if(!PD.hasil.length){const tk=q.toUpperCase().replace(/\s+/g,""),lok=pdLokal().find(x=>x.tiket===tk);
   if(lok&&Date.now()-Date.parse(lok.waktu)<15*60e3){PD.hasil=[lok.data];PD.pesan="Permohonan ini baru saja dikirim dan sedang disinkronkan ke semua server. Status lengkap tampil dalam beberapa menit."}
   else PD.pesan=esc(j.pesan||"Tidak ditemukan.")+` Periksa kembali penulisannya, atau <a href="${pdWa()}" target="_blank" rel="noopener">tanya kami lewat WhatsApp</a>.`}}
 catch(e){PD.hasil=[];const tk=q.toUpperCase().replace(/\s+/g,""),lok=pdLokal().find(x=>x.tiket===tk);if(lok){PD.hasil=[lok.data];PD.pesan="Sambungan ke server sedang terganggu, jadi yang tampil adalah status terakhir yang tersimpan di perangkat ini."}else PD.pesan=esc(e.message)}
 PD.cari=false;if(cur==="layanan-data"&&PD.tab==="cek")pdGambarUlang()}
async function pdLengkapi(fl){const g=fl.querySelector(".pd-galat"),hp=fl.hp.value.trim(),F=PD.lengkapi.files;PD.lengkapi.hp=hp;
 if(!Object.keys(F).length){g.textContent=g.textContent||"Pilih minimal satu file untuk dikirim.";return}
 const fd=new FormData();fd.append("tiket",fl.dataset.tiket);fd.append("hp",hp);Object.entries(F).forEach(([k,x])=>fd.append(k,x,x.name));const b=fl.querySelector("button");b.disabled=true;b.textContent="Mengirim…";
 try{const r=await fetch(KONTEN_URL+"/layanan/lengkapi",{method:"POST",body:fd});const j=await r.json().catch(()=>({}));if(!r.ok||!j.ok)throw new Error(j.galat||"Belum terkirim. Coba lagi.");
  const d=(j.hasil||[])[0];PD.lengkapi.files={};PD.hasil=(PD.hasil||[]).map(h=>h.tiket===d.tiket?d:h);PD.pesan="Berkas baru diterima. Permohonan kembali diproses.";pdGambarUlang()}
 catch(e){g.textContent=e.message;b.disabled=false;b.textContent="Kirim berkas"}}
async function pdKirimBukti(fb){const g=fb.querySelector(".pd-galat"),hp=fb.hp.value.trim(),x=PD.bayar.file;PD.bayar.hp=hp;
 if(!x){g.textContent=g.textContent||"Pilih file bukti bayar.";return}
 const fd=new FormData();fd.append("tiket",fb.dataset.tiket);fd.append("hp",hp);fd.append("bukti",x,x.name);const b=fb.querySelector("button");b.disabled=true;b.textContent="Mengirim…";
 try{const r=await fetch(KONTEN_URL+"/layanan/bukti",{method:"POST",body:fd});const j=await r.json().catch(()=>({}));if(!r.ok||!j.ok)throw new Error(j.galat||"Belum terkirim. Coba lagi.");
  const d=(j.hasil||[])[0];PD.bayar.file=null;PD.hasil=(PD.hasil||[]).map(h=>h.tiket===d.tiket?d:h);PD.pesan="Bukti bayar terkirim. Petugas akan memeriksanya.";pdGambarUlang()}
 catch(e){g.textContent=e.message;b.disabled=false;b.textContent="Kirim bukti bayar"}}
function pdBukti(d){if(!d)return;const c=document.createElement("canvas"),W=900,H=560;c.width=W;c.height=H;const x=c.getContext("2d");
 x.fillStyle="#fff";x.fillRect(0,0,W,H);x.fillStyle="#0133cc";x.fillRect(0,0,W,110);x.fillStyle="#fff";x.font="bold 30px system-ui,Arial";x.fillText("Stasiun Klimatologi Papua Barat",40,52);x.font="20px system-ui,Arial";x.fillText("BMKG · Bukti Permohonan Data",40,86);
 x.fillStyle="#334155";x.font="20px system-ui,Arial";x.fillText("Nomor tiket",40,165);x.fillStyle="#0f172a";x.font="bold 64px system-ui,Arial";x.fillText(d.tiket,40,235);
 const baris=[["Nama",d.nama||""],["Diajukan",pdJam(d.waktu||new Date().toISOString())],["Status",PD_ST[d.status]||d.status],["Perkiraan selesai",d.status==="bayar"?"setelah pembayaran":pdTgl(d.perkiraan)]];
 x.font="22px system-ui,Arial";baris.forEach(([k,v],i)=>{x.fillStyle="#64748b";x.fillText(k,40,300+i*44);x.fillStyle="#0f172a";x.fillText(String(v).slice(0,48),300,300+i*44)});
 x.fillStyle="#64748b";x.font="18px system-ui,Arial";x.fillText("Cek status: "+location.host+"/layanan-data (nomor tiket atau nomor HP)",40,H-30);
 c.toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="Bukti-"+d.tiket+".png";document.body.appendChild(a);SKM_LEWAT=true;try{a.click()}finally{SKM_LEWAT=false}setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)},"image/png")}
/* tombol "Minta data" dari halaman lain (mis. Data Pos Hujan): buka formulir dengan isian awal */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pd-minta]");if(!b)return;PD.tab="baru";const k=String(PD.isi.kebutuhan||"").trim();if(!k.includes(b.dataset.pdMinta))PD.isi.kebutuhan=(k?k.replace(/[,\s]+$/,"")+", ":"")+b.dataset.pdMinta;setTimeout(()=>{const el=document.getElementById("permohonan");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})},350)});
/* promosi ClimaX Dulu di Beranda; kepanjangan nama diberi data-nosnippet agar tidak dipakai mesin pencari */
function climaxPromo(){return `<section class="clx-promo" aria-label="ClimaX Dulu, layanan permohonan data online"><span class="clx-ikon" aria-hidden="true"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 8H7z"/><path d="M12 11v7M9.5 15.5 12 18l2.5-2.5"/></svg></span>
 <div><span class="clx">Clima<b>X</b> Dulu</span><span class="clx-kep" data-nosnippet>${esc(TB("clx_kep"))}</span><p>${esc(TB("clx_promo"))}</p></div>
 <div class="clx-aksi"><a href="/layanan-data?ke=ajukan" data-hal="layanan-data" data-pd-ke="baru">Ajukan sekarang</a><a href="/layanan-data?ke=cek-status" data-hal="layanan-data" data-pd-ke="cek">Cek status</a></div></section>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pd-cek],[data-pd-ke]");if(b){PD.tab=b.dataset.pdKe||"cek";PD.gulir=1;if(typeof cur!=="undefined"&&cur==="layanan-data"&&document.getElementById("pdIsi")){e.preventDefault();e.stopPropagation();pdGambarUlang();pdGulirKeForm()}}},true);
/* v12: /layanan-data?ke=ajukan atau ?ke=cek-status langsung membuka tab itu, menggulir ke formulir, dan menaruh kursor di kolom pertama */
function pdGulirKeForm(){const q=new URLSearchParams(location.search).get("ke");if(q&&!PD.gulir){const t=/cek|status/i.test(q)?"cek":"baru";PD.gulir=1;if(PD.tab!==t){PD.tab=t;pdGambarUlang()}}
 if(!PD.gulir)return;PD.gulir=0;setTimeout(()=>{const el=document.getElementById("permohonan");if(!el)return;el.scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  const f=document.querySelector("#pdIsi input:not([type=hidden]):not([type=checkbox]),#pdIsi select,#pdIsi textarea");if(f)setTimeout(()=>f.focus({preventScroll:true}),350)},80)}
/* kotak "Tentang ClimaX Dulu" (teksnya juga dimasukkan ke HTML statis oleh build_hosting.py agar terbaca mesin pencari) */
const CLX_TENTANG={"judul":"Layanan Permintaan Data Iklim BMKG Papua Barat","p":["ClimaX Dulu (Centra Layanan Informasi Musim, Atmosfer & X-trem — Di Ujung Layar Untukmu) merupakan layanan resmi Stasiun Klimatologi Papua Barat untuk memfasilitasi permintaan data BMKG secara cepat dan akurat. Pengguna dapat mengajukan permohonan data cuaca dan iklim Papua Barat dan Papua Barat Daya, seperti curah hujan, suhu udara, kelembapan, angin, dan hari tanpa hujan, secara online melalui sistem ini.","Layanan ini ditujukan bagi mahasiswa, peneliti, instansi pemerintah, dunia usaha, maupun masyarakat umum yang membutuhkan data iklim untuk penelitian, perencanaan, pertanian, maupun analisis kebencanaan. Permohonan untuk pendidikan, penelitian, dan kegiatan sosial tidak dikenai biaya (Rp0)."]};
function clxTentang(){return `<section class="clx-tentang" aria-labelledby="clxTentangJ"><div class="clx-tentang-teks"><span class="eyebrow">Tentang <span class="clx">Clima<b>X</b> Dulu</span></span><h2 id="clxTentangJ">${esc(TB("clx_judul"))}</h2>${TBp("clx_isi").map(x=>`<p>${esc(x)}</p>`).join("")}
 <ul class="clx-untuk" aria-label="Layanan ini untuk">${TBb("clx_untuk").map(r=>r.length>1?r:["•",r[0]]).map(([i,n])=>`<li><span aria-hidden="true">${i}</span>${n}</li>`).join("")}</ul>
 <button type="button" class="pbtn" data-pd-tab-awal>Ajukan permohonan sekarang</button></div>
 <div class="clx-tentang-ilu" aria-hidden="true"><svg viewBox="0 0 200 170" width="200" height="170"><circle cx="150" cy="40" r="20" fill="#fbbf24" class="ilu-matahari"/><g class="ilu-awan"><circle cx="78" cy="58" r="24" fill="#fff"/><circle cx="108" cy="46" r="30" fill="#fff"/><circle cx="138" cy="62" r="20" fill="#fff"/><rect x="58" y="58" width="100" height="24" rx="12" fill="#fff"/></g><g class="ilu-hujan" stroke="#60a5fa" stroke-width="4" stroke-linecap="round"><line x1="82" y1="94" x2="78" y2="108"/><line x1="108" y1="96" x2="104" y2="110"/><line x1="134" y1="94" x2="130" y2="108"/></g><rect x="40" y="122" width="14" height="30" rx="3" fill="#93c5fd"/><rect x="62" y="108" width="14" height="44" rx="3" fill="#3b82f6"/><rect x="84" y="128" width="14" height="24" rx="3" fill="#60a5fa"/><rect x="106" y="114" width="14" height="38" rx="3" fill="#0133cc"/><rect x="128" y="124" width="14" height="28" rx="3" fill="#93c5fd"/><path d="M30 156h140" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/></svg></div></section>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pd-tab-awal]");if(b){e.preventDefault();if(PD.tab!=="baru"){PD.tab="baru";const bt=document.querySelector('[data-pd-tab="baru"]');if(bt)bt.click()}const el=document.getElementById("permohonan");if(el)el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})}});

/* ---------- Admin > Permohonan Data ---------- */
let ADM_PD=null,PD_ADM={filter:"aktif",kat:"",cari:"",buka:"",detail:null,pilih:new Set(),notif:null};
const PD_URUT=["diterima","lengkapi","bayar","cekbayar","antre","diproses","selesai","ditolak"];
function pdPnbp(r){return r.kat==="G"||!!(r.bayar&&(r.bayar.kode||+r.bayar.nominal>0))}
function pdPeringatanUbah(r,st){const by=r.bayar||{};if(st==="bayar"&&!by.kode&&by.metode!=="mandiri")return "⚠️ Kode billing belum diisi. Pemohon belum bisa membayar lewat SIMPONI.";if(st==="selesai"&&pdPnbp(r)&&!by.ntpn)return "⚠️ Isi NTPN dulu. Permohonan berbayar tidak bisa Selesai sebelum NTPN dicatat.";if(st==="lengkapi")return "Centang dokumen yang diminta dan tulis kekurangannya di Pesan untuk pemohon.";if(st==="ditolak")return "Tulis alasan penolakan di Pesan untuk pemohon.";return ""}
const PD_AKTIF=["diterima","antre","bayar","cekbayar","diproses","lengkapi"];
function muatPD(){return admJSON("/admin/permohonan",{}).then(j=>{ADM_PD=j;segarTabPD();return j}).catch(e=>{ADM_PD=ADM_PD||{galat:e.message,daftar:[]}})}
function hitungPD(){const d=(ADM_PD&&ADM_PD.daftar)||[],hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);return {aktif:d.filter(x=>PD_AKTIF.includes(x.status)).length,antre:d.filter(x=>x.status==="antre"||x.status==="diterima"||x.status==="cekbayar").length,telat:d.filter(x=>["antre","diproses","diterima"].includes(x.status)&&x.perkiraan&&x.perkiraan<hari).length}}
function segarTabPD(){const tb=document.querySelector('[data-adm="permohonan"]');if(tb){const h=hitungPD();tb.textContent="Permohonan Data"+(h.antre?" ("+h.antre+")":"");tb.classList.toggle("adamsk",h.antre>0)}const el=document.getElementById("admIngat");if(el&&typeof pengingatAdmin==="function")el.innerHTML=pengingatAdmin()}
function pdIngat(){if(!ADM_PD||!ADM_PD.daftar)return [];const h=hitungPD(),o=[];if(h.antre)o.push(`Permohonan data: <b>${h.antre} menunggu diproses</b>${h.telat?`, <b>${h.telat} melewati perkiraan selesai</b>`:""}. Buka tab <b>Permohonan Data</b>.`);return o}
const pdPill=s=>`<span class="pd-pill ${s==="selesai"?"ok":s==="ditolak"?"bad":s==="lengkapi"||s==="bayar"||s==="cekbayar"?"warn":"info"}">${escH(PD_ST[s]||s)}</span>`;
function admPermohonan(){return `<div id="pdAdm"><p class="admnote">Permohonan data dari halaman <a href="#layanan-data" target="_blank">Permintaan Pelayanan Data</a>. Status <b>Antre</b> dan <b>Menunggu pembayaran</b> diatur otomatis oleh sistem saat berkas lengkap; ubah ke <b>Diproses</b>, <b>Selesai</b> (unggah file data), <b>Perlu dilengkapi</b>, atau <b>Ditolak</b>. Pemohon diberi tahu lewat email bila mengisi email.</p><div id="pdAdmIsi"><p class="admnote">Memuat permohonan…</p></div></div><p class="admmsg" id="admMsg"></p>`}
function pdAdmGambar(){const el=document.getElementById("pdAdmIsi");if(!el)return;if(!ADM_PD||ADM_PD.galat&&!(ADM_PD.daftar||[]).length){el.innerHTML=`<p class="admnote">Belum bisa memuat permohonan: ${escH((ADM_PD&&ADM_PD.galat)||"")}. Pastikan robot staklim-admin sudah diperbarui.</p>`;return}
 const bukaSec=[...el.querySelectorAll("details[id][open]")].map(d=>d.id);PD_ADM.notifDimuat=0;
 const D=ADM_PD.daftar||[],hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10),c=s=>D.filter(x=>x.status===s).length,blnIni=hari.slice(0,7);
 const q=PD_ADM.cari.toLowerCase(),F=D.filter(x=>(PD_ADM.filter==="semua"||PD_ADM.filter==="aktif"&&PD_AKTIF.includes(x.status)||x.status===PD_ADM.filter)&&(!PD_ADM.kat||x.kat===PD_ADM.kat)&&(!q||[x.tiket,x.nama,x.instansi,x.hp,x.ringkas].join(" ").toLowerCase().includes(q)));
 const kotak=[["aktif","Perlu ditangani",D.filter(x=>PD_AKTIF.includes(x.status)).length],["antre","Antre",c("antre")+c("diterima")],["bayar","Menunggu bayar",c("bayar")],["cekbayar","Bukti bayar masuk",c("cekbayar")],["diproses","Diproses",c("diproses")],["lengkapi","Perlu dilengkapi",c("lengkapi")],["selesai","Selesai bulan ini",D.filter(x=>x.status==="selesai"&&String(x.selesai||x.diubah).slice(0,7)===blnIni).length],["ditolak","Ditolak",c("ditolak")]];
 const katN=Object.keys(PD_KAT).map(k=>[k,D.filter(x=>x.kat===k).length]);
 el.innerHTML=`<div class="pd-kpi">${kotak.map(([k,n,v])=>`<button type="button" class="pd-kpi-i${PD_ADM.filter===k?" on":""}" data-pdf="${k}"><b>${v}</b><span>${n}</span></button>`).join("")}</div>
 <div class="pd-katstrip" role="group" aria-label="Jumlah permohonan per kegiatan"><span>Per kegiatan:</span>${katN.map(([k,n])=>`<button type="button" class="pd-katc${PD_ADM.kat===k?" on":""}" data-pdkat="${k}" title="${escH(PD_KAT[k])}"><b>${k}</b> ${n}</button>`).join("")}${PD_ADM.kat?'<button type="button" class="pd-katc" data-pdkat="">✕ semua</button>':""}</div>
 <div class="pd-alat"><label>Status<select id="pdFilter">${[["aktif","Perlu ditangani"],["semua","Semua"],...Object.entries(PD_ST)].map(([k,n])=>`<option value="${k}"${PD_ADM.filter===k?" selected":""}>${n}</option>`).join("")}</select></label><label>Kegiatan<select id="pdFilterKat"><option value="">Semua kegiatan</option>${Object.entries(PD_KAT).map(([k,n])=>`<option value="${k}"${PD_ADM.kat===k?" selected":""}>${k}. ${escH(n)} (${D.filter(x=>x.kat===k).length})</option>`).join("")}</select></label><label>Cari<input id="pdCariAdm" placeholder="tiket, nama, instansi, HP" value="${escH(PD_ADM.cari)}"></label><button type="button" class="mini" id="pdSegar">↻ Segarkan</button></div>
 ${F.length?`<div class="tbl-wrap"><table class="pd-tbl"><thead><tr><th><input type="checkbox" id="pdPilihSemua" aria-label="Pilih semua"></th><th>Masuk</th><th>Tiket</th><th>Pemohon</th><th>Kegiatan</th><th>Status</th><th></th></tr></thead><tbody>${F.map(x=>{const telat=["antre","diproses","diterima"].includes(x.status)&&x.perkiraan&&x.perkiraan<hari;return `<tr class="${PD_ADM.buka===x.tiket?"buka":""}"><td><input type="checkbox" data-pdpilih="${x.tiket}"${PD_ADM.pilih.has(x.tiket)?" checked":""} aria-label="Pilih ${x.tiket}"></td><td>${escH(pdJam(x.waktu).replace(/ WIT$/,""))}</td><td><b>${x.tiket}</b>${x.diarsip?' <small title="Sudah diarsipkan">🗄️</small>':""}</td><td>${escH(x.nama)}<br><small>${escH(x.instansi)}</small></td><td><span class="pd-kat"><b>${escH(x.kat)}</b> ${escH(PD_KAT[x.kat]||"")}</span> <span class="pd-tarif ${x.kat==="G"?"pnbp":"nol"}">${x.kat==="G"?"PNBP":"Rp0"}</span><br><small>${escH(potong(x.ringkas,50))}</small></td><td>${pdPill(x.status)}${telat?'<br><small class="pd-telat">lewat perkiraan</small>':""}</td><td><button type="button" class="mini" data-pdkelola="${x.tiket}">${PD_ADM.buka===x.tiket?"Tutup":"Kelola"}</button></td></tr>${PD_ADM.buka===x.tiket?`<tr class="pd-kelola-r"><td colspan="7"><div id="pdKelola">${PD_ADM.detail&&PD_ADM.detail.tiket===x.tiket?pdKelolaHTML(PD_ADM.detail):"Memuat…"}</div></td></tr>`:""}`}).join("")}</tbody></table></div>`:`<p class="admnote">Tidak ada permohonan${PD_ADM.filter!=="semua"?" dengan status ini":""}.</p>`}
 <details class="admsec" id="pdArsipSec"><summary><b>Rekap, arsip, dan data pribadi</b></summary><div class="admsecin"><p class="admnote">Rekap layanan tidak pernah dihapus. Data pribadi (nama, HP, email, surat) baru bisa dihapus <b>setelah arsip lengkapnya diunduh</b>, dan hanya lewat tombol di bawah.</p>
  <p><button type="button" class="pbtn" id="pdRekap">⬇️ Unduh rekap (Excel)</button> <button type="button" class="pbtn sek" id="pdArsip">🗄️ Unduh arsip lengkap (Excel + surat, zip)</button></p>
  <p><button type="button" class="mini bahaya" id="pdHapusPribadi">Hapus data pribadi tiket terpilih (${PD_ADM.pilih.size})</button></p><p class="admnote" id="pdArsipKet"></p></div></details>
 <details class="admsec" id="pdSetSec"><summary><b>Pengaturan layanan</b></summary><div class="admsecin">${pdSetHTML()}</div></details>
 <p class="admnote pd-ke-notif">🔔 Pemberitahuan ke HP, Telegram, dan email petugas diatur di tab <button type="button" class="mini" data-adm="notif">Notifikasi Petugas</button></p>`;
 bukaSec.forEach(id=>{const d=document.getElementById(id);if(d)d.open=true});if(bukaSec.includes("pdNotifSec")){PD_ADM.notifDimuat=1;pdNotifMuat()}}
function pdKelolaHTML(r){const st=r.status,dihapus=!!r.dihapus;
 return `<div class="pd-kelola"><div class="pd-k-kiri"><dl class="kv"><dt>Pemohon</dt><dd>${escH(r.nama)} · ${escH(r.instansi)}</dd><dt>HP</dt><dd>${r.hp?`<a href="https://wa.me/${escH(r.hp.replace(/^0/,"62"))}" target="_blank" rel="noopener">${escH(r.hp)}</a>`:"–"}</dd><dt>Email</dt><dd>${escH(r.email||"–")}</dd><dt>Kegiatan</dt><dd>${escH(r.kat+". "+(PD_KAT[r.kat]||""))}</dd><dt>Data</dt><dd>${escH(r.kebutuhan)}</dd><dt>Lokasi</dt><dd>${escH(r.lokasi)}</dd><dt>Periode</dt><dd>${escH(r.periode)}</dd><dt>Tujuan</dt><dd>${escH(r.tujuan||"–")}</dd><dt>Perkiraan selesai</dt><dd>${escH(pdTgl(r.perkiraan))}</dd></dl>
 <p><b>Dokumen</b><br>${[...(r.surat||[]).map((s,i)=>["surat",i,"📄 Surat",s]),...(r.dok||[]).map((s,i)=>["dok",i,(s.jenis==="ktp"?"🪪 KTP":s.jenis==="kartu"?"🎓 Kartu mahasiswa":"📎 Pendukung"),s])].map(([j,i,lbl,s])=>`<button type="button" class="mini" data-pdfilej="${j}" data-pdfilei="${i}">${lbl}: ${escH(potong(s.nama,28))} (${pdUkuran(s.ukuran)})</button>`).join(" ")||"<small>tidak ada / sudah dihapus</small>"}
 ${PD_NOL.includes(r.kat)&&!(r.dok||[]).some(d=>d.jenis==="ktp")&&!r.dihapus?'<br><small class="pd-telat">KTP belum ada</small>':""}${r.kat==="E"&&!(r.dok||[]).some(d=>d.jenis==="kartu")&&!r.dihapus?'<br><small class="pd-telat">Kartu mahasiswa belum ada</small>':""}</p>
 ${pdPnbp(r)?`<p><b>Bukti pembayaran</b><br>${(((r.bayar||{}).bukti)||[]).map((s,i)=>`<button type="button" class="mini" data-pdfilej="bukti" data-pdfilei="${i}">💳 ${escH(potong(s.nama,28))} (${pdUkuran(s.ukuran)})</button>`).join(" ")||"<small>belum ada</small>"}${(r.bayar||{}).ntpn?`<br><small>NTPN: <b>${escH(r.bayar.ntpn)}</b></small>`:""}</p>`:""}
 <details open><summary>Riwayat</summary><ol class="pd-riwayat">${(r.riwayat||[]).slice().reverse().map(x=>`<li><b>${escH(PD_ST[x.s]||x.s)}</b> <time>${escH(pdJam(x.t))}</time>${x.p?` <small class="pd-ptg">· ${escH(x.p)}</small>`:""}${x.ket?`<br><span>${escH(x.ket)}</span>`:""}</li>`).join("")}</ol></details></div>
 <form class="pd-k-kanan" id="pdUbah">${pdPnbp(r)?`<fieldset class="pd-k-bayar"><legend>Pembayaran PNBP</legend><div class="admgrid"><label>Kode billing SIMPONI<input name="b_kode" inputmode="numeric" value="${escH((r.bayar||{}).kode||"")}" placeholder="15 digit"></label><label>Nominal (Rp)<input name="b_nominal" type="number" min="0" value="${escH((r.bayar||{}).nominal||"")}"></label><label>Bayar sebelum<input name="b_batas" type="date" value="${escH((r.bayar||{}).batas||"")}"></label><label>Cara bayar<select name="b_metode"><option value="simponi">SIMPONI (kode billing)</option><option value="mandiri"${(r.bayar||{}).metode==="mandiri"?" selected":""}>Pembayaran mandiri (lewat WA kantor)</option></select></label><label>NTPN <small>(setelah pembayaran terverifikasi)</small><input name="b_ntpn" value="${escH((r.bayar||{}).ntpn||"")}"></label></div><p class="admnote">Kode billing dibuat bendahara/operator PNBP di SIMPONI, lalu diketik di sini. Begitu disimpan, kode langsung tampil di halaman status pemohon (dan dikirim lewat email bila ada). Setelah pembayaran dicek, catat NTPN lalu ubah status ke <b>Sedang diproses</b>. Permohonan berbayar tidak bisa Selesai sebelum NTPN diisi.</p></fieldset>`:`<p class="admnote pd-gratis">Kategori ${escH(r.kat)} gratis (Rp0), tidak perlu kode billing.</p>`}
 <label>Status<select name="status">${PD_URUT.filter(k=>pdPnbp(r)||!["bayar","cekbayar"].includes(k)||k===st).map(k=>`<option value="${k}"${st===k?" selected":""}>${PD_ST[k]}</option>`).join("")}</select></label><p class="pd-ingat" id="pdIngat" role="status">${pdPeringatanUbah(r,st)}</p>
 <fieldset class="pd-k-minta"${st==="lengkapi"?"":" hidden"}><legend>Dokumen yang perlu dilengkapi</legend>${[["surat","Surat"],["ktp","KTP"],["kartu","Kartu mahasiswa"],["lain","Dokumen pendukung"]].map(([k,n])=>`<label class="cek"><input type="checkbox" name="minta" value="${k}"${(r.minta||[]).includes(k)?" checked":""}> ${n}</label>`).join("")}<small class="admnote">Pemohon hanya diminta mengunggah yang dicentang. Berkas lain tidak perlu diunggah ulang.</small></fieldset>
 <label>Pesan untuk pemohon <small>(tampil di kotak status pemohon; wajib bila Ditolak / Perlu dilengkapi)</small><textarea name="alasan" rows="2" placeholder="mis. Surat belum ditandatangani pimpinan">${escH(r.alasan||"")}</textarea></label>
 <label>Keterangan riwayat di sisi pemohon <small>(boleh kosong; menjadi satu baris di daftar riwayat yang dilihat pemohon)</small><input name="ket" placeholder="mis. Data dikirim dalam format Excel"></label>
 <label>Petugas <small>(hanya terlihat di Admin)</small><input name="petugas" value="${escH(r.petugas||"")}" placeholder="nama petugas"></label>
 <label>Catatan internal <small>(tidak terlihat pemohon)</small><textarea name="catatan" rows="2">${escH(r.catatan||"")}</textarea></label>
 <p><b>File data hasil</b> <small>(pemohon bisa mengunduh 30 hari setelah Selesai)</small></p>${(r.hasil||[]).length?`<ul class="pd-file">${r.hasil.map((h,i)=>`<li>📦 ${escH(h.nama)} <small>${pdUkuran(h.ukuran)}</small> <button type="button" class="mini" data-pdhasilhapus="${i}">Hapus</button></li>`).join("")}</ul>`:'<p class="admnote">Belum ada file.</p>'}
 ${dihapus?"":`<label class="mini fbtn">⬆️ Unggah file data (maks 25 MB)<input type="file" id="pdHasilFile" hidden></label>`}
 <label class="cek"><input type="checkbox" name="tanpa_file"> Selesai tanpa file (data dikirim lewat jalur lain)</label>
 <button class="pbtn" type="submit">Simpan status</button></form></div>`}
function pdSetHTML(){const L=LAY(),T=L.template||[];return `<form id="pdSet"><label class="cek"><input type="checkbox" name="aktif"${L.aktif===false?"":" checked"}> Terima permohonan lewat web</label>
 <label class="cek"><input type="checkbox" name="simponi_gangguan"${L.simponi_gangguan?" checked":""}> SIMPONI sedang gangguan <small>(tombol SIMPONI disembunyikan; pemohon diarahkan ke WhatsApp kantor untuk pembayaran mandiri)</small></label>
 <div class="admgrid"><label>Standar pelayanan (hari kerja)<input type="number" name="sla" min="1" max="30" value="${pdSla()}"></label><label>Tautan pembayaran SIMPONI<input type="url" name="simponi" value="${escH(pdSimponi())}"></label><label>Nomor WhatsApp layanan<input name="wa" value="${escH(L.wa||INFO().wa||"")}" placeholder="+62 852-…"></label><label>Kunci situs Turnstile <small>(opsional, anti-robot)</small><input name="turnstile_key" value="${escH(L.turnstile_key||"")}" placeholder="0x4AAAA…"></label></div>
 <label>Catatan di samping formulir <small>(boleh kosong)</small><textarea name="catatan" rows="2">${escH(L.catatan||"")}</textarea></label>
 <p><b>Template dokumen</b> <small>(surat pengantar, pernyataan pemanfaatan data, tarif, dll.)</small></p><div id="pdTplList">${[...T,{judul:"",file:""},{judul:"",file:""}].map((x,i)=>`<div class="pd-tpl-r"><input name="tj${i}" placeholder="Judul dokumen" value="${escH(x.judul)}">${x.file?`<a href="${fileURL(x.file)}" target="_blank" rel="noopener">lihat</a><input type="hidden" name="tf${i}" value="${escH(x.file)}"><label class="cek"><input type="checkbox" name="th${i}"> hapus</label>`:`<input type="file" name="tu${i}" accept=".pdf,.docx,.pptx,application/pdf">`}</div>`).join("")}</div>
 <button class="pbtn" type="submit">Simpan pengaturan</button></form>`}
async function pdSimpanSet(f){const L=LAY(),T=[];for(let i=0;i<20;i++){const j=f["tj"+i];if(!j)break;const jd=j.value.trim(),ada=f["tf"+i]&&f["tf"+i].value,hapus=f["th"+i]&&f["th"+i].checked,up=f["tu"+i]&&f["tu"+i].files[0];let file=ada&&!hapus?ada:"";if(up){pesan("Mengunggah "+up.name+"…");file=(await admUnggah(up)).kunci}if(file&&jd)T.push({judul:jd,file});else if(file&&!jd)throw new Error("Tulis judul untuk setiap template dokumen.")}
 await admJSON("/admin/pengaturan",{kunci:"permohonan",nilai:{aktif:f.aktif.checked,simponi_gangguan:f.simponi_gangguan.checked,sla:+f.sla.value||5,simponi:f.simponi.value.trim(),wa:f.wa.value.trim(),turnstile_key:f.turnstile_key.value.trim(),catatan:f.catatan.value.trim(),template:T}});await muatUlangKA();pdAdmGambar();pesan("Pengaturan layanan disimpan.")}
async function pdNotifMuat(){const el=document.getElementById("pdNotifIsi");if(!el)return;try{const j=await admJSON("/admin/permohonan/notif",{});PD_ADM.notif=j;el.innerHTML=pdNotifHTML(j)}catch(e){el.innerHTML=`<p class="admnote">${escH(e.message)}</p>`}}
function pdNotifHTML(j){const c=j.notif||{},pil=(ok,ya,tidak)=>ok?`<span class="pd-pill ok">${ya}</span>`:`<span class="pd-pill warn">${tidak}</span>`,sb=x=>x==="admin"?"dari Admin":x==="cloudflare"?"dari Secret Cloudflare":"";
 return `<p class="admnote">Petugas diberi tahu saat ada <b>permohonan data baru</b>, berkas dilengkapi, bukti bayar masuk, <b>pengaduan</b> atau <b>laporan WBS</b> baru. Pilih salah satu atau ketiganya. Semua <b>gratis</b>.</p>
 <div class="nt-kartu nt-hp"><h3><span aria-hidden="true">📱</span> Notifikasi di HP / komputer ${pil(j.vapid,"siap","belum terpasang")}</h3>
 ${j.vapid?`<p class="admnote">Paling mudah. Buka halaman Admin di HP petugas, lalu tekan tombol di bawah sekali. Notifikasi muncul walau web sedang tidak dibuka. <b>iPhone:</b> buka Admin di Safari › Bagikan › <i>Tambah ke Layar Utama</i>, buka dari ikon itu, baru tekan tombolnya.</p>
 <div class="pd-push-r"><input id="pdPushNama" value="${escH(/iPhone|iPad/.test(navigator.userAgent)?"iPhone":/Android/.test(navigator.userAgent)?"HP Android":"Komputer")}" aria-label="Nama perangkat"><button type="button" class="pbtn" id="pdPushOn">🔔 Aktifkan notifikasi di perangkat ini</button></div>`:`<p class="admnote">Kunci notifikasi belum tersedia. Pastikan kode robot staklim-admin sudah diperbarui.</p>`}
 <ul class="pd-push-l">${(j.perangkat||[]).map((p,i)=>`<li>📱 ${escH(p.nama)} <small>sejak ${escH(pdTgl(p.dibuat))}</small> <button type="button" class="mini" data-pdpushhapus="${i}">Hapus</button></li>`).join("")||'<li class="admnote">Belum ada perangkat terdaftar.</li>'}</ul></div>
 <form id="pdNotif" autocomplete="off">
 <div class="nt-kartu nt-tele"><h3><span aria-hidden="true">✈️</span> Telegram ${pil(j.tele,"terpasang"+(j.tele_bot?" · @"+escH(j.tele_bot):""),"belum terpasang")} ${j.tele_sumber?`<small>${sb(j.tele_sumber)}</small>`:""}</h3>
 <details class="nt-panduan"${j.tele?"":" open"}><summary>Cara memasang (sekali saja, ±5 menit)</summary><ol>
  <li>Buka aplikasi <b>Telegram</b>, cari <b>@BotFather</b> (bercentang biru), lalu tekan <b>Start</b>.</li>
  <li>Kirim <code>/newbot</code>. Ketik nama bot, mis. <i>Staklim Papua Barat Layanan</i>.</li>
  <li>Ketik nama pengguna bot yang diakhiri <code>bot</code>, mis. <i>staklim_pabar_layanan_bot</i>.</li>
  <li>BotFather membalas dengan <b>token</b> (bentuknya <code>123456789:AAH…</code>). Salin token itu dan tempel di kotak di bawah, lalu tekan <b>Simpan notifikasi</b>.</li>
  <li>Setiap petugas penerima mencari nama bot tadi di Telegram dan menekan <b>Start</b> sekali. Untuk grup: masukkan bot ke grup.</li>
  <li>Kembali ke sini, tekan <b>Cari petugas</b>, centang siapa yang menerima, simpan, lalu tekan <b>Kirim tes</b>.</li></ol>
  <p class="admnote">Jangan bagikan token ke siapa pun. Bila token bocor, kirim <code>/revoke</code> ke @BotFather lalu tempel token baru di sini.</p></details>
 <label>Token bot Telegram<input type="password" name="tele_token" autocomplete="off" spellcheck="false" placeholder="${j.tele?"Sudah terpasang. Isi hanya bila ingin mengganti":"Tempel token dari @BotFather"}"></label>
 ${j.tele_sumber==="admin"?`<label class="cek"><input type="checkbox" name="hapus_tele"> Hapus token Telegram</label>`:""}
 <p class="admnote">Penerima Telegram:</p>
 <div id="pdTeleList">${(c.penerima||[]).map((p,i)=>`<label class="cek"><input type="checkbox" data-tele="${escH(p.id)}" data-nama="${escH(p.nama)}"${p.aktif!==false?" checked":""}> ${escH(p.nama||p.id)}</label>`).join("")||'<p class="admnote">Belum ada penerima.</p>'}</div>
 <p><button type="button" class="mini" id="pdTeleCari"${j.tele?"":" disabled"}>🔎 Cari petugas atau grup yang sudah menyapa bot</button></p>
 <p class="admnote">Untuk grup: masukkan bot ke grup. Bila grup tidak muncul, kirim <code>/start@${escH(j.tele_bot||"nama_bot")}</code> di grup (bot tidak membaca pesan biasa di grup), lalu tekan tombol di atas. Telegram hanya menyimpan sapaan selama 24 jam.</p>
 <p class="admnote">Yang dikirim ke Telegram dan email petugas: permohonan data, bukti bayar, berkas, serta masukan (kesalahan, saran, pertanyaan, kritik, pengaduan) beserta kontak pengirimnya. Laporan WBS hanya dikirim ke email penerima WBS.</p></div>
 <div class="nt-kartu nt-email"><h3><span aria-hidden="true">✉️</span> Email (Brevo) ${pil(j.brevo,"terpasang"+(j.brevo_ujung?" · kunci "+escH(j.brevo_ujung):""),"belum terpasang")} ${j.brevo_sumber?`<small>${sb(j.brevo_sumber)}</small>`:""}</h3>
 <details class="nt-panduan"${j.brevo?"":" open"}><summary>Cara memasang</summary><ol>
  <li>Masuk ke <b>brevo.com</b> dengan email kantor. Di <b>Senders, Domains &amp; Dedicated IPs</b> › <b>Senders</b>, pastikan email kantor sudah <b>terverifikasi</b>.</li>
  <li>Buka menu <b>SMTP &amp; API</b> › tab <b>API Keys</b> › <b>Generate a new API key</b>. Beri nama, mis. <i>web staklim</i>. Bila ada pilihan izin, cukup izinkan <b>Transactional emails</b>.</li>
  <li>Salin kunci (diawali <code>xkeysib-</code>), tempel di kotak di bawah, isi email pengirim yang sudah terverifikasi, lalu tekan <b>Simpan notifikasi</b> dan <b>Kirim tes</b>.</li></ol>
  <p class="admnote">Paket gratis Brevo: 300 email per hari, cukup untuk kantor. WhatsApp di Brevo <b>berbayar per pesan</b>, jadi tidak dipakai.</p></details>
 <label>Kunci API Brevo<input type="password" name="brevo_key" autocomplete="off" spellcheck="false" placeholder="${j.brevo?"Sudah terpasang. Isi hanya bila ingin mengganti":"Tempel kunci xkeysib-…"}"></label>
 ${j.brevo_sumber==="admin"?`<label class="cek"><input type="checkbox" name="hapus_brevo"> Hapus kunci Brevo</label>`:""}
 <div class="admgrid"><label>Email pengirim (sudah diverifikasi di Brevo)<input name="pengirim_email" type="email" value="${escH((c.pengirim||{}).email||"")}"></label><label>Nama pengirim<input name="pengirim_nama" value="${escH((c.pengirim||{}).nama||"Stasiun Klimatologi Papua Barat")}"></label></div>
 <label>Email petugas penerima notifikasi <small>(satu per baris)</small><textarea name="email_admin" rows="3">${escH((c.email_admin||[]).join("\n"))}</textarea></label></div>
 <p class="admnote">🔒 Token dan kunci disimpan di robot dan <b>tidak pernah ditampilkan lagi</b>, termasuk di halaman ini.</p>
 <p><button class="pbtn" type="submit">Simpan notifikasi</button> <button type="button" class="pbtn sek" id="pdTes">Kirim tes</button></p><p class="admnote" id="pdNotifKet" role="status"></p></form>`}
function pdNotifData(f){const o={simpan:1,penerima:[...f.querySelectorAll("[data-tele]")].map(x=>({id:x.dataset.tele,nama:x.dataset.nama,aktif:x.checked})),email_admin:f.email_admin.value.split(/[\s,;]+/).filter(Boolean),pengirim:{email:f.pengirim_email.value.trim(),nama:f.pengirim_nama.value.trim()}};
 const t=(f.tele_token||{}).value,b=(f.brevo_key||{}).value;if(t&&t.trim())o.tele_token=t.trim();if(b&&b.trim())o.brevo_key=b.trim();if(f.hapus_tele&&f.hapus_tele.checked)o.hapus_tele=1;if(f.hapus_brevo&&f.hapus_brevo.checked)o.hapus_brevo=1;return o}
function admNotif(){return `<div id="pdAdm" class="nt-tab"><div id="pdNotifIsi"><p class="admnote">Memuat pengaturan notifikasi…</p></div></div>`}
async function pdBukaFile(jalur){const r=await fetch(KONTEN_URL+jalur,{method:"POST",headers:{"X-Admin":ADM_PASS}});if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.galat||"File tidak bisa dibuka")}return r.blob()}
async function pdDetail(t){const j=await admJSON("/admin/permohonan/detail",{tiket:t});PD_ADM.detail=j.data;return j.data}
function pdGantiBaris(r){const d=(ADM_PD&&ADM_PD.daftar)||[],i=d.findIndex(x=>x.tiket===r.tiket);const s={tiket:r.tiket,waktu:r.waktu,nama:r.nama,instansi:r.instansi,hp:r.hp,kat:r.kat,status:r.status,ringkas:String(r.kebutuhan||"").slice(0,90),diubah:r.diubah,selesai:r.selesai||"",diarsip:r.diarsip||"",dihapus:r.dihapus||"",perkiraan:r.perkiraan};if(i>=0)d[i]={...d[i],...s}}
/* Excel sederhana (XML) tanpa pustaka tambahan selain JSZip */
async function xlsxBlob(nama,rows){const JSZip=await muatJsZip(),z=new JSZip(),x=t=>String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,"");const kol=n=>{let s="";n++;while(n){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s};
 const sh=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows.map((r,i)=>`<row r="${i+1}">${r.map((v,c)=>typeof v==="number"?`<c r="${kol(c)}${i+1}"><v>${v}</v></c>`:`<c r="${kol(c)}${i+1}" t="inlineStr"${i===0?' s="1"':""}><is><t>${x(v)}</t></is></c>`).join("")}</row>`).join("")}</sheetData></worksheet>`;
 z.file("[Content_Types].xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`);
 z.file("_rels/.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`);
 z.file("xl/workbook.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${x(nama).slice(0,31)}" sheetId="1" r:id="rId1"/></sheets></workbook>`);
 z.file("xl/_rels/workbook.xml.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
 z.file("xl/styles.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`);
 z.file("xl/worksheets/sheet1.xml",sh);return {zip:z,blob:()=>z.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}}
function unduhBlob(b,nama){const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=nama;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000)}
const pdExt=s=>/pdf/.test(s.tipe||"application/pdf")?".pdf":/png/.test(s.tipe)?".png":".jpg";
function pdBerkas(r){if(!r)return [];const o=[];(r.surat||[]).forEach((s,i)=>o.push({jenis:"surat",i,path:"berkas/"+r.tiket+"-surat-"+(i+1)+".pdf"}));const nj={};(r.dok||[]).forEach((s,i)=>{nj[s.jenis]=(nj[s.jenis]||0)+1;o.push({jenis:"dok",i,path:"berkas/"+r.tiket+"-"+s.jenis+"-"+nj[s.jenis]+pdExt(s)})});(((r.bayar||{}).bukti)||[]).forEach((s,i)=>o.push({jenis:"bukti",i,path:"berkas/"+r.tiket+"-buktibayar-"+(i+1)+pdExt(s)}));return o}
const lamaHari=x=>{const a=Date.parse(x.waktu),b=Date.parse(x.selesai||"");return b>a?Math.round((b-a)/864e5*10)/10:""};
async function pdRekapRows(lengkap){const D=(ADM_PD&&ADM_PD.daftar)||[];const head=lengkap?["Tiket","Tanggal masuk","Nama","Instansi","HP","Email","Kegiatan","Data","Lokasi","Periode","Tujuan","Status","Tanggal selesai","Lama (hari)","Kode billing","Nominal (Rp)","NTPN","Cara bayar","Petugas","Catatan","Dokumen"]:["Tiket","Tanggal masuk","Instansi","Kegiatan","Data","Status","Tanggal selesai","Lama (hari)"];const rows=[head];
 for(const x of D){if(!lengkap){rows.push([x.tiket,pdJam(x.waktu),x.instansi,x.kat+". "+(PD_KAT[x.kat]||""),x.ringkas,PD_ST[x.status]||x.status,x.selesai?pdJam(x.selesai):"",lamaHari(x)]);continue}
  const r=await pdDetail(x.tiket).catch(()=>null)||x;rows.push([r.tiket,pdJam(r.waktu),r.nama,r.instansi,r.hp||"",r.email||"",r.kat+". "+(PD_KAT[r.kat]||""),r.kebutuhan||x.ringkas,r.lokasi||"",r.periode||"",r.tujuan||"",PD_ST[r.status]||r.status,r.selesai?pdJam(r.selesai):"",lamaHari(r),(r.bayar||{}).kode||"",+(r.bayar||{}).nominal||"",(r.bayar||{}).ntpn||"",r.bayar?((r.bayar.metode==="mandiri")?"Mandiri (WA)":"SIMPONI"):"",r.petugas||"",r.catatan||"",pdBerkas(r).map(x=>x.path).join(", ")])}
 return rows}
async function pdAdmKlik(e){const t=e.target;
 const f=t.closest("[data-pdf]");if(f){PD_ADM.filter=f.dataset.pdf;pdAdmGambar();return}
 const kc=t.closest("[data-pdkat]");if(kc){PD_ADM.kat=PD_ADM.kat===kc.dataset.pdkat?"":kc.dataset.pdkat;if(PD_ADM.kat&&PD_ADM.filter==="aktif")PD_ADM.filter="semua";pdAdmGambar();return}
 if(t.closest("#pdSegar")){await muatPD();pdAdmGambar();return}
 const k=t.closest("[data-pdkelola]");if(k){const tk=k.dataset.pdkelola;if(PD_ADM.buka===tk){PD_ADM.buka="";pdAdmGambar();return}PD_ADM.buka=tk;PD_ADM.detail=null;pdAdmGambar();try{await pdDetail(tk);if(PD_ADM.buka===tk)pdAdmGambar()}catch(er){pesan(er.message,1)}return}
 const s=t.closest("[data-pdfilej]");if(s){const w=window.open("","_blank");try{const b=await pdBukaFile(`/admin/permohonan/surat?jenis=${s.dataset.pdfilej}&t=${encodeURIComponent(PD_ADM.buka)}&i=${s.dataset.pdfilei}`);const u=URL.createObjectURL(b);if(w)w.location=u;else unduhBlob(b,PD_ADM.buka+".pdf")}catch(er){if(w)w.close();pesan(er.message,1)}return}
 const hh=t.closest("[data-pdhasilhapus]");if(hh){if(!hh.dataset.yakin){hh.dataset.yakin=1;hh.textContent="Klik lagi";return}try{const j=await admJSON("/admin/permohonan/hasil-hapus",{tiket:PD_ADM.buka,i:+hh.dataset.pdhasilhapus});PD_ADM.detail=j.data;pdAdmGambar()}catch(er){pesan(er.message,1)}return}
 const p=t.closest("[data-pdpilih]");if(p){p.checked?PD_ADM.pilih.add(p.dataset.pdpilih):PD_ADM.pilih.delete(p.dataset.pdpilih);const hb=document.getElementById("pdHapusPribadi");if(hb)hb.textContent=`Hapus data pribadi tiket terpilih (${PD_ADM.pilih.size})`;return}
 if(t.id==="pdPilihSemua"){document.querySelectorAll("[data-pdpilih]").forEach(c=>{c.checked=t.checked;t.checked?PD_ADM.pilih.add(c.dataset.pdpilih):PD_ADM.pilih.delete(c.dataset.pdpilih)});const hb=document.getElementById("pdHapusPribadi");if(hb)hb.textContent=`Hapus data pribadi tiket terpilih (${PD_ADM.pilih.size})`;return}
 if(t.closest("#pdRekap")){try{pesan("Menyusun rekap…");const x=await xlsxBlob("Rekap",await pdRekapRows(false));unduhBlob(await x.blob(),"Rekap-Permohonan-Data-"+new Date().toISOString().slice(0,10)+".xlsx");pesan("Rekap diunduh.")}catch(er){pesan(er.message,1)}return}
 if(t.closest("#pdArsip")){const ket=document.getElementById("pdArsipKet");try{const D=(ADM_PD&&ADM_PD.daftar)||[];pesan("Menyusun arsip lengkap…");const rows=await pdRekapRows(true),x=await xlsxBlob("Permohonan",rows),z=x.zip;const JSZip=await muatJsZip(),arsip=new JSZip();arsip.file("Permohonan-Data.xlsx",await x.blob());let n=0;
   for(const d of D){const r=PD_ADM.detail&&PD_ADM.detail.tiket===d.tiket?PD_ADM.detail:await pdDetail(d.tiket).catch(()=>null);for(const x of pdBerkas(r)){ket.textContent=`Mengambil berkas ${d.tiket}…`;try{arsip.file(x.path,await pdBukaFile(`/admin/permohonan/surat?jenis=${x.jenis}&t=${encodeURIComponent(d.tiket)}&i=${x.i}`));n++}catch(er){}}}
   unduhBlob(await arsip.generateAsync({type:"blob"}),"Arsip-Permohonan-Data-"+new Date().toISOString().slice(0,10)+".zip");
   const j=await admJSON("/admin/permohonan/arsip-tandai",{tiket:D.filter(x=>!x.dihapus).map(x=>x.tiket)});ADM_PD.daftar=j.daftar;PD_ADM.detail=null;pdAdmGambar();const k2=document.getElementById("pdArsipKet");if(k2)k2.textContent=`Arsip diunduh: ${D.length} permohonan, ${n} berkas. Simpan file zip itu di komputer atau Drive kantor.`;pesan("Arsip lengkap diunduh.")}catch(er){pesan(er.message,1)}return}
 if(t.closest("#pdHapusPribadi")){const b=t.closest("#pdHapusPribadi"),L=[...PD_ADM.pilih];if(!L.length){pesan("Centang dulu tiket yang data pribadinya akan dihapus.",1);return}const D=ADM_PD.daftar||[],belum=L.filter(x=>!(D.find(d=>d.tiket===x)||{}).diarsip);if(belum.length){pesan(`${belum.length} tiket belum diarsipkan. Unduh arsip lengkap dulu.`,1);return}
  if(!b.dataset.yakin){b.dataset.yakin=1;b.textContent=`Yakin? Nama, HP, email, surat, dan file hasil ${L.length} tiket dihapus permanen. Klik lagi.`;return}
  try{const j=await admJSON("/admin/permohonan/hapus-pribadi",{tiket:L});ADM_PD.daftar=j.daftar;PD_ADM.pilih.clear();PD_ADM.detail=null;pdAdmGambar();pesan(`Data pribadi ${j.n} tiket dihapus. Rekapnya tetap tersimpan.`)}catch(er){pesan(er.message,1)}return}
 if(t.closest("#pdTeleCari")){try{const j=await admJSON("/admin/permohonan/tele-cari",{});const box=document.getElementById("pdTeleList"),ada=new Set([...box.querySelectorAll("[data-tele]")].map(x=>x.dataset.tele));const baru=(j.chat||[]).filter(c=>!ada.has(c.id));if(box.querySelector("p"))box.innerHTML="";box.insertAdjacentHTML("beforeend",baru.map(c=>`<label class="cek"><input type="checkbox" data-tele="${escH(c.id)}" data-nama="${escH(c.nama)}" checked> ${escH(c.nama)} <small>(baru)</small></label>`).join(""));document.getElementById("pdNotifKet").textContent=baru.length?`${baru.length} petugas ditemukan. Tekan Simpan notifikasi.`:"Tidak ada petugas atau grup baru. Pastikan petugas sudah menekan Start (atau di grup sudah dikirim /start@nama_bot) dalam 24 jam terakhir, lalu coba lagi."}catch(er){pesan(er.message,1)}return}
 if(t.closest("#pdPushOn")){const b=t.closest("#pdPushOn");b.disabled=true;try{await pdPushAktif();pesan("Notifikasi aktif di perangkat ini. Tekan Kirim tes untuk mencoba.");pdNotifMuat()}catch(er){pesan(er.message,1)}b.disabled=false;return}
 const ph=t.closest("[data-pdpushhapus]");if(ph){const p=((PD_ADM.notif||{}).perangkat||[])[+ph.dataset.pdpushhapus];if(!p)return;try{await admJSON("/admin/permohonan/push-hapus",{endpoint:p.endpoint});pdNotifMuat()}catch(er){pesan(er.message,1)}return}
 if(t.closest("#pdTes")){const f=document.getElementById("pdNotif"),ket=document.getElementById("pdNotifKet");try{await admJSON("/admin/permohonan/notif",pdNotifData(f));const j=await admJSON("/admin/permohonan/tes",{});ket.textContent=`HP: ${j.push&&j.push.ok?"terkirim ke "+j.push.n+" perangkat":"gagal ("+((j.push||{}).galat||"")+")"} · Telegram: ${j.tele.ok?"terkirim ke "+j.tele.n+" petugas":"gagal ("+(j.tele.galat||"")+")"} · Email: ${j.email.ok?"terkirim":"gagal ("+(j.email.galat||"")+")"}.`}catch(er){pesan(er.message,1)}return}}
async function pdAdmSubmit(e){const f=e.target;if(!["pdUbah","pdSet","pdNotif"].includes(f.id))return;e.preventDefault();e.stopPropagation();const btn=f.querySelector('button[type="submit"]');if(btn)btn.disabled=true;
 try{if(f.id==="pdUbah"){const j=await admJSON("/admin/permohonan/ubah",{tiket:PD_ADM.buka,status:f.status.value,alasan:f.alasan.value,ket:f.ket.value,catatan:f.catatan.value,petugas:f.petugas.value,tanpa_file:f.tanpa_file.checked,minta:[...f.querySelectorAll("[name=minta]:checked")].map(x=>x.value),...(f.b_kode?{bayar:{kode:f.b_kode.value,nominal:f.b_nominal.value,batas:f.b_batas.value,metode:f.b_metode.value,ntpn:f.b_ntpn.value}}:{})});PD_ADM.detail=j.data;ADM_PD.daftar=j.daftar;segarTabPD();pdAdmGambar();const n=j.notif&&j.notif.email;pesan(`${j.data.tiket}: ${(j.simpan||[]).length?"tersimpan "+j.simpan.join(", "):"tidak ada perubahan"}. Status sekarang ${PD_ST[j.data.status]}.${n?n.ok?" Pemohon diberi tahu lewat email.":" Email ke pemohon tidak terkirim ("+(n.galat||"")+").":""}`)}
  else if(f.id==="pdSet")await pdSimpanSet(f);
  else{await admJSON("/admin/permohonan/notif",pdNotifData(f));pesan("Pengaturan notifikasi disimpan.");pdNotifMuat()}}catch(er){pesan(er.message,1)}if(btn)btn.disabled=false}
async function pdAdmUbahFile(e){const t=e.target;
 if(t.closest&&t.closest("#pdUbah")&&["status","b_kode","b_ntpn","b_metode"].includes(t.name)){const f=t.form,st=f.status.value,ms=f.querySelector(".pd-k-minta");if(ms)ms.hidden=st!=="lengkapi";const r=PD_ADM.detail||{};const ig=document.getElementById("pdIngat");if(ig)ig.innerHTML=pdPeringatanUbah({...r,bayar:{...(r.bayar||{}),kode:f.b_kode?f.b_kode.value:(r.bayar||{}).kode,ntpn:f.b_ntpn?f.b_ntpn.value:(r.bayar||{}).ntpn,metode:f.b_metode?f.b_metode.value:""}},st);return}
 if(t.id==="pdFilter"){PD_ADM.filter=t.value;pdAdmGambar();return}
 if(t.id==="pdFilterKat"){PD_ADM.kat=t.value;pdAdmGambar();return}
 if(t.id==="pdHasilFile"&&t.files[0]){const fl=t.files[0];if(fl.size>25*1048576){pesan("File hasil maksimal 25 MB. Kompres (zip) atau bagi menjadi beberapa file.",1);return}try{pesan("Mengunggah "+fl.name+"…");const j=await admFetch(`/admin/permohonan/hasil?t=${encodeURIComponent(PD_ADM.buka)}`,{body:fl,headers:{"Content-Type":fl.type||"application/octet-stream","X-Nama-File":encodeURIComponent(fl.name)}});PD_ADM.detail=j.data;pdAdmGambar();pesan("File "+fl.name+" diunggah. Ubah status ke Selesai bila sudah lengkap.")}catch(er){pesan(er.message,1)}}}
function pasangAdmPD(){const box=document.getElementById("pdAdm");if(!box||box.dataset.pasang)return;box.dataset.pasang=1;box.addEventListener("click",e=>{pdAdmKlik(e)});box.addEventListener("submit",pdAdmSubmit,true);box.addEventListener("change",pdAdmUbahFile);
 box.addEventListener("input",e=>{if(e.target.id==="pdCariAdm"){PD_ADM.cari=e.target.value;clearTimeout(pasangAdmPD.t);pasangAdmPD.t=setTimeout(()=>{const pos=e.target.selectionStart;pdAdmGambar();const i=document.getElementById("pdCariAdm");if(i){i.focus();try{i.setSelectionRange(pos,pos)}catch(er){}}},300)}});
 box.addEventListener("toggle",e=>{if(e.target.id==="pdNotifSec"&&e.target.open&&!PD_ADM.notifDimuat){PD_ADM.notifDimuat=1;pdNotifMuat()}},true)}

async function pdPushAktif(){if(!("serviceWorker" in navigator)||!("PushManager" in window)||!("Notification" in window))throw new Error("Browser ini belum mendukung notifikasi. Di iPhone, tambahkan halaman Admin ke Layar Utama dulu, lalu buka dari ikon itu.");
 const j=PD_ADM.notif;if(!j||!j.vapid)throw new Error("Kunci notifikasi (VAPID_JWK) belum dipasang di robot staklim-admin.");
 const izin=await Notification.requestPermission();if(izin!=="granted")throw new Error("Izin notifikasi ditolak. Buka pengaturan situs di browser, izinkan notifikasi, lalu coba lagi.");
 await navigator.serviceWorker.register("/sw-admin.js",{scope:"/admin"});const reg=await navigator.serviceWorker.ready;
 const kunci=Uint8Array.from(atob(j.vapid.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-j.vapid.length%4)%4)),c=>c.charCodeAt(0));
 let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:kunci});
 const nm=(document.getElementById("pdPushNama")||{}).value||"HP petugas";await admJSON("/admin/permohonan/push-daftar",{sub:sub.toJSON(),nama:nm})}

P["layanan-data"]=()=>head("Permintaan Pelayanan Data","Permintaan Pelayanan Data","Ajukan permintaan data iklim lewat ClimaX Dulu, lalu pantau prosesnya dengan nomor tiket atau nomor HP.")+clxTentang()+kalenderProduk()+layananPanel()+wilayahLayanan()+`<section class="sec"><div class="sechead"><div><span class="eyebrow">Permintaan Data</span><h2>Data &amp; Cara Mengajukan</h2></div></div>
${(L=>`<div class="grid2"><div class="card prose"><h3 style="margin-top:0">Data dan Informasi yang Kami Sediakan</h3><ul>${L.data.map(x=>`<li>${tebal(x)}</li>`).join("")}</ul>
<h3>Tarif</h3>${markahHTML(L.tarif)}</div>
<div class="card prose"><h3 style="margin-top:0">Alur Permintaan</h3><ol>${L.alur.map(x=>`<li>${tebal(String(x).split("{email}").join(INFO().email||""))}</li>`).join("")}</ol>
`)(layananData())}<p><a href="https://ptsp.bmkg.go.id" target="_blank" rel="noopener">Buka PTSP BMKG →</a></p></div></div>${skmKartu()}</section>
<section class="sec" id="kontak-kami"><div class="sechead"><div><span class="eyebrow">Kontak</span><h2>Hubungi Kami</h2></div></div><div class="kontakgrid">${kartuKontak()}${petaKantor()}</div></section>`;

/* ===== SURVEI KEPUASAN MASYARAKAT (SKM) =====
   Tautan diisi petugas di Admin > Tampilan Web. Tautan e-SKM BMKG memuat bulan (YYYY-MM) dan hanya berlaku di bulan itu,
   jadi tombol otomatis disembunyikan setelah bulannya lewat, dan Admin mendapat pengingat. */
const SKM=()=>((KA&&KA.pengaturan&&KA.pengaturan.skm)||{});
function skmInfo(){const u=String(SKM().url||"").trim();if(!/^https:\/\/eskm\.bmkg\.go\.id\/survey\/[A-Za-z0-9\/_.-]+$/.test(u))return {url:"",ada:false,aktif:false};
 const m=u.match(/\/(\d{4})-(\d{2})(?=\/|$)/),kini=new Date(Date.now()+9*3600e3).toISOString().slice(0,7),bulan=m?m[1]+"-"+m[2]:"";
 return {url:u,ada:true,bulan,aktif:!bulan||bulan>=kini,lewat:!!bulan&&bulan<kini}}
const namaBulanYM=ym=>{const m=String(ym||"").match(/^(\d{4})-(\d{2})$/);return m?["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][+m[2]-1]+" "+m[1]:ym};
/* ===== GERBANG SURVEI SEBELUM UNDUH =====
   Semua unduhan publik (buletin, publikasi, lampiran, CSV pos hujan & alat) baru terbuka setelah pengunjung
   membuka tautan Survei Kepuasan Masyarakat (diisi petugas di Admin) dan mencentang "sudah mengisi".
   Diingat 14 hari di perangkat itu. Tanpa tautan SKM yang berlaku, unduhan langsung terbuka. */
const SKM_HARI=14,SKM_KUNCI="skm_isi",SKM_MIN_DETIK=120;let SKM_LEWAT=false,SKM_SESI=0;
function skmSudah(){if(SKM_SESI&&Date.now()-SKM_SESI<SKM_HARI*864e5)return true;try{const t=+localStorage.getItem(SKM_KUNCI)||0;return !!t&&Date.now()-t<SKM_HARI*864e5}catch(e){return false}}
function skmTandai(){SKM_SESI=Date.now();try{localStorage.setItem(SKM_KUNCI,String(SKM_SESI))}catch(e){}}
const skmBuka=()=>{try{return +sessionStorage.getItem("skm_buka")||0}catch(e){return 0}},skmCatatBuka=()=>{try{sessionStorage.setItem("skm_buka",String(Date.now()))}catch(e){}};
function elUnduhan(t){if(!t||!t.closest||typeof cur==="undefined"||cur==="admin")return null;if(t.closest(".skmgate,#admPanel,.adm"))return null;
 const b=t.closest("#rekapCsv,[data-ph-csv]");if(b)return b;const a=t.closest("a[href]");if(!a)return null;const h=a.getAttribute("href")||"";
 if(/eskm\.bmkg\.go\.id/i.test(h)||/^blob:|^data:/i.test(h))return null;
 if(a.closest("[data-bebas-skm]")||/lkjip|lakip/i.test(h))return null;
 if(a.hasAttribute("download"))return a;
 if(KONTEN_URL&&h.indexOf(KONTEN_URL+"/file/")===0)return /-g(?:[?#]|$)/.test(h)?null:a;
 if(/^(?!https?:|\/\/|#|mailto:|tel:)[^?#]*\.(pdf|pptx?|docx?|xlsx?|csv|zip)(\?|#|$)/i.test(h))return a;
 try{const u=new URL(h,location.href);if(u.origin===location.origin&&/\.(pdf|pptx?|docx?|xlsx?|csv|zip)$/i.test(u.pathname))return a}catch(e){}
 return null}
function namaUnduhan(el){const t=(el.textContent||"").replace(/\s+/g," ").trim();const k=el.closest(".pubc,.card,.pub,.nitem,.slide,article,li");const j=k&&k.querySelector("h3,h2,b,strong");const jj=j&&(j.textContent||"").trim();return jj&&jj.length<140&&!/^unduh/i.test(jj)?jj:(t&&t.length<80?t.replace(/[↗⬇️]/g,"").trim():"file")}
function gerbangSkm(el){const s=skmInfo();if(!s.aktif)return false;if(skmSudah())return false;
 let d=document.getElementById("skmGate");if(d)d.remove();d=document.createElement("div");d.id="skmGate";d.className="mskbg skmgate";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-labelledby","skmgJ");
 const nm=namaUnduhan(el);
 d.innerHTML=`<div class="mskform skmg"><button type="button" class="mskx" aria-label="Tutup" data-skmg="tutup">✕</button>
 <h2 id="skmgJ">Isi survei dulu, lalu unduh</h2>
 <p class="skmg-file">Unduhan: <b>${escH(nm)}</b></p>
 <p class="skmg-ajak">Penilaian Anda di survei ini <b>dipakai BMKG Pusat untuk menilai layanan Stasiun Klimatologi Papua Barat</b>. Waktunya hanya sekitar 2 menit dan tidak perlu login. Dengan mengisinya, Anda ikut membantu layanan iklim di Papua Barat dan Papua Barat Daya menjadi lebih baik. Terima kasih.</p>
 <ol class="skmg-langkah">
  <li id="skmgL1"><span class="skmg-no">1</span><div><b>Isi Survei Kepuasan Masyarakat</b><small>Survei terbuka di tab baru. Isi sampai selesai, lalu tekan <b>Kirim</b> di akhir survei. Tombol unduh terbuka <b>2 menit</b> setelah Anda mulai mengisi survei.</small><a class="pbtn" id="skmgBuka" href="${escH(s.url)}" target="_blank" rel="noopener">Isi survei sekarang ↗</a></div></li>
  <li id="skmgL2" class="kunci"><span class="skmg-no">2</span><div><b>Unduh file</b><label class="cek skmg-cek"><input type="checkbox" id="skmgCek" disabled> Saya sudah mengisi dan mengirim survei</label><button type="button" class="pbtn" id="skmgUnduh" disabled>⬇️ Unduh</button></div></li>
 </ol>
 <p class="skmg-info" id="skmgInfo" role="status" aria-live="polite">Langkah 2 terbuka setelah Anda membuka survei di langkah 1.</p>
 <p class="skmg-kecil">Survei Kepuasan Masyarakat dilaksanakan sesuai Permenpan RB Nomor 14 Tahun 2017. Setelah mengisi, Anda tidak diminta lagi selama 2 minggu di perangkat ini.</p></div>`;
 document.body.appendChild(d);document.documentElement.classList.add("skmg-terbuka");
 const $=id=>d.querySelector("#"+id),info=$("skmgInfo"),cek=$("skmgCek"),btn=$("skmgUnduh"),buka=$("skmgBuka");let tm=0;
 const nilai=()=>{const t0=skmBuka();if(!t0){info.innerHTML="Langkah 2 terbuka setelah Anda membuka survei di langkah 1.";return}
  $("skmgL1").classList.add("selesai");$("skmgL1").querySelector(".skmg-no").textContent="✓";const det=Math.round((Date.now()-t0)/1000);
  if(det<SKM_MIN_DETIK){cek.disabled=true;$("skmgL2").classList.add("kunci");info.className="skmg-info tunggu";const sisa=SKM_MIN_DETIK-det;info.innerHTML=`<b>Silakan selesaikan survei</b> di tab yang terbuka, lalu tekan Kirim. Tombol unduh terbuka dalam <b class="skmg-hitung">${Math.floor(sisa/60)}:${String(sisa%60).padStart(2,"0")}</b>.`;clearTimeout(tm);tm=setTimeout(nilai,1000);return}
  cek.disabled=false;$("skmgL2").classList.remove("kunci");info.className="skmg-info";info.innerHTML=`<b>Survei sudah dikirim?</b> Centang kotak di langkah 2, lalu tekan Unduh. Terima kasih atas penilaian Anda.`};
 const tutup=()=>{clearTimeout(tm);document.removeEventListener("visibilitychange",kembali);document.removeEventListener("keydown",esk);d.remove();document.documentElement.classList.remove("skmg-terbuka");try{el.focus()}catch(e){}};
 const kembali=()=>{if(document.visibilityState==="visible")nilai()},esk=e=>{if(e.key==="Escape")tutup()};
 d.addEventListener("click",e=>{const a=e.target.closest("#skmgBuka");if(a){if(!skmBuka())skmCatatBuka();setTimeout(nilai,50);return}if(e.target===d||e.target.closest('[data-skmg="tutup"]'))tutup()});
 cek.addEventListener("change",()=>{btn.disabled=!cek.checked});
 btn.addEventListener("click",()=>{if(!cek.checked)return;skmTandai();tutup();SKM_LEWAT=true;try{el.click()}finally{SKM_LEWAT=false}});
 document.addEventListener("visibilitychange",kembali);document.addEventListener("keydown",esk);
 nilai();setTimeout(()=>{try{(skmBuka()?cek:buka).focus()}catch(e){}},30);return true}
document.addEventListener("click",e=>{if(SKM_LEWAT)return;const el=elUnduhan(e.target);if(!el)return;if(gerbangSkm(el)){e.preventDefault();e.stopImmediatePropagation()}},true);

function skmTombol(kelas){const s=skmInfo();return s.aktif?`<a class="${kelas||"pbtn"}" href="${escH(s.url)}" target="_blank" rel="noopener">Isi Survei Kepuasan ↗</a>`:""}
function skmKartu(){const s=skmInfo();if(!s.aktif)return "";
 return `<a class="skmpanel" href="${escH(s.url)}" target="_blank" rel="noopener"><span class="skmbg" aria-hidden="true"><i></i><i></i></span>${skmBintang()}<span class="skmtanya"><b>Bantu kami memperbaiki layanan</b><small>${escH(TW().skm_ajak||SKM_AJAK_BAWAAN)}</small></span><em>Isi survei <span aria-hidden="true">→</span></em></a>`}
function pengingatAdmin(){const s=skmInfo(),out=[];
 if(!s.ada)out.push(`Tautan <b>Survei Kepuasan Masyarakat (SKM)</b> belum diisi, jadi tombol survei tidak tampil di web. Isi di tab <b>Survei Kepuasan (SKM)</b>.`);
 else if(s.lewat)out.push(`Tautan SKM untuk <b>${namaBulanYM(s.bulan)}</b> sudah lewat bulannya, sehingga tombol survei disembunyikan otomatis. Tempel tautan bulan ini di tab <b>Survei Kepuasan (SKM)</b>.`);
 let merah=false;if(ADM_MASUKAN){[["Pengaduan",typeof mskPengaduan==="function"?mskPengaduan:()=>false,"pengaduan"],["Masukan pengunjung",x=>!(typeof mskPengaduan==="function"&&mskPengaduan(x)),"masukan"]].forEach(([nm,fl,tab])=>{const h=hitungMasukan(fl);if(h.baru||h.tangani){if(h.lama>0)merah=true;out.unshift(`${nm}: ${[h.baru?`<b>${h.baru} baru</b>`:"",h.tangani?`<b>${h.tangani} sedang ditangani</b>`:""].filter(Boolean).join(" dan ")}${h.lama?`; <b>${h.lama} sudah lebih dari 7 hari</b> belum ditangani`:""}. <button type="button" class="mini" data-ke-tab="${tab}">Buka tab ${tab==="pengaduan"?"Pengaduan":"Masukan"}</button>`)}})}
 if(typeof pdIngat==="function")out.unshift(...pdIngat());const iw=typeof ingatWbs==="function"?ingatWbs():"";if(iw){merah=true;out.unshift(iw)} return (typeof ingatWbsKotak==="function"?ingatWbsKotak():"")+(out.length?`<div class="admingat${merah?" merah":""}" role="status">${out.map(x=>`<p>🔔 ${x}</p>`).join("")}</div>`:"")}
function admSkm(){const s=skmInfo(),u=String(SKM().url||"");
 return `<form id="admSkm" class="admsub"><fieldset class="kdrow"><legend>Survei Kepuasan Masyarakat (SKM)</legend>
 <label>Tautan survei e-SKM BMKG<input type="url" name="skm_url" value="${escH(u)}" placeholder="https://eskm.bmkg.go.id/survey/…/2026-11/2026/0" pattern="https://eskm\\.bmkg\\.go\\.id/survey/.+"></label>
 <p class="admnote" style="margin:6px 0 0">Tombol <b>Isi Survei Kepuasan</b> tampil di halaman Permintaan Pelayanan Data dan di bagian bawah web. Tautan e-SKM memuat bulan (misalnya <code>2026-11</code>) dan hanya berlaku di bulan itu; setelah bulannya lewat tombol disembunyikan otomatis dan pengingat muncul di atas halaman Admin. Kosongkan untuk menyembunyikan tombol. <b>Selama tautan berlaku, setiap unduhan di web (buletin, publikasi, lampiran, CSV) meminta pengunjung membuka survei ini dulu</b>; pengunjung yang sudah mengisi tidak diminta lagi selama 2 minggu.${s.ada?` Saat ini: ${s.bulan?"periode "+namaBulanYM(s.bulan)+", ":""}${s.aktif?"<b>tampil</b>":"<b>disembunyikan (bulan sudah lewat)</b>"}.`:""}</p>
 <p class="admnote" style="margin:6px 0 0">Periksa nama unit yang muncul di halaman survei sebelum dibagikan.</p>
 <button class="pbtn" type="submit">Simpan tautan SKM</button></fieldset></form>`}
/* ===== KEBIJAKAN PRIVASI & PENAFIAN ===== */
const PRIVASI_BAWAAN=`## Kebijakan Privasi
Situs ini dikelola oleh Stasiun Klimatologi Kelas III Papua Barat, Badan Meteorologi, Klimatologi, dan Geofisika (BMKG).
### Data yang tidak kami kumpulkan
- Situs ini tidak memiliki pendaftaran akun pengunjung. Nama atau kontak hanya kami terima bila Anda sendiri menuliskannya di formulir Kirim Masukan.
- Kami tidak memasang cookie iklan atau pelacak pihak ketiga.
### Data teknis kunjungan
- Situs dilayani melalui jaringan Cloudflare. Seperti situs web pada umumnya, alamat IP dan data teknis permintaan (jenis peramban, waktu akses) diproses oleh penyedia jaringan untuk mengirim halaman dan menjaga keamanan.
- Kami memakai statistik kunjungan Cloudflare Web Analytics yang tidak memakai cookie dan tidak mengenali identitas pengunjung. Statistik ini hanya dipakai untuk mengetahui halaman yang sering dibuka.
- Web juga menghitung sendiri jumlah kunjungan untuk ditampilkan kepada petugas di halaman Admin: jumlah pengunjung per hari dan nama halaman yang dibuka. Yang disimpan hanya angka hitungan, tanpa alamat IP, nama, atau data pribadi lainnya. Kunjungan petugas yang sedang login dihitung terpisah.
- Bila halaman mengalami galat teknis di perangkat Anda, web mengirim laporan singkat otomatis: pesan galat, nama halaman, serta jenis peramban dan sistem operasi (tanpa nama, kontak, atau alamat IP). Laporan dipakai petugas untuk memperbaiki web dan terhapus otomatis setelah 30 hari.
### Penyimpanan di perangkat Anda
Peramban Anda menyimpan salinan sementara data rilisan BMKG, nilai ENSO terakhir, dan pilihan wilayah agar halaman cepat terbuka dan tetap tampil saat sinyal lemah. Peramban juga menyimpan pilihan mode terang/gelap bila Anda menekan tombolnya (hanya selama tab masih terbuka), pilihan untuk menghentikan animasi, serta catatan halaman yang sudah Anda buka hari ini agar kunjungan Anda tidak terhitung dua kali (catatan ini diganti setiap hari). Selain nama halaman untuk hitungan kunjungan di atas, data ini tidak dikirim ke mana pun dan dapat dihapus melalui pengaturan peramban.
### Kirim Masukan
Isi masukan, jenis masukan, halaman asal, dan kontak (bila Anda isi) disimpan di server kami paling lama 6 bulan, lalu terhapus otomatis. Masukan hanya dibaca petugas Stasiun Klimatologi Papua Barat untuk memperbaiki layanan. Alamat IP Anda tidak disimpan; alamat IP hanya dipakai sesaat untuk membatasi kiriman berulang.
### Permintaan data dan kontak
Bila Anda menghubungi kami lewat WhatsApp, email, atau PTSP BMKG, data yang Anda kirim (nama, instansi, keperluan) hanya dipakai untuk melayani permintaan tersebut sesuai ketentuan pelayanan publik BMKG. Percakapan WhatsApp juga tunduk pada kebijakan privasi WhatsApp.
### Tautan ke situs lain
Situs ini menautkan ke situs BMKG Pusat, survei e-SKM BMKG, PTSP BMKG, dan media berita. Situs-situs tersebut memiliki kebijakan privasinya sendiri.
## Penafian
- **Informasi iklim adalah prakiraan berbasis peluang**, bukan kepastian. Prediksi musim dan prakiraan hujan bulanan berlaku untuk wilayah zona musim, kabupaten, atau provinsi, dan dapat berbeda dengan kejadian di satu titik.
- **Bukan prakiraan cuaca harian.** Untuk cuaca harian, peringatan dini cuaca ekstrem, gelombang laut, dan siklon tropis, rujuk kanal resmi BMKG: [bmkg.go.id](https://www.bmkg.go.id), aplikasi InfoBMKG, dan [TCWC Jakarta](https://tropicalcyclone.bmkg.go.id).
- **Data pos hujan** berasal dari pengamatan petugas dan mitra di pos hujan, ditampilkan apa adanya dan belum melalui kontrol kualitas lengkap. Untuk keperluan resmi, ajukan data melalui [Permintaan Pelayanan Data](#layanan-data).
- **Data alat otomatis (AWS/ARG)** tampil apa adanya dari peralatan dan belum melalui kontrol kualitas. Data dapat terputus atau keliru karena gangguan alat atau jaringan. Data ini tidak dapat dipakai sebagai data resmi untuk keperluan hukum, asuransi, atau klaim; ajukan data resmi melalui [Permintaan Pelayanan Data](#layanan-data).
- **Rilisan BMKG Pusat** (ENSO, IOD, MJO, peringatan dini, peta) diambil otomatis dari situs BMKG. Bila ada perbedaan, yang berlaku adalah rilisan resmi di situs BMKG.
- **Berita media** dan gambarnya milik media masing-masing dan ditautkan ke sumber aslinya.
- Isi situs ini boleh dikutip dengan menyebut sumber: BMKG – Stasiun Klimatologi Papua Barat.
## Koreksi dan pertanyaan
Menemukan kesalahan? Hubungi kami di {email} atau {wa}.
Terakhir diperbarui: November 2026.`;
const AKSES_BAWAAN=`Stasiun Klimatologi Kelas III Papua Barat ingin informasi iklim di situs ini bisa dipakai semua orang, termasuk penyandang disabilitas, warga lanjut usia, dan pengguna HP dengan layar kecil atau sinyal lemah.
### Standar yang kami acu
Kami berupaya memenuhi **Pedoman Aksesibilitas Konten Web (WCAG) 2.1 tingkat AA** dari W3C. Situs ini **belum diaudit oleh pihak independen**, sehingga kami belum menyatakan sesuai sepenuhnya.
### Yang sudah kami terapkan
- Tautan **Lompat ke isi utama** di bagian paling atas halaman, untuk pengguna papan ketik dan pembaca layar.
- Kontras warna teks minimal 4,5 : 1 pada teks utama, tombol, dan kartu peringatan dini.
- Tingkat peringatan dini ditulis dengan kata (Waspada, Siaga, Awas, dan "tingkat 1 dari 3"), tidak hanya dengan warna, sehingga tetap terbaca oleh penyandang buta warna.
- Kartu peringatan dini diumumkan oleh pembaca layar ketika tampil.
- Animasi dibuat pelan, tanpa kedipan cepat, dan berhenti otomatis bila perangkat Anda meminta animasi dikurangi.
- Mode gelap mengikuti pengaturan perangkat Anda dan bisa diganti lewat tombol di menu.
- Tampilan menyesuaikan layar HP, tablet, dan komputer. Ukuran huruf bisa diperbesar dengan fitur perbesar (zoom) di peramban tanpa tampilan rusak.
- Setiap halaman bisa dipakai dengan papan ketik saja.
### Keterbatasan yang kami ketahui
- **Peta dari BMKG Pusat** (peta peringatan, peta hujan, peta SPI) berupa gambar. Isinya kami sertakan dalam bentuk teks atau tabel bila tersedia, tetapi tidak semua rincian peta bisa dibacakan.
- **Dokumen PDF** seperti buletin dan paparan dibuat di aplikasi desain, sehingga sebagian belum ramah pembaca layar. Ringkasan isinya tersedia di halaman Iklim.
- **Data alat otomatis** ditampilkan dalam grafik; angka terbarunya juga tersedia dalam bentuk teks.
- Situs ini baru tersedia dalam Bahasa Indonesia.
### Menemukan kendala?
Bila ada bagian yang sulit dibaca atau dipakai, beri tahu kami lewat tombol **Kirim masukan** di pojok kanan bawah, atau hubungi {email} atau {wa}. Sebutkan halaman dan perangkat yang Anda pakai. Kami akan membalas dan memperbaikinya sebisa mungkin.
Terakhir diperbarui: November 2026.`;
P["aksesibilitas"]=()=>{const I0=INFO();return head("Aksesibilitas","Pernyataan Aksesibilitas","Upaya kami agar situs ini bisa dipakai semua orang, dan cara melaporkan kendala.")+
 `<div class="card prose" style="max-width:860px">${markahHTML(TW().akses||AKSES_BAWAAN,{email:I0.email||"email kami",wa:"[WhatsApp "+waTeks(I0.wa)+"]("+waURL()+")"})}</div>`};
P["kebijakan-privasi"]=()=>{const I0=INFO();return head("Kebijakan Privasi","Kebijakan Privasi &amp; Penafian","Bagaimana situs ini memperlakukan data Anda, dan batas penggunaan informasi iklim di dalamnya.")+
 `<div class="card prose" style="max-width:860px">${markahHTML(TW().privasi||PRIVASI_BAWAAN,{email:I0.email||"",wa:"[WhatsApp "+waTeks(I0.wa)+"]("+waURL()+")"})}</div>`};


/* ===== PERALATAN =====
   DATA_URL : alamat robot Cloudflare Worker, contoh "https://staklim-data.namaakun.workers.dev/terkini".
   Password MQTT tersimpan sebagai Secret di Cloudflare, tidak di file ini. */
const DATA_URL=(LEWAT_API?location.origin+"/api/data":LANGSUNG["/api/data"])+"/terkini";
const REFRESH_DETIK=120;
const ALAT=[
 {nama:"AWS Staklim Papua Barat",id:"160009",jenis:"AWS",logger:"CR1000x",wil:"Manokwari",mqtt:1,vpn:1,topic:"device/papbar/data/cr1000x/11407/MQTT_Table/#"},
 {nama:"AWS Manokwari Selatan",id:"STA2288",jenis:"AWS",logger:"CR1000x",wil:"Manokwari Selatan",mqtt:1,vpn:1,topic:"device/papbar/data/cr1000x/35661/MQTT_Table/#"},
 {nama:"AWS GAW Vihara Klademak",id:"160020",jenis:"AWS",logger:"CR1000x",wil:"Kota Sorong",mqtt:1,vpn:1,topic:"device/q425cfbt7q3sp7h/data/cr1000x/50509/MQTT_Table/#"},
 {nama:"AWS Rasiei",id:"STW1063",jenis:"AWS",logger:"CR1000x",wil:"Teluk Wondama",mqtt:1,vpn:1,topic:"device/zb73mk0fy00n312/data/cr1000x/50751/MQTT_Table/#"},
 {nama:"ARG Suteibey",id:"STAL341",jenis:"ARG",logger:"CR310",wil:"",mqtt:1,vpn:1,topic:"device/papbar/arg/STAL341"},
 {nama:"ARG Ayamaru",id:"150105",jenis:"ARG",logger:"CR310",wil:"Maybrat",mqtt:1,vpn:1,topic:"device/papbar/arg/150105"},
 {nama:"ARG Moswaren",id:"150104",jenis:"ARG",logger:"CR310",wil:"Sorong Selatan",mqtt:1,vpn:1,topic:"device/papbar/arg/150104"},
 {nama:"ARG Senopi",id:"STA0235",jenis:"ARG",logger:"CR310",wil:"Tambrauw",mqtt:1,vpn:1,topic:"device/papbar/arg/STA0235"},
 {nama:"ARG Manimere",id:"STA0234",jenis:"ARG",logger:"CR310",wil:"Teluk Bintuni",mqtt:1,vpn:1,topic:"device/0jt64i994f3q983/data/cr300/#"},
 {nama:"ARG Stageof Sorong",id:"150220",jenis:"ARG",logger:"CR310",wil:"Kota Sorong",mqtt:1,vpn:1,topic:"device/papbar/data/cr300/17593/MQTT_Table/#"},
 {nama:"ARG Unipa Amban",id:"STAL342",jenis:"ARG",logger:"CR310",wil:"Manokwari",mqtt:1,vpn:0,topic:"device/papbar/arg/STAL342"},
 {nama:"ARG Waisai",id:"STG1083",jenis:"ARG",logger:"CR310",wil:"Raja Ampat",mqtt:1,vpn:1,topic:"device/rc1pu8ct1h4p9z7/data/MUX7-FY9M-5V8M/MQTT_Table/#"},
 {nama:"ARG Kaimana",id:"STG1023",jenis:"ARG",logger:"CR310",wil:"Kaimana",mqtt:1,vpn:1,topic:"device/papbar/data/cr300/16947/MQTT_Table/#"}
];
let LAST={}; let dataState=DATA_URL?"loading":"off"; let dataStarted=false;
const CONTOH={nama:"AWS (contoh tampilan)",jenis:"AWS",waktu:"02/11/2026 05:12:00 UTC",diterima:"2026-11-02T05:12:30Z",
 nilai:{suhu:31.86,rh:64.46,tekanan:1008.95,ws:2.657,wd:80.8,hujan:0,radiasi:762.9,baterai:12.73},
 riwayat:{suhu:[["",31.89],["",31.84],["",31.86],["",31.86],["",31.67]]}};
const fmt=(v,d=1)=>typeof v==="number"?v.toLocaleString("id-ID",{maximumFractionDigits:d,minimumFractionDigits:0}):"–";
const ARAH=["U","UTL","TL","TTL","T","TTG","TG","STG","S","SBD","BD","BBD","B","BBL","BL","UBL"];
const ARAH_PANJANG=["Utara","Utara-Timur Laut","Timur Laut","Timur-Timur Laut","Timur","Timur-Tenggara","Tenggara","Selatan-Tenggara","Selatan","Selatan-Barat Daya","Barat Daya","Barat-Barat Daya","Barat","Barat-Barat Laut","Barat Laut","Utara-Barat Laut"];
const arahPanjang=d=>typeof d==="number"?ARAH_PANJANG[Math.round(((d%360)/22.5))%16]:"";
function arahMata(d){return typeof d==="number"?ARAH[Math.round(((d%360)/22.5))%16]:"–"}
function jamUTC(ms){const u=new Date(ms);return String(u.getUTCHours()).padStart(2,"0")+"."+String(u.getUTCMinutes()).padStart(2,"0")}
function waktuWIT(r){if(!r||!r.diterima)return "";const t=new Date(r.diterima);if(isNaN(t))return r.waktu||"";
 return t.toLocaleString("id-ID",{timeZone:"Asia/Jayapura",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+" WIT · "+jamUTC(t.getTime())+" UTC"}
function spark(arr,color){if(!arr||arr.length<2)return "";const v=arr.map(x=>x[1]),mn=Math.min(...v),mx=Math.max(...v),W=220,H=44,r=(mx-mn)||1;
 const pts=v.map((y,i)=>[i*(W/(v.length-1)),H-4-(y-mn)/r*(H-8)]);const line=pts.map(p=>p.join(",")).join(" ");
 const last=pts[pts.length-1];
 return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,${H} ${line} ${W},${H}" fill="${color}" opacity=".12"/><polyline points="${line}" fill="none" stroke="${color}" stroke-width="2"/><circle cx="${last[0]}" cy="${last[1]}" r="3" fill="${color}"/></svg>`}
const ICO={rh:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',tek:'<circle cx="12" cy="12" r="8"/><path d="M12 12l4-3"/>',hujan:'<path d="M7 15a5 5 0 1 1 1-9.9A6 6 0 0 1 19 7a4 4 0 0 1 0 8z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',rad:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',bat:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 11v2"/>'};
function met(ic,lab,val,unit){return `<div class="met"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO[ic]}</svg><span>${lab}</span><b>${val}<small> ${unit}</small></b></div>`}
function windRose(ws,wd){return `<div class="wind"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--line)" stroke-width="3"/><text x="32" y="11" text-anchor="middle" font-size="8" fill="var(--muted)">U</text><g transform="rotate(${typeof wd==="number"?wd+180:0} 32 32)"><path d="M32 12 L38 34 L32 30 L26 34 Z" fill="var(--navy)"/></g></svg><div><b>${fmt(ws,1)}<small> m/s</small></b><span>dari ${arahMata(wd)} (${fmt(wd,0)}°)</span></div></div>`}
function statusOf(r){if(!r||!r.diterima)return ["Belum ada data",""];const age=Date.now()-new Date(r.diterima).getTime();return age<3600e3?["Online","ok"]:age<86400e3?["Data tertunda","warn"]:["Offline","bad"]}
const VARS={
 suhu:{lab:"Suhu",u:"°C",d:1,ic:"temp",c:"#e4572e",alt:"TA_meas_Avg"},
 suhu_maks:{lab:"Suhu maks",u:"°C",d:1,ic:"up",c:"#e4572e",alt:"TA_Max"},
 suhu_min:{lab:"Suhu min",u:"°C",d:1,ic:"down",c:"#2f8fd1",alt:"TA_Min"},
 ws:{lab:"Kecepatan angin",u:"m/s",d:1,ic:"wind",c:"#0133cc",alt:"WS_meas_Avg"},
 ws_maks:{lab:"Angin maks",u:"m/s",d:1,ic:"wind",c:"#0133cc",alt:"WS_Max"},
 rh:{lab:"Kelembapan",u:"%",d:0,ic:"rh",c:"#0e9f9a",alt:"RH_meas_Avg"},
 tekanan:{lab:"Tekanan",u:"mb",d:1,ic:"tek",c:"#7c3aed",alt:"PA_meas_Avg"},
 hujan:{lab:"Hujan hari ini",u:"mm",d:1,ic:"hujan",c:"#2f8fd1",bar:1,alt:"PR_meas_Total"},
 radiasi:{lab:"Radiasi matahari",u:"W/m²",d:0,ic:"rad",c:"#e09b00",alt:"SR_meas_Avg"},
 baterai:{lab:"Baterai",u:"V",d:2,ic:"bat",c:"#007b00",alt:"batt_volt"},
 wd:{lab:"Arah angin",u:"°",d:0,c:"#0133cc",dot:1,alt:"WD_meas_Avg"}};
Object.assign(ICO,{temp:'<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>',up:'<path d="M12 19V5M5 12l7-7 7 7"/>',down:'<path d="M12 5v14M5 12l7 7 7-7"/>',wind:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'});
/* nilai yang secara fisik tidak mungkin minus (hujan, angin, RH, tekanan, radiasi, baterai) dianggap kosong bila minus — biasanya kode data hilang dari logger */
const TAK_MINUS={hujan:1,ws:1,ws_maks:1,rh:1,tekanan:1,radiasi:1,baterai:1,wd:1};
/* batas nilai wajar untuk iklim Papua Barat; di luar batas = sensor rusak/terganggu, nilainya tidak ditampilkan */
const BATAS_WAJAR={suhu:[5,45],suhu_maks:[5,45],suhu_min:[5,45],rh:[20,100.5],ws:[0,40],ws_maks:[0,40],hujan:[0,500],tekanan:[500,1100]};
/* ===== privasi tampilan (Admin > Privasi): tombol unduh & jenis sensor yang tidak ditampilkan ke publik ===== */
const SENSOR_GRUP={suhu:["suhu","suhu_maks","suhu_min"],rh:["rh"],angin:["ws","ws_maks","wd"],tekanan:["tekanan"],hujan:["hujan"],radiasi:["radiasi"],baterai:["baterai"]};
const SENSOR_NAMA={suhu:"Suhu udara (rata-rata, maksimum, minimum)",rh:"Kelembapan udara",angin:"Angin (kecepatan, hembusan maksimum, arah)",tekanan:"Tekanan udara",hujan:"Curah hujan",radiasi:"Radiasi matahari",baterai:"Tegangan baterai alat"};
/* ===== tampilan web (Admin > Tampilan Web): bagian beranda & kartu yang disembunyikan ===== */
const BAGIAN_BERANDA=[["hero","Banner slide paling atas"],["quick","Tombol pintasan (Prediksi Musim, Data Alat, dst.)"],["peringatan","Pita Peringatan Dini Iklim"],["kondisi","Kondisi Iklim Terkini (kotak ENSO & kartu-kartu)"],["gempa","Info gempa bumi"],["aws","Pengamatan AWS terkini"],["produk","Produk Iklim"],["publikasi","Publikasi / Dokumen Terbaru"],["berita","Berita"],["kontak","Hubungi Kami & peta kantor"],["climax","Promosi ClimaX Dulu (permohonan data online)"]];
const KARTU_NAMA={enso:"ENSO (kotak besar)",iod:"Status IOD",peringatan:"Peringatan dini",prediksi:"Prediksi hujan 10 harian",gelombang:"Gelombang atmosfer aktif (muncul otomatis hanya bila aktif di Papua/Indonesia timur)",hujan:"Curah hujan bulan lalu",prakiraan:"Prakiraan bulan depan",musim:"Awal musim",hth:"Hari tanpa hujan",spi:"Indeks kekeringan (SPI)"};
const TAMPIL=()=>((typeof KA!=="undefined"&&KA&&KA.pengaturan&&KA.pengaturan.tampilan)||{});
const tampilB=k=>!(TAMPIL().bagian||[]).includes(k),tampilKartu=k=>!(TAMPIL().kartu||[]).includes(k);
const PRIV=()=>((typeof KA!=="undefined"&&KA&&KA.pengaturan&&KA.pengaturan.privasi)||{});
/* k = kunci sensor (mis. "tekanan"); id = ID alat bila disembunyikan khusus untuk alat itu */
const sensorTampil=(k,id)=>{const pv=PRIV(),kena=g=>(SENSOR_GRUP[g]||[]).includes(k);if((pv.sensor||[]).some(kena))return false;return !(id&&((pv.alat||{})[id]||[]).some(kena))};
const unduhDok=()=>!PRIV().sembunyi_dok,unduhCsv=()=>!PRIV().sembunyi_csv;
const nvMentah=(n,k)=>{if(!sensorTampil(k))return undefined;const x0=n[k];return typeof x0==="number"?x0:(VARS[k]&&typeof n[VARS[k].alt]==="number"?n[VARS[k].alt]:undefined)};
/* true bila alat mengirim angka tetapi angkanya tidak masuk akal (kode data kosong seperti -9999 tidak dihitung) */
const sensorCek=(n,k)=>{const b=BATAS_WAJAR[k],x=nvMentah(n||{},k);return !!b&&typeof x==="number"&&isFinite(x)&&x>-999&&(x<b[0]||x>b[1])};
const CEK_TEKS="Sensor sedang diperiksa";
const nv=(n,k)=>{const x=nvMentah(n,k);if(x===undefined||!isFinite(x))return undefined;if(TAK_MINUS[k]&&x<0)return undefined;const b=BATAS_WAJAR[k];if(b&&(x<b[0]||x>b[1]))return undefined;if(k==="suhu"||k==="suhu_maks"||k==="suhu_min"){if(x<-30||x>60)return undefined}return x};
function tile(id,k,n,contoh){const m=VARS[k];const v=nv(n,k);
 return `<button type="button" class="met" data-alat="${id}" data-k="${k}"${contoh?' data-contoh="1"':''} aria-label="Lihat grafik ${m.lab} 24 jam"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:${m.c}">${ICO[m.ic]}</svg><span>${m.lab}</span>${sensorCek(n,k)?`<b class="cek">${CEK_TEKS}</b>`:`<b>${fmt(v,m.d)}<small> ${m.u}</small></b>`}<i class="go" aria-hidden="true">›</i></button>`}
function windDial(id,ws,wd,contoh){const ok=typeof wd==="number";const a=ok?wd:0;
 const R=46,cx=60,cy=60,rad=(a-90)*Math.PI/180,mx=cx+R*Math.cos(rad),my=cy+R*Math.sin(rad);
 return `<button type="button" class="dial" data-alat="${id}" data-k="wd"${contoh?' data-contoh="1"':''} aria-label="Lihat grafik arah angin 24 jam">
 <span class="dlab">Arah angin</span>
 <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--chip)" stroke-width="9"/><circle cx="60" cy="60" r="${R}" fill="none" stroke="#0133cc" stroke-width="3" opacity=".9"/>
 ${["U","T","S","B"].map((t,i)=>{const r2=(i*90-90)*Math.PI/180;return `<text x="${60+33*Math.cos(r2)}" y="${60+33*Math.sin(r2)+3.5}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--muted)">${t}</text>`}).join("")}
 ${ok?`<g transform="rotate(${a} ${mx} ${my})"><path d="M${mx} ${my-8} L${mx+7} ${my+6} L${mx-7} ${my+6} Z" fill="#0133cc" transform="rotate(180 ${mx} ${my})"/></g>`:""}
 <text x="60" y="61" text-anchor="middle" font-size="20" font-weight="800" fill="var(--fg)">${ok?fmt(a,0)+"°":"–"}</text><text x="60" y="76" text-anchor="middle" font-size="9.5" fill="var(--muted)">dari ${arahMata(wd)}</text></svg></button>`}
function alatCard(a,r,contoh){const st=statusOf(r);const n=(r&&r.nilai)||{};const id=contoh?"contoh":a.id;
 const conn="";
 let body="";
 if(r&&a.jenis==="AWS")body=(sensorTampil("ws",id)?windDial(id,nv(n,"ws"),nv(n,"wd"),contoh):"")+`<div class="mets">${["ws","ws_maks","suhu","rh","suhu_maks","suhu_min","tekanan","hujan","radiasi","baterai"].filter(k=>sensorTampil(k,id)).map(k=>tile(id,k,n,contoh)).join("")}</div>`;
 else if(r)body=`<div class="mets">${["hujan","baterai"].map(k=>tile(id,k,n,contoh)).join("")}</div>`;
 return `<article class="alat${contoh?" contoh":""}"><div class="ah"><div><b>${contoh?"Contoh tampilan AWS":`<a class="alink" href="#alat-${a.id}">${a.nama}</a>`}</b><span>${contoh?"Data Node-RED 2 Nov 2026, 14.12 WIT":`${a.jenis} · ${a.logger} · ID ${a.id}${a.wil?" · "+a.wil:""}`}</span></div><span class="pill ${contoh?"":st[1]}">${contoh?"Contoh":st[0]}</span></div>${conn}${body||`<p class="empty">Belum ada data masuk dari alat ini. Data tampil begitu alat mengirim.</p>`}${!contoh?`<div class="af">${r?"Pembaruan "+waktuWIT(r):"Menunggu data pertama"}<a class="detail" href="#alat-${a.id}">Lihat detail lengkap →</a></div>`:""}</article>`}


/* ---- Halaman detail satu alat ---- */
const GRAFIK_AWS=["suhu","rh","tekanan","ws","hujan","radiasi","baterai","wd"],GRAFIK_ARG=["hujan","baterai"];
/* panel data terkini di halaman detail alat */
const ANGIN_KET=v=>typeof v!=="number"?"":v<0.5?"Tenang":v<3.4?"Angin lemah":v<8?"Angin sedang":v<10.8?"Angin cukup kencang":v<17.2?"Angin kencang":"Angin sangat kencang";
const HUJAN_HARI=v=>typeof v!=="number"?"":v<0.5?"Belum hujan":v<20?"Hujan ringan":v<50?"Hujan sedang":v<100?"Hujan lebat":v<150?"Hujan sangat lebat":"Hujan ekstrem";
function panelAlat(id,n,aws){const ik=k=>`<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO[VARS[k].ic]}</svg></i>`;
 const dk=(k,isi,cls)=>{const m=VARS[k];if(!sensorTampil(k,id))return "";return `<button type="button" class="dk${cls?" "+cls:""}" data-alat="${id}" data-k="${k}" style="--c:${m.c}" aria-label="Lihat grafik ${m.lab} 24 jam"><span class="dkh">${ik(k)}${m.lab}</span>${sensorCek(n,k)?`<b class="cek">${CEK_TEKS}</b>`:`<b>${fmt(nv(n,k),m.d)}<small> ${m.u}</small></b>${isi||""}`}<em class="dkgo" aria-hidden="true">Grafik 24 jam →</em></button>`};
 const hj=nv(n,"hujan"),kHujan=`<span class="dkket">${HUJAN_HARI(hj)||"–"} · sejak 09.00 WIT</span>`;
 if(!aws)return `<div class="dpanel arg"><div class="dkgrid satu">${dk("hujan",kHujan,"lebar")}</div></div>`;
 const s0=nv(n,"suhu"),mn=nv(n,"suhu_min"),mx=nv(n,"suhu_maks"),pos=[s0,mn,mx].every(v=>typeof v==="number")&&mx>mn?Math.max(0,Math.min(100,(s0-mn)/(mx-mn)*100)):null;
 const rh=nv(n,"rh"),ra=nv(n,"radiasi"),ws=nv(n,"ws");
 const suhu=dk("suhu",`<div class="dkrng"><span>Min ${fmt(mn,1)}°</span><div class="dkbar suhu">${pos!=null?`<i style="left:${pos}%"></i>`:""}</div><span>Maks ${fmt(mx,1)}°</span></div>`,"lebar");
 const lembap=dk("rh",`<div class="dkbar"><u style="width:${typeof rh==="number"?Math.min(100,rh):0}%"></u></div><span class="dkket">${typeof rh!=="number"?"–":rh>=90?"Sangat lembap":rh>=70?"Lembap":rh>=50?"Sedang":"Kering"}</span>`);
 const tekanan=dk("tekanan",`<span class="dkket">Tekanan udara di lokasi alat</span>`);
 const hujan=dk("hujan",kHujan);
 const rad=dk("radiasi",`<div class="dkbar"><u style="width:${typeof ra==="number"?Math.min(100,ra/12):0}%"></u></div><span class="dkket">${typeof ra!=="number"?"–":ra<5?"Malam atau gelap":ra<200?"Berawan atau redup":ra<600?"Cerah berawan":"Terik"}</span>`);
 return `<div class="dpanel">${sensorTampil("ws",id)?`<div class="dwind2">${windDial(id,ws,nv(n,"wd"),false)}<div class="dws2"><span>Kecepatan angin</span>${sensorCek(n,"ws")?`<b class="cek">${CEK_TEKS}</b>`:`<b>${fmt(ws,1)}<small> m/s</small></b>`}<em>${ANGIN_KET(ws)}${typeof nv(n,"ws_maks")==="number"?" · hembusan maks "+fmt(nv(n,"ws_maks"),1)+" m/s":""}</em></div></div>`:""}
 <div class="dkgrid">${suhu}${lembap}${tekanan}${hujan}${rad}</div></div>`}
function detailAlat(id){const a=ALAT.find(x=>x.id===id);if(!a)return P.peralatan();
 const r=LAST[id],n=(r&&r.nilai)||{},st=statusOf(r),aws=a.jenis==="AWS";
 const besar=panelAlat(id,n,aws);
 const grafik=(aws?GRAFIK_AWS:GRAFIK_ARG).filter(k=>sensorTampil(k,id)).map(k=>{const m=VARS[k];return `<section class="gcard"><div class="ghead"><div><b>${m.lab}</b><span>${m.bar?"Curah hujan per jam":k==="wd"?"Arah datangnya angin":"Ringkasan tiap 10 menit"}</span></div><b class="gnow${sensorCek(n,k)?" cek":""}">${k==="wd"?(typeof nv(n,"wd")==="number"?"dari "+arahMata(nv(n,"wd")):"–"):sensorCek(n,k)?CEK_TEKS:fmt(nv(n,k),m.d)+" "+m.u}</b></div><div class="gbody" data-graf="${k}"><p class="empty" style="padding:30px 0;text-align:center">${r?"Memuat riwayat…":"Menunggu data pertama dari alat ini."}</p></div><div class="gstats" data-stat="${k}"></div></section>`}).join("");
 return `<div class="crumb"><a href="#beranda">Beranda</a> &gt;&gt; <a href="#peralatan">Peralatan</a> &gt;&gt; ${a.nama}</div>
<div class="dhero"><div><span class="dtag">${a.jenis==="AWS"?"Automatic Weather Station":"Automatic Rain Gauge"}</span><h1>${a.nama}</h1><p>${a.logger} · ID ${a.id}${a.wil?" · "+a.wil:""}</p></div>
<div class="dstat"><span class="pill ${st[1]}">${st[0]}</span><span>${r?"Pembaruan "+waktuWIT(r):"Belum ada data"}</span>${typeof nv(n,"baterai")==="number"?`<span class="dbat">Baterai ${fmt(nv(n,"baterai"),2)} V</span>`:""}</div></div>
${sumberId(a.id)!==a.id?`<div class="tukarwarn" role="note"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg></i><span>Data diambil dari logger ${sumberId(a.id)}${(()=>{const t=infoTukar(a.id);return t?" ("+esc(t.nama)+")":""})()}, karena penamaan dua AWS di server pusat tertukar.</span></div>`:""}
${besar}
<h2 class="sec-title" style="margin-top:26px">Riwayat 24 Jam</h2><div class="ggrid">${grafik}</div>
${awam("Cara membaca halaman ini",["Angka di bagian atas adalah data terakhir yang dikirim alat. Halaman ini diperbarui tiap "+REFRESH_DETIK+" detik.","Grafik menunjukkan perubahan 24 jam terakhir. Geser jari atau kursor di grafik untuk melihat nilai pada jam tertentu, dalam WIT dan UTC.","<b>Hujan hari ini</b> dihitung sejak 00.00 UTC (09.00 WIT). Grafik hujan menampilkan jumlah hujan tiap jam.","Ketuk kotak mana pun di bagian atas untuk membuka grafiknya dalam ukuran besar."])}
<div id="rekapBox">${rekapHTML(id)}</div>
<p style="margin-top:16px"><a href="#peralatan" style="font-weight:700">← Kembali ke daftar peralatan</a></p>`}
let RIW_CACHE={};
function isiGrafikDetail(id){if(!DATA_URL||!LAST[id])return;const a=ALAT.find(x=>x.id===id);if(!a)return;
 fetch(DATA_URL.replace(/\/terkini$/,"/riwayat")+"?id="+encodeURIComponent(sumberId(id)),{cache:"no-store"}).then(r=>r.json()).then(j=>{if(cur!=="alat-"+id)return;RIW_CACHE[id]=j;
  (a.jenis==="AWS"?GRAFIK_AWS:GRAFIK_ARG).filter(k=>sensorTampil(k,id)).forEach(k=>{const el=document.querySelector(`[data-graf="${k}"]`);if(!el)return;const d=drawHist(el,(j.riwayat&&j.riwayat[k])||[],VARS[k]);const sEl=document.querySelector(`[data-stat="${k}"]`);if(sEl)sEl.innerHTML=histStats(d,VARS[k])})})
 .catch(()=>{document.querySelectorAll("[data-graf]").forEach(el=>el.innerHTML='<p class="empty" style="padding:30px 0;text-align:center">Riwayat belum dapat dimuat.</p>')})}

/* ---- Grafik riwayat 24 jam ---- */
const SLOT=600000;
function jamWIT(ms){return new Date(ms).toLocaleTimeString("id-ID",{timeZone:"Asia/Jayapura",hour:"2-digit",minute:"2-digit"}).replace(":",".")}
function niceTicks(mn,mx,n){if(mn===mx){mn-=1;mx+=1}const span=mx-mn,step0=span/n,mag=Math.pow(10,Math.floor(Math.log10(step0))),f=step0/mag,step=(f<1.5?1:f<3?2:f<7?5:10)*mag;
 const a=Math.floor(mn/step)*step,b=Math.ceil(mx/step)*step,t=[];for(let v=a;v<=b+step/2;v+=step)t.push(+v.toFixed(6));return t}
let HID=0;
function drawHist(el,pts,m){const u="h"+(++HID);
 const cw=el.clientWidth||720,W=Math.round(Math.max(300,Math.min(cw,780))),sempit=W<520,H=sempit?250:310,L=sempit?40:52,R=sempit?10:18,T=18,B=48,now=Date.now(),x0=now-864e5,x1=now,JEDA_JAM=sempit?6:4;
 const kk=Object.keys(VARS).find(x=>VARS[x]===m);
 let data=pts.map(([s,v])=>[s*SLOT+SLOT/2,v]).filter(p=>p[0]>=x0&&(!kk||m.bar||nv({[kk]:p[1]},kk)!==undefined));
 const semuaAneh=!data.length&&kk&&pts.some(([s,v])=>s*SLOT>=x0-SLOT&&sensorCek({[kk]:v},kk));
 if(m.bar){/* hujan dari logger = kumulatif sejak 00 UTC; ubah jadi jumlah per jam */data=data.filter(([t,v])=>typeof v==="number"&&isFinite(v)&&v>=0&&v<1000);/* buang nilai rusak (minus / kode kosong) */const inc=[];data.forEach(([t,v],i)=>{if(!i)return;const pv=data[i-1][1];inc.push([t,Math.max(0,v>=pv?v-pv:v)])});const per={};inc.forEach(([t,v])=>{const h=Math.floor(t/36e5)*36e5;per[h]=(per[h]||0)+v});data=Object.entries(per).map(([h,v])=>[+h+18e5,+v.toFixed(2)]).sort((a,b)=>a[0]-b[0])}
 if(!data.length&&semuaAneh){el.innerHTML='<p class="empty" style="padding:40px 0;text-align:center">'+CEK_TEKS+'. Nilai dari sensor ini 24 jam terakhir tidak wajar, jadi tidak ditampilkan.</p>';return null}
 if(!data.length){el.innerHTML='<p class="empty" style="padding:40px 0;text-align:center">Belum ada riwayat 24 jam untuk variabel ini. Riwayat terkumpul sedikit demi sedikit setiap 10 menit.</p>';return null}
 const vs=data.map(d=>d[1]);let mn=Math.min(...vs),mx=Math.max(...vs);if(m.bar){mn=0;mx=Math.max(mx,1)}if(m.min0&&mn>=0)mn=0;if(m.dot){mn=0;mx=360}
 let yt=m.dot?[0,90,180,270,360]:niceTicks(mn,mx,4);if(m.bar)yt=yt.filter(v=>v>=0);const ya=yt[0],yb=yt[yt.length-1];
 const X=t=>L+(t-x0)/(x1-x0)*(W-L-R),Y=v=>H-B-(v-ya)/(yb-ya||1)*(H-T-B);
 let g=`<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.c}" stop-opacity=".28"/><stop offset="1" stop-color="${m.c}" stop-opacity="0"/></linearGradient></defs>`;
 yt.forEach(v=>{g+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${m.dot?["U","T","S","B","U"][v/90]:fmt(v,Math.abs(yb-ya)<5?1:0)}</text>`});
 // label waktu tiap 4 jam WIT (WIT = UTC+9)
 const off=9*36e5;let t=Math.ceil((x0+off)/(JEDA_JAM*36e5))*(JEDA_JAM*36e5)-off;
 for(;t<=x1;t+=JEDA_JAM*36e5){g+=`<line x1="${X(t)}" x2="${X(t)}" y1="${T}" y2="${H-B}" stroke="var(--line)" stroke-dasharray="2 4"/><text x="${X(t)}" y="${H-B+18}" text-anchor="middle" font-size="11" fill="var(--muted)">${jamWIT(t)}</text><text x="${X(t)}" y="${H-B+31}" text-anchor="middle" font-size="9.5" fill="var(--muted)" opacity=".75">${jamUTC(t)} UTC</text>`}
 if(m.bar){const bw=Math.max(3,(W-L-R)/24-4);data.forEach(([t,v],i)=>{const h=Math.max(0,H-B-Y(Math.max(0,v)));g+=h>0.5?`<rect class="hbar" style="--i:${i}" x="${X(t)-bw/2}" y="${H-B-h}" width="${bw}" height="${h}" rx="3" fill="${m.c}" opacity=".85"/>`:`<rect x="${X(t)-bw/2}" y="${H-B-2}" width="${bw}" height="2" rx="1" fill="${m.c}" opacity=".35"/>`})}
 else if(m.dot){data.forEach(([t,v])=>{g+=`<circle cx="${X(t)}" cy="${Y(v)}" r="2.6" fill="${m.c}" opacity=".75"/>`})}
 else{const segs=[];let cur=[];data.forEach((p,i)=>{if(i&&p[0]-data[i-1][0]>3*SLOT){segs.push(cur);cur=[]}cur.push(p)});segs.push(cur);
  segs.forEach(sg=>{const line=sg.map(p=>X(p[0]).toFixed(1)+","+Y(p[1]).toFixed(1)).join(" ");
   if(sg.length>1)g+=`<polygon points="${X(sg[0][0]).toFixed(1)},${H-B} ${line} ${X(sg[sg.length-1][0]).toFixed(1)},${H-B}" fill="url(#${u}g)"/>`;
   g+=`<polyline points="${line}" fill="none" stroke="${m.c}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;if(sg.length===1)g+=`<circle cx="${X(sg[0][0])}" cy="${Y(sg[0][1])}" r="3" fill="${m.c}"/>`});
  const last=data[data.length-1];g+=`<circle cx="${X(last[0])}" cy="${Y(last[1])}" r="5" fill="${m.c}" stroke="var(--surface)" stroke-width="2"/>`}
 g+=`<line data-r="hx" x1="0" x2="0" y1="${T}" y2="${H-B}" stroke="var(--fg)" stroke-opacity=".35" visibility="hidden"/><circle data-r="hp" r="5" fill="${m.c}" stroke="var(--surface)" stroke-width="2" visibility="hidden"/><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}" fill="transparent"/>`;
 el.innerHTML=`<div class="hchart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik ${m.lab} 24 jam terakhir">${g}</svg><div class="htip" hidden></div></div>`;
 const svg=el.querySelector("svg"),tip=el.querySelector(".htip"),hx=svg.querySelector("[data-r=hx]"),hp=svg.querySelector("[data-r=hp]");
 const move=e=>{const r=svg.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W;let best=data[0];data.forEach(d=>{if(Math.abs(X(d[0])-px)<Math.abs(X(best[0])-px))best=d});
  const bx=X(best[0]),by=Y(best[1]);hx.setAttribute("x1",bx);hx.setAttribute("x2",bx);hx.setAttribute("visibility","visible");hp.setAttribute("cx",bx);hp.setAttribute("cy",by);hp.setAttribute("visibility","visible");
  tip.hidden=false;tip.innerHTML=`<b>${fmt(best[1],m.d)} ${m.u}</b>${m.dot?" · dari "+arahMata(best[1]):""}<span>${m.bar?jamWIT(best[0]-18e5)+"–"+jamWIT(best[0]+18e5)+" WIT · "+jamUTC(best[0]-18e5)+"–"+jamUTC(best[0]+18e5)+" UTC":jamWIT(best[0])+" WIT · "+jamUTC(best[0])+" UTC"}</span>`;
  const left=bx/W*r.width;tip.style.left=Math.min(Math.max(left,60),r.width-60)+"px";tip.style.top=(by/H*r.height-58)+"px"};
 svg.addEventListener("pointermove",move);svg.addEventListener("pointerdown",move);svg.addEventListener("pointerleave",()=>{tip.hidden=true;hx.setAttribute("visibility","hidden");hp.setAttribute("visibility","hidden")});
 return data}
function histStats(data,m){if(!data||!data.length)return "";const vs=data.map(d=>d[1]),last=vs[vs.length-1];
 const box=(l,v)=>`<div><span>${l}</span><b>${v}</b></div>`;
 if(m.bar){const tot=vs.reduce((a,b)=>a+b,0),mxi=vs.indexOf(Math.max(...vs));return box("Total 24 jam",fmt(tot,1)+" mm")+box("Jam terbasah",data[mxi][1]>0?jamWIT(data[mxi][0]-18e5)+" WIT":"–")+box("Hujan per jam tertinggi",fmt(vs[mxi],1)+" mm")}
 if(m.dot)return box("Arah terkini","dari "+arahMata(last)+" ("+fmt(last,0)+"°)");
 const avg=vs.reduce((a,b)=>a+b,0)/vs.length;return box("Terkini",fmt(last,m.d)+" "+m.u)+box("Tertinggi",fmt(Math.max(...vs),m.d)+" "+m.u)+box("Terendah",fmt(Math.min(...vs),m.d)+" "+m.u)+box("Rata-rata",fmt(avg,m.d)+" "+m.u)}
function bukaRiwayat(id,k,contoh){const m=VARS[k];const a=ALAT.find(x=>x.id===id);const md=document.getElementById("histModal");
 md.querySelector("h3").textContent=m.lab+" · 24 jam terakhir";md.querySelector(".hsub").textContent=(a?a.nama:"Contoh tampilan")+(m.bar?" · curah hujan per jam":" · ringkasan tiap 10 menit");
 const body=md.querySelector(".hbody"),stats=md.querySelector(".hstats");stats.innerHTML="";md.hidden=false;document.body.style.overflow="hidden";md.querySelector(".hclose").focus();
 if(contoh||!DATA_URL){body.innerHTML='<p class="empty" style="padding:40px 0;text-align:center">Grafik riwayat tampil setelah data langsung dari robot aktif.</p>';return}
 body.innerHTML='<p class="empty" style="padding:40px 0;text-align:center">Memuat riwayat…</p>';
 fetch(DATA_URL.replace(/\/terkini$/,"/riwayat")+"?id="+encodeURIComponent(sumberId(id)),{cache:"no-store"}).then(r=>r.json()).then(j=>{if(md.hidden)return;const d=drawHist(body,(j.riwayat&&j.riwayat[k])||[],m);stats.innerHTML=histStats(d,m)})
 .catch(()=>{body.innerHTML='<p class="empty" style="padding:40px 0;text-align:center">Riwayat belum dapat dimuat. Coba lagi beberapa saat.</p>'})}
function tutupRiwayat(){const md=document.getElementById("histModal");if(md){md.hidden=true;document.body.style.overflow=""}}
document.addEventListener("click",e=>{const b=e.target.closest(".met[data-k],.dial[data-k],.dk[data-k]");if(b){bukaRiwayat(b.dataset.alat,b.dataset.k,!!b.dataset.contoh);return}
 if(e.target.closest(".hclose")||e.target.classList.contains("hmodal"))tutupRiwayat()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")tutupRiwayat()});
P.peralatan=()=>{const aws=ALAT.filter(a=>a.jenis==="AWS").length,arg=ALAT.length-aws,on=ALAT.filter(a=>a.mqtt&&a.vpn).length;
return head("Peralatan","Peralatan Pengamatan Kami","Jaringan Automatic Weather Station (AWS) dan Automatic Rain Gauge (ARG) yang kami kelola di Papua Barat dan Papua Barat Daya. Data dikirim langsung dari lapangan.")+`
<div class="grid3" style="margin-bottom:22px">
 <div class="card"><div class="prov" style="margin:0">Total alat</div><div style="font-size:30px;font-weight:800">${ALAT.length}</div><div style="color:var(--muted);font-size:13.5px">${aws} AWS · ${arg} ARG</div></div>
 <div class="card"><div class="prov" style="margin:0">Terhubung MQTT &amp; VPN</div><div style="font-size:30px;font-weight:800">${on}</div><div style="color:var(--muted);font-size:13.5px">${ALAT.length-on} alat belum lengkap koneksinya</div></div>
 <div class="card"><div class="prov" style="margin:0">Data langsung</div><div id="mqttStat" style="font-size:20px;font-weight:800;margin-top:6px">–</div><div id="mqttNote" style="color:var(--muted);font-size:13.5px"></div></div>
</div>
<div class="panel"><div class="panel-head"><span>Data Terkini per Alat${OTO}</span><div class="tabs" id="tabsAl"><button class="on" data-t="all">Semua</button><button data-t="AWS">AWS</button><button data-t="ARG">ARG</button></div></div>
<div class="panel-body"><div class="alat-grid" id="alatGrid"></div></div></div>
${awam("Cara membaca data peralatan",[
 "<b>AWS</b> (Automatic Weather Station) mengukur suhu, kelembapan, tekanan udara, angin, radiasi matahari, dan curah hujan sekaligus. <b>ARG</b> (Automatic Rain Gauge) khusus mengukur curah hujan.",
 ...(sensorTampil("wd")?["<b>Lingkaran arah angin</b>: segitiga di lingkaran menunjukkan arah datangnya angin. Tulisan <i>dari T (80°)</i> berarti angin datang dari arah timur."]:[]),
 "<b>Ketuk kotak mana pun</b> (suhu, hujan, baterai, dan lainnya) untuk melihat grafik 24 jam terakhir. Geser jari atau kursor di grafik untuk melihat nilai di jam tertentu.",
 "<b>Online</b> berarti alat mengirim data dalam satu jam terakhir, <b>Data tertunda</b> berarti data terakhir lebih dari satu jam lalu, <b>Offline</b> berarti lebih dari sehari tidak ada data."])}`};
function drawAlat(){const lb=document.getElementById("liveBox");if(lb)lb.innerHTML=liveStrip();const g=document.getElementById("alatGrid");if(!g)return;const f=(document.querySelector("#tabsAl .on")||{}).dataset?.t||"all";
 const list=ALAT.filter(a=>f==="all"||a.jenis===f);
 const contoh=(dataState==="off"&&f!=="ARG")?alatCard({jenis:"AWS",mqtt:1,vpn:1},CONTOH,true):"";
 g.innerHTML=contoh+list.map(a=>alatCard(a,LAST[a.id],false)).join("");
 const st=document.getElementById("mqttStat"),nt=document.getElementById("mqttNote");
 const M={off:["Belum terhubung","Kartu pertama adalah contoh tampilan memakai data Node-RED kita. Data semua alat tampil setelah alamat API diisi."],loading:["Menghubungkan…",""],on:["Terhubung","Diperbarui tiap "+REFRESH_DETIK+" detik."],err:["Gagal terhubung","Server data sedang tidak dapat dihubungi. Coba muat ulang beberapa saat lagi."]};
 if(dataState==="on"&&LAST._status){const s2=LAST._status;if(s2.galat){M.on=["Ada kendala",s2.galat]}else if(s2.putaran_terakhir){M.on[1]="Robot terakhir membaca data "+waktuWIT({diterima:s2.putaran_terakhir})+"."}}
 if(st){st.textContent=M[dataState][0];st.style.color=dataState==="on"?"var(--ok)":dataState==="err"?"var(--bad)":"var(--muted)";nt.textContent=M[dataState][1]}}
function startData(){if(dataStarted||!DATA_URL)return;dataStarted=true;
 const pull=()=>fetch(DATA_URL,{cache:"no-store"}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{const awal=!Object.keys(LAST).length;LAST_MENTAH=j||{};LAST=tukarData(LAST_MENTAH);dataState="on";if(cur.startsWith("alat-")){const y=scrollY;app.innerHTML=detailAlat(cur.slice(5));const id=cur.slice(5),c=RIW_CACHE[id];if(c&&!awal){const a=ALAT.find(x=>x.id===id);(a.jenis==="AWS"?GRAFIK_AWS:GRAFIK_ARG).forEach(k=>{const el=document.querySelector(`[data-graf="${k}"]`);if(el){const d=drawHist(el,(c.riwayat&&c.riwayat[k])||[],VARS[k]);const sEl=document.querySelector(`[data-stat="${k}"]`);if(sEl)sEl.innerHTML=histStats(d,VARS[k])}})}else isiGrafikDetail(id);scrollTo({top:y})}else drawAlat()}).catch(()=>{dataState="err";drawAlat()});
 pull();setInterval(pull,REFRESH_DETIK*1000)}



/* ===== BERITA (tampilan) ===== */
const BLN_ID=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
function tglID(t){const [y,m,d]=t.split("-").map(Number);return `${d} ${BLN_ID[m-1]} ${y}`}
let BERITA_OTO=null,beritaDimuat=false;
const kunciJ=j=>String(j||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().slice(0,70);
const STOP_J=new Set("bmkg yang dan di ke dari untuk dengan pada ini itu akan oleh dalam papua barat daya provinsi warga 2025 2026 2027 the".split(" "));
const kataJ=t=>new Set(String(t).toLowerCase().replace(/<[^>]+>/g," ").replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(w=>w.length>2&&!STOP_J.has(w)));
function miripJudul(a,b){const A=kataJ(a),B=kataJ(b);let n=0;A.forEach(w=>B.has(w)&&n++);let r=n/Math.max(1,Math.min(A.size,B.size));
 const tri=t=>{const w=[...kataJ(t)],o=new Set();for(let i=0;i+2<w.length;i++)o.add(w.slice(i,i+3).join(" "));return o};const T=tri(b);for(const x of tri(a))if(T.has(x)){r=Math.max(r,.6);break}return r}
const umurHari=t=>/^\d{4}-\d{2}-\d{2}$/.test(t||"")?(Date.now()-Date.parse(t))/864e5:9999;
function semuaBerita(){const lihat=new Set(),out=[],sembunyi=new Set((typeof BERITA_SEMBUNYI!=="undefined"?BERITA_SEMBUNYI:[]).map(x=>String(x).trim()));
 [...BERITA_KAMI.map(b=>({...b,kami:1})),...beritaDinamis(),...mediaDaftar(),...(BERITA_OTO||[])].forEach(b=>{if(!b||!b.judul)return;const k=kunciJ(b.judul);if(lihat.has(k)||sembunyi.has(b.url)||sembunyi.has(b.judul))return;lihat.add(k);out.push(b)});
 /* berita tentang kita (rilis kami & liputan media) yang berumur <= 14 hari tampil lebih dulu dari rilisan BMKG pusat */
 const prio=b=>umurHari(b.tanggal)>14||b.pusat?2:b.jenis==="bmkg"?1:0;
 return out.sort((a,b)=>prio(a)-prio(b)||(b.tanggal||"").localeCompare(a.tanggal||""))}
const IKON_BERITA='<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>';
const seniDari=t=>/kering|kemarau|panas|suhu|el ?ni[ñn]o|titik panas|karhutla/i.test(t||"")?"panas":/aws|arg|alat|data|otomatis|peralatan|logger/i.test(t||"")?"alat":"hujan";
function sampul(b){const isi=b.gambar?`<img src="${b.gambar}" alt="" loading="lazy" referrerpolicy="no-referrer" data-galat="hapus">`:"";
 return `<div class="nimg"${!b.gambar&&!b.kami&&b.url?` data-og="${b.url}"`:""}><span class="nart" aria-hidden="true">${SENI[seniDari(String(b.judul).replace(/<[^>]+>/g,""))]}</span>${isi}</div>`}
function newsList(limit){const semua=semuaBerita();let all=semua.slice(0,limit||99);
 if(limit){ /* beranda: satu berita per topik, urut terbaru; berita kita <=14 hari didahulukan; minimal 1 berita kita */
  const unik=[];semua.forEach(b=>{if(!unik.some(u=>miripJudul(u.judul,b.judul)>=.5))unik.push(b)});
  all=unik.slice(0,limit);
  if(!all.some(b=>!b.pusat)){const kita=unik.find(b=>!b.pusat);if(kita)all=[...all.slice(0,limit-1),kita]}}
 return `<div class="news" data-news="${limit||0}">${all.map(b=>b.kami
  ?`<a class="nitem" href="#berita-${b.id}">${sampul(b)}<div class="nbody"><span class="pill ok">Rilis Kami</span><b>${b.judul}</b><span>${b.ringkas||""}</span><small>${tglID(b.tanggal)} · Baca selengkapnya →</small></div></a>`
  :`<a class="nitem" href="${b.url}" target="_blank" rel="noopener">${sampul(b)}<div class="nbody"><span class="pill${b.pusat?" pusat":b.jenis==="bmkg"?" bmkgpb":""}">${b.jenis==="bmkg"?"BMKG di Papua Barat · ":""}${b.media||"Media"}</span><b>${b.judul}</b>${b.ringkas&&b.otomatis?`<span>${b.ringkas}</span>`:""}<small>${tglID(b.tanggal)} · Buka di ${b.media||"situs berita"} ↗</small></div></a>`).join("")}</div>`}
function isiGambarOG(){document.querySelectorAll(".nimg[data-og]").forEach(el=>{const u=el.dataset.og;el.removeAttribute("data-og");
  ambilOG(u).then(g=>{if(!g)return;const im=new Image();im.alt="";im.referrerPolicy="no-referrer";im.onload=()=>{el.classList.remove("kosong");el.prepend(im)};im.src=g})})}
function muatBerita(){if(beritaDimuat||!DATA_URL){isiGambarOG();return}beritaDimuat=true;
 fetch(DATA_URL.replace(/\/terkini$/,"/berita"),{cache:"no-store"}).then(r=>r.json()).then(j=>{BERITA_OTO=(j.daftar||[]).map(x=>({...x,judul:escH(x.judul),ringkas:escH(x.ringkas),media:escH(x.media),url:urlAman(x.url),gambar:urlAman(x.gambar)})).filter(x=>x.judul&&x.url);
  document.querySelectorAll("[data-news]").forEach(el=>{el.outerHTML=newsList(+el.dataset.news||0)});isiGambarOG();segarSlider()}).catch(()=>isiGambarOG())}
/* berita robot datang belakangan: perbarui banner bila daftar slidenya berubah */
function segarSlider(){const el=document.querySelector(".hslider");if(!el)return;const t=document.createElement("div");t.innerHTML=heroSlider();const n=t.firstElementChild;if(!n)return;
 const sidik=x=>[...x.querySelectorAll(".hs")].map(h=>(h.querySelector("h1,h2")||{}).textContent||"").join("|");if(sidik(n)===sidik(el))return;el.replaceWith(n);mulaiSlider()}
P.berita=()=>head("Berita","Berita","Rilis berita dari kami dan liputan media tentang Stasiun Klimatologi Papua Barat. ")+newsList();
function beritaDetail(id){const b=BERITA_KAMI.find(x=>x.id===id)||beritaAdmin(id);if(!b)return P.berita();
 return head('<a href="#berita">Berita</a>',b.judul,tglID(b.tanggal)+" · Stasiun Klimatologi Papua Barat")+`<div class="card prose">${b.gambar?`<img src="${b.gambar}" alt="" style="border-radius:10px;margin-bottom:12px">`:""}${b.isi}<p><a href="#berita">← Kembali ke daftar berita</a></p></div>`}

const PUB_SEKAT=[["buletin","Buletin Iklim","📘",p=>/buletin/i.test(p.kategori+" "+p.judul)],["musim","Prakiraan Musim Hujan & Kemarau","🌦️",p=>/musim|pmh|pmk|kemarau/i.test(p.kategori+" "+p.judul)],["dasarian","Informasi Dasarian","🗓️",p=>/dasarian/i.test(p.kategori+" "+p.judul)],["akuntabilitas","Akuntabilitas Kinerja","📑",p=>/akuntabilitas|lkjip|lakip/i.test(p.kategori+" "+p.judul)],["lain","Informasi & Dokumen Lain","📄",()=>true]];
/* edisi Informasi Dasarian (terbaru + arsip yang punya PDF) ikut tampil di Publikasi */
function pubDasarian(){const v=DASI(),L=[v.terbaru,...(v.arsip||[])].filter(x=>x&&x.das&&(x.pdf||(x.hal||[]).length));
 return L.map(x=>{const sp=(x.hal||[]).find(h=>h.k==="sampul"),pdf=x.pdf||{};return {kategori:"Informasi Dasarian",judul:"Informasi Iklim "+dasJudul(x),tanggal:x.rilis?"Rilis "+x.rilis:tglPMHU(x.diunggah),ringkas:(x.hl||[])[0]||x.an_teks||"",file:pdf.url||(pdf.file?fileURL(pdf.file):""),ukuran:pdf.ukuran?(pdf.ukuran/1048576).toFixed(1).replace(".",",")+" MB":"",gambar:sp?(sp.url||fileURL(sp.file)):"",lihat:"#informasi-dasarian"}})}
function pubs(L){return (L||[...pubAdmin(),...PUBLIKASI]).map(pubKartu)}
P.publikasi=()=>{const semua=[...pubAdmin(),...PUBLIKASI,...pubDasarian()],sisa=[...semua],G=PUB_SEKAT.map(([k,n,i,f])=>{const a=sisa.filter(f);a.forEach(x=>sisa.splice(sisa.indexOf(x),1));return [k,n,i,a]}).filter(x=>x[3].length);
 return head("Publikasi","Publikasi","Buletin Iklim bulanan (ISSN 2622-9798), buku prediksi musim, informasi dasarian, dan informasi iklim Papua Barat serta Papua Barat Daya yang dapat diunduh masyarakat.")+`
 <nav class="pub-loncat" aria-label="Lompat ke jenis publikasi">${G.map(([k,n,i,a])=>`<button type="button" data-pub-ke="${k}"><span aria-hidden="true">${i}</span>${n} <small>${a.length}</small></button>`).join("")}</nav>
 ${G.map(([k,n,i,a])=>`<section class="pub-sekat" id="pub-${k}"><h2 class="pub-sekat-j"><span aria-hidden="true">${i}</span>${n}</h2><div class="grid3">${pubs(a).join("")}</div></section>`).join("")}${pubPusat()}`};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-pub-ke]");if(!b)return;const el=document.getElementById("pub-"+b.dataset.pubKe);if(el)el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})});

/* ===== KONTEN DINAMIS (halaman admin & rilisan BMKG pusat) =====
   KONTEN_URL : alamat robot konten (Cloudflare Worker staklim-admin). Kosongkan "" untuk mematikan. */
const KONTEN_URL=LEWAT_API?location.origin+"/api/admin":LANGSUNG["/api/admin"];
let KA=null;
/* alamat dari sumber luar hanya boleh http(s) dan di-escape untuk atribut HTML */
const urlAman=u=>{u=String(u||"").trim();return /^https?:\/\/[^\s<>"'`]+$/i.test(u)?escH(u):""};
const escH=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fileURL=k=>!k?"":/[\/.]/.test(k)?k:KONTEN_URL+"/file/"+k;
const BAWAAN_INFO={wa:"6285244851969",email:"staklim.papuabarat@bmkg.go.id",alamat:"Kompleks Perkantoran Gubernur Papua Barat, Jl. Brigjen Marinir Abraham O. Atururi, Arfai, Manokwari, Papua Barat 98315",jam:"Senin–Jumat, 08.00–16.00 WIT",ig:"staklim_papbar",linktree:"https://linktr.ee/staklim_pabar",peta_embed:"",peta_link:""};
function INFO(){const o={...BAWAAN_INFO};const a=(KA&&KA.info)||{};Object.keys(a).forEach(k=>{if(a[k])o[k]=a[k]});return o}
function waTeks(n){n=String(n||"").replace(/\D/g,"");if(!n.startsWith("62"))return n;const r=n.slice(2);return "+62 "+r.slice(0,3)+"-"+r.slice(3,7)+"-"+r.slice(7)}
const waURL=()=>"https://wa.me/"+INFO().wa, igURL=()=>"https://www.instagram.com/"+INFO().ig+"/";
const IKON_LT='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.7 5.3l3.2-3.3 1.9 1.9-3.4 3.2h4.8v2.7h-4.8l3.4 3.3-1.9 1.9-4.6-4.6-4.6 4.6-1.9-1.9 3.4-3.3H4.4V7.1h4.8L5.8 3.9 7.7 2l3.2 3.3V0h2.8zM10.9 15h2.8v9h-2.8z"/></svg>';
function isiFooter(){const el=document.getElementById("footKantor");if(!el)return;const I=INFO();
 const tw=TW();el.innerHTML=`<b>Stasiun Klimatologi Papua Barat</b>${escH(tw.footer_desk||FOOTER_BAWAAN.desk)}<br><small class="aka">${escH(tw.footer_aka||FOOTER_BAWAAN.aka)}</small><br>${escH(I.alamat)}<br><a href="${waURL()}" target="_blank" rel="noopener">WhatsApp ${escH(waTeks(I.wa))}</a><br>${escH(I.email)}<br><a href="${igURL()}" target="_blank" rel="noopener">Instagram @${escH(I.ig)}</a>${I.linktree?`<br><a href="${escH(I.linktree)}" target="_blank" rel="noopener">Linktree</a>`:""}<br><a href="#admin" class="admlink">Admin</a>`;
 const ty=document.getElementById("thnCopy");if(ty)ty.textContent=String(new Date(Date.now()+9*3600e3).getUTCFullYear());
 const fs=document.getElementById("footSkm");if(fs)fs.innerHTML=skmInfo().aktif?" · "+skmTombol("footskm"):"";try{if(cur)pasangPensil()}catch(e){/* cur belum ada saat web pertama dimuat */}}
function tglPendek(t){return /^\d{4}-\d{2}-\d{2}$/.test(t||"")?tglID(t):(t||"")}
/* publikasi dari halaman admin (bukan berita kegiatan) */
function pubAdmin(){return ((KA&&KA.publikasi)||[]).filter(p=>p.jenis!=="Berita Kegiatan").map(p=>({kategori:escH(p.jenis),judul:escH(p.judul),tanggal:tglPendek(p.tanggal),ringkas:escH(p.ringkas),file:fileURL(p.file),url:urlAman(p.link||""),ukuran:escH(p.ukuran),gambar:fileURL(p.gambar),nama_file:escH(p.nama_file||""),_admin:1}))}
const SENI_JENIS={"Prediksi Musim Kemarau":"panas","Peringatan Dini":"panas","Prediksi Musim Hujan":"hujan","Buletin Iklim":"hujan","Informasi Iklim":"hujan"};
const potong=(s,n)=>{s=String(s||"");return s.length>n?s.slice(0,n).replace(/\s+\S*$/,"")+"…":s};
function daftarBanner(){const out=[];
 {const sp=slidePeringatan();if(sp)out.push(sp)}
 const adm=((KA&&KA.publikasi)||[]).filter(x=>x.banner!==false);
 /* 1) berita tentang kita: kegiatan dari admin, rilis kami, dan liputan media; <=14 hari semua (maks 3), bila tidak ada tetap 1 terbaru */
 const beritaKita=[...adm.filter(x=>x.jenis==="Berita Kegiatan").map(x=>({tanggal:x.tanggal,label:"Berita Kegiatan",judul:escH(x.judul),teks:escH(potong(x.ringkas,200)),tombol:"Baca berita",link:"#berita-a-"+x.id,gambar:fileURL(x.gambar)})),
  ...BERITA_KAMI.map(b=>({tanggal:b.tanggal,label:"Rilis Kami",judul:b.judul,teks:potong(b.ringkas,200),tombol:"Baca berita",link:"#berita-"+b.id,gambar:b.gambar||""})),
  ...[...mediaDaftar(),...(BERITA_OTO||[]).filter(b=>b.jenis!=="bmkg")].map(b=>({tanggal:b.tanggal,label:"Liputan "+(b.media||"Media"),judul:b.judul,teks:potong(b.ringkas||"",200),tombol:"Baca di "+(b.media||"media"),link:b.url,luar:1,gambar:b.gambar||""}))]
  .sort((a,b)=>(b.tanggal||"").localeCompare(a.tanggal||""));
 /* 2) publikasi kami: buletin, prediksi musim (press release, FGD), informasi iklim */
 const pubKita=[...adm.filter(x=>x.jenis!=="Berita Kegiatan"&&x.jenis!=="Peringatan Dini").map(x=>({tanggal:x._urut||x.tanggal,tampil:x.tanggal,label:x.jenis,judul:escH(x.judul),teks:escH(potong(x.ringkas,200)),tombol:x.file&&unduhDok()?"Unduh dokumen":"Lihat publikasi",link:x.file&&unduhDok()?fileURL(x.file):(x.link||"#publikasi"),luar:!!((x.file&&unduhDok())||x.link),gambar:fileURL(x.gambar),figur:1,keterangan:x.judul,seni:SENI_JENIS[x.jenis]||"hujan"})),
  ...PUBLIKASI.filter(x=>(x.file&&unduhDok())||x.url).map(x=>({tanggal:x.tanggal,label:x.kategori,judul:x.judul,teks:potong(x.ringkas,200),tombol:x.file&&unduhDok()?"Unduh dokumen":"Lihat publikasi",link:x.file&&unduhDok()?x.file:x.url,luar:1,gambar:x.gambar||"",figur:1,keterangan:x.judul,seni:/kemarau/i.test(x.judul)?"panas":"hujan"}))];
 const pilih=(arr,maks)=>{const baru=arr.filter(x=>umurHari(x.tanggal)<=14).slice(0,maks);return baru.length?baru:arr.slice(0,1)};
 const tanda=x=>{const tg=x.tampil||x.tanggal;return {...x,label:x.label+(/^\d{4}-\d{2}-\d{2}$/.test(tg||"")?" · "+tglPendek(tg):tg?" · "+tg:""),seni:x.seni||"hujan"}};
 {const u=[];beritaKita.forEach(b=>{if(!u.some(x=>miripJudul(x.judul,b.judul)>=.5))u.push(b)});const baru=u.filter(x=>umurHari(x.tanggal)<=14).slice(0,3);
  /* berita media tentang BMKG di Papua Barat & Papua Barat Daya (14 hari terakhir) ikut tampil; liputan lama tidak dipaksa tampil bila ada yang baru */
  const bp=(BERITA_OTO||[]).filter(b=>b.jenis==="bmkg"&&umurHari(b.tanggal)<=14&&!u.some(x=>miripJudul(x.judul,b.judul)>=.5)).slice(0,2).map(b=>({tanggal:b.tanggal,label:"BMKG di Papua Barat",judul:b.judul,teks:potong(b.ringkas||"",200),tombol:"Baca di "+(b.media||"media"),link:b.url,luar:1,gambar:b.gambar||"",seni:seniDari(b.judul)}));
  [...baru,...bp].forEach(x=>out.push(tanda(x)));if(!baru.length&&!bp.length&&u.length)out.push(tanda(u[0]))}
 pilih(pubKita,2).forEach(x=>out.push(tanda(x)));
 /* 3) rilisan besar BMKG pusat, setelah konten kita */
 /* siaran pers / rilisan tentang Papua (<=14 hari) diutamakan; bila kurang dari 2, diisi berita iklim BMKG terbaru (<=14 hari) */
 {const bs=((KA&&KA.bmkg&&KA.bmkg.besar)||[]).slice(0,3),br=((KA&&KA.bmkg&&KA.bmkg.berita)||[]).filter(x=>umurHari(x.tanggal)<=14&&!bs.some(y=>y.id===x.id||miripJudul(y.judul,x.judul)>=.5));
  while(bs.length<2&&br.length)bs.push(br.shift());bs.forEach(b=>out.push({label:"BMKG Pusat · "+tglPendek(b.tanggal),judul:escH(b.judul),teks:escH(potong(b.ringkas,200)),tombol:"Baca rilis BMKG",link:b.url,luar:1,gambar:b.gambar,figur:1,seni:"hujan",sumber:"Sumber: BMKG"}));}
 bannerBawaan().filter(b=>!b.sampai||new Date(Date.now()+9*3600e3).toISOString().slice(0,10)<=b.sampai).forEach(b=>{const e=EN();let x=b.gambar?{...b,figur:1}:b;if(x.link==="#peralatan"&&typeof ALAT!=="undefined"&&ALAT.length)x={...x,judul:String(x.judul).replace(/^\d+(?= AWS)/,ALAT.length)};if(x.link==="#prakiraan-musim"&&/musim hujan/i.test((x.label||"")+" "+(x.judul||""))&&typeof mundurPMH==="function"){const m=mundurPMH();if(m)x={...x,judul:escH(m.judul),teks:escH(m.singkat)}}
  out.push(b.enso&&!e.src?{...x,judul:e.status.replace(" · "," ")+": indeks ENSO "+fmtV(e.enso),teks:"Indeks ENSO "+e.ensoNama+" "+fmtV(e.enso)+" (data tersimpan per "+tglPendek(e.tglData||"")+"). Pantau perkembangan ENSO, IOD, dan MJO beserta dampaknya terhadap hujan di wilayah kami."}:b.enso&&e.src?{...x,judul:e.status.replace(" · "," ")+": indeks ENSO "+fmtV(e.enso),teks:"Indeks ENSO "+e.ensoNama+" mencapai "+fmtV(e.enso)+" (BMKG Pusat, "+tglPendek(e.src.tanggal)+"). Pantau dampaknya terhadap hujan dan kekeringan di wilayah kami.",
   ...(e.src.gambar?{gambar:e.src.gambar,figur:1,keterangan:"Anomali suhu muka laut · "+(e.src.judul.replace(/^Analisis Dinamika Atmosfer\s*/i,"")),sumber:"Gambar: BMKG Pusat"}:{})}:x)});
 /* 4) slot cadangan (urutan terakhir): prakiraan hujan bulan depan dari Buletin Iklim kami beserta petanya.
    Otomatis tergeser bila slot sudah penuh oleh peringatan, berita kegiatan, atau rilisan lain (maks 8 slide) */
 {const sb=slidePrakiraanDepan();if(sb)out.push(sb)}
 const lihat=new Set();return out.filter(x=>{const k=kunciJ(String(x.judul).replace(/<[^>]+>/g,""));if(lihat.has(k))return false;lihat.add(k);return true}).slice(0,8)}
function slidePrakiraanDepan(){const ik=IK(),bl=ik.prakiraan&&Array.isArray(ik.prakiraan.bulan)?ik.prakiraan.bulan:[];if(!bl.length)return null;
 const nm=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],h=new Date(Date.now()+9*3600e3),d=new Date(Date.UTC(h.getUTCFullYear(),h.getUTCMonth()+1,1)),target=nm[d.getUTCMonth()]+" "+d.getUTCFullYear();
 const b=bl.find(x=>String(x.bulan||"").toLowerCase().replace(/\s+/g," ").trim()===target.toLowerCase());if(!b)return null;
 const modus=a=>{const c={};a.filter(Boolean).forEach(v=>c[v]=(c[v]||0)+1);return Object.keys(c).sort((x,y)=>c[y]-c[x])[0]||""};
 const ring=[["pb","Papua Barat"],["pbd","Papua Barat Daya"]].map(([k,n])=>{const r=Array.isArray(b[k])?b[k]:[];if(!r.length)return null;const ch=modus(r.map(x=>x.ch)),sh=modus(r.map(x=>x.sh));return ch?{n,ch,sh}:null}).filter(Boolean);if(!ring.length)return null;
 const peta=(Array.isArray(ik.peta)?ik.peta:[]).filter(x=>x.k==="prakiraan"&&samaBulan(x.bulan,target)&&x.file).sort((x,y)=>(x.sub==="ch"?0:1)-(y.sub==="ch"?0:1)||(x.prov==="pb"?0:1)-(y.prov==="pb"?0:1))[0];
 const teks=ring.map(r=>`${r.n} umumnya ${r.ch.toLowerCase()}${HUJAN_ARTI(r.ch)?" ("+HUJAN_ARTI(r.ch).replace(/^hujan /,"")+")":""}${r.sh?", "+r.sh.toLowerCase():""}`).join("; ")+".";
 return {label:"Prakiraan Hujan · Buletin Iklim kami",judul:escH("Prakiraan hujan "+target),teks:escH(besarAwal(teks)+" Rincian per kabupaten di halaman Hujan Bulanan."),tombol:"Lihat prakiraan hujan",link:"#hujan-bulanan",seni:"hujan",
  ...(peta?{gambar:fileURL(peta.file),figur:1,keterangan:peta.judul,sumber:escH("Peta: "+(ik.sumber||"Buletin Iklim kami"))}:{})}}
/* ===== PERINGATAN DINI: beberapa wilayah sekaligus, tiap wilayah boleh berbeda status ===== */
const LV_URUT={waspada:1,siaga:2,awas:3};
const NAMA_JENIS={hujan:"Curah Hujan Tinggi",kekeringan:"Kekeringan Meteorologis"},JENIS_PENDEK={hujan:"Hujan tinggi",kekeringan:"Kekeringan"};
const linkJenis=j=>j==="hujan"?"#peringatan-hujan-tinggi":"#peringatan-kekeringan";
function daftarPeringatan(){const p=(KA&&KA.peringatan)||{};const hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
 const d=(Array.isArray(p.daftar)?p.daftar:(p.status&&p.status!=="nihil"?[p]:[])).filter(x=>LV_URUT[x.status]&&!(x.sampai&&x.sampai<hari)).map(x=>x.prov||!Array.isArray(x.kab)||!x.kab.length?x:{...x,prov:provDariKab(x.kab)});
 /* peringatan dari admin diutamakan: selama masih ada yang aktif, peringatan otomatis dari BMKG Pusat disembunyikan.
    Setelah peringatan admin berakhir, peringatan pusat tampil lagi bila masa berlakunya belum habis. */
 const pu=!d.length&&typeof peringatanPusat==="function"?peringatanPusat():[];
 return [...d,...pu].sort((a,b)=>LV_URUT[b.status]-LV_URUT[a.status])}
const PROV_KAB=k=>{const a=(typeof KAB_SEMUA!=="undefined"?KAB_SEMUA:[]).find(([n])=>samaKab(n,k));return a?a[1]:""};
const provDariKab=L=>{const s=new Set((L||[]).map(PROV_KAB).filter(Boolean));return s.has("pb")&&s.has("pbd")?"Papua Barat & Papua Barat Daya":s.has("pbd")?"Papua Barat Daya":s.has("pb")?"Papua Barat":""};
function peringatanAktif(){const d=daftarPeringatan();return d.length?d[0]:null}
const NAMA_STATUS={waspada:"Waspada",siaga:"Siaga",awas:"Awas"};
const IKON_JENIS={hujan:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 15a4 4 0 1 1 1.2-7.8A5 5 0 0 1 18 9a3.5 3.5 0 0 1 0 7"/><path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/></svg>',
 kekeringan:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="10" r="4"/><path d="M12 2v2M4.9 4.9l1.4 1.4M2 10h2M20 10h2M17.7 6.3l1.4-1.4M3 20h18M8 20l2-3 2 2 2-3 2 4"/></svg>'};
const IKON_BAHAYA=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="cincin" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/><circle class="cincin c2" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/><circle class="cincin c3" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/>
<g class="segitiga"><path d="M50 16 L88 82 H12 Z" style="fill:var(--wc);stroke:#1a0d00;stroke-width:3;stroke-linejoin:round"/><rect x="46" y="38" width="8" height="25" rx="4" fill="#1a0d00"/><circle class="seru" cx="50" cy="72" r="4.6" fill="#1a0d00"/></g></svg>`;
const IKON_AMAN=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="cincin lambat" cx="50" cy="50" r="30" style="fill:none;stroke:#6ee7b7;stroke-width:2.5"/><circle class="cincin lambat c2" cx="50" cy="50" r="30" style="fill:none;stroke:#6ee7b7;stroke-width:2.5"/>
<path d="M50 18 l26 10 v20 c0 17-11 27-26 31-15-4-26-14-26-31 V28z" fill="#ecfdf5" fill-opacity=".14" stroke="#a7f3d0" stroke-width="3" stroke-linejoin="round"/><path class="centang" d="M38 50 l9 9 16-18" fill="none" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function chipPeringatan(x,i){return `<a class="pchip lv-${x.status}" style="--i:${i}" href="${linkJenis(x.jenis)}"><span class="pbadge">${NAMA_STATUS[x.status]}</span><span class="pjen">${IKON_JENIS[x.jenis]} ${NAMA_JENIS[x.jenis]}</span><b>${escH(x.wilayah)}</b>${x.berlaku?`<small>${escH(x.berlaku)}</small>`:""}${x.catatan?`<em>${escH(x.catatan)}</em>`:""}</a>`}
/* dasarian berjalan (WIT), dipakai bila petugas belum mengisi masa berlaku, supaya teks tidak pernah basi */
function dasarianKini(){const d=new Date(Date.now()+9*3600e3),t=d.getUTCDate();return "Dasarian "+(t<=10?"I":t<=20?"II":"III")+" "+NM_BLN[d.getUTCMonth()].replace(/^./,c=>c.toUpperCase())+" "+d.getUTCFullYear()}
/* catatan SPI otomatis dari kartu SPI terbaru (buletin kami atau BMKG Pusat) */
/* teks polos dari potongan HTML kartu (DOMParser tidak menjalankan skrip/memuat gambar), lalu di-escape */
const polos=t=>{try{return new DOMParser().parseFromString(String(t||""),"text/html").body.textContent||""}catch(e){return ""}};
function catatanSpi(){const k=kartuGabung(kondisiData()).find(x=>x.kunci==="spi");if(!k||k.pusat||!/kering/i.test(polos(k.val)))return "";return escH(" Tetap pantau kekeringan: "+polos(k.lab||"SPI")+" menunjukkan "+polos(k.val)+(k.ket?" ("+polos(k.ket)+")":"")+".")}
/* penjelasan awam: peringatan ini tentang apa */
const ARTI_PER={hujan:{waspada:"hujan dalam 10 hari diprakirakan lebih dari 150 mm",siaga:"hujan dalam 10 hari diprakirakan lebih dari 200 mm",awas:"hujan dalam 10 hari diprakirakan lebih dari 300 mm"},
 kekeringan:{waspada:"sudah lebih dari 21 hari tanpa hujan dan hujan diprakirakan tetap sangat sedikit",siaga:"sudah lebih dari 31 hari tanpa hujan dan hujan diprakirakan tetap sangat sedikit",awas:"sudah lebih dari 61 hari tanpa hujan dan hujan diprakirakan tetap sangat sedikit"}};
const DAMPAK_PER={hujan:"Waspadai banjir, genangan, dan longsor.",kekeringan:"Waspadai kekurangan air bersih, gagal tanam, dan kebakaran lahan."};
const SARAN_PER={hujan:{waspada:["Bersihkan saluran air dan talang di sekitar rumah.","Pantau informasi cuaca harian BMKG.","Hindari berteduh atau parkir di bawah pohon besar dan lereng saat hujan lebat."],siaga:["Siapkan rencana mengungsi bila tinggal di dekat sungai atau lereng.","Amankan dokumen dan barang penting ke tempat lebih tinggi.","Ikuti informasi BPBD setempat."],awas:["Ikuti arahan BPBD dan aparat setempat.","Segera menjauh dari bantaran sungai dan lereng rawan longsor.","Siapkan tas siaga berisi obat, air minum, dan dokumen."]},
 kekeringan:{waspada:["Hemat pemakaian air bersih.","Jangan membakar lahan atau sampah.","Petani: sesuaikan jadwal tanam dan pilih varietas tahan kering."],siaga:["Tampung dan simpan air bersih.","Jangan membakar lahan; laporkan titik api ke aparat.","Petani: tunda tanam sampai hujan kembali teratur."],awas:["Ikuti arahan pemerintah daerah soal bantuan air bersih.","Jangan membakar apa pun di lahan terbuka.","Jaga kesehatan dari debu dan asap."]}};
function artiPeringatan(x){return ((ARTI_PER[x.jenis]||{})[x.status]||"")}
function periodePer(jenis){const d=daftarPeringatan().filter(x=>x.jenis===jenis);return (d[0]&&d[0].berlaku)||dasarianKini()}
function sumberDinat(){const d=typeof PUSAT!=="undefined"&&PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];return d&&d.url?d:null}
function bandPeringatan(){const d=daftarPeringatan(),P0=(KA&&KA.peringatan)||{};
 if(!d.length)return `<section class="band bleed band-nihil"><div class="wrap bandin bandin3"><div class="bandico">${IKON_AMAN}</div>
 <div><span class="eyebrow">Peringatan Dini Iklim · ${escH(P0.berlaku&&(!/dasarian\s+i{1,3}\b/i.test(P0.berlaku)||P0.berlaku.toLowerCase()===dasarianKini().toLowerCase())?P0.berlaku:dasarianKini())}</span><h2>Tidak ada status Waspada, Siaga, atau Awas</h2><p>${P0.catatan?escH(P0.catatan):"Berlaku untuk kekeringan meteorologis maupun curah hujan tinggi di Papua Barat dan Papua Barat Daya."+catatanSpi()}</p></div>
 <div class="bandbtn">${papanPer()}</div></div></section>`;
 return kartuPeringatan(d,P0)}
/* Kartu peringatan dini terstruktur (pola kartu Met Office/NWS, unsur CAP: jenis bahaya, tingkat, wilayah, masa berlaku, tindakan, waktu pembaruan).
   Warna tingkat hanya sebagai aksen; isi kartu memakai teks kontras tinggi. aria-live="polite" agar pembaca layar mengumumkannya tanpa memotong. */
const SKALA_PER=["waspada","siaga","awas"];
const AKSI_PER={waspada:"Pantau dan bersiap",siaga:"Siapkan langkah perlindungan",awas:"Segera bertindak"};
function waktuPeringatan(d){const pu=d.find(x=>x.pusat),sp=pu?sumberDinat():null,P0=(KA&&KA.peringatan)||{};
 if(pu){const wp=KA&&KA.bmkg&&KA.bmkg.wilayah,tb=pu.url&&wp?wp[pu.jenis==="hujan"?"hujan":"kering"]:null;
  return {teks:tb&&tb.diambil?tglPendek(new Date(tb.diambil+9*3600e3).toISOString().slice(0,10)):sp&&sp.tanggal?tglPendek(sp.tanggal):"",sumber:"BMKG Pusat"}}
 const t=P0.diubah?new Date(P0.diubah):null;return {teks:t&&!isNaN(t)?t.toLocaleString("id-ID",{timeZone:"Asia/Jayapura",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(/\./g,":")+" WIT":"",sumber:"Stasiun Klimatologi Papua Barat"}}
function teksBagi(d){const t=d[0],url=location.origin+"/"+linkJenis(t.jenis).replace(/^[#/]/,"");
 return `*Peringatan Dini Iklim – BMKG*\n${NAMA_STATUS[t.status]} ${t.jenis==="hujan"?"curah hujan tinggi":"kekeringan"}\n`+d.slice(0,6).map(x=>`• ${NAMA_STATUS[x.status]}: ${x.wilayah}`).join("\n")+(t.berlaku?`\nBerlaku: ${t.berlaku}`:"")+`\n${AKSI_PER[t.status]}. ${DAMPAK_PER[t.jenis]||""}\nInfo lengkap: ${url}`}
function kartuPeringatan(d,P0){const t=d[0],w=waktuPeringatan(d),jenisNama=x=>x.jenis==="hujan"?"Curah hujan tinggi":"Kekeringan meteorologis",adaPeta=d.some(x=>x.jenis==="hujan"),campur=!d.every(x=>x.jenis===t.jenis);
 const saran=((SARAN_PER[t.jenis]||{})[t.status]||[]).slice(0,3),berlaku=(t.pusat?t.berlaku:P0.berlaku||t.berlaku)||"",ub=perubahanPer(t),src=sumberResmi(d),lv=SKALA_PER.indexOf(t.status);
 const lainJ=[["hujan","curah hujan tinggi"],["kekeringan","kekeringan"]].filter(([j])=>!d.some(x=>x.jenis===j));
 return `<section class="peralert lv-${t.status}${adaPeta?" berpeta":""}" role="region" aria-live="polite" aria-labelledby="paJudul">
 <div class="pa-isi">
  <div class="pa-kepala"><span class="pa-ikon" aria-hidden="true">${IKON_BAHAYA}</span>
   <div class="pa-jdl"><span class="pa-label">Peringatan dini iklim${ub?` <em class="pa-ubah ub-${ub.k}">${ub.t}</em>`:""}</span><h2 id="paJudul">${NAMA_STATUS[t.status]} ${t.jenis==="hujan"?"curah hujan tinggi":"kekeringan"}${d.length>1?` <small>dan ${d.length-1} peringatan lain</small>`:""}</h2></div>
   <ol class="pa-skala" aria-label="Tingkat peringatan: ${NAMA_STATUS[t.status]}, tingkat ${lv+1} dari 3">${SKALA_PER.map((k,i)=>`<li class="sk-${k}${i<=lv?" isi":""}${k===t.status?" on":""}" style="--n:${i}"${k===t.status?' aria-current="true"':""}>${NAMA_STATUS[k]}</li>`).join("")}</ol></div>
  <p class="pa-aksi-besar"><span aria-hidden="true">➜</span> ${AKSI_PER[t.status]}</p>${lainJ.length?`<p class="pa-lain">${lainJ.map(([,n])=>`Tidak ada peringatan ${n}`).join(" · ")} di Papua Barat &amp; Papua Barat Daya.</p>`:""}
  <dl class="pa-fakta">
   <div><dt>Apa</dt><dd>${jenisNama(t)}: ${artiPeringatan(t)||""}${campur?" · ditambah peringatan jenis lain di bawah":""}</dd></div>
   ${berlaku?`<div><dt>Kapan</dt><dd>${escH(berlaku)}</dd></div>`:""}
   <div class="pa-dimana"><dt>Di mana</dt><dd>${d.length>1||t.rinci?`<ul class="pa-daftar">${d.map(x=>`<li><span class="pa-tk sk-${x.status}">${NAMA_STATUS[x.status]}</span><span>${x.rinci?`<b>${escH(x.prov)}</b>: ${escH(teksWil(x.rinci))}`:`<b>${escH(x.wilayah)}</b>`}${campur?` <small>· ${jenisNama(x)}</small>`:""}</span></li>`).join("")}</ul>`:escH(t.wilayah)}</dd></div>
   <div class="pa-dampak"><dt>Dampak</dt><dd>${DAMPAK_PER[t.jenis]||""}</dd></div></dl>
  ${saran.length?`<div class="pa-tindak"><b>Yang perlu dilakukan</b><ul>${saran.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:""}
  ${(()=>{const im=(!t.pusat&&t.catatan)||P0["imbauan_"+t.jenis]||"";return im?`<p class="pa-cat">${escH(im)}</p>`:""})()}
  <div class="pa-aksi">${[...new Set(d.map(x=>x.jenis))].map((jn,n)=>`<a class="${n?"pa-btn2":"pa-btn"}" href="${linkJenis(jn)}">${jn==="hujan"?"Rincian & peta hujan tinggi":"Rincian kekeringan"} <span aria-hidden="true">→</span></a>`).join("")}
   ${tombolDiam().replace('class="hsdiam"','class="pa-diam"')}
   <a class="pa-wa" href="https://wa.me/?text=${encodeURIComponent(teksBagi(d))}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.1z"/></svg>Bagikan ke WhatsApp</a></div>
  <p class="pa-waktu">${w.teks?`Diperbarui: <time>${escH(w.teks)}</time> · `:""}${t.sampai?`Pemutakhiran berikutnya: <time>${tglPendek(t.sampai)}</time> · `:""}Sumber: ${w.sumber}</p>
  ${src?`<a class="pa-resmi" href="${escH(src.url)}" target="_blank" rel="noopener">Lihat langsung di situs BMKG Pusat: ${escH(src.nama)} <span aria-hidden="true">↗</span></a>`:`<a class="pa-resmi" href="https://www.bmkg.go.id/peringatan-dini" target="_blank" rel="noopener">Lihat peringatan dini di situs BMKG Pusat <span aria-hidden="true">↗</span></a>`}
 </div>
 ${adaPeta?`<a class="pa-peta" href="${linkJenis("hujan")}" aria-label="Lihat peta peringatan dini curah hujan tinggi"><div class="pzkotak"><img src="${LIVE.pdcht}" alt="Peta peringatan dini curah hujan tinggi Papua Barat dan Papua Barat Daya" loading="lazy" data-galat="sembunyi:.pa-peta"><span class="pzlogo">Sumber: BMKG</span></div><span>Potongan peta BMKG: kuning = Waspada, oranye = Siaga, merah = Awas</span></a>`:""}
</section>`}
/* Papan status: semua jenis peringatan iklim sekaligus, termasuk yang TIDAK berlaku (pola papan peringatan Hong Kong Observatory) */
function papanPer(){const d=daftarPeringatan();return `<div class="papan" role="group" aria-label="Status peringatan dini iklim">${[["hujan","Curah hujan tinggi"],["kekeringan","Kekeringan"]].map(([j,n])=>{const a=d.filter(y=>y.jenis===j),x=a[0];
 return `<a class="papan-i ${x?"lv-"+x.status:"aman"}" href="${linkJenis(j)}"><span class="papan-n">${n}</span><b>${x?NAMA_STATUS[x.status]:"Tidak ada peringatan"}</b><small>${x?escH(potong(x.prov?[...new Set(a.map(y=>y.prov))].join(" & "):x.wilayah,52)):"Papua Barat &amp; Papua Barat Daya"}</small></a>`}).join("")}</div>`}
/* kalimat penjelasan di banner peringatan (produk iklim dasarian, bukan peringatan cuaca) */
const DESK_BANNER={hujan:{waspada:"Curah hujan tinggi berpotensi terjadi pada dasarian ini. Pantau perkembangan dan siapkan langkah antisipasi.",
 siaga:"Curah hujan tinggi berpotensi menimbulkan banjir dan tanah longsor. Tingkatkan kewaspadaan.",
 awas:"Curah hujan sangat tinggi berpotensi menimbulkan banjir bandang dan tanah longsor. Ikuti arahan BPBD setempat."},
 kekeringan:{waspada:"Curah hujan rendah berpotensi menimbulkan kekeringan meteorologis. Hemat air dan pantau perkembangan.",
 siaga:"Kekeringan berpotensi menimbulkan kekurangan air bersih dan gagal tanam. Hemat air dan jangan membakar lahan.",
 awas:"Kekeringan berpotensi menimbulkan krisis air bersih, gagal panen, dan kebakaran lahan. Ikuti arahan BPBD setempat."}};
function slidePeringatan(){const d=daftarPeringatan();if(!d.length)return null;const t=d[0],P0=(KA&&KA.peringatan)||{},satuJenis=d.every(x=>x.jenis===t.jenis),berlaku=(t.pusat?t.berlaku:P0.berlaku||t.berlaku)||"";
 return {label:`<span class="livedot"></span><b>${NAMA_STATUS[t.status]}</b> · Peringatan Dini ${satuJenis?NAMA_JENIS[t.jenis]:"Iklim"}${berlaku?`<span class="lbl-wkt"> · ${escH(berlaku)}</span>`:""}`,
  judul:`Status ${NAMA_STATUS[t.status]} ${t.jenis==="hujan"?"curah hujan tinggi":"kekeringan"}`,
  teks:`<span class="pkdesk">${(DESK_BANNER[t.jenis]||{})[t.status]||""}</span><span class="hchips">${d.slice(0,6).map(x=>`<span class="hchip lv-${x.status}"><i></i>${NAMA_STATUS[x.status]} · ${escH(potong(x.wilayah,60))}${satuJenis?"":" · "+JENIS_PENDEK[x.jenis]}</span>`).join("")}${d.length>6?`<span class="hchip">+${d.length-6} lainnya</span>`:""}</span>`,
  tombol:"Lihat peringatan",link:linkJenis(t.jenis),seni:t.jenis==="hujan"?"awasHujan":"awasKering",status:t.status,tingkat:{waspada:1,siaga:2,awas:3}[t.status]}}
/* kotak status di halaman Kekeringan & Hujan Tinggi */
function kotakPer(jenis){const d=daftarPeringatan().filter(x=>x.jenis===jenis);if(!d.length)return "";const t=d[0],sp=d.some(x=>x.pusat)?sumberDinat():null,adaPusat=d.some(x=>x.pusat);
 return `<div class="perbox lv-${t.status}"><div class="perico">${IKON_BAHAYA}</div><div><b>Status ${NAMA_STATUS[t.status]}${d.length>1?` di ${d.length} wilayah`:""}</b><ul>${d.map(x=>`<li class="lv-${x.status}">${d.length>1&&d.some(y=>y.status!==t.status)?`<span class="pbadge">${NAMA_STATUS[x.status]}</span> `:""}<b>${escH(x.wilayah)}</b>${x.berlaku?` <small>· ${escH(x.berlaku)}</small>`:""}${x.catatan?`<br><small>${escH(x.catatan)}</small>`:""}</li>`).join("")}</ul></div></div>
 <div class="perjelas"><div><h3>Peringatan ini tentang apa?</h3><p>${jenis==="hujan"?"Peringatan dini <b>curah hujan tinggi</b>":"Peringatan dini <b>kekeringan meteorologis</b>"} tingkat <b>${NAMA_STATUS[t.status]}</b>: ${artiPeringatan(t)}${t.berlaku?`, berlaku ${escH(t.berlaku)}`:""}. ${DAMPAK_PER[jenis]}</p></div>
 <div><h3>Wilayah mana?</h3><p>${d.some(x=>x.rinci)?d.map(x=>`<b>${NAMA_STATUS[x.status]}</b> · ${escH(x.prov||"")}: ${escH(x.rinci?teksWil(x.rinci):x.wilayah)}`).join("<br>")+`<br><small>Rincian kabupaten dan distrik dari tabel peringatan dini dasarian BMKG.${(d.find(x=>x.url)||{}).url?` <a href="${escH(d.find(x=>x.url).url)}" target="_blank" rel="noopener">Lihat tabel aslinya di situs BMKG Pusat ↗</a>`:""}</small>`:adaPusat?`BMKG Pusat menetapkan status ini untuk <b>${escH(daftarJ(d.filter(x=>x.pusat).map(x=>x.wilayah.replace(/^Beberapa kabupaten\/kota di /,""))))}</b>, tetapi rilis resminya hanya menyebut “beberapa kabupaten/kota” tanpa merinci namanya. Kabupaten/kota yang terkena terlihat sebagai warna kuning, oranye, atau merah pada <b>peta yang diperbesar di bawah</b>. Bila Stasiun Klimatologi Papua Barat sudah merinci wilayahnya, daftarnya akan tampil di sini.`:`Wilayah yang tercantum pada daftar di atas.`}</p></div>
 <div><h3>Apa yang perlu dilakukan?</h3><ul>${((SARAN_PER[jenis]||{})[t.status]||[]).map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
 ${sp?`<p class="note" style="margin:10px 0 0">Sumber: <a href="${escH(sp.url)}" target="_blank" rel="noopener">${escH(sp.judul)} ↗</a> (BMKG Pusat, ${tglPendek(sp.tanggal)}).</p>`:""}`}
/* ilustrasi banner khusus peringatan (lebih dramatis dari ilustrasi biasa) */
const BEACON=`<g class="cincin" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g><g class="cincin c2" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g><g class="cincin c3" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g>
<g class="segitiga"><path d="M0 -62 L64 50 H-64 Z" style="fill:var(--wc);stroke:#1a0d00;stroke-width:5;stroke-linejoin:round"/><rect x="-7" y="-26" width="14" height="44" rx="7" fill="#1a0d00"/><circle class="seru" cx="0" cy="34" r="8" fill="#1a0d00"/></g>`;
SENI.awasHujan=(()=>{const g=Array.from({length:170},(_,i)=>{const x=(i*61)%1300,y=(i*37)%520;return `<line x1="${x}" y1="${y}" x2="${x-26}" y2="${y+74}"/>`}).join("");
 return `<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ahb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0a1d"/><stop offset=".55" stop-color="#22193b"/><stop offset="1" stop-color="#0b3440"/></linearGradient>
<radialGradient id="ahg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 250) scale(330)"><stop offset="0" style="stop-color:var(--wc);stop-opacity:.45"/><stop offset="1" style="stop-color:var(--wc);stop-opacity:0"/></radialGradient></defs>
<rect width="1200" height="520" fill="url(#ahb)"/><rect class="sky-kilat" width="1200" height="520" fill="#c7d2fe"/>
<polyline class="petir" points="640,40 600,150 650,150 590,290" fill="none" stroke="#fef9c3" stroke-width="6" stroke-linejoin="round"/><polyline class="petir p2" points="1110,30 1070,130 1110,130 1060,240" fill="none" stroke="#fef9c3" stroke-width="5" stroke-linejoin="round"/>
<g class="awan-geser" fill="#3b3363" opacity=".95"><ellipse cx="300" cy="70" rx="320" ry="80"/><ellipse cx="760" cy="40" rx="300" ry="70"/><ellipse cx="1120" cy="70" rx="260" ry="80"/></g>
<g class="awan-geser a2" fill="#4c4580" opacity=".7"><ellipse cx="520" cy="110" rx="240" ry="50"/><ellipse cx="980" cy="120" rx="220" ry="46"/></g>
<rect width="1200" height="520" fill="url(#ahg)" class="denyut-cahaya"/>
<g stroke="#c7d2fe" stroke-opacity=".5" stroke-width="2.4" stroke-linecap="round"><g class="hujan-deras">${g}<g transform="translate(0 -520)">${g}</g></g></g>
<g transform="translate(900 250)">${BEACON}</g>
<path d="M0 470 L170 410 L300 440 L460 380 L620 430 L780 400 L960 440 L1200 410 L1200 520 L0 520 Z" fill="#071c22"/>
<g class="banjir"><path d="M-200 480 q50 -16 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V520 H-200Z" fill="#38bdf8" fill-opacity=".35"/></g>
<g class="banjir b2"><path d="M-200 492 q50 -12 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 V520 H-200Z" fill="#0ea5e9" fill-opacity=".45"/></g></svg>`})();
SENI.awasKering=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="akb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b0a02"/><stop offset=".55" stop-color="#9a3412"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
<radialGradient id="aks" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1010 130) scale(260)"><stop offset="0" stop-color="#fde68a" stop-opacity=".9"/><stop offset=".4" stop-color="#fb923c" stop-opacity=".45"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="520" fill="url(#akb)"/><circle class="halo" cx="1010" cy="130" r="260" fill="url(#aks)"/>
<g class="sinar" stroke="#fde68a" stroke-width="7" stroke-linecap="round" opacity=".75">${Array.from({length:16},(_,i)=>`<line x1="1010" y1="40" x2="1010" y2="8" transform="rotate(${i*22.5} 1010 130)"/>`).join("")}</g><circle cx="1010" cy="130" r="72" fill="#fff3c4"/>
${[0,1,2,3,4].map(i=>`<path class="fatamorgana" style="animation-delay:${i*.7}s" d="M${100+i*210} 430 q20 -20 0 -40 t0 -40 t0 -40" fill="none" stroke="#fde68a" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>`).join("")}

<path d="M0 440 L1200 420 L1200 520 L0 520 Z" fill="#7c2d12"/><g stroke="#3b0a02" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"><path d="M40 450 l40 20 l-10 30 M80 470 l50 -8 M300 440 l20 30 l40 6 l10 30 M320 470 l-30 30 M560 436 l-20 26 l30 20 l-10 38 M600 482 l60 -6 M820 432 l30 36 l-20 30 M850 468 l60 10 l20 -30 M1040 428 l-30 40 l20 40 M1010 468 l-60 14"/></g>
<g fill="#2a0a02" transform="translate(640 330)"><rect x="-6" y="0" width="12" height="100"/><path d="M0 30 l-50 -40 M0 50 l46 -46 M-30 6 l-18 -26 M28 18 l20 -30" stroke="#2a0a02" stroke-width="8" stroke-linecap="round"/></g>
${Array.from({length:14},(_,i)=>`<circle class="debu" style="animation-delay:${(i%7)*.9}s" cx="${(i*89)%1200}" cy="${400+(i*13)%40}" r="${2+i%3}" fill="#fed7aa" opacity=".5"/>`).join("")}</svg>`;

/* ===== pembaruan otomatis dari BMKG pusat untuk halaman-halaman Iklim ===== */
const ATURAN_PUSAT={
 "prakiraan-musim":{kat:[],re:/musim (hujan|kemarau)|prediksi musim|awal musim|puncak musim/i},
 "hujan-bulanan":{kat:[60,825],re:/curah hujan|sifat hujan|prakiraan hujan/i},
 "hari-tanpa-hujan":{kat:[208],re:/hari tanpa hujan|kekeringan|deret hari/i},
 "peringatan-kekeringan":{kat:[208],re:/kekeringan|\bspi\b|standardized precipitation/i},
 "peringatan-hujan-tinggi":{kat:[725],re:/hujan (lebat|tinggi|ekstrem)|potensi banjir|peringatan dini/i},
 "enso-iod":{kat:[8,899],re:/el ?ni[ñn]o|la ?ni[ñn]a|\benso\b|\biod\b|dipole|dinamika atmosfer/i},
 "iklim-papua-barat":{kat:[233,1638,1639],re:/papua|buletin|anomali suhu|perubahan iklim/i},
 "zona-musim":{kat:[],re:/zona musim|\bzom\b|musim (hujan|kemarau)/i},
 "prakiraan-musim-kemarau":{kat:[],re:/musim kemarau|prediksi musim kemarau/i}};
function itemPusat(k){const a=ATURAN_PUSAT[k],b=KA&&KA.bmkg;if(!a||!b)return [];const lihat=new Set();
 return [...(b.iklim||[]),...(b.produk||[]),...(b.berita||[])].filter(x=>{if(!x||lihat.has(x.id))return false;lihat.add(x.id);return (x.kat||[]).some(c=>a.kat.includes(c))||a.re.test(x.judul||"")})
  .sort((p,q)=>String(q.tanggal).localeCompare(String(p.tanggal))).slice(0,3)}
function pembaruanPusat(k){const d=itemPusat(k);if(!d.length)return "";const b=KA.bmkg;
 return `<section class="pusatbar"><div class="pusathead"><span class="livedot hijau"></span><b>Pembaruan terbaru dari BMKG Pusat</b>${b.diambil?`<small>dicek ${tglPendek(String(b.diambil).slice(0,10))}</small>`:""}</div>
 <div class="pusatlist">${d.map(x=>`<a class="pusatit" href="${escH(x.url)}" target="_blank" rel="noopener">${x.gambar?`<img src="${escH(x.gambar)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-galat="hapus">`:""}<div><span>${tglPendek(x.tanggal)}${umurHari(x.tanggal)<=14?' <em class="baru">Baru</em>':""}</span><b>${escH(judulID(x.judul))}</b></div></a>`).join("")}</div></section>`}
/* ===== tukar data dua AWS (lihat TUKAR_DATA di bagian konten) ===== */
const sumberId=id=>(typeof TUKAR_DATA!=="undefined"&&TUKAR_DATA[id])||id;
function tukarData(j){if(typeof TUKAR_DATA==="undefined"||!j)return j;const o={...j};for(const k in TUKAR_DATA){if(j[TUKAR_DATA[k]])o[k]=j[TUKAR_DATA[k]];else delete o[k]}return o}
/* ===== foto otomatis dari PDF yang diunggah (untuk banner) ===== */
let PDFJS=null;
function muatPdfJs(){if(PDFJS)return PDFJS;PDFJS=new Promise((ok,no)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";s.integrity="sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e";s.crossOrigin="anonymous";
 s.onload=()=>{const L=window.pdfjsLib;L.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";ok(L)};s.onerror=()=>{PDFJS=null;no(new Error("Pembaca PDF gagal dimuat"))};document.head.appendChild(s)});return PDFJS}
/* sampul terbitan: gambar halaman pertama PDF (setiap buletin punya sampul berbeda) */
async function sampulDariPdf(file){const L=await muatPdfJs();const doc=await L.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise;
 try{const pg=await doc.getPage(1),v0=pg.getViewport({scale:1}),vp=pg.getViewport({scale:Math.min(2.5,1000/v0.width)});const c=document.createElement("canvas");c.width=Math.round(vp.width);c.height=Math.round(vp.height);
  const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);await pg.render({canvasContext:ctx,viewport:vp}).promise;
  const bl=await new Promise(ok=>c.toBlob(ok,"image/jpeg",.85));return bl&&bl.size>5000?new File([bl],"sampul.jpg",{type:"image/jpeg"}):null}finally{try{doc.destroy()}catch(e){}}}
async function fotoDariPdf(file){const L=await muatPdfJs();const doc=await L.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise;let best=null;
 for(let n=1;n<=Math.min(doc.numPages,6);n++){const pg=await doc.getPage(n);const ops=await pg.getOperatorList();
  for(let i=0;i<ops.fnArray.length;i++){if(ops.fnArray[i]!==L.OPS.paintImageXObject)continue;const nm=ops.argsArray[i][0];
   const img=await new Promise(r=>{const t=setTimeout(()=>r(null),4000);const o=String(nm).startsWith("g_")?pg.commonObjs:pg.objs;try{o.get(nm,v=>{clearTimeout(t);r(v)})}catch(e){clearTimeout(t);r(null)}});
   if(!img||!img.width)continue;const w=img.width,h=img.height,ar=w/h;if(w<360||h<220||ar>3.2||ar<.45)continue;
   if(!best||w*h>best.w*best.h)best={img,w,h}}}
 if(!best)return null;const sk=Math.min(1,1600/best.w),c=document.createElement("canvas");c.width=Math.round(best.w*sk);c.height=Math.round(best.h*sk);const ctx=c.getContext("2d");
 if(best.img.bitmap)ctx.drawImage(best.img.bitmap,0,0,c.width,c.height);
 else if(best.img.data){const t=document.createElement("canvas");t.width=best.w;t.height=best.h;const tc=t.getContext("2d"),id=tc.createImageData(best.w,best.h),src=best.img.data,dst=id.data;
  if(best.img.kind===3)dst.set(src.subarray(0,dst.length));else if(best.img.kind===2){for(let i=0,j=0;j<dst.length;i+=3,j+=4){dst[j]=src[i];dst[j+1]=src[i+1];dst[j+2]=src[i+2];dst[j+3]=255}}else return null;
  tc.putImageData(id,0,0);ctx.drawImage(t,0,0,c.width,c.height)}else return null;
 const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.85));if(!blob)return null;
 return new File([blob],"foto-"+file.name.replace(/\.pdf$/i,"").slice(0,60)+".jpg",{type:"image/jpeg"})}

/* ===== membaca dokumen yang diunggah (PDF, PowerPoint .pptx, Word .docx) di browser =====
   Teksnya dikirim ke robot admin (AI) untuk mengisi otomatis kartu Kondisi Iklim. */
const TIPE_DOK={pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",pdf:"application/pdf"};
const extDok=f=>(String(f&&f.name||"").match(/\.(pdf|pptx|docx)$/i)||[])[1]?.toLowerCase()||"";
let JSZIPP=null;
function muatJsZip(){if(JSZIPP)return JSZIPP;JSZIPP=new Promise((ok,no)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";s.integrity="sha384-+mbV2IY1Zk/X1p/nWllGySJSUN8uMs+gUAN10Or95UBH0fpj6GfKgPmgC5EXieXG";s.crossOrigin="anonymous";s.onload=()=>ok(window.JSZip);s.onerror=()=>{JSZIPP=null;no(new Error("Pembaca PowerPoint gagal dimuat"))};document.head.appendChild(s)});return JSZIPP}
async function teksDariPdf(file,jenis){const L=await muatPdfJs();const doc=await L.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise;
 /* dokumen prediksi musim: baca semua halaman lalu pilih halaman yang membahas ZOM (lihat teksMusim) */
 if(jenis==="musim"){const hal=[];for(let n=1;n<=Math.min(doc.numPages,40);n++){const pg=await doc.getPage(n);const tc=await pg.getTextContent();hal.push(tc.items.map(i=>i.str).join(" ").replace(/\s+/g," "))}
  const semua=hal.map((t,i)=>"[Halaman "+(i+1)+"] "+t).join("\n");return semua.length<=14000?semua:teksMusim(hal)}
 let out="";
 for(let n=1;n<=Math.min(doc.numPages,40)&&out.length<16000;n++){const pg=await doc.getPage(n);const tc=await pg.getTextContent();out+="\n[Halaman "+n+"] "+tc.items.map(i=>i.str).join(" ").replace(/\s+/g," ")}
 return out.trim()}
const jenisBaca=t=>/prediksi musim|musim (hujan|kemarau)|press release|fgd|paparan/i.test(String(t||""))?"musim":"";
async function bukaZip(file){const Z=await muatJsZip();return Z.loadAsync(await file.arrayBuffer())}
async function teksDariZip(file){const z=await bukaZip(file),ext=extDok(file);const urut=(a,b)=>(+(a.match(/(\d+)\.xml$/)||[])[1]||0)-(+(b.match(/(\d+)\.xml$/)||[])[1]||0);
 const nama=Object.keys(z.files).filter(n=>ext==="pptx"?/^ppt\/slides\/slide\d+\.xml$/.test(n):/^word\/document\.xml$/.test(n)).sort(urut);let out="";
 for(const n of nama){const x=await z.file(n).async("string");const t=[...x.matchAll(ext==="pptx"?/<a:t>([^<]*)<\/a:t>/g:/<w:t[^>]*>([^<]*)<\/w:t>/g)].map(m=>m[1]).join(" ");
  out+="\n"+(ext==="pptx"?"[Slide "+(n.match(/(\d+)\.xml$/)||[])[1]+"] ":"")+bersihHtml(t);if(out.length>16000)break}
 return out.trim()}
async function fotoDariZip(file){const z=await bukaZip(file);const med=Object.values(z.files).filter(f=>/^(ppt|word)\/media\/.+\.(jpe?g|png)$/i.test(f.name));let best=null;
 for(const f of med){const b=await f.async("blob");if(b.size<40000)continue;const img=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=URL.createObjectURL(b)});
  if(!img)continue;const w=img.naturalWidth,h=img.naturalHeight,ar=w/h;if(w<360||h<220||ar>3.2||ar<.45)continue;if(!best||w*h>best.w*best.h)best={img,w,h}}
 if(!best)return null;const sk=Math.min(1,1600/best.w),c=document.createElement("canvas");c.width=Math.round(best.w*sk);c.height=Math.round(best.h*sk);c.getContext("2d").drawImage(best.img,0,0,c.width,c.height);
 const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.85));return blob?new File([blob],"foto-"+file.name.replace(/\.\w+$/,"").slice(0,60)+".jpg",{type:"image/jpeg"}):null}
async function bacaDokumen(file,jenis){const e=extDok(file);try{return e==="pdf"?await teksDariPdf(file,jenis):e?await teksDariZip(file):""}catch(er){return ""}}
const JENIS_OTOMATIS=["Buletin Iklim","Prediksi Musim Hujan","Prediksi Musim Kemarau","Informasi Iklim"];
/* gabungkan hasil AI ke Kondisi Iklim: kartu yang ditemukan menggantikan kartu sejenis, sisanya tetap */
/* dokumen prediksi musim (PMH/PMK, paparan, buku, press release) hanya boleh memperbarui kartu & teks MUSIM;
   kartu hujan bulanan, prakiraan, HTH, SPI hanya dari Buletin Iklim / informasi bulanan. Musim yang sudah lewat tidak dipakai. */
const docMusim=(judul,jenis)=>!/^buletin/i.test(jenis||"")&&/musim|\bpm[hk]\b|paparan|press\s*release/i.test((jenis||"")+" "+(judul||""));
async function simpanKondisiOtomatis(j,judul,jenis){const lama=kondisiData(),urut=KUNCI_KARTU.map(k=>k[0]);
 if(docMusim(judul,jenis)){const mk=(j.kartu||[]).filter(x=>x.kunci==="musim"&&!musimLewat(judul+" "+(x.judul||"")+" "+(x.nilai||"")));const tm=j.teks&&j.teks.musim&&!musimLewat(judul+" "+j.teks.musim)?{musim:j.teks.musim}:{};
  const lamaM=(lama.kartu||[]).find(x=>x.kunci==="musim"),kL=lamaM?mulaiMusim((lamaM.judul||"")+" "+(lamaM.nilai||"")+" "+(lamaM.src||"")):null,kB=mulaiMusim(judul+" "+((mk[0]||{}).judul||"")+" "+((mk[0]||{}).nilai||""));
  if(kL&&kB&&kB<kL){mk.length=0;delete tm.musim}
  if(!mk.length&&!tm.musim)return 0;const baru=mk.map(x=>({...x,src:judul}));const kartu=[...(lama.kartu||[]).filter(x=>!baru.some(n=>n.kunci===x.kunci)),...baru].sort((a,b)=>urut.indexOf(a.kunci)-urut.indexOf(b.kunci));
  await admJSON("/admin/kondisi",{sumber:lama.sumber||"",ringkasan:lama.ringkasan||"",kartu,teks:{...(lama.teks||{}),...tm},teks_src:{...(lama.teks_src||{}),...(tm.musim?{musim:judul}:{})},otomatis:lama.otomatis||""});return baru.length}
 const baru=(j.kartu||[]).filter(x=>x.kunci!=="musim"||!musimLewat(judul+" "+(x.judul||"")+" "+(x.nilai||""))).map(x=>({...x,src:judul}));if(!baru.length&&!Object.keys(j.teks||{}).length)return 0;
 const kartu=[...(lama.kartu||[]).map(x=>({...x,src:x.src||lama.sumber||""})).filter(x=>!baru.some(n=>n.kunci===x.kunci)),...baru].sort((a,b)=>urut.indexOf(a.kunci)-urut.indexOf(b.kunci));
 await admJSON("/admin/kondisi",{sumber:jenis==="Buletin Iklim"?judul:(lama.sumber||judul),ringkasan:j.ringkasan||lama.ringkasan||"",kartu,teks:{...(lama.teks||{}),...(j.teks||{})},teks_src:{...(lama.teks_src||{}),...Object.fromEntries(Object.keys(j.teks||{}).filter(k=>(j.teks||{})[k]).map(k=>[k,judul]))},otomatis:judul});
 return baru.length}

/* berita dari admin dan BMKG pusat untuk daftar berita */
/* berita BMKG Pusat yang hanya tentang daerah lain (mis. "Kota Baubau") tidak ditampilkan; nasional dan Papua tetap tampil */
const POLA_PAPUA_W=/papua|manokwari|sorong|raja ampat|fakfak|kaimana|bintuni|wondama|tambrauw|maybrat|arfak/i,POLA_NASIONAL=/indonesia|nasional|nusantara|seluruh wilayah|tanah air|\bri\b|dunia|global/i,POLA_DAERAH_LAIN=/\b(kota|kabupaten|kab\.)\s+[a-z]|aceh|sumatera|sumut|sumbar|riau|jambi|bengkulu|lampung|bangka|belitung|banten|jakarta|jabodetabek|jawa|jabar|jateng|jatim|yogyakarta|diy|bali|nusa tenggara|\bntt\b|\bntb\b|kalimantan|kalbar|kalteng|kalsel|kaltim|kaltara|sulawesi|sulsel|sulteng|sultra|sulut|sulbar|gorontalo|maluku|ambon|ternate|baubau|kendari|makassar|manado|palu|mataram|kupang/i;
function beritaRelevan(x){const t=String((x&&x.judul)||"")+" "+String((x&&x.ringkas)||"");if(x&&x.papua||POLA_PAPUA_W.test(t))return true;if(POLA_DAERAH_LAIN.test(String((x&&x.judul)||""))&&!POLA_NASIONAL.test(String((x&&x.judul)||"")))return false;return true}
function beritaDinamis(){const a=((KA&&KA.publikasi)||[]).filter(p=>p.jenis==="Berita Kegiatan").map(p=>({id:"a-"+p.id,tanggal:p.tanggal,judul:escH(p.judul),ringkas:escH(p.ringkas),gambar:fileURL(p.gambar),kami:1}));
 const b=((KA&&KA.bmkg&&KA.bmkg.berita)||[]).map(x=>({tanggal:x.tanggal,judul:escH(x.judul),ringkas:escH(potong(x.ringkas,160)),url:urlAman(x.url),gambar:urlAman(x.gambar),media:"BMKG Pusat",pusat:1,otomatis:1}));
 return [...a,...b]}
function beritaAdmin(id){const p=((KA&&KA.publikasi)||[]).find(x=>"a-"+x.id===id);if(!p)return null;
 const isi=(p.isi||p.ringkas||"").split(/\n\s*\n/).map(x=>`<p>${escH(x).replace(/\n/g,"<br>")}</p>`).join("");
 return {judul:escH(p.judul),tanggal:p.tanggal,gambar:fileURL(p.gambar),isi:isi+(p.file&&unduhDok()?`<p><a class="pbtn" href="${fileURL(p.file)}" target="_blank" rel="noopener">Unduh lampiran${p.ukuran?" · "+escH(p.ukuran):""}</a></p>`:"")}}
function pubPusat(){const a=(KA&&KA.bmkg&&KA.bmkg.produk)||[];if(!a.length)return "";
 return `<section class="sec"><div class="sechead"><div><span class="eyebrow">Dari BMKG Pusat</span><h2>Informasi Iklim Nasional</h2></div><a class="more" href="https://www.bmkg.go.id/iklim" target="_blank" rel="noopener">bmkg.go.id/iklim ↗</a></div>
 <div class="grid3">${a.map(x=>`<a class="card pubc pusatc" href="${escH(x.url)}" target="_blank" rel="noopener">${x.gambar?`<img src="${escH(x.gambar)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}<span class="pill">${escH((x.kategori||[])[0]||"BMKG")}</span><h3>${escH(x.judul)}</h3><small>${tglPendek(x.tanggal)}</small><span class="pbtn">Buka di bmkg.go.id ↗</span></a>`).join("")}</div></section>`}
let kontenDimuat=false;
let KA_STR="",KA_WAKTU=0;
function muatKonten(paksa){if(!KONTEN_URL||(kontenDimuat&&!paksa))return;kontenDimuat=true;KA_WAKTU=Date.now();
 fetch(KONTEN_URL+"/konten",{cache:"no-store"}).then(r=>r.json()).then(j=>{const sj=JSON.stringify(j);if(sj===KA_STR)return;KA_STR=sj;KA=j;terapkanPengaturan();isiFooter();if(PUSAT_MUAT&&pusatBasi())muatPusat(1);
  perbaruiTautanResmi();if(["beranda","publikasi","berita","layanan-data","aksesibilitas","kebijakan-privasi",...PROFIL_HAL,...IKLIM].includes(cur)||cur.startsWith("berita-")){const y=scrollY;render();scrollTo({top:y})}}).catch(()=>{})}

/* ilustrasi animasi kecil untuk kartu Produk Iklim (warna mengikuti --c kartu) */
const ART={
 kalender:`<svg viewBox="0 0 100 100" aria-hidden="true"><g class="a-putar" style="transform-origin:76px 24px"><circle cx="76" cy="24" r="9" fill="currentColor" opacity=".35"/>${[0,45,90,135,180,225,270,315].map(d=>`<line x1="76" y1="9" x2="76" y2="4" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5" transform="rotate(${d} 76 24)"/>`).join("")}</g><rect x="14" y="30" width="56" height="54" rx="9" fill="currentColor" opacity=".14"/><rect x="14" y="30" width="56" height="15" rx="7" fill="currentColor" opacity=".45"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<rect class="a-kedip" style="animation-delay:${(r*3+c)*.25}s" x="${22+c*15}" y="${51+r*10}" width="9" height="6" rx="2" fill="currentColor" opacity=".55"/>`).join("")).join("")}</svg>`,
 hujan:`<svg viewBox="0 0 100 100" aria-hidden="true"><g class="a-geser"><ellipse cx="50" cy="38" rx="30" ry="15" fill="currentColor" opacity=".35"/><ellipse cx="38" cy="32" rx="16" ry="13" fill="currentColor" opacity=".45"/><ellipse cx="60" cy="28" rx="15" ry="12" fill="currentColor" opacity=".4"/></g>${[30,46,62,78].map((x,i)=>`<line class="a-jatuh" style="animation-delay:${i*.3}s" x1="${x}" y1="58" x2="${x-4}" y2="68" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".6"/>`).join("")}</svg>`,
 matahari:`<svg viewBox="0 0 100 100" aria-hidden="true"><g class="a-putar" style="transform-origin:50px 40px">${Array.from({length:12},(_,i)=>`<line x1="50" y1="12" x2="50" y2="20" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".45" transform="rotate(${i*30} 50 40)"/>`).join("")}</g><circle class="a-denyut" cx="50" cy="40" r="15" fill="currentColor" opacity=".5"/><path d="M8 80 H92" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".35"/><path d="M30 80 l6 8 l-4 6 M60 80 l-5 7 l6 7" stroke="currentColor" stroke-width="2.5" fill="none" opacity=".45"/></svg>`,
 gelombang:`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="72" cy="26" r="11" fill="currentColor" opacity=".3"/><g class="a-ombak"><path d="M-40 58 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".55"/></g><g class="a-ombak2"><path d="M-40 74 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".35"/></g></svg>`,
 kering:`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 86 H90" stroke="currentColor" stroke-width="3" opacity=".4"/>${[[18,.0],[34,.3],[50,.6],[66,.9]].map(([x,d],i)=>`<rect class="a-batang" style="animation-delay:${d}s;transform-origin:${x+6}px 84px" x="${x}" y="${30+i*10}" width="12" height="${54-i*10}" rx="3" fill="currentColor" opacity="${.6-i*.1}"/>`).join("")}<path class="a-kedip" d="M78 18 l10 18 h-20z" fill="currentColor" opacity=".55"/></svg>`,
 peta:`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M10 30 L34 22 L62 32 L90 22 V78 L62 88 L34 78 L10 86 Z" fill="currentColor" opacity=".16"/><path d="M34 22 V78 M62 32 V88" stroke="currentColor" stroke-width="2" opacity=".35"/><g class="a-lompat"><path d="M50 30 c-9 0 -14 7 -14 13 c0 10 14 22 14 22 s14 -12 14 -22 c0 -6 -5 -13 -14 -13z" fill="currentColor" opacity=".7"/><circle cx="50" cy="43" r="5" fill="#fff"/></g></svg>`,
 daun:`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M4 86 L30 50 L46 66 L66 38 L96 86 Z" fill="currentColor" opacity=".2"/><g class="a-geser"><ellipse cx="34" cy="24" rx="16" ry="8" fill="currentColor" opacity=".3"/></g><g class="a-ayun" style="transform-origin:72px 86px"><path d="M72 86 C70 70 72 60 80 50 C86 62 82 76 72 86 Z" fill="currentColor" opacity=".55"/></g></svg>`,
 menara:`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 30 V90 M38 90 H62" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".5"/><g class="a-putar" style="transform-origin:50px 30px">${[0,120,240].map(d=>`<g transform="rotate(${d} 50 30)"><line x1="50" y1="30" x2="50" y2="16" stroke="currentColor" stroke-width="3" opacity=".6"/><circle cx="50" cy="14" r="4" fill="currentColor" opacity=".6"/></g>`).join("")}</g><rect x="56" y="56" width="16" height="12" rx="2" fill="currentColor" opacity=".4"/>${[1,2,3].map(r=>`<path class="a-sinyal" style="animation-delay:${r*.35}s" d="M${74+r*5} ${40-r*4} a${r*7} ${r*7} 0 0 1 0 ${r*14}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".55"/>`).join("")}</svg>`};

const MOTIF={"#prakiraan-musim":"kalender","#hujan-bulanan":"hujan","#hari-tanpa-hujan":"matahari","#enso-iod":"gelombang","#peringatan-kekeringan":"kering","#zona-musim":"peta","#iklim-papua-barat":"daun","#peralatan":"menara"};
/* ===== PROFIL (Tentang Kami · Pimpinan & Pegawai · Sejarah) — isi tambahan diatur dari halaman admin, tab Profil ===== */
SENI.kantor=`<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="kl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2a6f"/><stop offset=".7" stop-color="#1d4ed8"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><rect width="1200" height="520" fill="url(#kl)"/>
<g class="a-geser"><ellipse cx="300" cy="110" rx="140" ry="30" fill="#fff" opacity=".12"/><ellipse cx="900" cy="80" rx="190" ry="34" fill="#fff" opacity=".1"/></g>
<path d="M0 400 L160 300 L300 360 L470 250 L620 340 L780 270 L980 350 L1200 290 L1200 520 L0 520Z" fill="#052e2b" opacity=".55"/>
<g transform="translate(560 210)"><rect x="0" y="40" width="440" height="200" rx="6" fill="#e8edfb"/><rect x="0" y="22" width="440" height="26" rx="4" fill="#0133cc"/><path d="M-20 26 L220 -30 L460 26Z" fill="#0b2a6f"/>
${Array.from({length:4},(_,r)=>Array.from({length:8},(_,c)=>`<rect class="a-kedip" style="animation-delay:${(r*8+c)%7*.4}s" x="${22+c*52}" y="${64+r*40}" width="30" height="22" rx="3" fill="#93c5fd" opacity=".75"/>`).join("")).join("")}
<rect x="195" y="180" width="50" height="60" rx="3" fill="#0133cc"/><rect x="-6" y="236" width="452" height="10" fill="#cbd5e1"/></g>
<g transform="translate(430 260)" stroke="#e2e8f0" stroke-width="5" fill="none"><line x1="0" y1="0" x2="0" y2="190"/><line x1="-30" y1="190" x2="30" y2="190"/><g class="a-putar" style="transform-origin:0px 0px">${[0,120,240].map(d=>`<g transform="rotate(${d})"><line x1="0" y1="0" x2="0" y2="-26"/><circle cx="0" cy="-30" r="6" fill="#e2e8f0"/></g>`).join("")}</g><rect x="8" y="80" width="34" height="24" rx="3" fill="#e2e8f0"/></g>
<path d="M0 470 Q300 430 600 470 T1200 460 V520 H0Z" fill="#064e3b" opacity=".8"/></svg>`;
function inisial(n){return String(n||"").replace(/,.*$/,"").split(/\s+/).filter(w=>/^[A-Za-z]/.test(w)).slice(0,2).map(w=>w[0].toUpperCase()).join("")}
const paragraf=t=>String(t||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean).map(x=>`<p>${escH(x).replace(/\n/g,"<br>")}</p>`).join("");
const PROFIL_HAL=["profil","profil-tim","profil-sejarah","profil-akuntabilitas"];
const AKUN_BAWAAN="Laporan Kinerja Instansi Pemerintah (LKjIP) adalah pertanggungjawaban tahunan atas capaian sasaran kinerja dan penggunaan anggaran, diukur terhadap Perjanjian Kinerja dan Rencana Kinerja Tahunan.\n\nLKjIP merupakan salah satu bagian dari Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP), sehingga dibuka untuk masyarakat dan pemangku kepentingan.";
const SKM_AJAK_BAWAAN="Sudah memakai data atau informasi iklim dari kami? Isi Survei Kepuasan Masyarakat BMKG. Hanya beberapa menit, tanpa login.";
const KANTOR_BAWAAN=["Ransiki, Manokwari Selatan | Taman alat dan pengamatan iklim harian.","Arfai, Manokwari | Layanan data, informasi iklim, dan administrasi."];
const kunciNama=n=>String(n||"").replace(/,.*$/,"").toLowerCase().replace(/[^a-z ]/g," ").split(/\s+/).filter(w=>w.length>1).slice(0,2).join(" ");
function fotoPg(p){if(p.foto)return p.foto;const k=kunciNama(p.nama);const m=(typeof PEGAWAI!=="undefined"?PEGAWAI:[]).find(x=>x.foto&&kunciNama(x.nama)===k);return m?m.foto:""}
function dataTim(){const pr=(KA&&KA.profil)||{};const pg=((pr.pegawai&&pr.pegawai.length)?pr.pegawai:(typeof PEGAWAI!=="undefined"?PEGAWAI:[])).slice();
 pg.forEach((p,i)=>{pg[i]={...p,foto:fotoPg(p)}});let ki=pg.findIndex(p=>/kepala\s+sta/i.test(p.jabatan||""));let kepala=ki>=0?pg.splice(ki,1)[0]:{nama:pr.kepala||"Sony Hartono, S.Si",jabatan:"Kepala Stasiun Klimatologi Papua Barat",foto:pr.kepala_foto||""};
 return {pr,kepala,pegawai:pg}}
function heroProfil(judul,teks,crumb){const pr=(KA&&KA.profil)||{};const f=(pr.foto||[])[0];
 return `<section class="profhero bleed"><div class="profbg">${f?`<img src="${fileURL(f)}" alt="Kantor Stasiun Klimatologi Papua Barat">`:SENI.kantor}</div><div class="hsshade"></div>
 <div class="wrap profin"><div class="crumb"><a href="#beranda">Beranda</a> &gt;&gt; ${crumb}</div><span class="hslabel">Profil Kantor</span><h1>${judul}</h1><p>${teks}</p></div></section>`}
P.profil=()=>{const pr=(KA&&KA.profil)||{};const fotos=(pr.foto||[]).map(fileURL);const {kepala}=dataTim();
 const misi=String(pr.misi||"").split(/\n+/).map(x=>x.replace(/^\s*[\d.)\-•]+\s*/,"").trim()).filter(Boolean);
 return heroProfil("Stasiun Klimatologi Papua Barat","Stasiun Klimatologi Kelas III, Unit Pelaksana Teknis BMKG di bidang klimatologi untuk Provinsi Papua Barat dan Papua Barat Daya.","Profil")+`
<div class="istat profstat reveal">${[["2","Provinsi","Papua Barat · Papua Barat Daya"],["13","Kabupaten/kota","Wilayah layanan kami"],["21","Zona Musim","Dasar prediksi musim"],[ALAT.length,"Alat pengamatan","AWS & ARG data langsung"],...(()=>{const ib=infoBuletin();return [[ib.n,"Edisi Buletin Iklim Terbaru",ib.judul]]})()].map(([v,k,d])=>`<div><b>${v}</b><span>${k}</span><small>${d}</small></div>`).join("")}</div>
<section class="sec"><div class="grid2 reveal">
 <div class="card prose"><span class="eyebrow">Tentang Kami</span><h3 style="margin-top:6px">Melayani informasi iklim Tanah Papua bagian barat</h3>
 <p>Kami mengamati, mengumpulkan, mengolah, dan menyebarkan data serta informasi iklim di Provinsi Papua Barat dan Papua Barat Daya. Kantor pelayanan kami berada di Kompleks Perkantoran Gubernur Papua Barat, Arfai, Manokwari. Curah hujan dipantau melalui jaringan pos hujan kerja sama serta ${ALAT.length} alat pengamatan (AWS dan ARG) yang mengirim data langsung.</p>
 <p>Hasil pengamatan kami olah menjadi Buletin Iklim bulanan, prakiraan hujan, prediksi musim, peringatan dini kekeringan dan curah hujan tinggi, serta layanan data bagi instansi, peneliti, dan masyarakat.</p></div>
 <div class="card prose"><span class="eyebrow">Tugas Pokok</span><ul class="cekl">${["Pengamatan unsur iklim dan pengelolaan jaringan pos hujan.","Analisis dinamika atmosfer dan laut, curah hujan, serta sifat hujan bulanan.","Monitoring hari tanpa hujan dan indeks kekeringan (SPI).","Prakiraan curah hujan bulanan dan prediksi musim.","Penerbitan Buletin Iklim bulanan (ISSN 2622-9798).","Layanan data dan informasi iklim bagi instansi, peneliti, dan masyarakat."].map(t=>`<li>${t}</li>`).join("")}</ul></div>
</div></section>
<section class="sec"><div class="sechead"><div><span class="eyebrow">Pimpinan</span><h2>Kepala Stasiun</h2></div></div>
 <div class="kepala reveal"><div class="kfoto">${kepala.foto?`<img src="${fileURL(kepala.foto)}" alt="${escH(kepala.nama)}" data-galat="inisial" data-inisial="${inisial(kepala.nama)}">`:`<span>${inisial(kepala.nama)}</span>`}</div>
 <div><b>${escH(kepala.nama)}</b><small>${escH(kepala.jabatan||"Kepala Stasiun")}</small>${pr.sambutan?`<div class="sambutan">${paragraf(pr.sambutan)}</div>`:""}</div></div></section>
${pr.visi||misi.length?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Arah Kerja</span><h2>Visi &amp; Misi</h2></div></div><div class="grid2 reveal">${pr.visi?`<div class="card visi"><span class="eyebrow">Visi</span><p>${escH(pr.visi)}</p></div>`:""}${misi.length?`<div class="card prose"><span class="eyebrow">Misi</span><ol>${misi.map(m=>`<li>${escH(m)}</li>`).join("")}</ol></div>`:""}</div></section>`:""}
<section class="sec"><div class="profnav reveal"><a href="#profil-tim">${ic('<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.2-4.5 3-5"/>')}<div><b>Pimpinan &amp; Pegawai</b><span>Kepala stasiun, struktur organisasi, dan tim kami</span></div></a><a href="#profil-sejarah">${ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}<div><b>Sejarah</b><span>Perjalanan dan jejak nama kantor kami</span></div></a><a href="#profil-akuntabilitas">${ic('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8.5 14l2.5 2.5 4.5-5"/>')}<div><b>Akuntabilitas Kinerja</b><span>Laporan Kinerja (LKjIP) untuk publik</span></div></a></div></section>
${fotos.length>1?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Galeri</span><h2>Kantor &amp; Kegiatan</h2></div></div><div class="galeri">${fotos.slice(1).map((f,i)=>`<a class="reveal" style="--d:${i*60}ms" href="${f}" target="_blank" rel="noopener"><img src="${f}" alt="" loading="lazy"></a>`).join("")}</div></section>`:""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Hubungi Kami</span><h2>Kantor &amp; Lokasi</h2></div></div><div class="kontakgrid reveal">${kartuKontak()}${petaKantor()}</div></section>`};
P["profil-akuntabilitas"]=()=>{const L=[...pubAdmin(),...PUBLIKASI].filter(p=>/akuntabilitas|lkjip|lakip/i.test(p.kategori+" "+p.judul));
 return heroProfil("Akuntabilitas Kinerja","Laporan kinerja kami sebagai wujud akuntabilitas kepada masyarakat dan pemangku kepentingan.",'<a href="#profil">Profil</a> &gt;&gt; Akuntabilitas Kinerja')+`
<section class="sec"><div class="grid2 reveal"><div class="card prose"><h3 style="margin-top:0">Apa itu LKjIP?</h3>${paragraf(TW().akuntabilitas||AKUN_BAWAAN)}</div>
<div class="card prose"><h3 style="margin-top:0">Akses terbuka</h3><p>Semua dokumen di halaman ini dapat dibaca dan diunduh langsung, tanpa mengisi survei atau mendaftar.</p><p>Masukan atas kinerja kami dapat disampaikan lewat <a href="${waURL()}" target="_blank" rel="noopener">WhatsApp</a> atau surel <a href="mailto:${escH(INFO().email)}">${escH(INFO().email)}</a>.</p></div></div></section>
<section class="sec"><div class="sechead"><div><span class="eyebrow">Dokumen</span><h2>Laporan Kinerja</h2></div></div>
${L.length?`<div class="grid3">${L.map(p=>`<div class="card pubc" data-bebas-skm>${sampulDok("pubimg t-lkjip",p.gambar,"hujan",'<span class="pubtag">LKjIP</span>')}<span class="pill">${p.kategori}</span><h3>${p.judul}</h3><small>${p.tanggal||""}</small><p>${p.ringkas||""}</p>${p.file?`<a class="pbtn" href="${p.file}" target="_blank" rel="noopener">Baca / unduh PDF${p.ukuran?" · "+p.ukuran:""}</a>`:p.url?`<a class="pbtn" href="${p.url}" target="_blank" rel="noopener">Buka dokumen ↗</a>`:""}</div>`).join("")}</div>`:`<div class="card"><p style="margin:0">Dokumen laporan kinerja belum diunggah.</p></div>`}
<p class="note">Petugas menambah laporan tahun berikutnya lewat Admin › Terbitkan, jenis <b>Akuntabilitas Kinerja</b>.</p></section>`};
P["profil-tim"]=()=>{const {pr,kepala,pegawai}=dataTim();
 return heroProfil("Pimpinan &amp; Pegawai","Tim Stasiun Klimatologi Papua Barat yang melayani informasi iklim untuk Papua Barat dan Papua Barat Daya.",'<a href="#profil">Profil</a> &gt;&gt; Pimpinan &amp; Pegawai')+`
<section class="sec"><div class="sechead"><div><span class="eyebrow">Pimpinan</span><h2>Kepala Stasiun</h2></div></div>
 <div class="kepala reveal"><div class="kfoto">${kepala.foto?`<img src="${fileURL(kepala.foto)}" alt="${escH(kepala.nama)}" data-galat="inisial" data-inisial="${inisial(kepala.nama)}">`:`<span>${inisial(kepala.nama)}</span>`}</div>
 <div><b>${escH(kepala.nama)}</b><small>${escH(kepala.jabatan||"Kepala Stasiun")}</small>${pr.sambutan?`<div class="sambutan">${paragraf(pr.sambutan)}</div>`:""}</div></div></section>
${pr.struktur?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Organisasi</span><h2>Struktur Organisasi</h2></div></div><figure class="map reveal"><img src="${fileURL(pr.struktur)}" alt="Bagan struktur organisasi Stasiun Klimatologi Papua Barat" loading="lazy"></figure></section>`:""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Tim Kami</span><h2>Pegawai</h2></div></div>
${pegawai.length?`<div class="tim">${pegawai.map((p,i)=>`<div class="org reveal" style="--d:${(i%8)*60}ms"><div class="ofoto">${p.foto?`<img src="${fileURL(p.foto)}" alt="${escH(p.nama)}" loading="lazy" data-galat="inisial" data-inisial="${inisial(p.nama)}">`:`<span>${inisial(p.nama)}</span>`}</div><b>${escH(p.nama)}</b><small>${escH(p.jabatan)}</small></div>`).join("")}</div>`:`<div class="card"><p style="margin:0;color:var(--muted)">Daftar pegawai sedang kami lengkapi.</p></div>`}</section>`};
/* sejarah dari Admin: judul bagian = baris pendek tanpa titik yang dipisah baris kosong; "1. Judul: isi" jadi kartu */
function babSejarah(t){const bab=[];let cur=null;
 String(t||"").replace(/\r/g,"").split(/\n\s*\n+/).map(x=>x.trim()).filter(Boolean).forEach(b=>{const ls=b.split("\n").map(x=>x.trim()).filter(Boolean);
  if(ls.length===1&&b.length<=90&&!/[.,:;!?]$/.test(b)){cur={judul:b,isi:[]};bab.push(cur);return}
  if(!cur){cur={judul:"",isi:[]};bab.push(cur)}
  ls.forEach(l=>{const m=l.match(/^(\d+)[.)]\s+(.*)$/);if(m){let last=cur.isi[cur.isi.length-1];if(!last||last.t!=="daftar"){last={t:"daftar",b:[]};cur.isi.push(last)}const i=m[2].indexOf(":");last.b.push(i>0&&i<90?{j:m[2].slice(0,i).trim(),d:m[2].slice(i+1).trim()}:{j:"",d:m[2]})}else cur.isi.push({t:"p",x:l})})});
 return bab}
function sejarahHTML(t){const bab=babSejarah(t);if(!bab.length)return "";
 if(bab.length===1&&!bab[0].judul)return `<section class="sec"><div class="sechead"><div><span class="eyebrow">Perjalanan Kami</span><h2>Sejarah Singkat</h2></div></div><div class="card prose sejarah reveal">${paragraf(t)}</div></section>`;
 const tebal=x=>escH(x).replace(/&quot;([^&]{2,60})&quot;/g,"<q>$1</q>");
 const IKON=['<svg viewBox="0 0 24 24"><path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18.4 5.6l-2.1 2.1M21 12h-3"/><path d="M7 16a5 5 0 0 1 10 0"/><path d="M3 20h18"/></svg>','<svg viewBox="0 0 24 24"><path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/></svg>','<svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/></svg>','<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'];
 const ikKartu=['<svg viewBox="0 0 24 24"><path d="M12 2v8"/><circle cx="12" cy="14" r="4"/><path d="M5 22h14"/></svg>','<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/><path d="M3 12h18"/></svg>'];
 const pertama=bab[0].isi.find(x=>x.t==="p");
 return `<section class="sec sjr"><div class="sjrlead reveal"><span class="eyebrow">Perjalanan Kami</span><h2>Sejarah Singkat</h2>${pertama?`<p class="sjrbuka">${tebal(pertama.x)}</p>`:""}
 ${/Ransiki/i.test(t)?`<div class="sjrnama">${["Stasiun Klimatologi Kelas IV Ransiki","Stasiun Klimatologi Kelas III Manokwari Selatan","Stasiun Klimatologi Kelas III Papua Barat"].map((n,i)=>`<div class="sjrn${i===2?" kini":""}"><small>${["Awal","Peningkatan kelas","Kini"][i]}</small><b>${n}</b></div>`).join('<span class="sjrpanah" aria-hidden="true">→</span>')}</div>`:""}</div>
 <div class="sjrbab">${bab.map((b,i)=>`<article class="bab reveal" style="--d:${i*60}ms"><div class="babpin"><span>${String(i+1).padStart(2,"0")}</span><i aria-hidden="true">${IKON[i%IKON.length]}</i></div><div class="babisi">${b.judul?`<h3>${escH(b.judul)}</h3>`:""}
  ${b.isi.filter(x=>x!==pertama).map(x=>x.t==="p"?`<p>${tebal(x.x)}</p>`:`<div class="babkartu">${x.b.map((k,j)=>`<div class="bk"><i aria-hidden="true">${ikKartu[j%2]}</i><div>${k.j?`<b>${escH(k.j)}</b>`:""}<p>${tebal(k.d)}</p></div></div>`).join("")}</div>`).join("")}</div></article>`).join("")}</div></section>`}
const dk=i=>{const x=String(((TW().kantor||[])[i])||KANTOR_BAWAAN[i]).split("|");return {b:escH((x[0]||"").trim()),p:escH((x.slice(1).join("|")||"").trim())}};
const DUA_KANTOR_F=()=>{const a=dk(0),b=dk(1);return `<div class="duakantor reveal"><div><span aria-hidden="true">🔭</span><small>Saat ini · Pengamatan</small><b>${a.b}</b><p>${a.p}</p></div><div><span aria-hidden="true">🏢</span><small>Saat ini · Pelayanan</small><b>${b.b}</b><p>${b.p}</p></div></div>`};
P["profil-sejarah"]=()=>{const pr=(KA&&KA.profil)||{};
 return heroProfil("Sejarah","Perjalanan Stasiun Klimatologi Papua Barat melayani informasi iklim di Tanah Papua bagian barat.",'<a href="#profil">Profil</a> &gt;&gt; Sejarah')+`
${pr.sejarah?sejarahHTML(pr.sejarah).replace(/<\/section>\s*$/,`<p class="duaantar reveal">Saat ini kami bekerja dari dua kantor: pengamatan iklim di ${dk(0).b.split(",")[0]}, pelayanan di ${dk(1).b.split(",")[0]}.</p>${DUA_KANTOR_F()}</section>`):""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Jejak dalam Dokumen</span><h2>Dari Manokwari Selatan ke Papua Barat</h2></div></div>
${pr.sejarah?"":DUA_KANTOR_F()}
<ol class="jejak">
 <li class="reveal"><time>Ransiki, Manokwari Selatan</time><b>Lokasi pengamatan iklim</b><p>Ransiki di Kabupaten Manokwari Selatan menjadi lokasi pengamatan iklim kami sejak awal, dan sampai sekarang masih menjadi kantor pengamatan.</p></li>
 <li class="reveal" style="--d:80ms"><time>Mei 2020</time><b>Stasiun Klimatologi Manokwari Selatan</b><p>Nama ini tercantum pada dokumen analisis cuaca resmi BMKG tertanggal 25 Mei 2020, dengan alamat kantor di Kompleks Perkantoran Gubernur Papua Barat, Arfai, Manokwari. <a href="https://content.bmkg.go.id/wp-content/uploads/Analisis-Cuaca-Terkait-Hujan-Lebat-di-Distrik-Ransiki-Manokwari-Selatan-Papua-Barat.pdf" target="_blank" rel="noopener">Dokumen ↗</a></p></li>
 <li class="reveal" style="--d:160ms"><time>Kini</time><b>Stasiun Klimatologi Kelas III Papua Barat</b><p>Melayani Provinsi Papua Barat dan Papua Barat Daya dengan dua kantor: <b>kantor pengamatan di Ransiki</b> (Manokwari Selatan) dan <b>kantor pelayanan di Arfai</b> (Manokwari). Pada 22 Januari 2026 Kepala BMKG berkunjung ke kantor kami di Manokwari. <a href="https://www.bmkg.go.id/berita/kunjungi-manokwari-kepala-bmkg-tegaskan-peran-strategis-dukung-pembangunan-sektoral-di-tanah-papua" target="_blank" rel="noopener">Berita BMKG ↗</a></p></li>
</ol></section>`};
/* bagian untuk halaman Permintaan Pelayanan Data */
function kalenderLayanan(){return kalenderProduk()+wilayahLayanan()}
function kalenderProduk(){return `<section class="sec" style="margin-top:8px"><div class="sechead"><div><span class="eyebrow">Produk Rutin</span><h2>Kalender Layanan Informasi Iklim</h2></div></div>
 <p class="kal-lead">Informasi berikut terbit rutin dan bisa diunduh gratis dari web ini. Data di luar daftar ini, misalnya data harian per pos hujan, bisa diminta lewat formulir di bawah.</p>
 <div class="kal kal-ringkas">${layananData().kalender.map((x,i)=>`<a class="kalit reveal" href="${lnkAman(x.link)||"#layanan-data"}" style="--c:${WARNA_KAL[i%WARNA_KAL.length]};--d:${i*70}ms"><span>${escH(x.judul)}</span><p>${escH(x.isi)}</p></a>`).join("")}</div></section>`}
function wilayahLayanan(){return `<section class="sec"><div class="sechead"><div><span class="eyebrow">Wilayah Layanan</span><h2>Papua Barat &amp; Papua Barat Daya</h2></div></div>
 <div class="grid2 reveal"><div class="card"><b>Papua Barat</b><div class="wil">${KAB.map(k=>`<span class="pill">${k}</span>`).join("")}</div></div><div class="card"><b>Papua Barat Daya</b><div class="wil">${PBD.map(k=>`<span class="pill">${k}</span>`).join("")}</div></div></div></section>`}

/* admin: tab Profil */
function admProfil(){const pr=(KA&&KA.profil)||{};
 const baris=(p,i)=>`<div class="pgrow" data-i="${i}"><input name="pg_nama" placeholder="Nama lengkap dan gelar" value="${escH(p.nama||"")}"><input name="pg_jab" placeholder="Jabatan, ketik bebas (mis. Kepala Stasiun, Bendahara)" value="${escH(p.jabatan||"")}"><label class="mini fbtn">${p.foto?"Ganti foto":"Foto"}<input type="file" name="pg_foto" accept="image/jpeg,image/png,image/webp" hidden></label><input type="hidden" name="pg_lama" value="${escH(p.foto||"")}"><button type="button" class="mini bahaya" data-hapusbaris>✕</button></div>`;
 return `<form id="admProfil"><p class="admnote">Semua isian di sini tampil di halaman Profil. Bagian yang dikosongkan tidak ditampilkan.</p>
  <label>Sambutan Kepala Stasiun (opsional)<textarea name="sambutan" rows="4">${escH(pr.sambutan||"")}</textarea></label>
 <label>Visi<textarea name="visi" rows="2">${escH(pr.visi||"")}</textarea></label>
 <label>Misi (satu misi per baris)<textarea name="misi" rows="4">${escH(pr.misi||"")}</textarea></label>
 <label>Sejarah singkat (pisahkan paragraf dengan baris kosong)<textarea name="sejarah" rows="6">${escH(pr.sejarah||"")}</textarea></label>
 <label>Bagan struktur organisasi (gambar) ${pr.struktur?"(sudah ada)":""}<input type="file" name="struktur" accept="image/jpeg,image/png,image/webp"></label>
 <label>Foto kantor/kegiatan (boleh pilih beberapa; foto pertama jadi latar halaman Profil)<input type="file" name="foto" accept="image/jpeg,image/png,image/webp" multiple></label>
 ${(pr.foto||[]).length?`<div class="admfoto">${pr.foto.map(f=>`<label><img src="${fileURL(f)}" alt=""><span><input type="checkbox" name="foto_hapus" value="${escH(f)}"> hapus</span></label>`).join("")}</div>`:""}
 <h3 style="margin:18px 0 6px">Pimpinan &amp; Pegawai</h3><p class="admnote">Jabatan diketik bebas. Orang dengan jabatan berisi <b>Kepala Stasiun</b> otomatis tampil sebagai pimpinan. Bila kepala stasiun berganti atau ada pegawai mutasi, cukup ubah, hapus (✕), atau tambah baris lalu simpan.</p><div id="pgList">${((pr.pegawai||[]).length?pr.pegawai:(typeof PEGAWAI!=="undefined"?PEGAWAI:[])).map(baris).join("")}</div>
 <p><button type="button" class="mini" id="pgTambah">+ Tambah pegawai</button></p>
 <template id="pgTpl">${baris({},0)}</template>
 <button class="pbtn" type="submit">Simpan profil</button><p class="admmsg" id="admMsg"></p></form>`}
async function simpanProfil(f){const pr=(KA&&KA.profil)||{};
 const up=async(file)=>{if(!file)return "";if(file.size>30*1048576)throw new Error("Foto "+file.name+" terlalu besar (lebih dari 30 MB).");return (await admUnggah(file)).kunci};
 const d={sambutan:f.sambutan.value,visi:f.visi.value,misi:f.misi.value,sejarah:f.sejarah.value};
 pesan("Mengunggah foto…");
  d.struktur=(await up(f.struktur.files[0]))||pr.struktur||"";
 const hapus=new Set([...f.querySelectorAll('[name="foto_hapus"]:checked')].map(x=>x.value));
 const baru=[];for(const fl of f.foto.files)baru.push(await up(fl));
 d.foto=[...(pr.foto||[]).filter(x=>!hapus.has(x)),...baru].slice(0,12);
 d.pegawai=[];for(const r of f.querySelectorAll(".pgrow")){const nama=r.querySelector('[name="pg_nama"]').value.trim();if(!nama)continue;const fl=r.querySelector('[name="pg_foto"]').files[0];d.pegawai.push({nama,jabatan:r.querySelector('[name="pg_jab"]').value,foto:(await up(fl))||r.querySelector('[name="pg_lama"]').value})}
 {const kp=d.pegawai.find(p=>/kepala\s+sta/i.test(p.jabatan||""));d.kepala=kp?kp.nama:"";d.kepala_foto=kp?kp.foto:""}
 pesan("Menyimpan…");await admJSON("/admin/profil",d);await muatUlangKA();admTampil("profil");setTimeout(()=>pesan("Profil disimpan."),50)}

/* ===== HALAMAN ADMIN ===== */
const JENIS_TERBIT=["Buletin Iklim","Prediksi Musim Hujan","Prediksi Musim Kemarau","Peringatan Dini","Informasi Iklim","Berita Kegiatan","Akuntabilitas Kinerja","Lainnya"];
let ADM_PASS="";try{ADM_PASS=sessionStorage.getItem("admPass")||""}catch(e){}
let ADM_TAB="ringkasan";
function admFetch(jalur,opsi={}){return fetch(KONTEN_URL+jalur,{method:"POST",...opsi,headers:{"X-Admin":ADM_PASS,...(opsi.headers||{})}}).then(async r=>{const j=await r.json().catch(()=>({galat:"Jawaban server tidak terbaca"}));if(r.status===401){ADM_PASS="";try{sessionStorage.removeItem("admPass")}catch(e){}if(jalur!=="/admin/cek"&&cur==="admin")setTimeout(render,2500)}if(!r.ok||j.galat)throw new Error(j.galat||("HTTP "+r.status));return j})}
const admJSON=(jalur,data)=>admFetch(jalur,{body:JSON.stringify(data),headers:{"Content-Type":"application/json"}});
/* dokumen di atas 20 MB dikirim beberapa bagian (robot menyambungnya kembali saat diunduh) */
/* gambar dari kamera HP biasanya 3–8 MB: sebelum diunggah dikecilkan otomatis (lebar maks 2000 px, kualitas 85%).
   Gambar yang sudah kecil, GIF, dan PNG bertransparansi dibiarkan apa adanya. Hasil dipakai hanya bila jauh lebih kecil. */
async function gambarRingan(f){if(!/^image\/(jpeg|png|webp)$/.test(f.type||"")||f.size<400*1024)return f;
 try{const bmp=await createImageBitmap(f),sk=Math.min(1,2000/Math.max(bmp.width,bmp.height)),w=Math.round(bmp.width*sk),h=Math.round(bmp.height*sk);
  const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.drawImage(bmp,0,0,w,h);
  if(f.type!=="image/jpeg"){const d=x.getImageData(0,0,w,h).data;for(let i=3;i<d.length;i+=4*17)if(d[i]<250)return f}
  const bl=await new Promise(r=>c.toBlob(r,"image/jpeg",.85));if(!bl||bl.size>f.size*.85)return f;
  return new File([bl],String(f.name||"gambar").replace(/\.[a-z0-9]+$/i,"")+".jpg",{type:"image/jpeg"})}catch(e){return f}}
async function admUnggah(f){if(/^image\//.test(f.type||"")){f=await gambarRingan(f);if(f.size>5*1048576)throw new Error("Gambar "+f.name+" masih lebih dari 5 MB setelah dikecilkan. Pilih gambar lain.")}
 const B=20*1048576,h={"Content-Type":f.type||"application/octet-stream","X-Nama-File":encodeURIComponent(f.name)};
 if(f.size<=B||/^image\//.test(f.type))return admFetch("/admin/unggah",{body:f,headers:h});
 const n=Math.ceil(f.size/B);let u=await admFetch("/admin/unggah",{body:f.slice(0,B,f.type),headers:h});
 for(let i=1;i<n;i++){pesan(`Mengunggah dokumen bagian ${i+1} dari ${n}…`);u=await admFetch("/admin/unggah",{body:f.slice(i*B,(i+1)*B,f.type),headers:{...h,"X-Lanjut":u.kunci,"X-Ke":String(i)}})}return u}
P.admin=()=>{if(!KONTEN_URL)return head("Admin","Admin","Robot konten belum dipasang.");
 if(!ADM_PASS)return head("Admin","Halaman Admin","Khusus petugas Stasiun Klimatologi Papua Barat.")+`<form class="card admbox" id="admLogin" style="max-width:420px"><label>Password admin<input type="password" id="admPw" autocomplete="current-password" required></label><button class="pbtn" type="submit">Masuk</button><p class="admmsg" id="admMsg"></p></form>`;
 const T=[["ringkasan","Ringkasan"],["terbit","Terbitkan"],["daftar","Daftar Terbitan"],["peringatan","Peringatan Dini"],["kondisi","Kondisi Iklim"],["iklim","Semua Isi Iklim & Peta"],["poshujan","Data Pos Hujan"],["dasarian","Informasi Dasarian (10 harian)"],["pmhupdate","Update Prediksi Musim"],["ik-hujan","Prediksi Musim Hujan"],["ik-kemarau","Prediksi Musim Kemarau"],["ik-bulanan","Analisis & Prakiraan Hujan Bulanan"],["ik-hth","Monitoring Hari Tanpa Hujan"],["ik-spi","Kekeringan & SPI"],["ik-hujantinggi","Peringatan Hujan Tinggi"],["ik-enso","ENSO, IOD & Dinamika Atmosfer"],["ik-iklimpb","Iklim Papua Barat & PBD"],["ik-zom","Zona Musim (ZOM)"],["notif","Notifikasi Petugas"],["info","Info Kantor"],["profil","Profil"],["bmkg","BMKG Pusat"],["riwayat","Riwayat"],["wilayah","Info Wilayah Saya"],["alat","Peralatan"],["permohonan","Permohonan Data"],["masukan","Masukan"],["pengaduan","Pengaduan"],["wbs","Kotak WBS"],["periksa","Periksa Web"],["isiberanda","Banner & Pintasan"],["tekshal","Teks Halaman"],["tampilan","Tampilan Web"],["privasi","Privasi Tampilan"],["cadangan","Cadangan & Penyimpanan"],["panduan","Panduan"]];
 T.push(["skm","Survei Kepuasan (SKM)"]);
 const G=[["Mulai di sini",["ringkasan","panduan"]],["Beranda",["isiberanda","kondisi","peringatan"]],["Profil",["profil","info"]],["Iklim",["wilayah"]],["Iklim › Prakiraan",["ik-hujan","ik-kemarau","pmhupdate","ik-bulanan","dasarian"]],["Iklim › Peringatan & Monitoring",["poshujan","ik-hth","ik-spi","ik-hujantinggi","ik-enso","bmkg"]],["Iklim › Informasi Iklim",["ik-iklimpb","ik-zom","iklim"]],["Peralatan",["alat"]],["Layanan & Pengaduan",["permohonan","notif","skm","masukan","pengaduan","wbs"]],["Publikasi & Berita",["terbit","daftar"]],["Pengaturan web",["tekshal","tampilan","privasi","periksa","cadangan","riwayat"]]],nm=Object.fromEntries(T),dipakai=new Set(G.flatMap(g=>g[1]));
 T.forEach(([k])=>{if(!dipakai.has(k))G[G.length-1][1].push(k)});const tb=k=>`<button type="button" data-adm="${k}" class="${ADM_TAB===k?"on":""}">${nm[k]}</button>`;
 return head("Admin","Halaman Admin","Perubahan di sini langsung tampil di web (paling lama 1 menit).")+`<div id="admIngat">${pengingatAdmin()}</div><div class="admtabs grup">${G.map(([g,ks],i)=>`<div class="admgrp"><span class="admgl">${g}</span>${ks.filter(k=>nm[k]).map(tb).join("")}${i===0?`<button type="button" id="admKeluar" class="keluar">Keluar</button>`:""}</div>`).join("")}</div><p class="admhalinfo" id="admHalInfo"></p><div id="admBody" class="card admbox"></div>`};
/* v10: tab Admin per halaman Iklim (formulir yang sama, bagian lain disembunyikan tapi tetap ikut tersimpan) */
const IK_TAB={"ik-hujan":{sec:["Prediksi musim hujan"],th:["musim_reko_hujan"],hal:"prakiraan-musim"},"ik-kemarau":{sec:["Prediksi musim kemarau"],th:["musim_reko_kemarau"],hal:"prakiraan-musim-kemarau"},
 "ik-bulanan":{sec:["Analisis hujan","Prakiraan bulan"],peta:1,hal:"hujan-bulanan"},"ik-hth":{sec:["Hari tanpa hujan"],peta:1,hal:"hari-tanpa-hujan"},"ik-spi":{sec:["SPI"],th:["kekeringan_kesimpulan"],peta:1,hal:"peringatan-kekeringan"},
 "ik-hujantinggi":{sec:["Hujan ekstrem"],th:["hujan_tinggi_nihil","hujan_tinggi_catatan"],hal:"peringatan-hujan-tinggi"},"ik-enso":{sec:[],th:["enso_prediksi","iod_prediksi","enso_catatan","def_elnino","def_lanina","def_iod"],hal:"enso-iod"},
 "ik-iklimpb":{sec:[],th:["iklim_angka","iklim_catatan_judul","iklim_catatan"],hal:"iklim-papua-barat"},"ik-zom":{sec:["Prediksi musim hujan","Prediksi musim kemarau"],th:["zom_catatan"],hal:"zona-musim"}};
function saringIklim(el,tab){const c=IK_TAB[tab],f=el.querySelector("#admIklim");if(!c||!f)return;
 f.querySelectorAll("details.admsec").forEach(d=>{if(d.id==="ikPetaSec"){d.hidden=!c.peta;return}const sm=d.querySelector("summary"),j=sm?[...sm.childNodes].filter(n=>!(n.classList&&n.classList.contains("admhal"))).map(n=>n.textContent).join("").trim():"";
  if(/^Teks lain/.test(j)){const th=c.th||[];d.hidden=!th.length;d.open=!!th.length;d.querySelectorAll("label").forEach(l=>{const t=l.querySelector("textarea");if(t)l.hidden=!th.includes(t.name.slice(3))});if(sm){const h=sm.querySelector(".admhal");if(h)h.remove();sm.lastChild.textContent="Teks di halaman ini"}return}
  const ok=(c.sec||[]).some(p=>j.startsWith(p));d.hidden=!ok;if(ok){d.open=true;const h=sm&&sm.querySelector(".admhal");if(h)h.remove()}});
 const a=f.querySelector(".admnote");if(a)a.insertAdjacentHTML("beforebegin",`<p class="admnote ik-saring">Tab ini hanya menampilkan isi halaman <a href="#${c.hal}" target="_blank">${escH((META_HAL[c.hal]||[c.hal])[0].split(" – ")[0])} ↗</a>. Isi halaman Iklim lainnya ada di tab masing-masing atau di <button type="button" class="mini" data-adm="iklim">Semua Isi Iklim &amp; Peta</button>.</p>`)}
/* v11: pengganti penangan inline (onerror/onclick) supaya CSP tidak perlu 'unsafe-inline' untuk skrip */
document.addEventListener("error",e=>{const t=e.target;if(!t||t.tagName!=="IMG"||!t.dataset||!t.dataset.galat)return;const g=t.dataset.galat;t.removeAttribute("data-galat");
 if(g==="hapus")t.remove();else if(g==="figure"||g==="a"){const p=t.closest(g);(p||t).remove()}else if(g.startsWith("sembunyi:")){const p=t.closest(g.slice(9));if(p)p.hidden=true}
 else if(g==="banner"){if(typeof gagalBanner==="function")gagalBanner(t)}else if(g==="sampul"){if(typeof gagalSampul==="function")gagalSampul(t)}
 else if(g.startsWith("snap:")){const k=g.slice(5);if(typeof SNAP!=="undefined"&&SNAP[k])t.src=SNAP[k]}
 else if(g==="inisial"){const sp=document.createElement("span");sp.textContent=t.dataset.inisial||"";t.replaceWith(sp)}},true);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-klik]");if(!b)return;if(b.dataset.klik==="cetak")print();else if(b.dataset.klik==="tutup-induk"&&b.parentElement)b.parentElement.className=""});
/* Admin › Liputan media: isi otomatis dari alamat berita */
document.addEventListener("click",async e=>{const b=e.target.closest&&e.target.closest("#mdAmbil");if(!b)return;const inp=document.getElementById("mdTautan"),ket=document.getElementById("mdKet"),u=(inp.value||"").trim();
 if(!/^https:\/\//i.test(u)){ket.textContent="Tempel alamat berita yang diawali https://";inp.focus();return}
 b.disabled=true;ket.textContent="Membaca berita…";
 try{const j=await admJSON("/admin/ambil-tautan",{url:u}),L=document.getElementById("ldMedia"),tp=document.getElementById("ldMediaTpl");L.insertAdjacentHTML("afterbegin",tp.innerHTML);const r=L.firstElementChild,set=(k,v)=>{const el=r.querySelector(`[name="${k}"]`);if(el&&v)el.value=v};
  set("tanggal",j.tanggal);set("media",j.media);set("judul",j.judul);set("url",j.url||u);set("gambar",j.gambar);set("ringkas",j.ringkas);inp.value="";ket.textContent="✅ Baris baru terisi di paling atas. Periksa isinya, lalu tekan Simpan liputan media.";r.querySelector("[name=judul]").focus()}
 catch(er){ket.textContent="⚠️ "+er.message}finally{b.disabled=false}});
/* Admin › Isi Iklim: tombol "Buka bagian ini" di kotak Perlu dibetulkan */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ikbuka]");if(!b)return;const pre=IK_BAG_SEC[b.dataset.ikbuka]||"";
 const cari=()=>[...document.querySelectorAll("#admIklim details.admsec")].find(d=>{const sm=d.querySelector("summary");return sm&&[...sm.childNodes].filter(n=>!(n.classList&&n.classList.contains("admhal"))).map(n=>n.textContent).join("").trim().startsWith(pre)});
 let d=cari();if(!d||d.hidden){admTampil("iklim");d=cari()}if(!d)return;d.open=true;d.scrollIntoView({behavior:"smooth",block:"start"});const x=d.querySelector("textarea,input");if(x)setTimeout(()=>x.focus({preventScroll:true}),400)});
/* v12: tautan ?bagian=… menggulir ke bagian yang dimaksud setelah halaman tampil */
function gulirBagian(b){b=String(b||"").replace(/[^\w-]/g,"").slice(0,40);if(!b)return;const re=new RegExp("\\b"+b.replace(/-/g,"[\\s-]")+"\\b","i");const cari=()=>document.getElementById(b)||document.querySelector(`[data-bagian="${b}"]`)||[...document.querySelectorAll("#app h2,#app h3,#app [role=heading]")].find(h=>re.test(h.textContent));
 let n=0;const coba=()=>{const el=cari();if(el){el.scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}else if(++n<10)setTimeout(coba,150)};setTimeout(coba,120)}
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href*="?bagian="]');if(!a)return;try{gulirBagian(new URL(a.href,location.href).searchParams.get("bagian"))}catch(er){}},true);
try{const b0=new URLSearchParams(location.search).get("bagian");if(b0)addEventListener("load",()=>gulirBagian(b0))}catch(e){}
/* v12: urutan judul tidak melompat (mis. H1 langsung ke H3): pembaca layar & WAVE membaca level yang benar, tampilan tidak berubah */
function rapikanJudul(){let prev=1;
 /* judul panel ("Indeks ENSO dan IOD Terkini", dst.) dijadikan judul tingkat 2 bagi pembaca layar */
 document.querySelectorAll("#app .panel-head").forEach(p=>{const s=p.firstElementChild;if(!s||s.tagName!=="SPAN"||s.dataset.pj||!s.textContent.trim()||p.querySelector("h1,h2,h3,h4,h5,h6"))return;s.setAttribute("role","heading");s.setAttribute("aria-level","2");s.dataset.pj="2"});
 document.querySelectorAll("#app :is(h1,h2,h3,h4,h5,h6,[data-pj])").forEach(h=>{if(h.closest("[hidden]"))return;if(h.dataset.pj){prev=2;return}const asli=+(h.dataset.lvAsli||h.tagName[1]);
 if(asli>prev+1){h.dataset.lvAsli=asli;h.setAttribute("role","heading");h.setAttribute("aria-level",String(prev+1));prev=prev+1}else{if(h.dataset.lvAsli){h.removeAttribute("role");h.removeAttribute("aria-level");delete h.dataset.lvAsli}prev=asli}})}
{const elApp=document.getElementById("app");if(elApp){let tj=0;new MutationObserver(()=>{clearTimeout(tj);tj=setTimeout(rapikanJudul,120)}).observe(elApp,{childList:true,subtree:true});setTimeout(rapikanJudul,300)}}
/* tiap tab Admin: halaman web mana yang diubahnya (nama sama dengan menu web) */
const ADM_HAL={isiberanda:[["beranda","Beranda"]],kondisi:[["beranda","Beranda › kotak Kondisi Iklim"]],peringatan:[["beranda","Beranda › kartu peringatan"],["peringatan-kekeringan","Iklim › Kekeringan & SPI"],["peringatan-hujan-tinggi","Iklim › Peringatan Hujan Tinggi"]],
 profil:[["profil","Profil › Tentang Kami"],["profil-tim","Profil › Pimpinan & Pegawai"],["profil-sejarah","Profil › Sejarah"],["profil-akuntabilitas","Profil › Akuntabilitas Kinerja"]],info:[["beranda","Beranda › Kantor & Lokasi"],["layanan-data","Permintaan Pelayanan Data"]],
 iklim:[["hujan-bulanan","Iklim › Analisis & Prakiraan Hujan Bulanan"],["hari-tanpa-hujan","Iklim › Monitoring Hari Tanpa Hujan"],["peringatan-kekeringan","Iklim › Kekeringan & SPI"],["peringatan-hujan-tinggi","Iklim › Peringatan Hujan Tinggi"],["prakiraan-musim","Iklim › Prediksi Musim Hujan"],["zona-musim","Iklim › Zona Musim (ZOM)"]],
 poshujan:[["pos-hujan","Iklim › Data Pos Hujan"]],dasarian:[["informasi-dasarian","Iklim › Informasi Dasarian"],["wilayah","Info Wilayah Saya"]],pmhupdate:[["prakiraan-musim","Iklim › Prediksi Musim Hujan"],["beranda","Beranda › banner"]],wilayah:[["wilayah","Info Wilayah Saya"],["iklim-manokwari","halaman tiap kabupaten/kota"]],bmkg:[["enso-iod","Iklim › ENSO, IOD & Dinamika Atmosfer"],["beranda","Beranda"]],alat:[["peralatan","Peralatan"]],
 permohonan:[["layanan-data","Permintaan Pelayanan Data"]],"ik-hujan":[["prakiraan-musim","Iklim › Prediksi Musim Hujan"]],"ik-kemarau":[["prakiraan-musim-kemarau","Iklim › Prediksi Musim Kemarau"]],"ik-bulanan":[["hujan-bulanan","Iklim › Analisis & Prakiraan Hujan Bulanan"]],"ik-hth":[["hari-tanpa-hujan","Iklim › Monitoring Hari Tanpa Hujan"]],"ik-spi":[["peringatan-kekeringan","Iklim › Kekeringan & SPI"]],"ik-hujantinggi":[["peringatan-hujan-tinggi","Iklim › Peringatan Hujan Tinggi"]],"ik-enso":[["enso-iod","Iklim › ENSO, IOD & Dinamika Atmosfer"]],"ik-iklimpb":[["iklim-papua-barat","Iklim › Iklim Papua Barat & PBD"]],"ik-zom":[["zona-musim","Iklim › Zona Musim (ZOM)"]],skm:[["layanan-data","Permintaan Pelayanan Data"],["beranda","Beranda › Kantor & Lokasi"]],terbit:[["publikasi","Publikasi"],["berita","Berita"]],daftar:[["publikasi","Publikasi"],["berita","Berita"]],tekshal:[["layanan-data","Permintaan Pelayanan Data"],["iklim-papua-barat","halaman-halaman Iklim"]]};
const ADM_HAL_KET={wbs:"Laporan pelanggaran pegawai, terkunci sandi WBS. Tidak tampil ke publik.",notif:"Mengatur siapa yang diberi tahu saat ada permohonan data, pengaduan, atau laporan WBS baru. Tidak tampil ke publik.",pengaduan:"Kotak masuk dari halaman Pengaduan. Tidak tampil ke publik; pelapor hanya melihat status dan tanggapan lewat nomor tiket.",masukan:"Kotak masuk dari tombol “Kirim masukan” di web. Tidak tampil ke publik.",ringkasan:"Keadaan web saat ini. Tidak mengubah apa pun.",panduan:"Petunjuk untuk petugas.",tampilan:"Menyembunyikan atau menampilkan bagian di seluruh web.",privasi:"Mengatur apa saja yang boleh dilihat publik.",periksa:"Memeriksa seluruh halaman; tidak mengubah apa pun.",cadangan:"Menyimpan dan memulihkan seluruh isi web.",riwayat:"Daftar perubahan; bisa dikembalikan."};
function isiAdmHal(tab){const el=document.getElementById("admHalInfo");if(!el)return;const h=ADM_HAL[tab];el.innerHTML=h?"Mengubah halaman: "+h.map(([k,n])=>`<a href="#${k}">${escH(n)} ↗</a>`).join(" "):(ADM_HAL_KET[tab]?escH(ADM_HAL_KET[tab]):"")}
function admTerbitForm(p){p=p||{};const hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
 return `<form id="admTerbit">${p.id?`<input type="hidden" name="id" value="${escH(p.id)}"><p class="admnote">Mengubah: <b>${escH(p.judul)}</b>. Kosongkan file bila tidak diganti.</p>`:""}
 <div class="admgrid"><label>Jenis<select name="jenis">${JENIS_TERBIT.map(j=>`<option${(p.jenis||"Buletin Iklim")===j?" selected":""}>${j}</option>`).join("")}</select></label>
 <label>Tanggal<input type="date" name="tanggal" value="${escH(p.tanggal||hari)}" required></label></div>
 <label>File dokumen: PDF, PowerPoint (.pptx), atau Word (.docx), <b>maksimal 75 MB</b> ${p.file?"(sudah ada, pilih untuk mengganti)":""}<input type="file" name="file" accept="application/pdf,.pdf,.pptx,.docx,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></label>
 <p class="admnote">Untuk Buletin Iklim, Prediksi Musim, FGD, dan press release: isi dokumen dibaca otomatis oleh AI untuk memperbarui <b>Kondisi Iklim Terkini</b> dan ringkasan di halaman Iklim. Bila ada yang keliru, betulkan di tab <b>Kondisi Iklim</b>.</p>
 <p><button type="button" class="mini" id="admAI">Isi judul &amp; ringkasan dari dokumen (AI)</button> <span class="admnote">Periksa kembali hasilnya sebelum menerbitkan.</span></p>
 <label>Judul<input name="judul" maxlength="200" required value="${escH(p.judul||"")}"></label>
 <label>Ringkasan (1–2 kalimat)<textarea name="ringkas" rows="3" maxlength="600">${escH(p.ringkas||"")}</textarea></label>
 <label class="isiBerita">Isi berita (khusus Berita Kegiatan; pisahkan paragraf dengan baris kosong)<textarea name="isi" rows="7">${escH(p.isi||"")}</textarea></label>
 <label>Gambar sampul / foto (opsional; foto besar dari HP dikecilkan otomatis)<input type="file" name="gambar" accept="image/jpeg,image/png,image/webp"></label>
 <p class="admnote">Boleh dikosongkan: halaman pertama (sampul) PDF otomatis dipakai sebagai gambar. Untuk PowerPoint/Word dipakai foto terbesar di dalamnya.</p>
 <label>Atau link dokumen (opsional, mis. Google Drive)<input name="link" type="url" placeholder="https://..." value="${escH(p.link||"")}"></label>
 <label class="cek"><input type="checkbox" name="banner" ${p.banner!==false?"checked":""}> Tampilkan di banner beranda (60 hari)</label>
 <button class="pbtn" type="submit">${p.id?"Simpan perubahan":"Terbitkan"}</button><p class="admmsg" id="admMsg"></p></form>`}
function admPubBawaan(){terapkanPengaturan();const sp=((KA&&KA.pengaturan)||{}).sembunyi_pub||{},L=(ASLI&&ASLI.pub)||[];if(!L.length)return "";
 return `<form id="admPub" class="admsec2" style="margin-top:20px"><h3>Publikasi bawaan web</h3><p class="admnote">Dokumen yang tersimpan langsung di file web (bukan diunggah lewat Admin). Ubah judul, tanggal, atau ringkasan, atau hilangkan centang "Tampilkan" untuk menyembunyikannya.</p>
 ${L.map((p,i)=>{const o=sp[slugP(p.judul)]||{};return `<fieldset class="kdrow"><legend>${escH(p.kategori||"Dokumen")}${p.file||p.url?"":" · belum ada file"}</legend><input type="hidden" name="pb_kunci" value="${escH(slugP(p.judul))}">
  <label class="cek" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" name="pb_tampil_${i}"${o.sembunyi?"":" checked"}> Tampilkan</label>
  <div class="admgrid"><label>Judul<input name="pb_judul" value="${escH(o.judul||p.judul)}"></label><label>Tanggal<input name="pb_tanggal" value="${escH(o.tanggal||p.tanggal||"")}"></label></div>
  <label>Ringkasan<textarea name="pb_ringkas" rows="2">${escH(o.ringkas||p.ringkas||"")}</textarea></label><input type="hidden" name="pb_asli" value="${escH(JSON.stringify({judul:p.judul,tanggal:p.tanggal||"",ringkas:p.ringkas||""}))}"></fieldset>`}).join("")}
 <button class="pbtn" type="submit">Simpan publikasi bawaan</button></form>`}
async function simpanPubBawaan(f){const k=[...f.querySelectorAll('[name="pb_kunci"]')],j=[...f.querySelectorAll('[name="pb_judul"]')],t=[...f.querySelectorAll('[name="pb_tanggal"]')],r=[...f.querySelectorAll('[name="pb_ringkas"]')],a=[...f.querySelectorAll('[name="pb_asli"]')];const o={};
 k.forEach((x,i)=>{const asli=JSON.parse(a[i].value),e={};if(!f.querySelector(`[name="pb_tampil_${i}"]`).checked)e.sembunyi=true;if(j[i].value.trim()&&j[i].value.trim()!==asli.judul)e.judul=j[i].value.trim();if(t[i].value.trim()!==asli.tanggal&&t[i].value.trim())e.tanggal=t[i].value.trim();if(r[i].value.trim()!==asli.ringkas&&r[i].value.trim())e.ringkas=r[i].value.trim();if(Object.keys(e).length)o[x.value]=e});
 await admJSON("/admin/pengaturan",{kunci:"sembunyi_pub",nilai:o});await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan("Publikasi bawaan disimpan. Tampil di web paling lama 1 menit."),50)}
async function sampulUlang(ids){const L=((KA&&KA.publikasi)||[]).filter(p=>ids.includes(p.id)&&p.file&&/\.pdf$/i.test(p.nama_file||".pdf"));let ok=0;const ubah=[];
 for(let i=0;i<L.length;i++){const p=L[i];pesan(`Membuat sampul ${i+1} dari ${L.length}: ${p.judul}…`);
  try{const bl=await fetch(fileURL(p.file),{headers:{"X-Admin":ADM_PASS}}).then(r=>{if(!r.ok)throw new Error("File tidak terunduh");return r.blob()});const img=await sampulDariPdf(new File([bl],"dok.pdf",{type:"application/pdf"}));if(!img)continue;
   const u=await admUnggah(img);ubah.push({id:p.id,gambar:u.kunci});ok++}catch(er){}}
 /* semua sampul disimpan sekaligus (1 kali simpan) agar hemat kuota tulis */
 if(ubah.length){pesan("Menyimpan "+ubah.length+" sampul…");try{await admJSON("/admin/ubah-massal",{item:ubah,aksi:"Perbarui sampul "+ubah.length+" terbitan dari halaman 1 PDF"})}catch(er){ok=0;setTimeout(()=>pesan("Sampul gagal disimpan: "+galatWorkerLama(er.message),1),60);await muatUlangKA();admTampil("daftar");return}}
 await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan(ok+" sampul diperbarui dari halaman pertama PDF."+(ok<L.length?" "+(L.length-ok)+" gagal, coba lagi.":"")),50)}
document.addEventListener("click",e=>{const t=e.target;if(!t.closest||!t.closest("#admBody"))return;
 if(t.dataset.sampul){t.disabled=true;t.classList.add("memuat");sampulUlang([t.dataset.sampul]);return}
 if(t.id==="rapikanBuletin"){rapikanBuletin(t);return}
 if(t.id==="sampulSemua"){const n=((KA&&KA.publikasi)||[]).filter(p=>p.file&&/\.pdf$/i.test(p.nama_file||".pdf")).length;if(!n||!confirm("Buat ulang gambar sampul "+n+" terbitan dari halaman pertama PDF-nya?\n\nSetiap file diunduh dulu, jadi bisa makan waktu beberapa menit. Jangan tutup halaman ini."))return;t.disabled=true;t.classList.add("memuat");sampulUlang(((KA&&KA.publikasi)||[]).map(p=>p.id))}});
/* judul buletin yang rapi: buang nomor urut file di depan ("10.", "05 -"), garis bawah, dan spasi ganda */
function judulRapi(t){let j=String(t||"").replace(/^\s*\d{1,3}\s*[.)\-_]\s*/,"").replace(/_/g," ").replace(/\s+/g," ").trim();
 const m=j.match(/^buletin\s+iklim\s+(?:edisi\s+)?(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})$/i);
 return m?"Buletin Iklim "+besarAwal(m[1].toLowerCase())+" "+m[2]:j.charAt(0).toUpperCase()+j.slice(1)}
function rencanaRapikan(){return ((KA&&KA.publikasi)||[]).filter(p=>p.jenis!=="Berita Kegiatan"&&/buletin\s*iklim/i.test((p.jenis||"")+" "+(p.judul||""))).map(p=>{const j=judulRapi(p.judul),r=ringkasLokal(j)||p.ringkas||"";return {id:p.id,judul:j,ringkas:r,lama:p.judul,beda:j!==p.judul||r!==(p.ringkas||"")}}).filter(x=>x.beda)}
async function rapikanBuletin(t){const L=rencanaRapikan();if(!L.length){pesan("Semua judul dan ringkasan buletin sudah rapi.");return}
 const daftar=L.slice(0,12).map(x=>"• "+(x.lama===x.judul?x.judul+" (ringkasan disamakan)":x.lama+"  →  "+x.judul)).join("\n")+(L.length>12?"\n• …dan "+(L.length-12)+" lainnya":"");
 if(!confirm("Rapikan "+L.length+" Buletin Iklim?\n\n"+daftar+"\n\nRingkasan diganti kalimat baku sesuai bulan edisinya. Bisa dibatalkan lewat tab Riwayat."))return;
 t.disabled=true;t.classList.add("memuat");pesan("Merapikan "+L.length+" buletin…");
 try{await admJSON("/admin/ubah-massal",{item:L.map(x=>({id:x.id,judul:x.judul,ringkas:x.ringkas})),aksi:"Rapikan judul & ringkasan "+L.length+" buletin"});await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan(L.length+" buletin sudah dirapikan."),50)}
 catch(er){t.disabled=false;t.classList.remove("memuat");pesan(galatWorkerLama(er.message),1)}}
const galatWorkerLama=m=>/Perintah admin tidak dikenal/i.test(m||"")?"Kode worker staklim-admin di Cloudflare belum diperbarui. Tempel kode terbaru, klik Deploy, lalu coba lagi.":m;
function admDaftar(){const a=(KA&&KA.publikasi)||[];if(!a.length)return `<p class="admmsg" id="admMsg"></p><p>Belum ada terbitan dari halaman admin.</p>${admPubBawaan()}`;
 return `<p class="admmsg" id="admMsg"></p><p class="admnote">Urutan buletin mengikuti bulan edisinya, bukan tanggal unggah. <button type="button" class="mini" id="sampulSemua">Perbarui semua sampul dari halaman 1 PDF</button> <button type="button" class="mini" id="rapikanBuletin" title="Hapus nomor urut di depan judul dan samakan ringkasan semua Buletin Iklim">Rapikan judul &amp; ringkasan buletin</button></p><div class="admlist">${a.map(p=>`<div class="admrow"><div><span class="pill">${escH(p.jenis)}</span> <b>${escH(p.judul)}</b><br><small>${tglPendek(p.tanggal)}${p.file?` · <a href="${fileURL(p.file)}" target="_blank" rel="noopener">${/\.pptx$/i.test(p.nama_file||"")?"PPTX":/\.docx$/i.test(p.nama_file||"")?"DOCX":"PDF"} ${escH(p.ukuran||"")}</a>`:""}${p.banner?" · di banner":""}</small></div><div><button type="button" class="mini" data-ubah="${escH(p.id)}">Ubah</button> ${/\.pdf$/i.test(p.nama_file||".pdf")&&p.file?` <button type="button" class="mini" data-sampul="${escH(p.id)}" title="Pakai halaman pertama PDF sebagai gambar">Sampul hal. 1</button>`:""} <button type="button" class="mini bahaya" data-hapus="${escH(p.id)}">Hapus</button></div></div>`).join("")}</div>${admPubBawaan()}`}
function admKondisi(){const kd=kondisiData();
 const row=m=>{const x=(kd.kartu||[]).find(k=>k.kunci===m[0])||{};const la=m[0]==="musim"?"Persen luas daratan (untuk lingkaran)":m[0]==="hth"?"Jumlah pos (opsional)":m[0]==="spi"?"Nilai SPI (opsional, mis. -1,6)":"Angka (opsional)";
  return `<fieldset class="kdrow"><legend>${m[1]}</legend><input type="hidden" name="kd_kunci" value="${m[0]}"><input type="hidden" name="kd_src" value="${escH(x.src||"")}"><div class="admgrid"><label>Judul kartu<input name="kd_judul" value="${escH(x.judul||"")}" placeholder="mis. Hujan Oktober 2026"></label><label>Nilai (huruf besar di kartu)<input name="kd_nilai" value="${escH(x.nilai||"")}" placeholder="mis. Rendah"></label></div><div class="admgrid"><label>Keterangan<input name="kd_ket" value="${escH(x.ket||"")}" placeholder="mis. Sifat Bawah Normal"></label><label>${la}<input name="kd_angka" inputmode="decimal" value="${x.angka==null?"":escH(String(x.angka).replace(".",","))}"></label></div></fieldset>`};
 return `<form id="admKondisi"><p class="admnote">Kartu-kartu ini tampil di <b>Kondisi Iklim Terkini</b> (beranda) dan di halaman Iklim terkait. Perbarui setiap terbit Buletin Iklim baru. Kartu ENSO, IOD, peringatan dini, dan prediksi hujan dasarian terisi otomatis dari BMKG Pusat. Kosongkan Judul atau Nilai untuk menyembunyikan kartu.</p>
 <div class="admgrid"><label>Sumber<input name="sumber" value="${escH(kd.sumber||"")}" placeholder="mis. Buletin Iklim Edisi November 2026"></label></div>
 <label>Ringkasan singkat (tampil di kartu ENSO beranda)<textarea name="ringkasan" rows="2">${escH(kd.ringkasan||"")}</textarea></label>
 ${kd.otomatis?`<p class="admnote">Terakhir diisi otomatis oleh AI dari: <b>${escH(kd.otomatis)}</b>. Periksa dan betulkan bila ada yang keliru.</p>`:""}
 ${KUNCI_KARTU.map(row).join("")}
 <h3 style="margin:18px 0 6px">Ringkasan per halaman Iklim</h3><p class="admnote">Tampil di halaman Iklim terkait. Terisi otomatis dari dokumen yang diunggah; boleh dibetulkan.</p>
 <div class="admgrid">${[["hujan","Hujan bulanan (analisis)"],["prakiraan","Prakiraan hujan"],["musim","Prediksi musim / ZOM"],["hth","Hari tanpa hujan"],["spi","Kekeringan & SPI"],["enso","ENSO & IOD"]].map(([k,n])=>`<label>${n}<textarea name="tk_${k}" rows="3">${escH((kd.teks||{})[k]||"")}</textarea></label>`).join("")}</div>
 <button class="pbtn" type="submit">Simpan kondisi iklim</button><p class="admmsg" id="admMsg"></p></form>`}
function admPeringatan(){const p=(KA&&KA.peringatan)||{};const d=Array.isArray(p.daftar)?p.daftar:(p.status&&p.status!=="nihil"?[p]:[]);
 const tebak=x=>{if(Array.isArray(x.kab)&&x.kab.length)return x.kab;let t=String(x.wilayah||"");const o=[];KAB_POLA.forEach(([n,re])=>{if(re.test(t)){o.push(n);t=t.replace(re," ")}});return o};
 const dasOpsi=(()=>{const o=[],d=new Date(Date.now()+9*3600e3);let y=d.getUTCFullYear(),m=d.getUTCMonth(),k=d.getUTCDate()<=10?0:d.getUTCDate()<=20?1:2;for(let i=0;i<4;i++){const akhir=k<2?(k+1)*10:new Date(Date.UTC(y,m+1,0)).getUTCDate();
   o.push({t:"Dasarian "+["I","II","III"][k]+" "+NM_BLN_PMH[m]+" "+y,s:`${y}-${String(m+1).padStart(2,"0")}-${String(akhir).padStart(2,"0")}`});k++;if(k>2){k=0;m++;if(m>11){m=0;y++}}}return o})();
 const baris=x=>{const kb=tebak(x),dis=String(x.distrik||"");return `<div class="perrow perrow2"><div class="perbar1"><select name="pr_status" aria-label="Status">${["waspada","siaga","awas"].map(v=>`<option value="${v}"${x.status===v?" selected":""}>${NAMA_STATUS[v]}</option>`).join("")}</select><select name="pr_jenis" aria-label="Jenis"><option value="hujan"${x.jenis==="hujan"?" selected":""}>Curah hujan tinggi</option><option value="kekeringan"${x.jenis==="kekeringan"?" selected":""}>Kekeringan</option></select><select name="pr_das" aria-label="Berlaku untuk dasarian"><option value="">Pilih dasarian berlaku…</option>${dasOpsi.map(o=>`<option value="${o.s}|${escH(o.t)}"${x.berlaku===o.t?" selected":""}>${escH(o.t)}</option>`).join("")}${x.berlaku&&!dasOpsi.some(o=>o.t===x.berlaku)?`<option value="${escH(x.sampai||"")}|${escH(x.berlaku)}" selected>${escH(x.berlaku)}</option>`:""}</select></div>
 <fieldset class="perkab"><legend>Kabupaten/kota${!kb.length&&x.wilayah?` <span class="perwarn">⚠ wilayah lama "${escH(potong(x.wilayah,40))}" tidak dikenali, pilih kabupatennya</span>`:""}</legend>${["pb","pbd"].map(pv=>`<div><small>${pv==="pb"?"Papua Barat":"Papua Barat Daya"}</small>${KAB_SEMUA.filter(q=>q[1]===pv).map(([n])=>`<label class="cekkab"><input type="checkbox" name="pr_kab" value="${escH(n)}"${kb.some(k=>samaKab(k,n))?" checked":""}> ${escH(n)}</label>`).join("")}</div>`).join("")}</fieldset>
 <div class="perbar1"><input name="pr_dis" list="perDisList" placeholder="Distrik (opsional, pisahkan dengan koma; kosong = seluruh kabupaten)" value="${escH(dis)}"><input name="pr_cat" placeholder="Imbauan khusus baris ini (opsional)" value="${escH(x.catatan||"")}"><button type="button" class="mini bahaya" data-hapusbaris title="Hapus baris">✕</button></div></div>`};
 const kini=daftarPeringatan(),allDis=[...new Set(KAB_SEMUA.flatMap(([k])=>{try{return zomUntuk(k,"").distrik||[]}catch(e){return []}}))].sort();
 return `<form id="admPer"><h3 style="margin:0 0 6px">Peringatan dini curah hujan tinggi &amp; kekeringan meteorologis</h3>
 <p class="admnote" style="border-left:4px solid ${kini.length?"#ca8a04":"#16a34a"};padding-left:10px"><b>Yang tampil di web saat ini:</b> ${kini.length?kini.map(x=>`${NAMA_STATUS[x.status]} ${x.jenis==="hujan"?"hujan tinggi":"kekeringan"} · ${escH(potong(x.prov||x.wilayah,60))}${x.pusat?" (dari BMKG Pusat)":" (dari tabel ini)"}`).join("; "):"tidak ada peringatan (Nihil)"}.</p>
 <datalist id="perDisList">${allDis.map(d=>`<option value="${escH(d)}">`).join("")}</datalist>
 <p class="admnote">Isi <b>satu baris untuk tiap kelompok wilayah</b> dengan status dan jenis yang sama; satu baris boleh memuat beberapa kabupaten. Tiap wilayah boleh berbeda status (Waspada, Siaga, Awas) dan jenis (hujan tinggi atau kekeringan). Bila tidak ada baris sama sekali, web otomatis menampilkan peringatan dini nasional dari BMKG Pusat untuk Papua Barat/Papua Barat Daya (bila ada); jika pusat juga tidak mengeluarkan, status <b>Nihil</b>. Selama ada peringatan dari sini, peringatan pusat disembunyikan sementara. Kolom tanggal = tampil sampai tanggal itu (opsional).</p>
 <div id="perList">${d.map(baris).join("")}</div><p><button type="button" class="mini" id="perTambah">+ Tambah wilayah</button></p><template id="perTpl">${baris({status:"waspada",jenis:"hujan"})}</template>
 <input type="hidden" name="berlaku" value="${escH(p.berlaku||"")}">
 <div class="admgrid"><label>Imbauan saat peringatan <b>kekeringan</b> (tampil bersama peringatan kekeringan, termasuk dari BMKG Pusat)<textarea name="imbauan_kekeringan" rows="2">${escH(p.imbauan_kekeringan!=null?p.imbauan_kekeringan:(p.catatan||""))}</textarea></label>
 <label>Imbauan saat peringatan <b>curah hujan tinggi</b><textarea name="imbauan_hujan" rows="2">${escH(p.imbauan_hujan||"")}</textarea></label></div>
 <label>Teks pita beranda saat <b>tidak ada peringatan</b> (opsional)<textarea name="catatan" rows="2">${escH(p.catatan||"")}</textarea></label>
 <p class="admnote">Bila ada peringatan, banner beranda menampilkan slide peringatan beranimasi paling depan dan pita peringatan pindah ke atas Kondisi Iklim Terkini. Warna mengikuti status tertinggi. Surat peringatan (PDF) dapat diterbitkan di tab Terbitkan dengan jenis "Peringatan Dini".</p>
 <button class="pbtn" type="submit">Simpan peringatan</button><p class="admmsg" id="admMsg"></p></form>`}
function admInfo(){const I=INFO();
 return `<form id="admInfo"><div class="admgrid"><label>Nomor WhatsApp<input name="wa" value="${escH(I.wa)}"></label><label>Email<input name="email" type="email" value="${escH(I.email)}"></label></div>
 <label>Alamat<textarea name="alamat" rows="2">${escH(I.alamat)}</textarea></label>
 <div class="admgrid"><label>Jam layanan<input name="jam" value="${escH(I.jam)}"></label><label>Instagram (nama akun)<input name="ig" value="${escH(I.ig)}"></label></div>
 <label>Link Linktree (opsional)<input name="linktree" type="url" value="${escH(I.linktree)}"></label>
 <label>Link sematan Google Maps (alamat di dalam src="..." dari Bagikan → Sematkan peta)<input name="peta_embed" value="${escH(I.peta_embed)}"></label>
 <label>Link Google Maps (Bagikan → Salin link)<input name="peta_link" value="${escH(I.peta_link)}"></label>
 <button class="pbtn" type="submit">Simpan info kantor</button><p class="admmsg" id="admMsg"></p></form>`}
function admBmkg(){return `<p class="admnote">Robot mengambil rilisan BMKG pusat tiap 8 jam. Klik "Sembunyikan" untuk rilisan yang tidak ingin ditampilkan.</p><p><button type="button" class="pbtn" id="admAmbil">Ambil rilisan sekarang</button></p><div id="admBmkgList">Memuat…</div><p class="admmsg" id="admMsg"></p>`}
/* v12: minta robot data mencari berita media sekarang juga (permintaan tersendiri), lalu tampilkan hasilnya */
function segarkanBerita(){let el=document.getElementById("admBeritaHasil");if(!el){el=document.createElement("p");el.id="admBeritaHasil";el.className="admnote";el.setAttribute("role","status");const m=document.getElementById("admMsg");if(m)m.after(el);else return}
 el.textContent="Berita media: robot sedang mencari (±30 detik)…";const u=DATA_URL.replace(/\/terkini$/,"")+"/berita-segarkan";
 const coba=n=>fetch(u,{method:"POST",cache:"no-store"}).then(r=>r.json()).then(h=>{if(h.ok){el.textContent=`Berita media: ${h.diperiksa} berita diperiksa, ${h.ditambah} berita baru ditambahkan.`+(h.ditambah?" Tampil di banner dan halaman Berita paling lama 10 menit.":"");beritaDimuat=false}
  else if(!h.galat&&n<1&&/Tidak ada permintaan/.test(h.alasan||""))setTimeout(()=>coba(n+1),20000);
  else el.textContent="Berita media: "+(h.galat||h.alasan||"tidak berjalan")+" Robot tetap mencari otomatis setiap hari pukul 09.00 WIT."}).catch(()=>{el.textContent="Berita media: robot data belum terjangkau. Robot tetap mencari otomatis dalam 3 menit."});coba(0)}
function isiAdmBmkg(){const el=document.getElementById("admBmkgList");if(!el)return;
 fetch(KONTEN_URL+"/bmkg-mentah",{cache:"no-store"}).then(r=>r.json()).then(j=>{const s=new Set(j.sembunyi_bmkg||[]);const a=[...(j.besar||[]).map(x=>({...x,_t:"Banner"})),...(j.berita||[]).map(x=>({...x,_t:"Berita"})),...(j.produk||[]).map(x=>({...x,_t:"Publikasi"}))];const lihat=new Set();
  el.innerHTML=`<small>Terakhir diambil: ${j.diambil?new Date(j.diambil).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})+" WIT":"belum pernah"}${j.galat?" · Kendala: "+escH(j.galat):""}</small><div class="admlist">${a.filter(x=>!lihat.has(x._t+x.id)&&lihat.add(x._t+x.id)).map(x=>`<div class="admrow${s.has(x.id)?" redup":""}"><div><span class="pill">${x._t}</span> <a href="${escH(x.url)}" target="_blank" rel="noopener">${escH(x.judul)}</a><br><small>${tglPendek(x.tanggal)}</small></div><div><button type="button" class="mini" data-sembunyi="${x.id}">${s.has(x.id)?"Tampilkan":"Sembunyikan"}</button></div></div>`).join("")||"<p>Belum ada rilisan.</p>"}</div>`}).catch(()=>{el.textContent="Gagal memuat daftar."})}
function isiAdmRiwayat(){const el=document.getElementById("admBody");
 admFetch("/admin/riwayat").then(j=>{el.innerHTML=`<p class="admnote">Setiap perubahan menyimpan salinan isi sebelumnya (20 terakhir). "Kembalikan" memulihkan isi web ke kondisi sebelum perubahan itu.</p><div class="admlist">${(j.riwayat||[]).map(x=>`<div class="admrow"><div><b>${escH(x.aksi)}</b><br><small>${new Date(x.waktu).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})} WIT</small></div><div><button type="button" class="mini" data-kembali="${x.i}">Kembalikan ke sebelum ini</button></div></div>`).join("")||"<p>Belum ada riwayat.</p>"}</div><p class="admmsg" id="admMsg"></p>`}).catch(e=>{el.innerHTML=`<p class="admmsg err">${escH(e.message)}</p>`})}
/* ---------- tab admin "Info Wilayah" ---------- */
function admWilayah(){const w=WIL_ADM(),N=w.normal||{},D=w.distrik||{},C=w.catatan||{};
 return `<form id="admWil"><p class="admnote">Atur informasi per kabupaten/kota untuk halaman <b>Info Wilayah Saya</b>. <b>Normal hujan bulanan</b> (rata-rata 1991–2020, dalam mm) dipakai untuk menjelaskan arti Bawah Normal, Normal, dan Atas Normal kepada masyarakat. Angka bawaan sudah terisi otomatis dari data grid kantor (DATA BARU); isi kolom di bawah hanya bila ingin menggantinya dengan angka lain. Angka abu-abu di tiap kolom adalah angka bawaan.</p>
 ${KAB_SEMUA.map(([kab,pr])=>{const sl=slugK(kab),n=N[sl]||[],ada=n.some(v=>+v>0)||D[sl]||C[sl];return `<details class="admsec"${ada?"":""}><summary>${esc(kab)} <small style="font-weight:600;color:var(--muted)">· ${pr==="pbd"?"Papua Barat Daya":"Papua Barat"}${n.some(v=>+v>0)?" · normal terisi":""}</small></summary><input type="hidden" name="wl_kab" value="${esc(sl)}">
  <p class="admnote" style="margin:8px 0 4px">Normal hujan bulanan (mm)</p><div class="normgrid">${BLN_ID.map((b,i)=>`<label>${b.slice(0,3)}<input name="wl_n_${sl}_${i}" inputmode="decimal" placeholder="${(NORMAL_BAWAAN[Object.keys(NORMAL_BAWAAN).find(x=>samaKab(x,kab))]||[])[i]||""}" value="${+n[i]>0?esc(String(n[i]).replace(".",",")):""}"></label>`).join("")}</div>
  <label>Distrik tambahan (yang belum ada di daftar Zona Musim; pisahkan dengan koma)<textarea name="wl_d_${sl}" rows="2">${esc(D[sl]||"")}</textarea></label>
  <label>Catatan untuk masyarakat (opsional, tampil paling atas)<textarea name="wl_c_${sl}" rows="2">${esc(C[sl]||"")}</textarea></label></details>`}).join("")}
 <p><button class="pbtn" type="submit">Simpan info wilayah</button></p><p class="admmsg" id="admMsg"></p></form>`}
async function simpanWilayah(f){const v=n=>(f.querySelector(`[name="${n}"]`)||{}).value||"",o={normal:{},distrik:{},catatan:{}};
 [...f.querySelectorAll('[name="wl_kab"]')].forEach(x=>{const sl=x.value,a=BLN_ID.map((_,i)=>{const t=v(`wl_n_${sl}_${i}`).replace(",",".").trim(),n=parseFloat(t);return Number.isFinite(n)&&n>0?Math.round(n*10)/10:0});
  if(a.some(n=>n>0))o.normal[sl]=a;const d=v("wl_d_"+sl).trim(),c=v("wl_c_"+sl).trim();if(d)o.distrik[sl]=d;if(c)o.catatan[sl]=c});
 await admJSON("/admin/pengaturan",{kunci:"wilayah",nilai:o});await muatUlangKA();pesan("Info wilayah disimpan. Tampil di web paling lama 1 menit.")}
/* ---------- tab admin "Peralatan" ---------- */
function admAlat(){terapkanPengaturan();const al=((KA&&KA.pengaturan)||{}).alat||null,L=(ASLI&&ASLI.alat)||ALAT;
 const sumberAwal=a=>al&&al[a.id]?(al[a.id].sumber||a.id):((ASLI&&ASLI.tukar)||{})[a.id]||a.id,lokAwal=a=>al&&al[a.id]?(al[a.id].lokasi||""):((ASLI&&ASLI.lok)||{})[a.id]||"";
 return `<form id="admAlat"><p class="admnote">Ubah nama, wilayah, dan status alat yang tampil di halaman <b>Peralatan</b>. ID alat tidak bisa diubah karena dipakai robot data. Menambah alat baru perlu pengaturan robot data (topik MQTT), jadi hubungi pengelola.</p>
 ${L.map(a=>{const o=(al&&al[a.id])||{},cur={...a,...o};return `<fieldset class="kdrow"><legend>${esc(a.jenis)} · ID ${esc(a.id)}</legend><input type="hidden" name="al_id" value="${esc(a.id)}">
  <div class="admgrid"><label>Nama tampil<input name="al_nama_${esc(a.id)}" value="${esc(cur.nama||a.nama)}"></label><label>Kabupaten/kota<select name="al_wil_${esc(a.id)}"><option value="">(belum diisi)</option>${KAB_SEMUA.map(([k])=>`<option${samaKab(k,cur.wil||"")?" selected":""}>${esc(k)}</option>`).join("")}</select></label></div>
  <div class="admgrid"><label>Logger<input name="al_logger_${esc(a.id)}" value="${esc(cur.logger||"")}"></label><label>Data diambil dari ID logger<select name="al_sumber_${esc(a.id)}">${L.filter(x=>x.jenis===a.jenis).map(x=>`<option value="${esc(x.id)}"${x.id===sumberAwal(a)?" selected":""}>${esc(x.id)}${x.id===a.id?" (alat ini sendiri)":" · "+esc(x.nama)}</option>`).join("")}</select></label></div>
  <label>Lokasi fisik logger ${esc(a.id)} (dipakai untuk nama file unduhan bila data ditukar, mis. "Anday, Manokwari")<input name="al_lok_${esc(a.id)}" value="${esc(lokAwal(a))}"></label>
  <div class="admcekrow"><label class="cek"><input type="checkbox" name="al_mqtt_${esc(a.id)}"${(al&&al[a.id]?o.mqtt:a.mqtt)?" checked":""}> Terhubung MQTT</label><label class="cek"><input type="checkbox" name="al_vpn_${esc(a.id)}"${(al&&al[a.id]?o.vpn:a.vpn)?" checked":""}> Terhubung VPN</label><label class="cek"><input type="checkbox" name="al_tampil_${esc(a.id)}"${o.sembunyi?"":" checked"}> Tampilkan di web</label></div></fieldset>`}).join("")}
 <p class="admnote">Bila penamaan di server pusat sudah diperbaiki, ubah "Data diambil dari ID logger" kembali ke "(alat ini sendiri)" untuk kedua alat.</p>
 <p><button class="pbtn" type="submit">Simpan peralatan</button></p><p class="admmsg" id="admMsg"></p></form>`}
function admTampilan(){const t=TAMPIL(),bg=t.bagian||[],kt=t.kartu||[];
 return `<form id="admTampilan"><p class="admnote">Centang bagian yang ingin <b>disembunyikan</b> dari web. Isinya tidak dihapus, jadi bisa ditampilkan lagi kapan saja dengan menghapus centang.</p>
 <fieldset class="kdrow"><legend>Bagian di Beranda</legend><div class="admcekrow" style="flex-direction:column;align-items:flex-start">${BAGIAN_BERANDA.map(([k,n])=>`<label class="cek"><input type="checkbox" name="tb_${k}"${bg.includes(k)?" checked":""}> ${esc(n)}</label>`).join("")}</div></fieldset>
 <fieldset class="kdrow"><legend>Kartu Kondisi Iklim (beranda &amp; halaman Iklim)</legend><div class="admcekrow" style="flex-direction:column;align-items:flex-start">${Object.entries(KARTU_NAMA).map(([k,n])=>`<label class="cek"><input type="checkbox" name="tk_${k}"${kt.includes(k)?" checked":""}> ${esc(n)}</label>`).join("")}</div>
 <p class="admnote" style="margin:8px 0 0">Isi kartu dari buletin diubah di tab <b>Kondisi Iklim</b>. Kartu dari BMKG Pusat (IOD, peringatan dini, prediksi 10 harian, gelombang atmosfer) terisi otomatis dan hanya bisa disembunyikan.</p></fieldset>
 <fieldset class="kdrow"><legend>Yang bisa ditambah atau diubah di tab lain</legend><ul class="admnote" style="margin:0 0 0 18px;padding:0">
  <li><b>Terbitkan</b>: buletin, prediksi musim, peringatan (surat), informasi iklim, berita kegiatan, lainnya. Hapus atau sembunyikan di <b>Daftar Terbitan</b>.</li>
  <li><b>Peringatan Dini</b>: status Waspada/Siaga/Awas per wilayah, masa berlaku, dan catatan kartu peringatan.</li><li><b>Banner &amp; Pintasan</b>: slide banner tetap (judul, isi, gambar, tanggal berakhir), tombol pintasan beranda, dan daftar liputan media.</li><li><b>Teks Halaman</b>: isi Permintaan Pelayanan Data (jenis data, tarif, alur, kalender), keterangan kantor di bagian bawah web, halaman Kebijakan Privasi, dan semua kotak penjelasan "Cara membaca…" di halaman Iklim.</li><li><b>Tampilan Web</b>: sembunyikan bagian beranda atau kartu, serta tautan Survei Kepuasan (SKM) bulanan.</li>
  <li><b>Kondisi Iklim</b> &amp; <b>Isi Halaman Iklim</b>: kartu, tabel kabupaten, ringkasan, peta, dan pilihan rilisan BMKG Pusat.</li>
  <li><b>Info Kantor</b>, <b>Profil</b>, <b>Info Wilayah</b>, <b>Peralatan</b>, <b>BMKG Pusat</b>: kontak, tim, catatan per kabupaten, alat, dan rilisan Pusat yang disembunyikan.</li>
  <li><b>Privasi Tampilan</b>: unduhan dokumen/CSV dan sensor yang tidak ditampilkan.</li></ul></fieldset>
 <p><button class="pbtn" type="submit">Simpan tampilan web</button></p><p class="admmsg" id="admMsg"></p></form>`}
async function simpanTampilan(f){const c=n=>!!(f.querySelector(`[name="${n}"]`)||{}).checked;
 const o={bagian:BAGIAN_BERANDA.map(x=>x[0]).filter(k=>c("tb_"+k)),kartu:Object.keys(KARTU_NAMA).filter(k=>c("tk_"+k))};
 await admJSON("/admin/pengaturan",{kunci:"tampilan",nilai:o});await muatUlangKA();pesan("Tampilan web disimpan. Tampil di web paling lama 1 menit.")}
function admPrivasi(){const pv=PRIV(),s=pv.sensor||[];
 return `<form id="admPrivasi"><p class="admnote">Atur apa saja yang <b>tidak</b> ditampilkan ke publik. Yang dicentang disembunyikan dari web <b>dan</b> diblokir di robot, jadi tidak bisa diambil lewat alamat robot. Data tetap tersimpan dan bisa ditampilkan lagi kapan saja dengan menghapus centangnya.</p>
 <fieldset class="kdrow"><legend>Unduhan</legend><div class="admcekrow" style="flex-direction:column;align-items:flex-start">
  <label class="cek"><input type="checkbox" name="pv_dok"${pv.sembunyi_dok?" checked":""}> Sembunyikan unduhan dokumen (buletin, prediksi musim, lampiran berita)</label>
  <label class="cek"><input type="checkbox" name="pv_csv"${pv.sembunyi_csv?" checked":""}> Sembunyikan tombol "Unduh CSV" rekap harian alat</label></div>
  <p class="admnote" style="margin:8px 0 0">Bila unduhan dokumen disembunyikan, judul, sampul, dan ringkasan terbitan tetap tampil di Publikasi, tetapi file PDF/PowerPoint/Word tidak bisa dibuka publik. Petugas yang sudah masuk Admin tetap bisa membukanya.</p></fieldset>
 <fieldset class="kdrow"><legend>Jenis sensor yang disembunyikan (berlaku untuk semua AWS/ARG)</legend><div class="admcekrow" style="flex-direction:column;align-items:flex-start">
  ${Object.entries(SENSOR_NAMA).map(([k,n])=>`<label class="cek"><input type="checkbox" name="pv_s_${k}"${s.includes(k)?" checked":""}> ${esc(n)}</label>`).join("")}</div>
  <p class="admnote" style="margin:8px 0 0">Sensor yang disembunyikan hilang dari beranda, halaman Peralatan, detail alat (angka, grafik, rekap harian), halaman kabupaten, dan file CSV. Untuk menyembunyikan <b>satu alat</b> seluruhnya, pakai tab <b>Peralatan</b> &gt; hapus centang "Tampilkan di web".</p></fieldset>
 <fieldset class="kdrow"><legend>Sensor yang disembunyikan per alat</legend><p class="admnote" style="margin:0 0 8px">Centang sensor yang <b>hanya di alat itu</b> tidak ingin ditampilkan, misalnya sensor yang sedang rusak. Sensor yang sudah disembunyikan untuk semua alat di atas tidak perlu dicentang lagi.</p>
  ${ALAT.map(a=>{const ada=((pv.alat||{})[a.id])||[],grup=a.jenis==="AWS"?Object.keys(SENSOR_NAMA):["hujan","baterai"];return `<details class="admsec"${ada.length?" open":""}><summary>${esc(a.nama)} <small>(${esc(a.jenis)} · ID ${esc(a.id)})</small>${ada.length?` · <b>${ada.length} disembunyikan</b>`:""}</summary><div class="admcekrow" style="flex-wrap:wrap;gap:6px 16px">${grup.map(k=>`<label class="cek"><input type="checkbox" name="pa_${esc(a.id)}_${k}"${ada.includes(k)?" checked":""}> ${esc(SENSOR_NAMA[k].replace(/ \(.*\)$/,""))}</label>`).join("")}</div></details>`}).join("")}</fieldset>
 <p><button class="pbtn" type="submit">Simpan privasi tampilan</button></p><p class="admmsg" id="admMsg"></p></form>`}
/* robot data menyimpan data menurut ID logger; bila data dua alat ditukar (tab Peralatan), sensor yang disembunyikan ikut ke logger aslinya */
const alatLogger=al=>{const o={};Object.entries(al||{}).forEach(([id,g])=>{const s=sumberId(id);o[s]=[...new Set([...(o[s]||[]),...g])]});return o};
/* Ambil rilisan BMKG Pusat langsung dari browser petugas: server BMKG sering membatasi (HTTP 429) permintaan dari jaringan Cloudflare,
   tetapi tidak dari browser biasa. Bila gagal, robot di server yang mencoba (dengan jeda & ulang). */
async function ambilLewatBrowser(){const d="https://content.bmkg.go.id/wp-json/wp/v2/posts?_fields=id,date,slug,title,categories,excerpt,jetpack_featured_media_url&per_page=40",
 u=[d+"&categories=2,59,233,60,208,825,8,725",d+"&search="+encodeURIComponent("Papua Barat"),d.replace("per_page=40","per_page=60")+"&categories=59,233,60,208,825,8,725,899,1638,1639",d.replace("per_page=40","per_page=30")+"&categories=1"],out=[];
 for(const x of u){try{const r=await fetch(x,{cache:"no-store"});if(!r.ok)return null;const j=await r.json();if(!Array.isArray(j))return null;out.push(...j)}catch(e){return null}}
 return out.length?out:null}
async function simpanPrivasi(f){const c=n=>!!(f.querySelector(`[name="${n}"]`)||{}).checked;
 const o={sembunyi_dok:c("pv_dok"),sembunyi_csv:c("pv_csv"),sensor:Object.keys(SENSOR_NAMA).filter(k=>c("pv_s_"+k)),alat:{}};
 ALAT.forEach(a=>{const g=Object.keys(SENSOR_NAMA).filter(k=>c("pa_"+a.id+"_"+k)&&!o.sensor.includes(k));if(g.length)o.alat[a.id]=g});o.alat_logger=alatLogger(o.alat);
 if(o.sensor.length===Object.keys(SENSOR_NAMA).length&&!confirm("Semua jenis sensor akan disembunyikan, sehingga data AWS/ARG tidak tampil sama sekali. Lanjutkan?"))return;
 await admJSON("/admin/pengaturan",{kunci:"privasi",nilai:o});await muatUlangKA();pesan("Privasi tampilan disimpan. Tampil di web paling lama 1 menit (rekap harian paling lama 10 menit).")}
async function simpanAlat(f){const v=n=>(f.querySelector(`[name="${n}"]`)||{}).value||"",c=n=>!!(f.querySelector(`[name="${n}"]`)||{}).checked,o={};
 [...f.querySelectorAll('[name="al_id"]')].forEach(x=>{const id=x.value;o[id]={nama:v("al_nama_"+id).trim(),wil:v("al_wil_"+id),logger:v("al_logger_"+id).trim(),sumber:v("al_sumber_"+id)||id,lokasi:v("al_lok_"+id).trim(),mqtt:c("al_mqtt_"+id),vpn:c("al_vpn_"+id),sembunyi:!c("al_tampil_"+id)}});
 const pakai={};Object.entries(o).forEach(([id,x])=>{if(x.sumber!==id)pakai[x.sumber]=(pakai[x.sumber]||0)+1});const dobel=Object.entries(pakai).filter(([,n])=>n>1).map(([k])=>k);
 if(dobel.length)throw new Error("Data logger "+dobel.join(", ")+" dipakai oleh lebih dari satu alat. Periksa pilihan \"Data diambil dari ID logger\".");
 await admJSON("/admin/pengaturan",{kunci:"alat",nilai:o});await muatUlangKA();
 const pv=PRIV();if(pv.alat&&Object.keys(pv.alat).length){const al=alatLogger(pv.alat);if(JSON.stringify(al)!==JSON.stringify(pv.alat_logger||{}))await admJSON("/admin/pengaturan",{kunci:"privasi",nilai:{...pv,alat_logger:al}})}
 pesan("Peralatan disimpan. Tampil di web paling lama 1 menit.")}
/* ---------- tab admin "Cadangan & Penyimpanan" ---------- */
function simpanFileJSON(obj,nama){const u=URL.createObjectURL(new Blob([JSON.stringify(obj,null,1)],{type:"application/json"})),l=document.createElement("a");l.href=u;l.download=nama;document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function isiAdmCad(){const el=document.getElementById("admCad");if(!el)return;
 admFetch("/admin/kapasitas").then(j=>{const bar=(isi,batas,lab)=>{const p=Math.min(100,isi/batas*100),w=p>=80?"bad":p>=60?"warn":"ok";return `<div class="kap"><div class="kapj"><b>${lab}</b><span>${esc(ukT(isi))} dari ${esc(ukT(batas))} (${p<1&&isi>0?"<1":Math.round(p)}%)</span></div><div class="kapbar"><i class="${w}" style="width:${Math.max(p,isi>0?1:0)}%"></i></div></div>`};
  el.innerHTML=`<section class="admsec2"><h3>Penyimpanan file</h3>
  ${j.r2?bar(j.r2isi.total,j.batas_r2,"Penyimpanan R2 (file baru) · "+j.r2isi.jml+" file"):""}
  ${bar(j.kv.total,j.batas_kv,(j.r2?"Penyimpanan KV (file lama) · ":"Penyimpanan KV · ")+j.kv.jml+" file")}
  ${j.r2?`<p class="admnote">File baru disimpan di R2 (gratis sampai 10 GB). File lama tetap bisa dibuka.</p>`:`<div class="admcek"><b>R2 belum dipasang.</b> File masih disimpan di KV yang batasnya 1 GB (dipakai bersama data alat). Satu buletin ±30 MB, jadi KV bisa penuh dalam ±2 tahun. Pasang R2 (lihat Panduan) agar kapasitas menjadi 10 GB.</div>`}
  <p class="admnote">File yang tidak dipakai lagi (terbitan yang sudah dihapus dan tidak ada di 20 riwayat terakhir, berumur lebih dari 2 hari): <b>${j.tak_terpakai}</b>.</p>
  <p><button type="button" class="mini" id="cadBersih"${j.tak_terpakai?"":" disabled"}>Hapus file yang tidak terpakai</button></p></section>
  <section class="admsec2"><h3>Cadangan isi web</h3>
  <p class="admnote">Cadangan berisi semua teks, daftar terbitan, kartu Kondisi Iklim, isi halaman Iklim, profil, dan info kantor. File PDF/gambar tidak ikut di dalam file cadangan, tetapi tetap tersimpan di penyimpanan. Cadangan otomatis dibuat setiap minggu dan disimpan 8 minggu terakhir.</p>
  <p><button type="button" class="pbtn" id="cadUnduh">Unduh cadangan sekarang (.json)</button></p>
  <div class="admlist">${(j.cadangan||[]).length?j.cadangan.map(c=>`<div class="admrow"><div><b>Cadangan pekan ${esc(tglPendek(c.tanggal))}</b><br><small>${c.dibuat?new Date(c.dibuat).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})+" WIT · ":""}${esc(c.ukuran)}</small></div><div><button type="button" class="mini" data-cadunduh="${esc(c.tanggal)}">Unduh</button> <button type="button" class="mini" data-cadpulih="${esc(c.tanggal)}">Pulihkan</button></div></div>`).join(""):`<p class="admnote">Belum ada cadangan otomatis. Cadangan pertama dibuat pada jadwal robot berikutnya (paling lama 3 jam).</p>`}</div>
  <label style="margin-top:14px">Pulihkan dari file cadangan (.json) yang pernah diunduh<input type="file" id="cadFile" accept="application/json,.json"></label></section>`}).catch(er=>{el.innerHTML=`<p class="admmsg err">${esc(er.message)}. Pastikan robot admin versi terbaru sudah dipasang.</p>`})}
const ukT=n=>n>=1073741824?(n/1073741824).toFixed(2).replace(".",",")+" GB":n>=1048576?(n/1048576).toFixed(1).replace(".",",")+" MB":Math.round(n/1024)+" KB";
document.addEventListener("click",e=>{const t=e.target;if(!t.closest||!t.closest("#admCad"))return;
 if(t.id==="cadUnduh"||t.dataset.cadunduh){t.disabled=true;t.classList.add("memuat");admJSON("/admin/cadangan",t.dataset.cadunduh?{tanggal:t.dataset.cadunduh}:{}).then(j=>{simpanFileJSON(j,"cadangan-staklim-pabar-"+(t.dataset.cadunduh||new Date(Date.now()+9*3600e3).toISOString().slice(0,10))+".json");pesan("Cadangan diunduh. Simpan file ini di tempat aman (mis. Google Drive kantor).")}).catch(er=>pesan(er.message,1)).finally(()=>{t.disabled=false;t.classList.remove("memuat")})}
 else if(t.dataset.cadpulih){if(!confirm("Pulihkan isi web ke cadangan pekan "+t.dataset.cadpulih+"?\n\nSemua perubahan setelah tanggal itu akan diganti. Isi saat ini tetap tersimpan di Riwayat, jadi masih bisa dikembalikan."))return;admJSON("/admin/pulihkan",{tanggal:t.dataset.cadpulih}).then(muatUlangKA).then(()=>{isiAdmCad();setTimeout(()=>pesan("Isi web dipulihkan dari cadangan pekan "+t.dataset.cadpulih+"."),300)}).catch(er=>pesan(er.message,1))}
 else if(t.id==="cadBersih"){if(!confirm("Hapus permanen file yang tidak dipakai lagi?\n\nFile ini milik terbitan yang sudah dihapus dan tidak bisa dikembalikan lewat Riwayat."))return;t.disabled=true;t.classList.add("memuat");admJSON("/admin/bersihkan",{}).then(j=>{isiAdmCad();setTimeout(()=>pesan(j.dihapus+" file dihapus."),300)}).catch(er=>{pesan(er.message,1);t.disabled=false;t.classList.remove("memuat")})}});
document.addEventListener("change",e=>{const t=e.target;if(!t||t.id!=="cadFile"||!t.files[0])return;const f=t.files[0];
 f.text().then(x=>{let j;try{j=JSON.parse(x)}catch(er){throw new Error("File bukan cadangan yang valid.")}const c=j&&j.jenis==="cadangan-staklim-pabar"?j.konten:null;if(!c||!Array.isArray(c.publikasi))throw new Error("File bukan cadangan web ini.");
  if(!confirm("Pulihkan isi web dari file \""+f.name+"\" (dibuat "+String(j.dibuat||"").slice(0,10)+")?\n\nIsi saat ini tetap tersimpan di Riwayat."))return null;return admJSON("/admin/pulihkan",{konten:c,nama:f.name})})
 .then(r=>{if(r){return muatUlangKA().then(()=>{isiAdmCad();setTimeout(()=>pesan("Isi web dipulihkan dari file cadangan."),300)})}}).catch(er=>pesan(er.message,1)).finally(()=>{t.value=""})});
let ASLI=null,LAST_MENTAH=null;
/* edisi buletin dari judul, mis. "Buletin Iklim Mei 2026" -> 2026*12+4 */
const edisiKey=t=>{const m=String(t||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);return m?(+m[2])*12+BULAN_ID.indexOf(m[1]):0};
const tglEdisi=p=>{const k=edisiKey(p.judul);if(!k||!/buletin/i.test((p.jenis||"")+" "+(p.judul||"")))return "";return Math.floor(k/12)+"-"+String(k%12+1).padStart(2,"0")+"-15"};
/* jumlah buletin iklim di web dan judul edisi paling baru (menurut bulan edisi, bukan tanggal unggah) */
function infoBuletin(){const L=((KA&&KA.publikasi)||[]).filter(p=>p.jenis!=="Berita Kegiatan"&&(p.file||p.link)&&/buletin\s*iklim/i.test((p.jenis||"")+" "+(p.judul||"")));
 let top=0;L.forEach(p=>{const k=edisiKey(p.judul);if(k>top)top=k});
 if(!KA)return {n:"–",judul:"Memuat…"};
 return {n:L.length,judul:top?"Buletin Iklim "+BLN_ID[top%12]+" "+Math.floor(top/12):"Belum ada edisi"}}
function urutkanPublikasi(){const a=KA&&KA.publikasi;if(!Array.isArray(a))return;a.forEach(p=>{const te=tglEdisi(p);p._urut=te&&Date.parse(p.tanggal)-Date.parse(te)>45*864e5?te:p.tanggal});
 a.sort((x,y)=>String(y._urut||"").localeCompare(String(x._urut||""))||String(y.dibuat||"").localeCompare(String(x.dibuat||"")))}
const slugP=t=>String(t||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,40);
/* Merapikan otomatis kalimat ringkasan yang terbaca dari buletin: judul tabel/gambar yang ikut terbawa, potongan isi tabel,
   dan rujukan "(Gambar 1.4)" / "dapat dilihat pada Tabel 2.2" dibuang; kalimat aslinya tidak diubah. */
function rapikanKalimat(t){t=String(t==null?"":t).replace(/\s+/g," ").trim();if(!t)return t;
 const JDL=/(?:Tabel|Gambar)\s*\d+(?:\.\d+)?\.?\s+(?:Distribusi|Prakiraan|Prediksi|Analisis|Peta|Sifat|Curah|Monitoring|Indeks|Deret|Hari)\b[^.]*?wilayah\s+Papua\s+Barat(?:\s+Daya)?(?=\s|$)/gi;
 const out=t.split(/(?<=[.!?])\s+(?=[A-Za-z(])/).map(k=>{let m,akhir=-1;JDL.lastIndex=0;while((m=JDL.exec(k)))akhir=m.index+m[0].length;if(akhir>=0)k=k.slice(akhir);
   k=k.replace(/\s*\((?:lihat\s+)?(?:Tabel|Gambar)\s*\d+(?:\.\d+)?[^)]*\)/gi,"").replace(/,?\s*(?:deskripsi|rincian)\s+wilayah[^.]*?dapat\s+dilihat\s+pada\s+(?:Tabel|Gambar)\s*\d+(?:\.\d+)?/gi,"").replace(/,?\s*(?:seperti\s+)?(?:yang\s+)?(?:dapat\s+)?(?:di)?lihat\s+pada\s+(?:Tabel|Gambar)\s*\d+(?:\.\d+)?/gi,"").replace(/\s+([.,;])/g,"$1").trim();
   if(!k||/^[.,;]*$/.test(k)||/^(?:Tabel|Gambar)\s*\d/i.test(k)||k.split(" ").length<2)return "";
   return k.charAt(0).toUpperCase()+k.slice(1)}).filter(Boolean);
 return out.join(" ")}
/* Nama dokumen sumber: pakai judul publikasi yang sekarang (bila judulnya sudah diperbaiki di Admin), dan buang nomor urut/ekstensi nama file */
function judulSumber(t){t=String(t||"").trim();if(!t)return "";const norm=x=>String(x||"").toLowerCase().replace(/\.(pdf|pptx|docx)$/i,"").replace(/^\s*\d{1,3}\s*[.)_-]\s*/,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim();
 const n=norm(t),pub=((typeof KA!=="undefined"&&KA&&KA.publikasi)||[]);const bl=(n.match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+\d{4}/)||[])[0];
 const cocok=pub.find(p=>norm(p.judul)===n||norm(p.nama_file)===n)||(bl&&/buletin/.test(n)?pub.find(p=>/buletin/i.test(p.jenis+" "+p.judul)&&norm(p.judul).includes(bl)):null);
 if(cocok&&cocok.judul)return cocok.judul;const b=t.replace(/\.(pdf|pptx|docx)$/i,"").replace(/^\s*\d{1,3}\s*[.)_-]\s*/,"").replace(/_+/g," ").trim();return b.charAt(0).toUpperCase()+b.slice(1)}
function rapikanDalam(o,dlm){if(!o||typeof o!=="object"||dlm>4)return;Object.keys(o).forEach(k=>{const v=o[k];if(typeof v==="string"){if(v.length>40&&/(?:Tabel|Gambar)\s*\d/.test(v)){const b=rapikanKalimat(v);if(b)o[k]=b}}else rapikanDalam(v,dlm+1)})}
function rapikanIK(x){if(!x||typeof x!=="object")return x;const r=(o,k)=>{if(o&&typeof o[k]==="string"&&o[k]){const b=rapikanKalimat(o[k]);if(b&&b!==o[k])o[k]=b}};
 r(x.analisis,"teks_pb");r(x.analisis,"teks_pbd");((x.prakiraan&&x.prakiraan.bulan)||[]).forEach(m=>r(m,"teks"));r(x.ekstrem,"teks");r(x.spi,"teks");r(x.hth,"teks");return x}

function terapkanPengaturan(){try{rapikanIK(KA&&KA.isi_iklim);rapikanDalam(KA&&KA.kondisi,0)}catch(e){}urutkanPublikasi();if(typeof PUBLIKASI==="undefined")return;
 if(!ASLI)ASLI={alat:ALAT.map(a=>({...a})),tukar:{...TUKAR_DATA},lok:{...LOKASI_ASLI},pub:PUBLIKASI.map(p=>({...p}))};
 const pg=(KA&&KA.pengaturan)||{},sp=pg.sembunyi_pub||{};
 PUBLIKASI.length=0;ASLI.pub.forEach(p=>{const o=sp[slugP(p.judul)]||{};if(o.sembunyi)return;const b={...p};["judul","tanggal","ringkas"].forEach(f=>{if(o[f])b[f]=escH(String(o[f]))});PUBLIKASI.push(b)});
 const al=pg.alat&&typeof pg.alat==="object"?pg.alat:null;ALAT.length=0;Object.keys(TUKAR_DATA).forEach(k=>delete TUKAR_DATA[k]);Object.keys(LOKASI_ASLI).forEach(k=>delete LOKASI_ASLI[k]);
 ASLI.alat.forEach(a=>{const o=(al&&al[a.id])||{};if(o.sembunyi)return;const b={...a};["nama","wil","logger"].forEach(f=>{if(o[f])b[f]=String(o[f]).replace(/[<>"&]/g,"")});if(al&&al[a.id]){b.mqtt=o.mqtt?1:0;b.vpn=o.vpn?1:0}ALAT.push(b)});
 if(al){ASLI.alat.forEach(a=>{const o=al[a.id]||{};if(o.sumber&&o.sumber!==a.id)TUKAR_DATA[a.id]=String(o.sumber);if(o.lokasi)LOKASI_ASLI[a.id]=String(o.lokasi)})}else{Object.assign(TUKAR_DATA,ASLI.tukar);Object.assign(LOKASI_ASLI,ASLI.lok)}
 if(LAST_MENTAH)LAST=tukarData(LAST_MENTAH)}
function muatUlangKA(){return fetch(KONTEN_URL+"/konten?t="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(j=>{KA=j;terapkanPengaturan();isiFooter()}).catch(()=>{})}
function pesan(t,err){const m=document.getElementById("admMsg");if(m){m.textContent=t;m.className="admmsg"+(err?" err":" ok")}
 let ts=document.getElementById("admToast");if(!ts){ts=document.createElement("div");ts.id="admToast";ts.setAttribute("role","status");ts.setAttribute("aria-live","polite");document.body.appendChild(ts)}
 clearTimeout(pesan._t);if(!t){ts.className="";return}const jalan=/…|\.\.\.|sedang|menyimpan|membaca|memuat|mengunggah/i.test(t)&&!err;ts.innerHTML=(jalan?'<i class="tsputar" aria-hidden="true"></i>':err?"⚠️ ":"✅ ")+escH(t)+'<button type="button" aria-label="Tutup" data-klik="tutup-induk">✕</button>';ts.className="tampil"+(err?" err":jalan?" jalan":" ok");
 if(!jalan)pesan._t=setTimeout(()=>{ts.className=""},err?12000:6000)}
function admTampil(tab,data){ADM_TAB=tab;document.querySelectorAll("[data-adm]").forEach(b=>b.classList.toggle("on",b.dataset.adm===tab));const el=document.getElementById("admBody");if(!el)return;isiAdmHal(tab);
 if(tab==="terbit")el.innerHTML=admTerbitForm(data);else if(tab==="daftar")el.innerHTML=admDaftar();else if(tab==="peringatan")el.innerHTML=admPeringatan();else if(tab==="kondisi")el.innerHTML=admKondisi();else if(tab==="iklim")el.innerHTML=admIklim();else if(/^ik-/.test(tab)){el.innerHTML=admIklim();saringIklim(el,tab)}else if(tab==="notif"){el.innerHTML=admNotif();pasangAdmPD();PD_ADM.notifDimuat=1;pdNotifMuat()}else if(tab==="panduan")el.innerHTML=admPanduan();else if(tab==="wilayah")el.innerHTML=admWilayah();else if(tab==="alat")el.innerHTML=admAlat();else if(tab==="privasi")el.innerHTML=admPrivasi();else if(tab==="tampilan")el.innerHTML=admTampilan();else if(tab==="skm")el.innerHTML=admSkm()+'<p class="admmsg" id="admMsg"></p>';else if(tab==="wbs"){el.innerHTML=admWbs();isiAdmWbs()}else if(tab==="masukan"||tab==="pengaduan"){el.innerHTML=admMasukan();muatMasukan()}else if(tab==="permohonan"){el.innerHTML=admPermohonan();pasangAdmPD();if(ADM_PD)pdAdmGambar();muatPD().then(()=>{if(ADM_TAB==="permohonan")pdAdmGambar()})}else if(tab==="periksa")el.innerHTML=admPeriksa();else if(tab==="isiberanda")el.innerHTML=admBerandaIsi();else if(tab==="tekshal")el.innerHTML=admTeksHal();else if(tab==="cadangan"){el.innerHTML='<div id="admCad">Memuat…</div><p class="admmsg" id="admMsg"></p>';isiAdmCad()}else if(tab==="info")el.innerHTML=admInfo();else if(tab==="profil")el.innerHTML=admProfil();else if(tab==="bmkg"){el.innerHTML=admBmkg();isiAdmBmkg()}else if(tab==="riwayat"){el.innerHTML="Memuat…";isiAdmRiwayat()}else if(tab==="poshujan"){el.innerHTML=admPosHujan();isiAdmPosHujan()}else if(tab==="dasarian"){el.innerHTML=admDasarian();isiAdmDas()}else if(tab==="pmhupdate"){el.innerHTML=admPMHUpd();isiAdmPMHUpd()}else if(tab==="ringkasan"){el.innerHTML=admRingkasan();isiAdmRingkasan()}
 pasangBantuTeks(el);sorotFokus();
 const f=document.getElementById("admTerbit");if(f){const cekJenis=()=>f.querySelector(".isiBerita").hidden=f.jenis.value!=="Berita Kegiatan";f.jenis.onchange=cekJenis;cekJenis()}}
function pasangAdmin(){const lg=document.getElementById("admLogin");
 if(lg){lg.onsubmit=e=>{e.preventDefault();ADM_PASS=document.getElementById("admPw").value;pesan("Memeriksa…");admFetch("/admin/cek").then(j=>{/* simpan token sesi (12 jam), bukan password */if(j&&j.token)ADM_PASS=j.token;try{sessionStorage.setItem("admPass",ADM_PASS)}catch(e){}muatUlangKA().then(render)}).catch(er=>{ADM_PASS="";pesan(er.message,1)})};return}
 if(!document.getElementById("admBody"))return;
 muatUlangKA().then(()=>admTampil(ADM_TAB));muatMasukan();muatPD();
 app.onclick=e=>{const t=e.target;
  if(t.dataset.adm){admTampil(t.dataset.adm);return}
  if(t.id==="pgTambah"){const tp=document.getElementById("pgTpl");document.getElementById("pgList").insertAdjacentHTML("beforeend",tp.innerHTML);return}
  if(t.dataset.hapusbaris!==undefined){t.closest(".pgrow,.perrow,.lrow").remove();return}
  {const fb=t.closest("[data-fmt]");if(fb){fmtAksi(fb);return}}
  if(t.id==="admUnduhPanduan"){unduhPanduan();return}
  if(t.id==="admPeriksaMulai"){t.disabled=true;const st=document.getElementById("admPeriksaStatus");periksaWeb(m=>{if(st)st.textContent=m}).then(r=>{ADM_PERIKSA=r;if(ADM_TAB==="periksa")document.getElementById("admBody").innerHTML=admPeriksa()}).catch(er=>{t.disabled=false;if(st)st.textContent="Gagal memeriksa: "+er.message});return}
  if(t.dataset.perbaiki){const ke=t.dataset.perbaiki,i=ke.indexOf("|");ADM_FOKUS=i<0?"":ke.slice(i+1);admTampil(i<0?ke:ke.slice(0,i));return}
  if(t.dataset.msksaring){ADM_MSK_SARING=t.dataset.msksaring;document.getElementById("admBody").innerHTML=admMasukan();return}
  if(t.dataset.mskaksi){aksiMasukan(t);return}
  if(t.dataset.tambahke){const d=document.getElementById(t.dataset.tambahke),tp=document.getElementById(t.dataset.tambahke+"Tpl");if(d&&tp)d.insertAdjacentHTML("beforeend",tp.innerHTML);return}
  if(t.dataset.naik!==undefined||t.dataset.turun!==undefined){const r=t.closest(".lrow");if(!r)return;if(t.dataset.naik!==undefined&&r.previousElementSibling)r.parentNode.insertBefore(r,r.previousElementSibling);else if(t.dataset.turun!==undefined&&r.nextElementSibling)r.parentNode.insertBefore(r.nextElementSibling,r);return}
  if(t.id==="perTambah"){document.getElementById("perList").insertAdjacentHTML("beforeend",document.getElementById("perTpl").innerHTML);return}
  if(t.id==="admKeluar"){ADM_PASS="";try{sessionStorage.removeItem("admPass")}catch(er){}render();return}
  if(t.dataset.ubah){admTampil("terbit",((KA&&KA.publikasi)||[]).find(x=>x.id===t.dataset.ubah));return}
  if(t.dataset.hapus){const p=((KA&&KA.publikasi)||[]).find(x=>x.id===t.dataset.hapus);if(!p||!confirm("Hapus \""+p.judul+"\"? Bisa dikembalikan lewat tab Riwayat."))return;
   const darinya=IK().sumber===p.judul||(kondisiData().otomatis||"")===p.judul;
   (async()=>{try{await admJSON("/admin/hapus",{id:p.id});let pulih=false;
    if(darinya&&confirm("Isi halaman Iklim dan kartu Kondisi Iklim saat ini berasal dari \""+p.judul+"\".\n\nKembalikan juga ke isi sebelum dokumen ini diunggah?")){
     const r=await admFetch("/admin/riwayat"),cari="Terbitkan "+p.jenis+": "+p.judul,x=(r.riwayat||[]).find(z=>z.aksi===cari);
     if(x){await admJSON("/admin/kembalikan-iklim",{i:x.i});pulih=true}else alert("Catatan sebelum dokumen ini diunggah tidak ditemukan (riwayat hanya menyimpan 20 perubahan terakhir). Isi halaman Iklim tetap seperti sekarang.")}
    await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan("Terbitan dihapus."+(pulih?" Isi halaman Iklim dan kartu Kondisi Iklim dikembalikan ke sebelum dokumen ini diunggah.":"")),50)}catch(er){alert(er.message)}})();return}
  if(t.dataset.sembunyi){t.disabled=true;admJSON("/admin/sembunyi-bmkg",{id:+t.dataset.sembunyi}).then(isiAdmBmkg).catch(er=>pesan(er.message,1));return}
  if(t.dataset.kembali){if(!confirm("Kembalikan isi web ke kondisi sebelum perubahan ini?"))return;admJSON("/admin/kembalikan",{i:+t.dataset.kembali}).then(muatUlangKA).then(()=>{isiAdmRiwayat();setTimeout(()=>pesan("Berhasil dikembalikan."),300)}).catch(er=>pesan(er.message,1));return}
  if(t.id==="admAmbil"){t.disabled=true;pesan("Mengambil rilisan BMKG…");ambilLewatBrowser().then(posts=>admJSON("/admin/ambil-bmkg",{posts})).then(j=>{pesan(j.galat?"Kendala: "+j.galat:"Selesai"+(j.lewat==="browser"?" (diambil lewat browser Anda)":"")+". Kotak pembaruan, angka ENSO/IOD, peta, dan peringatan nasional di tab Iklim ikut diperbarui (paling lama 1 menit).",!!j.galat);segarkanBerita();PUSAT_MUAT=false;setTimeout(()=>muatPusat(1),9000);muatUlangKA();isiAdmBmkg();t.disabled=false}).catch(er=>{pesan(er.message,1);t.disabled=false});return}
  if(t.id==="admAI"){const f=document.getElementById("admTerbit"),fl=f.file.files[0];if(!fl&&!f.judul.value){pesan("Pilih file dokumen dulu.",1);return}if(t.disabled)return;
   if(/buletin/i.test(f.jenis.value+" "+f.judul.value+" "+(fl?fl.name:""))){if(fl&&(!f.judul.value.trim()||f.judul.dataset.auto==="1"))f.judul.value=judulDariFile(fl.name);const r=ringkasLokal(f.judul.value);if(r){f.ringkas.value=r;cekEdisiForm(f);pesan("Judul dan ringkasan terisi dari nama file (tanpa AI). Tabel, peta, dan kartu Kondisi Iklim dibaca saat diterbitkan.");return}}
   if(!fl){pesan("Pilih file dokumen dulu.",1);return}t.disabled=true;t.classList.add("memuat");t.dataset.teks=t.textContent;t.textContent="AI sedang membaca… (±1 menit)";pesan("AI sedang membaca dokumen… mohon tunggu, jangan klik lagi.");
   if(extDok(fl)!=="pdf"||true){bacaDokumen(fl,jenisBaca(f.jenis.value+" "+f.judul.value)).then(tx=>{if(!tx)throw new Error("Isi dokumen tidak terbaca.");return admJSON("/admin/ekstrak",{jenis:f.jenis.value,judul:f.judul.value,teks:tx})}).then(j=>{if(j.galat)throw new Error(j.galat);if(j.judul&&!f.judul.value)f.judul.value=j.judul;if(j.ringkas)f.ringkas.value=j.ringkas;pesan("Terisi"+((j.kartu||[]).length?" · "+j.kartu.length+" kartu Kondisi Iklim akan diperbarui saat diterbitkan":"")+". Periksa kembali sebelum menerbitkan.")}).catch(er=>pesan(er.message,1)).finally(()=>{t.disabled=false;t.classList.remove("memuat");if(t.dataset.teks)t.textContent=t.dataset.teks});return}
   admFetch("/admin/ringkas",{body:fl,headers:{"Content-Type":"application/pdf","X-Nama-File":encodeURIComponent(fl.name)}}).then(j=>{if(j.judul&&!f.judul.value)f.judul.value=j.judul;if(j.ringkas)f.ringkas.value=j.ringkas;pesan("Terisi. Periksa kembali sebelum menerbitkan.")}).catch(er=>pesan(er.message,1)).finally(()=>t.disabled=false);return}};
 app.onsubmit=async e=>{e.preventDefault();const f=e.target,fid=f.getAttribute("id")||"",btn=f.querySelector('button[type="submit"]');if(btn.disabled)return;btn.disabled=true;btn.classList.add("memuat");const ai0=document.getElementById("admAI");if(ai0)ai0.disabled=true;
  try{
   if(fid==="admTerbit"){const d={jenis:f.jenis.value,tanggal:f.tanggal.value,judul:f.judul.value,ringkas:f.ringkas.value,isi:f.isi.value,link:f.link.value,banner:f.banner.checked};
    d.id=f.querySelector('[name="id"]')?f.querySelector('[name="id"]').value:"";
    const pdf=f.file.files[0],ext=extDok(pdf);let img=f.gambar.files[0];
    if(pdf&&!ext)throw new Error("Jenis file belum didukung. Gunakan PDF, PowerPoint (.pptx), atau Word (.docx).");
    if(pdf&&pdf.size>75*1048576)throw new Error("Dokumen lebih dari 75 MB. Kecilkan dulu ukurannya.");
    if(img&&img.size>30*1048576)throw new Error("Gambar terlalu besar (lebih dari 30 MB).");
    if(!img&&pdf){pesan("Membuat sampul dari halaman pertama dokumen…");try{img=ext==="pdf"?(await sampulDariPdf(pdf).catch(()=>null))||await fotoDariPdf(pdf):await fotoDariZip(pdf)}catch(er){img=null}}
    /* baca isi dokumen untuk Kondisi Iklim (otomatis, bisa dikoreksi di tab Kondisi Iklim) */
    const edB=edisiKey(d.judul),edK=edisiKey(IK().sumber||kondisiData().otomatis||""),bul=/buletin/i.test(d.jenis+" "+d.judul),lamaEd=bul&&edB&&edK&&edB<edK;
    if(bul&&!d.ringkas)d.ringkas=ringkasLokal(d.judul);
    let ai=null;if(pdf&&!bul&&(JENIS_OTOMATIS.includes(d.jenis)||/fgd|press|rilis|paparan|prediksi|musim/i.test(d.judul))){pesan("AI membaca isi dokumen…");try{const tx=await bacaDokumen(pdf,jenisBaca(d.jenis+" "+d.judul));if(tx){const j=await admJSON("/admin/ekstrak",{jenis:d.jenis,judul:d.judul,teks:tx});if(!j.galat)ai=j}}catch(er){ai=null}}
    if(ai&&!d.ringkas&&ai.ringkas)d.ringkas=ai.ringkas;
    if(pdf){pesan("Mengunggah dokumen…");const u=await admUnggah(new File([pdf],pdf.name,{type:TIPE_DOK[ext]||pdf.type}));d.file=u.kunci;d.ukuran=u.ukuran;d.nama_file=u.nama}
    if(img){pesan("Mengunggah gambar…");const u=await admUnggah(img);d.gambar=u.kunci}
    pesan("Menyimpan…");await admJSON("/admin/terbit",d);let nk=0;if(ai){try{nk=await simpanKondisiOtomatis(ai,d.judul,d.jenis)}catch(er){nk=0}}
    let hi=null;if(pdf&&!lamaEd&&(JENIS_OTOMATIS.includes(d.jenis)||/fgd|press|rilis|paparan|buletin|prediksi|musim/i.test(d.judul))){try{await muatUlangKA();hi=await isiIklimDariDokumen(pdf,d)}catch(er){hi=null;catatDok(d.jenis+": "+(d.judul||pdf.name||""),"Dokumen tidak bisa dibaca otomatis ("+(er&&er.message||er)+"). Isi halaman Iklim tidak diperbarui dari dokumen ini; periksa formatnya atau isi manual.")}
     if(hi&&((hi.basi||[]).length||(hi.catatan||[]).length))catatDok(d.jenis+": "+(d.judul||pdf.name||""),[(hi.basi||[]).length?"Bagian yang tidak terbaca: "+hi.basi.map(b=>NAMA_BAGIAN[b]||b).join(", ")+".":"",...(hi.catatan||[])])}
    await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan((d.id&&!pdf?"Perubahan disimpan.":"Berhasil diterbitkan.")+" Tampil di web paling lama 1 menit."+(nk?" Kondisi Iklim diperbarui ("+nk+" kartu).":ai?" Ringkasan halaman Iklim diperbarui.":"")+(hi&&(hi.bagian.length||hi.peta)?" Halaman Iklim diisi dari dokumen: "+[hi.bagian.length?hi.bagian.map(b=>NAMA_BAGIAN[b]||b).join(", "):"",hi.peta?hi.peta+" peta":""].filter(Boolean).join(" dan ")+(hi.kartu?"; "+hi.kartu+" kartu Kondisi Iklim dihitung dari tabel":"")+". Periksa di tab Isi Halaman Iklim.":"")+(hi&&hi.basi&&hi.basi.length?" Tidak terbaca dari dokumen ini: "+hi.basi.map(b=>NAMA_BAGIAN[b]||b).join(", ")+" (kartunya di Beranda disembunyikan; isi lama tetap tampil dengan sumber aslinya).":"")+(hi&&hi.catatan&&hi.catatan.length?" ⚠ "+hi.catatan.join(" "):"")+(lamaEd?" Ini edisi lama, jadi isi halaman Iklim dan Kondisi Iklim tidak diubah (web tetap memakai "+(IK().sumber||"edisi terbaru")+").":"")),50)}
   else if(fid==="admDas"){await simpanDasarian(f)} else if(fid==="admProfil"){await simpanProfil(f)}
   else if(fid==="admIklim"){await simpanIklim(f)}
   else if(fid==="admWil"){await simpanWilayah(f)}
   else if(fid==="admAlat"){await simpanAlat(f)}
   else if(fid==="admPrivasi"){await simpanPrivasi(f)}
   else if(["admBanner","admPintasan","admMedia","admLayanan","admTeksWeb"].includes(fid)){const m=await simpanBerandaIsi(fid,f);await muatUlangKA();isiFooter();const tab=ADM_TAB;admTampil(tab);setTimeout(()=>pesan(m+" Tampil di web paling lama 1 menit."),60)}
   else if(fid==="admSkm"){const u=String(f.skm_url.value||"").trim();if(u&&!/^https:\/\/eskm\.bmkg\.go\.id\/survey\/[A-Za-z0-9\/_.-]+$/.test(u))throw new Error("Tautan harus dari https://eskm.bmkg.go.id/survey/…");await admJSON("/admin/pengaturan",{kunci:"skm",nilai:{url:u}});await muatUlangKA();isiFooter();render();setTimeout(()=>{admTampil("tampilan");pesan(u?"Tautan SKM disimpan. Tampil di web paling lama 1 menit.":"Tautan SKM dikosongkan; tombol survei disembunyikan.")},60)}
   else if(fid==="admPusatMode"){const v=(f.querySelector("[name=pusat_mode]:checked")||{}).value||"otomatis";await admJSON("/admin/pengaturan",{kunci:"pusat_mode",nilai:v});await muatUlangKA();admTampil("iklim");pesan(v==="pusat"?"Rilisan Pusat sekarang tampil untuk semua pengunjung. Pilih \"Otomatis\" untuk mengembalikan.":v==="buletin"?"Kartu & peta sekarang selalu dari buletin kami.":"Kembali ke aturan otomatis 14 hari.")}
   else if(fid==="admTampilan"){await simpanTampilan(f)}
   else if(fid==="admPub"){await simpanPubBawaan(f)}
   else if(fid==="admPer"){const daftar=[...f.querySelectorAll("#perList .perrow")].map(r=>{const kab=[...r.querySelectorAll('[name="pr_kab"]:checked')].map(c=>c.value),dis=r.querySelector('[name="pr_dis"]').value.split(",").map(x=>x.trim()).filter(Boolean),[sampai,berlaku]=(r.querySelector('[name="pr_das"]').value||"|").split("|"),prov=provDariKab(kab);
     const wil=kab.map(k=>(/^kota|^kab\./i.test(k)?k:"Kab. "+k)+(dis.length&&kab.length===1?" (distrik "+dis.join(", ")+")":"")).join("; ")+(dis.length&&kab.length>1?" — distrik "+dis.join(", "):"")+(prov?", "+prov:"");
     return {status:r.querySelector('[name="pr_status"]').value,jenis:r.querySelector('[name="pr_jenis"]').value,kab,distrik:dis.join(", "),prov,wilayah:wil,berlaku:berlaku||"",sampai:sampai||"",catatan:r.querySelector('[name="pr_cat"]').value}});
    if(daftar.some(x=>!x.kab.length))throw new Error("Ada baris tanpa kabupaten/kota. Centang kabupatennya atau hapus barisnya (✕).");
    if(daftar.some(x=>!x.berlaku))throw new Error("Pilih dasarian berlaku di setiap baris.");
    await admJSON("/admin/peringatan",{daftar,berlaku:(daftar[0]||{}).berlaku||"",catatan:f.catatan.value,imbauan_hujan:f.imbauan_hujan.value,imbauan_kekeringan:f.imbauan_kekeringan.value});await muatUlangKA();admTampil("peringatan");setTimeout(()=>pesan(daftar.length?"Peringatan disimpan ("+daftar.length+" wilayah).":"Disimpan: status Nihil."),50)}
   else if(fid==="admKondisi"){const kartu=[...f.querySelectorAll(".kdrow")].map(r=>{const v=k=>r.querySelector(`[name="${k}"]`).value.trim();const a=v("kd_angka").replace(",",".");return {kunci:v("kd_kunci"),judul:v("kd_judul"),nilai:v("kd_nilai"),ket:v("kd_ket"),angka:a===""?null:Number(a),src:v("kd_src")}}).filter(x=>x.judul&&x.nilai);
    const teks={};["hujan","prakiraan","musim","hth","spi","enso"].forEach(k=>{const el=f.querySelector(`[name="tk_${k}"]`);if(el&&el.value.trim())teks[k]=el.value.trim()});
    const kdL=kondisiData(),tsL=kdL.teks_src||{},teks_src={};Object.keys(teks).forEach(k=>{teks_src[k]=(kdL.teks||{})[k]===teks[k]&&tsL[k]?tsL[k]:f.sumber.value}); await admJSON("/admin/kondisi",{sumber:f.sumber.value,ringkasan:f.ringkasan.value,kartu,teks,teks_src,otomatis:""});await muatUlangKA();pesan("Kondisi iklim disimpan. Tampil di web paling lama 1 menit.")}
   else if(fid==="admInfo"){const d={};["wa","email","alamat","jam","ig","linktree","peta_embed","peta_link"].forEach(k=>d[k]=f[k].value);await admJSON("/admin/info",d);await muatUlangKA();pesan("Info kantor disimpan.")}
  }catch(er){pesan(er.message,1)}finally{btn.disabled=false;btn.classList.remove("memuat");const ai1=document.getElementById("admAI");if(ai1)ai1.disabled=false}};}

/* =====================================================================
   ISI HALAMAN IKLIM DARI DOKUMEN YANG DIUNGGAH
   Robot AI membaca buletin / press release / FGD, lalu menyimpan tabel, ZOM, dan peta
   ke KA.isi_iklim. Bila suatu bagian belum ada, dipakai isi bawaan di bawah ini.
   ===================================================================== */
const IK=()=>(KA&&KA.isi_iklim)||{};
const esc=v=>escH(String(v==null?"":v));
const DEF_IK={
 analisis:{bulan:"September 2026",pb:D.sepPB.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),pbd:D.sepPBD.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),
  teks_pb:"Sifat hujan September di Papua Barat didominasi Bawah Normal, lebih kering dari biasanya. Tidak ada wilayah dengan curah hujan Tinggi atau Sangat Tinggi.",teks_pbd:"Seluruh Papua Barat Daya mendapat curah hujan Rendah (0–100 mm) dengan sifat Bawah Normal."},
 prakiraan:{bulan:[{bulan:"November 2026",pb:D.novPB.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),pbd:D.novPBD.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),teks:"Sifat hujan November di Papua Barat Daya didominasi Normal."},
  {bulan:"Desember 2026",pb:D.desPB.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),pbd:D.desPBD.map(r=>({kab:r[0],ch:r[1][0],sh:r[1][1]||"",ket:r[2]||""})),teks:""}]},
 ekstrem:{bulan:"September 2026",jumlah_pos:30,lebat:[{pos:"Prafi",mm:58},{pos:"Tisai SP 5",mm:65},{pos:"Klamalu",mm:90},{pos:"Masni VII",mm:111}],sangat_lebat:[],teks:"Dari pemantauan 30 pos hujan, tercatat 4 kejadian hujan lebat (≥ 50 mm/hari). Hujan sangat lebat (≥ 100 mm/hari) tidak tercatat di kedua provinsi."},
 hth:{bulan:"September 2026",dasarian:[{das:"I",sangat_pendek:24,pendek:0,menengah:1,panjang:0,sangat_panjang:0,ekstrem:0},{das:"II",sangat_pendek:2,pendek:3,menengah:13,panjang:2,sangat_panjang:0,ekstrem:0},{das:"III",sangat_pendek:7,pendek:3,menengah:2,panjang:10,sangat_panjang:0,ekstrem:1}],
  teks:"Deret hari kering memanjang sepanjang September. Pada Dasarian III, 10 pos masuk kategori Panjang dan 1 pos mencapai Kekeringan Ekstrem."},
 spi:{bulan:"September 2026",pb:D.spiPB.map(r=>({kab:r[0],kat:r[1][0],ket:r[2]||""})),pbd:D.spiPBD.map(r=>({kab:r[0],kat:r[1][0],ket:r[2]||""})),
  teks:"Kondisi kekeringan meteorologis mendominasi kedua provinsi pada September 2026. Defisit curah hujan ini perlu diwaspadai bila berlanjut, apalagi El Niño sangat kuat diprediksi bertahan hingga awal 2027."}};
/* hari tanpa hujan, hujan ekstrem, dan SPI harus sebulan dengan analisis hujan; bila berbeda (sisa buletin lama) tidak dipakai */
const basiIK=k=>{if(!["hth","ekstrem","spi"].includes(k))return false;const x=IK()[k],a=IK().analisis;return !!(x&&a&&x.bulan&&a.bulan&&!samaBulan(x.bulan,a.bulan))};
const bagIK=k=>{const x=IK()[k];return x&&typeof x==="object"&&Object.keys(x).length&&!basiIK(k)?x:DEF_IK[k]};
const dariDok=k=>!!(IK()[k]&&Object.keys(IK()[k]).length&&!basiIK(k));
const srcIK=k=>dariDok(k)?`<p class="note" data-oto>Sumber: ${esc((IK()[k]&&IK()[k]._sumber)||IK().sumber||"dokumen terbaru kami")}. Isi bagian ini dibaca dari dokumen; bila ada yang keliru, petugas dapat membetulkannya.</p>`:srcBul();
const warnaKat=v=>COL[v]||(/sangat tinggi/i.test(v)?"#1f3f9a":/tinggi/i.test(v)?"#2f8fd1":/menengah/i.test(v)?"#5fb14e":/rendah/i.test(v)?"#b7873e":/atas normal/i.test(v)?"#2f8fd1":/bawah normal/i.test(v)?"#d0782c":/normal/i.test(v)&&/kering/i.test(v)?"#b9cf3c":/normal/i.test(v)?"#5fb14e":/sangat kering|ekstrem/i.test(v)?"#b91c1c":/agak kering/i.test(v)?"#efd23a":/kering/i.test(v)?"#d9452b":/basah/i.test(v)?"#2f8fd1":"#94a3b8");
const chip2=v=>v?`<span class="c"><i style="background:${warnaKat(v)}"></i>${esc(v)}</span>`:"";
function gridKab(prov,rows,f,bulan){if(!Array.isArray(rows)||!rows.length)return "";const bi=bulan?idxBulan(bulan):-1;return `<div class="prov">${prov}</div><div class="kgrid">${rows.map(r=>{const n=bi>=0?normalKab(r.kab,bi):0;return `<div class="kab"><b>${esc(r.kab)}</b>${f.map(k=>chip2(r[k])).join("")}${r.ket?`<small>${esc(r.ket)}</small>`:""}${n?`<small class="knor" title="Rata-rata ${BLN_ID[bi]} 1991–2020 seluruh wilayah kabupaten/kota">normal ${n} mm</small>`:""}</div>`}).join("")}</div>`}
function legend2(list,f){const s=new Set();list.forEach(rows=>(Array.isArray(rows)?rows:[]).forEach(r=>f.forEach(k=>r[k]&&s.add(r[k]))));return s.size?`<div class="legend">${[...s].map(k=>`<span><i style="background:${warnaKat(k)}"></i>${esc(k)}</span>`).join("")}</div>`:""}
const samaBulan=(a,b)=>{const m=x=>(String(x||"").toLowerCase().match(BLN_RE)||[""])[0].replace(/\s+/g," ");return !!m(a)&&m(a)===m(b)};
function petaDari(fn){const p=(Array.isArray(IK().peta)?IK().peta:[]).filter(fn);if(!p.length)return "";
 return `<div class="petas${p.length>1?" dua":""}">${p.slice(0,4).map(x=>`<figure class="map"><a href="${fileURL(x.file)}" target="_blank" rel="noopener"><img src="${fileURL(x.file)}" alt="${esc(x.judul)}" loading="lazy" data-galat="figure"></a><figcaption>${esc(rapiKet(x.judul))}${x.sumber?" · Sumber: "+esc(x.sumber):""}</figcaption></figure>`).join("")}</div>`}
function tabPanel(judul,grup,tabs){tabs=tabs.filter(t=>t.isi);if(!tabs.length)return "";
 return `<div class="panel"><div class="panel-head"><span>${judul}</span>${tabs.length>1?`<div class="tabs" data-grup="${grup}">${tabs.map((t,i)=>`<button type="button" class="${i?"":"on"}" data-t="${i}">${t.lab}</button>`).join("")}</div>`:""}</div><div class="panel-body">${tabs.map((t,i)=>`<div data-pgrup="${grup}" data-p="${i}"${i?" hidden":""}>${t.isi}</div>`).join("")}</div></div>`}

/* ---------- Hujan bulanan ---------- */
const AWAM_HB=["<b>Analisis</b> menjelaskan hujan yang <i>sudah</i> turun (bulan lalu). <b>Prakiraan</b> adalah perkiraan hujan untuk bulan-bulan berikutnya.",
 "<b>Curah hujan</b> diukur dalam milimeter (mm). Hujan 1 mm berarti air setinggi 1 mm menggenang di permukaan datar, atau 1 liter air pada setiap 1 meter persegi.",
 "<b>Rendah</b> (0–100 mm sebulan): hujan jarang, tanah cepat kering. <b>Menengah</b> (101–300 mm): hujan cukup. <b>Tinggi</b> (301–500 mm) dan <b>Sangat Tinggi</b> (lebih dari 500 mm): hujan sangat sering, waspada banjir dan longsor.",
 "<b>Sifat hujan</b> membandingkan jumlah hujan dengan rata-rata 30 tahun (1991–2020) bulan yang sama di tempat itu: <b>Bawah Normal</b> kurang dari 85% rata-rata, <b>Normal</b> 85–115%, <b>Atas Normal</b> lebih dari 115%. Contoh: bila normal September di suatu wilayah 250 mm, hujan 180 mm tergolong <b>Menengah</b> (jumlahnya cukup) tetapi <b>Bawah Normal</b> (kurang dari 213 mm, lebih kering dari biasanya di sana). Angka normal tiap kabupaten ada di <a href=\"#wilayah\">Info Wilayah Saya</a>.",
 "<b>Hujan lebat</b> adalah hujan 50 mm atau lebih dalam sehari. Hujan seperti ini bisa menyebabkan genangan dan banjir lokal.",
 "Pada <b>peta</b>, warna cokelat dan kuning berarti hujan sedikit, hijau cukup, dan biru banyak. Wilayah kita ada di kepala burung Papua."];
P["hujan-bulanan"]=()=>{const an=bagIK("analisis"),pr=(bagIK("prakiraan").bulan||[]).filter(m=>m&&m.bulan),ek=bagIK("ekstrem");
 const bl=pr.map(m=>m.bulan);
 const posOk=x=>x&&String(x.pos||"").trim()&&!/provinsi|^papua barat|^[-–]+$|tidak ada/i.test(x.pos)&&!(x.mm!=null&&x.mm!==""&&+x.mm<=0);
 const ekL=(ek.lebat||[]).filter(posOk),ekSL=(ek.sangat_lebat||[]).filter(posOk),mmT=x=>x.mm!=null&&x.mm!==""?esc(String(x.mm).replace(".",","))+" mm":"–";
 const ekRows=[...ekSL.map(x=>[`<b>${esc(x.pos)}</b>`,'<span class="pill bad">Sangat lebat</span>',mmT(x)]),...ekL.map(x=>[`<b>${esc(x.pos)}</b>`,'<span class="pill warn">Lebat</span>',mmT(x)])];
 return head("Iklim >> Hujan Bulanan","Analisis &amp; Prakiraan Hujan Bulanan",`Analisis curah hujan dan sifat hujan ${esc(an.bulan||"bulan lalu")}${bl.length?" serta prakiraan "+esc(bl[0])+(bl.length>1?" – "+esc(bl[bl.length-1]):""):""} untuk Papua Barat dan Papua Barat Daya.`)+
 tabPanel("Analisis "+esc(an.bulan||""),"hba",[
  {lab:"Papua Barat",isi:gridKab("Papua Barat · Curah hujan dan sifat hujan",an.pb,["ch","sh"],an.bulan)+legend2([an.pb],["ch","sh"])+(an.teks_pb?`<p>${esc(an.teks_pb)}</p>`:"")+petaDari(x=>x.k==="analisis"&&x.prov!=="pbd")},
  {lab:"Papua Barat Daya",isi:gridKab("Papua Barat Daya · Curah hujan dan sifat hujan",an.pbd,["ch","sh"],an.bulan)+legend2([an.pbd],["ch","sh"])+(an.teks_pbd?`<p>${esc(an.teks_pbd)}</p>`:"")+petaDari(x=>x.k==="analisis"&&x.prov==="pbd")}])+
 tabPanel("Prakiraan Curah Hujan &amp; Sifat Hujan","hbp",pr.map(m=>({lab:esc(m.bulan),isi:gridKab("Papua Barat",m.pb,["ch","sh"],m.bulan)+gridKab("Papua Barat Daya",m.pbd,["ch","sh"],m.bulan)+legend2([m.pb,m.pbd],["ch","sh"])+(m.teks?`<p>${esc(m.teks)}</p>`:"")+petaDari(x=>x.k==="prakiraan"&&samaBulan(x.bulan,m.bulan))})))+
 `<div class="panel"><div class="panel-head"><span>Curah Hujan Ekstrem Harian${ek.bulan?" · "+esc(ek.bulan):""}</span></div><div class="panel-body"><div class="ekring"><div><b>${ekL.length}</b><span>kejadian hujan lebat<br><small>50 mm atau lebih sehari</small></span></div><div><b>${ekSL.length}</b><span>kejadian hujan sangat lebat<br><small>100 mm atau lebih sehari</small></span></div>${ek.jumlah_pos?`<div><b>${esc(ek.jumlah_pos)}</b><span>pos hujan diamati</span></div>`:""}</div>
 ${ekRows.length?tbl(["Pos hujan","Kategori","Hujan dalam sehari"],ekRows):`<p class="note">Tidak tercatat hujan lebat maupun sangat lebat${ek.bulan?" pada "+esc(ek.bulan):""}.</p>`}${ek.teks?`<p class="note">${esc(ek.teks)}</p>`:""}
 <div class="legend"><span><i style="background:#c8a15a"></i>Rendah 0–100 mm</span><span><i style="background:#7fbf6a"></i>Menengah 101–300 mm</span><span><i style="background:#2f8fd1"></i>Tinggi 301–500 mm</span><span><i style="background:#1f3f7a"></i>Sangat Tinggi &gt; 500 mm</span></div>${srcIK("analisis")}</div></div>`+
 awam("Cara membaca data hujan bulanan",AWAM_HB)};

/* ---------- Hari tanpa hujan ---------- */
const KAT_HTH=[["sangat_pendek","Sangat Pendek","#5fb14e"],["pendek","Pendek","#a8d36a"],["menengah","Menengah","#efd23a"],["panjang","Panjang","#f08c2e"],["sangat_panjang","Sangat Panjang","#d9452b"],["ekstrem","Kekeringan Ekstrem","#8e1b1b"]];
function hthChart2(h){const data=(h.dasarian||[]).map(d=>["Dasarian "+esc(d.das||""),KAT_HTH.map(([k])=>Math.max(0,+d[k]||0))]).filter(x=>x[1].some(v=>v));if(!data.length)return "";
 return rc(W=>hthSvg(data,W),720)+`<div class="legend">${KAT_HTH.map(c=>`<span><i style="background:${c[2]}"></i>${c[1]}</span>`).join("")}</div>`}
function hthSvg(data,W){const mx=Math.max(5,...data.map(x=>x[1].reduce((a,b)=>a+b,0))),sempit=W<520,L=sempit?92:104,R=56,bh=sempit?26:30,gap=sempit?16:22,T=10,H=T+data.length*(bh+gap)+28,sc=(W-L-R)/mx,st=mx>40?10:5;
 let g="";for(let t=0;t<=mx;t+=st){const x=L+t*sc;g+=`<line x1="${x}" x2="${x}" y1="${T-4}" y2="${H-24}" stroke="var(--line)"/><text x="${x}" y="${H-8}" text-anchor="middle" font-size="11.5" fill="var(--muted)">${t}</text>`}
 data.forEach(([lab,v],i)=>{const y=T+i*(bh+gap);let x=L;g+=`<text x="${L-10}" y="${y+bh/2+4}" text-anchor="end" font-size="13" fill="var(--fg)">${lab}</text>`;
  v.forEach((n,j)=>{if(!n)return;const w=n*sc;g+=`<rect x="${x}" y="${y}" width="${w}" height="${bh}" fill="${KAT_HTH[j][2]}"><title>${KAT_HTH[j][1]}: ${n} pos</title></rect>`;if(w>18)g+=`<text x="${x+w/2}" y="${y+bh/2+4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="#10213f">${n}</text>`;x+=w});
  g+=`<text x="${x+6}" y="${y+bh/2+4.5}" font-size="12" fill="var(--muted)">${v.reduce((a,b)=>a+b)} pos</text>`});
 return svgUk(W,H,"Jumlah pos hujan per kategori hari tanpa hujan")+g+`</svg>`}
P["hari-tanpa-hujan"]=()=>{const h=bagIK("hth");
 return head("Iklim >> Hari Tanpa Hujan","Monitoring Hari Tanpa Hujan (HTH)","Jumlah hari berturut-turut tanpa hujan (curah hujan &lt; 1 mm) di pos pengamatan hujan Papua Barat dan Papua Barat Daya, dihitung tiap akhir dasarian.")+`
<div class="panel"><div class="panel-head"><span>Peta Hari Tanpa Hujan Terbaru</span></div><div class="panel-body">${bmkgImg("hth","Peta monitoring hari tanpa hujan berturut-turut di Indonesia","Setiap titik adalah satu pos hujan. Hijau berarti masih sering hujan, kuning hingga cokelat makin lama tidak hujan, merah berarti lebih dari 60 hari tanpa hujan. Lihat wilayah Papua Barat dan Papua Barat Daya di bagian kanan atas peta (Kepala Burung).")}</div></div>
<div class="panel"><div class="panel-head"><span>Jumlah Pos Hujan per Kategori HTH${h.bulan?" · "+esc(h.bulan):""}</span></div><div class="panel-body">${hthChart2(h)}
${h.teks?`<p>${esc(h.teks)}</p>`:""}${(h.dasarian||[]).filter(d=>d.teks).map(d=>`<p><b>Dasarian ${esc(d.das)}:</b> ${esc(d.teks)}</p>`).join("")}${petaDari(x=>x.k==="hth")}${srcIK("hth")}</div></div>
${awam("Cara membaca hari tanpa hujan",[
 "<b>Hari tanpa hujan</b> adalah jumlah hari berturut-turut tanpa hujan berarti (kurang dari 1 mm) di satu pos pengamatan.",
 "<b>Dasarian</b> adalah periode 10 harian: Dasarian I tanggal 1–10, Dasarian II tanggal 11–20, Dasarian III tanggal 21 sampai akhir bulan.",
 "Angka di grafik menunjukkan <b>berapa pos hujan</b> yang masuk tiap kategori. Makin banyak pos di kategori Panjang ke bawah, makin luas wilayah yang kering.",
 "Kategori menurut lamanya tidak hujan: <b>Sangat Pendek</b> 1–5 hari, <b>Pendek</b> 6–10 hari, <b>Menengah</b> 11–20 hari, <b>Panjang</b> 21–30 hari, <b>Sangat Panjang</b> 31–60 hari, dan <b>Kekeringan Ekstrem</b> lebih dari 60 hari.",
 "Kategori <b>Panjang</b> (21–30 hari) ke atas perlu diwaspadai: tanaman mulai kekurangan air, sumur dan sumber air bisa menyusut, dan risiko kebakaran lahan meningkat."])}`};

/* ---------- Kekeringan & SPI (panel SPI dari dokumen) ---------- */
{const asli=P["peringatan-kekeringan"];P["peringatan-kekeringan"]=()=>{let h=asli();if(!dariDok("spi"))return h;const s=bagIK("spi");
 const baru=`<div class="panel"><div class="panel-head"><span>SPI ${esc(s.bulan||"")} per Kabupaten/Kota</span></div><div class="panel-body">${gridKab("Papua Barat",s.pb,["kat"])}${gridKab("Papua Barat Daya",s.pbd,["kat"])}${legend2([s.pb,s.pbd],["kat"])}${s.teks?`<p>${esc(s.teks)}</p>`:""}${petaDari(x=>x.k==="spi")}${srcIK("spi")}</div></div>`;
 const i=h.indexOf('<div class="panel"><div class="panel-head"><span>SPI September 2026 per Kabupaten/Kota</span>');if(i<0)return h;const j=h.indexOf('<div class="card prose"><h3 style="margin-top:0">Kesimpulan</h3>',i);
 h=h.slice(0,i)+baru+h.slice(j);return h.replace(/<p>Kondisi kekeringan meteorologis mendominasi kedua provinsi pada September 2026\.[^<]*<\/p>/,"")}}

/* ---------- Prediksi musim (hujan & kemarau) ---------- */
const urutBulan=t=>{const m=String(t||"").toLowerCase().match(BLN_RE);if(!m)return 99999;const i=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"].indexOf(m[1].toLowerCase());return (+(m[2]||0))*12+i};
const blnSaja=t=>{const m=String(t||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(?:\s+I{1,3}\b)?(\s+\d{4})?/i);return m?besarAwal(m[1].toLowerCase())+(m[2]?m[2]:""):String(t||"").trim()};
/* ejaan distrik yang sering keliru di dokumen (dibetulkan saat ditampilkan, termasuk data lama yang tersimpan) */
const EJAAN_DISTRIK=[[/\bBisoo+p\b/g,"Biscoop"],[/\bSough Jaya\b/g,"Soug Jaya"],[/\bBombaray\b/g,"Bomberay"],[/\bMbahamdand(?:r|)a\b/g,"Mbahamdandara"],[/\bFafuwar\b/g,"Fafurwar"],[/\bKambaru\b/g,"Kambrau"],[/\bCatubow\b/g,"Catubouw"],[/\bWarwabori\b/g,"Warwarbomi"],[/\bMomiwaren\b/g,"Momi Waren"]];
const DISTRIK_KAB_BENAR={"Soug Jaya":"Teluk Wondama"};
function ejaWil(t){let w=String(t||"");EJAAN_DISTRIK.forEach(([r,g])=>{w=w.replace(r,g)}); Object.entries(DISTRIK_KAB_BENAR).forEach(([d,kb])=>{const re=new RegExp("(Kab\\.|Kabupaten)\\s*(?!"+kb+")([^(;]+?)\\s*\\(([^)]*\\b"+d+"\\b[^)]*)\\)");const m=w.match(re);if(!m)return;const sisa=m[3].split(",").map(x=>x.trim()).filter(x=>x&&x!==d);w=w.replace(m[0],(sisa.length?m[1]+" "+m[2].trim()+" ("+sisa.join(", ")+")":"").trim());const ada=new RegExp("(Kab\\.|Kabupaten)\\s*"+kb+"\\s*\\(([^)]*)\\)");const a=w.match(ada);if(a){if(!new RegExp("\\b"+d+"\\b").test(a[2]))w=w.replace(a[0],a[1]+" "+kb+" ("+a[2]+", "+d+")")}else w=(w.replace(/;\s*$/,"")+"; Kab. "+kb+" ("+d+")").replace(/^;\s*/,"");w=w.replace(/;\s*;/g,";").replace(/^\s*;\s*/,"")});return w}
function zomNorm(m){const L=zomNorm0(m).map(z=>z&&z.wil?{...z,wil:ejaWil(z.wil)}:z);if(typeof pmhuPeta!=="function"||!KA||!m)return L;if(m===IK().musim_hujan)return terapkanKeDaftar(L);if(m===IK().musim_kemarau){const u=pmkAktif(),per=String(m.periode||"");if(u&&u.tahun&&/20\d\d/.test(per)&&!per.includes(String(u.tahun)))return L;return u&&u.zom.some(z=>nomorZ(z))?terapkanKeDaftar(L,u):L}return L}
/* dokumen BMKG sering memakai kode tabel: "JUL III", "N" (Non ZOM), "SUDAH MK", "AGT 10", "MAJU", sifat "A/N/B" → teks lengkap bertahun */
function kodeMusim(m){const jn=String((m&&m.jenis)||"").toLowerCase().includes("kemarau")?"kemarau":"hujan",th=+(String((m&&m.periode)||"").match(/20\d\d/)||[new Date().getFullYear()])[0];
 const K={JAN:0,FEB:1,MAR:2,APR:3,MEI:4,MAY:4,JUN:5,JUL:6,AGT:7,AGU:7,AUG:7,AGS:7,SEP:8,OKT:9,OCT:9,NOV:10,DES:11,DEC:11},NM=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
 const tahun=b=>jn==="hujan"?(b>=6?th:th+1):th,
  bln=(v,das)=>{const x=String(v||"").trim(),u=x.toUpperCase();if(!x)return "";if(/^(N|NON|NON ?ZOM|NZ|-)$/.test(u)||/tipe\s*1/i.test(x))return "Tipe 1 Musim";if(/^SUDAH\s*M[KH]/.test(u))return "Sudah masuk musim "+(/MK/.test(u)?"kemarau":"hujan");
   const k=u.match(/^([A-Z]{3})[A-Z]*\.?\s*(III|II|I)?\b(?:\s*(\d{4}))?/);if(k&&K[k[1]]!=null&&!/[a-z]{4,}/.test(x.slice(3,6))){const b=K[k[1]],t=k[3]?+k[3]:tahun(b);return NM[b]+(das&&k[2]?" "+k[2]:"")+" "+t}
   if(BLN_RE.test(x)&&!/\d{4}/.test(x)){const mm=x.match(BLN_RE);const b=NM.map(s=>s.toLowerCase()).indexOf(mm[1].toLowerCase());return b>=0?x.replace(mm[0],NM[b]+" "+tahun(b)):x}return x};
 return {awal:v=>bln(v,true),puncak:v=>bln(v,false),banding:v=>{const x=String(v||"").trim();return /^maju/i.test(x)?"Maju":/^mundur/i.test(x)?"Mundur":/^sama/i.test(x)?"Sama":x},sifat:v=>{const x=String(v||"").trim();return {A:"Atas Normal",N:"Normal",B:"Bawah Normal",AN:"Atas Normal",BN:"Bawah Normal"}[x.toUpperCase()]||x.replace(/^(atas|bawah)\s*normal$/i,(a,b)=>b.charAt(0).toUpperCase()+b.slice(1).toLowerCase()+" Normal").replace(/^normal$/i,"Normal")}}}
/* rapikan keterangan hasil baca PDF: "P rediksi" → "Prediksi", "Terhadap ·" → "Terhadap Normal ·" */
const rapiKet=t=>String(t||"").replace(/\b([A-Z][a-z]?)\s([a-z]{3,})/g,(m,a,b)=>{const w=a+b;return /^(Prediksi|Perbandingan|Peta|Sifat|Puncak|Awal|Musim|Kemarau|Hujan|Prakiraan|Distribusi|Analisis|Normal)$/.test(w)?w:m}).replace(/\bTerhadap\s*(·|$)/,"Terhadap Normal $1").replace(/\s{2,}/g," ").trim();
/* Padanan resmi kode PAPBAR baru (tabel update pusat Nov 2026) → nomor ZOM (636 = Manokwari Utara … 656 = Misool).
   Sumber: sheet CTRLUPDATE_PMH2026-27, kolom ZOM_PROV_LAMA/BARU; cocok dengan Buletin PMH 2026/2027. */
const PAPBAR_KE_ZOM={1:637,2:636,3:638,4:641,5:640,6:639,7:644,8:645,9:646,10:647,11:648,12:643,13:649,14:650,15:651,16:652,17:654,18:655,19:656,20:653,21:642};
const kodeKeZom=k=>{const x=/^PAPBAR_(\d+)$/i.exec(String(k||"").trim());return x?PAPBAR_KE_ZOM[+x[1]]||0:0};
const nomorZ=z=>kodeKeZom(z&&z.no)||+(z&&z.web)||0;
function zomNorm0(m){const KD=kodeMusim(m);return (Array.isArray(m&&m.zom)?m.zom:[]).map(z=>({no:parseInt(z.no,10)||z.no,wil:String(z.wil||""),awal:KD.awal(z.awal),banding:KD.banding(z.banding),sifat:KD.sifat(z.sifat),puncak:KD.puncak(z.puncak),...(z.semula&&String(z.semula)!==String(z.awal||"")?{semula:String(z.semula)}:{})})).filter(z=>z.no).sort((a,b)=>a.no-b.no)}
function hitung(arr,f){const m=new Map();arr.forEach(z=>{const v=f(z);if(v)m.set(v,(m.get(v)||0)+1)});return [...m.entries()]}
/* nomor ZOM + kabupaten singkat; ketuk untuk daftar distrik (jendela rincianZom) */
function kabZom(no){const z=ZOM11.find(x=>x.no===+no),w=(z&&z.wil)||WIL_NONZOM[+no]||"",k=[...new Set([...String(w).matchAll(/(?:Kab\.|Kabupaten|Kota)\s*([^(;,]+?)\s*(?:\(|;|,|$)/gi)].map(m=>(/kota/i.test(m[0])?"Kota ":"")+m[1].trim()))];return k.length?k:(w?[String(w).split(/[(:;]/)[0].trim()]:[])}
function chipZom(nos){return `<div class="zchips">${nos.map(n=>{const k=kabZom(n);return `<button type="button" class="zchip" data-zom="${n}" data-judul="ZOM ${n}"><b>ZOM ${n}</b><small>${esc(k.slice(0,2).join(", ")+(k.length>2?" +"+(k.length-2):""))}</small></button>`}).join("")}</div>`}
function pillBanding(v){return /maju/i.test(v)?"ok":/mundur/i.test(v)?"warn":""}
function pillSifat(v){return /atas/i.test(v)?"ok":/bawah/i.test(v)?"warn":""}
function halMusim(jenis){const m=IK()["musim_"+jenis],nm=jenis==="hujan"?"Musim Hujan":"Musim Kemarau",per=esc((m&&m.periode)||"");
 const zom=zomNorm(m),zAwal=zom.filter(z=>z.awal&&!/non|tipe 1|tidak|sudah masuk/i.test(z.awal));
 const nosDari=f=>lab=>zom.filter(z=>f(z)===lab).map(z=>z.no);
 const bar=(arr,c,f,judul)=>{if(!arr.length)return "";const mx=Math.max(...arr.map(x=>x[1]));return `<div class="mbar klik">${arr.map(([l,v])=>`<button type="button" class="mrow" data-zom="${f?nosDari(f)(l).join(","):""}" data-jenis="${jenis}" data-judul="${esc((judul||"")+": "+l)}"><span>${esc(l)}</span><i style="width:${v/mx*100}%;background:${c}"></i><b>${v}</b></button>`).join("")}</div>`};
 const awal=hitung(zAwal,z=>blnSaja(z.awal)).sort((a,b)=>urutBulan(a[0])-urutBulan(b[0])),band=hitung(zom,z=>/maju/i.test(z.banding)?"Maju":/mundur/i.test(z.banding)?"Mundur":/sama/i.test(z.banding)?"Sama":""),
  sif=hitung(zom,z=>/atas/i.test(z.sifat)?"Atas Normal":/bawah/i.test(z.sifat)?"Bawah Normal":/normal/i.test(z.sifat)?"Normal":""),pun=hitung(zom,z=>blnSaja(z.puncak)).sort((a,b)=>urutBulan(a[0])-urutBulan(b[0]));
 const dom=a=>a.length?a.slice().sort((x,y)=>y[1]-x[1])[0]:null;
 const FN={awal:z=>z.awal&&!/non|tipe 1|tidak|sudah masuk/i.test(z.awal)?blnSaja(z.awal):"",sifat:z=>/atas/i.test(z.sifat)?"Atas Normal":/bawah/i.test(z.sifat)?"Bawah Normal":/normal/i.test(z.sifat)?"Normal":"",puncak:z=>blnSaja(z.puncak),banding:z=>/maju/i.test(z.banding)?"Maju":/mundur/i.test(z.banding)?"Mundur":/sama/i.test(z.banding)?"Sama":""};
 const kartu=(c,lab,a,warna,k)=>{const d=dom(a);return d?`<div class="pk" style="--c:${c}"><span>${lab}</span><button type="button" class="pkh" data-zom="${nosDari(FN[k])(d[0]).join(",")}" data-jenis="${jenis}" data-judul="${esc(lab+": "+d[0])}"><b>${esc(d[0])}</b><em>${d[1]} ZOM</em></button>${bar(a,warna,FN[k],lab)}</div>`:""};
 const pt=[["musim-awal","Awal musim"],["musim-banding","Dibanding normal"],["musim-sifat","Sifat"],["musim-puncak","Puncak"]].map(([k,l])=>({lab:l,isi:petaDari(x=>x.k===k&&(x.sub||"hujan")===jenis)}));
 const rekoAdm=barisTH("musim_reko_"+jenis,"").filter(x=>x[1]).map(x=>[esc(x[0]),esc(x[1])]);const reko=rekoAdm.length?rekoAdm:jenis==="hujan"?[["Pangan","Sesuaikan jadwal tanam dengan kondisi hujan. Jaga saluran air di lahan dan siapkan pengeringan hasil panen."],["Kebencanaan","Bersihkan saluran air, siapkan jalur evakuasi, dan waspadai banjir serta longsor saat hujan lebat."],["Kesehatan","Jaga kebersihan lingkungan dan air minum, cegah gigitan nyamuk (malaria, demam berdarah)."]]
  :[["Sumber daya air","Hemat air dan tampung air hujan selagi masih turun. Periksa sumur dan sumber air bersih."],["Pangan","Pilih tanaman yang tahan kering dan atur jadwal tanam sesuai ketersediaan air."],["Kebakaran lahan","Jangan membakar lahan atau sampah. Laporkan titik api ke pihak berwenang."]];
 return head("Iklim >> Prediksi "+nm,"Prediksi "+nm+(per?" "+per:""),`Hasil analisis kami untuk Provinsi Papua Barat dan Papua Barat Daya: kapan ${nm.toLowerCase()} dimulai, bagaimana sifatnya dibanding biasa, dan kapan puncaknya.`)+`
 ${(()=>{const t1=zom.filter(z=>/non|tipe 1|tidak/i.test(z.awal||"")||!z.awal).length,nml=nm.toLowerCase(),lawan=jenis==="hujan"?"kemarau":"hujan";
  const cat=t1?`<p style="margin:${m&&m.teks?"10px":"0"} 0 0"><b>Perlu diketahui:</b> tidak semua wilayah mengalami ${nml} yang jelas setiap tahun. Di <b>${t1} dari ${zom.length} Zona Musim</b> (disebut <i>Tipe 1 Musim</i> atau Non Zona Musim), hujan turun cukup merata sepanjang tahun, sehingga tidak memenuhi syarat awal ${nml} (${jenis==="hujan"?"50 mm atau lebih":"kurang dari 50 mm"} per dasarian selama tiga dasarian berturut-turut). Wilayah ini tetap bisa mengalami hari-hari ${jenis==="hujan"?"hujan":"kering"}, hanya saja tidak membentuk ${nml} dan musim ${lawan} yang tegas.</p>`:"";
  return m&&m.teks||cat?`<div class="card prose" style="margin-bottom:18px">${m&&m.teks?`<p style="margin:0">${esc(m.teks)}</p>`:""}${cat}</div>`:""})()}
 <h2 class="sec-title">Ringkasan${OTO_K}</h2><div class="pmh">${kartu("#15803d","Prediksi awal "+nm.toLowerCase(),awal,"#15803d","awal")}${kartu("#a16207","Sifat "+nm.toLowerCase(),sif,"#ca8a04","sifat")}${kartu("#1d4ed8","Prediksi puncak "+nm.toLowerCase(),pun,"#1d4ed8","puncak")}${kartu("#b45309","Dibanding normal",band,"#b45309","banding")}</div><p class="note ketukzom">👆 Ketuk angka atau baris mana pun untuk melihat ZOM dan wilayahnya.</p>
 <p class="note">Angka adalah jumlah Zona Musim (ZOM) pada tiap kelompok.</p>
 ${tabPanel("Peta Prediksi "+nm+(per?" "+per:""),"pm"+jenis,pt)}
 ${(()=>{const gB=k=>zAwal.filter(z=>FN.banding(z)===k).map(z=>z.no),gS=k=>zom.filter(z=>FN.sifat(z)===k).map(z=>z.no),PB={Maju:"ok",Sama:"",Mundur:"warn"},PS={"Atas Normal":"ok",Normal:"","Bawah Normal":"warn"},nml=nm.toLowerCase();
  const b=["Maju","Sama","Mundur"].map(k=>[k,gB(k)]).filter(x=>x[1].length),sf=["Atas Normal","Normal","Bawah Normal"].map(k=>[k,gS(k)]).filter(x=>x[1].length);
  const kalB={Maju:jenis==="hujan"?"Hujan datang lebih cepat dari biasanya.":"Kemarau datang lebih cepat dari biasanya.",Sama:jenis==="hujan"?"Hujan datang seperti biasanya.":"Kemarau datang seperti biasanya.",Mundur:jenis==="hujan"?"Hujan datang lebih lambat dari biasanya.":"Kemarau datang lebih lambat dari biasanya."};
  const kalS={"Atas Normal":`Hujan selama ${nml} lebih banyak dari biasanya (lebih dari 115%).`,Normal:`Hujan selama ${nml} seperti biasanya (85–115%).`,"Bawah Normal":`Hujan selama ${nml} lebih sedikit dari biasanya (kurang dari 85%).`};
  const kotak=(arr,P,K)=>`<div class="grid3 bd">${arr.map(([k,n])=>`<div class="card"><span class="pill ${P[k]}">${k} · ${n.length} ZOM</span><p style="margin:10px 0 0;font-size:14px">${K[k]}</p>${chipZom(n)}</div>`).join("")}</div><p class="note ketukzom">👆 Ketuk nomor ZOM untuk melihat daftar distriknya.</p>`;
  return (b.length?`<div class="panel"><div class="panel-head"><span>Perbandingan Awal ${nm} terhadap Normal</span></div><div class="panel-body">${kotak(b,PB,kalB)}</div></div>`:"")+(sf.length?`<div class="panel"><div class="panel-head"><span>Sifat ${nm}${per?" "+per:""} (${sf.reduce((t,x)=>t+x[1].length,0)} ZOM)</span></div><div class="panel-body">${kotak(sf,PS,kalS)}</div></div>`:"")})()}
 <div class="panel"><div class="panel-head"><span>Prediksi per Zona Musim</span></div><div class="panel-body">${(jenis==="hujan"?(catPMHU()||catSemula(zom)):(catPMK()||catSemula(zom)))+tbl(["ZOM","Wilayah","Awal","Dibanding normal","Sifat","Puncak"],zom.map(z=>[`<b>${esc(z.no)}</b>`,esc(z.wil)||"–",(esc(z.awal)||"–")+semulaHTML(z),z.banding?`<span class="pill ${pillBanding(z.banding)}">${esc(z.banding)}</span>`:"–",z.sifat?`<span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:"–",esc(z.puncak)||"–"]))}
 <p class="note">Cari distrik Anda di kolom Wilayah, atau buka <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>
 <h2 class="sec-title" style="margin-top:26px">Rekomendasi</h2><div class="grid3 reko">${reko.map(([j,t])=>`<div class="card"><b>${j}</b><p style="margin:6px 0 0;color:var(--muted);font-size:14px">${t}</p></div>`).join("")}</div>
 ${awam("Cara membaca prediksi musim",[
  "<b>ZOM (Zona Musim)</b> adalah wilayah yang pola hujannya punya perbedaan jelas antara musim hujan dan kemarau. Satu ZOM bisa mencakup beberapa distrik dari beberapa kabupaten.",
  jenis==="hujan"?"<b>Awal musim hujan</b> adalah saat hujan mulai turun rutin: dalam 10 hari hujan mencapai 50 mm atau lebih, dan kondisi itu berlanjut pada dua periode 10 hari berikutnya.":"<b>Awal musim kemarau</b> adalah saat hujan mulai jarang: dalam 10 hari hujan kurang dari 50 mm, dan kondisi itu berlanjut pada dua periode 10 hari berikutnya.",
  "<b>Maju</b> berarti musim datang lebih cepat dari biasanya, <b>Mundur</b> lebih lambat, <b>Sama</b> seperti biasanya. Pembandingnya adalah rata-rata 1991–2020.",
  "<b>Atas Normal</b> berarti hujan lebih banyak dari rata-rata 1991–2020 (lebih dari 115%), <b>Normal</b> 85–115% dari rata-rata, <b>Bawah Normal</b> kurang dari 85% dari rata-rata.",
  jenis==="hujan"?"<b>Puncak musim hujan</b> adalah bulan dengan hujan paling banyak, saat risiko banjir dan longsor paling tinggi.":"<b>Puncak musim kemarau</b> adalah bulan dengan hujan paling sedikit, saat risiko kekeringan dan kebakaran lahan paling tinggi."])}
 <p class="note">Sumber: ${esc(IK().sumber||"dokumen prediksi musim kami")}. Dokumen lengkap ada di halaman <a href="#publikasi">Publikasi</a>.</p>`}
{const asli=P["prakiraan-musim"];P["prakiraan-musim"]=()=>dariDok("musim_hujan")&&zomNorm(IK().musim_hujan).length?halMusim("hujan"):asli()}
P["prakiraan-musim-kemarau"]=()=>dariDok("musim_kemarau")&&zomNorm(IK().musim_kemarau).length?halMusim("kemarau"):head("Iklim >> Prediksi Musim Kemarau","Prediksi Musim Kemarau","Kapan musim kemarau dimulai, sifatnya dibanding biasa, dan kapan puncaknya di Papua Barat dan Papua Barat Daya.")+`
 <div class="card prose"><h3 style="margin-top:0">Prediksi musim kemarau belum terbit</h3><p>Prediksi Musim Kemarau biasanya kami terbitkan sekitar Februari–Maret. Halaman ini akan terisi sendiri begitu Press Release atau paparan Prediksi Musim Kemarau diunggah petugas.</p>
 <p>Sementara itu, lihat <a href="#prakiraan-musim">Prediksi Musim Hujan</a> yang sedang berlaku dan <a href="#hari-tanpa-hujan">Monitoring Hari Tanpa Hujan</a>.</p></div>
 ${awam("Apa itu musim kemarau?",["<b>Awal musim kemarau</b> adalah saat hujan mulai jarang: dalam 10 hari hujan kurang dari 50 mm, dan kondisi itu berlanjut pada dua periode 10 hari berikutnya.","Wilayah <b>Tipe 1 Musim</b> (Non-ZOM) hujan hampir sepanjang tahun, sehingga awal musim kemaraunya tidak ditentukan."])}`;

/* ---------- tabel ZOM terbaru untuk halaman Zona Musim ---------- */
/* data bawaan lengkap 21 ZOM (11 ZOM bermusim + 10 Tipe 1 Musim) dari Press Release & Paparan FGD PMH 2026/2027 */
function zomBawaanLengkap(){return Object.keys(ZOM_PMH).map(Number).sort((a,b)=>a-b).map(no=>{const r=ZOM_PMH[no]||[],z11=ZOM11.find(x=>x.no===no);
 return {no,wil:z11?z11.wil:(WIL_NONZOM[no]||""),awal:r[0]||(z11?"":"Tipe 1 Musim"),banding:r[1]||"",sifat:r[2]||"",puncak:r[3]||""}})}
function zomTerbaru(){const m=IK().musim_hujan,z=zomNorm(m);if(z.length)return {judul:"Musim Hujan "+((m&&m.periode)||""),zom:z};
 return {judul:"Musim Hujan 2026/2027",zom:ZOM11.map(x=>({no:x.no,wil:x.wil,awal:(ZOM_PMH[x.no]||[])[0]||(x.okt?"Oktober 2026":"Nov 2026 – Mar 2027"),banding:x.banding,sifat:x.sifat,puncak:(ZOM_PMH[x.no]||[])[3]||"",semula:(PMHU_SEMULA[x.no]||{}).awal||""}))}}

/* =====================================================================
   INFO WILAYAH SAYA
   ===================================================================== */
const KAB_SEMUA=[...PB7.map(k=>[k,"pb"]),...PBD6.map(k=>[k,"pbd"])];
const normKab=s=>{s=String(s||"").replace(/^\s*(kabupaten|kab\.?)\s*/i,"").trim();return /^sorong$/i.test(s)?"Kab. Sorong":s};
const samaKab=(a,b)=>normKab(a).toLowerCase()===normKab(b).toLowerCase();
function distrikPerKab(zom){const m={};zom.forEach(z=>{ejaWil(z.wil).replace(/(Kab\.|Kabupaten|Kota)\s*([^(;]+?)\s*\(([^)]*)\)/gi,(_,j,nama,d)=>{const kab=/kota/i.test(j)?"Kota "+nama.replace(/^kota\s*/i,"").trim():normKab(nama);
  d.split(/,|\bdan\b/).map(x=>x.trim().replace(/\.$/,"")).filter(Boolean).forEach(x=>{const k=(m[kab]=m[kab]||{});(k[x]=k[x]||[]).push(z.no)})})});return m}
function zomUntuk(kab,dis){const t0=zomTerbaru(),t={...t0,zom:[...t0.zom,...NONZOM.filter(n=>!t0.zom.some(z=>+z.no===n)).map(n=>({no:n,wil:WIL_NONZOM[n]||"",awal:"",banding:"",sifat:(ZOM_PMH[n]||[])[2]||SIFAT_NONZOM[n]||"",puncak:(ZOM_PMH[n]||[])[3]||"",tipe1:1}))]},pk=distrikPerKab(t.zom);const kk=Object.keys(pk).find(k=>samaKab(k,kab));const d=kk?pk[kk]:{};
 const tb=String((WIL_ADM().distrik||{})[slugK(kab)]||"").split(/,|\n/).map(x=>x.trim()).filter(Boolean);
 const nos=dis?(d[dis]||[]):[...new Set(Object.values(d).flat())];return {t,nos,distrik:[...new Set([...Object.keys(d),...tb])].sort()}}
function baris(rows,kab){return (Array.isArray(rows)?rows:[]).find(r=>samaKab(r.kab,kab))}
/* lampu lalu lintas: ok = aman/seperti biasa, warn = perlu waspada, bad = perlu perhatian, info = keterangan */
const LAMPU_TEKS={ok:"Aman / seperti biasa",warn:"Perlu waspada",bad:"Perlu perhatian",info:""};
function lampuHujan(ch,sh){ch=String(ch||"");sh=String(sh||"");if(/sangat tinggi/i.test(ch))return "bad";if(/bawah normal|atas normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh))return "warn";if(/tinggi/i.test(ch)&&!/sangat/i.test(ch))return "warn";return ch||sh?"ok":"info"}
function lampuSpi(k){k=String(k||"");return /ekstrem kering|sangat kering/i.test(k)?"bad":/kering/i.test(k)&&!/normal/i.test(k)?"warn":/sangat basah|ekstrem basah/i.test(k)?"warn":k?"ok":"info"}
const IKON_W={per:"⚠️",musim:"📅",kemarau:"🌤️",hujan:"🌧️",pra:"🌦️",spi:"☀️",normal:"📊",alat:"📡",catat:"📝"};
function isiWilayah(kab,dis){const baris=(rows,k)=>barisDis(rows,k,dis);WIL_FB=0;const prov=(KAB_SEMUA.find(x=>x[0]===kab)||[])[1]||"pb",provNama=prov==="pbd"?"Papua Barat Daya":"Papua Barat";
 const {t,nos}=zomUntuk(kab,dis),zs=t.zom.filter(z=>nos.includes(z.no)),kem=zomNorm(IK().musim_kemarau).filter(z=>nos.includes(z.no));
 const an=bagIK("analisis"),pr=(bagIK("prakiraan").bulan||[]),sp=bagIK("spi");
 const ra=baris(an[prov],kab),rs=baris(sp[prov],kab);
 const kunciCari=normKab(kab).replace(/^Kab\. /,"").toLowerCase();
 const per=daftarPeringatan().filter(x=>{if(Array.isArray(x.kab)&&x.kab.length)return x.kab.some(k=>samaKab(k,kab));const w=String(x.wilayah||"").toLowerCase();return w.includes(kunciCari)||(x.pusat&&(prov==="pbd"?/papua barat daya/.test(w):/papua barat(?!\s*daya)/.test(w)))});
 const alat=ALAT.filter(a=>a.wil&&samaKab(a.wil,kab));
 const kartu=(judul,isi,arti,manual,lv,ik)=>`<div class="card wilk reveal lv-${lv||"info"}"><span class="eyebrow">${ik?`<i class="wik" aria-hidden="true">${ik}</i>`:""}${judul}${manual?"":ik===IKON_W.per?OTO_C:ik===IKON_W.alat?OTO:OTO_K}</span>${lv&&lv!=="info"?`<span class="lampu"><i></i>${LAMPU_TEKS[lv]}</span>`:""}${isi}${arti?`<p class="wilarti"><b>Artinya:</b> ${arti}</p>`:""}</div>`;
 const out=[],cat=(WIL_ADM().catatan||{})[slugK(kab)];
 if(cat)out.push(kartu("Catatan dari kami",`<p class="wilp">${esc(cat).replace(/\n/g,"<br>")}</p>`,"",1,"info",IKON_W.catat));
 out.push(kartu("Peringatan dini",per.length?per.map(x=>`<p class="wilp"><span class="pill ${x.status==="awas"?"bad":x.status==="siaga"?"bad":"warn"}">${NAMA_STATUS[x.status]}</span> ${JENIS_PENDEK[x.jenis]} · ${esc(potong(x.wilayah,90))}</p>`).join(""):`<p class="wilp"><span class="pill ok">Tidak ada</span> Tidak ada peringatan untuk ${esc(kab)} saat ini.</p>`,
  per.length?`ada peringatan ${per.map(x=>NAMA_STATUS[x.status]).join(", ")} yang mencakup wilayah ini. Buka <a href="${linkJenis(per[0].jenis)}">halaman peringatan</a> untuk langkah yang perlu dilakukan.`:"",0,per.some(x=>x.status==="awas"||x.status==="siaga")?"bad":per.length?"warn":"ok",IKON_W.per));
 {const kd=typeof kartuDasWil==="function"?kartuDasWil(kab,dis):null;if(kd)out.push(kartu(kd.judul,kd.isi,kd.arti,1,kd.lv,IKON_W.pra))} out.push(kartu(t.judul,zs.length?zs.map(z=>`<p class="wilp"><b>ZOM ${esc(z.no)}</b> · ${z.tipe1?"Tipe 1 Musim (hujan hampir sepanjang tahun)":"awal "+esc(z.awal||"–")}${semulaHTML(z)}${z.banding?` · <span class="pill ${pillBanding(z.banding)}">${esc(z.banding)}</span>`:""}${z.sifat?` · <span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:""}${z.puncak?` · puncak ${esc(z.puncak)}`:""}</p>`).join(""):`<p class="wilp">${dis?"Distrik ini":"Kabupaten ini"} tidak tercantum di daftar Zona Musim yang kami terima, kemungkinan termasuk <b>Tipe 1 Musim</b> (hujan hampir sepanjang tahun).</p>`,
  zs.some(z=>!z.tipe1)?`musim hujan di ${dis?esc(dis):esc(kab)} diprediksi dimulai ${esc(zs.find(z=>!z.tipe1).awal||"–")}${zs.find(z=>!z.tipe1).sifat?`, dengan hujan ${SIFAT_ARTI(zs.find(z=>!z.tipe1).sifat)}`:""}.`:zs.length?`${dis?esc(dis):esc(kab)} termasuk Tipe 1 Musim: hujan turun hampir sepanjang tahun, jadi tidak ada awal musim.${zs[0].sifat?` Hujan musim ini diprediksi ${SIFAT_ARTI(zs[0].sifat)}.`:""}`:"",0,"info",IKON_W.musim));
 if(kem.length)out.push(kartu("Musim Kemarau "+esc((IK().musim_kemarau||{}).periode||""),kem.map(z=>`<p class="wilp"><b>ZOM ${esc(z.no)}</b> · awal ${esc(z.awal||"–")}${semulaHTML(z)}${z.sifat?` · <span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:""}${z.puncak?` · puncak ${esc(z.puncak)}`:""}</p>`).join(""),"",0,"info",IKON_W.kemarau));
 if(ra)out.push(kartu("Hujan "+esc(an.bulan||"bulan lalu"),`<p class="wilp">${chip2(ra.ch)} ${chip2(ra.sh)}</p>${ra.ket?`<p class="wilp">${esc(ra.ket)}</p>`:""}`,HUJAN_ARTI(ra.ch)?`turun ${HUJAN_ARTI(ra.ch)}${SIFAT_ARTI(ra.sh)?", "+SIFAT_ARTI(ra.sh):""}.${teksNormal(kab,an.bulan,ra.sh)}`:"",0,lampuHujan(ra.ch,ra.sh),IKON_W.hujan));
 pr.forEach(m=>{const r=baris(m[prov],kab);if(r)out.push(kartu("Prakiraan "+esc(m.bulan),`<p class="wilp">${chip2(r.ch)} ${chip2(r.sh)}</p>${r.ket?`<p class="wilp">${esc(r.ket)}</p>`:""}`,HUJAN_ARTI(r.ch)?`diprakirakan turun ${HUJAN_ARTI(r.ch)}${SIFAT_ARTI(r.sh)?", "+SIFAT_ARTI(r.sh):""}.${teksNormal(kab,m.bulan,r.sh)}`:"",0,lampuHujan(r.ch,r.sh),IKON_W.pra))});
 if(rs)out.push(kartu("Kekeringan (SPI) "+esc(sp.bulan||""),`<p class="wilp">${chip2(rs.kat)}</p>${rs.ket?`<p class="wilp">${esc(rs.ket)}</p>`:""}`,artiKartu({kunci:"spi",nilai:rs.kat}),0,lampuSpi(rs.kat),IKON_W.spi));
 {const kn=kartuNormal(kab);if(kn)out.push(kartu("Normal hujan bulanan",kn,"",1,"info",IKON_W.normal))}
 {const ke=kartuElNino(kab);if(ke)out.push(kartu("Bila El Niño seperti sekarang",ke,"",1,"info","🌊"))}
 out.push(kartu("Alat pengamatan di wilayah ini",alat.length?alat.map(a=>{const r=LAST[a.id],n=(r&&r.nilai)||{},hj=nv(n,"hujan"),su=nv(n,"suhu"),v=(cek,x,d,u,lab)=>`<div><span>${lab}</span>${cek?`<b class="cek">${CEK_TEKS}</b>`:`<b>${typeof x==="number"?fmt(x,d):"–"}<small> ${u}</small></b>`}</div>`;
  return `<div class="walat"><a href="#alat-${a.id}">${esc(a.nama)} ›</a>${r?`<div class="walatv">${sensorTampil("hujan",a.id)?v(sensorCek(n,"hujan"),hj,1,"mm","Hujan hari ini"):""}${a.jenis==="AWS"&&sensorTampil("suhu",a.id)?v(sensorCek(n,"suhu"),su,1,"°C","Suhu"):""}</div>`:`<p class="wilp">Belum ada data</p>`}</div>`}).join(""):`<p class="wilp">Belum ada AWS/ARG kami di wilayah ini. Lihat <a href="#peralatan">semua peralatan</a>.</p>`,"",0,"info",IKON_W.alat));
 out.push(`<div class="card wilk reveal lv-info" id="wilPos" data-kab="${esc(kab)}"><span class="eyebrow"><i class="wik" aria-hidden="true">${IKON_W.hujan}</i>Pos hujan</span><p class="wilp">Memuat data pos hujan…</p></div>`);setTimeout(phIsiWilayah,30);
 /* ringkasan 5 detik */
 const nama=dis?dis+", "+namaKab(kab):namaKab(kab),bi=new Date().getMonth(),blnIni=pr.find(m=>idxBulan(m.bulan)===bi)||pr[0],rb=blnIni&&baris(blnIni[prov],kab);
 const sifatPendek=sh=>/bawah normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh)?"lebih kering dari biasanya":/atas normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh)?"lebih basah dari biasanya":/normal/i.test(sh)?"seperti biasanya":"";
 const hujanPendek=ch=>/sangat tinggi/i.test(ch)?"hujan sangat banyak":/tinggi/i.test(ch)?"hujan banyak":/menengah|sedang/i.test(ch)?"hujan sedang":/rendah/i.test(ch)?"hujan sedikit":"";
 const R=[];
 R.push(per.length?[per.some(x=>x.status==="awas"||x.status==="siaga")?"bad":"warn","⚠️",`Ada peringatan ${per.map(x=>NAMA_STATUS[x.status]+" "+(JENIS_PENDEK[x.jenis]||"")).join(", ").toLowerCase()}`]:["ok","✅","Tidak ada peringatan dini saat ini"]);
 if(rb)R.push([lampuHujan(rb.ch,rb.sh),"🌧️",`${besarAwal(String(blnIni.bulan||"").split(" ")[0]||"Bulan ini")}: ${[hujanPendek(rb.ch),sifatPendek(rb.sh)].filter(Boolean).join(", ")||esc(rb.ch)}${normalKab(kab,idxBulan(blnIni.bulan))?` <small>(biasanya ${normalKab(kab,idxBulan(blnIni.bulan))} mm)</small>`:""}`]);
 if(rs)R.push([lampuSpi(rs.kat),"☀️",lampuSpi(rs.kat)==="ok"&&!/kering/i.test(rs.kat)?"Belum ada kekeringan":"Kekeringan: "+esc(String(rs.kat).toLowerCase())]);
 if(zs.some(z=>!z.tipe1&&z.awal))R.push(["info","📅",`${/kemarau/i.test(t.judul)?"Musim kemarau":"Musim hujan"} mulai ${esc(zs.find(z=>!z.tipe1&&z.awal).awal)}`]);else if(!zs.some(z=>!z.tipe1))R.push(["info","📅","Hujan hampir sepanjang tahun (tanpa musim tegas)"]);
 {const g=gelTerkini();if(gelDekat(g))R.push(["info","🌀",`Gelombang atmosfer${g.gel.length?" ("+esc(daftarJ(g.gel.map(x=>x==="Low Frequency"?"frekuensi rendah":x)))+")":""} aktif di ${esc(wilTimur(g)||"Indonesia bagian timur")}: hujan bisa lebih sering beberapa hari <small>(skala wilayah, bukan khusus kabupaten ini · BMKG ${tglPendek(g.tanggal)})</small>`])}
 {const a0=alat.find(a=>LAST[a.id]&&sensorTampil("hujan",a.id)&&typeof nv(LAST[a.id].nilai||{},"hujan")==="number"&&!sensorCek(LAST[a.id].nilai||{},"hujan"));if(a0){const n=LAST[a0.id].nilai||{},su=nv(n,"suhu");R.push(["info","📡",`Hujan hari ini ${fmt(nv(n,"hujan"),1)} mm${a0.jenis==="AWS"&&sensorTampil("suhu",a0.id)&&typeof su==="number"&&!sensorCek(n,"suhu")?" · suhu "+fmt(su,1)+" °C":""} (${esc(a0.nama)})`])}}
 const teksWA=`Info iklim ${nama} (BMKG Staklim Papua Barat):\n`+R.map(r=>r[1]+" "+r[2].replace(/<[^>]+>/g,"").replace(/&amp;/g,"&")).join("\n")+`\n\nSelengkapnya: ${location.origin.startsWith("http")?location.origin:"https://staklim-pabar.pages.dev"}${RUTE_PATH?"/"+slugKab(kab):"/"+slugKab(kab)}`;
 const ring=`<div class="wilring"><div class="wrh"><span class="eyebrow">Ringkasan ${esc(nama)}</span><a class="wabtn" href="https://wa.me/?text=${encodeURIComponent(teksWA)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>Bagikan ke WhatsApp</a></div>
 <ul>${R.map(([lv,ik,tx])=>`<li class="lv-${lv}"><i aria-hidden="true">${ik}</i><span>${tx}</span></li>`).join("")}</ul><p class="wrket">Penjelasan lengkap tiap bagian ada di bawah ↓</p></div>`;
 return `${ring}<div class="wilgrid">${out.join("")}</div>
 <div class="wilbaca"><b>Cara membaca:</b> <span class="lampu lv-ok"><i></i>hijau</span> aman/seperti biasa, <span class="lampu lv-warn"><i></i>kuning</span> perlu waspada (lebih kering atau lebih basah dari biasanya), <span class="lampu lv-bad"><i></i>merah</span> perlu perhatian. <b>Kategori hujan</b> (Rendah sampai Sangat Tinggi) menunjukkan jumlah hujan sebulan, sedangkan <b>sifat hujan</b> membandingkannya dengan rata-rata 30 tahun (1991–2020) bulan yang sama di wilayah ini: Bawah Normal kurang dari 85%, Normal 85–115%, Atas Normal lebih dari 115%.</div>
 ${WIL_FB&&dis?`<p class="note">Buletin belum merinci Distrik ${esc(dis)}, jadi nilai hujan bulanan memakai nilai ${esc(normKab(kab))}.</p>`:""}<p class="note">Ringkasan dari dokumen terbaru kami dan BMKG Pusat untuk ${esc(provNama)}. Rincian ada di halaman Iklim masing-masing.</p>`}
/* Normal 1991–2020 rata-rata wilayah tiap kabupaten/kota (mm/bulan) dan catatan hujan saat El Niño, dihitung dari data grid 0,05° kantor (DATA BARU).
   Dibangun oleh poshujan/bangun_normal.py. Angka normal yang diisi di Admin > Info Wilayah menggantikan angka bawaan ini. */
const NORMAL_BAWAAN={"Manokwari":[196,176,203,248,207,171,176,209,148,133,159,194],"Manokwari Selatan":[136,121,159,185,185,163,182,199,137,158,145,145],"Pegunungan Arfak":[160,100,144,250,275,174,227,310,188,280,151,130],"Teluk Bintuni":[250,236,218,250,254,244,237,184,216,237,211,229],"Teluk Wondama":[232,202,172,238,217,274,261,253,238,234,217,215],"Fakfak":[283,272,266,275,243,232,206,161,185,211,207,262],"Kaimana":[271,244,228,270,257,267,247,212,226,243,247,312],"Kota Sorong":[203,183,236,240,280,356,384,248,278,222,216,219],"Kab. Sorong":[240,219,245,258,301,409,398,260,300,258,227,240],"Sorong Selatan":[278,269,282,283,313,326,310,245,278,240,223,268],"Raja Ampat":[207,174,213,226,238,305,256,213,187,147,187,214],"Maybrat":[271,253,227,278,365,430,446,325,365,389,273,253],"Tambrauw":[249,129,144,257,293,379,424,338,367,361,204,146]};
const NORMAL_PROV={"pb":[249,228,218,256,246,242,232,202,208,229,213,246],"pbd":[244,191,210,256,292,365,365,277,298,274,214,210]};
const ENSO_KOMPOSIT={"ket":[{"k":"JAS_LEMAH","musim":"Juli–September","kuat":"lemah","tahun":[1991,2002,2004,2009]},{"k":"JAS_MODERATE","musim":"Juli–September","kuat":"moderat","tahun":[2023]},{"k":"JAS_STRONG","musim":"Juli–September","kuat":"kuat","tahun":[1997,2015]},{"k":"ASO_LEMAH","musim":"Agustus–Oktober","kuat":"lemah","tahun":[1991,1994,2004,2006,2014,2018]},{"k":"ASO_MODERATE","musim":"Agustus–Oktober","kuat":"moderat","tahun":[2002]},{"k":"ASO_STRONG","musim":"Agustus–Oktober","kuat":"kuat","tahun":[1997,2015,2023]},{"k":"MAM_LEMAH","musim":"Maret–Mei","kuat":"lemah","tahun":[1998,2015,2019]},{"k":"MAM_MODERATE","musim":"Maret–Mei","kuat":"moderat","tahun":[1992,2016]},{"k":"AMJ_LEMAH","musim":"April–Juni","kuat":"lemah","tahun":[1992,1997,2019,2023]},{"k":"AMJ_MODERATE","musim":"April–Juni","kuat":"moderat","tahun":[1992,2015]},{"k":"MJJ_LEMAH","musim":"Mei–Juli","kuat":"lemah","tahun":[1991,1992,2002,2019,2023]},{"k":"MJJ_MODERATE","musim":"Mei–Juli","kuat":"moderat","tahun":[1997,2015]}],"kab":{"Manokwari":{"ASO_LEMAH":[-26,-40,3],"ASO_MODERATE":[-37,-37,-37],"ASO_STRONG":[-49,-68,-19],"MAM_LEMAH":[-5,-17,10],"MAM_MODERATE":[0,-4,5],"AMJ_LEMAH":[-10,-42,12],"AMJ_MODERATE":[2,-8,12],"MJJ_LEMAH":[-9,-25,5],"MJJ_MODERATE":[-14,-18,-10],"JAS_LEMAH":[-28,-43,-16],"JAS_MODERATE":[-21,-21,-21],"JAS_STRONG":[-42,-47,-36]},"Manokwari Selatan":{"ASO_LEMAH":[-31,-45,-4],"ASO_MODERATE":[-56,-56,-56],"ASO_STRONG":[-53,-77,-12],"MAM_LEMAH":[-12,-24,9],"MAM_MODERATE":[-6,-12,0],"AMJ_LEMAH":[-16,-54,5],"AMJ_MODERATE":[-19,-25,-14],"MJJ_LEMAH":[-19,-27,-10],"MJJ_MODERATE":[-34,-35,-32],"JAS_LEMAH":[-28,-58,0],"JAS_MODERATE":[-31,-31,-31],"JAS_STRONG":[-55,-58,-51]},"Pegunungan Arfak":{"ASO_LEMAH":[-23,-33,-14],"ASO_MODERATE":[-36,-36,-36],"ASO_STRONG":[-56,-63,-44],"MAM_LEMAH":[-10,-23,12],"MAM_MODERATE":[-1,-2,0],"AMJ_LEMAH":[-16,-46,0],"AMJ_MODERATE":[-12,-25,0],"MJJ_LEMAH":[-14,-26,3],"MJJ_MODERATE":[-24,-26,-23],"JAS_LEMAH":[-18,-40,8],"JAS_MODERATE":[-33,-33,-33],"JAS_STRONG":[-46,-46,-46]},"Teluk Bintuni":{"ASO_LEMAH":[-24,-40,-7],"ASO_MODERATE":[-48,-48,-48],"ASO_STRONG":[-51,-66,-24],"MAM_LEMAH":[-14,-24,-3],"MAM_MODERATE":[-3,-10,4],"AMJ_LEMAH":[-20,-45,-9],"AMJ_MODERATE":[-25,-38,-11],"MJJ_LEMAH":[-16,-26,-5],"MJJ_MODERATE":[-33,-33,-33],"JAS_LEMAH":[-16,-52,11],"JAS_MODERATE":[-11,-11,-11],"JAS_STRONG":[-42,-44,-41]},"Teluk Wondama":{"ASO_LEMAH":[-25,-37,-13],"ASO_MODERATE":[-45,-45,-45],"ASO_STRONG":[-54,-69,-29],"MAM_LEMAH":[-7,-18,7],"MAM_MODERATE":[0,-5,6],"AMJ_LEMAH":[-26,-48,-9],"AMJ_MODERATE":[-20,-31,-9],"MJJ_LEMAH":[-23,-36,-5],"MJJ_MODERATE":[-31,-34,-27],"JAS_LEMAH":[-19,-48,1],"JAS_MODERATE":[-33,-33,-33],"JAS_STRONG":[-46,-49,-44]},"Fakfak":{"ASO_LEMAH":[-24,-45,15],"ASO_MODERATE":[-60,-60,-60],"ASO_STRONG":[-65,-73,-52],"MAM_LEMAH":[-16,-24,-2],"MAM_MODERATE":[-6,-18,6],"AMJ_LEMAH":[-25,-47,-1],"AMJ_MODERATE":[-32,-37,-27],"MJJ_LEMAH":[-14,-30,23],"MJJ_MODERATE":[-41,-45,-37],"JAS_LEMAH":[-19,-60,5],"JAS_MODERATE":[-2,-2,-2],"JAS_STRONG":[-51,-59,-43]},"Kaimana":{"ASO_LEMAH":[-25,-37,-12],"ASO_MODERATE":[-49,-49,-49],"ASO_STRONG":[-58,-69,-36],"MAM_LEMAH":[-9,-18,7],"MAM_MODERATE":[3,3,4],"AMJ_LEMAH":[-24,-49,-13],"AMJ_MODERATE":[-23,-34,-13],"MJJ_LEMAH":[-21,-32,-12],"MJJ_MODERATE":[-35,-40,-31],"JAS_LEMAH":[-21,-54,4],"JAS_MODERATE":[-29,-29,-29],"JAS_STRONG":[-46,-49,-43]},"Kota Sorong":{"ASO_LEMAH":[-44,-62,-28],"ASO_MODERATE":[-82,-82,-82],"ASO_STRONG":[-64,-76,-41],"MAM_LEMAH":[-8,-34,37],"MAM_MODERATE":[-19,-20,-17],"AMJ_LEMAH":[-31,-71,-7],"AMJ_MODERATE":[-30,-42,-19],"MJJ_LEMAH":[-23,-47,-10],"MJJ_MODERATE":[-50,-62,-39],"JAS_LEMAH":[-46,-89,-26],"JAS_MODERATE":[-34,-34,-34],"JAS_STRONG":[-60,-63,-57]},"Kab. Sorong":{"ASO_LEMAH":[-35,-53,-20],"ASO_MODERATE":[-68,-68,-68],"ASO_STRONG":[-57,-75,-23],"MAM_LEMAH":[-16,-29,10],"MAM_MODERATE":[-14,-17,-12],"AMJ_LEMAH":[-38,-60,-18],"AMJ_MODERATE":[-31,-45,-18],"MJJ_LEMAH":[-25,-45,-5],"MJJ_MODERATE":[-42,-52,-32],"JAS_LEMAH":[-29,-73,-7],"JAS_MODERATE":[-23,-23,-23],"JAS_STRONG":[-50,-58,-43]},"Sorong Selatan":{"ASO_LEMAH":[-28,-50,-10],"ASO_MODERATE":[-58,-58,-58],"ASO_STRONG":[-47,-75,5],"MAM_LEMAH":[-18,-31,-2],"MAM_MODERATE":[-3,-14,7],"AMJ_LEMAH":[-30,-49,-15],"AMJ_MODERATE":[-30,-44,-15],"MJJ_LEMAH":[-18,-34,-9],"MJJ_MODERATE":[-39,-46,-32],"JAS_LEMAH":[-19,-63,13],"JAS_MODERATE":[19,19,19],"JAS_STRONG":[-51,-58,-43]},"Raja Ampat":{"ASO_LEMAH":[-43,-64,-19],"ASO_MODERATE":[-78,-78,-78],"ASO_STRONG":[-63,-84,-28],"MAM_LEMAH":[-12,-21,0],"MAM_MODERATE":[-17,-19,-14],"AMJ_LEMAH":[-31,-51,-22],"AMJ_MODERATE":[-31,-37,-26],"MJJ_LEMAH":[-26,-37,-17],"MJJ_MODERATE":[-50,-51,-48],"JAS_LEMAH":[-42,-83,-20],"JAS_MODERATE":[-26,-26,-26],"JAS_STRONG":[-66,-71,-62]},"Maybrat":{"ASO_LEMAH":[-24,-41,-8],"ASO_MODERATE":[-46,-46,-46],"ASO_STRONG":[-54,-67,-29],"MAM_LEMAH":[-18,-33,-1],"MAM_MODERATE":[-5,-11,0],"AMJ_LEMAH":[-33,-53,-13],"AMJ_MODERATE":[-30,-48,-13],"MJJ_LEMAH":[-20,-43,2],"MJJ_MODERATE":[-33,-41,-25],"JAS_LEMAH":[-13,-53,14],"JAS_MODERATE":[-18,-18,-18],"JAS_STRONG":[-41,-51,-31]},"Tambrauw":{"ASO_LEMAH":[-21,-40,-5],"ASO_MODERATE":[-40,-40,-40],"ASO_STRONG":[-55,-60,-45],"MAM_LEMAH":[-10,-19,5],"MAM_MODERATE":[-5,-8,-2],"AMJ_LEMAH":[-28,-50,-1],"AMJ_MODERATE":[-20,-39,-1],"MJJ_LEMAH":[-17,-41,10],"MJJ_MODERATE":[-27,-29,-25],"JAS_LEMAH":[-10,-44,15],"JAS_MODERATE":[-36,-36,-36],"JAS_STRONG":[-38,-39,-36]}},"prov":{"pb":{"ASO_LEMAH":[-25,-39,-8],"ASO_MODERATE":[-49,-49,-49],"ASO_STRONG":[-56,-68,-33],"MAM_LEMAH":[-12,-21,2],"MAM_MODERATE":[-1,-5,3],"AMJ_LEMAH":[-22,-47,-10],"AMJ_MODERATE":[-24,-34,-13],"MJJ_LEMAH":[-18,-28,-9],"MJJ_MODERATE":[-34,-35,-33],"JAS_LEMAH":[-19,-53,5],"JAS_MODERATE":[-19,-19,-19],"JAS_STRONG":[-46,-46,-46]},"pbd":{"ASO_LEMAH":[-28,-47,-15],"ASO_MODERATE":[-55,-55,-55],"ASO_STRONG":[-55,-70,-29],"MAM_LEMAH":[-14,-25,4],"MAM_MODERATE":[-9,-12,-6],"AMJ_LEMAH":[-32,-53,-13],"AMJ_MODERATE":[-27,-42,-13],"MJJ_LEMAH":[-21,-40,-4],"MJJ_MODERATE":[-37,-42,-32],"JAS_LEMAH":[-21,-60,3],"JAS_MODERATE":[-22,-22,-22],"JAS_STRONG":[-47,-51,-44]}}};
const normalDasar=kab=>{const a=(WIL_ADM().normal||{})[slugK(kab)];if(a&&a.some(v=>+v>0))return a.map(v=>Math.round(+v||0));const k=Object.keys(NORMAL_BAWAAN).find(n=>samaKab(n,kab));return k?NORMAL_BAWAAN[k]:null};
const kelasNormal=v=>v<100?0:v<150?1:v<200?2:v<300?3:v<400?4:5,KET_NORMAL=["< 100","100–150","150–200","200–300","300–400","> 400"];
const kuatEnso=v=>v>=1.5?"STRONG":v>=1?"MODERATE":v>=.5?"LEMAH":"";
const persenTeks=v=>(v>0?"+":v<0?"−":"")+Math.abs(v)+"%";
/* kartu Info Wilayah: catatan hujan saat El Niño sekuat sekarang */
function kartuElNino(kab){const e=EN(),kls=kuatEnso(+e.enso||0);if(!kls)return "";const nm=Object.keys(ENSO_KOMPOSIT.kab).find(n=>samaKab(n,kab));if(!nm)return "";
 const R=ENSO_KOMPOSIT.ket.filter(x=>x.k.endsWith("_"+kls)&&ENSO_KOMPOSIT.kab[nm][x.k]);if(!R.length)return "";const mx=Math.max(10,...R.map(x=>Math.abs(ENSO_KOMPOSIT.kab[nm][x.k][0])));
 return `<div class="enbar">${R.map(x=>{const v=ENSO_KOMPOSIT.kab[nm][x.k][0];return `<div><span>${x.musim}</span><i class="${v<0?"kur":"tam"}" style="width:${Math.max(4,Math.abs(v)/mx*100).toFixed(0)}%"></i><b>${persenTeks(v)}</b></div>`}).join("")}</div>
 <p class="wilp" style="font-size:13px;color:var(--muted)">Rata-rata hujan dibanding normal pada tahun El Niño ${R[0].kuat} (${[...new Set(R.flatMap(x=>x.tahun))].sort().join(", ")}). Gambaran dari catatan masa lalu, bukan prakiraan. <a href="#enso-iod">Lihat semua musim ›</a></p>`}
/* halaman ENSO: tabel catatan hujan saat El Niño per musim dan kekuatan */
function panelElNino(){const K=ENSO_KOMPOSIT,sel=(o,k)=>{const v=o[k];if(!v)return "–";return `<span class="ph-pill ${v[0]<=-15?"ph-ps0":v[0]>=15?"ph-ps2":"ph-ps1"}">${persenTeks(v[0])}</span>${v[1]!==v[2]?` <small>${persenTeks(v[1])} s.d. ${persenTeks(v[2])}</small>`:""}`},kls=kuatEnso(+EN().enso||0);
 return `<div class="panel" id="panelElNino"><div class="panel-head"><span>Seberapa Besar El Niño Mengurangi Hujan di Wilayah Kita?</span></div><div class="panel-body phskala">
 <p style="margin-top:0">Catatan 1991–2023: rata-rata curah hujan tiga bulanan pada tahun-tahun El Niño, dibanding normalnya. Angka minus berarti hujan lebih sedikit dari biasanya.</p>
 ${tbl(["Musim","Kekuatan El Niño","Papua Barat","Papua Barat Daya","Tahun kejadian"],K.ket.map(x=>[x.musim,(x.k.endsWith("_"+kls)?"<b>"+besarAwal(x.kuat)+"</b> <small>(seperti sekarang)</small>":besarAwal(x.kuat)),sel(K.prov.pb,x.k),sel(K.prov.pbd,x.k),x.tahun.join(", ")]))}
 <p class="note">Dihitung dari data hujan grid 1991–2023 Stasiun Klimatologi Papua Barat. Angka kecil di samping adalah rentang antar tahun. Jumlah tahun kejadian sedikit, jadi ini gambaran dari masa lalu, bukan prakiraan. Angka per kabupaten ada di <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>`}
/* halaman Iklim Papua Barat: normal bulanan semua kabupaten/kota dalam satu tabel berwarna */
function panelNormalKab(){const bi=new Date().getMonth();
 return `<section class="sec"><div class="sechead"><div><span class="eyebrow">Normal Curah Hujan</span><h2>Hujan Rata-rata Bulanan per Kabupaten/Kota</h2></div></div>
 <div class="panel"><div class="panel-head"><span>Normal 1991–2020 (mm per bulan)</span></div><div class="panel-body phskala"><div class="tbl-wrap"><table class="nrmt"><thead><tr><th>Kabupaten/kota</th>${BLN.map((b,i)=>`<th class="${i===bi?"kini":""}">${b}</th>`).join("")}<th>Setahun</th></tr></thead><tbody>
 ${KAB_SEMUA.map(([k,pr],i)=>{const a=normalDasar(k);if(!a)return "";return `${i===0||KAB_SEMUA[i-1][1]!==pr?`<tr class="ph-grp"><th colspan="14">${pr==="pbd"?"Papua Barat Daya":"Papua Barat"}</th></tr>`:""}<tr><td><a href="#${slugKab(k)}">${esc(namaKab(k))}</a></td>${a.map(v=>`<td class="nr nr${kelasNormal(v)}">${v}</td>`).join("")}<td class="ang"><b>${a.reduce((x,y)=>x+y,0).toLocaleString("id-ID")}</b></td></tr>`}).join("")}</tbody></table></div>
 <ul class="ph-leg kotak">${KET_NORMAL.map((t,i)=>`<li><i class="nr${i}"></i><span>${t} mm</span></li>`).join("")}</ul>
 <p class="note">Rata-rata seluruh wilayah tiap kabupaten/kota, dari data hujan grid 0,05° periode 1991–2020. Batas wilayah: BPS 2020. Angka di satu kampung bisa berbeda dari rata-rata kabupatennya; lihat <a href="#pos-hujan">Data Pos Hujan</a> untuk angka per pos.</p></div></div></section>`}
/* pengaturan wilayah dari Admin: normal hujan bulanan (mm), distrik tambahan, catatan */
const WIL_ADM=()=>((KA&&KA.pengaturan&&KA.pengaturan.wilayah)||{});
const slugK=k=>normKab(k).replace(/[^A-Za-z0-9]+/g,"_");
const idxBulan=t=>{const u=urutBulan(t);return u===99999?-1:u%12};
const normalKab=(kab,bi)=>{const a=normalDasar(kab);const v=a&&bi>=0?+a[bi]:0;return v>0?Math.round(v):0};
function teksNormal(kab,bulan,sh){const bi=idxBulan(bulan),n=normalKab(kab,bi),s=String(sh||""),rentang=/–|-/.test(s.replace(/^\s+|\s+$/g,""))&&/normal.*normal/i.test(s);
 if(n){const lo=Math.round(n*.85),hi=Math.round(n*1.15);
  const b=rentang?(/bawah/i.test(s)&&/atas/i.test(s)?` Sifat ${esc(s)} berarti hujan bisa di bawah ±${lo} mm di sebagian wilayah dan di atas ±${hi} mm di wilayah lain.`:/atas/i.test(s)?` Sifat ${esc(s)} berarti hujan sekitar ±${lo} mm atau lebih.`:` Sifat ${esc(s)} berarti hujan sekitar ±${hi} mm atau kurang.`):/bawah/i.test(s)?` Bawah Normal berarti hujan kurang dari ±${lo} mm (85% dari normal).`:/atas/i.test(s)?` Atas Normal berarti hujan lebih dari ±${hi} mm (115% dari normal).`:/normal/i.test(s)?` Normal berarti hujan sekitar ${lo}–${hi} mm.`:"";
  return ` Normalnya (rata-rata 1991–2020) hujan bulan ${BLN_ID[bi]} di ${esc(kab)} sekitar <b>${n} mm</b>.${b}`}
 return ""}
function kartuNormal(kab){const a=normalDasar(kab);if(!a||!a.some(v=>v>0))return "";const mx=Math.max(...a),mn=Math.min(...a.filter(v=>v>0)),bi=new Date().getMonth(),bd=(bi+1)%12;
 return `<div class="nbar berangka" role="img" aria-label="Normal hujan bulanan ${esc(kab)}">${BLN_ID.map((b,i)=>{const v=a[i]||0;return `<div class="${i===bi?"kini":i===bd?"depan":""}" title="${b}: ${v?v+" mm":"–"}"><em>${i===bi||i===bd?v:""}</em><i style="height:${v?Math.max(4,v/mx*78):0}%"></i><span>${b.slice(0,1)}</span></div>`}).join("")}</div>
 <p class="wilp">${BLN_ID[bi]} biasanya <b>${a[bi]} mm</b>, bulan depan (${BLN_ID[bd]}) biasanya <b>${a[bd]} mm</b>.</p>
 <p class="wilp" style="font-size:13px;color:var(--muted)">Paling basah ${BLN_ID[a.indexOf(mx)]} (${mx} mm), paling kering ${BLN_ID[a.indexOf(mn)]} (${mn} mm). Rata-rata 1991–2020 seluruh wilayah ${esc(namaKab(kab))}.</p>`}
let WIL_PILIH=(()=>{try{return JSON.parse(localStorage.getItem("wilayah_v1")||"null")}catch(e){return null}})()||{kab:"Manokwari",dis:""};
P.wilayah=()=>{const {distrik}=zomUntuk(WIL_PILIH.kab,"");
 return head("Info Wilayah","Info Iklim untuk Wilayah Saya","Pilih kabupaten/kota dan distrik tempat Anda tinggal. Semua informasi iklim untuk wilayah itu tampil di satu halaman.")+`
 <div class="card wilpilih"><label>Kabupaten/Kota<select id="wilKab">${["pb","pbd"].map(p=>`<optgroup label="${p==="pb"?"Papua Barat":"Papua Barat Daya"}">${KAB_SEMUA.filter(x=>x[1]===p).map(([k])=>`<option${k===WIL_PILIH.kab?" selected":""}>${esc(k)}</option>`).join("")}</optgroup>`).join("")}</select></label>
 <label>Distrik<select id="wilDis"><option value="">Semua distrik</option>${distrik.map(d=>`<option${d===WIL_PILIH.dis?" selected":""}>${esc(d)}</option>`).join("")}</select></label></div>
 <div id="wilIsi">${isiWilayah(WIL_PILIH.kab,distrik.includes(WIL_PILIH.dis)?WIL_PILIH.dis:"")}</div>
 <section class="sec" data-lipat><div class="sechead"><div><span class="eyebrow">Halaman per wilayah</span><h2>Iklim Setiap Kabupaten/Kota</h2></div></div>
 <div class="kabgrid">${Object.entries(KAB_HAL).map(([s,[kb,pp]])=>`<a href="#${s}"><b>${esc(namaKab(kb))}</b><span>${pp==="pbd"?"Papua Barat Daya":"Papua Barat"}</span></a>`).join("")}</div></section>
 ${awam("Cara memakai halaman ini",["Pilih <b>kabupaten/kota</b>, lalu bila perlu pilih <b>distrik</b>. Pilihan Anda diingat di perangkat ini.","Daftar distrik berasal dari tabel Zona Musim. Distrik yang tidak ada di daftar kemungkinan termasuk wilayah Tipe 1 Musim (hujan hampir sepanjang tahun).","Informasi hujan, prakiraan, dan kekeringan berlaku per kabupaten; prediksi musim berlaku per Zona Musim.",
 "<b>Kategori hujan</b> (Rendah, Menengah, Tinggi, Sangat Tinggi) menunjukkan jumlah hujan dalam mm. <b>Sifat hujan</b> (Bawah Normal, Normal, Atas Normal) membandingkannya dengan rata-rata 30 tahun di wilayah itu: kurang dari 85%, 85–115%, atau lebih dari 115%. Jadi hujan bisa tergolong cukup tetapi tetap lebih kering dari biasanya.",
 "Titik hijau berkedip menandai informasi yang diperbarui sendiri dari dokumen dan data terbaru."])}`};
function pasangWilayah(){const k=document.getElementById("wilKab"),d=document.getElementById("wilDis");if(!k||!d)return;
 const simpan=()=>{try{localStorage.setItem("wilayah_v1",JSON.stringify(WIL_PILIH))}catch(e){}};
 k.onchange=()=>{WIL_PILIH={kab:k.value,dis:""};simpan();const {distrik}=zomUntuk(k.value,"");d.innerHTML=`<option value="">Semua distrik</option>`+distrik.map(x=>`<option>${esc(x)}</option>`).join("");document.getElementById("wilIsi").innerHTML=isiWilayah(k.value,"");pasangIstilah(document.getElementById("wilIsi"));pasangReveal()};
 d.onchange=()=>{WIL_PILIH={kab:k.value,dis:d.value};simpan();document.getElementById("wilIsi").innerHTML=isiWilayah(k.value,d.value);pasangIstilah(document.getElementById("wilIsi"));pasangReveal()}}

/* =====================================================================
   PENJELASAN ISTILAH SAAT DITEKAN
   ===================================================================== */
const ISTILAH={"zom":"Zona Musim: wilayah yang pola hujannya punya perbedaan jelas antara musim hujan dan musim kemarau.","zona musim":"Wilayah yang pola hujannya punya perbedaan jelas antara musim hujan dan musim kemarau (disingkat ZOM).",
 "non-zom":"Wilayah tanpa perbedaan jelas antara musim hujan dan kemarau; hujan turun hampir sepanjang tahun.","tipe 1 musim":"Wilayah dengan hujan hampir sepanjang tahun, tanpa musim kemarau yang jelas (Non-ZOM).",
 "dasarian":"Periode 10 harian: tanggal 1–10 (Dasarian I), 11–20 (Dasarian II), dan 21 sampai akhir bulan (Dasarian III).",
 "atas normal":"Hujan lebih banyak dari rata-rata 30 tahun di tempat itu (lebih dari 115%).","bawah normal":"Hujan lebih sedikit dari rata-rata 30 tahun di tempat itu (kurang dari 85%).",
 "sifat hujan":"Perbandingan hujan yang turun dengan rata-rata 30 tahun di tempat yang sama: Bawah Normal, Normal, atau Atas Normal.",
 "curah hujan":"Banyaknya hujan, diukur dalam milimeter (mm). 1 mm sama dengan 1 liter air di setiap 1 meter persegi.",
 "spi":"Indeks kekeringan: membandingkan hujan dengan kebiasaannya selama puluhan tahun. Minus berarti lebih kering, plus lebih basah.",
 "hth":"Hari Tanpa Hujan: jumlah hari berturut-turut tanpa hujan berarti (kurang dari 1 mm).","hari tanpa hujan":"Jumlah hari berturut-turut tanpa hujan berarti (kurang dari 1 mm) di satu pos hujan.",
 "el niño":"Memanasnya laut di Samudra Pasifik bagian tengah. Di Papua biasanya membuat hujan berkurang.","la niña":"Mendinginnya laut di Samudra Pasifik bagian tengah. Di Papua biasanya membuat hujan bertambah.",
 "enso":"Gabungan El Niño, La Niña, dan kondisi netral di Samudra Pasifik.","iod":"Indian Ocean Dipole: beda suhu laut Samudra Hindia bagian barat dan timur.","dmi":"Dipole Mode Index: angka untuk mengukur IOD. Di atas +0,4 positif, di bawah −0,4 negatif.",
 "niño 3.4":"Wilayah laut di Pasifik tengah yang suhunya dipakai untuk menentukan El Niño atau La Niña.","anomali":"Selisih dari nilai rata-rata normalnya.",
 "aws":"Automatic Weather Station: alat yang mengukur suhu, kelembapan, angin, tekanan, radiasi, dan hujan.","arg":"Automatic Rain Gauge: alat pengukur hujan."};
const kunciIstilah=k=>{k=k.toLowerCase().replace("nino","niño").replace("nina","niña");return ISTILAH[k]?k:null};
const RE_ISTILAH=new RegExp("(^|[^\\p{L}\\d-])("+Object.keys(ISTILAH).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace("ñ","[ñn]")).join("|")+")(?![\\p{L}\\d])","iu");
function pasangIstilah(root){if(!root)return;const sudah=new Set([...root.querySelectorAll(".istilah")].map(b=>b.dataset.istilah));
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||p.closest("a,button,svg,script,style,textarea,input,select,option,h1,h2,h3,label,.istilah,.hslider,.admbox,.legend,figcaption,.pill,.kab b,th,.crumb,.eyebrow,.panel-head,.ph-kpi,.ph-meter,.ph-leg,.ph-t,.ph-bar"))return NodeFilter.FILTER_REJECT;return RE_ISTILAH.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});
 const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
 nodes.forEach(n=>{let node=n,guard=0;while(node&&guard++<4){const m=node.nodeValue.match(RE_ISTILAH);if(!m)break;const kata=m[2],kk=kunciIstilah(kata);const i=m.index+m[1].length;
  if(!kk||sudah.has(kk)){const rest=node.splitText(i+kata.length);node=rest;continue}
  sudah.add(kk);const after=node.splitText(i);after.nodeValue=after.nodeValue.slice(kata.length);const b=document.createElement("button");b.type="button";b.className="istilah";b.textContent=kata;b.dataset.istilah=kk;b.setAttribute("aria-label",kata+": lihat penjelasan");after.parentNode.insertBefore(b,after);node=after}})}
{const pop=document.createElement("div");pop.id="istilahPop";pop.setAttribute("role","tooltip");pop.hidden=true;document.body.appendChild(pop);let aktif=null;
 const tutup=()=>{pop.hidden=true;if(aktif)aktif.setAttribute("aria-expanded","false");aktif=null};
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".istilah");if(!b){if(!e.target.closest||!e.target.closest("#istilahPop"))tutup();return}
  e.preventDefault();if(aktif===b){tutup();return}tutup();aktif=b;b.setAttribute("aria-expanded","true");
  pop.innerHTML=`<b>${esc(b.textContent)}</b><span>${esc(ISTILAH[b.dataset.istilah]||"")}</span>`;pop.hidden=false;
  const r=b.getBoundingClientRect(),w=Math.min(300,innerWidth-24);pop.style.width=w+"px";let x=r.left+r.width/2-w/2;x=Math.max(12,Math.min(innerWidth-w-12,x));
  const atas=r.bottom+10+pop.offsetHeight>innerHeight;pop.style.left=x+"px";pop.style.top=(atas?r.top-pop.offsetHeight-10:r.bottom+10)+scrollY+"px";pop.classList.toggle("atas",atas)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")tutup()});addEventListener("hashchange",tutup)}

/* =====================================================================
   REKAP HARIAN ALAT + UNDUH CSV
   ===================================================================== */
const REKAP_CACHE={};
const ARAH16=d=>typeof d==="number"?arahMata(d):"";
function rekapHTML(id){const a=ALAT.find(x=>x.id===id);if(!a||!DATA_URL)return "";const r=REKAP_CACHE[id];
 if(!r)return `<div class="panel"><div class="panel-head"><span>Rekap Harian</span></div><div class="panel-body"><p class="note" style="margin:0">Memuat rekap harian…</p></div></div>`;
 if(r.galat||!r.hari||!r.hari.length)return `<div class="panel"><div class="panel-head"><span>Rekap Harian</span></div><div class="panel-body"><p class="note" style="margin:0">Rekap harian belum tersedia. Rekap mulai terkumpul sejak robot data diperbarui, satu baris per hari.</p></div></div>`;
 const bulan=[...new Set(r.hari.map(h=>h[0].slice(0,7)))].reverse(),pilih=r.bulan&&bulan.includes(r.bulan)?r.bulan:bulan[0];
 const rows=r.hari.filter(h=>h[0].startsWith(pilih)).slice().reverse(),aws=a.jenis==="AWS",f=(v,d)=>v==null?"–":fmt(v,d);
 const kolG=aws?[0,"suhu","suhu","rh","hujan","ws","wd"]:[0,"hujan"],pk=arr=>arr.filter((_,i)=>!kolG[i]||sensorTampil(kolG[i],id));
 const namaBln=b=>{const [y,m]=b.split("-");return BLN_ID[+m-1]+" "+y};
 return `<div class="panel" id="rekapPanel"><div class="panel-head"><span>Rekap Harian · ${esc(namaBln(pilih))}${OTO}</span><div class="rekapaksi"><select id="rekapBln" aria-label="Pilih bulan">${bulan.map(b=>`<option value="${b}"${b===pilih?" selected":""}>${esc(namaBln(b))}</option>`).join("")}</select>${unduhCsv()?`<button type="button" class="pbtn kecil" id="rekapCsv" data-id="${esc(id)}">Unduh CSV</button>`:""}</div></div><div class="panel-body">
 ${tbl(pk(aws?["Tanggal","Suhu rata-rata","Suhu min–maks","Kelembapan","Hujan","Angin rata-rata","Arah angin"]:["Tanggal","Hujan"]),rows.map(h=>{const tg=+h[0].slice(8,10)+" "+BLN3[BLN_ID[+h[0].slice(5,7)-1].toLowerCase()]+(h[9]==="berjalan"?" <small>(berjalan)</small>":"");
  const c=h.cek||{},dc='<small class="cek">sensor diperiksa</small>',g=(i,t)=>c[i]?dc:t;
  return pk(aws?[tg,g(1,f(h[1],1)+" °C"),c[2]||c[3]?dc:f(h[2],1)+" – "+f(h[3],1)+" °C",g(4,f(h[4],0)+" %"),g(5,f(h[5],1)+" mm"),g(6,f(h[6],1)+" m/s"),c[6]?"–":h[7]==null?(h[6]===0?"Tenang":"–"):ARAH16(h[7])+" ("+h[7]+"°)"]:[tg,g(5,f(h[5],1)+" mm")])}))}
 <p class="note">Satu hari dihitung pukul 09.00–09.00 WIT (00–24 UTC), mengikuti pencatatan hujan logger. Hujan adalah total harian.${unduhCsv()?" File CSV berisi seluruh rekap (hingga 6 bulan) dan bisa dibuka di Excel.":""}</p></div></div>`}
/* baris rekap: [tgl, suhu rata, suhu min, suhu maks, RH, hujan, angin, arah, jumlah data, (berjalan)] */
const KOLOM_REKAP={1:"suhu",2:"suhu",3:"suhu",4:"rh",5:"hujan",6:"ws"};
function rapikanBarisRekap(h){if(!Array.isArray(h))return h;const b=h.slice();b.cek={};
 Object.entries(KOLOM_REKAP).forEach(([i,k])=>{const v=b[i];if(typeof v==="number"&&(v<BATAS_WAJAR[k][0]||v>BATAS_WAJAR[k][1])){b[i]=null;b.cek[i]=1;if(+i===6)b[7]=null}});return b}
function isiRekap(id){if(!DATA_URL||REKAP_CACHE[id]&&!REKAP_CACHE[id].galat&&Date.now()-REKAP_CACHE[id].t<600000){const b=document.getElementById("rekapBox");if(b)b.innerHTML=rekapHTML(id);return}
 fetch(DATA_URL.replace(/\/terkini$/,"/rekap")+"?id="+encodeURIComponent(sumberId(id))).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{if(Array.isArray(j.hari))j.hari=j.hari.map(rapikanBarisRekap);REKAP_CACHE[id]={...j,t:Date.now()}}).catch(()=>{REKAP_CACHE[id]={galat:1,t:Date.now()}}).then(()=>{const b=document.getElementById("rekapBox");if(b&&cur==="alat-"+id)b.innerHTML=rekapHTML(id)})}
/* lokasi asli alat (dipakai bila tampilan dua AWS ditukar, lihat TUKAR_DATA) */
const LOKASI_ASLI={"STA2288":"Anday, Manokwari","160009":"Ransiki, Manokwari Selatan"};
function infoTukar(id){const sid=sumberId(id);if(sid===id)return null;const asli=ALAT.find(x=>x.id===sid);return asli?{nama:asli.nama,id:sid,lokasi:LOKASI_ASLI[sid]||asli.wil||""}:null}
function tanyaUnduh(id){if(!unduhCsv())return;const a=ALAT.find(x=>x.id===id),t=infoTukar(id);if(!t){unduhCSV(id);return}
 let d=document.getElementById("dlgTukar");if(d)d.remove();d=document.createElement("div");d.id="dlgTukar";d.className="dlgbg";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-labelledby","dlgTukarJ");
 d.innerHTML=`<div class="dlg"><h3 id="dlgTukarJ">Perhatian: tampilan dua AWS ditukar</h3>
 <p>Tampilan data <b>${esc(a.nama)}</b> dan <b>${esc(t.nama)}</b> di web ini sengaja ditukar, karena penamaan di server pusat tertukar.</p>
 <p>Data di halaman <b>${esc(a.nama)}</b> sebenarnya berasal dari alat <b>${esc(t.nama)} (${esc(t.id)})</b> yang berada di <b>${esc(t.lokasi)}</b>. File akan diberi nama sesuai alat aslinya.</p>
 <label class="dlgcek"><input type="checkbox" id="dlgTukarCek"><span>Ya, saya ingin mengunduh data untuk daerah <b>${esc(t.lokasi)}</b></span></label>
 <div class="dlgaksi"><button type="button" class="mini" data-dlg="batal">Batal</button><button type="button" class="pbtn kecil" data-dlg="ok" disabled>Unduh CSV</button></div></div>`;
 document.body.appendChild(d);const ok=d.querySelector('[data-dlg="ok"]'),cek=d.querySelector("#dlgTukarCek"),tutup=()=>{d.remove();document.removeEventListener("keydown",esk)},esk=e=>{if(e.key==="Escape")tutup()};
 cek.onchange=()=>{ok.disabled=!cek.checked};d.onclick=e=>{if(e.target===d||e.target.dataset.dlg==="batal")tutup();else if(e.target.dataset.dlg==="ok"&&cek.checked){tutup();unduhCSV(id)}};document.addEventListener("keydown",esk);cek.focus()}
const ketRekap=h=>[h[9]==="berjalan"?"hari berjalan":"",h.cek&&Object.keys(h.cek).length?"sebagian nilai dikosongkan: sensor sedang diperiksa (nilai tidak wajar)":""].filter(Boolean).join("; ");
function unduhCSV(id){if(!unduhCsv())return;const a=ALAT.find(x=>x.id===id),r=REKAP_CACHE[id];if(!a||!r||!r.hari)return;const t=infoTukar(id),nmAsli=t?t.nama:a.nama,idAsli=t?t.id:a.id,lok=t?t.lokasi:(LOKASI_ASLI[a.id]&&!TUKAR_DATA[a.id]?LOKASI_ASLI[a.id]:a.wil||"");const aws=a.jenis==="AWS",ang=v=>v==null?"":String(v).replace(".",",");
 const kep=aws?["Tanggal (UTC)","Suhu rata-rata (°C)","Suhu minimum (°C)","Suhu maksimum (°C)","Kelembapan rata-rata (%)","Curah hujan (mm)","Kecepatan angin rata-rata (m/s)","Arah angin rata-rata (°)","Arah angin","Jumlah data","Keterangan"]:["Tanggal (UTC)","Curah hujan (mm)","Jumlah data","Keterangan"];
 const kg=aws?[0,"suhu","suhu","suhu","rh","hujan","ws","wd","wd",0,0]:[0,"hujan",0,0],ks=arr=>arr.filter((_,i)=>!kg[i]||sensorTampil(kg[i],id));kep.splice(0,kep.length,...ks(kep));
 const isi=r.hari.map(h=>ks(aws?[h[0],ang(h[1]),ang(h[2]),ang(h[3]),ang(h[4]),ang(h[5]),ang(h[6]),ang(h[7]),h[7]==null?(h[6]===0?"Tenang":""):arahPanjang(h[7]),h[8],ketRekap(h)]:[h[0],ang(h[5]),h[8],ketRekap(h)]));
 const csv="﻿"+["Stasiun Klimatologi Papua Barat - "+nmAsli+" ("+idAsli+")"+(lok?" - lokasi "+lok:""),...(t?["Catatan: di web data ini tampil pada halaman "+a.nama+" karena penamaan di server pusat tertukar. Alat aslinya "+nmAsli+" ("+idAsli+") di "+lok+"."]:[]),"Satu hari = 00.00-24.00 UTC (09.00-09.00 WIT). Pemisah kolom titik koma; desimal koma.",kep.join(";"),...isi.map(x=>x.join(";"))].join("\r\n");
 const u=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})),l=document.createElement("a");l.href=u;l.download=("rekap-harian-"+nmAsli+"-"+idAsli+(lok?"-"+lok:"")).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+$/,"")+".csv";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="rekapBln"){const id=cur.slice(5);if(REKAP_CACHE[id]){REKAP_CACHE[id].bulan=e.target.value;const b=document.getElementById("rekapBox");if(b)b.innerHTML=rekapHTML(id)}}});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#rekapCsv");if(b)tanyaUnduh(b.dataset.id)});

/* =====================================================================
   ADMIN: membaca tabel & peta dari dokumen, menyimpan isi halaman Iklim
   ===================================================================== */
const BAGIAN_CARI={analisis:t=>/(distribusi|analisis)\s+(curah|sifat)\s+hujan/i.test(t)&&!/prakiraan/i.test(t)&&!/hari tanpa hujan/i.test(t),prakiraan:t=>/prakiraan\s+(curah|sifat)\s+hujan\s+bulan/i.test(t),ekstrem:t=>/ekstrem/i.test(t)&&/lebat/i.test(t),
 hth:t=>/hari tanpa hujan/i.test(t),spi:t=>/presipitasi terstandar(?:di)?sasi|\bSPI\b/.test(t)};
const NAMA_BAGIAN={analisis:"analisis hujan",prakiraan:"prakiraan hujan",ekstrem:"hujan ekstrem",hth:"hari tanpa hujan",spi:"SPI",musim:"prediksi musim"};
const kali=(m,n)=>[m[0]*n[0]+m[1]*n[2],m[0]*n[1]+m[1]*n[3],m[2]*n[0]+m[3]*n[2],m[2]*n[1]+m[3]*n[3],m[4]*n[0]+m[5]*n[2]+n[4],m[4]*n[1]+m[5]*n[3]+n[5]];
async function gambarKeBlob(img,maks){const w=img.width,h=img.height,sk=Math.min(1,maks/w),c=document.createElement("canvas");c.width=Math.round(w*sk);c.height=Math.round(h*sk);const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);
 if(img.bitmap)ctx.drawImage(img.bitmap,0,0,c.width,c.height);else if(img.data){const t=document.createElement("canvas");t.width=w;t.height=h;const tc=t.getContext("2d"),id=tc.createImageData(w,h),src=img.data,dst=id.data;
  if(img.kind===3)dst.set(src.subarray(0,dst.length));else if(img.kind===2){for(let i=0,j=0;j<dst.length;i+=3,j+=4){dst[j]=src[i];dst[j+1]=src[i+1];dst[j+2]=src[i+2];dst[j+3]=255}}else return null;tc.putImageData(id,0,0);ctx.drawImage(t,0,0,c.width,c.height)}else return null;
 return new Promise(r=>c.toBlob(r,"image/jpeg",.84))}
function klasPeta(j){const t=j.toLowerCase(),jn=/kemarau/.test(t)?"kemarau":"hujan",dua=/papua barat daya/.test(t)&&/papua barat(?!\s*daya)/.test(t),prov=dua?"":/papua barat daya/.test(t)?"pbd":/papua barat/.test(t)?"pb":"",bulan=besarAwal(((j.match(BLN_RE)||[])[0]||"").toLowerCase());
 if(/musim (hujan|kemarau)/.test(t)){if(/puncak/.test(t))return {k:"musim-puncak",sub:jn,prov};if(/sifat/.test(t))return {k:"musim-sifat",sub:jn,prov};if(/(normal|maju|mundur|banding)/.test(t))return {k:"musim-banding",sub:jn,prov};if(/awal/.test(t))return {k:"musim-awal",sub:jn,prov};return null}
 if(/(prakiraan|prediksi)/.test(t)&&/(curah|sifat) hujan/.test(t))return {k:"prakiraan",sub:/sifat/.test(t)?"sh":"ch",prov,bulan};
 if(/(curah|sifat) hujan/.test(t))return {k:"analisis",sub:/sifat/.test(t)?"sh":"ch",prov,bulan};
 if(/spi|presipitasi/.test(t))return {k:"spi",prov,bulan};if(/hari tanpa hujan|\bhth\b/.test(t))return {k:"hth",prov,bulan};return null}
async function bacaPdfLengkap(file){const L=await muatPdfJs(),O=L.OPS,doc=await L.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise,hal=[],peta=[],tata=[];
 for(let n=1;n<=Math.min(doc.numPages,40);n++){const pg=await doc.getPage(n),tc=await pg.getTextContent();
  const it=tc.items.filter(i=>i.str&&i.str.trim()).map(i=>({s:i.str,x:i.transform[4],y:i.transform[5],w:i.width||0}));hal.push(it.map(i=>i.s).join(" ").replace(/\s+/g," "));tata.push({n,seg:segmenHalaman(it)});
  /* susun baris teks untuk mencari keterangan gambar ("Gambar ...") */
  const baris=[];it.slice().sort((a,b)=>b.y-a.y||a.x-b.x).forEach(i=>{const b=baris.find(z=>Math.abs(z.y-i.y)<3);if(b){b.it.push(i)}else baris.push({y:i.y,it:[i]})});
  baris.forEach(b=>{b.it.sort((a,c)=>a.x-c.x);b.t=b.it.map(i=>i.s).join(" ").replace(/\s+/g," ").trim();b.x0=b.it[0].x;b.x1=Math.max(...b.it.map(i=>i.x+i.w))});
  /* satu baris bisa memuat dua keterangan berdampingan (dua peta sejajar): pisahkan per kata "Gambar" */
  const kapsi=[];baris.forEach((b,i)=>{const mulai=b.it.map((x,j)=>/^\s*Gambar\b/i.test(x.s)||/^\s*Gambar\s*$/i.test(x.s)?j:-1).filter(j=>j>=0);if(!mulai.length){const m=b.t.match(/Gambar\s*\d/i);if(!m)return;mulai.push(0)}
   mulai.forEach((j0,q)=>{const seg=b.it.slice(j0,q+1<mulai.length?mulai[q+1]:undefined),x0=seg[0].x,x1=Math.max(...seg.map(x=>x.x+x.w),x0+60);let t=seg.map(x=>x.s).join(" ");
    const nx=baris[i+1];if(nx&&b.y-nx.y<16&&!/^(gambar|tabel)\b/i.test(nx.t)){const lanj=nx.it.filter(x=>x.x>=x0-20&&x.x<=x1+20&&!/^\s*(gambar|tabel)\b/i.test(x.s));if(lanj.length)t+=" "+lanj.map(x=>x.s).join(" ")}
    t=t.replace(/\s+/g," ").trim().replace(/\b(Papua Barat Daya|Papua Barat)(\s+\1)+/g,"$1").replace(/\b(Papua Barat Daya)(?:\s+(?:Barat\s+Daya|Barat|Daya))+\b/g,"$1");const m=t.match(/Gambar\s*\d[^]*$/i);if(m)kapsi.push({t:m[0].slice(0,220),y:b.y,x0,x1})})});
  if(!kapsi.length)continue;
  const ops=await pg.getOperatorList();let ctm=[1,0,0,1,0,0];const tumpuk=[];
  for(let i=0;i<ops.fnArray.length;i++){const fn=ops.fnArray[i],ar=ops.argsArray[i];
   if(fn===O.save)tumpuk.push(ctm);else if(fn===O.restore)ctm=tumpuk.pop()||ctm;else if(fn===O.transform)ctm=kali(ar,ctm);
   else if(fn===O.paintFormXObjectBegin){tumpuk.push(ctm);if(ar&&ar[0])ctm=kali(ar[0],ctm)}else if(fn===O.paintFormXObjectEnd)ctm=tumpuk.pop()||ctm;
   else if(fn===O.paintImageXObject){const nm=ar[0];const xs=[ctm[4],ctm[4]+ctm[0],ctm[4]+ctm[2],ctm[4]+ctm[0]+ctm[2]],ys=[ctm[5],ctm[5]+ctm[1],ctm[5]+ctm[3],ctm[5]+ctm[1]+ctm[3]];
    const bx={x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)};if(bx.x1-bx.x0<120||bx.y1-bx.y0<90)continue;
    const cx=(bx.x0+bx.x1)/2;let best=null,jar=1e9;kapsi.forEach(k=>{const kx=(k.x0+k.x1)/2,dx=Math.abs(kx-cx)<(bx.x1-bx.x0)/2+80;if(!dx)return;let d=k.y<=bx.y0+8?bx.y0-k.y:k.y>=bx.y1-8?(k.y-bx.y1)+40:1e9;if(d>=0&&d<110&&d<jar){jar=d;best=k}});
    if(!best)continue;const kl=klasPeta(best.t);if(!kl)continue;
    const img=await new Promise(r=>{const t=setTimeout(()=>r(null),4000);const o=String(nm).startsWith("g_")?pg.commonObjs:pg.objs;try{o.get(nm,v=>{clearTimeout(t);r(v)})}catch(e){clearTimeout(t);r(null)}});
    if(!img||!img.width||img.width<300||img.height<200)continue;peta.push({img,judul:best.t.replace(/^Gambar\s*[\d.\s]*/i,"").trim(),hal:n,...kl})}}}
 const unik=[];peta.forEach(p=>{if(!unik.some(u=>u.judul===p.judul))unik.push(p)});return {hal,peta:unik.slice(0,20),tata}}
/* Dokumen prediksi musim biasanya panjang (sampul, tim redaksi, teori iklim di depan). AI hanya menerima ±14.000 huruf,
   jadi yang dikirim adalah halaman yang paling banyak membahas ZOM: ringkasan, tabel, dan daftar wilayah, bukan halaman awal. */
function teksMusim(hal){if(hal.join("").length<=13000)return hal.map((t,i)=>"[Halaman "+(i+1)+"] "+t).join("\n");const skor=hal.map((t,i)=>{const z=(t.match(/\b6[3-5]\d\b/g)||[]).length,k=(t.match(/\bZOM\b|zona musim/gi)||[]).length,
  w=(t.match(/awal musim|sifat (?:musim|hujan)|puncak musim|\bmaju\b|\bmundur\b|atas normal|bawah normal|tipe 1 musim/gi)||[]).length,
  teori=/penentuan awal musim|el nino southern oscillation|indian ocean dipole|kata pengantar|tim redaksi|daftar isi/i.test(t)?6:0;
  return {i,t,n:z*3+k*2+w-teori}}).filter(x=>x.n>=4).sort((a,b)=>b.n-a.n);
 if(!skor.length)return hal.join("\n");const pilih=[];let pj=0;for(const x of skor){if(pj+x.t.length>13000&&pilih.length)continue;pilih.push(x);pj+=x.t.length}
 return pilih.sort((a,b)=>a.i-b.i).map(x=>"[Halaman "+(x.i+1)+"] "+x.t).join("\n")}
/* halaman yang memuat judul "Tabel ..." tentang ZOM tetapi hampir tanpa teks = tabelnya ditempel sebagai gambar */
function tabelGambar(hal){return hal.map((t,i)=>({i,t})).filter(x=>/tabel\s*\d+\.?[^.]{0,120}(zom|zona musim|musim (hujan|kemarau))/i.test(x.t)&&x.t.replace(/STASIUN KLIMATOLOGI PAPUA BARAT|BULETIN[^]*?\d{4}\/\d{4}/gi,"").length<500&&!(x.t.match(/\b6[3-5]\d\b/g)||[]).length).map(x=>x.i+1)}
async function isiIklimDariDokumen(file,d){if(extDok(file)!=="pdf")return null;const hasil={bagian:[],peta:0,catatan:[]};
 pesan("Membaca halaman, tabel, dan peta di dalam dokumen…");const {hal,peta,tata}=await bacaPdfLengkap(file);const semua=hal.join("\n");
 let dt={};try{dt=bangunDariTata(hal,tata,d.judul)}catch(er){dt={}}
 const isi=JSON.parse(JSON.stringify(IK()||{}));delete isi.diubah;
 const musim=/prediksi musim|press release|fgd|paparan/i.test(d.jenis+" "+d.judul)||/prediksi musim (hujan|kemarau)/i.test(semua.slice(0,3000));
 const tugas=musim?["musim"]:["analisis","prakiraan","ekstrem","hth","spi"];
 const lok={};if(!musim){try{lok.hth=hthDariTata(tata)}catch(er){}try{lok.ekstrem=ekstremDariTata(tata)}catch(er){}try{lok.spi=spiDariTata(tata)}catch(er){}
  const E=edisiKey(d.judul),bA=E?besarAwal(BULAN_ID[(E-1)%12])+" "+Math.floor((E-1)/12):dt.analisis&&dt.analisis.bulan;["hth","ekstrem","spi"].forEach(k=>{if(lok[k]&&(E||!lok[k].bulan))lok[k].bulan=bA||lok[k].bulan||""})}
 for(let i=0;i<tugas.length;i++){const b=tugas[i];
  if(lok[b]){isi[b]={...lok[b],_sumber:d.judul};hasil.bagian.push(b);continue}
  if(b==="musim"){const tg=tabelGambar(hal);if(tg.length)hasil.catatan.push(`Tabel per ZOM di halaman ${tg.join(", ")} berupa gambar, jadi tidak bisa dibaca otomatis. Bila ada perubahan per ZOM, isi manual di tab Isi Halaman Iklim > Prediksi musim.`)}
  const tx=b==="musim"?teksMusim(hal):hal.filter(BAGIAN_CARI[b]).join("\n");if(tx.length<150)continue;
  /* tabel analisis & prakiraan dibaca langsung dari letak kata; AI hanya dipakai bila tabelnya tidak ditemukan */
  if(b==="analisis"&&dt.analisis){const a=dt.analisis,hA=hal.filter(BAGIAN_CARI.analisis);a.teks_pb=kalimatPenting(hA,"pb");a.teks_pbd=kalimatPenting(hA,"pbd");a._sumber=d.judul;try{const nd=await tambahDistrik(a,hA,d,"analisis");if(nd)hasil.catatan.push(nd+" baris rincian distrik analisis hujan terbaca.")}catch(er){}isi.analisis=a;hasil.bagian.push(b);continue}
  if(b==="prakiraan"&&dt.prakiraan){dt.prakiraan.bulan.forEach(m=>{const hp=hal.filter(t=>BAGIAN_CARI.prakiraan(t)&&new RegExp("bulan\\s+"+m.bulan.split(" ")[0],"i").test(t));m.teks=kalimatPenting(hp,"",new RegExp("\\b"+m.bulan.split(" ")[0].slice(0,5),"i"))});try{let nd=0;for(const m of dt.prakiraan.bulan)nd+=await tambahDistrik(m,hal.filter(BAGIAN_CARI.prakiraan),d,"prakiraan",m.bulan);if(nd)hasil.catatan.push(nd+" baris rincian distrik prakiraan terbaca.")}catch(er){}isi.prakiraan={...dt.prakiraan,_sumber:d.judul};hasil.bagian.push(b);continue}
  pesan(`AI membaca bagian ${NAMA_BAGIAN[b]} (${i+1}/${tugas.length})…`);
  try{const awal="PETUNJUK: "+konteksEdisi(d.judul)+" "+(PETUNJUK_AI[b]||"")+"\n\n";
   let o=null;
   if(b==="prakiraan"){/* satu bulan per panggilan agar AI tidak menyamaratakan */
    const bln=[];hal.filter(BAGIAN_CARI.prakiraan).forEach(t=>{(t.match(/prakiraan\s+(?:curah|sifat)\s+hujan\s+bulan\s+([a-z]+\s+\d{4})/gi)||[]).forEach(x=>{const m=x.match(/bulan\s+([a-z]+\s+\d{4})/i);const v=besarAwal(m[1].toLowerCase());if(!bln.includes(v))bln.push(v)})});
    const hasilB=[];for(const bl of bln.slice(0,3)){pesan(`AI membaca prakiraan ${bl}…`);const tb=hal.filter(t=>BAGIAN_CARI.prakiraan(t)&&new RegExp("bulan\\s+"+bl.replace(" ","\\s+"),"i").test(t)).join("\n");if(tb.length<150)continue;
     try{const jb=await admJSON("/admin/ekstrak",{mode:"iklim",bagian:b,judul:d.judul,teks:(awal+"Bulan yang dibaca: "+bl+".\n\n"+tb).slice(0,14000)});const ob=jb&&jb.data;const m=ob&&Array.isArray(ob.bulan)&&ob.bulan.find(x=>x&&((x.pb||[]).length||(x.pbd||[]).length));if(m){m.bulan=bl;hasilB.push(m)}}catch(er){}}
    o=hasilB.length?{bulan:hasilB}:null}
   else{const j=await admJSON("/admin/ekstrak",{mode:"iklim",bagian:b,judul:d.judul,teks:(awal+tx).slice(0,14000)});o=j&&j.data}
   if(!o)continue;if(o&&typeof o==="object")o._sumber=d.judul;
   if(b==="analisis"&&((o.pb||[]).length||(o.pbd||[]).length)){isi.analisis=o;hasil.bagian.push(b)}
   else if(b==="prakiraan"&&Array.isArray(o.bulan)&&o.bulan.length){isi.prakiraan={bulan:o.bulan.slice(0,3)};hasil.bagian.push(b)}
   else if(b==="ekstrem"&&(o.teks||(o.lebat||[]).length)){isi.ekstrem=o;hasil.bagian.push(b)}
   else if(b==="hth"&&Array.isArray(o.dasarian)&&o.dasarian.length){isi.hth=o;hasil.bagian.push(b)}
   else if(b==="spi"&&((o.pb||[]).length||(o.pbd||[]).length)){if(/^buletin|^\s*$/i.test(o.teks||"")||String(o.teks||"").length<25)o.teks="";isi.spi=o;hasil.bagian.push(b)}
   else if(b==="musim"&&Array.isArray(o.zom)){const jn=/kemarau/i.test(o.jenis||"")||/kemarau/i.test(d.jenis+" "+d.judul)?"kemarau":"hujan";
    /* pengaman: tabel hasil AI hanya dipakai bila mencakup hampir semua ZOM (minimal 18 dari 21), supaya
       tabel yang terbaca sebagian atau karangan AI tidak menggantikan data lengkap yang sudah ada */
    const z=zomNorm(o).filter(x=>x.no>=636&&x.no<=656&&(x.awal||x.sifat||x.banding||x.puncak)),unik=new Set(z.map(x=>x.no)).size;
    if(unik>=18){
     /* kolom yang tidak tertulis di dokumen (mis. Maju/Mundur per ZOM) diisi dari data lama periode yang sama, bukan dikosongkan */
     const lamaM=IK()["musim_"+jn],lama=zomNorm(lamaM).length?zomNorm(lamaM):(jn==="hujan"?zomBawaanLengkap():[]),perL=(lamaM&&lamaM.periode)||(jn==="hujan"?"2026/2027":""),
      sama=!o.periode||!perL||String(o.periode).replace(/\s/g,"")===String(perL).replace(/\s/g,"");let isiLama=0;
     const docUpd=!!o.update||/\bupdate\b|pemutakhiran|pembaruan/i.test(d.judul+" "+(o.teks||""));
     z.forEach(r=>{const l=lama.find(x=>+x.no===+r.no);if(!l)return;if(!r.wil&&l.wil){r.wil=l.wil}if(docUpd&&sama&&!r.semula&&l.awal&&r.awal&&blnSaja(l.awal)!==blnSaja(r.awal)&&!/tipe 1|non/i.test(l.awal))r.semula=l.awal;if(sama)["awal","banding","sifat","puncak"].forEach(k=>{if(!r[k]&&l[k]){r[k]=l[k];isiLama++}})});
     if(sama)lama.forEach(l=>{if(!z.some(r=>+r.no===+l.no)){z.push({...l});isiLama++}});z.sort((a,b)=>a.no-b.no);
     isi["musim_"+jn]={...o,zom:z,_dipasang:new Date().toISOString()};hasil.bagian.push("musim "+jn);
     if(isiLama)hasil.catatan.push(`${isiLama} isian ZOM yang tidak tertulis di dokumen (misalnya Maju/Mundur per ZOM) tetap memakai data sebelumnya. Periksa di tab Isi Halaman Iklim.`)}
    else hasil.catatan.push(`Tabel ZOM musim ${jn} hanya terbaca ${unik} dari 21 ZOM, jadi data musim ${jn} di web tidak diganti (data lama tetap dipakai).`)}}catch(er){}}
 /* unggah peta, ganti peta lama yang sejenis */
 const baru=[];for(const p of peta){try{pesan(`Mengunggah peta ${baru.length+1} dari ${peta.length}…`);const bl=await gambarKeBlob(p.img,1400);if(!bl)continue;
   const u=await admUnggah(new File([bl],"peta-"+(p.k+"-"+(p.prov||"")+"-"+p.hal)+".jpg",{type:"image/jpeg"}));baru.push({k:p.k,sub:p.sub||"",prov:p.prov||"",bulan:p.bulan||"",judul:p.judul,file:u.kunci,sumber:d.judul})}catch(er){}}
 const lama=(Array.isArray(isi.peta)?isi.peta:[]).filter(x=>!baru.some(b=>b.k===x.k&&(b.sub||"")===(x.sub||"")));isi.peta=[...baru,...lama].slice(0,60);hasil.peta=baru.length;
 if(!musim)hasil.basi=tugas.filter(b=>!hasil.bagian.includes(b)&&isi[b]&&Object.keys(isi[b]).length&&isi[b]._sumber!==d.judul).map(b=>{if(!isi[b]._sumber)isi[b]._sumber=isi.sumber||"dokumen sebelumnya";return b});
 if(!hasil.bagian.length&&!baru.length)return hasil;if(!(docMusim(d.judul,d.jenis)&&hasil.bagian.every(b=>/^musim/.test(b))&&isi.sumber))isi.sumber=d.judul;await admJSON("/admin/iklim",isi);try{hasil.kartu=await perbaruiKondisiDariIsi(isi,d.judul,hasil.basi,hasil.bagian)}catch(er){}return hasil}

/* =====================================================================
   MEMBACA TABEL BULETIN DARI LETAK KATA DI HALAMAN (tanpa AI)
   Tabel Canva di buletin berbentuk: label kategori (mis. "Menengah (101-300 mm)" atau "Bawah Normal"),
   lalu daftar kabupaten tepat di bawahnya pada kolom yang sama. Judul tabel ("Tabel 2.3 Prakiraan Curah
   Hujan Bulan November 2026 wilayah Papua Barat Daya") ada di atasnya.
   ===================================================================== */
const KAT_CH=["Rendah","Menengah","Tinggi","Sangat Tinggi"],KAT_SH=["Bawah Normal","Normal","Atas Normal"];
const KAB_POLA=[["Manokwari Selatan",/man(?:okw|owk)ari\s+selatan|\bmansel\b/i,"pb"],["Manokwari",/man(?:okw|owk)ari(?!\s+selatan)/i,"pb"],["Pegunungan Arfak",/(?:peg(?:\.|unungan)?\s*)?arfak?\b/i,"pb"],["Teluk Bintuni",/teluk\s+bintuni|\bbintuni/i,"pb"],["Teluk Wondama",/teluk\s+wondama|\bwondama/i,"pb"],["Fakfak",/fak\s*[-–]?\s*fak/i,"pb"],["Kaimana",/kaimana/i,"pb"],
 ["Kota Sorong",/kota\s+sorong/i,"pbd"],["Sorong Selatan",/sorong\s+selatan/i,"pbd"],["Kab. Sorong",/\bsorong\b/i,"pbd"],["Raja Ampat",/raja\s*ampat/i,"pbd"],["Maybrat",/maybrat/i,"pbd"],["Tambrauw",/tambrauw/i,"pbd"]];
function segmenHalaman(items){/* items: {s,x,y,w} (koordinat PDF, y ke atas) -> segmen baris per kolom */
 const baris=[];items.slice().sort((a,b)=>b.y-a.y||a.x-b.x).forEach(i=>{const b=baris.find(z=>Math.abs(z.y-i.y)<3);if(b)b.it.push(i);else baris.push({y:i.y,it:[i]})});
 const seg=[];baris.forEach(b=>{b.it.sort((a,c)=>a.x-c.x);let cur=null;b.it.forEach(i=>{if(!cur||i.x-cur.x1>45){cur={y:b.y,x0:i.x,x1:i.x+i.w,t:i.s};seg.push(cur)}else{cur.t+=(i.x-cur.x1>1.5?" ":"")+i.s;cur.x1=Math.max(cur.x1,i.x+i.w)}})});
 seg.forEach(s=>s.t=s.t.replace(/\s+/g," ").trim());return seg.filter(s=>s.t)}
const labelKat=t=>{const a=t.match(/^(Sangat Tinggi|Rendah|Menengah|Tinggi)\s*\(/i);if(a)return {jenis:"ch",kat:KAT_CH.find(k=>k.toLowerCase()===a[1].toLowerCase())};const b=t.match(/^(Bawah Normal|Atas Normal|Normal)$/i);if(b)return {jenis:"sh",kat:KAT_SH.find(k=>k.toLowerCase()===b[1].toLowerCase())};return null};
function tabelDariHalaman(seg){const cap=[];seg.forEach((s,i)=>{if(!/^Tabel\s*\d/i.test(s.t))return;
  /* dua judul tabel bersebelahan ("Tabel 2.3 ... Tabel 2.4 ...") dipisah menurut letaknya */
  const j2=s.t.slice(1).search(/\bTabel\s*\d/i)+1,bag=j2>0?(()=>{const xm=s.x0+(s.x1-s.x0)*j2/s.t.length;return [{t:s.t.slice(0,j2).trim(),x0:s.x0,x1:xm-8,tol:30},{t:s.t.slice(j2).trim(),x0:xm,x1:s.x1,tol:45}]})():[{t:s.t,x0:s.x0,x1:s.x1,tol:30}];
  bag.forEach(b=>{let t=b.t;const n=seg.find(z=>z!==s&&s.y-z.y>2&&s.y-z.y<16&&Math.abs(z.x0-b.x0)<b.tol);if(n)t+=" "+n.t;cap.push({t,x0:b.x0,x1:j2>0?b.x1:Math.max(b.x1,b.x0+150),y:s.y})})});
 const lab=seg.map(s=>({s,l:labelKat(s.t)})).filter(x=>x.l),tab=[];
 lab.forEach(({s,l})=>{const kol=lab.filter(z=>Math.abs(z.s.x0-s.x0)<45&&z.s.y<s.y).map(z=>z.s.y);const batas=kol.length?Math.max(...kol):-1e9;
  const isi=seg.filter(z=>z!==s&&Math.abs(z.x0-s.x0)<45&&z.y<s.y&&z.y>batas&&!labelKat(z.t)&&!/^(Tabel|Gambar)\s*\d/i.test(z.t)).sort((a,b)=>b.y-a.y);
  const ambil=[];let yAkhir=s.y;for(const z of isi){if(yAkhir-z.y>34)break;ambil.push(z.t);yAkhir=z.y}
  const c=cap.filter(c=>c.y>s.y&&s.x0>=c.x0-25&&s.x0<=c.x1+25).sort((a,b)=>a.y-b.y)[0];if(!c)return;
  let t=tab.find(x=>x.cap===c.t&&x.jenis===l.jenis);if(!t){t={cap:c.t,capY:c.y,capX:c.x0,jenis:l.jenis,kat:{}};tab.push(t)}t.kat[l.kat]=ambil.join(" ").replace(/\s+/g," ").trim()});
 return tab.map(t=>{const c=t.cap.toLowerCase();return {...t,prakiraan:/prakiraan|prediksi/.test(c),prov:/pap?u?a\s+barat\s+daya/.test(c)?"pbd":/pap?u?a\s+barat/.test(c)?"pb":"",bulan:besarAwal(((t.cap.match(BLN_RE)||[])[0]||"").toLowerCase())}})}
function tabelBaris(seg){const out=[];const caps=seg.filter(z=>/^Tabel\s*\d/i.test(z.t)).sort((a,b)=>b.y-a.y);
 caps.forEach((c,ci)=>{let t=c.t;const n=seg.find(z=>z!==c&&c.y-z.y>2&&c.y-z.y<18&&/^(daya|barat daya|barat)$/i.test(z.t.trim()));if(n)t+=" "+n.t;
  const bawah=Math.max((caps[ci+1]||{y:30}).y,30),area=seg.filter(z=>z!==c&&z!==n&&z.y<c.y-2&&z.y>bawah);
  const kiri=[],kanan=[];area.forEach(z=>{const m=z.t.match(/^(Sangat\s+Tinggi|Rendah|Menengah|Tinggi|Bawah\s+Normal|Atas\s+Normal|Normal)\s+(.{4,})$/i);
   if(z.x1<215)kiri.push(z);else if(z.x0<190&&m){kiri.push({...z,t:m[1]});kanan.push({...z,t:m[2]})}else if(z.x0>=170)kanan.push(z)});
  const kk=kiri.sort((a,b)=>b.y-a.y),labs=[];
  for(let i=0;i<kk.length;i++){const w=kk[i].t.trim(),nx=kk[i+1]&&kk[i+1].t.trim(),dekat=kk[i+1]&&kk[i].y-kk[i+1].y<26;
   if(/^(bawah|atas)$/i.test(w)&&dekat&&/^normal$/i.test(nx)){labs.push({kat:/bawah/i.test(w)?"Bawah Normal":"Atas Normal",y:(kk[i].y+kk[i+1].y)/2,j:"sh"});i++;continue}
   if(/^sangat$/i.test(w)&&dekat&&/^tinggi$/i.test(nx)){labs.push({kat:"Sangat Tinggi",y:(kk[i].y+kk[i+1].y)/2,j:"ch"});i++;continue}
   const ch=KAT_CH.find(k=>k.toLowerCase()===w.toLowerCase().replace(/\s+/g," ")),sh=KAT_SH.find(k=>k.toLowerCase()===w.toLowerCase().replace(/\s+/g," "));
   if(ch){labs.push({kat:ch,y:kk[i].y,j:"ch"});continue}if(sh){labs.push({kat:sh,y:kk[i].y,j:"sh"});continue}
   const L=labs[labs.length-1];if(/^\(.*mm/i.test(w)&&L&&L.j==="ch"&&!L.r&&L.y-kk[i].y<26){L.y=(L.y+kk[i].y)/2;L.r=1}}
  if(labs.length<2)return;const jenis=/sifat/i.test(t)?"sh":/curah/i.test(t)?"ch":labs[0].j,kat={};labs.forEach(L=>kat[L.kat]=[]);
  kanan.forEach(z=>{if(/^daerah$/i.test(z.t.trim())||/^[-–]$/.test(z.t.trim()))return;let b=null;labs.forEach(L=>{if(!b||Math.abs(L.y-z.y)<Math.abs(b.y-z.y))b=L});if(b&&Math.abs(b.y-z.y)<60)kat[b.kat].push(z)});
  const kt={};Object.keys(kat).forEach(k=>kt[k]=kat[k].sort((a,b)=>b.y-a.y).map(z=>z.t).join(" ").replace(/\s+/g," ").trim());
  const cl=t.toLowerCase();out.push({cap:t,capY:c.y,capX:c.x0,jenis,kat:kt,prakiraan:/prakiraan|prediksi/.test(cl),prov:/pap?u?a\s+barat\s+daya/.test(cl)?"pbd":/pap?u?a\s+barat/.test(cl)?"pb":"",bulan:besarAwal(((t.match(BLN_RE)||[])[0]||"").toLowerCase())})});
 return out}
/* teks sel -> {kabupaten: "penuh"|"sebagian"} */
function kabDariSel(teks,prov){const out={};const t=String(teks||"").replace(/\s+/g," ").trim();if(!t||/^tidak ada\.?$/i.test(t))return out;
 const semua=/seluruh|\bsemua\b|sebagian\s+besar\s+wilayah\s+pap?u?a\s+barat/i.test(t);if(semua){const kecuali=(t.match(/kecuali\s+(.+)$/i)||[])[1]||"";
  const provs=/papua barat daya/i.test(t)&&/papua barat(?!\s*daya)/i.test(t)?["pb","pbd"]:/papua barat daya/i.test(t)?["pbd"]:/papua barat/i.test(t)?["pb"]:[prov];
  const kecSeb=/^\s*sebagian/i.test(kecuali);KAB_POLA.filter(k=>provs.includes(k[2])&&!(kecuali&&!kecSeb&&k[1].test(kecuali))).forEach(k=>out[k[0]]="penuh")}
 /* koma memisahkan kabupaten; "sebagian X dan Y" berlaku untuk X dan Y */
 t.split(/,|;/).flatMap(bg=>{const q=/sebagian/i.test(bg.split(/\bdan\b/)[0]);return bg.split(/\bdan\b/).map(f=>({f,q}))}).forEach(({f,q})=>{const sb=q||/sebagian/i.test(f);KAB_POLA.forEach(([nama,re])=>{const ff=nama==="Kab. Sorong"?f.replace(/kota\s+sorong|sorong\s+selatan/ig,""):nama==="Manokwari"?f.replace(/man(?:okw|owk)ari\s+selatan/ig,""):f;if(re.test(ff))out[nama]=out[nama]==="penuh"?"penuh":(sb?"sebagian":"penuh")})});
 return out}
const rentang=(arr,urut)=>{const s=[...new Set(arr)].sort((a,b)=>urut.indexOf(a)-urut.indexOf(b));return s.length>1?s[0]+" – "+s[s.length-1]:s[0]||""};
function barisDariTabel(tCh,tSh,prov){const kab=KAB_POLA.filter(k=>k[2]===prov).map(k=>k[0]),rows=[];
 kab.forEach(nama=>{const ambil=(t,urut)=>{const p=[],s=[];if(t)urut.forEach(k=>{const v=kabDariSel(t.kat[k],prov)[nama];if(v==="penuh")p.push(k);else if(v==="sebagian")s.push(k)});return {p,s}};
  const ch=ambil(tCh,KAT_CH),sh=ambil(tSh,KAT_SH);const nilai=(x,urut)=>x.p.length?rentang(x.p,urut):x.s.length?rentang(x.s,urut):"";
  const vch=nilai(ch,KAT_CH),vsh=nilai(sh,KAT_SH);
  const ket=[...(ch.p.length?ch.s.filter(k=>!ch.p.includes(k)).map(k=>"Sebagian wilayah "+k+(k==="Tinggi"?" (301–500 mm)":k==="Sangat Tinggi"?" (> 500 mm)":"")):[]),...(sh.p.length?sh.s.filter(k=>!sh.p.includes(k)).map(k=>"Sebagian wilayah "+k):[])];
  if(vch||vsh)rows.push({kab:nama,ch:vch,sh:vsh,ket:ket.join("; ")})});
 return rows}
/* kalimat "didominasi ..." di buletin -> kategori dominan per provinsi */
function dominDariKalimat(teks,jenis,prov,bulan){const t=String(teks||"").replace(/\s+/g," "),ur=jenis==="sh"?KAT_SH:KAT_CH;const kal=t.replace(/\.\s+/g,".\u0001").split("\u0001");
 const katRe=jenis==="sh"?"(bawah normal|atas normal|normal)":"(sangat tinggi|tinggi|menengah|rendah)";
 for(const k0 of kal){const k=bersihKalimat(k0);if(!k||!new RegExp((jenis==="sh"?"sifat":"curah")+" hujan","i").test(k))continue;const pd=/papua barat daya/i.test(k);if((prov==="pbd")!==pd)continue;if(bulan&&!new RegExp(bulan.split(" ")[0],"i").test(k))continue;
  const m=k.match(new RegExp("(?:didominasi|umumnya|dominan|sebagian besar|secara keseluruhan)[^.]*?"+katRe+"(?:\\s*(?:hingga|sampai|-|–)\\s*"+katRe+")?","i"));
  if(m){const a=ur.find(x=>x.toLowerCase()===m[1].toLowerCase()),b=m[2]?ur.find(x=>x.toLowerCase()===m[2].toLowerCase()):"";return b&&b!==a?rentang([a,b],ur):a}}
 return ""}
const skorTab=arr=>arr.reduce((n,t)=>n+Object.values(t.kat||{}).reduce((m,v)=>m+Object.keys(kabDariSel(v,t.prov||"pb")).length,0),0);
function bangunDariTata(hal,tata,judul){const tabs=tata.flatMap(t=>{const a=tabelDariHalaman(t.seg),b=tabelBaris(t.seg);return (skorTab(b)>skorTab(a)?b:a).map(x=>({...x,hal:t.n}))});const teks=hal.join("\n");const out={};
 const E=edisiKey(judul),nmB=k=>besarAwal(BULAN_ID[((k%12)+12)%12])+" "+Math.floor(k/12);
 if(E){/* analisis = bulan sebelum edisi; prakiraan = 3 bulan sesudahnya, diurutkan menurut letak tabel di dokumen */
  tabs.filter(x=>!x.prakiraan).forEach(x=>x.bulan=nmB(E-1));
  const P=[nmB(E+1),nmB(E+2),nmB(E+3)],tp=tabs.filter(x=>x.prakiraan).sort((a,b)=>a.hal-b.hal||(b.capY||0)-(a.capY||0)||(a.capX||0)-(b.capX||0));
  const kunciTab=tp.map(x=>x.prov+x.jenis+String(x.bulan).split(" ")[0].toLowerCase()),cocok=tp.length&&tp.every(x=>P.some(b=>samaBulan(x.bulan,b)))&&new Set(kunciTab).size===kunciTab.length;
  if(!cocok){let i=0,lihat=new Set();tp.forEach(x=>{const k=x.prov+x.jenis;if(lihat.has(k)){i++;lihat=new Set()}lihat.add(k);x.bulan=P[Math.min(i,2)]})}}
 const ambil=(prak,prov,bulan,jenis)=>tabs.find(x=>x.prakiraan===prak&&x.prov===prov&&x.jenis===jenis&&(!bulan||samaBulan(x.bulan,bulan)))||tabs.find(x=>x.prakiraan===prak&&x.prov===prov&&x.jenis===jenis&&bulan&&String(x.bulan).split(" ")[0]===String(bulan).split(" ")[0]);
 /* analisis: bulan data = bulan pada judul tabel yang paling sering (judul sisa template diabaikan) */
 const anT=tabs.filter(x=>!x.prakiraan);if(anT.length){const blnA=E?nmB(E-1):(domin(anT,x=>x.bulan)[0]||[""])[0];const pb=barisDariTabel(anT.find(x=>x.prov==="pb"&&x.jenis==="ch"),anT.find(x=>x.prov==="pb"&&x.jenis==="sh"),"pb"),pbd=barisDariTabel(anT.find(x=>x.prov==="pbd"&&x.jenis==="ch"),anT.find(x=>x.prov==="pbd"&&x.jenis==="sh"),"pbd");
  if(pb.length+pbd.length>=5)out.analisis={bulan:blnA,pb,pbd,dom:{pb_ch:dominDariKalimat(teks,"ch","pb"),pb_sh:dominDariKalimat(teks,"sh","pb"),pbd_ch:dominDariKalimat(teks,"ch","pbd"),pbd_sh:dominDariKalimat(teks,"sh","pbd")},dari:"tabel"}}
 const bln=[...new Set(tabs.filter(x=>x.prakiraan&&x.bulan).map(x=>x.bulan))].sort((a,b)=>urutBulan(a)-urutBulan(b)).slice(0,3);
 const pr=bln.map(b=>{const pb=barisDariTabel(ambil(true,"pb",b,"ch"),ambil(true,"pb",b,"sh"),"pb"),pbd=barisDariTabel(ambil(true,"pbd",b,"ch"),ambil(true,"pbd",b,"sh"),"pbd");
  const hl=hal.filter(t=>new RegExp("prakiraan\\s+(?:curah|sifat)\\s+hujan(?:\\s+\\S+){0,6}?\\s+"+b.split(" ")[0],"i").test(t)).join(" ");
  return {bulan:b,pb,pbd,dom:{pb_ch:dominDariKalimat(hl,"ch","pb",b),pb_sh:dominDariKalimat(hl,"sh","pb",b),pbd_ch:dominDariKalimat(hl,"ch","pbd",b),pbd_sh:dominDariKalimat(hl,"sh","pbd",b)},dari:"tabel"}}).filter(m=>m.pb.length+m.pbd.length>=5);
 if(pr.length)out.prakiraan={bulan:pr};return out}
/* kalimat ringkasan tidak dipotong di tengah kata */
function potongKalimat(t,n){t=String(t||"").trim();if(t.length<=n)return t;const p=t.slice(0,n),i=Math.max(p.lastIndexOf(". "),p.lastIndexOf(".\n"));return i>40?p.slice(0,i+1):p.replace(/\s+\S*$/,"")+"…"}
/* tanda periksa untuk petugas: baris tabel yang tidak cocok dengan kalimat buletin */
function periksaIsi(x){try{rapikanIK(x)}catch(e){}const w=[],cek=(m,lab)=>{if(!m)return;["pb","pbd"].forEach(pv=>{const rows=m[pv]||[],nm=pv==="pb"?"Papua Barat":"Papua Barat Daya";
  rows.filter(r=>!r.ch||!r.sh).forEach(r=>w.push(`${lab}: ${r.kab} (${nm}) belum punya kategori ${!r.ch?"curah hujan":"sifat hujan"}.`));
  const d=m.dom||{};["ch","sh"].forEach(j=>{const kal=d[pv+"_"+j];if(!kal||!rows.length)return;const ur=j==="sh"?KAT_SH:KAT_CH,ada=rows.some(r=>String(r[j]||"").split(" – ").some(v=>kal.split(" – ").includes(v)));
   if(!ada)w.push(`${lab}: buletin menulis ${nm} didominasi ${kal} (${j==="sh"?"sifat":"curah"} hujan), tetapi tabel tidak memuat kategori itu.`)})})};
 cek(x.analisis,"Analisis "+((x.analisis||{}).bulan||""));((x.prakiraan&&x.prakiraan.bulan)||[]).forEach(m=>cek(m,"Prakiraan "+(m.bulan||"")));
 const kotor=t=>/\b(?:Tabel|Gambar)\s*\d|\(\s*[<>≥≤]?\s*\d+\s*(?:[-–]\s*\d+\s*)?mm\s*\)|^\s*\d{1,2}\s+[A-Z]/.test(String(t||""));
 ((x.prakiraan&&x.prakiraan.bulan)||[]).forEach(m=>{if(!String(m.teks||"").trim())w.push("Prakiraan "+(m.bulan||"")+": ringkasan kosong (kalimatnya tidak terbaca dari buletin). Isi bila perlu.")});
 [["Analisis · Ringkasan Papua Barat",(x.analisis||{}).teks_pb],["Analisis · Ringkasan Papua Barat Daya",(x.analisis||{}).teks_pbd],...((x.prakiraan&&x.prakiraan.bulan)||[]).map(m=>["Prakiraan "+(m.bulan||"")+" · Ringkasan",m.teks]),["Hujan ekstrem · Ringkasan",(x.ekstrem||{}).teks],["SPI · Ringkasan",(x.spi||{}).teks]].forEach(([l,t])=>{if(kotor(String(t||"").replace(/\((?:lihat\s+)?(?:Tabel|Gambar)[^)]*\)/gi,"")))w.push(l+": kalimatnya masih memuat judul atau potongan tabel. Rapikan di bawah.")});
 {const musimDok=/pmk|pmh|prediksi\s+musim|prakiraan\s+musim|press\s*release|fgd|musim\s+(hujan|kemarau)/i.test(x.sumber||""),BL=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"],
   h=new Date(Date.now()+9*3600e3),kini=h.getUTCFullYear()*12+h.getUTCMonth(),umur=t=>{const m=String(t||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);return m?kini-(+m[2]*12+BL.indexOf(m[1])):null};
  ["analisis","prakiraan","ekstrem","hth","spi"].forEach(b=>{const v=x[b];if(!(v&&v._sumber&&x.sumber&&v._sumber!==x.sumber))return;const nm=NAMA_BAGIAN[b]||b,u=umur(v._sumber);
   if(u!=null&&u>=2)w.push({lvl:"baru",bag:b,t:`Bagian ${nm} masih dari ${v._sumber} (${u} bulan lalu). Unggah Buletin Iklim edisi terbaru untuk memperbaruinya.`});
   else if(musimDok)w.push({lvl:"ok",bag:b,t:`Bagian ${nm} memang tidak ada di ${x.sumber} (dokumen prediksi musim). Isinya tetap dari ${v._sumber} dan masih berlaku.`});
   else w.push({lvl:"betul",bag:b,t:`Bagian ${nm} tidak terbaca dari ${x.sumber}; isinya masih dari ${v._sumber}. Periksa bagian ini, atau unggah ulang dokumennya.`})})}return w}
const IK_BAG_SEC={analisis:"Analisis hujan",prakiraan:"Prakiraan",ekstrem:"Hujan ekstrem",hth:"Hari tanpa hujan",spi:"SPI"};
function cekIsiHTML(w){if(!w.length)return "";const tebak=t=>{const m=String(t).match(/^(Analisis|Prakiraan|Hujan ekstrem|SPI|Hari tanpa hujan)/i);return m?Object.keys(IK_BAG_SEC).find(k=>IK_BAG_SEC[k].toLowerCase()===m[1].toLowerCase()):""};
 const L=w.map(t=>typeof t==="string"?{lvl:"betul",t,bag:tebak(t)}:t);
 return [["betul","⚠️ Perlu dibetulkan","Kemungkinan ada isi yang keliru. Buka bagiannya, periksa, lalu tekan Simpan."],["baru","📅 Perlu buletin baru","Isinya benar, tetapi sudah lama. Unggah Buletin Iklim edisi terbaru."],["ok","✅ Sudah sesuai","Hanya keterangan, tidak perlu tindakan."]].map(([k,j,d])=>{const a=L.filter(x=>x.lvl===k);if(!a.length)return "";
  return `<div class="admcek cek-${k}"><b>${j} (${a.length})</b> <small>${d}</small><ul>${a.slice(0,15).map(x=>`<li>${esc(x.t)}${k!=="ok"&&x.bag?` <button type="button" class="mini" data-ikbuka="${x.bag}">Buka bagian ini</button>`:""}${k==="baru"?` <button type="button" class="mini" data-adm="publikasi">Unggah buletin</button>`:""}</li>`).join("")}</ul></div>`}).join("")}

/* ---------- hari tanpa hujan, hujan ekstrem, dan SPI dibaca dari kalimat & tabel buletin (tanpa AI) ---------- */
const KAT_HTH_RE="(sangat\\s+pendek|sangat\\s+panjang|kekeringan\\s+ekstr[ei]m|pendek|menengah|panjang)";
const katHth=t=>{const x=String(t).toLowerCase().replace(/\s+/g," ");return /sangat pendek/.test(x)?"sangat_pendek":/sangat panjang/.test(x)?"sangat_panjang":/ekstr/.test(x)?"ekstrem":/pendek/.test(x)?"pendek":/menengah/.test(x)?"menengah":/panjang/.test(x)?"panjang":""};
function teksLebar(seg){const cap=seg.filter(s=>/^(Gambar|Tabel)\s*\d/i.test(s.t)),kiri=seg.filter(s=>s.x1-s.x0>260&&!cap.includes(s)).map(s=>s.x0);
 const lanjutCap=s=>cap.some(c=>c.y-s.y>1&&c.y-s.y<18&&Math.abs((c.x0+c.x1)/2-(s.x0+s.x1)/2)<70);
 return seg.filter(s=>(s.x1-s.x0>260||kiri.some(x=>Math.abs(x-s.x0)<6))&&!cap.includes(s)&&/[a-z]/.test(s.t)&&!lanjutCap(s)).sort((a,b)=>b.y-a.y).map(s=>s.t).join(" ")
 .replace(/Tabel\s*\d+\s*\.\s*\d+\s*Distribusi\s+(?:Sifat|Curah)\s+Hujan\s+Bulan\s+[A-Za-z]+\s+\d{4}/gi," ").replace(/([a-z])wilayah Papua Barat(?! Daya)/g,"$1 ").replace(/\s+/g," ")}
const blnTeks=(b,t)=>BULAN_ID.includes(String(b).toLowerCase())?besarAwal(String(b).toLowerCase())+" "+t:"";
function hthDariTata(tata){const out=[];let bulan="";
 (tata||[]).forEach(({seg})=>{const semua=seg.map(s=>s.t).join(" ");const h=semua.match(/HARI\s+TANPA\s+HUJAN\s+DASARIAN\s+(III|II|I)\b/i);if(!h)return;const das=h[1].toUpperCase();if(out.some(d=>d.das===das))return;
  const bm=semua.match(/DASARIAN\s+I{1,3}\s*\(\s*\d+\s*[-–]\s*\d+\s+([A-Za-z]+)\s+(\d{4})/i)||semua.match(/HARI\s+TANPA\s+HUJAN\s+([A-Za-z]+)\s+(\d{4})/i);if(bm&&!bulan)bulan=blnTeks(bm[1],bm[2]);
  let t=teksLebar(seg).replace(/Tabel\s*1\s*\.\s*\d\b/gi," ").replace(/Distribusi\s*(?:Sifat|Curah)\s*Hujan\s*Bulan\s*Desember\s*2025/gi," ").replace(/wilayah\s*Papua\s*Barat(?!\s*Daya)/g," ");
  const a=t.search(/didominasi|berdasarkan hasil monitoring|monitoring hari tanpa hujan \(hth\)/i);if(a>0)t=t.slice(a);const z=t.search(/rincian/i);if(z>0)t=t.slice(0,z);
  const d={das,sangat_pendek:0,pendek:0,menengah:0,panjang:0,sangat_panjang:0,ekstrem:0};let n=0;
  t=t.replace(new RegExp("(?:\\(HTH\\)|HTH|Hari Tanpa Hujan)\\s*"+KAT_HTH_RE+"\\s*(?:\\([^)]*\\))?\\s*pada\\s*(\\d+)\\s*pos","gi"),(m,k,v)=>{const c=katHth(k);if(c){d[c]+=+v;n++}return " ¦ "});
  t.replace(new RegExp("(\\d+)\\s*(?:titik\\s*)?pos[^,.;¦]{0,90}?(?:\\(HTH\\)|HTH|kategori)\\s*"+KAT_HTH_RE,"gi"),(m,v,k)=>{const c=katHth(k);if(c){d[c]+=+v;n++}return m});
  if(n)out.push(d)});
 if(!out.length)return null;out.sort((a,b)=>a.das.length-b.das.length);return {bulan,dasarian:out}}
const BLN_PAT="januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember|desmber|desembe";
const bersihPos=t=>String(t).replace(new RegExp("\\b\\d{1,2}(?:\\s*[,&]\\s*\\d{1,2})*\\s+(?:"+BLN_PAT+")(?:\\s+\\d{4})?\\b","gi")," ").replace(/\bpapua\s+barat(\s+daya)?\b/gi," ").replace(/\bdaya\b/gi," ").replace(/^\s*pos\s+(hujan\s+)?/i,"").replace(/\s+/g," ").trim();
function ekstremDariTata(tata){let hasil=null;
 (tata||[]).forEach(({seg},ih)=>{if(hasil)return;const semua=seg.map(s=>s.t).join(" ");if(!/curah\s+hujan\s+ekstr[ei]m\s+harian/i.test(semua)||!/lebat/i.test(semua))return;
  const t=teksLebar(seg),bm=t.match(/bulan\s+([A-Za-z]+)\s+(\d{4})/i),jp=t.match(/(?:dilakukan\s+pada|pada)\s+(\d+)\s*pos\s*hujan/i);
  const cap=seg.find(s=>/^Tabel\b.*ekstr[ei]m/i.test(s.t)),rows=[];
  const baris=(sg,atas)=>{let num=sg.filter(s=>/^\d{1,3}(?:[.,]\d)?$/.test(s.t)&&s.y<atas);const out=[];
   if(num.length>2){const xs=domin(num,s=>String(Math.round(s.x0/6)));const kx=+xs[0][0]*6;num=num.filter(s=>Math.abs(s.x0-kx)<14)}
   num.forEach(s=>{const dekat=sg.filter(z=>z!==s&&z.x0>s.x1+15&&Math.abs(z.y-s.y)<11&&!/^[\d.,]+$/.test(z.t)&&!/^(tidak ada|tanggal|pengukuran|pengamatan|provinsi|papua barat|papua barat daya|daya)$/i.test(z.t.trim())&&!/stasiun\/pos|pos pengamatan|curah hujan/i.test(z.t)).sort((a,b)=>b.y-a.y);
    const nm=bersihPos(dekat.map(z=>z.t).join(" "));if(nm&&!/^tidak ada$/i.test(nm))out.push({pos:nm,mm:+s.t.replace(",","."),y:s.y,sg})});return out};
  baris(seg,cap?cap.y:1e9).forEach(r=>rows.push(r));
  /* tabel bersambung ke halaman berikutnya */
  if(cap&&rows.length&&tata[ih+1]){const sg2=tata[ih+1].seg,x0=rows[0].sg.find(z=>z.y===rows[0].y&&/^\d/.test(z.t)),judul2=sg2.filter(z=>/^\d+(\.\d+)+\s*\.?\s*[A-Z]/.test(z.t)).sort((a,b)=>b.y-a.y)[0];
   baris(sg2,1e9).filter(r=>(!judul2||r.y>judul2.y)&&(!x0||Math.abs(r.sg.find(z=>z.y===r.y&&/^\d/.test(z.t)).x0-x0.x0)<15)).forEach(r=>rows.push(r))}
  /* kelompok mengikuti baris label di tabel buletin ("Lebat ..." / "Sangat Lebat ..."), bukan angka saja */
  const labSL=seg.find(z=>/^sangat\s+lebat/i.test(z.t)&&(!cap||z.y<cap.y)),labL=seg.find(z=>/^lebat\b/i.test(z.t)&&(!cap||z.y<cap.y));
  const grupSL=r=>labSL&&labL&&r.sg===seg?Math.abs(r.y-labSL.y)<=Math.abs(r.y-labL.y)&&r.y<=labSL.y+4:r.mm>=100;
  let lebat=rows.filter(r=>!grupSL(r)&&(r.mm>=50||!labL)).map(({pos,mm})=>({pos,mm})),sl=rows.filter(grupSL).map(({pos,mm})=>({pos,mm}));
  if(!rows.length){const m=t.match(/lebat[^.]{0,60}?sebanyak\s*(\d+)\s*kejadian\s*di\s+pos\s*(?:hujan\s*)?(.+?)\.\s+(?=[A-Z])/i);if(m)lebat=m[2].split(/,|\bdan\b/).map(x=>x.trim()).filter(Boolean).map(p=>({pos:p,mm:null}))}
  const ks=t.replace(/\.\s+(?=[A-Z])/g,".\u0001").split("\u0001"),kk=ks.filter(k=>/lebat/i.test(k)&&/(tercatat|sebanyak|tidak ada)/i.test(k)).join(" ");
  hasil={bulan:bm?blnTeks(bm[1],bm[2]):"",jumlah_pos:jp?+jp[1]:null,lebat,sangat_lebat:sl,teks:potongKalimat(kk.replace(/\s*\((?:lihat\s+)?(?:Tabel|Gambar)\s*[\d.\s]+\)/gi,"").replace(/([a-z])\(/g,"$1 ("),390)}});
 return hasil}
const KAT_SPI=["Amat Sangat Kering","Amat Sangat Basah","Ekstrem Kering","Ekstrem Basah","Sangat Kering","Sangat Basah","Agak Kering","Agak Basah","Kering","Basah","Normal"];
const katSpi=t=>KAT_SPI.find(k=>k.toLowerCase()===String(t).toLowerCase().replace(/\s+/g," "))||t;
function cariKab(t){let s=String(t);const hasil=[];const ganti=(re,nama)=>{s=s.replace(new RegExp(re.source,"gi"),(m,...a)=>{hasil.push({kab:nama,i:a[a.length-2]});return " ".repeat(m.length)})};
 ganti(/manokwari\s+selatan/,"Manokwari Selatan");ganti(/kota\s+sorong/,"Kota Sorong");ganti(/sorong\s+selatan/,"Sorong Selatan");ganti(/(?:kabupaten|kab\.?)\s+sorong/,"Kab. Sorong");ganti(/\bsorong\b/,"Kab. Sorong");
 KAB_POLA.filter(([n])=>!/sorong|manokwari selatan/i.test(n)).forEach(([n,re])=>ganti(re,n));return hasil.sort((a,b)=>a.i-b.i)}
function spiDariTata(tata){let o=null;const kr="("+KAT_SPI.join("|")+")";
 (tata||[]).forEach(({seg})=>{if(o)return;const semua=seg.map(s=>s.t).join(" ");if(!/PRESIPITASI\s+TERSTANDARISASI/i.test(semua)||!/kering|basah/i.test(semua))return;
  const t=teksLebar(seg),bm=t.match(/\(?SPI\)?\s+bulan\s+([A-Za-z]+)\s+(\d{4})/i)||semua.match(/BULAN\s+([A-Za-z]+)\s+(\d{4})/i);
  const pb=[],pbd=[],cat={},katRe=new RegExp(kr+"(?:\\s+(?:hingga|sampai|s\\.d\\.?|[-–])\\s+"+kr+")?","i"),kal=t.replace(/\.\s+(?=[A-Z])/gi,".\u0001").replace(/,?\s+sedangkan\s+/gi,"\u0001").split("\u0001");
  kal.forEach(k=>{const km=k.match(katRe);if(!km)return;const kab=cariKab(k);if(!kab.length)return;const kat=katSpi(km[1])+(km[2]?" – "+katSpi(km[2]):"");let q="";
   kab.forEach((x,j)=>{const antara=k.slice(j?kab[j-1].i:0,x.i);if(/\bserta\b|\bsedangkan\b/i.test(antara))q="";const qm=antara.match(/sebagian\s+besar|sebagian\s+kecil|hampir\s+seluruh|seluruh|sebagian|bagian/gi);const qq=qm&&qm[qm.length-1];
    if(qq)q=/besar|hampir/i.test(qq)?"sebagian besar wilayah":/seluruh/i.test(qq)?"":"sebagian wilayah";(cat[x.kab]=cat[x.kab]||[]).push({kat,q})})});
  const URUT_SPI=["Amat Sangat Basah","Ekstrem Basah","Sangat Basah","Basah","Agak Basah","Normal","Agak Kering","Kering","Sangat Kering","Ekstrem Kering","Amat Sangat Kering"];
  Object.keys(cat).forEach(nm=>{const L=cat[nm],utama=L.find(e=>e.q!=="sebagian wilayah");let kat,ket;
   if(utama){kat=utama.kat;ket=utama.q;const lain=L.filter(e=>e!==utama).map(e=>e.kat);if(lain.length)ket=(ket?ket+"; ":"")+"sebagian wilayah "+[...new Set(lain)].join(", ")}
   else{const v=[...new Set(L.flatMap(e=>e.kat.split(" – ")))].sort((a,b)=>URUT_SPI.indexOf(a)-URUT_SPI.indexOf(b));kat=v.length>1?v[0]+" – "+v[v.length-1]:v[0];ket="sebagian wilayah"}
   const prov=(KAB_POLA.find(p=>p[0]===nm)||[])[2];(prov==="pbd"?pbd:pb).push(ket?{kab:nm,kat,ket}:{kab:nm,kat})});
  if(!pb.length&&!pbd.length)return;const tk=kal.find(k=>/sebagian besar|secara keseluruhan|didominasi|menunjukkan/i.test(k)&&katRe.test(k)&&!cariKab(k).length)||"";
  const tk2=tk.search(/Berdasarkan|Secara keseluruhan/i)>0?tk.slice(tk.search(/Berdasarkan|Secara keseluruhan/i)):tk;o={bulan:bm?blnTeks(bm[1],bm[2]):"",pb,pbd,teks:potongKalimat(tk2,390)}});
 return o}
/* kalimat ringkasan dari paragraf buletin: judul tabel/gambar dan potongan isi tabel yang menempel dibuang */
const KUNCI_RINGKAS=/(didominasi|umumnya|sebagian besar|secara keseluruhan)/i,AWAL_KALIMAT=/(?:^|[\s(])((?:Sifat|Curah)\s+[Hh]ujan|Prakiraan\s+(?:curah|sifat|Curah|Sifat)\s+[Hh]ujan|Berdasarkan|Secara\s+(?:umum|keseluruhan)|Pada\s+(?:bulan|dasarian)|Hujan\s+(?:bulan|pada))\b/g;
function bersihKalimat(k){k=String(k||"").replace(/([a-z])(Bawah|Atas|Normal|Rendah|Menengah|Tinggi)\b/g,"$1 $2").replace(/\s*\((?:lihat\s+)?(?:Gambar|Tabel)\s*\d+(?:\s*\.\s*\d+)*\)/gi,"").replace(/\s+/g," ").trim();
 const ik=k.search(KUNCI_RINGKAS);if(ik<0)return "";let awal=-1;AWAL_KALIMAT.lastIndex=0;let m;while((m=AWAL_KALIMAT.exec(k))&&m.index<ik)awal=m.index+m[0].length-m[1].length;
 if(awal<0){const dpn=k.slice(0,ik);if(!/^[A-Z]/.test(k)||/^(?:Tabel|Gambar)\b/i.test(k)||/\b(?:Rendah|Menengah|Tinggi|Normal)\s+[A-Z]/.test(dpn)||(dpn.match(/,/g)||[]).length>1)return "";awal=0}k=k.slice(awal).trim();if(/\(\s*[<>≥≤]?\s*\d+\s*(?:[-–]\s*\d+\s*)?mm\s*\)|\b(?:Tabel|Gambar)\s*\d|\(%\)|\(mm\)|\b\d+\.\d+\.\d+\b/i.test(k)||/\b[A-Z]{3,}\s+[A-Z]{3,}\s+[A-Z]{3,}/.test(k.replace(/\b(?:TIDAK ADA|ENSO|IOD|SPI|HTH|BMKG)\b/g,""))||/\b(?:Rendah|Menengah|Tinggi|Normal)\s+(?:Sebagian|Seluruh|Hampir)\b/.test(k))return "";return k.charAt(0).toUpperCase()+k.slice(1)}
function kalimatPenting(teksHal,prov,kunci){const out=[];teksHal.join(" ").replace(/\s+/g," ").replace(/(\d)\s*\.\s+(\d)/g,"$1.$2").replace(/\b(Kab|Kec|Dist)\.\s/g,"$1\u2024 ").replace(/\.\s+/g,".\u0001").split("\u0001").forEach(k0=>{if(out.length>=2)return;const k=bersihKalimat(k0).replace(/\u2024/g,".");if(!k)return;if(kunci&&!kunci.test(k))return;const pd=/papua barat daya/i.test(k);if(prov&&(prov==="pbd")!==pd)return;if(k.length<40||k.length>400)return;if(!out.includes(k))out.push(k)});return out.join(" ")}

/* ---------- judul terbitan diambil dari nama file, mis. Buletin_Iklim_Oktober_2026.pdf -> Buletin Iklim Oktober 2026 ---------- */
function judulDariFile(nama){let t=String(nama||"").replace(/\.[a-z0-9]+$/i,"").replace(/^\s*\d{1,2}\s*[.)\-_]\s*/,"").replace(/[_\-]+/g," ").replace(/\s+/g," ").trim();
 t=t.replace(/\b(20\d\d) (20\d\d)\b/g,"$1/$2");return t.split(" ").map(w=>/^[A-Z0-9\/]{2,}$/.test(w)&&w.length<=5?w:w.charAt(0).toUpperCase()+w.slice(1)).join(" ")}
document.addEventListener("change",e=>{const el=e.target;if(!el||el.name!=="file"||!el.closest("#admTerbit"))return;const f=el.closest("#admTerbit"),fl=el.files&&el.files[0];if(!fl)return;
 if(!f.judul.value.trim()||f.judul.dataset.auto==="1"){f.judul.value=judulDariFile(fl.name);f.judul.dataset.auto="1"}
 cekEdisiForm(f)});
function cekEdisiForm(f){let n=f.querySelector("#admEdisi");if(!n){n=document.createElement("p");n.id="admEdisi";n.className="admnote";f.judul.closest("label").insertAdjacentElement("afterend",n)}
 const k=edisiKey(f.judul.value),now=new Date(Date.now()+9*3600e3),kini=now.getUTCFullYear()*12+now.getUTCMonth(),pakai=edisiKey(IK().sumber||kondisiData().otomatis||"");n.textContent="";
 if(!k||!/buletin/i.test(f.jenis.value+" "+f.judul.value))return;
 if(k<kini-1){if(f.banner.checked&&!f.querySelector('[name="id"]')){f.banner.checked=false}n.textContent="Edisi lama ("+BLN_ID[k%12]+" "+Math.floor(k/12)+"): tidak dipasang di banner beranda dan diurutkan sesuai bulan edisinya."+(pakai&&k<pakai?" Isi halaman Iklim dan Kondisi Iklim tidak akan diubah, karena web sedang memakai edisi yang lebih baru.":"")}
 else if(pakai&&k<pakai)n.textContent="Edisi ini lebih lama dari yang sedang dipakai web, jadi isi halaman Iklim dan Kondisi Iklim tidak akan diubah."}
document.addEventListener("input",e=>{if(e.target&&e.target.name==="judul"&&e.target.closest("#admTerbit")){e.target.dataset.auto="0";cekEdisiForm(e.target.closest("#admTerbit"))}});
/* edisi buletin = bulan pembuatan; data analisis = bulan sebelumnya */
const BULAN_ID=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
function ringkasLokal(judul){const m=String(judul||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);if(!m)return "";
 const i=BULAN_ID.indexOf(m[1]),th=+m[2],b=k=>{const x=((i+k)%12+12)%12,t=th+Math.floor((i+k)/12);return besarAwal(BULAN_ID[x])+" "+t};
 return `Buletin Iklim edisi ${b(0)} berisi analisis curah hujan dan sifat hujan ${b(-1)}, hujan ekstrem, hari tanpa hujan, dan indeks kekeringan (SPI), serta prakiraan hujan ${b(1)} – ${b(3)} untuk Papua Barat dan Papua Barat Daya.`}
function konteksEdisi(judul){const m=String(judul||"").toLowerCase().match(BLN_RE);if(!m)return "";const i=BULAN_ID.indexOf(m[1].toLowerCase()),th=+(m[2]||0)||new Date().getFullYear();
 const ia=(i+11)%12,ta=i===0?th-1:th;return `Dokumen ini edisi ${besarAwal(BULAN_ID[i])} ${th}. Data ANALISIS (curah hujan, sifat hujan, hujan ekstrem, hari tanpa hujan, SPI) adalah bulan ${besarAwal(BULAN_ID[ia])} ${ta} (bulan sebelumnya); PRAKIRAAN untuk bulan-bulan sesudahnya. Bila ada judul halaman atau tabel yang menyebut bulan/tahun lain yang tidak cocok, itu sisa template: abaikan.`}
const PETUNJUK_AI={
 analisis:"Bila satu kabupaten muncul di lebih dari satu kategori, tulis rentang mis. 'Bawah Normal – Normal' dan jelaskan di ket (mis. 'Sebagian wilayah Normal'). Kata 'sebagian' wajib dicatat di ket. Jangan menyamaratakan semua kabupaten bila kalimat penjelasan menyebut 'didominasi X hingga Y'. teks_pb dan teks_pbd berupa kalimat ringkasan dari paragraf penjelasan.",
 prakiraan:"Hanya SATU bulan (bulan pada teks ini). Bila satu kabupaten muncul di lebih dari satu kategori sifat, tulis rentang mis. 'Normal – Atas Normal'. Kalimat 'didominasi X hingga Y' berarti wilayahnya campuran, jadi jangan menulis satu kategori untuk semua kabupaten. Catatan seperti 'sebagian kecil Kab. X Tinggi (301-500 mm)' wajib ditulis di ket kabupaten itu. Kabupaten yang disebut 'seluruh kabupaten' mendapat kategori itu. teks = 1-2 kalimat dari paragraf penjelasan.",
 ekstrem:"jumlah_pos = jumlah pos hujan yang DIPANTAU (mis. 30), bukan jumlah kejadian. Pos dengan hujan 100 mm atau lebih dimasukkan ke sangat_lebat. teks = 1-2 kalimat ringkasan.",
 hth:"bulan ditulis lengkap dengan tahun (mis. 'September 2026'). Untuk tiap dasarian isi teks berupa 1 kalimat dari paragraf penjelasannya. teks = 1-2 kalimat tentang kondisi dasarian terakhir.",
 spi:"teks WAJIB berupa 1-2 kalimat ringkasan kondisi kekeringan (bukan judul dokumen). Bila kalimat menyebut 'sebagian', tulis di ket.",
 musim:"Tulis setiap ZOM yang disebut. Isi sebuah kolom hanya bila tertulis jelas untuk ZOM itu; JANGAN menebak dari angka ringkasan (mis. '3 ZOM maju'). Bila dokumen tidak menulis perbandingan terhadap normal per ZOM, kosongkan kolom itu. teks = 2-3 kalimat ringkasan untuk masyarakat."};
/* kartu Kondisi Iklim dihitung dari tabel hasil baca (lebih tepat daripada tebakan AI) */
const domin=(arr,f)=>{const m=new Map();(arr||[]).forEach(r=>{const v=f(r);if(v)m.set(v,(m.get(v)||0)+1)});return [...m.entries()].sort((a,b)=>b[1]-a[1])};
/* kategori terbanyak di tabel; bila seri, ditulis rentang (mis. "Menengah – Tinggi") */
const gabungProv=(a,b,urut)=>!a||!b||a===b?(a||b):rentang([a,b].flatMap(v=>v.split(/\s*[–-]\s*/)).filter(v=>urut.includes(v)),urut);
const mayor=(rows,key,urut)=>{const m=domin(rows,r=>String(r[key]||"").trim());if(!m.length)return "";const top=m.filter(x=>x[1]===m[0][1]).map(x=>x[0]);return top.length===1?top[0]:rentang(top.flatMap(v=>v.split(/\s*[–-]\s*/)).filter(v=>urut.includes(v)),urut)||top[0]};
const KAT_URUT=[["sangat_pendek","Sangat Pendek","1–5 hari"],["pendek","Pendek","6–10 hari"],["menengah","Menengah","11–20 hari"],["panjang","Panjang","21–30 hari"],["sangat_panjang","Sangat Panjang","31–60 hari"],["ekstrem","Kekeringan Ekstrem","lebih dari 60 hari"]];
function kartuDariIsi(isi){const k=[],t={};
 const an=isi.analisis;if(an&&((an.pb||[]).length||(an.pbd||[]).length)){const semua=[...(an.pb||[]),...(an.pbd||[])];
  const dm=an.dom||{},xb=mayor(an.pb,"sh",KAT_SH)||dm.pb_sh,xd=mayor(an.pbd,"sh",KAT_SH)||dm.pbd_sh,nch=gabungProv(mayor(an.pb,"ch",KAT_CH),mayor(an.pbd,"ch",KAT_CH),KAT_CH)||(dm.pb_ch&&dm.pb_ch===dm.pbd_ch?dm.pb_ch:"");
  if(nch){k.push({kunci:"hujan",judul:"Hujan "+(an.bulan||""),nilai:nch,ket:xb&&xd&&xb===xd?"Sifat "+xb+" di kedua provinsi":[xb?"Papua Barat: "+xb:"",xd?"Papua Barat Daya: "+xd:""].filter(Boolean).join(" · "),angka:null});t.hujan=[an.teks_pb,an.teks_pbd].filter(Boolean).join(" ")}}
 const pr=isi.prakiraan&&isi.prakiraan.bulan;if(Array.isArray(pr)&&pr.length){const m=pr.slice().sort((a,b)=>urutBulan(a.bulan)-urutBulan(b.bulan))[0];
  const dm=m.dom||{},xb=mayor(m.pb,"sh",KAT_SH)||dm.pb_sh,xd=mayor(m.pbd,"sh",KAT_SH)||dm.pbd_sh,nch=gabungProv(mayor(m.pb,"ch",KAT_CH),mayor(m.pbd,"ch",KAT_CH),KAT_CH)||dm.pb_ch;
  if(nch){k.push({kunci:"prakiraan",judul:"Prakiraan "+(m.bulan||""),nilai:nch,ket:[xb?"Papua Barat: "+xb:"",xd?"Papua Barat Daya: "+xd:""].filter(Boolean).join(" · "),angka:null});t.prakiraan=pr.map(x=>x.teks).filter(Boolean).join(" ")}}
 const h=isi.hth;if(h&&Array.isArray(h.dasarian)&&h.dasarian.length){const d=h.dasarian[h.dasarian.length-1],n=c=>Math.max(0,+d[c]||0);
  const berat=KAT_URUT.slice(3).filter(([c])=>n(c)>0).sort((a,b)=>n(b[0])-n(a[0]));const pilih=berat[0]||KAT_URUT.slice().sort((a,b)=>n(b[0])-n(a[0]))[0];
  const eks=n("ekstrem")&&pilih[0]!=="ekstrem"?" · "+n("ekstrem")+" pos Kekeringan Ekstrem":"";
  k.push({kunci:"hth",judul:"Hari Tanpa Hujan",nilai:n(pilih[0])+" pos "+pilih[1],ket:"Dasarian "+(d.das||"")+" "+(h.bulan||"")+eks,angka:n(pilih[0])});
  t.hth=`Pada Dasarian ${d.das||""} ${h.bulan||""}, ${n(pilih[0])} pos hujan masuk kategori ${pilih[1]} (${pilih[2]} tanpa hujan)${eks?" dan "+n("ekstrem")+" pos Kekeringan Ekstrem":""}.`}
 const sp=isi.spi;if(sp&&((sp.pb||[]).length||(sp.pbd||[]).length)){const nk=v=>String(v||"").replace(/\s*(–|-|—|hingga|s\.d\.?)\s*/gi," – ").replace(/\s+/g," ").trim(),semuaS=[...(sp.pb||[]),...(sp.pbd||[])],kat=domin(semuaS,r=>nk(r.kat)),tot=new Set(semuaS.filter(r=>r.kat).map(r=>r.kab)).size;if(kat.length){
  const lain=kat.slice(1,3).map(x=>x[0]+" ("+x[1]+")").join(" dan "),dk=tot<7&&String(sp.teks||"").match(new RegExp("didominasi[^.]*?("+KAT_SPI.join("|")+")","i")),kd=dk&&katSpi(dk[1]);
  if(kd)k.push({kunci:"spi",judul:"SPI "+(sp.bulan||""),nilai:kd,ket:kd+" di sebagian besar wilayah; "+kat.slice(0,3).map(x=>x[0]+" di "+x[1]+" kabupaten/kota").join(", "),angka:null});
  else k.push({kunci:"spi",judul:"SPI "+(sp.bulan||""),nilai:kat[0][0].split(" – ")[0],ket:kat[0][0]+" di "+kat[0][1]+" dari "+tot+" kabupaten/kota"+(lain?"; lainnya "+lain:""),angka:null});if(sp.teks&&!/^buletin/i.test(sp.teks))t.spi=sp.teks}}
 return {kartu:k,teks:t}}
const KARTU_BAGIAN={analisis:"hujan",prakiraan:"prakiraan",hth:"hth",spi:"spi"};
async function perbaruiKondisiDariIsi(isi,judul,basi,hanya){const isi2={...isi};(basi||[]).forEach(b=>delete isi2[b]);if(Array.isArray(hanya))Object.keys(KARTU_BAGIAN).forEach(b=>{if(!hanya.includes(b))delete isi2[b]});const {kartu,teks}=kartuDariIsi(isi2);(basi||[]).forEach(b=>delete teks[KARTU_BAGIAN[b]]);await muatUlangKA();const lama=kondisiData(),urut=KUNCI_KARTU.map(x=>x[0]);
 const buang=new Set((basi||[]).map(b=>KARTU_BAGIAN[b]).filter(Boolean));if(!kartu.length&&!buang.size)return 0;
 const baru=kartu.map(x=>({...x,src:judul}));const semua=[...(lama.kartu||[]).filter(x=>!baru.some(n=>n.kunci===x.kunci)&&!buang.has(x.kunci)),...baru].sort((a,b)=>urut.indexOf(a.kunci)-urut.indexOf(b.kunci));
 Object.keys(teks).forEach(x=>teks[x]=potongKalimat(teks[x],390));
 await admJSON("/admin/kondisi",{sumber:baru.length?judul:(lama.sumber||judul),ringkasan:teks.hujan?potongKalimat(teks.hujan,390):(lama.ringkasan||""),kartu:semua,teks:{...(lama.teks||{}),...teks},teks_src:{...(lama.teks_src||{}),...Object.fromEntries(Object.keys(teks).map(k=>[k,judul]))},otomatis:baru.length?judul:(lama.otomatis||"")});return baru.length}

/* ---------- teks lain di halaman Iklim (bisa diubah lewat admin, tanpa coding) ---------- */
const TEKS_EDIT=[
 ["enso_prediksi","ENSO & IOD · Prediksi El Niño/La Niña","Bertahan hingga awal 2027"],
 ["iod_prediksi","ENSO & IOD · Prediksi IOD","Positif hingga akhir 2026"],
 ["enso_catatan","ENSO & IOD · Catatan di kartu ENSO","El Niño 2026 merupakan yang terkuat sepanjang pencatatan instrumental modern (Super El Niño)."],
 ["hujan_tinggi_nihil","Peringatan Hujan Tinggi · Kalimat saat tidak ada peringatan","Tetap waspada terhadap hujan lebat lokal, terutama di sekitar Pegunungan Arfak."],
 ["hujan_tinggi_catatan","Peringatan Hujan Tinggi · Catatan (baris 1 = judul, baris berikutnya = isi). Kosongkan untuk memakai catatan hujan ekstrem dari buletin terbaru.",""],
 ["kekeringan_kesimpulan","Kekeringan & SPI · Kesimpulan. Kosongkan untuk memakai ringkasan SPI dari buletin terbaru.",""],
 ["zom_catatan","Zona Musim · Catatan di bawah tabel Non Zona Musim","Saat El Niño sangat kuat 2026, sebagian wilayah Tipe 1 Musim sempat mengalami kondisi seperti musim kemarau."],
 ["iklim_angka","Iklim Papua Barat · Angka utama (satu baris: nilai | judul | keterangan)","13 | Kabupaten/kota | 7 di Papua Barat · 6 di Papua Barat Daya\n21 | Zona Musim (ZOM) | 11 ZOM · 10 Non ZOM\n3 | Pola hujan utama | Monsunal · Ekuatorial · Lokal\n39,2 °C | Suhu tertinggi 2026 | Tertinggi se-Indonesia, Juli 2026\n+3,08 | Niño 3.4 ASO 2026 | El Niño sangat kuat"],
 ["def_elnino","ENSO & IOD · Kartu penjelasan El Niño","Suhu muka laut Pasifik tengah lebih hangat (indeks ≥ +0,5). Umumnya mengurangi curah hujan dan memperpanjang deret hari kering."],
 ["def_lanina","ENSO & IOD · Kartu penjelasan La Niña","Suhu muka laut Pasifik tengah lebih dingin (indeks ≤ −0,5). Umumnya menambah curah hujan dan risiko banjir serta longsor."],
 ["def_iod","ENSO & IOD · Kartu penjelasan IOD","Beda suhu muka laut Samudra Hindia barat dan timur. IOD positif cenderung mengurangi hujan di Indonesia bagian barat."],
 ["iklim_catatan_judul","Iklim Papua Barat · Judul catatan iklim tahun ini","Tahun El Niño Sangat Kuat"],
 ["iklim_catatan","Iklim Papua Barat · Garis waktu catatan iklim (satu baris satu kejadian: waktu | judul | isi | tautan). Tautan boleh alamat https:// atau halaman web kita seperti #hujan-bulanan; boleh dikosongkan.",CATATAN_BAWAAN.map(r=>r.join(" | ")).join("\n")],
 ["musim_reko_hujan","Prediksi Musim Hujan · Rekomendasi (satu baris: sektor | saran). Kosongkan untuk rekomendasi bawaan.",""],
 ["musim_reko_kemarau","Prediksi Musim Kemarau · Rekomendasi (satu baris: sektor | saran). Kosongkan untuk rekomendasi bawaan.",""]];
const TH=(k,def)=>{const v=((IK().teks_hal)||{})[k];return v&&String(v).trim()?String(v):(def!==undefined?def:((TEKS_EDIT.find(x=>x[0]===k)||[])[2]||""))};
const barisTH=(k,def)=>TH(k,def).split(/\n+/).map(l=>l.split("|").map(x=>x.trim())).filter(x=>x[0]);

/* ---------- tab admin "Isi Halaman Iklim" (membetulkan hasil AI) ---------- */
const brs=(a,f)=>(Array.isArray(a)?a:[]).map(r=>f.map(k=>r[k]==null?"":String(r[k])).join(" | ")).join("\n");
const urai=(t,f)=>String(t||"").split(/\n+/).map(l=>l.split("|").map(x=>x.trim())).filter(x=>x[0]).map(x=>{const o={};f.forEach((k,i)=>{const v=x[i]||"";o[k]=/^(mm|no|jumlah_pos|sangat_pendek|pendek|menengah|panjang|sangat_panjang|ekstrem)$/.test(k)&&v!==""&&!isNaN(+v.replace(",","."))?+v.replace(",","."):v});return o});
function statusTahan(){muatPusat();const b=buletinTerpasang(),tg=ms=>tglPendek(tglWIT(ms));
 const baris=j=>{const g=pusatGanti(j),nm=j==="hujan"?"Peta hujan bulanan":"Peta SPI";if(!PUSAT)return `<li>${nm}: memuat rilisan BMKG Pusat… buka ulang tab ini sebentar lagi.</li>`;if(!g)return `<li>${nm}: belum ada rilisan BMKG Pusat yang terbaca.</li>`;
  const r=`${escH(judulID(g.x.judul))} (rilis ${tglPendek(g.x.tanggal)})`;return `<li>${nm}: ${r} — ${g.status==="aktif"?"<b>sedang tampil</b> menggantikan kartu &amp; peta dari buletin":g.status==="ditahan"?"<b>ditahan</b>, tampil otomatis mulai "+tg(b.sampai):g.status==="nonaktif"?"<b>tidak dipakai</b> karena dipilih \"Selalu buletin kami\"":"tidak lebih baru dari buletin kami, jadi tidak dipakai"}.</li>`};
 const md=(KA&&KA.pengaturan&&KA.pengaturan.pusat_mode)||"otomatis",op=(v,t)=>`<label class="pilihmode"><input type="radio" name="pusat_mode" value="${v}"${md===v?" checked":""}><span>${t}</span></label>`;
 return `<div class="admnote kotaktahan"><b>Masa tahan buletin (${TAHAN_HARI} hari)</b><br>${b?`${escH(b.judul)} dipasang ${tg(b.ms)}. ${Date.now()<b.sampai?"Isinya diutamakan sampai "+tg(b.sampai)+".":"Masa tahan sudah lewat sejak "+tg(b.sampai)+"."}`:"Belum ada buletin yang dipasang."}
 <ul style="margin:6px 0 0 18px;padding:0">${baris("hujan")}${baris("spi")}</ul>
 <form id="admPusatMode" style="margin:10px 0 6px"><b>Pilihan tampilan untuk pengunjung:</b>
 ${op("otomatis","<b>Otomatis (disarankan)</b>: buletin kami 14 hari, lalu rilisan Pusat yang lebih baru tampil sendiri.")}
 ${op("pusat","<b>Tampilkan rilisan Pusat sekarang</b> untuk semua pengunjung, tanpa menunggu 14 hari.")}
 ${op("buletin","<b>Selalu buletin kami</b>: rilisan Pusat tidak menggantikan kartu &amp; peta.")}
 <button class="pbtn kecil" type="submit">Terapkan</button> <a class="pbtn kecil ghost" href="/?pratinjau=pusat" target="_blank" rel="noopener">Pratinjau dulu (hanya di browser ini) ↗</a></form><small>Tabel per kabupaten, hari tanpa hujan, hujan ekstrem, dan prakiraan tetap dari buletin kami. Unggah buletin edisi baru untuk memulai masa tahan berikutnya.</small></div>`}
function admIklim(){const x0=IK(),x={...x0,musim_hujan:x0.musim_hujan&&zomNorm(x0.musim_hujan).length?x0.musim_hujan:{periode:"2026/2027",zom:zomTerbaru().zom,teks:""}},an=x.analisis||bagIK("analisis"),pr=(x.prakiraan&&x.prakiraan.bulan)||bagIK("prakiraan").bulan||[],ek=x.ekstrem||bagIK("ekstrem"),h=x.hth||bagIK("hth"),sp=x.spi||bagIK("spi");
 const ta=(nama,isi,ph,r)=>`<textarea name="${nama}" rows="${r||8}" placeholder="${esc(ph||"")}">${esc(isi)}</textarea>`;
 const HS=[["Analisis hujan","Analisis & Prakiraan Hujan Bulanan"],["Prakiraan bulan","Analisis & Prakiraan Hujan Bulanan"],["Hujan ekstrem","Peringatan Hujan Tinggi"],["Hari tanpa hujan","Monitoring Hari Tanpa Hujan"],["SPI","Kekeringan & SPI"],["Prediksi musim","Prediksi Musim & Zona Musim"],["Peta dari","Beberapa halaman Iklim"],["Teks lain","Halaman-halaman Iklim"]];
 const sec=(judul,ket,isi)=>`<details class="admsec"><summary>${(h=>h?`<span class="admhal">${h[1]}</span>`:"")(HS.find(([p])=>String(judul).startsWith(p)))}${judul}</summary><p class="admnote">${ket}</p>${isi}</details>`;
 const bulanPr=[0,1,2].map(i=>pr[i]||{});
 return statusTahan()+`<form id="admIklim"><p class="admnote">Isi di bawah ini diisi sendiri oleh AI saat buletin atau press release diunggah. Bila ada yang keliru, betulkan lalu tekan <b>Simpan</b>. Kosongkan semua baris suatu bagian untuk kembali memakai isi bawaan. Pemisah kolom adalah garis tegak <b>|</b>.</p>
 ${x.diubah?`<p class="admnote">Terakhir diperbarui dari: <b>${esc(x.sumber||"-")}</b> (${esc(tglPendek(String(x.diubah).slice(0,10)))}).</p>`:'<p class="admnote">Belum ada isi dari dokumen; halaman Iklim memakai isi bawaan.</p>'}
 ${cekIsiHTML(periksaIsi(x))}
 <label>Sumber (nama dokumen)<input name="sumber" value="${esc(x.sumber||"")}"></label>
 ${sec("Analisis hujan bulan lalu","Satu baris per kabupaten: Kabupaten | Curah hujan | Sifat hujan | Catatan. Untuk rincian distrik tulis Kabupaten / Distrik, mis. Manokwari / Masni | Menengah | Normal |",`<label>Bulan<input name="an_bulan" value="${esc(an.bulan||"")}"></label><label>Papua Barat${ta("an_pb",brs(gabungDis(an.pb),["kab","ch","sh","ket"]),"Manokwari | Menengah | Bawah Normal |")}</label><label>Papua Barat Daya${ta("an_pbd",brs(gabungDis(an.pbd),["kab","ch","sh","ket"]))}</label><label>Ringkasan Papua Barat${ta("an_tpb",an.teks_pb||"","",2)}</label><label>Ringkasan Papua Barat Daya${ta("an_tpbd",an.teks_pbd||"","",2)}</label>`)}
 ${bulanPr.map((m,i)=>sec("Prakiraan bulan ke-"+(i+1)+(m.bulan?" · "+esc(m.bulan):""),"Kabupaten | Curah hujan | Sifat hujan | Catatan",`<label>Bulan<input name="pr${i}_bulan" value="${esc(m.bulan||"")}"></label><label>Papua Barat${ta("pr"+i+"_pb",brs(gabungDis(m.pb),["kab","ch","sh","ket"]))}</label><label>Papua Barat Daya${ta("pr"+i+"_pbd",brs(gabungDis(m.pbd),["kab","ch","sh","ket"]))}</label><label>Ringkasan${ta("pr"+i+"_teks",m.teks||"","",2)}</label>`)).join("")}
 ${sec("Hujan ekstrem harian","Satu baris per pos: Nama pos | Jumlah hujan (mm)",`<div class="admgrid"><label>Bulan<input name="ek_bulan" value="${esc(ek.bulan||"")}"></label><label>Jumlah pos dipantau<input name="ek_pos" value="${esc(ek.jumlah_pos||"")}"></label></div><label>Hujan lebat (≥ 50 mm/hari)${ta("ek_lebat",brs(ek.lebat,["pos","mm"]),"Prafi | 58",3)}</label><label>Hujan sangat lebat (≥ 100 mm/hari)${ta("ek_sl",brs(ek.sangat_lebat,["pos","mm"]),"",2)}</label><label>Ringkasan${ta("ek_teks",ek.teks||"","",2)}</label>`)}
 ${sec("Hari tanpa hujan","Satu baris per dasarian: Dasarian | Sangat Pendek | Pendek | Menengah | Panjang | Sangat Panjang | Kekeringan Ekstrem (jumlah pos)",`<label>Bulan<input name="hth_bulan" value="${esc(h.bulan||"")}"></label><label>Jumlah pos per kategori${ta("hth_das",brs(h.dasarian,["das","sangat_pendek","pendek","menengah","panjang","sangat_panjang","ekstrem"]),"I | 24 | 0 | 1 | 0 | 0 | 0",3)}</label><label>Ringkasan${ta("hth_teks",h.teks||"","",2)}</label>`)}
 ${sec("SPI (kekeringan)","Kabupaten | Kategori | Catatan",`<label>Bulan<input name="spi_bulan" value="${esc(sp.bulan||"")}"></label><label>Papua Barat${ta("spi_pb",brs(gabungDis(sp.pb),["kab","kat","ket"]))}</label><label>Papua Barat Daya${ta("spi_pbd",brs(gabungDis(sp.pbd),["kab","kat","ket"]))}</label><label>Ringkasan${ta("spi_teks",sp.teks||"","",2)}</label>`)}
 ${["hujan","kemarau"].map(jn=>{const m=x["musim_"+jn]||{};return sec("Prediksi musim "+jn+(m.periode?" "+esc(m.periode):""),"Satu baris per ZOM: No ZOM | Wilayah | Awal | Dibanding normal | Sifat | Puncak",`<label>Periode<input name="m${jn}_per" value="${esc(m.periode||"")}" placeholder="2026/2027"></label><label>Tabel ZOM${ta("m"+jn+"_zom",brs(m.zom,["no","wil","awal","banding","sifat","puncak"]),"636 | Kab. Manokwari (Manokwari Utara, ...) | Oktober 2026 | Maju | Normal | Januari 2027",6)}</label><label>Ringkasan${ta("m"+jn+"_teks",m.teks||"","",2)}</label>`)}).join("")}
 ${secUnggahPeta(x)} ${sec("Peta dari dokumen ("+((x.peta||[]).length)+")","Peta diambil otomatis dari gambar berketerangan \"Gambar ...\" di dalam dokumen. Betulkan keterangan atau centang Hapus.",(x.peta||[]).length?`<div class="admpeta">${x.peta.map((p,i)=>`<div class="admpetai"><img src="${fileURL(p.file)}" alt="" loading="lazy"><input name="pt${i}_judul" value="${esc(p.judul)}"><label class="cek"><input type="checkbox" name="pt${i}_hapus"> Hapus</label></div>`).join("")}</div>`:'<p class="admnote">Belum ada peta.</p>')}
 ${sec("Teks lain di halaman Iklim","Teks yang tidak berasal dari buletin. Ubah bila ada informasi baru, lalu tekan Simpan.",TEKS_EDIT.map(([k,l,d])=>`<label>${esc(l)}${ta("th_"+k,((x.teks_hal||{})[k])||d,"",/\\n|catatan|angka|reko/.test(k+d)?5:2)}</label>`).join(""))}
 <label class="cek" style="flex-direction:row;align-items:center;gap:8px;margin:12px 0"><input type="checkbox" name="hitungKartu"> Hitung ulang kartu <b>Kondisi Iklim</b> di Beranda dari tabel di atas (kartu yang pernah diubah manual akan diganti)</label>
 <p><button class="pbtn" type="submit">Simpan</button></p><p class="admmsg" id="admMsg"></p></form>`}
async function simpanIklim(f){const v=n=>(f.querySelector(`[name="${n}"]`)||{}).value||"",o={sumber:v("sumber")};const x=IK();
 const an={bulan:v("an_bulan"),pb:pisahDis(urai(v("an_pb"),["kab","ch","sh","ket"])),pbd:pisahDis(urai(v("an_pbd"),["kab","ch","sh","ket"])),teks_pb:v("an_tpb"),teks_pbd:v("an_tpbd")};if(an.pb.length||an.pbd.length)o.analisis=an;
 const pr=[0,1,2].map(i=>({bulan:v("pr"+i+"_bulan"),pb:pisahDis(urai(v("pr"+i+"_pb"),["kab","ch","sh","ket"])),pbd:pisahDis(urai(v("pr"+i+"_pbd"),["kab","ch","sh","ket"])),teks:v("pr"+i+"_teks")})).filter(m=>m.bulan&&(m.pb.length||m.pbd.length));if(pr.length)o.prakiraan={bulan:pr};
 const ek={bulan:v("ek_bulan"),jumlah_pos:+v("ek_pos")||0,lebat:urai(v("ek_lebat"),["pos","mm"]),sangat_lebat:urai(v("ek_sl"),["pos","mm"]),teks:v("ek_teks")};if(ek.teks||ek.lebat.length||ek.sangat_lebat.length)o.ekstrem=ek;
 const h={bulan:v("hth_bulan"),dasarian:urai(v("hth_das"),["das","sangat_pendek","pendek","menengah","panjang","sangat_panjang","ekstrem"]),teks:v("hth_teks")};if(h.dasarian.length)o.hth=h;
 const sp={bulan:v("spi_bulan"),pb:pisahDis(urai(v("spi_pb"),["kab","kat","ket"])),pbd:pisahDis(urai(v("spi_pbd"),["kab","kat","ket"])),teks:v("spi_teks")};if(sp.pb.length||sp.pbd.length)o.spi=sp;
 ["hujan","kemarau"].forEach(jn=>{const z=urai(v("m"+jn+"_zom"),["no","wil","awal","banding","sifat","puncak"]);if(z.length)o["musim_"+jn]={jenis:jn,periode:v("m"+jn+"_per"),zom:z,teks:v("m"+jn+"_teks")}});
 o.teks_hal={};TEKS_EDIT.forEach(([k,,d])=>{const t=v("th_"+k).trim();if(t&&t!==d)o.teks_hal[k]=t});
 o.peta=(x.peta||[]).map((p,i)=>{const j=v("pt"+i+"_judul").trim()||p.judul,kl=j!==p.judul?klasPeta(j):null;return {...p,...(kl?{sub:kl.sub||"",prov:kl.prov||"",bulan:kl.bulan||p.bulan||""}:{}),sumber:p.manual?p.sumber:(o.sumber||p.sumber),judul:j,_h:(f.querySelector(`[name="pt${i}_hapus"]`)||{}).checked}}).filter(p=>!p._h).map(({_h,...p})=>p);
 await admJSON("/admin/iklim",o);let nk=0;const hk=f.querySelector('[name="hitungKartu"]');if(hk&&hk.checked){try{nk=await perbaruiKondisiDariIsi(o,o.sumber||"Isi Halaman Iklim")}catch(er){nk=0}}await muatUlangKA();pesan("Isi halaman Iklim disimpan."+(nk?" "+nk+" kartu Kondisi Iklim dihitung ulang.":"")+" Tampil di web paling lama 1 menit.")}

/* ---------- tab admin "Panduan" ---------- */
/* ===== ADMIN: editor daftar umum (tambah, hapus, naik/turun) ===== */
function ldField([k,l,t,o],v){v=v==null?"":v;const n=` name="${k}"`;
 if(t==="area")return `<label class="lf lw">${l}<textarea${n} rows="${o||3}">${escH(v)}</textarea></label>`;
 if(t==="pilih")return `<label class="lf">${l}<select${n}>${o.map(([a,b])=>`<option value="${a}"${a===v?" selected":""}>${b}</option>`).join("")}</select></label>`;
 /* kotak centang: o = nilai awal untuk baris baru (bawaan tercentang, kecuali o===false) */
 if(t==="cek"){const on=v===""||v==null?o!==false:v!==false;return `<label class="cek lf"><input type="checkbox"${n}${on?" checked":""}> ${l}</label>`}
 if(t==="tgl")return `<label class="lf">${l}<input type="date"${n} value="${escH(v)}"></label>`;
 if(t==="gambar")return `<label class="lf">${l}<input type="hidden"${n} value="${escH(v)}">${v?`<img class="ldprev" src="${escH(fileURL(v))}" alt="">`:""}<input type="file" name="${k}_file" accept="image/jpeg,image/png,image/webp">${v?`<span class="cek"><input type="checkbox" name="${k}_hapus"> hapus gambar</span>`:""}</label>`;
 return `<label class="lf${o==="lebar"?" lw":""}">${l}<input${t==="url"?' inputmode="url"':""}${n} value="${escH(v)}"></label>`}
function editorDaftar(id,kolom,rows){const baris=r=>`<div class="lrow">${kolom.map(c=>ldField(c,r[c[0]])).join("")}<div class="lbtn"><button type="button" class="mini" data-naik title="Naikkan">↑</button><button type="button" class="mini" data-turun title="Turunkan">↓</button><button type="button" class="mini bahaya" data-hapusbaris title="Hapus">✕</button></div></div>`;
 return `<div class="ldaftar" id="${id}">${rows.map(baris).join("")}</div><template id="${id}Tpl">${baris({})}</template><button type="button" class="mini" data-tambahke="${id}">+ Tambah baris</button>`}
async function ambilDaftar(id,kolom){const out=[];for(const r of document.querySelectorAll(`#${id} .lrow`)){const o={};
  for(const [k,,t] of kolom){const el=r.querySelector(`[name="${k}"]`);if(!el)continue;
   if(t==="cek")o[k]=el.checked;else if(t==="gambar"){const f=r.querySelector(`[name="${k}_file"]`).files[0],hp=r.querySelector(`[name="${k}_hapus"]`);
    if(f){if(f.size>30*1048576)throw new Error("Gambar "+f.name+" terlalu besar (lebih dari 30 MB).");pesan("Mengunggah gambar…");o[k]=(await admUnggah(f)).kunci}else o[k]=hp&&hp.checked?"":el.value}
   else o[k]=el.value.trim()}
  out.push(o)}return out}
const cekTautan=(arr,k,nama)=>{arr.forEach((x,i)=>{if(x[k]&&!lnkAman(x[k]))throw new Error(`${nama} baris ${i+1}: tautan harus diawali https:// atau # (contoh #prakiraan-musim).`)})};
const OPSI_HAL=()=>[...new Set(Object.keys(P).filter(k=>k!=="admin"))].map(k=>"#"+k).join(", ");
const KOL_BANNER=[["aktif","Tampilkan","cek"],["label","Label kecil"],["judul","Judul","teks","lebar"],["teks","Isi singkat","area",2],["tombol","Tulisan tombol"],["link","Tautan tombol (https://… atau #halaman)","url"],["gambar","Gambar (opsional; foto besar dikecilkan otomatis)","gambar"],["keterangan","Keterangan gambar"],["seni","Ilustrasi bila tanpa gambar","pilih",[["hujan","Hujan"],["panas","Panas/kering"],["alat","Alat"],["enso","ENSO"]]],["sampai","Tampil sampai (opsional)","tgl"],["enso","Judul & isi otomatis dari angka ENSO terbaru","cek",false]];
const KOL_PINTAS=[["judul","Judul"],["sub","Keterangan kecil (kosongkan pada Prediksi Musim agar otomatis)"],["link","Tautan (#halaman atau https://…)","url"],["ikon","Ikon","pilih",[["cal","Kalender"],["cloud","Awan"],["alert","Peringatan"],["map","Peta"],["drop","Tetes air"]]]];
const KOL_MEDIA=[["tanggal","Tanggal","tgl"],["media","Nama media"],["judul","Judul berita","teks","lebar"],["url","Alamat berita (https://…)","url","lebar"],["gambar","Gambar sampul (boleh kosong)","url","lebar"],["ringkas","Ringkasan singkat (boleh kosong)","teks","lebar"]];
const KOL_KAL=[["judul","Waktu (mis. Setiap bulan)"],["isi","Isi","area",2],["link","Tautan (#halaman)","url"]];
function admBerandaIsi(){const bn=PG("banner"),bw=Array.isArray(bn)?bn:(typeof BANNER!=="undefined"?BANNER:[]).map(b=>({...b,aktif:true,enso:!!b.enso,gambar:b.gambar||""}));
 const pt=PG("pintasan"),md=PG("media");
 return `<form id="admBanner"><fieldset class="kdrow"><legend>Slide banner tetap</legend><p class="admnote">Slide ini tampil di banner beranda setelah peringatan, berita kegiatan, publikasi, dan rilisan BMKG Pusat (maksimal 8 slide seluruhnya). Hapus centang <b>Tampilkan</b> untuk menyembunyikan sementara; isi <b>Tampil sampai</b> agar hilang otomatis.</p>
 ${editorDaftar("ldBanner",KOL_BANNER,bw)}<button class="pbtn" type="submit">Simpan slide banner</button></fieldset></form>
 <form id="admPintasan" class="admsub"><fieldset class="kdrow"><legend>Tombol pintasan di beranda</legend><p class="admnote">Halaman yang bisa dituju: ${escH(OPSI_HAL())}.</p>
 ${editorDaftar("ldPintas",KOL_PINTAS,Array.isArray(pt)&&pt.length?pt:PINTASAN_BAWAAN)}<button class="pbtn" type="submit">Simpan tombol pintasan</button></fieldset></form>
 <form id="admMedia" class="admsub"><fieldset class="kdrow"><legend>Liputan media tentang kantor kita</legend><p class="admnote">Tampil di halaman Berita dan banner (bila 14 hari terakhir). Liputan yang ditemukan robot tetap masuk otomatis; daftar ini untuk menambah atau mengoreksi secara manual.</p>
 <div class="ld-tautan"><label>Tambah dari tautan berita<input type="url" id="mdTautan" inputmode="url" placeholder="Tempel alamat berita, mis. https://rri.co.id/…"></label><button type="button" class="pbtn sek" id="mdAmbil">Isi otomatis</button></div><p class="admnote" id="mdKet" role="status"></p>
 ${editorDaftar("ldMedia",KOL_MEDIA,Array.isArray(md)?md:(typeof BERITA_MEDIA!=="undefined"?BERITA_MEDIA:[]))}<button class="pbtn" type="submit">Simpan liputan media</button></fieldset></form>`}
function admTeksHal(){const L=layananData(),tw=TW();
 return `<form id="admLayanan"><fieldset class="kdrow"><legend>Halaman Permintaan Pelayanan Data</legend>
 <label>Data dan informasi yang kami sediakan (satu baris satu jenis data)<textarea class="fmt" name="data" rows="8">${escH(L.data.join("\n"))}</textarea></label>
 <label>Tarif<textarea class="fmt" name="tarif" rows="3">${escH(L.tarif)}</textarea></label>
 <label>Alur permintaan (satu baris satu langkah; tulis {email} untuk email kantor dari Info Kantor)<textarea class="fmt" name="alur" rows="6">${escH(L.alur.join("\n"))}</textarea></label>
 <p class="admnote" style="margin:10px 0 4px"><b>Kalender Layanan Informasi Iklim</b></p>${editorDaftar("ldKal",KOL_KAL,L.kalender)}
 <button class="pbtn" type="submit">Simpan Permintaan Pelayanan Data</button></fieldset></form>
 ${admTeksBaru()}
 <form id="admTeksWeb" class="admsub"><fieldset class="kdrow"><legend>Teks lain di web</legend>
 <label>Keterangan kantor di bagian bawah web<textarea name="footer_desk" rows="2">${escH(tw.footer_desk||FOOTER_BAWAAN.desk)}</textarea></label>
 <label>Nama lain kantor (bagian bawah web, membantu pencarian Google)<textarea name="footer_aka" rows="2">${escH(tw.footer_aka||FOOTER_BAWAAN.aka)}</textarea></label>
 <label>Halaman Kebijakan Privasi &amp; Penafian<textarea class="fmt" name="privasi" rows="16">${escH(tw.privasi||PRIVASI_BAWAAN)}</textarea></label>
 <label>Halaman Aksesibilitas<textarea class="fmt" name="akses" rows="12">${escH(tw.akses||AKSES_BAWAAN)}</textarea></label>
 <label>Halaman Akuntabilitas Kinerja: penjelasan "Apa itu LKjIP?" (pisahkan paragraf dengan baris kosong)<textarea name="akuntabilitas" rows="5">${escH(tw.akuntabilitas||AKUN_BAWAAN)}</textarea></label>
 <label>Ajakan Survei Kepuasan (kotak survei)<input name="skm_ajak" value="${escH(tw.skm_ajak||SKM_AJAK_BAWAAN)}"></label>
 <label>Kantor pengamatan (halaman Sejarah) <small>format: Lokasi | keterangan</small><input name="kantor0" value="${escH((tw.kantor||[])[0]||KANTOR_BAWAAN[0])}"></label>
 <label>Kantor pelayanan (halaman Sejarah) <small>format: Lokasi | keterangan</small><input name="kantor1" value="${escH((tw.kantor||[])[1]||KANTOR_BAWAAN[1])}"></label>
 <div class="admnote" style="margin:12px 0 4px"><b>Tautan resmi</b> (dipakai di halaman Pengaduan &amp; WBS). Kosongkan untuk kembali ke alamat bawaan. Harus diawali https://</div>
 <label>SP4N-LAPOR! untuk masyarakat<input type="url" name="t_lapor" value="${escH((tw.tautan||{}).lapor||TAUTAN_BAWAAN.lapor)}"></label>
 <label>WBS BMKG pusat untuk pegawai<input type="url" name="t_wbs" value="${escH((tw.tautan||{}).wbs||TAUTAN_BAWAAN.wbs)}"></label>
 <label>Pengaduan PTSP BMKG<input type="url" name="t_ptsp" value="${escH((tw.tautan||{}).ptsp||TAUTAN_BAWAAN.ptsp)}"></label>
 <p class="admnote" style="margin:4px 0 0">Format: baris diawali <code>## </code> = judul, <code>### </code> = subjudul, <code>- </code> = butir; <code>**teks**</code> = tebal; <code>[teks](https://alamat)</code> atau <code>[teks](#halaman)</code> = tautan; <code>{email}</code> dan <code>{wa}</code> diisi otomatis dari Info Kantor.</p>
 <div class="admnote" style="margin:14px 0 4px"><b>Penjelasan "Cara membaca…" di halaman-halaman Iklim</b><br>Satu baris satu butir, format sama seperti di atas. Ubah hanya bila perlu; kotak yang tidak diubah tetap memakai teks bawaan. Butir yang berisi angka otomatis (misalnya indeks ENSO) akan menjadi tetap bila kotaknya diubah. Kosongkan kotak untuk kembali ke teks bawaan.</div>
 <div id="admAwam">${kumpulAwam().map((a,i)=>{const ov=((tw.awam)||{})[a.key];return `<details class="awamed"${ov?" open":""}><summary>${escH(NAMA_HAL[a.hal]||a.hal)} · ${escH(a.judul)}${ov?" <em>(sudah diubah)</em>":""}</summary><textarea class="fmt" name="aw_${i}" data-key="${escH(a.key)}" data-asli="${escH(a.butir.join("\n"))}" rows="${Math.min(12,a.butir.length*2+1)}">${escH((ov||a.butir).join("\n"))}</textarea></details>`}).join("")}</div>
 <button class="pbtn" type="submit">Simpan teks</button></fieldset></form>`}
const NAMA_HAL={"prakiraan-musim":"Prediksi Musim Hujan","prakiraan-musim-kemarau":"Prediksi Musim Kemarau","hujan-bulanan":"Hujan Bulanan","pos-hujan":"Data Pos Hujan","informasi-dasarian":"Informasi Dasarian","hari-tanpa-hujan":"Hari Tanpa Hujan","peringatan-kekeringan":"Kekeringan & SPI","peringatan-hujan-tinggi":"Peringatan Hujan Tinggi","enso-iod":"ENSO, IOD & Dinamika","iklim-papua-barat":"Iklim Papua Barat","zona-musim":"Zona Musim",peralatan:"Peralatan",alat:"Detail alat",wilayah:"Info Wilayah",kabupaten:"Halaman kabupaten"};
/* kumpulkan semua kotak penjelasan dengan "menggambar" tiap halaman di belakang layar (tanpa mengubah tampilan) */
function kumpulAwam(){const simpan=cur,hasil=[],lihat=new Set();const kab=Object.keys(typeof KAB_HAL!=="undefined"?KAB_HAL:{})[0],hal=[...IKLIM.filter(k=>P[k]),"peralatan","layanan-data",...(ALAT[0]?["alat-"+ALAT[0].id]:[]),...(kab?[kab]:[])];
 for(const k of hal){AWAM_REKAM=[];try{cur=k;k.startsWith("alat-")?detailAlat(k.slice(5)):KAB_HAL[k]?halKab(k):P[k]&&P[k]()}catch(e){}(AWAM_REKAM||[]).forEach(a=>{if(!lihat.has(a.key)){lihat.add(a.key);hasil.push(a)}})}
 AWAM_REKAM=null;cur=simpan;return hasil}
async function simpanBerandaIsi(fid,f){
 if(fid==="admBanner"){const a=await ambilDaftar("ldBanner",KOL_BANNER);cekTautan(a,"link","Slide");const b=a.filter(x=>x.judul);await admJSON("/admin/pengaturan",{kunci:"banner",nilai:b});return "Slide banner disimpan ("+b.length+" slide)."}
 if(fid==="admPintasan"){const a=(await ambilDaftar("ldPintas",KOL_PINTAS)).filter(x=>x.judul);cekTautan(a,"link","Pintasan");if(a.some(x=>!x.link))throw new Error("Setiap tombol pintasan perlu tautan.");await admJSON("/admin/pengaturan",{kunci:"pintasan",nilai:a});return "Tombol pintasan disimpan."}
 if(fid==="admMedia"){const a=(await ambilDaftar("ldMedia",KOL_MEDIA)).filter(x=>x.judul||x.url);a.forEach((x,i)=>{if(!/^https:\/\//.test(x.url)||!lnkAman(x.url))throw new Error("Liputan baris "+(i+1)+": alamat harus diawali https://");if(!x.tanggal)throw new Error("Liputan baris "+(i+1)+": isi tanggal.")});await admJSON("/admin/pengaturan",{kunci:"media",nilai:a});return "Liputan media disimpan ("+a.length+")."}
 if(fid==="admLayanan"){const bar=t=>t.split(/\n/).map(x=>x.trim()).filter(Boolean),kal=(await ambilDaftar("ldKal",KOL_KAL)).filter(x=>x.judul);cekTautan(kal,"link","Kalender");
  await admJSON("/admin/pengaturan",{kunci:"layanan",nilai:{data:bar(f.data.value),tarif:f.tarif.value.trim(),alur:bar(f.alur.value),kalender:kal}});return "Isi Permintaan Pelayanan Data disimpan."}
 if(fid==="admTeksWeb"){const aw={};f.querySelectorAll("#admAwam textarea").forEach(t=>{const v=t.value.split(/\n/).map(x=>x.trim()).filter(Boolean);if(v.length&&v.join("\n")!==t.dataset.asli)aw[t.dataset.key]=v});
  const tw={awam:aw,privasi:f.privasi.value.trim()===PRIVASI_BAWAAN.trim()?"":f.privasi.value.trim(),footer_desk:f.footer_desk.value.trim()===FOOTER_BAWAAN.desk?"":f.footer_desk.value.trim(),footer_aka:f.footer_aka.value.trim()===FOOTER_BAWAAN.aka?"":f.footer_aka.value.trim(),
   akses:f.akses.value.trim()===AKSES_BAWAAN.trim()?"":f.akses.value.trim(),akuntabilitas:f.akuntabilitas.value.trim()===AKUN_BAWAAN?"":f.akuntabilitas.value.trim(),skm_ajak:f.skm_ajak.value.trim()===SKM_AJAK_BAWAAN?"":f.skm_ajak.value.trim(),
   kantor:[f.kantor0.value.trim(),f.kantor1.value.trim()].every((x,i)=>x===KANTOR_BAWAAN[i])?[]:[f.kantor0.value.trim()||KANTOR_BAWAAN[0],f.kantor1.value.trim()||KANTOR_BAWAAN[1]],tautan:{}};
  for(const k of ["lapor","wbs","ptsp"]){const v=f["t_"+k].value.trim();if(v&&!/^https:\/\/[^\s"'<>]+$/.test(v))throw new Error("Tautan "+k.toUpperCase()+" harus diawali https://");if(v&&v!==TAUTAN_BAWAAN[k])tw.tautan[k]=v}
  await admJSON("/admin/pengaturan",{kunci:"teks_web",nilai:tw});return "Teks disimpan"+(Object.keys(aw).length?" ("+Object.keys(aw).length+" kotak penjelasan diubah)":"")+"."}}
/* ===== ADMIN: tombol format teks, pratinjau, dan pemeriksa ejaan ===== */
function pasangBantuTeks(root){if(!root)return;
 root.querySelectorAll("textarea,input:not([type]),input[type=text]").forEach(x=>{x.spellcheck=true;x.lang="id"});
 root.querySelectorAll("textarea.fmt").forEach(t=>{if(t.previousElementSibling&&t.previousElementSibling.classList.contains("fmtbar"))return;
  t.insertAdjacentHTML("beforebegin",`<div class="fmtbar" role="toolbar" aria-label="Format teks"><button type="button" data-fmt="b" title="Tebal"><b>B</b></button><button type="button" data-fmt="li" title="Butir">• Butir</button><button type="button" data-fmt="h" title="Judul">Judul</button><button type="button" data-fmt="a" title="Tautan">🔗 Tautan</button><button type="button" data-fmt="lihat" title="Lihat hasil">👁 Lihat hasil</button></div>`)})}
function fmtAksi(btn){const bar=btn.closest(".fmtbar"),t=bar&&bar.nextElementSibling;if(!t||t.tagName!=="TEXTAREA")return;const k=btn.dataset.fmt;
 if(k==="lihat"){let p=t.nextElementSibling;if(p&&p.classList.contains("fmtlihat")){p.remove();return}t.insertAdjacentHTML("afterend",`<div class="fmtlihat prose">${markahHTML(t.value,{email:INFO().email||"",wa:"WhatsApp "+waTeks(INFO().wa)})}</div>`);return}
 const a=t.selectionStart,b=t.selectionEnd,v=t.value,pilih=v.slice(a,b);let baru,s0,s1;
 if(k==="b"){const isi=pilih||"teks tebal";baru="**"+isi+"**";s0=a+2;s1=s0+isi.length}
 else if(k==="a"){const isi=pilih||"teks tautan";baru="["+isi+"](https://)";s0=a+isi.length+3;s1=s0+8}
 else{const awal=v.lastIndexOf("\n",a-1)+1,akhir=b>a&&v[b-1]==="\n"?b-1:(v.indexOf("\n",b)<0?v.length:v.indexOf("\n",b)),bar0=v.slice(awal,akhir),tanda=k==="li"?"- ":"## ";
  const hasil=bar0.split("\n").map(l=>l.startsWith(tanda)?l.slice(tanda.length):tanda+l.replace(/^(- |## |### )/,"")).join("\n");
  t.value=v.slice(0,awal)+hasil+v.slice(akhir);t.focus();t.setSelectionRange(awal,awal+hasil.length);return}
 t.value=v.slice(0,a)+baru+v.slice(b);t.focus();t.setSelectionRange(s0,s1)}
/* ===== TOMBOL PENSIL "UBAH INI" (hanya tampil bagi petugas yang sedang login Admin di browser ini) =====
   data-sunting="tab|sasaran": tab Admin yang dibuka dan kolom yang disorot. Sasaran: selektor CSS, atau "awam:<kunci>". */
const SUNTING_HAL={pengaduan:["tekshal","#admTeksBaru"],beranda:["isiberanda",""],"pos-hujan":["poshujan",""],"informasi-dasarian":["dasarian",""],profil:["profil",""],"profil-tim":["profil",""],"profil-sejarah":["profil",'[name="sejarah"]'],"peringatan-hujan-tinggi":["ik-hujantinggi",""],"peringatan-kekeringan":["ik-spi",""],"hujan-bulanan":["ik-bulanan",""],"hari-tanpa-hujan":["ik-hth",""],"prakiraan-musim":["ik-hujan",""],"prakiraan-musim-kemarau":["ik-kemarau",""],"zona-musim":["ik-zom",""],"enso-iod":["ik-enso",""],"iklim-papua-barat":["ik-iklimpb",""],
 wilayah:["wilayah",""],peralatan:["alat",""],"layanan-data":["tekshal","#admLayanan"],"kebijakan-privasi":["tekshal",'[name="privasi"]'],publikasi:["daftar",""],berita:["daftar",""],"profil-akuntabilitas":["tekshal",'[name="akuntabilitas"]'],aksesibilitas:["tekshal",'[name="akses"]']};
let ADM_FOKUS="";
function sasaranHal(k){if(SUNTING_HAL[k])return SUNTING_HAL[k];if(IKLIM.includes(k))return ["iklim",""];if(/^alat-/.test(k))return ["alat",""];if(/^berita-/.test(k))return ["daftar",""];if(typeof KAB_HAL!=="undefined"&&KAB_HAL[k])return ["wilayah",""];return null}
const bolehSunting=()=>!!ADM_PASS&&cur!=="admin";
function pasangPensil(){document.querySelectorAll(".pensil,.pensilhal").forEach(b=>b.remove());if(!bolehSunting())return;
 document.querySelectorAll("[data-sunting]").forEach(el=>{if(getComputedStyle(el).position==="static")el.style.position="relative";el.insertAdjacentHTML("afterbegin",`<button type="button" class="pensil" data-ke="${escH(el.dataset.sunting)}" title="Ubah bagian ini di Admin" aria-label="Ubah bagian ini di Admin">✏️ Ubah</button>`)});
 const s=sasaranHal(cur);if(s)(document.querySelector("header")||document.body).insertAdjacentHTML("beforeend",`<button type="button" class="pensilhal" data-ke="${escH(s.join("|"))}">✏️ Ubah halaman ini</button>`)}
function bukaSunting(ke){const i=ke.indexOf("|"),tab=i<0?ke:ke.slice(0,i);ADM_FOKUS=i<0?"":ke.slice(i+1);ADM_TAB=tab;go("admin")}
function sorotFokus(){if(!ADM_FOKUS)return;const f=ADM_FOKUS;ADM_FOKUS="";setTimeout(()=>{let el=null;
 if(f.startsWith("awam:")){el=[...document.querySelectorAll("#admAwam textarea")].find(t=>t.dataset.key===f.slice(5));if(el){const d=el.closest("details");if(d)d.open=true}}else{try{el=document.querySelector("#admBody "+f)}catch(e){el=null}}
 if(!el)return;el.scrollIntoView({behavior:"smooth",block:"center"});const box=el.closest("fieldset,details,label,form")||el;box.classList.add("sorot");setTimeout(()=>box.classList.remove("sorot"),2600);if(el.focus&&/TEXTAREA|INPUT/.test(el.tagName))el.focus({preventScroll:true})},120)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".pensil,.pensilhal");if(!b)return;e.preventDefault();e.stopPropagation();bukaSunting(b.dataset.ke)},true);
/* ===== KIRIM MASUKAN (pengunjung) ===== */
const JENIS_MSK=[["kesalahan","Laporkan kesalahan","Salah ketik, gambar tidak tampil, data janggal"],["saran","Saran","Usul fitur atau informasi yang perlu ditambah"],["pertanyaan","Pertanyaan","Soal data atau cara membaca informasi iklim"]];
const NAMA_HAL_MSK=k=>{const m=META_HAL&&META_HAL[k];return m?String(m[0]).split(" – ")[0]:k};
function bukaMasukan(){tutupMasukan();const mulai=Date.now(),hal=cur||"beranda";
 document.body.insertAdjacentHTML("beforeend",`<div class="mskbg" id="mskBox" role="dialog" aria-modal="true" aria-labelledby="mskJudul"><form class="mskform" id="mskForm" data-mulai="${mulai}">
 <button type="button" class="mskx" data-msktutup aria-label="Tutup">✕</button><h2 id="mskJudul">Kirim Masukan</h2><p class="mskket">Masukan Anda langsung terbaca oleh petugas Stasiun Klimatologi Papua Barat.</p>
 <fieldset class="mskjenis"><legend>Jenis masukan</legend>${JENIS_MSK.map(([k,n,d],i)=>`<label><input type="radio" name="jenis" value="${k}"${i?"":" checked"}><span><b>${n}</b><small>${d}</small></span></label>`).join("")}</fieldset>
 <label>Isi masukan<textarea name="isi" rows="5" maxlength="1500" required placeholder="Tuliskan apa yang ingin Anda sampaikan"></textarea></label>
 <label>Nama atau kontak <small>(opsional, bila ingin dibalas)</small><input name="kontak" maxlength="120" autocomplete="off" placeholder="mis. nama dan nomor WA atau email"></label>
 <input class="mskjebak" name="situs" tabindex="-1" autocomplete="off" aria-hidden="true">
 <p class="mskhal">Halaman: <b>${escH(NAMA_HAL_MSK(hal))}</b></p>
 <p class="mskpriv">Ingin mengadu atau melaporkan dugaan pelanggaran pegawai? <a href="#pengaduan" data-msktutup>Buka halaman Pengaduan</a>.<br>Masukan disimpan paling lama 6 bulan dan hanya dibaca petugas. <a href="#kebijakan-privasi" data-msktutup>Kebijakan Privasi</a></p>
 <p class="mskmsg" id="mskMsg" role="status"></p>
 <div class="mskaksi"><button class="pbtn" type="submit">Kirim</button>${skmInfo().aktif?`<a class="msklain" href="${escH(skmInfo().url)}" target="_blank" rel="noopener">Ingin menilai layanan kami? Isi Survei Kepuasan ↗</a>`:""}</div></form></div>`);
 const f=document.getElementById("mskForm");setTimeout(()=>f.isi.focus(),50);
 f.onsubmit=async e=>{e.preventDefault();const m=document.getElementById("mskMsg"),btn=f.querySelector('button[type="submit"]');if(btn.disabled)return;
  const isi=f.isi.value.trim();if(isi.length<10){m.textContent="Tulis masukan minimal 10 huruf.";m.className="mskmsg galat";return}
  btn.disabled=true;m.className="mskmsg";m.textContent="Mengirim…";
  try{const r=await fetch(KONTEN_URL+"/masukan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jenis:(f.querySelector("[name=jenis]:checked")||{}).value,isi,kontak:f.kontak.value.trim(),halaman:hal,situs:f.situs.value,lama:Date.now()-mulai})});
   const j=await r.json().catch(()=>({}));if(!r.ok||j.galat)throw new Error(j.galat||"Masukan belum terkirim. Coba lagi sebentar lagi.");
   f.innerHTML=`<button type="button" class="mskx" data-msktutup aria-label="Tutup">✕</button><h2>Terima kasih 🙏</h2><p>Masukan Anda sudah kami terima dan akan ditindaklanjuti petugas.${j.tiket?` Nomor tiket: <b>${escH(j.tiket)}</b> (pantau di halaman <a href="#pengaduan" data-msktutup>Pengaduan › Cek status</a>).`:""}</p><div class="mskaksi"><button type="button" class="pbtn" data-msktutup>Tutup</button></div>`}
  catch(er){m.textContent=er.message;m.className="mskmsg galat";btn.disabled=false}}}
function tutupMasukan(){const b=document.getElementById("mskBox");if(b)b.remove()}
document.addEventListener("click",e=>{const t=e.target;if(!t.closest)return;if(t.closest("[data-masukan]")){e.preventDefault();bukaMasukan();return}
 if(t.closest("[data-msktutup]")||t.id==="mskBox"){const a=t.closest("a[href^='#']");tutupMasukan();if(!a)e.preventDefault()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")tutupMasukan()});
/* ===== ADMIN: tab Masukan ===== */
let ADM_MASUKAN=null,ADM_MSK_SARING="aktif";
const NAMA_PETUGAS=()=>{try{return localStorage.getItem("nama_petugas")||""}catch(e){return ""}};
const mskPengaduan=x=>x.halaman==="pengaduan"||["pengaduan","kritik"].includes(x.jenis);
function hitungMasukan(f){const a=(ADM_MASUKAN||[]).filter(f||(()=>true)),baru=a.filter(x=>x.status==="baru"),tg=a.filter(x=>x.status==="ditangani");return {baru:baru.length,tangani:tg.length,lama:baru.filter(x=>umurHari(String(x.waktu).slice(0,10))>7).length}}
function muatMasukan(){if(typeof muatWbsInfo==="function")muatWbsInfo();return admFetch("/admin/masukan").then(j=>{ADM_MASUKAN=j.masukan||[];segarIngat()}).catch(()=>{})}
function segarIngat(){const el=document.getElementById("admIngat");if(el)el.innerHTML=pengingatAdmin();{const tw=document.querySelector('[data-adm="wbs"]');if(tw&&typeof WBS_INFO!=="undefined"){const n=WBS_INFO&&WBS_INFO.baru||0;tw.textContent="Kotak WBS"+(n?" ("+n+" baru)":"");tw.classList.toggle("wbsbaru",n>0)}}[["masukan","Masukan",x=>!mskPengaduan(x)],["pengaduan","Pengaduan",mskPengaduan]].forEach(([k,nm,fl])=>{const tb=document.querySelector(`[data-adm="${k}"]`);if(tb){const h=hitungMasukan(fl),n=h.baru+h.tangani;tb.textContent=nm+(n?" ("+n+")":"");tb.classList.toggle("adamsk",n>0)}});
 if(ADM_TAB==="masukan"||ADM_TAB==="pengaduan"){const b=document.getElementById("admBody");if(b&&!b.querySelector("textarea:focus,input:focus"))b.innerHTML=admMasukan()}}
function admMasukan(){if(!ADM_MASUKAN)return '<p>Memuat masukan…</p>';const modeP=ADM_TAB==="pengaduan",fl=x=>mskPengaduan(x)===modeP,h=hitungMasukan(fl);
 const sar={aktif:x=>x.status!=="selesai",selesai:x=>x.status==="selesai",semua:()=>true}[ADM_MSK_SARING]||(()=>true),a=ADM_MASUKAN.filter(fl).filter(sar);
 const lbl={kesalahan:"Kesalahan",saran:"Saran",pertanyaan:"Pertanyaan",kritik:"Kritik",pengaduan:"Pengaduan"},st={baru:["Baru","warn"],ditangani:["Sedang ditangani","info"],selesai:["Selesai","ok"]};
 return `<p class="admnote">${modeP?"Pengaduan, kritik, dan saran dari halaman <b>Pengaduan</b> (tiket AD-…). Tanggapan yang ditulis saat menandai Selesai terbaca pelapor lewat Cek status. Tidak perlu kata sandi tambahan; hanya Kotak WBS yang memakai kata sandi WBS.":"Masukan dari tombol 💬 Kirim masukan di pojok web (salah ketik, tautan rusak, pertanyaan singkat)."}</p><p class="admnote">Membaca saja tidak mengubah apa pun: pengingat di atas Admin baru hilang setelah masukan ditandai <b>Selesai</b> beserta catatannya. Masukan terhapus otomatis setelah 6 bulan.</p>
 <div class="msksaring">${[["aktif",`Belum selesai (${h.baru+h.tangani})`],["selesai","Selesai"],["semua","Semua"]].map(([k,n])=>`<button type="button" class="mini${ADM_MSK_SARING===k?" on":""}" data-msksaring="${k}">${n}</button>`).join("")}</div>
 ${a.length?a.map(x=>{const [sn,sc]=st[x.status]||st.baru,lama=x.status==="baru"&&umurHari(String(x.waktu).slice(0,10))>7;return `<div class="mskitem${lama?" lama":""}" data-id="${escH(x.id)}">
  <div class="mskatas"><span class="pill ${sc}">${sn}</span><span class="pill">${lbl[x.jenis]||escH(x.jenis)}</span><small>${escH(tglPendek(String(x.waktu).slice(0,10)))} · halaman <a href="#${escH(x.halaman)}">${escH(NAMA_HAL_MSK(x.halaman))}</a>${lama?' · <b class="merah">lebih dari 7 hari belum ditangani</b>':""}</small></div>
  ${x.tiket?`<p class="admnote">Tiket <b>${escH(x.tiket)}</b></p>`:""}<p class="mskisi">${escH(x.isi)}</p>${x.kontak?`<p class="admnote">Kontak: ${escH(x.kontak)}</p>`:""}
  ${x.status==="baru"?`<div class="mskubah"><label class="msklbl">Nama petugas yang menangani<input name="petugas" placeholder="Tulis nama Anda" value="${escH(NAMA_PETUGAS())}" maxlength="60"></label><button type="button" class="mini" data-mskaksi="ditangani">Saya tangani</button></div>`:""}
  ${x.status==="ditangani"?`<p class="admnote">Ditangani oleh <b>${escH(x.petugas)}</b>${x.diubah?" sejak "+escH(tglPendek(String(x.diubah).slice(0,10))):""}.</p><div class="mskubah"><label class="msklbl">Apa yang sudah dilakukan <small>(catatan internal, wajib)</small><textarea name="catatan" rows="2" placeholder="mis. data sudah dikirim ulang lewat email"></textarea></label>${x.tiket?`<label class="msklbl">Tanggapan untuk pelapor <small>(wajib; terbaca pelapor lewat Cek status)</small><textarea name="balasan" rows="3" placeholder="mis. Mohon maaf atas keterlambatannya. Data sudah kami kirim ulang ke email Anda."></textarea></label>`:""}<button type="button" class="pbtn mini msk-selesai" data-mskaksi="selesai">Tandai selesai</button></div>`:""}
  ${x.status==="selesai"?`<p class="admnote">Selesai oleh <b>${escH(x.petugas)}</b>${x.diubah?" pada "+escH(tglPendek(String(x.diubah).slice(0,10))):""}: ${escH(x.catatan)}${x.balasan?`<br>Tanggapan untuk pelapor: ${escH(x.balasan)}`:""}</p>`:""}
  <div class="mskbawah">${x.status!=="baru"?`<button type="button" class="mini" data-mskaksi="baru">Kembalikan ke Baru</button>`:""}<button type="button" class="mini bahaya" data-mskaksi="hapus">Hapus</button></div></div>`}).join(""):`<p class="empty">${ADM_MSK_SARING==="aktif"?"Tidak ada masukan yang menunggu. 👍":"Belum ada masukan."}</p>`}`}
async function aksiMasukan(btn){const it=btn.closest(".mskitem"),id=it&&it.dataset.id,aksi=btn.dataset.mskaksi;if(!id)return;
 if(aksi==="selesai"){const c=it.querySelector("[name=catatan]"),bs=it.querySelector("[name=balasan]");if(c&&c.value.trim().length<3){pesan("Tulis dulu apa yang sudah dilakukan.",1);c.focus();return}if(bs&&bs.value.trim().length<3){pesan("Tulis tanggapan untuk pelapor dulu. Pelapor perlu tahu apa yang sudah dilakukan.",1);bs.focus();return}}
 if(aksi==="hapus"&&btn.dataset.yakin!=="1"){btn.dataset.yakin="1";btn.textContent="Klik lagi untuk menghapus";setTimeout(()=>{if(btn.isConnected){btn.dataset.yakin="";btn.textContent="Hapus"}},4000);return}
 const d={id};if(aksi==="hapus")d.hapus=true;else{d.status=aksi;const p=it.querySelector("[name=petugas]"),c=it.querySelector("[name=catatan]");if(p){d.petugas=p.value.trim();try{localStorage.setItem("nama_petugas",d.petugas)}catch(e){}}if(c)d.catatan=c.value.trim();const bs=it.querySelector("[name=balasan]");if(bs&&bs.value.trim())d.balasan=bs.value.trim()}
 btn.disabled=true;try{const j=await admJSON("/admin/masukan-ubah",d);ADM_MASUKAN=j.masukan||ADM_MASUKAN;document.getElementById("admBody").innerHTML=admMasukan();segarIngat();pesan(aksi==="selesai"?"Masukan ditandai selesai.":aksi==="hapus"?"Masukan dihapus.":"Status masukan diperbarui.")}catch(er){btn.disabled=false;pesan(er.message,1)}}
/* ===== ADMIN: PERIKSA WEB =====
   Mencari masalah yang belum tentu terlihat petugas: gambar gagal tampil, tautan mati, isi basi, dan kolom kosong.
   Setiap temuan punya tombol "Perbaiki" yang membuka tab dan kolom yang tepat. */
let ADM_PERIKSA=null;
function cekGambar(u,ms){return new Promise(r=>{if(!u)return r(true);const im=new Image(),t=setTimeout(()=>{im.src="";r(false)},ms||12000);im.onload=()=>{clearTimeout(t);r(im.naturalWidth>0)};im.onerror=()=>{clearTimeout(t);r(false)};im.referrerPolicy="no-referrer";im.src=u})}
async function periksaWeb(lapor){const T=[],tambah=(tingkat,teks,ke)=>T.push({tingkat,teks,ke}),hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10),thn=+hari.slice(0,4);
 lapor("Memeriksa isi yang basi…");
 /* 1. isi basi */
 {const b=buletinTerpasang();if(!b)tambah("kuning","Belum ada Buletin Iklim yang terpasang di halaman Iklim.","terbit|");else{const u=Math.floor((Date.now()-b.ms)/864e5);if(u>45)tambah("merah",`Buletin yang tampil (${b.judul}) sudah ${u} hari. Apakah buletin bulan ini sudah diunggah?`,"terbit|")}}
 {const s=skmInfo();if(!s.ada)tambah("kuning","Tautan Survei Kepuasan (SKM) belum diisi, tombol survei tidak tampil.","skm|#admSkm");else if(s.lewat)tambah("merah",`Tautan SKM untuk ${namaBulanYM(s.bulan)} sudah lewat; tombol survei tersembunyi.`,"skm|#admSkm")}
 {const bm=KA&&KA.bmkg,dm=Date.parse((bm&&bm.diambil)||"");if(!dm||Date.now()-dm>2*864e5)tambah("kuning",`Robot belum berhasil mengambil rilisan BMKG Pusat ${dm?"sejak "+tglPendek(new Date(dm+9*3600e3).toISOString().slice(0,10)):"sama sekali"}. Coba "Ambil rilisan sekarang".`,"bmkg|");else if(bm.galat)tambah("info","Pengambilan rilisan BMKG terakhir: "+bm.galat,"bmkg|")}
 if(EN().basi)tambah("info","Angka ENSO/IOD dari BMKG Pusat belum dapat dimuat di perangkat ini; web menampilkan data tersimpan.","bmkg|");
 {const p=(KA&&KA.peringatan)||{},d=Array.isArray(p.daftar)?p.daftar:[];d.filter(x=>x&&x.sampai&&x.sampai<hari&&LV_URUT[x.status]).forEach(x=>tambah("kuning",`Peringatan ${NAMA_STATUS[x.status]||x.status} ${JENIS_PENDEK[x.jenis]||""} (${(x.wilayah||[]).join(", ")||"tanpa wilayah"}) sudah lewat masa berlaku ${tglPendek(x.sampai)}. Sudah tidak tampil, sebaiknya dihapus.`,"peringatan|"))}
 {const bn=PG("banner");if(Array.isArray(bn))bn.filter(x=>x.sampai&&x.sampai<hari&&x.aktif!==false).forEach(x=>tambah("info",`Slide banner "${x.judul}" sudah lewat tanggal tampil (${tglPendek(x.sampai)}) dan tersembunyi otomatis.`,"isiberanda|#ldBanner"))}
 {const bl=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"],urut=t=>{const m=String(t||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);return m?+m[2]*12+bl.indexOf(m[1]):null},kini=thn*12+(+hari.slice(5,7)-1);
  ((kondisiData()||{}).kartu||[]).forEach(x=>{const u=urut(x.judul+" "+(x.ket||""));if(u!=null&&kini-u>3)tambah("kuning",`Kartu Kondisi Iklim "${x.judul}" sudah lebih dari 3 bulan.`,"kondisi|")})}
 TEKS_EDIT.forEach(([k,lab])=>{const v=TH(k),th=(String(v).match(/\b(20\d\d)\b/g)||[]).map(Number);if(th.length&&Math.max(...th)<thn)tambah("info",`Teks "${lab}" masih menyebut tahun ${Math.max(...th)}. Apakah masih berlaku?`,"iklim|[name=th_"+k+"]")});
 /* 2. kolom kosong */
 {const I=INFO();[["wa","Nomor WhatsApp"],["email","Email"],["alamat","Alamat"]].forEach(([k,n])=>{if(!String(I[k]||"").trim())tambah("merah",`${n} kantor kosong.`,"info|[name="+k+"]")})}
 {const pr=(KA&&KA.profil)||{};if(!pr.kepala)tambah("info","Nama Kepala Stasiun belum diisi di Profil (isi pegawai dengan jabatan Kepala Stasiun).","profil|");}
 {const w=periksaIsi(IK()||{}).filter(x=>!(x&&x.lvl==="ok")),tk=x=>typeof x==="object"&&x?(x.t||x.bag||""):String(x);if(w.length)tambah("kuning",`Isi Halaman Iklim punya ${w.length} catatan perlu dicek, misalnya: ${tk(w[0])}`,"iklim|")}
 ((KA&&KA.publikasi)||[]).forEach(p=>{if(!String(p.ringkas||"").trim())tambah("info",`Publikasi "${p.judul}" belum punya ringkasan.`,"daftar|")});
 /* 3. gambar */
 const gb=[];const g=(u,teks,ke)=>{if(u)gb.push({u,teks,ke})};
 ((KA&&KA.publikasi)||[]).forEach(p=>g(p.gambar&&fileURL(p.gambar),`Gambar publikasi "${p.judul}"`,"daftar|"));
 (Array.isArray(PG("banner"))?PG("banner"):(typeof BANNER!=="undefined"?BANNER:[])).forEach(x=>g(x.gambar&&fileURL(x.gambar),`Gambar slide banner "${x.judul}"`,"isiberanda|#ldBanner"));
 ((IK()||{}).peta||[]).forEach(x=>g(x.file&&fileURL(x.file),`Peta "${x.judul}"`,"iklim|"));
 {const pr=(KA&&KA.profil)||{};(pr.pegawai||[]).forEach(x=>g(x.foto&&fileURL(x.foto),`Foto pegawai ${x.nama}`,"profil|"));(pr.foto||[]).forEach(f=>g(fileURL(f),"Foto kegiatan di Profil","profil|"));g(pr.struktur&&fileURL(pr.struktur),"Bagan struktur organisasi","profil|")}
 (typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).forEach(p=>g(p.gambar,`Gambar publikasi bawaan "${keMarkah(p.judul)}"`,"daftar|"));
 for(let i=0;i<gb.length;i+=8){lapor(`Memeriksa gambar ${Math.min(i+8,gb.length)} dari ${gb.length}…`);const ok=await Promise.all(gb.slice(i,i+8).map(x=>cekGambar(x.u)));ok.forEach((v,j)=>{if(!v)tambah("merah",gb[i+j].teks+" gagal tampil.",gb[i+j].ke)})}
 /* 4. tautan */
 lapor("Memeriksa tautan…");const dalam=[],luar=[];const t=(u,teks,ke)=>{u=String(u||"").trim();if(!u)return;if(u[0]==="#")dalam.push({u,teks,ke});else if(/^https:\/\//.test(u))luar.push({u,teks,ke})};
 pintasanData().forEach(x=>t(x.link,`Tombol pintasan "${keMarkah(x.judul)}"`,"isiberanda|#ldPintas"));
 bannerBawaan().forEach(x=>t(x.link,`Tombol slide "${keMarkah(x.judul)}"`,"isiberanda|#ldBanner"));
 layananData().kalender.forEach(x=>t(x.link,`Kalender layanan "${x.judul}"`,"tekshal|#admLayanan"));
 {const tw=TW(),semua=[tw.privasi||"",...Object.values(tw.awam||{}).flat(),layananData().tarif,...layananData().alur];semua.forEach(s=>(String(s).match(/\]\(([^)\s]+)\)/g)||[]).forEach(m=>t(m.slice(2,-1),"Tautan di teks halaman","tekshal|")))}
 ((KA&&KA.publikasi)||[]).forEach(p=>t(p.link,`Tautan publikasi "${p.judul}"`,"daftar|"));
 mediaDaftar().forEach(x=>t(String(x.url).replace(/&amp;/g,"&"),`Liputan media "${keMarkah(x.judul)}"`,"isiberanda|#ldMedia"));
 (typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).forEach(p=>t(p.url,`Tautan publikasi bawaan "${keMarkah(p.judul)}"`,"daftar|"));
 dalam.forEach(x=>{const k=x.u.slice(1);if(!(P[k]||dinamis(k)))tambah("merah",`${x.teks} menuju halaman yang tidak ada (${x.u}).`,x.ke)});
 const unik=[...new Set(luar.map(x=>x.u))];
 if(unik.length){try{const j=await admJSON("/admin/cek-tautan",{url:unik});(j.hasil||[]).filter(h=>!h.ok).forEach(h=>luar.filter(x=>x.u===h.url).slice(0,1).forEach(x=>tambah("merah",`${x.teks} tidak bisa dibuka (${h.status?"kode "+h.status:h.galat||"gagal"}): ${h.url}`,x.ke)))}catch(er){tambah("info","Tautan luar belum bisa dicek: "+er.message,"")}}
 lapor("Memeriksa halaman yang gagal tampil…");const nh=cekTampilHalaman(tambah);cekDataKosong(tambah);let ej={n:0,otomatis:[],saran:[]};try{ej=await periksaEjaan(lapor,tambah)}catch(er){tambah("info","Pemeriksaan ejaan gagal: "+er.message,"")}
 return {waktu:Date.now(),temuan:T,jml:{gambar:gb.length,tautan:dalam.length+unik.length,halaman:nh,teks:ej.n},otomatis:ej.otomatis,saran:ej.saran}}
function admPeriksa(){const r=ADM_PERIKSA,urut={merah:0,kuning:1,info:2},ikon={merah:"🔴",kuning:"🟡",info:"ℹ️"};
 return `<p class="admnote">Robot memeriksa gambar yang gagal tampil, tautan yang mati, isi yang basi, kolom dan data yang kosong, halaman yang gagal tampil, serta <b>ejaan dan salah ketik</b> (dengan AI), termasuk kesalahan dari buletin. Kesalahan yang jelas langsung dibetulkan dan bisa diurungkan; yang meragukan muncul sebagai saran. Yang tidak bisa dibetulkan dari Admin (data kosong, kesalahan kode, data BMKG Pusat) diberi peringatan.</p>
 <p><button type="button" class="pbtn" id="admPeriksaMulai">🔍 ${r?"Periksa ulang":"Mulai periksa web"}</button> <span class="admnote" id="admPeriksaStatus"></span></p>
 ${r?admPeriksaEjaan(r):""}${r?`<p class="admnote">Diperiksa ${new Date(r.waktu).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})} WIT · ${r.jml.gambar} gambar · ${r.jml.tautan} tautan.</p>${r.temuan.length?`<div class="admlist">${r.temuan.slice().sort((a,b)=>urut[a.tingkat]-urut[b.tingkat]).map(x=>`<div class="admrow prk ${x.tingkat}"><div>${ikon[x.tingkat]} ${escH(x.teks)}</div>${x.ke?`<button type="button" class="mini" data-perbaiki="${escH(x.ke)}">Perbaiki</button>`:""}</div>`).join("")}</div>`:`<p class="ok">✅ Tidak ditemukan masalah.</p>`}`:""}`}
function admPanduan(){const L=(j,isi)=>`<section class="pandu"><h3>${j}</h3>${isi}</section>`;
 return `<div class="panduan"><p class="admnote">Panduan singkat untuk petugas. Tidak perlu keahlian coding: cukup unggah dokumen dan periksa hasilnya.</p>
 ${L("1. Menerbitkan Buletin Iklim (tiap bulan)",`<ol><li>Buka tab <b>Terbitkan</b>.</li><li>Jenis: <b>Buletin Iklim</b>. Isi tanggal terbit.</li><li>Pilih file PDF buletin.</li><li>Judul terisi sendiri dari nama file, misalnya file <i>Buletin_Iklim_November_2026.pdf</i> menjadi <i>Buletin Iklim November 2026</i>. Jadi beri nama file sesuai edisinya. Ringkasan boleh dikosongkan (diisi AI).</li><li>Tekan <b>Terbitkan</b> dan tunggu sampai muncul pesan berhasil (bisa 1–3 menit karena AI membaca isinya).</li></ol>
  <p><b>Yang berubah sendiri:</b> kartu Kondisi Iklim di Beranda, tabel hujan per kabupaten, prakiraan 3 bulan, hujan ekstrem, hari tanpa hujan, SPI, peta-peta dari buletin, banner Beranda, dan daftar Publikasi.</p>`)}
 ${L("2. Menerbitkan Prediksi Musim (Press Release / FGD)",`<ol><li>Tab <b>Terbitkan</b>, jenis <b>Prediksi Musim Hujan</b> atau <b>Prediksi Musim Kemarau</b>.</li><li>Unggah PDF press release (lebih baik daripada file paparan, karena tulisannya bisa dibaca komputer).</li><li>Terbitkan. Tabel ZOM, ringkasan, dan peta di halaman Prediksi Musim akan terisi sendiri, begitu juga Info Wilayah Saya.</li></ol>`)}
 ${L("Informasi Dasarian (tiap 10 hari)",`<ol><li>Tab <b>Informasi Dasarian</b>. Pilih periode analisis (dasarian, bulan, tahun).</li><li>Tekan <b>Unduh template Excel</b> sekali saja, isi angka hujan (mm), kategori, dan sifat per kabupaten; baris distrik ditulis di bawah kabupatennya. Unggah kembali Excel-nya, atau ketik langsung di kotak tabel.</li><li>Tulis ringkasan analisis dan prakiraan, lalu unggah peta-petanya.</li><li>Tekan <b>Simpan &amp; terbitkan</b>. Saat periode baru disimpan, edisi lama otomatis masuk arsip.</li></ol>`)} ${L("Survei sebelum unduh",`<p>Selama tautan SKM di tab <b>Survei Kepuasan (SKM)</b> berlaku, setiap pengunjung yang menekan tombol unduh diminta membuka survei dulu, lalu (2 menit kemudian) mencentang "sudah mengisi". Setelah itu unduhan terbuka dan tidak diminta lagi selama 2 minggu di perangkat yang sama. Perbarui tautan SKM setiap awal bulan; bila tautan kosong atau sudah lewat bulannya, unduhan terbuka tanpa survei.</p>`)} ${L("3. Memeriksa dan membetulkan hasil AI",`<p>AI kadang salah membaca tabel. Setelah menerbitkan, buka web dan periksa halaman Iklim. Bila ada yang keliru:</p><ul><li>Kartu di Beranda: tab <b>Kondisi Iklim</b>.</li><li>Tabel, ZOM, dan peta: tab <b>Isi Halaman Iklim</b>. Tiap baris memakai pemisah <b>|</b>, contoh: <code>Manokwari | Menengah | Bawah Normal |</code></li></ul><p>Tekan <b>Simpan</b>; perubahan tampil paling lama 1 menit.</p>`)}
 ${L("4. Peringatan dini",`<ul><li>Tab <b>Peringatan Dini</b>: tambahkan satu baris per wilayah dengan status Waspada, Siaga, atau Awas, jenis, dan masa berlaku.</li><li>Selama ada peringatan dari kita, peringatan otomatis dari BMKG Pusat disembunyikan. Hapus semua baris (status Nihil) untuk kembali menampilkan peringatan BMKG Pusat.</li></ul>`)}
 ${L("5. Berita kegiatan, info kantor, dan profil",`<ul><li>Berita: tab <b>Terbitkan</b>, jenis <b>Berita Kegiatan</b>, isi tulisan dan pilih foto.</li><li>Alamat, WhatsApp, email: tab <b>Info Kantor</b>.</li><li>Kepala, pegawai, sejarah, foto kantor: tab <b>Profil</b>.</li><li>Berita BMKG Pusat yang tidak sesuai: tab <b>BMKG Pusat</b> → Sembunyikan.</li></ul>`)}
 ${L("Ringkasan (halaman pertama Admin)",`<ul><li>Begitu masuk Admin, tab <b>Ringkasan</b> menampilkan hal yang <b>perlu perhatian</b> (masukan baru, buletin yang belum terbit, tautan SKM, alat yang mati, robot yang gagal), lengkap dengan tombol menuju tab yang tepat.</li><li>Bagian <b>Robot &amp; AI</b> menunjukkan kerja otomatis: titik hijau berarti normal, kuning perlu dilihat, merah bermasalah.</li><li><b>Galat di perangkat pengunjung</b>: bila web bermasalah di HP/komputer pengunjung, pesannya tercatat otomatis di sini (tanpa data pribadi). Kirim ke pengelola web, lalu tekan <b>Tandai sudah ditangani</b>.</li></ul>`)}
 ${L("Data pos hujan",`<ol><li>Siapkan file Excel <i>Data_CH_Pos_Utama_&lt;tahun&gt;.xlsx</i> (satu lembar per bulan). Dari Google Drive: buka file, lalu <b>File › Download › Microsoft Excel (.xlsx)</b>.</li><li>Buka tab <b>Pos Hujan</b>, pilih file. Web menampilkan pratinjau: bulan, jumlah pos, dan bulan yang datanya masih sementara.</li><li>Periksa tahunnya, lalu tekan <b>Simpan &amp; tampilkan di web</b>. Halaman <b>Data Pos Hujan</b> langsung memakai data baru (paling lama 1 menit).</li><li>Unggah ulang file tahun berjalan setiap ada bulan baru. Bila salah unggah, tekan <b>Hapus unggahan</b>; web kembali ke data sebelumnya.</li></ol>`)}
 ${L("6. Bila salah ubah",`<p>Tab <b>Riwayat</b> menyimpan 20 perubahan terakhir. Tekan <b>Kembalikan</b> pada perubahan yang ingin dibatalkan.</p>`)}
 ${L("Cadangan & penyimpanan",`<ul><li>Tab <b>Cadangan &amp; Penyimpanan</b> menampilkan sisa kapasitas penyimpanan file. Bila bilah berwarna kuning/merah, hapus file yang tidak terpakai atau pasang R2.</li><li>Cadangan isi web dibuat otomatis tiap minggu. Sebaiknya setiap awal bulan tekan <b>Unduh cadangan sekarang</b> dan simpan filenya di Google Drive kantor.</li><li><b>Memasang R2 (sekali saja, oleh pengelola akun Cloudflare):</b> Cloudflare → <b>R2 Object Storage</b> → aktifkan (paket gratis 10 GB; Cloudflare meminta data pembayaran walau tidak ditagih selama di bawah batas gratis) → <b>Create bucket</b> bernama <code>staklim-berkas</code> → buka Workers → <b>staklim-admin</b> → Settings → Bindings → Add → <b>R2 bucket</b>, nama variabel <code>BERKAS</code>, pilih bucket <code>staklim-berkas</code> → Deploy.</li></ul>`)}
 ${L("7. Hal penting",`<ul><li>Jangan membagikan password admin. Bila ada pegawai pindah, ganti password di Cloudflare (Workers → staklim-admin → Settings → Variables, jenis <b>Secret</b>).</li><li>Ukuran maksimal: dokumen 75 MB (file di atas 20 MB dikirim bertahap secara otomatis, jadi tunggu sampai selesai). Foto besar dari HP dikecilkan otomatis sebelum diunggah.</li><li>Unggah dokumen sekali saja; mengunggah berulang menghabiskan kuota harian Cloudflare (gratis).</li><li>Data AWS/ARG dan berita BMKG Pusat masuk sendiri, tidak perlu diunggah.</li></ul>`)}
 ${L("8. Pekerjaan rutin dan alat bantu",`<ul><li><b>Tombol ✏️ Ubah</b>: selama Anda login Admin di browser ini, setiap halaman web menampilkan tombol kuning <b>✏️ Ubah halaman ini</b> (kanan atas, di bawah menu) dan <b>✏️ Ubah</b> pada bagian yang bisa diedit. Klik untuk langsung membuka kolom yang tepat di Admin. Pengunjung tidak melihat tombol ini.</li>
  <li><b>Tombol format</b> (B, Butir, Judul, Tautan, Lihat hasil) ada di atas kolom teks yang mendukung format. Kata yang salah ketik diberi garis merah oleh browser.</li>
  <li><b>Masukan</b>: pengunjung mengirim masukan lewat tombol <b>💬 Kirim Masukan</b> di bagian bawah web. Masukan tampil di tab <b>Masukan</b>. Klik <b>Saya tangani</b> (tulis nama), kerjakan, lalu <b>Tandai selesai</b> dengan catatan. Pengingat di atas Admin baru hilang setelah ditandai selesai; masukan yang lebih dari 7 hari belum ditangani ditandai merah.</li>
  <li><b>Periksa Web</b>: sebulan sekali (misalnya setelah memasang buletin), buka tab <b>Periksa Web</b> lalu klik <b>Mulai periksa web</b>. Robot mencari gambar yang gagal tampil, tautan mati, isi basi, dan kolom kosong. Klik <b>Perbaiki</b> pada tiap temuan.</li>
  <li><b>Tiap bulan</b>: pasang buletin, tempel tautan SKM bulan itu (tab Survei Kepuasan), jalankan Periksa Web.</li></ul>`)}
 ${L("9. Teknis dan serah terima",`<p>Bagian ini untuk petugas yang meneruskan pengelolaan web. Password dan kunci rahasia <b>tidak</b> ditulis di sini; catat siapa yang memegangnya.</p>
  <ul><li><b>Tampilan web</b>: Cloudflare Pages, proyek <code>staklim-pabar</code> (alamat staklim-pabar.pages.dev). Versi baru dipasang dengan mengunggah isi <code>web-staklim.zip</code> sebagai deployment baru di Workers &amp; Pages → staklim-pabar.</li>
  <li><b>Robot admin</b> (<code>staklim-admin</code>): menyimpan isi web, dokumen, gambar, masukan, dan cadangan mingguan; mengambil rilisan BMKG Pusat tiap 8 jam (Cron <code>0 */8 * * *</code>). Perlu: KV binding <code>DATA</code> (namespace STAKLIM_DATA), Secret <code>ADMIN_PASS</code> (password Admin); opsional R2 binding <code>BERKAS</code> dan Workers AI binding <code>AI</code>.</li>
  <li><b>Robot data</b> (<code>staklim-data</code>): membaca data AWS/ARG dari broker MQTT tiap 3 menit (Cron <code>*/3 * * * *</code>) dan mencari berita sekali sehari. Perlu: KV binding <code>DATA</code> (namespace yang sama), Secret <code>MQTT_AKUN</code> (atau <code>MQTT_USER</code>/<code>MQTT_PASS</code>), <code>KUNCI</code>, <code>NEWSDATA_KEY</code>; opsional <code>AI</code>.</li>
  <li><b>Penghubung</b>: file <code>_worker.js</code> di dalam zip meneruskan alamat <code>/api/admin</code> dan <code>/api/data</code> ke kedua robot (service binding <code>ADMIN</code> dan <code>DATA</code> di pengaturan proyek Pages).</li>
  <li><b>Memperbarui robot</b>: Workers &amp; Pages → pilih robot → Edit code → ganti seluruh isi dengan file <code>.txt</code> versi baru → Deploy.</li>
  <li><b>Bila web tidak berubah atau data alat berhenti</b>: buka robot terkait → tab Logs/Metrics untuk melihat galat, dan tab Settings → Triggers untuk memastikan Cron masih ada. Batas gratis Cloudflare: 100.000 permintaan robot per hari dan 1.000 kali simpan KV per hari.</li>
  <li><b>Bila salah ubah besar</b>: Admin → Cadangan &amp; Penyimpanan → pulihkan cadangan mingguan, atau Admin → Riwayat → Kembalikan.</li></ul>
  <table class="serah"><tr><th>Yang dipegang</th><th>Nama pemegang</th><th>Tanggal</th></tr><tr><td>Akun Cloudflare (email login)</td><td></td><td></td></tr><tr><td>Password Admin web</td><td></td><td></td></tr><tr><td>Akun MQTT alat AWS/ARG</td><td></td><td></td></tr><tr><td>Kunci NewsData.io &amp; KUNCI robot data</td><td></td><td></td></tr></table>`)}
 <p><button type="button" class="mini" data-klik="cetak">Cetak panduan</button> <button type="button" class="mini" id="admUnduhPanduan">⬇️ Unduh panduan (Word)</button></p>
 <p class="admnote">Simpan file unduhan di Drive kantor dan cetak satu untuk arsip, supaya panduan tetap bisa dibaca bila Admin tidak bisa dibuka. Unduh ulang setiap ada perubahan besar.</p></div>`}
function unduhPanduan(){const d=document.createElement("div");d.innerHTML=admPanduan();d.querySelectorAll("button,.admnote:last-child").forEach(x=>x.remove());
 const html=`<html><head><meta charset="utf-8"><title>Panduan Admin Web Staklim Papua Barat</title><style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.4}h3{font-size:14pt;color:#0133cc;margin:18pt 0 6pt}code{font-family:Consolas,monospace;font-size:10pt}table{border-collapse:collapse}td,th{border:1px solid #999;padding:4pt 8pt;min-width:120pt;text-align:left}</style></head><body><h1>Panduan Admin Web Stasiun Klimatologi Papua Barat</h1><p>Diunduh ${new Date().toLocaleDateString("id-ID",{timeZone:"Asia/Jayapura",day:"numeric",month:"long",year:"numeric"})} dari ${location.origin}/admin</p>${d.innerHTML}</body></html>`;
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+html],{type:"application/msword"}));a.download="Panduan-Admin-Staklim-Papua-Barat.doc";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)}

const CTA_WIL=`<a class="ctawil" href="#wilayah"><span class="ctapin" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 24 24"><path d="M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z"/><circle cx="12" cy="10" r="2.6"/></svg></span><span class="ctateks"><b>Mau tahu kondisi iklim di kampung Anda?</b><small>Pilih kabupaten dan distrik Anda, lalu lihat hujan, musim, dan peringatan dini untuk tempat Anda dalam satu halaman.</small></span><span class="ctabtn">Cek wilayah saya <em aria-hidden="true">→</em></span></a>`;
Object.keys(ATURAN_PUSAT).forEach(k=>{const f=P[k];if(!f)return;P[k]=()=>{const h=f(),i=h.indexOf("</p></div>");const kp=kontenPusat(k),x=pembaruanPusat(k)+(kp?`<div data-otogrup>${kp}</div>`:"")+ringkasKami(k)+dokKami(k)+LEGENDA_SUMBER();return i<0?h+x:h.slice(0,i+10)+x+h.slice(i+10)}});
const app=document.getElementById("app"),drop=document.getElementById("iklimDrop"),ib=document.getElementById("iklimBtn"),nav=document.getElementById("nav"),bg=document.getElementById("burger");
const pb=document.getElementById("profilBtn"),pdrop=document.getElementById("profilDrop");
/* bilah kemajuan baca, bayangan header, dan tombol ke atas */
{const mb=document.createElement("button");mb.id="mskApung";mb.type="button";mb.dataset.masukan="";mb.innerHTML='<span class="mskik" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.7 8.7 0 0 1-3.6-.8L3 20.5l1.6-4.6A8.1 8.1 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3.200 8.400 8.400 0 0 1 21 11.500z"/><path d="M8.5 10h8M8.500 13.500h5"/></svg></span><b>Kirim masukan</b>';mb.setAttribute("aria-label","Kirim masukan atau laporkan kesalahan di web ini");document.body.appendChild(mb);}
{const pr=document.createElement("div");pr.id="progres";document.body.appendChild(pr);const ka=document.createElement("button");ka.id="keAtas";ka.type="button";ka.setAttribute("aria-label","Kembali ke atas");ka.textContent="↑";ka.onclick=()=>scrollTo({top:0,behavior:"smooth"});document.body.appendChild(ka);
 const hd=document.querySelector("header");let jalan=false;const gulir=()=>{jalan=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pr.style.transform="scaleX("+(h>0?Math.min(1,y/h):0)+")";hd&&hd.classList.toggle("gulir",y>8);ka.classList.toggle("tampil",y>900)};
 addEventListener("scroll",()=>{if(!jalan){jalan=true;requestAnimationFrame(gulir)}},{passive:true})}
/* ===================================================================== INFORMASI DASARIAN (produk kantor)
   Diisi petugas di Admin > Informasi Dasarian: tabel per kabupaten/distrik (Excel atau ketik), teks ringkas, dan peta yang diunggah sendiri.
   Periode baru otomatis memindahkan periode lama ke arsip (teks + peta). ===================================================================== */
const BLN_DAS=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],ROM_DAS=["I","II","III"];
const DASI=()=>{const v=(KA&&KA.pengaturan&&KA.pengaturan.info_das)||{};return v.terbaru&&v.terbaru.das||cur==="admin"?v:(typeof DAS_BAWAAN!=="undefined"&&DAS_BAWAAN?{...v,terbaru:DAS_BAWAAN,arsip:v.arsip||[]}:v)};
const dasJudul=x=>x&&x.das?`Dasarian ${x.das} ${BLN_DAS[x.bln-1]} ${x.thn}`:"";
const dasRentang=x=>{if(!x||!x.das)return "";const b=BLN_DAS[x.bln-1],akhir=new Date(x.thn,x.bln,0).getDate();return (x.das==="I"?"1–10 ":x.das==="II"?"11–20 ":"21–"+akhir+" ")+b+" "+x.thn};
const dasGeser=(x,n)=>{let i=x.thn*36+(x.bln-1)*3+ROM_DAS.indexOf(x.das)+n;return {thn:Math.floor(i/36),bln:Math.floor((i%36)/3)+1,das:ROM_DAS[i%3]}};
const dasAkhirMs=x=>{const akhir=new Date(x.thn,x.bln,0).getDate(),h=x.das==="I"?10:x.das==="II"?20:akhir;return Date.UTC(x.thn,x.bln-1,h,15)};
const dasSekarang=()=>{const d=new Date(Date.now()+9*3600e3),t=d.getUTCDate();return {thn:d.getUTCFullYear(),bln:d.getUTCMonth()+1,das:t<=10?"I":t<=20?"II":"III"}};
const KAT_DAS=[["Rendah","0–50 mm","#c8a15a"],["Menengah","51–150 mm","#7fbf6a"],["Tinggi","151–300 mm","#2f8fd1"],["Sangat Tinggi","lebih dari 300 mm","#1f3f7a"]];
const katDasMm=mm=>mm==null||mm===""||isNaN(+mm)?"":+mm<=50?"Rendah":+mm<=150?"Menengah":+mm<=300?"Tinggi":"Sangat Tinggi";
const normKatDas=v=>{v=String(v||"").trim().toLowerCase();return /^(st|sangat ?tinggi)$/.test(v)?"Sangat Tinggi":/^(t|tinggi)$/.test(v)?"Tinggi":/^(m|menengah|sedang)$/.test(v)?"Menengah":/^(r|rendah)$/.test(v)?"Rendah":""};
const normSifDas=v=>{v=String(v||"").trim().toLowerCase();return /^(an|a|atas ?normal)$/.test(v)?"Atas Normal":/^(bn|b|bawah ?normal)$/.test(v)?"Bawah Normal":/^(n|normal)$/.test(v)?"Normal":""};
const normDis=x=>(typeof ejaWil==="function"?ejaWil(x):String(x||"")).toLowerCase().replace(/^(distrik|kecamatan)\s+/,"").replace(/[^a-z]/g,"");
const mmTeks=v=>v==null||v===""?"":String(Math.round(+v*10)/10).replace(".",",")+" mm";
/* baris tabel buletin/dasarian yang cocok: distrik bila ada, bila tidak baris kabupaten */
let WIL_FB=0;
function barisDis(rows,kab,dis){const R=(Array.isArray(rows)?rows:[]).filter(r=>r&&samaKab(r.kab,kab));if(!R.length)return undefined;
 if(dis){const d=R.find(r=>r.dis&&normDis(r.dis)===normDis(dis));if(d)return d;if(R.some(r=>r.dis))WIL_FB=1}
 return R.find(r=>!r.dis)}
function urutKabDas(a,b){const i=k=>{const j=KAB_SEMUA.findIndex(x=>samaKab(x[0],k));return j<0?99:j};return i(a.kab)-i(b.kab)||(a.dis?1:0)-(b.dis?1:0)||String(a.dis||"").localeCompare(String(b.dis||""),"id")}
function tabelDas(rows,mode){const an=mode==="an",R=(rows||[]).filter(r=>an?(r.an_kat||r.an_sh||r.an_mm!=null):(r.pr_kat||r.pr_sh)).slice().sort(urutKabDas);if(!R.length)return "";
 const kat=r=>an?(r.an_kat||katDasMm(r.an_mm)):r.pr_kat,sif=r=>an?r.an_sh:r.pr_sh;let kab="";
 return `<div class="tbl-wrap"><table class="das-t"><thead><tr><th>Wilayah</th>${an?'<th class="ang">Curah hujan</th>':""}<th>Kategori</th><th>Sifat hujan</th></tr></thead><tbody>${R.map(r=>{const grp=!r.dis||r.kab!==kab?(kab=r.kab,1):0;const nm=r.dis?`<span class="das-dis">${esc(r.dis)}</span>`:`<b>${esc(normKab(r.kab))}</b>`;
  const g=r.dis&&grp&&!R.some(x=>!x.dis&&x.kab===r.kab)?`<tr class="ph-grp"><th colspan="${an?4:3}">${esc(normKab(r.kab))}</th></tr>`:"";
  return g+`<tr${r.dis?' class="das-baris-dis"':""}><td>${nm}${r.ket?`<br><small>${esc(r.ket)}</small>`:""}</td>${an?`<td class="ang">${esc(mmTeks(r.an_mm))||"–"}</td>`:""}<td>${kat(r)?chip2(kat(r)):"–"}</td><td>${sif(r)?chip2(sif(r)):"–"}</td></tr>`}).join("")}</tbody></table></div>`}
function petaDas(list){const p=(list||[]).filter(x=>x&&x.file);if(!p.length)return "";return `<div class="petas${p.length>1?" dua":""}">${p.map(x=>`<figure class="map"><a href="${fileURL(x.file)}" target="_blank" rel="noopener"><img src="${fileURL(x.file)}" alt="${esc(x.judul)}" loading="lazy" data-galat="figure"></a><figcaption>${esc(x.judul)}</figcaption></figure>`).join("")}</div>`}
const legendDas=()=>`<div class="legend">${KAT_DAS.map(([n,r,c])=>`<span><i style="background:${c}"></i>${n} ${r}</span>`).join("")}</div>`;
function arsipDas(ar){ar=(ar||[]).filter(x=>x&&x.das);if(!ar.length)return "";
 return `<div class="panel"><div class="panel-head"><span>Arsip Informasi Dasarian</span></div><div class="panel-body das-arsip">${ar.map(x=>`<details class="dasarsip"><summary><b>${esc(dasJudul(x))}</b> <small>${esc(dasRentang(x))}</small></summary>${x.an_teks?`<p><b>Analisis:</b> ${esc(x.an_teks)}</p>`:""}${x.pr_teks?`<p><b>Prakiraan${x.pr_periode?" "+esc(x.pr_periode):""}:</b> ${esc(x.pr_teks)}</p>`:""}${x.teks?`<p>${esc(x.teks)}</p>`:""}${petaDas(x.peta)}${dasArsipTambah(x)}</details>`).join("")}</div></div>`}
const AWAM_DAS=["<b>Dasarian</b> adalah periode 10 harian: Dasarian I tanggal 1–10, Dasarian II tanggal 11–20, dan Dasarian III tanggal 21 sampai akhir bulan.","<b>Analisis</b> menjelaskan hujan yang <i>sudah</i> turun pada dasarian lalu. <b>Prakiraan</b> adalah perkiraan hujan untuk dasarian berikutnya.","<b>Kategori curah hujan dasarian</b>: Rendah 0–50 mm, Menengah 51–150 mm, Tinggi 151–300 mm, Sangat Tinggi lebih dari 300 mm dalam 10 hari.","<b>Sifat hujan</b> membandingkan hujan dengan rata-rata 30 tahun (1991–2020) pada dasarian yang sama: Bawah Normal kurang dari 85%, Normal 85–115%, Atas Normal lebih dari 115%.","Hujan di bawah 50 mm selama 10 hari berturut-turut beberapa kali menandakan musim kemarau; 50 mm atau lebih selama tiga dasarian berturut-turut menandakan awal musim hujan."];
function dasTebal(x){return esc(String(x==null?"":x).replace(/\bManowkari\b/g,"Manokwari")).replace(/\b(dasarian\s+(?:III|II|I|[123])\b(?:\s+(?:januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember))?(?:\s+\d{4})?)/gi,"<b>$1</b>")}
P["informasi-dasarian"]=()=>{const v=DASI(),t=v.terbaru,hd=head("Iklim >> Informasi Dasarian","Informasi Dasarian","Analisis dan prakiraan curah hujan per 10 hari (dasarian) untuk Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat.");
 if(!t||!t.das)return hd+`<div class="card"><p style="margin:0">Informasi dasarian dari kami belum diterbitkan. Sementara itu, lihat curah hujan per dasarian setiap pos di <a href="#pos-hujan">Data Pos Hujan</a> dan peringatan dini dasarian di <a href="#peringatan-hujan-tinggi">Peringatan Hujan Tinggi</a>.</p></div>`+arsipDas(v.arsip)+awam("Cara membaca informasi dasarian",AWAM_DAS);
 const pk=ks=>petaDas((t.peta||[]).filter(p=>ks.includes(p.k))),prJ=t.pr_periode||dasJudul(dasGeser(t,1)),basi=Date.now()-dasAkhirMs(t)>25*864e5;
 return hd+(basi?`<div class="catatan-pmh" role="note"><span class="cp-ikon" aria-hidden="true">i</span><div><b>Informasi ini sudah lebih dari tiga dasarian.</b><p>Edisi terbaru akan tampil di sini setelah diterbitkan.</p></div></div>`:"")+
 `<div class="panel"><div class="panel-head"><span>Analisis ${esc(dasJudul(t))} <small class="das-rentang">${esc(dasRentang(t))}</small></span></div><div class="panel-body">${t.an_teks?`<p>${dasTebal(t.an_teks)}</p>`:""}${pk(["an_ch","an_sh"])}${tabelDas(t.rows,"an")}</div></div>`+
 `<div class="panel"><div class="panel-head"><span>Prakiraan ${esc(prJ)}</span></div><div class="panel-body">${t.pr_teks?`<p>${dasTebal(t.pr_teks)}</p>`:""}${pk(["pr_ch","pr_sh","pr_pel"])}${tabelDas(t.rows,"pr")}</div></div>`+
 ((t.peta||[]).some(p=>p.k==="lain")||t.teks?`<div class="panel"><div class="panel-head"><span>Informasi lain</span></div><div class="panel-body">${t.teks?`<p>${dasTebal(t.teks)}</p>`:""}${pk(["lain"])}</div></div>`:"")+
 legendDas()+`<p class="note">Diterbitkan ${esc(tglPMHU(t.diunggah))} oleh Stasiun Klimatologi Papua Barat. Curah hujan per dasarian setiap pos ada di <a href="#pos-hujan">Data Pos Hujan</a>.</p>`+arsipDas(v.arsip)+awam("Cara membaca informasi dasarian",AWAM_DAS)};
/* ===== PENGADUAN & WHISTLE BLOWING SYSTEM =====
   Pengaduan layanan (saran, kritik, pengaduan, pertanyaan) masuk ke tab Admin › Masukan & Pengaduan, dengan tiket AD-….
   WBS: isi laporan dienkripsi di browser pelapor dengan kunci publik Kotak WBS (RSA-OAEP + AES-GCM). Robot dan Admin
   biasa hanya melihat sandi acak; yang bisa membaca hanya pemegang kata sandi WBS. Pelapor memantau dengan tiket WB-… + PIN. */
const PG_IKON={"layanan": '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path class="pgi-a" d="M6 12a6 6 0 0 1 6-6h18a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H18l-7 6v-6.2A6 6 0 0 1 6 22z" fill="#fff" fill-opacity=".18" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><path class="pgi-b" d="M22 32h14l7 6v-6.2a6 6 0 0 0 0-11.8" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><circle class="dt" cx="15" cy="17" r="2.2" fill="#fff"/><circle class="dt" cx="21" cy="17" r="2.2" fill="#fff"/><circle class="dt" cx="27" cy="17" r="2.2" fill="#fff"/></svg>', "wbs_lama": '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><path class="pgi-perisai" d="M24 4l16 6v11c0 10.5-6.8 18.6-16 23-9.2-4.4-16-12.5-16-23V10z" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/><path class="pgi-cek" d="M16.5 24l5.5 5.5 10-11" stroke="#86efac" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>', "cek": '<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><g class="pgi-lup"><circle cx="21" cy="21" r="11" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-width="2.6"/><path d="M29.5 29.5L40 40" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></g><path d="M16 21h10M16 17h7M16 25h5" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/></svg>'};
PG_IKON.wbs_sst='<svg viewBox="0 0 48 48" width="40" height="40" fill="none"><circle cx="24" cy="23" r="17" fill="#fde68a" stroke="#fff" stroke-width="2.2"/><g class="sst-mata"><ellipse cx="18" cy="19" rx="2.2" ry="2.6" fill="#7c2d12"/><ellipse cx="30" cy="19" rx="2.2" ry="2.6" fill="#7c2d12"/></g><path d="M17.5 13.5l4 1.5M30.5 13.5l-4 1.5" stroke="#7c2d12" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="24" cy="31" rx="4.6" ry="2.2" fill="#b45309"/><g class="sst-jari"><rect x="21.6" y="18" width="4.8" height="16" rx="2.4" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/><path d="M17 44c0-6 2.5-10 7-10s7 4 7 10" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/></g><g class="sst-teks" fill="#fff" font-size="7" font-weight="800" font-family="system-ui,sans-serif"><text x="36" y="9">s</text><text x="40.5" y="6">t</text></g></svg>';
PG_IKON.wbs='<svg viewBox="0 0 60 48" width="48" height="40" fill="none" class="peluit-ikon" aria-hidden="true"><g class="pt-udara" fill="#fff"><circle cx="27" cy="11" r="2.4"/><circle cx="27" cy="11" r="1.8"/><circle cx="27" cy="11" r="1.4"/></g><g class="pt-gel" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M41 9c2.2-1.6 5.6-1.6 7.6.6"/><path d="M43.6 4c3.8-2.4 9.4-2.2 12.6 1.4"/><path d="M50.5 14.5c2 .4 3.6 1.6 4.4 3.4"/></g><g class="pt-peluit"><path d="M44 39c3 3 6 3.6 9 2.4" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/><circle cx="43.5" cy="37.5" r="3.3" stroke="#e2e8f0" stroke-width="1.8"/><rect x="2.5" y="16" width="11" height="6" rx="2" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/><path d="M11 15H34A12 12 0 1 1 22 27V22.5H11Z" fill="#fbbf24" stroke="#92400e" stroke-width="1.6" stroke-linejoin="round"/><rect x="24" y="13.2" width="6.5" height="3.6" rx="1" fill="#78350f"/><path d="M14 17.5h6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><circle class="pt-bola" cx="34" cy="28" r="4.2" fill="#b45309"/><circle cx="32.6" cy="26.6" r="1.2" fill="#fde68a"/></g></svg>';
const TAUTAN_BAWAAN={wbs:"https://wbs.bmkg.go.id/",lapor:"https://www.lapor.go.id/",ptsp:"https://ptsp.bmkg.go.id/pengaduan"};
function perbaruiTautanResmi(){document.querySelectorAll("a[data-tautan]").forEach(a=>{a.href=tautanResmi(a.dataset.tautan)})}
const tautanResmi=k=>{const t=(typeof TW==="function"&&TW().tautan)||{};return /^https:\/\//.test(t[k]||"")?t[k]:TAUTAN_BAWAAN[k]};
/* ===== teks baru yang bisa diubah petugas (Admin › Teks Halaman › ClimaX Dulu, Pengaduan & WBS) ===== */
const TB_DEF=[
 ["clx_kep","ClimaX Dulu · Kepanjangan nama","Centra Layanan Informasi Musim, Atmosfer & X-trem — Di Ujung Layar Untukmu",1],
 ["clx_promo","ClimaX Dulu · Kalimat di kotak promosi Beranda","Butuh data iklim? Ajukan online, pantau dengan nomor tiket atau nomor HP. Gratis untuk pendidikan, penelitian, dan kegiatan sosial.",2],
 ["clx_judul","ClimaX Dulu · Judul kotak Tentang (halaman Permintaan Pelayanan Data)","Layanan Permintaan Data Iklim BMKG Papua Barat",1],
 ["clx_isi","ClimaX Dulu · Isi kotak Tentang (pisahkan paragraf dengan baris kosong)","",8],
 ["clx_untuk","ClimaX Dulu · Untuk siapa (satu baris: ikon | nama)","🎓 | Mahasiswa\n🔬 | Peneliti\n🏛️ | Instansi pemerintah\n💼 | Dunia usaha\n👥 | Masyarakat umum",5],
 ["alur","Alur layanan · Lima langkah (satu baris: judul | penjelasan; {sla} = batas hari kerja)","Ajukan | Isi formulir dan unggah surat. Kegiatan Rp0 juga KTP, dan kartu mahasiswa untuk penelitian. Nomor tiket langsung keluar.\nVerifikasi | Kelengkapan berkas diperiksa otomatis. Bila ada yang kurang, Anda diminta melengkapi.\nPembayaran | Khusus kegiatan bertarif PNBP: bayar dengan kode billing SIMPONI, lalu unggah bukti bayar.\nDiproses | Petugas menyiapkan data, paling lama {sla} hari kerja.\nUnduh data | Data diunduh dari halaman Cek status, berlaku 30 hari.",6],
 ["aduan_judul","Pengaduan layanan · Judul","Suara Anda membuat layanan kami lebih baik",1],
 ["aduan_isi","Pengaduan layanan · Kalimat pembuka","Layanan lambat, data sulit didapat, atau ada yang kurang berkenan? Sampaikan langsung kepada kami. Setiap laporan dibaca petugas dan bisa Anda pantau dengan nomor tiket.",3],
 ["wbs_judul","Whistle Blowing · Judul","LAWAN KECURANGAN! JANGAN BIARKAN MEREKA MENANG KARENA KITA DIAM!",2],
 ["wbs_isi","Whistle Blowing · Sub-judul","Satu keberanianmu hari ini menyelamatkan marwah pelayanan publik. Laporkan pelanggaran pegawai Stasiun Klimatologi Papua Barat sekarang juga: tanpa login, tanpa jejak, dan identitas Anda anonim sepenuhnya!",3],
 ["pusat_judul","Whistle Blowing · Judul kotak lapor ke pusat","Ragu laporan Anda tuntas di tingkat stasiun?",1],
 ["pusat_isi","Whistle Blowing · Isi kotak lapor ke pusat","Bawa langsung ke BMKG pusat. Laporan Anda tetap dirahasiakan dan ditangani oleh pihak yang berwenang.",2]];
const TB=k=>{const v=((typeof PG==="function"&&PG("teks_baru"))||{})[k];if(v&&String(v).trim())return String(v);const d=(TB_DEF.find(x=>x[0]===k)||[])[2]||"";return k==="clx_isi"&&!d&&typeof CLX_TENTANG!=="undefined"?CLX_TENTANG.p.join("\n\n"):d};
const TBp=k=>TB(k).split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
const TBb=k=>TB(k).split(/\n+/).map(l=>l.split("|").map(x=>x.trim())).filter(x=>x[0]);
function admTeksBaru(){const v=(typeof PG==="function"&&PG("teks_baru"))||{};return `<form id="admTeksBaru" class="admsub"><fieldset class="kdrow"><legend>ClimaX Dulu, Pengaduan &amp; Whistle Blowing</legend><p class="admnote">Teks di halaman Permintaan Pelayanan Data, Beranda (kotak ClimaX), dan halaman Pengaduan. Kosongkan kotak untuk kembali ke teks bawaan.</p>
 ${TB_DEF.map(([k,l,d,r])=>`<label>${escH(l)}<textarea name="tb_${k}" rows="${r}">${escH(v[k]||(k==="clx_isi"?TB(k):d))}</textarea></label>`).join("")}<button class="pbtn" type="submit">Simpan teks ClimaX, Pengaduan &amp; WBS</button></fieldset></form>`}
document.addEventListener("submit",async e=>{const f=e.target;if(f.id!=="admTeksBaru")return;e.preventDefault();const o={};
 TB_DEF.forEach(([k,,d])=>{const x=f["tb_"+k].value.trim(),def=k==="clx_isi"&&typeof CLX_TENTANG!=="undefined"?CLX_TENTANG.p.join("\n\n"):d;if(x&&x!==def.trim())o[k]=x});
 const b=f.querySelector('button[type="submit"]');b.disabled=true;try{await admJSON("/admin/pengaturan",{kunci:"teks_baru",nilai:o});await muatUlangKA();pesan("Teks disimpan"+(Object.keys(o).length?" ("+Object.keys(o).length+" diubah)":"")+". Tampil di web paling lama 1 menit.")}catch(er){pesan(er.message,1)}b.disabled=false});
const PGN={tab:"layanan",kirim:false,aduan:null,wbs:null,cek:null,galat:"",t0:Date.now()};
const WBS_IKON={kkn:"💰",wewenang:"⚖️",pungli:"🤲",gratifikasi:"🎁",benturan:"🔀",aturan:"📋"};
const WBS_JENIS=[["kkn","Korupsi, kolusi, dan nepotisme","Penyalahgunaan anggaran, mark-up, atau memperkaya diri sendiri/orang lain."],["wewenang","Penyalahgunaan wewenang","Memakai jabatan untuk kepentingan pribadi atau di luar ketentuan."],["pungli","Pungutan liar","Meminta bayaran di luar tarif resmi, termasuk untuk layanan Rp0."],["gratifikasi","Gratifikasi","Menerima hadiah, uang, atau fasilitas yang berhubungan dengan jabatan."],["benturan","Benturan kepentingan","Keputusan yang dipengaruhi hubungan pribadi, keluarga, atau bisnis."],["aturan","Pelanggaran disiplin atau aturan","Pelanggaran kewajiban pegawai atau peraturan yang berlaku."]];
const WBS_ST={diterima:"Diterima",ditelaah:"Sedang ditelaah",ditindaklanjuti:"Ditindaklanjuti",selesai:"Selesai",tidak:"Tidak dapat ditindaklanjuti"};
const ADUAN_ST={baru:"Diterima, menunggu petugas",ditangani:"Sedang ditangani",selesai:"Selesai"};

/* --- sandi (WebCrypto) --- */
const wb64=buf=>{const a=new Uint8Array(buf);let s="";for(let i=0;i<a.length;i+=8192)s+=String.fromCharCode.apply(null,a.subarray(i,i+8192));return btoa(s)};
const wunb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const wAcak=n=>wb64(crypto.getRandomValues(new Uint8Array(n)));
async function wPbkdf2(pass,salt,iter){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(pass),"PBKDF2",false,["deriveBits"]);return crypto.subtle.deriveBits({name:"PBKDF2",salt:wunb64(salt),iterations:iter,hash:"SHA-256"},k,256)}
async function wAesEnc(raw,obj){const iv=crypto.getRandomValues(new Uint8Array(12)),k=await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["encrypt"]);return {iv:wb64(iv),ct:wb64(await crypto.subtle.encrypt({name:"AES-GCM",iv},k,new TextEncoder().encode(JSON.stringify(obj))))}}
async function wAesDec(raw,p){const k=await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["decrypt"]);return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:wunb64(p.iv)},k,wunb64(p.ct))))}
const WBS_ITER=250000,PIN_ITER=150000;
async function pgJSON(jalur,data){const r=await fetch(KONTEN_URL+jalur,data===undefined?{}:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok||j.galat)throw new Error(j.galat||"Robot sedang bermasalah. Coba lagi sebentar lagi.");return j}
/* --- halaman publik --- */
P.pengaduan=()=>head("Pengaduan","Saran, Kritik &amp; Pengaduan","Sampaikan keluhan, saran, atau laporan pelanggaran langsung kepada kami. Setiap laporan mendapat nomor tiket untuk dipantau.")+`
<div class="pg-pilih" role="tablist">${[["layanan","Pengaduan layanan","Keluhan, kritik, dan saran tentang layanan kami"],["wbs","Whistle Blowing","Laporkan dugaan pelanggaran pegawai secara rahasia"],["cek","Cek status","Pantau laporan dengan nomor tiket"]].map(([k,j,d])=>`<button type="button" role="tab" class="pg-tab pg-tab-${k}" data-pg-tab="${k}" aria-selected="${PGN.tab===k}"><span class="pg-tab-i" aria-hidden="true">${PG_IKON[k]}</span><b>${j}</b><small>${d}</small><span class="pg-tab-tanda" aria-hidden="true">✓</span></button>`).join("")}</div>
<div id="pgIsi">${pgIsi()}</div>`;
function pgIsi(){return PGN.tab==="wbs"?pgWbs():PGN.tab==="cek"?pgCek():pgLayanan()}
function pgGambar(){const b=document.getElementById("pgIsi");if(b)b.innerHTML=pgIsi();document.querySelectorAll("[data-pg-tab]").forEach(x=>x.setAttribute("aria-selected",String(x.dataset.pgTab===PGN.tab)))}
function pgTiketKotak(t,pin){return `<div class="pg-tiket"><span>Nomor tiket</span><b>${esc(t)}</b>${pin?`<span>PIN</span><b>${esc(pin)}</b>`:""}<button type="button" class="mini" data-pg-salin="${esc(t+(pin?" PIN "+pin:""))}">Salin</button></div>`}
function pgCadangan(){return `<details class="pg-cadangan"><summary>Saluran lain (cadangan)</summary><div class="prose">
 <p>Kami mengutamakan penyelesaian lewat web ini. Bila Anda tetap ingin melapor ke saluran nasional:</p>
 <ol><li><b>Buka SP4N-LAPOR!</b> Kunjungi <a data-tautan="lapor" href="${escH(tautanResmi("lapor"))}" target="_blank" rel="noopener">lapor.go.id</a>, lalu masuk atau daftar akun.</li>
 <li><b>Tulis laporan.</b> Pilih kategori Pengaduan atau Aspirasi, lalu jelaskan keluhan beserta tanggal dan lokasi kejadian.</li>
 <li><b>Atur privasi.</b> Centang opsi Anonim bila tidak ingin nama Anda dipublikasikan, atau Rahasia agar isi laporan hanya dibaca admin BMKG yang berwenang.</li>
 <li><b>Kirim laporan.</b> Lampirkan bukti pendukung bila ada, lalu kirim agar diteruskan ke unit kerja BMKG terkait.</li></ol>
 <p>Untuk kendala pemesanan data atau layanan data daring BMKG pusat, Anda juga bisa mengisi <a data-tautan="ptsp" href="${escH(tautanResmi("ptsp"))}" target="_blank" rel="noopener">Pengaduan PTSP BMKG</a>.</p></div></details>`}
function pgLayanan(){if(PGN.aduan)return `<div class="card pg-sukses" role="status"><h3>✓ Terima kasih, laporan Anda sudah kami terima</h3><p>Simpan nomor tiket ini untuk memantau tanggapan petugas di tab <b>Cek status</b>.</p>${pgTiketKotak(PGN.aduan)}<p><button type="button" class="pbtn sek" data-pg-baru>Kirim laporan lain</button></p></div>`;
 return `<section class="pg-hero pg-hero-layanan"><div><span class="eyebrow">Pengaduan layanan</span><h2>${esc(TB("aduan_judul"))}</h2><p>${esc(TB("aduan_isi"))}</p></div>
 <ul class="pg-janji">${[["💬","Ditanggapi petugas","Dibaca dan ditindaklanjuti langsung oleh Stasiun Klimatologi Papua Barat."],["🎫","Bertiket","Nomor tiket keluar seketika. Pantau tanggapan di tab Cek status."],["🔐","Kontak terjaga","Nama dan kontak boleh dikosongkan, dan tidak pernah ditampilkan ke publik."]].map(([i,j,d])=>`<li><span aria-hidden="true">${i}</span><b>${j}</b><small>${d}</small></li>`).join("")}</ul></section>
 <div class="pg-grid"><form class="card pg-form" id="pgAduan" novalidate><h3>Sampaikan kepada kami</h3>
 <fieldset class="pg-jenis"><legend>Jenis</legend>${[["pengaduan","📣","Pengaduan","Layanan lambat, data sulit diakses, fasilitas rusak"],["kritik","🛠️","Kritik","Hal yang perlu kami perbaiki"],["saran","💡","Saran","Usul perbaikan atau informasi baru"],["pertanyaan","❓","Pertanyaan","Soal data dan informasi iklim"]].map(([k,ik,n,d],i)=>`<label><input type="radio" name="jenis" value="${k}"${i?"":" checked"}><span><i aria-hidden="true">${ik}</i><b>${n}</b><small>${d}</small></span></label>`).join("")}</fieldset>
 <label>Ceritakan apa yang terjadi <span class="w" aria-hidden="true">*</span><textarea name="isi" rows="6" maxlength="1500" required placeholder="Apa yang terjadi, kapan, dan di mana. Semakin jelas, semakin cepat kami tindak lanjuti."></textarea></label>
 <label>Nama dan kontak <small>(opsional, bila ingin dihubungi petugas)</small><input name="kontak" maxlength="120" autocomplete="off" placeholder="mis. nama dan nomor WA atau email"></label>
 <input class="mskjebak" name="situs" tabindex="-1" autocomplete="off" aria-hidden="true">
 <p class="pd-galat" role="alert">${esc(PGN.galat)}</p><button class="pbtn" type="submit"${PGN.kirim?" disabled":""}>${PGN.kirim?"Mengirim…":"Kirim laporan"}</button></form>
 <aside class="card pg-sisi"><h3>Ke mana laporan Anda?</h3><ul class="pg-poin"><li><b>Langsung ke petugas kami.</b> Dibaca dan ditindaklanjuti oleh Stasiun Klimatologi Papua Barat.</li><li><b>Bertiket.</b> Tanggapan petugas bisa dipantau di tab Cek status.</li><li><b>Data Anda aman.</b> Kontak hanya dipakai untuk menghubungi Anda dan disimpan paling lama 6 bulan.</li></ul>
 <p class="pg-kecil">Ingin melaporkan dugaan pelanggaran pegawai, seperti pungli atau gratifikasi? Gunakan <a href="#pengaduan" data-pg-tab="wbs">Whistle Blowing</a> yang lebih rahasia.</p>${pgCadangan()}</aside></div>`}
function pgWbs(){if(PGN.wbs)return `<div class="card pg-sukses" role="status"><h3>✓ Laporan terkirim secara rahasia</h3><p><b>Simpan nomor tiket dan PIN berikut.</b> Keduanya satu-satunya cara memantau laporan dan membaca tanggapan. Kami tidak menyimpan identitas Anda, jadi PIN tidak bisa dikirim ulang.</p>${pgTiketKotak(PGN.wbs.tiket,PGN.wbs.pin)}<p class="pg-aksi-sukses"><button type="button" class="pbtn" data-pg-bukti>⬇ Unduh bukti laporan</button> <button type="button" class="pbtn sek" data-pg-baru>Selesai</button></p></div>`;
 return `<section class="pg-hero pg-wbs-hero"><div><span class="eyebrow">Whistle Blowing System</span><h2 class="pg-seru">${esc(TB("wbs_judul"))}</h2><p>${esc(TB("wbs_isi"))}</p></div><span class="pg-hero-sst" aria-hidden="true">${PG_IKON.wbs}</span>
 <ul class="pg-janji">${[["🔒","Rahasia","Isi laporan dikunci di perangkat Anda sebelum dikirim. Hanya penerima laporan yang ditunjuk yang bisa membukanya."],["🛡️","Aman","Tidak meminta nama, nomor HP, atau email. Pelapor dilindungi sesuai Perka BMKG No. 15 Tahun 2015."],["📍","Tertelusur","Pantau tindak lanjut dengan nomor tiket dan PIN."]].map(([i,j,d])=>`<li><span aria-hidden="true">${i}</span><b>${j}</b><small>${d}</small></li>`).join("")}</ul></section>
 <h3 class="pg-sub">Apa yang bisa dilaporkan?</h3><div class="pg-kriteria">${WBS_JENIS.map(([k,n,d],i)=>`<div class="pg-krit pg-krit-${k}" style="--i:${i}"><span class="pg-krit-i" aria-hidden="true">${WBS_IKON[k]}</span><b>${n}</b><p>${d}</p></div>`).join("")}</div>
 <div class="pg-grid"><form class="card pg-form" id="pgWbs" novalidate><h3>Buat laporan</h3><p class="pg-kecil">Laporan tidak harus sempurna, tetapi sebaiknya memuat <b>apa, siapa, di mana, dan kapan</b>.</p>
 <label>Jenis dugaan pelanggaran <span class="w" aria-hidden="true">*</span><select name="jenis" required><option value="">Pilih…</option>${WBS_JENIS.map(([k,n])=>`<option value="${k}">${n}</option>`).join("")}</select></label>
 <label>Apa yang terjadi <span class="w" aria-hidden="true">*</span><textarea name="apa" rows="5" maxlength="3000" required placeholder="Uraikan kejadiannya secara runtut."></textarea></label>
 <label>Siapa yang diduga terlibat <span class="w" aria-hidden="true">*</span><input name="siapa" maxlength="300" placeholder="Nama, jabatan, atau bagian"></label>
 <div class="pg-dua"><label>Di mana<input name="dimana" maxlength="200" placeholder="Lokasi kejadian"></label><label>Kapan<input name="kapan" maxlength="120" placeholder="Tanggal atau perkiraan waktu"></label></div>
 <label>Bukti yang Anda miliki <small>(jangan diunggah; cukup sebutkan)</small><input name="bukti" maxlength="400" placeholder="mis. foto kuitansi, pesan WA, saksi"></label>
 <label>Kontak <small>(opsional; kosongkan agar tetap anonim)</small><input name="kontak" maxlength="120" autocomplete="off"></label>
 <label class="cek"><input type="checkbox" name="setuju" required> Saya menyampaikan laporan ini dengan jujur dan dapat dipertanggungjawabkan.</label>
 <p class="pd-galat" role="alert">${esc(PGN.galat)}</p><button class="pbtn" type="submit"${PGN.kirim?" disabled":""}>${PGN.kirim?"Mengunci dan mengirim…":"Kirim laporan rahasia"}</button></form>
 <aside class="card pg-sisi"><h3>Pertanyaan umum</h3>${[["Apakah identitas saya diketahui?","Tidak. Formulir tidak meminta nama, nomor HP, atau email. Isi laporan dikunci di perangkat Anda dan hanya bisa dibuka penerima laporan yang ditunjuk pimpinan."],["Bagaimana memantau laporan?","Setelah terkirim Anda mendapat nomor tiket (WB-…) dan PIN 6 angka. Masukkan keduanya di tab Cek status untuk melihat status dan tanggapan."],["Bagaimana bila PIN hilang?","PIN tidak bisa dikirim ulang karena kami tidak menyimpan identitas Anda. Simpan bukti laporan (tombol Unduh bukti laporan) setelah melapor. Bila PIN tetap hilang, kirim laporan baru dan sebutkan nomor tiket lama di uraian, atau isi kontak bila ingin dihubungi penerima laporan."],["Bisakah melampirkan bukti?","Untuk menjaga kerahasiaan, berkas tidak diunggah. Sebutkan bukti yang Anda miliki; penerima laporan dapat meminta lewat tanggapan."],["Bagaimana bila yang dilaporkan pimpinan?","Laporan tetap bisa dikirim di sini. Bila Anda ingin laporan ditangani langsung oleh pusat, gunakan saluran BMKG pusat di bawah formulir ini."]].map(([q,a])=>`<details class="pg-faq"><summary>${q}</summary><p>${a}</p></details>`).join("")}</aside></div>${pgPusat()}`}
function pgPusat(){return `<section class="pg-pusat" aria-labelledby="pgPusatJ"><span class="pg-pusat-ikon" aria-hidden="true"><svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20L24 8l18 12"/><path d="M10 20v16M18 20v16M30 20v16M38 20v16M6 40h36"/></svg></span>
 <div class="pg-pusat-teks"><h3 id="pgPusatJ">${esc(TB("pusat_judul"))}</h3><p>${esc(TB("pusat_isi"))}</p></div>
 <div class="pg-pusat-pilih"><a data-tautan="wbs" href="${escH(tautanResmi("wbs"))}" target="_blank" rel="noopener"><b>Saya pegawai BMKG</b><small>WBS BMKG pusat (masuk dengan NIP) ↗</small></a><a data-tautan="lapor" href="${escH(tautanResmi("lapor"))}" target="_blank" rel="noopener"><b>Saya masyarakat umum</b><small>SP4N-LAPOR! BMKG, pilih opsi Rahasia ↗</small></a></div></section>`}
function pgCek(){const c=PGN.cek||{};return `<div class="pg-cek"><form class="card pg-form" id="pgCek"><h3>Cek status laporan</h3><label>Nomor tiket<input name="tiket" required placeholder="AD-2611-0001 atau WB-2611-0001" value="${esc(c.q||"")}" autocomplete="off"></label>
 <label class="pg-pin"${/^WB/i.test(c.q||"")?"":" hidden"}>PIN 6 angka <small>(khusus laporan Whistle Blowing)</small><input name="pin" inputmode="numeric" maxlength="6" autocomplete="off"></label>
 <p class="pd-galat" role="alert">${esc(PGN.galat)}</p><button class="pbtn" type="submit">Cek status</button></form>
 <div id="pgCekHasil">${c.html||'<div class="card pg-sisi"><p>Masukkan nomor tiket yang Anda terima saat mengirim laporan.</p></div>'}</div></div>`}
function pgHasilHTML(h,wbs,balasan){const st=wbs?WBS_ST:ADUAN_ST,sel=h.status==="selesai";return `<div class="card pg-hasil${sel?" pg-hasil-selesai":""}"><div class="pg-hasil-h"><div><small>Nomor tiket</small><b>${esc(h.tiket)}</b></div><span class="pg-hasil-st ${sel?"ok":h.status==="tidak"?"bad":"info"}">${sel?'<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path class="pg-centang" d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>':""}${esc(st[h.status]||h.status)}</span></div><small>Dikirim ${esc(pdJam(h.waktu))}</small>
 ${wbs?`<ol class="pd-riwayat">${(h.riwayat||[]).slice().reverse().map(x=>`<li><b>${esc(WBS_ST[x.s]||x.s)}</b> <time>${esc(pdJam(x.t))}</time></li>`).join("")}</ol>`:""}
 ${balasan?`<div class="pg-tanggapan"><span class="pg-tanggapan-ikon" aria-hidden="true">💬</span><div><b>Tanggapan petugas</b><p>${esc(balasan)}</p></div></div>`:`<p class="pg-kecil">${h.status==="selesai"?"Laporan sudah selesai ditangani.":"Belum ada tanggapan tertulis. Kami tindak lanjuti secepatnya pada hari kerja."}</p>`}</div>`}
/* status formulir tanpa menggambar ulang, supaya isian pelapor tidak hilang */
function pgTanda(f,galat,kolom){const g=f.querySelector(".pd-galat");if(g)g.textContent=galat||"";f.querySelectorAll("[aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));f.querySelectorAll(".pg-salah").forEach(x=>x.classList.remove("pg-salah"));
 if(kolom){const el=f.querySelector(`[name=${kolom}]`);if(el){el.setAttribute("aria-invalid","true");const w=el.closest("label")||el;w.classList.add("pg-salah");w.scrollIntoView({block:"center",behavior:"smooth"});setTimeout(()=>el.focus({preventScroll:true}),250)}}}
function pgSibuk(f,ya,teks){const b=f.querySelector('button[type="submit"]');if(!b)return;if(ya){b.dataset.asli=b.dataset.asli||b.textContent;b.textContent=teks;b.disabled=true}else{b.textContent=b.dataset.asli||b.textContent;b.disabled=false}PGN.kirim=ya}
async function pgKirimAduan(f){const isi=f.isi.value.trim();if(isi.length<10){pgTanda(f,"Ceritakan apa yang terjadi, minimal 10 huruf.","isi");return}
 pgTanda(f,"");pgSibuk(f,true,"Mengirim…");const data={jenis:(f.querySelector("[name=jenis]:checked")||{}).value,isi,kontak:f.kontak.value.trim(),halaman:"pengaduan",situs:f.situs.value,lama:Date.now()-PGN.t0};
 try{const j=await pgJSON("/masukan",data);PGN.aduan=j.tiket;try{localStorage.setItem("tiket_aduan",j.tiket)}catch(e){}pgSibuk(f,false);pgGambar()}catch(er){pgSibuk(f,false);pgTanda(f,er.message)}}
async function pgKirimWbs(f){const v=n=>(f[n]&&f[n].value||"").trim();
 const salah=[[!v("jenis"),"Pilih jenis dugaan pelanggaran.","jenis"],[v("apa").length<20,"Uraikan apa yang terjadi, minimal 20 huruf.","apa"],[v("siapa").length<2,"Sebutkan siapa yang diduga terlibat.","siapa"],[!f.setuju.checked,"Centang pernyataan di bawah ini dulu. Isian Anda tetap tersimpan.","setuju"]].find(x=>x[0]);
 if(salah){pgTanda(f,salah[1],salah[2]);return}
 if(!(window.crypto&&crypto.subtle)){pgTanda(f,"Peramban ini tidak mendukung penguncian laporan. Gunakan Chrome, Firefox, atau Safari versi terbaru.");return}
 const isi={jenis:v("jenis"),jenis_nama:(WBS_JENIS.find(x=>x[0]===v("jenis"))||[])[1]||"",apa:v("apa"),siapa:v("siapa"),dimana:v("dimana"),kapan:v("kapan"),bukti:v("bukti"),kontak:v("kontak")};
 pgTanda(f,"");pgSibuk(f,true,"Mengunci dan mengirim…");
 try{const kk=await pgJSON("/layanan/wbs-kunci");if(!kk.ada)throw new Error("Kotak laporan belum disiapkan petugas. Sementara gunakan saluran cadangan di bawah.");
  const pub=await crypto.subtle.importKey("jwk",kk.pub,{name:"RSA-OAEP",hash:"SHA-256"},false,["encrypt"]);
  const pin=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,"0"),salt_k=wAcak(16),kb=await wPbkdf2(pin,salt_k,PIN_ITER);
  const aes=crypto.getRandomValues(new Uint8Array(32)),enc=await wAesEnc(aes,{...isi,k:wb64(kb),dikirim:new Date().toISOString()}),ek=wb64(await crypto.subtle.encrypt({name:"RSA-OAEP"},pub,aes));
  const j=await pgJSON("/layanan/wbs-lapor",{paket:{ek,iv:enc.iv,ct:enc.ct},salt_k,pin});PGN.wbs={tiket:j.tiket,pin};pgSibuk(f,false);pgGambar()}
 catch(er){pgSibuk(f,false);pgTanda(f,er.message)}}
/* bukti laporan (gambar) berisi tiket + PIN */
function pgBukti(){const w=PGN.wbs;if(!w)return;const c=document.createElement("canvas");c.width=900;c.height=520;const x=c.getContext("2d");
 const gr=x.createLinearGradient(0,0,900,0);gr.addColorStop(0,"#b91c1c");gr.addColorStop(1,"#f97316");x.fillStyle=gr;x.fillRect(0,0,900,120);x.fillStyle="#fff";x.fillRect(0,120,900,400);
 x.fillStyle="#fff";x.font="700 30px system-ui,sans-serif";x.fillText("Bukti Laporan Whistle Blowing",40,58);x.font="20px system-ui,sans-serif";x.fillText("Stasiun Klimatologi Papua Barat",40,92);
 x.fillStyle="#475569";x.font="20px system-ui,sans-serif";x.fillText("Nomor tiket",40,180);x.fillText("PIN",480,180);x.fillStyle="#0f172a";x.font="700 48px system-ui,sans-serif";x.fillText(w.tiket,40,236);x.fillText(w.pin,480,236);
 x.fillStyle="#334155";x.font="18px system-ui,sans-serif";["Pantau status dan tanggapan di "+location.host+"/pengaduan › Cek status.","Simpan gambar ini di tempat aman dan jangan dibagikan.","PIN tidak bisa dikirim ulang karena identitas Anda tidak kami simpan.","Dikirim "+new Date().toLocaleString("id-ID")].forEach((l,i)=>x.fillText(l,40,320+i*36));
 const a=document.createElement("a");a.download="bukti-"+w.tiket+".png";a.href=c.toDataURL("image/png");document.body.append(a);a.click();a.remove()}
async function pgCekStatus(f){const q=f.tiket.value.trim().toUpperCase();PGN.cek={q};PGN.galat="";
 const kotak=document.getElementById("pgCekHasil");if(kotak)kotak.innerHTML='<div class="card pg-sisi"><p>Mencari…</p></div>';
 try{if(/^WB/.test(q)){const pin=(f.pin&&f.pin.value||"").trim();if(!/^\d{6}$/.test(pin))throw new Error("Masukkan PIN 6 angka yang Anda terima saat melapor.");
   const j=await pgJSON("/layanan/wbs-status",{tiket:q,pin}),h=j.hasil;let bl="";if(h.balasan){try{bl=(await wAesDec(await wPbkdf2(pin,h.salt_k,PIN_ITER),h.balasan)).teks||""}catch(e){bl="(tanggapan tidak bisa dibuka)"}}
   PGN.cek.html=pgHasilHTML(h,true,bl)}
  else{const j=await pgJSON("/layanan/aduan-status?t="+encodeURIComponent(q));if(!j.hasil)throw new Error(j.pesan||"Tiket tidak ditemukan.");PGN.cek.html=pgHasilHTML(j.hasil,false,j.hasil.balasan)}}
 catch(er){PGN.galat=er.message;PGN.cek.html=""}pgGambar()}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-pg-tab],[data-pg-baru],[data-pg-salin],[data-pg-bukti]");if(!t)return;
 if(t.hasAttribute("data-pg-bukti")){pgBukti();return}
 if(t.dataset.pgTab){e.preventDefault();PGN.tab=t.dataset.pgTab;PGN.galat="";if(cur!=="pengaduan"){location.hash="#pengaduan";return}pgGambar();return}
 if(t.hasAttribute("data-pg-baru")){PGN.aduan=null;PGN.wbs=null;PGN.t0=Date.now();pgGambar();return}
 if(t.dataset.pgSalin){try{navigator.clipboard.writeText(t.dataset.pgSalin);t.textContent="Tersalin ✓"}catch(er){}}});
document.addEventListener("submit",e=>{const f=e.target;if(!["pgAduan","pgWbs","pgCek"].includes(f.id))return;e.preventDefault();if(PGN.kirim)return;
 if(f.id==="pgAduan")pgKirimAduan(f);else if(f.id==="pgWbs")pgKirimWbs(f);else pgCekStatus(f)});
document.addEventListener("input",e=>{if(e.target.getAttribute&&e.target.getAttribute("aria-invalid")){e.target.removeAttribute("aria-invalid");const w=e.target.closest(".pg-salah");if(w)w.classList.remove("pg-salah");const g=e.target.form&&e.target.form.querySelector(".pd-galat");if(g&&/^(Pilih|Uraikan|Sebutkan|Centang|Ceritakan)/.test(g.textContent))g.textContent=""}});
document.addEventListener("change",e=>{if(e.target.name==="setuju"&&e.target.checked){e.target.removeAttribute("aria-invalid");const w=e.target.closest(".pg-salah");if(w)w.classList.remove("pg-salah")}});
document.addEventListener("input",e=>{const f=e.target.form;if(f&&f.id==="pgCek"&&e.target.name==="tiket"){const p=f.querySelector(".pg-pin");if(p)p.hidden=!/^WB/i.test(e.target.value.trim())}});

/* --- Admin: Kotak WBS --- */
let WBA={pulih:false,kodeBaru:"",verif:"",priv:null,pub:null,laporan:[],log:[],buka:"",hapus:"",email:"",t:0};
function wbaKunci(){WBA.verif="";WBA.priv=null;WBA.privX=null;WBA.kodeBaru="";WBA.laporan=[];WBA.log=[];WBA.buka="";WBA.hapus=""}
/* catatan internal dikunci dengan kunci publik kotak (hanya pemegang kata sandi WBS yang bisa membuka) */
async function wbaKunciPub(){if(!WBA.pub){const k=await pgJSON("/layanan/wbs-kunci");WBA.pub=await crypto.subtle.importKey("jwk",k.pub,{name:"RSA-OAEP",hash:"SHA-256"},false,["encrypt"])}return WBA.pub}
async function wbaSegel(obj){const aes=crypto.getRandomValues(new Uint8Array(32)),e=await wAesEnc(aes,obj);return {ek:wb64(await crypto.subtle.encrypt({name:"RSA-OAEP"},await wbaKunciPub(),aes)),iv:e.iv,ct:e.ct}}
async function wbaBukaSegel(p){return wAesDec(await crypto.subtle.decrypt({name:"RSA-OAEP"},WBA.priv,wunb64(p.ek)),p)}
function admWbs(){return `<div id="wbaIsi"><p class="admnote">Memuat…</p></div>`}
async function isiAdmWbs(){try{WBA.info=await admJSON("/admin/wbs/info",{})}catch(e){WBA.info={galat:e.message}}wbaGambar()}
function wbaGambar(){const el=document.getElementById("wbaIsi");if(!el)return;const I=WBA.info||{};
 if(I.galat){el.innerHTML=`<p class="admnote">Belum bisa memuat Kotak WBS: ${escH(I.galat)}. Pastikan robot staklim-admin sudah diperbarui.</p>`;return}
 if(WBA.priv&&Date.now()-WBA.t>15*60e3)wbaKunci();
 if(!I.ada){el.innerHTML=`<div class="wba-info"><h3>Siapkan Kotak WBS</h3><p>Laporan Whistle Blowing dikunci di perangkat pelapor. Hanya pemegang <b>kata sandi WBS</b> yang bisa membacanya, termasuk petugas Admin lain dan pengelola web tidak bisa.</p>
  <ul><li>Penyiapan dilakukan <b>sekali</b> oleh penerima laporan yang ditunjuk pimpinan (mis. kepala stasiun atau ketua tim Zona Integritas).</li><li>Kata sandi WBS <b>berbeda</b> dari kata sandi Admin dan <b>tidak disimpan di mana pun</b>. Bila lupa, laporan lama tidak bisa dibuka lagi.</li><li>Mengganti kotak hanya bisa lewat Cloudflare (hapus kunci KV <code>wbs:kunci</code>), supaya tidak bisa diambil alih dari Admin.</li></ul></div>
  <form id="wbaSiapkan" class="admgrid"><label>Kata sandi WBS (min. 10 karakter)<input type="password" name="p1" autocomplete="new-password" minlength="10" required></label><label>Ulangi kata sandi<input type="password" name="p2" autocomplete="new-password" required></label><label>Email penerima pemberitahuan <small>(opsional; hanya berisi nomor tiket)</small><input type="email" name="email" placeholder="penerima@bmkg.go.id"></label><div><button class="pbtn" type="submit">Siapkan Kotak WBS</button></div></form>`;return}
 if(!WBA.priv){el.innerHTML=`<div class="wba-info"><h3>🔒 Kotak WBS terkunci</h3><p>Ada <b>${I.jumlah||0}</b> laporan${I.baru?`, <b>${I.baru} belum ditelaah</b>`:""}. Masukkan kata sandi WBS untuk membuka. Isi laporan hanya dibuka di perangkat ini dan terkunci lagi otomatis setelah 15 menit.</p></div><form id="wbaBuka" class="admgrid"><label>Kata sandi WBS<input type="password" name="p" autocomplete="current-password" required></label><div><button class="pbtn" type="submit">Buka kotak</button></div></form>
 <p class="admnote"><button type="button" class="mini" data-wba-pulih>${WBA.pulih?"Batal":"Lupa kata sandi? Pakai kode pemulihan"}</button>${I.rec?"":" Kode pemulihan belum dibuat: buka kotak dengan kata sandi lalu buat kode pemulihan."}</p>
 ${WBA.pulih?`<form id="wbaPulih" class="admgrid"><p class="admnote">Masukkan kode pemulihan yang dikirim ke email penerima laporan, lalu buat kata sandi baru. Semua laporan tetap bisa dibuka.</p><label>Kode pemulihan<input name="kode" autocomplete="off" placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" required></label><label>Kata sandi baru (min. 10 karakter)<input type="password" name="p1" autocomplete="new-password" required></label><label>Ulangi kata sandi baru<input type="password" name="p2" autocomplete="new-password" required></label><div><button class="pbtn" type="submit">Atur ulang kata sandi</button></div></form>`:""}`;return}
 el.innerHTML=`<div class="wba-atas"><p class="admnote">Kotak terbuka di perangkat ini. <button type="button" class="mini" id="wbaTutup">🔒 Kunci kembali</button></p></div>
 ${WBA.kodeBaru?`<div class="wba-kode" role="alert"><b>Kode pemulihan baru:</b> <code>${escH(WBA.kodeBaru)}</code><br>Kode ini juga dikirim ke email penerima. Simpan di tempat aman (mis. cetak dan simpan di lemari terkunci). Kode lama tidak berlaku lagi. <button type="button" class="mini" data-wba-kodetutup>Sudah saya simpan</button></div>`:""}
 <details class="wba-atur"${(!I.rec||!I.email_ok)?" open":""}><summary>⚙️ Pengaturan kotak: email, kata sandi, kode pemulihan${(!I.rec||!I.email_ok)?' <span class="merah">(perlu dilengkapi)</span>':""}</summary>
  <form id="wbaEmail" class="wba-email"><label>Email pemilik (penerima utama) <small>${I.email_ok?`terkonfirmasi: <b>${escH(I.email_ok)}</b>`:"belum ada email terkonfirmasi"}${I.email_tunggu?` · menunggu konfirmasi: <b>${escH(I.email_tunggu)}</b>`:""}</small><input type="email" name="email" value="${escH(I.email_tunggu||I.email_ok||"")}" required></label><button type="submit" class="mini">${I.email_ok?"Ganti email pemilik":I.email_tunggu?"Kirim ulang tautan konfirmasi":"Kirim tautan konfirmasi"}</button></form>${I.email_tunggu?'<p class="admnote">Tautan konfirmasi berlaku 3 hari. Bila emailnya tidak ada di Kotak Masuk, periksa folder Spam.</p>':""}
  <p class="admnote">Email pemilik tidak bisa dihapus. Menggantinya harus disetujui lewat tautan yang dikirim ke email pemilik saat ini${I.ganti_tunggu?`; <b>menunggu persetujuan pemilik</b> untuk ganti ke ${escH(I.ganti_tunggu)}`:""}. Semua pengaturan di sini hanya bisa diubah pemegang kata sandi WBS.</p>
  <div class="wba-pen"><b>Penerima tambahan</b> <small>(maks. 4, ikut menerima pemberitahuan laporan baru)</small>
   ${(I.penerima||[]).map(x=>`<div class="wba-pen-baris"><span>${escH(x.email)} · ${x.ok?"terkonfirmasi":'<span class="merah">menunggu konfirmasi</span>'}</span>${x.ok?"":` <button type="button" class="mini" data-wba-pen="ulang" data-email="${escH(x.email)}">Kirim ulang</button>`} <button type="button" class="mini" data-wba-pen="hapus" data-email="${escH(x.email)}">Hapus</button></div>`).join("")||'<p class="admnote">Belum ada.</p>'}
   ${(I.penerima||[]).length<4?`<form id="wbaPenerima" class="wba-email"><label>Tambah penerima<input type="email" name="email" required placeholder="nama@contoh.go.id"></label><button type="submit" class="mini">Tambah &amp; kirim konfirmasi</button></form>`:""}</div>
  <form id="wbaPulihEmail" class="wba-email"><label>Email kode pemulihan <small>${I.pulih_ok?`sekarang: <b>${escH(I.pulih_ok)}</b>`:"belum ada (memakai email pemilik setelah dikonfirmasi)"}${I.pulih_tunggu?` · menunggu konfirmasi: <b>${escH(I.pulih_tunggu)}</b>`:""}</small><input type="email" name="email" required value="${escH(I.pulih_tunggu||"")}" placeholder="alamat yang ditunjuk"></label><button type="submit" class="mini">Ganti email kode pemulihan</button></form>
  <p class="admnote">Kode pemulihan dapat membuka semua laporan bila kata sandi WBS lupa. Kode selalu dikirim ke email pemilik, dan juga ke email kode pemulihan bila ditunjuk alamat lain. Membuat ulang kode membuat kode lama tidak berlaku.</p>
  <div class="wba-pemulihan"><b>Kode pemulihan</b> <small>(dikirim ke ${escH([...new Set([I.email_ok,I.pulih_ok].filter(Boolean))].join(" dan ")||"email pemilik")})</small>: ${I.rec?"sudah ada"+(I.rec_t?" (dibuat "+escH(tglPendek(String(I.rec_t).slice(0,10)))+")":""):'<span class="merah">belum ada</span>'} <button type="button" class="mini" data-wba-kode${I.pulih_ok?"":" disabled"}>${I.rec?"Buat ulang":"Buat"} &amp; kirim ke email</button>${I.pulih_ok?"":" <small>(konfirmasi email dulu)</small>"}</div>
  <form id="wbaGanti" class="admgrid"><b>Ganti kata sandi WBS</b><label>Kata sandi lama<input type="password" name="p0" autocomplete="current-password" required></label><label>Kata sandi baru (min. 10 karakter)<input type="password" name="p1" autocomplete="new-password" required></label><label>Ulangi kata sandi baru<input type="password" name="p2" autocomplete="new-password" required></label><div><button class="mini" type="submit">Ganti kata sandi</button></div></form></details>
 ${WBA.laporan.length?WBA.laporan.map(L=>{const x=L.isi||{},b=WBA.buka===L.tiket;return `<div class="wba-lap${b?" buka":""}"><button type="button" class="wba-kepala" data-wba="${escH(L.tiket)}"><b>${escH(L.tiket)}</b><span>${escH(x.jenis_nama||"(tidak terbaca)")}</span><span class="pd-pill ${L.status==="diterima"?"warn":L.status==="selesai"?"ok":"info"}">${escH(WBS_ST[L.status]||L.status)}</span><small>${escH(pdJam(L.waktu))}</small></button>
  ${b?`<div class="wba-rinci"><dl class="kv"><dt>Apa</dt><dd>${escH(x.apa||"–")}</dd><dt>Siapa</dt><dd>${escH(x.siapa||"–")}</dd><dt>Di mana</dt><dd>${escH(x.dimana||"–")}</dd><dt>Kapan</dt><dd>${escH(x.kapan||"–")}</dd><dt>Bukti</dt><dd>${escH(x.bukti||"–")}</dd><dt>Kontak</dt><dd>${escH(x.kontak||"anonim")}</dd></dl>
  ${L.balasanTeks?`<p class="admnote">Tanggapan terakhir: ${escH(L.balasanTeks)}</p>`:""}
  ${L.intern?`<div class="wba-intern"><b>Penanganan internal</b>${L.intern.tgl?`<br>Tanggal penanganan: ${escH(tglPendek(L.intern.tgl))}`:""}${L.intern.sanksi?`<br>Tindak lanjut / sanksi: ${escH(L.intern.sanksi)}`:""}</div>`:""}
  <form class="wba-ubah admgrid" data-tiket="${escH(L.tiket)}"><label>Status<select name="status">${Object.entries(WBS_ST).map(([k,n])=>`<option value="${k}"${L.status===k?" selected":""}>${n}</option>`).join("")}</select></label><label>Tanggapan untuk pelapor <small>(dikunci; hanya terbaca dengan tiket + PIN pelapor)</small><textarea name="balasan" rows="3" maxlength="1500"></textarea></label>
  <fieldset class="wba-intern-f"><legend>Penanganan internal <small>(dikunci; hanya terbaca pemegang kata sandi WBS, tidak terlihat pelapor)</small></legend><label>Tanggal penanganan<input type="date" name="tgl" value="${escH((L.intern||{}).tgl||"")}"></label><label>Tindak lanjut / sanksi yang diberikan<textarea name="sanksi" rows="2" maxlength="1500" placeholder="mis. teguran lisan oleh kepala stasiun, dilaporkan ke Inspektorat">${escH((L.intern||{}).sanksi||"")}</textarea></label></fieldset>
  <div class="wba-tombol"><button class="pbtn" type="submit">Simpan</button><button type="button" class="mini merah" data-wba-hapus="${escH(L.tiket)}">Hapus laporan…</button></div></form>
  ${WBA.hapus===L.tiket?`<form class="wba-hapus admgrid" data-tiket="${escH(L.tiket)}"><p class="admnote merah">Laporan ${escH(L.tiket)} akan dihapus permanen. Isi laporan tidak bisa dikembalikan; yang tersisa hanya catatan nomor tiket dan tanggal hapus. Ketik ulang kata sandi WBS untuk memastikan.</p><label>Kata sandi WBS<input type="password" name="p" autocomplete="current-password" required></label><div><button class="pbtn merah" type="submit">Hapus permanen</button> <button type="button" class="mini" data-wba-batal>Batal</button></div></form>`:""}</div>`:""}</div>`}).join(""):`<p class="empty">Belum ada laporan.</p>`}
 ${(WBA.log||[]).length?`<details class="wba-log"><summary>Riwayat penghapusan (${WBA.log.length})</summary><ul>${WBA.log.map(x=>`<li>${escH(x.tiket)} · dikirim ${escH(pdJam(x.waktu))} · dihapus ${escH(pdJam(x.dihapus))}</li>`).join("")}</ul></details>`:""}`}
const WBS_HURUF="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function wbaBuatKode(){const a=crypto.getRandomValues(new Uint8Array(24));return [...a].map(x=>WBS_HURUF[x%32]).join("").match(/.{4}/g).join("-")}
const wbaNormKode=k=>String(k||"").toUpperCase().replace(/[^A-Z0-9]/g,"").match(/.{1,4}/g)?.join("-")||"";
async function wbaKemasKunci(p,pk8){const salt_p=wAcak(16),salt_v=wAcak(16);return {priv:{salt:salt_p,...(await wAesEnc(await wPbkdf2(p,salt_p,WBS_ITER),{k:wb64(pk8)}))},salt_v,verif_baru:wb64(await wPbkdf2(p,salt_v,WBS_ITER))}}
async function wbaKemasPulih(kode,pk8){const salt_r=wAcak(16),salt_rv=wAcak(16);return {priv_r:{salt:salt_r,...(await wAesEnc(await wPbkdf2(kode,salt_r,WBS_ITER),{k:wb64(pk8)}))},salt_rv,rverif:wb64(await wPbkdf2(kode,salt_rv,WBS_ITER))}}
async function wbaVerif(p){const g=await admJSON("/admin/wbs/garam",{});return wb64(await wPbkdf2(p,g.salt_v,WBS_ITER))}
async function wbaMuat(){const j=await admJSON("/admin/wbs/buka",{verif:WBA.verif});WBA.email=j.email||"";WBA.log=j.log||[];const L=[];
 for(const r of j.laporan){const o={...r};try{const aes=await crypto.subtle.decrypt({name:"RSA-OAEP"},WBA.priv,wunb64(r.paket.ek));o.isi=await wAesDec(aes,r.paket);if(r.balasan&&o.isi.k)o.balasanTeks=(await wAesDec(wunb64(o.isi.k),r.balasan)).teks||"";if(r.catatan&&r.catatan.ek)o.intern=await wbaBukaSegel(r.catatan).catch(()=>null)}catch(e){o.isi=null}L.push(o)}
 WBA.laporan=L;WBA.t=Date.now()}
document.addEventListener("submit",async e=>{const f=e.target;if(!f.closest||!f.closest("#wbaIsi"))return;e.preventDefault();const btn=f.querySelector('button[type="submit"]');if(btn)btn.disabled=true;
 try{if(f.id==="wbaSiapkan"){const p=f.p1.value;if(p.length<10)throw new Error("Kata sandi WBS minimal 10 karakter.");if(p!==f.p2.value)throw new Error("Kedua kata sandi tidak sama.");pesan("Membuat kunci Kotak WBS…");
   const kp=await crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:3072,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},true,["encrypt","decrypt"]);
   const pub=await crypto.subtle.exportKey("jwk",kp.publicKey),pk8=await crypto.subtle.exportKey("pkcs8",kp.privateKey),salt_p=wAcak(16),salt_v=wAcak(16);
   const priv={salt:salt_p,...(await wAesEnc(await wPbkdf2(p,salt_p,WBS_ITER),{k:wb64(pk8)}))},verif=wb64(await wPbkdf2(p,salt_v,WBS_ITER));
   const kode=wbaBuatKode(),kr=await wbaKemasPulih(kode,pk8);
   await admJSON("/admin/wbs/siapkan",{pub:{kty:pub.kty,n:pub.n,e:pub.e,alg:pub.alg,ext:true},priv,verif,salt_v,email:f.email.value.trim(),...kr});await isiAdmWbs();
   const el=document.getElementById("wbaIsi");if(el)el.insertAdjacentHTML("afterbegin",`<div class="wba-kode" role="alert"><b>Kode pemulihan:</b> <code>${escH(kode)}</code><br>Catat dan simpan kode ini di tempat aman. Kode ini satu-satunya cara membuka kotak bila kata sandi WBS lupa. ${f.email.value.trim()?"Tautan konfirmasi juga dikirim ke email penerima; setelah dikonfirmasi, kode pemulihan baru bisa dikirim ke email itu.":""}</div>`);
   pesan("Kotak WBS siap. Simpan kata sandi dan kode pemulihan di tempat aman.")}
  else if(f.id==="wbaBuka"){const p=f.p.value;pesan("Membuka Kotak WBS…");const verif=await wbaVerif(p);const j=await admJSON("/admin/wbs/buka",{verif});
   const raw=await wAesDec(await wPbkdf2(p,j.priv.salt,WBS_ITER),j.priv).catch(()=>null);if(!raw)throw new Error("Kunci tidak bisa dibuka dengan kata sandi ini.");
   WBA.priv=await crypto.subtle.importKey("pkcs8",wunb64(raw.k),{name:"RSA-OAEP",hash:"SHA-256"},false,["decrypt"]);WBA.privX=await crypto.subtle.importKey("pkcs8",wunb64(raw.k),{name:"RSA-OAEP",hash:"SHA-256"},true,["decrypt"]);WBA.verif=verif;await wbaMuat();WBA.info=await admJSON("/admin/wbs/info",{}).catch(()=>WBA.info);wbaGambar();pesan("Kotak WBS terbuka.")}
  else if(f.classList.contains("wba-hapus")){const t=f.dataset.tiket,verif=await wbaVerif(f.p.value);if(verif!==WBA.verif)throw new Error("Kata sandi WBS salah. Laporan tidak dihapus.");
   await admJSON("/admin/wbs/hapus",{verif,tiket:t});WBA.hapus="";WBA.buka="";await wbaMuat();wbaGambar();WBA.info=await admJSON("/admin/wbs/info",{}).catch(()=>WBA.info);pesan(`Laporan ${t} dihapus. Catatan penghapusan tersimpan.`)}
  else if(f.id==="wbaEmail"){const j=await admJSON("/admin/wbs/email",{verif:WBA.verif,email:f.email.value.trim()});WBA.info=await admJSON("/admin/wbs/info",{});wbaGambar();pesan(j.setuju_ke?`Permintaan dikirim ke email pemilik (${j.setuju_ke}). Email pemilik berganti setelah disetujui di sana, lalu alamat baru mengonfirmasi.`:`Tautan konfirmasi dikirim ke ${j.tunggu}. Email aktif setelah tautan diklik (periksa juga folder Spam).`)}
  else if(f.id==="wbaPenerima"){await admJSON("/admin/wbs/penerima",{verif:WBA.verif,aksi:"tambah",email:f.email.value.trim()});WBA.info=await admJSON("/admin/wbs/info",{});wbaGambar();pesan("Tautan konfirmasi dikirim. Penerima aktif setelah tautan di emailnya diklik.")}
  else if(f.id==="wbaPulihEmail"){const j=await admJSON("/admin/wbs/pulih-email",{verif:WBA.verif,email:f.email.value.trim()});WBA.info=await admJSON("/admin/wbs/info",{});wbaGambar();pesan(`Tautan konfirmasi dikirim ke ${j.tunggu}. Setelah diklik, buat ulang kode pemulihan supaya terkirim ke alamat itu.`)}
  else if(f.id==="wbaGanti"){const p=f.p1.value;if(p.length<10)throw new Error("Kata sandi baru minimal 10 karakter.");if(p!==f.p2.value)throw new Error("Kedua kata sandi baru tidak sama.");
   if(await wbaVerif(f.p0.value)!==WBA.verif)throw new Error("Kata sandi lama salah.");pesan("Mengganti kata sandi…");
   const pk8=await crypto.subtle.exportKey("pkcs8",WBA.privX),k=await wbaKemasKunci(p,pk8);await admJSON("/admin/wbs/ganti-sandi",{verif:WBA.verif,...k});WBA.verif=k.verif_baru;f.reset();pesan("Kata sandi WBS diganti. Pemberitahuan dikirim ke email penerima.")}
  else if(f.id==="wbaPulih"){const p=f.p1.value,kode=wbaNormKode(f.kode.value);if(p.length<10)throw new Error("Kata sandi baru minimal 10 karakter.");if(p!==f.p2.value)throw new Error("Kedua kata sandi baru tidak sama.");pesan("Memeriksa kode pemulihan…");
   const d=await admJSON("/admin/wbs/pulih-data",{});const raw=await wAesDec(await wPbkdf2(kode,d.priv_r.salt,WBS_ITER),d.priv_r).catch(()=>null);if(!raw)throw new Error("Kode pemulihan salah.");
   const rverif=wb64(await wPbkdf2(kode,d.salt_rv,WBS_ITER)),k=await wbaKemasKunci(p,wunb64(raw.k));await admJSON("/admin/wbs/pulihkan",{rverif,...k});WBA.pulih=false;WBA.info=await admJSON("/admin/wbs/info",{});wbaGambar();pesan("Kata sandi WBS diatur ulang. Silakan buka kotak dengan kata sandi baru, lalu buat kode pemulihan baru.")}
  else if(f.classList.contains("wba-ubah")){const t=f.dataset.tiket,L=WBA.laporan.find(x=>x.tiket===t)||{},teks=f.balasan.value.trim(),d={verif:WBA.verif,tiket:t,status:f.status.value};
   if(["selesai","tidak"].includes(d.status)&&d.status!==L.status&&!teks&&!L.balasanTeks){f.balasan.focus();throw new Error("Tulis tanggapan untuk pelapor dulu sebelum menyelesaikan atau menolak laporan.")}
   if(teks){if(!L.isi||!L.isi.k)throw new Error("Laporan ini tidak bisa dibalas.");d.balasan=await wAesEnc(wunb64(L.isi.k),{teks})}
   const tgl=f.tgl.value,sanksi=f.sanksi.value.trim(),lama=L.intern||{};if(tgl!==(lama.tgl||"")||sanksi!==(lama.sanksi||""))d.catatan=await wbaSegel({tgl,sanksi});
   await admJSON("/admin/wbs/ubah",d);await wbaMuat();wbaGambar();WBA.info=await admJSON("/admin/wbs/info",{}).catch(()=>WBA.info);pesan(`${t} disimpan.${teks?" Tanggapan terkirim ke pelapor (terlihat lewat tiket + PIN).":""}`)}}
 catch(er){pesan(er.message,1)}if(btn&&btn.isConnected)btn.disabled=false});
document.addEventListener("click",async e=>{const t=e.target.closest&&e.target.closest("#wbaTutup,[data-wba],[data-wba-hapus],[data-wba-batal],[data-wba-pulih],[data-wba-kode],[data-wba-kodetutup],[data-wba-pen]");if(!t||!t.closest("#wbaIsi"))return;
 if(t.dataset.wbaPen){const a=t.dataset.wbaPen,em=t.dataset.email;if(a==="hapus"&&!t.dataset.yakin){t.dataset.yakin="1";t.textContent="Yakin hapus?";return}t.disabled=true;try{await admJSON("/admin/wbs/penerima",{verif:WBA.verif,aksi:a==="ulang"?"tambah":"hapus",email:em});WBA.info=await admJSON("/admin/wbs/info",{});wbaGambar();pesan(a==="ulang"?`Tautan konfirmasi dikirim ulang ke ${em}.`:`${em} dihapus dari penerima WBS. Pemilik diberi tahu lewat email dan bot.`)}catch(er){t.disabled=false;pesan(er.message,1)}return}
 if(t.hasAttribute("data-wba-pulih")){WBA.pulih=!WBA.pulih;wbaGambar();return}
 if(t.hasAttribute("data-wba-kodetutup")){WBA.kodeBaru="";wbaGambar();return}
 if(t.hasAttribute("data-wba-kode")){t.disabled=true;try{const kode=wbaBuatKode(),pk8=await crypto.subtle.exportKey("pkcs8",WBA.privX),k=await wbaKemasPulih(kode,pk8);await admJSON("/admin/wbs/kode-pulih",{verif:WBA.verif,...k,kode});WBA.kodeBaru=kode;WBA.info=await admJSON("/admin/wbs/info",{});WBA.t=Date.now();wbaGambar();pesan("Kode pemulihan baru dibuat dan dikirim ke email pemilik (dan email kode pemulihan bila berbeda). Kode lama tidak berlaku lagi.")}catch(er){t.disabled=false;pesan(er.message,1)}return}
 if(t.id==="wbaTutup"){wbaKunci();wbaGambar();return}
 if(t.dataset.wbaHapus){WBA.hapus=t.dataset.wbaHapus;WBA.t=Date.now();wbaGambar();return}
 if(t.hasAttribute("data-wba-batal")){WBA.hapus="";wbaGambar();return}WBA.buka=WBA.buka===t.dataset.wba?"":t.dataset.wba;WBA.t=Date.now();wbaGambar()});

/* peringatan merah di Admin bila ada laporan WBS baru */
let WBS_INFO=null;
function muatWbsInfo(){if(typeof ADM_PASS==="undefined"||!ADM_PASS)return;admJSON("/admin/wbs/info",{}).then(j=>{WBS_INFO=j;if(typeof segarIngat==="function")segarIngat()}).catch(()=>{})}
const SIRENE='<svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true"><g class="sirene-cahaya" stroke="#fde047" stroke-width="3" stroke-linecap="round"><path d="M24 3v6M9 9l4 4M39 9l-4 4M3 23h6M45 23h-6"/></g><path d="M12 36V26a12 12 0 0 1 24 0v10z" fill="#ef4444" stroke="#fff" stroke-width="2"/><path d="M18 26a6 6 0 0 1 6-6" stroke="#fecaca" stroke-width="3" stroke-linecap="round" fill="none"/><rect x="8" y="36" width="32" height="7" rx="2" fill="#1f2937"/></svg>';
function ingatWbs(){return ""}
function ingatWbsKotak(){if(!WBS_INFO||!WBS_INFO.baru)return "";return `<div class="wbs-alarm" role="alert"><span class="sirene kiri">${SIRENE}</span><div class="wbs-alarm-teks"><b>${WBS_INFO.baru} laporan Whistle Blowing baru</b> belum ditelaah. Segera buka dan tindak lanjuti.</div><button type="button" class="wbs-alarm-tbl" data-ke-tab="wbs">Buka Kotak WBS</button><span class="sirene kanan">${SIRENE}</span></div>`}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ke-tab]");if(b&&typeof admTampil==="function"){admTampil(b.dataset.keTab)}});

/* kotak "Ada keluhan atau pelanggaran?" di bawah kotak survei (bagian Kantor & Lokasi) */
function aduanMini(){return `<a class="aduanpanel" href="#pengaduan"><span class="aduan-ikon" aria-hidden="true">${PG_IKON.wbs}</span><span class="aduan-tanya"><b>Ada keluhan atau pelanggaran?</b><small>Sampaikan pengaduan layanan atau laporkan pelanggaran pegawai. Rahasia dan bertiket.</small></span><em>Laporkan <span aria-hidden="true">→</span></em></a>`}

/* ===== INFORMASI DASARIAN DARI PDF =====
   Petugas cukup mengunggah PDF "Informasi Iklim Dasarian" buatan kantor. Di browser Admin, setiap halaman dibaca teksnya
   lalu dijadikan gambar (peta tetap tajam, ukuran ringan untuk HP). Web menampilkan highlight, peta + uraian per bagian,
   dan tombol unduh PDF asli. Excel per kabupaten tetap bisa ditambahkan (untuk Info Wilayah Saya). */
let DAS_PDF=null;
const DAS_BAG=[["sampul",/highlight/i,"Highlight"],["pr",/prakiraan (ch|curah)/i,"Prakiraan Curah Hujan & Sifat Hujan"],["hth",/hari tanpa hujan|monitoring hth/i,"Monitoring Hari Tanpa Hujan"],["enso",/\benso\b/i,"Perkembangan ENSO"],["musim",/perkembangan musim/i,"Monitoring Perkembangan Musim"],["an",/analisis (ch|curah|sifat)/i,"Analisis Curah Hujan & Sifat Hujan"],["skip",/scan me|more info/i,""]];
const NM_BLN_DAS=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
/* gabung potongan teks satu baris: beri spasi hanya bila ada jarak nyata (PDF sering memotong kata, mis. "Huja" + "n") */
function dasGabung(it){let s="",prev=null;for(const i of it){if(prev){const jarak=i.x-(prev.x+prev.w),batas=Math.max(1.5,(prev.h||10)*0.18);if(!/\s$/.test(s)&&!/^\s/.test(i.s)&&(prev.w===0||jarak>batas))s+=" "}s+=i.s;prev=i}return s.replace(/\s+/g," ").trim()}
function dasBarisPdf(items){const B=[];items.slice().sort((a,b)=>b.y-a.y||a.x-b.x).forEach(i=>{const b=B.find(z=>Math.abs(z.y-i.y)<3.5);if(b)b.it.push(i);else B.push({y:i.y,it:[i]})});
 return B.map(b=>dasGabung(b.it.sort((a,c)=>a.x-c.x))).filter(Boolean)}
const dasBuang=l=>/staklim\.papuabarat@|^@?staklim_papbar|^\+?\d[\d\s-]{8,}$|^prov\.? papua barat (&|dan) papua barat daya$/i.test(l.trim());
function dasUraiHalaman(baris){const L=baris.filter(l=>!dasBuang(l)),semua=L.join(" ");
 const b=DAS_BAG.find(([,re])=>re.test(semua))||["lain",null,""];
 const panjang=L.findIndex(l=>l.length>=60),para=panjang<0?"":L.slice(panjang).join(" ").replace(/\s*staklim\.papuabarat@\S+.*$/i,"").replace(/\s+/g," ").trim();
 const pendek=(panjang<0?L:L.slice(0,panjang)).filter(l=>l.length<60);
 const sub=pendek.filter(l=>/\b20\d\d\b|dasarian|\(\d/i.test(l)&&!/^(analisis|prakiraan) (curah|sifat) hujan( analisis| prakiraan)?/i.test(l)).join(" ").replace(/\s+/g," ").trim();
 return {k:b[0],judul:b[2]||pendek[0]||"Informasi lain",sub,teks:para,semua}}
function dasPeriodeDari(teks){const m=String(teks).match(/dasarian\s+(III|II|I)\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(20\d\d)/i);
 return m?{das:m[1].toUpperCase(),bln:NM_BLN_DAS.indexOf(m[2].toLowerCase())+1,thn:+m[3]}:null}
async function dasDariPdf(file,lapor){const Lj=await muatPdfJs(),doc=await Lj.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise,hasil={hl:[],hal:[],rilis:"",catatan:[]};
 try{const n=Math.min(doc.numPages,14);
  for(let i=1;i<=n;i++){lapor(`Membaca halaman ${i} dari ${n}…`);const pg=await doc.getPage(i),tc=await pg.getTextContent();
   const it=tc.items.filter(x=>x.str&&x.str.trim()).map(x=>({s:x.str,x:x.transform[4],y:x.transform[5],w:x.width||0,h:Math.abs(x.transform[3])||Math.abs(x.transform[0])||10})),h=dasUraiHalaman(dasBarisPdf(it));
   if(h.k==="skip")continue;
   if(i===1&&!hasil.rilis){const r=h.semua.match(/rilis\s*:?\s*(\d{1,2}\s+[a-z]+\s+20\d\d)/i);if(r)hasil.rilis=r[1]}
   if(h.k==="sampul"){const hl=h.semua.replace(/^[\s\S]*?highlight\s*/i,"").replace(/\s+/g," ").trim();hasil.hl=hl.split(/(?<=\.)\s+(?=[A-Z])/).map(x=>x.trim()).filter(x=>x.length>15).slice(0,6)}
   const v0=pg.getViewport({scale:1}),vp=pg.getViewport({scale:Math.min(3,1400/Math.max(v0.width,v0.height))}),c=document.createElement("canvas");c.width=Math.round(vp.width);c.height=Math.round(vp.height);
   const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);await pg.render({canvasContext:ctx,viewport:vp}).promise;
   const bl=await new Promise(ok=>c.toBlob(ok,"image/jpeg",.82));if(!bl){hasil.catatan.push(`Halaman ${i} gagal dijadikan gambar.`);continue}
   lapor(`Mengunggah gambar halaman ${i}…`);const u=await admUnggah(new File([bl],`dasarian-hal${i}.jpg`,{type:"image/jpeg"}));
   hasil.hal.push({k:h.k,judul:h.judul,sub:h.sub,teks:h.k==="sampul"?"":h.teks,file:u.kunci});
   if(h.k!=="sampul"&&!h.teks)hasil.catatan.push(`Uraian di halaman ${i} (${h.judul}) tidak terbaca.`)}
 }finally{try{doc.destroy()}catch(e){}}
 const sumberPer=hasil.hl.join(" ")+" "+hasil.hal.map(x=>x.sub+" "+x.teks).join(" ");hasil.per=dasPeriodeDari(hasil.hl.find(x=>/^analisis/i.test(x))||"")||dasPeriodeDari((hasil.hal.find(x=>x.k==="an")||{}).sub||"")||dasPeriodeDari(sumberPer);
 const pr=(hasil.hl.find(x=>/^prakiraan/i.test(x))||"").match(/(dasarian\s+(?:III|II|I)\s+[a-z]+(?:\s+20\d\d)?\s+(?:hingga|s\.?d\.?|sampai|-)\s+dasarian\s+(?:III|II|I)\s+[a-z]+\s+20\d\d)/i);hasil.pr_periode=pr?pr[1].replace(/\bdasarian\b/gi,"Dasarian").replace(/\s+/g," "):"";
 if(!hasil.per)hasil.catatan.push("Periode dasarian tidak terbaca dari PDF. Pilih periodenya secara manual.");
 if(!hasil.hl.length)hasil.catatan.push("Bagian HIGHLIGHT tidak ditemukan di halaman sampul.");
 ["an","pr"].forEach(k=>{if(!hasil.hal.some(x=>x.k===k))hasil.catatan.push(`Halaman ${k==="an"?"analisis":"prakiraan"} tidak dikenali. Periksa apakah format PDF berubah.`)});
 return hasil}
function pasangDasPdf(f,cekPer){const inp=document.getElementById("dasPdf"),ket=document.getElementById("dasPdfKet");if(!inp)return;
 inp.onchange=async e=>{const fl=e.target.files[0];if(!fl)return;if(!/\.pdf$/i.test(fl.name)){pesan("Pilih file PDF.",1);return}
  inp.disabled=true;const lapor=m=>{ket.textContent=m;pesan(m)};
  try{const h=await dasDariPdf(fl,lapor);lapor("Mengunggah PDF asli (untuk tombol unduh)…");const u=await admUnggah(fl);h.pdf={file:u.kunci,nama:fl.name.replace(/[<>"]/g,""),ukuran:fl.size};DAS_PDF=h;
   if(h.per){f.das_das.value=h.per.das;f.das_bln.value=h.per.bln;f.das_thn.value=h.per.thn;cekPer()}
   if(h.pr_periode&&!f.das_pr.value.trim())f.das_pr.value=h.pr_periode;
   const an=h.hal.find(x=>x.k==="an"),pr=h.hal.find(x=>x.k==="pr");if(an&&an.teks)f.das_an.value=an.teks.slice(0,1200);if(pr&&pr.teks)f.das_prt.value=pr.teks.slice(0,1200);
   ket.innerHTML=`Terbaca <b>${h.hal.length} halaman</b>${h.per?`, periode <b>${esc(dasJudul(h.per))}</b>`:""}${h.rilis?`, rilis ${esc(h.rilis)}`:""}. Periksa ringkasan di bawah, lalu tekan <b>Simpan</b>.${h.catatan.length?`<br>⚠ ${h.catatan.map(esc).join("<br>⚠ ")}`:""}`;
   if(h.catatan.length&&typeof catatDok==="function")catatDok("Informasi Dasarian (PDF): "+fl.name,h.catatan);pesan("PDF terbaca. Periksa isinya, lalu tekan Simpan.")}
  catch(er){ket.textContent="PDF tidak bisa dibaca: "+(er.message||er);pesan(ket.textContent,1);if(typeof catatDok==="function")catatDok("Informasi Dasarian (PDF): "+fl.name,"PDF tidak bisa dibaca otomatis ("+(er.message||er)+").")}
  inp.disabled=false;inp.value=""}}
/* tampilan publik bila edisi berasal dari PDF */
const dasSrc=x=>x.url||fileURL(x.file);
function dasPdfUnduh(x){return x&&x.pdf&&(x.pdf.file||x.pdf.url)?`<a class="pbtn" href="${x.pdf.url||fileURL(x.pdf.file)}" download="${esc(x.pdf.nama||"Informasi_Dasarian.pdf")}">Unduh PDF${x.pdf.ukuran?" · "+(x.pdf.ukuran/1048576).toFixed(1).replace(".",",")+" MB":""}</a>`:""}
/* ringkasan singkat dari highlight: tiga kartu + "apa artinya" dalam bahasa sehari-hari */
const DAS_KAT=/(sangat rendah|rendah|menengah|sangat tinggi|tinggi)(?:\s*[-–]\s*(sangat rendah|rendah|menengah|sangat tinggi|tinggi))?/i,DAS_SIFAT=/(bawah normal|atas normal|normal)(?:\s*(?:hingga|[-–]|dan)\s*(bawah normal|atas normal|normal))?/i,DAS_HTH=/(sangat pendek|pendek|menengah|sangat panjang|panjang|kekeringan ekstrem)["”“\s]*(?:hingga|[-–]|dan)\s*["“”]?(sangat pendek|pendek|menengah|sangat panjang|panjang|kekeringan ekstrem)/i;
const dasHurufBesar=s=>String(s||"").replace(/\b\w/g,c=>c.toUpperCase());
function dasRtg(m){return m?dasHurufBesar(m[1])+(m[2]&&m[2].toLowerCase()!==m[1].toLowerCase()?" – "+dasHurufBesar(m[2]):""):""}
function dasRingkas(t){const hl=t.hl||[],an=hl.find(x=>/^analisis/i.test(x))||t.an_teks||"",ht=hl.find(x=>/tanpa hujan/i.test(x))||"",pr=hl.find(x=>/^prakiraan/i.test(x))||t.pr_teks||"";
 const aK=an.match(DAS_KAT),aS=an.match(DAS_SIFAT),h=ht.match(DAS_HTH)||ht.match(/(sangat pendek|pendek|menengah|sangat panjang|panjang|kekeringan ekstrem)/i),pK=pr.match(DAS_KAT),pS=pr.match(DAS_SIFAT);
 if(!aK&&!pK&&!h)return "";
 const kering=/bawah normal/i.test(aS&&aS[0]||"")||/rendah/i.test(aK&&aK[0]||""),hthPanjang=/panjang|ekstrem/i.test(h&&h[0]||""),prBasah=/tinggi|atas normal/i.test((pK&&pK[0]||"")+" "+(pS&&pS[0]||"")),prKering=/rendah/i.test(pK&&pK[1]||"")&&/bawah normal/i.test(pS&&pS[0]||"");
 const arti=[kering?"Sepuluh hari terakhir lebih kering dari biasanya.":/atas normal/i.test(aS&&aS[0]||"")?"Sepuluh hari terakhir lebih basah dari biasanya.":"Hujan sepuluh hari terakhir mendekati biasanya.",
  hthPanjang?"Banyak tempat sudah lama tidak hujan: hemat air dan waspada kebakaran hutan dan lahan.":"Hujan masih turun cukup sering, belum ada ancaman kekeringan berarti.",
  prBasah?"Ke depan hujan diprediksi bertambah: bersihkan saluran air dan waspada genangan atau longsor di daerah rawan. Waktu yang baik untuk mulai menanam.":prKering?"Ke depan diprediksi tetap kering: simpan air dan sesuaikan jadwal tanam.":"Ke depan hujan diprediksi seperti biasanya. Petani dapat menyesuaikan jadwal tanam dengan pola hujan setempat."];
 const kartu=[["🌧️","Hujan "+dasJudul(t),dasRtg(aK),dasRtg(aS),kering?"kering":"basah"],["☀️","Hari tanpa hujan",dasRtg(h&&h.length>2?h:(h?[h[0],h[1]]:null)),"",hthPanjang?"kering":"basah"],["🔭","Prakiraan "+(t.pr_periode||dasJudul(dasGeser(t,1))),dasRtg(pK),dasRtg(pS),prBasah?"basah":prKering?"kering":"sedang"]].filter(k=>k[2]);
 return `<section class="das-ringkas" aria-labelledby="dasRingkasJ"><h2 id="dasRingkasJ" class="das-ringkas-j">Singkatnya</h2><div class="das-ringkas-kartu">${kartu.map(([i,j,a,b,w],n)=>`<div class="das-rk das-rk-${w}" style="--i:${n}"><span class="das-rk-i" aria-hidden="true">${i}</span><small>${esc(j)}</small><b>${esc(a)}</b>${b?`<span class="das-rk-sifat">Sifat: ${esc(b)}</span>`:""}</div>`).join("")}</div>
 <div class="das-arti"><b>Apa artinya untuk Anda?</b><ul>${arti.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>${dasDaerahHTML(t)}${dasIstilahHTML()}</section>`}

/* v9: daerah yang disebut di uraian PDF + arti istilah */
const DAS_WIL=[["Manokwari Selatan",/Man[oa](?:kw|wk|kk)ari\s+Selatan/i,"PB"],["Pegunungan Arfak",/(?:Pegunungan|Peg\.?)\s*Arfak/i,"PB"],["Teluk Bintuni",/(?:Teluk\s+|Tlk\.?\s*)?Bintuni/i,"PB"],["Teluk Wondama",/(?:Teluk\s+)?Wondama/i,"PB"],["Manokwari",/Man[oa](?:kw|wk|kk)ari|Manokwar\b/i,"PB"],["Fakfak",/Fak[\s-]?fak/i,"PB"],["Kaimana",/Kaimana/i,"PB"],
 ["Sorong Selatan",/Sorong\s+Selatan/i,"PBD"],["Kota Sorong",/Kota\s+Sorong/i,"PBD"],["Sorong",/Sorong/i,"PBD"],["Raja Ampat",/Raja\s*[AE]mpat/i,"PBD"],["Tambrauw",/Tambrau?w?\b/i,"PBD"],["Maybrat",/Ma[iy]brat/i,"PBD"]];
const DAS_LOKAL=[["Tisai","Teluk Bintuni"],["Prafi","Manokwari"],["Masni","Manokwari"],["Warmare","Manokwari"],["Sidey","Manokwari"],["Andai","Manokwari"],["Oransbari","Manokwari Selatan"],["Ransiki","Manokwari Selatan"],["Wasior","Teluk Wondama"],["Klamalu","Sorong"],["Aimas","Sorong"],["Teminabuan","Sorong Selatan"],["Waisai","Raja Ampat"],["Fef","Tambrauw"],["Kumurkek","Maybrat"],["Ayamaru","Maybrat"],["Bomberay","Fakfak"],["Kokas","Fakfak"]];
function dasWilayahDi(k){let t=" "+String(k||"")+" ";const hasil=[];
 DAS_LOKAL.forEach(([n,kb])=>{const re=new RegExp("\\b"+n+"\\b","i");if(re.test(t)){hasil.push({n,kb,i:t.search(re)});t=t.replace(re,m=>" ".repeat(m.length));const reK=DAS_WIL.find(w=>w[0]===kb);if(reK){const r2=new RegExp("^[\\s,]*(?:Kab\\.?|Kabupaten)?\\s*"+reK[1].source,"i"),sisa=t.slice(hasil[hasil.length-1].i+n.length),m=sisa.match(r2);if(m)t=t.slice(0,hasil[hasil.length-1].i+n.length)+" ".repeat(m[0].length)+sisa.slice(m[0].length)}}});
 DAS_WIL.forEach(([n,re])=>{const g=new RegExp(re.source,"ig");let m;while((m=g.exec(t))){if(/^Sorong$/i.test(n)&&/Kota\s*$/i.test(t.slice(0,m.index)))continue;hasil.push({n,i:m.index});t=t.slice(0,m.index)+" ".repeat(m[0].length)+t.slice(m.index+m[0].length)}});
 const u=[];hasil.sort((a,b)=>a.i-b.i).forEach(h=>{if(!u.some(x=>x.n===h.n))u.push(h)});return u}
function dasKalimat(k){return String(k||"").replace(/["“”]/g,"").replace(/\b(Kab|Kec|Dist|Peg|Tlk|Prov|No|Sdr|dsk|dll|dst)\./gi,"$1\u2024").split(/(?<=[.!?])\s+(?=[A-Z])/).map(x=>x.replace(/\u2024/g,".").trim()).filter(Boolean)}
const DAS_KAT2=/(sangat rendah|rendah|menengah|sangat tinggi|tinggi)(?:\s*(?:hingga|sampai|[-–]|dan)\s*(sangat rendah|rendah|menengah|sangat tinggi|tinggi))?/ig
function dasDaerah(t){const out=[],tambah=(ikon,label,w,kls)=>{if(!w.length)return;const ada=out.find(o=>o.label===label);if(ada){w.forEach(x=>{if(!ada.w.some(y=>y.n===x.n))ada.w.push(x)})}else out.push({ikon,label,w,kls})};
 (t.hal||[]).forEach(b=>{if(!["an","hth","pr","musim"].includes(b.k))return;dasKalimat(b.teks).forEach(k=>{const w=dasWilayahDi(k);if(!w.length)return;const pertama=Math.min(...w.map(x=>x.i)),depan=k.slice(0,pertama);
  if(b.k==="an"){if(/sifat/i.test(depan)){const s=[...depan.matchAll(new RegExp(DAS_SIFAT.source,"ig"))].pop()||(depan.match(/normal\s*[-–]\s*atas normal/i)?["","normal","atas normal"]:null);if(s)tambah("💧","Sifat hujan "+dasRtg(s)+" (dasarian lalu)",w,/atas/i.test(s[0])?"basah":"sedang")}else{const c=[...depan.matchAll(DAS_KAT2)].pop();if(c)tambah("🌧️","Curah hujan "+dasRtg(c)+" (dasarian lalu)",w,/rendah/i.test(c[0])?"kering":"basah")}}
  else if(b.k==="hth"){{const h=k.match(DAS_HTH)||k.match(/(sangat pendek|pendek|menengah|sangat panjang|panjang|kekeringan ekstrem)/i);if(/lebih panjang|kering|ekstrem/i.test(k)||h)tambah("☀️",/lebih panjang|kering|ekstrem/i.test(k)?"Hari tanpa hujan lebih panjang (lebih kering)":"Hari tanpa hujan "+dasRtg(h),w,"kering")}}
  else if(b.k==="pr"){const d=depan.match(/dasarian\s+(III|II|I)\s+([A-Za-z]+)/i),c=[...depan.matchAll(DAS_KAT2)].pop();if(c)tambah("🔭","Prakiraan "+(d?"Dasarian "+d[1].toUpperCase()+" "+dasHurufBesar(d[2]):"ke depan")+": hujan "+dasRtg(c),w,/tinggi|menengah/i.test(c[0])?"basah":"kering")}
  else if(b.k==="musim"){const kem=/kemarau/i.test(k);tambah(kem?"🍂":"🌱",kem?"Masih musim kemarau":"Sudah musim hujan",w,kem?"kering":"basah")}})});
 return out}
function dasDaerahHTML(t){const d=dasDaerah(t);if(!d.length)return "";
 return `<div class="das-daerah"><b class="das-daerah-j">Daerah yang perlu diperhatikan</b><ul>${d.map((x,n)=>`<li class="das-dr das-dr-${x.kls}" style="--i:${n}"><span class="das-dr-i" aria-hidden="true">${x.ikon}</span><span class="das-dr-l">${esc(x.label)}</span><span class="das-dr-w">${x.w.map(w=>`<span class="das-wil">${esc(w.kb?w.n+" ("+w.kb+")":w.n)}</span>`).join("")}</span></li>`).join("")}</ul><small>Nama daerah diambil dari uraian resmi di bawah. Kabupaten yang tidak disebut umumnya mengikuti kondisi dominan.</small></div>`}
const DAS_ISTILAH=[["Curah hujan per dasarian (10 hari)",[["Rendah","0–50 mm","#fde68a"],["Menengah","51–150 mm","#86efac"],["Tinggi","151–300 mm","#60a5fa"],["Sangat Tinggi","lebih dari 300 mm","#a78bfa"]]],
 ["Sifat hujan (dibanding rata-rata 1991–2020)",[["Bawah Normal","kurang dari 85%: lebih kering dari biasanya","#fdba74"],["Normal","85–115%: seperti biasanya","#86efac"],["Atas Normal","lebih dari 115%: lebih basah dari biasanya","#60a5fa"]]],
 ["Hari tanpa hujan berturut-turut",[["Sangat Pendek","1–5 hari","#bbf7d0"],["Pendek","6–10 hari","#d9f99d"],["Menengah","11–20 hari","#fde68a"],["Panjang","21–30 hari","#fdba74"],["Sangat Panjang","31–60 hari","#f87171"],["Kekeringan Ekstrem","lebih dari 60 hari","#b91c1c"]]],
 ["Periode dasarian",[["Dasarian I","tanggal 1–10","#e2e8f0"],["Dasarian II","tanggal 11–20","#e2e8f0"],["Dasarian III","tanggal 21 sampai akhir bulan","#e2e8f0"]]]];
function dasIstilahHTML(){return `<details class="das-istilah" open><summary>Arti istilah</summary><div class="das-ist-grid">${DAS_ISTILAH.map(([j,l])=>`<div class="das-ist"><b>${esc(j)}</b><ul>${l.map(([n,a,w])=>`<li><i style="background:${w}" aria-hidden="true"></i><span><b>${esc(n)}</b> ${esc(a)}</span></li>`).join("")}</ul></div>`).join("")}</div></details>`}
function dasHalamanPdf(t){const sp=(t.hal||[]).find(x=>x.k==="sampul"),isi=(t.hal||[]).filter(x=>x.k!=="sampul"),prJ=t.pr_periode||dasJudul(dasGeser(t,1));
 return `${dasRingkas(t)}<details class="das-lengkap-hl" open><summary>Highlight resmi dan unduhan</summary><section class="das-hl"><div class="das-hl-teks"><span class="eyebrow">Highlight · ${esc(dasJudul(t))}</span><h2>Informasi Iklim Dasarian</h2>${t.rilis?`<small>Rilis ${esc(t.rilis)}</small>`:""}
 ${(t.hl||[]).length?`<ul>${t.hl.map(x=>`<li>${dasTebal(x)}</li>`).join("")}</ul>`:t.an_teks?`<p>${dasTebal(t.an_teks)}</p>`:""}<div class="das-hl-aksi">${dasPdfUnduh(t)}<a class="pbtn sek" href="#wilayah">Info wilayah saya</a></div></div>
 ${sp?`<a class="das-hl-gbr" href="${dasSrc(sp)}" target="_blank" rel="noopener"><img src="${dasSrc(sp)}" alt="Sampul Informasi Iklim Dasarian ${esc(dasJudul(t))}" loading="lazy"></a>`:""}</section></details><h2 class="das-rinci-j">Rincian per bagian</h2>
 ${isi.map(x=>`<div class="panel das-bag"><div class="panel-head"><span>${esc(x.judul)}${x.sub?` <small class="das-rentang">${esc(x.sub)}</small>`:""}</span></div><div class="panel-body"><a class="das-gbr" href="${dasSrc(x)}" target="_blank" rel="noopener" title="Buka gambar ukuran penuh"><img src="${dasSrc(x)}" alt="${esc(x.judul)}" loading="lazy" data-galat="a"></a>${x.teks?`<p>${dasTebal(x.teks)}</p>`:""}
 ${x.k==="an"&&(t.rows||[]).length?tabelDas(t.rows,"an"):""}${x.k==="pr"&&(t.rows||[]).length?tabelDas(t.rows,"pr"):""}</div></div>`).join("")}
 ${!isi.some(x=>x.k==="pr")&&t.pr_teks?`<div class="panel"><div class="panel-head"><span>Prakiraan ${esc(prJ)}</span></div><div class="panel-body"><p>${dasTebal(t.pr_teks)}</p></div></div>`:""}`}
function dasArsipTambah(x){return (x.hl||[]).length||x.pdf?`${(x.hl||[]).length?`<ul>${x.hl.map(h=>`<li>${dasTebal(h)}</li>`).join("")}</ul>`:""}<p>${dasPdfUnduh(x)}</p>`:""}
{const asli=P["informasi-dasarian"];P["informasi-dasarian"]=()=>{const v=DASI(),t=v.terbaru;if(!t||!t.das||!(t.hal||[]).length)return asli();
 const hd=head("Iklim >> Informasi Dasarian","Informasi Dasarian","Analisis dan prakiraan curah hujan per 10 hari (dasarian) untuk Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat."),basi=Date.now()-dasAkhirMs(t)>25*864e5;
 return hd+(basi?`<div class="catatan-pmh" role="note"><span class="cp-ikon" aria-hidden="true">i</span><div><b>Informasi ini sudah lebih dari tiga dasarian.</b><p>Edisi terbaru akan tampil di sini setelah diterbitkan.</p></div></div>`:"")+dasHalamanPdf(t)+((t.rows||[]).length?legendDas():"")+`<p class="note">Diterbitkan ${esc(tglPMHU(t.diunggah))} oleh Stasiun Klimatologi Papua Barat. Ketuk gambar untuk memperbesar.</p>`+arsipDas(v.arsip)+awam("Cara membaca informasi dasarian",AWAM_DAS)}}

/* edisi bawaan (dibuat dari PDF yang diberikan kantor) tampil sampai petugas mengunggah edisi baru di Admin */
const DAS_BAWAAN={"das":"II","bln":10,"thn":2026,"judul":"Dasarian II Oktober 2026","pr_periode":"Dasarian III Oktober hingga Dasarian II November 2026","an_teks":"Curah Hujan oktober dasarian II di Provinsi Papua Barat dan Papua Barat Daya umumnya didominasi curah hujan Rendah ( 0 - 50 mm/das), terdapat wilayah dengan curah hujan kategori Menengah (50 - 150 mm/das) seperti diwilayah Sebagian Manokwari, Pegunungan Arfak dan Tambrauw. Sifat hujan didominasi bawah normal. Terdapat Wilayah yang mengalami sifat hujan Normal-Atas Normal yaitu di sekitar Pegunungan Arfak, Kabupaten Manokwari dan Kabupaten Raja Ampat .","pr_teks":"Prakiraan curah hujan selama tiga dasarian menunjukkan bahwa wilayah Papua Barat dan Papua Barat Daya secara umum didominasi kategori rendah hingga menengah (0–150 mm/dasarian), dengan sebaran yang bervariasi antar daerah. Pada Dasarian III Oktober, curah hujan kategori menengah hingga tinggi berpeluang terjadi di sebagian wilayah Papua Barat, khususnya sekitar Manokwari dan Pegunungan Arfak. Memasuki Dasarian I November, curah hujan rendah masih mendominasi, terutama di wilayah selatan Papua Barat. Sementara pada Dasarian II November, curah hujan kategori menengah diprakirakan tetap terjadi di sebagian wilayah Manokwari dan sekitarnya. Dari sisi sifat hujan, sebagian besar wilayah diprakirakan mengalami kondisi Normal, dengan beberapa wilayah berpeluang mengalami sifat hujan Atas Normal, terutama pada Dasarian I dan II November.","teks":"","rows":[],"peta":[],"hl":["Analisis Curah hujan Dasarian II Oktober 2026: didominasi curah hujan Rendah dengan sifat hujan Bawah Normal.","Hari Tanpa Hujan Dasarian II Oktober 2026 didominasi oleh kategori Hari Tanpa Hujan “Sangat Pendek\" hingga “Pendek” di kedua Provinsi.","Prakiraan curah hujan Dasarian III Oktober hingga Dasarian II November 2026 didominasi curah hujan Rendah - Menengah dengan dominasi sifat hujan Normal hingga Atas Normal."],"hal":[{"k":"sampul","judul":"Highlight","sub":"Dasarian Rilis: 21 Oktober 2026","teks":"","url":"img/dasarian/2026-10-II-hal1.jpg"},{"k":"an","judul":"Analisis Curah Hujan & Sifat Hujan","sub":"Analisis CH & SH Dasarian II Oktober 2026 (11 - 20 Oktober 2026)","teks":"Curah Hujan oktober dasarian II di Provinsi Papua Barat dan Papua Barat Daya umumnya didominasi curah hujan Rendah ( 0 - 50 mm/das), terdapat wilayah dengan curah hujan kategori Menengah (50 - 150 mm/das) seperti diwilayah Sebagian Manokwari, Pegunungan Arfak dan Tambrauw. Sifat hujan didominasi bawah normal. Terdapat Wilayah yang mengalami sifat hujan Normal-Atas Normal yaitu di sekitar Pegunungan Arfak, Kabupaten Manokwari dan Kabupaten Raja Ampat .","url":"img/dasarian/2026-10-II-hal2.jpg"},{"k":"hth","judul":"Monitoring Hari Tanpa Hujan","sub":"Monitoring HTH Dasarian II Oktober 2026 (11 Oktober - 20 Oktober)","teks":"mengalami hari tanpa hujan kategori sangat pendek hingga Pendek. Kondisi kering yang lebih panjang muncul secara lokal di Tisai, Kab. Teluk Bintuni, sementara beberapa wilayah Lainnya relatif masih ada hujan.","url":"img/dasarian/2026-10-II-hal3.jpg"},{"k":"enso","judul":"Perkembangan ENSO","sub":"","teks":"Analisis perkembangan ENSO pada dasarian I Oktober 2026 menunjukan nilai anomali positif suhu muka laut di Samudra Pasifik sebesar +3.33 yang mengindikasikan fase El Nino Sangat Kuat. Hal ini menyebabkan kekeringan di berbagai wilayah termasuk Papua Barat dan Papua Barat Daya. Meskipun demikian, suhu permukaan laut di perairan utara Papua Barat lebih hangat dari normalnya. Sehingga, masih mungkin mendapat pasokan uap air yang menjadi cikal bakal terjadinya hujan di Manokwari dan sekitarnya.","url":"img/dasarian/2026-10-II-hal4.jpg"},{"k":"pr","judul":"Prakiraan Curah Hujan & Sifat Hujan","sub":"DASARIAN III (21-31 Oktober) DASARIAN I (1-10 November) DASARIAN II (11-20 November) Prakiraan CH & SH Bulan Oktober III - November II 2026","teks":"Prakiraan curah hujan selama tiga dasarian menunjukkan bahwa wilayah Papua Barat dan Papua Barat Daya secara umum didominasi kategori rendah hingga menengah (0–150 mm/dasarian), dengan sebaran yang bervariasi antar daerah. Pada Dasarian III Oktober, curah hujan kategori menengah hingga tinggi berpeluang terjadi di sebagian wilayah Papua Barat, khususnya sekitar Manokwari dan Pegunungan Arfak. Memasuki Dasarian I November, curah hujan rendah masih mendominasi, terutama di wilayah selatan Papua Barat. Sementara pada Dasarian II November, curah hujan kategori menengah diprakirakan tetap terjadi di sebagian wilayah Manokwari dan sekitarnya. Dari sisi sifat hujan, sebagian besar wilayah diprakirakan mengalami kondisi Normal, dengan beberapa wilayah berpeluang mengalami sifat hujan Atas Normal, terutama pada Dasarian I dan II November.","url":"img/dasarian/2026-10-II-hal5.jpg"},{"k":"musim","judul":"Monitoring Perkembangan Musim","sub":"Monitoring perkembangan Musim Dasarian II Oktober 2026 (11-20 Oktober)","teks":"“Berdasarkan hasil monitoring perkembangan musim hingga Dasarian II Oktober 2026 wilayah di Papua Barat dan Papua Barat Daya masih mengalami musim kemarau meliputi sebagian wilayah Kab. Raja Ampat, Kab. Tambrauw, Kab. Manowkari Selatan, Kabupaten Fakfak, Se Kab. Teluk Bintuni, Kab. Manokwari bagian Selatan dan sebagian kecil Kab. Sorong dan Kab. Maybrat.\"","url":"img/dasarian/2026-10-II-hal6.jpg"}],"pdf":{"url":"publikasi/Informasi_Iklim_Dasarian_II_10_2026.pdf","nama":"Informasi_Iklim_Dasarian_II_10_2026.pdf","ukuran":1343038},"rilis":"21 Oktober 2026","diunggah":"2026-10-21T00:00:00.000Z","bawaan":true};

/* kartu Info Wilayah Saya */
function kartuDasWil(kab,dis){const t=DASI().terbaru;if(!t||!t.das||!(t.rows||[]).length||Date.now()-dasAkhirMs(t)>25*864e5)return null;
 const fb0=WIL_FB;WIL_FB=0;const r=barisDis(t.rows,kab,dis),fb=WIL_FB;WIL_FB=fb0;if(!r)return null;
 const ak=r.an_kat||katDasMm(r.an_mm),prJ=t.pr_periode||dasJudul(dasGeser(t,1));
 const isi=`${ak||r.an_sh?`<p class="wilp"><b>${esc(dasJudul(t))}</b>: ${ak?chip2(ak):""} ${r.an_mm!=null?esc(mmTeks(r.an_mm)):""} ${r.an_sh?chip2(r.an_sh):""}</p>`:""}${r.pr_kat||r.pr_sh?`<p class="wilp"><b>Prakiraan ${esc(prJ)}</b>: ${r.pr_kat?chip2(r.pr_kat):""} ${r.pr_sh?chip2(r.pr_sh):""}</p>`:""}${fb?`<p class="wilp"><small>Distrik ${esc(dis)} belum dirinci, jadi yang ditampilkan nilai ${esc(normKab(kab))}.</small></p>`:""}<p class="wilp"><a href="#informasi-dasarian">Lihat Informasi Dasarian →</a></p>`;
 const k=r.pr_kat||ak,arti=r.pr_kat?`10 hari ke depan hujan diprakirakan ${/sangat tinggi/i.test(r.pr_kat)?"sangat banyak (lebih dari 300 mm). Waspadai banjir dan longsor":/tinggi/i.test(r.pr_kat)?"banyak (151–300 mm). Perhatikan saluran air dan lereng":/menengah/i.test(r.pr_kat)?"cukup (51–150 mm)":"sedikit (50 mm atau kurang). Hemat air dan waspadai kebakaran lahan"}.`:"";
 return {judul:"Hujan 10 harian (dasarian)",isi,arti,lv:typeof lampuHujan==="function"?lampuHujan(k,r.pr_sh||r.an_sh):"info"}}
/* tabel buletin: baris kabupaten di kartu, rincian distrik di bawahnya */
function rincianDistrik(rows,f){const R=rows.slice().sort(urutKabDas);let kab="";return `<details class="das-rinci"><summary>Rincian per distrik (${R.length})</summary><div class="tbl-wrap"><table class="das-t"><thead><tr><th>Distrik</th>${f.map(k=>`<th>${k==="ch"?"Curah hujan":k==="sh"?"Sifat hujan":"Kategori"}</th>`).join("")}</tr></thead><tbody>${R.map(r=>(r.kab!==kab?(kab=r.kab,`<tr class="ph-grp"><th colspan="${f.length+1}">${esc(normKab(r.kab))}</th></tr>`):"")+`<tr><td>${esc(r.dis)}${r.ket?`<br><small>${esc(r.ket)}</small>`:""}</td>${f.map(k=>`<td>${r[k]?chip2(r[k]):"–"}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`}
{const g0=gridKab;gridKab=function(judul,rows,f,bulan){const R=Array.isArray(rows)?rows:[],k=R.filter(r=>!r.dis),d=R.filter(r=>r.dis);return g0(judul,k.length?k:d,f,bulan)+(d.length&&k.length?rincianDistrik(d,f):"")}}
/* admin: baris distrik ditulis "Kabupaten / Distrik" */
const gabungDis=rows=>(Array.isArray(rows)?rows:[]).map(r=>r&&r.dis?{...r,kab:r.kab+" / "+r.dis}:r);
const pisahDis=rows=>(rows||[]).map(r=>{const m=String(r.kab||"").split(/\s+\/\s+/);return m.length>1?{...r,kab:m[0].trim(),dis:m.slice(1).join(" / ").trim()}:r});

/* ---------- Admin > Informasi Dasarian ---------- */
const SLOT_DAS=[["an_ch","Peta analisis curah hujan"],["an_sh","Peta analisis sifat hujan"],["pr_ch","Peta prakiraan curah hujan"],["pr_sh","Peta prakiraan sifat hujan"],["pr_pel","Peta peluang curah hujan"],["lain","Peta lain"],["lain","Peta lain (2)"]];
const KOLOM_DAS=["kab","dis","an_mm","an_kat","an_sh","pr_kat","pr_sh","ket"];
const dasAdm=()=>(typeof ADM_STATUS!=="undefined"&&ADM_STATUS&&ADM_STATUS.info_das)||DASI();
function slotPetaDas(peta){const sisa=(peta||[]).slice();return SLOT_DAS.map(([k])=>{const i=sisa.findIndex(p=>p.k===k);return i<0?null:sisa.splice(i,1)[0]})}
function admDasarian(){const v=dasAdm(),t=v.terbaru||null,d0=t&&t.das?t:dasGeser(dasSekarang(),-1),sl=slotPetaDas(t&&t.peta),ar=v.arsip||[];
 const rowsT=(t&&t.rows||[]).map(r=>KOLOM_DAS.map(k=>r[k]==null?"":String(r[k]).replace(/\|/g,"/")).join(" | ")).join("\n");
 return `<form id="admDas"><p class="admnote">Terbitkan informasi curah hujan 10 harian buatan kantor. Isi tabel lewat <b>Excel</b> (unduh templatenya dulu) atau ketik langsung, tulis ringkasan singkat, lalu unggah peta. Hasilnya tampil di <a href="#informasi-dasarian" target="_blank">Iklim › Informasi Dasarian</a> dan di Info Wilayah Saya. Saat periode diganti, edisi sebelumnya otomatis masuk arsip.</p>
 ${t&&t.das?`<p class="admnote">Sekarang tampil: <b>${esc(dasJudul(t))}</b> (diterbitkan ${esc(tglPMHU(t.diunggah))})${v.tampil?"":" · <b>disembunyikan dari publik</b>"}.</p>`:""}
 <fieldset class="kdrow das-pdf"><legend>Cara cepat: unggah PDF Informasi Iklim Dasarian</legend><p class="admnote">Pilih PDF buatan kantor. Teks, periode, highlight, dan setiap halaman (peta) dibaca otomatis lalu ditampilkan di web; PDF asli tersedia untuk diunduh. Tabel Excel di bawah boleh dikosongkan.</p><input type="file" id="dasPdf" accept="application/pdf,.pdf"><p class="admnote" id="dasPdfKet" role="status">${t&&(t.hal||[]).length?`Edisi yang tampil berasal dari PDF (${t.hal.length} halaman).`:""}</p></fieldset>
 <fieldset class="kdrow"><legend>Periode</legend><div class="admgrid"><label>Analisis dasarian<select name="das_das">${ROM_DAS.map(x=>`<option${x===d0.das?" selected":""}>${x}</option>`).join("")}</select></label><label>Bulan<select name="das_bln">${BLN_DAS.map((b,i)=>`<option value="${i+1}"${i+1===d0.bln?" selected":""}>${b}</option>`).join("")}</select></label><label>Tahun<input name="das_thn" type="number" min="2020" max="2100" value="${d0.thn}"></label><label>Prakiraan untuk<input name="das_pr" placeholder="${esc(dasJudul(dasGeser(d0,1)))}" value="${esc((t&&t.pr_periode)||"")}"></label></div><p class="admnote" id="dasPerKet"></p></fieldset>
 <fieldset class="kdrow"><legend>1. Data per kabupaten / distrik</legend><p class="admnote">Unggah Excel sesuai template, atau ketik satu baris per wilayah dengan pemisah <b>|</b>: <i>Kabupaten | Distrik (boleh kosong) | Curah hujan analisis (mm) | Kategori analisis | Sifat analisis | Kategori prakiraan | Sifat prakiraan | Catatan</i>. Kategori: Rendah, Menengah, Tinggi, Sangat Tinggi. Sifat: Bawah Normal, Normal, Atas Normal. Bila kategori analisis kosong, web menghitungnya dari angka mm.</p>
  <p><button type="button" class="mini" id="dasTemplate">⬇️ Unduh template Excel</button> <label class="mini fbtn">📄 Unggah Excel<input type="file" id="dasFile" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden></label></p>
  <label>Isi tabel<textarea name="das_rows" rows="10" placeholder="Manokwari |  | 85 | Menengah | Normal | Tinggi | Atas Normal | \nManokwari | Masni | 120 | Menengah | Atas Normal | Tinggi | Atas Normal | ">${esc(rowsT)}</textarea></label><p class="admnote" id="dasRowsKet"></p></fieldset>
 <fieldset class="kdrow"><legend>2. Ringkasan</legend><label>Ringkasan analisis (hujan yang sudah turun)<textarea name="das_an" rows="3">${esc((t&&t.an_teks)||"")}</textarea></label><label>Ringkasan prakiraan (dasarian berikutnya)<textarea name="das_prt" rows="3">${esc((t&&t.pr_teks)||"")}</textarea></label><label>Catatan lain (boleh kosong)<textarea name="das_teks" rows="2">${esc((t&&t.teks)||"")}</textarea></label></fieldset>
 <fieldset class="kdrow"><legend>3. Peta</legend><p class="admnote">Pilih gambar peta (JPG/PNG). Judul boleh dikosongkan, nanti diisi otomatis dengan jenis peta dan periodenya.</p><div class="admpeta">${SLOT_DAS.map(([k,n],i)=>{const p=sl[i];return `<div class="admpetai das-slot"><b>${n}</b>${p?`<img src="${fileURL(p.file)}" alt="" loading="lazy">`:'<span class="admnote">Belum ada</span>'}<input type="file" name="dp${i}_file" accept="image/jpeg,image/png,image/webp"><input name="dp${i}_judul" placeholder="Judul peta" value="${esc((p&&p.judul)||"")}">${p?`<label class="cek"><input type="checkbox" name="dp${i}_hapus"> Hapus</label>`:""}</div>`}).join("")}</div></fieldset>
 <label class="cek" style="margin:12px 0"><input type="checkbox" name="das_tampil"${!t||v.tampil?" checked":""}> Tampilkan ke publik</label>
 <p><button class="pbtn" type="submit">Simpan &amp; terbitkan</button></p><p class="admmsg" id="admMsg"></p></form>
 <details class="admsec"><summary>Arsip (${ar.length})</summary>${ar.length?`<div class="admlist">${ar.map(x=>`<div class="admrow"><div><b>${esc(dasJudul(x))}</b> <small>${(x.peta||[]).length} peta</small></div><button type="button" class="mini" data-das-hapus="${esc(x.id)}">Hapus</button></div>`).join("")}</div>`:'<p class="admnote">Belum ada arsip.</p>'}</details>`}
function isiAdmDas(){const f=document.getElementById("admDas");if(!f)return;const ket=document.getElementById("dasPerKet"),cur0=(dasAdm().terbaru||{});
 const per=()=>({das:f.das_das.value,bln:+f.das_bln.value,thn:+f.das_thn.value});
 const cekPer=()=>{const p=per();f.das_pr.placeholder=dasJudul(dasGeser(p,1));ket.textContent=cur0.das&&(cur0.das!==p.das||cur0.bln!==p.bln||cur0.thn!==p.thn)?`Periode baru. ${dasJudul(cur0)} akan dipindahkan ke arsip saat disimpan.`:cur0.das?"Periode sama: edisi yang tampil akan diperbarui.":""};
 ["das_das","das_bln","das_thn"].forEach(n=>f[n].addEventListener("change",cekPer));cekPer();
 document.getElementById("dasTemplate").onclick=()=>unduhTemplateDas().catch(e=>pesan(e.message,1));pasangDasPdf(f,cekPer);DAS_PDF=null;const dasFileGalat=(fl,er)=>catatDok("Excel Informasi Dasarian: "+(fl&&fl.name||""),er&&er.message||String(er));
 document.getElementById("dasFile").onchange=async e=>{const fl=e.target.files[0];if(!fl)return;try{pesan("Membaca Excel…");const r=await bacaExcelDas(fl);f.das_rows.value=r.rows.map(x=>KOLOM_DAS.map(k=>x[k]==null?"":String(x[k]).replace(/\|/g,"/")).join(" | ")).join("\n");
  if(r.per){f.das_das.value=r.per.das;f.das_bln.value=r.per.bln;f.das_thn.value=r.per.thn;cekPer()}
  document.getElementById("dasRowsKet").textContent=`Terbaca ${r.rows.length} baris dari lembar "${r.lembar}"${r.per?", periode "+dasJudul(r.per):""}. Periksa isinya, lalu tekan Simpan.`;pesan("Excel terbaca. Periksa tabel, lalu tekan Simpan.")}catch(er){pesan(er.message,1);dasFileGalat(fl,er)}e.target.value=""};
 document.querySelectorAll("[data-das-hapus]").forEach(b=>b.onclick=async()=>{if(!b.dataset.yakin){b.dataset.yakin=1;b.textContent="Klik lagi untuk menghapus";return}try{const v=dasAdm();await simpanDas({...v,arsip:(v.arsip||[]).filter(x=>x.id!==b.dataset.dasHapus)});admTampil("dasarian");setTimeout(()=>pesan("Arsip dihapus."),60)}catch(e){pesan(e.message,1)}})}
function uraiRowsDas(teks){return String(teks||"").split(/\r?\n/).map(l=>l.trim()).filter(Boolean).map(l=>{const c=l.split("|").map(x=>x.trim());const o={};KOLOM_DAS.forEach((k,i)=>o[k]=c[i]||"");
  const mm=o.an_mm===""?null:Number(String(o.an_mm).replace(",","."));o.an_mm=mm==null||!isFinite(mm)?null:mm;o.an_kat=normKatDas(o.an_kat)||katDasMm(o.an_mm);o.an_sh=normSifDas(o.an_sh);o.pr_kat=normKatDas(o.pr_kat);o.pr_sh=normSifDas(o.pr_sh);o.kab=normKab(o.kab).replace(/^Kab\.\s*/,"");o.dis=typeof ejaWil==="function"?ejaWil(o.dis):o.dis;return o}).filter(o=>o.kab)}
async function simpanDas(nilai){const j=await admJSON("/admin/pengaturan",{kunci:"info_das",nilai});if(typeof ADM_STATUS!=="undefined"&&ADM_STATUS&&j&&j.pengaturan)ADM_STATUS.info_das=j.pengaturan.info_das;await muatUlangKA();return j}
async function simpanDasarian(f){const v=dasAdm(),lama=v.terbaru||null,p={das:f.das_das.value,bln:+f.das_bln.value,thn:+f.das_thn.value};
 if(!(p.thn>=2020&&p.thn<=2100))throw new Error("Tahun periode tidak valid.");
 const rows=uraiRowsDas(f.das_rows.value),salah=rows.filter(r=>!KAB_SEMUA.some(k=>samaKab(k[0],r.kab)));if(salah.length)throw new Error("Kabupaten tidak dikenal: "+[...new Set(salah.map(r=>r.kab))].slice(0,4).join(", ")+". Periksa ejaannya.");
 const sama=lama&&lama.das===p.das&&lama.bln===p.bln&&lama.thn===p.thn,slL=slotPetaDas(lama&&lama.peta),sl=sama?slL:SLOT_DAS.map(()=>null),peta=[];
 for(let i=0;i<SLOT_DAS.length;i++){const fl=(f[`dp${i}_file`]||{}).files,ada=sl[i],hapus=f[`dp${i}_hapus`]&&f[`dp${i}_hapus`].checked,jd=(f[`dp${i}_judul`].value||"").trim(),[k,n]=SLOT_DAS[i];
  let file=ada&&!hapus?ada.file:"";if(fl&&fl[0]){pesan(`Mengunggah ${n.toLowerCase()}…`);file=(await admUnggah(fl[0])).kunci}
  const pakaiJd=jd&&!(!sama&&slL[i]&&jd===slL[i].judul);
  if(file)peta.push({k,file,judul:pakaiJd?jd:n+" "+(k.startsWith("pr")?(f.das_pr.value.trim()||dasJudul(dasGeser(p,1))):dasJudul(p))})}
 if(!rows.length&&!peta.length&&!f.das_an.value.trim()&&!f.das_prt.value.trim())throw new Error("Isi tabel, ringkasan, atau peta dulu.");
 const baru={...p,judul:dasJudul(p),pr_periode:f.das_pr.value.trim(),an_teks:f.das_an.value.trim(),pr_teks:f.das_prt.value.trim(),teks:f.das_teks.value.trim(),diunggah:new Date().toISOString(),peta,rows,...(DAS_PDF&&(!DAS_PDF.per||(DAS_PDF.per.das===p.das&&DAS_PDF.per.bln===p.bln&&DAS_PDF.per.thn===p.thn))?{hl:DAS_PDF.hl,hal:DAS_PDF.hal,pdf:DAS_PDF.pdf,rilis:DAS_PDF.rilis}:sama&&lama&&(lama.hal||[]).length?{hl:lama.hl,hal:lama.hal,pdf:lama.pdf,rilis:lama.rilis}:{})};DAS_PDF=null;
 let arsip=(v.arsip||[]).filter(x=>x.id!==`${p.thn}-${String(p.bln).padStart(2,"0")}-${p.das}`);if(lama&&lama.das&&!sama){const {rows:_,...ringan}=lama;arsip=[ringan,...arsip.filter(x=>x.id!==lama.id)]}
 arsip.sort((a,b)=>String(b.id).localeCompare(String(a.id)));
 await simpanDas({tampil:f.das_tampil.checked,terbaru:baru,arsip:arsip.slice(0,36)});admTampil("dasarian");
 setTimeout(()=>pesan(`${dasJudul(p)} disimpan${f.das_tampil.checked?" dan tampil di web paling lama 1 menit":" (belum ditampilkan ke publik)"}.${lama&&!sama?" "+dasJudul(lama)+" dipindahkan ke arsip.":""}`),60)}
async function bacaExcelDas(file){const sh=await bacaXlsx(file,true);let best=null;
 for(const s of sh){const rows=s.rows||[];for(let i=0;i<Math.min(rows.length,15);i++){const h=(rows[i]||[]).map(x=>String(x||"").toLowerCase());if(h.some(x=>/kab|kota/.test(x))&&h.some(x=>/kategori|sifat|mm|curah/.test(x))){best={s,i,h};break}}if(best)break}
 if(!best)throw new Error("Kolom tidak ditemukan. Pakai template Excel dari tombol Unduh template.");
 const {s,i,h}=best,col={};h.forEach((x,j)=>{const pr=/prakiraan|prediksi/.test(x);if(/kab|kota/.test(x)&&col.kab==null)col.kab=j;else if(/distrik|kecamatan/.test(x))col.dis=j;else if(/mm/.test(x)&&!pr)col.an_mm=j;else if(/sifat/.test(x))col[pr?"pr_sh":"an_sh"]=j;else if(/kategori|curah|\bch\b/.test(x))col[pr?"pr_kat":"an_kat"]=j;else if(/ket|catatan/.test(x))col.ket=j});
 const out=[];let kabT="";for(const r of s.rows.slice(i+1)){if(!r||!r.some(x=>String(x||"").trim()))continue;const g=k=>col[k]==null?"":String(r[col[k]]==null?"":r[col[k]]).trim();let kab=g("kab");if(!kab&&g("dis"))kab=kabT;if(!kab)continue;kabT=kab;
  if(!["an_mm","an_kat","an_sh","pr_kat","pr_sh","ket"].some(k=>g(k)))continue;const mm=g("an_mm")===""?null:Number(g("an_mm").replace(",","."));out.push({kab:normKab(kab).replace(/^Kab\.\s*/,""),dis:g("dis"),an_mm:mm==null||!isFinite(mm)?null:Math.round(mm*10)/10,an_kat:normKatDas(g("an_kat"))||katDasMm(mm),an_sh:normSifDas(g("an_sh")),pr_kat:normKatDas(g("pr_kat")),pr_sh:normSifDas(g("pr_sh")),ket:g("ket")})}
 let per=null;const atas=s.rows.slice(0,i+1).flat().join(" ");const m=atas.match(/dasarian\s+(III|II|I)\s+(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(20\d\d)/i);if(m)per={das:m[1].toUpperCase(),bln:BLN_DAS.findIndex(b=>b.toLowerCase()===m[2].toLowerCase())+1,thn:+m[3]};
 if(!out.length)throw new Error("Tidak ada baris data di bawah judul kolom.");return {rows:out,per,lembar:s.nama}}
async function unduhTemplateDas(){const JSZip=await muatJsZip(),z=new JSZip(),x=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
 const p=dasGeser(dasSekarang(),-1),head=["Kabupaten/Kota","Distrik","Analisis CH (mm)","Analisis Kategori","Analisis Sifat","Prakiraan Kategori","Prakiraan Sifat","Keterangan"];
 const data=[["Periode: "+dasJudul(p)+" (ganti periode di sel ini bila perlu)"],[],head,...KAB_SEMUA.map(k=>[k[0]]),[],["Baris distrik: tulis nama kabupaten dan distriknya, contoh: Manokwari | Masni. Kategori: Rendah, Menengah, Tinggi, Sangat Tinggi. Sifat: Bawah Normal, Normal, Atas Normal."]];
 const kol=n=>String.fromCharCode(65+n),sel=(r,c,v)=>`<c r="${kol(c)}${r}" t="inlineStr"${r===3?' s="1"':""}><is><t>${x(v)}</t></is></c>`;
 const sheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols><col min="1" max="1" width="22" customWidth="1"/><col min="2" max="2" width="22" customWidth="1"/><col min="3" max="8" width="18" customWidth="1"/></cols><sheetData>${data.map((r,i)=>`<row r="${i+1}">${r.map((v,c)=>sel(i+1,c,v)).join("")}</row>`).join("")}</sheetData></worksheet>`;
 z.file("[Content_Types].xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`);
 z.file("_rels/.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`);
 z.file("xl/workbook.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Dasarian" sheetId="1" r:id="rId1"/></sheets></workbook>`);
 z.file("xl/_rels/workbook.xml.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
 z.file("xl/styles.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`);
 z.file("xl/worksheets/sheet1.xml",sheet);
 const b=await z.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="Template-Informasi-Dasarian.xlsx";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}

/* ---------- Admin > Isi Halaman Iklim: unggah peta sendiri per bagian (tanpa menunggu buletin) ---------- */
const JENIS_PETA_IK=[["analisis|ch|pb","Analisis curah hujan · Papua Barat"],["analisis|sh|pb","Analisis sifat hujan · Papua Barat"],["analisis|ch|pbd","Analisis curah hujan · Papua Barat Daya"],["analisis|sh|pbd","Analisis sifat hujan · Papua Barat Daya"],
 ["prakiraan|ch|","Prakiraan curah hujan (pilih bulannya)"],["prakiraan|sh|","Prakiraan sifat hujan (pilih bulannya)"],["hth||","Hari tanpa hujan (HTH)"],["spi||","Kekeringan (SPI)"],
 ["musim-awal|hujan|","Prediksi musim hujan · awal musim"],["musim-banding|hujan|","Prediksi musim hujan · dibanding normal"],["musim-sifat|hujan|","Prediksi musim hujan · sifat"],["musim-puncak|hujan|","Prediksi musim hujan · puncak"],
 ["musim-awal|kemarau|","Prediksi musim kemarau · awal musim"],["musim-banding|kemarau|","Prediksi musim kemarau · dibanding normal"],["musim-sifat|kemarau|","Prediksi musim kemarau · sifat"],["musim-puncak|kemarau|","Prediksi musim kemarau · puncak"]];
function secUnggahPeta(x){const bl=[...new Set([((x.analisis||{}).bulan)||"",...(((x.prakiraan||{}).bulan)||[]).map(m=>m.bulan)].filter(Boolean))];
 return `<details class="admsec" id="ikPetaSec"><summary><b>Unggah peta sendiri</b> <small>pasang atau ganti satu peta di bagian tertentu</small></summary><div class="admsecin">
 <p class="admnote">Pakai ini bila peta dari buletin salah, buram, atau belum ada. Peta langsung tampil di halaman Iklim yang sesuai.</p>
 <div class="admgrid"><label>Jenis peta<select id="ikPetaJenis">${JENIS_PETA_IK.map(([v,n])=>`<option value="${v}">${n}</option>`).join("")}</select></label>
 <label>Bulan<input id="ikPetaBulan" list="ikPetaBlnL" placeholder="mis. November 2026" value="${esc(bl[0]||"")}"><datalist id="ikPetaBlnL">${bl.map(b=>`<option value="${esc(b)}">`).join("")}</datalist></label>
 <label>Judul peta<input id="ikPetaJudul" placeholder="Kosongkan: diisi otomatis"></label>
 <label>File gambar<input type="file" id="ikPetaFile" accept="image/jpeg,image/png,image/webp"></label></div>
 <label class="cek"><input type="checkbox" id="ikPetaGanti" checked> Ganti peta lama dengan jenis dan bulan yang sama</label>
 <p><button type="button" class="pbtn" id="ikPetaUnggah">Unggah peta</button></p></div></details>`}
async function unggahPetaIklim(){const fl=(document.getElementById("ikPetaFile").files||[])[0];if(!fl)throw new Error("Pilih file gambar peta dulu.");
 const [k,sub,prov]=document.getElementById("ikPetaJenis").value.split("|"),nama=(JENIS_PETA_IK.find(j=>j[0]===document.getElementById("ikPetaJenis").value)||[])[1]||"Peta";
 let bulan=document.getElementById("ikPetaBulan").value.trim();const perluBulan=k==="prakiraan"||k==="analisis";if(perluBulan&&!bulan)throw new Error("Isi bulan peta (mis. November 2026).");if(!perluBulan)bulan="";
 pesan("Mengunggah peta…");const u=await admUnggah(fl);
 const judul=document.getElementById("ikPetaJudul").value.trim()||(nama.replace(/\s*\(pilih bulannya\)/,"")+(bulan?" "+bulan:"")),ganti=document.getElementById("ikPetaGanti").checked,x=IK();
 const sama=p=>p.k===k&&(p.sub||"")===(sub||"")&&(k.startsWith("musim")?true:(p.prov||"")===(prov||""))&&(!bulan||!p.bulan||samaBulan(p.bulan,bulan));
 const peta=[...(x.peta||[]).filter(p=>!(ganti&&sama(p))),{k,sub,prov,bulan,judul,file:u.kunci,sumber:"Diunggah petugas Stasiun Klimatologi Papua Barat",manual:true,tgl:new Date(Date.now()+9*3600e3).toISOString().slice(0,10)}];
 await admJSON("/admin/iklim",{...x,peta});await muatUlangKA();admTampil(/^ik-/.test(ADM_TAB)?ADM_TAB:"iklim");setTimeout(()=>pesan(`Peta "${judul}" dipasang. Tampil di web paling lama 1 menit.`),60)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#ikPetaUnggah");if(!b)return;b.disabled=true;unggahPetaIklim().catch(er=>pesan(er.message,1)).finally(()=>{b.disabled=false})});

/* ===== PERIKSA WEB: ejaan & isi (aturan pasti + AI) dengan perbaikan otomatis =====
   Kesalahan yang jelas (termasuk dari buletin) langsung dibetulkan dan bisa diurungkan.
   Yang tidak bisa dibetulkan dari Admin (data kosong, halaman gagal tampil, kesalahan kode, data BMKG Pusat) diberi peringatan. */
const PRK_AMBANG=.85,PRK_SARAN=.6;
function daftarDistrikResmi(){const s=new Set();try{[...zomTerbaru().zom,...NONZOM.map(n=>({wil:WIL_NONZOM[n]||""}))].forEach(z=>ejaWil(z.wil).replace(/\(([^)]*)\)/g,(_,d)=>{d.split(",").forEach(x=>{x=x.trim();if(x&&!/sebagian|bagian/i.test(x))s.add(x)});return ""}))}catch(e){}return [...s].sort()}
function kumpulTeks(){const L=[],add=(sumber,akar,jalur,label,ref)=>{let o=akar;for(const k of jalur){if(o==null)return;o=o[k]}if(typeof o==="string"&&o.trim().length>=3&&!/^https?:/.test(o))L.push({id:"t"+L.length,t:o,sumber,jalur,label,ref})};
 const kd=KA&&KA.kondisi;if(kd){add("kondisi",kd,["ringkasan"],"Kondisi Iklim · ringkasan");Object.keys(kd.teks||{}).forEach(k=>add("kondisi",kd,["teks",k],"Kondisi Iklim · teks "+k));(kd.kartu||[]).forEach((x,i)=>["judul","nilai","ket"].forEach(f=>add("kondisi",kd,["kartu",i,f],`Kartu "${x.judul}"`)))}
 const ik=KA&&KA.isi_iklim;if(ik){const a=ik.analisis||{};["teks_pb","teks_pbd"].forEach(k=>add("iklim",ik,["analisis",k],"Analisis hujan · ringkasan"));["pb","pbd"].forEach(p=>(a[p]||[]).forEach((r,i)=>{add("iklim",ik,["analisis",p,i,"ket"],"Analisis hujan · "+r.kab);add("iklim",ik,["analisis",p,i,"dis"],"Analisis hujan · distrik")}));
  ((ik.prakiraan||{}).bulan||[]).forEach((m,j)=>{add("iklim",ik,["prakiraan","bulan",j,"teks"],"Prakiraan "+m.bulan);["pb","pbd"].forEach(p=>(m[p]||[]).forEach((r,i)=>{add("iklim",ik,["prakiraan","bulan",j,p,i,"ket"],"Prakiraan "+m.bulan+" · "+r.kab);add("iklim",ik,["prakiraan","bulan",j,p,i,"dis"],"Prakiraan · distrik")}))});
  add("iklim",ik,["ekstrem","teks"],"Hujan ekstrem · ringkasan");add("iklim",ik,["hth","teks"],"Hari tanpa hujan · ringkasan");((ik.hth||{}).dasarian||[]).forEach((d,i)=>add("iklim",ik,["hth","dasarian",i,"teks"],"Hari tanpa hujan · dasarian "+d.das));
  add("iklim",ik,["spi","teks"],"SPI · ringkasan");["pb","pbd"].forEach(p=>((ik.spi||{})[p]||[]).forEach((r,i)=>add("iklim",ik,["spi",p,i,"ket"],"SPI · "+r.kab)));
  ["musim_hujan","musim_kemarau"].forEach(m=>{add("iklim",ik,[m,"teks"],"Prediksi "+m.replace("_"," ")+" · ringkasan");((ik[m]||{}).zom||[]).forEach((z,i)=>add("iklim",ik,[m,"zom",i,"wil"],`ZOM ${z.no} · wilayah`))});
  Object.keys(ik.teks_hal||{}).forEach(k=>add("iklim",ik,["teks_hal",k],"Teks halaman Iklim · "+k));(ik.peta||[]).forEach((p,i)=>add("iklim",ik,["peta",i,"judul"],"Judul peta"))}
 const ds=dasAdm();if(ds&&ds.terbaru){const t=ds.terbaru;["an_teks","pr_teks","teks"].forEach(k=>add("das",ds,["terbaru",k],"Informasi Dasarian · ringkasan"));(t.rows||[]).forEach((r,i)=>{add("das",ds,["terbaru","rows",i,"ket"],"Informasi Dasarian · "+r.kab);add("das",ds,["terbaru","rows",i,"dis"],"Informasi Dasarian · distrik")});(t.peta||[]).forEach((p,i)=>add("das",ds,["terbaru","peta",i,"judul"],"Informasi Dasarian · judul peta"))}
 ((KA&&KA.publikasi)||[]).forEach((p,i)=>{add("pub",KA.publikasi,[i,"judul"],"Publikasi · judul",p.id);add("pub",KA.publikasi,[i,"ringkas"],`Publikasi "${p.judul}" · ringkasan`,p.id)});
 return L}
const BLN_RE_PRK=/\b(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(20\d\d)\b/gi;
const blnKey=t=>{const m=String(t||"").toLowerCase().match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(20\d\d)/);return m?+m[2]*12+BLN_DAS.findIndex(b=>b.toLowerCase()===m[1]):null};
function aturanEjaan(L){const F=[],tambahF=(x,salah,benar,alasan)=>{if(salah&&benar&&salah!==benar&&x.t.includes(salah)&&!F.some(f=>f.id===x.id&&f.salah===salah))F.push({id:x.id,salah,benar,alasan,yakin:1,aturan:1})};
 const ik=(KA&&KA.isi_iklim)||{},bA=blnKey((ik.analisis||{}).bulan),prB=((ik.prakiraan||{}).bulan||[]).map(m=>blnKey(m.bulan));
 L.forEach(x=>{const t=x.t;
  const wil=/^wil$/.test(String(x.jalur[x.jalur.length-1])),e=wil?ejaWil(t):t;
  if(wil&&e!==t)tambahF(x,t,e,"ejaan distrik resmi / distrik dipindah ke kabupaten yang benar");
  else EJAAN_DISTRIK.forEach(([re,g])=>{(t.match(new RegExp(re.source,"g"))||[]).forEach(m=>tambahF(x,m,g,"ejaan nama distrik resmi"))});
  (t.match(/[A-Za-z]{2,}:[A-Za-z]{2,}/g)||[]).forEach(m=>tambahF(x,m,m.replace(":",": "),"spasi setelah titik dua"));
  (t.match(/[A-Za-z]{2,},[A-Za-z]{2,}/g)||[]).forEach(m=>tambahF(x,m,m.replace(",",", "),"spasi setelah koma"));
  (t.match(/\S {2,}\S/g)||[]).forEach(m=>tambahF(x,m,m.replace(/ {2,}/," "),"spasi ganda"));
  (t.match(/[A-Za-z] [,.;:](?=\s|$)/g)||[]).forEach(m=>tambahF(x,m,m.replace(/ ([,.;:])/,"$1"),"spasi sebelum tanda baca"));
  (t.match(/\S\s+Bagian\s+(?:utara|selatan|timur|barat|tengah)\b/g)||[]).forEach(m=>tambahF(x,m,m.replace("Bagian","bagian"),"huruf kecil di tengah kalimat"));
  /* bulan di ringkasan analisis harus sama dengan bulan analisis (kesalahan penulis buletin) */
  if(bA!=null&&x.sumber==="iklim"&&x.jalur[0]==="analisis"&&/^teks_/.test(x.jalur[1])){const ms=[...t.matchAll(BLN_RE_PRK)];const lain=ms.filter(m=>{const k=+m[2]*12+BLN_DAS.findIndex(b=>b.toLowerCase()===m[1].toLowerCase());return k!==bA&&!prB.includes(k)&&Math.abs(k-bA)===1});if(lain.length===1&&ms.length===1)tambahF(x,lain[0][0],(ik.analisis||{}).bulan,"bulan berbeda dengan bulan analisis")}});
 return F}
async function aiEjaan(L,lapor){const out=[],dist=daftarDistrikResmi().join(", "),kab=KAB_SEMUA.map(k=>k[0]).join(", ");let batch=[],pj=0,n=0;
 const kirim=async()=>{if(!batch.length)return;n++;lapor(`AI memeriksa ejaan (bagian ${n})…`);try{const j=await admJSON("/admin/periksa-ejaan",{item:batch.map(x=>({id:x.id,t:x.t})),distrik:dist,konteks:"Provinsi: Papua Barat dan Papua Barat Daya (dua provinsi berbeda, keduanya benar). Kabupaten/kota: "+kab});(j.temuan||[]).forEach(f=>out.push(f))}catch(e){out.push({galat:e.message})}batch=[];pj=0};
 for(const x of L.filter(x=>x.t.length>=8&&/[a-z]{3}/i.test(x.t))){if(pj+x.t.length>5500||batch.length>=40)await kirim();batch.push(x);pj+=x.t.length}await kirim();return out}
function ambilJalur(akar,jalur){let o=akar;for(const k of jalur){if(o==null)return undefined;o=o[k]}return o}
function aturJalur(akar,jalur,v){let o=akar;for(const k of jalur.slice(0,-1)){if(o==null)return false;o=o[k]}if(o==null)return false;o[jalur[jalur.length-1]]=v;return true}
/* terapkan daftar perbaikan {item, salah, benar}: tiap sumber disimpan satu kali */
async function terapkanPerbaikan(daftar,arah){const S={},hasil=[];
 const akar=s=>{if(S[s])return S[s];const a=s==="kondisi"?JSON.parse(JSON.stringify(KA.kondisi||{})):s==="iklim"?JSON.parse(JSON.stringify(KA.isi_iklim||{})):s==="das"?JSON.parse(JSON.stringify(dasAdm()||{})):JSON.parse(JSON.stringify(KA.publikasi||[]));S[s]={a,ubah:0,pub:new Set()};return S[s]};
 for(const f of daftar){const x=f.item,r=akar(x.sumber),cur=ambilJalur(r.a,x.jalur);const dari=arah==="urung"?f.benar:f.salah,ke=arah==="urung"?f.salah:f.benar;
  if(typeof cur!=="string"||!cur.includes(dari)){hasil.push({f,ok:false});continue}aturJalur(r.a,x.jalur,cur.replace(dari,ke));r.ubah++;if(x.sumber==="pub")r.pub.add(x.jalur[0]);hasil.push({f,ok:true})}
 if(S.kondisi&&S.kondisi.ubah)await admJSON("/admin/kondisi",S.kondisi.a);
 if(S.iklim&&S.iklim.ubah)await admJSON("/admin/iklim",S.iklim.a);
 if(S.das&&S.das.ubah)await simpanDas(S.das.a);
 if(S.pub&&S.pub.ubah)await admJSON("/admin/ubah-massal",{item:[...S.pub.pub].map(i=>({id:S.pub.a[i].id,judul:S.pub.a[i].judul,ringkas:S.pub.a[i].ringkas})),aksi:"Periksa web: betulkan ejaan"});
 await muatUlangKA();return hasil}
/* halaman yang gagal tampil (kesalahan kode) */
function cekTampilHalaman(tambah){const hal=Object.keys(typeof META_HAL!=="undefined"?META_HAL:{}).filter(k=>P[k]&&k!=="admin");const gagal=[];
 hal.forEach(k=>{try{const h=String(P[k]()||""),tx=h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ");if(!tx.trim())gagal.push([k,"halamannya kosong"]);else{const m=tx.match(/\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b(?= mm| %|°)/);if(m)gagal.push([k,`tertulis "${m[0]}"`])}}catch(e){gagal.push([k,"error: "+String(e&&e.message||e).slice(0,80)])}});
 gagal.forEach(([k,why])=>tambah("merah",`Halaman "${(typeof NAMA_HAL!=="undefined"&&NAMA_HAL[k])||k}" tidak tampil dengan benar (${why}). Ini kesalahan kode, bukan isi, jadi tidak bisa dibetulkan dari Admin. Laporkan ke teknisi/pengembang web.`,""));return hal.length}
/* data kosong atau belum ada (tidak bisa ditebak, harus diunggah petugas) */
function cekDataKosong(tambah){const ik=(KA&&KA.isi_iklim)||{},nm={analisis:"Analisis hujan bulanan",prakiraan:"Prakiraan hujan bulanan",hth:"Hari tanpa hujan",spi:"Kekeringan (SPI)",musim_hujan:"Prediksi musim hujan"};
 Object.entries(nm).forEach(([k,n])=>{const v=ik[k];const kosong=!v||(k==="analisis"&&!((v.pb||[]).length||(v.pbd||[]).length))||(k==="prakiraan"&&!(v.bulan||[]).length)||(k==="hth"&&!(v.dasarian||[]).length)||(k==="spi"&&!((v.pb||[]).length||(v.pbd||[]).length))||(k==="musim_hujan"&&!(v.zom||[]).length);
  if(kosong&&k==="musim_hujan"){const zb=zomTerbaru();tambah("info",`Prediksi musim hujan belum diunggah lewat Admin; web memakai data bawaan "${zb.judul}". Unggah buku prediksi musim berikutnya bila sudah terbit.`,"iklim|")}
  else if(kosong)tambah("kuning",`Data "${n}" kosong di Isi Halaman Iklim, jadi web memakai data bawaan lama. Unggah buletin terbaru atau isi manual.`,"iklim|")});
 const pt=ik.peta||[];[["analisis","peta analisis hujan"],["prakiraan","peta prakiraan hujan"],["hth","peta hari tanpa hujan"],["spi","peta SPI"]].forEach(([k,n])=>{if(!pt.some(p=>p.k===k))tambah("info",`Belum ada ${n} dari buletin. Unggah sendiri di Isi Halaman Iklim › Unggah peta sendiri.`,"iklim|#ikPetaSec")});
 const d=dasAdm();if(!d||!d.terbaru)tambah("info","Informasi Dasarian belum pernah diterbitkan.","dasarian|");else if(Date.now()-dasAkhirMs(d.terbaru)>25*864e5)tambah("kuning",`Informasi Dasarian terakhir (${dasJudul(d.terbaru)}) sudah lebih dari tiga dasarian.`,"dasarian|");else if(!d.tampil)tambah("info",`Informasi Dasarian ${dasJudul(d.terbaru)} belum ditampilkan ke publik.`,"dasarian|");
 const bm=KA&&KA.bmkg,wp=bm&&bm.wilayah;if(wp&&wp.galat)tambah("info","Tabel peringatan dini BMKG Pusat tidak terbaca: "+wp.galat+". Ini dari situs BMKG Pusat, tidak bisa diubah dari Admin; web memakai keterangan provinsi.","bmkg|");
 const pusatSalah=((bm&&bm.berita)||[]).filter(x=>/[a-z][A-Z]{2,}|\s{2,}/.test(x.judul||""));if(pusatSalah.length)tambah("info",`${pusatSalah.length} judul berita BMKG Pusat tampak salah ketik (mis. "${potong(pusatSalah[0].judul,60)}"). Berasal dari BMKG Pusat, tidak bisa diubah dari Admin; bisa disembunyikan di tab BMKG Pusat.`,"bmkg|")}
/* saran AI yang menghapus kata atau mengubah nama provinsi/kabupaten tidak pernah dipakai */
function aiAman(f){const a=String(f.salah||""),b=String(f.benar||""),polos=t=>t.replace(/[\s.,;:]/g,"");
 if(polos(a).length-polos(b).length>=3)return false;
 const nama=["Papua Barat Daya","Papua Barat",...KAB_SEMUA.map(k=>k[0])];
 return !nama.some(n=>{const re=new RegExp("\\b"+n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","gi");const na=(a.match(re)||[]).length,nb=(b.match(re)||[]).length;return /^Papua/.test(n)?na!==nb:nb<na})}
async function periksaEjaan(lapor,tambah){lapor("Memeriksa ejaan dan salah ketik…");const L=kumpulTeks(),idx=new Map(L.map(x=>[x.id,x]));
 const F=aturanEjaan(L);let ai=[];try{ai=await aiEjaan(L,lapor)}catch(e){ai=[{galat:e.message}]}
 const galat=ai.find(f=>f.galat);if(galat)tambah("info","Pemeriksaan ejaan dengan AI tidak berjalan ("+galat.galat+"). Pemeriksaan aturan tetap dijalankan.","");
 ai.filter(f=>!f.galat&&idx.has(f.id)&&aiAman(f)&&!F.some(g=>g.id===f.id&&(g.salah.includes(f.salah)||f.salah.includes(g.salah)))).forEach(f=>F.push(f));
 const utuh=new Set(F.filter(f=>idx.get(f.id)&&f.salah===idx.get(f.id).t).map(f=>f.id));
 const pakai=F.filter(f=>f.yakin>=PRK_SARAN&&(!utuh.has(f.id)||f.salah===idx.get(f.id).t)).map(f=>({...f,item:idx.get(f.id)}));
 const oto=pakai.filter(f=>f.yakin>=PRK_AMBANG),saran=pakai.filter(f=>f.yakin<PRK_AMBANG);let jadi=[];
 if(oto.length){lapor(`Membetulkan ${oto.length} kesalahan…`);try{jadi=(await terapkanPerbaikan(oto)).filter(h=>h.ok).map(h=>h.f)}catch(e){tambah("merah","Perbaikan otomatis gagal disimpan: "+e.message,"");jadi=[]}}
 oto.filter(f=>!jadi.includes(f)).forEach(f=>saran.push(f));
 return {n:L.length,otomatis:jadi,saran}}
const ringkasPerbaikan=f=>`<b>${escH(f.item.label)}</b>: «${escH(f.salah)}» → «${escH(f.benar)}»${f.alasan?` <small>(${escH(f.alasan)})</small>`:""}`;
function admPeriksaEjaan(r){if(!r||(!(r.otomatis||[]).length&&!(r.saran||[]).length))return "";
 return `${(r.otomatis||[]).length?`<details class="admsec" open><summary>✅ Dibetulkan otomatis (${r.otomatis.length})</summary><div class="admlist">${r.otomatis.map((f,i)=>`<div class="admrow prk ok"><div>${ringkasPerbaikan(f)}</div>${f.urung?'<small>diurungkan</small>':`<button type="button" class="mini" data-prk-urung="${i}">Urungkan</button>`}</div>`).join("")}</div></details>`:""}
 ${(r.saran||[]).length?`<details class="admsec" open><summary>✏️ Saran perbaikan, perlu dicek (${r.saran.length})</summary><p class="admnote">AI kurang yakin dengan perubahan ini. Terapkan bila memang benar.</p><div class="admlist">${r.saran.map((f,i)=>`<div class="admrow prk kuning"><div>${ringkasPerbaikan(f)}</div>${f.diterapkan?'<small>diterapkan</small>':`<button type="button" class="mini" data-prk-terap="${i}">Terapkan</button>`}</div>`).join("")}</div></details>`:""}`}
document.addEventListener("click",async e=>{const b=e.target.closest&&e.target.closest("[data-prk-urung],[data-prk-terap]");if(!b||!ADM_PERIKSA)return;b.disabled=true;
 try{if(b.dataset.prkUrung!=null){const f=ADM_PERIKSA.otomatis[+b.dataset.prkUrung];const h=await terapkanPerbaikan([f],"urung");if(!h[0].ok)throw new Error("Teks sudah berubah, tidak bisa diurungkan.");f.urung=1}
  else{const f=ADM_PERIKSA.saran[+b.dataset.prkTerap];const h=await terapkanPerbaikan([f]);if(!h[0].ok)throw new Error("Teks sudah berubah, tidak bisa diterapkan.");f.diterapkan=1}
  document.getElementById("admBody").innerHTML=admPeriksa()}catch(er){b.disabled=false;alertAdm(er.message)}});
function alertAdm(t){const st=document.getElementById("admPeriksaStatus");if(st)st.textContent=t;else if(typeof pesan==="function")pesan(t,1)}
/* rincian distrik dari buletin (dibaca AI bila teksnya memuat banyak nama distrik) */
async function tambahDistrik(obj,hal,d,bagian,bulan){const tx=Array.isArray(hal)?hal.join("\n"):String(hal||""),DD=daftarDistrikResmi(),ada=DD.filter(n=>new RegExp("\\b"+n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(tx));if(ada.length<5)return 0;
 pesan(`AI membaca rincian per distrik (${bagian}${bulan?" "+bulan:""})…`);
 const j=await admJSON("/admin/ekstrak",{mode:"iklim",bagian,judul:d.judul,teks:("PETUNJUK: Ambil HANYA baris per DISTRIK (field dis wajib diisi). Distrik yang tertulis: "+ada.join(", ")+"."+(bulan?" Bulan yang dibaca: "+bulan+".":"")+"\n\n"+tx).slice(0,14000)});
 const o=j&&j.data,src=bagian==="prakiraan"?(((o&&o.bulan)||[]).find(m=>!bulan||samaBulan(m.bulan,bulan))||((o&&o.bulan)||[])[0]):o;if(!src)return 0;let n=0;
 ["pb","pbd"].forEach(p=>{const rows=(src[p]||[]).filter(r=>r&&r.dis&&r.kab&&(r.ch||r.sh)&&ada.some(a=>normDis(a)===normDis(r.dis)));if(!rows.length)return;obj[p]=[...(obj[p]||[]).filter(r=>!r.dis),...rows.map(r=>({kab:normKab(r.kab).replace(/^Kab\.\s*/,""),dis:ejaWil(r.dis),ch:r.ch||"",sh:r.sh||"",ket:r.ket||""}))];n+=rows.length});return n}

const IKLIM=["wilayah","pos-hujan","informasi-dasarian","prakiraan-musim-kemarau","prakiraan-musim","hujan-bulanan","hari-tanpa-hujan","peringatan-kekeringan","peringatan-hujan-tinggi","enso-iod","iklim-papua-barat","zona-musim"];
IKLIM.filter(k=>k!=="wilayah"&&k!=="pos-hujan"&&P[k]).forEach(k=>{const f=P[k];P[k]=()=>{const h=f(),i=h.indexOf("</p></div>");return i<0?CTA_WIL+h:h.slice(0,i+10)+CTA_WIL+h.slice(i+10)}});
isiFooter();muatKonten();
/* judul & deskripsi tiap halaman (untuk tab browser dan Google) */
const META_HAL={"beranda": ["Stasiun Klimatologi Papua Barat (Staklim Pabar) – BMKG Manokwari", "Situs resmi Stasiun Klimatologi Kelas III Papua Barat (Staklim Pabar), BMKG Manokwari: informasi iklim, curah hujan, prakiraan musim, peringatan dini kekeringan dan hujan tinggi, serta data cuaca AWS/ARG langsung untuk Papua Barat dan Papua Barat Daya."], "profil": ["Profil Staklim Papua Barat – BMKG Manokwari", "Profil Stasiun Klimatologi Kelas III Papua Barat (Staklim Pabar) BMKG: tugas, wilayah layanan Papua Barat dan Papua Barat Daya, alamat kantor di Manokwari, dan kontak."], "profil-tim": ["Pimpinan & Pegawai Staklim Papua Barat", "Pimpinan, struktur organisasi, dan pegawai Stasiun Klimatologi Papua Barat (BMKG Manokwari)."], "profil-sejarah": ["Sejarah Stasiun Klimatologi Papua Barat", "Sejarah dan jejak nama Stasiun Klimatologi Papua Barat (Staklim Pabar), BMKG di Manokwari."], "pengaduan": ["Pengaduan & Whistle Blowing – Staklim Papua Barat", "Sampaikan pengaduan, kritik, saran, atau laporan dugaan pelanggaran pegawai Stasiun Klimatologi Papua Barat. Setiap laporan bertiket dan dapat dipantau."], "profil-akuntabilitas": ["Akuntabilitas Kinerja (LKjIP) – Staklim Papua Barat", "Laporan Kinerja Instansi Pemerintah (LKjIP) Stasiun Klimatologi Papua Barat, bagian dari SAKIP, terbuka untuk masyarakat dan pemangku kepentingan."], "wilayah": ["Info Iklim Wilayah Saya – Kabupaten di Papua Barat & Papua Barat Daya", "Cek iklim, curah hujan, sifat hujan, hari tanpa hujan, dan zona musim untuk kabupaten dan distrik Anda: Manokwari, Sorong, Fakfak, Kaimana, Teluk Bintuni, Teluk Wondama, Raja Ampat, Maybrat, Tambrauw, Pegunungan Arfak, Manokwari Selatan, dan lainnya."], "prakiraan-musim": ["Prediksi Musim Hujan Papua Barat 2026/2027 – BMKG", "Prediksi awal, sifat, dan puncak musim hujan 2026/2027 per Zona Musim (ZOM) di Papua Barat dan Papua Barat Daya dari BMKG Stasiun Klimatologi Papua Barat."], "prakiraan-musim-kemarau": ["Prediksi Musim Kemarau Papua Barat – BMKG", "Prediksi awal, sifat, dan puncak musim kemarau per Zona Musim di Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat (BMKG)."], "hujan-bulanan": ["Curah Hujan Bulanan Papua Barat – Analisis & Prakiraan", "Analisis curah hujan dan sifat hujan bulan lalu serta prakiraan hujan 3 bulan ke depan per kabupaten di Papua Barat dan Papua Barat Daya (Manokwari, Sorong, Fakfak, dan lainnya)."], "informasi-dasarian": ["Informasi Dasarian Papua Barat – Curah Hujan 10 Harian", "Analisis dan prakiraan curah hujan dasarian (10 harian) per kabupaten dan distrik di Papua Barat dan Papua Barat Daya dari BMKG Stasiun Klimatologi Papua Barat."], "pos-hujan": ["Data Pos Hujan Papua Barat & Papua Barat Daya – Curah Hujan Harian", "Data curah hujan harian dan bulanan dari pos hujan di Papua Barat dan Papua Barat Daya sejak 2018, lengkap dengan peta, perbandingan terhadap normal 1991–2020, dan grafik per pos. BMKG Stasiun Klimatologi Papua Barat."], "hari-tanpa-hujan": ["Hari Tanpa Hujan (HTH) Papua Barat – Monitoring Kekeringan", "Monitoring hari tanpa hujan berturut-turut (HTH) di pos hujan Papua Barat dan Papua Barat Daya dari BMKG Stasiun Klimatologi Papua Barat."], "peringatan-kekeringan": ["Peringatan Dini Kekeringan Papua Barat – SPI BMKG", "Peringatan dini kekeringan meteorologis dan indeks SPI untuk Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat (BMKG)."], "peringatan-hujan-tinggi": ["Peringatan Dini Curah Hujan Tinggi Papua Barat – BMKG", "Peringatan dini curah hujan tinggi untuk Papua Barat dan Papua Barat Daya: waspada, siaga, dan awas per wilayah dari BMKG Stasiun Klimatologi Papua Barat."], "enso-iod": ["ENSO, IOD, MJO & Gelombang Atmosfer – Dinamika Iklim Papua Barat", "Pemantauan El Niño, La Niña, Indian Ocean Dipole (IOD), MJO, serta gelombang Kelvin dan Rossby terkini dan pengaruhnya terhadap curah hujan di Papua Barat dan Papua Barat Daya."], "iklim-papua-barat": ["Iklim Papua Barat & Papua Barat Daya – Pola Hujan & Suhu", "Kondisi iklim Papua Barat dan Papua Barat Daya: pola curah hujan, suhu, dan musim di Manokwari, Sorong, dan kabupaten lainnya, dari BMKG Stasiun Klimatologi Papua Barat."], "zona-musim": ["Zona Musim (ZOM) Papua Barat & Papua Barat Daya", "Daftar Zona Musim (ZOM) dan wilayah Non-ZOM di Papua Barat dan Papua Barat Daya beserta kabupaten dan distriknya, dasar prediksi musim BMKG."], "peralatan": ["Data Cuaca Langsung AWS & ARG Papua Barat – Manokwari, Sorong", "Data cuaca langsung dari AWS dan ARG BMKG di Papua Barat dan Papua Barat Daya: suhu, kelembapan, angin, tekanan, dan curah hujan hari ini, plus rekap harian yang bisa diunduh (CSV)."], "layanan-data": ["ClimaX Dulu – Layanan Permintaan Data Iklim Papua Barat | Staklim Papua Barat BMKG", "ClimaX Dulu merupakan layanan resmi Stasiun Klimatologi Papua Barat untuk permintaan data iklim BMKG secara online: curah hujan, suhu udara, hari tanpa hujan, dan parameter klimatologi lainnya di Papua Barat dan Papua Barat Daya."], "publikasi": ["Publikasi & Buletin Iklim Papua Barat – Staklim Pabar", "Unduh Buletin Iklim bulanan, prediksi musim, dan publikasi Stasiun Klimatologi Papua Barat (BMKG) untuk Papua Barat dan Papua Barat Daya."], "berita": ["Berita Iklim & Kegiatan Staklim Papua Barat", "Berita kegiatan Stasiun Klimatologi Papua Barat, siaran pers BMKG, dan liputan media tentang iklim di Papua Barat dan Papua Barat Daya."], "kebijakan-privasi": ["Kebijakan Privasi & Penafian – Staklim Papua Barat", "Kebijakan privasi dan penafian situs Stasiun Klimatologi Papua Barat (BMKG): data yang diproses, penyimpanan di perangkat, dan batas penggunaan informasi iklim."], "aksesibilitas": ["Pernyataan Aksesibilitas – Staklim Papua Barat", "Upaya Stasiun Klimatologi Papua Barat (BMKG) agar informasi iklim di situs ini bisa dipakai semua orang, keterbatasan yang diketahui, dan cara melaporkan kendala."], "admin": ["Admin – Staklim Papua Barat", "Halaman admin."]};
const META_KW="staklim papua barat, staklim pabar, staklim papbar, staklim pb, staklim pbd, staklim manokwari, stasiun klimatologi papua barat, stasiun klimatologi kelas III papua barat, stasiun klimatologi manokwari, klimatologi papua barat, klimatologi manokwari, bmkg papua barat, bmkg pabar, bmkg papbar, bmkg manokwari, bmkg papua barat daya, bmkg pbd, bmkg sorong, iklim papua barat, iklim papua barat daya, cuaca manokwari, cuaca papua barat, cuaca sorong, curah hujan manokwari, curah hujan papua barat, musim hujan papua barat, musim kemarau papua barat, prakiraan musim papua barat, buletin iklim papua barat, peringatan dini kekeringan papua barat, aws manokwari, stalkim papua barat, staklim papua bart, stasiun klimatologi papabarat, bmgk papua barat, bmkg manokwary, staklim papuabarat";
/* halaman iklim per kabupaten/kota, mis. /iklim-kota-sorong (dibuat dari daftar kabupaten) */
const slugKab=k=>"iklim-"+k.toLowerCase().replace("kab. ","kabupaten-").replace(/ /g,"-");
const namaKab=k=>k.replace(/^Kab\. /,"Kabupaten ");
const KAB_HAL={};["Manokwari","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana"].forEach(k=>KAB_HAL[slugKab(k)]=[k,"pb"]);["Kota Sorong","Kab. Sorong","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw"].forEach(k=>KAB_HAL[slugKab(k)]=[k,"pbd"]);
const dinamis=k=>k.startsWith("berita-")||k.startsWith("alat-")||!!KAB_HAL[k];
function metaKab(k){const [kab,p]=KAB_HAL[k],n=namaKab(kab),prov=p==="pbd"?"Papua Barat Daya":"Papua Barat";
 return ["Prakiraan Hujan & Iklim "+n+" – BMKG "+prov,"Info iklim dan cuaca "+n+", "+prov+": curah hujan bulan lalu, prakiraan hujan 3 bulan ke depan, hari tanpa hujan, peringatan kekeringan, zona musim, dan data hujan langsung dari BMKG Stasiun Klimatologi Papua Barat."]}
function halKab(k){const [kab,p]=KAB_HAL[k],n=namaKab(kab),prov=p==="pbd"?"Papua Barat Daya":"Papua Barat";
 return head(`<a href="#wilayah">Info Wilayah</a> &gt;&gt; ${esc(n)}`,`Iklim &amp; Prakiraan Hujan ${esc(n)}`,`Ringkasan iklim ${esc(n)}, Provinsi ${prov}: analisis dan prakiraan curah hujan, sifat hujan, hari tanpa hujan, kekeringan, prediksi musim, serta data hujan dan cuaca langsung dari alat BMKG. Diperbarui otomatis setiap ada buletin dan data terbaru.`)+
 `<div id="wilIsi">${isiWilayah(kab,"")}</div>
 <section class="sec" data-lipat><div class="sechead"><div><span class="eyebrow">Wilayah lain</span><h2>Iklim Kabupaten/Kota Lain</h2></div><a class="more" href="#wilayah">Pilih per distrik →</a></div>
 <div class="kabgrid">${Object.entries(KAB_HAL).filter(([s])=>s!==k).map(([s,[kb,pp]])=>`<a href="#${s}"><b>${esc(namaKab(kb))}</b><span>${pp==="pbd"?"Papua Barat Daya":"Papua Barat"}</span></a>`).join("")}</div></section>`}
/* alamat halaman: di hosting memakai alamat biasa (/prakiraan-musim) agar tiap halaman dikenal Google; di pratinjau memakai #  */
const RUTE_PATH=!!window.RUTE_PATH&&/^https?:$/.test(location.protocol);
const urlHal=k=>RUTE_PATH?(k==="beranda"?"/":"/"+k):"#"+k;
function halDariLokasi(){let k=location.hash.slice(1);if(!k&&RUTE_PATH){k=decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g,"").replace(/\.html$/,"");if(k==="index"||k==="404")k=""}
 if(k==="kontak")k="layanan-data";return k||"beranda"}
let cur=halDariLokasi();
/* tautan lama (#halaman) diganti ke alamat baru tanpa menambah riwayat */
if(RUTE_PATH&&location.hash.length>1){try{history.replaceState(history.state,"",urlHal((P[cur]||dinamis(cur))?cur:"beranda"))}catch(e){}}
function setMeta(nama,isi,prop){let m=document.head.querySelector(prop?`meta[property="${nama}"]`:`meta[name="${nama}"]`);if(!m){m=document.createElement("meta");m.setAttribute(prop?"property":"name",nama);document.head.appendChild(m)}m.setAttribute("content",isi)}
function pasangMeta(k){let [t,d]=KAB_HAL[k]?metaKab(k):META_HAL[k]||[];
 if(k.startsWith("alat-")){const a=ALAT.find(x=>x.id===k.slice(5));if(a){t=a.nama+" – Data Cuaca Langsung"+(a.wil?" "+a.wil:"")+" | BMKG Papua Barat";d="Data langsung "+a.nama+(a.wil?" ("+a.wil+")":"")+": "+(a.jenis==="AWS"?"suhu, kelembapan, angin, tekanan, dan ":"")+"curah hujan hari ini, grafik 24 jam, dan rekap harian. Stasiun Klimatologi Papua Barat, BMKG."}}
 if(k.startsWith("berita-")){const h=app.querySelector("h1");if(h)t=h.textContent.trim()+" – Staklim Papua Barat";const p=app.querySelector("article p,.bisi p,p");if(p)d=p.textContent.trim().slice(0,160)}
 t=t||META_HAL.beranda[0];d=d||META_HAL.beranda[1];document.title=t;setMeta("description",d);setMeta("og:title",t,1);setMeta("og:description",d,1);
 if(RUTE_PATH){const u=location.origin+urlHal(k);setMeta("og:url",u,1);let c=document.head.querySelector('link[rel="canonical"]');if(!c){c=document.createElement("link");c.rel="canonical";document.head.appendChild(c)}c.href=u}
 setMeta("robots",k==="admin"?"noindex,nofollow":"index,follow")}
/* ubah tautan #halaman menjadi alamat biasa agar bisa dibaca mesin pencari dan dibuka di tab baru */
function rapikanTautan(akar){if(!RUTE_PATH)return;(akar||document).querySelectorAll('a[href^="/"]:not([data-hal])').forEach(a=>{const k=a.getAttribute("href").slice(1).split("?")[0]||"beranda";if(P[k]||dinamis(k))a.dataset.hal=k});(akar||document).querySelectorAll('a[href^="#"]').forEach(a=>{const k=a.getAttribute("href").slice(1);if(k&&(P[k]||dinamis(k)||k==="kontak")){a.dataset.hal=k==="kontak"?"layanan-data":k;a.setAttribute("href",urlHal(a.dataset.hal))}})}
try{history.scrollRestoration="manual"}catch(e){}
/* pindah halaman = entri riwayat baru, jadi tombol Back browser/HP kembali ke halaman sebelumnya di web ini */

/* ===== POS HUJAN: pembaca data — POS_INTI_MULAI =====
   Dipakai di tiga tempat dengan kode yang sama: halaman web, tab Admin "Pos Hujan" (membaca Excel unggahan),
   dan skrip pembangun data bawaan. Format Excel: satu lembar per bulan (nama lembar = nama bulan),
   kolom PROVINSI, KABUPATEN, KECAMATAN, POS, bujur, lintang, lalu tanggal 1..31.
   Aturan isi sel: angka = curah hujan (mm); "-" = tidak hujan (0 mm); kosong = tidak tercatat;
   9999/8888, "TTU", "ALAT RUSAK", atau angka > 600 mm = tidak dipakai. */
const PH_BLN=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"];
const PH_SINGKAT={jan:1,feb:2,peb:2,mar:3,apr:4,mei:5,may:5,jun:6,jul:7,agu:8,agt:8,ags:8,aug:8,sep:9,okt:10,oct:10,nov:11,nop:11,des:12,dec:12};
function phBulan(nama){const t=String(nama==null?"":nama).trim().toLowerCase();const i=PH_BLN.findIndex(b=>t.startsWith(b));if(i>=0)return i+1;const m=t.match(/^([a-z]{3})(?![a-z])/);return (m&&PH_SINGKAT[m[1]])||0}
function phNilai(s){const t=String(s==null?"":s).trim();if(!t)return null;if(/^[-–—]+$/.test(t))return 0;const v=Number(t.replace(",","."));if(!isFinite(v)||v<0||v>600)return null;return Math.round(v*10)/10}
function phLembar(rows){if(!Array.isArray(rows))return null;let hr=-1,d1=-1;const sel=(r,j)=>String((r||[])[j]==null?"":(r||[])[j]).trim();
 for(let i=0;i<Math.min(rows.length,8)&&hr<0;i++){const r=rows[i]||[];for(let j=0;j+2<r.length;j++)if(sel(r,j)==="1"&&sel(r,j+1)==="2"&&sel(r,j+2)==="3"){hr=i;d1=j;break}}
 if(hr<0)return null;let nh=0;while(nh<31&&sel(rows[hr],d1+nh)===String(nh+1))nh++;if(nh<28)return null;
 const kol={};for(let i=0;i<=hr;i++)(rows[i]||[]).slice(0,d1).forEach((c,j)=>{const u=String(c==null?"":c).trim().toUpperCase();if(["PROVINSI","KABUPATEN","KECAMATAN","POS"].includes(u))kol[u]=j});
 if(kol.POS==null)return null;const jp=kol.POS,jk=kol.KABUPATEN!=null?kol.KABUPATEN:jp-2,jc=kol.KECAMATAN!=null?kol.KECAMATAN:jp-1,jv=kol.PROVINSI!=null?kol.PROVINSI:Math.max(0,jk-1);
 const angka=x=>{const v=parseFloat(String(x==null?"":x).replace(",","."));return isFinite(v)?v:null},baris=[];
 for(const r of rows.slice(hr+1)){const pos=sel(r,jp).replace(/\s+/g," ");if(!pos||/^pos( hujan)?$/i.test(pos)||/^(jumlah|rata-?rata|total|keterangan)\b/i.test(pos))continue;
  const v=[];for(let d=0;d<nh;d++)v.push(phNilai((r||[])[d1+d]));
  const lon=angka((r||[])[jp+1]),lat=angka((r||[])[jp+2]);
  baris.push({prov:sel(r,jv),kab:sel(r,jk),kec:sel(r,jc),pos,lon:lon!=null&&lon>120&&lon<140?lon:null,lat:lat!=null&&lat>-10&&lat<5?lat:null,v})}
 return {nh,baris}}
const phNorm=s=>String(s==null?"":s).toLowerCase().replace(/\s+/g," ").trim();
const phSlug=s=>phNorm(s).replace(/\(+[^()]*\)+/g," ").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,50)||"pos";
function phIdPos(nama,alias){const n=phNorm(nama);if(alias[n])return alias[n];const t=n.replace(/\(+[^()]*\)+/g," ").replace(/\s+/g," ").trim();return alias[t]||null}
const PH_KAB=[["Manokwari Selatan",/man(?:okw|owk)ari\s*sel/i,"pb"],["Manokwari",/man(?:okw|owk)ari/i,"pb"],["Pegunungan Arfak",/arfak/i,"pb"],["Teluk Bintuni",/bintuni/i,"pb"],["Teluk Wondama",/wondama/i,"pb"],["Fakfak",/fak\s*-?\s*fak/i,"pb"],["Kaimana",/kaimana/i,"pb"],
 ["Kota Sorong",/kota\s*sorong/i,"pbd"],["Sorong Selatan",/sorong\s*sel/i,"pbd"],["Raja Ampat",/raja\s*ampat/i,"pbd"],["Maybrat",/maybrat/i,"pbd"],["Tambrauw",/tambrauw/i,"pbd"],["Kab. Sorong",/sorong/i,"pbd"]];
function phKab(s){const t=String(s==null?"":s);const k=PH_KAB.find(x=>x[1].test(t));return k?{kab:k[0],prov:k[2]}:{kab:t.trim().toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()),prov:""}}
/* gabungkan dua baris pos yang sama pada bulan yang sama: yang datanya lebih banyak menjadi dasar, kekosongan diisi dari yang lain */
function phGabung(a,b){const na=a.filter(x=>x!=null).length,nb=b.filter(x=>x!=null).length,[d,l]=nb>na?[b,a]:[a,b];return d.map((x,i)=>x!=null?x:(l[i]!=null?l[i]:null))}
/* lembar: [{nama, rows}] -> {bulan:{1:{id:[...]}}, pos_baru:[...], catatan:[...]} */
function phSusunTahun(lembar,reg){const alias=(reg&&reg.alias)||{},kenal=new Set(((reg&&reg.pos)||[]).map(p=>p.id)),baru={},out={},cat=[],dilewati=[];
 for(const L of lembar||[]){const m=phBulan(L.nama);if(!m){dilewati.push(String(L.nama));continue}const p=phLembar(L.rows);if(!p){cat.push(`Lembar "${L.nama}" tidak berformat data pos hujan, dilewati.`);continue}
  const B=out[m]=out[m]||{};
  for(const r of p.baris){if(!r.v.some(x=>x!=null))continue;let id=phIdPos(r.pos,alias);
   if(!id){id=phSlug(r.pos);if(!kenal.has(id)&&!baru[id]){const k=phKab(r.kab);baru[id]={id,n:r.pos,kab:k.kab,kec:r.kec,prov:k.prov,lon:r.lon,lat:r.lat}}
    else if(baru[id]&&r.lon!=null){baru[id].lon=r.lon;baru[id].lat=r.lat}}
   B[id]=B[id]?phGabung(B[id],r.v):r.v}}
 return {bulan:out,pos_baru:Object.values(baru),catatan:cat,dilewati}}
function phStat(v){let tot=0,hh=0,mx=-1,tmx=0,n=0,akhir=0;(v||[]).forEach((x,i)=>{if(x==null)return;n++;akhir=i+1;tot+=x;if(x>=1)hh++;if(x>mx){mx=x;tmx=i+1}});
 return {tot:Math.round(tot*10)/10,hh,mx:mx<0?null:mx,tmx,n,akhir,lengkap:n>0&&akhir>=(v||[]).length-5}}
const PH_KAT_CH=["Rendah","Menengah","Tinggi","Sangat Tinggi"],PH_KAT_SH=["Bawah Normal","Normal","Atas Normal"];
const phKatCH=t=>t<100?0:t<300?1:t<500?2:3;
const phKatSH=p=>p==null||!isFinite(p)?null:p<85?0:p<=115?1:2;
/* ===== POS_INTI_SELESAI ===== */

/* ===================== DATA POS HUJAN =====================
   Data bawaan ada di /data/pos-hujan/<tahun>.json (dibangun dari Excel Data_CH_Pos_Utama di Drive kantor).
   Unggahan petugas (Admin > Pos Hujan) disimpan robot admin dan menggantikan data bawaan tahun yang sama. */
const PH={reg:null,kv:null,th:{},bulan:"",prov:"",warna:"ch"};
const PH_DIR="/data/pos-hujan/",PH_PROV={pb:"Papua Barat",pbd:"Papua Barat Daya"};
const PH_URUT_KAB=["Manokwari","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama","Fakfak","Kaimana","Kota Sorong","Kab. Sorong","Sorong Selatan","Raja Ampat","Maybrat","Tambrauw"];
const PH_KET_CH=["&lt; 100 mm","100–300 mm","300–500 mm","&gt; 500 mm"],PH_KET_SH=["&lt; 85% normal","85–115% normal","&gt; 115% normal"];
const phAdmin=()=>typeof ADM_PASS!=="undefined"&&!!ADM_PASS;
const phAtur=()=>{const a=(typeof KA!=="undefined"&&KA&&KA.pengaturan&&KA.pengaturan.poshujan)||{};return {sampai:/^\d{4}-\d{2}$/.test(a.sampai||"")?a.sampai:"",dasarian:!!a.dasarian}};
const phTertahan=ym=>{const b=phAtur().sampai;return !!b&&ym>b};
const phJSON=async u=>{const r=await fetch(u,{cache:"no-cache",headers:phAdmin()&&u.indexOf(KONTEN_URL+"/poshujan")===0?{"X-Admin":ADM_PASS}:{}});if(!r.ok)throw new Error("HTTP "+r.status);return r.json()};
const phMm=v=>v==null?"–":(Math.round(v*10)/10).toLocaleString("id-ID",{maximumFractionDigits:1});
const phUrutKab=k=>{const i=PH_URUT_KAB.indexOf(k);return i<0?99:i};
const phNamaBulan=ym=>{const [t,m]=String(ym).split("-");return BL[+m-1]+" "+t};
function phDaftarPos(){const m=new Map(((PH.reg&&PH.reg.pos)||[]).map(p=>[p.id,p]));Object.values(PH.th).forEach(d=>(d.pos_baru||[]).forEach(p=>{if(!m.has(p.id))m.set(p.id,p)}));return m}
function phInfoTahun(t){return (PH.kv&&PH.kv[t])||((PH.reg&&PH.reg.tahun)||{})[t]||null}
function phBulanAda(){const s=new Set(Object.keys((PH.reg&&PH.reg.tahun)||{}));Object.keys(PH.kv||{}).forEach(t=>s.add(t));const out=[];
 [...s].forEach(t=>((phInfoTahun(t)||{}).bulan||[]).forEach(m=>out.push(t+"-"+String(m).padStart(2,"0"))));return out.filter(ym=>phAdmin()||!phTertahan(ym)).sort().reverse()}
function phBulanSemua(){const s=new Set(Object.keys((PH.reg&&PH.reg.tahun)||{}));Object.keys(PH.kv||{}).forEach(t=>s.add(t));const out=[];[...s].forEach(t=>((phInfoTahun(t)||{}).bulan||[]).forEach(m=>out.push(t+"-"+String(m).padStart(2,"0"))));return out.sort().reverse()}
function phLengkap(ym){const [t,m]=ym.split("-"),L=((phInfoTahun(t)||{}).lengkap||{})[+m];return L?{l:L[0],n:L[1]}:null}
function phBulanAwal(){const b=phBulanAda().filter(ym=>!phTertahan(ym)).concat(phBulanAda().filter(phTertahan));for(const ym of b){const i=phLengkap(ym);if(i&&i.n&&i.l/i.n>=.5)return ym}return b[0]||""}
async function phAmbilTahun(t){if(PH.th[t])return PH.th[t];let d=null;
 if(PH.kv&&PH.kv[t]){try{d=await phJSON(KONTEN_URL+"/poshujan/"+t)}catch(e){d=null}}
 if(!d)d=await phJSON(PH_DIR+t+".json");
 if(!phAdmin()&&phAtur().sampai&&d&&d.bulan){d={...d,bulan:{...d.bulan}};Object.keys(d.bulan).forEach(m=>{if(phTertahan(t+"-"+String(m).padStart(2,"0")))delete d.bulan[m]})}
 PH.th[t]=d;return d}
function phBaris(ym,prov){const [t,mm]=ym.split("-"),m=+mm,d=PH.th[t],B=(d&&d.bulan&&d.bulan[m])||{},pos=phDaftarPos(),out=[];
 Object.entries(B).forEach(([id,v])=>{const p=pos.get(id);if(!p||(prov&&p.prov!==prov))return;const s=phStat(v),nor=p.nor?p.nor[m-1]:null,pn=s.lengkap&&nor?Math.round(s.tot/nor*100):null;
  out.push({p,v,s,nor,pn,kc:phKatCH(s.tot),ks:phKatSH(pn)})});
 return out.sort((a,b)=>phUrutKab(a.p.kab)-phUrutKab(b.p.kab)||a.p.n.localeCompare(b.p.n,"id"))}
const phSiap=()=>!!(PH.reg&&PH.bulan&&PH.th[PH.bulan.slice(0,4)]);
P["pos-hujan"]=()=>head("Iklim >> Data Pos Hujan","Data Pos Hujan","Curah hujan harian dari pos-pos hujan di Papua Barat dan Papua Barat Daya, dibandingkan dengan normalnya (rata-rata 1991–2020).")+`<div class="minta-data"><div><b>Butuh data harian per pos hujan?</b><p>Halaman ini menampilkan grafik. Data angka bisa diminta lewat Permintaan Pelayanan Data, gratis (Rp0) untuk pendidikan, penelitian, penanggulangan bencana, dan kegiatan non-komersial lainnya.</p></div><a class="pbtn" href="#layanan-data" data-pd-minta="Curah hujan harian pos hujan (sebutkan nama pos)">Minta data pos hujan</a></div>`
 +`<div id="phIsi" class="phwrap">${phSiap()?phIsi():`<div class="card ph-muat"><span class="ph-putar" aria-hidden="true"></span> Memuat data pos hujan…</div>`}</div>`;
async function pasangPosHujan(){const box=document.getElementById("phIsi");if(!box)return;
 try{if(!PH.reg)PH.reg=await phJSON(PH_DIR+"pos.json");
  if(!PH.kv){try{PH.kv=(await phJSON(KONTEN_URL+"/poshujan")).tahun||{}}catch(e){PH.kv={}}}
  if(!PH.nk&&!PH.nkMuat){PH.nkMuat=1;phJSON(PH_DIR+"normal-kab.json").then(d=>{PH.nk=d;if(cur==="pos-hujan"&&document.querySelector("#phIsi .ph-bar"))phGambar()}).catch(()=>{})}
  if(!PH.bulan||!phBulanAda().includes(PH.bulan))PH.bulan=phBulanAwal();
  if(!PH.bulan)throw new Error("kosong");
  await phAmbilTahun(PH.bulan.slice(0,4));if(cur!=="pos-hujan")return;if(!box.querySelector(".ph-bar"))phGambar()}
 catch(e){if(cur!=="pos-hujan")return;box.innerHTML=`<div class="card ph-muat">Data pos hujan belum dapat dimuat. ${location.protocol==="file:"?"Halaman ini perlu dibuka dari alamat web, bukan dari file.":"Periksa koneksi internet, lalu muat ulang halaman."}</div>`}}
function phGambar(){const box=document.getElementById("phIsi");if(!box)return;box.innerHTML=phIsi();pasangIstilah(box);if(PH.tip)PH.tip.hidden=true}
function phIsi(){const ym=PH.bulan,rows=phBaris(ym,PH.prov),semua=phBulanAda(),i=semua.indexOf(ym),info=phLengkap(ym)||{l:0,n:0};
 const lengkap=rows.filter(r=>r.s.lengkap),sementara=info.n&&info.l/info.n<.5,akhir=Math.max(0,...rows.map(r=>r.s.akhir));
 const [t]=ym.split("-"),src=PH.kv&&PH.kv[t]?`unggahan petugas, ${tglPendek(String(PH.kv[t].diubah||"").slice(0,10))}`:"arsip Excel pos hujan kantor";
 return `<div class="ph-bar" role="group" aria-label="Pilihan data">
  <div class="ph-bln"><button type="button" class="ph-geser" data-ph-geser="1" aria-label="Bulan sebelumnya"${i>=semua.length-1?" disabled":""}>‹</button>
   <label class="ph-pilih"><span>Bulan</span><select id="phBulan">${semua.map(x=>`<option value="${x}"${x===ym?" selected":""}>${phNamaBulan(x)}${phTertahan(x)?" (belum publik)":""}</option>`).join("")}</select></label>
   <button type="button" class="ph-geser" data-ph-geser="-1" aria-label="Bulan berikutnya"${i<=0?" disabled":""}>›</button></div>
  <div class="ph-seg" role="radiogroup" aria-label="Wilayah">${[["","Semua"],["pb","Papua Barat"],["pbd","Papua Barat Daya"]].map(([k,n])=>`<button type="button" role="radio" aria-checked="${PH.prov===k}" data-ph-prov="${k}">${n}</button>`).join("")}</div>
  <div class="ph-seg" role="radiogroup" aria-label="Warna peta">${[["ch","Curah hujan"],["sh","Dibanding normal"],["nor","Normal"]].map(([k,n])=>`<button type="button" role="radio" aria-checked="${PH.warna===k}" data-ph-warna="${k}">${n}</button>`).join("")}</div>
  ${phAtur().dasarian||phAdmin()?`<div class="ph-seg" role="radiogroup" aria-label="Rentang waktu">${[["","Per bulan"],["das","Per dasarian"]].map(([k,n])=>`<button type="button" role="radio" aria-checked="${(PH.mode||"")===k}" data-ph-mode="${k}">${n}</button>`).join("")}</div>`:""}</div>
 ${phTertahan(ym)?`<p class="ph-catat">🔒 Data ${phNamaBulan(ym)} <b>belum tampil ke publik</b>. Hanya terlihat karena Anda masuk sebagai Admin. Atur di Admin › Pos Hujan.</p>`:""}
 ${PH.mode==="das"&&!phAtur().dasarian&&phAdmin()?`<p class="ph-catat">🔒 Tampilan per dasarian <b>belum diaktifkan untuk publik</b>. Hanya terlihat oleh Admin.</p>`:""}
 ${sementara?`<p class="ph-catat">⏳ Data ${phNamaBulan(ym)} masih <b>sementara</b>: sebagian besar pos baru tercatat sampai tanggal ${akhir}. Perbandingan dengan normal ditampilkan setelah datanya lengkap.</p>`:""}
 ${rows.length?phKpi(rows,lengkap,ym)+`<div class="ph-dua"><section class="card ph-peta"><div class="ph-kh"><h2>${PH.warna==="nor"?"Peta normal curah hujan":"Peta pos hujan"}</h2><span>${PH.warna==="nor"?"Rata-rata "+BL[+ym.slice(5)-1]+" 1991–2020":phNamaBulan(ym)}</span></div>${phPeta(rows)}${phLegenda()}</section>
  <section class="card ph-kab">${PH.warna==="nor"?`<div class="ph-kh"><h2>Normal per kabupaten/kota</h2><span>${BL[+ym.slice(5)-1]}, rata-rata 1991–2020</span></div>${phKabNormal(+ym.slice(5))}`:`<div class="ph-kh"><h2>Rata-rata per kabupaten/kota</h2><span>${lengkap.length} pos data lengkap</span></div>${phKabHTML(lengkap.length?lengkap:rows)}`}</section></div>
  ${PH.mode==="das"&&(phAtur().dasarian||phAdmin())?`<section class="card ph-tabel"><div class="ph-kh"><h2>Curah hujan per dasarian</h2><span>Dasarian I = tanggal 1–10, II = 11–20, III = 21–akhir bulan</span></div>${phTabelDas(rows,ym)}</section>`:""}
  <section class="card ph-tabel"><div class="ph-kh"><h2>Rekap per pos</h2><span>Ketuk nama pos untuk melihat grafik harian dan bulanan</span></div>${phTabel(rows)}</section>`
  :`<div class="card ph-muat">Belum ada data pos hujan untuk ${phNamaBulan(ym)}${PH.prov?" di "+PH_PROV[PH.prov]:""}.</div>`}
 <p class="note">Sumber: pengamatan pos hujan kerja sama BMKG di Papua Barat dan Papua Barat Daya (${escH(src)}). Normal: ${escH((PH.reg&&PH.reg.normal)||"rata-rata 1991–2020")}. Angka di tabel adalah hasil pengamatan apa adanya, belum melalui kendali mutu lengkap.</p>
 ${awam("Cara membaca data pos hujan",[
  "<b>Curah hujan</b> adalah jumlah air hujan yang tertampung di alat penakar selama sebulan, dalam milimeter (mm). 1 mm sama dengan 1 liter air di atas 1 meter persegi tanah.",
  "<b>Dibanding normal</b> membandingkan hujan bulan ini dengan rata-rata bulan yang sama tahun 1991–2020. Di bawah 85% berarti <b>bawah normal</b> (lebih kering dari biasanya), 85–115% <b>normal</b>, di atas 115% <b>atas normal</b> (lebih basah).",
  "<b>Hari hujan</b> adalah jumlah hari dengan hujan minimal 1 mm. <b>Data lengkap</b> berarti pos mencatat sampai akhir bulan; pos yang datanya terputus tetap ditampilkan tetapi tidak dibandingkan dengan normal.",
  "Tanda <b>“-”</b> di formulir pos dibaca sebagai tidak hujan (0 mm), sel kosong dibaca tidak tercatat, dan kode 9999/8888 tidak dipakai."])}`}
function phKpi(rows,lengkap,ym){const dasar=lengkap.length?lengkap:rows,rata=dasar.reduce((a,r)=>a+r.s.tot,0)/dasar.length,mx=rows.reduce((a,r)=>r.s.mx!=null&&(!a||r.s.mx>a.s.mx)?r:a,null);
 const sif=[0,1,2].map(k=>lengkap.filter(r=>r.ks===k).length),nsif=sif.reduce((a,b)=>a+b,0),dom=nsif?sif.indexOf(Math.max(...sif)):-1;
 const [t,m]=ym.split("-");
 return `<div class="ph-kpi">
  <div class="ph-st"><span>Pos melapor</span><b>${rows.length}</b><small>${lengkap.length===rows.length?"semua data lengkap":lengkap.length+" dengan data lengkap"}</small></div>
  <div class="ph-st"><span>Rata-rata curah hujan</span><b>${phMm(Math.round(rata))}<i> mm</i></b><small>kategori ${PH_KAT_CH[phKatCH(rata)].toLowerCase()}</small></div>
  <div class="ph-st"><span>Dibanding normal</span>${dom>=0?`<b>${PH_KAT_SH[dom]}</b><small>${sif[dom]} dari ${nsif} pos</small><div class="ph-segbar" role="img" aria-label="${sif.map((n,k)=>PH_KAT_SH[k]+" "+n+" pos").join(", ")}">${sif.map((n,k)=>n?`<i class="ph-s${k}" style="flex:${n}"></i>`:"").join("")}</div>`:`<b class="ph-redup">–</b><small>menunggu data lengkap</small>`}</div>
  <div class="ph-st"><span>Hujan harian tertinggi</span>${mx?`<b>${phMm(mx.s.mx)}<i> mm</i></b><small>${escH(mx.p.n)} · ${mx.s.tmx} ${BLN[+m-1]} ${t}</small>`:`<b class="ph-redup">–</b>`}</div></div>`}
/* ---- peta: titik pos digeser sedikit bila bertumpuk, dengan garis tipis ke letak sebenarnya ---- */
function phPeta(rows){const VB=[100,112,545,450],R=5.6,nor=PH.warna==="nor",m=+PH.bulan.slice(5),NK=PH.nk;
 if(nor&&!PH.grid&&!PH.gridMuat){PH.gridMuat=1;phGrid().then(()=>{if(cur==="pos-hujan")phGambar()}).catch(()=>{PH.gridMuat=0})}
 const sel=nor&&PH.grid?`<g class="ph-sel" shape-rendering="crispEdges">${PH.grid.g.map(r=>`<rect x="${((r[0]-128.6)*100-2.6).toFixed(1)}" y="${((1.4-r[1])*100-2.6).toFixed(1)}" width="5.2" height="5.2" class="nr${kelasNormal(r[1+m])}"/>`).join("")}</g>`:"";
 const batas=NK?Object.entries(NK.batas).map(([k,d])=>{const a=nor&&normalDasar(k);return `<path d="${d}" class="ph-batas"${a?` data-tip="${escH("Normal "+BL[m-1]+" "+a[m-1]+" mm|"+namaKab(k)+" (rata-rata wilayah)")}"`:""}/>`}).join(""):"";
 const t=rows.filter(r=>r.p.lon!=null&&r.p.lat!=null).map(r=>{const [x,y]=gpXY(r.p.lat,r.p.lon);return {r,x0:x,y0:y,x,y}});
 for(let it=0;it<80;it++){for(let a=0;a<t.length;a++)for(let b=a+1;b<t.length;b++){const A=t[a],B=t[b];let dx=B.x-A.x,dy=B.y-A.y,dd=Math.hypot(dx,dy);const min=2*R+1.6;
   if(dd<min){if(dd<.01){dx=Math.cos(a+b);dy=Math.sin(a+b);dd=1}const g=(min-dd)/2;A.x-=dx/dd*g;A.y-=dy/dd*g;B.x+=dx/dd*g;B.y+=dy/dd*g}}
  t.forEach(p=>{p.x+=(p.x0-p.x)*.04;p.y+=(p.y0-p.y)*.04})}
 const kelas=r=>nor?"ph-nn":PH.warna==="sh"?(r.ks==null?"ph-na":"ph-s"+r.ks):"ph-c"+r.kc;
 const tip=r=>nor?`${r.nor!=null?"Normal "+phMm(r.nor)+" mm":"Normal belum ada"} · bulan ini ${phMm(r.s.tot)} mm|${r.p.n} · ${r.p.kab}`:`${phMm(r.s.tot)} mm${r.pn!=null?" · "+r.pn+"% normal ("+PH_KAT_SH[r.ks].toLowerCase()+")":r.s.lengkap?"":" · data belum lengkap"}|${r.p.n} · ${r.p.kab}`;
 return `<div class="ph-petawrap"><svg class="ph-svg" viewBox="${VB.join(" ")}" role="group" aria-label="Peta ${t.length} pos hujan; rincian angka ada di tabel Rekap per pos">
 <rect x="${VB[0]}" y="${VB[1]}" width="${VB[2]}" height="${VB[3]}" class="ph-laut"/><path d="${GEMPA_PETA.l}" class="ph-darat"/><path d="${GEMPA_PETA.o}" class="ph-kita"/>${sel}${batas}${nor&&!PH.grid?`<text x="${VB[0]+VB[2]/2}" y="${VB[1]+30}" text-anchor="middle" class="ph-kota">Memuat peta normal…</text>`:""}
 ${GP_KOTA.map(([n,la,lo])=>{const [a,c]=gpXY(la,lo);return `<text x="${a}" y="${c-14}" class="ph-kota" text-anchor="middle">${n}</text>`}).join("")}
 ${t.filter(p=>Math.hypot(p.x-p.x0,p.y-p.y0)>2.5).map(p=>`<line x1="${p.x0.toFixed(1)}" y1="${p.y0.toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" class="ph-tali"/><circle cx="${p.x0.toFixed(1)}" cy="${p.y0.toFixed(1)}" r="1.3" class="ph-asal"/>`).join("")}
 ${t.map(p=>`<g class="ph-titik" tabindex="0" role="button" data-ph-pos="${escH(p.r.p.id)}" data-tip="${escH(tip(p.r))}" aria-label="${escH(p.r.p.n+": "+phMm(p.r.s.tot)+" mm")}"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" class="ph-hit"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${nor?3.2:R}" class="${kelas(p.r)}"/></g>`).join("")}
 </svg></div>`}
function phKabNormal(m){const L=KAB_SEMUA.map(([k])=>[k,normalDasar(k)]).filter(x=>x[1]).sort((a,b)=>phUrutKab(a[0])-phUrutKab(b[0])),mx=Math.max(1,...L.map(x=>x[1][m-1]));
 return `<ul class="ph-meter nor">${L.map(([k,a])=>`<li><a href="#${slugKab(k)}"><span class="ph-mn">${escH(k)}</span><span class="ph-mb"><i class="nr${kelasNormal(a[m-1])}" style="width:${Math.max(2,a[m-1]/mx*100).toFixed(1)}%"></i></span><span class="ph-mv">${a[m-1]} mm</span></a></li>`).join("")}</ul>
 <p class="note" style="margin-top:10px">Rata-rata seluruh wilayah kabupaten/kota. Ketuk nama untuk membuka info iklim kabupaten itu.</p>`}
function phLegenda(){if(PH.warna==="nor")return `<ul class="ph-leg kotak" aria-label="Keterangan warna">${KET_NORMAL.map((t,i)=>`<li><i class="nr${i}"></i><span>${t} mm</span></li>`).join("")}<li><i class="ph-nn" style="border-radius:50%;width:9px;height:9px"></i><span>pos hujan</span></li></ul><p class="note" style="margin-top:8px">Warna = curah hujan rata-rata bulan ini pada 1991–2020 (data grid 0,05°). Batas kabupaten: BPS 2020.</p>`;
 const sh=PH.warna==="sh";return `<ul class="ph-leg" aria-label="Keterangan warna">${(sh?PH_KAT_SH:PH_KAT_CH).map((n,k)=>`<li><i class="${sh?"ph-s":"ph-c"}${k}"></i><b>${n}</b> <span>${(sh?PH_KET_SH:PH_KET_CH)[k]}</span></li>`).join("")}${sh?`<li><i class="ph-na"></i><b>Belum lengkap</b></li>`:""}</ul>`}
function phKabHTML(rows){const g={};rows.forEach(r=>{(g[r.p.kab]=g[r.p.kab]||[]).push(r)});const L=Object.entries(g).sort((a,b)=>phUrutKab(a[0])-phUrutKab(b[0]));
 const mx=Math.max(1,...L.map(([,a])=>a.reduce((s,r)=>s+r.s.tot,0)/a.length));
 return `<ul class="ph-meter">${L.map(([k,a])=>{const rt=a.reduce((s,r)=>s+r.s.tot,0)/a.length,pn=a.filter(r=>r.pn!=null),pr=pn.length?Math.round(pn.reduce((s,r)=>s+r.pn,0)/pn.length):null,ks=phKatSH(pr);
  return `<li><button type="button" data-ph-kab="${escH(k)}"><span class="ph-mn">${escH(k)}<small>${a.length} pos</small></span><span class="ph-mb"><i class="ph-c${phKatCH(rt)}" style="width:${Math.max(2,rt/mx*100).toFixed(1)}%"></i></span><span class="ph-mv">${phMm(Math.round(rt))} mm</span>${pr!=null?`<span class="ph-pill ph-ps${ks}">${pr}%</span>`:`<span class="ph-pill">–</span>`}</button></li>`}).join("")}</ul>
 <p class="note" style="margin-top:10px">Batang = rata-rata curah hujan pos di kabupaten/kota itu. Persen = rata-rata dibanding normal.</p>`}
const PH_KAT_DAS=["Rendah","Menengah","Tinggi","Sangat tinggi"],PH_KET_DAS=["&lt; 50 mm","50–150 mm","150–300 mm","&gt; 300 mm"];
const phKatDas=v=>v<50?0:v<150?1:v<300?2:3;
function phDas(v,ym){const [t,m]=ym.split("-"),nh=new Date(+t,+m,0).getDate(),B=[[0,10],[10,20],[20,nh]];return B.map(([a,b])=>{let tot=0,n=0;for(let i=a;i<b;i++){const x=(v||[])[i];if(x!=null){tot+=x;n++}}return {tot,n,penuh:n===b-a,ada:n>0}})}
function phTabelDas(rows,ym){let kab="";const sel=d=>!d.ada?`<td class="ang ph-redup">–</td>`:`<td class="ang"><span class="ph-dchip ph-c${phKatDas(d.tot)}"></span><b>${phMm(d.tot)}</b>${d.penuh?"":` <small class="ph-sem" title="Baru ${d.n} hari tercatat">*</small>`}</td>`;
 return `<div class="tbl-wrap ph-tw"><table class="ph-t ph-td"><thead><tr><th>Pos hujan</th><th class="ang">Dasarian I</th><th class="ang">Dasarian II</th><th class="ang">Dasarian III</th></tr></thead><tbody>${rows.map(r=>{const D=phDas(r.v,ym);
  const g=r.p.kab!==kab?(kab=r.p.kab,`<tr class="ph-grp"><th colspan="4">${escH(kab)} <small>${PH_PROV[r.p.prov]||""}</small></th></tr>`):"";
  return g+`<tr><td><button type="button" class="ph-nama" data-ph-pos="${escH(r.p.id)}">${escH(r.p.n)}</button></td>${D.map(sel).join("")}</tr>`}).join("")}</tbody></table></div>
 <ul class="ph-leg" aria-label="Keterangan warna dasarian">${PH_KAT_DAS.map((n,k)=>`<li><i class="ph-c${k}"></i><b>${n}</b> <span>${PH_KET_DAS[k]}</span></li>`).join("")}</ul>
 <p class="note" style="margin-top:8px">Angka dalam mm, dijumlahkan dari catatan harian pos. Tanda * berarti dasarian itu belum tercatat penuh.</p>`}
function phTabel(rows){const mx=Math.max(1,...rows.map(r=>r.s.tot));let kab="";
 return `<div class="tbl-wrap ph-tw"><table class="ph-t"><thead><tr><th>Pos hujan</th><th>Curah hujan</th><th class="ang ph-k3">Normal</th><th>Dibanding normal</th><th class="ang ph-k5">Hari hujan</th><th class="ang ph-k6">Hujan maks.</th></tr></thead><tbody>${rows.map(r=>{
  const g=r.p.kab!==kab?(kab=r.p.kab,`<tr class="ph-grp" id="phk-${escH(phSlug(kab))}"><th colspan="6">${escH(kab)} <small>${PH_PROV[r.p.prov]||""}</small></th></tr>`):"";
  return g+`<tr><td><button type="button" class="ph-nama" data-ph-pos="${escH(r.p.id)}">${escH(r.p.n)}</button><small>${escH(r.p.kec||"")}${r.s.lengkap?"":` · <span class="ph-sem">tercatat s.d. tgl ${r.s.akhir}</span>`}</small></td>
   <td><span class="ph-ib"><i class="ph-c${r.kc}" style="width:${Math.max(1.5,r.s.tot/mx*100).toFixed(1)}%"></i></span><b class="ang">${phMm(r.s.tot)}</b> <small>mm</small></td>
   <td class="ang ph-k3">${r.nor!=null?phMm(r.nor):"–"}</td>
   <td>${r.pn!=null?`<span class="ph-pill ph-ps${r.ks}">${r.pn}%</span> <small>${PH_KAT_SH[r.ks]}</small><small class="ph-nm">normal ${phMm(r.nor)} mm</small>`:`<small class="ph-redup">${r.s.lengkap?"normal belum ada":"belum lengkap"}</small>`}</td>
   <td class="ang ph-k5">${r.s.hh}</td><td class="ang ph-k6">${r.s.mx!=null?phMm(r.s.mx)+" <small>mm · tgl "+r.s.tmx+"</small>":"–"}</td></tr>`}).join("")}</tbody></table></div>`}
/* ---- rincian satu pos: grafik harian bulan terpilih + grafik bulanan setahun ---- */
async function phDetail(id){const pos=phDaftarPos().get(id);if(!pos)return;const [t,mm]=PH.bulan.split("-"),m=+mm,d=PH.th[t]||await phAmbilTahun(t);
 const v=(d.bulan[m]||{})[id]||[],s=phStat(v),bln=Object.keys(d.bulan).map(Number).sort((a,b)=>a-b);
 const tahun=Array.from({length:12},(_,i)=>{const x=(d.bulan[i+1]||{})[id];if(!x)return null;const st=phStat(x);return {m:i+1,st,pn:st.lengkap&&pos.nor?Math.round(st.tot/pos.nor[i]*100):null}});
 const pn=s.lengkap&&pos.nor?Math.round(s.tot/pos.nor[m-1]*100):null;
 bukaDialog(`<div class="ph-dlg"><p class="eyebrow">${escH(pos.kab)}${pos.kec?" · Distrik "+escH(pos.kec):""}</p><h2>${escH(pos.n)}</h2>
 <div class="ph-kpi kecil"><div class="ph-st"><span>Curah hujan ${BLN[m-1]} ${t}</span><b>${phMm(s.tot)}<i> mm</i></b><small>${s.lengkap?"data lengkap":"tercatat s.d. tgl "+s.akhir}</small></div>
  <div class="ph-st"><span>Dibanding normal</span>${pn!=null?`<b>${pn}%</b><small>${PH_KAT_SH[phKatSH(pn)]} · normal ${phMm(pos.nor[m-1])} mm</small>`:`<b class="ph-redup">–</b><small>${pos.nor?"menunggu data lengkap":"normal belum tersedia"}</small>`}</div>
  <div class="ph-st"><span>Hari hujan</span><b>${s.hh}<i> hari</i></b><small>hujan ≥ 1 mm</small></div>
  <div class="ph-st"><span>Hujan harian tertinggi</span><b>${s.mx!=null?phMm(s.mx):"–"}<i> mm</i></b><small>${s.mx!=null?"tanggal "+s.tmx:""}</small></div></div>
 <h3 class="ph-gj">Hujan harian (mm) · ${BL[m-1]} ${t}</h3>${phGrafikHarian(v,m,t)}
 <h3 class="ph-gj">Hujan bulanan (mm) · ${t}</h3>${phGrafikBulanan(tahun,pos.nor)}
 <details class="ph-twin"><summary>Lihat angka bulanan dalam tabel</summary>${tbl(["Bulan","Curah hujan (mm)","Normal (mm)","Dibanding normal","Hari hujan"],tahun.filter(Boolean).map(x=>[BL[x.m-1],phMm(x.st.tot)+(x.st.lengkap?"":" (s.d. tgl "+x.st.akhir+")"),pos.nor?phMm(pos.nor[x.m-1]):"–",x.pn!=null?x.pn+"% · "+PH_KAT_SH[phKatSH(x.pn)]:"–",x.st.hh]))}</details>
 <p class="note">Letak pos: ${pos.lat!=null?pos.lat.toFixed(3)+"°, "+pos.lon.toFixed(3)+"°":"belum tercatat"}. Data tersedia ${bln.length} bulan pada ${t}.</p>
 ${unduhCsv()?`<p><button type="button" class="pbtn" data-ph-csv="${escH(id)}">⬇️ Unduh data harian ${t} (CSV)</button></p>`:""}</div>`)}
function phSumbu(mx){const st=mx<=20?5:mx<=50?10:mx<=100?25:mx<=200?50:mx<=400?100:200;return {top:Math.max(st,Math.ceil(mx/st)*st),st}}
function phGrafikHarian(v,m,t){const W=660,H=230,L=40,B=26,T=10,n=v.length,cw=(W-L-8)/n,{top,st}=phSumbu(Math.max(1,...v.filter(x=>x!=null))),y=x=>H-B-(x/top)*(H-B-T),bw=Math.min(16,cw-2);
 let g="";for(let k=0;k<=top;k+=st)g+=`<line x1="${L}" x2="${W-4}" y1="${y(k)}" y2="${y(k)}" class="ph-gl"/><text x="${L-6}" y="${y(k)+4}" text-anchor="end" class="ph-ax">${k}</text>`;
 const bar=v.map((x,i)=>{const cx=L+i*cw+cw/2,lbl=(i===0||(i+1)%5===0)?`<text x="${cx}" y="${H-8}" text-anchor="middle" class="ph-ax">${i+1}</text>`:"";
  if(x==null)return lbl+`<circle cx="${cx}" cy="${H-B-3}" r="1.6" class="ph-kos"/><rect x="${cx-cw/2}" y="${T}" width="${cw}" height="${H-B-T}" class="ph-hitb" data-tip="tidak tercatat|${i+1} ${BLN[m-1]} ${t}"/>`;
  const h=Math.max(x>0?1.5:0,H-B-y(x)),r=Math.min(4,bw/2,h);
  return lbl+`<path d="M${cx-bw/2} ${H-B}v${-(h-r)}q0 ${-r} ${r} ${-r}h${bw-2*r}q${r} 0 ${r} ${r}v${h-r}z" class="ph-bar1"/><rect x="${cx-cw/2}" y="${T}" width="${cw}" height="${H-B-T}" class="ph-hitb" data-tip="${phMm(x)} mm|${i+1} ${BLN[m-1]} ${t}"/>`}).join("");
 return `<div class="ph-chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik hujan harian">${g}<line x1="${L}" x2="${W-4}" y1="${H-B}" y2="${H-B}" class="ph-base"/>${bar}</svg></div>`}
function phGrafikBulanan(a,nor){const W=660,H=240,L=44,B=26,T=12,cw=(W-L-8)/12,vals=a.map(x=>x?x.st.tot:0).concat(nor||[]),{top,st}=phSumbu(Math.max(1,...vals)),y=x=>H-B-(x/top)*(H-B-T),bw=Math.min(24,cw-10);
 let g="";for(let k=0;k<=top;k+=st)g+=`<line x1="${L}" x2="${W-4}" y1="${y(k)}" y2="${y(k)}" class="ph-gl"/><text x="${L-6}" y="${y(k)+4}" text-anchor="end" class="ph-ax">${k}</text>`;
 const bar=a.map((x,i)=>{const cx=L+i*cw+cw/2;let s=`<text x="${cx}" y="${H-8}" text-anchor="middle" class="ph-ax">${BLN[i]}</text>`;if(!x)return s;
  const h=Math.max(1.5,H-B-y(x.st.tot)),r=Math.min(4,bw/2,h);
  return s+`<path d="M${cx-bw/2} ${H-B}v${-(h-r)}q0 ${-r} ${r} ${-r}h${bw-2*r}q${r} 0 ${r} ${r}v${h-r}z" class="${x.st.lengkap?"ph-bar1":"ph-bar0"}"/><rect x="${cx-cw/2}" y="${T}" width="${cw}" height="${H-B-T}" class="ph-hitb" data-tip="${phMm(x.st.tot)} mm${x.pn!=null?" · "+x.pn+"% normal":x.st.lengkap?"":" · s.d. tgl "+x.st.akhir}|${BL[i]}${nor?" · normal "+phMm(nor[i])+" mm":""}"/>`}).join("");
 const garis=nor?`<polyline points="${nor.map((v,i)=>`${(L+i*cw+cw/2).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}" class="ph-nor"/>${nor.map((v,i)=>`<circle cx="${(L+i*cw+cw/2).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.6" class="ph-nordot"/>`).join("")}`:"";
 return `<div class="ph-chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik hujan bulanan dibanding normal">${g}<line x1="${L}" x2="${W-4}" y1="${H-B}" y2="${H-B}" class="ph-base"/>${bar}${garis}</svg></div>
 <ul class="ph-leg kecil"><li><i class="ph-c2"></i><b>Curah hujan</b></li>${nor?`<li><i class="ph-lnor"></i><b>Normal 1991–2020</b></li>`:""}<li><i class="ph-c0 ph-pucat"></i><b>Data belum lengkap</b></li></ul>`}
/* kartu "Pos hujan" di Info Wilayah Saya & halaman iklim kabupaten */
async function phIsiWilayah(){const el=document.getElementById("wilPos");if(!el||el.dataset.isi)return;el.dataset.isi=1;const kab=el.dataset.kab;
 try{if(!PH.reg)PH.reg=await phJSON(PH_DIR+"pos.json");if(!PH.kv){try{PH.kv=(await phJSON(KONTEN_URL+"/poshujan")).tahun||{}}catch(e){PH.kv={}}}
  const ym=phBulanAwal();if(!ym)throw new Error("kosong");await phAmbilTahun(ym.slice(0,4));if(!el.isConnected)return;
  const rows=phBaris(ym,"").filter(r=>r.p.kab===kab);
  el.innerHTML=`<span class="eyebrow"><i class="wik" aria-hidden="true">${IKON_W.hujan}</i>Pos hujan · ${phNamaBulan(ym)}</span>`+(rows.length?rows.map(r=>`<p class="wilp"><b>${escH(r.p.n)}</b> · ${phMm(r.s.tot)} mm${r.pn!=null?` · <span class="ph-pill ph-ps${r.ks}">${r.pn}%</span> ${PH_KAT_SH[r.ks].toLowerCase()}`:r.s.lengkap?"":" · data belum lengkap"}</p>`).join("")+`<p class="wilarti"><b>Artinya:</b> persen = curah hujan bulan itu dibanding rata-rata 1991–2020; di bawah 85% lebih kering, di atas 115% lebih basah dari biasanya.</p>`:`<p class="wilp">Belum ada pos hujan yang melapor di ${escH(kab)} pada ${phNamaBulan(ym)}.</p>`)+`<p class="wilp"><a href="#pos-hujan">Lihat peta dan grafik semua pos ›</a></p>`}
 catch(e){if(el.isConnected)el.remove()}}
function phCsv(id){const pos=phDaftarPos().get(id),t=PH.bulan.slice(0,4),d=PH.th[t];if(!pos||!d)return;const baris=["tanggal,curah_hujan_mm"];
 Object.keys(d.bulan).map(Number).sort((a,b)=>a-b).forEach(m=>((d.bulan[m]||{})[id]||[]).forEach((x,i)=>baris.push(`${t}-${String(m).padStart(2,"0")}-${String(i+1).padStart(2,"0")},${x==null?"":x}`)));
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+baris.join("\n")],{type:"text/csv"}));a.download=`pos-hujan_${phSlug(pos.n)}_${t}.csv`;document.body.appendChild(a);a.click();a.remove()}
/* tooltip bersama untuk peta & grafik (isi lewat textContent) */
function phTip(e){const el=e.target.closest&&e.target.closest("[data-tip]");let tp=PH.tip;if(!el||!el.closest(".phwrap,.ph-dlg")){if(tp)tp.hidden=true;return}
 if(!tp){tp=PH.tip=document.createElement("div");tp.className="ph-tip";tp.setAttribute("role","tooltip");document.body.appendChild(tp)}
 const st=el.dataset.tip,ix=st.indexOf("|"),a=ix<0?st:st.slice(0,ix),b=ix<0?"":st.slice(ix+1);tp.textContent="";const s=document.createElement("strong");s.textContent=a;tp.appendChild(s);if(b){const sp=document.createElement("span");sp.textContent=b;tp.appendChild(sp)}tp.hidden=false;
 const r=el.getBoundingClientRect(),x=e.clientX||r.left+r.width/2,y=e.clientY||r.top;const w=tp.offsetWidth;tp.style.left=Math.max(8,Math.min(innerWidth-w-8,x-w/2))+"px";tp.style.top=Math.max(8,y-tp.offsetHeight-14)+"px"}
document.addEventListener("pointermove",phTip,{passive:true});document.addEventListener("focusin",phTip);
document.addEventListener("click",e=>{const t=e.target;if(!t.closest)return;
 const ps=t.closest("[data-ph-pos]");if(ps&&ps.closest(".phwrap")){phDetail(ps.dataset.phPos);return}
 const cv=t.closest("[data-ph-csv]");if(cv){phCsv(cv.dataset.phCsv);return}
 if(!t.closest(".phwrap"))return;
 const gs=t.closest("[data-ph-geser]");if(gs){const a=phBulanAda(),i=a.indexOf(PH.bulan)+ +gs.dataset.phGeser;if(a[i]){PH.bulan=a[i];phGanti()}return}
 const pv=t.closest("[data-ph-prov]");if(pv){PH.prov=pv.dataset.phProv;phGambar();return}
 const wr=t.closest("[data-ph-warna]");if(wr){PH.warna=wr.dataset.phWarna;phGambar();return}
 const md=t.closest("[data-ph-mode]");if(md){PH.mode=md.dataset.phMode;phGambar();return}
 const kb=t.closest("[data-ph-kab]");if(kb){const tr=document.getElementById("phk-"+phSlug(kb.dataset.phKab));if(tr)tr.scrollIntoView({behavior:"smooth",block:"center"})}});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest&&e.target.closest(".ph-titik")){e.preventDefault();phDetail(e.target.closest(".ph-titik").dataset.phPos)}});
document.addEventListener("change",e=>{if(e.target&&e.target.id==="phBulan"){PH.bulan=e.target.value;phGanti()}});
async function phGanti(){const box=document.getElementById("phIsi");if(box)box.classList.add("ph-redupkan");try{await phAmbilTahun(PH.bulan.slice(0,4))}catch(e){}if(box)box.classList.remove("ph-redupkan");if(cur==="pos-hujan")phGambar()}

/* ===== ADMIN: POS HUJAN — unggah Excel data pos hujan (satu file = satu tahun, satu lembar per bulan) ===== */
let PH_UNGGAH=null;
const kolomKe=s=>{let n=0;for(const ch of String(s).toUpperCase())n=n*26+(ch.charCodeAt(0)-64);return n-1};
async function bacaXlsx(file,semua){const JSZip=await muatJsZip();let z;try{z=await JSZip.loadAsync(await file.arrayBuffer())}catch(e){throw new Error("File tidak bisa dibuka. Pastikan formatnya Excel .xlsx (bukan .xls lama atau PDF).")}
 const xml=async n=>{const f=z.file(n);return f?new DOMParser().parseFromString(await f.async("string"),"application/xml"):null};
 const wb=await xml("xl/workbook.xml");if(!wb)throw new Error("File ini bukan Excel .xlsx.");const rels=await xml("xl/_rels/workbook.xml.rels"),sst=await xml("xl/sharedStrings.xml");
 const ss=sst?[...sst.getElementsByTagName("si")].map(si=>[...si.getElementsByTagName("t")].map(t=>t.textContent).join("")):[];
 const tuju={};if(rels)[...rels.getElementsByTagName("Relationship")].forEach(r=>tuju[r.getAttribute("Id")]=r.getAttribute("Target"));
 const out=[];
 for(const sh of [...wb.getElementsByTagName("sheet")]){const nama=sh.getAttribute("name")||"";if(!semua&&!phBulan(nama)){out.push({nama,rows:null});continue}
  let t=String(tuju[sh.getAttribute("r:id")]||"").replace(/^\/+/,"");if(!t)continue;if(!t.startsWith("xl/"))t="xl/"+t;
  const doc=await xml(t);if(!doc)continue;const rows=[];
  for(const r of [...doc.getElementsByTagName("row")]){const ri=+r.getAttribute("r")-1;const row=[];
   for(const c of [...r.getElementsByTagName("c")]){const ref=(c.getAttribute("r")||"").replace(/\d+/g,""),col=ref?kolomKe(ref):row.length,ty=c.getAttribute("t"),v=c.getElementsByTagName("v")[0];
    row[col]=ty==="s"?(ss[+(v&&v.textContent)]||""):ty==="inlineStr"?[...c.getElementsByTagName("t")].map(x=>x.textContent).join(""):(v?v.textContent:"")}
   rows[ri>=0?ri:rows.length]=row}
  out.push({nama,rows:Array.from(rows,x=>x||[])})}
 return out}
async function phGrid(){if(!PH.grid)PH.grid=await phJSON(PH_DIR+"normal-grid.json");return PH.grid}
/* ---- Admin › Update Prediksi Musim: unggah tabel kesepakatan UPDATE PMH (Excel) ---- */
let PMHU_BARU=null,PMHU_MEMBACA=false;
let PMHU_JENIS="hujan";const kunciUpd=j=>(j||PMHU_JENIS)==="kemarau"?"pmk_update":"pmh_update";
const pmhuSaatIni=j=>{const k=kunciUpd(j);return (ADM_STATUS&&ADM_STATUS[k])||(KA&&KA.pengaturan&&KA.pengaturan[k])||null};
function admPMHUpd(){return `<div id="admPMHU"><div class="ph-seg" role="radiogroup" aria-label="Jenis update" style="margin-bottom:12px">${[["hujan","Musim hujan (PMH)"],["kemarau","Musim kemarau (PMK)"]].map(([k,n])=>`<button type="button" role="radio" aria-checked="${PMHU_JENIS===k}" data-pmhu-jenis="${k}">${n}</button>`).join("")}</div><p class="admnote">Saat BMKG memutakhirkan prediksi musim hujan atau kemarau, unggah <b>tabel kesepakatan update</b> di sini. Caranya: buka tautan tabel (mis. link.bmkg.go.id/updatepmh2627), pilih <b>File › Download › Microsoft Excel (.xlsx)</b>, lalu unggah file-nya. Web membaca baris PAPBAR dari lembar <i>SCREENING_PUSAT</i> dan membandingkan awal musim versi rilis dengan versi update. Jenis (PMH atau PMK) dikenali otomatis dari kolom AMH/AMK.</p>
 <p class="admnote">Publik <b>hanya melihat ringkasan</b> (misalnya "9 dari 11 wilayah diprediksi mundur, sebagian besar mulai November–Desember 2026"), tanpa angka per ZOM, dan hanya bila kotak "Tampilkan ke publik" dicentang. Pembaruan berhenti dipakai sendiri setelah Press Release prediksi musim resmi yang baru (jenis yang sama) diunggah lewat tab Terbitkan.</p>
 <fieldset class="kdrow"><legend>Unggah tabel update</legend><label>File Excel (.xlsx), PDF, atau PowerPoint (.pptx)<input type="file" id="pmhuFile" accept=".xlsx,.pdf,.pptx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"></label></fieldset>
 <div id="pmhuIsi"></div><p class="admmsg" id="admMsg"></p></div>`}
function pmhuPadanan(u){const z=(u.zom||[]).filter(x=>kodeKeZom(x.no));if(!z.length)return `<p class="admnote">Kode di tabel bukan PAPBAR_01–21, jadi nomor ZOM tidak bisa dipasangkan. Hubungi pengelola web.</p>`;return `<details><summary>Padanan kode tabel ↔ ZOM web (otomatis, sudah resmi)</summary><p class="admnote">Diambil dari daftar kode lama ↔ baru di tabel update pusat, sama dengan Buletin PMH 2026/2027. Tidak perlu dipilih manual.</p>${tbl(["Kode tabel","ZOM web","Wilayah"],z.map(x=>{const w=kodeKeZom(x.no),y=ZOM11.find(q=>q.no===w);return [esc(x.no),`<b>${w}</b>`,esc(((y&&y.wil)||WIL_NONZOM[w]||"").slice(0,70))]}))}</details>`}
function padanDariPMH(zom){const pm=(pmhuSaatIni("hujan")||{}).zom||[],web=Object.keys(ZOM_PMH_ASLI).map(Number).sort((a,b)=>a-b).map(no=>{const r=ZOM_PMH_ASLI[no];return {no,awal:"",sif:"",pun:""}}),hasil={};
 pm.filter(x=>+x.web).forEach(x=>{if(zom.some(z=>z.no===x.no))hasil[+x.web]={e:x.no,s:4,ragu:false,kembar:[]}});web.forEach(w=>{if(!hasil[w.no])hasil[w.no]={ragu:true,kembar:[]}});return {web,hasil}}
function pmhuTabel(u){const r=ringkasPMHUpd(u),z=(u.zom||[]);
 const ubah=x=>{const a=dasJ(x.semula,u),b=dasJ(x.baru,u);if(!a||!b)return "–";const d=b.i-a.i;return d>0?`Mundur ${d} dasarian`:d<0?`Maju ${-d} dasarian`:"Tetap"};
 return `${r?`<div class="catatan-pmh mundur" style="margin:14px 0"><span class="cp-ikon">↻</span><div><b>Pratinjau untuk publik: ${escH(r.judul)}</b><p>${r.teks}</p></div></div>`:`<p class="admnote">Tidak ada ZOM bermusim yang terbaca, jadi tidak ada ringkasan.</p>`}
 ${pmhuPadanan(u)}<details><summary>Rincian per ZOM (hanya untuk Admin)</summary>${tbl(["ZOM","Tipe","Kondisi "+escH(u.label||""),(u.jenis==="kemarau"?"AMK":"AMH")+" rilis",(u.jenis==="kemarau"?"AMK":"AMH")+" update","Perubahan","Puncak rilis","Puncak update"],z.map(x=>[escH(x.no),escH(x.tipe||""),escH(x.kondisi||""),escH(x.semula||"–"),escH(x.baru||"–"),ubah(x),escH(x.prilis||"–"),escH(x.puncak||"(tetap)")]))}</details>`}
function isiAdmPMHUpd(){const el=document.getElementById("pmhuIsi");if(!el)return;document.querySelectorAll("[data-pmhu-jenis]").forEach(b=>b.setAttribute("aria-checked",String(b.dataset.pmhuJenis===PMHU_JENIS)));const u=PMHU_BARU||pmhuSaatIni();
 if(!u||!u.diunggah&&!PMHU_BARU){el.innerHTML=`<p class="admnote">Belum ada tabel update musim ${PMHU_JENIS} yang diunggah.${PMHU_JENIS==="hujan"?' Selama itu, halaman Prediksi Musim memakai catatan bawaan "awal musim hujan diprediksi mundur".':""}</p>`;return}
 if(!(u.zom||[]).length){el.innerHTML=`<p class="admnote">Data update sudah dihapus. Kotak perkembangan terbaru tidak tampil di web.</p>`;return}
 el.innerHTML=`<h3 style="margin:18px 0 6px">${PMHU_BARU?"Hasil baca file (belum disimpan)":"Data yang terpasang"}</h3><p class="admnote">Sumber: ${escH(u.sumber||"-")}${u.diunggah&&!PMHU_BARU?" · diunggah "+escH(String(u.diunggah).slice(0,10)):""}</p>${pmhuTabel(u)}
 <fieldset class="kdrow" style="margin-top:16px"><legend>Yang boleh dilihat publik</legend><label class="cek" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pmhuTampil"${u.tampil?" checked":""}> Tampilkan ke publik (${PMHU_JENIS==="kemarau"?"halaman Prediksi Musim Kemarau, Zona Musim, dan Info Wilayah":"halaman Prediksi Musim, Zona Musim, Info Wilayah, dan banner beranda"})</label>
 <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px"><button type="button" class="pbtn" id="pmhuSimpan">${PMHU_BARU?"Simpan & pasang":"Simpan pengaturan"}</button>${PMHU_BARU?`<button type="button" class="pbtn sek" id="pmhuBatal">Batal</button>`:`<button type="button" class="pbtn sek" id="pmhuHapus">Hapus data update</button>`}</div></fieldset>`}
/* tabel update bentuk PDF / PowerPoint (.pptx): diubah jadi baris-baris sel */
async function barisPptx(f){const JSZip=await muatJsZip();let z;try{z=await JSZip.loadAsync(await f.arrayBuffer())}catch(e){throw new Error("File PowerPoint tidak bisa dibuka. Simpan ulang sebagai .pptx (bukan .ppt lama) atau PDF.")}
 const nm=Object.keys(z.files).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>+a.match(/\d+/)[0]-+b.match(/\d+/)[0]),rows=[],dp=new DOMParser();
 for(const n of nm){const d=dp.parseFromString(await z.file(n).async("string"),"application/xml"),A="http://schemas.openxmlformats.org/drawingml/2006/main";
  const tx=el=>[...el.getElementsByTagNameNS(A,"p")].map(p=>[...p.getElementsByTagNameNS(A,"t")].map(t=>t.textContent).join("")).join(" ");
  [...d.getElementsByTagNameNS(A,"tr")].forEach(tr=>rows.push([...tr.getElementsByTagNameNS(A,"tc")].map(tx)));
  [...d.getElementsByTagNameNS(A,"p")].forEach(p=>{if(p.closest&&p.closest("tc"))return;const t=[...p.getElementsByTagNameNS(A,"t")].map(t=>t.textContent).join("");if(t.trim())rows.push(t.split(/\t|\s{2,}/))})}
 return [{nama:"PPTX",rows}]}
async function barisPdf(f){const L=await muatPdfJs(),doc=await L.getDocument({data:await f.arrayBuffer()}).promise,rows=[];
 for(let p=1;p<=doc.numPages;p++){const it=(await(await doc.getPage(p)).getTextContent()).items.filter(x=>x.str&&x.str.trim()).map(x=>({s:x.str.trim(),x:x.transform[4],y:x.transform[5],w:x.width||0}));
  it.sort((a,b)=>b.y-a.y||a.x-b.x);let cur=null;const gr=[];it.forEach(x=>{if(cur&&Math.abs(cur.y-x.y)<=3)cur.it.push(x);else{cur={y:x.y,it:[x]};gr.push(cur)}});
  gr.forEach(g=>{g.it.sort((a,b)=>a.x-b.x);const c=[];let ak=null;g.it.forEach(x=>{if(ak&&x.x-(ak.x+ak.w)<4){ak.s+=" "+x.s;ak.w=x.x+x.w-ak.x}else{ak={...x};c.push(ak)}});rows.push(c.map(x=>x.s))})}
 return [{nama:"PDF",rows}]}
/* baca baris PAPBAR tanpa judul kolom: dasarian pertama = semula, kedua = update; bulan-tahun terakhir = puncak */
function pmhuDariBaris(L){const T=/\b(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|AGU|SEP|OKT|NOV|DES)\s+(III|II|I)\b(?!\s*\d)/gi,kemA={v:false},Y=/\b(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|AGU|SEP|OKT|NOV|DES)[A-Z]*\s+(20\d\d)\b/gi,out={};let label="",kem=false;
 L.forEach(sh=>sh.rows.forEach(r=>{const t=r.map(c=>String(c==null?"":c)).join(" | ").replace(/\s+/g," ");const kl=t.match(/Kondisi M([HK])\s*\(([^)]+)\)/i);if(kl&&!label){label=kl[2];if(/k/i.test(kl[1]))kem=true}if(/\bPMK|AMK|musim kemarau/i.test(t))kem=true;
  const m=t.match(/PAPBAR_\d{2}/i);if(!m)return;const no=m[0].toUpperCase();if(out[no])return;const ds=[...t.matchAll(T)].map(x=>(x[1].toUpperCase().replace("AGU","AGT"))+" "+x[2].toUpperCase());
  const ys=[...t.matchAll(Y)].map(x=>x[1].toUpperCase().slice(0,3).replace("AGU","AGT")+" "+x[2]),sf=r.map(c=>String(c||"").trim()).filter(c=>/^[NAB]$/.test(c));
  out[no]={no,tipe:(t.match(/\b(MONSUNAL|EKUATORIAL|LOKAL)-?\d?/i)||[""])[0].toUpperCase(),kondisi:/tipe 1/i.test(t)?"TIPE 1 MUSIM":(t.match(/\b(KEMARAU|HUJAN)\b/i)||[""])[0].toUpperCase(),semula:ds[0]||"",baru:ds[1]||ds[0]||"",puncak:(()=>{const pc=r.map(c=>String(c||"").trim().toUpperCase()).filter(c=>/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|AGU|SEP|OKT|NOV|DES)(\s+20\d\d)?$/.test(c));return pc.length?blnPMH(pc[pc.length-1]):ys.length?ys[ys.length-1]:""})(),prilis:"",normal:"",srilis:"",supd:sf.length?sf[sf.length-1]:""}}));
 return {label,jenis:kem?"kemarau":"hujan",zom:Object.values(out).sort((a,b)=>a.no.localeCompare(b.no))}}
async function bacaTabelUpdate(f){const n=f.name.toLowerCase();if(/\.pdf$/.test(n))return barisPdf(f);if(/\.pptx$/.test(n))return barisPptx(f);
 if(/\.ppt$/.test(n))throw new Error("Format .ppt lama tidak bisa dibaca. Buka di PowerPoint lalu simpan sebagai .pptx atau PDF.");return bacaXlsx(f,true)}
async function pmhuBaca(f){if(!f)return;PMHU_MEMBACA=true;{const b=document.getElementById("pmhuSimpan");if(b){b.disabled=true;b.textContent="Membaca file…"}}
 pesan("Membaca file…");try{const L=(await bacaTabelUpdate(f)).filter(x=>x.rows);const norm=v=>String(v==null?"":v).replace(/\s+/g," ").trim();
 const lamaU=pmhuSaatIni()||{},lamaZ={};(lamaU.zom||[]).forEach(z=>lamaZ[z.no]=z);
 let lembar=null,h=null,hi=-1;for(const sh of (/\.pdf$/i.test(f.name)?[]:L)){for(let i=0;i<Math.min(sh.rows.length,8);i++){const row=sh.rows[i].map(norm);if(row.some(c=>/AM[HK] SEMULA/i.test(c))&&row.some(c=>/^AM[HK] UPDATE$/i.test(c))){lembar=sh;h=row;hi=i;break}}if(lembar)break}
 if(!lembar&&!/\.xlsx$/i.test(f.name)){const hb=pmhuDariBaris(L);if(hb.zom.length<15)throw new Error(`Hanya ${hb.zom.length} baris PAPBAR yang terbaca dari file ini. Pastikan file berisi tabel update per ZOM (kode PAPBAR_01 dst.), atau unggah versi Excel-nya.`);
  return pmhuSelesai(f,hb.label,hb.zom,lamaZ,hb.jenis)}
 if(!lembar)throw new Error('Lembar SCREENING_PUSAT (kolom "AMH SEMULA" dan "AMH UPDATE") tidak ditemukan. Pastikan file yang diunggah adalah tabel kesepakatan UPDATE PMH atau PMK.');
 const jenis=h.some(c=>/AMK SEMULA/i.test(c))?"kemarau":"hujan";
 const c={no:h.findIndex(x=>/^NO ZOM/i.test(x)),tipe:h.findIndex(x=>/^TIPE MUSIM/i.test(x)),kond:h.findIndex(x=>/^Kondisi M[HK]/i.test(x)),sem:h.findIndex(x=>/AM[HK] SEMULA/i.test(x)),baru:h.findIndex(x=>/^AM[HK] UPDATE$/i.test(x))};if(c.no<0)c.no=0;
 const lab=((h[c.kond]||"").match(/\(([^)]+)\)/)||[])[1]||"";const dl=lab.match(/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES)\s+(I{1,3})\s+(\d{4})$/i);
 const label=dl?`Dasarian ${dl[2].toUpperCase()} ${NM_BLN_PMH[BLN_PMH.indexOf(dl[1].toUpperCase())]} ${dl[3]}`:lab;
 c.pun=h.findIndex(x=>/UPDATE ONLY PUNCAK MUSIM/i.test(x));c.sif=h.findIndex(x=>/UPDATE ONLY SIFAT MUSIM/i.test(x));
 const rilP={},rilN={},rilS={},full=L.find(sh=>/^FULL_PM[HK]/i.test(sh.nama));if(full){const r0=(full.rows[0]||[]).map(norm),r1=(full.rows[1]||[]).map(norm),ci=r0.findIndex(x=>/^NO ZOM/i.test(x)),cp=r1.findIndex(x=>/^PUNCAK_M[HK]$/i.test(x));
  const cn=r0.findIndex(x=>/^NORMAL AM[HK]/i.test(x)),cs=r1.findIndex(x=>/^SIFAT$/i.test(x));
  if(ci>=0&&cp>=0)full.rows.forEach(r=>{const k=norm(r[ci]);if(/^PAPBAR_\d{2}$/.test(k)){rilP[k]=blnPMH(r[cp]);rilN[k]=cn>=0&&dasPMH(norm(r[cn]))?norm(r[cn]).toUpperCase():"";rilS[k]=cs>=0&&/^[NAB]$/.test(norm(r[cs]))?norm(r[cs]):""}})}
 const zom=lembar.rows.slice(hi+1).map(r=>r.map(norm)).filter(r=>/^PAPBAR_\d{2}$/.test(r[c.no]||"")).map(r=>({no:r[c.no],tipe:r[c.tipe]||"",kondisi:c.kond>=0?r[c.kond]:"",semula:dasPMH(r[c.sem])?r[c.sem].toUpperCase():"",baru:dasPMH(r[c.baru])?r[c.baru].toUpperCase():"",puncak:c.pun>=0?blnPMH(r[c.pun]):"",prilis:rilP[r[c.no]]||"",normal:rilN[r[c.no]]||"",srilis:rilS[r[c.no]]||"",supd:c.sif>=0&&/^[NAB]$/.test(r[c.sif])?r[c.sif]:""}));
 if(zom.length<15)throw new Error(`Baris PAPBAR yang terbaca hanya ${zom.length} dari 21. Periksa lagi file-nya.`);
 pmhuSelesai(f,label,zom,lamaZ,jenis)}catch(e){PMHU_BARU=null;PMHU_MEMBACA=false;isiAdmPMHUpd();pesan(e.message||String(e),1);catatDok("Update prediksi musim: "+(f&&f.name||""),e.message||String(e))}finally{PMHU_MEMBACA=false;const b=document.getElementById("pmhuSimpan");if(b)b.disabled=false}}
/* lengkapi dari data tersimpan (nilai rilis & padanan pilihan petugas), lalu pratinjau */
function pmhuSelesai(f,lab,zom,lamaZ0,jenis){jenis=jenis==="kemarau"||/pmk/i.test(f.name)?"kemarau":"hujan";if(jenis!==PMHU_JENIS)PMHU_JENIS=jenis;
 const lamaZ={};((pmhuSaatIni(jenis)||{}).zom||[]).forEach(z=>lamaZ[z.no]=z);
 const thF=(f.name.match(/PM[HK][^\d]{0,3}(\d{2})/i)||[])[1],thL=(String(lab||"").match(/(20\d\d)/)||[])[1],tahun=jenis==="kemarau"?(thF?2000+ +thF:+thL||new Date().getFullYear()):(thF?2000+ +thF:0);const dl=String(lab||"").match(/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES)\s+(I{1,3})\s+(\d{4})$/i);
 const label=dl?`Dasarian ${dl[2].toUpperCase()} ${NM_BLN_PMH[BLN_PMH.indexOf(dl[1].toUpperCase())]} ${dl[3]}`:lab||"";
 zom.forEach(z=>{const l=lamaZ[z.no];if(!l)return;["prilis","normal","srilis"].forEach(k=>{if(!z[k]&&l[k])z[k]=l[k]});if(!z.semula&&l.semula&&z.baru)z.semula=l.semula});
 zom.forEach(z=>{z.web=kodeKeZom(z.no)});const pilihLama=[];
 PMHU_BARU={tampil:false,sumber:f.name.replace(/\.(xlsx|pdf|pptx)$/i,""),label,zom,diunggah:"",jenis,tahun};PMHU_MEMBACA=false;isiAdmPMHUpd();
 const n=zom.filter(x=>x.semula&&x.baru).length;pesan(`Update musim ${jenis}${jenis==="kemarau"?" "+tahun:""}: terbaca ${zom.length} ZOM (${n} bermusim)${/\.(pdf|pptx)$/i.test(f.name)?" dari "+(/pdf$/i.test(f.name)?"PDF":"PowerPoint")+": cocokkan angka di rincian dengan file aslinya":""}${pilihLama.length?". Padanan ZOM memakai pilihan yang tersimpan sebelumnya":""}. Periksa ringkasan di bawah, lalu klik "Simpan & pasang".`)}
function pmhuAmbilPadanan(o){if(!o.zom)return o;return {...o,zom:o.zom.map(x=>({...x,web:kodeKeZom(x.no)||+x.web||0}))}}
async function pmhuSimpan(hapus){if(PMHU_MEMBACA){pesan("Tunggu sampai file selesai dibaca, baru klik simpan.",1);return}const lama=pmhuSaatIni()||{},ck=document.getElementById("pmhuTampil");
 const o=hapus?{tampil:false,sumber:"",label:"",zom:[],diunggah:new Date().toISOString()}:PMHU_BARU?{...PMHU_BARU,tampil:!!(ck&&ck.checked),diunggah:new Date().toISOString()}:{...lama,tampil:!!(ck&&ck.checked)};
 const o2=hapus?o:pmhuAmbilPadanan(o);const dup=(o2.zom||[]).filter(x=>x.web).map(x=>x.web);if(new Set(dup).size!==dup.length){pesan("Ada nomor ZOM web yang dipasangkan ke dua kode tabel. Periksa tabel padanan.",1);return}
 pesan("Menyimpan…");try{const ku=kunciUpd();o2.jenis=PMHU_JENIS;const j=await admJSON("/admin/pengaturan",{kunci:ku,nilai:o2});if(j.galat)throw new Error(j.galat);
  KA.pengaturan=j.pengaturan||{...(KA.pengaturan||{}),[ku]:o2};if(ADM_STATUS)ADM_STATUS[ku]=(j.pengaturan||{})[ku]||o2;PMHU_BARU=null;isiAdmPMHUpd();const f=document.getElementById("pmhuFile");if(f)f.value="";
  pesan(hapus?"Data update dihapus. Kotak perkembangan terbaru tidak tampil di web.":o.tampil?`Tersimpan. Pembaruan musim ${PMHU_JENIS} tampil di web (paling lama 1 menit).`:"Tersimpan. Ringkasan belum tampil ke publik (kotak belum dicentang).")}catch(e){pesan("Gagal menyimpan: "+(e.message||e),1)}}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="pmhuFile")pmhuBaca(e.target.files&&e.target.files[0])});
document.addEventListener("click",e=>{const id=e.target&&e.target.id;if(e.target&&e.target.dataset&&e.target.dataset.pmhuJenis){if(PMHU_BARU&&PMHU_BARU.jenis!==e.target.dataset.pmhuJenis){PMHU_BARU=null;const f=document.getElementById("pmhuFile");if(f)f.value=""}PMHU_JENIS=e.target.dataset.pmhuJenis;isiAdmPMHUpd();pesan("");return}if(id==="pmhuSimpan")pmhuSimpan(false);else if(id==="pmhuBatal"){PMHU_BARU=null;const f=document.getElementById("pmhuFile");if(f)f.value="";isiAdmPMHUpd();pesan("")}else if(id==="pmhuHapus"&&confirmHapusPMHU())pmhuSimpan(true)});
function confirmHapusPMHU(){const b=document.getElementById("pmhuHapus");if(b&&b.dataset.yakin)return true;if(b){b.dataset.yakin="1";b.textContent="Klik sekali lagi untuk menghapus"}return false}

function admPosHujan(){return `<div id="admPH"><p class="admnote">Halaman <a href="#pos-hujan">Data Pos Hujan</a> menampilkan curah hujan harian semua pos. Untuk memperbarui, unggah file Excel yang <b>sama formatnya</b> dengan <i>Data_CH_Pos_Utama_&lt;tahun&gt;.xlsx</i>: satu file per tahun, satu lembar per bulan (Januari, Februari, …). Unggah ulang file yang sama setiap kali ada bulan baru; data tahun itu di web diganti seluruhnya oleh isi file terbaru.</p>
 <fieldset class="kdrow"><legend>Unggah file Excel pos hujan</legend>
 <label>File Excel (.xlsx)<input type="file" id="phFile" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></label>
 <p class="admnote" style="margin:4px 0 0">Dari Google Drive: buka file-nya, lalu <b>File › Download › Microsoft Excel (.xlsx)</b>. Isi tidak perlu diubah: tanda “-” dibaca tidak hujan, kode 9999/8888 diabaikan otomatis.</p>
 <div id="phPratinjau"></div></fieldset>
 <fieldset class="kdrow" style="margin-top:22px"><legend>Yang boleh dilihat publik</legend>
 <p class="admnote" style="margin:0 0 8px">Data boleh diunggah kapan saja. Bulan setelah batas di bawah ini hanya terlihat oleh Admin, sampai batasnya digeser (misalnya setelah buletin terbit).</p>
 <label style="max-width:320px">Tampilkan ke publik sampai bulan<select id="phSampai"><option value="">Memuat…</option></select></label>
 <label class="cek" style="display:flex;gap:8px;align-items:center;margin:10px 0"><input type="checkbox" id="phDasCek"> Tampilkan pilihan “Per dasarian” di web</label>
 <button type="button" class="pbtn" id="phAturSimpan">Simpan pengaturan</button></fieldset>
 <h3 style="margin:22px 0 8px">Data yang tampil di web</h3><div id="phDaftarTh"><p class="admnote">Memuat…</p></div><p class="admmsg" id="admMsg"></p></div>`}
async function isiAdmPosHujan(){try{return await isiAdmPosHujan0()}finally{isiAdmPhAtur()}}
async function isiAdmPosHujan0(){const el=document.getElementById("phDaftarTh");if(!el)return;
 try{if(!PH.reg)PH.reg=await phJSON(PH_DIR+"pos.json");PH.kv=(await phJSON(KONTEN_URL+"/poshujan?_="+Date.now())).tahun||{}}catch(e){el.innerHTML=`<p class="admnote">Daftar belum bisa dimuat (${escH(e.message)}). Muat ulang halaman Admin.</p>`;return}
 const th=[...new Set([...Object.keys(PH.reg.tahun||{}),...Object.keys(PH.kv)])].sort().reverse();
 const rentang=b=>b&&b.length?(b.length===12?"Jan–Des":BLN[b[0]-1]+(b.length>1?"–"+BLN[b[b.length-1]-1]:"")):"–";
 el.innerHTML=tbl(["Tahun","Bulan","Pos","Sumber","Tindakan"],th.map(t=>{const u=PH.kv[t],b=(PH.reg.tahun||{})[t],x=u||b;
  return [`<b>${t}</b>`,rentang(x&&x.bulan),x?x.pos:"–",u?`Unggahan Admin, ${escH(tglPendek(String(u.diubah||"").slice(0,10)))}<br><small>${escH(u.sumber||"")}</small>`:"Data bawaan web (arsip Drive)",
   u?`<button type="button" class="mini" data-ph-hapus="${t}">${b?"Hapus unggahan, pakai data bawaan":"Hapus data tahun ini"}</button>`:"–"]}))}
function isiAdmPhAtur(){const sl=document.getElementById("phSampai"),ck=document.getElementById("phDasCek");if(!sl)return;const a=phAtur(),bl=phBulanSemua();
 sl.innerHTML=`<option value="">Semua bulan yang diunggah</option>`+bl.map(x=>`<option value="${x}"${x===a.sampai?" selected":""}>${phNamaBulan(x)}</option>`).join("")+(a.sampai&&!bl.includes(a.sampai)?`<option value="${a.sampai}" selected>${phNamaBulan(a.sampai)}</option>`:"");ck.checked=a.dasarian}
async function phAturSimpan(){const o={sampai:document.getElementById("phSampai").value,dasarian:document.getElementById("phDasCek").checked};pesan("Menyimpan…");
 try{const j=await admJSON("/admin/pengaturan",{kunci:"poshujan",nilai:o});if(j.galat)throw new Error(j.galat);KA.pengaturan=j.pengaturan||{...(KA.pengaturan||{}),poshujan:o};PH.th={};PH.kv=null;PH.bulan="";await isiAdmPosHujan();
  pesan(`Tersimpan. Publik melihat data ${o.sampai?"sampai "+phNamaBulan(o.sampai):"semua bulan yang diunggah"}; tampilan per dasarian ${o.dasarian?"aktif":"tidak aktif"}. Berlaku paling lama 1 menit.`)}catch(e){pesan("Gagal menyimpan: "+(e.message||e),1)}}
document.addEventListener("click",e=>{if(e.target&&e.target.id==="phAturSimpan")phAturSimpan()});
async function phPilihFile(f){const box=document.getElementById("phPratinjau");PH_UNGGAH=null;if(!f){box.innerHTML="";return}
 box.innerHTML=`<p class="admnote">Membaca ${escH(f.name)}…</p>`;
 try{if(!/\.xlsx$/i.test(f.name))throw new Error("Pilih file berformat .xlsx. File .xls lama: buka di Excel lalu Simpan Sebagai .xlsx.");if(f.size>15*1048576)throw new Error("File lebih dari 15 MB. Pastikan ini file data pos hujan.");
  if(!PH.reg)PH.reg=await phJSON(PH_DIR+"pos.json");
  const L=await bacaXlsx(f),bulanan=L.filter(x=>x.rows),h=phSusunTahun(bulanan,PH.reg),bl=Object.keys(h.bulan).map(Number).sort((a,b)=>a-b);
  if(!bl.length)throw new Error(`Tidak ada lembar bulan yang berisi data pos hujan. Lembar di file: ${L.map(x=>x.nama).join(", ")||"-"}. Nama lembar harus nama bulan (mis. "Januari 2026").`);
  const thFile=((f.name.match(/(?:19|20)\d\d/g)||[]).pop())||((bulanan.map(x=>(String(x.nama).match(/(?:19|20)\d\d/)||[])[0]).find(Boolean)))||String(new Date().getFullYear());
  if(h.pos_baru.length){try{const G=(await phGrid()).g;h.pos_baru.forEach(p=>{if(p.lon==null)return;let b=null,jb=1e9;for(const r of G){const j=Math.hypot(r[0]-p.lon,r[1]-p.lat);if(j<jb){jb=j;b=r}}if(b&&jb<=.15)p.nor=b.slice(2,14)})}catch(e){}}
  PH_UNGGAH={h,nama:f.name};
  const st=bl.map(m=>{const s=Object.values(h.bulan[m]).map(phStat);return [m,s.length,s.filter(x=>x.lengkap).length,Math.max(0,...s.map(x=>x.akhir))]});
  const lewat=L.filter(x=>!x.rows).map(x=>x.nama);
  box.innerHTML=`<div class="ph-prev"><p><b>Terbaca dari ${escH(f.name)}:</b> ${bl.length} bulan, ${new Set(Object.values(h.bulan).flatMap(B=>Object.keys(B))).size} pos berisi data.</p>
  ${tbl(["Bulan","Pos berisi data","Data sampai akhir bulan","Catatan"],st.map(([m,n,l,ak])=>[BL[m-1],n,l,l<n/2?`⏳ sementara (umumnya baru sampai tgl ${ak})`:l<n?`${n-l} pos datanya terputus`:"lengkap"]))}
  ${h.pos_baru.length?`<p class="admnote">🆕 <b>${h.pos_baru.length} pos baru</b> (belum ada di daftar web): ${h.pos_baru.map(p=>escH(p.n)+" ("+escH(p.kab)+")").join(", ")}. Pos baru ditambahkan otomatis${h.pos_baru.some(p=>!p.nor)?"; pos tanpa koordinat tidak tampil di peta dan belum punya normal":""}. Bila sebenarnya pos lama yang ganti nama, beri tahu pengelola web agar namanya disatukan.</p>`:""}
  ${lewat.length?`<p class="admnote">Lembar yang dilewati karena bukan nama bulan: ${lewat.map(escH).join(", ")}.</p>`:""}
  ${h.catatan.map(c=>`<p class="admnote">⚠ ${escH(c)}</p>`).join("")}${(h.catatan.length&&catatDok("Data pos hujan: "+f.name,h.catatan),"")}
  <label style="max-width:220px">Tahun data<input type="number" id="phTahun" min="2000" max="2100" value="${escH(thFile)}"></label>
  ${(PH.kv&&PH.kv[thFile])||(PH.reg.tahun||{})[thFile]?`<p class="admnote" id="phGanti">Data tahun ${escH(thFile)} yang sekarang tampil di web akan <b>diganti</b> oleh isi file ini.</p>`:""}
  <button type="button" class="pbtn" id="phSimpan">Simpan &amp; tampilkan di web</button></div>`}
 catch(e){box.innerHTML=`<p class="admmsg err">${escH(e.message||String(e))}</p>`;catatDok("Data pos hujan: "+(f&&f.name||""),e.message||String(e))}}
async function phSimpan(){if(!PH_UNGGAH)return;const t=+document.getElementById("phTahun").value,b=document.getElementById("phSimpan");
 if(!(t>=2000&&t<=2100)){pesan("Isi tahun data dengan benar (mis. 2026).",1);return}
 b.disabled=true;pesan("Menyimpan data pos hujan…");
 try{const {h,nama}=PH_UNGGAH,j=await admJSON("/admin/poshujan",{tahun:t,sumber:nama,bulan:h.bulan,pos_baru:h.pos_baru});
  PH.kv=j.indeks||null;PH.th={};PH_UNGGAH=null;document.getElementById("phPratinjau").innerHTML="";const f=document.getElementById("phFile");if(f)f.value="";
  const x=(j.indeks||{})[t]||{};pesan(`Berhasil disimpan: data pos hujan ${t}, ${(x.bulan||[]).length} bulan, ${x.pos||0} pos. Tampil di halaman Data Pos Hujan paling lama 1 menit.`);isiAdmPosHujan()}
 catch(e){pesan("Gagal menyimpan: "+(e.message||e),1)}finally{b.disabled=false}}
async function phHapus(t){if(!confirm(`Hapus data pos hujan ${t} hasil unggahan?\n\n${(PH.reg.tahun||{})[t]?"Web kembali memakai data bawaan tahun "+t+" (arsip Drive).":"Tahun ini tidak punya data bawaan, jadi datanya hilang dari web."}`))return;
 try{const j=await admJSON("/admin/poshujan-hapus",{tahun:t});PH.kv=j.indeks||null;PH.th={};pesan(`Unggahan ${t} dihapus.`);isiAdmPosHujan()}catch(e){pesan("Gagal menghapus: "+(e.message||e),1)}}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="phFile")phPilihFile(e.target.files&&e.target.files[0])});
document.addEventListener("click",e=>{const t=e.target;if(!t.closest||!t.closest("#admPH"))return;if(t.closest("#phSimpan")){phSimpan();return}const hp=t.closest("[data-ph-hapus]");if(hp)phHapus(hp.dataset.phHapus)});

/* ===== ADMIN: RINGKASAN — satu layar untuk melihat apa yang perlu dikerjakan dan kerja robot & AI ===== */
let ADM_STATUS=null;
const lalu=t=>{const d=Date.parse(t||"");if(!d)return "belum pernah";const m=(Date.now()-d)/6e4;return m<2?"baru saja":m<60?Math.round(m)+" menit lalu":m<1440?Math.round(m/60)+" jam lalu":Math.round(m/1440)+" hari lalu"};
const hariSejak=t=>{const d=Date.parse(t||"");return d?(Date.now()-d)/864e5:1e9};
/* catatan dokumen yang sebagian tidak terbaca / formatnya berubah: disimpan di robot, tampil di Ringkasan sampai ditandai sudah dicek */
function catatDok(sumber,isi){const L=[].concat(isi||[]).map(x=>String(x||"").trim()).filter(Boolean);if(!L.length)return;admJSON("/admin/peringatan-dok",{tambah:{sumber,isi:L.join(" ")}}).then(j=>{RG_DOK=j.daftar||[];gambarRgDok()}).catch(()=>{})}
let RG_DOK=[];
function gambarRgDok(){const el=document.getElementById("rgDok");if(!el)return;el.innerHTML=RG_DOK.length?`<section class="rg-blok rg-dok" role="status"><h3>⚠️ Dokumen perlu dicek <small>(${RG_DOK.length})</small></h3><p class="admnote">Sebagian isi dokumen berikut tidak terbaca otomatis atau formatnya berbeda dari biasanya. Periksa halaman yang terkait, lalu tandai sudah dicek.</p><ul>${RG_DOK.map(x=>`<li><b>${escH(x.sumber)}</b> <small>${escH(tglPMHU(x.t))}</small><br>${escH(x.isi)} <button type="button" class="mini" data-rgdok="${escH(x.id)}">Sudah dicek</button></li>`).join("")}</ul>${RG_DOK.length>1?'<button type="button" class="mini" data-rgdok="semua">Tandai semua sudah dicek</button>':""}</section>`:""}
function isiRgDok(){admJSON("/admin/peringatan-dok",{}).then(j=>{RG_DOK=j.daftar||[];gambarRgDok()}).catch(()=>{})}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-rgdok]");if(!b)return;b.disabled=true;admJSON("/admin/peringatan-dok",{hapus:b.dataset.rgdok}).then(j=>{RG_DOK=j.daftar||[];gambarRgDok()}).catch(er=>{b.disabled=false;pesan(er.message,1)})});
function admRingkasan(){const j=new Date(Date.now()+9*3600e3),jam=j.getUTCHours();
 return `<div id="admRing"><div id="rgDok"></div><div class="rg-sapa"><div><h2>${jam<11?"Selamat pagi":jam<15?"Selamat siang":jam<18?"Selamat sore":"Selamat malam"} 👋</h2>
 <p>Ringkasan keadaan web per ${HARI[j.getUTCDay()]}, ${j.getUTCDate()} ${BL[j.getUTCMonth()]} ${j.getUTCFullYear()} pukul ${String(jam).padStart(2,"0")}.${String(j.getUTCMinutes()).padStart(2,"0")} WIT.</p></div>
 <button type="button" class="mini" id="rgSegar">↻ Perbarui</button></div>
 <section class="rg-blok"><h3>Perlu perhatian</h3><ul class="rg-perlu" id="rgPerlu"><li class="rg-tunggu">Memeriksa…</li></ul></section>
 <section class="rg-blok"><h3>Robot &amp; AI yang bekerja otomatis</h3><p class="admnote" style="margin:-4px 0 12px">Semua ini berjalan sendiri tanpa perlu disentuh. Titik hijau = normal, kuning = perlu dilihat, merah = bermasalah.</p><div class="rg-grid" id="rgRobot"></div></section>
 <section class="rg-blok"><h3>Pengunjung web <small>(30 hari terakhir)</small></h3><div id="rgStat"><p class="admnote">Memuat…</p></div></section>
 <section class="rg-blok"><h3>Galat di perangkat pengunjung <small>(30 hari terakhir)</small></h3><div id="rgGalat"><p class="admnote">Memuat…</p></div></section>
 <section class="rg-blok"><h3>Pintasan</h3><div class="rg-aksi">${[["terbit","📄 Terbitkan buletin / berita"],["kondisi","🌦️ Ubah Kondisi Iklim"],["peringatan","⚠️ Peringatan dini"],["poshujan","🌧️ Unggah data pos hujan"],["periksa","🔎 Periksa web"],["panduan","📘 Panduan"]].map(([k,n])=>`<button type="button" class="rg-btn" data-adm="${k}">${n}</button>`).join("")}</div></section>
 <section class="rg-blok"><h3>Perubahan terakhir</h3><div id="rgUbah"><p class="admnote">Memuat…</p></div></section></div>`}
async function isiAdmRingkasan(){startData();isiRgDok();
 try{ADM_STATUS=await admFetch("/admin/status")}catch(e){ADM_STATUS=null}
 if(!PH.reg)try{PH.reg=await phJSON(PH_DIR+"pos.json")}catch(e){}
 if(ADM_STATUS&&ADM_STATUS.poshujan)PH.kv=ADM_STATUS.poshujan;
 gambarRingkasan();
 /* data alat datang belakangan: gambar ulang sekali lagi setelah tiba */
 let n=0;const tunggu=setInterval(()=>{if(ADM_TAB!=="ringkasan"||++n>20){clearInterval(tunggu);return}if(dataState==="on"&&Object.keys(LAST).length){clearInterval(tunggu);gambarRingkasan()}},1000)}
function gambarRingkasan(){const P1=document.getElementById("rgPerlu");if(!P1)return;const S=ADM_STATUS||{},perlu=[];
 const tambah=(lv,teks,tab,tombol)=>perlu.push({lv,teks,tab,tombol});
 /* masukan pengunjung & SKM */
 if(ADM_MASUKAN){const h=hitungMasukan();if(h.baru||h.tangani)tambah(h.lama?"merah":"kuning",`Masukan pengunjung: ${[h.baru?`<b>${h.baru} baru</b>`:"",h.tangani?`<b>${h.tangani} sedang ditangani</b>`:""].filter(Boolean).join(" dan ")}${h.lama?`, <b>${h.lama} lebih dari 7 hari</b>`:""}.`,"masukan","Buka Masukan")}
 const sk=skmInfo();if(!sk.ada)tambah("kuning","Tautan Survei Kepuasan Masyarakat (SKM) belum diisi, jadi tombol survei tidak tampil.","skm","Isi tautan SKM");else if(sk.lewat)tambah("kuning",`Tautan SKM masih untuk ${escH(namaBulanYM(sk.bulan))}; tombol survei disembunyikan sampai tautan bulan ini diisi.`,"skm","Ganti tautan SKM");
 /* buletin iklim */
 const bul=pubs0().filter(p=>/buletin iklim/i.test(p.kat)).sort((a,b)=>b.ms-a.ms)[0];
 if(!bul)tambah("kuning","Belum ada Buletin Iklim yang diterbitkan lewat Admin.","terbit","Terbitkan");else if((Date.now()-bul.ms)/864e5>45)tambah("kuning",`Buletin Iklim terbaru: <b>${escH(bul.judul)}</b> (${Math.round((Date.now()-bul.ms)/864e5)} hari lalu). Terbitkan buletin bulan ini agar Kondisi Iklim ikut diperbarui.`,"terbit","Terbitkan buletin");
 if(S.kondisi_diubah&&hariSejak(S.kondisi_diubah)>45)tambah("kuning",`Kartu Kondisi Iklim terakhir diperbarui ${lalu(S.kondisi_diubah)}.`,"kondisi","Perbarui");
 /* robot BMKG pusat */
 const bm=S.bmkg||{};if(bm.galat&&hariSejak(bm.diambil)>1)tambah(hariSejak(bm.diambil)>3?"merah":"kuning",`Robot BMKG Pusat belum berhasil mengambil rilisan sejak ${lalu(bm.diambil)} (${escH(String(bm.galat).slice(0,120))}). Biasanya pulih sendiri; bila lebih dari 3 hari, tekan <b>Ambil sekarang</b> di tab BMKG Pusat.`,"bmkg","Buka BMKG Pusat");
 /* alat */
 if(dataState==="on"&&Object.keys(LAST).length){const off=ALAT.filter(a=>statusOf(LAST[a.id])[1]!=="ok"&&statusOf(LAST[a.id])[0]==="Offline");if(off.length)tambah("kuning",`${off.length} alat tidak mengirim data lebih dari sehari: ${off.map(a=>escH(a.nama)).join(", ")}. Periksa daya, modem, atau koneksi VPN/MQTT di lokasi.`,"alat","Lihat Peralatan")}
 /* pos hujan */
 if(PH.reg){const b=phBulanAda().find(ym=>{const i=phLengkap(ym);return i&&i.n&&i.l/i.n>=.5});if(b){const [t,m]=b.split("-"),umur=(new Date().getFullYear()*12+new Date().getMonth())-(+t*12+ +m-1);if(umur>3)tambah("kuning",`Data pos hujan lengkap terakhir: <b>${phNamaBulan(b)}</b>. Unggah file Excel terbaru agar halaman Data Pos Hujan tetap baru.`,"poshujan","Unggah data")}}
 /* galat pengunjung */
 const gl=S.galat_web||[];if(gl.length)tambah(gl.some(x=>x.jumlah>=5)?"merah":"kuning",`${gl.length} jenis galat tercatat di perangkat pengunjung dalam 30 hari terakhir (lihat bagian <b>Galat di perangkat pengunjung</b> di bawah).`,"","");
 if(!ADM_STATUS)tambah("merah","Status robot admin tidak bisa dibaca. Periksa koneksi internet, lalu tekan Perbarui.","","");
 perlu.sort((a,b)=>(a.lv==="merah"?0:1)-(b.lv==="merah"?0:1));
 P1.innerHTML=perlu.length?perlu.map(x=>`<li class="rg-${x.lv}"><span>${x.teks}</span>${x.tab?`<button type="button" class="mini" data-adm="${x.tab}">${x.tombol} →</button>`:""}</li>`).join(""):`<li class="rg-hijau"><span>✅ Semua beres. Tidak ada yang perlu ditindaklanjuti saat ini.</span></li>`;
 /* kartu robot & AI */
 const kartu=(ik,judul,kerja,lv,status)=>`<div class="rg-kartu"><div class="rg-ik" aria-hidden="true">${ik}</div><div><b>${judul}</b><p>${kerja}</p><span class="rg-st rg-${lv}"><i></i>${status}</span></div></div>`;
 const on=ALAT.filter(a=>statusOf(LAST[a.id])[1]==="ok").length,tunda=ALAT.filter(a=>statusOf(LAST[a.id])[1]==="warn").length,mati=ALAT.length-on-tunda;
 const phB=PH.reg?phBulanAda()[0]:"",nPos=PH.reg?(PH.reg.pos||[]).length:0;
 const kk=S.keamanan||{};
 document.getElementById("rgRobot").innerHTML=[
  kartu("📡","Robot data alat AWS/ARG",`Membaca ${ALAT.length} alat lewat MQTT setiap 3 menit, menyimpan rekap harian, dan menampilkan grafik 24 jam.`,dataState!=="on"?"kuning":mati>2?"merah":tunda+mati?"kuning":"hijau",dataState!=="on"?"Menunggu data…":`${on} online · ${tunda} tertunda · ${mati} offline`),
  kartu("🛰️","Robot rilisan BMKG Pusat","Mengambil berita, peringatan dini, dan produk iklim BMKG Pusat setiap 8 jam, lalu memilah yang relevan untuk Papua.",!bm.diambil?"kuning":bm.galat&&hariSejak(bm.diambil)>1?"merah":"hijau",bm.diambil?`Terakhir ${lalu(bm.diambil)} · ${bm.jumlah||0} rilisan`:"Belum pernah berhasil"),
  kartu("🤖","AI pembaca dokumen","Membaca buletin, prediksi musim, press release, dan paparan; mengisi Kondisi Iklim, ringkasan, tabel ZOM, serta memotong peta dari PDF.",S.ai?"hijau":"merah",S.ai?"Terpasang · kuota gratis harian, pulih 09.00 WIT":"Belum dipasang (binding AI)"),
  kartu("🌧️","Data pos hujan",`${nPos} pos hujan dengan normal 1991–2020; dibaca otomatis dari file Excel yang diunggah.`,phB?"hijau":"kuning",phB?`Data sampai ${phNamaBulan(phB)}`:"Belum ada data"),
  kartu("💾","Cadangan otomatis","Isi web dicadangkan setiap pekan (8 pekan terakhir disimpan) dan bisa dipulihkan di tab Cadangan.",S.cadangan&&S.cadangan.terakhir?"hijau":"kuning",S.cadangan&&S.cadangan.terakhir?`Terakhir pekan ${escH(S.cadangan.terakhir)} · ${S.cadangan.jumlah} cadangan`:"Belum ada cadangan"),
  kartu("🛡️","Pengaman",`Password salah ${kk.batas_gagal||10}× dikunci ${kk.kunci_menit||15} menit; sesi berakhir sendiri setelah ${kk.sesi_jam||12} jam; isi dari AI disaring dari spam judi dan perintah tersembunyi.`,"hijau","Aktif"),
  (()=>{const tm=ADM_PERIKSA?(ADM_PERIKSA.temuan||[]).filter(x=>x.tingkat!=="info"):[];return kartu("🔎","Pemeriksa web","Mengecek gambar yang gagal tampil, tautan mati, isi yang basi, dan kolom kosong di seluruh halaman.",ADM_PERIKSA?(tm.some(x=>x.tingkat==="merah")?"merah":tm.length?"kuning":"hijau"):"kuning",ADM_PERIKSA?(tm.length?tm.length+" temuan · buka tab Periksa Web":"Tidak ada masalah"):"Belum diperiksa sesi ini")})()].join("");
 /* galat pengunjung */
 {const E=document.getElementById("rgStat"),st=S.statistik;if(E){if(!st||!st.hari)E.innerHTML=`<p class="admnote">Statistik belum tersedia. Pastikan robot admin versi terbaru sudah dipasang.</p>`;else{
  const H=st.hari,jml=(a,f)=>a.reduce((x,y)=>x+(+y[f]||0),0),hi=H[H.length-1],m7=H.slice(-7),mx=Math.max(1,...H.map(x=>x.v)),ang=n=>Number(n).toLocaleString("id-ID");
  const NH=h=>(({beranda:"Beranda",wilayah:"Info Wilayah Saya",alat:"Detail alat",berita:"Detail berita"})[h])||(a=>a&&a.textContent.trim())([...document.querySelectorAll("nav a[href]")].find(a=>new RegExp("[#/]"+h+"$").test(a.getAttribute("href"))))||h.replace(/^iklim-/,"Iklim ").replace(/-/g," ").replace(/^./,c=>c.toUpperCase());
  E.innerHTML=`<div class="rs-kpi"><div><b>${ang(hi.v)}</b><span>pengunjung hari ini</span></div><div><b>${ang(jml(m7,"v"))}</b><span>7 hari terakhir</span></div><div><b>${ang(jml(H,"v"))}</b><span>30 hari terakhir</span></div><div><b>${ang(jml(H,"p"))}</b><span>halaman dibuka (30 hari)</span></div><div class="rs-ptg"><b>${ang(jml(H,"sv"))}</b><span>kunjungan petugas (30 hari, terpisah)</span></div></div>
  <div class="rs-bar" role="img" aria-label="Pengunjung per hari selama 30 hari terakhir, tertinggi ${ang(mx)} pengunjung">${H.map(x=>`<i style="height:${Math.max(2,Math.round(x.v/mx*100))}%" title="${tglPendek(x.t)}: ${ang(x.v)} pengunjung, ${ang(x.p)} halaman${x.sv?`; petugas ${ang(x.sv)}`:""}"></i>`).join("")}</div>
  <div class="rs-kaki"><span>${tglPendek(H[0].t)}</span><span>hari ini</span></div>
  ${st.halaman&&st.halaman.length?`<h4 class="rs-h">Halaman paling banyak dibuka bulan ini</h4><ol class="rs-hal">${st.halaman.slice(0,8).map(x=>`<li><span>${escH(NH(x.h))}</span><b>${ang(x.n)}</b></li>`).join("")}</ol>`:`<p class="admnote">Belum ada kunjungan tercatat bulan ini.</p>`}
  <p class="admnote">Satu perangkat dihitung satu pengunjung per hari; tiap halaman dihitung sekali per perangkat per hari. Hanya hitungan yang disimpan, tanpa alamat IP atau data pribadi. Petugas yang sedang login dihitung terpisah (kotak abu-abu) dan tidak masuk angka pengunjung; robot mesin pencari tidak dihitung. Angka ini perkiraan, bukan hitungan pasti, dan biasanya lebih kecil dari angka Cloudflare yang menghitung semua kunjungan.</p>`}}}
 const G=document.getElementById("rgGalat");if(G)G.innerHTML=gl.length?tbl(["Pesan galat","Halaman","Kejadian","Terakhir"],gl.map(x=>[`<code>${escH(x.pesan)}</code>${x.sumber?`<br><small>${escH(x.sumber)}</small>`:""}`,escH(x.hal||"-"),x.jumlah>=5?`<b>${x.jumlah}×</b>`:x.jumlah+"×",escH(lalu(x.terakhir))+(x.ua?`<br><small>${escH(x.ua)}</small>`:"")]))+`<p class="admnote">Galat dicatat otomatis (tanpa data pribadi) bila web bermasalah di HP/komputer pengunjung. Kirim daftar ini ke pengelola web, lalu tekan <b>Tandai sudah ditangani</b>.</p><button type="button" class="mini" id="rgGalatHapus">Tandai sudah ditangani (kosongkan)</button>`:`<p class="admnote">✅ Tidak ada galat tercatat. Web berjalan normal di perangkat pengunjung.</p>`;
 const U=document.getElementById("rgUbah");if(U)U.innerHTML=(S.perubahan||[]).length?`<ul class="rg-riw">${S.perubahan.map(x=>`<li><b>${escH(x.aksi)}</b><span>${escH(lalu(x.waktu))}</span></li>`).join("")}</ul><p class="admnote">Semua perubahan bisa dikembalikan di tab <button type="button" class="tlink" data-adm="riwayat">Riwayat</button>.</p>`:`<p class="admnote">Belum ada perubahan.</p>`}
/* tanggal publikasi: "2026-10-13", "15 Oktober 2026", atau "Oktober 2026" -> milidetik */
function tglKeMs(t){t=String(t||"");if(/^\d{4}-\d{2}-\d{2}/.test(t))return Date.parse(t.slice(0,10));const m=t.toLowerCase().match(/(?:(\d{1,2})\s+)?(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+(\d{4})/);
 return m?Date.UTC(+m[3],PH_BLN.indexOf(m[2]),m[1]?+m[1]:1):0}
function pubs0(){try{return [...((KA&&KA.publikasi)||[]).map(p=>({kat:String(p.jenis||""),judul:p.judul,ms:tglKeMs(p.tanggal)})),...(typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).map(p=>({kat:String(p.kategori||"")+" "+p.judul,judul:p.judul,ms:tglKeMs(p.tanggal)}))].filter(p=>p.ms)}catch(e){return []}}
document.addEventListener("click",e=>{const t=e.target;if(!t.closest||!t.closest("#admRing"))return;
 if(t.closest("#rgSegar")){ADM_STATUS=null;document.getElementById("rgPerlu").innerHTML=`<li class="rg-tunggu">Memeriksa…</li>`;muatMasukan().then(isiAdmRingkasan);return}
 if(t.closest("#rgGalatHapus")){if(!confirm("Kosongkan daftar galat? Lakukan setelah galatnya dilaporkan atau diperbaiki."))return;admFetch("/admin/galat-hapus").then(()=>{if(ADM_STATUS)ADM_STATUS.galat_web=[];gambarRingkasan();pesan("Daftar galat dikosongkan.")}).catch(er=>pesan(er.message,1))}});
/* laporan galat otomatis dari perangkat pengunjung: hanya pesan galat teknis dan nama halaman, tanpa data pribadi */
(()=>{if(!KONTEN_URL||!/^https?:$/.test(location.protocol))return;const sudah=new Set();let n=0;
 const lapor=(pesan,sumber)=>{try{const p=String(pesan||"").replace(/\s+/g," ").trim().slice(0,200);
   if(!p||/^Script error\.?$|Failed to fetch|NetworkError|Load failed|aborted|ResizeObserver loop|Non-Error promise rejection|chrome-extension|moz-extension|safari-extension/i.test(p+" "+sumber))return;
   const k=p+"|"+cur;if(sudah.has(k)||n>=5)return;sudah.add(k);n++;
   const ua=navigator.userAgent,body=JSON.stringify({pesan:p,sumber:String(sumber||"").slice(0,160),hal:cur,ua:((ua.match(/(Edg|OPR|Firefox|SamsungBrowser|Chrome|Version)\/\d+/)||[""])[0].replace("Version","Safari")+" · "+((ua.match(/Android|iPhone|iPad|Windows|Mac OS X|Linux/)||[""])[0])).slice(0,60)});
   if(navigator.sendBeacon&&navigator.sendBeacon(KONTEN_URL+"/galat",new Blob([body],{type:"text/plain"})))return;fetch(KONTEN_URL+"/galat",{method:"POST",body,keepalive:true}).catch(()=>{})}catch(e){}};
 addEventListener("error",e=>{if(!e.message)return;const f=String(e.filename||"");if(f&&!f.startsWith(location.origin))return;lapor(e.message,f.replace(location.origin,"")+(e.lineno?":"+e.lineno:""))});
 addEventListener("unhandledrejection",e=>{const r=e.reason;lapor("Promise: "+(r&&r.message||r),r&&r.stack?String(r.stack).split("\n")[1]||"":"")})})();


/* ===== Versi ringkas untuk HP: bagian panjang dilipat, dibuka dengan ketukan. Di komputer & tablet tidak berpengaruh (aturannya hanya ada di CSS layar sempit). ===== */
const HP=matchMedia("(max-width:640px)"),LIPAT_PILIH=new Map(),LIPAT_KEPALA=":scope>.sechead,:scope>.panel-head,:scope>.pusathead,:scope>h3,:scope>.eyebrow";
const lipatKunci=el=>cur+"|"+(el.id||((el.querySelector(".sechead h2,.panel-head>span,.pusathead b,h3,.eyebrow")||{}).textContent||"").trim().slice(0,48));
function pasangLipat(){const k=cur;if(k==="admin")return;
 app.querySelectorAll(".awam,.pusatbar").forEach(e=>{if(e.dataset.lipat==null)e.dataset.lipat=""});
 if(IKLIM.includes(k)&&k!=="wilayah"&&k!=="pos-hujan"){let pertama=!app.querySelector('.panel[data-lipat="buka"]');
  app.querySelectorAll(".panel").forEach(p=>{if(p.dataset.lipat!=null)return;if(p.closest("[data-otogrup]")){p.dataset.lipat="";return}p.dataset.lipat=pertama?"buka":"";pertama=false})}
 if(k==="iklim-papua-barat"||k==="zona-musim")app.querySelectorAll(".sec").forEach((x,i)=>{if(x.dataset.lipat==null)x.dataset.lipat=i?"":"buka"});
 app.querySelectorAll(".wilgrid>.wilk").forEach(c=>{if(c.dataset.lipat!=null)return;c.dataset.lipat=c.matches(".lv-bad,.lv-warn")||/normal hujan|catatan dari kami/i.test((c.querySelector(".eyebrow")||{}).textContent||"")?"buka":""});
 const g=document.getElementById("gempaSec");if(g&&g.dataset.lipat!=null){const t=document.getElementById("gempaTsu");g.dataset.lipat=g.querySelector("#gempaBox .gp-kartu:not(.aman):not(.kosong)")||(t&&t.childElementCount)?"buka":""}
 const hp=HP.matches;
 app.querySelectorAll("[data-lipat]").forEach(el=>{const pil=LIPAT_PILIH.get(lipatKunci(el)),buka=pil!=null?pil:el.dataset.lipat==="buka";el.classList.toggle("buka",buka);
  const h=el.querySelector(LIPAT_KEPALA);if(!h)return;if(hp){h.setAttribute("role","button");h.tabIndex=0;h.setAttribute("aria-expanded",String(buka))}else if(h.getAttribute("role")==="button"){h.removeAttribute("role");h.removeAttribute("tabindex");h.removeAttribute("aria-expanded")}})}
function lipatTukar(el,buka){LIPAT_PILIH.set(lipatKunci(el),buka);el.classList.toggle("buka",buka);const h=el.querySelector(LIPAT_KEPALA);if(h)h.setAttribute("aria-expanded",String(buka));
 if(buka){dispatchEvent(new Event("resize"));const r=el.getBoundingClientRect();if(r.top<70)scrollBy({top:r.top-80,behavior:"smooth"})}}
document.addEventListener("click",e=>{if(!HP.matches||!e.target.closest)return;const el=e.target.closest("[data-lipat]");if(!el||!app.contains(el))return;
 if(!el.classList.contains("buka")){if(e.target.closest(".pensil"))return;e.preventDefault();e.stopPropagation();lipatTukar(el,true);return}
 const h=e.target.closest(".sechead,.panel-head,.pusathead,h3,.eyebrow");if(h&&h.parentElement===el&&!e.target.closest("a,button,select,input,.tabs"))lipatTukar(el,false)},true);
document.addEventListener("keydown",e=>{if(!HP.matches||(e.key!=="Enter"&&e.key!==" "))return;const h=e.target;if(!h.matches||!h.matches('[role="button"][aria-expanded]'))return;const el=h.closest("[data-lipat]");if(el&&h.parentElement===el){e.preventDefault();lipatTukar(el,!el.classList.contains("buka"))}});
{let tl=0;new MutationObserver(()=>{clearTimeout(tl);tl=setTimeout(pasangLipat,50)}).observe(app,{childList:true,subtree:true});(HP.addEventListener?HP.addEventListener("change",pasangLipat):HP.addListener(pasangLipat))}

let MENU_TUTUP=false;
/* Bilah kecil saat petugas sedang login: tampil di semua halaman selain Admin, supaya bisa keluar tanpa kembali ke menu Admin */
function bilahAdmin(){let b=document.getElementById("bilahAdm");const perlu=typeof ADM_PASS!=="undefined"&&!!ADM_PASS&&cur!=="admin";
 if(!perlu){if(b)b.remove();return}
 if(!b){b=document.createElement("div");b.id="bilahAdm";b.setAttribute("role","status");b.innerHTML='<span><i aria-hidden="true"></i>Mode Admin aktif</span><a href="#admin">Menu Admin</a><button type="button" id="bilahKeluar">Keluar</button>';document.body.appendChild(b);
  b.querySelector("#bilahKeluar").onclick=()=>{ADM_PASS="";try{sessionStorage.removeItem("admPass")}catch(e){}b.remove();render()}}}
/* Statistik kunjungan: hanya hitungan halaman, tanpa data pribadi. Petugas yang sedang login tidak dihitung. */
const KJ={antre:new Set(),baru:false,hari:""};
function catatKunjung(k){try{if(!KONTEN_URL||navigator.webdriver&&!window.__ujiKunjung)return;
 /* petugas yang sedang login dicatat terpisah (kunci simpanan & hitungan sendiri), supaya angka masyarakat tidak tercampur */
 const ptg=typeof ADM_PASS!=="undefined"&&/^t1\./.test(ADM_PASS||"");if(k==="admin"&&!ptg)return;
 if(KJ.antre.size&&KJ.ptg!==ptg)kirimKunjung();KJ.ptg=ptg;const kunci=ptg?"kunjungP":"kunjung";
 const hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);let c={};try{c=JSON.parse(localStorage.getItem(kunci)||"{}")}catch(e){}
 if(c.hari!==hari){c={hari,hal:[]};KJ.baru=true}const hal=String(k||"beranda").replace(/^(alat|berita|pub)-.*$/,"$1");
 if(c.hal.includes(hal))return;c.hal.push(hal);try{localStorage.setItem(kunci,JSON.stringify(c))}catch(e){}
 KJ.antre.add(hal);clearTimeout(KJ.t);KJ.t=setTimeout(kirimKunjung,KJ.baru?4000:15000)}catch(e){}}
function kirimKunjung(){try{if(!KJ.antre.size)return;const o={hal:[...KJ.antre],baru:KJ.baru};if(KJ.ptg&&ADM_PASS)o.petugas=ADM_PASS;const body=JSON.stringify(o);KJ.antre.clear();KJ.baru=false;
 if(!(navigator.sendBeacon&&navigator.sendBeacon(KONTEN_URL+"/kunjung",new Blob([body],{type:"text/plain"}))))fetch(KONTEN_URL+"/kunjung",{method:"POST",body,keepalive:true}).catch(()=>{})}catch(e){}}
addEventListener("pagehide",kirimKunjung);document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")kirimKunjung()});
/* tautan "Lompat ke isi utama": langsung ke isi halaman tanpa melewati menu (untuk pengguna papan ketik & pembaca layar) */
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest("[data-loncat]");if(!a)return;e.preventDefault();e.stopPropagation();const m=document.getElementById("isi-utama");if(m){m.focus({preventScroll:true});m.scrollIntoView({block:"start"})}},true);
try{const lg=document.querySelector("img.logo");if(lg&&lg.src)document.documentElement.style.setProperty("--logo-bmkg",`url("${lg.src}")`)}catch(e){}
function go(k){if(k==="kontak")k="layanan-data";const baru=(P[k]||dinamis(k))?k:"beranda";
 const dl=document.getElementById("dlgUmum"),diDlg=history.state&&history.state.dlg;if(dl)dl.remove();
 if(baru!==cur||halDariLokasi()!==baru){try{if(diDlg)history.replaceState({y:0},"",urlHal(baru));else{history.replaceState({...(history.state||{}),y:scrollY},"");history.pushState({y:0},"",urlHal(baru))}}catch(e){}}
 cur=baru;MENU_TUTUP=true;render()}
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"],a[data-hal]');if(!a)return;if(a.dataset.hal&&(e.ctrlKey||e.metaKey||e.shiftKey||e.button))return;e.preventDefault();const h=a.dataset.hal||a.getAttribute("href").slice(1);
 /* klik Beranda atau nama stasiun = muat ulang halaman agar isi terbaru langsung tampil */
 if(h==="beranda"&&!e.ctrlKey&&!e.metaKey){try{if(cur!=="beranda"||halDariLokasi()!=="beranda"){history.replaceState({...(history.state||{}),y:scrollY},"");history.pushState({y:0},"",urlHal("beranda"))}}catch(er){}location.reload();return}
 go(h)});
/* isi dari admin & BMKG pusat dicek ulang tiap 5 menit dan saat tab dibuka kembali */
setInterval(()=>{if(!document.hidden&&cur!=="admin")muatKonten(1)},300000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&cur!=="admin"&&Date.now()-KA_WAKTU>60000)muatKonten(1)});
let OBS=null;
function pasangReveal(){if(OBS)OBS.disconnect();if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 document.documentElement.classList.add("anim");
 app.querySelectorAll(".sec>.sechead,.kbig,#liveBox,.featwrap,.kontakgrid,.band .bandin").forEach(el=>el.classList.add("reveal"));
 [".ks",".lv",".pubc",".nitem"].forEach(sel=>app.querySelectorAll(sel).forEach((el,i)=>{el.classList.add("reveal");el.style.setProperty("--d",(i%8)*70+"ms")}));
 const ang=app.querySelector(".kangka");if(ang&&!ang.dataset.n){ang.dataset.n=1;const target=parseFloat(ang.dataset.v)||3.08,t0=performance.now();const step=t=>{const p=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-p,3);ang.textContent=(target<0?"−":"+")+Math.abs(target*e).toFixed(2).replace(".",",");if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
 const T0R=performance.now();OBS=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(performance.now()-T0R<400)e.target.classList.add("langsung");e.target.classList.add("in");OBS.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
 app.querySelectorAll(".reveal").forEach(el=>OBS.observe(el))}
/* animasi hanya berjalan saat terlihat di layar (hemat baterai ponsel) */
const IO_HIDUP="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(en=>en.target.classList.toggle("hidup",en.isIntersecting)),{rootMargin:"120px"}):null;
function pasangHidup(){const els=app.querySelectorAll(".nimg,.pubimg,.dokimg,.pfviz,.awc,.hslider");if(IO_HIDUP)IO_HIDUP.disconnect();els.forEach(e=>{e.classList.add("hidupkan");if(IO_HIDUP)IO_HIDUP.observe(e);else e.classList.add("hidup")})}
let HID_T=0;new MutationObserver(()=>{cancelAnimationFrame(HID_T);HID_T=requestAnimationFrame(pasangHidup)}).observe(app,{childList:true,subtree:true});
function render(){if(typeof terapkanPMHU==="function")try{terapkanPMHU()}catch(e){}
  const k=cur;app.innerHTML=k.startsWith("berita-")?beritaDetail(k.slice(7)):k.startsWith("alat-")?detailAlat(k.slice(5)):KAB_HAL[k]?halKab(k):(P[k]||P.beranda)();
  app.classList.remove("masuk");void app.offsetWidth;app.classList.add("masuk");
  document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("on",a.dataset.nav===k));
  ib.classList.toggle("on",IKLIM.includes(k));pb.classList.toggle("on",PROFIL_HAL.includes(k));
  /* menu hanya ditutup saat pengunjung berpindah halaman, bukan saat halaman digambar ulang otomatis karena data baru masuk */
  if(MENU_TUTUP||render.hal!==k){drop.hidden=true;ib.setAttribute("aria-expanded","false");pdrop.hidden=true;pb.setAttribute("aria-expanded","false");
  if(innerWidth<=640){nav.hidden=true;bg.setAttribute("aria-expanded","false")}}
  MENU_TUTUP=false;render.hal=k;bilahAdmin();catatKunjung(k);
  [["tabsA","bodyA"],["tabsF","bodyF"]].forEach(([tid,bid])=>{const t=document.getElementById(tid);if(!t)return;const body=document.getElementById(bid);const show=k=>{body.innerHTML=HB[k]};show(t.querySelector(".on").dataset.t);
    t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));show(b.dataset.t)}});
  if(k.startsWith("alat-")){ib.classList.remove("on");document.querySelector('[data-nav="peralatan"]').classList.add("on");startData();isiGrafikDetail(k.slice(5));isiRekap(k.slice(5))}
  if(KAB_HAL[k]){ib.classList.remove("on");const kb=KAB_HAL[k][0];setTimeout(()=>{if(cur===k){pasangIstilah(app);pasangReveal()}},0);if(DATA_URL&&!Object.keys(LAST).length){startData();setTimeout(()=>{if(cur===k){const i=document.getElementById("wilIsi");if(i){i.innerHTML=isiWilayah(kb,"");pasangIstilah(i);pasangReveal()}}},4000)}}
  if(k==="wilayah"){pasangWilayah();if(DATA_URL&&!Object.keys(LAST).length){startData();setTimeout(()=>{if(cur==="wilayah"){const i=document.getElementById("wilIsi"),kb=document.getElementById("wilKab"),ds=document.getElementById("wilDis");if(i&&kb)i.innerHTML=isiWilayah(kb.value,ds.value)}},4000)}}
  if(IKLIM.includes(k))setTimeout(()=>{if(cur===k)pasangIstilah(app)},0);
  tandaiOto(app);pasangLipat();
  if(k==="beranda"||PUSAT_HAL.includes(k)||/^iklim-/.test(k))muatPusat();
  if(k==="beranda"){mulaiSlider();startData();pasangReveal();muatGempa()}
  if(PROFIL_HAL.includes(k)||k==="layanan-data"||IKLIM.includes(k))pasangReveal();
  if(k==="pos-hujan")pasangPosHujan();if(k==="layanan-data")pasangPD();
  if(k==="admin")pasangAdmin();else{app.onclick=null;app.onsubmit=null}
  {const tp=document.getElementById("tabsPola");if(tp)tp.onclick=e=>{const b=e.target.closest("button");if(!b)return;tp.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));const pb=document.getElementById("polaBox");pb.innerHTML=grafikPola(+b.dataset.i);gambarRc(pb)}}
  if(k==="peralatan"){startData();drawAlat();const t=document.getElementById("tabsAl");t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));drawAlat()}}
  document.querySelectorAll(".tabs[data-grup]").forEach(t=>{t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(`[data-pgrup="${t.dataset.grup}"]`).forEach(pn=>pn.hidden=pn.dataset.p!==b.dataset.t)}});
  if(document.querySelector("[data-news]"))muatBerita();
  const cm=document.getElementById("copyMail");
  if(cm)cm.onclick=()=>{const t=document.getElementById("mail").textContent;navigator.clipboard.writeText(t).then(()=>cm.textContent="Tersalin").catch(()=>{const r=document.createRange();r.selectNodeContents(document.getElementById("mail"));const sel=getSelection();sel.removeAllRanges();sel.addRange(r)})};
  pasangMeta(k);rapikanTautan();gambarRc(app);pasangPensil();
  scrollTo({top:0});
}
[[ib,drop],[pb,pdrop]].forEach(([btn,dd])=>{const li=btn.parentElement;
 li.addEventListener("mouseenter",()=>{if(innerWidth>640){dd.hidden=false;btn.setAttribute("aria-expanded","true")}});
 li.addEventListener("mouseleave",()=>{if(innerWidth>640){dd.hidden=true;btn.setAttribute("aria-expanded","false")}});
 btn.onclick=e=>{e.stopPropagation();dd.hidden=innerWidth>640?false:!dd.hidden;btn.setAttribute("aria-expanded",String(!dd.hidden))};
 document.addEventListener("click",e=>{if(!e.target.closest("#"+dd.id)&&e.target!==btn){dd.hidden=true;btn.setAttribute("aria-expanded","false")}})});
function ukurNav(){if(innerWidth>640){nav.style.maxHeight="";return}if(nav.hidden)return;const h=document.querySelector("header").getBoundingClientRect().bottom;nav.style.maxHeight=Math.max(220,innerHeight-h-6)+"px"}
bg.onclick=()=>{nav.hidden=!nav.hidden;bg.setAttribute("aria-expanded",String(!nav.hidden));ukurNav()};
addEventListener("resize",ukurNav);addEventListener("scroll",ukurNav,{passive:true});
let FIT_HP=null;function fit(){const hp=innerWidth<=640;if(hp===FIT_HP)return;FIT_HP=hp;nav.hidden=hp;bg.setAttribute("aria-expanded",String(!nav.hidden))}
addEventListener("resize",fit);fit();
function ikutiRiwayat(ev){const dl=document.getElementById("dlgUmum");if(dl&&ev&&ev.type==="popstate"){dl._tutup&&dl._tutup(1)}
 let k=halDariLokasi();if(RUTE_PATH&&location.hash.length>1){try{history.replaceState(history.state,"",urlHal(k))}catch(e){}}
 if(k!==cur){cur=(P[k]||dinamis(k))?k:"beranda";render();const y=ev&&ev.state&&ev.state.y;if(y)requestAnimationFrame(()=>setTimeout(()=>scrollTo({top:y}),30))}}
/* catatan prakiraan + aturan awal musim (16 Nov 2026).
   PMH_SEDANG_UPDATE=true → kalimat "maju atau mundur, diperbarui berkala" (dipakai tetap untuk musim hujan). */
const PMH_SEDANG_UPDATE=true;
const catPrak=upd=>`<div class="catatan-pmh" role="note"><span class="cp-ikon" aria-hidden="true">i</span><div><b>Ini prakiraan, bukan kepastian.</b><p>${upd?"Awal musim bisa maju atau mundur. Prakiraan diperbarui berkala mengikuti data iklim terbaru, dan versi terbarunya akan tampil di sini.":"Kondisi sebenarnya bisa berbeda. Pembaruan resmi BMKG akan tampil di sini."}</p></div></div>`;
const sisipCat=(h,c)=>{const k=h.indexOf("</p></div>");return k<0?c+h:h.slice(0,k+10)+c+h.slice(k+10)};
const kabNonZom=()=>{const L=[];Object.values(typeof WIL_NONZOM!=="undefined"?WIL_NONZOM:{}).join("; ").split(/;\s*/).forEach(x=>{const m=x.replace(/^sebagian\s+/i,"").replace(/\s*\(.*\)$/,"").replace(/,.*$/,"").trim();if(m&&!L.includes(m))L.push(m)});return L};
const aturanMusim=jenis=>{const hj=jenis==="hujan",kab=kabNonZom();
 return `<details class="card aturan-musim"><summary><b>Bagaimana awal musim ditentukan?</b></summary>
 <h3>Aturan awal ${hj?"musim hujan":"musim kemarau"} (kriteria BMKG)</h3>
 <p>${hj?"Curah hujan dalam satu dasarian (10 hari) <b>50 mm atau lebih</b>, lalu diikuti <b>dua dasarian berikutnya</b> yang juga 50 mm atau lebih.":"Curah hujan dalam satu dasarian (10 hari) <b>kurang dari 50 mm</b>, lalu diikuti <b>dua dasarian berikutnya</b> yang juga kurang dari 50 mm."}</p>
 <h3>Kenapa ada wilayah tanpa awal musim?</h3>
 <p>Di sebagian wilayah, hujan turun hampir sepanjang tahun sehingga tidak ada pergantian yang jelas antara musim hujan dan musim kemarau. Wilayah ini disebut <b>Tipe 1 Musim (Non-ZOM)</b> dan tidak punya tanggal awal musim. Penyebabnya antara lain letak dekat khatulistiwa, laut hangat di sekitarnya, dan pegunungan yang membuat udara lembap naik menjadi awan hujan.</p>
 ${kab.length?`<p>Di Papua Barat dan Papua Barat Daya ada ${Object.keys(WIL_NONZOM).length} wilayah Tipe 1 Musim, meliputi sebagian ${kab.join(", ").replace(/, ([^,]*)$/," dan $1")}. Di peta, wilayah ini ditandai arsiran.</p>`:""}
 <h3>Musim bisa tidak terjadi</h3>
 <p>Di wilayah yang punya dua musim pun, pada tahun tertentu musim kemarau bisa tidak terjadi (misalnya saat La Niña), atau musim hujan datang terlambat dan lebih pendek (misalnya saat El Niño).</p></details>`};
/* Perkembangan terbaru prediksi musim hujan.
   Sumber: tabel kesepakatan UPDATE PMH (Excel) yang diunggah petugas di Admin › Update Prediksi Musim.
   Publik hanya melihat ringkasan, dan hanya bila petugas mencentang "Tampilkan ke publik".
   Kotak hilang sendiri setelah dokumen prediksi musim hujan resmi yang baru diunggah lewat Admin. */
const PMH_MUNDUR=true; /* teks bawaan (pengamatan Dasarian I Nov 2026) selama tabel update belum diunggah */
const BLN_PMH=["JAN","FEB","MAR","APR","MEI","JUN","JUL","AGT","SEP","OKT","NOV","DES"],NM_BLN_PMH=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const dasPMH=t=>{const m=String(t||"").toUpperCase().replace("AGU","AGT").match(/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES)\s+(I{1,3})$/);if(!m)return null;const b=BLN_PMH.indexOf(m[1]);return {b,i:(b>=6?b-6:b+6)*3+m[2].length-1,th:b>=6?2026:2027}};
const blnPMH=v=>{v=String(v==null?"":v).trim();if(/^\d{5}(\.\d+)?$/.test(v)){const d=new Date(Math.round((+v-25569)*864e5));return BLN_PMH[d.getUTCMonth()]+" "+d.getUTCFullYear()}
 const m=v.toUpperCase().replace("AGU","AGT").match(/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES)[A-Z]*\.?\s*(20\d\d)?$/);if(!m)return "";const b=BLN_PMH.indexOf(m[1]);return m[1]+" "+(m[2]||(b>=9?2026:2027))};
const kBln=t=>{const m=String(t||"").match(/^([A-Z]{3}) (20\d\d)$/);return m?+m[2]*12+BLN_PMH.indexOf(m[1]):null};
const nmBln=k=>NM_BLN_PMH[k%12]+" "+Math.floor(k/12);
/* rentang bulan terpendek (maks. 3 bulan berurutan) yang mencakup sebagian besar zona */
function jendelaBln(keys){const hit={};keys.forEach(k=>hit[k]=(hit[k]||0)+1);const ks=Object.keys(hit).map(Number).sort((a,b)=>a-b);let best=null;
 for(let L=1;L<=3;L++){best=null;ks.forEach(a=>{let c=0;for(let i=0;i<L;i++)c+=hit[a+i]||0;if(!best||c>best.c)best={a,c,L}});if(best.c*2>=keys.length)break}
 const b=best.a,e=best.a+best.L-1,teks=best.L===1?nmBln(b):NM_BLN_PMH[b%12]+(Math.floor(b/12)!==Math.floor(e/12)?" "+Math.floor(b/12):"")+"–"+nmBln(e);
 return {teks,c:best.c,n:keys.length,akhir:ks[ks.length-1],lambat:ks[ks.length-1]>e}}
/* dasarian: musim hujan diurutkan Juli–Juni (lintas tahun), musim kemarau dalam satu tahun PMK */
function dasJ(t,u){if(!u||u.jenis!=="kemarau")return dasPMH(t);const m=String(t||"").toUpperCase().replace("AGU","AGT").match(/^(JAN|FEB|MAR|APR|MEI|JUN|JUL|AGT|SEP|OKT|NOV|DES)\s+(I{1,3})$/);if(!m)return null;const b=BLN_PMH.indexOf(m[1]);return {b,i:b*3+m[2].length-1,th:+u.tahun||new Date().getFullYear()}}
function ringkasPMHUpd(u){const nmJ=u&&u.jenis==="kemarau"?"kemarau":"hujan",z=(u&&u.zom||[]).map(x=>({...x,s:dasJ(x.semula,u),n:dasJ(x.baru,u)})).filter(x=>x.s&&x.n);if(!z.length)return null;
 const mundur=z.filter(x=>x.n.i>x.s.i).length,maju=z.filter(x=>x.n.i<x.s.i).length,tetap=z.length-mundur-maju;
 const aw=jendelaBln(z.map(x=>x.n.th*12+x.n.b)),awR=jendelaBln(z.map(x=>x.s.th*12+x.s.b));
 const pk=(u.zom||[]).map(x=>kBln(x.puncak||x.prilis)).filter(x=>x!=null),pkR=(u.zom||[]).map(x=>kBln(x.prilis)).filter(x=>x!=null);
 const pun=pk.length>=15?jendelaBln(pk):null,punR=pkR.length>=15?jendelaBln(pkR):null;
 const arah=mundur>maju?"mundur":maju>mundur?"maju":"tetap";
 const judul=`Awal musim ${nmJ} `+(arah==="mundur"?"diprediksi mundur":arah==="maju"?"diprediksi maju":"sesuai prediksi");
 const kal=`${arah==="tetap"?"Sebagian besar dari":`${arah==="mundur"?mundur:maju} dari`} ${z.length} zona musim yang memiliki musim hujan dan kemarau diprediksi ${arah==="tetap"?`memasuki musim ${nmJ} sesuai prediksi semula`:(arah==="mundur"?"mundur":"maju")+" dari prediksi semula"}. Musim ${nmJ} diprediksi mulai <b>${aw.teks}</b>${aw.lambat?`, sebagian lebih lambat hingga ${nmBln(aw.akhir)}`:""}${pun?`, dengan puncak <b>${pun.teks}</b>`:""}.`;
 return {judul,teks:kal,singkat:kal.replace(/<[^>]+>/g,""),arah,mundur,maju,tetap,n:z.length,aw,awR,pun,punR}}
/* ===== Pembaruan prakiraan per ZOM (dari tabel UPDATE PMH di Admin) =====
   Dipasang ke data ZOM web (ZOM_PMH, ZOM11, isi dokumen) hanya bila petugas mencentang "Tampilkan ke publik"
   dan belum ada Press Release resmi yang lebih baru. Nilai semula disimpan untuk keterangan "semula …". */
const ZOM_PMH_ASLI=JSON.parse(JSON.stringify(ZOM_PMH)),ZOM11_ASLI=JSON.parse(JSON.stringify(ZOM11));
let PMHU_TERPASANG="",PMHU_SEMULA={};
const SIFAT_KODE={N:"Normal",A:"Atas Normal",B:"Bawah Normal"},ROM_PMHU=["I","II","III"];
const tglPMHU=w=>{const d=new Date(w);return isNaN(d)?"":d.getDate()+" "+NM_BLN_PMH[d.getMonth()]+" "+d.getFullYear()};
function pmhuAktif(){const u=KA&&KA.pengaturan&&KA.pengaturan.pmh_update,resmi=String((IK().musim_hujan||{})._dipasang||"");return u&&u.diunggah&&u.tampil&&!(resmi&&resmi>u.diunggah)&&(u.zom||[]).some(z=>nomorZ(z))?u:null}
function pmhuPeta(u){const out={};(u.zom||[]).forEach(z=>{const w=nomorZ(z);if(!w)return;const o={};
  const b=dasJ(z.baru||z.semula,u),nr=dasJ(z.normal,u);if(b){o.awal=NM_BLN_PMH[b.b]+" "+ROM_PMHU[b.i%3]+" "+b.th;if(nr){const d=b.i-nr.i;o.banding=d>0?"Mundur":d<0?"Maju":"Sama"}}
  /* tanpa perubahan di update → pakai nilai rilis pusat dari tabel yang sama (srilis/prilis) */
  if(SIFAT_KODE[z.supd||z.srilis])o.sifat=SIFAT_KODE[z.supd||z.srilis];const pk=kBln(z.puncak||z.prilis);if(pk!=null)o.puncak=NM_BLN_PMH[pk%12]+" "+Math.floor(pk/12);
  if(Object.keys(o).length)out[w]=o});return out}
function terapkanPMHU(){const u=pmhuAktif(),kunci=u?u.diunggah:"";if(kunci===PMHU_TERPASANG)return;
 Object.keys(ZOM_PMH_ASLI).forEach(k=>{ZOM_PMH[k]=ZOM_PMH_ASLI[k].slice()});ZOM11.forEach((x,i)=>Object.assign(x,ZOM11_ASLI[i]));PMHU_SEMULA={};
 if(u){const pt=pmhuPeta(u);Object.keys(pt).forEach(w=>{const o=pt[w],r=ZOM_PMH[w];if(!r)return;const asal={awal:r[0],banding:r[1],sifat:r[2],puncak:r[3]};
   if(o.awal&&r[0])r[0]=o.awal;if(o.banding&&r[1])r[1]=o.banding;if(o.sifat)r[2]=o.sifat;if(o.puncak)r[3]=o.puncak;if(o.awal||o.banding)r[4]="";
   if(r[0]!==asal.awal)PMHU_SEMULA[w]={awal:asal.awal};const z=ZOM11.find(x=>x.no===+w);if(z){z.banding=r[1]||z.banding;z.sifat=r[2]||z.sifat;z.okt=/^oktober/i.test(r[0])?1:0}})}
 PMHU_TERPASANG=kunci}
function pmkAktif(){const u=KA&&KA.pengaturan&&KA.pengaturan.pmk_update,resmi=String((IK().musim_kemarau||{})._dipasang||"");return u&&u.diunggah&&u.tampil&&!(resmi&&resmi>u.diunggah)&&(u.zom||[]).length?u:null}
function terapkanKeDaftar(L,u){u=u||pmhuAktif();if(!u)return L;const pt=pmhuPeta(u);
 return L.map(z=>{const o=pt[+z.no];if(!o)return z;const n={...z};if(o.awal&&z.awal&&!/non|tipe 1|tidak/i.test(z.awal)){n.awal=o.awal;if(o.awal!==z.awal)n.semula=z.awal}
  if(o.banding&&z.banding)n.banding=o.banding;if(o.sifat)n.sifat=o.sifat;if(o.puncak)n.puncak=o.puncak;return n})}
const semulaHTML=z=>z&&z.semula?`<br><small class="semula" title="Prakiraan sebelum diperbarui">semula ${esc(z.semula)}</small>`:"";
const catSemula=L=>L.some(z=>z.semula)?`<p class="note catatan-rilis">Prakiraan ini sudah diperbarui. Label kuning <span class="semula">semula …</span> di bawah tanggal menunjukkan prakiraan sebelum diperbarui.</p>`:"";
const catPMK=()=>{const u=pmkAktif();return u&&u.zom.some(z=>nomorZ(z))?`<p class="note catatan-rilis">Diperbarui <b>${tglPMHU(u.diunggah)}</b> dari prediksi rilis resmi awal. Label kuning <span class="semula">semula …</span> di bawah tanggal menunjukkan prakiraan awal sebelum diperbarui.</p>`:""};
const kotakPMK=()=>{const u=pmkAktif();if(!u)return "";const r=ringkasPMHUpd(u);if(!r||r.arah==="tetap")return "";return `<div class="catatan-pmh mundur" role="note"><span class="cp-ikon" aria-hidden="true">↻</span><div><b>Perkembangan terbaru: ${escH(r.judul.charAt(0).toLowerCase()+r.judul.slice(1))}</b><p>${r.teks}</p></div></div>`};
const catPMHU=()=>PMHU_TERPASANG?`<p class="note catatan-rilis">Diperbarui <b>${tglPMHU(PMHU_TERPASANG)}</b> dari prediksi rilis resmi awal (Oktober 2026). Label kuning <span class="semula">semula …</span> di bawah tanggal menunjukkan prakiraan awal sebelum diperbarui.</p>`:"";
function ringkasPMHDinamis(){const nos=Object.keys(ZOM_PMH).map(Number),bln=v=>{const m=String(v||"").match(/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)(?:\s+I{1,3})?(\s+\d{4})?/i);return m?besarAwal(m[1].toLowerCase())+(m[2]||""):""};
 const urutB=l=>{const m=String(l).match(/(\w+)\s+(\d{4})/);return m?+m[2]*12+NM_BLN_PMH.indexOf(m[1]):0};
 const kat=[["awal",0,bln,"Prediksi awal musim hujan","#15803d"],["sifat",2,v=>v,"Sifat musim hujan","#ca8a04"],["puncak",3,bln,"Prediksi puncak musim hujan","#1d4ed8"],["banding",1,v=>v,"Dibanding normal","#b45309"]];
 return `<div class="pmh">${kat.map(([k,i,f,jud,c])=>{const g={};nos.forEach(n=>{const l=f(ZOM_PMH[n][i]);if(l)(g[l]=g[l]||[]).push(n)});let arr=Object.entries(g);
  if(!arr.length)return "";if(k==="awal"||k==="puncak")arr.sort((a,b)=>urutB(a[0])-urutB(b[0]));else arr.sort((a,b)=>b[1].length-a[1].length);
  const tot=arr.reduce((t,x)=>t+x[1].length,0),d=arr.slice().sort((a,b)=>b[1].length-a[1].length)[0],mx=d[1].length;
  return `<div class="pk" style="--c:${c}"><span>${jud}</span><button type="button" class="pkh" data-zom="${d[1].join(",")}" data-judul="${esc(jud+": "+d[0])}"><b>${esc(d[0])}</b><em>${d[1].length} dari ${tot} ZOM</em></button><div class="mbar klik">${arr.map(([l,ns])=>`<button type="button" class="mrow" data-zom="${ns.join(",")}" data-judul="${esc(jud+": "+l)}"><span>${esc(l)}</span><i style="width:${ns.length/mx*100}%;background:${c}"></i><b>${ns.length}</b></button>`).join("")}</div></div>`}).join("")}</div>
 <p class="note ketukzom">👆 Ketuk angka atau baris mana pun untuk melihat ZOM dan wilayahnya.</p><p class="note">Angka adalah jumlah Zona Musim (ZOM). Awal musim dan perbandingan dihitung dari 11 ZOM yang memiliki musim hujan dan kemarau; sifat dan puncak dari seluruh 21 ZOM.</p>`}
/* padanan kode tabel update (PAPBAR_xx) ↔ nomor ZOM web, dicocokkan dari nilai rilis (awal, sifat, puncak) */
function padanPMHU(zom){const ab=t=>{const m=String(t||"").match(/^(\w+)\s+(I{1,3})\s+\d{4}$/i);if(!m)return "TIPE";const k=Object.keys(BLN_PENUH).find(x=>BLN_PENUH[x].toLowerCase()===m[1].toLowerCase());return (k==="agu"?"AGT":String(k).toUpperCase())+" "+m[2].toUpperCase()};
 const sk=t=>/atas/i.test(t)?"A":/bawah/i.test(t)?"B":/normal/i.test(t)?"N":"",pb=t=>{const m=String(t||"").match(BLN_RE);return m?BLN_PMH[NM_BLN_PMH.map(x=>x.toLowerCase()).indexOf(m[1].toLowerCase())]:""};
 const web=Object.keys(ZOM_PMH_ASLI).map(Number).sort((a,b)=>a-b).map(no=>{const r=ZOM_PMH_ASLI[no];return {no,awal:ab(r[0]),sif:sk(r[2]),pun:pb(r[3])}});
 const ex=zom.map(z=>({no:z.no,awal:z.semula||"TIPE",sif:z.srilis||"",pun:String(z.prilis||"").slice(0,3)}));
 const skor=(w,e)=>(w.awal===e.awal?2:0)+(w.sif===e.sif?1:0)+(w.pun===e.pun?1:0);
 const pas=[];web.forEach(w=>ex.forEach(e=>pas.push({w:w.no,e:e.no,s:skor(w,e)})));pas.sort((a,b)=>b.s-a.s||a.w-b.w||String(a.e).localeCompare(b.e));
 const hasil={},dipakai=new Set();pas.forEach(p=>{if(hasil[p.w]||dipakai.has(p.e)||p.s<2)return;hasil[p.w]={e:p.e,s:p.s};dipakai.add(p.e)});
 web.forEach(w=>{const h=hasil[w.no];if(!h)return;const kembar=ex.filter(e=>skor(w,e)===h.s&&e.no!==h.e).map(e=>e.no);h.ragu=h.s<4||kembar.length>0;h.kembar=kembar});
 return {web,hasil}}

function mundurPMH(){const u=KA&&KA.pengaturan&&KA.pengaturan.pmh_update,resmi=String((IK().musim_hujan||{})._dipasang||"");
 if(u&&u.diunggah){if(!u.tampil||(resmi&&resmi>u.diunggah))return null;const r=ringkasPMHUpd(u);return r&&r.arah!=="tetap"?r:null}
 if(!PMH_MUNDUR||(resmi&&resmi>"2026-11-16"))return null;
 return {judul:"Awal musim hujan diprediksi mundur",teks:"Hingga awal November 2026, sebagian besar wilayah Papua Barat dan Papua Barat Daya masih kemarau akibat El Niño yang sangat kuat. Musim hujan diprediksi baru mulai <b>November–Desember 2026</b>, dan di sebagian wilayah bisa lebih lambat.",
  singkat:"Hingga awal November, sebagian besar wilayah Papua Barat dan Papua Barat Daya masih kemarau akibat El Niño. Musim hujan diprediksi mulai November–Desember 2026, sebagian wilayah lebih lambat."}}
/* kartu "Prediksi Awal Musim Hujan": pakai pembaruan bila ada, rilis sebagai keterangan */
function infoMusimTerkini(){const u=KA&&KA.pengaturan&&KA.pengaturan.pmh_update,resmi=String((IK().musim_hujan||{})._dipasang||"");
 if(u&&u.diunggah){if(!u.tampil||(resmi&&resmi>u.diunggah))return null;const r=ringkasPMHUpd(u);if(!r||r.arah==="tetap")return null;
  const nA=r.arah==="mundur"?r.mundur:r.maju; return {val:r.aw.teks,angka:Math.round(nA/r.n*100),rasio:nA+"/"+r.n,ket:`${r.arah==="mundur"?"Mundur":"Maju"} dari prediksi rilis resmi awal (${r.awR.teks}) di ${nA} dari ${r.n} zona musim`, arti:`Musim hujan diprediksi mulai ${r.aw.teks} di ${r.aw.c} dari ${r.aw.n} zona musim, ${r.arah} dari prediksi semula (${r.awR.teks}).${r.pun?` Puncaknya diprediksi ${r.pun.teks}.`:""}`,src:"Pembaruan prediksi BMKG"+(u.label?" · data "+u.label:" · "+tglPMHU(u.diunggah)),pun:r.pun,punR:r.punR}}
 if(!PMH_MUNDUR||(resmi&&resmi>"2026-11-16"))return null;
 return {val:"November–Desember 2026",angka:0,ket:"Mundur dari prediksi rilis resmi awal (Oktober 2026) · sebagian besar zona musim",arti:"Musim hujan diprediksi mulai November–Desember 2026 di sebagian besar zona musim, mundur dari prediksi semula (Oktober 2026).",src:"Pembaruan prediksi BMKG"}}
const kotakMundur=()=>{const m=mundurPMH();return m?`<div class="catatan-pmh mundur" role="note"><span class="cp-ikon" aria-hidden="true">↻</span><div><b>Perkembangan terbaru: ${escH(m.judul.charAt(0).toLowerCase()+m.judul.slice(1))}</b><p>${m.teks} ${PMHU_TERPASANG?"Rincian per Zona Musim ada di tabel di bawah dan di halaman Zona Musim.":"Rincian per wilayah akan tampil setelah pembaruan resmi BMKG dirilis."}</p></div></div>`:""};
{const a=P["prakiraan-musim"];P["prakiraan-musim"]=()=>{let h=sisipCat(a(),catPrak(PMH_SEDANG_UPDATE)+kotakMundur());if(infoMusimTerkini()){const k=h.indexOf('<h2 class="sec-title">Ringkasan');if(k>=0)h=h.slice(0,k)+(PMHU_TERPASANG?`<p class="note catatan-rilis">Ringkasan dan tabel per Zona Musim di bawah ini sudah memakai <b>pembaruan prakiraan ${tglPMHU(PMHU_TERPASANG)}</b>. Angka di kolom "semula" adalah prediksi rilis resmi awal (Oktober 2026). Peta masih peta rilis Oktober 2026.</p>`:`<p class="note catatan-rilis">Ringkasan, peta, dan tabel di bawah ini adalah <b>prediksi rilis Oktober 2026</b>. Pembaruan terbaru ada di kotak "Perkembangan terbaru" di atas.</p>`)+h.slice(k)}return h+aturanMusim("hujan")}}
{const a=P["prakiraan-musim-kemarau"];P["prakiraan-musim-kemarau"]=()=>{const h=a();return (/belum terbit/i.test(h)?sisipCat(h,kotakPMK()):sisipCat(h,catPrak(false)+kotakPMK()))+aturanMusim("kemarau")}}
{const a=P["hujan-bulanan"];P["hujan-bulanan"]=()=>sisipCat(a(),catPrak(false))}
{const a=P["enso-iod"];if(a)P["enso-iod"]=()=>singkatTri(a())}
addEventListener("popstate",ikutiRiwayat);addEventListener("hashchange",ikutiRiwayat);render();
/* tautan yang muncul belakangan (berita, publikasi dari admin) ikut dirapikan */
if(RUTE_PATH){let tt=0;new MutationObserver(()=>{clearTimeout(tt);tt=setTimeout(()=>rapikanTautan(),120)}).observe(document.body,{childList:true,subtree:true})}
/* Mode gelap: ikut pengaturan perangkat pengunjung; bila pengunjung menekan tombol, pilihannya yang dipakai (disimpan di perangkatnya). */
{try{localStorage.removeItem("tema")}catch(e){}
 const mq=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null,baca=()=>{try{return sessionStorage.getItem("tema")}catch(e){return null}};
 const terap=()=>{const t=baca();document.documentElement.classList.toggle("dark",t?t==="gelap":!!(mq&&mq.matches))};terap();
 if(mq){const f=()=>{if(!baca())terap()};mq.addEventListener?mq.addEventListener("change",f):mq.addListener&&mq.addListener(f)}
 document.getElementById("themeBtn").onclick=()=>{const g=!document.documentElement.classList.contains("dark");document.documentElement.classList.toggle("dark",g);try{sessionStorage.setItem("tema",g?"gelap":"terang")}catch(e){}}}
const HARI=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],BL=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
function tick(){const now=Date.now(),d=new Date(now+9*3600e3),u=new Date(now);const p=n=>String(n).padStart(2,"0");
  document.getElementById("jam").textContent=`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
  document.getElementById("jamu").textContent=`${p(u.getUTCHours())}:${p(u.getUTCMinutes())}:${p(u.getUTCSeconds())}`;
  document.getElementById("tgl").textContent=`${HARI[d.getUTCDay()]}, ${d.getUTCDate()} ${BL[d.getUTCMonth()]} ${d.getUTCFullYear()}`}
tick();setInterval(tick,1000);
/* ===== Mesin animasi banner peringatan curah hujan (kanvas) =====
   Awan, hujan, riak, garis angin: desain pengguna. Petir bercabang (2 kilatan/sambaran, jeda ≥1 dtk → aman WCAG 2.3.1),
   geludug (hanya lapisan cuaca bergetar) & daun: tambahan. Berhenti bila slide tidak tampil, tab tersembunyi, tombol diam, atau perangkat minta gerak dikurangi. */
(()=>{const html=document.documentElement,mqK=matchMedia("(prefers-reduced-motion: reduce)");
 const K={waspada:{idx:1,jeda:[1000,2200],sp:.75,tetes:95,daun:12,angin:true,pusar:3},siaga:{idx:2,jeda:[1000,1300],sp:1.15,tetes:150,daun:20,angin:true,pusar:4},awas:{idx:3,jeda:[1000,1100],sp:1.45,tetes:200,daun:30,angin:true,pusar:6}};
 const WD=["#3f6212","#4d7c0f","#65a30d","#a16207","#854d0e","#15803d"],WDG=["#a3e635","#84cc16","#4ade80","#facc15","#f59e0b","#bef264"],ant=(a,b)=>a+Math.random()*(b-a);
 let cv=null,ctx=null,W=0,H=0,jalan=false,raf=0,akhir=0,lv="waspada",awan=[],tetes=[],cip=[],angin=[],daun=[],pusar=[],petir=[],guruh=[],waktuAngin=0,berikut=0,statikUntuk=null;
 const pusarBaru=acak=>{const rx=ant(34,60);return {x:acak?W*ant(.05,1):W+rx*2+Math.random()*80,y:H*ant(.74,.86),fk:ant(.006,.011),fase:Math.random()*7,amp:H*ant(.07,.12),rx,tinggi:H*ant(.4,.6),v:ant(110,200),hid:acak?2:0,gust:ant(.2,.5),
   pa:Array.from({length:32},()=>({t:Math.random()*7,w:ant(6,9.5),k:Math.random(),naik:ant(.35,.6),a:ant(.4,.8),s:ant(1.1,2.6),daun:Math.random()<.2}))}};
 function adegan(){awan=[];const cols=Math.max(12,Math.round(W/95));
  for(let i=0;i<cols;i++){const l=i%2,p=[];for(let j=0;j<6;j++)p.push({dx:(j-2.5)*44+(Math.random()-.5)*16,dy:(Math.random()-.5)*24,r:(55+Math.random()*35)*(l?0.95:1.2)});
   awan.push({x:(W/(cols-2))*i-60,y:l?55:25,v:l?.78:.42,l,p})}
  tetes=[];for(let i=0;i<200;i++){const d=Math.random();tetes.push({x:Math.random()*W,y:Math.random()*H,len:14+d*22,vy:8.5+d*11,bw:-1.6-d*1.6,d,op:.22+d*.32,w:1.2+d*1.3})}
  angin=[];for(let i=0;i<12;i++)angin.push({x:Math.random()*W,y:45+Math.random()*(H-75),len:100+Math.random()*160,v:8+Math.random()*7,a:.16+Math.random()*.16});
  cip=[];daun=[];pusar=[]}
 function ukur(){const r=cv.parentElement.getBoundingClientRect(),w=Math.max(300,Math.round(r.width)),h=Math.max(240,Math.round(r.height));if(w===W&&h===H)return;
  W=w;H=h;const d=Math.min(2,devicePixelRatio||1);cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);adegan()}
 function jalur(x0,y0,x1,y1,o,gen=7){let p=[[x0,y0],[x1,y1]];for(let g=0;g<gen;g++){const n=[p[0]];for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1];n.push([(a[0]+b[0])/2+(Math.random()-.5)*o,(a[1]+b[1])/2+(Math.random()-.5)*o*.2],b)}p=n;o*=.52}return p}
 function buatPetir(t,jauh){const k=K[lv].idx,x0=W<760?W*ant(.15,.85):W*ant(.45,.95),x1=x0+W*ant(-.09,.09),main=jalur(x0,H*ant(.05,.12),x1,H*1.02,H*.32),cab=[];
  const n=jauh?1+Math.floor(Math.random()*2):3+Math.floor(Math.random()*(2+k*1.5));
  for(let i=0;i<n;i++){const p=main[Math.floor(main.length*ant(.12,.6))],s=(Math.random()<.5?-1:1)*ant(.35,.95),L=H*ant(.14,.32);cab.push(jalur(p[0],p[1],p[0]+Math.sin(s)*L,p[1]+Math.cos(s)*L,L*.45,5))}
  return{main,cab,t0:t,x:x0,tanah:x1,jauh,kuat:jauh?.45:Math.min(1,.72+k*.08+Math.random()*.1),tebal:jauh?.55:1.1+k*.3}}
 function sambar(t){const k=K[lv].idx,jauh=Math.random()<.3;petir.push(buatPetir(t,jauh));
  if(!jauh){const td=(k===3?250:420)+Math.random()*700;guruh.push({t0:t+td,dur:ant(1100,1800),amp:(2.6+k*2)*(1.3-td/1500)})}}
 const nyala=a=>a<0?0:a<70?1:a<130?.12:a<200?.9:Math.max(0,.9*Math.exp(-(a-200)/150));
 function garis(p){ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)ctx.lineTo(p[i][0],p[i][1]);ctx.stroke()}
 function gambarPetir(t,dk,jauh){for(const b of petir){if(b.jauh!==jauh)continue;const a=nyala(t-b.t0)*b.kuat;if(a<.01)continue;ctx.save();ctx.lineJoin=ctx.lineCap="round";
   if(b.jauh){ctx.shadowColor="#fff";ctx.shadowBlur=12;ctx.strokeStyle=`rgba(${dk?"226,232,240":"255,255,255"},${a})`;ctx.lineWidth=1.8;garis(b.main);ctx.lineWidth=1;b.cab.forEach(garis);ctx.restore();continue}
   if(dk){ctx.globalCompositeOperation="lighter";ctx.shadowColor="rgba(167,139,250,1)";ctx.shadowBlur=34;ctx.strokeStyle=`rgba(167,139,250,${a*.6})`;ctx.lineWidth=9*b.tebal;garis(b.main)}
   else{ctx.strokeStyle=`rgba(30,27,75,${a*.35})`;ctx.lineWidth=5*b.tebal;garis(b.main);ctx.shadowColor="#fff";ctx.shadowBlur=34;ctx.strokeStyle=`rgba(109,40,217,${a*.7})`;ctx.lineWidth=9*b.tebal;garis(b.main)}
   ctx.shadowColor=dk?"rgba(196,181,253,1)":"#fff";ctx.shadowBlur=14;ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.lineWidth=3*b.tebal;garis(b.main);
   ctx.lineWidth=1.6;ctx.strokeStyle=`rgba(255,255,255,${a*.8})`;b.cab.forEach(garis);ctx.shadowBlur=0;
   const g=ctx.createRadialGradient(b.tanah,H,0,b.tanah,H,150);g.addColorStop(0,`rgba(230,236,255,${a*.55})`);g.addColorStop(1,"rgba(230,236,255,0)");ctx.fillStyle=g;ctx.fillRect(b.tanah-150,H-150,300,150);ctx.restore()}}
 function bingkai(t,f){const C=K[lv],dk=html.classList.contains("dark"),rgb=dk?"191,219,254":"30,58,138",wrgb=dk?"203,213,225":"51,65,85",sp=C.sp;
  ctx.clearRect(0,0,W,H);
  if(f&&t>=berikut){sambar(t);berikut=t+ant(...C.jeda)}
  let kil=0,fx=W*.7;for(const b of petir){const v=nyala(t-b.t0)*b.kuat;if(v>kil){kil=v;fx=b.x}}
  if(kil>0){const g=ctx.createRadialGradient(fx,H*.15,0,fx,H*.15,W*.6);g.addColorStop(0,dk?`rgba(225,232,255,${kil*.4})`:`rgba(255,255,255,${kil*.55})`);g.addColorStop(1,"rgba(225,232,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
  gambarPetir(t,dk,true);
  waktuAngin+=.025*sp*f;const gust=lv==="waspada"?.3:Math.sin(waktuAngin)*1.8*sp;
  for(const c of awan){c.x+=c.v*sp*f;if(c.x-180>W)c.x=-180;const ds=Math.abs(c.x-fx),lit=kil>0&&ds<290?kil*.6*(1-ds/290):0;
   for(const p of c.p){const px=c.x+p.dx,py=c.y+p.dy,g=ctx.createRadialGradient(px,py-p.r*.25,p.r*.08,px,py,p.r);
    if(dk){if(lit>.05){g.addColorStop(0,`rgba(255,255,255,${.35+lit*.55})`);g.addColorStop(.5,"rgba(71,85,105,.85)")}else{g.addColorStop(0,c.l?"rgba(51,65,85,.85)":"rgba(71,85,105,.75)");g.addColorStop(.6,"rgba(30,41,59,.55)")}g.addColorStop(1,"rgba(15,23,42,0)")}
    else{if(lit>.05){g.addColorStop(0,`rgba(255,255,255,${.75+lit*.25})`);g.addColorStop(.55,"rgba(148,163,184,.45)")}else{g.addColorStop(0,c.l?"rgba(71,85,105,.5)":"rgba(100,116,139,.42)");g.addColorStop(.65,"rgba(148,163,184,.22)")}g.addColorStop(1,"rgba(148,163,184,0)")}
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,p.r,0,7);ctx.fill()}}
  gambarPetir(t,dk,false);
  if(C.angin)for(const w of angin){const g=ctx.createLinearGradient(w.x,w.y,w.x+w.len,w.y);g.addColorStop(0,`rgba(${wrgb},0)`);g.addColorStop(.5,`rgba(${wrgb},${w.a})`);g.addColorStop(1,`rgba(${wrgb},0)`);
   ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(w.x,w.y);ctx.quadraticCurveTo(w.x+w.len*.5,w.y-6,w.x+w.len,w.y+4);ctx.stroke();
   w.x-=w.v*sp*f;if(w.x+w.len<0){w.x=W+50;w.y=45+Math.random()*(H-75)}}
  /* pusaran angin: partikel debu & serpihan daun berputar mengelilingi pusat (elips perspektif), naik perlahan dan melebar seperti corong;
     sisi depan lebih terang dari sisi belakang supaya terasa 3 dimensi */
  {const n=C.pusar||0;while(pusar.length<n){const q=pusarBaru(!f);if(!f)q.x=W*(.3+.7*(pusar.length+.5)/n)+ant(-20,20);else q.x=Math.max(W+q.rx*2,...pusar.map(o=>o.x+W/n*ant(.42,.55)));pusar.push(q)}pusar.length=Math.min(pusar.length,n);
   for(const q of pusar){q.x-=q.v*sp*f/60;q.hid+=f/60;if(q.x+q.rx*2<-40){const nx=Math.max(W+q.rx*2,...pusar.filter(o=>o!==q).map(o=>o.x+W/n*ant(.42,.55)));Object.assign(q,pusarBaru(false));q.x=nx}const yy=q.y+Math.sin(q.x*q.fk+q.fase)*q.amp;
    const hidup=Math.min(1,q.hid/1.5);ctx.save();ctx.lineCap="round";
    for(const pa of q.pa){pa.t+=pa.w*sp*(1+q.gust)*f/60;pa.k+=pa.naik*f/60;if(pa.k>1){pa.k=0;pa.t=Math.random()*7}
     const rx=q.rx*(.35+pa.k*.9),ry=rx*.32,cx=q.x+Math.sin(q.hid*.8+pa.k*2)*6*pa.k,cy=yy-pa.k*q.tinggi,dep=Math.sin(pa.t),al=hidup*pa.a*(1-pa.k*.75)*(.45+.55*(dep+1)/2);
     if(al<.02)continue;ctx.beginPath();for(let j=0;j<=6;j++){const th=pa.t-j*.09*(1+pa.w*.08),x=cx+Math.cos(th)*rx,y=cy+Math.sin(th)*ry;j?ctx.lineTo(x,y):ctx.moveTo(x,y)}
     ctx.strokeStyle=`rgba(${pa.daun?(dk?"163,230,53":"77,124,15"):wrgb},${al})`;ctx.lineWidth=pa.s*(.6+.4*(dep+1)/2);ctx.stroke()}
    ctx.restore()}}
  ctx.lineCap="round";
  for(let i=0;i<C.tetes;i++){const d=tetes[i],wx=d.bw*sp+gust*(.5+d.d);ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+wx*1.8,d.y+d.len);
   ctx.strokeStyle=`rgba(${rgb},${d.op})`;ctx.lineWidth=d.w;ctx.stroke();d.x+=wx*f;d.y+=d.vy*sp*f;
   if(d.y>H){if(f&&Math.random()>.55&&cip.length<220)cip.push({x:d.x,y:H-3,r:1,a:d.op*1.4});d.y=20;d.x=Math.random()*(W+160)}}
  ctx.lineWidth=1.1;for(let i=cip.length-1;i>=0;i--){const s=cip[i];ctx.beginPath();ctx.ellipse(s.x,s.y,s.r*2.4,s.r*.65,0,0,7);ctx.strokeStyle=`rgba(${rgb},${s.a})`;ctx.stroke();
   s.r+=.5*f;s.a-=.025*f;if(s.a<=0)cip.splice(i,1)}
  const tgt=C.daun+Math.round(Math.max(0,gust)*2);while(daun.length<tgt)daun.push(daunBaru(!f));
  daun=daun.filter((d,i)=>{d.x-=d.v*sp*(1+Math.max(0,gust)*.3)*f/60;d.fs+=d.fy*f/60;d.rot+=d.vr*f/60;if(d.x<-30){if(i>=tgt)return false;Object.assign(d,daunBaru(false))}
   const y=d.y+Math.sin(d.fs)*d.ay,xo=d.loop?Math.cos(d.fs)*d.ay*.9:0;ctx.save();ctx.translate(d.x+xo,y);ctx.rotate(d.rot);ctx.scale(1,Math.cos(d.fs*2.2)*.9);ctx.globalAlpha=dk?.9:.95;ctx.fillStyle=(dk?WDG:WD)[d.w];const u=d.u;
   ctx.beginPath();ctx.moveTo(-u,0);ctx.quadraticCurveTo(0,-u*.7,u,0);ctx.quadraticCurveTo(0,u*.7,-u,0);ctx.fill();ctx.strokeStyle="rgba(0,0,0,.25)";ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(-u*1.25,0);ctx.lineTo(u*.8,0);ctx.stroke();ctx.restore();return true});
  petir=petir.filter(b=>t-b.t0<1100);
  let x=0,y=0;const s=t/1000;for(const r of guruh){const u=(t-r.t0)/r.dur;if(u<0||u>1)continue;const e=u<.1?u/.1:Math.exp(-(u-.1)*3.6);x+=r.amp*e*(Math.sin(s*61)*.6+Math.sin(s*37+1)*.4);y+=r.amp*e*.65*(Math.sin(s*53+2)*.6+Math.sin(s*29)*.4)}
  guruh=guruh.filter(r=>t<r.t0+r.dur);cv.style.transform=f&&(Math.abs(x)+Math.abs(y)>.05)?`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`:""}
 function daunBaru(acakX){return{x:acakX?Math.random()*W:W+20+Math.random()*120,y:H*ant(.15,.92),v:ant(160,330),ay:ant(15,45),fy:ant(1.5,3.5),fs:Math.random()*7,rot:Math.random()*7,vr:ant(-6,6),u:ant(6,12),w:Math.floor(Math.random()*WD.length),loop:Math.random()<.35}}
 function putar(t){if(!jalan)return;if(!cv||!cv.isConnected){henti();return}ukur();const f=akhir?Math.min(3,(t-akhir)/16.67):1;akhir=t;bingkai(t,f);raf=requestAnimationFrame(putar)}
 function henti(){jalan=false;cancelAnimationFrame(raf);if(cv)cv.style.transform=""}
 function pasang(hs){const c=hs.querySelector(".pkanvas");if(c!==cv){cv=c;ctx=cv.getContext("2d");W=H=0}lv=(hs.className.match(/st-(waspada|siaga|awas)/)||[])[1]||"waspada"}
 function cek(){const hs=document.querySelector(".hs.perkanvas.on");if(!hs){if(jalan)henti();statikUntuk=null;return}pasang(hs);
  const boleh=!document.hidden&&!html.classList.contains("diam")&&!mqK.matches;
  if(boleh&&!jalan){jalan=true;akhir=0;berikut=performance.now()+700;statikUntuk=null;raf=requestAnimationFrame(putar)}
  else if(!boleh){if(jalan)henti();const kunci=cv;if(statikUntuk!==kunci||document.hidden===false&&!cv.dataset.statik){ukur();const t=performance.now();petir=[buatPetir(t-160,false)];guruh=[];bingkai(t,0);statikUntuk=kunci;cv.dataset.statik="1"}}}
 setInterval(cek,400);document.addEventListener("visibilitychange",cek);document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("[data-diam]"))setTimeout(()=>{if(cv)delete cv.dataset.statik;cek()},30)});
})();

