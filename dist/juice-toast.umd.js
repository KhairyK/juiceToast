(function(T,Y){typeof exports=="object"&&typeof module!="undefined"?Y(exports):typeof define=="function"&&define.amd?define(["exports"],Y):(T=typeof globalThis!="undefined"?globalThis:T||self,Y(T.juiceToast={}))})(this,(function(T){"use strict";var Y=Object.defineProperty,xe=Object.defineProperties,ve=Object.getOwnPropertyDescriptors,Q=Object.getOwnPropertySymbols,ue=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable,he=(e,a,t)=>a in e?Y(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,Z=(e,a)=>{for(var t in a||(a={}))ue.call(a,t)&&he(e,t,a[t]);if(Q)for(var t of Q(a))pe.call(a,t)&&he(e,t,a[t]);return e},ee=(e,a)=>xe(e,ve(a)),je=(e,a)=>{var t={};for(var l in e)ue.call(e,l)&&a.indexOf(l)<0&&(t[l]=e[l]);if(e!=null&&Q)for(var l of Q(e))a.indexOf(l)<0&&pe.call(e,l)&&(t[l]=e[l]);return t};const P=typeof window!="undefined"&&typeof document!="undefined",F=P&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;class K{constructor(){this._heap=[]}get size(){return this._heap.length}_parent(a){return Math.floor((a-1)/2)}_left(a){return 2*a+1}_right(a){return 2*a+2}_swap(a,t){[this._heap[a],this._heap[t]]=[this._heap[t],this._heap[a]]}push(a,t=0){const l={item:a,priority:t,seq:K._seq=(K._seq||0)+1};this._heap.push(l),this._siftUp(this._heap.length-1)}pop(){if(!this._heap.length)return null;this._swap(0,this._heap.length-1);const a=this._heap.pop();return this._siftDown(0),a.item}peek(){return this._heap[0]?this._heap[0].item:null}_siftUp(a){for(;a>0;){const t=this._parent(a);if(this._compare(a,t)<=0)break;this._swap(a,t),a=t}}_siftDown(a){for(;;){const t=this._left(a),l=this._right(a),i=this._heap.length;let r=a;if(t<i&&this._compare(t,r)>0&&(r=t),l<i&&this._compare(l,r)>0&&(r=l),r===a)break;this._swap(a,r),a=r}}_compare(a,t){const l=this._heap[a],i=this._heap[t];return l.priority!==i.priority?l.priority-i.priority:i.seq-l.seq}}let me=!1;const B=`
:root{
  --jt-radius:10px;
  --jt-bg1:rgba(30,30,30,.95);
  --jt-bg2:rgba(20,20,20,.95);
  --jt-gap:10px;
}

/* ROOT \u2014 use data attribute for flexibility */
[data-juice-root]{
  position:fixed;
  z-index:9999;
  display:flex;
  pointer-events:none;
  gap:var(--jt-gap);
  perspective:800px;
}

/* POSITIONS */

[data-juice-root][data-position="bottom-right"]{
  bottom:20px;
  right:20px;
  flex-direction:column-reverse;
  align-items:flex-end;
}

[data-juice-root][data-position="top-right"]{
  top:20px;
  right:20px;
  flex-direction:column;
  align-items:flex-end;
}

[data-juice-root][data-position="bottom-left"]{
  bottom:20px;
  left:20px;
  flex-direction:column-reverse;
  align-items:flex-start;
}

[data-juice-root][data-position="top-left"]{
  top:20px;
  left:20px;
  flex-direction:column;
  align-items:flex-start;
}

[data-juice-root][data-position="top-center"]{
  top:20px;
  left:50%;
  transform:translateX(-50%);
}

[data-juice-root][data-position="bottom-center"]{
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
}

/* TOAST */

.juice-toast{
  pointer-events:auto;
  min-width:220px;
  max-width:420px;
  padding:12px 16px;
  margin:6px 0;
  border-radius:var(--jt-radius);
  background:linear-gradient(180deg,var(--jt-bg1),var(--jt-bg2));
  color:#fff;
  display:flex;
  gap:12px;
  align-items:flex-start;
  box-sizing:border-box;

  transform:
    translate3d(var(--jt-parallax-x,0),var(--jt-parallax-y,0),var(--jt-parallax-z,0))
    translateY(var(--jt-stack-y,0))
    translateX(var(--jt-drag-x,0))
    translateY(var(--jt-drag-y,0))
    rotateX(var(--jt-rot-x,0))
    rotateY(var(--jt-rot-y,0))
    scale(var(--jt-stack-scale,1));

  transform-style:preserve-3d;
  transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .28s ease;
  will-change:transform,opacity;
}

/* STACK DEPTH FEATURE */

.juice-toast[data-stack="1"]{--jt-stack-scale:.97;opacity:.95}
.juice-toast[data-stack="2"]{--jt-stack-scale:.94;opacity:.9}
.juice-toast[data-stack="3"]{--jt-stack-scale:.91;opacity:.85}

/* SHOW/HIDE */

@keyframes jt-slide-in{
  from{opacity:0;transform:translateY(20px) scale(.98)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

@keyframes jt-slide-out{
  from{opacity:1;transform:translateY(0) scale(1)}
  to{opacity:0;transform:translateY(20px) scale(.98)}
}

.juice-toast.show{
  animation:jt-slide-in .32s cubic-bezier(.4,0,.2,1) forwards;
}

.juice-toast.hide{
  animation:jt-slide-out .28s cubic-bezier(.4,0,.2,1) forwards;
  pointer-events:none;
}

/* MICRO ANIMATIONS */

@keyframes jt-bounce{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}

@keyframes jt-shake{
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}

@keyframes jt-pulse{
  0%,100%{transform:scale(1)}
  50%{transform:scale(1.03)}
}

@keyframes jt-spin{
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
}

.jt-spin{animation:jt-spin 1.5s linear infinite}
.jt-pulse{animation:jt-pulse 1.2s ease-in-out}

/* ICON */

.juice-toast .icon{
  width:30px;
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:8px;
  background:rgba(255,255,255,.06);
}

/* CONTENT */

.jt-content{
  display:flex;
  flex-direction:column;
  gap:4px;
  flex:1;
  min-width:0;
}

.jt-title{
  font-weight:700;
  font-size:13px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.jt-message{
  font-size:13px;
  opacity:.95;
  word-break:break-word;
}

/* ACTIONS */

.jt-actions{
  display:flex;
  gap:8px;
  margin-top:10px;
}

.jt-action{
  border:1px solid currentColor;
  padding:4px 10px;
  border-radius:6px;
  font-size:12px;
  cursor:pointer;
  background:transparent;
}

/* PROGRESS */

.jt-progress{
  position:absolute;
  left:0;
  bottom:0;
  height:4px;
  width:100%;
  border-radius:2px;
  background:linear-gradient(90deg,#4ade80,#22c55e);
  transform-origin:left;
  transform:scaleX(1);
  transition:transform linear;
}

/* SWIPE */

.juice-toast.swipe-dismissing{
  opacity:0;
  transition:transform .22s ease-out,opacity .22s ease-out;
}

/* AVATAR */

.jt-avatar{
  width:36px;
  height:36px;
  border-radius:50%;
  object-fit:cover;
  flex-shrink:0;
}

.juice-toast.jt-avatar-top{
  flex-direction:column;
  align-items:flex-start;
}

/* MODAL */

.jt-modal-overlay{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  background:rgba(15,23,42,.55);
  backdrop-filter:blur(6px) saturate(120%);
  opacity:0;
  transition:opacity .25s ease;
  z-index:10000;
}

.jt-modal-overlay.show{opacity:1}

.jt-modal{
  width:100%;
  max-width:520px;
  border-radius:18px;
  padding:24px;
  opacity:0;
  transform:translateY(40px) scale(.96);
  transition:transform .35s cubic-bezier(.16,1,.3,1),opacity .25s ease;
  will-change:transform,opacity;
}

.jt-modal.show{
  opacity:1;
  transform:translateY(0) scale(1);
}

.jt-modal-btn{
  padding:8px 14px;
  border-radius:8px;
  font-size:14px;
  cursor:pointer;
  border:none;
  transition:all .18s ease;
}

/* PRIMARY */

.jt-modal-btn.primary{
  background:#3b82f6;
  color:#fff;
}

.jt-modal-btn.primary:hover{
  background:#2563eb;
}

/* SECONDARY */

.jt-modal-btn.secondary{
  background:#e5e7eb;
  color:#111;
}

.jt-modal-btn.secondary:hover{
  background:#d1d5db;
}

/* OUTLINE */

.jt-modal-btn.outline{
  background:transparent;
  border:1px solid currentColor;
  color:inherit;
}

.jt-modal-btn.outline:hover{
  background:rgba(255,255,255,.06);
}

/* PARALLAX */

[data-juice-root][data-parallax="true"] .juice-toast{
  transition:transform .12s cubic-bezier(.2,.8,.2,1),opacity .2s;
}

/* GLASS FEATURE */

[data-juice-root][data-glass="true"] .juice-toast{
  background:rgba(30,30,30,.55);
  backdrop-filter:blur(14px) saturate(140%);
  border:1px solid rgba(255,255,255,.08);
}

/* REDUCED MOTION */

@media (prefers-reduced-motion:reduce){
  .juice-toast,
  .jt-modal{
    animation:none!important;
    transition:none!important;
  }
}
`;function te(e=B){if(!P||me||(me=!0,document.getElementById("juice-toast-style")))return;const a=document.createElement("style");a.id="juice-toast-style",a.textContent=e,document.head.appendChild(a)}const ae=(()=>{let e=1;return()=>"jt-"+Date.now().toString(36)+"-"+e++})();function w(){return Date.now()}function D(e,a){return Object.assign({},e||{},a||{})}function M(e,a,t){return Math.max(a,Math.min(t,e))}function U(e,a,t){return e+(a-e)*t}function J(e){if(!e)return"";const a=document.createElement("template");a.innerHTML=e,a.content.querySelectorAll("script, style, iframe, object, embed").forEach(i=>i.remove());const t=new Set(["b","i","u","strong","em","code","pre","ul","ol","li","br","p","span","img","h1","h2","h3","h4","h5","h6","a"]),l=/^(https?:\/\/|mailto:|tel:|\/\/)/i;return(function i(r){Array.from(r.childNodes).forEach(s=>{if(s.nodeType===1){const p=s.tagName.toLowerCase();t.has(p)?(Array.from(s.attributes||[]).forEach(f=>{const h=f.name.toLowerCase(),u=(f.value||"").trim();h.startsWith("on")?s.removeAttribute(f.name):h==="src"||h==="href"||h==="xlink:href"?l.test(u)?/^data:\s*image\/svg\+xml/i.test(u)&&s.removeAttribute(f.name):s.removeAttribute(f.name):(p==="img"&&h==="srcset"||h==="style")&&s.removeAttribute(f.name)}),i(s)):s.replaceWith(...Array.from(s.childNodes))}})})(a.content),a.innerHTML}const N={dark:{bg:"linear-gradient(180deg,#1f2937,#111827)",color:"#fff",border:"1px solid rgba(255,255,255,.06)"},light:{bg:"#fff",color:"#111",border:"1px solid #e5e7eb"},glass:{bg:"rgba(30,30,30,.35)",color:"#fff",border:"1px solid rgba(255,255,255,.1)"}},fe={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},Ee={success:"jt-bounce",error:"jt-shake",warning:"jt-shake",info:"jt-pulse",loading:"jt-spin"},$={_defaults:{duration:2500,maxVisible:3,swipeThreshold:60,glassUI:0,glassOnly:!1,playSound:null,dev:!1,injectCSS:!0,css:null,autoDedupe:!1,maxVisiblePerType:{},parallaxMode:!1,autoFetchFA:!0,use3d:!1,parallaxSmoothing:.12,_maxRequeueRetries:8},_config:{},_theme:"dark",_plugins:[],_queue:new K,_queueDedupe:new Set,_activeMap:new Map,_roots:new Map,_modalStack:[],_faInjected:!1,_schedulerRunning:!1,_schedulerLast:0,_schedulerRAF:null,_pausedAll:!1,setup(e={}){const a=e,{duration:t,maxVisible:l}=a,i=je(a,["duration","maxVisible"]);typeof t=="number"&&(this._defaults.duration=t),typeof l=="number"&&(this._defaults.maxVisible=l),typeof e.autoDedupe=="boolean"&&(this._defaults.autoDedupe=e.autoDedupe),e.maxVisiblePerType&&(this._defaults.maxVisiblePerType=D(this._defaults.maxVisiblePerType,e.maxVisiblePerType)),typeof e.parallaxMode=="boolean"&&(this._defaults.parallaxMode=e.parallaxMode),typeof e.autoFetchFA=="boolean"&&(this._defaults.autoFetchFA=e.autoFetchFA),typeof e.use3d=="boolean"&&(this._defaults.use3d=e.use3d),typeof e.parallaxSmoothing=="number"&&(this._defaults.parallaxSmoothing=M(e.parallaxSmoothing,0,1)),typeof e._maxRequeueRetries=="number"&&(this._defaults._maxRequeueRetries=e._maxRequeueRetries),this._config=D(this._config,i),this._registerTypes(),this._defaults.injectCSS!==!1&&te(this._defaults.css||B)},use(e){typeof e=="function"&&this._plugins.push(e)},addType(e,a={}){this._config[e]=a,this._registerTypes()},defineTheme(e,a={}){N[e]=D(N[e]||{},a)},setTheme(e){this._theme=e,P&&this._roots.forEach(a=>a.dataset.theme=e)},clear(){this._queue=new K,this._queueDedupe.clear()},destroy(){this.clear(),P&&(this._roots.forEach(e=>{try{e._parallaxRAF&&cancelAnimationFrame(e._parallaxRAF),e._parallaxHandler&&(e.removeEventListener("mousemove",e._parallaxHandler),e.removeEventListener("touchmove",e._parallaxHandler)),e._parallaxReset&&(e.removeEventListener("mouseleave",e._parallaxReset),e.removeEventListener("touchend",e._parallaxReset)),e.remove()}catch(a){}}),this._roots.clear(),Array.from(this._activeMap.keys()).forEach(e=>this.remove(e)),this._stopScheduler())},promise(e,a={}){if(!e||typeof e.then!="function"){this._warn("promise expects a Promise");return}const t=ae(),l=a.timeout;let i=null,r=!1,s=!1;const p=()=>{i&&(clearTimeout(i),i=null)};return this._enqueue("loading",ee(Z({},ke(a.loading,"Loading...")),{groupId:t,duration:0})),l&&(i=setTimeout(()=>{s||r||(s=!0,p(),this._enqueue("error",{message:a.timeoutMessage||"Request timeout",groupId:t}))},l)),e.then(f=>{r||s||(s=!0,p(),this._enqueue("success",ee(Z({},ye(a.success,f,"Success")),{groupId:t})))}).catch(f=>{r||s||(s=!0,p(),this._enqueue("error",ee(Z({},ye(a.error,f,"Error")),{groupId:t})))}),{cancel:()=>{r||s||(r=!0,p(),this._enqueue("info",{message:a.cancelMessage||"Cancelled",groupId:t}))}}},modal(e={}){var a;if(!P)return;this._defaults.injectCSS!==!1&&te(this._defaults.css||B);const t=D({title:"",message:"",html:null,block:!0,blur:!0,closeOnOverlay:!0,closable:!0,animation:"scale",actions:[],theme:this._theme,use3d:void 0},e),l=t.use3d===void 0?this._defaults.use3d:!!t.use3d,i=N[t.theme]||N.dark,r=document.createElement("div");r.className="jt-modal-overlay",r.style.pointerEvents=t.block?"all":"none",t.blur||(r.style.backdropFilter="none",r.style.webkitBackdropFilter="none");const s=document.createElement("div");if(s.className=`jt-modal jt-anim-${t.animation}`,s.style.background=i.bg,s.style.color=i.color,s.style.border=i.border||"none",l&&(r.style.perspective=r.style.perspective||"900px",s.style.transform="translateY(40px) scale(.96) rotateX(8deg)"),t.title){const u=document.createElement("div");u.className="jt-modal-header",u.textContent=t.title,s.appendChild(u)}const p=document.createElement("div");if(p.className="jt-modal-body",t.html?p.innerHTML=J(t.html):p.textContent=t.message||"",s.appendChild(p),(a=t.actions)!=null&&a.length){const u=document.createElement("div");u.className="jt-modal-actions",t.actions.forEach(y=>{const _=document.createElement("button"),v=y.buttonType||(y.primary?"primary":"secondary");_.className=`jt-modal-btn ${v}`,_.textContent=y.label||"OK",_.onclick=j=>{var L;j.stopPropagation(),(L=y.onClick)==null||L.call(y,j),y.closeOnClick!==!1&&h()},u.appendChild(_)}),s.appendChild(u)}r.appendChild(s),document.body.appendChild(r),this._modalStack.push(r),t.block&&(document.body.style.overflow="hidden"),requestAnimationFrame(()=>{r.classList.add("show"),s.classList.add("show"),l&&(s.style.transform="translateY(0) scale(1) rotateX(0deg)")});const f=u=>{u.key==="Escape"&&h()};t.closable&&(t.closeOnOverlay&&r.addEventListener("click",u=>{u.target===r&&h()}),document.addEventListener("keydown",f));const h=()=>{r.classList.remove("show"),s.classList.remove("show"),l&&(s.style.transform="translateY(40px) scale(.96) rotateX(8deg)"),setTimeout(()=>{try{r.remove()}catch(y){}t.block&&(document.body.style.overflow=""),document.removeEventListener("keydown",f);const u=this._modalStack.indexOf(r);u>=0&&this._modalStack.splice(u,1)},300)};return{close:h}},_registerTypes(){Object.keys(this._config).forEach(e=>{if(typeof this[e]=="function"&&!this[e].__auto)return;const a=t=>this._enqueue(e,t);a.__auto=!0,this[e]=a})},_enqueue(e,a={}){var t,l;const i=typeof a.priority=="number"?a.priority:(l=(t=this._priorityMap)==null?void 0:t[a.priority])!=null?l:2,r=a.dedupeKey||(this._defaults.autoDedupe?this._computeDedupeKey(e,a):void 0);if(r&&this._queueDedupe.has(r)){this._defaults.dev&&console.log("[JuiceToast] deduped (queue)",r);return}const s={id:ae(),type:e,payload:a,priority:i};return s._retries=0,r&&(s._dedupeKey=r,this._queueDedupe.add(r)),this._queue.push(s,i),this._scheduleProcessQueue(),s.id},_processQueueScheduled:!1,_scheduleProcessQueue(){this._processQueueScheduled||(this._processQueueScheduled=!0,setTimeout(()=>{this._processQueueScheduled=!1,this._processQueue()},40))},_processQueue(){var e,a;if(!P)return;const t=this._defaults.maxVisible||1/0;let l=0;for(;this._queue.size>0&&l<200;){l++;const i=this._queue.pop();if(!i)break;const r=((e=i.payload)==null?void 0:e.position)||((a=i.payload)==null?void 0:a.toast)||"bottom-right",s=this._getRoot(r);if(!s){if(i._retries=(i._retries||0)+1,i._retries>(this._defaults._maxRequeueRetries||8)){i._dedupeKey&&this._queueDedupe.delete(i._dedupeKey);continue}setTimeout(()=>{this._queue.push(i,i.priority)},120);break}if(Array.from(s.children).length>=t){if(i._retries=(i._retries||0)+1,i._retries>(this._defaults._maxRequeueRetries||8)){i._dedupeKey&&this._queueDedupe.delete(i._dedupeKey);continue}setTimeout(()=>this._queue.push(i,i.priority),160);break}const p=(this._defaults.maxVisiblePerType||{})[i.type];if(typeof p=="number"&&Array.from(s.children).filter(f=>f.dataset.toastType===i.type).length>=p){if(i._retries=(i._retries||0)+1,i._retries>(this._defaults._maxRequeueRetries||8)){i._dedupeKey&&this._queueDedupe.delete(i._dedupeKey);continue}setTimeout(()=>this._queue.push(i,i.priority),160);break}this._showToast(i.type,i.payload,i.id)}},_getRoot(e="bottom-right"){var a;if(!P)return null;if(this._roots.has(e))return this._roots.get(e);const t=document.createElement("div");switch(t.setAttribute("data-juice-root","1"),t.id=`juice-toast-root-${e}`,t.dataset.position=e,t.dataset.theme=this._theme,t.style.pointerEvents="none",t.style.display="flex",t.style.flexDirection="column",this._defaults.parallaxMode&&(t.dataset.parallax="true"),e){case"top-left":t.style.top="20px",t.style.left="20px";break;case"top-right":t.style.top="20px",t.style.right="20px";break;case"bottom-left":t.style.bottom="20px",t.style.left="20px";break;case"bottom-right":t.style.bottom="20px",t.style.right="20px";break;case"top-center":t.style.top="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;case"bottom-center":t.style.bottom="20px",t.style.left="50%",t.style.transform="translateX(-50%)";break;default:t.style.bottom="20px",t.style.right="20px"}if(document.body.appendChild(t),this._defaults.parallaxMode&&!F){const l=(a=this._defaults.parallaxSmoothing)!=null?a:.12;t._parallaxTargets=new WeakMap;const i=s=>{const p=t.getBoundingClientRect(),f=p.left+p.width/2,h=p.top+p.height/2,u=s.touches?s.touches[0].clientX:s.clientX,y=s.touches?s.touches[0].clientY:s.clientY;Array.from(t.children).forEach((_,v)=>{const j=(v+1)/Math.max(1,t.children.length),L=M((u-f)/p.width*j*12,-18,18),R=M((y-h)/p.height*j*8,-14,14),q=M(-j*8,-30,0),oe=M((u-f)/p.width*j*-6,-12,12),re=M((y-h)/p.height*j*4,-8,8),o={tx:L,ty:R,tz:q,rotX:re,rotY:oe,smoothing:l};t._parallaxTargets.set(_,o)}),this._startScheduler()},r=()=>{Array.from(t.children).forEach(s=>{t._parallaxTargets.set(s,{tx:0,ty:0,tz:0,rotX:0,rotY:0,smoothing:.16})}),this._startScheduler()};t._parallaxHandler=i,t._parallaxReset=r,t.addEventListener("mousemove",i),t.addEventListener("touchmove",i,{passive:!0}),t.addEventListener("mouseleave",r),t.addEventListener("touchend",r)}return this._roots.set(e,t),t},_warn(e){this._defaults.dev&&typeof console!="undefined"&&console.warn("[JuiceToast]",e)},_ensureFA(){if(!(!P||this._faInjected||!this._defaults.autoFetchFA)){if(document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]')){this._faInjected=!0;return}try{const e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",e.crossOrigin="anonymous",document.head.appendChild(e),this._faInjected=!0}catch(e){console.error("[JuiceToast]: Fetching icons failed:",e)}}},_playSound(e){if(!P)return;const a=typeof e=="string"&&e?e:this._defaults.playSound;if(a)try{const t=new Audio(a);t.volume=.6,t.play().catch(()=>{})}catch(t){}},_updateStackPositionsFor(e){const a=Array.from(e.children);e.dataset.position&&e.dataset.position.includes("bottom"),a.forEach((t,l)=>{const i=l,r=i*12;t.style.setProperty("--jt-stack-y",`${-r}px`),t.style.setProperty("--jt-stack-scale",1-i*.04),t.style.setProperty("--jt-stack-opacity",1-i*.12),t.style.zIndex=1e3-i,t.style.setProperty("--jt-parallax-z",`${-i*2}px`),t.dataset.stack=String(i)})},_runPlugins(e){this._plugins.forEach(a=>{try{a(e)}catch(t){this._warn("Plugin error: "+((t==null?void 0:t.message)||t))}})},_normalizeGlass(e){if(e===!0)return 60;if(!e)return 0;const a=Number(e);return Number.isFinite(a)?M(a,0,100):0},_computeDedupeKey(e,a){try{const t=e||"",l=a.title||"",i=a.message||a.html||"";return`${t}::${String(l).trim().slice(0,200)}::${String(i).trim().slice(0,500)}`}catch(t){return}},_showToast(e,a={},t){var l,i,r,s,p,f,h,u,y,_,v,j,L,R,q;if(!P)return;this._defaults.injectCSS!==!1&&te(this._defaults.css||B),this._ensureFA();const oe=this._config[e]||{},re=typeof a=="object"?a:{message:String(a)},o=D(oe,re);o.icon=(l=o.icon)!=null?l:o.icon_left_top,o.position=(r=(i=o.position)!=null?i:o.toast)!=null?r:"bottom-right",o.closable=(p=(s=o.closable)!=null?s:o.closeable)!=null?p:!0,o.duration=typeof o.duration=="number"?o.duration:this._defaults.duration;const G=N[o.theme||this._theme]||{},k=t||ae(),H=o.dedupeKey||(this._defaults.autoDedupe?this._computeDedupeKey(e,o):void 0);if(H)for(const c of this._roots.values()){const d=Array.from(c.children).find(b=>b.dataset.dedupeKey===H);if(d){let b=d._cachedCountEl;if(b||(b=document.createElement("span"),b.className="jt-count",b.style.marginLeft="6px",(f=d.querySelector(".jt-title"))==null||f.appendChild(b),d._cachedCountEl=b,b.textContent="1"),b.textContent=String(parseInt(b.textContent||"1")+1),o.mergeMessage){const E=d.querySelector(".jt-message");E&&(o.html?E.innerHTML=J(o.html):E.textContent=String(o.message||""))}return d.dataset.toastId}}const n=document.createElement("div");if(n.className="juice-toast",n.dataset.toastId=k,n.dataset.position=o.position,n.dataset.toastType=e,H&&(n.dataset.dedupeKey=H),n.tabIndex=0,n.setAttribute("role",o.ariaRole||(e==="error"?"alert":"status")),n.getAttribute("aria-live")||(n.setAttribute("aria-live",e==="error"||e==="success"?"assertive":"polite"),n.setAttribute("aria-atomic","true")),n.style.position="relative",n.style.pointerEvents="auto",o.glassOnly?(n.style.background="rgba(255,255,255,0.35)",n.style.backdropFilter="blur(14px) saturate(140%)",n.style.webkitBackdropFilter="blur(14px) saturate(140%)",n.style.color="rgba(15,23,42,0.85)",n.style.border="1px solid rgba(0,0,0,0.08)",n.style.boxShadow="0 8px 28px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.25)"):(n.style.background=o.bg||G.bg,n.style.color=o.color||G.color,n.style.border=o.border||G.border||"none"),n.style.minHeight=n.style.minHeight||"",n.style.setProperty("--jt-parallax-x","0px"),n.style.setProperty("--jt-parallax-y","0px"),n.style.setProperty("--jt-parallax-z","0px"),n.style.setProperty("--jt-drag-x","0px"),n.style.setProperty("--jt-drag-y","0px"),n.style.setProperty("--jt-rot-x","0deg"),n.style.setProperty("--jt-rot-y","0deg"),n.style.setProperty("--jt-stack-y","0px"),n.style.setProperty("--jt-stack-scale","1"),o.size&&fe[o.size]){const c=fe[o.size];c.width&&(n.style.width=c.width),c.padding&&(n.style.padding=c.padding)}const S=document.createElement("div");S.className="jt-content";let V=null;o.title&&(V=document.createElement("div"),V.className="jt-title",V.textContent=o.title,S.appendChild(V));const I=document.createElement("div");if(I.className="jt-message",o.html?I.innerHTML=J(o.html):typeof o.message=="string"?o.message.split(/(`[^`]+`)/g).forEach(c=>{if(c.startsWith("`")&&c.endsWith("`")){const d=document.createElement("code");d.textContent=c.slice(1,-1),I.appendChild(d)}else I.appendChild(document.createTextNode(c))}):o.message&&(I.textContent=String(o.message)),S.appendChild(I),Array.isArray(o.actions)&&o.actions.length){const c=document.createElement("div");c.className="jt-actions",o.actions.forEach(d=>{const b=document.createElement("button");b.className="jt-action",b.textContent=d.label||"Action",b.onclick=E=>{var X;E.stopPropagation(),(X=d.onClick)==null||X.call(d,E),d.closeOnClick!==!1&&this.remove(k)},c.appendChild(b)}),S.appendChild(c)}o.glassOnly||(o.bgImage?(n.style.backgroundImage=`url(${o.bgImage})`,n.style.backgroundSize=o.bgSize||"cover",n.style.backgroundPosition=o.bgPosition||"center"):n.style.background=o.bg||G.bg);let x=null;if(o.icon){x=document.createElement("i");const c=String(o.icon).startsWith("fa")?o.icon:`fa-${o.icon}`;if(x.className=["icon",o.iconPack||"",c].join(" ").trim(),o.iconSize&&(x.style.fontSize=o.iconSize),!F){const d=o.iconAnim||Ee[e];d&&x.classList.add(d)}(o.iconLink||o.iconAnimate)&&(x.classList.add("icon-clickable"),x.addEventListener("click",d=>{d.stopPropagation(),o.iconAnimate&&(x.classList.remove(o.iconAnimate),x.offsetWidth,x.classList.add(o.iconAnimate)),o.iconLink&&window.open(o.iconLink,"_blank","noopener")}))}let g=null;if(o.avatar){g=document.createElement("img");const c=typeof o.avatar=="string"&&o.avatar?o.avatar:o.avatarSrc||"";c&&(g.src=c),g.alt=o.avatarAlt||o.title||"avatar",g.className="jt-avatar",g.loading=o.avatarLazy?"lazy":"eager",g.style.width=g.style.width||"36px",g.style.height=g.style.height||"36px",g.style.borderRadius=g.style.borderRadius||"50%",g.style.objectFit=g.style.objectFit||"cover",g.style.flexShrink="0";const d=o.avatarPosition||"left";d==="left"?g.style.marginRight=(h=o.avatarSpacing)!=null?h:"10px":d==="right"?g.style.marginLeft=(u=o.avatarSpacing)!=null?u:"10px":d==="top"&&(g.style.marginBottom=(y=o.avatarSpacing)!=null?y:"8px")}const se=o.avatarPosition||"left";g&&se==="top"?(n.classList.add("jt-avatar-top"),n.style.flexDirection="column",n.style.alignItems="flex-start",n.appendChild(g),x&&o.iconPosition==="top"?(n.appendChild(x),n.appendChild(S)):x&&o.iconPosition==="right"?(n.appendChild(S),n.appendChild(x)):(x&&n.appendChild(x),n.appendChild(S))):(n.style.flexDirection="row",n.style.alignItems="center",g&&se==="left"&&n.appendChild(g),x&&o.iconPosition==="right"?(n.appendChild(S),n.appendChild(x)):x&&o.iconPosition==="top"?(n.classList.add("jt-icon-top"),n.appendChild(x),n.appendChild(S)):(x&&n.appendChild(x),n.appendChild(S)),g&&se==="right"&&n.appendChild(g));let W=null;if(o.progress&&((_=o.duration)!=null?_:this._defaults.duration)>0&&(W=document.createElement("div"),W.className="jt-progress",o.progressColor&&(W.style.background=o.progressColor),n.appendChild(W)),o.undo){const c=document.createElement("button");c.className="jt-action",c.textContent="Undo",c.onclick=()=>{try{o.undo()}catch(d){}this.remove(k)},S.appendChild(c)}if(o.closable){const c=document.createElement("span");c.className="juice-toast-close",c.tabIndex=0,c.textContent="\xD7",c.style.marginLeft="8px",c.addEventListener("click",d=>{d.stopPropagation(),this.remove(k)}),n.appendChild(c)}const C=this._getRoot(o.position||"bottom-right");if(!C)return;if(o.groupId){const c=Array.from(C.children).find(d=>d.dataset.groupId===o.groupId);if(c){const d=c.dataset.toastId;return this.update(d,{title:o.title,message:o.message,html:o.html,bg:o.bg,color:o.color,duration:o.duration,icon:o.icon,iconPack:o.iconPack}),d}n.dataset.groupId=o.groupId}const ge=this._defaults.maxVisible;if(ge&&C.children.length>=ge){const c=C.firstElementChild;if(c&&c.dataset&&c.dataset.toastId)this.remove(c.dataset.toastId);else try{C.removeChild(C.firstElementChild)}catch(d){}}C.appendChild(n),n._cachedTitleEl=V,n._cachedMessageEl=I,n._cachedProgressEl=W;const m={id:k,toast:n,cfg:o,type:e,createdAt:w(),remaining:(v=o.duration)!=null?v:this._defaults.duration,timer:null,start:w(),paused:!1,_boundMove:null,_boundUp:null,_onPointerDown:null,_onEnter:null,_onLeave:null,dedupeKey:H,hooks:{onShow:o.onShow,onShown:o.onShown,onClose:o.onClose,onRemoved:o.onRemoved}};this._activeMap.set(k,m);try{(L=(j=m.hooks).onShow)==null||L.call(j,{id:k,toast:n,cfg:o,type:e})}catch(c){}this._runPlugins({toast:n,cfg:o,type:e,root:C,meta:m}),this._updateStackPositionsFor(C),requestAnimationFrame(()=>{var c,d;F?(n.style.opacity="1",(d=(c=m.hooks).onShown)==null||d.call(c,{id:k,toast:n,cfg:o,type:e})):(n.classList.add("show"),setTimeout(()=>{var b,E;try{(E=(b=m.hooks).onShown)==null||E.call(b,{id:k,toast:n,cfg:o,type:e})}catch(X){}},320))});let _e=0,be=0,A=0,z=0,ne=!1,O=null,ie=0;const le=c=>{const d=c.touches?c.touches[0]:c;_e=d.clientX,be=d.clientY,A=0,z=0,ne=!0,O=null,m.paused=!0,n.style.transition="none",m._boundMove=we,m._boundUp=Se,document.addEventListener("touchmove",m._boundMove,{passive:!0}),document.addEventListener("mousemove",m._boundMove),document.addEventListener("touchend",m._boundUp),document.addEventListener("mouseup",m._boundUp),ie=w()},we=c=>{if(!ne)return;const d=c.touches?c.touches[0]:c;A=d.clientX-_e,z=d.clientY-be,O||(Math.abs(A)>6?O="x":Math.abs(z)>6&&(O="y")),O==="x"?n.style.setProperty("--jt-drag-x",`${A}px`):O==="y"&&n.style.setProperty("--jt-drag-y",`${z}px`),ie=w(),d.clientX},Se=c=>{ne=!1,m.paused=!1;const d=Math.abs(A),b=Math.abs(z),E=O||(d>b?"x":"y"),X=Math.max(1,w()-ie),Pe=X?A/X*1e3:0,Le=E==="x"&&(d>($._defaults.swipeThreshold||60)||Math.abs(Pe)>800),Ce=E==="y"&&b>($._defaults.swipeThreshold||80);if(Le||Ce){const Ae=A>=0?1:-1;E==="x"?n.style.setProperty("--jt-drag-x",`${Ae*1e3}px`):n.style.setProperty("--jt-drag-y","1000px"),n.classList.add("swipe-dismissing"),setTimeout(()=>this.remove(k),220)}else n.style.transition="transform 0.22s ease-out, opacity 0.22s ease-out",n.style.setProperty("--jt-drag-x","0px"),n.style.setProperty("--jt-drag-y","0px");A=z=0,m._boundMove&&(document.removeEventListener("touchmove",m._boundMove),document.removeEventListener("mousemove",m._boundMove),m._boundMove=null),m._boundUp&&(document.removeEventListener("touchend",m._boundUp),document.removeEventListener("mouseup",m._boundUp),m._boundUp=null),m.start=w(),this._startScheduler()};n._onPointerDown=le,n.addEventListener("touchstart",le,{passive:!0}),n.addEventListener("mousedown",le);const ce=()=>{m.paused=!0},de=()=>{m.paused&&(m.paused=!1,m.start=w(),this._startScheduler())};return m._onEnter=ce,m._onLeave=de,n.addEventListener("mouseenter",ce),n.addEventListener("mouseleave",de),n.addEventListener("focusin",ce),n.addEventListener("focusout",de),m.start=w(),m.remaining=(R=o.duration)!=null?R:this._defaults.duration,m.paused=!1,((q=o.duration)!=null?q:this._defaults.duration)>0&&this._startScheduler(),o.undoTimeout&&(m.timer=setTimeout(()=>this.remove(k),o.undoTimeout)),(o.playSound||this._defaults.playSound)&&this._playSound(o.playSound||this._defaults.playSound),k},_startScheduler(){if(this._schedulerRunning)return;this._schedulerRunning=!0;const e=a=>{const t=w();this._schedulerLast=t,this._pausedAll||this._activeMap.forEach((r,s)=>{var p;if(!r||r.paused)return;const f=(p=r.cfg.duration)!=null?p:this._defaults.duration;if(f<=0)return;const h=t-r.start,u=Math.max(0,Math.min(h,1e3));r.remaining-=u,r.start=t;const y=r.toast._cachedProgressEl||r.toast.querySelector(".jt-progress");if(y){const _=Math.max(0,r.remaining/f);y.style.transform=`scaleX(${_})`}r.remaining<=0&&(F||r.toast.classList.remove("show"),setTimeout(()=>this.remove(s),280))}),this._roots.forEach(r=>{!r._parallaxTargets||!r.children.length||Array.from(r.children).forEach(s=>{var p,f,h;const u=r._parallaxTargets.get(s)||{tx:0,ty:0,tz:0,rotX:0,rotY:0,smoothing:(p=this._defaults.parallaxSmoothing)!=null?p:.12};s._jtPrev=s._jtPrev||{tx:0,ty:0,tz:0,rotX:0,rotY:0};const y=s._jtPrev,_=(h=u.smoothing)!=null?h:(f=this._defaults.parallaxSmoothing)!=null?f:.12,v=U(y.tx,u.tx||0,_),j=U(y.ty,u.ty||0,_),L=U(y.tz,u.tz||0,_),R=U(y.rotX,u.rotX||0,_),q=U(y.rotY,u.rotY||0,_);s.style.setProperty("--jt-parallax-x",`${v}px`),s.style.setProperty("--jt-parallax-y",`${j}px`),s.style.setProperty("--jt-parallax-z",`${L}px`),s.style.setProperty("--jt-rot-x",`${R}deg`),s.style.setProperty("--jt-rot-y",`${q}deg`),s._jtPrev.tx=v,s._jtPrev.ty=j,s._jtPrev.tz=L,s._jtPrev.rotX=R,s._jtPrev.rotY=q})});let l=!1;this._activeMap.forEach(r=>{var s;((s=r.cfg.duration)!=null?s:this._defaults.duration)>0&&!r.paused&&(l=!0)});let i=!1;this._roots.forEach(r=>{r._parallaxTargets&&r.children.length&&(i=!0)}),!l&&!i?this._stopScheduler():this._schedulerRAF=requestAnimationFrame(e)};this._schedulerRAF=requestAnimationFrame(e)},_stopScheduler(){this._schedulerRunning&&(this._schedulerRAF&&cancelAnimationFrame(this._schedulerRAF),this._schedulerRAF=null,this._schedulerRunning=!1,this._schedulerLast=0)},remove(e){var a,t,l,i;const r=this._activeMap.get(e);if(!r)return!1;const{toast:s,cfg:p,type:f}=r;try{(t=(a=r.hooks).onClose)==null||t.call(a,{id:e,toast:s,cfg:p,type:f})}catch(u){}F?s.style.opacity="0":s.classList.add("hide");try{s._onPointerDown&&(s.removeEventListener("touchstart",s._onPointerDown),s.removeEventListener("mousedown",s._onPointerDown))}catch(u){}if(r._boundMove){try{document.removeEventListener("touchmove",r._boundMove),document.removeEventListener("mousemove",r._boundMove)}catch(u){}r._boundMove=null}if(r._boundUp){try{document.removeEventListener("touchend",r._boundUp),document.removeEventListener("mouseup",r._boundUp)}catch(u){}r._boundUp=null}try{r._onEnter&&s.removeEventListener("mouseenter",r._onEnter),r._onLeave&&s.removeEventListener("mouseleave",r._onLeave),r._onEnter&&s.removeEventListener("focusin",r._onEnter),r._onLeave&&s.removeEventListener("focusout",r._onLeave)}catch(u){}r.timer&&(clearTimeout(r.timer),r.timer=null),this._activeMap.delete(e);const h=s.parentNode;if(h){const u=()=>{var y,_;try{s.parentNode&&s.parentNode.removeChild(s)}catch(v){}try{if(h.children.length===0){try{h._parallaxHandler&&(h.removeEventListener("mousemove",h._parallaxHandler),h.removeEventListener("touchmove",h._parallaxHandler)),h._parallaxReset&&(h.removeEventListener("mouseleave",h._parallaxReset),h.removeEventListener("touchend",h._parallaxReset)),h.remove()}catch(v){}this._roots.delete(h.dataset.position)}else this._updateStackPositionsFor(h)}catch(v){}if(r.dedupeKey)try{this._queueDedupe.delete(r.dedupeKey)}catch(v){}try{(_=(y=r.hooks).onRemoved)==null||_.call(y,{id:e,cfg:p,type:f})}catch(v){}};if(F)u();else{const y=_=>{_.target===s&&(s.removeEventListener("animationend",y),u())};s.addEventListener("animationend",y),setTimeout(u,700)}}else{if(r.dedupeKey)try{this._queueDedupe.delete(r.dedupeKey)}catch(u){}try{(i=(l=r.hooks).onRemoved)==null||i.call(l,{id:e,cfg:p,type:f})}catch(u){}}return!0},update(e,a={}){const t=this._activeMap.get(e);if(!t)return this._warn("update: id not found "+e),!1;const{toast:l}=t;if(t.cfg=D(t.cfg,a),t.cfg.title){const s=l.querySelector(".jt-title")||l._cachedTitleEl;s&&(s.textContent=t.cfg.title)}const i=l.querySelector(".jt-message")||l._cachedMessageEl;i&&(t.cfg.html?i.innerHTML=J(t.cfg.html):i.textContent=String(t.cfg.message||""));const r=N[t.cfg.theme||this._theme]||{};if(l.style.background=t.cfg.bg||r.bg,l.style.color=t.cfg.color||r.color,l.style.border=t.cfg.border||r.border||"none",t.cfg.duration!==void 0){t.remaining=t.cfg.duration,t.start=w(),t.paused||this._startScheduler();const s=t.toast._cachedProgressEl||t.toast.querySelector(".jt-progress");s&&(s.style.transform="scaleX(1)")}return this._runPlugins({toast:l,cfg:t.cfg,type:t.type,meta:t}),!0},_priorityMap:{low:1,normal:2,high:3,urgent:4},pauseAll(){this._pausedAll=!0},resumeAll(){this._pausedAll=!1,this._activeMap.forEach(e=>e.start=w()),this._startScheduler()},dismissAll(e={}){const a=e.type,t=e.position,l=[];this._activeMap.forEach((i,r)=>{const s=a?i.type===a:!0,p=t?(i.cfg.position||i.toast.dataset.position)===t:!0;s&&p&&l.push(r)}),l.forEach(i=>this.remove(i))},listActive(){const e=[];return this._activeMap.forEach((a,t)=>{e.push({id:t,type:a.type,remaining:a.remaining,createdAt:a.createdAt,position:a.cfg.position})}),e}};function ke(e,a){return e?typeof e=="string"?{message:e}:e:{message:a}}function ye(e,a,t){return e?typeof e=="function"?{message:e(a)}:typeof e=="string"?{message:e}:e:{message:t}}$.setup({success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",progress:!0,duration:4e3},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",progress:!0,duration:4e3},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",progress:!0,duration:4e3},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",progress:!0,duration:4e3},loading:{icon:"fa-spinner",iconPack:"fas",iconAnim:"jt-spin",duration:0,progress:!0}}),T.default=$,T.juiceToast=$,Object.defineProperty(T,"__esModule",{value:!0})}));
//# sourceMappingURL=juice-toast.umd.js.map
