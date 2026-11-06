
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
 {no:639,wil:"Kab. Manokwari (Tanah Rubuh, Manokwari Selatan); Kab. Manokwari Selatan (Dataran Isim, Momiwaren, Neney, Oransbari, Ransiki, Tahota); Kab. Pegunungan Arfak (Anggi Gida, Membey, Sururey); Kab. Teluk Bintuni (Dataran Beimes, Menimeri, Sough Jaya)",okt:0,banding:"Maju",sifat:"Atas Normal"},
 {no:640,wil:"Kab. Manokwari (Manokwari Selatan, Masni, Prafi, Sidey, Tanah Rubuh, Warmare); Kab. Manokwari Selatan (Dataran Isim, Neney); Kab. Pegunungan Arfak (Anggi, Anggi Gida, Catubow, Didohu, Hingk, Membey, Minyambouw, Sururey, Taige, Testega); Kab. Teluk Bintuni (Bisooop, Dataran Beimes); Kab. Tambrauw (Ambarbaken, Kebar, Mubrani)",okt:0,banding:"Maju",sifat:"Normal"},
 {no:646,wil:"Kab. Fakfak (Bombaray, Karas, Mbahamdandra, Tomage); Kab. Kaimana (Buruway, Kambaru); Kab. Teluk Bintuni (Aroba, Babo, Fafuwar, Kaitaro, Sumuri)",okt:1,banding:"Mundur",sifat:"Normal"},
 {no:649,wil:"Kab. Manokwari (Sidey); Kab. Pegunungan Arfak (Testega); Kab. Teluk Bintuni (Masyeta, Moskona Timur); Kab. Tambrauw (Ambarbaken, Kebar)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:650,wil:"Kab. Tambrauw (Abun, Ambarbaken, Kwoor, Sausapor)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:651,wil:"Kab. Teluk Bintuni (Moskona Utara); Kab. Tambrauw (Abun, Fef, Kwoor, Miyah, Sausapor, Senopi, Yembun)",okt:1,banding:"Mundur",sifat:"Atas Normal"},
 {no:655,wil:"Kab. Raja Ampat (Ayau, Kofiau, Kota Waisai, Meos Mansar, Supnin, Teluk Mayalibit, Tiplol Mayalibit, Waigeo Barat, Waigeo Barat Daratan, Waigeo Barat Kepulauan, Waigeo Selatan, Waigeo Timur, Waigeo Utara, Warwabori)",okt:0,banding:"Sama",sifat:"Atas Normal"},
 {no:656,wil:"Kab. Raja Ampat (Kepulauan Sembilan, Kofiau, Misool Barat, Misool Selatan, Misool Timur, Misool Utara)",okt:0,banding:"Mundur",sifat:"Atas Normal"}];
const NONZOM=[641,642,643,644,645,647,648,652,653,654];
const SIFAT_NONZOM={641:"Normal",642:"Normal",643:"Normal",644:"Normal",653:"Normal",645:"Bawah Normal",647:"Bawah Normal",648:"Bawah Normal",652:"Bawah Normal",654:"Bawah Normal"};
const PILL_B={Maju:"ok",Sama:"",Mundur:"warn"},PILL_S={"Atas Normal":"ok",Normal:"","Bawah Normal":"warn"};
function petaTab(grup,isi){return `<div class="panel"><div class="panel-head"><span>Peta Prediksi Musim Hujan 2026/2027</span><div class="tabs" data-grup="${grup}">${isi.map((t,i)=>`<button type="button" class="${i?"":"on"}" data-t="${i}">${t.lab}</button>`).join("")}</div></div>
<div class="panel-body">${isi.map((t,i)=>`<div data-pgrup="${grup}" data-p="${i}"${i?" hidden":""}><div class="petas${t.g.length>1?" dua":""}">${t.g.map(g=>`<figure class="map"><img src="${GBR[g[0]]}" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join("")}</div>${t.ket?`<p class="note">${t.ket}</p>`:""}</div>`).join("")}</div></div>`}
/* rincian tiap ZOM Prediksi Musim Hujan 2026/2027 (Press Release & peta paparan FGD Oktober 2026) */
const ZOM_PMH={636:["Oktober III 2026","Maju","Normal","Januari 2027","Lebih panjang (≥ 3 dasarian)"],637:["Oktober III 2026","Maju","Normal","Maret 2027","Lebih pendek (1 dasarian)"],
 638:["Desember III 2026","Sama","Normal","Maret 2027","Lebih pendek (2 dasarian)"],639:["Maret I 2027","Maju","Atas Normal","April 2027","Lebih pendek (2 dasarian)"],
 640:["November II 2026","Maju","Normal","Maret 2027","Lebih panjang (≥ 3 dasarian)"],646:["Oktober III 2026","Mundur","Normal","Februari 2027","Lebih panjang (1 dasarian)"],
 649:["Oktober II 2026","Mundur","Atas Normal","Oktober 2026","Lebih pendek (≥ 3 dasarian)"],650:["Oktober III 2026","Mundur","Atas Normal","Januari 2027","Lebih pendek (≥ 3 dasarian)"],
 651:["Oktober III 2026","Mundur","Atas Normal","Januari 2027","Lebih pendek (≥ 3 dasarian)"],655:["November I 2026","Sama","Atas Normal","Januari 2027","Lebih pendek (1 dasarian)"],
 656:["Desember II 2026","Mundur","Atas Normal","Juni 2027","Lebih pendek (≥ 3 dasarian)"],
 641:["","","Normal","Desember 2026",""],642:["","","Normal","Februari 2027",""],643:["","","Normal","Februari 2027",""],644:["","","Normal","Januari 2027",""],645:["","","Bawah Normal","Januari 2027",""],
 647:["","","Bawah Normal","Januari 2027",""],648:["","","Bawah Normal","Desember 2026",""],652:["","","Bawah Normal","November 2026",""],653:["","","Normal","Februari 2027",""],654:["","","Bawah Normal","Juli 2027",""]};
/* wilayah Non-ZOM (Tipe 1 Musim) per kabupaten, dibaca dari peta */
const WIL_NONZOM={641:"Kab. Teluk Bintuni (bagian timur)",642:"Kab. Teluk Bintuni (bagian utara)",643:"Kab. Teluk Bintuni (bagian selatan); Kab. Sorong Selatan (bagian selatan)",644:"Kab. Teluk Wondama; Kab. Kaimana (bagian utara)",645:"Kab. Kaimana (bagian selatan)",
 647:"Kab. Fakfak (bagian barat)",648:"Kab. Fakfak (bagian selatan)",652:"Kab. Teluk Bintuni (bagian barat); Kab. Maybrat; Kab. Sorong Selatan (bagian utara)",653:"Kab. Teluk Bintuni (bagian barat daya); Kab. Sorong Selatan",654:"Kab. Sorong; Kota Sorong; sebagian Kab. Raja Ampat"};
const pmhGrup=(i,f)=>Object.keys(ZOM_PMH).map(Number).filter(n=>f(ZOM_PMH[n][i]||"")).sort((a,b)=>a-b);
const GRUP_PMH={awal:[["Okt 2026",/^oktober/i],["Nov 2026",/^november/i],["Des 2026",/^desember/i],["Mar 2027",/^maret/i]],sifat:[["Normal",/^normal$/i],["Atas Normal",/^atas/i],["Bawah Normal",/^bawah/i]],
 puncak:[["Jan 2027",/^januari 2027/i],["Feb 2027",/^februari 2027/i],["Mar 2027",/^maret 2027/i],["Bulan lain",/^(oktober|november|desember) 2026|^(april|juni|juli) 2027/i]],banding:[["Mundur",/^mundur/i],["Sama",/^sama/i],["Maju",/^maju/i]],durasi:[["Lebih pendek",/^lebih pendek/i],["Lebih panjang",/^lebih panjang/i]]};
const KOL_PMH={awal:0,banding:1,sifat:2,puncak:3,durasi:4},JUDUL_PMH={awal:"Awal musim hujan",sifat:"Sifat musim hujan",puncak:"Puncak musim hujan",banding:"Awal musim dibanding normal",durasi:"Durasi musim hujan"};
function ringkasPMH(){const ket={"Jan 2027":"37,23% luas","Feb 2027":"23,11% luas","Mar 2027":"5,39% luas"};
 const bar=(k,c)=>{const arr=GRUP_PMH[k].map(([l,re])=>[l,pmhGrup(KOL_PMH[k],v=>re.test(v))]).filter(x=>x[1].length),mx=Math.max(...arr.map(x=>x[1].length));
  return `<div class="mbar klik">${arr.map(([l,nos])=>`<button type="button" class="mrow" data-zom="${nos.join(",")}" data-judul="${esc(JUDUL_PMH[k]+": "+(l==="Bulan lain"?"bulan lain":l))}" title="Lihat ZOM dan wilayahnya"><span>${l}</span><i style="width:${nos.length/mx*100}%;background:${c}"></i><b>${nos.length}</b>${ket[l]&&k==="puncak"?`<small>${ket[l]}</small>`:""}</button>`).join("")}</div>`};
 const kepala=(k,re,teks)=>{const nos=pmhGrup(KOL_PMH[k],v=>re.test(v));return `<button type="button" class="pkh" data-zom="${nos.join(",")}" data-judul="${esc(JUDUL_PMH[k]+": "+teks)}"><b>${teks}</b><em>`};
 return `<div class="pmh">
 <div class="pk" style="--c:#15803d"><span>Awal musim hujan</span>${kepala("awal",/^oktober/i,"Oktober 2026")}6 ZOM · 30,02% luas daratan</em></button>${bar("awal","#15803d")}</div>
 <div class="pk" style="--c:#a16207"><span>Sifat musim hujan</span>${kepala("sifat",/^normal$/i,"Normal")}10 ZOM · 48,07% luas daratan</em></button>${bar("sifat","#ca8a04")}</div>
 <div class="pk" style="--c:#1d4ed8"><span>Puncak musim hujan</span>${kepala("puncak",/^(januari|februari|maret) 2027/i,"Januari–Maret 2027")}14 ZOM · 65,74% luas daratan</em></button>${bar("puncak","#1d4ed8")}</div>
 <div class="pk" style="--c:#b45309"><span>Dibanding normal</span>${kepala("banding",/^mundur/i,"Mundur")}5 ZOM · 30,95% luas daratan</em></button>${bar("banding","#b45309")}</div>
 <div class="pk" style="--c:#c2410c"><span>Durasi musim hujan</span>${kepala("durasi",/^lebih pendek/i,"Lebih pendek")}8 dari 11 ZOM · 23,42% luas daratan</em></button>${bar("durasi","#c2410c")}</div>
 </div><p class="note ketukzom">👆 Ketuk angka atau baris mana pun untuk melihat ZOM dan wilayahnya.</p><p class="note">Persentase luas dari seluruh daratan Papua Barat dan Papua Barat Daya. Awal musim, perbandingan, dan durasi dihitung dari 11 ZOM; 10 Non-ZOM (Tipe 1 Musim, 57,49% daratan) dipisahkan. Sifat dan puncak dihitung dari seluruh 21 ZOM.</p>`}
function rincianZom(nos,judul,jenis){const dok=zomNorm(IK()["musim_"+(jenis||"hujan")]),dariD=jenis&&dok.length;
 const isi=nos.map(n=>{const d=dariD?dok.find(z=>+z.no===+n):null,z=ZOM11.find(x=>x.no===+n),info=ZOM_PMH[n]||[],nz=NONZOM.includes(+n);
  const wil=(d&&d.wil)||(z&&z.wil)||WIL_NONZOM[n]||"";const v=d?[d.awal,d.banding,d.sifat,d.puncak,""]:info;
  const chip=(lab,val,cls)=>val?`<span class="pill ${cls||""}">${lab}${esc(val)}</span>`:"";
  return `<li><div class="zh"><b>ZOM ${esc(n)}</b>${nz?'<span class="pill">Tipe 1 Musim</span>':""}</div><p>${esc(wil)||"–"}</p><div class="zc">${chip("Awal ",v[0])}${chip("",v[1],pillBanding(v[1]||""))}${chip("Sifat ",v[2],pillSifat(v[2]||""))}${chip("Puncak ",v[3])}${chip("Durasi ",v[4])}</div></li>`}).join("");
 bukaDialog(`<h3>${esc(judul)} · ${nos.length} ZOM</h3><ul class="zomlist">${isi}</ul><p class="note" style="margin:10px 0 0">${nos.some(n=>NONZOM.includes(+n))&&!dariD?"Wilayah Tipe 1 Musim (Non-ZOM) disebut per kabupaten, dibaca dari peta. ":""}Cari distrik Anda di <a href="#wilayah" data-tutup>Info Wilayah Saya</a>.</p>`)}
function bukaDialog(html){let d=document.getElementById("dlgUmum");if(d)d.remove();d=document.createElement("div");d.id="dlgUmum";d.className="dlgbg";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");
 d.innerHTML=`<div class="dlg lebar"><button type="button" class="dlgx" aria-label="Tutup" data-tutup>×</button>${html}</div>`;document.body.appendChild(d);
 const tutup=b=>{if(!d.isConnected)return;d.remove();document.removeEventListener("keydown",esk);if(b!==1&&history.state&&history.state.dlg)history.back()},esk=e=>{if(e.key==="Escape")tutup()};d._tutup=tutup;document.addEventListener("keydown",esk);
 try{if(!(history.state&&history.state.dlg))history.pushState({...(history.state||{}),dlg:1},"")}catch(e){}
 d.addEventListener("click",e=>{if(e.target===d||e.target.closest("[data-tutup]"))tutup()});const x=d.querySelector(".dlgx");if(x)x.focus()}
document.addEventListener("click",e=>{let b=e.target.closest&&e.target.closest("[data-zom]");if(!b){const k=e.target.closest&&e.target.closest(".pmh .pk");b=k&&k.querySelector(".pkh[data-zom]")}if(!b)return;const nos=b.dataset.zom.split(",").filter(Boolean);if(nos.length)rincianZom(nos,b.dataset.judul||"Zona Musim",b.dataset.jenis||"")});
const SRC_PMH='<p class="note">Sumber: Press Release dan Paparan FGD Prediksi Musim Hujan 2026/2027, Stasiun Klimatologi Papua Barat, Oktober 2026. Dokumen lengkap dapat diunduh di halaman <a href="#publikasi">Publikasi</a>.</p>';

const LIVE={zom:"https://content.bmkg.go.id/wp-content/uploads/prediksi-awal-musim-hujan.png",hth:"https://dataweb.bmkg.go.id/iklim/hari-tanpa-hujan.png",pdkm:"https://dataweb.bmkg.go.id/iklim/peringatan-kekeringan-meteorologis/PDKM_latest.jpg",pdcht:"https://dataweb.bmkg.go.id/iklim/peringatan-hujan-tinggi/PDCHT_latest.jpg"};
// Gambar diambil langsung dari BMKG (selalu terbaru saat web di hosting); bila gagal, pakai salinan tersimpan.
function bmkgImg(k,alt,cap){return `<figure class="map"><img src="${LIVE[k]}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src=SNAP['${k}']"><figcaption>${cap} Sumber: BMKG Pusat.</figcaption></figure>`}
function warnTable(jenis){const d=typeof daftarPeringatan==="function"?daftarPeringatan().filter(x=>x.jenis===jenis):[];
 const pbd=x=>/sorong|raja ampat|maybrat|tambrauw/i.test(x.wilayah);
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
  kering:war(sek("Peringatan Dini Kekeringan Meteorologis","Peringatan Dini|Analisis|Prediksi")),hujan:war(sek("Peringatan Dini Curah Hujan Tinggi","Peringatan Dini|Analisis|Prediksi")),rendah,tinggi}}
function bacaPeta(p){if(!p)return null;const imgs=[p.jetpack_featured_media_url,...(String(p.content&&p.content.rendered||"").match(/<img[^>]+src="[^"]+"/g)||[]).map(x=>x.match(/src="([^"]+)"/)[1])]
  .filter(Boolean).map(u=>u.replace(/&#0?38;|&amp;/g,"&")).filter(u=>/^https:\/\//.test(u));
 const unik=[];imgs.forEach(u=>{const b=u.split("?")[0];if(!unik.some(x=>x.split("?")[0]===b))unik.push(u)});
 return {id:p.id,tanggal:String(p.date||"").slice(0,10),judul:bersihHtml(p.title&&p.title.rendered),url:"https://www.bmkg.go.id/iklim/"+p.slug,gambar:unik.slice(0,4)}}
/* "Ambil rilisan sekarang" di admin (atau jadwal robot) memperbarui waktu bmkg.diambil;
   bila lebih baru dari salinan di browser, isi otomatis diambil ulang saat itu juga */
const pusatBasi=()=>{const dm=Date.parse((KA&&KA.bmkg&&KA.bmkg.diambil)||"");return !!dm&&dm>PUSAT_T};
function muatPusat(paksa){if(PUSAT_MUAT&&!paksa)return;PUSAT_MUAT=true;let c=null;
 try{c=JSON.parse(localStorage.getItem("pusat_v2")||"null")}catch(e){}
 if(c&&c.d&&!paksa){PUSAT=c.d;PUSAT_T=c.t||0;if(Date.now()-c.t<6*3600e3&&!pusatBasi())return}
 PUSAT_T=Date.now();
 const f=q=>fetch(BMKG_API+"?"+q,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
 Promise.allSettled([f("categories=59&search="+encodeURIComponent("Dinamika Atmosfer Dasarian")+"&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=6"),
  f("categories=60&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1"),
  f("categories=208&_fields=id,date,slug,title,content,jetpack_featured_media_url&per_page=1")]).then(([a,b,s])=>{
  const lama=PUSAT||{},d={
   dinat:a.status==="fulfilled"?a.value.filter(p=>/Dinamika Atmosfer Dasarian/i.test(bersihHtml(p.title&&p.title.rendered))).map(bacaDinat).filter(x=>x&&(x.nino!=null||x.iod!=null||x.enso)).sort((x,y)=>y.tanggal.localeCompare(x.tanggal)):(lama.dinat||[]),
   hujan:b.status==="fulfilled"?bacaPeta(b.value[0]):(lama.hujan||null),spi:s.status==="fulfilled"?bacaPeta(s.value[0]):(lama.spi||null)};
  if(!d.dinat.length&&!d.hujan&&!d.spi)return;PUSAT=d;PUSAT_T=Date.now();try{localStorage.setItem("pusat_v2",JSON.stringify({t:PUSAT_T,d}))}catch(e){}
  segarPusat()})}
/* akhir masa berlaku dari teks pusat, mis. "Dasarian I November (1 – 10 November) 2026" -> 2026-11-10 */
function akhirBerlaku(s){const m=String(s||"").match(/Dasarian\s+(I{1,3})\s+([A-Za-z]+)[\s\S]*?(\d{4})/i);if(!m)return "";
 const b=["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"].indexOf(m[2].toLowerCase());if(b<0)return "";
 const y=+m[3],h=m[1].toUpperCase()==="I"?10:m[1].toUpperCase()==="II"?20:new Date(y,b+1,0).getDate();return y+"-"+String(b+1).padStart(2,"0")+"-"+String(h).padStart(2,"0")}
function peringatanPusat(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];if(!d)return [];const hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10),out=[];
 [["kering","kekeringan"],["hujan","hujan"]].forEach(([k,j])=>{const w=d[k];if(!w||!w.ada)return;const akhir=akhirBerlaku(w.berlaku);if(akhir?akhir<hari:umurHari(d.tanggal)>12)return;[["pb","Papua Barat"],["pbd","Papua Barat Daya"]].forEach(([p,n])=>{if(w[p])out.push({status:w[p],jenis:j,wilayah:"Beberapa kabupaten/kota di "+n,berlaku:w.berlaku||"",sampai:akhir,catatan:"Peringatan dini nasional BMKG Pusat",pusat:1})})});return out}
function segarPusat(){if(cur==="beranda"&&peringatanPusat().length){const y=scrollY;render();scrollTo({top:y});return}if(PUSAT_HAL.includes(cur)){const y=scrollY;render();scrollTo({top:y});return}
 if(cur==="beranda"){const kb=document.getElementById("kondisiBox");if(kb){kb.innerHTML=kondisiHTML();pasangReveal()}}}
/* angka ENSO/IOD terbaru (BMKG Pusat bila ada, bila tidak dari Buletin Iklim kami) */
const fmtV=v=>v==null||isNaN(v)?"–":(v>0?"+":v<0?"−":"")+String(Math.abs(v)).replace(".",",");
function statusEnso(d){const s=(d&&d.enso&&d.enso.status)||"",v=d&&d.enso?d.enso.v:d&&d.nino;
 const f=/la ?ni[ñn]a/i.test(s)?"La Niña":/el ?ni[ñn]o/i.test(s)?"El Niño":/netral/i.test(s)?"Netral":v>=.5?"El Niño":v<=-.5?"La Niña":"Netral";
 const it=(s.match(/intensitas\s+([a-z]+(?:\s+(?:kuat|lemah|sedang|moderat))?)/i)||[])[1];return f+(it&&f!=="Netral"?" · "+it.replace(/\b\w/g,c=>c.toUpperCase()):"")}
const statusIod=v=>v==null?"–":v>=.4?"Positif":v<=-.4?"Negatif":"Netral";
const pillEnso=s=>/El Niño/.test(s)?"bad":/La Niña/.test(s)?"warn":"ok";
function EN(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];
 if(!d)return {enso:3.08,ensoLab:"ASO 2026",ensoNama:"Agustus–Oktober 2026",nino:3.07,ninoLab:"September 2026",ninoS:"Sep 2026",status:"El Niño · Sangat Kuat",iod:.703,iodLab:"Dasarian I Oktober 2026",iodS:"Das I Okt",iodB:.782,iodBLab:"September 2026",iodBS:"Sep 2026",kalimat:"",src:null};
 const p=d.per,b3=BLN3[p.bln.toLowerCase()]||p.bln,ens=d.enso;
 return {enso:ens?ens.v:d.nino,ensoLab:ens?ens.per+" "+p.thn:"Das "+p.das+" "+b3+" "+p.thn,ensoNama:ens&&ens.nama&&(ens.nama.match(/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/gi)||[]).length>1?(b=>b[0]+"–"+b[b.length-1])(ens.nama.match(/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/gi))+" "+p.thn:(ens?ens.per+" "+p.thn:"Dasarian "+p.das+" "+p.bln+" "+p.thn),
  nino:d.nino,ninoLab:"Dasarian "+p.das+" "+p.bln+" "+p.thn,ninoS:"Das "+p.das+" "+b3,status:statusEnso(d),
  iod:d.iod,iodLab:"Dasarian "+p.das+" "+p.bln+" "+p.thn,iodS:"Das "+p.das+" "+b3,iodB:d.iodBulan?d.iodBulan.v:null,iodBLab:d.iodBulan?d.iodBulan.bln+" "+p.thn:"",iodBS:d.iodBulan?(BLN3[d.iodBulan.bln.toLowerCase()]||d.iodBulan.bln)+" "+p.thn:"",
  kalimat:ens&&ens.status||"",src:d}}
function sumberPusat(x,teks){return x?`<p class="note">${teks||"Diambil dari"} <a href="${escH(x.url)}" target="_blank" rel="noopener">${escH(x.judul)} ↗</a> (BMKG Pusat, ${tglPendek(x.tanggal)}).</p>`:""}
function kbigEnso(){const e=EN();return `<span class="pill ${pillEnso(e.status)}">${e.status.replace(" · "," ")}</span><div class="kangka" data-v="${e.enso}">${fmtV(e.enso)}</div><p>Indeks ENSO periode ${e.ensoNama}${e.src?" menurut analisis BMKG Pusat "+e.src.per.bln+" "+e.src.per.thn:", termasuk yang terkuat dalam pencatatan"}.${/El Niño|La Niña/.test(e.status)&&TH("enso_prediksi")?" Diprediksi "+esc(TH("enso_prediksi").replace(/^\w/,c=>c.toLowerCase())).replace(/\.$/,"")+".":""}</p>`}
function tileIod(){const e=EN(),v=e.iod!=null?e.iod:e.iodB;return `<span>Status IOD</span><b>${statusIod(v)}</b><small>DMI ${e.iod!=null?e.iodS:e.iodBS} ${fmtV(v)}</small>`}
function idxChart(){return rc(W=>idxSvg(W),760)+idxCatatan()}
function idxSvg(W){const e=EN(),rows=[];
 if(e.nino!=null)rows.push(["Niño 3.4 · "+e.ninoS,e.nino,.5,"enso"]);if(e.enso!=null)rows.push(["Indeks ENSO · "+e.ensoLab,e.enso,.5,"enso"]);
 if(e.iodB!=null)rows.push(["DMI (IOD) · "+e.iodBS,e.iodB,.4,"iod"]);if(e.iod!=null)rows.push(["DMI (IOD) · "+e.iodS,e.iod,.4,"iod"]);
 const vs=rows.map(r=>r[1]),lo=Math.min(0,Math.floor(Math.min(...vs)*2)/2-(Math.min(...vs)<0?.5:0)),hi=Math.max(1,Math.ceil(Math.max(...vs)*2)/2);
 const sempit=W<520,L=sempit?8:170,R=58,bh=sempit?20:26,gap=sempit?34:16,T=sempit?24:8,H=T+rows.length*(bh+gap)-(sempit?6:0)+26,sc=(W-L-R)/(hi-lo),X=v=>L+(v-lo)*sc,st=hi-lo>4?1:.5;
 let g="";for(let t=lo;t<=hi+1e-9;t+=st){const x=X(t);g+=`<line x1="${x}" x2="${x}" y1="${T-4}" y2="${H-22}" stroke="var(--line)"${Math.abs(t)<1e-9?' stroke-width="2"':""}/><text x="${x}" y="${H-6}" text-anchor="middle" font-size="11.5" fill="var(--muted)">${String(+t.toFixed(1)).replace(".",",").replace("-","−")}</text>`}
 rows.forEach(([lab,v,th,j],i)=>{const y=T+i*(bh+gap),x0=X(0),xv=X(v),c=j==="enso"?(v>=0?"#d9452b":"#2563eb"):(v>=0?"#f08c2e":"#0d9488"),tx=X(v>=0?th:-th);
  g+=`${sempit?`<text x="${L}" y="${y-7}" font-size="12.5" font-weight="600" fill="var(--fg)">${lab}</text>`:`<text x="${L-10}" y="${y+bh/2+4}" text-anchor="end" font-size="13" fill="var(--fg)">${lab}</text>`}<rect x="${Math.min(x0,xv)}" y="${y}" width="${Math.abs(xv-x0)}" height="${bh}" rx="3" fill="${c}"/><text x="${v>=0?xv+6:x0+6}" y="${y+bh/2+4}" font-size="13" font-weight="700" fill="var(--fg)">${fmtV(v)}</text><line x1="${tx}" x2="${tx}" y1="${y-4}" y2="${y+bh+4}" stroke="var(--fg)" stroke-width="2" stroke-dasharray="3 2"/>`});
 return svgUk(W,H,"Indeks ENSO dan IOD")+g+`</svg>`}
function idxCatatan(){const e=EN();return `<p class="note">Garis putus-putus adalah batas fenomena: ±0,5 untuk El Niño/La Niña dan ±0,4 untuk IOD positif/negatif. Batang yang melewati garis berarti fenomena sedang terjadi.</p>${e.src?sumberPusat(e.src,"Angka diambil dari"):'<p class="note">Sumber: Buletin Iklim kami, Edisi Oktober 2026.</p>'}`}
function kesimpulanEnso(){const e=EN(),vi=e.iod!=null?e.iod:e.iodB,si=statusIod(vi),st=String(e.status||"").replace(" · "," ");
 const efek=/El Niño/.test(st)?"cenderung mengurangi hujan di Papua Barat dan Papua Barat Daya":/La Niña/.test(st)?"cenderung menambah hujan di Papua Barat dan Papua Barat Daya":"tidak banyak memengaruhi hujan di wilayah kita";
 return `<p class="kesimpulan"><span>Saat ini</span><b>${esc(st)}</b> dan <b>IOD ${esc(si)}</b>. ${/El Niño|La Niña/.test(st)?"Kondisi ini "+efek+".":"ENSO netral "+efek+"."}</p>`}
function trenDinat(){const a=((PUSAT&&PUSAT.dinat)||[]).slice(0,6).reverse();if(a.length<2)return "";
 const S=[["Niño 3.4",x=>x.nino,"#d9452b"],["DMI (IOD)",x=>x.iod,"#f08c2e"]];const vs=a.flatMap(x=>S.map(s=>s[1](x))).filter(v=>v!=null);if(!vs.length)return "";
 const svgT=W=>{const lo=Math.min(0,Math.floor(Math.min(...vs)*2)/2),hi=Math.max(1,Math.ceil(Math.max(...vs)*2)/2),sempit=W<520,H=Math.round(Math.min(270,Math.max(210,W*.38))),L=40,R=sempit?28:44,T=22,B=sempit?44:34,X=i=>L+i*(W-L-R)/(a.length-1),Y=v=>T+(hi-v)/(hi-lo)*(H-T-B),st=hi-lo>4?1:.5;
 let g="";for(let t=lo;t<=hi+1e-9;t+=st)g+=`<line x1="${L}" x2="${W-R}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--line)"${Math.abs(t)<1e-9?' stroke-width="2"':""}/><text x="${L-6}" y="${Y(t)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${String(+t.toFixed(1)).replace(".",",").replace("-","−")}</text>`;
 a.forEach((x,i)=>{const an=i===0?"start":i===a.length-1?"end":"middle",bl=BLN3[x.per.bln.toLowerCase()]||x.per.bln;g+=sempit?`<text x="${X(i)}" y="${H-24}" text-anchor="${an}" font-size="11.5" fill="var(--muted)">Das ${x.per.das}<tspan x="${X(i)}" dy="14">${bl}</tspan></text>`:`<text x="${X(i)}" y="${H-10}" text-anchor="${an}" font-size="11.5" fill="var(--muted)">Das ${x.per.das} ${bl}</text>`});
 S.forEach(([n,f,c])=>{const pts=a.map((x,i)=>[X(i),f(x)]).filter(p=>p[1]!=null);if(!pts.length)return;g+=`<polyline points="${pts.map(p=>p[0]+","+Y(p[1])).join(" ")}" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>`+pts.map(p=>`<circle cx="${p[0]}" cy="${Y(p[1])}" r="4.5" fill="${c}"/>`).join("");const l=pts[pts.length-1];g+=`<text x="${l[0]-6}" y="${Y(l[1])-10}" text-anchor="end" font-size="13" font-weight="700" fill="${c}">${fmtV(l[1])}</text>`});
 return svgUk(W,H,"Perkembangan Niño 3.4 dan DMI per dasarian")+g+`</svg>`};
 return `<div class="panel"><div class="panel-head"><span>Perkembangan per Dasarian (BMKG Pusat)</span></div><div class="panel-body">${rc(svgT,760)}<div class="legend">${S.map(([n,,c])=>`<span class="c"><i style="background:${c}"></i>${n}</span>`).join("")}</div><p class="note">Anomali suhu muka laut Niño 3.4 dan indeks IOD per dasarian dari ${a.length} analisis dinamika atmosfer terakhir BMKG Pusat.</p></div></div>`}
function kartuEnsoIod(){const e=EN(),vi=e.iod!=null?e.iod:e.iodB,si=statusIod(vi);
 return `<div class="grid2" style="margin-bottom:22px"><div class="card"><span class="pill ${pillEnso(e.status)}">${e.status}</span>
<dl class="kv" style="margin-top:12px">${e.nino!=null?`<dt>Niño 3.4 ${e.ninoLab}</dt><dd class="n">${fmtV(e.nino)}</dd>`:""}<dt>Indeks ENSO ${e.ensoLab}</dt><dd class="n">${fmtV(e.enso)}</dd><dt>Prediksi (Buletin Iklim kami)</dt><dd>${esc(TH("enso_prediksi"))}</dd></dl>
<p style="color:var(--muted);font-size:14px;margin:12px 0 0">${e.kalimat?"BMKG Pusat: indeks ENSO "+escH(e.ensoLab)+" menunjukkan "+escH(e.kalimat)+".":esc(TH("enso_catatan"))}</p></div>
<div class="card"><span class="pill ${si==="Netral"?"ok":"warn"}">IOD · ${si}</span>
<dl class="kv" style="margin-top:12px">${e.iodB!=null?`<dt>DMI ${e.iodBLab}</dt><dd class="n">${fmtV(e.iodB)}</dd>`:""}${e.iod!=null?`<dt>DMI ${e.iodLab}</dt><dd class="n">${fmtV(e.iod)}</dd>`:""}<dt>Prediksi (Buletin Iklim kami)</dt><dd>${esc(TH("iod_prediksi"))}</dd></dl></div></div>`}
function awamEnso(){const e=EN(),v=e.enso;return `Angka <b>${fmtV(v)}</b> ${v>=.5?"berada di atas batas El Niño (+0,5)":v<=-.5?"berada di bawah batas La Niña (−0,5)":"masih di antara −0,5 dan +0,5"}, sehingga statusnya <b>${e.status}</b>.`}
/* peringatan dini nasional & prediksi dari BMKG Pusat untuk provinsi kami */
function statusPusat(jenis){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];const w=d&&d[jenis==="hujan"?"hujan":"kering"];if(!w||!w.ada)return "";
 const lab=v=>`<span class="skala">${[["","Tidak ada"],["waspada","Waspada"],["siaga","Siaga"],["awas","Awas"]].map(([k,n])=>`<span class="sk lv-${k||"aman"}${k===v?" on":""}">${n}</span>`).join("")}</span>`;
 return `<div class="pstat"><div class="pstathead"><span class="livedot hijau"></span><b>Peringatan dini nasional dari BMKG Pusat</b>${w.berlaku?`<small>berlaku ${escH(w.berlaku)}</small>`:""}</div>
 <div class="pstatrow"><span>Papua Barat</span>${lab(w.pb)}</div><div class="pstatrow"><span>Papua Barat Daya</span>${lab(w.pbd)}</div>
 <small>Makin ke kanan makin tinggi tingkat bahayanya: Tidak ada, Waspada, Siaga, lalu Awas. BMKG Pusat menyebut tingkat provinsi ("beberapa kabupaten/kota"); rincian wilayah ada pada peta. ${sumberPusat(d,"Diambil dari").replace(/^<p class="note">|<\/p>$/g,"")}</small></div>`}
function prediksiPusat(){const d=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];if(!d)return "";const out=[];
 const r=(d.rendah||[]).filter(x=>x.pb||x.pbd);if(r.length)out.push(`Hujan kategori <b>Rendah</b> (&lt;50 mm/dasarian) diprediksi di sebagian ${r.some(x=>x.pb)&&r.some(x=>x.pbd)?"Papua Barat dan Papua Barat Daya":r.some(x=>x.pb)?"Papua Barat":"Papua Barat Daya"} pada <b>${r.map(x=>dasTeks(x.das)).join(", ")}</b>. Artinya hujan sedikit, kurang dari 50 mm dalam 10 hari, sehingga deret hari tanpa hujan bisa bertambah.`);
 const t=d.tinggi||[],pb=t.filter(x=>x.pb).map(x=>escH(x.bln)),pbd=t.filter(x=>x.pbd).map(x=>escH(x.bln));
 if(pb.length||pbd.length)out.push(`Peluang tinggi hujan <b>lebih dari 300 mm/bulan</b>${pb.length?` di sebagian Papua Barat: <b>${pb.join(", ")}</b>`:""}${pb.length&&pbd.length?";":""}${pbd.length?` di sebagian Papua Barat Daya: <b>${pbd.join(", ")}</b>`:""}.`);
 if(!out.length)return "";return `<div class="panel"><div class="panel-head"><span>Prediksi Hujan dari BMKG Pusat</span></div><div class="panel-body"><ul class="cekl">${out.map(x=>`<li>${x}</li>`).join("")}</ul><p class="note"><b>Cara membaca:</b> satu bulan dibagi tiga periode 10 harian (dasarian): tanggal 1–10, 11–20, dan 21 sampai akhir bulan. Hujan di bawah 50 mm dalam 10 hari tergolong sedikit; lebih dari 300 mm dalam sebulan tergolong banyak.</p>${sumberPusat(d)}</div></div>`}
function petaPusat(x,judul,label){if(!x||!x.gambar||!x.gambar.length)return "";
 return `<div class="panel"><div class="panel-head"><span>${judul} · ${escH(x.judul)}</span><span class="pill ok">BMKG Pusat</span></div><div class="panel-body"><div class="petapusat">${x.gambar.slice(0,2).map(u=>`<figure class="map"><a href="${escH(u)}" target="_blank" rel="noopener"><img src="${escH(u)}" alt="${escH(x.judul)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('figure').remove()"></a><figcaption>${label(u)}</figcaption></figure>`).join("")}</div><p class="note">Peta seluruh Indonesia; wilayah kami ada di bagian timur (kepala burung Papua). Klik peta untuk memperbesar.</p>${sumberPusat(x,"Diambil dari")}</div></div>`}
function kontenPusat(k){if(!PUSAT)return "";
 if(k==="hujan-bulanan")return petaPusat(PUSAT.hujan,"Peta Terbaru BMKG Pusat",u=>/_SH_|sifat/i.test(u)?"Sifat hujan":/_CH_|curah/i.test(u)?"Curah hujan":"Peta")+prediksiPusat();
 if(k==="hari-tanpa-hujan")return statusPusat("kekeringan")+prediksiPusat();
 if(k==="peringatan-kekeringan")return statusPusat("kekeringan")+petaPusat(PUSAT.spi,"Peta SPI Terbaru BMKG Pusat",u=>/SPI3M/i.test(u)?"SPI 3 bulan":/SPI1M/i.test(u)?"SPI 1 bulan":"SPI");
 if(k==="peringatan-hujan-tinggi")return statusPusat("hujan");
 return ""}
/* ===== KONDISI IKLIM TERKINI =====
   Gabungan: angka otomatis BMKG Pusat (ENSO, IOD, peringatan dini, prediksi hujan dasarian)
   + kartu dari Buletin Iklim kami yang diisi lewat Admin > Kondisi Iklim. */
const KONDISI_BAWAAN={sumber:"Buletin Iklim Edisi Oktober 2026",ringkasan:"September 2026 didominasi hujan Rendah dengan sifat Bawah Normal. November 2026 – Januari 2027 diprakirakan hujan Menengah dengan sifat Atas Normal.",kartu:[
 {kunci:"hujan",judul:"Hujan September 2026",nilai:"Rendah",ket:"Sifat Bawah Normal di kedua provinsi"},
 {kunci:"prakiraan",judul:"Prakiraan November 2026",nilai:"Menengah",ket:"Papua Barat: Atas Normal"},
 {kunci:"musim",judul:"Awal Musim Hujan",nilai:"Oktober 2026",ket:"6 ZOM · 30,02% luas daratan",angka:30.02},
 {kunci:"hth",judul:"Hari Tanpa Hujan",nilai:"10 pos Panjang",ket:"Dasarian III September 2026",angka:10},
 {kunci:"spi",judul:"SPI September 2026",nilai:"Kering",ket:"Agak Kering s.d. Sangat Kering"}]};
const KUNCI_KARTU=[["hujan","Hujan bulan lalu","#0284c7","#hujan-bulanan"],["prakiraan","Prakiraan bulan depan","#7c3aed","#hujan-bulanan"],["musim","Awal musim","#15803d","#prakiraan-musim"],["hth","Hari tanpa hujan","#ea580c","#hari-tanpa-hujan"],["spi","Indeks kekeringan (SPI)","#b45309","#peringatan-kekeringan"]];
function kondisiData(){const k=KA&&KA.kondisi;return k&&Array.isArray(k.kartu)&&k.kartu.length?k:KONDISI_BAWAAN}
/* --- visual mini per kartu (SVG beranimasi, warna mengikuti --c) --- */
const LV_HUJAN=n=>/sangat tinggi/i.test(n)?4:/tinggi/i.test(n)?3:/menengah|sedang/i.test(n)?2:/rendah/i.test(n)?1:2;
const SPI_NILAI=n=>/ekstrem|sangat kering/i.test(n)?-2.2:/agak kering/i.test(n)?-1.1:/kering/i.test(n)?-1.6:/sangat basah/i.test(n)?2.2:/agak basah/i.test(n)?1.1:/basah/i.test(n)?1.6:0;
const VIZ={
 hujan:(x)=>{const n=LV_HUJAN(x.nilai);return `<svg viewBox="0 0 80 64"><g class="a-geser"><ellipse cx="34" cy="20" rx="20" ry="12" fill="currentColor" opacity=".28"/><ellipse cx="50" cy="22" rx="16" ry="10" fill="currentColor" opacity=".4"/></g>${Array.from({length:n*2},(_,i)=>`<line class="a-jatuh" style="animation-delay:${(i*.27).toFixed(2)}s" x1="${22+i*(36/(n*2))}" y1="34" x2="${19+i*(36/(n*2))}" y2="44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`).join("")}${[0,1,2,3].map(i=>`<rect x="${12+i*15}" y="${62-(i<n?6+i*3:3)}" width="10" height="${i<n?6+i*3:3}" rx="2" fill="currentColor" opacity="${i<n?.85:.2}"/>`).join("")}</svg>`},
 prakiraan:(x)=>{const n=LV_HUJAN(x.nilai);return `<svg viewBox="0 0 80 64"><rect x="10" y="10" width="44" height="44" rx="8" fill="currentColor" opacity=".14"/><rect x="10" y="10" width="44" height="12" rx="6" fill="currentColor" opacity=".55"/><line x1="22" y1="6" x2="22" y2="14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="42" y1="6" x2="42" y2="14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>${[0,1,2].map(i=>`<rect class="a-batang" style="transform-origin:${20+i*12}px 50px;animation-delay:${i*.3}s" x="${16+i*12}" y="${50-(8+Math.min(n,3)*4+i*2)}" width="8" height="${8+Math.min(n,3)*4+i*2}" rx="2" fill="currentColor"/>`).join("")}${(()=>{const t=String((x.ket||"")+" "+(x.nilai||""));const d=/atas normal/i.test(t)?"M60 40 l8 -10 l8 10":/bawah normal/i.test(t)?"M60 30 l8 10 l8 -10":"";return d?`<path class="a-lompat" d="${d}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`:`<path d="M60 31 h16 M60 39 h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`})()}</svg>`},
 musim:(x)=>{const p=Math.max(0,Math.min(100,+x.angka||0)),C=138.2;return `<svg viewBox="0 0 80 64"><circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="8"/><circle class="ring" style="--off:${(C*(1-p/100)).toFixed(1)}" cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" transform="rotate(-90 32 32)"/><text x="32" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor">${p?Math.round(p)+"%":""}</text><g class="a-jatuh"><path d="M66 22 q6 9 0 13 q-6 -4 0 -13z" fill="currentColor" opacity=".7"/></g></svg>`},
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
  const sf=bag.length?bag.join(", "):SIFAT_ARTI(t);return `${b||"Bulan depan"} diperkirakan turun ${a}${sf?"; "+sf:""}.`}
 if(k==="musim"){const z=(t.match(/(\d+)\s*ZOM/i)||[])[1];return n?`Di ${z?z+" Zona Musim":"sebagian wilayah"}, hujan mulai turun rutin (minimal 50 mm per 10 hari) sejak ${escH(n)}.`:""}
 if(k==="hth"){const c=(n.match(/(\d+)\s*pos/i)||[])[1],kt=HTH_KAT.find(([w])=>new RegExp(w,"i").test(n));return kt?`${c?c+" pos hujan":"Sebagian pos hujan"} sudah ${kt[1]} hari berturut-turut tidak kena hujan.`:"Jumlah hari berturut-turut tanpa hujan di pos-pos hujan kami."}
 if(k==="spi"){const a=/ekstrem|sangat kering/i.test(n)?"hujan jauh lebih sedikit dari biasanya; wilayah sangat kering":/agak kering/i.test(n)?"hujan sedikit di bawah biasanya":/kering/i.test(n)?"hujan lebih sedikit dari biasanya; wilayah sedang kering":/sangat basah|ekstrem basah/i.test(n)?"hujan jauh lebih banyak dari biasanya":/basah/i.test(n)?"hujan lebih banyak dari biasanya":/normal/i.test(n)?"hujan sesuai kebiasaan":"";return a?`Dibanding catatan puluhan tahun, ${a}.`:""}
 return ""}
function artiIod(v){return v>=.4?"Laut Samudra Hindia barat lebih hangat dari bagian timurnya. Biasanya mengurangi hujan di Indonesia bagian barat; pengaruhnya di Papua kecil.":v<=-.4?"Laut Samudra Hindia timur lebih hangat. Biasanya menambah hujan di Indonesia bagian barat; pengaruhnya di Papua kecil.":"IOD sedang netral, tidak banyak memengaruhi hujan."}
/* daftar dasarian dikelompokkan per bulan: "1–10, 11–20, dan 21–akhir November" */
function dasDaftar(arr){const g=[];arr.map(x=>dasTeks(x.das).replace(/ \d{4}$/,"")).forEach(t=>{const m=t.match(/^(\S+)\s+(.+)$/);if(!m)return;let e=g.find(y=>y.b===m[2]);if(!e)g.push(e={b:m[2],p:[]});e.p.push(m[1])});
 const gab=a=>a.length>1?a.slice(0,-1).join(", ")+" dan "+a[a.length-1]:a[0]||"";return gab(g.map(e=>gab(e.p)+" "+e.b))}
function artiEnso(e){return /El Niño/.test(e.status)?`Laut Pasifik bagian tengah ${e.enso>=2?"jauh ":""}lebih hangat dari biasanya. Bagi Papua Barat dan Papua Barat Daya, hujan cenderung berkurang dan musim kering bisa lebih panjang.`:/La Niña/.test(e.status)?"Laut Pasifik bagian tengah lebih dingin dari biasanya. Hujan cenderung bertambah; waspadai banjir dan longsor.":"Suhu laut Pasifik sedang normal, sehingga ENSO tidak banyak memengaruhi hujan."}
const OTO='<i class="livedot hijau otodot" aria-hidden="true"></i>';
function tandaiOto(root){if(!root)return;
 root.querySelectorAll("[data-oto]").forEach(n=>{const box=n.closest(".panel,.card,.wilk,.pusatbar")||n.parentElement;const h=box&&box.querySelector(".panel-head>span,h3,.eyebrow,h2");if(h&&!h.querySelector(".otodot"))h.insertAdjacentHTML("beforeend",OTO)});
 root.querySelectorAll("[data-otogrup] .panel-head>span:first-child,[data-otogrup] h3,[data-otogrup] .sec-title").forEach(h=>{if(!h.querySelector(".otodot"))h.insertAdjacentHTML("beforeend",OTO)})}
function kartuK(o,i){return `<a class="kt reveal" href="${o.link}" style="--c:${o.c};--i:${i}"><div class="ktviz">${o.viz}</div><span class="ktlab">${o.lab}</span><b class="ktval">${o.val}</b><small>${o.ket}</small>${o.arti?`<span class="ktarti">${o.arti}</span>`:""}<em class="ktsrc${o.pusat?" pusat":""}">${o.pusat?'<i class="livedot hijau"></i>BMKG Pusat':(o.oto?'<i class="livedot hijau"></i>':"")+o.src}</em></a>`}
function kartuPusat(){const e=EN(),out=[],pt=PUSAT&&PUSAT.dinat&&PUSAT.dinat[0];
 const vi=e.iod!=null?e.iod:e.iodB;out.push({kunci:"iod",lab:"Status IOD (Samudra Hindia)",val:statusIod(vi),ket:"Indeks DMI "+(e.iod!=null?e.iodS:e.iodBS)+" "+fmtV(vi),arti:artiIod(vi),viz:VIZ.iod(vi),c:"#f08c2e",link:"#enso-iod",pusat:!!e.src,src:"Buletin Iklim kami"});
 const d=daftarPeringatan(),t=d[0];out.push({kunci:"peringatan",lab:"Peringatan dini",val:t?NAMA_STATUS[t.status]:"Tidak ada",arti:t?`${NAMA_STATUS[t.status]} adalah tingkat ${t.status==="awas"?"tertinggi":t.status==="siaga"?"kedua":"terendah"} dari tiga tingkat peringatan (Waspada, Siaga, Awas). Buka untuk melihat wilayahnya.`:"Saat ini tidak ada wilayah kita yang mendapat peringatan dini kekeringan maupun hujan tinggi.",ket:t?`${d.length} wilayah · ${[...new Set(d.map(x=>JENIS_PENDEK[x.jenis]))].join(" & ")}`:"Tidak ada Waspada, Siaga, Awas",viz:VIZ.peringatan(t&&t.status),c:t?(t.status==="awas"?"#dc2626":t.status==="siaga"?"#ea580c":"#ca8a04"):"#16a34a",link:t?linkJenis(t.jenis):"#peringatan-kekeringan",pusat:t?!!t.pusat:!!pt,src:t?"Admin kami":"Pantauan kami"});
 if(pt){const r=(pt.rendah||[]).filter(x=>x.pb||x.pbd),tg=(pt.tinggi||[]).filter(x=>x.pb||x.pbd);
  out.push({kunci:"prediksi",lab:"Prediksi hujan 10 harian",arti:r.length?`Hujan diperkirakan sedikit (kurang dari 50 mm per 10 hari) pada ${dasDaftar(r)}.`:tg.length?`Ada peluang hujan banyak, lebih dari 300 mm sebulan, pada ${tg.slice(0,2).map(x=>escH(x.bln)).join(", ")}. Waspadai banjir dan longsor.`:"Hujan diperkirakan lebih dari 50 mm tiap 10 hari (tidak tergolong sedikit).",val:r.length?"Rendah":tg.length?"Berpeluang tinggi":"Tidak rendah",ket:r.length?"&lt;50 mm · "+r.map(x=>escH(x.das.replace(/^(\w{3}) (I{1,3}) \d{4}$/,(m,a,b)=>a.charAt(0)+a.slice(1).toLowerCase()+" "+b))).join(", "):tg.length?"&gt;300 mm/bulan: "+tg.slice(0,2).map(x=>escH(x.bln)).join(", "):"Di atas 50 mm per dasarian",viz:VIZ.prediksi(r.length?[0,1,2].map(i=>!!r[i]):null),c:"#0369a1",link:"#hujan-bulanan",pusat:true})}
 return out}
const BLNTH=/(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\s+\d{4}/i;
function kartuAdmin(kd){const mA=(String(((kd.kartu||[]).find(x=>x.kunci==="hujan")||{}).judul||"").match(BLNTH)||[""])[0].toLowerCase();
 return (kd.kartu||[]).filter(x=>{if(!mA||!["hth","spi"].includes(x.kunci))return true;const m=(String(x.judul||"")+" "+String(x.ket||"")).match(BLNTH);return !m||m[0].toLowerCase()===mA}).map(x=>{const m=KUNCI_KARTU.find(k=>k[0]===x.kunci)||["lain","",'#0133cc',"#publikasi"];
  const j0=String(x.judul||""),lab=x.kunci==="prakiraan"&&!/hujan/i.test(j0)?j0.replace(/^prakiraan/i,"Prakiraan hujan"):x.kunci==="hujan"&&/^hujan\s/i.test(j0)?j0.replace(/^hujan/i,"Curah hujan"):x.kunci==="spi"&&!/kering/i.test(j0)?j0.replace(/^SPI/i,"Indeks kekeringan (SPI)"):j0;
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
 <div class="kensoin"><span class="eyebrow">ENSO · Suhu Muka Laut Pasifik${e.src?OTO:""}</span>${gaugeEnso(e.enso)}<div class="kensonum"><div class="kangka" data-v="${e.enso}">${fmtV(e.enso)}</div><span class="pill ${pillEnso(e.status)}">${e.status.replace(" · "," ")}</span></div>
 <p>Indeks ENSO periode ${e.ensoNama}${e.src?" · BMKG Pusat, analisis Dasarian "+escH(e.src.per.das)+" "+escH(e.src.per.bln)+" "+escH(e.src.per.thn):""}.${/El Niño|La Niña/.test(e.status)&&TH("enso_prediksi")?" Diprediksi "+esc(TH("enso_prediksi").replace(/^\w/,c=>c.toLowerCase())).replace(/\.$/,"")+".":""}</p>
 <p class="karti"><b>Artinya:</b> ${artiEnso(e)}</p>${kd.ringkasan?`<p class="kring">${escH(kd.ringkasan)}</p>`:""}<a class="kmore" href="#enso-iod">Lihat ENSO &amp; IOD →</a></div></div>`}
function kondisiHTML(){const kd=kondisiData(),t=[...kartuPusat(),...kartuAdmin(kd)];
 return `<div class="kondisi2">${kartuEnso()}<div class="ktgrid">${t.map(kartuK).join("")}</div></div><p class="note ksumber"><span class="ktsrc pusat"><i class="livedot hijau"></i>BMKG Pusat</span> diambil dari rilisan BMKG Pusat. Kartu lain dari ${escH(kd.sumber||"Buletin Iklim kami")}.</p>`}
/* ringkasan kartu & dokumen terbaru kami pada halaman Iklim */
const KARTU_HAL={"hujan-bulanan":["hujan","prakiraan","prediksi"],"hari-tanpa-hujan":["hth","prediksi","peringatan"],"peringatan-kekeringan":["spi","peringatan","hth"],"peringatan-hujan-tinggi":["peringatan","prediksi","prakiraan"],"prakiraan-musim":["musim","prakiraan"],"zona-musim":["musim"],"iklim-papua-barat":["hujan","prakiraan","spi","iod"],"enso-iod":["iod"]};
const TEKS_HAL={"hujan-bulanan":["hujan","prakiraan"],"hari-tanpa-hujan":["hth"],"peringatan-kekeringan":["spi","hth"],"peringatan-hujan-tinggi":["prakiraan"],"prakiraan-musim":["musim"],"zona-musim":["musim"],"enso-iod":["enso"],"iklim-papua-barat":["hujan","prakiraan","spi"]};
function teksKami(k){const kd=kondisiData(),t=kd.teks||{},w=(TEKS_HAL[k]||[]).filter(x=>t[x]);if(!w.length)return "";
 return `<div class="tekskami reveal"><div class="tkico">${ic('<path d="M7 7h10M7 11h10M7 15h6"/><rect x="3" y="3" width="18" height="18" rx="3"/>')}</div><div><span class="eyebrow">Ringkasan dari ${escH(kd.otomatis||kd.sumber||"dokumen terbaru kami")}${kd.otomatis?OTO:""}</span>${w.map(x=>`<p>${escH(t[x])}</p>`).join("")}</div></div>`}
function ringkasKami(k){const w=KARTU_HAL[k];if(!w)return teksKami(k);const all=[...kartuPusat(),...kartuAdmin(kondisiData())],t=w.map(x=>all.find(a=>a.kunci===x)).filter(Boolean);if(!t.length)return teksKami(k);
 return `<div class="ktgrid mini">${t.map(kartuK).join("")}</div>`+teksKami(k)}
const DOK_HAL={"prakiraan-musim-kemarau":/kemarau/i,"prakiraan-musim":/musim hujan|fgd|press/i,"zona-musim":/musim|zom/i,"hujan-bulanan":/buletin|informasi iklim/i,"hari-tanpa-hujan":/buletin|peringatan/i,"peringatan-kekeringan":/buletin|peringatan|kekeringan/i,"peringatan-hujan-tinggi":/peringatan|hujan tinggi/i,"enso-iod":/buletin|enso|el ni/i,"iklim-papua-barat":/buletin|informasi iklim/i};
function dokKami(k){const re=DOK_HAL[k];if(!re)return "";
 const a=((KA&&KA.publikasi)||[]).filter(p=>p.jenis!=="Berita Kegiatan"&&(p.file||p.link)&&re.test(p.jenis+" "+p.judul)).map(p=>({jenis:escH(p.jenis),judul:escH(p.judul),tgl:tglPendek(p.tanggal),ringkas:escH(potong(p.ringkas,140)),url:p.file?fileURL(p.file):urlAman(p.link),gambar:fileURL(p.gambar),seni:SENI_JENIS[p.jenis]||"hujan"}));
 const s=(typeof PUBLIKASI!=="undefined"?PUBLIKASI:[]).filter(p=>(p.file||p.url)&&re.test(p.kategori+" "+p.judul)).map(p=>({jenis:p.kategori,judul:p.judul,tgl:p.tanggal,ringkas:potong(p.ringkas,140),url:p.file||p.url,gambar:p.gambar||"",seni:/kemarau/i.test(p.judul)?"panas":"hujan"}));
 const d=[...a,...s].slice(0,2);if(!d.length)return "";
 return `<div class="dokkami">${d.map((x,i)=>`<a class="dok reveal" style="--d:${i*80}ms" href="${x.url}" target="_blank" rel="noopener">${sampulDok("dokimg",x.gambar,x.seni,"")}<div class="dokisi"><span class="eyebrow">${x.jenis} · dari kami</span><b>${x.judul}</b><small>${x.tgl}</small>${x.ringkas?`<p>${x.ringkas}</p>`:""}<i>Unduh dokumen ↗</i></div></a>`).join("")}</div>`}



const PBD=["Kota Sorong","Sorong","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw"];
const SRC='<p class="note">Sumber: Buletin Iklim kami, Edisi Oktober 2026 (Vol. 99, ISSN 2622-9798).</p>';
function awam(title,items){return `<div class="card prose awam" style="margin-top:22px"><h3 style="margin-top:0">${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul></div>`}
function tbl(h,rows){return `<div class="tbl-wrap"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}

/* ---- Beranda (gaya portal modern) ---- */
const IKON_WA='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3z"/></svg>';
const IKON_IG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
function tombolSosial(){const I=INFO();return `<div class="sosbtn"><a class="sb wa" href="${waURL()}" target="_blank" rel="noopener">${IKON_WA}WhatsApp ${escH(waTeks(I.wa))}</a><a class="sb ig" href="${igURL()}" target="_blank" rel="noopener">${IKON_IG}Instagram @${escH(I.ig)}</a>${I.linktree?`<a class="sb lt" href="${escH(I.linktree)}" target="_blank" rel="noopener">${IKON_LT}Linktree</a>`:""}</div>`}
function petaKantor(){const p={...((typeof PETA_KANTOR!=="undefined"?PETA_KANTOR:{})||{})};const I=INFO();if(/^https:\/\/www\.google\.com\/maps\/embed\?/.test(I.peta_embed||""))p.embed=I.peta_embed;if(/^https:\/\//.test(I.peta_link||""))p.link=I.peta_link;const q=p.cari||"Kantor Gubernur Papua Barat, Arfai, Manokwari";
 const embed=p.embed||("https://www.google.com/maps?q="+encodeURIComponent(q)+"&output=embed");const buka=p.link||("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q));
 return `<div class="peta"><iframe src="${escH(embed)}" title="Peta lokasi kantor Stasiun Klimatologi Papua Barat" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="petabtn" href="${escH(buka)}" target="_blank" rel="noopener">Buka di Google Maps ↗</a></div>`}
function kartuKontak(){const I=INFO();return `<div class="kontakbox"><span class="eyebrow">Kantor Pelayanan</span><h3>Stasiun Klimatologi Papua Barat</h3>
 <dl class="kv"><dt>Alamat</dt><dd>${escH(I.alamat)}</dd>
 <dt>Telepon / WA</dt><dd><a href="${waURL()}" target="_blank" rel="noopener">${escH(waTeks(I.wa))}</a></dd>
 <dt>Email</dt><dd><span id="mail">${escH(I.email)}</span> <button type="button" id="copyMail" class="mini">Salin</button></dd>
 <dt>Instagram</dt><dd><a href="${igURL()}" target="_blank" rel="noopener">@${escH(I.ig)}</a></dd>
 <dt>Jam Layanan</dt><dd>${escH(I.jam)}</dd></dl>${tombolSosial()}</div>`}
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
function heroSlider(){const B=daftarBanner().map(b=>!b.gambar&&b.luar&&/^https?:\/\//.test(b.link||"")&&!/\.pdf($|\?)/i.test(b.link)&&!/bmkg\.go\.id|workers\.dev\/file/.test(b.link)?{...b,og:b.link}:b);
 /* gambar dari sumber: foto (berita) dipasang penuh; gambar data/peta/dokumen dipasang sebagai "figur" berbingkai dengan latar buram dari gambar yang sama */
 const latar=(b,i)=>{const sn=b.seni||"hujan";if(!b.gambar)return `<div class="hsbg">${SENI[sn]||SENI.alat}</div><div class="hsshade"></div>`;const g=escH(b.gambar),ld=i?"lazy":"eager";
  if(!b.figur)return `<div class="hsbg"><img src="${g}" alt="" loading="${ld}" referrerpolicy="no-referrer" onerror="gagalBanner(this)"></div><div class="hsshade"></div>`;
  return `<div class="hsbg"><img class="figbg" src="${g}" alt="" loading="${ld}" referrerpolicy="no-referrer" onerror="gagalBanner(this)"></div><div class="hsshade"></div><figure class="hsfig"><div class="fgin"><img src="${g}" alt="${escH(b.keterangan||"")}" loading="${ld}" referrerpolicy="no-referrer" onerror="gagalBanner(this)">${b.keterangan?`<figcaption>${escH(b.keterangan)}</figcaption>`:""}</div></figure>`};
 return `<section class="hslider bleed" aria-roledescription="carousel" aria-label="Sorotan">${B.map((b,i)=>`<div class="hs${i===0?" on":""}${b.status?" st-"+b.status:""}${b.gambar&&b.figur?" adafig":""}${b.gambar&&!b.figur?" adafoto":""}" data-i="${i}" data-seni="${escH(b.seni||"hujan")}"${b.og?` data-og="${escH(b.og)}"`:""} aria-hidden="${i?"true":"false"}">
  ${latar(b,i)}${b.sumber?`<span class="hssumber">${b.sumber}</span>`:""}
  <div class="wrap hscontent"><span class="hslabel">${b.label||""}</span><h1>${b.judul}</h1><p>${b.teks||""}</p>${b.tombol?`<a class="hsbtn" href="${escH(b.link||"#beranda")}"${b.luar?' target="_blank" rel="noopener"':""}>${b.tombol} ${b.luar?"↗":"→"}</a>`:""}</div></div>`).join("")}
  ${B.length>1?`<div class="wrap hsnav"><div class="hsdots">${B.map((_,i)=>`<button type="button" class="${i?"":"on"}" data-go="${i}" aria-label="Sorotan ${i+1}"></button>`).join("")}</div><div class="hsarr"><button type="button" data-step="-1" aria-label="Sebelumnya">‹</button><button type="button" data-step="1" aria-label="Berikutnya">›</button></div></div>`:""}</section>`}
/* gambar gagal dimuat: kembali ke ilustrasi animasi */
function gagalBanner(im){const hs=im.closest(".hs");if(!hs||hs.dataset.gagal)return;hs.dataset.gagal=1;const bg=hs.querySelector(".hsbg");if(bg)bg.innerHTML=SENI[hs.dataset.seni]||SENI.hujan;const f=hs.querySelector(".hsfig");if(f)f.remove();hs.classList.remove("adafig","adafoto")}
function geserSlide(n){const s=[...document.querySelectorAll(".hs")];if(!s.length)return;SLIDE=(n+s.length)%s.length;
 s.forEach((el,i)=>{el.classList.toggle("on",i===SLIDE);el.setAttribute("aria-hidden",i===SLIDE?"false":"true")});
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
 musim(){const bln=["Okt","Nov","Des","Jan","Feb","Mar"],n=bln.map(b=>{const x=AWAL_MH.find(a=>a[0].startsWith(b));return x?x[1]:0}),mx=Math.max(...n,1),im=n.indexOf(mx);
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
 alat(){const st=ALAT.map(a=>statusOf(LAST[a.id])[1]),pos=[[198,40],[236,30],[268,52],[214,78],[250,88],[284,96],[196,106],[226,118],[262,124],[174,66],[292,70],[180,90],[240,60]];
  return PF_SC(`<g fill="none" stroke="#fff" stroke-opacity=".22"><circle cx="234" cy="76" r="22"/><circle cx="234" cy="76" r="44"/><circle cx="234" cy="76" r="66"/><line x1="168" y1="76" x2="300" y2="76"/><line x1="234" y1="10" x2="234" y2="142"/></g>
  <g class="s3-putar" style="--d:4s;transform-origin:234px 76px"><path d="M234 76 L234 10 A66 66 0 0 1 291 43 Z" fill="#fff" opacity=".16"/><line x1="234" y1="76" x2="234" y2="10" stroke="#fff" stroke-width="2" stroke-opacity=".7"/></g>
  ${pos.slice(0,ALAT.length).map(([x,y],i)=>{const ok=st[i]==="ok";return `${ok?`<circle class="s3-ping" style="animation-delay:${(i*.27).toFixed(2)}s" cx="${x}" cy="${y}" r="4" fill="none" stroke="#86efac" stroke-width="1.5"/>`:""}<circle cx="${x}" cy="${y}" r="4" fill="${ok?"#86efac":"#fff"}" fill-opacity="${ok?1:.4}"/>`}).join("")}
  <g transform="translate(46 30)" stroke="#fff" fill="none" stroke-width="3" stroke-linecap="round"><line x1="0" y1="10" x2="0" y2="100"/><line x1="-22" y1="100" x2="22" y2="100"/><g class="s3-putar" style="--d:2.4s;transform-origin:0px 6px">${[0,120,240].map(d=>`<g transform="rotate(${d} 0 6)"><line x1="0" y1="6" x2="0" y2="-6"/><circle cx="0" cy="-9" r="4" fill="#fff"/></g>`).join("")}</g><rect x="-12" y="52" width="24" height="18" rx="3"/><circle class="s3-led" cx="-4" cy="61" r="2.5" fill="#86efac" stroke="none"/></g>`)}};
function produkHTML(){const kd=kondisiData(),kk=k=>(kd.kartu||[]).find(x=>x.kunci===k)||{},e=EN();
 const on=ALAT.filter(a=>statusOf(LAST[a.id])[1]==="ok").length,ada=Object.keys(LAST).length;
 const f=(x,alt)=>x&&x.nilai?`${escH(x.judul||"")}: <b>${escH(x.nilai)}</b>`:alt;
 const D=[
  ["#prakiraan-musim","#15803d","#064e3b","Prakiraan","Prakiraan Musim","Awal, sifat, dan puncak musim hujan per Zona Musim.",PF_VIZ.musim(),kk("musim").nilai?`Awal musim hujan <b>${escH(kk("musim").nilai)}</b>${kk("musim").ket?" · "+escH(kk("musim").ket.split("·")[0].trim()):""}`:"Prediksi Musim Hujan 2026/2027"],
  ["#hujan-bulanan","#0284c7","#0c4a6e","Analisis","Hujan Bulanan","Analisis dan prakiraan curah hujan bulanan.",PF_VIZ.hujan(),f(kk("hujan"),"Analisis &amp; prakiraan tiap bulan")],
  ["#hari-tanpa-hujan","#ea580c","#7c2d12","Monitoring","Hari Tanpa Hujan","Deret hari kering di setiap pos hujan, tiap dasarian.",PF_VIZ.hth(),kk("hth").nilai?`<b>${escH(kk("hth").nilai)}</b>${kk("hth").ket?" · "+escH(kk("hth").ket):""}`:"Monitoring per dasarian"],
  ["#enso-iod","#0f766e","#134e4a","Dinamika atmosfer","ENSO &amp; IOD","Pemantauan El Niño, La Niña, dan Indian Ocean Dipole.",PF_VIZ.enso(),`Indeks ENSO <b>${fmtV(e.enso)}</b> · ${escH(e.status.replace(" · "," "))}`],
  ["#peringatan-kekeringan","#b45309","#78350f","Kekeringan","Kekeringan &amp; SPI","Indeks presipitasi terstandarisasi untuk menilai kekeringan.",PF_VIZ.spi(kk("spi")),f(kk("spi"),"Indeks SPI bulanan")],
  ["#zona-musim","#7c3aed","#4c1d95","Wilayah","Zona Musim","Pembagian wilayah berdasarkan pola hujan 1991–2020.",PF_VIZ.zona(),`<b>21 wilayah</b> · ${typeof ZOM11!=="undefined"?ZOM11.length:11} Zona Musim`],
  ["#iklim-papua-barat","#059669","#064e3b","Informasi iklim","Iklim Wilayah","Pengendali iklim dan pola hujan Papua Barat &amp; Papua Barat Daya.",PF_VIZ.wilayah(),"<b>3 pola hujan</b> · monsunal, ekuatorial, lokal"],
  ["#peralatan","#0133cc","#1e3a8a","Data langsung","Peralatan","Jaringan AWS dan ARG yang mengirim data langsung dari lapangan.",PF_VIZ.alat(),`<b>${ALAT.length} alat</b> · ${ALAT.filter(a=>a.jenis==="AWS").length} AWS &amp; ${ALAT.filter(a=>a.jenis==="ARG").length} ARG`]];
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
  <div class="awcmain"><div class="awcsuhu"><span class="awcnum">${ada?fmt(su,1):"--"}</span><span class="awcu">°C</span></div></div>
  <span class="awcket">${ada?(sensorCek(n,"suhu")?"Sensor suhu sedang diperiksa":`Suhu udara · ${siang?"siang":"malam"} hari`):"Menunggu data pertama dari alat"}</span>
  <div class="awcgrid">
   <div class="awm">${ring(rh,100)}<span>Kelembapan${sensorCek(n,"rh")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof rh==="number"?fmt(rh,0)+" %":"–"}</b></div>
   <div class="awm">${kompas(wd)}<span>Angin${typeof wd==="number"?" · dari "+arahMata(wd):""}${sensorCek(n,"ws")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof ws==="number"?fmt(ws,1)+" m/s":"–"}</b></div>
   <div class="awm">${tetes(hj)}<span>Hujan hari ini${sensorCek(n,"hujan")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof hj==="number"?fmt(hj,1)+" mm":"–"}</b></div>
   <div class="awm">${tekan(pr)}<span>Tekanan udara${sensorCek(n,"tekanan")?`<small class="cekb">${CEK_TEKS}</small>`:""}</span><b>${ada&&typeof pr==="number"?fmt(pr,0)+" mb":"–"}</b></div></div>
  <div class="awcfoot"><span>${ada?"Diperbarui "+lamaLalu(r):dataState==="loading"?"Memuat…":"Belum ada data"}</span><em>Detail →</em></div></div></a>`}).join("")}</div>${tandaGeser(aws.length)}`}
/* titik penanda geser (ponsel) */
function tandaGeser(n){return `<div class="gesertanda" aria-hidden="true">${Array.from({length:n},(_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`}
document.addEventListener("scroll",e=>{const t=e.target;if(!t||!t.classList||!(t.classList.contains("produk2")||t.classList.contains("live2")))return;const k=t.children[0];if(!k)return;
 const i=Math.round(t.scrollLeft/(k.getBoundingClientRect().width+14)),d=t.nextElementSibling;if(d&&d.classList.contains("gesertanda"))d.querySelectorAll("i").forEach((x,j)=>x.classList.toggle("on",j===i))},true);

P.beranda=()=>`
${heroSlider()}
<div class="quick">${[
 ["#prakiraan-musim",I.cal,"Prakiraan Musim","Musim hujan 2026/2027"],
 ["#peralatan",I.cloud,"Data Alat Langsung","AWS & ARG terkini"],
 ["#peringatan-kekeringan",I.alert,"Peringatan Dini","Kekeringan & hujan tinggi"],
 ["#wilayah",I.map,"Info Wilayah Saya","Iklim di distrik Anda"],
 ["#publikasi",I.map,"Publikasi","Buletin & prediksi musim"],
 ["#layanan-data",I.drop,"Layanan Data","Permintaan data & kontak"]].map(([h,ico,t,s],i)=>`<a class="qk" style="--i:${i}" href="${h}">${ic(ico)}<b>${t}</b><span>${s}</span></a>`).join("")}</div>
${peringatanAktif()||(GEMPA&&GEMPA.tsunami)?(peringatanAktif()?bandPeringatan():"")+gempaSlot():""}

<section class="sec">
 <div class="sechead"><div><span class="eyebrow">Kondisi Iklim Terkini</span><h2>Papua Barat &amp; Papua Barat Daya</h2></div><a class="more" href="#enso-iod">Selengkapnya →</a></div>
 <div id="kondisiBox">${kondisiHTML()}</div>
</section>

${peringatanAktif()?"":bandPeringatan()}${peringatanAktif()||(GEMPA&&GEMPA.tsunami)?"":gempaSlot()}

${DATA_URL?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Data Langsung${OTO}</span><h2>Pengamatan AWS Terkini</h2></div><a class="more" href="#peralatan">Semua peralatan →</a></div><div id="liveBox">${liveStrip()}</div></section>`:""}


<section class="sec">
 <div class="sechead"><div><span class="eyebrow">Produk Iklim</span><h2>Informasi untuk Perencanaan</h2></div></div>
 ${produkHTML()}
</section>

<section class="sec">
 <div class="sechead"><div><span class="eyebrow">Publikasi</span><h2>Dokumen Terbaru</h2></div><a class="more" href="#publikasi">Semua publikasi →</a></div>
 <div class="grid3">${pubs().slice(0,3).join("")}</div>
</section>

<section class="sec">
 <div class="sechead"><div><span class="eyebrow">Berita</span><h2>Kabar Staklim Papua Barat</h2></div><a class="more" href="#berita">Semua berita →</a></div>
 <div class="featwrap">${newsList(5)}</div>
</section>

<section class="sec">
 <div class="sechead"><div><span class="eyebrow">Hubungi Kami</span><h2>Kantor &amp; Lokasi</h2></div></div>
 <div class="kontakgrid">${kartuKontak()}${petaKantor()}</div>
</section>`;

/* ---- Info gempa BMKG khusus Papua Barat & Papua Barat Daya (pelengkap; peringatan resmi tetap lewat BMKG/BPBD) ---- */
const GEMPA_PETA={o:"M183.4 336.3 177.4 341.3 174 339.3 173.8 335 165.6 344.6 152.6 346.7 148.7 342.6 141.3 342.5 127.3 338.2 111.5 328.1 143.1 314.4 153.7 312.5 163.2 313.4 174.3 307.7 175.2 314.1 180.6 317.9 184 323.6 181.2 328.2 174.4 332.8ZM135.3 259 123.1 263.7 127.9 260.3 114.4 260 116.7 257.2 127.9 254.2 135.4 256.3ZM243.7 262.6 238.3 274.9 234.8 274.8 232.1 272 226.3 273.7 215.8 263.8 212.9 255.1 208.8 250.7 211 249.3 210.2 244.5 205 237.4 229.2 229 234 233.2 243.5 231.5 247.6 237.4 245.7 240.1 247.3 247.8ZM232.5 218.1 227.3 220.9 229 223.3 221.9 227 191 232.2 192.4 230.9 188.7 230.4 186.9 232.2 185.3 231.1 180 232.9 184.1 229.3 184.8 221.9 187.9 220 190.3 220.5 189.5 222.8 191.9 224 195.1 223.4 196.5 220.5 198.6 223.3 203.1 220.6 205.4 222.4 208.1 221.3 213.3 222.6 220 220.1 221.8 221.9 220.4 215.7ZM204.1 192.8 197.2 193.2 199.7 186.5 194.8 190.5 186.2 192.5 189.6 189 186.9 189 185.5 186.4 187.6 187.7 190.5 184.1 193.5 186.9 203.2 181.1 207.8 183.6 208.8 186.3ZM131.6 182.7 127.8 190.2 125.1 188.2 124.4 184.4 130.2 180.8ZM274.5 168.8 263.8 178.9 255.8 173.3 249.8 172.3 242.3 176.7 241.6 175 237 175.8 227.9 165.4 219.7 163.9 219.2 159 211.6 149.3 205 148 201.3 149.3 205.4 151.4 203.6 151.3 202.9 154.1 208.2 157 215.1 168.8 221.1 171.9 222.8 169.1 228.7 169.6 234.8 176.7 231.7 180.6 226.5 182.9 213.3 184.2 208.1 174 208.8 169.1 197.9 173.4 196.5 177.4 198.2 176.6 197.9 178.4 194.7 183.6 195.8 178.7 194.1 178.3 194.4 172.6 191.6 169.1 192.4 165.8 188.6 165.5 184.1 168.5 179.3 166.4 177.6 167.5 161.7 160.1 179.9 161.4 182.4 159.9 183 158.6 178.6 157.5 181.2 155.7 180.6 152.7 178.5 155.7 177.2 153.4 173.8 154 174.5 158.9 169.7 156.5 168.1 150.5 171.8 150.7 173.8 148 175.9 152.7 175.9 148 178.1 147.4 182.8 150.7 182.1 148 183.4 149.3 191 144.5 194.4 147.3 197.2 144.5 198.6 145.8 211.6 143.3 212.2 145.2 216.5 145 218.4 144.5 215 143.1 216.1 141.8 222.5 140.4 237.4 145.7 245.6 144.1 244.4 146.5 255.4 148.6 261.2 153.8 269.7 155.9 271.8 160.3 269.8 163.7ZM495.5 565.2 486 564.4 478.8 560.5 473.1 556.5 472.4 550.8 485.6 560.2 494.1 562.1 502.8 570 500.4 570.1ZM410.3 491.9 406.6 485.3 402 482.4 404.4 480.9 408.1 482.3 411 486.9 411.3 490.4ZM305.5 401.3 299.8 405.4 297.3 405.1ZM498.5 391.3 492.3 388.8 489 383.1 500.5 386.8ZM593.7 384.6 594.6 382.3 592.4 379.2 595.4 376.7 596.7 369.3 598.1 370.8 598.4 383.8ZM622 565.9 613.3 559.8 612.4 554.3 604.8 551.9 609.7 545.3 607.6 542.6 607.9 536.1 612.4 533.8 626.4 535.3 631.6 537.9 636.8 533.7 634.4 535.1 631.6 532.3 607.6 530.8 602 535.5 600.2 540.1 592.5 542.6 586.4 537.9 587.8 536.2 583 530.8 577.5 529.9 573.4 526.9 576 532.6 574.9 534.3 570.6 534.5 574 539.6 571.5 542 567.2 537.1 559.1 534.4 557 528.8 554.1 530.3 554.4 527.5 559.3 523.6 556.2 517.2 552.7 514.5 551 521.8 549.2 522.4 543.9 519.3 538.8 525.5 535.9 523.8 531.3 512.9 524.4 503.8 523.8 499 520.4 500.2 519.5 503.2 522.9 512.2 521 512 516.3 506 510.3 507.3 510.8 501 504.1 488.4 505.3 484.4 509.7 482.7 510.2 480.4 508.3 463.3 509.1 461.6 511 463.2 512.2 458.3 515.8 459 518.4 453.1 524.6 448.7 526.4 448 531.4 452.7 532.9 451.5 526.4 444.2 528.2 436.4 526.1 432.3 521.8 433.5 523 435.4 520.2 441.8 512 446.4 506.8 452.2 506.3 476.2 502.8 481.6 495.1 483.2 491.4 477.8 491.9 483.1 489.1 484.4 496.9 488.2 499.2 494.5 497.6 498 490.6 502.2 480.9 512.2 479.7 515.6 480.9 520.1 485.6 524.7 485.3 526.5 481.2 528.6 465.1 546.7 461.1 547.8 445.2 546.1 439 551.4 430.8 548.8 429.1 543.7 419.6 534.1 419.6 531.8 422.6 533.8 422.5 531.6 413.1 508.2 413 504.9 415.6 502.8 428.1 504.3 429.6 498.6 433.2 495.4 428.1 487.5 423.2 486.1 422.1 483.7 421.2 468.2 414.1 467.7 413.3 473.1 407.1 472.9 400.3 464.2 402.7 459.7 398.2 457 395.3 450.7 374 437.8 372.6 434.7 358.8 431.7 356.9 434.6 350.6 433.7 350.1 436 347.5 435.8 345.8 431.7 337.6 433 342.4 425.5 339 424.1 344.4 420.3 335.8 418.8 346.5 414.5 348.2 415.8 348.8 413.6 358.1 412.5 351.1 411.9 356.2 408.3 371.2 407.6 382.8 409.7 382.1 414.5 387.6 413.1 386.9 410.8 388.5 409.9 398.6 411.7 407.9 420.2 412.8 421.3 425.3 411.7 443.4 387.9 457.3 382.2 464 381.7 471.2 384.3 472.6 390.5 475.4 389.6 479 392.7 478.1 407.6 480.3 407.5 480.5 399.1 484.6 389.5 485.9 390.7 485 404.2 487.3 401.6 487.3 392.2 489.3 392.4 491.9 399 500.7 393.2 503.4 393.9 507.3 397.5 508.2 411.7 511.3 391.2 514.7 392.9 519.9 404.2 521.7 404.9 522.8 395 520.4 390.7 522 387.7 516.7 387.2 514.7 383.8 525 382.4 530.8 387.7 526.6 381.1 538.7 380.6 540.5 378.8 529.9 377.8 529.5 376.3 536.4 372.6 526.7 374.1 535 369.3 535 360.4 532.9 367.4 530.2 365.9 524 370 519.2 366 528.2 359 530.1 359.8 535 356.9 529.8 357.5 529.5 356.3 532.9 354.9 534 350.8 525.8 350.7 523.3 354.2 511 357.6 504.6 363.6 499.4 363.8 499.4 358.3 494.9 364.5 490.4 360.4 491.5 362.6 484.6 363.8 478.8 361.7 471.7 362.3 469.6 360.4 456.9 361.7 434.4 368.3 421.6 364.5 408.9 370.7 403.7 367.7 401.4 361.1 396 358.6 374.8 367 370.6 366.6 361.5 356.6 344.8 348.3 344.4 346 352.7 339.8 342.7 341.8 337.3 336.5 337.2 331.2 334.2 329.5 332.8 320.6 341.8 312.1 342.4 307.6 331.7 310.7 328.7 305.2 329.7 300.1 338.2 293.9 328 297.3 328.9 295.7 327.1 295.3 320.5 300.8 321.1 292 319.1 289.8 317.2 296.3 312.3 297.2 310.7 293.5 312.3 291.8 310.4 291.1 304.7 292.6 297.3 288 290 287 285.7 290.3 282.8 289.8 279 285.7 280.2 282.7 278.4 280.2 272.2 280.1 267.7 277.4 267.5 279.2 273.7 285.3 260.6 292.4 258.7 288.5 252.6 285.3 240.4 285.6 235.1 283.4 235.3 280.5 240.4 277.2 243 267.6 247.4 263.8 258.2 261.7 265.4 248 267.1 240.4 266.4 232.9 269.2 231.5 263.5 224.6 264.3 221.9 290.3 213.3 294.5 213.7 291.7 218.5 327.6 209 335.2 198.9 346.9 193.2 350 187 355.1 183.6 367 178.5 383.7 174.7 410.9 176 430.5 185.3 437.5 184.5 438.3 187 444.8 190.8 455.5 193.2 479.2 212.3 497.3 215.1 500.5 212.6 514.5 215.1 517.4 211.7 523 214.4 537.7 212.3 545.6 219.5 557.2 226.4 547.4 229.5 545.9 234.8 543.6 235.8 552.7 254.8 560.4 261.3 568.2 275 563 283.6 561.6 296 548.7 308.3 554.5 333.9 555.5 344.6 553.5 345 552 351.4 555.2 357.5 556.2 371 560.4 379.5 573 392.2 580.2 414.5 586.4 426.2 593.3 423.4 587.8 403.5 588.4 393.9 595.4 389.1 593.5 387.9 594.6 386.3 603.8 391.1 605.8 396.3 607 423.8 584.8 441.3 585.1 447.8 570.6 462.1 563.4 478.4 666.5 516 627.3 565.5ZM582.6 344 579 353.1 576 355.3 573.2 351.1 575.1 343.3 578.5 340.4ZM560.8 322.7 562.4 324.9 557.5 334.3 556.9 323 563.6 313.9 564.5 319.6ZM570.5 66.7 571 64.4 574.3 63.5 573.9 66.2Z",l:"M133.3 596.3 129.9 596.8 125.9 595.5 134.1 590.9ZM270.5 551.5 268.8 546.3 279.2 555.3 278.5 555.6ZM265 543.2 262.6 543.8 260.9 537.9 264.5 539.7ZM19.7 509.4 14.9 508.4 15.8 504.4 19.6 504.3ZM6.9 496.9 5.6 501.2 2.7 501.8 0 497.8 0 489.3 7.3 494 10.6 490.3 12.8 501.5ZM227.6 498.6 223.2 509.4 224.2 526.5 221.8 526.9 201.6 518.6 181.9 503.7 140.2 487.3 136.4 482.8 136.1 478.2 129 473.3 91 470.3 90.2 473.4 96.3 484 88.6 486.3 48.4 474.1 36.1 475.6 33.8 472 38.2 465.2 35.3 462 27.7 460.3 9.3 474.9 7.8 483.2 0 483.5 0 425.5 26.5 426.2 45.3 420.4 46.4 429.6 50.5 434.8 57.7 435.8 57.9 432.6 61.9 434.1 62.8 431.5 75.8 425.6 80 419.2 94.1 418 116.6 426.9 121.1 431.7 126.2 430.3 136.5 437.4 144.7 439.2 174.5 437.8 188.9 448.7 198.8 452.9 206.7 480.4 216.1 480.6 223.2 485.8 221.1 488.5ZM97.2 159.2 91.7 160.9 85.8 151.4 77.3 148 77.2 143.7 69.3 135.2 93.7 153.4ZM6.7 83.5 8.4 85.8 9 105.3 22.4 108.9 30 119.2 24.8 115 0 108.5 0 82.9ZM14.7 7.9 11.6 11.3 10.4 32.5 0 37.1 0 0 14.3 0ZM312.9 615.5 312.6 610.8 313.3 609.3 315.4 613.7 314.9 615.9ZM303.3 583 308 592.4 306.1 593.4 300.6 583ZM280.1 544.7 277.8 535.7 281.6 535.9 285.3 545.6ZM735 590.6 705.6 588.6 683 583 662.8 586.1 627.3 565.5 666.5 516 563.4 478.4 570.6 462.1 585.1 447.8 585.7 440.3 607 423.8 612.7 438.6 617.2 437.8 625.1 430 626.1 434 621.9 453.6 625.4 454.8 629.9 466.3 636.4 463.8 635.7 468 640.2 473.6 676.2 478.6 690.5 474.8 696.9 468.2 700.2 460.4 715.2 452.8 715.7 445.6 719.9 445.3 731 438.6 733.7 434.3 732.7 427.9 736 423.8 736.5 417.6 740 414.5 740 595.3ZM740 321.5 711.8 310.3 689.8 308.3 682.2 301.1 687.7 299 725.6 304.4 740 304.3ZM671.2 291 658.7 292.6 649.7 290.9 650.9 287.4 673.4 288.4ZM632.6 253.6 626.4 252.1 620 242.8 626.3 233.8 634.4 236.7 635.6 240.9 632.8 247.2 636.2 247.1 639.8 241.9 639.1 248.3ZM730.6 258.9 723.4 252.9 723.4 244.9 716.5 223.9 711.9 222.5 706.1 228.7 688.5 215.7 689.2 220.5 685.9 219.3 679.4 212.3 677 203.6 689.9 207.2 698.3 206.7 700.2 209.6 707.7 208.6 709.5 213 712.5 211.6 717.8 214.9 724.7 209.6 740 222 740 257Z"};
const GP_L0=128.6,GP_T0=1.4,GP_K=100,GP_W=740,GP_H=670,GP_VB=[30,110,690,500];
const GP_KOTA=[["Manokwari",-0.86,134.06,1],["Sorong",-0.88,131.26,1],["Fakfak",-2.92,132.3,1],["Kaimana",-3.66,133.77,1],["Bintuni",-2.11,133.53],["Wasior",-2.7,134.5],["Waisai",-0.43,130.82],["Teminabuan",-1.44,132.02]];
const gpXY=(lat,lon)=>[(lon-GP_L0)*GP_K,(GP_T0-lat)*GP_K];
let GEMPA=null,GEMPA_PILIH=0,GEMPA_T=0;
const gempaURL=()=>DATA_URL?DATA_URL.replace(/\/terkini$/,"/gempa"):"";
function kelasGempa(m){return m>=6?["m4","Gempa kuat","#dc2626"]:m>=5?["m3","Gempa cukup kuat","#ea580c"]:m>=4?["m2","Gempa sedang","#d97706"]:["m1","Gempa kecil","#0ea5e9"]}
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
function gempaSlot(){return `<section class="sec gempasec" id="gempaSec"><div class="sechead"><div><span class="eyebrow"><i class="livedot hijau" aria-hidden="true"></i>Info Gempabumi</span><h2>Gempa di Sekitar Papua Barat &amp; Papua Barat Daya</h2></div><a class="more" href="https://www.bmkg.go.id/gempabumi" target="_blank" rel="noopener">Semua gempa di BMKG →</a></div>
 <div id="gempaTsu">${bannerTsunami()}</div><div id="gempaBox">${gempaHTML()}</div>
 <div class="gp-panduan"><div class="gp-ph"><b>Apa yang harus dilakukan?</b><div class="tabs" data-grup="gempa"><button type="button" class="on" data-t="saat">Saat gempa</button><button type="button" data-t="setelah">Setelah gempa</button><button type="button" data-t="pantai">Di pantai / tsunami</button></div></div>
 <ol data-pgrup="gempa" data-p="saat"><li><b>Merunduk, berlindung, berpegangan.</b> Lindungi kepala dan leher, berlindung di bawah meja yang kokoh.</li><li>Jauhi kaca, lemari, dan benda yang bisa jatuh. Jangan berlari keluar saat lantai masih berguncang.</li><li>Bila di luar, menjauh dari bangunan, tiang listrik, dan pohon menuju tempat terbuka.</li><li>Bila berkendara, menepi dan berhenti; jauhi jembatan dan lereng.</li></ol>
 <ol data-pgrup="gempa" data-p="setelah" hidden><li>Keluar dengan tertib setelah guncangan berhenti; pakai tangga, bukan lift.</li><li>Periksa luka, kebocoran gas, dan kabel listrik yang rusak.</li><li>Waspadai gempa susulan dan jauhi bangunan yang retak.</li><li>Hanya percaya info resmi BMKG (aplikasi InfoBMKG, bmkg.go.id) dan BPBD; jangan sebarkan kabar yang belum jelas.</li></ol>
 <ol data-pgrup="gempa" data-p="pantai" hidden><li><b>Guncangan kuat atau lama sampai sulit berdiri, atau air laut surut tiba-tiba: segera lari ke tempat tinggi</b> atau jauh dari pantai. Jangan menunggu peringatan.</li><li>Ikuti jalur evakuasi dan arahan BPBD; ajak keluarga dan tetangga.</li><li>Tetap di tempat aman sampai BMKG/BPBD menyatakan peringatan berakhir. Gelombang tsunami bisa datang lebih dari sekali.</li><li>Darurat: hubungi 112 atau BPBD setempat.</li></ol>
 <p class="gp-sumberket">Sumber data: <b>BMKG</b> – Data Terbuka Gempabumi (<a href="https://data.bmkg.go.id/" target="_blank" rel="noopener">data.bmkg.go.id</a>), daftar gempa terbaru, gempa M 5,0+, dan gempa dirasakan${GEMPA&&GEMPA.diambil?" · diperbarui "+escH(waktuGempa(GEMPA.diambil).lalu):""}. Ditampilkan gempa M 5+ dan gempa dirasakan yang pusatnya ±150 km dari kota di Papua Barat/Papua Barat Daya atau dirasakan di wilayah ini. Informasi ini <b>pelengkap</b>; peringatan dini tsunami resmi disampaikan BMKG melalui aplikasi InfoBMKG, WRS di media dan BPBD, serta sirine. Gempa dan tsunami ditangani Stasiun Geofisika BMKG.</p></div></section>`}
function isiGempa(){const b=document.getElementById("gempaBox");if(b)b.innerHTML=gempaHTML();const t=document.getElementById("gempaTsu");if(t)t.innerHTML=bannerTsunami();
 const s=document.querySelector(".gp-sumberket");if(s&&GEMPA&&GEMPA.diambil){}}
function muatGempa(paksa){if(!gempaURL()||(!paksa&&Date.now()-GEMPA_T<55000))return;GEMPA_T=Date.now();
 fetch(gempaURL(),{cache:"no-store"}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{if(!j||!("daftar" in j||"galat" in j))throw 0;const lama=JSON.stringify(GEMPA),tsuLama=!!(GEMPA&&GEMPA.tsunami);GEMPA=j;if(JSON.stringify(j)!==lama&&cur==="beranda"){if(!!j.tsunami!==tsuLama){const y=scrollY;render();scrollTo({top:y})}else isiGempa()}}).catch(()=>{if(!GEMPA){GEMPA={galat:1,daftar:[]};if(cur==="beranda")isiGempa()}})}
document.addEventListener("click",e=>{const im=e.target.closest&&e.target.closest("figure.map>img");if(!im)return;const d=document.createElement("div");d.className="lightbox";d.innerHTML=`<img src="${im.currentSrc||im.src}" alt="${escH(im.alt||"")}"><b>Tutup ✕</b>`;const tt=()=>{d.remove();removeEventListener("keydown",ek)},ek=ev=>{if(ev.key==="Escape")tt()};d.onclick=tt;addEventListener("keydown",ek);document.body.appendChild(d)});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-gempa]");if(!b)return;GEMPA_PILIH=+b.dataset.gempa;isiGempa();const k=document.querySelector("#gempaBox .gp-kartu");if(k&&innerWidth<800)k.scrollIntoView({behavior:"smooth",block:"start"})});
setInterval(()=>{if(cur==="beranda"&&!document.hidden)muatGempa(1)},120000);

function stCard(tag,name,txt){return `<div class="card station"><span class="tag">${tag}</span><b style="font-size:18px">${name}</b><span style="color:var(--muted);font-size:14px">${txt}</span></div>`}
/* sampul dokumen: gambar dari dokumen (peta, sampul, foto) ditampilkan berbingkai di atas latar buram gambar itu sendiri;
   bila dokumen tidak punya gambar, dipakai ilustrasi animasi */
function sampulDok(cls,g,seni,ekstra){if(!g)return `<div class="${cls}" aria-hidden="true">${SENI[seni]||SENI.hujan}${ekstra||""}</div>`;const u=escH(g);
 return `<div class="${cls} ada" data-seni="${seni}" aria-hidden="true"><img class="pubbg" src="${u}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="gagalSampul(this)"><span class="pubfig"><img src="${u}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="gagalSampul(this)"></span>${ekstra||""}</div>`}
function gagalSampul(im){const w=im.closest(".ada");if(!w)return;w.classList.remove("ada");w.querySelectorAll(".pubbg,.pubfig").forEach(x=>x.remove());w.insertAdjacentHTML("afterbegin",SENI[w.dataset.seni]||SENI.hujan)}
function pubs(){return [...pubAdmin(),...PUBLIKASI].map(p=>{
 const aksi=p.file?`<a class="pbtn" href="${p.file}" target="_blank" rel="noopener" download>Unduh ${/\.pptx?$/i.test(p.nama_file||p.file)?"PowerPoint":/\.docx?$/i.test(p.nama_file||p.file)?"dokumen":"PDF"}${p.ukuran?" · "+p.ukuran:""}</a>`:p.url?`<a class="pbtn" href="${p.url}" target="_blank" rel="noopener">Buka dokumen ↗</a>`:`<span class="pbtn off">Segera tersedia</span>`;
 const tag=/fgd|paparan/i.test(p.judul)?"FGD":/press|rilis/i.test(p.judul)?"Press Release":/buletin/i.test(p.kategori+" "+p.judul)?"Buletin":"Dokumen";
 return `<div class="card pubc">${sampulDok("pubimg t-"+tag.split(" ")[0].toLowerCase(),p.gambar,/kemarau|kekeringan|peringatan/i.test(p.kategori+" "+p.judul)?"panas":"hujan",`<span class="pubtag">${tag}</span>`)}<span class="pill">${p.kategori}</span><h3>${p.judul}</h3><small>${p.tanggal||""}</small><p>${p.ringkas||""}</p>${aksi}</div>`})}


P["prakiraan-musim"]=()=>head("Iklim >> Prakiraan Musim","Prediksi Musim Hujan 2026/2027","Hasil analisis kami untuk Provinsi Papua Barat dan Papua Barat Daya: kapan musim hujan dimulai, seberapa banyak hujannya dibanding biasa, dan kapan puncaknya.")+`
<h2 class="sec-title">Ringkasan</h2>${ringkasPMH()}
${petaTab("pmh",[
 {lab:"Awal musim",g:[["pmh-awal-pb","Prediksi awal musim hujan 2026/2027, Provinsi Papua Barat"]],ket:"Warna menunjukkan dasarian awal musim hujan tiap ZOM. Wilayah berarsir adalah Tipe 1 Musim (Non-ZOM)."},
 {lab:"Dibanding normal",g:[["pmh-banding-pb","Perbandingan awal musim hujan terhadap normal, Papua Barat"],["pmh-banding-pbd","Perbandingan awal musim hujan terhadap normal, Papua Barat Daya"]],ket:"Hijau berarti datang lebih cepat (maju), kuning sama, cokelat lebih lambat (mundur) dibanding rata-rata 1991–2020."},
 {lab:"Sifat",g:[["pmh-sifat-pb","Prediksi sifat musim hujan 2026/2027, Papua Barat"],["pmh-sifat-pbd","Prediksi sifat musim hujan 2026/2027, Papua Barat Daya"]],ket:"Hijau Atas Normal (lebih basah), kuning Normal, cokelat Bawah Normal (lebih kering)."},
 {lab:"Puncak",g:[["pmh-puncak-pb","Prediksi puncak musim hujan 2026/2027, Papua Barat"],["pmh-puncak-pbd","Prediksi puncak musim hujan 2026/2027, Papua Barat Daya"]],ket:"Warna menunjukkan bulan puncak musim hujan tiap ZOM."}])}
<div class="panel"><div class="panel-head"><span>Awal Musim Hujan Paling Dekat: Oktober 2026 (6 ZOM)</span></div><div class="panel-body">
${tbl(["ZOM","Wilayah"],ZOM11.filter(z=>z.okt).map(z=>[`<b>${z.no}</b>`,z.wil]))}</div></div>
<div class="panel"><div class="panel-head"><span>Perbandingan Awal Musim Hujan terhadap Normal</span></div><div class="panel-body">
<div class="grid3 bd">${["Maju","Sama","Mundur"].map(b=>{const z=ZOM11.filter(x=>x.banding===b);return `<div class="card"><span class="pill ${PILL_B[b]}">${b} · ${z.length} ZOM</span><p style="margin:10px 0 0;font-size:14px">${b==="Maju"?"Hujan datang lebih cepat dari biasanya.":b==="Sama"?"Hujan datang seperti biasanya.":"Hujan datang lebih lambat dari biasanya."}</p><p style="margin:8px 0 0;font-weight:700">ZOM ${z.map(x=>x.no).join(", ")}</p></div>`}).join("")}</div></div></div>
<div class="panel"><div class="panel-head"><span>Sifat Musim Hujan 2026/2027 (21 ZOM)</span></div><div class="panel-body">
<div class="grid3 bd">${["Atas Normal","Normal","Bawah Normal"].map(k=>{const z=[...ZOM11.filter(x=>x.sifat===k).map(x=>x.no),...NONZOM.filter(n=>SIFAT_NONZOM[n]===k)].sort();return `<div class="card"><span class="pill ${PILL_S[k]}">${k} · ${z.length} ZOM</span><p style="margin:10px 0 0;font-size:14px">${k==="Atas Normal"?"Hujan selama musim hujan lebih banyak dari biasanya (lebih dari 115%).":k==="Normal"?"Hujan selama musim hujan seperti biasanya (85–115%).":"Hujan selama musim hujan lebih sedikit dari biasanya (kurang dari 85%)."}</p><p style="margin:8px 0 0;font-weight:700">ZOM ${z.join(", ")}</p></div>`}).join("")}</div></div></div>
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
 "<b>Awal musim hujan</b> adalah saat hujan mulai turun rutin: dalam 10 hari hujan mencapai 50 mm atau lebih, dan berlanjut di 10 hari-10 hari berikutnya.",
 "<b>Maju</b> berarti musim hujan datang lebih cepat dari biasanya, <b>Mundur</b> lebih lambat, <b>Sama</b> seperti biasanya. Pembandingnya adalah rata-rata 1991–2020.",
 "<b>Atas Normal</b> berarti hujan lebih banyak dari rata-rata 1991–2020 (lebih dari 115%), <b>Normal</b> 85–115% dari rata-rata, <b>Bawah Normal</b> kurang dari 85% dari rata-rata.",
 "<b>Puncak musim hujan</b> adalah bulan dengan hujan paling banyak, saat risiko banjir dan longsor paling tinggi."])}
${SRC_PMH}`;

P["hujan-bulanan"]=()=>head("Iklim >> Hujan Bulanan","Analisis &amp; Prakiraan Hujan Bulanan","Analisis curah hujan dan sifat hujan September 2026 serta prakiraan November–Desember 2026 untuk Papua Barat dan Papua Barat Daya.")+`
<div class="panel"><div class="panel-head"><span>Analisis September 2026</span><div class="tabs" id="tabsA"><button class="on" data-t="pb">Papua Barat</button><button data-t="pbd">Papua Barat Daya</button></div></div>
<div class="panel-body" id="bodyA"></div></div>
<div class="panel"><div class="panel-head"><span>Prakiraan Curah Hujan &amp; Sifat Hujan</span><div class="tabs" id="tabsF"><button class="on" data-t="nov">November 2026</button><button data-t="des">Desember 2026</button></div></div>
<div class="panel-body" id="bodyF"></div></div>
<div class="panel"><div class="panel-head"><span>Curah Hujan Ekstrem Harian · September 2026</span></div><div class="panel-body">
<p style="margin-top:0">Dari pemantauan 30 pos hujan, tercatat 4 kejadian hujan lebat (≥ 50 mm/hari). Hujan sangat lebat (≥ 100 mm/hari) tidak tercatat di kedua provinsi.</p>${tbl(["Pos Hujan","Kategori"],[["Prafi","Lebat"],["Tisai SP 5","Lebat"],["Klamalu","Lebat"],["Masni VII","Lebat"]])}
<div class="legend"><span><i style="background:#c8a15a"></i>Rendah 0–100 mm</span><span><i style="background:#7fbf6a"></i>Menengah 101–300 mm</span><span><i style="background:#2f8fd1"></i>Tinggi 301–500 mm</span><span><i style="background:#1f3f7a"></i>Sangat Tinggi &gt; 500 mm</span></div>
${SRC}</div></div>
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
${SRC}</div></div>
${awam("Cara membaca hari tanpa hujan",[
 "<b>Hari tanpa hujan</b> adalah jumlah hari berturut-turut tanpa hujan berarti (kurang dari 1 mm) di satu pos pengamatan.",
 "<b>Dasarian</b> adalah periode 10 harian: Dasarian I tanggal 1–10, Dasarian II tanggal 11–20, Dasarian III tanggal 21 sampai akhir bulan.",
 "Angka di tabel menunjukkan <b>berapa pos hujan</b> yang masuk tiap kategori. Makin banyak pos di kategori Panjang ke bawah, makin luas wilayah yang kering.",
 "Kategori menurut lamanya tidak hujan: <b>Sangat Pendek</b> 1–5 hari, <b>Pendek</b> 6–10 hari, <b>Menengah</b> 11–20 hari, <b>Panjang</b> 21–30 hari, <b>Sangat Panjang</b> 31–60 hari, dan <b>Kekeringan Ekstrem</b> lebih dari 60 hari.",
 "Kategori <b>Panjang</b> (21–30 hari) ke atas perlu diwaspadai: tanaman mulai kekurangan air, sumur dan sumber air bisa menyusut, dan risiko kebakaran lahan meningkat."])}`;

P["peringatan-kekeringan"]=()=>head("Iklim >> Kekeringan","Kekeringan Meteorologis &amp; SPI","Indeks Presipitasi Terstandarisasi (SPI) membandingkan curah hujan dengan kondisi klimatologisnya untuk menilai tingkat kekeringan.")+`
<div class="panel"><div class="panel-head"><span>Peringatan Dini Kekeringan Meteorologis · Dasarian I November 2026</span></div><div class="panel-body">${kotakPer("kekeringan")||`<div class="okbox"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" style="flex-shrink:0"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg><div><b>Tidak ada kabupaten/kota di Papua Barat dan Papua Barat Daya yang berstatus Waspada, Siaga, maupun Awas.</b><span style="color:var(--muted);font-size:14px">Periode 1–10 November 2026.</span></div></div>`}${warnTable("kekeringan")}<div style="margin-top:16px">${bmkgImg("pdkm","Peta peringatan dini kekeringan meteorologis Indonesia","Peta peringatan dini kekeringan meteorologis seluruh Indonesia.")}</div></div></div>
<div class="panel"><div class="panel-head"><span>SPI September 2026 per Kabupaten/Kota</span></div><div class="panel-body">${kgrid("Papua Barat",D.spiPB)}${kgrid("Papua Barat Daya",D.spiPBD)}${legend(["Normal – Agak Kering","Agak Kering","Kering – Sangat Kering"])}</div></div>
<div class="card prose"><h3 style="margin-top:0">Kesimpulan</h3>
${TH("kekeringan_kesimpulan","")?`<p>${esc(TH("kekeringan_kesimpulan",""))}</p>`:`<p>Kondisi kekeringan meteorologis mendominasi kedua provinsi pada September 2026. Defisit curah hujan ini perlu diwaspadai bila berlanjut, apalagi El Niño sangat kuat diprediksi bertahan hingga awal 2027.</p>`}
<h3>Tingkat Peringatan Dini Kekeringan BMKG</h3><ul>
<li><span class="pill warn">Waspada</span> Sudah 31 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit (kurang dari 20 mm dalam 10 hari ke depan) minimal 70%.</li>
<li><span class="pill bad">Siaga</span> Sudah 61 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit minimal 70%.</li>
<li><span class="pill bad">Awas</span> Sudah 61 hari atau lebih tidak hujan, dan kemungkinan hujan sangat sedikit minimal 90%.</li></ul>${SRC}</div>
${awam("Cara membaca SPI",[
 "<b>SPI</b> membandingkan hujan yang turun dengan hujan yang biasa turun di tempat yang sama, berdasarkan catatan puluhan tahun.",
 "<b>Normal</b> berarti hujan sesuai kebiasaan. <b>Agak Kering</b>, <b>Kering</b>, dan <b>Sangat Kering</b> berarti hujan makin jauh di bawah kebiasaan. Sebaliknya <b>Agak Basah</b> hingga <b>Sangat Basah</b> berarti hujan lebih banyak dari biasanya.",
 "Pada peta SPI, warna merah dan oranye berarti kering, hijau normal, biru basah. <b>SPI 1 bulan</b> melihat hujan sebulan terakhir, <b>SPI 3 bulan</b> melihat tiga bulan terakhir (menggambarkan kekeringan yang lebih lama).",
 "Wilayah <b>Kering</b> hingga <b>Sangat Kering</b> perlu menghemat air, menunda tanam tanaman yang butuh banyak air, dan mewaspadai kebakaran hutan dan lahan."])}`;

P["peringatan-hujan-tinggi"]=()=>head("Iklim >> Peringatan Hujan Tinggi","Peringatan Dini Curah Hujan Tinggi","Peringatan berbasis prakiraan curah hujan dasarian untuk antisipasi banjir dan longsor, sampai tingkat kecamatan.")+`
<div class="panel"><div class="panel-head"><span>Status Dasarian I November 2026 (1–10 November)</span></div><div class="panel-body">
${kotakPer("hujan")||`<div class="okbox"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" style="flex-shrink:0"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg><div><b>Tidak ada kabupaten/kota maupun kecamatan di Papua Barat dan Papua Barat Daya yang berstatus Waspada, Siaga, maupun Awas.</b><span style="color:var(--muted);font-size:14px">${esc(TH("hujan_tinggi_nihil"))}</span></div></div>`}
${warnTable("hujan")}<div style="margin-top:16px">${bmkgImg("pdcht","Peta peringatan dini curah hujan tinggi Indonesia","Peta peringatan dini curah hujan tinggi seluruh Indonesia.")}</div></div></div>
${awam("Cara membaca status peringatan",[
 "<b>Waspada</b>: hujan dalam 10 hari ke depan diperkirakan lebih dari 150 mm. Mulai bersihkan saluran air dan pantau informasi.",
 "<b>Siaga</b>: diperkirakan lebih dari 200 mm. Siapkan rencana evakuasi bila tinggal di dekat sungai atau lereng.",
 "<b>Awas</b>: diperkirakan lebih dari 300 mm. Risiko banjir dan longsor tinggi, ikuti arahan BPBD setempat.",
 "Tanda <b>–</b> pada tabel berarti tidak ada wilayah dengan status tersebut."])}
${(()=>{const c=TH("hujan_tinggi_catatan","").split(/\n+/).filter(Boolean),ek=bagIK("ekstrem");const j=c.length?c[0]:"Catatan "+(ek.bulan||""),t=c.length?c.slice(1).join(" "):ek.teks||"";return t?`<div class="card prose" style="margin-top:22px"><h3 style="margin-top:0">${esc(j)}</h3><p>${esc(t)}</p>${c.length?"":srcIK("ekstrem")}</div>`:""})()}`;

P["enso-iod"]=()=>head("Iklim >> El Niño, La Niña &amp; IOD","El Niño, La Niña &amp; Indian Ocean Dipole","Fenomena iklim global yang memengaruhi curah hujan Papua Barat dan Papua Barat Daya.")+`
<div class="panel"><div class="panel-head"><span>Indeks ENSO dan IOD Terkini</span></div><div class="panel-body">${kesimpulanEnso()}${idxChart()}</div></div>${trenDinat()}
${kartuEnsoIod()}
<div class="grid3">
<div class="card"><b>El Niño</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">Suhu muka laut Pasifik tengah lebih hangat (indeks ≥ +0,5). Umumnya mengurangi curah hujan dan memperpanjang deret hari kering.</p></div>
<div class="card"><b>La Niña</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">Suhu muka laut Pasifik tengah lebih dingin (indeks ≤ −0,5). Umumnya menambah curah hujan dan risiko banjir serta longsor.</p></div>
<div class="card"><b>IOD</b><p style="color:var(--muted);font-size:14px;margin:6px 0 0">Beda suhu muka laut Samudra Hindia barat dan timur. IOD positif cenderung mengurangi hujan di Indonesia bagian barat.</p></div>
</div>${SRC}
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
<div class="istat">${barisTH("iklim_angka").map(([v,k,d])=>`<div><b>${esc(v)}</b><span>${esc(k||"")}</span><small>${esc(d||"")}</small></div>`).join("")}</div>

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
<ol class="tline">${(barisTH("iklim_catatan","").length?barisTH("iklim_catatan","").map(x=>[esc(x[0]),esc(x[1]||""),esc(x[2]||""),/^(https:\/\/|#)/.test(x[3]||"")?escH(x[3]):"#iklim-papua-barat"]):CATATAN_BAWAAN).map(([t,j,d,u])=>`<li><time>${t}</time><b>${j}</b><p>${d} <a href="${u}"${u.startsWith("http")?' target="_blank" rel="noopener"':""}>${u.startsWith("http")?"Sumber ↗":"Lihat →"}</a></p></li>`).join("")}</ol></section>

<section class="sec"><div class="sechead"><div><span class="eyebrow">Pengamatan</span><h2>Sumber Data Iklim</h2></div></div>
<div class="grid2"><div class="card prose"><h3 style="margin-top:0">Stasiun Pengamatan Suhu</h3><ul>
<li>Stasiun Meteorologi Domine Eduard Osok, Sorong</li><li>Stasiun Meteorologi Rendani, Manokwari</li><li>Stasiun Meteorologi Utarom, Kaimana</li><li>Stasiun Meteorologi Siboru, Fakfak</li></ul></div>
<div class="card prose"><h3 style="margin-top:0">Jaringan Kami</h3><p>Pos hujan kerja sama di seluruh kabupaten, ditambah ${ALAT.filter(a=>a.jenis==="AWS").length} AWS dan ${ALAT.filter(a=>a.jenis==="ARG").length} ARG yang mengirim data langsung dari lapangan.</p><p><a href="#peralatan">Lihat data alat terkini →</a></p></div></div></section>
${awam("Cara membaca grafik pola hujan",[
 "Pilih nama pola di atas grafik. Cari pola wilayah Anda di tabel ZOM per kabupaten atau di peta <a href=\"#zona-musim\">Zona Musim</a>.",
 "Tinggi batang adalah rata-rata curah hujan bulan itu selama 1991–2020. Angka di atas batang dalam milimeter.",
 "Garis merah putus-putus adalah 150 mm. Bulan di bawah garis (batang abu-abu) biasanya termasuk musim kemarau.",
 "Rata-rata bukan ramalan. Pada tahun El Niño seperti 2026, hujan bisa jauh di bawah angka ini."])}
${SRC}`;

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
${(()=>{const t=zomTerbaru(),nz=new Set(NONZOM);const z=t.zom.filter(x=>!nz.has(+x.no));return tbl(["ZOM","Wilayah (kabupaten dan distrik)","Awal "+esc(t.judul),"Dibanding normal","Sifat"],z.map(x=>[`<b>${esc(x.no)}</b>`,esc(x.wil),esc(x.awal)||"–",x.banding?`<span class="pill ${pillBanding(x.banding)}">${esc(x.banding)}</span>`:"–",x.sifat?`<span class="pill ${pillSifat(x.sifat)}">${esc(x.sifat)}</span>`:"–"]))})()}
<p class="note">Rincian awal, sifat, dan puncak musim ada di halaman <a href="#prakiraan-musim">Prakiraan Musim Hujan</a>. Cari wilayah Anda lebih cepat lewat <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>
<div class="panel"><div class="panel-head"><span>10 Daerah Non Zona Musim (Tipe 1 Musim)</span></div><div class="panel-body">
<p style="margin-top:0">Wilayah ini tidak memiliki perbedaan jelas antara musim hujan dan kemarau, sehingga awal musim tidak ditentukan. Sifat hujannya tetap diprediksi.</p>
${(()=>{const t=zomTerbaru(),sf=n=>{const z=t.zom.find(x=>+x.no===n);return (z&&z.sifat)||SIFAT_NONZOM[n]||"–"};return tbl(["ZOM","Sifat "+esc(t.judul)],NONZOM.map(n=>[`<b>${n}</b>`,`<span class="pill ${pillSifat(sf(n))}">${esc(sf(n))}</span>`]))})()}
${TH("zom_catatan")?`<p class="note">${esc(TH("zom_catatan"))}</p>`:""}</div></div>
${awam("Cara membaca zona musim",[
 "Cari distrik tempat Anda tinggal di tabel, lalu lihat nomor ZOM-nya. Nomor itu dipakai di semua peta prediksi musim.",
 "Satu distrik bisa masuk lebih dari satu ZOM karena batas ZOM mengikuti pola hujan, bukan batas administrasi.",
 "<b>Tipe 1 Musim</b> berarti hujan turun hampir sepanjang tahun tanpa musim kemarau yang jelas."])}
${SRC_PMH}`;

P["layanan-data"]=()=>head("Layanan Data","Layanan Data &amp; Informasi Iklim","Kami melayani permintaan data dan informasi iklim sesuai produk Buletin Iklim kami.")+kalenderLayanan()+`<section class="sec"><div class="sechead"><div><span class="eyebrow">Permintaan Data</span><h2>Data &amp; Cara Mengajukan</h2></div></div>
<div class="grid2"><div class="card prose"><h3 style="margin-top:0">Data dan Informasi yang Kami Sediakan</h3><ul>
<li>Analisis curah hujan dan sifat hujan bulanan</li><li>Curah hujan ekstrem harian dari jaringan pos hujan</li><li>Suhu udara ekstrem bulanan</li><li>Monitoring hari tanpa hujan per dasarian</li><li>Indeks kekeringan (SPI)</li><li>Analisis dinamika atmosfer dan laut: ENSO, IOD, angin lapisan 850 mb</li><li>Prakiraan curah hujan dan sifat hujan tiga bulan ke depan</li><li>Prakiraan musim hujan dan musim kemarau</li></ul>
<h3>Tarif</h3><p>Data dikenakan tarif PNBP sesuai peraturan yang berlaku. Tarif nol rupiah berlaku untuk keperluan tertentu, misalnya penanggulangan bencana dan pendidikan, dengan surat pengantar.</p></div>
<div class="card prose"><h3 style="margin-top:0">Alur Permintaan</h3><ol>
<li>Kirim surat permohonan ke staklim.papuabarat@bmkg.go.id, ajukan lewat PTSP BMKG, atau datang ke kantor kami di Arfai.</li><li>Sertakan jenis data, lokasi, periode, dan keperluan.</li><li>Petugas kami memeriksa ketersediaan data.</li><li>Bayar PNBP bila dikenakan tarif.</li><li>Data dikirim dalam format digital.</li></ol>
<p><a href="https://ptsp.bmkg.go.id" target="_blank" rel="noopener">Buka PTSP BMKG →</a></p></div></div></section>
<section class="sec" id="kontak-kami"><div class="sechead"><div><span class="eyebrow">Kontak</span><h2>Hubungi Kami</h2></div></div><div class="kontakgrid">${kartuKontak()}${petaKantor()}</div></section>`;


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
const nvMentah=(n,k)=>{const x0=n[k];return typeof x0==="number"?x0:(VARS[k]&&typeof n[VARS[k].alt]==="number"?n[VARS[k].alt]:undefined)};
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
 if(r&&a.jenis==="AWS")body=windDial(id,nv(n,"ws"),nv(n,"wd"),contoh)+`<div class="mets">${["ws","ws_maks","suhu","rh","suhu_maks","suhu_min","tekanan","hujan","radiasi","baterai"].map(k=>tile(id,k,n,contoh)).join("")}</div>`;
 else if(r)body=`<div class="mets">${["hujan","baterai"].map(k=>tile(id,k,n,contoh)).join("")}</div>`;
 return `<article class="alat${contoh?" contoh":""}"><div class="ah"><div><b>${contoh?"Contoh tampilan AWS":`<a class="alink" href="#alat-${a.id}">${a.nama}</a>`}</b><span>${contoh?"Data Node-RED 2 Nov 2026, 14.12 WIT":`${a.jenis} · ${a.logger} · ID ${a.id}${a.wil?" · "+a.wil:""}`}</span></div><span class="pill ${contoh?"":st[1]}">${contoh?"Contoh":st[0]}</span></div>${conn}${body||`<p class="empty">Belum ada data masuk dari alat ini. Data tampil begitu alat mengirim.</p>`}${!contoh?`<div class="af">${r?"Pembaruan "+waktuWIT(r):"Menunggu data pertama"}<a class="detail" href="#alat-${a.id}">Lihat detail lengkap →</a></div>`:""}</article>`}


/* ---- Halaman detail satu alat ---- */
const GRAFIK_AWS=["suhu","rh","tekanan","ws","hujan","radiasi","baterai","wd"],GRAFIK_ARG=["hujan","baterai"];
/* panel data terkini di halaman detail alat */
const ANGIN_KET=v=>typeof v!=="number"?"":v<0.5?"Tenang":v<3.4?"Angin lemah":v<8?"Angin sedang":v<10.8?"Angin cukup kencang":v<17.2?"Angin kencang":"Angin sangat kencang";
const HUJAN_HARI=v=>typeof v!=="number"?"":v<0.5?"Belum hujan":v<20?"Hujan ringan":v<50?"Hujan sedang":v<100?"Hujan lebat":v<150?"Hujan sangat lebat":"Hujan ekstrem";
function panelAlat(id,n,aws){const ik=k=>`<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO[VARS[k].ic]}</svg></i>`;
 const dk=(k,isi,cls)=>{const m=VARS[k];return `<button type="button" class="dk${cls?" "+cls:""}" data-alat="${id}" data-k="${k}" style="--c:${m.c}" aria-label="Lihat grafik ${m.lab} 24 jam"><span class="dkh">${ik(k)}${m.lab}</span>${sensorCek(n,k)?`<b class="cek">${CEK_TEKS}</b>`:`<b>${fmt(nv(n,k),m.d)}<small> ${m.u}</small></b>${isi||""}`}<em class="dkgo" aria-hidden="true">Grafik 24 jam →</em></button>`};
 const hj=nv(n,"hujan"),kHujan=`<span class="dkket">${HUJAN_HARI(hj)||"–"} · sejak 09.00 WIT</span>`;
 if(!aws)return `<div class="dpanel arg"><div class="dkgrid satu">${dk("hujan",kHujan,"lebar")}</div></div>`;
 const s0=nv(n,"suhu"),mn=nv(n,"suhu_min"),mx=nv(n,"suhu_maks"),pos=[s0,mn,mx].every(v=>typeof v==="number")&&mx>mn?Math.max(0,Math.min(100,(s0-mn)/(mx-mn)*100)):null;
 const rh=nv(n,"rh"),ra=nv(n,"radiasi"),ws=nv(n,"ws");
 const suhu=dk("suhu",`<div class="dkrng"><span>Min ${fmt(mn,1)}°</span><div class="dkbar suhu">${pos!=null?`<i style="left:${pos}%"></i>`:""}</div><span>Maks ${fmt(mx,1)}°</span></div>`,"lebar");
 const lembap=dk("rh",`<div class="dkbar"><u style="width:${typeof rh==="number"?Math.min(100,rh):0}%"></u></div><span class="dkket">${typeof rh!=="number"?"–":rh>=90?"Sangat lembap":rh>=70?"Lembap":rh>=50?"Sedang":"Kering"}</span>`);
 const tekanan=dk("tekanan",`<span class="dkket">Tekanan udara di lokasi alat</span>`);
 const hujan=dk("hujan",kHujan);
 const rad=dk("radiasi",`<div class="dkbar"><u style="width:${typeof ra==="number"?Math.min(100,ra/12):0}%"></u></div><span class="dkket">${typeof ra!=="number"?"–":ra<5?"Malam atau gelap":ra<200?"Berawan atau redup":ra<600?"Cerah berawan":"Terik"}</span>`);
 return `<div class="dpanel"><div class="dwind2">${windDial(id,ws,nv(n,"wd"),false)}<div class="dws2"><span>Kecepatan angin</span>${sensorCek(n,"ws")?`<b class="cek">${CEK_TEKS}</b>`:`<b>${fmt(ws,1)}<small> m/s</small></b>`}<em>${ANGIN_KET(ws)}${typeof nv(n,"ws_maks")==="number"?" · hembusan maks "+fmt(nv(n,"ws_maks"),1)+" m/s":""}</em></div></div>
 <div class="dkgrid">${suhu}${lembap}${tekanan}${hujan}${rad}</div></div>`}
function detailAlat(id){const a=ALAT.find(x=>x.id===id);if(!a)return P.peralatan();
 const r=LAST[id],n=(r&&r.nilai)||{},st=statusOf(r),aws=a.jenis==="AWS";
 const besar=panelAlat(id,n,aws);
 const grafik=(aws?GRAFIK_AWS:GRAFIK_ARG).map(k=>{const m=VARS[k];return `<section class="gcard"><div class="ghead"><div><b>${m.lab}</b><span>${m.bar?"Curah hujan per jam":k==="wd"?"Arah datangnya angin":"Ringkasan tiap 10 menit"}</span></div><b class="gnow${sensorCek(n,k)?" cek":""}">${k==="wd"?(typeof nv(n,"wd")==="number"?"dari "+arahMata(nv(n,"wd")):"–"):sensorCek(n,k)?CEK_TEKS:fmt(nv(n,k),m.d)+" "+m.u}</b></div><div class="gbody" data-graf="${k}"><p class="empty" style="padding:30px 0;text-align:center">${r?"Memuat riwayat…":"Menunggu data pertama dari alat ini."}</p></div><div class="gstats" data-stat="${k}"></div></section>`}).join("");
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
  (a.jenis==="AWS"?GRAFIK_AWS:GRAFIK_ARG).forEach(k=>{const el=document.querySelector(`[data-graf="${k}"]`);if(!el)return;const d=drawHist(el,(j.riwayat&&j.riwayat[k])||[],VARS[k]);const sEl=document.querySelector(`[data-stat="${k}"]`);if(sEl)sEl.innerHTML=histStats(d,VARS[k])})})
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
 "<b>Lingkaran arah angin</b>: segitiga di lingkaran menunjukkan arah datangnya angin. Tulisan <i>dari T (80°)</i> berarti angin datang dari arah timur.",
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
 [...BERITA_KAMI.map(b=>({...b,kami:1})),...beritaDinamis(),...BERITA_MEDIA,...(BERITA_OTO||[])].forEach(b=>{if(!b||!b.judul)return;const k=kunciJ(b.judul);if(lihat.has(k)||sembunyi.has(b.url)||sembunyi.has(b.judul))return;lihat.add(k);out.push(b)});
 /* berita tentang kita (rilis kami & liputan media) yang berumur <= 14 hari tampil lebih dulu dari rilisan BMKG pusat */
 const prio=b=>!b.pusat&&umurHari(b.tanggal)<=14?0:1;
 return out.sort((a,b)=>prio(a)-prio(b)||(b.tanggal||"").localeCompare(a.tanggal||""))}
const IKON_BERITA='<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>';
const seniDari=t=>/kering|kemarau|panas|suhu|el ?ni[ñn]o|titik panas|karhutla/i.test(t||"")?"panas":/aws|arg|alat|data|otomatis|peralatan|logger/i.test(t||"")?"alat":"hujan";
function sampul(b){const isi=b.gambar?`<img src="${b.gambar}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:"";
 return `<div class="nimg"${!b.gambar&&!b.kami&&b.url?` data-og="${b.url}"`:""}><span class="nart" aria-hidden="true">${SENI[seniDari(String(b.judul).replace(/<[^>]+>/g,""))]}</span>${isi}</div>`}
function newsList(limit){const semua=semuaBerita();let all=semua.slice(0,limit||99);
 if(limit){ /* beranda: satu berita per topik, urut terbaru; berita kita <=14 hari didahulukan; minimal 1 berita kita */
  const unik=[];semua.forEach(b=>{if(!unik.some(u=>miripJudul(u.judul,b.judul)>=.5))unik.push(b)});
  all=unik.slice(0,limit);
  if(!all.some(b=>!b.pusat)){const kita=unik.find(b=>!b.pusat);if(kita)all=[...all.slice(0,limit-1),kita]}}
 return `<div class="news" data-news="${limit||0}">${all.map(b=>b.kami
  ?`<a class="nitem" href="#berita-${b.id}">${sampul(b)}<div class="nbody"><span class="pill ok">Rilis Kami</span><b>${b.judul}</b><span>${b.ringkas||""}</span><small>${tglID(b.tanggal)} · Baca selengkapnya →</small></div></a>`
  :`<a class="nitem" href="${b.url}" target="_blank" rel="noopener">${sampul(b)}<div class="nbody"><span class="pill${b.pusat?" pusat":""}">${b.media||"Media"}</span><b>${b.judul}</b>${b.ringkas&&b.otomatis?`<span>${b.ringkas}</span>`:""}<small>${tglID(b.tanggal)} · Buka di ${b.media||"situs berita"} ↗</small></div></a>`).join("")}</div>`}
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

P.publikasi=()=>head("Publikasi","Publikasi","Buletin Iklim bulanan (ISSN 2622-9798), buku prakiraan musim, dan informasi iklim Papua Barat serta Papua Barat Daya yang dapat diunduh masyarakat.")+`<div class="grid3">${pubs().join("")}</div>${pubPusat()}`;

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
 el.innerHTML=`<b>Stasiun Klimatologi Papua Barat</b>Unit Pelaksana Teknis BMKG yang melayani informasi klimatologi untuk Provinsi Papua Barat dan Papua Barat Daya.<br><small class="aka">Dikenal juga sebagai Staklim Papua Barat, Staklim Pabar, Stasiun Klimatologi Kelas III Papua Barat, atau BMKG Klimatologi Manokwari.</small><br>${escH(I.alamat)}<br><a href="${waURL()}" target="_blank" rel="noopener">WhatsApp ${escH(waTeks(I.wa))}</a><br>${escH(I.email)}<br><a href="${igURL()}" target="_blank" rel="noopener">Instagram @${escH(I.ig)}</a>${I.linktree?`<br><a href="${escH(I.linktree)}" target="_blank" rel="noopener">Linktree</a>`:""}<br><a href="#admin" class="admlink">Admin</a>`}
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
  ...[...BERITA_MEDIA,...(BERITA_OTO||[])].map(b=>({tanggal:b.tanggal,label:"Liputan "+(b.media||"Media"),judul:b.judul,teks:potong(b.ringkas||"",200),tombol:"Baca di "+(b.media||"media"),link:b.url,luar:1,gambar:b.gambar||""}))]
  .sort((a,b)=>(b.tanggal||"").localeCompare(a.tanggal||""));
 /* 2) publikasi kami: buletin, prediksi musim (press release, FGD), informasi iklim */
 const pubKita=[...adm.filter(x=>x.jenis!=="Berita Kegiatan"&&x.jenis!=="Peringatan Dini").map(x=>({tanggal:x._urut||x.tanggal,tampil:x.tanggal,label:x.jenis,judul:escH(x.judul),teks:escH(potong(x.ringkas,200)),tombol:x.file?"Unduh dokumen":"Lihat publikasi",link:x.file?fileURL(x.file):(x.link||"#publikasi"),luar:!!(x.file||x.link),gambar:fileURL(x.gambar),figur:1,keterangan:x.judul,seni:SENI_JENIS[x.jenis]||"hujan"})),
  ...PUBLIKASI.filter(x=>x.file||x.url).map(x=>({tanggal:x.tanggal,label:x.kategori,judul:x.judul,teks:potong(x.ringkas,200),tombol:"Unduh dokumen",link:x.file||x.url,luar:1,gambar:x.gambar||"",figur:1,keterangan:x.judul,seni:/kemarau/i.test(x.judul)?"panas":"hujan"}))];
 const pilih=(arr,maks)=>{const baru=arr.filter(x=>umurHari(x.tanggal)<=14).slice(0,maks);return baru.length?baru:arr.slice(0,1)};
 const tanda=x=>{const tg=x.tampil||x.tanggal;return {...x,label:x.label+(/^\d{4}-\d{2}-\d{2}$/.test(tg||"")?" · "+tglPendek(tg):tg?" · "+tg:""),seni:x.seni||"hujan"}};
 {const u=[];beritaKita.forEach(b=>{if(!u.some(x=>miripJudul(x.judul,b.judul)>=.5))u.push(b)});pilih(u,3).forEach(x=>out.push(tanda(x)))}
 pilih(pubKita,2).forEach(x=>out.push(tanda(x)));
 /* 3) rilisan besar BMKG pusat, setelah konten kita */
 ((KA&&KA.bmkg&&KA.bmkg.besar)||[]).slice(0,3).forEach(b=>out.push({label:"BMKG Pusat · "+tglPendek(b.tanggal),judul:escH(b.judul),teks:escH(potong(b.ringkas,200)),tombol:"Baca rilis BMKG",link:b.url,luar:1,gambar:b.gambar,figur:1,seni:"hujan",sumber:"Sumber: BMKG"}));
 (typeof BANNER!=="undefined"?BANNER:[]).forEach(b=>{const e=EN();const x=b.gambar?{...b,figur:1}:b;
  out.push(b.link==="#enso-iod"&&e.src?{...x,judul:e.status.replace(" · "," ")+": indeks ENSO "+fmtV(e.enso),teks:"Indeks ENSO "+e.ensoNama+" mencapai "+fmtV(e.enso)+" (BMKG Pusat, "+tglPendek(e.src.tanggal)+"). Pantau dampaknya terhadap hujan dan kekeringan di wilayah kami.",
   ...(e.src.gambar?{gambar:e.src.gambar,figur:1,keterangan:"Anomali suhu muka laut · "+(e.src.judul.replace(/^Analisis Dinamika Atmosfer\s*/i,"")),sumber:"Gambar: BMKG Pusat"}:{})}:x)});
 const lihat=new Set();return out.filter(x=>{const k=kunciJ(String(x.judul).replace(/<[^>]+>/g,""));if(lihat.has(k))return false;lihat.add(k);return true}).slice(0,8)}
/* ===== PERINGATAN DINI: beberapa wilayah sekaligus, tiap wilayah boleh berbeda status ===== */
const LV_URUT={waspada:1,siaga:2,awas:3};
const NAMA_JENIS={hujan:"Curah Hujan Tinggi",kekeringan:"Kekeringan Meteorologis"},JENIS_PENDEK={hujan:"Hujan tinggi",kekeringan:"Kekeringan"};
const linkJenis=j=>j==="hujan"?"#peringatan-hujan-tinggi":"#peringatan-kekeringan";
function daftarPeringatan(){const p=(KA&&KA.peringatan)||{};const hari=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
 const d=(Array.isArray(p.daftar)?p.daftar:(p.status&&p.status!=="nihil"?[p]:[])).filter(x=>LV_URUT[x.status]&&!(x.sampai&&x.sampai<hari));
 /* peringatan dari admin diutamakan: selama masih ada yang aktif, peringatan otomatis dari BMKG Pusat disembunyikan.
    Setelah peringatan admin berakhir, peringatan pusat tampil lagi bila masa berlakunya belum habis. */
 const pu=!d.length&&typeof peringatanPusat==="function"?peringatanPusat():[];
 return [...d,...pu].sort((a,b)=>LV_URUT[b.status]-LV_URUT[a.status])}
function peringatanAktif(){const d=daftarPeringatan();return d.length?d[0]:null}
const NAMA_STATUS={waspada:"Waspada",siaga:"Siaga",awas:"Awas"};
const IKON_JENIS={hujan:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 15a4 4 0 1 1 1.2-7.8A5 5 0 0 1 18 9a3.5 3.5 0 0 1 0 7"/><path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/></svg>',
 kekeringan:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="10" r="4"/><path d="M12 2v2M4.9 4.9l1.4 1.4M2 10h2M20 10h2M17.7 6.3l1.4-1.4M3 20h18M8 20l2-3 2 2 2-3 2 4"/></svg>'};
const IKON_BAHAYA=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="cincin" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/><circle class="cincin c2" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/><circle class="cincin c3" cx="50" cy="56" r="30" style="fill:none;stroke:var(--wc);stroke-width:3"/>
<g class="segitiga"><path d="M50 16 L88 82 H12 Z" style="fill:var(--wc);stroke:#1a0d00;stroke-width:3;stroke-linejoin:round"/><rect x="46" y="38" width="8" height="25" rx="4" fill="#1a0d00"/><circle class="seru" cx="50" cy="72" r="4.6" fill="#1a0d00"/></g></svg>`;
const IKON_AMAN=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="cincin lambat" cx="50" cy="50" r="30" style="fill:none;stroke:#6ee7b7;stroke-width:2.5"/><circle class="cincin lambat c2" cx="50" cy="50" r="30" style="fill:none;stroke:#6ee7b7;stroke-width:2.5"/>
<path d="M50 18 l26 10 v20 c0 17-11 27-26 31-15-4-26-14-26-31 V28z" fill="#ecfdf5" fill-opacity=".14" stroke="#a7f3d0" stroke-width="3" stroke-linejoin="round"/><path class="centang" d="M38 50 l9 9 16-18" fill="none" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function chipPeringatan(x,i){return `<a class="pchip lv-${x.status}" style="--i:${i}" href="${linkJenis(x.jenis)}"><span class="pbadge">${NAMA_STATUS[x.status]}</span><span class="pjen">${IKON_JENIS[x.jenis]} ${NAMA_JENIS[x.jenis]}</span><b>${escH(x.wilayah)}</b>${x.berlaku?`<small>${escH(x.berlaku)}</small>`:""}${x.catatan?`<em>${escH(x.catatan)}</em>`:""}</a>`}
function bandPeringatan(){const d=daftarPeringatan(),P0=(KA&&KA.peringatan)||{};
 if(!d.length)return `<section class="band bleed band-nihil"><div class="wrap bandin bandin3"><div class="bandico">${IKON_AMAN}</div>
 <div><span class="eyebrow">Peringatan Dini Iklim${P0.berlaku?" · "+escH(P0.berlaku):" · Dasarian I November 2026"}</span><h2>Tidak ada status Waspada, Siaga, atau Awas</h2><p>${P0.catatan?escH(P0.catatan):"Berlaku untuk kekeringan meteorologis maupun curah hujan tinggi di Papua Barat dan Papua Barat Daya. Tetap pantau kekeringan: SPI September menunjukkan Kering hingga Sangat Kering di Teluk Bintuni, Fakfak, Kaimana, dan sebagian besar Papua Barat Daya."}</p></div>
 <div class="bandbtn"><a class="hsbtn" href="#peringatan-kekeringan">Kekeringan &amp; SPI →</a><a class="hsbtn ghost" href="#peringatan-hujan-tinggi">Hujan Tinggi →</a></div></div></section>`;
 const t=d[0],satuJenis=d.every(x=>x.jenis===t.jenis),berlaku=P0.berlaku||t.berlaku||"";
 return `<section class="band bleed band-${t.status} band-aktif" role="region" aria-label="Peringatan dini aktif"><div class="bandstrip" aria-hidden="true"></div><div class="wrap bandin bandin3">
 <div class="bandico">${IKON_BAHAYA}</div>
 <div><span class="eyebrow"><span class="livedot"></span>Peringatan Dini ${satuJenis?NAMA_JENIS[t.jenis]:"Iklim"}${berlaku?" · "+escH(berlaku):""}</span>
 <h2>Status ${NAMA_STATUS[t.status]}${d.length>1?` · ${d.length} wilayah`:" "+(t.jenis==="hujan"?"curah hujan tinggi":"kekeringan")}</h2>
 <div class="pchips">${d.map(chipPeringatan).join("")}</div>${P0.catatan?`<p class="pcat">${escH(P0.catatan)}</p>`:""}</div>
 <div class="bandbtn">${[...new Set(d.map(x=>x.jenis))].map(j=>`<a class="hsbtn" href="${linkJenis(j)}">${j==="hujan"?"Detail hujan tinggi":"Detail kekeringan"} →</a>`).join("")}</div></div><div class="bandstrip bawah" aria-hidden="true"></div></section>`}
function slidePeringatan(){const d=daftarPeringatan();if(!d.length)return null;const t=d[0],P0=(KA&&KA.peringatan)||{},satuJenis=d.every(x=>x.jenis===t.jenis),berlaku=P0.berlaku||t.berlaku||"";
 return {label:`<span class="livedot"></span>Peringatan Dini ${satuJenis?NAMA_JENIS[t.jenis]:"Iklim"}${berlaku?" · "+escH(berlaku):""}`,
  judul:`Status ${NAMA_STATUS[t.status]} ${t.jenis==="hujan"?"curah hujan tinggi":"kekeringan"}`,
  teks:`<span class="hchips">${d.slice(0,6).map(x=>`<span class="hchip lv-${x.status}"><i></i>${NAMA_STATUS[x.status]} · ${escH(potong(x.wilayah,60))}${satuJenis?"":" · "+JENIS_PENDEK[x.jenis]}</span>`).join("")}${d.length>6?`<span class="hchip">+${d.length-6} lainnya</span>`:""}</span>`,
  tombol:"Lihat peringatan",link:linkJenis(t.jenis),seni:t.jenis==="hujan"?"awasHujan":"awasKering",status:t.status}}
/* kotak status di halaman Kekeringan & Hujan Tinggi */
function kotakPer(jenis){const d=daftarPeringatan().filter(x=>x.jenis===jenis);if(!d.length)return "";const t=d[0];
 return `<div class="perbox lv-${t.status}"><div class="perico">${IKON_BAHAYA}</div><div><b>Status ${NAMA_STATUS[t.status]}${d.length>1?` di ${d.length} wilayah`:""}</b><ul>${d.map(x=>`<li class="lv-${x.status}"><span class="pbadge">${NAMA_STATUS[x.status]}</span> <b>${escH(x.wilayah)}</b>${x.berlaku?` <small>· ${escH(x.berlaku)}</small>`:""}${x.catatan?`<br><small>${escH(x.catatan)}</small>`:""}</li>`).join("")}</ul></div></div>`}
/* ilustrasi banner khusus peringatan (lebih dramatis dari ilustrasi biasa) */
const BEACON=`<g class="cincin" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g><g class="cincin c2" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g><g class="cincin c3" style="fill:none;stroke:var(--wc);stroke-width:4"><circle cx="0" cy="0" r="70"/></g>
<g class="segitiga"><path d="M0 -62 L64 50 H-64 Z" style="fill:var(--wc);stroke:#1a0d00;stroke-width:5;stroke-linejoin:round"/><rect x="-7" y="-26" width="14" height="44" rx="7" fill="#1a0d00"/><circle class="seru" cx="0" cy="34" r="8" fill="#1a0d00"/></g>`;
SENI.awasHujan=(()=>{const g=Array.from({length:110},(_,i)=>{const x=(i*61)%1260,y=(i*37)%520;return `<line x1="${x}" y1="${y}" x2="${x-16}" y2="${y+64}"/>`}).join("");
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
<g transform="translate(820 300)">${BEACON}</g>
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
 <div class="pusatlist">${d.map(x=>`<a class="pusatit" href="${escH(x.url)}" target="_blank" rel="noopener">${x.gambar?`<img src="${escH(x.gambar)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:""}<div><span>${tglPendek(x.tanggal)}${umurHari(x.tanggal)<=14?'<em class="baru">Baru</em>':""}</span><b>${escH(x.judul)}</b></div></a>`).join("")}</div></section>`}
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
async function teksDariPdf(file){const L=await muatPdfJs();const doc=await L.getDocument({isEvalSupported:false,data:new Uint8Array(await file.arrayBuffer())}).promise;let out="";
 for(let n=1;n<=Math.min(doc.numPages,40)&&out.length<16000;n++){const pg=await doc.getPage(n);const tc=await pg.getTextContent();out+="\n[Halaman "+n+"] "+tc.items.map(i=>i.str).join(" ").replace(/\s+/g," ")}
 return out.trim()}
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
async function bacaDokumen(file){const e=extDok(file);try{return e==="pdf"?await teksDariPdf(file):e?await teksDariZip(file):""}catch(er){return ""}}
const JENIS_OTOMATIS=["Buletin Iklim","Prediksi Musim Hujan","Prediksi Musim Kemarau","Informasi Iklim"];
/* gabungkan hasil AI ke Kondisi Iklim: kartu yang ditemukan menggantikan kartu sejenis, sisanya tetap */
async function simpanKondisiOtomatis(j,judul,jenis){const lama=kondisiData(),urut=KUNCI_KARTU.map(k=>k[0]);
 const baru=(j.kartu||[]).map(x=>({...x,src:judul}));if(!baru.length&&!Object.keys(j.teks||{}).length)return 0;
 const kartu=[...(lama.kartu||[]).map(x=>({...x,src:x.src||lama.sumber||""})).filter(x=>!baru.some(n=>n.kunci===x.kunci)),...baru].sort((a,b)=>urut.indexOf(a.kunci)-urut.indexOf(b.kunci));
 await admJSON("/admin/kondisi",{sumber:jenis==="Buletin Iklim"?judul:(lama.sumber||judul),ringkasan:j.ringkasan||lama.ringkasan||"",kartu,teks:{...(lama.teks||{}),...(j.teks||{})},otomatis:judul});
 return baru.length}

/* berita dari admin dan BMKG pusat untuk daftar berita */
function beritaDinamis(){const a=((KA&&KA.publikasi)||[]).filter(p=>p.jenis==="Berita Kegiatan").map(p=>({id:"a-"+p.id,tanggal:p.tanggal,judul:escH(p.judul),ringkas:escH(p.ringkas),gambar:fileURL(p.gambar),kami:1}));
 const b=((KA&&KA.bmkg&&KA.bmkg.berita)||[]).map(x=>({tanggal:x.tanggal,judul:escH(x.judul),ringkas:escH(potong(x.ringkas,160)),url:urlAman(x.url),gambar:urlAman(x.gambar),media:"BMKG Pusat",pusat:1,otomatis:1}));
 return [...a,...b]}
function beritaAdmin(id){const p=((KA&&KA.publikasi)||[]).find(x=>"a-"+x.id===id);if(!p)return null;
 const isi=(p.isi||p.ringkas||"").split(/\n\s*\n/).map(x=>`<p>${escH(x).replace(/\n/g,"<br>")}</p>`).join("");
 return {judul:escH(p.judul),tanggal:p.tanggal,gambar:fileURL(p.gambar),isi:isi+(p.file?`<p><a class="pbtn" href="${fileURL(p.file)}" target="_blank" rel="noopener">Unduh lampiran${p.ukuran?" · "+escH(p.ukuran):""}</a></p>`:"")}}
function pubPusat(){const a=(KA&&KA.bmkg&&KA.bmkg.produk)||[];if(!a.length)return "";
 return `<section class="sec"><div class="sechead"><div><span class="eyebrow">Dari BMKG Pusat</span><h2>Informasi Iklim Nasional</h2></div><a class="more" href="https://www.bmkg.go.id/iklim" target="_blank" rel="noopener">bmkg.go.id/iklim ↗</a></div>
 <div class="grid3">${a.map(x=>`<a class="card pubc pusatc" href="${escH(x.url)}" target="_blank" rel="noopener">${x.gambar?`<img src="${escH(x.gambar)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}<span class="pill">${escH((x.kategori||[])[0]||"BMKG")}</span><h3>${escH(x.judul)}</h3><small>${tglPendek(x.tanggal)}</small><span class="pbtn">Buka di bmkg.go.id ↗</span></a>`).join("")}</div></section>`}
let kontenDimuat=false;
let KA_STR="",KA_WAKTU=0;
function muatKonten(paksa){if(!KONTEN_URL||(kontenDimuat&&!paksa))return;kontenDimuat=true;KA_WAKTU=Date.now();
 fetch(KONTEN_URL+"/konten",{cache:"no-store"}).then(r=>r.json()).then(j=>{const sj=JSON.stringify(j);if(sj===KA_STR)return;KA_STR=sj;KA=j;terapkanPengaturan();isiFooter();if(PUSAT_MUAT&&pusatBasi())muatPusat(1);
  if(["beranda","publikasi","berita","layanan-data",...PROFIL_HAL,...IKLIM].includes(cur)||cur.startsWith("berita-")){const y=scrollY;render();scrollTo({top:y})}}).catch(()=>{})}

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
const PROFIL_HAL=["profil","profil-tim","profil-sejarah"];
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
 <div class="card prose"><span class="eyebrow">Tugas Pokok</span><ul class="cekl">${["Pengamatan unsur iklim dan pengelolaan jaringan pos hujan.","Analisis dinamika atmosfer dan laut, curah hujan, serta sifat hujan bulanan.","Monitoring hari tanpa hujan dan indeks kekeringan (SPI).","Prakiraan curah hujan bulanan dan prakiraan musim.","Penerbitan Buletin Iklim bulanan (ISSN 2622-9798).","Layanan data dan informasi iklim bagi instansi, peneliti, dan masyarakat."].map(t=>`<li>${t}</li>`).join("")}</ul></div>
</div></section>
<section class="sec"><div class="sechead"><div><span class="eyebrow">Pimpinan</span><h2>Kepala Stasiun</h2></div><a class="more" href="#profil-tim">Pimpinan &amp; pegawai →</a></div>
 <div class="kepala reveal"><div class="kfoto">${kepala.foto?`<img src="${fileURL(kepala.foto)}" alt="${escH(kepala.nama)}" onerror="this.outerHTML='<span>${inisial(kepala.nama)}</span>'">`:`<span>${inisial(kepala.nama)}</span>`}</div>
 <div><b>${escH(kepala.nama)}</b><small>${escH(kepala.jabatan||"Kepala Stasiun")}</small>${pr.sambutan?`<div class="sambutan">${paragraf(pr.sambutan)}</div>`:""}</div></div></section>
${pr.visi||misi.length?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Arah Kerja</span><h2>Visi &amp; Misi</h2></div></div><div class="grid2 reveal">${pr.visi?`<div class="card visi"><span class="eyebrow">Visi</span><p>${escH(pr.visi)}</p></div>`:""}${misi.length?`<div class="card prose"><span class="eyebrow">Misi</span><ol>${misi.map(m=>`<li>${escH(m)}</li>`).join("")}</ol></div>`:""}</div></section>`:""}
<section class="sec"><div class="profnav reveal"><a href="#profil-tim">${ic('<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.2-4.5 3-5"/>')}<div><b>Pimpinan &amp; Pegawai</b><span>Kepala stasiun, struktur organisasi, dan tim kami</span></div></a><a href="#profil-sejarah">${ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}<div><b>Sejarah</b><span>Perjalanan dan jejak nama kantor kami</span></div></a></div></section>
${fotos.length>1?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Galeri</span><h2>Kantor &amp; Kegiatan</h2></div></div><div class="galeri">${fotos.slice(1).map((f,i)=>`<a class="reveal" style="--d:${i*60}ms" href="${f}" target="_blank" rel="noopener"><img src="${f}" alt="" loading="lazy"></a>`).join("")}</div></section>`:""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Hubungi Kami</span><h2>Kantor &amp; Lokasi</h2></div></div><div class="kontakgrid reveal">${kartuKontak()}${petaKantor()}</div></section>`};
P["profil-tim"]=()=>{const {pr,kepala,pegawai}=dataTim();
 return heroProfil("Pimpinan &amp; Pegawai","Tim Stasiun Klimatologi Papua Barat yang melayani informasi iklim untuk Papua Barat dan Papua Barat Daya.",'<a href="#profil">Profil</a> &gt;&gt; Pimpinan &amp; Pegawai')+`
<section class="sec"><div class="sechead"><div><span class="eyebrow">Pimpinan</span><h2>Kepala Stasiun</h2></div></div>
 <div class="kepala reveal"><div class="kfoto">${kepala.foto?`<img src="${fileURL(kepala.foto)}" alt="${escH(kepala.nama)}" onerror="this.outerHTML='<span>${inisial(kepala.nama)}</span>'">`:`<span>${inisial(kepala.nama)}</span>`}</div>
 <div><b>${escH(kepala.nama)}</b><small>${escH(kepala.jabatan||"Kepala Stasiun")}</small>${pr.sambutan?`<div class="sambutan">${paragraf(pr.sambutan)}</div>`:""}</div></div></section>
${pr.struktur?`<section class="sec"><div class="sechead"><div><span class="eyebrow">Organisasi</span><h2>Struktur Organisasi</h2></div></div><figure class="map reveal"><img src="${fileURL(pr.struktur)}" alt="Bagan struktur organisasi Stasiun Klimatologi Papua Barat" loading="lazy"></figure></section>`:""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Tim Kami</span><h2>Pegawai</h2></div></div>
${pegawai.length?`<div class="tim">${pegawai.map((p,i)=>`<div class="org reveal" style="--d:${(i%8)*60}ms"><div class="ofoto">${p.foto?`<img src="${fileURL(p.foto)}" alt="${escH(p.nama)}" loading="lazy" onerror="this.outerHTML='<span>${inisial(p.nama)}</span>'">`:`<span>${inisial(p.nama)}</span>`}</div><b>${escH(p.nama)}</b><small>${escH(p.jabatan)}</small></div>`).join("")}</div>`:`<div class="card"><p style="margin:0;color:var(--muted)">Daftar pegawai sedang kami lengkapi.</p></div>`}</section>`};
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
P["profil-sejarah"]=()=>{const pr=(KA&&KA.profil)||{};
 return heroProfil("Sejarah","Perjalanan Stasiun Klimatologi Papua Barat melayani informasi iklim di Tanah Papua bagian barat.",'<a href="#profil">Profil</a> &gt;&gt; Sejarah')+`
${pr.sejarah?sejarahHTML(pr.sejarah):""}
<section class="sec"><div class="sechead"><div><span class="eyebrow">Jejak dalam Dokumen</span><h2>Dari Manokwari Selatan ke Papua Barat</h2></div></div>
<ol class="jejak">
 <li class="reveal"><time>Ransiki, Manokwari Selatan</time><b>Lokasi pengamatan iklim</b><p>Ransiki di Kabupaten Manokwari Selatan menjadi lokasi pengamatan iklim kami dan hingga kini tetap berfungsi sebagai kantor pengamatan.</p></li>
 <li class="reveal" style="--d:80ms"><time>Mei 2020</time><b>Stasiun Klimatologi Manokwari Selatan</b><p>Nama ini tercantum pada dokumen analisis cuaca resmi BMKG tertanggal 25 Mei 2020, dengan alamat kantor di Kompleks Perkantoran Gubernur Papua Barat, Arfai, Manokwari. <a href="https://content.bmkg.go.id/wp-content/uploads/Analisis-Cuaca-Terkait-Hujan-Lebat-di-Distrik-Ransiki-Manokwari-Selatan-Papua-Barat.pdf" target="_blank" rel="noopener">Dokumen ↗</a></p></li>
 <li class="reveal" style="--d:160ms"><time>Kini</time><b>Stasiun Klimatologi Kelas III Papua Barat</b><p>Melayani Provinsi Papua Barat dan Papua Barat Daya. Pada 22 Januari 2026 Kepala BMKG berkunjung ke kantor kami di Manokwari. <a href="https://www.bmkg.go.id/berita/kunjungi-manokwari-kepala-bmkg-tegaskan-peran-strategis-dukung-pembangunan-sektoral-di-tanah-papua" target="_blank" rel="noopener">Berita BMKG ↗</a></p></li>
</ol></section>`};
/* bagian untuk halaman Layanan Data */
function kalenderLayanan(){return `<section class="sec" style="margin-top:8px"><div class="sechead"><div><span class="eyebrow">Produk Rutin</span><h2>Kalender Layanan Informasi Iklim</h2></div></div>
 <div class="kal">${[["Setiap dasarian","Monitoring hari tanpa hujan dan peringatan dini kekeringan serta curah hujan tinggi.","#hari-tanpa-hujan","#ea580c"],["Setiap bulan","Buletin Iklim: analisis hujan bulan lalu, indeks kekeringan (SPI), dinamika atmosfer, dan prakiraan tiga bulan ke depan.","#publikasi","#0284c7"],["Menjelang musim kemarau","Prediksi Musim Kemarau: awal, sifat, dan puncak musim kemarau per Zona Musim.","#prakiraan-musim-kemarau","#b45309"],["Menjelang musim hujan","Prediksi Musim Hujan dan FGD bersama pemangku kepentingan daerah.","#prakiraan-musim","#15803d"],["Sepanjang tahun","Layanan permintaan data, konsultasi iklim, dan data AWS/ARG langsung.","#peralatan","#7c3aed"]].map(([w,t,h,c],i)=>`<a class="kalit reveal" href="${h}" style="--c:${c};--d:${i*70}ms"><span>${w}</span><p>${t}</p></a>`).join("")}</div></section>
<section class="sec"><div class="sechead"><div><span class="eyebrow">Wilayah Layanan</span><h2>Papua Barat &amp; Papua Barat Daya</h2></div></div>
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
 const up=async(file)=>{if(!file)return "";if(file.size>5*1048576)throw new Error("Foto "+file.name+" lebih dari 5 MB.");return (await admUnggah(file)).kunci};
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
const JENIS_TERBIT=["Buletin Iklim","Prediksi Musim Hujan","Prediksi Musim Kemarau","Peringatan Dini","Informasi Iklim","Berita Kegiatan","Lainnya"];
let ADM_PASS="";try{ADM_PASS=sessionStorage.getItem("admPass")||""}catch(e){}
let ADM_TAB="terbit";
function admFetch(jalur,opsi={}){return fetch(KONTEN_URL+jalur,{method:"POST",...opsi,headers:{"X-Admin":ADM_PASS,...(opsi.headers||{})}}).then(async r=>{const j=await r.json().catch(()=>({galat:"Jawaban server tidak terbaca"}));if(r.status===401){ADM_PASS="";try{sessionStorage.removeItem("admPass")}catch(e){}if(jalur!=="/admin/cek"&&cur==="admin")setTimeout(render,2500)}if(!r.ok||j.galat)throw new Error(j.galat||("HTTP "+r.status));return j})}
const admJSON=(jalur,data)=>admFetch(jalur,{body:JSON.stringify(data),headers:{"Content-Type":"application/json"}});
/* dokumen di atas 20 MB dikirim beberapa bagian (robot menyambungnya kembali saat diunduh) */
async function admUnggah(f){const B=20*1048576,h={"Content-Type":f.type||"application/octet-stream","X-Nama-File":encodeURIComponent(f.name)};
 if(f.size<=B||/^image\//.test(f.type))return admFetch("/admin/unggah",{body:f,headers:h});
 const n=Math.ceil(f.size/B);let u=await admFetch("/admin/unggah",{body:f.slice(0,B,f.type),headers:h});
 for(let i=1;i<n;i++){pesan(`Mengunggah dokumen bagian ${i+1} dari ${n}…`);u=await admFetch("/admin/unggah",{body:f.slice(i*B,(i+1)*B,f.type),headers:{...h,"X-Lanjut":u.kunci,"X-Ke":String(i)}})}return u}
P.admin=()=>{if(!KONTEN_URL)return head("Admin","Admin","Robot konten belum dipasang.");
 if(!ADM_PASS)return head("Admin","Halaman Admin","Khusus petugas Stasiun Klimatologi Papua Barat.")+`<form class="card admbox" id="admLogin" style="max-width:420px"><label>Password admin<input type="password" id="admPw" autocomplete="current-password" required></label><button class="pbtn" type="submit">Masuk</button><p class="admmsg" id="admMsg"></p></form>`;
 const T=[["terbit","Terbitkan"],["daftar","Daftar Terbitan"],["peringatan","Peringatan Dini"],["kondisi","Kondisi Iklim"],["iklim","Isi Halaman Iklim"],["info","Info Kantor"],["profil","Profil"],["bmkg","BMKG Pusat"],["riwayat","Riwayat"],["wilayah","Info Wilayah"],["alat","Peralatan"],["cadangan","Cadangan & Penyimpanan"],["panduan","Panduan"]];
 return head("Admin","Halaman Admin","Perubahan di sini langsung tampil di web (paling lama 1 menit).")+`<div class="admtabs">${T.map(([k,n])=>`<button type="button" data-adm="${k}" class="${ADM_TAB===k?"on":""}">${n}</button>`).join("")}<button type="button" id="admKeluar" class="keluar">Keluar</button></div><div id="admBody" class="card admbox"></div>`};
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
 <label>Gambar sampul / foto (opsional, maks 5 MB)<input type="file" name="gambar" accept="image/jpeg,image/png,image/webp"></label>
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
  try{const bl=await fetch(fileURL(p.file)).then(r=>{if(!r.ok)throw new Error("File tidak terunduh");return r.blob()});const img=await sampulDariPdf(new File([bl],"dok.pdf",{type:"application/pdf"}));if(!img)continue;
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
 <div class="admgrid">${[["hujan","Hujan bulanan (analisis)"],["prakiraan","Prakiraan hujan"],["musim","Prakiraan musim / ZOM"],["hth","Hari tanpa hujan"],["spi","Kekeringan & SPI"],["enso","ENSO & IOD"]].map(([k,n])=>`<label>${n}<textarea name="tk_${k}" rows="3">${escH((kd.teks||{})[k]||"")}</textarea></label>`).join("")}</div>
 <button class="pbtn" type="submit">Simpan kondisi iklim</button><p class="admmsg" id="admMsg"></p></form>`}
function admPeringatan(){const p=(KA&&KA.peringatan)||{};const d=Array.isArray(p.daftar)?p.daftar:(p.status&&p.status!=="nihil"?[p]:[]);
 const baris=x=>`<div class="perrow"><select name="pr_status" aria-label="Status">${["waspada","siaga","awas"].map(v=>`<option value="${v}"${x.status===v?" selected":""}>${NAMA_STATUS[v]}</option>`).join("")}</select><select name="pr_jenis" aria-label="Jenis"><option value="hujan"${x.jenis==="hujan"?" selected":""}>Curah hujan tinggi</option><option value="kekeringan"${x.jenis==="kekeringan"?" selected":""}>Kekeringan</option></select><input name="pr_wil" placeholder="Wilayah, mis. Distrik Ransiki (Manokwari Selatan)" value="${escH(x.wilayah||"")}"><input name="pr_berlaku" placeholder="Periode (opsional)" value="${escH(x.berlaku||"")}"><input type="date" name="pr_sampai" title="Tampil sampai tanggal (opsional)" value="${escH(x.sampai||"")}"><input name="pr_cat" placeholder="Imbauan (opsional)" value="${escH(x.catatan||"")}"><button type="button" class="mini bahaya" data-hapusbaris title="Hapus baris">✕</button></div>`;
 return `<form id="admPer"><p class="admnote">Isi <b>satu baris untuk tiap wilayah</b>. Tiap wilayah boleh berbeda status (Waspada, Siaga, Awas) dan jenis (hujan tinggi atau kekeringan). Bila tidak ada baris sama sekali, web otomatis menampilkan peringatan dini nasional dari BMKG Pusat untuk Papua Barat/Papua Barat Daya (bila ada); jika pusat juga tidak mengeluarkan, status <b>Nihil</b>. Selama ada peringatan dari sini, peringatan pusat disembunyikan sementara. Kolom tanggal = tampil sampai tanggal itu (opsional).</p>
 <div id="perList">${d.map(baris).join("")}</div><p><button type="button" class="mini" id="perTambah">+ Tambah wilayah</button></p><template id="perTpl">${baris({status:"waspada",jenis:"hujan"})}</template>
 <div class="admgrid"><label>Periode berlaku umum<input name="berlaku" placeholder="mis. Dasarian II November 2026" value="${escH(p.berlaku||"")}"></label></div>
 <label>Catatan umum / imbauan (opsional; saat Nihil menggantikan teks bawaan di pita beranda)<textarea name="catatan" rows="3">${escH(p.catatan||"")}</textarea></label>
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
function admBmkg(){return `<p class="admnote">Robot mengambil rilisan BMKG pusat tiap 3 jam. Klik "Sembunyikan" untuk rilisan yang tidak ingin ditampilkan.</p><p><button type="button" class="pbtn" id="admAmbil">Ambil rilisan sekarang</button></p><div id="admBmkgList">Memuat…</div><p class="admmsg" id="admMsg"></p>`}
function isiAdmBmkg(){const el=document.getElementById("admBmkgList");if(!el)return;
 fetch(KONTEN_URL+"/bmkg-mentah",{cache:"no-store"}).then(r=>r.json()).then(j=>{const s=new Set(j.sembunyi_bmkg||[]);const a=[...(j.besar||[]).map(x=>({...x,_t:"Banner"})),...(j.berita||[]).map(x=>({...x,_t:"Berita"})),...(j.produk||[]).map(x=>({...x,_t:"Publikasi"}))];const lihat=new Set();
  el.innerHTML=`<small>Terakhir diambil: ${j.diambil?new Date(j.diambil).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})+" WIT":"belum pernah"}${j.galat?" · Kendala: "+escH(j.galat):""}</small><div class="admlist">${a.filter(x=>!lihat.has(x._t+x.id)&&lihat.add(x._t+x.id)).map(x=>`<div class="admrow${s.has(x.id)?" redup":""}"><div><span class="pill">${x._t}</span> <a href="${escH(x.url)}" target="_blank" rel="noopener">${escH(x.judul)}</a><br><small>${tglPendek(x.tanggal)}</small></div><div><button type="button" class="mini" data-sembunyi="${x.id}">${s.has(x.id)?"Tampilkan":"Sembunyikan"}</button></div></div>`).join("")||"<p>Belum ada rilisan.</p>"}</div>`}).catch(()=>{el.textContent="Gagal memuat daftar."})}
function isiAdmRiwayat(){const el=document.getElementById("admBody");
 admFetch("/admin/riwayat").then(j=>{el.innerHTML=`<p class="admnote">Setiap perubahan menyimpan salinan isi sebelumnya (20 terakhir). "Kembalikan" memulihkan isi web ke kondisi sebelum perubahan itu.</p><div class="admlist">${(j.riwayat||[]).map(x=>`<div class="admrow"><div><b>${escH(x.aksi)}</b><br><small>${new Date(x.waktu).toLocaleString("id-ID",{timeZone:"Asia/Jayapura"})} WIT</small></div><div><button type="button" class="mini" data-kembali="${x.i}">Kembalikan ke sebelum ini</button></div></div>`).join("")||"<p>Belum ada riwayat.</p>"}</div><p class="admmsg" id="admMsg"></p>`}).catch(e=>{el.innerHTML=`<p class="admmsg err">${escH(e.message)}</p>`})}
/* ---------- tab admin "Info Wilayah" ---------- */
function admWilayah(){const w=WIL_ADM(),N=w.normal||{},D=w.distrik||{},C=w.catatan||{};
 return `<form id="admWil"><p class="admnote">Atur informasi per kabupaten/kota untuk halaman <b>Info Wilayah Saya</b>. <b>Normal hujan bulanan</b> (rata-rata 1991–2020, dalam mm) dipakai untuk menjelaskan arti Bawah Normal, Normal, dan Atas Normal kepada masyarakat. Kosongkan bila belum ada.</p>
 ${KAB_SEMUA.map(([kab,pr])=>{const sl=slugK(kab),n=N[sl]||[],ada=n.some(v=>+v>0)||D[sl]||C[sl];return `<details class="admsec"${ada?"":""}><summary>${esc(kab)} <small style="font-weight:600;color:var(--muted)">· ${pr==="pbd"?"Papua Barat Daya":"Papua Barat"}${n.some(v=>+v>0)?" · normal terisi":""}</small></summary><input type="hidden" name="wl_kab" value="${esc(sl)}">
  <p class="admnote" style="margin:8px 0 4px">Normal hujan bulanan (mm)</p><div class="normgrid">${BLN_ID.map((b,i)=>`<label>${b.slice(0,3)}<input name="wl_n_${sl}_${i}" inputmode="decimal" value="${+n[i]>0?esc(String(n[i]).replace(".",",")):""}"></label>`).join("")}</div>
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
async function simpanAlat(f){const v=n=>(f.querySelector(`[name="${n}"]`)||{}).value||"",c=n=>!!(f.querySelector(`[name="${n}"]`)||{}).checked,o={};
 [...f.querySelectorAll('[name="al_id"]')].forEach(x=>{const id=x.value;o[id]={nama:v("al_nama_"+id).trim(),wil:v("al_wil_"+id),logger:v("al_logger_"+id).trim(),sumber:v("al_sumber_"+id)||id,lokasi:v("al_lok_"+id).trim(),mqtt:c("al_mqtt_"+id),vpn:c("al_vpn_"+id),sembunyi:!c("al_tampil_"+id)}});
 const pakai={};Object.entries(o).forEach(([id,x])=>{if(x.sumber!==id)pakai[x.sumber]=(pakai[x.sumber]||0)+1});const dobel=Object.entries(pakai).filter(([,n])=>n>1).map(([k])=>k);
 if(dobel.length)throw new Error("Data logger "+dobel.join(", ")+" dipakai oleh lebih dari satu alat. Periksa pilihan \"Data diambil dari ID logger\".");
 await admJSON("/admin/pengaturan",{kunci:"alat",nilai:o});await muatUlangKA();pesan("Peralatan disimpan. Tampil di web paling lama 1 menit.")}
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
function terapkanPengaturan(){urutkanPublikasi();if(typeof PUBLIKASI==="undefined")return;
 if(!ASLI)ASLI={alat:ALAT.map(a=>({...a})),tukar:{...TUKAR_DATA},lok:{...LOKASI_ASLI},pub:PUBLIKASI.map(p=>({...p}))};
 const pg=(KA&&KA.pengaturan)||{},sp=pg.sembunyi_pub||{};
 PUBLIKASI.length=0;ASLI.pub.forEach(p=>{const o=sp[slugP(p.judul)]||{};if(o.sembunyi)return;const b={...p};["judul","tanggal","ringkas"].forEach(f=>{if(o[f])b[f]=String(o[f])});PUBLIKASI.push(b)});
 const al=pg.alat&&typeof pg.alat==="object"?pg.alat:null;ALAT.length=0;Object.keys(TUKAR_DATA).forEach(k=>delete TUKAR_DATA[k]);Object.keys(LOKASI_ASLI).forEach(k=>delete LOKASI_ASLI[k]);
 ASLI.alat.forEach(a=>{const o=(al&&al[a.id])||{};if(o.sembunyi)return;const b={...a};["nama","wil","logger"].forEach(f=>{if(o[f])b[f]=String(o[f])});if(al&&al[a.id]){b.mqtt=o.mqtt?1:0;b.vpn=o.vpn?1:0}ALAT.push(b)});
 if(al){ASLI.alat.forEach(a=>{const o=al[a.id]||{};if(o.sumber&&o.sumber!==a.id)TUKAR_DATA[a.id]=String(o.sumber);if(o.lokasi)LOKASI_ASLI[a.id]=String(o.lokasi)})}else{Object.assign(TUKAR_DATA,ASLI.tukar);Object.assign(LOKASI_ASLI,ASLI.lok)}
 if(LAST_MENTAH)LAST=tukarData(LAST_MENTAH)}
function muatUlangKA(){return fetch(KONTEN_URL+"/konten?t="+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(j=>{KA=j;terapkanPengaturan();isiFooter()}).catch(()=>{})}
function pesan(t,err){const m=document.getElementById("admMsg");if(m){m.textContent=t;m.className="admmsg"+(err?" err":" ok")}}
function admTampil(tab,data){ADM_TAB=tab;document.querySelectorAll("[data-adm]").forEach(b=>b.classList.toggle("on",b.dataset.adm===tab));const el=document.getElementById("admBody");if(!el)return;
 if(tab==="terbit")el.innerHTML=admTerbitForm(data);else if(tab==="daftar")el.innerHTML=admDaftar();else if(tab==="peringatan")el.innerHTML=admPeringatan();else if(tab==="kondisi")el.innerHTML=admKondisi();else if(tab==="iklim")el.innerHTML=admIklim();else if(tab==="panduan")el.innerHTML=admPanduan();else if(tab==="wilayah")el.innerHTML=admWilayah();else if(tab==="alat")el.innerHTML=admAlat();else if(tab==="cadangan"){el.innerHTML='<div id="admCad">Memuat…</div><p class="admmsg" id="admMsg"></p>';isiAdmCad()}else if(tab==="info")el.innerHTML=admInfo();else if(tab==="profil")el.innerHTML=admProfil();else if(tab==="bmkg"){el.innerHTML=admBmkg();isiAdmBmkg()}else if(tab==="riwayat"){el.innerHTML="Memuat…";isiAdmRiwayat()}
 const f=document.getElementById("admTerbit");if(f){const cekJenis=()=>f.querySelector(".isiBerita").hidden=f.jenis.value!=="Berita Kegiatan";f.jenis.onchange=cekJenis;cekJenis()}}
function pasangAdmin(){const lg=document.getElementById("admLogin");
 if(lg){lg.onsubmit=e=>{e.preventDefault();ADM_PASS=document.getElementById("admPw").value;pesan("Memeriksa…");admFetch("/admin/cek").then(j=>{/* simpan token sesi (12 jam), bukan password */if(j&&j.token)ADM_PASS=j.token;try{sessionStorage.setItem("admPass",ADM_PASS)}catch(e){}muatUlangKA().then(render)}).catch(er=>{ADM_PASS="";pesan(er.message,1)})};return}
 if(!document.getElementById("admBody"))return;
 muatUlangKA().then(()=>admTampil(ADM_TAB));
 app.onclick=e=>{const t=e.target;
  if(t.dataset.adm){admTampil(t.dataset.adm);return}
  if(t.id==="pgTambah"){const tp=document.getElementById("pgTpl");document.getElementById("pgList").insertAdjacentHTML("beforeend",tp.innerHTML);return}
  if(t.dataset.hapusbaris!==undefined){t.closest(".pgrow,.perrow").remove();return}
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
  if(t.id==="admAmbil"){t.disabled=true;pesan("Mengambil rilisan BMKG…");admFetch("/admin/ambil-bmkg").then(j=>{pesan(j.galat?"Kendala: "+j.galat:"Selesai. Kotak pembaruan, angka ENSO/IOD, peta, dan peringatan nasional di tab Iklim ikut diperbarui (paling lama 1 menit).",!!j.galat);try{localStorage.removeItem("pusat_v2")}catch(e){}PUSAT_MUAT=false;muatUlangKA();isiAdmBmkg();t.disabled=false}).catch(er=>{pesan(er.message,1);t.disabled=false});return}
  if(t.id==="admAI"){const f=document.getElementById("admTerbit"),fl=f.file.files[0];if(!fl&&!f.judul.value){pesan("Pilih file dokumen dulu.",1);return}if(t.disabled)return;
   if(/buletin/i.test(f.jenis.value+" "+f.judul.value+" "+(fl?fl.name:""))){if(fl&&(!f.judul.value.trim()||f.judul.dataset.auto==="1"))f.judul.value=judulDariFile(fl.name);const r=ringkasLokal(f.judul.value);if(r){f.ringkas.value=r;cekEdisiForm(f);pesan("Judul dan ringkasan terisi dari nama file (tanpa AI). Tabel, peta, dan kartu Kondisi Iklim dibaca saat diterbitkan.");return}}
   if(!fl){pesan("Pilih file dokumen dulu.",1);return}t.disabled=true;t.classList.add("memuat");t.dataset.teks=t.textContent;t.textContent="AI sedang membaca… (±1 menit)";pesan("AI sedang membaca dokumen… mohon tunggu, jangan klik lagi.");
   if(extDok(fl)!=="pdf"||true){bacaDokumen(fl).then(tx=>{if(!tx)throw new Error("Isi dokumen tidak terbaca.");return admJSON("/admin/ekstrak",{jenis:f.jenis.value,judul:f.judul.value,teks:tx})}).then(j=>{if(j.galat)throw new Error(j.galat);if(j.judul&&!f.judul.value)f.judul.value=j.judul;if(j.ringkas)f.ringkas.value=j.ringkas;pesan("Terisi"+((j.kartu||[]).length?" · "+j.kartu.length+" kartu Kondisi Iklim akan diperbarui saat diterbitkan":"")+". Periksa kembali sebelum menerbitkan.")}).catch(er=>pesan(er.message,1)).finally(()=>{t.disabled=false;t.classList.remove("memuat");if(t.dataset.teks)t.textContent=t.dataset.teks});return}
   admFetch("/admin/ringkas",{body:fl,headers:{"Content-Type":"application/pdf","X-Nama-File":encodeURIComponent(fl.name)}}).then(j=>{if(j.judul&&!f.judul.value)f.judul.value=j.judul;if(j.ringkas)f.ringkas.value=j.ringkas;pesan("Terisi. Periksa kembali sebelum menerbitkan.")}).catch(er=>pesan(er.message,1)).finally(()=>t.disabled=false);return}};
 app.onsubmit=async e=>{e.preventDefault();const f=e.target,fid=f.getAttribute("id")||"",btn=f.querySelector('button[type="submit"]');if(btn.disabled)return;btn.disabled=true;btn.classList.add("memuat");const ai0=document.getElementById("admAI");if(ai0)ai0.disabled=true;
  try{
   if(fid==="admTerbit"){const d={jenis:f.jenis.value,tanggal:f.tanggal.value,judul:f.judul.value,ringkas:f.ringkas.value,isi:f.isi.value,link:f.link.value,banner:f.banner.checked};
    d.id=f.querySelector('[name="id"]')?f.querySelector('[name="id"]').value:"";
    const pdf=f.file.files[0],ext=extDok(pdf);let img=f.gambar.files[0];
    if(pdf&&!ext)throw new Error("Jenis file belum didukung. Gunakan PDF, PowerPoint (.pptx), atau Word (.docx).");
    if(pdf&&pdf.size>75*1048576)throw new Error("Dokumen lebih dari 75 MB. Kecilkan dulu ukurannya.");
    if(img&&img.size>5*1048576)throw new Error("Gambar lebih dari 5 MB.");
    if(!img&&pdf){pesan("Membuat sampul dari halaman pertama dokumen…");try{img=ext==="pdf"?(await sampulDariPdf(pdf).catch(()=>null))||await fotoDariPdf(pdf):await fotoDariZip(pdf)}catch(er){img=null}}
    /* baca isi dokumen untuk Kondisi Iklim (otomatis, bisa dikoreksi di tab Kondisi Iklim) */
    const edB=edisiKey(d.judul),edK=edisiKey(IK().sumber||kondisiData().otomatis||""),bul=/buletin/i.test(d.jenis+" "+d.judul),lamaEd=bul&&edB&&edK&&edB<edK;
    if(bul&&!d.ringkas)d.ringkas=ringkasLokal(d.judul);
    let ai=null;if(pdf&&!bul&&(JENIS_OTOMATIS.includes(d.jenis)||/fgd|press|rilis|paparan|prediksi|musim/i.test(d.judul))){pesan("AI membaca isi dokumen…");try{const tx=await bacaDokumen(pdf);if(tx){const j=await admJSON("/admin/ekstrak",{jenis:d.jenis,judul:d.judul,teks:tx});if(!j.galat)ai=j}}catch(er){ai=null}}
    if(ai&&!d.ringkas&&ai.ringkas)d.ringkas=ai.ringkas;
    if(pdf){pesan("Mengunggah dokumen…");const u=await admUnggah(new File([pdf],pdf.name,{type:TIPE_DOK[ext]||pdf.type}));d.file=u.kunci;d.ukuran=u.ukuran;d.nama_file=u.nama}
    if(img){pesan("Mengunggah gambar…");const u=await admUnggah(img);d.gambar=u.kunci}
    pesan("Menyimpan…");await admJSON("/admin/terbit",d);let nk=0;if(ai){try{nk=await simpanKondisiOtomatis(ai,d.judul,d.jenis)}catch(er){nk=0}}
    let hi=null;if(pdf&&!lamaEd&&(JENIS_OTOMATIS.includes(d.jenis)||/fgd|press|rilis|paparan|buletin|prediksi|musim/i.test(d.judul))){try{await muatUlangKA();hi=await isiIklimDariDokumen(pdf,d)}catch(er){hi=null}}
    await muatUlangKA();admTampil("daftar");setTimeout(()=>pesan((d.id&&!pdf?"Perubahan disimpan.":"Berhasil diterbitkan.")+" Tampil di web paling lama 1 menit."+(nk?" Kondisi Iklim diperbarui ("+nk+" kartu).":ai?" Ringkasan halaman Iklim diperbarui.":"")+(hi&&(hi.bagian.length||hi.peta)?" Halaman Iklim diisi dari dokumen: "+[hi.bagian.length?hi.bagian.map(b=>NAMA_BAGIAN[b]||b).join(", "):"",hi.peta?hi.peta+" peta":""].filter(Boolean).join(" dan ")+(hi.kartu?"; "+hi.kartu+" kartu Kondisi Iklim dihitung dari tabel":"")+". Periksa di tab Isi Halaman Iklim.":"")+(hi&&hi.basi&&hi.basi.length?" Tidak terbaca dari dokumen ini: "+hi.basi.map(b=>NAMA_BAGIAN[b]||b).join(", ")+" (kartunya di Beranda disembunyikan; isi lama tetap tampil dengan sumber aslinya).":"")+(lamaEd?" Ini edisi lama, jadi isi halaman Iklim dan Kondisi Iklim tidak diubah (web tetap memakai "+(IK().sumber||"edisi terbaru")+").":"")),50)}
   else if(fid==="admProfil"){await simpanProfil(f)}
   else if(fid==="admIklim"){await simpanIklim(f)}
   else if(fid==="admWil"){await simpanWilayah(f)}
   else if(fid==="admAlat"){await simpanAlat(f)}
   else if(fid==="admPub"){await simpanPubBawaan(f)}
   else if(fid==="admPer"){const daftar=[...f.querySelectorAll(".perrow")].map(r=>({status:r.querySelector('[name="pr_status"]').value,jenis:r.querySelector('[name="pr_jenis"]').value,wilayah:r.querySelector('[name="pr_wil"]').value.trim(),berlaku:r.querySelector('[name="pr_berlaku"]').value,sampai:r.querySelector('[name="pr_sampai"]').value,catatan:r.querySelector('[name="pr_cat"]').value}));
    if(daftar.some(x=>!x.wilayah))throw new Error("Ada baris tanpa wilayah. Isi wilayahnya atau hapus barisnya (✕).");
    await admJSON("/admin/peringatan",{daftar,berlaku:f.berlaku.value,catatan:f.catatan.value});await muatUlangKA();admTampil("peringatan");setTimeout(()=>pesan(daftar.length?"Peringatan disimpan ("+daftar.length+" wilayah).":"Disimpan: status Nihil."),50)}
   else if(fid==="admKondisi"){const kartu=[...f.querySelectorAll(".kdrow")].map(r=>{const v=k=>r.querySelector(`[name="${k}"]`).value.trim();const a=v("kd_angka").replace(",",".");return {kunci:v("kd_kunci"),judul:v("kd_judul"),nilai:v("kd_nilai"),ket:v("kd_ket"),angka:a===""?null:Number(a),src:v("kd_src")}}).filter(x=>x.judul&&x.nilai);
    const teks={};["hujan","prakiraan","musim","hth","spi","enso"].forEach(k=>{const el=f.querySelector(`[name="tk_${k}"]`);if(el&&el.value.trim())teks[k]=el.value.trim()});
    await admJSON("/admin/kondisi",{sumber:f.sumber.value,ringkasan:f.ringkasan.value,kartu,teks,otomatis:""});await muatUlangKA();pesan("Kondisi iklim disimpan. Tampil di web paling lama 1 menit.")}
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
const srcIK=k=>dariDok(k)?`<p class="note" data-oto>Sumber: ${esc((IK()[k]&&IK()[k]._sumber)||IK().sumber||"dokumen terbaru kami")}. Isi bagian ini dibaca dari dokumen; bila ada yang keliru, petugas dapat membetulkannya.</p>`:SRC;
const warnaKat=v=>COL[v]||(/sangat tinggi/i.test(v)?"#1f3f9a":/tinggi/i.test(v)?"#2f8fd1":/menengah/i.test(v)?"#5fb14e":/rendah/i.test(v)?"#b7873e":/atas normal/i.test(v)?"#2f8fd1":/bawah normal/i.test(v)?"#d0782c":/normal/i.test(v)&&/kering/i.test(v)?"#b9cf3c":/normal/i.test(v)?"#5fb14e":/sangat kering|ekstrem/i.test(v)?"#b91c1c":/agak kering/i.test(v)?"#efd23a":/kering/i.test(v)?"#d9452b":/basah/i.test(v)?"#2f8fd1":"#94a3b8");
const chip2=v=>v?`<span class="c"><i style="background:${warnaKat(v)}"></i>${esc(v)}</span>`:"";
function gridKab(prov,rows,f){if(!Array.isArray(rows)||!rows.length)return "";return `<div class="prov">${prov}</div><div class="kgrid">${rows.map(r=>`<div class="kab"><b>${esc(r.kab)}</b>${f.map(k=>chip2(r[k])).join("")}${r.ket?`<small>${esc(r.ket)}</small>`:""}</div>`).join("")}</div>`}
function legend2(list,f){const s=new Set();list.forEach(rows=>(Array.isArray(rows)?rows:[]).forEach(r=>f.forEach(k=>r[k]&&s.add(r[k]))));return s.size?`<div class="legend">${[...s].map(k=>`<span><i style="background:${warnaKat(k)}"></i>${esc(k)}</span>`).join("")}</div>`:""}
const samaBulan=(a,b)=>{const m=x=>(String(x||"").toLowerCase().match(BLN_RE)||[""])[0].replace(/\s+/g," ");return !!m(a)&&m(a)===m(b)};
function petaDari(fn){const p=(Array.isArray(IK().peta)?IK().peta:[]).filter(fn);if(!p.length)return "";
 return `<div class="petas${p.length>1?" dua":""}">${p.slice(0,4).map(x=>`<figure class="map"><a href="${fileURL(x.file)}" target="_blank" rel="noopener"><img src="${fileURL(x.file)}" alt="${esc(x.judul)}" loading="lazy" onerror="this.closest('figure').remove()"></a><figcaption>${esc(x.judul)}${x.sumber?" · Sumber: "+esc(x.sumber):""}</figcaption></figure>`).join("")}</div>`}
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
  {lab:"Papua Barat",isi:gridKab("Papua Barat · Curah hujan dan sifat hujan",an.pb,["ch","sh"])+legend2([an.pb],["ch","sh"])+(an.teks_pb?`<p>${esc(an.teks_pb)}</p>`:"")+petaDari(x=>x.k==="analisis"&&x.prov!=="pbd")},
  {lab:"Papua Barat Daya",isi:gridKab("Papua Barat Daya · Curah hujan dan sifat hujan",an.pbd,["ch","sh"])+legend2([an.pbd],["ch","sh"])+(an.teks_pbd?`<p>${esc(an.teks_pbd)}</p>`:"")+petaDari(x=>x.k==="analisis"&&x.prov==="pbd")}])+
 tabPanel("Prakiraan Curah Hujan &amp; Sifat Hujan","hbp",pr.map(m=>({lab:esc(m.bulan),isi:gridKab("Papua Barat",m.pb,["ch","sh"])+gridKab("Papua Barat Daya",m.pbd,["ch","sh"])+legend2([m.pb,m.pbd],["ch","sh"])+(m.teks?`<p>${esc(m.teks)}</p>`:"")+petaDari(x=>x.k==="prakiraan"&&samaBulan(x.bulan,m.bulan))})))+
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
const blnSaja=t=>{const m=String(t||"").match(BLN_RE);return m?besarAwal(m[1].toLowerCase())+(m[2]?m[2]:""):String(t||"").trim()};
function zomNorm(m){return (Array.isArray(m&&m.zom)?m.zom:[]).map(z=>({no:parseInt(z.no,10)||z.no,wil:String(z.wil||""),awal:String(z.awal||""),banding:String(z.banding||""),sifat:String(z.sifat||""),puncak:String(z.puncak||"")})).filter(z=>z.no).sort((a,b)=>a.no-b.no)}
function hitung(arr,f){const m=new Map();arr.forEach(z=>{const v=f(z);if(v)m.set(v,(m.get(v)||0)+1)});return [...m.entries()]}
function pillBanding(v){return /maju/i.test(v)?"ok":/mundur/i.test(v)?"warn":""}
function pillSifat(v){return /atas/i.test(v)?"ok":/bawah/i.test(v)?"warn":""}
function halMusim(jenis){const m=IK()["musim_"+jenis],nm=jenis==="hujan"?"Musim Hujan":"Musim Kemarau",per=esc((m&&m.periode)||"");
 const zom=zomNorm(m),zAwal=zom.filter(z=>z.awal&&!/non|tipe 1|tidak/i.test(z.awal));
 const nosDari=f=>lab=>zom.filter(z=>f(z)===lab).map(z=>z.no);
 const bar=(arr,c,f,judul)=>{if(!arr.length)return "";const mx=Math.max(...arr.map(x=>x[1]));return `<div class="mbar klik">${arr.map(([l,v])=>`<button type="button" class="mrow" data-zom="${f?nosDari(f)(l).join(","):""}" data-jenis="${jenis}" data-judul="${esc((judul||"")+": "+l)}"><span>${esc(l)}</span><i style="width:${v/mx*100}%;background:${c}"></i><b>${v}</b></button>`).join("")}</div>`};
 const awal=hitung(zAwal,z=>blnSaja(z.awal)).sort((a,b)=>urutBulan(a[0])-urutBulan(b[0])),band=hitung(zom,z=>/maju/i.test(z.banding)?"Maju":/mundur/i.test(z.banding)?"Mundur":/sama/i.test(z.banding)?"Sama":""),
  sif=hitung(zom,z=>/atas/i.test(z.sifat)?"Atas Normal":/bawah/i.test(z.sifat)?"Bawah Normal":/normal/i.test(z.sifat)?"Normal":""),pun=hitung(zom,z=>blnSaja(z.puncak)).sort((a,b)=>urutBulan(a[0])-urutBulan(b[0]));
 const dom=a=>a.length?a.slice().sort((x,y)=>y[1]-x[1])[0]:null;
 const FN={awal:z=>z.awal&&!/non|tipe 1|tidak/i.test(z.awal)?blnSaja(z.awal):"",sifat:z=>/atas/i.test(z.sifat)?"Atas Normal":/bawah/i.test(z.sifat)?"Bawah Normal":/normal/i.test(z.sifat)?"Normal":"",puncak:z=>blnSaja(z.puncak),banding:z=>/maju/i.test(z.banding)?"Maju":/mundur/i.test(z.banding)?"Mundur":/sama/i.test(z.banding)?"Sama":""};
 const kartu=(c,lab,a,warna,k)=>{const d=dom(a);return d?`<div class="pk" style="--c:${c}"><span>${lab}</span><button type="button" class="pkh" data-zom="${nosDari(FN[k])(d[0]).join(",")}" data-jenis="${jenis}" data-judul="${esc(lab+": "+d[0])}"><b>${esc(d[0])}</b><em>${d[1]} ZOM</em></button>${bar(a,warna,FN[k],lab)}</div>`:""};
 const pt=[["musim-awal","Awal musim"],["musim-banding","Dibanding normal"],["musim-sifat","Sifat"],["musim-puncak","Puncak"]].map(([k,l])=>({lab:l,isi:petaDari(x=>x.k===k&&(x.sub||"hujan")===jenis)}));
 const rekoAdm=barisTH("musim_reko_"+jenis,"").filter(x=>x[1]).map(x=>[esc(x[0]),esc(x[1])]);const reko=rekoAdm.length?rekoAdm:jenis==="hujan"?[["Pangan","Sesuaikan jadwal tanam dengan kondisi hujan. Jaga saluran air di lahan dan siapkan pengeringan hasil panen."],["Kebencanaan","Bersihkan saluran air, siapkan jalur evakuasi, dan waspadai banjir serta longsor saat hujan lebat."],["Kesehatan","Jaga kebersihan lingkungan dan air minum, cegah gigitan nyamuk (malaria, demam berdarah)."]]
  :[["Sumber daya air","Hemat air dan tampung air hujan selagi masih turun. Periksa sumur dan sumber air bersih."],["Pangan","Pilih tanaman yang tahan kering dan atur jadwal tanam sesuai ketersediaan air."],["Kebakaran lahan","Jangan membakar lahan atau sampah. Laporkan titik api ke pihak berwenang."]];
 return head("Iklim >> Prakiraan "+nm,"Prediksi "+nm+(per?" "+per:""),`Hasil analisis kami untuk Provinsi Papua Barat dan Papua Barat Daya: kapan ${nm.toLowerCase()} dimulai, bagaimana sifatnya dibanding biasa, dan kapan puncaknya.`)+`
 ${m&&m.teks?`<div class="card prose" style="margin-bottom:18px"><p style="margin:0">${esc(m.teks)}</p></div>`:""}
 <h2 class="sec-title">Ringkasan${OTO}</h2><div class="pmh">${kartu("#15803d","Awal "+nm.toLowerCase(),awal,"#15803d","awal")}${kartu("#a16207","Sifat "+nm.toLowerCase(),sif,"#ca8a04","sifat")}${kartu("#1d4ed8","Puncak "+nm.toLowerCase(),pun,"#1d4ed8","puncak")}${kartu("#b45309","Dibanding normal",band,"#b45309","banding")}</div><p class="note ketukzom">👆 Ketuk angka atau baris mana pun untuk melihat ZOM dan wilayahnya.</p>
 <p class="note">Angka adalah jumlah Zona Musim (ZOM) pada tiap kelompok.</p>
 ${tabPanel("Peta Prediksi "+nm+(per?" "+per:""),"pm"+jenis,pt)}
 <div class="panel"><div class="panel-head"><span>Prediksi per Zona Musim</span></div><div class="panel-body">${tbl(["ZOM","Wilayah","Awal","Dibanding normal","Sifat","Puncak"],zom.map(z=>[`<b>${esc(z.no)}</b>`,esc(z.wil)||"–",esc(z.awal)||"–",z.banding?`<span class="pill ${pillBanding(z.banding)}">${esc(z.banding)}</span>`:"–",z.sifat?`<span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:"–",esc(z.puncak)||"–"]))}
 <p class="note">Cari distrik Anda di kolom Wilayah, atau buka <a href="#wilayah">Info Wilayah Saya</a>.</p></div></div>
 <h2 class="sec-title" style="margin-top:26px">Rekomendasi</h2><div class="grid3 reko">${reko.map(([j,t])=>`<div class="card"><b>${j}</b><p style="margin:6px 0 0;color:var(--muted);font-size:14px">${t}</p></div>`).join("")}</div>
 ${awam("Cara membaca prediksi musim",[
  "<b>ZOM (Zona Musim)</b> adalah wilayah yang pola hujannya punya perbedaan jelas antara musim hujan dan kemarau. Satu ZOM bisa mencakup beberapa distrik dari beberapa kabupaten.",
  jenis==="hujan"?"<b>Awal musim hujan</b> adalah saat hujan mulai turun rutin: dalam 10 hari hujan mencapai 50 mm atau lebih, dan berlanjut di 10 hari-10 hari berikutnya.":"<b>Awal musim kemarau</b> adalah saat hujan mulai jarang: dalam 10 hari hujan kurang dari 50 mm, dan berlanjut di 10 hari-10 hari berikutnya.",
  "<b>Maju</b> berarti musim datang lebih cepat dari biasanya, <b>Mundur</b> lebih lambat, <b>Sama</b> seperti biasanya. Pembandingnya adalah rata-rata 1991–2020.",
  "<b>Atas Normal</b> berarti hujan lebih banyak dari rata-rata 1991–2020 (lebih dari 115%), <b>Normal</b> 85–115% dari rata-rata, <b>Bawah Normal</b> kurang dari 85% dari rata-rata.",
  jenis==="hujan"?"<b>Puncak musim hujan</b> adalah bulan dengan hujan paling banyak, saat risiko banjir dan longsor paling tinggi.":"<b>Puncak musim kemarau</b> adalah bulan dengan hujan paling sedikit, saat risiko kekeringan dan kebakaran lahan paling tinggi."])}
 <p class="note">Sumber: ${esc(IK().sumber||"dokumen prediksi musim kami")}. Dokumen lengkap ada di halaman <a href="#publikasi">Publikasi</a>.</p>`}
{const asli=P["prakiraan-musim"];P["prakiraan-musim"]=()=>dariDok("musim_hujan")&&zomNorm(IK().musim_hujan).length?halMusim("hujan"):asli()}
P["prakiraan-musim-kemarau"]=()=>dariDok("musim_kemarau")&&zomNorm(IK().musim_kemarau).length?halMusim("kemarau"):head("Iklim >> Prakiraan Musim Kemarau","Prediksi Musim Kemarau","Kapan musim kemarau dimulai, sifatnya dibanding biasa, dan kapan puncaknya di Papua Barat dan Papua Barat Daya.")+`
 <div class="card prose"><h3 style="margin-top:0">Prediksi musim kemarau belum terbit</h3><p>Prediksi Musim Kemarau biasanya kami terbitkan sekitar Februari–Maret. Halaman ini akan terisi sendiri begitu Press Release atau paparan Prediksi Musim Kemarau diunggah petugas.</p>
 <p>Sementara itu, lihat <a href="#prakiraan-musim">Prediksi Musim Hujan</a> yang sedang berlaku dan <a href="#hari-tanpa-hujan">Monitoring Hari Tanpa Hujan</a>.</p></div>
 ${awam("Apa itu musim kemarau?",["<b>Awal musim kemarau</b> adalah saat hujan mulai jarang: dalam 10 hari hujan kurang dari 50 mm, dan berlanjut di 10 hari-10 hari berikutnya.","Wilayah <b>Tipe 1 Musim</b> (Non-ZOM) hujan hampir sepanjang tahun, sehingga awal musim kemaraunya tidak ditentukan."])}`;

/* ---------- tabel ZOM terbaru untuk halaman Zona Musim ---------- */
function zomTerbaru(){const m=IK().musim_hujan,z=zomNorm(m);if(z.length)return {judul:"Musim Hujan "+((m&&m.periode)||""),zom:z};
 return {judul:"Musim Hujan 2026/2027",zom:ZOM11.map(x=>({no:x.no,wil:x.wil,awal:(ZOM_PMH[x.no]||[])[0]||(x.okt?"Oktober 2026":"Nov 2026 – Mar 2027"),banding:x.banding,sifat:x.sifat,puncak:(ZOM_PMH[x.no]||[])[3]||""}))}}

/* =====================================================================
   INFO WILAYAH SAYA
   ===================================================================== */
const KAB_SEMUA=[...PB7.map(k=>[k,"pb"]),...PBD6.map(k=>[k,"pbd"])];
const normKab=s=>{s=String(s||"").replace(/^\s*(kabupaten|kab\.?)\s*/i,"").trim();return /^sorong$/i.test(s)?"Kab. Sorong":s};
const samaKab=(a,b)=>normKab(a).toLowerCase()===normKab(b).toLowerCase();
function distrikPerKab(zom){const m={};zom.forEach(z=>{String(z.wil).replace(/(Kab\.|Kabupaten|Kota)\s*([^(;]+?)\s*\(([^)]*)\)/gi,(_,j,nama,d)=>{const kab=/kota/i.test(j)?"Kota "+nama.replace(/^kota\s*/i,"").trim():normKab(nama);
  d.split(/,|\bdan\b/).map(x=>x.trim().replace(/\.$/,"")).filter(Boolean).forEach(x=>{const k=(m[kab]=m[kab]||{});(k[x]=k[x]||[]).push(z.no)})})});return m}
function zomUntuk(kab,dis){const t=zomTerbaru(),pk=distrikPerKab(t.zom);const kk=Object.keys(pk).find(k=>samaKab(k,kab));const d=kk?pk[kk]:{};
 const tb=String((WIL_ADM().distrik||{})[slugK(kab)]||"").split(/,|\n/).map(x=>x.trim()).filter(Boolean);
 const nos=dis?(d[dis]||[]):[...new Set(Object.values(d).flat())];return {t,nos,distrik:[...new Set([...Object.keys(d),...tb])].sort()}}
function baris(rows,kab){return (Array.isArray(rows)?rows:[]).find(r=>samaKab(r.kab,kab))}
/* lampu lalu lintas: ok = aman/seperti biasa, warn = perlu waspada, bad = perlu perhatian, info = keterangan */
const LAMPU_TEKS={ok:"Aman / seperti biasa",warn:"Perlu waspada",bad:"Perlu perhatian",info:""};
function lampuHujan(ch,sh){ch=String(ch||"");sh=String(sh||"");if(/sangat tinggi/i.test(ch))return "bad";if(/bawah normal|atas normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh))return "warn";if(/tinggi/i.test(ch)&&!/sangat/i.test(ch))return "warn";return ch||sh?"ok":"info"}
function lampuSpi(k){k=String(k||"");return /ekstrem kering|sangat kering/i.test(k)?"bad":/kering/i.test(k)&&!/normal/i.test(k)?"warn":/sangat basah|ekstrem basah/i.test(k)?"warn":k?"ok":"info"}
const IKON_W={per:"⚠️",musim:"📅",kemarau:"🌤️",hujan:"🌧️",pra:"🌦️",spi:"☀️",normal:"📊",alat:"📡",catat:"📝"};
function isiWilayah(kab,dis){const prov=(KAB_SEMUA.find(x=>x[0]===kab)||[])[1]||"pb",provNama=prov==="pbd"?"Papua Barat Daya":"Papua Barat";
 const {t,nos}=zomUntuk(kab,dis),zs=t.zom.filter(z=>nos.includes(z.no)),kem=zomNorm(IK().musim_kemarau).filter(z=>nos.includes(z.no));
 const an=bagIK("analisis"),pr=(bagIK("prakiraan").bulan||[]),sp=bagIK("spi");
 const ra=baris(an[prov],kab),rs=baris(sp[prov],kab);
 const kunciCari=normKab(kab).replace(/^Kab\. /,"").toLowerCase();
 const per=daftarPeringatan().filter(x=>{const w=String(x.wilayah||"").toLowerCase();return w.includes(kunciCari)||(x.pusat&&(prov==="pbd"?/papua barat daya/.test(w):/papua barat(?!\s*daya)/.test(w)))});
 const alat=ALAT.filter(a=>a.wil&&samaKab(a.wil,kab));
 const kartu=(judul,isi,arti,manual,lv,ik)=>`<div class="card wilk reveal lv-${lv||"info"}"><span class="eyebrow">${ik?`<i class="wik" aria-hidden="true">${ik}</i>`:""}${judul}${manual?"":OTO}</span>${lv&&lv!=="info"?`<span class="lampu"><i></i>${LAMPU_TEKS[lv]}</span>`:""}${isi}${arti?`<p class="wilarti"><b>Artinya:</b> ${arti}</p>`:""}</div>`;
 const out=[],cat=(WIL_ADM().catatan||{})[slugK(kab)];
 if(cat)out.push(kartu("Catatan dari kami",`<p class="wilp">${esc(cat).replace(/\n/g,"<br>")}</p>`,"",1,"info",IKON_W.catat));
 out.push(kartu("Peringatan dini",per.length?per.map(x=>`<p class="wilp"><span class="pill ${x.status==="awas"?"bad":x.status==="siaga"?"bad":"warn"}">${NAMA_STATUS[x.status]}</span> ${JENIS_PENDEK[x.jenis]} · ${esc(potong(x.wilayah,90))}</p>`).join(""):`<p class="wilp"><span class="pill ok">Tidak ada</span> Tidak ada peringatan untuk ${esc(kab)} saat ini.</p>`,
  per.length?`ada peringatan ${per.map(x=>NAMA_STATUS[x.status]).join(", ")} yang mencakup wilayah ini. Buka <a href="${linkJenis(per[0].jenis)}">halaman peringatan</a> untuk langkah yang perlu dilakukan.`:"",0,per.some(x=>x.status==="awas"||x.status==="siaga")?"bad":per.length?"warn":"ok",IKON_W.per));
 out.push(kartu(t.judul,zs.length?zs.map(z=>`<p class="wilp"><b>ZOM ${esc(z.no)}</b> · awal ${esc(z.awal||"–")}${z.banding?` · <span class="pill ${pillBanding(z.banding)}">${esc(z.banding)}</span>`:""}${z.sifat?` · <span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:""}${z.puncak?` · puncak ${esc(z.puncak)}`:""}</p>`).join(""):`<p class="wilp">${dis?"Distrik ini":"Kabupaten ini"} tidak tercantum di daftar Zona Musim yang kami terima, kemungkinan termasuk <b>Tipe 1 Musim</b> (hujan hampir sepanjang tahun).</p>`,
  zs.length?`musim hujan di ${dis?esc(dis):esc(kab)} diprediksi dimulai ${esc(zs[0].awal||"–")}${zs[0].sifat?`, dengan hujan ${SIFAT_ARTI(zs[0].sifat)}`:""}.`:"",0,"info",IKON_W.musim));
 if(kem.length)out.push(kartu("Musim Kemarau "+esc((IK().musim_kemarau||{}).periode||""),kem.map(z=>`<p class="wilp"><b>ZOM ${esc(z.no)}</b> · awal ${esc(z.awal||"–")}${z.sifat?` · <span class="pill ${pillSifat(z.sifat)}">${esc(z.sifat)}</span>`:""}${z.puncak?` · puncak ${esc(z.puncak)}`:""}</p>`).join(""),"",0,"info",IKON_W.kemarau));
 if(ra)out.push(kartu("Hujan "+esc(an.bulan||"bulan lalu"),`<p class="wilp">${chip2(ra.ch)} ${chip2(ra.sh)}</p>${ra.ket?`<p class="wilp">${esc(ra.ket)}</p>`:""}`,HUJAN_ARTI(ra.ch)?`turun ${HUJAN_ARTI(ra.ch)}${SIFAT_ARTI(ra.sh)?", "+SIFAT_ARTI(ra.sh):""}.${teksNormal(kab,an.bulan,ra.sh)}`:"",0,lampuHujan(ra.ch,ra.sh),IKON_W.hujan));
 pr.forEach(m=>{const r=baris(m[prov],kab);if(r)out.push(kartu("Prakiraan "+esc(m.bulan),`<p class="wilp">${chip2(r.ch)} ${chip2(r.sh)}</p>${r.ket?`<p class="wilp">${esc(r.ket)}</p>`:""}`,HUJAN_ARTI(r.ch)?`diperkirakan turun ${HUJAN_ARTI(r.ch)}${SIFAT_ARTI(r.sh)?", "+SIFAT_ARTI(r.sh):""}.${teksNormal(kab,m.bulan,r.sh)}`:"",0,lampuHujan(r.ch,r.sh),IKON_W.pra))});
 if(rs)out.push(kartu("Kekeringan (SPI) "+esc(sp.bulan||""),`<p class="wilp">${chip2(rs.kat)}</p>${rs.ket?`<p class="wilp">${esc(rs.ket)}</p>`:""}`,artiKartu({kunci:"spi",nilai:rs.kat}),0,lampuSpi(rs.kat),IKON_W.spi));
 {const kn=kartuNormal(kab);if(kn)out.push(kartu("Normal hujan bulanan",kn,"",1,"info",IKON_W.normal))}
 out.push(kartu("Alat pengamatan di wilayah ini",alat.length?alat.map(a=>{const r=LAST[a.id],n=(r&&r.nilai)||{},hj=nv(n,"hujan"),su=nv(n,"suhu"),v=(cek,x,d,u,lab)=>`<div><span>${lab}</span>${cek?`<b class="cek">${CEK_TEKS}</b>`:`<b>${typeof x==="number"?fmt(x,d):"–"}<small> ${u}</small></b>`}</div>`;
  return `<div class="walat"><a href="#alat-${a.id}">${esc(a.nama)} ›</a>${r?`<div class="walatv">${v(sensorCek(n,"hujan"),hj,1,"mm","Hujan hari ini")}${a.jenis==="AWS"?v(sensorCek(n,"suhu"),su,1,"°C","Suhu"):""}</div>`:`<p class="wilp">Belum ada data</p>`}</div>`}).join(""):`<p class="wilp">Belum ada AWS/ARG kami di wilayah ini. Lihat <a href="#peralatan">semua peralatan</a>.</p>`,"",0,"info",IKON_W.alat));
 /* ringkasan 5 detik */
 const nama=dis?dis+", "+namaKab(kab):namaKab(kab),bi=new Date().getMonth(),blnIni=pr.find(m=>idxBulan(m.bulan)===bi)||pr[0],rb=blnIni&&baris(blnIni[prov],kab);
 const sifatPendek=sh=>/bawah normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh)?"lebih kering dari biasanya":/atas normal/i.test(sh)&&!/normal\s*[–-]/i.test(sh)?"lebih basah dari biasanya":/normal/i.test(sh)?"seperti biasanya":"";
 const hujanPendek=ch=>/sangat tinggi/i.test(ch)?"hujan sangat banyak":/tinggi/i.test(ch)?"hujan banyak":/menengah|sedang/i.test(ch)?"hujan sedang":/rendah/i.test(ch)?"hujan sedikit":"";
 const R=[];
 R.push(per.length?[per.some(x=>x.status==="awas"||x.status==="siaga")?"bad":"warn","⚠️",`Ada peringatan ${per.map(x=>NAMA_STATUS[x.status]+" "+(JENIS_PENDEK[x.jenis]||"")).join(", ").toLowerCase()}`]:["ok","✅","Tidak ada peringatan dini saat ini"]);
 if(rb)R.push([lampuHujan(rb.ch,rb.sh),"🌧️",`${besarAwal(String(blnIni.bulan||"").split(" ")[0]||"Bulan ini")}: ${[hujanPendek(rb.ch),sifatPendek(rb.sh)].filter(Boolean).join(", ")||esc(rb.ch)}`]);
 if(rs)R.push([lampuSpi(rs.kat),"☀️",lampuSpi(rs.kat)==="ok"&&!/kering/i.test(rs.kat)?"Belum ada kekeringan":"Kekeringan: "+esc(String(rs.kat).toLowerCase())]);
 if(zs.length&&zs[0].awal)R.push(["info","📅",`${/kemarau/i.test(t.judul)?"Musim kemarau":"Musim hujan"} mulai ${esc(zs[0].awal)}`]);else if(!zs.length)R.push(["info","📅","Hujan hampir sepanjang tahun (tanpa musim tegas)"]);
 {const a0=alat.find(a=>LAST[a.id]&&typeof nv(LAST[a.id].nilai||{},"hujan")==="number"&&!sensorCek(LAST[a.id].nilai||{},"hujan"));if(a0){const n=LAST[a0.id].nilai||{},su=nv(n,"suhu");R.push(["info","📡",`Hujan hari ini ${fmt(nv(n,"hujan"),1)} mm${a0.jenis==="AWS"&&typeof su==="number"&&!sensorCek(n,"suhu")?" · suhu "+fmt(su,1)+" °C":""} (${esc(a0.nama)})`])}}
 const teksWA=`Info iklim ${nama} (BMKG Staklim Papua Barat):\n`+R.map(r=>r[1]+" "+r[2].replace(/<[^>]+>/g,"").replace(/&amp;/g,"&")).join("\n")+`\n\nSelengkapnya: ${location.origin.startsWith("http")?location.origin:"https://staklim-pabar.pages.dev"}${RUTE_PATH?"/"+slugKab(kab):"/"+slugKab(kab)}`;
 const ring=`<div class="wilring"><div class="wrh"><span class="eyebrow">Ringkasan ${esc(nama)}</span><a class="wabtn" href="https://wa.me/?text=${encodeURIComponent(teksWA)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>Bagikan ke WhatsApp</a></div>
 <ul>${R.map(([lv,ik,tx])=>`<li class="lv-${lv}"><i aria-hidden="true">${ik}</i><span>${tx}</span></li>`).join("")}</ul><p class="wrket">Penjelasan lengkap tiap bagian ada di bawah ↓</p></div>`;
 return `${ring}<div class="wilgrid">${out.join("")}</div>
 <div class="wilbaca"><b>Cara membaca:</b> <span class="lampu lv-ok"><i></i>hijau</span> aman/seperti biasa, <span class="lampu lv-warn"><i></i>kuning</span> perlu waspada (lebih kering atau lebih basah dari biasanya), <span class="lampu lv-bad"><i></i>merah</span> perlu perhatian. <b>Kategori hujan</b> (Rendah sampai Sangat Tinggi) menunjukkan jumlah hujan sebulan, sedangkan <b>sifat hujan</b> membandingkannya dengan rata-rata 30 tahun (1991–2020) bulan yang sama di wilayah ini: Bawah Normal kurang dari 85%, Normal 85–115%, Atas Normal lebih dari 115%.</div>
 <p class="note">Ringkasan dari dokumen terbaru kami dan BMKG Pusat untuk ${esc(provNama)}. Rincian ada di halaman Iklim masing-masing.</p>`}
/* pengaturan wilayah dari Admin: normal hujan bulanan (mm), distrik tambahan, catatan */
const WIL_ADM=()=>((KA&&KA.pengaturan&&KA.pengaturan.wilayah)||{});
const slugK=k=>normKab(k).replace(/[^A-Za-z0-9]+/g,"_");
const idxBulan=t=>{const u=urutBulan(t);return u===99999?-1:u%12};
const normalKab=(kab,bi)=>{const a=(WIL_ADM().normal||{})[slugK(kab)];const v=a&&bi>=0?+a[bi]:0;return v>0?Math.round(v):0};
function teksNormal(kab,bulan,sh){const bi=idxBulan(bulan),n=normalKab(kab,bi),s=String(sh||""),rentang=/–|-/.test(s.replace(/^\s+|\s+$/g,""))&&/normal.*normal/i.test(s);
 if(n){const lo=Math.round(n*.85),hi=Math.round(n*1.15);
  const b=rentang?` Sifat ${esc(s)} berarti sebagian wilayah di bawah ±${lo} mm dan sebagian di atas ±${hi} mm.`:/bawah/i.test(s)?` Bawah Normal berarti hujan kurang dari ±${lo} mm (85% dari normal).`:/atas/i.test(s)?` Atas Normal berarti hujan lebih dari ±${hi} mm (115% dari normal).`:/normal/i.test(s)?` Normal berarti hujan sekitar ${lo}–${hi} mm.`:"";
  return ` Normalnya (rata-rata 1991–2020) hujan bulan ${BLN_ID[bi]} di ${esc(kab)} sekitar <b>${n} mm</b>.${b}`}
 return ""}
function kartuNormal(kab){const a=(WIL_ADM().normal||{})[slugK(kab)];if(!a||!a.some(v=>+v>0))return "";const mx=Math.max(...a.map(v=>+v||0));
 return `<div class="nbar" role="img" aria-label="Normal hujan bulanan ${esc(kab)}">${BLN_ID.map((b,i)=>{const v=+a[i]||0;return `<div title="${b}: ${v?v+" mm":"–"}"><i style="height:${v?Math.max(4,v/mx*100):0}%"></i><span>${b.slice(0,1)}</span></div>`}).join("")}</div><p class="wilp" style="font-size:13px;color:var(--muted)">Tertinggi ${BLN_ID[a.map(v=>+v||0).indexOf(mx)]} (${Math.round(mx)} mm). Rata-rata 1991–2020.</p>`}
let WIL_PILIH=(()=>{try{return JSON.parse(localStorage.getItem("wilayah_v1")||"null")}catch(e){return null}})()||{kab:"Manokwari",dis:""};
P.wilayah=()=>{const {distrik}=zomUntuk(WIL_PILIH.kab,"");
 return head("Info Wilayah","Info Iklim untuk Wilayah Saya","Pilih kabupaten/kota dan distrik tempat Anda tinggal. Semua informasi iklim untuk wilayah itu tampil di satu halaman.")+`
 <div class="card wilpilih"><label>Kabupaten/Kota<select id="wilKab">${["pb","pbd"].map(p=>`<optgroup label="${p==="pb"?"Papua Barat":"Papua Barat Daya"}">${KAB_SEMUA.filter(x=>x[1]===p).map(([k])=>`<option${k===WIL_PILIH.kab?" selected":""}>${esc(k)}</option>`).join("")}</optgroup>`).join("")}</select></label>
 <label>Distrik<select id="wilDis"><option value="">Semua distrik</option>${distrik.map(d=>`<option${d===WIL_PILIH.dis?" selected":""}>${esc(d)}</option>`).join("")}</select></label></div>
 <div id="wilIsi">${isiWilayah(WIL_PILIH.kab,distrik.includes(WIL_PILIH.dis)?WIL_PILIH.dis:"")}</div>
 <section class="sec"><div class="sechead"><div><span class="eyebrow">Halaman per wilayah</span><h2>Iklim Setiap Kabupaten/Kota</h2></div></div>
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
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||p.closest("a,button,svg,script,style,textarea,input,select,option,h1,h2,h3,label,.istilah,.hslider,.admbox,.legend,figcaption,.pill,.kab b,th,.crumb,.eyebrow,.panel-head"))return NodeFilter.FILTER_REJECT;return RE_ISTILAH.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});
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
 const namaBln=b=>{const [y,m]=b.split("-");return BLN_ID[+m-1]+" "+y};
 return `<div class="panel" id="rekapPanel"><div class="panel-head"><span>Rekap Harian · ${esc(namaBln(pilih))}${OTO}</span><div class="rekapaksi"><select id="rekapBln" aria-label="Pilih bulan">${bulan.map(b=>`<option value="${b}"${b===pilih?" selected":""}>${esc(namaBln(b))}</option>`).join("")}</select><button type="button" class="pbtn kecil" id="rekapCsv" data-id="${esc(id)}">Unduh CSV</button></div></div><div class="panel-body">
 ${tbl(aws?["Tanggal","Suhu rata-rata","Suhu min–maks","Kelembapan","Hujan","Angin rata-rata","Arah angin"]:["Tanggal","Hujan"],rows.map(h=>{const tg=+h[0].slice(8,10)+" "+BLN3[BLN_ID[+h[0].slice(5,7)-1].toLowerCase()]+(h[9]==="berjalan"?" <small>(berjalan)</small>":"");
  const c=h.cek||{},dc='<small class="cek">sensor diperiksa</small>',g=(i,t)=>c[i]?dc:t;
  return aws?[tg,g(1,f(h[1],1)+" °C"),c[2]||c[3]?dc:f(h[2],1)+" – "+f(h[3],1)+" °C",g(4,f(h[4],0)+" %"),g(5,f(h[5],1)+" mm"),g(6,f(h[6],1)+" m/s"),c[6]?"–":h[7]==null?(h[6]===0?"Tenang":"–"):ARAH16(h[7])+" ("+h[7]+"°)"]:[tg,g(5,f(h[5],1)+" mm")]}))}
 <p class="note">Satu hari dihitung pukul 09.00–09.00 WIT (00–24 UTC), mengikuti pencatatan hujan logger. Hujan adalah total harian. File CSV berisi seluruh rekap (hingga 6 bulan) dan bisa dibuka di Excel.</p></div></div>`}
/* baris rekap: [tgl, suhu rata, suhu min, suhu maks, RH, hujan, angin, arah, jumlah data, (berjalan)] */
const KOLOM_REKAP={1:"suhu",2:"suhu",3:"suhu",4:"rh",5:"hujan",6:"ws"};
function rapikanBarisRekap(h){if(!Array.isArray(h))return h;const b=h.slice();b.cek={};
 Object.entries(KOLOM_REKAP).forEach(([i,k])=>{const v=b[i];if(typeof v==="number"&&(v<BATAS_WAJAR[k][0]||v>BATAS_WAJAR[k][1])){b[i]=null;b.cek[i]=1;if(+i===6)b[7]=null}});return b}
function isiRekap(id){if(!DATA_URL||REKAP_CACHE[id]&&!REKAP_CACHE[id].galat&&Date.now()-REKAP_CACHE[id].t<600000){const b=document.getElementById("rekapBox");if(b)b.innerHTML=rekapHTML(id);return}
 fetch(DATA_URL.replace(/\/terkini$/,"/rekap")+"?id="+encodeURIComponent(sumberId(id))).then(r=>{if(!r.ok)throw 0;return r.json()}).then(j=>{if(Array.isArray(j.hari))j.hari=j.hari.map(rapikanBarisRekap);REKAP_CACHE[id]={...j,t:Date.now()}}).catch(()=>{REKAP_CACHE[id]={galat:1,t:Date.now()}}).then(()=>{const b=document.getElementById("rekapBox");if(b&&cur==="alat-"+id)b.innerHTML=rekapHTML(id)})}
/* lokasi asli alat (dipakai bila tampilan dua AWS ditukar, lihat TUKAR_DATA) */
const LOKASI_ASLI={"STA2288":"Anday, Manokwari","160009":"Ransiki, Manokwari Selatan"};
function infoTukar(id){const sid=sumberId(id);if(sid===id)return null;const asli=ALAT.find(x=>x.id===sid);return asli?{nama:asli.nama,id:sid,lokasi:LOKASI_ASLI[sid]||asli.wil||""}:null}
function tanyaUnduh(id){const a=ALAT.find(x=>x.id===id),t=infoTukar(id);if(!t){unduhCSV(id);return}
 let d=document.getElementById("dlgTukar");if(d)d.remove();d=document.createElement("div");d.id="dlgTukar";d.className="dlgbg";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-labelledby","dlgTukarJ");
 d.innerHTML=`<div class="dlg"><h3 id="dlgTukarJ">Perhatian: tampilan dua AWS ditukar</h3>
 <p>Tampilan data <b>${esc(a.nama)}</b> dan <b>${esc(t.nama)}</b> di web ini sengaja ditukar, karena penamaan di server pusat tertukar.</p>
 <p>Data di halaman <b>${esc(a.nama)}</b> sebenarnya berasal dari alat <b>${esc(t.nama)} (${esc(t.id)})</b> yang berada di <b>${esc(t.lokasi)}</b>. File akan diberi nama sesuai alat aslinya.</p>
 <label class="dlgcek"><input type="checkbox" id="dlgTukarCek"><span>Ya, saya ingin mengunduh data untuk daerah <b>${esc(t.lokasi)}</b></span></label>
 <div class="dlgaksi"><button type="button" class="mini" data-dlg="batal">Batal</button><button type="button" class="pbtn kecil" data-dlg="ok" disabled>Unduh CSV</button></div></div>`;
 document.body.appendChild(d);const ok=d.querySelector('[data-dlg="ok"]'),cek=d.querySelector("#dlgTukarCek"),tutup=()=>{d.remove();document.removeEventListener("keydown",esk)},esk=e=>{if(e.key==="Escape")tutup()};
 cek.onchange=()=>{ok.disabled=!cek.checked};d.onclick=e=>{if(e.target===d||e.target.dataset.dlg==="batal")tutup();else if(e.target.dataset.dlg==="ok"&&cek.checked){tutup();unduhCSV(id)}};document.addEventListener("keydown",esk);cek.focus()}
const ketRekap=h=>[h[9]==="berjalan"?"hari berjalan":"",h.cek&&Object.keys(h.cek).length?"sebagian nilai dikosongkan: sensor sedang diperiksa (nilai tidak wajar)":""].filter(Boolean).join("; ");
function unduhCSV(id){const a=ALAT.find(x=>x.id===id),r=REKAP_CACHE[id];if(!a||!r||!r.hari)return;const t=infoTukar(id),nmAsli=t?t.nama:a.nama,idAsli=t?t.id:a.id,lok=t?t.lokasi:(LOKASI_ASLI[a.id]&&!TUKAR_DATA[a.id]?LOKASI_ASLI[a.id]:a.wil||"");const aws=a.jenis==="AWS",ang=v=>v==null?"":String(v).replace(".",",");
 const kep=aws?["Tanggal (UTC)","Suhu rata-rata (°C)","Suhu minimum (°C)","Suhu maksimum (°C)","Kelembapan rata-rata (%)","Curah hujan (mm)","Kecepatan angin rata-rata (m/s)","Arah angin rata-rata (°)","Arah angin","Jumlah data","Keterangan"]:["Tanggal (UTC)","Curah hujan (mm)","Jumlah data","Keterangan"];
 const isi=r.hari.map(h=>aws?[h[0],ang(h[1]),ang(h[2]),ang(h[3]),ang(h[4]),ang(h[5]),ang(h[6]),ang(h[7]),h[7]==null?(h[6]===0?"Tenang":""):arahPanjang(h[7]),h[8],ketRekap(h)]:[h[0],ang(h[5]),h[8],ketRekap(h)]);
 const csv="﻿"+["Stasiun Klimatologi Papua Barat - "+nmAsli+" ("+idAsli+")"+(lok?" - lokasi "+lok:""),...(t?["Catatan: di web data ini tampil pada halaman "+a.nama+" karena penamaan di server pusat tertukar. Alat aslinya "+nmAsli+" ("+idAsli+") di "+lok+"."]:[]),"Satu hari = 00.00-24.00 UTC (09.00-09.00 WIT). Pemisah kolom titik koma; desimal koma.",kep.join(";"),...isi.map(x=>x.join(";"))].join("\r\n");
 const u=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})),l=document.createElement("a");l.href=u;l.download=("rekap-harian-"+nmAsli+"-"+idAsli+(lok?"-"+lok:"")).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+$/,"")+".csv";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
document.addEventListener("change",e=>{if(e.target&&e.target.id==="rekapBln"){const id=cur.slice(5);if(REKAP_CACHE[id]){REKAP_CACHE[id].bulan=e.target.value;const b=document.getElementById("rekapBox");if(b)b.innerHTML=rekapHTML(id)}}});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#rekapCsv");if(b)tanyaUnduh(b.dataset.id)});

/* =====================================================================
   ADMIN: membaca tabel & peta dari dokumen, menyimpan isi halaman Iklim
   ===================================================================== */
const BAGIAN_CARI={analisis:t=>/(distribusi|analisis)\s+(curah|sifat)\s+hujan/i.test(t)&&!/prakiraan/i.test(t)&&!/hari tanpa hujan/i.test(t),prakiraan:t=>/prakiraan\s+(curah|sifat)\s+hujan\s+bulan/i.test(t),ekstrem:t=>/ekstrem/i.test(t)&&/lebat/i.test(t),
 hth:t=>/hari tanpa hujan/i.test(t),spi:t=>/presipitasi terstandarisasi|\bSPI\b/.test(t)};
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
    t=t.replace(/\s+/g," ").trim().replace(/\b(Papua Barat Daya|Papua Barat)(\s+\1)+/g,"$1");const m=t.match(/Gambar\s*\d[^]*$/i);if(m)kapsi.push({t:m[0].slice(0,220),y:b.y,x0,x1})})});
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
async function isiIklimDariDokumen(file,d){if(extDok(file)!=="pdf")return null;const hasil={bagian:[],peta:0};
 pesan("Membaca halaman, tabel, dan peta di dalam dokumen…");const {hal,peta,tata}=await bacaPdfLengkap(file);const semua=hal.join("\n");
 let dt={};try{dt=bangunDariTata(hal,tata,d.judul)}catch(er){dt={}}
 const isi=JSON.parse(JSON.stringify(IK()||{}));delete isi.diubah;
 const musim=/prediksi musim|press release|fgd|paparan/i.test(d.jenis+" "+d.judul)||/prediksi musim (hujan|kemarau)/i.test(semua.slice(0,3000));
 const tugas=musim?["musim"]:["analisis","prakiraan","ekstrem","hth","spi"];
 const lok={};if(!musim){try{lok.hth=hthDariTata(tata)}catch(er){}try{lok.ekstrem=ekstremDariTata(tata)}catch(er){}try{lok.spi=spiDariTata(tata)}catch(er){}
  const E=edisiKey(d.judul),bA=E?besarAwal(BULAN_ID[(E-1)%12])+" "+Math.floor((E-1)/12):dt.analisis&&dt.analisis.bulan;["hth","ekstrem","spi"].forEach(k=>{if(lok[k]&&(E||!lok[k].bulan))lok[k].bulan=bA||lok[k].bulan||""})}
 for(let i=0;i<tugas.length;i++){const b=tugas[i];
  if(lok[b]){isi[b]={...lok[b],_sumber:d.judul};hasil.bagian.push(b);continue}
  const tx=b==="musim"?semua:hal.filter(BAGIAN_CARI[b]).join("\n");if(tx.length<150)continue;
  /* tabel analisis & prakiraan dibaca langsung dari letak kata; AI hanya dipakai bila tabelnya tidak ditemukan */
  if(b==="analisis"&&dt.analisis){const a=dt.analisis,hA=hal.filter(BAGIAN_CARI.analisis);a.teks_pb=kalimatPenting(hA,"pb");a.teks_pbd=kalimatPenting(hA,"pbd");a._sumber=d.judul;isi.analisis=a;hasil.bagian.push(b);continue}
  if(b==="prakiraan"&&dt.prakiraan){dt.prakiraan.bulan.forEach(m=>{const hp=hal.filter(t=>BAGIAN_CARI.prakiraan(t)&&new RegExp("bulan\\s+"+m.bulan.split(" ")[0],"i").test(t));m.teks=kalimatPenting(hp,"")});isi.prakiraan={...dt.prakiraan,_sumber:d.judul};hasil.bagian.push(b);continue}
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
   else if(b==="musim"&&Array.isArray(o.zom)&&o.zom.length){const jn=/kemarau/i.test(o.jenis||"")||/kemarau/i.test(d.jenis+" "+d.judul)?"kemarau":"hujan";isi["musim_"+jn]=o;hasil.bagian.push("musim "+jn)}}catch(er){}}
 /* unggah peta, ganti peta lama yang sejenis */
 const baru=[];for(const p of peta){try{pesan(`Mengunggah peta ${baru.length+1} dari ${peta.length}…`);const bl=await gambarKeBlob(p.img,1400);if(!bl)continue;
   const u=await admUnggah(new File([bl],"peta-"+(p.k+"-"+(p.prov||"")+"-"+p.hal)+".jpg",{type:"image/jpeg"}));baru.push({k:p.k,sub:p.sub||"",prov:p.prov||"",bulan:p.bulan||"",judul:p.judul,file:u.kunci,sumber:d.judul})}catch(er){}}
 const lama=(Array.isArray(isi.peta)?isi.peta:[]).filter(x=>!baru.some(b=>b.k===x.k&&(b.sub||"")===(x.sub||"")));isi.peta=[...baru,...lama].slice(0,60);hasil.peta=baru.length;
 if(!musim)hasil.basi=tugas.filter(b=>!hasil.bagian.includes(b)&&isi[b]&&Object.keys(isi[b]).length&&isi[b]._sumber!==d.judul).map(b=>{if(!isi[b]._sumber)isi[b]._sumber=isi.sumber||"dokumen sebelumnya";return b});
 if(!hasil.bagian.length&&!baru.length)return hasil;isi.sumber=d.judul;await admJSON("/admin/iklim",isi);try{hasil.kartu=await perbaruiKondisiDariIsi(isi,d.judul,hasil.basi)}catch(er){}return hasil}

/* =====================================================================
   MEMBACA TABEL BULETIN DARI LETAK KATA DI HALAMAN (tanpa AI)
   Tabel Canva di buletin berbentuk: label kategori (mis. "Menengah (101-300 mm)" atau "Bawah Normal"),
   lalu daftar kabupaten tepat di bawahnya pada kolom yang sama. Judul tabel ("Tabel 2.3 Prakiraan Curah
   Hujan Bulan November 2026 wilayah Papua Barat Daya") ada di atasnya.
   ===================================================================== */
const KAT_CH=["Rendah","Menengah","Tinggi","Sangat Tinggi"],KAT_SH=["Bawah Normal","Normal","Atas Normal"];
const KAB_POLA=[["Manokwari Selatan",/manokwari\s+selatan|\bmansel\b/i,"pb"],["Manokwari",/manokwari(?!\s+selatan)/i,"pb"],["Pegunungan Arfak",/(?:peg(?:\.|unungan)?\s*)?arfak\b/i,"pb"],["Teluk Bintuni",/teluk\s+bintuni|\bbintuni/i,"pb"],["Teluk Wondama",/teluk\s+wondama|\bwondama/i,"pb"],["Fakfak",/fak\s*[-–]?\s*fak/i,"pb"],["Kaimana",/kaimana/i,"pb"],
 ["Kota Sorong",/kota\s+sorong/i,"pbd"],["Sorong Selatan",/sorong\s+selatan/i,"pbd"],["Kab. Sorong",/\bsorong\b/i,"pbd"],["Raja Ampat",/raja\s*ampat/i,"pbd"],["Maybrat",/maybrat/i,"pbd"],["Tambrauw",/tambrauw/i,"pbd"]];
function segmenHalaman(items){/* items: {s,x,y,w} (koordinat PDF, y ke atas) -> segmen baris per kolom */
 const baris=[];items.slice().sort((a,b)=>b.y-a.y||a.x-b.x).forEach(i=>{const b=baris.find(z=>Math.abs(z.y-i.y)<3);if(b)b.it.push(i);else baris.push({y:i.y,it:[i]})});
 const seg=[];baris.forEach(b=>{b.it.sort((a,c)=>a.x-c.x);let cur=null;b.it.forEach(i=>{if(!cur||i.x-cur.x1>45){cur={y:b.y,x0:i.x,x1:i.x+i.w,t:i.s};seg.push(cur)}else{cur.t+=(i.x-cur.x1>1.5?" ":"")+i.s;cur.x1=Math.max(cur.x1,i.x+i.w)}})});
 seg.forEach(s=>s.t=s.t.replace(/\s+/g," ").trim());return seg.filter(s=>s.t)}
const labelKat=t=>{const a=t.match(/^(Sangat Tinggi|Rendah|Menengah|Tinggi)\s*\(/i);if(a)return {jenis:"ch",kat:KAT_CH.find(k=>k.toLowerCase()===a[1].toLowerCase())};const b=t.match(/^(Bawah Normal|Atas Normal|Normal)$/i);if(b)return {jenis:"sh",kat:KAT_SH.find(k=>k.toLowerCase()===b[1].toLowerCase())};return null};
function tabelDariHalaman(seg){const cap=[];seg.forEach((s,i)=>{if(!/^Tabel\s*\d/i.test(s.t))return;let t=s.t;const n=seg.find(z=>z!==s&&s.y-z.y>2&&s.y-z.y<16&&Math.abs(z.x0-s.x0)<30);if(n)t+=" "+n.t;cap.push({t,x0:s.x0,x1:Math.max(s.x1,s.x0+150),y:s.y})});
 const lab=seg.map(s=>({s,l:labelKat(s.t)})).filter(x=>x.l),tab=[];
 lab.forEach(({s,l})=>{const kol=lab.filter(z=>Math.abs(z.s.x0-s.x0)<45&&z.s.y<s.y).map(z=>z.s.y);const batas=kol.length?Math.max(...kol):-1e9;
  const isi=seg.filter(z=>z!==s&&Math.abs(z.x0-s.x0)<45&&z.y<s.y&&z.y>batas&&!labelKat(z.t)&&!/^(Tabel|Gambar)\s*\d/i.test(z.t)).sort((a,b)=>b.y-a.y);
  const ambil=[];let yAkhir=s.y;for(const z of isi){if(yAkhir-z.y>34)break;ambil.push(z.t);yAkhir=z.y}
  const c=cap.filter(c=>c.y>s.y&&s.x0>=c.x0-25&&s.x0<=c.x1+25).sort((a,b)=>a.y-b.y)[0];if(!c)return;
  let t=tab.find(x=>x.cap===c.t&&x.jenis===l.jenis);if(!t){t={cap:c.t,capY:c.y,jenis:l.jenis,kat:{}};tab.push(t)}t.kat[l.kat]=ambil.join(" ").replace(/\s+/g," ").trim()});
 return tab.map(t=>{const c=t.cap.toLowerCase();return {...t,prakiraan:/prakiraan|prediksi/.test(c),prov:/pap?ua\s+barat\s+daya/.test(c)?"pbd":/pap?ua\s+barat/.test(c)?"pb":"",bulan:besarAwal(((t.cap.match(BLN_RE)||[])[0]||"").toLowerCase())}})}
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
  const cl=t.toLowerCase();out.push({cap:t,capY:c.y,jenis,kat:kt,prakiraan:/prakiraan|prediksi/.test(cl),prov:/pap?ua\s+barat\s+daya/.test(cl)?"pbd":/pap?ua\s+barat/.test(cl)?"pb":"",bulan:besarAwal(((t.match(BLN_RE)||[])[0]||"").toLowerCase())})});
 return out}
/* teks sel -> {kabupaten: "penuh"|"sebagian"} */
function kabDariSel(teks,prov){const out={};const t=String(teks||"").replace(/\s+/g," ").trim();if(!t||/^tidak ada\.?$/i.test(t))return out;
 const semua=/seluruh|sebagian\s+besar\s+wilayah\s+pap?ua\s+barat/i.test(t);if(semua){const kecuali=(t.match(/kecuali\s+(.+)$/i)||[])[1]||"";
  const provs=/papua barat daya/i.test(t)&&/papua barat(?!\s*daya)/i.test(t)?["pb","pbd"]:/papua barat daya/i.test(t)?["pbd"]:/papua barat/i.test(t)?["pb"]:[prov];
  const kecSeb=/^\s*sebagian/i.test(kecuali);KAB_POLA.filter(k=>provs.includes(k[2])&&!(kecuali&&!kecSeb&&k[1].test(kecuali))).forEach(k=>out[k[0]]="penuh")}
 /* koma memisahkan kabupaten; "sebagian X dan Y" berlaku untuk X dan Y */
 t.split(/,|;/).flatMap(bg=>{const q=/sebagian/i.test(bg.split(/\bdan\b/)[0]);return bg.split(/\bdan\b/).map(f=>({f,q}))}).forEach(({f,q})=>{const sb=q||/sebagian/i.test(f);KAB_POLA.forEach(([nama,re])=>{const ff=nama==="Kab. Sorong"?f.replace(/kota\s+sorong|sorong\s+selatan/ig,""):nama==="Manokwari"?f.replace(/manokwari\s+selatan/ig,""):f;if(re.test(ff))out[nama]=out[nama]==="penuh"?"penuh":(sb?"sebagian":"penuh")})});
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
function dominDariKalimat(teks,jenis,prov,bulan){const t=String(teks||"").replace(/\s+/g," "),ur=jenis==="sh"?KAT_SH:KAT_CH;const kal=t.split(/(?<=\.)\s+/);
 const katRe=jenis==="sh"?"(bawah normal|atas normal|normal)":"(sangat tinggi|tinggi|menengah|rendah)";
 for(const k of kal){if(!new RegExp((jenis==="sh"?"sifat":"curah")+" hujan","i").test(k))continue;const pd=/papua barat daya/i.test(k);if((prov==="pbd")!==pd)continue;if(bulan&&!new RegExp(bulan.split(" ")[0],"i").test(k))continue;
  const m=k.match(new RegExp("(?:didominasi|umumnya|dominan|sebagian besar|secara keseluruhan)[^.]*?"+katRe+"(?:\\s*(?:hingga|sampai|-|–)\\s*"+katRe+")?","i"));
  if(m){const a=ur.find(x=>x.toLowerCase()===m[1].toLowerCase()),b=m[2]?ur.find(x=>x.toLowerCase()===m[2].toLowerCase()):"";return b&&b!==a?rentang([a,b],ur):a}}
 return ""}
const skorTab=arr=>arr.reduce((n,t)=>n+Object.values(t.kat||{}).reduce((m,v)=>m+KAB_POLA.filter(k=>k[1].test(v||"")).length,0),0);
function bangunDariTata(hal,tata,judul){const tabs=tata.flatMap(t=>{const a=tabelDariHalaman(t.seg),b=tabelBaris(t.seg);return (skorTab(b)>skorTab(a)?b:a).map(x=>({...x,hal:t.n}))});const teks=hal.join("\n");const out={};
 const E=edisiKey(judul),nmB=k=>besarAwal(BULAN_ID[((k%12)+12)%12])+" "+Math.floor(k/12);
 if(E){/* analisis = bulan sebelum edisi; prakiraan = 3 bulan sesudahnya, diurutkan menurut letak tabel di dokumen */
  tabs.filter(x=>!x.prakiraan).forEach(x=>x.bulan=nmB(E-1));
  const P=[nmB(E+1),nmB(E+2),nmB(E+3)],tp=tabs.filter(x=>x.prakiraan).sort((a,b)=>a.hal-b.hal||(b.capY||0)-(a.capY||0));
  const cocok=tp.length&&tp.every(x=>P.some(b=>samaBulan(x.bulan,b)));
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
function periksaIsi(x){const w=[],cek=(m,lab)=>{if(!m)return;["pb","pbd"].forEach(pv=>{const rows=m[pv]||[],nm=pv==="pb"?"Papua Barat":"Papua Barat Daya";
  rows.filter(r=>!r.ch||!r.sh).forEach(r=>w.push(`${lab}: ${r.kab} (${nm}) belum punya kategori ${!r.ch?"curah hujan":"sifat hujan"}.`));
  const d=m.dom||{};["ch","sh"].forEach(j=>{const kal=d[pv+"_"+j];if(!kal||!rows.length)return;const ur=j==="sh"?KAT_SH:KAT_CH,ada=rows.some(r=>String(r[j]||"").split(" – ").some(v=>kal.split(" – ").includes(v)));
   if(!ada)w.push(`${lab}: buletin menulis ${nm} didominasi ${kal} (${j==="sh"?"sifat":"curah"} hujan), tetapi tabel tidak memuat kategori itu.`)})})};
 cek(x.analisis,"Analisis "+((x.analisis||{}).bulan||""));((x.prakiraan&&x.prakiraan.bulan)||[]).forEach(m=>cek(m,"Prakiraan "+(m.bulan||"")));
 ["analisis","prakiraan","ekstrem","hth","spi"].forEach(b=>{const v=x[b];if(v&&v._sumber&&x.sumber&&v._sumber!==x.sumber)w.push(`Bagian ${NAMA_BAGIAN[b]||b} tidak terbaca dari ${x.sumber}; isinya masih dari ${v._sumber}. Betulkan di bawah atau unggah ulang dokumennya.`)});return w}

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
  const baris=(sg,atas)=>{const num=sg.filter(s=>/^\d{1,3}(?:[.,]\d)?$/.test(s.t)&&s.y<atas);const out=[];
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
  const ks=t.split(/(?<=\.)\s+(?=[A-Z])/),kk=ks.filter(k=>/lebat/i.test(k)&&/(tercatat|sebanyak|tidak ada)/i.test(k)).join(" ");
  hasil={bulan:bm?blnTeks(bm[1],bm[2]):"",jumlah_pos:jp?+jp[1]:null,lebat,sangat_lebat:sl,teks:potongKalimat(kk,390)}});
 return hasil}
const KAT_SPI=["Amat Sangat Kering","Amat Sangat Basah","Ekstrem Kering","Ekstrem Basah","Sangat Kering","Sangat Basah","Agak Kering","Agak Basah","Kering","Basah","Normal"];
const katSpi=t=>KAT_SPI.find(k=>k.toLowerCase()===String(t).toLowerCase().replace(/\s+/g," "))||t;
function cariKab(t){let s=String(t);const hasil=[];const ganti=(re,nama)=>{s=s.replace(new RegExp(re.source,"gi"),(m,...a)=>{hasil.push({kab:nama,i:a[a.length-2]});return " ".repeat(m.length)})};
 ganti(/manokwari\s+selatan/,"Manokwari Selatan");ganti(/kota\s+sorong/,"Kota Sorong");ganti(/sorong\s+selatan/,"Sorong Selatan");ganti(/(?:kabupaten|kab\.?)\s+sorong/,"Kab. Sorong");ganti(/\bsorong\b/,"Kab. Sorong");
 KAB_POLA.filter(([n])=>!/sorong|manokwari selatan/i.test(n)).forEach(([n,re])=>ganti(re,n));return hasil.sort((a,b)=>a.i-b.i)}
function spiDariTata(tata){let o=null;const kr="("+KAT_SPI.join("|")+")";
 (tata||[]).forEach(({seg})=>{if(o)return;const semua=seg.map(s=>s.t).join(" ");if(!/PRESIPITASI\s+TERSTANDARISASI/i.test(semua)||!/kering|basah/i.test(semua))return;
  const t=teksLebar(seg),bm=t.match(/\(?SPI\)?\s+bulan\s+([A-Za-z]+)\s+(\d{4})/i)||semua.match(/BULAN\s+([A-Za-z]+)\s+(\d{4})/i);
  const pb=[],pbd=[],cat={},katRe=new RegExp(kr+"(?:\\s+(?:hingga|sampai|s\\.d\\.?|[-–])\\s+"+kr+")?","i"),kal=t.split(/(?<=\.)\s+(?=[A-Z])|,?\s+sedangkan\s+/i);
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
function kalimatPenting(teksHal,prov,kunci){const out=[];teksHal.join(" ").replace(/\s+/g," ").split(/(?<=\.)\s+/).forEach(k=>{if(out.length>=2)return;if(!/(didominasi|umumnya|sebagian besar|secara keseluruhan)/i.test(k))return;if(kunci&&!kunci.test(k))return;const pd=/papua barat daya/i.test(k);if(prov&&(prov==="pbd")!==pd)return;if(k.length<40||k.length>400)return;if(!out.includes(k))out.push(k.trim())});return out.join(" ")}

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
 musim:"Tulis setiap ZOM yang disebut. teks = 2-3 kalimat ringkasan untuk masyarakat."};
/* kartu Kondisi Iklim dihitung dari tabel hasil baca (lebih tepat daripada tebakan AI) */
const domin=(arr,f)=>{const m=new Map();(arr||[]).forEach(r=>{const v=f(r);if(v)m.set(v,(m.get(v)||0)+1)});return [...m.entries()].sort((a,b)=>b[1]-a[1])};
const KAT_URUT=[["sangat_pendek","Sangat Pendek","1–5 hari"],["pendek","Pendek","6–10 hari"],["menengah","Menengah","11–20 hari"],["panjang","Panjang","21–30 hari"],["sangat_panjang","Sangat Panjang","31–60 hari"],["ekstrem","Kekeringan Ekstrem","lebih dari 60 hari"]];
function kartuDariIsi(isi){const k=[],t={};
 const an=isi.analisis;if(an&&((an.pb||[]).length||(an.pbd||[]).length)){const semua=[...(an.pb||[]),...(an.pbd||[])],ch=domin(semua,r=>r.ch)[0],sb=domin(an.pb,r=>r.sh)[0],sd=domin(an.pbd,r=>r.sh)[0];
  const dm=an.dom||{},xb=dm.pb_sh||(sb&&sb[0]),xd=dm.pbd_sh||(sd&&sd[0]),nch=(dm.pb_ch&&dm.pb_ch===dm.pbd_ch?dm.pb_ch:"")||(ch&&ch[0]);
  if(nch){k.push({kunci:"hujan",judul:"Hujan "+(an.bulan||""),nilai:nch,ket:xb&&xd&&xb===xd?"Sifat "+xb+" di kedua provinsi":[xb?"Papua Barat: "+xb:"",xd?"Papua Barat Daya: "+xd:""].filter(Boolean).join(" · "),angka:null});t.hujan=[an.teks_pb,an.teks_pbd].filter(Boolean).join(" ")}}
 const pr=isi.prakiraan&&isi.prakiraan.bulan;if(Array.isArray(pr)&&pr.length){const m=pr.slice().sort((a,b)=>urutBulan(a.bulan)-urutBulan(b.bulan))[0],ch=domin([...(m.pb||[]),...(m.pbd||[])],r=>r.ch)[0],sb=domin(m.pb,r=>r.sh)[0],sd=domin(m.pbd,r=>r.sh)[0];
  const dm=m.dom||{},xb=dm.pb_sh||(sb&&sb[0]),xd=dm.pbd_sh||(sd&&sd[0]),nch=dm.pb_ch||(ch&&ch[0]);
  if(nch){k.push({kunci:"prakiraan",judul:"Prakiraan "+(m.bulan||""),nilai:nch,ket:[xb?"Papua Barat: "+xb:"",xd?"Papua Barat Daya: "+xd:""].filter(Boolean).join(" · "),angka:null});t.prakiraan=pr.map(x=>x.teks).filter(Boolean).join(" ")}}
 const h=isi.hth;if(h&&Array.isArray(h.dasarian)&&h.dasarian.length){const d=h.dasarian[h.dasarian.length-1],n=c=>Math.max(0,+d[c]||0);
  const berat=KAT_URUT.slice(3).filter(([c])=>n(c)>0).sort((a,b)=>n(b[0])-n(a[0]));const pilih=berat[0]||KAT_URUT.slice().sort((a,b)=>n(b[0])-n(a[0]))[0];
  const eks=n("ekstrem")&&pilih[0]!=="ekstrem"?" · "+n("ekstrem")+" pos Kekeringan Ekstrem":"";
  k.push({kunci:"hth",judul:"Hari Tanpa Hujan",nilai:n(pilih[0])+" pos "+pilih[1],ket:"Dasarian "+(d.das||"")+" "+(h.bulan||"")+eks,angka:n(pilih[0])});
  t.hth=`Pada Dasarian ${d.das||""} ${h.bulan||""}, ${n(pilih[0])} pos hujan masuk kategori ${pilih[1]} (${pilih[2]} tanpa hujan)${eks?" dan "+n("ekstrem")+" pos Kekeringan Ekstrem":""}.`}
 const sp=isi.spi;if(sp&&((sp.pb||[]).length||(sp.pbd||[]).length)){const nk=v=>String(v||"").replace(/\s*(–|-|—|hingga|s\.d\.?)\s*/gi," – ").replace(/\s+/g," ").trim(),semuaS=[...(sp.pb||[]),...(sp.pbd||[])],kat=domin(semuaS,r=>nk(r.kat)),tot=new Set(semuaS.filter(r=>r.kat).map(r=>r.kab)).size;if(kat.length){
  const lain=kat.slice(1,3).map(x=>x[0]+" ("+x[1]+")").join(" dan ");
  k.push({kunci:"spi",judul:"SPI "+(sp.bulan||""),nilai:kat[0][0].split(" – ")[0],ket:kat[0][0]+" di "+kat[0][1]+" dari "+tot+" kabupaten/kota"+(lain?"; lainnya "+lain:""),angka:null});if(sp.teks&&!/^buletin/i.test(sp.teks))t.spi=sp.teks}}
 return {kartu:k,teks:t}}
const KARTU_BAGIAN={analisis:"hujan",prakiraan:"prakiraan",hth:"hth",spi:"spi"};
async function perbaruiKondisiDariIsi(isi,judul,basi){const isi2={...isi};(basi||[]).forEach(b=>delete isi2[b]);const {kartu,teks}=kartuDariIsi(isi2);(basi||[]).forEach(b=>delete teks[KARTU_BAGIAN[b]]);await muatUlangKA();const lama=kondisiData(),urut=KUNCI_KARTU.map(x=>x[0]);
 const buang=new Set((basi||[]).map(b=>KARTU_BAGIAN[b]).filter(Boolean));if(!kartu.length&&!buang.size)return 0;
 const baru=kartu.map(x=>({...x,src:judul}));const semua=[...(lama.kartu||[]).filter(x=>!baru.some(n=>n.kunci===x.kunci)&&!buang.has(x.kunci)),...baru].sort((a,b)=>urut.indexOf(a.kunci)-urut.indexOf(b.kunci));
 Object.keys(teks).forEach(x=>teks[x]=potongKalimat(teks[x],390));
 await admJSON("/admin/kondisi",{sumber:judul,ringkasan:teks.hujan?potongKalimat(teks.hujan,390):(lama.ringkasan||""),kartu:semua,teks:{...(lama.teks||{}),...teks},otomatis:judul});return baru.length}

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
 ["iklim_catatan_judul","Iklim Papua Barat · Judul catatan iklim tahun ini","Tahun El Niño Sangat Kuat"],
 ["iklim_catatan","Iklim Papua Barat · Catatan iklim (satu baris: waktu | judul | isi | tautan)",""],
 ["musim_reko_hujan","Prediksi Musim Hujan · Rekomendasi (satu baris: sektor | saran). Kosongkan untuk rekomendasi bawaan.",""],
 ["musim_reko_kemarau","Prediksi Musim Kemarau · Rekomendasi (satu baris: sektor | saran). Kosongkan untuk rekomendasi bawaan.",""]];
const TH=(k,def)=>{const v=((IK().teks_hal)||{})[k];return v&&String(v).trim()?String(v):(def!==undefined?def:((TEKS_EDIT.find(x=>x[0]===k)||[])[2]||""))};
const barisTH=(k,def)=>TH(k,def).split(/\n+/).map(l=>l.split("|").map(x=>x.trim())).filter(x=>x[0]);

/* ---------- tab admin "Isi Halaman Iklim" (membetulkan hasil AI) ---------- */
const brs=(a,f)=>(Array.isArray(a)?a:[]).map(r=>f.map(k=>r[k]==null?"":String(r[k])).join(" | ")).join("\n");
const urai=(t,f)=>String(t||"").split(/\n+/).map(l=>l.split("|").map(x=>x.trim())).filter(x=>x[0]).map(x=>{const o={};f.forEach((k,i)=>{const v=x[i]||"";o[k]=/^(mm|no|jumlah_pos|sangat_pendek|pendek|menengah|panjang|sangat_panjang|ekstrem)$/.test(k)&&v!==""&&!isNaN(+v.replace(",","."))?+v.replace(",","."):v});return o});
function admIklim(){const x0=IK(),x={...x0,musim_hujan:x0.musim_hujan&&zomNorm(x0.musim_hujan).length?x0.musim_hujan:{periode:"2026/2027",zom:zomTerbaru().zom,teks:""}},an=x.analisis||bagIK("analisis"),pr=(x.prakiraan&&x.prakiraan.bulan)||bagIK("prakiraan").bulan||[],ek=x.ekstrem||bagIK("ekstrem"),h=x.hth||bagIK("hth"),sp=x.spi||bagIK("spi");
 const ta=(nama,isi,ph,r)=>`<textarea name="${nama}" rows="${r||8}" placeholder="${esc(ph||"")}">${esc(isi)}</textarea>`;
 const sec=(judul,ket,isi)=>`<details class="admsec"><summary>${judul}</summary><p class="admnote">${ket}</p>${isi}</details>`;
 const bulanPr=[0,1,2].map(i=>pr[i]||{});
 return `<form id="admIklim"><p class="admnote">Isi di bawah ini diisi sendiri oleh AI saat buletin atau press release diunggah. Bila ada yang keliru, betulkan lalu tekan <b>Simpan</b>. Kosongkan semua baris suatu bagian untuk kembali memakai isi bawaan. Pemisah kolom adalah garis tegak <b>|</b>.</p>
 ${x.diubah?`<p class="admnote">Terakhir diperbarui dari: <b>${esc(x.sumber||"-")}</b> (${esc(tglPendek(String(x.diubah).slice(0,10)))}).</p>`:'<p class="admnote">Belum ada isi dari dokumen; halaman Iklim memakai isi bawaan.</p>'}
 ${(w=>w.length?`<div class="admcek"><b>Perlu dicek (${w.length})</b><ul>${w.slice(0,15).map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:"")(periksaIsi(x))}
 <label>Sumber (nama dokumen)<input name="sumber" value="${esc(x.sumber||"")}"></label>
 ${sec("Analisis hujan bulan lalu","Satu baris per kabupaten: Kabupaten | Curah hujan | Sifat hujan | Catatan",`<label>Bulan<input name="an_bulan" value="${esc(an.bulan||"")}"></label><label>Papua Barat${ta("an_pb",brs(an.pb,["kab","ch","sh","ket"]),"Manokwari | Menengah | Bawah Normal |")}</label><label>Papua Barat Daya${ta("an_pbd",brs(an.pbd,["kab","ch","sh","ket"]))}</label><label>Ringkasan Papua Barat${ta("an_tpb",an.teks_pb||"","",2)}</label><label>Ringkasan Papua Barat Daya${ta("an_tpbd",an.teks_pbd||"","",2)}</label>`)}
 ${bulanPr.map((m,i)=>sec("Prakiraan bulan ke-"+(i+1)+(m.bulan?" · "+esc(m.bulan):""),"Kabupaten | Curah hujan | Sifat hujan | Catatan",`<label>Bulan<input name="pr${i}_bulan" value="${esc(m.bulan||"")}"></label><label>Papua Barat${ta("pr"+i+"_pb",brs(m.pb,["kab","ch","sh","ket"]))}</label><label>Papua Barat Daya${ta("pr"+i+"_pbd",brs(m.pbd,["kab","ch","sh","ket"]))}</label><label>Ringkasan${ta("pr"+i+"_teks",m.teks||"","",2)}</label>`)).join("")}
 ${sec("Hujan ekstrem harian","Satu baris per pos: Nama pos | Jumlah hujan (mm)",`<div class="admgrid"><label>Bulan<input name="ek_bulan" value="${esc(ek.bulan||"")}"></label><label>Jumlah pos dipantau<input name="ek_pos" value="${esc(ek.jumlah_pos||"")}"></label></div><label>Hujan lebat (≥ 50 mm/hari)${ta("ek_lebat",brs(ek.lebat,["pos","mm"]),"Prafi | 58",3)}</label><label>Hujan sangat lebat (≥ 100 mm/hari)${ta("ek_sl",brs(ek.sangat_lebat,["pos","mm"]),"",2)}</label><label>Ringkasan${ta("ek_teks",ek.teks||"","",2)}</label>`)}
 ${sec("Hari tanpa hujan","Satu baris per dasarian: Dasarian | Sangat Pendek | Pendek | Menengah | Panjang | Sangat Panjang | Kekeringan Ekstrem (jumlah pos)",`<label>Bulan<input name="hth_bulan" value="${esc(h.bulan||"")}"></label><label>Jumlah pos per kategori${ta("hth_das",brs(h.dasarian,["das","sangat_pendek","pendek","menengah","panjang","sangat_panjang","ekstrem"]),"I | 24 | 0 | 1 | 0 | 0 | 0",3)}</label><label>Ringkasan${ta("hth_teks",h.teks||"","",2)}</label>`)}
 ${sec("SPI (kekeringan)","Kabupaten | Kategori | Catatan",`<label>Bulan<input name="spi_bulan" value="${esc(sp.bulan||"")}"></label><label>Papua Barat${ta("spi_pb",brs(sp.pb,["kab","kat","ket"]))}</label><label>Papua Barat Daya${ta("spi_pbd",brs(sp.pbd,["kab","kat","ket"]))}</label><label>Ringkasan${ta("spi_teks",sp.teks||"","",2)}</label>`)}
 ${["hujan","kemarau"].map(jn=>{const m=x["musim_"+jn]||{};return sec("Prediksi musim "+jn+(m.periode?" "+esc(m.periode):""),"Satu baris per ZOM: No ZOM | Wilayah | Awal | Dibanding normal | Sifat | Puncak",`<label>Periode<input name="m${jn}_per" value="${esc(m.periode||"")}" placeholder="2026/2027"></label><label>Tabel ZOM${ta("m"+jn+"_zom",brs(m.zom,["no","wil","awal","banding","sifat","puncak"]),"636 | Kab. Manokwari (Manokwari Utara, ...) | Oktober 2026 | Maju | Normal | Januari 2027",6)}</label><label>Ringkasan${ta("m"+jn+"_teks",m.teks||"","",2)}</label>`)}).join("")}
 ${sec("Peta dari dokumen ("+((x.peta||[]).length)+")","Peta diambil otomatis dari gambar berketerangan \"Gambar ...\" di dalam dokumen. Betulkan keterangan atau centang Hapus.",(x.peta||[]).length?`<div class="admpeta">${x.peta.map((p,i)=>`<div class="admpetai"><img src="${fileURL(p.file)}" alt="" loading="lazy"><input name="pt${i}_judul" value="${esc(p.judul)}"><label class="cek"><input type="checkbox" name="pt${i}_hapus"> Hapus</label></div>`).join("")}</div>`:'<p class="admnote">Belum ada peta.</p>')}
 ${sec("Teks lain di halaman Iklim","Teks yang tidak berasal dari buletin. Ubah bila ada informasi baru, lalu tekan Simpan.",TEKS_EDIT.map(([k,l,d])=>`<label>${esc(l)}${ta("th_"+k,((x.teks_hal||{})[k])||d,"",/\\n|catatan|angka|reko/.test(k+d)?5:2)}</label>`).join(""))}
 <label class="cek" style="flex-direction:row;align-items:center;gap:8px;margin:12px 0"><input type="checkbox" name="hitungKartu"> Hitung ulang kartu <b>Kondisi Iklim</b> di Beranda dari tabel di atas (kartu yang pernah diubah manual akan diganti)</label>
 <p><button class="pbtn" type="submit">Simpan</button></p><p class="admmsg" id="admMsg"></p></form>`}
async function simpanIklim(f){const v=n=>(f.querySelector(`[name="${n}"]`)||{}).value||"",o={sumber:v("sumber")};const x=IK();
 const an={bulan:v("an_bulan"),pb:urai(v("an_pb"),["kab","ch","sh","ket"]),pbd:urai(v("an_pbd"),["kab","ch","sh","ket"]),teks_pb:v("an_tpb"),teks_pbd:v("an_tpbd")};if(an.pb.length||an.pbd.length)o.analisis=an;
 const pr=[0,1,2].map(i=>({bulan:v("pr"+i+"_bulan"),pb:urai(v("pr"+i+"_pb"),["kab","ch","sh","ket"]),pbd:urai(v("pr"+i+"_pbd"),["kab","ch","sh","ket"]),teks:v("pr"+i+"_teks")})).filter(m=>m.bulan&&(m.pb.length||m.pbd.length));if(pr.length)o.prakiraan={bulan:pr};
 const ek={bulan:v("ek_bulan"),jumlah_pos:+v("ek_pos")||0,lebat:urai(v("ek_lebat"),["pos","mm"]),sangat_lebat:urai(v("ek_sl"),["pos","mm"]),teks:v("ek_teks")};if(ek.teks||ek.lebat.length||ek.sangat_lebat.length)o.ekstrem=ek;
 const h={bulan:v("hth_bulan"),dasarian:urai(v("hth_das"),["das","sangat_pendek","pendek","menengah","panjang","sangat_panjang","ekstrem"]),teks:v("hth_teks")};if(h.dasarian.length)o.hth=h;
 const sp={bulan:v("spi_bulan"),pb:urai(v("spi_pb"),["kab","kat","ket"]),pbd:urai(v("spi_pbd"),["kab","kat","ket"]),teks:v("spi_teks")};if(sp.pb.length||sp.pbd.length)o.spi=sp;
 ["hujan","kemarau"].forEach(jn=>{const z=urai(v("m"+jn+"_zom"),["no","wil","awal","banding","sifat","puncak"]);if(z.length)o["musim_"+jn]={jenis:jn,periode:v("m"+jn+"_per"),zom:z,teks:v("m"+jn+"_teks")}});
 o.teks_hal={};TEKS_EDIT.forEach(([k,,d])=>{const t=v("th_"+k).trim();if(t&&t!==d)o.teks_hal[k]=t});
 o.peta=(x.peta||[]).map((p,i)=>({...p,sumber:o.sumber||p.sumber,judul:v("pt"+i+"_judul")||p.judul,_h:(f.querySelector(`[name="pt${i}_hapus"]`)||{}).checked})).filter(p=>!p._h).map(({_h,...p})=>p);
 await admJSON("/admin/iklim",o);let nk=0;const hk=f.querySelector('[name="hitungKartu"]');if(hk&&hk.checked){try{nk=await perbaruiKondisiDariIsi(o,o.sumber||"Isi Halaman Iklim")}catch(er){nk=0}}await muatUlangKA();pesan("Isi halaman Iklim disimpan."+(nk?" "+nk+" kartu Kondisi Iklim dihitung ulang.":"")+" Tampil di web paling lama 1 menit.")}

/* ---------- tab admin "Panduan" ---------- */
function admPanduan(){const L=(j,isi)=>`<section class="pandu"><h3>${j}</h3>${isi}</section>`;
 return `<div class="panduan"><p class="admnote">Panduan singkat untuk petugas. Tidak perlu keahlian coding: cukup unggah dokumen dan periksa hasilnya.</p>
 ${L("1. Menerbitkan Buletin Iklim (tiap bulan)",`<ol><li>Buka tab <b>Terbitkan</b>.</li><li>Jenis: <b>Buletin Iklim</b>. Isi tanggal terbit.</li><li>Pilih file PDF buletin.</li><li>Judul terisi sendiri dari nama file, misalnya file <i>Buletin_Iklim_November_2026.pdf</i> menjadi <i>Buletin Iklim November 2026</i>. Jadi beri nama file sesuai edisinya. Ringkasan boleh dikosongkan (diisi AI).</li><li>Tekan <b>Terbitkan</b> dan tunggu sampai muncul pesan berhasil (bisa 1–3 menit karena AI membaca isinya).</li></ol>
  <p><b>Yang berubah sendiri:</b> kartu Kondisi Iklim di Beranda, tabel hujan per kabupaten, prakiraan 3 bulan, hujan ekstrem, hari tanpa hujan, SPI, peta-peta dari buletin, banner Beranda, dan daftar Publikasi.</p>`)}
 ${L("2. Menerbitkan Prediksi Musim (Press Release / FGD)",`<ol><li>Tab <b>Terbitkan</b>, jenis <b>Prediksi Musim Hujan</b> atau <b>Prediksi Musim Kemarau</b>.</li><li>Unggah PDF press release (lebih baik daripada file paparan, karena tulisannya bisa dibaca komputer).</li><li>Terbitkan. Tabel ZOM, ringkasan, dan peta di halaman Prakiraan Musim akan terisi sendiri, begitu juga Info Wilayah Saya.</li></ol>`)}
 ${L("3. Memeriksa dan membetulkan hasil AI",`<p>AI kadang salah membaca tabel. Setelah menerbitkan, buka web dan periksa halaman Iklim. Bila ada yang keliru:</p><ul><li>Kartu di Beranda: tab <b>Kondisi Iklim</b>.</li><li>Tabel, ZOM, dan peta: tab <b>Isi Halaman Iklim</b>. Tiap baris memakai pemisah <b>|</b>, contoh: <code>Manokwari | Menengah | Bawah Normal |</code></li></ul><p>Tekan <b>Simpan</b>; perubahan tampil paling lama 1 menit.</p>`)}
 ${L("4. Peringatan dini",`<ul><li>Tab <b>Peringatan Dini</b>: tambahkan satu baris per wilayah dengan status Waspada, Siaga, atau Awas, jenis, dan masa berlaku.</li><li>Selama ada peringatan dari kita, peringatan otomatis dari BMKG Pusat disembunyikan. Hapus semua baris (status Nihil) untuk kembali menampilkan peringatan BMKG Pusat.</li></ul>`)}
 ${L("5. Berita kegiatan, info kantor, dan profil",`<ul><li>Berita: tab <b>Terbitkan</b>, jenis <b>Berita Kegiatan</b>, isi tulisan dan pilih foto.</li><li>Alamat, WhatsApp, email: tab <b>Info Kantor</b>.</li><li>Kepala, pegawai, sejarah, foto kantor: tab <b>Profil</b>.</li><li>Berita BMKG Pusat yang tidak sesuai: tab <b>BMKG Pusat</b> → Sembunyikan.</li></ul>`)}
 ${L("6. Bila salah ubah",`<p>Tab <b>Riwayat</b> menyimpan 20 perubahan terakhir. Tekan <b>Kembalikan</b> pada perubahan yang ingin dibatalkan.</p>`)}
 ${L("Cadangan & penyimpanan",`<ul><li>Tab <b>Cadangan &amp; Penyimpanan</b> menampilkan sisa kapasitas penyimpanan file. Bila bilah berwarna kuning/merah, hapus file yang tidak terpakai atau pasang R2.</li><li>Cadangan isi web dibuat otomatis tiap minggu. Sebaiknya setiap awal bulan tekan <b>Unduh cadangan sekarang</b> dan simpan filenya di Google Drive kantor.</li><li><b>Memasang R2 (sekali saja, oleh pengelola akun Cloudflare):</b> Cloudflare → <b>R2 Object Storage</b> → aktifkan (paket gratis 10 GB; Cloudflare meminta data pembayaran walau tidak ditagih selama di bawah batas gratis) → <b>Create bucket</b> bernama <code>staklim-berkas</code> → buka Workers → <b>staklim-admin</b> → Settings → Bindings → Add → <b>R2 bucket</b>, nama variabel <code>BERKAS</code>, pilih bucket <code>staklim-berkas</code> → Deploy.</li></ul>`)}
 ${L("7. Hal penting",`<ul><li>Jangan membagikan password admin. Bila ada pegawai pindah, ganti password di Cloudflare (Workers → staklim-admin → Settings → Variables, jenis <b>Secret</b>).</li><li>Ukuran maksimal: dokumen 75 MB (file di atas 20 MB dikirim bertahap secara otomatis, jadi tunggu sampai selesai), gambar 5 MB.</li><li>Unggah dokumen sekali saja; mengunggah berulang menghabiskan kuota harian Cloudflare (gratis).</li><li>Data AWS/ARG dan berita BMKG Pusat masuk sendiri, tidak perlu diunggah.</li></ul>`)}
 <p><button type="button" class="mini" onclick="window.print()">Cetak panduan</button></p></div>`}

const CTA_WIL=`<a class="ctawil" href="#wilayah"><span class="ctapin" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 24 24"><path d="M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z"/><circle cx="12" cy="10" r="2.6"/></svg></span><span class="ctateks"><b>Mau tahu kondisi iklim di kampung Anda?</b><small>Pilih kabupaten dan distrik Anda, lalu lihat hujan, musim, dan peringatan dini untuk tempat Anda dalam satu halaman.</small></span><span class="ctabtn">Cek wilayah saya <em aria-hidden="true">→</em></span></a>`;
Object.keys(ATURAN_PUSAT).forEach(k=>{const f=P[k];if(!f)return;P[k]=()=>{const h=f(),i=h.indexOf("</p></div>");const kp=kontenPusat(k),x=pembaruanPusat(k)+ringkasKami(k)+dokKami(k)+(kp?`<div data-otogrup>${kp}</div>`:"");return i<0?h+x:h.slice(0,i+10)+x+h.slice(i+10)}});
const app=document.getElementById("app"),drop=document.getElementById("iklimDrop"),ib=document.getElementById("iklimBtn"),nav=document.getElementById("nav"),bg=document.getElementById("burger");
const pb=document.getElementById("profilBtn"),pdrop=document.getElementById("profilDrop");
/* bilah kemajuan baca, bayangan header, dan tombol ke atas */
{const pr=document.createElement("div");pr.id="progres";document.body.appendChild(pr);const ka=document.createElement("button");ka.id="keAtas";ka.type="button";ka.setAttribute("aria-label","Kembali ke atas");ka.textContent="↑";ka.onclick=()=>scrollTo({top:0,behavior:"smooth"});document.body.appendChild(ka);
 const hd=document.querySelector("header");let jalan=false;const gulir=()=>{jalan=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pr.style.transform="scaleX("+(h>0?Math.min(1,y/h):0)+")";hd&&hd.classList.toggle("gulir",y>8);ka.classList.toggle("tampil",y>900)};
 addEventListener("scroll",()=>{if(!jalan){jalan=true;requestAnimationFrame(gulir)}},{passive:true})}
const IKLIM=["wilayah","prakiraan-musim-kemarau","prakiraan-musim","hujan-bulanan","hari-tanpa-hujan","peringatan-kekeringan","peringatan-hujan-tinggi","enso-iod","iklim-papua-barat","zona-musim"];
IKLIM.filter(k=>k!=="wilayah"&&P[k]).forEach(k=>{const f=P[k];P[k]=()=>{const h=f(),i=h.indexOf("</p></div>");return i<0?CTA_WIL+h:h.slice(0,i+10)+CTA_WIL+h.slice(i+10)}});
isiFooter();muatKonten();
/* judul & deskripsi tiap halaman (untuk tab browser dan Google) */
const META_HAL={"beranda": ["Staklim Papua Barat (Pabar) – BMKG Stasiun Klimatologi Manokwari", "Situs resmi Stasiun Klimatologi Kelas III Papua Barat (Staklim Pabar), BMKG Manokwari: informasi iklim, curah hujan, prakiraan musim, peringatan dini kekeringan dan hujan tinggi, serta data cuaca AWS/ARG langsung untuk Papua Barat dan Papua Barat Daya."], "profil": ["Profil Staklim Papua Barat – BMKG Manokwari", "Profil Stasiun Klimatologi Kelas III Papua Barat (Staklim Pabar) BMKG: tugas, wilayah layanan Papua Barat dan Papua Barat Daya, alamat kantor di Manokwari, dan kontak."], "profil-tim": ["Pimpinan & Pegawai Staklim Papua Barat", "Pimpinan, struktur organisasi, dan pegawai Stasiun Klimatologi Papua Barat (BMKG Manokwari)."], "profil-sejarah": ["Sejarah Stasiun Klimatologi Papua Barat", "Sejarah dan jejak nama Stasiun Klimatologi Papua Barat (Staklim Pabar), BMKG di Manokwari."], "wilayah": ["Info Iklim Wilayah Saya – Kabupaten di Papua Barat & Papua Barat Daya", "Cek iklim, curah hujan, sifat hujan, hari tanpa hujan, dan zona musim untuk kabupaten dan distrik Anda: Manokwari, Sorong, Fakfak, Kaimana, Teluk Bintuni, Teluk Wondama, Raja Ampat, Maybrat, Tambrauw, Pegunungan Arfak, Manokwari Selatan, dan lainnya."], "prakiraan-musim": ["Prediksi Musim Hujan Papua Barat 2026/2027 – BMKG", "Prediksi awal, sifat, dan puncak musim hujan 2026/2027 per Zona Musim (ZOM) di Papua Barat dan Papua Barat Daya dari BMKG Stasiun Klimatologi Papua Barat."], "prakiraan-musim-kemarau": ["Prediksi Musim Kemarau Papua Barat – BMKG", "Prediksi awal, sifat, dan puncak musim kemarau per Zona Musim di Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat (BMKG)."], "hujan-bulanan": ["Curah Hujan Bulanan Papua Barat – Analisis & Prakiraan", "Analisis curah hujan dan sifat hujan bulan lalu serta prakiraan hujan 3 bulan ke depan per kabupaten di Papua Barat dan Papua Barat Daya (Manokwari, Sorong, Fakfak, dan lainnya)."], "hari-tanpa-hujan": ["Hari Tanpa Hujan (HTH) Papua Barat – Monitoring Kekeringan", "Monitoring hari tanpa hujan berturut-turut (HTH) di pos hujan Papua Barat dan Papua Barat Daya dari BMKG Stasiun Klimatologi Papua Barat."], "peringatan-kekeringan": ["Peringatan Dini Kekeringan Papua Barat – SPI BMKG", "Peringatan dini kekeringan meteorologis dan indeks SPI untuk Papua Barat dan Papua Barat Daya dari Stasiun Klimatologi Papua Barat (BMKG)."], "peringatan-hujan-tinggi": ["Peringatan Dini Curah Hujan Tinggi Papua Barat – BMKG", "Peringatan dini curah hujan tinggi untuk Papua Barat dan Papua Barat Daya: waspada, siaga, dan awas per wilayah dari BMKG Stasiun Klimatologi Papua Barat."], "enso-iod": ["El Niño, La Niña & IOD – Dampak di Papua Barat", "Pemantauan El Niño, La Niña, dan Indian Ocean Dipole (IOD) terkini dan dampaknya terhadap curah hujan di Papua Barat dan Papua Barat Daya."], "iklim-papua-barat": ["Iklim Papua Barat & Papua Barat Daya – Pola Hujan & Suhu", "Kondisi iklim Papua Barat dan Papua Barat Daya: pola curah hujan, suhu, dan musim di Manokwari, Sorong, dan kabupaten lainnya, dari BMKG Stasiun Klimatologi Papua Barat."], "zona-musim": ["Zona Musim (ZOM) Papua Barat & Papua Barat Daya", "Daftar Zona Musim (ZOM) dan wilayah Non-ZOM di Papua Barat dan Papua Barat Daya beserta kabupaten dan distriknya, dasar prediksi musim BMKG."], "peralatan": ["Data Cuaca Langsung AWS & ARG Papua Barat – Manokwari, Sorong", "Data cuaca langsung dari AWS dan ARG BMKG di Papua Barat dan Papua Barat Daya: suhu, kelembapan, angin, tekanan, dan curah hujan hari ini, plus rekap harian yang bisa diunduh (CSV)."], "layanan-data": ["Layanan Data Iklim Staklim Papua Barat – Permintaan Data BMKG", "Cara meminta data dan informasi iklim BMKG (curah hujan, suhu, dan lainnya) dari Stasiun Klimatologi Papua Barat untuk penelitian, pertanian, dan perencanaan."], "publikasi": ["Publikasi & Buletin Iklim Papua Barat – Staklim Pabar", "Unduh Buletin Iklim bulanan, prediksi musim, dan publikasi Stasiun Klimatologi Papua Barat (BMKG) untuk Papua Barat dan Papua Barat Daya."], "berita": ["Berita Iklim & Kegiatan Staklim Papua Barat", "Berita kegiatan Stasiun Klimatologi Papua Barat, siaran pers BMKG, dan liputan media tentang iklim di Papua Barat dan Papua Barat Daya."], "admin": ["Admin – Staklim Papua Barat", "Halaman admin."]};
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
 <section class="sec"><div class="sechead"><div><span class="eyebrow">Wilayah lain</span><h2>Iklim Kabupaten/Kota Lain</h2></div><a class="more" href="#wilayah">Pilih per distrik →</a></div>
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
function rapikanTautan(akar){if(!RUTE_PATH)return;(akar||document).querySelectorAll('a[href^="/"]:not([data-hal])').forEach(a=>{const k=a.getAttribute("href").slice(1)||"beranda";if(P[k]||dinamis(k))a.dataset.hal=k});(akar||document).querySelectorAll('a[href^="#"]').forEach(a=>{const k=a.getAttribute("href").slice(1);if(k&&(P[k]||dinamis(k)||k==="kontak")){a.dataset.hal=k==="kontak"?"layanan-data":k;a.setAttribute("href",urlHal(a.dataset.hal))}})}
try{history.scrollRestoration="manual"}catch(e){}
/* pindah halaman = entri riwayat baru, jadi tombol Back browser/HP kembali ke halaman sebelumnya di web ini */
function go(k){if(k==="kontak")k="layanan-data";const baru=(P[k]||dinamis(k))?k:"beranda";
 const dl=document.getElementById("dlgUmum"),diDlg=history.state&&history.state.dlg;if(dl)dl.remove();
 if(baru!==cur||halDariLokasi()!==baru){try{if(diDlg)history.replaceState({y:0},"",urlHal(baru));else{history.replaceState({...(history.state||{}),y:scrollY},"");history.pushState({y:0},"",urlHal(baru))}}catch(e){}}
 cur=baru;render()}
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
 OBS=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");OBS.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
 app.querySelectorAll(".reveal").forEach(el=>OBS.observe(el))}
/* animasi hanya berjalan saat terlihat di layar (hemat baterai ponsel) */
const IO_HIDUP="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(en=>en.target.classList.toggle("hidup",en.isIntersecting)),{rootMargin:"120px"}):null;
function pasangHidup(){const els=app.querySelectorAll(".nimg,.pubimg,.dokimg,.pfviz,.awc,.hslider");if(IO_HIDUP)IO_HIDUP.disconnect();els.forEach(e=>{e.classList.add("hidupkan");if(IO_HIDUP)IO_HIDUP.observe(e);else e.classList.add("hidup")})}
let HID_T=0;new MutationObserver(()=>{cancelAnimationFrame(HID_T);HID_T=requestAnimationFrame(pasangHidup)}).observe(app,{childList:true,subtree:true});
function render(){
  const k=cur;app.innerHTML=k.startsWith("berita-")?beritaDetail(k.slice(7)):k.startsWith("alat-")?detailAlat(k.slice(5)):KAB_HAL[k]?halKab(k):(P[k]||P.beranda)();
  app.classList.remove("masuk");void app.offsetWidth;app.classList.add("masuk");
  document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("on",a.dataset.nav===k));
  ib.classList.toggle("on",IKLIM.includes(k));pb.classList.toggle("on",PROFIL_HAL.includes(k));
  drop.hidden=true;ib.setAttribute("aria-expanded","false");pdrop.hidden=true;pb.setAttribute("aria-expanded","false");
  if(innerWidth<=640){nav.hidden=true;bg.setAttribute("aria-expanded","false")}
  [["tabsA","bodyA"],["tabsF","bodyF"]].forEach(([tid,bid])=>{const t=document.getElementById(tid);if(!t)return;const body=document.getElementById(bid);const show=k=>{body.innerHTML=HB[k]};show(t.querySelector(".on").dataset.t);
    t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));show(b.dataset.t)}});
  if(k.startsWith("alat-")){ib.classList.remove("on");document.querySelector('[data-nav="peralatan"]').classList.add("on");startData();isiGrafikDetail(k.slice(5));isiRekap(k.slice(5))}
  if(KAB_HAL[k]){ib.classList.remove("on");const kb=KAB_HAL[k][0];setTimeout(()=>{if(cur===k){pasangIstilah(app);pasangReveal()}},0);if(DATA_URL&&!Object.keys(LAST).length){startData();setTimeout(()=>{if(cur===k){const i=document.getElementById("wilIsi");if(i){i.innerHTML=isiWilayah(kb,"");pasangIstilah(i);pasangReveal()}}},4000)}}
  if(k==="wilayah"){pasangWilayah();if(DATA_URL&&!Object.keys(LAST).length){startData();setTimeout(()=>{if(cur==="wilayah"){const i=document.getElementById("wilIsi"),kb=document.getElementById("wilKab"),ds=document.getElementById("wilDis");if(i&&kb)i.innerHTML=isiWilayah(kb.value,ds.value)}},4000)}}
  if(IKLIM.includes(k))setTimeout(()=>{if(cur===k)pasangIstilah(app)},0);
  tandaiOto(app);
  if(k==="beranda"||PUSAT_HAL.includes(k))muatPusat();
  if(k==="beranda"){mulaiSlider();startData();pasangReveal();muatGempa()}
  if(PROFIL_HAL.includes(k)||k==="layanan-data"||IKLIM.includes(k))pasangReveal();
  if(k==="admin")pasangAdmin();else{app.onclick=null;app.onsubmit=null}
  {const tp=document.getElementById("tabsPola");if(tp)tp.onclick=e=>{const b=e.target.closest("button");if(!b)return;tp.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));const pb=document.getElementById("polaBox");pb.innerHTML=grafikPola(+b.dataset.i);gambarRc(pb)}}
  if(k==="peralatan"){startData();drawAlat();const t=document.getElementById("tabsAl");t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));drawAlat()}}
  document.querySelectorAll(".tabs[data-grup]").forEach(t=>{t.onclick=e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(`[data-pgrup="${t.dataset.grup}"]`).forEach(pn=>pn.hidden=pn.dataset.p!==b.dataset.t)}});
  if(document.querySelector("[data-news]"))muatBerita();
  const cm=document.getElementById("copyMail");
  if(cm)cm.onclick=()=>{const t=document.getElementById("mail").textContent;navigator.clipboard.writeText(t).then(()=>cm.textContent="Tersalin").catch(()=>{const r=document.createRange();r.selectNodeContents(document.getElementById("mail"));const sel=getSelection();sel.removeAllRanges();sel.addRange(r)})};
  pasangMeta(k);rapikanTautan();gambarRc(app);
  scrollTo({top:0});
}
[[ib,drop],[pb,pdrop]].forEach(([btn,dd])=>{const li=btn.parentElement;
 li.addEventListener("mouseenter",()=>{if(innerWidth>640){dd.hidden=false;btn.setAttribute("aria-expanded","true")}});
 li.addEventListener("mouseleave",()=>{if(innerWidth>640){dd.hidden=true;btn.setAttribute("aria-expanded","false")}});
 btn.onclick=e=>{e.stopPropagation();dd.hidden=innerWidth>640?false:!dd.hidden;btn.setAttribute("aria-expanded",String(!dd.hidden))};
 document.addEventListener("click",e=>{if(!e.target.closest("#"+dd.id)&&e.target!==btn){dd.hidden=true;btn.setAttribute("aria-expanded","false")}})});
bg.onclick=()=>{nav.hidden=!nav.hidden;bg.setAttribute("aria-expanded",String(!nav.hidden))};
function fit(){nav.hidden=innerWidth<=640}
addEventListener("resize",fit);fit();
function ikutiRiwayat(ev){const dl=document.getElementById("dlgUmum");if(dl&&ev&&ev.type==="popstate"){dl._tutup&&dl._tutup(1)}
 let k=halDariLokasi();if(RUTE_PATH&&location.hash.length>1){try{history.replaceState(history.state,"",urlHal(k))}catch(e){}}
 if(k!==cur){cur=(P[k]||dinamis(k))?k:"beranda";render();const y=ev&&ev.state&&ev.state.y;if(y)requestAnimationFrame(()=>setTimeout(()=>scrollTo({top:y}),30))}}
addEventListener("popstate",ikutiRiwayat);addEventListener("hashchange",ikutiRiwayat);render();
/* tautan yang muncul belakangan (berita, publikasi dari admin) ikut dirapikan */
if(RUTE_PATH){let tt=0;new MutationObserver(()=>{clearTimeout(tt);tt=setTimeout(()=>rapikanTautan(),120)}).observe(document.body,{childList:true,subtree:true})}
document.getElementById("themeBtn").onclick=()=>{document.documentElement.classList.toggle("dark")};
const HARI=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],BL=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
function tick(){const now=Date.now(),d=new Date(now+9*3600e3),u=new Date(now);const p=n=>String(n).padStart(2,"0");
  document.getElementById("jam").textContent=`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
  document.getElementById("jamu").textContent=`${p(u.getUTCHours())}:${p(u.getUTCMinutes())}:${p(u.getUTCSeconds())}`;
  document.getElementById("tgl").textContent=`${HARI[d.getUTCDay()]}, ${d.getUTCDate()} ${BL[d.getUTCMonth()]} ${d.getUTCFullYear()}`}
tick();setInterval(tick,1000);
