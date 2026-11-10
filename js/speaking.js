/* ---------- 口語練習：播放題目 → 錄音辨識 → 判斷是否切題 → 參考答案 ---------- */
/* 情境題 item：{q:對方說的話, zh:中文意思, hint:你要表達什麼, k:[[關鍵字群組]...], a:[基礎答案(Band 3–4), 自然答案(Band 5+)]} */
/* 每個群組裡任一字出現就算答到；答到一半以上的群組＋字數夠，就算切題 */
const TRAVEL=[
{t:"觀光 Sightseeing",i:"🗽",items:[
{q:"Hi! Can I help you find something?",zh:"嗨！需要幫你找什麼嗎？",hint:"你想問博物館怎麼走",k:[["museum"],["where","how","way","get","find","looking"]],a:["Yes. Where is the museum?","Yes, please. Could you tell me how to get to the museum?"]},
{q:"Would you like a free map of the city?",zh:"要一份免費的市區地圖嗎？",hint:"好，謝謝",k:[["yes","please","sure","thank","thanks","great"]],a:["Yes, please. Thank you.","Yes, that would be great. Thank you so much."]},
{q:"The bus tour starts at ten. How many tickets do you need?",zh:"巴士導覽十點出發，你需要幾張票？",hint:"兩張成人票",k:[["two","2"],["ticket","tickets","adult","adults"]],a:["Two adult tickets, please.","I'd like two adult tickets for the ten o'clock tour, please."]},
{q:"What would you like to see while you're here?",zh:"你在這裡想看些什麼？",hint:"說出一兩個想去的地方",k:[["see","visit","go","museum","park","beach","market","river","bridge","temple","tower","food","shopping","night market"]],a:["I want to see the park and the market.","I'd love to visit the museums and maybe walk along the river."]},
{q:"Excuse me, you dropped something. Is this your phone?",zh:"不好意思，你掉了東西，這是你的手機嗎？",hint:"是我的，謝謝",k:[["yes","mine","my","yeah"],["thank","thanks","appreciate"]],a:["Yes, it's mine. Thank you!","Oh, yes, that's mine. Thank you so much!"]},
{q:"How long are you staying in town?",zh:"你在這裡待多久？",hint:"三天",k:[["day","days","week","weeks","night","nights","month","until"]],a:["Three days.","I'm staying for three days, until Sunday."]}]},
{t:"飯店入住 Hotel Check-in",i:"🏨",items:[
{q:"Good evening. Welcome to the Riverside Hotel. Do you have a reservation?",zh:"晚安，歡迎光臨河畔飯店。請問有訂房嗎？",hint:"有，用 Chen 的名字訂的",k:[["yes","have","reservation","booked","booking"],["name","under","chen"]],a:["Yes. The name is Chen.","Yes, I have a reservation under the name Chen."]},
{q:"May I see your passport, please?",zh:"可以看一下您的護照嗎？",hint:"好，在這裡",k:[["here","sure","yes","of course","passport","course"]],a:["Here you are.","Sure, here's my passport."]},
{q:"How many nights will you be staying with us?",zh:"您要住幾晚？",hint:"三晚",k:[["night","nights","one","two","three","four","five","week"]],a:["Three nights.","I'll be staying for three nights."]},
{q:"Would you like a room with a city view or a garden view?",zh:"您想要市景房還是花園景觀房？",hint:"選一種",k:[["city","garden"]],a:["City view, please.","I'd prefer a city view, if possible."]},
{q:"Breakfast is served from six thirty to ten. Do you have any questions?",zh:"早餐六點半到十點供應，有什麼問題嗎？",hint:"問 Wi-Fi 密碼或退房時間",k:[["wifi","wi-fi","password","checkout","check-out","check out","what time","where","pool","gym","elevator"]],a:["What is the Wi-Fi password?","Yes, what time is checkout, and what's the Wi-Fi password?"]},
{q:"Here's your key card. Your room is on the fifth floor. Is there anything else I can help you with?",zh:"這是您的房卡，房間在五樓。還有什麼需要幫忙的嗎？",hint:"沒有了，謝謝",k:[["no","that's all","that's everything","fine","nothing"],["thank","thanks"]],a:["No, thank you.","No, that's everything. Thanks for your help."]}]},
{t:"點餐 Ordering Food",i:"🍔",items:[
{q:"Hi there! Are you ready to order?",zh:"嗨！準備好點餐了嗎？",hint:"好了，我要一個雞肉漢堡",k:[["yes","ready","like","have","please","get"],["burger","chicken","sandwich","salad","pasta","pizza","steak","soup"]],a:["Yes. A chicken burger, please.","Yes, I'd like the chicken burger, please."]},
{q:"Would you like fries or a salad with that?",zh:"要配薯條還是沙拉？",hint:"選一種",k:[["fries","salad"]],a:["Fries, please.","I'll have the salad, please."]},
{q:"And what would you like to drink?",zh:"想喝點什麼？",hint:"點一杯飲料",k:[["water","coffee","tea","juice","coke","soda","lemonade","milk","beer","wine","latte"]],a:["Iced tea, please.","Could I get an iced tea with no sugar, please?"]},
{q:"How would you like your steak cooked?",zh:"牛排要幾分熟？",hint:"五分熟",k:[["rare","medium","well","done"]],a:["Medium, please.","Medium-well, please."]},
{q:"How is everything with your meal?",zh:"餐點還可以嗎？",hint:"很好吃",k:[["good","great","delicious","fine","perfect","tasty","amazing","nice","cold","salty"]],a:["It's very good, thank you.","Everything is delicious, thank you."]},
{q:"Can I get you anything else, or are you ready for the check?",zh:"還需要什麼嗎？還是要結帳了？",hint:"要結帳，問可不可以刷卡",k:[["check","bill","pay","card","that's all","ready"]],a:["The check, please.","Just the check, please. Can I pay by card?"]}]},
{t:"搭機 At the Airport",i:"✈️",items:[
{q:"Good morning. Where are you flying to today?",zh:"早安，今天飛往哪裡？",hint:"說出目的地",k:[["to","flying","going","brisbane","sydney","tokyo","new york","los angeles","london","seattle","taipei","san francisco"]],a:["To Brisbane.","I'm flying to Brisbane today."]},
{q:"Are you checking any bags today?",zh:"今天有要托運的行李嗎？",hint:"有，一件",k:[["yes","no","one","two","bag","bags","suitcase","carry-on","carry on","just"]],a:["Yes, one bag.","Yes, I'm checking one suitcase."]},
{q:"Would you prefer a window seat or an aisle seat?",zh:"想要靠窗還是走道座位？",hint:"選一種",k:[["window","aisle"]],a:["Window, please.","An aisle seat, please, if there's one available."]},
{q:"Did you pack your bags yourself?",zh:"行李是您自己打包的嗎？",hint:"是的",k:[["yes","myself","i did","yeah"]],a:["Yes, I did.","Yes, I packed them myself."]},
{q:"Would you like chicken or pasta for dinner?",zh:"晚餐要雞肉還是義大利麵？",hint:"選一種",k:[["chicken","pasta"]],a:["Chicken, please.","I'll have the pasta, please. Thank you."]},
{q:"What is the purpose of your visit?",zh:"這次來訪的目的是什麼？",hint:"觀光／念書／出差",k:[["study","studying","vacation","holiday","business","travel","traveling","sightseeing","visit","visiting","tourism","tourist","family","conference"]],a:["Sightseeing.","I'm here on vacation for two weeks."]}]},
{t:"購物 Shopping",i:"🛍️",items:[
{q:"Hi, can I help you with anything?",zh:"嗨，需要幫忙嗎？",hint:"我只是看看／我在找外套",k:[["looking","just","browsing","jacket","shoes","shirt","need","want","find","yes"]],a:["I'm just looking, thanks.","Yes, I'm looking for a light jacket."]},
{q:"What size do you usually wear?",zh:"你通常穿什麼尺寸？",hint:"中號",k:[["small","medium","large","size","extra"]],a:["Medium.","I usually wear a medium."]},
{q:"Would you like to try it on? The fitting room is over there.",zh:"要試穿嗎？試衣間在那邊。",hint:"好，謝謝",k:[["yes","sure","please","thanks","thank","okay","ok","no"]],a:["Yes, thank you.","Sure, thanks. I'll try it on."]},
{q:"That comes to forty-five dollars. How would you like to pay?",zh:"總共四十五美元，要怎麼付款？",hint:"刷卡",k:[["card","cash","credit","debit","apple pay","phone"]],a:["By card, please.","Can I pay by credit card?"]},
{q:"Do you need a bag for that?",zh:"需要袋子嗎？",hint:"不用，謝謝",k:[["yes","no","please","thanks","bag","fine"]],a:["No, thank you.","No thanks, I have my own bag."]},
{q:"Is this a gift? Would you like it wrapped?",zh:"這是禮物嗎？要包裝嗎？",hint:"是，請幫我包裝",k:[["yes","no","gift","wrap","wrapped","please","thanks","present"]],a:["Yes, please.","Yes, it's a gift. Could you wrap it, please?"]}]}];
/* IELTS 口說：IELTS[band] = [Part1[], Part2[], Part3[]]，item {q, zh, k, a, cue?} */
const IELTS={
3:[[
{q:"What is your name?",zh:"你叫什麼名字？",k:[["name","i'm","i am","call"]],a:"My name is Amy Chen. You can call me Amy."},
{q:"Where are you from?",zh:"你來自哪裡？",k:[["from","taiwan","taipei","live","city"]],a:"I'm from Taiwan. I live in Taipei."},
{q:"Do you work or are you a student?",zh:"你在工作還是學生？",k:[["work","study","student","job","school","company","shop"]],a:"I work in a shop. I sell clothes."},
{q:"What food do you like?",zh:"你喜歡什麼食物？",k:[["like","love","food","rice","noodles","chicken","fish","eat"]],a:"I like noodles. I eat them every day."},
{q:"Do you like your hometown?",zh:"你喜歡你的家鄉嗎？",k:[["yes","no","like","love","hometown","city","nice","beautiful"]],a:"Yes, I like it. It is nice and the food is good."}],[
{q:"Describe your family. Who is in your family, and what do you do together?",zh:"描述你的家人：有誰？你們一起做什麼？",cue:["有幾個人","他們是誰","一起做什麼"],k:[["mother","father","mom","dad","brother","sister","family","parents","wife","husband","son","daughter","grandmother","grandfather"],["together","eat","watch","go","play","cook","travel","talk"]],a:"There are four people in my family: my father, my mother, my sister and me. We live in Taipei. On Sundays we eat dinner together. I love my family."}],[
{q:"What do you do on weekends?",zh:"你週末做什麼？",k:[["weekend","saturday","sunday","watch","go","play","sleep","shopping","friends","cook","read"]],a:"On weekends, I watch movies and see my friends."},
{q:"What is the weather like today?",zh:"今天天氣如何？",k:[["sunny","rainy","hot","cold","warm","cloudy","weather","nice","windy","rain"]],a:"It is sunny and hot today."}]],
4:[[
{q:"Can you describe your home?",zh:"可以描述一下你家嗎？",k:[["apartment","house","flat","room","rooms","bedroom","live","home","kitchen"]],a:"I live in an apartment with my family. It has three bedrooms and a small kitchen. It's not big, but it's very comfortable."},
{q:"What do you usually do in the morning?",zh:"你早上通常做什麼？",k:[["usually","get up","wake","breakfast","shower","work","school","morning","coffee","tea"]],a:"I usually get up at seven. I have breakfast, drink some tea, and then I take the bus to work."},
{q:"How often do you use your phone?",zh:"你多常用手機？",k:[["every day","always","often","hours","phone","use","time","all the time"]],a:"I use my phone every day, maybe four or five hours. I use it to chat with friends and watch videos."},
{q:"What kind of music do you like?",zh:"你喜歡哪種音樂？",k:[["music","pop","rock","jazz","classical","songs","listen","singer","k-pop"]],a:"I like pop music. I often listen to it on the bus because it makes me happy."},
{q:"Do you prefer tea or coffee? Why?",zh:"你比較喜歡茶還是咖啡？為什麼？",k:[["tea","coffee"],["because","since","taste","healthy","energy","like","love"]],a:"I prefer tea because it is healthier and I like the taste. I drink green tea every afternoon."}],[
{q:"Describe a place you like to visit. You should say where it is, when you go there, and why you like it.",zh:"描述一個你喜歡去的地方：在哪裡、什麼時候去、為什麼喜歡。",cue:["在哪裡","什麼時候去","為什麼喜歡"],k:[["place","park","beach","mountain","city","cafe","restaurant","museum","market","visit","go"],["because","like","love","enjoy","beautiful","relax","quiet","fun"]],a:"I want to talk about a small park near my home. I usually go there on Sunday mornings. There are many trees and a small lake. I like it because it is quiet and the air is fresh. I can relax and forget about work. Sometimes I go there with my friends and we have a picnic."}],[
{q:"Why do people like to travel?",zh:"人們為什麼喜歡旅行？",k:[["because","relax","learn","new","culture","food","fun","experience","see","rest"]],a:"I think people like to travel because they can relax and see new things. They can also try new food and learn about other cultures."},
{q:"Is it better to live in a city or in the countryside?",zh:"住城市好還是鄉下好？",k:[["city","countryside","country"],["because","convenient","quiet","jobs","transport","fresh","busy","noisy"]],a:"I think the city is better for young people because there are more jobs and the transport is convenient. But the countryside is quieter and the air is cleaner."}]],
5:[[
{q:"What do you like about your job or your studies?",zh:"你喜歡你的工作或學業哪一點？",k:[["like","enjoy","job","work","study","studies","subject","colleagues","learn"],["because","interesting","challenging","people","skills"]],a:"What I like most about my job is the people. My colleagues are friendly and helpful. I also enjoy it because I learn something new almost every day."},
{q:"How do you usually spend your free time?",zh:"你通常怎麼度過空閒時間？",k:[["free time","usually","read","watch","play","exercise","friends","hobby","spend","gym","cook"]],a:"In my free time, I usually go to the gym or watch dramas online. On weekends I like to try new restaurants with my friends."},
{q:"Do you think it's important to learn a foreign language?",zh:"你覺得學外語重要嗎？",k:[["important","yes","no","think","necessary"],["because","job","jobs","travel","communicate","culture","opportunities","career"]],a:"Yes, I think it's very important. A foreign language gives you more job opportunities, and it makes traveling much easier because you can communicate with local people."},
{q:"How has your hometown changed in recent years?",zh:"你的家鄉近幾年有什麼改變？",k:[["changed","change","more","new","now","than","used to","buildings","traffic","busier","modern","mrt"]],a:"My hometown has changed a lot. There are more tall buildings and a new MRT line now, so it's much more convenient than before. However, the traffic has also become worse."},
{q:"Do you prefer shopping online or in stores?",zh:"你比較喜歡網購還是實體店？",k:[["online","store","stores","shop","shops","internet"],["because","convenient","cheaper","try","quick","delivery","save"]],a:"I prefer shopping online because it's more convenient and often cheaper. But for clothes and shoes, I still go to stores because I want to try them on first."}],[
{q:"Describe a memorable trip you have taken. You should say where you went, who you went with, what you did there, and explain why it was memorable.",zh:"描述一次難忘的旅行：去哪、和誰、做了什麼、為什麼難忘。",cue:["去了哪裡","和誰去","做了什麼","為什麼難忘"],k:[["went","trip","travel","traveled","visited","go"],["with","friends","family","alone","myself","parents"],["memorable","because","remember","unforgettable","amazing","beautiful","first time"]],a:"I'd like to talk about a trip to Japan that I took two years ago. I went with my best friend, and we stayed in Kyoto for five days. We visited old temples, wore traditional kimonos and tried lots of local food. The most memorable part was watching the autumn leaves in a quiet garden. It was so beautiful that I felt really calm. It was also the first time I planned a whole trip by myself, so I felt proud and more confident afterwards."}],[
{q:"What are the advantages of traveling abroad?",zh:"出國旅行有什麼好處？",k:[["advantage","advantages","benefit","learn","culture","cultures","language","experience","broaden","open-minded","independent"]],a:"One big advantage is that you can experience a different culture. You see how other people live, which broadens your mind. Traveling abroad can also make you more independent, because you have to solve problems on your own."},
{q:"How can tourism affect a local community?",zh:"觀光對當地社區有什麼影響？",k:[["jobs","money","economy","income","pollution","crowded","prices","culture","traffic","business"]],a:"Tourism can bring a lot of money and jobs to a local community, for example in hotels and restaurants. On the other hand, too many tourists can make places crowded and push up prices for local people."},
{q:"Should children learn to cook at school?",zh:"小孩應該在學校學煮飯嗎？",k:[["yes","no","should","think","agree"],["skill","skills","healthy","independent","important","life","because"]],a:"Yes, I think they should. Cooking is an important life skill. If children learn it early, they will eat more healthily and become more independent when they grow up."}]],
6:[[
{q:"Do you think you have a good work-life balance?",zh:"你覺得你的工作與生活平衡嗎？",k:[["balance","work","life","time","stress","busy","rest","overtime"]],a:"To be honest, not really. I often work overtime, so I don't have much time to rest or see my friends. I'm trying to improve it by leaving my laptop at the office on weekends."},
{q:"How important is technology in your daily life?",zh:"科技在你的日常生活中有多重要？",k:[["technology","phone","computer","internet","important","rely","depend","apps","online"]],a:"Technology is extremely important to me. I rely on my phone for almost everything, from paying bills to finding directions. Honestly, I'd find it hard to get through a day without the internet."},
{q:"What kind of books or articles do you enjoy reading?",zh:"你喜歡讀哪種書或文章？",k:[["read","reading","books","novels","articles","news","fiction","enjoy","magazines"]],a:"I mostly enjoy reading articles about psychology and personal growth. I find them practical because I can apply the ideas to my own life. I also read a novel now and then to relax."},
{q:"Has the way people communicate changed in recent years?",zh:"近幾年人們溝通的方式有改變嗎？",k:[["changed","change","social media","messaging","message","online","phone","face to face","nowadays","used to","video"]],a:"Definitely. Nowadays most people communicate through messaging apps and social media instead of phone calls. It's faster and more convenient, but I feel that face-to-face conversations have become less common."}],[
{q:"Describe a skill you would like to learn. You should say what the skill is, how you would learn it, why you want to learn it, and explain how it would help you.",zh:"描述一項你想學的技能：是什麼、怎麼學、為什麼想學、對你有什麼幫助。",cue:["什麼技能","怎麼學","為什麼想學","有什麼幫助"],k:[["skill","learn","learning"],["because","help","useful","career","want","improve"],["course","practice","online","teacher","class","video","videos","lessons"]],a:"A skill I'd really like to learn is video editing. These days, so much communication happens through short videos, and I think it's a really useful skill to have. I'd probably start with an online course, and then practice by editing videos of my own trips. I want to learn it because I'm interested in marketing, and being able to make good videos would definitely help my career. Apart from that, it would also be a creative hobby, and a nice way to keep memories of my travels."}],[
{q:"Why do some people find it difficult to learn new skills as adults?",zh:"為什麼有些人成年後很難學新技能？",k:[["time","busy","work","family","memory","motivation","confidence","afraid","habits","energy","stress"]],a:"I think the main reason is time. Most adults are busy with work and family, so it's hard to practice regularly. Another reason is confidence. Adults are often afraid of making mistakes, so they give up more easily than children."},
{q:"Do you think governments should invest more in public transport?",zh:"政府應該投入更多資源在大眾運輸嗎？",k:[["government","governments","invest","public transport","transport","traffic","pollution","environment","cost","tax","buses","trains"]],a:"Yes, I strongly believe they should. Good public transport reduces traffic jams and air pollution, and it helps people who can't afford a car. Although it costs a lot at first, it benefits the whole society in the long run."},
{q:"What are the pros and cons of working from home?",zh:"在家工作的優缺點是什麼？",k:[["home","commute","commuting","flexible","lonely","distraction","distractions","productive","save","time","balance"]],a:"The biggest advantage is that you save time on commuting, and your schedule is more flexible. However, some people feel lonely or get distracted easily at home, which can make them less productive."}]],
7:[[
{q:"How do you think your hometown will change in the next ten years?",zh:"你覺得家鄉未來十年會怎麼變？",k:[["will","probably","likely","future","expect","predict","imagine"],["development","buildings","transport","population","technology","prices","green","aging","tourism"]],a:"I expect it'll become much greener. The city government has already started replacing old buses with electric ones, so I imagine the air will be cleaner. On the downside, housing prices will probably keep rising, which could push young people out to the suburbs."},
{q:"Is it more important to enjoy your job or to earn a high salary?",zh:"喜歡自己的工作和高薪，哪個比較重要？",k:[["enjoy","salary","money","satisfaction","passion","pay"],["because","however","whereas","long run","motivation","although","depends"]],a:"For me, enjoying the job matters more in the long run. A high salary is motivating at first, but if you dread going to work every day, that motivation fades quickly. That said, I think it depends on your stage of life; if you're supporting a family, financial security might come first."},
{q:"What role does art play in your life?",zh:"藝術在你生活中扮演什麼角色？",k:[["art","music","painting","museum","film","films","creative","express","design","gallery"]],a:"Art plays a bigger role than I used to realize. I'm not an artist myself, but I visit galleries whenever I travel, and music is basically the soundtrack of my day. It helps me unwind and see things from a different perspective."}],[
{q:"Describe a time when you had to make a difficult decision. You should say what the decision was, when you made it, what options you had, and explain how you felt about it afterwards.",zh:"描述一次你必須做困難決定的經驗：是什麼決定、何時、有哪些選擇、事後感受。",cue:["什麼決定","什麼時候","有哪些選擇","事後的感受"],k:[["decision","decide","decided","choose","chose","choice"],["option","options","either","between","alternative","stay","leave"],["felt","feel","regret","relieved","proud","afterwards","looking back","glad"]],a:"I'd like to talk about the moment I decided to leave a stable job to study abroad. This was about three years ago, when I'd been working at the same company for five years. My options were fairly clear: I could either stay, with a decent salary and a likely promotion, or take a risk and spend all my savings on a master's degree in Australia. It was a tough call, because my family was worried and I wasn't sure I'd find work afterwards. In the end, I chose to go. Looking back, I'm genuinely glad I did. It wasn't easy, but it pushed me out of my comfort zone, and I came back far more confident and with a much broader perspective."}],[
{q:"To what extent should individuals be responsible for protecting the environment?",zh:"個人應該在多大程度上為保護環境負責？",k:[["individual","individuals","people","responsible","responsibility","personal"],["government","governments","companies","corporations","policy","however","whereas","although"],["recycle","recycling","plastic","energy","carbon","emissions","consumption","waste"]],a:"I'd say individuals have a role, but it's a limited one. Things like recycling and cutting down on plastic do add up. However, the vast majority of emissions come from industry and energy production, so without strong government policy and corporate accountability, individual efforts alone won't make a significant difference."},
{q:"Some people argue that globalization threatens local cultures. What is your view?",zh:"有人認為全球化威脅在地文化，你的看法是？",k:[["globalization","global","culture","cultures","local","tradition","traditions","identity"],["however","on the other hand","although","while","argue","view","believe","whereas"]],a:"I think there's some truth to it. When the same chain stores and films dominate everywhere, local traditions can gradually fade. On the other hand, globalization also gives local cultures a global stage; Taiwanese bubble tea is a good example. So I'd argue the outcome depends largely on whether communities actively preserve their identity."},
{q:"How might artificial intelligence change education in the future?",zh:"人工智慧未來可能如何改變教育？",k:[["ai","artificial intelligence","technology"],["students","teachers","learning","personalized","education","classroom","tutor"]],a:"AI could make learning far more personalized. Instead of one lesson for thirty students, each learner could get exercises matched to their level and pace. That said, I don't think it will replace teachers; if anything, their role will shift toward mentoring and teaching critical thinking, which machines can't easily do."}]]};
const PARTS=[["Part 1 個人問答","🙋","考官問你日常生活、工作學業、喜好。直接回答，再補一句原因或例子。"],["Part 2 個人陳述","🗣️","拿到題卡後有 1 分鐘準備，然後講 1–2 分鐘。照題卡上的提示一點一點講。"],["Part 3 延伸討論","🧠","討論比較抽象的社會議題：給觀點 → 理由 → 例子，可以提出正反兩面。"]];
const MINW={3:3,4:8,5:15,6:22,7:30};
function minWords(band,part){const m=MINW[band]||10;return part===1?m*3:part===2?Math.round(m*1.5):m}
function speakWorlds(band){
const isl=IELTS[band].map((items,pi)=>{const [t,i,p]=PARTS[pi];const cards=[{k:"info",h:`IELTS 口說 ${t}`,p:`${p}<br><br>每題流程：🔊 聽題目 → 🎙️ 按下錄音回答 → 看辨識結果 → 聽參考答案跟讀。Band ${band} 建議每題至少說 ${minWords(band,pi)} 個字。`}];
items.forEach(it=>cards.push({k:"speak",part:pi,q:it.q,zh:it.zh,cue:it.cue,k2:it.k,a:it.a,min:minWords(band,pi),hideText:band>=5&&pi!==1}));
return {t:`Band ${band}｜${t}`,i,cards}});
const travel=TRAVEL.map(s=>{const cards=[{k:"info",h:s.t,p:`你會聽到對方說一句話，請用英文回答。按 🎙️ 錄音，系統會辨識你說的內容，判斷有沒有回答到重點，再給你參考說法。<br><br>目前程度 Band ${band}：參考答案會用${band>=5?"比較自然完整的句子":"簡單好記的句子"}。`}];
s.items.forEach(it=>cards.push({k:"speak",part:-1,q:it.q,zh:it.zh,hint:it.hint,k2:it.k,a:it.a[band>=5?1:0],min:band>=6?4:band>=5?3:1,hideText:band>=6}));
return {t:s.t,i:s.i,cards}});
return [
{id:"si"+band,name:"口說考場 IELTS Speaking",sub:`Band ${band} 程度的 Part 1／2／3 題目。錄音回答，系統辨識後給參考答案。`,icon:"🎙️",band:[band,band],units:isl},
{id:"tt",name:"旅行會話 Travel Talk",sub:"觀光、飯店入住、點餐、搭機、購物五大情境，聽對方說話再開口回答。",icon:"🌏",band:[3,7],units:travel}];
}
/* ---------- 錄音與辨識 ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function norm(s){return (" "+s.toLowerCase().replace(/[’']/g,"'").replace(/i'm/g,"i am").replace(/it's/g,"it is").replace(/[^a-z0-9' -]/g," ").replace(/-/g," ").replace(/\s+/g," ")+" ")}
function hasKey(t,k){return t.includes(" "+norm(k).trim()+" ")}
function judge(texts,c){
const t=norm(texts.join(" "));const best=texts.map(x=>norm(x));
const words=(best[0]||"").trim().split(" ").filter(Boolean).length;
const hit=c.k2.map(g=>g.some(k=>best.some(b=>hasKey(b,k))||hasKey(t,k)));
const got=hit.filter(Boolean).length;const need=Math.max(1,Math.ceil(c.k2.length/2));
const relevant=got>=need;const longEnough=words>=c.min;
const missing=c.k2.filter((g,i)=>!hit[i]).map(g=>g.slice(0,3).join(" / "));
return {ok:relevant&&longEnough,relevant,longEnough,words,missing}}
let REC=null;
function stopRec(){if(REC){try{REC.stop()}catch(e){}}}
window.renderSpeak=function(c,b,tag){
const lastCard=L.step===L.u.cards.length-1;
const partTag=c.part>=0?["Part 1","Part 2","Part 3"][c.part]:"情境對話";
b.innerHTML=`<div class="card speak">${tag}<div class="sp-head"><span class="pill">${partTag}</span>${c.hint?`<span class="sp-hint">你要說：${c.hint}</span>`:""}</div>
<div class="sp-q ${c.hideText?"hidden":""}" id="sq"><div class="sent sm">${c.q}</div><div class="zh">${c.zh}</div>${c.cue?`<ul class="cue">${c.cue.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</div>
${c.hideText?`<button class="chip" id="showq">👀 看題目文字</button>`:""}
<div class="play-row"><button class="play" id="p1">🔊 播放題目</button><button class="play sm" id="p2" aria-label="慢速播放">🐢</button></div>
<div class="rec-wrap"><button class="rec" id="rec" aria-label="開始錄音">🎙️</button><div class="rec-label" id="recl">${SR?"按下麥克風開始回答，說完再按一次":"按下麥克風錄音，說完再按一次"}</div></div>
<div class="transcript" id="tr" hidden></div><audio id="playback" controls hidden></audio>
<div class="feedback" id="fb"></div>
<div class="model" id="model" hidden><b>參考答案</b><div class="sent sm">${c.a}</div><div class="play-row"><button class="play sm" id="pm">🔊 聽參考答案</button><button class="play sm" id="pm2" aria-label="慢速">🐢</button></div><p class="tip">聽完跟著唸一次，再按「再錄一次」挑戰看看。</p></div></div>
<div class="sp-actions"><button class="cta ghost" id="reveal">看參考答案</button><button class="cta" id="spnext" hidden>${lastCard?"完成這關":"下一題"}</button></div>`;
const q=c.q;$("#p1").onclick=e=>speak(q,e.currentTarget);$("#p2").onclick=e=>speak(q,e.currentTarget,.65);
if($("#showq"))$("#showq").onclick=e=>{$("#sq").classList.remove("hidden");e.currentTarget.remove()};
$("#pm").onclick=e=>speak(c.a,e.currentTarget);$("#pm2").onclick=e=>speak(c.a,e.currentTarget,.65);
setTimeout(()=>speak(q,$("#p1")),300);
let scored=false;
const showModel=()=>{$("#model").hidden=false;$("#reveal").hidden=true;$("#spnext").hidden=false};
const score=(ok)=>{if(scored)return;scored=true;if(ok){L.correct++;L.combo++;window.sfx&&sfx.ok(L.combo);if(L.combo>=2)showCombo(L.combo)}else{L.combo=0}};
$("#reveal").onclick=()=>{stopRec();score(false);showModel();speak(c.a,$("#pm"))};
$("#spnext").onclick=()=>{stopRec();speechSynthesis&&speechSynthesis.cancel();L.step++;renderStep()};
const recBtn=$("#rec"),recl=$("#recl"),tr=$("#tr"),fb=$("#fb");
const setRec=on=>{recBtn.classList.toggle("on",on);recBtn.textContent=on?"⏹":"🎙️";recBtn.setAttribute("aria-label",on?"停止錄音":"開始錄音")};
const result=(texts)=>{const r=judge(texts,c);
let msg;if(r.ok)msg=`✓ 有回答到重點！<small>辨識到 ${r.words} 個字。對照下面的參考答案，看看還能怎麼說得更好。</small>`;
else if(!r.relevant)msg=`還沒答到題目重點。<small>沒聽到和題目相關的字，例如：${r.missing.join("；")}。也可能是辨識不清楚，可以再錄一次。</small>`;
else msg=`方向對了，但說得太短。<small>辨識到 ${r.words} 個字，Band 目標建議至少 ${c.min} 個字。試著加上原因或例子。</small>`;
fb.className="feedback on "+(r.ok?"ok":"bad");fb.innerHTML=msg;if(r.ok)score(true);else window.sfx&&sfx.bad();
showModel();recl.textContent="想再試一次？按麥克風再錄一次";setTimeout(()=>speak(c.a,$("#pm")),700)};
if(SR){
recBtn.onclick=()=>{
if(REC){stopRec();return}
speechSynthesis&&speechSynthesis.cancel();
const r=new SR();r.lang="en-US";r.interimResults=true;r.continuous=true;r.maxAlternatives=3;REC=r;
let finals=[],alts=[],interim="";
r.onresult=e=>{interim="";for(let i=e.resultIndex;i<e.results.length;i++){const res=e.results[i];if(res.isFinal){finals.push(res[0].transcript);for(let j=1;j<res.length;j++)alts.push(res[j].transcript)}else interim+=res[0].transcript}
tr.hidden=false;tr.innerHTML=`<small>你說的是：</small>${(finals.join(" ")+" <i>"+interim+"</i>").trim()}`};
r.onerror=e=>{const m={"not-allowed":"沒有麥克風權限。請在瀏覽器網址列左邊允許使用麥克風，再試一次。","service-not-allowed":"這個瀏覽器不允許語音辨識，請改用 Chrome 或 Safari。","no-speech":"沒有聽到聲音，請靠近麥克風再說一次。","audio-capture":"找不到麥克風。","network":"語音辨識需要網路連線。"}[e.error]||("辨識失敗："+e.error);recl.textContent=m};
r.onend=()=>{REC=null;setRec(false);const said=(finals.join(" ")+" "+interim).trim();if(said){tr.hidden=false;tr.innerHTML=`<small>你說的是：</small>${said}`;result([said,...alts])}};
try{r.start();setRec(true);recl.textContent="錄音中…說完按 ⏹ 停止";tr.hidden=true;fb.className="feedback"}catch(err){recl.textContent="無法開始錄音："+err.message}};
}else{
/* 沒有語音辨識（例如 Firefox）：錄下來自己聽，再自評 */
let mr=null,chunks=[];
recBtn.onclick=async()=>{
if(mr&&mr.state==="recording"){mr.stop();return}
if(!navigator.mediaDevices||!window.MediaRecorder){recl.textContent="這個瀏覽器不支援錄音，請改用 Chrome 或 Safari。可以先按「看參考答案」練習跟讀。";return}
try{speechSynthesis&&speechSynthesis.cancel();const st=await navigator.mediaDevices.getUserMedia({audio:true});mr=new MediaRecorder(st);chunks=[];
mr.ondataavailable=e=>chunks.push(e.data);
mr.onstop=()=>{st.getTracks().forEach(t=>t.stop());setRec(false);const a=$("#playback");a.src=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType}));a.hidden=false;
recl.textContent="這個瀏覽器不能自動辨識，請聽自己的錄音，對照參考答案自評：";showModel();
fb.className="feedback on";fb.innerHTML=`<div class="self"><button class="chip" id="selfok">✓ 我有答到重點</button><button class="chip" id="selfno">再練習</button></div>`;
$("#selfok").onclick=()=>{score(true);fb.className="feedback on ok";fb.innerHTML="很好！繼續下一題。"};$("#selfno").onclick=()=>{score(false);fb.className="feedback on bad";fb.innerHTML="聽參考答案跟讀，再錄一次。"}};
mr.start();setRec(true);recl.textContent="錄音中…說完按 ⏹ 停止"}catch(err){recl.textContent="沒有麥克風權限，請允許使用麥克風後再試。"}};
}
};
