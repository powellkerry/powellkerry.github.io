const CACHE_NAME = 'kerrypowell-cache-v1',
    urlsToCache = [
        '/'
    ];

self.addEventListener('install', (event) => {

    event.waitUntil(caches.open(CACHE_NAME).
        then((cache) => cache.addAll(urlsToCache)));

});

self.addEventListener('fetch', (event) => {

    if (event.request.method !== 'POST') {

        event.respondWith(caches.open(CACHE_NAME).then((cache) => {

            const fetchFunc = fetch(event.request).then((response) => {

                if (!caches.match(event.request)) {

                    cache.put(event.request, response.clone());

                }
                return response;

            }).
                catch(() => caches.match(event.request));

            return fetchFunc;

        }));

    }

});
