/* ---------- Phonics 內容：從零開始 ---------- */
const ABC=[
["A","/æ/","avocado","酪梨","嘴巴往兩邊拉開、下巴往下，介於「ㄝ」和「ㄚ」之間","accent","口音"],["B","/b/","budget","預算","雙唇閉緊再彈開，喉嚨要震","basil","羅勒"],["C","/k/","customer","顧客","舌根頂住，像「ㄎ」但不送太多氣","cutlery","餐具"],["D","/d/","deadline","期限","舌尖頂上牙齦，喉嚨震","dough","麵團"],["E","/ɛ/","entrance","入口","嘴微開，像短促的「ㄝ」","essay","文章"],["F","/f/","flight","航班","上牙輕咬下唇吹氣","flavor","風味"],["G","/g/","garlic","大蒜","像「ㄍ」，喉嚨要震","grammar","文法"],["H","/h/","hostel","青年旅館","輕輕吐氣，像哈氣","hospitality","餐旅業"],["I","/ɪ/","ingredient","食材","短促的「ㄧ」，嘴不要太緊","interview","面試"],["J","/dʒ/","journey","旅程","像「ㄐ」但嘴唇圓一點，喉嚨震","juice","果汁"],["K","/k/","kitchen","廚房","和 C 的硬音一樣","kettle","水壺"],["L","/l/","luggage","行李","舌尖貼上牙齦，聲音從舌頭兩側出來","lecture","講課"],["M","/m/","menu","菜單","閉嘴哼","migration","移民"],["N","/n/","noodle","麵條","舌尖頂上牙齦，鼻音","notebook","筆記本"],["O","/ɑ/","olive","橄欖","美式短 o：嘴巴張大、不圓唇，像「ㄚ」","omelet","歐姆蛋"],["P","/p/","passport","護照","雙唇彈開送氣，喉嚨不震","pepper","胡椒"],["Q","/kw/","question","問題","q 後面幾乎永遠跟著 u，一起唸 /kw/","quality","品質"],["R","/r/","recipe","食譜","舌頭往後捲但不碰到任何地方","receipt","收據"],["S","/s/","salary","薪水","像蛇的嘶嘶聲","sauce","醬汁"],["T","/t/","ticket","票","舌尖彈開，送氣，喉嚨不震","tray","托盤"],["U","/ʌ/","upgrade","升級","短促的「ㄚ」，嘴放鬆","understand","理解"],["V","/v/","visa","簽證","和 F 一樣咬下唇，但喉嚨要震","vegetable","蔬菜"],["W","/w/","waiter","服務生","嘴唇嘟圓再放開","workshop","工作坊"],["X","/ks/","taxi","計程車","x 多在字中或字尾，唸 k + s","exit","出口"],["Y","/j/","yogurt","優格","像「ㄧㄝ」滑過去","yesterday","昨天"],["Z","/z/","zone","區域","和 S 一樣嘶嘶，但喉嚨要震","zucchini","櫛瓜"]];
/* ---------- 拼讀：把單字切成「字母組 → 聲音」（美式發音） ---------- */
/* PH[key] = [機器朗讀用的近似音, 美式 IPA]。短母音語音引擎唸不準，改播 assets/snd/ 的音檔（見 CLIP）。 */
const PH={b:["buh","/b/"],c:["kuh","/k/"],k:["kuh","/k/"],ck:["kuh","/k/"],d:["duh","/d/"],f:["fuh","/f/"],ph:["fuh","/f/"],g:["guh","/g/"],h:["huh","/h/"],j:["juh","/dʒ/"],l:["luh","/l/"],m:["muh","/m/"],n:["nuh","/n/"],p:["puh","/p/"],q:["kwuh","/kw/"],qu:["kwuh","/kw/"],r:["ruh","/r/"],s:["suh","/s/"],t:["tuh","/t/"],v:["vuh","/v/"],w:["wuh","/w/"],wh:["wuh","/w/"],x:["kss","/ks/"],y:["yuh","/j/"],z:["zuh","/z/"],
sh:["shh","/ʃ/"],ch:["chuh","/tʃ/"],tch:["chuh","/tʃ/"],th:["thuh","/θ/"],dh:["the","/ð/"],ng:["ung","/ŋ/"],
a:["aah","/æ/"],e:["eh","/ɛ/"],i:["ih","/ɪ/"],o:["ah","/ɑ/"],u:["uh","/ʌ/"],schwa:["uh","/ə/"],
a_e:["ay","/eɪ/"],ai:["ay","/eɪ/"],ay:["ay","/eɪ/"],e_e:["ee","/i/"],ee:["ee","/i/"],ea:["ee","/i/"],i_e:["eye","/aɪ/"],igh:["eye","/aɪ/"],ie:["eye","/aɪ/"],o_e:["oh","/oʊ/"],oa:["oh","/oʊ/"],ow:["oh","/oʊ/"],u_e:["you","/ju/"],ue:["you","/ju/"],ew:["you","/ju/"],
oo:["ooh","/u/"],uu:["uh","/ʊ/"],ou:["ow","/aʊ/"],ar:["are","/ɑr/"],or:["or","/ɔr/"],er:["er","/ɝ/"],ir:["er","/ɝ/"],ur:["er","/ɝ/"],aw:["aw","/ɔ/"],au:["aw","/ɔ/"],oi:["oy","/ɔɪ/"],oy:["oy","/ɔɪ/"],air:["air","/ɛr/"],le:["ul","/əl/"],silent:["","不發音"]};
/* 短母音音檔：IPA → assets/snd/<名稱>.mp3（tools/make-vowels.sh 以 espeak-ng 產生） */
const CLIP={"/æ/":"ae","/ɛ/":"eh","/ɪ/":"ih","/ɑ/":"ah","/ʌ/":"uh","/ʊ/":"uu","/ə/":"schwa"};
/* OVERRIDE：規則切不準的字。格式 "字母組" 或 "字母組:聲音 key" */
const OVERRIDE={bread:["b","r","ea:e","d"],have:["h","a","v","e:silent"],book:["b","oo:uu","k"],good:["g","oo:uu","d"],look:["l","oo:uu","k"],foot:["f","oo:uu","t"],what:["wh","a:u","t"],water:["w","a:aw","t","er"],queen:["qu","ee","n"],kitchen:["k","i","tch","e:schwa","n"],phone:["ph","o_e","n"],photo:["ph","o:oa","t","o:oa"],yellow:["y","e","ll:l","ow"],zoo:["z","oo"],octopus:["o","c","t","o:schwa","p","u:schwa","s"],umbrella:["u","m","b","r","e","ll:l","a:schwa"],igloo:["i","g","l","oo"],lion:["l","i:igh","o:schwa","n"],tiger:["t","i:igh","g","er"],rabbit:["r","a","bb:b","i","t"],apple:["a","pp:p","le"],today:["t","o:schwa","d","ay"],school:["s","ch:k","oo","l"],friend:["f","r","ie:e","n","d"],mother:["m","o:u","th:dh","er"],with:["w","i","th:dh"],this:["th:dh","i","s"],that:["th:dh","a","t"],bath:["b","a","th"],wash:["w","a:o","sh"],chair:["ch","air"],house:["h","ou","se:s"],nurse:["n","ur","se:s"],nose:["n","o_e","s:z"],ball:["b","a:aw","ll:l"],egg:["e","gg:g"],blue:["b","l","ue:oo"],eat:["ea","t"],out:["ou","t"],kite:["k","i_e","t"],cape:["c","a_e","p"],hope:["h","o_e","p"],cube:["c","u_e","b"],pine:["p","i_e","n"],tape:["t","a_e","p"]};
function seg(g,key){const p=PH[key]||PH[g]||[g,""];return {g:g.replace("_","-"),say:p[0],ipa:p[1],clip:CLIP[p[1]]||"",silent:(key||g)==="silent"}}
function segment(w){
const key=w.toLowerCase().replace(/[^a-z]/g,"");
if(OVERRIDE[key])return OVERRIDE[key].map(x=>{const [g,s]=x.split(":");return seg(g,s)});
const out=[];let i=0;const magic=/^[a-z]*[aeiou][^aeiouwxy]e$/.test(key)&&key.length>=3&&!/[aeiou]{2}[^aeiou]e$/.test(key);
const digraphs=["tch","igh","sh","ch","th","ph","wh","ng","ck","qu","ai","ay","ee","ea","oa","ow","oo","ou","ar","or","er","ir","ur","aw","au","oi","oy","ue","ew"];
while(i<key.length){
const ch=key[i];
if(magic&&"aeiou".includes(ch)&&i===key.length-3){out.push(seg(ch+"_e"));out.push(seg(key[i+1]));i=key.length;continue}
let hit=null;for(const d of digraphs){if(key.startsWith(d,i)){hit=d;break}}
if(hit){out.push(seg(hit));i+=hit.length;continue}
if(key[i+1]===ch&&!"aeiou".includes(ch)){out.push(seg(ch+ch,ch));i+=2;continue}
out.push(seg(ch));i++;
}
return out;
}
const FAM={ /* 短母音 word families：[family, words, zh] */
a:[["-at",["cat","hat","bat","mat","sat"],["貓","帽子","蝙蝠","墊子","坐（過去式）"]],["-an",["man","can","pan","fan","van"],["男人","可以／罐子","平底鍋","風扇","廂型車"]],["-ap",["map","cap","tap","nap","lap"],["地圖","鴨舌帽","水龍頭","小睡","大腿"]]],
e:[["-en",["pen","hen","ten","men","den"],["筆","母雞","十","男人們","窩"]],["-et",["net","pet","wet","jet","get"],["網子","寵物","濕的","噴射機","得到"]],["-ed",["bed","red","fed","led","shed"],["床","紅色","餵（過去式）","帶領（過去式）","小屋"]]],
i:[["-in",["pin","bin","fin","win","tin"],["別針","垃圾桶","魚鰭","贏","錫罐"]],["-ig",["big","pig","dig","wig","fig"],["大的","豬","挖","假髮","無花果"]],["-it",["sit","hit","fit","bit","kit"],["坐","打","合身","一點點","工具組"]]],
o:[["-ot",["hot","pot","dot","not","lot"],["熱的","鍋子","點","不","很多"]],["-og",["dog","log","fog","jog","hog"],["狗","木頭","霧","慢跑","豬"]],["-op",["hop","top","mop","pop","shop"],["跳","頂部","拖把","啵一聲","商店"]]],
u:[["-un",["sun","bun","run","fun","gun"],["太陽","小圓麵包","跑","好玩","槍"]],["-ug",["bug","mug","hug","rug","jug"],["蟲","馬克杯","擁抱","小地毯","水壺"]],["-ut",["cut","nut","hut","but","shut"],["切","堅果","小屋","但是","關上"]]]};
const VOWEL={a:["短母音 a /æ/","嘴巴往兩邊拉開，像看到驚喜的「ㄝ」。中間是 a 的字，先試著唸 /æ/。"],e:["短母音 e /ɛ/","嘴微開，短促的「ㄝ」，不要拉長。"],i:["短母音 i /ɪ/","短而鬆的「ㄧ」，嘴不要用力。"],o:["短母音 o /ɑ/","美式發音：嘴巴張大、不圓唇，像「ㄚ」。hot 唸 /hɑt/。"],u:["短母音 u /ʌ/","放鬆的「ㄚ」，很短。"]};
/* 字母卡的「聲音」朗讀：用 PH 找同一個 IPA 的近似音（短 a / i 唸代表字） */
function sndSay(ipa){const ks=Object.keys(PH).filter(k=>PH[k][1]===ipa);const k=ks.find(k=>k.length===1)||ks[0];return k?PH[k][0]:ipa.replace(/\//g,"")}
function letterUnit(from,to){
const cards=[];
cards.push({k:"info",h:`字母 ${ABC[from][0]} 到 ${ABC[to][0]}`,p:"每個字母有「名字」和「聲音」。拼字時用名字，唸單字時用聲音。先聽，再按 🔊 跟著唸三次。"});
for(let i=from;i<=to;i++){const [L,s,w,zh,tip,adv,advzh]=ABC[i];const sd=sndSay(s);cards.push({k:"letter",L,s,w,zh,tip,adv,advzh,say:`${L}. ${L.toLowerCase()}. ${sd}. ${w}.`,parts:[`${L}. ${L.toLowerCase()}.`,CLIP[s]?{clip:CLIP[s]}:`${sd}.`,`${w}.`]})}
for(let i=from;i<=to;i+=2){const [L,s,w]=ABC[i];const pool=ABC.slice(from,to+1).map(x=>x[2]).filter(x=>x!==w);shuffle(pool);cards.push({k:"listen",say:w,o:shuffle([w,pool[0],pool[1]]),a:w,e:startsWith(L,w)?`${w} 開頭是 ${L} 的聲音 ${s}。`:`${w} 裡面有 ${L} 的聲音 ${s}。`})}
for(let i=from+1;i<=to;i+=2){const [L,s,w]=ABC[i];const pool=ABC.slice(from,to+1).map(x=>x[0]).filter(x=>x!==L);shuffle(pool);cards.push({k:"listen",say:w,prompt:startsWith(L,w)?"聽到的字，開頭是哪個字母？":"聽到的字裡，有哪個字母的聲音？",o:shuffle([L,pool[0],pool[1]]),a:L,e:startsWith(L,w)?`${w} 的開頭是 ${L} ${s}。`:`${w} 裡的 x 唸 ${s}。`})}
return cards;
}
function familyUnit(v){
const [title,desc]=VOWEL[v];const cards=[{k:"info",h:title,p:desc}];
const all=[];
FAM[v].forEach(([fam,ws,zh])=>{
cards.push({k:"info",h:`字尾 ${fam}`,p:`把開頭子音換掉，就是一串押韻的字。先聽整組，再一個一個唸。`,say:ws.join(". ")});
ws.forEach((w,i)=>{all.push(w);cards.push({k:"word",w,zh:zh[i],hl:fam.slice(1),say:w})});
});
for(let i=0;i<6;i++){const w=all[(i*5+2)%all.length];const rhyme=shuffle(all.filter(x=>x!==w&&x.slice(1)===w.slice(1)));const rest=shuffle(all.filter(x=>x!==w&&!rhyme.includes(x)));const pool=[...rhyme,...rest];cards.push({k:"listen",say:w,o:shuffle([w,pool[0],pool[1]]),a:w,e:`${w}：開頭 ${w[0]}，字尾 -${w.slice(1)}。`})}
const [fam,ws,zh]=FAM[v][0];
cards.push({k:"mc",q:`哪一組字全部押韻？`,o:[ws.slice(0,3).join(" / "),`${ws[0]} / ${FAM[v][1][1][0]} / ${FAM[v][2][1][0]}`,`${ws[0]} / ${ABC[1][2]} / ${ABC[3][2]}`],a:0,e:`同一個字尾 ${fam} 才押韻。`});
return cards;
}
function wordsUnit(h,p,rows,extra){ /* rows: [word, zh, highlight, note] */
const cards=[{k:"info",h,p}];rows.forEach(r=>cards.push({k:"word",w:r[0],zh:r[1],hl:r[2],tip:r[3],say:r[0]}));
const all=rows.map(r=>r[0]);
for(let i=0;i<Math.min(5,rows.length);i++){const w=all[(i*3+1)%all.length];const pool=all.filter(x=>x!==w);shuffle(pool);cards.push({k:"listen",say:w,o:shuffle([w,pool[0],pool[1]]),a:w,e:rows.find(r=>r[0]===w)[3]||""})}
(extra||[]).forEach(c=>cards.push(c));return cards;
}
function startsWith(L,w){return w[0].toUpperCase()===L}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
const PHONICS=[
{id:"p1",name:"字母島 Alphabet Island",sub:"26 個字母的名字與聲音，一個一個聽清楚。",icon:"🔤",units:[
{t:"A 到 G",i:"A",cards:letterUnit(0,6)},{t:"H 到 N",i:"H",cards:letterUnit(7,13)},{t:"O 到 T",i:"O",cards:letterUnit(14,19)},{t:"U 到 Z",i:"U",cards:letterUnit(20,25)},
{t:"字母總複習",i:"🎓",cards:(()=>{const c=[{k:"info",h:"26 個聲音連起來",p:"聽一個字，選出它的開頭字母。這一關是字母島的最後考驗。"}];shuffle(ABC.filter(x=>startsWith(x[0],x[2]))).slice(0,10).forEach(([L,s,w])=>{const pool=ABC.map(x=>x[0]).filter(x=>x!==L);shuffle(pool);c.push({k:"listen",say:w,prompt:"開頭是哪個字母？",o:shuffle([L,pool[0],pool[1],pool[2]]),a:L,e:`${w} → ${L} ${s}`})});return c})()}
]},
{id:"p2",name:"短母音灣 Short Vowel Bay",sub:"CVC 三字母單字：子音 + 母音 + 子音，開始真正讀字。",icon:"🅰️",units:[
{t:"怎麼拼讀一個字？",i:"🧩",cards:[
{k:"info",h:"看到字 → 唸出每個聲音 → 合起來",p:"這叫 blending（拼讀）。英文字不用背整個字長什麼樣，先認出每個字母組的聲音，再快快連起來，就能唸出沒看過的字。接下來每張單字卡下面都有「聲音積木」，一塊一塊點，再按「拼起來」。"},
{k:"word",w:"cat",zh:"貓",say:"cat",tip:"三個聲音：kuh‑a‑t。先慢慢分開唸，再快快連起來。"},
{k:"word",w:"sun",zh:"太陽",say:"sun",tip:"ss‑uh‑nn。s 像蛇的聲音，拉長沒關係。"},
{k:"word",w:"ship",zh:"船",say:"ship",tip:"sh 兩個字母只有一個聲音，所以是三塊積木，不是四塊。"},
{k:"word",w:"cake",zh:"蛋糕",say:"cake",tip:"字尾 e 不出聲，但讓 a 唸成「ay」。"},
{k:"word",w:"street",zh:"街",say:"street",tip:"s‑t‑r 三個子音要黏在一起，中間不能加母音。"},
{k:"listen",say:"sun",prompt:"聽，哪一個是你聽到的字？",o:["sun","sin","sat"],a:"sun",e:"中間母音 uh。"},
{k:"mc",q:"ship 這個字有幾塊聲音積木？",o:["2","3","4"],a:1,e:"sh‑i‑p，sh 是一個音。"},
{k:"mc",q:"看到沒學過的字 trip，第一步該做什麼？",o:["整個字背起來","找出每個字母組的聲音：t‑r‑i‑p","先查字典"],a:1,e:"先拆聲音再合起來。"}]},
{t:"短母音 a：cat, man, map",i:"a",cards:familyUnit("a")},{t:"短母音 e：pen, net, bed",i:"e",cards:familyUnit("e")},{t:"短母音 i：pin, big, sit",i:"i",cards:familyUnit("i")},{t:"短母音 o：hot, dog, hop",i:"o",cards:familyUnit("o")},{t:"短母音 u：sun, bug, cut",i:"u",cards:familyUnit("u")},
{t:"五個短母音大混戰",i:"🥊",cards:(()=>{const c=[{k:"info",h:"分辨 a / e / i / o / u",p:"中間母音不同，意思完全不同。聽清楚再選。"}];const sets=[["bat","bet","bit","bot","but"],["pan","pen","pin","pun"],["hat","hot","hut"],["cap","cop","cup"],["sat","set","sit"],["tan","ten","tin"]];sets.forEach(s=>{const w=s[Math.random()*s.length|0];c.push({k:"listen",say:w,o:shuffle(s.slice()),a:w,e:`${w} 的母音是 ${w[1]}。`})});return c})()}
]},
{id:"p3",name:"長母音礁 Long Vowel Reef",sub:"Magic E 與母音組合：母音唸出自己的名字。",icon:"✨",units:[
{t:"Magic E：字尾 e 不發音",i:"e",cards:wordsUnit("字尾 e 讓前面的母音唸「字母名」","cap → cape：a 從 /æ/ 變成 /eɪ/。字尾的 e 自己不出聲。",[["cap","帽子","a","短 a"],["cape","披風","a_e","長 a：/keɪp/"],["kit","工具組","i","短 i"],["kite","風箏","i_e","長 i：/kaɪt/"],["hop","跳","o","短 o"],["hope","希望","o_e","長 o：/hoʊp/"],["cub","幼獸","u","短 u"],["cube","立方體","u_e","長 u：/kjub/"],["pin","別針","i","短 i"],["pine","松樹","i_e","長 i"]],[{k:"mc",q:"把 tap 加上 magic e 會變成哪個字？",o:["tape","tapp","taep"],a:0,e:"tap → tape /teɪp/，膠帶。"},{k:"mc",q:"哪個字是例外，a 仍然唸短音？",o:["make","have","late"],a:1,e:"have 不守規則，要特別記。"}])},
{t:"ai / ay：rain, day",i:"ai",cards:wordsUnit("ai 在字中、ay 在字尾，都唸 /eɪ/","兩個母音走在一起，第一個說話：唸 a 的名字。",[["rain","雨","ai",""],["train","火車","ai",""],["wait","等","ai",""],["paint","油漆","ai",""],["day","天","ay","字尾用 ay"],["play","玩","ay",""],["stay","停留","ay",""],["today","今天","ay",""]],[{k:"mc",q:"字尾的 /eɪ/ 通常怎麼拼？",o:["ai","ay","a"],a:1,e:"ay 用在字尾：day, play, say。"}])},
{t:"ee / ea：see, eat",i:"ee",cards:wordsUnit("ee 與 ea 多半唸 /i/","e 的名字，拉長。",[["see","看見","ee",""],["tree","樹","ee",""],["green","綠色","ee",""],["sleep","睡覺","ee",""],["eat","吃","ea",""],["tea","茶","ea","你家店賣的！"],["read","讀","ea",""],["bread","麵包","ea","例外：唸短 /e/"]],[{k:"mc",q:"哪個 ea 字是例外，唸短音 /e/？",o:["tea","bread","read"],a:1,e:"bread / head / ready 的 ea 唸 /e/。"}])},
{t:"oa / ow / igh：boat, snow, night",i:"oa",cards:wordsUnit("oa 和 ow 唸 /oʊ/，igh 唸 /aɪ/","三個字母 igh 只發一個音，gh 不出聲。",[["boat","船","oa",""],["coat","外套","oa",""],["road","路","oa",""],["snow","雪","ow","字尾 ow"],["slow","慢","ow",""],["night","夜晚","igh","/naɪt/"],["light","光","igh",""],["right","右邊／正確","igh",""]],[{k:"mc",q:"night 裡的 gh 怎麼唸？",o:["/g/","/h/","不發音"],a:2,e:"igh 是一組，gh 不出聲。"}])},
{t:"oo / ou：moon, book, house",i:"oo",cards:wordsUnit("oo 有長短兩種；ou 唸 /aʊ/","長 oo /u/：moon；短 oo /ʊ/：book。ou 像「ㄠ」。",[["moon","月亮","oo","長 /u/"],["food","食物","oo","長"],["school","學校","oo","長"],["book","書","oo","短 /ʊ/"],["good","好","oo","短"],["look","看","oo","短"],["house","房子","ou","/aʊ/"],["out","外面","ou",""],["sound","聲音","ou",""]],[{k:"mc",q:"哪個字的 oo 是短音，和 book 一樣？",o:["moon","food","foot"],a:2,e:"foot / good / look 都是短 /ʊ/。"}])},
{t:"r 控制母音：car, bird, fork",i:"ar",cards:wordsUnit("母音後面跟著 r，整個音都變了","ar /ɑr/、or /ɔr/、er / ir / ur 都唸 /ɝ/。美式發音的 r 要捲舌，字尾也要唸出來。",[["car","車","ar",""],["park","公園","ar",""],["fork","叉子","or",""],["short","短","or",""],["her","她的","er","/hɝ/"],["bird","鳥","ir","和 er 同音"],["girl","女孩","ir",""],["nurse","護士","ur","和 er 同音"],["turn","轉","ur",""]],[{k:"mc",q:"bird、her、nurse 的母音…",o:["三個都不同","三個相同 /ɝ/","只有兩個相同"],a:1,e:"er / ir / ur 在多數情況下同音。"}])}
]},
{id:"p4",name:"子音峽 Consonant Strait",sub:"雙字母子音、子音群與音節，把拼字和發音接起來。",icon:"🔗",units:[
{t:"sh / ch：ship, chip",i:"sh",cards:wordsUnit("sh /ʃ/ 是噓聲；ch /tʃ/ 開頭有個小爆破","台灣人常把 sh 唸成「ㄒ」、ch 唸成「ㄑ」，嘴唇要更圓。",[["ship","船","sh",""],["shop","商店","sh",""],["fish","魚","sh","字尾"],["wash","洗","sh",""],["chip","薯條／碎片","ch",""],["chair","椅子","ch",""],["lunch","午餐","ch","字尾"],["kitchen","廚房","ch","tch 也唸 /tʃ/"]],[{k:"listen",say:"ship",o:["ship","chip","sip"],a:"ship",e:"ship 開頭是噓聲 /ʃ/。"},{k:"listen",say:"chip",o:["ship","chip","tip"],a:"chip",e:"chip 開頭有爆破 /tʃ/。"}])},
{t:"th：think 與 this",i:"th",cards:wordsUnit("th 有兩種：無聲 /θ/ 與有聲 /ð/","舌尖輕輕放在上下牙之間吹氣。喉嚨不震是 think，震動是 this。",[["think","想","th","無聲"],["three","三","th","無聲，不是 tree"],["thank","謝謝","th","無聲"],["bath","洗澡","th","無聲，字尾"],["this","這個","th","有聲"],["that","那個","th","有聲"],["mother","母親","th","有聲"],["with","和","th","有聲"]],[{k:"listen",say:"three",o:["three","tree","free"],a:"three",e:"three 的 th 要把舌頭伸出一點。"},{k:"mc",q:"哪個字的 th 是有聲的？",o:["think","three","that"],a:2,e:"this / that / the / they 這類功能字多是有聲 /ð/。"}])},
{t:"ph / wh / ng / ck",i:"ph",cards:wordsUnit("四組常見的雙字母","ph = /f/；wh 多唸 /w/；ng 是鼻音 /ŋ/；ck 就是 /k/。",[["phone","電話","ph","/f/"],["photo","照片","ph",""],["what","什麼","wh","/w/"],["when","何時","wh",""],["sing","唱","ng","/ŋ/ 不唸 g"],["long","長","ng",""],["morning","早上","ng",""],["back","背／回來","ck","/k/"],["clock","時鐘","ck",""]],[{k:"mc",q:"sing 的字尾怎麼唸？",o:["n 再加 g","一個鼻音 /ŋ/","只唸 g"],a:1,e:"ng 是單一鼻音，不要把 g 唸出來。"}])},
{t:"開頭子音群：bl, st, tr",i:"bl",cards:wordsUnit("兩三個子音連發，中間不能加母音","台灣學生最常把 street 唸成 su-treet。每個子音都要發，但要快、要黏在一起。",[["blue","藍色","bl",""],["black","黑色","bl",""],["stop","停","st",""],["star","星星","st",""],["tree","樹","tr",""],["train","火車","tr",""],["street","街","str","三個子音"],["spring","春天","spr","三個子音"],["green","綠色","gr",""],["flag","旗子","fl",""]],[{k:"listen",say:"street",o:["street","sweet","treat"],a:"street",e:"s-t-r 連在一起。"},{k:"mc",q:"唸 street 最常見的錯誤是？",o:["漏掉 t","在 s 和 t 之間加母音","把 ee 唸短"],a:1,e:"不要變成 su-treet。"}])},
{t:"字尾子音群：-nd, -st, -mp",i:"nd",cards:wordsUnit("字尾的子音也要唸完整","中文字尾沒有子音群，很多人會吞掉最後一個音。hand 不是 han。",[["hand","手","nd",""],["friend","朋友","nd",""],["best","最好","st",""],["first","第一","st",""],["jump","跳","mp",""],["lamp","燈","mp",""],["milk","牛奶","lk",""],["help","幫助","lp",""],["desk","書桌","sk",""]],[{k:"listen",say:"hand",o:["hand","han","hat"],a:"hand",e:"字尾 d 要輕輕唸出來。"},{k:"listen",say:"first",o:["first","firs","fist"],a:"first",e:"r-s-t 三個字尾子音。"}])},
{t:"音節與重音",i:"🥁",cards:[
{k:"info",h:"一個母音聲 = 一個音節",p:"拍手數音節：ba-na-na 三下。長字先切音節再唸，就不會卡。"},
{k:"word",w:"ba·na·na",zh:"香蕉（3 音節，重音在第二）",hl:"na",say:"banana"},
{k:"word",w:"kit·chen",zh:"廚房（2 音節，重音在前）",hl:"kit",say:"kitchen"},
{k:"word",w:"res·tau·rant",zh:"餐廳（3 音節）",hl:"res",say:"restaurant"},
{k:"word",w:"veg·e·ta·ble",zh:"蔬菜（拼字 4 音節，口語常唸 3 音節 VEJ-tuh-bul）",hl:"veg",say:"vegetable"},
{k:"word",w:"Aus·tra·lia",zh:"澳洲（重音在 tra）",hl:"tra",say:"Australia"},
{k:"word",w:"Bris·bane",zh:"布里斯本（第二音節唸 /bən/，不是 bane）",hl:"Bris",say:"Brisbane"},
{k:"word",w:"PHO·to·graph",zh:"照片（重音第一）",hl:"PHO",say:"photograph"},
{k:"word",w:"pho·TO·gra·phy",zh:"攝影（重音第二）",hl:"TO",say:"photography"},
{k:"mc",q:"restaurant 有幾個音節？",o:["2","3","4"],a:1,e:"res-tau-rant。"},
{k:"mc",q:"Brisbane 的第二個音節怎麼唸？",o:["bane，像 rain","bən，很輕","ban，像 man"],a:1,e:"當地人唸 BRIZ-bən。"},
{k:"mc",q:"photography 的重音在？",o:["第 1 音節","第 2 音節","第 3 音節"],a:1,e:"加了 -graphy，重音往後移。"}]}
]}];
