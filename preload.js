/*
 * Filename: preload.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 29 March 2020
 * Some code from https://stackoverflow.com/a/59814127 is used
*/

const { contextBridge, ipcRenderer } = require('electron');
const request = require("request");

contextBridge.exposeInMainWorld(
    "api", {
    ipc: {
         handoff: (channel, data) => {
            console.log("Received hook!")
            let validHandoffs = ["about", "close", "reloadMain"];

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
        favicon: () => {
           require('favicon-getter').default;
        }
            //  go: (msg) => {
            //   document.querySelector('webview').src = `${msg}`
            // THIS METHOD IS DEPRECATED. USE navigateTo() INSTEAD.
            //   ipcRenderer.send('go', url);
            //  }, 
    },

    information: {
       getMetadata: async () => {
         var data = require('./package.json')
               const dateArray = data.version.split(".")
               let Month;
               if (dateArray[1] == "1") Month = "January";
               if (dateArray[1] == "2") Month = "February";
               if (dateArray[1] == "3") Month = "March";
               if (dateArray[1] == "4") Month = "April";
               if (dateArray[1] == "5") Month = "May";
               if (dateArray[1] == "6") Month = "June";
               if (dateArray[1] == "7") Month = "July";
               if (dateArray[1] == "8") Month = "August";
               if (dateArray[1] == "9") Month = "September";
               if (dateArray[1] == "10") Month = "October";
               if (dateArray[1] == "11") Month = "November";
               if (dateArray[1] == "12") Month = "December";
               return {
                 "revision": `${data.metadata.century}${dateArray[0]}_${Month.toLowerCase()}_rev_0${dateArray[2]}`,
                 "flags": {
                    "branch": data.metadata.flags.branch,
                    "homepage": data.metadata.flags.homepage
                 },
                 "version": {
                    "main": data.version,
                    "api": data.metadata.api,
                    "node": process.version,
                    "electron": process.versions.electron
                 }
               }
       }
    },

   /* newerClass: {

    }
    */
}
);