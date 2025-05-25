const CACHE_NAME = 'wookporium-v1';
const OFFLINE_URL = '/offline/';

// Files to cache immediately when service worker installs
const STATIC_CACHE = [
  '/',
  '/products/',
  '/offline/',
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/favicon.ico'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
        return cache.addAll(STATIC_CACHE.filter(url => url !== '/offline/'));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Snipcart and external requests
  if (!event.request.url.startsWith(self.location.origin) ||
      event.request.url.includes('snipcart') ||
      event.request.url.includes('sanity')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }

        // Otherwise fetch from network and cache images
        return fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Offline fallback for pages
            if (event.request.mode === 'navigate') {
              return caches.match('/offline/') || 
                     new Response('Offline - please check your connection');
            }
          });
      })
  );
});