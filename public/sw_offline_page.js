const cacheName = "v1";

const cacheAssets = ["index.html"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", () => {});

self.addEventListener("fetch", (e) => {
  console.log(e.request);
  e.respondWith(fetch(e.request).catch(() => caches.match("./index.html")));
});
