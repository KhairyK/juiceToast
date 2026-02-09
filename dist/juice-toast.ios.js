/**
 * OpenDN Foundation (C) 2026
 * Source Of Juice Toast v1.3.1 (NEW: For iOS user)
 * Read CONTRIBUTE.md To Contribute
 */
let isBrowser="undefined"!=typeof window&&"undefined"!=typeof document,reduceMotion=isBrowser&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,isTouch=isBrowser&&("ontouchstart"in window||navigator&&navigator.maxTouchPoints>0),isIOS=isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent||""),isIOSStandalone=isBrowser&&(!0===window.navigator.standalone||window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches),TYPE_ANIMATION={success:"bounce",error:"shake",warning:"wiggle",info:"pulse",loading:"spin"},__cssInjected=!1,BASE_CSS=`
:root {
  --jt-safe-top: env(safe-area-inset-top, 0px);
  --jt-safe-bottom: env(safe-area-inset-bottom, 0px);
}

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
  padding-top: var(--jt-safe-top);
  padding-bottom: var(--jt-safe-bottom);
}


/* ================= TOAST ================= */

.juice-toast {
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
`;function injectCSS(e){if(!isBrowser||__cssInjected)return;let t=document.createElement("style");t.id="juice-toast-style",t.textContent=e,document.head.appendChild(t),__cssInjected=!0}let themes={light:{bg:"#ffffff",color:"#111",border:"1px solid #e5e7eb"},dark:{bg:"#1f2937",color:"#fff",border:"1px solid rgba(255,255,255,.08)"}},sizePreset={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},juiceToast={_config:{},_queue:[],_showing:!1,_theme:"dark",_plugins:[],setup(e={}){this._config=e,this._defaults={...this._defaults,...e},isIOS&&(this._defaults.swipeThreshold=Math.min(this._defaults.swipeThreshold||60,50),this._defaults.glassUI=this._defaults.glassUI||60,this._defaults.duration=this._defaults.duration??2200),this._registerTypes()},use(e){"function"==typeof e&&this._plugins.push(e)},addType(e,t={}){this._config[e]=t,this._registerTypes()},defineTheme(e,t={}){themes[e]={...themes[e]||{},...t}},setTheme(e){if(this._theme=e,!isBrowser)return;let t=document.querySelector('[id^="juice-toast-root-"]');t&&(t.dataset.theme=e)},clear(){this._queue.length=0},destroy(){if(this.clear(),!isBrowser)return;let e=document.querySelectorAll('[id^="juice-toast-root-"]');e.forEach(e=>e.remove())},_registerTypes(){Object.keys(this._config).forEach(e=>{if("function"==typeof this[e]&&!this[e].__auto)return;let t=t=>this._enqueue(e,t);t.__auto=!0,this[e]=t})},_enqueue(e,t){this._queue.push({type:e,payload:t}),this._showing||this._next()},_next(){if(!this._queue.length){this._showing=!1;return}this._showing=!0;let e=this._queue.shift();this._showToast(e.type,e.payload)},_runPlugins(e){this._plugins.forEach(t=>{try{t(e)}catch(s){this._warn("Plugin error: "+(s&&s.message?s.message:String(s)))}})},_normalizeGlass(e){if(!0===e)return 60;if(!1===e||null==e)return 0;let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):0},_getRoot(e="bottom-right"){if(!isBrowser)return null;let t=document.getElementById(`juice-toast-root-${e}`);if(!t){switch((t=document.createElement("div")).id=`juice-toast-root-${e}`,t.dataset.position=e,t.dataset.theme=this._theme,t.style.position="fixed",t.style.zIndex=9999,t.style.display="flex",t.style.flexDirection="column",t.style.gap="8px",t.style.pointerEvents="none",e){case"top-left":t.style.top="calc(20px + env(safe-area-inset-top))",t.style.left="20px",t.style.alignItems="flex-start";break;case"top-right":t.style.top="calc(20px + env(safe-area-inset-top))",t.style.right="20px",t.style.alignItems="flex-end";break;case"bottom-left":t.style.bottom="calc(20px + env(safe-area-inset-bottom))",t.style.left="20px",t.style.alignItems="flex-start";break;case"bottom-right":t.style.bottom="calc(20px + env(safe-area-inset-bottom))",t.style.right="20px",t.style.alignItems="flex-end";break;case"top-center":t.style.top="calc(20px + env(safe-area-inset-top))",t.style.left="50%",t.style.transform="translateX(-50%)",t.style.alignItems="center";break;case"bottom-center":t.style.bottom="calc(20px + env(safe-area-inset-bottom))",t.style.left="50%",t.style.transform="translateX(-50%)",t.style.alignItems="center";break;default:t.style.bottom="calc(20px + env(safe-area-inset-bottom))",t.style.right="20px"}document.body.appendChild(t)}return t},_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,playSound:null,dev:!1,injectCSS:!0,css:null},_warn(e){this._defaults.dev&&"undefined"!=typeof console&&console.warn("[JuiceToast]",e)},_playSound(e){if(!isBrowser)return;let t="string"==typeof e&&e?e:this._defaults.playSound;if(t)try{let s=new Audio(t);s.volume=.6;let a=()=>{s.play().catch(()=>{}),window.removeEventListener("touchstart",a),window.removeEventListener("click",a)};s.play().catch(()=>{window.addEventListener("touchstart",a,{once:!0}),window.addEventListener("click",a,{once:!0})})}catch(i){}},_showToast(e,t){if(!isBrowser)return;!1!==this._defaults.injectCSS&&injectCSS(this._defaults.css||BASE_CSS);let s=this._config[e]||{},a="object"==typeof t?t:{message:String(t)},i={...s,...a};i.icon=i.icon??i.icon_left_top,i.iconPack=i.iconPack??i.icon_config,i.iconLink=i.iconLink??i.icon_onClick_url,i.iconAnimate=i.iconAnimate??i.icon_onClick_animate,i.position=i.position??i.toast,i.closable=i.closable??i.closeable,i.iconPosition=i.iconPosition||"left",i.compact=!!i.compact;let o=themes[i.theme||this._theme]||{},n=document.createElement("div");n.className="juice-toast";let r=i.animation||"slide-in";if(i.enterAnimation||(n.style.animation=`${r} 0.4s ease forwards`),n.setAttribute("role","alert"),n.setAttribute("aria-live","polite"),n.tabIndex=0,i.size&&sizePreset[i.size]){let l=sizePreset[i.size];l.width&&(n.style.width=l.width),l.padding&&(n.style.padding=l.padding)}let c=null,d=i.duration??this._defaults.duration;i.progress&&d>0&&((c=document.createElement("div")).className="jt-progress",i.progressColor&&(c.style.background=i.progressColor||"rgba(255,255,255,.7)"),n.appendChild(c));let p=this._normalizeGlass(i.glassUI??this._defaults.glassUI);p>0&&(n.classList.add("jt-glass"),n.style.setProperty("--jt-glass",p)),p||(n.style.background=i.bg||o.bg),n.style.color=i.color||o.color,n.style.border=i.border||o.border,i.compact&&n.classList.add("jt-compact"),(i.glassUI??this._defaults.glassUI)&&n.classList.add("jt-glass"),i.width&&(n.style.width=i.width),i.height&&(n.style.height=i.height);let u=null;if(i.icon){(u=document.createElement("i")).className=["icon",i.iconPack||"",i.icon].join(" ").trim(),i.iconSize&&(u.style.fontSize=i.iconSize),(i.iconLink||i.iconAnimate)&&(u.classList.add("icon-clickable"),u.onclick=e=>{e.stopPropagation(),i.iconAnimate&&(u.classList.remove(i.iconAnimate),u.offsetWidth,u.classList.add(i.iconAnimate)),i.iconLink&&window.open(i.iconLink,"_blank","noopener")});let m=i.iconAnimate??TYPE_ANIMATION[e];m&&(u.classList.add(m),u.addEventListener("click",()=>{u.classList.remove(m),u.offsetWidth,u.classList.add(m)}))}reduceMotion&&(n.classList.remove("pop","bounce","shake","wiggle","pulse","spin"),u?.classList.remove("bounce","shake","wiggle","pulse","spin")),i.message||i.title||this._warn("Toast created without message or title"),i.icon&&!i.iconPack&&this._warn("icon provided without iconPack"),i.duration<0&&this._warn("duration cannot be negative");let h=0,f=0,$=!1,g=e=>{let t=e.touches?e.touches[0]:e;h=t.clientX,f=0,$=!0,n.__paused=!0},x=e=>{if(!$)return;let t=e.touches?e.touches[0]:e;f=t.clientX-h,n.style.transform=`translate3d(${f}px, 0, 0)`},y=()=>{$&&($=!1,Math.abs(f)>(this._defaults.swipeThreshold||60)?(n.style.transition="transform .25s ease, opacity .2s ease",n.style.transform=`translate3d(${f>0?1e3:-1e3}px, 0, 0)`,setTimeout(()=>{n.remove(),this._next()},220)):(n.style.transition="transform .2s ease",n.style.transform=""),setTimeout(()=>{n.__paused=!1},60),h=f=0)};isTouch?(n.addEventListener("touchstart",g,{passive:!0}),n.addEventListener("touchmove",x,{passive:!0}),n.addEventListener("touchend",y),n.addEventListener("touchcancel",y)):n.addEventListener("mousedown",e=>{h=e.clientX,f=0,$=!0,n.__paused=!0;let t=e=>{f=e.clientX-h,n.style.transform=`translate3d(${f}px, 0, 0)`},s=()=>{document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",s),y()};document.addEventListener("mousemove",t),document.addEventListener("mouseup",s)});let b=document.createElement("div");b.className="jt-content";let v=i.enterAnimation??"pop";if(v&&!reduceMotion&&n.classList.add(v),i.title){let _=document.createElement("div");_.className="jt-title",_.textContent=i.title,b.appendChild(_)}let j=document.createElement("div");if(j.className="jt-message",j.textContent=i.message||"",b.appendChild(j),u&&"top"===i.iconPosition?(n.classList.add("jt-icon-top"),n.appendChild(u),n.appendChild(b)):u&&"right"===i.iconPosition?(n.appendChild(b),n.appendChild(u)):(u&&n.appendChild(u),n.appendChild(b)),Array.isArray(i.actions)&&i.actions.length){let w=document.createElement("div");w.className="jt-actions",i.actions.forEach(e=>{let t=document.createElement("button");t.className="jt-action",t.textContent=e.label,t.onclick=t=>{t.stopPropagation(),e.onClick?.(t),e.closeOnClick&&(n.remove(),this._next())},w.appendChild(t)}),b.appendChild(w)}if(i.closable){let k=document.createElement("span");k.className="juice-toast-close",k.innerHTML="\xd7",k.onclick=()=>{n.remove(),this._next()},n.appendChild(k)}isIOSStandalone&&(n.style.borderRadius=n.style.borderRadius||"14px");let S=this._getRoot(i.position),E=this._defaults.maxVisible;if(E&&S.children.length>=E&&S.firstChild.remove(),S.appendChild(n),this._runPlugins({toast:n,cfg:i,type:e,root:S}),requestAnimationFrame(()=>{n.classList.add("show")}),0===d)return;let C=Date.now(),L=d,I,T=()=>{if(n.__paused)C=Date.now();else{let e=Date.now();L-=e-C,C=e}if(L<=0?(n.classList.remove("show"),setTimeout(()=>{n.remove(),this._next()},300)):I=requestAnimationFrame(T),c){let t=Math.max(0,Math.min(1,L/d));c.style.transform=`scaleX(${t})`}};isTouch||(n.addEventListener("mouseenter",()=>n.__paused=!0),n.addEventListener("mouseleave",()=>n.__paused=!1)),n.addEventListener("touchstart",()=>{n.__paused=!0},{passive:!0}),n.addEventListener("touchend",()=>{n.__paused=!1}),C=Date.now(),I=requestAnimationFrame(T),(i.playSound||this._defaults.playSound)&&this._playSound(i.playSound)}};export default juiceToast;export{juiceToast};