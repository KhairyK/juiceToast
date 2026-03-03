(function(w,S){typeof exports=="object"&&typeof module!="undefined"?S(exports):typeof define=="function"&&define.amd?define(["exports"],S):(w=typeof globalThis!="undefined"?globalThis:w||self,S(w.juiceToast={}))})(this,(function(w){"use strict";var S=Object.defineProperty,me=Object.defineProperties,he=Object.getOwnPropertyDescriptors,N=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,te=(t,e,n)=>e in t?S(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,X=(t,e)=>{for(var n in e||(e={}))Z.call(e,n)&&te(t,n,e[n]);if(N)for(var n of N(e))ee.call(e,n)&&te(t,n,e[n]);return t},R=(t,e)=>me(t,he(e)),fe=(t,e)=>{var n={};for(var r in t)Z.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&N)for(var r of N(t))e.indexOf(r)<0&&ee.call(t,r)&&(n[r]=t[r]);return n};const y=typeof window!="undefined"&&typeof document!="undefined",ge=y&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;class T{constructor(){this._heap=[]}get size(){return this._heap.length}_parent(e){return Math.floor((e-1)/2)}_left(e){return 2*e+1}_right(e){return 2*e+2}_swap(e,n){[this._heap[e],this._heap[n]]=[this._heap[n],this._heap[e]]}push(e,n=0){const r={item:e,priority:n,seq:T._seq=(T._seq||0)+1};this._heap.push(r),this._siftUp(this._heap.length-1)}pop(){if(!this._heap.length)return null;this._swap(0,this._heap.length-1);const e=this._heap.pop();return this._siftDown(0),e.item}peek(){return this._heap[0]?this._heap[0].item:null}_siftUp(e){for(;e>0;){const n=this._parent(e);if(this._compare(e,n)<=0)break;this._swap(e,n),e=n}}_siftDown(e){for(;;){const n=this._left(e),r=this._right(e),l=this._heap.length;let c=e;if(n<l&&this._compare(n,c)>0&&(c=n),r<l&&this._compare(r,c)>0&&(c=r),c===e)break;this._swap(e,c),e=c}}_compare(e,n){const r=this._heap[e],l=this._heap[n];return r.priority!==l.priority?r.priority-l.priority:l.seq-r.seq}}let $=!1;const V=`
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
`;function ne(t=V){if(!y||$)return;if(document.getElementById("juice-toast-style")){$=!0;return}const e=document.createElement("style");e.id="juice-toast-style",e.textContent=t,document.head.appendChild(e),$=!0}const W=(()=>{let t=1;return()=>"jt-"+t++})();function v(){return Date.now()}function z(t,e){return Object.assign({},t||{},e||{})}function be(t,e,n){return Math.max(e,Math.min(n,t))}function oe(t){if(!t)return"";const e=document.createElement("template");e.innerHTML=t,e.content.querySelectorAll("script, style, iframe").forEach(r=>r.remove());const n=["b","i","u","strong","em","code","pre","ul","ol","li","br","p","span","img","h1","h2","h3","h4","h5","h6","a"];return(function r(l){Array.from(l.childNodes).forEach(c=>{if(c.nodeType===1){const h=c.tagName.toLowerCase();n.includes(h)?(Array.from(c.attributes||[]).forEach(g=>{const m=g.name.toLowerCase(),f=g.value||"";(m.startsWith("on")||(m==="href"||m==="src"||m==="xlink:href")&&f.trim().toLowerCase().startsWith("javascript:")||h==="img"&&m==="srcset")&&c.removeAttribute(g.name)}),r(c)):c.replaceWith(...Array.from(c.childNodes))}})})(e.content),e.innerHTML}const P={dark:{bg:"linear-gradient(180deg,#1f2937,#111827)",color:"#fff",border:"1px solid rgba(255,255,255,.06)"},light:{bg:"#fff",color:"#111",border:"1px solid #e5e7eb"},glass:{bg:"rgba(30,30,30,.35)",color:"#fff",border:"1px solid rgba(255,255,255,.1)"}},se={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},ye={success:"jt-bounce",error:"jt-shake",warning:"jt-shake",info:"jt-pulse",loading:"jt-spin"},x={_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,playSound:null,dev:!1,injectCSS:!0,css:null},_config:{},_theme:"dark",_plugins:[],_queue:new T,_queueDedupe:new Set,_activeMap:new Map,_roots:new Map,_modalStack:[],setup(t={}){const e=t,{duration:n,maxVisible:r}=e,l=fe(e,["duration","maxVisible"]);n&&(this._defaults.duration=n),r&&(this._defaults.maxVisible=r),this._config=z(this._config,l),this._registerTypes()},use(t){typeof t=="function"&&this._plugins.push(t)},addType(t,e={}){this._config[t]=e,this._registerTypes()},defineTheme(t,e={}){P[t]=z(P[t]||{},e)},setTheme(t){this._theme=t,y&&this._roots.forEach(e=>e.dataset.theme=t)},clear(){this._queue=new T,this._queueDedupe.clear()},destroy(){this.clear(),y&&(this._roots.forEach(t=>t.remove()),this._roots.clear())},promise(t,e={}){if(!t||typeof t.then!="function"){this._warn("promise expects a Promise");return}const n={id:W()}.id,r=e.timeout;this._enqueue("loading",R(X({},ve(e.loading,"Loading...")),{groupId:n,duration:0}));let l=null;r&&(l=setTimeout(()=>{this._enqueue("error",{message:e.timeoutMessage||"Request timeout",groupId:n}),c()},r));const c=()=>{l&&clearTimeout(l)};return t.then(h=>{c(),this._enqueue("success",R(X({},ae(e.success,h,"Success")),{groupId:n}))}).catch(h=>{c(),this._enqueue("error",R(X({},ae(e.error,h,"Error")),{groupId:n}))}),{cancel:()=>{this._enqueue("info",{message:e.cancelMessage||"Cancelled",groupId:n}),l&&clearTimeout(l)}}},modal(t={}){var e;if(!y)return;this._defaults.injectCSS!==!1&&ne(this._defaults.css||V);const n=z({title:"",message:"",html:null,block:!0,blur:!0,closeOnOverlay:!0,closable:!0,animation:"scale",actions:[],theme:this._theme},t),r=P[n.theme]||P.dark,l=document.createElement("div");l.className="jt-modal-overlay",n.block?l.style.pointerEvents="all":l.style.pointerEvents="none",n.blur||(l.style.backdropFilter="none",l.style.webkitBackdropFilter="none");const c=document.createElement("div");if(c.className=`jt-modal jt-anim-${n.animation}`,c.style.background=r.bg,c.style.color=r.color,c.style.border=r.border||"none",n.title){const m=document.createElement("div");m.className="jt-modal-header",m.textContent=n.title,c.appendChild(m)}const h=document.createElement("div");if(h.className="jt-modal-body",n.html?h.innerHTML=oe(n.html):h.textContent=n.message||"",c.appendChild(h),(e=n.actions)!=null&&e.length){const m=document.createElement("div");m.className="jt-modal-actions",n.actions.forEach(f=>{const k=document.createElement("button");k.className="jt-modal-btn"+(f.primary?" primary":""),k.textContent=f.label||"OK",k.onclick=q=>{var A;q.stopPropagation(),(A=f.onClick)==null||A.call(f,q),f.closeOnClick!==!1&&g()},m.appendChild(k)}),c.appendChild(m)}l.appendChild(c),document.body.appendChild(l),n.block&&(document.body.style.overflow="hidden"),requestAnimationFrame(()=>{l.classList.add("show"),c.classList.add("show")});const g=()=>{l.classList.remove("show"),c.classList.remove("show"),setTimeout(()=>{l.remove(),n.block&&(document.body.style.overflow="")},300)};if(n.closable){n.closeOnOverlay&&l.addEventListener("click",f=>{f.target===l&&g()});const m=f=>{f.key==="Escape"&&(g(),document.removeEventListener("keydown",m))};document.addEventListener("keydown",m)}return{close:g}},_registerTypes(){Object.keys(this._config).forEach(t=>{if(typeof this[t]=="function"&&!this[t].__auto)return;const e=n=>this._enqueue(t,n);e.__auto=!0,this[t]=e})},_enqueue(t,e={}){var n,r;const l=(r=(n=this._priorityMap)==null?void 0:n[e.priority])!=null?r:2,c=e.dedupeKey;if(c&&this._queueDedupe.has(c)){this._defaults.dev&&console.log("[JuiceToast] deduped",c);return}const h={id:W(),type:t,payload:e,priority:l};c&&this._queueDedupe.add(c),this._queue.push(h,l),this._processQueue()},_processQueue(){var t;if(!y)return;const e=this._defaults.maxVisible;for(;this._queue.size>0;){const n=this._queue.pop();if(!n)break;const r=((t=n.payload)==null?void 0:t.position)||"bottom-right",l=this._getRoot(r);if(Array.from(l.children).length>=e){this._queue.push(n,n.priority-.001);break}this._showToast(n.type,n.payload,n.id)}},_getRoot(t="bottom-right"){if(!y)return null;if(this._roots.has(t))return this._roots.get(t);const e=document.createElement("div");switch(e.id=`juice-toast-root-${t}`,e.dataset.position=t,e.dataset.theme=this._theme,e.style.pointerEvents="none",e.style.display="flex",t){case"top-left":e.style.top="20px",e.style.left="20px";break;case"top-right":e.style.top="20px",e.style.right="20px";break;case"bottom-left":e.style.bottom="20px",e.style.left="20px";break;case"bottom-right":e.style.bottom="20px",e.style.right="20px";break;case"top-center":e.style.top="20px",e.style.left="50%",e.style.transform="translateX(-50%)";break;case"bottom-center":e.style.bottom="20px",e.style.left="50%",e.style.transform="translateX(-50%)";break;default:e.style.bottom="20px",e.style.right="20px"}return document.body.appendChild(e),this._roots.set(t,e),e},_warn(t){this._defaults.dev&&typeof console!="undefined"&&console.warn("[JuiceToast]",t)},_playSound(t){if(!y)return;const e=typeof t=="string"&&t?t:this._defaults.playSound;if(e)try{const n=new Audio(e);n.volume=.6,n.play().catch(()=>{})}catch(n){}},_updateStackPositionsFor(t){const e=Array.from(t.children);t.dataset.position&&t.dataset.position.includes("bottom"),e.forEach((n,r)=>{const l=r,c=l*12;n.style.setProperty("--jt-stack-y",`-${c}px`),n.style.setProperty("--jt-stack-scale",1-l*.04),n.style.setProperty("--jt-stack-opacity",1-l*.12),n.style.zIndex=1e3-l})},_runPlugins(t){this._plugins.forEach(e=>{try{e(t)}catch(n){this._warn("Plugin error: "+n.message)}})},_normalizeGlass(t){if(t===!0)return 60;if(!t)return 0;const e=Number(t);return Number.isFinite(e)?be(e,0,100):0},_showToast(t,e={},n){var r,l,c,h,g,m,f,k,q,A,ie,re,le;if(!y)return;this._defaults.injectCSS!==!1&&ne(this._defaults.css||V);const xe=this._config[t]||{},_e=typeof e=="object"?e:{message:String(e)},o=z(xe,_e);o.icon=(r=o.icon)!=null?r:o.icon_left_top,o.position=(c=(l=o.position)!=null?l:o.toast)!=null?c:"bottom-right",o.closable=(g=(h=o.closable)!=null?h:o.closeable)!=null?g:!0,o.duration=(m=o.duration)!=null?m:this._defaults.duration;const B=P[o.theme||this._theme]||{},_=n||W(),s=document.createElement("div");if(s.className="juice-toast",s.dataset.toastId=_,s.dataset.position=o.position,s.tabIndex=0,s.setAttribute("role","status"),s.style.position="relative",s.style.pointerEvents="auto",s.style.background=o.bg||B.bg,s.style.color=o.color||B.color,s.style.border=o.border||B.border||"none",o.size&&se[o.size]){const a=se[o.size];a.width&&(s.style.width=a.width),a.padding&&(s.style.padding=a.padding)}const b=document.createElement("div");if(b.className="jt-content",o.title){const a=document.createElement("div");a.className="jt-title",a.textContent=o.title,b.appendChild(a)}const E=document.createElement("div");if(E.className="jt-message",o.html?E.innerHTML=oe(o.html):typeof o.message=="string"?o.message.split(/(`[^`]+`)/g).forEach(a=>{if(a.startsWith("`")&&a.endsWith("`")){const d=document.createElement("code");d.textContent=a.slice(1,-1),E.appendChild(d)}else E.appendChild(document.createTextNode(a))}):o.message&&(E.textContent=String(o.message)),b.appendChild(E),Array.isArray(o.actions)&&o.actions.length){const a=document.createElement("div");a.className="jt-actions",o.actions.forEach(d=>{const D=document.createElement("button");D.className="jt-action",D.textContent=d.label||"Action",D.onclick=ue=>{var pe;ue.stopPropagation(),(pe=d.onClick)==null||pe.call(d,ue),d.closeOnClick&&M()},a.appendChild(D)}),b.appendChild(a)}let p=null;if(o.icon){if(p=document.createElement("i"),p.className=["icon",o.iconPack||"",o.icon].join(" ").trim(),o.iconSize&&(p.style.fontSize=o.iconSize),!ge){const a=o.iconAnim||ye[t];a&&p.classList.add(a)}(o.iconLink||o.iconAnimate)&&(p.classList.add("icon-clickable"),p.addEventListener("click",a=>{a.stopPropagation(),o.iconAnimate&&(p.classList.remove(o.iconAnimate),p.offsetWidth,p.classList.add(o.iconAnimate)),o.iconLink&&window.open(o.iconLink,"_blank","noopener")}))}let u=null;if(o.avatar){u=document.createElement("img");const a=typeof o.avatar=="string"&&o.avatar?o.avatar:o.avatarSrc||"";a&&(u.src=a),u.alt=o.avatarAlt||o.title||"avatar",u.className="jt-avatar",u.loading=o.avatarLazy?"lazy":"eager",u.style.width=u.style.width||"36px",u.style.height=u.style.height||"36px",u.style.borderRadius=u.style.borderRadius||"50%",u.style.objectFit=u.style.objectFit||"cover",u.style.flexShrink="0";const d=o.avatarPosition||"left";d==="left"?u.style.marginRight=(f=o.avatarSpacing)!=null?f:"10px":d==="right"?u.style.marginLeft=(k=o.avatarSpacing)!=null?k:"10px":d==="top"&&(u.style.marginBottom=(q=o.avatarSpacing)!=null?q:"8px")}const H=o.avatarPosition||"left";u&&H==="top"?(s.classList.add("jt-avatar-top"),s.style.flexDirection="column",s.style.alignItems="flex-start",s.appendChild(u),p&&o.iconPosition==="top"?(s.appendChild(p),s.appendChild(b)):p&&o.iconPosition==="right"?(s.appendChild(b),s.appendChild(p)):(p&&s.appendChild(p),s.appendChild(b))):(s.style.flexDirection="row",s.style.alignItems="center",u&&H==="left"&&s.appendChild(u),p&&o.iconPosition==="right"?(s.appendChild(b),s.appendChild(p)):p&&o.iconPosition==="top"?(s.classList.add("jt-icon-top"),s.appendChild(p),s.appendChild(b)):(p&&s.appendChild(p),s.appendChild(b)),u&&H==="right"&&s.appendChild(u));let C=null;if(o.progress&&((A=o.duration)!=null?A:this._defaults.duration)>0&&(C=document.createElement("div"),C.className="jt-progress",o.progressColor&&(C.style.background=o.progressColor),s.appendChild(C)),o.undo){const a=document.createElement("button");a.className="jt-action",a.textContent="Undo",a.onclick=()=>{try{o.undo()}catch(d){}M()},b.appendChild(a)}if(o.closable){const a=document.createElement("span");a.className="juice-toast-close",a.tabIndex=0,a.textContent="\xD7",a.addEventListener("click",d=>{d.stopPropagation(),M()}),s.appendChild(a)}const j=this._getRoot(o.position||"bottom-right");if(!j)return;if(o.groupId){const a=Array.from(j.children).find(d=>d.dataset.groupId===o.groupId);if(a){let d=a.querySelector(".jt-count");d||(d=document.createElement("span"),d.className="jt-count",d.style.marginLeft="6px",(ie=a.querySelector(".jt-title"))==null||ie.appendChild(d),d.textContent="1"),d.textContent=String(parseInt(d.textContent||"1")+1);return}s.dataset.groupId=o.groupId}const ce=this._defaults.maxVisible;ce&&j.children.length>=ce&&j.removeChild(j.firstElementChild),j.appendChild(s);const i={id:_,toast:s,cfg:o,createdAt:v(),remaining:(re=o.duration)!=null?re:this._defaults.duration,raf:null,timer:null,start:v(),paused:!1,_boundMove:null,_boundUp:null};this._activeMap.set(_,i),this._runPlugins({toast:s,cfg:o,type:t,root:j}),this._updateStackPositionsFor(j),requestAnimationFrame(()=>s.classList.add("show"));let J=0,K=0,L=0,O=0,Q=!1;const I=a=>{const d=a.touches?a.touches[0]:a;J=d.clientX,K=d.clientY,Q=!0,i.paused=!0,i.raf&&(cancelAnimationFrame(i.raf),i.raf=null),s.style.transition="none",i._boundMove=je,i._boundUp=we,document.addEventListener("touchmove",i._boundMove,{passive:!0}),document.addEventListener("mousemove",i._boundMove),document.addEventListener("touchend",i._boundUp),document.addEventListener("mouseup",i._boundUp)},je=a=>{if(!Q)return;const d=a.touches?a.touches[0]:a;L=d.clientX-J,O=d.clientY-K,Math.abs(L)>Math.abs(O)?s.style.transform=`translateX(${L}px)`:s.style.transform=`translateY(${O}px)`},we=()=>{Q=!1,i.paused=!1,s.style.transition="",Math.abs(L)>(this._defaults.swipeThreshold||60)?(s.style.transform=`translateX(${L>0?1e3:-1e3}px)`,setTimeout(M,220)):s.style.transform="",J=K=L=O=0,i._boundMove&&(document.removeEventListener("touchmove",i._boundMove,{passive:!0}),document.removeEventListener("mousemove",i._boundMove),i._boundMove=null),i._boundUp&&(document.removeEventListener("touchend",i._boundUp),document.removeEventListener("mouseup",i._boundUp),i._boundUp=null),G()};s.addEventListener("touchstart",I,{passive:!0}),s.addEventListener("mousedown",I);const U=()=>{i.paused=!0,i.raf&&(cancelAnimationFrame(i.raf),i.raf=null)},F=()=>{i.paused&&(i.paused=!1,i.start=v(),G())};s.addEventListener("mouseenter",U),s.addEventListener("mouseleave",F),s.addEventListener("focusin",U),s.addEventListener("focusout",F);const Y=(le=o.duration)!=null?le:this._defaults.duration;function de(){if(!x._activeMap.has(_))return;if(i.paused){i.raf=null,i.start=v();return}const a=v()-i.start;if(i.remaining-=a,i.start=v(),C){const d=Math.max(0,i.remaining/Y);C.style.transform=`scaleX(${d})`}if(i.remaining<=0){s.classList.remove("show"),setTimeout(M,280),i.raf=null;return}i.raf=requestAnimationFrame(de)}function G(){Y<=0||i.raf||i.paused||(i.start=v(),i.raf=requestAnimationFrame(de))}Y>0&&(i.start=v(),i.remaining=Y,G());function M(){if(!x._activeMap.has(_))return;s.classList.add("hide"),s.removeEventListener("touchstart",I),s.removeEventListener("mousedown",I),i._boundMove&&(document.removeEventListener("touchmove",i._boundMove,{passive:!0}),document.removeEventListener("mousemove",i._boundMove),i._boundMove=null),i._boundUp&&(document.removeEventListener("touchend",i._boundUp),document.removeEventListener("mouseup",i._boundUp),i._boundUp=null),s.removeEventListener("mouseenter",U),s.removeEventListener("mouseleave",F),s.removeEventListener("focusin",U),s.removeEventListener("focusout",F);const a=x._activeMap.get(_);a!=null&&a.raf&&(cancelAnimationFrame(a.raf),a.raf=null),a!=null&&a.timer&&(clearTimeout(a.timer),a.timer=null),x._activeMap.delete(_);const d=s.parentNode;d&&d.removeChild(s),d&&x._updateStackPositionsFor(d)}return o.undoTimeout&&(i.timer=setTimeout(M,o.undoTimeout)),(o.playSound||this._defaults.playSound)&&this._playSound(o.playSound||this._defaults.playSound),_},_priorityMap:{low:1,normal:2,high:3,urgent:4}};function ve(t,e){return t?typeof t=="string"?{message:e}:t:{message:e}}function ae(t,e,n){return t?typeof t=="function"?{message:t(e)}:typeof t=="string"?{message:t}:t:{message:n}}x.setup({success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",progress:!0,duration:4e3},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",progress:!0,duration:4e3},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",progress:!0,duration:4e3},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",progress:!0,duration:4e3},loading:{icon:"spinner",iconPack:"fas",iconAnim:"jt-spin",duration:0,progress:!0}}),w.default=x,w.juiceToast=x,Object.defineProperty(w,"__esModule",{value:!0})}));
//# sourceMappingURL=juice-toast.umd.js.map
