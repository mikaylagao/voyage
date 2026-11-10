# 航向布里斯本 — 專案說明（給 Claude Code）

純靜態 PWA，無 build 步驟。瀏覽器開 index.html 即可執行；GitHub Pages 由 .github/workflows/pages.yml 自動部署。

## 檔案
- index.html：畫面骨架（地圖、課程、結果、安裝教學、船長日誌）
- css/app.css：樣式（CSS 變數定義深淺色；主題色 --ocean #1E6FD9）
- js/phonics.js：Phonics 資料與拼讀分段（ABC 字母表、word family、PH 聲音表＋OVERRIDE、segment()、PHONICS 四座島）；音標一律用美式 IPA
- js/grammar-data.js：文法章節資料 GRAMMAR（w2 基礎灣、w3 進階礁、w4 深海峽、w5 IELTS）＋ EXTRA 補章與排序
- js/grammar2.js：文法教學模式（N = 每章的公式/用法/常見錯誤；grammarUnit2 產生六段式卡片；排句、改錯題型的渲染）
- js/vocab.js：單字港 VOCAB[band]（Band 3–7 各兩組 8 字，含美式 IPA 與例句；例句必須含單字原形）＋ vocabWorld(band)
- js/speaking.js：口語練習。TRAVEL（觀光／飯店入住／點餐／搭機／購物）、IELTS[band]（Part 1/2/3）、speakWorlds(band)、renderSpeak（SpeechRecognition en-US 辨識 → 關鍵字群組＋字數判斷 → 參考答案；不支援辨識時改用 MediaRecorder 錄音自評）
- js/sfx.js：Web Audio 合成音效（window.sfx）
- js/app.js：引擎：語音(speechSynthesis en-US，自動挑美式語音、可在船長日誌手動選)、程度 BANDS（IELTS 3–7，S.band 決定推薦島、單字、口說題目與語速）、buildWorlds()、狀態(localStorage key ielts-voyage-v2)、地圖（全部關卡開放，可跳關）、卡片流程、徽章、彩帶、安裝
- sw.js：離線快取；改任何檔案後把 CACHE 版本號 +1
- assets/monsters/：原創怪物 SVG（vox.svg 已定稿；cast-sheet.svg 為八傑總表）

## 卡片型別（u.cards）
info / letter / word（含聲音積木；字裡有「·」就是音節卡）/ sent / listen / mc / formula / usage / mistakes / order / vocab / speak

## 規則
- 所有可讀文字用繁體中文；英文一律用美式發音朗讀（en-US），音標用美式 IPA
- 關卡不上鎖，任何關卡都能直接進入；程度只影響「推薦」與內容難度
- 不放外部學習網站連結；教材內建
- 角色為原創 Phonimon，不得使用寶可夢等受版權保護的角色或圖片
- 新增文法章節：在 grammar-data.js 加 G(...)，並在 grammar2.js 的 N 補 f/u/m
- 新增口說題：在 speaking.js 的 TRAVEL 或 IELTS[band] 加 item，k 是關鍵字群組（每組任一字命中即算）
- 任何改動後：bump sw.js 的 CACHE（新增 js 檔也要加進 FILES），並在手機 Safari/Chrome 實測發音與麥克風

## 待辦（下一階段：抓寶系統）
1. 題型試做時出現怪物與血條；答對扣血、答錯扣心；血量 <30% 可丟球
2. 球：每日目標達成 +3；連續 7 天 +1 高級球
3. 道館賽（每島最後一關）與徽章；八徽章解鎖布里斯本聯盟
4. 圖鑑頁：剪影 → 灰 → 全彩；起始夥伴三選一
