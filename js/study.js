/* ---------- 做題中心：文法逐點練習、5.5 單字階梯、閱讀、寫作 ---------- */
/* 資料在 js/data/*.js（window.GD_W2 / GD_W3 / GD_W4 / VX_1 / VX_2 / VX_CHEF / RD / WT），驗證：python -I tools/validate.py <檔案> */
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
/* 打字作答的比對：忽略大小寫、標點、多餘空白，並展開縮寫（I'm = I am） */
function norm(s){s=String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[’‘`]/g,"'").replace(/[“”]/g,'"');
s=s.replace(/\bcan't\b/g,"can not").replace(/\bcannot\b/g,"can not").replace(/\bwon't\b/g,"will not").replace(/\bshan't\b/g,"shall not").replace(/n't\b/g," not").replace(/'m\b/g," am").replace(/'re\b/g," are").replace(/'ve\b/g," have").replace(/'ll\b/g," will").replace(/'d\b/g," would");
return s.replace(/[.,!?;:"()]/g," ").replace(/\s+/g," ").trim()}
const GD=Object.assign({},window.GD_W2||{},window.GD_W3||{},window.GD_W4||{});
/* ---------- 文法：每個重點講完，緊接 5 題 ---------- */
function qCard(q,tag){
if(q.t==="mc"||q.t==="fix")return {k:"mc",q:(q.t==="fix"&&!/^改錯/.test(q.q)?"改錯："+q.q:q.q),o:q.o,a:q.a,e:q.e,sub:tag};
if(q.t==="fill")return {k:"input",prompt:"填空：在空格填入正確的字",q:q.q,a:q.a,e:q.e,sub:tag};
if(q.t==="order"){const w=q.s.trim().split(/\s+/);let sh=shuffle(w.slice());if(sh.join(" ")===w.join(" "))sh.reverse();return {k:"order",words:sh,a:w.join(" "),say:q.s,e:q.e,sub:tag}}
if(q.t==="tr")return {k:"input",prompt:"翻譯成英文",zh:q.zh,a:q.a,e:q.e,multi:true,self:true,sub:tag};
return null}
const _oldGrammarUnit=window.grammarUnit2;
window.grammarUnit2=function(u){
const pts=GD[u.t];if(!pts)return _oldGrammarUnit(u);
const cards=[{k:"info",h:u.t,p:`這一課有 ${pts.length} 個重點。每個重點先看說明和例句，接著立刻做 5 題：選擇、填空、改錯、句子重組、中翻英。答錯會看到解析。`}];
pts.forEach((p,i)=>{cards.push({k:"lesson",n:i+1,of:pts.length,h:p.h,p:p.p,f:p.f||[],ex:p.ex||[]});
p.q.forEach((q,j)=>{const c=qCard(q,`重點 ${i+1}・練習 ${j+1}/5`);if(c)cards.push(c)})});
const n=typeof noteFor==="function"&&noteFor(u);if(n&&n.m)cards.push({k:"mistakes",h:"常見錯誤總整理",rows:n.m});
return cards};
/* ---------- 5.5 單字階梯與西廚單字 ---------- */
const VXMAP={};
[window.VX_1,window.VX_2,window.VX_CHEF].forEach(d=>(d||[]).forEach(st=>st.units.forEach(u=>u.w.forEach(r=>VXMAP[r[0].toLowerCase()]=r))));
function wordQ(r,i,rows){const [w,ipa,zh,ex,exzh]=r;const others=shuffle(rows.filter(x=>x[0]!==w));
const t=i%4;
if(t===0)return {k:"listen",say:w,prompt:"聽音選字：你聽到哪個字？",o:shuffle([w,others[0][0],others[1][0]]),a:w,e:`${w} ${ipa}：${zh}`,vw:w};
if(t===1){const o=shuffle([zh,others[0][2],others[1][2],others[2][2]]);return {k:"mc",q:`「${w}」是什麼意思？`,o,a:o.indexOf(zh),e:`${w} ${ipa}：${zh}`,vw:w}}
if(t===2){const q=ex.replace(new RegExp("(?<![A-Za-z])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![A-Za-z])","i"),"___");const o=shuffle([w,others[0][0],others[1][0]]);return {k:"mc",q:`句子填空：${q}`,o,a:o.indexOf(w),e:`${ex}（${exzh}）`,vw:w}}
return {k:"input",prompt:"聽發音，拼出這個字",zh:zh,say:w,a:[w],e:`${w} ${ipa}：${zh}`,vw:w,spell:true}}
function vxUnit(t,i,rows){const cards=[{k:"info",h:t,p:`${rows.length} 個字，每 5 個一組：先看字卡、聽發音和例句，接著做練習（聽音選字、選意思、句子填空、拼字）。答錯的字會自動放進「錯字複習」。`}];
for(let s=0;s<rows.length;s+=5){const chunk=rows.slice(s,s+5);
chunk.forEach(r=>cards.push({k:"vocab",w:r[0],ipa:r[1],zh:r[2],en:r[3],enzh:r[4]}));
chunk.forEach((r,j)=>cards.push(wordQ(r,s+j,rows)))}
return cards}
function wrongList(){return Object.keys(S.wrong||{}).filter(w=>VXMAP[w])}
window.addWrong=w=>{w=String(w).toLowerCase();if(!VXMAP[w])return;S.wrong=S.wrong||{};S.wrong[w]=Date.now();save()};
function reviewCards(){const ws=wrongList().slice(0,20);if(!ws.length)return [{k:"info",h:"錯字本是空的 🎉",p:"做單字練習時答錯的字會自動收進這裡。目前沒有要複習的字，去單字階梯挑一組吧。"}];
const rows=ws.map(w=>VXMAP[w]);const pool=Object.values(VXMAP);
const cards=[{k:"info",h:`錯字複習：${ws.length} 個字`,p:"每個字先看字卡，再選意思、再拼字。拼字答對，這個字就會從錯字本移除。"}];
rows.forEach(r=>{const others=shuffle(pool.filter(x=>x[0]!==r[0]));const o=shuffle([r[2],others[0][2],others[1][2],others[2][2]]);
cards.push({k:"vocab",w:r[0],ipa:r[1],zh:r[2],en:r[3],enzh:r[4]});
cards.push({k:"mc",q:`「${r[0]}」是什麼意思？`,o,a:o.indexOf(r[2]),e:`${r[0]} ${r[1]}：${r[2]}`,vw:r[0]});
cards.push({k:"input",prompt:"聽發音，拼出這個字",zh:r[2],say:r[0],a:[r[0]],e:`${r[0]} ${r[1]}：${r[2]}`,vw:r[0],rv:true,spell:true})});
return cards}
function vxWorld(){const units=[{t:"錯字複習",i:"🔁",dyn:reviewCards,label:()=>{const n=wrongList().length;return n?`${n} 個字待複習`:"答錯的字會收進這裡"}}];
const ic=["①","②","③","④","⑤"];
(window.VX_1||[]).concat(window.VX_2||[]).forEach((st,si)=>st.units.forEach(u=>units.push({t:`${st.s.split("｜")[0]}｜${u.t}`,i:u.i,cards:vxUnit(`${st.s}・${u.t}`,u.i,u.w)})));
return {id:"vx",name:"單字階梯 Word Ladder",sub:"IELTS 5.5 必備單字，從第 1 階（生活基礎）到第 5 階（學術字彙），由易到難。",icon:"🪜",band:[4,6],units}}
function chefWorld(){const units=[];(window.VX_CHEF||[]).forEach(st=>st.units.forEach(u=>units.push({t:u.t,i:u.i,cards:vxUnit(u.t,u.i,u.w)})));
return {id:"ck",name:"西廚英文 Chef’s Kitchen",sub:"TAFE 西廚課程會用到的設備、烹調方法、刀工、食材與食品安全英文。",icon:"👨‍🍳",band:[3,7],units}}
/* ---------- 閱讀 ---------- */
function psgHTML(p,hi){return `<h3 class="psg-t">${esc(p.t)}</h3>${p.text.map((x,i)=>`<p class="psg-p ${hi===i?"hi":""}"><b>${i+1}</b>${esc(x)}</p>`).join("")}`}
function rdUnit(p){const cards=[{k:"info",h:`${p.t}（${p.lv}）`,p:"先讀一次全文（可以按「聽全文」），再做題。做題時可隨時打開文章對照。IELTS 技巧：先看題目的關鍵字，再回文章找同義改寫的句子。"},{k:"passage",p}];
p.q.forEach((q,j)=>{const sub=`閱讀題 ${j+1}/${p.q.length}`;
if(q.t==="tfng"){const o=["TRUE（正確）","FALSE（錯誤）","NOT GIVEN（沒提到）"];cards.push({k:"rq",psg:p,q:`判斷：${q.s}`,o,a:["TRUE","FALSE","NOT GIVEN"].indexOf(q.a),e:q.e,sub})}
else if(q.t==="mc")cards.push({k:"rq",psg:p,q:q.q,o:q.o,a:q.a,e:q.e,sub});
else if(q.t==="heading")cards.push({k:"rq",psg:p,hi:q.p,q:`第 ${q.p+1} 段最適合哪個標題？`,o:q.o,a:q.a,e:q.e,sub});
else if(q.t==="gap")cards.push({k:"input",psg:p,prompt:"摘要填空：從文章找一個字填入",q:q.q,a:q.a,e:q.e,sub})});
return cards}
function rdWorld(){return {id:"rd",name:"閱讀燈塔 Reading Lighthouse",sub:"原創 IELTS 風格短文，Band 4 → 6 由淺到深：是非題（T/F/NG）、標題配對、選擇、摘要填空。",icon:"🗼",band:[4,7],units:(window.RD||[]).map(p=>({t:`${p.lv}｜${p.t}`,i:p.i||"📖",cards:rdUnit(p)}))}}
/* ---------- 寫作 ---------- */
function wtWorlds(){const W=window.WT;if(!W)return [];
const a=W.sentence.map(u=>({t:`句子｜${u.t}`,i:u.i,cards:[{k:"info",h:u.t,p:u.tip+" 打完按確認。句子寫法不只一種，如果你的答案其實也對，可以按「我的答案也對」。"}].concat(u.items.map((it,j)=>{const sub=`句子練習 ${j+1}/${u.items.length}`;
if(it.t==="tr")return {k:"input",prompt:"翻譯成英文"+(it.hint?`（提示：${it.hint}）`:""),zh:it.zh,a:it.a,e:it.e,multi:true,self:true,sub};
if(it.t==="combine")return {k:"input",prompt:`用「${it.use}」把兩句合併成一句`,q:it.s.join("<br>"),a:it.a,e:it.e,multi:true,self:true,sub};
if(it.t==="rewrite")return {k:"input",prompt:`改寫：${it.task}`,q:it.s,a:it.a,e:it.e,multi:true,self:true,sub};
return {k:"wfree",task:it.task,s:it.s,must:it.must||[],min:it.min||10,model:it.model,e:it.e,sub}}))}));
const b=W.paragraph.map(t=>({t:`段落｜${t.title}`,i:"📝",cards:[{k:"essay",kind:"para",it:t}]}));
const c=W.task1.map(t=>({t:`Task 1｜${t.title}`,i:"📊",cards:[{k:"essay",kind:"t1",it:t}]}));
const d=W.task2.map(t=>({t:`Task 2｜${t.title}`,i:"🖋️",cards:[{k:"essay",kind:"t2",it:t}]}));
return [{id:"wa",name:"寫作工坊 Writing Workshop",sub:"從句子寫起：完整句、時態、連接詞、複合句、IELTS 句型，再寫成段落。",icon:"✍️",band:[3,6],units:a.concat(b)},
{id:"wb",name:"寫作考場 IELTS Writing",sub:"Task 1 圖表描述（150 字、20 分鐘）與 Task 2 議論文（250 字、40 分鐘）：計時、字數、錯誤檢查、範文與自評。",icon:"🏛️",band:[5,7],units:c.concat(d)}]}
/* 台灣學生常見寫作錯誤（自動檢查） */
const ERRS=[
[/\b(I|we|they|you) very (like|love|enjoy|want|hope)\b/i,"very 不能直接修飾動詞：I really like… / I like … very much"],
[/\b(although|though)\b[^.!?]*,\s*but\b/i,"although 和 but 不能同時用，二選一"],
[/\bbecause\b[^.!?]*,\s*so\b/i,"because 和 so 不能同時用，二選一"],
[/\bpeoples\b/i,"people 已經是複數，不加 s"],
[/\b(informations|advices|equipments|furnitures|homeworks|knowledges|researches|evidences)\b/i,"這個字不可數，不加 s"],
[/\b(an?) (advice|information|news|furniture|equipment|homework)\b/i,"不可數名詞前面不能加 a/an（可用 a piece of）"],
[/\b(he|she|it) (have|do|go|don't|like|want|need)\b/i,"第三人稱單數，動詞要變化（has / does / goes / doesn’t / likes…）"],
[/\b(the (chart|graph|table|figure|diagram)|this chart|this graph) (show|illustrate|compare|give|indicate|present)\b/i,"主詞是單數，動詞要加 s：The chart shows…"],
[/\bthere (have|has)\b/i,"「有」要用 there is / there are，不是 there have"],
[/\bmore (better|worse|easier|cheaper|bigger|smaller|faster|healthier)\b/i,"比較級不能再加 more"],
[/\bdiscuss about\b/i,"discuss 後面直接接受詞，不加 about"],
[/\bin the other hand\b/i,"要寫 on the other hand"],
[/\b(suggest|recommend) (him|her|me|them|you|us) to\b/i,"suggest 的句型：suggest that someone (should) do，或 suggest doing"],
[/\bloss weight\b/i,"減重是 lose weight"],
[/\bfeel (boring|interesting|tiring|exciting)\b/i,"人的感受用 -ed：feel bored / interested / tired / excited"],
[/\b(I am|I'm|I’m) boring\b/i,"I am boring 是「我很無趣」；覺得無聊要寫 I am bored"],
[/(^|[.!?]\s+)[a-z]/,"句子開頭要大寫"],
[/(^|\s)i(\s|'|’)/,"「我」永遠大寫 I"],
[/\b(a) (?!uni|use|usu|eu|one|once|u\.)[aeiou]\w*/i,"母音開頭的字前面用 an（例如 an apple）"],
[/\b(an) (?!h|hour|honest)[bcdfgjklmnpqrstvwxyz]\w*/i,"子音開頭的字前面用 a"],
[/\b(don't|can't|won't|isn't|aren't|doesn't|didn't|it's|I'm|don’t|can’t|won’t|isn’t|aren’t|doesn’t|didn’t|it’s|I’m)\b/,"IELTS 寫作避免縮寫：don’t → do not，it’s → it is"],
[/\b(so many|a lot of|lots of)\b.*\b(so many|a lot of|lots of)\b/i,"a lot of / so many 重複太多次，換成 many、a large number of、numerous"],
[/\b(gonna|wanna|kids|stuff|things like that)\b/i,"太口語，寫作改成 going to / want to / children / items"]];
const LINKS=["firstly","secondly","finally","however","moreover","furthermore","in addition","therefore","as a result","consequently","for example","for instance","on the other hand","in conclusion","to sum up","overall","although","while","whereas","because","since","in contrast","similarly","such as"];
function wcount(t){return (t.trim().match(/[A-Za-z0-9’'-]+/g)||[]).length}
function autoCheck(t,it,kind){const out=[];const n=wcount(t);const min=kind==="t1"?150:kind==="t2"?250:(it.min||60);
out.push([n>=min,`字數 ${n}／至少 ${min}`]);
if(kind!=="para"){const paras=t.split(/\n\s*\n/).filter(x=>x.trim()).length;const need=kind==="t1"?3:4;out.push([paras>=need,`段落數 ${paras}／建議 ${need} 段（段落之間空一行）`])}
const low=t.toLowerCase();const used=LINKS.filter(l=>new RegExp("\\b"+l+"\\b").test(low));out.push([used.length>=(kind==="para"?2:4),`連接詞 ${used.length} 個${used.length?"："+used.join("、"):""}`]);
(it.must||[]).forEach(m=>out.push([low.includes(m.toLowerCase()),`用到「${m}」`]));
if(kind==="t1")out.push([/\boverall\b|\bin general\b|\bit is clear\b|\bit is evident\b/i.test(t),"有總覽句（Overall, …）"]);
if(kind==="t2")out.push([/\bin conclusion\b|\bto sum up\b|\bto conclude\b/i.test(t),"有結論段（In conclusion, …）"]);
const errs=[];const sents=t.split(/(?<=[.!?])\s+/);ERRS.forEach(([re,msg])=>{const s=sents.find(x=>re.test(x))||(re.test(t)?"":null);if(s!==null&&re.test(t))errs.push([msg,s])});
return {out,errs}}
function chartHTML(it){const cols=["var(--ocean)","var(--sun)","var(--leaf)","var(--coral)"];const L=it.labels,S2=it.series;
if(it.type==="table")return `<div class="tbl-wrap"><table class="tbl"><tr><th></th>${L.map(l=>`<th>${esc(l)}</th>`).join("")}</tr>${S2.map(s=>`<tr><th>${esc(s.name)}</th>${s.values.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("")}</table><small>單位：${esc(it.unit||"")}</small></div>`;
const raw=Math.max(...S2.flatMap(s=>s.values))*1.05||1;const mag=Math.pow(10,Math.floor(Math.log10(raw/4)));const max=Math.ceil(raw/4/mag)*mag*4;const W=320,H=180,pl=34,pb=24,pw=W-pl-6,ph=H-pb-10;
const y=v=>10+ph-(v/max)*ph;let g="";
for(let k=0;k<=4;k++){const v=max/4*k;g+=`<line x1="${pl}" x2="${W-6}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${pl-4}" y="${y(v)+3}" text-anchor="end" class="ax">${+v.toFixed(2)}</text>`}
const step=pw/L.length;L.forEach((l,i)=>g+=`<text x="${pl+step*i+step/2}" y="${H-8}" text-anchor="middle" class="ax">${esc(l)}</text>`);
if(it.type==="line"){S2.forEach((s,si)=>{const pts=s.values.map((v,i)=>`${pl+step*i+step/2},${y(v)}`).join(" ");g+=`<polyline points="${pts}" fill="none" stroke="${cols[si]}" stroke-width="2.5"/>`+s.values.map((v,i)=>`<circle cx="${pl+step*i+step/2}" cy="${y(v)}" r="3.5" fill="${cols[si]}"/>`).join("")})}
else{const bw=Math.min(22,(step-8)/S2.length);S2.forEach((s,si)=>s.values.forEach((v,i)=>{const x=pl+step*i+step/2-bw*S2.length/2+bw*si;g+=`<rect x="${x}" y="${y(v)}" width="${bw-2}" height="${10+ph-y(v)}" rx="2" fill="${cols[si]}"/>`}))}
return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(it.title)}">${g}</svg><div class="legend">${S2.map((s,si)=>`<span><i style="background:${cols[si]}"></i>${esc(s.name)}</span>`).join("")}</div><small>單位：${esc(it.unit||"")}</small></div>`}
/* ---------- 共用：判分（打字題、寫作題） ---------- */
function setNext(){const btn=$("#check");btn.disabled=false;
if(L.hearts<=0){btn.textContent="體力用完了，回頭再看一次";btn.onclick=()=>finish(false);return}
btn.textContent=L.step===L.u.cards.length-1?"看結果":"下一張";btn.onclick=()=>{stopAll();L.step++;renderStep()}}
function heartsUI(){$("#hearts").textContent="❤".repeat(Math.max(0,L.hearts))+"♡".repeat(5-Math.max(0,L.hearts))}
function grade(ok,answer,explain,c){const fb=$("#fb");
if(ok){window.sfx&&sfx.ok(L.combo+1);L.correct++;L.combo++;fb.className="feedback on ok";fb.innerHTML=`${["太棒了！","正確！","漂亮！","就是這樣！"][L.combo%4]}<small>${explain||""}</small>`;if(L.combo>=2)showCombo(L.combo);
if(c.rv&&c.vw&&S.wrong){delete S.wrong[c.vw.toLowerCase()];save()}}
else{window.sfx&&sfx.bad();L.combo=0;L.hearts--;heartsUI();if(c.vw)addWrong(c.vw);
fb.className="feedback on bad";fb.innerHTML=`參考答案：<b>${esc(answer)}</b><small>${explain||""}</small>${c.self?`<button class="chip self-ok" id="self-ok">我的答案也對</button>`:""}`;
const so=$("#self-ok");if(so)so.onclick=()=>{L.hearts++;L.correct++;heartsUI();fb.className="feedback on ok";so.remove();setNext()}}
if(/[A-Za-z]{2,}/.test(answer))setTimeout(()=>speak(answer),300);
setNext()}
let PSG_OPEN=false;
function psgBlock(c){if(!c.psg)return "";return `<details class="psg" ${PSG_OPEN?"open":""}><summary>📄 文章（點開對照）</summary><div class="psg-in">${psgHTML(c.psg,c.hi)}</div></details>`}
function bindPsg(b){const d=b.querySelector("details.psg");if(!d)return;const jump=()=>{const h=d.querySelector(".psg-p.hi");if(h&&d.open)d.querySelector(".psg-in").scrollTop=h.offsetTop-d.querySelector(".psg-in").offsetTop-8};
d.addEventListener("toggle",()=>{PSG_OPEN=d.open;jump()});setTimeout(jump,30)}
/* ---------- 新卡片的渲染（app.js renderStep 會先呼叫這裡） ---------- */
window.renderStudy=function(c,b,tag,next){
const sub=c.sub?`<span class="tag sub">${c.sub}</span>`:"";
if(c.k==="lesson"){
b.innerHTML=`<div class="card">${tag}<span class="tag sub">重點 ${c.n}/${c.of}</span><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p>${c.f.map(l=>`<div class="formula">${esc(l)}</div>`).join("")}
<div class="exs">${c.ex.map((e,i)=>`<div class="exr"><button class="spk" data-i="${i}" aria-label="朗讀">🔊</button><div><div class="en">${esc(e[0])}</div><small>${esc(e[1])}</small></div></div>`).join("")}</div><p class="tip">看懂了就按下一張，接下來 5 題都考這個重點。</p></div>${next}`;
b.querySelectorAll(".exr .spk").forEach(s=>s.onclick=()=>speak(clean(c.ex[+s.dataset.i][0])));
}else if(c.k==="passage"){const p=c.p;
b.innerHTML=`<div class="card">${tag}<span class="tag sub">${esc(p.lv)}・約 ${p.text.join(" ").split(/\s+/).length} 字</span><div class="psg-full">${psgHTML(p)}</div>
<div class="play-row"><button class="play sm" id="p1">🔊 聽全文</button><button class="play sm" id="p2">🐢 慢速</button></div>
${p.gl&&p.gl.length?`<div class="gloss"><b>生字</b>${p.gl.map(g=>`<span><i>${esc(g[0])}</i> ${esc(g[1])}</span>`).join("")}</div>`:""}</div>${next}`;
$("#p1").onclick=e=>speakParts(p.text,e.currentTarget,undefined,500);$("#p2").onclick=e=>speakParts(p.text,e.currentTarget,.75,500);
}else if(c.k==="rq"){
b.innerHTML=`<div class="card">${tag}${sub}${psgBlock(c)}<div class="q">${esc(c.q)}</div><div class="opts" id="opts">${c.o.map((o,i)=>`<button class="opt" data-i="${i}"><span>${esc(o)}</span></button>`).join("")}</div><div class="feedback" id="fb"></div></div><button class="cta" id="check" disabled>確認</button>`;
bindPsg(b);
b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{b.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel"));o.classList.add("sel");$("#check").disabled=false});
$("#check").onclick=()=>check(o=>+o.dataset.i===c.a,c.o[c.a],c.e);
return true;
}else if(c.k==="input"){
const q=c.q?`<div class="q">${c.q.includes("<br>")?c.q.split("<br>").map(esc).join("<br>"):esc(c.q).replace(/___/g,'<span class="blank">&nbsp;</span>')}</div>`:"";
b.innerHTML=`<div class="card">${tag}${sub}${psgBlock(c)}<div class="q-p">${esc(c.prompt||"")}</div>${c.zh?`<div class="zh-q">${esc(c.zh)}</div>`:""}${q}
${c.say?`<div class="play-row"><button class="play sm" id="p1">🔊 聽</button><button class="play sm" id="p2">🐢</button></div>`:""}
${c.multi?`<textarea id="ans" rows="3" autocapitalize="sentences" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="在這裡輸入英文"></textarea>`:`<input id="ans" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="輸入答案">`}
<div class="feedback" id="fb"></div></div><button class="cta" id="check" disabled>確認</button>`;
bindPsg(b);
if(c.say){$("#p1").onclick=e=>speak(c.say,e.currentTarget);$("#p2").onclick=e=>speak(c.say,e.currentTarget,.6);setTimeout(()=>speak(c.say,$("#p1")),300)}
const ans=$("#ans");ans.oninput=()=>$("#check").disabled=!ans.value.trim();
ans.onkeydown=e=>{if(e.key==="Enter"&&!c.multi&&ans.value.trim()&&!ans.disabled){e.preventDefault();$("#check").click()}};
$("#check").onclick=()=>{const v=ans.value;ans.disabled=true;const ok=c.a.some(x=>norm(x)===norm(v));grade(ok,c.a[0],c.e,c)};
if(!c.say&&!c.psg)setTimeout(()=>ans.focus({preventScroll:true}),50);
return true;
}else if(c.k==="wfree"){
b.innerHTML=`<div class="card">${tag}${sub}<div class="q-p">${esc(c.task)}</div><div class="q">${esc(c.s)}</div>${c.must.length?`<p class="tip">必須用到：${c.must.map(m=>`<b>${esc(m)}</b>`).join("、")}・至少 ${c.min} 字</p>`:`<p class="tip">至少 ${c.min} 字</p>`}
<textarea id="ans" rows="4" autocapitalize="sentences" autocorrect="off" spellcheck="false" placeholder="在這裡寫你的句子"></textarea><div class="wc" id="wc">0 字</div><div class="feedback" id="fb"></div></div><button class="cta" id="check" disabled>檢查</button>`;
const ans=$("#ans");ans.oninput=()=>{$("#wc").textContent=wcount(ans.value)+" 字";$("#check").disabled=!ans.value.trim()};
$("#check").onclick=()=>{const v=ans.value;ans.disabled=true;const miss=c.must.filter(m=>!v.toLowerCase().includes(m.toLowerCase()));const n=wcount(v);
const errs=autoCheck(v,{},"para").errs.filter(e=>!/縮寫/.test(e[0]));const ok=!miss.length&&n>=c.min;
grade(ok,c.model,`${ok?"":`${miss.length?"少了："+miss.join("、")+"。":""}${n<c.min?`只有 ${n} 字。`:""}`}${errs.length?"<br>注意："+errs.map(e=>e[0]).join("；"):""}<br>範例：${esc(c.model)}<br>${c.e||""}`,Object.assign({},c,{self:false}))};
return true;
}else if(c.k==="essay"){renderEssay(c,b,tag,next);return true}
else return false;
const nb=$("#next");if(nb)nb.onclick=()=>{stopAll();L.step++;renderStep()};
return true};
/* ---------- 寫作卡：計時、字數、檢查、範文、自評、存草稿 ---------- */
let TIMER=null;
function renderEssay(c,b,tag,next){const it=c.it,kind=c.kind;S.drafts=S.drafts||{};const key=L.id;
const mins=kind==="t1"?20:kind==="t2"?40:15;const min=kind==="t1"?150:kind==="t2"?250:(it.min||60);
const prompt=kind==="para"?it.task_en:it.prompt_en;
b.innerHTML=`<div class="card">${tag}<span class="tag sub">${kind==="t1"?"IELTS Writing Task 1・20 分鐘・150 字以上":kind==="t2"?"IELTS Writing Task 2・40 分鐘・250 字以上":`段落寫作・${min} 字以上`}</span>
<div class="prompt-en">${esc(prompt)}</div>${it.prompt_zh||it.task_zh?`<div class="zh">${esc(it.prompt_zh||it.task_zh)}</div>`:""}
${kind==="t1"?chartHTML(it):""}
<details class="fold"><summary>🧭 寫作架構</summary><ol>${(it.plan||it.outline||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>${(it.tips||[]).map(x=>`<p class="tip">💡 ${esc(x)}</p>`).join("")}</details>
${(it.useful||it.must||[]).length?`<details class="fold"><summary>🧰 好用句型（點一下插入）</summary><div class="phr">${(it.useful||it.must).map(x=>`<button class="chip ph" data-t="${esc(x)}">${esc(x)}</button>`).join("")}</div></details>`:""}
<div class="wbar"><button class="chip" id="tm">⏱ 開始計時 ${mins}:00</button><span class="wc" id="wc">0 / ${min} 字</span></div>
<textarea id="essay" rows="12" autocapitalize="sentences" autocorrect="off" spellcheck="false" placeholder="在這裡寫。段落之間空一行。草稿會自動儲存。"></textarea>
<div class="wtools"><button class="chip" id="ck">✅ 檢查我的文章</button><button class="chip" id="md">📖 看範文</button><button class="chip" id="cp">📋 複製（傳給老師）</button></div>
<div id="wres"></div></div>${next}`;
const ta=$("#essay");ta.value=S.drafts[key]||"";
const upd=()=>{const n=wcount(ta.value);$("#wc").textContent=`${n} / ${min} 字`;$("#wc").classList.toggle("ok",n>=min)};upd();
let st;ta.oninput=()=>{upd();clearTimeout(st);st=setTimeout(()=>{S.drafts[key]=ta.value;save()},400)};
b.querySelectorAll(".ph").forEach(p=>p.onclick=()=>{const t=p.dataset.t;const s=ta.selectionStart??ta.value.length;ta.value=ta.value.slice(0,s)+(s&&!/\s$/.test(ta.value.slice(0,s))?" ":"")+t+" "+ta.value.slice(s);ta.dispatchEvent(new Event("input"));ta.focus()});
clearInterval(TIMER);let left=mins*60,run=false;const tm=$("#tm");
const fmt=()=>`${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;
tm.onclick=()=>{run=!run;if(run){TIMER=setInterval(()=>{left--;tm.textContent=`⏸ ${fmt()}`;if(left<=0){clearInterval(TIMER);run=false;tm.textContent="⏰ 時間到";window.sfx&&sfx.badge()}},1000);tm.textContent=`⏸ ${fmt()}`}else{clearInterval(TIMER);tm.textContent=`▶ 繼續 ${fmt()}`}};
const res=$("#wres");
$("#ck").onclick=()=>{const {out,errs}=autoCheck(ta.value,it,kind);
res.innerHTML=`<div class="wcheck"><b>自動檢查</b>${out.map(([ok,t])=>`<div class="${ok?"ok":"no"}">${ok?"✓":"✗"} ${esc(t)}</div>`).join("")}
${errs.length?`<b style="margin-top:8px">可能的錯誤</b>${errs.map(([m,s])=>`<div class="no">✗ ${esc(m)}${s?`<small>${esc(s.slice(0,120))}</small>`:""}</div>`).join("")}`:`<div class="ok">✓ 沒有抓到常見錯誤（電腦只能抓固定的錯誤，文法和內容仍建議給老師看）</div>`}</div>
<div class="wcheck"><b>自評：寫完逐項勾選（考官評分的四個面向）</b>${(kind==="para"?["有主題句，一開始就說出重點","每個支持句都和主題有關","有用連接詞把句子接起來","最後有結論句"]:["回答到題目的每個部分（Task Response）","有清楚的開頭、主體、結論，段落分明（Coherence）","用字有變化，不一直重複同一個字（Lexical Resource）","時態、單複數、句子結構正確（Grammar）"].concat(kind==="t1"?["有寫 Overview 總覽，並比較數據"]:["每個主體段都有理由＋例子"])).map((x,i)=>`<label class="sa"><input type="checkbox"> ${esc(x)}</label>`).join("")}</div>`};
$("#md").onclick=()=>{if(wcount(ta.value)<min/2&&!confirm("建議先自己寫完再看範文，效果最好。還是要現在看嗎？"))return;
res.innerHTML=`<div class="model"><b>範文</b>${it.model.split(/\n\s*\n/).map(x=>`<p>${esc(x)}</p>`).join("")}<div class="play-row"><button class="play sm" id="pm">🔊 聽範文</button></div><p class="tip">對照範文：它怎麼開頭？用了哪些連接詞和句型？把一句你喜歡的句型抄進自己的文章。</p></div>`;
$("#pm").onclick=e=>speakParts(it.model.split(/\n\s*\n/),e.currentTarget,undefined,600)};
$("#cp").onclick=async()=>{const txt=`【題目】${prompt}\n\n【我的文章】（${wcount(ta.value)} 字）\n${ta.value}`;try{await navigator.clipboard.writeText(txt);$("#cp").textContent="✓ 已複製"}catch(e){ta.select();document.execCommand("copy");$("#cp").textContent="✓ 已複製"}};
$("#next").onclick=()=>{clearInterval(TIMER);S.drafts[key]=ta.value;save();stopAll();L.step++;renderStep()}}
window.studyWorlds=()=>({vx:vxWorld(),ck:chefWorld(),rd:rdWorld(),wt:wtWorlds()});
