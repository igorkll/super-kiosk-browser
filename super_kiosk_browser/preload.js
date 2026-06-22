const { contextBridge } = require('electron')

const args = process.argv
const url = args.find(arg => arg.startsWith('--url='))?.split('=')[1]

contextBridge.exposeInMainWorld('electronAPI', {
    getUrl: () => url
})
