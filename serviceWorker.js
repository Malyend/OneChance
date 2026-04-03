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