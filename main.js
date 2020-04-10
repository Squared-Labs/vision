/*
 * Filename: main.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 21 February 2020
 * Description: The main process of Vision. This file handles updates, windows, and basically all other functions the Browser uses.
 * Originally from electron/electron-quick-start
*/

// Load Electron modules
const { app, BrowserWindow, BrowserView, globalShortcut, Menu, screen, MenuItem, ipcMain } = require('electron')

const {autoUpdater} = require("electron-updater");
const path = require('path')
require('v8-compile-cache');




app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
    
});



app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 1024,
        frame: false,
        show: true,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Load browser
    mainWindow.loadFile('browser.html')
    globalShortcut.register('Control+Shift+I', () => {
        return mainWindow.webContents.executeJavaScript(`
    document.getElementsByTagName("webview")[0].openDevTools();
    `)
    })

    globalShortcut.register('Control+R', () => {
        return
        //return mainWindow.webContents.executeJavaScript(`
        //document.getElementsByTagName("webview")[0].reload();
        //`)
    })

    globalShortcut.register('Control+W', () => {
        return app.quit();
    })

    globalShortcut.register('Alt+Shift+I', () => {
        return mainWindow.webContents.openDevTools();
    })

    const visionApi = mainWindow.webContents.api
// Handback reference example:
// visionApi.ipc.handback("example", responseObj);


    // almost...

    // OOP LETS CREATE A MENU
    ipcMain.on('contextMenu', (e, message, data) => {
        let rightClickPosition = null

        const menu = new Menu()
        const menuItem = new MenuItem({
            label: 'Inspect Element',
            click: () => {
                mainWindow.webContents.executeJavaScript(`
    document.getElementsByTagName("webview")[0].openDevTools();
    `)
            }
        })
        menu.append(menuItem)
        rightClickPosition = { x: e.x, y: e.y }
        menu.popup(mainWindow)
    });

    // OK DONE


    // almost...


    // Window Creation End

    // Functions
    ipcMain.on('about', (e, message) => {
        console.log('Opening vision://about window..', e, message);

        const aboutWindow = new BrowserWindow({
            width: 1024,
            height: 512,
            frame: false,
            show: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        aboutWindow.loadFile('version.html')
    });

    ipcMain.on('devTools', (e, message) => {
        mainWindow.webContents.openDevTools()
    });

    ipcMain.on('bookmarksPopup', (e, message) => {
        const bookmarksWindow = new BrowserWindow({
            width: 1024,
            height: 512,
            frame: false,
            show: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        bookmarksWindow.loadFile('bookmarks.html')
    });

    ipcMain.on('reload', (e, message) => {
        mainWindow.webContents.executeJavaScript(`
            var isLoading = false;
            if (isLoading) {
                    document.getElementsByTagName('webview')[0].stop();
            } else {
                    document.getElementsByTagName('webview')[0].reload();
            }
        `)
    });


  /* THIS OLD METHOD IS DEPRECATED
   * ipcMain.on('go', async (URL) => {
        mainWindow.webContents.executeJavaScript(`document.getElementsByTagName('webview')[0].src = ${URL}`)
    }); */

    ipcMain.on('forward', (e, message) => {
        mainWindow.webContents.executeJavaScript(`
            document.getElementsByTagName('webview')[0].goForward();
        `)
    });

    ipcMain.on('back', (e, message) => {
        mainWindow.webContents.executeJavaScript(`document.getElementsByTagName('webview')[0].goBack()`)
    });

    ipcMain.on('piav', (e, message) => {
        console.log('Opening vision://piav window..', e, message);

        const PIAVWindow = new BrowserWindow({
            width: 512,
            height: 512,
            frame: false,
            show: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        PIAVWindow.loadFile('piav.html')
    });

    ipcMain.on('close', (e, message) => {
        console.log('Closing Vision..', e, message);
        app.quit();
    });
});

app.on('window-all-closed', function () {
// When all windows are closed, the app quits unless if platform = Darwin (macOS)
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // For macOS: If app is still open, when program launched, just create a new window.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// NOTE TO SELF: include more code if needed




