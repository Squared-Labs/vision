/*
 * Filename: preload.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 29 March 2020
 * Some code from https://stackoverflow.com/a/59814127 is used
*/

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        ipc: {
    handoff: (channel, data) => {
            let validHandoffs = ["about", "close", "piav"];
            if (validHandoffs.includes(channel)) {
                    ipcRenderer.send(channel, data);
            }
    },
    handback: (channel, func) => {
            let validHandbacks = [""];
        if (validHandbacks.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }   
    }
}
);

/*
OLD PROCESS
process.once('loaded', () => {
    window.addEventListener('message', event => {
        const message = event.data;

        if (message.handoff === 'about') {
            ipcRenderer.send('version', message);
        }
       else if (message.handoff === 'piav') {
            ipcRenderer.send('piav', message);
        }
        else if (message.handoff === 'close') {
            ipcRenderer.send('close', message);
        }
        
    ipcRenderer.send(message)
    });
});
*/

