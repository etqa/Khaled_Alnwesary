const CACHE_NAME = 'alnwesary-v4';
const ASSETS_TO_CACHE = [
    './',
    'index.html',
    'manifest.json',
    'images/icons/manifest-icon-192.maskable.png',
    'images/icons/manifest-icon-512.maskable.png',
    'images/icons/apple-icon-180.png',
    'images/icons/favicon-196.png',
    'favicon.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching Assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // Use a network-first strategy for the main page to avoid 404 on assets
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
