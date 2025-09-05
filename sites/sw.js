// sw.js — FreeFitFuel PWA
const VERSION = 'fff-v1.0.0';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
  '/', '/index.html',
  '/style.css',
  '/manifest.json',
  '/offline.html',
  // Logos
  '/img/freefitfuel-logo.svg',
  '/img/freefitfuel-logo-192.png',
  '/img/freefitfuel-logo-512.png',
  // Common pages you want guaranteed offline:
  '/workouts.html',
  '/endurance.html',
  '/wellbeing.html',
  '/nutrition.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(PRECACHE_URLS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (!k.startsWith(VERSION)) return caches.delete(k);
    }));
    self.clients.claim();
  })());
});

// Strategy:
// 1) HTML: network-first, fall back to cache, then offline.html
// 2) CSS/JS: stale-while-revalidate (fast)
// 3) Images: cache-first (limit growth)
// 4) External (YouTube thumbs): let through, don’t cache aggressively
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== 'GET') return;

  // HTML pages
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(req) || await caches.match(req);
        return cached || caches.match(OFFLINE_URL);
      }
    })());
    return;
  }

  // CSS/JS — stale-while-revalidate
  if (req.destination === 'style' || req.destination === 'script') {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req).then(res => {
        cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      return cached || fetchPromise || fetch(req);
    })());
    return;
  }

  // Images — cache-first with fallback to network
  if (req.destination === 'image') {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      } catch (e) {
        // Optional: return a tiny transparent PNG fallback
        return new Response(new Blob(), { status: 200 });
      }
    })());
    return;
  }

  // Default: try network, fall back to cache
  event.respondWith((async () => {
    try {
      return await fetch(req);
    } catch (e) {
      const cached = await caches.match(req);
      return cached || new Response('', { status: 504 });
    }
  })());
});
