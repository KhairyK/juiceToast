/*!
 * JuiceToast v2.0.0 (Pack 0)
 * 2026 (C) OpenDN Foundation
 * See CONTRIBUTING.md to contribute
 */const re=typeof window!="undefined"&&typeof document!="undefined",H=()=>Date.now();function ie(i="jt"){return`${i}-${H().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function me(i,t,a){return Math.max(t,Math.min(a,i))}function Le(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function J(i={},t={}){const a={...i};for(const[d,l]of Object.entries(t||{}))Le(l)&&Le(a[d])?a[d]=J(a[d],l):Array.isArray(l)?a[d]=l.slice():a[d]=l;return a}function Be(){const i=new Map;return{on(t,a){return i.has(t)||i.set(t,new Set),i.get(t).add(a),()=>this.off(t,a)},off(t,a){var d;(d=i.get(t))==null||d.delete(a)},emit(t,a){var d;(d=i.get(t))==null||d.forEach(l=>{try{l(a)}catch(h){}})},clear(){i.clear()}}}class Fe{constructor(){this._heap=[],this._seq=0}get size(){return this._heap.length}_parent(t){return Math.floor((t-1)/2)}_left(t){return 2*t+1}_right(t){return 2*t+2}_swap(t,a){[this._heap[t],this._heap[a]]=[this._heap[a],this._heap[t]]}_compare(t,a){const d=this._heap[t],l=this._heap[a];return d.priority!==l.priority?d.priority-l.priority:l.seq-d.seq}push(t,a=0){const d={item:t,priority:a,seq:++this._seq};this._heap.push(d),this._siftUp(this._heap.length-1)}pop(){if(!this._heap.length)return null;this._swap(0,this._heap.length-1);const t=this._heap.pop();return this._siftDown(0),t.item}peek(){var t,a;return(a=(t=this._heap[0])==null?void 0:t.item)!=null?a:null}clear(){this._heap.length=0}_siftUp(t){for(;t>0;){const a=this._parent(t);if(this._compare(t,a)<=0)break;this._swap(t,a),t=a}}_siftDown(t){for(;;){const a=this._left(t),d=this._right(t);let l=t;if(a<this._heap.length&&this._compare(a,l)>0&&(l=a),d<this._heap.length&&this._compare(d,l)>0&&(l=d),l===t)break;this._swap(t,l),t=l}}}function He(i){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const Xe=new Set(["b","i","u","strong","em","code","pre","ul","ol","li","br","p","span","img","a","small","sub","sup","blockquote","kbd","mark"]),Re=new Set(["href","src","alt","title","aria-label","role","target","rel","class","id","loading","decoding","width","height"]),Ve=/^(https?:\/\/|mailto:|tel:|\/\/)/i;function Ie(i,t={}){if(!re)return He(i);const{allowedTags:a=Xe,allowedAttrs:d=Re,allowDataImages:l=!1}=t,h=document.createElement("template");h.innerHTML=String(i!=null?i:""),h.content.querySelectorAll("script, style, iframe, object, embed, link, meta").forEach(g=>g.remove());const v=g=>{Array.from(g.children||[]).forEach(m=>{const x=m.tagName.toLowerCase();if(!a.has(x)){m.replaceWith(...Array.from(m.childNodes));return}Array.from(m.attributes||[]).forEach(z=>{const k=z.name.toLowerCase(),$=String(z.value||"").trim();if(k.startsWith("on")){m.removeAttribute(z.name);return}if(!d.has(k)&&!k.startsWith("data-")&&!k.startsWith("aria-")){m.removeAttribute(z.name);return}(k==="href"||k==="src"||k==="xlink:href")&&(Ve.test($)||l&&/^data:image\/(png|jpeg|jpg|gif|webp);/i.test($)||m.removeAttribute(z.name),/^data:\s*image\/svg\+xml/i.test($)&&m.removeAttribute(z.name)),k==="style"&&m.removeAttribute(z.name),x==="img"&&k==="srcset"&&m.removeAttribute(z.name)}),v(m)})};return v(h.content),h.innerHTML}function Ge(i={}){const t={engine:"auto",dompurify:null,allowDataImages:!1,...i};function a(l={}){return l.dompurify||t.dompurify||(re?window.DOMPurify:null)||null}function d(l,h={}){if(h===!1)return String(l!=null?l:"");const v={...t,...h||{}},g=v.engine||"auto";if(g==="dompurify"||g==="auto"){const m=a(v);if(m!=null&&m.sanitize)return m.sanitize(String(l!=null?l:""),v.dompurifyOptions||{});if(g==="dompurify")return Ie(String(l!=null?l:""),v)}return Ie(String(l!=null?l:""),v)}return{sanitize:d,setConfig(l={}){Object.assign(t,l||{})},getConfig(){return{...t}}}}function Qe(i,t={}){const a={threshold:72,velocityThreshold:850,rubberBand:.22,springDuration:240,flingDuration:190,onDismiss:null,onStart:null,onMove:null,onEnd:null,...t};let d=!1,l=null,h=0,v=0,g=0,m=0,x=null,z=0,k=0,$=0,Q=0,W=0,N=[];const oe=(S,_,L=0,K=1)=>{i.style.setProperty("--jt-drag-x",`${S}px`),i.style.setProperty("--jt-drag-y",`${_}px`),i.style.setProperty("--jt-tilt",`${L}deg`),i.style.setProperty("--jt-scale",`${K}`)},f=()=>{i.style.transition=`transform ${a.springDuration}ms cubic-bezier(.2,.9,.2,1), opacity ${a.springDuration}ms ease`,oe(0,0,0,1)},T=(S,_)=>{i.style.transition=`transform ${a.flingDuration}ms cubic-bezier(.16,1,.3,1), opacity ${a.flingDuration}ms ease`,S==="x"?oe(_*1200,m*.08,_*8,.98):oe(g*.08,1200*_,g*.03,.98),i.style.opacity="0",setTimeout(()=>{var L;return(L=a.onDismiss)==null?void 0:L.call(a)},a.flingDuration)},xe=()=>{var S;const _=Math.abs(g),L=Math.abs(m);x||(_>8||L>8)&&(x=_>L?"x":"y");const K=a.axis||x||(_>L?"x":"y");let X=g,Y=m;if(K==="x"){const P=Math.max(0,_-a.threshold)*a.rubberBand;X=Math.sign(g)*(Math.min(_,a.threshold)+P),Y=m*.08}else{const P=Math.max(0,L-a.threshold)*a.rubberBand;Y=Math.sign(m)*(Math.min(L,a.threshold)+P),X=g*.08}const R=me(X*.03,-10,10),O=me(1-Math.min(.06,(Math.abs(X)+Math.abs(Y))/2e3),.94,1);oe(X,Y,R,O),(S=a.onMove)==null||S.call(a,{x:X,y:Y,axis:K,vx:Q,vy:W})},se=S=>{var _,L;if(S.button!==void 0&&S.button!==0)return;if(d=!0,l=(_=S.pointerId)!=null?_:null,h=S.clientX,v=S.clientY,g=0,m=0,x=null,Q=0,W=0,z=h,k=v,$=H(),i.style.willChange="transform, opacity",i.style.transition="none",i.setPointerCapture&&l!==null)try{i.setPointerCapture(l)}catch(I){}(L=a.onStart)==null||L.call(a);const K=I=>{if(!d||l!==null&&I.pointerId!==l)return;const U=H(),Z=Math.max(1,U-$),q=I.clientX,ee=I.clientY;g=q-h,m=ee-v,Q=(q-z)/Z*1e3,W=(ee-k)/Z*1e3,z=q,k=ee,$=U,xe()},X=()=>{var I;if(!d)return;d=!1;const U=Math.abs(g),Z=Math.abs(m),q=a.axis||x||(U>Z?"x":"y"),ee=Math.abs(q==="x"?Q:W),he=q==="x"?U:Z,ye=Math.sign(q==="x"?g||1:m||1),le=he>=a.threshold||ee>=a.velocityThreshold;le?T(q,ye||1):f(),Y(),(I=a.onEnd)==null||I.call(a,{axis:q,shouldDismiss:le,distance:he,velocity:ee,dx:g,dy:m})},Y=()=>{N.forEach(I=>I()),N=[]},R=I=>K(I),O=()=>X(),P={passive:!0};i.addEventListener("pointermove",R,P),i.addEventListener("pointerup",O,P),i.addEventListener("pointercancel",O,P),i.addEventListener("lostpointercapture",O,P),N.push(()=>i.removeEventListener("pointermove",R,P)),N.push(()=>i.removeEventListener("pointerup",O,P)),N.push(()=>i.removeEventListener("pointercancel",O,P)),N.push(()=>i.removeEventListener("lostpointercapture",O,P))};return i.addEventListener("pointerdown",se),()=>{i.removeEventListener("pointerdown",se),N.forEach(S=>S()),N=[]}}function We(){const i=new Map;function t(a,d="merge"){i.has(a)||i.set(a,{id:a,strategy:d,ids:[],count:0,meta:{}});const l=i.get(a);return d&&(l.strategy=d),l}return{register(a,d,l="merge",h={}){if(!a)return null;const v=t(a,l);return v.ids.includes(d)||(v.ids.push(d),v.count+=1),v.meta={...v.meta,...h},v},unregister(a,d){const l=i.get(a);l&&(l.ids=l.ids.filter(h=>h!==d),l.ids.length===0&&i.delete(a))},get(a){return i.get(a)||null},list(){return Array.from(i.values()).map(a=>({id:a.id,strategy:a.strategy,ids:a.ids.slice(),count:a.count,meta:{...a.meta}}))},clear(a){if(a){i.delete(a);return}i.clear()},has(a){return i.has(a)},size(){return i.size}}}function Ye(i){if(!re)return{open(){},close(){},toggle(){},refresh(){},snapshot(){return{}},isOpen(){return!1}};let t=null,a=!1,d=null;const l=()=>i.getSnapshot(),h=()=>{if(!t)return;const x=l();t.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px">
        <strong style="font-size:13px">JuiceToast DevTools</strong>
        <button data-jt-close style="border:none;background:transparent;color:inherit;cursor:pointer;font-size:18px;line-height:1">\xD7</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;margin-bottom:10px">
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Active<br><strong>${x.activeCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Queued<br><strong>${x.queueCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Groups<br><strong>${x.groupCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Paused<br><strong>${x.pausedAll?"Yes":"No"}</strong></div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <button data-jt-pause style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Pause</button>
        <button data-jt-resume style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Resume</button>
        <button data-jt-clear style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Clear</button>
        <button data-jt-copy style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Snapshot</button>
      </div>

      <div style="font-size:12px;opacity:.85;margin-bottom:8px">Active toasts</div>
      <div data-jt-list style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow:auto"></div>
    `;const z=t.querySelector("[data-jt-list]");x.active.length===0?z.innerHTML='<div style="opacity:.6;font-size:12px">No active toasts</div>':z.innerHTML=x.active.map(k=>`
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:rgba(255,255,255,.04)">
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
            <div>
              <div style="font-size:12px;font-weight:700">${k.type}</div>
              <div style="font-size:11px;opacity:.7">${k.id}</div>
            </div>
            <button data-kill="${k.id}" style="padding:6px 8px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:transparent;color:inherit;cursor:pointer">Dismiss</button>
          </div>
          <div style="font-size:11px;opacity:.75;margin-top:6px">pos: ${k.position} \u2022 remaining: ${Math.max(0,Math.round(k.remaining||0))}ms</div>
        </div>`).join(""),t.querySelector("[data-jt-close]").onclick=()=>m(),t.querySelector("[data-jt-pause]").onclick=()=>i.pauseAll(),t.querySelector("[data-jt-resume]").onclick=()=>i.resumeAll(),t.querySelector("[data-jt-clear]").onclick=()=>i.dismissAll(),t.querySelector("[data-jt-copy]").onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(x,null,2))}catch(k){}},t.querySelectorAll("[data-kill]").forEach(k=>{k.onclick=()=>i.remove(k.getAttribute("data-kill"))})},v=()=>t||(t=document.createElement("div"),t.setAttribute("data-juice-devtools",ie("jt-dev")),t.style.position="fixed",t.style.right="16px",t.style.bottom="16px",t.style.width="320px",t.style.maxWidth="calc(100vw - 32px)",t.style.maxHeight="70vh",t.style.overflow="hidden",t.style.zIndex="2147483647",t.style.padding="14px",t.style.borderRadius="16px",t.style.background="rgba(15, 23, 42, .92)",t.style.color="#fff",t.style.backdropFilter="blur(14px) saturate(120%)",t.style.boxShadow="0 16px 60px rgba(0,0,0,.35)",t.style.fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",t.style.border="1px solid rgba(255,255,255,.08)",document.body.appendChild(t),t.addEventListener("click",x=>{x.target===t&&m()}),t),g=()=>{var x;a||(a=!0,v(),h(),d=setInterval(h,350),(x=i.emit)==null||x.call(i,"devtools:open",{}))},m=()=>{var x;a&&(a=!1,d&&clearInterval(d),d=null,t==null||t.remove(),t=null,(x=i.emit)==null||x.call(i,"devtools:close",{}))};return{open:g,close:m,toggle:()=>{a?m():g()},refresh:()=>{a&&h()},isOpen:()=>a,snapshot:()=>l()}}const Ue={dark:{bg:"linear-gradient(180deg,#1f2937,#111827)",color:"#fff",border:"1px solid rgba(255,255,255,.08)"},light:{bg:"#fff",color:"#111827",border:"1px solid #e5e7eb"},glass:{bg:"rgba(17,24,39,.45)",color:"#fff",border:"1px solid rgba(255,255,255,.10)"}},Je={success:"jt-bounce",error:"jt-shake",warning:"jt-shake",info:"jt-pulse",loading:"jt-spin"},qe={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},Ke={success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",duration:4e3,progress:!0},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",duration:4e3,progress:!0},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",duration:4e3,progress:!0},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",duration:4e3,progress:!0},loading:{icon:"fa-spinner",iconPack:"fas",iconAnim:"jt-spin",duration:0,progress:!0}},Ae=`
:root{
  --jt-radius: 12px;
  --jt-gap: 10px;
  --jt-shadow: 0 12px 32px rgba(0,0,0,.22);
}
[data-juice-root]{
  position: fixed;
  z-index: 9999;
  display: flex;
  gap: var(--jt-gap);
  pointer-events: none;
}
[data-juice-root][data-position="bottom-right"]{ bottom: 20px; right: 20px; flex-direction: column-reverse; align-items: flex-end; }
[data-juice-root][data-position="top-right"]{ top: 20px; right: 20px; flex-direction: column; align-items: flex-end; }
[data-juice-root][data-position="bottom-left"]{ bottom: 20px; left: 20px; flex-direction: column-reverse; align-items: flex-start; }
[data-juice-root][data-position="top-left"]{ top: 20px; left: 20px; flex-direction: column; align-items: flex-start; }
[data-juice-root][data-position="top-center"]{ top: 20px; left: 50%; transform: translateX(-50%); }
[data-juice-root][data-position="bottom-center"]{ bottom: 20px; left: 50%; transform: translateX(-50%); }

.juice-toast{
  position: relative;
  pointer-events: auto;
  min-width: 220px;
  max-width: 420px;
  border-radius: var(--jt-radius);
  padding: 12px 16px;
  background: linear-gradient(180deg, rgba(31,41,55,.96), rgba(17,24,39,.96));
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: var(--jt-shadow);
  transform:
    translate3d(var(--jt-drag-x,0), var(--jt-drag-y,0), 0)
    scale(var(--jt-scale,1));
  transition:
    transform .24s cubic-bezier(.2,.8,.2,1),
    opacity .22s ease;
  will-change: transform, opacity;
  user-select: none;
  touch-action: pan-y;
}
.juice-toast.show{ animation: jt-in .32s cubic-bezier(.16,1,.3,1) both; }
.juice-toast.hide{ animation: jt-out .24s cubic-bezier(.2,.8,.2,1) both; pointer-events:none; }
@keyframes jt-in{ from{opacity:0; transform: translate3d(0,12px,0) scale(.97);} to{opacity:1; transform: translate3d(0,0,0) scale(1);} }
@keyframes jt-out{ from{opacity:1; transform: translate3d(0,0,0) scale(1);} to{opacity:0; transform: translate3d(0,12px,0) scale(.97);} }

.juice-toast .icon{
  width: 30px;
  height: 30px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 8px;
  background: rgba(255,255,255,.08);
  flex-shrink: 0;
}
.jt-content{ flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.jt-title{ font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.jt-message{ font-size:13px; opacity:.95; word-break:break-word; }
.jt-actions{ display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
.jt-action{
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}
.jt-progress{
  position:absolute;
  left:0;
  bottom:0;
  height:4px;
  width:100%;
  border-radius: 999px;
  transform-origin:left;
  transform: scaleX(1);
  transition: transform linear;
}
.juice-toast-close{
  margin-left: 6px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  opacity: .8;
}
.juice-toast-close:hover{ opacity:1; }

.jt-count{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(255,255,255,.16);
  vertical-align: middle;
}

.jt-avatar{
  width:36px;
  height:36px;
  border-radius:50%;
  object-fit:cover;
  flex-shrink:0;
}
.jt-avatar-top{ flex-direction: column; align-items:flex-start; }

.jt-bounce{ animation: jt-bounce 1s ease-in-out infinite; }
.jt-shake{ animation: jt-shake .6s ease-in-out infinite; }
.jt-pulse{ animation: jt-pulse 1.1s ease-in-out infinite; }
.jt-spin{ animation: jt-spin 1.2s linear infinite; }
@keyframes jt-bounce{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-6px); } }
@keyframes jt-shake{ 0%,100%{ transform: translateX(0); } 25%{ transform: translateX(-5px); } 75%{ transform: translateX(5px); } }
@keyframes jt-pulse{ 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.03); } }
@keyframes jt-spin{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }

.juice-toast.swipe-dismissing{
  opacity: 0;
  transition: transform .18s ease-out, opacity .18s ease-out;
}

[data-juice-root][data-parallax="true"] .juice-toast{
  transition: transform .12s cubic-bezier(.2,.8,.2,1), opacity .2s ease;
}

[data-juice-root][data-glass="true"] .juice-toast{
  background: rgba(17,24,39,.52);
  backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255,255,255,.08);
}

@media (prefers-reduced-motion: reduce){
  .juice-toast, .jt-modal, .jt-modal-overlay{ animation:none !important; transition:none !important; }
}
`;function Pe(i={}){return J({duration:2500,maxVisible:3,maxVisiblePerType:{},swipeThreshold:72,devTools:!1,injectCSS:!0,css:null,autoDedupe:!1,parallaxMode:!1,parallaxSmoothing:.12,use3d:!1,autoFetchFA:!0,urgentSkipsQueue:!1,maxQueueRetries:8,theme:"dark",sanitizer:{engine:"auto",dompurify:null,dompurifyOptions:{},allowDataImages:!1},gestures:{enabled:!0,threshold:72,velocityThreshold:850,rubberBand:.22,springDuration:240,flingDuration:190},types:{}},i)}function $e(i={}){let t=Pe(i);const a=new Fe,d=new Map,l=new Map,h=[],v=Be(),g=We(),m=Ge(t.sanitizer||{}),x={...Ue},z=J(Ke,t.types||{});let k=!1,$=null,Q=!1,W=!1,N=!1,oe=!1;const f={emit:v.emit.bind(v),on:v.on.bind(v),off:v.off.bind(v),getSnapshot(){return{activeCount:d.size,queueCount:a.size,groupCount:g.size(),pausedAll:W,active:Array.from(d.values()).map(e=>({id:e.id,type:e.type,position:e.cfg.position,remaining:e.remaining,groupId:e.cfg.groupId||null})),groups:g.list(),config:{duration:t.duration,maxVisible:t.maxVisible,theme:t.theme,devTools:t.devTools,parallaxMode:t.parallaxMode}}},setup(e={}){return t=Pe(J(t,e)),m.setConfig(t.sanitizer||{}),e.types&&(Object.assign(z,e.types),Object.keys(e.types).forEach(o=>{f[o]||le(o)})),e.theme&&this.setTheme(e.theme),t.injectCSS!==!1&&se(t.css||Ae),h.forEach(o=>{var u;return(u=o.onSetup)==null?void 0:u.call(o,this,t)}),this.emit("setup",{config:t}),t.devTools&&!T.isOpen()&&T.open(),this},defineTheme(e,o={}){return x[e]=J(x[e]||{},o),this},setTheme(e){return t.theme=e,l.forEach(o=>{o.dataset.theme=e}),T.refresh(),this},addType(e,o={}){return z[e]=J(z[e]||{},o),this},use(e){var o;const u=xe(e);return u?(h.push(u),(o=u.onInstall)==null||o.call(u,this),this):this},unuse(e){const o=h.findIndex(u=>u===e||u.name===e);return o>=0&&h.splice(o,1),this},pauseAll(){W=!0,T.refresh()},resumeAll(){W=!1,d.forEach(e=>e.start=H()),R(),T.refresh()},dismissAll(e={}){const o=[];d.forEach((u,n)=>{const s=e.type?u.type===e.type:!0,y=e.position?(u.cfg.position||"bottom-right")===e.position:!0,j=e.groupId?u.cfg.groupId===e.groupId:!0;s&&y&&j&&o.push(n)}),o.forEach(u=>this.remove(u))},listActive(){return Array.from(d.values()).map(e=>({id:e.id,type:e.type,position:e.cfg.position,remaining:e.remaining,groupId:e.cfg.groupId||null,createdAt:e.createdAt}))},clearQueue(){a.clear(),Q=!1,T.refresh()},destroy(){oe=!0,this.clearQueue(),this.dismissAll(),g.clear(),l.forEach(e=>e.remove()),l.clear(),d.clear(),O(),h.forEach(e=>{var o;return(o=e.onDestroy)==null?void 0:o.call(e,this)}),h.length=0,T.close(),v.clear()},promise(e,o={}){const u=typeof e=="function"?e():e;if(!u||typeof u.then!="function"){this.info({title:"JuiceToast",message:"promise() expects a Promise or a function returning Promise.",duration:3e3});return}const n=o.groupId||ie("promise");this.loading({groupId:n,duration:0,...q(o.loading,"Loading...")});let s=!1,y=null;typeof o.timeout=="number"&&o.timeout>0&&(y=setTimeout(()=>{s||(s=!0,this.error({groupId:n,...q(o.timeoutMessage,"Request timeout")}))},o.timeout));const j=()=>{s=!0,y&&clearTimeout(y)};return u.then(C=>{s||(j(),this.success({groupId:n,...q(o.success,"Success",C)}))}).catch(C=>{s||(j(),this.error({groupId:n,...q(o.error,"Error",C)}))}),{cancel:()=>{s||(j(),this.info({groupId:n,...q(o.cancelMessage,"Cancelled")}))}}},enqueueBatch(e=[],o={}){const u=Number(o.interval||0);!Array.isArray(e)||e.length===0||e.forEach((n,s)=>{const y=()=>{var j;const C=n.type||"info",A=n.payload||n;(j=this[C])==null||j.call(this,A)};u>0?setTimeout(y,s*u):y()})},group:{get:e=>g.get(e),list:()=>g.list(),clear:e=>g.clear(e),has:e=>g.has(e),size:()=>g.size()},devtools:null},T=Ye(f);f.devtools=T;function xe(e){return e?typeof e=="function"?{name:e.name||ie("plugin"),install:e}:typeof e=="object"?e:null:null}function se(e){if(!re||!t.injectCSS||document.getElementById("juice-toast-style"))return;const o=document.createElement("style");o.id="juice-toast-style",o.textContent=e||Ae,document.head.appendChild(o)}function S(e,o){v.emit(e,o),h.forEach(u=>{var n;try{(n=u[e])==null||n.call(u,o,f)}catch(s){}})}function _(e="bottom-right"){if(!re)return null;if(l.has(e))return l.get(e);const o=document.createElement("div");switch(o.dataset.juiceRoot="1",o.dataset.position=e,o.dataset.theme=t.theme,o.style.pointerEvents="none",o.style.display="flex",t.parallaxMode&&(o.dataset.parallax="true"),e){case"top-left":o.style.top="20px",o.style.left="20px",o.style.flexDirection="column";break;case"top-right":o.style.top="20px",o.style.right="20px",o.style.flexDirection="column";break;case"bottom-left":o.style.bottom="20px",o.style.left="20px",o.style.flexDirection="column-reverse";break;case"top-center":o.style.top="20px",o.style.left="50%",o.style.transform="translateX(-50%)",o.style.flexDirection="column";break;case"bottom-center":o.style.bottom="20px",o.style.left="50%",o.style.transform="translateX(-50%)",o.style.flexDirection="column-reverse";break;default:o.style.bottom="20px",o.style.right="20px",o.style.flexDirection="column-reverse";break}return document.body.appendChild(o),l.set(e,o),o}function L(){if(!re||N||t.autoFetchFA===!1)return;if(document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]')){N=!0;return}const e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",e.crossOrigin="anonymous",document.head.appendChild(e),N=!0}function K(e,o){const u=String((o==null?void 0:o.title)||"").trim().slice(0,120),n=String((o==null?void 0:o.message)||(o==null?void 0:o.html)||"").trim().slice(0,240);return`${e}::${u}::${n}`}function X(e,o={},u=null){var n,s,y,j,C,A,D,V,te,ce,ve,ze,Ce,Me,_e,Te,De;if(!re)return null;se(t.css||Ae),L();const Oe=z[e]||{},r=J(Oe,U(o));r.position=r.position||r.toast||"bottom-right",r.duration=typeof r.duration=="number"?r.duration:t.duration,r.closable=(s=(n=r.closable)!=null?n:r.closeable)!=null?s:!0,r.groupStrategy=r.groupStrategy||t.groupStrategy||"merge",r.groupId=r.groupId||((y=r.group)==null?void 0:y.id)||null,r.sanitize=(j=r.sanitize)!=null?j:!0,r.sanitizer=r.sanitizer||t.sanitizer||{},r.gestures=J(t.gestures,r.gestures||{}),r.theme=r.theme||t.theme;const E=u||ie("toast"),ue=r.dedupeKey||(t.autoDedupe?K(e,r):null);if(ue)for(const p of l.values()){const b=Array.from(p.children).find(M=>M.dataset.dedupeKey===ue);if(b){const M=b.querySelector(".jt-count")||Y(b);if(M.textContent=String((parseInt(M.textContent||"1",10)||1)+1),r.mergeMessage){const F=b.querySelector(".jt-message");F&&(r.html?F.innerHTML=sanitizeHTML(r.html,r.sanitizer):F.textContent=String(r.message||""))}return b.dataset.toastId}}const be=_(r.position);if(!be)return null;const de=r.groupId,je=r.groupStrategy;if(de){const p=g.get(de);if(p&&p.ids.length){if(je==="replace")p.ids.slice().forEach(b=>f.remove(b));else if(je==="merge"){const b=p.ids[p.ids.length-1];if(b&&d.has(b))return f.update(b,r),b}}}const c=document.createElement("div");c.className="juice-toast",c.dataset.toastId=E,c.dataset.toastType=e,c.dataset.position=r.position,ue&&(c.dataset.dedupeKey=ue),c.tabIndex=0,c.setAttribute("role",r.ariaRole||(e==="error"?"alert":"status")),c.setAttribute("aria-live",e==="error"||e==="success"?"assertive":"polite"),c.setAttribute("aria-atomic","true");const ke=x[r.theme]||x.dark;if(r.bgImage?(c.style.backgroundImage=`url(${r.bgImage})`,c.style.backgroundSize=r.bgSize||"cover",c.style.backgroundPosition=r.bgPosition||"center"):r.glassOnly?(c.style.background="rgba(255,255,255,.28)",c.style.backdropFilter="blur(16px) saturate(140%)",c.style.webkitBackdropFilter="blur(16px) saturate(140%)",c.style.color="rgba(15,23,42,.9)",c.style.border="1px solid rgba(0,0,0,.08)"):(c.style.background=r.bg||ke.bg,c.style.color=r.color||ke.color,c.style.border=r.border||ke.border||"none"),r.size&&qe[r.size]){const p=qe[r.size];p.width&&(c.style.width=p.width),p.padding&&(c.style.padding=p.padding)}c.style.position="relative";const ae=document.createElement("div");ae.className="jt-content";let pe=null;r.title&&(pe=document.createElement("div"),pe.className="jt-title",pe.textContent=r.title,ae.appendChild(pe));const fe=document.createElement("div");if(fe.className="jt-message",r.html?fe.innerHTML=m.sanitize(r.html,r.sanitizer&&r.sanitize!==!1?r.sanitizer:!1):fe.textContent=String((C=r.message)!=null?C:""),ae.appendChild(fe),Array.isArray(r.actions)&&r.actions.length){const p=document.createElement("div");p.className="jt-actions",r.actions.forEach(b=>{const M=document.createElement("button");M.className="jt-action",M.textContent=b.label||"Action",M.onclick=F=>{var ne;F.stopPropagation();try{(ne=b.onClick)==null||ne.call(b,F,{id:E,toast:c,cfg:r,type:e})}catch(Ee){}b.closeOnClick!==!1&&f.remove(E)},p.appendChild(M)}),ae.appendChild(p)}if(r.undo){const p=document.createElement("button");p.className="jt-action",p.textContent="Undo",p.onclick=()=>{var b;try{(b=r.undo)==null||b.call(r)}catch(M){}f.remove(E)},ae.appendChild(p)}let B=null;if(r.icon){B=document.createElement("i");const p=String(r.icon).startsWith("fa")?r.icon:`fa-${r.icon}`;if(B.className=["icon",r.iconPack||"",p].join(" ").trim(),r.iconSize&&(B.style.fontSize=r.iconSize),!r.reduceMotion){const b=r.iconAnim||Je[e];b&&B.classList.add(b)}r.iconLink&&(B.style.cursor="pointer",B.addEventListener("click",b=>{b.stopPropagation(),window.open(r.iconLink,"_blank","noopener")}))}let G=null;r.avatar&&(G=document.createElement("img"),G.className="jt-avatar",G.loading=r.avatarLazy?"lazy":"eager",G.alt=r.avatarAlt||r.title||"avatar",G.src=typeof r.avatar=="string"?r.avatar:r.avatarSrc||"");const we=r.avatarPosition||"left",Se=r.iconPosition||"left";G&&we==="top"?(c.classList.add("jt-avatar-top"),c.appendChild(G),B&&Se==="top"&&c.appendChild(B),c.appendChild(ae)):(G&&we==="left"&&c.appendChild(G),B&&Se==="left"&&c.appendChild(B),c.appendChild(ae),B&&Se==="right"&&c.appendChild(B),G&&we==="right"&&c.appendChild(G));let ge=null;if(r.progress&&r.duration>0&&(ge=document.createElement("div"),ge.className="jt-progress",r.progressColor&&(ge.style.background=r.progressColor),c.appendChild(ge)),r.closable){const p=document.createElement("span");p.className="juice-toast-close",p.textContent="\xD7",p.setAttribute("role","button"),p.setAttribute("aria-label","Close"),p.addEventListener("click",b=>{b.stopPropagation(),f.remove(E)}),c.appendChild(p)}c._cachedTitleEl=pe,c._cachedMessageEl=fe,c._cachedProgressEl=ge,be.appendChild(c);const w={id:E,toast:c,cfg:r,type:e,createdAt:H(),remaining:r.duration,start:H(),paused:!1,timer:null,dedupeKey:ue,groupId:de||null,cleanupGesture:null,hooks:{onShow:r.onShow,onShown:r.onShown,onClose:r.onClose,onRemoved:r.onRemoved}};if(d.set(E,w),de&&g.register(de,E,je,{type:e,position:r.position}),h.forEach(p=>{var b;try{(b=p.onCreate)==null||b.call(p,{id:E,toast:c,cfg:r,type:e,root:be,meta:w},f)}catch(M){}}),S("create",{id:E,toast:c,cfg:r,type:e,root:be,meta:w}),((A=t.gestures)==null?void 0:A.enabled)!==!1&&(w.cleanupGesture=Qe(c,{threshold:(V=(D=r.gestures)==null?void 0:D.threshold)!=null?V:t.gestures.threshold,velocityThreshold:(ce=(te=r.gestures)==null?void 0:te.velocityThreshold)!=null?ce:t.gestures.velocityThreshold,rubberBand:(ze=(ve=r.gestures)==null?void 0:ve.rubberBand)!=null?ze:t.gestures.rubberBand,springDuration:(Me=(Ce=r.gestures)==null?void 0:Ce.springDuration)!=null?Me:t.gestures.springDuration,flingDuration:(Te=(_e=r.gestures)==null?void 0:_e.flingDuration)!=null?Te:t.gestures.flingDuration,onStart:()=>{w.paused=!0,c.style.transition="none",S("gesture:start",{id:E,toast:c,cfg:r,type:e,meta:w})},onMove:p=>{S("gesture:move",{id:E,toast:c,cfg:r,type:e,meta:w,motion:p})},onEnd:p=>{w.paused=!1,p.shouldDismiss?f.remove(E):(w.start=H(),R()),S("gesture:end",{id:E,toast:c,cfg:r,type:e,meta:w,motion:p})},onDismiss:()=>f.remove(E)})),c.addEventListener("mouseenter",()=>{w.paused=!0,S("hover:start",{id:E,toast:c,cfg:r,type:e,meta:w})}),c.addEventListener("mouseleave",()=>{w.paused=!1,w.start=H(),R(),S("hover:end",{id:E,toast:c,cfg:r,type:e,meta:w})}),c.addEventListener("focusin",()=>{w.paused=!0}),c.addEventListener("focusout",()=>{w.paused=!1,w.start=H(),R()}),requestAnimationFrame(()=>{var p,b;r.reduceMotion?c.style.opacity="1":c.classList.add("show");try{(b=(p=w.hooks).onShow)==null||b.call(p,{id:E,toast:c,cfg:r,type:e,meta:w})}catch(M){}h.forEach(M=>{var F;try{(F=M.onShow)==null||F.call(M,{id:E,toast:c,cfg:r,type:e,meta:w},f)}catch(ne){}}),S("show",{id:E,toast:c,cfg:r,type:e,meta:w}),setTimeout(()=>{var M,F;try{(F=(M=w.hooks).onShown)==null||F.call(M,{id:E,toast:c,cfg:r,type:e,meta:w})}catch(ne){}h.forEach(ne=>{var Ee;try{(Ee=ne.onShown)==null||Ee.call(ne,{id:E,toast:c,cfg:r,type:e,meta:w},f)}catch(Ze){}}),S("shown",{id:E,toast:c,cfg:r,type:e,meta:w})},320)}),r.duration>0&&(w.remaining=r.duration,w.start=H(),R()),r.playSound)try{const p=new Audio(r.playSound);p.volume=me((De=r.soundVolume)!=null?De:.6,0,1),p.play().catch(()=>{})}catch(p){}return T.refresh(),E}function Y(e){let o=e.querySelector(".jt-count");if(o)return o;o=document.createElement("span"),o.className="jt-count",o.textContent="1";const u=e.querySelector(".jt-title")||e.querySelector(".jt-message");return u==null||u.appendChild(o),o}function R(){if(k)return;k=!0;const e=()=>{if(oe){O();return}const o=H();W||d.forEach((n,s)=>{var y;if(!n||n.paused)return;const j=(y=n.cfg.duration)!=null?y:t.duration;if(j<=0)return;const C=o-n.start,A=me(C,0,1e3);n.remaining-=A,n.start=o;const D=n.toast._cachedProgressEl||n.toast.querySelector(".jt-progress");if(D){const V=me(n.remaining/j,0,1);D.style.transform=`scaleX(${V})`}n.remaining<=0&&f.remove(s)});let u=!1;d.forEach(n=>{var s;((s=n.cfg.duration)!=null?s:t.duration)>0&&!n.paused&&(u=!0)}),u?$=requestAnimationFrame(e):O()};$=requestAnimationFrame(e)}function O(){k&&($&&cancelAnimationFrame($),$=null,k=!1)}function P(){var e;if(!re)return;const o=(e=t.maxVisible)!=null?e:1/0;let u=0;for(;a.size>0&&u<200;){u++;const n=a.pop();if(!n)break;const s=_(n.payload.position||n.payload.toast||"bottom-right");if(!s){a.push(n,n.priority);break}const y=s.children.length,j=(t.maxVisiblePerType||{})[n.type];if(y>=o){a.push(n,n.priority);break}if(typeof j=="number"&&Array.from(s.children).filter(C=>C.dataset.toastType===n.type).length>=j){a.push(n,n.priority);break}X(n.type,n.payload,n.id)}Q=!1,T.refresh()}function I(){Q||(Q=!0,setTimeout(()=>{Q=!1,P()},35))}f._enqueue=function(e,o={}){var u;const n=U(o),s=typeof n.priority=="number"?n.priority:(u=Z[n.priority])!=null?u:2,y=ie("q"),j={id:y,type:e,payload:n,priority:s,retries:0};return a.push(j,s),I(),y};function U(e){return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{message:String(e!=null?e:"")}}const Z={low:1,normal:2,high:3,urgent:4};function q(e,o,u){return e?typeof e=="string"?{message:e}:typeof e=="function"?{message:e(u)}:{...e}:{message:o}}function ee(e,o={}){const u=d.get(e);if(!u)return!1;u.cfg=J(u.cfg,o);const{toast:n,cfg:s,type:y}=u;if(s.title){const A=n.querySelector(".jt-title")||n._cachedTitleEl;A&&(A.textContent=s.title)}const j=n.querySelector(".jt-message")||n._cachedMessageEl;j&&(s.html?j.innerHTML=m.sanitize(s.html,s.sanitizer&&s.sanitize!==!1?s.sanitizer:!1):j.textContent=String(s.message||""));const C=x[s.theme||t.theme]||x.dark;return s.glassOnly||(n.style.background=s.bg||C.bg,n.style.color=s.color||C.color,n.style.border=s.border||C.border||"none"),s.duration!==void 0&&(u.remaining=s.duration,u.start=H(),s.duration>0&&!u.paused&&R()),h.forEach(A=>{var D;try{(D=A.onUpdate)==null||D.call(A,{id:e,toast:n,cfg:s,type:y,meta:u},f)}catch(V){}}),S("update",{id:e,toast:n,cfg:s,type:y,meta:u}),T.refresh(),!0}function he(e){var o,u;const n=d.get(e);if(!n)return!1;const{toast:s,cfg:y,type:j}=n;try{(u=(o=n.hooks).onClose)==null||u.call(o,{id:e,toast:s,cfg:y,type:j,meta:n})}catch(A){}if(h.forEach(A=>{var D;try{(D=A.onHide)==null||D.call(A,{id:e,toast:s,cfg:y,type:j,meta:n},f)}catch(V){}}),S("hide",{id:e,toast:s,cfg:y,type:j,meta:n}),y.reduceMotion?s.style.opacity="0":s.classList.add("hide"),d.delete(e),n.cleanupGesture)try{n.cleanupGesture()}catch(A){}const C=()=>{var A,D;s.parentNode&&s.parentNode.removeChild(s),n.groupId&&g.unregister(n.groupId,e),n.dedupeKey;try{(D=(A=n.hooks).onRemoved)==null||D.call(A,{id:e,toast:s,cfg:y,type:j,meta:n})}catch(te){}h.forEach(te=>{var ce;try{(ce=te.onRemove)==null||ce.call(te,{id:e,toast:s,cfg:y,type:j,meta:n},f)}catch(ve){}}),S("remove",{id:e,toast:s,cfg:y,type:j,meta:n});const V=s.parentNode;if(V&&V.children.length===0){const te=V.dataset.position;V.remove(),l.delete(te)}I(),T.refresh()};if(y.reduceMotion)C();else{const A=D=>{D.target===s&&(s.removeEventListener("animationend",A),C())};s.addEventListener("animationend",A),setTimeout(C,700)}return!0}function ye(e,o){var u;const n=U(o),s=typeof n.priority=="number"?n.priority:(u=Z[n.priority])!=null?u:2,y=ie("q");return a.push({id:y,type:e,payload:n,priority:s,retries:0},s),I(),y}function le(e){f[e]=(o={})=>ye(e,o)}return Object.keys(z).forEach(le),f.show=(e,o)=>ye(e,o),f.update=ee,f.remove=he,f.clear=()=>f.dismissAll(),f.clearQueue=()=>{a.clear(),T.refresh()},f._showNow=X,f._groups=g,f._roots=l,f._queue=a,f._active=d,f._config=()=>t,f.setup(t),t.devTools&&T.open(),f}const Ne=$e();export{$e as createJuiceToast,Ne as default,Ne as juiceToast};
//# sourceMappingURL=juice-toast.esm.js.map
