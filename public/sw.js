// Service Worker minimalista - NÃO interfere com WebRTC
const CACHE_NAME = 'camera-remote-v1';

self.addEventListener('install', event => {
  console.log('📦 SW instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('🚀 SW ativado');
  return self.clients.claim();
});

// CRÍTICO: NÃO cachear nada, apenas passar requisições direto
self.addEventListener('fetch', event => {
  // Passar TUDO direto para a rede (não interferir com WebRTC)
  event.respondWith(fetch(event.request));
});