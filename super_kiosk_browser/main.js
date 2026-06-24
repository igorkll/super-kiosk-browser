let debug = false

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function getArgIndex(index) {
    if (!app.isPackaged) {
        return index + 1
    }

    return index
}

function createWindow () {
    const win = new BrowserWindow({
        frame: debug,
        // fullscreen: !debug,
        width: 1280,
        height: 720,
        show: false,
        backgroundColor: "#000000",
        webPreferences: {
            devTools: debug, // DON'T FORGET TO TURN OFF THE DAMN DEVTOOLS!
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js'),
            additionalArguments: [`--url=${process.argv[getArgIndex(1)]}`]
        }
    })

    if (!debug) {
        let beforeInputEvent = (event, input) => {
            let isBlocked = false

            if (input.code === 'F5' || input.code === 'F11' || input.code === 'F12') {
                isBlocked = true
            }

            const ctrlOrCmd = input.control || input.meta
            if (ctrlOrCmd) {
                isBlocked = input.code === 'KeyR' ||
                    input.code === 'KeyW' ||
                    input.code === 'KeyQ' ||
                    input.code === 'KeyM'
            }

            if (isBlocked) {
                event.preventDefault()
            }
        }

        win.webContents.on('did-attach-webview', (event, webContents) => {
            webContents.on('before-input-event', beforeInputEvent);
        });

        win.webContents.on('before-input-event', beforeInputEvent);
    }

    win.once('ready-to-show', () => {
        win.setFullScreen(!debug)
        win.show()
    })

    win.loadFile(path.join(__dirname, 'main.html'))

    if (debug) win.openDevTools()
}

ipcMain.on('quit-app', () => {
    app.quit()
})

app.whenReady().then(createWindow)