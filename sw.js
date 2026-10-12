// Replace the retired offline worker so it cannot keep serving trip data.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys()
  await Promise.all(keys.filter(key => key.startsWith('usa2026-')).map(key => caches.delete(key)))
  await self.clients.claim()
  const windows = await self.clients.matchAll({ type: 'window' })
  const scope = self.registration.scope
  await self.registration.unregister()
  // Navigation must not keep activation pending: the new document waits for activation.
  for (const client of windows.filter(client => client.url.startsWith(scope))) void client.navigate(scope).catch(() => null)
})()))
