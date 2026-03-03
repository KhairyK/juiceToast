var ft=Object.defineProperty,gt=Object.defineProperties,bt=Object.getOwnPropertyDescriptors,U=Object.getOwnPropertySymbols,at=Object.prototype.hasOwnProperty,st=Object.prototype.propertyIsEnumerable,it=(e,t,o)=>t in e?ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,W=(e,t)=>{for(var o in t||(t={}))at.call(t,o)&&it(e,o,t[o]);if(U)for(var o of U(t))st.call(t,o)&&it(e,o,t[o]);return e},B=(e,t)=>gt(e,bt(t)),yt=(e,t)=>{var o={};for(var r in e)at.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&U)for(var r of U(e))t.indexOf(r)<0&&st.call(e,r)&&(o[r]=e[r]);return o};const y=typeof window!="undefined"&&typeof document!="undefined",vt=y&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;class q{constructor(){this._heap=[]}get size(){return this._heap.length}_parent(t){return Math.floor((t-1)/2)}_left(t){return 2*t+1}_right(t){return 2*t+2}_swap(t,o){[this._heap[t],this._heap[o]]=[this._heap[o],this._heap[t]]}push(t,o=0){const r={item:t,priority:o,seq:q._seq=(q._seq||0)+1};this._heap.push(r),this._siftUp(this._heap.length-1)}pop(){if(!this._heap.length)return null;this._swap(0,this._heap.length-1);const t=this._heap.pop();return this._siftDown(0),t.item}peek(){return this._heap[0]?this._heap[0].item:null}_siftUp(t){for(;t>0;){const o=this._parent(t);if(this._compare(t,o)<=0)break;this._swap(t,o),t=o}}_siftDown(t){for(;;){const o=this._left(t),r=this._right(t),l=this._heap.length;let c=t;if(o<l&&this._compare(o,c)>0&&(c=o),r<l&&this._compare(r,c)>0&&(c=r),c===t)break;this._swap(t,c),t=c}}_compare(t,o){const r=this._heap[t],l=this._heap[o];return r.priority!==l.priority?r.priority-l.priority:l.seq-r.seq}}let H=!1;const J=`
/* JuiceToast base (v1.4.0) */
#juice-toast-root,[id^="juice-toast-root-"]{position:fixed;z-index:9999;display:flex;pointer-events:none;gap:10px}
#juice-toast-root[data-position="bottom-right"],#juice-toast-root-bottom-right{bottom:20px;right:20px;flex-direction:column-reverse;align-items:flex-end}
#juice-toast-root[data-position="top-right"]{top:20px;right:20px;flex-direction:column;align-items:flex-end}
#juice-toast-root[data-position="bottom-left"]{bottom:20px;left:20px;flex-direction:column-reverse;align-items:flex-start}
#juice-toast-root[data-position="top-left"]{top:20px;left:20px;flex-direction:column;align-items:flex-start}
#juice-toast-root[data-position="top-center"],#juice-toast-root[data-position="bottom-center"]{left:50%;transform:translateX(-50%)}
.juice-toast{pointer-events:auto;min-width:220px;max-width:420px;padding:12px 16px;margin:6px 0;border-radius:10px;background:linear-gradient(180deg,rgba(30,30,30,.95),rgba(20,20,20,.95));color:#fff;display:flex;gap:12px;align-items:flex-start;box-sizing:border-box;transition:opacity .28s ease,transform .32s ease}
@keyframes jt-slide-in{0%{opacity:0;transform:translateY(20px) scale(0.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes jt-slide-out{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(20px) scale(0.95)}}
.juice-toast.show{animation:jt-slide-in .32s cubic-bezier(0.4,0,0.2,1) forwards;opacity:1;transform:translateY(0)}
.juice-toast.hide{animation:jt-slide-out .28s cubic-bezier(0.4,0,0.2,1) forwards;opacity:0;transform:translateY(12px);pointer-events:none}
.juice-toast .icon{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(255,255,255,.06)}
.jt-content{display:flex;flex-direction:column;gap:4px;flex:1}
.jt-title{font-weight:700;font-size:13px}
.jt-message{font-size:13px;opacity:.95}
.jt-actions{display:flex;gap:8px;margin-top:10px}
.jt-action{border:1px solid currentColor;padding:4px 10px;border-radius:6px;font-size:12px;cursor:pointer;background:transparent}
.jt-progress{position:absolute;left:0;bottom:0;height:4px;width:100%;border-radius:2px;background:linear-gradient(90deg,#4ade80,#22c55e);transform-origin:left;transform:scaleX(1);transition:transform linear}

/* avatar specific */
.jt-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0}

/* ---------------- Modal ---------------- */
/* Overlay */
.jt-modal-overlay{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  background:rgba(15,23,42,.55);
  backdrop-filter:blur(6px) saturate(120%);
  -webkit-backdrop-filter:blur(6px) saturate(120%);
  opacity:0;
  transition:opacity .25s ease;
  z-index:10000;
}
.jt-modal-overlay.show{
  opacity:1;
}

/* Base modal */
.jt-modal{
  width:100%;
  max-width:520px;
  border-radius:18px;
  padding:24px;

  opacity:0;
  transform:translateY(40px) scale(.96);
  transition:
    transform .35s cubic-bezier(.16,1,.3,1),
    opacity .25s ease;
}

.jt-modal.show{
  opacity:1;
  transform:translateY(0) scale(1);
}

.jt-modal-header{
  font-size:18px;
  font-weight:600;
  letter-spacing:.3px;
  margin-bottom:10px;
}

.jt-modal-body{
  font-size:14.5px;
  line-height:1.6;
  opacity:.85;
  margin-bottom:22px;
}

.jt-modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:12px;
}

.jt-modal-btn{
  min-width:88px;
  padding:8px 16px;
  border-radius:12px;
  font-size:13.5px;
  font-weight:500;
  cursor:pointer;
  transition:all .2s ease;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.04);
  color:inherit;
}
.jt-modal-btn:hover{
  background:rgba(255,255,255,.08);
  transform:translateY(-1px);
}
.jt-modal-btn:active{
  transform:translateY(0);
}

.jt-modal-btn.primary{
  background:#6366f1;
  border-color:#6366f1;
  color:#fff;
}
.jt-modal-btn.primary:hover{
  background:#5458ee;
}
`;function rt(e=J){if(!y||H)return;if(document.getElementById("juice-toast-style")){H=!0;return}const t=document.createElement("style");t.id="juice-toast-style",t.textContent=e,document.head.appendChild(t),H=!0}const K=(()=>{let e=1;return()=>"jt-"+e++})();function _(){return Date.now()}function F(e,t){return Object.assign({},e||{},t||{})}function xt(e,t,o){return Math.max(t,Math.min(o,e))}function lt(e){if(!e)return"";const t=document.createElement("template");t.innerHTML=e,t.content.querySelectorAll("script, style, iframe").forEach(r=>r.remove());const o=["b","i","u","strong","em","code","pre","ul","ol","li","br","p","span","img","h1","h2","h3","h4","h5","h6","a"];return(function r(l){Array.from(l.childNodes).forEach(c=>{if(c.nodeType===1){const h=c.tagName.toLowerCase();o.includes(h)?(Array.from(c.attributes||[]).forEach(g=>{const m=g.name.toLowerCase(),f=g.value||"";(m.startsWith("on")||(m==="href"||m==="src"||m==="xlink:href")&&f.trim().toLowerCase().startsWith("javascript:")||h==="img"&&m==="srcset")&&c.removeAttribute(g.name)}),r(c)):c.replaceWith(...Array.from(c.childNodes))}})})(t.content),t.innerHTML}const P={dark:{bg:"linear-gradient(180deg,#1f2937,#111827)",color:"#fff",border:"1px solid rgba(255,255,255,.06)"},light:{bg:"#fff",color:"#111",border:"1px solid #e5e7eb"},glass:{bg:"rgba(30,30,30,.35)",color:"#fff",border:"1px solid rgba(255,255,255,.1)"}},ct={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},_t={success:"jt-bounce",error:"jt-shake",warning:"jt-shake",info:"jt-pulse",loading:"jt-spin"},j={_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,playSound:null,dev:!1,injectCSS:!0,css:null},_config:{},_theme:"dark",_plugins:[],_queue:new q,_queueDedupe:new Set,_activeMap:new Map,_roots:new Map,_modalStack:[],setup(e={}){const t=e,{duration:o,maxVisible:r}=t,l=yt(t,["duration","maxVisible"]);o&&(this._defaults.duration=o),r&&(this._defaults.maxVisible=r),this._config=F(this._config,l),this._registerTypes()},use(e){typeof e=="function"&&this._plugins.push(e)},addType(e,t={}){this._config[e]=t,this._registerTypes()},defineTheme(e,t={}){P[e]=F(P[e]||{},t)},setTheme(e){this._theme=e,y&&this._roots.forEach(t=>t.dataset.theme=e)},clear(){this._queue=new q,this._queueDedupe.clear()},destroy(){this.clear(),y&&(this._roots.forEach(e=>e.remove()),this._roots.clear())},promise(e,t={}){if(!e||typeof e.then!="function"){this._warn("promise expects a Promise");return}const o={id:K()}.id,r=t.timeout;this._enqueue("loading",B(W({},jt(t.loading,"Loading...")),{groupId:o,duration:0}));let l=null;r&&(l=setTimeout(()=>{this._enqueue("error",{message:t.timeoutMessage||"Request timeout",groupId:o}),c()},r));const c=()=>{l&&clearTimeout(l)};return e.then(h=>{c(),this._enqueue("success",B(W({},dt(t.success,h,"Success")),{groupId:o}))}).catch(h=>{c(),this._enqueue("error",B(W({},dt(t.error,h,"Error")),{groupId:o}))}),{cancel:()=>{this._enqueue("info",{message:t.cancelMessage||"Cancelled",groupId:o}),l&&clearTimeout(l)}}},modal(e={}){var t;if(!y)return;this._defaults.injectCSS!==!1&&rt(this._defaults.css||J);const o=F({title:"",message:"",html:null,block:!0,blur:!0,closeOnOverlay:!0,closable:!0,animation:"scale",actions:[],theme:this._theme},e),r=P[o.theme]||P.dark,l=document.createElement("div");l.className="jt-modal-overlay",o.block?l.style.pointerEvents="all":l.style.pointerEvents="none",o.blur||(l.style.backdropFilter="none",l.style.webkitBackdropFilter="none");const c=document.createElement("div");if(c.className=`jt-modal jt-anim-${o.animation}`,c.style.background=r.bg,c.style.color=r.color,c.style.border=r.border||"none",o.title){const m=document.createElement("div");m.className="jt-modal-header",m.textContent=o.title,c.appendChild(m)}const h=document.createElement("div");if(h.className="jt-modal-body",o.html?h.innerHTML=lt(o.html):h.textContent=o.message||"",c.appendChild(h),(t=o.actions)!=null&&t.length){const m=document.createElement("div");m.className="jt-modal-actions",o.actions.forEach(f=>{const w=document.createElement("button");w.className="jt-modal-btn"+(f.primary?" primary":""),w.textContent=f.label||"OK",w.onclick=M=>{var S;M.stopPropagation(),(S=f.onClick)==null||S.call(f,M),f.closeOnClick!==!1&&g()},m.appendChild(w)}),c.appendChild(m)}l.appendChild(c),document.body.appendChild(l),o.block&&(document.body.style.overflow="hidden"),requestAnimationFrame(()=>{l.classList.add("show"),c.classList.add("show")});const g=()=>{l.classList.remove("show"),c.classList.remove("show"),setTimeout(()=>{l.remove(),o.block&&(document.body.style.overflow="")},300)};if(o.closable){o.closeOnOverlay&&l.addEventListener("click",f=>{f.target===l&&g()});const m=f=>{f.key==="Escape"&&(g(),document.removeEventListener("keydown",m))};document.addEventListener("keydown",m)}return{close:g}},_registerTypes(){Object.keys(this._config).forEach(e=>{if(typeof this[e]=="function"&&!this[e].__auto)return;const t=o=>this._enqueue(e,o);t.__auto=!0,this[e]=t})},_enqueue(e,t={}){var o,r;const l=(r=(o=this._priorityMap)==null?void 0:o[t.priority])!=null?r:2,c=t.dedupeKey;if(c&&this._queueDedupe.has(c)){this._defaults.dev&&console.log("[JuiceToast] deduped",c);return}const h={id:K(),type:e,payload:t,priority:l};c&&this._queueDedupe.add(c),this._queue.push(h,l),this._processQueue()},_processQueue(){var e;if(!y)return;const t=this._defaults.maxVisible;for(;this._queue.size>0;){const o=this._queue.pop();if(!o)break;const r=((e=o.payload)==null?void 0:e.position)||"bottom-right",l=this._getRoot(r);if(Array.from(l.children).length>=t){this._queue.push(o,o.priority-.001);break}this._showToast(o.type,o.payload,o.id)}},_getRoot(e="bottom-right"){if(!y)return null;if(this._roots.has(e))return this._roots.get(e);const t=document.createElement("div");switch(t.id=`juice-toast-root-${e}`,t.dataset.position=e,t.dataset.theme=this._theme,t.style.pointerEvents="none",t.style.display="flex",e){case"top-left":t.style.top="20px",t.style.left="20px";break;case"top-right":t.style.top="20px",t.style.right="20px";break;case"bottom-left":t.style.bottom="20px",t.style.left="20px";break;case"bottom-right":t.style.bottom="20px",t.style.right="20px";break;case"top-center":t.style.top="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;case"bottom-center":t.style.bottom="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;default:t.style.bottom="20px",t.style.right="20px"}return document.body.appendChild(t),this._roots.set(e,t),t},_warn(e){this._defaults.dev&&typeof console!="undefined"&&console.warn("[JuiceToast]",e)},_playSound(e){if(!y)return;const t=typeof e=="string"&&e?e:this._defaults.playSound;if(t)try{const o=new Audio(t);o.volume=.6,o.play().catch(()=>{})}catch(o){}},_updateStackPositionsFor(e){const t=Array.from(e.children);e.dataset.position&&e.dataset.position.includes("bottom"),t.forEach((o,r)=>{const l=r,c=l*12;o.style.setProperty("--jt-stack-y",`-${c}px`),o.style.setProperty("--jt-stack-scale",1-l*.04),o.style.setProperty("--jt-stack-opacity",1-l*.12),o.style.zIndex=1e3-l})},_runPlugins(e){this._plugins.forEach(t=>{try{t(e)}catch(o){this._warn("Plugin error: "+o.message)}})},_normalizeGlass(e){if(e===!0)return 60;if(!e)return 0;const t=Number(e);return Number.isFinite(t)?xt(t,0,100):0},_showToast(e,t={},o){var r,l,c,h,g,m,f,w,M,S,Q,G,Z;if(!y)return;this._defaults.injectCSS!==!1&&rt(this._defaults.css||J);const ut=this._config[e]||{},pt=typeof t=="object"?t:{message:String(t)},n=F(ut,pt);n.icon=(r=n.icon)!=null?r:n.icon_left_top,n.position=(c=(l=n.position)!=null?l:n.toast)!=null?c:"bottom-right",n.closable=(g=(h=n.closable)!=null?h:n.closeable)!=null?g:!0,n.duration=(m=n.duration)!=null?m:this._defaults.duration;const Y=P[n.theme||this._theme]||{},v=o||K(),a=document.createElement("div");if(a.className="juice-toast",a.dataset.toastId=v,a.dataset.position=n.position,a.tabIndex=0,a.setAttribute("role","status"),a.style.position="relative",a.style.pointerEvents="auto",a.style.background=n.bg||Y.bg,a.style.color=n.color||Y.color,a.style.border=n.border||Y.border||"none",n.size&&ct[n.size]){const s=ct[n.size];s.width&&(a.style.width=s.width),s.padding&&(a.style.padding=s.padding)}const b=document.createElement("div");if(b.className="jt-content",n.title){const s=document.createElement("div");s.className="jt-title",s.textContent=n.title,b.appendChild(s)}const k=document.createElement("div");if(k.className="jt-message",n.html?k.innerHTML=lt(n.html):typeof n.message=="string"?n.message.split(/(`[^`]+`)/g).forEach(s=>{if(s.startsWith("`")&&s.endsWith("`")){const d=document.createElement("code");d.textContent=s.slice(1,-1),k.appendChild(d)}else k.appendChild(document.createTextNode(s))}):n.message&&(k.textContent=String(n.message)),b.appendChild(k),Array.isArray(n.actions)&&n.actions.length){const s=document.createElement("div");s.className="jt-actions",n.actions.forEach(d=>{const I=document.createElement("button");I.className="jt-action",I.textContent=d.label||"Action",I.onclick=ot=>{var nt;ot.stopPropagation(),(nt=d.onClick)==null||nt.call(d,ot),d.closeOnClick&&L()},s.appendChild(I)}),b.appendChild(s)}let p=null;if(n.icon){if(p=document.createElement("i"),p.className=["icon",n.iconPack||"",n.icon].join(" ").trim(),n.iconSize&&(p.style.fontSize=n.iconSize),!vt){const s=n.iconAnim||_t[e];s&&p.classList.add(s)}(n.iconLink||n.iconAnimate)&&(p.classList.add("icon-clickable"),p.addEventListener("click",s=>{s.stopPropagation(),n.iconAnimate&&(p.classList.remove(n.iconAnimate),p.offsetWidth,p.classList.add(n.iconAnimate)),n.iconLink&&window.open(n.iconLink,"_blank","noopener")}))}let u=null;if(n.avatar){u=document.createElement("img");const s=typeof n.avatar=="string"&&n.avatar?n.avatar:n.avatarSrc||"";s&&(u.src=s),u.alt=n.avatarAlt||n.title||"avatar",u.className="jt-avatar",u.loading=n.avatarLazy?"lazy":"eager",u.style.width=u.style.width||"36px",u.style.height=u.style.height||"36px",u.style.borderRadius=u.style.borderRadius||"50%",u.style.objectFit=u.style.objectFit||"cover",u.style.flexShrink="0";const d=n.avatarPosition||"left";d==="left"?u.style.marginRight=(f=n.avatarSpacing)!=null?f:"10px":d==="right"?u.style.marginLeft=(w=n.avatarSpacing)!=null?w:"10px":d==="top"&&(u.style.marginBottom=(M=n.avatarSpacing)!=null?M:"8px")}const D=n.avatarPosition||"left";u&&D==="top"?(a.classList.add("jt-avatar-top"),a.style.flexDirection="column",a.style.alignItems="flex-start",a.appendChild(u),p&&n.iconPosition==="top"?(a.appendChild(p),a.appendChild(b)):p&&n.iconPosition==="right"?(a.appendChild(b),a.appendChild(p)):(p&&a.appendChild(p),a.appendChild(b))):(a.style.flexDirection="row",a.style.alignItems="center",u&&D==="left"&&a.appendChild(u),p&&n.iconPosition==="right"?(a.appendChild(b),a.appendChild(p)):p&&n.iconPosition==="top"?(a.classList.add("jt-icon-top"),a.appendChild(p),a.appendChild(b)):(p&&a.appendChild(p),a.appendChild(b)),u&&D==="right"&&a.appendChild(u));let E=null;if(n.progress&&((S=n.duration)!=null?S:this._defaults.duration)>0&&(E=document.createElement("div"),E.className="jt-progress",n.progressColor&&(E.style.background=n.progressColor),a.appendChild(E)),n.undo){const s=document.createElement("button");s.className="jt-action",s.textContent="Undo",s.onclick=()=>{try{n.undo()}catch(d){}L()},b.appendChild(s)}if(n.closable){const s=document.createElement("span");s.className="juice-toast-close",s.tabIndex=0,s.textContent="\xD7",s.addEventListener("click",d=>{d.stopPropagation(),L()}),a.appendChild(s)}const x=this._getRoot(n.position||"bottom-right");if(!x)return;if(n.groupId){const s=Array.from(x.children).find(d=>d.dataset.groupId===n.groupId);if(s){let d=s.querySelector(".jt-count");d||(d=document.createElement("span"),d.className="jt-count",d.style.marginLeft="6px",(Q=s.querySelector(".jt-title"))==null||Q.appendChild(d),d.textContent="1"),d.textContent=String(parseInt(d.textContent||"1")+1);return}a.dataset.groupId=n.groupId}const tt=this._defaults.maxVisible;tt&&x.children.length>=tt&&x.removeChild(x.firstElementChild),x.appendChild(a);const i={id:v,toast:a,cfg:n,createdAt:_(),remaining:(G=n.duration)!=null?G:this._defaults.duration,raf:null,timer:null,start:_(),paused:!1,_boundMove:null,_boundUp:null};this._activeMap.set(v,i),this._runPlugins({toast:a,cfg:n,type:e,root:x}),this._updateStackPositionsFor(x),requestAnimationFrame(()=>a.classList.add("show"));let X=0,R=0,C=0,T=0,$=!1;const A=s=>{const d=s.touches?s.touches[0]:s;X=d.clientX,R=d.clientY,$=!0,i.paused=!0,i.raf&&(cancelAnimationFrame(i.raf),i.raf=null),a.style.transition="none",i._boundMove=mt,i._boundUp=ht,document.addEventListener("touchmove",i._boundMove,{passive:!0}),document.addEventListener("mousemove",i._boundMove),document.addEventListener("touchend",i._boundUp),document.addEventListener("mouseup",i._boundUp)},mt=s=>{if(!$)return;const d=s.touches?s.touches[0]:s;C=d.clientX-X,T=d.clientY-R,Math.abs(C)>Math.abs(T)?a.style.transform=`translateX(${C}px)`:a.style.transform=`translateY(${T}px)`},ht=()=>{$=!1,i.paused=!1,a.style.transition="",Math.abs(C)>(this._defaults.swipeThreshold||60)?(a.style.transform=`translateX(${C>0?1e3:-1e3}px)`,setTimeout(L,220)):a.style.transform="",X=R=C=T=0,i._boundMove&&(document.removeEventListener("touchmove",i._boundMove,{passive:!0}),document.removeEventListener("mousemove",i._boundMove),i._boundMove=null),i._boundUp&&(document.removeEventListener("touchend",i._boundUp),document.removeEventListener("mouseup",i._boundUp),i._boundUp=null),V()};a.addEventListener("touchstart",A,{passive:!0}),a.addEventListener("mousedown",A);const N=()=>{i.paused=!0,i.raf&&(cancelAnimationFrame(i.raf),i.raf=null)},z=()=>{i.paused&&(i.paused=!1,i.start=_(),V())};a.addEventListener("mouseenter",N),a.addEventListener("mouseleave",z),a.addEventListener("focusin",N),a.addEventListener("focusout",z);const O=(Z=n.duration)!=null?Z:this._defaults.duration;function et(){if(!j._activeMap.has(v))return;if(i.paused){i.raf=null,i.start=_();return}const s=_()-i.start;if(i.remaining-=s,i.start=_(),E){const d=Math.max(0,i.remaining/O);E.style.transform=`scaleX(${d})`}if(i.remaining<=0){a.classList.remove("show"),setTimeout(L,280),i.raf=null;return}i.raf=requestAnimationFrame(et)}function V(){O<=0||i.raf||i.paused||(i.start=_(),i.raf=requestAnimationFrame(et))}O>0&&(i.start=_(),i.remaining=O,V());function L(){if(!j._activeMap.has(v))return;a.classList.add("hide"),a.removeEventListener("touchstart",A),a.removeEventListener("mousedown",A),i._boundMove&&(document.removeEventListener("touchmove",i._boundMove,{passive:!0}),document.removeEventListener("mousemove",i._boundMove),i._boundMove=null),i._boundUp&&(document.removeEventListener("touchend",i._boundUp),document.removeEventListener("mouseup",i._boundUp),i._boundUp=null),a.removeEventListener("mouseenter",N),a.removeEventListener("mouseleave",z),a.removeEventListener("focusin",N),a.removeEventListener("focusout",z);const s=j._activeMap.get(v);s!=null&&s.raf&&(cancelAnimationFrame(s.raf),s.raf=null),s!=null&&s.timer&&(clearTimeout(s.timer),s.timer=null),j._activeMap.delete(v);const d=a.parentNode;d&&d.removeChild(a),d&&j._updateStackPositionsFor(d)}return n.undoTimeout&&(i.timer=setTimeout(L,n.undoTimeout)),(n.playSound||this._defaults.playSound)&&this._playSound(n.playSound||this._defaults.playSound),v},_priorityMap:{low:1,normal:2,high:3,urgent:4}};function jt(e,t){return e?typeof e=="string"?{message:t}:e:{message:t}}function dt(e,t,o){return e?typeof e=="function"?{message:e(t)}:typeof e=="string"?{message:e}:e:{message:o}}j.setup({success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",progress:!0,duration:4e3},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",progress:!0,duration:4e3},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",progress:!0,duration:4e3},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",progress:!0,duration:4e3},loading:{icon:"spinner",iconPack:"fas",iconAnim:"jt-spin",duration:0,progress:!0}});export{j as default,j as juiceToast};
//# sourceMappingURL=juice-toast.esm.js.map
