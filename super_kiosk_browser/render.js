const user_args = window.electronAPI.getUserArgs()
const {positionArgs, nonPositionArgs} = argparser_parseArgs(user_args)

let url = positionArgs[0]
const checkUrl = argparser_readNonPositionArg(nonPositionArgs, "check-url", "https://www.google.com")
const checkPeriod = argparser_readNonPositionArg_number(nonPositionArgs, "check-period", 10000)
const checkTimeout = argparser_readNonPositionArg_number(nonPositionArgs, "check-timeout", 3000)
const forceInternetCheck = argparser_checkNonPositionArg(nonPositionArgs, "force-internet-check")
const noInternetCheck = argparser_checkNonPositionArg(nonPositionArgs, "no-internet-check")
const showFirstInternetCheck = argparser_checkNonPositionArg(nonPositionArgs, "show-first-internet-check")
const hideInternetCheck = argparser_checkNonPositionArg(nonPositionArgs, "hide-internet-check")

// --------------------------------------------

if (!url.startsWith("http:") && !url.startsWith("https:")) url = "file:///" + url

const webview = document.getElementById("webview")
const loading_process = document.getElementById("loading-process")

function setShowState(state) {
    if (hideInternetCheck) state = true;
    
    webview.style.display = state ? "" : "none"
    document.body.style.cursor = state ? "" : "none"
    loading_process.style.display = state ? "none" : "flex"
}

if (showFirstInternetCheck) {
    setShowState(false)
}

if ((url.startsWith("file:") || noInternetCheck) && !forceInternetCheck) {
    webview.src = url
    setShowState(true)
} else {
    let hasInternet = false

    async function checkInternet() {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), checkTimeout)
            const response = await fetch(checkUrl, {
                method: "HEAD",
                signal: controller.signal,
                mode: "no-cors"
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
            } else {
                webview.src = ""
            }
        }

        setShowState(nowHas)
    }

    setInterval(updateInternetStatus, checkPeriod)
    updateInternetStatus()
}