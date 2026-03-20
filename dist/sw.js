const CACHE_NAME = 'alnwesary-v6';
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
            // Cache assets individually to avoid failing if one is missing
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url => 
                    cache.add(url).catch(err => {
                        console.warn(`Failed to cache ${url}:`, err);
                        return null;
                    })
                )
            );
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
    // Skip chrome extension requests
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    // Use a network-first strategy for the main page to avoid 404 on assets
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    // For other requests, try network first, then cache
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clone the response before caching
                const responseToCache = response.clone();
                
                // Cache successful responses
                if (response.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                
                return response;
            })
            .catch(() => {
                // If network fails, try cache
                return caches.match(event.request);
            })
    );
});
