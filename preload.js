/*
 * Filename: preload.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 29 March 2020
*/

const { ipcRenderer } = require('electron');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);


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
    });
});