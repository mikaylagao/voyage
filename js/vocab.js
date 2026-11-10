/* ---------- 單字港：依 IELTS 程度分級的單字（美式音標） ---------- */
/* VOCAB[band] = [[單元名, 圖示, [[單字, IPA, 中文, 例句, 例句中文], ...]], ...]；例句必須包含單字原形，填空題才挖得出來 */
const VOCAB={
3:[["生活必備字","🏠",[
["family","/ˈfæməli/","家人","I live with my family.","我和家人住在一起。"],
["friend","/frɛnd/","朋友","She is my best friend.","她是我最好的朋友。"],
["morning","/ˈmɔrnɪŋ/","早上","I drink tea every morning.","我每天早上喝茶。"],
["water","/ˈwɔtɚ/","水","Can I have some water, please?","可以給我一些水嗎？"],
["breakfast","/ˈbrɛkfəst/","早餐","Breakfast is at seven.","早餐在七點。"],
["work","/wɝk/","工作","I work in a shop.","我在一家店工作。"],
["happy","/ˈhæpi/","開心的","I am happy today.","我今天很開心。"],
["house","/haʊs/","房子","My house is small.","我的房子很小。"]]],
["出門必備字","🚌",[
["bus","/bʌs/","公車","I take the bus to work.","我搭公車上班。"],
["ticket","/ˈtɪkɪt/","票","One ticket, please.","請給我一張票。"],
["left","/lɛft/","左邊","Turn left here.","在這裡左轉。"],
["right","/raɪt/","右邊；正確的","The bank is on the right.","銀行在右邊。"],
["money","/ˈmʌni/","錢","I don't have much money.","我錢不多。"],
["open","/ˈoʊpən/","開著的；打開","Is the store open?","店有開嗎？"],
["near","/nɪr/","附近的","Is there a bank near here?","這附近有銀行嗎？"],
["cheap","/tʃip/","便宜的","This shirt is cheap.","這件襯衫很便宜。"]]]],
4:[["日常話題","☕",[
["hobby","/ˈhɑbi/","嗜好","My hobby is cooking.","我的嗜好是煮飯。"],
["weekend","/ˈwikɛnd/","週末","What do you do on the weekend?","你週末做什麼？"],
["weather","/ˈwɛðɚ/","天氣","The weather is nice today.","今天天氣很好。"],
["delicious","/dɪˈlɪʃəs/","美味的","This soup is delicious.","這碗湯很好喝。"],
["expensive","/ɪkˈspɛnsɪv/","昂貴的","The hotel is too expensive.","那間飯店太貴了。"],
["neighbor","/ˈneɪbɚ/","鄰居","My neighbor has a big dog.","我的鄰居有一隻大狗。"],
["usually","/ˈjuʒuəli/","通常","I usually get up at six.","我通常六點起床。"],
["favorite","/ˈfeɪvərɪt/","最喜歡的","Pizza is my favorite food.","披薩是我最喜歡的食物。"]]],
["旅行常用字","🧳",[
["reservation","/ˌrɛzɚˈveɪʃən/","預約；訂位","I have a reservation for two.","我訂了兩人的位子。"],
["luggage","/ˈlʌɡɪdʒ/","行李","Where can I pick up my luggage?","我在哪裡領行李？"],
["passport","/ˈpæspɔrt/","護照","Please show me your passport.","請出示你的護照。"],
["receipt","/rɪˈsit/","收據","Can I have a receipt, please?","可以給我收據嗎？"],
["available","/əˈveɪləbəl/","有空的；可用的","Is this seat available?","這個位子有人坐嗎？"],
["direction","/dəˈrɛkʃən/","方向","Am I going in the right direction?","我走的方向對嗎？"],
["schedule","/ˈskɛdʒul/","時刻表；行程","Let me check the train schedule.","我查一下火車時刻表。"],
["souvenir","/ˌsuvəˈnɪr/","紀念品","I bought a souvenir for my mom.","我買了紀念品給媽媽。"]]]],
5:[["生活與觀點","💬",[
["environment","/ɪnˈvaɪrənmənt/","環境","We should protect the environment.","我們應該保護環境。"],
["convenient","/kənˈvinjənt/","方便的","The subway is very convenient.","地鐵非常方便。"],
["experience","/ɪkˈspɪriəns/","經驗；經歷","Studying abroad was a great experience.","出國讀書是很棒的經歷。"],
["improve","/ɪmˈpruv/","改善；進步","I want to improve my English.","我想提升我的英文。"],
["opportunity","/ˌɑpɚˈtunəti/","機會","This job is a good opportunity.","這份工作是個好機會。"],
["crowded","/ˈkraʊdɪd/","擁擠的","The market was very crowded.","市場非常擁擠。"],
["advantage","/ədˈvæntɪdʒ/","優點；好處","One advantage of city life is transport.","城市生活的一個好處是交通。"],
["prefer","/prɪˈfɝ/","比較喜歡","I prefer tea to coffee.","比起咖啡我比較喜歡茶。"]]],
["旅行與規劃","🗺️",[
["accommodation","/əˌkɑməˈdeɪʃən/","住宿","The price includes accommodation.","價格包含住宿。"],
["destination","/ˌdɛstəˈneɪʃən/","目的地","Japan is a popular destination.","日本是熱門的旅遊地。"],
["itinerary","/aɪˈtɪnəˌrɛri/","行程表","Our itinerary is very busy.","我們的行程很滿。"],
["refund","/ˈriˌfʌnd/","退款","Can I get a refund?","我可以退款嗎？"],
["departure","/dɪˈpɑrtʃɚ/","出發；離境","The departure time is 9 a.m.","出發時間是早上九點。"],
["facilities","/fəˈsɪlətiz/","設施","The hotel has great facilities.","這間飯店設施很好。"],
["recommend","/ˌrɛkəˈmɛnd/","推薦","Can you recommend a good restaurant?","你可以推薦好餐廳嗎？"],
["budget","/ˈbʌdʒɪt/","預算","We are traveling on a budget.","我們是省錢旅行。"]]]],
6:[["議題論述（一）","📰",[
["significant","/sɪɡˈnɪfɪkənt/","顯著的；重要的","There was a significant increase in prices.","價格有顯著上漲。"],
["consequence","/ˈkɑnsəkwɛns/","後果","Pollution is a consequence of heavy traffic.","污染是交通繁忙的後果。"],
["affordable","/əˈfɔrdəbəl/","負擔得起的","Cities need more affordable housing.","城市需要更多平價住宅。"],
["sustainable","/səˈsteɪnəbəl/","永續的","We need sustainable energy.","我們需要永續能源。"],
["contribute","/kənˈtrɪbjut/","貢獻；促成","Tourists contribute to the local economy.","觀光客對當地經濟有貢獻。"],
["urban","/ˈɝbən/","都市的","Urban areas are often noisy.","都市地區通常很吵。"],
["maintain","/meɪnˈteɪn/","維持","It is hard to maintain a healthy diet.","維持健康飲食很難。"],
["tendency","/ˈtɛndənsi/","傾向","Young people have a tendency to shop online.","年輕人傾向網購。"]]],
["議題論述（二）","⚖️",[
["diverse","/daɪˈvɝs/","多元的","Brisbane has a diverse population.","布里斯本人口多元。"],
["reluctant","/rɪˈlʌktənt/","不情願的","Many people are reluctant to change jobs.","很多人不願意換工作。"],
["inevitable","/ɪˈnɛvɪtəbəl/","無法避免的","Some change is inevitable.","有些改變是無法避免的。"],
["beneficial","/ˌbɛnəˈfɪʃəl/","有益的","Exercise is beneficial for mental health.","運動對心理健康有益。"],
["priority","/praɪˈɔrəti/","優先事項","Safety should be the top priority.","安全應該是第一優先。"],
["considerable","/kənˈsɪdərəbəl/","相當大的","It costs a considerable amount of money.","這要花相當多的錢。"],
["perspective","/pɚˈspɛktɪv/","觀點","Travel gives you a new perspective.","旅行給你新的觀點。"],
["decline","/dɪˈklaɪn/","下降","Sales began to decline in 2020.","銷售在 2020 年開始下滑。"]]]],
7:[["高分字彙（一）","🏆",[
["detrimental","/ˌdɛtrəˈmɛntəl/","有害的","Lack of sleep is detrimental to health.","睡眠不足有害健康。"],
["mitigate","/ˈmɪtəˌɡeɪt/","減輕","Trees can mitigate the effects of heat.","樹木可以減輕高溫的影響。"],
["unprecedented","/ʌnˈprɛsəˌdɛntɪd/","前所未有的","The city saw unprecedented growth.","這座城市經歷前所未有的成長。"],
["ubiquitous","/juˈbɪkwətəs/","無所不在的","Smartphones have become ubiquitous.","智慧型手機已經無所不在。"],
["exacerbate","/ɪɡˈzæsɚˌbeɪt/","使惡化","Cars exacerbate air pollution.","汽車使空氣污染惡化。"],
["feasible","/ˈfizəbəl/","可行的","Is this plan financially feasible?","這個計畫在財務上可行嗎？"],
["profound","/prəˈfaʊnd/","深遠的","The internet had a profound impact on work.","網路對工作影響深遠。"],
["scrutinize","/ˈskrutəˌnaɪz/","仔細審查","Officials scrutinize every application.","官員仔細審查每份申請。"]]],
["高分字彙（二）","💎",[
["alleviate","/əˈliviˌeɪt/","緩解","New roads may alleviate traffic.","新道路可能緩解交通。"],
["compelling","/kəmˈpɛlɪŋ/","有說服力的","She made a compelling argument.","她提出很有說服力的論點。"],
["disparity","/dɪˈspærəti/","差距","There is a disparity between rich and poor.","貧富之間有差距。"],
["incentive","/ɪnˈsɛntɪv/","誘因；獎勵","Tax breaks are an incentive to save.","減稅是儲蓄的誘因。"],
["pragmatic","/præɡˈmætɪk/","務實的","We need a pragmatic solution.","我們需要務實的解決方法。"],
["proliferation","/prəˌlɪfəˈreɪʃən/","激增；擴散","The proliferation of apps changed shopping.","應用程式激增改變了購物方式。"],
["undermine","/ˌʌndɚˈmaɪn/","削弱","Fake news can undermine trust.","假新聞會削弱信任。"],
["nuanced","/ˈnuˌɑnst/","細緻的；有層次的","The issue needs a nuanced answer.","這個議題需要細緻的回答。"]]]]};
function vocabUnit(title,icon,rows){
const cards=[{k:"info",h:title,p:"每個字先聽發音、看例句，再做三種題型：聽音選字、選中文意思、句子填空。"}];
rows.forEach(r=>cards.push({k:"vocab",w:r[0],ipa:r[1],zh:r[2],en:r[3],enzh:r[4]}));
const words=rows.map(r=>r[0]);
const others=w=>shuffle(words.filter(x=>x!==w));
rows.forEach((r,i)=>{const w=r[0];
if(i%3===0){const o=others(w);cards.push({k:"listen",say:w,prompt:"聽音選字：你聽到哪個字？",o:shuffle([w,o[0],o[1]]),a:w,e:`${w} ${r[1]}：${r[2]}`})}
else if(i%3===1){const z=shuffle(rows.filter(x=>x[0]!==w)).slice(0,3).map(x=>x[2]);const o=shuffle([r[2],...z]);cards.push({k:"mc",q:`「${w}」是什麼意思？`,o,a:o.indexOf(r[2]),e:`${w} ${r[1]}：${r[2]}`})}
else{const re=new RegExp("\\b"+w+"\\b","i");const q=r[3].replace(re,"___");const o=shuffle([w,...others(w).slice(0,2)]);cards.push({k:"mc",q:`句子填空：${q}`,o,a:o.indexOf(w),e:`${r[3]}（${r[4]}）`})}
});
return cards;
}
function vocabWorld(band){
return {id:"v"+band,name:"單字港 Word Harbor",sub:`IELTS Band ${band} 程度的單字：發音、例句與三種題型。換程度就換一組字。`,icon:"📚",band:[band,band],units:VOCAB[band].map(([t,i,rows])=>({t:`Band ${band}｜${t}`,i,cards:vocabUnit(t,i,rows)}))};
}
window.renderVocab=function(c,b,tag,next){
b.innerHTML=`<div class="card">${tag}<div class="big-word"><div class="W">${c.w}</div><div class="ipa-big">${c.ipa}</div><div class="zh">${c.zh}</div></div>
<div class="play-row"><button class="play" id="p1">🔊 ${c.w}</button><button class="play sm" id="p2" aria-label="慢速">🐢</button></div>
<div class="ex-box"><div class="sent sm">${c.en}</div><div class="zh">${c.enzh}</div><button class="play sm" id="p3" aria-label="聽例句">🔊 例句</button></div></div>${next}`;
$("#p1").onclick=e=>speak(c.w,e.currentTarget);$("#p2").onclick=e=>speak(c.w,e.currentTarget,.6);$("#p3").onclick=e=>speak(c.en,e.currentTarget);
setTimeout(()=>speak(c.w,$("#p1")),250);
};
