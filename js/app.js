/* ---------- 文法：把講解轉成有聲卡片 ---------- */
function clean(s){return s.replace(/[（(][^)）]*[)）]/g,"").replace(/[×✓→]/g," ").replace(/\s+/g," ").trim()}
function grammarUnit(u){
const les=u.lesson[0];const cards=[{k:"info",h:les.h,p:les.p}];
const ex=les.ex.filter(e=>!/×/.test(e[0])||true);
ex.forEach(e=>{const en=e[0];cards.push({k:"sent",en,zh:e[1],say:clean(en.split("（")[0].split("(")[0].replace(/^×.*?→\s*✓/,"").replace(/^×/,"").replace(/✓/,""))})});
const pool=ex.map(e=>clean(e[0].split("（")[0].split("(")[0].replace(/^×.*?→\s*✓/,"").replace(/^×/,"")).replace(/\s*vs\s.*$/,"")).filter(x=>x.length>3);
const n=Math.min(3,pool.length-1);
for(let i=0;i<n;i++){const t=pool[i];const others=pool.filter(x=>x!==t);shuffle(others);cards.push({k:"listen",say:t,prompt:"你聽到哪一句？",o:shuffle([t,others[0],others[1]].filter(Boolean)),a:t,e:""})}
u.quiz.forEach(q=>cards.push({k:"mc",q:q.q,o:q.o,a:q.a,e:q.e}));
return cards;
}
GRAMMAR.forEach(w=>w.units.forEach(u=>{u.cards=(window.grammarUnit2||grammarUnit)(u);u.i=u.i||"📘"}));
const WORLDS=[...PHONICS,...GRAMMAR];
/* ---------- 語音 ---------- */
let VOICE=null,RATE=.9;
function pickVoice(){if(!("speechSynthesis"in window))return;const vs=speechSynthesis.getVoices();if(!vs.length)return;
VOICE=vs.find(v=>/en[-_]AU/i.test(v.lang))||vs.find(v=>/en[-_]GB/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;
document.getElementById("audio-note").classList.toggle("on",!VOICE)}
if("speechSynthesis"in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}else document.getElementById("audio-note").classList.add("on");
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
function say(t,rate){return new Promise(res=>{if(!("speechSynthesis"in window))return res();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);if(VOICE)u.voice=VOICE;u.lang=VOICE?VOICE.lang:"en-AU";u.rate=rate||RATE;u.onend=u.onerror=()=>res();speechSynthesis.speak(u);setTimeout(res,1800)})}
function speak(t,btn,rate){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);if(VOICE)u.voice=VOICE;u.lang=VOICE?VOICE.lang:"en-AU";u.rate=rate||RATE;
if(btn){btn.classList.add("playing");u.onend=u.onerror=()=>btn.classList.remove("playing")}speechSynthesis.speak(u)}
/* ---------- 狀態 ---------- */
const KEY="ielts-voyage-v2";
const DEFAULT={xp:0,done:{},stars:{},streak:0,last:"",todayXP:0,todayDate:"",badges:[],perfect:0};
let S=load();
function load(){try{const r=localStorage.getItem(KEY);return r?Object.assign({},DEFAULT,JSON.parse(r)):{...DEFAULT}}catch(e){return {...DEFAULT}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function today(){return new Date().toISOString().slice(0,10)}
function lvl(){return Math.floor(S.xp/200)+1}
const ALL=[];WORLDS.forEach((w,wi)=>w.units.forEach((u,ui)=>ALL.push({w:wi,u:ui,id:w.id+"-"+ui})));
function nextIndex(){const i=ALL.findIndex(x=>!S.done[x.id]);return i<0?ALL.length:i}
const $=s=>document.querySelector(s);
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("on"));$("#"+id).classList.add("on");window.scrollTo(0,0)}
function renderBar(){$("#s-streak").textContent=S.streak;$("#s-xp").textContent=S.xp;$("#s-lv").textContent=lvl();
if(S.todayDate!==today()){S.todayDate=today();S.todayXP=0;save()}
const p=Math.min(100,Math.round(S.todayXP/50*100));$("#goal-ring").style.setProperty("--p",p);$("#goal-pct").textContent=p+"%";
$("#goal-text").textContent=p>=100?"今日目標達成，再多闖一關也行。":S.todayXP>0?`今天已拿 ${S.todayXP} XP，再 ${50-S.todayXP} 就達標。`:"今天還沒出航，先選一座島吧。"}
/* ---------- 地圖 ---------- */
function renderMap(){
const nx=nextIndex();const m=$("#map");m.innerHTML="";
WORLDS.forEach((w,wi)=>{
const sec=document.createElement("div");sec.className="world";
sec.innerHTML=`<div class="world-head"><h2>${w.icon} ${w.name}</h2><span>${w.sub}</span></div><div class="sea-path"></div>`;
const path=sec.querySelector(".sea-path");
w.units.forEach((u,ui)=>{
const idx=ALL.findIndex(x=>x.w===wi&&x.u===ui);const id=ALL[idx].id;
const st=S.done[id]?"done":idx===nx?"now":idx<nx?"done":"locked";
const n=document.createElement("div");n.className="node "+st;
const stars=S.stars[id]?"★".repeat(S.stars[id])+"☆".repeat(3-S.stars[id]):"";
n.innerHTML=`<button class="pin" ${st==="locked"?"disabled":""} aria-label="${u.t}">${st==="done"?"✓":u.i}</button><div class="label"><b>${u.t}</b><small>${st==="locked"?"完成上一關解鎖":st==="done"?"已通關，可重玩":`${u.cards.length} 張卡片`}</small><div class="stars">${stars}</div></div>`;
n.querySelector(".pin").addEventListener("click",()=>startLesson(wi,ui));
path.appendChild(n);
});
m.appendChild(sec);
});
}
/* ---------- 課程流程 ---------- */
let L=null;
function startLesson(wi,ui){
const u=WORLDS[wi].units[ui];
L={wi,ui,u,id:WORLDS[wi].id+"-"+ui,step:0,hearts:5,correct:0,combo:0,picked:null,total:u.cards.filter(c=>c.k==="listen"||c.k==="mc"||c.k==="order").length};
show("scr-lesson");renderStep();
}
function hl(w,h){if(!h)return w;const i=w.toLowerCase().indexOf(h.toLowerCase());if(i<0)return w;return w.slice(0,i)+"<em>"+w.slice(i,i+h.length)+"</em>"+w.slice(i+h.length)}
function speedRow(){return `<div class="speed"><button class="chip ${RATE<.8?"on":""}" data-r=".65">慢速</button><button class="chip ${RATE>=.8?"on":""}" data-r=".9">正常</button></div>`}
function bindSpeed(b){b.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{RATE=+c.dataset.r;b.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===c))})}
function renderStep(){
const b=$("#lesson-body");const c=L.u.cards[L.step];
$("#hearts").textContent="❤".repeat(L.hearts)+"♡".repeat(5-L.hearts);
$("#prog").style.width=(L.step/L.u.cards.length*100)+"%";
if(!c){finish(true);return}
const tag=`<span class="tag">${WORLDS[L.wi].name}｜${L.u.t}</span>`;
const next=`<button class="cta" id="next">${L.step===L.u.cards.length-1?"完成這關":"下一張"}</button>`;
if(c.k==="info"){
b.innerHTML=`<div class="card">${tag}<h3>${c.h}</h3><p>${c.p}</p>${c.say?`<div class="play-row"><button class="play" id="p1">🔊 聽整組</button></div>`:""}</div>${next}`;
if(c.say)$("#p1").onclick=e=>speak(c.say,e.currentTarget);
}else if(c.k==="letter"){
b.innerHTML=`<div class="card">${tag}<div class="big-letter"><div class="L">${c.L}<small>${c.L.toLowerCase()}</small></div><div class="snd">聲音 ${c.s}</div><div class="zh">${c.w} ${c.zh}</div></div>
<div class="play-row"><button class="play" id="p1">🔊 ${c.L} · ${c.w}</button><button class="play sm" id="p2" aria-label="只唸單字">${c.w}</button></div>${speedRow()}<p class="tip">嘴型：${c.tip}。跟著唸三次：${c.L}，${c.L}，${c.w}。</p>${c.adv?`<div class="ex" style="display:flex;align-items:center;gap:8px;background:var(--sea);border-radius:14px;padding:10px 12px;margin-top:10px"><div style="flex:1"><b>進階字：${c.adv}</b><span class="zh" style="display:block;font-size:14px">${c.advzh}</span></div><button class="spk play sm" id="p3" style="height:40px;min-width:40px;font-size:16px">🔊</button></div>`:""}</div>${next}`;
$("#p1").onclick=e=>speak(c.say,e.currentTarget);$("#p2").onclick=e=>speak(c.w,e.currentTarget);if(c.adv)$("#p3").onclick=e=>speak(c.adv,e.currentTarget);bindSpeed(b);
setTimeout(()=>speak(c.say,$("#p1")),250);
}else if(c.k==="word"){
const segs=segment(c.say||c.w);
const blocks=segs.map((s,i)=>`<button class="blk" data-i="${i}"><span class="g">${s.g}</span><span class="ipa">${s.ipa}</span></button>`).join('<span class="plus">+</span>');
b.innerHTML=`<div class="card">${tag}<div class="big-word"><div class="W">${hl(c.w,c.hl)}</div><div class="zh">${c.zh}</div></div>
<div class="blocks">${blocks}</div>
<div class="play-row"><button class="play sm" id="p3">🧩 一塊一塊唸</button><button class="play" id="p1">🔊 拼起來</button></div>${c.tip?`<p class="tip">${c.tip}</p>`:""}<p class="tip">點每塊積木聽單一聲音（機器發音是近似值，以整個字為準）。</p></div>${next}`;
const word=(c.say||c.w).replace(/·/g,"");
$("#p1").onclick=e=>speak(word,e.currentTarget);
b.querySelectorAll(".blk").forEach(k=>k.onclick=()=>{k.classList.add("hit");setTimeout(()=>k.classList.remove("hit"),400);speak(segs[+k.dataset.i].say,null,.8)});
$("#p3").onclick=async e=>{const bl=b.querySelectorAll(".blk");for(let i=0;i<segs.length;i++){bl[i].classList.add("hit");await say(segs[i].say,.75);bl[i].classList.remove("hit");await wait(120)}await wait(250);speak(word,$("#p1"),.7)};
setTimeout(()=>speak(word,$("#p1")),250);
}else if(c.k==="sent"){
b.innerHTML=`<div class="card">${tag}<div class="sent">${c.en}</div><div class="zh">${c.zh}</div>
<div class="play-row"><button class="play" id="p1">🔊 聽句子</button><button class="play sm" id="p2">🐢 慢速</button></div><p class="tip">聽完後按暫停跟讀一次，再按下一張。</p></div>${next}`;
$("#p1").onclick=e=>speak(c.say,e.currentTarget);$("#p2").onclick=e=>speak(c.say,e.currentTarget,.6);
setTimeout(()=>speak(c.say,$("#p1")),250);
}else if(c.k==="listen"){
const opts=c.o.map(o=>`<button class="opt" data-v="${o}">${o}</button>`).join("");
b.innerHTML=`<div class="card">${tag}<div class="q">${c.prompt||"聽一聽，你聽到哪一個？"}</div><div class="play-row"><button class="play" id="p1">🔊 再聽一次</button><button class="play sm" id="p2">🐢</button></div>
<div class="opts ${c.o.every(o=>o.length<=8)?"grid2":""}" id="opts">${opts}</div><div class="feedback" id="fb"></div></div><button class="cta" id="check" disabled>確認</button>`;
$("#p1").onclick=e=>speak(c.say,e.currentTarget);$("#p2").onclick=e=>speak(c.say,e.currentTarget,.55);
setTimeout(()=>speak(c.say,$("#p1")),300);
b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{b.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));o.classList.add("sel");L.picked=o.dataset.v;$("#check").disabled=false});
$("#check").onclick=()=>check(o=>o.dataset.v===c.a,c.a,c.e);
return;
}else if(window.renderExtra&&window.renderExtra(c,b,tag,next)){return;}else if(c.k==="mc"){
if(window.fixAnswerIndex)window.fixAnswerIndex(c);const qt=c.q.replace(/___/g,'<span class="blank">&nbsp;</span>');
b.innerHTML=`<div class="card">${tag}<div class="q">${qt}</div><div class="opts" id="opts">${c.o.map((o,i)=>`<button class="opt" data-i="${i}"><span class="mini">🔊</span><span>${o}</span></button>`).join("")}</div><div class="feedback" id="fb"></div></div><button class="cta" id="check" disabled>確認</button>`;
b.querySelectorAll(".opt").forEach(o=>{o.onclick=()=>{b.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));o.classList.add("sel");L.picked=+o.dataset.i;$("#check").disabled=false};
o.querySelector(".mini").onclick=ev=>{ev.stopPropagation();const t=c.o[+o.dataset.i];if(/[A-Za-z]{2,}/.test(t))speak(clean(t))}});
$("#check").onclick=()=>check(o=>+o.dataset.i===c.a,c.o[c.a],c.e);
return;
}
$("#next").onclick=()=>{speechSynthesis&&speechSynthesis.cancel();L.step++;renderStep()};
}
function check(isRight,answerText,explain){
const opts=[...document.querySelectorAll(".opt")];const fb=$("#fb");
opts.forEach(o=>o.disabled=true);
const sel=opts.find(o=>o.classList.contains("sel"));const ok=isRight(sel);
opts.find(isRight).classList.add("ok");if(!ok)sel.classList.add("bad");
if(ok){window.sfx&&sfx.ok(L.combo+1);L.correct++;L.combo++;fb.className="feedback on ok";fb.innerHTML=`${["太棒了！","正確！","漂亮！","就是這樣！"][L.combo%4]}<small>${explain}</small>`;if(L.combo>=2)showCombo(L.combo)}
else{window.sfx&&sfx.bad();L.combo=0;L.hearts--;fb.className="feedback on bad";fb.innerHTML=`差一點。正確答案：${answerText}<small>${explain}</small>`;$("#hearts").textContent="❤".repeat(L.hearts)+"♡".repeat(5-L.hearts);if(/[A-Za-z]{2,}/.test(answerText))setTimeout(()=>speak(clean(answerText)),300)}
const btn=$("#check");btn.disabled=false;
if(L.hearts<=0){btn.textContent="體力用完了，回頭再聽一次";btn.onclick=()=>finish(false);return}
btn.textContent=L.step===L.u.cards.length-1?"看結果":"下一張";btn.onclick=()=>{L.step++;renderStep()};
}
function showCombo(n){const c=$("#combo");c.textContent=`${n} 連擊 🔥`;c.classList.remove("pop");void c.offsetWidth;c.classList.add("pop")}
function finish(passed){
const pct=L.total?L.correct/L.total:1;const stars=passed?(pct===1?3:pct>=.75?2:1):0;
let gain=passed?10+L.correct*8+(pct===1?20:0):L.correct*4;
if(passed&&!S.done[L.id])gain+=20;
const d=today();
if(S.last!==d){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last===y?S.streak+1:1;S.last=d}
if(S.todayDate!==d){S.todayDate=d;S.todayXP=0}
S.xp+=gain;S.todayXP+=gain;
if(passed){S.done[L.id]=true;S.stars[L.id]=Math.max(S.stars[L.id]||0,stars);if(pct===1)S.perfect++}
const nb=awardBadges();save();renderBar();window.sfx&&(passed?sfx.pass(stars):sfx.fail());if(nb.length&&window.sfx)setTimeout(()=>sfx.badge(),900);
$("#result-body").innerHTML=`<div class="big">${passed?(stars===3?"🏆":"⛵"):"🌧️"}</div><h2>${passed?(stars===3?"滿分通關！":"通關成功"):"這次先靠岸休息"}</h2><p>${passed?`${L.u.t} 完成，答對 ${L.correct} / ${L.total} 題`:`答對 ${L.correct} / ${L.total} 題。再聽一次卡片，下次一定過。`}</p>
<div class="rows"><div><b>+${gain}</b><small>XP</small></div><div><b>${"★".repeat(stars)}${"☆".repeat(3-stars)}</b><small>星星</small></div><div><b>${S.streak} 天</b><small>連續航行</small></div><div><b>Lv ${lvl()}</b><small>航海等級</small></div></div>
${nb.length?`<div class="card" style="margin-bottom:10px">新徽章：${nb.map(b=>b.em+" "+b.n).join("、")}</div>`:""}
<button class="cta" id="r-next">${passed?"回到地圖":"重新挑戰"}</button><button class="cta ghost" id="r-again" style="margin-top:10px">${passed?"再玩一次這關":"回到地圖"}</button>`;
$("#r-next").onclick=()=>passed?(renderMap(),show("scr-map")):startLesson(L.wi,L.ui);
$("#r-again").onclick=()=>passed?startLesson(L.wi,L.ui):(renderMap(),show("scr-map"));
show("scr-result");if(passed)confetti(stars===3?160:70);
}
/* ---------- 徽章 ---------- */
const BADGES=[
{id:"first",em:"⚓",n:"首航",d:"完成第一關",t:()=>Object.keys(S.done).length>=1},
{id:"p1",em:"🔤",n:"字母島船長",d:"通過字母島",t:()=>WORLDS[0].units.every((u,i)=>S.done["p1-"+i])},
{id:"p2",em:"🅰️",n:"短母音船長",d:"通過短母音灣",t:()=>WORLDS[1].units.every((u,i)=>S.done["p2-"+i])},
{id:"p3",em:"✨",n:"長母音船長",d:"通過長母音礁",t:()=>WORLDS[2].units.every((u,i)=>S.done["p3-"+i])},
{id:"p4",em:"🔗",n:"子音峽船長",d:"通過子音峽",t:()=>WORLDS[3].units.every((u,i)=>S.done["p4-"+i])},
{id:"w2",em:"🧱",n:"基礎文法",d:"通過基礎灣",t:()=>WORLDS[4].units.every((u,i)=>S.done["w2-"+i])},
{id:"w4",em:"🌊",n:"高階文法",d:"通過深海峽",t:()=>WORLDS[6].units.every((u,i)=>S.done["w4-"+i])},
{id:"w5",em:"🏙️",n:"抵達布里斯本",d:"通過所有關卡",t:()=>ALL.every(x=>S.done[x.id])},
{id:"perfect",em:"💯",n:"零失誤",d:"任一關滿分",t:()=>S.perfect>=1},
{id:"streak7",em:"🔥",n:"七日不斷",d:"連續 7 天",t:()=>S.streak>=7},
{id:"xp1000",em:"⚡",n:"千分水手",d:"累積 1000 XP",t:()=>S.xp>=1000}];
function awardBadges(){const n=[];BADGES.forEach(b=>{if(!S.badges.includes(b.id)&&b.t()){S.badges.push(b.id);n.push(b)}});return n}
function renderProfile(){
const done=Object.keys(S.done).length;const stars=Object.values(S.stars).reduce((a,b)=>a+b,0);
$("#prof-rows").innerHTML=`<div><b>${S.xp}</b><small>總 XP</small></div><div><b>${done} / ${ALL.length}</b><small>已通關</small></div><div><b>${stars}</b><small>星星</small></div><div><b>${S.streak} 天</b><small>連續航行</small></div>`;
$("#abc").innerHTML=ABC.map(a=>`<button data-s="${a[0]}. ${a[0].toLowerCase()}. ${a[2]}." aria-label="${a[0]} ${a[2]}">${a[0]}</button>`).join("");
$("#abc").querySelectorAll("button").forEach(b=>b.onclick=()=>speak(b.dataset.s));
$("#badges").innerHTML=BADGES.map(b=>`<div class="badge ${S.badges.includes(b.id)?"":"off"}"><div class="em">${b.em}</div><b>${b.n}</b><small>${b.d}</small></div>`).join("");
}
/* ---------- 彩帶 ---------- */
function confetti(n){
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
const c=$("#confetti"),x=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
const cols=["#1E6FD9","#FFB13D","#2EB872","#F0506E","#F5B700"];
const ps=Array.from({length:n},()=>({x:Math.random()*c.width,y:-20-Math.random()*200,r:4+Math.random()*6,v:2+Math.random()*3,a:Math.random()*6,s:Math.random()*.2-.1,col:cols[Math.random()*cols.length|0]}));
let t=0;(function f(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a);p.a+=p.s;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.col;x.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);x.restore()});if(++t<140)requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height)})();
}
/* ---------- 安裝成 App ---------- */
let deferredInstall=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e});
$("#btn-install").onclick=async()=>{if(deferredInstall){deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;return}show("scr-install")};
$("#btn-install-back").onclick=()=>show("scr-map");
if(matchMedia("(display-mode: standalone)").matches||navigator.standalone){$("#install-card").style.display="none"}
document.addEventListener("touchend",function unlock(){if("speechSynthesis"in window){const u=new SpeechSynthesisUtterance(" ");u.volume=0;speechSynthesis.speak(u)}document.removeEventListener("touchend",unlock)},{once:true});
$("#btn-home").onclick=()=>{speechSynthesis&&speechSynthesis.cancel();renderMap();show("scr-map")};
$("#btn-profile").onclick=()=>{renderProfile();show("scr-profile")};
$("#btn-quit").onclick=()=>{if(confirm("離開這一關？這關的進度不會保存。")){speechSynthesis&&speechSynthesis.cancel();renderMap();show("scr-map")}};
$("#btn-theme").onclick=()=>{const r=document.documentElement;const cur=r.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");r.dataset.theme=cur==="dark"?"light":"dark";try{localStorage.setItem(KEY+"-theme",r.dataset.theme)}catch(e){}};
$("#btn-reset").onclick=()=>{if(confirm("確定要清除所有進度與徽章？")){S={...DEFAULT,done:{},stars:{},badges:[]};save();renderBar();renderProfile()}};
try{const th=localStorage.getItem(KEY+"-theme");if(th)document.documentElement.dataset.theme=th}catch(e){}
renderBar();renderMap();
if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
