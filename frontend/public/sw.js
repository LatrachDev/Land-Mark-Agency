// Service Worker for LandMark Agency
const CACHE_NAME = 'landmark-agency-v2';
const urlsToCache = [
  '/',
  'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Cache the basic URLs first
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Failed to cache resources:', error);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event with better error handling
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Fetch from network and cache assets
        return fetch(event.request)
          .then(fetchResponse => {
            // Check if valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Cache images and other assets
            if (event.request.url.includes('/assets/') || 
                event.request.destination === 'image' ||
                event.request.url.includes('.png') || 
                event.request.url.includes('.jpg') ||
                event.request.url.includes('.css') ||
                event.request.url.includes('.js')) {
              
              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return fetchResponse;
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            // Return a fallback if available
            return caches.match('/');
          });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
