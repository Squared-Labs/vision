/*
 * Filename: main.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 21 February 2020
 * Description: The main process of Vision. This file handles updates, windows, and basically all other functions the Browser uses.
 * Originally from electron/electron-quick-start
*/

// Load Electron modules
const { app, BrowserWindow, globalShortcut, ipcMain, Notification, BrowserView } = require('electron')

const {autoUpdater} = require("electron-updater");
const path = require('path')
require('v8-compile-cache');

app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
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
    });

    // Load browser
    const webpage = new BrowserView();
    mainWindow.loadFile('browser.html')
    globalShortcut.register('Control+Shift+I', () => {
        return mainWindow.webContents.executeJavaScript(`
    document.getElementsByTagName("webview")[0].openDevTools();
    `)
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
    // Functions
    ipcMain.on('about', (e, message) => {
        console.log('Opening vision://about window..', e, message);
        const aboutWindow = new BrowserWindow({
            width: 1024,
            height: 512,
            frame: false,
            show: true,
            webPreferences: {
                webviewTag: false,
                nodeIntegration: false,
                enableRemoteModule: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload.js')
            }
        })
        aboutWindow.loadFile('version.html')
    });

    ipcMain.on('devTools', (e, message) => {
        mainWindow.webContents.openDevTools()
    });

    ipcMain.on('reload', (e, message) => {
        return mainWindow.webContents.executeJavaScript(`
            navigateTo()
        `)
    });

    ipcMain.on('reloadMain', (e, message) => {
        mainWindow.webContents.reload();
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




