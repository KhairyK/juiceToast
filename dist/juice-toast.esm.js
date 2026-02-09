/**
 * 2026 (C) OpenDN Foundation
 * v1.3.1 (STABLE)
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

/* bottom (default) */
#juice-toast-root[data-position="bottom"] {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
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
  --jt-y: 0px;
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
  padding: 8px 10px;
  gap: 8px;
  font-size: 0.9em;
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

  background: rgba(255,255,255,.7);
  transform-origin: left;
  transform: scaleX(1);
  opacity: .85;
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

/* ================= CLASSES ================= */

.spin   { animation: jt-spin .6s linear; }
.pulse  { animation: jt-pulse .4s ease; }
.shake  { animation: jt-shake .4s ease; }
.bounce { animation: jt-bounce .45s ease; }
.wiggle { animation: jt-wiggle .5s ease; }
.pop    { animation: jt-pop .35s ease-out; }

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
`;function injectCSS(e){if(!isBrowser||__cssInjected)return;let t=document.createElement("style");t.id="juice-toast-style",t.textContent=e,document.head.appendChild(t),__cssInjected=!0}let themes={light:{bg:"#ffffff",color:"#111",border:"1px solid #e5e7eb"},dark:{bg:"#1f2937",color:"#fff",border:"1px solid rgba(255,255,255,.08)"}},sizePreset={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},juiceToast={_config:{},_queue:[],_showing:!1,_theme:"dark",_plugins:[],setup(e={}){this._config=e,this._defaults={...this._defaults,...e},this._registerTypes()},use(e){"function"==typeof e&&this._plugins.push(e)},addType(e,t={}){this._config[e]=t,this._registerTypes()},defineTheme(e,t={}){themes[e]={...themes[e]||{},...t}},setTheme(e){if(this._theme=e,!isBrowser)return;let t=document.getElementById("juice-toast-root");t&&(t.dataset.theme=e)},clear(){this._queue.length=0},destroy(){this.clear(),isBrowser&&document.getElementById("juice-toast-root")?.remove()},_registerTypes(){Object.keys(this._config).forEach(e=>{if("function"==typeof this[e]&&!this[e].__auto)return;let t=t=>this._enqueue(e,t);t.__auto=!0,this[e]=t})},_enqueue(e,t){this._queue.push({type:e,payload:t}),this._showing||this._next()},_next(){if(!this._queue.length){this._showing=!1;return}this._showing=!0;let e=this._queue.shift();this._showToast(e.type,e.payload)},_runPlugins(e){this._plugins.forEach(t=>{try{t(e)}catch(s){this._warn("Plugin error: "+s.message)}})},_normalizeGlass(e){if(!0===e)return 60;if(!1===e||null==e)return 0;let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):0},_getRoot(e="bottom-right"){if(!isBrowser)return null;let t=document.getElementById(`juice-toast-root-${e}`);if(!t){switch((t=document.createElement("div")).id=`juice-toast-root-${e}`,t.dataset.position=e,t.dataset.theme=this._theme,t.style.position="fixed",t.style.zIndex=9999,e){case"top-left":t.style.top="20px",t.style.left="20px";break;case"top-right":t.style.top="20px",t.style.right="20px";break;case"bottom-left":t.style.bottom="20px",t.style.left="20px";break;case"bottom-right":t.style.bottom="20px",t.style.right="20px";break;case"top-center":t.style.top="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;case"bottom-center":t.style.bottom="20px",t.style.left="50%",t.style.transform="translateX(-50%)"}document.body.appendChild(t)}return t},_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,playSound:null,dev:!1,injectCSS:!0,css:null},_warn(e){this._defaults.dev&&"undefined"!=typeof console&&console.warn("[JuiceToast]",e)},_playSound(e){if(!isBrowser)return;let t="string"==typeof e&&e?e:this._defaults.playSound;if(t)try{let s=new Audio(t);s.volume=.6,s.play().catch(()=>{})}catch{}},_showToast(e,t){if(!isBrowser)return;!1!==this._defaults.injectCSS&&injectCSS(this._defaults.css||BASE_CSS);let s=this._config[e]||{},i="object"==typeof t?t:{message:String(t)},a={...s,...i};a.icon=a.icon??a.icon_left_top,a.iconPack=a.iconPack??a.icon_config,a.iconLink=a.iconLink??a.icon_onClick_url,a.iconAnimate=a.iconAnimate??a.icon_onClick_animate,a.position=a.position??a.toast,a.closable=a.closable??a.closeable,a.iconPosition=a.iconPosition||"left",a.compact=!!a.compact;let o=themes[a.theme||this._theme]||{},n=document.createElement("div");n.className="juice-toast";let r=a.animation||"slide-in";if(a.enterAnimation||(n.style.animation=`${r} 0.4s ease forwards`),n.setAttribute("role","alert"),n.setAttribute("aria-live","polite"),n.tabIndex=0,a.size&&sizePreset[a.size]){let l=sizePreset[a.size];l.width&&(n.style.width=l.width),l.padding&&(n.style.padding=l.padding)}let c=null;a.progress&&(a.duration??this._defaults.duration)>0&&((c=document.createElement("div")).className="jt-progress",a.progressColor&&(c.style.background=a.progressColor||"rgba(255,255,255,.7)"),n.appendChild(c));let p=this._normalizeGlass(a.glassUI??this._defaults.glassUI);p>0&&(n.classList.add("jt-glass"),n.style.setProperty("--jt-glass",p)),p||(n.style.background=a.bg||o.bg),n.style.color=a.color||o.color,n.style.border=a.border||o.border,a.compact&&n.classList.add("jt-compact"),(a.glassUI??this._defaults.glassUI)&&n.classList.add("jt-glass"),a.width&&(n.style.width=a.width),a.height&&(n.style.height=a.height);let d=null;if(a.icon){(d=document.createElement("i")).className=["icon",a.iconPack||"",a.icon].join(" ").trim(),a.iconSize&&(d.style.fontSize=a.iconSize),(a.iconLink||a.iconAnimate)&&(d.classList.add("icon-clickable"),d.onclick=e=>{e.stopPropagation(),a.iconAnimate&&(d.classList.remove(a.iconAnimate),d.offsetWidth,d.classList.add(a.iconAnimate)),a.iconLink&&window.open(a.iconLink,"_blank","noopener")});let u=a.iconAnimate??TYPE_ANIMATION[e];u&&(d.classList.add(u),d.addEventListener("click",()=>{d.classList.remove(u),d.offsetWidth,d.classList.add(u)}))}reduceMotion&&(n.classList.remove("pop","bounce","shake","wiggle","pulse","spin"),d?.classList.remove("bounce","shake","wiggle","pulse","spin")),a.message||a.title||this._warn("Toast created without message or title"),a.icon&&!a.iconPack&&this._warn("icon provided without iconPack"),a.duration<0&&this._warn("duration cannot be negative");let h=0,m=0;n.addEventListener("touchstart",e=>{h=e.touches[0].clientX}),n.addEventListener("touchmove",e=>{m=e.touches[0].clientX-h,n.style.transform=`translateX(${m}px)`}),n.addEventListener("touchend",()=>{Math.abs(m)>this._defaults.swipeThreshold?(n.style.transform=`translateX(${m>0?1e3:-1e3}px)`,setTimeout(()=>{n.remove(),this._next()},200)):n.style.transform="",h=m=0});let f=document.createElement("div");f.className="jt-content";let g=a.enterAnimation??"pop";if(g&&!reduceMotion&&n.classList.add(g),a.title){let $=document.createElement("div");$.className="jt-title",$.textContent=a.title,f.appendChild($)}let x=document.createElement("div");if(x.className="jt-message",x.textContent=a.message||"",f.appendChild(x),d&&"top"===a.iconPosition?(n.classList.add("jt-icon-top"),n.appendChild(d),n.appendChild(f)):d&&"right"===a.iconPosition?(n.appendChild(f),n.appendChild(d)):(d&&n.appendChild(d),n.appendChild(f)),Array.isArray(a.actions)&&a.actions.length){let b=document.createElement("div");b.className="jt-actions",a.actions.forEach(e=>{let t=document.createElement("button");t.className="jt-action",t.textContent=e.label,t.onclick=t=>{t.stopPropagation(),e.onClick?.(t),e.closeOnClick&&(n.remove(),this._next())},b.appendChild(t)}),f.appendChild(b)}if(a.closable){let y=document.createElement("span");y.className="juice-toast-close",y.innerHTML="\xd7",y.onclick=()=>{n.remove(),this._next()},n.appendChild(y)}let _=this._getRoot(a.position),j=this._defaults.maxVisible;j&&_.children.length>=j&&_.firstChild.remove(),_.appendChild(n),this._runPlugins({toast:n,cfg:a,type:e,root:_}),requestAnimationFrame(()=>n.classList.add("show"));let w=a.duration??2500;if(0===w)return;let k=Date.now(),v=a.duration??this._defaults.duration,C,E=()=>{if(n.__paused)k=Date.now();else{let e=Date.now();v-=e-k,k=e}v<=0?(n.classList.remove("show"),setTimeout(()=>{n.remove(),this._next()},300)):C=requestAnimationFrame(E),c&&(c.style.transform=`scaleX(${Math.max(0,v/w)})`)};n.addEventListener("mouseenter",()=>n.__paused=!0),n.addEventListener("mouseleave",()=>n.__paused=!1),n.addEventListener("touchstart",()=>n.__paused=!0),n.addEventListener("touchend",()=>n.__paused=!1),requestAnimationFrame(E)}};export default juiceToast;export{juiceToast};