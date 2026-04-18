/* =========================================================
   FreeFitFuel Engine — CORE
   ========================================================= */

(function (global) {
  'use strict';

  if (global.FFF) return; // prevent double load

  const FFF = {};

  /* =========================
     VERSION
     ========================= */
  FFF.version = 'B2-core-1.0';

  /* =========================
     UTILITIES
     ========================= */
  FFF.utils = {

    clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    },

    round(n, dp = 0) {
      const p = Math.pow(10, dp);
      return Math.round(n * p) / p;
    },

    toNum(v, fallback = 0) {
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    },

    str(v, fallback = '') {
      return (v === undefined || v === null || v === '') ? fallback : String(v);
    },

    slug(v) {
      return String(v)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    },

    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

  };

  /* =========================
     EVENT BUS
     ========================= */
  const events = {};

  FFF.on = function (event, handler) {
    if (!events[event]) events[event] = [];
    events[event].push(handler);
  };

  FFF.emit = function (event, data) {
    (events[event] || []).forEach(fn => fn(data));
  };

  /* =========================
     SAFE STORAGE
     ========================= */
  FFF.store = {

    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }

  };

  /* =========================
     DEBUG
     ========================= */
  FFF.debug = function (...args) {
    console.log('[FFF]', ...args);
  };

  /* =========================
     READY CHECK
     ========================= */
  FFF.ready = function () {
    FFF.debug('Engine ready:', FFF.version);
  };

  global.FFF = FFF;

})(window);
