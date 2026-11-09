let lang = localStorage.getItem("bajo_lang") || "en"; // default: English
let filter = {q:"", cat:""};
const $ = s => document.querySelector(s);
const t = k => UI[lang][k] || k;
const L = o => (typeof o === "string" ? o : o[lang]);
const rp = n => "Rp " + n.toLocaleString("id-ID");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const bg = c => `background:linear-gradient(135deg,${c[0]},${c[1]})`;
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),2600)}
function catName(id){return L(CATEGORIES.find(c=>c.id===id).name)}

function renderStatic(){
 document.documentElement.lang = lang;
 $("#lang").textContent = lang === "en" ? "ID" : "EN";
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-i18n-ph]").forEach(e=>e.placeholder=t(e.dataset.i18nPh));
 const sel=$("#cat");
 sel.innerHTML=`<option value="">${t("allCat")}</option>`+CATEGORIES.map(c=>`<option value="${c.id}">${c.icon} ${esc(L(c.name))}</option>`).join("");
 sel.value=filter.cat;
 $("#destGrid").innerHTML=DESTINATIONS.map(d=>`<article class="card"><div class="thumb" style="${bg(d.c)}">${d.icon}</div><div class="b"><h3>${esc(d.name)}</h3><span class="loc">📍 ${esc(L(d.loc))}</span><p>${esc(L(d.desc))}</p><div class="row"><button class="btn out" data-dest="${d.id}">${t("explore")}</button></div></div></article>`).join("");
 $("#artGrid").innerHTML=ARTICLES.map(a=>`<article class="card"><div class="b"><div style="font-size:2rem">${a.icon}</div><h3>${esc(L(a.title))}</h3><div class="row"><button class="btn out" data-art="${a.id}">${t("read")}</button></div></div></article>`).join("");
 renderChips(); renderBiz();
}
function renderChips(){
 $("#catGrid").innerHTML=CATEGORIES.map(c=>`<button class="chip ${filter.cat===c.id?"on":""}" data-chip="${c.id}">${c.icon} ${esc(L(c.name))}</button>`).join("");
}
function renderBiz(){
 const q=filter.q.trim().toLowerCase();
 const list=BUSINESSES.filter(b=>(!filter.cat||b.cat===filter.cat)&&(!q||(b.name+" "+b.loc+" "+L(b.desc)+" "+catName(b.cat)).toLowerCase().includes(q)));
 $("#count").textContent=`(${list.length} ${t("results")})`;
 $("#bizGrid").innerHTML=list.length?list.map(b=>`<article class="card"><div class="thumb" style="${bg(b.c)}"><span class="tag">${t("demo")}</span>${b.icon}</div><div class="b"><span class="meta">${esc(catName(b.cat))}</span><h3>${esc(b.name)}</h3><span class="loc">📍 ${esc(b.loc)}</span><span>⭐ ${b.rating} · ${t("from")} <b>${rp(b.price)}</b></span><div class="row"><button class="btn out" data-biz="${b.id}">${t("viewDetails")}</button><button class="btn" data-wa="${b.id}">${t("whatsapp")}</button></div></div></article>`).join("")
  :`<div class="empty">${t("noResult")}<br><button class="btn" style="margin-top:12px" data-reset>${t("reset")}</button></div>`;
}
function applyFilter(q,cat,scroll=true){
 filter={q,cat}; $("#q").value=q; $("#cat").value=cat; renderChips(); renderBiz();
 if(scroll)$("#businesses").scrollIntoView();
}
function openModal(icon,c,title,loc,text){
 $("#mHead").style.cssText=bg(c); $("#mHead").textContent=icon;
 $("#mTitle").textContent=title; $("#mLoc").textContent=loc; $("#mText").textContent=text;
 $("#modal").showModal();
}
document.addEventListener("click",e=>{
 const el=e.target.closest("button,a"); if(!el)return;
 const d=el.dataset;
 if(d.dest){const x=DESTINATIONS.find(v=>v.id===d.dest);openModal(x.icon,x.c,x.name,"📍 "+L(x.loc),L(x.desc))}
 else if(d.art){const x=ARTICLES.find(v=>v.id===d.art);openModal(x.icon,["#0b3d5c","#16a5b0"],L(x.title),"",L(x.body))}
 else if(d.biz){const x=BUSINESSES.find(v=>v.id==d.biz);openModal(x.icon,x.c,x.name,`📍 ${x.loc} · ${t("from")} ${rp(x.price)}`,L(x.desc)+" ("+t("soon")+")")}
 else if(d.wa){const x=BUSINESSES.find(v=>v.id==d.wa);x.wa?window.open("https://wa.me/"+x.wa,"_blank","noopener"):toast(t("noWa"))}
 else if(d.chip)applyFilter("",filter.cat===d.chip?"":d.chip);
 else if(d.cat){applyFilter("",d.cat,false);$("#menu").classList.remove("open")}
 else if("reset" in d)applyFilter("","");
 else if("soon" in d){e.preventDefault();toast(t("soon"))}
 else if(el.id==="login")toast(t("soon"));
 else if(el.id==="mClose")$("#modal").close();
 else if(el.id==="lang"){lang=lang==="en"?"id":"en";localStorage.setItem("bajo_lang",lang);renderStatic()}
 else if(el.id==="burger"){const o=$("#menu").classList.toggle("open");el.setAttribute("aria-expanded",o)}
 else if(el.closest("#menu")&&el.tagName==="A")$("#menu").classList.remove("open");
});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")e.target.close()});
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();applyFilter($("#q").value,$("#cat").value)});
renderStatic();
