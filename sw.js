const CACHE_NAME = 'nutripet-v1';
const ASSETS = [
  '/calculadora_calorias/',
  '/calculadora_calorias/index.html',
  '/calculadora_calorias/script.js',
  '/calculadora_calorias/style.css',
  '/calculadora_calorias/manifest.json',
  '/calculadora_calorias/hosp.html',
  '/calculadora_calorias/json/alimento_modelo.json',
  '/calculadora_calorias/json/batata_doce.json',
  '/calculadora_calorias/json/cao_adulto.json',
  '/calculadora_calorias/json/cao_fihote.json',
  '/calculadora_calorias/json/cao_jovem.json',
  '/calculadora_calorias/json/file_mignon_suino.json',
  '/calculadora_calorias/json/oleo_de_salmao.json',
  '/calculadora_calorias/refeicao/comidas.js',
  '/calculadora_calorias/refeicao/refeicao.html',
  '/calculadora_calorias/refeicao/style.css',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match('/calculadora_calorias/'));
    })
  );
});
