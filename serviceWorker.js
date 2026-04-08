self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('OneChance-v1').then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './toDo.Css',
            './toDo.js',
            './serviceWorker.js'
            ])
        })
    
    )
})

self.addEventListener('push', (event) => {
    const data = event.data.json()
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: './Images/maskable_icon_x192.png'
    })
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    const screen = event.notification.data.screen
    event.waitUntil()(
        clients.openWindow('/?screen=' + screen)
    )
})