// src/gestures.js
import { clamp, now } from './utils.js';

export function attachPremiumGesture(el, options = {}) {
  const cfg = {
    threshold: 72,
    velocityThreshold: 850,
    rubberBand: 0.22,
    springDuration: 240,
    flingDuration: 190,
    onDismiss: null,
    onStart: null,
    onMove: null,
    onEnd: null,
    ...options,
  };
  
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dy = 0;
  let axisLock = null;
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;
  let vx = 0;
  let vy = 0;
  let cleanupFns = [];
  
  const setVars = (x, y, tilt = 0, scale = 1) => {
    el.style.setProperty('--jt-drag-x', `${x}px`);
    el.style.setProperty('--jt-drag-y', `${y}px`);
    el.style.setProperty('--jt-tilt', `${tilt}deg`);
    el.style.setProperty('--jt-scale', `${scale}`);
  };
  
  const springBack = () => {
    el.style.transition = `transform ${cfg.springDuration}ms cubic-bezier(.2,.9,.2,1), opacity ${cfg.springDuration}ms ease`;
    setVars(0, 0, 0, 1);
  };
  
  const flingOut = (axis, sign) => {
    el.style.transition = `transform ${cfg.flingDuration}ms cubic-bezier(.16,1,.3,1), opacity ${cfg.flingDuration}ms ease`;
    if (axis === 'x') {
      setVars(sign * 1200, dy * 0.08, sign * 8, 0.98);
    } else {
      setVars(dx * 0.08, 1200 * sign, dx * 0.03, 0.98);
    }
    el.style.opacity = '0';
    setTimeout(() => cfg.onDismiss?.(), cfg.flingDuration);
  };
  
  const applyMotion = () => {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    
    if (!axisLock) {
      if (absX > 8 || absY > 8) axisLock = absX > absY ? 'x' : 'y';
    }
    
    const activeAxis = cfg.axis || axisLock || (absX > absY ? 'x' : 'y');
    
    let x = dx;
    let y = dy;
    
    if (activeAxis === 'x') {
      const over = Math.max(0, absX - cfg.threshold);
      const damp = over * cfg.rubberBand;
      x = Math.sign(dx) * (Math.min(absX, cfg.threshold) + damp);
      y = dy * 0.08;
    } else {
      const over = Math.max(0, absY - cfg.threshold);
      const damp = over * cfg.rubberBand;
      y = Math.sign(dy) * (Math.min(absY, cfg.threshold) + damp);
      x = dx * 0.08;
    }
    
    const tilt = clamp(x * 0.03, -10, 10);
    const scale = clamp(1 - Math.min(0.06, (Math.abs(x) + Math.abs(y)) / 2000), 0.94, 1);
    setVars(x, y, tilt, scale);
    cfg.onMove?.({ x, y, axis: activeAxis, vx, vy });
  };
  
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    
    dragging = true;
    pointerId = e.pointerId ?? null;
    startX = e.clientX;
    startY = e.clientY;
    dx = 0;
    dy = 0;
    axisLock = null;
    vx = 0;
    vy = 0;
    lastX = startX;
    lastY = startY;
    lastT = now();
    
    el.style.willChange = 'transform, opacity';
    el.style.transition = 'none';
    
    if (el.setPointerCapture && pointerId !== null) {
      try {
        el.setPointerCapture(pointerId);
      } catch (_) {}
    }
    
    cfg.onStart?.();
    
    const move = (ev) => {
      if (!dragging) return;
      if (pointerId !== null && ev.pointerId !== pointerId) return;
      
      const t = now();
      const dt = Math.max(1, t - lastT);
      const px = ev.clientX;
      const py = ev.clientY;
      
      dx = px - startX;
      dy = py - startY;
      vx = ((px - lastX) / dt) * 1000;
      vy = ((py - lastY) / dt) * 1000;
      
      lastX = px;
      lastY = py;
      lastT = t;
      
      applyMotion();
    };
    
    const up = () => {
      if (!dragging) return;
      dragging = false;
      
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const activeAxis = cfg.axis || axisLock || (absX > absY ? 'x' : 'y');
      const velocity = activeAxis === 'x' ? Math.abs(vx) : Math.abs(vy);
      const distance = activeAxis === 'x' ? absX : absY;
      const sign = activeAxis === 'x' ? Math.sign(dx || 1) : Math.sign(dy || 1);
      
      const shouldDismiss =
        distance >= cfg.threshold || velocity >= cfg.velocityThreshold;
      
      if (shouldDismiss) {
        flingOut(activeAxis, sign || 1);
      } else {
        springBack();
      }
      
      cleanup();
      cfg.onEnd?.({
        axis: activeAxis,
        shouldDismiss,
        distance,
        velocity,
        dx,
        dy,
      });
    };
    
    const cleanup = () => {
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
    };
    
    const onMove = (ev) => move(ev);
    const onUp = () => up();
    
    const opts = { passive: true };
    
    el.addEventListener('pointermove', onMove, opts);
    el.addEventListener('pointerup', onUp, opts);
    el.addEventListener('pointercancel', onUp, opts);
    el.addEventListener('lostpointercapture', onUp, opts);
    
    cleanupFns.push(() => el.removeEventListener('pointermove', onMove, opts));
    cleanupFns.push(() => el.removeEventListener('pointerup', onUp, opts));
    cleanupFns.push(() => el.removeEventListener('pointercancel', onUp, opts));
    cleanupFns.push(() => el.removeEventListener('lostpointercapture', onUp, opts));
  };
  
  el.addEventListener('pointerdown', onPointerDown);
  
  const destroy = () => {
    el.removeEventListener('pointerdown', onPointerDown);
    cleanupFns.forEach((fn) => fn());
    cleanupFns = [];
  };
  
  return destroy;
}