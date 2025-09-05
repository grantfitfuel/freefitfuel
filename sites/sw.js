// sw.js (FreeFitFuel)
// Bump this when you change files you want cached:
const VERSION = 'fff-v1.0.0';

// What to make available offline immediately (keep tiny!)
const PRECACHE_URLS = [
  '/', '/index.html', '/style.css',
  '/workouts.html', '/nutrition.html', '/wellbeing.html', '/endurance.html',
  '/img/freefitfuel-logo.svg', '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategy: for navigations, try network → fallback to cache → offline page
// for other GETs, stale-while-revalidate.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        return fresh;
      } catch (e) {
        const cache = await caches.open(VERSION);
        const cached = await cache.match(req) || await cache.match('/offline.html');
        return cached;
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req).then(res => {
      try { cache.put(req, res.clone()); } catch (e) {}
      return res;
    }).catch(() => cached);
    return cached || fetchPromise;
  })());
});
