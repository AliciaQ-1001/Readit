const { app, screen, BrowserWindow, globalShortcut } = require('electron')
const path = require('path');
const WinState = require('electron-win-state').default
const createTray = require('./tray')
require('./controller/getSource')
require('./controller/alert')
require('./controller/openWindow')
require('./controller/getFilelist')
require('./controller/buildMenu')

let mainWindow;

const createWindow = () => {
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
    // electronStoreOptions: {
    //   name: 'window-state-main'
    // }
  })
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(display => display.bounds.x !== 0);
  mainWindow = new BrowserWindow({
    ...winState.winOptions,
    x: externalDisplay ? externalDisplay.bounds.x + 50 : undefined,
    y: externalDisplay ? externalDisplay.bounds.y + 50 : undefined,
    webPreferences: {
      preload: path.resolve(__dirname, './preload/index.js')//把预加载加入主进程
    },
    //窗口创建后先不显示，等我手动调用.show() 再显示出来
    show: false//会导致无法正常显示
  })
  mainWindow.loadURL('http://localhost:5173')
  mainWindow.webContents.openDevTools() // 确保打开 DevTools

  winState.manage(mainWindow)//electron-window-state 自动监听窗口的大小、位置变化，并在窗口关闭时保存这些状态，下次启动时恢复。

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  createTray(app, mainWindow)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
