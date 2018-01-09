var CACHE_NAME = 'now-cache-v1';
var urlsToCache = [
  '/',
  '/components/datetime/datetime.js',
  '/components/image/image.js',
  '/components/image-container/image-container.js',
  '/components/weather/weather.js',
  '/icons/01d.png',
  '/icons/001lighticons-17.png',
  '/icons/01n.png',
  '/icons/02d.png',
  '/icons/02n.png',
  '/icons/03d.png',
  '/icons/03n.png',
  '/icons/04d.png',
  '/icons/04n.png',
  '/icons/09d.png',
  '/icons/09n.png',
  '/icons/10d.png',
  '/icons/10n.png',
  '/icons/11d.png',
  '/icons/11n.png',
  '/icons/13d.png',
  '/icons/13n.png',
  '/icons/14d.png',
  '/icons/50d.png',
  '/icons/50n.png',
  '/icons/unknown.png',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
