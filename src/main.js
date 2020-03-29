// Load Electron modules
const { app, BrowserWindow, BrowserView, globalShortcut, Menu, screen } = require('electron')
const path = require('path')


// BEGIN CODE COPIED FROM GITHUB EXAMPLES (modified for Vision's use)
// Related to installers for Windows
if (require('electron-squirrel-startup')) return app.quit();


if (handleSquirrelEvents()) {
    return;
}



function handleSquirrelEvents() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':

            // Shortcut add
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':

            // Shortcut remove
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // before updates*

            app.quit();
            return true;
    }
};
// END CODE COPIED FROM GITHUB EXAMPLES


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