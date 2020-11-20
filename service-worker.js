const CACHE_NAME = "Football-App-PWA";

const urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/src/components/nav.html',
    '/src/pages/home.html',
    '/src/pages/teams.html',
    '/src/pages/favorite.html',
    '/favicon.ico',
    '/icon.png',
    '/assets/icon/android-icon-36x36.png',
    '/assets/icon/android-icon-48x48.png',
    '/assets/icon/android-icon-72x72.png',
    '/assets/icon/android-icon-96x96.png',
    '/assets/icon/android-icon-144x144.png',
    '/assets/icon/android-icon-192x192.png',
    '/assets/icon/apple-icon-57x57.png',
    '/assets/icon/apple-icon-60x60.png',
    '/assets/icon/apple-icon-72x72.png',
    '/assets/icon/apple-icon-76x76.png',
    '/assets/icon/apple-icon-114x114.png',
    '/assets/icon/apple-icon-120x120.png',
    '/assets/icon/apple-icon-144x144.png',
    '/assets/icon/apple-icon-152x152.png',
    '/assets/icon/apple-icon-180x180.png',
    '/assets/icon/apple-icon-precomposed.png',
    '/assets/icon/apple-icon.png',
    '/assets/icon/favicon-16x16.png',
    '/assets/icon/favicon-32x32.png',
    '/assets/icon/favicon-96x96.png',
    '/assets/icon/ms-icon-70x70.png',
    '/assets/icon/ms-icon-144x144.png',
    '/assets/icon/ms-icon-150x150.png',
    '/assets/icon/ms-icon-310x310.png',
    '/assets/css/main.css',
    '/assets/css/materialize.min.css',
    '/assets/js/idb.js',
    '/assets/js/main.js',
    '/assets/js/materialize.min.js',
    '/assets/js/push.js',
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



//Response to Push Notification
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
    body = event.data.text() 
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