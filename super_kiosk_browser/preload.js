const { contextBridge } = require('electron')

const args = process.argv

function readPreloadArg(name) {
    const prefix = `--${name}=`
    const arg = args.find(arg => arg.startsWith(prefix))
    return arg ? arg.slice(prefix.length) : def
}

const user_args = JSON.parse(readPreloadArg("user-args"))

contextBridge.exposeInMainWorld('electronAPI', {
    getUserArgs: () => user_args
})
