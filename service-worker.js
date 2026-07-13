const CACHE_NAME = "team-northam-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./team-schedule2026.html",
  "./mens-schedule2026.html",
  "./team-stats2026.html",
  "./weeklyresults2026.html",
  "./teamlineup2026.html",
  "./headtohead2026.html",

  "./styles.css",
  "./manifest.json",

  "./team-northam-logo.jpg",
  "./team-northam-app-logo.jpg",

  "./league-schedule-data.js",
  "./league-schedule.js",
  "./league-standings.js",

  "./schedule-data.js",
  "./next-game.js",

  "./team-schedule.js",
  "./schedule-month-tabs.js",

  "./team-stats-data.js",
  "./team-stats.js",

  "./weekly-results-data.js",
  "./weekly-results-sync.js",

  "./player-availability-data.js",
  "./player-availability.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseCopy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return Response.error();
        });
      })
  );
});
