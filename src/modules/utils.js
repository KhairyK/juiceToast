export const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

export const now = () => Date.now();

export function uid(prefix = 'jt') {
  return `${prefix}-${now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(target = {}, source = {}) {
  const out = { ...target };
  for (const [key, value] of Object.entries(source || {})) {
    if (isObject(value) && isObject(out[key])) {
      out[key] = deepMerge(out[key], value);
    } else if (Array.isArray(value)) {
      out[key] = value.slice();
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function createEventBus() {
  const listeners = new Map();
  
  return {
    on(event, fn) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(fn);
      return () => this.off(event, fn);
    },
    off(event, fn) {
      listeners.get(event)?.delete(fn);
    },
    emit(event, payload) {
      listeners.get(event)?.forEach((fn) => {
        try {
          fn(payload);
        } catch (_) {}
      });
    },
    clear() {
      listeners.clear();
    },
  };
}

/* Stable max-heap priority queue */
export class PriorityQueue {
  constructor() {
    this._heap = [];
    this._seq = 0;
  }
  
  get size() {
    return this._heap.length;
  }
  
  _parent(i) {
    return Math.floor((i - 1) / 2);
  }
  _left(i) {
    return 2 * i + 1;
  }
  _right(i) {
    return 2 * i + 2;
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  
  _compare(a, b) {
    const A = this._heap[a];
    const B = this._heap[b];
    
    if (A.priority !== B.priority) return A.priority - B.priority;
    return B.seq - A.seq; // older seq wins on tie
  }
  
  push(item, priority = 0) {
    const node = { item, priority, seq: ++this._seq };
    this._heap.push(node);
    this._siftUp(this._heap.length - 1);
  }
  
  pop() {
    if (!this._heap.length) return null;
    this._swap(0, this._heap.length - 1);
    const top = this._heap.pop();
    this._siftDown(0);
    return top.item;
  }
  
  peek() {
    return this._heap[0]?.item ?? null;
  }
  
  clear() {
    this._heap.length = 0;
  }
  
  _siftUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this._compare(i, p) <= 0) break;
      this._swap(i, p);
      i = p;
    }
  }
  
  _siftDown(i) {
    while (true) {
      const l = this._left(i);
      const r = this._right(i);
      let largest = i;
      
      if (l < this._heap.length && this._compare(l, largest) > 0) largest = l;
      if (r < this._heap.length && this._compare(r, largest) > 0) largest = r;
      
      if (largest === i) break;
      this._swap(i, largest);
      i = largest;
    }
  }
}