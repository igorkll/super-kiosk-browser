const { contextBridge } = require('electron')

const args = process.argv

function readPreloadArg(name) {
    return args.find(arg => arg.startsWith(`--${name}=`))?.split('=')[1]
}

const user_args = JSON.parse(readPreloadArg("user-args"))

contextBridge.exposeInMainWorld('electronAPI', {
    getUserArgs: () => user_args
})
