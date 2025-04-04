const path = require('path')

const { ipcMain, BrowserWindow } = require('electron')
const WinState = require('electron-win-state').default
const saveas = require('./saveas')
const cssText = `width: 80px; height: 30px; border-radius: 5px; line-height: 30px; text-align: center; background-color: cornflowerblue; position: fixed; bottom: 50px; right: 20px; z-index: 1000; color: #fff; cursor: default`

const js = `
  const div = document.createElement('div')
  div.innerHTML = '关闭窗口'
  div.style.cssText = '${cssText}'
  div.addEventListener('click', () => {  myApi.close() })
  document.body.appendChild(div)
`

//  div.addEventListener('click', () => { myApi.close() })
// const js = `
//   const btn=document.createElement('button')
//   btn.id='button'
//   btn.innerHtml='关闭窗口'
//   document.body.appendChild(btn)
// `

let win = null
ipcMain.handle('on-open-event', (e, url) => {
  // console.log(url);
  const winState = new WinState({
    defaultHeight: 800,
    defaultWidth: 1200,
    electronStoreOptions: {
      name: 'window-state-open'
    }
  })
  win = new BrowserWindow({
    ...winState.winOptions,
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/open.js')
    }
  })
  win.on('ready-to-show', () => {
    win.show()
  })
  win.webContents.openDevTools()
  win.loadURL(url)
  winState.manage(win)
  win.webContents.executeJavaScript(js).catch(() => { })

  win.webContents.on('context-menu', (e, args) => {
    saveas(args.srcURL);

  })



})
ipcMain.handle('on-close-event', (e) => {
  win.close()
})