{

let url = window.electronAPI.getUrl()
if (!url.startsWith("http:") && !url.startsWith("https:")) url = "file:///" + url

// --------------------------------------------

const webview = document.getElementById('webview')
const checkUrl = 'https://www.google.com'

function setShowState(state) {
    webview.style.display = state ? "" : "none"
}

if (url.startsWith("file:")) {
    webview.src = url
    setShowState(true)
} else {
    let hasInternet = false

    async function checkInternet() {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 3000)
            const response = await fetch(checkUrl, {
                method: 'HEAD',
                signal: controller.signal,
                mode: 'no-cors'
            })
            clearTimeout(timeoutId)
            return true
        } catch {
            return false
        }
    }

    async function updateInternetStatus() {
        const nowHas = await checkInternet()

        if (nowHas !== hasInternet) {
            hasInternet = nowHas
            if (hasInternet) {
                webview.src = url
                setShowState(true)
            } else {
                webview.src = ''
                setShowState(false)
            }
        }
    }

    setInterval(updateInternetStatus, 1000)
    updateInternetStatus()
}

}