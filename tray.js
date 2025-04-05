//增加托盘功能
const { Tray } = require('electron')

function createTray(app, win) {
  const tray = new Tray('icon.png')
  tray.setToolTip('readit')
  tray.on('click', (e) => {
    if (e.shiftKey) {
      app.quit()
    }
  })
}

module.exports = createTray