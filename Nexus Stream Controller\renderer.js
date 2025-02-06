// Handle UI interactions
document.getElementById('startStream').addEventListener('click', () => {
    const streamConfig = {
        platform: 'twitch',
        key: 'your-stream-key',
        quality: '1080p'
    }
    window.electron.send('start-stream', streamConfig)
})

document.getElementById('stopStream').addEventListener('click', () => {
    window.electron.send('stop-stream')
})

// Scene Management
class Scene {
    constructor(name) {
        this.name = name
        this.sources = []
        this.active = false
    }

    addSource(source) {
        this.sources.push(source)
    }

    removeSource(source) {
        const index = this.sources.indexOf(source)
        if (index > -1) {
            this.sources.splice(index, 1)
        }
    }
}

// Source Management
class Source {
    constructor(type, settings) {
        this.type = type
        this.settings = settings
        this.filters = []
    }

    applyFilter(filter) {
        this.filters.push(filter)
    }
} 