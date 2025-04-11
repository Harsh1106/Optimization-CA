// service-worker.js

const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/css.bootstrap.min.css',
  '/css.magnific-popup.css',
  '/css.tooplate-style.css',
  '/js/background.cycle.js',
  '/js/jquery-1.11.0.min.js',
  '/js/jquery.magnific-popup.min.js',
  'js/service-worker.js',
  'slick/ajax-loader.gif',
    'slick/fonts/slick.eot',
    'slick/fonts/slick.svg',
    'slick/fonts/slick.ttf',
    'slick/fonts/slick.woff',
    'slick/slick-theme.css',
    'slick/slick-theme.less',
    'slick/slick.css',
    'slick/slick.min.js',
    'slick/slick.min.js.',
    'slick/config.rb',
    'slick/slick-theme.css',
    'slick/slick-theme.less'
];

self.addEventListener('install', (event) => {
  // Cache resources
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercept fetch requests
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response or fetch from network
        return response || fetch(event.request);
      })
  );
});