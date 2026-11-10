const CACHE="voyage-v6";
const FILES=["./","./index.html","./css/app.css","./js/phonics.js","./js/grammar-data.js","./js/grammar2.js","./js/vocab.js","./js/speaking.js","./js/sfx.js","./js/app.js","./manifest.json","./icon-180.png","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();if(res.ok&&e.request.url.startsWith(self.location.origin))caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match("./index.html"))))});
