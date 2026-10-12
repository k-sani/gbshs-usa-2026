// Remove only the retired site's network caches. Personal drafts are preserved.
const retiredScope = new URL('/gbshs-usa-2026/', location.origin).href
if ('caches' in window) {
  void caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('usa2026-')).map(key => caches.delete(key))))
}
if ('serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then(async registrations => {
    for (const registration of registrations) {
      if (registration.scope === retiredScope) {
        await registration.update().catch(() => undefined)
      }
    }
  }).catch(() => undefined)
}
