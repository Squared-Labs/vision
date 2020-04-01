/*
 * Filename: main.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 21 February 2020
 * Originally from electron/electron-quick-start
*/


// Load Electron modules
const { app, BrowserWindow, BrowserView, globalShortcut, Menu, screen, ipcMain } = require('electron')
const {autoUpdater} = require("electron-updater");
const path = require('path')





app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('ready', () => {
    ipcMain.on('version', (e, message) => {
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



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    frame: false,
    show: true,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: false,
      enableRemoteModule: false,
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
    return mainWindow.webContents.executeJavaScript(`
    document.getElementsByTagName("webview")[0].reload();
    `)
  })

  globalShortcut.register('Control+W', () => {
      return app.quit();
  })
}
// Window create
app.on('ready', createWindow)

app.on('window-all-closed', function () {
// When all windows are closed, the app quits unless if platform = Darwin (macOS)
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // For macOS: If app is still open, when program launched, just create a new window.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// NOTE TO SELF: include more code if needed

let win;