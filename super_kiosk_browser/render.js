let url = window.electronAPI.getUrl()
if (!url.startsWith("http:") && !url.startsWith("https:")) url = "file:///" + url

const webview = document.getElementById('webview')
webview.src = url
