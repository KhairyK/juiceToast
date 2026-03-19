// src/devtools.js
import { isBrowser, uid } from './utils.js';

export function createDevTools(api) {
  if (!isBrowser) {
    return {
      open() {},
      close() {},
      toggle() {},
      refresh() {},
      snapshot() {
        return {};
      },
      isOpen() {
        return false;
      },
    };
  }

  let panel = null;
  let opened = false;
  let timer = null;

  const state = () => api.getSnapshot();

  const render = () => {
    if (!panel) return;
    const s = state();

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px">
        <strong style="font-size:13px">JuiceToast DevTools</strong>
        <button data-jt-close style="border:none;background:transparent;color:inherit;cursor:pointer;font-size:18px;line-height:1">×</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;margin-bottom:10px">
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Active<br><strong>${s.activeCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Queued<br><strong>${s.queueCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Groups<br><strong>${s.groupCount}</strong></div>
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px">Paused<br><strong>${s.pausedAll ? 'Yes' : 'No'}</strong></div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <button data-jt-pause style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Pause</button>
        <button data-jt-resume style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Resume</button>
        <button data-jt-clear style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Clear</button>
        <button data-jt-copy style="padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:inherit;cursor:pointer">Snapshot</button>
      </div>

      <div style="font-size:12px;opacity:.85;margin-bottom:8px">Active toasts</div>
      <div data-jt-list style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow:auto"></div>
    `;

    const list = panel.querySelector('[data-jt-list]');
    if (s.active.length === 0) {
      list.innerHTML = `<div style="opacity:.6;font-size:12px">No active toasts</div>`;
    } else {
      list.innerHTML = s.active
        .map(
          (item) => `
        <div style="padding:8px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:rgba(255,255,255,.04)">
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
            <div>
              <div style="font-size:12px;font-weight:700">${item.type}</div>
              <div style="font-size:11px;opacity:.7">${item.id}</div>
            </div>
            <button data-kill="${item.id}" style="padding:6px 8px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:transparent;color:inherit;cursor:pointer">Dismiss</button>
          </div>
          <div style="font-size:11px;opacity:.75;margin-top:6px">pos: ${item.position} • remaining: ${Math.max(
            0,
            Math.round(item.remaining || 0)
          )}ms</div>
        </div>`
        )
        .join('');
    }

    panel.querySelector('[data-jt-close]').onclick = () => close();
    panel.querySelector('[data-jt-pause]').onclick = () => api.pauseAll();
    panel.querySelector('[data-jt-resume]').onclick = () => api.resumeAll();
    panel.querySelector('[data-jt-clear]').onclick = () => api.dismissAll();
    panel.querySelector('[data-jt-copy]').onclick = async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(s, null, 2));
      } catch (_) {}
    };

    panel.querySelectorAll('[data-kill]').forEach((btn) => {
      btn.onclick = () => api.remove(btn.getAttribute('data-kill'));
    });
  };

  const ensurePanel = () => {
    if (panel) return panel;
    panel = document.createElement('div');
    panel.setAttribute('data-juice-devtools', uid('jt-dev'));
    panel.style.position = 'fixed';
    panel.style.right = '16px';
    panel.style.bottom = '16px';
    panel.style.width = '320px';
    panel.style.maxWidth = 'calc(100vw - 32px)';
    panel.style.maxHeight = '70vh';
    panel.style.overflow = 'hidden';
    panel.style.zIndex = '2147483647';
    panel.style.padding = '14px';
    panel.style.borderRadius = '16px';
    panel.style.background = 'rgba(15, 23, 42, .92)';
    panel.style.color = '#fff';
    panel.style.backdropFilter = 'blur(14px) saturate(120%)';
    panel.style.boxShadow = '0 16px 60px rgba(0,0,0,.35)';
    panel.style.fontFamily =
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
    panel.style.border = '1px solid rgba(255,255,255,.08)';
    document.body.appendChild(panel);

    panel.addEventListener('click', (e) => {
      if (e.target === panel) close();
    });

    return panel;
  };

  const open = () => {
    if (opened) return;
    opened = true;
    ensurePanel();
    render();
    timer = setInterval(render, 350);
    api.emit?.('devtools:open', {});
  };

  const close = () => {
    if (!opened) return;
    opened = false;
    if (timer) clearInterval(timer);
    timer = null;
    panel?.remove();
    panel = null;
    api.emit?.('devtools:close', {});
  };

  const toggle = () => {
    if (opened) close();
    else open();
  };

  const refresh = () => {
    if (!opened) return;
    render();
  };

  return {
    open,
    close,
    toggle,
    refresh,
    isOpen: () => opened,
    snapshot: () => state(),
  };
}