const url = window.electronAPI.getUrl()
const webview = document.getElementById('webview')

console.log(url)
webview.src = url
