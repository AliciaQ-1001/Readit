const { ipcMain, BrowserWindow } = require('electron')

const getSource = (url) => {
  return new Promise((resolve, reject) => {
    let handled = false // 防止重复处理

    const win = new BrowserWindow({
      width: 500,
      height: 500,
      show: false,
      webPreferences: {
        offscreen: true
      }
    })

    win.loadURL(url)

    // 成功加载事件
    win.webContents.once('did-finish-load', async () => {
      if (handled) return
      handled = true

      try {
        // 判断网页是否为空
        const isBlank = await win.webContents.executeJavaScript(`
          document.body && document.body.innerText.trim().length === 0
        `)

        if (isBlank) {
          resolve({ msg: '该网页为空或无效' })
        } else {
          const image = await win.webContents.capturePage()
          const screenshot = image.toDataURL()
          const title = await win.getTitle()
          resolve({ title, screenshot, url })
        }
      } catch (e) {
        reject(e)
      } finally {
        win.destroy()
      }
    })

    // 加载失败事件
    win.webContents.once('did-fail-load', () => {
      if (handled) return
      handled = true
      resolve({ msg: '该网站加载失败或不存在' })
      win.destroy()
    })

    // 超时兜底：10秒还没加载就算失败
    setTimeout(() => {
      if (handled) return
      handled = true
      resolve({ msg: '加载超时' })
      win.destroy()
    }, 10000)
  })
}

// 主进程监听
ipcMain.handle('on-url-event', async (e, url) => {
  const result = await getSource(url)
  return result
})
