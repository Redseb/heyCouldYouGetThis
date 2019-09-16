//Service Worker responsible for most PWA stuff

//Update cache name every update
const staticCacheName = 'site-static-v1'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// cache size restriction function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// Install service worker listener
self.addEventListener('install', (evt) =>{
    // console.log('Service worker has been installed');
    evt.waitUntil(
        //Cache every 'assets' request
        caches.open(staticCacheName)
        .then(cache => {
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
        .catch(() => {
            console.log('Unable to cache assets');
        })
    );


});

// Activate service worker listener
self.addEventListener('activate', (evt) => {
    // console.log('Service worked has been activated');
    evt.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))    
            )
        })
        .catch(() => {
            console.log("Unable to delete old cache");
        })
    );
});