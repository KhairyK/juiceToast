// src/sanitizer.js
import { isBrowser } from './utils.js';

function escapeHTML(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const DEFAULT_ALLOWED_TAGS = new Set([
  'b',
  'i',
  'u',
  'strong',
  'em',
  'code',
  'pre',
  'ul',
  'ol',
  'li',
  'br',
  'p',
  'span',
  'img',
  'a',
  'small',
  'sub',
  'sup',
  'blockquote',
  'kbd',
  'mark',
]);

const DEFAULT_ALLOWED_ATTRS = new Set([
  'href',
  'src',
  'alt',
  'title',
  'aria-label',
  'role',
  'target',
  'rel',
  'class',
  'id',
  'loading',
  'decoding',
  'width',
  'height',
]);

const PROTOCOL_WHITELIST = /^(https?:\/\/|mailto:|tel:|\/\/)/i;

function sanitizeBuiltin(html, options = {}) {
  if (!isBrowser) return escapeHTML(html);

  const {
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttrs = DEFAULT_ALLOWED_ATTRS,
    allowDataImages = false,
  } = options;

  const template = document.createElement('template');
  template.innerHTML = String(html ?? '');

  template.content
    .querySelectorAll('script, style, iframe, object, embed, link, meta')
    .forEach((el) => el.remove());

  const walk = (node) => {
    Array.from(node.children || []).forEach((child) => {
      const tag = child.tagName.toLowerCase();

      if (!allowedTags.has(tag)) {
        child.replaceWith(...Array.from(child.childNodes));
        return;
      }

      Array.from(child.attributes || []).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = String(attr.value || '').trim();

        if (name.startsWith('on')) {
          child.removeAttribute(attr.name);
          return;
        }

        if (!allowedAttrs.has(name) && !name.startsWith('data-') && !name.startsWith('aria-')) {
          child.removeAttribute(attr.name);
          return;
        }

        if (name === 'href' || name === 'src' || name === 'xlink:href') {
          if (!PROTOCOL_WHITELIST.test(value)) {
            const isDataImg = allowDataImages && /^data:image\/(png|jpeg|jpg|gif|webp);/i.test(value);
            if (!isDataImg) child.removeAttribute(attr.name);
          }
          if (/^data:\s*image\/svg\+xml/i.test(value)) {
            child.removeAttribute(attr.name);
          }
        }

        if (name === 'style') {
          child.removeAttribute(attr.name);
        }

        if (tag === 'img' && name === 'srcset') {
          child.removeAttribute(attr.name);
        }
      });

      walk(child);
    });
  };

  walk(template.content);
  return template.innerHTML;
}

export function createSanitizer(globalConfig = {}) {
  const cfg = {
    engine: 'auto', // auto | builtin | dompurify
    dompurify: null,
    allowDataImages: false,
    ...globalConfig,
  };

  function getDOMPurify(override = {}) {
    return (
      override.dompurify ||
      cfg.dompurify ||
      (isBrowser ? window.DOMPurify : null) ||
      null
    );
  }

  function sanitize(html, override = {}) {
    if (override === false) return String(html ?? '');
    const finalCfg = { ...cfg, ...(override || {}) };
    const engine = finalCfg.engine || 'auto';

    if (engine === 'dompurify' || engine === 'auto') {
      const DOMPurify = getDOMPurify(finalCfg);
      if (DOMPurify?.sanitize) {
        return DOMPurify.sanitize(String(html ?? ''), finalCfg.dompurifyOptions || {});
      }
      if (engine === 'dompurify') {
        return sanitizeBuiltin(String(html ?? ''), finalCfg);
      }
    }

    return sanitizeBuiltin(String(html ?? ''), finalCfg);
  }

  return {
    sanitize,
    setConfig(next = {}) {
      Object.assign(cfg, next || {});
    },
    getConfig() {
      return { ...cfg };
    },
  };
}