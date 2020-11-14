const CACHE_NAME = "Football-App-PWA";

const urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/src/components/nav.html',
    '/src/pages/home.html',
    '/src/pages/teams.html',
    '/src/pages/favorite.html',
    '/favicon.png',
    '/icon.png',
    '/assets/icon/icon-48.png',
    '/assets/icon/icon-96.png',
    '/assets/icon/icon-192.png',
    '/assets/js/idb.js',
    '/assets/css/main.css',
    '/assets/css/materialize.min.css',
    '/assets/js/main.js',
    '/assets/js/materialize.min.js',
    '/assets/js/modules/api.js',
    '/assets/js/modules/nav.js',
    '/assets/js/modules/page.js',
    '/assets/js/modules/database.js',
    '/assets/js/modules/list.js',
    '/assets/js/modules/pwa.js'
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});

//Response to Push Notification
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
    body = event.data.text();
    } else {
    body = 'Push message no payload';
    }
    var options = {
    body: body,
    icon: 'notification.png',
    vibrate: [100, 50, 100],
    data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
    }
    };
    event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});