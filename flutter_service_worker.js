// No-op service worker. Flutter may still register this file, but it must not
// cache pages or force-navigate clients — that caused mobile browsers to loop
// and look like the link would not open.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (_) {}
      try {
        await self.registration.unregister();
      } catch (_) {}
      try {
        await self.clients.claim();
      } catch (_) {}
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
