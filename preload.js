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
            let validHandoffs = ["about", "close", "piav", "contextMenu"];
            if (validHandoffs.includes(channel)) {
                    ipcRenderer.send(channel, data);
            }
         },
         handback: (channel, func) => {
            let validHandbacks = ["go"];
            if (validHandbacks.includes(channel)) {
                    ipcRenderer.on(channel, (event, ...args) => func(...args));
                }
         }   
    },
    webFunctions: {
        alert: (msg) => {
            alert(msg)
        },
        devTools: () => {
           ipcRenderer.send('devTools');
        },
        reload: () => {
           ipcRenderer.send('reload');
        },
        forward: () => {
           ipcRenderer.send('forward');
        },
        back: () => {
           ipcRenderer.send('back');
        },
      /*  go: (url) => {
           ipcRenderer.send('go', url);
        }, */
    },
 /*   newClass: {
           
    },

    newerClass: {

    }
    */
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

