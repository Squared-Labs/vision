// Load Electron modules
const { app, BrowserWindow, BrowserView, globalShortcut, Menu, screen } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    frame: false,
    show: true,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
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
 // mainWindow.webContents.openDevTools();
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