/**
 * 2026 (C) OpenDN Foundation
 * v1.3.3 (STABLE & BUG FIX)
 * ESM (ECMAScript Module)
 */
let isBrowser="undefined"!=typeof window&&"undefined"!=typeof document,reduceMotion=isBrowser&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,TYPE_ANIMATION={success:"bounce",error:"shake",warning:"wiggle",info:"pulse",loading:"spin"},__cssInjected=!1,BASE_CSS=`
#juice-toast-root {
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 10px;
  pointer-events: none;
}

/* top */
#juice-toast-root[data-position="top"] {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
}

/* center */
#juice-toast-root[data-position="center"] {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
}

[id^="juice-toast-root-"] {
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: 10px;
  pointer-events: none;
}


/* ================= TOAST ================= */

.juice-toast {
  /* animation vars (safe for swipe) */
  --jt-x: 0px;
  --jt-y: 12px;

  pointer-events: auto;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  min-width: 220px;
  max-width: 420px;
  padding: 12px 16px;
  margin: 6px 0;

  border-radius: 8px;
  background: #333;
  color: #fff;

  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  font-size: 14px;

  opacity: 0;
  transform: translate(var(--jt-x), var(--jt-y));
  transition:
    opacity .25s ease,
    transform .25s ease,
    background .25s ease,
    color .25s ease,
    box-shadow .25s ease;

  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

/* visible */
.juice-toast.show {
  opacity: 1;
  transform: translate(var(--jt-x), 0px) scale(1);
  transition: transform 0.35s ease, opacity 0.35s ease;
}

/* hide */
.juice-toast.hide {
  opacity: 0;
  transform: translate(var(--jt-x), 12px) scale(0.95);
}


/* ================= ICON ================= */

.juice-toast .icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  flex: 0 0 28px;
}

/* clickable icon */
.icon-clickable {
  opacity: 0.85;
  cursor: pointer;
}

.icon-clickable:hover {
  opacity: 1;
}

/* ================= CONTENT ================= */

.juice-toast .jt-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
}

/* title */
.juice-toast .jt-title {
  font-weight: 700;
  font-size: 13px;
  line-height: 1.1;
}

/* message */
.juice-toast .jt-message {
  font-size: 13px;
  line-height: 1.3;
  opacity: 0.95;
}

/* ================= ICON POSITION ================= */

.jt-icon-top {
  flex-direction: column;
  align-items: flex-start;
}

.jt-icon-top .icon {
  align-self: center;
  margin-bottom: 6px;
}

/* ================= CLOSE ================= */

.juice-toast-close {
  position: absolute;
  top: 6px;
  right: 8px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.75;
  padding: 4px;
  border-radius: 4px;
}

.juice-toast-close:hover {
  opacity: 1;
  background: rgba(255,255,255,0.06);
}

/* ================= ACTIONS ================= */

.jt-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.jt-action {
  background: transparent;
  border: 1px solid currentColor;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

/* ================= COMPACT ================= */

.jt-compact {
  padding: 6px 8px;
  font-size: 0.85em;
  gap: 6px;
  max-width: 280px;
}

/* ================= GLASS UI ================= */

.jt-glass {
  --g: calc(var(--jt-glass, 60) / 100);

  background: rgba(30, 30, 30, calc(0.2 + var(--g)));
  backdrop-filter: blur(calc(6px + (14px * var(--g))))
                   saturate(calc(1 + (0.4 * var(--g))));
  -webkit-backdrop-filter: blur(calc(6px + (14px * var(--g))))
                           saturate(calc(1 + (0.4 * var(--g))));
}

/* light theme support */
[data-theme="light"] .jt-glass {
  background:
    linear-gradient(
      rgba(255,255,255, calc(0.6 * var(--g))),
      rgba(255,255,255, calc(0.35 * var(--g)))
    ),
    rgba(255,255,255, calc(0.55 - (0.25 * var(--g))));

  color: #111;

  border:
    1px solid rgba(0,0,0, calc(0.05 + 0.12 * var(--g)));

  box-shadow:
    0 10px 30px rgba(0,0,0, calc(0.08 + 0.18 * var(--g))),
    inset 0 1px 0 rgba(255,255,255, calc(0.4 * var(--g)));
}

/* ================= PROGRESS BAR ================= */
.jt-progress {
  position: absolute;
  left: 0;
  bottom: 0;

  height: 3px;
  width: 100%;

  background: linear-gradient(to right, #FFFFFF, #FAFAFA);
  height: 4px;
  transform-origin: left;
  transition: transform linear;
  border-radius: 2px;
  transform: scaleX(1);
  opacity: .85;
}

/* ================= BACKGROUND IMAGE ================= */

.juice-toast.bg-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

/* ================= ANIMATIONS ================= */

@keyframes jt-spin {
  to { transform: rotate(360deg); }
}

@keyframes jt-pulse {
  50% { transform: scale(1.15); }
}

@keyframes jt-shake {
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}

@keyframes jt-bounce {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25); }
  60%  { transform: scale(.95); }
  100% { transform: scale(1); }
}

@keyframes jt-wiggle {
  0%   { transform: rotate(0); }
  25%  { transform: rotate(-10deg); }
  50%  { transform: rotate(10deg); }
  75%  { transform: rotate(-6deg); }
  100% { transform: rotate(0); }
}

@keyframes jt-pop {
  0%   { transform: scale(.7); opacity: 0; }
  70%  { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes jt-slide {
  from { transform: translateY(20 px);opacity: 0; }
  to { transform: translateY(0);opacity: 1; }
}

/* ================= CLASSES ================= */

.spin   { animation: jt-spin .6s linear; }
.pulse  { animation: jt-pulse .4s ease; }
.shake  { animation: jt-shake .4s ease; }
.bounce { animation: jt-bounce .45s ease; }
.wiggle { animation: jt-wiggle .5s ease; }
.pop    { animation: jt-pop .35s ease-out; }
.slide-in { animation: jt-slide .55s ease; }

/* ================= ICON INTERACTION ================= */

.icon-clickable {
  cursor: pointer;
  transition: transform .15s ease, opacity .15s ease;
}

.icon-clickable:hover {
  transform: scale(1.1);
  opacity: .85;
}

/* ================= ACCESSIBILITY ================= */

@media (prefers-reduced-motion: reduce) {
  .spin,
  .pulse,
  .shake,
  .bounce,
  .wiggle,
  .pop {
    animation: none !important;
  }
}
`;function injectCSS(e){if(!isBrowser||__cssInjected)return;let t=document.createElement("style");t.id="juice-toast-style",t.textContent=e,document.head.appendChild(t),__cssInjected=!0}let themes={light:{bg:"#ffffff",color:"#111",border:"1px solid #e5e7eb"},dark:{bg:"#1f2937",color:"#fff",border:"1px solid rgba(255,255,255,.08)"},glass:{bg:"rgba(30,30,30,.35)",color:"#fff",border:"1px solid rgba(255,255,255,.15)"},midnight:{bg:"#0f172a",color:"#e5e7eb",border:"1px solid rgba(255,255,255,.06)"},soft:{bg:"#f8fafc",color:"#0f172a",border:"1px solid #e2e8f0"},neutral:{bg:"#ffffff",color:"#374151",border:"1px solid #d1d5db"},brand:{bg:"#6366f1",color:"#fff",border:"none"},gradient:{bg:"linear-gradient(135deg,#6366f1,#ec4899)",color:"#fff",border:"none"},outline:{bg:"transparent",color:"#111",border:"2px solid currentColor"}},sizePreset={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},juiceToast={_config:{},_queue:[],_showing:!1,_theme:"dark",_plugins:[],setup(e={}){let{duration:t,maxVisible:s,...a}=e;this._defaults={...this._defaults,duration:t,maxVisible:s},this._config=a,this._registerTypes()},use(e){"function"==typeof e&&this._plugins.push(e)},addType(e,t={}){this._config[e]=t,this._registerTypes()},defineTheme(e,t={}){themes[e]={...themes[e]||{},...t}},setTheme(e){if(this._theme=e,!isBrowser)return;let t=document.getElementById("juice-toast-root");t&&(t.dataset.theme=e)},clear(){this._queue.length=0},destroy(){this.clear(),isBrowser&&document.getElementById("juice-toast-root")?.remove()},_registerTypes(){Object.keys(this._config).forEach(e=>{if("function"==typeof this[e]&&!this[e].__auto)return;let t=t=>this._enqueue(e,t);t.__auto=!0,this[e]=t})},_enqueue(e,t){this._queue.push({type:e,payload:t}),this._showing||this._next()},_next(){if(!this._queue.length){this._showing=!1;return}this._showing=!0;let e=this._queue.shift();this._showToast(e.type,e.payload)},_runPlugins(e){this._plugins.forEach(t=>{try{t(e)}catch(s){this._warn("Plugin error: "+s.message)}})},_normalizeGlass(e){if(!0===e)return 60;if(!1===e||null==e)return 0;let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):0},_getRoot(e="bottom-right"){if(!isBrowser)return null;let t=document.getElementById(`juice-toast-root-${e}`);if(!t){switch((t=document.createElement("div")).id=`juice-toast-root-${e}`,t.dataset.position=e,t.dataset.theme=this._theme,t.style.position="fixed",t.style.zIndex=9999,e){case"top-left":t.style.top="20px",t.style.left="20px";break;case"top-right":t.style.top="20px",t.style.right="20px";break;case"bottom-left":t.style.bottom="20px",t.style.left="20px";break;case"bottom-right":t.style.bottom="20px",t.style.right="20px";break;case"top-center":t.style.top="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;case"bottom-center":t.style.bottom="20px",t.style.left="50%",t.style.transform="translateX(-50%)"}document.body.appendChild(t)}return t},_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,playSound:null,dev:!1,injectCSS:!0,css:null},_warn(e){this._defaults.dev&&"undefined"!=typeof console&&console.warn("[JuiceToast]",e)},_playSound(e){if(!isBrowser)return;let t="string"==typeof e&&e?e:this._defaults.playSound;if(t)try{let s=new Audio(t);s.volume=.6,s.play().catch(()=>{})}catch{}},_showToast(e,t){if(!isBrowser)return;!1!==this._defaults.injectCSS&&injectCSS(this._defaults.css||BASE_CSS);let s=this._config[e]||{},a="object"==typeof t?t:{message:String(t)},i={...s,...a};i.icon=i.icon??i.icon_left_top,i.iconPack=i.iconPack??i.icon_config,i.iconLink=i.iconLink??i.icon_onClick_url,i.iconAnimate=i.iconAnimate??i.icon_onClick_animate,i.position=i.position??i.toast,i.closable=i.closable??i.closeable,i.iconPosition=i.iconPosition||"left",i.compact=!!i.compact;let o=themes[i.theme||this._theme]||{},n=document.createElement("div");n.className="juice-toast";let r=i.animation||"slide-in";if(i.enterAnimation||(n.style.animation=`${r} 0.4s ease forwards`),n.setAttribute("role","alert"),n.setAttribute("aria-live","error"===e?"assertive":"polite"),n.setAttribute("aria-atomic","true"),n.tabIndex=0,i.closable){let l=document.createElement("span");l.tabIndex=0,l.className="juice-toast-close",l.textContent="\xd7",l.addEventListener("keydown",e=>{("Enter"===e.key||" "===e.key)&&(n.remove(),this._next())})}if(i.size&&sizePreset[i.size]){let c=sizePreset[i.size];c.width&&(n.style.width=c.width),c.padding&&(n.style.padding=c.padding)}let d=null;if(i.progress&&(i.duration??this._defaults.duration)>0&&((d=document.createElement("div")).className="jt-progress",i.progressColor&&(d.style.background=i.progressColor||"rgba(255,255,255,.7)"),n.appendChild(d)),i.tts&&"speechSynthesis"in window)try{let p=new SpeechSynthesisUtterance(i.message||i.title||"");p.lang=i.ttsLang||"en-US",p.rate=i.ttsRate??1,window.speechSynthesis.speak(p)}catch(f){this._warn("TTS failed: "+f.message)}let g=this._normalizeGlass(i.glassUI??this._defaults.glassUI);g>0&&(n.style.setProperty("--jt-glass",i.glassUI??50),n.classList.add("jt-glass")),g||(n.style.background=i.bg||o.bg),n.style.color=i.color||o.color,n.style.border=i.border||o.border,i.compact&&n.classList.add("jt-compact"),i.width&&(n.style.width=i.width),i.height&&(n.style.height=i.height),i.bgImage&&(n.style.backgroundImage=`url(${i.bgImage})`,n.classList.add("bg-image"));let u=null;if(i.icon){(u=document.createElement("i")).className=["icon",i.iconPack||"",i.icon].join(" ").trim(),i.iconSize&&(u.style.fontSize=i.iconSize),(i.iconLink||i.iconAnimate)&&(u.classList.add("icon-clickable"),u.onclick=e=>{e.stopPropagation(),i.iconAnimate&&(u.classList.remove(i.iconAnimate),u.offsetWidth,u.classList.add(i.iconAnimate)),i.iconLink&&window.open(i.iconLink,"_blank","noopener")});let m=i.iconAnimate??TYPE_ANIMATION[e];m&&(u.classList.add(m),u.addEventListener("click",()=>{u.classList.remove(m),u.offsetWidth,u.classList.add(m)}))}reduceMotion&&(n.classList.remove("pop","bounce","shake","wiggle","pulse","spin"),u?.classList.remove("bounce","shake","wiggle","pulse","spin")),i.message||i.title||this._warn("Toast created without message or title"),i.icon&&!i.iconPack&&this._warn("icon provided without iconPack"),i.duration<0&&this._warn("duration cannot be negative");let h=0,$=0;n.addEventListener("touchstart",e=>{h=e.touches[0].clientX}),n.addEventListener("touchmove",e=>{$=e.touches[0].clientX-h,n.style.transform=`translateX(${$}px)`}),n.addEventListener("touchend",()=>{Math.abs($)>this._defaults.swipeThreshold?(n.style.transform=`translateX(${$>0?1e3:-1e3}px)`,setTimeout(()=>{n.remove(),this._next()},200)):n.style.transform="",h=$=0});let x=document.createElement("div");x.className="jt-content";let b=i.enterAnimation??"pop";if(b&&!reduceMotion&&n.classList.add(b),i.title){let y=document.createElement("div");y.className="jt-title",y.textContent=i.title,x.appendChild(y)}let _=document.createElement("div");if(_.className="jt-message",_.textContent=i.message||"",x.appendChild(_),u&&"top"===i.iconPosition?(n.classList.add("jt-icon-top"),n.appendChild(u),n.appendChild(x)):u&&"right"===i.iconPosition?(n.appendChild(x),n.appendChild(u)):(u&&n.appendChild(u),n.appendChild(x)),Array.isArray(i.actions)&&i.actions.length){let j=document.createElement("div");j.className="jt-actions",i.actions.forEach(e=>{let t=document.createElement("button");t.className="jt-action",t.textContent=e.label,t.onclick=t=>{t.stopPropagation(),e.onClick?.(t),e.closeOnClick&&(n.remove(),this._next())},j.appendChild(t)}),x.appendChild(j)}if(i.closable){let k=document.createElement("span");k.className="juice-toast-close",k.textContent="\xd7",k.onclick=()=>{n.remove(),this._next()},n.appendChild(k)}let w=this._getRoot(i.position),v=this._defaults.maxVisible;v&&w.children.length>=v&&w.firstChild.remove(),w.appendChild(n),this._runPlugins({toast:n,cfg:i,type:e,root:w}),requestAnimationFrame(()=>n.classList.add("show"));let C=i.duration??this._defaults.duration;if(0===C)return;let E=Date.now(),S=i.duration??this._defaults.duration,A,I=()=>{if(n.__paused)E=Date.now();else{let e=Date.now();S-=e-E,E=e}S<=0?(n.classList.remove("show"),setTimeout(()=>{n.remove(),this._next()},300)):A=requestAnimationFrame(I),d&&(d.style.transform=`scaleX(${Math.max(0,S/C)})`)};n.addEventListener("mouseenter",()=>n.__paused=!0),n.addEventListener("mouseleave",()=>n.__paused=!1),n.addEventListener("touchstart",()=>n.__paused=!0),n.addEventListener("touchend",()=>n.__paused=!1),requestAnimationFrame(I)}};juiceToast.setup({success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",progress:!0,duration:3e3},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",progress:!0,duration:4e3},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",progress:!0},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",progress:!0},loading:{icon:"fa-spinner",iconPack:"fas",iconAnimate:"spin",duration:0,progress:!1,closable:!1}});export default juiceToast;export{juiceToast};