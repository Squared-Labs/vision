const { ipcRenderer } = require('electron');

process.once('loaded', () => {
    window.addEventListener('message', event => {
        // do something with custom event
        const message = event.data;

        if (message.handoff === 'about') {
            ipcRenderer.send('versionFire', message);
        }
       else if (message.handoff === 'piav') {
            ipcRenderer.send('piavFire', message);
        }
        else if (message.handoff === 'close') {
            ipcRenderer.send('closeFire', message);
        }
    });
});