const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async (url) => {
  let result = await ipcRenderer.invoke('on-url-event', url)
  return result;
}

const alert = (msg) => {
  ipcRenderer.invoke('on-alert-event', msg)
}

const open = (url) => {
  // console.log(0);
  ipcRenderer.invoke('on-open-event', url)

}

const close = () => {
  ipcRenderer.invoke('on-close-event', url)
}

const getFilelist = async () => {
  const filelist = await ipcRenderer.invoke('on-getfiles-event')
  return filelist
}

const openDialog = () => {
  ipcRenderer.send('on-opendialog-event')
}
const onRendererEvent = (cb) => {
  ipcRenderer.on('on-renderer-event', (e, msg) => {
    cb()
    // console.log(msg);

  })
}
contextBridge.exposeInMainWorld('myApi', {
  sendUrl,
  alert,
  open,
  close,
  getFilelist,
  openDialog,
  onRendererEvent
})


