/*!
 * JuiceToast v2.0.0 (Pack 0)
 * 2026 (C) OpenDN Foundation
 * See CONTRIBUTING.md to contribute
 */(function(Z,N){typeof exports=="object"&&typeof module!="undefined"?N(exports):typeof define=="function"&&define.amd?define(["exports"],N):(Z=typeof globalThis!="undefined"?globalThis:Z||self,N(Z.juiceToast={}))})(this,(function(Z){"use strict";const N=typeof window!="undefined"&&typeof document!="undefined",O=()=>Date.now();function se(i="jt"){return`${i}-${O().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function le(i,t,a){return Math.max(t,Math.min(a,i))}function Ce(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function Y(i={},t={}){const a={...i};for(const[d,l]of Object.entries(t||{}))Ce(l)&&Ce(a[d])?a[d]=Y(a[d],l):Array.isArray(l)?a[d]=l.slice():a[d]=l;return a}function Be(){const i=new Map;return{on(t,a){return i.has(t)||i.set(t,new Set),i.get(t).add(a),()=>this.off(t,a)},off(t,a){var d;(d=i.get(t))==null||d.delete(a)},emit(t,a){var d;(d=i.get(t))==null||d.forEach(l=>{try{l(a)}catch(h){}})},clear(){i.clear()}}}class Fe{constructor(){this._heap=[],this._seq=0}get size(){return this._heap.length}_parent(t){return Math.floor((t-1)/2)}_left(t){return 2*t+1}_right(t){return 2*t+2}_swap(t,a){[this._heap[t],this._heap[a]]=[this._heap[a],this._heap[t]]}_compare(t,a){const d=this._heap[t],l=this._heap[a];return d.priority!==l.priority?d.priority-l.priority:l.seq-d.seq}push(t,a=0){const d={item:t,priority:a,seq:++this._seq};this._heap.push(d),this._siftUp(this._heap.length-1)}pop(){if(!this._heap.length)return null;this._swap(0,this._heap.length-1);const t=this._heap.pop();return this._siftDown(0),t.item}peek(){var t,a;return(a=(t=this._heap[0])==null?void 0:t.item)!=null?a:null}clear(){this._heap.length=0}_siftUp(t){for(;t>0;){const a=this._parent(t);if(this._compare(t,a)<=0)break;this._swap(t,a),t=a}}_siftDown(t){for(;;){const a=this._left(t),d=this._right(t);let l=t;if(a<this._heap.length&&this._compare(a,l)>0&&(l=a),d<this._heap.length&&this._compare(d,l)>0&&(l=d),l===t)break;this._swap(t,l),t=l}}}function He(i){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const Xe=new Set(["b","i","u","strong","em","code","pre","ul","ol","li","br","p","span","img","a","small","sub","sup","blockquote","kbd","mark"]),Re=new Set(["href","src","alt","title","aria-label","role","target","rel","class","id","loading","decoding","width","height"]),Ve=/^(https?:\/\/|mailto:|tel:|\/\/)/i;function Me(i,t={}){if(!N)return He(i);const{allowedTags:a=Xe,allowedAttrs:d=Re,allowDataImages:l=!1}=t,h=document.createElement("template");h.innerHTML=String(i!=null?i:""),h.content.querySelectorAll("script, style, iframe, object, embed, link, meta").forEach(m=>m.remove());const v=m=>{Array.from(m.children||[]).forEach(g=>{const x=g.tagName.toLowerCase();if(!a.has(x)){g.replaceWith(...Array.from(g.childNodes));return}Array.from(g.attributes||[]).forEach(z=>{const k=z.name.toLowerCase(),$=String(z.value||"").trim();if(k.startsWith("on")){g.removeAttribute(z.name);return}if(!d.has(k)&&!k.startsWith("data-")&&!k.startsWith("aria-")){g.removeAttribute(z.name);return}(k==="href"||k==="src"||k==="xlink:href")&&(Ve.test($)||l&&/^data:image\/(png|jpeg|jpg|gif|webp);/i.test($)||g.removeAttribute(z.name),/^data:\s*image\/svg\+xml/i.test($)&&g.removeAttribute(z.name)),k==="style"&&g.removeAttribute(z.name),x==="img"&&k==="srcset"&&g.removeAttribute(z.name)}),v(g)})};return v(h.content),h.innerHTML}function Ge(i={}){const t={engine:"auto",dompurify:null,allowDataImages:!1,...i};function a(l={}){return l.dompurify||t.dompurify||(N?window.DOMPurify:null)||null}function d(l,h={}){if(h===!1)return String(l!=null?l:"");const v={...t,...h||{}},m=v.engine||"auto";if(m==="dompurify"||m==="auto"){const g=a(v);if(g!=null&&g.sanitize)return g.sanitize(String(l!=null?l:""),v.dompurifyOptions||{});if(m==="dompurify")return Me(String(l!=null?l:""),v)}return Me(String(l!=null?l:""),v)}return{sanitize:d,setConfig(l={}){Object.assign(t,l||{})},getConfig(){return{...t}}}}function Qe(i,t={}){const a={threshold:72,velocityThreshold:850,rubberBand:.22,springDuration:240,flingDuration:190,onDismiss:null,onStart:null,onMove:null,onEnd:null,...t};let d=!1,l=null,h=0,v=0,m=0,g=0,x=null,z=0,k=0,$=0,W=0,J=0,B=[];const ae=(S,_,L=0,ee=1)=>{i.style.setProperty("--jt-drag-x",`${S}px`),i.style.setProperty("--jt-drag-y",`${_}px`),i.style.setProperty("--jt-tilt",`${L}deg`),i.style.setProperty("--jt-scale",`${ee}`)},f=()=>{i.style.transition=`transform ${a.springDuration}ms cubic-bezier(.2,.9,.2,1), opacity ${a.springDuration}ms ease`,ae(0,0,0,1)},T=(S,_)=>{i.style.transition=`transform ${a.flingDuration}ms cubic-bezier(.16,1,.3,1), opacity ${a.flingDuration}ms ease`,S==="x"?ae(_*1200,g*.08,_*8,.98):ae(m*.08,1200*_,m*.03,.98),i.style.opacity="0",setTimeout(()=>{var L;return(L=a.onDismiss)==null?void 0:L.call(a)},a.flingDuration)},je=()=>{var S;const _=Math.abs(m),L=Math.abs(g);x||(_>8||L>8)&&(x=_>L?"x":"y");const ee=a.axis||x||(_>L?"x":"y");let R=m,U=g;if(ee==="x"){const P=Math.max(0,_-a.threshold)*a.rubberBand;R=Math.sign(m)*(Math.min(_,a.threshold)+P),U=g*.08}else{const P=Math.max(0,L-a.threshold)*a.rubberBand;U=Math.sign(g)*(Math.min(L,a.threshold)+P),R=m*.08}const V=le(R*.03,-10,10),F=le(1-Math.min(.06,(Math.abs(R)+Math.abs(U))/2e3),.94,1);ae(R,U,V,F),(S=a.onMove)==null||S.call(a,{x:R,y:U,axis:ee,vx:W,vy:J})},ce=S=>{var _,L;if(S.button!==void 0&&S.button!==0)return;if(d=!0,l=(_=S.pointerId)!=null?_:null,h=S.clientX,v=S.clientY,m=0,g=0,x=null,W=0,J=0,z=h,k=v,$=O(),i.style.willChange="transform, opacity",i.style.transition="none",i.setPointerCapture&&l!==null)try{i.setPointerCapture(l)}catch(I){}(L=a.onStart)==null||L.call(a);const ee=I=>{if(!d||l!==null&&I.pointerId!==l)return;const K=O(),te=Math.max(1,K-$),q=I.clientX,re=I.clientY;m=q-h,g=re-v,W=(q-z)/te*1e3,J=(re-k)/te*1e3,z=q,k=re,$=K,je()},R=()=>{var I;if(!d)return;d=!1;const K=Math.abs(m),te=Math.abs(g),q=a.axis||x||(K>te?"x":"y"),re=Math.abs(q==="x"?W:J),ye=q==="x"?K:te,be=Math.sign(q==="x"?m||1:g||1),ue=ye>=a.threshold||re>=a.velocityThreshold;ue?T(q,be||1):f(),U(),(I=a.onEnd)==null||I.call(a,{axis:q,shouldDismiss:ue,distance:ye,velocity:re,dx:m,dy:g})},U=()=>{B.forEach(I=>I()),B=[]},V=I=>ee(I),F=()=>R(),P={passive:!0};i.addEventListener("pointermove",V,P),i.addEventListener("pointerup",F,P),i.addEventListener("pointercancel",F,P),i.addEventListener("lostpointercapture",F,P),B.push(()=>i.removeEventListener("pointermove",V,P)),B.push(()=>i.removeEventListener("pointerup",F,P)),B.push(()=>i.removeEventListener("pointercancel",F,P)),B.push(()=>i.removeEventListener("lostpointercapture",F,P))};return i.addEventListener("pointerdown",ce),()=>{i.removeEventListener("pointerdown",ce),B.forEach(S=>S()),B=[]}}function We(){const i=new Map;function t(a,d="merge"){i.has(a)||i.set(a,{id:a,strategy:d,ids:[],count:0,meta:{}});const l=i.get(a);return d&&(l.strategy=d),l}return{register(a,d,l="merge",h={}){if(!a)return null;const v=t(a,l);return v.ids.includes(d)||(v.ids.push(d),v.count+=1),v.meta={...v.meta,...h},v},unregister(a,d){const l=i.get(a);l&&(l.ids=l.ids.filter(h=>h!==d),l.ids.length===0&&i.delete(a))},get(a){return i.get(a)||null},list(){return Array.from(i.values()).map(a=>({id:a.id,strategy:a.strategy,ids:a.ids.slice(),count:a.count,meta:{...a.meta}}))},clear(a){if(a){i.delete(a);return}i.clear()},has(a){return i.has(a)},size(){return i.size}}}function Ye(i){if(!N)return{open(){},close(){},toggle(){},refresh(){},snapshot(){return{}},isOpen(){return!1}};let t=null,a=!1,d=null;const l=()=>i.getSnapshot(),h=()=>{if(!t)return;const x=l();t.innerHTML=`
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
        </div>`).join(""),t.querySelector("[data-jt-close]").onclick=()=>g(),t.querySelector("[data-jt-pause]").onclick=()=>i.pauseAll(),t.querySelector("[data-jt-resume]").onclick=()=>i.resumeAll(),t.querySelector("[data-jt-clear]").onclick=()=>i.dismissAll(),t.querySelector("[data-jt-copy]").onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(x,null,2))}catch(k){}},t.querySelectorAll("[data-kill]").forEach(k=>{k.onclick=()=>i.remove(k.getAttribute("data-kill"))})},v=()=>t||(t=document.createElement("div"),t.setAttribute("data-juice-devtools",se("jt-dev")),t.style.position="fixed",t.style.right="16px",t.style.bottom="16px",t.style.width="320px",t.style.maxWidth="calc(100vw - 32px)",t.style.maxHeight="70vh",t.style.overflow="hidden",t.style.zIndex="2147483647",t.style.padding="14px",t.style.borderRadius="16px",t.style.background="rgba(15, 23, 42, .92)",t.style.color="#fff",t.style.backdropFilter="blur(14px) saturate(120%)",t.style.boxShadow="0 16px 60px rgba(0,0,0,.35)",t.style.fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",t.style.border="1px solid rgba(255,255,255,.08)",document.body.appendChild(t),t.addEventListener("click",x=>{x.target===t&&g()}),t),m=()=>{var x;a||(a=!0,v(),h(),d=setInterval(h,350),(x=i.emit)==null||x.call(i,"devtools:open",{}))},g=()=>{var x;a&&(a=!1,d&&clearInterval(d),d=null,t==null||t.remove(),t=null,(x=i.emit)==null||x.call(i,"devtools:close",{}))};return{open:m,close:g,toggle:()=>{a?g():m()},refresh:()=>{a&&h()},isOpen:()=>a,snapshot:()=>l()}}const Je={dark:{bg:"linear-gradient(180deg,#1f2937,#111827)",color:"#fff",border:"1px solid rgba(255,255,255,.08)"},light:{bg:"#fff",color:"#111827",border:"1px solid #e5e7eb"},glass:{bg:"rgba(17,24,39,.45)",color:"#fff",border:"1px solid rgba(255,255,255,.10)"}},Ue={success:"jt-bounce",error:"jt-shake",warning:"jt-shake",info:"jt-pulse",loading:"jt-spin"},_e={sm:{width:"260px",padding:"10px"},md:{width:"320px",padding:"14px"},lg:{width:"420px",padding:"18px"}},Ke={success:{icon:"fa-check",iconPack:"fas",bg:"#16a34a",duration:4e3,progress:!0},error:{icon:"fa-xmark",iconPack:"fas",bg:"#dc2626",duration:4e3,progress:!0},info:{icon:"fa-circle-info",iconPack:"fas",bg:"#2563eb",duration:4e3,progress:!0},warning:{icon:"fa-triangle-exclamation",iconPack:"fas",bg:"#f59e0b",duration:4e3,progress:!0},loading:{icon:"fa-spinner",iconPack:"fas",iconAnim:"jt-spin",duration:0,progress:!0}},ve=`
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
`;function Te(i={}){return Y({duration:2500,maxVisible:3,maxVisiblePerType:{},swipeThreshold:72,devTools:!1,injectCSS:!0,css:null,autoDedupe:!1,parallaxMode:!1,parallaxSmoothing:.12,use3d:!1,autoFetchFA:!0,urgentSkipsQueue:!1,maxQueueRetries:8,theme:"dark",sanitizer:{engine:"auto",dompurify:null,dompurifyOptions:{},allowDataImages:!1},gestures:{enabled:!0,threshold:72,velocityThreshold:850,rubberBand:.22,springDuration:240,flingDuration:190},types:{}},i)}function De(i={}){let t=Te(i);const a=new Fe,d=new Map,l=new Map,h=[],v=Be(),m=We(),g=Ge(t.sanitizer||{}),x={...Je},z=Y(Ke,t.types||{});let k=!1,$=null,W=!1,J=!1,B=!1,ae=!1;const f={emit:v.emit.bind(v),on:v.on.bind(v),off:v.off.bind(v),getSnapshot(){return{activeCount:d.size,queueCount:a.size,groupCount:m.size(),pausedAll:J,active:Array.from(d.values()).map(e=>({id:e.id,type:e.type,position:e.cfg.position,remaining:e.remaining,groupId:e.cfg.groupId||null})),groups:m.list(),config:{duration:t.duration,maxVisible:t.maxVisible,theme:t.theme,devTools:t.devTools,parallaxMode:t.parallaxMode}}},setup(e={}){return t=Te(Y(t,e)),g.setConfig(t.sanitizer||{}),e.types&&(Object.assign(z,e.types),Object.keys(e.types).forEach(o=>{f[o]||ue(o)})),e.theme&&this.setTheme(e.theme),t.injectCSS!==!1&&ce(t.css||ve),h.forEach(o=>{var u;return(u=o.onSetup)==null?void 0:u.call(o,this,t)}),this.emit("setup",{config:t}),t.devTools&&!T.isOpen()&&T.open(),this},defineTheme(e,o={}){return x[e]=Y(x[e]||{},o),this},setTheme(e){return t.theme=e,l.forEach(o=>{o.dataset.theme=e}),T.refresh(),this},addType(e,o={}){return z[e]=Y(z[e]||{},o),this},use(e){var o;const u=je(e);return u?(h.push(u),(o=u.onInstall)==null||o.call(u,this),this):this},unuse(e){const o=h.findIndex(u=>u===e||u.name===e);return o>=0&&h.splice(o,1),this},pauseAll(){J=!0,T.refresh()},resumeAll(){J=!1,d.forEach(e=>e.start=O()),V(),T.refresh()},dismissAll(e={}){const o=[];d.forEach((u,n)=>{const s=e.type?u.type===e.type:!0,y=e.position?(u.cfg.position||"bottom-right")===e.position:!0,j=e.groupId?u.cfg.groupId===e.groupId:!0;s&&y&&j&&o.push(n)}),o.forEach(u=>this.remove(u))},listActive(){return Array.from(d.values()).map(e=>({id:e.id,type:e.type,position:e.cfg.position,remaining:e.remaining,groupId:e.cfg.groupId||null,createdAt:e.createdAt}))},clearQueue(){a.clear(),W=!1,T.refresh()},destroy(){ae=!0,this.clearQueue(),this.dismissAll(),m.clear(),l.forEach(e=>e.remove()),l.clear(),d.clear(),F(),h.forEach(e=>{var o;return(o=e.onDestroy)==null?void 0:o.call(e,this)}),h.length=0,T.close(),v.clear()},promise(e,o={}){const u=typeof e=="function"?e():e;if(!u||typeof u.then!="function"){this.info({title:"JuiceToast",message:"promise() expects a Promise or a function returning Promise.",duration:3e3});return}const n=o.groupId||se("promise");this.loading({groupId:n,duration:0,...q(o.loading,"Loading...")});let s=!1,y=null;typeof o.timeout=="number"&&o.timeout>0&&(y=setTimeout(()=>{s||(s=!0,this.error({groupId:n,...q(o.timeoutMessage,"Request timeout")}))},o.timeout));const j=()=>{s=!0,y&&clearTimeout(y)};return u.then(C=>{s||(j(),this.success({groupId:n,...q(o.success,"Success",C)}))}).catch(C=>{s||(j(),this.error({groupId:n,...q(o.error,"Error",C)}))}),{cancel:()=>{s||(j(),this.info({groupId:n,...q(o.cancelMessage,"Cancelled")}))}}},enqueueBatch(e=[],o={}){const u=Number(o.interval||0);!Array.isArray(e)||e.length===0||e.forEach((n,s)=>{const y=()=>{var j;const C=n.type||"info",A=n.payload||n;(j=this[C])==null||j.call(this,A)};u>0?setTimeout(y,s*u):y()})},group:{get:e=>m.get(e),list:()=>m.list(),clear:e=>m.clear(e),has:e=>m.has(e),size:()=>m.size()},devtools:null},T=Ye(f);f.devtools=T;function je(e){return e?typeof e=="function"?{name:e.name||se("plugin"),install:e}:typeof e=="object"?e:null:null}function ce(e){if(!N||!t.injectCSS||document.getElementById("juice-toast-style"))return;const o=document.createElement("style");o.id="juice-toast-style",o.textContent=e||ve,document.head.appendChild(o)}function S(e,o){v.emit(e,o),h.forEach(u=>{var n;try{(n=u[e])==null||n.call(u,o,f)}catch(s){}})}function _(e="bottom-right"){if(!N)return null;if(l.has(e))return l.get(e);const o=document.createElement("div");switch(o.dataset.juiceRoot="1",o.dataset.position=e,o.dataset.theme=t.theme,o.style.pointerEvents="none",o.style.display="flex",t.parallaxMode&&(o.dataset.parallax="true"),e){case"top-left":o.style.top="20px",o.style.left="20px",o.style.flexDirection="column";break;case"top-right":o.style.top="20px",o.style.right="20px",o.style.flexDirection="column";break;case"bottom-left":o.style.bottom="20px",o.style.left="20px",o.style.flexDirection="column-reverse";break;case"top-center":o.style.top="20px",o.style.left="50%",o.style.transform="translateX(-50%)",o.style.flexDirection="column";break;case"bottom-center":o.style.bottom="20px",o.style.left="50%",o.style.transform="translateX(-50%)",o.style.flexDirection="column-reverse";break;default:o.style.bottom="20px",o.style.right="20px",o.style.flexDirection="column-reverse";break}return document.body.appendChild(o),l.set(e,o),o}function L(){if(!N||B||t.autoFetchFA===!1)return;if(document.querySelector('link[href*="fontawesome"], link[href*="font-awesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]')){B=!0;return}const e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",e.crossOrigin="anonymous",document.head.appendChild(e),B=!0}function ee(e,o){const u=String((o==null?void 0:o.title)||"").trim().slice(0,120),n=String((o==null?void 0:o.message)||(o==null?void 0:o.html)||"").trim().slice(0,240);return`${e}::${u}::${n}`}function R(e,o={},u=null){var n,s,y,j,C,A,D,G,oe,de,ke,Ie,qe,Pe,$e,Ne,Oe;if(!N)return null;ce(t.css||ve),L();const Ze=z[e]||{},r=Y(Ze,K(o));r.position=r.position||r.toast||"bottom-right",r.duration=typeof r.duration=="number"?r.duration:t.duration,r.closable=(s=(n=r.closable)!=null?n:r.closeable)!=null?s:!0,r.groupStrategy=r.groupStrategy||t.groupStrategy||"merge",r.groupId=r.groupId||((y=r.group)==null?void 0:y.id)||null,r.sanitize=(j=r.sanitize)!=null?j:!0,r.sanitizer=r.sanitizer||t.sanitizer||{},r.gestures=Y(t.gestures,r.gestures||{}),r.theme=r.theme||t.theme;const E=u||se("toast"),pe=r.dedupeKey||(t.autoDedupe?ee(e,r):null);if(pe)for(const p of l.values()){const b=Array.from(p.children).find(M=>M.dataset.dedupeKey===pe);if(b){const M=b.querySelector(".jt-count")||U(b);if(M.textContent=String((parseInt(M.textContent||"1",10)||1)+1),r.mergeMessage){const X=b.querySelector(".jt-message");X&&(r.html?X.innerHTML=sanitizeHTML(r.html,r.sanitizer):X.textContent=String(r.message||""))}return b.dataset.toastId}}const xe=_(r.position);if(!xe)return null;const fe=r.groupId,we=r.groupStrategy;if(fe){const p=m.get(fe);if(p&&p.ids.length){if(we==="replace")p.ids.slice().forEach(b=>f.remove(b));else if(we==="merge"){const b=p.ids[p.ids.length-1];if(b&&d.has(b))return f.update(b,r),b}}}const c=document.createElement("div");c.className="juice-toast",c.dataset.toastId=E,c.dataset.toastType=e,c.dataset.position=r.position,pe&&(c.dataset.dedupeKey=pe),c.tabIndex=0,c.setAttribute("role",r.ariaRole||(e==="error"?"alert":"status")),c.setAttribute("aria-live",e==="error"||e==="success"?"assertive":"polite"),c.setAttribute("aria-atomic","true");const Se=x[r.theme]||x.dark;if(r.bgImage?(c.style.backgroundImage=`url(${r.bgImage})`,c.style.backgroundSize=r.bgSize||"cover",c.style.backgroundPosition=r.bgPosition||"center"):r.glassOnly?(c.style.background="rgba(255,255,255,.28)",c.style.backdropFilter="blur(16px) saturate(140%)",c.style.webkitBackdropFilter="blur(16px) saturate(140%)",c.style.color="rgba(15,23,42,.9)",c.style.border="1px solid rgba(0,0,0,.08)"):(c.style.background=r.bg||Se.bg,c.style.color=r.color||Se.color,c.style.border=r.border||Se.border||"none"),r.size&&_e[r.size]){const p=_e[r.size];p.width&&(c.style.width=p.width),p.padding&&(c.style.padding=p.padding)}c.style.position="relative";const ne=document.createElement("div");ne.className="jt-content";let me=null;r.title&&(me=document.createElement("div"),me.className="jt-title",me.textContent=r.title,ne.appendChild(me));const ge=document.createElement("div");if(ge.className="jt-message",r.html?ge.innerHTML=g.sanitize(r.html,r.sanitizer&&r.sanitize!==!1?r.sanitizer:!1):ge.textContent=String((C=r.message)!=null?C:""),ne.appendChild(ge),Array.isArray(r.actions)&&r.actions.length){const p=document.createElement("div");p.className="jt-actions",r.actions.forEach(b=>{const M=document.createElement("button");M.className="jt-action",M.textContent=b.label||"Action",M.onclick=X=>{var ie;X.stopPropagation();try{(ie=b.onClick)==null||ie.call(b,X,{id:E,toast:c,cfg:r,type:e})}catch(ze){}b.closeOnClick!==!1&&f.remove(E)},p.appendChild(M)}),ne.appendChild(p)}if(r.undo){const p=document.createElement("button");p.className="jt-action",p.textContent="Undo",p.onclick=()=>{var b;try{(b=r.undo)==null||b.call(r)}catch(M){}f.remove(E)},ne.appendChild(p)}let H=null;if(r.icon){H=document.createElement("i");const p=String(r.icon).startsWith("fa")?r.icon:`fa-${r.icon}`;if(H.className=["icon",r.iconPack||"",p].join(" ").trim(),r.iconSize&&(H.style.fontSize=r.iconSize),!r.reduceMotion){const b=r.iconAnim||Ue[e];b&&H.classList.add(b)}r.iconLink&&(H.style.cursor="pointer",H.addEventListener("click",b=>{b.stopPropagation(),window.open(r.iconLink,"_blank","noopener")}))}let Q=null;r.avatar&&(Q=document.createElement("img"),Q.className="jt-avatar",Q.loading=r.avatarLazy?"lazy":"eager",Q.alt=r.avatarAlt||r.title||"avatar",Q.src=typeof r.avatar=="string"?r.avatar:r.avatarSrc||"");const Ee=r.avatarPosition||"left",Ae=r.iconPosition||"left";Q&&Ee==="top"?(c.classList.add("jt-avatar-top"),c.appendChild(Q),H&&Ae==="top"&&c.appendChild(H),c.appendChild(ne)):(Q&&Ee==="left"&&c.appendChild(Q),H&&Ae==="left"&&c.appendChild(H),c.appendChild(ne),H&&Ae==="right"&&c.appendChild(H),Q&&Ee==="right"&&c.appendChild(Q));let he=null;if(r.progress&&r.duration>0&&(he=document.createElement("div"),he.className="jt-progress",r.progressColor&&(he.style.background=r.progressColor),c.appendChild(he)),r.closable){const p=document.createElement("span");p.className="juice-toast-close",p.textContent="\xD7",p.setAttribute("role","button"),p.setAttribute("aria-label","Close"),p.addEventListener("click",b=>{b.stopPropagation(),f.remove(E)}),c.appendChild(p)}c._cachedTitleEl=me,c._cachedMessageEl=ge,c._cachedProgressEl=he,xe.appendChild(c);const w={id:E,toast:c,cfg:r,type:e,createdAt:O(),remaining:r.duration,start:O(),paused:!1,timer:null,dedupeKey:pe,groupId:fe||null,cleanupGesture:null,hooks:{onShow:r.onShow,onShown:r.onShown,onClose:r.onClose,onRemoved:r.onRemoved}};if(d.set(E,w),fe&&m.register(fe,E,we,{type:e,position:r.position}),h.forEach(p=>{var b;try{(b=p.onCreate)==null||b.call(p,{id:E,toast:c,cfg:r,type:e,root:xe,meta:w},f)}catch(M){}}),S("create",{id:E,toast:c,cfg:r,type:e,root:xe,meta:w}),((A=t.gestures)==null?void 0:A.enabled)!==!1&&(w.cleanupGesture=Qe(c,{threshold:(G=(D=r.gestures)==null?void 0:D.threshold)!=null?G:t.gestures.threshold,velocityThreshold:(de=(oe=r.gestures)==null?void 0:oe.velocityThreshold)!=null?de:t.gestures.velocityThreshold,rubberBand:(Ie=(ke=r.gestures)==null?void 0:ke.rubberBand)!=null?Ie:t.gestures.rubberBand,springDuration:(Pe=(qe=r.gestures)==null?void 0:qe.springDuration)!=null?Pe:t.gestures.springDuration,flingDuration:(Ne=($e=r.gestures)==null?void 0:$e.flingDuration)!=null?Ne:t.gestures.flingDuration,onStart:()=>{w.paused=!0,c.style.transition="none",S("gesture:start",{id:E,toast:c,cfg:r,type:e,meta:w})},onMove:p=>{S("gesture:move",{id:E,toast:c,cfg:r,type:e,meta:w,motion:p})},onEnd:p=>{w.paused=!1,p.shouldDismiss?f.remove(E):(w.start=O(),V()),S("gesture:end",{id:E,toast:c,cfg:r,type:e,meta:w,motion:p})},onDismiss:()=>f.remove(E)})),c.addEventListener("mouseenter",()=>{w.paused=!0,S("hover:start",{id:E,toast:c,cfg:r,type:e,meta:w})}),c.addEventListener("mouseleave",()=>{w.paused=!1,w.start=O(),V(),S("hover:end",{id:E,toast:c,cfg:r,type:e,meta:w})}),c.addEventListener("focusin",()=>{w.paused=!0}),c.addEventListener("focusout",()=>{w.paused=!1,w.start=O(),V()}),requestAnimationFrame(()=>{var p,b;r.reduceMotion?c.style.opacity="1":c.classList.add("show");try{(b=(p=w.hooks).onShow)==null||b.call(p,{id:E,toast:c,cfg:r,type:e,meta:w})}catch(M){}h.forEach(M=>{var X;try{(X=M.onShow)==null||X.call(M,{id:E,toast:c,cfg:r,type:e,meta:w},f)}catch(ie){}}),S("show",{id:E,toast:c,cfg:r,type:e,meta:w}),setTimeout(()=>{var M,X;try{(X=(M=w.hooks).onShown)==null||X.call(M,{id:E,toast:c,cfg:r,type:e,meta:w})}catch(ie){}h.forEach(ie=>{var ze;try{(ze=ie.onShown)==null||ze.call(ie,{id:E,toast:c,cfg:r,type:e,meta:w},f)}catch(et){}}),S("shown",{id:E,toast:c,cfg:r,type:e,meta:w})},320)}),r.duration>0&&(w.remaining=r.duration,w.start=O(),V()),r.playSound)try{const p=new Audio(r.playSound);p.volume=le((Oe=r.soundVolume)!=null?Oe:.6,0,1),p.play().catch(()=>{})}catch(p){}return T.refresh(),E}function U(e){let o=e.querySelector(".jt-count");if(o)return o;o=document.createElement("span"),o.className="jt-count",o.textContent="1";const u=e.querySelector(".jt-title")||e.querySelector(".jt-message");return u==null||u.appendChild(o),o}function V(){if(k)return;k=!0;const e=()=>{if(ae){F();return}const o=O();J||d.forEach((n,s)=>{var y;if(!n||n.paused)return;const j=(y=n.cfg.duration)!=null?y:t.duration;if(j<=0)return;const C=o-n.start,A=le(C,0,1e3);n.remaining-=A,n.start=o;const D=n.toast._cachedProgressEl||n.toast.querySelector(".jt-progress");if(D){const G=le(n.remaining/j,0,1);D.style.transform=`scaleX(${G})`}n.remaining<=0&&f.remove(s)});let u=!1;d.forEach(n=>{var s;((s=n.cfg.duration)!=null?s:t.duration)>0&&!n.paused&&(u=!0)}),u?$=requestAnimationFrame(e):F()};$=requestAnimationFrame(e)}function F(){k&&($&&cancelAnimationFrame($),$=null,k=!1)}function P(){var e;if(!N)return;const o=(e=t.maxVisible)!=null?e:1/0;let u=0;for(;a.size>0&&u<200;){u++;const n=a.pop();if(!n)break;const s=_(n.payload.position||n.payload.toast||"bottom-right");if(!s){a.push(n,n.priority);break}const y=s.children.length,j=(t.maxVisiblePerType||{})[n.type];if(y>=o){a.push(n,n.priority);break}if(typeof j=="number"&&Array.from(s.children).filter(C=>C.dataset.toastType===n.type).length>=j){a.push(n,n.priority);break}R(n.type,n.payload,n.id)}W=!1,T.refresh()}function I(){W||(W=!0,setTimeout(()=>{W=!1,P()},35))}f._enqueue=function(e,o={}){var u;const n=K(o),s=typeof n.priority=="number"?n.priority:(u=te[n.priority])!=null?u:2,y=se("q"),j={id:y,type:e,payload:n,priority:s,retries:0};return a.push(j,s),I(),y};function K(e){return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{message:String(e!=null?e:"")}}const te={low:1,normal:2,high:3,urgent:4};function q(e,o,u){return e?typeof e=="string"?{message:e}:typeof e=="function"?{message:e(u)}:{...e}:{message:o}}function re(e,o={}){const u=d.get(e);if(!u)return!1;u.cfg=Y(u.cfg,o);const{toast:n,cfg:s,type:y}=u;if(s.title){const A=n.querySelector(".jt-title")||n._cachedTitleEl;A&&(A.textContent=s.title)}const j=n.querySelector(".jt-message")||n._cachedMessageEl;j&&(s.html?j.innerHTML=g.sanitize(s.html,s.sanitizer&&s.sanitize!==!1?s.sanitizer:!1):j.textContent=String(s.message||""));const C=x[s.theme||t.theme]||x.dark;return s.glassOnly||(n.style.background=s.bg||C.bg,n.style.color=s.color||C.color,n.style.border=s.border||C.border||"none"),s.duration!==void 0&&(u.remaining=s.duration,u.start=O(),s.duration>0&&!u.paused&&V()),h.forEach(A=>{var D;try{(D=A.onUpdate)==null||D.call(A,{id:e,toast:n,cfg:s,type:y,meta:u},f)}catch(G){}}),S("update",{id:e,toast:n,cfg:s,type:y,meta:u}),T.refresh(),!0}function ye(e){var o,u;const n=d.get(e);if(!n)return!1;const{toast:s,cfg:y,type:j}=n;try{(u=(o=n.hooks).onClose)==null||u.call(o,{id:e,toast:s,cfg:y,type:j,meta:n})}catch(A){}if(h.forEach(A=>{var D;try{(D=A.onHide)==null||D.call(A,{id:e,toast:s,cfg:y,type:j,meta:n},f)}catch(G){}}),S("hide",{id:e,toast:s,cfg:y,type:j,meta:n}),y.reduceMotion?s.style.opacity="0":s.classList.add("hide"),d.delete(e),n.cleanupGesture)try{n.cleanupGesture()}catch(A){}const C=()=>{var A,D;s.parentNode&&s.parentNode.removeChild(s),n.groupId&&m.unregister(n.groupId,e),n.dedupeKey;try{(D=(A=n.hooks).onRemoved)==null||D.call(A,{id:e,toast:s,cfg:y,type:j,meta:n})}catch(oe){}h.forEach(oe=>{var de;try{(de=oe.onRemove)==null||de.call(oe,{id:e,toast:s,cfg:y,type:j,meta:n},f)}catch(ke){}}),S("remove",{id:e,toast:s,cfg:y,type:j,meta:n});const G=s.parentNode;if(G&&G.children.length===0){const oe=G.dataset.position;G.remove(),l.delete(oe)}I(),T.refresh()};if(y.reduceMotion)C();else{const A=D=>{D.target===s&&(s.removeEventListener("animationend",A),C())};s.addEventListener("animationend",A),setTimeout(C,700)}return!0}function be(e,o){var u;const n=K(o),s=typeof n.priority=="number"?n.priority:(u=te[n.priority])!=null?u:2,y=se("q");return a.push({id:y,type:e,payload:n,priority:s,retries:0},s),I(),y}function ue(e){f[e]=(o={})=>be(e,o)}return Object.keys(z).forEach(ue),f.show=(e,o)=>be(e,o),f.update=re,f.remove=ye,f.clear=()=>f.dismissAll(),f.clearQueue=()=>{a.clear(),T.refresh()},f._showNow=R,f._groups=m,f._roots=l,f._queue=a,f._active=d,f._config=()=>t,f.setup(t),t.devTools&&T.open(),f}const Le=De();Z.createJuiceToast=De,Z.default=Le,Z.juiceToast=Le,Object.defineProperty(Z,"__esModule",{value:!0})}));
//# sourceMappingURL=juice-toast.umd.js.map
