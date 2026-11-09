/* ---------- 音效：Web Audio 合成，8-bit 霓虹風，無外部檔案 ---------- */
(function(){
const KEYM="ielts-voyage-mute";
let ctx=null,muted=false;
try{muted=localStorage.getItem(KEYM)==="1"}catch(e){}
function ac(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==="suspended")ctx.resume();return ctx}
function tone(f,t0,dur,type,vol,slide){const c=ac();if(!c||muted)return;const o=c.createOscillator(),g=c.createGain();o.type=type||"square";o.frequency.setValueAtTime(f,c.currentTime+t0);if(slide)o.frequency.exponentialRampToValueAtTime(slide,c.currentTime+t0+dur);g.gain.setValueAtTime(0.0001,c.currentTime+t0);g.gain.exponentialRampToValueAtTime(vol||0.18,c.currentTime+t0+0.01);g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+t0+dur);o.connect(g).connect(c.destination);o.start(c.currentTime+t0);o.stop(c.currentTime+t0+dur+0.02)}
function noise(t0,dur,vol){const c=ac();if(!c||muted)return;const b=c.createBuffer(1,c.sampleRate*dur,c.sampleRate);const d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=c.createBufferSource();s.buffer=b;const g=c.createGain();g.gain.value=vol||0.12;const f=c.createBiquadFilter();f.type="highpass";f.frequency.value=1200;s.connect(f).connect(g).connect(c.destination);s.start(c.currentTime+t0)}
const S={
 tap(){tone(880,0,0.05,"square",0.06)},
 flip(){tone(520,0,0.06,"triangle",0.08);tone(780,0.06,0.06,"triangle",0.08)},
 ok(combo){const base=[523,659,784];tone(base[0],0,0.08);tone(base[1],0.08,0.08);tone(base[2],0.16,0.14);if(combo>=2){tone(1047,0.3,0.12,"square",0.14);if(combo>=3)tone(1319,0.4,0.16,"square",0.14)}},
 bad(){tone(220,0,0.18,"sawtooth",0.14,140);tone(110,0.05,0.25,"square",0.1)},
 heart(){tone(300,0,0.08,"square",0.1);tone(200,0.1,0.14,"square",0.1)},
 pass(stars){[523,659,784,1047].forEach((f,i)=>tone(f,i*0.09,0.12,"square",0.16));tone(1319,0.4,0.35,"triangle",0.18);if(stars===3){tone(1568,0.55,0.3,"triangle",0.16);tone(2093,0.7,0.5,"triangle",0.14);noise(0.4,0.6,0.08)}},
 fail(){tone(392,0,0.2,"square",0.12);tone(349,0.2,0.2,"square",0.12);tone(294,0.4,0.45,"square",0.12)},
 badge(){[784,988,1175,1568].forEach((f,i)=>tone(f,i*0.07,0.1,"triangle",0.16));tone(1568,0.3,0.5,"sine",0.16)},
 catchTry(){tone(600,0,0.08,"square",0.1,300);noise(0.08,0.12,0.06)},
 shake(){tone(260,0,0.05,"square",0.08)},
 caught(){[659,784,988,1319].forEach((f,i)=>tone(f,i*0.08,0.12,"square",0.16));noise(0.3,0.5,0.1)},
 toggle(){muted=!muted;try{localStorage.setItem(KEYM,muted?"1":"0")}catch(e){};return muted},
 isMuted(){return muted},
 unlock(){ac()}
};
window.sfx=S;
document.addEventListener("touchend",()=>S.unlock(),{once:true});
document.addEventListener("click",()=>S.unlock(),{once:true});
document.addEventListener("DOMContentLoaded",()=>{
 const bar=document.querySelector(".bar .grow");if(!bar)return;
 const b=document.createElement("button");b.className="bar-btn";b.id="btn-mute";b.setAttribute("aria-label","音效開關");b.textContent=muted?"🔇":"🔔";
 b.onclick=()=>{const m=S.toggle();b.textContent=m?"🔇":"🔔";if(!m)S.ok(1)};
 bar.after(b);
 document.addEventListener("click",e=>{const t=e.target.closest(".pin, .opt, .tok, .blk, .cta, .play");if(!t||t.disabled)return;if(t.classList.contains("cta"))S.flip();else if(!t.classList.contains("play"))S.tap()},true);
});
})();
