process.once('document-start', () => {
    var script = document.createElement('script');
    script.textContent = `document.addEventListener('contextmenu',(e)=>{e.preventDefault()
    ipcRenderer.sendToHost('context')},!1)`
    document.documentElement.appendChild(script);

});